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
