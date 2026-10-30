// Same-page anchor validator.
//
// Usage: node scripts/validate-anchors.js
//
// WHY: validate-links.js deliberately skips same-page "#anchor" links, so a
// hero button pointing at a section id that no longer exists ships silently and
// does nothing when clicked. 2026-10-30: 27 localized product pages carried
// href="#models" while the model section renders id="products" (stale anchor
// from before the product unification). No gate caught it.
//
// Scope: built _site HTML. For every <a href="#X"> (X non-empty) the same page
// must contain an element with id="X". External / site-relative links are out of
// scope (validate-links.js owns those).
//
// Escapes: ids injected at runtime by JS are not visible here; such cases must
// use a real static element or be whitelisted below.
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE = path.join(ROOT, '_site');

if (!fs.existsSync(SITE)) {
  console.error('[validate-anchors] _site/ not found — run the build first');
  process.exit(1);
}

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

const files = walk(SITE);
const issues = [];
let checked = 0;

for (const f of files) {
  const html = fs.readFileSync(f, 'utf8');
  const rel = path.relative(SITE, f).split(path.sep).join('/');

  const ids = new Set();
  for (const m of html.matchAll(/<[a-z][^>]*\sid="([^"]*)"/gi)) ids.add(m[1]);

  for (const m of html.matchAll(/href="#([^"]*)"/gi)) {
    const target = m[1];
    if (!target) continue;              // href="#" — top of page, ignore
    checked++;
    if (!ids.has(target)) {
      issues.push({ page: rel, target });
    }
  }
}

console.log(`validate-anchors: scanned ${files.length} pages · ${checked} in-page anchors`);

if (issues.length) {
  const byTarget = {};
  for (const it of issues) (byTarget[it.target] = byTarget[it.target] || []).push(it.page);
  console.log(`\n!!! ${issues.length} 个断锚点（页面上没有对应 id）:`);
  for (const [t, pages] of Object.entries(byTarget)) {
    console.log(`  #${t}  ×${pages.length}`);
    pages.slice(0, 5).forEach((p) => console.log('      ' + p));
    if (pages.length > 5) console.log(`      … 其余 ${pages.length - 5} 页`);
  }
  process.exit(1);
}
console.log('=== ANCHORS PASS ===');
