/**
 * 六语言产品型号数据加载器 —— 单一真源（2026-10-29）
 *
 * 真源：src/_products/<category>__<family>.json（一个产品系列一个文件）
 * 结构：
 *   {
 *     family: "products/<category>/<family>",
 *     groups: [{
 *       id: "models",
 *       locales: { en: { h2, intro, eyebrow }, de: {...}, ... },
 *       models: [{
 *         sku, anchor, img,
 *         specs: [[canonicalLabel, canonicalValue, propertyID], ...],
 *         locales: {
 *           en: { name, badges, chips, specValues? },
 *           de: { name, badges, chips, specValues?: { "0": "本地化数值" } }
 *         }
 *       }]
 *     }]
 *   }
 *
 * 规则：
 *   · specs 只在 EN 写一次；参数名统一走 src/_data/specLabels.json 本土化
 *   · 可见规格值先走 src/_data/specValueLabels.json 共享词表本土化；特殊值可用 specValues[index] 覆盖
 *   · name / badges / chips / h2 / intro 按语言本土化；缺失时回退 EN
 *
 * 对外暴露 productModels[lang][family] = { groups:[{ sectionId, h2, intro, eyebrow, models }] }
 * partials/product-models.njk 只读这个稳定结构。
 */
const fs = require('fs');
const path = require('path');

const LANGS = ['en', 'de', 'es', 'fr', 'ru', 'pl'];
const ROOT = path.join(__dirname, '..', '..');
const DIR = path.join(ROOT, 'src', '_products');
const VALUE_RULES = JSON.parse(fs.readFileSync(path.join(__dirname, 'specValueLabels.json'), 'utf8')).rules || [];
const BADGE_RULES = JSON.parse(fs.readFileSync(path.join(__dirname, 'productBadgeLabels.json'), 'utf8')).rules || [];
const BADGE_MAP = new Map(BADGE_RULES.map(r => [r.en, r]));

const out = {};
for (const l of LANGS) out[l] = {};

function pickLocale(locales, lang) {
  return (locales && (locales[lang] || locales.en)) || {};
}

function escapeRegExp(value) {
  return String(value).replace(/[\^$.*+?()[\]{}|\\]/g, '\\$&');
}

function replacePhrase(text, from, to) {
  const re = new RegExp('(^|[^\\p{L}\\p{N}])' + escapeRegExp(from) + '(?=$|[^\\p{L}\\p{N}])', 'gu');
  return text.replace(re, (_, prefix) => prefix + to);
}

function localizeDecimals(text) {
  return String(text).replace(/(\d+)\.(\d+)(?=\s*(?:V|A|W|Wh|mAh|mm|cm|m|g|kg|s|Hz|kHz|MHz|Ω|mΩ|°C))/g, '$1,$2');
}

function localizeSpecValue(value, lang) {
  if (lang === 'en') return value;
  let out = String(value || '');
  for (const rule of VALUE_RULES) {
    if (rule.en && rule[lang]) out = replacePhrase(out, rule.en, rule[lang]);
  }
  return localizeDecimals(out);
}

// 角标：以 EN 为准；非 EN 用词表映射（国际通用词在词表里保持原样）
function localizeBadges(enBadges, lang) {
  if (lang === 'en') return Array.isArray(enBadges) ? enBadges.slice() : [];
  return (Array.isArray(enBadges) ? enBadges : []).map((b) => {
    const rule = BADGE_MAP.get(b);
    return rule && rule[lang] ? rule[lang] : b;
  });
}

if (fs.existsSync(DIR)) {
  for (const file of fs.readdirSync(DIR).filter(f => f.endsWith('.json')).sort()) {
    const doc = JSON.parse(fs.readFileSync(path.join(DIR, file), 'utf8'));
    if (!doc.family || !Array.isArray(doc.groups)) continue;

    for (const lang of LANGS) {
      out[lang][doc.family] = {
        groups: doc.groups.map(group => {
          const gLoc = pickLocale(group.locales, lang);
          const enGLoc = pickLocale(group.locales, 'en');
          const models = (group.models || []).map(model => {
            const mLoc = pickLocale(model.locales, lang);
            const overrides = mLoc.specValues || {};
            const rows = (model.specs || []).map((row, index) => {
              const key = String(index);

              const rawValue = Object.prototype.hasOwnProperty.call(overrides, key) ? overrides[key] : row[1];

              const value = localizeSpecValue(rawValue, lang);

              return [row[0], value, row[2]];
            });
            return {
              sku: model.sku,
              anchor: model.anchor || String(model.sku || '').toLowerCase(),
              name: mLoc.name || model.name || model.sku,
              description: mLoc.description || model.description || '',
              badges: (() => {
                const loc = model.locales || {};
                const langLoc = loc[lang] || {};
                const enLoc = loc.en || {};
                if (Array.isArray(langLoc.badges) && langLoc.badges.length) return langLoc.badges;
                return localizeBadges(enLoc.badges || [], lang);
              })(),
              chips: Array.isArray(mLoc.chips) ? mLoc.chips : [],
              rows,
              imgAlt: mLoc.imgAlt || (model.img && model.img.alt) || '',
              img: Object.assign({}, model.img, { alt: mLoc.imgAlt || (model.img && model.img.alt) }),
              hasEn: true,
            };
          });
          return {
            sectionId: group.id || group.sectionId || 'models',
            h2: gLoc.h2 || enGLoc.h2 || '',
            intro: gLoc.intro || enGLoc.intro || '',
            eyebrow: gLoc.eyebrow || enGLoc.eyebrow || '',
            models,
          };
        }),
      };
    }
  }
}

module.exports = out;
