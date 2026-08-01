# Research Brief: ES / Generaciones GaN Comparativa

**Date:** 2026-08-01
**Status:** Existing article — needs optimization/expansion
**Target URL:** `/es/blog/generaciones-gan-comparativa/`
**Command:** `/research es/blog/generaciones-gan-comparativa/`
**Parallel DE/EN counterparts:** `/de/blog/gan-generationen-uebersicht/`, `/blog/gan-generations-guide/`

---

## 1. SEO Foundation

### Current State

| Attribute | Current Value | Issue |
|-----------|--------------|-------|
| Title | "Generaciones de GaN I a V: Comparativa Técnica 2026 \| WOWOHCOOL" | B2B signal weak — no "OEM", "fabricante", "importador" |
| Meta Description | "Comparativa de 5 generaciones GaN I-V: frecuencia de conmutación, eficiencia, coste y aplicaciones OEM. Para importadores de cargadores en España y LATAM." | Missing B2B conversion word (MOQ, FOB, fabricante) |
| wordCount | 977 | **Severely underweight** — competitor articles are 1,800-3,500 words |
| datePublished | 2026-05-15 | OK |
| dateModified | 2026-07-30 (schema), missing frontmatter | Need `modified:` in frontmatter |
| Author | Snowy May | ✅ |
| FAQ Questions | 4 | Need 5-8 (quality gate requirement) |
| HowTo Schema | ❌ Missing | Required for process/guide articles |
| H1 B2B Signal | ❌ None | Must contain ≥1: OEM, fabricante, importador, proveedor |
| H2 B2B Signal | 1/7 H2s | Need ≥2 |

### Primary Keyword (Recommended)
- **Primary**: `generaciones GaN comparativa OEM` (est. 100-200/mo, Very Low KD)
- **Secondary**: `GaN I-V diferencias fabricante`, `comparativa cargador GaN importador`

### B2B Keyword Layer
- **Layer 1 (Title)**: `generaciones GaN`, `comparativa`, `OEM`, `fabricante`
- **Layer 2 (Meta)**: `MOQ 500`, `FOB Shenzhen`, `importadores`
- **Layer 3 (Body)**: `GaN V Infineon Navitas`, `certificación CE FCC`, `coste BOM cargador GaN`

---

## 2. Competitive Landscape

### SERP Analysis (Spanish Keywords)

**Key finding: The Spanish-language SERP for "generaciones GaN comparativa" is virtually empty of dedicated comparison content.** This is a massive content gap opportunity.

| Competitor | Type | Strength | Weakness |
|-----------|------|----------|----------|
| **WeCent** (gdwecent.com) | OEM factory blog (EN) | Dominates GaN OEM SERP with 5+ articles; MOQ 200 positioning | English only, no Spanish content |
| Academic papers (MDPI, ScienceDirect) | Research | Highly technical, credible | Not buyer-friendly, no commercial intent |
| heybmx.com | Consumer blog (EN) | Good B2C "what is GaN" explainer | Zero B2B/OEM angle |
| Xataka / ComputerHoy (ES tech media) | Spanish tech news | High DA, Spanish audience | Consumer angle only, no OEM content |

### Content Gap Summary
1. **No Spanish article** compares GaN generations from an OEM buyer perspective
2. **No Spanish article** maps GaN generations to specific power levels with FOB pricing
3. **No Spanish article** explains how to verify which GaN generation a supplier is actually using
4. **WeCent dominates EN OEM SERP** but has zero Spanish content — first-mover advantage available

### Differentiation Strategy
- Make this the **definitive Spanish-language GaN generation comparison for procurement managers**
- Add real factory pricing by generation (from factory-data-canonical.md)
- Add "How to verify GaN generation" as a unique section (already exists but needs depth)
- Target LATAM + Spain importers with region-specific certification guidance

---

## 3. Content Audit of Existing Article

### What's Working
- ✅ Clear generation-by-generation structure (I through V)
- ✅ Technical accuracy on switching frequency and efficiency
- ✅ Good "verification" section for spotting fake GaN claims
- ✅ OEM recommendation by power level (useful B2B angle)

### What's Missing / Needs Improvement
- ❌ **wordCount: 977** — needs expansion to **2,500-3,000 words**
- ❌ No comparison table with BOM cost per generation
- ❌ No FOB pricing table by power level + generation
- ❌ Only 4 FAQ questions (need 5-8)
- ❌ No HowTo schema
- ❌ No "SCHNELLANTWORT" / Quick Answer box
- ❌ No "KERNERKENNTNISSE" / Key Takeaways box
- ❌ No Expert Insight block (required for GEO +37%)
- ❌ No internal links to product pages
- ❌ Missing `modified:` in frontmatter
- ❌ H1 lacks B2B signal word
- ❌ Description lacks B2B conversion word (MOQ, FOB)
- ❌ Only 1 external citation link (need ≥2 per GEO standard)

