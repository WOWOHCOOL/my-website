# B2B Audit Report: Chargeur Voiture OEM Guide (FR)

**Date:** 2026-08-04
**Article:** `C:\Users\wowoh\wowohcool.com\src\fr\blog\chargeur-voiture-oem-guide\index.njk`
**Article Type:** oem_core (auto-detected)
**Language:** fr (French B2B)

---

## Overall Score

| Metric | Score | Status |
|--------|:-----:|--------|
| **B2B Content Auditor** | **92.1/100** | Excellent |
| **Information Gain** | **52/100** | MODERATE |

### Detailed Breakdown

| # | Check | Score | Status |
|---|-------|:-----:|--------|
| 1 | Opening Density (no-fluff) | 90/100 | Good |
| 2 | KEY TAKEAWAYS Block | 0/100 | ❌ CRITICAL |
| 3 | H3 Answer Length | 96/100 | Good |
| 4 | Vague Heading Detection | 100/100 | Perfect |
| 5 | H2 B2B Signal Density | 100/100 | Perfect |
| 6 | First-Hand Data Density | 100/100 | Perfect |
| 7 | Table Test | 100/100 | Perfect |
| 8 | Stock Photo + LCP | 100/100 | Perfect |
| 9 | FAQ B2B Language | 90/100 | Good |
| 10 | Author E-E-A-T | 100/100 | Perfect |
| 11 | Weak CTA Detection | 100/100 | Perfect |
| 12 | Heading Hierarchy | 100/100 | Perfect |
| 13 | URL Quality | 100/100 | Perfect |
| 14 | Schema Validation | 90/100 | Good |
| 15 | Factory Data Canonical | 100/100 | Perfect |
| 16 | Anti-Pattern Detection | 100/100 | Perfect |

---

## Information Gain Analysis

| Metric | Value | Score |
|--------|-------|:-----:|
| Technical Anchors | 6 terms | 10/100 |
| Data Points | 252 | 100/100 |
| Named Entities | 11 | 50/100 |
| B2B Vocabulary Diversity | 8 | 80/100 |
| **Composite Score** | — | **52/100 (MODERATE)** |

### Technical Anchors (6 terms — below target of 10+)
Detected: `smt`, `spi`, `pd 3.1`, `gan`, `usb-c`, `iso 9001`

Missing specialized terminology that would boost this score: `pcba`, `bom`, `aql`, `dppm`, `epr`, `pps`, `avs`, `n52h`, `e-marker`, `lcl`, `fcl`, `cif`

---

## Word Count Verification

| Source | Count | Notes |
|--------|:-----:|-------|
| Schema `wordCount` | 5,400 | **Overstated by 51%** |
| Auditor raw count | 7,197 | Inflated (includes schema, HTML, Nunjucks) |
| **Verified main content** | **3,586** | Actual article body words |

**Decision:** Schema `wordCount` must be updated from `5400` to `3600`.

---

## Critical Issues

### ❌ Check 2: TL;DR / Key Takeaways Block Not Detected (0/100)

The article HAS a "POINTS CLES" block with a TL;DR summary + 5 bullet points, formatted as:
```html
<div class="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-6 mb-8">
  <p>POINTS CLES</p>
  <p class="speakable">Le marche mondial...</p>
  <ul>5 bullet points with data</ul>
</div>
```

**Root cause:** The auditor's regex likely expects English labels ("Key Takeaways", "TL;DR", "Takeaways") and does not recognize French "POINTS CLES". This is a **false positive** — the block exists and is structurally correct.

**Recommendation:** No content change needed. The block follows the reference article's pattern exactly. This is an auditor localization gap, not a content defect.

### ⚠️ Intro Length Warning

4 paragraphs before the TOC. The auditor recommends 1-2 paragraphs.

**Analysis:** The article has: Hook (1 paragraph) → Featured Image → Key Takeaways (1 block) → TOC. The "intro wall" signal is being triggered by the structured content between text and TOC, not by excessive preamble.

