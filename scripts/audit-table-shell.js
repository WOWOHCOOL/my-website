'use strict';
/* 表格「表壳挂载点 + 宽度约束」形态审计（产物侧，静态解析）
 *
 * 目的：把全站 <table> 按两个维度分类，为「归一」提供量化依据。
 *   维度 A 表壳挂载点 —— `rounded-2xl border shadow-sm` 写在 <table> 自身，还是父 <div>
 *   维度 B 宽度约束   —— 表格（或某层祖先）是否带 `max-w-4xl mx-auto`
 *
 * 用法: node scripts/audit-table-shell.js [--verbose]
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
    if (e.isDirectory()) walk(p, o);
    else if (e.name.endsWith('.html')) o.push(p);
  }
  return o;
}

const norm = (s) => String(s || '').replace(/\s+/g, ' ').trim();
const hasToken = (cls, t) => new RegExp('(^|\\s)' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(\\s|$)').test(norm(cls));

/* 表壳特征：圆角 + 边框 + 阴影同现 */
function isShell(cls) {
  const c = norm(cls);
  return /(^|\s)rounded-(xl|2xl|3xl)(\s|$)/.test(c) && /(^|\s)border(\s|$)/.test(c) && /(^|\s)shadow(-sm|-md)?(\s|$)/.test(c);
}

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
      // 最近带 max-w-4xl 的祖先
      let mw = null;
      for (let i = stack.length - 1; i >= 0; i--) {
        const c = norm(clsOf(stack[i].raw));
        if (hasToken(c, 'max-w-4xl')) { mw = stack[i].name + '.' + c; break; }
      }
      // 最近带 max-w-7xl / container-wide 的祖先
      let wide = null;
      for (let i = stack.length - 1; i >= 0; i--) {
        const c = norm(clsOf(stack[i].raw));
        if (hasToken(c, 'max-w-7xl')) { wide = stack[i].name + '.' + c; break; }
      }
      const secId = (() => { for (let i = stack.length - 1; i >= 0; i--) { const id = idOf(stack[i].raw); if (id) return id; } return ''; })();
      rows.push({
        rel, secId,
        shellOnTable: isShell(cls),
        shellOnParent: isShell(pCls),
        tableCls: cls,
        parentTag: parent ? parent.name : '',
        parentCls: pCls,
        maxW4xl: mw,
        maxW7xl: wide,
      });
    }
    if (!VOID.has(t.name) && !selfClose) stack.push(t);
  }
}

const key = (r) => `shell=${r.shellOnTable ? 'TABLE' : (r.shellOnParent ? 'PARENT' : 'NONE')}  mw4xl=${r.maxW4xl ? 'Y' : 'N'}  mw7xl=${r.maxW7xl ? 'Y' : 'N'}`;
const groups = new Map();
for (const r of rows) {
  const k = key(r);
  if (!groups.has(k)) groups.set(k, []);
  groups.get(k).push(r);
}

console.log('=== 全站 <table> 形态分布（' + rows.length + ' 个）===');
[...groups.entries()].sort((a, b) => b[1].length - a[1].length).forEach(([k, v]) => {
  console.log(String(v.length).padStart(5) + ' × ' + k);
});

console.log('\n=== max-w-4xl 约束的表格按页面分布 ===');
const byFile = new Map();
for (const r of rows) if (r.maxW4xl) byFile.set(r.rel, (byFile.get(r.rel) || 0) + 1);
[...byFile.entries()].sort((a, b) => b[1] - a[1]).forEach(([f, n]) => console.log('  ' + String(n).padStart(2) + '  ' + f));

if (process.argv.includes('--verbose')) {
  console.log('\n=== 明细（前 40）===');
  rows.slice(0, 40).forEach((r) => console.log(`  [${r.shellOnTable ? 'T' : (r.shellOnParent ? 'P' : '-')}] ${r.rel}  #${r.secId}\n       table="${r.tableCls}"\n       parent=${r.parentTag}"${r.parentCls}"\n       mw4xl=${r.maxW4xl || '-'}`));
}
