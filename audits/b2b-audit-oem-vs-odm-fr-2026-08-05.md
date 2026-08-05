# B2B Audit Report: OEM vs ODM Guide FR

**File**: `drafts/oem-vs-odm-fr-2026-08-05.md`
**Date**: 2026-08-05
**Article Type**: procurement (auto-detected)

---

## Overall: 87.1/100 — Grade B (Good)

| Dimension | Score | Status |
|-----------|:-----:|--------|
| Content Quality (1-4) | 90.0 | ✅ |
| Structure & SEO (5-8) | 100.0 | ✅ |
| Trust & Conversion (9-11) | 58.5 | ⚠️ |
| Technical & Consistency (12-16) | 86.0 | ⚠️ |

---

## Per-Check Breakdown

| # | Check | Score | Flag |
|---|-------|:-----:|------|
| 1 | Opening Density | 60/100 | ⚠️ First 3 sentences didn't register as "direct conclusion" — may be due to French language detection |
| 2 | TL;DR Block | 100/100 | ✅ |
| 3 | H3 Answer Length | 100/100 | ✅ |
| 4 | Vague Headings | 100/100 | ✅ |
| 5 | H2 B2B Density | 100/100 | ✅ |
| 6 | Data Density | 100/100 | ✅ 59 data points in 2,677 words |
| 7 | Table Test | 100/100 | ✅ 6 tables |
| 8 | Stock Photo | N/A | — No images in markdown draft |
| 9 | FAQ B2B Language | N/A | — Auditor expects HTML FAQ markup |
| 10 | Author E-E-A-T | **17/100** | 🔴 Missing: credentials, LinkedIn, compact author bar |
| 11 | CTA | 100/100 | ✅ |
| 12 | Heading Hierarchy | 100/100 | ✅ |
| 13 | URL Quality | 100/100 | ✅ |
| 14 | Schema Validation | **40/100** | 🔴 No JSON-LD block found (expected in .njk only) |
| 15 | Cross-Reference | N/A | — Need both TL;DR and FAQ |
| 16 | Factory Data Canonical | 90/100 | ✅ Minor: one data point off? |
| 17 | Static HTML Quality | 100/100 | ✅ |
| 18 | Anti-Pattern | 100/100 | ✅ |

---

## Information Gain: 65/100 (Moderate)

| Component | Score |
|-----------|:-----:|
| Technical Anchors | 19/100 (4 terms — need ≥10) |
| Data Points | 100/100 (59 data points) |
| Named Entities | 100/100 (8 entities) |
| B2B Vocabulary | 70/100 (7 terms) |

---

## Word Count: 2,677 (verified)

---

## Critical Fixes Needed

### 1. Author E-E-A-T (17 → target 100)
The markdown frontmatter has author info but not in the structured format the auditor expects. Fix at .njk conversion:
- `jobTitle`: "Global Procurement & Sourcing Manager, 10+ ans dans le sourcing 3C"
- `sameAs`: LinkedIn URL
- Compact Author Bar HTML

### 2. Schema Validation (40 → target 100)
No JSON-LD in markdown draft. This is normal — will be added at .njk conversion with full 7-node @graph.

### 3. Technical Anchors (boost Information Gain: 65 → 75+)
Only 4 technical anchor terms detected. Add more domain vocabulary:
- "PCBA ripple noise testing"
- "creepage distance IEC 62368-1"
- "BOM cost breakdown GaN FET vs Si MOSFET"
- "AQL 2.5 per ISO 2859-1"
- "aging test 4-hour protocol"
- "HS code classification douane"

---

## Summary

The markdown draft scores 87.1 — solid B grade. The two low scores (Author 17, Schema 40) are artifacts of the markdown format — they'll resolve at .njk conversion. After conversion and fixing the technical anchors, the article should reach 92-95.
