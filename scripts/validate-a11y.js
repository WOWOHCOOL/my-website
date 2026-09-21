// Structure / a11y / SEO validator.
//
// Usage:  node scripts/validate-a11y.js
//
// Scans the BUILT output (_site/**/*.html) for structural defects that are both
// accessibility failures and SEO problems. Every check below was written because
// the defect was actually found on this site, not speculatively:
//
//   1. h1 count            — exactly one per page. Zero or several dilutes the
//                            page's main topic signal.
//   2. heading order       — no skipped levels (h1 -> h3). Screen-reader
//                            navigation and outline extraction both rely on it.
//   3. img alt             — every <img> carries alt. A missing alt is an
//                            accessibility failure AND loses image-search text.
//                            Decorative images must say so explicitly:
//                            alt="" together with aria-hidden or role=presentation.
//   4. link accessible name — every <a> must expose a name, from text content,
//                            aria-label, title, an inner <img alt> or an inner
//                            <svg><title>. Icon-only links without any of these
//                            announce as "link" with no destination.
//                            History: 7 round social icon buttons on
//                            /de/kontakt/ and /fr/contact/ shipped without a
//                            name (the inline footer variants had one) — this
//                            check keeps that from coming back.
//
// Tags are matched with a quote-aware scanner: an attribute value may contain a
// literal ">", so /<img\b[^>]*>/ would truncate the tag and silently skip it.
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE = path.join(ROOT, '_site');

if (!fs.existsSync(SITE)) {
  console.error('[validate-a11y] _site/ not found — run the build first');
  process.exit(1);
}

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

function tags(h, name) {
  const out = [];
  const re = new RegExp('<' + name + '\\b(?:[^>"\']|"[^"]*"|\'[^\']*\')*>', 'gi');
  let m;
  while ((m = re.exec(h))) out.push({ tag: m[0], index: m.index });
  return out;
}
function attr(t, n) {
  const m = t.match(new RegExp('\\b' + n + '\\s*=\\s*("([^"]*)"|\'([^\']*)\')', 'i'));
  return m ? (m[2] !== undefined ? m[2] : m[3]) : null;
}
const hasAttr = (t, n) => new RegExp('\\b' + n + '\\b', 'i').test(t);

const pages = walk(SITE).filter((f) => f.endsWith('.html'));
const problems = { h1None: [], h1Multi: [], headingSkip: [], imgNoAlt: [], linkNoName: [] };
let imgTotal = 0, linkTotal = 0;

for (const f of pages) {
  const h = fs.readFileSync(f, 'utf8');
  const page = '/' + path.relative(SITE, f).split(path.sep).join('/');
  const bs = h.indexOf('<body');
  const body = bs === -1 ? h : h.slice(bs);

  const h1s = tags(body, 'h1').filter((t) => !/aria-hidden\s*=\s*"true"/i.test(t.tag));
  if (!h1s.length) problems.h1None.push(page);
  else if (h1s.length > 1) problems.h1Multi.push(page + '  (' + h1s.length + ' 个)');

  let prev = 0, skip = false;
  const hre = /<h([1-6])\b(?:[^>"']|"[^"]*"|'[^']*')*>/gi;
  let m;
  while ((m = hre.exec(body))) {
    const lv = +m[1];
    if (prev && lv > prev + 1) { skip = true; break; }
    prev = lv;
  }
  if (skip) problems.headingSkip.push(page);

  for (const t of tags(body, 'img')) {
    imgTotal++;
    const a = attr(t.tag, 'alt');
    const decorative = a === '' && (hasAttr(t.tag, 'aria-hidden') || /role\s*=\s*"presentation"/i.test(t.tag));
    if (a === null) problems.imgNoAlt.push(page + '  ' + String(attr(t.tag, 'src') || '').slice(0, 60));
    else if (a.trim() === '' && !decorative) problems.imgNoAlt.push(page + '  [空 alt 但未标装饰] ' + String(attr(t.tag, 'src') || '').slice(0, 50));
  }

  for (const t of tags(body, 'a')) {
    linkTotal++;
    const aria = attr(t.tag, 'aria-label');
    const title = attr(t.tag, 'title');
    if ((aria && aria.trim()) || (title && title.trim())) continue;
    const end = body.indexOf('</a>', t.index);
    const inner = end === -1 ? '' : body.slice(t.index + t.tag.length, end);
    const text = inner.replace(/<[^>]*>/g, '').replace(/&[a-z#0-9]+;/gi, ' ').trim();
    const imgAlt = (inner.match(/<img[^>]*\balt="([^"]+)"/i) || [])[1];
    const svgTitle = /<title[^>]*>[^<]+<\/title>/i.test(inner);
    if (!text && !imgAlt && !svgTitle) problems.linkNoName.push(page + '  ' + String(attr(t.tag, 'href') || '').slice(0, 60));
  }
}

console.log('scanned ' + pages.length + ' built pages in _site/');
console.log('<img> total : ' + imgTotal + '   |   <a> total : ' + linkTotal);
console.log('');
const labels = { h1None: 'pages with no h1', h1Multi: 'pages with >1 h1', headingSkip: 'heading level skipped', imgNoAlt: 'img without usable alt', linkNoName: 'link without accessible name' };
let total = 0;
for (const k of Object.keys(labels)) {
  total += problems[k].length;
  console.log('  ' + labels[k].padEnd(30) + ': ' + problems[k].length);
  problems[k].slice(0, 12).forEach((x) => console.log('      ' + x));
  if (problems[k].length > 12) console.log('      ... +' + (problems[k].length - 12) + ' more');
}

if (total) {
  console.error('\n[validate-a11y] FAIL — ' + total + ' structural problem(s)');
  process.exit(1);
}
console.log('[validate-a11y] PASS');
