'use strict';
/* 标题度量报告 —— 标题换行 / 字体字号阶梯 / 表格宽度（只读）
 *
 * 用法:
 *   node scripts/audit-heading-scale.js            # 汇总
 *   node scripts/audit-heading-scale.js --detail   # 附签名明细
 *   node scripts/audit-heading-scale.js --json     # 机器可读
 *
 * 归组方式：**hreflang 集群**（用 <link rel=alternate hreflang="en"> 反查 EN 路径作 key）
 *   → 同一语义页的 6 语言版本归为一组，直接回答「架构统一，文案差异」。
 *
 * ⚠️ 本项目实测确立的判据：
 *   h1 字号档与 **hero 布局**强相关 —— 居中单列 hero 用 T1（更大），
 *   居中 + 两列网格 hero 用 T2（更小）。故「跨语言档位不同」本身不是缺陷，
 *   真缺陷 = **同集群内、同布局、却用别的档** 的少数派。
 */
const fs = require('fs');
const path = require('path');
const { eachTag, clsOf, idOf } = require('./lib-html-sections.js');

const ROOT = path.join(process.cwd(), '_site');
const LANGS = ['en', 'de', 'es', 'fr', 'ru', 'pl'];
const CAT = ['products', 'produkte', 'productos', 'produits', 'produkty', 'tovary'];
const norm = (s) => s.replace(/\s+/g, ' ').trim();

function walk(d, o = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    e.isDirectory() ? walk(p, o) : e.name.endsWith('.html') && o.push(p);
  }
  return o;
}

/* ── h1 档位识别（按类签名，覆盖全站实际用到的全部写法） ───────── */
function tierOf(cls) {
  if (/\bhero-title\b/.test(cls)) {
    // 流体字号：clamp(2rem,5vw,3.5rem)，再用 lg/xl 覆盖
    return 'FLUID';
  }
  if (/text-4xl md:text-5xl lg:text-6xl/.test(cls)) return 'T1';   // 4xl/5xl/6xl
  if (/text-3xl md:text-4xl xl:text-5xl/.test(cls)) return 'T2';   // 3xl/4xl/5xl
  if (/text-3xl md:text-5xl/.test(cls)) return 'T3';               // 3xl/5xl
  if (/text-3xl lg:text-5xl/.test(cls)) return 'T4';               // 3xl/lg:5xl
  if (/text-4xl/.test(cls)) return 'X4';                            // 仅 text-4xl
  if (/text-3xl/.test(cls)) return 'X3';                            // 仅 text-3xl
  return 'T?';
}

/* 页面族（用于分组展示；用 EN 侧路径判定） */
/* ⚠️⚠️ 'top' 必须再细分：法务页 / 404 / thank-you 有**自己的字号档**（合法差异），
 *     把它们混进营销页一起做「语言内部一致性」判定 → 全部误报「分裂」。 */
const LEGAL_RE = /(agb|datenschutz|impressum|cgv|confidentialite|mentions-legales|privacy|terms|legal|aviso-legal|politica|impressum|polityka|soglashenie|kontrakt)/i;
const UTIL_RE = /(404|thank-you|danke|gracias|remerciements|spasibo|dziekujemy)/i;
function familyOf(enPath) {
  const seg = enPath.split('/').filter((s) => s && s !== 'index.html');
  if (seg.length === 0) return 'home';
  if (seg[0] === 'blog') return seg.length > 1 ? 'blog-post' : 'blog-list';
  if (seg[0] === 'products') {
    if (seg.length === 1) return 'prod-list';
    if (seg.length === 2) return 'prod-cat';
    return 'prod-detail';
  }
  const tail = seg[seg.length - 1];
  if (UTIL_RE.test(tail)) return 'util';
  if (LEGAL_RE.test(tail)) return 'legal';
  return 'top';
}

function heroOf(html) {
  const mi = html.indexOf('<main');
  const me = html.lastIndexOf('</main>');
  const body = mi >= 0 && me > mi ? html.slice(mi, me) : html;
  const m = /<h1\b([^>]*)>([\s\S]*?)<\/h1>/.exec(body);
  if (!m) return null;
  const cls = norm((/\sclass="([^"]*)"/.exec(m[1]) || [, ''])[1]);
  const upto = body.slice(0, m.index);
  const lastSec = upto.lastIndexOf('<section');
  const hero = lastSec >= 0 ? body.slice(lastSec, m.index + 1400) : upto.slice(-1800);
  return {
    cls,
    inner: m[2].trim(),
    layout: (hero.includes('text-center') ? 'center' : '') + (hero.includes('grid lg:grid-cols-2') ? '+grid2col' : '') || 'other',
    br: /<br\b/.test(m[2]),
  };
}

