'use strict';
// Prototype validator (Step 1): prove blog-section renderers reproduce the EXISTING
// hand-written panel HTML byte-for-byte, across multiple article types/languages.
// Diagnostic mode: reports variants; does not gate the build.
// Usage: node scripts/validate-blog-sections.js
const fs = require('fs');
const path = require('path');
const nunjucks = require('nunjucks');

const ROOT = path.join(__dirname, '..');
const env = new nunjucks.Environment(new nunjucks.FileSystemLoader(path.join(ROOT, 'src', '_includes')));
const IMP = '{% from "partials/blog-sections.njk" import ';

const SAMPLES = [
  'src/blog/gan-chargers-guide/index.njk',
  'src/blog/gan-vs-silicon-charger-comparison/index.njk',
  'src/blog/top-power-bank-manufacturers-china/index.njk',
  'src/de/blog/zertifizierungen-eu-markt/index.njk',
  'src/es/blog/especificaciones-power-banks-importadores/index.njk',
  'src/fr/blog/couts-import-chine-droits-douane-oem/index.njk',
  'src/ru/blog/proverka-podlinnosti-sertifikatov-eac-ce-fcc-oem/index.njk',
  'src/blog/usb-c-common-charger-eu-2022-2380-oem-checklist/index.njk',
  'src/de/blog/zertifikate-pruefen-gs-ce-oem-importeure/index.njk',
  'src/fr/blog/verifier-certificats-faux-chargeurs-oem/index.njk',
  'src/pl/blog/weryfikacja-falszywych-certyfikatow-ce-importer-oem/index.njk',
  'src/ru/blog/priemka-partii-power-bank-aql-oem/index.njk',
  'src/es/blog/baterias-semi-solid-state/index.njk',
  'src/fr/blog/solutions-recharge-hotellerie-oem/index.njk',
  'src/ru/blog/zaryadnye-resheniya-gostinicy-oem/index.njk',
  'src/pl/blog/stacje-ladowania-hotel-oem/index.njk',
  'src/de/blog/nageltest-halbfest-akku-powerbank-verifizierung/index.njk',
  'src/blog/wireless-charger-manufacturers-china/index.njk',
  'src/blog/power-bank-specs-guide/index.njk',
  'src/pl/blog/checklista-weryfikacji-fabryki-chiny-oem/index.njk',
];

function closeBal(s, start, tag) {
  const re = new RegExp('<(/?)' + tag + '\\b[^>]*>', 'gi');
  re.lastIndex = start;
  let d = 0, m;
  while ((m = re.exec(s))) {
    if (m[1] === '/') { d--; if (d === 0) return m.index + m[0].length; }
    else if (!/\/>$/.test(m[0])) d++;
  }
  return -1;
}
function blockAt(s, marker, tag) {
  const i = s.indexOf(marker); if (i < 0) return null;
  const o = s.indexOf('<' + tag, i); if (o < 0) return null;
  const e = closeBal(s, o, tag); if (e < 0) return null;
  return { std: s.slice(i, e) };
}
function attr(tag, n) { return (tag.match(new RegExp('\\b' + n + '="([^"]*)"')) || [])[1] || ''; }

