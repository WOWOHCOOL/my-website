# Optimization Report: es/blog/generaciones-gan-comparativa/

**Date:** 2026-08-01
**Auditor:** Automated SEO audit via `/optimize`
**Status:** Needs minor fixes before publishing

---

## 1. SEO Score (86/100)

| Category | Score | Notes |
|----------|:-----:|-------|
| Keyword Optimization | 22/25 | Strong B2B keyword distribution, minor title length issue |
| Technical SEO | 22/25 | Schema complete (HowTo + FAQ + BlogPosting + Person), wordCount discrepancy |
| Content Quality | 21/25 | ~1,963 body words (schema says 2,600), strong structure |
| User Experience | 21/25 | Clear H2 flow, Respuesta Rápida + Puntos Clave boxes, scannable |
| **Overall** | **86/100** | Good — minor tweaks recommended but publishable |

---

## 2. Priority Fixes

### High Priority
- [ ] **Fix wordCount in schema**: schema says `2600`, actual body text is ~1,963 words. Either expand content by ~600 words, or update schema to `"wordCount": 1963`
- [ ] **Fix page title length**: 72 chars exceeds 60-char SERP display limit. Shorten
- [ ] **Update H1 to match optimized title**: H1 still reads "Generaciones de GaN I a V: Comparativa Técnica para Compradores OEM" — should match frontmatter title

### Medium Priority
- [ ] **Add `hreflang` blocks**: EN and DE counterparts exist but no hreflang in frontmatter
- [ ] **Increase "fabricante" keyword**: only 2 occurrences in body, target 4-5
- [ ] **Verify reading time**: display says 12 min, schema says PT12M, but ~2,000 words ≈ 8-10 min read

### Low Priority
- [ ] **Expand content to 2,500+ words** to fully match schema wordCount
- [ ] **Add one more internal link** to `/es/productos/` page for better product cluster

---

## 3. Content Audit Results

### Word Count
- **Body text**: ~1,963 words (HTML/Nunjucks stripped)
- **Schema declared**: 2,600
- **SERP benchmark**: 1,800-3,500
- **Verdict**: Below target. Either expand to 2,500+ or correct schema to ~2,000

### Keyword Distribution

| Keyword | Count | Density | Status |
|---------|:-----:|:-------:|--------|
| GaN | 101 | 5.1% | ⚠️ High but topic-natural |
| generación(es) | 30 | 1.5% | ✅ |
| OEM | 22 | 1.1% | ✅ |
| importador(es) | 9 | 0.5% | ⚠️ Could increase |
| BOM | 10 | 0.5% | ✅ |
| MOQ | 7 | 0.4% | ✅ |
| FOB | 9 | 0.5% | ✅ |
| fabricante | 2 | 0.1% | ❌ Too low |

### Keyword Placement Check

| Placement | Status |
|-----------|:------:|
| In H1 | ✅ "Comparativa OEM para Importadores" |
| In first 100 words | ✅ "GaN", "OEM", "generaciones" |
| In ≥2 H2s | ✅ 3 H2s: OEM ×2, importadores ×1 |
| In meta title | ✅ "OEM", "Importadores" |
| In meta description | ✅ "MOQ 500", "FOB Shenzhen", "Fabricante ISO 9001" |
| In URL slug | ✅ "generaciones-gan-comparativa" |
| In image alt text | ✅ All 5 images have B2B keywords |

### H2 Structure

| # | H2 | B2B Signal |
|---|----|:----------:|
| 1 | Cinco generaciones en una década — vista de conjunto | ❌ |
| 2 | GaN I (2014) — el inicio del cambio | ❌ |
| 3 | GaN II (2017) — primera adopción masiva | ❌ |
| 4 | GaN III (2020) — el caballo de batalla actual | ❌ |
| 5 | GaN IV (2022) — premium para alta potencia | ❌ |
| 6 | GaN V (2024) — la quinta generación | ❌ |
| 7 | Proveedores de chips GaN: comparativa para compradores **OEM** | ✅ |
| 8 | Cómo verificar la generación real de un cargador para **importadores** | ✅ |
| 9 | Estrategia de compra **OEM**: qué generación para cada potencia | ✅ |
| 10 | Preguntas Frecuentes | ❌ |

3/10 H2s with B2B signals — meets ≥2 requirement ✅

---

## 4. Link Audit

### Internal Links (12 total)
| Link | Type | Anchor Context |
|------|------|---------------|
| `/es/productos/cargador-gan/` | Product | "gama completa de cargadores GaN OEM", "catálogo GaN OEM" |
| `/es/blog/que-es-cargador-gan/` | Blog | "guía básica de GaN" |
| `/es/blog/gan-v-fabricacion-oem/` | Blog | "guía de fabricación OEM GaN V" |
| `/es/blog/gan-vs-silicio-comparativa/` | Blog | Related article |
| `/es/contacto/` | CTA | "Solicitar Cotización OEM" |
| `/es/sobre-nosotros/` | Core | Author link |
| `/es/blog/` | Core | Breadcrumb |

✅ Exceeds 3 minimum. Good product/blog/core mix.

### External Links (5 authoritative)
1. Navitas Semiconductor — GaN Power ICs
2. Infineon CoolGaN — GaN HEMT Technology
3. Innoscience — GaN FET Manufacturer
4. USB-IF — USB Power Delivery Specification
5. Persistence Market Research — GaN Charger Market 2026-2033

✅ Exceeds 2 minimum. `rel="noopener noreferrer"` applied.

---

## 5. Image Audit

