'use strict';
/* 表壳（rounded + border + shadow 卡片）上下文审计 —— 权威版
 *
 * 判据：
 *   变体 A = 卡片类写在 <table> 自身（配套 wrapper 只有 overflow-x-auto [reveal]）
 *   变体 B = 卡片类写在直接父 <div>
 *   有效背景 = 从 table 起向上找第一个「带 bg-* 的祖先」；找不到 = 页面默认（白）
 *
 * 缺陷判据：卡片内无白色背景（table 与 wrapper 都没有 bg-white/bg-slate-*）
 *           且有效背景 ≠ 白 → 卡片是「空心卡」（边框+阴影围着与页面同色的空洞）
 *
 * 用法: node scripts/audit-shell-context.js [--all] [--list] [--json]
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
const hasTok = (c, t) => new RegExp('(^|\\s)' + t + '(\\s|$)').test(norm(c));
const isShell = (c) => {
  const s = norm(c);
  // ⚠️⚠️ 必须排除「内容卡」：blog 正文灰卡 = bg-slate-50 rounded-xl p-6 border border-slate-200 shadow-sm
  //    它同样满足「圆角+边框+阴影」，但它是**章节容器**不是表壳 ——
  //    表壳从不带内边距（padding 由表格单元格提供），内容卡必带 p-6。
  //    实测：不排除会把 41 个 blog 页的正文表格全部误判成「空心卡」。
  if (/(^|\s)p[xy]?-?\d/.test(s) || /(^|\s)p-\d/.test(s)) return false;
  return /(^|\s)rounded-(xl|2xl|3xl)(\s|$)/.test(s) && /(^|\s)border(\s|$)/.test(s) && /(^|\s)shadow(-sm|-md)?(\s|$)/.test(s);
};
const WHITEISH = /(^|\s)bg-white(\s|$)/;
const ANY_BG = /(^|\s)bg-(white|black|slate-\d+|gray-\d+|brand\w+)(\/\d+)?(\s|$)/;

const rows = [];
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
      const parent = stack.length ? stack[stack.length - 1] : null;
      const pcls = parent ? norm(clsOf(parent.raw)) : '';
      const onTable = isShell(tcls), onParent = isShell(pcls);
      if (onTable || onParent) {
        // 有效背景：向上找第一个带 bg-* 的祖先（含 wrapper / section / body）
        let effBg = null;
        for (let i = stack.length - 1; i >= 0; i--) {
          const c = norm(clsOf(stack[i].raw));
          if (ANY_BG.test(c)) { effBg = (c.match(ANY_BG) || [])[0].trim(); break; }
        }
        const cardBg = WHITEISH.test(tcls) ? 'table:bg-white' : (WHITEISH.test(pcls) ? 'wrapper:bg-white' : 'NONE');
        rows.push({ rel, v: onTable ? 'A' : 'B', effBg: effBg || '(白/默认)', cardBg, reveal: hasTok(pcls, 'reveal'), tcls, pcls });
      }
    }
    if (!VOID.has(t.name) && !selfClose) stack.push(t);
  }
}

const g = new Map();
for (const r of rows) {
  const k = '变体' + r.v + '  有效背景=' + r.effBg + '  卡片白底=' + r.cardBg;
  g.set(k, (g.get(k) || 0) + 1);
}
console.log('=== 表壳上下文（' + rows.length + ' 个表）===');
[...g.entries()].sort((a, b) => b[1] - a[1]).forEach(([k, n]) => console.log(String(n).padStart(4) + ' × ' + k));

// 空心 ⟺ 卡片自身无白底，且其有效背景不是白（也不是「未设背景 → 白」）
const isWhiteBg = (b) => b === '(白/默认)' || /(^|\s)bg-white(\s|$)/.test(b);
const hollow = rows.filter((r) => r.cardBg === 'NONE' && !isWhiteBg(r.effBg));
console.log('\n=== ❌ 空心卡（卡片无白底 且 有效背景非白）: ' + hollow.length + ' ===');
hollow.forEach((r) => console.log('  ' + r.rel + '   [有效背景=' + r.effBg + ']'));

if (process.argv.includes('--json')) {
  console.log('\n' + JSON.stringify(rows.filter((r) => r.cardBg === "NONE" && !isWhiteBg(r.effBg)), null, 1));
}
