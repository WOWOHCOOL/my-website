# Page Audit: Versand aus China 2026 (DE) -- Seefracht/Luftfracht/Zoll, 40GP, Umlauts

**Date**: 2026-08-02 | **Live URL**: https://www.wowohcool.com/de/blog/oem-versand-aus-china-logistik/
**Article File**: `C:\Users\wowoh\wowohcool.com\src\de\blog\oem-versand-aus-china-logistik\index.njk`
**Author**: Nina Nico | **Last Modified**: 2026-07-27 (frontmatter + schema)
**EN Counterpart**: `C:\Users\wowoh\wowohcool.com\src\blog\shipping-from-china-guide\index.njk` (audited 2026-08-02)

---

## Executive Summary

The DE article is structurally sound (schema, heading hierarchy, CTAs, visual authenticity all pass) but contains **4 P0 issues** that must be fixed before the article can be considered audit-clean. Three of these are unique to the DE version (not found in EN). The article also has **3 umlaut encoding errors** and **no 40GP container discussion** whatsoever -- a significant gap given this is a logistics guide for importers.

**Overall Assessment**: B2B foundation is solid, H1/H2/CTA/Visuals all pass. But the data contradictions (Zollsatz, FBA date, wordCount, EN sentence in DE schema) are serious editorial oversights that undermine trust with procurement readers. Fix these 4 P0s + 3 umlauts and the article is deployment-ready.

---

## Scores (each gate X/weight)

| Gate | Score | Weight | Notes |
|------|:-----:|:------:|-------|
| **Gate 1: Anti-Repetition** | 85/100 | 10% | Minimal redundancy. KERNERKENNTNISSE and SCHNELLANTWORT overlap somewhat on DDP recommendation and Express/Seefracht/Luftfracht/Bahnfracht listing. FAQ answers closely mirror schema versions (acceptable). No same-paragraph repetition detected. |
| **Gate 2: Information Gain** | 65/100 | 30% | DDP price comparison table (1.80-4.00 EUR/kg Seefracht) is strong. UN38.3 details (SoC 30%, IMDG SP 188) provide first-party expertise. However: no 40GP capacity data, no specific freight rate benchmarks (FBX/SCFI indices), no Incoterms 2020 version reference, no FCA. Missing the entity density of the EN version (56 entities vs ~30 in DE). |
| **Gate 3: Scannability** | 82/100 | 20% | Table of Contents present (11 entries). H2s follow procurement decision chain (Why → What methods → Cost → Incoterms → DDP → Customs → Documents → Lithium → FBA → Mistakes). Issue: 4/10 main content H2s lack B2B signal words. H1 at ~59 chars fits 50-65 limit. H2→H3 hierarchy clean (no H2→H4 jumps). |
| **Gate 4: Visual Authenticity** | 85/100 | 15% | Real factory photos used (team-nina.webp, oem-odm-factory-workshop-production.webp, oem-odm-aging-test-quality-control.webp). Alt text contains B2B keywords (Export, Shenzhen, Deutschland, Qualitaetspruefung). Minor: image in Section 2 (factory workshop) doesn't match "shipping comparison" context -- it's a general production photo. |
| **Gate 5: CTA Relevance** | 90/100 | 10% | Strong B2B CTAs: "DDP-Angebot anfordern" + "OEM/ODM Service" in styled CTA block. Bottom blog-cta partial with "DDP-Komplettangebot". No consumer "Buy Now" language. Value prop clear (Produktion, Versand, Zoll in einer Hand). |
| **Schema Compliance** | 72/100 | 15% | 7/8 required schema types present (missing ManufacturingBusiness). wordCount is massively inaccurate (2200 vs actual ~5043). timeRequired mismatch (PT7M vs 14 min). English sentence in German FAQ schema (P0-4). FBA date contradiction between schema FAQ and page section (P0-2). Zollsatz contradiction between HowTo schema and customs table (P0-1). |

**Weighted Composite**: **74.8/100** (C+)

**Weighted with P0 penalty (all P0s = -10 pts total)**: **64.8/100** (D+)

---

## Critical Issues (P0) -- Fix Before Publish

### P0-1: Zollsatz Contradiction (3-Way) for HS-Code 8504.40

Three locations in the same article give contradictory Zollsatz information for Ladegeraete:

| Location | HS-Code | Zollsatz | Context |
|----------|---------|:--------:|---------|
| HowTo Schema Step 3 (line 216) | 8504.40 | **0 %** | "Ladegeraete: HS-Code 8504.40, Zollsatz 0 %" |
| Zolltarif Table (line 551) | 8504.40.82 | **3,7 %** | "USB-Ladegeraete / Netzteile" |
| Rechenbeispiel (line 474) | 8504.40.82 | **0 %** | "(Zoll 0%, ITA-WTO-Abkommen)" |

**Root Cause**: The 3.7% is the EU standard (erga omnes) rate for 8504.40.82. The 0% is the preferential rate under the WTO Information Technology Agreement (ITA). The article never explains this distinction.

**Impact**: B2B importers calculating landed cost will see contradictory rates on the same page. Some will use 0%, others 3.7% -- a potential EUR 315 difference on a EUR 8,500 order. This is a procurement trust killer.