const rows = [];
for (const f of walk(ROOT)) {
  const rel = path.relative(ROOT, f).replace(/\\/g, '/');
  const h = fs.readFileSync(f, 'utf8');
  const hero = heroOf(h);
  if (!hero) continue;
  const seg = rel.split('/').filter((s) => s && s !== 'index.html');
  const lang = LANGS.includes(seg[0]) ? seg[0] : 'en';
  const rest = LANGS.includes(seg[0]) ? seg.slice(1) : seg;
  // hreflang 集群 key
  const cm = /<link[^>]+hreflang="en"[^>]+href="([^"]+)"/.exec(h);
  let cluster = null;
  if (cm) { try { cluster = new URL(cm[1]).pathname; } catch { /* ignore */ } }
  rows.push({
    rel, lang, cluster, family: familyOf(cluster || '/' + rest.join('/') + '/'),
    page: rest.join('/') || '(root)',
    tier: tierOf(hero.cls), layout: hero.layout, br: hero.br, sig: hero.cls,
    leading: /\bleading-tight\b/.test(hero.cls), tracking: /\btracking-tighter\b/.test(hero.cls),
    uppercase: /\buppercase\b/.test(hero.cls), italic: /\bitalic\b/.test(hero.cls),
  });
}

if (process.argv.includes('--json')) {
  console.log(JSON.stringify({ total: rows.length, rows }, null, 1));
  process.exit(0);
}

const L = (n) => '═'.repeat(n);
console.log('\n' + L(76));
console.log('标题度量报告（产物侧 · 共 ' + rows.length + ' 页有 h1）');
console.log(L(76));

/* ── 1. 集群内跨语言一致性 ────────────────────────────── */
console.log('\n## 1. 集群内跨语言 h1 一致性（按 EN 路径归组）\n');
const clusters = new Map();
for (const r of rows) {
  if (!r.cluster) continue;
  if (!clusters.has(r.cluster)) clusters.set(r.cluster, []);
  clusters.get(r.cluster).push(r);
}
let clusterTotal = 0, clusterOk = 0, clusterBad = [];
const badFam = new Map();
for (const [k, arr] of clusters) {
  if (arr.length < 2) continue;
  clusterTotal++;
  const sigs = new Set(arr.map((r) => r.tier + '/' + r.layout));
  if (sigs.size === 1) clusterOk++;
  else {
    clusterBad.push({ k, arr, sigs: [...sigs] });
    const fam = arr[0].family;
    badFam.set(fam, (badFam.get(fam) || 0) + 1);
  }
}
console.log('  可比对集群: ' + clusterTotal + ' · 完全一致: ' + clusterOk + ' · 有差异: ' + clusterBad.length +
  '  (' + Math.round(clusterOk / clusterTotal * 100) + '% 一致)');
console.log('\n  差异按页面族:');
[...badFam.entries()].sort((a, b) => b[1] - a[1]).forEach(([k, n]) =>
  console.log('    ' + String(n).padStart(4) + ' × ' + k));
console.log('\n  差异按「档位/布局 组合」:');
const comboG = new Map();
for (const b of clusterBad) {
  const k = b.sigs.slice().sort().join('   vs   ');
  comboG.set(k, (comboG.get(k) || 0) + 1);
}
[...comboG.entries()].sort((a, b) => b[1] - a[1]).forEach(([k, n]) =>
  console.log('    ' + String(n).padStart(4) + ' × ' + k));

/* ── 2. 布局 → 档位 相关性 ───────────────────────────── */
console.log('\n## 2. 「hero 布局 → h1 档位」相关性（全局）\n');
const cross = new Map();
for (const r of rows) {
  const k = r.layout.padEnd(14) + ' → ' + r.tier;
  cross.set(k, (cross.get(k) || 0) + 1);
}
[...cross.entries()].sort((a, b) => b[1] - a[1]).forEach(([k, n]) =>
  console.log('  ' + String(n).padStart(4) + ' × ' + k));
