// _headers validator — mirrors the rules Cloudflare Pages actually enforces.
//
// Usage:  node scripts/validate-headers.js
//
// Why this exists: `_headers` had NO validator in the build chain, while
// `_redirects` has had one for months. Both files share the same failure mode —
// Cloudflare parses them silently and drops/mis-applies anything it cannot
// understand, with no error surfaced in the Pages dashboard. Three concrete
// incidents motivated this file:
//
//   1. A `#` comment indented INSIDE a `/*` block. The documented format only
//      defines comments at column 0 ("The first line of a block is the URL or
//      URL pattern"), so an indented `#` is an undefined construct — it may be
//      parsed as a header name, silently disabling the block's headers.
//
//   2. `Cache-Control` declared in both `/*` and a narrower block. Cloudflare
//      documents: "If a header is applied twice in the _headers file, the
//      values are joined with a comma separator." The result was two
//      self-contradictory Cache-Control values and `cf-cache-status: DYNAMIC`
//      on every asset. This is why the file's own top comment forbids declaring
//      Cache-Control in `/*`.
//
//   3. Comments in this very file describing a narrower block as an "override".
//      Cloudflare has no override semantics — values are concatenated. Verified
//      live: `curl -I /de/` returns a single Link header carrying BOTH the
//      global sitemap/rss links and the /de/sitemap.xml link, comma-joined.
//      Misleading comments invite the exact bug they were written to prevent.
//
// Checks, each one a rule Cloudflare documents at
// https://developers.cloudflare.com/pages/configuration/headers/ :
//
//   A. block structure   — a path line must start at column 0; header lines must
//                          be indented; an indented `#` is not a documented
//                          construct; an indented header before any path line is
//                          orphaned and belongs to no block.
//   B. header syntax     — "[name]: [value]"; `! [name]` is the documented
//                          "detach a header" form and carries no value.
//   C. header name       — must be a valid RFC 9110 token.
//   D. line length       — 2,000 characters per line, spacing included.
//   E. rule count        — up to 100 header rules.
//   F. path pattern      — at most one splat; absolute URLs must be https and
//                          portless; a `:placeholder` may be referenced only
//                          once per pattern.
//   G. duplicate header  — twice in the SAME block is always a mistake.
//   H. concatenation     — the same name in TWO matching blocks has its values
//                          comma-joined. Harmless for list-valued headers, but
//                          contradictory for single-valued ones (Cache-Control,
//                          Content-Type, CSP, …) — those FAIL.
//   I. detach target     — `! Name` with no matching declaration anywhere.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
// Optional argv[2] lets the self-test inject known-bad files without touching
// the real `_headers`. Default is the tracked source file.
const FILE = process.argv[2] ? path.resolve(process.argv[2]) : path.join(ROOT, '_headers');

const MAX_RULES = 100;
const MAX_LINE_LEN = 2000;

// A header may appear in several matching blocks only if its value is a list.
// These are single-valued: a comma-joined duplicate is contradictory or invalid.
const SINGLE_VALUED = new Set([
  'cache-control', 'cdn-cache-control', 'cloudflare-cdn-cache-control',
  'content-type', 'content-length', 'content-encoding', 'content-language',
  'content-disposition', 'content-location', 'content-range',
  'content-security-policy', 'content-security-policy-report-only',
  'content-signal', 'x-frame-options', 'strict-transport-security',
  'referrer-policy', 'permissions-policy', 'x-content-type-options',
  'etag', 'last-modified', 'location', 'age', 'expires', 'date', 'server',
]);

// List-valued by design — concatenation is legal and sometimes intended.
// (Cloudflare's own docs demonstrate `X-Robots-Tag: nosnippet, noindex`.)
const LIST_VALUED = new Set([
  'link', 'vary', 'x-robots-tag', 'cache-tag', 'set-cookie', 'warning',
  'access-control-allow-origin', 'access-control-allow-headers',
  'access-control-allow-methods', 'access-control-expose-headers',
  'access-control-allow-credentials', 'timing-allow-origin',
]);

