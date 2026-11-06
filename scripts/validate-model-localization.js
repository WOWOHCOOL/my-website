#!/usr/bin/env node
/**
 * validate-model-localization.js
 * ────────────────────────────────────────────────────────────────
 * 目的：防止「型号卡」的人读内容回退成英文或出现事实漂移。
 *
 * 规则：
 *   ① 所有非 EN 型号卡必须有本土化 description：
 *      - 不得缺失；不得与 EN 逐字相同；目标长度 ≥ 80 字符。
 *   ② 型号名必须包含 SKU，并与 EN canonical name 的功率/容量事实一致：
 *      - W / mAh 等关键单位集合必须等价；本地千分位、空格、逗号小数均按数值归一化。
 *   ③ 所有型号卡使用的 spec 参数名必须在六语言中显式存在：
 *      - 确属国际技术词可映射为同文（如 PPS / USB-C），但不得缺失后静默回落英文。
 *   ④ 非 EN 的 model-badge 数量必须与 EN canonical 完全一致。
 *
 * 机器字段（row[2] propertyID、schema 键）不受此门禁约束 —— 它们本就应保持国际英文。
 */
const path = require('path');
const ROOT = path.join(__dirname, '..');
const LANGS = ['de', 'es', 'fr', 'ru', 'pl'];

function readJson(p) { return JSON.parse(require('fs').readFileSync(path.join(ROOT, p), 'utf8')); }
const specLabels = readJson('src/_data/specLabels.json');
const pm = require(path.join(ROOT, 'src/_data/productModels.js'));
const langsData = {};
for (const l of LANGS) langsData[l] = pm[l];
const en = pm.en;

function modelsBySku(fam) {
  const out = {};
  if (!fam || !Array.isArray(fam.groups)) return out;
  for (const g of fam.groups) for (const m of g.models || []) out[m.sku] = m;
  return out;
}

function normUnit(u) {
  const v = String(u || '').toLowerCase();
  if (v === 'w' || v === 'вт') return 'W';
  if (v === 'mah' || v === 'мА·ч'.toLowerCase() || v === 'ма·ч') return 'mAh';
  return v;
}

function normalizeFactNumber(raw) {
  let v = String(raw || '').replace(/\s+/g, '');
  if (/^\d{1,3}(?:[.,]\d{3})+$/.test(v)) v = v.replace(/[.,]/g, '');
  else v = v.replace(',', '.');
  return v.replace(/^0+(?=\d)/, '');
}

function factTokens(text) {
  const out = new Set();
  const re = /(?<![\p{L}\p{N}])(\d{1,3}(?:[ .]\d{3})+|\d+(?:[.,]\d+)?)\s*(mAh|мА·ч|Ah|А·ч|W|Вт)(?=\s|$|[,.;)])/giu;
  let m;
  while ((m = re.exec(String(text || '')))) {
    out.add(normalizeFactNumber(m[1]) + normUnit(m[2]));
  }
  return out;
}

function humanResidue(value) {
  return String(value || '')
    .replace(/(?:Type-C\d?|USB-[AC]\d?|PD\s?\d(?:\.\d)?|PPS|AVS|QC\d?\+?|Qi2(?:\.\d)?|Qi|GaN|TEC|LED|TFT|N52H|ABS|PC|AC|DC|W|mAh|Wh|MOQ|OEM|ODM|CE|FCC|RoHS|UN38\.3|IEC|PSE|KC|WPC|iPhone|Apple Watch|AirPods|Samsung|MagSafe|CES|Laptop|Watch|AI|UI|USB|C\+L|C\+A|C\+C|US\/EU\/UK\/AU|US\/EU\/UK|EU\/UK|MAX|Max|Li-Poly|Mini|Pro|Premium|Bestseller|Popular|Compact)/gi, ' ')
    .replace(/[\d.,+\-–—/×x%()]+/g, ' ')
    .replace(/[^\p{L}]+/gu, ' ')
    .trim();
}

function sameFactSet(a, b) {
  if (a.size !== b.size) return false;
  for (const x of a) if (!b.has(x)) return false;
  return true;
}

