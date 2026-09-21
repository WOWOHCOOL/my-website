/* banner CTA 文案唯一性统计（只读）
 * 若文案高度重复 → 可抽 partial 彻底精简；若逐页不同 → 只能统一外壳
 * 用法：node scripts/audit-banner-text.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { eachTag, clsOf } = require('./lib-html-sections.js');
const ROOT = path.join(__dirname, '..', '_site');
const LANGS = ['en', 'de', 'es', 'fr', 'ru', 'pl'];

const h2s = new Map();
const btnSets = new Map();
let n = 0;
for (const lang of LANGS) {
  const dir = lang === 'en' ? path.join(ROOT, 'blog') : path.join(ROOT, lang, 'blog');
  if (!fs.existsSync(dir)) continue;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    const p = path.join(dir, e.name, 'index.html');
    if (!fs.existsSync(p)) continue;
    const html = fs.readFileSync(p, 'utf8');
    if (!/id="faq"/.test(html)) continue;
    n++;
    // 定位 banner 区
    const at = html.indexOf('bg-gradient-to-br from-brandBlue to-slate-800');
    if (at < 0) continue;
    const seg = html.slice(at, at + 2200);
    // banner 内第一个 h2
    const m = seg.match(/<h2[^>]*>([\s\S]*?)<\/h2>/);
    const txt = m ? m[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim() : '(无 h2)';
    h2s.set(txt, (h2s.get(txt) || 0) + 1);
    // banner 内按钮文案集合
    const btns = [...seg.matchAll(/<a[^>]*class="[^"]*btn[^"]*"[^>]*>([\s\S]*?)<\/a>/g)].map((x) => x[1].replace(/<[^>]*>/g, '').trim());
    const key = btns.join(' | ') || '(无按钮)';
    btnSets.set(key, (btnSets.get(key) || 0) + 1);
  }
}
console.log('文章页 ' + n + '\n');
console.log('=== banner h2 文案：' + h2s.size + ' 种（共 ' + [...h2s.values()].reduce((a, b) => a + b, 0) + ' 处）===');
[...h2s.entries()].sort((a, b) => b[1] - a[1]).slice(0, 15).forEach(([k, v]) => console.log('  ' + String(v).padStart(3) + '×  ' + k.slice(0, 70)));
console.log('\n=== banner 按钮文案组合：' + btnSets.size + ' 种 ===');
[...btnSets.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10).forEach(([k, v]) => console.log('  ' + String(v).padStart(3) + '×  ' + k.slice(0, 80)));
