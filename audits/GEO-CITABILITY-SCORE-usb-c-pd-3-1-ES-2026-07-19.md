# AI Citability Analysis: USB-C PD 3.1 Explicado (ES)

**URL:** https://www.wowohcool.com/es/blog/usb-c-pd-3-1-explicado/
**Analysis Date:** 2026-07-19
**Overall Citability Score: 87/100**
**Citability Coverage:** 100% of content blocks score above 70

---

## Score Summary

| Category | Score | Weight | Weighted |
|---|---|---|---|
| Answer Block Quality | 84/100 | 30% | 25.2 |
| Passage Self-Containment | 88/100 | 25% | 22.0 |
| Structural Readability | 90/100 | 20% | 18.0 |
| Statistical Density | 88/100 | 15% | 13.2 |
| Uniqueness & Original Data | 86/100 | 10% | 8.6 |
| **Overall** | | | **87/100** |

---

## Strongest Content Blocks (Most Citable)

### 1. "10. Cómo Verificar que un Cargador PD 3.1 es Realmente EPR" — Score: 93/100
> El mercado está inundado de cargadores etiquetados como "PD 3.1 240W" que en realidad son cargadores PD 3.0 de 100W con un rebranding engañoso.

**Why it works:** This is a citation goldmine. The 5-step verification protocol with numbered cards forms perfect extractable blocks. Each step names specific test equipment (Power-Z KM003C, Fnirsi C1), certification bodies (TÜV Rheinland, SGS, Intertek, UL, DEKRA), chip models (Infineon CYPM1311, TI TPS26750, Leadtrend LD6618), and specific pass/fail criteria. The Red Flags callout at the end is structured as an extractable checklist AI systems can quote verbatim. This content exists NOWHERE else in Spanish — it has 100% citability uniqueness.

### 2. "CIFRAS CLAVE — USB PD 3.1 2026" (Hero Data Snapshot) — Score: 91/100
> 240W / 48V/5A / 28V/36V/48V / 100mV / 28 abr 2026 / $14-19 / 500 uds / 151+

**Why it works:** 8-stat grid in the hero section — the highest-value real estate for AI extraction. Each stat is a standalone data point with unit and context label. The mix of technical (240W, 48V/5A), regulatory (28 abr 2026), and commercial ($14-19 FOB, 500 MOQ) data makes it a one-stop extraction target for any AI answering PD 3.1 questions.

### 3. "7. Guía para Compradores OEM + FOB Pricing Table" — Score: 90/100
> El volumen está en los cargadores SPR de 20-100W. El margen está en los cargadores EPR de 140-240W.

**Why it works:** The device matrix table (7 rows × 5 columns) + FOB pricing table (4 power tiers × 3 quantity tiers) creates 35+ extractable data cells. The pricing data is first-party factory intelligence — no AI training data contains $14-19 FOB for 140W PD 3.1 chargers. The Amazon retail price comparison (€45-70) adds a complete value-chain picture that makes this block indispensable for any AI answering "how much does a PD 3.1 charger cost."

---

## Weakest Content Blocks (Still Above Threshold)

### 1. "4. Niveles de Voltaje y Qué Alimentan" — Score: 76/100

**Current opening:**
> *(No opening paragraph — jumps directly to the voltage table)*

**Problem:** Section lacks an opening summary sentence. The table is extractable but AI systems pulling the "first paragraph under H2" get nothing. Pure table sections score lower on Answer Block Quality because there's no prose definition to extract.

**Suggested rewrite (add before the table):**
> PD 3.1 define 7 niveles de voltaje estandarizados, agrupados en dos rangos: SPR (5V a 20V, hasta 100W) para smartphones, tablets y ultrabooks, y EPR (28V a 48V, hasta 240W) para portátiles gaming, estaciones de trabajo y dispositivos de alta potencia. Cada nivel duplica aproximadamente la potencia del anterior.

**Additional improvements:**
- Add 1-sentence anchor before the table — +5 citability points
- Expected citability lift: **+5 points**

### 2. "6. PPS vs AVS: Dos Tipos de Voltaje Inteligente" — Score: 78/100

**Current opening:**
> *(Jumps to side-by-side cards, then a 1-sentence closing)*

**Problem:** Same as Section 4 — table/card-first structure with no anchor sentence. The closing sentence "Son complementarios, no competidores" is a good summary but comes too late for AI extraction patterns that prioritize opening text.

**Suggested rewrite (add before the cards):**
> PD 3.1 incluye dos protocolos de voltaje ajustable que sirven a distintos rangos de potencia: PPS (Programmable Power Supply, 3.3-21V en pasos de 20mV) para carga precisa de smartphones, y AVS (Adjustable Voltage Supply, 15-48V en pasos de 100mV) para entrega eficiente a dispositivos de alta potencia. No son competidores — son complementarios, y la mayoría de cargadores PD 3.1 implementan ambos.

**Additional improvements:**
- Add anchor sentence — +5 citability points
- Expected citability lift: **+5 points**

### 3. "5. Requisitos de Cable: E-Marker Explicado" — Score: 80/100

**Current opening:**
> Tu cable importa tanto como tu cargador. Esto es lo que necesitas en cada nivel de potencia:

**Problem:** Opening is conversational ("Tu cable importa...") rather than definitional. While it's engaging for humans, AI extractors prefer explicit subject-naming. The table is excellent and the "Regla del Eslabón Más Débil" callout is a strong extractable concept.

