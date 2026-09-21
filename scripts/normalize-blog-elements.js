/* blog 文章页「元素级」统一器（默认 dry-run，不写文件）
 *
 * 硬约束：**明文零变更** —— 每次变换后，剥离全部标签后的可见文本必须逐字节相同。
 * 用法：
 *   node scripts/normalize-blog-elements.js            # dry-run，只报告
 *   node scripts/normalize-blog-elements.js --apply    # 实际写入
 *   node scripts/normalize-blog-elements.js --only=C   # 只跑规则 C
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const APPLY = process.argv.includes('--apply');
const onlyArg = (process.argv.find((a) => a.startsWith('--only=')) || '').split('=')[1];
const ONLY = onlyArg ? onlyArg.split(',') : null;
const fileArg = (process.argv.find((a) => a.startsWith('--file=')) || '').split('=')[1];

/* ---------- 工具 ---------- */

// 可见文本指纹：剥离标签 + 注释 + Nunjucks，压缩空白
function textFingerprint(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// 找某个 section 的起止（深度跟踪）
function findSection(content, id) {
  const re = new RegExp('<section[^>]*id="' + id + '"[^>]*>', 'g');
  const m = re.exec(content);
  if (!m) return null;
  const start = m.index;
  let depth = 1, i = m.index + m[0].length;
  while (depth > 0 && i < content.length) {
    const open = content.indexOf('<section', i);
    const close = content.indexOf('</section>', i);
    if (close === -1) return null;
    if (open !== -1 && open < close) { depth++; i = open + 8; }
    else { depth--; if (depth === 0) return { start, openEnd: m.index + m[0].length, closeStart: close, closeEnd: close + 10 }; i = close + 10; }
  }
  return null;
}

// 找某标签的匹配闭合位置（同名标签深度跟踪）
function findCloseTag(content, tagName, openStart) {
  const openRe = new RegExp('<' + tagName + '\\b', 'gi');
  const closeRe = new RegExp('</' + tagName + '>', 'gi');
  let depth = 1;
  let i = content.indexOf('>', openStart) + 1;
  while (depth > 0 && i < content.length) {
    openRe.lastIndex = i; closeRe.lastIndex = i;
    const o = openRe.exec(content);
    const c = closeRe.exec(content);
    if (!c) return -1;
    if (o && o.index < c.index) { depth++; i = o.index + 1; }
    else { depth--; if (depth === 0) return c.index; i = c.index + 1; }
  }
  return -1;
}

/* ---------- 规则 ---------- */

const RULES = {};

// E: CTA —— `<div>` 承载 → 主流 `<section>`
RULES.E = {
  name: 'CTA 元素类型 div → section',
  apply(content) {
    const open = '<div class="relative bg-gradient-to-br from-brandBlue to-slate-800 rounded-3xl p-10 text-center overflow-hidden">';
    const idx = content.indexOf(open);
    if (idx < 0) return null;
    if (content.indexOf(open, idx + 1) >= 0) return null; // 出现多次，跳过（需人工）
    const closeIdx = findCloseTag(content, 'div', idx);
    if (closeIdx < 0) return null;
    const newOpen = '<section class="relative bg-gradient-to-br from-brandBlue to-slate-800 rounded-3xl p-10 text-center overflow-hidden">';
    // 从后往前：先改闭合，再改开标签
    let out = content.slice(0, closeIdx) + '</section>' + content.slice(closeIdx + 6);
    out = out.slice(0, idx) + newOpen + out.slice(idx + open.length);
    return out;
  },
};

// H: faq —— 卡片类写在 section 上 → 主流（section 约束 + 内层卡片 div）
RULES.H = {
  name: 'faq 卡片类归位（section → 约束 + 内层卡片 div）',
  apply(content) {
    const m = content.match(/<section id="faq" class="[^"]*bg-slate-50[^"]*">/);
    if (!m) return null;
    const s = findSection(content, 'faq');
    if (!s) return null;
    const newOpen = '<section id="faq" class="max-w-4xl mx-auto px-6 mb-16">\n'
      + '<div class="bg-slate-50 rounded-2xl p-8 border border-slate-200 shadow-sm">';
    let out = content.slice(0, s.closeStart) + '</div>\n' + content.slice(s.closeStart);
    out = out.replace(m[0], newOpen);
    return out;
  },
};

// C: author-bio —— 卡片类搬到 section 上 → 还原为主流（section 约束 + 内层卡片 div）
RULES.C = {
  name: 'author-bio 全宽卡片 → 主流（约束 + 内层卡片 div）',
  apply(content) {
    // 泛化：只要 section 的 class 里含 bg-slate-50（= 卡片类被搬到了 section 上）就归一
    const m = content.match(/<section id="author-bio" class="[^"]*bg-slate-50[^"]*">/);
    if (!m) return null;
    const oldOpen = m[0];
    const s = findSection(content, 'author-bio');
    if (!s) return null;
    const newOpen = '<section id="author-bio" class="max-w-4xl mx-auto px-6 mb-12">\n'
      + '<div class="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-100">';
    // 从后往前改：先插 </div>，再替换开标签
    let out = content.slice(0, s.closeStart) + '</div>\n' + content.slice(s.closeStart);
    out = out.replace(oldOpen, newOpen);
    return out;
  },
};

// D: article class —— 去掉 blog-content / card-ganoem
RULES.D = {
  name: 'article class 归一（去掉 blog-content / card-ganoem）',
  apply(content) {
    let out = content;
    let hit = false;
    for (const oldS of ['<article class="pb-12 blog-content card-ganoem">', '<article class="pb-12 blog-content">']) {
      if (out.includes(oldS)) { out = out.split(oldS).join('<article class="pb-12">'); hit = true; }
    }
    return hit ? out : null;
  },
};

// F: sources —— mb-16 → mb-12，去掉 id="sources"
RULES.F = {
  name: 'sources 区归一（mb-16→mb-12，去 id）',
  apply(content) {
    const oldS = '<section id="sources" class="max-w-4xl mx-auto px-6 mb-16">';
    if (!content.includes(oldS)) return null;
    return content.split(oldS).join('<section class="max-w-4xl mx-auto px-6 mb-12">');
  },
};

/* ---------- 主流程 ---------- */

const LANGS = ['en', 'de', 'es', 'fr', 'ru', 'pl'];
const files = [];
for (const lg of LANGS) {
  const dir = path.join(ROOT, 'src', lg === 'en' ? 'blog' : lg + '/blog');
  if (!fs.existsSync(dir)) continue;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    const p = path.join(dir, e.name, 'index.njk');
    if (fs.existsSync(p)) {
      const rel = path.relative(ROOT, p).split(path.sep).join('/');
      if (fileArg && !rel.includes(fileArg)) continue;
      files.push({ rel, p });
    }
  }
}

