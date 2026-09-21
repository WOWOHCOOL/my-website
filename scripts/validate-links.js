// Internal link / orphan page / redirect destination validator.
//
// Usage:  node scripts/validate-links.js
//
// WHY: until now NOTHING in the build chain checked internal page links.
// validate-img-exists.js says so itself — "this is an image check, not a link
// check" — it only records references whose extension looks like an image.
// validate-html.js checks markup conformance, not whether href targets exist.
// So an <a href="/blog/typo/"> would ship, return 404, and burn crawl budget
// on every one of the ~30k internal links this site carries.
//
// Checks:
//   1. internal <a href>      — every site-relative link must resolve to a real
//                               page, a real asset, or the source of an ACTIVE
//                               _redirects rule (a link to a 301 is legitimate).
//   2. redirect destinations  — every active rule must land on something real,
//                               otherwise activating it creates a soft 404.
//                               Wildcards are checked by their static prefix.
//   3. orphan pages           — pages with zero inbound internal links. Only
//                               reachable via the sitemap, which is a weak
//                               signal for both crawlers and LLM retrieval.
//                               Reported as a warning, not a failure: some pages
//                               (thank-you / danke / dziekujemy) are meant to be
//                               reached only after a form submit.
//
// Link kinds skipped on purpose: external http(s), protocol-relative, mailto,
// tel, javascript, data, and same-page "#anchor" links.
//
// Quotes: href may be written with " or '. A naive /<a [^>]*>/ scan breaks on
// attribute values containing a literal ">", so the tag matcher is quote-aware.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE = path.join(ROOT, '_site');

if (!fs.existsSync(SITE)) {
  console.error('[validate-links] _site/ not found — run the build first');
  process.exit(1);
}

const VALID_CODES = new Set(['200', '301', '302', '303', '307', '308']);

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const allFiles = walk(SITE);
const fileSet = new Set(allFiles.map((f) => '/' + path.relative(SITE, f).split(path.sep).join('/')));
const htmlFiles = allFiles.filter((f) => f.endsWith('.html'));

// ---- page URLs (a directory's index.html is addressable as /dir/) ----
const pageUrls = new Set();
for (const f of htmlFiles) {
  const rel = '/' + path.relative(SITE, f).split(path.sep).join('/');
  pageUrls.add(rel.endsWith('/index.html') ? rel.slice(0, -'index.html'.length) : rel);
}

// ---- active _redirects rules ----
const exactSources = new Map();
const splatSources = [];
let ruleCount = 0;
for (const raw of fs.readFileSync(path.join(ROOT, '_redirects'), 'utf8').split(/\r?\n/)) {
  const line = raw.trim();
  if (!line || line.startsWith('#')) continue;
  const parts = line.split(/\s+/);
  if (parts.length < 2) continue;
  if (parts[2] !== undefined && !VALID_CODES.has(parts[2])) continue; // Cloudflare drops it
  const rule = { source: parts[0], destination: parts[1], code: parts[2] || '302' };
  ruleCount++;
  if (rule.source.includes('*')) splatSources.push(rule);
  else exactSources.set(rule.source, rule);
}

// Does this site-relative path lead anywhere real?
// ⚠️ Never build these probes with string concat: `clean + '/index.html'` turns
// "/about/" into "/about//index.html" and every trailing-slash URL is then
// reported as broken (349 false positives the first time this ran). Strip the
// trailing slashes first, then append.
function resolves(u) {
  const clean = u.split('#')[0].split('?')[0];
  if (exactSources.has(clean)) return true;
  for (const s of splatSources) {
    if (clean.startsWith(s.source.slice(0, s.source.indexOf('*')))) return true;
  }
  if (pageUrls.has(clean)) return true;
  if (pageUrls.has(clean + '/')) return true;
  if (fileSet.has(clean)) return true;
  const base = clean.replace(/\/+$/, '');
  if (fileSet.has(base + '/index.html')) return true;
  if (fileSet.has(base + '.html')) return true;
  return false;
}