const TOKEN = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;

const raw = fs.readFileSync(FILE, 'utf8');
const lines = raw.split(/\r?\n/);

const problems = [];   // fatal
const notices = [];    // informational
const add = (kind, line, detail) => problems.push({ kind, line, detail });
const note = (kind, line, detail) => notices.push({ kind, line, detail });

// ---- parse ----
const blocks = [];      // { line, pattern, headers: [{name, value, line}], detaches: [{name, line}] }
let current = null;
let ruleCount = 0;

lines.forEach((text, i) => {
  const n = i + 1;

  // D. line length (spacing included, per docs)
  if (text.length > MAX_LINE_LEN) {
    add('line too long', n, text.length + ' chars (limit ' + MAX_LINE_LEN + ')');
  }

  if (!text.trim()) return;

  const indented = /^[ \t]/.test(text);

  // ---- comment handling ----
  if (text.trimStart().startsWith('#')) {
    if (indented) {
      add('indented comment', n, text.trim().slice(0, 70) +
        '   -> "#" must start at column 0; inside a block it is not a documented construct');
    }
    return;
  }

  // ---- A. path line (column 0) ----
  if (!indented) {
    const pattern = text.trim();
    ruleCount++;
    if (!pattern.startsWith('/') && !/^https:\/\//.test(pattern)) {
      add('bad path form', n, pattern.slice(0, 70) + '   -> must be "/..." or "https://..."');
    }
    if (/^https?:\/\/[^/]*:\d+/.test(pattern)) {
      add('port in absolute URL', n, pattern.slice(0, 70) + '   -> Cloudflare does not support ports');
    }
    // F. splats
    if ((pattern.match(/\*/g) || []).length > 1) {
      add('multiple splats', n, pattern.slice(0, 70) + '   -> only a single "*" is allowed');
    }
    // F. placeholders may each be referenced once
    const phs = pattern.match(/:[A-Za-z]\w*/g) || [];
    const seenPh = new Map();
    for (const p of phs) {
      if (seenPh.has(p)) add('placeholder reused', n, pattern.slice(0, 70) + '   -> "' + p + '" appears more than once');
      seenPh.set(p, n);
    }
    current = { line: n, pattern, headers: [], detaches: [] };
    blocks.push(current);
    return;
  }

  // ---- indented line: header, detach, or orphan ----
  const body = text.trim();

  if (current === null) {
    add('orphan header line', n, body.slice(0, 70) + '   -> no preceding path line at column 0');
    return;
  }

  // B. detach form: `! Header-Name`
  if (body.startsWith('!')) {
    const name = body.replace(/^!\s*/, '').trim();
    if (!name) { add('empty detach', n, '!'); return; }
    if (name.includes(':')) { add('bad detach form', n, body.slice(0, 70) + '   -> "! [name]" takes no value'); return; }
    if (!TOKEN.test(name)) { add('invalid header name', n, name + '   -> not a valid RFC 9110 token'); return; }
    current.detaches.push({ name: name.toLowerCase(), line: n });
    return;
  }

  // B. header form: `Name: value`
  const colon = body.indexOf(':');
  if (colon === -1) {
    add('malformed header', n, body.slice(0, 70) + '   -> expected "Name: value"');
    return;
  }
  const name = body.slice(0, colon).trim();
  const value = body.slice(colon + 1).trim();

  if (!name) { add('empty header name', n, body.slice(0, 70)); return; }
  if (!TOKEN.test(name)) {
    add('invalid header name', n, name + '   -> not a valid RFC 9110 token');
    return;
  }
  if (!value) { add('empty header value', n, name + '   -> a header with no value is dropped'); return; }
  if (/[\r\n]/.test(value)) { add('newline in value', n, name); return; }

  current.headers.push({ name: name.toLowerCase(), rawName: name, value, line: n });
});

// ---- E. rule count ----
if (ruleCount > MAX_RULES) {
  add('too many rules', 0, ruleCount + ' > ' + MAX_RULES + ' (Cloudflare applies only the first 100)');
}

