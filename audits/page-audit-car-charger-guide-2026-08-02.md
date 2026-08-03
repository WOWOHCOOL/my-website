# Page Audit: Car Charger OEM Guide (EN)

**Audit Date:** 2026-08-02
**Article:** `C:\Users\wowoh\wowohcool.com\src\blog\car-charger-guide\index.njk`
**URL:** https://www.wowohcool.com/blog/car-charger-guide/
**Last Modified:** 2026-07-24 (frontmatter)
**Auditor:** Manual B2B Quality Gate Audit

---

## Scores Table

| Gate | Score | Weight | Weighted | Status |
|------|-------|--------|----------|--------|
| Anti-Repetition | 88 / 100 | 10% | 8.8 | Good |
| Information Gain | 82 / 100 | 25% | 20.5 | Good |
| Scannability | 68 / 100 | 25% | 17.0 | Needs Work |
| Visual Authenticity | 95 / 100 | 10% | 9.5 | Excellent |
| CTA Relevance | 92 / 100 | 10% | 9.2 | Excellent |
| Schema Compliance | 58 / 100 | 10% | 5.8 | Critical Issues |
| Meta + Links | 90 / 100 | 10% | 9.0 | Excellent |
| **Composite** | | | **79.8 / 100** | **Good** |

### Data Consistency Score: 45 / 100 (Critical)
5 data contradictions found across Key Takeaways, FAQ, Schema, and Selection Guide. See Data Consistency Check section.

---

## Issues by Priority

### P0 -- Critical (Must Fix Before Next Update)

#### P0-1: wordCount is 2x wrong
- **Schema `wordCount`**: 3500
- **Actual word count**: ~7000 words (July 2026 B2B auditor counted 7031)
- **Impact**: Structured data is factually incorrect. AI crawlers and search engines see a mismatch between declared and actual content length, undermining trust signals.
- **Fix**: Update to `7031` (or re-count and use accurate figure).

#### P0-2: timeRequired mismatches visible reading time
- **Schema `timeRequired`**: `"PT14M"` (14 minutes)
- **Visible display** (line 366): `"8 min read"`
- **Impact**: Structured-data/visible-content mismatch flagged by AI crawlers. Undermines metadata credibility.
- **Fix**: Align both to the same value. If actual word count is ~7000, 14 min is closer to reality (500 wpm = 14 min). Update visible display to `"14 min read"` OR update Schema to `"PT8M"`.

#### P0-3: E-Mark certification pricing DIRECT CONTRADICTION
- **Key Takeaways** (line 401): `"E-Mark certification adds $0.80-1.20/unit"`
- **FAQ Q7** (line 308): `"E-Mark certification included at no extra charge from certified factories"`
- **Selection Guide footnote** (line 711): `"CE, FCC, E-Mark certification included"`
- **Impact**: A procurement manager reading both sections will see conflicting claims about costs. This is a trust-destroying error for B2B buyers who care about exact pricing.
- **Fix**: Resolve which claim is correct. If E-Mark IS included at no extra charge (credible for a certified factory), remove the "$0.80-1.20" line from Key Takeaways. If it DOES cost extra, update FAQ and Selection Guide.

#### P0-4: 65W GaN dual-port FOB pricing mismatch
- **Key Takeaways** (line 401): `"GaN 65W dual-port ~$7.00-9.00"`
- **FAQ Q7** (line 308): `"65W GaN dual-port fleet-grade with E-Mark $8-14/unit"`
- **Selection Guide** (line 707): `"65W GaN · dual port · custom logo · E-Mark $8-14/unit"`
- **Impact**: Key Takeaways quotes a lower and narrower range ($7-9) than FAQ and Selection Guide ($8-14). Buyers who skim Key Takeaways get a misleading lower price.
- **Fix**: Unify pricing. If $8-14 is the correct FOB range at 1,000 units, update Key Takeaways. If the $7-9 range is for a different volume tier or spec, clarify the tier.

