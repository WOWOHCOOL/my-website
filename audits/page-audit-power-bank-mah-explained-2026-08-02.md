# Page Audit: Power Bank mAh & Capacity: OEM Buyer Spec Verification Guide

**Date**: 2026-08-02 | **Live URL**: https://www.wowohcool.com/blog/power-bank-mah-explained/
**File**: `C:\Users\wowoh\wowohcool.com\src\blog\power-bank-mah-explained\index.njk`
**Auditor**: SEOMACHINE B2B Page Auditor (manual, against `context/b2b-blog-quality-audit-standard.md` v2026-07-30)

---

## Scores

| Gate | Score | Status |
|------|-------|--------|
| Anti-Repetition | 8/10 | Good |
| Information Gain | 19/25 | Strong — transformed from D-grade |
| Scannability | 17/20 | Strong — minor DOM/format issues |
| Visual Authenticity | 10/10 | Excellent — zero stock photos |
| CTA Relevance | 9/10 | Good — B2B value-continuation CTAs |
| Schema Compliance | 11/15 | Good — 2 mismatches to fix |
| Meta + Links | 9/10 | Good — citation count mismatch |
| **TOTAL** | **83/100** | **B (Good)** |

---

## Comparison with Previous Audits

| Audit Date | B2B Score | InfoGain | Composite | Grade |
|------------|:---------:|:--------:|:---------:|:-----:|
| 2026-07-13 (comprehensive) | 35 | 20 | **51** | D |
| 2026-07-20 (GEO citability) | -- | -- | **87** (GEO) | A- |
| 2026-07-23 (B2B master) | 90.4 | 48 | **69.2** | Fair |
| 2026-07-23 (B2B individual) | 94.6 | 52 | -- | -- |
| **2026-08-02 (this audit)** | -- | **19/25** | **83** | **B** |

**Key finding**: The article has been substantially rewritten since the 7/13 audit (which flagged it as the worst-performing article at 51/D). The H2s now carry B2B procurement signals (vs. 0/9 in July 13 audit), factory data tables with named cell models and equipment references have been added, and the structure follows the procurement decision chain. The GEO citability score (87) is strong and aligns with the B2B improvements.

However, the article still has untapped Information Gain potential — specifically the "fake capacity detection" angle recommended in the research brief, and missing semantic HTML tags (`<cite>`, `<data>`, `<time>`) that would boost AI citation probability.

---

## Critical Issues (P0)

### P0-1: timeRequired Mismatch — Schema vs Visible Display
- **Schema**: `"timeRequired": "PT10M"` (10 minutes)
- **Visible display** (line 355): `"6 min read"`
- **Impact**: AI crawlers flag structured-data/visible-content inconsistency. This is a trust signal gap.
- **Fix**: Either update visible "6 min read" to "10 min read" OR change schema to `"PT6M"`. Recommendation: adjust to `PT6M` since 6 min matches the actual reading time for this article (~2,800 body words).

### P0-2: Citation Array Undercount
- **Schema `citation` array**: 3 entries (FAA, IATA, USB-IF)
- **Visible Sources section** (line 770-775): 4 links (adds Battery University)
- **Impact**: AI engines scan the citation array directly for authority signals. Battery University is a high-authority domain that should be in the citation array. Under-reporting wastes GEO opportunities.
- **Fix**: Add Battery University to the schema citation array:
```json
{
  "@type": "CreativeWork",
  "name": "Battery University",
  "url": "https://batteryuniversity.com/"
}
```

---

## High Priority (P1)

### P1-1: Leading Comma Typo in Expert Quote Attribution
- **Line 519**: `<p class="text-sm text-slate-500 mt-2">, Nina Nico, OEM Technical Lead at WOWOHCOOL</p>`
- **Issue**: Leading comma before the name. Reads as a formatting error.
- **Fix**: Replace `, Nina Nico` with `— Nina Nico` (em-dash) or `– Nina Nico` (en-dash).

### P1-2: Missing `<cite>` and `<data>` Semantic Tags
The article references numerous standards and measurements that should use semantic HTML tags for AI crawler parsing:

| Current (plain text) | Should Be |
|---------------------|-----------|
| `IEC 61960-3:2017` | `<cite>IEC 61960-3:2017</cite>` |
| `GB 31241-2022` | `<cite>GB 31241-2022</cite>` |
| `IEC 62133` | `<cite>IEC 62133</cite>` |
| `UN38.3` | `<cite>UN38.3</cite>` |
| `88-92%` (efficiency) | `<data value="90%">88-92%</data>` |
| `6,520mAh` (measured) | `<data value="6520mAh">6,520mAh</data>` |

**Impact**: Per B2B Quality Standard section III.1, every lab test result, certification reference, and precise measurement must use `<cite>` or `<data>` tags. This gives LLMs an AST-level signal that content is authoritative source material.

### P1-3: Missing `<time>` Tags for Temporal GEO Signals
No `<time datetime="...">` elements are used anywhere in the article body. B2B compliance queries heavily weight temporal freshness. Recommended additions:

```html
<p>WOWOHCOOL facility ISO 9001 certified since <time datetime="2013">2013</time>,
re-certified <time datetime="2025-11">November 2025</time>.</p>
```

### P1-4: Missing "Fake Capacity Detection" Section (Research Brief Recommendation)
The research brief (`brief-power-bank-mah-explained-2026-07-08.md` section 6) explicitly identified this as WOWOHCOOL's unique competitive moat:

> "No competitor can credibly write about fake capacity detection because they don't manufacture or test power banks."

Recommended addition:
- 5 red flags for fake mAh claims (impossibly high mAh at low price, no weight specs, no certifications, pocket-size "50,000mAh", seller has no factory address)
- Real mAh-to-weight ratio: ~200mAh per gram
- Link to WOWOHCOOL's 4-hour aging test process as verification method

This section would directly address the #1 consumer complaint on Amazon and add significant Information Gain.

---

## Medium Priority (P2)

### P2-1: H3 Direct Sibling Check — Image Between H3 and Answer Paragraph
**Section 1** (line 406-409): H3 is followed by an `<img>` before the answer `<p>`. This breaks the direct-sibling Featured Snippet eligibility per the standard's DOM Structural Rule.

```html
<!-- Current (broken chain) -->
<h2>1. mAh Fundamentals...</h2>
<p>...</p>          ← answer to H2, OK
<img src="...">     ← breaks the pattern
<p>caption...</p>

<!-- Recommended: move image after the answer paragraph -->
```

This pattern occurs once in section 1. Section 6 (line 636) also has an image between H2 and H3 content, though the `<p>` immediately after the `<img>` does serve as a caption.

### P2-2: wordCount May Be Stale
Schema `wordCount` is 3400 (integer, no quotes — correct format). Article was modified on 2026-07-24. If significant content was added since the last word count update, this may be under-counting. Recommendation: verify with `wc -w` on the body content before next publish.

### P2-3: Author Bio Expertise Mismatch
The author bio calls Nina "Supply Chain Expert · Wireless Charging Specialist" (line 714), but this article is about power bank mAh/capacity verification — not wireless charging. Consider changing to "Supply Chain Expert · Power Bank OEM Specialist" for topic relevance.

### P2-4: Factory Stat Block Could Be More Article-Specific
The WOWOHCOOL FACTORY STAT block (line 658-661) contains good data but overlaps with the standard factory profile. Per the 7/13 audit recommendation: "Every article's factory stat block should contain topic-specific first-hand data." This article partially addresses this with the cell verification data, but the stat block itself still uses the generic "5,000m², Since 2013, 50+ countries, 50+ R&D" format in the Author Bio section.

---

## Data Consistency Check

| Check | Result | Details |
|-------|--------|---------|
| Canonical trailing slash | ✅ Pass | `/blog/power-bank-mah-explained/` — consistent |
| Breadcrumb URLs trailing slash | ✅ Pass | All 3 breadcrumb items end with `/` |
| mainEntityOfPage @id trailing slash | ✅ Pass | Ends with `/` |
| Organization @id format | ✅ Pass | `#organization` (hash fragment, correct) |
| timeRequired vs visible time | ❌ **FAIL** | Schema PT10M, visible "6 min read" |
| citation count vs Sources links | ❌ **FAIL** | Schema 3, visible 4 (missing Battery University) |
| FAQ body ↔ schema wording | ✅ Pass | All 8 questions match between body and JSON-LD |
| FAQ answer quantitative data | ✅ Pass | All 8 answers contain ≥1 specific number |
| FAQ question natural language | ✅ Pass | Questions use natural search language, not artificial B2B phrasing |
| H2 hierarchy (no skipped levels) | ✅ Pass | H1→H2→H3 structure maintained throughout |
| wordCount in schema | ⚠️ Verify | 3400 — reasonable but should be re-measured post-edit |
| dateModified freshness | ✅ Pass | 2026-07-24, within 2 weeks |
| speakable cssSelector | ✅ Pass | BlogPosting: `["h1", ".speakable"]`; FAQPage: `[".faq-answer"]` |
| Person author @id ref | ✅ Pass | `"author": {"@id": "...#nina-nico"}` — reference, not inline |
| Person worksFor @id ref | ✅ Pass | `"worksFor": {"@id": "...#organization"}` — reference |
| Organization address/phone/email | ✅ Pass | Full PostalAddress + telephone + email |
| HowTo schema present | ✅ Pass | 3 steps with HowToStep + HowToDirection |
| Featured image srcset | ⚠️ Missing | No `srcset` attribute on line 367 featured image |
| External links rel attribute | ✅ Pass | All 4 sources links have `rel="noopener noreferrer"` |
| Internal links ≥3 | ✅ Pass | 9+ internal links to product pages and related articles |
| Stock photo detection | ✅ Pass | All images are real factory/lab/product photos |
| "Quick Answer" anti-pattern | ✅ Pass | No RESPUESTA RAPIDA / Quick Answer block detected |
| Hook duplicate detection | ✅ Pass | Hook paragraph content is unique, no repeated data |