const SAME_BADGE_CHIP_ALLOW = new Set([
  'fr:102mm Compact',
  'fr:10000mAh Li-Poly',
  'fr:5000mAh Li-Poly',
  'pl:10000mAh Li-Poly',
  'pl:5000mAh Li-Poly',
  'pl:Bestseller',
  'pl:Premium'
]);

const LABELS_LOCKED = new Set();
for (const family of Object.keys(en)) for (const lang of LANGS) LABELS_LOCKED.add(lang + ':' + family);

const usedLabels = new Set();
for (const fam of Object.values(en)) for (const group of fam.groups || []) for (const model of group.models || []) for (const row of model.rows || []) usedLabels.add(row[0]);
const VALUE_ENGLISH_RE = /(?:Aluminum Alloy|Zinc Alloy|Stainless Steel|Tempered Glass|Fire-Retardant|Vacuum-plated|Rust-colored|Rust-Colored Paint|Pass-Through Charging|One-Button Start|Foldable Plug|without packaging|Based on|Real-time|Customizable|detachable module|sync with phone|fast charge|TFT screen|live power readout)/i;

const errors = [];
const warnings = [];
const seen = new Set();
let checkedRows = 0, checkedCards = 0, checkedFactCards = 0;

for (const key of LABELS_LOCKED) {
  const [lang, family] = key.split(':');
  const enFam = en[family];
  const locFam = langsData[lang] && langsData[lang][family];
  if (!enFam || !locFam) { errors.push(key + ': family missing'); continue; }
  const enModels = modelsBySku(enFam);
  const locModels = modelsBySku(locFam);

  for (const sku of Object.keys(locModels)) {
    const em = enModels[sku]; const lm = locModels[sku];
    if (!em) continue;
    checkedCards++;

    const desc = String(lm.description || '').trim();
    if (!desc) errors.push(key + ' ' + sku + ': missing localized description');
    else {
      if (em.description && desc === String(em.description).trim()) errors.push(key + ' ' + sku + ': description still English');
      if (desc.length < 80) errors.push(key + ' ' + sku + ': description too short (' + desc.length + ' chars; expected >= 80)');
    }

    if (!Array.isArray(lm.badges) || !lm.badges.length) {
      errors.push(key + ' ' + sku + ': missing localized badge');
    }
    const enBadgeCount = Array.isArray(em.badges) ? em.badges.length : 0;
    const locBadgeCount = Array.isArray(lm.badges) ? lm.badges.length : 0;
    if (locBadgeCount !== enBadgeCount) {
      errors.push(key + ' ' + sku + ': badge count drift -> EN ' + enBadgeCount + ' / LOC ' + locBadgeCount);
    }
    if (!Array.isArray(lm.chips) || !lm.chips.length) {
      errors.push(key + ' ' + sku + ': missing localized chips');
    }
    if (!String(lm.imgAlt || '').trim()) {
      errors.push(key + ' ' + sku + ': missing localized image alt');
    }

    if (!lm.name || !String(lm.name).includes(sku)) {
      errors.push(key + ' ' + sku + ': localized name must include SKU -> "' + (lm.name || '') + '"');
    } else {
      if (em.name && lm.name === em.name) errors.push(key + ' ' + sku + ': name still English -> "' + lm.name + '"');
      const stripSku = (name) => String(name || '').replace(new RegExp('^' + sku + '\\s*', 'i'), '');
      const enFacts = factTokens(stripSku(em.name));
      const locFacts = factTokens(stripSku(lm.name));
      checkedFactCards++;
      if (!sameFactSet(enFacts, locFacts)) {
        errors.push(key + ' ' + sku + ': name spec facts drift -> EN [' + [...enFacts].join(', ') + '] / LOC [' + [...locFacts].join(', ') + ']');
      }
    }

    for (const row of lm.rows || []) {
      if (typeof row[1] === 'string' && VALUE_ENGLISH_RE.test(row[1])) {
        errors.push(key + ' ' + sku + ': untranslated English phrase in spec value -> "' + row[1] + '"');
      }
    }
    checkedRows += (lm.rows || []).length;
  }
  seen.add(key);
}

