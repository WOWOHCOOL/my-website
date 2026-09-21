// og:image declaration validator.
//
// Usage:  node scripts/validate-og.js
//
// Every built page must declare og:image:width / og:image:height / og:image:type
// that MATCH THE REAL FILE behind og:image.
//
// WHY: social platforms (Facebook, LinkedIn, Slack, WhatsApp, Discord, iMessage)
// read og:image:width/height BEFORE downloading the image to reserve the card's
// aspect-ratio box. If the declared numbers differ from the real pixels, the card
// is laid out at the wrong ratio and the image ends up cropped or letterboxed.
// This is the exact same hard rule as <img width/height> (see
// scripts/validate-img-dims.js) — only the consumer differs.
//
// History: layout.njk used to hard-code `ogImageWidth or "1200"` / `ogImageHeight or "630"`,
// and no page ever set those frontmatter keys — so ALL 350 pages declared 1200x630 while the
// real files were 1700x956 / 1200x801 / 800x800 / … (measured 2026-09-20: 0/350 correct).
// Fixed by the `imgMeta` filter in .eleventy.js, which reads the real file at build time.
// This check keeps it fixed.
//
// Also catches: og:image pointing at a file that does not exist (which makes the filter
// return null and the three meta tags silently disappear from the page).
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE = path.join(ROOT, '_site');
const HOST = /^https?:\/\/[^/]+/i;

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

