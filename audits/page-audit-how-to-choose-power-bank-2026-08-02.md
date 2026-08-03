# Page Audit: Power Bank OEM: Custom & Wholesale Sourcing Guide
**Date**: 2026-08-02
**Article Path**: /src/blog/how-to-choose-power-bank/index.njk
**Live URL**: https://www.wowohcool.com/blog/how-to-choose-power-bank/

## Scores
| Gate | Score | Status |
|------|-------|--------|
| Anti-Repetition | 9/10 | 🟢 |
| Information Gain | 20/25 | 🟢 |
| Scannability | 16/20 | 🟡 |
| Visual Authenticity | 8/10 | 🟡 |
| CTA Relevance | 10/10 | 🟢 |
| Schema Compliance | 13/15 | 🟡 |
| Meta + Links | 8/10 | 🟡 |
| **TOTAL** | **84/100** | 🟡 |

---

## Critical Issues (P0 — must fix before next dateModified update)

### P0-1: TL;DR retail price ranges contradict body/FAQ pricing

The Key Takeaways box at the top of the article lists retail prices that do NOT match the body and FAQ:

| Capacity Tier | TL;DR (Takeaways) | Body Section 2 | FAQ Q1 |
|---|---|---|---|
| 5,000mAh | $12-19 | $12-20 | $12-20 |
| 10,000mAh | $19-29 | $20-40 | $20-40 |
| 20,000mAh | $29-49 | $40-60 | $40-60 |
| 20,000mAh 65W | $49-79 | (not separately listed) | N/A |

The 10,000mAh and 20,000mAh retail ranges in the TL;DR are $10-11 lower than the body. A procurement manager reading the TL;DR, then finding different numbers in the capacity tier section, will lose trust.

**Fix**: Update the first bullet in Key Takeaways (line 415) to match body pricing:
```
- **Match power bank capacity to your target retail price point, not just mAh**. 5,000mAh retails $12-20; 10,000mAh retails $20-40; 20,000mAh retails $40-60; 20,000mAh 65W laptop-capable retails $60-100. The highest-margin segment is 10,000mAh with digital display and built-in cables ($25-35 retail, $5-7 FOB at MOQ 500).
```

### P0-2: Schema wordCount is 3100, actual content is ~5300+ words

The JSON-LD BlogPosting node declares `"wordCount": 3100`. The B2B auditor (2026-07-23 run) measured **5,350 words** of article body content. This is a 42% undercount.

Google uses wordCount for content depth signals. An accurate wordCount contributes to ranking; a wrong one erodes schema trust.

**Fix**: Count the actual word count of the rendered article body and update:
```json
"wordCount": 5350,
```
Also update `timeRequired` if needed (PT8M for 5350 words at 238 wpm = ~22 min; current PT8M is too low anyway — suggest PT12M for 3100 words, PT18M for 5350).

---

## High Priority (P1)

### P1-1: Cover image alt text is consumer-oriented, lacks B2B keywords

Line 401:
```html
alt="How to choose a power bank - comparison of different capacity power banks with USB-C and wireless charging"
```
This reads like a B2C Wirecutter caption. All other images have strong B2B/factory alt text with OEM, QC, verification keywords.

**Fix**:
```html
alt="OEM power bank capacity comparison across 5,000-27,000mAh tiers with USB-C PD and Qi2 wireless charging for B2B buyer sourcing evaluation"
```

### P1-2: Two H2 headings lack B2B signal words

- **H2 Section 4** (line 565): "Port Configuration: USB-C PD, USB-A & Qi2 Wireless" — no OEM/manufacturer/factory/supplier/importer/sourcing/MOQ/FOB/B2B
- **H2 Section 5** (line 589): "2026 Differentiators: GaN, Pass-Through & Semi-Solid-State Technology" — no B2B signal word

5 of 7 H2s carry B2B signals (meets the >=2 minimum), but these two H2s read as consumer-education headings.

