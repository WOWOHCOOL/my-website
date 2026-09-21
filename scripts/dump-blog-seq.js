/* 打印 blog 文章页 depth-0 section/aside 序列（只读）
 * 用法：node scripts/dump-blog-seq.js <lang> <slug> [<lang> <slug> ...]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { eachTag, clsOf, idOf } = require('./lib-html-sections.js');
const ROOT = path.join(__dirname, '..', '_site');

const args = process.argv.slice(2);
for (let i = 0; i < args.length; i += 2) {
  const lang = args[i], slug = args[i + 1];
  const p = path.join(ROOT, lang === 'en' ? 'blog' : lang + '/blog', slug, 'index.html');
  if (!fs.existsSync(p)) { console.log('未找到 ' + lang + '/' + slug); continue; }
  const html = fs.readFileSync(p, 'utf8');
  const seq = [];
  let depth = 0;
  for (const t of eachTag(html)) {
    if (!/^(section|aside)$/.test(t.name)) continue;
    if (t.closing) { if (depth > 0) depth--; continue; }
    if (depth === 0) seq.push(t.name + ' ' + (idOf(t.raw) ? '#' + idOf(t.raw) + ' ' : '') + '[' + clsOf(t.raw).replace(/\s+/g, ' ') + ']');
    depth++;
  }
  console.log('### ' + lang + '/' + slug + '  (depth-0: ' + seq.length + ')');
  seq.forEach((s, j) => console.log('   ' + String(j).padStart(2) + '  ' + s));
  console.log('');
}
