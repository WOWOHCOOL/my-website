# Research Brief: Charge Rapide USB-C PD Guide — FR Blog

**Date**: 2026-07-17 | **URL**: `/fr/blog/charge-rapide-usb-c-pd-guide/`
**Status**: EXISTING (2026-03-24, modified 2026-07-08) | **Author**: Snowy May | **words**: "2800" (undercounted, ~3,500 actual)

---

## 0. GSC Performance Data

No GSC page data — consistent with other FR articles.

## 1. Assessment: PD 3.2 Angle = Unique, Missing France-Specific Layer

This is the **only article covering PD 3.2** across the entire ES/FR portfolio. The technical content (PD evolution table, 240W EPR devices, certification costs) is strong. But like all other FR articles, it lacks French regulatory depth.

## 2. France-Specific Local Market Research

### 🔴 Critical PD 3.2 Certification Details
- **SPR AVS mandatory for >27W** since PD 3.2 — adjustable voltage in 100mV steps
- **PD 3.1 certification grace period extended to March 2026** — after that, new projects must use PD 3.2
- USB-IF certification increasingly required by Amazon and major retailers

### 🔴 French Regulatory: Décret n° 2023-1271 (NOT in article)
- **ANFR** (Agence nationale des fréquences) = enforcement body — article doesn't mention
- **6 obligations**: USB-C port, USB PD for >15W, unbundling, pictograms, traceability, DEEE
- **Official sources**: Légifrance (legifrance.gouv.fr), Service-Public.fr
- **Sanctions**: ANFR market surveillance, product withdrawal, potential fines

### 🟡 French Market Data (NOT in article)
- French market: 380-420 M€, 28-35M units/year
- >90% imported, 75-80% from China
- GaN share: 20-25% volume, growing to 35-45% by 2028
- MDD (private label): 18-22% volume (Carrefour, Fnac Darty, Boulanger)
- Corporate channel: 10-12% volume, 8-10%/year growth

### 🟡 240W OEM Ecosystem (Partially in article)
- Shenzhen >70% of global charger production
- Wecent: MOQ 200 pcs, 15-30 day lead time
- Key differentiator for 240W sourcing: thermal management capability

---

## 3. Current Article Gaps & Execution Plan

| # | Gap | Edit Location | Words |
|---|-----|--------------|:-----:|
| 1 | dateModified + wordCount | Frontmatter + schema | — |
| 2 | Décret n° 2023-1271 + ANFR + 6 obligations | §4 (EU mandate) | +200 |
| 3 | French market data paragraph | Introduction or §5 | +100 |
| 4 | FOB pricing table | §6 (OEM from China) | +80 |
| 5 | DEEE Ecosystem/Ecologic detail | §7 (certifications) | +50 |
| 6 | HowTo schema (PD charger sourcing 6 steps) | Schema block | — |
| 7 | Fix /de/ links → /fr/ where available | Various | — |
| 8 | Add "Mis à jour" to date display | Hero section | — |

**Net new words: ~400-500**

## 4. Key French Data Points to Insert

### §4 — Décret 2023-1271 H3
"En France, la directive a été transposée par le décret n° 2023-1271 du 27 décembre 2023 et son arrêté d'application. L'ANFR (Agence nationale des fréquences) est chargée de la surveillance du marché. Six obligations pèsent sur l'importateur : port USB-C, USB PD pour >15W, vente découplée, pictogrammes normalisés, traçabilité, et enregistrement DEEE. Sources officielles : Légifrance et Service-Public.fr."

### §6 — FOB Pricing Table
From factory-data-panel.md: GaN 65W $5.00-7.00, 100W $7.50-10.50, 140W $12.50-17.00 at 1,000 units

### §7 — DEEE Detail
"En France, l'enregistrement DEEE est obligatoire via un éco-organisme agréé comme Ecosystem ou Ecologic. L'éco-contribution est calculée par unité mise sur le marché."
