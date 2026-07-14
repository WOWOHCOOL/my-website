#!/usr/bin/env node
/**
 * Sitemap Generator — walks _site HTML, extracts hreflang + canonical, generates sitemaps.
 * Post-build step for npm run build. No Python dependency.
 * Usage: node scripts/generate-sitemaps.js
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.join(__dirname, '..');
const SITE_DIR = path.join(REPO_ROOT, '_site');
const SRC_DIR = path.join(REPO_ROOT, 'src');
const TODAY = new Date().toISOString().split('T')[0];

// Build page map: canonical URL -> { lang: url }
const pageMap = {};

function walkHtml(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!['image', 'css', 'js', 'node_modules', '.git'].includes(entry.name)) {
        walkHtml(full);
      }
    } else if (entry.name.endsWith('.html')) {
      const content = fs.readFileSync(full, 'utf-8');

      // Extract hreflang entries
      const hreflangs = {};
      const hreflangRegex = /hreflang="([^"]*)" href="([^"]*)"/g;
      let m;
      while ((m = hreflangRegex.exec(content)) !== null) {
        hreflangs[m[1]] = m[2];
      }

      // Extract canonical
      const canonMatch = content.match(/<link rel="canonical" href="([^"]*)"/);
      if (!canonMatch) continue;
      const canonical = canonMatch[1];

      if (!pageMap[canonical]) {
        pageMap[canonical] = hreflangs;
      }
    }
  }
}

walkHtml(SITE_DIR);
console.log(`Found ${Object.keys(pageMap).length} unique pages`);

// Breakdown by page type
const breakdown = { homepage: 0, top_level: 0, product_category: 0, product_sub: 0, blog_article: 0, blog_other: 0, other: 0 };
for (const canonical of Object.keys(pageMap)) {
  const pathname = canonical.replace('https://www.wowohcool.com', '').replace(/\/$/, '');
  const segments = pathname.split('/').filter(Boolean);
  if (pathname === '') breakdown.homepage++;
  else if (segments.length === 1) breakdown.top_level++;
  else if (segments[0] === 'products' && segments.length === 2) breakdown.product_category++;
  else if (segments[0] === 'products' && segments.length >= 3) breakdown.product_sub++;
  else if (segments[0] === 'blog' && segments.length === 2) breakdown.blog_article++;
  else if (segments[0] === 'blog') breakdown.blog_other++;
  else breakdown.other++;
}
console.log(`  Homepage: ${breakdown.homepage} | Top-level: ${breakdown.top_level} | Product cats: ${breakdown.product_category} | Product subs: ${breakdown.product_sub} | Blog articles: ${breakdown.blog_article} | Blog other: ${breakdown.blog_other} | Other: ${breakdown.other}`);

// Generate sitemaps
function genSitemap(langFilter) {
  let urlsXml = '';
  const entries = Object.entries(pageMap).sort(([a], [b]) => a.localeCompare(b));

  for (const [canonical, hreflangs] of entries) {
    const pathname = canonical.replace('https://www.wowohcool.com', '');

    // Language filtering: EN sitemap = no prefix, others = must start with /lang/
    if (langFilter === null) {
      if (pathname.startsWith('/de/') || pathname.startsWith('/es/') || pathname.startsWith('/fr/')) continue;
    } else {
      if (!pathname.startsWith(`/${langFilter}/`)) continue;
    }

    // Priority by page type
    const segments = pathname.replace(/\/$/, '').split('/').filter(Boolean);
    let priority, changefreq;
    if (pathname === '' || pathname === '/') {
      priority = '1.0'; changefreq = 'weekly';
    } else if (segments.length === 1) {
      priority = '0.9'; changefreq = 'weekly';
    } else if (segments[0] === 'products' && segments.length === 2) {
      priority = '0.9'; changefreq = 'monthly';
    } else if (segments[0] === 'products' && segments.length >= 3) {
      priority = '0.8'; changefreq = 'monthly';
    } else if (segments[0] === 'blog' && segments.length === 2) {
      priority = '0.7'; changefreq = 'monthly';
    } else if (segments[0] === 'blog') {
      priority = '0.8'; changefreq = 'weekly';
    } else {
      priority = '0.6'; changefreq = 'monthly';
    }

    urlsXml += ` <url>\n`;
    urlsXml += `  <loc>${canonical}</loc>\n`;

    // hreflang alternates
    for (const [lang, url] of Object.entries(hreflangs).sort(([a], [b]) => a.localeCompare(b))) {
      if (lang !== 'x-default') {
        urlsXml += `  <xhtml:link rel="alternate" hreflang="${lang}" href="${url}"/>\n`;
      }
    }
    if (hreflangs['x-default']) {
      urlsXml += `  <xhtml:link rel="alternate" hreflang="x-default" href="${hreflangs['x-default']}"/>\n`;
    }

    urlsXml += `  <lastmod>${TODAY}</lastmod>\n`;
    urlsXml += `  <changefreq>${changefreq}</changefreq>\n`;
    urlsXml += `  <priority>${priority}</priority>\n`;
    urlsXml += ` </url>\n`;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urlsXml}</urlset>\n`;
}

// Generate all 4 sitemaps
const configs = [
  [null, 'sitemap.xml', 'EN'],
  ['de', 'de/sitemap.xml', 'DE'],
  ['es', 'es/sitemap.xml', 'ES'],
  ['fr', 'fr/sitemap.xml', 'FR'],
];

for (const [lang, filename, label] of configs) {
  const xml = genSitemap(lang);
  const outPath = path.join(SITE_DIR, filename);
  const outDir = path.dirname(outPath);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outPath, xml, 'utf-8');
  const count = (xml.match(/<url>/g) || []).length;
  console.log(`${label} sitemap: ${count} URLs -> ${filename}`);
}
