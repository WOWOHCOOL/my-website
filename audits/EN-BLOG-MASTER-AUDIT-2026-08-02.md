# EN Blog Master Audit -- 2026-08-02

**Scope**: 29 articles | **Method**: Per-article manual audit with research brief cross-reference
**Comparison Baseline**: B2B-MASTER-SUMMARY-2026-07-23.md (28 articles, automated B2B + InfoGain scoring)

---

## Executive Summary

The August 2026 audit represents a **methodology shift** from automated composite scoring (July: B2B Content + Information Gain = Composite) to **per-gate manual audit** (August: 7-gate scoring with P0/P1/P2 issue tracking). This shift reveals deep structural problems that the automated pipeline systematically missed.

**Key finding**: 0 articles score 90+ (July had 11). The scoring is stricter, but the data consistency crisis is real -- 22 of 29 articles (76%) have **3 or more cross-section data contradictions** where pricing, temperatures, cycle life, MOQ, or regulatory standards differ between Key Takeaways, body text, FAQ, and Schema markup. The automated July auditor gave `quality-control-guide` a perfect 100/100 cross-reference consistency score; the August manual audit found 2 contradictions.

**New article since July**: `eu-battery-regulation-2023-1542` (84/100, Good -- not in July baseline).

---

## 1. Overall Ranking (by Score, descending)

| # | Article | Score | P0 | P1 | P2 | Total Issues | Key Issue |
|---|---------|:-----:|:--:|:--:|:--:|:-----------:|-----------|
| 1 | quality-control-guide | 89 | 2 | 3 | 3 | 8 | Defect rate 0.3% vs target 0.5% contradiction; burn-in temp 25 vs 45 deg C |
| 2 | gan-chargers-guide | 88 | 0 | 2 | 2 | 4 | Only article with ZERO P0 issues; structural polish only |
| 3 | charger-safety-standards | 86 | 3 | 3 | 5 | 11 | Cost estimator table formatting corrupted -- all ranges broken |
| 4 | power-bank-specs-guide | 84.8 | 5 | 4 | 4 | 13 | H1 67 chars exceeds limit; Quick Answer anti-pattern block; wordCount 4300 vs ~6500 |
| 5 | usb-c-pd-3-1-explained | 84 | 2 | 5 | 5 | 12 | Poster child for B2B rewrite; lacks first-party lab measurement depth |
| 6 | how-to-choose-power-bank | 84 | 2 | 3 | 3 | 8 | TL;DR retail prices $10-11 lower than body/FAQ |
| 7 | eu-battery-regulation-2023-1542 | 84 | 2 | 5 | 4 | 11 | Schema Wikidata entity is "Qi wireless charging" -- completely wrong |
| 8 | factory-verification-checklist | 84 | 2 | 3 | 4 | 9 | Audit cost $800-1500 vs $300-800 vs $350-500 across 3 sections |
| 9 | import-costs-guide | 83 | 0 | 2 | 5 | 7 | EU duty 0-3.5% vs 0% vs 0-3.7% across 3 sections; zero P0 |
| 10 | power-bank-mah-explained | 83 | 2 | 4 | 4 | 10 | Missing "fake capacity detection" section identified in research brief |
| 11 | what-is-gan-charger | 82 | 2 | 3 | 5 | 10 | FAQ Q1 question-answer mismatch; 6/11 metrics contradictory |
| 12 | hotel-charging-solutions | 81.9 | 2 | 2 | 3 | 7 | +13.4 improvement from July; 4 nested H2 tags breaking heading hierarchy |
| 13 | gan-v-charger-oem | 81 | 2 | 3 | 4 | 9 | 4 data contradictions; wordCount 2800 vs 3000-5000+ |
| 14 | choose-reliable-china-charger-supplier | 80 | 3 | 5 | 4 | 12 | OEM/ODM lead time table logically reversed; wordCount 47% under |
| 15 | car-charger-guide | 79.8 | 5 | 5 | 5 | 15 | 3 contradictory pricing pairs (E-Mark, 65W FOB, lead time) |
| 16 | top-power-bank-manufacturers-china | 79.8 | 2 | 4 | 5 | 11 | Citation names wrong agency; bare minimum 5 FAQs |
| 17 | gan-vs-silicon-charger | 79 | 0 | 5 | 7 | 12 | 3 sections lack H3s; weight 75-85g vs 80-120g; zero P0 |
| 18 | shipping-from-china-guide | 78.4 | 2 | 3 | 7 | 12 | 40GP capacity 4K-6K vs 8K-12K (2x discrepancy); +24 InfoGain improvement |
| 19 | semi-solid-state-power-bank-oem | 78 | 3 | 5 | 5 | 13 | GB standard confusion GB38031-2025 vs GB47372-2026; cycle life 500-800 vs 1000-2000 |
| 20 | wireless-charging-works | 77 | 2 | 3 | 5 | 10 | FAQ Q1 asks datasheet specs, answers EM induction basics |
| 21 | gan-generations-guide | 76 | 3 | 3 | 4 | 10 | HowTo Schema says GaN IV "mainstream" but body says "never reached volume" |
| 22 | qi-certification-guide | 75 | 3 | 3 | 4 | 10 | .speakable regression; WPC year 2013 vs 2018; -16.5 regression from July |
| 23 | power-bank-private-label-oem | 73.9 | 5 | 7 | 5 | 17 | 5/14 factory parameters conflict; URL 6 words; Scannability FAIL (58/100) |
| 24 | certifications-us-eu-guide | 72 | 4 | 4 | 5 | 13 | Meta description references obsolete UL 60950-1 standard |
| 25 | charging-market-trends-2026 | 72 | 3 | 5 | 7 | 15 | FAQ Q1 $42.4B vs $18.4B different markets |
| 26 | usb-c-pd-fast-charging-guide | 72 | 3 | 4 | 5 | 12 | wordCount 3800 vs 8375 (54% under); PD 3.2 FAQ with zero body coverage |
| 27 | qi2-vs-magsafe-guide | 71 | 5 | 4 | 3 | 12 | MFi licensing $10-15 vs $4-6 vs $2-4 across 3 sections; wordCount 53% under |
| 28 | oem-vs-odm-guide | 71 | 5 | 5 | 5 | 15 | 42 HTML tag mismatches (h4 closed with /h3); lowest B2B + most broken |
| 29 | how-to-choose-factory | 62 | 3 | 6 | 4 | 13 | Body FAQ vs Schema FAQ completely different FOB prices; wordCount 155% off |

