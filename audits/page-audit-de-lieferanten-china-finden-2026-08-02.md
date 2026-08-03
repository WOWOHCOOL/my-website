# Page Audit: Lieferanten China finden: Sourcing & Due Diligence 2026 (DE)

**Date**: 2026-08-02 | **File**: `C:\Users\wowoh\wowohcool.com\src\de\blog\lieferanten-china-finden\index.njk`
**Auditor**: Manual (8-gate methodology per B2B Blog Quality Audit Standard 2026)
**EN Equivalent Score**: 80/100 (audit 2026-08-02)

---

## Scores

| Gate | Score | Status |
|------|-------|--------|
| Anti-Repetition | 7/10 | Good |
| Information Gain | 19/25 | Good |
| Scannability | 17/20 | Good |
| Visual Authenticity | 7/10 | Good |
| CTA Relevance | 9/10 | Excellent |
| Schema Compliance | 12/15 | Good |
| Meta + Links | 7/10 | Good |
| **TOTAL** | **78/100** | **Good** |

---

## Critical Issues (P0)

### P0-1: FAQ Section Has Corrupted Umlauts -- All Characters Are ASCII-fied (CRITICAL)

The visible FAQ section (lines 690-710) uses ASCII replacements instead of proper German characters:

| Line | Current (Broken) | Correct |
|------|-----------------|---------|
| 690 | `Haeufig gestellte Fragen (FAQ)` | `Häufig gestellte Fragen (FAQ)` |
| 692 | `zuverlaessigen Lieferanten` | `zuverlässigen Lieferanten` |
| 693 | `Pruefen Sie` / `Ueberpruefung` / `Grossbestellung` | `Prüfen Sie` / `Überprüfung` / `Großbestellung` |
| 701 | `Fuer Erstbestellungen` | `Für Erstbestellungen` |
| 704 | `TUeV Rheinland` | `TÜV Rheinland` |
| 705 | `Qualitaetsaudit` / `vollstaendiges` / `Persoenliche` | `Qualitätsaudit` / `vollständiges` / `Persönliche` |
| 708 | `unserioesen` / `haeufigsten` | `unseriösen` / `häufigsten` |
| 709 | `Produktionsstaette` / `laesst` / `gefaelscht` / `ueber` | `Produktionsstätte` / `lässt` / `gefälscht` / `über` |

**Severity**: This is visible to all German-speaking visitors. It makes the page look unprofessional and untrustworthy. The Schema JSON-LD FAQ (lines 268-316) has proper umlauts -- only the visible HTML is corrupted. This is the single most damaging issue on the page.

**Root cause**: These FAQ blocks were added or edited with a tool/process that did not preserve UTF-8 encoding (likely PowerShell `Set-Content` or similar, per memory entry `powershell-encoding-trap.md`).

### P0-2: Image Alt Text Character Corruption (Line 544)

```
Current:  "WOWOHCOOL QC-Inspektionsteam bei der Lieferantenpr fung, Due Diligence und Qualitatskontrolle fur OEM-Importeure in Shenzhen"
Correct:  "WOWOHCOOL QC-Inspektionsteam bei der Lieferantenprüfung, Due Diligence und Qualitätskontrolle für OEM-Importeure in Shenzhen"
```

Three umlauts were stripped: `prüfung` not `pr fung`, `Qualitätskontrolle` not `Qualitatskontrolle`, `für` not `fur`. The space in "Lieferantenpr fung" is a telltale sign of a stripped `ü` character.

### P0-3: Date Display Mismatch -- Three Different Dates

| Location | Value |
|----------|-------|
| Frontmatter `date` | `2026-05-27` |
| Frontmatter `modified` | `2026-07-26` |
| HTML `<time datetime="2026-07-21">` | `21. Juli 2026` |
| Schema `datePublished` | `2026-05-27` |
| Schema `dateModified` | `2026-07-26` |

The HTML display shows **July 21, 2026** which matches **neither** the publish date nor the modified date. Google displays the visible date in SERP, creating confusion.

**Fix**: Change `<time datetime="2026-07-26">` to match `dateModified`, or use the publish date `2026-05-27`. Pick one and align all three locations (frontmatter date, schema datePublished, HTML time element).

