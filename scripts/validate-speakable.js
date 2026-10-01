// speakable declaration validator — build-chain gate.
//
// Usage:  node scripts/validate-speakable.js
//
// Layer 1: NEVER declare to search engines something that does not exist.
// Every selector listed in a page's JSON-LD `speakable.cssSelector` MUST
// really exist in that page's own HTML.
//
// Layer 2 for B2B blog articles (plain Build contract from blog-template-standard):
//   - exactly one <h1>
//   - exactly two class="... speakable ..." nodes, one Hook <div> and one TL;DR <p>
//   - BlogPosting.speakable.cssSelector === ["h1", ".speakable"]
//   - FAQPage.speakable.cssSelector === [".faq-answer"]
//   - FAQ answer count outside 3-5 is reported as warning for content review
//
// WHY this is a build gate and not just a local audit:
//   2026-09-26 the FAQ-standardisation commit replaced
//   `<h3 class="faq-question">` with `<details class="faq-item">` across 104
//   files, but two pages (products/gan-charger, ru/produkty) kept declaring
//   `.faq-question` in speakable.  The violation was real, the rule already
//   existed in docs/code-review-standard.md §4.1, and it still reached main —
//   because the only check lived in scripts/audit-speakable-truth.js, which
//   (a) is gitignored (`.gitignore`: `scripts/audit-*.js`) so it never runs
//   on Cloudflare Pages, and (b) only prints, never exits non-zero.
//   This file is the tracked, failing counterpart: same judgement, but it can
//   actually stop a deploy.
//
// NOTE: scripts/audit-speakable-truth.js stays as the verbose local report
// (grouped by missing-selector set, up to 30 URLs per group). Keep the two in
// sync — the selector-matching rules below are deliberately identical.
//
// Matching is intentionally LOOSE (see existsSimple/exists): a selector counts
// as present when every simple token it mentions is found somewhere in the
// page. It does NOT verify nesting (`.faq-item summary` only checks that both
// `.faq-item` and `summary` occur). Loose = no false positives, and a false
// positive here would block a deploy for no reason — see the transient-FS
// history in scripts/validate-og.js.
'use strict';
const fs = require('fs');
const path = require('path');

const DEFAULT_ROOT = path.join(__dirname, '..', '_site');

function walkHtml(dir, root, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walkHtml(p, root, out);
    else if (e.name.endsWith('.html')) {
      const rel = path.relative(root, p).split(path.sep).join('/');
      out.push({ url: '/' + rel.replace(/index\.html$/, ''), s: fs.readFileSync(p, 'utf8') });
    }
  }
  return out;
}

// Collect every cssSelector declared in any speakable block on the page.
function selectorsOf(html) {
  const out = [];
  const re = /"speakable"\s*:\s*\{[^}]*"cssSelector"\s*:\s*\[([^\]]*)\]/g;
  let m;
  while ((m = re.exec(html))) {
    for (const raw of m[1].split(',')) {
      const sel = raw.trim().replace(/^["']|["']$/g, '');
      if (sel) out.push(sel);
    }
  }
  return out;
}


function jsonLdNodes(html) {
  const out = [];
  const re = /<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html))) {
    try {
      const parsed = JSON.parse(m[1]);
      const arr = Array.isArray(parsed) ? parsed : (parsed['@graph'] || [parsed]);
      for (const node of arr) {
        if (node && typeof node === 'object') out.push(node);
      }
    } catch (e) {
      // JSON syntax is checked elsewhere; this gate focuses on speakable mounting.
    }
  }
  return out;
}

function selectorList(spec) {
  if (!spec) return [];
  const value = spec.cssSelector;
  if (Array.isArray(value)) return value.map((x) => String(x).trim()).filter(Boolean);
  if (typeof value === 'string') return [value.trim()].filter(Boolean);
  return [];
}

function sameSelectorList(actual, expected) {
  const a = Array.isArray(actual) ? actual : [];
  if (a.length !== expected.length) return false;
  for (let i = 0; i < expected.length; i++) if (a[i] !== expected[i]) return false;
  return true;
}

function nodeHasType(node, type) {
  const t = node && node['@type'];
  return Array.isArray(t) ? t.includes(type) : t === type;
}