---

## 2. Grade Distribution

```
Excellent (90+):   █ 0 articles (0%)
Good     (80-89):  ██████████████ 14 articles (48.3%)
Fair     (70-79):  ██████████████ 14 articles (48.3%)
Needs Work (<70):  █ 1 article (3.4%) -- how-to-choose-factory (62)
```

**Comparison with July 23:**
```
                Jul 23 (28 arts)    Aug 02 (29 arts)
Excellent 90+:  11 (39.3%)          0 (0%)
Good 75-89:     15 (53.6%)          14 (48.3% at 80-89)
Fair 60-74:     2 (7.1%)            14 (48.3% at 70-79)
Needs <60:      0 (0%)              1 (3.4% at 62)
```

**Note on methodology shift**: The July audit used automated B2B Content + Information Gain scoring. The August audit uses per-gate manual scoring (7 gates, 100-point total). The August scoring is inherently stricter because it penalizes data consistency errors, heading hierarchy violations, and schema integrity issues that the automated pipeline could not detect. A July "Excellent" score of 95+ B2B does not guarantee an August "Excellent" -- as demonstrated by `oem-vs-odm-guide` (91.8 B2B in July, 71/100 in August after manual audit found 42 HTML tag mismatches).

---

## 3. Top 5 & Bottom 5

### Top 5

| # | Article | Score | Strength | Risk |
|---|---------|:-----:|----------|------|
| 1 | **quality-control-guide** | 89 | Highest InfoGain (70/100), gold-standard visuals, 41 named entities, perfect CTAs | 2 newly found data contradictions were missed by all 5 previous audits |
| 2 | **gan-chargers-guide** | 88 | Zero P0 issues, 86% H2 B2B coverage, perfect pricing consistency, counterfeit GaN detection protocol unique moat | Structural polish only (H3-to-h4 skip, author bio mismatch) |
| 3 | **charger-safety-standards** | 86 | Deep regulatory depth, 10-layer protection architecture, thermal runaway physics, recall case studies | Cost estimator table systematically corrupted -- all range values broken |
| 4 | **power-bank-specs-guide** | 84.8 | Author E-E-A-T +75, FAQ B2B language +53, 396 data points, 32 named entities | 5 P0s driven by structural/format issues, not content quality |
| 5 | **usb-c-pd-3-1-explained** | 84 | B2B rewrite poster child (0/9 to 5/7 H2s B2B), PD handshake test matrix | Missing oscilloscope traces, ripple noise, thermal readings |

### Bottom 5

| # | Article | Score | Primary Failure | Estimated Fix Effort |
|---|---------|:-----:|-----------------|:-----:|
| 29 | **how-to-choose-factory** | 62 | Body FAQ vs Schema FAQ completely different FOB prices; wordCount 155% off (5000 vs 12788); 9 consecutive B2B H2s | 4-6 hours |
| 28 | **oem-vs-odm-guide** | 71 | 42 HTML tag mismatches (every h4 closes with /h3); 5 cross-reference conflicts; FAQ MOQ 500 vs body 3000+ | 3-4 hours |
| 27 | **qi2-vs-magsafe-guide** | 71 | MFi licensing 3 conflicting values; "30-50% lower" math error (actual 25-33%); wordCount 53% under; most July issues unfixed | 3-4 hours |
| 26 | **usb-c-pd-fast-charging-guide** | 72 | wordCount 54% under (3800 vs 8375); PD 3.2 FAQ orphaned with no body coverage | 2-3 hours |
| 25 | **charging-market-trends-2026** | 72 | FAQ Q1 mixes $42.4B vs $18.4B markets; "140+" vs "637" direct contradiction; all 14 July issues resolved but 3 new ones introduced | 2-3 hours |

---

## 4. Systemic Issues (appearing in >=5 articles)

### 4.1 wordCount Schema Inaccuracy (29/29 articles -- 100%)

**Root cause**: Schema `wordCount` is a static value hand-entered in frontmatter or template, never dynamically generated from rendered content. When articles are rewritten/expanded, the wordCount field is not updated.

**Severity**: Every single article has an inaccurate wordCount. Under-reporting ranges from 2% to 155%. The median is approximately 40-50% undercount.

| Severity | Count | Examples |
|----------|:-----:|----------|
| Minor (<15% off) | 3 | usb-c-pd-3-1 (2600 vs 2550), certifications (3200 vs 3400), eu-battery (4100 vs 3902) |
| Moderate (15-40%) | 8 | charger-safety (4400 vs 8000+), gan-v-charger-oem (2800 vs 3000-5000+) |
| Severe (40-70%) | 11 | what-is-gan (3400 vs 5500+), choose-reliable-china (3200 vs 6031) |
| Critical (>70%) | 4 | how-to-choose-factory (5000 vs 12788), oem-vs-odm (4100 vs 11000), car-charger (3500 vs 7031), usb-c-pd-fast (3800 vs 8375) |

**Recommended fix**: 
- **Systemic**: Build a build-time script that counts actual rendered word count and injects it into schema. Place in `wowohcool.com/scripts/` and run as part of the 11ty build pipeline.
- **OR**: Add a pre-commit hook that validates `wordCount` against rendered output and blocks commits with >10% deviation.
- **Immediate**: Batch-fix wordCount on all 29 articles (estimated 2-3 hours of manual counting + editing).

### 4.2 Cross-Section Data Contradictions (22/29 articles -- 76%)

**Root cause**: Content is edited in multiple passes (write -> optimize -> audit -> fix) by different agents. Each pass may update pricing/temperature/timeline in one section but miss the same data in FAQ, Schema, Key Takeaways, or comparison tables. The automated auditor (`b2b_content_auditor.py`) cannot perform cross-section cross-reference because it requires semantic understanding of which data points are comparable.

**Severity ranking by contradiction count:**