const PANELS = [
  {
    name: 'sourcesPanel',
    call: '{{ sourcesPanel(a.heading, a.items, a.sectionClass) }}',
    extract(s) {
      let i = s.indexOf('<!-- Sources & References -->');
      if (i < 0) {
        for (const m of s.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)) {
          const t = m[1].replace(/<[^>]+>/g, '').toLowerCase();
          if (/^\s*(sources|references?|références?|quellen|fuentes|referencias|źródła|источники)/i.test(t)) { const sec = s.lastIndexOf('<section', m.index); if (sec >= 0) { i = sec; break; } }
        }
      }
      if (i < 0) return null;
      const std = s.slice(i, s.indexOf('</section>', i) + '</section>'.length);
      const heading = (std.match(/<h2[^>]*>([\s\S]*?)<\/h2>/) || [])[1] || '';
      const sectionClass = attr(std.match(/<section\b[^>]*>/) ? std.match(/<section\b[^>]*>/)[0] : '', 'class');
      const items = [...std.matchAll(/<li([^>]*)><a href="([^"]+)" target="_blank" rel="([^"]+)" class="([^"]+)">([\s\S]*?)<\/a>([\s\S]*?)<\/li>/g)].map(m => ({ liClass: attr('<li' + m[1] + '>', 'class'), href: m[2], rel: m[3], cls: m[4], text: m[5], after: m[6] }));
      return { std, args: { heading, items, sectionClass } };
    },
  },
  {
    name: 'featuredImage',
    call: '{{ featuredImage(a.imgSrc, a.srcset, a.sizes, a.alt, a.title, a.width, a.height) }}',
    extract(s) {
      const b = blockAt(s, '<!-- Featured Image -->', 'div'); if (!b) return null;
      const img = (b.std.match(/<img\b[^>]*>/) || [])[0]; if (!img) return null;
      return { std: b.std, args: { imgSrc: attr(img, 'src'), srcset: attr(img, 'srcset'), sizes: attr(img, 'sizes'), alt: attr(img, 'alt'), title: attr(img, 'title'), width: attr(img, 'width'), height: attr(img, 'height') } };
    },
  },
  {
    name: 'ctaPanel',
    call: '{{ ctaPanel(a.heading, a.subtext, a.primaryHref, a.primaryLabel, a.secondaryHref, a.secondaryLabel, a.wrapClass, a.cardInner, a.sectionClass, a.cardClass, a.primaryClass, a.secondaryClass, a.subtextClass) }}',
    extract(s) {
      const i = s.indexOf('<!-- CTA -->'); if (i < 0) return null;
      const isSectionCta = /^<!-- CTA -->\s*(?:<div class="max-w-[^"]*">\s*)?<section\b/.test(s.slice(i));
      if (!isSectionCta) return null;
      const wrapMatch = s.slice(i).match(/^<!-- CTA -->\s*<div class="(max-w-[^"]*)">/);
      const wrapClass = wrapMatch ? wrapMatch[1] : '';
      const so = s.indexOf('<section', i); if (so < 0) return null;
      const se = closeBal(s, so, 'section'); if (se < 0) return null;
      let end = se;
      if (wrapClass) { const j = s.slice(se).match(/^\s*<\/div>/); if (j) end = se + j[0].length; }
      const std = s.slice(i, end);
      const heading = (std.match(/<h2[^>]*>([\s\S]*?)<\/h2>/) || [])[1] || '';
      const subtextTag = (std.match(/<p class="(text-slate-300[^"]*)">/) || []);
      const subtext = (std.match(/<p class="text-slate-300[^"]*">([\s\S]*?)<\/p>/) || [])[1] || '';
      const as = [...std.matchAll(/<a href="([^"]+)" class="([^"]*)">([\s\S]*?)<\/a>/g)];
      if (as.length < 2) return null;
      const secTag = (std.match(/<section class="([^"]*)"/) || [])[1] || '';
      const cardInner = /<section[^>]*>\s*<div class="[^"]*bg-gradient-to-br/.test(std);
      const gradTag = (std.match(/<(?:section|div) class="([^"]*bg-gradient-to-br[^"]*)"/) || []);
      const cardClass = gradTag[1] || '';
      const sectionClass = cardInner ? secTag : '';
      return { std, args: { heading, subtext, primaryHref: as[0][1], primaryLabel: as[0][3], secondaryHref: as[1][1], secondaryLabel: as[1][3], wrapClass, cardInner, sectionClass, cardClass, primaryClass: as[0][2], secondaryClass: as[1][2], subtextClass: subtextTag[1] || '' } };
    },
  },
  {
    name: 'relatedPanel',
    call: '{{ relatedPanel(a.heading, a.cards, a.asideClass, a.h2Class, a.headingBar) }}',
    extract(s) {
      const b = blockAt(s, '<aside id="related-articles"', 'aside'); if (!b) return null;
      const h2 = b.std.match(/<h2 class="([^"]*)">([\s\S]*?)<\/h2>/); if (!h2) return null;
      const heading = h2[2];
      const headingBar = /<div class="flex items-center gap-3 mb-6">\s*<div class="w-1 h-6 bg-brandOrange rounded-full"><\/div>\s*<h2/.test(b.std);
      const asideClass = attr(b.std.match(/<aside\b[^>]*>/) ? b.std.match(/<aside\b[^>]*>/)[0] : '', 'class');
      const cards = [...b.std.matchAll(/<a href="([^"]+)" class="bg-slate-50[^"]*">\s*<div class="h-2 bg-gradient-to-r ([^"]*)"><\/div>\s*<div class="(p-[^"]*)">\s*(?:<span[^>]*>([\s\S]*?)<\/span>\s*)?<h3[^>]*>([\s\S]*?)<\/h3>\s*<p class="text-slate-600 ([^"]*)">([\s\S]*?)<\/p>/g)].map(m => ({ href: m[1], gradient: m[2], contentClass: m[3], tag: m[4] || '', title: m[5], descClass: m[6], desc: m[7] }));
      if (!cards.length) return null;
      return { std: b.std, args: { heading, cards, asideClass, h2Class: h2[1], headingBar } };
    },
  },
];

