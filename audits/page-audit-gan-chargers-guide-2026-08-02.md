# Page Audit: gan-chargers-guide

**Audit Date:** 2026-08-02
**Article:** `gan-chargers-guide`
**URL:** https://www.wowohcool.com/blog/gan-chargers-guide/
**Source File:** `C:\Users\wowoh\wowohcool.com\src\blog\gan-chargers-guide\index.njk`
**Auditor:** B2B Quality Gates (v3) + Manual Deep Read
**Previous Audits Referenced:** B2B-MASTER-SUMMARY-2026-07-23, GEO-CITABILITY-SCORE-2026-07-20, b2b-blog-quality-standards-audit-2026-07-13, b2b-audit-gan-chargers-guide-2026-07-23

---

## Scores Table

| Dimension | 2026-07-23 (Prev) | 2026-08-02 (Current) | Delta | Notes |
|-----------|:-----------------:|:--------------------:|:-----:|-------|
| B2B Content Quality | 96.8 / 88.1* | **93** / 100 | -- | *Master Summary vs individual auditor scores differed |
| Information Gain | 68 | **70** / 100 | +2 | Factory data density remains strong; GaN V thermal data is unique |
| Schema Markup Quality | 85 | **90** / 100 | +5 | Full schema coverage; 2 minor data inconsistencies found |
| Visual Authenticity | 88 | **95** / 100 | +7 | Real factory photos, B2B alt text, no stock images |
| H1-H4 Structure | 82 | **88** / 100 | +6 | 12/14 H2 has B2B signal; 1 heading hierarchy issue remains |
| CTA Relevance | N/A | **95** / 100 | -- | Strong technical CTAs with spec-sheet and OEM quote options |
| E-E-A-T Signals | 76 | **85** / 100 | +9 | Expert quote present (Dr. Alex Lidow); real factory data |
| Data Consistency | N/A | **88** / 100 | -- | Cross-reference pricing is consistent; 2 schema-to-display mismatches |
| **Composite** | **82.4** | **88** / 100 | **+5.6** | Top-5 performer status confirmed; minor polish needed |

> *Note: The 2026-07-23 B2B Master Summary reported B2B 96.8 while the individual auditor reported 88.1. This discrepancy stems from different scoring methodologies (the master summary used a later composite model). The 2026-08-02 manual audit aligns closer to the master summary's assessment of this article as a strong performer.*

---

## Issues by Priority

### P1 -- High Priority (fix within 1 week)

#### 1. Heading Hierarchy: H3 -> h4 skip in Section 11 (Sourcing)

**Location:** Section 11 (`#sourcing`), lines 907-961

**Problem:** The section structure is:
```
H2: "11. Sourcing GaN Chargers from China: Factory Selection & Verification"
  H3: "Manufacturing Ecosystem"
  h4: "Quality Certification Requirements"
  h4: "Working with Factories"
  h4: "GaN Chip Sourcing"
  h4: "Gallium Supply Chain Risk & Mitigation"
  h4: "E-Marked Cable Pairing for PD 3.1"
  h4: "Pro Tip"
```

The h4 items after "Manufacturing Ecosystem" are **peer topics**, not sub-sections of "Manufacturing Ecosystem". This creates an H3 -> h4 skip (skipping an intermediate heading level) which breaks semantic HTML structure.

**Fix:** Change all 6 h4 tags in this section to h3 tags. The "Manufacturing Ecosystem" H3 should be the first peer, not a parent:
```html
<h3>Manufacturing Ecosystem</h3>
<h3>Quality Certification Requirements</h3>
<h3>Working with Factories</h3>
<h3>GaN Chip Sourcing</h3>
<h3>Gallium Supply Chain Risk & Mitigation</h3>
<h3>E-Marked Cable Pairing for PD 3.1</h3>
<h3>Pro Tip</h3>
```

**Impact:** Structural SEO penalty; screen reader navigation broken; Google may misinterpret content hierarchy. Also flagged in 2026-07-23 audit (Heading Hierarchy score: 0/100).

---

#### 2. Schema timeRequired / Display read-time Mismatch

**Location:** Schema line 149 vs article body line 384

**Problem:**
- Schema `BlogPosting.timeRequired`: `"PT13M"` (13 minutes)
- Article display meta: `"9 min read"` (line 384)

This is a data inconsistency -- the structured data tells search engines 13 minutes, but the visible page tells users 9 minutes.

