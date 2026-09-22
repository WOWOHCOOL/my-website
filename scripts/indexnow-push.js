#!/usr/bin/env node
/**
 * IndexNow Push Script — pushes ALL sitemap URLs to Bing/Yandex on production builds.
 * Usage: node scripts/indexnow-push.js [--force] [--dry-run]
 *   （默认仅在 CF Pages 生产分支构建时执行；--force 本地强制推送；--dry-run 只收集不提交）
 *
 * Submits all URLs from sitemap.xml + rss.xml across all languages.
 * No caching — Bing/Yandex deduplicate on their side.
 * Key file must exist at site root: f00021fe-fa3a-4786-9e7e-9312f9201661.txt
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const dns = require('dns');

// IndexNow API resolves to both IPv6 (2603:1061:10::13) and IPv4. In network
// environments where IPv6 is unreachable (China, some Cloudflare build
// containers), Node's default IPv6-first ordering causes "read ECONNRESET".
// Force IPv4-first so the submission succeeds regardless of environment.
dns.setDefaultResultOrder('ipv4first');

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
  // ── 生产分支门控（2026-09-22）─────────────────────────────────────────────
  // CF Pages 的 build.command = "npm install && npm run build"，而 build 末尾会调用本脚本
  // ⇒ 每次构建（含 *.pages.dev 预览部署）都会执行。但预览构建**不会**改变生产 URL 的内容，
  //   全量推送等于向搜索引擎声明「不存在的变化」。
  // Cloudflare 官方注入 CF_PAGES=1 与 CF_PAGES_BRANCH=<本次部署的分支名>
  //   （官方文档给 CF_PAGES_BRANCH 的示例用途正是 "disabling debug logging on production"）。
  // ⇒ 只在生产分支推送；本地与预览默认跳过。需要立即推送用 --force。
  const onCF = process.env.CF_PAGES === '1';
  const branch = process.env.CF_PAGES_BRANCH;
  const PROD_BRANCH = process.env.INDEXNOW_PROD_BRANCH || 'main';
  const force = process.argv.includes('--force');
  const dryRun = process.argv.includes('--dry-run');
  if (!force && (!onCF || branch !== PROD_BRANCH)) {
    console.log(`[IndexNow] 跳过：onCF=${onCF} branch=${branch || '(未设置)'}` +
      ` —— 仅生产分支「${PROD_BRANCH}」推送；本地强制推送用 --force`);
    process.exit(0);
  }
  if (dryRun) console.log('[IndexNow] --dry-run：只收集 URL，不提交');

  // Sitemaps: core B2B pages per language
  const sitemaps = [
    path.join(SITE_DIR, 'sitemap.xml'),
    path.join(SITE_DIR, 'de', 'sitemap.xml'),
    path.join(SITE_DIR, 'es', 'sitemap.xml'),
    path.join(SITE_DIR, 'fr', 'sitemap.xml'),
    path.join(SITE_DIR, 'ru', 'sitemap.xml'),
    path.join(SITE_DIR, 'pl', 'sitemap.xml'),
  ];

  // RSS feeds: all blog articles across languages
  const rssFeeds = [
    path.join(SITE_DIR, 'rss.xml'),
    path.join(SITE_DIR, 'de', 'rss.xml'),
    path.join(SITE_DIR, 'es', 'rss.xml'),
    path.join(SITE_DIR, 'fr', 'rss.xml'),
    path.join(SITE_DIR, 'ru', 'rss.xml'),
    path.join(SITE_DIR, 'pl', 'rss.xml'),
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

  if (dryRun) {
    console.log(`[IndexNow] --dry-run 结束：本应提交 ${unique.length} 个 URL（未实际提交）`);
    process.exit(0);
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
