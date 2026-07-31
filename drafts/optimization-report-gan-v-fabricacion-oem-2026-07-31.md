# Optimization Report: es/blog/gan-v-fabricacion-oem/

**URL:** `/es/blog/gan-v-fabricacion-oem/`
**Date:** 2026-07-31
**Current wordCount:** 1,336
**Article Type:** OEM/ODM Core Topic
**Standard:** b2b-blog-quality-audit-standard.md v2.1 + blog-template-standard.md v2.1

---

## 1. SEO Scorecard

| Dimension | Score | Weight | Weighted |
|-----------|:-----:|:------:|:--------:|
| Keywords (B2B intent + placement) | 65/100 | 20% | 13.0 |
| Meta (Title + Description) | 85/100 | 10% | 8.5 |
| Structure (H1-H4 hierarchy) | 55/100 | 12% | 6.6 |
| Content (depth + data density) | 40/100 | 15% | 6.0 |
| Links (internal + external) | 60/100 | 10% | 6.0 |
| Readability + UX | 70/100 | 8% | 5.6 |
| B2B Quality (auditor composite) | 45/100 | 15% | 6.8 |
| Information Gain | 35/100 | 10% | 3.5 |
| **OVERALL** | | | **56/100 🔴** |

**Grade: D — Needs Major Revision.** Do not publish in current state.

---

## 2. Critical Issues (Block Publishing)

### 🔴 P0-1: wordCount = 1,336 (Target: 2,800–4,000 for OEM/ODM Core)

Every H2 section is a single paragraph. Missing entire decision-chain stages:
- **§3 (evaluar fabricante):** No competitor comparison table, no pricing data, no factory audit criteria
- **§4 (comparativa costes):** Table has 5 rows, no BOM cost breakdown, no FOB pricing, no landed cost calculation for Spain
- **§6 (aplicaciones):** 4 one-line paragraphs, no market data, no sector-specific OEM requirements
- **Missing H2s:** Certificaciones para España/UE, Riesgos en la cadena de suministro GaN, Panorama de fabricantes 2026

### 🔴 P0-2: Zero H3 substructure

All 6 H2s have flat content — no H3s anywhere. Standard requires H3s with specific question/data-conclusion format and 100-150 char direct answer after each. Current structure:
```
H2 → <p> (single paragraph)
```
Required structure:
```
H2 → H3 (question/data conclusion) → <p> (100-150 char direct answer) → content
```

### 🔴 P0-3: No srcset on Featured Image

Line 146: `<img>` missing `srcset` + `sizes`. LCP penalty. Required:
```html
srcset="/image/blog/cover-es/gan-v-fabricacion-oem-800.webp 800w,
        /image/blog/cover-es/gan-v-fabricacion-oem-1200.webp 1200w,
        /image/blog/cover-es/gan-v-fabricacion-oem.webp 2240w"
sizes="(max-width: 768px) 100vw, 896px"
```
Also: cover image path is `/cover-en/` — should be `/cover-es/` for ES market.

### 🔴 P0-4: FAQ = 4 questions (Minimum: 5, Target: 7-8)

Missing B2B procurement questions:
- Q5: ¿Cuánto cuesta certificar un cargador GaN V para la UE?
- Q6: ¿Qué diferencia hay entre un FET GaN V genuino y uno falsificado?
- Q7: ¿Merece la pena el sobrecoste del GaN V frente al silicio para mi marca?

### 🔴 P0-5: Information Gain = near zero

No exclusive first-party factory data. Competitor SERP (English) has BOM cost breakdowns, thermal test data, and pricing tables — this article has none. Zero `°C` measurements, zero `$` pricing, zero `mVp-p` ripple data.

---

## 3. Schema Issues

| # | Issue | Location | Severity |
|---|-------|----------|:--------:|
| 1 | Breadcrumb #3 URL missing trailing `/` | Line 52 | 🔴 High |
| 2 | BlogPosting headline ≠ H1 text | Line 54 vs 121 | 🟡 Medium |
| 3 | wordCount = 1336 (Schema) — after rewrite, must update | Line 60 | 🔴 High |
| 4 | dateModified = 2026-07-30 but article unchanged | Line 59 | 🟡 Medium |
| 5 | BlogPosting image URL = `/image/factory/wowohcool-smart-charging-solutions.webp` ≠ actual Featured Image | Line 63 | 🟡 Medium |
| 6 | timeRequired = PT10M (10 min for 1,336 words → after expansion to 2,800 = ~PT18M) | Line 61 | 🟡 Medium |

---

## 4. H2 B2B Signal Density Analysis

