# Page Audit: DE — powerbank-spezifikationen

**Audit Date:** 2026-08-02
**Article:** `C:\Users\wowoh\wowohcool.com\src\de\blog\powerbank-spezifikationen\index.njk`
**URL:** `https://www.wowohcool.com/de/blog/powerbank-spezifikationen/`
**Author:** Snowy May
**Last Modified (frontmatter):** 2026-07-25
**Context:** Cross-reference audit against EN article audit (84.8 composite) + GEO Citability Score (83/100) + Research Brief (2026-07-04). EN article resolved most P0 issues; this audit checks DE parity.

---

## 1. Scores Table — Gate-by-Gate

| # | Gate | Score | Weight | Status |
|---|------|-------|--------|--------|
| 1 | Anti-Repetition | 88 | /100 | DE version has less redundancy than EN. Key Takeaway bullets don't duplicate FAQ content verbatim |
| 2 | Information Gain | 78 | /100 | Strong factory data density (GB 47372-2026, BattDG, Semi-Solid-State cycles). Missing `<cite>`/`<data>` semantic tags reduces AI extraction weight |
| 3 | Scannability (Structure) | 85 | /100 | H1 61 chars (in-range). 7/12 H2s have explicit B2B signal words (58%). H3s are specific and descriptive |
| 4 | Visual Authenticity | 100 | /100 | All real factory/product/lab images. Alt text contains B2B keywords. No stock photos |
| 5 | CTA Relevance | 90 | /100 | Bottom CTA: strong B2B language (Angebot erhalten). Mid-article CTA: "Powerbank-Projekt geplant?" with OEM context. Good |
| 6 | Schema Compliance | 75 | /100 | Full 7-node JSON-LD present. Issues: dateModified mismatch (frontmatter vs schema), wordCount needs verification, timeRequired inconsistency, no `<cite>`/`<data>` body tags |
| 7 | FAQ Language | 92 | /100 | All 6 questions use B2B procurement language (OEM, Importeur, Eigenmarke). Strong |
| 8 | Author E-E-A-T | 95 | /100 | Full byline: job title, 10+ years, LinkedIn + Xing, specific expertise, factory footprint 4-stat grid |
| **Composite** | | **87.9** | /100 | Good. P0 fixes required (minor: 1 structural bug + 1 data inconsistency) |

---

## 2. Issues by Priority

### P0 — Critical (block publish)

#### P0-1: Umlaut Bug — "Haufig" Missing Diaeresis

**Location:** Line 565

```html
<h2 class="text-2xl font-black text-brandBlue uppercase italic mb-8 text-center">Haufig gestellte Fragen (FAQ)</h2>
```

**Issue:** "Haufig" is missing the umlaut. Correct German spelling is "Häufig" (with a-umlaut). The same word is correctly spelled "Häufig" in the Table of Contents at line 405, confirming this is a typo in the FAQ heading.

This affects:
- Visual quality for German readers (noticeable spelling error in a prominent H2 heading)
- AI citability for German-language queries ("häufig gestellte fragen" is a high-volume search pattern)
- Schema FAQPage crawl — the `speakable` cssSelector on `.faq-answer` doesn't directly include this H2, but it's the FAQ section header visible to screen readers and AI crawlers

**Recommended Fix:**
```html
<h2 class="text-2xl font-black text-brandBlue uppercase italic mb-8 text-center">Häufig gestellte Fragen (FAQ)</h2>
```

---

#### P0-2: dateModified Mismatch — Frontmatter vs Schema

**Location:** Frontmatter line 5 + Schema line 134

| Source | Value |
|--------|-------|
| Frontmatter `modified` | `2026-07-25` |
| Schema `dateModified` | `2026-07-21` |

**Issue:** The Schema `dateModified` (July 21) is 4 days older than the frontmatter `modified` (July 25). This creates a structured-data quality signal mismatch. Search engines may flag inconsistent date signals as low-quality metadata.

Additionally, both dates are stale — the article was last substantially edited on July 25, but the research brief gaps (BattDG, LiFePO4, GB 47372-2026, UFCS, Built-in Cable) were all addressed after July 4, meaning substantial content changes were made. The dates should reflect the last meaningful edit.

