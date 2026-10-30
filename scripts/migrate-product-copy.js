#!/usr/bin/env node
/**
 * 从迁移前产品页恢复型号卡的本地化标题、描述、角标、features/chips 与图片 alt，
 * 写回 src/_products/*.json。
 *
 * 背景：
 *   2026-10-29 型号卡迁移到 productModels 单一数据源后，模板虽然支持 description，
 *   但 JSON 里没有 description 字段，且很多非英语 name 仍是 EN。历史 HEAD 页面中
 *   这些文案本来已经按语言本地化，因此这里只做“存量迁移”，不新写事实、不翻译。
 *
 * 用法：
 *   node scripts/migrate-product-copy.js          # dry-run，只报告
 *   node scripts/migrate-product-copy.js --apply  # 写回 JSON
 *   node scripts/migrate-product-copy.js --only=wireless-charger__3-in-1-station --apply
 */
'use strict';

const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const ROOT = path.join(__dirname, '..');
const APPLY = process.argv.includes('--apply');
const ONLY = (process.argv.find((a) => a.startsWith('--only=')) || '').split('=')[1] || '';
const LANGS = ['en', 'de', 'es', 'fr', 'ru', 'pl'];

function readJson(p) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, p), 'utf8'));
}

function decodeEntities(s) {
  return String(s || '')
    .replace(/&plusmn;/g, '±')
    .replace(/&asymp;/g, '≈')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&rarr;/g, '→')
    .replace(/&times;/g, '×')
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
}

