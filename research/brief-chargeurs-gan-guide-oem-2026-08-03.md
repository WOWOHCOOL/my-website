# Research Brief: Chargeurs GaN Guide OEM FR

**Date**: 2026-08-03
**Article**: `chargeurs-gan-guide-oem` (article #1 du plan FR, optimisation)
**Marché cible**: France métropolitaine · Belgique · Suisse romande
**Auteur**: Nina Nico
**EN 对应**: `blog/gan-chargers-guide/`

---

## 1. SEO Foundation

### Primary Keyword
`chargeur GaN OEM importateur` — intent: commercial B2B

### Secondary Keywords
`GaN V chargeur`, `PD 3.1 140W OEM`, `sourcing chargeur GaN Chine`, `certification CE/GS chargeur`, `prix FOB chargeur GaN`, `technologie GaN nitrure de gallium`, `IEC 62368-1`

### Featured Snippet Opportunity
**Oui** — "GaN vs Silicium: quel rendement pour quel usage?" → tableau comparatif

---

## 2. Competitive Landscape

### SERP France: vide B2B
- **Zéro contenu B2B français** sur le sourcing OEM de chargeurs GaN
- Concurrence indirecte:
  - Frandroid/Les Numériques: comparatifs grand public "meilleur chargeur GaN"
  - Wecent/HAVIT/Flexi/Zonsan: contenu EN/DE/CN, pas de FR
  - Havit a une page DE mais pas FR — opportunité first-mover confirmée

### Contenu existant (EN/DE/CN)
| Source | Forces | Faiblesses |
|--------|--------|------------|
| Wecent | Prix FOB, technique PD 3.1 | Anglais, auto-promotion |
| Flexi Electronic | 200+ clients, certifications globales | Anglais |
| HAVIT | 26 ans, 173 brevets | Allemand, pas FR |
| Zonsan Power | 17 ans, large gamme | Anglais |

---

## 3. Données marché GaN France

| Indicateur | Valeur | Source |
|------------|--------|--------|
| Marché GaN France (2026) | $50-55M / ~120M (selon source) | Deep Market Insights / PMR |
| CAGR France 2024-2033 | 19.5-23.4% | Multi-sources |
| CAGR Europe 2026-2033 | ~30% | BCC Research |
| Marché mondial GaN (2026) | $1.2-1.4B | PMR |
| CAGR mondial | 20.8-25.7% | Multi-sources |
| Pénétration GaN France (2026) | 20-30% des ventes unitaires | IndexBox |
| Projection 2035 | >80% des unités | IndexBox |
| Part revenus GaN | ~35% (2026) → 60-65% (2035) | IndexBox |
| Importations | >90-95% (75-80% Chine) | IndexBox |

---

## 4. FR Blog Plan — Optimisation Cible

| Élément | Actuel | Cible |
|---------|--------|-------|
| **Title** | Guide des Chargeurs GaN OEM 2026 : PD 3.1 140W, Gen 5 \| WOWOHCOOL | Chargeurs GaN OEM: Guide Complet PD 3.1 pour Importateurs 2026 \| WOWOHCOOL |
| **Description** | Guide des chargeurs GaN OEM mis à jour juillet 2026... | Guide OEM chargeurs GaN 2026: PD 3.1 140W, GaN V, certifiés CE/GS. Prix FOB dès 4,80€/pièce, MOQ 500. Cas Bosch 10K unités en 28 jours. Fabricant Shenzhen ISO 9001. |
| **H1** | Guide des Chargeurs GaN OEM : PD 3.1 140W | Chargeurs GaN pour Importateurs: Guide OEM Complet de Sourcing 2026 |
| **Keywords** | `[GaN, Chargeur, OEM, Technologie, PD 3.1, Gen 5]` | `[GaN, Chargeur, PD 3.1, GaN V, OEM, Sourcing, Guide]` |

---

## 5. Écarts Schema (v1 → v2)

| Check | Statut actuel | Action |
|-------|--------------|--------|
| Organization | v1 (name + url + logo + sameAs) | + legalName + publishingPrinciples + address + contactPoint |
| BlogPosting.author | 🔴 inline Person | → @id ref |
| Person.@id | ❌ Absent | → `/fr/#ninanico` |
| Person.url | ❌ Absent | → `/authors/nina-nico/` |
| Person.worksFor | ❌ Absent | → @id ref |
| Person.image | ❌ Absent | → `/image/factory/team-nina.webp` |
| BlogPosting.@id | ❌ Absent | → add |
| BlogPosting.keywords | ❌ Absent | → add |
| BlogPosting.citation | ❌ Absent | → add |
| BlogPosting.about | ❌ Absent | → add Wikidata |
| HowTo.@id | ❌ Absent | → add |
| FAQPage.@id | ❌ Absent | → add |
| FAQPage.speakable | ❌ Absent | → `[".faq-answer"]` |
| speakable cssSelector | `["h1", "h2", ".speakable"]` (old) | → `["h1", ".speakable"]` |
| wordCount | 可能为 string | → integer |

---

## 6. Structure — Écarts vs Standard

| Check | Statut | Action |
|-------|--------|--------|
| Hero: inline breadcrumb | Ancien format | → `<nav>` + pill tags |
| Hero: Compact Author Bar | ❌ Absent | → avatar + nom + titre |
| Hook | Format ancien | → .speakable, ≤2¶ |
| POINTS CLÉS | ❌ Absent | → amber card |
| RÉPONSE RAPIDE | Probablement présent | → DELETE |
| FAQ wrapper | Ancien | → bg-slate-50 rounded-2xl |
| Author Bio | Format ancien | → + Empreinte Usine |
| CTA | Ancien | → gradient |
| Related | Ancien | → card format |
| Sources | ❌ Absent | → list-disc |

---

## 7. Information Gain — Différenciateurs

### Ce que les concurrents n'ont pas
1. **Cas Bosch 10K** — livraison en 28 jours, zéro défaut (donnée réelle WOWOHCOOL)
2. **Données thermiques usine**: 52.4°C vs 76.8°C silicium (factory-data-canonical.md)
3. **Prix FOB réels** par palier (500/1000/5000 unités)
4. **Guide en français** complet — seul sur le marché
5. **IEC 62368-1 4ème édition** (fév 2027) — anticiper la transition

---

## 8. Sources à référencer

1. BCC Research — GaN Powered Charger Global Markets (Sept 2025)
2. IndexBox — France Fast USB-C Charger Market (May 2026)
3. Persistence Market Research — GaN Chargers Market Forecast 2026-2033
4. Deep Market Insights — France GaN Chargers Market Size & Share
5. WOWOHCOOL Factory Data — GaN V Thermal/Reliability Data

---

*Brief généré le 2026-08-03*