// ---- scan <a href> ----
const TAG_RE = /<a\b(?:[^>"']|"[^"]*"|'[^']*')*>/gi;
const HREF_RE = /\bhref\s*=\s*("([^"]*)"|'([^']*)')/i;

const broken = new Map();   // target -> Set(referring pages)
const inbound = new Map();  // page URL -> inbound count
let linkTotal = 0;
let internalTotal = 0;

for (const f of htmlFiles) {
  const h = fs.readFileSync(f, 'utf8');
  const pageRel = '/' + path.relative(SITE, f).split(path.sep).join('/');
  const pageUrl = pageRel.endsWith('/index.html') ? pageRel.slice(0, -'index.html'.length) : pageRel;

  TAG_RE.lastIndex = 0;
  let m;
  while ((m = TAG_RE.exec(h)) !== null) {
    const hm = m[0].match(HREF_RE);
    if (!hm) continue;
    const href = (hm[2] !== undefined ? hm[2] : hm[3] || '').trim();
    if (!href) continue;
    linkTotal++;
    if (/^(https?:)?\/\//i.test(href)) continue;
    if (/^(mailto:|tel:|javascript:|data:|#)/i.test(href)) continue;
    internalTotal++;

    let decoded;
    try { decoded = decodeURIComponent(href); } catch { decoded = href; }
    const target = decoded.startsWith('/')
      ? decoded
      : path.posix.normalize(path.posix.dirname(pageUrl) + '/' + decoded);

    if (!resolves(target)) {
      if (!broken.has(target)) broken.set(target, new Set());
      broken.get(target).add(pageUrl);
      continue;
    }

    const bare = target.split('#')[0].split('?')[0];
    const norm = pageUrls.has(bare) ? bare : pageUrls.has(bare + '/') ? bare + '/' : null;
    if (norm) inbound.set(norm, (inbound.get(norm) || 0) + 1);
  }
}

// ---- orphan pages ----
const orphans = [];
for (const u of pageUrls) {
  if (/404\.html$/.test(u)) continue;
  if (u === '/') continue;
  if (!inbound.get(u)) orphans.push(u);
}

// ---- redirect destinations ----
const badDest = [];
for (const [source, r] of exactSources) {
  if (r.destination.startsWith('https://')) continue;
  if (!resolves(r.destination)) badDest.push([source, r.destination, 'target missing']);
}
for (const r of splatSources) {
  const prefix = r.destination.slice(0, r.destination.search(/[:*]/));
  if (!prefix) continue;
  if (!fs.existsSync(path.join(SITE, prefix.replace(/^\//, '')))) {
    badDest.push([r.source, r.destination, 'static prefix missing: ' + prefix]);
  }
}

// ---- report ----
console.log('scanned ' + htmlFiles.length + ' built pages in _site/');
console.log('pages addressable     : ' + pageUrls.size);
console.log('active redirect rules : ' + ruleCount + ' (' + exactSources.size + ' exact, ' + splatSources.length + ' splat)');
console.log('<a> total             : ' + linkTotal + '   |   internal : ' + internalTotal);
console.log('');
console.log('  broken internal links        : ' + broken.size);
[...broken].slice(0, 15).forEach(([t, from]) => {
  const list = [...from];
  console.log('      ' + t + '   <- ' + list.slice(0, 3).join(', ') + (list.length > 3 ? ' ... +' + (list.length - 3) : ''));
});
if (broken.size > 15) console.log('      ... +' + (broken.size - 15) + ' more');
console.log('  redirects to a missing target : ' + badDest.length);
badDest.slice(0, 15).forEach(([s, d, why]) => console.log('      ' + s + ' -> ' + d + '   [' + why + ']'));
console.log('  orphan pages (warn only)      : ' + orphans.length);
orphans.slice(0, 15).forEach((u) => console.log('      ' + u));
if (orphans.length > 15) console.log('      ... +' + (orphans.length - 15) + ' more');

if (broken.size || badDest.length) {
  console.error('\n[validate-links] FAIL — ' + broken.size + ' broken link(s), ' + badDest.length + ' bad redirect target(s)');
  process.exit(1);
}
if (orphans.length) {
  console.log('\n[validate-links] PASS (with ' + orphans.length + ' orphan page warning(s))');
} else {
  console.log('\n[validate-links] PASS');
}
