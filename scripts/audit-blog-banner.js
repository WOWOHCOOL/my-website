/* blog 文章页 CTA banner 形态权威审计（只读）
 * 输出每个页面的：banner 标签、class 形态、是否被外层 section 包裹
 * 用法：node scripts/audit-blog-banner.js [--list]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { eachTag, clsOf } = require('./lib-html-sections.js');
const ROOT = path.join(__dirname, '..', '_site');
const LANGS = ['en', 'de', 'es', 'fr', 'ru', 'pl'];
const SHOW = process.argv.includes('--list');

function shapeOf(cls) {
  if (/p-8 sm:p-10/.test(cls)) return 'p8sm:p10';
  if (/\bmb-16\b/.test(cls)) return 'mb16';
  return 'nomb';
}

const groups = new Map();
let total = 0;
const missing = [];
for (const lang of LANGS) {
  const dir = lang === 'en' ? path.join(ROOT, 'blog') : path.join(ROOT, lang, 'blog');
  if (!fs.existsSync(dir)) continue;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    const p = path.join(dir, e.name, 'index.html');
    if (!fs.existsSync(p)) continue;
    const html = fs.readFileSync(p, 'utf8');
    if (!/id="faq"/.test(html)) continue;
    total++;

    // 1) 定位 banner 元素（记录偏移）
    let bTag = null, bCls = null, bStart = -1;
    let cursor = 0;
    for (const t of eachTag(html)) {
      const i = html.indexOf(t.raw, cursor);
      if (i < 0) continue;
      cursor = i + t.raw.length;
      if (t.closing || !/^(section|div)$/.test(t.name)) continue;
      const c = clsOf(t.raw);
      if (/bg-gradient-to-br from-brandBlue to-slate-800/.test(c)) { bTag = t.name; bCls = c; bStart = i; break; }
    }
    if (!bTag) { missing.push(lang + '/' + e.name); continue; }

    // 2) banner 之前未闭合的 <section> 数（= 被包裹）
    let openSec = 0; cursor = 0;
    for (const t of eachTag(html)) {
      const i = html.indexOf(t.raw, cursor);
      if (i < 0) continue;
      cursor = i + t.raw.length;
      if (i >= bStart) break;
      if (t.name === 'section') { if (t.closing) openSec--; else openSec++; }
    }
    const wrapped = openSec > 0;

    const key = bTag + '  |  ' + shapeOf(bCls) + '  |  ' + (wrapped ? '被包裹' : '裸放');
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(lang + '/' + e.name);
  }
}

const sorted = [...groups.entries()].sort((a, b) => b[1].length - a[1].length);
console.log('blog 文章页总数: ' + total + '  （无 banner: ' + missing.length + '）\n');
sorted.forEach(([k, list], i) => {
  console.log('[' + (i + 1) + '] ' + String(list.length).padStart(3) + ' 篇  ' + k);
  if (SHOW && list.length <= 45) list.forEach((u) => console.log('        ' + u));
  else { const by = {}; list.forEach((u) => { const l = u.split('/')[0]; by[l] = (by[l] || 0) + 1; }); console.log('        语言分布: ' + JSON.stringify(by)); }
});
if (missing.length) { console.log('\n=== 无 banner ==='); missing.forEach((u) => console.log('  ' + u)); }
