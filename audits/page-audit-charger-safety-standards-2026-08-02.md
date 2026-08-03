# Page Audit: OEM Charger Safety Standards: IEC 62368-1 & UL Compliance Guide

**Date**: 2026-08-02 | **Live URL**: https://www.wowohcool.com/blog/charger-safety-standards/
**Auditor**: Manual deep audit against B2B Quality Gates (v3 standard)
**Article File**: `C:\Users\wowoh\wowohcool.com\src\blog\charger-safety-standards\index.njk`

---

## Scores

| Gate | Score | Status |
|------|-------|--------|
| Anti-Repetition | 8/10 | PASS |
| Information Gain | 22/25 | STRONG |
| Scannability | 17/20 | PASS |
| Visual Authenticity | 10/10 | PASS |
| CTA Relevance | 9/10 | PASS |
| Schema Compliance | 12/15 | NEEDS FIX |
| Meta + Links | 8/10 | PASS |
| **TOTAL** | **86/100** | GOOD |

---

## Critical Issues (P0)

### P0-1: Cost Estimator Table -- Range Values Corrupted

The "10. Safety Certification Cost Estimator" table (lines 960-997) has systematic formatting corruption. En-dash/hyphen ranges appear to have been replaced with comma-space sequences, rendering dollar amounts and timelines unreadable:

```
Current (corrupted)            Should be (estimated)
$8,000, 5,000                  $8,000-$15,000
$6,000, 2,000                  $6,000-$12,000
$12,000, 2,000                 $12,000-$22,000
8, 4 wks                       8-14 wks
GaN Charger (45, 00W)          GaN Charger (45-100W)
$12,000, 0,000                 $12,000-$20,000
$18,000, 0,000                 $18,000-$20,000  (verify)
10, 6 wks                      10-16 wks
$10,000, 8,000                 $10,000-$18,000
$8,000, 4,000                  $8,000-$14,000
$15,000, 6,000                 $15,000-$26,000
10, 4 wks                      10-14 wks
$10,000, 6,000                 $10,000-$16,000
$7,000, 3,000                  $7,000-$13,000
$14,000, 4,000                 $14,000-$24,000
$10,000, 8,000                 $10,000-$18,000
$15,000, 6,000                 $15,000-$26,000
```

The footer note on line 997 similarly: `$3,000, 8,000 and 4, weeks` should be `$3,000-$8,000 and 4-8 weeks`.

**Fix**: Restore the correct dash ranges. Verify exact numbers against `context/factory-data-canonical.md` or the original research brief.

### P0-2: FAQ Penalty Text Corrupted

Line 307 in the FAQ Schema (Q7 answer) reads:

> "EU fines up to, 00,000"

This is a corrupted euro sign and amount. Should read something like:

> "EU fines up to EUR 500,000"

**Fix**: Restore the correct penalty figure. Source: EU Market Surveillance Regulation (EU) 2019/1020.

### P0-3: wordCount in Schema Stale

Frontmatter `modified: 2026-07-24` is current, but `wordCount: 4400` in the BlogPosting schema (line 143) is significantly outdated. The article has been expanded multiple times since its initial ~2,270-word version. Current estimated word count: **8,000-8,500 words**.

**Fix**: Update to actual word count. Run word count on the rendered HTML body (excluding schema, navigation, footer).

---

## High Priority (P1)

### P1-1: timeRequired vs. Displayed Read Time Mismatch

- Schema `timeRequired`: `"PT15M"` (line 145)
- Displayed read time (line 365): `13 min read`

These should match. A 8,000+ word technical article at 200-250 WPM is approximately 32-40 minutes, not 13-15. One or both values need updating.

**Fix**: Either set both to an accurate estimate (~PT35M / 35 min read) or keep the current "13 min read" and set timeRequired to PT13M. The displayed value should drive the schema value.

### P1-2: "Recall velocity" Claim Lacks Source Attribution

Line 435 states:

> "Anker recalled over 1 million power banks in 2025 due to fire risk"

This is a strong factual claim. In the recall forensics section (Section 7, line 791), the same claim appears, attributed to "lithium cell manufacturing defect." The CPSC source is cited generically in Sources & References, but this specific Anker recall figure should be directly attributable.

The research brief (`brief-charger-safety-standards-2026-05-24-comprehensive.md`) originally listed the Casely recall at 429,200 units with 1 fatality. The article now attributes ~1M units to Anker and the fatality to general CPSC data. These figures should be cross-verified.

**Fix**: Add a direct CPSC link for each recall case study, or add a footnote citing the specific CPSC recall notice number for each case.

### P1-3: External Link Count Below Threshold

The Sources & References section (lines 1156-1162) lists only 5 external links, all authoritative (.org, .gov, .int). The CLUADE.md pre-commit checklist requires >= 2 external authority links -- this is met. However, the visual FAQ section has no inline external links. The FAQ answers in `<div class="space-y-4">` (lines 1019-1052) contain zero hyperlinks to authoritative sources, while the JSON-LD FAQ answers reference specific platforms (iq.ulprospector.com, fccid.io) without making them clickable in the visible HTML.

