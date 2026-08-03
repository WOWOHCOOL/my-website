# Single-Page Audit: GaN Generationen Uebersicht (DE)

**Audit Date:** 2026-08-02
**Article:** `C:\Users\wowoh\wowohcool.com\src\de\blog\gan-generationen-uebersicht\index.njk`
**Live URL:** https://www.wowohcool.com/de/blog/gan-generationen-uebersicht/
**GEO Citability:** 87/100 (2026-07-21)
**Research Brief:** `research/de/brief-de-gan-generationen-uebersicht-2026-06-24.md`
**Cross-Referenced Against:** EN audit `page-audit-gan-generations-guide-2026-08-02.md` (EN scored 76/B-)
**dateModified in Schema:** 2026-07-29

---

## Executive Summary

The DE GaN article is structurally strong -- 14 sections, DACH compliance depth, real FET part numbers, EUR-based BOM pricing, and proper German SERP naming (GaN 1-5). However, this audit uncovered **6 critical issues** that must be fixed: a wrong wordCount (carryover from pre-expansion), timeRequired/schema mismatch with visible "Lesezeit", English promo text leaked into German structured data, a GaN naming convention violation inside the Expert Insight block, FOB pricing quoted in USD instead of EUR, and a Ghost HowTo (schema declares a HowTo with no matching visible body section).

The GEO citability score of 87/100 is solid, but the GaN 1 and GaN 4 sections remain weak points (62 and 66 respectively from the GEO audit), unfixed since July.

| Category | Score | Grade |
|----------|:-----:|:-----:|
| B2B Structure (Gates 1,3,5) | 90/100 | A- |
| Information Gain (Gate 2) | 72/100 | B |
| Visual Authenticity (Gate 4) | 88/100 | B+ |
| Schema Markup | 70/100 | C+ |
| Cross-Reference Consistency | 50/100 | D |
| **Composite** | **74/100** | **B-** |

> **Comparison to EN (76/B-):** DE scores 2 points lower, primarily due to Schema issues unique to DE (Ghost HowTo, mixed language, naming convention violation) that the cleaner EN version avoids. The EN audit's core findings (HowTo Schema contradiction, pricing inconsistency, MOQ mismatch) were checked against DE and found to NOT apply -- DE has different, DE-specific issues.

---

## Part 1: Gate-by-Gate Audit

### Gate 1: Anti-Repetition -- Score: 92/100

**Pass.** No same-paragraph repetition detected. Each generation section delivers distinct, non-overlapping information. The "GaN 1-5" phrase repeats across navigation elements (TOC, key takeaways, sections) as expected structural repetition, not content redundancy.

**Minor:** The hook (line 391) and Expert Insight (line 535) both reference the same "Retourenquote" / efficiency benefit narrative, but from different angles (customer quote vs factory insight). Acceptable.

---

### Gate 2: Information Gain -- Score: 72/100

**The article's competitive moat centers on DACH-specific compliance data and EUR-based BOM pricing.** This is information zero DE SERP competitors provide.

#### Strengths (High-Value, DE-Unique)

| Element | Location | Value |
|---------|----------|-------|
| BOM in EUR by generation (65W) | Comparison table (line 576) | GaN 2: 4,00-5,50 EUR; GaN 3: 4,80-6,20 EUR; GaN 5: 6,50-8,50 EUR |
| DACH-Preisklassen mapping | Section 11 + Key Takeaways | Budget 10-30 / Mid 30-60 / Premium 60-120 EUR |
| GS-Zeichen cost and process | Section 12, FAQ Q5 | 3,000-8,000 EUR per model, TUV/VDE pathway |
| GaN FET supplier table with DACH column | Section 10 (line 591-598) | Infineon Munich HQ, Innoscience Shenzhen pricing differential |
| ErP Lot 6 / ESPR 2027 compliance | Section 12 (line 644-645) | 90% efficiency mandate, <0.1W standby |
| ElektroG WEEE + 22f UStG | Section 12 (line 648-649) | Stiftung EAR registration, 100,000 EUR fines |
| DACH EV/OBC context | Section 13 (line 657-658) | Elektroniknet citation, 800V architecture |
| GaN 6 roadmap with PCIM Europe 2026 | Section 14 (line 666) | Nuremberg event reference, Infineon CoolGaN Next |
| Real FET part numbers | Section 5 (line 505), Section 10 (line 593-596) | NV6169, INN650D080BS, IGT60R070D1, EPC2218 |
| Markennamen demystification | Section 8 | GaNPrime/Anker, GaNFast/Navitas, Baseus GaN5 Pro mapping |

