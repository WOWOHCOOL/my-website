# B2B Audit → GEO Citability Scoring Bridge

Maps B2B content audit results (from `b2b_content_auditor.py` + `information_gain_analyzer.py`) to the 9 GEO citation methods used by the `geo-citability` skill and Princeton GEO research framework.

**Purpose**: When running `geo-citability` on a B2B page, use the B2B audit scores to inform and adjust GEO scoring. The B2B audit provides domain-specific signal strength data that generic GEO scoring cannot detect.

---

## Scoring Map

| B2B Audit Check | Maps to GEO Method | Adjustment Logic |
|----------------|-------------------|-----------------|
| **Opening Density** | Authoritative Tone (+25%) | Score ≥80 → +5 GEO; Score <40 → -10 GEO (fluff opening signals low authority) |
| **TL;DR Block** | Easy-to-Understand (+20%) | Present → +5 GEO (structured summary aids AI extraction) |
| **H3 Answer Length** | Easy-to-Understand (+20%) + Fluency (+15-30%) | Compliance ≥70% → +8 GEO; <50% → -5 GEO |
| **Vague Heading Detection** | Authoritative Tone (+25%) | Score ≥90 → +3 GEO; <50 → -8 GEO (label headings signal generic content) |
| **H2 B2B Signal Density** | Unique Words (+15%) + Technical Terms (+18%) | In target range → +5 GEO; out of range → -5 GEO |
| **First-Hand Data Density** | Statistics Addition (+37%) | Score ≥80 → +10 GEO; <40 → -15 GEO (single largest GEO impact) |
| **Table Test** | Easy-to-Understand (+20%) | Tables present → +5 GEO; params outside tables → -5 GEO |
| **Stock Photo Detection** | Authoritative Tone (+25%) | Stock photos detected → -10 GEO (undermines authenticity) |
| **FAQ B2B Language** | FAQPage Schema (+40%) + Unique Words (+15%) | B2B language ≥70% → +8 GEO; consumer language detected → -5 GEO |
| **Author E-E-A-T** | Quotation Addition (+30%) + Authoritative Tone (+25%) | Score ≥80 → +8 GEO; <40 → -10 GEO |
| **Weak CTA Detection** | Authoritative Tone (+25%) | Weak CTAs → -3 GEO; strong B2B CTAs → +3 GEO |

---

## Information Gain → GEO Scoring

The Information Gain score from `information_gain_analyzer.py` provides a direct input to 3 GEO methods:

| Information Gain Result | GEO Impact |
|------------------------|-----------|
| **Mode A: Avg Jaccard Similarity** | If <0.4 → +10 Unique Words + +5 Authoritative Tone |
| **Mode A: Unique Entity Ratio** | If >0.3 → +8 Technical Terms |
| **Mode B: Technical Anchor Count** | If ≥8 → +8 Technical Terms + +5 Statistics |
| **Mode B: B2B Vocabulary Diversity** | If ≥6 → +10 Unique Words |
| **Overall IG Level = "high"** | Composite +15 GEO adjustment across all methods |
| **Overall IG Level = "zero"** | Composite -25 GEO — page likely suppressed by Google |

---

## Composite B2B → GEO Score Formula

When both audits are available, the GEO citability composite can be refined:

```
GEO_Composite_Refined = GEO_Composite_Raw + B2B_GEO_Adjustment

Where B2B_GEO_Adjustment =
    (Data_Density_Score - 50) * 0.15 +
    (Author_EEAT_Score - 50) * 0.10 +
    (FAQ_B2B_Score - 50) * 0.08 +
    (H2_Density_In_Range ? +5 : -5) +
    (Has_TLDR ? +5 : 0) +
    (Has_Tables ? +5 : -5) +
    (Stock_Photos_Detected ? -10 : 0) +
    (IG_Level == 'high' ? +15 : IG_Level == 'zero' ? -25 : 0)
```

---

## Usage in Practice

### When running `geo-citability` on a B2B page:

1. **First**, run the B2B audit:
   ```bash
   python data_sources/modules/b2b_content_auditor.py [file]
   python data_sources/modules/information_gain_analyzer.py [file]
   ```

2. **Then**, when interpreting GEO citability scores, apply the adjustments from this bridge:
   - If B2B Data Density is 90/100 → increase GEO "Statistics Addition" score by ~10 points
   - If Author E-E-A-T is 20/100 → decrease GEO "Authoritative Tone" by ~10 points
   - If Information Gain is "zero" → decrease overall GEO composite by ~25 points

3. **The B2B audit catches domain-specific quality signals that generic GEO scoring misses:**
   - A page can score 85/100 on GEO (good structure, good schema, good fluency) but 40/100 on B2B (no TL;DR, stock photos, consumer FAQ language, weak data density)
   - The B2B score tells you: "This page is well-structured for AI, but its content is not credible to procurement buyers"

### When generating the GEO report:

Reference the B2B audit findings in the GEO report's recommendations section:
- "B2B audit detected X. Fixing this would improve both B2B buyer trust and AI citation likelihood."
- "Information Gain analysis shows X% overlap with SERP top 5. Adding unique factory data would increase both SEO ranking and AI citability."

---

## B2B GEO Content Patterns

Practical writing templates for B2B manufacturing, procurement, and OEM-ODM content that maximize AI citation rates. These patterns were originally in `aeo-geo-patterns.md` and moved here to keep B2B domain tactics separate from general SEO patterns.

