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
  about:          { de: "ueber-uns",        es: "sobre-nosotros",      fr: "a-propos",            ru: "o-kompanii",               pl: "o-nas" },
  contact:        { de: "kontakt",          es: "contacto",            /* fr: same */             ru: "kontakty",                 pl: "kontakt" },
  service:        { de: "oem-odm-service",  es: "servicio-oem-odm",    fr: "service-oem-odm",    ru: "oem-odm-uslugi",           pl: "uslugi-oem-odm" },
  "case-studies": { de: "fallbeispiele",    es: "casos-de-exito",      fr: "fallbeispiele",      ru: "keysy",                    pl: "studia-przypadkow" },
  "terms-of-service": { de: "agb",          es: "terminos-condiciones", fr: "cgv",               ru: "usloviya-ispolzovaniya",   pl: "regulamin" },
  "privacy-policy":  { de: "datenschutz",   es: "politica-privacidad", fr: "confidentialite",   ru: "politika-konfidencialnosti", pl: "polityka-prywatnosci" },
  "thank-you":    { de: "danke",            es: "gracias",              fr: "remerciments",       ru: "spasibo",                  pl: "dziekujemy" },
};

const PRODUCT_MAP = {
  "power-bank":       { de: "powerbank",              es: "powerbank",               fr: "batterie-externe",          ru: "poverbanki",               pl: "power-bank" },
  "wireless-charger": { de: "kabelloses-ladegeraet",  es: "cargador-inalambrico",    fr: "chargeur-sans-fil",         ru: "besprovodnye-zaryadki",     pl: "ladowarka-bezprzewodowa" },
  "gan-charger":      { de: "gan-ladegeraet",         es: "cargador-gan",            fr: "chargeur-gan",             ru: "gan-zaryadnye-ustroystva",  pl: "ladowarka-gan" },
  "car-charger":      { de: "autoladegeraet",         es: "cargador-coche",          fr: "chargeur-voiture",         ru: "avtomobilnye-zaryadki",     pl: "ladowarka-samochodowa" },
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

// DE ae/oe/ue/ss 转写词表（正文应改变音符号，slug 保持 ASCII）
const DE_TRANSLIT = {
"abschliessen": "abschließen",
"abwaertskompatibel": "abwärtskompatibel",
"aenderung": "änderung",
"aenderungen": "änderungen",
"alugehaeuse": "alugehäuse",
"anschluesse": "anschlüsse",
"arbeitsplaetze": "arbeitsplätze",
"auftragsbestaetigung": "auftragsbestätigung",
"ausgaenge": "ausgänge",
"ausgaengen": "ausgängen",
"aussenseite": "außenseite",
"ausserdem": "außerdem",
"ausserhalb": "außerhalb",
"baugrösse": "baugröße",
"begrüsst": "begrüßt",
"beguenstigt": "begünstigt",
"behoerde": "behörde",
"behoerden": "behörden",
"benoetigen": "benötigen",
"benoetigt": "benötigt",
"beschaeftigten": "beschäftigten",
"bestaetigen": "bestätigen",
"bestaetigt": "bestätigt",
"blosses": "bloßes",
"buero": "büro",
"bussgeld": "bußgeld",
"bussgelder": "bußgelder",
"durchfuehren": "durchführen",
"eigenstaendige": "eigenständige",
"einschliesslich": "einschließlich",
"einzelstueck": "einzelstück",
"entfaellt": "entfällt",
"erfuellt": "erfüllt",
"europaeischen": "europäischen",
"europaeisches": "europäisches",
"exportlaender": "exportländer",
"faehige": "fähige",
"faehigkeit": "fähigkeit",
"firmengrösse": "firmengröße",
"flughaefen": "flughäfen",
"fruehe": "frühe",
"fruehjahr": "frühjahr",
"fuehren": "führen",
"fuehrender": "führender",
"fuenf": "fünf",
"fuer": "für",
"gebuehr": "gebühr",
"gebuehren": "gebühren",
"gefaelscht": "gefälscht",
"gegenmassnahmen": "gegenmaßnahmen",
"gehaeuse": "gehäuse",
"gehoert": "gehört",
"gekuehlte": "gekühlte",
"gemäss": "gemäß",
"geprueft": "geprüft",
"gepruefte": "geprüfte",
"geprueften": "geprüften",
"geraet": "gerät",
"geraete": "geräte",
"geschaeftsreisen": "geschäftsreisen",
"geschaetzt": "geschätzt",
"gleichmässig": "gleichmäßig",
"gross": "groß",
"grossaufträge": "großaufträge",
"grosse": "große",
"grosskunden": "großkunden",
"gruen": "grün",
"gruenem": "grünem",
"grösse": "größe",
"grösser": "größer",
"grössere": "größere",
"grösste": "größte",
"grössten": "größten",
"gueltig": "gültig",
"gueltigen": "gültigen",
"gueltigkeit": "gültigkeit",
"gueltigkeitsbereich": "gültigkeitsbereich",
"haelfte": "hälfte",
"haelt": "hält",
"haeufig": "häufig",
"haeufige": "häufige",
"haeufigste": "häufigste",
"haeufigsten": "häufigsten",
"handgepaeck": "handgepäck",
"heiss": "heiß",
"heisst": "heißt",
"hoechster": "höchster",
"hoechstes": "höchstes",
"hoehere": "höhere",
"hoeherer": "höherer",
"integritaet": "integrität",
"juengsten": "jüngsten",
"kabellaenge": "kabellänge",
"kaeufer": "käufer",
"kapazitaet": "kapazität",
"koennen": "können",
"kompatibilitaet": "kompatibilität",
"konformitaet": "konformität",
"kopfhoerer": "kopfhörer",
"kuehler": "kühler",
"kuehlt": "kühlt",
"kuehlung": "kühlung",
"ladeflaeche": "ladefläche",
"ladegeraet": "ladegerät",
"ladegeraete": "ladegeräte",
"ladegeraeten": "ladegeräten",
"laedt": "lädt",
"laender": "länder",
"laesst": "lässt",
"laeuft": "läuft",
"loesung": "lösung",
"luecke": "lücke",
"luefter": "lüfter",
"maerz": "märz",
"massstab": "maßstab",
"moeglich": "möglich",
"muessen": "müssen",
"muetze": "mütze",
"nennkapazitaet": "nennkapazität",
"noetig": "nötig",
"oberflaeche": "oberfläche",
"oesterreich": "österreich",
"ordnungsgemässe": "ordnungsgemäße",
"persoenliche": "persönliche",
"ploetzlich": "plötzlich",
"praezision": "präzision",
"preisguenstig": "preisgünstig",
"produktionsstaette": "produktionsstätte",
"produktqualitaet": "produktqualität",
"proprietaere": "proprietäre",
"pruefbescheinigung": "prüfbescheinigung",
"pruefen": "prüfen",
"pruefliste": "prüfliste",
"pruefpunkt": "prüfpunkt",
"prueft": "prüft",
"pruefung": "prüfung",
"puenktliche": "pünktliche",
"qualitaet": "qualität",
"qualitaetskontrolle": "qualitätskontrolle",
"qualitaetssicherung": "qualitätssicherung",
"quarantaene": "quarantäne",
"rahmenvertraege": "rahmenverträge",
"realitaet": "realität",
"regelmässige": "regelmäßige",
"regelmässigen": "regelmäßigen",
"rueckruf": "rückruf",
"ruesten": "rüsten",
"saemtliche": "sämtliche",
"schaetzung": "schätzung",
"schliessen": "schließen",
"schutzmassnahmen": "schutzmaßnahmen",
"serioeser": "seriöser",
"staender": "ständer",
"staerkster": "stärkster",
"standardmässig": "standardmäßig",
"strasse": "straße",
"strassen": "straßen",
"stueck": "stück",
"stueckliste": "stückliste",
"taeglich": "täglich",
"tatsaechlich": "tatsächlich",
"traeger": "träger",
"tuev": "tüv",
"ueber": "über",
"uebereinkommen": "übereinkommen",
"uebereinstimmen": "übereinstimmen",
"uebereinstimmung": "übereinstimmung",
"ueberhitzung": "überhitzung",
"ueberproportional": "überproportional",
"ueberpruefung": "überprüfung",
"ueberschreiten": "überschreiten",
"uebersicht": "übersicht",
"ueberwachung": "überwachung",
"unabhaengig": "unabhängig",
"unbeschaedigt": "unbeschädigt",
"ungewoehnlich": "ungewöhnlich",
"ungueltig": "ungültig",
"unserioesen": "unseriösen",
"unterstuetzen": "unterstützen",
"unveraendert": "unverändert",
"unveraendertem": "unverändertem",
"verfuegbar": "verfügbar",
"verfuegt": "verfügt",
"verfuegung": "verfügung",
"verkaeufe": "verkäufe",
"verkehrstraeger": "verkehrsträger",
"verliess": "verließ",
"verstössen": "verstößen",
"verzoegern": "verzögern",
"verzoegert": "verzögert",
"vollstaendig": "vollständig",
"vollstaendige": "vollständige",
"vollstaendiger": "vollständiger",
"vollstaendiges": "vollständiges",
"vollstaendigkeit": "vollständigkeit",
"waechst": "wächst",
"weiss": "weiß",
"zurueckgewiesen": "zurückgewiesen",
"zusaetzlich": "zusätzlich",
"zuverlaessigen": "zuverlässigen",
"übermässiger": "übermäßiger",
};

// Regex patterns to find paths in file content
const PATH_PATTERNS = [
  // href="/xx/..." or href="https://www.wowohcool.com/xx/..."
  /href="(https?:\/\/www\.wowohcool\.com)?\/(de|es|fr|ru|pl)\/([^"]+)"/g,
  // "url": "https://www.wowohcool.com/xx/..."
  /"url":\s*"(https?:\/\/www\.wowohcool\.com)?\/(de|es|fr|ru|pl)\/([^"]+)"/g,
  // "publishingPrinciples": "..."
  /"publishingPrinciples":\s*"(https?:\/\/www\.wowohcool\.com)?\/(de|es|fr|ru|pl)\/([^"]+)"/g,
];

