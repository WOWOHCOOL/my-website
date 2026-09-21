/* 区块视觉签名提取器（hreflang 集群版）
 *
 * 为什么不用手工语义标签：`audit-section-parity.js` 的 SEMANTIC 正则只覆盖
 * HOME/ABOUT/SERVICE/FAQ/CONTACT/CASES，**产品页族完全没覆盖**。
 * 这里改用产物里已有的 hreflang alternates 做「同一逻辑页」聚类 ——
 * 语言 slug 各不相同也能自动归组，无需维护任何正则。
 *
 * 提取的签名（静态解析，不改任何文件）：
 *   bg        = class 里第一个调色板 bg-*（white/slate-50/.../darkBg/brandBlue/...）
 *   container = 该 section 内首个 container-(wide|content|narrow)
 *   dark      = 是否带 .dark-section
 *   borderY   = 是否带水平描边（border-y / border-t / border-b）
 *   id
 *
 * 用法：node scan-section-fingerprint.js [--json] [--only=产品|非产品]
 * 退出码恒 0（审计工具）
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '_site');
const asJson = process.argv.includes('--json');
const onlyArg = (process.argv.find(a => a.startsWith('--only=')) || '').split('=')[1] || '';

const PALETTE = /^(white|slate-50|slate-100|slate-200|darkBg|brandBlue|brandBlueLight|brandOrange|black|slate-900|slate-950)$/;

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (['image', 'assets', 'css', 'js', 'fonts'].includes(e.name)) continue;
      walk(p, acc);
    } else if (e.name === 'index.html') acc.push(p);
  }
  return acc;
}

/** 只取 <main> 里的**顶层** section（嵌套 section 不算独立区块） */
function sections(html) {
  const mm = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
  const body = mm ? mm[1] : html;
  const out = [];
  const re = /<(\/?)section\b([^>]*)>/g;
  let m, depth = 0;
  while ((m = re.exec(body))) {
    const closing = m[1] === '/';
    if (closing) { depth = Math.max(0, depth - 1); continue; }
    const attrs = m[2];
    const selfClose = /\/\s*$/.test(attrs);
    if (depth === 0) {
      const cls = (attrs.match(/class="([^"]*)"/) || [, ''])[1];
      const id = (attrs.match(/id="([^"]*)"/) || [, ''])[1];
      const toks = cls.split(/\s+/);
      let bg = 'white';
      for (const t of toks) if (PALETTE.test(t.replace(/^bg-/, '')) && t.startsWith('bg-')) { bg = t.slice(3); break; }
      if (/bg-gradient/.test(cls)) bg = 'gradient';
      const tail = body.slice(m.index, m.index + 4000);
      const cm = tail.match(/container-(wide|content|narrow)/);
      out.push({
        id,
        bg,
        container: cm ? cm[1] : '-',
        dark: /\bdark-section\b/.test(cls),
        borderY: /\bborder-(y|t|b)\b/.test(cls) || /\bborder-(y|t|b)-/.test(cls),
        hero: /data-section="hero"/.test(attrs),
      });
    }
    if (!selfClose) depth++;
  }
  return out;
}

const files = walk(ROOT).filter(f => {
  const rel = path.relative(ROOT, f).replace(/\\/g, '/');
  return !rel.startsWith('blog/') && !rel.includes('/blog/') && !rel.startsWith('authors/');
});