**Fix**: Add clickable links to UL Prospector, FCC ID, and WPC database in the visible FAQ section where they are referenced.

---

## Medium Priority (P2)

### P2-1: fr hreflang Missing from hreflang Block

Frontmatter declares `frPath: "blog/normes-securite-chargeurs/"` (line 11), but the hreflang block (lines 15-19) only lists en, de, es -- no fr entry.

**Fix**: Add `fr: "/fr/blog/normes-securite-chargeurs/"` to the hreflang block, or remove frPath from frontmatter if the FR article does not yet exist.

### P2-2: Hook Section Mentions $224,000 Without Attribution

Line 372 states:

> "$224,000 in property damage"

This matches the HTRC/Haisito recall case detailed in Section 7 (line 828). However, in the hook, it appears as an unattributed statistic. A reader encountering this number in the introduction has no way to verify its source until reaching Section 7 eight scroll-lengths later.

**Fix**: Either add "(CPSC Recall #XX-XXX)" parenthetical after the figure, or rephrase to "including one case with $224,000 in documented property damage (see Section 7 for case details)."

### P2-3: "Key Takeaways" Section Has No H2 Wrapper

The Key Takeaways block (lines 394-402) is visually prominent but structurally orphaned -- it sits directly under the article content div without an H2 heading, between the hero and the TOC. It contains some of the most AI-citable content in the article (4 specific data points with technical details).

**Fix**: Consider wrapping in `<h2 class="sr-only">Key Takeaways</h2>` for accessibility, or restructure so it falls under the TOC's scope.

### P2-4: Expert Insight Block Has Missing Attribution

Line 512:

> ", Based on IEC Technical Committee 108, IEC 62368-1:2023 Safety requirements"

The comma at the start of this line appears to be a remnant of a deleted author name. The block quote on line 511 is attributed generically.

**Fix**: Restore the original attribution or rephrase as "Based on IEC Technical Committee 108 guidance, IEC 62368-1:2023."

### P2-5: Minor Text/Encoding Issues

- Line 469: `120, 40V AC` -- should read `120-240V AC`
- Line 529: `H, CH, C₂H, ` -- chemical formula appears truncated (should be H2, CH4, C2H4, etc.)
- Line 537: `, ` at start of list items -- likely a template artifact from a list marker replacement
- Lines 857-861 (4-Stage QC): Each stage name has a comma instead of dash/parenthesis -- `IQC, Incoming` should be `IQC -- Incoming` or `IQC (Incoming)`

---

## Data Consistency Check

| Data Point | Hook/Intro | Body | FAQ | Schema | Verdict |
|-----------|-----------|------|-----|--------|---------|
| CPSC recall count | 447,000 chargers (line 372) | Same in Section 7 cases | 447,000+ (line 1030) | N/A | CONSISTENT |
| Field failure rate | Not in hook | <0.1% (line 872) | <0.1% (line 1050) | N/A | CONSISTENT |
| 10-layer protection | Mentioned in hook | Detailed in Section 4 | Listed in FAQ Q4/Q8 | N/A | CONSISTENT |
| wordCount | N/A | N/A | N/A | 4400 | OUTDATED (actual ~8000+) |
| timeRequired | N/A | "13 min read" (line 365) | N/A | PT15M | MISMATCH (13 vs 15) |
| UL 62368-1 4th Ed deadline | "February 15, 2027" (line 267) | "Feb 15, 2027" (line 744) | "Feb 15, 2027" (FAQ Q2) | N/A | CONSISTENT |
| GB 47372 transition end | N/A | "Mar 31, 2027" (line 751) | "March 31, 2027" (FAQ Q5) | N/A | CONSISTENT |
| Burn-in spec | "100% load for 4 hours" (line 397) | "8-hour 100% full-load burn-in" (line 870) | "100% 8-hour burn-in at 45°C" (FAQ Q4) | N/A | MINOR: Key Takeaways says 4h, factory says 8h. 4h is the IEC 62368-1 minimum, 8h is WOWOHCOOL's internal standard. Clarify distinction. |
| UL 94 7th Edition date | N/A | "Feb 2026" (section 5 header) | N/A | N/A | Research brief says "2026/2/26" -- close enough |

**Key Finding**: The 4-hour vs 8-hour burn-in discrepancy in the Key Takeaways (line 397: "maintain case temperature below 65degC at 25degC ambient under 100% load for 4 hours") vs. the Factory Testing section (line 870: "8-hour 100% full-load burn-in at 45°C") could confuse readers. The 4-hour figure is the IEC 62368-1 thermal test requirement; the 8-hour figure is WOWOHCOOL's production burn-in protocol. Add a clarifying note.

