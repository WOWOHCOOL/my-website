/* 检查 blog banner 的祖先链是否已有容器类（防双重 px-6）（只读）
 * 用法：node scripts/audit-banner-ancestors.js [--list]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { eachTag, clsOf, idOf } = require('./lib-html-sections.js');
const ROOT = path.join(__dirname, '..', '_site');
const LANGS = ['en', 'de', 'es', 'fr', 'ru', 'pl'];
const SHOW = process.argv.includes('--list');
const CONTAINER = /max-w-4xl mx-auto px-6/;

const groups = new Map();
let n = 0;
const dup = [];
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

    // 收集容器元素（只跟踪 section/div/aside/article/main —— void 元素会打乱栈）
    const KEEP = /^(section|div|aside|article|main)$/;
    const nodes = [];
    const stack = [];
    let cursor = 0;
    for (const t of eachTag(html)) {
      const i = html.indexOf(t.raw, cursor);
      if (i < 0) continue;
      cursor = i + t.raw.length;
      if (!KEEP.test(t.name)) continue;
      if (t.closing) { const s = stack.pop(); if (s) { s.end = cursor; nodes.push(s); } continue; }
      stack.push({ tag: t.name, cls: clsOf(t.raw), id: idOf(t.raw), start: i, end: html.length });
    }

    // banner = 含渐变的 section/div
    const TARGET = (process.argv.find((a) => a.startsWith('--target=')) || '').split('=')[1];
    let bi;
    if (TARGET) {
      const m = html.indexOf('id="' + TARGET + '"');
      if (m < 0) continue;
      bi = m;
    } else {
      bi = html.indexOf('bg-gradient-to-br from-brandBlue to-slate-800');
    }
    if (bi < 0) continue;
    const banner = nodes.filter((x) => /^(section|div)$/.test(x.tag) && x.start < bi && bi < x.end)
      .sort((a, b) => a.start - b.start);

    // banner 的直接父：区间最小的那个
    const parent = banner[0];
    const chain = banner.map((x) => x.tag + '[' + x.cls.replace(/\s+/g, ' ').slice(0, 44) + ']');
    // 计数祖先里带容器类的（不含 banner 自己的包裹层 = banner[0]）
    const ancWithContainer = banner.slice(1).filter((x) => CONTAINER.test(x.cls)).length;
    const selfContainer = parent && CONTAINER.test(parent.cls);

    const key = 'banner=' + (selfContainer ? 'CONTAINER' : 'no-container') + '  ancestors-with-container=' + ancWithContainer;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(lang + '/' + e.name);
    if (selfContainer && ancWithContainer > 0) dup.push({ u: lang + '/' + e.name, chain });
  }
}
console.log('文章页 ' + n + '\n');
[...groups.entries()].sort((a, b) => b[1].length - a[1].length).forEach(([k, list]) => {
  console.log('[' + String(list.length).padStart(3) + '] ' + k);
  if (SHOW && list.length <= 40) list.forEach((u) => console.log('        ' + u));
});
if (dup.length) {
  console.log('\n⚠️ 双重容器（banner 包裹层 + 祖先都有 max-w-4xl mx-auto px-6）: ' + dup.length);
  dup.slice(0, 12).forEach((d) => console.log('  ' + d.u + '\n      ' + d.chain.join('  <  ')));
}