| H2 | Text | B2B Signal? |
|----|------|:----------:|
| 1 | Qué es la tecnología GaN V | ❌ None |
| 2 | Por qué importa para tu marca | ❌ "marca" = implicit |
| 3 | Cómo evaluar un fabricante GaN V | ✅ "fabricante" |
| 4 | Comparativa de costes: silicio vs GaN V | ❌ None |
| 5 | Proceso OEM/ODM paso a paso | ✅ "OEM/ODM" |
| 6 | Aplicaciones por sector | ❌ None |

**Density:** 2/6 = 33% — in range for Technical/Educational tier (10-40%), BUT this article is classified as OEM/ODM Core (target 50-80%). Mismatch.

**Fix:** Reclassify as OEM/ODM Core. Add B2B signals to ≥2 more H2s. Proposed:
- H2#3 → "Cómo Evaluar un Fabricante GaN V: Checklist para Importadores"
- H2#4 → "Costes BOM: Comparativa de Fabricación Silicio vs GaN V OEM"
- New H2#7 → "Certificaciones Obligatorias para Importar Cargadores GaN a España"
- New H2#8 → "Riesgos Ocultos en la Cadena de Suministro GaN V"

---

## 5. H2 Section Structure Gaps

All current H2s lack `<section>` wrappers with card styling. Required format per template:
```html
<section id="h2-X" class="mb-16">
  <div class="bg-slate-50 rounded-xl p-6 border border-slate-200 shadow-sm">
    <h2 class="text-2xl font-black text-brandBlue uppercase italic mb-6">N. Title</h2>
    <!-- content -->
  </div>
</section>
```

---

## 6. Internal Links Audit

| Current | Target | Status |
|:-------:|:------:|:------:|
| `/es/sobre-nosotros/` (2×) | — | ✅ |
| `/es/servicio-oem-odm/` (1×) | — | ✅ |
| `/es/productos/cargador-gan/` (1× CTA) | — | ✅ |

**Missing (need ≥5, currently ~3 in body):**

| Add Link To | Anchor Text (ES) | In Section |
|-------------|-----------------|------------|
| `/es/blog/que-es-cargador-gan/` | "guía completa: qué es un cargador GaN" | H2#1 |
| `/es/blog/gan-vs-silicio-comparativa/` | "comparativa GaN vs silicio para importadores" | H2#4 |
| `/es/blog/importar-cargadores-china-aduanas/` | "guía de importación y aduanas desde China" | New H2#7 |
| `/es/blog/generaciones-gan-comparativa/` | "evolución de las generaciones GaN I a V" | H2#1 |
| `/es/contacto/` | "solicitar presupuesto OEM GaN V" | CTA |

---

## 7. Meta Elements

| Element | Current | Verdict |
|---------|---------|:-------:|
| **Title Tag** | `GaN V: Fabricación OEM de Cargadores PD 3.1 hasta 240W \| WOWOHCOOL` (66 chars) | ⚠️ 1 char over |
| **Meta Description** | `Guía OEM GaN V: cargadores 40% más pequeños que silicio, PD 3.1 hasta 240W, eficiencia >95%. Personalización de marca con MOQ 500 uds desde Shenzhen.` (157 chars) | ✅ |
| **H1** | `GaN V: Fabricación OEM de Cargadores de Quinta Generación para tu Marca` (78 chars) | 🔴 Too long |
| **URL** | `/es/blog/gan-v-fabricacion-oem/` | ✅ |

### Recommended H1 (50-65 chars):

```
GaN V: Fabricación OEM de Cargadores PD 3.1 para tu Marca  (58 chars)
```

### Recommended Title Tag (50-60 chars):

```
GaN V Fabricación OEM PD 3.1 240W | WOWOHCOOL  (47 chars, could expand)
GaN V: Cargadores PD 3.1 OEM desde 500 uds | WOWOHCOOL  (55 chars) ✅
```

---

## 8. External Links & rel Audit

| Link | Current rel | Required rel | Status |
|------|------------|--------------|:------:|
| Yole Group | `noopener noreferrer nofollow` | `noopener external` | 🔴 Fix |
| USB-IF | `noopener external` | `noopener external` | ✅ |
| EUR-Lex | `noopener external` | `noopener external` | ✅ |
| Infineon | `noopener external` | `noopener external` | ✅ |
| Navitas | `noopener external` | `noopener external` | ✅ |

**Fix:** Yole Group is an industry research authority → should use `rel="noopener external"` (preserve referrer for co-citation signal).

---

## 9. Citation ↔ Fuentes Alignment

| Schema citation | Visible in Fuentes section? |
|-----------------|:--------------------------:|
| Yole Group | ✅ |
| USB-IF | ✅ |
| Reglamento UE 2025/2052 | ✅ |
| Infineon | ✅ |
| Navitas | ✅ |

