#!/usr/bin/env node
/**
 * validate-sprite.js — 校验 svg-sprite.js 的产物完整性
 *
 * 背景：validate-html.js 在校验前会 `replace(/<svg[\s\S]*?<\/svg>/gi,'')` 剥掉全部 SVG，
 *       因此 sprite 化的产物在整条构建链里**没有任何校验**。本脚本补这个缺口。
 *
 * 运行时机：必须在 `node scripts/svg-sprite.js` 之后。
 * 跳过条件：`_site/image/icons.svg` 不存在（dev.mjs 不跑 sprite）→ SKIP，退出码 0。
 *
 * 判定：
 *   FAIL — symbol 重复 id / symbol 缺 viewBox / <use> 引用了不存在的 symbol（图标会空白）
 *   WARN — 残留内联图标（漏替换）/ 未被引用的 symbol（sprite 死重）
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE = path.join(ROOT, '_site');
const SPRITE = path.join(SITE, 'image', 'icons.svg');

if (!fs.existsSync(SPRITE)) {
  console.log('[SKIP] validate-sprite — 无 _site/image/icons.svg（dev 构建不含 sprite）');
  process.exit(0);
}

const sprite = fs.readFileSync(SPRITE, 'utf8');
const symTags = [...sprite.matchAll(/<symbol\b[^>]*>/g)].map(m => m[0]);
const symIds = symTags.map(t => (t.match(/\bid="([^"]+)"/) || [])[1]).filter(Boolean);
const idSet = new Set(symIds);
const dupes = symIds.filter((v, i) => symIds.indexOf(v) !== i);
const noVB = symTags.filter(t => !/\bviewBox=/.test(t)).length;

function walk(d, out = []) {
  let ents;
  try { ents = fs.readdirSync(d, { withFileTypes: true }); } catch { return out; }
  for (const e of ents) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

const files = walk(SITE);
const usedIds = new Set();
const missing = new Map();
let totalRefs = 0, filesWithRefs = 0;
let leftover = 0;
const leftoverSample = [];

for (const f of files) {
  const t = fs.readFileSync(f, 'utf8');
  let n = 0;
  for (const m of t.matchAll(/<use\b[^>]*\b(?:xlink:)?href="\/image\/icons\.svg#([^"]+)"/g)) {
    n++; totalRefs++;
    const id = m[1];
    usedIds.add(id);
    if (!idSet.has(id)) {
      const rel = path.relative(SITE, f).replace(/\\/g, '/');
      if (!missing.has(id)) missing.set(id, rel);
    }
  }
  if (n) filesWithRefs++;

  // 残留内联图标：<svg class="...icon-..."> 块内没有 <use>
  for (const m of t.matchAll(/<svg\b[^>]*class="[^"]*(?:^|\s)icon-[^"]*"[^>]*>/g)) {
    const close = t.indexOf('</svg>', m.index);
    const block = close === -1 ? t.slice(m.index, m.index + 800) : t.slice(m.index, close);
    if (!/<use\b/.test(block)) {
      leftover++;
      if (leftoverSample.length < 3) {
        leftoverSample.push(path.relative(SITE, f).replace(/\\/g, '/') + ' → ' + m[0].slice(0, 90));
      }
    }
  }
}

const unused = symIds.filter(id => !usedIds.has(id));
let fail = 0;

console.log('=== validate-sprite ===');
console.log('sprite     : ' + (fs.statSync(SPRITE).size / 1024).toFixed(1) + ' KB · ' + symIds.length + ' symbols');

if (dupes.length) { fail++; console.log('[FAIL] symbol 重复 id: ' + [...new Set(dupes)].slice(0, 5).join(', ')); }
else console.log('[PASS] symbol id 唯一');

if (noVB) { fail++; console.log('[FAIL] ' + noVB + ' 个 symbol 缺 viewBox（缩放会错）'); }
else console.log('[PASS] 全部 symbol 带 viewBox');

console.log('引用       : ' + totalRefs + ' 处 / ' + filesWithRefs + ' 个页面');
if (missing.size) {
  fail++;
  console.log('[FAIL] ' + missing.size + ' 个 symbol 被引用但不存在（图标将空白）:');
  for (const [id, where] of [...missing.entries()].slice(0, 8)) console.log('        ' + id + '  ← ' + where);
} else console.log('[PASS] 全部 <use> 引用可解析');

if (leftover) {
  console.log('[WARN] ' + leftover + ' 处残留内联图标（未 sprite 化）');
  for (const s of leftoverSample) console.log('        ' + s);
} else console.log('[PASS] 无残留内联图标');

if (unused.length) console.log('[WARN] ' + unused.length + ' 个 symbol 未被引用（sprite 死重）: ' + unused.slice(0, 6).join(', '));
else console.log('[PASS] 无未引用 symbol');

if (fail) { console.log('=== VALIDATE-SPRITE FAIL ==='); process.exit(1); }
console.log('=== VALIDATE-SPRITE PASS ===');
