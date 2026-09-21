/* 锚点语言合规量化（只读）
 *
 * 判据：内容性锚点 id → 应本土化；结构性/契约锚点 → 跨语言固定
 *
 * 分类（分母统一 = 非 EN 页的「非契约」<section> id 总数）：
 *   A) 与 EN 页 id 逐字相同              → 明确照抄 EN
 *   B) EN 无此 id，但每个词元都在 EN 词表 → 英文残留（如 #story / #market-data）
 *   C) 其余                              → 已本土化
 *
 * 用法：node scripts/audit-anchor-lang-parity.js
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '_site');
const LANGS = ['en', 'de', 'es', 'fr', 'ru', 'pl'];

// 结构性/契约锚点：跨语言固定是「对的」→ 不计入分母
const CONTRACT = new Set([
  'faq', 'author-bio', 'related-articles', 'inquiryModal', 'hero', 'about-hero',
  'trust-bar', 'contact', 'thank-you', 'hero-section',
]);

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}
// ⚠️ 必须用 `<section[^>]*\sid=`（id 可出现在标签任意位置），
//    用 `/<section id="/` 会漏掉 id 后面还有别的属性的标签。
const idsOf = (h) => [...h.matchAll(/<section[^>]*\sid="([^"]+)"/g)].map((m) => m[1]);

// ---- EN 基准 ----
const enFiles = walk(ROOT).filter((f) => {
  const rel = path.relative(ROOT, f).replace(/\\/g, '/');
  return !LANGS.filter((x) => x !== 'en').includes(rel.split('/')[0]);
});
const enIds = new Set();
for (const f of enFiles) idsOf(fs.readFileSync(f, 'utf8')).forEach((i) => enIds.add(i));
const vocab = new Set();
enIds.forEach((i) => i.split('-').forEach((w) => vocab.add(w)));

// ---- 非 EN 逐页 ----
const A = [], B = [], byLang = {};
let total = 0;
for (const l of LANGS.filter((x) => x !== 'en')) {
  byLang[l] = { total: 0, a: 0, b: 0 };
  for (const f of walk(path.join(ROOT, l))) {
    const rel = path.relative(ROOT, f).replace(/\\/g, '/');
    const html = fs.readFileSync(f, 'utf8');
    const ids = idsOf(html).filter((i) => !CONTRACT.has(i));
    for (const id of ids) {
      total++; byLang[l].total++;
      if (enIds.has(id)) { A.push({ l, rel, id }); byLang[l].a++; continue; }
      const toks = id.split('-');
      if (/^[a-z0-9-]+$/.test(id) && toks.length >= 2 && toks.every((t) => vocab.has(t))) {
        B.push({ l, rel, id }); byLang[l].b++;
      }
    }
  }
}
const pct = (n) => (total ? ((n / total) * 100).toFixed(1) : '0.0');
console.log('=== 锚点语言合规量化 ===');
console.log('非 EN 内容锚点总数（已排除契约锚点）: ' + total);
console.log('  A) 与 EN 逐字相同                    : ' + A.length + '  (' + pct(A.length) + '%)');
console.log('  B) EN 无此 id 但词元全命中 EN 词表      : ' + B.length + '  (' + pct(B.length) + '%)');
console.log('  => 英文残留合计                       : ' + (A.length + B.length) + '  (' + pct(A.length + B.length) + '%)');
console.log('  C) 已本土化                           : ' + (total - A.length - B.length) + '  (' + pct(total - A.length - B.length) + '%)');
console.log('\n按语言:');
for (const l of LANGS.filter((x) => x !== 'en')) {
  const s = byLang[l];
  console.log('  ' + l + ': 锚点 ' + String(s.total).padStart(4) + ' · 照抄 ' + String(s.a).padStart(3) + ' · 英文残留 ' + String(s.b).padStart(3) + ' → ' + ((s.a + s.b) / s.total * 100).toFixed(1) + '%');
}

const freq = (arr) => { const m = new Map(); arr.forEach((x) => m.set(x.id, (m.get(x.id) || 0) + 1)); return [...m.entries()].sort((p, q) => q[1] - p[1]); };
console.log('\nA 类被照抄最多的锚点 TOP 20:');
freq(A).slice(0, 20).forEach(([id, n]) => console.log('  ' + String(n).padStart(3) + ' × ' + id));
console.log('\nB 类出现最多的锚点 TOP 20:');
freq(B).slice(0, 20).forEach(([id, n]) => console.log('  ' + String(n).padStart(3) + ' × ' + id));

// 跨页锚点引用（决定「能否安全改名」）
const cross = new Map();
for (const f of walk(ROOT)) {
  const h = fs.readFileSync(f, 'utf8');
  const src = '/' + path.relative(ROOT, f).replace(/\\/g, '/').replace(/index\.html$/, '');
  for (const m of h.matchAll(/href="(?:https?:\/\/[^"\/]*)?(\/[^"#?]*\/)#([^"]+)"/g)) {
    const k = m[1] + '#' + m[2];
    if (!cross.has(k)) cross.set(k, new Set());
    cross.get(k).add(src);
  }
}
console.log('\n跨页锚点引用（"能不能安全改名"的依据）: ' + cross.size + ' 个');
[...cross.entries()].forEach(([k, s]) => console.log('  ' + k + '  <- ' + [...s].join(' , ')));