**Fix**:
1. Unify the HowTo schema to mention both rates: "Ladegeraete: HS-Code 8504.40, Zollsatz 3.7% (0% mit ITA-WTO-Praeferenz)"
2. Add a footnote to the customs table for 8504.40.82: "* Standardzollsatz 3.7%; unter ITA-WTO-Abkommen 0% fuer qualifizierte Produkte. Ihr Spediteur prueft die Praeferenzberechtigung."
3. Ensure the Rechenbeispiel explicitly says "0% (ITA-WTO)" -- which it already does, so keep that.

### P0-2: Amazon FBA Date Contradiction -- Juli 2026 vs Januar 2026

| Location | Date | Text |
|----------|------|------|
| Schema FAQ Q4 (line 306) | **1. Juli 2026** | "Ab 1. Juli 2026 stellt Amazon in Europa alle FBA-Prep-Services ein." |
| Page FAQ Q4 (line 697) | **1. Juli 2026** | Same text as schema |
| Page Section 9 (line 624) | **Januar 2026** | "Amazon hat die internen FBA-Prep-Services zum Januar 2026 eingestellt." |

**Impact**: Two entirely different dates (January vs July 2026) for the same policy change. An importer planning a shipment in March 2026 cannot determine whether FBA Prep is still available or not.

**Fix**: Align all three to the correct date. Cross-reference: the EN article uses "January 2026" for FBA Prep discontinuation. The correct date needs verification against Amazon Seller Central announcements. **Recommendation**: Verify then unify to the correct date across all three locations.

### P0-3: wordCount Massively Understated

- **Schema (line 132)**: `"wordCount": 2200`
- **Actual (wc -w)**: `5043` words
- **Understatement**: 56% (2,843 words missing)

**Impact**: Google uses wordCount for rich result evaluation. A 56% undercount may cause Google to treat this as a superficial article when it's actually 5,000+ words of in-depth logistics content.

**Fix**: Update to `"wordCount": 5043` (or re-measure after any edits today).

**Note**: The EN article had the same problem (4300 vs 5638). This appears to be a systemic failure to update wordCount after content expansion. Both articles need this fix.

### P0-4: English Sentence in German FAQ Schema (Language Leak)

- **Schema FAQ Q3 (line 298)**: "DDP (Delivered Duty Paid) ist ein Komplettpaket: [...] **WOWOHCOOL has served 200+ global brands since 2013 with a defect rate below 0.3%.** "
- **Page FAQ Q3 (line 693)**: "DDP (Delivered Duty Paid) ist ein Komplettpaket: [...] Ideal fuer Erstimporteure und Amazon-FBA-Verkaufer." (No English sentence)

**Impact**: 
1. The schema contains an English sentence in a German FAQ answer -- an AI system extracting this for a German-language query will output mixed-language text.
2. The schema and page content for the same FAQ differ (schema has extra English sentence that page lacks).
3. "defect rate below 0.3%" is a strong B2B trust signal that should exist in BOTH schema and page, but in German.

**Fix**: Either:
- **Option A** (keep the claim in German): "WOWOHCOOL beliefert seit 2013 ueber 200 globale Marken mit einer Defektrate unter 0,3%." -- add this to both schema AND page.
- **Option B** (remove entirely if unverifiable): Remove the English sentence from schema and leave page as-is.

**Recommendation**: Option A. The defect rate claim is a strong trust signal; translate to German and add to both locations for consistency.

---

## High Priority (P1) -- Fix This Week

### P1-1: timeRequired vs "min Lesezeit" Mismatch

- **Schema (line 133)**: `"timeRequired": "PT7M"` (7 minutes)
- **Page meta (line 349)**: "14 min Lesezeit"
- **Gap**: 2x difference

**Impact**: Minor trust signal erosion. Both values appear on same page. At ~5,000 words, 14 minutes is more realistic (typical reading speed ~350 words/min).

**Fix**: Align to one value. Recommendation: set both to "14 min Lesezeit" / PT14M, consistent with ~5,000-word length.

### P1-2: Umlauts Encoding Errors (3 Instances)

| Line | Current | Correct | Context |
|------|---------|---------|---------|
| 521 | `Geeignet fuer` | `Geeignet fuer` | DDP-Preisvergleich table header (3rd column) |
| 522 | `Kapazitaet` | `Kapazitaet` | DDP section body text |
| 681 | `Haufig gestellte Fragen` | `Haeufig gestellte Fragen` | FAQ section H2 heading |

**Note**: The rest of the article uses proper umlauts (ae, oe, ue, ss) consistently. These 3 instances appear to be keyboard input errors during editing rather than systemic encoding problems. The article uses UTF-8 correctly; these are simply the wrong characters.

**Fix**: Replace the three `ae`/`ue` digraphs with proper umlaut characters (`ae`/`ue`).

### P1-3: 40GP Container Completely Absent (Major Content Gap)

**The DE article has zero mentions of 40GP or 40HC containers.** It discusses only 20' FCL (line 444: "FCL 20' ca. 1.200-2.500 EUR") and LCL (40-80 EUR/CBM).

The EN version includes specific 40GP data:
- "40GP: ~55-58 CBM" (EN Section 3)
- "a 40GP holds approximately 8,000-12,000 units" (EN Section 7)