// --- intrinsic size / MIME readers (no third-party deps) ---
const cache = new Map();
function meta(abs) {
  if (cache.has(abs)) return cache.get(abs);
  let out = null;
  try {
    if (fs.existsSync(abs)) {
      const b = fs.readFileSync(abs);
      let w = null, h = null, type = null;
      if (b.length > 24 && b.toString('hex', 0, 8) === '89504e470d0a1a0a') {
        w = b.readUInt32BE(16); h = b.readUInt32BE(20); type = 'image/png';
      } else if (b[0] === 0xff && b[1] === 0xd8) {
        type = 'image/jpeg';
        let i = 2;
        while (i < b.length - 9) {
          if (b[i] !== 0xff) { i++; continue; }
          const mk = b[i + 1];
          if (mk >= 0xc0 && mk <= 0xcf && mk !== 0xc4 && mk !== 0xc8 && mk !== 0xcc) {
            h = b.readUInt16BE(i + 5); w = b.readUInt16BE(i + 7); break;
          }
          i += 2 + b.readUInt16BE(i + 2);
        }
      } else if (b.length > 30 && b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP') {
        type = 'image/webp';
        const t = b.toString('ascii', 12, 16);
        if (t === 'VP8X') { w = (b.readUIntLE(24, 3) & 0xffffff) + 1; h = (b.readUIntLE(27, 3) & 0xffffff) + 1; }
        else if (t === 'VP8L') { const x = b.readUInt32LE(21); w = (x & 0x3fff) + 1; h = ((x >> 14) & 0x3fff) + 1; }
        else if (t === 'VP8 ') { w = b.readUInt16LE(26) & 0x3fff; h = b.readUInt16LE(28) & 0x3fff; }
      } else if (b.toString('utf8', 0, 400).includes('<svg')) {
        type = 'image/svg+xml';
        const s = b.toString('utf8');
        const wm = s.match(/\bwidth\s*=\s*["']?([\d.]+)/i);
        const hm = s.match(/\bheight\s*=\s*["']?([\d.]+)/i);
        const vm = s.match(/\bviewBox\s*=\s*["']\s*[-\d.]+\s+[-\d.]+\s+([\d.]+)\s+([\d.]+)/i);
        if (wm && hm) { w = Math.round(+wm[1]); h = Math.round(+hm[1]); }
        else if (vm) { w = Math.round(+vm[1]); h = Math.round(+vm[2]); }
      }
      if (w && h && type) out = { w, h, type };
    }
  } catch (e) { out = null; }
  cache.set(abs, out);
  return out;
}

const META_RE = /<meta\b(?:[^>"']|"[^"]*"|'[^']*')*>/gi;
function attr(tag, n) {
  const m = tag.match(new RegExp('\\b' + n + '\\s*=\\s*("([^"]*)"|\'([^\']*)\'|([^\\s>]+))', 'i'));
  return m ? (m[2] !== undefined ? m[2] : m[3] !== undefined ? m[3] : m[4]) : null;
}

const pages = fs.existsSync(SITE) ? walk(SITE).sort() : [];
if (!pages.length) {
  console.error('[validate-og] FAIL — no built pages under _site/ (run the build first)');
  process.exit(1);
}

const bad = { noImage: [], missingFile: [], unreadable: [], missingTags: [], wrongWH: [], wrongType: [] };
// 二次确认队列：见文件末尾的「transient FS」说明
const suspects = [];
let checked = 0;

for (const f of pages) {
  const html = fs.readFileSync(f, 'utf8');
  const rel = path.relative(ROOT, f).split(path.sep).join('/');
  const props = {};
  META_RE.lastIndex = 0;
  let t;
  while ((t = META_RE.exec(html))) {
    const p = (attr(t[0], 'property') || attr(t[0], 'name') || '').toLowerCase();
    if (p.startsWith('og:image')) props[p] = attr(t[0], 'content');
  }
  const img = props['og:image'];
  if (!img) { bad.noImage.push(rel); continue; }
  const local = img.replace(HOST, '').split('#')[0].split('?')[0];
  const abs = path.join(SITE, local.replace(/^\/+/, ''));
  const d = meta(abs);
  if (!d) {
    // 不当场定性：先记入 suspects，等全部扫完再统一复查一次
    suspects.push({ rel, local, abs });
    continue;
  }

  const dw = props['og:image:width'], dh = props['og:image:height'], dt = props['og:image:type'];
  if (!dw || !dh || !dt) {
    bad.missingTags.push(rel + '  ' + local + '  (w=' + dw + ' h=' + dh + ' type=' + dt + ')');
    continue;
  }
  checked++;
  if (String(d.w) !== String(dw) || String(d.h) !== String(dh)) {
    bad.wrongWH.push(rel + '  ' + local + ' — real ' + d.w + 'x' + d.h + ' but declared ' + dw + 'x' + dh);
  }
  if (dt !== d.type) bad.wrongType.push(rel + '  ' + local + ' — real ' + d.type + ' but declared ' + dt);
}

// ---- transient FS 二次确认 ----
// Windows 上 `fs.existsSync()` / `fs.statSync()` 在**任何** stat 错误时都返回 false，
// 而刚被大量重写过的 _site（例如紧接 eleventy / svg-sprite 之后）会偶发地瞬时报 ENOENT。
// 实测：2026-09-20 本校验器曾两次把 62 / 68 个**确实存在**的 og:image 报成 missing，
// 30 秒后原样重跑即全绿，且连跑 10 次无法复现。校验器不能有假阳性（会让整条构建链
// 无故红灯），所以收尾统一复查一遍 suspects，只保留复查后仍然失败的条目。
// 复查会清掉缓存重新读盘 —— 真缺失的文件复查依然失败，不会被掩盖。
for (const s of suspects) {
  cache.delete(s.abs);
  const d2 = meta(s.abs);
  if (d2) continue;                        // 瞬态，撤销
  if (fs.existsSync(s.abs)) bad.unreadable.push(s.rel + '  ' + s.local);
  else bad.missingFile.push(s.rel + '  ->  ' + s.local);
}

console.log('scanned ' + pages.length + ' built pages in _site/');
console.log('og:image with correct w/h/type  : ' + checked);
console.log('og:image missing                : ' + bad.noImage.length);
console.log('og:image target missing on disk : ' + bad.missingFile.length);
console.log('og:image target unreadable      : ' + bad.unreadable.length);
console.log('og:image w/h/type tags missing  : ' + bad.missingTags.length);
console.log('og:image:width/height mismatch  : ' + bad.wrongWH.length);
console.log('og:image:type mismatch          : ' + bad.wrongType.length);
for (const k of ['noImage', 'missingFile', 'unreadable', 'missingTags', 'wrongWH', 'wrongType']) {
  for (const x of bad[k].slice(0, 10)) console.log('   [' + k + '] ' + x);
  if (bad[k].length > 10) console.log('   [' + k + '] ... +' + (bad[k].length - 10) + ' more');
}

const total = Object.keys(bad).reduce((n, k) => n + bad[k].length, 0);
if (total) {
  console.error('\n[validate-og] FAIL — ' + total + ' page(s) with a wrong or incomplete og:image declaration');
  process.exit(1);
}
console.log('[validate-og] PASS');
