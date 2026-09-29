/* 校验「响应时间单一真源」的 token 闭合性
 *
 * ── 背景 ────────────────────────────────────────────────────────
 * 全站 215 个文件里的响应时间表述（4 小时口径）不再逐文件硬编码，改成写
 * token，由 .eleventy.js 的 `responseTime` 转换器按页面语言替换成
 * src/_data/inquiry.json 里的值。改口径 = 只改那一个 JSON。
 *
 * 这个校验器守两件事：
 *   A. 源侧（src/**）：只允许 {RT} {RTG} {RTS} {RTSP} 四种 token。
 *      形近写法（{RTx} / {rt} / { RT }）会让转换器**静默不替换**，
 *      最后以字面量出现在页面上 —— 用户看得见，构建却全绿。
 *   B. 产物侧（_site/**）：不允许残留 token。分两档：
 *      B1 所有文件（含 .js/.css/.json）→ 不许有四种合法 token 的字面量
 *      B2 仅文本产物（.html/.xml/.txt）→ 不许有形近写法
 *      （.js/.css 排除在 B2 外：压缩代码里 `{sort}` 这类花括号块会误报）
 *
 * ── 为什么值得单独一个校验器 ────────────────────────────────────
 * 「检测到 ≠ 检测对」。转换器自身无法发现自己漏掉的形近 token（它只认精确串），
 * 所以这里用**独立的正则**重新找一遍，而不是复用转换器的匹配逻辑。
 *
 * 用法:
 *   node scripts/validate-response-time-tokens.js            # 校验
 *   node scripts/validate-response-time-tokens.js --selftest # 断言器自证
 *   node scripts/validate-response-time-tokens.js --verbose
 * 退出码 0 = 通过；1 = 存在未闭合 token 或形近写法
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const SITE = path.join(ROOT, '_site');
const VERBOSE = process.argv.includes('--verbose');

const LEGAL = ['{RT}', '{RTG}', '{RTS}', '{RTSP}'];
const LEGAL_SET = new Set(LEGAL);
// 形近写法：内容必须是「rt + 至多 4 个字母/下划线」且允许两侧空格。
// ⚠️ 早期写成 `\{[A-Za-z_ ]{0,6}RT[A-Za-z_ ]{0,6}\}`（不分大小写）会误报：
//    `{% set _cert = ... %}` 里的 `{ _cert }` 含 "rt" → 假阳性。
const NEAR = /\{\s*RT[A-Za-z_]{0,4}\s*\}/gi;
// 合法 token 的精确串（大小写敏感）
const EXACT = new RegExp('\\{(?:RT|RTG|RTS|RTSP)\\}', 'g');

const SRC_EXT = new Set(['.njk', '.md', '.json', '.html', '.txt', '.xml', '.yaml', '.yml']);
const TEXT_EXT = new Set(['.html', '.xml', '.txt']);
const SKIP_DIR = /(?:^|[\\/])(node_modules|\.git|_site[^\\/]*)(?:[\\/]|$)/;

function walk(d, out, extFilter) {
  let ents;
  try { ents = fs.readdirSync(d, { withFileTypes: true }); } catch (e) { return out; }
  for (const e of ents) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) { if (SKIP_DIR.test(p)) continue; walk(p, out, extFilter); }
    else if (!extFilter || extFilter.has(path.extname(e.name).toLowerCase())) out.push(p);
  }
  return out;
}
const rel = (f) => path.relative(ROOT, f).replace(/\\/g, '/');

/* 通用：在一个字符串里找形近非法 token */
function nearHits(s) {
  const out = [];
  NEAR.lastIndex = 0;
  let m;
  while ((m = NEAR.exec(s))) if (!LEGAL_SET.has(m[0])) out.push(m[0]);
  return out;
}

/* A. 源侧形近写法 */
function scanSource() {
  const bad = [];
  for (const f of walk(SRC, [], SRC_EXT)) {
    const txt = fs.readFileSync(f, 'utf8').replace(/^\uFEFF/, '');
    txt.split(/\r?\n/).forEach((line, i) => {
      const h = nearHits(line);
      for (const t of h) bad.push({ file: rel(f), line: i + 1, text: t, ctx: line.trim().slice(0, 140) });
    });
  }
  return bad;
}