**Recommended Fix:** Update both to `2026-08-02`:
- Frontmatter line 5: `modified: 2026-08-02`
- Schema line 134: `"dateModified": "2026-08-02"`

Also update the BlogPosting `headline` schema if the H1 text changes.

---

### P1 — High Priority (fix before next publish cycle)

#### P1-1: No `<cite>` / `<data>` Semantic Tags in Body

**Issue:** Identical to EN article P1-3. The article body has zero instances of `<cite>` or `<data>` HTML semantic tags. AI crawlers (GPTBot, ClaudeBot, PerplexityBot) extract citations from semantic tags with higher priority than plain text.

**Standards/concepts that should be tagged with `<cite>`:**
- IEC 62368-1, IEC 62133-2
- GB 47372-2026
- UN38.3
- PD 3.1, PPS, UFCS 2.0, QC 5.0
- BattDG, BattG, ElektroG
- CE, RoHS, WEEE
- EU-Batterieverordnung 2023/1542

**Measurements that should be tagged with `<data>`:**
- `140W`, `65W`, `100W`, `20W` (power values)
- `10.000 mAh`, `5.000 mAh`, `20.000 mAh`, `27.000 mAh` (capacity)
- `3,7V`, `5V` (voltage)
- `99,9 Wh`, `37 Wh`, `74 Wh` (energy)
- `500 Stück`, `1.000 Stück` (MOQ)

**Approach:** This is a non-breaking structural enhancement. Tag the first occurrence of each standard/measurement in each major section. Do not tag every occurrence — one per section context is sufficient.

**Estimated GEO citability gain:** 3-5 points.

---

#### P1-2: timeRequired Mismatch — Schema vs Display

| Source | Value |
|--------|-------|
| Schema `timeRequired` | `"PT9M"` |
| Body display | `10 min Lesezeit` |

**Issue:** Schema claims 9 minutes, page display says 10 minutes. Minor but detectable structured-data inconsistency. Search engines may penalize conflicting metadata.

**Recommended Fix:** Align both to the same value. The 2974-word body at ~238 words/minute (German reading speed) = ~12.5 minutes. Recommend updating both:
- Schema: `"timeRequired": "PT10M"`
- (Body display already says 10 min — keep)

Or recalculate: 2974 words / 250 wpm = ~12 min → update both to PT12M / "12 min Lesezeit".

---

### P2 — Medium Priority (improvement, not blocking)

#### P2-1: wordCount Precision

**Current (Schema):** `"wordCount": 3000`
**Measured body words (excluding tags/schema/frontmatter):** 2974

**Verdict:** 3000 is reasonably accurate (0.87% variance). Acceptable as-is. However, the CTA `{% include "partials/blog-cta.njk" %}` adds rendered text not counted in the source extraction, so the true rendered word count is likely 3100-3300. No action required unless precise verification is desired.

---

#### P2-2: FAQ H2 Heading — Missing Capitalization Consistency

**Location:** Line 565

The FAQ section H2 reads "Haufig gestellte Fragen (FAQ)" — aside from the umlaut bug, the casing is inconsistent with the TOC entry at line 405 which reads "13. Häufig gestellte Fragen (FAQ)". This is a secondary issue (trivially fixed when P0-1 is addressed).

---

### Checks That Passed (no action needed)

