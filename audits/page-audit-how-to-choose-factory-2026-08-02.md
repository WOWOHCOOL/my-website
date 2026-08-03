# Page-Level B2B Audit: how-to-choose-factory

**Audit Date:** 2026-08-02
**Article:** `C:\Users\wowoh\wowohcool.com\src\blog\how-to-choose-factory\index.njk`
**Previous Audit:** 2026-07-23 (B2B 92.7, InfoGain 63, Composite N/A)

---

## 1. Gate Scores Table

| Gate | Weight | Score | Max | Status | Key Issue |
|------|--------|-------|-----|--------|-----------|
| **Gate 1: Anti-Repetition** | 10 | 7 | 10 | PASS | Minor WPC-verification repetition across sections |
| **Gate 2: Information Gain** | 30 | 19 | 30 | PASS | Strong first-party data but technical anchor score persistently low (11/100) |
| **Gate 3: Scannability (Structure)** | 25 | 13 | 25 | PASS | H2 B2B density 59.1% exceeds procurement range (30-55%); 9 consecutive B2B H2s violate adjacency cap; label-style H3s flagged |
| **Gate 4: Visual Authenticity** | 15 | 11 | 15 | PASS | Featured image missing `srcset` with 3 breakpoints |
| **Gate 5: CTA Relevance** | 10 | 7 | 10 | PASS | CTA heading uses `<h3>` instead of required `<h2>` |
| **Schema Compliance** | 10 | 5 | 10 | WARN | FOB cross-reference mismatch body vs schema; wordCount wrong; dateModified format inconsistency; citation count mismatch |
| **Overall** | **100** | **62** | **100** | **PASS (C-grade)** | Six P1 issues require fix before next publish |

### Comparison with 2026-07-23

| Metric | 2026-07-23 | 2026-08-02 | Delta |
|--------|------------|------------|-------|
| B2B Content Score | 88.9 | 62/100 (aggregated) | N/A (different scoring model) |
| InfoGain | 62 | ~63 (unchanged) | +1 |
| Heading Hierarchy | 100 | 100 | 0 |
| H2 B2B Density | 21.7% | 59.1% | +37.4% (overcorrection) |
| H3 Answer Length | 93 | ~93 | 0 |
| wordCount (schema) | 5000 | 5000 | STILL WRONG |
| dateModified (visible) | N/A | "Jun 12, 2026" vs schema "2026-07-25" | NEW MISMATCH |

**Verdict:** Since 2026-07-23, 5 new technical sections were added (S1-S5: Qi2, FOD, Coil, Thermal, SMT), which reversed the H2 B2B density problem from "too low" to "too high." The InfoGain remains at previous level. Several pre-existing data consistency issues remain unfixed.

---

## 2. Issues by Priority

### P0 -- Critical (Must Fix Before Next Publish)

#### P0-1: Body FAQ FOB pricing mismatches Schema FAQ [Data Consistency]

The visible body FAQ and JSON-LD Schema FAQ contain **different FOB prices** for the same products. AI crawlers reading both sources will see conflicting data -- this is the most dangerous type of schema error.

| Product | Body FAQ (line 1847) | Schema FAQ (line 321)|
|---------|---------------------|---------------------|
| Qi2 stand | $4.50-7.00 | $7.00-10.00 |
| Qi2 3-in-1 station | $8.00-15.00 | $12.00-16.00 |

**Consequence:** Google's structured data validator may flag this; AI engines (ChatGPT, Perplexity) that extract from Schema directly will cite different prices than the visible page -- undermining both trust and citation accuracy.

**Fix:** Align both sources to the single authoritative price range. Recommend using the *body* values ($4.50-7.00 for stand, $8.00-15.00 for 3-in-1) as these are more competitive and from the latest edit, then update the Schema FAQ JSON-LD to match exactly.

#### P0-2: `wordCount` in Schema is 5,000 -- actual is ~12,788 [Schema Accuracy]

The `wordCount` field in BlogPosting schema is hardcoded to `5000`, unchanged since original publish. Actual article body is approximately 12,788 words. Google Search Console may flag structured data accuracy issues when the declared count is off by >60%.

**Fix:** Replace `"wordCount": 5000` with the actual count (12,788) in JSON-LD line 141. The pre-commit checklist explicitly requires: "wordCount 更新为实际数值（整数，无引号）".

