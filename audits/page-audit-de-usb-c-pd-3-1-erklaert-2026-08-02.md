# Page Audit: USB-C PD 3.1 Erklärt (DE)

**Audit Date:** 2026-08-02
**Article:** `usb-c-pd-3-1-erklaert`
**File:** `C:\Users\wowoh\wowohcool.com\src\de\blog\usb-c-pd-3-1-erklaert\index.njk`
**Live URL:** `https://www.wowohcool.com/de/blog/usb-c-pd-3-1-erklaert/`
**dateModified in file:** 2026-07-27

---

## Executive Summary

| Dimension | Score | Grade | Notes |
|-----------|:-----:|:-----:|-------|
| B2B Content Quality | **78/100** | B | H2 B2B density lower than EN counterpart |
| Information Gain | **58/100** | C+ | Missing factory data panel present in EN version |
| Schema Compliance | **70/100** | C+ | Mass Umlaut corruption in Schema + FAQ |
| H2 B2B Signal Alignment | **50/100** | D | 3/6 strong, 3/6 weak -- EN version at 5/7 |
| E-E-A-T Signals | **80/100** | B | Author bio solid, expert insight present |
| Technical Density | **82/100** | B+ | Tables and technical data comparable to EN |
| Visual Authenticity | **78/100** | B | 3/4 images lack B2B keywords in alt text |
| GEO Citability | **85/100** | A- | From July 21 GEO audit; Schema Umlaut issue not yet factored |
| **Composite** | **72/100** | **B-** | EN equivalent scored 84/100 (B+) |

### Key Narrative

The DE article is a solid technical explainer but falls significantly behind its EN counterpart in three critical areas: (1) **H2 B2B language density** -- only 3/6 content H2s contain clear B2B procurement signals vs 5/7 in EN; (2) **Information Gain** -- the DE article lacks the WOWOHCOOL Factory Data panel with first-party test results present in the EN version; (3) **Mass Umlaut corruption** -- approximately 54 Umlauts (a, o, u, ss) are systematically stripped from the Schema JSON-LD and visible FAQ HTML sections, representing a critical SEO and AI citability defect.

The EN article underwent a major July 2026 B2B rewrite that transformed it from B2C to B2B procurement language. The DE article received an H1 and some H2 B2B treatment but the H2 rewrite was incomplete and the factory data panel was never added. This is a localization gap, not a translation issue -- the DE market deserves the same procurement-focused content depth.

---

## Part 1: Five Quality Gates Assessment

### Gate 1: Anti-Repetition -- PASS (85/100)

**Status:** No significant intra-paragraph repetition detected. The KERNERKENNTNISSE block (lines 360-369) summarizes body sections without verbatim duplication. The FAQ visible HTML (lines 599-607) is semantically consistent with the Schema FAQ (lines 256-304) but uses slightly different wording -- structurally correct, as Schema FAQ must match page content.

**Minor concern:** The SCHNELLANTWORT block (lines 388-391) partially overlaps with Section 1 content. The overlap is minimal and serves different UX purposes (quick answer vs detailed section). No action required.

### Gate 2: Information Gain -- NEEDS IMPROVEMENT (58/100)

**What the article does well:**
- EU regulatory context box (lines 420-428): Directive 2022/2380 with exact dates, Bitkom statistic. Strong localized data.
- PD 3.1 Gerate & Preise 2026 panel (lines 527-531): DE-market pricing data with euro ranges. Localized for DACH market.
- EXPERTEN-INSIGHT block (lines 581-585): First-person expert quote from Nina Nico with CSCP certification. E-E-A-T signal.
- Named entities: USB-IF, Infineon, EU Directive 2022/2380, Bitkom, Stiftung EAR.
- Specific MOQ and FOB pricing: MOQ ab 500 Stuck (line 605), FOB Shenzhen pricing.

**What's missing (gap to EN version at 72, gap to 80+ target):**

1. **No Factory Data Panel (CRITICAL GAP):** The EN article has a "WOWOHCOOL Factory Data: PD 3.1 Charger Compatibility Test Results" section with Chroma 63600 electronic load measurements, USB-IF TID verification, and a 5-device compatibility matrix. The DE article has a "WOWOHCOOL FAKT" block (lines 593-596) which is a marketing fact, not a first-party data panel. This is the single biggest Information Gain deficit -- approximately 14 points.

2. **No lab measurement data:** Missing ripple noise (mVp-p), thermal readings (degC), efficiency curves, aging test results. The EN audit recommends adding these to push from 72 to 80+. The DE article needs them even more urgently.

