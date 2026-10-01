#!/usr/bin/env node
/*
 * Content cluster registry + validation.
 *
 * Source of truth: page frontmatter.
 * Output: _site/content-clusters.json when _site exists.
 *
 * A cluster is a reciprocal set of language alternates that point to each other
 * via canonical + enPath/dePath/esPath/frPath/ruPath/plPath. This turns the
 * site's hreflang graph into a reusable machine-readable registry for audits,
 * sitemap checks, llms/index generation, and future render-time derivation.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const SITE = path.join(ROOT, '_site');
const ORIGIN = 'https://www.wowohcool.com';
const LANGS = ['en', 'de', 'es', 'fr', 'ru', 'pl'];
const LANG_PREFIX = { en: '', de: '/de', es: '/es', fr: '/fr', ru: '/ru', pl: '/pl' };

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (['_data', '_includes', 'node_modules', '.git'].includes(e.name)) continue;
      walk(p, out);
    } else if (e.name === 'index.njk') out.push(p);
  }
  return out;
}
function rel(p) { return path.relative(SRC, p).replace(/\\/g, '/'); }
function frontmatter(s) { const m = s.match(/^\uFEFF?---\r?\n([\s\S]*?)\r?\n---/); return m ? m[1] : ''; }
function field(fm, name) { const m = fm.match(new RegExp('^' + name + ':\\s*(.*)$', 'm')); return m ? m[1].trim().replace(/^['"]|['"]$/g, '') : null; }
function langOf(relPath) { const first = relPath.split('/')[0]; return LANGS.includes(first) && first !== 'en' ? first : 'en'; }
function normPath(p) {
  if (p === null || p === undefined) return p;
  if (/^https?:\/\//i.test(p)) return p;
  if (/\.html?$/i.test(p)) return p.startsWith('/') ? p : '/' + p;
  let x = '/' + p.replace(/^\/+/, '');
  if (!x.endsWith('/')) x += '/';
  return x;
}
function absoluteFor(lang, p) {
  if (p === null || p === undefined) return null;
  if (/^https?:\/\//i.test(p)) return p;
  const pref = LANG_PREFIX[lang];
  const suffix = normPath(p);
  if (pref && (suffix === pref + '/' || suffix.startsWith(pref + '/'))) return ORIGIN + suffix;
  return ORIGIN + pref + suffix;
}

const nodes = new Map();
const errors = [];
const warnings = [];

for (const file of walk(SRC)) {
  const relPath = rel(file);
  const lang = langOf(relPath);
  const content = fs.readFileSync(file, 'utf8');
  const fm = frontmatter(content);
  if (!fm) continue;
  const noSeo = /^noSeoTags:\s*true\s*$/m.test(fm);
  if (noSeo) continue;
  const canonical = field(fm, 'canonical');
  if (!canonical) continue;
  const canonicalUrl = absoluteFor(lang, canonical);
  if (nodes.has(canonicalUrl)) {
    errors.push('duplicate canonical: ' + canonicalUrl + ' in ' + relPath + ' and ' + nodes.get(canonicalUrl).file);
    continue;
  }
  const node = {
    canonical: canonicalUrl,
    path: normPath(canonical),
    lang,
    file: relPath,
    indexable: !/^robotsNoindex:\s*true\s*$/m.test(fm),
    alternates: {},
  };
  node.alternates[lang] = canonicalUrl;
  for (const lg of LANGS) {
    if (lg === lang) continue;
    const alt = field(fm, lg + 'Path');
    if (alt !== null) node.alternates[lg] = absoluteFor(lg, alt);
  }
  nodes.set(canonicalUrl, node);
}

// Reciprocity + target existence checks.
for (const node of nodes.values()) {
  for (const [lang, target] of Object.entries(node.alternates)) {
    if (lang === node.lang) continue;
    const other = nodes.get(target);
    if (!other) {
      errors.push('missing alternate target: ' + node.file + ' -> ' + lang + ' ' + target);
      continue;
    }
    if (other.alternates[node.lang] !== node.canonical) {
      errors.push('non-reciprocal alternate: ' + node.canonical + ' -> ' + target + ' but back=' + String(other.alternates[node.lang]));
    }
  }
}

// Connected components over reciprocal alternates.
const seen = new Set();
const clusters = [];
for (const node of nodes.values()) {
  if (seen.has(node.canonical)) continue;
  const q = [node], member = [];
  seen.add(node.canonical);
  while (q.length) {
    const cur = q.shift();
    member.push(cur);
    for (const target of Object.values(cur.alternates)) {
      if (nodes.has(target) && !seen.has(target)) { seen.add(target); q.push(nodes.get(target)); }
    }
  }
  const byLang = {};
  for (const n of member) {
    if (byLang[n.lang]) errors.push('duplicate language in cluster: ' + n.lang + ' ' + byLang[n.lang].canonical + ' / ' + n.canonical);
    byLang[n.lang] = { canonical: n.canonical, file: n.file, indexable: n.indexable };
  }
  const id = (byLang.en && byLang.en.canonical) || member.map((n) => n.canonical).sort()[0];
  const missing = LANGS.filter((lg) => !byLang[lg]);
  if (missing.length && member.length > 1) warnings.push('partial cluster ' + id + ' missing: ' + missing.join(', '));
  clusters.push({ id, size: member.length, languages: Object.keys(byLang).sort(), pages: byLang, missing, xDefault: byLang.en ? byLang.en.canonical : null });
}

clusters.sort((a, b) => a.id.localeCompare(b.id));
const report = {
  generatedAt: new Date().toISOString(),
  origin: ORIGIN,
  pageCount: nodes.size,
  clusterCount: clusters.length,
  multiLanguageClusterCount: clusters.filter((c) => c.size > 1).length,
  errors,
  warnings,
  clusters,
};

if (fs.existsSync(SITE)) fs.writeFileSync(path.join(SITE, 'content-clusters.json'), JSON.stringify(report, null, 2) + '\n', 'utf8');
console.log('=== content cluster registry ===');
console.log('pages    : ' + report.pageCount);
console.log('clusters : ' + report.clusterCount + ' (' + report.multiLanguageClusterCount + ' multilingual)');
console.log('errors   : ' + errors.length);
console.log('warnings : ' + warnings.length);
for (const e of errors.slice(0, 30)) console.error('  ❌ ' + e);
for (const w of warnings.slice(0, 20)) console.warn('  ⚠️ ' + w);
if (errors.length) process.exit(1);
console.log('[content-cluster-registry] PASS');