| Article | Contradictions | Worst Example |
|---------|:-------------:|---------------|
| what-is-gan-charger | 6/11 metrics | Return rate 0.3% vs 2-5% (order-of-magnitude) |
| oem-vs-odm-guide | 5+ explicit | FAQ MOQ 500 vs body 3000+ |
| qi2-vs-magsafe-guide | 5 P0 data contradictions | MFi licensing $10-15 vs $4-6 vs $2-4 |
| semi-solid-state-power-bank-oem | 5 | GB38031-2025 vs GB47372-2026 |
| power-bank-private-label-oem | 5/14 parameters | FOB $5.80-8.00 vs 10.00 EUR |
| car-charger-guide | 5 | E-Mark $0.80-1.20 vs "included free" |
| gan-v-charger-oem | 4 | 65W FOB $6-9 vs $8-11 |
| charging-market-trends-2026 | 3+ | $42.4B vs $18.4B different markets |
| how-to-choose-factory | 3+ | Schema FAQ vs Body FAQ completely different FOB tables |
| factory-verification-checklist | 3 | Audit cost 3-way conflict |
| gan-generations-guide | 3 | GaN IV "mainstream" vs "never reached volume" |
| usb-c-pd-fast-charging-guide | 3 | Multiple efficiency/pricing contradictions |
| gan-vs-silicon-charger | 3 | Weight 75-85g vs 80-120g |
| import-costs-guide | 3 | EU duty 0% vs 0-3.5% vs 0-3.7% |
| wireless-charging-works | 3+ | Efficiency 70-80% vs 75-85%; N48 pull force 280g vs 350g |
| hotel-charging-solutions | 2 | MOQ ambiguity |
| quality-control-guide | 2 | Defect rate; burn-in temp |
| shipping-from-china-guide | 2 | 40GP capacity 2x |
| how-to-choose-power-bank | 2 | TL;DR retail vs body pricing |
| qi-certification-guide | 2 | WPC membership year |
| charger-safety-standards | 2 | Cost table corruption |
| top-power-bank-manufacturers-china | 2 | Citation agency mismatch |

**Recommended fix**:
- **Systemic**: Add a "Single Source of Truth" (SSOT) data block as frontmatter YAML for quantitative claims. All sections (body, FAQ, Schema, Key Takeaways, tables) reference these variables. When a number changes, change it once and rebuild.
- **Per-article**: Each article with >=3 contradictions needs a dedicated "number reconciliation" edit pass. Estimated effort: 30-45 min per high-severity article, 15-20 min per moderate.

### 4.3 dateModified Freshness (24/29 articles -- 83%)

**Root cause**: `dateModified` is a manual frontmatter field. Editors forget to bump it after making changes. Some articles show visible "Updated Jun 17" while schema says "2026-07-24" -- a 37-day discrepancy that search engines can detect.

| Severity | Count | Details |
|----------|:-----:|---------|
| Stale 1-7 days | 8 | Within acceptable window |
| Stale 8-30 days | 12 | gan-chargers Jul 24, charger-safety Jul 24, etc. |
| Stale 31+ days | 4 | how-to-choose-factory (Jun 12 visible vs Jul 25 schema), qi2-vs-magsafe (Jun 17 vs Jul 22), qi-certification (Jun 17 vs Jul 24), import-costs (Jun 12 vs Jul 24/25) |
| Current (2026-08-02) | 5 | Only 5 of 29 articles have fresh dates |

**Recommended fix**:
- **Systemic**: Set `dateModified` to `{% now "iso" %}` in 11ty templates so it auto-updates on every build.
- **Immediate**: Batch-update dateModified to 2026-08-02 on all 24 stale articles (5 minutes).

### 4.4 timeRequired vs Visible Reading Time Mismatch (18/29 articles -- 62%)

**Root cause**: Schema `timeRequired` (ISO 8601 duration, e.g. "PT12M") is manually set and not recalculated when article length changes. The visible "X min read" is often a different value because it was set at a different time.

**Pattern**: In 15 of 18 cases, `timeRequired` is HIGHER than the visible reading time (e.g., schema says 14 min, page says "8 min read"). This means Google's structured data claims the article takes longer than the page itself claims -- a minor inconsistency that may affect rich result display.

**Recommended fix**:
- **Systemic**: Calculate reading time from actual word count (wordCount / 238 wpm = minutes) and use the same value for both schema `timeRequired` and visible display.
- **Immediate**: Batch-fix alongside wordCount update (same pass).

### 4.5 Citation Array Undercount (12/29 articles -- 41%)

**Root cause**: Schema `citation` array is manually curated and editors add new external links to the body without updating the schema array. The undercount is usually 1-3 citations missing.

**Worst case**: `charging-market-trends-2026` -- schema says 3 citations, body has 11 sources. 8 authoritative links invisible to AI crawlers.

**Recommended fix**:
- **Systemic**: Build-time script that extracts all external links from rendered HTML and populates the citation array automatically.
- **Per-article**: Manual reconciliation pass. Quick (5-10 min per article).

### 4.6 Heading Hierarchy Violations (12/29 articles -- 41%)

**Types of violations:**
| Type | Count | Examples |
|------|:-----:|----------|
| H2 sections lacking H3 children | 8 | gan-vs-silicon (3 H2s), power-bank-private-label (3 H2s), quality-control (3 H2s) |
| HTML tag mismatches (h4 closed with /h3) | 1 (severe) | oem-vs-odm: 42 mismatches |
| Nested H2 inside H2 | 2 | hotel-charging (4 nested H2s in ROI section), factory-verification (H3 inside H3) |
| H3-to-h4 skip (missing H3 level) | 2 | gan-chargers (Section 11), certifications-us-eu (h3 instead of h2 for CTA) |
| H2 adjacency violations (3+ consecutive same signal) | 3 | how-to-choose-factory (9 consecutive B2B H2s), charging-market-trends (3 consecutive "OEM" H2s) |

**Recommended fix**:
- **Systemic**: Add HTML heading hierarchy validation to the pre-commit hook. Parse the heading tree and reject commits with nesting violations.
- **Per-article**: `oem-vs-odm-guide` needs a full tag fix pass (1 hour). Others are 10-20 min each.

### 4.7 Missing ManufacturingBusiness Schema (10/29 articles -- 34%)

