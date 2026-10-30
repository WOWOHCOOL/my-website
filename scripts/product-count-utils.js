const fs = require('fs');
const path = require('path');

const inventory = require('../src/_data/product-inventory.json');
const MODELS = require('../src/_data/productModels.js');
const PRODUCT_ID_RE = /id="((?:wop|woc|wof|wow)[a-z0-9-]+)"/g;
const LANGS = ['en', 'de', 'es', 'fr', 'ru', 'pl'];

function canonicalPagePath(categoryKey, familyKey) {
  return familyKey
    ? path.posix.join('src', 'products', categoryKey, familyKey, 'index.njk')
    : path.posix.join('src', 'products', categoryKey, 'index.njk');
}

function countProductIds(filePath) {
  if (!fs.existsSync(filePath)) throw new Error(`Model source page not found: ${filePath}`);
  const source = fs.readFileSync(filePath, 'utf8');
  const ids = new Set();
  let match;
  while ((match = PRODUCT_ID_RE.exec(source)) !== null) ids.add(match[1].toLowerCase());
  PRODUCT_ID_RE.lastIndex = 0;
  return ids.size;
}

function findCategory(categoryKey) {
  return inventory.categories.find(category => category.key === categoryKey);
}

function findFamily(categoryKey, familyKey) {
  const category = findCategory(categoryKey);
  return category && Array.isArray(category.families)
    ? category.families.find(family => family.key === familyKey)
    : null;
}

function langOfPath(filePath) {
  const match = String(filePath).replace(/\\/g, '/').match(/^src\/(de|es|fr|ru|pl)\//);
  return match ? match[1] : 'en';
}

function familyKeyOf(filePath) {
  const normalized = String(filePath).replace(/\\/g, '/');
  const en = normalized.match(/^src\/products\/([^/]+)(?:\/([^/]+))?\/index\.njk$/);
  if (en) return 'products/' + en[1] + (en[2] ? '/' + en[2] : '');
  if (!fs.existsSync(normalized)) return null;
  const source = fs.readFileSync(normalized, 'utf8');
  const match = source.match(/^enPath:[ \t]*["']([^"']+)["']/m);
  return match ? match[1].replace(/^\/+|\/+$/g, '') : null;
}

function countFromData(filePath) {
  const key = familyKeyOf(filePath);
  if (!key) return null;
  const lang = langOfPath(filePath);
  const entry = MODELS[lang] && MODELS[lang][key];
  if (!entry || !Array.isArray(entry.groups)) return null;
  return entry.groups.reduce((sum, group) => sum + (group.models ? group.models.length : 0), 0);
}

function countProductCards(filePath) {
  const idCount = countProductIds(filePath);
  if (idCount > 0) return idCount;

  // 统一模板后：源页面只剩 include，计数改从 src/_products 单一真源取。
  const dataCount = countFromData(filePath);
  if (dataCount !== null) return dataCount;

  const source = fs.readFileSync(filePath, 'utf8');
  const macroCalls = source.match(/\{\{\s*card[a-zA-Z0-9_]*\(/g);
  return macroCalls ? macroCalls.length : 0;
}

function getFamilyModelCount(categoryKey, familyKey) {
  if (!findFamily(categoryKey, familyKey)) return 0;
  return countProductCards(canonicalPagePath(categoryKey, familyKey));
}

function getCategoryModelCount(categoryKey) {
  const category = findCategory(categoryKey);
  if (!category) return 0;
  if (Array.isArray(category.families) && category.families.length) {
    return category.families.reduce((sum, family) => sum + getFamilyModelCount(categoryKey, family.key), 0);
  }
  return countProductCards(canonicalPagePath(categoryKey));
}

function getProductInventorySummary() {
  return {
    categoryCount: inventory.categories.length,
    modelCount: inventory.categories.reduce((sum, category) => sum + getCategoryModelCount(category.key), 0),
  };
}

module.exports = {
  LANGS,
  countProductIds,
  countProductCards,
  canonicalPagePath,
  getFamilyModelCount,
  getCategoryModelCount,
  getProductInventorySummary,
};