PANELS.push(
  {
    name: 'hookPanel',
    call: '{{ hookPanel(a.para1, a.para2, a.wrapClass) }}',
    extract(src) {
      const b = blockAt(src, '<!-- The Hook -->', 'div'); if (!b) return null;
      const wrapClass = (b.std.match(/<!-- The Hook -->\s*<div class="(max-w-[^"]*)"/) || [])[1] || '';
      const ps = [...b.std.matchAll(/<p class="text-lg text-slate-700 italic">([\s\S]*?)<\/p>/g)];
      const p2 = b.std.match(/<p class="text-slate-600 leading-relaxed mt-4">([\s\S]*?)<\/p>/);
      if (!ps.length) return null;
      return { std: b.std, args: { para1: ps[0][1], para2: p2 ? p2[1] : '', wrapClass } };
    },
  },
  {
    name: 'takeawaysPanel',
    call: '{{ takeawaysPanel(a.label, a.tldr, a.items) }}',
    extract(src) {
      const mk = src.indexOf('bg-amber-50 border-l-4 border-amber-500'); if (mk < 0) return null;
      const o = src.lastIndexOf('<div', mk); const e = closeBal(src, o, 'div'); if (e < 0) return null;
      const b = { std: src.slice(o, e) };
      const label = (b.std.match(/<p class="text-badge[^"]*">([\s\S]*?)<\/p>/) || [])[1] || '';
      const tldr = (b.std.match(/<p class="text-slate-700 leading-relaxed text-sm mb-4 speakable">([\s\S]*?)<\/p>/) || [])[1] || '';
      const items = [...b.std.matchAll(/<li>([\s\S]*?)<\/li>/g)].map(m => m[1]);
      if (!items.length) return null;
      return { std: b.std, args: { label, tldr, items } };
    },
  },
  {
    name: 'tocPanel',
    call: '{{ tocPanel(a.heading, a.items, a.h2Class, a.wrapClass) }}',
    extract(src) {
      const b = blockAt(src, '<!-- Table of Contents -->', 'div'); if (!b) return null;
      const wrapClass = (b.std.match(/<!-- Table of Contents -->\s*<div class="(max-w-[^"]*)"/) || [])[1] || '';
      const h2 = b.std.match(/<h2 class="([^"]*)">([\s\S]*?)<\/h2>/); if (!h2) return null;
      const items = [...b.std.matchAll(/<a href="([^"]+)" class="block hover:text-brandOrange transition">([\s\S]*?)<\/a>/g)].map(m => ({ href: m[1], text: m[2] }));
      if (!items.length) return null;
      return { std: b.std, args: { heading: h2[2], items, h2Class: h2[1], wrapClass } };
    },
  }
);
PANELS.push(
  {
    name: 'metricsPanel',
    call: '{{ metricsPanel(a.items) }}',
    extract(src) {
      const b = blockAt(src, '<!-- GaN Key Metrics Cards -->', 'div'); const bb = b || null;
      const mk = src.search(/<div class="mb-12">\s*<div class="grid grid-cols-2 md:grid-cols-\d+ gap-3">/);
      if (mk < 0) return null;
      const open = src.indexOf('<div class="mb-12">', mk); const e = closeBal(src, open, 'div'); const std = src.slice(open, e);
      const items = [...std.matchAll(/<div class="(bg-white[^"]*)">\s*<div class="text-2xl font-black ([^"]*) mb-1">([\s\S]*?)<\/div>\s*<div class="text-micro[^"]*">([\s\S]*?)<\/div>/g)].map(m => ({ cardClass: m[1], colorClass: m[2], val: m[3], label: m[4] }));
      if (!items.length) return null;
      return { std, args: { items } };
    },
  },
  {
    name: 'faqPanel',
    call: '{{ faqPanel(a.heading, a.items, a.layout, a.wrapClass) }}',
    extract(src) {
      const b = blockAt(src, '<section id="faq"', 'section'); if (!b) return null;
      const heading = (b.std.match(/<h2[^>]*>([\s\S]*?)<\/h2>/) || [])[1] || '';
      const wrapClass = (b.std.match(/<section id="faq"[^>]*>\s*<div class="(max-w-4xl[^"]*)"/) || [])[1] || '';
      let items = [...b.std.matchAll(/<details class="faq-item">\s*<summary>([\s\S]*?)<\/summary>\s*<div class="faq-answer">([\s\S]*?)<\/div>\s*<\/details>/g)].map(m => ({ q: m[1], a: m[2] }));
      let layout = 'details';
      if (!items.length) { layout = 'card'; items = [...b.std.matchAll(/<div class="bg-white rounded-xl p-6 faq-answer">\s*<h3[^>]*>([\s\S]*?)<\/h3>\s*<p class="text-slate-600 text-sm">([\s\S]*?)<\/p>\s*<\/div>/g)].map(m => ({ q: m[1], a: m[2] })); }
      if (!items.length) return null;
      return { std: b.std, args: { heading, items, layout, wrapClass } };
    },
  }
);
PANELS.push(
  {
    name: 'conclusionPanel',
    call: '{{ conclusionPanel(a.heading, a.paragraphs, a.list, a.paragraphsAfter, a.sectionClass) }}',
    extract(src) {
      const i = src.indexOf('<section id="conclusion"'); if (i < 0) return null;
      const e = closeBal(src, i, 'section'); const std = src.slice(i, e);
      const heading = (std.match(/<h2[^>]*>([\s\S]*?)<\/h2>/) || [])[1] || '';
      const sectionClass = (std.match(/<section[^>]*class="([^"]*)"/) || [])[1] || '';
      const om = std.match(/<ol\b([^>]*)>([\s\S]*?)<\/ol>/);
      const olStart = om ? std.indexOf(om[0]) : -1;
      const paragraphs = [], paragraphsAfter = [];
      for (const m of std.matchAll(/<p class="text-slate-600 leading-relaxed mb-4">([\s\S]*?)<\/p>/g)) { (olStart >= 0 && m.index > olStart ? paragraphsAfter : paragraphs).push(m[1]); }
      let list = null;
      if (om) list = { class: (om[1].match(/class="([^"]*)"/) || [])[1] || '', items: [...om[2].matchAll(/<li([^>]*)>([\s\S]*?)<\/li>/g)].map(m => ({ cls: attr('<li' + m[1] + '>', 'class'), html: m[2] })) };
      return { std, args: { heading, paragraphs, list, paragraphsAfter, sectionClass } };
    },
  },
  {
    name: 'authorBioPanel',
    call: '{{ authorBioPanel(a) }}',
    extract(src) {
      const i = src.indexOf('<section id="author-bio"'); if (i < 0) return null;
      const e = closeBal(src, i, 'section'); const std = src.slice(i, e);
      const name = (std.match(/<a href="([^"]+)" target="_blank" rel="noopener noreferrer"[^>]*>([\s\S]*?)<\/a>/) || []);
      const bio = (std.match(/<p class="text-slate-600 text-sm leading-relaxed">([\s\S]*?)<\/p>/) || [])[1] || '';
      const role = (std.match(/<p class="text-sm text-slate-500 mb-3">([\s\S]*?)<\/p>/) || [])[1] || '';
      const profTag = (std.match(/<a\b[^>]*class="text-brandBlue hover:text-brandOrange font-bold"[^>]*>/) || [])[0] || '';
      const prof = (std.match(/<a href="([^"]+)"[^>]*class="text-brandBlue hover:text-brandOrange font-bold"[^>]*>([\s\S]*?)<\/a>/) || []);
      const profileHreflang = (profTag.match(/\bhreflang="([^"]*)"/) || [])[1] || '';
      const sectionClass = (std.match(/<section[^>]*class="([^"]*)"/) || [])[1] || '';
      const innerClass = (std.match(/<div class="(bg-slate-50[^"]*)"/) || [])[1] || '';
      const badge = (std.match(/<span class="px-2 py-1 bg-brandOrange\/10[^"]*">([\s\S]*?)<\/span>/) || [])[1] || 'Author';
      const img = (std.match(/<img\b[^>]*>/) || [])[0] || '';
      const A = n => (img.match(new RegExp('\\b' + n + '="([^"]*)"')) || [])[1] || '';
      const footprintLabel = (std.match(/<p class="text-xs text-slate-400 uppercase tracking-wider mb-2">([\s\S]*?)<\/p>/) || [])[1] || 'Factory Footprint';
      const footprint = [...std.matchAll(/<div><span class="font-black text-brandBlue">([\s\S]*?)<\/span><p class="text-xs text-slate-500">([\s\S]*?)<\/p><\/div>/g)].map(m => ({ val: m[1], label: m[2] }));
      if (!name.length || !bio) return null;
      return { std, args: { sectionClass, innerClass, badge, name: name[2], linkedin: name[1], role, bio, profileHref: prof[1], profileHreflang, profileLabel: prof[2], avatar: A('src'), avatarSrcset: A('srcset') ? ' srcset="' + A('srcset') + '"' : '', avatarSizes: A('sizes'), avatarAlt: A('alt'), avatarW: A('width'), avatarH: A('height'), footprintLabel, footprint } };
    },
  }
);
PANELS.push(
  {
    name: 'buyerSpecPanel',
    call: '{{ buyerSpecPanel(a.heading, a.cards, a.sectionClass) }}',
    extract(src) {
      const m = src.match(/<!--\s*=*\s*\[?9\.5\]?\s*Buyer Specification Card[^>]*-->/) || src.match(/<!--\s*Buyer Specification Card[^>]*-->/);
      if (!m) return null;
      const o = src.indexOf('<section', m.index + m[0].length); if (o < 0) return null;
      const e = closeBal(src, o, 'section'); if (e < 0) return null;
      const std = src.slice(o, e);
      const heading = (std.match(/<h2[^>]*>([\s\S]*?)<\/h2>/) || [])[1] || '';
      const sectionClass = (std.match(/<section class="([^"]*)"/) || [])[1] || '';
      const cards = [...std.matchAll(/<div class="bg-slate-50 rounded-xl p-5 border border-slate-200">\s*<p class="text-xs font-black text-brandOrange uppercase tracking-wider mb-2">([\s\S]*?)<\/p>\s*<ul class="text-sm text-slate-600 space-y-1 list-disc pl-4">([\s\S]*?)<\/ul>\s*<\/div>/g)].map(x => ({ label: x[1], items: [...x[2].matchAll(/<li>([\s\S]*?)<\/li>/g)].map(y => y[1]) }));
      if (!cards.length) return null;
      return { std, args: { heading, cards, sectionClass } };
    },
  }
);
const norm = s => s.replace(/<!--[\s\S]*?-->/g, '').replace(/\s+/g, '');
let totalPass = 0, totalWs = 0, totalStruct = 0;
for (const panel of PANELS) {
  let p = 0, ws = 0, st = 0; const fails = [];
  for (const rel of SAMPLES) {
    const fp = path.join(ROOT, rel); if (!fs.existsSync(fp)) continue;
    const ex = panel.extract(fs.readFileSync(fp, 'utf8')); if (!ex) continue;
    const out = env.renderString(IMP + panel.name + ' %}' + panel.call, { a: ex.args });
    if (out === ex.std) p++;
    else if (norm(out) === norm(ex.std)) ws++;
    else { st++; fails.push({ rel, std: ex.std, out, structural: true }); }
  }
  totalPass += p; totalWs += ws; totalStruct += st;
  console.log('[validate-blog-sections] ' + panel.name + ': byte-exact PASS=' + p + ' / whitespace-only=' + ws + ' / STRUCTURAL=' + st);
  for (const x of fails.slice(0, 3)) {
    let k = 0; while (k < x.std.length && k < x.out.length && x.std[k] === x.out[k]) k++;
    console.log('    - ' + x.rel + '  firstDiff@' + k + '  (std ' + x.std.length + ' / out ' + x.out.length + ')');
    if (process.env.VERBOSE) {
      const A = norm(x.std), B = norm(x.out); let j = 0; while (j < A.length && j < B.length && A[j] === B[j]) j++;
      console.log('        std*: ' + JSON.stringify(A.slice(Math.max(0, j - 50), j + 90)));
      console.log('        out*: ' + JSON.stringify(B.slice(Math.max(0, j - 50), j + 90)));
    }
  }
}
console.log('\n[validate-blog-sections] TOTAL byte-exact PASS=' + totalPass + ' / whitespace-only=' + totalWs + ' / STRUCTURAL=' + totalStruct);
console.log('  [diagnostic mode] Step-1 prototype: reports variants; does not gate the build.');
process.exit(0);
