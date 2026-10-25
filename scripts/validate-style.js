#!/usr/bin/env node
/**
 * validate-style.js — 文体标准（style-guide.md v2.1）机器可判项的校验器
 *
 * ── 为什么需要它 ────────────────────────────────────────────────
 * style-guide.md 被 4 个 slash command（article / optimize / rewrite / write）
 * 和 content-review agent 引用，但**没有任何程序执行它**。结果：
 *   `GAN` 16 处 · `QI2` 3 处 · `Qi 2` 2 处 · `Magsafe` 2 处
 *   `UN 38.3` 57 处 · `Co., Ltd` 63 处  仍在线上。
 * 规则只写在文档里 = 靠人记 = 必然漂移。本脚本把「能机器判的」挑出来执行。
 *
 * ── 设计原则 ───────────────────────────────────────────────────
 * 1) **默认只报告，退出码 0**。存量 205 篇有历史违规，一上来就阻断构建
 *    等于把 CI 变成红灯墙。要阻断请显式加 `--strict`（用于新内容准入）。
 * 2) **`--fix` 必须配 `--files=`**。政策（style-guide §0「机会式修复」）要求
 *    按页顺修、不单独批量清理，所以拒绝全站自动改写。
 * 3) **只自动修「纯正字法」项**：法定名 / UN38.3 / GaN / Qi2 / MagSafe。
 *    语义有风险的（`GaN III` → `GaN V`、`solid-state` → `semi-solid-state`）
 *    只报不修 —— 万一原文真在讲第 3 代或全固态，自动改就是造假。
 *
 * ── 用法 ───────────────────────────────────────────────────────
 *   node scripts/validate-style.js                    全站体检（不阻断）
 *   node scripts/validate-style.js --strict            有 error 则退出码 1
 *   node scripts/validate-style.js --json              机器可读
 *   node scripts/validate-style.js --files=src/blog/foo/index.njk
 *   node scripts/validate-style.js --fix --files=src/blog/foo/index.njk
 *   node scripts/validate-style.js --list-checks       打印规则表
 *
 * ── 覆盖边界（诚实声明，别指望它全干）──────────────────────────
 * 不检查：Title Case 是否真的 Title Case（需词性判断）、Oxford comma、
 *         硬数字是否该走 `{FACT:...}`（需知道哪个数字有对应键）、
 *         叙述质量、claim 是否有证据、内链锚文本是否描述性。
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src');

const argv = process.argv.slice(2);
const OPT = {
  fix: argv.includes('--fix'),
  json: argv.includes('--json'),
  strict: argv.includes('--strict'),
  verbose: argv.includes('--verbose'),
  quiet: argv.includes('--quiet'),
  listChecks: argv.includes('--list-checks'),
};
const filesArg = argv.find((a) => a.startsWith('--files='));
const FILES = filesArg
  ? filesArg
      .slice('--files='.length)
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
  : null;

const SKIP_DIRS = new Set(['node_modules', '_site', '.git', '.cache', '_keyword-monitoring', 'output']);
const EXT = new Set(['.njk', '.md', '.html', '.json']);

/* ────────────────────────── 规则表 ────────────────────────── */

