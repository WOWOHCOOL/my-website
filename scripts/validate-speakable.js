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

// --- DOM-level tag scan (2026-10-01) -------------------------------------
// Regex can only count "class=... speakable ..." text. DOM-level validation needs
// element identity, document order and nesting -- in particular the documented
// nested double-count defect (a .speakable nested in another still counts as 2 by
// regex but is structurally wrong). Focused tokenizer (same approach as
// scripts/validate-html.js): honours quoted attributes, skips comments/doctype/PI,
// and SKIPS script/style bodies -- essential because JSON-LD carries <a href>
// strings that would otherwise parse as real tags.
const VOID_TAGS = new Set(["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"]);

function scanTags(html) {
  const out = [];
  let i = 0;
  while (i < html.length) {
    const lt = html.indexOf("<", i);
    if (lt < 0) break;
    if (html.startsWith("<!--", lt)) { const e = html.indexOf("-->", lt + 4); i = e < 0 ? html.length : e + 3; continue; }
    if (html.startsWith("<!", lt) || html.startsWith("<?", lt)) { const e = html.indexOf(">", lt); i = e < 0 ? html.length : e + 1; continue; }
    let j = lt + 1, closing = false;
    if (html[j] === "/") { closing = true; j++; }
    if (!/[a-zA-Z]/.test(html[j] || "")) { i = lt + 1; continue; }
    const ns = j; j++;
    while (j < html.length && /[a-zA-Z0-9-]/.test(html[j])) j++;
    const name = html.slice(ns, j).toLowerCase();
    let k = j, quote = null;
    for (; k < html.length; k++) {
      const c = html[k];
      if (quote) { if (c === quote) quote = null; continue; }
      if (c === "\"" || c === "'") { quote = c; continue; }
      if (c === ">") break;
    }
    if (k >= html.length) break;
    const attrs = html.slice(j, k);
    const selfClosing = html[k - 1] === "/" || VOID_TAGS.has(name);
    if (!closing && (name === "script" || name === "style")) {
      const cm = html.slice(k + 1).match(new RegExp("</" + name + "\\s*>", "i"));
      out.push({ name, closing: false, selfClosing: true, attrs });
      i = cm ? k + 1 + cm.index + cm[0].length : html.length;
      continue;
    }
    out.push({ name, closing, selfClosing, attrs, index: lt });
    i = k + 1;
  }
  return out;
}

function classListFromAttrs(attrs) {
  const m = String(attrs).match(/\bclass\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
  const val = m ? (m[1] || m[2] || m[3] || "") : "";
  return val.split(/\s+/).filter(Boolean);
}

// Span-based (NOT a global stack): HTML optional-end tags (<p>, <li>, <td>...)
// make a naive element stack drift (measured: depth=146 on a real article),
// which produced false "nested" verdicts. Instead, for each speakable element
// find its own matching close tag by counting same-name opens/closes.
function matchClose(tags, idx) {
  const open = tags[idx];
  let depth = 0;
  for (let k = idx; k < tags.length; k++) {
    const u = tags[k];
    if (u.name !== open.name) continue;
    if (u.closing) { depth--; if (depth === 0) return u.index; }
    else if (!u.selfClosing) depth++;
  }
  return Number.MAX_SAFE_INTEGER;   // unclosed -> treat as spanning to EOF
}

function speakableDomElements(html) {
  const tags = scanTags(html);
  const found = [];
  for (let i = 0; i < tags.length; i++) {
    const t = tags[i];
    if (t.closing || t.selfClosing) continue;
    if (!classListFromAttrs(t.attrs).includes('speakable')) continue;
    found.push({ tag: t.name, start: t.index, end: matchClose(tags, i), nested: false });
  }
  // nesting: one speakable span contains another's start
  for (const a of found) for (const b of found) if (a !== b && a.start < b.start && b.start < a.end) b.nested = true;
  return found;
}

function countDomClass(html, cls) {
  let n = 0;
  for (const t of scanTags(html)) if (!t.closing && classListFromAttrs(t.attrs).includes(cls)) n++;
  return n;
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

  // DOM-level: identity + order + nesting (not just a class-string count).
  const spDom = speakableDomElements(s);
  if (spDom.length !== 2) issues.push('.speakable DOM elements=' + spDom.length + ' (expected 2)');
  else {
    const [hook, tldr] = spDom;
    if (hook.tag !== 'div' || tldr.tag !== 'p') {
      issues.push('.speakable DOM tags=' + hook.tag + '+' + tldr.tag + ' (expected div Hook + p TL;DR)');
    }
    if (hook.nested || tldr.nested) {
      issues.push('.speakable DOM: nested speakable element (double-count) -- Hook and TL;DR must be siblings, not nested');
    }
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

  const faqCount = countDomClass(s, 'faq-answer');   // DOM-level count
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


// Built-in self-test: the DOM-level nesting rule must catch a nested .speakable
// (the old regex counted it as 2 and passed it). Run: node scripts/validate-speakable.js --selftest
function selftest(quiet) {
  const os = require("os");
  const page = (nested) => {
    const hook = nested
      ? '<div class="bg-brandBlue/5 speakable"><p class="text-lg">Hook.</p><p class="text-sm speakable">TL;DR.</p></div>'
      : '<div class="bg-brandBlue/5 speakable"><p class="text-lg">Hook.</p></div><p class="text-sm speakable">TL;DR.</p>';
    const ld = JSON.stringify({ "@graph": [
      { "@type": "BlogPosting", "headline": "T", "speakable": { "@type": "SpeakableSpecification", "cssSelector": ["h1", ".speakable"] } },
      { "@type": "FAQPage", "speakable": { "@type": "SpeakableSpecification", "cssSelector": [".faq-answer"] },
        "mainEntity": [0,1,2].map((i) => ({ "@type": "Question", "name": "Q"+i, "acceptedAnswer": { "@type": "Answer", "text": "A"+i } })) }
    ] });
    const faq = [0,1,2].map((i) => '<div class="faq-answer">A'+i+'</div>').join("");
    return '<!doctype html><html><head><script type="application/ld+json">'+ld+'</script></head><body><h1>Title</h1>'+hook+faq+'</body></html>';
  };
  const mk = (html) => { const r = fs.mkdtempSync(path.join(os.tmpdir(), "spk-")); const d = path.join(r, "blog", "sample"); fs.mkdirSync(d, { recursive: true }); fs.writeFileSync(path.join(d, "index.html"), html); return r; };
  const good = check(mk(page(false)));
  const bad = check(mk(page(true)));
  const badHit = bad.strictBad.length === 1 && /nested/.test(bad.strictBad[0].issues.join(" "));
  const ok = good.strictBad.length === 0 && badHit;
  if (!quiet) console.log("[selftest] speakable DOM nesting -- good page clean=" + (good.strictBad.length === 0) + ", bad page flagged=" + badHit);
  if (!ok) { console.error("[selftest] FAIL -- detector is broken (good page flagged or nested bad page missed)"); process.exit(1); }
  if (!quiet) console.log("[selftest] PASS");
}

function main() {
  const loud = process.argv.includes("--selftest");
  selftest(!loud);                       // always prove the detector works first
  if (loud) return;
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

module.exports = { check, selectorsOf, stripSpeakable, exists, existsSimple, scanTags, classListFromAttrs, speakableDomElements, countDomClass };

if (require.main === module) main();
