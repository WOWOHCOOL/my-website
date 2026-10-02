'use strict';
// Non-blog gate: section/heading color must be text-brandBlue (or text-white on dark),
// not text-slate-900 — keeps section titles on the unified brand color.
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
function walk(d, o = []) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) walk(p, o); else if (e.name === 'index.njk') o.push(p); } return o; }
const files = walk(path.join(ROOT, 'src')).filter(f => !/[\\/]blog[\\/]/.test(f) && !/_includes|_data/.test(f));
let bad = [], n = 0;
for (const f of files) {
  const s = fs.readFileSync(f, 'utf8');
  for (const m of s.matchAll(/<h[23]\b[^>]*class="([^"]*)"/g)) {
    n++;
    if (/\btext-slate-900\b/.test(m[1])) bad.push([path.relative(ROOT, f), m[1]]);
  }
}
if (bad.length) { console.log('[validate-nonblog-headings] slate-900 headings: ' + bad.length + ' / ' + n); bad.slice(0, 15).forEach(b => console.log('   - ' + b[0] + '  "' + b[1] + '"')); process.exit(1); }
console.log('[validate-nonblog-headings] PASS — ' + n + ' non-blog h2/h3 headings use brand color');
