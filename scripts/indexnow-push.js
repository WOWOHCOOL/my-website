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
  // Sitemaps: core B2B pages (12 essential pages per language)
  const sitemaps = [
    path.join(SITE_DIR, 'sitemap.xml'),
    path.join(SITE_DIR, 'de', 'sitemap.xml'),
    path.join(SITE_DIR, 'es', 'sitemap.xml'),
    path.join(SITE_DIR, 'fr', 'sitemap.xml'),
  ];

  // RSS feeds: all blog articles across languages
  const rssFeeds = [
    path.join(SITE_DIR, 'rss.xml'),
    path.join(SITE_DIR, 'de', 'rss.xml'),
    path.join(SITE_DIR, 'es', 'rss.xml'),
    path.join(SITE_DIR, 'fr', 'rss.xml'),
  ];

  let allUrls = [];
  for (const sitemap of sitemaps) {
    if (fs.existsSync(sitemap)) {
      allUrls = allUrls.concat(extractUrlsFromXml(sitemap));
    }
  }
  for (const rss of rssFeeds) {
    if (fs.existsSync(rss)) {
      allUrls = allUrls.concat(extractUrlsFromRss(rss));
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