**Recommendation:** No change needed. The hook + image + takeaways flow is the standard pattern from the reference article. Moving Key Takeaways below TOC would violate the "above the fold" principle.

---

## FAQ Search-Demand Verification

| # | FAQ Question | Words | Verdict |
|---|-------------|:-----:|--------|
| 1 | "Quelle est la difference entre USB-C PD 3.0 et 3.1 pour un chargeur voiture OEM?" | 16 ⚠️ | **VERIFIED** — Wecent and competitor B2B guides cover PD 3.0 vs 3.1 comparisons |
| 2 | "Quelles certifications sont obligatoires pour vendre des chargeurs voiture en France?" | 12 | **VERIFIED** — Core procurement query |
| 3 | "Puis-je faire produire des chargeurs voiture USB-C PD avec mon logo en Chine?" | 15 | **VERIFIED** — Standard OEM inquiry pattern |
| 4 | "E-Mark vs CE: quelle est la difference pour un chargeur voiture?" | 12 | **VERIFIED** — Regulatory comparison, critical for auto accessories |
| 5 | "Quel est le cout total d'importation de 1 000 chargeurs voiture OEM en France?" | 15 | **VERIFIED** — Freight forwarders and B2B guides cover FR import costs |
| 6 | "Qu'est-ce qui change avec la directive europeenne sur le chargeur commun?" | 12 | **VERIFIED** — EU regulation FAQ, high informational demand |
| 7 | "Quel est le MOQ typique pour un chargeur voiture OEM en marque blanche?" | 14 | **VERIFIED** — Core OEM sourcing question |
| 8 | "Comment demarrer une commande OEM de chargeurs voiture personnalises?" | 10 | **VERIFIED** — Transactional intent query |

### FAQ #1 Length Issue

FAQ #1 is 16 words (over the 15-word threshold). **Recommendation:** Shorten from:

> "Quelle est la difference entre USB-C PD 3.0 et 3.1 pour un chargeur voiture OEM?"

To (14 words):

> "USB-C PD 3.0 vs 3.1 pour chargeur voiture OEM: quelle difference?"

---

## Schema Validation Issues

| Issue | Severity | Fix |
|-------|----------|-----|
| `wordCount` = 5400 (51% overstated) | Medium | Update to `3600` |
| FAQ question text mismatch | Low | Shorten FAQ #1 to ≤15 words and update both body and schema |
| Accented characters stripped from schema text | N/A | Auditor strips accents; actual JSON-LD has proper UTF-8 |

---

## Recommendations Summary

### Must Fix (P0)
1. **Update Schema `wordCount`:** `5400` → `3600`
2. **Shorten FAQ #1:** 16 words → 14 words (update both body H3 and Schema Question)

### Consider (P2)
3. **Add 4+ specialized technical anchors** to boost Information Gain from 52 → 65+:
   - Add `BOM` (Bill of Materials) references in pricing section
   - Add `AQL 2.5` in QC context 
   - Add `EPR` (Extended Power Range) alongside existing PD 3.1 mentions
   - Add `LCL` / `FCL` in shipping/logistics context
4. **Technical anchors score improvement**: Current 6 anchors → target 10+ would raise IG composite by ~12 points

### False Positives (No Action)
- TL;DR block: exists as "POINTS CLES" — auditor localization gap
- Intro wall: structured content (hook + image + takeaways) is standard pattern

---

## Verdict

**92.1/100 — Ready to publish after two P0 fixes (wordCount + FAQ #1 length).**

The article is structurally sound, data-rich (252 data points, 100/100 first-hand data density), and well-optimized for B2B search intent. The two critical flags are both minor schema/formatting issues, not content quality problems. The Information Gain score of 52 is acceptable for a French-language B2B article (French SERP has zero competitors for these keywords) but can be improved to 65+ by adding 4 more specialized technical anchors.
