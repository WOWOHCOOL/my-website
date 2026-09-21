/* blog 文章页「正文结构」审计（只读）
 * 判据：正文里的 <h2> 是否被 <section> 包裹
 *   - 每个 <h2> 的偏移是否落在任一 <section> 的 [start,end) 内
 *   - bareH2 > 0 → 该页正文用「裸 h2」（未包裹）
 * 用法：node scripts/audit-blog-body.js [--list]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { eachTag, clsOf } = require('./lib-html-sections.js');
const ROOT = path.join(__dirname, '..', '_site');
const LANGS = ['en', 'de', 'es', 'fr', 'ru', 'pl'];
const SHOW = process.argv.includes('--list');

function analyze(html) {
  // 所有 <section> 的区间（任意深度）
  const secRanges = [];
  const stack = [];
  const h2s = [];
  let cursor = 0;
  for (const t of eachTag(html)) {
    const i = html.indexOf(t.raw, cursor);
    if (i < 0) continue;
    cursor = i + t.raw.length;
    if (t.name === 'h2' && !t.closing) h2s.push({ at: i, txt: html.slice(cursor, cursor + 90).replace(/<[^>]*>/g, '').trim().slice(0, 60) });
    if (t.name !== 'section') continue;
    if (t.closing) { const s = stack.pop(); if (s) { s.end = cursor; secRanges.push(s); } continue; }
    stack.push({ start: i, end: html.length });
  }
  const inSec = (p) => secRanges.some((s) => p >= s.start && p < s.end);
  const bare = h2s.filter((x) => !inSec(x.at));
  return { h2: h2s.length, bare: bare.length, secs: secRanges.length, bareList: bare };
}

// 单页详情模式
const pageArg = (process.argv.find((a) => a.startsWith('--page=')) || '').split('=')[1];
if (pageArg) {
  const [lg, sl] = pageArg.split('/');
  const p = path.join(ROOT, lg === 'en' ? 'blog' : lg + '/blog', sl, 'index.html');
  const r = analyze(fs.readFileSync(p, 'utf8'));
  console.log('h2 总数 ' + r.h2 + ' · 裸 ' + r.bare + ' · section 数 ' + r.secs);
  r.bareList.forEach((x, i) => console.log('  裸[' + i + ']  ' + x.txt));
  process.exit(0);
}

const groups = new Map();
const barePages = [];
let total = 0;
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
    const r = analyze(html);
    const key = r.bare === 0 ? '正文全部被 <section> 包裹 ✅' : ('裸 <h2> ×' + r.bare + ' / 共 h2=' + r.h2);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(lang + '/' + e.name);
    if (r.bare > 0) barePages.push({ u: lang + '/' + e.name, bare: r.bare, h2: r.h2, secs: r.secs });
  }
}

const sorted = [...groups.entries()].sort((a, b) => b[1].length - a[1].length);
console.log('blog 文章页总数: ' + total + '\n');
sorted.forEach(([k, list], i) => {
  console.log('[' + (i + 1) + '] ' + String(list.length).padStart(3) + ' 篇  ' + k);
  if (SHOW && list.length <= 45) list.forEach((u) => console.log('        ' + u));
  else if (list.length > 45) { const by = {}; list.forEach((u) => { const l = u.split('/')[0]; by[l] = (by[l] || 0) + 1; }); console.log('        语言分布: ' + JSON.stringify(by)); }
});
if (barePages.length) {
  console.log('\n=== 裸 <h2> 页面明细 ===');
  barePages.sort((a, b) => b.bare - a.bare).forEach((x) => console.log('  bare=' + String(x.bare).padStart(2) + ' h2=' + String(x.h2).padStart(2) + ' sec=' + String(x.secs).padStart(3) + '  ' + x.u));
}