### P0-4: Related Articles Descriptions Have Corrupted Characters (Lines 768, 776)

```
Line 768: "Qualitatskontrolle" → "Qualitätskontrolle"
Line 776: "fur DACH-Importeure" → "für DACH-Importeure"
Line 776: "Fabrikprufung" → "Fabrikprüfung"
```

Same UTF-8 corruption pattern as the FAQ section. These are visible text snippets shown with each related article card.

### P0-5: timeRequired vs Displayed Lesezeit Mismatch

| Location | Value |
|----------|-------|
| Schema `timeRequired` | `PT14M` (14 minutes) |
| HTML display (line 346) | `10 min Lesezeit` |

A 40% discrepancy. Google may display the schema value in rich results while the page shows a different number. Align to one value.

---

## High Priority (P1)

### P1-1: LkSG (Lieferkettensorgfaltspflichtengesetz) Not Mentioned

The article covers "Due Diligence für DACH-Importeure" (Section 6) extensively -- business license verification, factory audits, certificate authenticity -- but never mentions the **Lieferkettensorgfaltspflichtengesetz (LkSG)**, Germany's Supply Chain Due Diligence Act. Since January 2024, companies with 1,000+ employees must conduct human rights and environmental due diligence in their supply chains.

For a German article titled "Due Diligence für DACH-Importeure," this is a critical omission. EN version does not need this reference (US market), but DE readers expect it.

**Suggested addition** (Section 6, after Zertifikate block):
```html
<div class="bg-white rounded-lg p-4 border border-slate-200 mb-4">
 <h3 class="text-lg font-black text-brandBlue mb-2">LkSG-Konformität: Lieferkettensorgfaltspflichtengesetz</h3>
 <p class="text-slate-600 leading-relaxed">Seit Januar 2024 gilt das Lieferkettensorgfaltspflichtengesetz (LkSG) für Unternehmen mit mindestens 1.000 Beschäftigten in Deutschland. Es verpflichtet Importeure zur menschenrechtlichen und umweltbezogenen Sorgfaltspflicht entlang der gesamten Lieferkette. Ein externes Fabrikaudit mit Sozialaudit-Komponente (BSCI oder SA8000) dient als Nachweis der LkSG-Compliance. Ohne dokumentierte Sorgfaltspflicht drohen Bussgelder bis zu 2 % des Jahresumsatzes.</p>
</div>
```

### P1-2: hreflang Block Missing `fr` Entry

Frontmatter declares `frPath: "blog/selection-usine-chine/"` but the `hreflang` block (line 17-19) only lists `en`, `de`, `es`. The `fr` entry is missing. This is the same issue found in the EN audit (P1-4).

**Fix**: Add `fr: "/fr/blog/selection-usine-chine/"` to the hreflang block.

### P1-3: wordCount Schema Needs Verification

Schema `wordCount`: `3600`. The article body has 9 content sections plus intro, FAQ, author bio, CTA. Visual estimate suggests ~3,500-4,200 German words. Verify with actual word count and update if off by more than 10%.

Command to verify:
```bash
# Strip HTML tags and count words in the body content section
```

### P1-4: dateModified 7 Days Stale

`dateModified`: `2026-07-26`. Today: `2026-08-02`. If meaningful edits are made today (fixing P0 issues), update to `2026-08-02`. Same issue as EN P1-2.

---

## Medium Priority (P2)

### P2-1: Swiss-German "ss" Convention Used Instead of Standard "ß"

The article consistently uses Swiss German convention (`ss` instead of `ß`):

| Line | Current (Swiss) | Standard German |
|------|----------------|-----------------|
| 419 | `ordnungsgemässe` | `ordnungsgemäße` |
| 432 | `grösste` | `größte` |
| 438 | `grössere` | `größere` |
| 445 | `grösste` | `größte` |
| 465 | `gross` | `groß` |
| 545 | `ausschliessen` | `ausschließen` |
| 616 | `grössten` | `größten` |

**Assessment**: The July 14 audit explicitly fixed 24 instances of Swiss ss to standard ß across 12 articles. This article was either not included in that fix or has regressed. The `.de` domain targets Germany/Austria, where standard `ß` is expected. Swiss convention (`ss`) is correct for `.ch` but not for `.de`.