// 集群 key：hreflang href 的**排序集合**（同一逻辑页在所有语言里的 URL 集合）
const clusters = new Map();
for (const f of files) {
  const rel = path.relative(ROOT, f).replace(/\\/g, '/').replace(/\/?index\.html$/, '/') || '/';
  const html = fs.readFileSync(f, 'utf8');
  const alts = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)">/g)]
    .map(x => [x[1], x[2]]).filter(x => x[0] !== 'x-default');
  const lang = (rel.match(/^(de|es|fr|ru|pl)\//) || [, 'en'])[1];
  const key = alts.length ? alts.map(a => a[1]).sort().join('|') : 'SOLO:' + rel;
  if (!clusters.has(key)) clusters.set(key, { langs: {}, alts: Object.fromEntries(alts) });
  clusters.get(key).langs[lang] = { rel, secs: sections(html) };
}

const isProduct = rel => /(^|\/)(products|produkte|productos|produits|produkty)\//.test(rel);

const rows = [];
for (const [key, c] of clusters) {
  const langs = Object.keys(c.langs);
  if (langs.length < 2) continue;
  const anyRel = c.langs[langs[0]].rel;
  const prod = isProduct(anyRel);
  if (onlyArg === '产品' && !prod) continue;
  if (onlyArg === '非产品' && prod) continue;
  const seqs = {};
  for (const l of langs.sort()) seqs[l] = c.langs[l].secs.map(s => s.bg);
  const counts = {};
  for (const l of langs) counts[l] = c.langs[l].secs.length;
  const uniqCounts = [...new Set(Object.values(counts))];
  const allBgs = new Set();
  for (const l of langs) seqs[l].forEach(b => allBgs.add(b));
  rows.push({ prod, en: c.langs.en ? c.langs.en.rel : anyRel, langs, counts, seqs, bgSet: [...allBgs].sort(), cluster: c });
}

/* ⚠️ 口径说明（2026-09-18 已确立，勿再走弯路）：
 *   - 「跨语言 section 数 / 背景档序列不同」= **本土化编排的必然结果**，全站 24/24 集群都不同
 *     → **不是缺陷**，故本脚本不再报它（曾误报 24/24 全亮，纯噪声）。
 *   - 唯一可判定的缺陷 = **「带水平描边的 section 与相邻块同色」**（描边会孤立成噪音线）。
 *   - 其中绝大多数是产品页 `border-t border-slate-100` **体系模式（全站 848 处，已统一）**
 *     → 归类为「已知体系」，不算缺陷；**只有非该模式的才值得人工看**。
 */
const KNOWN = /border-(t|y)\s+border-slate-100/;

const cands = [];
for (const r of rows) {
  for (const l of r.langs) {
    const s = r.cluster.langs[l].secs;
    for (let i = 1; i < s.length; i++) {
      if (s[i].bg === s[i - 1].bg && (s[i].borderY || s[i - 1].borderY)) {
        // 从源文件里取该 section 的原始 class，判断是否属于已知体系
        // ⚠️ 描边可能挂在「前块」上 → 必须**两块都查**
        const rel = r.cluster.langs[l].rel;
        const src = path.join(ROOT, rel, 'index.html');
        let clsBoth = '';
        try {
          const h = fs.readFileSync(src, 'utf8');
          for (const sid of [s[i - 1].id, s[i].id]) {
            if (!sid) continue;
            const mm = h.match(new RegExp('<section[^>]*id="' + sid.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '"[^>]*>'));
            if (mm) clsBoth += ' ' + mm[0];
          }
        } catch (e) { /* ignore */ }
        cands.push({
          prod: r.prod, lang: l, page: rel, from: s[i - 1].id || '-', to: s[i].id || '-',
          bg: s[i].bg, which: s[i].borderY ? '本块' : '前块',
          known: KNOWN.test(clsBoth),
        });
      }
    }
  }
}

const unknown = cands.filter(c => !c.known);
const knownCnt = cands.length - unknown.length;

if (asJson) { console.log(JSON.stringify({ clusters: clusters.size, multi: rows.length, knownCnt, unknown }, null, 2)); process.exit(0); }

console.log(`集群总数 ${clusters.size} · 多语言集群 ${rows.length}（产品 ${rows.filter(r => r.prod).length} / 非产品 ${rows.filter(r => !r.prod).length}）`);
console.log(`描边孤立候选 ${cands.length} → 已知体系 \`border-t border-slate-100\` ${knownCnt} · ⚠️ 非体系（需人工看） ${unknown.length}\n`);
if (unknown.length) {
  console.log('--- ⚠️ 非体系描边孤立 ---');
  for (const c of unknown) {
    console.log(`  [${c.prod ? '产品' : '非产品'}] ${c.page}  ${c.lang}: #${c.from} → #${c.to}  (${c.bg}, 描边${c.which})`);
  }
} else {
  console.log('--- ✅ 无非体系描边孤立 ---');
}
if (process.argv.includes('--all')) {
  console.log('\n--- 全部候选（含已知体系） ---');
  for (const c of cands) console.log(`  ${c.known ? '体系' : '⚠️新'} ${c.page}  ${c.lang}: #${c.from} → #${c.to} (${c.bg})`);
}