### Key B2B Citation Signals That AI Models Prioritize

- Precise measurements with engineering units (°C, mV, kHz, Wh/kg, mm, A, W)
- Named standards references (IEC 62368-1, ISO 9001, EN 62368-1 Annex M.4)
- Named test equipment (Keysight E4980A, Tektronix, Fluke)
- Certification body names (TÜV Rheinland, SGS, Bureau Veritas)
- FOB/MOQ pricing data with specific dollar amounts
- Factory-floor observations with timestamps and conditions

### B2B First-Hand Data Citation Block

Factory data with precise measurements increases AI citation rates by 25-35% in procurement queries. Always include units and test conditions.

```markdown
[Measurement context]. During [test condition, duration], [specific metric] measured [value] [unit] at [condition]. Verified with [equipment model] per [standard reference].

**Example:**
During our 48-hour continuous 240W charger test, case temperature stabilized at 58.3°C under 100% load at 25°C ambient. Measured with Keysight E4980A LCR meter per IEC 62368-1 Section 5.4.2.
```

### B2B Compliance / Certification Citation Block

Standards references with lab/certification body names are high-trust signals for AI extraction.

```markdown
[Product/category] must comply with [standard number] per [regulation or market requirement]. [Certification body] verified [specific requirement] at [test condition] — [specific numeric result]. Non-compliance means [concrete business consequence for the buyer].

**Example:**
EN 62368-1 Annex M.4 requires a minimum creepage distance of 6.4mm for 140W chargers. TÜV Rheinland Lab #C-2026-0842 verified our PCBA design at 6.8mm under 85% RH at 40°C — a 0.4mm safety margin. Shipments failing this test face 100% rejection at EU customs.
```

### B2B Cost Transparency Citation Block

AI models preferentially cite content that includes specific pricing with trade terms and order quantities.

```markdown
[Product] [trade term] pricing at [order quantity]: [specific price]. This includes [what's included] but excludes [what's excluded]. Compared to [alternative/competitor benchmark], this represents [specific difference or saving].

**Example:**
140W GaN charger FOB Shenzhen pricing at MOQ 500: $12.50/unit including CE/GS certification and custom logo. Excludes shipping and import duties. Compared to the industry average of $15-18/unit at equivalent MOQ, this represents a 17-30% per-unit saving.
```

### B2B Procurement FAQ Pattern

B2B FAQ questions must use buyer/procurement language, not consumer language. AI models distinguish between "Which one is best?" (consumer, low citation value) and "What MOQ applies for OEM orders?" (B2B, high citation value).

```markdown
## Frequently Asked Questions

### What [trade term] applies for [product] [use case]?

[Direct answer with specific number/condition]. [Supporting context on why this matters for the buyer's decision].

### What [certification/standard] is required for [product] in [market]?

[Direct answer listing specific standards]. [Verification method or body].

### How does [buyer concern — cost/risk/time] compare between [Option A] and [Option B]?

[Direct answer with specific comparison data]. [Context on when to choose which].
```

**❌ Consumer FAQ language (do not use):**
- "Which power bank is the best?"
- "What is the cheapest option?"
- "Is this product good?"

**✅ B2B procurement FAQ language (use):**
- "What MOQ applies for OEM power banks with custom logo?"
- "What FOB pricing should importers expect for 140W GaN chargers?"
- "Which certifications are mandatory for EU charger imports in 2026?"

### B2B-Specific Domain Tactics

**Manufacturing/Factory Content:**
- Reference specific production line capabilities (SMT lines, injection molding tonnage, clean room class)
- Include factory square footage with production capacity (units/month)
- Name quality control protocols (AQL 2.5 per ISO 2859-1, first-article inspection, statistical process control)
- Mention engineer count and R&D capabilities

**Supply Chain/Logistics Content:**
- Use Incoterms precisely (FOB, CIF, DDP, EXW) — AI models recognize these as domain authority signals
- Include HS codes for customs classification
- Reference shipping timelines with port names (Shenzhen → Hamburg: 28-35 days)
- Mention landed cost breakdown (product cost + shipping + duties + customs brokerage)

**Certification/Compliance Content:**
- Always include the full standard number (not just "CE certified" but "CE marking per EN 62368-1")
- Name the certifying body and lab location
- State the specific test condition and threshold value
- Mention what happens if compliance fails (shipment rejection, recall, fine)

### B2B GEO Scoring Map

How B2B content signals map to the 9 GEO citation methods:

| GEO Method | B2B Signal | Example |
|------------|-----------|---------|
| Cite Sources (+40%) | Standards references, certification body reports | "Per IEC 62368-1 Section 5.4.2, verified by TÜV Rheinland" |
| Statistics Addition (+37%) | Factory measurements with units, BOM cost data | "58.3°C at 100% load, 4-hour aging test" |
| Quotation Addition (+30%) | Engineer testimony, client procurement manager quotes | "According to our Senior R&D Engineer with 12+ years in Shenzhen supply chain..." |
| Authoritative Tone (+25%) | Named author with credentials, factory-first voice | "By Jack Peng, Head of R&D at WOWOHCOOL" |
| Technical Terms (+18%) | PCBA ripple noise, GaN HEMT switching frequency, AQL sampling, BOM cost breakdown | Industry-specific engineering vocabulary |
| Unique Words (+15%) | OEM/ODM/FOB/MOQ/supply chain/procurement/importer | B2B signal word diversity across headings |
