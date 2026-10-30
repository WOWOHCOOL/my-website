const fs = require('fs');
const path = require('path');
const { countProductCards, canonicalPagePath, getFamilyModelCount, getCategoryModelCount } = require('./product-count-utils');
const inventory = require('../src/_data/product-inventory.json');
const models = require('../src/_data/productModels.js');

const LOCALE_DIRS = ['de', 'es', 'fr', 'ru', 'pl'];
const LANGS = ['en', ...LOCALE_DIRS];
const errors = [];

function walk(dir, acc) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (entry.name.endsWith('.njk')) acc.push(full);
  }
  return acc;
}

function readEnPath(filePath) {
  const source = fs.readFileSync(filePath, 'utf8');
  const match = source.match(/^enPath:\s*["']([^"']+)["']/m);
  return match ? match[1] : null;
}

function skuSet(lang, family) {
  const data = models[lang] && models[lang][family];
  if (!data || !Array.isArray(data.groups)) return null;
  const out = new Set();
  for (const group of data.groups) {
    for (const model of group.models || []) out.add(String(model.sku || '').toUpperCase());
  }
  return out;
}

function sameSet(a, b) {
  if (a.size !== b.size) return false;
  for (const value of a) if (!b.has(value)) return false;
  return true;
}

function fmtSet(set) {
  return [...set].sort().join(', ');
}

const enFamilies = Object.keys(models.en).sort();
for (const lang of LANGS) {
  const langFamilies = Object.keys(models[lang] || {}).sort();
  if (langFamilies.length !== enFamilies.length || enFamilies.some((family) => !models[lang][family])) {
    errors.push(`src/_products/*.json: ${lang} family set differs from en`);
  }
}

for (const lang of LANGS) {
  for (const [family, data] of Object.entries(models[lang] || {})) {
    if (!data || !Array.isArray(data.groups) || data.groups.length === 0) {
      errors.push(`${lang}/${family}: missing groups array`);
      continue;
    }

    const sectionIds = new Set();
    const skus = new Set();
    for (const group of data.groups) {
      if (!group.sectionId) errors.push(`${lang}/${family}: empty sectionId`);
      if (sectionIds.has(group.sectionId)) errors.push(`${lang}/${family}: duplicate sectionId ${group.sectionId}`);
      sectionIds.add(group.sectionId);

      if (!group.h2) errors.push(`${lang}/${family}#${group.sectionId || '?'}: empty h2`);
      if (!Array.isArray(group.models) || group.models.length === 0) {
        errors.push(`${lang}/${family}#${group.sectionId || '?'}: no models`);
        continue;
      }

      for (const model of group.models) {
        const sku = String(model.sku || '').toUpperCase();
        if (!sku) errors.push(`${lang}/${family}#${group.sectionId || '?'}: model without sku`);
        if (skus.has(sku)) errors.push(`${lang}/${family}: duplicate sku ${sku}`);
        skus.add(sku);
        if (!model.name) errors.push(`${lang}/${family}/${sku || '?'}: empty name`);
        if (!model.img || !model.img.src || !model.img.alt) errors.push(`${lang}/${family}/${sku || '?'}: incomplete image metadata`);
        if (!Array.isArray(model.rows) || model.rows.length === 0) {
          errors.push(`${lang}/${family}/${sku || '?'}: no spec rows`);
        } else {
          for (const row of model.rows) {
            if (!Array.isArray(row) || row.length < 3 || !row[0] || !row[1] || !row[2]) {
              errors.push(`${lang}/${family}/${sku || '?'}: malformed spec row ${JSON.stringify(row)}`);
            }
          }
        }
      }
    }

    const enSkus = skuSet('en', family);
    const langSkus = skuSet(lang, family);
    if (enSkus && langSkus && !sameSet(enSkus, langSkus)) {
      errors.push(`${lang}/${family}: sku set differs from en (en=${fmtSet(enSkus)}; ${lang}=${fmtSet(langSkus)})`);
    }
  }
}

const localizedByEnPath = new Map();
for (const file of LOCALE_DIRS.flatMap(locale => walk(path.join('src', locale), []))) {
  const enPath = readEnPath(file);
  if (!enPath || !enPath.startsWith('products/')) continue;
  if (!localizedByEnPath.has(enPath)) localizedByEnPath.set(enPath, []);
  localizedByEnPath.get(enPath).push(file);
}

function checkLocalized(enPath, expected, label) {
  for (const localizedFile of localizedByEnPath.get(enPath) || []) {
    const localizedCount = countProductCards(localizedFile);
    if (localizedCount !== expected) {
      errors.push(`${localizedFile}: product count ${localizedCount} != EN ${expected} (${label})`);
    }
  }
}

for (const category of inventory.categories) {
  if (Array.isArray(category.families) && category.families.length) {
    for (const family of category.families) {
      const canonicalFile = canonicalPagePath(category.key, family.key);
      const expected = getFamilyModelCount(category.key, family.key);
      const enPath = canonicalFile.replace(/^src\//, '').replace(/\/index\.njk$/, '/');
      if (expected === 0) errors.push(`${category.key}/${family.key}: no product data found for ${canonicalFile}`);
      checkLocalized(enPath, expected, `${category.key}/${family.key}`);
    }
  } else {
    const canonicalFile = canonicalPagePath(category.key);
    const expected = getCategoryModelCount(category.key);
    const enPath = canonicalFile.replace(/^src\//, '').replace(/\/index\.njk$/, '/');
    if (expected === 0) errors.push(`${category.key}: no product data found for ${canonicalFile}`);
    checkLocalized(enPath, expected, category.key);
  }
}

if (errors.length) {
  console.error('\n[validate-model-counts] FAIL');
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}
console.log('[validate-model-counts] PASS — src/_products is complete and localized product pages match EN canonical counts.');