/* B1. 产物里残留的合法 token 字面量（全扩展名） */
function scanOutputExact() {
  const bad = [];
  if (!fs.existsSync(SITE)) return bad;
  for (const f of walk(SITE, [], null)) {
    let buf;
    try { buf = fs.readFileSync(f); } catch (e) { continue; }
    if (buf.length > 16 * 1024 * 1024) continue;
    const txt = buf.toString('utf8');
    if (txt.indexOf('{RT') === -1) continue;
    EXACT.lastIndex = 0;
    let m;
    while ((m = EXACT.exec(txt))) {
      bad.push({ file: rel(f), text: m[0], ctx: txt.slice(Math.max(0, m.index - 60), m.index + 60).replace(/\s+/g, ' ') });
      if (bad.length > 200) return bad;
    }
  }
  return bad;
}

/* B2. 文本产物里的形近写法 */
function scanOutputNear() {
  const bad = [];
  if (!fs.existsSync(SITE)) return bad;
  for (const f of walk(SITE, [], TEXT_EXT)) {
    const txt = fs.readFileSync(f, 'utf8');
    if (!/\{.{0,6}rt/i.test(txt)) continue;
    for (const t of nearHits(txt)) {
      const at = txt.toLowerCase().indexOf(t.toLowerCase());
      bad.push({ file: rel(f), text: t, ctx: txt.slice(Math.max(0, at - 60), at + 60).replace(/\s+/g, ' ') });
    }
    if (bad.length > 200) return bad;
  }
  return bad;
}

/* ── 断言器自证：坏样本必失败 / 好样本必通过 ─────────────────────── */
if (process.argv.includes('--selftest')) {
  const cases = [
    ['{RT}', false], ['{RTG}', false], ['{RTS}', false], ['{RTSP}', false],
    ['{ RT }', true], ['{  RTS  }', true],
    ['{RTx}', true], ['{rt}', true], ['{ RTS }', true], ['{RTS_}', true],
    ['{RTGG}', true], ['{rtsp}', true],
    ['{4 hours}', false], ['{4 horas}', false], ['{4 часа}', false],
    ['{"a":1}', false], ['{color}', false], ['{start}', false],
    // ⚠️ 真实假阳性回归样本：trust-bar.njk 里的 `{% set _cert = ... %}` → `{ _cert }`
    ['{% set _cert = x %}', false], ['{ _cert }', false], ['{target}', false],
  ];
  let fail = 0;
  for (const [s, wantBad] of cases) {
    const found = nearHits(s);
    const gotBad = found.length > 0;
    const ok = gotBad === wantBad;
    if (!ok) fail++;
    console.log((ok ? '  ✅' : '  ❌') + '  ' + JSON.stringify(s) + '  期望' + (wantBad ? '非法' : '合法') + '  实得' + (gotBad ? '非法(' + found.join(',') + ')' : '合法'));
  }
  console.log(fail
    ? '\n[selftest] ❌ ' + fail + '/' + cases.length + ' 个断言失败 —— 校验器本身不可信'
    : '\n[selftest] ✅ ' + cases.length + '/' + cases.length + ' —— 坏样本必失败、好样本必通过');
  process.exit(fail ? 1 : 0);
}

const srcBad = scanSource();
const outExact = scanOutputExact();
const outNear = scanOutputNear();

console.log('=== 响应时间 token 闭合性校验 ===');
console.log('  A. 源侧形近写法（src/**，应 0）');
if (!srcBad.length) console.log('     ✅ 0 处 —— 只有 {RT} {RTG} {RTS} {RTSP} 四种 token');
else {
  console.log('     ❌ ' + srcBad.length + ' 处 —— 转换器不会替换这些写法');
  srcBad.slice(0, 20).forEach((x) => console.log('        ' + x.file + ':' + x.line + '  "' + x.text + '"' + (VERBOSE ? '\n            ' + x.ctx : '')));
}
console.log('  B1. 产物残留合法 token（_site/**，全扩展名，应 0）');
if (!outExact.length) console.log('     ✅ 0 处');
else {
  console.log('     ❌ ' + outExact.length + ' 处');
  outExact.slice(0, 20).forEach((x) => console.log('        ' + x.file + '  "' + x.text + '"' + (VERBOSE ? '\n            …' + x.ctx + '…' : '')));
}
console.log('  B2. 产物形近写法（_site/**/*.{html,xml,txt}，应 0）');
if (!outNear.length) console.log('     ✅ 0 处');
else {
  console.log('     ❌ ' + outNear.length + ' 处');
  outNear.slice(0, 20).forEach((x) => console.log('        ' + x.file + '  "' + x.text + '"'));
}
process.exit(srcBad.length || outExact.length || outNear.length ? 1 : 0);
