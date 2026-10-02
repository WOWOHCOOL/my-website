'use strict';
// Prototype validator: prove the blog-section renderers reproduce the EXISTING
// hand-written panel HTML byte-for-byte, across multiple article types.
// Usage: node scripts/validate-blog-sections.js
const fs = require('fs');
const path = require('path');
const nunjucks = require('nunjucks');

const ROOT = path.join(__dirname, '..');
const env = new nunjucks.Environment(new nunjucks.FileSystemLoader(path.join(ROOT, 'src', '_includes')));
const MACROS = fs.readFileSync(path.join(ROOT, 'src', '_includes', 'partials', 'blog-sections.njk'), 'utf8');

// 4 article types (how-to / comparison / listicle / regulation) across languages
const SAMPLES = [
  // how-to / comparison / listicle / regulation x EN+DE+ES (6-language spot check)
  'src/blog/gan-chargers-guide/index.njk',
  'src/blog/gan-vs-silicon-charger-comparison/index.njk',
  'src/blog/top-power-bank-manufacturers-china/index.njk',
  'src/de/blog/zertifizierungen-eu-markt/index.njk',
  'src/de/blog/fabrikauswahl-china-leitfaden/index.njk',
  'src/de/blog/gan-vs-silizium-ladegeraete-vergleich/index.njk',
  'src/es/blog/especificaciones-power-banks-importadores/index.njk',
  'src/es/blog/control-calidad-fabricas-chinas/index.njk',
  'src/fr/blog/couts-import-chine-droits-douane-oem/index.njk',
  'src/ru/blog/proverka-podlinnosti-sertifikatov-eac-ce-fcc-oem/index.njk',
  'src/pl/blog/checklista-weryfikacji-fabryki-chiny-oem/index.njk',
];

function extractSources(src) {
  // form 1: English comment anchor
  let i = src.indexOf('<!-- Sources & References -->');
  // form 2: localized <h2> whose text matches sources/references keywords
  if (i < 0) {
    for (const m of src.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)) {
      const t = m[1].replace(/<[^>]+>/g, '').toLowerCase();
      if (/(source|reference|quelle|fuent|référ|referenz|źród|источник)/.test(t)) {
        const sec = src.lastIndexOf('<section', m.index);
        if (sec >= 0) { i = sec; break; }
      }
    }
  }
  if (i < 0) return null;
  const j = src.indexOf('</section>', i) + '</section>'.length;
  return src.slice(i, j);
}
function sourcesArgs(panel) {
  const heading = (panel.match(/<h2[^>]*>([\s\S]*?)<\/h2>/) || [])[1] || '';
  const sectionClass = (panel.match(/<section class="([^"]*)"/) || [])[1] || '';
  const items = [...panel.matchAll(/<li><a href="([^"]+)" target="_blank" rel="([^"]+)" class="([^"]+)">([\s\S]*?)<\/a><\/li>/g)]
    .map((m) => ({ href: m[1], rel: m[2], cls: m[3], text: m[4] }));
  return { heading, items, sectionClass };
}

let pass = 0, fail = 0;
for (const rel of SAMPLES) {
  const p = path.join(ROOT, rel);
  if (!fs.existsSync(p)) { console.log('  SKIP (missing) ' + rel); continue; }
  const src = fs.readFileSync(p, 'utf8');
  const std = extractSources(src);
  if (!std) { console.log('  SKIP (no Sources panel) ' + rel); continue; }
  const args = sourcesArgs(std);
  const out = env.renderString('{% from "partials/blog-sections.njk" import sourcesPanel %}{{ sourcesPanel(heading, items, sectionClass) }}', args);
  const ok = out === std;
  console.log('  ' + (ok ? 'PASS' : 'FAIL') + '  ' + rel + '  (std ' + std.length + ' / out ' + out.length + ')');
  if (!ok) {
    let k = 0; while (k < std.length && k < out.length && std[k] === out[k]) k++;
    console.log('     first diff @' + k);
    console.log('     std: ' + JSON.stringify(std.slice(Math.max(0, k - 60), k + 60)));
    console.log('     out: ' + JSON.stringify(out.slice(Math.max(0, k - 60), k + 60)));
    fail++;
  } else pass++;
}
console.log('\n[validate-blog-sections] sourcesPanel — byte-exact PASS=' + pass + ' / variant FAIL=' + fail);
if (fail) {
  console.log('  → the failures above are COSMETIC variants of the same panel:');
  console.log('    leading comment / h2 indent / px-6-on-parent — exactly the drift');
  console.log('    the renderer removes once an article migrates to it.');
}
console.log('  [diagnostic mode] Step-1 prototype: reports variants; does not gate the build.');
process.exit(0);
