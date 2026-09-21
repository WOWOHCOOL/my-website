/* blog 文章页「尾部元素」类串清单（只读）
 * 目的：找出变体差异的**真实来源** —— 同一组件在不同页用了不同 class 串
 * 统计项：
 *   1) CTA banner（bg-gradient-to-br from-brandBlue to-slate-800 rounded-3xl p-10 ...）
 *   2) #related-articles（aside 或 section）
 *   3) sources 区（含 Sources/Fuentes/Quellen/... 标题的那个元素）
 *   4) 正文外层 content wrapper
 * 用法：node scripts/audit-blog-tail.js [--list]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { eachTag, clsOf, idOf } = require('./lib-html-sections.js');

const ROOT = path.join(__dirname, '..', '_site');
const LANGS = ['en', 'de', 'es', 'fr', 'ru', 'pl'];
const SHOW = process.argv.includes('--list');

const SRC_RE = /(sources|fuentes|quellen|fonti|источник|źródł)/i;

function tally(map, k) { map.set(k, (map.get(k) || 0) + 1); }
function top(map, n) {
  return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, n);
}

const banner = new Map();     // tag + class
const related = new Map();
const sources = new Map();
const wrapper = new Map();
const noSources = [];
const noRelated = [];
const noBanner = [];

let total = 0;
for (const lang of LANGS) {
  const dir = lang === 'en' ? path.join(ROOT, 'blog') : path.join(ROOT, lang, 'blog');
  if (!fs.existsSync(dir)) continue;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    const p = path.join(dir, e.name, 'index.html');
    if (!fs.existsSync(p)) continue;
    const html = fs.readFileSync(p, 'utf8');
    // 只统计文章页：必须含 <article ... blog-content 或 faq
    if (!/id="faq"/.test(html)) continue;
    total++;
    const url = lang + '/' + e.name;

    // 1) banner：定位 class 含 rounded-3xl p-10 的元素
    let bTag = null, bCls = null;
    for (const t of eachTag(html)) {
      if (t.closing || !/^(section|div)$/.test(t.name)) continue;
      const c = clsOf(t.raw);
      if (/from-brandBlue to-slate-800/.test(c) && /rounded-3xl/.test(c) && /p-10/.test(c)) {
        bTag = t.name; bCls = c; break;
      }
    }
    if (bTag) tally(banner, bTag + '  |  ' + bCls.replace(/\s+/g, ' '));
    else { noBanner.push(url); }

    // 2) related-articles
    let rCls = null, rTag = null;
    for (const t of eachTag(html)) {
      if (t.closing) continue;
      if (idOf(t.raw) === 'related-articles') { rCls = clsOf(t.raw); rTag = t.name; break; }
    }
    if (rCls !== null) tally(related, rTag + '  |  ' + rCls.replace(/\s+/g, ' '));
    else noRelated.push(url);

    // 3) sources：找 h2 文案匹配的语言元素
    let sCls = null, sTag = null;
    let pending = null;
    for (const t of eachTag(html)) {
      if (t.closing) { if (pending && t.name === pending.name) { /* keep */ } continue; }
      if (/^h2$/.test(t.name)) {
        // 看 h2 之后的文本
        const at = html.indexOf(t.raw);
        const txt = html.slice(at + t.raw.length, at + t.raw.length + 120).replace(/<[^>]*>/g, '');
        if (SRC_RE.test(txt)) { sTag = 'h2-found'; break; }
      }
    }
    // 用 h2 文本定位其最近的祖先 section/aside 太难，改为：找含 sources 链接列表的 depth-0 section
    // 简化：取 author-bio 之后的 depth-0 section，排除 banner/related，第一个即 sources
    if (sTag) {
      // 收集 depth-0 元素序列
      const seq = [];
      let depth = 0;
      for (const t of eachTag(html)) {
        if (!/^(section|aside)$/.test(t.name)) continue;
        if (t.closing) { if (depth > 0) depth--; continue; }
        if (depth === 0) seq.push({ tag: t.name, cls: clsOf(t.raw), id: idOf(t.raw) });
        depth++;
      }
      const ai = seq.findIndex((s) => s.id === 'author-bio');
      const tail = ai >= 0 ? seq.slice(ai + 1) : seq;
      const src = tail.find((s) => !/from-brandBlue/.test(s.cls) && s.id !== 'related-articles');
      if (src) tally(sources, src.tag + '  |  ' + src.cls.replace(/\s+/g, ' '));
      else noSources.push(url);
    } else noSources.push(url);

    // 4) content wrapper（blog-content 容器）
    let wCls = null;
    for (const t of eachTag(html)) {
      if (t.closing || t.name !== 'div') continue;
      const c = clsOf(t.raw);
      if (/blog-content/.test(c)) { wCls = c; break; }
    }
    tally(wrapper, wCls === null ? '(无 blog-content 容器)' : wCls.replace(/\s+/g, ' '));
  }
}

console.log('blog 文章页总数: ' + total + '\n');

function report(name, map, miss) {
  console.log('=== ' + name + ' ===');
  top(map, 8).forEach(([k, n]) => console.log('  ' + String(n).padStart(3) + '  ' + k));
  if (miss.length) {
    console.log('  --- 无此项: ' + miss.length + (SHOW ? '' : ' (--list 查看)'));
    if (SHOW) miss.forEach((u) => console.log('      ' + u));
  }
  console.log('');
}
report('1) CTA banner', banner, noBanner);
report('2) #related-articles', related, noRelated);
report('3) sources 区', sources, noSources);
report('4) 正文 content wrapper', wrapper, []);
