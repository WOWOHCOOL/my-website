/* 按骨架变体列出 blog 文章页（只读）
 * 用法：node scripts/list-blog-variants.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { eachTag, clsOf, idOf, PALETTE_RE } = require('./lib-html-sections.js');

const ROOT = path.join(__dirname, '..', '_site');
const LANGS = ['en', 'de', 'es', 'fr', 'ru', 'pl'];

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

function bgOf(cls) {
  if (/\bbg-brandBlue\b/.test(cls)) return 'bg-brandBlue';
  if (/\bbg-slate-50\b/.test(cls)) return 'bg-slate-50';
  if (/\bbg-white\b/.test(cls)) return 'bg-white';
  return 'none';
}

const SKEL_IDS = ['faq', 'author-bio'];
const byVariant = new Map();

for (const lang of LANGS) {
  const dir = lang === 'en' ? path.join(ROOT, 'blog') : path.join(ROOT, lang, 'blog');
  if (!fs.existsSync(dir)) continue;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    const p = path.join(dir, e.name, 'index.html');
    if (!fs.existsSync(p)) continue;
    const html = fs.readFileSync(p, 'utf8');
    const secs = topSectionsRaw(html);

    // 找 #faq 或 data-section="faq" 的位置
    let fi = secs.findIndex((s) => /faq/i.test(s.id || '') || /data-section="faq"/.test(s.id || ''));
    if (fi < 0) fi = secs.findIndex((s) => /faq/i.test(s.cls || ''));
    const skel = (fi >= 0 ? secs.slice(fi) : secs.slice(-4));
    const fp = skel.map((s) => {
      const key = /faq/i.test(s.id || '') ? 'faq' : /author-bio/i.test(s.id || '') ? 'author-bio' : (/sources/i.test(s.id || '') ? 'sources' : '-');
      return key + ':' + bgOf(s.cls || '');
    }).join(' > ');

    if (!byVariant.has(fp)) byVariant.set(fp, []);
    byVariant.get(fp).push(lang + ' /' + (lang === 'en' ? '' : lang + '/') + 'blog/' + e.name + '/');
  }
}

const sorted = [...byVariant.entries()].sort((a, b) => b[1].length - a[1].length);
console.log('=== 骨架变体（按篇数降序）===\n');
sorted.forEach(([fp, list], i) => {
  console.log('[' + (i + 1) + '] ' + list.length + ' 篇  ' + fp);
  if (list.length <= 12) list.forEach((u) => console.log('        ' + u));
  else {
    const byLang = {};
    list.forEach((u) => { const l = u.split(' ')[0]; byLang[l] = (byLang[l] || 0) + 1; });
    console.log('        语言分布: ' + JSON.stringify(byLang));
  }
  console.log('');
});
