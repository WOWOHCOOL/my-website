# Page Audit: Fabrikprüfung China Audit-Checkliste (DE)

**Audit Date:** 2026-08-02
**Article:** `src/de/blog/fabrikpruefung-checkliste-importeure/index.njk`
**Site:** wowohcool.com (DE)
**Auditor:** Claude Code (manual, against B2B Blog Quality Audit Standard 2026)
**Reference Audits:**
- `de-blog-quality-audit-2026-07-14.md` (DE 28-article sweep, this article scored 87)
- `de-blog-6-dimension-audit-2026-07-14.md` (AQL fix applied to HowTo + table header)
- `GEO-CITABILITY-SCORE-fabrikpruefung-checkliste-2026-07-21.md` (Citability 87/100)
- `page-audit-factory-verification-checklist-2026-08-02.md` (EN version scored 84)

---

## Scores Summary

| Dimension | Score | Grade | EN Score (for ref) |
|-----------|:-----:|:-----:|:------------------:|
| B2B Content Quality | **90 / 100** | A- | 92 |
| Information Gain | **95 / 100** | A | 68 |
| Schema Compliance | **82 / 100** | B | 90 |
| Heading Hierarchy | **95 / 100** | A | 80 |
| Visual Authenticity | **95 / 100** | A | 95 |
| CTA Relevance | **95 / 100** | A | 95 |
| Data Consistency | **65 / 100** | C- | 60 |
| FAQ B2B Language | **88 / 100** | B+ | 95 |
| German Language Quality | **88 / 100** | B+ | N/A |
| **Composite** | **87 / 100** | **B+** | 84 |

> **Note:** The DE article outperforms EN (87 vs 84) primarily due to superior Information Gain (11 comparison tables vs EN's fewer) and clean heading hierarchy (no H3-inside-H3 violations, unlike EN's 8). However, DE has AQL level contradictions that EN does not.

---

## Issues by Priority

### P0 -- Critical (Fix Immediately)

#### P0-1: AQL Level Contradiction -- Two Locations Swap Major/Critical

The article establishes a correct three-level AQL standard in its AQL table (Section 7) and HowTo Step 5, but two locations contradict this:

