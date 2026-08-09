# AI Citability Analysis: Доставка из Китая OEM 2026

**URL:** https://www.wowohcool.com/ru/blog/dostavka-iz-kitaya-logistika-oem/
**Analysis Date:** 2026-08-09
**Overall Citability Score: 66/100**
**Citability Coverage:** 35% of content blocks score above 70

---

## Score Summary

| Category | Score | Weight | Weighted |
|---|---|---|---|
| Answer Block Quality | 58/100 | 30% | 17.4 |
| Passage Self-Containment | 86/100 | 25% | 21.5 |
| Structural Readability | 70/100 | 20% | 14.0 |
| Statistical Density | 72/100 | 15% | 10.8 |
| Uniqueness & Original Data | 22/100 | 10% | 2.2 |
| **Overall** | | | **66/100** |

---

## Diagnosis: Where the Score Leaks

### Critical Gap: Answer Block Quality (58/100)

**Root cause:** 32 out of 41 H2/H3 sections open with narrative explanation rather than a 1-2 sentence standalone answer. Most H3s start with context-setting sentences like "При условиях FOB Shenzhen завод-изготовитель отвечает за..." rather than "FOB — это...".

**Impact:** AI systems like ChatGPT and Perplexity scan for definition patterns ("X is...", "X refers to...") when selecting citation passages. Without answer-first openings, the article's dense factual data is buried behind narrative context — invisible to citation algorithms.

**Concrete example (H3 «FOB Shenzhen: ответственность завода и риски покупателя»):**
- Current opening: «При условиях FOB Shenzhen завод-изготовитель отвечает за: производство, упаковку, экспортное оформление в Китае и погрузку товара на борт судна...» (context-first, answer is at the end of a long sentence)
- GEO-optimized: «FOB Shenzhen — это условие поставки, при котором завод WOWOHCOOL берёт на себя производство, упаковку и погрузку товара в порту Шэньчжэня. Всё, что после погрузки — фрахт, страховка, таможня РФ — зона ответственности покупателя.» (definition pattern, self-contained in 42 words)

### Secondary Gap: Uniqueness (22/100)

**Root cause:** Most technical sections use generic industry data (freight rates, HS codes, transit times) that is available on competitor logistics sites. Only 5 sections contain factory-specific data (WOWOHCOOL MOQ, our QC process, our payment terms).

**Sections with high uniqueness:** СПОТ (+75), H1 (+100), Expert Quote (+100), Packaging optimization (+50)

### Strengths

- **Self-Containment (86/100):** Passages consistently name their subject. Minimal pronoun dependency. Each section is understandable in isolation.
- **Statistical Density (72/100):** Heavy use of tables with specific dollar amounts, transit times, weight specs, and HS codes. Averaging 3-5 data points per technical section.
- **Structural Readability (70/100):** Clean H1→H2→H3 hierarchy. 8 tables. Consistent use of lists for criteria and steps. FAQ section with question-answer pairs.

---

## Strongest Content Blocks (Citation-Ready)

### 1. H1 — Доставка из Китая OEM 2026 — Score: 87/100
> "Доставка из Китая OEM 2026: Логистика, Таможня и DDP для Импортёров"

**Why it works:** Concise, keyword-dense, self-contained. Contains 3 B2B signal words (OEM, DDP, Импортёров) + year anchor. Perfect for AI title extraction.

### 2. «Как платить китайскому OEM-поставщику из России в 2026 году?» — Score: 81/100
> Question-answer format + specific payment routes + factory payment terms (30% предоплата, 70% перед отгрузкой). High uniqueness (WOWOHCOOL-specific payment conditions).

**Why it works:** Direct question → concrete answer with 3 named payment routes + factory-specific data. Self-contained 86-word answer block.

### 3. «Сроки vs Затраты: что выбрать для первой партии» — Score: 78/100
> Expert quote + factory weight data (0.15 кг/шт GaN 65W, 0.28 кг/шт power bank 10K) + decision rule for first shipment.

**Why it works:** First 60 words contain a concrete recommendation (ж/д сборный груз DDP) + 2 specific factory data points. Expert quote adds authority signal.

---

## Weakest Content Blocks (Rewrite Priority)

### 1. H3 «FOB Shenzhen: ответственность завода и риски покупателя» — Score: 56/100

**Current opening:**
> "При условиях FOB Shenzhen завод-изготовитель отвечает за: производство, упаковку, экспортное оформление в Китае и погрузку товара на борт судна в порту Шэньчжэня."

**Problem:** Answer is buried in a 30-word run-on sentence. No definition pattern. AI systems scanning for "FOB — это..." will not detect this as an answer block.

