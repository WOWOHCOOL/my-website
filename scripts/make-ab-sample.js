/* 构造 A/B 样本页（只读源 → 写 _site/_ab-*.html）
 *   after  = 当前产物（含我加的 banner 包裹层）
 *   before = 把 banner 包裹层还原（包裹 section 移除，mb-16 放回 banner 自身）
 * 用法：node scripts/make-ab-sample.js <built-html-rel-path>
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { eachTag } = require('./lib-html-sections.js');

const ROOT = path.join(__dirname, '..', '_site');
const rel = process.argv[2];
const src = path.join(ROOT, rel);
let html = fs.readFileSync(src, 'utf8');

/* 注入量测脚本：把 banner 卡片 / 同级正文卡片的实际像素宽度写进 <title> */
const PROBE = '<script>window.addEventListener("load",function(){try{'
  + 'function w(el){return el?Math.round(el.getBoundingClientRect().width):-1;}'
  + 'var b=document.querySelector(\'[class*="from-brandBlue to-slate-800"]\');'
  + 'var bodyCard=document.querySelector(\'article section[id]:not([id="faq"]):not([id="author-bio"]) > div[class~="bg-slate-50"]\');'
  + 'var faqCard=document.querySelector(\'#faq div[class~="bg-slate-50"]\');'
  + 'var relCard=document.querySelector(\'#related-articles a[class~="bg-slate-50"]\');'
  + 'document.title="PROBE BANNER="+w(b)+" BODY="+w(bodyCard)+" FAQ="+w(faqCard)+" REL="+w(relCard);'
  + '}catch(e){document.title="PROBE ERR "+e.message;}});</script>';
html = html.replace('</body>', PROBE + '</body>');

fs.writeFileSync(path.join(ROOT, '_ab-after.html'), html);

/* ── 还原 before ── */
const WRAP = '<section class="max-w-4xl mx-auto px-6 mb-16">';
const BAN = '<div class="relative bg-gradient-to-br from-brandBlue to-slate-800 rounded-3xl p-10 text-center overflow-hidden">';
const BAN_MB = '<div class="relative bg-gradient-to-br from-brandBlue to-slate-800 rounded-3xl p-10 text-center mb-16 overflow-hidden">';

// 找 WRAP 紧跟 BAN 的位置
const re = new RegExp(WRAP.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*' + BAN.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
const m = html.match(re);
if (!m) { console.error('未找到包裹层+banner 组合（包裹层可能已被移除）'); process.exit(0); }
const at = html.indexOf(m[0]);
const afterOpen = at + m[0].length;

// 找 banner div 的配对闭合
let depth = 0, cursor = 0, closeAt = -1;
for (const t of eachTag(html)) {
  const i = html.indexOf(t.raw, cursor);
  if (i < 0) continue;
  cursor = i + t.raw.length;
  if (i < at) continue;
  if (t.name !== 'div') continue;
  if (t.closing) { depth--; if (depth === 0) { closeAt = i; break; } } else depth++;
}
if (closeAt < 0) { console.error('未找到 banner 闭合'); process.exit(1); }

// banner 闭合之后应是 </section>
const tail = html.slice(closeAt + 6);
const sm = tail.match(/^\s*<\/section>/);
if (!sm) { console.error('banner 闭合后不是 </section>: ' + JSON.stringify(tail.slice(0, 60))); process.exit(1); }

// 组装 before：WRAP+BAN → BAN_MB，并删掉尾随 </section>
const before = html.slice(0, at) + BAN_MB + html.slice(afterOpen, closeAt + 6) + tail.slice(sm[0].length);
fs.writeFileSync(path.join(ROOT, '_ab-before.html'), before);
console.log('已写 _ab-before.html / _ab-after.html  (delta=' + (html.length - before.length) + ' 字节)');