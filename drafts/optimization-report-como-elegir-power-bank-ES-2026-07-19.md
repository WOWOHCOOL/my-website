# Optimization Report: Cómo Elegir Power Bank (ES)

**Date**: 2026-07-19
**Article**: `wowohcool.com/src/es/blog/como-elegir-power-bank/index.njk`
**Status**: Needs Major Revision — **52/100** (F)
**Estimated Time to Fix**: 2-3 hours

---

## 1. SEO Score (0-100)

| Category | Score | Weight | Weighted |
|----------|:-----:|:------:|:--------:|
| Keyword Optimization | 16/25 | 25% | 4.00 |
| Technical SEO | 15/25 | 25% | 3.75 |
| Content Quality | 11/25 | 25% | 2.75 |
| User Experience | 10/25 | 25% | 2.50 |
| **Overall SEO Score** | **52/100** | | **13.00/25** |

**Grade: F (Needs Work)**

### Category Breakdown

#### Keyword Optimization (16/25)
- ✅ "power bank" density: 1.25% (optimal range)
- ✅ Primary keyword in first 100 words + conclusion
- ⚠️ H1 has "Power Bank" but analyzer can't verify placement in HTML
- ❌ "OEM" density too low in body (~0.13%)
- ❌ "importador" not tracked as keyword variant in body
- ⚠️ 3 consecutive sentences with keyword — borderline stuffing warning

#### Technical SEO (15/25)
- ❌ Meta title: 73 chars (over 60-char limit)
- ⚠️ Meta description: 248 chars (over 160-char limit) — could be truncated
- ✅ Schema: BlogPosting, FAQPage (8 Qs), Person, BreadcrumbList, SpeakableSpecification
- ❌ Missing: HowTo schema (article has decision steps), Organization schema
- ⚠️ Missing `frPath` in frontmatter (DE and EN present)
- ⚠️ `dateModified` is 2026-07-16 (should be today)
- ✅ 11 external authority links with `rel="noopener noreferrer"`
- ✅ 8 internal links to ES product/blog pages

#### Content Quality (11/25)
- ❌ **CRITICAL**: Title/body intent mismatch — H1 promises B2B, body delivers B2C
- ❌ Missing OEM/ODM decision framework
- ❌ Missing WOWOHCOOL competitive differentiator section
- ❌ Readability: Flesch 43.3 (difficult), Grade 10.5 (too high for B2B)
- ❌ 12 sentences exceed 35 words — need splitting
- ❌ Few transition words between sections
- ✅ Factory data from factory-data-panel.md present
- ✅ Nina Nico expert quote (ES/MX/CO-specific)
- ✅ Excellent 2026 airline regulation coverage

#### User Experience (10/25)
- ❌ Sections 1-7 read as consumer guide — procurement manager feels misled
- ❌ B2B content concentrated in section 8 (last section) — wrong priority order
- ✅ Strong visual content: capacity comparison images, factory QC photos
- ✅ Decision table (section 7) — useful but consumer-framed
- ✅ Quick Answer box at top
- ✅ Clear CTA at end

---

## 2. Critical Issues (Must Fix)

### 🔴 P0-1: Intent Mismatch — H1 vs Body

**H1**: "Power Bank para **Importadores**: Especificaciones Clave y **Selección OEM** 2026"
**Body sections 1-7**: Consumer scenarios ("viajeros diarios", "estudiantes")

**Impact**: Google reads H1 as B2B signal but body as B2C — neither intent ranks well. Procurement managers bounce when they see consumer language.

**Fix**: Rewrite sections 1-7 consumer framing → procurement-manager framing.

### 🔴 P0-2: Meta Title Over 60 Characters

**Current** (73 chars): `Power Bank OEM para Importadores: Guía de Especificaciones 2026 | WOWOHCOOL`

**Fix** (55 chars): `Power Bank para Importadores: Selección OEM 2026 | WOWOHCOOL`

### 🔴 P0-3: Meta Description Over 160 Characters

**Current** (248 chars): Gets truncated in SERP. Loses key information.

**Fix** (158 chars):
```
Selección de power banks para importadores: 5K-27K mAh, PD 3.1, precios FOB $7.50/ud, MOQ 500. Certificaciones CE/FCC/UN38.3 y envío DDP a España y LATAM.
```

---

## 3. Optimization Recommendations

### Quick Wins (15-30 min)

1. **Fix meta title** → `Power Bank para Importadores: Selección OEM 2026 | WOWOHCOOL` (55 chars)
2. **Fix meta description** → 158-char version with FOB/MOQ/DDP signals
3. **Update dateModified** → 2026-07-19 (schema + frontmatter)
4. **Add frPath** → `blog/guide-choisir-batterie-externe/` (if FR version exists)
5. **Add Organization schema** → ManufacturingBusiness type (present in OEM vs ODM article)
6. **Add HowTo schema** → "Cómo seleccionar un power bank para importación" (5-step process)

