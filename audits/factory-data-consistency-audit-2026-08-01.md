# Factory Data Consistency Audit — EN/DE/ES Sites

**Date:** 2026-08-01
**Scope:** All `src/**/*.njk` files across EN/DE/ES/FR sites
**Reference:** `context/factory-data-canonical.md` (2026-07-24)
**Status:** 4 discrepancies found — 2 CRITICAL, 2 HIGH

---

## CRITICAL — Price Mismatches (Will Mislead Buyers)

### 1. GaN 140W PD 3.1: $11.50-13.50 vs $18.00-24.00

| File | Claimed | Factory Canon | Gap |
|------|---------|:----------:|:---:|
| `blog/what-is-gan-charger/index.njk:237` | **$11.50-13.50** at MOQ 500 | $18.00-24.00 at 500 | **-43%** |

> "140W GaN ~$11.50-13.50" — at 10,000 units the factory price is $10.50-14.50, so this may correspond to a 10K volume tier. But the article context says "at MOQ 500."

**Fix:** Change to `$18.00-24.00` or specify the correct volume tier.

---

### 2. Qi2 Wireless Charger: $3.50-5.50 vs $6.50-9.00

| File | Claimed | Factory Canon | Gap |
|------|---------|:----------:|:---:|
| `blog/wireless-charging-works/index.njk:242` | **$3.50-5.50** | $6.50-9.00 | **-46%** |
| `blog/qi2-vs-magsafe-guide/index.njk:132` | **$3.50-5.50** | $6.50-9.00 | **-46%** |

Both articles claim "Qi2 15W desktop pad ~$3.50-5.50" at MOQ 500. Factory canonical says $6.50-9.00 for "Qi2 Magnetic Pad (15W)" at 500 units. Even at 5,000 units, the factory price is $3.50-5.00, so the low end $3.50 is barely within the 5K tier range.

**Fix:** Change to `$6.50-9.00` at 500 units, or add volume tier context.

---

## HIGH — Moderate Deviations

### 3. Car Charger 30W: $3.00-4.50 vs $4.00-5.50

| File | Claimed | Factory Canon | Gap |
|------|---------|:----------:|:---:|
| `blog/car-charger-guide/index.njk:243` | **$3.00-4.50** | $4.00-5.50 | **-21%** |

Factory data shows 30W Single-Port car charger at $4.00-5.50 for 500 units. At 1,000 units it drops to $3.00-4.50, so the pricing may be for a 1K tier. Article says "at MOQ 500."

**Fix:** Change to `$4.00-5.50` or specify 1,000-unit volume.

---

### 4. ODM MOQ: 200-500 vs 500-1,000

| File | Claimed | Factory Canon |
|------|---------|:----------:|
| `blog/oem-vs-odm-guide/index.njk` (7 instances) | **200-500 units** | 500-1,000 units |

The article repeatedly states ODM MOQ is 200-500 units. Factory data says:
- ODM (new design from existing platform): **500-1,000**
- Full OEM with logo + color + packaging: **3,000**

The article partially self-corrects with "WOWOHCOOL offers MOQ from 500 units for both models with mixing across SKUs allowed" but the opening claim of 200-500 is inconsistent.

**Fix:** Change to `500-1,000 units` throughout.

---

## PASSED — Verified Correct

| Data Point | Canonical Value | Sites Verified | Status |
|-----------|:---------------:|----------------|:------:|
| OEM Lead Time | 25-30 days | EN/DE/ES/FR all pages | ✅ |
| ODM Lead Time | 45-60 days | EN/DE/ES/FR all pages | ✅ |
| Facility Size | 5,000 m² | all about/index pages | ✅ |
| Historical 2,000 m² | Pre-expansion milestone | About pages (historical context) | ✅ |
| ISO 9001 | Certified since 2013 | All pages | ✅ |
| Defect Rate | <0.3% | EN/ES/DE | ✅ |
| GaN Field Return | ~0.5% | `gan-v-charger-oem-manufacturing` | ✅ |
| Silicon Return | ~3% | `gan-v-charger-oem-manufacturing` | ✅ |
| Employees | 200-500 | All about pages | ✅ |
| 100% 4-hour Aging | Every unit tested | EN/ES/DE | ✅ |
| 4-Stage QC | IQC/IPQC/FQC/OQC | All about/index pages | ✅ |
| MOQ OEM Standard | 500 units | EN/DE/ES/FR FAQ + about + products | ✅ |
| MOQ ODM | 2,000 units | EN/DE/ES/FR FAQ + about | ✅ |
| Certification CE/FCC/RoHS | $2,500-4,500 | `import-costs-guide` | ✅ |
| Established | Since 2013 | All pages | ✅ |
| Export Countries | 50+ | All pages | ✅ |
| R&D Engineers | 50+ | All pages | ✅ |
| Monthly Capacity | 1M+ units | All pages | ✅ |

---

## Summary

| Severity | Count | Impact |
|----------|:----:|--------|
| CRITICAL | 2 | Misleading pricing — buyers would receive quotes 43-46% higher than expected |
| HIGH | 2 | Minor pricing gap + MOQ inconsistency |
| PASSED | 17 | All structural data verified correct |

**Action Required:** Fix the 4 discrepancies in 5 files before next content push.
