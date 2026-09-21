// _redirects validator — mirrors the rules Cloudflare Pages actually enforces.
//
// Usage:  node scripts/validate-redirects.js
//
// Why this exists: Cloudflare Pages silently DROPS any `_redirects` line it
// cannot parse. No error is surfaced in the Pages dashboard, the line just
// never fires. This site shipped 77 such lines for months — every one of them
// ended in `301!`, a Netlify-ism Cloudflare does not accept:
//
//     ▲ [WARNING] Found 77 invalid redirect rules:
//       ▶︎ Valid status codes are 200, 301, 302 (default), 303, 307, or 308.
//           Got 301!.  at _site\_redirects:92 | /fr/fallbeispiele/ ...
//
// Net effect: 49 real legacy remaps (e.g. /de/products/* -> /de/produkte/:splat,
// /services -> /service/) returned 404 instead of redirecting, and 4 WordPress
// rules written as `/wp-content/*  410!` were ignored entirely.
//
// Checks, each one a rule Cloudflare documents at
// https://developers.cloudflare.com/pages/configuration/redirects/ :
//
//   1. field count      — "[source] [destination] [code?]", destination required.
//                         A line without a destination is ignored.
//   2. status code      — only 200/301/302/303/307/308. Anything else (410, 301!)
//                         is ignored. 200 = proxy/rewrite, not a redirect.
//   3. URL form         — source and destination must be site-relative ("/...")
//                         or absolute "https://...".
//   4. splat count      — at most one "*" per source.
//   5. duplicate source — the top-most match wins, so a later duplicate is dead.
//   6. self-loop        — source === destination is a no-op.
//   7. chain            — destination is itself a source of another exact rule.
//   8. limits           — 2,000 static + 100 dynamic (splat/placeholder) max.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const FILE = path.join(ROOT, '_redirects');

const VALID_CODES = new Set([200, 301, 302, 303, 307, 308]);
const MAX_STATIC = 2000;
const MAX_DYNAMIC = 100;

const raw = fs.readFileSync(FILE, 'utf8');
const lines = raw.split(/\r?\n/);

const problems = [];
const add = (kind, line, detail) => problems.push({ kind, line, detail });

const rules = [];
let totalRules = 0;
let dynamicCount = 0;
let staticCount = 0;

lines.forEach((text, i) => {
  const n = i + 1;
  const line = text.trim();
  if (!line || line.startsWith('#')) return;

  const parts = line.split(/\s+/);

  // 1. field count
  if (parts.length < 2) {
    add('missing destination', n, line);
    totalRules++;
    return;
  }
  totalRules++;
  const [source, destination, code] = parts;
  if (/[*:]/.test(source)) dynamicCount++;
  else staticCount++;

  // 2. status code
  if (code !== undefined && (!/^\d+$/.test(code) || !VALID_CODES.has(Number(code)))) {
    add('invalid status code', n, line + '   -> code "' + code + '" (Cloudflare would ignore this line)');
    return;
  }

  // 3. URL form
  const isUrl = (s) => s.startsWith('/') || /^https:\/\//.test(s);
  if (!isUrl(source)) add('bad source form', n, line);
  if (!isUrl(destination)) add('bad destination form', n, line);

  // 4. splat count
  if ((source.match(/\*/g) || []).length > 1) add('multiple splats in source', n, line);

  rules.push({ n, source, destination, status: code === undefined ? 302 : Number(code), dynamic: /[*:]/.test(source) });
});

// 5. duplicate source
const seen = new Map();
for (const r of rules) {
  if (seen.has(r.source)) add('duplicate source', r.n, r.source + ' (first defined at line ' + seen.get(r.source) + ')');
  else seen.set(r.source, r.n);
}

// 6. self-loop
for (const r of rules) {
  if (r.source === r.destination) add('self-loop', r.n, r.source);
}

// 7. chain (exact paths only — splat targets can't be resolved statically)
const exactSources = new Set(rules.filter((r) => !r.dynamic).map((r) => r.source));
for (const r of rules) {
  if (r.dynamic) continue;
  if (r.destination.startsWith('https://')) continue;
  if (exactSources.has(r.destination)) {
    add('redirect chain', r.n, r.source + ' -> ' + r.destination + ' (which is itself redirected)');
  }
}

// 8. limits
if (staticCount > MAX_STATIC) add('too many static rules', 0, staticCount + ' > ' + MAX_STATIC);
if (dynamicCount > MAX_DYNAMIC) add('too many dynamic rules', 0, dynamicCount + ' > ' + MAX_DYNAMIC);

// ---- report ----
const labels = {
  'missing destination': 'line has no destination (ignored by Cloudflare)',
  'invalid status code': 'status code not in 200/301/302/303/307/308 (line ignored)',
  'bad source form': 'source is not "/..." or "https://..."',
  'bad destination form': 'destination is not "/..." or "https://..."',
  'multiple splats in source': 'more than one "*" in source',
  'duplicate source': 'duplicate source (later rule is dead)',
  'self-loop': 'source === destination',
  'redirect chain': 'destination is redirected again (extra hop)',
  'too many static rules': 'over the 2,000 static rule limit',
  'too many dynamic rules': 'over the 100 dynamic rule limit',
};

console.log('_redirects: ' + totalRules + ' rules (' + staticCount + ' static, ' + dynamicCount + ' dynamic)');
console.log('');
let total = 0;
for (const kind of Object.keys(labels)) {
  const hits = problems.filter((p) => p.kind === kind);
  total += hits.length;
  console.log('  ' + labels[kind].padEnd(58) + ': ' + hits.length);
  hits.slice(0, 8).forEach((h) => console.log('      L' + h.line + '  ' + h.detail));
  if (hits.length > 8) console.log('      ... +' + (hits.length - 8) + ' more');
}

if (total) {
  console.error('\n[validate-redirects] FAIL — ' + total + ' problem(s)');
  process.exit(1);
}
console.log('\n[validate-redirects] PASS');
