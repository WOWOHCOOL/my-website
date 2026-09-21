// Image reference existence validator.
//
// Usage:  node scripts/validate-img-exists.js
//
// Scans the BUILT output (_site/**/*.html) and asserts that every LOCAL image
// reference resolves to a file that actually exists in _site/.
//
// WHY: validate-img-dims.js only looks at <img> tags in src/ and only checks
// width/height. It never verifies that the target file exists, and it does not
// see srcset, CSS url() or <meta content="..."> at all. A reference that 404s
// is invisible to every other check in the build chain:
//   - a missing <img src> renders as a broken icon (bad UX + bad SEO)
//   - a missing og:image silently degrades every social/LLM preview card
//   - a missing CSS url() just disappears
// This validator closes that gap on the deployed artifact.
//
// Reference kinds covered: src / href / content (on <meta>) / srcset / CSS url()
// Skipped on purpose: data: URIs, http(s)://, protocol-relative //, and any
// non-image extension (this is an image check, not a link check).
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE = path.join(ROOT, '_site');

if (!fs.existsSync(SITE)) {
  console.error('[validate-img-exists] _site/ not found — run the build first');
  process.exit(1);
}

const IMG_EXT = /\.(webp|png|jpe?g|gif|avif|svg|ico|bmp)$/i;

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const pages = walk(SITE).filter((f) => f.endsWith('.html'));

// target path (relative to _site, forward slashes) -> Set of referring pages
const refs = new Map();

function record(raw, page) {
  if (raw == null) return;
  let u = String(raw).trim();
  if (!u) return;
  if (/^(data:|blob:|mailto:|tel:|javascript:)/i.test(u)) return;
  if (/^(https?:)?\/\//i.test(u)) return;                 // external / protocol-relative
  // strip query string and fragment before the extension test
  const clean = u.split('#')[0].split('?')[0];
  if (!IMG_EXT.test(clean)) return;
  let decoded;
  try { decoded = decodeURIComponent(clean); } catch { decoded = clean; }
  // Root-relative refs resolve from _site/. A relative ref resolves against the
  // referring page's own directory — resolving it from the root instead would
  // silently check the wrong file. (Site-wide all image refs are root-relative
  // today; this keeps the check honest if that ever changes.)
  const resolved = decoded.startsWith('/')
    ? decoded
    : path.posix.normalize(path.posix.dirname(page) + '/' + decoded);
  if (!refs.has(resolved)) refs.set(resolved, new Set());
  refs.get(resolved).add(page);
}

const META_RE = /<meta\b(?:[^>"']|"[^"]*"|'[^']*')*>/gi;
const SRCSET_RE = /\bsrcset\s*=\s*("([^"]*)"|'([^']*)')/gi;
const URL_RE = /url\(\s*(?:"([^"]*)"|'([^']*)'|([^'")]+))\s*\)/gi;
const ATTR_RE = /\b(?:src|href|content)\s*=\s*("([^"]*)"|'([^']*)')/gi;

for (const f of pages) {
  const h = fs.readFileSync(f, 'utf8');
  const page = '/' + path.relative(SITE, f).split(path.sep).join('/');
  let m;

  // <meta property="og:image" content="..."> — content only counts on <meta>
  META_RE.lastIndex = 0;
  while ((m = META_RE.exec(h)) !== null) {
    const t = m[0];
    const prop = (t.match(/\b(?:property|name)\s*=\s*"([^"]*)"/i) || [])[1] || '';
    if (!/image/i.test(prop)) continue;
    const c = (t.match(/\bcontent\s*=\s*"([^"]*)"/i) || [])[1];
    record(c, page);
  }

  // src / href / content (content outside <meta> is ignored via the ext filter)
  ATTR_RE.lastIndex = 0;
  while ((m = ATTR_RE.exec(h)) !== null) {
    const name = m[0].slice(0, m[0].indexOf('=')).trim().toLowerCase();
    const val = m[2] != null ? m[2] : m[3];
    if (name === 'content') {
      // content= only counts on <meta> (og:image / twitter:image). Anchor to the
      // tag that actually owns this attribute instead of looking backwards N chars.
      const lt = h.lastIndexOf('<', m.index);
      if (lt === -1 || !/^<meta\b/i.test(h.slice(lt, m.index))) continue;
    }
    record(val, page);
  }

  // srcset="a.webp 1x, b.webp 2x"
  SRCSET_RE.lastIndex = 0;
  while ((m = SRCSET_RE.exec(h)) !== null) {
    const body = m[2] != null ? m[2] : m[3];
    body.split(',').forEach((part) => record(part.trim().split(/\s+/)[0], page));
  }

  // CSS url() in <style> blocks and style="" attributes
  URL_RE.lastIndex = 0;
  while ((m = URL_RE.exec(h)) !== null) {
    record(m[1] != null ? m[1] : m[2] != null ? m[2] : m[3], page);
  }
}

const missing = [];
for (const [u, from] of refs) {
  const abs = path.join(SITE, u.replace(/^\//, ''));
  if (!fs.existsSync(abs)) missing.push([u, [...from]]);
}

console.log('scanned ' + pages.length + ' built pages in _site/');
console.log('unique local image references   : ' + refs.size);
console.log('missing targets                 : ' + missing.length);
for (const [u, from] of missing.slice(0, 40)) {
  console.log('   ' + u);
  from.slice(0, 3).forEach((p) => console.log('      <- ' + p));
  if (from.length > 3) console.log('      ... +' + (from.length - 3) + ' more page(s)');
}
if (missing.length > 40) console.log('   ... +' + (missing.length - 40) + ' more target(s)');

if (missing.length) {
  console.error('\n[validate-img-exists] FAIL — ' + missing.length + ' image reference(s) point at a file that does not exist in _site/');
  process.exit(1);
}
console.log('[validate-img-exists] PASS');