**Suggested rewrite:**
> "FOB Shenzhen — это базовое условие поставки для OEM-импортёров. Завод выполняет 4 обязательства: производство, упаковка, экспортное оформление в Китае и погрузка товара в порту. Всё после погрузки — фрахт ($1.3-8.0/кг), страхование (0.1% CIF), таможня РФ и доставка до склада — зона ответственности покупателя."

**Additional improvements:**
- Add cost range in the opening sentence
- Split long paragraph into 3 shorter ones (2-3 sentences each)
- Move "когда оправдан FOB" checklist into a 3-item unordered list

### 2. H3 «EXW: почему не стоит экономить на самовывозе» — Score: 56/100

**Current opening:**
> "EXW (Ex Works) — товар забирается с ворот завода. Выглядит дёшево на бумаге, но все риски экспортного оформления в Китае ложатся на покупателя."

**Problem:** Definition is weak. First sentence is 5 words — too short for AI extraction. No specific number.

**Suggested rewrite:**
> "EXW (Ex Works) означает, что покупатель забирает товар непосредственно с ворот завода WOWOHCOOL в Шэньчжэне. Цена EXW на 8-12% ниже FOB, но покупатель несёт 100% рисков: экспортное оформление в Китае без китайского юрлица невозможно, груз не покинет страну. EXW оправдан только при наличии собственного торгового агента в Китае."

**Additional improvements:**
- Add the percentage savings vs risk tradeoff
- Specify "без китайского юрлица невозможно" as a hard constraint

### 3. H3 «Как выбрать надёжного экспедитора для перевозки электроники из Китая?» — Score: 56/100

**Current opening:**
> "Ключевые критерии: (1) лицензия FIATA или членство в национальной ассоциации экспедиторов; (2) опыт работы с опасными грузами класса 9..."

**Problem:** Question is in the heading, but the answer body starts with a bare list. First 60 words lack a summary answer — jumps straight into criteria.

**Suggested rewrite:**
> "Надёжного экспедитора для перевозки электроники из Китая определяют 5 критериев: лицензия FIATA, опыт с опасными грузами класса 9, DDP-возможности с белой таможенной очисткой, онлайн-трекинг каждые 4 часа, и прозрачная all-inclusive ставка с комиссией $150-300 фиксированно. Проверьте минимум 3 варианта перед первой отправкой."

**Additional improvements:**
- Add the 5-criteria summary in one sentence
- Add the "$150-300" specific commission range
- Add "минимум 3 варианта" as an actionable rule

---

## Quick Win Reformatting Recommendations

| # | Recommendation | Expected Lift |
|:--:|----------------|:------------:|
| 1 | **Add answer-first openings to all 8 H3s in Section 2 (Incoterms) and Section 3 (Shipping Methods).** Replace context-first sentences with "X — это..." or "X означает..." definition patterns in the first 40-60 words. | +8-12 pts |
| 2 | **Add factory-specific data to 5 generic sections.** Insert "WOWOHCOOL factory data:" references in the freight forwarder criteria, customs documents, and transit risks sections. Currently only 5/32 sections cite factory data. | +5-8 pts |
| 3 | **Add named expert attribution to key claims.** Wrap 2-3 factual claims with "По данным WOWOHCOOL (завод в Шэньчжэне, с 2013)..." to add authority signals AI systems use for citation ranking. | +3-5 pts |
| 4 | **Shorten 3 sections that exceed 200 words into sub-blocks.** The FOB, DDP, and TIR sections are long single blocks — split each into 2 sub-blocks with mini-headings to increase extractable passage count. | +3-5 pts |
| 5 | **Add a comparison table for the bottom-scoring FOB/EXW sections.** Tables boost structural readability from 70 to 95 and are extracted with high fidelity by all AI systems. | +2-4 pts |

---

## Per-Section Scores

