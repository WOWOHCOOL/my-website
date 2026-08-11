# AI Citability Analysis: Règlement UE 2023/1542 — Guide Conformité pour Importateurs OEM

**URL:** /fr/blog/reglement-ue-2023-1542-conformite-oem/
**Analysis Date:** 2026-08-11
**Overall Citability Score: 72/100**
**Citability Coverage:** 64% (7/11 blocks above 70)

---

## Score Summary

| Category | Score | Weight | Weighted |
|---|---|---|---|
| Answer Block Quality | 73/100 | 30% | 21.9 |
| Passage Self-Containment | 100/100 | 25% | 25.0 |
| Structural Readability | 72/100 | 20% | 14.4 |
| Statistical Density | 68/100 | 15% | 10.2 |
| Uniqueness & Original Data | 9/100 | 10% | 0.9 |
| **Overall** | | | **72/100** |

---

## Strongest Content Blocks

### 1. "2. Obligations REP Batterie pour les Importateurs OEM" — Score: 92/100
> La définition est large — et délibérément inclusive. Vous êtes producteur soumis à la REP batterie si vous...

**Why it works:** Definition pattern present, 2 lists + 2 tables, 8 data points, fully self-contained. The cost table (éco-organisme comparison + cost breakdown) is AI-extractable as a standalone fact block.

### 2. "3. Conformité Documentaire" — Score: 77/100
> Depuis le 18 août 2024, toute batterie mise sur le marché européen doit porter le marquage CE...

**Why it works:** Strong date-anchored opening, 7 statistics, documentation checklist table with ✅ indicators, lists of required markings. Answer-first opening.

### 3. "6. Sanctions, Contrôles et Risques" — Score: 77/100
> Le régime de sanctions en France (table)

**Why it works:** Penalty table is highly extractable — specific amounts + infraction types in a scannable format. Exactly what AI systems cite for "what are the penalties" queries.

---

## Weakest Content Blocks (Rewrite Priority)

### 1. "5. Passeport Numérique Batterie" — Score: 58/100

**Current opening:**
> À partir du 18 février 2027, toute batterie de plus de 2 kWh mise sur le marché européen devra disposer d'un passeport numérique accessible via QR code unique.

**Problem:** Score drag from 0 statistics (the module detects 0 data points in this block despite having dates), 0 tables/lists, and no definition pattern. The content is useful but not structured for AI extraction.

**Suggested rewrite:**
> Le passeport numérique batterie (Digital Battery Passport) est un enregistrement électronique obligatoire contenant 71 points de données par batterie, accessible via QR code. Obligatoire à partir du 18 février 2027 pour les batteries > 2 kWh (EV, LMT, industrielles). Les batteries portables (power banks < 100 Wh) ne sont pas concernées. Trois données clés à préparer : empreinte carbone (PEF), taux de matières recyclées, et identifiant unique d'opérateur.

**Additional improvements:**
- Add a comparison table: "Passeport obligatoire vs Non concerné" for different battery types
- Add 2-3 statistics: % of power banks under 100 Wh threshold, number of data fields, implementation cost estimate
- Split "Vos power banks sont-ils concernés ?" into a bolded standalone answer

### 2. "Table des Matières" — Score: 60/100

**Problem:** Navigation-only block with no definition, no statistics, no uniqueness. This is expected and acceptable — TOC blocks are structural, not content.

**Verdict:** No rewrite needed. TOC blocks are exempt from citability requirements.

### 3. "Sources & Références" — Score: 60/100

**Problem:** Citation list with 0 statistics detected. Again, expected for a references section.

**Verdict:** Structurally adequate. Consider adding a brief "Key takeaways from these sources" summary if you want a citability boost here.

---

## Quick Win Reformatting Recommendations

| # | Recommendation | Expected Lift |
|---|---------------|:---:|
| 1 | **Section 5: Add a comparison table** (Battery Passport scope: which products need it vs which don't) | +8 |
| 2 | **Section 4: Add 2 statistics** (mandataire REP cost data, number of affected companies) | +6 |
| 3 | **Add definition pattern to H3 openings** in Sections 1, 3, 4, 6 — use "X est..." or "X désigne..." format | +5 |
| 4 | **Split Section 5 into shorter paragraphs** (2-3 sentences each) for better AI parseability | +3 |
| 5 | **Add 1 factory-original data point** (e.g., "% of WOWOHCOOL clients who needed REP support in 2025-2026") to boost Uniqueness from 9→25 | +3 |

---

## Per-Section Scores

| Section | Words | Answer | Self-Cont | Structure | Stats | Unique | Overall |
|---|---|---|---|---|---|---|---|
| Table des Matières | 64 | 70 | 100 | 60 | 0 | 20 | 60 |
| 1. Règlement — Ce Qui Change | 287 | 70 | 100 | 80 | 100 | 0 | 77 |
| **2. Obligations REP** | 404 | **100** | 100 | 100 | 100 | 20 | **92** |
| 3. Conformité Documentaire | 281 | 70 | 100 | 80 | 100 | 0 | 77 |
| 4. Mandataire REP | 218 | 70 | 100 | 80 | 46 | 0 | 69 |
| **5. Passeport Numérique** | 169 | 70 | 100 | 60 | **0** | 0 | **58** |
| 6. Sanctions et Risques | 171 | 70 | 100 | 80 | 100 | 0 | 77 |
| Foire Aux Questions | 786 | 70 | 100 | 60 | 100 | 0 | 73 |
| CTA | 38 | 70 | 100 | 60 | 100 | 40 | 77 |
| Articles Connexes | 68 | 70 | 100 | 60 | 100 | 20 | 75 |
| Sources & Références | 41 | 70 | 100 | 70 | 0 | 0 | 60 |

---

## AI System Readiness

| AI System | Readiness | Notes |
|---|---|---|
| **ChatGPT Search** | ⬜ 75% ready | Fact-dense sections (2, 6) are strong. Section 5 needs more definition patterns. |
| **Perplexity** | 🟩 80% ready | Statistics density is good overall. Citation sources present. Tables are extractable. |
| **Claude** | ⬜ 75% ready | Structure is clear. Self-containment is 100% — ideal for Claude's extraction preferences. |
| **Gemini AI Overviews** | ⬜ 70% ready | Answer blocks need more "X is..." definition patterns in sections 1, 3, 4, 5. |
| **Bing Copilot** | ⬜ 75% ready | Authority signals strong (EUR-Lex citations). Factual claims are verifiable. |

---

*Report generated by geo_citability_check.py + Claude Code analysis · 2026-08-11*