// ---- G. duplicate header within one block ----
for (const b of blocks) {
  const seen = new Map();
  for (const h of b.headers) {
    if (seen.has(h.name)) {
      add('duplicate header in block', h.line,
        h.rawName + '   -> already declared at L' + seen.get(h.name) + ' in the same block (values would be comma-joined)');
    } else seen.set(h.name, h.line);
  }
}

// ---- H. same header across matching blocks ----
// Two blocks overlap if either pattern can match the other's literal prefix.
// Cheap and conservative: treat a block as overlapping every block whose
// pattern is a prefix-splat of it, plus the global `/*`.
const globalBlock = blocks.find((b) => b.pattern === '/*');

for (const b of blocks) {
  if (b === globalBlock || !globalBlock) continue;
  const g = new Map(globalBlock.headers.map((h) => [h.name, h]));
  for (const h of b.headers) {
    const other = g.get(h.name);
    if (!other) continue;
    if (SINGLE_VALUED.has(h.name)) {
      add('single-valued header declared twice', h.line,
        h.rawName + '   -> also in "/*" at L' + other.line +
        '; values get comma-joined (cf. the Cache-Control incident)');
    } else {
      note('header concatenated across blocks', h.line,
        h.rawName + '   -> also in "/*" at L' + other.line + '; values are comma-joined, not overridden');
    }
  }
}

// same-name across two sibling splat blocks (e.g. /de/* and /fr/*) cannot
// both match one request, so only `/*` overlap matters. Nothing more to do.

// ---- I. detach with nothing to detach ----
const declaredAnywhere = new Set();
for (const b of blocks) for (const h of b.headers) declaredAnywhere.add(h.name);
for (const b of blocks) {
  for (const d of b.detaches) {
    if (!declaredAnywhere.has(d.name)) {
      note('detach with no declaration', d.line, d.name + '   -> nothing in this file declares it');
    }
  }
}

// ---- report ----
const labels = {
  'indented comment': 'indented "#" comment (undefined construct, must be column 0)',
  'orphan header line': 'indented header before any path line (belongs to no block)',
  'bad path form': 'path is not "/..." or "https://..."',
  'port in absolute URL': 'absolute URL contains a port (unsupported)',
  'multiple splats': 'more than one "*" in a path',
  'placeholder reused': 'a :placeholder is referenced more than once',
  'malformed header': 'line is not "Name: value"',
  'bad detach form': '"! [name]" must not carry a value',
  'empty detach': '"!" with no header name',
  'empty header name': 'header name is empty',
  'empty header value': 'header value is empty',
  'newline in value': 'header value contains a newline',
  'invalid header name': 'header name is not a valid RFC 9110 token',
  'duplicate header in block': 'same header twice in one block',
  'single-valued header declared twice': 'single-valued header in two matching blocks (values concatenate)',
  'line too long': 'line exceeds the 2,000 character limit',
  'too many rules': 'over the 100 header rule limit',
};

const totalHeaders = blocks.reduce((a, b) => a + b.headers.length, 0);
console.log('_headers: ' + blocks.length + ' rules, ' + totalHeaders + ' header lines');
console.log('');

let total = 0;
for (const kind of Object.keys(labels)) {
  const hits = problems.filter((p) => p.kind === kind);
  total += hits.length;
  console.log('  ' + labels[kind].padEnd(60) + ': ' + hits.length);
  hits.slice(0, 8).forEach((h) => console.log('      L' + h.line + '  ' + h.detail));
  if (hits.length > 8) console.log('      ... +' + (hits.length - 8) + ' more');
}

if (notices.length) {
  console.log('\n  -- notes (non-fatal) --');
  for (const nt of notices) console.log('      L' + nt.line + '  [' + nt.kind + '] ' + nt.detail);
}

if (total) {
  console.error('\n[validate-headers] FAIL — ' + total + ' problem(s)');
  process.exit(1);
}
console.log('\n[validate-headers] PASS');
