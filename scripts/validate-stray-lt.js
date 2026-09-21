/* 校验产物 HTML 里不存在「文本位置的游离 `<`」
 *
 * ── 为什么需要它 ────────────────────────────────────────────────
 * 正文里写的是数学比较符（`<0.5%` `<20mΩ` `< 300 Cycles` `<=30%`）。
 * 裸 `<` 在 HTML5 里是 parse error（浏览器能恢复，但属非合规 HTML）；
 * 且一旦后面跟的是字母（例如误写成 `<strong`），会**真的变成标签**。
 *
 * ── 判据 ───────────────────────────────────────────────────────
 *   `<` 后一个字符不在 `[a-zA-Z!/?{]` 内 → 游离
 *   以下位置**允许**存在（不解析 HTML 实体，或本就不是文本）：
 *     · `<script>` / `<style>` / `<pre>` / `<textarea>` 内部
 *       （⚠️ JSON-LD 里的 `<` 不能改成 `&lt;` —— JSON 不解析实体，
 *         改了会让数据真的变成 4 个字符；要改只能用 `\u003c`）
 *     · HTML 注释内部（不渲染）
 *
 * 用法: node scripts/validate-stray-lt.js [--verbose]
 *   退出码 0 = 通过；1 = 存在游离 `<`
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '_site');
const RAW = ['script', 'style', 'pre', 'textarea'];
const VERBOSE = process.argv.includes('--verbose');

function walk(d, out = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

/* 收集「允许存在游离 <」的区间：注释 + raw-text 元素内容 */
function allowedSpans(h) {
  const spans = [];
  let i = 0;
  while (i < h.length) {
    const lt = h.indexOf('<', i);
    if (lt < 0) break;
    if (h.startsWith('<!--', lt)) {
      const e = h.indexOf('-->', lt + 4);
      spans.push([lt, e < 0 ? h.length : e + 3]);
      i = e < 0 ? h.length : e + 3;
      continue;
    }
    const m = /^<\s*\/?\s*([a-zA-Z][\w-]*)/.exec(h.slice(lt, lt + 40));
    if (!m) { i = lt + 1; continue; }
    const name = m[1].toLowerCase();
    // 引号感知地找标签结束
    let j = lt + m[0].length, q = null, te = -1;
    while (j < h.length) {
      const c = h[j];
      if (q) { if (c === q) q = null; }
      else if (c === '"' || c === "'") q = c;
      else if (c === '>') { te = j; break; }
      j++;
    }
    if (te < 0) { i = lt + 1; continue; }
    if (!/^<\s*\//.test(h.slice(lt, lt + 4)) && RAW.includes(name)) {
      const close = h.toLowerCase().indexOf('</' + name, te + 1);
      const end = close < 0 ? h.length : (h.indexOf('>', close) + 1 || h.length);
      spans.push([te + 1, end]);
      i = end;
      continue;
    }
    i = te + 1;
  }
  return spans;
}

const files = walk(ROOT);
const inSpan = (spans, p) => spans.some(([a, b]) => p >= a && p < b);

let bad = 0;
const rows = [];
for (const f of files) {
  const h = fs.readFileSync(f, 'utf8');
  const spans = allowedSpans(h);
  const hits = [];
  for (const m of h.matchAll(/<(?![a-zA-Z!?\/{])/g)) {
    if (inSpan(spans, m.index)) continue;
    hits.push({ p: m.index, ctx: h.slice(Math.max(0, m.index - 70), m.index + 50).replace(/\s+/g, ' ') });
  }
  if (hits.length) { bad += hits.length; rows.push({ rel: path.relative(ROOT, f).replace(/\\/g, '/'), hits }); }
}

console.log('=== 产物游离 `<` 校验（' + files.length + ' 个 HTML）===');
if (!rows.length) {
  console.log('  ✅ 0 处 —— 文本位置无游离 `<`（raw-text 元素与注释内不计）');
  process.exit(0);
}
console.log('  ❌ ' + bad + ' 处，涉及 ' + rows.length + ' 个文件');
rows.slice(0, 20).forEach((r) => {
  console.log('  ' + r.rel + '  (' + r.hits.length + ')');
  if (VERBOSE) r.hits.slice(0, 3).forEach((x) => console.log('      …' + x.ctx + '…'));
});
process.exit(1);
