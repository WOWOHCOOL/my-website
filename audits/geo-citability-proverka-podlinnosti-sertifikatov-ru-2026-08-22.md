# AI Citability Analysis: Проверка Подлинности Сертификатов EAC/CE/FCC (RU)

**File:** `wowohcool.com/src/ru/blog/proverka-podlinnosti-sertifikatov-eac-ce-fcc-oem/index.njk`
**Target URL:** `/ru/blog/proverka-podlinnosti-sertifikatov-eac-ce-fcc-oem/`
**Analysis Date:** 2026-08-22
**Overall Citability Score: 90/100**
**Citability Coverage:** 100% (9/9 content blocks score above 70)

---

## Score Summary

| Category | Score | Weight | Weighted |
|---|---|---|---|
| Answer Block Quality | 92/100 | 30% | 27.6 |
| Passage Self-Containment | 85/100 | 25% | 21.3 |
| Structural Readability | 93/100 | 20% | 18.6 |
| Statistical Density | 92/100 | 15% | 13.8 |
| Uniqueness & Original Data | 88/100 | 10% | 8.8 |
| **Overall** | | | **90.1/100** |

---

## Strongest Content Blocks

### 1. «3. Проверка органа и лаборатории» — 94/100
> Закупщики обычно останавливаются на зелёном статусе документа. Между тем в 2026 году основной риск сместился на уровень выше: документ действителен, а орган, который его выдал, уже лишён права работать на российском рынке.

**Why it works:** counter-intuitive claim in sentence 2, then a named registry URL, a dated regulation (ПП № 87 от 06.02.2026), four enumerated legal grounds, and the «3 приостановки → 12 месяцев» rule. Ten statistic-class tokens in 284 words. This is the block AI systems will quote for «действует ли сертификат ЕАЭС в России».

### 2. «8. Как устроен сертификационный пакет OEM на нашем заводе» — 93/100
> Проверка со стороны покупателя работает только тогда, когда с другой стороны есть что проверять. Наш завод в Шэньчжэне работает с 2013 года, площадь 5 000 м², сертификация ISO 9001, более 1 млн единиц в месяц для 200+ брендов.

**Why it works:** highest statistical density on the page (16 tokens / 252 words), all first-party: costs, lead times, AQL 2.5 Level II, defect rate below 0,3%. Not reproducible from any competitor page.

### 3. FAQ block — 91/100
> 8 self-contained Q&A pairs, each 410-493 characters, word-for-word identical to the FAQPage schema, each naming its own subject.

**Why it works:** length sits inside the 134-167-word citation sweet spot when the question is included; every answer opens with a direct verdict («Проверять обязательно», «Не обязательно, но проверять нужно дальше», «Отдельного знака "China Export" не существует»).

---

## Weakest Content Blocks (no rewrite required — all above 70)

### 1. «6. Девять признаков подделки» — 79/100

**Current opening:**
> Поддельный сертификат распознаётся по девяти признакам на трёх уровнях: три видны в самом файле, три — в государственных реестрах, три — на образце, который вы держите в руках.

**Limitation:** the block's substance lives in a 9-row table, so extractable prose is thin (227 words, 2 paragraphs). Tables extract well for Perplexity and Gemini but poorly for ChatGPT-style prose citation.

**Optional improvement:** add one 40-60 word standalone paragraph naming the three most decisive signals in prose form. Expected lift: +6 points on this block.

### 2. «2. Проверка сертификата ЕАС за 5 минут» — 84/100

**Limitation:** the status table carries the decision logic; surrounding prose has fewer hard numbers than neighbouring sections.

**Already mitigated:** the intro now states the 3-working-day registry deadline and that the registry record is the only proof of legal force.

### 3. «4. Кейс 2026» — 85/100

**Limitation:** the Yekaterinburg mini-story is first-hand but unattributable (no company name), which lowers verifiability for AI systems that prefer named sources.

**Optional improvement:** none recommended — client anonymity is intentional. The verifiable half (suspended certification bodies, ПП № 87) is already attributed.

---

## Quick Win Reformatting Recommendations

Applied during this pass:

1. **Answer-first opening added to §1, §2, §6** — each H2 now opens with a definition or a counted answer. Lift: +5
2. **Four H3s converted to explicit question format** (`Почему протокол испытаний важнее самого сертификата?` etc.) — directly matchable to AI queries. Lift: +3
3. **All 26 H3/H4 answers brought inside 60-500 chars** — every subsection is now an extractable unit. Lift: +6
4. **`<cite>` markup on all 6 sources** — AST-level citation signal for AI parsers. Lift: +3
5. **FAQ answers rewritten to 410-493 chars, word-for-word matched to schema** — removes body/schema drift that suppresses FAQ extraction. Lift: +4

Remaining optional (not applied):

6. **Prose summary of the top-3 red flags in §6** — Expected lift: +2 overall
7. **Screenshots of the two registry lookups** with descriptive alt text — Expected lift: +2 overall (blocked on asset creation, see publish checklist)

---

## Per-Section Scores

| Section Heading | Words | Answer | Self-Contained | Structure | Stats | Unique | Overall |
|---|---|---|---|---|---|---|---|
| 1. Что входит в настоящий сертификационный пакет | 253 | 95 | 88 | 95 | 75 | 85 | 89 |
| 2. Проверка сертификата ЕАС за 5 минут — реестр ФГИС | 258 | 92 | 85 | 95 | 70 | 80 | 86 |
| 3. Проверка органа и лаборатории | 284 | 95 | 90 | 92 | 100 | 95 | 94 |
| 4. Кейс 2026: настоящий сертификат, который не работает в России | 294 | 88 | 80 | 88 | 85 | 90 | 86 |
| 5. Проверка FCC, UL и CE | 271 | 92 | 88 | 90 | 90 | 80 | 89 |
| 6. Девять признаков подделки | 227 | 82 | 70 | 90 | 65 | 85 | 79 |
| 7. Документ приостановлен, груз в пути | 336 | 90 | 85 | 95 | 95 | 85 | 90 |
| 8. Сертификационный пакет OEM на нашем заводе | 252 | 90 | 88 | 92 | 100 | 100 | 93 |
| FAQ (8 вопросов) | 623 | 95 | 92 | 95 | 85 | 85 | 91 |

---

## Notes on Russian-language citability

- **Unit regexes in the B2B auditor are Latin-only** (`mm`, `W`, `$`, `€`). Cyrillic units (`мм`, `Вт`) and prefix currency (`$2 500`, `100 000 ₽`) are not machine-counted, which understates the FAQ answer-side data score (76/100). The actual quantified-data density in the FAQ is 8/8 answers, not 2/8. No content change made for this — rewriting natural Russian into `2 500 USD` to satisfy a Latin-unit regex would degrade the page for its real readers.
- **Em-dash scrubbing does not apply to RU.** Russian тире is grammatically required; `/scrub` must be skipped for this file (same rule as RU P0-1).
