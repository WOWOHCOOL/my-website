/* blog 文章页「尾部块宽度」审计（源文件侧，解析式）
 *
 * 站点不变量（浏览器实测）：正文灰卡 border-box = 848px（内文 798px）。
 * 尾部块（author-bio / related-articles / sources）的内容盒也必须 = 848px。
 *
 * 宽度只由两个布尔量决定：
 *   hasContainer = 是否有祖先 div.max-w-4xl.mx-auto.px-6（内容盒 848）
 *   hasPx6       = 该块自身是否有 px-6（扣 48）
 *   预测内容宽 = hasContainer ? (hasPx6 ? 800 : 848) : (hasPx6 ? 848 : 896)
 *   → 正确组合 = XOR（有容器就别再加 px-6；没容器就必须加 px-6）
 *
 * 用法: node scripts/audit-blog-tail-width.js [--verbose]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { eachTag, clsOf, idOf } = require('./lib-html-sections.js');

const SRC = path.join(__dirname, '..', 'src');
const LANGS = ['en', 'de', 'es', 'fr', 'ru', 'pl'];
const VERBOSE = process.argv.includes('--verbose');
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta',
  'param', 'source', 'track', 'wbr', 'path', 'circle', 'rect', 'line', 'polyline', 'polygon', 'use', 'stop', 'ellipse']);
const SRC_TITLE_RE = /^(sources?\s*&|sources?\s+(and|y|et|und)\b|quellen|fuentes|источник|źródł|referenc)/i;

const norm = (s) => s.replace(/\s+/g, ' ').trim();
const widthOf = (hasC, hasP) => (hasC ? (hasP ? 800 : 848) : (hasP ? 848 : 896));

/* ⚠️⚠️ 容器判定必须按 token 包含，不能整串精确相等：
 *    实测包裹层可能是 div.max-w-4xl.mx-auto.px-6.my-12（多一个 margin 类），
 *    精确相等会漏判 → 预测 848、实际 800。 */
const hasTok = (cls, tok) => new RegExp('(?:^|\\s)' + tok + '(?:\\s|$)').test(cls);
const isContainerCls = (cls) => hasTok(cls, 'max-w-4xl') && hasTok(cls, 'mx-auto') && hasTok(cls, 'px-6');

/* 一次遍历：记录每个元素的开标签 + 其祖先链（仅保留 class 含 max-w-4xl 的祖先） */
function walk(html) {
  const stack = [];
  const out = [];
  for (const t of eachTag(html)) {
    const selfClose = /\/\s*>$/.test(t.raw);
    if (t.closing) {
      for (let i = stack.length - 1; i >= 0; i--) if (stack[i].name === t.name) { stack.length = i; break; }
      continue;
    }
    out.push({ tag: t, ancestors: stack.slice() });
    if (!VOID.has(t.name) && !selfClose) stack.push(t);
  }
  return out;
}

const files = [];
for (const lang of LANGS) {
  const dir = lang === 'en' ? path.join(SRC, 'blog') : path.join(SRC, lang, 'blog');
  if (!fs.existsSync(dir)) continue;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    const p = path.join(dir, e.name, 'index.njk');
    if (fs.existsSync(p)) files.push({ lang, p });
  }
}

const ROWS = [];
for (const { lang, p } of files) {
  const h = fs.readFileSync(p, 'utf8');
  const rel = p.replace(/\\/g, '/').replace(/.*\/src\//, 'src/');
  const nodes = walk(h);
  const rec = { lang, rel, bio: null, rel_: null, src: null };

  for (const n of nodes) {
    const cls = norm(clsOf(n.tag.raw));
    const id = idOf(n.tag.raw);
    const hasC = n.ancestors.some((a) => isContainerCls(norm(clsOf(a.raw))));
    const hasP = /(?:^|\s)px-6(?:\s|$)/.test(cls);
    const w = widthOf(hasC, hasP);
    if (id === 'author-bio') rec.bio = { cls, hasC, hasP, w };
    if (id === 'related-articles') rec.rel_ = { cls, hasC, hasP, w };
    if (n.tag.name === 'section' && !rec.src) {
      const body = h.slice(n.tag.end, n.tag.end + 900);
      const f2 = body.indexOf('<h2');
      const fs2 = body.indexOf('<section');
      if (f2 >= 0 && (fs2 < 0 || f2 < fs2)) {
        const hm = /<h2[^>]*>([\s\S]*?)<\/h2>/.exec(body.slice(f2));
        if (hm && SRC_TITLE_RE.test(hm[1].replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').trim())) {
          const close = (() => {
            let d = 0, seen = false;
            for (const t of eachTag(h)) {
              if (t.start < n.tag.start || t.name !== 'section') continue;
              if (t.closing) { if (!seen) continue; d--; if (d === 0) return t; }
              else { seen = true; d++; }
            }
            return null;
          })();
          const bodyFull = close ? h.slice(n.tag.start, close.end) : '';
          const ulM = /<ul class="([^"]*)"/.exec(bodyFull);
          rec.src = { cls, hasC, hasP, w, ul: ulM ? ulM[1] : '(no-ul)' };
        }
      }
    }
  }
  ROWS.push(rec);
}

const WANT_UL = 'text-sm text-slate-600 space-y-2 list-disc pl-5';
const tally = { ok: 0, bad: [] };
for (const r of ROWS) {
  const issues = [];
  if (!r.src) issues.push('sources 未找到');
  else {
    if (r.src.w !== 848) issues.push('sources 宽 ' + r.src.w + ' (cls="' + r.src.cls + '" container=' + r.src.hasC + ' px6=' + r.src.hasP + ')');
    if (r.src.ul !== WANT_UL) issues.push('sources ul="' + r.src.ul + '"');
  }
  if (r.rel_ && r.rel_.w !== 848) issues.push('related 宽 ' + r.rel_.w);
  if (r.bio && r.bio.w !== 848) issues.push('author-bio 宽 ' + r.bio.w);
  if (issues.length) tally.bad.push({ ...r, issues });
  else tally.ok++;
}

console.log('=== blog 文章页尾部块宽度审计（' + ROWS.length + ' 页）===');
console.log('  完全合规: ' + tally.ok);
console.log('  有问题:   ' + tally.bad.length);
console.log('');
const byIssue = new Map();
tally.bad.forEach((r) => r.issues.forEach((i) => { const k = i.replace(/\d+/g, 'N'); byIssue.set(k, (byIssue.get(k) || 0) + 1); }));
console.log('--- 问题类型分布 ---');
[...byIssue.entries()].sort((a, b) => b[1] - a[1]).forEach(([k, n]) => console.log(String(n).padStart(4) + ' x ' + k));
console.log('');
console.log('--- 按语言 ---');
const byLang = {};
tally.bad.forEach((r) => { byLang[r.lang] = (byLang[r.lang] || 0) + 1; });
console.log('  ' + JSON.stringify(byLang) + '   (总页数 ' + JSON.stringify(ROWS.reduce((a, r) => (a[r.lang] = (a[r.lang] || 0) + 1, a), {})) + ')');
console.log('');
if (VERBOSE) tally.bad.forEach((r) => console.log('  [' + r.lang + '] ' + r.rel + '\n        ' + r.issues.join('\n        ')));
else {
  // 只列 sources 宽度问题
  const sw = tally.bad.filter((r) => r.issues.some((i) => i.startsWith('sources 宽')));
  console.log('--- sources 宽度异常 ' + sw.length + ' 页 ---');
  sw.forEach((r) => console.log('  [' + r.lang + '] ' + r.rel + '   ' + r.issues.filter((i) => i.startsWith('sources 宽')).join('; ')));
}
