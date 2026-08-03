# Page Audit: GaN V Charger OEM Manufacturing Guide 2026
**Date**: 2026-08-02
**Article Path**: `/src/blog/gan-v-charger-oem-manufacturing/index.njk`
**Live URL**: `https://www.wowohcool.com/blog/gan-v-charger-oem-manufacturing/`

## Scores
| Gate | Score | Status |
|------|-------|--------|
| Anti-Repetition | 7/10 | 🟡 |
| Information Gain | 22/25 | 🟢 |
| Scannability | 15/20 | 🟡 |
| Visual Authenticity | 9/10 | 🟢 |
| CTA Relevance | 9/10 | 🟢 |
| Schema Compliance | 11/15 | 🟡 |
| Meta + Links | 8/10 | 🟢 |
| **TOTAL** | **81/100** | 🟢 Good |

## Critical Issues (P0)

### P0-1: Data Consistency — Multiple Contradictions Across Sections

Four confirmed data discrepancies were found between the TL;DR (Key Takeaways), body text, FAQ, and cost table:

**A) 65W FOB pricing conflict (Table vs FAQ)**
- Section 4 table: "GaN V FOB 65W: $6-9 at 1,000 pcs"
- FAQ Q4: "FOB at 1,000 units: 65W ~$8-11"
- **Gap**: $6-9 vs $8-11 for the exact same wattage and volume. These are irreconcilable.

**B) Custom OEM MOQ conflict (FAQ vs Section 5 vs Key Takeaways)**
- FAQ Q4: "Custom OEM with tooling: 1,000-2,000"
- Section 5: "Custom OEM with tooling: 3,000+ units"
- Key Takeaways: "3,000+ for new housing design"
- **Gap**: FAQ says 1,000-2,000, everywhere else says 3,000+. The FAQ number is wrong.

**C) Thermal temperature conflict (FAQ Q6 vs body text)**
- FAQ Q6: "GaN V should stabilize at ~58°C vs ~83°C for silicon"
- Body text (Sections 2, 3, 5): GaN V operates at 65-75°C
- **Gap**: 58°C is well outside the 65-75°C range used everywhere else. The FAQ Q6 number appears to reference a different measurement condition (possibly case temperature at a specific ambient) that is not contextualized, making it read as a contradiction.

**D) BOM cost vs FOB price confusion (Key Takeaways vs FAQ)**
- Key Takeaways: "OEM BOM cost for a 65W GaN V charger: $4.80-6.50/unit at MOQ 500"
- FAQ Q4: "FOB at 1,000 units: 65W ~$8-11"
- These are different metrics (BOM = components only; FOB = assembled product at port), but the terminology shift is NOT explained. A reader scanning both sections may think the price jumped from $5 to $10 for the same thing.

### P0-2: wordCount Schema Field Incorrect

The JSON-LD `BlogPosting.wordCount` is set to **2800**. The actual body word count is substantially higher:
- B2B auditor (2026-07-23) reported: **5,103 words**
- GEO citability report (2026-07-20) reported: **2,113 words**
- Research brief target: **2,500-3,500 words**

Regardless of which tool is correct, 2800 is wrong. The article contains 7 sections + FAQ + Key Takeaways + author bio + sources, clearly exceeding 2800 words. The 5,103 figure from the B2B auditor likely includes all template/schema text; the 2,113 from GEO likely counts visible body only. The true body word count is likely in the 3,000-4,000 range. The schema should reflect the actual visible content word count.

**Fix**: Recount with a reliable tool counting only the rendered article body (stripping schema and template), and update `wordCount` accordingly. Likely target: 3,200-3,800.

## High Priority (P1)

### P1-1: H2 B2B Signal Density Below Target (28.6%)

The previous B2B audit (07-23) flagged this at 28.6% against a 30-55% target. Three of seven H2s lack any B2B signal word:

| H2 | B2B Signal? |
|----|-------------|
| "1. GaN V Technology: What OEM Buyers Must Know" | "OEM" ✅ |
| "2. Why GaN V Matters for Your Brand" | None ❌ |
| "3. How to Evaluate a GaN V Manufacturer" | "Manufacturer" ✅ |
| "4. OEM Cost Comparison: Silicon vs. GaN V" | "OEM" ✅ |
| "5. GaN V OEM/ODM Process" | "OEM/ODM" ✅ |
| "6. Industry Applications: Key Verticals for GaN V" | None ❌ |
| "7. Frequently Asked Questions" | None ❌ |