Count: Schema 5 = Visible 5 ✅

---

## 10. Image Audit

| Image | Alt Text | Issues |
|-------|---------|--------|
| Featured (cover-en) | ✅ B2B keywords present | 🔴 Wrong language folder, no srcset |
| GaN charger side | ✅ | — |
| WOP37 67W retractable | ✅ | — |
| GaN shipment | ✅ | — |
| Author photo | ✅ | — |

---

## 11. Quick Wins (5-10 min fixes)

| # | Fix | Time |
|---|-----|:---:|
| 1 | Fix Breadcrumb #3 trailing slash: add `/` | 1 min |
| 2 | Fix Yole Group rel: `noreferrer nofollow` → `external` | 1 min |
| 3 | Shorten H1 to ≤65 chars | 1 min |
| 4 | Add `srcset` + `sizes` to Featured Image | 2 min |
| 5 | Change Featured Image path from `cover-en` to `cover-es` | 1 min |
| 6 | Add `.speakable` to Hook div class | 1 min |

---

## 12. Strategic Improvements (Required — 2-3 hours)

| # | Task | Priority |
|---|------|:--------:|
| 1 | **Expand H2#1** — add H3: "Diferencias clave GaN V vs GaN I-III" + comparison table, H3: "Cómo verificar un FET GaN V genuino (>500 kHz)" | 🔴 P0 |
| 2 | **Expand H2#3** — add Competitor Factory Comparison Table (WOWOHCOOL vs Wecent vs ZONSAN vs Flexi), H3: "¿Fábrica directa o trading company?" | 🔴 P0 |
| 3 | **Expand H2#4** — add BOM Cost Breakdown Table (8 components, silicio vs GaN V, prices), H3: "Coste total landed: FOB + flete + aranceles UE" | 🔴 P0 |
| 4 | **Add new H2#7** — "Certificaciones Obligatorias para Importar Cargadores GaN a España/UE" (CE, RoHS, Reglamento Ecodiseño 2025/2052, DoC a nombre del importador, costes $5,000-$10,000) | 🔴 P0 |
| 5 | **Add new H2#8** — "Riesgos en la Cadena de Suministro GaN V" (FET falsificados, omisión encapsulado térmico, condensadores baja calidad, distancias PCB IEC 62368-1) | 🟡 P1 |
| 6 | **Add Expert Insight block** — embedded in H2#3: Snowy May quote about verifying GaN suppliers | 🟡 P1 |
| 7 | **Expand FAQ 4→7** — add certification cost, FET authentication, ROI analysis questions | 🔴 P0 |
| 8 | **Add Factory Data Panel** — in H2#3 or new sidebar: WOWOHCOOL GaN V specs (frequency, efficiency, temperature, pricing) | 🟡 P1 |
| 9 | **Wrap all H2s** in `<section>` + `<div class="bg-slate-50 rounded-xl p-6 border border-slate-200 shadow-sm">` | 🟡 P1 |
| 10 | **Add H3s** under every H2 with specific question/data-conclusion format | 🔴 P0 |

---

## 13. Revised Content Outline (Target: 2,800-3,200 words)

