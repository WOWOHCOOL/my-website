'use strict';
// Gate: every <table> in a blog article must be inside an `overflow-x-auto` wrapper
// so wide tables scroll on mobile instead of overflowing. See scripts/wrap-tables.py.
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
function walk(d, o = []) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) walk(p, o); else if (e.name === 'index.njk') o.push(p); } return o; }
const files = walk(path.join(ROOT, 'src')).filter(f => /[\\/]blog[\\/]/.test(f) && !/[\\/]blog[\\/]index\.njk$/.test(f));
let total = 0, bad = [];
for (const f of files) {
  const s = fs.readFileSync(f, 'utf8');
  for (const m of s.matchAll(/<table\b[^>]*>/g)) {
    total++;
    const wrapM = s.slice(0, m.index).match(/<div class="([^"]*overflow-x-auto[^"]*)">\s*$/);
    if (!wrapM) bad.push([path.relative(ROOT, f), 'no overflow wrapper']);
    else if (!/\brounded-xl\b/.test(wrapM[1])) bad.push([path.relative(ROOT, f), 'wrapper not rounded']);
    const end = s.indexOf('</table>', m.index); const blk = end < 0 ? '' : s.slice(m.index, end);
    if (blk && /<thead\b|<th\b/.test(blk) && !/bg-brandBlue/.test(blk)) bad.push([path.relative(ROOT, f), 'header not blue']);
    if (blk && !/border-b|divide-y/.test(blk)) bad.push([path.relative(ROOT, f), 'no row separators']);
  }
}
if (bad.length) { console.log('[validate-table-wrap] UNWRAPPED tables: ' + bad.length + ' / ' + total); [...new Set(bad.map(x => x[0] + '  ' + x[1]))].slice(0, 15).forEach(b => console.log('   - ' + b)); process.exit(1); }
console.log('[validate-table-wrap] PASS — ' + total + ' tables all inside overflow-x-auto wrapper');