#### P0-3: Visible "Updated" date shows "Jun 12, 2026" but frontmatter `modified` is 2026-07-25 [Date Consistency]

Line 369: `<time datetime="2026-04-18">Apr 18, 2026</time> <span class="text-brandOrange font-bold">· Updated Jun 12, 2026</span>`
Frontmatter line 5: `modified: 2026-07-25`
Schema line 141: `"dateModified": "2026-07-25"`

The visible date on the page says "Jun 12, 2026" but both the frontmatter and schema say "July 25, 2026." Either the visible date was never updated, or the frontmatter was updated without changing the visible text.

**Fix:** Update the visible date at line 369 to `Jul 25, 2026` to match frontmatter and schema. Alternatively, update all three to today's actual modification date.

---

### P1 -- High (Fix This Cycle)

#### P1-1: H2 B2B density is 59.1% -- exceeds procurement target range of 30-55% [Heading Structure]

22 content H2s, 13 contain B2B signal words from the 15-word list. Density = 59.1%. Target for procurement/supply-chain articles: 30-55%.

Additionally, 9 consecutive H2s (#7 through #15) all contain B2B signal words -- violating the "No 3 consecutive H2s with same B2B word" adjacency cap (Rule A). The word "Factory" appears in H2 #5, #7, #8, #10, #14 -- 5 occurrences of a single B2B term (Rule B vocabulary rotation failure).

**New sections (S1-S5) contributed to this:** Sections 1-5 (Qi2 verify, FOD Testing, Coil Quality, Thermal Management, SMT Quality) were added after the 7-23 audit and are technically dense but carry no B2B signal words in their H2s -- which is correct for technical content. The over-density is in the legacy sections.

**Fix -- Option A (Recommended):** Re-title 4 technical/educational H2s to remove forced B2B prefixes:
- H2 #8: "How to Verify a Legitimate Factory" → "How to Verify Legitimacy: Business License, Documentation & Trade Records" (only if this section is educational; "Factory" here is semantically required)
- H2 #14: "Factory Visit Checklist" → "On-Site Visit Checklist: Production, QC & Documentation"
- H2 #10: "Factory QC: Understanding Quality Control Processes" → "Quality Control Processes: IQC to OQC Protocol"

This would bring density down to approximately 45-50%, within the procurement range.

**Fix -- Option B:** Add B2B signal words to the 5 new technical sections (S1-S5) by appending a B2B context phrase:
- H2 #1: "...Qi2 and WPC Membership for OEM Importers"
- H2 #2: "...FOD Testing Requirements for Factory Audits"
This would be the wrong direction -- these sections are technical, not procurement, and the standard says "If density too high: remove forced B2B prefixes from technical sections only."

#### P1-2: CTA section heading uses `<h3>` -- standard requires `<h2>` [Structure]

Line 1885: `<h3 class="text-2xl font-black text-white uppercase italic mb-4">Ready to Find Your Factory?</h3>`

Per Quality Standard IV (CTA Placement & Format): "**Heading**: Must use `<h2>` (not h3)."

**Fix:** Change `<h3>` to `<h2>` on line 1885. Ensure the styling is preserved (add `text-2xl` remains).

#### P1-3: Key Takeaways `speakable` class on wrapper, not on TL;DR paragraph [Speakable Dilution]

Line 399: `<div class="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-6 mb-8 speakable">`

The `.speakable` class is on the entire Key Takeaways wrapper div, which includes `<h2>Key Takeaways</h2>` + 4 long bullet points (~400 words total). AI engines will attempt to speak/TTS all of this content. The standard requires `.speakable` on a **single summary paragraph** (2-3 sentences) within the block, not the wrapper.

Additionally, this Key Takeaways block has NO TL;DR summary paragraph -- it jumps directly from the H2 heading to a bullet list. Per the standard:
```
<p class="...speakable">[2-3 sentence core conclusion]</p>
<ul>...</ul>
```

**Fix (two changes):**
1. Add a 2-3 sentence TL;DR paragraph between the `<h2>` and the `<ul>`, with class `speakable`
2. Remove `speakable` from the wrapper div

Example TL;DR: "Choosing a charger factory from China takes 12 weeks end-to-end: verify WPC membership, audit SMT lines via video tour, test 10-20 production samples, and negotiate MOQ 500 with 30/70 T/T terms. A $500 third-party audit prevents the average $47,000 loss from choosing a trading company -- the 88% of B2B platform suppliers that fail factory audits."

#### P1-4: Featured image missing `srcset` and `sizes` attributes [Core Web Vitals]

Line 386-393: The featured image has `width="2240" height="1260" loading="eager" decoding="async" fetchpriority="high"` but lacks `srcset` with 3 breakpoints and `sizes`.

Per check 17 (Featured Image srcset): "Missing = -15/ea."

**Fix:** Add `srcset` and `sizes`:
```html
srcset="/image/blog/cover-en/how-to-choose-factory.webp 800w,
        /image/blog/cover-en/how-to-choose-factory.webp 1200w,
        /image/blog/cover-en/how-to-choose-factory.webp 2240w"
sizes="(max-width: 800px) 100vw, (max-width: 1200px) 50vw, 2240px"
```

#### P1-5: `dateModified` in Schema lacks ISO 8601 time component [Schema Format]

Line 141: `"dateModified": "2026-07-25"` -- missing timezone offset.
Line 136: `"datePublished": "2026-04-18T00:00:00+00:00"` -- correct format.

**Fix:** Change to `"dateModified": "2026-07-25T00:00:00+00:00"` for format consistency.

#### P1-6: Breadcrumb Schema name ≠ visible breadcrumb text [Schema-Body Mismatch]

Schema BreadcrumbList (line 113): `"name": "Choosing a Factory"`
Visible breadcrumb (line 348): `<span>Factory Selection Guide</span>`

These must match exactly.

**Fix:** Align both to `"Factory Selection Guide"` or `"How to Choose a Factory"`.

---

### P2 -- Medium (Fix Within 2 Weeks)

#### P2-1: Schema `citation` array (3) undershoots visible Sources (4) [GEO Signal Loss]

Schema citations: WPC Member Directory, WPC Qi Products, ISO 9001 (3 items)
Visible Sources (line 1926): WPC, ISO, IEC, FCC (4 items)

Per check 19: Count mismatch = -10.

**Fix:** Add the 4th citation (IEC or FCC) to the Schema citation array. The IEC link is the stronger GEO signal since standards bodies have higher AI entity weight than government databases.

#### P2-2: Label-style H3s in multiple sections [Scannability]

Several H3s are vague labels that F-pattern readers will skip:

| Line | Current (Label) | Recommendation (Conclusion) |
|------|----------------|---------------------------|
| 452 | "Qi2 Certification: Key Facts" | "Qi2 Certification Adds 15-25% to Unit Cost but Reduces Return Rate from 8-15% to 2-5%" |
| 490 | "Cost Consideration" | "Qi2 Certification ROI: $0.50-1.00/unit Premium Saves 6-10% in Reverse Logistics" |
| 506 | "Expert Recommendation" | "FOD Algorithm Must Detect Metal Objects Within 2mm of Charging Surface" |
| 1180 | "Sample Evaluation Criteria" | "3-Point Sample Evaluation: 20% Appearance, 50% Functionality, 30% Documentation" |
| 1638 | "Price vs Quality Trade-offs" | "4 Cost-Cutting Traps That Reduce Efficiency by 10-15% Below Market Pricing" |

Previous audit (7-23) flagged: "Quality Control" and "Certifications" as label-style. These specific H3s may have been renamed in the 7-25 update, but the pattern persists in new sections.

#### P2-3: URL contains 2 stop words (how, to) [URL Quality]

Current URL: `/blog/how-to-choose-factory/`
Stop words detected: "how", "to"
Per audit standard: "Rewrite URL using: lowercase, hyphens only, <=5 meaningful words, no dates, no stop words."

**Note:** Changing the URL requires a 301 redirect from old to new. Recommended new URL: `/blog/charger-factory-selection/` (4 meaningful words, no stop words).

**Risk:** This is a P2 because URL changes carry SEO risk (temporary ranking fluctuation). Only change if the gain (cleaner URL) outweighs the risk of migration.

#### P2-4: Hook paragraph contains the "WOWOHCOOL" brand mention but no technical data anchor [Opening Quality]

The Hook (line 377-378) is strong for industry pain points but is entirely qualitative:
> "Wireless charging is no longer just about convenience, it is about heat management, protocol alignment, and FOD safety compliance..."

Missing: a specific data point, percentage, or temperature reference that makes this immediately quotable by AI.

**Compare with the standard's opening requirement:** "First 3 sentences must have: number + unit, B2B signal word, standard/regulation reference, first-hand experience, OR procurement context."

**Fix:** Add one specific metric to the Hook:
```
"...With Qi2.2 at 25W and Qi2 MPP becoming the baseline for OEM importers, 
factory coil alignment precision tolerances of ±0.3mm determine whether your 
product charges at 15W or drops to 5W on iPhones..."
```

---

## 3. Data Consistency Check

| Check | Status | Detail |
|-------|--------|--------|
| **datePublished** (frontmatter vs schema vs visible) | WARN | Frontmatter + schema: 2026-04-18. Visible: Apr 18, 2026. Match. |
| **dateModified** (frontmatter vs schema vs visible) | FAIL | Frontmatter: 2026-07-25. Schema: 2026-07-25. Visible: "Jun 12, 2026". MISMATCH (P0-3) |
| **wordCount** (schema vs actual) | FAIL | Schema: 5000. Actual: ~12,788. Off by 155% (P0-2) |
| **timeRequired** (schema vs visible) | PASS | Schema: PT14M. Visible: "14 min read". Match. |
| **FOB prices** (body FAQ vs schema FAQ) | FAIL | Qi2 stand: $4.50-7.00 vs $7.00-10.00. Qi2 3-in-1: $8-15 vs $12-16 (P0-1) |
| **Breadcrumb name** (schema vs visible) | FAIL | Schema: "Choosing a Factory". Visible: "Factory Selection Guide" (P1-6) |
| **Citation count** (schema vs visible) | FAIL | Schema: 3 citations. Visible: 4 sources (P2-1) |
| **FAQ Q&A wording** (body vs schema) | PASS | 6 questions match between body and schema FAQPage |
| **dateModified ISO format** (schema) | FAIL | Missing timezone: `"2026-07-25"` vs `"2026-04-18T00:00:00+00:00"` (P1-5) |
| **TOC anchors vs section IDs** | PASS | All 23 TOC links have matching section `id` attributes |
| **Speakable count** (BlogPosting + FAQPage) | WARN | 3 nodes (H1 + Hook + Key Takeaways wrapper), but Key Takeaways speakable covers 4 long bullets instead of TL;DR paragraph (P1-3) |
| **MOQ cross-reference** (body FAQ vs section 22) | PASS | Both say MOQ 500 for standard ODM, 3000+ for full OEM tooling |
| **5,000 sqm** consistency (Author Bio vs Factory Stat) | PASS | Both state 5,000 sqm |
| **Internal links >= 3** | PASS | 10+ internal links to product pages, related articles |
| **External links >= 2** | PASS | 8+ external links (WPC, ISO, IEC, FCC, SGS, etc.) all with `rel="noopener noreferrer"` |
| **hreflang tags** | PASS | en/de/es declared in frontmatter hreflang map, rendered by layout |
| **Schema JSON syntax** | PASS | JSON-LD block is syntactically valid |
| **RESPUESTA RAPIDA / Quick Answer** | PASS | Not present |

---

## 4. Comparison with 2026-07-23 Audit

### What Improved

| Area | 7-23 Status | 8-02 Status |
|------|------------|------------|
| Technical content depth | Moderate | **Strong** -- 5 new sections added: Qi2 verification, FOD testing, Coil quality, Thermal management, SMT quality |
| Real factory photos | Present | **More added** -- SMT line photo, coil structure diagram, module testing photo |
| First-hand data points | Good | **Maintained** -- factory stats, FOB pricing, MOQ tiers, audit costs all present |
| Key Takeaways block | Present | **Present** -- but structure needs fix (no TL;DR paragraph) |
| FAQ B2B language | 86/100 | **Likely same** -- 6 questions, all B2B procurement language |

### What Regressed

| Area | 7-23 Status | 8-02 Status |
|------|------------|------------|
| H2 B2B density | 21.7% (too low) | 59.1% (too high) -- overcorrection |
| Adjacency cap | PASS | **FAIL** -- 9 consecutive B2B H2s |
| Vocabulary rotation | PASS | **FAIL** -- "Factory" used in 5 H2s |
| dateModified consistency | Unknown | **FAIL** -- visible "Jun 12" vs schema "Jul 25" |

### What Remains Unfixed (Pre-Existing)

| Issue | 7-23 Flag | 8-02 Status |
|-------|-----------|-------------|
| wordCount = 5000 | Not flagged (but wrong) | Still 5000, actual ~12,788 |
| URL stop words (how, to) | Flagged as warning | Unchanged |
| 7/99 H3/H4 suboptimal answer length | Flagged | Likely unchanged |
| Label-style H3s | Flagged ("Quality Control", "Certifications") | New label-style H3s appeared in added sections |

---

## 5. Recommended Fixes with Exact Text

### Fix 1: Schema FAQ FOB Prices (P0-1)

**File:** `C:\Users\wowoh\wowohcool.com\src\blog\how-to-choose-factory\index.njk`
**Lines:** 318-321

Replace:
```json
"text": "At MOQ 500, FOB Shenzhen: Qi2 15W desktop pad $6.50-9.00/unit, Qi2 stand $7.00-10.00, Qi2 3-in-1 station $12.00-16.00, Qi2 magnetic car mount $8.00-12.00. Qi2 certification adds $0.50-1.00/unit vs non-certified. Qi2.2 25W adds $1.50-3.00/unit."
```

With (align to body FAQ values):
```json
"text": "At MOQ 500, FOB Shenzhen: Qi2 15W desktop pad ~$6.50-9.00/unit, Qi2 stand ~$4.50-7.00, Qi2 3-in-1 station ~$8.00-15.00, Qi2 magnetic car mount ~$8.00-12.00. Qi2 certification adds $0.50-1.00/unit vs non-certified. Qi2.2 25W adds $1.50-3.00/unit for upgraded coil and thermal ICs."
```

### Fix 2: wordCount Schema (P0-2)

**File:** `C:\Users\wowoh\wowohcool.com\src\blog\how-to-choose-factory\index.njk`
**Line:** 142

Replace:
```json
"wordCount": 5000,
```

With:
```json
"wordCount": 12788,
```

### Fix 3: Visible Updated Date (P0-3)

**File:** `C:\Users\wowoh\wowohcool.com\src\blog\how-to-choose-factory\index.njk`
**Line:** 369

Replace:
```html
<span class="text-brandOrange font-bold">· Updated Jun 12, 2026</span>
```

With:
```html
<span class="text-brandOrange font-bold">· Updated Aug 2, 2026</span>
```

And update frontmatter `modified:` and schema `dateModified:` to `2026-08-02`.

### Fix 4: Re-title 3 H2s to Reduce B2B Density (P1-1)

Replace:
- H2 #10 (line 847): `Factory QC: Understanding Quality Control Processes`
  → `Quality Control Processes: IQC, IPQC, FQC, OQC Protocol`

- H2 #14 (line 1052): `Factory Visit Checklist`
  → `On-Site Visit Checklist: Production, QC & Documentation`

- H2 #18 (line 1378): `Visit Requirements & Virtual Tours`
  → Keep as-is (no B2B signal word, correct for a practical guide section)

After these 2 changes: 11/22 = 50.0% (within procurement range 30-55%).

### Fix 5: CTA Heading h3 → h2 (P1-2)

**Line:** 1885

Replace:
```html
<h3 class="text-2xl font-black text-white uppercase italic mb-4">Ready to Find Your Factory?</h3>
```

With:
```html
<h2 class="text-2xl font-black text-white uppercase italic mb-4">Ready to Find Your Factory?</h2>
```

### Fix 6: Key Takeaways Speakable + TL;DR (P1-3)

**Lines:** 399-407

Replace:
```html
<div class="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-6 mb-8 speakable">
<h2 class="text-lg font-black uppercase text-amber-700 mb-3">Key Takeaways</h2>
<ul class="text-sm text-slate-700 space-y-2 list-disc pl-5">
```

With:
```html
<div class="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-6 mb-8">
<h2 class="text-lg font-black uppercase text-amber-700 mb-3">Key Takeaways</h2>
<p class="text-slate-700 leading-relaxed text-sm mb-4 speakable">Choosing a charger factory from China takes 12 weeks end-to-end: verify WPC membership, audit SMT lines via video tour, test 10-20 production samples, and negotiate MOQ 500 with 30/70 T/T terms. A $500 third-party SGS audit prevents the average $47,000 first-order loss from choosing a trading company -- the 88% of B2B platform suppliers that fail factory audits.</p>
<ul class="text-sm text-slate-700 space-y-2 list-disc pl-5">
```

### Fix 7: dateModified ISO Format (P1-5)

**Line:** 141

Replace:
```json
"dateModified": "2026-07-25",
```

With:
```json
"dateModified": "2026-08-02T00:00:00+00:00",
```

### Fix 8: Breadcrumb Name Alignment (P1-6)

**Line:** 113

Replace:
```json
"name": "Choosing a Factory",
```

With:
```json
"name": "Factory Selection Guide",
```

### Fix 9: Featured Image srcset (P1-4)

**Lines:** 386-393

Replace the `<img>` tag with:
```html
<img src="/image/blog/cover-en/how-to-choose-factory.webp"
     srcset="/image/blog/cover-en/how-to-choose-factory-800w.webp 800w,
             /image/blog/cover-en/how-to-choose-factory-1200w.webp 1200w,
             /image/blog/cover-en/how-to-choose-factory.webp 2240w"
     sizes="(max-width: 800px) 100vw, (max-width: 1200px) 50vw, 2240px"
     alt="How to choose a wireless charger factory in China - sourcing guide"
     title="Charger Factory Selection: 2026 OEM Sourcing &amp; Audit Guide"
     width="2240" height="1260"
     loading="eager"
     decoding="async"
     class="w-full rounded-3xl shadow-xl"
     fetchpriority="high">
```

*(Note: requires generating actual 800w and 1200w image variants if they don't exist.)*

---

## 6. Pre-Commit Self-Check (Post-Fix Validation)

After applying fixes, verify:

- [ ] H1 still contains B2B signal word (OEM) + 58 chars (within 50-65)
- [ ] H2 B2B density now 45-55% (after re-titling 2 H2s)
- [ ] No 3 consecutive H2s with same B2B word
- [ ] wordCount updated to 12,788 (integer, no quotes)
- [ ] dateModified updated to 2026-08-02 in frontmatter, schema, AND visible date
- [ ] Schema `dateModified` uses ISO 8601 format with timezone
- [ ] Body FAQ FOB prices match Schema FAQ exactly
- [ ] Key Takeaways has TL;DR paragraph with `.speakable` class
- [ ] CTA heading is `<h2>` (not `<h3>`)
- [ ] Breadcrumb visible name matches schema
- [ ] Citation array count matches visible Sources count
- [ ] Featured image has `srcset` with 3 breakpoints + `sizes`
- [ ] All images have descriptive alt text with B2B keywords
- [ ] FAQ questions use B2B procurement language
- [ ] >= 2 external links with rel="noopener noreferrer"
- [ ] >= 3 internal links to product/service pages
- [ ] Run `json.load()` on the schema block to verify syntax
- [ ] Grep for "RESPUESTA RAPIDA" / "Quick Answer" -- must return zero

---

## 7. Summary

The article has strong bones: excellent technical depth from 5 newly added sections on Qi2/FOD/Coil/Thermal/SMT, real factory photos, rich first-party pricing data (MOQ tiers, FOB ranges, audit costs), and competitive Information Gain against SERP top 5. The 6 FAQ questions are substantive and B2B-appropriate.

However, the 2026-07-25 update introduced a structural overcorrection (H2 B2B density flipped from "too low" to "too high"), and three P0 data-consistency issues (FOB price mismatch between body and schema, wrong wordCount, dateModified visibility mismatch) were either introduced or left unfixed. These must be resolved before the next publish cycle because AI engines and Google both parse schema and visible content independently -- conflicting data between the two is weighted as a trust-negative signal.

**Estimated total fix time:** ~30 minutes for the 6 P0+P1 fixes listed in Section 5.

---

*Audit generated by SEOMACHINE B2B Quality Gate Audit v3.0*
*Standards referenced: `b2b-blog-quality-audit-standard.md` (2026-07-30), `b2b-multilingual-metadata-standard.md`*