console.log('blog 文章源文件：' + files.length + ' 个\n');
const active = Object.keys(RULES).filter((k) => !ONLY || ONLY.includes(k));
const summary = {};
let changedFiles = 0, failText = 0;

for (const f of files) {
  const before = fs.readFileSync(f.p, 'utf8');
  const fpBefore = textFingerprint(before);
  let cur = before;
  const hits = [];

  for (const k of active) {
    const res = RULES[k].apply(cur);
    if (res && res !== cur) { cur = res; hits.push(k); }
  }
  if (!hits.length) continue;

  const fpAfter = textFingerprint(cur);
  if (fpAfter !== fpBefore) {
    console.log('❌ 明文被改动，拒绝: ' + f.rel);
    failText++;
    continue;
  }

  changedFiles++;
  hits.forEach((h) => { summary[h] = (summary[h] || 0) + 1; });
  console.log((APPLY ? '✅ ' : '·  ') + f.rel + '   [' + hits.join(',') + ']');
  if (APPLY) fs.writeFileSync(f.p, cur);
}

console.log('\n=== 汇总 ===');
for (const k of active) console.log('  规则 ' + k + '  ' + RULES[k].name + '  → ' + (summary[k] || 0) + ' 页');
console.log('  受影响文件: ' + changedFiles);
if (failText) console.log('  ⚠️ 明文变更被拒: ' + failText + ' 个');
console.log(APPLY ? '\n（已写入）' : '\n（dry-run，未写入任何文件）');