3. **No BOM cost breakdown:** The EN article discusses GaN FET vs Si MOSFET generically. The DE article does not even go that deep.

4. **No Cypress CYPD2104 or equivalent chip reference:** The EN article names specific e-marker controller ICs, adding engineering credibility.

**Recommendation:** Add a localized DE version of the EN Factory Data panel:
1. Same test methodology (Chroma 63600, USB-IF TID) but with DE-language labels
2. Ripple noise: e.g., "Ausgangs-Restwelligkeit: 48mVss bei 28V/5A Volllast, gemessen mit Tektronix MDO3104"
3. Thermal: e.g., "Gehausetemperatur: 58,3degC nach 4-Stunden-Dauerlauf bei 25degC Umgebungstemperatur, 100% Last"
4. Efficiency: e.g., "Spitzenwirkungsgrad: 94,7% bei 230V/50Hz Eingang, 28V/5A Ausgang"

### Gate 3: Scannability -- NEEDS IMPROVEMENT (72/100)

**H1:** "USB-C PD 3.1 OEM: 240W Beschaffung & EU-USB-C-Pflicht 2026"
- ~62 characters (slightly over 50-65 target, but acceptable)
- Contains "OEM" + "Beschaffung" = 2 B2B signals
- PASS with minor note on length

**H2 Analysis (6 content H2s + 1 FAQ H2):**

| # | H2 Text | B2B Signals | Score |
|---|---------|:-----------:|:-----:|
| 1 | PD 3.0 vs PD 3.1 vs PD 3.2: Welche Version ist 2026 Zertifizierungsstandard? | None (Zertifizierungsstandard is technical, not procurement) | **FAIL** |
| 2 | SPR vs EPR: Leistungsbereiche und Implikationen fur Ladegerat-Portfolios | "Portfolios" -- weak, product management term | WEAK |
| 3 | PD-Spannungsstufen: Welche Geratekategorien Importeure adressieren konnen | "Importeure" = importers | STRONG |
| 4 | E-Marker-Kabel: Technische Anforderungen und Beschaffungskosten nach Leistungsklasse | "Beschaffungskosten" = procurement costs | STRONG |
| 5 | PPS vs AVS: Spannungsregelungs-Protokolle fur die Produktentwicklung | "Produktentwicklung" -- weak, applies to B2C too | WEAK |
| 6 | Beschaffungsstrategie: PD 3.1 Spezifikationen, MOQ und EU-USB-C-Compliance | "Beschaffungsstrategie" + "MOQ" + "Compliance" | **STRONG** |
| 7 | Haufig gestellte Fragen (FAQ) | None | PASS (FAQ H2 exempt) |

**H2 B2B Density Score: 3/6 strong (50%).** The EN version scores 5/7 (71%).

**Comparison with EN H2s (same article):**

| DE H2 | EN H2 | DE B2B | EN B2B |
|-------|-------|:------:|:------:|
| "Welche Version ist 2026 Zertifizierungsstandard?" | "OEM PD 3.0 vs 3.1 vs 3.2: What to Verify Before Specifying Charger ICs" | 0 signals | OEM + Specifying |
| "Leistungsbereiche und Implikationen fur Ladegerat-Portfolios" | "SPR vs EPR: Selecting Power Range Architecture for Your Charger Product Line" | Weak | Product Line |
| "Welche Geratekategorien Importeure adressieren konnen" | "Which EPR Tier Serves Your Target Market?" | Importeure | Target Market |
| "Beschaffungskosten nach Leistungsklasse" | "E-Marker Cable Sourcing: Specifications, FOB Cost & USB-IF Certification Tiers" | Beschaffungskosten | Sourcing + FOB |
| "fur die Produktentwicklung" | "OEM PPS vs AVS Protocol: Smart Voltage Specs for Product Planning" | Weak | OEM + Product Planning |
| "Beschaffungsstrategie...MOQ und EU-USB-C-Compliance" | "PD 3.1 Sourcing Guide: Specifications, Compliance & Factory Selection" | Strong | Sourcing + Factory + Compliance |

**Recommendation:** Align DE H2s with the EN B2B posture. Specifically:

1. H2 #1: "OEM PD 3.0 vs 3.1 vs 3.2: Was Einkaufer vor der IC-Spezifikation prufen mussen" (adds OEM + Einkaufer)
2. H2 #2: "SPR vs EPR: Leistungsarchitektur fur OEM-Ladegerat-Portfolios auswahlen" (adds OEM)
3. H2 #5: "OEM PPS vs AVS Protokoll: Spannungsspezifikationen fur die Produktplanung" (adds OEM)

