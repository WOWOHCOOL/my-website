const fs = require('fs');
const path = require('path');
const { countProductCards, canonicalPagePath, getFamilyModelCount, getCategoryModelCount } = require('./product-count-utils');
const inventory = require('../src/_data/product-inventory.json');

const LOCALE_DIRS = ['de', 'es', 'fr', 'ru', 'pl'];
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
      if (expected === 0) errors.push(`${category.key}/${family.key}: no product IDs found in ${canonicalFile}`);
      checkLocalized(enPath, expected, `${category.key}/${family.key}`);
    }
  } else {
    const canonicalFile = canonicalPagePath(category.key);
    const expected = getCategoryModelCount(category.key);
    const enPath = canonicalFile.replace(/^src\//, '').replace(/\/index\.njk$/, '/');
    if (expected === 0) errors.push(`${category.key}: no product IDs found in ${canonicalFile}`);
    checkLocalized(enPath, expected, category.key);
  }
}

if (errors.length) {
  console.error('\n[validate-model-counts] FAIL');
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}
console.log('[validate-model-counts] PASS — product cards match EN canonical counts.');