#### P0-5: Only 2 speakable anchors instead of required 3
- **BlogPosting `speakable.cssSelector`**: `["h1", ".speakable"]`
- **`.speakable` class found**: Only 1 instance (Hook div, line 371)
- **Missing**: Key Takeaways section has no `.speakable` class on a TL;DR summary paragraph.
- **Result**: Only 2 anchors active (H1 + Hook) instead of the required 3 (H1 + Hook + Key Takeaways TL;DR). AI extraction weight is diluted.
- **Fix**: Add a 2-3 sentence TL;DR summary paragraph with `class="speakable"` inside the Key Takeaways amber box (after the `<h2>Key Takeaways</h2>`, before the `<ul>`). See exact fix text below in Recommended Fixes.

---

### P1 -- High (Fix This Week)

#### P1-1: Schema citation array incomplete
- **Schema `citation` array**: 3 entries (Grand View Research, EU Directive 2022/2380, USB-IF)
- **Visible Sources section**: 5 links (Grand View Research, EU Directive, CPSC, USB-IF, EUR-Lex)
- **Missing from schema**: CPSC (.gov) and EUR-Lex (europa.eu) -- both are high-authority domains
- **Impact**: AI crawlers scan `citation` array directly for authority signals. Under-reporting wastes 2 high-value citation opportunities.
- **Fix**: Add CPSC and EUR-Lex entries to schema `citation` array.

#### P1-2: Multiple H3s violate Direct Sibling rule (no `<p>` after heading)
The following H3s are immediately followed by `<div>`, `<table>`, or `<ul>` instead of a `<p>` answer paragraph:

| H3 | Line | Followed By | Issue |
|----|------|-------------|-------|
| "10-Layer Circuit Protection" | 562 | `<div class="grid...">` | No answer paragraph before the grid |
| "Required Certifications by Market" | 578 | `<table>` | No answer paragraph before the table |
| "Sourcing Methods Comparison" | 679 | `<table>` | No answer paragraph before the table |

- **Impact**: Featured Snippet eligibility lost for these sections. Google scrapes the first `<p>` after H3 for snippets.
- **Fix**: Add a 60-150 character answer paragraph immediately after each H3, then place the table/grid. See Recommended Fixes.

#### P1-3: Label-style H3s weaken F-pattern scanning
The following H3s are label-style (topic labels, not conclusions/questions):

| Current (Label) | Line | Why It Fails |
|-----------------|------|--------------|
| "4 Key Advantages of Retractable Cables for Fleet Chargers" | 527 | States a number but reads as a label, not a conclusion |
| "Considerations" | 536 | Zero information -- F-pattern readers skip |
| "10-Layer Circuit Protection" | 562 | Descriptive label, no conclusion |
| "Required Certifications by Market" | 578 | Topic label |
| "OEM Procurement Rule" | 616 | Topic label |
| "Procurement Risk Checklist" | 643 | Topic label |
| "Sourcing Methods Comparison" | 679 | Topic label |

- **Impact**: F-pattern readers (the majority of B2B buyers) skip label-style headings. Information is lost.
- **Fix**: Rewrite as conclusion-style or question-style headings. See Recommended Fixes.

#### P1-4: Lead time inconsistency across sections
- **Key Takeaways** (line 401): `"Lead time: 25-30 days after sample approval"`
- **FAQ Q7** (line 308): `"Lead time: 25-35 days after sample approval"`
- **Procurement Risk Checklist** (line 652): `"25-30 days"`
- **Fix**: Unify to a single range. If 25-35 is the accurate factory range, update Key Takeaways and Checklist.

#### P1-5: OEM/ODM terminology reversed in Procurement Checklist
- **Procurement Risk Checklist** (line 650): `"Standard OEM 500 units; ODM tooling 1,000-2,000 units"`
- **FAQ Q7** (line 308): `"Standard ODM with custom branding: MOQ 500 units per SKU. Custom OEM with new tooling: MOQ 1,000-2,000 units"`
- **Impact**: OEM and ODM are swapped. FAQ correctly states: ODM (custom branding on existing design) = 500 MOQ; OEM (new tooling/custom design) = 1,000-2,000 MOQ. Procurement Checklist reverses these labels.
- **Fix**: Swap "OEM" and "ODM" in the Procurement Risk Checklist line.

