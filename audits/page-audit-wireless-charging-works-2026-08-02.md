# Page Audit: Qi2 Wireless Charger OEM: Factory Sourcing & Technology Guide
**Date**: 2026-08-02 | **Live URL**: https://www.wowohcool.com/blog/wireless-charging-works/
**Last Modified**: 2026-07-24 | **wordCount (schema)**: 5300 | **Actual word count**: ~9,700

---

## Scores

| Gate | Score | Status |
|------|-------|--------|
| Anti-Repetition | 7/10 | Minor context-appropriate repetition across sections |
| Information Gain | 18/25 | Strong factory data density; topic inherently leans consumer-educational |
| Scannability | 14/20 | 2 H2s lack H3s; H2 procurement-chain organization partially achieved |
| Visual Authenticity | 9/10 | Real factory/product images; 1 alt text needs B2B keyword enrichment |
| CTA Relevance | 9/10 | Strong B2B CTAs with inline sample-request prompt |
| Schema Compliance | 11/15 | FAQ Q1 answer mismatched to question; wordCount inaccurate; LinkedIn URL suspect |
| Meta + Links | 9/10 | Excellent internal/external link profile; description borderline length |
| **TOTAL** | **77/100** | Good — improved from 07-23 but data consistency issues remain |

---

## Critical Issues (P0)

### 1. FAQ Q1: Answer Text Mismatches Question
**Question**: "What specs should I check on a Qi2 charger datasheet before placing an OEM order?"
**Answer starts**: "Wireless charging uses electromagnetic induction: an alternating current in the charger's transmitter coil..."

The answer describes how wireless charging works, not what specs to check on a datasheet. This is a major quality flaw — AI crawlers and search engines will see the question-answer pair as irrelevant/incoherent. The answer should list datasheet specs (coil inductance tolerance, Q-factor, DCR, ferrite μi, FOD response time, etc.) directly matching the question.

### 2. wordCount = 5300 Does Not Match Actual Content (~9,700 words)
The BlogPosting schema `wordCount` field reads `5300` but the actual word count is approximately 9,700. This is a material understatement (~45% off) and may affect SEO signals.

---

## High Priority (P1)

### 3. Multiple Data Inconsistencies Between Sections

| Data Point | Section A | Section B | Discrepancy |
|-----------|-----------|-----------|-------------|
| Wireless efficiency range | Key Takeaways: 70-80% | Section 10: 75-85% | Upper bound differs by 5% |
| N48 magnet pull force | Section 3: 280g | FAQ Q4: 350g | 70g difference (25% gap) |
| WPC certified product count | FAQ Q8: "21+ Qi2-certified models" | Section 11: "53+" | 152% gap — likely 21 is for wireless chargers only, 53 includes all product categories, but they're presented without qualification |
| 3-in-1 FOB pricing | Key Takeaways: $12-16 | Section 5 table: $10-18 | Different ranges |
| Qi2.2 cert percentage | FAQ Q2: 69.62% | Section 11: 69.6% | Minor rounding inconsistency |

**Recommendation**: Standardize all numbers against a single source of truth. Add qualifying context (e.g., "21 Qi2 wireless charger models" vs "53 WPC-certified products across all categories").

### 4. Two H2 Sections Lack H3 Subheadings

- **H2 Section 1** ("Wireless Charging Evolution: From Faraday to Qi2.2") — No H3, only paragraphs. Add H3s like "Milestones: 1831 Faraday → 2026 Qi2.2 25W" and "Market Scale: $18.4B in 2026"
- **H2 Section 10** ("Wireless Charging Performance: Efficiency Benchmarks for OEM Supplier Evaluation") — Has a comparison table but no H3 element before/within. Add H3s like "Charge Time Benchmarks: Qi 5W → Qi2.2 25W Compared" and "Wireless vs Wired: The Efficiency Gap in Real-World Conditions"

### 5. Person Schema: LinkedIn URL Appears Fabricated
`"sameAs": ["https://www.linkedin.com/in/snowy-wireless-charger"]` — This LinkedIn profile URL pattern is highly unusual. If this is not a real, active LinkedIn profile, it risks an E-E-A-T penalty. Google explicitly validates Person schema against real-world identity signals.

---

## Medium Priority (P2)

### 6. N48 Magnet Pull Force Inconsistency (see table above)
The Section 3 factory data panel lists N48 at 280g, but FAQ Q4 lists N48 at 350g. Both appear in authoritative positions. Fix one to match.

### 7. Meta Description: Borderline Length
Description is ~160 characters exactly — at the truncation threshold. Google may cut off the last portion. Consider shortening to 150-155 characters.

