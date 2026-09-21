'use strict';
/* 变体 A 表格的单元格字号检查：是否每个 th/td 都自带字号类
 * 若全部自带 → 把 `text-sm` 提到 table 级是 no-op，可安全归一。
 * 用法: node scripts/audit-shell-cellsize.js
 */
const fs = require('fs');
const path = require('path');
const { eachTag, clsOf } = require('./lib-html-sections.js');
const ROOT = path.join(process.cwd(), '_site');
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta',
  'param', 'source', 'track', 'wbr', 'path', 'circle', 'rect', 'line', 'polyline', 'polygon', 'use', 'stop', 'ellipse']);
function walk(d, o = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p, o); else if (e.name.endsWith('.html')) o.push(p);
  }
  return o;
}
const SIZE_RE = /(^|\s)(text-(xs|sm|base|lg|xl|\dxl|\[\d+px\]))(\s|$)/;
const norm = (s) => String(s || '').replace(/\s+/g, ' ').trim();
let tables = 0, cells = 0, noSize = 0;
const samples = [];
for (const f of walk(ROOT)) {
  const rel = path.relative(ROOT, f).replace(/\\/g, '/');
  let html = fs.readFileSync(f, 'utf8');
  html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '<script></script>');
  for (const t of eachTag(html)) {
    if (t.closing || t.name !== 'table') continue;
    if (!/border-collapse bg-white rounded-2xl/.test(clsOf(t.raw))) continue;
    tables++;
    // 该 table 到 </table> 之间的所有 th/td
    const end = html.indexOf('</table>', t.start);
    const body = html.slice(t.start, end);
    for (const c of body.matchAll(/<(th|td)\b[^>]*>/g)) {
      cells++;
      const cls = (/\sclass="([^"]*)"/.exec(c[0]) || [, ''])[1];
      if (!SIZE_RE.test(norm(cls))) {
        noSize++;
        if (samples.length < 8) samples.push({ rel, tag: c[1], cls: norm(cls).slice(0, 80) });
      }
    }
  }
}
console.log('变体 A 表格:', tables, ' 单元格:', cells, ' 无字号类:', noSize);
samples.forEach((s) => console.log('  [' + s.tag + '] ' + s.rel + '  class="' + s.cls + '"'));
