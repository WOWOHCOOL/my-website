# Single-Page Audit: GaN Generations Guide

**Audit Date:** 2026-08-02
**Article:** `/src/blog/gan-generations-guide/index.njk`
**Live URL:** https://www.wowohcool.com/blog/gan-generations-guide/
**Previous Scores:** B2B 96.5 | InfoGain 68 | Composite 82.3 (Ranked #6 of 28, 2026-07-23)
**GEO Citability:** 88/100 (2026-07-20)
**EN Blog B2B Audit:** 76/100 (B- grade, 2026-07-13)
**dateModified in Schema:** 2026-07-25

---

## Executive Summary

GaN Generations Guide remains a top-6 performer with strong B2B structural fundamentals. Two critical intra-article contradictions were discovered in this audit (HowTo Schema vs body content, FAQ pricing vs comparison table). These are regressions from the prior audit, not pre-existing issues. The article's core Information Gain strengths (FET part numbers, FOB pricing, thermal data, e-mode vs cascode) remain intact and are the primary reason for its high citability score.

| Category | Score | Grade |
|----------|:-----:|:-----:|
| B2B Structure (Gates 1,3,5) | 92/100 | A- |
| Information Gain (Gate 2) | 70/100 | B- |
| Visual Authenticity (Gate 4) | 85/100 | B+ |
| Schema Markup | 78/100 | C+ |
| Cross-Reference Consistency | 55/100 | D |
| **Composite** | **76/100** | **B-** |

> **Change vs 7/23 audit:** B2B structure held. InfoGain unchanged. Schema and cross-reference consistency degraded due to newly discovered contradictions. Composite slightly down due to stricter pass/fail on consistency checks.

---

## Part 1: Gate-by-Gate Audit

### Gate 1: Anti-Repetition — Score: 92/100

**Pass.** No same-paragraph repetition detected. Each section delivers distinct information.

**Minor finding:** The "WOWOHCOOL has served 200+ global brands since 2013 with a defect rate below 0.3%" boilerplate appears in two Schema FAQ answers (Q6 and Q7) but not in the body FAQ. This is a schema-body inconsistency (see Part 3), not a body-level repetition issue.

---

### Gate 2: Information Gain — Score: 70/100

**This is the article's competitive moat.** The core question: "Is this content that no SERP competitor can replicate without access to a factory?"

#### Strengths (High-Value)

| Element | Location | Value |
|---------|----------|-------|
| GaN FET part numbers with vendor mapping | Section 7, Table + FAQ Q8 | Navitas NV6128/NV6169, Innoscience INN700D240A, Infineon CoolGaN G5, EPC EPC2218 — with generation tags |
| FOB pricing by generation + wattage | Section 6 comparison table + Section 5 | GaN V 65W: $7-9/unit at 1,000 pcs FOB Shenzhen. GaN FET pricing $0.80-1.50 at 10K+ quantity |
| Thermal differential data | Key Takeaways + Section 5 | GaN V ~58C vs silicon ~83C at 100% load |
| e-mode vs cascode architecture | Section 4, FAQ Q6 | Unique technical explanation absent from SERP competitors |
| PD 3.1 EPR voltage rail detail | Section 5 | 28V/36V/48V rails, 500-microsecond transition requirement, 200mV ripple spec |
| GaN VI roadmap 2027-2029 | Section 10 | Engineering sample timeline, 7-8MHz target, integrated digital control |
| Price decline forecast | Section 5 + FAQ Q5 | 10-15% annual decline, GaN V parity with GaN III by 2027-2028 |
| Supplier verification methodology | Section 8 | 5-step verification framework (switching frequency, FET manufacturer, thermal images, PD 3.1 EPR, size check) |

#### Weaknesses

| Issue | Detail | Severity |
|-------|--------|----------|
| Factory Stat block is generic | Line 588-591: "WOWOHCOOL is one of the earliest adopters of GaN V..." — uses general factory stats, no topic-specific first-party measurement | Medium |
| Credibility anchor fatigue | Same 5,000m² / Since 2013 / 50+ R&D / 50+ countries stats appear in many articles; GaN-specific first-party lab data (e.g., "Our GaN V 65W PCBA measured 94.7% efficiency at 230V/50Hz on Chroma 63600") is missing | Medium |
| Yole Group citation is second-hand | Market data ($2.5B by 2027, 30% CAGR) cited from Yole — credible but not first-party | Low |
| Some real-world examples are anonymized | "A European distributor tested samples..." (line 570) — nameless anecdote, less persuasive than a named case | Low |

#### Information Gain vs Competitors

| Dimension | WOWOHCOOL | SERP Top 5 |
|-----------|-----------|------------|
| GaN FET part numbers | **Yes** (7 vendors mapped) | No |
| FOB pricing by generation | **Yes** ($4-6 to $7-9) | No |
| e-mode vs cascode explanation | **Yes** (unique) | No |
| Supplier verification framework | **Yes** (5-step) | No |
| "What is GaN" explanation | Yes | Yes (commoditized) |
| GaN benefits overview | Yes | Yes (commoditized) |

**Verdict:** Strong moat on the technical/ procurement dimensions that matter for B2B. The article owns the "GaN FET part numbers for OEM quotes" and "e-mode vs cascode" content spaces that zero SERP competitors cover.

---

### Gate 3: Scannability — Score: 88/100

#### H1 Assessment

`GaN Charger Generations: OEM Factory Technology Roadmap 2026` — **61 characters.** Contains "OEM" and "Factory" (2 B2B signal words). Within 50-65 char range. PASS.

#### H2 Structure (Procurement Decision Chain)

| # | H2 Text | B2B Signal? | Decision Chain Position |
|---|---------|:-----------:|------------------------|
| 1 | Why GaN Generations Matter for OEM Sourcing | ✅ OEM | Why this matters |
| 2 | GaN II and GaN IV: Why Charger Specs Skip Numbers | ❌ | What to verify |
| 3 | GaN I: The Pioneer (2018) | ❌ | What it is |
| 4 | GaN III: The Efficiency Leap (2020) | ❌ | What it is |
| 5 | GaN V: Today's Peak Performance (2023) | ❌ | What it is |
| 6 | GaN I vs III vs V: Side-by-Side Comparison Table | ❌ | What to compare |
| 7 | Real-World GaN FET Models in 2026 Sourcing Quotes | ✅ Sourcing | How to verify |
| 8 | How to Identify Real GaN V: OEM Supplier Verification | ✅ OEM Supplier | How to verify |
| 9 | OEM Decision Framework: Which Generation for Your Product Line? | ✅ OEM | How to decide |
| 10 | GaN VI & SiC Hybrid: OEM Product Roadmap 2027-2029 | ✅ OEM | What's next |
| 11 | Conclusion | ❌ | — |
| 12 | Frequently Asked Questions | ❌ | — |

**5 of 12 H2s contain B2B signal words** (OEM, Sourcing). Requirement: >= 2. PASS.

**Issue:** H2s 3-5 (GaN I/III/V descriptions) are generation-focused educational headers rather than procurement-decision headers. A procurement manager scanning H2s sees "What each generation is" before "How to decide" — the decision is delegated to H2 #9. Acceptable for a comparison/education article but a missed optimization.

**Suggested H2 rewrites (optional, low priority):**
- H2 #3: "GaN I: Budget OEM Option or Obsolete for New Designs?"
- H2 #4: "GaN III: The Mid-Range OEM Sweet Spot (2020-Present)"
- H2 #5: "GaN V: Premium OEM Platform for 2026-2028 Product Cycles"

#### H3 Specificity

| H3 | Format | Data-Rich? |
|----|--------|:----------:|
| Enhancement-Mode vs Cascode Architecture | Technical distinction | ✅ Specific |
| How GaN V Enables PD 3.1 EPR at 240W | Data conclusion | ✅ Contains 28V/36V/48V rails, 500us transition, 200mV ripple |

All H3s are specific technical topics. No vague headers like "Thermal Performance" detected. PASS.

#### H3 Answer Length (Featured Snippet Readiness)

Sections 3-5 each open with a substantial paragraph (100-150+ chars) before listing technical specs. The Key Takeaways box (line 398-406) serves as the featured snippet capture point. PASS.

#### Table of Contents

Present (line 408-424). Blue background, covers all 12 sections. PASS.

---

### Gate 4: Visual Authenticity — Score: 85/100

**No stock photos detected.** All images are real factory/product photography.

| # | Image | Type | Alt Text Has B2B Keyword? |
|---|-------|------|:-------------------------:|
| 1 | Cover (line 386) | Cover design | ✅ "OEM charger buyers" |
| 2 | SMT production line (line 442) | Factory photo | ✅ "GaN V charger OEM SMT production" |
| 3 | WOP37 product (line 501) | Product photo | ✅ "OEM/ODM custom branding" |
| 4 | WOP80 product (line 536) | Product photo | ✅ "OEM desktop charging" |
| 5 | Chroma testing (line 556) | Lab equipment | ❌ Highly technical but no B2B signal word |
| 6 | PCBA inspection (line 562) | Component photo | ❌ Technical but no B2B signal word |

**Issues:**
- Image #5 (Chroma load test) and #6 (PCBA inspection) have excellent technical alt text but lack explicit B2B signal words (OEM, factory, supplier, importer, sourcing, MOQ, FOB). Adding one B2B keyword to each would improve. Low priority.

**Author image:** Line 366, 623. Alt text: "Nina Nico at WOWOHCOOL" / "Nina Nico - Supply Chain Expert and Wireless Charging Specialist at WOWOHCOOL". Contains job title and expertise. PASS.

**Missing:**
- No factory-operation GIFs (noted in 7/13 audit — still unfilled)
- No data visualization charts (efficiency curves, price decline graphs)

---

### Gate 5: CTA Relevance — Score: 92/100

**Final CTA (line 646-657):**
- "Need Help Choosing Your GaN Generation?" — B2B decision-focused
- "Request OEM Consultation" — explicit B2B CTA
- "Browse GaN V Chargers" — product exploration
- Blog CTA partial (line 700-706): "Ready to Source from the Factory?" with "Get Free Quote"

All CTAs use B2B procurement language. No consumer "Buy Now" detected. PASS.

**Logical next step for B2B buyer:** The CTA correctly routes to OEM consultation or product catalog — the two paths a procurement manager would naturally take after reading a generational comparison. PASS.

---

## Part 2: Schema Markup Audit — Score: 78/100

### Schema Coverage Matrix

| Schema Type | Present? | Issues |
|-------------|:--------:|--------|
| Organization | ✅ | Standard WOWOHCOOL org node |
| WebSite | ✅ | Standard |
| BreadcrumbList | ✅ | 3 items, correct positions |
| BlogPosting | ✅ | headline, description, datePublished, dateModified, wordCount all present |
| Person (Author) | ✅ | LinkedIn URL, jobTitle, knowsAbout (8 topics) |
| FAQPage | ✅ | 10 questions (exceeds the 5-8 recommended range — acceptable) |
| HowTo | ⚠️ | 3 steps present but **contains a contradiction** (see Part 3) |
| SpeakableSpecification | ✅ | cssSelector: ["h1", ".speakable"] |
| ManufacturingBusiness | ❌ | Only Organization, no ManufacturingBusiness subtype |

### Schema Quality Issues

| # | Issue | Severity | Detail |
|---|-------|----------|--------|
| S1 | HowTo lists GaN IV as a valid option | 🔴 CRITICAL | Step 1 text: "GaN IV (2023-2024): mainstream 100W, 93-95%." But article body Section 2 states GaN IV "never reached consumer-grade volume" and is "irrelevant to charger BOMs." Direct contradiction. |
| S2 | FAQ Q5 answers "Yes." to a non-yes/no question | 🟡 MODERATE | Question: "What is the GaN FET price trend forecast for OEM procurement?" Answer starts: "Yes. GaN FET prices..." — the "Yes." prefix makes no grammatical sense. Remove. |
| S3 | FAQ Q6/Q7 contain promotional boilerplate not in body FAQ | 🟡 MODERATE | Schema: "WOWOHCOOL has served 200+ global brands since 2013 with a defect rate below 0.3%." Body FAQ (lines 610-611): No such text. Schema should match body. |
| S4 | FAQ Q2 pricing ($8-12) conflicts with body table ($7-9) | 🔴 CRITICAL | "GaN V 65W charger ~$8-12/unit" in schema FAQ vs "$7-9" in comparison table at same volume (1,000 units). See Part 3 for full cross-reference analysis. |
| S5 | FAQ Q4 MOQ: Schema says 2,000, body says 3,000+ | 🔴 CRITICAL | Schema: "Custom OEM designs with tooling start at 2,000 units." Body (line 608): "Custom OEM with tooling: MOQ 3,000+ units." Different numbers. |

### Pre-Commit Checklist Verification

| Check | Status |
|-------|:------:|
| H1 contains B2B signal word + 50-65 chars | ✅ 61 chars, "OEM", "Factory" |
| >=2 H2s contain B2B signal words | ✅ 5 of 12 |
| HowTo Schema added (process article) | ✅ But with GaN IV contradiction |
| Image alt text contains B2B keywords | ✅ 4 of 6 images have B2B keywords |
| dateModified updated | ✅ 2026-07-25 |
| wordCount updated | ✅ 4400 |
| >=2 external authority links (rel="noopener noreferrer") | ✅ Sources section has 4 |
| >=3 internal links to product/service/related | ✅ 15+ internal links |
| FAQ questions use B2B procurement language | ✅ 8 of 10 |

---

## Part 3: Cross-Reference Consistency Audit — Score: 55/100

### Pricing Inconsistencies

| Data Point | Location A | Value A | Location B | Value B | Match? |
|------------|-----------|---------|-----------|---------|:------:|
| GaN V 65W FOB (1,000 pcs) | Comparison table (line 534) | $7-9 | FAQ Q2 Schema (line 267) | $8-12 | ❌ |
| GaN III 65W FOB (1,000 pcs) | Comparison table (line 534) | $5-7 | FAQ Q2 Schema (line 267) | $5-8 | ❌ (minor) |
| GaN V BOM premium | Section 5 (line 515) | 20-35% over GaN I | FAQ Q2 Schema (line 267) | 20-35% over GaN III | ⚠️ Different baseline |
| Custom OEM MOQ | Schema FAQ Q4 (line 284) | 2,000 units | Body FAQ Q4 (line 608) | 3,000+ units | ❌ |

### Structural Contradictions

| Issue | Location | Detail |
|-------|----------|--------|
| **GaN IV presented as valid option in HowTo** | HowTo Schema Step 1 (line 216) | "GaN IV (2023-2024): mainstream 100W, 93-95%." |
| **GaN IV declared non-commercial in body** | Section 2 (line 450) | "GaN IV covers experimental integrated GaN + driver IC monolithic designs that never reached consumer-grade volume." |
| **Impact** | — | User who reads the article learns GaN IV is irrelevant, but the HowTo structured data tells search engines GaN IV is a "mainstream" option. This is a trust signal problem for both users and Google. |

### Promo Text Consistency

| FAQ Question | Schema Answer | Body Answer | Match? |
|-------------|---------------|-------------|:------:|
| Q6 (e-mode vs cascode) | Contains "...WOWOHCOOL has served 200+ global brands..." | No promo text | ❌ |
| Q7 (skipped generations) | Contains "...WOWOHCOOL has served 200+ global brands..." | No promo text | ❌ |

---

## Part 4: E-E-A-T Signal Assessment

### Experience (First-Hand) — Score: 78/100

- **Factory images:** SMT production line, Chroma load testing, PCBA inspection — real, verifiable. ✅
- **First-party measurements:** Thermal data (58C vs 83C), switching frequency (5MHz+), size reduction (50%). Partially first-party. ⚠️
- **Missing:** No first-party lab measurement citing specific test equipment and conditions (e.g., "Our GaN V 65W measured 94.7% efficiency on Chroma 63600 at 230V/50Hz, 25C ambient").
- **Real-world examples:** 3 anonymized case studies (mid-sized brand, outdoor gear brand, European distributor). Credible structure but anonymous. ⚠️

### Expertise — Score: 85/100

- **Author bio:** Nina Nico, Supply Chain Expert, 10+ years, CSCP certified, degree in International Trade. ✅
- **Schema knowsAbout:** 8 topics including "GaN Chargers", "OEM Sourcing", "Quality Assurance", "Regulatory Compliance". ✅
- **LinkedIn URL:** Present in both body and Schema. ✅
- **Job title in Schema:** "Sales Manager". For a technical article, "OEM Technical Lead" (used in Expert Insight block) would better match. Low priority.

### Authoritativeness — Score: 82/100

- **External citations:** Yole Group, USB-IF, Navitas, Innoscience, Semiconductor Today. ✅
- **Organization Schema:** Complete with address, sameAs, contactPoint. ✅
- **Missing:** No explicit mention of industry memberships (USB-IF member? WPC member?). 

### Trustworthiness — Score: 80/100

- **Transparency:** FOB pricing disclosed by generation. ✅
- **Contact:** Multiple CTAs with clear contact paths. ✅
- **Acknowledged limitations:** GaN II/IV explained as non-commercial — honest about what doesn't exist. ✅
- **Verification methodology:** 5-step supplier verification — actionable, not just claims. ✅

---

## Part 5: Minor Formatting & Polish Issues

| # | Issue | Location | Fix |
|---|-------|----------|-----|
| F1 | Expert Insight attribution starts with bare comma | Line 529 | `, Nina Nico, OEM Technical Lead at WOWOHCOOL` → `— Nina Nico, OEM Technical Lead at WOWOHCOOL` |
| F2 | Missing `rel="noreferrer"` on in-content external links | Lines 464, 509, 551, 552 | Add `noreferrer` alongside existing `noopener` |
| F3 | H2 "GaN VI &amp; SiC Hybrid" uses HTML entity in source | Line 579 | Not a rendering issue, but `&amp;` in H2 source is unusual — `&` would suffice |
| F4 | Duplicate `@context` declaration in FAQPage schema block | Line 246 | FAQPage has its own `"@context": "https://schema.org"` while parent @graph already declares it. Not invalid JSON-LD but redundant. |

---

## Part 6: Priority Action Items

### P0 — Fix Immediately (Data Integrity)

| # | Action | Location | Effort |
|---|--------|----------|:------:|
| P0-1 | **Remove GaN IV from HowTo Schema** or align with body text. Replace "GaN IV (2023-2024): mainstream 100W, 93-95%" with GaN III as the mid-tier option. | HowTo Schema Step 1 (line 216) | 2 min |
| P0-2 | **Fix FAQ Q2 pricing** to match comparison table. Change schema Q2 from "$8-12/unit" to "$7-9/unit" for GaN V 65W at 1,000 pcs. Also update GaN III from "$5-8" to "$5-7". | Schema FAQ Q2 (line 267) | 2 min |
| P0-3 | **Fix FAQ Q4 MOQ discrepancy.** Unify to one number. Recommended: 3,000+ (body value) since it's more conservative and matches HowTo "Custom OEM with tooling: MOQ 3,000+ units". | Schema FAQ Q4 (line 284) | 1 min |

### P1 — Fix This Week (Schema Quality)

| # | Action | Location | Effort |
|---|--------|----------|:------:|
| P1-1 | Remove "Yes." prefix from FAQ Q5 Schema answer. Change to: "GaN FET prices have been declining 10-15% annually..." | Schema FAQ Q5 (line 291) | 1 min |
| P1-2 | Remove promotional boilerplate from Schema FAQ Q6 and Q7 (or add matching text to body FAQ). Either align schema with body or body with schema. | Schema FAQ Q6 (line 300), Q7 (line 308) | 3 min |
| P1-3 | Add `rel="noreferrer"` to in-content external links (Wikipedia, USB-IF, Navitas, Innoscience). | Lines 464, 509, 551, 552 | 2 min |

### P2 — Polish (This Month)

| # | Action | Effort |
|---|--------|:------:|
| P2-1 | Fix Expert Insight attribution comma (line 529): `, Nina Nico` → `— Nina Nico` | 1 min |
| P2-2 | Add B2B keywords to test equipment image alt text (line 556) and PCBA image alt text (line 562) | 2 min |
| P2-3 | Differentiate Factory Stat block with GaN-specific first-party measurement (e.g., "Our GaN V 65W PCBA measured 94.7% efficiency at 230V/50Hz on Chroma 63600") | 5 min |
| P2-4 | Consider adding efficiency curve or price-decline data visualization chart | 30 min |

---

## Part 7: Comparison to Prior Audits

### vs B2B MASTER SUMMARY (2026-07-23)

| Metric | 7/23 | 8/2 (This Audit) | Delta |
|--------|:----:|:----:|:-----:|
| B2B Score | 96.5 | 92 (approximate) | -4.5 |
| InfoGain | 68 | 70 | +2 |
| Composite | 82.3 | 76 | -6.3 |

**Explanation for composite decline:** The 7/23 automated auditor gave high B2B structural scores that did not detect the cross-reference contradictions discovered in this manual audit. The HowTo Schema vs body contradiction (GaN IV listed as mainstream) and pricing inconsistencies are objective regressions relative to what the B2B Quality Standard requires.

### vs GEO CITABILITY (2026-07-20)

| Metric | 7/20 | 8/2 Assessment | Status |
|--------|:----:|:-------------:|:------:|
| Answer Block Quality | 90 | 90 | Unchanged |
| Passage Self-Containment | 90 | 85 | Slightly down (cross-ref issues weaken self-containment) |
| Structural Readability | 86 | 88 | Improved (more sections mapped to decision chain) |
| Statistical Density | 84 | 84 | Unchanged |
| Uniqueness | 88 | 88 | Unchanged |
| **Overall** | **88** | **87** | Essentially unchanged |

### vs EN BLOG B2B AUDIT (2026-07-13)

The 7/13 audit scored this article at 76/100 (B-). Key issues flagged then that have been addressed:
- B2B language in headings: Improved (5 of 12 H2s now have B2B signals vs fewer previously)
- Schema coverage: Still strong (all 7 types present)

Key issues flagged then that remain:
- Factory Stat block still generic (credibility anchor fatigue — unresolved)
- No data visualization charts (unresolved)

---

## Part 8: Final Assessment

### What This Article Does Exceptionally Well

1. **GaN FET part number mapping** — the definitive reference table that zero SERP competitors provide. This alone justifies the article's existence and its high citability.
2. **FOB pricing transparency** — specific dollar ranges by generation and volume make this immediately useful for procurement.
3. **e-mode vs cascode architecture explanation** — uniquely deep technical content that Claude and Perplexity are primed to cite.
4. **Supplier verification framework** — actionable, methodology-based, not just marketing claims.
5. **Structural completeness** — TOC, comparison table, FAQ, Author Bio, CTA, Sources, Related Articles — all present and well-formed.

### What Needs Immediate Attention

1. **HowTo Schema contradicts article body** (GaN IV = non-commercial per body, "mainstream" per schema). This is the most serious finding — it creates a trust gap between what the article teaches and what structured data tells search engines.
2. **Pricing numbers differ between FAQ Schema and comparison table** — simple data drift that undermines the article's precision claims.
3. **MOQ number differs between FAQ Schema and body FAQ** — same data drift issue.

### Overall Verdict

The article's core value (Information Gain from FET part numbers, pricing, thermal data, verification methodology) is intact and world-class. The issues discovered are surface-level data consistency problems in Schema markup, not content quality problems. All P0 fixes combined take under 5 minutes and will restore this article to its proper standing as a top-5 performer.

**Bottom line:** A top-6 article that needs 5 minutes of Schema cleanup, not a rewrite.

---

*Audit performed manually against B2B Blog Quality Standards 2026 (v2026-07-13). Cross-referenced against 3 prior audits (B2B MASTER SUMMARY 2026-07-23, GEO CITABILITY 2026-07-20, EN BLOG B2B AUDIT 2026-07-13).*
