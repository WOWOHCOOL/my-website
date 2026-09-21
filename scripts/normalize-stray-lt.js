/* 归一化「文本里的游离 `<`」→ `&lt;`
 *
 * ── 为什么必须做 ────────────────────────────────────────────────
 * 正文里写的是数学比较符，例如 `<0.5%` `<20mΩ` `< 300 Cycles` `<=30%`。
 * HTML5 解析器会把它当「parse error」后按文本输出（浏览器能恢复），
 * 但它是**非合规 HTML**：W3C/nu validator 会报 `Text run contains '<'`，
 * 且一旦后面跟的是字母（例如误写成 `<strong`），会**真的变成标签**。
 *
 * ── 为什么安全（明文零变更）─────────────────────────────────────
 * `&lt;` 与裸 `<` 在 HTML 里渲染出的**文本节点完全相同**（都是 `<`）。
 * 所以可见文本、`alt` 值、屏幕阅读器朗读内容、搜索引擎抓到的文本
 * 全部逐字节不变 —— 变的只有源码字符。
 *
 * ── ⚠️⚠️ 绝不能碰的四处（碰了就是数据损坏）──────────────────────
 *   ① `<script type="application/ld+json">` 内部：JSON 不解析 HTML 实体，
 *      写 `&lt;` 会让 JSON-LD 的文本值**真的变成 4 个字符 `&lt;`**
 *   ② `<style>` / `<pre>` / `<textarea>`：raw-text 元素，实体不解析
 *   ③ Nunjucks `{% %}` `{{ }}` `{# #}`：`{% if a < b %}` 里的 `<` 是语法
 *   ④ YAML 前置数据：同理
 *
 * ── 判据（什么算「游离」）───────────────────────────────────────
 *   `<` 后一个字符**不在** `[a-zA-Z!/?]` 内 → 游离
 *   （`<div` `<`!-- `</div` `<?xml` 都不是游离）
 *
 * 用法:
 *   node scripts/normalize-stray-lt.js                 # dry-run 汇总
 *   node scripts/normalize-stray-lt.js --show          # 附样例
 *   node scripts/normalize-stray-lt.js --file=xxx      # 单文件
 *   node scripts/normalize-stray-lt.js --apply         # 写入
 *   node scripts/normalize-stray-lt.js --check         # 只报数，有残留则 exit 1
 */
'use strict';
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'src');
const RAW_TEXT = ['script', 'style', 'textarea', 'pre'];
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta',
  'param', 'source', 'track', 'wbr', 'path', 'circle', 'rect', 'line', 'polyline', 'polygon', 'use', 'stop', 'ellipse']);

const APPLY = process.argv.includes('--apply');
const SHOW = process.argv.includes('--show');
const CHECK = process.argv.includes('--check');
const FILE_ARG = (process.argv.find((a) => a.startsWith('--file=')) || '').slice(7);

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.njk')) out.push(p);
  }
  return out;
}

/* `<` 后面这个字符不属于 [a-zA-Z!/?{] → 是文本里的游离 `<`
 * ⚠️⚠️ `{` 必须排除：`section-header.njk` 里有 `<{{ tag }} class="…">`，
 *    那是「标签名由 Nunjucks 生成」，`<` 是真正的标签起点。
 *    把它转成 `&lt;{{ tag }}` 会**直接把模板写坏**（渲染成字面量文本）。 */