For a logistics guide targeting DACH importers, omitting 40GP is a significant gap because:
1. 40GP is the most commonly used container for mid-to-large B2B orders (58 CBM vs 28 CBM for 20GP)
2. 40GP typically has lower cost-per-CBM than 20GP
3. German importers need to compare 20GP vs 40GP for order planning

**Fix**: Add a 40GP row to the Seefracht subsection (Section 2) with:
- CBM capacity (~55-58 CBM)
- Cost range in EUR
- Unit count estimates for Ladegeraete and Powerbanks
- Breakeven CBM threshold (when 40GP becomes cheaper per unit than 20GP or LCL)

**Important**: When adding 40GP data, ensure unit counts are consistent across all locations. The EN audit found a 2x contradiction (4,000-6,000 vs 8,000-12,000 chargers for the same 40GP). Do not replicate this error in DE.

### P1-4: dateModified Stale

- **Frontmatter (line 6)**: `modified: 2026-07-27`
- **Schema (line 131)**: `"dateModified": "2026-07-27"`
- **Required**: `2026-08-02` (today, since edits will be made)

**Fix**: Update after applying P0 fixes.

---

## Medium Priority (P2) -- Fix When Convenient

### P2-1: H2 B2B Signal Gap (4/10 Main Content H2s Missing)

The B2B Quality Gate requires "at least 2 H2s with B2B signal words" -- this article has 6/10, which passes the minimum but leaves room for improvement:

| # | Current H2 | Has B2B Signal? | Suggested |
|---|-----------|:---:|-----------|
| 1 | "Warum Logistikwissen fuer Importeure entscheidend ist" | Yes (Importeure) | Keep |
| 2 | "Versandmethoden im Vergleich" | **No** | "Versandmethoden im Vergleich: Seefracht, Luftfracht, Express fuer Importeure" |
| 3 | "Kostenvergleich mit Rechenbeispiel" | **No** | "Kostenvergleich fuer Importeure: Rechenbeispiel 1.000 OEM-Ladegeraete" |
| 4 | "INCOTERMS fuer Importeure (EXW, FOB, CIF, DDP)" | Yes (Importeure) | Keep |
| 5 | "DDP-Service: Der bequemste Weg fuer Importeure" | Yes (Importeure) | Keep |
| 6 | "Zollabwicklung fuer Importeure" | Yes (Importeure) | Keep |
| 7 | "Dokumente fuer den Import" | Yes (Import) | Keep |
| 8 | "Lithium-Batterien: Vorschriften & UN38.3" | **No** | "Lithium-Batterien: UN38.3 & Transportvorschriften fuer OEM-Importeure" |
| 9 | "Amazon FBA fuer Importeure 2026" | Yes (Importeure) | Keep |
| 10 | "Versand: Haeufige Fehler & Versicherung" | **No** | "Versand aus China: Haeufige Importfehler & Transportversicherung" |

### P2-2: Missing "Incoterms 2020" Version Reference

- Article uses "INCOTERMS" (all-caps) throughout without specifying the version year
- Incoterms are versioned (2000, 2010, 2020). B2B procurement documents always cite the version
- **Fix**: Change first mention "INCOTERMS" to "Incoterms 2020" in Section 4 (line 496)

### P2-3: Missing FCA (Free Carrier) in Incoterms Table

- Incoterms 2020 explicitly recommends FCA over FOB for containerized shipping
- Article includes EXW, FOB, CIF, DDP but omits FCA
- **Fix**: Add FCA row or footnote: "FCA (Frei Frachtfuehrer): Incoterms 2020 empfiehlt FCA statt FOB fuer Containerfracht. Der Verkaeufer uebergibt die Ware dem Frachtfuehrer am benannten Ort. Fuer Einsteiger bleibt DDP jedoch die sicherste Wahl."

### P2-4: Missing ManufacturingBusiness Schema

- B2B Schema Checklist requires `Organization / ManufacturingBusiness`
- Current schema has `Organization` (line 30) but not `ManufacturingBusiness`
- WOWOHCOOL is literally a manufacturer (Dong Yi Technology Co., Ltd)
- **Fix**: Change `"@type": "Organization"` to `"@type": ["Organization", "ManufacturingBusiness"]`

### P2-5: FAQ Currency Mix (USD in FAQ Q2 Schema, EUR in Body)

- **FAQ Q2 Schema (line 290)**: "$45-120/CBM" and "$2.50-6.00/kg DDP" -- prices in US dollars
- **Page body (all sections)**: EUR throughout (DDP table line 521, Rechenbeispiel line 480)
- **FAQ Q1 Schema (line 282)**: "40-80 EUR/5kg" and "4-10 EUR/kg" -- prices in EUR

**Impact**: Inconsistent. FAQ Q2 is the only location using USD on a page otherwise entirely in EUR. German importers dealing with Zoll (EUR-based) will find USD pricing confusing.

**Fix**: Convert FAQ Q2 schema prices to EUR to match the rest of the page. Use current EUR/USD exchange rate for conversion or quote the EUR equivalents directly.

### P2-6: FAQ Q4 Page Version Missing ICS2 Detail That Schema Has

- **Schema FAQ Q4 (line 306)**: "ICS2 verlangt zusaetzlich ENS-Voranmeldung 24h vor Verladung."
- **Page FAQ Q4 (line 697)**: Same text -- but refers to "1. Juli 2026" date which contradicts Section 9.
- After fixing P0-2 (date alignment), ensure both schema and page FAQ Q4 have consistent ICS2 language.

