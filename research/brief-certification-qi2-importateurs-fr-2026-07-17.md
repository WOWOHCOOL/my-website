# Research Brief: Certification Qi2 Importateurs — FR Blog

**Date**: 2026-07-17
**Target URL**: `/fr/blog/certification-qi2-importateurs/`
**Article Status**: EXISTING — Optimization (published 2026-05-14, last modified 2026-07-06)
**Author**: Snowy May
**Target Language**: French (France market)

---

## 0. GSC Performance Data

**Page-Level**: No GSC data found — the page has no indexed search presence. This is consistent with other non-EN articles.

---

## 1. Assessment: This Article Is Already Strong

At 53KB / ~4,000 words / 10 H2s / 5 FAQ / 4 product images / 6 external sources, this is the most complete FR article reviewed. The structure is solid and the French localization (DGCCRF, Arcep, CETECOM, DEEE) is already present. Optimization should be **surgical**, not a full rewrite.

## 2. France-Specific Local Market Research

### 🔴 DGCCRF Enforcement Details (Partially in Article, Needs Deepening)

| Control Point | Detail | In Article? |
|---------------|--------|:---------:|
| CE marking | Height ≥5mm | ❌ |
| French labeling | Mandatory: fabricant name, importateur UE address, Wh, power, safety warnings | ❌ |
| Performance tolerance | ±8% of claimed power | ❌ |
| Sanctions | Product withdrawal, recall, fines | ⚠️ Mentioned but vague |
| Amazon FR dossier 2026 | CE reports, DoC, multilingual labels, recycling proof | ❌ |

### 🔴 French Customs Specifics (Not in Article)
- **SH Code**: 8507.6000 (lithium-ion batteries)
- **TVA**: 20% on CIF value
- **EORI number**: Required for importer
- **Lithium declaration**: French customs "particulièrement strictes" in 2026
- **Documents**: Facture commerciale multilingue, packing list, CE certs, DoC signé par importateur UE, UN38.3, RoHS/REACH declarations

### 🟡 WPC Authentication Chip (NOT in Article — Critical Gap)
- Qi2 requires **X.509 certificate chain**: Root → Manufacturer → Product Unit
- Without encryption IC: iPhone limits to 7.5W
- This is the #1 technical detail importers need to verify with suppliers
- Article mentions "demander le certificat Qi2" but doesn't explain WHY (the chip)

### 🟢 Market Data (Already Strong)
- France: 2nd largest EU wireless charging market after Germany
- >30M iPhones in France
- Qi2 market share: 73% globally
- B2B channel: hotels, conference centers, corporate gifts
- Qi2 products: 4.5★ vs 3.8★ for old Qi

---

## 3. Optimization Priorities

### P0 — Critical Additions
| # | Action | Location | Effort |
|---|--------|----------|:------:|
| 1 | Add WPC authentication chip explanation (X.509, encryption IC, 7.5W without it) | §3 (certification process) | Low |
| 2 | Add France-specific customs section (SH 8507.6000, EORI, TVA 20%, lithium declaration) | §9 (importateur checklist) or new H3 | Low |
| 3 | Add DGCCRF specifics (CE ≥5mm, ±8% tolerance, Amazon FR dossier 2026) | §9 | Low |
| 4 | Update dateModified to 2026-07-17 | Frontmatter + schema | Low |

### P1 — Important Enhancements
| # | Action | Effort |
|---|--------|:------:|
| 5 | Expand HowTo from 4 to 6 steps (add: "Vérifier la puce d'authentification", "Préparer le dossier Amazon FR") | Low |
| 6 | Add FOB pricing table from factory panel (§5 MagSafe vs Qi2 or new H3) | Low |
| 7 | Add "MagSafe Compatible" 7.5W trap warning (§8 erreurs à éviter) | Low |

### P2 — Nice to Have
| # | Action |
|---|--------|
| 8 | Update CETECOM → Element (rebranded) |
| 9 | Expand Person knowsAbout |
| 10 | Add 1 more related article |

---

## 4. Key Data to Add

### WPC Authentication Chip
"Depuis Qi 1.3, une puce d'authentification avec certificat X.509 est obligatoire pour charger à plus de 5W. Sans cette puce, l'iPhone limite la charge à 7,5W — même si le chargeur est physiquement compatible. Exigez toujours le numéro QIID vérifiable dans la base WPC."

### French Customs
"Code SH 8507.6000. TVA 20% sur valeur CIF. Numéro EORI obligatoire. Les douanes françaises sont particulièrement strictes sur la déclaration lithium en 2026 — toute imprécision peut entraîner la saisie."

### DGCCRF + Amazon FR
"Amazon FR exige en 2026 un dossier complet pour autoriser la vente : rapports CE, DoC, photos d'étiquettes multilingues, preuves de recyclage DEEE. Sans ce dossier, la fiche produit est bloquée."

### FOB Pricing (from factory-data-panel.md)
- Qi2 Magnetic Pad 15W: $5.80-8.00/unit @ 1,000 units
- Qi2 3-in-1 Foldable: $10.50-14.00/unit @ 1,000 units
- Qi2 Car Mount: $7.00-10.00/unit @ 1,000 units

---

## 5. Target Changes

| Metric | Current | Target |
|--------|:------:|:------:|
| wordCount | "4000" | "4300" |
| dateModified | 2026-07-06 | 2026-07-17 |
| HowTo steps | 4 | 6 |
| FAQ questions | 5 | 5 (sufficient) |
| External links | 6 | 7+ |
| H2 sections | 10 | 10 (sufficient) |

---

## 6. Meta Elements

**Current H1** (72 chars): "Certification Qi2 : Ce que les importateurs français doivent savoir en 2026"
**Recommended**: Keep — it's a strong, clear H1 with B2B signal ("importateurs")

**Current Meta**: Adequate. Slight update to include "puce authentification" and "douane française".

---

## 7. Difference from ES Articles

This article needs **~300 words of surgical additions** (authentication chip + French customs + DGCCRF details), not a full structural rewrite. The ES articles needed 1,500-2,000 new words each because they lacked basic B2B structure. This FR article has good structure — it just needs France-specific regulatory depth.