**H3 Quality:** All H3s are technically specific. SPR/EPR sub-headings use concrete labels. PASS.

**H3/H4 Direct Answer Rule:** The card-style layout (bg-white rounded-xl p-6) in SPR/EPR sections provides direct answers after H3s. The FAQ section has clear Q&A pairs. Generally better than the EN version's card layout issue. Minor improvement possible: add a one-sentence Zusammenfassung after each H3 before the card detail.

### Gate 4: Visual Authenticity -- NEEDS IMPROVEMENT (78/100)

| Image | Alt Text | B2B Keywords | Status |
|-------|----------|:------------:|:------:|
| Cover (line 349-356) | "USB-C PD 3.1 erklart, 240W Power Delivery mit Extended Power Range SPR vs EPR Vergleich" | None | **NEEDS FIX** |
| Author (line 328) | "Nina Nico, Sales Managerin OEM/ODM &amp; Supply Chain bei WOWOHCOOL" | OEM/ODM, Supply Chain | PASS |
| GaN charger (line 451-455) | "USB-C PD 3.1 GaN-Ladegerat mit Unterstutzung fur SPR 100W und EPR 240W Leistungsbereiche" | None | **NEEDS FIX** |
| GaN side profile (line 518-523) | "GaN PD 3.1 Ladegerat Seitenansicht, kompaktes 240W EPR USB-C Ladegerat von WOWOHCOOL" | None (branding only) | **NEEDS FIX** |

3 of 4 images lack B2B procurement keywords. The author image is the only one with proper B2B alt text.

**Recommendation:**
- Cover: "USB-C PD 3.1 OEM-Beschaffungsleitfaden: 240W EPR SPR vs EPR Vergleich fur B2B-Importeure"
- GaN charger: "USB-C PD 3.1 GaN-Ladegerat OEM: SPR 100W und EPR 240W Dual-Power-Range fur die Fabrik-Beschaffung"
- GaN side: "GaN PD 3.1 OEM-Ladegerat Seitenansicht, 240W EPR kompaktes Fabrik-Ladegerat fur DACH-Importeure"

### Gate 5: CTA Relevance -- PASS (92/100)

CTA section (lines 609-620):
- "PD 3.1 GaN-Ladegerate fur Ihre Marke beschaffen?"
- "WOWOHCOOL bietet OEM-Ladegerate direkt ab Werk mit PD 3.1 EPR-Unterstutzung, passenden EPR-Kabeln und kundenspezifischem Branding. MOQ ab 500 Stuck."
- Buttons: "GaN-Ladegerate ansehen" + "Kostenloses Angebot"

Blog CTA partial (lines 688-694):
- "PD 3.1 Ladegerate direkt ab Werk?"
- "Erhalten Sie ein individuelles Angebot fur OEM/ODM PD 3.1 GaN-Ladegerate."

Strong B2B CTA with clear next step for a procurement manager. PASS.

---

## Part 2: Umlaut Corruption Audit (CRITICAL -- P0)

### Summary

Approximately **54 Umlauts (a, o, u, ss)** are systematically missing from two specific text blocks. This is the most severe defect in the article because it directly impacts search engine understanding of German content and AI citability.

### Block 1: Schema JSON-LD (lines 24-308) -- ~40 errors

The entire Schema section is Umlaut-free. Every a, o, u that should carry an Umlaut is rendered as plain a, o, u. Every ss that should be ss is rendered as ss. This means Google, Bing, and AI crawlers see systematically misspelled German.

**Sample errors (non-exhaustive):**