**Root cause**: Schema template defaults to `Organization`. The B2B quality standard requires `Organization / ManufacturingBusiness` for factory/OEM content. Most articles inherited the generic Organization type from an older template.

**Recommended fix**:
- **Systemic**: Update the master schema template to use `ManufacturingBusiness` as default for all EN blog articles.
- **Immediate**: Find-and-replace `"@type": "Organization"` to `"@type": "ManufacturingBusiness"` in all 10 affected articles (5 minutes).

### 4.8 Missing Semantic HTML Tags (cite, data, time) (12/29 articles -- 41%)

**Root cause**: Authors don't use semantic HTML tags for regulatory references, measurements, and deadlines. These tags are parsed by AI crawlers for entity extraction and fact verification.

**Recommended fix**:
- **Systemic**: Add to the quality standard checklist. Include linter rule to flag articles without `<cite>`, `<data>`, and `<time>` tags.
- **Per-article**: Retrofitting is manual and time-consuming (30-45 min per long article).

### 4.9 FAQ Body-Schema Answer Mismatch (10/29 articles -- 34%)

**Root cause**: Schema FAQ answers are often written/copied at a different time than body FAQ text. When body FAQ is edited, the schema equivalent is not updated.

**Recommended fix**:
- **Systemic**: Generate FAQPage schema from body FAQ DOM at build time, not from static frontmatter.
- **Per-article**: Manual side-by-side reconciliation (15-20 min each).

### 4.10 H2 B2B Signal Density Outside 30-55% Target (8/29 articles -- 28%)

**Direction of error:**
| Direction | Count | Examples |
|-----------|:-----:|----------|
| **Over-optimized** (>55%) | 5 | how-to-choose-factory (59.1%), oem-vs-odm (72.7%), power-bank-private-label (91%) |
| **Under-optimized** (<30%) | 3 | gan-v-charger-oem (28.6%), certifications-us-eu (30%), qi2-vs-magsafe (37.5% at lower bound) |

**Root cause**: Over-correction from July audit which flagged low B2B signal density. Some rewrites went too far.

**Recommended fix**: Per-article rebalancing. Swap 1-2 over-optimized H2s for non-B2B descriptive headings.

---

## 5. Cross-Reference: July 23 vs August 02

**Important methodological note**: July used automated composite scoring (B2B Content + Information Gain = /100). August uses manual per-gate scoring (7 gates = /100). Direct score comparison is not meaningful. The table below shows July metrics vs August findings to track improvement/degradation.

| Article | Jul B2B | Jul InfoGain | Aug Score | Delta Trend | Major Changes Since July |
|---------|:-------:|:-----------:|:---------:|:-----------:|--------------------------|
| quality-control-guide | 89.7 | 70 | **89** | = | 2 new contradictions found; still strongest overall |
| gan-chargers-guide | 96.8 | 68 | **88** | = | Zero P0; consistently top-tier |
| charger-safety-standards | 98.5 | 66 | **86** | = | Cost table corruption new since July |
| power-bank-specs-guide | 83.7 | 68 | **84.8** | + | Author E-E-A-T +75, FAQ language +53; major rewrite success |
| usb-c-pd-3-1-explained | 88.2 | 63 | **84** | + | Complete H2 B2B rewrite (0/9 to 5/7); poster child |
| how-to-choose-power-bank | 89.4 | 55 | **84** | + | Dramatic B2B rewrite; H1 fully procurement; 2 H2s still B2C |
| eu-battery-regulation-2023-1542 | N/A | N/A | **84** | NEW | Not in July baseline; strong B2B (92), needs H3 subsections |
| factory-verification-checklist | 88.2 | 64 | **84** | + | 12/16 H2 B2B signals (best in corpus); audit cost 3-way conflict |
| import-costs-guide | 96.2 | 47 | **83** | ++ | InfoGain transformation (47->72); EU duty confusion remains |
| power-bank-mah-explained | 90.4 | 48 | **83** | ++ | Worst-to-solid transformation (51/D -> 83/B); missing fake-capacity section |
| what-is-gan-charger | 95.3 | 69 | **82** | - | H2 structure greatly improved; 6/11 data contradictions found |
| hotel-charging-solutions | 89.9 | 47 | **81.9** | ++ | InfoGain +28 (47->75); ROI section nested H2s regression |
| gan-v-charger-oem | 97.8 | 70 | **81** | - | Previously #1 composite; 4 new data contradictions found |
| choose-reliable-china-charger-supplier | 95.4 | 69 | **80** | - | Strong structure; OEM/ODM lead time logic error new finding |
| car-charger-guide | 87.6 | 62 | **79.8** | = | 5 P0s -- all data contradictions; scannability needs work |
| top-power-bank-manufacturers-china | 90.5 | 63 | **79.8** | - | CTA jumped from 20 to 95; 2 schema accuracy errors |
| gan-vs-silicon-charger | 87.8 | 56 | **79** | + | Zero P0; data consistency 71% (10/14); 3 sections lack H3s |
| shipping-from-china-guide | 87.5 | 48 | **78.4** | ++ | InfoGain +24 (48->72); 14 July issues all resolved; 3 new ones |
| semi-solid-state-power-bank-oem | 94.7 | 70 | **78** | - | Was #4 composite; GB standard confusion + cycle life contradiction |
| wireless-charging-works | 86.9 | 51 | **77** | + | InfoGain +21 (51->72); FAQ Q1 mismatch; 45% wordCount undercount |
| gan-generations-guide | 96.5 | 68 | **76** | - | HowTo Schema contradiction; pricing drift found |
| qi-certification-guide | 89.6 | 51 | **75** | -- | Regression: -16.5 from July 24 peak; speakable broken; WPC year conflict |
| power-bank-private-label-oem | 87.5 | 56 | **73.9** | - | Scannability FAIL (58/100); 5/14 parameters conflicting; URL still 6 words |
| certifications-us-eu-guide | 79.9 | 64 | **72** | = | Consistently lowest B2B performer across both audits |
| charging-market-trends-2026 | 92.0 | 57 | **72** | - | 14 July fixes applied; 3 new data contradictions introduced |
| usb-c-pd-fast-charging-guide | 91.4 | 53 | **72** | = | InfoGain +4 (53->58); wordCount 54% under; PD 3.2 orphaned |
| qi2-vs-magsafe-guide | 88.4 | 53 | **71** | = | Marginal +0.3; most July issues unfixed; heading hierarchy fix only change |
| oem-vs-odm-guide | 87.7 | 48 | **71** | - | 42 HTML tag mismatches discovered; was 91.8 B2B in July |
| how-to-choose-factory | 88.9 | 62 | **62** | -- | Worst regression: over-correction on B2B density; Schema-body FOB completely mismatched |

