/* blog 文章页「尾部元素外壳」归一器（默认 dry-run）
 *
 * 目标外壳（与本站 author-bio / faq / sources 既有模式一致）：
 *   CTA banner : <section class="max-w-4xl mx-auto px-6 mb-16">
 *                  <div class="relative bg-gradient-to-br from-brandBlue to-slate-800 rounded-3xl p-10 text-center overflow-hidden">
 *   related    : <aside id="related-articles" class="max-w-4xl mx-auto px-6 mb-16">
 *   sources    : <section class="max-w-4xl mx-auto px-6 mb-16">
 *
 * ⚠️ 明文零变更断言：每次变换后可见文本指纹必须完全相同，否则拒绝该文件。
 * 用法：
 *   node scripts/normalize-blog-cta.js                          # dry-run
 *   node scripts/normalize-blog-cta.js --apply
 *   node scripts/normalize-blog-cta.js --apply --only=BAN
 *   node scripts/normalize-blog-cta.js --apply --file=qi2-vs-magsafe-diferencias
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { eachTag, clsOf, idOf, findClose } = require('./lib-html-sections.js');

const SRC = path.join(__dirname, '..', 'src');
const LANGS = ['en', 'de', 'es', 'fr', 'ru', 'pl'];
const APPLY = process.argv.includes('--apply');
const ONLY = ((process.argv.find((a) => a.startsWith('--only=')) || '').split('=')[1] || '')
  .split(',').map((s) => s.trim()).filter(Boolean);
const FILE = (process.argv.find((a) => a.startsWith('--file=')) || '').split('=')[1] || '';

/* ── 可见文本指纹（明文零变更断言用） ───────────────────────── */
function fp(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/* ── 找配对闭合标签 ─────────────────────────────────────────── */
/* ⚠️ cursor 必须从 0 单调推进；若从 openIdx 起步，indexOf 会为
 *    文档靠前的标签找到「靠后的同名标签」→ 定位错位 → 改坏 HTML。 */
function findCloseTag(html, tagName, openIdx) {
  let depth = 0;
  let cursor = 0;
  for (const t of eachTag(html)) {
    const i = html.indexOf(t.raw, cursor);
    if (i < 0) continue;
    cursor = i + t.raw.length;
    if (i < openIdx) continue;
    if (t.name !== tagName) continue;
    if (t.closing) {
      depth--;
      if (depth === 0) return i;   // ⚠️ 归零即配对，不能等「下一个」闭合
    } else depth++;
  }
  return -1;
}

/* ── banner 元素定位（返回 tag / 起止） ─────────────────────── */
function findBanner(html) {
  let cursor = 0;
  for (const t of eachTag(html)) {
    const i = html.indexOf(t.raw, cursor);
    if (i < 0) continue;
    cursor = i + t.raw.length;
    if (t.closing || !/^(section|div)$/.test(t.name)) continue;
    if (/bg-gradient-to-br from-brandBlue to-slate-800/.test(clsOf(t.raw))) {
      return { tag: t.name, open: i, raw: t.raw };
    }
  }
  return null;
}

/* ── banner 之前最近的未闭合 <section>（即包裹层） ─────────── */
function enclosingSection(html, before) {
  const stack = [];
  let cursor = 0;
  for (const t of eachTag(html)) {
    const i = html.indexOf(t.raw, cursor);
    if (i < 0) continue;
    cursor = i + t.raw.length;
    if (i >= before) break;
    if (t.name !== 'section') continue;
    if (t.closing) { stack.pop(); continue; }
    stack.push({ open: i, raw: t.raw });
  }
  return stack.length ? stack[stack.length - 1] : null;
}

/* ── banner 之前所有未闭合容器元素（含 div/aside）的 class 列表 ── */
function containerStack(html, before) {
  const KEEP = /^(section|div|aside|article|main)$/;
  const stack = [];
  let cursor = 0;
  for (const t of eachTag(html)) {
    const i = html.indexOf(t.raw, cursor);
    if (i < 0) continue;
    cursor = i + t.raw.length;
    if (i >= before) break;
    if (!KEEP.test(t.name)) continue;
    if (t.closing) { stack.pop(); continue; }
    stack.push(t.raw);
  }
  return stack;
}

const normCls = (s) => s.replace(/\s+/g, ' ').trim();
const VOID_TAGS = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta',
  'param', 'source', 'track', 'wbr', 'path', 'circle', 'rect', 'line', 'polyline', 'polygon', 'use', 'stop', 'ellipse']);
