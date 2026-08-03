# Page Audit: Ladegerät-Import China — DE Article (Zoll, EUSt, HS-Code, Umlauts)

**Date**: 2026-08-02 | **File**: `C:\Users\wowoh\wowohcool.com\src\de\blog\ladegeraet-import-china-zoll-zertifikate\index.njk`
**Live URL**: https://www.wowohcool.com/de/blog/ladegeraet-import-china-zoll-zertifikate/
**Auditor**: Manual page audit (8-gate methodology), DE-specific focus
**Reference audits**: GEO-CITABILITY-SCORE-ladegeraet-import-china-2026-07-21.md (83/100), page-audit-import-costs-guide-2026-08-02.md (EN, 83/100)

---

## Scores

| Gate | Score | Status |
|------|-------|--------|
| Anti-Repetition | 8/10 | PASS |
| Information Gain | 17/25 | GOOD |
| Scannability | 15/20 | PASS |
| Visual Authenticity | 9/10 | PASS |
| CTA Relevance | 9/10 | PASS |
| Schema Compliance | 12/15 | NEEDS FIX |
| Meta + Links | 7/10 | NEEDS FIX |
| **TOTAL** | **77/100** | GOOD (with fixes) |

---

## Gate-by-Gate Analysis

### Gate 1: Anti-Repetition (8/10)

**Finding: Generally clean, minor issues.**

No egregious paragraph-level repetition detected. The Destatis 156.2 Mrd EUR figure appears in both the Hook section (line 373) and Section 1 (line 444) -- this is acceptable cross-referencing since the Hook sets context and Section 1 develops the statistic.

FAQ answers in JSON-LD schema and visible FAQ section convey the same information with slightly different wording. This is by design (schema for search engines, visible FAQ for readers) and is acceptable.

**Minor issues:**
- The DDP FAQ answer in JSON-LD schema (line 316) adds an English promotional sentence ("WOWOHCOOL has served 200+ global brands...") not present in the visible FAQ -- this is an intrusion, not repetition, but belongs under Schema Compliance.

### Gate 2: Information Gain (17/25)

**Previous GEO citability score: 83/100. Strong regulatory anchors.**

**Named entities and data anchors present (strong):**
- Destatis 2024: 156.2 Mrd EUR China-Import, 17 Mrd EUR/Quartal Elektronik
- HS-Code 8504.40 with sub-position table (8504.40.30 / .55 / .90)
- WTO-ITA (Informationstechnologieabkommen) -- explains 0% Zollsatz
- Stiftung EAR Gebührenverordnung (2024): 12.40 EUR, 43.90 EUR/Quartal, Busse bis 100.000 EUR
- BattDG 2025/2026 deadlines: 15. Januar 2026 (Erganzung), 16. Januar 2026 (OfH-Pflicht)
- LG Munchen I ruling: Powerbanks doppelt registrierungspflichtig (ElektroG + BattDG)
- BattDG Registrierung: 41.40 EUR
- EU Common Charger Directive 2022/2380: Stichtag 28.12.2024 + 28.04.2026
- RAPEX 2024: 4.137 Warnmeldungen, 10% Elektrogerate, 40% aus China (EU Kommission IP/25/1064)
- EU Okodesign-Verordnung (EU) 2023/826 -- verschafte Grenzwerte ab 2025
- Versandkosten Shenzhen -> Hamburg H1/2026 mit Red-Sea-Zuschlagen (100-500 USD/Container)
- EU savings estimate: 250 Mio EUR/Jahr, 11.000 Tonnen Elektroschrott durch Common Charger

**First-party WOWOHCOOL data present:**
- Lieferung in 50+ Lander, 25-30 Tage Seefracht, 3-7 Tage Express fur Muster
- CE-Dokumentation, RoHS-Prufberichte, WEEE-Unterstutzung Teil des Service
- Über 100 deutsche Importeure betreut (Erfahrungsbasis)
- DDP-Versand ab 500 Stuck

