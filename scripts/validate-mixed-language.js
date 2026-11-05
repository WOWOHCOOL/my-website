'use strict';
// L2 gate: non-EN pages must not render English fixed-panel / CTA / author
// fallback strings. Technical terms (OEM/ODM, MOQ, Qi2, PD 3.1, FOB…) are
// allowed and intentionally absent from this list.
// Usage: node scripts/validate-mixed-language.js
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const BUILT = process.argv.includes('--built');
const LANGS = ['de', 'es', 'fr', 'pl', 'ru'];
const BANNED = [
  'Key Takeaways',
  'Table of Contents',
  'Related Articles',
  'Sources & References',
  'Frequently Asked Questions',
  'Factory Footprint',
  'View full author profile',
  'min read',
  'Industry Guide',
  'Buyer Guide',
  'Contact Us',
  'Get a Quote',
  'Get Factory Pricing',
  'Read More',
  'Learn more',
  'Click here',
  "is WOWOHCOOL's",
  'is the founder of WOWOHCOOL',
  'years in 3C procurement',
  'years in consumer electronics',
  'Talk to our team',
  'Ready to Move',
  'From Spec to Shipment',
  'Send your specifications',
  'Need Help With This',
  'Start Your OEM Project',
  'Explore OEM/ODM Service',
  'Request FOB Pricing',
];

// Product-spec English that must be localized. "protection"/"compatible" are
// valid French/Spanish; "optional" is valid German; "firmware" is accepted in
// FR/ES/PL — so these are scoped per language instead of global.
const PRODUCT_BANNED = {
  de: ['High-Capacity', 'Net', 'Gross', 'outputs', 'per port', 'Digital display', 'Built-in', 'swappable', 'shared', 'Retractable', 'input', 'MAX', 'protection', 'compatible'],
  es: ['High-Capacity', 'Net', 'Gross', 'outputs', 'per port', 'Digital display', 'Built-in', 'swappable', 'shared', 'Retractable', 'input', 'MAX', 'Max', 'optional'],
  fr: ['High-Capacity', 'outputs', 'per port', 'Digital display', 'Built-in', 'swappable', 'shared', 'Retractable', 'input', 'MAX', 'Max', 'optional'],
  pl: ['High-Capacity', 'Net', 'Gross', 'outputs', 'per port', 'Digital display', 'Built-in', 'swappable', 'shared', 'Retractable', 'input', 'MAX', 'Max', 'optional', 'protection', 'compatible'],
  ru: ['High-Capacity', 'Net', 'Gross', 'outputs', 'per port', 'Digital display', 'Built-in', 'swappable', 'shared', 'Retractable', 'input', 'MAX', 'Max', 'optional', 'protection', 'compatible', 'firmware'],
};

// Proper product/platform names that legitimately contain an English token.
const PRODUCT_ALLOW = {
  fr: ['DEWALT 20V MAX'],
};

function walk(dir, ext, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, ext, out);
    else if (e.name.endsWith(ext)) out.push(p);
  }
  return out;
}

function visibleText(s) {
  return s
    .replace(/^---\n[\s\S]*?\n---\n/, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/\{#[\s\S]*?#\}/g, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<pre[\s\S]*?<\/pre>/gi, ' ')
    .replace(/<code[\s\S]*?<\/code>/gi, ' ')
    .replace(/\{%[\s\S]*?%\}/g, ' ')
    .replace(/\{\{[\s\S]*?\}\}/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#0?39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

const EN_STOP = new Set([
  'the', 'and', 'with', 'from', 'your', 'this', 'that', 'is', 'are', 'for',
  'you', 'our', 'we', 'can', 'will', 'not', 'has', 'have', 'by', 'as', 'or',
  'be', 'on', 'in', 'to', 'of', 'a', 'an',
]);
function englishHeavy(text) {
  const words = String(text).toLowerCase().match(/[^\W\d_]+/gu) || [];
  if (words.length < 4) return false;
  const n = words.filter((w) => EN_STOP.has(w)).length;
  return n >= 2 && n / words.length > 0.25;
}

const hits = [];
let scanned = 0;
const rootDir = BUILT ? path.join(ROOT, '_site') : SRC;
const ext = BUILT ? '.html' : '.njk';
for (const lang of LANGS) {
  const base = path.join(rootDir, lang);
  if (!fs.existsSync(base)) continue;
  for (const file of walk(base, ext)) {
    scanned++;
    const rel = path.relative(ROOT, file).replace(/\\/g, '/');
    const raw = fs.readFileSync(file, 'utf8');
    const visible = visibleText(raw);
    const lower = visible.toLowerCase();
    for (const phrase of BANNED) {
      if (lower.includes(phrase.toLowerCase())) hits.push({ rel, phrase });
    }
    const isProductPage = /\/(?:produkte|productos|produits|produkty)\//.test(rel);
    if (isProductPage) {
      let productVisible = visible;
      for (const allow of PRODUCT_ALLOW[lang] || []) productVisible = productVisible.split(allow).join(' ');
      for (const phrase of PRODUCT_BANNED[lang] || []) {
        const caseSensitive = ['Max', 'MAX', 'Net', 'Gross'].includes(phrase);
        const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const re = new RegExp('(?<![A-Za-z])' + escaped + '(?![A-Za-z])', caseSensitive ? '' : 'i');
        if (re.test(productVisible)) hits.push({ rel, phrase });
      }
    }

    // Structured data must be localized too: BlogPosting description/headline
    // and HowTo name/description are read by AI/search engines, not just humans.
    if (BUILT) {
      const walkJson = (x) => {
        if (Array.isArray(x)) return x.forEach(walkJson);
        if (!x || typeof x !== 'object') return;
        const types = [].concat(x['@type'] || []);
        const type = types.find((t) => t === 'BlogPosting' || t === 'HowTo');
        if (type) {
          const keys = type === 'HowTo' ? ['name', 'description'] : ['headline', 'description'];
          for (const key of keys) {
            if (typeof x[key] === 'string' && englishHeavy(x[key])) {
              hits.push({ rel, phrase: 'jsonld.' + type + '.' + key });
            }
          }
        }
        Object.values(x).forEach(walkJson);
      };
      for (const m of raw.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
        try { walkJson(JSON.parse(m[1])); } catch (e) { /* schema validator handles invalid JSON */ }
      }
    }
  }
}

if (hits.length) {
  console.log('[validate-mixed-language] FAIL — ' + hits.length + ' English fallback strings in non-EN pages');
  for (const h of hits.slice(0, 40)) console.log('   - ' + h.rel + '  ::  ' + h.phrase);
  process.exit(1);
}
console.log('[validate-mixed-language] PASS — ' + scanned + (BUILT ? ' built non-EN pages' : ' non-EN templates') +
  ' contain no English fixed-panel/CTA fallback strings');