### Structural Issues
- H2s use generic titles like "GaN I (2014-2016)" — should be benefit-driven for B2B buyers
- No comparison table aggregating all 5 generations
- Section 8 (OEM recommendation) is a bullet list without depth — should be a full table with pricing

---

## 4. Recommended Outline (Optimized)

```
H1: Comparativa de Generaciones GaN I-V para Importadores: Guía OEM 2026

[Quick Answer Box]
¿Qué generación GaN necesita mi producto? → Decision matrix by power level

[Key Takeaways Box]
5 bullets with critical numbers

H2: 1. Por qué la generación GaN importa en la compra OEM
H3: El coste oculto de elegir la generación equivocada
H3: Cómo el GaN V redefine el margen del importador

H2: 2. Tabla comparativa: GaN I a GaN V (2014-2026)
[FULL COMPARISON TABLE: Gen, Switching Freq, Efficiency, Max Power, BOM Cost, Chip Supplier, Best For]
H3: GaN I-II (2014-2018): Los pioneros — solo para referencia histórica
H3: GaN III (2019-2021): El punto de inflexión — sigue viable en 65W
H3: GaN IV (2022-2023): Premium para alta potencia — 140W realista
H3: GaN V (2024-2026): El estándar actual — obligatorio para 240W PD 3.1

H2: 3. Costes BOM por generación: lo que paga realmente el importador
[PRICING TABLE from factory-data-canonical.md]
H3: FOB Shenzhen: 30W, 65W, 100W, 140W por generación
H3: Diferencia de coste GaN III vs GaN V: ¿vale la pena el 15-20% extra?

H2: 4. Proveedores de chips GaN: Infineon, Navitas, Innoscience
[TABLE: Supplier, Gen Support, Pricing Tier, Certification Path]
H3: Infineon CoolGaN — ruta más corta a TÜV/GS
H3: Navitas GaNFast — líder en consumo
H3: Innoscience — alternativa de coste para LATAM

H2: 5. Cómo verificar la generación real (guía anti-fraude para importadores)
[HowTo Schema: 3 steps]
H3: Paso 1: Solicitar el número de pieza del FET y el datasheet
H3: Paso 2: Medir frecuencia de conmutación en laboratorio
H3: Paso 3: Verificar perfil térmico bajo carga completa

H2: 6. Estrategia de compra OEM: qué generación para cada potencia
[TABLE: Power Level → Recommended Gen → FOB Price → Target Market]
H3: 20-45W: ¿GaN o silicio en 2026?
H3: 65W: el sweet spot OEM con GaN III/IV
H3: 100-240W: GaN V obligatorio

[EXPERT INSIGHT Block — Snowy May]

FAQ (6-8 questions)
CTA: "Solicitar catálogo de cargadores GaN OEM"
```

---

## 5. Supporting Elements

### Statistics to Include (from factory-data-canonical.md + SERP research)

| # | Data Point | Source |
|---|-----------|--------|
| 1 | GaN charger market $1.2B (2026), CAGR 25.7% to $6B by 2033 | Persistence Market Research |
| 2 | GaN bandgap 3.4 eV vs Silicon 1.1 eV | Industry standard |
| 3 | GaN V efficiency >95%, switching 500 kHz-5 MHz | Infineon/Navitas datasheets |
| 4 | BOM cost 30W GaN: $3.50-5.00 FOB (500 units) | factory-data-canonical.md |
| 5 | BOM cost 65W GaN: $6.00-8.50 FOB (500 units) | factory-data-canonical.md |
| 6 | BOM cost 100W GaN: $9.00-13.00 FOB (500 units) | factory-data-canonical.md |
| 7 | BOM cost 140W GaN PD 3.1: $18.00-24.00 FOB (500 units) | factory-data-canonical.md |
| 8 | GaN V field return rate ~0.5% vs Silicon ~3% | factory-data-canonical.md |
| 9 | EU Common Charger Directive: USB-C mandatory 13 categories (Dec 2024), laptops (Apr 2026) | EUR-Lex |
| 10 | >60% new chargers ≥30W use GaN in 2026 | Yole Développement |

### Expert Quote (Mandatory GEO)
```
"Gallium nitride has compressed 60 years of silicon power electronics evolution into just 10 years. For importers, the generation matters because it determines your BOM cost, your certification path, and your retail price positioning. GaN V isn't always the right answer — but at 100W+, it's the only answer."
— Snowy May, Market Manager at WOWOHCOOL, 8+ years in power electronics sourcing
```

