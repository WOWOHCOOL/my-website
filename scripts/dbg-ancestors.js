/* 直接打印指定元素处的容器祖先栈（只读 · 最直白判定）
 * 用法：node scripts/dbg-ancestors.js <built-html> <needle> [needle2 ...]
 */
'use strict';
const fs = require('fs');
const { eachTag, clsOf, idOf } = require('./lib-html-sections.js');
const html = fs.readFileSync(process.argv[2], 'utf8');
const needles = process.argv.slice(3).map((s) => ({ s, at: html.indexOf(s) })).filter((x) => x.at >= 0);

const KEEP = /^(section|div|aside|article|main)$/;
const stack = [];
let cursor = 0;
const hits = new Map();
for (const t of eachTag(html)) {
  const i = html.indexOf(t.raw, cursor);
  if (i < 0) continue;
  cursor = i + t.raw.length;
  for (const nd of needles) {
    if (!hits.has(nd.s) && i >= nd.at) hits.set(nd.s, stack.map((x) => x.tag + '[' + x.cls.replace(/\s+/g, ' ').slice(0, 46) + ']'));
  }
  if (!KEEP.test(t.name)) continue;
  if (t.closing) { stack.pop(); continue; }
  stack.push({ tag: t.name, cls: clsOf(t.raw), id: idOf(t.raw) });
}
for (const nd of needles) {
  console.log('### ' + nd.s);
  const h = hits.get(nd.s) || [];
  console.log('  祖先栈（外→内）:');
  h.forEach((x, i) => console.log('    ' + i + '  ' + x));
  console.log('');
}