| Line | Current | Should Be |
|------|---------|-----------|
| 30 | "Ladegerat beschaffen: Kabel und Leistungsklasse wahlen" | "Ladegerat beschaffen: Kabel und Leistungsklasse wahlen" |
| 117 | "USB-C PD 3.1 Erklart" | "USB-C PD 3.1 Erklart" |
| 124 | "USB-C Power Delivery 3.1 erklart" | "USB-C Power Delivery 3.1 erklart" |
| 196 | "GaN Ladegerate" | "GaN Ladegerate" |
| 205 | "Schritt-fur-Schritt-Anleitung fur OEM-Importeure" | "Schritt-fur-Schritt-Anleitung fur OEM-Importeure" |
| 214 | "Prufen Sie die maximale Ladeleistung Ihrer Zielgerate" | "Prufen Sie die maximale Ladeleistung Ihrer Zielgerate" |
| 224 | "EPR-fahiges Kabel" | "EPR-fahiges Kabel" |
| 236 | "Ladegerate bevorzugen (SPR AVS Pflicht ab Marz 2026 fur Projekte)" | "Ladegerate bevorzugen (SPR AVS Pflicht ab Marz 2026 fur Projekte)" |
| 269 | "umfassende Uberarbeitung...eingefuhrt...Einfuhrung...fur OEM-Importeure...fur Notebooks...fur Ladegerate" | "umfassende Uberarbeitung...eingefuhrt...Einfuhrung...fur OEM-Importeure...fur Notebooks...fur Ladegerate" |
| 277 | "unterstutzt...ermoglicht...fuhrt...Fur die OEM-Beschaffung...EPR-fahiges Ladegerat...EPR-fahiges Kabel" | "unterstutzt...ermoglicht...fuhrt...Fur die OEM-Beschaffung...EPR-fahiges Ladegerat...EPR-fahiges Kabel" |
| 290 | "Welche Geratekategorien adressiert PD 3.1 EPR?" | "Welche Geratekategorien adressiert PD 3.1 EPR?" |
| 293 | "EU-USB-C-Pflicht fur Notebooks...eroffnet...fur EPR-fahige Ladegerate" | "EU-USB-C-Pflicht fur Notebooks...eroffnet...fur EPR-fahige Ladegerate" |

### Block 2: Visible FAQ HTML (lines 599-607) -- ~13 errors

| Line | Current | Should Be |
|------|---------|-----------|
| 602 | "Bedeutung hat der Standard fuer OEM?" ... "EU-USB-C-Pflicht fuer Notebooks" ... "Standard fuer OEM-Ladegeraete" | fur x3, Ladegerate |
| 603 | "Kabel brauche ich fuer PD 3.1?" ... "EPR-faehige" ... "unterstuetzen" ... "Ladegeraet" ... "muessen" | fur, fahige, unterstutzen, Ladegerat, mussen |
| 604 | "erforderlich fuer Gaming-Laptops" ... "abwaertskompatibel" | fur, abwartskompatibel |
| 605 | "OEM-Ladegeraet ab Werk?" ... "Ladegeraete:" ... "500 Stueck" | Ladegerat, Ladegerate, Stuck |

### Block 3: Body Text -- 1 minor error

| Line | Current | Should Be |
|------|---------|-----------|
| 524 | "Handflachengrosse" | "Handflachengrosse" (ss → ss in standard DE; "Grosse" is Swiss spelling, article targets DACH so should use standard ss) |

### Root Cause Analysis

The body text (lines 313+) has correct Umlauts throughout (60 total Umlaut characters found via grep). This means the file encoding itself supports UTF-8 Umlauts. The corruption is isolated to two text blocks that share a common characteristic: they were likely composed or pasted through an ASCII-only tool or editor that stripped non-ASCII characters.

**Most likely scenario:** The Schema JSON-LD and visible FAQ HTML were generated or copied from a source that converted Umlauts to ASCII equivalents (a→a, o→o, u→u, ss→ss), then pasted into the .njk file. The body sections were written directly in a UTF-8-capable editor and preserved Umlauts.

### Impact Assessment

| Impact Area | Severity | Detail |
|-------------|:--------:|--------|
| Google Search | **HIGH** | Schema JSON-LD with misspelled German degrades rich snippet eligibility. Google may show "erklart" instead of "erklart" in SERP. |
| AI Citability | **HIGH** | AI models crawl Schema for structured data. Misspelled German reduces citation quality and trust signals. The GEO citability score of 85 was calculated before this issue was factored in -- actual score would be 10-15 points lower. |
| Bing/Yandex | **MEDIUM** | Same Schema issue; less market share but still relevant. |
| Accessibility | **MEDIUM** | Screen readers pronounce "erklart" differently from "erklart". Schema text is read by assistive tech. |
| User Trust | **LOW-MEDIUM** | The visible FAQ (public-facing) has misspelled German. DACH readers notice missing Umlauts immediately. |

---

## Part 3: Schema Compliance Audit

### Schema Checklist