### P2-2: Only 5 FAQ Questions (Minimum Threshold)

Standard requires 5-8 FAQ questions. At exactly 5, the article meets the minimum but leaves no buffer. The EN equivalent has more questions. Consider adding 1-2 more, e.g.:
- "Welche Rolle spielt das Lieferkettensorgfaltspflichtengesetz (LkSG) bei der Lieferantenauswahl?"
- "Wie unterscheidet sich die Beschaffung über Alibaba von 1688.com für deutsche Importeure?"

### P2-3: Canton Fair 137th Edition Date is in the Past

Line 446: "Die nächste Canton Fair (137. Ausgabe) findet vom **15. April bis 5. Mai 2025** statt."

The article is dated May 27, 2026. The 137th Canton Fair (April-May 2025) has already passed. The 138th (October 2025) and 139th (April 2026) have also passed. Update to reference the upcoming edition.

**Fix**: Either remove the specific date or update to the next upcoming fair. Verify actual dates before updating.

### P2-4: WOWOHCOOL FACT BOX is Generic (Same as Other Articles)

The Fakt Box at line 409-411 uses the same four metrics repeated across all DE articles:
> "WOWOHCOOL ist seit 2013 in Shenzhen ansässig und beliefert über 50 Marken in Deutschland, Österreich und der Schweiz. Unsere Fabrik hat ISO 9001, 200+ Mitarbeiter und fertigt Powerbanks und Ladegeräte mit MOQ ab 500 Stück."

For a supplier-selection guide, add one article-specific data point:
- "Durchschnittliche Antwortzeit auf RFQs: unter 4 Stunden (während der Geschäftszeiten Pekinger Zeit)"
- "Über 300 Video-Werksrundgänge für europäische Importeure in den letzten 12 Monaten durchgeführt"

### P2-5: Expert Insight Attribution Missing Name

Line 607:
```
<p class="text-sm text-slate-500 mt-2">, Nina Nico, Supply Chain Expert bei WOWOHCOOL, CSCP zertifiziert, 10+ Jahre OEM/ODM</p>
```

The line starts with a leading comma and space (`, Nina Nico`). The attribution text appears to be missing its opening tag or prefix. Fix to:
```html
<p class="text-sm text-slate-500 mt-2">— Nina Nico, Supply Chain Expert bei WOWOHCOOL, CSCP zertifiziert, 10+ Jahre OEM/ODM</p>
```

### P2-6: No Data Visualization (Chart/Infographic/Timeline)

The article has 1 data table (Bewertungskriterien) and structured lists but no visual chart. The GEO citability audit (2026-07-21) recommended adding a 4-week timeline table to Section 4. Consider adding:
- A visual 4-week supplier comparison timeline (Woche 1-4 Gantt chart)
- A bar chart comparing sourcing channel effectiveness (Alibaba vs Canton Fair vs Referrals)

---

## DE-Specific Checks

### Umlauts & Character Encoding

| Check | Status | Detail |
|-------|--------|--------|
| Body text umlauts (ä, ö, ü) | PASS | Main content sections (1-9) have correct umlauts |
| Body text ß | MIXED | Uses Swiss `ss` convention throughout (see P2-1) |
| FAQ section umlauts | **FAIL** | All ASCII-fied (ae, oe, ue, ss) -- see P0-1 |
| Schema JSON-LD umlauts | PASS | All correct |
| Image alt text umlauts | **FAIL** | Line 544 corrupted -- see P0-2 |
| Related article descriptions | **FAIL** | Lines 768, 776 corrupted -- see P0-4 |

### German B2B Language

| Check | Status | Evidence |
|-------|--------|----------|
| H1 B2B signal | PASS | "Lieferanten" + "Sourcing" + "Due Diligence" |
| H2 B2B density | PASS | All 9 H2s contain B2B terms: Lieferantenauswahl, OEM-Produkte, Bewertungskriterien, DACH-Importeure, Musterbestellung, etc. |
| FAQ B2B framing | PASS | All 5 questions use procurement language: "OEM-Importeure", "B2B-Erstbestellungen", "Fabrikaudit" |
| CTA B2B language | PASS | "Lieferantensuche China, OEM-Partner ab 500 Stück", "Angebot anfordern" |

