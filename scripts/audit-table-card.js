'use strict';
/* 全站「非 details 规格表」的卡片形态普查
 * 对每个 table，记录：
 *   owner  = 卡片类在 table / wrapper / 都没有
 *   feat   = 圆角 / 边框 / 阴影 / 白底 的组合
 *   effBg  = 有效背景（向上找第一个 bg-*）
 * 用法: node scripts/audit-table-card.js [--all]
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
const norm = (s) => String(s || '').replace(/\s+/g, ' ').trim();
const ANY_BG = /(^|\s)bg-(white|black|slate-\d+|gray-\d+|brand\w+)(\/\d+)?(\s|$)/;
const feat = (c) => {
  const s = norm(c);
  const f = [];
  if (/(^|\s)rounded(-[a-z0-9]+)?(\s|$)/.test(s)) f.push('R');
  if (/(^|\s)border(-[a-z0-9-]+)?(\s|$)/.test(s)) f.push('B');
  if (/(^|\s)shadow(-[a-z0-9]+)?(\s|$)/.test(s)) f.push('S');
  if (/(^|\s)bg-white(\s|$)/.test(s)) f.push('W');
  if (/(^|\s)overflow-(hidden|auto|x-auto)(\s|$)/.test(s)) f.push('O');
  return f.join('') || '-';
};
const g = new Map();
for (const f of walk(ROOT)) {
  const rel = path.relative(ROOT, f).replace(/\\/g, '/');
  if (!process.argv.includes('--all') && !/(^|\/)(products|produkte|productos|produits|produkty|tovary)\//.test(rel)) continue;
  let html = fs.readFileSync(f, 'utf8');
  html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '<script></script>');
  const stack = [];
  for (const t of eachTag(html)) {
    const selfClose = /\/\s*>$/.test(t.raw);
    if (t.closing) {
      for (let i = stack.length - 1; i >= 0; i--) if (stack[i].name === t.name) { stack.length = i; break; }
      continue;
    }
    if (t.name === 'table') {
      const tcls = norm(clsOf(t.raw));
      if (/text-\[11px\]/.test(tcls)) { /* 规格表，跳过 */ }
      else {
        const parent = stack.length ? stack[stack.length - 1] : null;
        const pcls = parent ? norm(clsOf(parent.raw)) : '';
        const tf = feat(tcls), pf = feat(pcls);
        const tHas = /[RBSW]/.test(tf), pHas = /[RBSW]/.test(pf);
        const owner = tHas && pHas ? 'both' : (tHas ? 'table' : (pHas ? 'wrapper' : 'none'));
        let effBg = '(白/默认)';
        for (let i = stack.length - 1; i >= 0; i--) { const c = norm(clsOf(stack[i].raw)); if (ANY_BG.test(c)) { effBg = (c.match(ANY_BG) || [])[0].trim(); break; } }
        const k = 'owner=' + owner.padEnd(7) + ' table[' + tf.padEnd(6) + '] wrapper[' + pf.padEnd(6) + '] 有效背景=' + effBg;
        g.set(k, (g.get(k) || 0) + 1);
      }
    }
    if (!VOID.has(t.name) && !selfClose) stack.push(t);
  }
}
console.log('=== 非规格表 卡片形态（' + [...g.values()].reduce((a, b) => a + b, 0) + ' 个）===');
[...g.entries()].sort((a, b) => b[1] - a[1]).forEach(([k, n]) => console.log(String(n).padStart(5) + ' × ' + k));
