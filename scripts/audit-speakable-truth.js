/* speakable 声明真伪审计（只读）
 *
 * 判据（最高优先级硬规则「绝不给搜索引擎声明不存在的东西」）：
 *   页面 JSON-LD 里 `speakable.cssSelector` 声明的每个选择器，
 *   必须在**页面可见 HTML** 里真实存在。
 *
 * ⚠️ 必须先把 speakable 声明自身从 HTML 里剔除，再找选择器 ——
 *    否则会自己匹配到自己（假阳性）。
 * ⚠️ 选择器匹配要宽松：`class="faq-answer"` / `class="faq-answer x"` /
 *    `class='x faq-answer'` 都算存在。
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', '_site');

const rows = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.html')) {
      const rel = path.relative(ROOT, p).split(path.sep).join('/');
      rows.push({ url: '/' + rel.replace(/index\.html$/, ''), s: fs.readFileSync(p, 'utf8') });
    }
  }
})(ROOT);

// 从 HTML 中抽出所有 speakable 声明块，收集 cssSelector
function selectorsOf(html) {
  const out = [];
  const re = /"speakable"\s*:\s*\{[^}]*"cssSelector"\s*:\s*\[([^\]]*)\]/g;
  let m;
  while ((m = re.exec(html))) {
    for (const raw of m[1].split(',')) {
      const sel = raw.trim().replace(/^["']|["']$/g, '');
      if (sel) out.push(sel);
    }
  }
  return out;
}

// 把 speakable 声明整块从 HTML 剔除（避免自匹配）
function stripSpeakable(html) {
  return html.replace(/"speakable"\s*:\s*\{[^}]*"cssSelector"\s*:\s*\[[^\]]*\]\s*\}/g, '');
}

// 宽松判断选择器是否在可见 HTML 中存在
// ⚠️ 必须支持复合/后代选择器（`.faq-item summary` / `.a.b` / `h1.foo`）：
//    早期版本把整串当一个 class 名匹配 → 后代选择器永远匹配不上 → 假阳性。
function existsSimple(html, sel) {
  if (sel.startsWith('.')) {
    const cls = sel.slice(1);
    const esc = cls.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`class\\s*=\\s*["'][^"']*\\b${esc}\\b[^"']*["']`).test(html);
  }
  if (sel.startsWith('#')) {
    const id = sel.slice(1);
    const esc = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`id\\s*=\\s*["']${esc}["']`).test(html);
  }
  // 元素选择器（去掉伪类/属性后缀）
  const tag = sel.replace(/[.:\[].*$/, '');
  if (!tag) return true;
  return new RegExp(`<\\s*${tag}[\\s/>]`, 'i').test(html);
}

function exists(html, sel) {
  // 拆成后代片段：空白 / `>` / `+` / `~` 分隔
  const parts = sel.split(/\s*[>+~]\s*|\s+/).filter(Boolean);
  if (!parts.length) return true;
  // 每个片段内部再按 `.` `#` 拆分（`.a.b` → ['.a', '.b']）
  for (const part of parts) {
    const simples = part.match(/[.#]?[\w-]+/g) || [];
    if (!simples.length) continue;
    for (const s of simples) {
      if (!existsSimple(html, s)) return false;
    }
  }
  return true;
}

const bad = [];
const ok = [];
let declaredPages = 0;

for (const r of rows) {
  const sels = selectorsOf(r.s);
  if (!sels.length) continue;
  declaredPages++;
  const body = stripSpeakable(r.s);
  const missing = sels.filter((s) => !exists(body, s));
  if (missing.length) bad.push({ url: r.url, sels, missing });
  else ok.push({ url: r.url, sels });
}

console.log(`=== speakable 声明真伪审计 ===`);
console.log(`声明了 speakable 的页面：${declaredPages} / ${rows.length}\n`);

if (ok.length) {
  const bySel = {};
  for (const o of ok) { const k = o.sels.join('+'); bySel[k] = (bySel[k] || 0) + 1; }
  console.log(`✅ 声明且选择器真实存在：${ok.length} 页`);
  for (const [k, v] of Object.entries(bySel).sort((a, b) => b[1] - a[1])) console.log(`     ${String(v).padStart(4)} 页  [${k}]`);
}

if (bad.length) {
  console.log(`\n⚠️⚠️ 声明了不存在的选择器：${bad.length} 页  ← 违反「绝不声明不存在的东西」`);
  const byMiss = {};
  for (const b of bad) { const k = b.missing.join('+'); (byMiss[k] = byMiss[k] || []).push(b.url); }
  for (const [k, urls] of Object.entries(byMiss).sort((a, b) => b[1].length - a[1].length)) {
    console.log(`\n  缺失选择器 [${k}]  → ${urls.length} 页`);
    for (const u of urls.slice(0, 30)) console.log('      ✗ ' + u);
    if (urls.length > 30) console.log(`      ... 另 ${urls.length - 30} 页`);
  }
}
