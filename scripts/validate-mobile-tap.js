#!/usr/bin/env node
'use strict';
// Blocking gate: WCAG 2.5.8 AA tap targets (>= 24x24) for interactive elements.
//
// WHY (2026-10-02): audit-mobile.js is report-only and uses a fixed sample, so
// small tap targets (ToC links, footer links, CTA buttons) regressed unnoticed.
// This gate FAILS on AA violations; AAA (24-44px) stays a warning.
//
// Usage:
//   node scripts/validate-mobile-tap.js          # representative page per lang x section
//   node scripts/validate-mobile-tap.js --all    # every built page (slower)
const http = require('http'), fs = require('fs'), path = require('path');
let chromium;
try { ({ chromium } = require('playwright')); }
catch { ({ chromium } = require(process.env.PLAYWRIGHT_PATH || 'C:/Users/wowoh/.agents/skills/claude-design-card/node_modules/playwright')); }

const ROOT = path.join(__dirname, '..'), SITE = path.join(ROOT, '_site');
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const MIME = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.webp':'image/webp',
  '.png':'image/png', '.jpg':'image/jpeg', '.svg':'image/svg+xml', '.woff2':'font/woff2',
  '.json':'application/json', '.txt':'text/plain', '.ico':'image/x-icon', '.xml':'application/xml' };
const VPS = [320, 430];

function serve() {
  return new Promise(res => {
    const s = http.createServer((req, r) => {
      let p = decodeURIComponent(req.url.split('?')[0]);
      if (p.endsWith('/')) p += 'index.html';
      const fp = path.join(SITE, p);
      if (!fp.startsWith(SITE) || !fs.existsSync(fp) || fs.statSync(fp).isDirectory()) { r.writeHead(404); r.end('nf'); return; }
      r.writeHead(200, { 'content-type': MIME[path.extname(fp)] || 'application/octet-stream' });
      fs.createReadStream(fp).pipe(r);
    });
    s.listen(0, () => res(s));
  });
}

function allUrls() {
  const out = [];
  (function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name === 'index.html') out.push('/' + path.relative(SITE, p).split(path.sep).join('/'));
    }
  })(SITE);
  return out.sort();
}

function representative(urls) {
  const out = [], seen = new Set();
  for (const u of urls) {
    const parts = u.replace(/^\//, '').replace(/\/index\.html$/, '').split('/').filter(Boolean);
    let lang = 'en';
    if (parts.length && ['de', 'es', 'fr', 'pl', 'ru'].includes(parts[0])) { lang = parts[0]; parts.shift(); }
    const section = parts.length === 0 ? '(home)' : parts[0];
    let key = lang + ':' + section;
    if (section === 'blog' && parts.length > 1) key = lang + ':blog-article';
    if (seen.has(key)) continue;
    seen.add(key); out.push(u);
  }
  return out;
}

(async () => {
  if (!fs.existsSync(SITE)) {
    console.error('[validate-mobile-tap] FAIL — _site missing; run the build first');
    process.exit(1);
  }
  const all = allUrls();
  const pages = process.argv.includes('--all') ? all : representative(all);
  const server = await serve();
  const base = 'http://127.0.0.1:' + server.address().port;
  const browser = await chromium.launch({ executablePath: EDGE, headless: true });
  let aa = 0, aaa = 0;
  const failed = [];
  for (const url of pages) {
    for (const w of VPS) {
      const page = await browser.newPage({ viewport: { width: w, height: 844 } });
      await page.goto(base + url, { waitUntil: 'load' });
      const r = await page.evaluate(() => {
        const small = []; let warn = 0;
        for (const el of document.querySelectorAll('a,button,input,select,textarea,[role=button]')) {
          const b = el.getBoundingClientRect();
          if (b.width === 0 || b.height === 0) continue;
          const cs = getComputedStyle(el);
          if (cs.visibility === 'hidden' || cs.display === 'none') continue;
          if (el.tagName === 'INPUT' && /^(checkbox|radio)$/.test(el.type)) continue;
          // WCAG 2.5.8 inline exception: <a> inside a sentence. Flex/grid parents
          // blockify the anchor (display:block), which used to defeat the check.
          const isInlineTextAnchor = (a) => {
            if (a.tagName !== 'A') return false;
            const cls = (a.className || '').toString();
            if (/\b(inline-flex|flex|block|inline-block|btn|card|w-\d|h-\d|px-|py-)\b/.test(cls)) return false;
            const p = a.parentElement;
            if (!p) return false;
            for (const n of p.childNodes) if (n.nodeType === 3 && n.textContent.trim().length) return true;
            return false;
          };
          const min = Math.min(b.width, b.height);
          if (min < 24) {
            if (el.tagName === 'A' && (cs.display === 'inline' || isInlineTextAnchor(el))) continue; // inline-text exception
            small.push(el.tagName.toLowerCase() + ' ' + Math.round(b.width) + 'x' + Math.round(b.height) +
                       ' "' + (el.getAttribute('aria-label') || el.textContent || '').trim().slice(0, 30) + '"');
          } else if (min < 44) warn++;
        }
        return { small, warn };
      });
      if (r.small.length) { aa += r.small.length; failed.push({ url, w, small: r.small }); }
      aaa += r.warn;
      await page.close();
    }
  }
  await browser.close(); server.close();
  console.log('[validate-mobile-tap] pages=' + pages.length + ' viewports=' + VPS.join(',') +
              ' AA-failures=' + aa + ' AAA-warnings=' + aaa + (process.argv.includes('--all') ? ' (ALL)' : ''));
  if (failed.length) {
    console.error('[validate-mobile-tap] FAIL — non-inline targets below 24x24 (WCAG 2.5.8 AA):');
    for (const f of failed.slice(0, 100)) console.error('   ' + f.w + 'px ' + f.url + '  [' + f.small.slice(0, 4).join(' | ') + ']');
    if (failed.length > 100) console.error('   ... +' + (failed.length - 100) + ' more');
    process.exit(1);
  }
  console.log('[validate-mobile-tap] PASS');
})().catch(e => { console.error('ERR', e); process.exit(1); });
