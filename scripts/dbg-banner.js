/* 调试 BAN 规则为何未命中（只读） */
'use strict';
const fs = require('fs');
const path = require('path');
const { eachTag, clsOf, idOf } = require('./lib-html-sections.js');
const f = process.argv[2];
const html = fs.readFileSync(f, 'utf8');

let cursor = 0;
let banner = null;
for (const t of eachTag(html)) {
  const i = html.indexOf(t.raw, cursor);
  if (i < 0) continue;
  cursor = i + t.raw.length;
  if (t.closing || !/^(section|div)$/.test(t.name)) continue;
  if (/bg-gradient-to-br from-brandBlue to-slate-800/.test(clsOf(t.raw))) {
    banner = { tag: t.name, open: i, raw: t.raw };
    break;
  }
}
console.log('banner:', banner ? banner.tag + ' @' + banner.open : 'NOT FOUND');
if (!banner) process.exit(0);
console.log('banner raw:', JSON.stringify(banner.raw));

// enclosing section
const stack = [];
cursor = 0;
for (const t of eachTag(html)) {
  const i = html.indexOf(t.raw, cursor);
  if (i < 0) continue;
  cursor = i + t.raw.length;
  if (i >= banner.open) break;
  if (t.name !== 'section') continue;
  if (t.closing) { stack.pop(); continue; }
  stack.push({ open: i, raw: t.raw });
}
console.log('stack depth before banner:', stack.length);
if (stack.length) {
  const e = stack[stack.length - 1];
  console.log('  enc raw:', JSON.stringify(e.raw));
  console.log('  enc cls:', JSON.stringify(clsOf(e.raw).replace(/\s+/g, ' ').trim()));
}
