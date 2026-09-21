/* 产品页 speakable 逐页核对（只读） */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', '_site');
const LANGS = ['en', 'de', 'es', 'fr', 'ru', 'pl'];
const PRODSEG = ['products', 'produkte', 'productos', 'produits', 'produkty'];

const rows = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.html')) {
      const rel = path.relative(ROOT, p).split(path.sep).join('/');
      rows.push({ url: '/' + rel.replace(/index\.html$/, ''), s: fs.readFileSync(p, 'utf8') });
    }
  }
})(ROOT);

for (const lg of LANGS) {
  const list = rows.filter((r) => {
    const parts = r.url.split('/').filter(Boolean);
    const lang = LANGS.includes(parts[0]) ? parts[0] : 'en';
    if (lang !== lg) return false;
    const rest = lang === 'en' ? parts : parts.slice(1);
    return PRODSEG.includes(rest[0]);
  }).sort((a, b) => a.url.localeCompare(b.url));

  const detail = list.filter((r) => r.url.split('/').filter(Boolean).length > 2 || (lg === 'en' && r.url.split('/').filter(Boolean).length > 2));
  console.log(`\n=== ${lg}  产品页 ${list.length} 个（含列表页） ===`);
  for (const r of list) {
    const sp = /"speakable"/.test(r.s);
    const depth = r.url.split('/').filter(Boolean).length;
    const isList = depth === 1 || (lg !== 'en' && depth === 2);
    console.log((sp ? '  ok   ' : '  ✗✗✗  ') + (isList ? '[列表] ' : '       ') + r.url);
  }
}