### DACH Market Context

| Check | Status | Detail |
|-------|--------|--------|
| EU/German regulations | PASS | GPSR, EU Battery Regulation 2023/1542, CE, WEEE referenced |
| German institutions | PASS | TÜV, DAkkS, Allianz referenced |
| DACH-specific sourcing | PARTIAL | Switzerland and Austria mentioned (WOWOHCOOL Fakt Box), but no AT/CH-specific import regulations |
| LkSG (Supply Chain Act) | **FAIL** | Not mentioned despite being a core DACH compliance topic for supplier due diligence -- see P1-1 |
| Canton Fair DACH relevance | PASS | Import statistics and buyer numbers cited for German importer context |

### Natural German Expression Check

| Check | Status |
|-------|--------|
| "in gleichbleibender Qualität" (line 418) | PASS -- natural German |
| "in die engere Auswahl nehmen" (line 461) | PASS -- idiomatic German business expression |
| "rote Flaggen" (Section 5 title) | PASS -- natural German equivalent of "red flags" |
| "Knackpunkt" vs unnatural phrasing | PASS -- throughout, no machine-translation artifacts detected |
| Compound nouns (Durchschnittskosten, Lieferantenqualifikation) | PASS -- correctly formed |

---

## Data Consistency Check

| Data Point | Location 1 | Location 2 | Match? |
|-----------|-----------|-----------|:------:|
| ISO 9001 fake rate | Key Takeaways: 15-20% | Section 3: 15-20% | Section 6: 15-20% | FAQ Q5: 15-20% | YES |
| 40-60% Trading Companies | Article hook (line 352) | Section 2 (line 432) | FAQ Q2 (line 697) | YES |
| Factory audit cost (quality) | Section 6: 300-700 USD | FAQ Q4: 300-700 USD | YES |
| Factory audit cost (full) | Section 6: 800-2,000 USD | FAQ Q4: 800-2,000 USD | YES |
| Personal visit cost | Section 6: 1,500-3,500 EUR | FAQ Q4: 1,500-3,500 EUR | YES |
| WOWOHCOOL founding year | Fakt Box: 2013 | Author Bio: seit 2013 | YES |
| WOWOHCOOL factory size | Fakt Box: 5,000 m² implied | Author Bio: 5.000 m² | Section 6 Tipp: 5.000m² | YES |
| datePublished | Frontmatter: 2026-05-27 | Schema: 2026-05-27 | YES |
| dateModified | Frontmatter: 2026-07-26 | Schema: 2026-07-26 | YES |
| Display date | HTML time: 2026-07-21 | Any frontmatter/schema date | **NO** (see P0-3) |
| timeRequired/Lesezeit | Schema: PT14M | HTML: 10 min | **NO** (see P0-5) |
| wordCount | Schema: 3600 | Actual body text | **NEEDS VERIFICATION** (see P1-3) |
| Canton Fair 137 dates | Line 446: April 15 - May 5, 2025 | Article date: May 27, 2026 | **STALE** (see P2-3) |
| hreflang fr | Frontmatter: frPath declared | hreflang block: fr missing | **NO** (see P1-2) |

---

## Cross-Reference with EN Equivalent (choose-reliable-china-charger-supplier)

EN scored 80, DE at 78. The 2-point gap is driven by:

| Issue | EN | DE |
|-------|:--:|:--:|
| Date display mismatch | P0-1 | P0-3 |
| Schema FAQ duplicate text | P0-2 | N/A (DE has different FAQ content) |
| OEM/ODM lead time confusion | P0-3 | N/A (DE article does not have OEM/ODM comparison table) |
| wordCount outdated | P1-1 | P1-3 |
| dateModified stale | P1-2 | P1-4 |
| Description truncated | P1-3 | N/A (DE description is complete) |
| hreflang missing fr | P1-4 | P1-2 (same bug) |
| Weak citation | P1-5 | Not present in DE |
| FAQ umlaut corruption | N/A | **P0-1 (DE only)** |
| Alt text corruption | N/A | **P0-2 (DE only)** |
| LkSG missing | N/A | **P1-1 (DE only, DACH regulation)** |
| Swiss ss vs ß | N/A | **P2-1 (DE only)** |