### Visual Suggestions
1. **Generation comparison infographic** — timeline showing GaN I→V with key metrics
2. **Chip comparison photo** — Infineon CoolGaN vs Navitas GaNFast vs Innoscience side-by-side
3. **Factory SMT line photo** — WOWOHCOOL production line (from `/image/factory/01/workshop-smt-line.webp`)
4. **Thermal comparison** — thermal camera image of GaN III vs GaN V under load

---

## 6. Internal Linking Strategy (ES Site)

### Product Pages to Link
| Page | URL | Anchor Text (ES) |
|------|-----|-----------------|
| Cargador GaN | `/es/productos/cargador-gan/` | "cargadores GaN OEM", "catálogo de cargadores GaN" |
| Cargador Inalámbrico | `/es/productos/cargador-inalambrico/` | "cargadores inalámbricos Qi2" |
| Power Bank | `/es/productos/powerbank/` | "power banks con carga GaN" |

### Related Blog Articles
| Article | URL | Anchor Text (ES) |
|---------|-----|-----------------|
| ¿Qué es un cargador GaN? | `/es/blog/que-es-cargador-gan/` | "guía básica de GaN", "qué es GaN" |
| GaN vs Silicio | `/es/blog/gan-vs-silicio-comparativa/` | "comparativa GaN vs silicio" |
| Fabricación OEM GaN V | `/es/blog/gan-v-fabricacion-oem/` | "fabricación OEM GaN V", "producción GaN Gen 5" |
| USB-C PD Carga Rápida | `/es/blog/usb-c-pd-carga-rapida/` | "USB-C PD 3.1", "protocolo de carga rápida" |

---

## 7. Meta Elements Preview (Recommended)

### Title (50-60 chars)
```
Comparativa GaN I-V: Guía OEM para Importadores 2026 | WOWOHCOOL
```
- Length: 65 chars (close enough)
- B2B signals: "OEM", "Importadores" ✅

### Meta Description (150-160 chars)
```
Comparativa generaciones GaN I-V para importadores: frecuencia, eficiencia, coste BOM y aplicaciones OEM. MOQ 500, FOB Shenzhen. Fabricante ISO 9001 desde 2013.
```
- Length: 157 chars ✅
- B2B conversion words: "MOQ 500", "FOB Shenzhen", "Fabricante ISO 9001" ✅

### Canonical URL
```
/es/blog/generaciones-gan-comparativa/
```

---

## 8. Required Schema Checklist

```
✅ BlogPosting (headline + description + datePublished + dateModified + wordCount)
✅ Person (Snowy May with LinkedIn + jobTitle + knowsAbout)
❌ FAQPage (4 questions → expand to 6-8)
❌ HowTo (MISSING — add 3-step verification guide)
✅ BreadcrumbList
✅ Organization / ManufacturingBusiness
✅ SpeakableSpecification (cssSelector: ["h1", "h2", ".speakable"])
```

### Recommended Additional FAQ Questions
5. "¿Qué certificaciones necesita un cargador GaN para vender en Europa y LATAM?"
6. "¿Cuál es el MOQ mínimo para pedir cargadores GaN OEM?"
7. "¿Cuánto cuesta certificar un cargador GaN para el mercado español?"
8. "¿Qué generación GaN usan marcas como Anker, UGREEN y Baseus en 2026?"

---

## 9. Pre-Commit Self-Check

- [ ] H1 contains ≥1 B2B signal word (OEM, fabricante, importador)
- [ ] H1 length 50-65 characters
- [ ] ≥2 H2s contain B2B signal words
- [ ] HowTo Schema added (≥3 steps)
- [ ] Image alt text contains B2B keywords
- [ ] dateModified updated to today
- [ ] wordCount updated to actual (integer, no quotes)
- [ ] ≥2 external authoritative links (rel="noopener noreferrer")
- [ ] ≥3 internal links to product pages or related articles
- [ ] FAQ questions use B2B procurement language
- [ ] Meta description contains ≥1 B2B conversion word (MOQ, FOB, fabricante)
- [ ] `modified:` field present in frontmatter

---

## 10. Expansion Target

| Metric | Current | Target |
|--------|:-------:|:------:|
| Word Count | 977 | **2,500-3,000** |
| H2 Sections | 7 | 6 (consolidate, deepen) |
| FAQ Questions | 4 | **6-8** |
| External Links | 1 | **≥3** |
| Internal Links | 0 | **≥3** |
| Comparison Tables | 0 | **2-3** |
| Images | 1 | **2-3** |
| HowTo Steps | 0 | **3** |
| Expert Insight | 0 | **1** |

---

*Brief generated 2026-08-01. Next step: `/optimize es/blog/generaciones-gan-comparativa/` or manual rewrite using this brief as specification.*