---

### P2 -- Medium (Fix This Month)

#### P2-1: No `<cite>` or `<data>` semantic tags in body text
- The B2B Quality Standard (v3.0, Section III.1) requires `<cite>` for standards references and `<data>` for precise measurements.
- **Current state**: Zero `<cite>` or `<data>` tags in article body despite having:
  - Standards: EN 62368-1, ECE R10, IEC 61000-4-5, ISO 9227, ISO 10289
  - Measurements: 58.3°C, 82.7°C, 15,000 cycles, 94.3%, <5mΩ, <0.2%
- **Fix**: Wrap standards in `<cite>`, measurements in `<data value="...">`.

#### P2-2: Featured image lacks `srcset` attribute
- Line 380-387: The featured image has `width`, `height`, `loading="eager"`, `fetchpriority="high"` but no `srcset` with 3 breakpoints (800w/1200w/2240w) + `sizes`.
- **Impact**: Suboptimal LCP on mobile devices. The standard requires `srcset` for all featured images.
- **Fix**: Add `srcset` attribute.

#### P2-3: H2 "OEM" vocabulary overuse
- 6 out of 10 content H2s contain the word "OEM" (H2 #1, #2, #5, #7, #9, #10)
- For OEM/ODM Core articles, target is 50-80%. At 60% "OEM" specifically, this is within range but vocabulary rotation is poor.
- **Suggestion**: Replace "OEM" with "factory", "supplier", "sourcing" in 1-2 H2s.

#### P2-4: Section 6 (Vehicle Compatibility) needs first-party data boost
- GEO Citability audit (2026-07-20) scored this section 55/100 -- the weakest in the article.
- The GEO report recommendations were partially implemented (the opening paragraph is now much stronger than the original), but the section still lacks quantified first-party data.
- **Suggestion**: Add WOWOHCOOL warranty return data by vehicle type (already partially present: "12-18% of warranty claims").

#### P2-5: Author bio expertise tag mismatch with `knowsAbout`
- **Author Bio** (line 779): `"Supply Chain Expert · Wireless Charging Specialist"`
- **Schema `knowsAbout`**: Lists "Power Bank OEM/ODM", "GaN Chargers", "OEM Sourcing", etc. -- no mention of "Wireless Charging" is odd for a car charger article.
- Actually this is fine since she does specialize in wireless charging too. But for this car charger article, the expertise display should emphasize supply chain and GaN, not wireless charging.
- **Suggestion**: Change author bio subtitle to `"Supply Chain Expert · GaN & PD Charging Specialist"` for this article.

---

## Data Consistency Check

### Tier 1: Factory-Owned Parameters (Must Be Globally Identical)

| Parameter | Key Takeaways | FAQ Q7 | Selection Guide | Procurement Checklist | Verdict |
|-----------|--------------|--------|-----------------|----------------------|---------|
| MOQ standard | 500 | 500 (ODM) / 1000-2000 (OEM) | 500 per SKU | 500 (OEM) / 1000-2000 (ODM) | OEM/ODM labels swapped in Checklist |
| 65W GaN FOB price | **$7-9** | **$8-14** | **$8-14** | -- | CONFLICT |
| E-Mark cost | **+$0.80-1.20** | **Included free** | **Included** | -- | CONFLICT |
| Lead time | 25-30 days | 25-35 days | -- | 25-30 days | Minor variance |
| Retractable add | -- | +$1-2/unit | +$1-2/unit | -- | OK |
| Custom branding add | -- | +$0.30-0.80/unit | +$0.30-0.80/unit | -- | OK |

### Tier 2: Schema vs Visible Content

| Check | Schema | Visible | Match? |
|-------|--------|---------|--------|
| wordCount | **3500** | ~7031 | MISMATCH |
| timeRequired | **PT14M** | "8 min read" | MISMATCH |
| dateModified | 2026-07-24 | 2026-07-24 | OK |
| citation count | **3** | 5 links | MISMATCH |
| FAQ question count | 8 | 8 | OK |
| FAQ question wording | (verified) | (verified) | OK (all 8 match) |

### Tier 3: Article Body Internal Cross-Reference

| Stat | First Occurrence | Later Occurrence | Consistent? |
|------|-----------------|-----------------|-------------|
| GaN efficiency | 93-95% (Key Takeaways) | ~94%+ (Section 1 table) | OK (94 falls in 93-95 range) |
| Silicon efficiency | 83-85% (Key Takeaways) | ~80-85% (Section 1 table) | OK (overlapping range) |
| 58.3°C GaN V temp | Section 1 (line 449) | FAQ Q2 (line 268) | OK |
| 82.7°C silicon temp | Section 1 (line 449) | FAQ Q2 (line 268) | OK |
| 15,000 bend cycles | Section 4 (line 548) | -- | Single occurrence OK |
| 5,000 m² facility | Hook (line 372) | Author Bio (line 784) | OK |
| Since 2013 | Hook (line 372) | Author Bio (line 785) | OK |
| 200+ global brands | Hook (line 372) | -- | Single occurrence OK |
| 1M+ units monthly | Hook (line 372) | -- | Single occurrence OK |
| 200,000+ units shipped | Section 4 (line 553) | Section 6 (line 600) | OK |

---

## Comparison with 2026-07-23 B2B Audit

| Dimension | 2026-07-23 | 2026-08-02 | Change |
|-----------|-----------|-----------|--------|
| B2B Content Score | 90.6 | -- | Not re-scored by script |
| Information Gain | 64 | -- | Not re-scored by script |
| B2B Composite | 74.8 | -- | Ranked #13/28 |
| **This Manual Audit** | -- | **79.8** | Different methodology |

### Changes Since July 23
- `dateModified` updated from 2026-07-20 to 2026-07-24
- No content changes detected (same structure, same data points)
- Issues from July audit **not yet addressed**:
  - 16/34 H3/H4 sections still lack optimal answer length
  - Label-style H3s still present ("Advantages", "Considerations" retained)
  - FAQ B2B Language score was 50/100 -- unaddressed

### New Issues Found (Not in July Audit)
1. E-Mark pricing contradiction (P0-3) -- automated auditor missed this cross-section comparison
2. 65W GaN pricing mismatch (P0-4) -- same root cause
3. wordCount wrong by 2x (P0-1) -- schema was not validated against actual count
4. timeRequired mismatch (P0-2) -- schema/visible inconsistency
5. Missing 3rd speakable anchor (P0-5) -- structural gap
6. OEM/ODM label swap in Procurement Checklist (P1-5)
7. Citation array incomplete (P1-1)

---

## Recommended Fixes with Exact Text

### Fix P0-1: wordCount
```json
// In BlogPosting schema node (line 142), change:
"wordCount": 3500,
// To:
"wordCount": 7031,
```

### Fix P0-2: timeRequired
Option A (align both to 14 min -- recommended for ~7000 words):
```html
<!-- Line 366, change: -->
8 min read
<!-- To: -->
14 min read
```
Option B (align both to 8 min):
```json
// Line 144, change:
"timeRequired": "PT14M",
// To:
"timeRequired": "PT8M",
```

### Fix P0-3: E-Mark pricing -- REMOVE from Key Takeaways
```html
<!-- Line 401, change the last bullet: -->
<li><strong>FOB Shenzhen pricing for OEM car chargers at MOQ 500</strong>: 30W single-port ~$4.00-5.50, GaN 65W dual-port ~$7.00-9.00, GaN 140W dual-port with retractable cable ~$15.00-19.00. E-Mark certification adds $0.80-1.20/unit. Lead time: 25-30 days after sample approval.</li>
<!-- Remove "E-Mark certification adds $0.80-1.20/unit." -->
<!-- To: -->
<li><strong>FOB Shenzhen pricing for OEM car chargers at MOQ 500</strong>: 30W single-port ~$4.00-5.50, GaN 65W dual-port ~$8.00-14.00, GaN 140W dual-port with retractable cable ~$15.00-19.00. CE, FCC, E-Mark certification included at no extra charge from certified factories. Lead time: 25-35 days after sample approval.</li>
```
Note: This fix also addresses P0-4 (65W pricing) and P1-4 (lead time).

### Fix P0-5: Add speakable TL;DR to Key Takeaways
```html
<!-- In Key Takeaways block (after line 395, before the <ul>), add: -->
<div class="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-6 mb-8">
  <h2 class="text-lg font-black uppercase text-amber-700 mb-3">Key Takeaways</h2>
  <p class="text-slate-700 leading-relaxed text-sm mb-4 speakable">GaN car chargers deliver 93-95% efficiency and 5+ year lifespans vs 2-3 years for silicon, with retractable cables reducing fleet maintenance costs by 40-60%. For OEM procurement, specify PD 3.1 PPS, wide-input 12-24V compatibility, and E-Mark certification -- all available at MOQ 500 with FOB Shenzhen pricing from $4 to $14 per unit.</p>
  <ul class="text-sm text-slate-700 space-y-2 list-disc pl-5">
    <!-- existing bullets -->
  </ul>
</div>
```

### Fix P1-1: Add missing schema citations
```json
// In BlogPosting.citation array, add after the USB-IF entry (line 163):
{
  "@type": "CreativeWork",
  "name": "U.S. Consumer Product Safety Commission — Car Charger Safety",
  "url": "https://www.cpsc.gov/"
},
{
  "@type": "CreativeWork",
  "name": "EUR-Lex — EU ECE R10 E-Mark Regulatory Framework",
  "url": "https://eur-lex.europa.eu/"
}
```

### Fix P1-2: Add answer paragraphs before tables/grids
```html
<!-- Before "10-Layer Circuit Protection" grid (after line 562), insert: -->
<p class="text-slate-600 mb-4">WOWOHCOOL car chargers implement 10 independent protection circuits, each with a specific measurable threshold tested during 4-stage QC. These protections prevent the most common failure modes in vehicle power environments -- from alternator voltage surges to static discharge in dry cabin air.</p>

<!-- Before "Required Certifications by Market" table (after line 578), insert: -->
<p class="text-slate-600 mb-4">Certification requirements vary by target market. The table below maps mandatory and recommended certifications for each major automotive electronics market -- always request original certificates, not copies, and verify E-Mark on the issuing body's official database.</p>

<!-- Before "Sourcing Methods Comparison" table (after line 679), insert: -->
<p class="text-slate-600 mb-4">B2B buyers have four primary channels for sourcing car chargers from China, each with distinct trade-offs between cost, quality control, and communication overhead. Factory-direct sourcing typically delivers 30-40% lower unit costs versus trading companies.</p>
```

### Fix P1-3: Rewrite label-style H3s
| Current | Replacement |
|---------|-------------|
| "4 Key Advantages of Retractable Cables for Fleet Chargers" | "How Retractable Cables Cut Fleet Maintenance Costs by 40-60%" |
| "Considerations" | "When Traditional Fixed Cables Are the Better Choice for OEM Orders" |
| "10-Layer Circuit Protection" | "What 10 Protection Circuits Does a Fleet-Grade Car Charger Require?" |
| "Required Certifications by Market" | "Which Certifications Are Mandatory for EU vs US vs Asia Car Charger Imports?" |
| "OEM Procurement Rule" | "Procurement Rule: Why Wide-Input 12-24V Compatibility Saves 10x Over Dual-SKU Inventory" |
| "Procurement Risk Checklist" | "8-Point OEM Procurement Risk Checklist for First-Time Car Charger Buyers" |
| "Sourcing Methods Comparison" | "Factory-Direct vs Trading Company vs B2B Platform: Which Sourcing Method Delivers the Best ROI?" |

### Fix P1-5: Swap OEM/ODM in Procurement Checklist
```html
<!-- Line 650, change: -->
<li>★<strong>MOQ:</strong> Standard OEM 500 units; ODM tooling 1,000-2,000 units</li>
<!-- To: -->
<li>★<strong>MOQ:</strong> Standard ODM (custom branding) 500 units; Custom OEM (new tooling) 1,000-2,000 units</li>
```

---

## Gate-by-Gate Detailed Analysis

### Gate 1: Anti-Repetition (88/100)

**Strengths:**
- No exact sentence duplication within paragraphs
- FAQ answers paraphrase body content rather than copy-paste
- Key Takeaways uses different phrasing than body sections for the same data

**Issues:**
- GaN efficiency figures (93-95%) appear in Hook, Key Takeaways, Section 1, FAQ Q2 -- 4 occurrences. Each is contextually appropriate (different framing), but the repetition is notable.
- The 12V/24V voltage-mismatch return stat appears in both Section 6 body and FAQ Q5 with nearly identical wording.
- Hook paragraph (line 372) and Key Takeaways overlap in market size data ($6.8B/12.5% CAGR) without adding new context.

### Gate 2: Information Gain (82/100)

**Strengths:**
- WOC42 factory test data is exceptional: 15,000 bend cycles (3x industry), 94.3% pull force retention, <5mΩ resistance drift, Grade 9 salt spray, <0.2% field failure rate across 200K+ units
- GaN V vs silicon thermal imaging with exact temperatures (58.3°C vs 82.7°C)
- Bosch case study with specific numbers (10,000 units, 25 days, zero defects)
- FOB pricing table with 6 tiers across 1,000-unit volume
- PD 3.1 PDO verification with named equipment (Keysight 34465A)

**Gaps:**
- Section 6 (Vehicle Compatibility) still lacks first-party WOWOHCOOL data beyond one stat (12-18% warranty claims from voltage mismatch). GEO audit scored this 55/100.
- No `<cite>` or `<data>` semantic tags -- missed opportunity for AI crawler machine-readability
- Missing some recommended B2B anchor terms from the standard: no "PCBA ripple noise", "BOM cost breakdown: GaN FET vs Si MOSFET", "FOB vs DDP landed cost"

### Gate 3: Scannability (68/100)

**H1**: "Car Charger OEM Guide: GaN, PD 3.1 & Retractable Sourcing" -- 57 chars. Contains B2B signals (OEM, Sourcing). PASS.

**H2 Coverage**: 10 content H2s covering the full procurement decision chain (Why GaN -> How PD works -> Port config -> Retractable -> Safety -> Compatibility -> Procurement -> Case Study -> Sourcing -> Pricing Guide). PASS.

**H2 B2B Density**: 8/10 content H2s contain B2B signals = 80%. At upper boundary for OEM/ODM Core (50-80%). "OEM" appears in 6 out of 10 H2s -- vocabulary rotation needs improvement.

**H3 Quality**: 7 out of ~17 H3s are label-style (41%). Target: zero label-style H3s. Major scannability loss.

**H3 Answer Length**: The July 2026 audit flagged 16/34 H3/H4 sections lacking optimal answer length. Not independently verified in this audit but remains an open issue.

**Direct Sibling Rule**: 3 violations found (P1-2).

**F-pattern 3-second H2 scan**: A procurement manager reading only H2s understands: GaN vs silicon, PD 3.1 protocols, port config, retractable cables, safety certs, vehicle compatibility, fleet procurement, Bosch case study, manufacturer selection, pricing guide. ~80% article framework is graspable from H2s alone. PASS.

### Gate 4: Visual Authenticity (95/100)

**Strengths:**
- Zero stock photos detected
- Real factory/lab images: thermal imaging, Keysight multimeter QC test, E-Mark lab testing, SMT production line, team photo
- All images have descriptive alt text with B2B context
- Author photo is a real person (not stock)

**Minor Issues:**
- Featured image alt text could be more B2B-specific: "Car charger guide - USB-C PD car chargers for fleet and retail" -- acceptable but could include "OEM" keyword.
- Missing `srcset` on featured image (P2-2).

### Gate 5: CTA Relevance (92/100)

**Strengths:**
- Product page CTA (line 523): "View Retractable Chargers" -- product-relevant
- Contact CTA (line 629): natural inline link to /contact/
- Free QC Template download (lines 807-822): excellent low-friction value continuation, B2B-appropriate
- Bottom gradient CTA (lines 793-804): "Ready to Source Car Chargers for Your Business?" with "View Car Charger Products" and "Get Factory Pricing"
- Blog-wide CTA partial (lines 865-871): "Get Free Quote"
- Zero consumer-language CTAs (no "Buy now", "Shop", "Best deal")

**Minor Issues:**
- Multiple CTAs throughout (5 distinct CTA placements) -- could create decision fatigue. Consider consolidating the mid-article product link (line 523) and keeping the bottom gradient CTA + QC template download.

### Gate 6: Schema Compliance (58/100)

**Present nodes (7/7):**
- Organization, WebSite, BreadcrumbList, BlogPosting, Person, HowTo, FAQPage: ALL PRESENT

**Critical Failures:**
- wordCount wrong (P0-1): -15
- timeRequired mismatch (P0-2): -5
- Citation array incomplete (P1-1): -10
- Speakable: only 2 active anchors instead of 3 (P0-5): -12

**Passing checks:**
- FAQ body-schema wording: all 8 questions match exactly
- FAQPage has independent speakable `[".faq-answer"]`
- BlogPosting speakable uses `["h1", ".speakable"]` (correct selector format)
- Person.author uses @id reference (not inline)
- Person.worksFor uses @id reference (not inline)
- Organization has address, telephone, email
- BreadcrumbList trailing slashes consistent
- No RESPUESTA RÁPIDA block
- No inline Person in BlogPosting.author

**Total deductions**: -42 from critical failures. 100 - 42 = 58.

### Gate 7: Meta + Links (90/100)

**Title Tag**: "Car Charger OEM: GaN PD 3.1 Retractable Guide" -- 48 chars (without brand). Contains B2B signals (OEM). Within 50-60 range. PASS (edge case: slightly short at 48).

**Meta Description**: 155 chars. Contains primary keyword, B2B signals (OEM, MOQ, factory), data points. PASS.

**External Links**: 4 external links with `rel="noopener noreferrer"`:
1. Grand View Research (grandviewresearch.com)
2. CPSC (cpsc.gov)
3. USB-IF (usb.org)
4. EUR-Lex (europa.eu)
PASS (>=2 required).

**Internal Links**: 10+ internal links across product pages, blog articles, and contact page. Strong internal linking cluster. PASS.

**URL**: `/blog/car-charger-guide/` -- 3 words, lowercase, hyphens, no dates. PASS.

**Minor Issues:**
- Title tag is 48 chars without brand (slightly below 50-60 range)
- No `<link rel="alternate" hreflang="...">` tags visible in the njk template (though they may be handled by the layout template -- not verified).

---

## Summary

The car-charger-guide article is a strong piece of B2B content with excellent first-party factory data, real lab images, and solid procurement framing. The Information Gain is high thanks to exclusive WOC42 test data, Bosch case study, and tiered FOB pricing.

However, **5 P0 issues must be fixed immediately**: the wordCount/timeRequired mismatch, E-Mark pricing contradiction between Key Takeaways and FAQ, 65W GaN pricing mismatch, and the missing 3rd speakable anchor. These are data integrity issues that undermine B2B buyer trust -- the exact opposite of what this article aims to achieve.

Compared to the July 2026 B2B Master Summary (ranked #13, B2B 87.6, InfoGain 62), this article has strong bones but accumulated data drift from multiple editing passes. The pricing contradictions are the most concerning -- they suggest the Key Takeaways were written from a different data source than the FAQ and Selection Guide.

**Estimated fix time**: 45 minutes for all P0 fixes, 90 minutes for P0+P1, 3 hours for all issues.