**Key differences**: The DE article has unique UTF-8/encoding issues not present in EN (P0-1, P0-2, P0-4). It also has a DACH compliance gap (LkSG) and Swiss-German orthography that needs standardization. The EN article has content-structure issues (OEM/ODM table, duplicate FAQ text) that don't apply to the DE version's different content structure.

Both articles share: hreflang fr bug, date display confusion, wordCount uncertainty, and stale dateModified.

---

## Comparison with July 2026 Audits

### vs 2026-07-14 (DE Blog Quality Audit -- 28-article review)

- **Then**: 83/100 (Meta 90, Schema 90, H1 75, H2/H3 85, InfoGain 70, E-E-A-T 85, 内链 80, CTA 90)
- **Now**: 78/100 -- score is lower because the July audit was a lighter-touch review across 28 articles, while this is a deep single-article audit catching character-encoding issues invisible at scale

Changes since July 14:
- `modified` date was added (was missing among 27/28 articles) -- the July audit flagged this as the #1 P0. **FIXED**.
- FAQ body was added (July audit flagged 18 articles missing visible FAQ). **FIXED** -- but with corrupted characters, creating new P0.
- ISO 9001 fake rate, 40-60% Trading Company stats -- consistent then and now.

### vs 2026-07-14 (DE Blog 6-Dimension Audit -- 400+ fixes)

The July 14 round fixed 278 umlaut corruptions and 24 Swiss ss-to-ß conversions. This article shows:
- **Umlauts in main body**: Correct (fix held)
- **Swiss ss**: NOT fixed (P2-1) -- all instances of `ss` where standard German requires `ß` remain
- **FAQ umlauts**: NEW corruption (P0-1) -- the FAQ section was likely added AFTER the July 14 fixes, introducing fresh encoding damage

### vs 2026-07-21 (GEO Citability Score -- 80/100)

- **Then**: 80/100. Top blocks: Due Diligence (88), Red Flags (85), Quellen (83). Bottom: Kommunikation (62), Vergleichsprozess (65).
- **Now**: Same structural citability. Recommended improvements from July 21:
  - Add 4-week timeline table to Section 4 -- **NOT DONE** (still a wall of text for the comparison process)
  - Add concrete benchmarks to Section 7 -- **NOT DONE** (Kommunikation section still lacks specific response-time metrics for different supplier types)
  - Merge Quellen as inline sources -- **PARTIALLY DONE** (Quellen section exists at bottom but sources are already inline-linked in the body as well)

---

## Strengths (Maintain)

- **H2 B2B signal density**: 9/9 H2s contain procurement/manufacturing language -- well above the 2-H2 minimum. The H2 structure follows the procurement decision chain exactly: Why it matters -> Where to source -> What to verify -> How to compare -> What to avoid -> How to audit -> How to pay -> How to test -> Conclusion.
- **Data density**: 20+ specific numerical data points (EU Safety Gate 4,702 warnings, Canton Fair 24.95B USD, ISO fake rate 15-20%, audit costs 300-2,000 USD, GaN price trajectory 8->4.50 USD, etc.) -- strong Information Gain.
- **DACH-specific data**: EU Safety Gate statistics, Allianz Risk Barometer (German insurer), TÜV/DAkkS references, GPSR compliance date -- all DACH-relevant.
- **Real factory imagery**: 6 authentic factory/production line photos with B2B-keyword alt text, zero stock photos detected.
- **B2B CTA placement**: Main CTA + blog-cta.njk template, both using B2B language ("Lieferantensuche China, OEM-Partner ab 500 Stück").
- **HowTo Schema**: 5-step structured process with specific timelines and action items, perfectly aligned with the article's step-by-step approach.
- **Internal linking**: 12+ internal links to product pages, service pages, and related articles.
- **External authoritative links**: 10+ external references (EU Safety Gate, Allianz, Canton Fair, IAF CertSearch, NECIPS, 1688.com) with correct `rel="noopener noreferrer"` attributes.
- **Natural German expression**: No machine-translation artifacts detected. Uses idiomatic business German throughout.
- **Expert Insight block**: First-person expert quote with credentials, adding E-E-A-T signal.
- **Mobile-responsive**: Uses responsive grid/flex layout, proper srcset on hero image.
- **Schema completeness**: 8 of 9 required schema types present (Organization, WebSite, BreadcrumbList, BlogPosting, Person, HowTo, FAQPage, SpeakableSpecification). Only ManufacturingBusiness optional type not included.

