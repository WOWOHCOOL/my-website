#!/usr/bin/env node
/**
 * lint-i18n-paths.js — Detect English path words in non-English content.
 *
 * Scans DE/ES/FR/RU source files for href/url values that contain
 * English page/product slugs instead of their localized equivalents.
 *
 * Usage:
 *   node scripts/lint-i18n-paths.js           # check all non-EN files
 *   node scripts/lint-i18n-paths.js --fix     # auto-fix when unambiguous
 *
 * Exit code: 1 if violations found, 0 if clean.
 */

const fs = require("fs");
const path = require("path");

// ── Mapping: English path word → per-language correct path ──────────────
// Only entries where the EN word DIFFERS from the localized word.
// "faq" and "blog" are universal — not included.
const PAGE_MAP = {
  about:          { de: "ueber-uns",        es: "sobre-nosotros",      fr: "a-propos",            ru: "o-kompanii" },
  contact:        { de: "kontakt",          es: "contacto",            /* fr: same */             ru: "kontakty" },
  service:        { de: "oem-odm-service",  es: "servicio-oem-odm",    fr: "service-oem-odm",    ru: "oem-odm-uslugi" },
  "case-studies": { de: "fallbeispiele",    es: "casos-de-exito",      fr: "fallbeispiele",      ru: "keysy" },
  "terms-of-service": { de: "agb",          es: "terminos-condiciones", fr: "cgv",               ru: "usloviya-ispolzovaniya" },
  "privacy-policy":  { de: "datenschutz",   es: "politica-privacidad", fr: "confidentialite",   ru: "politika-konfidencialnosti" },
  "thank-you":    { de: "danke",            es: "gracias",              fr: "remerciments",       ru: "spasibo" },
};

const PRODUCT_MAP = {
  "power-bank":       { de: "powerbank",              es: "powerbank",               fr: "batterie-externe",          ru: "poverbanki" },
  "wireless-charger": { de: "kabelloses-ladegeraet",  es: "cargador-inalambrico",    fr: "chargeur-sans-fil",         ru: "besprovodnye-zaryadki" },
  "gan-charger":      { de: "gan-ladegeraet",         es: "cargador-gan",            fr: "chargeur-gan",             ru: "gan-zaryadnye-ustroystva" },
  "car-charger":      { de: "autoladegeraet",         es: "cargador-coche",          fr: "chargeur-voiture",         ru: "avtomobilnye-zaryadki" },
};

const PRODUCT_SUB_MAP = {
  "semi-solid-state":     { de: "halbfest-akku",        es: "semi-solido",              fr: "semi-solide",                  ru: "polutverdotelnyy" },
  "wireless-magnetic":    { de: "magnetisch-kabellos",  es: "magnetico-inalambrico",    fr: "magnetique-sans-fil",          ru: "magnitnyy-besprovodnoy" },
  "heating-battery":      { de: "heizakku",             es: "bateria-calefactora",      fr: "batterie-chauffante",          ru: "greyushchaya-batareya" },
  "2-in-1-hybrid":        { de: "2-in-1-hybrid",       es: "2-en-1-hibrido",           fr: "hybride-2-en-1",              ru: "gibrid-2-v-1" },
  "laptop-power":         { de: "laptop-powerbank",     es: "portatil",                 fr: "batterie-externe-ordinateur-portable", ru: "dlya-noutbukov" },
  "smart-display":        { de: "smart-display",        es: "pantalla-inteligente",     fr: "affichage-intelligent",        ru: "smart-displey" },
  "desktop":              { de: "desktop",              es: "escritorio",               fr: "bureau",                      ru: "nastolnaya" },
  "3-in-1-station":       { de: "3-in-1-station",       es: "estacion-3-en-1",          fr: "station-3-en-1",             ru: "stanciya-3-v-1" },
  "car-mount":            { de: "auto-ladehalterung",   es: "soporte-coche",            fr: "support-voiture",            ru: "avtoderzhatel" },
};

// Regex patterns to find paths in file content
const PATH_PATTERNS = [
  // href="/xx/..." or href="https://www.wowohcool.com/xx/..."
  /href="(https?:\/\/www\.wowohcool\.com)?\/(de|es|fr|ru)\/([^"]+)"/g,
  // "url": "https://www.wowohcool.com/xx/..."
  /"url":\s*"(https?:\/\/www\.wowohcool\.com)?\/(de|es|fr|ru)\/([^"]+)"/g,
  // "publishingPrinciples": "..."
  /"publishingPrinciples":\s*"(https?:\/\/www\.wowohcool\.com)?\/(de|es|fr|ru)\/([^"]+)"/g,
];

const LANG_DIRS = { de: "de", es: "es", fr: "fr", ru: "ru" };
const SRC_ROOT = path.resolve(__dirname, "..", "src");

// ── Helpers ──────────────────────────────────────────────────────────────