**What is missing for InfoGain >20:**
- No BOM cost breakdown of charger components
- No actual factory measurement data (thermal, efficiency, ripple noise)
- No specific customer case study with named importer and real numbers
- No year-over-year import trend chart
- No visual data (cost-comparison chart, timeline infographic)

**Verdict:** Strong regulatory depth with verifiable DE/EU legal references. The article's primary value is in organizing complex German import regulations into a single reference. The EAR cost table, BattDG deadlines, and RAPEX statistics are legitimate competitive moat. Room for manufacturing-side data to push higher.

### Gate 3: Scannability (15/20)

**H1:** "Ladegerat-Import China: Zoll & Zertifikate fur Unternehmen 2026" -- **63 characters** (within 50-65 range). Contains B2B signal "Unternehmen". PASS.

**But: Three different titles exist across the page:**
1. Frontmatter `title`: "Ladegerat-Import China: Zoll &amp; Zertifikate fur OEM 2026" (OEM signal)
2. Schema `headline`: "Ladegerat aus China importieren: Zoll, Zertifikate & DDP-Lieferung 2026" (verb form, adds DDP)
3. On-page H1: "Ladegerat-Import China: Zoll &amp; Zertifikate fur Unternehmen 2026" (Unternehmen)

These should be aligned (at minimum, Schema headline and H1 should match). P1 fix.

**H2 B2B signal count:** 11 of 13 H2/TOC entries contain explicit B2B signals (Importeure, Unternehmen, HS-Code, Zolltarifnummer, INCOTERMS, Einfuhrumsatzsteuer, Zollabwicklung, Import-Checkliste, Importfehler, Zolldokumente). Well above minimum 2. PASS.

**H2 procurement chain alignment:**
- Why: Section 1 (Warum Importeure aus China beziehen) -- YES
- What to verify: Section 2 (HS-Code), Section 3 (CE), Section 4 (Zertifizierungen), Section 5 (EAR/BattDG) -- YES
- How it's done: Section 6 (Zollabwicklung), Section 7 (Versand), Section 8 (INCOTERMS), Section 9 (Dokumente) -- YES
- What it costs: Section 6 (Rechenbeispiel), Section 5 (EAR-Kosten) -- YES
- How to comply: Section 10 (Importfehler), Section 11 (Common Charger) -- YES

Strong alignment with DACH importer decision chain. PASS.

**H3 coverage gap:**
- Section 10 ("Die 6 haufigsten Importfehler") has **no H3** -- only an ordered list. Every H2 must have at least 1 H3 per quality standard. MINOR GAP.
- All other sections have proper H3s (e.g., CE sub-directives in Section 3, INCOTERMS types in Section 8, document types in Section 9, Stichtage in Section 11).

**TOC:** Present with 13 entries, branded dark blue background. PASS.

**Answer blocks:** FAQ answers are 100-150 characters and directly follow each H3 question. PASS.

