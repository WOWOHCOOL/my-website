// <img> dimension validator.
//
// Usage:  node scripts/validate-img-dims.js
//         node scripts/validate-img-dims.js --selftest   (synthetic samples only)
//
// Every <img> whose src is a static /image/... path must declare width/height
// that MATCH THE FILE'S REAL INTRINSIC SIZE.
//
// WHY: the width/height attributes feed the pre-load aspect-ratio placeholder.
// If their ratio differs from the real image, the browser reserves the wrong
// height and then reflows once the image decodes -> layout shift (CLS).
// Once the image is decoded the browser always uses the file's own ratio, so
// setting the attrs to the true size never changes the final rendering — it
// only makes the placeholder correct.
//
// History: this used to be broken on 1868 of 2038 img tags site-wide (309 files).
// Fixed in the "img width/height = real intrinsic size" pass; this check keeps it fixed.
//
// TWO PASSES (both required):
//   pass 1  src/**/*.njk   — reports template file:line, convenient to fix.
//   pass 2  _site/**/*.html — the rendered artifact. THIS IS THE AUTHORITY.
//
// WHY pass 2 is mandatory: pass 1 skips any src containing a Nunjucks
// expression ({{ ... }} / {% ... %}). That blind spot hid 1088 mismatched
// tags across 4 templates (trust-bar cert badges, the ES/RU 3-in-1 macro,
// the EN case-studies macro, the PL about-page macro) — every one of them
// built a src by concatenation. Only the rendered HTML sees the real path,
// so only pass 2 can check them. pass 1 is kept for its file:line hint.
//
// Not an error: an <img> with no width/height (counted as a warning) or with a
// non-/image/ src (external URL, data URI) — those are skipped by design.
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

