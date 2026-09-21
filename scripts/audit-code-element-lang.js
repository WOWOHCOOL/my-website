/* 代码元素「EN/中性 vs 本土化」合规审计（只读）
 *
 * 判据：机器读的 → EN/中性；人/搜索引擎读的 → 本土化
 *
 * 检查项：
 *  ① 类名含非 ASCII（类名被本地化 = 违规）
 *  ② data-* 键名含非 ASCII（键名被本地化 = 违规）
 *  ③ 结构性锚点跨语言不一致（应为固定值）
 *  ④ aria-label 残留英文（非 EN 页出现 EN 页同款英文短语 = 违规）
 *  ⑤ alt 残留英文（同上）
 *  ⑥ data-* 键名集合跨语言不一致（某语言独有键 = 可疑）
 *  ⑦ 内容锚点 id 残留英文（非 EN 页的 id 是纯英文单词 = 可疑）
 *
 * 用法：node scripts/audit-code-element-lang.js
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '_site');
const LANGS = ['en', 'de', 'es', 'fr', 'ru', 'pl'];

// 结构性锚点（代码契约 → 必须跨语言固定）
const STRUCTURAL_IDS = ['faq', 'author-bio', 'related-articles', 'hero-section', 'inquiryModal', 'specs', 'toc'];

// 跨语言共用的专有名词（出现在 aria-label/alt 里属正常）
const PROPER = /^(WOWOHCOOL|Facebook|LinkedIn|YouTube|Instagram|XING|X|Twitter|Qi2|MagSafe|USB|Type-C|GaN|OEM|ODM|WhatsApp|WPC|UN38\.3|CE|RoHS|FCC|PSE|KC|ABS|PC|PVC|LED|UV|TPE|WOC\d+|WOP\d+|WOW\d+|S25 Ultra|Pixel 10 Pro|Apple Watch)/i;

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

const files = LANGS.flatMap((l) => {
  const d = l === 'en' ? ROOT : path.join(ROOT, l);
  if (!fs.existsSync(d)) return [];
  // ⚠️ 仅 EN 需要排除子目录（EN 的根目录下同时挂着 de/ es/ fr/ ru/ pl/）；
  //    非 EN 语言的目录本身就是 _site/<lang>/，不能误伤。
  const skip = l === 'en' ? new Set(LANGS.filter((x) => x !== 'en')) : new Set();
  return walk(d)
    .filter((f) => {
      const rel = path.relative(ROOT, f).replace(/\\/g, '/');
      return !skip.has(rel.split('/')[0]);
    })
    .map((f) => ({ lang: l, f }));
});

// ---- 收集 ----
const badClass = [];            // ①
const badDataKey = [];          // ②
const ariaByLang = {};          // ④
const altByLang = {};           // ⑤
const dataKeysByLang = {};      // ⑥
const structuralMiss = {};      // ③  id → Set(lang)
const englishIds = [];          // ⑦
LANGS.forEach((l) => { ariaByLang[l] = new Set(); altByLang[l] = new Set(); dataKeysByLang[l] = new Set(); });

// 结构性锚点应在这些「页型」出现：每语言抽查有 faq 的页
for (const { lang, f } of files) {
  const html = fs.readFileSync(f, 'utf8');
  const rel = path.relative(ROOT, f).replace(/\\/g, '/');

  // ① 类名非 ASCII
  for (const m of html.matchAll(/class="([^"]*)"/g)) {
    const v = m[1];
    if (/[^\x00-\x7F]/.test(v)) badClass.push({ rel, v: v.slice(0, 80) });
  }
  // ② data-* 键名非 ASCII + ⑥ 键名集合（⚠️ 必须要求后面跟 `=`，否则正文里的 "data-driven" 会被误判）
  for (const m of html.matchAll(/\s(data-[a-zA-Z0-9-]+)\s*=/g)) {
    const k = m[1];
    if (/[^\x00-\x7F]/.test(k)) badDataKey.push({ rel, k });
    dataKeysByLang[lang].add(k);
  }
  // ④ aria-label
  for (const m of html.matchAll(/aria-label="([^"]*)"/g)) ariaByLang[lang].add(m[1]);
  // ⑤ alt
  for (const m of html.matchAll(/\salt="([^"]*)"/g)) if (m[1].trim()) altByLang[lang].add(m[1]);
  // ③ 结构性锚点
  const ids = new Set([...html.matchAll(/\sid="([^"]*)"/g)].map((m) => m[1]));
  for (const s of STRUCTURAL_IDS) {
    if (!structuralMiss[s]) structuralMiss[s] = {};
    if (ids.has(s)) structuralMiss[s][lang] = (structuralMiss[s][lang] || 0) + 1;
  }
  // ⑦ 非 EN 页上的「纯英文单词」id
  if (lang !== 'en') {
    for (const id of ids) {
      if (/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(id) && id.length >= 5 && !STRUCTURAL_IDS.includes(id)) {
        // 只报「明显英文词」的：不含该语言常见词尾特征且命中英文词表
        if (/^(benefits|features|specs|specifications|contact|overview|process|gallery|timeline|pricing|downloads|case-studies|why-us|visit-us|our-team|payment|production|quality|compliance|story|services|capabilities|comparison|checklist|faq-section)$/.test(id)) {
          englishIds.push({ rel, id });
        }
      }
    }
  }
}

const line = (s) => console.log(s);

line('=== ① 类名含非 ASCII（应 0）===');
line(badClass.length === 0 ? '  ✅ 0 处' : `  ❌ ${badClass.length} 处`);
badClass.slice(0, 10).forEach((x) => line(`     ${x.rel}  →  ${x.v}`));

line('\n=== ② data-* 键名含非 ASCII（应 0）===');
line(badDataKey.length === 0 ? '  ✅ 0 处' : `  ❌ ${badDataKey.length} 处`);
badDataKey.slice(0, 10).forEach((x) => line(`     ${x.rel}  →  ${x.k}`));

line('\n=== ⑥ data-* 键名集合跨语言一致性 ===');
const allKeys = new Set(Object.values(dataKeysByLang).flatMap((s) => [...s]));
const onlyOne = [...allKeys].filter((k) => LANGS.filter((l) => dataKeysByLang[l].has(k)).length === 1);
line(`  全站键名 ${allKeys.size} 个 · 仅出现在单一语言的 ${onlyOne.length} 个`);
onlyOne.forEach((k) => line(`     ${k}  →  仅 ${LANGS.filter((l) => dataKeysByLang[l].has(k)).join(',')}`));

line('\n=== ③ 结构性锚点跨语言覆盖 ===');
for (const [id, by] of Object.entries(structuralMiss)) {
  const present = LANGS.filter((l) => by[l]);
  line(`  ${id.padEnd(18)} ${present.length}/6 语言  ${JSON.stringify(by)}`);
}

line('\n=== ④ aria-label：非 EN 页上出现「EN 页同款」的值 ===');
const enAria = ariaByLang.en;
for (const l of LANGS.filter((x) => x !== 'en')) {
  const shared = [...ariaByLang[l]].filter((v) => enAria.has(v) && !PROPER.test(v));
  line(`  ${l}: 与 EN 交集(排除专有名词) ${shared.length} 个`);
  shared.slice(0, 12).forEach((v) => line(`     "${v}"`));
}

line('\n=== ⑤ alt：非 EN 页上出现「EN 页同款」的值 ===');
const enAlt = altByLang.en;
for (const l of LANGS.filter((x) => x !== 'en')) {
  const shared = [...altByLang[l]].filter((v) => enAlt.has(v) && !PROPER.test(v) && /[a-z]{3}/.test(v));
  line(`  ${l}: ${shared.length} 个`);
  shared.slice(0, 8).forEach((v) => line(`     "${v}"`));
}

line('\n=== ⑦ 非 EN 页上的英文内容锚点 id（启发式，需人工判定）===');
line(englishIds.length === 0 ? '  ✅ 0 处' : `  ⚠️ ${englishIds.length} 处`);
englishIds.slice(0, 60).forEach((x) => line(`     ${x.rel}  →  #${x.id}`));
