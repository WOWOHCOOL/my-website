# B2B Audit Report: Powerbank Spezifikationen (DE)

**Date**: 2026-07-25
**File**: `src/de/blog/powerbank-spezifikationen/index.njk`
**Article Type**: `procurement` (auto-detected)
**Verified wordCount**: 2,986

---

## Overall Score: 76.2/100 → **Good**

| Change | Before | After |
|--------|--------|-------|
| Previous audit | 70.3 | — |
| Current audit | **76.2** | +5.9 pts (FAQ B2B language fix: 0→80) |

---

## Per-Check Breakdown

| # | Check | Score | Status |
|---|-------|-------|--------|
| 1 | Opening Density | 100/100 | ✅ |
| 2 | TL;DR / Key Takeaways | 0/100 | ⚠️ False positive* |
| 3 | H3 Answer Length | 75/100 | ⚠️ 4/16 H3s short |
| 4 | Vague Heading Detection | 100/100 | ✅ |
| 5 | H2 B2B Signal Density | 90/100 | ✅ |
| 6 | First-Hand Data Density | 100/100 | ✅ |
| 7 | Table Test | 100/100 | ✅ |
| 8 | Stock Photo Detection | 100/100 | ✅ |
| 9 | FAQ B2B Language | 80/100 | ✅ Fixed (was 0) |
| 10 | Author E-E-A-T | 17/100 | ⚠️ False positive* |
| 11 | Weak CTA Detection | 20/100 | ⚠️ False positive* |
| 12 | Heading Hierarchy | 100/100 | ✅ |
| 13 | URL Quality | 100/100 | ✅ |
| 14 | Schema Validation | 85/100 | ⚠️ Missing logo |
| 15 | Cross-Reference | N/A | — |

\* **False positive notes**: Auditor uses EN keyword patterns — "WICHTIGSTE ERKENNTNISSE" in DE is not detected as Key Takeaways block. Compact Author Bar, CTA gradient section, and Author LinkedIn all exist in current code but auditor misses DE-language variants.

---

## FAQ Search-Demand Verification

| # | FAQ Question | Verification | Verdict |
|---|-------------|-------------|---------|
| Q1 | Welche Powerbank-Kapazität eignet sich für OEM-Eigenmarken? | Alibaba: 10+ supplier pages, MOQ 50-500 ✅ | **VERIFIED** |
| Q2 | Welche Zertifizierungen müssen OEM-Importeure...? | EAR/CE/UN38.3 real compliance path ✅ | **VERIFIED** |
| Q3 | Nennkapazität vs. Nennleistung nach GB 47372-2026? | GB 47372-2026 is real mandatory standard Apr 2027 ✅ | **NICHE** — real but low search volume |
| Q4 | Li-Po vs. LiFePO4 vs. Semi-Solid-State — OEM-Marge? | CATL/BYD supply chain, Alibaba verified ✅ | **VERIFIED** |
| Q5 | BattDG 2026 Registrierungspflichten? | Stiftung EAR, OfH, AR requirements verified ✅ | **VERIFIED** |
| Q6 | Integriertes vs. separates Kabel — Stückkosten? | Amazon DE Bestseller data confirms ✅ | **VERIFIED** |

**5/6 VERIFIED, 1/6 NICHE** — no fabricated questions detected.

---

## Information Gain: 60/100 MODERATE

| Factor | Score | Detail |
|--------|-------|--------|
| Technical Anchors | 10/100 | 4 terms — target ≥10 (add: creepage distance, BOM cost, ripple noise, AQL sampling) |
| Data Points | 100/100 | 228 data points — excellent |
| Named Entities | 100/100 | 16 entities (CATL, BYD, IEC, WPC, etc.) |
| B2B Vocabulary Diversity | 60/100 | 6 unique B2B terms — target ≥10 |
| Word Count | 4,871 (raw) / 2,986 (verified) | Moderate for DE procurement guide |

---

## wordCount Verification

| Source | Count |
|--------|-------|
| Info Gain Analyzer (raw) | 4,871 |
| Verified (block content only) | **2,986** |
| Schema `wordCount` | 3,000 |
| Delta | 0.5% ✅ within tolerance |

---

## Real Issues to Fix

### 1. Schema: Missing `logo` ImageObject (REAL)
```json
"logo": {
  "@type": "ImageObject",
  "url": "https://www.wowohcool.com/image/wowohcool-logo-optimized.webp"
}
```

### 2. H3 Answer Length: 4/16 short (REAL)
4 H3 sections lack 60-500 char direct answers. Add Featured Snippet-optimized summaries after each.

### 3. Technical Anchors: Only 4 (REAL)
Add domain-specific German technical vocabulary:
- "Kriechstrecke" (creepage distance)
- "AQL-Stichprobenprüfung" (AQL sampling)
- "Stücklistenkosten" (BOM cost)
- "Ripple-Spannung" (ripple noise)

---

## What's Already Fixed (This Session)

| Fix | Status |
|-----|--------|
| Hero Header (gradient + author bar + breadcrumb) | ✅ |
| Key Takeaways (WICHTIGSTE ERKENNTNISSE) | ✅ |
| TOC format + text-white fix | ✅ |
| FAQ B2B language (0→80, 6 questions matching Schema) | ✅ |
| CTA gradient format (after Author Bio) | ✅ |
| Author Bio + Factory Footprint | ✅ |
| Expert Insight embedded in Section 4 | ✅ |
| Schema legalName + publishingPrinciples | ✅ |
| Related Articles gradient bar format | ✅ |
| Orange border deduplication | ✅ |

---

## Recommendation

| Factor | Value |
|--------|-------|
| **Priority** | Low — publishable with minor fixes |
| **Next Step** | Add Schema `logo` → re-audit → expected 80+ |
| **Long-term** | Add 6+ technical anchor terms for Info Gain boost |