| Schema Node | Status | Notes |
|-------------|:------:|-------|
| Organization | PASS | Complete with address, sameAs, contactPoint, areaServed |
| WebSite | PASS | inLanguage: de-DE, German name "WOWOHCOOL Deutschland" |
| BreadcrumbList | PASS | 3 items, German labels (Startseite, Blog), correct positions |
| BlogPosting | **FAIL** | headline + description contain Umlaut errors; wordCount may be inaccurate |
| Person (Author) | **PARTIAL** | jobTitle correct; knowsAbout has Umlaut errors (Ladegerate) |
| HowTo | **FAIL** | All 4 step texts contain Umlaut errors |
| FAQPage | **FAIL** | All 5 questions + answers contain Umlaut errors |
| SpeakableSpecification | PASS | h1 + .speakable (x2) |
| citation | PASS | 3 authoritative sources (EUR-Lex, USB-IF x2) |
| about (Thing) | PASS | Wikidata Q20026619 |

### Schema Data Consistency

| Field | Frontmatter | Schema BlogPosting | Match? |
|-------|------------|-------------------|:------:|
| headline | "USB-C PD 3.1 OEM: 240W Beschaffung & EU-USB-C-Pflicht" | "USB-C PD 3.1 OEM: 240W Beschaffung & EU-USB-C-Pflicht 2026" | MINOR (year suffix) |
| description | "erklart: 240W EPR..." | "erklart: 240W EPR..." | MATCH (both have Umlaut error) |
| datePublished | 2026-07-01 | 2026-07-01 | MATCH |
| dateModified | 2026-07-27 | 2026-07-27 | MATCH |
| wordCount | -- (frontmatter) | 3200 | NEEDS VERIFICATION |
| author | "Nina Nico" | @id ref to #nina-nico | MATCH |

**Issues:**
1. **wordCount: 3200** -- estimated body text is approximately 2,800 words. Verify exact count and update.
2. **dateModified: 2026-07-27** -- not updated for this audit. If changes are made, update to 2026-08-02.
3. **Frontmatter title missing year** -- Schema adds "2026" to headline. Align both to same value.

### Schema FAQ vs Page FAQ Consistency

| FAQ # | Schema Question | Page Question | Umlauts in Schema | Umlauts in Page |
|-------|----------------|---------------|:-----------------:|:---------------:|
| 1 | "Was ist USB-C PD 3.1 und welche Bedeutung hat der Standard fur OEM-Ladegerate?" | "Was ist USB-C PD 3.1 und welche Bedeutung hat der Standard fuer OEM?" | FAIL | FAIL |
| 2 | "Welche technischen Unterschiede bestehen zwischen PD 3.0 und PD 3.1?" | (same in page) | FAIL | - |
| 3 | "Welche Kabelanforderungen gelten fur PD 3.1 240W in der OEM-Beschaffung?" | "Welches Kabel brauche ich fuer PD 3.1 240W?" | FAIL | FAIL |
| 4 | "Welche Geratekategorien adressiert PD 3.1 EPR?" | "Was ist der Unterschied zwischen SPR und EPR?" | FAIL | FAIL |
| 5 | "Welche technischen Unterschiede bestehen zwischen PPS und AVS?" | "Was kostet ein PD 3.1 OEM-Ladegeraet ab Werk?" | FAIL | FAIL |

**Major issue:** The visible FAQ and Schema FAQ do not align in Q3, Q4, Q5. The Schema has 5 technical questions while the visible page has 4 questions with different topics (Q4 on visible page is SPR vs EPR, Q4 in Schema is device categories; Q5 visible is OEM pricing, Q5 Schema is PPS vs AVS). This is a **FAQ mismatch** -- the visible FAQ and Schema FAQ must contain the same questions. The EN version has 8 aligned FAQ questions. The DE version has 5 in Schema but only 4 on-page, and the topics diverge.

---

## Part 4: Comparison with EN Counterpart

### EN vs DE Side-by-Side

| Dimension | EN Score | DE Score | Delta | Analysis |
|-----------|:--------:|:--------:|:-----:|-----------|
| B2B Content Quality | 91 | 78 | **-13** | DE H2s lack B2B procurement language |
| Information Gain | 72 | 58 | **-14** | DE missing Factory Data panel |
| H2 B2B Density | 100% (5/7) | 50% (3/6) | **-50pp** | Critical gap |
| Schema Compliance | 95 | 70 | **-25** | Umlaut corruption + FAQ mismatch |
| E-E-A-T Signals | 82 | 80 | -2 | Comparable author strength |
| Technical Density | 85 | 82 | -3 | DE has solid tables |
| Visual Authenticity | 88 | 78 | -10 | DE images lack B2B alt text |
| GEO Citability | 87 | 85 | -2 | Pre-Umlaut score; actual lower |
| **Composite** | **84 (B+)** | **72 (B-)** | **-12** | |

