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
