/* blog 文章页结构一致性审计（只读）
 *
 * 拆两层看：
 *   页面骨架 = 正文之外的模板注入 section（#faq / #author-bio / CTA / 相关文章 …）
 *   正文 body = id 命中该页 TOC 锚点的那些 <section>
 *
 * 用法：node scripts/audit-blog-structure.js [--json]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { eachTag, clsOf, idOf } = require('./lib-html-sections.js');

const ROOT = path.join(__dirname, '..', '_site');
const LANGS = ['en', 'de', 'es', 'fr', 'ru', 'pl'];
const asJson = process.argv.includes('--json');

/* 取 depth-0 section，同时保留原始 class 串 */
function topSectionsRaw(html) {
  const out = [];
  let depth = 0;
  for (const t of eachTag(html)) {
    if (t.name !== 'section') continue;
    if (t.closing) { if (depth > 0) depth--; continue; }
    if (depth === 0) out.push({ id: idOf(t.raw), cls: clsOf(t.raw) });
    depth++;
  }
  return out;
}

const pages = [];
for (const lang of LANGS) {
  const dir = lang === 'en' ? path.join(ROOT, 'blog') : path.join(ROOT, lang, 'blog');
  if (!fs.existsSync(dir)) continue;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    const p = path.join(dir, e.name, 'index.html');
    if (!fs.existsSync(p)) continue;
    pages.push({ lang, slug: e.name, url: '/' + (lang === 'en' ? '' : lang + '/') + 'blog/' + e.name + '/', html: fs.readFileSync(p, 'utf8') });
  }
}

// 骨架 = 这些 id / 特征
const SKELETON_IDS = ['faq', 'author-bio'];
const rows = [];
for (const pg of pages) {
  const secs = topSectionsRaw(pg.html);
  const faqIdx = secs.findIndex((s) => s.id === 'faq');
  const body = faqIdx >= 0 ? secs.slice(0, faqIdx) : secs;
  const tail = faqIdx >= 0 ? secs.slice(faqIdx) : [];

  // 正文 section 的样式签名：把 class 归一化成「有 bg-white 卡片 / 无背景 / 其它」
  const bodySig = [...new Set(body.map((s) => {
    if (/\bbg-white\b/.test(s.cls) && /\bborder\b/.test(s.cls) && /\brounded-2xl\b/.test(s.cls)) return 'CARD(bg-white+border+rounded-2xl)';
    if (/\bbg-white\b/.test(s.cls)) return 'bg-white';
    if (!/bg-(?:white|slate-50|slate-100|slate-200|darkBg|brandBlue|brandBlueLight|brandOrange)\b/.test(s.cls)) return 'NO-BG';
    return 'OTHER';
  }))];

  // 骨架签名：tail 里每个 section 的 id + 是否有 bg
  const tailSig = tail.map((s) => (s.id || '-') + ':' + ((s.cls.match(/bg-(?:white|slate-50|slate-100|slate-200|darkBg|brandBlue|brandBlueLight|brandOrange)\b/) || ['none'])[0])).join(' > ');

  rows.push({ lang: pg.lang, slug: pg.slug, url: pg.url, bodyCount: body.length, bodySig, tailSig, tailIds: tail.map((s) => s.id || '(no id)').join(',') });
}

// 骨架聚类
const tailMap = new Map();
for (const r of rows) {
  if (!tailMap.has(r.tailSig)) tailMap.set(r.tailSig, []);
  tailMap.get(r.tailSig).push(r);
}
// 正文样式聚类
const bodyMap = new Map();
for (const r of rows) {
  const k = r.bodySig.join('+');
  if (!bodyMap.has(k)) bodyMap.set(k, []);
  bodyMap.get(k).push(r);
}

if (asJson) { console.log(JSON.stringify({ rows, tails: [...tailMap.entries()].map(([k, v]) => ({ sig: k, n: v.length })), bodies: [...bodyMap.entries()].map(([k, v]) => ({ sig: k, n: v.length })) }, null, 2)); process.exit(0); }

console.log('=== blog 文章页结构审计（共 ' + rows.length + ' 篇）===\n');

console.log('── A. 页面骨架（#faq 及其后）──');
const tails = [...tailMap.entries()].sort((a, b) => b[1].length - a[1].length);
for (const [sig, list] of tails) {
  console.log(`  ${String(list.length).padStart(3)} 篇  ${sig}`);
  if (list.length <= 6) list.forEach((r) => console.log(`         ${r.lang} ${r.url}`));
}
console.log('  骨架变体数: ' + tails.length);

console.log('\n── B. 正文 section 样式 ──');
const bodies = [...bodyMap.entries()].sort((a, b) => b[1].length - a[1].length);
for (const [sig, list] of bodies) {
  const byLang = {};
  for (const r of list) byLang[r.lang] = (byLang[r.lang] || 0) + 1;
  console.log(`  ${String(list.length).padStart(3)} 篇  [${sig}]   语言分布 ${JSON.stringify(byLang)}`);
  if (list.length <= 8) list.forEach((r) => console.log(`         ${r.lang} ${r.url}`));
}
console.log('  正文样式变体数: ' + bodies.length);

console.log('\n── C. 正文 section 数量分布 ──');
const cnt = {};
for (const r of rows) cnt[r.bodyCount] = (cnt[r.bodyCount] || 0) + 1;
console.log('  ' + Object.entries(cnt).sort((a, b) => +a[0] - +b[0]).map(([k, v]) => k + '个:' + v + '篇').join('  '));
