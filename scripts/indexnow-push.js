#!/usr/bin/env node
/**
 * IndexNow Push Script — pushes ALL sitemap URLs to Bing/Yandex after deploy.
 * Usage: node scripts/indexnow-push.js
 *
 * Submits all URLs from sitemap.xml + rss.xml across all languages.
 * No caching — Bing/Yandex deduplicate on their side.
 * Key file must exist at site root: f00021fe-fa3a-4786-9e7e-9312f9201661.txt
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const KEY = 'f00021fe-fa3a-4786-9e7e-9312f9201661';
const SITE_DIR = path.join(__dirname, '..', '_site');
const MAX_URLS_PER_BATCH = 10000; // IndexNow hard limit

function extractUrlsFromXml(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const urls = [];
  const locRegex = /<loc>([^<]+)<\/loc>/g;
  let match;
  while ((match = locRegex.exec(content)) !== null) {
    urls.push(match[1]);
  }
  return urls;
}

function extractUrlsFromRss(rssPath) {
  const content = fs.readFileSync(rssPath, 'utf-8');
  const urls = [];
  const linkRegex = /<link>([^<]+)<\/link>/g;
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    urls.push(match[1]);
  }
  return urls;
}

function pushToIndexNow(urls) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      host: 'www.wowohcool.com',
      key: KEY,
      keyLocation: `https://www.wowohcool.com/${KEY}.txt`,
      urlList: urls.slice(0, MAX_URLS_PER_BATCH)
    });

    const options = {
      hostname: 'api.indexnow.org',
      port: 443,
      path: '/IndexNow',
      method: 'POST',
      timeout: 30000, // 30s timeout — Cloudflare build containers have limited network
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timed out after 30s'));
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function main() {
  // Sitemaps: core B2B pages per language
  const sitemaps = [
    path.join(SITE_DIR, 'sitemap.xml'),
    path.join(SITE_DIR, 'de', 'sitemap.xml'),
    path.join(SITE_DIR, 'es', 'sitemap.xml'),
    path.join(SITE_DIR, 'fr', 'sitemap.xml'),
    path.join(SITE_DIR, 'ru', 'sitemap.xml'),
  ];

  // RSS feeds: all blog articles across languages
  const rssFeeds = [
    path.join(SITE_DIR, 'rss.xml'),
    path.join(SITE_DIR, 'de', 'rss.xml'),
    path.join(SITE_DIR, 'es', 'rss.xml'),
    path.join(SITE_DIR, 'fr', 'rss.xml'),
    path.join(SITE_DIR, 'ru', 'rss.xml'),
  ];

  let allUrls = [];
  for (const sitemap of sitemaps) {
    if (fs.existsSync(sitemap)) {
      const urls = extractUrlsFromXml(sitemap);
      console.log(`[IndexNow] ${path.relative(SITE_DIR, sitemap)}: ${urls.length} URLs`);
      allUrls = allUrls.concat(urls);
    } else {
      console.log(`[IndexNow] ${path.relative(SITE_DIR, sitemap)}: not found, skipped`);
    }
  }
  for (const rss of rssFeeds) {
    if (fs.existsSync(rss)) {
      const urls = extractUrlsFromRss(rss);
      console.log(`[IndexNow] ${path.relative(SITE_DIR, rss)}: ${urls.length} URLs`);
      allUrls = allUrls.concat(urls);
    } else {
      console.log(`[IndexNow] ${path.relative(SITE_DIR, rss)}: not found, skipped`);
    }
  }

  // Deduplicate
  const unique = [...new Set(allUrls)];
  const deduped = allUrls.length - unique.length;
  console.log(`[IndexNow] Total: ${allUrls.length} raw, ${unique.length} unique${deduped > 0 ? ` (${deduped} duplicates removed)` : ''}`);

  if (unique.length === 0) {
    console.log('[IndexNow] No URLs found — build may have failed. Check _site/ directory.');
    process.exit(1);
  }

  // Submit in batches if needed
  const batches = Math.ceil(unique.length / MAX_URLS_PER_BATCH);
  for (let i = 0; i < batches; i++) {
    const batch = unique.slice(i * MAX_URLS_PER_BATCH, (i + 1) * MAX_URLS_PER_BATCH);
    console.log(`[IndexNow] Submitting batch ${i + 1}/${batches}: ${batch.length} URLs...`);
    try {
      const result = await pushToIndexNow(batch);
      if (result.status >= 200 && result.status < 300) {
        console.log(`[IndexNow] Success (${result.status})`);
      } else {
        console.error(`[IndexNow] Failed (${result.status}): ${result.body}`);
        process.exit(1);
      }
    } catch (err) {
      console.error(`[IndexNow] Error: ${err.message}`);
      process.exit(1);
    }
  }
}

main();