| # | Alt Text | B2B Keywords | Status |
|---|----------|:-----------:|:------:|
| 1 | Snowy May — Market Manager, GaN Specialist | ✅ | Author image |
| 2 | Comparativa técnica de cinco generaciones de GaN I-V para importadores OEM... | ✅ | Cover |
| 3 | Comparativa visual de generaciones de cargadores GaN I-V OEM... | ✅ | Body |
| 4 | Cargador GaN V 67W OEM con pantalla digital y cable retráctil... | ✅ | Product |
| 5 | Snowy May — Market Manager en WOWOHCOOL, especialista en semiconductores GaN... | ✅ | Author bio |

All 5 images have descriptive B2B alt text ✅

---

## 6. Schema Audit

| Schema Type | Status |
|-------------|:------:|
| Organization | ✅ |
| WebSite | ✅ |
| BreadcrumbList | ✅ |
| BlogPosting | ✅ (headline + description + dates + wordCount + citations) |
| Person | ✅ (Snowy May + LinkedIn + jobTitle + knowsAbout) |
| **HowTo** | ✅ (3 steps — NEW!) |
| FAQPage | ✅ (6 questions — expanded from 4) |
| SpeakableSpecification | ✅ |

All required schema types present ✅

---

## 7. Meta Elements Analysis

### Current Page Title (72 chars — OVER LIMIT)
```
Generaciones GaN I-V: Comparativa OEM para Importadores 2026 | WOWOHCOOL
```
72 chars. Google typically displays 50-60 chars. "| WOWOHCOOL" may be cut off.

### Recommended Title Options

| # | Title | Chars |
|---|-------|:----:|
| 1 | **Generaciones GaN I-V: Guía OEM para Importadores 2026** | 58 |
| 2 | **Generaciones GaN I-V: Comparativa OEM 2026 \| WOWOHCOOL** | 62 |
| 3 | **GaN I-V para Importadores: Comparativa OEM 2026 \| WOWOHCOOL** | 60 |

**Recommend**: Option 1 — 58 chars, all B2B signals preserved, clean.

### Current Meta Description (152 chars — WITHIN LIMIT)
```
Comparativa generaciones GaN I-V para importadores: frecuencia, eficiencia, coste BOM y aplicaciones OEM. MOQ 500, FOB Shenzhen. Fabricante ISO 9001 desde 2013.
```
152 chars ✅. B2B conversion words: MOQ 500, FOB Shenzhen, Fabricante ISO 9001 ✅.

**Verdict**: Description is optimal. No change needed.

---

## 8. Quality Gate Checklist (from CLAUDE.md)

### Gate 1: Anti-Repetition
- [x] No repeated information within same section
- [x] Each generation section has unique data points

### Gate 2: Information Gain
- [x] Factory data cited (BOM costs, return rates, QC metrics from factory-data-canonical.md)
- [x] First-hand data: FOB pricing by generation
- [x] Exclusive terminology: PCBA ripple, BOM cost breakdown, AQL sampling
- [x] Competitor SERP doesn't have GaN generation comparison in Spanish — first mover

### Gate 3: Scannability
- [x] H1: 72 chars (⚠️ over 65) — contains "OEM", "Importadores"
- [x] ≥2 H2 with B2B signals: 3 confirmed
- [x] H3s are specific and descriptive
- [x] Quick Answer box (Respuesta Rápida) present
- [x] Key Takeaways box (Puntos Clave) present
- [x] No empty H2s

### Gate 4: Visual Authenticity
- [x] Real factory/product images (SMT line, GaN charger product)
- [x] Descriptive alt text with B2B keywords
- [x] Author image with position/specialty in alt

### Gate 5: CTA Relevance
- [x] "Solicitar Cotización OEM" → contact page
- [x] "Ver Catálogo GaN" → product page
- [x] blog-cta partial with MOQ/FOB messaging

### Schema Mandatory
- [x] BlogPosting ✅
- [x] Person (Author + LinkedIn + jobTitle + knowsAbout) ✅
- [x] FAQPage (6 questions) ✅
- [x] HowTo (3 steps) ✅
- [x] BreadcrumbList ✅
- [x] Organization / ManufacturingBusiness ✅
- [x] SpeakableSpecification ✅

---

## 9. Pre-Commit Self-Check

- [x] H1 contains B2B signal words + ✅ (OEM, Importadores)
- [ ] H1 length 50-65 chars — ❌ (72 chars, needs shortening)
- [x] ≥2 H2s contain B2B signal words ✅
- [x] HowTo Schema added ✅
- [x] Image alt text contains B2B keywords ✅
- [x] dateModified updated to 2026-08-01 ✅
- [ ] wordCount matches actual — ❌ (schema: 2600, actual: ~1963)
- [x] ≥2 external authoritative links ✅ (5)
- [x] ≥3 internal links ✅ (12)
- [x] FAQ questions use B2B procurement language ✅
- [x] Meta description has B2B conversion words ✅
- [x] `modified:` field present in frontmatter ✅

---

## 10. Publishing Readiness

**Status**: Needs Minor Fixes (3 items, ~5 minutes)

**Fixes needed before publish:**

1. **Shorten page title** from 72 → 58 chars:
   ```
   "Generaciones GaN I-V: Guía OEM para Importadores 2026 | WOWOHCOOL"
   ```
2. **Update wordCount** in schema: `"wordCount": 1963` (or expand content to 2,600)
3. **Update H1** to match frontmatter title

**Estimated Time to Publishing**: 5 minutes

---

*Report generated 2026-08-01 by /optimize command.*
