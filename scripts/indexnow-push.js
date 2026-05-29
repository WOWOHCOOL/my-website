#!/usr/bin/env node
/**
 * IndexNow Push Script — pushes changed URLs to Bing/Yandex after deploy.
 * Usage: node scripts/indexnow-push.js
 *
 * Reads sitemap.xml files, compares with last-push cache, submits new/changed URLs.
 * Key file must exist at site root: f00021fe-fa3a-4786-9e7e-9312f9201661.txt
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const SITE = 'https://www.wowohcool.com';
const KEY = 'f00021fe-fa3a-4786-9e7e-9312f9201661';
const CACHE_FILE = path.join(__dirname, '..', '.indexnow-cache.json');
const SITE_DIR = path.join(__dirname, '..', '_site');

function extractUrlsFromSitemap(sitemapPath) {
  const content = fs.readFileSync(sitemapPath, 'utf-8');
  const urls = [];
  const locRegex = /<loc>([^<]+)<\/loc>/g;
  let match;
  while ((match = locRegex.exec(content)) !== null) {
    urls.push(match[1]);
  }
  return urls;
}

function loadCache() {
  try {
    return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
  } catch {
    return { lastPush: null, urls: [] };
  }
}

function saveCache(urls) {
  fs.writeFileSync(CACHE_FILE, JSON.stringify({
    lastPush: new Date().toISOString(),
    urls
  }, null, 2));
}

function pushToIndexNow(urls) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      host: 'www.wowohcool.com',
      key: KEY,
      keyLocation: `${SITE}/${KEY}.txt`,
      urlList: urls.slice(0, 10000)
    });

    const options = {
      hostname: 'api.indexnow.org',
      port: 443,
      path: '/IndexNow',
      method: 'POST',
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
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function main() {
  const sitemaps = [
    path.join(SITE_DIR, 'sitemap.xml'),
    path.join(SITE_DIR, 'de', 'sitemap.xml'),
    path.join(SITE_DIR, 'es', 'sitemap.xml')
  ];

  let allUrls = [];
  for (const sitemap of sitemaps) {
    if (fs.existsSync(sitemap)) {
      allUrls = allUrls.concat(extractUrlsFromSitemap(sitemap));
    }
  }

  const cache = loadCache();
  const newUrls = allUrls.filter(u => !cache.urls.includes(u));

  if (newUrls.length === 0) {
    console.log(`[IndexNow] No new URLs to push (${allUrls.length} total cached)`);
    return;
  }

  console.log(`[IndexNow] Pushing ${newUrls.length} new/changed URLs...`);

  try {
    const result = await pushToIndexNow(newUrls);
    if (result.status >= 200 && result.status < 300) {
      console.log(`[IndexNow] Success (${result.status}) — ${newUrls.length} URLs submitted`);
      saveCache(allUrls);
    } else {
      console.error(`[IndexNow] Failed (${result.status}): ${result.body}`);
      process.exit(1);
    }
  } catch (err) {
    console.error(`[IndexNow] Error: ${err.message}`);
    process.exit(1);
  }
}

main();
