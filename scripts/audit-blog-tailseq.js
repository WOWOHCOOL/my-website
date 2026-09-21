/* blog 文章页「author-bio 之后」的 depth-0 序列分布（只读）
 * 用法：node scripts/audit-blog-tailseq.js [--list]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { eachTag, clsOf, idOf } = require('./lib-html-sections.js');
const ROOT = path.join(__dirname, '..', '_site');
const LANGS = ['en', 'de', 'es', 'fr', 'ru', 'pl'];
const SHOW = process.argv.includes('--list');

// 归一化 class → 语义 token
function tok(tag, cls, id) {
  if (id === 'related-articles') return 'RELATED(' + (/(max-w-4xl)/.test(cls) ? 'wrap' : 'bare') + ')';
  if (/from-brandBlue to-slate-800/.test(cls)) {
    const mb = /mb-16/.test(cls);
    const p8 = /p-8 sm:p-10/.test(cls);
    return 'BANNER' + (p8 ? '-p8' : '') + (mb ? '-mb16' : '-nowrap');
  }
  if (/sec bg-brandBlue/.test(cls)) return 'CTA-PARTIAL';
  if (/max-w-4xl mx-auto px-6 mb-16/.test(cls)) return 'WRAP16';
  if (/max-w-4xl mx-auto px-6 mb-12/.test(cls)) return 'WRAP12';
  if (/max-w-4xl mx-auto px-6$/.test(cls)) return 'WRAP0';
  if (/max-w-4xl mx-auto mb-16/.test(cls)) return 'WRAP16-nopx';
  if (/^py-10 bg-white$/.test(cls)) return 'PY10-BGWHITE';
  if (/^mb-16$/.test(cls)) return 'BARE-mb16';
  if (/^py-10$/.test(cls)) return 'PY10';
  if (/^py-4$/.test(cls)) return 'PY4';
  return tag + '[' + cls + ']';
}

const groups = new Map();
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
    const seq = [];
    let depth = 0;
    for (const t of eachTag(html)) {
      if (!/^(section|aside)$/.test(t.name)) continue;
      if (t.closing) { if (depth > 0) depth--; continue; }
      if (depth === 0) seq.push(tok(t.name, clsOf(t.raw), idOf(t.raw)));
      depth++;
    }
    const ai = seq.findIndex((s) => s.startsWith('RELATED') || s === 'WRAP16' || s === 'WRAP12' || s.startsWith('BANNER'));
    // author-bio 之后：找 CTA-PARTIAL 的位置，取它之前的窗口
    const ci = seq.indexOf('CTA-PARTIAL');
    const tail = seq.slice(Math.max(0, ci - 5), ci + 1);
    const key = tail.join(' > ');
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(lang + '/' + e.name);
  }
}

const sorted = [...groups.entries()].sort((a, b) => b[1].length - a[1].length);
console.log('blog 文章页总数: ' + total + '  尾部模板组数: ' + sorted.length + '\n');
sorted.forEach(([k, list], i) => {
  console.log('[' + (i + 1) + '] ' + String(list.length).padStart(3) + ' 篇  ' + k);
  if (SHOW && list.length <= 40) list.forEach((u) => console.log('        ' + u));
  else {
    const by = {};
    list.forEach((u) => { const l = u.split('/')[0]; by[l] = (by[l] || 0) + 1; });
    console.log('        语言分布: ' + JSON.stringify(by));
  }
  console.log('');
});
