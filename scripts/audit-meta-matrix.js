/* 元数据覆盖矩阵（只读）
 * 按 [语言 × 页面类型] 汇总必备 meta 的覆盖率，找出「某些页型缺某些字段」。
 * 用法：node scripts/audit-meta-matrix.js [--json]
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '_site');
const asJson = process.argv.includes('--json');
const LANGS = ['en', 'de', 'es', 'fr', 'ru', 'pl'];

function classify(url) {
  const p = url.replace(/^\//, '').replace(/\/$/, '');
  const parts = p.split('/');
  const lang = LANGS.includes(parts[0]) ? parts[0] : 'en';
  const rest = lang === 'en' ? parts : parts.slice(1);
  const seg = rest[0] || '';
  const sub = rest.length > 1;
  if (seg === 'blog') return lang + ':' + (sub ? 'blog-article' : 'blog-list');
  if (seg === 'products' || seg === 'produkte' || seg === 'productos' || seg === 'produits' || seg === 'produkty' || seg === 'produkty') return lang + ':' + (sub ? 'product' : 'products-list');
  if (seg === 'case-studies' || seg === 'fallbeispiele' || seg === 'casos-de-exito' || seg === 'etudes-de-cas' || seg === 'studia-przypadkow') return lang + ':case';
  if (seg === 'authors' || seg === 'autoren') return lang + ':author';
  if (seg === 'service' || seg === 'servicio-oem-odm' || seg === 'service-oem-odm' || seg === 'uslugi-oem-odm' || seg === 'oem-odm-service' || seg === 'oem-odm-uslugi') return lang + ':service';
  if (seg === '') return lang + ':home';
  if (seg === '404.html') return lang + ':404';
  return lang + ':static';
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
      rows.push({ type: classify(url), url, f });
    }
  }
})(ROOT);

const groups = new Map();
for (const r of rows) {
  if (!groups.has(r.type)) groups.set(r.type, []);
  groups.get(r.type).push(r);
}

const keys = Object.keys(FIELDS);
const out = [];
for (const [t, list] of [...groups.entries()].sort()) {
  const cov = {};
  for (const k of keys) cov[k] = list.reduce((a, r) => a + r.f[k], 0);
  out.push({ type: t, n: list.length, cov });
}

if (asJson) { console.log(JSON.stringify(out, null, 2)); process.exit(0); }

const short = {
  title: 'title', desc: 'desc', canonical: 'canon', robots: 'robots', hreflang: 'hrefl', xdefault: 'x-def',
  ogTitle: 'ogT', ogDesc: 'ogD', ogUrl: 'ogU', ogImage: 'ogI', ogImageDim: 'ogWH', ogImageAlt: 'ogAlt',
  ogLocale: 'ogLoc', ogSiteName: 'ogSite', twCard: 'twC', twImage: 'twI', twCreator: 'twCr',
  jsonld: 'ld', articleMeta: 'artPub', authorMeta: 'auth', viewport: 'vp', themeColor: 'theme',
  breadcrumb: 'crumb', org: 'org', website: 'site', person: 'person', faqPage: 'faq', speakable: 'speak',
};

console.log('=== 元数据覆盖矩阵（分母 = 该组页数）===\n');
console.log('页型'.padEnd(22) + 'n'.padStart(4) + '  ' + keys.map((k) => short[k].padStart(6)).join(''));
for (const r of out) {
  const cells = keys.map((k) => {
    const c = r.cov[k];
    const s = c === r.n ? '✓' : c === 0 ? '·' : String(c);
    return s.padStart(6);
  });
  console.log(r.type.padEnd(22) + String(r.n).padStart(4) + '  ' + cells.join(''));
}

console.log('\n=== 缺口（该组有页但覆盖率 < 100%）===');
for (const r of out) {
  const gaps = keys.filter((k) => r.cov[k] > 0 && r.cov[k] < r.n);
  const zeros = keys.filter((k) => r.cov[k] === 0);
  if (!gaps.length && !zeros.length) continue;
  console.log(`\n  ${r.type}  (n=${r.n})`);
  if (gaps.length) console.log('    部分覆盖: ' + gaps.map((k) => `${k} ${r.cov[k]}/${r.n}`).join(' · '));
  if (zeros.length) console.log('    完全缺失: ' + zeros.join(' · '));
}
