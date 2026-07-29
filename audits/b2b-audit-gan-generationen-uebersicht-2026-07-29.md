# B2B Content Audit — GaN Generationen 1–5

**Date**: 2026-07-29
**File**: `de/blog/gan-generationen-uebersicht/index.njk`
**Overall Score**: **91.6/100** ✅ Excellent

---

## Score Breakdown

| # | Check | Score | Status |
|---|-------|:-----:|--------|
| 1 | Opening Density (no-fluff) | 60/100 | ⚠️ |
| 2 | TL;DR Block | 100/100 | ✅ |
| 3 | H3 Answer Length | 95/100 | ✅ |
| 4 | Vague Heading Detection | 100/100 | ✅ |
| 5 | H2 B2B Signal Density | 100/100 | ✅ |
| 6 | First-Hand Data Density | 100/100 | ✅ |
| 7 | Table Test | 100/100 | ✅ |
| 8 | Stock Photo Detection | 75/100 | ⚠️ |
| 9 | FAQ B2B Language | 52/100 | ⚠️ |
| 10 | Author E-E-A-T Audit | 83/100 | ⚠️ |
| 11 | Weak CTA Detection | 100/100 | ✅ |
| 12 | Heading Hierarchy | 100/100 | ✅ |
| 13 | URL Quality | 100/100 | ✅ |
| 14 | Schema Validation | 100/100 | ✅ |
| 15 | Cross-Reference Consistency | N/A | — |
| 16 | Factory Data Canonical | 100/100 | ✅ |
| 17 | Static HTML Quality | 100/100 | ✅ |

---

## Critical Issues Fixed (Pre-Audit)

| # | Issue | Fix | Status |
|---|-------|-----|:------:|
| 1 | `wordCount` 3400 vs actual 2248 | Corrected to 2248 in Schema | ✅ |
| 2 | Organization missing `logo` ImageObject | Changed to `{"@type":"ImageObject","url":"...","width":600,"height":60}` | ✅ |
| 3 | Speakable nodes: 4 (too many) | Removed `data-speakable` attributes, kept 2× `.speakable` (Hook + Key Takeaways) + H1 = 3 | ✅ |
| 4 | Citation count mismatch: Schema 3 vs body ~10 | Expanded `citation` array to 10 entries matching all visible sources | ✅ |
| 5 | FAQ count mismatch: Body 7, Schema 6 | Added missing FAQ "Warum gibt es keine GaN 2 und GaN 4 Ladegeräte im Handel?" | ✅ |

---

## Remaining Warnings

| # | Warning | Impact | Recommendation |
|---|---------|--------|----------------|
| 1 | 1/22 H3/H4 lack optimal answer length | Low | Review H3 sections for 60-500 char direct answers |
| 2 | 1/6 images flagged as stock photo | Low | Replace `gan-charger-800x800.webp` with real factory/lab photo |
| 3 | FAQ B2B vocabulary: 2/7 | Low | FAQ answers are technically B2B (PD 3.1, GS-Zeichen, TÜV) but auditor expects explicit procurement terms |
| 4 | Author E-E-A-T 83/100 (5/6) | Low | Compact author bar links to `#author-bio` not a dedicated author page — site-level limitation |

---

## Information Gain

- **Score**: 63/100 (MODERATE)
- **Technical Anchors**: 6
- **Data Points**: 289
- **Named Entities**: 81
- **B2B Vocabulary Diversity**: 7

---

## FAQ Search Demand Verification

| # | Question | Words | Verdict |
|---|----------|:-----:|---------|
| 1 | Was ist der Unterschied zwischen GaN 1 bis GaN 5? | 9 | ✅ Standard buyer FAQ |
| 2 | Sind GaNFast und GaNPrime eigene GaN-Generationen? | 7 | ✅ Critical procurement clarity |
| 3 | Warum gibt es keine GaN 2 und GaN 4 Ladegeräte im Handel? | 12 | ✅ Market education question |
| 4 | Welche GaN-Generation für 240W PD 3.1? | 6 | ✅ VERIFIED — strong B2B OEM demand (factory/supplier pages) |
| 5 | Brauche ich ein GS-Zeichen für GaN-Ladegeräte im DACH-Markt? | 9 | ✅ NICHE — legitimate DACH-specific query, zero search results but well-known market requirement |
| 6 | Wie erkenne ich ein echtes GaN-5-Ladegerät? | 7 | ✅ Procurement verification query |
| 7 | Welcher GaN-FET-Lieferant für DACH-Projekte? | 5 | ✅ Strategic sourcing question |

---

## Conclusion

**91.6/100 — Ready to publish.** All 5 critical Schema/structure issues resolved. Remaining warnings are minor (1 image swap, 1 H3 answer length, 2 FAQ vocabulary items). No blocking issues.
