'use strict';
// Step-2 self-test: the registry-driven assembler renders every shared panel in
// order from data alone, using the Step-1 validated macros.
// Usage: node scripts/validate-blog-render.js
const path = require('path');
const nunjucks = require('nunjucks');

const ROOT = path.join(__dirname, '..');
const env = new nunjucks.Environment(new nunjucks.FileSystemLoader(path.join(ROOT, 'src', '_includes')));

const sections = [
  { key: 'hero', html: '<article class="pb-12">\n' },
  { key: 'hook', para1: 'HOOK-ONE', para2: 'HOOK-TWO' },
  { key: 'featured-image', src: '/img.webp', srcset: '/img-950w.webp 950w', sizes: '848px', alt: 'ALT', title: 'TITLE', width: '1700', height: '956' },
  { key: 'takeaways', label: 'KEY TAKEAWAYS', tldr: 'TLDR-TEXT', items: ['<strong>A:</strong> one', 'B: two'] },
  { key: 'metrics', items: [{ val: '1M+', label: 'Monthly capacity' }, { val: '0.3%', label: 'Field failure' }, { val: '500', label: 'MOQ' }] },
  { key: 'toc', heading: 'Table of Contents', items: [{ href: '#faq', text: 'FAQ' }] },
  { key: 'body', html: '<section id="body-1" class="mb-16"><h2>Body</h2></section>' },
  { key: 'conclusion', heading: 'Conclusion', paragraphs: ['P-BEFORE'], list: { class: 'list-decimal pl-5 space-y-2 text-slate-600 text-sm', items: [{ html: 'STEP-ONE' }] }, paragraphsAfter: ['P-AFTER'] },
  { key: 'buyer-spec', heading: 'Buyer Specification', cards: [ { label: 'Certifications', items: ['CE'] }, { label: 'Manufacturing &amp; MOQ', items: ['MOQ: 500'] }, { label: 'Quality Standards', items: ['AQL 0.65'] } ] },
  { key: 'faq', heading: 'Frequently Asked Questions', items: [{ q: 'Q1?', a: 'A1' }, { q: 'Q2?', a: 'A2' }, { q: 'Q3?', a: 'A3' }] },
  { key: 'author-bio', sectionClass: 'max-w-4xl mx-auto px-6', badge: 'Author', name: 'AUTHOR-NAME', linkedin: 'https://linkedin.com/in/x', role: 'ROLE', bio: 'BIO', profileHref: '/authors/x/', profileHreflang: 'en', profileLabel: 'Full profile', avatar: '/a.webp', avatarSizes: '152px', avatarAlt: 'Avatar', avatarW: '400', avatarH: '400', footprintLabel: 'Factory Footprint', footprint: [{ val: '2013', label: 'Founded' }, { val: '5,000m2', label: 'Factory' }, { val: '50+', label: 'Engineers' }, { val: '1M+', label: 'Monthly' }] },
  { key: 'cta', heading: 'CTA-HEADING', subtext: 'CTA-SUB', primaryHref: '/contact/', primaryLabel: 'Get Factory Pricing', secondaryHref: '/products/', secondaryLabel: 'View Products' },
  { key: 'related', heading: 'Related Articles', cards: [ { href: '/blog/a/', gradient: 'from-brandBlue to-brandOrange', tag: 'Cat', title: 'Rel A', desc: 'Desc A' }, { href: '/blog/b/', gradient: 'from-brandOrange to-slate-800', tag: '', title: 'Rel B', desc: 'Desc B' }, { href: '/blog/c/', gradient: 'from-brandBlue to-brandOrange', tag: 'Cat', title: 'Rel C', desc: 'Desc C' } ] },
  { key: 'sources', heading: 'Sources &amp; References', items: [{ href: 'https://example.com', rel: 'noopener external', cls: 'text-brandBlue hover:text-brandOrange', text: 'Source One', after: ', official' }] },
  { key: 'hero', html: '</article>\n' },
];

const html = env.renderString(
  '{% from "partials/blog-render.njk" import renderBlogSections %}{{ renderBlogSections(sections) }}',
  { sections }
);

const checks = [];
const has = (label, cond) => checks.push([label, !!cond]);
has('hook speakable', html.includes('speakable') && html.includes('HOOK-ONE'));
has('featured image eager', html.includes('fetchpriority="high"'));
has('metrics grid', html.includes('1M+'));
has('toc #faq link', /href="#faq"/.test(html));
has('body raw html', html.includes('id="body-1"'));
has('conclusion paragraph->list->paragraph', html.indexOf('P-BEFORE') < html.indexOf('STEP-ONE') && html.indexOf('STEP-ONE') < html.indexOf('P-AFTER'));
has('buyer spec 3 cards', (html.match(/bg-slate-50 rounded-xl p-5/g) || []).length === 3);
has('faq section + answers', html.includes('id="faq"') && (html.match(/faq-answer/g) || []).length >= 3);
has('author-bio section', html.includes('id="author-bio"') && html.includes('AUTHOR-NAME'));
has('cta standard inner-gradient default', /max-w-4xl mx-auto px-6 mb-16">\s*<div class="relative bg-gradient-to-br/.test(html));
has('related aside + tagless card ok', html.includes('id="related-articles"') && html.includes('Rel B'));
has('sources trailing text', html.includes('Source One</a>, official'));
has('order hook<faq<author<related<sources', html.indexOf('HOOK-ONE') < html.indexOf('id="faq"') && html.indexOf('id="faq"') < html.indexOf('id="author-bio"') && html.indexOf('id="author-bio"') < html.indexOf('id="related-articles"') && html.indexOf('id="related-articles"') < html.indexOf('Sources &amp; References'));

let fail = 0;
for (const [label, ok] of checks) { console.log((ok ? '[PASS] ' : '[FAIL] ') + label); if (!ok) fail++; }
console.log('\n[validate-blog-render] ' + (checks.length - fail) + '/' + checks.length + ' checks passed');
if (fail) process.exit(1);