### Structural Comparison

| Element | EN | DE |
|---------|:--:|:--:|
| Content H2s | 6 | 6 |
| B2B H2s | 5/7 | 3/6 |
| Factory Data Panel | YES (Chroma 63600, 5-device matrix) | NO (WOWOHCOOL FAKT only) |
| FAQ Questions | 8 (B2B language) | 4 visible + 5 Schema (mismatched) |
| EU Regulatory Context | YES (in FAQ only) | YES (dedicated context box) |
| Expert Insight Block | YES (unattributed source bug) | YES (attributed to Nina Nico) |
| Key Takeaways Block | YES (with unique Cypress detail) | YES (KERNERKENNTNISSE) |
| Pricing Table | YES (FOB + retail) | YES (DE-Markt + FOB Shenzhen) |
| Internal Links | 9+ | 7+ |
| External Links | 5 | 5 |
| Images | 4 | 4 |
| Umlaut/Encoding Issues | NONE | ~54 across Schema + FAQ |

### What DE Does Better Than EN

1. **Dedicated EU Regulatory Context Box** (lines 420-428): The DE article has a standalone "EU-REGULIERUNG: WARUM PD 3.1 JETZT RELEVANT IST" box with exact directive references and timeline. The EN article buries EU mandate info in FAQ Q4 only. This is a genuine localization strength.

2. **DE-Market Pricing** (lines 527-531): "Preisrange DE-Markt (Juli 2026)" with localized euro pricing. The EN article uses USD. Good localization.

3. **Expert Attribution:** The DE Expert Insight block correctly attributes to Nina Nico by name. The EN Expert Insight block has a leading-comma bug (missing attribution name -- P0-2 in EN audit).

---

## Part 5: Technical & On-Page Checks

### External Links (>=2 required)

| # | URL | rel="noopener noreferrer" | Status |
|---|-----|:-------------------------:|:------:|
| 1 | eur-lex.europa.eu (EU Directive) | YES | PASS |
| 2 | usb.org/document-library/usb-power-delivery | YES | PASS |
| 3 | usb.org/usb-type-c-cable-and-connector-specification | YES | PASS |
| 4 | infineon.com (GaN HEMT) | YES | PASS |
| 5 | linkedin.com (author profile) | YES | PASS |

5 external authoritative links -- exceeds minimum. All have `rel="noopener noreferrer"`. PASS.

### Internal Links (>=3 required)

| # | Target | Context |
|---|--------|---------|
| 1 | /de/blog/usb-c-pd-schnellladen/ | Bottleneck Rule callout (Section 4) |
| 2 | /de/blog/gan-ladegeraete-leitfaden/ | More Resources block |
| 3 | /de/blog/gan-vs-silizium-ladegeraete-vergleich/ | More Resources block |
| 4 | /de/produkte/gan-ladegeraet/ | WOWOHCOOL FAKT inline |
| 5 | /de/produkte/gan-ladegeraet/ | CTA button |
| 6 | /de/kontakt/ | CTA button |
| 7-9 | 3 Related Articles cards | Bottom of article |

9+ internal links -- exceeds minimum. All point to correct DE-localized URLs. PASS.

### Image Optimization

| Image | width/height | loading | fetchpriority | srcset? |
|-------|:-----------:|:-------:|:------------:|:------:|
| Cover | 2240/1260 | eager | high | NO |
| GaN charger | 800/800 | lazy | -- | NO |
| GaN side profile | 800/600 | lazy | -- | NO |
| Author photo | 400/400 | lazy | -- | NO |

**Issue:** No `srcset` or `sizes` on any image. The cover image loads at full 2240x1260 on mobile. Same issue as EN version.

### HTML Comments Check

Line 326: `<!-- Compact Author Bar -->` -- properly closed. PASS.

---

## Part 6: Data Consistency Cross-Check

### KERNERKENNTNISSE vs Body Consistency

| Takeaway | Body Section Match | Consistent? |
|----------|-------------------|:-----------:|
| 240W via EPR, EU-USB-C-Pflicht | Section 2 + EU Context Box | MATCH |
| SPR vs EPR with voltage tiers | Section 2 | MATCH |
| PD 3.2 clarification (no panic) | Section 1 (PD 3.2 note) | MATCH |
| Kabel bottleneck rule | Section 4 | MATCH |

