/* 导出 blog 文章页骨架区原文（只读 · 游标扫描版）
 * 骨架区 = id="faq" 那个 depth-0 section 起始 → 该页最后一个 depth-0 section 结束
 * 用法：node scripts/dump-blog-skeleton.js <slug> [lang] [--full]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { eachTag } = require('./lib-html-sections.js');

const ROOT = path.join(__dirname, '..', '_site');
const slug = process.argv[2];
const lang = process.argv[3] || 'en';
const full = process.argv.includes('--full');

const p = path.join(ROOT, lang === 'en' ? 'blog' : lang + '/blog', slug, 'index.html');
if (!fs.existsSync(p)) { console.error('未找到: ' + p); process.exit(1); }
const html = fs.readFileSync(p, 'utf8');

// 游标扫描：记录每个 depth-0 section 的起止偏移
const secs = [];
let depth = 0;
let cur = null;
let cursor = 0;
for (const t of eachTag(html)) {
  const at = html.indexOf(t.raw, cursor);
  if (at < 0) continue;
  cursor = at + t.raw.length;
  if (t.name !== 'section') continue;
  if (t.closing) {
    if (cur && depth === 1) { cur.end = cursor; secs.push(cur); cur = null; }
    if (depth > 0) depth--;
    continue;
  }
  if (depth === 0) cur = { start: at, end: -1, open: t.raw };
  depth++;
}

console.log('=== ' + lang + '/' + slug + '  depth-0 section 共 ' + secs.length + ' 个 ===');
secs.forEach((s, i) => {
  const raw = html.slice(s.start, s.end > 0 ? s.end : s.start + 300);
  const head = s.open.replace(/\s+/g, ' ').slice(0, 130);
  const textLen = raw.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().length;
  console.log(String(i).padStart(3) + '  len=' + String(raw.length).padStart(6) + '  可见文本=' + String(textLen).padStart(5) + '  ' + head);
});

// 找 faq section
const fi = secs.findIndex((s) => /id="faq"/.test(s.open));
if (fi >= 0) {
  const region = html.slice(secs[fi].start, secs[secs.length - 1].end);
  const dst = 'C:/Users/wowoh/AppData/Local/Temp/wb-prod/skel-' + lang + '-' + slug + '.html';
  fs.writeFileSync(dst, region);
  console.log('\n骨架区（' + secs.length - fi + ' 个 section, ' + region.length + ' 字节）→ ' + dst);
  if (full) console.log('\n' + region.slice(0, 4000));
} else {
  console.log('\n⚠️ 未找到 id="faq" 的 section');
}