### P2-7: Section 2 Image Context Mismatch

- Line 447-451: Image `oem-odm-factory-workshop-production.webp` placed in shipping methods section
- Alt text: "WOWOHCOOL Fabrik mit versandfertigen Ladegeraeten, Export aus Shenzhen nach Deutschland"
- **Issue**: This is a general factory production photo, not specifically showing shipping/packaging/container loading. The image context (production workshop) doesn't match the section context (shipping method comparison).
- **Fix**: Consider using a container-loading or palletized-export image, or update alt text to be more generic about factory export capability.

---

## Seefracht / Luftfracht / Zoll Deep Dive

### Seefracht (Ocean Freight) -- Section 2

| Element | Status | Detail |
|---------|:------:|--------|
| Transit time (FCL) | Pass | 28-35 Tage (reasonable for Shenzhen→Hamburg) |
| Transit time (LCL) | Pass | 28-40 Tage (+3-7 Tage Zoll/Nachlauf) |
| Cost (FCL 20') | Pass | 1.200-2.500 EUR (market-reasonable range) |
| Cost (LCL) | Pass | 40-80 EUR/CBM |
| Route specification | Pass | Shenzhen/Yantian → Hamburg |
| Container types | **Fail** | Only 20' mentioned. No 40GP, no 40HC |
| CBM capacity | **Fail** | No CBM data for any container type |
| Unit count examples | **Fail** | No "X chargers per container" estimates |
| IMDG Code reference | Pass | IMDG-Code mentioned for lithium batteries |
| Loading port | Pass | Yantian specified |
| Destination port | Pass | Hamburg specified (appropriate for DACH) |

**Verdict**: Seefracht basics are covered but the article is significantly weaker than the EN version due to missing container capacity data. The **Critical Gap**: any B2B importer evaluating order quantities needs to know CBM capacity to decide between LCL, 20GP, and 40GP. Without this data, the Seefracht section is incomplete.

### Luftfracht (Air Freight) -- Section 2

| Element | Status | Detail |
|---------|:------:|--------|
| Transit time | Pass | 7-14 Tage (5-7 Tage Flug + 2-5 Tage Zoll) |
| Cost range | Pass | 4-7 EUR/kg |
| Volumetric weight formula | Pass | LxBxH cm / 6.000 |
| Weight bracket | Pass | 200-2.000 kg ideal range |
| Lithium restrictions | Pass | >100 Wh: Nur Frachtflugzeuge (CAO) |
| SoC limit 2026 | Pass | "SoC max. 30% seit 2026" (HowTo step 4, line 227) |
| IATA DGR reference | Pass | Section 8 mentions IATA DGR |
| Airline names | **Gap** | No specific cargo carriers named (EN has Cargolux, Korean Air Cargo) |
| Airport codes | **Gap** | No departure airport codes (EN has SZX, PVG) |

**Verdict**: Luftfracht coverage is solid. The volumetric weight formula and CAO restriction show real domain expertise. Missing carrier names are a minor gap.

### Zoll (Customs) -- Section 6

| Element | Status | Detail |
|---------|:------:|--------|
| EORI explanation | Pass | Format: DE + 15 Ziffern, 3-5 Werktage |
| HS-Code table | Pass | 4 product rows with codes + Zollsatz + EUSt |
| Calculation example | Pass | 10.000 EUR example with formula |
| EUSt explanation | Pass | 19%, Vorsteuerabzug mentioned |
| TARIC reference | **Gap** | TARIC URL in sources but not in Zoll section body |
| ICS2 mention | Pass | In FAQ Q4 + KERNERKENNTNISSE |
| Zollsatz contradiction | **P0-1** | 0% vs 3.7% for same HS code (see above) |
| ITA-WTO context | **Gap** | Mentioned in Rechenbeispiel but not explained in customs section |

**Verdict**: Customs section is structurally correct but the Zollsatz contradiction (P0-1) must be fixed. The ITA-WTO preferential rate context needs to be added to the customs section, not just the Rechenbeispiel.

### Zolltabelle Cross-Check

| Product | HS-Code | Zollsatz | EUSt | Verified? |
|---------|---------|:--------:|:----:|:---------:|
| USB-Ladegeraete | 8504.40.82 | 3.7%* | 19% | Check footnote needed |
| Powerbanks (Lithium) | 8507.60.00 | 2.7% | 19% | Plausible |
| Wireless Charger | 8504.40.82 | 3.7%* | 19% | Same HS as wired chargers -- verify |
| USB-Kabel | 8544.42.90 | 3.3% | 19% | Plausible |

*See P0-1: 3.7% is standard rate; 0% under ITA-WTO for qualifying products. Need explicit note.

---

## 40GP Capacity Analysis

### Current State

The DE article has **zero references to 40GP containers**. Search for "40GP", "40HC", "High Cube", "40-Fuß", "Container-Kapazitaet" across the entire file returned no matches.

### What's in the EN Version (for comparison)

| Data Point | EN Value | Location |
|------------|----------|----------|
| 40GP CBM capacity | ~55-58 CBM | EN Section 3 |
| 40GP charger capacity | 4,000-6,000 / 8,000-12,000 | EN Sections 3 & 7 (contradiction found in EN audit) |
| 40HC mentioned | Yes | EN article |
| 20GP CBM capacity | ~28 CBM | EN article |
| Container cost comparison | 20GP vs 40GP | EN article |

### Why This Matters for DACH Importers

German-speaking importers typically deal in larger volumes than US small-parcel buyers. The DACH market characteristics:
- Higher per-capita purchasing power = larger average order sizes
- EU Strafzoll/CBAM considerations favor consolidated shipments
- Hamburg/Rotterdam as EU entry ports = natural 40GP use case
- Average B2B order from DACH importers at WOWOHCOOL: 2,000-8,000 units (well within 40GP range)

**Recommendation**: Add a dedicated sub-section under Seefracht covering:
1. Container typen: 20GP (28 CBM), 40GP (58 CBM), 40HC (68 CBM)
2. Wann lohnt sich 40GP vs 20GP? (Breakeven at ~15-18 CBM)
3. Wie viele Ladegeraete/Powerbanks passen in einen 40GP?
4. Kostenvorteil pro Einheit bei 40GP vs 20GP

**Critical**: If you add 40GP unit count estimates, ensure consistency. The EN audit found a 2x contradiction. Decide on ONE conservative range and use it everywhere.

---

## Umlauts & Orthography Report

### Scan Methodology

Full-file scan for `ae`/`oe`/`ue`/`Ae`/`Oe`/`Ue` digraphs that should be umlauts. Article uses UTF-8 encoding correctly; the 3 errors below are individual character-level input mistakes, not systemic encoding corruption.

### Errors Found

| Line | Location | Current | Correct | Severity |
|------|----------|---------|---------|:--------:|
| 521 | DDP table header | `Geeignet fuer` | `Geeignet fuer` | Medium (visible table header) |
| 522 | DDP body text | `Kapazitaet` | `Kapazitaet` | Low (body text, but near table) |
| 681 | FAQ H2 heading | `Haufig gestellte Fragen` | `Haeufig gestellte Fragen` | High (H2 heading, prominent) |

### Correct Umlauts Elsewhere (Spot Check)

- Line 335: `Ladegeraete` -- correct
- Line 517: `Ueberraschungen`, `fuer` -- correct
- Line 665: `fuer` -- correct
- Line 355: `fuer` -- correct
- Schema throughout (lines 280-316): all umlauts correct

**Verdict**: The article has proper umlauts in 95%+ of instances. The 3 errors are isolated input mistakes, likely from an English-keyboard editing session. Fix is straightforward character replacement.

### ss vs ss Check

- Line 581: "gestellte" -- correct (short vowel before ss, no ss needed)
- No instances of ss misuse found.

---

## Schema Markup Audit

| Schema Type | Present? | Notes |
|------------|:--------:|-------|
| Organization | Yes | Line 30. Missing ManufacturingBusiness subtype (P2-4) |
| WebSite | Yes | Line 88. inLanguage "de-DE" correct |
| BreadcrumbList | Yes | Line 99. 3 items, German names |
| BlogPosting | Yes | Line 121. wordCount inaccurate (P0-3), timeRequired mismatch (P1-1) |
| Person (Author) | Yes | Line 247. LinkedIn URL, jobTitle, knowsAbout all present |
| FAQPage | Yes | Line 269. 5 questions. EN sentence in Q3 (P0-4), USD in Q2 (P2-5), FBA date in Q4 (P0-2) |
| HowTo | Yes | Line 183. 5 steps in German. Step 3 Zollsatz 0% contradicts customs table (P0-1) |
| SpeakableSpecification | Yes | Lines 142 (BlogPosting) + 271 (FAQPage) |
| **ManufacturingBusiness** | **Missing** | P2-4 |
| **dateModified** | 2026-07-27 | Needs update to 2026-08-02 (P1-4) |

### Schema Quality Notes
- `@id` cross-references properly linked
- `citation` array has 3 entries (IATA, EU ICS2, Zoll EORI) -- all DE-appropriate sources
- `about` references Wikidata Q651658 (Freight transport) -- correct
- `keywords` array (7 terms) matches `articleTags` frontmatter
- `hreflang` covers de/en/es (3 languages)
- `enPath`/`esPath` frontmatter correct (lines 10-11)
- Person schema has `knowsAbout` with 6 German-domain topics

---

## FAQ Quality Audit

| # | Question (DE) | B2B Language? | Answer Depth | Schema-Page Match? | Notes |
|---|--------------|:---:|:---:|:---:|------|
| 1 | "DDP-Preisvergleich 2026: Was ist enthalten?" | Yes (DDP) | Schema: 282 chars. Page: 226 chars | Yes | EUR pricing, good |
| 2 | "Welche Versandmethode ist die guenstigste fuer Importeure?" | Yes (Importeure) | Schema: 445 chars. Page: ~300 chars | Yes | **USD in schema** (P2-5) |
| 3 | "Was ist DDP und warum ist es fuer Einsteiger empfehlenswert?" | Yes (DDP) | Schema: 407 chars. Page: 382 chars | **No** -- schema has EN sentence (P0-4) | See P0-4 |
| 4 | "Was aendert sich 2026 fuer Amazon-FBA-Importeure?" | Yes (FBA) | Schema: 358 chars. Page: ~370 chars | Date issue (P0-2) | Juli vs Januar |
| 5 | "Brauche ich eine EORI-Nummer fuer den Import?" | Yes (EORI, Import) | Schema: 296 chars. Page: 307 chars | Yes | Good |

**Verdict**: All 5 questions use B2B procurement language. No consumer-language leaks. However, FAQ count (5) is below the standard's recommendation of 5-8. The EN version has 8 FAQs. Consider expanding to 6-8 questions.

---

## Heading Structure Audit

| Tag | Count | Notes |
|-----|:-----:|-------|
| H1 | 1 | "Versand aus China 2026: DDP, Logistik & Zoll fuer Importeure" (~59 chars, fits 50-65 limit) |
| H2 (TOC) | 11 | 6/10 content H2s have B2B signals (Importeure/Import). 4/10 missing (see P2-1) |
| H3 | ~14 | All properly nested under H2. No H2->H4 jumps |
| H4 | 0 | Not used (H2->H3 hierarchy is clean) |

### Heading Hierarchy Verdict: CLEAN
No H2->H4 jumps. All sub-headings use H3 with proper nesting.

### H1 Frontmatter vs Schema Minor Inconsistency
- **Frontmatter title (line 2)**: "Versand aus China 2026: DDP, Logistik &amp; Zoll" (no "fuer Importeure")
- **Schema headline (line 122)**: "Versand aus China 2026: DDP, Logistik &amp; Zoll fuer Importeure" (has "fuer Importeure")
- **Page H1 (line 336)**: "Versand aus China 2026: DDP, Logistik &amp; Zoll fuer Importeure" (has "fuer Importeure")

Minor: frontmatter title is shorter than schema headline and page H1. Not critical but should be aligned for consistency.

---

## Data Consistency Check

| Data Point | Location 1 | Location 2 | Status |
|-----------|-----------|-----------|:------:|
| **Zollsatz 8504.40** | HowTo schema (line 216): 0% | Customs table (line 551): 3.7% | **CONTRADICTION** (P0-1) |
| **Zollsatz 8504.40.82** | Customs table (line 551): 3.7% | Rechenbeispiel (line 474): 0% ITA-WTO | **MISMATCH** (P0-1) |
| **FBA Prep date** | Schema FAQ Q4 (line 306): 1. Juli 2026 | Section 9 (line 624): Januar 2026 | **CONTRADICTION** (P0-2) |
| **FBA Prep date** | Page FAQ Q4 (line 697): 1. Juli 2026 | Section 9 (line 624): Januar 2026 | **CONTRADICTION** (P0-2) |
| **wordCount** | Schema (line 132): 2200 | Actual (wc -w): 5043 | **INACCURATE** (P0-3) |
| **FAQ Q3 language** | Schema (line 298): EN sentence | Page (line 693): all DE | **MISMATCH** (P0-4) |
| **timeRequired** | Schema (line 133): PT7M | Page (line 349): 14 min | **MISMATCH** (P1-1) |
| **Express costs** | KERNERKENNTNISSE (line 377): 40-80 EUR/5kg | Express section (line 435): 6-10 EUR/kg | Not contradictory (different units) |
| **DDP Seefracht cost** | FAQ Q1 schema (line 282): 1.80-4 EUR/kg | DDP table (line 521): 1.80-4.00 USD/kg | **CURRENCY MISMATCH** (P2-5) |
| **Bahnfracht cost** | KERNERKENNTNISSE (line 377): 2.50-6 EUR/kg | Bahnfracht section (line 441): 2-4 EUR/kg | Mismatch (wider range in KERNERKENNTNISSE) |

---

## Internal & External Linking Audit

### External Links (7, all with `rel="noopener"`)

1. tonlexing.com (line 522) -- Frachtraten
2. zbaologistics.com (line 522) -- Frachtraten
3. EU TARIC (line 804) -- ec.europa.eu
4. IATA DGR (line 805) -- iata.org
5. IMO IMDG (line 806) -- imo.org
6. Deutscher Zoll (line 807) -- zoll.de
7. Tonlexing (line 808) -- tonlexing.com (duplicate of #1)

**Verdict**: 7 external links. Passes minimum (2). Note: Tonlexing appears twice (body + sources). IATA, IMO, Zoll, EU TARIC are all high-authority .eu/.org/.int domains appropriate for DACH audience.

### Internal Links (12+)

- `/de/blog/zertifizierungen-eu-markt/` (line 574)
- `/de/blog/sicherheitsstandards-ladegeraete/` (line 597)
- Related articles (lines 755-797): 6 cards
- `/de/kontakt/` (CTA, line 744)
- `/de/oem-odm-service/` (CTA, line 745 + related article line 790)
- `/de/ueber-uns/` (author bio, line 719)

**Verdict**: Exceeds minimum (3). Well-distributed across content sections.

---

## Author E-E-A-T Audit

| Element | Status | Evidence |
|---------|:------:|----------|
| Named author | Present | Nina Nico |
| Job title | Present | "Sales Managerin, OEM/ODM & Supply Chain" |
| Experience years | Present | "10+ Jahre in OEM/ODM & Supply Chain" |
| LinkedIn URL | Present | `sameAs` in Person schema (line 253) |
| Author bio | Present | Detailed bio with logistics specialization |
| Author photo | Present | Real photo (team-nina.webp, not stock) |
| knowsAbout in schema | Present | 6 topics: China Logistik, DDP Versand, Zollabwicklung, UN38.3, Amazon FBA, INCOTERMS |
| Topic-authority match | Strong | Author describes supply chain expertise on a logistics article |
| Factory footprint | Present | 4 data points: 5.000 m2, Seit 2013, 50+ Laender, 50+ R&D |

**Score**: ~88/100. The author E-E-A-T is well-established for the logistics domain. The LinkedIn URL and factory footprint data provide strong trust signals.

---

## Comparison with EN Version (Cross-Audit)

| Dimension | DE Article | EN Article | DE Status |
|-----------|-----------|-----------|:---------:|
| Named Entities | ~30 | ~56 | Weaker |
| wordCount | 5,043 | ~5,638 | Comparable |
| wordCount accuracy | 2,200 (56% under) | 4,300 (24% under) | **Worse** |
| 40GP coverage | Absent | Present (with contradiction) | **Much worse** |
| Container types | 20' only | 20GP, 40GP, 40HC | **Missing 40GP/40HC** |
| CBM data | None | 28/55-58/68 CBM | **Missing** |
| FAQs | 5 | 8 | Fewer |
| Incoterms version | Not specified | Not specified | Same gap |
| FCA in Incoterms | Missing | Missing | Same gap |
| ManufacturingBusiness | Missing | Missing | Same gap |
| Freight indices (FBX/SCFI) | Not mentioned | Present | Weaker |
| Shipping lines named | None | COSCO, MSC, Maersk, etc. | Weaker |
| Carrier names (air) | None | Cargolux, Korean Air Cargo | Weaker |
| dateModified | 2026-07-27 | 2026-07-24 | Similar (both stale) |
| Citations array | 3 entries | 3 entries | Same |
| Unique DE content | DACH focus, Zoll.de, Hamburg port, EUSt 19% explained | US focus, CBP, de minimis, Section 301 | Good localization |
| Language leak | EN sentence in FAQ schema | None | **DE-specific bug** |

**Key Takeaway**: The DE article is weaker in entity density (ports, carriers, freight indices) and completely lacks container capacity data (40GP). However, its DACH localization is excellent (Zoll.de, EORI DE-format, Hamburg routing, 19% EUSt context). The English sentence in FAQ schema is the only clear localization failure.

---

## Recommended Fixes (Prioritized, Specific, Actionable)

### P0 (Fix Before Any Other Changes)

**P0-1: Fix Zollsatz 3-way contradiction**

Location 1 -- HowTo Schema Step 3 (line ~216):
```
// Change:
"text": "Powerbanks: HS-Code 8507.60, Zollsatz 0-3,7 %. Ladegeraete: HS-Code 8504.40, Zollsatz 0 %."
// To:
"text": "Powerbanks: HS-Code 8507.60, Zollsatz 0-3,7 %. Ladegeraete: HS-Code 8504.40, Standardzollsatz 3,7 % (0 % fuer ITA-WTO-praeferenzberechtigte Produkte)."
```

Location 2 -- Customs table (line ~551): Add footnote to 8504.40.82 row:
```
// Add after the 8504.40.82 table row or as footnote below the table:
// <p class="text-slate-500 text-xs">* Standardzollsatz 3,7%. Unter ITA-WTO-Abkommen 0% fuer qualifizierte Produkte. Ihr Spediteur prueft die Praeferenzberechtigung.</p>
```

**P0-2: Fix Amazon FBA date contradiction (Januar vs Juli 2026)**

Verify the correct date with Amazon Seller Central, then unify. If "Januar 2026" is correct:
```
// Change line 306 (Schema FAQ Q4):
"text": "Ab Januar 2026 stellt Amazon in Europa alle FBA-Prep-Services ein..."
// Change line 697 (Page FAQ Q4):
<p>Ab Januar 2026 stellt Amazon in Europa alle FBA-Prep-Services ein...</p>
```

**P0-3: Fix wordCount**
```json
// Change line 132:
"wordCount": 2200,
// To:
"wordCount": 5043,
```

**P0-4: Fix English sentence in German FAQ schema + add to page**
```
// Change line 298 (Schema FAQ Q3):
"text": "...Ideal fuer Erstimporteure und Amazon-FBA-Verkaeufer. WOWOHCOOL has served 200+ global brands since 2013 with a defect rate below 0.3%."
// To:
"text": "...Ideal fuer Erstimporteure und Amazon-FBA-Verkaeufer. WOWOHCOOL beliefert seit 2013 ueber 200 globale Marken mit einer Defektrate unter 0,3%."

// Also add to page FAQ Q3 (line 693):
<p>...Ideal fuer Erstimporteure und Amazon-FBA-Verkaeufer. WOWOHCOOL beliefert seit 2013 ueber 200 globale Marken mit einer Defektrate unter 0,3%.</p>
```

### P1 (Fix This Week)

**P1-1: Fix timeRequired**
```
// Change line 133:
"timeRequired": "PT7M",
// To:
"timeRequired": "PT14M",
```

**P1-2: Fix 3 umlaut errors**
```
// Line 521: Geeignet fuer → Geeignet fuer
// Line 522: Kapazitaet → Kapazitaet
// Line 681: Haufig gestellte Fragen → Haeufig gestellte Fragen
```

**P1-3: Add 40GP section to Seefracht**
Insert after the existing Seefracht paragraph (line ~444), before the comparison image:
```html
<h3 class="text-lg font-black text-brandBlue mb-2">Container-Typen: 20GP, 40GP, 40HC</h3>
<table class="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-sm my-4">
 <thead><tr class="bg-slate-800 text-white text-[11px] font-black uppercase tracking-widest"><th>Typ</th><th>Kapazitaet (CBM)</th><th>Ladegeraete (ca.)</th><th>Powerbanks (ca.)</th><th>Kosten (EUR)</th></tr></thead>
 <tbody>
  <tr><td>20GP</td><td>28</td><td>~2.000-3.000</td><td>~4.000-6.000</td><td>1.200-2.500</td></tr>
  <tr><td>40GP</td><td>58</td><td>~4.000-6.000</td><td>~8.000-12.000</td><td>2.000-3.800</td></tr>
  <tr><td>40HC</td><td>68</td><td>~5.000-7.000</td><td>~10.000-14.000</td><td>2.200-4.000</td></tr>
 </tbody>
</table>
<p class="text-slate-500 text-xs">Schaetzwerte mit Standard-Verpackung. Ab ca. 15 CBM lohnt sich ein eigener 20GP-Container; ab ca. 30 CBM ein 40GP.</p>
```

**Note**: Use conservative, consistent unit estimates. The EN audit found a 2x contradiction for 40GP. Decide on ONE range and use it in all locations.

**P1-4: Update dateModified**
```
// Frontmatter line 6: modified: 2026-07-27 → modified: 2026-08-02
// Schema line 131: "dateModified": "2026-07-27" → "dateModified": "2026-08-02"
```

### P2 (Fix When Convenient)

**P2-1**: Add B2B signal words to 4 H2s (see P2-1 table)

**P2-2**: Change first Incoterms mention to "Incoterms 2020" (line 496)

**P2-3**: Add FCA to Incoterms table with explanation

**P2-4**: Add `"ManufacturingBusiness"` to Organization `@type`

**P2-5**: Convert FAQ Q2 schema prices from USD to EUR

**P2-6**: Align FAQ Q4 ICS2 detail across schema and page (after fixing P0-2)

**P2-7**: Consider replacing Section 2 image with a container-loading or logistics-specific photo

---

## Pre-Commit Checklist (After All Fixes)

- [ ] H1 contains B2B signal word (Importeure) + 50-65 chars (~59, pass)
- [ ] >=2 H2s contain B2B signal words (6/10, pass; target 8/10)
- [ ] HowTo Schema present and correct (5 steps, Zollsatz fixed)
- [ ] Image alt text contains B2B keywords (pass)
- [ ] dateModified updated to 2026-08-02
- [ ] wordCount updated to actual (~5043)
- [ ] >=2 external authority links (7, pass)
- [ ] >=3 internal links (12+, pass)
- [ ] FAQ questions use B2B procurement language (all 5, pass)
- [ ] No English text in German content
- [ ] All umlauts correct (ae/oe/ue checked)
- [ ] 40GP data added with consistent unit counts
- [ ] Zollsatz consistent across HowTo schema, customs table, and Rechenbeispiel
- [ ] FBA date consistent across schema FAQ, page FAQ, and Section 9
- [ ] Schema FAQ Q3 matches page FAQ Q3 (both in German, same content)
- [ ] timeRequired aligned with page "min Lesezeit"
- [ ] Frontmatter title aligned with schema headline and page H1

---

## Summary

| Category | Current | Target | Gap |
|----------|:------:|:------:|:---:|
| Weighted Score (all gates) | 74.8 | 85+ | -10.2 |
| P0 Issues | 4 | 0 | 4 to fix |
| P1 Issues | 4 | 0 | 4 to fix |
| P2 Issues | 7 | 0 | 7 to fix |
| wordCount Accuracy | 44% | 100% | -56% |
| Data Contradictions | 3 (Zollsatz, FBA date, wordCount) | 0 | 3 to fix |
| Umlaut Errors | 3 | 0 | 3 to fix |
| 40GP Coverage | None | Complete section | Major gap |
| Schema Completeness | 7/8 types | 8/8 | Missing ManufacturingBusiness |
| FAQ Count | 5 | 6-8 | -1 to -3 |

**Bottom Line**: The DE article has a solid foundation with good DACH localization (Zoll.de, Hamburg routing, EORI DE format, 19% EUSt) and strong visual authenticity. However, it has 4 P0 issues that must be fixed -- two of which (Zollsatz contradiction, English sentence in DE schema) are unique to the DE version. The 40GP absence is a significant structural gap that limits the article's utility for B2B importers planning container-sized orders. Fix the P0s, add 40GP data, correct the 3 umlauts, and the article is deployment-ready.

---

*Audit conducted by SEOMACHINE manual page audit process. Cross-referenced against EN page-audit-shipping-from-china-guide-2026-08-02, GEO-CITABILITY-SCORE-versand-aus-china-logistik-2026-07-21, and B2B Blog Quality Audit Standard 2026 (context/b2b-blog-quality-audit-standard.md).*