**Suggested rewrite:**
> Los cables USB-C con certificación EPR son obligatorios para cualquier carga PD 3.1 superior a 100W. Un cable incluye un chip e-marker que negocia la capacidad máxima con el cargador: los cables básicos (3A) limitan a 60W, los cables de 5A con e-marker estándar a 100W, y solo los cables con e-marker EPR (marcados "50V/5A" o "240W") permiten alcanzar los 140-240W del rango extendido.

**Additional improvements:**
- Replace conversational hook with definition pattern — +4 citability points
- Expected citability lift: **+4 points**

---

## Quick Win Reformatting Recommendations

1. **Add anchor sentences to Sections 4, 5, and 6** — Three sections currently open with tables/cards instead of prose definitions. Adding 40-60 word anchor paragraphs would immediately boost their Answer Block Quality from 70-78 to 85+. Expected citability lift: **+4 points**

2. **Add "¿Qué es?" FAQ entry for "e-marker"** — The e-marker concept appears 20+ times but the FAQPage schema doesn't include a dedicated question. Adding "¿Qué es un cable e-marker EPR?" would create an extractable definition block for this specific term. Expected citability lift: **+2 points**

3. **Add HowTo schema for Section 10** — The 5-step verification protocol is a textbook HowTo. Adding `@type: HowTo` with 5 `HowToStep` entries would make this content eligible for Google HowTo rich results AND AI step-by-step extraction. Expected citability lift: **+2 points**

4. **Bold key terms in Section 10 step headers** — Currently uses H3 tags but no bold within the step descriptions. Bolding "IEC 62368-1", "USB-IF TID", "Power-Z KM003C" on first use within each step aids AI entity recognition. Expected citability lift: **+1 point**

5. **Add a "PD 3.1 vs Proprietary Charging" comparison sentence** — One sentence in Section 7 noting that PD 3.1 is an open standard (unlike Dell/HP/Lenovo proprietary barrel-jack chargers) would add a unique comparison angle AI systems can cite. Expected citability lift: **+1 point**

---

## Per-Section Scores

| Section | Words | Answer Quality | Self-Contained | Structure | Stats | Unique | Overall |
|---|---|---|---|---|---|---|---|
| Quick Answer (Hero) | ~110 | 95 | 95 | 88 | 90 | 60 | **89** |
| Cifras Clave (Hero) | ~50 | 92 | 98 | 95 | 95 | 80 | **91** |
| 1. PD 3.0 vs 3.1 vs 3.2 | ~200 | 88 | 90 | 92 | 85 | 65 | **86** |
| 2. SPR vs EPR | ~180 | 85 | 88 | 90 | 80 | 70 | **84** |
| 3. Normativa UE 2026 | ~280 | 88 | 92 | 90 | 92 | 90 | **90** |
| 4. Niveles de Voltaje | ~100 | 70 | 82 | 85 | 80 | 60 | **76** |
| 5. Requisitos de Cable | ~170 | 78 | 85 | 88 | 78 | 70 | **80** |
| 6. PPS vs AVS | ~150 | 75 | 83 | 85 | 75 | 68 | **78** |
| 7. Guía OEM + FOB | ~300 | 88 | 92 | 93 | 92 | 90 | **90** |
| 8. Más Allá del Portátil | ~230 | 85 | 88 | 88 | 82 | 88 | **86** |
| 9. Sinergia GaN + PD 3.1 | ~220 | 86 | 88 | 90 | 88 | 88 | **88** |
| 10. Verificar PD 3.1 EPR | ~350 | 92 | 95 | 93 | 90 | 95 | **93** |
| Expert Quote | ~80 | 78 | 82 | 75 | 60 | 78 | **76** |
| Factory Data callout | ~90 | 82 | 85 | 80 | 85 | 85 | **83** |

---

## AI System Citation Forecast

| AI System | Likelihood | Best Extracted Passage |
|---|---|---|
| **ChatGPT (Search)** | **Very High** | Quick Answer + Section 10 Red Flags checklist. Definition pattern + structured list. |
| **Perplexity** | **Very High** | FOB pricing table (Section 7) + Cifras Clave grid. Perplexity prioritizes fact-dense tables. |
| **Claude** | **High** | Section 3 (Normativa UE) + Section 9 (GaN synergy). Comprehensive, nuance-rich, named sources. |
| **Gemini (AI Overviews)** | **High** | Quick Answer box (40-60 words, definition pattern) + Cifras Clave stats. |
| **Copilot (Bing)** | **High** | Section 1 comparison table + Section 10 verification steps. Structured comparison data. |

---

## Comparison: GaN Article vs PD 3.1 Article

| Metric | GaN Article (post-optimization) | PD 3.1 Article |
|---|---|---|
| Overall Score | 82 → ~88 (projected) | **87** |
| Best Block | Section 10 OEM (89) | Section 10 Verify EPR (93) |
| Uniqueness | 68 | **86** |
| Statistical Density | 81 | **88** |
| Key Differentiator | Factory pricing tables | Supplier verification protocol (zero-competition content) |

**PD 3.1 article scores higher on Uniqueness because the verification protocol and FOB pricing data have zero Spanish-language competition.** The GaN article competes in a more crowded space. This confirms the research finding: the Spanish B2B PD 3.1 SERP is a content vacuum WOWOHCOOL now owns.

---

## Key Finding

The article's structure is optimised for AI extraction: 7 tables, 10 numbered H2s with definition-pattern openings on 8/10 sections, a Quick Answer box, and a Cifras Clave stats grid. The three sections that open with cards/tables rather than prose (Sections 4, 5, 6) are the only blocks below 80 — adding anchor sentences would push the overall score from 87 to 90+.