### 8. H1: B2B Signal Word Present But Title Structure Suboptimal
H1 "Qi2 Wireless Charger OEM: Factory Sourcing & Technology Guide" (55 chars) is solid. However, the article's content is now heavily procurement-focused (BOM, MOQ, FOB pricing, factory qualification), but the title still reads as hybrid educational + sourcing. Consider a title that more directly signals the B2B procurement value.

### 9. WOW93 Product Image Alt Text: Light on B2B Keywords
`alt="WOW93 3-in-1 folding wireless charger with independent coils for phone watch and earbuds"` — Compared to other images (which include "OEM factory", "SMT production line", "QC laboratory"), this alt text is purely product-descriptive. Add B2B keywords like "OEM", "MOQ 500", "FOB Shenzhen".

### 10. Sources Section: Missing Link Types
The 5 sources in the "Sources & References" section are all external authority links. However, the IEC 61980 standard cited in the BlogPosting schema `citation` array is never referenced in the visible content. Either add an in-body reference to IEC 61980 or remove it from the citation array.

---

## Data Consistency Check

| Check | Result |
|-------|--------|
| TL;DR vs FAQ charge times | Consistent (Qi2 15W = ~1.5-2h in both) |
| TL;DR vs body market size ($18.4B) | Consistent |
| Hook vs Key Takeaways N52H pull force | Consistent (420g in both) |
| Key Takeaways vs Section 10 efficiency range | **INCONSISTENT** (70-80% vs 75-85%) |
| Section 3 vs FAQ Q4 N48 pull force | **INCONSISTENT** (280g vs 350g) |
| FAQ Q8 vs Section 11 certified count | **INCONSISTENT** (21+ vs 53+) |
| Section 5 vs Section 11 MOQ | Section 5 says 500 for all; Section 11 says 1,000 for Qi2.2 |
| FAQ Q7 charge time vs Section 10 table | Consistent |

---

## Comparison with Previous Audit (2026-07-23)

| Dimension | 2026-07-23 | 2026-08-02 | Change |
|-----------|-----------|-----------|--------|
| B2B Content Score | 86.9 (Master Summary) | N/A (different system) | — |
| Information Gain | 51/100 | 18/25 (72/100 equivalent) | Significant improvement |
| Composite | 69.0 | 77/100 | +8 points |
| Key Issue | "Consumer topic, needs procurement angle" | Strong procurement angle added, but data consistency needs work |
| B2B Audit Details | 94.4/100 (15-dimension) with warnings: H3 answer length, cross-reference inconsistency | H3 answer quality improved; FAQ data + factory data panels added |

**What improved (post 07-24 edit)**:
- Section 7 BOM component cards with exact specs (TDK PC95, Infineon WLC1115/NXP MWCT1013)
- Section 8 FOD production-line test data (1,000-unit batch, false trigger rate, detection speed)
- Section 11 Qi2.2 sourcing outlook with MOQ trends 2024 vs 2026
- Section 11 6-point factory partner qualification checklist
- Richer external authority links (NXP, Grand View Research, IEEE Xplore)
- FAQ questions rewritten for B2B procurement language

**What still needs work**:
- Data cross-reference consistency (same problem flagged in 07-23 audit)
- FAQ Q1 answer text mismatch (new issue — possibly introduced during FAQ rewrite)
- wordCount still stale at 5300
- 2 H2s still lack H3s

---

## Recommended Fixes (In Priority Order)

### Immediate (P0)
1. Rewrite FAQ Q1 schema answer to list actual datasheet specs (coil inductance, Q-factor, DCR, ferrite μi, FOD threshold) matching the question about "what specs to check"
2. Update `wordCount` to actual value (~9,700) in BlogPosting schema

### This Week (P1)
3. Audit all numeric claims across sections and align to single source of truth:
   - Unify efficiency range (use 75-85% or 70-80% consistently)
   - Fix N48 pull force (280g from factory data panel is likely more accurate — FAQ should match)
   - Clarify 21+ wireless charger models vs 53+ total WPC certified products
   - Align 3-in-1 FOB pricing range
4. Add H3 subheadings to Section 1 (History) and Section 10 (Performance)
5. Verify or replace LinkedIn URL in Person schema

### Next Sprint (P2)
6. Trim meta description to 150-155 chars
7. Enrich WOW93 image alt text with B2B keywords
8. Add in-body reference to IEC 61980 or remove from schema citation array
9. Consider tighter procurement-focused H1 if content direction stays B2B-heavy

---

*Audit generated by SEOMACHINE Page Auditor. Compared against B2B Blog Quality Audit Standard v2.3.*