**Fix**: Rewrite H2s 2 and 6 to include B2B signals. Examples:
- H2.2: "Why GaN V Matters for Your Brand and OEM Procurement Strategy"
- H2.6: "Industry Applications: Key B2B Verticals for GaN V OEM Deployment"
- H2.7 is acceptable as-is (FAQ is a standard section), but adding "for OEM Buyers" would push density up.

### P1-2: FAQ Q5 Efficiency Confusion Risk

FAQ Q5 answer includes: "EU: ESPR 2025/2052 (<=0.1W standby, >=87% efficiency)."

The 87% figure is the **ESPR regulatory minimum**, not GaN V's actual efficiency (94-96%). A buyer skimming FAQ may confuse 87% as GaN V's efficiency ceiling, undermining the article's core value proposition.

**Fix**: Add context: ">=87% active efficiency (regulatory minimum; GaN V achieves 94-96%)" or move the ESPR compliance line to a separate sentence clearly separated from the GaN V performance claims.

### P1-3: HTML Tag Mismatch in Related Articles Section

All three related article headings open with `<h3>` but close with `</h4>`:

```html
<h3 class="font-black text-brandBlue...">GaN Chargers Guide 2026</h4>
<h3 class="font-black text-brandBlue...">USB-C PD Fast Charging Guide</h4>
<h3 class="font-black text-brandBlue...">Top Power Bank Manufacturers</h4>
```

This will cause HTML validation errors. Browsers may auto-correct but it risks rendering issues.

**Fix**: Change all `</h4>` to `</h3>` in the related articles section.

## Medium Priority (P2)

### P2-1: Light Repetition of Core Claims

"40% smaller" and "30% cooler/less heat" appear across multiple sections without always adding new context:
- Key Takeaways bullet 1
- Section 1 opening paragraph + closing paragraph (twice in same section)
- Section 2 body text
- Section 4 table (visual repetition)

While some repetition is deliberate reinforcement for procurement buyers, the phrase "40% smaller, 30% cooler" appears nearly identically in 5+ locations. The 07-23 B2B audit gave Opening Density 100/100 and did not flag this, but a strict anti-repetition read notes it.