**Numbering mismatch:** TOC lists "12. Fazit" and "13. FAQ fur Unternehmen", but the body renders Fazit as an unnumbered `<div>` and labels FAQ as "12. FAQ fur Unternehmen". The actual body has 12 numbered sections (1-11 + FAQ as #12). This is confusing. MINOR.

### Gate 4: Visual Authenticity (9/10)

**6 images total, all real factory/office/lab photos:**

1. Hero: Ladegerat-Import cover image -- alt: "Ladegerat Import aus China: Zoll, CE-Zertifikate & DDP-Versand 2026 | WOWOHCOOL" -- B2B keywords ✓
2. Section 2: SMT production line -- alt: "SMT-Produktionslinie fur Ladegerate OEM-Fertigung in Shenzhen, ISO 9001 zertifiziert, CE-konforme Exportproduktion | WOWOHCOOL" -- B2B keywords ✓
3. Before Section 5: Office photo -- alt: "WOWOHCOOL OEM-Exportburo Shenzhen, Dokumentenvorbereitung fur Stiftung EAR Registrierung, Konformitatserklarung und Zollabwicklung" -- B2B keywords ✓
4. Section 5: Testing lab -- alt: "Ladegerat-Pruflabor fur CE-/RoHS-Zertifizierung und Sicherheitstests, OEM-Import Qualitatskontrolle Shenzhen | WOWOHCOOL" -- B2B keywords ✓
5. Before Section 7: Logistics team -- alt: "WOWOHCOOL Versandlogistik-Team bei der Exportabwicklung, DDP-Lieferung, Frachtbrief-Prufung und OEM-Versandkontrolle Shenzhen" -- B2B keywords ✓
6. Author photo: "Snowy May, Market Managerin, OEM/ODM & EU-Import Expertin bei WOWOHCOOL" -- with role ✓

**Zero stock photos detected.** All alt text includes B2B keywords. PASS.

**Minor gap:** No data visualization (chart, cost-comparison infographic, timeline). For a regulatory/cost article, a visual "Zoll & EUSt calculation flow" or "Import timeline" infographic would improve comprehension.

**Important:** Image alt texts at positions 2-5 show **Umlauts missing** in the grep results (e.g., "Pruflabor" vs "Pruflabor", same as Key Takeaways). These alt texts need Umlaut fixes for both SEO and accessibility.

### Gate 5: CTA Relevance (9/10)

**Primary CTA (end of article):** "Ladegerate-Import aus China, DDP bis zur Haustur" -- two buttons: "Angebot anfordern" -> /de/kontakt/ and "OEM/ODM Service" -> /de/service/. Directly relevant to someone who just read about import process. PASS.

**Secondary CTA (blog-cta.njk partial):** "Jetzt starten", "Ladegerat-Import in 24 Stunden starten", subject "Blog Anfrage: Ladegerat Import China". Good alignment.

**Inline CTA (after Section 5):** "Import-Projekt geplant?" -> link to /de/kontakt/. Well-placed after the EAR/BattDG cost section. PASS.

**Related articles:** 3 links (EU Zertifizierungen, Fabrikprufung Checkliste, Markt-Trends 2026) -- all logically connected to import topics. PASS.

**Internal links:** 10+ contextual internal links throughout body (GaN vs Silizium, Zertifizierungen EU, Qi2, Sicherheitsstandards, OEM-Versand, Fabrikprufung, OEM/ODM Service, OEM vs ODM, USB-C PD, Kontakt). Well above minimum 3. PASS.

**Minor:** The secondary CTA button "OEM/ODM Service" competes with the primary "Angebot anfordern." Consider making "Angebot anfordern" more visually dominant, or renaming the secondary to "Service-Ubersicht" for clearer differentiation.

**Umlaut issue in CTA heading:** "Ladegerate-Import" -> "Ladegerate-Import", "Haustur" -> "Haustur". See Umlaut section below.

### Gate 6: Schema Compliance (12/15)

**Required schemas checklist:**

| Schema | Status | Notes |
|--------|--------|-------|
| Organization | PASS | Full address, sameAs, contactPoint, areaServed |
| WebSite | PASS | inLanguage de-DE, publisher ref |
| BreadcrumbList | PASS | 3 levels: Startseite > Blog > Ladegerat Import China |
| BlogPosting | PASS | headline, description, datePublished (2026-05-17), dateModified (2026-07-26), wordCount (3000), timeRequired (PT14M), speakable, citation (3 sources), keywords |
| Person (Author) | PASS | LinkedIn URL, Xing URL, jobTitle, knowsAbout (6 topics), image, worksFor |
| FAQPage | NEEDS FIX | 7 questions. Zollsatz answer contradicts body (see P1). DDP answer has English sentence. |
| HowTo | NEEDS FIX | 5 steps. Step 1 Zollsatz text says 2.4-2.7% -- contradicts body (0% ITA). |
| SpeakableSpecification | PASS | On both BlogPosting (h1 + .speakable) and FAQPage (.faq-answer) |

**Critical Schema Issues:**

**P1: Zollsatz contradiction in FAQ + HowTo schema (Zollsatz-FAQ-Konflikt)**
- Schema FAQ Q1 (line 284): "Der EU-Zollsatz fur Ladegerate (HS-Code 8504.40) betragt **2,4-2,7 %** auf den CIF-Wert"
- HowTo Step 1 (line 218): "EU-Zollsatz **2,4-2,7 %** (CIF)"
- Section 2 body (line 453): "Der EU-Zollsatz fur Importe aus China betragt fur die meisten Unterkategorien **0%**, dank des WTO-Informationstechnologieabkommens (ITA)"
- Section 6 table (line 633): "Zoll (0%, HS 8504.40) -> **0 EUR**"

The FAQ and HowTo claim 2.4-2.7%, but the body correctly explains 0% via ITA. The 2.4-2.7% is the general MFN rate; the actual rate for China-sourced 8504.40 chargers is 0%. This is a factual error in the schema that Google may display as a rich snippet.

**Fix:** Update FAQ Q1 and HowTo step 1 to "0% (ITA)" with a note that the general MFN rate is 2.4-2.7% but the ITA exemption applies for China.

**P1: English text in German schema (DDP-FAQ-Englisch)**
- Line 316-317: "WOWOHCOOL has served 200+ global brands since 2013 with a defect rate below 0.3%."
- This is embedded in a German FAQ answer, visible to search engines (not readers).
- The visible FAQ (line 834) doesn't have this text -- the English sentence is ONLY in JSON-LD.

**Fix:** Either translate to German ("WOWOHCOOL beliefert seit 2013 uber 200 globale Marken mit einer Defektrate unter 0,3%") or remove (self-promotional content in factual FAQ answer).

**P2: wordCount approximate**
- Schema says 3000. Rough manual estimate: the article appears to be 3500-4000+ words given its 13-section structure, detailed tables, and FAQ.
- This needs a precise word count verification.

**Missing schema element:**
- No `ManufacturingBusiness` additionalType on Organization node.

### Gate 7: Meta + Links (7/10)

**Frontmatter title:** "Ladegerat-Import China: Zoll &amp; Zertifikate fur OEM 2026" -- contains B2B signals (OEM, Zoll, Zertifikate). OK but see triple-title issue.

**Meta description:** Present. Contains key terms (CE, HS-Code 8504.40, Einfuhrumsatzsteuer, Stiftung EAR, BattDG, DDP). PASS.

**Canonical:** `/de/blog/ladegeraet-import-china-zoll-zertifikate/` -- correct. PASS.

**hreflang:** en, de, es tags present. PASS.

**ogImage:** Present. PASS.

**P1: Display date mismatch (Anzeigedatum-Konflikt)**
- Page `<time>` element (line 364): `datetime="2026-06-29"` displays "29. Juni 2026"
- Frontmatter `modified` (line 5): 2026-07-26
- Schema `dateModified` (line 132): 2026-07-26

The visible date is almost a full month behind the actual modification date. This is a trust issue for time-sensitive regulatory content (BattDG deadlines, EU Common Charger 2026). **Same issue as EN article (P1 fix 2).**

**Fix:** Update line 364 to `datetime="2026-07-26"` and display "26. Juli 2026".

**P2: Triple-title inconsistency**
- Frontmatter: "...fur OEM 2026"
- Schema headline: "...importieren: Zoll, Zertifikate & DDP-Lieferung 2026"
- On-page H1: "...fur Unternehmen 2026"

At minimum, the Schema headline and H1 should be aligned. The frontmatter title can follow SEO-optimized conventions.

**External links:** 10+ authoritative sources (Destatis, EU TARIC, EU CE Portal, Stiftung EAR, zoll.de, BAFA, EU Commission). All with `rel="noopener noreferrer"`. PASS.

**Internal links:** 10+ contextual internal links. PASS.

**P2: Key Takeaways box Umlauts obliterated**
- The "Auf einen Blick" section uses `class="speakable"` -- this text is eligible for voice search / AI citation via SpeakableSpecification.
- All Umlauts are missing in this section (see dedicated section below).

---

## Critical Issue: Umlaut-Massaker (P0)

The Key Takeaways box ("AUF EINEN BLICK") and the CTA heading systematically lack Umlauts. The grep confirms these are stored as ASCII equivalents, not UTF-8 Umlauts:

### Key Takeaways (lines 398-404)

| Line | Current (wrong) | Should be |
|------|----------------|-----------|
| 398 | `Ladegeraten` | `Ladegeraten` |
| 398 | `Ubersicht` | `Ubersicht` |
| 398 | `fur` | `fur` |
| 400 | `Ladegerat` | `Ladegerat` |
| 401 | `Konformitatserklarung` | `Konformitatserklarung` |
| 401 | `prufen` | `prufen` |
| 401 | `fur` | `fur` |
| 402 | `fur` | `fur` |
| 402 | `Quartalsgebuhr` | `Quartalsgebuhr` |
| 403 | `fur` | `fur` |
| 403 | `ubernimmt` | `ubernimmt` |
| 403 | `Haustur` | `Haustur` |
| 404 | `Ladegerate` | `Ladegerate` |
| 404 | `Stuck` | `Stuck` |

### CTA Heading (line 887)

| Current (wrong) | Should be |
|----------------|-----------|
| `Ladegerate` | `Ladegerate` |
| `Haustur` | `Haustur` |

### Other sections

The rest of the article uses proper Umlauts correctly (53 verified occurrences via grep). The WOWOHCOOL FAKT box (line 436), all body sections, and FAQ answers are correctly encoded.

**Root cause hypothesis:** The Key Takeaways box and the CTA section were likely written/edited in a tool or session that dropped UTF-8 encoding. This is a known pattern from the MEMORY.md entry `powershell-encoding-trap.md`.

**Severity:** P0. This is a live German article. Readers see mangled German in the very first content section ("AUF EINEN BLICK") and the prominent CTA. The SpeakableSpecification targets this mangled text for voice search. Search engines index this text.

---

## Data Consistency Check

### Zollsatz: FAQ vs Body (P1)

This is the most significant factual inconsistency in the article:

| Location | Zollsatz stated | Verdict |
|----------|----------------|---------|
| Key Takeaways (line 400) | 2.4-2.7% CIF | Wrong (per body) |
| Section 2 body (line 453) | 0% (ITA) | Correct |
| Section 2 table | 0% for 8504.40.30 | Correct |
| Section 6 table (line 633) | 0 EUR (0%) | Correct |
| Section 6 text (line 642) | 0% | Correct |
| HowTo schema step 1 (line 218) | 2.4-2.7% | Wrong (per body) |
| Schema FAQ Q1 (line 284) | 2.4-2.7% | Wrong (per body) |
| Visible FAQ Q1 (line 818) | 2.4-2.7% | Wrong (per body) |

**6 locations claim 2.4-2.7%, 3 locations claim 0%.** The correct answer is 0% for most 8504.40 subcategories from China (WTO-ITA), with some subcategories at 0-3.3%. The 2.4-2.7% is the general MFN rate before ITA exemption.

**Recommendation:** Update all 6 locations to state 0% (ITA) with a brief qualification that the general MFN rate for HS 8504.40 is 2.4-2.7% but the ITA exemption reduces it to 0% for China-sourced chargers.

### H1 Title vs Schema Title vs Frontmatter Title (P2)

| Location | Text |
|----------|------|
| Frontmatter `title` | "Ladegerat-Import China: Zoll & Zertifikate fur OEM 2026" |
| Schema `headline` | "Ladegerat aus China importieren: Zoll, Zertifikate & DDP-Lieferung 2026" |
| On-page `<h1>` | "Ladegerat-Import China: Zoll & Zertifikate fur Unternehmen 2026" |

Three different variants. The frontmatter "fur OEM" targets manufacturer buyers; the H1 "fur Unternehmen" is broader; the schema headline uses verb form and adds "DDP-Lieferung." At minimum, the Schema headline and H1 should match.

### Display Date vs Schema dateModified (P1)

| Location | Date |
|----------|------|
| Page `<time>` (line 364) | 29. Juni 2026 |
| Frontmatter `modified` (line 5) | 2026-07-26 |
| Schema `dateModified` (line 132) | 2026-07-26 |

**Same issue as EN article audit.** The visible date is ~1 month stale. For an article covering BattDG deadlines (15. Januar 2026, 16. Januar 2026) and EU Common Charger (28. April 2026), a stale date undermines reader trust.

### Body Section Numbering vs TOC (P3)

TOC lists 13 items (1-11 + 12. Fazit + 13. FAQ), but the body has Fazit as an unnumbered `<div>` and FAQ labeled "12." This is a cosmetic inconsistency.

---

## Comparison with EN Counterpart

The EN article (`/blog/import-costs-guide/`, audited 2026-08-02, score 83/100) shares the same structure but targets US importers. Key differences relevant to this DE audit:

| Aspect | EN Article | DE Article |
|--------|-----------|------------|
| Regulatory framework | Section 301, Section 122, IEEPA, CBP | ElektroG, BattDG, EU-Richtlinien, Stiftung EAR |
| Data density | $60,000 FOB worked example with line items | 10,000 EUR Zollwert example with line items |
| Zollsatz consistency | P2 issue (3 different EU duty figures) | P1 issue (FAQ/schema 2.4-2.7% vs body 0%) |
| Display date | P1: shows Jun 12, actual Jul 24/25 | P1: shows Jun 29, actual Jul 26 |
| Schema depth | 5 HowTo steps, 8 FAQ, citation array | 5 HowTo steps, 7 FAQ, citation array (3 sources) |
| Unique DE content | N/A | BattDG deadlines, LG Munchen ruling, RAPEX 2024 stats, Stiftung EAR cost table |

**The DE article's unique advantage:** German-specific legal references (ElektroG §45, BattDG, LG Munchen I, BTI-Verfahren) that have no EN equivalent. The EAR cost table and BattDG deadline timeline are the strongest differentiators from the EN version.

**Shared issue:** Both articles have display date mismatches and Zollsatz consistency problems. These need fixing in both versions.

---

## Critical Issues (P0)

1. **Umlaut-Massaker in Key Takeaways + CTA heading**: 18+ missing Umlauts in the first content section readers see. Affects SpeakableSpecification voice search quality. See table above for exact fixes needed.

---

## High Priority (P1) -- Fix This Week

2. **Zollsatz FAQ/HowTo contradiction**: 6 locations claim 2.4-2.7%, 3 locations correctly claim 0% (ITA). All 6 must be updated. Google may display the wrong 2.4-2.7% figure as a rich snippet.

3. **English text in German FAQ schema** (line 316): "WOWOHCOOL has served 200+ global brands..." -- translate to German or remove.

4. **Update display date** (line 364): Change from "29. Juni 2026" to "26. Juli 2026" (or actual latest modification date).

5. **Align H1 + Schema headline**: Either change schema headline to match H1, or update both to a consistent version. Frontmatter title can remain SEO-optimized separately.

---

## Medium Priority (P2) -- Fix This Month

6. **Add H3 to Section 10**: "Die 6 haufigsten Importfehler" needs at least one H3 (e.g., "Warum diese Fehler immer wieder passieren" or "Die teuersten drei Fehler im Detail").

7. **Fix body section numbering**: Either update TOC to match body (12 items), or add "12. Fazit" H2 label to the Fazit section.

8. **Add ManufacturingBusiness additionalType** to Organization node for stronger entity recognition.

9. **Verify wordCount**: The schema says 3000. The article appears to be 3500-4000+ words. Verify with an actual word count and update both frontmatter and schema.

10. **Fix image alt text Umlauts**: Alt texts in images 2-5 may also lack Umlauts. Verify and fix.

11. **Add TOC entry numbering consistency**: Make the TOC and body numbering match.

---

## Recommended Fixes (Code-Level)

### Fix 1: Key Takeaways Umlauts (lines 398-404)

Replace the entire "AUF EINEN BLICK" `<p>` and `<ul>` block with properly encoded text:

```html
<p class="text-slate-700 leading-relaxed text-sm mb-4 speakable">Der Import von Ladegeraten aus China folgt einem klaren Prozess: korrekter HS-Code, CE-Dokumentation, WEEE/BattDG-Registrierung und der richtige INCOTERM. Diese Ubersicht fasst die kritischen Anforderungen fur DACH-Importeure zusammen.</p>
<ul class="text-sm text-slate-700 space-y-2 list-disc pl-5">
<li><strong>HS-Code &amp; Zoll:</strong> Ladegerat HS 8504.40 (0% Zollsatz dank WTO-ITA), Powerbank HS 8507.60 (0-3,7%), BTI-Auskunft bei Unsicherheit</li>
<li><strong>Pflicht-Zertifikate:</strong> CE (LVD + EMV), RoHS, ggf. UN38.3 fur Powerbanks, Konformitatserklarung vor Verschiffung prufen</li>
<li><strong>Registrierungen:</strong> Stiftung EAR (WEEE Kat. 6), BattDG fur Powerbanks, Quartalsgebuhr 43,90 EUR pro Registrierung</li>
<li><strong>Versand:</strong> DDP empfohlen fur Einsteiger, Hersteller ubernimmt Zoll + Einfuhrumsatzsteuer (19%) + Lieferung bis Haustur</li>
<li><strong>OEM-Partner:</strong> WOWOHCOOL liefert CE-zertifizierte Ladegerate inkl. aller Dokumente, DDP-Versand ab 500 Stuck, Lieferzeit 25-30 Tage</li>
</ul>
```

(Note: Also correct the Zollsatz from "2,4-2,7%" to "0%" in the first bullet, per Fix 2.)

### Fix 2: Zollsatz in FAQ, HowTo schema, Key Takeaways, and visible FAQ

**Schema FAQ Q1 (line 284):**
```
"text": "Ladegerate fallen unter HS-Code 8504.40 (statische Umrichter / Stromrichter). Der EU-Zollsatz fur Ladegerate (HS-Code 8504.40) aus China betragt 0% dank des WTO-Informationstechnologieabkommens (ITA). Der allgemeine MFN-Zollsatz ohne Praferenz betragt 2,4-2,7%. Die Einfuhrumsatzsteuer von 19% fallt zusatzlich an."
```

**HowTo Step 1 (line 218):**
```
"text": "Ladegerate: HS-Code 8504.40, EU-Zollsatz 0% dank WTO-ITA (allgemeiner MFN-Satz: 2,4-2,7%). Powerbanks: HS-Code 8507.60, Zollsatz 0-3,7%. Bei Unsicherheit eine verbindliche Zolltarifauskunft (BTI) beantragen."
```

**Key Takeaways bullet 1 (line 400):** Change "2,4-2,7 % Zollsatz CIF" to "0% Zollsatz dank WTO-ITA"

**Visible FAQ Q1 (line 818):** Same correction as Schema FAQ Q1.

### Fix 3: English text in DDP FAQ schema (line 316-317)

Remove the English sentence:
```
"text": "DDP (Delivered Duty Paid) bedeutet, dass der Verkaufer alle Kosten und Risiken bis zur Lieferung an Ihre Adresse tragt - inklusive Zollabwicklung und Einfuhrumsatzsteuer. Als Einsteiger erhalten Sie einen Festpreis ohne versteckte Kosten und mussen sich nicht selbst um die Zollformalitaten kummern."
```

Or translate it:
```
"text": "DDP (Delivered Duty Paid) bedeutet, dass der Verkaufer alle Kosten und Risiken bis zur Lieferung an Ihre Adresse tragt - inklusive Zollabwicklung und Einfuhrumsatzsteuer. Als Einsteiger erhalten Sie einen Festpreis ohne versteckte Kosten und mussen sich nicht selbst um die Zollformalitaten kummern. WOWOHCOOL beliefert seit 2013 uber 200 globale Marken mit einer Defektrate unter 0,3%."
```

### Fix 4: Display date (line 364)

```html
<time datetime="2026-07-26">26. Juli 2026</time>
```

### Fix 5: CTA heading Umlauts (line 887)

```html
<h2 class="text-2xl font-black text-white uppercase italic mb-4">Ladegerate-Import aus China, DDP bis zur Haustur</h2>
```

### Fix 6: Add H3 to Section 10

Before the `<ol>` on line 769, add:
```html
<h3 class="text-lg font-black text-brandBlue mb-3">Diese sechs Fehler kosten Importeure Zeit und Geld</h3>
```

---

## Quick Reference: GEO Citability Score Context

The GEO audit (2026-07-21) scored this article **83/100** overall:
- Statistical Density: 90/100 (highest)
- Structural Readability: 84/100
- Answer Block Quality: 82/100
- Uniqueness & Original Data: 82/100
- Passage Self-Containment: 80/100 (lowest)

**Impact of this audit's P1 fixes on GEO score:**
- Fixing Zollsatz contradictions would improve Answer Block Quality (accurate FAQ snippets for AI)
- Fixing Umlauts would improve Passage Self-Containment (AI systems see clean German text)
- English text removal from schema would improve Uniqueness (no language mixing)

Estimated post-fix GEO score: **85-87/100**.

---

## Summary

The article is a thorough German-language import guide with strong regulatory depth (BattDG, Stiftung EAR, EU Common Charger) that differentiates it from the EN version. The EAR cost table, BattDG deadline timeline, and RAPEX statistics are legitimate competitive moat.

Key strengths:
- Complete schema coverage (7 types)
- Real factory imagery with B2B alt text
- German-specific legal references (ElektroG, BattDG, LG Munchen I)
- Strong procurement-chain H2 structure
- 10+ external authoritative links
- 10+ internal contextual links

Critical issues (P0):
1. Umlaut-Massaker: 18+ missing Umlauts in Key Takeaways + CTA heading (live on site now)
2. Zollsatz FAQ/HowTo contradiction: 6 locations claim 2.4-2.7%, body says 0% (ITA)
3. English sentence in German FAQ schema
4. Display date 1 month stale (Jun 29 vs actual Jul 26)

**Overall verdict: GOOD (77/100) -- Fix P0+P1 before next content update. Estimated fix time: 45 minutes.**

---

## Pre-Commit Checklist (Post-Fix)

- [ ] Key Takeaways Umlauts fixed (18+ replacements)
- [ ] CTA heading Umlauts fixed
- [ ] Zollsatz corrected to 0% (ITA) in all 6 locations (FAQ schema, HowTo schema, Key Takeaways, visible FAQ)
- [ ] English text removed/translated from DDP FAQ schema
- [ ] Display date updated to 2026-07-26 (or actual latest mod date)
- [ ] H1 + Schema headline aligned
- [ ] H3 added to Section 10
- [ ] Body/TOC numbering aligned
- [ ] wordCount verified (not just 3000 placeholder)
- [ ] Image alt texts checked for Umlauts
- [ ] `dateModified` updated to today (2026-08-02 or date of fixes)
- [ ] Umlauts in key sections grep-verified: `grep -c '[aouAOU]'` = 0 in Key Takeaways block
