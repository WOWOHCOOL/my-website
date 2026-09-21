/* blog 文章页「尾部元素角色序列」审计（只读）
 * 角色判定基于语义，不基于 class 串：
 *   AUTHOR  = #author-bio
 *   BANNER  = 含 from-brandBlue to-slate-800 的 CTA 横幅
 *   RELATED = #related-articles
 *   SOURCES = 含 sources 标题 h2 的那个 depth-0 元素
 *   FORMC   = class 含 "sec bg-brandBlue"（partial 表单 CTA）
 *   EXTRA   = 以上都不是（author-bio 之后的杂项）
 * 期望序列：AUTHOR > BANNER > RELATED > SOURCES > FORMC
 * 用法：node scripts/audit-blog-roles.js [--list]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { eachTag, clsOf, idOf } = require('./lib-html-sections.js');
const ROOT = path.join(__dirname, '..', '_site');
const LANGS = ['en', 'de', 'es', 'fr', 'ru', 'pl'];
const SHOW = process.argv.includes('--list');
const SRC_RE = /(sources|fuentes|quellen|fonti|источник|źródł)/i;

function analyze(html) {
  const tops = [];
  const stack = [];
  let cursor = 0;
  const h2s = [];
  for (const t of eachTag(html)) {
    const at = html.indexOf(t.raw, cursor);
    if (at < 0) continue;
    cursor = at + t.raw.length;
    if (t.name === 'h2' && !t.closing) {
      const txt = html.slice(cursor, cursor + 140).replace(/<[^>]*>/g, '');
      h2s.push({ at, txt });
    }
    if (!/^(section|aside)$/.test(t.name)) continue;
    if (t.closing) { const s = stack.pop(); if (s) s.end = cursor; continue; }
    const node = { tag: t.name, cls: clsOf(t.raw), id: idOf(t.raw), start: at, end: -1 };
    if (stack.length === 0) tops.push(node);
    stack.push(node);
  }
  // 兜底：未闭合
  tops.forEach((n) => { if (n.end < 0) n.end = html.length; });

  const role = (n) => {
    if (n.id === 'author-bio') return 'AUTHOR';
    // banner 可能被一层 <section class="max-w-4xl ..."> 包住 → 查整段 HTML
    // ⚠️ 只认 to-br：related 卡片里的装饰条是 to-r（假阳性来源）
    if (/from-brandBlue to-slate-800/.test(n.cls) || /bg-gradient-to-br from-brandBlue to-slate-800/.test(html.slice(n.start, n.end))) return 'BANNER';
    if (n.id === 'related-articles') return 'RELATED';
    if (/\bsec bg-brandBlue\b/.test(n.cls)) return 'FORMC';
    const h = h2s.find((x) => x.at > n.start && x.at < n.end && SRC_RE.test(x.txt));
    if (h) return 'SOURCES';
    return 'EXTRA';
  };
  const roles = tops.map((n) => ({ r: role(n), n }));
  const ai = roles.findIndex((x) => x.r === 'AUTHOR');
  const tail = ai >= 0 ? roles.slice(ai) : roles;
  return { seq: tail.map((x) => x.r).join(' > '), tail, total: tops.length };
}

const groups = new Map();
let total = 0;
for (const lang of LANGS) {
  const dir = lang === 'en' ? path.join(ROOT, 'blog') : path.join(ROOT, lang, 'blog');
  if (!fs.existsSync(dir)) continue;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    const p = path.join(dir, e.name, 'index.html');
    if (!fs.existsSync(p)) continue;
    const html = fs.readFileSync(p, 'utf8');
    if (!/id="faq"/.test(html)) continue;
    total++;
    const { seq } = analyze(html);
    if (!groups.has(seq)) groups.set(seq, []);
    groups.get(seq).push(lang + '/' + e.name);
  }
}

const EXPECT = 'AUTHOR > BANNER > RELATED > SOURCES > FORMC';
const sorted = [...groups.entries()].sort((a, b) => b[1].length - a[1].length);
console.log('blog 文章页总数: ' + total + '  角色序列组数: ' + sorted.length);
console.log('期望序列: ' + EXPECT + '\n');
sorted.forEach(([k, list], i) => {
  const ok = k === EXPECT ? '  ✅' : '';
  console.log('[' + (i + 1) + '] ' + String(list.length).padStart(3) + ' 篇  ' + k + ok);
  if (SHOW && list.length <= 40) list.forEach((u) => console.log('        ' + u));
  else { const by = {}; list.forEach((u) => { const l = u.split('/')[0]; by[l] = (by[l] || 0) + 1; }); console.log('        语言分布: ' + JSON.stringify(by)); }
  console.log('');
});
