'use strict';
/* 表壳挂载点：精确列出两种写法的 class 组合
 * 用法: node scripts/audit-shell-variant.js
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
const isShell = (c) => {
  const s = norm(c);
  return /(^|\s)rounded-(xl|2xl|3xl)(\s|$)/.test(s) && /(^|\s)border(\s|$)/.test(s) && /(^|\s)shadow(-sm|-md)?(\s|$)/.test(s);
};
const pairs = new Map();
for (const f of walk(ROOT)) {
  const rel = path.relative(ROOT, f).replace(/\\/g, '/');
  if (!/(^|\/)(products|produkte|productos|produits|produkty|tovary)\//.test(rel)) continue;
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
      const parent = stack.length ? stack[stack.length - 1] : null;
      const pcls = parent ? norm(clsOf(parent.raw)) : '';
      const onTable = isShell(tcls), onParent = isShell(pcls);
      if (onTable || onParent) {
        const k = (onTable ? 'A(在table)' : 'B(在父div)') + '  父=<' + (parent ? parent.name : '') + ' class="' + pcls + '">\n        table="' + tcls + '"';
        pairs.set(k, (pairs.get(k) || 0) + 1);
      }
    }
    if (!VOID.has(t.name) && !selfClose) stack.push(t);
  }
}
console.log('=== 表壳写法组合（产品页）===');
[...pairs.entries()].sort((a, b) => b[1] - a[1]).forEach(([k, n]) => console.log('\n' + String(n).padStart(4) + ' × ' + k));