const RULES = [
  {
    id: 'legal-name-comma',
    level: 'error',
    why: '法定名必须是 `Dong Yi Technology Co., Limited`（style-guide §0 Capitalization / features.md §1.6.2）',
    re: /Co\.,\s*Ltd\b\.?/g,
    fix: 'Co., Limited',
  },
  {
    id: 'legal-name-nocomma',
    level: 'error',
    why: '疑似法定名缺逗号 —— 需人工确认是否指本司（可能是别家公司的合法写法，故不自动改）',
    re: /\bCo\.?\s+Ltd\b\.?/g,
  },
  {
    id: 'gan-case',
    level: 'error',
    why: '`GaN` 必须大写 G、小写 a、大写 N（style-guide §0 Capitalization）',
    re: /\bGAN\b/g,
    fix: 'GaN',
  },
  {
    id: 'qi-space',
    level: 'error',
    why: '`Qi2` / `Qi2.2` 中间不许空格（style-guide §0 Capitalization）',
    re: /\bQi\s+(2(?:\.2)?)\b/g,
    fix: (m, v) => 'Qi' + v,
  },
  {
    id: 'qi-upper',
    level: 'error',
    why: '`Qi2` 的 i 必须小写（style-guide §0 Capitalization）',
    re: /\bQI(2(?:\.2)?)\b/g,
    fix: (m, v) => 'Qi' + v,
  },
  {
    id: 'magsafe-case',
    level: 'error',
    why: 'Apple 商标写法为 `MagSafe`（style-guide §0 Capitalization）',
    re: /\b(?:MAGSAFE|Magsafe|magSafe)\b/g,
    fix: 'MagSafe',
  },
  {
    id: 'un383-space',
    level: 'error',
    why: '`UN38.3` 无空格（style-guide §0 Industry Terms）',
    re: /\bUN\s+38\.3\b/g,
    fix: 'UN38.3',
  },
  {
    id: 'gan-generation',
    level: 'warn',
    why:
      '第 5 代写 `GaN V`，禁用 `GaN 5` / `GaN III` / `GaN 3rd gen`。' +
      '降为 warn 而非 error 的原因：讨论代际本身的文章（如 gan-generations-guide）' +
      '必须能写这些词；不自动改，因为自动替换会把「确实在讲第 3 代」改成立场相反的假话',
    re: /\bGaN\s+(?:5|III|3rd\s+gen)\b/g,
  },
  {
    id: 'internal-html-link',
    level: 'error',
    why: '内部链接用目录式 + 尾斜杠，不带 `.html`（Cloudflare Pages clean URL）',
    re: /href="(?!https?:|\/\/|mailto:|tel:|#)[^"]*\.html(?:[?#][^"]*)?"/g,
  },
  {
    id: 'markdown-html-link',
    level: 'error',
    why: '内部链接用目录式 + 尾斜杠，不带 `.html`',
    re: /\]\((?!https?:|\/\/|mailto:|#)[^)\s]*\.html(?:[?#][^)\s]*)?\)/g,
  },
  {
    id: 'solid-state-ambiguous',
    level: 'warn',
    why: '指半固态时必须写 `semi-solid-state`（两者是不同技术）；若原文确指全固态则保留',
    re: /(?<!semi-)(?<!Semi-)(?<!SEMI-)\bsolid[-\s]state\s+batter/gi,
  },
];

/* blog 文章 frontmatter 必填键（style-guide §0「内容机制」）
 * EN 41/41 篇 100% 覆盖 11 键；非 EN 用 `enPath` 替代 `topicLanding`
 * （实测 DE 33/33、ES/FR/PL/RU 同为 enPath，无一例外）。
 * 不要给非 EN 硬套 topicLanding —— 那 164 篇会全报错，且模板并不读这个键。
 */
const FM_REQUIRED_EN = [
  'title',
  'description',
  'date',
  'modified',
  'author',
  'articleSection',
  'articleTags',
  'topicLanding',
  'canonical',
  'ogImage',
  'navActive',
];
const FM_REQUIRED_LOCALE = FM_REQUIRED_EN.map((k) => (k === 'topicLanding' ? 'enPath' : k));

/* hreflang 同簇路径键。用途：区分「非 EN 的译文」与「非 EN 的单语原创」。
 * 实测 164 篇非 EN 里 6 篇（ES 3 / PL 1 / RU 2）没有任何 *Path 键 ——
 * 它们是单语原创，本来就没有 enPath，硬套必填会把合规内容判成违规。
 * 判据：有任意 *Path 键 = 同簇成员 ⇒ 必须有 enPath；一个都没有 = 单语原创 ⇒ 豁免。 */
const PATH_KEYS = ['enPath', 'dePath', 'esPath', 'frPath', 'plPath', 'ruPath'];

/* meta 长度口径（style-guide §0 SEO-Specific Style） */
const TITLE_MAX = 60;
const DESC_MIN = 120;
const DESC_MAX = 160;

/* ────────────────────────── 文件遍历 ────────────────────────── */

function walk(dir, out = []) {
  let ents;
  try {
    ents = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of ents) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      walk(p, out);
    } else if (EXT.has(path.extname(e.name))) {
      out.push(p);
    }
  }
  return out;
}

const rel = (p) => path.relative(ROOT, p).replace(/\\/g, '/');

/* ────────────────────────── frontmatter ────────────────────────── */

