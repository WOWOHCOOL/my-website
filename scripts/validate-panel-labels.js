'use strict';
// L2 gate: fixed-panel microcopy must equal the canonical localized label in
// src/_data/panel-labels.json. Free content headings (conclusion/CTA/body) are not checked.
// Usage: node scripts/validate-panel-labels.js
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const LABELS = JSON.parse(fs.readFileSync(path.join(ROOT, 'src', '_data', 'panel-labels.json'), 'utf8')).labels;

function walk(dir, out = []) { for (const e of fs.readdirSync(dir, { withFileTypes: true })) { const p = path.join(dir, e.name); if (e.isDirectory()) walk(p, out); else if (e.name === 'index.njk') out.push(p); } return out; }
function closeBal(s, start, tag) { const re = new RegExp('<(\\/?)' + tag + '\\b[^>]*>', 'gi'); re.lastIndex = start; let d = 0, m; while ((m = re.exec(s))) { if (m[1] === '/') { d--; if (d === 0) return m.index + m[0].length; } else if (!/\/>$/.test(m[0])) d++; } return -1; }
function norm(s) { return (s || '').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&#0?39;/g, "'").replace(/\s+/g, ' ').trim(); }
function langOf(rel) { const m = rel.replace(/\\/g, '/').match(/^src\/(de|es|fr|pl|ru)\//); return m ? m[1] : 'en'; }

const files = walk(path.join(ROOT, 'src')).filter(f => /[\\/]blog[\\/]/.test(f));
let checked = 0, bad = [], missing = 0;
for (const f of files) {
  const rel = path.relative(ROOT, f); const lang = langOf(rel); const L = LABELS[lang]; if (!L) continue;
  const s = fs.readFileSync(f, 'utf8');
  const checks = [];
  // faq / related / author-bio / toc / takeaways
  let i = s.indexOf('<section id="faq"'); if (i >= 0) { const b = s.slice(i, closeBal(s, i, 'section')); const m = b.match(/<h2[^>]*>([\s\S]*?)<\/h2>/); checks.push(['faq', m && m[1]]); }
  i = s.indexOf('<aside id="related-articles"'); if (i >= 0) { const b = s.slice(i, closeBal(s, i, 'aside')); const m = b.match(/<h2[^>]*>([\s\S]*?)<\/h2>/); checks.push(['related', m && m[1]]); }
  i = s.indexOf('<div class="bg-brandBlue rounded-2xl p-8 text-white mb-12">'); if (i >= 0) { const b = s.slice(i, closeBal(s, i, 'div')); const m = b.match(/<h2[^>]*>([\s\S]*?)<\/h2>/); checks.push(['toc', m && m[1]]); }
  const mt = s.match(/<div class="bg-amber-50 border-l-4 border-amber-500[^"]*">\s*<p class="text-badge[^"]*">([\s\S]*?)<\/p>/); if (mt) checks.push(['takeaways', mt[1]]);
  { const ulRe = /<ul class="text-sm text-slate-600 space-y-2 list-disc pl-5">([\s\S]{0,4000}?)<\/ul>/g; let um; while ((um = ulRe.exec(s)) && !checks.find(c => c[0] === 'sources')) { if (!/target="_blank"/.test(um[1])) continue; const before = s.slice(0, um.index); const he = before.lastIndexOf('</h2>'); if (he < 0) continue; if (s.slice(he + 5, um.index).trim() !== '') continue; const hs = before.lastIndexOf('<h2', he); if (hs < 0) continue; const gt = before.indexOf('>', hs); checks.push(['sources', s.slice(gt + 1, he)]); } }
  i = s.indexOf('<section id="author-bio"'); if (i >= 0) { const b = s.slice(i, closeBal(s, i, 'section'));
    const bd = b.match(/<span class="px-2 py-1 bg-brandOrange\/10[^"]*">([\s\S]*?)<\/span>/); if (bd) checks.push(['badge', bd[1]]);
    const fp = b.match(/<p class="text-xs text-slate-400[^"]*">([\s\S]*?)<\/p>/); if (fp) checks.push(['footprint', fp[1]]); }
  for (const [key, raw] of checks) {
    checked++;
    if (norm(raw) !== norm(L[key])) bad.push({ rel, key, got: norm(raw), want: norm(L[key]) });
  }
}
if (bad.length) {
  console.log('[validate-panel-labels] NON-CANONICAL fixed-panel labels: ' + bad.length + ' / checked ' + checked);
  for (const b of bad.slice(0, 30)) console.log('   - ' + b.rel + '  [' + b.key + ']  got "' + b.got + '"  want "' + b.want + '"');
  process.exit(1);
}
console.log('[validate-panel-labels] PASS — ' + checked + ' fixed-panel labels match canonical (' + files.length + ' blog pages)');

