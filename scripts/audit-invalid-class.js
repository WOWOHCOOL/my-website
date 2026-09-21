/**
 * audit-invalid-class.js — 全站「写了但不生效」的 Tailwind 类审计
 *
 * 为什么需要它：Tailwind 对不存在的工具类 / 非法的透明度修饰符**静默不生成任何 CSS**，
 * 页面照常渲染、门禁照常 PASS，只有肉眼才能看出「这个元素根本没上色」。
 * 本项目实测踩过的坑：
 *   · `pl-13`（spacing 无 13 档）→ 搜索框图标压住占位文字
 *   · `bg-brandBlue-400/20`（brandBlue 无色阶）→ 192 个 blog 页的装饰光斑完全不可见
 *   · `bg-brandOrange/8` · `bg-blue-500/6` · `shadow-brandOrange/05`
 *     （不透明度修饰符只接受 5 的倍数）→ 同样静默失效
 *   · `sm:rows-3`（Tailwind 无 rows-* 工具类）
 *   · `prose` / `prose-slate` / `prose-lg`（未安装 @tailwindcss/typography）
 *
 * 用法：node scripts/audit-invalid-class.js
 *   需先跑过一次完整构建（产物 `_site/` 与 `css/styles.css` 必须是最新的）。
 *
 * ⚠️ 实现要点（别改坏）：
 *   1. **必须解码 CSS 里的数字十六进制转义**：`.2xl\:text-6xl` 在产物里写作
 *      `.\32 xl\:text-6xl`；不解码会把所有 `2xl:*` / `3xl:*` 误报成失效类。
 *   2. 页面内联 `<style>` 里定义的类也要算作「已定义」。
 *   3. `icon-*` 是 SVG sprite 的标记类（sprite 脚本按 `icon-` 前缀收集 symbol），
 *      **不是** Tailwind 类，必须排除，否则会有 160+ 条噪音。
 *   4. 判定某个可疑类是否真失效，最可靠的办法是「最小探针」：
 *        npx tailwindcss -c tailwind.config.js -i <只含 @tailwind utilities; 的 css> \
 *          -o out.css --content probe.html
 *      看 out.css 里到底有没有生成对应规则。
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SITE = path.join(ROOT, '_site');
const CSS_FILE = path.join(ROOT, 'css', 'styles.css');
const SRC_CSS = path.join(ROOT, 'css', 'src.css');

if (!fs.existsSync(SITE) || !fs.existsSync(CSS_FILE)) {
  console.error('缺少 _site/ 或 css/styles.css —— 请先跑一次构建。');
  process.exit(1);
}
const CSS = fs.readFileSync(CSS_FILE, 'utf8');
const SRC_CSS_TXT = fs.readFileSync(SRC_CSS, 'utf8');

const unescapeSel = s =>
  s.replace(/\\([0-9a-fA-F]{1,6}) ?/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
   .replace(/\\(.)/g, '$1');

const SEL_RE = /\.((?:\\[0-9a-fA-F]{1,6} ?|\\.|[a-zA-Z0-9_-])+)/g;
const cssClasses = new Set();
for (const m of CSS.matchAll(SEL_RE)) cssClasses.add(unescapeSel(m[1]));

const pages = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.html')) pages.push(p);
  }
})(SITE);

// 页面内联 <style> 定义的类也算已定义
const inlineDefined = new Set();
for (const f of pages) {
  const h = fs.readFileSync(f, 'utf8');
  for (const st of h.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) {
    for (const m of st[1].matchAll(SEL_RE)) inlineDefined.add(unescapeSel(m[1]));
  }
}

const missing = new Map();
for (const f of pages) {
  const rel = path.relative(SITE, f).replace(/\\/g, '/');
  const h = fs.readFileSync(f, 'utf8');
  for (const m of h.matchAll(/class="([^"]*)"/g)) {
    for (const raw of m[1].split(/\s+/)) {
      if (!raw || cssClasses.has(raw) || inlineDefined.has(raw)) continue;
      if (!missing.has(raw)) missing.set(raw, { count: 0, files: new Set(), sample: rel });
      const o = missing.get(raw); o.count++; o.files.add(rel);
    }
  }
}

// 已知的非 Tailwind 类：sprite 标记 / JS 钩子 / 语义钩子 / 任意值语法 / src.css 自定义组件
const RULES = [
  ['A. SVG sprite 标记（icon-*，非 Tailwind 类）', c => /^icon-[a-z0-9-]+$/.test(c)],
  ['B. JS / 语义钩子', c => /^(js-|data-|is-|has-)/.test(c) ||
    ['lang-switch', 'submenu-icon', 'search-hint', 'faq-question', 'speakable', 'no-results',
     'filter-chip', 'reveal', 'group', 'peer', 'sr-only', 'counter'].includes(c)],
  ['C. 任意值语法 [..]', c => /\[|\]/.test(c)],
  ['D. css/src.css 里定义的自定义组件类', c => SRC_CSS_TXT.includes('.' + c)],
];

const buckets = new Map();
const suspect = [];
for (const [c, v] of missing) {
  const hit = RULES.find(([, fn]) => fn(c));
  if (hit) {
    if (!buckets.has(hit[0])) buckets.set(hit[0], 0);
    buckets.set(hit[0], buckets.get(hit[0]) + 1);
  } else {
    suspect.push([c, v.count, v.files.size, v.sample]);
  }
}

console.log('=== 已归类的非 Tailwind 类（正常）===');
for (const [name, n] of buckets) console.log(`  ${name}: ${n} 个`);

console.log('\n=== 可疑：产物里用了、CSS 里没有定义 ===');
if (!suspect.length) {
  console.log('  0 个 —— 无失效类');
} else {
  suspect.sort((a, b) => b[1] - a[1]);
  for (const [c, n, nf, sample] of suspect) {
    console.log(`  x${n} (${nf} 文件)  ${c}`);
    console.log(`      e.g. ${sample}`);
  }
  console.log('\n⚠️ 逐条用「最小探针」确认（见文件头注释第 4 点）后再决定修 or 删。');
}
