const fs = require('fs');
const path = require('path');

const inventory = require('../src/_data/product-inventory.json');
const PRODUCT_ID_RE = /id="((?:wop|woc|wof|wow)[a-z0-9-]+)"/g;

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

function countProductCards(filePath) {
  const idCount = countProductIds(filePath);
  if (idCount > 0) return idCount;

  const source = fs.readFileSync(filePath, 'utf8');
  const macroCalls = source.match(/\{\{\s*card[a-zA-Z0-9_]*\(/g);
  return macroCalls ? macroCalls.length : 0;
}

function findFamily(categoryKey, familyKey) {
  const category = findCategory(categoryKey);
  return category && Array.isArray(category.families)
    ? category.families.find(family => family.key === familyKey)
    : null;
}

function getFamilyModelCount(categoryKey, familyKey) {
  if (!findFamily(categoryKey, familyKey)) return 0;
  return countProductIds(canonicalPagePath(categoryKey, familyKey));
}

function getCategoryModelCount(categoryKey) {
  const category = findCategory(categoryKey);
  if (!category) return 0;
  if (Array.isArray(category.families) && category.families.length) {
    return category.families.reduce((sum, family) => sum + getFamilyModelCount(categoryKey, family.key), 0);
  }
  return countProductIds(canonicalPagePath(categoryKey));
}

function getProductInventorySummary() {
  return {
    categoryCount: inventory.categories.length,
    modelCount: inventory.categories.reduce((sum, category) => sum + getCategoryModelCount(category.key), 0),
  };
}

module.exports = { countProductIds, countProductCards, canonicalPagePath, getFamilyModelCount, getCategoryModelCount, getProductInventorySummary };
