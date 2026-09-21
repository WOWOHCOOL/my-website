'use strict';
/* 精确定位「被 max-w-4xl 收窄的表格」：
 *   selfMw4xl  —— <table> 自身 class 含 max-w-4xl
 *   shellMw4xl —— 直接父 <div>（表壳）class 含 max-w-4xl
 *   container  —— 最近的容器祖先（container-content / container-wide / max-w-*）
 * 用法: node scripts/audit-table-narrow.js [--verbose]
 */
const fs = require('fs');
const path = require('path');
const { eachTag, clsOf, idOf } = require('./lib-html-sections.js');

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
const hasTok = (c, t) => new RegExp('(^|\\s)' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(\\s|$)').test(norm(c));

const rows = [];
for (const f of walk(ROOT)) {
  const rel = path.relative(ROOT, f).replace(/\\/g, '/');
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
      const cls = norm(clsOf(t.raw));
      const parent = stack.length ? stack[stack.length - 1] : null;
      const pCls = parent ? norm(clsOf(parent.raw)) : '';
      const selfMw = hasTok(cls, 'max-w-4xl');
      const shellMw = hasTok(pCls, 'max-w-4xl');
      // 容器祖先
      let cont = null;
      for (let i = stack.length - 1; i >= 0; i--) {
        const c = norm(clsOf(stack[i].raw));
        const m = c.match(/(?:^|\s)(container-(?:content|wide|narrow|prose)|max-w-(?:3xl|4xl|5xl|6xl|7xl))(?:$|\s)/);
        if (m) { cont = m[1] + '@' + stack[i].name + (hasTok(c, 'mx-auto') ? '+auto' : ''); break; }
      }
      const secId = (() => { for (let i = stack.length - 1; i >= 0; i--) { const id = idOf(stack[i].raw); if (id) return id; } return ''; })();
      rows.push({ rel, secId, selfMw, shellMw, cont, tableCls: cls, parentCls: pCls });
    }
    if (!VOID.has(t.name) && !selfClose) stack.push(t);
  }
}

const narrowed = rows.filter((r) => r.selfMw || r.shellMw);
console.log('=== 全站 <table> ' + rows.length + ' 个 · 被 max-w-4xl 收窄的 ' + narrowed.length + ' 个 ===');
const g = new Map();
for (const r of narrowed) {
  const k = `self=${r.selfMw ? 'Y' : 'N'} shell=${r.shellMw ? 'Y' : 'N'}  container=${r.cont || '(无)'}`;
  if (!g.has(k)) g.set(k, []);
  g.get(k).push(r);
}
[...g.entries()].sort((a, b) => b[1].length - a[1].length).forEach(([k, v]) => console.log(String(v.length).padStart(4) + ' × ' + k));

console.log('\n=== 被收窄表格的页面分布（按容器类型）===');
const byFile = new Map();
for (const r of narrowed) {
  const k = r.rel;
  if (!byFile.has(k)) byFile.set(k, new Set());
  byFile.get(k).add(r.cont || '(无)');
}
[...byFile.entries()].sort((a, b) => b[1].size - a[1].size).forEach(([f, s]) => console.log('  ' + f + '   [' + [...s].join(', ') + ']'));

if (process.argv.includes('--verbose')) {
  console.log('\n=== 明细 ===');
  narrowed.forEach((r) => console.log(`  ${r.rel} #${r.secId}\n      table="${r.tableCls}"\n      parent="${r.parentCls}"\n      container=${r.cont}`));
}
