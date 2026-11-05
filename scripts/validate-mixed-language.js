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

// English form/accessibility phrases that are never valid on non-EN pages.
// Loanwords such as FR "Message", ES/RU "Email" and DE "Name" are not listed.
const FORM_BANNED = [
  'Your name',
  'Your email',
  'Your company',
  'Your message',
  'Business email',
  'Company name',
  'Select product category',
  'Product specs',
  'Send message',
  'Submit',
  'Send',
];

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

// Distinctive English words only. Ambiguous tokens shared with DE/ES/FR/PL/RU
// (in, a, as, or, is, are, not, of, to…) are deliberately excluded.
const EN_STOP = new Set([
  'the', 'and', 'with', 'from', 'your', 'this', 'that', 'for', 'you', 'our',
  'we', 'by', 'to', 'these', 'those', 'which', 'when', 'where', 'how', 'why',
  'should', 'would', 'could', 'must', 'into', 'over', 'under', 'than', 'then',
  'also', 'only', 'more', 'most',
]);
function englishHeavy(text) {
  const words = String(text).toLowerCase().match(/\p{L}+/gu) || [];
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

    // OG/Twitter cards are a separate visible surface (social previews).
    if (BUILT) {
      for (const m of raw.matchAll(/<(?:meta|property)[^>]*(?:property|name)="((?:og|twitter):[^"]+)"[^>]*content="([^"]*)"/g)) {
        const txt = m[2].replace(/&amp;/g, '&').replace(/&#0?39;/g, "'").toLowerCase();
        for (const phrase of BANNED) {
          if (txt.includes(phrase.toLowerCase())) hits.push({ rel, phrase: m[1] + ': ' + phrase });
        }
      }
    }

    // Accessibility / form attributes and labels are read by users and screen
    // readers. Loanwords like FR "Message" or ES/RU "Email" are allowed.
    if (BUILT) {
      const attrText = (s) => s.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&#0?39;/g, "'").trim();
      for (const m of raw.matchAll(/\b(aria-label|title|placeholder)="([^"]*)"/g)) {
        const txt = attrText(m[2]);
        if (englishHeavy(txt) || FORM_BANNED.some((p) => txt.toLowerCase().startsWith(p.toLowerCase()))) {
          hits.push({ rel, phrase: m[1] + ': ' + txt.slice(0, 80) });
        }
      }
      for (const m of raw.matchAll(/<label[^>]*>([\s\S]*?)<\/label>/g)) {
        const txt = attrText(m[1]);
        if (englishHeavy(txt) || FORM_BANNED.some((p) => txt.toLowerCase().startsWith(p.toLowerCase()))) {
          hits.push({ rel, phrase: 'label: ' + txt.slice(0, 80) });
        }
      }
    }

    // hreflang language correctness: a "fr" alternate must live under /fr/.
    if (BUILT) {
      for (const m of raw.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)) {
        const hl = m[1];
        const pathname = m[2].replace('https://www.wowohcool.com', '');
        if (hl === 'x-default') {
          if (/^\/(?:de|es|fr|pl|ru)(?:\/|$)/.test(pathname)) {
            hits.push({ rel, phrase: 'hreflang.x-default: ' + pathname });
          }
        } else {
          const expected = hl === 'en' ? '/' : '/' + hl + '/';
          if (!pathname.startsWith(expected)) hits.push({ rel, phrase: 'hreflang.' + hl + ': ' + pathname });
        }
      }
    }

    // Structured data must be localized too: BlogPosting description/headline
    // and HowTo name/description are read by AI/search engines, not just humans.
    if (BUILT) {
      const walkJson = (x) => {
        if (Array.isArray(x)) return x.forEach(walkJson);
        if (!x || typeof x !== 'object') return;
        const types = [].concat(x['@type'] || []);
        const type = types.find((t) => t === 'BlogPosting' || t === 'HowTo' || t === 'FAQPage');
        if (type === 'FAQPage') {
          for (const q of x.mainEntity || []) {
            if (typeof q.name === 'string' && englishHeavy(q.name)) {
              hits.push({ rel, phrase: 'jsonld.FAQPage.question' });
            }
            const answer = q.acceptedAnswer && q.acceptedAnswer.text;
            if (typeof answer === 'string' && englishHeavy(answer)) {
              hits.push({ rel, phrase: 'jsonld.FAQPage.answer' });
            }
          }
        } else if (type) {
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

// llms.txt and RSS are generated per language and are read by AI/crawlers.
if (BUILT) {
  for (const lang of LANGS) {
    for (const name of ['llms.txt', 'rss.xml']) {
      const p = path.join(rootDir, lang, name);
      if (!fs.existsSync(p)) continue;
      const rel = path.relative(ROOT, p).replace(/\\/g, '/');
      const text = visibleText(fs.readFileSync(p, 'utf8')).toLowerCase();
      for (const phrase of BANNED) {
        if (text.includes(phrase.toLowerCase())) hits.push({ rel, phrase });
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