function countClassToken(html, cls) {
  let n = 0;
  for (const m of html.matchAll(/class\s*=\s*["']([^"']*)["']/g)) {
    if (m[1].split(/\s+/).includes(cls)) n++;
  }
  return n;
}

function speakableClassTags(html) {
  const out = [];
  for (const m of html.matchAll(/<([a-zA-Z0-9-]+)\b[^>]*class\s*=\s*["'][^"']*\bspeakable\b[^"']*["'][^>]*>/g)) {
    out.push(m[1].toLowerCase());
  }
  return out;
}

function isBlogArticleUrl(url) {
  const parts = url.split('/').filter(Boolean);
  if (parts[0] === 'blog') return parts.length === 2;
  if (['de', 'es', 'fr', 'ru', 'pl'].includes(parts[0]) && parts[1] === 'blog') return parts.length === 3;
  return false;
}

function strictBlogIssues(page) {
  const { url, s } = page;
  if (!isBlogArticleUrl(url)) return { issues: [], warnings: [] };
  const issues = [];
  const warnings = [];
  const nodes = jsonLdNodes(s);
  const blog = nodes.filter((n) => nodeHasType(n, 'BlogPosting'));
  const faq = nodes.filter((n) => nodeHasType(n, 'FAQPage'));

  const h1Count = (s.match(/<h1\b/gi) || []).length;
  if (h1Count !== 1) issues.push('h1 count=' + h1Count + ' (expected 1)');

  const tags = speakableClassTags(s);
  if (tags.length !== 2) issues.push('.speakable nodes=' + tags.length + ' (expected 2)');
  else {
    const div = tags.filter((t) => t === 'div').length;
    const p = tags.filter((t) => t === 'p').length;
    if (div !== 1 || p !== 1) issues.push('.speakable tags=' + tags.join('+') + ' (expected one div Hook + one p TL;DR)');
  }

  const blogSels = blog.flatMap((n) => selectorList(n.speakable));
  if (blog.length !== 1) issues.push('BlogPosting nodes with speakable=' + blog.length + ' (expected 1)');
  else if (!sameSelectorList(blogSels, ['h1', '.speakable'])) {
    issues.push('BlogPosting.speakable=' + JSON.stringify(blogSels) + ' (expected ["h1",".speakable"])');
  }

  const faqSels = faq.flatMap((n) => selectorList(n.speakable));
  if (faq.length !== 1) issues.push('FAQPage nodes with speakable=' + faq.length + ' (expected 1)');
  else if (!sameSelectorList(faqSels, ['.faq-answer'])) {
    issues.push('FAQPage.speakable=' + JSON.stringify(faqSels) + ' (expected [".faq-answer"])');
  }

  const faqCount = countClassToken(s, 'faq-answer');
  if (faq.length === 1) {
    const entityCount = Array.isArray(faq[0].mainEntity) ? faq[0].mainEntity.length : 0;
    if (faqCount !== entityCount) {
      issues.push('.faq-answer targets=' + faqCount + ' but FAQPage.mainEntity=' + entityCount);
    }
    if (entityCount < 3 || entityCount > 5) warnings.push('FAQPage.mainEntity count=' + entityCount + ' (standard: 3-5)');
  }

  return { issues, warnings };
}

function stripSpeakable(html) {
  return html.replace(/"speakable"\s*:\s*\{[^}]*"cssSelector"\s*:\s*\[[^\]]*\]\s*\}/g, '');
}

// Loose single-token presence test.
// Must support compound / descendant selectors (`.faq-item summary`, `.a.b`,
// `h1.foo`) — an earlier audit version treated the whole string as one class
// name, so descendant selectors could never match and every page reported a
// false positive.
function existsSimple(html, sel) {
  if (sel.startsWith('.')) {
    const cls = sel.slice(1);
    const esc = cls.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`class\\s*=\\s*["'][^"']*\\b${esc}\\b[^"']*["']`).test(html);
  }
  if (sel.startsWith('#')) {
    const id = sel.slice(1);
    const esc = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`id\\s*=\\s*["']${esc}["']`).test(html);
  }
  const tag = sel.replace(/[.:\[].*$/, '');
  if (!tag) return true;
  return new RegExp(`<\\s*${tag}[\\s/>]`, 'i').test(html);
}

