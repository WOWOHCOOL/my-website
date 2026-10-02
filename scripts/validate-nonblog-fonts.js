'use strict';
// Non-blog gate: prose <p> must not use the 11px badge token (text-badge).
// Labels/eyebrows (uppercase/tracking) are allowed to stay text-badge.
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
function walk(d, o = []) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) walk(p, o); else if (e.name === 'index.njk') o.push(p); } return o; }
const files = walk(path.join(ROOT, 'src')).filter(f => !/[\\/]blog[\\/]/.test(f) && !/_includes|_data/.test(f));
let n = 0, bad = [];
for (const f of files) {
  const s = fs.readFileSync(f, 'utf8');
  for (const m of s.matchAll(/<p\b[^>]*class="([^"]*)"/g)) {
    const c = m[1];
    if (!/\btext-badge\b/.test(c)) continue;
    n++;
    if (/\bitalic\b|\bleading-relaxed\b/.test(c) && !/\buppercase\b/.test(c)) bad.push([path.relative(ROOT, f), c]);
  }
}
if (bad.length) { console.log('[validate-nonblog-fonts] text-badge prose: ' + bad.length + ' / ' + n); bad.slice(0, 15).forEach(b => console.log('   - ' + b[0] + '  "' + b[1] + '"')); process.exit(1); }
console.log('[validate-nonblog-fonts] PASS — no text-badge prose on non-blog pages');