No data inconsistencies. PASS.

### FAQ vs Body Consistency

| Topic | Body (Section) | FAQ Answer | Consistent? |
|-------|---------------|------------|:-----------:|
| What is PD 3.1 | Section 1 + SCHNELLANTWORT | FAQ Q1 | MATCH |
| EPR cable requirements | Section 4 | FAQ Q3 | MATCH |
| SPR vs EPR difference | Section 2 | FAQ Q4 | MATCH |
| OEM pricing | Section 6 + Pricing box | FAQ Q5 | MATCH |

Note: FAQ Q2 (visible page: cable requirements) and FAQ Q2 (Schema: PD 3.0 vs 3.1 technical differences) are different questions. The visible page has 4 questions, the Schema has 5 -- and not all match.

---

## Part 7: Prioritized Fixes

### P0 -- CRITICAL: Must Fix Before Any Other Work

| # | Issue | Location | Fix |
|---|-------|----------|-----|
| **P0-1** | **~40 Umlaut errors in Schema JSON-LD** | Lines 24-308 | Rewrite entire Schema section with correct Umlauts. Use UTF-8 encoding. Verify with: `grep -c '[aou]\([aou]\)' index.njk` should return 0 in Schema block. |
| **P0-2** | **~13 Umlaut errors in visible FAQ HTML** | Lines 599-607 | Rewrite FAQ answers with correct Umlauts. This is PUBLIC-FACING misspelled German. |
| **P0-3** | **FAQ mismatch: Schema vs visible page** | Lines 256-304 vs 599-607 | Align Schema FAQ and visible FAQ to same 5 questions. Add missing questions to visible page OR remove extras from Schema. The EN version has 8 questions -- consider expanding DE to 5-8. |
| **P0-4** | **1 Umlaut error in body text** | Line 524 | Change "Handflachengrosse" to "Handflachengrosse" (ss → ss for standard German). |

### P1 -- Should Fix (Before Next Deploy)

| # | Issue | Location | Fix |
|---|-------|----------|-----|
| **P1-1** | **Add Factory Data Panel (mirror EN)** | After Section 6 or as new section | Add DE-localized version of EN's "WOWOHCOOL Factory Data: PD 3.1 Charger Compatibility Test Results" with Chroma 63600 data, 5-device matrix, USB-IF TID verification. This closes the 14-point Information Gain gap. |
| **P1-2** | **H2 #1: No B2B signal** | Line 395 | Rewrite to: "OEM PD 3.0 vs 3.1 vs 3.2: Was Einkaufer vor der IC-Spezifikation prufen mussen" |
| **P1-3** | **H2 #5: Weak B2B signal** | Line 535 | Rewrite to: "OEM PPS vs AVS Protokoll: Spannungsspezifikationen fur die Produktplanung" (add OEM) |
| **P1-4** | **H2 #2: Weak B2B signal** | Line 432 | Rewrite to: "SPR vs EPR: Leistungsarchitektur fur OEM-Ladegerat-Produktlinien auswahlen" |
| **P1-5** | **dateModified not updated** | Frontmatter line 5 + Schema line 131 | Update both to `2026-08-02` |
| **P1-6** | **wordCount verify and update** | Schema line 132 | Count actual words, update from 3200 to verified value |
| **P1-7** | **Cover image alt text lacks B2B keyword** | Line 350 | Change to: "USB-C PD 3.1 OEM-Beschaffungsleitfaden: 240W EPR SPR vs EPR Vergleich fur B2B-Importeure und Einkaufer" |
| **P1-8** | **GaN charger alt text lacks B2B keyword** | Line 452 | Change to: "USB-C PD 3.1 GaN-Ladegerat OEM: SPR 100W und EPR 240W Dual-Power-Range fur die Fabrik-Beschaffung" |
| **P1-9** | **GaN side profile alt text lacks B2B keyword** | Line 519 | Change to: "GaN PD 3.1 OEM-Ladegerat Seitenansicht, 240W EPR kompaktes Fabrik-Ladegerat fur DACH-Importeure" |

### P2 -- Nice to Have (Next 2 Weeks)

