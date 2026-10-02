'use strict';
// Gate: body-section prose <p> (text-slate-600 inside the body card) must render at
// the standard 16px — i.e. no text-sm / text-body / text-lg size class. text-xs
// (captions / notes) is allowed. See scripts/normalize-body-font.py.
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
function walk(dir, out = []) { for (const e of fs.readdirSync(dir, { withFileTypes: true })) { const p = path.join(dir, e.name); if (e.isDirectory()) walk(p, out); else if (e.name === 'index.njk') out.push(p); } return out; }
function balance(s, start, tag) { const re = new RegExp('<(\\/?)' + tag + '\\b[^>]*>', 'gi'); re.lastIndex = start; let d = 0, m; while ((m = re.exec(s))) { if (m[1] === '/') { d--; if (d === 0) return m.index + m[0].length; } else if (!/\/>$/.test(m[0])) d++; } return -1; }
const files = walk(path.join(ROOT, 'src')).filter(f => /[\\/]blog[\\/]/.test(f) && !/[\\/]blog[\\/]index\.njk$/.test(f));
let bad = [], scanned = 0;
for (const f of files) {
  const s = fs.readFileSync(f, 'utf8');
  const re = /<div class="bg-slate-50 rounded-xl p-6 border border-slate-200 shadow-sm">/g; let m;
  while ((m = re.exec(s))) {
    const end = balance(s, m.index, 'div'); if (end < 0) continue;
    const blk = s.slice(m.index, end);
    for (const p of blk.matchAll(/<p\b[^>]*class="([^"]*)"/g)) {
      const c = p[1]; if (!c.includes('text-slate-600') || c.includes('text-xs')) continue;
      scanned++;
      if (/\btext-(sm|body|lg)\b/.test(c)) bad.push([path.relative(ROOT, f), c]);
    }
  }
}
if (bad.length) { console.log('[validate-body-font] NON-16px body prose: ' + bad.length + ' / ' + scanned); bad.slice(0, 15).forEach(b => console.log('   - ' + b[0] + '  "' + b[1] + '"')); process.exit(1); }
console.log('[validate-body-font] PASS — ' + scanned + ' body prose paragraphs all 16px (no text-sm/body/lg)');
