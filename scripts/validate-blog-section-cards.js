// validate-blog-section-cards.js — every numbered H2 body section must render
// inside a card wrapper.
//
// Why: the blog template standard requires H2 sections to use the gray card
// form (`bg-slate-50 rounded-xl p-6 border border-slate-200 shadow-sm`). The
// `blogSectionCards` transform only covers DE/ES/PL, so EN/FR/RU must hand-write
// the card. Existing deliberate variants (white card, red alert card, table
// card) are accepted as card-like; the checker fails only when a body section
// has no card wrapper at all.
//
// Scope: built HTML in _site/{lang}/blog/**/index.html. Run after Eleventy.
// Usage: node scripts/validate-blog-section-cards.js [--self-test]
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SITE = path.join(ROOT, "_site");
const LANGS = ["blog", "de/blog", "es/blog", "fr/blog", "ru/blog", "pl/blog"];
const STANDARD_CARD =
  "bg-slate-50 rounded-xl p-6 border border-slate-200 shadow-sm";

function hasCardClass(attrs) {
  if (!attrs) return false;
  const cls = attrs.replace(/\s+/g, " ");
  const bg =
    /\bbg-white\b/.test(cls) ||
    /\bbg-(slate|red|amber|blue|green|orange|yellow|emerald|rose|indigo|purple|pink|sky|teal|cyan|lime|violet|fuchsia)-50(?:\/\d+)?\b/.test(
      cls,
    );
  const rounded = /\brounded-(xl|2xl|3xl)\b/.test(cls);
  const pad = /\bp-(5|6|8)\b/.test(cls);
  return bg && rounded && pad;
}

function sectionHasCard(sectionAttrs, body) {
  if (hasCardClass(sectionAttrs)) return true;
  const divRe = /<div\b([^>]*)>/gi;
  let m;
  while ((m = divRe.exec(body))) {
    if (hasCardClass(m[1])) return true;
  }
  return false;
}

function h2Text(body) {
  const m = /<h2\b[^>]*>([\s\S]*?)<\/h2>/i.exec(body);
  if (!m) return "";
  return m[1]
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function walkArticles(dir, out) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkArticles(full, out);
    else if (entry.name === "index.html") out.push(full);
  }
}

function scanFile(file) {
  return scanHtml(fs.readFileSync(file, "utf8"));
}

function selfTest() {
  const good =
    '<section id="x" class="mb-16"><div class="max-w-4xl mx-auto px-6">' +
    '<div class="bg-slate-50 rounded-xl p-6 border border-slate-200 shadow-sm">' +
    "<h2>1. Test</h2><p>body</p></div></div></section>";
  const bad =
    '<section id="x" class="mb-16"><div class="max-w-4xl mx-auto px-6">' +
    "<h2>1. Test</h2><p>body</p></div></section>";
  const variant =
    '<section id="x" class="mb-16"><div class="bg-white rounded-xl p-6 border border-slate-200">' +
    "<h2>1. Test</h2></div></section>";
  const g = scanHtml(good);
  const b = scanHtml(bad);
  const v = scanHtml(variant);
  const ok =
    g.missing.length === 0 &&
    b.missing.length === 1 &&
    v.missing.length === 0 &&
    v.warnings.length === 1;
  if (!ok) {
    console.error("self-test FAILED", { good: g, bad: b, variant: v });
    process.exit(1);
  }
  console.log("self-test passed: good=pass, bad=fail, variant=warn");
}

function scanHtml(html) {
  const sectionRe = /<section\b([^>]*)>([\s\S]*?)<\/section>/gi;
  const missing = [];
  const warnings = [];
  let m;
  while ((m = sectionRe.exec(html))) {
    const attrs = m[1];
    const body = m[2];
    const text = h2Text(body);
    if (!/^\d+\./.test(text)) continue;
    if (!sectionHasCard(attrs, body)) missing.push(text);
    else if (!body.includes(STANDARD_CARD) && !attrs.includes(STANDARD_CARD))
      warnings.push(text);
  }
  return { missing, warnings };
}

function main() {
  if (process.argv.includes("--self-test")) {
    selfTest();
    return;
  }
  const files = [];
  for (const lang of LANGS) walkArticles(path.join(SITE, lang), files);
  const failures = [];
  const warnings = [];
  for (const file of files) {
    const result = scanFile(file);
    for (const text of result.missing) failures.push({ file, text });
    for (const text of result.warnings) warnings.push({ file, text });
  }
  console.log(
    `[validate-blog-section-cards] scanned ${files.length} article page(s)`,
  );
  if (warnings.length) {
    console.log(
      `[validate-blog-section-cards] ${warnings.length} non-standard card variant(s) (not blocking):`,
    );
    for (const w of warnings)
      console.log(
        `  WARN ${path.relative(ROOT, w.file)} :: ${w.text.slice(0, 90)}`,
      );
  }
  if (failures.length) {
    console.log(
      `[validate-blog-section-cards] FAIL — ${failures.length} body section(s) missing a card wrapper:`,
    );
    for (const f of failures)
      console.log(
        `  FAIL ${path.relative(ROOT, f.file)} :: ${f.text.slice(0, 90)}`,
      );
    process.exit(1);
  }
  console.log("[validate-blog-section-cards] PASS — every numbered H2 section has a card wrapper");
}

main();