function readFrontmatter(text) {
  if (!text.startsWith('---')) return null;
  const end = text.indexOf('\n---', 3);
  if (end < 0) return null;
  const block = text.slice(3, end);
  const out = {};
  for (const line of block.split(/\r?\n/)) {
    const m = /^([A-Za-z_][\w-]*):\s*(.*)$/.exec(line);
    if (m) out[m[1]] = m[2].trim();
  }
  return out;
}

const unquote = (s) =>
  String(s || '')
    .replace(/^["']|["']$/g, '')
    .trim();

const isBlogArticle = (r) => /^src\/(?:[a-z]{2}\/)?blog\/[^/]+\/index\.(njk|md|html)$/.test(r);
const isEnArticle = (r) => /^src\/blog\/[^/]+\/index\.(njk|md|html)$/.test(r);

/* 把 HTML 注释整段替换为等长空白（保留换行），避免
 * `<!-- GAN GENERATIONS -->` 这类不可见文本被算成正文违规。
 * 等长替换保证行号不变。 */
function maskComments(text) {
  return text.replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, ' '));
}

/* ────────────────────────── 校验 ────────────────────────── */

const findings = []; // { file, line, rule, level, snippet }
let scanned = 0;

function record(file, line, rule, level, snippet) {
  findings.push({ file, line, rule, level, snippet: String(snippet).slice(0, 120) });
}

function checkText(file, text) {
  const lines = maskComments(text).split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;
    for (const r of RULES) {
      r.re.lastIndex = 0;
      if (!r.re.test(line)) continue;
      r.re.lastIndex = 0;
      let m;
      while ((m = r.re.exec(line)) !== null) {
        record(file, i + 1, r.id, r.level, m[0]);
        if (m[0].length === 0) r.re.lastIndex++;
      }
    }
  }
}

function checkFrontmatter(file, text) {
  const fm = readFrontmatter(text);
  if (!fm) return;
  if (isBlogArticle(file)) {
    if (isEnArticle(file)) {
      for (const k of FM_REQUIRED_EN) {
        if (!(k in fm)) record(file, 1, 'frontmatter-missing', 'error', `缺 ${k}`);
      }
    } else {
      const hasAnyPath = PATH_KEYS.some((k) => k in fm);
      for (const k of FM_REQUIRED_LOCALE) {
        if (!(k in fm)) {
          if (k === 'enPath' && !hasAnyPath) continue; // 单语原创，豁免
          record(file, 1, 'frontmatter-missing', 'error', `缺 ${k}`);
        }
      }
    }
  }
  const title = unquote(fm.title);
  if (title && title.length > TITLE_MAX) {
    record(file, 1, 'title-too-long', 'warn', `${title.length} chars > ${TITLE_MAX}`);
  }
  const desc = unquote(fm.description);
  if (desc) {
    if (desc.length > DESC_MAX) {
      record(file, 1, 'desc-too-long', 'warn', `${desc.length} chars > ${DESC_MAX}`);
    } else if (desc.length < DESC_MIN) {
      record(file, 1, 'desc-too-short', 'warn', `${desc.length} chars < ${DESC_MIN}`);
    }
  }
}

/* ────────────────────────── --fix ────────────────────────── */

function applyFix(file, text) {
  const fixable = RULES.filter((r) => r.fix);
  let out = text;
  const applied = [];
  for (const r of fixable) {
    r.re.lastIndex = 0;
    const before = out;
    out = out.replace(r.re, r.fix);
    if (out !== before) applied.push(r.id);
  }
  if (out !== text) {
    fs.writeFileSync(file, out, 'utf8');
  }
  return applied;
}

/* ────────────────────────── 主流程 ────────────────────────── */

if (OPT.listChecks) {
  console.log('id\t\t\tlevel\tauto-fix\t判据');
  for (const r of RULES) {
    console.log(`${r.id}\t${r.level}\t${r.fix ? 'yes' : 'no'}\t${r.why}`);
  }
  process.exit(0);
}

if (OPT.fix && !FILES) {
  console.error(
    '[validate-style] 拒绝执行：`--fix` 必须配 `--files=`。\n' +
      '  政策要求「存量内容按页顺修、不单独批量清理」（style-guide §0 机会式修复政策）。\n' +
      '  例：node scripts/validate-style.js --fix --files=src/blog/foo/index.njk'
  );
  process.exit(2);
}

