/* 元数据「跨语言一致性」分类器（只读）
 *
 * 目的：把 audit-meta-matrix.js 的覆盖率矩阵，按**判据**定性 ——
 *   同一页型下，某字段在 6 个语言里「覆盖率是否一致」？
 *     · 全语言一致缺失  → 该页型的**设计**（该页型本不需要此字段）
 *     · 全语言一致覆盖  → 已统一
 *     · 语言间不一致    → **架构不统一 / 本土化漏点**（缺陷候选，需逐条定性）
 *
 * 这是区分「设计 vs 缺陷」的权威判据：跨语言值/结构不同是本土化，
 * 但同一页型的**元数据字段存在性**应当一致 —— 不一致即架构裂缝。
 *
 * 用法：node scripts/audit-meta-consistency.js [--only=field1,field2]
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '_site');
const LANGS = ['en', 'de', 'es', 'fr', 'ru', 'pl'];

function classify(url) {
  const p = url.replace(/^\//, '').replace(/\/$/, '');
  const parts = p.split('/');
  const lang = LANGS.includes(parts[0]) ? parts[0] : 'en';
  const rest = lang === 'en' ? parts : parts.slice(1);
  const seg = rest[0] || '';
  const sub = rest.length > 1;
  if (seg === 'blog') return 'blog-article|' + (sub ? 'article' : 'list');
  if (['products', 'produkte', 'productos', 'produits', 'produkty'].includes(seg)) return 'product|' + (sub ? 'detail' : 'list');
  if (['case-studies', 'fallbeispiele', 'casos-de-exito', 'etudes-de-cas', 'studia-przypadkow'].includes(seg)) return 'case|detail';
  if (['authors', 'autoren'].includes(seg)) return 'author|detail';
  if (['service', 'servicio-oem-odm', 'service-oem-odm', 'uslugi-oem-odm', 'oem-odm-service', 'oem-odm-uslugi'].includes(seg)) return 'service|detail';
  if (seg === '') return 'home|root';
  if (seg === '404.html') return '404|root';
  return 'static|detail';
}

const FIELDS = {
  title: (s) => /<title>[^<]+<\/title>/.test(s),
  desc: (s) => /<meta\s+name="description"\s+content="[^"]+"/.test(s),
  canonical: (s) => /<link\s+rel="canonical"\s+href="https?:\/\/[^"]+"/.test(s),
  robots: (s) => /<meta\s+name="robots"/.test(s),
  hreflang: (s) => /<link\s+rel="alternate"\s+hreflang=/.test(s),
  xdefault: (s) => /hreflang="x-default"/.test(s),
  ogTitle: (s) => /property="og:title"/.test(s),
  ogDesc: (s) => /property="og:description"/.test(s),
  ogUrl: (s) => /property="og:url"/.test(s),
  ogImage: (s) => /property="og:image"/.test(s),
  ogImageDim: (s) => /property="og:image:width"/.test(s) && /property="og:image:height"/.test(s),
  ogImageAlt: (s) => /property="og:image:alt"/.test(s),
  ogLocale: (s) => /property="og:locale"/.test(s),
  ogSiteName: (s) => /property="og:site_name"/.test(s),
  twCard: (s) => /name="twitter:card"/.test(s),
  twImage: (s) => /name="twitter:image"/.test(s),
  twCreator: (s) => /name="twitter:creator"|name="twitter:site"/.test(s),
  jsonld: (s) => /application\/ld\+json/.test(s),
  articleMeta: (s) => /property="article:published_time"/.test(s),
  authorMeta: (s) => /name="author"/.test(s),
  viewport: (s) => /name="viewport"/.test(s),
  themeColor: (s) => /name="theme-color"/.test(s),
  breadcrumb: (s) => /"@type"\s*:\s*"BreadcrumbList"/.test(s),
  org: (s) => /"@type"\s*:\s*"Organization"/.test(s),
  website: (s) => /"@type"\s*:\s*"WebSite"/.test(s),
  person: (s) => /"@type"\s*:\s*"Person"/.test(s),
  faqPage: (s) => /"@type"\s*:\s*"FAQPage"/.test(s),
  speakable: (s) => /"speakable"/.test(s),
};

const rows = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.html')) {
      const rel = path.relative(ROOT, p).split(path.sep).join('/');
      const url = '/' + rel.replace(/index\.html$/, '');
      const s = fs.readFileSync(p, 'utf8');
      const f = {};
      for (const [k, fn] of Object.entries(FIELDS)) f[k] = fn(s) ? 1 : 0;
      rows.push({ key: classify(url), lang: LANGS.includes(url.split('/')[1]) ? url.split('/')[1] : 'en', url, f });
    }
  }
})(ROOT);

// 按 pageType 分组（⚠️ 必须用完整 key：`blog-article|list` 与 `blog-article|article`
// 是两种页型，混在一起会让分母偏移、把 list 页的"本就没有"误报成"article 缺"）
const byType = new Map();
for (const r of rows) {
  if (!byType.has(r.key)) byType.set(r.key, []);
  byType.get(r.key).push(r);
}

const keys = Object.keys(FIELDS);

console.log('=== 元数据跨语言一致性分类 ===\n');
console.log('判据：同一页型下，字段在 6 语言的存在性是否一致\n');

const inconsistent = []; // 需人工定性
const uniformZero = [];  // 该页型设计上不需要
const uniformFull = [];  // 已统一

for (const t of [...byType.keys()].sort()) {
  const list = byType.get(t);
  const langsPresent = [...new Set(list.map((r) => r.lang))].sort();
  console.log('── ' + t + '  (语言: ' + langsPresent.join(',') + ')');
  for (const k of keys) {
    const per = {};
    for (const lg of langsPresent) {
      const sub = list.filter((r) => r.lang === lg);
      per[lg] = sub.reduce((a, r) => a + r.f[k], 0) + '/' + sub.length;
    }
    const vals = langsPresent.map((lg) => per[lg]);
    const allFull = vals.every((v) => v.split('/')[0] === v.split('/')[1]);
    const allZero = vals.every((v) => v.split('/')[0] === '0');
    if (allFull) { uniformFull.push(t + '.' + k); continue; }
    if (allZero) { uniformZero.push(t + '.' + k); continue; }
    // 不一致
    const uniformPartial = vals.every((v) => v === vals[0]);
    inconsistent.push({ type: t, field: k, per, uniformPartial });
    console.log(
      '   ' + (uniformPartial ? '⚠ ' : '⚠⚠') + ' ' + k.padEnd(13) +
      langsPresent.map((lg) => lg + '=' + per[lg]).join('  ')
    );
  }
}

console.log('\n=== 汇总 ===');
console.log(`✅ 全语言一致覆盖 (${uniformFull.length})`);
console.log(`·  全语言一致缺失 → 该页型设计上不需要 (${uniformZero.length}):`);
const zByType = {};
for (const s of uniformZero) { const [t, f] = s.split('.'); (zByType[t] = zByType[t] || []).push(f); }
for (const t of Object.keys(zByType).sort()) console.log('     ' + t.padEnd(16) + zByType[t].join(' · '));

console.log(`\n⚠️  语言间不一致 → 架构裂缝 / 本土化漏点 (${inconsistent.length}):`);
for (const i of inconsistent) {
  console.log(`     ${i.type}.${i.field}   ${Object.entries(i.per).map(([l, v]) => l + '=' + v).join('  ')}${i.uniformPartial ? '   [部分语言整体缺]' : ''}`);
}
