#!/usr/bin/env node
/**
 * validate-cta-labels.js — ctaLabel 主题分流校验器
 *
 * 单一真源：src/_data/cta-labels.json（桶 → 语言 → 标签）
 *
 * 两条判据：
 *   A. 每篇 blog 文章的 ctaLabel 必须等于其语言的某个规范标签
 *      （即 ∈ SSOT[*][lang]）—— 拦住「无差别泛标签」与拼写漂移
 *   B. 同一篇文章的各语言版本必须落在同一个桶
 *      （用 EN 的 canonical/dePath/esPath/frPath/plPath/ruPath 分组）
 *      —— 拦住「英文按验厂、法文按认证」这类跨语言裂缝
 *
 * 用法：node scripts/validate-cta-labels.js [--json]
 * 退出码：0 = 通过，1 = 有违规
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const SSOT = JSON.parse(fs.readFileSync(path.join(SRC, '_data', 'cta-labels.json'), 'utf8'));

const LANGS = ['en', 'de', 'es', 'fr', 'pl', 'ru'];
const DIRS = { en: 'blog', de: 'de/blog', es: 'es/blog', fr: 'fr/blog', pl: 'pl/blog', ru: 'ru/blog' };
const PATH_FIELD = { de: 'dePath', es: 'esPath', fr: 'frPath', pl: 'plPath', ru: 'ruPath' };

// 反查表：lang -> label -> bucket
const labelToBucket = {};
for (const lang of LANGS) {
  labelToBucket[lang] = new Map();
  for (const [bucket, byLang] of Object.entries(SSOT)) {
    const lab = byLang[lang];
    if (!lab) continue;
    if (labelToBucket[lang].has(lab) && labelToBucket[lang].get(lab) !== bucket) {
      console.error(`[SSOT 自检失败] ${lang} 标签「${lab}」同时属于 ${labelToBucket[lang].get(lab)} 与 ${bucket}`);
      process.exit(2);
    }
    labelToBucket[lang].set(lab, bucket);
  }
}

function frontMatter(s) {
  const m = s.match(/^---\n([\s\S]*?)\n---/);
  return m ? m[1] : '';
}
function field(s, name) {
  const m = s.match(new RegExp('^' + name + ':\\s*(.*)$', 'm'));
  return m ? m[1].trim().replace(/^"|"$/g, '') : null;
}

const articles = [];
for (const lang of LANGS) {
  const base = path.join(SRC, DIRS[lang]);
  if (!fs.existsSync(base)) continue;
  for (const e of fs.readdirSync(base, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    const abs = path.join(base, e.name, 'index.njk');
    if (!fs.existsSync(abs)) continue;
    const s = fs.readFileSync(abs, 'utf8');
    const m = s.match(/set ctaLabel = "([^"]*)"/);
    const head = frontMatter(s);
    articles.push({
      lang,
      slug: e.name,
      rel: path.relative(SRC, abs).replace(/\\/g, '/'),
      label: m ? m[1] : null,
      bucket: m ? (labelToBucket[lang].get(m[1]) || null) : null,
      canonical: field(head, 'canonical'),
      paths: Object.fromEntries(Object.entries(PATH_FIELD).map(([l, f]) => [l, field(head, f)])),
    });
  }
}

const violations = [];
// 判据 A
for (const a of articles) {
  if (a.label == null) violations.push({ kind: 'A', rel: a.rel, msg: '缺 ctaLabel' });
  else if (a.bucket == null) {
    violations.push({ kind: 'A', rel: a.rel, msg: `ctaLabel「${a.label}」不是 ${a.lang} 的规范标签（应为 ${Object.keys(SSOT).join('/')} 之一）` });
  }
}

// 判据 B：跨语言同桶
const byRel = new Map(articles.map((a) => [a.rel, a]));
for (const en of articles.filter((a) => a.lang === 'en')) {
  if (!en.bucket) continue;
  for (const lang of LANGS) {
    if (lang === 'en') continue;
    const p = en.paths[lang];
    if (!p) continue;
    const rel = `${lang}/${String(p).replace(/^\/|\/$/g, '')}/index.njk`;
    const other = byRel.get(rel);
    if (!other) continue;
    if (other.bucket && other.bucket !== en.bucket) {
      violations.push({ kind: 'B', rel: other.rel, msg: `跨语言不同桶：en=${en.bucket} vs ${lang}=${other.bucket}（en 文件 ${en.rel}）` });
    }
  }
}

const json = process.argv.includes('--json');
if (json) {
  console.log(JSON.stringify({ total: articles.length, violations }, null, 2));
} else {
  console.log('=== ctaLabel 主题分流校验 ===');
  console.log(`SSOT 桶: ${Object.keys(SSOT).join(', ')}`);
  console.log(`扫描文章: ${articles.length}（${LANGS.map((l) => l + ':' + articles.filter((a) => a.lang === l).length).join(' ')}）`);
  const dist = {};
  for (const a of articles) if (a.bucket) dist[a.bucket] = (dist[a.bucket] || 0) + 1;
  console.log('桶分布:', JSON.stringify(dist));
  if (violations.length) {
    console.log(`\n违规 ${violations.length} 项：`);
    for (const v of violations) console.log(`  [${v.kind}] ${v.rel} — ${v.msg}`);
  }
  console.log(violations.length ? '\n[validate-cta-labels] FAIL' : '\n[validate-cta-labels] PASS');
}
process.exit(violations.length ? 1 : 0);