for (const [lay, want] of [['center', 'T1'], ['+grid2col', 'T2']]) {
  const all = rows.filter((r) => r.layout === lay);
  const hit = all.filter((r) => r.tier === want);
  console.log('\n  ' + lay.padEnd(11) + ' → ' + want + ' 命中 ' + hit.length + '/' + all.length +
    (all.length ? ' (' + Math.round(hit.length / all.length * 100) + '%)' : ''));
}

/* ── 3. h1 内硬换行 <br> ─────────────────────────────── */
console.log('\n## 3. h1 内的硬换行 <br>\n');
console.log('  含 <br> 的 h1: ' + rows.filter((r) => r.br).length + ' / ' + rows.length);
for (const l of LANGS) {
  const s = rows.filter((r) => r.lang === l);
  if (!s.length) continue;
  console.log('    ' + l.padEnd(4) + ' 有 br ' + String(s.filter((r) => r.br).length).padStart(3) +
    ' · 无 br ' + String(s.filter((r) => !r.br).length).padStart(3));
}
console.log('\n  含 br 的页面族:');
const brFam = new Map();
for (const r of rows.filter((x) => x.br)) brFam.set(r.family, (brFam.get(r.family) || 0) + 1);
[...brFam.entries()].sort((a, b) => b[1] - a[1]).forEach(([k, n]) => console.log('    ' + String(n).padStart(4) + ' × ' + k));

/* ── 4. 修饰类一致性 ─────────────────────────────────── */
console.log('\n## 4. h1 修饰类缺失（italic / uppercase / leading-tight / tracking-tighter）\n');
for (const key of ['italic', 'uppercase', 'leading', 'tracking']) {
  const miss = rows.filter((r) => !r[key]);
  const uniq = [...new Set(miss.map((r) => r.rel))];
  console.log('  ' + key.padEnd(10) + ' 缺失 ' + String(uniq.length).padStart(3) + ' 页' +
    (uniq.length ? '\n      ' + uniq.slice(0, 8).map((x) => x.replace(/\/index\.html$/, '')).join('\n      ') + (uniq.length > 8 ? '\n      … +' + (uniq.length - 8) : '') : '   ✅'));
}

/* ── 5. 集群内离群（同布局却不同档 = 真缺陷） ───────────── */
console.log('\n## 5. ⚠️ 真缺陷候选：同集群、**同布局**、却用别的档\n');
const realBad = [];
for (const [k, arr] of clusters) {
  if (arr.length < 2) continue;
  const byLayout = new Map();
  for (const r of arr) {
    if (!byLayout.has(r.layout)) byLayout.set(r.layout, []);
    byLayout.get(r.layout).push(r);
  }
  for (const [lay, group] of byLayout) {
    if (group.length < 2) continue;
    const cnt = new Map();
    group.forEach((r) => cnt.set(r.tier, (cnt.get(r.tier) || 0) + 1));
    if (cnt.size < 2) continue;
    const [maj, majN] = [...cnt.entries()].sort((a, b) => b[1] - a[1])[0];
    group.filter((r) => r.tier !== maj).forEach((r) =>
      realBad.push({ ...r, maj, majN, groupN: group.length, cluster: k }));
  }
}
if (!realBad.length) console.log('  ✅ 0 处');
else {
  for (const r of realBad) {
    console.log('  ❌ ' + r.rel.replace(/\/index\.html$/, ''));
    console.log('       集群 ' + r.cluster + '   布局=' + r.layout + '   本页=' + r.tier + '   同布局主流=' + r.maj + ' (' + r.majN + '/' + r.groupN + ')');
  }
  console.log('\n  合计: ' + realBad.length + ' 页');
}

/* ── 5b. ⚠️ 语言级档位分簇（比「同集群多数派」更可靠的判据） ────
 *
 * ⚠️⚠️ 「同集群多数派」判据在本站会给出**互相矛盾**的结论：
 *     /case-studies/ 多数派 = T1 → 要求改 DE/FR
 *     /faq/          多数派 = T3 → 要求改 EN/PL
 *     两者都执行 = 把两边的内部一致性同时破坏。
 *
 * 正确判据 = **同一语言内部、同类页面之间是否一致**。
 *
 * ⚠️⚠️⚠️ 关键：必须按**页面性质**分组后再比，不能把全部 top 页混在一起 ——
 *     本站每个语言都刻意让「营销页」与「内容页」用不同档（EN: T1 vs X4），
 *     混在一起算 → 连 EN/PL 都会被误判成「分裂」。
 *
 * 实测结论（2026-09-21）：
 *   DE / FR  营销页=内容页=T3        → 内部一致（语言级设计选择，非缺陷）
 *   EN / PL  营销页=T1 · 内容页=X4   → 内部一致（同上）
 *   ES / RU  营销页 T1/T1/T3 混用    → ⚠️ 真缺陷（迁移做了一半）
 */
