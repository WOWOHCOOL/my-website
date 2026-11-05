'use strict';
// L2 gate: every blog article's Closing CTA must use the 2026-11-04 shape:
//   left  = exactly one internal <a href="...">
//   right = exactly one <button data-action="open-modal" data-product="...">
// No /contact/, /de/kontakt/ or equivalent link may replace the modal button.
// Source of truth: seomachine/context/cro-best-practices.md §0.4.
// Usage: node scripts/validate-blog-cta.js
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const CONTACT_RE = /\/(?:contact|contact-us|kontakt|contacto|kontakty)(?:[\/"'#?]|$)/i;

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name === 'index.njk' && /[\\/]blog[\\/]/.test(p)) out.push(p);
  }
  return out;
}

// Exclude the six blog index/list pages; they have no Closing CTA by design.
const files = walk(SRC).filter((f) => !/[\\/]blog[\\/]index\.njk$/.test(f));
const bad = [];
const missing = [];
let checked = 0;

for (const file of files) {
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  const s = fs.readFileSync(file, 'utf8');
  // Some pages have an inline mid-article <!-- CTA --> too; the Closing CTA is
  // the last one. Pages without the comment fall back to the closing banner class.
  const marker = s.lastIndexOf('<!-- CTA -->');
  let start = -1;
  if (marker >= 0) {
    start = s.indexOf('<section', marker);
  } else {
    const banner = s.lastIndexOf('bg-gradient-to-br from-brandBlue to-slate-800 rounded-3xl');
    if (banner >= 0) start = s.lastIndexOf('<section', banner);
  }
  const end = start >= 0 ? s.indexOf('</section>', start) : -1;
  if (start < 0 || end < 0) { missing.push(rel); continue; }
  const block = s.slice(start, end);

  const links = [...block.matchAll(/<a\b[^>]*href="([^"]+)"/gi)].map((m) => m[1]);
  const buttons = [...block.matchAll(/<button\b[^>]*>/gi)].map((m) => m[0]);
  const modals = buttons.filter((b) => /data-action="open-modal"/i.test(b));
  const withProduct = modals.filter((b) => /data-product="[^"]+"/i.test(b));
  const contactLinks = links.filter((href) => CONTACT_RE.test(href));

  checked++;
  if (links.length !== 1 || modals.length !== 1 || withProduct.length !== 1 || contactLinks.length) {
    bad.push({
      rel,
      links: links.length,
      modals: modals.length,
      products: withProduct.length,
      contact: contactLinks,
    });
  }
}

if (bad.length) {
  console.log('[validate-blog-cta] FAIL — ' + bad.length + ' / ' + checked + ' blog CTAs are not the 2026-11-04 shape');
  for (const b of bad.slice(0, 30)) {
    console.log('   - ' + b.rel + '  links=' + b.links + ' modal=' + b.modals + ' product=' + b.products +
      (b.contact.length ? ' contact=' + b.contact.join(',') : ''));
  }
  process.exit(1);
}

console.log('[validate-blog-cta] PASS — ' + checked + ' blog CTAs use one internal link + one open-modal button');
if (missing.length) {
  console.log('[validate-blog-cta] WARN — no <!-- CTA --> block: ' + missing.length);
  for (const m of missing.slice(0, 10)) console.log('   - ' + m);
}