const CONTAINER_CLS = 'max-w-4xl mx-auto px-6';
const hasTok = (cls, tok) => new RegExp('(?:^|\\s)' + tok + '(?:\\s|$)').test(cls);
/* ⚠️⚠️ 容器判定必须是「包含这三个 token」，不能是整串精确相等。
 *    实测反例：de/blog/autoladegeraet-ratgeber 的包裹层是
 *    div.max-w-4xl.mx-auto.px-6.my-12 —— 多一个 my-12，精确相等就漏判，
 *    于是预测 848、实际 800（author-bio 二次扣 padding）。 */
const isContainerCls = (cls) => hasTok(cls, 'max-w-4xl') && hasTok(cls, 'mx-auto') && hasTok(cls, 'px-6');

/* ── 带「祖先是否已有全局容器」上下文的标签遍历 ──────────────────
 * 站点不变量（浏览器实测）：正文灰卡 border-box = 848px。
 * 尾部块内容盒也必须 = 848px，而宽度只由两个布尔量决定：
 *   hasContainer（祖先里有 max-w-4xl + mx-auto + px-6 的容器 → 内容盒 848）
 *   hasPx6      （该块自身有 px-6 → 再扣 48）
 *   → 正确组合是 XOR：有容器就别加 px-6，没容器就必须加。 */
function* eachTagCtx(html) {
  const stack = [];
  for (const t of eachTag(html)) {
    const selfClose = /\/\s*>$/.test(t.raw);
    if (t.closing) {
      for (let i = stack.length - 1; i >= 0; i--) if (stack[i].name === t.name) { stack.length = i; break; }
      continue;
    }
    yield Object.assign({}, t, {
      hasContainer: stack.some((a) => isContainerCls(normCls(clsOf(a.raw)))),
      parent: stack.length ? stack[stack.length - 1] : null,
    });
    if (!VOID_TAGS.has(t.name) && !selfClose) stack.push(t);
  }
}

/* 尾部块的目标 class：内容盒恒为 848px */
const tailCls = (hasContainer, suffix) => hasContainer ? ('max-w-4xl mx-auto ' + suffix) : (CONTAINER_CLS + ' ' + suffix);

/* ── sources 区定位 ──────────────────────────────────────────────
 * ⚠️⚠️ 标题匹配必须严格。宽松写法 `/^sources?/i` 会把 FR 正文小节
 *    「Sourcer vos Chargeurs Sans Fil Qi2.2 25W」当成 sources 块
 *    （实测：该节无 <ul> → 误判成「sources 没有列表」）。
 *    故要求关键词后面必须是 `&` 或 and/y/et/und，或直接是 quellen/fuentes/… */
const SRC_TITLE_RE = /^(sources?\s*&|sources?\s+(and|y|et|und)\b|quellen|fuentes|источник|źródł|referenc)/i;

function findSourcesSections(html) {
  const hits = [];
  for (const t of eachTagCtx(html)) {
    if (t.name !== 'section') continue;
    const body = html.slice(t.end, t.end + 900);
    const firstH2 = body.indexOf('<h2');
    const firstSection = body.indexOf('<section');
    if (firstH2 < 0 || (firstSection >= 0 && firstSection < firstH2)) continue;
    const hm = /<h2[^>]*>([\s\S]*?)<\/h2>/.exec(body.slice(firstH2));
    if (!hm) continue;
    const txt = hm[1].replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').trim();
    if (SRC_TITLE_RE.test(txt)) hits.push(t);
  }
  return hits;
}

/* 把 [start,end) 连同所在整行的前导缩进与行尾换行一起吞掉（用于删掉整行元素）。
 * ⚠️ 不吞「前一个换行」—— 否则会把上一行的收尾标签和下一行的开头标签挤到同一行，
 *    实测产生 `<section …> <h2 …>` 与 `</ul></section>` 这种破坏「一行一元素」格式的结果。 */
function lineRange(html, start, end) {
  let s = start, e = end;
  while (s > 0 && (html[s - 1] === ' ' || html[s - 1] === '\t')) s--;
  while (e < html.length && (html[e] === ' ' || html[e] === '\t')) e++;
  if (html[e] === '\r') e++;
  if (html[e] === '\n') e++;
  return [s, e];
}

const WANT_SEC = 'max-w-4xl mx-auto px-6 mb-16';
const WANT_BANNER = 'relative bg-gradient-to-br from-brandBlue to-slate-800 rounded-3xl p-10 text-center overflow-hidden';
const BANNER_MB = 'relative bg-gradient-to-br from-brandBlue to-slate-800 rounded-3xl p-10 text-center mb-16 overflow-hidden';

