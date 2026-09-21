/* 核对 banner 与其同级块（faq / author-bio / related）的容器层数是否一致（只读）
 * 用法：node scripts/audit-container-parity.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { eachTag, clsOf } = require('./lib-html-sections.js');
const ROOT = path.join(__dirname, '..', '_site');
const LANGS = ['en', 'de', 'es', 'fr', 'ru', 'pl'];
const KEEP = /^(section|div|aside|article|main)$/;
const CONTAINER = /max-w-4xl mx-auto px-6/;

function stacks(html, needles) {
  const stack = [];
  let cursor = 0;
  const out = {};
  for (const t of eachTag(html)) {
    const i = html.indexOf(t.raw, cursor);
    if (i < 0) continue;
    cursor = i + t.raw.length;
    for (const nd of needles) {
      if (out[nd.key] === undefined && nd.at >= 0 && i >= nd.at) {
        out[nd.key] = stack.filter((x) => CONTAINER.test(x)).length;
      }
    }
    if (!KEEP.test(t.name)) continue;
    if (t.closing) { stack.pop(); continue; }
    stack.push(clsOf(t.raw));
  }
  return out;
}

const groups = new Map();
let n = 0;
const bad = [];
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
    const r = stacks(html, [
      { key: 'banner', at: html.indexOf('bg-gradient-to-br from-brandBlue to-slate-800') },
      { key: 'faq', at: html.indexOf('id="faq"') },
      { key: 'author', at: html.indexOf('id="author-bio"') },
      { key: 'related', at: html.indexOf('id="related-articles"') },
    ]);
    const key = 'banner=' + r.banner + ' faq=' + r.faq + ' author=' + r.author + ' related=' + r.related;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(lang + '/' + e.name);
    if (r.banner !== r.faq || r.banner !== r.author) bad.push(lang + '/' + e.name + '   ' + key);
  }
}
console.log('文章页 ' + n + '\n');
[...groups.entries()].sort((a, b) => b[1].length - a[1].length).forEach(([k, list]) => {
  console.log('[' + String(list.length).padStart(3) + '] ' + k);
});
console.log('\n⚠️ banner 与 faq/author 容器层数不一致: ' + bad.length);
bad.slice(0, 15).forEach((x) => console.log('   ' + x));