console.log('\n## 5b. 语言级档位分簇（判据 = 同语言内部、同类页面一致）\n');
/* 只分析 `top`（about / authors / case-studies / contact / faq / service）。
 * 必须排除 home（流体字号）、legal、util（法务/404/致谢各自成档）。 */
const MKT_RE = /(case-studies|casos-de-exito|etudes-de-cas|keysy|studia-przypadkow|fallbeispiele|contact|contacto|kontakt|kontakty|faq)/i;
const topRows = rows.filter((r) => r.family === 'top' && r.cluster);
if (!topRows.length) {
  console.log('  (无可分析的 top 页面族)');
} else {
  const kindOf = (c) => (MKT_RE.test(c) ? 'mkt' : 'content'); // mkt=营销页 · content=about/service/authors
  const splitLangs = [];
  console.log('  语言  组      档位分布                       判定');
  for (const l of LANGS) {
    const arr = topRows.filter((r) => r.lang === l);
    if (!arr.length) continue;
    for (const kind of ['mkt', 'content']) {
      const g = arr.filter((r) => kindOf(r.cluster) === kind);
      if (g.length < 2) continue;
      const cnt = new Map();
      g.forEach((r) => cnt.set(r.tier, (cnt.get(r.tier) || 0) + 1));
      const dist = [...cnt.entries()].sort((a, b) => b[1] - a[1]).map(([k, v]) => k + '×' + v).join(' ');
      const isSplit = cnt.size > 1;
      console.log('  ' + l.padEnd(5) + kind.padEnd(8) + dist.padEnd(30) + (isSplit ? '❌ 组内不一致' : '✅'));
      if (isSplit) {
        // ⚠️ 只有存在**严格多数**时才能谈「离群」；1-1 平局时两页都算互不相同
        const sorted = [...cnt.entries()].sort((a, b) => b[1] - a[1]);
        const strictMajor = sorted.length > 1 && sorted[0][1] > sorted[1][1];
        if (strictMajor) {
          const maj = sorted[0][0];
          g.filter((r) => r.tier !== maj).forEach((r) => splitLangs.push({ l, kind, tier: r.tier, maj, rel: r.rel }));
        } else {
          g.forEach((r) => splitLangs.push({ l, kind, tier: r.tier, maj: '', rel: r.rel }));
        }
      }
    }
  }
  if (splitLangs.length) {
    console.log('\n  ❌ 真缺陷：同语言、同类页面却用不同档（共 ' + splitLangs.length + ' 页）');
    for (const s of splitLangs) {
      const tail = s.maj ? '（同类主流 ' + s.maj + '）' : '（组内两页互不相同，无主流）';
      console.log('     [' + s.l + '/' + s.kind + '] ' + s.tier + tail + '  ' +
        s.rel.replace(/\/index\.html$/, ''));
    }
    console.log('\n  → 方向判定：以**该语言自身营销页所属阵营**为准（本站 EN=新标准，见 git 证据）。');
  } else {
    console.log('\n  ✅ 无语言内部矛盾');
  }
  console.log('\n  ⚠️ 说明：DE/FR 统一 T3、EN/PL 营销 T1 + 内容 X4 —— 属**语言级设计分叉**，');
  console.log('     按既有判据（跨语言「值不同」≠ 不一致）**不是缺陷**，不要为凑统一去改。');
}

/* ── 6. 签名明细（可选） ─────────────────────────────── */
if (process.argv.includes('--detail')) {
  console.log('\n## 6. 全部 h1 签名明细\n');
  const sig = new Map();
  for (const r of rows) {
    if (!sig.has(r.sig)) sig.set(r.sig, { n: 0, fams: new Set(), langs: new Set() });
    sig.get(r.sig).n++;
    sig.get(r.sig).fams.add(r.family);
    sig.get(r.sig).langs.add(r.lang);
  }
  [...sig.entries()].sort((a, b) => b[1].n - a[1].n).forEach(([k, v]) =>
    console.log('  ' + String(v.n).padStart(4) + ' × [' + [...v.fams].join(',') + '][' + [...v.langs].sort().join(',') + ']\n        ' + k));
}
console.log('');