const RULES = {
  /* ①b BAN 反向：包裹层是冗余的（祖先已有容器）→ 拆掉包裹层，mb-16 放回 banner
   * ⚠️ 依据：实测这类页面 banner 原本 848px、与正文卡片对齐；补包裹层会变 800px（回归） */
  BANREV: {
    name: 'BAN 反向：拆掉冗余包裹层（祖先已有 max-w-4xl mx-auto px-6）',
    apply(content) {
      const b = findBanner(content);
      if (!b) return null;
      const enc = enclosingSection(content, b.open);
      if (!enc) return null;
      if (clsOf(enc.raw).replace(/\s+/g, ' ').trim() !== WANT_SEC) return null;
      // 祖先里（不含 enc 自身）是否已有容器类
      const stack = containerStack(content, enc.open);
      const hasAncestorContainer = stack.some((r) => /max-w-4xl mx-auto px-6/.test(clsOf(r)));
      if (!hasAncestorContainer) return null;

      const closeAt = findCloseTag(content, b.tag, b.open);
      if (closeAt < 0) return null;
      const closeLen = ('</' + b.tag + '>').length;
      // enc 的配对闭合
      const encCloseAt = findCloseTag(content, 'section', enc.open);
      if (encCloseAt < 0) return null;

      const edits = [
        [b.open, b.open + b.raw.length, '<div class="' + BANNER_MB + '">'],
        [closeAt, closeAt + closeLen, '</div>'],
        [encCloseAt, encCloseAt + '</section>'.length, ''],
        [enc.open, enc.open + enc.raw.length, ''],
      ];
      let changed = false;
      for (const [s, e, r] of edits) if (content.slice(s, e) !== r) { changed = true; break; }
      if (!changed) return null;
      edits.sort((x, y) => y[0] - x[0]);
      let out = content;
      for (const [s, e, r] of edits) out = out.slice(0, s) + r + out.slice(e);
      return out;
    },
  },

  /* ①c banner 标签归位：有 <section> 包裹层 → div（语义由包裹层承载）；无包裹层 → section
   *    （h2 在 banner 内，裸放时用 section 才合理；被 section 包住时内层用 div 更精简） */
  TAG: {
    name: 'banner 标签归位（有 <section> 包裹层 → div；无 → section）',
    apply(content) {
      const b = findBanner(content);
      if (!b) return null;
      const enc = enclosingSection(content, b.open);
      const want = enc ? 'div' : 'section';
      if (b.tag === want) return null;
      const closeAt = findCloseTag(content, b.tag, b.open);
      if (closeAt < 0) return null;
      const closeLen = ('</' + b.tag + '>').length;
      const edits = [
        [b.open, b.open + b.raw.length, b.raw.replace(/^<(section|div)/, '<' + want)],
        [closeAt, closeAt + closeLen, '</' + want + '>'],
      ];
      let changed = false;
      for (const [s, e, r] of edits) if (content.slice(s, e) !== r) { changed = true; break; }
      if (!changed) return null;
      edits.sort((x, y) => y[0] - x[0]);
      let out = content;
      for (const [s, e, r] of edits) out = out.slice(0, s) + r + out.slice(e);
      return out;
    },
  },

  /* ① CTA banner 外壳归一 */
  BAN: {
    name: 'CTA banner 外壳归一（section 约束 + div 卡片，p-10 / mb-16 归位）',
    apply(content) {
      const b = findBanner(content);
      if (!b) return null;
      const closeAt = findCloseTag(content, b.tag, b.open);
      if (closeAt < 0) return null;
      const closeLen = ('</' + b.tag + '>').length;
      const enc = enclosingSection(content, b.open);
      const encIsTarget = enc && clsOf(enc.raw).replace(/\s+/g, ' ').trim() === WANT_SEC;

      // ⚠️⚠️ 祖先已带 max-w-4xl mx-auto px-6（冗余容器 div 页面）→ 绝不可补包裹层：
      //    实测会让 banner 从 848px 缩到 800px（比正文卡片窄 48px）= 视觉回归。
      //    这类页面 banner 自己扛 mb-16，且保留原标签（标签归位交给 TAG 规则）。
      const stack = containerStack(content, b.open);
      const ancHas = stack.some((r) => /max-w-4xl mx-auto px-6/.test(clsOf(r)));
      const keepBare = !enc && ancHas;
      const tag = keepBare ? b.tag : 'div';
      const bannerCls = keepBare ? BANNER_MB : WANT_BANNER;

      const edits = [
        [b.open, b.open + b.raw.length, '<' + tag + ' class="' + bannerCls + '">'],
        [closeAt, closeAt + closeLen, '</' + tag + '>'],
      ];
      if (!encIsTarget && !keepBare) {
        if (enc) {
          const encCls = clsOf(enc.raw);
          if (!/max-w-4xl mx-auto px-6/.test(encCls)) return null; // 不认识的包裹层 → 跳过
          edits.push([enc.open, enc.open + enc.raw.length,
            enc.raw.replace(/class="[^"]*"/, 'class="' + WANT_SEC + '"')]);
        } else {
          edits.push([b.open, b.open, '<section class="' + WANT_SEC + '">\n']);
          edits.push([closeAt + closeLen, closeAt + closeLen, '\n</section>']);
        }
      }

      let changed = false;
      for (const [s, e, r] of edits) if (content.slice(s, e) !== r) { changed = true; break; }
      if (!changed) return null;

      edits.sort((x, y) => y[0] - x[0]);
      let out = content;
      for (const [s, e, r] of edits) out = out.slice(0, s) + r + out.slice(e);
      return out;
    },
  },

  /* ② related-articles 外壳宽度归一
   * 实测 192/192 页 class 都是 "max-w-4xl mx-auto px-6 mb-16"，但其中 36 页
   * 祖先里已有 div.max-w-4xl.mx-auto.px-6 → 二次扣 padding → 内容盒 800px，
   * 比正文灰卡（848px）窄 48px。修法：有容器则去掉 px-6。 */
  REL: {
    name: 'related-articles 宽度归一（内容盒恒 848px）',
    apply(content) {
      for (const t of eachTagCtx(content)) {
        if (t.closing || t.name !== 'aside' || idOf(t.raw) !== 'related-articles') continue;
        const want = tailCls(t.hasContainer, 'mb-16');
        if (normCls(clsOf(t.raw)) === want) return null;
        const newRaw = t.raw.replace(/class="[^"]*"/, 'class="' + want + '"');
        return content.slice(0, t.start) + newRaw + content.slice(t.end);
      }
      return null;
    },
  },

  /* ②b author-bio 宽度归一（保留原有 margin 档位，只修宽度）
   * 实测：153 页「无容器 + px-6」=848 ✓；34 页「有容器 + px-6」=800 ✗。 */
  BIOW: {
    name: 'author-bio 宽度归一（内容盒恒 848px，margin 档位不动）',
    apply(content) {
      for (const t of eachTagCtx(content)) {
        if (t.closing || idOf(t.raw) !== 'author-bio') continue;
        const cls = normCls(clsOf(t.raw));
        if (!/max-w-4xl/.test(cls)) return null; // 不认识的写法 → 跳过
        const margin = (cls.match(/(?:^|\s)(m[btxy]-\d+)(?:\s|$)/) || [])[1] || '';
        const want = tailCls(t.hasContainer, margin).trim();
        if (cls === want) return null;
        const newRaw = t.raw.replace(/class="[^"]*"/, 'class="' + want + '"');
        return content.slice(0, t.start) + newRaw + content.slice(t.end);
      }
      return null;
    },
  },

  /* ③ sources 区外壳归一
   *
   * 目标：内容盒恒为 848px（= 正文灰卡宽度，浏览器实测）
   *   <section class="max-w-4xl mx-auto [px-6 ]mb-16">      ← 有无 px-6 取决于祖先有没有容器
   *     <h2 …>Sources & References</h2>
   *     <ul class="text-sm text-slate-600 space-y-2 list-disc pl-5">
   *
   * 历史偏差（源文件侧实测 192 页）：
   *   19 页 section 类不对 → 内容盒 800 / 896px
   *        10 页 <section class="max-w-4xl mx-auto px-6 mb-16"> 但祖先已有容器 → 800（二次扣 padding）
   *         5 页 <section class="mb-16">            无容器无 px-6 → 896
   *         4 页 <section class="py-10 bg-white"> 或 "py-4 bg-white" + 内层冗余 div → 800/896
   *   20 页 <ul> 类不对
   *        14 页缺 list-disc pl-5 → 计算样式 listStyleType=none、padding-left=0
   *           → 项目符号整段消失（Tailwind preflight 把 ul 归零，必须显式 list-disc pl-5）
   *         6 页用 space-y-1（行距比主流紧）
   *
   * ⚠️ 内层冗余 div 在「无 px-6 的 section」里是 800px 的来源；删掉它并给 section 补 px-6
   *    才能回到 848。删它同时消除无意义嵌套。
   */
  SRC: {
    name: 'sources 区归一（内容盒 848px + ul 补 list-disc pl-5 / space-y-2）',
    apply(content) {
      const hits = findSourcesSections(content);
      if (hits.length !== 1) return null; // 0 个或 >1 个 → 不猜，跳过
      const s = hits[0];
      const close = findClose(content, s.start, 'section');
      if (!close) return null;

      const edits = [];
      const push = (a, b, r) => { if (content.slice(a, b) !== r) edits.push([a, b, r]); };

      // (1) section 开标签 —— 目标 class 由「祖先有没有容器」决定（XOR）
      push(s.start, s.end, '<section class="' + tailCls(s.hasContainer, 'mb-16') + '">');

      // (2) 冗余内层 div —— 必须是 section 的直接子级（开标签后只隔空白）
      const DIV_OPEN = '<div class="max-w-4xl mx-auto px-6">';
      const di = content.indexOf(DIV_OPEN, s.end);
      if (di >= 0 && di < close.start && content.slice(s.end, di).trim() === '') {
        const dc = findClose(content, di, 'div');
        if (dc && dc.end <= close.start) {
          const [a1, b1] = lineRange(content, di, di + DIV_OPEN.length);
          const [a2, b2] = lineRange(content, dc.start, dc.end);
          if (a2 >= b1) { push(a2, b2, ''); push(a1, b1, ''); }
        }
      }

      // (3) ul 类（space-y-N → space-y-2，补 list-disc pl-5）
      const ulRe = /<ul class="text-sm text-slate-600 space-y-\d+(?: list-disc pl-5)?">/g;
      ulRe.lastIndex = s.start;
      const um = ulRe.exec(content);
      if (!um || um.index > close.start) return null; // 找不到列表 → 整块跳过，不做半吊子改动
      push(um.index, um.index + um[0].length, '<ul class="text-sm text-slate-600 space-y-2 list-disc pl-5">');

      // (4) C 类：整块在容器 div 之外 → 搬进容器
      const parentIsContainer = s.parent && /max-w-4xl mx-auto px-6/.test(clsOf(s.parent.raw));
      if (!edits.length) return null;
      if (process.env.SRC_DEBUG) {
        console.log('  [SRC_DEBUG] s.start=' + s.start + ' close.end=' + close.end
          + ' hasContainer=' + s.hasContainer + ' secCls=' + JSON.stringify(normCls(clsOf(s.raw))));
        edits.forEach((e) => console.log('     @' + e[0] + '  ' + JSON.stringify(content.slice(e[0], e[1]).slice(0, 90)) + '  =>  ' + JSON.stringify(e[2].slice(0, 90))));
      }
      edits.sort((x, y) => y[0] - x[0]);
      let out = content;
      for (const [a, b, r] of edits) out = out.slice(0, a) + r + out.slice(b);
      return out;
    },
  },
};

const active = Object.keys(RULES).filter((k) => !ONLY.length || ONLY.includes(k));
const files = [];
for (const lang of LANGS) {
  const dir = lang === 'en' ? path.join(SRC, 'blog') : path.join(SRC, lang, 'blog');
  if (!fs.existsSync(dir)) continue;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    const p = path.join(dir, e.name, 'index.njk');
    if (fs.existsSync(p)) files.push(p);
  }
}

const tally = {};
let touched = 0;
let rejected = 0;
for (const f of files) {
  if (FILE && !f.replace(/\\/g, '/').includes(FILE)) continue;
  const orig = fs.readFileSync(f, 'utf8');
  const before = fp(orig);
  let cur = orig;
  const hit = [];
  for (const k of active) {
    const next = RULES[k].apply(cur);
    if (next && next !== cur) {
      if (fp(next) !== before) { rejected++; console.log('❌ 明文变更，拒绝: ' + f + ' [' + k + ']'); cur = null; break; }
      cur = next;
      hit.push(k);
      tally[k] = (tally[k] || 0) + 1;
    }
  }
  if (cur === null) continue;
  if (cur === orig) continue;
  touched++;
  if (APPLY) fs.writeFileSync(f, cur);
  console.log((APPLY ? '✅ ' : '·  ') + f.replace(/\\/g, '/').replace(/.*\/src\//, 'src/') + '   [' + hit.join(',') + ']');
}

console.log('\n=== 汇总 ===');
active.forEach((k) => console.log('  ' + k + '  ' + RULES[k].name + '  → ' + (tally[k] || 0) + ' 页'));
console.log('  受影响文件: ' + touched + (rejected ? '   ❌ 拒绝: ' + rejected : ''));
console.log(APPLY ? '\n（已写入）' : '\n（dry-run，未写入任何文件）');
