#!/usr/bin/env node
/**
 * 跨语言「板块样式对齐」审计（只读，不改任何文件）
 *
 * 口径（2026-09-18 确立）：
 *   跨语言 section **顺序**本来就不同（各语言不是互译），不能要求序列一致。
 *   可判定的口径 = 同一「语义板块」的 **背景档 / 容器档 / dark-section** 应一致。
 *
 * 用法：node scripts/audit-section-parity.js
 *   加 --json 输出机器可读结果。
 * 退出码：始终 0（这是审计工具，不是门禁）。
 *
 * 依赖产物目录 _site（先跑 npx @11ty/eleventy）。
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '_site');
const asJson = process.argv.includes('--json');

const FAMILY_MAP = [
  [/^(?:de\/|es\/|fr\/|ru\/|pl\/)?$/, 'HOME'],
  [/^(?:de\/ueber-uns|es\/sobre-nosotros|fr\/a-propos|ru\/o-kompanii|pl\/o-nas|about)\/$/, 'ABOUT'],
  [/^(?:de\/oem-odm-service|fr\/service-oem-odm|es\/servicios|ru\/uslugi|pl\/uslugi-oem-odm|service)\/$/, 'SERVICE'],
  [/^(?:(?:de|es|fr|ru|pl)\/)?faq\/$/, 'FAQ'],
  [/^(?:de\/kontakt|es\/contacto|fr\/contact|ru\/kontakty|pl\/kontakt|contact)\/$/, 'CONTACT'],
  [/^(?:de\/fallbeispiele|es\/casos-de-exito|fr\/etudes-de-cas|ru\/keysy|pl\/studia-przypadkow|case-studies)\/$/, 'CASES'],
];

// 语义标签 → 同一「板块」在不同语言的 id 各不相同，靠这个收敛
const SEMANTIC = [
  [/brand-story|wow-oh-cool-(brand|marca|narrativa)|brand-narrative/, 'brand-story'],
  [/comparison|vergleich|comparativa|comparaison|comparatif|porownanie|oem-odm-comparison/, 'comparison'],
  [/timeline/, 'timeline'],
  [/factory-r-d|factory-capabilities|workshop-gallery|capabilities-unified|oem-odm-capabilities/, 'factory'],
  [/meet-our-team|our-team|content-2/, 'team'],
  [/how-we-work|soft-cta-oem-process/, 'process'],
  [/quality-compliance|qualitaetssicherung|qualite/, 'quality'],
  [/why-partner|warum-wowohcool|pourquoi-wowohcool|pourquoi-nous/, 'why-partner'],
  [/visit-us|downloads|download/, 'visit-us'],
  [/^faq$/, 'faq'],
  [/client-success|referencias|references|referenzen|opinie-klientow|client-testimonials/, 'testimonials'],
  [/blog-preview|blog-list/, 'blog-preview'],
  [/zahlungsmethoden|metodos-de-pago|modes-de-paiement|payment-methods/, 'payment'],
  [/products-overview|^productos$|apercu-produits|^products$/, 'products'],
  [/produktion-lieferzeit|produccion-y-envio|production-et-livraison|production-shipping/, 'production'],
  [/oem-odm-service$|service-oem-odm$|^services$/, 'services'],
];

const semOf = (id, h) => {
  const blob = `${id} ${h || ''}`.toLowerCase();
  for (const [re, t] of SEMANTIC) if (re.test(blob)) return t;
  return null;
};
const famOf = (rel) => { for (const [re, k] of FAMILY_MAP) if (re.test(rel)) return k; return null; };
const langOf = (rel) => (rel.match(/^(de|es|fr|ru|pl)\//) || [, 'en'])[1];

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc); else if (e.name === 'index.html') acc.push(p);
  }
  return acc;
}

function parse(html) {
  const mm = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
  const body = mm ? mm[1] : html;
  const out = []; const re = /<section\b([^>]*)>/g; let m;
  while ((m = re.exec(body))) {
    const cls = (m[1].match(/class="([^"]*)"/) || [, ''])[1];
    const id = (m[1].match(/id="([^"]*)"/) || [, ''])[1];
    let bg = 'white';
    for (const t of cls.split(/\s+/)) {
      if (/^bg-(white|slate-50|slate-100|darkBg|brandBlue|brandBlueLight|brandOrange|black|slate-900|slate-950)$/.test(t)) { bg = t.replace('bg-', ''); break; }
    }
    if (/bg-gradient/.test(cls)) bg = 'gradient';
    const tail = body.slice(m.index, m.index + 4000);
    const cm = tail.match(/container-(wide|content|narrow)/);
    const hm = tail.match(/<h[12][^>]*>([\s\S]{0,90}?)<\/h[12]>/);
    out.push({
      id, bg, container: cm ? cm[1] : '-',
      dark: /\bdark-section\b/.test(cls),
      firstH: hm ? hm[1].replace(/<[^>]*>/g, '').trim() : '',
    });
  }
  return out;
}

if (!fs.existsSync(ROOT)) { console.error('缺少 _site，请先构建：CODEBUDDY_SAFE_DELETE_ENABLED=0 npx @11ty/eleventy'); process.exit(1); }

const files = walk(ROOT).filter((f) => {
  const rel = path.relative(ROOT, f).replace(/\\/g, '/');
  return !rel.includes('/blog/') && !rel.startsWith('blog/') && !rel.startsWith('authors/');
});

const groups = {};
for (const f of files) {
  const rel = path.relative(ROOT, f).replace(/\\/g, '/').replace(/\/?index\.html$/, '/') || '/';
  const fam = famOf(rel); if (!fam) continue;
  (groups[fam] ||= []).push({ rel, lang: langOf(rel), sig: parse(fs.readFileSync(f, 'utf8')) });
}

const findings = [];
for (const fam of Object.keys(groups).sort()) {
  const items = groups[fam];
  const byTag = {};
  for (const it of items) for (const s of it.sig) {
    const t = semOf(s.id, s.firstH); if (t) (byTag[t] ||= []).push({ lang: it.lang, ...s });
  }
  for (const tag of Object.keys(byTag)) {
    const rows = byTag[tag];
    if (rows.length < 3) continue;                     // 样本太少不算"不一致"
    const bgs = [...new Set(rows.map((r) => r.bg))];
    const cts = [...new Set(rows.map((r) => r.container).filter((c) => c !== '-'))];
    const dks = [...new Set(rows.map((r) => r.dark))];
    if (bgs.length < 2 && cts.length < 2 && dks.length < 2) continue;
    findings.push({ family: fam, tag, bgs, containers: cts, darks: dks, rows });
  }
}

if (asJson) { console.log(JSON.stringify(findings, null, 2)); process.exit(0); }

console.log(`扫 ${files.length} 页 / 命中 ${findings.length} 处板块样式不一致`);
console.log('（口径：同一语义板块的 背景档 / 容器档 / dark-section 应一致；hero 与样本 <3 已排除）\n');
for (const f of findings) {
  const probs = [];
  if (f.bgs.length > 1) probs.push(`背景档 ${f.bgs.join(' / ')}`);
  if (f.containers.length > 1) probs.push(`容器档 ${f.containers.join(' / ')}`);
  if (f.darks.length > 1) probs.push(`dark-section ${f.darks.join(' / ')}`);
  console.log(`  [${f.family}] ${f.tag}  ✗ ${probs.join('  ·  ')}`);
  for (const r of f.rows) {
    console.log(`      ${r.lang.padEnd(3)} bg=${r.bg.padEnd(15)} c=${r.container.padEnd(8)} ${r.dark ? 'DARK' : '    '} ${(r.id || '-').padEnd(32)} ${r.firstH.slice(0, 34)}`);
  }
  console.log('');
}
console.log('提示：结果需人工判定「真不一致」vs「内容本身不同」。深色区颜色问题必须浏览器实测。');
