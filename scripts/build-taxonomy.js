/**
 * build-taxonomy.js — 由单一真源生成两个模板视图（2026-10-29）
 *
 * 真源：src/_taxonomy/taxonomy.json
 *   categories[].lang[lang]   { href, name, subtitle, more }         → 总页「产品线横带」
 *   categories[].hub[lang]    { sectionId, eyebrow, h2, intro, linkLabel } → 父页 section 头
 *   categories[].families[].lang[lang] { href, name, short, long, badge, meta, extra, img, bg }
 *       short → 总页卡片摘要；long → 父页卡片描述（两者用途不同，故意分开）
 *
 * 产出（都是**内联数据**的 .js，不是 require 外部 json）：
 *   src/_data/productCatalog.js   → product-range-bands.njk 用（总页）
 *   src/_data/productFamilies.js  → product-family-cards.njk 用（父页）
 *   src/_data/product-inventory.json → 机器用「系列清单」（.eleventy.js 型号计数 / 校验器）
 *
 * ⚠️ 为什么内联：Eleventy 按数据文件自身内容的哈希判断是否重新求值。
 *    若这里只写 `require('../_taxonomy/taxonomy.json')`，改了 taxonomy 但 .js 内容不变，
 *    Eleventy 会复用缓存 ⇒ 模板拿不到新数据，且**静默渲染成空、不报错**。
 *    内联后任何数据变更都会改变 .js 内容，缓存自然失效。
 *
 * 用法：node scripts/build-taxonomy.js
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src/_taxonomy/taxonomy.json');
const LANGS = ['en', 'de', 'es', 'fr', 'ru', 'pl'];

const tax = JSON.parse(fs.readFileSync(SRC, 'utf8'));
if (!Array.isArray(tax.categories) || !tax.categories.length) {
  throw new Error('[build-taxonomy] taxonomy.json 里没有 categories');
}

/** 总页视图：{ lang: { ranges: [ { href, name, subtitle, more, families:[{href,name,desc,img,bg}] } ] } } */
function toCatalog(t) {
  const out = {};
  for (const lang of LANGS) {
    out[lang] = {
      ranges: t.categories.map((c) => ({
        href: c.lang[lang].href,
        name: c.lang[lang].name,
        subtitle: c.lang[lang].subtitle || '',
        more: c.lang[lang].more,
        // 总页卡片顺序 = order.catalog
        families: c.families
          .slice()
          .sort((a, b) => a.order.catalog - b.order.catalog)
          .map((f) => ({
            href: f.lang[lang].href,
            key: f.key,
            name: f.lang[lang].nameCard || f.lang[lang].name,
            // 描述统一用 long（信息更全，对 SEO/GEO 更友好）；缺 long 时回落 short
            desc: f.lang[lang].long || f.lang[lang].short || '',
            img: f.lang[lang].img || {},
            bg: f.lang[lang].bg || '',
          })),
      })),
    };
  }
  return out;
}

/** 父页视图：{ lang: { 'products/<catKey>': { sectionId, eyebrow, h2, intro, linkLabel, families:[...] } } } */
function toFamilies(t) {
  const out = {};
  for (const lang of LANGS) {
    out[lang] = {};
    for (const c of t.categories) {
      const hub = c.hub && c.hub[lang];
      if (!hub) continue; // gan-charger / car-charger 没有分类卡 section
      out[lang]['products/' + c.key] = {
        sectionId: hub.sectionId,
        eyebrow: hub.eyebrow || '',
        h2: hub.h2,
        intro: hub.intro || '',
        linkLabel: hub.linkLabel || '',
        // 父页卡片顺序 = order.hub（与总页顺序本来就不同，必须分别保留）
        families: c.families
          .slice()
          .sort((a, b) => a.order.hub - b.order.hub)
          .map((f) => ({
            href: f.lang[lang].href,
            key: f.key,
            name: f.lang[lang].nameCard || f.lang[lang].name,
            desc: f.lang[lang].long || '',
            badge: f.lang[lang].badge || '',
            meta: f.lang[lang].meta || '',
            extra: f.lang[lang].extra || '',
            img: f.lang[lang].imgCard || {},
          })),
      };
    }
  }
  return out;
}

/**
 * 机器视图：{ categories:[{ key, families:[{ key }] }] }
 *   · family.key === category.key（gan-charger / car-charger）= 该分类页自身承载型号，无子系列。
 *   · 型号数不在这里存 —— 由 _products/*.json 现算（scripts/product-count-utils.js）。
 */
function toInventory(t) {
  return {
    _comment: 'GENERATED — do not edit. Source of truth: src/_taxonomy/taxonomy.json. Regenerate: node scripts/build-taxonomy.js',
    categories: t.categories.map((c) => ({
      key: c.key,
      families: (c.families || [])
        .filter((fam) => fam.key !== c.key)
        .map((fam) => ({ key: fam.key })),
    })),
  };
}

function renderModule(headComment, data) {
  return headComment + '\nmodule.exports = ' + JSON.stringify(data, null, 1) + ';\n';
}

function writeModule(file, headComment, data) {
  const content = renderModule(headComment, data);
  fs.writeFileSync(file, content, 'utf8');
  return content.length;
}

function renderJson(data) {
  return JSON.stringify(data, null, 2) + '\n';
}

const CAT_HEAD = `/**
 * 总页「产品线横带」数据 —— **本文件由 scripts/build-taxonomy.js 生成，不要手改**
 * 真源：src/_taxonomy/taxonomy.json
 * 改完真源后运行：node scripts/build-taxonomy.js
 */`;

const FAM_HEAD = `/**
 * 父页「分类卡」数据 —— **本文件由 scripts/build-taxonomy.js 生成，不要手改**
 * 真源：src/_taxonomy/taxonomy.json
 * 改完真源后运行：node scripts/build-taxonomy.js
 */`;

const CHECK = process.argv.includes('--check');

const outputs = [
  { file: path.join(ROOT, 'src/_data/productCatalog.js'), label: 'productCatalog.js ', content: renderModule(CAT_HEAD, toCatalog(tax)) },
  { file: path.join(ROOT, 'src/_data/productFamilies.js'), label: 'productFamilies.js', content: renderModule(FAM_HEAD, toFamilies(tax)) },
  { file: path.join(ROOT, 'src/_data/product-inventory.json'), label: 'product-inventory.json', content: renderJson(toInventory(tax)) },
];

if (CHECK) {
  const drift = [];
  for (const o of outputs) {
    const current = fs.existsSync(o.file) ? fs.readFileSync(o.file, 'utf8') : '';
    // 行尾归一化：Windows 检出可能是 CRLF，生成物始终 LF，避免误报
    if (current.replace(/\r\n/g, '\n') !== o.content.replace(/\r\n/g, '\n')) drift.push(o.label);
  }
  if (drift.length) {
    console.error('[build-taxonomy] OUT OF SYNC: ' + drift.join(', '));
    console.error('  taxonomy.json 已改但生成物未重建 → 运行: node scripts/build-taxonomy.js');
    process.exit(1);
  }
  console.log('[build-taxonomy] in sync — ' + outputs.map((o) => o.label.trim()).join(', '));
  process.exit(0);
}

for (const o of outputs) {
  fs.writeFileSync(o.file, o.content, 'utf8');
  console.log(`[build-taxonomy] ${o.label}  ${(o.content.length / 1024).toFixed(1)} KB`);
}
