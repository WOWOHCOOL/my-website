/* 未转义 `<` 全站审计（只读）
 *
 * 判据：文本节点里出现 `<` 且后一个字符不是 [a-zA-Z!/?] → 按 HTML 规范
 *   应写成 `&lt;`（或直接用 `≤`）。浏览器容错能渲染，但：
 *     · 破坏一切朴素解析器（含部分 AI 爬虫 / 摘要器 / 社交卡片抓取）
 *     · 在 XML 语境（RSS / sitemap）里是**硬错误**
 *
 * 排除：script / style / textarea / pre 内部、注释内部、属性值内部。
 *
 * 用法：node scripts/audit-unescaped-lt.js [--json]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { eachTag } = require('./lib-html-sections.js');

const ROOT = path.join(__dirname, '..', '_site');
const asJson = process.argv.includes('--json');

/* 收集所有「不产生可见文本的区间」：注释 / script / style / textarea / pre / 标签本身 */
function blindRanges(html) {
  const ranges = [];
  let i = 0;
  while (i < html.length) {
    const lt = html.indexOf('<', i);
    if (lt < 0) break;
    // 游离 `<` 不是标签：不建立区间（否则会把后面的真标签一起吞掉）
    const nxt0 = html[lt + 1];
    if (nxt0 === undefined || !/[a-zA-Z!/?]/.test(nxt0)) { i = lt + 1; continue; }
    if (html.startsWith('<!--', lt)) {
      const e = html.indexOf('-->', lt + 4);
      const end = e < 0 ? html.length : e + 3;
      ranges.push([lt, end]); i = end; continue;
    }
    const lower = html.slice(lt, lt + 10).toLowerCase();
    let handled = false;
    for (const t of ['script', 'style', 'textarea', 'pre']) {
      if (lower.startsWith('<' + t)) {
        const c = html[lt + 1 + t.length];
        if (c === undefined || c === '>' || c === '/' || /\s/.test(c)) {
          const close = html.toLowerCase().indexOf('</' + t, lt + 1 + t.length);
          const end = close < 0 ? html.length : (html.indexOf('>', close) + 1 || html.length);
          ranges.push([lt, end]); i = end; handled = true; break;
        }
      }
    }
    if (handled) continue;
    // 标签本身
    let j = lt + 1, q = null;
    while (j < html.length) {
      const c = html[j];
      if (q) { if (c === q) q = null; }
      else if (c === '"' || c === "'") q = c;
      else if (c === '>') break;
      j++;
    }
    ranges.push([lt, j + 1]);
    i = j + 1;
  }
  return ranges;
}

const inRanges = (ranges, p) => {
  let lo = 0, hi = ranges.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (p < ranges[mid][0]) hi = mid - 1;
    else if (p >= ranges[mid][1]) lo = mid + 1;
    else return true;
  }
  return false;
};

const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(html|xml)$/.test(e.name)) files.push(p);
  }
})(ROOT);

const hits = [];
for (const f of files) {
  const html = fs.readFileSync(f, 'utf8');
  const isXml = f.endsWith('.xml');
  const ranges = isXml ? [] : blindRanges(html);
  const re = /</g;
  let m;
  while ((m = re.exec(html))) {
    const p = m.index;
    const nxt = html[p + 1] || '';
    if (/[a-zA-Z!\/?]/.test(nxt)) continue;
    if (!isXml && inRanges(ranges, p)) continue;
    hits.push({
      file: path.relative(ROOT, f).split(path.sep).join('/'),
      pos: p,
      snippet: html.slice(Math.max(0, p - 60), p + 60).replace(/\s+/g, ' '),
    });
  }
}

if (asJson) { console.log(JSON.stringify(hits, null, 2)); process.exit(0); }

const byFile = new Map();
for (const h of hits) {
  if (!byFile.has(h.file)) byFile.set(h.file, []);
  byFile.get(h.file).push(h);
}
console.log('=== 未转义 `<` 全站审计（扫描 ' + files.length + ' 个 html/xml）===\n');
if (!hits.length) { console.log('✅ 0 处'); process.exit(0); }
console.log('命中文件 ' + byFile.size + ' 个 · 总处数 ' + hits.length + '\n');
for (const [f, list] of [...byFile.entries()].sort((a, b) => b[1].length - a[1].length)) {
  console.log(`  ${String(list.length).padStart(3)} 处  ${f}`);
  for (const h of list.slice(0, 3)) console.log(`          …${h.snippet}…`);
  if (list.length > 3) console.log(`          （另 ${list.length - 3} 处）`);
}