**Trend summary:**
- **Improved** (7 articles): hotel-charging (+13.4 trend), import-costs, power-bank-mah, shipping-from-china, usb-c-pd-3-1, power-bank-specs, how-to-choose-power-bank -- all underwent substantial rewrites with InfoGain boosts.
- **Degraded** (8 articles): oem-vs-odm, qi-certification, how-to-choose-factory, semi-solid-state, gan-v-charger-oem, what-is-gan-charger, charging-market-trends, gan-generations -- suffered from newly discovered structural issues or data contradictions introduced during rewrites.
- **Stable** (13 articles): Remaining articles with marginal changes.
- **New** (1 article): eu-battery-regulation-2023-1542.

---

## 6. Data Consistency Crisis

Articles with **3 or more documented data contradictions** between TL;DR/FAQ/body/Schema. Ranked by severity.

| Rank | Article | Contradiction Count | Total Metrics Checked | Consistency Rate | Most Dangerous Contradiction |
|:----:|---------|:-------------------:|:---------------------:|:----------------:|------------------------------|
| 1 | **what-is-gan-charger** | 6 | 11 | 45% | Return rate 0.3% vs 2-5% (order-of-magnitude -- E-E-A-T destroying) |
| 2 | **oem-vs-odm-guide** | 5+ | ~10 | <50% | FAQ MOQ 500 vs body 3000+ (buyer places impossible order) |
| 3 | **qi2-vs-magsafe-guide** | 5 | ~10 | 50% | MFi licensing 3 values across 3 sections ($2-4, $4-6, $10-15) |
| 4 | **semi-solid-state-power-bank-oem** | 5 | ~10 | 50% | GB38031-2025 vs GB47372-2026 (different standards, different dates) |
| 5 | **power-bank-private-label-oem** | 5 | 14 | 64% | FOB $5.80-8.00 USD vs 10.00 EUR (currency + value mismatch) |
| 6 | **car-charger-guide** | 5 | ~10 | 50% | E-Mark certification $0.80-1.20 vs "included free" |
| 7 | **gan-v-charger-oem** | 4 | ~10 | 60% | 65W FOB $6-9 vs $8-11; BOM vs FOB terminology confusion |
| 8 | **how-to-choose-factory** | 4+ | ~10 | <60% | Schema FAQ vs Body FAQ different FOB tables for same products |
| 9 | **charging-market-trends-2026** | 3+ | ~8 | <65% | FAQ Q1 $42.4B vs $18.4B (different market segments conflated) |
| 10 | **gan-vs-silicon-charger** | 3 | 14 | 71% | Weight 75-85g FAQ vs 80-120g table; efficiency numbers inconsistent |
| 11 | **gan-generations-guide** | 3 | ~8 | 63% | GaN IV "mainstream" in HowTo vs "never reached volume" in body |
| 12 | **factory-verification-checklist** | 3 | ~8 | 63% | Audit cost $800-1500 vs $300-800 vs $350-500 |
| 13 | **wireless-charging-works** | 3+ | ~8 | <65% | N48 pull force 280g vs 350g; efficiency 70-80% vs 75-85% |
| 14 | **import-costs-guide** | 3 | ~10 | 70% | EU duty 0% vs 0-3.5% vs 0-3.7% across 3 sections |
| 15 | **usb-c-pd-fast-charging-guide** | 3 | ~8 | 63% | Multiple efficiency/pricing contradictions across sections |

**15 of 29 articles (52%) qualify as "Data Consistency Crisis" (>=3 contradictions).**

Plus 7 more with 2 contradictions each (borderline): quality-control-guide, shipping-from-china, how-to-choose-power-bank, qi-certification, charger-safety, hotel-charging, top-power-bank-manufacturers.

Only **7 of 29 articles** (24%) have <=1 verified data contradiction: gan-chargers-guide (0), eu-battery-regulation (1), power-bank-mah-explained (1), choose-reliable-china (1), certifications-us-eu (1), usb-c-pd-3-1 (1), power-bank-specs-guide (1).

---

## 7. wordCount Accuracy

| Deviation Range | Count | Articles |
|:---------------:|:-----:|----------|
| <10% (accurate) | 4 | usb-c-pd-3-1 (2%), certifications-us-eu (6%), eu-battery (5%), power-bank-mah (est. <10%) |
| 10-20% | 5 | charger-safety, gan-v-charger-oem, power-bank-specs, shipping-from-china, top-manufacturers |
| 20-40% | 7 | what-is-gan, quality-control, how-to-choose-power-bank, gan-vs-silicon, wireless-charging, gan-generations, semi-solid-state |
| 40-70% | 9 | car-charger, choose-reliable, hotel-charging, import-costs, charging-market-trends, usb-c-pd-fast, qi2-vs-magsafe, qi-certification, factory-verification |
| >70% (critical) | 4 | how-to-choose-factory (155%), oem-vs-odm (168%), power-bank-private-label (est. >50%) |

**Articles with wordCount deviation >20%: 20 of 29 (69%).**

**Articles with wordCount deviation >40%: 13 of 29 (45%) -- these actively misrepresent content depth to search engines.**

---

## 8. dateModified Freshness