**Fix:** Align both values. The article is approximately 4,700 words. At 200-250 wpm reading speed, this is 19-24 minutes of reading. At 500 wpm (skimming), this is ~9 minutes. For technical B2B content:
- Either set Schema `timeRequired` to `"PT9M"` (match display)
- Or set both to a realistic value for a procurement audience (PT15M-PT20M)

**Recommendation:** Set both to `"PT13M"` -- realistic for technical content. Update the display on line 384 from `9 min read` to `13 min read`.

---

### P2 -- Medium Priority (fix within 2 weeks)

#### 3. H2 B2B Signal Gaps: 2 of 14 H2s lack B2B procurement language

**Location:** H2 #1 and H2 #10

**Current:**
| H2 | Current Text | Issue |
|----|-------------|-------|
| #1 | "GaN Semiconductor Technology: How It Works" | Zero B2B signal -- reads like consumer educational content |
| #10 | "GaN Sustainability Impact: Energy Efficiency & Carbon Footprint Data" | Zero B2B signal -- environmental angle without procurement tie-in |

**Fix:**
| H2 | Suggested Text |
|----|---------------|
| #1 | "GaN Semiconductor Technology: What B2B Buyers Must Verify in Chip Sourcing" |
| #10 | "GaN Sustainability ROI: Energy Efficiency & Carbon Data for OEM Procurement RFPs" |

Both suggestions add B2B procurement framing while preserving the existing content underneath.

**Impact:** Current 12/14 H2s have B2B signals (86%). This meets the >=2 minimum requirement handily. However, these 2 consumer-leaning H2s dilute the article's B2B authority signal. Fixing them would achieve 14/14 (100%).

---

#### 4. Author Bio -- Expertise Mismatch

**Location:** Author bio section, line 1130

**Problem:** The author bio describes Nina Nico as "Supply Chain Expert . Wireless Charging Specialist" -- but this is a **GaN charger** article, not a wireless charging article. The Person Schema correctly lists "GaN Chargers" in `knowsAbout`, but the visible bio text is misaligned.

**Fix:** Change line 1130 from:
```
Supply Chain Expert · Wireless Charging Specialist
```
to:
```
Supply Chain Expert · GaN Charger Specialist
```

---

### P3 -- Low Priority (fix within 1 month)

#### 5. wordCount Accuracy Verification

**Location:** Schema line 148: `"wordCount": 4700`

**Assessment:** The article body text (excluding HTML/Nunjucks markup, Schema JSON, and template includes) is approximately 4,500-5,000 words. The declared 4,700 is plausible but has not been verified with a word count tool since the last content update.

**Fix:** Run a word count on just the article body prose (including FAQ section, excluding Schema block, navigation, footer, and Nunjucks directives). Update the Schema value to the actual count.

**Verification command:**
```bash
# Strip Nunjucks/HTML, count words in article body
python3 -c "
import re
with open('C:/Users/wowoh/wowohcool.com/src/blog/gan-chargers-guide/index.njk', 'r') as f:
    text = f.read()
# Rough heuristic: extract content between article tags, strip HTML, count
body = re.search(r'{% block content %}(.*?){% endblock %}', text, re.DOTALL)
if body:
    clean = re.sub(r'<[^>]+>', ' ', body.group(1))
    clean = re.sub(r'\{[%{#].*?[%}#]\}', ' ', clean)
    words = len(clean.split())
    print(f'Estimated body word count: {words}')
"
```

---

#### 6. Intro Paragraph Density Before TOC

**Location:** Lines 389-447

**Assessment:** The article has a hook paragraph (lines 390-391), followed immediately by a second paragraph of market data (line 391), then the Key Takeaways block (lines 438-447), and then the TOC (lines 450-468). The 2026-07-23 auditor flagged "4 paragraphs before TL;DR/TOC."

**Current state:** Improved from the July audit -- the hook is tight with 2 paragraphs + Key Takeaways box before TOC. This is acceptable by 2026-08 standards. No action required but monitor: if future edits add more intro text, move it into the body.

---

#### 7. dateModified Stale

**Location:** Frontmatter line 5: `modified: 2026-07-24`; Schema line 147: `"dateModified": "2026-07-24"`

**Assessment:** Both values match (good). However, if any content fixes from this audit are applied, the date must be updated to 2026-08-02.

---

## Data Consistency Check

### FOB Pricing Cross-Reference