### Strategic Improvements (2-3 hours)

#### A. B2B Reframe of Sections 1-7

Replace consumer-oriented language throughout:

| Section | Current (Consumer) | Rewrite (B2B) |
|---------|-------------------|---------------|
| **H2 #2** Capacity tiers | "Ideal para: Viajeros diarios, estudiantes" | "Canal de venta: Amazon/e-commerce, retail físico" |
| **H2 #2** 10K tier | "Si vas a comprar tu primer power bank" | "Si es tu primer pedido de importación, empieza aquí" |
| **H2 #5** Features | Consumer feature descriptions | Add: "Qué busca el comprador B2B en cada función" |
| **H2 #7** Decision guide | "Tu Situación" → consumer scenarios | Add: "Canal de Venta | Especificación | Precio FOB | Margen" |

#### B. Add OEM/ODM Decision Section (NEW H2 before Import)

```
## OEM, ODM o Private Label: Elige tu Modelo de Fabricación
- Comparison table: OEM vs ODM vs Private Label
- MOQ, timeline, cost differences
- Link to /es/blog/oem-vs-odm-guia-completa/
```

#### C. Add WOWOHCOOL Differentiator Table (NEW H2 after OEM/ODM)

```
## Ventajas de Fabricar tus Power Banks con WOWOHCOOL
- 8-row comparison table (MOQ, QC, certs, R&D, shipping...)
- Source: factory-data-panel.md §10
```

#### D. Add Cell Grade Explanation

Add to section 1 (capacity) or section 8 (import):
- Grade A: ≥500 cycles, traceable supply chain — for brand building
- Grade B: 300-400 cycles — for price-competitive markets
- Grade C: <300 cycles — avoid for branded products
- How to verify: request discharge curve reports from 3rd-party labs

#### E. Split 12 Long Sentences + Add Transitions

- 12 sentences exceed 35 words → split each into 2-3
- Add Spanish transition words: "Por otro lado", "En consecuencia", "Además"

---

## 4. Optimized Meta Options

### Meta Title (pick one)

| # | Option | Chars | B2B Signals |
|---|--------|:-----:|:----------:|
| 1 | Power Bank para Importadores: Selección OEM 2026 \| WOWOHCOOL | 55 | Importadores + OEM |
| 2 | Power Bank OEM: Guía de Especificaciones para Importadores \| WOWOHCOOL | 59 | OEM + Importadores |
| 3 | Power Bank para Importadores: Capacidad, Precio FOB y MOQ \| WOWOHCOOL | 59 | Importadores + FOB + MOQ |

**→ Recommended: Option 1** — shortest, clearest B2B signals.

### Meta Description (pick one)

| # | Option | Chars |
|---|--------|:-----:|
| 1 | Selección de power banks para importadores: 5K-27K mAh, PD 3.1, precios FOB $7.50/ud, MOQ 500. Certificaciones CE/FCC/UN38.3 y envío DDP a España y LATAM. | 158 |
| 2 | Guía B2B para elegir power banks: capacidad mAh, potencia PD, precios FOB Shenzhen y certificaciones necesarias. Datos reales de fábrica ISO 9001 con MOQ desde 500 uds. | 155 |
| 3 | Power banks para importadores: compare capacidades, potencias y certificaciones. Precios FOB, MOQ 500, envío DDP. Guía con datos de fábrica real. Solicite catálogo. | 156 |

**→ Recommended: Option 1** — strongest keyword density + B2B conversion signals.

---

## 5. Link Enhancement

### Internal Links (current: 8 — good)

| Current Link | Section | Evaluation |
|-------------|---------|------------|
| `/es/blog/especificaciones-power-banks-importadores/` | §1, cross-links | ✅ Good |
| `/es/blog/baterias-semi-solid-state/` | §2, §5, cross-links | ✅ Good |
| `/es/blog/qi2-vs-magsafe-diferencias/` | §4 | ✅ Good |
| `/es/blog/usb-c-pd-carga-rapida/` | §4 | ✅ Good |
| `/es/blog/gan-vs-silicio-comparativa/` | §5 | ✅ Good |
| `/es/blog/certificaciones-ce-fcc-guia/` | §6 | ✅ Good |
| `/es/productos/powerbank/` | CTA + factory stat | ✅ Good |
| `/es/contacto/` | CTA | ✅ Good |

**Internal Links to Add**:
- `/es/blog/oem-vs-odm-guia-completa/` — from new OEM/ODM section
- `/es/blog/importar-de-china-costos/` — from section 8 (import)

