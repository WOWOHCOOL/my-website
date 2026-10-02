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
    if (!/<div class="[^"]*overflow-x-auto[^"]*">\s*$/.test(s.slice(0, m.index))) bad.push(path.relative(ROOT, f));
  }
}
if (bad.length) { console.log('[validate-table-wrap] UNWRAPPED tables: ' + bad.length + ' / ' + total); [...new Set(bad)].slice(0, 15).forEach(b => console.log('   - ' + b)); process.exit(1); }
console.log('[validate-table-wrap] PASS — ' + total + ' tables all inside overflow-x-auto wrapper');