| Source | Wattage | Volume | Price | Consistency |
|--------|---------|--------|-------|:-----------:|
| Key Takeaways (line 443) | 30W | 1,000 | $3.20-4.50 | -- |
| Key Takeaways | 65W | 1,000 | $5.40-7.20 | -- |
| Key Takeaways | 100W | 1,000 | $7.50-10.00 | -- |
| Key Takeaways | 140W | 1,000 | $14.00-18.00 | -- |
| Section 4 (line 611) | 30W | 1,000 | $3.20-4.50 | MATCH |
| Section 4 (line 615) | 65W | 1,000 | $5.40-7.20 | MATCH |
| Section 4 (line 619) | 100W | 1,000 | $7.50-10.00 | MATCH |
| Section 4 (line 619) | 140W | 1,000 | $14.00-18.00 | MATCH |
| FAQ Q3 (line 293) | 45-65W | 5,000 | $4.80-6.50 | Different volume tier -- OK |
| FAQ Q3 (line 293) | 100W | 5,000 | $7.00-9.50 | Different volume tier -- OK |
| FAQ Q5 (line 309) | 65W | 1,000 | $5.40-7.20 | MATCH |
| FAQ Q5 (line 309) | 100W | 1,000 | $7.50-10.00 | MATCH |

**Result: PASS** -- All FOB pricing is internally consistent. Pricing varies correctly by volume tier (1,000 vs 5,000 pcs).

### Efficiency Data Cross-Reference

| Source | GaN Efficiency | Silicon Efficiency | Consistency |
|--------|:------------:|:-----------------:|:-----------:|
| Key Metrics Cards (line 425) | 95%+ | -- | -- |
| Section 2 Quick Answer (line 489) | 95%+ | 85% | -- |
| Section 3 table (line 567) | 95%+ | 85% | MATCH |
| Section 5 (line 648) | 95% | 85% | MATCH |
| Section 8 table (line 768) | 93-99% | -- | -- |
| FAQ Q1 (line 277) | 93-95% (GaN III) | -- | -- |
| Factory Stat (line 1075) | -- | -- | No efficiency % repeated here |

**Result: PASS** -- Ranges (93-95% for GaN III, 95%+ for GaN V, up to 99% for peak) are consistent and properly scoped by generation.

### Thermal Data Cross-Reference

| Source | GaN Temp | Silicon Temp | Conditions | Consistency |
|--------|:--------:|:-----------:|------------|:-----------:|
| FAQ Q1 (line 277) | 58.3degC | 82.7degC | 100% load, 25degC ambient | -- |
| Section 2 (line 510) | 52degC | 77degC | 65W full load | Different wattage and ambient -- OK |
| Key Metrics (line 420) | "30degC Cooler" | -- | Under Full Load | Directionally consistent with 82.7-58.3=24.4degC |

**Result: PASS** -- Thermal figures reference different test conditions (100% load at 25degC vs 65W full load), making the 58.3 vs 52 discrepancy explainable. The "30degC cooler" headline figure is a rounded approximation.

### Field Failure Rate

| Source | GaN Rate | Silicon Rate | Consistency |
|--------|:--------:|:----------:|:-----------:|
| Section 2 (line 510) | <0.3% | ~3.2% | -- |
| FAQ Q4 (line 301) | <0.3% | -- | MATCH |
| FAQ Q5 (line 309) | 0.3% | 3.2% | MATCH |
| FAQ Q6 (line 317) | <0.3% (best-in-class) | -- | MATCH |

**Result: PASS** -- All failure rate figures are consistent.

### Schema-to-Display Mismatches

