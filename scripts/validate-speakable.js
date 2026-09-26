// speakable declaration validator — build-chain gate.
//
// Usage:  node scripts/validate-speakable.js
//
// Rule (project's top-priority hard rule #4): NEVER declare to search engines
// something that does not exist.  Every selector listed in a page's
// JSON-LD `speakable.cssSelector` MUST really exist in that page's own HTML.
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

// Remove the speakable declaration itself before searching for the selectors,
// otherwise `.badge-capsule` inside the declaration would match itself.
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
  for (const r of pages) {
    const sels = selectorsOf(r.s);
    if (!sels.length) continue;
    const missing = sels.filter((s) => !exists(stripSpeakable(r.s), s));
    if (missing.length) bad.push({ url: r.url, sels, missing });
    else ok.push({ url: r.url, sels });
  }
  return { pages, ok, bad };
}

function main() {
  const res = check();
  if (res.error) {
    console.error('[validate-speakable] FAIL — ' + res.error + ' (run the build first)');
    process.exit(1);
  }
  const { pages, ok, bad } = res;

  console.log('scanned ' + pages.length + ' built pages in _site/');
  console.log('pages declaring speakable     : ' + (ok.length + bad.length));
  console.log('declarations all real         : ' + ok.length);
  console.log('declarations with missing sel : ' + bad.length);

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