#### Weaknesses

| Issue | Detail | Severity |
|-------|--------|----------|
| Expert Insight uses old GaN naming convention | "GaN V", "GaN I-II", "GaN III-IV" (line 535) -- rest of article uses "GaN 1/2/3/4/5". Violates brief's explicit rule. | High |
| Expert Insight FOB pricing in USD | "0,80-1,50 USD" (line 535) -- entire article otherwise uses EUR. DACH audience expects EUR. | High |
| GaN 1 section compressed (GEO 62/100) | Single dense paragraph, no bullet points. Previous GEO audit recommendation unfilled. | Medium |
| GaN 4 section light (GEO 66/100) | No FET part numbers, no thermal data, no quantifiable improvements over GaN 3. Missing Navitas NV6165, Innoscience INN650D100B that GEO audit recommended. | Medium |
| WOWOHCOOL Fakt box uses generic factory stats | "ISO 9001 seit 2013, MOQ ab 500 Stuck" -- same stats across many articles. No GaN-specific first-party measurement (e.g., "Our GaN 5 65W PCBA measured 94.7% at 230V/50Hz"). | Medium |
| No Cascode vs Enhancement-Mode dedicated explanation | Brief (Section 2, gap #12) explicitly requested this: "Cascode vs Enhancement-Mode -- Deutscher Terminus 'Kaskode'/'Anreicherungsmodus'". Only brief mention in FAQ Q3 context. | Medium |

#### Information Gain vs DE SERP Competitors

| Dimension | WOWOHCOOL DE | Zonsanpower DE | Anker DE | Sir Apfelot |
|-----------|:-----------:|:-------------:|:--------:|:----------:|
| GaN 1-5 complete coverage | **Yes** | Yes (machine translated) | No | No |
| EUR BOM pricing by generation | **Yes** | No | No | No |
| GS-Zeichen / TUV pathway | **Yes** | No | No | No |
| ErP Lot 6 / ESPR compliance | **Yes** | No | No | No |
| FET part numbers with DACH column | **Yes** | No | No | No |
| Brand name demystification | **Yes** | Partial | Only Anker | No |
| EV/OBC DACH context | **Yes** | No | No | Elektroniknet (academic) |
| Natural German (not machine translated) | **Yes** | **No** (translated) | Yes | Yes |

**Verdict:** The article owns 5 competitive dimensions zero DE SERP competitors cover simultaneously: EUR BOM, GS-Zeichen, ErP Lot 6, FET part numbers with DACH column, and EV/OBC context. The machine-translated Zonsanpower competitor is the closest in coverage but lacks all DACH-specific depth.

---

### Gate 3: Scannability -- Score: 88/100

#### H1 Assessment

`GaN Generationen 1-5: Technik, Effizienz & OEM-Kosten 2026` -- **58 characters.** Contains "OEM" (B2B signal). Within 50-65 char range. PASS.

#### H2 Structure (14 H2s)

| # | H2 Text | B2B Signal? |
|---|---------|:-----------:|
| 1 | Warum GaN-Generationen fur deutsche Importeure wichtig sind | "Importeure" |
| 2 | Die funf GaN-Generationen im Schnelluberblick | -- |
| 3 | GaN 1 (2018): Pionier-Generation, Nische | -- |
| 4 | GaN 2 (2021): Effizienzsprung fur Budget-Produkte | -- |
| 5 | GaN 3 (2022-2023): Aktueller Industriestandard | -- |
| 6 | GaN 4 (2024-2025): Leistungsdichte fur 140W+ | -- |
| 7 | GaN 5 (2025+): Premium mit PD 3.1 240W | -- |
| 8 | Markennamen fur Einkauf: GaNPrime, GaNFast & Co. | "Einkauf" |
| 9 | Vergleichstabelle GaN 1-5 fur B2B-Produkte | "B2B" |
| 10 | GaN-FET-Lieferanten: Infineon, Navitas, Innoscience, EPC | "Lieferanten" |
| 11 | Welche Generation fur Ihr Projekt? (DACH-Preisklassen) | -- |
| 12 | DACH-Compliance: GS-Zeichen, ErP Lot 6, ElektroG | -- |
| 13 | GaN in der DACH-Elektromobilitat (Onboard Charger) | -- |
| 14 | Zukunftsausblick: GaN 6 & GaN+SiC Hybrid | -- |

**4 of 14 H2s contain B2B signal words.** Requirement: >= 2. PASS.

**Issue:** H2s 3-7 (generation descriptions) are educational rather than procurement-decision headers. A procurement manager scanning H2s sees "what each generation is" before "how to decide." The decision is delegated to H2 #11. Acceptable for a comparison/encyclopedia article, but a missed optimization compared to the EN version which frames generations as "Budget OEM Option", "Mid-Range OEM Sweet Spot", "Premium OEM Platform."

#### H3 Specificity

All H3s are concrete and technical: "GS-Zeichen (Geprufte Sicherheit)", "ErP Lot 6 / ESPR (EU-Okodesign)", "ElektroG WEEE + Paragraph 22f UStG", "GaNPrime (Anker)", "GaNFast (Navitas)", etc. No vague headers detected. PASS.

#### Table of Contents

Present (lines 420-440). Dark blue background (brandBlue), covers all 15 entries (14 H2s + FAQ). PASS.

#### Key Takeaways Box (Featured Snippet Capture)

Present (lines 406-416). Amber left-border box, 5 bullet points. "KERNERKENNTNISSE" label. speakable class applied. Serves as the featured snippet extraction point. PASS.

---

### Gate 4: Visual Authenticity -- Score: 88/100

**No stock photos detected.** All images are real factory/product photography.

| # | Image | Alt Text B2B Keyword? |
|---|-------|:---------------------:|
| 1 | Cover image | "OEM-Beschaffungsleitfaden fur DACH-Importeure" |
| 2 | WOP10 product | "Mid-Range OEM-Losung 40-70 EUR DACH" |
| 3 | GaN 5 product | "Premium-Tier DACH" |
| 4 | WOP80 product | "OEM-Referenzdesign fur Infineon-Navitas-Innoscience-FET-Vergleich" |
| 5 | Author photo (hero) | "Market Managerin OEM/ODM & Technologie" |
| 6 | Author photo (bio) | "Market Managerin OEM/ODM & GaN-Technologie" |

**Issues:**

- GaN 5 product image alt text (line 543): "GaN V (Gen 5) Ladegerat" -- uses old "GaN V" naming mixed with new "Gen 5". Should be "GaN 5 Ladegerat".
- No factory-production GIFs or data visualization charts (consistent gap across all articles -- not DE-specific).
- Images #2 (WOP10) and #4 (WOP80) have excellent B2B alt text. GaN 5 product image (#3) alt text is sparse by comparison.

**Author image:** Both hero and bio have complete alt text with job title and expertise. PASS.

---

### Gate 5: CTA Relevance -- Score: 90/100

**Final CTA (lines 747-759):**
- "GaN-Ladegerat OEM Projekt starten" -- B2B procurement language
- "Angebot anfordern" + "OEM/ODM Service" -- two paths for the procurement decision-maker
- MOQ, GS-Zeichen, Lieferzeit all mentioned in CTA body

**Blog CTA partial (line 835):**
- "GaN Projekt in 24 Stunden starten"
- "Individuelles Angebot fur GaN-3/4/5-Ladegerate mit BOM-Dokumentation und FET-Nachweis"

All CTAs use B2B procurement language. PASS.

---

## Part 2: Schema Markup Audit -- Score: 70/100

### Schema Coverage Matrix

| Schema Type | Present? | Issues |
|-------------|:--------:|--------|
| Organization | Yes | Standard WOWOHCOOL org node |
| WebSite | Yes | inLanguage de-DE correct |
| BreadcrumbList | Yes | 3 items, correct positions, German labels |
| BlogPosting | Yes | headline, description, dates, all present |
| Person (Author) | Yes | LinkedIn URL, jobTitle, knowsAbout (4 topics) |
| FAQPage | Yes | 7 questions (within 5-8 recommended range) |
| HowTo | **Yes** | 3 steps but **NO visible HowTo section in body** (Ghost HowTo -- see Part 3) |
| SpeakableSpecification | Yes | cssSelector: ["h1", ".speakable"] |
| ManufacturingBusiness | No | Only Organization, no ManufacturingBusiness subtype |

### Schema Quality Issues

| # | Issue | Severity | Detail |
|---|-------|----------|--------|
| S1 | **Ghost HowTo** -- schema has no matching body content | **CRITICAL** | Schema (lines 237-277) declares HowTo "Echte GaN-Generation im Ladegerat erkennen" with 3 steps. There is NO visible HowTo section in the article body with these 3 steps. The FAQ Q6 "Wie erkenne ich ein echtes GaN-5-Ladegerat?" has a 5-Punkt-Check -- different step count (5 vs 3), different scope (GaN-5 specifically vs all GaN generations). Google requires HowTo structured data to match visible on-page content. This is a policy violation. |
| S2 | **wordCount 2248 wrong** | **CRITICAL** | Schema line 131: "wordCount": 2248. Article body is approximately 3,500-4,500 words in visible content. The 2248 value is a carryover from the pre-expansion version (datePublished 2026-05-27, ~2,200 words per research brief). Must be updated to actual word count. |
| S3 | **timeRequired PT7M vs body "16 min Lesezeit"** | **CRITICAL** | Schema says 7 minutes (line 133), body date row says "16 min Lesezeit" (line 382). Direct contradiction. A 3,500+ word article with 14 sections and 3 tables is 14-16 minutes, not 7. |
| S4 | **English promo text in DE schema FAQ Q7** | HIGH | Schema FAQ Q7 (line 340): "...WOWOHCOOL has served 200+ global brands since 2013 with a defect rate below 0.3%." This is English text in a German article's structured data. Body FAQ Q7 correctly uses only German: "Infineon-FETs vereinfachen GS-Zeichen-Abnahme durch europaische Prufstellen." Schema-body mismatch. |
| S5 | Schema FAQ Q4 vs body FAQ Q4 text mismatch | MEDIUM | Schema: "Zusatzlich werden USB-IF-zertifizierte EPR-Kabel benotigt." Body: "Zusatzlich werden USB-IF-zertifizierte EPR-Kabel und -Stecker benotigt." Body has additional detail ("und -Stecker"). |
| S6 | Schema FAQ Q6 vs body FAQ Q6 formatting mismatch | MEDIUM | Schema: unnumbered list. Body: (1)-(5) numbered list with colons. Schema: "65-75 Grad". Body: "65-75 Grad Celsius". Schema: "~50%". Body: "~50 %" (space). These are parse-level differences that may cause Google to flag mismatch. |

### Pre-Commit Checklist Verification

| Check | Status |
|-------|:------:|
| H1 contains B2B signal word + 50-65 chars | PASS (58 chars, "OEM") |
| >=2 H2s contain B2B signal words | PASS (4 of 14) |
| HowTo Schema added (process article) | FAIL (Ghost HowTo -- no body section) |
| Image alt text contains B2B keywords | PASS (5 of 6) |
| dateModified updated | PASS (2026-07-29) |
| wordCount updated to actual value | **FAIL (2248 is wrong -- carryover)** |
| >=2 external authority links | PASS (11 external links) |
| >=3 internal links | PASS (10+ internal links) |
| FAQ questions use B2B procurement language | PASS (7 of 7, e.g., "DACH-Projekte", "GS-Zeichen") |
| FAQ questions 5-8 count | PASS (7 questions) |

---

## Part 3: Cross-Reference Consistency Audit -- Score: 50/100

### DE-Specific Findings

#### 3.1 GaN Naming Convention Violation (Brief Rule)

**The research brief explicitly states (Section 0, line 16):**
> "德语 SERP 主流是 GaN 1/2/3/4/5 与 GaNPrime/GaN II，不用英文版的 GaN I/III/V 跳代"

**Violations found:**

| Location | Text | Convention | Status |
|----------|------|------------|:------:|
| Expert Insight (line 535) | "GaN V erreicht 96% Effizienz... GaN I-II ist Auslaufware, GaN III-IV der aktuelle Standard, GaN V die Zukunftssicherung. Der FOB-Preisunterschied zwischen GaN IV und V..." | GaN I/II/III/IV/V (English) | **VIOLATION** |
| GaN 5 image alt (line 543) | "GaN V (Gen 5) Ladegerat" | Mixed GaN V + Gen 5 | **VIOLATION** |
| Related article h3 (line 786) | "GaN V OEM Fertigung" | GaN V (English) | **VIOLATION** |
| Section 2 warning (line 479) | "...Begriffe wie 'GaN V', 'GaNFast' oder 'GaN III'" | Uses old naming as examples of marketing terms | Acceptable (meta-commentary) |

**Impact:** The Expert Insight is quoted as Snowy May's authoritative statement. Using "GaN V" instead of "GaN 5" in attributed expert commentary undermines the article's entire naming convention. The alt text and related article card are lower priority but should be fixed for consistency.

#### 3.2 Currency Inconsistency (EUR vs USD)

| Location | Currency | Text |
|----------|----------|------|
| Key Takeaways (line 408) | USD (market data) | "4,8 Mrd. USD bis 2028" |
| Section 1 (line 457) | USD (market data) | "2,1 Milliarden USD" |
| Expert Insight (line 535) | **USD (FOB pricing)** | "0,80-1,50 USD" |
| Comparison table (line 576) | EUR | BOM in EUR |
| All DACH pricing sections | EUR | EUR throughout |

**Issue:** Market size data in USD is acceptable (Yole Group reports in USD). However, the Expert Insight FOB price delta of "0,80-1,50 USD" should be in EUR since (a) the article is for DACH importers, (b) all BOM and retail pricing is in EUR, and (c) the comparison table directly below uses EUR. This creates a mental conversion burden for the reader.

#### 3.3 Ghost HowTo: Schema-Body Structural Gap

The HowTo schema (lines 237-277) declares:
```
"name": "Echte GaN-Generation im Ladegerat erkennen"
step 1: Datenblatt anfordern
step 2: Schaltfrequenz prufen  
step 3: Gehausegrosse messen
totalTime: "P4W"
```

**Body content analysis:**
- No section titled "Echte GaN-Generation im Ladegerat erkennen" exists.
- FAQ Q6 "Wie erkenne ich ein echtes GaN-5-Ladegerat?" has a **5-Punkt-Check**, not 3 steps.
- The FAQ 5-Punkt-Check includes items not in the HowTo schema (temperature, PD 3.1 EPR).
- The HowTo schema includes items not in the FAQ (Datenblatt step as separate from Schaltfrequenz).
- `totalTime: "P4W"` (4 weeks) is implausible for a 3-step verification process.

**Google policy:** "Don't add HowTo structured data to pages where the how-to is not the main focus of the page. HowTo structured data is only eligible for pages where the main content is a set of steps on how to achieve a requirement."

**Verdict:** This HowTo is fabricated structured data. It does not correspond to any visible on-page content section and its steps don't match the closest related content (FAQ Q6 5-Punkt-Check). Remove or rewrite to match body content exactly.

#### 3.4 wordCount / timeRequired Mismatch

| Field | Schema Value | Actual/Body Value | Status |
|-------|-------------|-------------------|:------:|
| wordCount | 2248 | ~3,500-4,500 | **MISMATCH** |
| timeRequired | PT7M | "16 min Lesezeit" | **MISMATCH** |

#### 3.5 Schema FAQ Q6 Formatting Mismatch (Detailed)

| Element | Schema (line 332) | Body (line 706) |
|---------|-------------------|-----------------|
| Structure | Comma-separated, no numbers | (1)-(5) with colons |
| Temperature | "65-75 Grad" | "65-75 Grad Celsius" |
| Percentage spacing | "~50%" | "~50 %" |
| Item detail | Bare values | Explanatory colons |

#### 3.6 Pricing Cross-Reference: DE vs EN

| Data Point | DE Value | EN Value | Match? |
|------------|----------|----------|:------:|
| GaN 5 BOM 65W | 6,50-8,50 EUR | $7-9 USD (FOB) | Yes (~0.92 EUR/USD) |
| GaN 3 BOM 65W | 4,80-6,20 EUR | $5-7 USD (FOB) | Yes |
| GaN 2 BOM 65W | 4,00-5,50 EUR | -- | DE-only data |
| GS-Zeichen cost | 3,000-8,000 EUR/modell | -- | DE-only data |

DE and EN pricing is consistent when currency conversion is applied. No cross-language pricing contradiction. PASS.

---

## Part 4: E-E-A-T Signal Assessment

### Experience (First-Hand)

- Factory images: WOP10, WOP80, GaN 5 product photography -- real products. PASS.
- First-party data: Thermal (65-75C), efficiency (97%), standby (<30mW). Partial first-party -- attributed generically, not to specific WOWOHCOOL lab measurement. 
- **Missing:** No first-party lab measurement with specific test equipment (e.g., "Our GaN 5 65W PCBA measured 94.7% on Chroma 63600 at 230V/50Hz"). The WOWOHCOOL Fakt box uses generic factory stats (ISO 9001, 5,000m2, 50+ R&D) shared across articles.
- Expert Insight: 2 attributed quotes from Snowy May with DACH-specific project data. Credible.

### Expertise -- Score: 85/100

- Author Snowy May: Market Managerin, 10+ Jahre OEM/ODM & GaN-Technologie. PASS.
- Schema knowsAbout: 4 topics including "GaN Generationen", "OEM Sourcing", "PD 3.1", "DACH Import". PASS.
- LinkedIn URL: Present in both body and Schema. PASS.
- Deep DACH knowledge demonstrated: GS-Zeichen costs, Stiftung EAR, 22f UStG, ErP Lot 6, TUV/VDE pathways. PASS.

### Authoritativeness -- Score: 82/100

- External citations: USB-IF, TUV Rheinland, VDE, Stiftung EAR, EUR-Lex, Infineon, Navitas, Innoscience, EPC, Yole Group, Elektroniknet. Strong DACH-specific sources. PASS.
- Organization Schema: Complete with German WebSite node, address, sameAs, contactPoint with "German" in availableLanguage. PASS.
- DACH-specific authority signals: Infineon (Munich) as primary FET supplier, TUV/VDE as certification authorities, Elektroniknet as German trade journal. PASS.

### Trustworthiness -- Score: 78/100

- EUR pricing transparency: BOM breakdown by generation. PASS.
- GS-Zeichen costs disclosed: 3,000-8,000 EUR per model. PASS.
- Honest about GaN 2/4 being "ubersprungen" (skipped) -- doesn't pretend they're mainstream. PASS.
- **Deducted:** Ghost HowTo fabricates a verification process not present in body. This is a trust signal concern for both users (if they check structured data) and Google (policy violation).
- **Deducted:** English promo text in German schema ("WOWOHCOOL has served 200+ global brands...") reads as a copy-paste error, not intentional localization.

---

## Part 5: DE-Specific Checks

### 5.1 German GaN Terminology Consistency

| Convention | Used In | Correct? |
|-----------|---------|:--------:|
| GaN 1, GaN 2, GaN 3, GaN 4, GaN 5 | H1-H4, table, TOC, body, schema FAQ | **Yes** (German SERP standard) |
| GaN I, GaN II, GaN III, GaN IV, GaN V | Expert Insight block only | **No** (English convention) |
| GaN V (Gen 5) | Image alt text (line 543) | **No** (mixed) |
| GaN V OEM Fertigung | Related article h3 (line 786) | **No** (old convention) |

**Verdict:** 95% of the article uses correct German naming. The 3 violations are concentrated in the Expert Insight block, one image alt, and one related article card.

### 5.2 Umlauts and Special Characters

All Umlauts render correctly in source: Ubersicht, fur, Ladegerat, Elektromobilitat, Zukunftsausblick, Prufinstitut, Okodesign, etc. No encoding corruption detected.

**One typographic issue:** Expert Insight (line 535) has "96% Effizienz" (no space before %) while the rest of the article consistently uses "97 % Effizienz", "90 % Effizienz" (with space). German typographic convention prefers a thin space before %.

### 5.3 FOB Pricing Cross-Reference

| Element | DE | EN | Consistent? |
|---------|----|----|:----------:|
| GaN 5 65W BOM | 6,50-8,50 EUR | $7-9 USD | Yes (~0.92 rate) |
| GaN 3 65W BOM | 4,80-6,20 EUR | $5-7 USD | Yes |
| GaN 2 65W BOM | 4,00-5,50 EUR | -- | DE-only |
| Expert Insight FOB delta | 0,80-1,50 **USD** | -- | **Should be EUR** |

The BOM pricing is internally consistent when currency-converted. The only issue is the Expert Insight quoting FOB delta in USD while everything else is EUR.

### 5.4 HowTo Schema DE Check

The HowTo schema uses correct German throughout:
- "Echte GaN-Generation im Ladegerat erkennen" -- natural German
- "Datenblatt anfordern", "Schaltfrequenz prufen", "Gehausegrosse messen" -- correct imperative
- "Verlangen Sie vom Hersteller..." -- formal "Sie" consistent with article tone

The problem is not language quality -- it's that the HowTo has no matching visible body section.

### 5.5 DACH Market Data Freshness

| Data Point | Date Reference | Fresh? |
|-----------|---------------|:------:|
| Yole Group market data | 2025 (Power GaN Report) | Yes |
| Infineon CoolGaN Next | PCIM Europe 2026 (Nuremberg) | Yes -- very current |
| ErP Lot 6 deadline | "Ab 2027" | Yes |
| GaN 5 status | "2025+" | Yes |
| GaN 6 timeline | "2027-2029" | Yes |

All market/regulatory data is current for 2026. PASS.

---

## Part 6: Priority Action Items

### P0 -- Fix Immediately (Data Integrity / Policy Violations)

| # | Action | Location | Effort |
|---|--------|----------|:------:|
| P0-1 | **Fix wordCount to actual value.** Count words in visible article body and update Schema line 131. Estimated correct value: ~3,800-4,200. | Schema line 131 | 2 min |
| P0-2 | **Fix timeRequired to match Lesezeit.** Change from "PT7M" to "PT16M" to match body "16 min Lesezeit" (line 382). | Schema line 133 | 1 min |
| P0-3 | **Remove or rewrite Ghost HowTo.** Option A: Remove HowTo schema entirely (recommended -- FAQ Q6 serves the verification purpose). Option B: Rewrite HowTo to match FAQ Q6 5-Punkt-Check exactly with same 5 steps and same text. | Schema lines 237-277 | 5 min |
| P0-4 | **Fix Expert Insight GaN naming convention.** Replace "GaN V" with "GaN 5", "GaN I-II" with "GaN 1-2", "GaN III-IV" with "GaN 3-4", "GaN IV und V" with "GaN 4 und 5". | Line 535 | 2 min |
| P0-5 | **Fix Expert Insight FOB currency to EUR.** Change "0,80-1,50 USD" to "0,75-1,40 EUR" (or actual FOB delta in EUR). | Line 535 | 1 min |
| P0-6 | **Remove English promo text from Schema FAQ Q7.** Replace "...WOWOHCOOL has served 200+ global brands since 2013 with a defect rate below 0.3%." with the body's German text: "Infineon-FETs vereinfachen GS-Zeichen-Abnahme durch europaische Prufstellen." | Schema line 340 | 1 min |

### P1 -- Fix This Week (Schema Quality)

| # | Action | Location | Effort |
|---|--------|----------|:------:|
| P1-1 | **Align Schema FAQ Q4 with body.** Schema says "EPR-Kabel benotigt", body says "EPR-Kabel und -Stecker benotigt". Update schema to match body (body is more accurate). | Schema line 316 | 1 min |
| P1-2 | **Align Schema FAQ Q6 formatting with body.** Add (1)-(5) numbering, colons, "Grad Celsius" instead of "Grad", "~50 %" (space) instead of "~50%". Or simplify body to match schema. Either direction -- just make them match. | Schema lines 330-332 + body lines 706-707 | 5 min |
| P1-3 | **Fix GaN 5 image alt text.** Change "GaN V (Gen 5) Ladegerat" to "GaN 5 Ladegerat". | Line 543 | 1 min |
| P1-4 | **Fix related article h3.** Change "GaN V OEM Fertigung" to "GaN 5 OEM Fertigung" (or check what the target page actually uses). | Line 786 | 1 min |
| P1-5 | **Normalize rel attributes.** Add `rel="noopener noreferrer nofollow"` consistently to all external links. Currently ~8 links in body use `rel="noopener external"` without `noreferrer`. | Lines 458, 506, 529, 531, 600, 641, 645, 649, 658 | 5 min |

### P2 -- Content Enhancements (This Month)

| # | Action | Effort |
|---|--------|:------:|
| P2-1 | **Expand GaN 1 section with bullet points.** De-minify the single dense paragraph into a specs list (Voltage, Frequency, RDS_on, Efficiency, DACH status). This lifts GEO citability from 62 to ~78 per July audit recommendation. | 10 min |
| P2-2 | **Add FET models to GaN 4 section.** Navitas NV6165, Innoscience INN650D100B are the missing part numbers recommended by GEO audit. Add thermal improvement quantification (RthetaJC reduction %). | 10 min |
| P2-3 | **Add Cascode vs Enhancement-Mode dedicated H3.** Brief explicitly requested this with German terminology "Kaskode"/"Anreicherungsmodus". Insert as H3 under GaN 5 section. | 15 min |
| P2-4 | **Add Expert Insight typography fix.** "96% Effizienz" -> "96 % Effizienz" (space before %). | 1 min |
| P2-5 | **Consider differentiating WOWOHCOOL Fakt box.** Replace generic factory stats with GaN-specific first-party measurement (e.g., "Our GaN 5 65W PCBA measured 94.7% efficiency at 230V/50Hz on Chroma 63600"). | 15 min |
| P2-6 | **Add FAQ Q8 to reach 8 questions** (brief target was 8-10, currently 7). Suggested: "Was kostet die GS-Zeichen-Zertifizierung fur ein GaN-5-Ladegerat?" or "Welche GaN-Generation erfullt ErP Lot 6 ab 2027?" | 10 min |

---

## Part 7: Comparison to Prior Audits

### vs GEO CITABILITY (2026-07-21, Score 87/100)

| Finding from GEO Audit | Status in This Audit |
|------------------------|---------------------|
| GaN 1 section too compressed (62/100) | **UNFIXED** -- still single dense paragraph |
| GaN 4 section too light (66/100) | **UNFIXED** -- still missing FET models and thermal data |
| Add DACH OEM Decision Matrix table | **NOT ADDED** -- Section 11 has 3-tier pricing but no unified decision matrix |
| De-minify sections into bullet points | **UNFIXED** -- GaN 1 remains minified |

**Overall:** GEO citability recommendations remain largely unfilled 12 days later.

### vs EN Audit (2026-08-02, Score 76/B-)

| EN Finding | DE Equivalent? | Status |
|-----------|---------------|:------:|
| HowTo lists GaN IV as mainstream but body says non-commercial | DE HowTo lists GaN 1/3/5 correctly, but is a Ghost HowTo | **Different issue** |
| FAQ Q2 pricing ($8-12) vs body table ($7-9) | DE FAQ has no pricing question; no equivalent inconsistency | **Does not apply** |
| FAQ Q4 MOQ 2,000 vs body 3,000+ | DE FAQ has no MOQ question | **Does not apply** |
| FAQ Q5 "Yes." prefix on non-yes/no question | DE FAQ has no equivalent question | **Does not apply** |
| FAQ Q6/Q7 promo boilerplate mismatch | DE FAQ Q7 has English promo text in schema but German in body | **DE-specific variant** |

**Key insight:** The EN article has data-drift issues (numbers changing between schema and body). The DE article has structural issues (Ghost HowTo, naming convention, wrong metadata). Different root causes -- both need fixing.

---

## Part 8: Final Assessment

### What This Article Does Exceptionally Well

1. **DACH compliance depth** -- GS-Zeichen costs, TUV/VDE pathways, ErP Lot 6, ElektroG WEEE, 22f UStG, Stiftung EAR. Zero DE SERP competitors cover this comprehensively.
2. **EUR-based BOM pricing by generation** -- 6-column comparison table with real EUR ranges. Uniquely procurement-actionable.
3. **Natural German throughout** -- Not machine-translated (unlike Zonsanpower DE). Formal "Sie" consistent. German B2B terminology correct.
4. **Markennamen demystification** -- Section 8 correctly maps GaNPrime/Anker, GaNFast/Navitas, Baseus GaN5 Pro to actual generations. This is the confusion-resolving content DE buyers need.
5. **DACH-specific supplier column** -- Infineon Munich HQ advantage, TUV pre-certification pathway, Innoscience 10-20% cost saving with extra EMV filtering caveat.
6. **EV/OBC DACH context** -- Elektroniknet citation, 800V architecture, Germany as Europe's largest EV market. Relevant differentiation none of the consumer-tech competitors cover.

### What Needs Immediate Attention

1. **Ghost HowTo** -- Schema declares a 3-step process with no visible body counterpart. This is a Google structured data policy violation. Remove or rewrite to match FAQ Q6 exactly.
2. **wordCount/timeRequired wrong** -- Simple carryover from pre-expansion version. Obvious to any validator.
3. **Expert Insight naming convention** -- The author's attributed quote uses the wrong naming convention (GaN V not GaN 5), undermining the article's carefully maintained German SERP naming standard.
4. **English text in German schema** -- "WOWOHCOOL has served 200+ global brands..." in a de-DE article's FAQ schema. Looks like a copy-paste error from the EN version.
5. **GEO citability improvements unfilled** -- GaN 1 and GaN 4 sections remain weak spots 12 days after the GEO audit flagged them.

### Overall Verdict

The article's core value proposition (DACH compliance depth + EUR BOM pricing + FET part numbers + brand name demystification) is intact and competitive. The 6 P0 issues are all fixable in under 15 minutes total -- they are surface-level metadata, naming, and schema consistency problems, not content quality problems.

Once P0 items are fixed, this article should rank competitively for "GaN Generationen Vergleich" and related DACH queries where Zonsanpower DE (machine-translated) and Anker DE (brand-biased) are the only competitors. The DACH compliance depth remains the article's unassailable moat.

**Bottom line:** A strong B+ article that needs 15 minutes of metadata and schema cleanup to reach A- territory. No rewrite needed.

---

*Audit performed manually against B2B Blog Quality Standards 2026. Cross-referenced against GEO CITABILITY (2026-07-21), Research Brief (2026-06-24), and EN Page Audit (2026-08-02).*