| # | Issue | Location | Fix |
|---|-------|----------|-----|
| **P2-1** | **Add lab measurement data to Factory Data panel** | New section | Add ripple noise (mVss), case temperature (degC), efficiency curve (%). This pushes Information Gain from 58 to 70+. |
| **P2-2** | **Add BOM cost breakdown mention** | Section 6 or new Factory Data | Reference GaN FET vs Si MOSFET cost delta for a 140W PD 3.1 charger. |
| **P2-3** | **No srcset on images** | Lines 349-356, 451-455, 518-523 | Add responsive image attributes per factory-verification-checklist template. |
| **P2-4** | **Frontmatter title vs Schema headline inconsistency** | Frontmatter line 2 vs Schema line 122 | Align both: Frontmatter appends year, Schema has year. Make identical. |
| **P2-5** | **Expand FAQ from 4-5 to 8 questions** | Lines 256-304, 599-607 | Mirror EN FAQ structure: add questions about PPS vs AVS detail, EU certification requirements, 3 specs OEM buyers must verify, sourcing from Shenzhen. |
| **P2-6** | **H3 direct answer optimization** | Various H3 sections | Add 100-150 Zeichen Zusammenfassung after each H3 for Featured Snippet capture. |

---

## Part 8: Quality Gate Pre-Commit Checklist

- [x] H1 enthalt B2B-Signalworter + 50-65 Zeichen (OEM + Beschaffung, ~62 Zeichen)
- [ ] >=2 H2s enthalten B2B-Signalworter (3/6 strong, need 4+/6 minimum)
- [x] HowTo Schema vorhanden (4 Schritte)
- [ ] Bild-alt-Texte enthalten B2B-Keywords (1/4 -- P1-7, P1-8, P1-9)
- [ ] dateModified auf aktuelles Datum aktualisiert (zeigt 2026-07-27 -- P1-5)
- [ ] wordCount auf tatsachlichen Wert aktualisiert (3200 -- P1-6)
- [x] >=2 externe autoritative Links (5 Links, alle mit rel="noopener noreferrer")
- [x] >=3 interne Links (9+ Links zu Produktseiten, verwandten Artikeln, Kontakt)
- [ ] FAQ-Fragen in B2B-Beschaffungssprache (teilweise, Schema/Page mismatch -- P0-3)
- [ ] ALLE Umlaute korrekt im gesamten Dokument (54 Fehler -- P0-1, P0-2, P0-4)

**Pre-Commit Status: 4/10 PASS. BLOCKED by P0 Umlaut issues.**

---

## Part 9: Historical Trajectory

```
                         EN Jul 13    EN Jul 23    EN Aug 2     DE Aug 2
                         ---------    ---------    ---------    ---------
Overall Score            70 (C+)      75.6 (Good)  84 (B+)      72 (B-)
B2B Content              60           88.2         91           78
H2 B2B Signals           0/9          6/6          5/7 (71%)    3/6 (50%)
Information Gain         55           63           72           58
GEO Citability           --           --           87           85*
Schema Compliance        80           --           95           70**
Title-Body Match         BROKEN       FIXED        FIXED        PARTIAL

* GEO score of 85 pre-dates Umlaut discovery; actual score 10-15 pts lower
** Schema score 70 driven primarily by Umlaut corruption + FAQ mismatch
```

### Assessment

The DE article is a competent technical explainer with strong DE-market localization (EUR pricing, EU directive context box, DACH-specific regulatory references). However, it falls significantly behind its EN counterpart in three areas:

1. **H2 B2B Language (50% vs 71%):** The EN article underwent a targeted B2B H2 rewrite in July 2026. The DE article received partial treatment but 3/6 H2s still read as B2C tech explainer headings.

2. **Information Gap (58 vs 72):** The EN article added a Factory Data panel with real Chroma 63600 test data. The DE article has no equivalent. This is the primary driver of the 14-point gap.

3. **Umlaut Corruption (CRITICAL):** 54 missing Umlauts across Schema and visible FAQ is a severe SEO defect that must be fixed before any other optimization work. This is not a content quality issue -- it's an encoding/infrastructure issue that makes the article look unprofessional to German readers and damages search engine understanding.

**Bottom line:** Fix the Umlauts first (P0, 1-2 hours of careful editing), then add the Factory Data panel and strengthen H2 B2B language (P1, 2-3 hours). After these fixes, the DE article should reach 82-86 composite, comparable to the EN version.

---

*Audit performed 2026-08-02 against B2B Blog Quality Audit Standard 2026 (v2026-07-30).*
*Cross-referenced with: GEO-CITABILITY-SCORE-usb-c-pd-3-1-erklaert-2026-07-21.md, page-audit-usb-c-pd-3-1-explained-2026-08-02.md.*
*Language: German (de-DE). Target market: DACH.*