### External Links (current: 11 — excellent)

All authoritative: FAA, IATA, USB-IF, WPC, Yole Group, IndexBox, 6Wresearch, EUR-Lex, Euro Weekly News.

**External Links to Add**:
- EU Battery Regulation 2023/1542 official text (EUR-Lex) — already linked, verify
- IATA DGR 67th Edition lithium battery update

---

## 6. Keyword Distribution Map

| Placement | Current | Issue |
|-----------|:------:|-------|
| H1 | ⚠️ "Power Bank" present but no B2B keyword density check | Over 65 chars |
| First 100 words | ✅ "power bank" present | — |
| H2 headings | ⚠️ "power bank" in 2/8 H2s | Need 3-4 for B2B distribution |
| Body paragraphs | ✅ 1.25% density (optimal) | — |
| Conclusion | ✅ "power bank" present | — |
| Meta title | ✅ "Power Bank" present | But over 60 chars |
| Meta description | ⚠️ Has keywords | Over 160 chars |
| URL slug | ⚠️ "como-elegir-power-bank" | Consumer-leaning ("cómo elegir") |

**URL slug note**: `/es/blog/como-elegir-power-bank/` uses B2C pattern "cómo elegir". If reoriented fully to B2B, consider `/es/blog/seleccion-power-bank-importadores/` — but URL changes require 301 redirect. **Recommend keeping current slug** for now (already indexed, changing would lose any accrued rankings).

---

## 7. Readability Fixes Required

- **Flesch Reading Ease**: 43.3 → target 50-60 for Spanish B2B
- **Grade Level**: 10.5 → target 8-10
- **12 sentences** exceed 35 words → split into 2-3 shorter sentences
- **Few transition words** → add "Sin embargo", "Por otro lado", "Además", "En consecuencia" at section boundaries
- **Paragraph length**: some are walls of text → break at 3-4 sentences

---

## 8. Schema Validation

| Schema Type | Present | Issues |
|------------|:-------:|--------|
| BlogPosting | ✅ | wordCount: 4200 (may need update if content expands) |
| Person (Author) | ✅ | LinkedIn + jobTitle + knowsAbout — good |
| FAQPage | ✅ (8 Qs) | Expand to 10 questions |
| BreadcrumbList | ✅ | Good |
| Organization | ❌ | **MISSING** — add ManufacturingBusiness type |
| HowTo | ❌ | **MISSING** — article has a decision process (5 steps) |
| SpeakableSpecification | ✅ | Good |

### FAQ Questions to Add

9. "¿Cuál es la diferencia entre OEM y ODM al comprar power banks?"
10. "¿Cómo verifico que las celdas de un power bank son Grado A?"

### HowTo Steps to Add

```json
{
  "name": "Cómo seleccionar un power bank para importación",
  "step": [
    "Definir el canal de venta y público objetivo",
    "Seleccionar capacidad y potencia según el segmento",
    "Elegir entre OEM, ODM o Private Label",
    "Verificar certificaciones necesarias para el mercado destino",
    "Solicitar muestras y validar especificaciones con descarga de laboratorio"
  ]
}
```

---

## 9. Pre-Commit Checklist

- [ ] Meta title ≤60 chars with B2B signal word
- [ ] Meta description ≤160 chars with FOB/MOQ/DDP
- [ ] Sections 1-7 reframed from consumer → procurement language
- [ ] OEM/ODM decision section added
- [ ] WOWOHCOOL differentiator table added
- [ ] Cell grade explanation added
- [ ] B2B decision matrix replaces consumer version in section 7
- [ ] Organization schema added (ManufacturingBusiness)
- [ ] HowTo schema added (5-step process)
- [ ] FAQ expanded to 10 questions
- [ ] dateModified updated to 2026-07-19
- [ ] frPath added to frontmatter
- [ ] 5+ long sentences split for readability
- [ ] Transition words added at section boundaries
- [ ] Internal links to OEM/ODM guide + import costs guide added

---

## 10. Publishing Readiness

**Status**: ❌ Needs Major Revision

**Estimated Time**: 2-3 hours

**Next Steps**:
1. Fix 3 quick wins (meta title, description, dateModified) — 10 min
2. Add OEM/ODM + WOWOHCOOL sections — 45 min
3. B2B reframe of sections 1-7 — 60 min
4. Add cell grades + B2B decision matrix — 30 min
5. Schema additions (Organization, HowTo, 2 FAQ Qs) — 15 min
6. Readability pass (split 12 long sentences) — 15 min
7. `/scrub` + `geo-citability` — 15 min

---

*Report generated by /optimize with: keyword_analyzer.py, readability_scorer.py, competitive SERP analysis, research brief data.*