```
H1: GaN V: Fabricación OEM de Cargadores PD 3.1 para tu Marca  (58 chars) ✅

H2#1: Qué es la Tecnología GaN V  (expand to 350 words)
  H3: Diferencias clave entre GaN V (5ª gen) y GaN I-III temprano
  H3: ¿Cómo verificar un FET GaN V genuino? (>500 kHz, eficiencia >95%)

H2#2: Ventajas Competitivas para tu Marca  (expand to 300 words)
  H3: Premium de precio 30-50% — datos del mercado español
  H3: Menos devoluciones y ahorro logístico con GaN V
  Expert Insight: Snowy May sobre migración a GaN V

H2#3: Cómo Evaluar un Fabricante GaN V: Checklist para Importadores  (expand to 400 words)
  H3: Checklist de 5 puntos para auditar un fabricante GaN V
  H3: Comparativa de fábricas: WOWOHCOOL vs Wecent vs ZONSAN vs Flexi
  🔴 TABLE: Fabricante | Años | Potencia Max | MOQ | Certificaciones | Precio 65W FOB

H2#4: Costes BOM: Comparativa de Fabricación Silicio vs GaN V OEM  (expand to 350 words)
  H3: Desglose del coste de materiales (BOM) — 65W silicio vs GaN V
  🔴 TABLE: Componente | Silicio | GaN V | Diferencia (8 rows)
  H3: Coste total landed para el importador español (FOB + flete + IVA + certificación)

H2#5: Proceso OEM/ODM Paso a Paso  (expand to 350 words)
  H3: Fase 1 — Especificaciones técnicas (2-3 semanas)
  H3: Fase 2 — Prototipado y validación PCBA (3-4 semanas)
  H3: Fase 3 — Moldes de carcasa (4-6 semanas)
  H3: Fase 4 — Certificación CE/FCC/UL (4-6 semanas)
  H3: Fase 5 — Producción en serie con QC 4 etapas (25-30 días)

H2#6: Certificaciones Obligatorias para Importar a España/UE  (NEW — 350 words)
  H3: CE (LVD+EMC) + RoHS + REACH — obligatorio para acceso al mercado UE
  H3: Reglamento de Ecodiseño UE 2025/2052 — en vigor, riesgo de rechazo en aduana
  H3: La Declaración de Conformidad (DoC) debe estar a nombre del importador
  H3: ¿Cuánto cuesta y cuánto tarda certificar un cargador GaN V nuevo?

H2#7: Riesgos en la Cadena de Suministro GaN V  (NEW — 300 words)
  H3: FET GaN falsificados — cómo detectarlos antes del pedido
  H3: Omisión de encapsulado térmico en cargadores >65W
  H3: Condensadores de baja calidad y distancias de PCB insuficientes

H2#8: Aplicaciones por Sector y Oportunidades de Mercado  (expand to 250 words)
  H3: Retail y e-commerce en España (Amazon.es, El Corte Inglés, MediaMarkt)
  H3: Hotelería, automoción y aplicaciones industriales

FAQ (7 preguntas):
  Q1: ¿GaN V es lo mismo que GaN? (existente)
  Q2: ¿Puede un cargador GaN V cargar portátiles? (existente)
  Q3: ¿Cuál es la MOQ para encargar cargadores GaN V OEM? (existente)
  Q4: ¿Es seguro el GaN V? (existente)
  Q5: ¿Cuánto cuesta certificar un cargador GaN V para la UE? (NUEVO)
  Q6: ¿Cómo verifico que el FET de mi cargador es GaN V genuino? (NUEVO)
  Q7: ¿Merece la pena el sobrecoste del GaN V frente al silicio? (NUEVO)
```

---

## 14. Pre-Commit Checklist

```
[ ] H1: 50-65 chars, ≥1 B2B signal word ✅ (after shortening)
[ ] ≥2 H2s with B2B signal words (fabricante, OEM, importador, MOQ)
[ ] No 3 consecutive H2s with same B2B word
[ ] All H2s wrapped in <section> + card div
[ ] H3s under every H2 — question/data-conclusion format
[ ] 100-150 char direct answer after each H3
[ ] KEY TAKEAWAYS block present with .speakable on TL;DR sentence ✅
[ ] Expert Insight block embedded in relevant H2 section
[ ] Factory Data Panel with real measurements
[ ] BOM Cost Comparison Table
[ ] Competitor Factory Comparison Table
[ ] HowTo Schema — 5 steps ✅ (verify after expansion)
[ ] FAQPage — 7 questions with body-schema consistency
[ ] FAQ answers: ≥1 número concreto cada una
[ ] FAQ answers: answer-first format (conclusión en primeras 1-2 frases)
[ ] FAQ last question = CTA bridge
[ ] ≥2 external authority links with correct rel attributes
[ ] ≥5 internal links with B2B Spanish anchor text
[ ] Featured Image: srcset (800w/1200w/2240w) + sizes + fetchpriority="high"
[ ] Featured Image: cover-es/ path (not cover-en/)
[ ] wordCount updated in Schema + dateModified = 2026-07-31
[ ] Breadcrumb trailing slash consistency
[ ] BlogPosting headline = H1 text
[ ] Citation count = Fuentes link count ✅ (5=5)
[ ] Sources: Yole Group rel = "noopener external" (not nofollow)
[ ] timeRequired matches ~18 min for expanded article
[ ] No RESPUESTA RÁPIDA block
[ ] CTA: h2, gradient bg, B2B button text ✅
[ ] Author Bio: Factory Footprint 4 metrics ✅
[ ] Related Articles: 3 cards, ES paths ✅
[ ] <html lang="es"> for screen reader
```

---

## 15. Publishing Readiness

**Status:** 🔴 Needs Major Revision

**Estimated Time to Publish-Ready:** 2-3 hours
- Content expansion (6 H2s → 8 H2s with H3s): 90 min
- FAQ expansion (4 → 7 questions): 20 min
- Tables (BOM cost + competitor comparison): 30 min
- Schema fixes + link audit: 15 min
- srcset + image fixes: 10 min

**Next Steps:**
1. Execute the content expansion per §13 outline above
2. Run `b2b_content_auditor.py` against the updated file
3. Fix any remaining audit flags
4. Update dateModified + wordCount in Schema
5. Publish
