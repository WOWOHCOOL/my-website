'use strict';
/* 产品页「对比表章节」的容器家族普查
 * 对每个含 <table>（非 details 规格表）的 section，记录：
 *   section 的容器 div class（container-content / container-wide / 其它）
 *   表格外壳是否带 max-w-4xl
 *   p 是否带 max-w-3xl
 * 用法: node scripts/audit-table-family.js
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
const hasTok = (c, t) => new RegExp('(^|\\s)' + t + '(\\s|$)').test(norm(c));

const rows = [];
for (const f of walk(ROOT)) {
  const rel = path.relative(ROOT, f).replace(/\\/g, '/');
  // 只看产品页
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
      if (/text-\[11px\]/.test(tcls)) { /* details 规格表，跳过 */ }
      else {
        // 找最近的 section
        let sec = null;
        for (let i = stack.length - 1; i >= 0; i--) if (stack[i].name === 'section') { sec = stack[i]; break; }
        // section 与 table 之间的容器 div
        let cont = null, pCls = null, shellCls = norm(clsOf(stack[stack.length - 1].raw));
        for (let i = stack.length - 1; i >= 0; i--) {
          if (sec && stack[i].start <= sec.start) break;
          const c = norm(clsOf(stack[i].raw));
          if (!cont && /(^|\s)container-/.test(c)) cont = c;
          if (stack[i].name === 'p' && !pCls) pCls = c;
        }
        // section 的直接子 div
        const secDiv = sec ? (() => {
          const after = html.slice(sec.end, sec.end + 300);
          const m = after.match(/^<div class="([^"]*)"/);
          return m ? m[1] : '';
        })() : '';
        const sid = sec ? (idOf(sec.raw) || '') : '';
        const p3xl = pCls ? hasTok(pCls, 'max-w-3xl') : null;
        const shell4xl = hasTok(shellCls, 'max-w-4xl');
        rows.push({ rel, sid, cont: cont || '(无)', secDiv: norm(secDiv), shell4xl, p3xl, lang: rel.split('/')[0] === 'products' ? 'en' : rel.split('/')[0] });
      }
    }
    if (!VOID.has(t.name) && !selfClose) stack.push(t);
  }
}

const g = new Map();
for (const r of rows) {
  const k = `容器=${r.cont}  shell4xl=${r.shell4xl ? 'Y' : 'N'}  p3xl=${r.p3xl === null ? '-' : (r.p3xl ? 'Y' : 'N')}`;
  if (!g.has(k)) g.set(k, []);
  g.get(k).push(r);
}
console.log('=== 产品页「对比表章节」形态分布（' + rows.length + ' 个表）===');
[...g.entries()].sort((a, b) => b[1].length - a[1].length).forEach(([k, v]) => {
  const langs = {};
  v.forEach((r) => { langs[r.lang] = (langs[r.lang] || 0) + 1; });
  console.log(String(v.length).padStart(4) + ' × ' + k + '   [' + Object.entries(langs).map(([a, b]) => a + ':' + b).join(' ') + ']');
});

console.log('\n=== 按语言 × 容器 ===');
const g2 = new Map();
for (const r of rows) {
  const k = r.lang + ' | ' + r.cont + ' | shell4xl=' + (r.shell4xl ? 'Y' : 'N');
  g2.set(k, (g2.get(k) || 0) + 1);
}
[...g2.entries()].sort().forEach(([k, n]) => console.log(String(n).padStart(4) + '  ' + k));

if (process.argv.includes('--ids')) {
  console.log('\n=== 各家族 section id ===');
  const g3 = new Map();
  for (const r of rows) {
    const k = '容器=' + r.cont + ' shell4xl=' + (r.shell4xl ? 'Y' : 'N');
    if (!g3.has(k)) g3.set(k, new Map());
    const m = g3.get(k);
    const id = (r.sid || '(无id)').replace(/-?\d+$/, '');
    m.set(id, (m.get(id) || 0) + 1);
  }
  [...g3.entries()].forEach(([k, m]) => {
    console.log('\n## ' + k);
    [...m.entries()].sort((a, b) => b[1] - a[1]).forEach(([id, n]) => console.log('   ' + String(n).padStart(3) + ' × #' + id));
  });
}
