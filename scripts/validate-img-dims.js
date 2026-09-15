// <img> dimension validator.
//
// Usage:  node scripts/validate-img-dims.js
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
// Not an error: an <img> with no width/height (counted as a warning) or with a
// dynamic src (nunjucks expression) — those are skipped.
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

const imgDir = path.join(ROOT, 'image');
if (!fs.existsSync(imgDir)) {
  console.error('[validate-img-dims] image/ not found');
  process.exit(1);
}

const dim = {};
for (const f of walk(imgDir)) {
  const ext = path.extname(f).toLowerCase();
  const rel = '/' + path.relative(ROOT, f).split(path.sep).join('/');
  let b;
  try { b = fs.readFileSync(f); } catch { continue; }
  const s = ext === '.webp' ? webpSize(b) : ext === '.png' ? pngSize(b) : ext === '.svg' ? svgSize(b) : null;
  if (s && s.w && s.h) dim[rel] = s;
}

const IMG_RE = /<img\b[^>]*>/g;
const attr = (t, n) => (t.match(new RegExp('\\b' + n + '="([^"]*)"')) || [])[1];

const njk = walk(path.join(ROOT, 'src')).filter((f) => f.endsWith('.njk'));
const bad = [];
let checked = 0, noAttr = 0, dynamic = 0, unknownFile = 0;

for (const f of njk) {
  const h = fs.readFileSync(f, 'utf8');
  let m;
  IMG_RE.lastIndex = 0;
  while ((m = IMG_RE.exec(h)) !== null) {
    const t = m[0];
    const src = attr(t, 'src');
    const w = attr(t, 'width'), hh = attr(t, 'height');
    if (!w || !hh) { noAttr++; continue; }
    if (!src || !src.startsWith('/image/') || /[{}]/.test(src)) { dynamic++; continue; }
    const d = dim[src];
    if (!d) { unknownFile++; continue; }
    checked++;
    if (+w !== d.w || +hh !== d.h) {
      const line = h.slice(0, m.index).split('\n').length;
      bad.push({
        f: path.relative(ROOT, f).split(path.sep).join('/') + ':' + line,
        msg: src + ' — real ' + d.w + 'x' + d.h + ' but attr says ' + w + 'x' + hh,
      });
    }
  }
}

console.log('scanned ' + njk.length + ' templates in src/');
console.log('img with static /image src + w/h : ' + checked);
console.log('img without width/height (warn)  : ' + noAttr);
console.log('img with dynamic src (skipped)   : ' + dynamic);
if (unknownFile) console.log('img with unknown image file      : ' + unknownFile);
console.log('mismatched width/height          : ' + bad.length);
for (const b of bad.slice(0, 40)) console.log('   ' + b.f + '\n      ' + b.msg);
if (bad.length > 40) console.log('   ... +' + (bad.length - 40) + ' more');

if (bad.length) {
  console.error('\n[validate-img-dims] FAIL — ' + bad.length + ' <img> tag(s) whose width/height do not match the real file');
  process.exit(1);
}
console.log('[validate-img-dims] PASS');