const isStray = (s, p) => {
  const c = s[p + 1];
  return c === undefined || !/[a-zA-Z!/?{]/.test(c);
};

/* 从 tagStart（指向 `<`）引号感知地找标签结束的 `>`，返回下标，找不到返回 -1 */
function tagEndOf(s, tagStart) {
  let j = tagStart + 1, q = null;
  while (j < s.length) {
    const c = s[j];
    if (q) { if (c === q) q = null; }
    else if (c === '"' || c === "'") q = c;
    else if (c === '>') return j;
    j++;
  }
  return -1;
}

/* 扫描一个 .njk，返回 [{pos, kind, ctx}] —— 每一处需要转义的 `<` */
function scan(s) {
  const hits = [];
  const note = (pos, kind) => hits.push({ pos, kind, ctx: s.slice(Math.max(0, pos - 60), pos + 60).replace(/\s+/g, ' ') });
  let i = 0;

  // ④ YAML 前置数据
  if (s.startsWith('---')) {
    const e = s.indexOf('\n---', 3);
    if (e > 0) i = s.indexOf('\n', e + 1) + 1;
  }

  while (i < s.length) {
    // ③ Nunjucks
    if (s.startsWith('{#', i)) { const e = s.indexOf('#}', i + 2); i = e < 0 ? s.length : e + 2; continue; }
    if (s.startsWith('{%', i)) { const e = s.indexOf('%}', i + 2); i = e < 0 ? s.length : e + 2; continue; }
    if (s.startsWith('{{', i)) { const e = s.indexOf('}}', i + 2); i = e < 0 ? s.length : e + 2; continue; }
    // 注释
    if (s.startsWith('<!--', i)) { const e = s.indexOf('-->', i + 4); i = e < 0 ? s.length : e + 3; continue; }

    if (s[i] !== '<') { i++; continue; }

    // 游离 < → 记一笔
    if (isStray(s, i)) { note(i, 'text'); i++; continue; }

    // 真实标签
    const te = tagEndOf(s, i);
    if (te < 0) { i++; continue; }
    const raw = s.slice(i, te + 1);
    const m = /^<\s*(\/?)\s*([a-zA-Z][\w-]*)/.exec(raw);
    if (!m) { i = te + 1; continue; }
    const name = m[2].toLowerCase();
    const closing = !!m[1];

    // 属性值内部的游离 <（`alt="… FOD <180ms"`）
    const attrRe = /=\s*("[^"]*"|'[^']*')/g;
    let am;
    while ((am = attrRe.exec(raw))) {
      const q1 = am[0].indexOf(am[1][0]);
      const vs = i + am.index + q1 + 1;              // 值的第一个字符（不含引号）
      for (let k = vs; k < vs + am[1].length - 2; k++) if (s[k] === '<' && isStray(s, k)) note(k, 'attr');
    }

    i = te + 1;

    // ①② raw-text 元素整块跳过（script/style/textarea/pre 的**内容**一律不动）
    //    ⚠️ 用已解析出的 name 判定，不要靠切片回看开标签 —— 我第一版就是靠
    //    `s.slice(i-1-t.length, i).startsWith('<'+t)` 回看，切片算错一个字符，
    //    结果 `<script>` 没被识别 → JSON-LD 里的 `<` 全被当成正文，
    //    差点把 `&lt;` 写进 JSON 字符串（JSON 不解析实体 = 数据损坏）。
    if (!closing && RAW_TEXT.includes(name)) {
      const close = s.toLowerCase().indexOf('</' + name, i);
      if (close < 0) { i = s.length; continue; }
      const gt = s.indexOf('>', close);
      i = gt < 0 ? s.length : gt + 1;
      continue;
    }
  }
  return hits;
}

/* 按坐标从后往前替换（顺序改字符串会让偏移失效） */
function applyEdits(s, hits) {
  const pos = [...new Set(hits.map((h) => h.pos))].sort((a, b) => b - a);
  let out = s;
  for (const p of pos) out = out.slice(0, p) + '&lt;' + out.slice(p + 1);
  return out;
}

const files = FILE_ARG
  ? walk(SRC).filter((f) => f.replace(/\\/g, '/').endsWith('/' + FILE_ARG) || path.basename(path.dirname(f)) === FILE_ARG)
  : walk(SRC);

const rows = [];
let total = 0, nText = 0, nAttr = 0;
for (const f of files) {
  const s = fs.readFileSync(f, 'utf8');
  const hits = scan(s);
  if (!hits.length) continue;
  total += hits.length;
  nText += hits.filter((h) => h.kind === 'text').length;
  nAttr += hits.filter((h) => h.kind === 'attr').length;
  rows.push({ f, rel: f.replace(/\\/g, '/').replace(/.*\/src\//, 'src/'), hits, s });
}
rows.sort((a, b) => b.hits.length - a.hits.length);

// --list：机器可读清单（每行一个 src/ 相对路径），供批量脚本做备份/复验。
// ⚠️ 必须在打印汇总**之前**处理，否则汇总文字会混进清单里被下游当成路径。
if (process.argv.includes('--list')) {
  rows.forEach((r) => console.log(r.rel));
  process.exit(0);
}

console.log('=== 游离 `<` 归一（源文件侧）===');
console.log('  文本位置 ' + nText + ' · 属性值位置 ' + nAttr + ' · 合计 ' + total);
console.log('  涉及文件 ' + rows.length);
console.log('');
if (rows.length) {
  console.log('  按文件（前 20）:');
  rows.slice(0, 20).forEach((r) => console.log('    ' + String(r.hits.length).padStart(3) + '  ' + r.rel));
  if (rows.length > 20) console.log('    … 其余 ' + (rows.length - 20) + ' 个文件');
}
if (SHOW && rows.length) {
  console.log('');
  rows.slice(0, 4).forEach((r) => {
    console.log('  ### ' + r.rel);
    r.hits.slice(0, 4).forEach((h) => console.log('      [' + h.kind + '] …' + h.ctx + '…'));
  });
}

if (CHECK) process.exit(total ? 1 : 0);

if (APPLY && rows.length) {
  let n = 0;
  for (const r of rows) {
    const next = applyEdits(r.s, r.hits);
    if (next === r.s) continue;
    fs.writeFileSync(r.f, next);
    n++;
  }
  console.log('');
  console.log('  ✅ 已写入 ' + n + ' 个文件（共 ' + total + ' 处）');
}
