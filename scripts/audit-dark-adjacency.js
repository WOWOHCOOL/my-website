#!/usr/bin/env node
/**
 * 相邻深色板块审计（只读，不改任何文件）
 *
 * 规则（2026-09-18 用户确立）：
 *   两个深色板块相邻时，**必须用明度差区分**，**禁止再用渐变分界线**。
 *
 * 判据：两块背景色的 CIE 明度差 ΔL* < 12 视为「分不开」。
 *   （经验值：ΔL* > 10 才是肉眼明确的深浅差；< 8 基本等于同一块）
 *   实测参考（L* 由本脚本的 lstar() 计算）：
 *     darkBg        #020B1A  L* =  2.95
 *     brandBlue     #0A192F  L* =  8.70   → vs darkBg ΔL* =  5.74  ← 被投诉的那对，确实分不开
 *     brandBlueLight#0F2A4A  L* = 16.76   → vs darkBg ΔL* = 13.80  ← 已修，达标
 *     （white on #0F2A4A 对比度 14.5，正文可读性无虞）
 *
 * 用法：node scripts/audit-dark-adjacency.js
 * 退出码：发现未排除的问题时为 1（可挂进 CI / gate），否则 0。
 *
 * 注意：
 *   - 会解析一层 {% include %}（_includes 下的 partial 里的 <section> 也算）
 *   - 无背景类的 section 按 <body class="bg-white"> 计为白底，避免误报
 *   - blog 文章页按项目约定排除，只在输出里标注 [blog - 排除]
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'src');
const MIN_DL = 12; // CIE L* 差下限
const BODY_BG = '#FFFFFF';

const HEX = {
  'bg-darkBg': '#020B1A',
  'bg-brandBlueLight': '#0F2A4A',
  'bg-brandBlue': '#0A192F',
  'bg-brandOrange': '#FF6B00',
  'bg-black': '#000000',
  'bg-slate-950': '#020617',
  'bg-slate-900': '#0F172A',
  'bg-slate-800': '#1E293B',
  'bg-slate-700': '#334155',
  'bg-slate-200': '#E2E8F0',
  'bg-slate-100': '#F1F5F9',
  'bg-slate-50': '#F8FAFC',
  'bg-white': '#FFFFFF',
  'bg-orange-50': '#FFF7ED',
  'bg-gray-900': '#111827',
  'bg-gray-800': '#1F2937',
};
const GRAD = { 'from-slate-50': '#F8FAFC', 'from-white': '#FFFFFF', 'from-darkBg': '#020B1A', 'from-brandBlue': '#0A192F' };

const srgb = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
function lum(hex) {
  const m = hex.replace('#', '');
  return 0.2126 * srgb(parseInt(m.slice(0, 2), 16) / 255)
       + 0.7152 * srgb(parseInt(m.slice(2, 4), 16) / 255)
       + 0.0722 * srgb(parseInt(m.slice(4, 6), 16) / 255);
}
const ratio = (a, b) => {
  const A = lum(a), B = lum(b);
  return (Math.max(A, B) + 0.05) / (Math.min(A, B) + 0.05);
};
// CIE L*（感知明度，0–100）。ΔL* 比对比度更适合判断"两块颜色看得出深浅差吗"
const lstar = (hex) => {
  const Y = lum(hex);
  return Y <= 0.008856 ? 903.3 * Y : 116 * Math.cbrt(Y) - 16;
};

function bgOf(cls) {
  const toks = (cls || '').split(/\s+/);
  for (const t of toks) if (HEX[t]) return HEX[t];
  for (const t of toks) if (GRAD[t]) return GRAD[t];
  if (/bg-gradient/.test(cls)) return '#F8FAFC'; // 站内渐变只有浅色 hero 底
  return null;
}

function sectionsOf(file, depth = 0) {
  if (depth > 2) return [];
  const src = fs.readFileSync(file, 'utf8');
  const out = [];
  const re = /<section\b([^>]*)>|\{%\s*include\s+"([^"]+)"\s*%\}/g;
  let m;
  while ((m = re.exec(src))) {
    if (m[2]) {
      const inc = path.join(ROOT, '_includes', m[2]);
      if (fs.existsSync(inc)) out.push(...sectionsOf(inc, depth + 1));
      continue;
    }
    const attrs = m[1];
    const cls = (attrs.match(/class="([^"]*)"/) || [, ''])[1];
    out.push({ id: (attrs.match(/id="([^"]*)"/) || [, '(no id)'])[1], bg: bgOf(cls) });
  }
  return out;
}

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.name.endsWith('.njk')) acc.push(p);
  }
  return acc;
}

const files = walk(ROOT).filter((f) => !f.includes(`${path.sep}_includes${path.sep}`));
const findings = [];

for (const f of files) {
  const secs = sectionsOf(f);
  for (let i = 1; i < secs.length; i++) {
    const ca = secs[i - 1].bg || BODY_BG, cb = secs[i].bg || BODY_BG;
    if (lstar(ca) > 40 || lstar(cb) > 40) continue; // 必须两块都算深色
    const dl = Math.abs(lstar(ca) - lstar(cb));
    if (dl >= MIN_DL) continue;
    const rel = path.relative(ROOT, f).replace(/\\/g, '/');
    findings.push({ file: rel, a: { ...secs[i - 1], bg: ca }, b: { ...secs[i], bg: cb }, dl });
  }
}

const isBlog = (f) => f.startsWith('blog/') || /\/blog\//.test(f);
const blocking = findings.filter((f) => !isBlog(f.file));

console.log(`scanned ${files.length} templates (threshold ΔL* < ${MIN_DL})\n`);
if (!findings.length) console.log('OK — 无相邻深色板块明度不足');
for (const f of findings.sort((x, y) => x.dl - y.dl)) {
  console.log(`  ΔL*=${f.dl.toFixed(1).padStart(5)}  ${f.file}${isBlog(f.file) ? '   [blog - 排除]' : ''}`);
  console.log(`              ${f.a.id} (${f.a.bg}  L*=${lstar(f.a.bg).toFixed(1)})  ->  ${f.b.id} (${f.b.bg}  L*=${lstar(f.b.bg).toFixed(1)})`);
}
if (blocking.length) console.log(`\nFAIL — ${blocking.length} 处需要修（用 brandBlueLight 拉开明度，不要加分界线）`);
process.exit(blocking.length ? 1 : 0);
