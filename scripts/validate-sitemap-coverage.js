#!/usr/bin/env node
/**
 * validate-sitemap-coverage.js
 *
 * Every page that declares a canonical MUST be reachable in its language's
 * sitemap. Two failure modes, both silent until now:
 *
 *   A. a src page whose build artifact is missing (eleventy produced nothing)
 *   B. a built page whose canonical never made it into the sitemap
 *
 * WHY this exists (2026-09-28): the local `_site/sitemap.xml` was generated at
 * 13:43 while the two newest articles were built at 18:13 — the sitemap was
 * missing both and NOTHING noticed. It was correct in production only because
 * Cloudflare happens to run the whole chain, i.e. correctness rested on build
 * ORDER, not on a check. Nothing anywhere verified sitemap coverage:
 * `generate-sitemaps.js` was wired in but never validated, and
 * `scripts/audit-sitemap.js` exists but was never added to the build.
 *
 * HOW it stays honest: `generate-sitemaps.js` walks `_site` HTML and extracts
 * `<link rel="canonical">`. This validator mirrors that exact rule — same source
 * of truth, same exclusions (a page with no rendered canonical is not a sitemap
 * entry). Pages are skipped when they carry `noSeoTags: true` or have no
 * `canonical:` in frontmatter, which is precisely the 404 pages.
 *
 * Runs after generate-sitemaps.js in `npm run build`. Pure Node, no deps, so it
 * also runs on Cloudflare Pages.
 *
 * Usage: node scripts/validate-sitemap-coverage.js
 * Exit:  0 = every canonical is covered | 1 = at least one gap
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "src");
const BUILD = path.join(ROOT, "_site");
const ORIGIN = "https://www.wowohcool.com";
const MAX_LIST = 20;

const SKIP_DIRS = new Set(["image", "css", "js", "node_modules", ".git"]);

const SITEMAPS = [
  { lang: null, file: "sitemap.xml" },
  { lang: "de", file: "de/sitemap.xml" },
  { lang: "es", file: "es/sitemap.xml" },
  { lang: "fr", file: "fr/sitemap.xml" },
  { lang: "ru", file: "ru/sitemap.xml" },
  { lang: "pl", file: "pl/sitemap.xml" },
];

function walk(dir, match, out, base) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (e) {
    return out;
  }
  for (const e of entries) {
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name) || e.name.startsWith("_")) continue;
      walk(path.join(dir, e.name), match, out, base);
    } else if (match(e.name)) {
      out.push(path.relative(base, path.join(dir, e.name)).split(path.sep).join("/"));
    }
  }
  return out;
}

function frontmatter(content) {
  const m = content.match(/^\uFEFF?---\r?\n([\s\S]*?)\r?\n---/);
  return m ? m[1] : "";
}

function field(fm, name) {
  const m = fm.match(new RegExp("^" + name + ":\\s*(.*)$", "m"));
  return m ? m[1].trim().replace(/^["']|["']$/g, "") : null;
}

// Where should this template's output land? Mirrors Eleventy's default
// (dir/index.njk -> dir/index.html) unless the page sets an explicit permalink.
function outputPath(rel, permalink) {
  if (permalink) {
    let p = permalink.replace(/^\/+/, "");
    if (p === "" || p.endsWith("/")) p += "index.html";
    return p;
  }
  return rel.replace(/index\.njk$/, "index.html");
}

function main() {
  if (!fs.existsSync(BUILD)) {
    console.error(`[sitemap-coverage] ${BUILD} not found — run the build first`);
    process.exit(1);
  }

  const built = new Set(walk(BUILD, (n) => n.endsWith(".html"), [], BUILD));
  const pages = walk(SRC, (n) => n === "index.njk", [], SRC);

  const sitemapLoc = {};
  const sitemapMissing = [];
  for (const { lang, file } of SITEMAPS) {
    const p = path.join(BUILD, file);
    if (!fs.existsSync(p)) {
      sitemapLoc[lang] = null;
      sitemapMissing.push(file);
      continue;
    }
    const xml = fs.readFileSync(p, "utf-8");
    sitemapLoc[lang] = new Set(
      (xml.match(/<loc>([^<]+)<\/loc>/g) || []).map((s) => s.replace(/<\/?loc>/g, ""))
    );
  }

  const notBuilt = [];
  const notListed = [];
  let checked = 0;

  for (const rel of pages) {
    const content = fs.readFileSync(path.join(SRC, rel), "utf-8");
    const fm = frontmatter(content);

    // Same exclusions the generator honours: no rendered canonical => no entry.
    if (/^noSeoTags:\s*true\s*$/m.test(fm)) continue;
    const canonical = field(fm, "canonical");
    if (!canonical) continue;
    checked++;

    const out = outputPath(rel, field(fm, "permalink"));
    if (!built.has(out)) notBuilt.push(`${rel}  ->  _site/${out}`);

    if (/\/404(\.html|\/)?$/.test(canonical)) continue;
    const lang = ["de", "es", "fr", "ru", "pl"].find((L) => canonical.startsWith(`/${L}/`)) || null;
    const bucket = sitemapLoc[lang];
    if (bucket === null) {
      notListed.push(`${rel}  [${lang || "EN"} sitemap missing]`);
    } else if (!bucket.has(ORIGIN + canonical)) {
      notListed.push(`${rel}  ${canonical}  [not in ${lang || "EN"} sitemap]`);
    }
  }

  console.log(
    `[sitemap-coverage] ${checked} canonical page(s) checked against ` +
      `${SITEMAPS.length} sitemap(s)` +
      (sitemapMissing.length ? ` — MISSING sitemap file(s): ${sitemapMissing.join(", ")}` : "")
  );

  const fail = notBuilt.length + notListed.length + sitemapMissing.length;
  if (notBuilt.length) {
    console.error(`  ❌ ${notBuilt.length} src page(s) with NO build artifact:`);
    notBuilt.slice(0, MAX_LIST).forEach((s) => console.error("     " + s));
    if (notBuilt.length > MAX_LIST) console.error(`     … and ${notBuilt.length - MAX_LIST} more`);
  }
  if (notListed.length) {
    console.error(`  ❌ ${notListed.length} page(s) with canonical NOT in their sitemap:`);
    notListed.slice(0, MAX_LIST).forEach((s) => console.error("     " + s));
    if (notListed.length > MAX_LIST) console.error(`     … and ${notListed.length - MAX_LIST} more`);
  }
  if (!fail) console.log("  ✅ every canonical page is built and listed");

  process.exit(fail ? 1 : 0);
}

main();