| Check | Result | Detail |
|-------|:------:|--------|
| H1 length (50-65 chars) | 61 chars | "Powerbank Spezifikationen: Technische Referenz für Importeure" — within range |
| H1 B2B signal word | "Importeure" | Explicit B2B audience label |
| Quick Answer anti-pattern | Not present | No "Quick answer" / "Schnellantwort" / "RESPUESTA RAPIDA" block found |
| Isolated div (orphan `</div>`) | 44 open / 44 close | All div tags are balanced — no structural defect |
| `.speakable` on Key Takeaways TL;DR | Present | Line 380: `class="text-slate-700 leading-relaxed text-sm mb-4 speakable"` |
| `.speakable` on Hook | Present | Line 362: `class="bg-brandBlue/5 border-l-4 border-brandOrange p-6 rounded-r-xl mb-0 mt-8 speakable"` |
| FAQ count (5-8 required) | 6 | Both Schema and body have 6 Q&A pairs |
| HowTo steps (3+ required) | 4 | Kapazität bestimmen, Ladeleistung wählen, Akkutyp auswählen, Zertifizierung prüfen |
| H2 B2B signal density (2+ required) | 7/12 (58%) | OEM, Importeure, Import appear across 7 H2s |
| Internal links (3+ required) | 8+ | produkt/powerbank, semi-solid-state, zertifizierungen, oem-odm, versand-logistik, eigenmarke, hersteller, kontakt |
| External authoritative links (2+ required) | 2 | Fortune Business Insights, IMTEST (both with rel="noopener noreferrer") |
| Image alt text with B2B keywords | All pass | All 7 images have descriptive alt text with OEM/Importeur keywords |
| Schema nodes (7 required) | 7 | Organization, WebSite, BreadcrumbList, BlogPosting, Person, HowTo, FAQPage |
| SpeakableSpecification | Present | cssSelector: ["h1", ".speakable"] |
| Author LinkedIn + Xing | Both present | LinkedIn + Xing profile URLs in Person schema |
| `, ` bullet formatting bug (EN P2-4) | Not present | All `<li>` items are clean |
| datePublished consistency | Pass | Frontmatter `date: 2026-04-13` matches Schema `datePublished: 2026-04-13` |
| articleSection consistency | Pass | Frontmatter `Powerbank & Eigenmarke` matches Schema `Powerbank & Eigenmarke` |

---

## 3. Data Consistency Check

### Factory-Owned Parameters (Tier 1 — must be globally identical)

| Parameter | DE Article Value | Factory Data Canonical | Match? |
|-----------|:----------------:|:----------------------:|:------:|
| MOQ (full OEM) | 500 Stück | 500 | ✅ |
| Lead time (OEM) | 25-30 Tage | 25-30 days | ✅ |
| Factory size | 5.000 m² (author bio) | 5,000 m² | ✅ |
| Factory established | Since 2013 (author bio) | 2013 | ✅ |
| R&D engineers | 50+ (author bio) | 50+ | ✅ |
| Export countries | 50+ (author bio) | 50+ | ✅ |
| ISO certification | ISO 9001 | ISO 9001 | ✅ |
| Monthly capacity | 1.000.000+ Einheiten | 1,000,000+ | ✅ |
| Li-Po cycle life | 300-500 (Section 4) | 500+ cycles | ⚠️ Same as EN — see below |
| Semi-Solid-State cycles | 500+ | 500+ | ✅ |
| LiFePO4 cycles | 3.000+ | — | ✅ |
| QC stages | 4-stage (IQC/IPQC/FQC/OQC) | 4-stage | ✅ |
| Aging test | 4-Stunden 100% | 4-hour 100% | ✅ |

### Li-Po Cycle Life Inconsistency (P2)

The DE article mirrors the EN article's Li-Po cycle life inconsistency:

| Location | Value |
|----------|-------|
| Section 4 (line 446) | 300–500 Ladezyklen |
| Key Takeaways (line 382) | implied 500+ (implied by Premium positioning context) |
| Expert Insight (line 459) | "Grade-A Zellen ... 500+ Zyklen" |

The `300-500` in Section 4 is the conservative/generic range, while `500+` in the Expert Insight is the Grade-A cell guarantee. This is **the same pattern as the EN article** (P1 data consistency issue in EN audit Section 3). The distinction is meaningful (generic vs Grade-A), but the framing could be clearer.

**Recommendation:** Add a qualifier in Section 4: "Li-Po: 300-500 Zyklen bei Standard-Zellen, 500+ bei Grade-A Zellen von CATL/BYD."

---

## 4. Comparison with EN Article (power-bank-specs-guide)

| Metric | EN (2026-08-02) | DE (2026-08-02) | Notes |
|--------|:---------------:|:---------------:|-------|
| Composite Score | 84.8 | 87.9 | DE scores higher due to fewer structural issues |
| H1 length | 67 (over limit) | 61 (in range) | DE wins |
| Quick Answer anti-pattern | Present (P0-2) | Not present | DE wins |
| `.speakable` on Key Takeaways | Missing (P0-3) | Present | DE wins — already fixed |
| dateModified | Stale | Stale + mismatched | Both need update |
| Umlaut bug | N/A (EN) | "Haufig" (P0-1) | DE-specific issue |
| `<cite>`/`<data>` tags | Missing (P1-3) | Missing (P1-1) | Same gap |
| `, ` `<li>` bug | Present (P2-4) | Not present | DE wins |
| FAQ B2B language | 78/100 | 92/100 | DE stronger |
| Author E-E-A-T | 95/100 | 95/100 | Equivalent |
| Li-Po cycle life inconsistency | Present | Present | Same issue |

