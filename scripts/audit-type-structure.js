/* 同类型页面结构一致性审计（只读）
 *
 * 口径（用户 2026-09-21 提问确立）：
 *   「跨语言不同」= 设计；「同一语言内同类型页面不同」= 候选缺陷。
 *   按 [语言 × 页面类型] 分组，组内比对 depth-0 section 序列指纹。
 *
 * ⚠️ 依赖 lib-html-sections.js —— 它已修正两个陷阱：
 *    script 内 `i < arr.length` 的游离 `<`、以及文本里 `<=30%` 的游离 `<`。
 *    未修正时会把 ES/RU 首页 12 个 section 误判成 1 个、lithium-battery 11 个误判成 5 个。
 *
 * 用法：node scripts/audit-type-structure.js [--json] [--type=blog-article] [--lang=en]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { topSections } = require('./lib-html-sections.js');

const ROOT = path.join(__dirname, '..', '_site');
const asJson = process.argv.includes('--json');
const arg = (k) => (process.argv.find((a) => a.startsWith('--' + k + '=')) || '').split('=')[1];
const onlyType = arg('type');
const onlyLang = arg('lang');

const LANGS = ['en', 'de', 'es', 'fr', 'ru', 'pl'];

function classify(url) {
  const p = url.replace(/^\//, '').replace(/\/$/, '');
  const parts = p.split('/');
  const lang = LANGS.includes(parts[0]) ? parts[0] : 'en';
  const rest = lang === 'en' ? parts : parts.slice(1);
  const seg = rest[0] || '';
  const sub = rest.length > 1;
  if (seg === 'blog') return { lang, type: sub ? 'blog-article' : 'blog-list' };
  if (seg === 'products') return { lang, type: sub ? 'product' : 'products-list' };
  if (seg === 'case-studies') return { lang, type: sub ? 'case-study' : 'case-list' };
  if (seg === 'authors') return { lang, type: sub ? 'author' : 'authors-list' };
  if (seg === 'service') return { lang, type: 'service' };
  if (seg === '') return { lang, type: 'home' };
  return { lang, type: 'static' };
}

const pages = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.html')) {
      const rel = path.relative(ROOT, p).split(path.sep).join('/');
      const url = '/' + rel.replace(/index\.html$/, '');
      const { lang, type } = classify(url);
      const secs = topSections(fs.readFileSync(p, 'utf8'));
      pages.push({
        url, lang, type, n: secs.length,
        sig: secs.map((s) => `${s.bg}/${s.c}${s.dark ? 'D' : ''}${s.bY ? 'B' : ''}`).join(' > '),
      });
    }
  }
})(ROOT);

const groups = new Map();
for (const pg of pages) {
  if (onlyType && pg.type !== onlyType) continue;
  if (onlyLang && pg.lang !== onlyLang) continue;
  const k = pg.lang + ' :: ' + pg.type;
  if (!groups.has(k)) groups.set(k, []);
  groups.get(k).push(pg);
}

const result = [];
for (const [k, list] of [...groups.entries()].sort()) {
  const bySig = new Map();
  for (const pg of list) {
    if (!bySig.has(pg.sig)) bySig.set(pg.sig, []);
    bySig.get(pg.sig).push(pg.url);
  }
  const counts = [...bySig.entries()].sort((a, b) => b[1].length - a[1].length);
  result.push({
    group: k, pages: list.length, variants: counts.length,
    modalShare: counts[0] ? counts[0][1].length : 0,
    sectionCounts: [...new Set(list.map((p) => p.n))].sort((a, b) => a - b),
    deviants: counts.slice(1).map(([sig, urls]) => ({ n: urls.length, sig, urls })),
  });
}

if (asJson) { console.log(JSON.stringify(result, null, 2)); process.exit(0); }

console.log('=== 同类型页面结构一致性（[语言 × 类型] 分组 · depth-0 section）===\n');
let g = 0, bad = 0, dev = 0;
for (const r of result) {
  g++;
  const ok = r.variants === 1;
  if (!ok) { bad++; dev += r.pages - r.modalShare; }
  console.log(`${ok ? '✅' : '⚠️ '} ${r.group.padEnd(24)} 页数=${String(r.pages).padStart(3)}  section数=${JSON.stringify(r.sectionCounts)}  变体=${String(r.variants).padStart(2)}  主流=${r.modalShare}/${r.pages}`);
}
console.log(`\n分组 ${g} · 完全统一 ${g - bad} · 有变体 ${bad} · 偏离主流页数 ${dev}`);

console.log('\n--- 仅列「同语言内多页但结构不统一」的分组 ---');
for (const r of result) {
  if (r.variants === 1 || r.pages < 2) continue;
  console.log(`\n⚠️  ${r.group}  页数=${r.pages}  变体=${r.variants}`);
  for (const d of r.deviants) {
    console.log(`     ${String(d.n).padStart(2)} 页  ${d.sig}`);
    if (d.n <= 4) d.urls.forEach((u) => console.log(`            ${u}`));
  }
}