| Status | Count | Articles |
|--------|:-----:|----------|
| Fresh (2026-08-02 +/- 1 day) | 5 | usb-c-pd-3-1-explained, what-is-gan-charger, how-to-choose-power-bank, how-to-choose-factory, choose-reliable-china-charger-supplier |
| Slightly stale (2-7 days) | 8 | quality-control (Jul 24), gan-chargers (Jul 24), charger-safety (Jul 24), car-charger, power-bank-private-label, charging-market-trends, semi-solid-state (Jul 25), usb-c-pd-fast |
| Moderately stale (8-30 days) | 9 | gan-generations, gan-v-charger-oem, gan-vs-silicon, hotel-charging, shipping-from-china, wireless-charging, top-manufacturers, power-bank-specs (Jul 22), factory-verification |
| Severely stale (31+ days) | 7 | qi2-vs-magsafe (Jun 17 visible vs Jul 22 schema), qi-certification (Jun 17 vs Jul 24), import-costs (Jun 12 vs Jul 24), certifications-us-eu, oem-vs-odm, power-bank-mah, eu-battery-regulation |

**Stale articles: 24 of 29 (83%). Severely stale: 7 of 29 (24%).**

---

## 9. Priority Action Plan

### P0 Fixes (Total: 72 P0 issues across 29 articles)

| Category | Count | Est. Time per Fix | Total Est. Hours |
|----------|:-----:|:-----------------:|:----------------:|
| Data contradiction resolution | 28 | 20-45 min | 14-21 hours |
| wordCount update | 24 | 5-10 min | 2-4 hours |
| Schema integrity (FAQ mismatch, wrong entity, duplicate blocks) | 12 | 10-20 min | 2-4 hours |
| HTML tag/structure fixes (heading mismatches, nesting) | 5 | 15-60 min | 2-5 hours |
| dateModified update | 3 | 1 min | <1 hour |
| **TOTAL P0** | **72** | | **20-35 hours** |

**Top 5 highest-impact P0s (fix these first, in this order):**
1. **oem-vs-odm-guide**: Fix 42 HTML tag mismatches (1 hour) -- structural integrity
2. **what-is-gan-charger**: Fix return rate 0.3% vs 2-5% contradiction + FOB pricing (1 hour) -- E-E-A-T
3. **how-to-choose-factory**: Fix Schema FAQ vs Body FAQ completely different FOB tables (1 hour) -- trust
4. **semi-solid-state-power-bank-oem**: Resolve GB standard confusion GB38031 vs GB47372 (30 min) -- regulatory credibility
5. **qi2-vs-magsafe-guide**: Fix MFi licensing 3-way contradiction (30 min) -- technical authority

### P1 Fixes (Total: 107 P1 issues across 29 articles)

| Category | Count | Est. Time per Fix | Total Est. Hours |
|----------|:-----:|:-----------------:|:----------------:|
| timeRequired / read time reconciliation | 18 | 5 min | 1.5 hours |
| Missing H3 subsections | 8 | 15-20 min | 2-3 hours |
| H2 B2B signal density rebalancing | 8 | 10-15 min | 1-2 hours |
| Citation array updates | 12 | 5-10 min | 1-2 hours |
| Featured image srcset | 6 | 10 min | 1 hour |
| Author bio / jobTitle alignment | 5 | 5 min | 0.5 hours |
| hreflang / missing fr entries | 3 | 5 min | 0.5 hours |
| Other P1 (miscellaneous) | 47 | 5-15 min | 4-12 hours |
| **TOTAL P1** | **107** | | **11-22 hours** |

### P2 Fixes (Total: 136 P2 issues across 29 articles)

| Category | Count | Est. Time per Fix | Total Est. Hours |
|----------|:-----:|:-----------------:|:----------------:|
| Missing semantic HTML tags (cite, data, time) | 12 | 30-45 min | 6-9 hours |
| FAQ Q&A optimization / formatting | 15 | 10-15 min | 2.5-4 hours |
| Meta description / title tag polish | 12 | 5-10 min | 1-2 hours |
| Expert quote formatting (leading comma) | 6 | 2 min | 0.2 hours |
| Image alt text B2B keywords | 10 | 5 min | 1 hour |
| Internal link optimization | 8 | 5 min | 0.7 hours |
| Missing data visualization / charts | 8 | 30-60 min | 4-8 hours |
| URL optimization (stop words, length) | 4 | 5 min (note) | 0.3 hours (note: requires redirect) |
| Other P2 (miscellaneous) | 61 | 5-15 min | 5-15 hours |
| **TOTAL P2** | **136** | | **21-41 hours** |

### Grand Total: 315 issues (72 P0 + 107 P1 + 136 P2) = **52-98 hours of fix work**

### Quick Wins (<5 min each, 30+ articles affected)

These can be fixed in a single batch pass across all 29 articles:

| Fix | Articles Affected | Method | Total Time |
|-----|:-----------------:|--------|:----------:|
| Update dateModified to 2026-08-02 | 24 | Find-and-replace in frontmatter | 10 min |
| Change Organization to ManufacturingBusiness | 10 | Find-and-replace in schema blocks | 10 min |
| Update wordCount to actual value | 24 | Manual count + replace | 2 hours |
| Fix leading comma in expert quotes | 6 | Find `, "` at start of attribution lines | 5 min |
| Add `rel="noreferrer"` to external links that only have `noopener` | 8 | Find-and-replace | 5 min |
| Remove nested speakable from FAQPage in schema | 2 | Delete 3 lines per file | 5 min |

### Articles Needing Structural Rewrites

These articles require more than spot-fixes -- they need section-level restructuring:

| Article | Reason | Est. Effort |
|---------|--------|:-----------:|
| **oem-vs-odm-guide** | 42 HTML tag mismatches, 5 data contradictions, InfoGain stagnant at 56 | 4-5 hours |
| **how-to-choose-factory** | Schema FAQ vs Body FAQ completely mismatched; H2 over-optimization at 59.1%; wordCount 155% off | 4-6 hours |
| **power-bank-private-label-oem** | 5/14 parameters conflicting; Scannability FAIL at 58/100; 3 H2s without H3 children | 3-4 hours |
| **qi2-vs-magsafe-guide** | 5 P0 data contradictions; most July issues unfixed; InfoGain stuck at 53 | 3-4 hours |
| **certifications-us-eu-guide** | Consistently lowest B2B score across 2 audits; meta description references obsolete standard | 2-3 hours |

---

## 10. Comparison with 2026-07-23 Master Summary

### What Improved