function exists(html, sel) {
  // Split descendant / sibling combinators, then each `.a.b` fragment.
  const parts = sel.split(/\s*[>+~]\s*|\s+/).filter(Boolean);
  if (!parts.length) return true;
  for (const part of parts) {
    const simples = part.match(/[.#]?[\w-]+/g) || [];
    if (!simples.length) continue;
    for (const s of simples) if (!existsSimple(html, s)) return false;
  }
  return true;
}

// Pure check — no I/O side effects beyond reading, no process.exit.
// Exported so the self-test can point it at synthetic roots.
function check(root = DEFAULT_ROOT) {
  if (!fs.existsSync(root)) return { error: 'no built pages under ' + root };
  const pages = walkHtml(root, root);
  const ok = [];
  const bad = [];
  const strictBad = [];
  const warnings = [];
  let strictTotal = 0;

  for (const r of pages) {
    const sels = selectorsOf(r.s);
    if (sels.length) {
      const missing = sels.filter((s) => !exists(stripSpeakable(r.s), s));
      if (missing.length) bad.push({ url: r.url, sels, missing });
      else ok.push({ url: r.url, sels });
    }

    const strict = strictBlogIssues(r);
    if (isBlogArticleUrl(r.url)) strictTotal++;
    if (strict.issues.length) strictBad.push({ url: r.url, issues: strict.issues });
    if (strict.warnings.length) warnings.push({ url: r.url, warnings: strict.warnings });
  }

  return { pages, ok, bad, strictBad, warnings, strictTotal };
}

function main() {
  const res = check();
  if (res.error) {
    console.error('[validate-speakable] FAIL — ' + res.error + ' (run the build first)');
    process.exit(1);
  }
  const { pages, ok, bad, strictBad, warnings, strictTotal } = res;

  console.log('scanned ' + pages.length + ' built pages in _site/');
  console.log('pages declaring speakable     : ' + (ok.length + bad.length));
  console.log('declarations all real         : ' + ok.length);
  console.log('declarations with missing sel : ' + bad.length);
  console.log('blog strict speakable pass     : ' + (strictTotal - strictBad.length) + ' / ' + strictTotal);
  console.log('blog strict speakable issues   : ' + strictBad.length);
  console.log('blog FAQ count warnings        : ' + warnings.length);

  if (warnings.length) {
    console.log('   [warn] FAQPage.mainEntity count outside 3-5:');
    for (const w of warnings.slice(0, 20)) console.log('      ! ' + w.url + ' — ' + w.warnings.join('; '));
    if (warnings.length > 20) console.log('      ... +' + (warnings.length - 20) + ' more');
  }

  if (strictBad.length) {
    console.error('\n[validate-speakable] FAIL — strict blog speakable mounting issues:');
    for (const x of strictBad.slice(0, 30)) {
      console.error('   ' + x.url);
      for (const issue of x.issues) console.error('      - ' + issue);
    }
    if (strictBad.length > 30) console.error('   ... +' + (strictBad.length - 30) + ' more');
    process.exit(1);
  }

  if (bad.length) {
    const byMiss = {};
    for (const b of bad) {
      const k = b.missing.join('+');
      (byMiss[k] = byMiss[k] || []).push(b.url);
    }
    for (const [k, urls] of Object.entries(byMiss)) {
      console.log('   [missing ' + k + '] ' + urls.length + ' page(s)');
      for (const u of urls.slice(0, 10)) console.log('      x ' + u);
      if (urls.length > 10) console.log('      ... +' + (urls.length - 10) + ' more');
    }
    console.error(
      '\n[validate-speakable] FAIL — ' + bad.length +
      ' page(s) declare a cssSelector that does not exist in their own HTML'
    );
    console.error('  (violates hard rule #4 "never declare something that does not exist")');
    process.exit(1);
  }

  console.log('[validate-speakable] PASS');
}

module.exports = { check, selectorsOf, stripSpeakable, exists, existsSimple };

if (require.main === module) main();