const LANG_DIRS = { de: "de", es: "es", fr: "fr", ru: "ru", pl: "pl" };
const SRC_ROOT = path.resolve(__dirname, "..", "src");

// ── Helpers ──────────────────────────────────────────────────────────────

function findViolations(filePath, content, lang) {
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
            `/${prefix}/produ${prefix === "ru" || prefix === "pl" ? "kty" : prefix === "de" ? "kte" : prefix === "es" ? "ctos" : "its"}/${correct}`
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

  // ── Catch unprefixed site-level paths (added 2026-08-14) ────────────────
  // Two bug classes previously slipped past this hook:
  //   1. url/publishingPrinciples/href → English page WITHOUT a lang prefix
  //      (e.g. "...wowohcool.com/about/" instead of ".../de/ueber-uns/").
  //   2. Site-level @id missing the lang prefix (e.g. "#organization"
  //      instead of "/de/#organization").

  // Check 1: unprefixed English page path in url/publishingPrinciples/href
  const englishSlugs = Object.keys(PAGE_MAP).join("|");
  const unprefixedPathRe = new RegExp(
    '(href|"url"|"publishingPrinciples")\\s*[:=]\\s*"(?:https?://www\\.wowohcool\\.com)?/(' + englishSlugs + ')(/|")',
    "g"
  );
  let upm;
  while ((upm = unprefixedPathRe.exec(content)) !== null) {
    const slug = upm[2];
    const correct = PAGE_MAP[slug][lang];
    if (correct) {
      violations.push({
        line: lineNumberOf(content, upm.index),
        current: upm[0],
        fixed: upm[0].replace(`/${slug}`, `/${lang}/${correct}`),
        reason: `"${slug}" is missing the "${lang}/" prefix → "${lang}/${correct}"`,
      });
    }
  }

  // Check 2: site-level @id must be lang-agnostic (one shared @id across locales)
  const prefixedIdRe = /"@id":\s*"https?:\/\/www\.wowohcool\.com\/(de|es|fr|ru|pl)\/#([a-z-]+)"/g;
  let uid;
  while ((uid = prefixedIdRe.exec(content)) !== null) {
    const frag = uid[2];
    violations.push({
      line: lineNumberOf(content, uid.index),
      current: uid[0],
      fixed: uid[0].replace(/www\.wowohcool\.com\/(de|es|fr|ru|pl)\/#/, "www.wowohcool.com/#"),
      reason: `@id "#${frag}" should not have a lang prefix (use one shared @id)`,
    });
  }


  // Check 3: DE 转写（ae/oe/ue/ss → ä/ö/ü/ß），仅德语
  if (lang === "de") {
    let body = content
      .replace(/<script[\s\S]*?<\/script>/g, (m) => m.replace(/[^\n]/g, " "))
      .replace(/(?:id|href|src|srcset)="[^"]*"/g, (m) => m.replace(/[^\n]/g, " "))
      .replace(/(?:^|\n)(?:canonical|enPath|dePath|esPath|frPath|ruPath|plPath|ogImage|ogType|navActive|articleSection|articleTags):\s*[^\n]*/g, (m) => m.replace(/[^\n]/g, " "))
      .replace(/(?:^|\n)\s*(?:en|de|es|fr|ru|pl):\s*"[^"]*"/g, (m) => m.replace(/[^\n]/g, " "))
      .replace(/https?:\/\/[^\s"'<>]+/g, (m) => m.replace(/[^\n]/g, " "))
      .replace(/\/[a-z0-9/_.-]+\.(?:webp|jpg|png|jpeg|json|njk)/g, (m) => m.replace(/[^\n]/g, " "));
    const translitRe = new RegExp("(?<![A-Za-zÀ-ÿ])(" + Object.keys(DE_TRANSLIT).join("|") + ")(?![A-Za-zÀ-ÿ])", "gi");
    let tm;
    while ((tm = translitRe.exec(body)) !== null) {
      const w = tm[1].toLowerCase();
      const fixed = tm[1][0] === tm[1][0].toLowerCase() ? DE_TRANSLIT[w] : DE_TRANSLIT[w][0].toUpperCase() + DE_TRANSLIT[w].slice(1);
      violations.push({
        line: lineNumberOf(body, tm.index),
        current: tm[1],
        fixed,
        reason: `"${tm[1]}" → "${fixed}" (umlaut)`,
      });
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
      const violations = findViolations(filePath, content, lang);

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