function clean(s) {
  return decodeEntities(String(s || '').replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
}

function basename(src) {
  return path.basename(String(src || '').replace(/[?#].*$/, ''));
}

function unquote(s) {
  const v = String(s || '').trim();
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) return v.slice(1, -1);
  return v;
}

function findMatchingParen(src, openIndex) {
  let depth = 0;
  let quote = null;
  let esc = false;
  for (let i = openIndex; i < src.length; i++) {
    const ch = src[i];
    if (quote) {
      if (esc) esc = false;
      else if (ch === '\\') esc = true;
      else if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'") { quote = ch; continue; }
    if (ch === '(') depth++;
    else if (ch === ')') {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function splitTopLevelArgs(src) {
  const parts = [];
  let start = 0;
  let depth = 0;
  let quote = null;
  let esc = false;
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (quote) {
      if (esc) esc = false;
      else if (ch === '\\') esc = true;
      else if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'") { quote = ch; continue; }
    if (ch === '(' || ch === '[' || ch === '{') depth++;
    else if (ch === ')' || ch === ']' || ch === '}') depth--;
    else if (ch === ',' && depth === 0) {
      parts.push(src.slice(start, i).trim());
      start = i + 1;
    }
  }
  parts.push(src.slice(start).trim());
  return parts;
}

function extractLiteralCards(src) {
  const byId = {};
  const byImage = {};
  const re = /<div\b(?=[^>]*\bid="([^"]+)")[^>]*>/gi;
  const matches = [];
  let m;
  while ((m = re.exec(src))) {
    if (!/\bgroup reveal\b/.test(m[0])) continue;
    const id = m[1];
    if (!id || id.includes('{{')) continue;
    matches.push({ id: id.toLowerCase(), index: m.index });
  }
  matches.forEach((hit, i) => {
    const end = i + 1 < matches.length ? matches[i + 1].index : src.length;
    const chunk = src.slice(hit.index, end);
    const h3 = chunk.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i);
    const desc = chunk.match(/<p\b[^>]*class="[^"]*italic leading-relaxed[^"]*"[^>]*>([\s\S]*?)<\/p>/i);
    const imgTag = (chunk.match(/<img\b[^>]*>/i) || [])[0] || '';
    const img = (imgTag.match(/\bsrc="([^"]+)"/i) || [])[1] || '';
    const alt = (imgTag.match(/\balt="([^"]*)"/i) || [])[1] || '';
    const badgeBlock = (chunk.match(/<div class="absolute top-[^"]*"[^>]*>([\s\S]*?)<\/div>/i) || [])[1] || '';
    const badges = [...badgeBlock.matchAll(/<span\b[^>]*>([\s\S]*?)<\/span>/gi)]
      .map((x) => clean(x[1]))
      .filter(Boolean);
    if (!badges.length && badgeBlock) {
      const direct = clean(badgeBlock);
      if (direct) badges.push(direct);
    }
    const chips = [];
    const chipRe = /<span class="text-badge font-bold text-slate-500 uppercase">([\s\S]*?)<\/span>/gi;
    let chip;
    while ((chip = chipRe.exec(chunk))) {
      const text = clean(chip[1]);
      if (text) chips.push(text);
    }
    const card = {
      name: clean(h3 && h3[1]),
      desc: clean(desc && desc[1]),
      img,
      alt: clean(alt),
      badges,
      chips,
    };
    byId[hit.id] = card;
    if (card.img && !byImage[basename(card.img)]) byImage[basename(card.img)] = card;
  });
  return { byId, byImage };
}

function parseQuotedArray(raw) {
  const src = String(raw || '').trim();
  if (!src.startsWith('[') || !src.endsWith(']')) return [];
  try {
    const parsed = JSON.parse(src);
    return Array.isArray(parsed) ? parsed.map((x) => clean(x)).filter(Boolean) : [];
  } catch (_) {
    const out = [];
    const re = /"((?:\\.|[^"\\])*)"|'((?:\\.|[^'\\])*)'/g;
    let m;
    while ((m = re.exec(src))) out.push(clean((m[1] || m[2] || '').replace(/\\"/g, '"').replace(/\\'/g, "'")));
    return out;
  }
}

function extractMacroCards(src) {
  const byId = {};
  const byImage = {};
  const re = /\{\{-?\s*card3in1\s*\(/g;
  let m;
  while ((m = re.exec(src))) {
    const open = src.indexOf('(', m.index);
    const close = findMatchingParen(src, open);
    if (close < 0) continue;
    const args = splitTopLevelArgs(src.slice(open + 1, close));
    const sku = unquote(args[0]).toLowerCase();
    if (!sku) continue;
    const title = clean(unquote(args[4]));
    const card = {
      name: title,
      desc: clean(unquote(args[5])),
      img: unquote(args[1]),
      alt: title,
      badges: clean(unquote(args[2])) ? [clean(unquote(args[2]))] : [],
      chips: parseQuotedArray(args[6]),
    };
    byId[sku] = card;
    if (card.img && !byImage[basename(card.img)]) byImage[basename(card.img)] = card;
    re.lastIndex = close + 1;
  }
  return { byId, byImage };
}

function mergeCards(a, b) {
  return {
    byId: Object.assign({}, a.byId, b.byId),
    byImage: Object.assign({}, a.byImage, b.byImage),
  };
}

function familyPageMap() {
  const tax = readJson('src/_taxonomy/taxonomy.json');
  const map = {};
  for (const c of tax.categories) {
    for (const fam of c.families) {
      const family = c.key === fam.key ? `products/${c.key}` : `products/${c.key}/${fam.key}`;
      map[family] = {};
      for (const lang of LANGS) {
        map[family][lang] = 'src/' + fam.lang[lang].href.replace(/^\//, '') + 'index.njk';
      }
    }
  }
  return map;
}

const pageSourceCache = new Map();

function loadCardSource(file) {
  if (!pageSourceCache.has(file)) {
    const src = cp.execFileSync('git', ['show', 'HEAD:' + file], { encoding: 'utf8' });
    pageSourceCache.set(file, mergeCards(extractLiteralCards(src), extractMacroCards(src)));
  }
  return pageSourceCache.get(file);
}

function main() {
  const pageMap = familyPageMap();
  const files = fs.readdirSync(path.join(ROOT, 'src/_products')).filter((f) => f.endsWith('.json')).sort();
  const selectedFiles = ONLY ? files.filter((f) => f === ONLY || f.startsWith(ONLY)) : files;
  const missing = [];
  const updates = [];
  let cards = 0;
  let descFilled = 0;
  let namesLocalized = 0;
  let badgesFilled = 0;
  let chipsFilled = 0;
  let altFilled = 0;
  let filesChanged = 0;

  for (const file of selectedFiles) {
    const abs = path.join(ROOT, 'src/_products', file);
    const doc = JSON.parse(fs.readFileSync(abs, 'utf8'));
    const pages = pageMap[doc.family];
    if (!pages) {
      missing.push(`${doc.family}: page map missing`);
      continue;
    }
    let changed = false;

    for (const group of doc.groups || []) {
      for (const model of group.models || []) {
        cards++;
        for (const lang of LANGS) {
          const card = model.anchor || String(model.sku || '').toLowerCase();
          const source = loadCardSource(pages[lang]);
          const hit = source.byId[card.toLowerCase()] || source.byImage[basename(model.img && model.img.src)];
          if (!hit || !hit.desc) {
            missing.push(`${doc.family}:${lang}:${model.sku}`);
            continue;
          }
          model.locales = model.locales || {};
          model.locales[lang] = model.locales[lang] || {};
          const loc = model.locales[lang];
          if (hit.name && !loc.name) {
            loc.name = hit.name;
            namesLocalized++;
            changed = true;
          }
          if (hit.desc && !loc.description) {
            loc.description = hit.desc;
            descFilled++;
            changed = true;
          }
          if (hit.badges && hit.badges.length && JSON.stringify(loc.badges || []) !== JSON.stringify(hit.badges)) {
            loc.badges = hit.badges;
            badgesFilled++;
            changed = true;
          }
          if (hit.chips && hit.chips.length && JSON.stringify(loc.chips || []) !== JSON.stringify(hit.chips)) {
            loc.chips = hit.chips;
            chipsFilled++;
            changed = true;
          }
          if (hit.alt && loc.imgAlt !== hit.alt) {
            loc.imgAlt = hit.alt;
            altFilled++;
            changed = true;
          }
        }
      }
    }

    if (changed) {
      filesChanged++;
      updates.push(file);
      if (APPLY) fs.writeFileSync(abs, JSON.stringify(doc, null, 2) + '\n', 'utf8');
    }
  }

  console.log(`${APPLY ? 'APPLIED' : 'DRY-RUN'} product card copy migration`);
  console.log(`files=${selectedFiles.length} cards=${cards} filesChanged=${filesChanged} nameLocalized=${namesLocalized} descriptions=${descFilled} badges=${badgesFilled} chips=${chipsFilled} alts=${altFilled}`);
  if (updates.length) console.log('changed files: ' + updates.join(', '));
  if (missing.length) {
    console.error(`missing=${missing.length}`);
    for (const item of missing.slice(0, 120)) console.error('  ' + item);
    if (missing.length > 120) console.error(`  ... +${missing.length - 120} more`);
    process.exitCode = 1;
  }
}

main();