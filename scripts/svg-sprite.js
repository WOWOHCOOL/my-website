/**
 * Replace every inline <svg class="icon-*"> with <svg class="..."><use href="/image/icons.svg#ID"/></svg>,
 * writing one shared sprite file at _site/image/icons.svg.
 *
 * Why external sprite file (cached by browser) instead of per-page inlined sprite:
 *   per-page sprite is linear in distinct-glyphs-per-page (~27 * 580B = 15KB on home);
 *   external sprite is fetched once and served from disk forever after. With Cloudflare
 *   immutable caching the file is paid for at most once per user per year.
 *
 * Why match on (name + glyph) signature instead of name alone:
 *   47 of 167 icon names in this codebase have 2-5 different path/viewBox variants
 *   (FontAwesome solid vs regular vs older releases, plus a few misnamed glyphs).
 *   Name-keyed sprite silently rewrites minority variants. Signature-keyed sprite is
 *   pixel-identical to today.
 */
const fs = require('fs');
const path = require('path');

const SITE = 'C:/Users/wowoh/wowohcool.com/_site';
const SPRITE_PATH = 'C:/Users/wowoh/wowohcool.com/_site/image/icons.svg';
const SPRITE_URL = '/image/icons.svg';
const MARKER = '<!-- svg-sprite -->';

const SVG_RE = /<svg\b([^>]*?)>([\s\S]*?)<\/svg>/g;
const CLASS_RE = /\bclass="([^"]*)"/;
const VIEWBOX_RE = /\bviewBox="([^"]+)"/;

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

function glyphKey(openAttrs, inner) {
  const vb = VIEWBOX_RE.exec(openAttrs);
  const norm = inner.replace(/\s+/g, ' ').trim();
  return (vb ? vb[1] : '(none)') + '::' + norm;
}

// ---------- Phase 1: build global sprite catalog ----------
const variantsByName = new Map();
const pages = walk(SITE);
for (const p of pages) {
  const h = fs.readFileSync(p, 'utf8');
  SVG_RE.lastIndex = 0;
  let m;
  while ((m = SVG_RE.exec(h))) {
    const cm = CLASS_RE.exec(m[1]); if (!cm) continue;
    const nm = cm[1].match(/\bicon-([a-zA-Z][a-zA-Z0-9-]*)\b/); if (!nm) continue;
    if (!/<(path|circle|rect|polygon|polyline|ellipse|line|g)\b/i.test(m[2])) continue;
    const name = nm[1];
    const key = glyphKey(m[1], m[2]);
    if (!variantsByName.has(name)) variantsByName.set(name, new Map());
    const g = variantsByName.get(name);
    g.set(key, (g.get(key) || 0) + 1);
  }
}

const idByGlyph = new Map(); // "name::key" -> id
const symbolById = new Map();
let multi = 0;
for (const [name, g] of variantsByName) {
  const sorted = [...g.entries()].sort((a, b) => b[1] - a[1]);
  if (sorted.length > 1) multi++;
  sorted.forEach(([key], i) => {
    const id = sorted.length === 1 ? `icon-${name}` : `icon-${name}-${i + 1}`;
    idByGlyph.set(name + '::' + key, id);
    const sep = key.indexOf('::');
    const viewBox = key.slice(0, sep);
    const inner = key.slice(sep + 2);
    symbolById.set(id, { viewBox, inner });
  });
}

console.log(`icon names: ${variantsByName.size} | sprite symbols: ${symbolById.size} | multi-variant names: ${multi}`);
const multiNames = [...variantsByName].filter(([, g]) => g.size > 1).map(([n]) => n);
if (multiNames.length) console.log(`multi names detail: ${multiNames.join(', ')}`);

// 安全网：如果一个 inline SVG 都没找到，说明输入 HTML 已经被 sprite 化了，
// 直接退出，不覆盖现有 sprite 文件（否则会清空）
if (variantsByName.size === 0) {
  console.log(`\n⚠️  no inline <svg> found in HTML — input has already been sprite'd, exiting without writing.`);
  process.exit(0);
}

// ---------- Phase 2: write the sprite file ----------
fs.mkdirSync(path.dirname(SPRITE_PATH), { recursive: true });
let sprite = '<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">';
for (const [id, { viewBox, inner }] of symbolById) {
  sprite += `<symbol id="${id}"${viewBox && viewBox !== '(none)' ? ` viewBox="${viewBox}"` : ''}>${inner}</symbol>`;
}
sprite += '</svg>';
fs.writeFileSync(SPRITE_PATH, sprite);
const spriteSize = Buffer.byteLength(sprite, 'utf8');
console.log(`sprite file: ${SPRITE_PATH} (${(spriteSize / 1024).toFixed(1)} KB)`);

// ---------- Phase 3: rewrite each page ----------
let pagesChanged = 0, totalReplaced = 0, bytesBefore = 0, bytesAfter = 0;
for (const p of pages) {
  let html = fs.readFileSync(p, 'utf8');
  if (html.includes(MARKER)) continue;

  let replacedHere = 0;
  const before = html.length;

  html = html.replace(SVG_RE, (full, openAttrs, inner) => {
    const cm = CLASS_RE.exec(openAttrs); if (!cm) return full;
    const nm = cm[1].match(/\bicon-([a-zA-Z][a-zA-Z0-9-]*)\b/); if (!nm) return full;
    if (!/<(path|circle|rect|polygon|polyline|ellipse|line|g)\b/i.test(inner)) return full;
    const id = idByGlyph.get(nm[1] + '::' + glyphKey(openAttrs, inner));
    if (!id) return full;
    replacedHere++;
    let attrs = openAttrs.replace(/\s*viewBox="[^"]*"/g, '');
    return `<svg${attrs}><use href="${SPRITE_URL}#${id}"/></svg>`;
  });

  if (replacedHere === 0) continue;

  fs.writeFileSync(p, html);
  pagesChanged++;
  totalReplaced += replacedHere;
  bytesBefore += before;
  bytesAfter += html.length;
}

const kb = n => (n / 1024).toFixed(1) + ' KB';
const mb = n => (n / 1024 / 1024).toFixed(2) + ' MB';
console.log(`pages modified: ${pagesChanged} | icons replaced: ${totalReplaced}`);
console.log(`HTML: ${mb(bytesBefore)} -> ${mb(bytesAfter)}  (delta ${bytesAfter - bytesBefore >= 0 ? '+' : ''}${mb(bytesAfter - bytesBefore)})`);
console.log(`sprite file (one-time fetch, then browser-cached): ${kb(spriteSize)}`);