---

## Information Gain Deep Dive

### What the Article Does Well (since 7/13 rewrite)

**Named Entities (cell-level)**:
- Samsung SDI INR18650-35E (3,500mAh)
- LG M50T 21700 (5,000mAh)
- ATL Li-Polymer 604068 (5,000mAh)
- Bak 18650 N18650CP (2,600mAh)

**Named Entities (equipment)**:
- TI TPS61088 boost IC
- Silergy SY7066 boost IC
- Chroma 63600 DC load tester
- Chroma 17011 battery test system
- Arbin BT-2000 battery test system

**Standards Referenced**:
- IEC 61960-3:2017 (cell capacity measurement)
- IEC 62133 (cell labeling)
- GB 31241-2022 (cell traceability)
- UN38.3 (transport)
- FAA / IATA regulations
- USB Power Delivery specification

**Unique Factory Data**:
- Cell capacity verification table: 5 brands, measured at 5V/2A output with conversion efficiency and deviation
- WOWOHCOOL sources exclusively from Samsung SDI, LG Energy Solution, ATL
- Batch-level certification + random-sample teardown inspection
- GaN circuits achieve 88-92% measured efficiency on Chroma 63600
- Reject threshold: any cell below 85% of rated usable capacity at 5V output

### What's Still Missing (per research brief + audit standard)

1. **"How to Spot Fake mAh Claims" section** — the #1 competitive moat identified in the research brief (not implemented)
2. **mAh-to-weight ratio** (~200mAh per gram) — practical fraud detection metric (not implemented)
3. **`<cite>` and `<data>` semantic tags** — required for AI crawler parsing (not implemented)
4. **`<time>` tags** — temporal GEO signals for certification/audit dates (not implemented)
5. **Competitor-differentiating angle**: "We actually test mAh in our 4-hour QC aging lab — no content competitor can claim this" (mentioned in research brief, partially implemented in FACTORY STAT but not highlighted as a competitive moat)

---

## Recommended Fixes (Actionable, Ordered by Priority)

### Immediate (this week)

1. **Fix timeRequired** (P0-1): Change schema `PT10M` to `PT6M` to match visible "6 min read"
2. **Fix citation undercount** (P0-2): Add Battery University to schema `citation` array
3. **Fix leading comma** (P1-1): Line 519 — replace `, Nina Nico` with `— Nina Nico`

### This Week

4. **Add `<cite>` tags** (P1-2): Wrap all standards references (IEC 61960-3:2017, GB 31241-2022, IEC 62133, UN38.3) in `<cite>` elements
5. **Add `<data>` tags** (P1-2): Wrap key measurements (88-92% efficiency, 6,520mAh measured, 3.7V nominal) in `<data value="...">` elements
6. **Add `<time>` tags** (P1-3): Add ISO 8601 datetime attributes for factory certification dates
7. **Verify wordCount** (P2-2): Re-count body words and update schema if changed

### Next 2 Weeks

8. **Write "Fake Capacity Detection" section** (P1-4): 5 red flags + mAh-to-weight ratio + link to factory QC process. This is the single highest-impact Information Gain improvement available.
9. **Fix author bio expertise** (P2-3): Change "Wireless Charging Specialist" to "Power Bank OEM Specialist" for topic relevance
10. **Add featured image srcset** (Data Check): Add `srcset="..." sizes="..."` with 800w/1200w/2240w breakpoints to the featured image

### Optional (Next Month)

11. **Restructure H3→p direct sibling** (P2-1): Move the voltage test image in Section 1 after the answer paragraph for Featured Snippet eligibility
12. **Differentiate Factory Stat block**: Add article-specific verification data (e.g., "This month's batch: 10,000mAh cells from LG M50T tested at avg 6,480mAh usable at 5V/2A, 91.0% efficiency, 0 cell failures in 500-cycle test")

---

## Notes on Audit Methodology

This is a **manual deep audit** against the B2B Blog Quality Audit Standard 2026 (v2026-07-30). Scoring differs from the automated `b2b_content_auditor.py` which scored this article at 94.6/100 on B2B Content (2026-07-23). The automated auditor's high B2B score correctly reflects strong heading structure, tables, data density, and no stock photos. This manual audit applies additional checks from the full standard (semantic HTML tags, citation alignment, timeRequired, Information Gain against research brief recommendations) that the automated tool does not yet cover, resulting in the lower composite of 83 vs 94.6.

The **GEO Citability score of 87** (2026-07-20) is well-aligned with this audit's findings — the article's Answer Block Quality (89) and Passage Self-Containment (90) are strengths that the B2B rewrite has preserved while adding procurement depth.

---

*Audit by SEOMACHINE B2B Page Auditor | 2026-08-02*