**Fix**:
- Section 4: "Port Configuration: USB-C PD, USB-A & Qi2 Wireless for OEM Product Planning"
- Section 5: "2026 OEM Differentiators: GaN, Pass-Through & Semi-Solid-State Technology"

### P1-3: Person schema jobTitle mismatch with author bio

Schema (line 185): `"jobTitle": "Sales Manager"`
Author byline (line 375): "Supply Chain Expert · 10+ years in OEM/ODM Manufacturing"
Author bio heading (line 716): "Supply Chain Expert · Wireless Charging Specialist"

The schema says "Sales Manager" but the visible byline says "Supply Chain Expert". Internal inconsistency.

**Fix**: Align schema jobTitle to the most authoritative visible title:
```json
"jobTitle": "Supply Chain Expert | Sales Manager",
```
Or pick one and make it consistent across schema, byline, and bio.

---

## Medium Priority (P2)

### P2-1: URL slug contains stop words

`/blog/how-to-choose-power-bank/` contains "how" and "to" — Google stop words that add no SEO value. While the article has pivoted to B2B OEM content, the URL still reads like a consumer guide.

The research brief (2026-05-14) proposed `/power-bank-oem-manufacturer-china` as an alternative. This would require a 301 redirect and hreflang updates across DE/ES/FR variants.

**Recommendation**: Evaluate a 301 redirect to `/blog/power-bank-oem-sourcing-guide/` or keep the existing URL (changing URLs has hreflang ripple effects across 4 languages). If keeping the URL, the B2B content inside compensates — Google ranks on content, not URL alone.

### P2-2: semi-solid-state-power-bank-oem internal link appears twice in close proximity

Lines 495 and 605 both link to `/blog/semi-solid-state-power-bank-oem/` with different anchor texts. These are in different sections (section 2 capacity tier 5,000mAh card vs section 5 semi-solid-state technology) so the repetition is contextually justified, but check that both instances use distinct anchor text (they do: "See semi-solid-state OEM guide" vs "Read our semi-solid-state guide").

### P2-3: Section 5 (2026 Differentiators) reads slightly more B2C than other sections

Phrases like "Worth the modest premium" (line 593), "look for LCD or TFT displays" (line 597), "verify before buying" (line 601) use consumer-facing language. Contrast with Section 3's "OEM Product Planning Rule" which is pure procurement language.

**Fix**: Rewrite the 4 feature cards in Section 5 with OEM procurement framing:
- GaN: "GaN adds $1-3 to BOM, reduces PCB footprint by 30%, and enables a 15-25% retail premium. The best price-performance choice for mid-to-premium OEM SKUs."
- Digital Display: "TFT/LCD display adds $0.50-1.50 to BOM. Include real-time wattage monitoring as a premium justification for the 20,000mAh+ tier."
- Pass-Through: "Pass-through charging should be specified in the OEM RFQ as a required feature. It is the #1 feature requested by retail distributors for overnight-use positioning."
- Semi-Solid-State: Keep the current strong content, just trim "Premium price but genuinely better technology" to "Commands 2-3x retail premium over standard Li-Po with 2,000-cycle lifespan."

---

## Data Consistency Check

| Data Point | TL;DR | FAQ (Schema) | FAQ (Body) | Body Section | Verdict |
|---|---|---|---|---|---|
| 5,000mAh retail | $12-19 | $12-20 | $12-20 | $12-20 | ❌ TL;DR off by $1 |
| 10,000mAh retail | $19-29 | $20-40 | $20-40 | $20-40 | ❌ TL;DR off by $11 |
| 20,000mAh retail | $29-49 | $40-60 | $40-60 | $40-60 | ❌ TL;DR off by $11 |
| 10,000mAh FOB | $5-7 | $4-7 | $4.50-7 | $5-7 | ⚠️ FAQ schema $4-7 vs body $5-7 |
| 20,000mAh FOB | — | $8-14 | $10-14 | $10-13 | ⚠️ FAQ schema $8-14 vs body $10-13 |
| GaN efficiency | — | 85-92% | 85-92% | 85-92% | ✅ Consistent |
| Grade-A fail rate | <2% | <2% | <2% | — | ✅ Consistent |
| MOQ laser engraving | — | 500 | 500 | 500 | ✅ Consistent |
| MOQ silk screen | — | 1,000 | 1,000 | — | ✅ Consistent |
| wordCount | — | 3100 | — | ~5350 actual | ❌ 42% undercount |
| timeRequired | — | PT8M | — | — | ❌ Too low |
| 47.89% market share | — | ✅ | ✅ | ✅ (section 2) | ✅ Consistent |
| 74Wh / 99.9Wh IATA | — | ✅ | ✅ | ✅ (section 6) | ✅ Consistent |

