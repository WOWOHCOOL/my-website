'use strict';
// Mobile audit: real headless browser at 320/360/390/430.
// Checks: horizontal overflow (+ offenders), tap targets < 44px, floating-element overlap.
// Usage: node scripts/audit-mobile.js [--all]
const http = require('http'), fs = require('fs'), path = require('path');
let chromium;
try { ({ chromium } = require('playwright')); }
catch { ({ chromium } = require(process.env.PLAYWRIGHT_PATH || 'C:/Users/wowoh/.agents/skills/claude-design-card/node_modules/playwright')); }
const ROOT = path.join(__dirname, '..'), SITE = path.join(ROOT, '_site');
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.json': 'application/json', '.txt': 'text/plain', '.ico': 'image/x-icon', '.xml': 'application/xml' };
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
const REP = ['/index.html','/de/index.html','/products/index.html','/products/gan-charger/index.html','/products/power-bank/semi-solid-state/index.html','/blog/index.html','/blog/gan-chargers-guide/index.html','/blog/semi-solid-state-power-bank-oem/index.html','/about/index.html','/contact/index.html','/faq/index.html','/es/faq/index.html','/service/index.html','/case-studies/index.html','/privacy-policy/index.html','/ru/blog/proverka-podlinnosti-sertifikatov-eac-ce-fcc-oem/index.html'];
const VPS = [320, 360, 390, 430];
(async () => {
  const server = await serve(); const base = 'http://127.0.0.1:' + server.address().port;
  const browser = await chromium.launch({ executablePath: EDGE, headless: true });
  let findings = 0;
  for (const url of REP) {
    for (const w of VPS) {
      const page = await browser.newPage({ viewport: { width: w, height: 844 } });
      await page.goto(base + url, { waitUntil: 'load' });
      const r = await page.evaluate((vw) => {
        const out = { overflow: 0, offenders: [], smallTaps: [], floatOverlap: [] };
        out.overflow = Math.max(0, document.documentElement.scrollWidth - vw);
        if (out.overflow > 0) {
          for (const el of document.querySelectorAll('body *')) {
            const b = el.getBoundingClientRect();
            if (b.right > vw + 1 && b.width > 8) {
              let clipped = false, p = el.parentElement;
              while (p && p !== document.body) { const o = getComputedStyle(p); if (/(hidden|auto|scroll)/.test(o.overflowX)) { clipped = true; break; } p = p.parentElement; }
              if (!clipped) { out.offenders.push(el.tagName.toLowerCase() + '.' + (el.className || '').toString().slice(0, 40) + ' w=' + Math.round(b.width) + ' r=' + Math.round(b.right)); if (out.offenders.length >= 5) break; }
            }
          }
        }
        out.smallTapsAA = []; out.smallTapsWarn = 0;
        for (const el of document.querySelectorAll('a,button,input,select,textarea,[role=button]')) {
          const b = el.getBoundingClientRect(); if (b.width === 0 || b.height === 0) continue;
          const cs = getComputedStyle(el); if (cs.visibility === 'hidden' || cs.display === 'none') continue;
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
          }; // label is the target
          // WCAG 2.5.8 AA: 24x24 min (inline text links exempt). 2.5.5 AAA: 44x44.
          const min = Math.min(b.width, b.height);
          if (min < 24) {
            if (el.tagName === 'A' && (cs.display === 'inline' || isInlineTextAnchor(el))) continue; // inline-text exception
            out.smallTapsAA.push(el.tagName.toLowerCase() + ' ' + Math.round(b.width) + 'x' + Math.round(b.height) + ' "' + (el.getAttribute('aria-label') || el.textContent || '').trim().slice(0, 18) + '"');
          } else if (min < 44) out.smallTapsWarn++;
          if (out.smallTapsAA.length >= 8) break;
        }
        const sel = ['#back-to-top', '.cookie-offset', '#cookie-banner', '#mobile-menu-content'];
        const els = sel.map(s => document.querySelector(s)).filter(e => { if (!e) return false; const cs = getComputedStyle(e); return cs.display !== 'none' && cs.visibility !== 'hidden' && e.getBoundingClientRect().height > 0; });
        for (let i = 0; i < els.length; i++) for (let j = i + 1; j < els.length; j++) {
          const a = els[i].getBoundingClientRect(), b = els[j].getBoundingClientRect();
          const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left), oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
          if (ox > 4 && oy > 4) out.floatOverlap.push((els[i].id || els[i].className) + ' ∩ ' + (els[j].id || els[j].className));
        }
        return out;
      }, w);
      const issues = [];
      if (r.overflow > 0) issues.push('H-SCROLL +' + r.overflow + 'px  [' + r.offenders.join(' | ') + ']');
      if (r.smallTapsAA.length) issues.push('TAP<24(AA FAIL) ' + r.smallTapsAA.length + '  [' + r.smallTapsAA.slice(0, 4).join(' | ') + ']');
      if (r.smallTapsWarn > 0) issues.push('tap 24-44 (AAA warn x' + r.smallTapsWarn + ')');
      if (r.floatOverlap.length) issues.push('FLOAT-OVERLAP [' + r.floatOverlap.join(' | ') + ']');
      if (issues.length) { findings++; console.log('[' + w + '] ' + url + '\n    ' + issues.join('\n    ')); }
      await page.close();
    }
  }
  console.log('\n== mobile audit done: ' + findings + ' page/viewport findings ==');
  await browser.close(); server.close();
})().catch(e => { console.error('ERR', e); process.exit(1); });