**Fix**: In section 1, remove the second occurrence ("40% smaller size, 30% better thermal performance") from the closing paragraph, which already contains differentiated content about B2B buyer benefits. Keep the opening claim and the differentiated usage in Section 2 (where it's tied to shipping cost context).

### P2-2: HowTo totalTime vs Article Read Time Discrepancy

- Schema `HowTo.totalTime`: "PT12M"
- Article header meta bar: "10 min read"

While these measure different things (process execution time vs reading time), having both displayed on the same page creates an inconsistency signal for scrapers and validators. The HowTo schema describes the OEM process duration, which is weeks/months in reality (timeline: 2-3 + 3-4 + 4-6 + 4-6 + 4 weeks = 17-23 weeks total), not 12 minutes.

**Fix**: Change `HowTo.totalTime` to "P4W" (4 weeks, a reasonable minimum cycle) or remove `totalTime` if an accurate aggregate cannot be provided. Alternatively, note that 12 minutes is the "reading time to understand the process," not the process itself, and remove `totalTime` from HowTo while keeping it on BlogPosting (`timeRequired: "PT10M"`).

### P2-3: Meta Description at Upper Length Limit

The meta description visible in frontmatter is approximately 160 characters (including truncation "..."):
> "GaN V charger OEM manufacturing guide: 40% smaller than silicon, PD 3.1 up to 240W. Factory-direct sourcing from Shenzhen with MOQ 500, FOB pricing, and..."

At 160 characters, it will be truncated in SERP snippets (Google typically displays 150-160 chars on desktop, less on mobile). The trailing "and..." wastes characters.

**Fix**: Trim to a complete sentence within 150-155 characters. Example: "GaN V charger OEM manufacturing: 40% smaller than silicon, PD 3.1 up to 240W. Factory-direct from Shenzhen with MOQ 500 and full certifications."

### P2-4: Author Hero Bar Image Alt Text

Line 364: `alt="Nina Nico at WOWOHCOOL"` — missing job title and expertise markers, unlike the author bio image (line 600) which has: "Nina Nico - Supply Chain Expert and Wireless Charging Specialist at WOWOHCOOL".

**Fix**: Add job title: `alt="Nina Nico - OEM Supply Chain Expert and GaN Charger Specialist at WOWOHCOOL"`

## Data Consistency Check

| Data Point | Key Takeaways | Body Text | FAQ | Schema/Other | Consistent? |
|------------|--------------|-----------|-----|--------------|-------------|
| 65W FOB at 1,000 pcs | BOM $4.80-6.50 (at 500 MOQ) | $6-9 (table) | **$8-11** | — | ❌ FAQ vs Table |
| Custom OEM MOQ | 3,000+ (new housing) | 3,000+ (with tooling) | **1,000-2,000** | — | ❌ FAQ vs Body |
| GaN V case temp | — | 65-75°C | **~58°C** (Q6) | 65-75°C (HowTo step 2) | ❌ FAQ Q6 vs Body |
| wordCount | — | — | — | **2800** (schema) | ❌ vs actual ~3000-5000 |
| Lead time | — | 25-30 days | 25-30 days | 25-30 days (HowTo) | ✅ |
| 40% smaller | ✅ | ✅ | 40-50% (Q1) | — | ⚠️ range vs specific |
| 30% cooler | ✅ | ✅ | ✅ | — | ✅ |
| Efficiency | — | — | 94-96% (Q1, Q3) | 94-96% (expert insight) | ✅ |
| Cert timeline | — | — | 4-6 weeks | 4-6 weeks (HowTo step 4) | ✅ |
| Field failure rate | — | ~0.5% (table footnote) | <0.3% (Q5, WOWOHCOOL) | — | ⚠️ industry vs WOWOHCOOL (explainable) |

**Summary**: 4 hard contradictions (❌), 2 soft discrepancies (⚠️) requiring disambiguation.

## Comparison with Previous Audit (2026-07-23)

| Dimension | 2026-07-23 B2B Audit | 2026-08-02 Page Audit | Delta |
|-----------|---------------------|----------------------|-------|
| B2B Content Score | 96.1/100 | — | — |
| Information Gain | 71/100 | 22/25 (88%) | +17pp |
| Cross-Reference Consistency | 100/100 | — | MAJOR regression |
| H2 B2B Signal Density | 28.6% (⚠️) | 28.6% (⚠️) | Unchanged |
| FAQ B2B Language | 71/100 | — | No new assessment |
| Author E-E-A-T | 80/100 | — | No new assessment |
| Rank (Composite) | #1 of 28 (83.9) | — | — |
| Overall (this audit) | — | 81/100 | Different methodology |

**Key observation**: The 07-23 audit reported Cross-Reference Consistency as **100/100** — meaning the 4 data contradictions found today (P0-1 A-D) were either introduced after July 23 or were missed by the automated auditor. Given the `dateModified` is 2026-07-24 (one day after the audit), it is possible the 07-24 optimization pass introduced some of these discrepancies.

## Recommended Fixes

### Immediate (this week)

1. **Fix FAQ Q4 pricing**: Change `$8-11` to `$6-9` to match the cost table (or vice versa after verifying actual FOB pricing).
2. **Fix FAQ Q4 MOQ**: Change `1,000-2,000` to `3,000+` to match Key Takeaways and Section 5.
3. **Fix FAQ Q6 temperature**: Either change `~58°C` to `65-75°C`, or add context: "at 25°C ambient, case temperature stabilizes at ~58°C vs ~83°C for silicon (at 45°C ambient, GaN V maintains 65-75°C)."
4. **Update wordCount**: Recount and set accurate value in JSON-LD schema (likely 3,200-3,800).
5. **Fix HTML tag mismatch**: Change `</h4>` to `</h3>` in the related articles section (3 instances).

### This sprint

6. **Rewrite H2.2 and H2.6**: Add B2B signal words to improve density from 28.6% to above 30%.
7. **Fix FAQ Q5 efficiency ambiguity**: Disambiguate ESPR minimum (87%) from GaN V actual (94-96%).
8. **Fix HowTo totalTime**: Change "PT12M" to "P4W" or remove.
9. **Trim meta description**: Reduce to 150-155 characters, remove trailing "and...".

### Next optimization pass

10. **Reduce 40%/30% repetition**: Remove one redundant occurrence from Section 1 closing paragraph.
11. **Add BOM vs FOB explainer**: In Key Takeaways or a footnote, clarify that BOM cost ($4.80-6.50) is component-only while FOB ($6-9) includes assembly, testing, and margin.
12. **Update author hero alt text**: Add job title from bio image.
