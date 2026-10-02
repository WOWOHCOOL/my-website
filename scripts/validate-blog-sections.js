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
          if (/(source|refer|quelle|fuent|référ|źród|источник)/.test(t)) { const sec = s.lastIndexOf('<section', m.index); if (sec >= 0) { i = sec; break; } }
        }
      }
      if (i < 0) return null;
      const std = s.slice(i, s.indexOf('</section>', i) + '</section>'.length);
      const heading = (std.match(/<h2[^>]*>([\s\S]*?)<\/h2>/) || [])[1] || '';
      const sectionClass = attr(std.match(/<section\b[^>]*>/) ? std.match(/<section\b[^>]*>/)[0] : '', 'class');
      const items = [...std.matchAll(/<li><a href="([^"]+)" target="_blank" rel="([^"]+)" class="([^"]+)">([\s\S]*?)<\/a><\/li>/g)].map(m => ({ href: m[1], rel: m[2], cls: m[3], text: m[4] }));
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
    call: '{{ ctaPanel(a.heading, a.subtext, a.primaryHref, a.primaryLabel, a.secondaryHref, a.secondaryLabel) }}',
    extract(s) {
      const b = blockAt(s, '<!-- CTA -->', 'section'); if (!b) return null;
      const heading = (b.std.match(/<h2[^>]*>([\s\S]*?)<\/h2>/) || [])[1] || '';
      const subtext = (b.std.match(/<p class="text-slate-300[^"]*">([\s\S]*?)<\/p>/) || [])[1] || '';
      const as = [...b.std.matchAll(/<a href="([^"]+)" class="[^"]*">([\s\S]*?)<\/a>/g)];
      if (as.length < 2) return null;
      return { std: b.std, args: { heading, subtext, primaryHref: as[0][1], primaryLabel: as[0][2], secondaryHref: as[1][1], secondaryLabel: as[1][2] } };
    },
  },
  {
    name: 'relatedPanel',
    call: '{{ relatedPanel(a.heading, a.cards, a.asideClass) }}',
    extract(s) {
      const b = blockAt(s, '<aside id="related-articles"', 'aside'); if (!b) return null;
      const heading = (b.std.match(/<h2[^>]*>([\s\S]*?)<\/h2>/) || [])[1] || '';
      const asideClass = attr(b.std.match(/<aside\b[^>]*>/) ? b.std.match(/<aside\b[^>]*>/)[0] : '', 'class');
      const cards = [...b.std.matchAll(/<a href="([^"]+)" class="bg-slate-50[^"]*">\s*<div class="h-2 bg-gradient-to-r ([^"]*)"><\/div>\s*<div class="p-6">\s*<span[^>]*>([\s\S]*?)<\/span>\s*<h3[^>]*>([\s\S]*?)<\/h3>\s*<p class="text-slate-600 text-sm">([\s\S]*?)<\/p>/g)].map(m => ({ href: m[1], gradient: m[2], tag: m[3], title: m[4], desc: m[5] }));
      if (!cards.length) return null;
      return { std: b.std, args: { heading, cards, asideClass } };
    },
  },
];

PANELS.push(
  {
    name: 'hookPanel',
    call: '{{ hookPanel(a.para1, a.para2) }}',
    extract(src) {
      const b = blockAt(src, '<!-- The Hook -->', 'div'); if (!b) return null;
      const ps = [...b.std.matchAll(/<p class="text-lg text-slate-700 italic">([\s\S]*?)<\/p>/g)];
      const p2 = b.std.match(/<p class="text-slate-600 leading-relaxed mt-4">([\s\S]*?)<\/p>/);
      if (!ps.length) return null;
      return { std: b.std, args: { para1: ps[0][1], para2: p2 ? p2[1] : '' } };
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
    call: '{{ tocPanel(a.heading, a.items, a.h2Class) }}',
    extract(src) {
      const b = blockAt(src, '<!-- Table of Contents -->', 'div'); if (!b) return null;
      const h2 = b.std.match(/<h2 class="([^"]*)">([\s\S]*?)<\/h2>/); if (!h2) return null;
      const items = [...b.std.matchAll(/<a href="([^"]+)" class="block hover:text-brandOrange transition">([\s\S]*?)<\/a>/g)].map(m => ({ href: m[1], text: m[2] }));
      if (!items.length) return null;
      return { std: b.std, args: { heading: h2[2], items, h2Class: h2[1] } };
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
    call: '{{ faqPanel(a.heading, a.items, a.layout) }}',
    extract(src) {
      const b = blockAt(src, '<section id="faq"', 'section'); if (!b) return null;
      const heading = (b.std.match(/<h2[^>]*>([\s\S]*?)<\/h2>/) || [])[1] || '';
      let items = [...b.std.matchAll(/<details class="faq-item">\s*<summary>([\s\S]*?)<\/summary>\s*<div class="faq-answer">([\s\S]*?)<\/div>\s*<\/details>/g)].map(m => ({ q: m[1], a: m[2] }));
      let layout = 'details';
      if (!items.length) { layout = 'card'; items = [...b.std.matchAll(/<div class="bg-white rounded-xl p-6 faq-answer">\s*<h3[^>]*>([\s\S]*?)<\/h3>\s*<p class="text-slate-600 text-sm">([\s\S]*?)<\/p>\s*<\/div>/g)].map(m => ({ q: m[1], a: m[2] })); }
      if (!items.length) return null;
      return { std: b.std, args: { heading, items, layout } };
    },
  }
);
let totalPass = 0, totalFail = 0;
for (const panel of PANELS) {
  let p = 0, f = 0; const fails = [];
  for (const rel of SAMPLES) {
    const fp = path.join(ROOT, rel); if (!fs.existsSync(fp)) continue;
    const ex = panel.extract(fs.readFileSync(fp, 'utf8')); if (!ex) continue;
    const out = env.renderString(IMP + panel.name + ' %}' + panel.call, { a: ex.args });
    if (out === ex.std) p++; else { f++; fails.push({ rel, std: ex.std, out }); }
  }
  totalPass += p; totalFail += f;
  console.log('[validate-blog-sections] ' + panel.name + ': byte-exact PASS=' + p + ' / variant=' + f);
  for (const x of fails.slice(0, 3)) {
    let k = 0; while (k < x.std.length && k < x.out.length && x.std[k] === x.out[k]) k++;
    console.log('    - ' + x.rel + '  firstDiff@' + k + '  (std ' + x.std.length + ' / out ' + x.out.length + ')');
  }
}
console.log('\n[validate-blog-sections] TOTAL byte-exact PASS=' + totalPass + ' / variant=' + totalFail);
console.log('  [diagnostic mode] Step-1 prototype: reports variants; does not gate the build.');
process.exit(0);
