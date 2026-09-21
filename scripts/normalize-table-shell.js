'use strict';
/* 表壳卡片归一 —— 规则 BG：给「变体 B」表壳 wrapper 补 bg-white
 *
 * 背景（实测）：
 *   变体 B = 卡片类写在 wrapper div 上，表格本身透明：
 *     <div class="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm[ 后缀]">
 *       <table class="w-full text-sm">
 *   其中 21 个落在 `bg-slate-50` 章节里 → 卡片内部 = slate-50（与页面同色）
 *   → 只剩 1px 边框 + 阴影围着空洞 = **空心卡**（浏览器实测 tableBg=rgba(0,0,0,0)、
 *     section bg=rgb(248,250,252)）。同页的「变体 A」卡片却是实心白卡 → 同页不一致。
 *
 * 修法：wrapper 补 `bg-white`（卡片本体就是 wrapper，填色应归它）。
 *   26 个落在 `bg-white` 章节的属 no-op（白底白卡），一并补上使规则唯一。
 *
 * 用法:
 *   node scripts/normalize-table-shell.js            # dry-run
 *   node scripts/normalize-table-shell.js --apply    # 写入
 *   node scripts/normalize-table-shell.js --list     # 机器可读清单
 *   node scripts/normalize-table-shell.js --file=xxx # 只处理路径含 xxx 的文件
 */
const fs = require('fs');
const path = require('path');

const SRC = path.join(process.cwd(), 'src');
const APPLY = process.argv.includes('--apply');
const LIST = process.argv.includes('--list');
const FILE = (process.argv.find((a) => a.startsWith('--file=')) || '').slice(7);

/* 变体 B 的 wrapper 前缀（其后可跟 max-w-4xl mx-auto / mb-N 等后缀） */
const B_PREFIX = 'overflow-x-auto rounded-2xl border border-slate-200 shadow-sm';
const B_RE = new RegExp('<div class="(' + B_PREFIX.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')((?: [^"]*)?)">', 'g');

/* ── 规则 MOUNT：表壳挂载点归一（变体 A → 变体 B） ─────────────────
 * 变体 A（48 个）：卡片类写在 <table> 自身
 *   <div class="overflow-x-auto reveal">
 *   <table class="w-full border-collapse bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200">
 * 变体 B（47 个，目标形）：卡片类写在 wrapper div
 *   <div class="overflow-x-auto [reveal] rounded-2xl border border-slate-200 shadow-sm bg-white[ 后缀]">
 *   <table class="w-full text-sm">
 *
 * 为什么选 B 而不是 A：
 *   ① `rounded-2xl` + `overflow-hidden` 放在 <table> 上依赖浏览器对 display:table 的
 *      overflow 裁剪行为，而 wrapper（块级 + overflow-x-auto）裁剪是标准行为，更稳。
 *   ② 卡片本体（圆角/边框/阴影/底色）集中在 wrapper，语义更清晰、新增表格时不易漏类。
 *
 * ⚠️ `reveal`（滚动入场动画）是**正交**标记，原位保留：不新增、不删除
 *    （全站 48 个表壳带、47 个不带，属既有设计差异，不是本次归一目标）。
 * ⚠️ table 补 `text-sm` 是 no-op：实测变体 A 的 49 个表格 / 1106 个 th·td
 *    **全部**自带字号类（`audit-shell-cellsize.js` = 0 缺失），单元格自身规则优先。
 */
const A_TO_B = [
  /(<div class=")overflow-x-auto reveal(">)(\s*)(<table class=")w-full border-collapse bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200(">)/g,
  '<div class="overflow-x-auto reveal rounded-2xl border border-slate-200 shadow-sm bg-white">$3<table class="w-full text-sm">',
];

function walk(d, o = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p, o);
    else if (e.name.endsWith('.njk')) o.push(p);
  }
  return o;
}

/* ── 规则表 ───────────────────────────────────────────────────── */
const RULES = {
  BG: {
    name: 'BG   变体 B 表壳 wrapper 补 bg-white（修「空心卡」）',
    count(s) {
      let n = 0; B_RE.lastIndex = 0; let m;
      while ((m = B_RE.exec(s))) if (!/(^|\s)bg-white(\s|$)/.test(m[2] || '')) n++;
      return n;
    },
    apply(s) {
      return s.replace(B_RE, (full, prefix, suffix) => {
        if (/(^|\s)bg-white(\s|$)/.test(suffix || '')) return full;
        return '<div class="' + prefix + ' bg-white' + (suffix || '') + '">';
      });
    },
  },
  MOUNT: {
    name: 'MOUNT 表壳挂载点归一（变体 A：卡片类从 <table> 移到 wrapper div）',
    count(s) { return (s.match(A_TO_B[0]) || []).length; },
    apply(s) { return s.replace(A_TO_B[0], A_TO_B[1]); },
  },
};

const only = (process.argv.find((a) => a.startsWith('--only=')) || '').slice(7);
const names = only ? only.split(',').map((x) => x.trim().toUpperCase()) : Object.keys(RULES);
const files = walk(SRC).filter((f) => !FILE || f.replace(/\\/g, '/').includes(FILE));

const hits = [];
let grand = 0;
for (const f of files) {
  const s = fs.readFileSync(f, 'utf8');
  const per = {};
  let n = 0;
  for (const nm of names) {
    const c = RULES[nm].count(s);
    if (c) { per[nm] = c; n += c; }
  }
  if (n) { hits.push({ f, n, per }); grand += n; }
}

if (LIST) {
  // ⚠️ 必须输出**相对 cwd** 的路径：绝对路径会让调用方 `cp "$BK/$f"` 之类的用法炸掉
  //    （且 Windows 的 `C:\…` 混进正斜杠路径后 mkdir 会 ENOENT）
  hits.forEach((h) => console.log(path.relative(process.cwd(), h.f).replace(/\\/g, '/')));
  process.exit(0);
}

console.log('=== 表壳归一（规则: ' + names.join(', ') + '）===');
names.forEach((nm) => console.log('  ' + RULES[nm].name));
console.log('命中文件 ' + hits.length + ' 个 · 替换 ' + grand + ' 处');
hits.forEach((h) => console.log('  ' + String(h.n).padStart(2) + '  ' + h.f.replace(/\\/g, '/').replace(/.*\/src\//, 'src/') + '   [' + Object.entries(h.per).map(([k, v]) => k + ':' + v).join(' ') + ']'));

if (!APPLY) {
  console.log('\n(dry-run；加 --apply 写入)');
  process.exit(0);
}

let wrote = 0, total = 0;
for (const { f } of hits) {
  const before = fs.readFileSync(f, 'utf8');
  let after = before;
  for (const nm of names) after = RULES[nm].apply(after);
  if (after !== before) { fs.writeFileSync(f, after); wrote++; total += (after.length - before.length); }
}
console.log('\n✅ 写入 ' + wrote + ' 个文件 · 字节净变化 ' + total);
