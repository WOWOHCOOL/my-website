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
      const c = p[1]; if (!c.includes('text-slate-600') || c.includes('text-xs') || c.includes('text-badge')) continue;
      scanned++;
      if (/\btext-(sm|body|lg)\b/.test(c)) bad.push([path.relative(ROOT, f), 'size: ' + c]);
      if (!/\bleading-/.test(c)) bad.push([path.relative(ROOT, f), 'no leading: ' + c]);
      if (!/\bmb-4\b/.test(c)) bad.push([path.relative(ROOT, f), 'not mb-4: ' + c]);
    }
    for (const h of blk.matchAll(/<h3\b[^>]*class="([^"]*)"/g)) {
      const c = h[1]; scanned++;
      if (/\btext-slate-900\b/.test(c)) bad.push([path.relative(ROOT, f), 'h3 color: ' + c]);
      if (/\buppercase\b/.test(c) && /\btext-sm\b/.test(c)) bad.push([path.relative(ROOT, f), 'h3 size: ' + c]);
      if (/\buppercase\b/.test(c) && !/\bmb-3\b/.test(c)) bad.push([path.relative(ROOT, f), 'h3 gap: ' + c]);
    }
    for (const bd of blk.matchAll(/<span class="([^"]*rounded-full[^"]*)"/g)) {
      const c = bd[1];
      if (/\bw-\d|\bh-\d/.test(c)) continue;   // icon circle, not a text badge
      scanned++;
      if (!/\btext-badge\b/.test(c)) bad.push([path.relative(ROOT, f), 'badge size: ' + c]);
    }
    for (const co of blk.matchAll(/<div class="([^"]*(?:bg-brandBlue\/5|bg-amber-50|bg-green-50|bg-red-50)[^"]*)"/g)) {
      const c = co[1]; scanned++;
      if (/\bp-5\b/.test(c)) bad.push([path.relative(ROOT, f), 'callout p-5: ' + c]);
    }
    // ⚠️ 2026-10-07 FIX — 引号感知匹配（此前是朴素 /<img\b[^>]*class="([^"]*)"/g）。
    //   HTML 属性值里可以含**裸 ">"**（实测 `alt="… vérification Coil Q-factor >80, …"`，
    //   同一串里作者转义了 "<" 为 "&lt;" 却漏了 ">"）。朴素正则会在这个 ">" 处截断 ⇒
    //   该 <img> 被**静默跳过**，它的 rounded-xl / shadow-md / max-w-3xl 违规**永不报出**。
    //   实测全站（正文灰卡内）：朴素命中 572 · 引号感知命中 578 ⇒ 漏检 6 处，其中 **2 处是真违规**。
    //   ⇒ 这正是「检测到 ≠ 检测对 / 工具静默漏检」。**改工具，不改页面**（页面合法）。
    for (const tg of blk.matchAll(/<img\b(?:[^>"']|"[^"]*"|'[^']*')*>/g)) {
      const cm = tg[0].match(/\bclass="([^"]*)"/); if (!cm) continue;
      const c = cm[1]; scanned++;
      if (/\brounded-xl\b/.test(c)) bad.push([path.relative(ROOT, f), 'img radius: ' + c]);
      if (/\bshadow-md\b/.test(c)) bad.push([path.relative(ROOT, f), 'img shadow: ' + c]);
      if (/\bmax-w-3xl\b/.test(c)) bad.push([path.relative(ROOT, f), 'img not full width: ' + c]);
      if (!/\bw-full\b/.test(c)) bad.push([path.relative(ROOT, f), 'img missing w-full: ' + c]);
    }
    for (const tb of blk.matchAll(/<table\b[^>]*class="([^"]*)"/g)) {
      const c = tb[1]; scanned++;
      if (!/\btext-sm\b/.test(c)) bad.push([path.relative(ROOT, f), 'table size: ' + c]);
    }
    for (const u of blk.matchAll(/<ul\b[^>]*class="([^"]*)"/g)) {
      const c = u[1]; if (!c.includes('text-slate-600') || c.includes('text-xs')) continue;
      scanned++;
      if (/\btext-(sm|body|lg)\b/.test(c)) bad.push([path.relative(ROOT, f), 'ul size: ' + c]);
    }
  }
}
if (bad.length) { console.log('[validate-body-font] NON-16px body prose: ' + bad.length + ' / ' + scanned); bad.slice(0, 15).forEach(b => console.log('   - ' + b[0] + '  "' + b[1] + '"')); process.exit(1); }
console.log('[validate-body-font] PASS — ' + scanned + ' body prose paragraphs all 16px (no text-sm/body/lg)');
