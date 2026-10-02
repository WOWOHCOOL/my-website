'use strict';
// Gate: every blog article hero has exactly 3 category tags with the canonical
// position classes (1 orange / 2 blue / 3 green). See scripts/standardize-hero-tags.py.
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const CANON = [
  'px-3 py-1 bg-brandOrange/10 text-brandOrange text-badge font-black rounded-full uppercase',
  'px-3 py-1 bg-brandBlue/10 text-brandBlue text-badge font-black rounded-full uppercase',
  'px-3 py-1 bg-green-100 text-green-700 text-badge font-black rounded-full uppercase',
];
function walk(dir, out = []) { for (const e of fs.readdirSync(dir, { withFileTypes: true })) { const p = path.join(dir, e.name); if (e.isDirectory()) walk(p, out); else if (e.name === 'index.njk') out.push(p); } return out; }
const files = walk(path.join(ROOT, 'src')).filter(f => /[\\/]blog[\\/]/.test(f) && !/[\\/]blog[\\/]index\.njk$/.test(f));
let pages = 0, bad = [];
for (const f of files) {
  const s = fs.readFileSync(f, 'utf8');
  const m = s.match(/\{\{ breadcrumb\([\s\S]*?\) \}\}([\s\S]*?)<h1/);
  if (!m) continue;
  pages++;
  const spans = [...m[1].matchAll(/<span class="([^"]*)">([\s\S]*?)<\/span>/g)];
  const rel = path.relative(ROOT, f);
  if (spans.length !== 3) { bad.push([rel, 'count=' + spans.length]); continue; }
  spans.forEach((sp, i) => { if (sp[1] !== CANON[i]) bad.push([rel, 'pos' + (i + 1) + ' class']); });
}
if (bad.length) { console.log('[validate-hero-tags] NON-CONFORMING: ' + bad.length + ' / ' + pages + ' pages'); bad.slice(0, 20).forEach(b => console.log('   - ' + b[0] + '  ' + b[1])); process.exit(1); }
console.log('[validate-hero-tags] PASS — ' + pages + ' articles have exactly 3 canonical hero tags');
