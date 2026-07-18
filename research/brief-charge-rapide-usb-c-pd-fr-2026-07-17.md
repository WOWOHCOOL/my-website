# Research Brief: Charge Rapide USB-C PD — FR Blog

**Date**: 2026-07-17
**Target URL**: `/fr/blog/charge-rapide-usb-c-pd/`
**Article Status**: EXISTING — Optimization (published 2026-03-19, last modified 2026-06-23)
**Author**: Nina Nico
**Target Language**: French (France market)

---

## 0. GSC Performance Data

No GSC page data found — same as other FR articles.

---

## 1. Assessment: Strong Foundation, Missing France-Specific Depth

At 70KB / ~2,700 words (per schema, clearly undercounted — actual content is closer to 4,500) / 6 H2s / 8 FAQ / 7 product images / 5 external sources — this is a content-rich article. But it's **strong on global/USB-IF tech, weak on France-specific regulatory and market data**.

## 2. France-Specific Local Market Research (NEW)

### 🔴 Décret n° 2023-1271 — The French Transposition (NOT in Article)
- France transposed EU 2022/2380 via **décret n° 2023-1271 du 27 décembre 2023** + arrêté d'application
- Official source: **entreprendre.service-public.gouv.fr** (French government business portal)
- **NF EN IEC 62680-1-2** (USB PD) and **NF EN IEC 62680-1-3** (USB-C connector) — the French "NF" prefix matters
- Laptops: **28 avril 2026** deadline (already passed — this month!)

### 🔴 French Importer Obligations (NOT in Article)
| Obligation | Detail |
|-----------|--------|
| Port USB-C | Mandatory per NF EN IEC 62680-1-3 |
| USB PD | Mandatory for >15W fast charging per NF EN IEC 62680-1-2 |
| Unbundling | Must offer device without charger option |
| Pictograms | 2 mandatory: charger included/not + charge capacity with "USB PD" mention |
| Importer traceability | Name/address on product or packaging |
| RED directive compliance | DoC, technical documentation, CE marking |

### 🔴 French Market Data (NOT in Article)
| Metric | Value |
|--------|-------|
| Market size | 380-420 M€ retail (2025), 28-35M units/year |
| Import dependency | >90% imported, 75-80% from China |
| Growth | 6-9% CAGR value, 3-5% CAGR volume |
| GaN share | 20-25% of volume (2025), growing to 35-45% by 2028 |
| Multi-port share | >55% of volume |
| French households | 4.2 USB-C devices average |
| Amazon France | 18-22% of e-commerce |
| MDD (private label) | 18-22% of volume (Carrefour, Fnac Darty, Boulanger, E.Leclerc) |
| Corporate channel | 10-12% of volume, growing 8-10%/year |

### 🟡 French Certification & Logistics
| Detail | Value |
|--------|-------|
| USB-IF certification cost | 8,000-12,000 € per SKU |
| CE + NF surcoût | 10-15% added to landed cost |
| SH codes | 850440 (0-2% duty) or 854370 (4-6% duty) |
| Main ports | Le Havre, Rotterdam (hub) |
| DEEE registration | Ecosystem or Ecologic eco-organism |
| Product lifecycle | ~15 months (down from 24) |

---

## 3. Gaps vs Current Article

| Missing Element | Location to Add |
|----------------|-----------------|
| Décret n° 2023-1271 + NF standards | §6 (EU directive section) or new H3 |
| French importer obligations (6 requirements) | §5 (sourcing) or new H3 |
| French market data (380-420M€, GaN share, MDD) | §1 (introduction) or §6 |
| FOB pricing from factory panel | §5 (sourcing) |
| HowTo schema (6-step sourcing process) | Schema block |
| dateModified update + actual wordCount | Frontmatter + schema |
| "Mis à jour" date display | Hero section |

---

## 4. Optimization Plan (Surgical, Like FR Qi2 Article)

### P0 — Critical Additions (~400 words)
1. **Add France-specific regulatory H3** in §6: décret 2023-1271, NF EN IEC 62680, 6 importateur obligations, DEEE registration
2. **Add French market data paragraph** in introduction: 380-420M€, >90% imported, GaN growth
3. **Add FOB pricing mention** in §5 sourcing
4. **Update dates**: dateModified → 2026-07-17, wordCount → "4500", add "Mis à jour le 17 juillet 2026"
5. **Add HowTo schema**: 6-step PD charger sourcing process

### P1 — Enhancements
6. **Add French customs specifics**: SH 850440, Le Havre, 0-2% duty
7. **Expand related articles** 3→5

---

## 5. Key Data Points to Insert

### French Regulatory (new H3 in §6)
"En France, la directive européenne a été transposée par le décret n° 2023-1271 du 27 décembre 2023. Les normes applicables sont les NF EN IEC 62680-1-2 (USB PD) et NF EN IEC 62680-1-3 (connecteur USB-C). Pour l'importateur, cela signifie six obligations : port USB-C, protocole USB PD pour charge >15W, vente dissociée du chargeur, pictogrammes normalisés sur l'emballage, traçabilité (nom et adresse sur le produit), et enregistrement DEEE auprès d'un éco-organisme (Ecosystem ou Ecologic)."

### French Market (in introduction)
"Le marché français des chargeurs USB-C rapides pèse 380-420 M€ avec 28-35 millions d'unités vendues par an. Plus de 90 % sont importés, dont 75-80 % depuis la Chine. Les foyers français possèdent en moyenne 4,2 appareils compatibles USB-C. La technologie GaN représente déjà 20-25 % des ventes en volume et devrait atteindre 35-45 % d'ici 2028."

### FOB Pricing (in §5)
From factory-data-panel.md: GaN 65W $5.00-7.00/unit, 100W $7.50-10.50/unit, 140W $12.50-17.00/unit @ 1,000 units.

---

## 6. Target Changes

| Metric | Current | Target |
|--------|:------:|:------:|
| wordCount | "2700" | "4500" |
| dateModified | 2026-06-23 | 2026-07-17 |
| H1 length | ~80+ chars | 65 chars (or keep if strong) |
| HowTo schema | ❌ | ✅ 6 steps |
| France-specific regs | ❌ | ✅ New H3 |
| French market data | Global only | ✅ France-specific |
| External links | 5 | 7+ |
| Related articles | 3 | 5 |