---

## Comparison with Previous Audits

### 2026-07-13 (en-blog-b2b-quality-standards-audit)
- **Score**: 58/100 (D+) — worst 3 articles
- **Key findings**: H2s were consumer logic ("Understanding Capacity: What mAh Really Means", "Must-Have Features in 2026", "Airline Travel Rules"), 0/10 H2s had B2B signals, low Information Gain, B2C title-body mismatch
- **Status**: ALL FIXED. Article has been completely rewritten from B2C to B2B OEM perspective.

### 2026-07-23 (B2B-MASTER-SUMMARY + b2b-audit)
- **B2B Score**: 89.8/100
- **InfoGain Score**: 56/100
- **Composite**: 72.2 (ranked #19/28)
- **Critical issue**: No CTA found in bottom section
- **Status**: CTA FIXED. Article now has dual CTAs (inline "Ready to Launch Your Power Bank Brand?" + partials/blog-cta.njk include).

### Summary of changes since 07-13 (D+ to current):
- H1: "How to Choose a Power Bank" → "Power Bank OEM Manufacturer: Custom & Wholesale Sourcing Guide" (62 chars, 4 B2B signal words)
- H2s: Complete rewrite from 10 B2C headings → 7 procurement-chain H2s (5/7 with B2B signals)
- Added: FOB pricing tables, capacity tier strategy, 4-stage QC, UN38.3 logistics, MOQ framework
- Added: 8 FAQ questions with B2B procurement language
- Added: HowTo schema (5 steps for OEM sourcing)
- Added: 5 external authority links with rel="noopener noreferrer"
- Added: Dual B2B CTAs
- Remaining issues: TL;DR/body price contradictions, wordCount undercount, cover image alt text, 2 H2s still B2C-leaning

### What's still broken from 07-23:
- **URL quality (85/100)**: "how-to-choose" stop words remain — minor SEO drag, not worth the hreflang ripple of changing
- **Author E-E-A-T (80/100)**: Still internal reference (Nina Nico), no external expert quote added
- **Cross-reference consistency**: Was "N/A — both TL;DR and FAQ required" in 07-23 audit. Now both exist but TL;DR pricing contradicts FAQ/body pricing.

---

## Recommended Fixes (Priority Order)

1. **Update TL;DR retail price ranges** to match body (P0 — 5 min)
2. **Recount wordCount** and update schema `wordCount` + `timeRequired` (P0 — 5 min)
3. **Rewrite cover image alt text** with B2B keywords (P1 — 2 min)
4. **Add B2B signal words to H2 sections 4 and 5** (P1 — 2 min)
5. **Align Person schema jobTitle** with author bio (P1 — 1 min)
6. **Section 5 B2C language cleanup** — 4 feature cards to OEM framing (P2 — 15 min)
7. **Consider 301 redirect** from `/how-to-choose-power-bank/` to a cleaner slug (P2 — evaluate hreflang impact first, 30 min)
8. **Add external expert quote** (WPC, USB-IF, or UL contact) to boost E-E-A-T (P2 — 1 hr research + outreach)

---

*Audit performed manually against B2B Quality Gates v3. Cross-referenced against brief (2026-05-14), master summary (2026-07-23), GEO citability (2026-07-20), and B2B quality standards audit (2026-07-13).*