**Correct AQL mapping** (per article's own Section 7, lines 653-655):
- AQL 0.065 = Kritische Defekte (Critical / safety)
- AQL 1.0 = Hauptfehler (Major / functional)
- AQL 2.5 = Nebenfehler (Minor / cosmetic)

**Wrong location #1 -- Section 7 body**, line 647:
```
"AQL 2.5 für Hauptfehler und AQL 1.0 für kritische Fehler (Sicherheitsrelevant) der Industriestandard"
```
- States AQL 2.5 for Major (wrong -- should be AQL 1.0 for Major)
- States AQL 1.0 for Critical (wrong -- should be AQL 0.065 for Critical)

**Wrong location #2 -- FAQ #8 body answer**, line 936:
```
"AQL 2.5 für Hauptfehler und AQL 1.0 für sicherheitskritische Fehler Industriestandard"
```
- Same error: AQL 2.5 labeled Major, AQL 1.0 labeled Critical

**Also -- FAQ #8 schema answer**, line 390:
```
"Für Powerbanks ist AQL 2.5 für Hauptfehler und AQL 1.0 für sicherheitskritische Fehler Industriestandard"
```
- Same error, embedded in JSON-LD (higher visibility for AI extraction)

**Also -- AQL table header**, line 660:
```
<th>AQL 2,5 (Major) Akz./Abl.</th>
<th>AQL 1,0 (Hauptfehler/Major) Akz./Abl.</th>
```
- Both columns labeled "Major" -- the first column should read "AQL 2,5 (Nebenfehler/Minor)"

**Impact:** Procurement managers use these AQL values for contract specifications. A buyer who reads line 647 and sets AQL 1.0 as "kritische Fehler" will accept 10x the defect rate they should for functional failures. This is a **safety risk** for electronics importers.

**Fix:**
1. Line 647: "AQL 2.5 für **Nebenfehler** und AQL 1.0 für **Hauptfehler**. Für sicherheitskritische Fehler gilt AQL 0.065."
2. FAQ #8 body (line 936): Same correction.
3. Schema FAQ #8 (line 390): Same correction.
4. Table header (line 660): Change "AQL 2,5 (Major)" to "AQL 2,5 (Nebenfehler)"

**Historical note:** The 2026-07-14 6-dimension audit claims "#3 AQL关键缺陷" and "HowTo Step 5 + 表头修正" were fixed. However, the body text and FAQ were NOT corrected. The HowTo (line 258) is correct, the AQL explanation table (lines 653-655) is correct, but two prose locations + FAQ schema + table header still carry the wrong values.

---

### P1 -- High Priority (Fix This Week)

#### P1-1: Swiss "ss" Instead of German "ß" -- 4 Instances Remain

The article uses `inLanguage: "de-DE"` (Germany German) but four words use Swiss Standard German spelling (which replaces ß with ss):

| Line | Current (CH-DE) | Correct (DE-DE) |
|------|-----------------|-----------------|
| 607 | regelmässigen | regelmäßigen |
| 659 | Stichprobengrösse | Stichprobengröße |
| 740 | Firmengrösse | Firmengröße |
| 800 | gemäss | gemäß |

**Historical note:** The 2026-07-14 6-dimension audit fixed 24 Swiss ss->ß corrections but these 4 were missed.

**Fix:** Replace all 4 instances.

#### P1-2: FAQ Schema/Body Answer Mismatch -- English Self-Promotion in Schema

FAQ #5 ("Was sind die häufigsten Betrugsmuster bei Alibaba-Lieferanten?") has different answers in schema vs body:

**Schema answer** (line 366):
```
"WOWOHCOOL has served 200+ global brands since 2013 with a defect rate below 0.3%."
```
- Self-promotional English text embedded in German JSON-LD schema
- Google may suppress FAQ rich results containing promotional content

**Body answer** (line 933):
```
"Ein Gold Supplier Status (ca. 3.000 €/Jahr) sagt nichts über die tatsächliche Fabrikqualität aus."
```
- Informational, non-promotional

**Fix:** Replace the schema FAQ answer #5 to match the body answer. Remove the English self-promotion entirely. The 200+ brands / defect rate data belongs in the WOWOHCOOL Fakt Box (line 487-489), not in FAQ schema.

#### P1-3: Outdated Safety Standard -- EN 60950-1 Referenced

Line 753 in Section 9 (Betrugsmuster 3 -- Gefälschte CE/RoHS-Zertifikate):
```
"Echte CE-Zertifikate listen die getesteten Normen (z. B. EN 60950-1, EN 55032, EN 55035)"
```

**EN 60950-1** was withdrawn on **December 20, 2020** and replaced by **EN 62368-1** (hazard-based safety standard for AV/IT/communications equipment). A 2026 DE-market article citing a withdrawn standard undermines technical credibility for DACH readers, who are among the most standards-conscious importers in Europe.

**Fix:** Replace "EN 60950-1" with "EN 62368-1". Optionally add a note: "EN 60950-1 wurde 2020 zurückgezogen; EN 62368-1 ist der aktuelle Standard."

#### P1-4: H1 vs Frontmatter Title Mismatch

| Field | Text |
|-------|------|
| Frontmatter `title` | "Fabrikprüfung China: Audit-Checkliste für Unternehmen **2026**" |
| Schema `headline` | "Fabrikprüfung China: **Komplette** Audit-Checkliste für Unternehmen" |
| On-page `<h1>` | "Fabrikprüfung China: **Komplette** Audit-Checkliste für Unternehmen" |

- Frontmatter has "2026" (year freshness signal for SERP) but no "Komplette"
- Schema + H1 have "Komplette" but no "2026"

**Fix:** Align all three to: "Fabrikprüfung China: Komplette Audit-Checkliste für Unternehmen 2026" (69 chars -- slightly over 65-char limit, but the additional information justifies the length). Alternatively, drop "Komplette" and keep "2026": "Fabrikprüfung China: Audit-Checkliste für Unternehmen 2026" (59 chars, within limit).

#### P1-5: wordCount Verification Required

Schema `wordCount`: 5696 (line 130).
File: 1042 lines, significant body content.

**Fix:** Count rendered words (excluding Nunjucks template code). Benchmark: the EN version with comparable content depth is estimated at 6500-7500 words. If the actual DE count differs from 5696 by more than 100, update the schema.

#### P1-6: BSCI Validity Period -- Table vs Body vs FAQ Ambiguity

| Location | Text |
|----------|------|
| Section 10 table (line 786) | "2 Jahre (A/B), 1 Jahr (C/D)" |
| Section 10 body (line 809) | "1-2 Jahre gültig" |
| FAQ #6 body (line 934) | "2 Jahre gültig" |

The table correctly shows grade-dependent validity. The body text oversimplifies to "1-2 Jahre" and FAQ #6 omits the grade distinction entirely ("2 Jahre").

**Fix:** Align body and FAQ to: "2 Jahre bei A/B-Rating, 1 Jahr bei C/D-Rating. Ein BSCI-Audit kostet 1.500-3.500 EUR."

---

### P2 -- Medium Priority (Address This Month)

#### P2-1: AQL Table Header Column Label -- Both "Major"

Line 660:
```html
<th>AQL 2,5 (Major) Akz./Abl.</th>
<th>AQL 1,0 (Hauptfehler/Major) Akz./Abl.</th>
```
Already noted in P0-1 but flagged separately since this is a presentation issue distinct from the factual errors in prose.

**Fix:** Change first column to "AQL 2,5 (Nebenfehler)" to match the article's own three-tier table on lines 653-655.

#### P2-2: Section 7 Body Text Oversimplifies AQL Mapping

Line 647:
```
"Für Powerbanks und Ladegeräte ist AQL 2.5 für Hauptfehler und AQL 1.0 für kritische Fehler (Sicherheitsrelevant) der Industriestandard"
```

Beyond the factual error (P0-1), this line omits the third tier (AQL 0.065 for Critical). The article's own AQL table (lines 653-655) lists three tiers. Two-tier presentation contradicts three-tier table.

**Fix:** Expand to match the table: "Für Powerbanks und Ladegeräte ist AQL 2.5 für Nebenfehler, AQL 1.0 für Hauptfehler und AQL 0.065 für sicherheitskritische Fehler der Industriestandard."

#### P2-3: Author Bio Expertise Tag vs Article Content

Author bio (line 956): "Market Managerin · **Factory Audit Expertin** · 10+ Jahre Erfahrung"
Schema `knowsAbout` (line 193-199): "Fabrikpruefung China", "Qualitaetskontrolle", "ISO 9001 Audit", "OEM/ODM Beschaffung", "Supply Chain Management"

The bio text and schema `knowsAbout` align well with the article topic. No issue -- but consider adding "AQL" and "BSCI Audit" to `knowsAbout` since these are major sections of the article.

#### P2-4: Quellen & Referenzen Section -- Missing Link for NECIPS

The "Quellen & Referenzen" lists gsxt.gov.cn (line 1025) but the section 3 walkthrough also references specific Companies House URL and Google Reverse Image Search. These are not repeated in the Quellen section.

**Fix:** Consider adding these to Quellen for completeness, though the inline links are sufficient for Google's link graph.

---

### P3 -- Low Priority (Nice to Have)

#### P3-1: Hero Bar vs Author Bio -- Different Expertise Lines

Hero bar (line 415): "Market Managerin · **10+ years in Factory Audit & OEM/ODM**"
Full bio (line 956): "Market Managerin · **Factory Audit Expertin** · 10+ Jahre Erfahrung"
Full bio paragraph (line 957): "**über 200 Factory Audits** für europäische Importeure begleitet"

The "200+ Factory Audits" data point only appears in the full bio. Consider adding to the hero bar for stronger first-hand experience signal above the fold.

#### P3-2: FAQ #1 Body Answer -- Missing "ab 20.000 EUR" Threshold

FAQ #1 schema answer (line 334): No Bestellwert threshold mentioned.
FAQ #1 body answer (line 929): "Bei Bestellwerten über 20.000 EUR empfiehlt sich zusätzlich eine externe Prüfung"

Schema and body answers differ slightly. The schema answer is generic; the body answer is more specific with the threshold. The schema answer should match the body for consistency.

#### P3-3: Section 3 -- "Years on Alibaba" vs Company Age Clarification

Line 556: "Echte Fabriken sind oft 5-10+ Jahre auf der Plattform" -- This is somewhat vague. The article's own NECIPS walkthrough teaches readers to distinguish company registration date from platform membership. Adding a sentence like "Ein 2018 registriertes Unternehmen mit '10 years on Alibaba' hat einen fremden Account gekauft" would strengthen the fraud detection value.

#### P3-4: Section 13 Embedded Image Placement

Lines 864-872: The QC Team image sits between the `<section>` opening and the `<h2>`, creating an unusual structure:

```html
<section id="h2-10" class="mb-16">
 <div class="bg-slate-50 ...">
 <!-- image block -->
 <h2>13. Externe Auditoren...</h2>
```

The image is technically inside the section but before the H2. While not a heading hierarchy violation, it's inconsistent with all other sections where the H2 is the first element after the wrapping div. Move the image after the H2, or better, place it in the auditor comparison section where it's contextually relevant (QC team inspecting same stations as external auditors).

---

## Data Consistency Check

| Check Item | Status | Detail |
|-----------|:------:|--------|
| Title (frontmatter) vs H1 | FAIL | Frontmatter has "2026", H1 has "Komplette" |
| wordCount vs actual | WARN | Schema 5696; file 1042 lines; verify rendered count |
| dateModified (frontmatter vs schema) | PASS | Both show 2026-07-26 |
| Audit cost consistency | PASS | 300-600 EUR/Tag range consistent across body/table/FAQ/HowTo |
| AQL level consistency | FAIL | Two locations swap Major/Critical; table header labels both "Major" |
| ISO 9001 fake cert stat (15-20%) | PASS | Hook, Key Takeaways, Section 2, FAQ #4 -- all consistent |
| DIHK 34% quality problem stat | PASS | Section 1 and Quellen consistent |
| 30% trader stat | PASS | Section 1 and Section 3 consistent |
| Factory size (5.000 m²) | PASS | WOWOHCOOL Box, Key Takeaways, Section 4 -- all consistent |
| BSCI validity period | WARN | Table says 2yr(A/B)/1yr(C/D); body says "1-2 Jahre"; FAQ says "2 Jahre" |
| FAQ schema vs body text | FAIL | FAQ #5 has different answers (EN self-promo in schema) |
| HowTo step count | PASS | 10 steps in schema, matches content |
| Internal link count | PASS | 12+ internal links (well above minimum 3) |
| External link count | PASS | 16+ authoritative links (well above minimum 2) |
| Image alt text B2B keywords | PASS | All 6 images have descriptive alt text |
| Author `knowsAbout` vs article | PASS | Factory Audit, ISO 9001, QC, Supply Chain -- all match |
| `sameAs` -- LinkedIn + Xing | PASS | Both German-professional-network URLs present |
| Hreflang tags | PASS | en/de/es all configured |
| `articleSection` | PASS | "Import & Logistik" matches content |
| H1 B2B signal words | PASS | "Fabrikprüfung" (Fabrik), "Audit", "Unternehmen" -- 3 B2B signals |
| H1 character count | PASS | 63 characters (within 50-65 range) |
| H2 B2B signal density | PASS | 10/14 H2s contain B2B signals (Unternehmen, Importeur, Lieferanten, Audit, OEM) |

---

## Heading Hierarchy Audit

### H3-inside-H3 Violations: 0 (Clean)

Unlike the EN version (8 violations), the DE article has clean heading hierarchy. All H3s are direct children of H2s. No nesting issues found.

```
H1: Fabrikprüfung China: Komplette Audit-Checkliste für Unternehmen
  H2: 1. Warum eine Fabrikprüfung entscheidend ist
    H3: Welche Dokumente sollten Sie vor dem Audit anfordern?
  H2: 2. ISO 9001 Zertifizierung verifizieren
  H2: 3. Geschäftslizenz & Plattform-Identität...
    H3: NECIPS-Walkthrough...
    H3: Alibaba Gold Supplier...
    H3: Trade Assurance: Schutz oder Marketing-Trick?
  H2: 4. Hersteller-Audit: Produktionsfläche...
  H2: 5. Mitarbeiterzahl & Organisation bei Lieferanten
    H3: Arbeitssicherheit als Qualitätsindikator
  H2: 6. SMT-Bestückungslinien & Fertigungstiefe...
  H2: 7. Qualitätskontrolle: 4-Stufen-QC + AQL...
    H3: AQL-Tabelle praktisch erklärt...
  H2: 8. Aging-Test & Qualitätskennzahlen...
  H2: 9. Top 10 Betrugsmuster...
    H3: Muster 1-4 (4 fraud pattern H3s)
  H2: 10. Soziales Audit (BSCI, SA8000, Sedex)
    H3: BSCI vs. SA8000 vs. Sedex SMETA vs. WRAP
    H3: Was prüft ein BSCI-Audit konkret?
    H3: Kosten, Dauer und Rolle im Audit-Mix
  H2: 11. Lieferanten-Referenzen prüfen
  H2: 12. Werksaudit per Video...
    H3: Kosten einer Fabrikreise nach Shenzhen
  H2: 13. Externe Auditoren (SGS, TÜV, BV, Intertek)
    H3: Was tun, wenn das Audit Probleme aufdeckt?
  H2: FAQ für OEM-Importeure
    H3: 8 FAQ questions
```

**Assessment:** All H3s are direct children of H2s. The structure follows the procurement decision chain (Why -> What to verify -> How it's done -> What it costs -> How to comply). Clean. 

---

## Comparison with EN Audit (factory-verification-checklist)

### Where DE Beats EN

| Area | DE | EN | DE Advantage |
|------|:--:|:--:|-------------|
| Information Gain | **95** | 68 | 11 comparison tables (AQL, auditors, BSCI standards, shipping costs, factory trip costs, SMT specs) vs EN's fewer structured data points |
| Heading Hierarchy | **95** | 80 | 0 H3-nesting violations vs EN's 8 |
| Visual Authenticity | **95** | 95 | Tie -- both use real factory photos |
| CTA Relevance | **95** | 95 | Tie -- both have strong B2B CTAs |

### Where EN Beats DE

| Area | DE | EN | EN Advantage |
|------|:--:|:--:|-------------|
| Data Consistency | **65** | 60 | Both have issues but DE's AQL error is more dangerous |
| Schema Compliance | **82** | 90 | EN has cleaner schema (no FAQ body/schema mismatch) |
| FAQ B2B Language | **88** | 95 | EN FAQ is purely informational; DE has promotional text in schema FAQ #5 |

### Shared Issues

- Both have wordCount verification needed
- Both have H1/frontmatter title alignment issues
- Both have cost figure statements (though DE's are actually consistent)

### DE-Unique Issues

- AQL level swap (P0-1) -- EN does not have this error
- 4 Swiss ss->ß instances (P1-1) -- EN has no German spelling concerns
- EN 60950-1 outdated standard reference (P1-3) -- EN version doesn't reference this specific standard
- FAQ schema promotional English text (P1-2) -- EN FAQ is clean

---

## Schema Compliance Checklist

| Schema Node | Present | Quality | Issue |
|-------------|:-------:|:-------:|-------|
| BlogPosting | Yes | Good | headline mismatch with frontmatter |
| headline | Yes | WARN | "Komplette" vs frontmatter "2026" |
| description | Yes | Good | 160 chars, within limit |
| datePublished | Yes | Good | 2026-05-27 |
| dateModified | Yes | WARN | 2026-07-26; if fixing today, update to 2026-08-02 |
| wordCount | Yes | WARN | 5696; verify actual rendered count |
| Person (Author) | Yes | Good | jobTitle, knowsAbout (5 items), sameAs (LinkedIn + Xing), image |
| FAQPage | Yes | WARN | 8 questions, but #5 schema answer differs from body (EN promo) |
| HowTo | Yes | Good | 10 steps with HowToDirection per step |
| BreadcrumbList | Yes | Good | 3 levels |
| Organization | Yes | MINOR | Could upgrade to ManufacturingBusiness subtype |
| SpeakableSpecification | Yes | Good | h1 + .speakable + .faq-answer selectors |
| citation | Yes | Good | 3 CreativeWork nodes (DIHK, IAF Russia, China NMPA) |
| about | Yes | Good | Wikidata Q267558 (OEM) |
| timeRequired | Yes | Good | PT17M |

---

## GEO Citability Assessment (Updated from 2026-07-21)

Previous GEO score: **87/100** (2026-07-21). Updated assessment:

| Category | 2026-07-21 | 2026-08-02 | Delta |
|----------|:----------:|:----------:|:-----:|
| Answer Block Quality | 85 | **82** | -3 (FAQ #5 schema mismatch hurts AI extraction) |
| Passage Self-Containment | 82 | 82 | 0 |
| Structural Readability | 90 | 90 | 0 |
| Statistical Density | 92 | 92 | 0 |
| Uniqueness & Original Data | 88 | 88 | 0 |
| **Overall** | 87 | **86** | **-1** |

The AQL contradiction (P0-1) reduces citability because AI systems extracting AQL values from different parts of the same page will encounter conflicting information, reducing confidence.

---

## Recommended Fixes -- Action Plan

### Immediate (Today, ~45 min)

1. **Fix AQL levels** (P0-1): Correct 3 locations (line 647 body, line 936 FAQ body, line 390 FAQ schema) + table header (line 660)
2. **Fix FAQ schema #5** (P1-2): Remove English promotional text, match body answer
3. **Fix Swiss ss->ß** (P1-1): 4 instances

### This Week (~1 hr)

4. **Fix EN 60950-1 -> EN 62368-1** (P1-3): Update outdated standard reference
5. **Align H1/frontmatter title** (P1-4): Choose unified title with "2026" year signal
6. **Verify wordCount** (P1-5): Count rendered words, update schema
7. **Align BSCI validity language** (P1-6): Grade-distinction in body and FAQ

### This Month

8. **Fix AQL table header column label** (P2-1): "Major" -> "Nebenfehler"
9. **Expand Section 7 body AQL text** (P2-2): Three-tier instead of two-tier
10. **Add "AQL" and "BSCI" to Person knowsAbout** (P2-3): Schema enhancement
11. **Move Section 13 intro image** (P3-4): Restructure for consistency
12. **Harmonize FAQ #1 schema/body** (P3-2): Match threshold detail
13. **Add platform-age-vs-company-age warning** (P3-3): Strengthen fraud detection

---

## Pre-Commit Verification Checklist

- [x] H1 contains B2B signal word (Fabrikprüfung, Audit, Unternehmen -- 3 signals)
- [x] >=2 H2s contain B2B signal words (10/14 do)
- [x] HowTo Schema present (10 steps)
- [x] Image alt text contains B2B keywords (6 images, all with descriptive alt)
- [ ] **dateModified needs update** -- Currently 2026-07-26; if fixing today, update to 2026-08-02
- [ ] **wordCount needs verification** -- Count rendered words, update schema if differs >100 from 5696
- [x] >=2 external authority links (16+ present)
- [x] >=3 internal links to product/service/blog pages (12+ present)
- [ ] **FAQ questions use B2B procurement language** (7/8 do, but #5 schema has self-promotion)
- [ ] **AQL levels correct and consistent** (P0-1 -- 4 locations wrong)
- [x] H2s organized by procurement decision chain (Why -> Verify -> How -> Cost -> Comply)
- [x] No H3-inside-H3 violations (clean hierarchy)
- [ ] **Swiss ss -> ß** (P1-1 -- 4 instances)
- [ ] **EN 60950-1 -> EN 62368-1** (P1-3 -- outdated standard)

---

*Audit performed against B2B Blog Quality Audit Standard 2026 (v2026-07-30).*
*Compared with: de-blog-quality-audit-2026-07-14, de-blog-6-dimension-audit-2026-07-14, GEO-CITABILITY-SCORE-fabrikpruefung-checkliste-2026-07-21, page-audit-factory-verification-checklist-2026-08-02 (EN parallel).*