**Key takeaway:** The DE article is structurally stronger than EN. It avoided the Quick Answer anti-pattern, the speakable gap, and the `, ` bullet bug. The only DE-specific regression is the "Haufig" umlaut typo.

---

## 5. Research Brief Gap Coverage (2026-07-04)

All 7 critical/important gaps from the research brief have been addressed:

| Gap | Status | Location |
|-----|:------:|----------|
| Nennkapazität vs Nennleistung | Addressed | H3 at lines 432-435 |
| BattDG 2025/2026 | Addressed | H3 "Deutsche Marktpflichten" at lines 472-480 |
| EU-Batterieverordnung 2023/1542 | Addressed | H3 at lines 486-487 |
| LiFePO4 battery technology | Addressed | Section 4 at line 447 |
| GB 47372-2026 | Addressed | Section 2 H3 + Section 10 at line 539 |
| UFCS 2.0 | Addressed | Section 10 at line 540 |
| Built-in Cable trend | Addressed | Section 10 at line 537 |
| FAQ from 3 to 6 | Addressed | 6 questions in Schema + body |
| Internal links added | Addressed | semi-solid-state, zertifizierungen, versand all linked |
| Meta Description updated | Addressed | Now 158 chars with BattG/BattDG/UN38.3 keywords |

---

## 6. Recommended Fixes — Exact Text

### Fix 1: Umlaut Bug (P0-1)

**Line 565, replace:**
```html
<h2 class="text-2xl font-black text-brandBlue uppercase italic mb-8 text-center">Haufig gestellte Fragen (FAQ)</h2>
```
**With:**
```html
<h2 class="text-2xl font-black text-brandBlue uppercase italic mb-8 text-center">Häufig gestellte Fragen (FAQ)</h2>
```

### Fix 2: Update dateModified (P0-2)

**Frontmatter line 5:**
```
modified: 2026-07-25  →  modified: 2026-08-02
```

**Schema line 134:**
```
"dateModified": "2026-07-21"  →  "dateModified": "2026-08-02"
```

### Fix 3: Align timeRequired (P1-2)

**Schema line 141:**
```
"timeRequired": "PT9M"  →  "timeRequired": "PT10M"
```
(Aligns with body display "10 min Lesezeit")

---

## 7. Summary

| Category | Count |
|----------|:-----:|
| P0 Critical | 2 |
| P1 High | 2 |
| P2 Medium | 2 |
| **Total Issues** | **6** |

**Estimated fix time:** 10-15 minutes for all P0 + P1 items (trivial edits).

**Strongest aspects:**
- FAQ section: All 6 questions use OEM/Importeur B2B procurement language, answers are data-dense with specific regulatory references and cost figures
- Research brief execution: All 7 content gaps addressed fully
- Author E-E-A-T: Full byline with factory footprint, bilingual professional profiles (LinkedIn + Xing for DACH market)
- Structure: No Quick Answer anti-pattern, `.speakable` correctly placed, div tags balanced

**Weakest aspects:**
- "Haufig" umlaut typo in FAQ H2 (P0-1, high-visibility location)
- dateModified mismatch between frontmatter and schema (P0-2)
- No `<cite>`/`<data>` semantic tags (shared gap with EN)

**Overall verdict:** The DE article is in stronger shape than the EN counterpart (87.9 vs 84.8 composite). The two P0 issues are trivial single-character/line fixes. After applying P0 + P1 fixes, this article should reach B2B 90+ on automated audit.

---

*Audit generated by SEOMACHINE page-level audit, 2026-08-02. Against B2B Blog Quality Audit Standard 2026. Cross-referenced with EN article audit (page-audit-power-bank-specs-guide-2026-08-02.md), GEO Citability Score (83/100, 2026-07-21), and Research Brief (brief-de-powerbank-spezifikationen-2026-07-04.md).*
