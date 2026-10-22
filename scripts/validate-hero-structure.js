'use strict';
/**
 * validate-hero-structure.js — 六语言首页 hero 结构一致性（门禁，只读）
 *
 * 为什么需要它：
 *   2026-10-22 审查发现首页 hero 存在**三套并存**的实现：
 *     · DE / ES / FR / RU —— 定型版（.hero-title + .hero-subtitle + .btn-pair + trust-badge）
 *     · EN               —— 遗留版（.hero-viewport 体系 + 内联 text-4xl + 12px <ul>）
 *     · PL               —— 另一套遗留版（同为 .hero-viewport，字号写法又不同）
 *   后果不是"不好看"，是**首屏 CTA 被 Cookie 横幅吃掉**：实测 390×844 下
 *   EN 遮 78%、PL 遮 115%；1366×768 下 EN 遮 130%。换成定型版后回到横幅之上。
 *   本脚本把「六语言 hero 必须是同一套骨架」变成可执行断言，防止再次漂移。
 *
 * ⚠️ 命名是 validate- 而不是 audit-：本脚本**失败时退出码 1**，属门禁；
 *    仓库约定 `scripts/audit-*.js` 与 `audits/` 一律 gitignore（本地巡检用），
 *    写成 audit- 会被忽略、无法随仓库分发，prepush 引用它就会在别人机器上报错。
 *
 * 判定口径（只看结构，不看文案）：
 *   ① 必须命中定型骨架的 5 个标记
 *   ② 不得残留遗留体系（.hero-viewport / .hero-layout / .hero-text-col / .hero-img-col）
 *   ③ h1 不得再写死内联字号（text-4xl / text-5xl / text-[…]）—— 必须走 .hero-title
 * 文案差异**不在**本脚本管辖范围：各语言 h1 / 副标题 / trust-badge 文字本来就该不同
 * （例如 PL 的 trust-badge 里嵌了 UOKiK 合规外链，DE 没有）。结构统一 ≠ 文案统一。
 *
 * 退出码：0 = 一致；1 = 有漂移（供 prepush 阻断）
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

const HOMES = ['src/index.njk', 'src/de/index.njk', 'src/es/index.njk', 'src/fr/index.njk', 'src/ru/index.njk', 'src/pl/index.njk'];

// 定型骨架：标记 → 人类可读说明
const REQUIRED = [
  ['id="hero"', 'hero section 缺 id="hero"'],
  ['min-height:100dvh', 'hero 缺 min-height:100dvh'],
  ['class="hero-title', 'h1 未使用 .hero-title（内联字号会导致各语言断行不一致）'],
  ['class="hero-subtitle', '副标题未使用 .hero-subtitle'],
  ['class="btn-pair', '按钮行未使用 .btn-pair（移动端等宽等高 / 桌面并排不等宽）'],
];
// 遗留体系：命中即失败
const LEGACY = ['hero-viewport', 'hero-layout', 'hero-text-col', 'hero-img-col'];

let bad = 0;
for (const rel of HOMES) {
  const fp = path.join(ROOT, rel);
  if (!fs.existsSync(fp)) { console.log('  ! 缺文件 ' + rel); bad++; continue; }
  const src = fs.readFileSync(fp, 'utf8');

  // 只取 hero 段落（从 id="hero" 到 </section>），避免误伤页面其他 <h1>
  const start = src.indexOf('id="hero"');
  if (start === -1) { console.log('  ! ' + rel + ' 找不到 id="hero"'); bad++; continue; }
  const end = src.indexOf('</section>', start);
  const hero = src.slice(start, end === -1 ? undefined : end);

  const problems = [];
  for (const [needle, msg] of REQUIRED) if (!hero.includes(needle)) problems.push(msg);
  for (const legacy of LEGACY) if (hero.includes(legacy)) problems.push('残留遗留类 .' + legacy);

  const h1 = hero.match(/<h1[^>]*>/);
  if (h1) {
    // 只拦**遗留的固定档**（text-4xl/5xl/6xl = 36/48/60px 写死）。
    // `lg:text-[2.375rem]` 这类 arbitrary 值是各语言的**断行调档**，属正当差异，
    // 不拦 —— 例如 RU 用 2.125/2.375、DE/ES/FR/PL 用 2.375/2.875。
    if (/text-(4xl|5xl|6xl)\b/.test(h1[0])) problems.push('h1 仍用遗留固定档：' + h1[0].slice(0, 80));
    if (!/class="hero-title/.test(h1[0])) problems.push('h1 缺 .hero-title 基类');
  }

  const badges = (hero.match(/class="trust-badge"/g) || []).length;
  if (badges < 3) problems.push('trust-badge 少于 3 条（当前 ' + badges + '）');

  if (problems.length) {
    bad++;
    console.log('  ✗ ' + rel);
    problems.forEach(p => console.log('      · ' + p));
  } else {
    console.log('  ✓ ' + rel + '  (' + badges + ' 条 trust-badge)');
  }
}

console.log('');
if (bad) {
  console.log('[validate-hero-structure] 漂移 ' + bad + ' / ' + HOMES.length + ' —— 六语言首页 hero 结构不一致');
  console.log('  定型骨架：badge → h1.hero-title → p.hero-subtitle → .btn-pair → .trust-badge ×3');
  console.log('  参考实现：src/de/index.njk（ES/FR/RU 与它同构）');
  process.exit(1);
}
console.log('[validate-hero-structure] PASS — ' + HOMES.length + ' 个首页 hero 结构一致');
