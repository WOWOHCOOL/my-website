/* 定位「语言间不一致」的具体缺失 URL（只读）
 * 用法：node scripts/dump-meta-gap.js
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '_site');
const LANGS = ['en', 'de', 'es', 'fr', 'ru', 'pl'];

const TARGETS = {
  speakable: (s) => /"speakable"/.test(s),
  faqPage: (s) => /"@type"\s*:\s*"FAQPage"/.test(s),
  breadcrumb: (s) => /"@type"\s*:\s*"BreadcrumbList"/.test(s),
};

const rows = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.html')) {
      const rel = path.relative(ROOT, p).split(path.sep).join('/');
      const url = '/' + rel.replace(/index\.html$/, '');
      rows.push({ url, lang: LANGS.includes(url.split('/')[1]) ? url.split('/')[1] : 'en', s: fs.readFileSync(p, 'utf8') });
    }
  }
})(ROOT);

for (const [name, fn] of Object.entries(TARGETS)) {
  console.log('\n=== ' + name + ' 缺失清单（按语言）===');
  for (const lg of LANGS) {
    const sub = rows.filter((r) => r.lang === lg);
    const miss = sub.filter((r) => !fn(r.s));
    console.log(`\n  [${lg}]  ${sub.length - miss.length}/${sub.length} 有  → 缺 ${miss.length} 个`);
    for (const m of miss) console.log('      ✗ ' + m.url);
  }
}

// 404 页的 breadcrumb 详情
console.log('\n=== 404 页逐语言 breadcrumb 详情 ===');
for (const lg of LANGS) {
  const p = path.join(ROOT, lg === 'en' ? '404.html' : lg + '/404.html');
  if (!fs.existsSync(p)) { console.log(`  ${lg}: (无 404 页)`); continue; }
  const s = fs.readFileSync(p, 'utf8');
  console.log(`  ${lg}: breadcrumb=${TARGETS.breadcrumb(s) ? '有' : '无'}  canonical=${/<link rel="canonical"/.test(s) ? '有' : '无'}`);
}