| Item | Schema Value | Display Value | Status |
|------|-------------|---------------|:------:|
| timeRequired / read time | PT13M | "9 min read" | FAIL |
| wordCount | 4700 | -- (not displayed) | UNVERIFIED |
| dateModified | 2026-07-24 | -- (not displayed) | Needs update if content changes |
| Author name | Nina Nico | Nina Nico | MATCH |
| Author jobTitle | Sales Manager | Supply Chain Expert | Semantic match (both sales/supply roles) |
| Author knowsAbout | GaN Chargers | Wireless Charging Specialist (bio) | MISMATCH (see Issue #4) |

---

## Comparison with 2026-07-23 Audit

### What Was Fixed (or Improved)

1. **Expert Quote Present**: The July 13 audit flagged 75% of all articles missing Expert Quotes. This article now has a Dr. Alex Lidow (EPC CEO) quote (line 529), addressing the Quotation Addition gap (+30% AI visibility per Princeton research).

2. **B2B FAQ Language**: All 8 FAQ questions use procurement/B2B language (MOQ, FOB, OEM, factory audit, chip verification). The July 13 audit flagged many articles for B2C FAQ language; this article avoids that issue entirely.

3. **dateModified Updated**: Changed from the original publish date (2026-04-06) to 2026-07-24, indicating active maintenance.

4. **HowTo Schema Present**: The July 13 audit found only 50% of articles had HowTo schema. This article has a complete 4-step HowTo (lines 210-260).

### What Remains Unfixed

| Issue | 2026-07-23 Status | 2026-08-02 Status |
|-------|-------------------|-------------------|
| Heading Hierarchy (H3->h4 skip) | Flagged (0/100 score) | Still present in Section 11 |
| Intro paragraph density | "4 paragraphs before TOC" flagged | Improved to 2 paragraphs + Key Takeaways; acceptable |
| H3 answer length gaps | 8/60 sections lack optimal length | Not re-measured; likely similar |
| timeRequired inconsistency | Not flagged (new find) | New discovery |

### Score Trajectory

```
2026-07-13 (EN Blog Audit): 67/100  (manual, stricter rubric)
2026-07-20 (GEO Citability):  86/100 (AI citability focus)
2026-07-23 (B2B Master):      96.8 B2B / 68 InfoGain / 82.4 Composite
2026-08-02 (This Audit):      93 B2B / 70 InfoGain / 88 Composite
```

The apparent B2B score drop from 96.8 (master summary) to 93 (this audit) reflects different audit methodologies, not content degradation. The master summary's automated auditor scored more generously on B2B density metrics. This manual audit applies stricter structural checks (heading hierarchy, schema consistency, bio alignment) that the automated tool did not cover.

---

## Recommended Fixes Summary

| # | Priority | Issue | Effort | Impact |
|---|:--------:|-------|:------:|:------:|
| 1 | P1 | Fix heading hierarchy: h4->h3 in Section 11 (6 tags) | 5 min | Structural SEO, accessibility |
| 2 | P1 | Align timeRequired/read-time: PT13M vs "9 min read" | 2 min | Schema validation, user trust |
| 3 | P2 | Add B2B signals to H2 #1 and H2 #10 | 3 min | H2 B2B coverage 86% -> 100% |
| 4 | P2 | Fix author bio: "Wireless Charging" -> "GaN Charger" | 1 min | E-E-A-T consistency |
| 5 | P3 | Verify wordCount with actual body text count | 5 min | Schema accuracy |
| 6 | P3 | Update dateModified to 2026-08-02 after fixes | 1 min | Freshness signal |

**Total effort for all fixes: ~17 minutes**

---

## Quality Gate Verification

### Gate 1: Anti-Repetition -- PASS
- No repeated information within paragraphs detected
- Pricing data appears in multiple sections but each at different granularity/context (Key Takeaways = summary, Section 4 = tiered detail, FAQ = buyer perspective)

### Gate 2: Information Gain -- PASS (70/100)
- **Factory Data**: GaN V temperature 58.3degC vs 82.7degC silicon (100% load, 25degC ambient); field return rate <0.3% across 2M+ units
- **First-Hand Experience**: 4-hour aging test protocol; GaN V switching at 5 MHz+; 94.7% efficiency at 230V/50Hz on Chroma 63600
- **Exclusive Terminology**: thermal potting compound, planar magnetics, EPR cable pairing, counterfeit GaN detection protocol
- **Unique Angle**: GaN generation classification (I through V) not covered by any SERP competitor (per research brief)

### Gate 3: Scannability -- PASS (88/100)
- **H1**: 59 chars, contains "OEM" signal word -- PASS
- **H2 B2B signals**: 12/14 (86%) -- PASS (>=2 minimum), could reach 100%
- **H3 specificity**: Most H3s are question-format or data-driven. Examples: "GaN vs SiC: Technology Choice for Your Product Line" is data-driven; checklist items are actionable
- **H3 answer length**: ~87% sections have adequate direct answers per 2026-07-23 audit. Room for improvement on 8/60 sections
- **Each H2 has >=1 H3**: PASS (verified)

### Gate 4: Visual Authenticity -- PASS (95/100)
- Zero stock photos detected
- 6 real product/factory images with B2B alt text:
  - "GaN chargers bulk-packaged for OEM export shipment with FOB Shenzhen logistics for global B2B buyers"
  - "WOWOHCOOL GaN charger factory production line - automated SMT assembly"
  - "WOP28 35W mini GaN charger with dual USB-C PD ports for OEM/ODM compact fast charging product line"
- Author image has alt text with role: "Nina Nico - OEM Technical Lead at WOWOHCOOL"

### Gate 5: CTA Relevance -- PASS (95/100)
- Bottom CTA: "Get Your GaN Charger Thermal Test Report & OEM Spec Sheet" -- highly specific, B2B appropriate
- Two buttons: "Get GaN OEM Quote" + "View GaN Products" -- logical next steps for procurement
- Standard blog CTA partial (`blog-cta.njk`) also included

### Schema Mandatory Checklist

| Schema Type | Present | Issues |
|-------------|:-------:|--------|
| BlogPosting (headline + description + datePublished + dateModified + wordCount) | YES | timeRequired mismatch; wordCount unverified |
| Person (Author with LinkedIn URL + jobTitle + knowsAbout) | YES | jobTitle "Sales Manager" vs bio "Supply Chain Expert" -- semantic match |
| FAQPage (8 questions with B2B answers) | YES | All 8 questions use B2B procurement language |
| HowTo (4 steps) | YES | Covers sourcing process: wattage -> chip -> certs -> QC |
| BreadcrumbList | YES | 3 levels, correct URLs |
| Organization / ManufacturingBusiness | YES | Full entity with address, sameAs, contactPoint |
| SpeakableSpecification | YES | cssSelector: ["h1", ".speakable"] |
| External authoritative links (>=2) | YES | USB-IF, EU ESPR, Infineon, Navitas, Transphorm, Yole -- all with rel="noopener noreferrer" |
| Internal links to product/service pages (>=3) | YES | /products/gan-charger/, /blog/gan-generations-guide, /blog/gan-v-charger-oem-manufacturing, /service/, /about, /contact/ |

---

## Additional Observations

### Strengths Worth Preserving

1. **GaN Generation Story**: This article is the only known content in the SERP landscape that classifies GaN into generations (I through V) with specific performance characteristics per generation. This is a unique competitive moat per the research brief.

2. **Counterfeit Detection Protocol**: The FAQ answer on verifying genuine vs fake-labeled GaN chips (3-method verification protocol) is unique first-party expertise that no competitor covers. This should be preserved in any rewrite.

3. **Gallium Supply Chain Section**: Lines 935-945 cover China's gallium export restrictions and Innoscience's 8-inch wafer breakthrough -- a geopolitical/ supply-chain risk angle absent from competitor content.

4. **E-Marked Cable Pairing**: The warning about cable pairing (e-marked cables required for PD 3.1 at 240W, lines 947-955) is a practical procurement pitfall that demonstrates deep domain expertise.

5. **Pricing Consistency**: All FOB pricing is internally consistent across sections and properly scoped by volume tier (1,000 vs 5,000 pcs).

### Content Scope Assessment

The article at ~4,700 words exceeds the research brief's target (2,500-4,000 words) and covers 15 distinct sections across the full procurement decision chain. The scope is comprehensive without being bloated. No sections should be removed; the article earns its length through substantive technical content.

### Cross-Article Alignment

Per the research brief, this article is part of a GaN content cluster:
- `gan-chargers-guide` (this article) -- Broad overview + sourcing guide
- `gan-v-charger-oem-manufacturing` -- Deep OEM manufacturing walkthrough (ranked #1 in B2B Master Summary)
- `gan-generations-guide` -- Technology generation deep-dive (ranked #6)
- `gan-vs-silicon-charger-comparison` -- Cost/performance comparison (ranked #15)

Internal links between these articles are present and correctly positioned. No cannibalization detected -- each article serves a distinct search intent.

---

## Conclusion

**gan-chargers-guide remains a top-5 performer** in the EN blog portfolio. Its core strengths -- unique GaN generation taxonomy, counterfeit detection protocol, supply-chain risk analysis, and consistent FOB pricing data -- create a competitive moat that generic "GaN charger guide" articles cannot replicate.

The 6 recommended fixes (all ~17 minutes total) address structural polish issues rather than content quality problems. The heading hierarchy fix (P1, Issue #1) is the only change that meaningfully impacts SEO -- the other 5 are accuracy/alignment improvements.

**Composite Score: 88/100** -- Top-5 status confirmed. No content rewrite needed.

---

*Audit performed against B2B Blog Quality Gates v3 (2026-07-13 standard) + GEO Citability standards + Schema compliance checklist. Cross-referenced with research brief (2026-05-14) and 3 previous audits (2026-07-13, 2026-07-20, 2026-07-23).*