const targets = FILES
  ? FILES.map((f) => path.resolve(ROOT, f)).filter((p) => fs.existsSync(p))
  : walk(SRC);

if (FILES && targets.length !== FILES.length) {
  const missing = FILES.filter((f) => !fs.existsSync(path.resolve(ROOT, f)));
  console.error('[validate-style] 找不到文件：' + missing.join(', '));
  process.exit(2);
}

const fixedFiles = [];
for (const abs of targets) {
  let text;
  try {
    text = fs.readFileSync(abs, 'utf8');
  } catch {
    continue;
  }
  scanned++;
  if (OPT.fix) {
    const applied = applyFix(abs, text);
    if (applied.length) {
      fixedFiles.push({ file: rel(abs), rules: applied });
      text = fs.readFileSync(abs, 'utf8');
    }
  }
  checkText(rel(abs), text);
  checkFrontmatter(rel(abs), text);
}

/* ────────────────────────── 汇总 ────────────────────────── */

const byRule = new Map();
for (const f of findings) {
  if (!byRule.has(f.rule)) byRule.set(f.rule, []);
  byRule.get(f.rule).push(f);
}
const errors = findings.filter((f) => f.level === 'error');
const warns = findings.filter((f) => f.level === 'warn');

if (OPT.json) {
  console.log(
    JSON.stringify(
      {
        scanned,
        fixed: fixedFiles,
        errorCount: errors.length,
        warnCount: warns.length,
        rules: [...byRule.entries()].map(([id, list]) => ({
          id,
          level: list[0].level,
          count: list.length,
          files: [...new Set(list.map((x) => x.file))].length,
          items: list,
        })),
      },
      null,
      2
    )
  );
} else if (!OPT.quiet) {
  console.log(`validate-style — style-guide v2.1 · 扫描 ${scanned} 个文件\n`);

  if (fixedFiles.length) {
    console.log(`已顺修 ${fixedFiles.length} 个文件：`);
    for (const f of fixedFiles) console.log(`  ${f.file}  [${f.rules.join(', ')}]`);
    console.log('');
  }

  if (!findings.length) {
    console.log('✅ 未发现机器可判的文体违规。');
  }

  const order = ['error', 'warn'];
  for (const lvl of order) {
    const list = findings.filter((f) => f.level === lvl);
    if (!list.length) continue;
    console.log(`── ${lvl === 'error' ? '错误' : '警告'}（${list.length} 处）──`);
    for (const r of RULES) {
      const hits = byRule.get(r.id);
      if (!hits || hits[0].level !== lvl) continue;
      const nFiles = new Set(hits.map((h) => h.file)).size;
      console.log(`\n[${r.id}] ${hits.length} 处 / ${nFiles} 个文件`);
      console.log(`  判据：${r.why}`);
      const show = OPT.verbose ? hits : hits.slice(0, 5);
      for (const h of show) {
        console.log(`  ${h.file}:${h.line}  «${h.snippet}»`);
      }
      if (!OPT.verbose && hits.length > show.length) {
        console.log(`  … 另 ${hits.length - show.length} 处（--verbose 全列）`);
      }
    }
    // 文件级规则不在 RULES 表里，单独列
    for (const id of ['frontmatter-missing', 'title-too-long', 'desc-too-long', 'desc-too-short']) {
      const hits = byRule.get(id);
      if (!hits || hits[0].level !== lvl) continue;
      console.log(`\n[${id}] ${hits.length} 处 / ${new Set(hits.map((h) => h.file)).size} 个文件`);
      const show = OPT.verbose ? hits : hits.slice(0, 5);
      for (const h of show) console.log(`  ${h.file}:${h.line}  «${h.snippet}»`);
      if (!OPT.verbose && hits.length > show.length) {
        console.log(`  … 另 ${hits.length - show.length} 处（--verbose 全列）`);
      }
    }
    console.log('');
  }

  console.log('── 未覆盖（需人判）──');
  console.log('  Title Case 是否成立 · Oxford comma · 硬数字是否该走 {FACT:...} ·');
  console.log('  claim 是否有证据 · 锚文本是否描述性 · 叙述质量');
}

if (OPT.strict && errors.length) {
  console.error(`\n✗ --strict：${errors.length} 处 error，准入未通过。`);
  process.exit(1);
}
process.exit(0);