let missingTranslations = 0;
for (const label of usedLabels) {
  for (const lang of LANGS) {
    const translated = specLabels[lang] && specLabels[lang][label];
    if (typeof translated !== 'string' || !translated.trim()) {
      missingTranslations++;
      if (missingTranslations <= 80) errors.push(lang + ': missing spec label translation -> "' + label + '"');
    }
  }
}

// 规格值必须存真字符，不得留 HTML 实体。
const ENTITY_RE = /&(?:[a-zA-Z][a-zA-Z0-9]{1,10}|#\d+|#x[0-9a-fA-F]+);/;
let entityHits = 0;
for (const fam of Object.values(en)) for (const g of fam.groups || []) for (const m of g.models || []) for (const row of m.rows || []) {
  if (typeof row[1] === 'string' && ENTITY_RE.test(row[1])) {
    entityHits++;
    if (entityHits <= 20) errors.push('HTML entity (autoescape leak) in spec value: ' + m.sku + ' "' + row[0] + '" -> "' + row[1] + '"');
  }
}
// ── 描述唯一性 / 本地化信息量（2026-11-06）──────────────────────────────
// 背景：型号卡描述曾出现 34 张卡只有 12 条唯一文案、重复词占 63-66%。
// 旧校验只查「非空 / 非英文 / ≥80 字符」，重复文案可全绿通过。
// 这里对重点 family 做严格检查；其他 family 只统计，不阻断。
const STRICT_DESC_FAMILIES = new Set([
  'products/power-bank/semi-solid-state',
  'products/power-bank/wireless-magnetic',
]);
const DESC_LANGS = ['en'].concat(LANGS);
const descReport = [];

function descWords(value) {
  return String(value || '').toLowerCase().match(/[\p{L}\p{N}]+/gu) || [];
}
function jaccard(a, b) {
  const A = new Set(a), B = new Set(b);
  if (!A.size && !B.size) return 0;
  let inter = 0;
  for (const x of A) if (B.has(x)) inter++;
  return inter / (A.size + B.size - inter);
}

for (const fam of STRICT_DESC_FAMILIES) {
  if (!en[fam]) continue;
  const enModels = modelsBySku(en[fam]);
  const skus = Object.keys(enModels);
  const perLang = {};

  for (const lang of DESC_LANGS) {
    const famData = lang === 'en' ? en[fam] : (langsData[lang] && langsData[lang][fam]);
    if (!famData) continue;
    const locModels = modelsBySku(famData);
    const rows = skus.map(sku => ({ sku, desc: String((locModels[sku] || {}).description || '').trim() })).filter(r => r.desc);

    const byDesc = new Map();
    for (const r of rows) {
      if (!byDesc.has(r.desc)) byDesc.set(r.desc, []);
      byDesc.get(r.desc).push(r.sku);
    }
    const dupGroups = [...byDesc.values()].filter(g => g.length > 1);

    const tokens = rows.map(r => descWords(r.desc));
    let pairs = 0, simSum = 0;
    for (let i = 0; i < tokens.length; i++) {
      for (let j = i + 1; j < tokens.length; j++) {
        simSum += jaccard(tokens[i], tokens[j]);
        pairs++;
      }
    }
    const meanJ = pairs ? simSum / pairs : 0;

    const opens = new Map();
    for (const r of rows) {
      const key = descWords(r.desc).slice(0, 6).join(' ');
      if (key) {
        if (!opens.has(key)) opens.set(key, []);
        opens.get(key).push(r.sku);
      }
    }
    const dupOpens = [...opens.values()].filter(g => g.length > 1);

    const wordCounts = rows.map(r => descWords(r.desc).length);
    const meanW = wordCounts.length ? wordCounts.reduce((a, b) => a + b, 0) / wordCounts.length : 0;
    perLang[lang] = { rows: rows.length, dupGroups, meanJ, dupOpens, meanW };

    if (dupGroups.length) {
      errors.push(fam + ' [' + lang + ']: duplicate model descriptions -> ' + dupGroups.map(g => g.join('/')).join(' | '));
    }
    if (rows.length >= 4 && meanJ > 0.55) {
      errors.push(fam + ' [' + lang + ']: mean description similarity ' + meanJ.toFixed(2) + ' > 0.55');
    }
    if (dupOpens.length) {
      errors.push(fam + ' [' + lang + ']: duplicate description opening (6 words) -> ' + dupOpens.map(g => g.join('/')).join(' | '));
    }
    const lengthOutliers = rows.filter((r, i) => wordCounts[i] < 18 || wordCounts[i] > 60).map(r => r.sku + ':' + descWords(r.desc).length);
    if (lengthOutliers.length) {
      warnings.push(fam + ' [' + lang + ']: description length outside 18-60 words -> ' + lengthOutliers.join(', '));
    }

    // 描述中的数字+单位必须能在该型号规格/名称中找到（防止改写或翻译时编造参数）。
    const UNIT_ALIASES = { mah: 'mah', 'ма·ч': 'mah', wh: 'wh', 'вт·ч': 'wh', w: 'w', 'вт': 'w', mm: 'mm', 'мм': 'mm', g: 'g', 'г': 'g' };
    const DESC_FACT_SRC = '(?<![\\p{L}\\p{N}])(\\d{1,3}(?:[ .\\u00a0]\\d{3})+|\\d+(?:[.,]\\d+)?)\\s*(mAh|мА·ч|Wh|Вт·ч|W|Вт|mm|мм|g|г)(?=\\s|$|[,.;)-])';
    const factKey = (num, unit) => normalizeFactNumber(num) + ':' + (UNIT_ALIASES[String(unit).toLowerCase()] || String(unit).toLowerCase());
    const descFactMisses = [];
    for (const r of rows) {
      const model = locModels[r.sku] || {};
      const specText = [model.name].concat((model.rows || []).map(row => row[1])).join(' ');
      const specFacts = new Set();
      const specRe = new RegExp(DESC_FACT_SRC, 'giu');
      let sm;
      while ((sm = specRe.exec(specText))) specFacts.add(factKey(sm[1], sm[2]));
      // 尺寸串 "102×64×17.5mm" 的前两个数字没有紧跟单位，单独拆出。
      const dimRe = /(\d+(?:[.,]\d+)?)(?:×\d+(?:[.,]\d+)?)+(?:mm|мм)/giu;
      while ((sm = dimRe.exec(specText))) {
        for (const part of sm[0].replace(/(?:mm|мм)$/i, '').split('×')) specFacts.add(factKey(part, 'mm'));
      }
      const descRe = new RegExp(DESC_FACT_SRC, 'giu');
      let dm;
      while ((dm = descRe.exec(r.desc))) {
        if (!specFacts.has(factKey(dm[1], dm[2]))) descFactMisses.push(r.sku + ' ' + dm[1] + dm[2]);
      }
    }
    if (descFactMisses.length) {
      warnings.push(fam + ' [' + lang + ']: description fact not found in spec -> ' + descFactMisses.join(', '));
    }
  }

  const enMeanW = perLang.en ? perLang.en.meanW : 0;
  if (enMeanW > 0) {
    for (const lang of LANGS) {
      const p = perLang[lang];
      if (!p || !p.meanW) continue;
      if (p.meanW < enMeanW * 0.6) {
        errors.push(fam + ' [' + lang + ']: mean description words ' + p.meanW.toFixed(1) + ' < 60% of EN (' + enMeanW.toFixed(1) + ')');
      }
    }
  }

  descReport.push(fam.split('/').pop() + ' ' + DESC_LANGS.map(l => {
    const p = perLang[l];
    return p ? l + ':' + p.rows + 'cards/' + p.meanJ.toFixed(2) + 'J/' + p.meanW.toFixed(0) + 'w' : l + ':missing';
  }).join(' '));
}

console.log('[validate-model-localization] labelFamilies=' + seen.size + ' cards=' + checkedCards + ' factCards=' + checkedFactCards + ' rows=' + checkedRows + ' missingTranslations=' + missingTranslations + ' entityHits=' + entityHits + ' errors=' + errors.length);
for (const line of descReport) console.log('[desc-uniqueness] ' + line);
for (const w of warnings) console.warn('  WARN ' + w);
if (errors.length) {
  for (const e of errors.slice(0, 80)) console.error('  FAIL ' + e);
  if (errors.length > 80) console.error('  ... +' + (errors.length - 80) + ' more');
  console.error('[validate-model-localization] FAIL');
  process.exit(1);
}
console.log('[validate-model-localization] PASS');
