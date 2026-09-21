/* blog 文章页 sources 区形态审计（源文件侧，权威判据）
 *
 * 目标形（与 author-bio / related-articles 一致，宽度由 XOR 规则决定）：
 *   ul 类 = "text-sm text-slate-600 space-y-2 list-disc pl-5"（必须显式，preflight 归零）
 *   section 类 = "max-w-4xl mx-auto " + (祖先已有容器 ? "" : "px-6 ") + "mb-16"
 *     → 两种都是正确形，因为容器与 px-6 叠加会缩窄 48px（详见 MEMORY）
 *
 * 用法: node scripts/audit-blog-sources.js [--verbose]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { eachTag, clsOf } = require('./lib-html-sections.js');

const SRC = path.join(__dirname, '..', 'src');
const LANGS = ['en', 'de', 'es', 'fr', 'ru', 'pl'];
const WANT_SEC = 'max-w-4xl mx-auto px-6 mb-16';
const WANT_UL = 'text-sm text-slate-600 space-y-2 list-disc pl-5';
const VERBOSE = process.argv.includes('--verbose');

const SRC_TITLE_RE = /^(sources?\s*&|sources?\s+(and|y|et|und)\b|quellen|fuentes|источник|źródł|referenc)/i;
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta',
  'param', 'source', 'track', 'wbr', 'path', 'circle', 'rect', 'line', 'polyline', 'polygon', 'use', 'stop', 'ellipse']);

/* ⚠️ 容器判定按 token 包含（包裹层可能带额外 margin 类，如 max-w-4xl mx-auto px-6 my-12） */
const hasTok = (cls, tok) => new RegExp('(?:^|\\s)' + tok + '(?:\\s|$)').test(cls);
const isContainerCls = (cls) => hasTok(cls, 'max-w-4xl') && hasTok(cls, 'mx-auto') && hasTok(cls, 'px-6');

function findSources(html) {
  const stack = [];
  const hits = [];
  for (const t of eachTag(html)) {
    const selfClose = /\/\s*>$/.test(t.raw);
    if (t.closing) {
      for (let i = stack.length - 1; i >= 0; i--) if (stack[i].name === t.name) { stack.length = i; break; }
      continue;
    }
    if (t.name === 'section') {
      const body = html.slice(t.end, t.end + 900);
      const f2 = body.indexOf('<h2');
      const fs2 = body.indexOf('<section');
      if (f2 >= 0 && (fs2 < 0 || f2 < fs2)) {
        const hm = /<h2[^>]*>([\s\S]*?)<\/h2>/.exec(body.slice(f2));
        if (hm && SRC_TITLE_RE.test(hm[1].replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').trim())) {
          hits.push({
            open: t.start, end: t.end, raw: t.raw,
            parent: stack.length ? stack[stack.length - 1] : null,
            // ⚠️⚠️ 必须是「任意祖先」而非「直接父」：容器可以是祖父级
            //     （实例 src/blog/wireless-charging-works：容器在 3 层之上）。
            //     只看直接父会把这类正常页误判成「缺 px-6」。
            hasContainer: stack.some((a) => isContainerCls(clsOf(a.raw).replace(/\s+/g, ' ').trim())),
          });
        }
      }
    }
    if (!VOID.has(t.name) && !selfClose) stack.push(t);
  }
  return hits;
}

function findClose(html, startIdx, name) {
  let depth = 0, seen = false;
  for (const t of eachTag(html)) {
    if (t.start < startIdx) continue;
    if (t.name !== name) continue;
    if (t.closing) { if (!seen) continue; depth--; if (depth === 0) return t; }
    else { seen = true; depth++; }
  }
  return null;
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

const SHAPES = new Map();
const BAD = [];
for (const { lang, p } of files) {
  const h = fs.readFileSync(p, 'utf8');
  const hits = findSources(h);
  const rel = p.replace(/\\/g, '/').replace(/.*\/src\//, 'src/');
  if (hits.length !== 1) { SHAPES.set('HITS=' + hits.length, (SHAPES.get('HITS=' + hits.length) || 0) + 1); BAD.push({ rel, lang, why: 'sources section 数 = ' + hits.length }); continue; }
  const s = hits[0];
  const close = findClose(h, s.open, 'section');
  const body = close ? h.slice(s.open, close.end) : '';
  const secCls = clsOf(s.raw).replace(/\s+/g, ' ').trim();
  const parentCls = s.parent ? s.parent.name + '.' + clsOf(s.parent.raw).replace(/\s+/g, ' ').trim() : 'NONE';
  const ulM = /<ul class="([^"]*)"/.exec(body);
  const ulCls = ulM ? ulM[1] : '(no-ul)';
  const parentIsContainer = !!s.hasContainer;
  // ⚠️⚠️ 判据是 XOR（详见 MEMORY「尾部块宽度不变量 = 内容盒恒 848px」）：
  //     祖先已有容器 → 自身**不能**再带 px-6；无容器 → **必须**带 px-6。
  //     旧版写死 `secCls === WANT_SEC`（一律要求带 px-6）→ 把 35 页正常形态
  //     全判成「非目标形」，是 stale 判据，不是真缺陷。
  const wantSec = 'max-w-4xl mx-auto ' + (parentIsContainer ? '' : 'px-6 ') + 'mb-16';
  const ok = secCls === wantSec && ulCls === WANT_UL;
  const key = 'sec="' + secCls + '"  ul="' + ulCls + '"  parent=' + (parentIsContainer ? 'CONTAINER' : parentCls) + (ok ? '  ✅' : '  ❌want="' + wantSec + '"');
  SHAPES.set(key, (SHAPES.get(key) || 0) + 1);
  if (!ok) BAD.push({ rel, lang, why: key });
}

console.log('=== sources 区形态分布（' + files.length + ' 个 blog 文章源文件）===');
[...SHAPES.entries()].sort((a, b) => b[1] - a[1]).forEach(([k, n]) => console.log(String(n).padStart(4) + ' x ' + k));
console.log('');
console.log('=== 非目标形: ' + BAD.length + ' 页 ===');
if (VERBOSE) BAD.forEach((b) => console.log('  [' + b.lang + '] ' + b.rel + '\n        ' + b.why));
else {
  const byLang = {};
  BAD.forEach((b) => { byLang[b.lang] = (byLang[b.lang] || 0) + 1; });
  console.log('  按语言: ' + JSON.stringify(byLang));
  BAD.forEach((b) => console.log('  [' + b.lang + '] ' + b.rel));
}