function webpSize(b) {
  if (b.length < 30) return null;
  const t = b.toString('ascii', 12, 16);
  if (t === 'VP8X') return { w: (b.readUIntLE(24, 3) & 0xffffff) + 1, h: (b.readUIntLE(27, 3) & 0xffffff) + 1 };
  if (t === 'VP8L') { const x = b.readUInt32LE(21); return { w: (x & 0x3fff) + 1, h: ((x >> 14) & 0x3fff) + 1 }; }
  if (t === 'VP8 ') return { w: b.readUInt16LE(26) & 0x3fff, h: b.readUInt16LE(28) & 0x3fff };
  return null;
}
function pngSize(b) {
  return b.toString('ascii', 12, 16) === 'IHDR' ? { w: b.readUInt32BE(16), h: b.readUInt32BE(20) } : null;
}
function svgSize(b) {
  const s = b.toString('utf8', 0, 2000);
  const w = (s.match(/\bwidth="([\d.]+)/) || [])[1];
  const h = (s.match(/\bheight="([\d.]+)/) || [])[1];
  if (w && h) return { w: Math.round(+w), h: Math.round(+h) };
  const vb = (s.match(/viewBox="([\d.\s-]+)"/) || [])[1];
  if (vb) { const a = vb.trim().split(/\s+/).map(Number); return { w: Math.round(a[2]), h: Math.round(a[3]) }; }
  return null;
}
function sizeOfFile(abs) {
  let b;
  try { b = fs.readFileSync(abs); } catch { return null; }
  const ext = path.extname(abs).toLowerCase();
  const s = ext === '.webp' ? webpSize(b) : ext === '.png' ? pngSize(b) : ext === '.svg' ? svgSize(b) : null;
  return s && s.w && s.h ? s : null;
}

// Quoted attribute values are honoured, so a ">" INSIDE an attribute (e.g.
// alt="... >5 MHz ...") cannot truncate the tag. A naive /<img\b[^>]*>/ would
// cut such a tag short and then silently skip it as "no width/height".
const IMG_RE = /<img\b(?:[^>"']|"[^"]*"|'[^']*')*>/gi;
const attr = (t, n) => (t.match(new RegExp('\\b' + n + '="([^"]*)"')) || [])[1];

// Pure scanner: given an HTML string + a src->{w,h} lookup, return mismatches.
// Kept pure so --selftest can exercise it on synthetic input (never the repo).
function scanHtml(h, relLabel, lookup) {
  const bad = [];
  const stat = { checked: 0, noAttr: 0, dynamic: 0, unknown: 0 };
  let m;
  IMG_RE.lastIndex = 0;
  while ((m = IMG_RE.exec(h)) !== null) {
    const t = m[0];
    const src = attr(t, 'src');
    const w = attr(t, 'width'), hh = attr(t, 'height');
    if (!w || !hh) { stat.noAttr++; continue; }
    if (!src || !src.startsWith('/image/') || /[{}]/.test(src)) { stat.dynamic++; continue; }
    const d = lookup(src);
    if (!d) { stat.unknown++; continue; }
    stat.checked++;
    if (+w !== d.w || +hh !== d.h) {
      const line = h.slice(0, m.index).split('\n').length;
      bad.push({ f: relLabel + ':' + line, msg: src + ' — real ' + d.w + 'x' + d.h + ' but attr says ' + w + 'x' + hh });
    }
  }
  return { bad, stat };
}

/* ---------------- --selftest ---------------- */
// Synthetic samples ONLY. Never reads repo files, so it cannot go stale-red
// after the repo has been fixed (the classic self-test trap).
if (process.argv.includes('--selftest')) {
  const good = { '/image/a.webp': { w: 100, h: 50 } };
  const lk = (s) => good[s] || null;
  const checks = [];
  const add = (l, ok, d) => checks.push({ l, ok, d });

  const r1 = scanHtml('<img src="/image/a.webp" width="100" height="50" alt="ok">', 'S', lk);
  add('好样本 -> 0 mismatch', r1.bad.length === 0, 'got ' + r1.bad.length);
  add('好样本 -> checked=1', r1.stat.checked === 1, 'got ' + r1.stat.checked);

  const r2 = scanHtml('<img src="/image/a.webp" width="200" height="50">', 'S', lk);
  add('坏样本(宽度错) -> 恰 1 mismatch', r2.bad.length === 1, 'got ' + r2.bad.length);

  const r3 = scanHtml('<img src="/image/a.webp" width="100" height="99">', 'S', lk);
  add('坏样本(高度错) -> 恰 1 mismatch', r3.bad.length === 1, 'got ' + r3.bad.length);

  const r4 = scanHtml('<img src="/image/{{ x }}.webp" width="1" height="1">', 'S', lk);
  add('Nunjucks 表达式 src -> 归 dynamic、不误报', r4.bad.length === 0 && r4.stat.dynamic === 1, 'bad=' + r4.bad.length + ' dyn=' + r4.stat.dynamic);

  const r5 = scanHtml('<img src="/image/a.webp" alt="no dims">', 'S', lk);
  add('无 width/height -> 归 noAttr、不误报', r5.bad.length === 0 && r5.stat.noAttr === 1, 'bad=' + r5.bad.length);

  const r6 = scanHtml('<img src="https://cdn.x/a.webp" width="9" height="9">', 'S', lk);
  add('外部 URL -> 不归本检查管', r6.bad.length === 0, 'bad=' + r6.bad.length);

  const r7 = scanHtml('<img src="/image/a.webp" alt="Effizienz >95% und >5 MHz" width="200" height="50">', 'S', lk);
  add('引号感知: alt 里的 > 不截断标签（仍能抓到错尺寸）', r7.bad.length === 1, 'bad=' + r7.bad.length);
  add('引号感知反证: 朴素正则会截断', !/width=/.test('<img src="/image/a.webp" alt="a > b" width="1" height="1">'.match(/<img\b[^>]*>/g)[0]), '');

  let fail = 0;
  for (const c of checks) { if (!c.ok) fail++; console.log((c.ok ? 'PASS' : 'FAIL') + '  ' + c.l + (c.d ? '   [' + c.d + ']' : '')); }
  console.log('--- selftest ' + (checks.length - fail) + '/' + checks.length + ' ---');
  process.exit(fail ? 1 : 0);
}

/* ---------------- build lookups ---------------- */
const imgDir = path.join(ROOT, 'image');
if (!fs.existsSync(imgDir)) {
  console.error('[validate-img-dims] image/ not found');
  process.exit(1);
}

const dim = {};
for (const f of walk(imgDir)) {
  const ext = path.extname(f).toLowerCase();
  if (!['.webp', '.png', '.svg'].includes(ext)) continue;
  const rel = '/' + path.relative(ROOT, f).split(path.sep).join('/');
  const s = sizeOfFile(f);
  if (s) dim[rel] = s;
}
const lookupSrc = (src) => dim[src] || null;

/* ---------------- pass 1: templates under src/ ---------------- */
const njk = walk(path.join(ROOT, 'src')).filter((f) => f.endsWith('.njk'));
const bad1 = [];
let c1 = { checked: 0, noAttr: 0, dynamic: 0, unknown: 0 };
for (const f of njk) {
  const r = scanHtml(fs.readFileSync(f, 'utf8'), path.relative(ROOT, f).split(path.sep).join('/'), lookupSrc);
  bad1.push(...r.bad);
  c1.checked += r.stat.checked; c1.noAttr += r.stat.noAttr; c1.dynamic += r.stat.dynamic; c1.unknown += r.stat.unknown;
}

/* ---------------- pass 2: rendered pages under _site/ (AUTHORITY) ---------------- */
const siteDir = path.join(ROOT, '_site');
const bad2 = [];
let c2 = { checked: 0, noAttr: 0, dynamic: 0, unknown: 0 };
let sitePages = 0;
if (fs.existsSync(siteDir)) {
  const htmls = walk(siteDir).filter((f) => f.endsWith('.html'));
  sitePages = htmls.length;
  // _site/image is a copy of image/, but fall back to reading it directly so a
  // file that only exists in the build output is still resolvable.
  const lookupSite = (src) => dim[src] || sizeOfFile(path.join(siteDir, src.replace(/^\/+/, '').split('/').join(path.sep)));
  for (const f of htmls) {
    const r = scanHtml(fs.readFileSync(f, 'utf8'), path.relative(ROOT, f).split(path.sep).join('/'), lookupSite);
    bad2.push(...r.bad);
    c2.checked += r.stat.checked; c2.noAttr += r.stat.noAttr; c2.dynamic += r.stat.dynamic; c2.unknown += r.stat.unknown;
  }
} else {
  console.error('[validate-img-dims] _site/ not found — run after eleventy (pass 2 is the authority)');
  process.exit(1);
}

/* ---------------- report ---------------- */
console.log('--- pass 1: src/**/*.njk (template hint) ---');
console.log('scanned ' + njk.length + ' templates in src/');
console.log('img with static /image src + w/h : ' + c1.checked);
console.log('img without width/height (warn)  : ' + c1.noAttr);
console.log('img with dynamic src (skipped)   : ' + c1.dynamic);
if (c1.unknown) console.log('img with unknown image file      : ' + c1.unknown);
console.log('mismatched width/height          : ' + bad1.length);
for (const b of bad1.slice(0, 40)) console.log('   ' + b.f + '\n      ' + b.msg);
if (bad1.length > 40) console.log('   ... +' + (bad1.length - 40) + ' more');

console.log('--- pass 2: _site/**/*.html (authority) ---');
console.log('scanned ' + sitePages + ' rendered pages');
console.log('img with static /image src + w/h : ' + c2.checked);
console.log('img without width/height (warn)  : ' + c2.noAttr);
if (c2.dynamic) console.log('img with unrendered src (warn)   : ' + c2.dynamic);
if (c2.unknown) console.log('img with unknown image file      : ' + c2.unknown);
console.log('mismatched width/height          : ' + bad2.length);
for (const b of bad2.slice(0, 40)) console.log('   ' + b.f + '\n      ' + b.msg);
if (bad2.length > 40) console.log('   ... +' + (bad2.length - 40) + ' more');

if (bad1.length || bad2.length) {
  console.error('\n[validate-img-dims] FAIL — ' + bad1.length + ' template / ' + bad2.length + ' rendered <img> tag(s) whose width/height do not match the real file');
  process.exit(1);
}
console.log('[validate-img-dims] PASS');