---

## Recommended Fixes (Specific, Actionable)

### Immediate (this session, ~30 min)

1. **Fix FAQ section umlauts (P0-1)**: Rewrite lines 690-710 with proper UTF-8 German characters. Use .NET API for writing (not PowerShell `Set-Content`). After writing, run:
   ```bash
   grep -Pn '[^\x00-\x7F]' index.njk | head -20  # verify umlauts exist
   grep -P 'ae|oe|ue|ss' index.njk | grep -v 'http|<!--|-->|<' | head -20  # find remaining ASCII-fied text
   ```

2. **Fix alt text corruption (P0-2)**: Line 544 -- restore `Lieferantenprüfung`, `Qualitätskontrolle`, `für`.

3. **Fix related article descriptions (P0-4)**: Lines 768 ("Qualitätskontrolle"), 776 ("für", "Fabrikprüfung").

4. **Fix date display (P0-3)**: Change `<time datetime="2026-07-21">` to `<time datetime="2026-07-26">` to match `dateModified`, with displayed text "26. Juli 2026".

5. **Fix timeRequired/Lesezeit (P0-5)**: Align schema `timeRequired` to `PT10M` or update the displayed "10 min Lesezeit" to "14 min Lesezeit". 10 minutes is likely more accurate for this article length.

6. **Fix expert insight attribution (P2-5)**: Change leading `, Nina Nico` to `— Nina Nico`.

7. **Update dateModified**: Change to `2026-08-02` in both frontmatter `modified` and schema `dateModified`.

8. **Fix hreflang (P1-2)**: Add `fr: "/fr/blog/selection-usine-chine/"` to hreflang block.

### Short-term (this week, ~1-2 hrs)

9. **Add LkSG section (P1-1)**: Insert an LkSG compliance subsection in Section 6 (Due Diligence), after the Zertifikate block. Use the suggested text from P1-1 above.

10. **Verify and update wordCount (P1-3)**: Count actual body words (strip HTML, count German words). Update schema `wordCount` to the actual value.

11. **Fix Canton Fair dates (P2-3)**: Remove or update the reference to the 137th Canton Fair (April 2025). Replace with upcoming edition dates after verifying.

12. **Convert Swiss ss to standard ß (P2-1)**: Replace all instances of `ss` where standard German requires `ß`:
    - `ordnungsgemässe` -> `ordnungsgemäße`
    - `grösste` -> `größte` (3 occurrences)
    - `grössere` -> `größere`
    - `ausschliessen` -> `ausschließen`
    - `gross` -> `groß`

    **IMPORTANT**: Do NOT replace legitimate `ss` (e.g., `Wasser`, `müssen`, `dass`). Only replace where standard German orthography requires `ß` (after long vowels and diphthongs).

13. **Add 4-week timeline table to Section 4 (GEO citability)**: Create a visual comparison table for the "5 Anbieter in 4 Wochen" process, as recommended in the July 21 GEO audit.

### Medium-term (next 2 weeks)

14. **Add 1-2 more FAQ questions (P2-2)**: Bring FAQ count from 5 to 6-7. Suggested topics: LkSG compliance, 1688.com vs Alibaba for German importers.

15. **Differentiate WOWOHCOOL FACT BOX (P2-4)**: Replace generic company metrics with supplier-guide-specific data.

16. **Add data visualization (P2-6)**: Consider a 4-week timeline graphic or sourcing-channel comparison chart.

17. **Add first-party factory measurement**: Per Information Gain Gate 2, add at least one WOWOHCOOL-measured data point (e.g., PCBA ripple noise, burn-in failure rate, sample approval cycle statistics).

---

*Audit performed manually against B2B Blog Quality Audit Standard 2026 8-gate methodology.*
*Cross-referenced with: DE Blog Quality Audit (2026-07-14), DE Blog 6-Dimension Audit (2026-07-14), GEO Citability Score lieferanten-china-finden (2026-07-21), EN equivalent audit (2026-08-02).*