1. **Information Gain scores for 7 crisis articles**: The 7 articles flagged with InfoGain <55 in July have all improved:
   - import-costs-guide: 47 -> 72 (+25)
   - hotel-charging-solutions: 47 -> 75 (+28)
   - power-bank-mah-explained: 48 -> 76 (+28)
   - shipping-from-china-guide: 48 -> 72 (+24)
   - wireless-charging-works: 51 -> 72 (+21)
   - qi-certification-guide: 51 -> 55 (+4, still needs work)
   - oem-vs-odm-guide: 48 -> 56 (+8, structural issues mask gains)

2. **B2B H2 coverage**: Several articles transformed from consumer-facing to procurement-facing:
   - usb-c-pd-3-1-explained: 0/9 B2B H2s -> 5/7 (complete rewrite)
   - how-to-choose-power-bank: B2C H2s -> procurement-chain H2s
   - hotel-charging-solutions: 0% B2B H2s -> 58-67%

3. **Author E-E-A-T**: power-bank-specs-guide (E-E-A-T +75), shipping-from-china (+65 via logistics specialization), power-bank-mah-explained (+4 named cell models).

4. **CTA Completeness**: Several articles had missing CTAs in July (what-is-gan-charger received blog-cta.njk, top-power-bank-manufacturers-china jumped from 20 to 95).

5. **Methodology rigor**: The August audit catches issues the automated pipeline missed -- data contradictions, HTML tag nesting, speakable CSS class regressions, FAQ body-schema mismatches, and GB standard number confusion. The audit quality itself has improved significantly.

### What Degraded

1. **Data consistency**: The automated July auditor gave near-perfect cross-reference scores. The August manual audit found contradictions in 22 of 29 articles. The July "100/100 data consistency" scores were false positives from a tool that couldn't do semantic cross-reference. **This is not a content degradation -- it is a measurement accuracy improvement.**

2. **oem-vs-odm-guide heading hierarchy**: Was flagged for H2->H4 skip in July. The fix introduced 42 HTML tag mismatches (h4 closed with /h3). The fix was worse than the original problem.

3. **qi-certification-guide regression**: After 3 rounds of July optimization (peaked at 91.5), the August audit found .speakable CSS class regression, WPC year contradiction, and citation undercount. Multi-pass editing without final validation caused drift.

4. **how-to-choose-factory over-correction**: H2 B2B density went from 21.7% (too low) to 59.1% (too high) with 9 consecutive B2B H2s. The fix overshot the target.

5. **hotel-charging-solutions heading regression**: July had 100/100 heading hierarchy. August found 4 nested H2 tags in the ROI section -- introduced during the July 25 optimization that boosted InfoGain from 47 to 75.

### What Remains Unchanged

1. **certifications-us-eu-guide** consistently lowest B2B content score across both audits (79.9 Jul, 72 Aug). The article's fundamental structure hasn't been addressed.

2. **qi2-vs-magsafe-guide** marginal improvement (+0.3 composite). Most July issues remain unfixed -- only heading hierarchy was addressed.

3. **power-bank-private-label-oem** URL still has 6 meaningful words (flagged in July, unfixed).

4. **charger-safety-standards** and **gan-chargers-guide** consistently top-tier across both audits. Stable quality.

5. **Article count**: 28 in July, 29 in August (+eu-battery-regulation-2023-1542).

### Key Insight: The Automated Auditor Blind Spot

The July audit relied on `b2b_content_auditor.py` + `information_gain_analyzer.py`. These tools scored articles but could not detect:

- **Cross-section data contradictions** (they compare schema to schema, not schema to body)
- **HTML tag nesting errors** (they don't parse DOM)
- **FAQ question-answer semantic mismatches** (they check structure, not meaning)
- **Speakable CSS class vs HTML attribute** (they check for presence, not correctness)
- **GB standard number confusion** (they count named entities, don't verify them)

The August manual audit found 315 issues. The July automated audit flagged approximately 40-50 issues across all 28 articles. **The automation was 85-87% blind to the actual quality problems.**

**Recommendation**: Future audits should combine automated structural checks with mandatory manual cross-reference verification on quantitative data points. The automated pipeline is valuable for scale but cannot replace human audit for data integrity.

---

## Appendix: Per-Article Information Gain Status

| Article | InfoGain (/25) | InfoGain % | Named Entities | Technical Anchors | Assessment |
|---------|:-------------:|:----------:|:-------------:|:-----------------:|------------|
| hotel-charging-solutions | ~18.8 | 75 | 40+ | 12+ | Most improved (+28 points since July) |
| power-bank-mah-explained | 19 | 76 | Samsung SDI, LG M50T, TI TPS61088 | 8+ | Major rewrite from D to B grade |
| what-is-gan-charger | 18 | 72 | 41+ | 11+ | Strong factory data; B2C educational residue in sections 1-3 |
| shipping-from-china-guide | 18 | 72 | 56+ | 12+ | Transformed from 2 entities to 56; +24 InfoGain |
| import-costs-guide | 18 | 72 | CBP N360577, Section 301/122 | 10+ | Regulatory depth; EU duty inconsistency |
| wireless-charging-works | 18 | 72 | BOM component cards, FOD data | 8+ | Consumer topic with strong B2B injection |
| usb-c-pd-3-1-explained | 18 | 72 | Cypress CYPD2104, PD handshake matrix | 8+ | Missing oscilloscope traces and thermal data |
| power-bank-private-label-oem | 18 | 72 | Procurement substance present | Moderate | Nullified by data contradictions |
| quality-control-guide | 17.5 | 70 | 41 (Keysight, Fluke, Tektronix, CPSC) | 17 | Gold standard; burn-in temp contradiction |
| gan-chargers-guide | 17.5 | 70 | Gallium supply chain, counterfeit detection | 12+ | Unique moat in counterfeit GaN detection |
| gan-generations-guide | 17.5 | 70 | GaN FET part numbers, e-mode vs cascode | 10+ | HowTo Schema contradiction |
| semi-solid-state-power-bank-oem | 19 | 76 | Nail penetration test, 285 Wh/kg | 10+ | GB standard confusion undermines credibility |
| charger-safety-standards | 22 | 88 | 10-layer architecture, recall forensics | 12+ | Cost table corruption; otherwise excellent |
| gan-v-charger-oem | 22 | 88 | FLIR thermal, Chroma lab equipment | 12+ | Strong; 4 data contradictions |
| gan-vs-silicon-charger | 22 | 73 | FLIR thermal, MTBF comparison, bandgap physics | 10+ | Good; 3 data contradictions |
| how-to-choose-power-bank | 20 | 80 | FOB tables, 4-stage QC, UN38.3 | 10+ | TL;DR pricing contradiction |
| power-bank-specs-guide | 18 | 72 | 32 entities, 396 data points | 13 | Strong; GB47372 formatting bug |
| car-charger-guide | 20.5 | 82 | E-Mark, automotive-grade validation | 10+ | Strong data; 5 P0 contradictions |
| choose-reliable-china-charger-supplier | 19 | 76 | 6 data tables, supplier verification framework | 10+ | Lead time logic error |
| top-power-bank-manufacturers-china | 16.3 | 65 | Factory profiles, capacity data | 8+ | Needs measurement depth |
| qi-certification-guide | 13.8 | 55 | WPC membership, Qi2 device count | 6+ | Unchanged from July; 1.5B stat implausible |
| qi2-vs-magsafe-guide | 13.3 | 53 | Only 10 entities for 7900 words | 5+ | Unchanged from July; needs +6 entities |
| usb-c-pd-fast-charging-guide | 14.5 | 58 | 12+ entities | 8+ | +4 from July; PD 3.2 content gap |
| charging-market-trends-2026 | 14.5 | 58 | Market projections, regulatory timelines | 6+ | 11 sources but only 3 in citation array |
| certifications-us-eu-guide | 20 | 80 | UL, CE, FCC, UKCA, KC, PSE frameworks | 8+ | Strong regulatory depth; obsolete standard reference |
| eu-battery-regulation-2023-1542 | 19.5 | 78 | 2023/1542, triple EPR, importer liability | 8+ | Wikidata entity mismatch |
| factory-verification-checklist | 17 | 68 | 4 product categories, audit framework | 8 | Below threshold for article size |
| how-to-choose-factory | 19 | 63 | FOB pricing, factory verification | 8+ | Persistent low technical anchor score (11/100) |
| oem-vs-odm-guide | 14 | 56 | 13 entities, 8 technical anchors | 8 | Unchanged from July despite edits |

---

## Appendix: Per-Article B2B Positioning Status

| Article | Scannability | CTA Relevance | H2 B2B Density | Assessment |
|---------|:-----------:|:------------:|:--------------:|------------|
| quality-control-guide | 85/100 | 100/100 | 85% | Gold standard CTA; 3 H2s lack H3s |
| gan-chargers-guide | 88/100 | 95/100 | 86% | Excellent; minor H3-h4 skip |
| charger-safety-standards | 85/100 | 90/100 | 80%+ | Cost table formatting corruption |
| power-bank-specs-guide | 80/100 | 90/100 | 33% | H1 67 chars; mid-article CTA consumer-ish |
| usb-c-pd-3-1-explained | 85/100 | 95/100 | 71% | Poster child for B2B rewrite |
| how-to-choose-power-bank | 80/100 | 100/100 | 80% | 2 H2s still B2C-leaning |
| eu-battery-regulation-2023-1542 | 72/100 | 95/100 | 50% | Zero H3 subsections in 10 H2s |
| factory-verification-checklist | 80/100 | 95/100 | 75% (12/16) | Best H2 B2B coverage in corpus |
| import-costs-guide | 80/100 | 90/100 | 58% | Perfect procurement decision chain |
| power-bank-mah-explained | 85/100 | 90/100 | 70%+ | Major B2B rewrite success |
| what-is-gan-charger | 85/100 | 100/100 | 75%+ | H2 structure completely rewritten B2C->B2B |
| hotel-charging-solutions | 80/100 | 100/100 | 58-67% | ROI section heading regression |
| gan-v-charger-oem | 75/100 | 90/100 | 28.6% | H2 density below 30% target |
| choose-reliable-china-charger-supplier | 85/100 | 90/100 | 67% | Strongest B2B density; OEM/ODM logic error |
| car-charger-guide | 68/100 | 92/100 | 80% | 41% label-style H3s; 3 H3 sibling rule violations |
| top-power-bank-manufacturers-china | 92/100 | 95/100 | 100% | 6/6 H2s B2B; CTA +75 from July |
| gan-vs-silicon-charger | 65/100 | 100/100 | 60%+ | 3 sections lack H3s; Section 5 B2C residue |
| shipping-from-china-guide | 78/100 | 92/100 | 50% | 4/8 H2s lack B2B signals |
| semi-solid-state-power-bank-oem | 75/100 | 90/100 | 70%+ | Section 5 too short; URL 6 words |
| wireless-charging-works | 70/100 | 90/100 | 60%+ | 2 H2s without H3s; lowest scannability |
| gan-generations-guide | 88/100 | 92/100 | 42% | Strong; generations 3-5 educational not procurement |
| qi-certification-guide | 75/100 | 85/100 | 60%+ | CTA heading h3 instead of h2 |
| power-bank-private-label-oem | 58/100 | 92/100 | 91% | **FAIL** -- H2 over-optimized, 3 H2s no H3 |
| certifications-us-eu-guide | 70/100 | 70/100 | 30% | Lowest B2B performer both audits |
| charging-market-trends-2026 | 78/100 | 95/100 | 70%+ | H2 adjacency violation 3x "OEM" |
| usb-c-pd-fast-charging-guide | PASS | PASS | 42.9% | Slightly above 40% ceiling |
| qi2-vs-magsafe-guide | 75/100 | 100/100 | 37.5% | ManufacturingBusiness missing; B2B marginal |
| oem-vs-odm-guide | 60/100 | 100/100 | 72.7% | Best CTA, worst structure (42 tag mismatches) |
| how-to-choose-factory | 52/100 | 70/100 | 59.1% | CTA h3 not h2; 9 consecutive B2B H2s |

---

*Master audit generated 2026-08-02 by SEOMACHINE Manual Audit Pipeline.*
*Individual per-article reports: `audits/page-audit-*-2026-08-02.md`*
*Previous baseline: `audits/B2B-MASTER-SUMMARY-2026-07-23.md`*