function findViolations(filePath, content) {
  const violations = [];

  for (const re of PATH_PATTERNS) {
    // Reset regex state
    re.lastIndex = 0;
    let match;
    while ((match = re.exec(content)) !== null) {
      const prefix = match[2]; // de, es, fr, ru
      const fullPath = match[3]; // everything after /de/ etc.

      // Parse the path: first segment = page slug or "products" / "blog"
      const segments = fullPath.replace(/\/$/, "").split("/");

      // Check page-level path (first segment)
      const pageSlug = segments[0];
      if (PAGE_MAP[pageSlug] && PAGE_MAP[pageSlug][prefix]) {
        const correct = PAGE_MAP[pageSlug][prefix];
        const fixed = match[0].replace(`/${prefix}/${pageSlug}`, `/${prefix}/${correct}`);
        violations.push({
          line: lineNumberOf(content, match.index),
          current: match[0],
          fixed,
          reason: `"${pageSlug}" → "${correct}" in ${prefix.toUpperCase()}`,
        });
        continue;
      }

      // Check products path: /xx/products/en-word/...
      if (segments[0] === "products" && segments.length >= 2) {
        if (PRODUCT_MAP[segments[1]] && PRODUCT_MAP[segments[1]][prefix]) {
          const correct = PRODUCT_MAP[segments[1]][prefix];
          const fixed = match[0].replace(
            `/${prefix}/products/${segments[1]}`,
            `/${prefix}/produ${prefix === "ru" ? "kty" : prefix === "de" ? "kte" : prefix === "es" ? "ctos" : "its"}/${correct}`
          );
          violations.push({
            line: lineNumberOf(content, match.index),
            current: match[0],
            fixed,
            reason: `products/${segments[1]} → produ${prefix === "ru" ? "kty" : prefix === "de" ? "kte" : prefix === "es" ? "ctos" : "its"}/${correct} in ${prefix.toUpperCase()}`,
          });
          continue;
        }
        // Check product sub-slugs
        if (segments.length >= 3 && PRODUCT_MAP[segments[1]]) {
          if (PRODUCT_SUB_MAP[segments[2]] && PRODUCT_SUB_MAP[segments[2]][prefix]) {
            const correctProduct = PRODUCT_MAP[segments[1]][prefix];
            const correctSub = PRODUCT_SUB_MAP[segments[2]][prefix];
            const fixed = match[0].replace(
              `/${prefix}/products/${segments[1]}/${segments[2]}`,
              `/${prefix}/produ${prefix === "ru" ? "kty" : prefix === "de" ? "kte" : prefix === "es" ? "ctos" : "its"}/${correctProduct}/${correctSub}`
            );
            violations.push({
              line: lineNumberOf(content, match.index),
              current: match[0],
              fixed,
              reason: `products/${segments[1]}/${segments[2]} → ${correctProduct}/${correctSub} in ${prefix.toUpperCase()}`,
            });
          }
        }
      }
    }
  }

  return violations;
}

function lineNumberOf(text, index) {
  return text.substring(0, index).split("\n").length;
}

function walkDir(dir, callback) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip node_modules, _site, etc.
      if (entry.name.startsWith("_") || entry.name === "node_modules") continue;
      walkDir(fullPath, callback);
    } else if (/\.(njk|html|json|md)$/.test(entry.name)) {
      callback(fullPath);
    }
  }
}

// ── Main ──────────────────────────────────────────────────────────────────

function main() {
  const fixMode = process.argv.includes("--fix");
  let totalViolations = 0;
  const filesWithIssues = [];

  for (const [lang, dir] of Object.entries(LANG_DIRS)) {
    const langRoot = path.join(SRC_ROOT, dir);
    if (!fs.existsSync(langRoot)) continue;

    walkDir(langRoot, (filePath) => {
      const relPath = path.relative(SRC_ROOT, filePath);
      const content = fs.readFileSync(filePath, "utf-8");
      const violations = findViolations(filePath, content);

      if (violations.length > 0) {
        filesWithIssues.push({ filePath, relPath, violations });
        totalViolations += violations.length;
      }
    });
  }

  if (totalViolations === 0) {
    console.log("✅ i18n paths: all clean — no English path words in non-EN content.");
    process.exit(0);
  }

  console.log(`❌ ${totalViolations} i18n path violations in ${filesWithIssues.length} file(s):\n`);

  for (const { relPath, violations } of filesWithIssues) {
    console.log(`  ${relPath}`);
    for (const v of violations) {
      console.log(`    Line ${v.line}: ${v.reason}`);
      console.log(`      Current: ${v.current}`);
      console.log(`      Suggest: ${v.fixed}`);
    }
    console.log("");
  }

  if (fixMode) {
    console.log("🔧 --fix mode: auto-replacing unambiguous violations...");
    let fixed = 0;
    for (const { filePath, violations } of filesWithIssues) {
      let content = fs.readFileSync(filePath, "utf-8");
      for (const v of violations) {
        if (content.includes(v.current)) {
          content = content.replace(v.current, v.fixed);
          fixed++;
        }
      }
      fs.writeFileSync(filePath, content);
    }
    console.log(`✅ Fixed ${fixed} occurrence(s). Please review the changes.\n`);
  }

  console.log(
    "💡 Fix these by replacing English path words with localized equivalents.\n" +
    "   See scripts/lint-i18n-paths.js for the full mapping table."
  );

  process.exit(1);
}

main();
