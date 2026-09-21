'use strict';
/* brand-story 背景语义归一：bg-brandBlue → bg-darkBg text-white dark-section
 *
 * 依据（实测）：
 *   bg-brandBlue 主要作 CTA/hero 底（cta 17 · content 7 · hero 6 · about 4 · products 3 · trust 1）
 *   bg-darkBg   是「深色内容区」的标准底（content 31 · process 2 · trust 1 · about 1）
 *   → 4 个 data-section="about" 的 bg-brandBlue 是离群值（EN/PL 首页 + EN/PL about）
 *
 * 只改 section 的 class，不动任何内容 / 装饰 / 内层结构。
 * 用法:
 *   node scripts/normalize-brand-story-bg.js                 # dry-run
 *   node scripts/normalize-brand-story-bg.js --apply
 *   node scripts/normalize-brand-story-bg.js --list          # 机器可读清单
 *   node scripts/normalize-brand-story-bg.js --file=<子串>   # 只处理匹配的文件
 */
const fs = require('fs');
const path = require('path');

const SRC = path.join(process.cwd(), 'src');
const APPLY = process.argv.includes('--apply');
const LIST = process.argv.includes('--list');
const FILE = (process.argv.find((a) => a.startsWith('--file=')) || '').slice(7);

/* 只匹配 data-section="about" 且 class 含 bg-brandBlue 的 section 开标签 */
const RE = /<section\b([^>]*\bdata-section="about"[^>]*)>/g;

function transform(tag) {
  const m = /class="([^"]*)"/.exec(tag);
  if (!m) return null;
  const cls = m[1].replace(/\s+/g, ' ').trim();
  if (!/(^|\s)bg-brandBlue(\s|$)/.test(cls)) return null;
  let next = cls.replace(/(^|\s)bg-brandBlue(\s|$)/, '$1bg-darkBg$2');
  if (!/(^|\s)text-white(\s|$)/.test(next)) next += ' text-white';
  if (!/(^|\s)dark-section(\s|$)/.test(next)) next += ' dark-section';
  return { cls, next, tag: tag.replace(/class="[^"]*"/, 'class="' + next + '"') };
}

function walk(d, o = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p, o);
    else if (e.name.endsWith('.njk')) o.push(p);
  }
  return o;
}

const files = walk(SRC).filter((f) => !FILE || f.replace(/\\/g, '/').includes(FILE));
const hits = [];
for (const f of files) {
  const s = fs.readFileSync(f, 'utf8');
  const edits = [];
  RE.lastIndex = 0;
  let m;
  while ((m = RE.exec(s))) {
    const r = transform(m[0]);
    if (r) edits.push({ at: m.index, len: m[0].length, ...r });
  }
  if (edits.length) hits.push({ f, edits });
}

if (LIST) {
  hits.forEach((h) => console.log(path.relative(process.cwd(), h.f).replace(/\\/g, '/')));
  process.exit(0);
}

console.log('=== 规则 BRANDSTORY-BG：data-section="about" 的 bg-brandBlue → bg-darkBg text-white dark-section ===');
console.log('命中文件 ' + hits.length + ' 个 · 替换 ' + hits.reduce((a, h) => a + h.edits.length, 0) + ' 处');
console.log('');
hits.forEach((h) => {
  console.log('  ' + h.f.replace(/\\/g, '/').replace(/.*\/src\//, 'src/'));
  h.edits.forEach((e) => {
    console.log('      旧: ' + e.cls);
    console.log('      新: ' + e.next);
  });
});

if (!APPLY) {
  console.log('\n(dry-run；加 --apply 写入)');
  process.exit(0);
}

let wrote = 0;
for (const { f, edits } of hits) {
  let s = fs.readFileSync(f, 'utf8');
  // 按坐标从后往前应用，避免偏移失效
  edits.sort((a, b) => b.at - a.at);
  for (const e of edits) s = s.slice(0, e.at) + e.tag + s.slice(e.at + e.len);
  fs.writeFileSync(f, s);
  wrote++;
}
console.log('\n✅ 写入 ' + wrote + ' 个文件');