---

## Comparison with Previous Audit (2026-07-23)

| Dimension | Jul 23 Score | Aug 2 Score | Delta | Notes |
|-----------|:-----------:|:-----------:|:-----:|-------|
| B2B Content Quality | 98.5 | N/A (different methodology) | -- | Previous audit used automated 14-dimension scoring |
| Information Gain | 66 | 22/25 (88%) | +22pp* | Article expanded significantly since July |
| GEO Citability | 89 | -- | -- | Jul 20 GEO audit still valid for structural analysis |

*Note: Different scoring scales make direct comparison unreliable. The Jul 23 audit used `b2b_content_auditor.py` (0-100 scale per dimension) while this audit uses manual gate scoring.

**Key changes since Jul 23:**
1. Cost estimator section was unnumbered -- now numbered as Section 10 (FIXED)
2. H2->H4 skip flag is no longer present -- heading hierarchy appears clean
3. FAQ B2B language score was 75/100 -- current FAQ uses strong B2B procurement terms
4. wordCount was flagged at 2000 in May, updated to 4400 in July, still inaccurate

**Issues flagged in Jul 23 that persist:**
- Author E-E-A-T score was 80/100 (old author "Nina Nico"). Current author "Snowy May" has improved schema (LinkedIn, knowsAbout array, jobTitle) -- this may have been resolved.
- FAQ B2B language was flagged -- current FAQ uses procurement terms (MOQ, OEM, importer) naturally.

---

## Recommended Fixes (Specific, Actionable)

### Immediate (before next deployment)

1. **Fix cost estimator table ranges** (P0-1): Restore all `X, Y` → `X-Y` in the cost table (lines 960-997) and footer note (line 997).
2. **Fix FAQ penalty text** (P0-2): Line 307, replace "up to, 00,000" with "up to EUR 500,000" (verify exact figure).
3. **Update wordCount** (P0-3): Run `wc -w` equivalent on rendered content, update line 143.
4. **Fix encoding errors** (P2-5): `120, 40V AC` → `120-240V AC` (line 469); truncated chemical formula on line 529; leading commas on lines 537-541.
5. **Fix Expert Insight attribution comma** (P2-4): Line 512, remove leading comma.

### Short-term (this week)

6. **Align timeRequired with displayed time** (P1-1): Set both to the same value based on actual reading time.
7. **Add direct CPSC links to recall case studies** (P1-2): Each of the 5 cases in Section 7 should link to its CPSC recall notice.
8. **Add clickable links to visible FAQ section** (P1-3): Link iq.ulprospector.com, fccid.io, WPC database.
9. **Add fr hreflang or remove frPath** (P2-1): Fix the hreflang inconsistency.
10. **Clarify burn-in duration discrepancy** (Data Consistency): Add note in Key Takeaways distinguishing IEC test requirement (4h) from factory protocol (8h).

### Medium-term (when next editing)

11. **Verify Anker ~1M recall figure** (P1-2): Cross-reference with CPSC database for exact notice number.
12. **Add source attribution to hook statistics** (P2-2): Cite CPSC recall notice for $224K damage figure.
13. **Restructure Key Takeaways** (P2-3): Give it an H2 or sr-only heading for accessibility.
14. **Update FAQ section with inline links** to verification tools referenced in schema but not in visible HTML.

---

## Article Strengths (Notable)

1. **Recall Forensics (Section 7) is best-in-class**: 5 case studies with engineering root cause analysis, exact unit counts, "Missing protection" synthesis, and a unifying principle ("two-fault tolerance"). This section alone justifies the article's existence and is highly AI-citable (GEO score 93/100 for this block).

2. **10-Layer Protection Map (Section 4)**: Named components (Richtek RT7202, Chroma 63600), regulatory references (IEC 60127, CISPR 32, IEC 62368-1 clauses), and stage-level failure mode mapping. Unlikely to be replicated by competitors.

3. **Thermal Runaway Physics (Section 3)**: 5-step chain reaction with exact temperature thresholds (80degC, 150degC, 180degC, >800degC) and corresponding prevention architecture. This is the kind of content AI models extract for definitive answers.

4. **GB 47372-2026 Coverage**: The nail-penetration test parameters (O3mm steel nail, 150mm/s) are exclusive regulatory detail not found in English-language competitor content.

5. **Visual Authenticity**: 100% real factory/lab images with B2B keyword-rich alt text. Zero stock photos.

6. **B2B CTA Language**: "Need Certification-Ready OEM Chargers?" + "Get Factory Pricing" + "Ready to Source from the Factory?" -- procurement-appropriate, not consumer-leaning.

---

*Audit performed manually against b2b-blog-quality-audit-standard.md v3 (2026-07-30). Cross-referenced with GEO Citability Score 2026-07-20, B2B Master Summary 2026-07-23, and research brief 2026-05-24.*