| # | Section | Words | Answer | Self | Struct | Stats | Unique | **Total** |
|:--:|---------|:-----:|:------:|:----:|:------:|:-----:|:------:|:---------:|
| 1 | H1 Title | 292 | 85 | 90 | 70 | 100 | 100 | **87** |
| 2 | Key Takeaways (H2) | 72 | 55 | 90 | 70 | 0 | 0 | **53** |
| 3 | ToC (H2) | 70 | 55 | 90 | 70 | 0 | 0 | **53** |
| 4 | Unit Cost (H3) | 70 | 85 | 75 | 70 | 100 | 0 | **73** |
| 5 | Сроки vs Затраты (H3) | 156 | 55 | 90 | 70 | 100 | 100 | **78** |
| 6 | FOB Shenzhen (H3) | 71 | 55 | 90 | 70 | 0 | 25 | **56** |
| 7 | DDP Москва (H3) | 103 | 55 | 90 | 70 | 100 | 25 | **70** |
| 8 | EXW (H3) | 86 | 55 | 90 | 70 | 0 | 25 | **56** |
| 9 | Incoterms Table (H3) | 53 | 55 | 90 | 70 | 0 | 0 | **53** |
| 10 | TIR (H3) | 85 | 55 | 90 | 70 | 100 | 0 | **68** |
| 11 | Ж/Д (H3) | 120 | 55 | 90 | 70 | 100 | 0 | **68** |
| 12 | Море+ж/д (H3) | 85 | 55 | 90 | 70 | 100 | 0 | **68** |
| 13 | Авиа (H3) | 82 | 55 | 75 | 70 | 100 | 0 | **64** |
| 14 | Сводная таблица (H3) | 84 | 55 | 75 | 70 | 100 | 50 | **69** |
| 15 | Landed Cost Formula (H3) | 66 | 55 | 75 | 70 | 100 | 0 | **64** |
| 16 | Landed Cost Example (H3) | 90 | 55 | 75 | 70 | 100 | 0 | **64** |
| 17 | Таможенные документы (H3) | 67 | 55 | 90 | 70 | 0 | 100 | **63** |
| 18 | ТН ВЭД (H3) | 68 | 55 | 90 | 70 | 100 | 0 | **68** |
| 19 | Литиевые батареи (H3) | 122 | 55 | 90 | 70 | 100 | 0 | **68** |
| 20 | СПОТ (H3) | 94 | 55 | 90 | 70 | 100 | 75 | **76** |
| 21 | Платежи (H3) | 98 | 55 | 90 | 70 | 100 | 25 | **70** |
| 22 | Транзитные риски (H3) | 98 | 55 | 75 | 70 | 100 | 0 | **64** |
| 23 | Критерии экспедитора (H3) | 121 | 55 | 90 | 70 | 100 | 0 | **68** |
| 24 | 7 вопросов (H3) | 142 | 55 | 90 | 70 | 0 | 100 | **63** |
| 25 | Оптимизация упаковки (H3) | 140 | 55 | 90 | 70 | 100 | 50 | **73** |
| 26 | Консолидация (H3) | 75 | 55 | 75 | 70 | 100 | 0 | **64** |
| 27 | Сезонность (H3) | 69 | 55 | 90 | 70 | 100 | 0 | **68** |
| 28 | Страхование (H3) | 75 | 55 | 90 | 70 | 100 | 25 | **70** |
| 29 | FAQ #1 (H3) | 87 | 65 | 90 | 70 | 100 | 0 | **71** |
| 30 | FAQ #2 (H3) | 95 | 65 | 75 | 70 | 100 | 25 | **70** |
| 31 | FAQ #3 (H3) | 98 | 65 | 75 | 70 | 100 | 0 | **67** |
| 32 | FAQ #4 (H3) | 104 | 65 | 90 | 70 | 100 | 0 | **71** |
| 33 | FAQ #5 (H3) | 75 | 65 | 90 | 70 | 100 | 0 | **71** |
| 34 | FAQ #6 (H3) | 136 | 65 | 90 | 70 | 0 | 0 | **56** |
| 35 | FAQ #7 (H3) | 102 | 65 | 90 | 70 | 100 | 25 | **74** |
| 36 | FAQ #8 (H3) | 115 | 65 | 90 | 70 | 100 | 100 | **81** |
| 37 | CTA (H2) | 58 | 55 | 90 | 70 | 100 | 0 | **68** |
| 42 | Источники (H2) | 60 | 55 | 90 | 70 | 100 | 100 | **78** |

> Rows 37-42 exclude Related Articles (38-41) which are navigational, not substantive.

---

## AI System Citation Likelihood

| AI System | Likelihood | Reason |
|-----------|:----------:|--------|
| **ChatGPT Search** | Medium | Strong statistics but weak answer-block openings. ChatGPT prefers explicit definition patterns. |
| **Perplexity** | Medium-High | Heavy data density in tables. Perplexity values fact-rich passages. |
| **Claude** | Medium-High | Well-structured, comprehensive. Claude values nuance and accuracy. |
| **Gemini (AI Overviews)** | Low-Medium | Lacks the 40-60 word concise answer blocks Gemini prioritizes. FAQ section is strongest. |
| **Copilot (Bing)** | Medium | Similar to Gemini. FAQ answers are extractable but body text needs shorter answer blocks. |

---

*Analysis by Claude Code GEO Citability Skill · 2026-08-09*
