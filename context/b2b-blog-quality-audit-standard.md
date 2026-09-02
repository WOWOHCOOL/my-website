# B2B Blog Quality Audit Standard 2026 (v2.2 — streamlined)

**Applies to**: All WOWOHCOOL sites (DE, EN, ES, FR, RU, PL)
**Last Updated**: 2026-09-01（v2.2 精简：去四处跨节重复、修 §X 栅栏 bug、数据对齐 factory-data v3；规则全量保留）
**Based on**: Google Helpful Content System, E-E-A-T, Information Gain Patent, AI Overviews/SearchGPT/Perplexity

> 📌 **权威优先级声明**：本文档为 WOWOHCOOL B2B 博客/内容质量审计的**最高执行标准**。凡与 `seo-guidelines.md`（开源框架基线）冲突（FAQ 数量、speakable 选择器、Quick Answer 盒、Keyword Density、rel 属性等），**一律以本文档及 `b2b-multilingual-metadata-standard.md` / `blog-template-standard.md` 为准**。`seo-guidelines.md` 仅作产品页/关键词研究的补充参考。

---

## 📖 阅读导航（Reader's Guide）

按场景跳读，**不是每次都通读全文**：

| 场景 | 必读章节 |
|------|---------|
| **写作新文章** | §I（选题/信息增益）→ §II（H1-H4 结构）→ §III（内容四支柱）→ §IV（CTA） |
| **审计/优化已有文章** | §VI（19 自动化检查）→ §VII（信息增益评分）→ §VIII（评分标准）→ §X（预发布检查清单） |
| **写 Schema** | 以 `b2b-multilingual-metadata-standard.md` 为准；本文档 §III.4 仅补充 |
| **GEO 优化** | §IX（B2B→GEO 桥接）+ §XV（AI 爬虫访问） |
| **技术实现（.njk/部署）** | §XII（静态 HTML）→ §XIII（WCAG）→ §XIV（CWV）→ §XVI（CI/CD 管线） |
| **快速自查** | §X（检查清单）+ §V（致命逻辑错误） |

---

## Core Principle

In 2026, Google no longer rewards "more words + keyword density." The algorithm evaluates content on three dimensions:

1. **Information Gain** — Does this page add something the top 5 SERP results don't already cover?
2. **E-E-A-T** — Experience, Expertise, Authoritativeness, Trustworthiness
3. **Helpful Content** — Was this written for humans with real first-hand knowledge, or generated for SEO?

Content that parrots existing SERP results gets zero visibility. Content with genuine factory-floor data, test results, and engineer-level detail wins.

---

## I. Keyword Dimension: Intent & Information Gain

### Dead Practice: Keyword Stuffing

Repeating "Best GaN Charger Manufacturer, Custom GaN Charger Factory, China 140W GaN Charger" across titles and body = **spam signal**. Google's semantic AI detects this instantly. Result: zero impressions.

### Required: Information Gain

The Information Gain concept (from Google patents US2022/0309025A1 and related filings, widely discussed in SEO research but never officially confirmed as a production ranking signal) suggests pages adding unique vocabulary and entities beyond the top SERP results receive higher visibility. In practice, articles that reword existing content without first-party data consistently underperform.

**How to win**: Deploy **exclusive industry terminology and first-party data** competitors don't have:

| Generic (Zero Gain) | High-Gain Alternative |
|---------------------|----------------------|
| "GaN chargers are smaller" | "GaN HEMT switching at 3 MHz reduces transformer volume by 55% vs. silicon at 100 kHz" |
| "Good thermal performance" | "Case temperature stabilized at 58.3°C under 100% load after 4-hour aging test" |
| "Certified for EU market" | "EN 62368-1 Annex M.4 creepage distance: 6.4mm verified at TÜV Rheinland Lab #C-2026-0842" |

**B2B high-value anchor terms**:
- `PCBA ripple noise testing (mVp-p)` · `Energy Density (Wh/kg)` · `Cycle life curve at 0.5C/1C discharge`
- `AQL sampling per ISO 2859-1` · `BOM cost breakdown: GaN FET vs. Si MOSFET`
- `FOB Shenzhen vs. DDP Hamburg landed cost comparison`

### Search Intent Classification

B2B blogs target **commercial and investigational intent** only. Never chase broad B2C terms dominated by media giants.

| Intent Type | Example | Target? |
|-------------|---------|---------|
| B2C Informational | "What is a GaN charger" | ❌ Do not target |
| B2B Investigational | "How to audit Qi2 wireless charger certification for EU import" | ✅ Primary |
| B2B Commercial | "140W GaN charger OEM cost breakdown FOB Shenzhen" | ✅ Primary |
| B2B Transactional | "OEM GaN charger manufacturer MOQ 500 CE GS" | ✅ Secondary |

Long-tail B2B keywords have lower volume but **higher CTR and conversion** — every click is a qualified procurement lead.

### B2B vs B2C Audience Classification

| Signal Type | Keywords |
|-------------|---------|
| **B2B** | OEM, ODM, manufacturer, factory, supplier, wholesale, sourcing, procurement, import, export, B2B, MOQ, FOB, supply chain, vendor, bulk, compliance, certification, industrial, enterprise, commercial, tender, distributor, private label, importer |
| **B2C** | best, top, review, buying guide, cheap, affordable, for home, personal use, consumer, retail, amazon, for beginners, budget, discount, deal, favorite, most popular |

---

## II. Heading Structure: H1 → H2 → H3 → H4

Google's crawler and AI extractors build the page's logic map entirely from heading hierarchy.

### H1 (Page Title): One Per Page

A title that earns the click must contain **three precise elements**: ① audience label (OEM buyer / importer / procurement manager), ② specific metric or scenario (spec / regulation number / concrete use case), ③ clear expected return (cost breakdown / checklist / compliance roadmap).

| Rule | Value |
|------|-------|
| **Character limit** | 50–65 characters |
| **Must contain** | ≥1 B2B signal word |
| **Must NOT contain** | B2C language (best, top, review, buying guide, how to choose) |

| ❌ Vague (Low CTR) | ✅ High-CTR Formula |
|----------|---------|
| "How to Choose a Good GaN Charger Manufacturer" | "140W PD 3.1 GaN Charger OEM Guide: 3 Thermal Tests to Verify Before Your First Order (2026)" |
| "Welcome to Our GaN Charger Factory" | "140W GaN Charger OEM Manufacturer: B2B Sourcing Guide 2026" |
| "Powerbank auswählen: Der komplette Käuferratgeber" | "Powerbank Beschaffungsratgeber 2026: OEM-Auswahl für Importeure" |

### H2 (Major Sections): Map the B2B Buyer's Decision Journey

Organize by the **procurement manager's mental decision chain**: ① Why this matters → ② What to verify → ③ How it's done → ④ What it costs → ⑤ How to comply.

#### H2 B2B Signal Density: Tiered Standard

**B2B Signal Words** (15 for density calculation): `OEM`, `ODM`, `manufacturer`, `factory`, `supplier`, `importer`, `sourcing`, `MOQ`, `FOB`, `B2B`, `procurement`, `wholesale`, `bulk`, `supply chain`, `vendor`

| Article Type | Target Range | Examples |
|---|---|---|
| **Technical/Educational** | **10–40%** | mAh guides, GaN science, USB PD specs, certification explainers |
| **Procurement/Supply Chain** | **30–55%** | shipping/logistics, factory selection, hotel procurement, QC/sourcing guides |
| **OEM/ODM Core Topic** | **50–80%** | OEM vs ODM comparisons, manufacturer directories, private label guides |

**Classification rule**: teach a technical concept → Technical; guide a procurement decision → Procurement; the topic itself IS a B2B business-model comparison → OEM/ODM Core.

#### Two Quality Rules (apply regardless of density tier)

**Rule A — Adjacency Cap**: No 3 consecutive H2s may use the same B2B modifier.
**Rule B — Vocabulary Rotation**: The same B2B concept varies expression across H2s（`procurement` / `buying` / `sourcing` / `supply`）.

#### Pre-Publish H2 Audit Checklist

```
[ ] 1. Classify article → Technical / Procurement / OEM Core
[ ] 2. Count content H2s (exclude TOC, Related Articles, Sources) + B2B-signal H2s → density in tier range?
[ ] 3. Adjacency: any 3+ consecutive H2s with same B2B word? → Fix
[ ] 4. Vocabulary: ≥2 different B2B terms across H2s? → Fix if only 1
[ ] 5. Density too high → strip forced prefixes from technical sections; too low → add to procurement sections only
```

#### B2B Signal Words: Naturalness Principle (Anti-Keyword-Stuffing)

B2B signal words must integrate **naturally** into sentence context. One per sentence is sufficient; stacking = spam signal. FAQ answers containing real procurement data（pricing, lead times, certification codes）are B2B **by substance**, even without the literal word "OEM". When in doubt: leave it out.

**The Auditor's keyword-count may under-score substantively-B2B content using varied vocabulary** — expected limitation. When the FAQ B2B Language score is below 70 but answers contain procurement substance (Trade Assurance, T/T 30/70, ISO 9001, UNE-EN, AENOR, ODM, moldes), treat the score as advisory, not a defect.

#### Rule C — Implicit B2B Context (Anti-False-Positive)

**Do NOT flag H2s as "missing B2B signal" when the heading implies B2B procurement context semantically.** The 15-word list is a heuristic, not a gate. Implicit-B2B indicators (any ONE qualifies): product-line/portfolio decisions · supplier evaluation framing · BOM/margin/ROI analysis · regulatory compliance strategy · factory production capability · corporate sustainability (EU ESPR/CSRD).

**Litmus**: *"Would a consumer searching this topic care about this heading?"* If no — only a procurement manager/brand owner/importer would — the H2 is B2B by definition. Do not force keyword insertion into semantically complete headings.

### H3/H4 (Detail Anchors): Feed AI Search and Featured Snippets

H3s must be **extremely specific** — phrased as a question or a data conclusion:

```
❌ H3: "Thermal Performance"
✅ H3: "What Case Temperature is Acceptable Under 100% Load for CE Compliance?"

❌ H4: "Wichtig"
✅ H4: "Why Keeping the Housing Under 65°C Prevents GS-Zeichen Rejection"
```

**The Golden Rule (answer-first)**: Immediately after every H3/H4, open with a **self-contained first sentence ≤150 characters** stating the direct conclusion — the prime position Google scrapes for Featured Snippets and AI citations. Alternatively, lead with a comparison table.

**DOM Structural Rule — Direct Sibling**: The first `<p>` after each H3 must be a **direct sibling** — nothing between `<h3>` and its answer `<p>`:

```
✅ <h3>Question?</h3><p>Answer...</p>                        ← Featured Snippet eligible
❌ <h3>Question?</h3><img src="..."><p>Answer...</p>          ← image breaks sibling chain
❌ <h3>Question?</h3><blockquote>...</blockquote><p>...</p>   ← blockquote breaks chain
```

No floating images, blockquotes, lists, or decorative `<div>` between heading and answer paragraph. Illustrations go **after** the answer paragraph.

**Container exception (accordion / structured cards)**: When FAQ items or spec cards render inside a semantic wrapper（`<details>`, `<div class="faq-answer">`, `<div class="accordion-body">`）, the Direct Sibling check applies **within the nearest container**, not the global DOM root — see §XII.1.

### H1–H2–H3 Logical Hierarchy: The Pyramid Rule

1. **Never skip levels**: No H1→H3 without H2. No H2→H4 without H3.
2. **H3 must strictly belong to its parent H2** — an H3 under "Thermal Benchmarks" discussing "Shipping Costs" is a logic error.
3. **The 3-second H2 scan test**: reading only H2s should convey 80% of the article's framework.

### Title Tag vs H1: Two Different Jobs

| Element | Audience | Length | Strategy |
|---------|----------|--------|----------|
| **Title Tag** | SERP scanners | 50–60 chars | Front-load primary keyword + B2B qualifier + year |
| **H1** | On-page readers | 50–65 chars | Full topic expression, slightly more descriptive |

**Title Tag formula**: `[Primary Keyword / Pain Point] + [Value Output] + [Audience/Year] | [Brand]`. Title must be semantically close to H1 (same core topic, different wording). Never ALL CAPS (spam flag); never duplicate the same Title template across articles.

### URL Structure Standards

| Rule | ❌ Wrong | ✅ Right |
|------|---------|---------|
| **Lowercase, hyphens only** | `/blog/GaN_Charger_OEM` | `/blog/gan-charger-oem-guide` |
| **Remove stop words** | `/blog/how-to-select-a-good-gan-charger` | `/blog/gan-charger-factory-selection` |
| **No dates in URL** | `/blog/2026/07/gan-charger-guide` | `/blog/gan-charger-guide` |
| **3-6 words** (≤6 pass, ≥7 deduction) | `/blog/p=12389` | `/blog/140w-gan-charger-oem` |
| **No underscores, capitals, special chars** | `/blog/Semi_Solid_Battery` | `/blog/semi-solid-battery-sourcing` |

#### URL & Schema Trailing Slash Consistency (Mandatory)

Google treats URLs with and without trailing slashes as **two different URLs** — splitting ranking signals and risking duplicate-content flags.

**Hard rule**: Canonical URL, BreadcrumbList `item`, `mainEntityOfPage.@id`, and all internal `@id` references must use the **exact same trailing slash format**. WOWOHCOOL standard: **all URLs end with `/`**.

| Check | ✅ Correct | ❌ Wrong |
|-------|-----------|---------|
| Canonical | `https://www.wowohcool.com/blog/slug/` | `https://www.wowohcool.com/blog/slug` |
| Breadcrumb item | `"item": "https://www.wowohcool.com/blog/slug/"` | `"item": "https://www.wowohcool.com/blog/slug"` |
| mainEntityOfPage.@id | `"@id": "https://www.wowohcool.com/blog/slug/"` | `"@id": "https://www.wowohcool.com/blog/slug"` |
| Organization @id | `"@id": "https://www.wowohcool.com/#organization"` | `"@id": "https://www.wowohcool.com#organization"` |

Auto-check: `b2b_content_auditor.py` URL Quality check includes trailing-slash consistency verification.

**Static hosting 301 redirect**（without it, `/blog/slug` and `/blog/slug/` split signals）: Cloudflare Pages auto-redirects directory-index routes (default on); Nginx `rewrite ^(.+[^/])$ $1/ permanent;`; Apache `.htaccess` `RedirectMatch 301 ^/(.*[^/])$ /$1/`. Verify: `curl -I .../de/blog/slug` → `301 → /de/blog/slug/`.

### Meta Description: The B2B Click Converter

| Rule | Value |
|------|-------|
| **Character limit** | 120–155 chars (first 120 critical for mobile) |
| **Must contain** | Primary keyword, pain point, low-friction CTA |

**Formula**: `[Confirm pain point / value] + [Provide solution / data support] + [Low-friction CTA]`

### Internal Link Cluster Rules

- Every article links to its cluster siblings using **differentiated anchor text**
- Anchor text describes the **target page's unique angle**, not the primary keyword

---

## III. Content Dimensions: The 4 Pillars of 2026 B2B Content

**Core principle — B2B content is a "pitfall-avoidance guide," not a product brochure.** A procurement manager reads to *"solve a work problem, evaluate supplier risk, or find a solution that makes me look competent."*

| ❌ Feature-First (Brochure Logic) | ✅ Pain-Point-First (Decision-Support Logic) |
|---|---|
| "Our chargers use GaN technology for better efficiency" | "Overheating during EU customs inspection is the #1 reason shipments get rejected. Here are the 3 thermal benchmarks that prevent this." |
| "We offer OEM/ODM services with low MOQ" | "Most factories demand MOQ 3000 for custom tooling — a $37,500 upfront risk. Here's how to start from MOQ 500 on in-stock models with full certification included." |

### 1. First-Hand Experience (The First "E" in E-E-A-T)

Google's most heavily weighted signal: **"Did you actually do this?"**

**How to demonstrate**:
- Specific factory-floor observations with **precise numbers and units**（°C, mV, kHz, Wh/kg, mm）
- **Named equipment and standards**: "Measured with Keysight E4980A LCR meter per IEC 62368-1 Section 5.4.2"

**Data Density Standard**: ≥3 precise measurements + engineering units per 1,000 words.

**Images**: ❌ Never stock photos (handshakes, suits, generic factory shots)；✅ Real PCBA teardowns, lab instrument screenshots, production line photos. All images carry descriptive `alt` with technical keywords.

#### Stock Photo Detection

Flag image URLs from known stock domains (Unsplash, Shutterstock, Getty, iStock, Pexels, Pixabay, Adobe Stock, Depositphotos, 123RF, Dreamstime, Alamy, Freepik): **-25 points per image**.

#### Semantic Citation Tags for GEO Extraction

AI crawlers（GPTBot, PerplexityBot, ClaudeBot）parse the HTML AST, not just text. Semantic tags give machine-readable anchor points:

```html
<!-- Standards/documents/certifications → <cite>；precise measurements → <data value="..."> -->
<p>Verified at TÜV Rheinland Lab under <cite>EN 62368-1 Annex M.4</cite> with
creepage distance of <data value="6.4mm">6.4mm</data>.</p>
<p>Case temperature stabilized at <data value="58.3C">58.3°C</data> after 4-hour aging test.</p>
```

**Rule**: Every lab result, certification reference, and precise measurement uses `<cite>` or `<data>` — AST-level authority signal that improves AI citation probability.

#### Temporal GEO Signals — `<time>` Tags

AI engines weigh temporal freshness heavily for B2B compliance queries（certification validity, audit dates, regulatory deadlines）. All decision-affecting dates use `<time datetime="YYYY-MM-DD">`（ISO 8601）:

```html
<p>ISO 9001 certificate issued <time datetime="2024-03-15">March 15, 2024</time>,
valid through <time datetime="2027-03-14">March 14, 2027</time>.</p>
```

When a buyer asks ChatGPT "is this certification still valid?", the AI parses the `<time>` tag directly instead of NLP-extracting dates from free text.

### 2. Expert Authorship & Accountability

Anonymous content or "Admin" bylines cannot earn high trust scores. **Required for every blog post** (6 checks):

| # | Check | Requirement |
|---|-------|------------|
| 1 | **Named author** | Full real name (not "Admin" or "Team") |
| 2 | **Credential-rich byline** | Job title + years of experience + specific expertise |
| 3 | **LinkedIn URL** | `sameAs` in Person schema with valid LinkedIn profile |
| 4 | **Author page** | Links to `/authors/` dedicated author page（六语言统一英文版） |
| 5 | **Topic-relevant expertise** | Author's expertise matches article topic（knowsAbout 固定池，见 `factory-data-canonical.md` §15.2） |
| 6 | **Compact Author Bar** | H1 下 Compact Author Bar + 文末 Author Bio 存在，Schema/前端逐字一致 |

**Scoring**: 6/6 = 100, 5/6 = 83, 4/6 = 67, 3/6 = 50, 2/6 = 33, 1/6 = 17, 0/6 = 0.

### 3. Page Experience & Readability

#### KEY TAKEAWAYS Block (Mandatory Above-the-Fold)

The first viewport must contain a **KEY TAKEAWAYS block** — 3-5 bullets directly answering the reader's core question, uppercase `KEY TAKEAWAYS` label in an amber-50 box, TL;DR summary paragraph preceding the bullets.

#### Opening Paragraph: Direct Conclusion Required

The first 2–3 sentences decide whether a B2B buyer stays or bounces.

**Required signals in first 3 sentences** (any combination strengthens): number+unit（"3 MHz", "58.3°C", "$12.50/unit"）· B2B signal word（OEM, factory, MOQ, FOB）· standard/regulation reference（IEC 62368-1, ISO 9001, CE）· first-hand experience（"We tested", "our factory measured"）· procurement context（tariff, landed cost, HS code, shipment）.

**AI fluff detection** (any in first 3 sentences = **-30**): "In today's digital world…" · "When it comes to…" · "In the world of…" · "Let's dive into…" · "With the rise of…" · "has revolutionized the way…" · "more important than ever…"

| Condition | Score |
|-----------|-------|
| Conclusion signal + no fluff | 100 ✅ |
| No conclusion signal + no fluff | 60 ⚠️ |
| Fluff signal present | 30 🔴 |

#### 4 Opening Anti-Patterns

1. **QUICK ANSWER block competing with KEY TAKEAWAYS** → delete; move unique data into KEY TAKEAWAYS bullets（详见下方 RESPUESTA RÁPIDA 反模式）
2. **Data dump intro**（4-7 paragraphs of stats piled into intro）→ move each to the H2 it supports
3. **Cliché/fluff opening** → delete; start with the specific number or B2B signal
4. **Conclusion delayed to sentence 3+** → move the conclusion to position 1

#### F-Pattern Scanning: Structure for Skimmers

1. **Headings are conclusions, not labels.**

   | ❌ Label-Style | ✅ Conclusion-Style |
   |---|---|
   | "Testing Process" | "Benchmark 1: 4-Hour Full-Load Aging Test Under 45°C Ambient" |
   | "Thermal Performance" | "What Case Temperature is Acceptable Under 100% Load for CE Compliance?" |

2. **Visual anchors every scroll-depth**: bold key terms, numbered lists, blockquotes. No unbroken text wall >4 lines.
3. **The 3-second H2 scan test**（§II）.

#### Table Test

Technical parameters（voltage, current, certifications, MOQ/pricing）MUST be Markdown tables. Tables present = 100 ✅；some in prose = 60 ⚠️；no tables = 40 🔴.

#### AI Citation Anchors: Speakable Architecture (v3.0)

AI search engines extract cited answers from the DOM. To signal the **primary answer** block, use the `speakable` CSS class — the same selector registered in `SpeakableSpecification`.

**Rule**: Exactly **3 speakable anchors** per article. Google's Speakable spec targets 20-30 seconds of TTS; exceeding dilutes and causes AI engines to ignore the entire `cssSelector` directive.

| # | speakable 节点 | 位置 | DOM 标记 | 信息类型 |
|---|---------------|------|---------|---------|
| 1 | **H1** | Hero 区域 | `<h1>`（自然匹配 `"h1"` selector） | 文章主题声明 |
| 2 | **Hook 首段** | Hero 区域 | `class="speakable"` | 痛点 + 核心冲突 |
| 3 | **Key Takeaways TL;DR 句** | 封面图下方 | `class="speakable"` | 全文结论 + 核心量化数据 |

**Schema 职责分离**（BlogPosting 只管文章摘要播报；FAQPage 独立管理问答匹配）:

```json
// BlogPosting — 3 nodes: H1 + Hook + Key Takeaways
"speakable": { "cssSelector": ["h1", ".speakable"] }
// FAQPage — 独立，3-5 answers
"speakable": { "cssSelector": [".faq-answer"] }
```

**禁止**：BlogPosting cssSelector 含 `"h2"`（~12 个副标题全量抓取 → 严重稀释）；`data-speakable` 属性（已废弃，统一 `.speakable` class）；`.speakable` 出现在 H3/H4/FAQ 答案/`<ul>`/`<blockquote>` 上。`b2b_content_auditor.py` DOM 解析器检测到 narrative H3/H4 携带 `.speakable` 即阻断发布。

**内容不重叠规则**：Hook = 痛点场景（"为什么需要读"），Key Takeaways = 核心结论（"读完得到什么"）。验证：去掉 Key Takeaways 后核心结论仍完整 → Hook 写得太像总结，需加重痛点元素。H3 后第一句 ≤150 字符结论**保留但不加 `.speakable`**（不与核心 3 节点竞争权重）。

#### Anti-Pattern: RESPUESTA RÁPIDA / Quick Answer Block (Forbidden)

在 TOC 与 H2 之间插入的蓝色 "RESPUESTA RÁPIDA" / "SCHNELLANTWORT" / "Quick Answer" 卡片 = **反模式**：与 Key Takeaways 内容重叠 60-95%（12 篇 ES 审核实证）、制造第 4 个 speakable 锚点、视觉冗余、AI 去重后抓取权重减半。

```
✅ Hook → Featured Image → Key Takeaways (amber) → CIFRAS CLAVE (metrics) → TOC → §1
❌ Hook → Featured Image → Key Takeaways → TOC → RESPUESTA RÁPIDA (删除!) → §1
```

预发布检查：grep `RESPUESTA RÁPIDA` / `SCHNELLANTWORT` / `Quick Answer` — 出现即删除。

#### Short Paragraphs

2–3 sentences maximum. B2B buyers scan, they don't read.

### 4. Machine-Readable Structured Data (Schema Markup)

Required JSON-LD for every blog post:

- **BlogPosting**: headline, description, datePublished, dateModified, wordCount, author, publisher
- **Person (Author)**: name, jobTitle, knowsAbout, sameAs (LinkedIn URL)
- **FAQPage**: 3–5 B2B-focused questions
- **HowTo**: ≥3 steps for any process/guide article
- **BreadcrumbList**: full path from homepage to article
- **Organization**: name, logo, url
- **SpeakableSpecification**: cssSelector `["h1", ".speakable"]`（BlogPosting — 3 nodes）；FAQPage 独立 `[".faq-answer"]`

完整模板与字段规范以 `b2b-schema-template.json` + `b2b-multilingual-metadata-standard.md` 为准。

**Static build URL convention**: JSON-LD `@id` and canonical URLs use the build-time base URL variable, never hardcoded `localhost`. Trailing `/` hardcoded in template（详见 §XII.2）:

```njk
"@id": "{{ site.url }}/de/blog/{{ page.fileSlug }}/"
```

#### FAQ Ten Rules (Mandatory, Rule 0–9)

**Rule 0: 数量控制 — 3–5 个精细化高频采购问答**。理由：(1) FAQ 堆叠稀释单题 AI 抓取权重；(2) Google FAQ 富摘要最多展示 2–3 条；(3) >5 易触发「低质量泛化问答」降权。筛选标准：覆盖 MOQ / pricing / lead time / certification / customization / order process 六大采购类别中最高频的 3–5 个；纯技术细节、与 H2 重复、纯前瞻性问题一律剔除。每个回答必须含具体参数（数字+单位）、认证代号或采购逻辑。

**Rule 1: Body-Schema Consistency** — 正文 FAQ 与 JSON-LD FAQPage 逐字相同（同措辞、同顺序）。**Auto-checked** by `b2b_content_auditor.py` Check 14 Step 7: count mismatch -15, wording difference -10/ea.

**Rule 2: Real Buyer Questions (Not Fabricated)** — 问题必须反映真实采购经理/品牌方的提问，非写手臆测。发布前手动验证（4 步）：① Google 搜索核心查询——无任何供应商页/竞品 B2B 站/行业门户回答同一问题 → 大概率捏造；② 审计 3-5 个同域竞品 FAQ——没人答过的问题需打标；③ 对照询盘模式——MOQ/pricing/lead time/certification/customization/order process 六大类别之外的问题需更强证据；④ Alibaba/Global Sources 搜索 `[topic] + "MOQ"/"FOB"/"OEM"`——RFQ 里买家实际问的问题是金标准。

- ❌ Fabricated: "Does Qi2 work with old iPhones?" — consumer support question
- ✅ Real: "What MOQ applies for Qi2-certified OEM wireless chargers?" — search + competitor + inquiry verified

**Auto-check**: auditor flags >15-word questions / consumer language patterns；`/b2b-audit` 自动触发 WebSearch 按 `核心词 + OEM/factory/supplier` 验证真实搜索需求，结果 VERIFIED / NICHE / NO DEMAND。4 步手动验证仍为发布前必做。

**FAQ Scoring: Question-Side vs Answer-Side Separation (Anti-False-Positive)** — Check 9 对问题与答案**独立计分**：

| 侧 | 评分逻辑 | 权重 | 原因 |
|----|---------|------|------|
| **问题侧** | 搜索需求匹配度（WebSearch 验证），允许自然口语、长句 | 20% | 匹配买家在 Google/ChatGPT 实际键入的查询 |
| **答案侧** | 量化数据（数字+单位）**或**合规标准代号（IEC/CE/RoHS/UN38.3）即判定 B2B 深度达标；B2B 词汇为补充信号非硬门槛 | 80% | AI 提取时答案是独立引用单元，硬塞 `OEM`/`FOB` 只会让文风僵硬 |

**FAQ Question Format Principle — Natural Search Language > Artificial B2B Vocabulary**: 问题必须匹配买家**实际键入**的查询——听起来 "B2B 专业" 但没人会输入的问题永远不会被 AI 引用。格式：短关键词开头 + 自然口语补全 + B2B 深度放**答案**里。

| ❌ Artificial (never cited) | ✅ Natural (high GEO match) |
|---|---|
| "How should OEM buyers specify mAh vs Wh on power bank product labeling and compliance documentation?" | "mAh vs Wh — which spec should OEM buyers use for power bank procurement?" |
| "What semi-solid-state battery advantages should OEM buyers evaluate vs Li-polymer for 2026 product lines?" | "Semi-solid-state vs Li-polymer power banks — which is better for OEM products in 2026?" |

**Litmus**: 朗读问题——采购经理会对同事这样说吗？像法律文件标题就重写。

**Rule 3: Content-Anchored Answers** — 每条答案可追溯到正文具体段落。

**Rule 4: GEO-Optimized for AI Citation** — Q&A 结构须可被 AI（ChatGPT/Perplexity/Gemini）作为独立问答对提取引用。**Answer-first**：答案前 1-2 句交付完整结论（数据点/价格/标准号）——AI 爬虫优先提取 FAQ 答案的开头句，开头含糊（"It depends…"）则整条被跳过。数据密集首句的引用概率比 bury-in-paragraph-3 高 3-5×。每对 Q&A **自包含**（不读正文也能懂：MOQ 档位、认证名、价格区间、时间线齐全）。

| ❌ Buried (AI skips) | ✅ Front-Loaded (AI cites) |
|---|---|
| "It depends on several factors. Generally speaking, for most standard OEM orders, the minimum order quantity typically starts from around 500 units, though this can vary…" | "ODM on in-stock models starts at **500 units** with 25-35 day lead time. Full OEM with new tooling scales to **3,000+ units** due to mold amortization costs." |

**Rule 5: Procurement Decision-Chain Ordering** — 问题按买家心智顺序排列：① product/supplier fit → ② technical spec → ③ certification/compliance → ④ pricing/MOQ → ⑤ comparison/decision → ⑥-⑦ process/timeline → ⑧（末题）action/next step（自然 CTA 桥梁）。

**Rule 6: Quantitative Answers Mandatory** — 每条答案含 ≥1 个具体数字（price, days, percentage, unit count, dimension, wattage）。

**Rule 7: Final Question = Natural CTA Bridge** — 末题自然过渡到行动，含具体下一步。

**Rule 8: Format Differentiation** — FAQ 用 50-150 字简明问答格式，与叙述性 H2 正文结构区分（同数据、不同呈现）。

**Rule 9: Cross-Reference Consistency** — 数据分两层，一致性要求不同：

| 数据层级 | 范围 | 一致性要求 | 示例 |
|---------|------|-----------|------|
| **Tier 1: Factory-Owned Parameters** | MOQ, FOB 价格, 测试温度, 认证成本, 交期, 工厂面积 | **全球绝对统一**，跨语言零差异 | ODM 500 = 六语言全部写 500 |
| **Tier 2: Regional Market Data** | 市场规模, CAGR, 区域采用率, 本地法规 | 允许当地权威数据源（Gartner vs Statista vs 本地统计局），**不强制同源** | DE 用 DACH CAGR (Statista), EN 用 Global CAGR (BCC) |

Tier 2 宽松前提：每语言版本标注**当地数据源名称 + 出版年份**，且数据方向一致（不能 DE 说增长、EN 说萎缩）。

#### FAQ Procurement Language Patterns

```
B2B signals: MOQ, OEM, FOB, certification, compliance, lead time, minimum order,
             factory audit, third-party inspection, WPC, Qi2, pricing at OEM volume,
             verify a factory/manufacturer/supplier
Consumer signals: best, top N, cheap, good choice, buying guide, which one, for home
```

---

## IV. CTA Standard: Low-Friction Value Continuation

B2B procurement is a long-cycle decision. Every CTA offers **low-friction value continuation** — a next step delivering additional utility without purchase commitment.

### ❌ Ineffective B2B CTAs

"Buy our chargers today!" · "Contact us for more information." · "Click here to learn more." · "Sign up today" · "Get started"

### ✅ Three High-Converting CTA Types

| CTA Type | Template | When to Use |
|---|---|---|
| **Download Technical Asset** | *"Download the Full 140W GaN Charger Aging Test Report (PDF)"* | Article contains lab data / test results / benchmarks |
| **Get Operational Tool** | *"Get Our B2B Factory Audit Checklist — 42 Verification Points Before Your First Order"* | Article covers verification / auditing / selection |
| **Book Expert Consultation** | *"Schedule a 30-Minute Call With Our Engineering Team to Discuss Your OEM Specifications"* | Article covers customization / compliance / complex decisions |

### CTA Placement & Format

| Rule | Requirement |
|------|------------|
| **Position** | Below Author Bio, above Related Articles |
| **Heading** | Must use `<h2>` (not h3) |
| **Background** | Gradient `bg-gradient-to-br from-brandBlue to-slate-800` |
| **Button text** | "Get Factory Pricing" / "Request OEM Quote" / "View Products" |
| **Button text (forbidden)** | "Contact Us" / "Buy Now" / "Click Here" |
| **Product keyword** | CTA text must contain a product keyword or MOQ reference |

---

## V. 5 Fatal Logic Errors (Must Never Occur)

| # | Error | Why It's Fatal | Auto-Check |
|---|-------|---------------|------------|
| 1 | **Skipping heading levels** (H1→H3, no H2) | Parser treats article as logically broken; Featured Snippet eligibility lost | 🤖 |
| 2 | **H2/H3 as meaningless short labels** ("Testing", "Benefits") | F-pattern readers skip — no information communicated | 🤖 |
| 3 | **Keyword stacking in H2s** (3+ consecutive H2s with same B2B word) | Reads as keyword stuffing | 🤖 |
| 4 | **Body-text mismatch with heading** (H3 says "Energy Density" but body talks company history) | First sentence after every heading MUST answer that heading | Manual |
| 5 | **Hook paragraph duplicated data** (same stat/claim twice within the Hook) | Sloppy editing; breaks trust in the first 10 seconds | Manual — check repeated `<strong>` / near-identical clauses in Hook div |

---

## VI. B2B Content Audit: 19 Automated Checks

The `b2b_content_auditor.py` module performs 19 automated checks against these standards:

| # | Check | What It Measures | Scoring |
|---|-------|-----------------|---------|
| 1 | **Opening Density** | First 2-3 sentences deliver core conclusion (no fluff preamble) | Fluff pattern -30/ea, no conclusion signal -40 |
| 2 | **KEY TAKEAWAYS Block** | Structured summary block present above fold | Full block = 100, list only = 60, absent = 0 |
| 3 | **H3 Answer Length** | ≤150 char first-sentence conclusion after each H3/H4 (answer-first) | Compliance ratio = score |
| 4 | **Vague Headings** | Label-style headings flagged (e.g., "Introduction", "Specifications") | -15 per detection |
| 5 | **H2 B2B Density** | Density within tiered range + adjacency + vocabulary rotation | In range = 100, out = 60 |
| 6 | **Data Density** | Precise numbers + engineering units (°C, mV, kHz, Wh/kg, mm, €, $) per 1,000 words | ≥3/k = 100, 2-2.9 = 70 (warning), 1-1.9 = 40, <1 = 10 (critical) |
| 7 | **Table Test** | Technical parameters in Markdown tables | Present = 100, params outside tables = 40 |
| 8 | **Stock Photo Detection** | Images from known stock domains flagged | -25 per image |
| 9 | **FAQ Language** | FAQ questions match real search queries (question-side, 20% weight) + answers carry B2B vocabulary + quantified data (answer-side, 80% weight). Scoring separated per Rule 2. | Question match + Answer B2B density = weighted score |
| 10 | **Author E-E-A-T** | Byline, credentials, LinkedIn, author page, topic match, compact author bar | 6 checks |
| 11 | **Weak CTA Detection** | Flag ineffective B2B CTAs | Good = 100, weak = 40-60, absent = 20 |
| 12 | **Heading Hierarchy** | Detect skipped levels (H1→H3, H2→H4) | -25 per skip |
| 13 | **URL Quality** | Flag underscores, uppercase, dates, stop words. Staged word count: 3-6=pass, 7-8=minor warning (-10), ≥9=deduction (-20) | Deduct per violation |
| 14 | **Cross-Reference Consistency** | TL;DR, body, and FAQ numbers/data must agree (Rule 9) | Discrepancy = -20/ea |
| 15 | **Schema Validation** | Parse JSON-LD for syntax errors, missing required fields, trailing-slash consistency, `.speakable` ↔ `SpeakableSpecification` alignment, TOC-FAQ anchor match. **v2 required fields**: Organization (`legalName`, `url`, `publishingPrinciples`, `logo` 263×70, `contactPoint`, `address`, `telephone`, `email`, `areaServed` 21 项, `availableLanguage` 6 语言), Person (`@id`, `sameAs`), BlogPosting (`author` as `@id` ref, not inline Person; `@id`; `keywords`; `articleSection`), FAQPage (independent `speakable: [".faq-answer"]` + `@id`), HowTo (`@id`). Sub-rules: Organization contact completeness (missing address = -10, telephone = -5, email = -5); citation count = visible Sources/Fuentes link count (mismatch = -10; 站点级由 `metadata_site_audit.py` C20 自动); `timeRequired` = visible reading time (mismatch = -5; C4/W2 自动); Person `@id` dedup (inline author = -10, missing Person @id = -10); `worksFor` as `@id` ref (inline = -5) | Syntax = -30, missing field = -15/ea, slash mismatch = -10, speakable mismatch = -5/-10, TOC-FAQ mismatch = -5/-10 |
| 16 | **Factory Data Canonical** | MOQ, lead time, deposit, and certification claims must match `factory-data-canonical.md` | Canonical violation = -15/ea |
| 17 | **Static HTML Quality** | Featured image must not carry **hand-written uncompiled `srcset`/`sizes` relative paths**. `srcset` allowed only when produced by the 11ty/SSG image pipeline, and every referenced variant file must be verified to exist. Also checks `fetchpriority`, `.speakable`, TOC anchor bugs. Sub-rule: no RESPUESTA RÁPIDA / SCHNELLANTWORT / Quick Answer block (present = -25) | Hand-written `srcset` relative path = -15; missing variant file = -15; per violation |
| 18 | **Anti-Pattern Detection** | Hook duplicate statistics/clauses (-15), TL;DR duplicates, cross-link overlap, data-dump intro | -10~25/ea |
| 19 | **Accent/Spelling (i18n)** | Language-specific accent/spelling correctness (de/es/fr) | Per violation |

---

## VII. Information Gain Analysis: Dual-Mode Scoring

The `information_gain_analyzer.py` module evaluates content uniqueness:

| Mode | Condition | Method | Weight |
|------|-----------|--------|--------|
| **Mode A** | SERP top 5 content available | Jaccard similarity + unique entity ratio + unique data point ratio | Vocabulary 70% + Entities 20% + Data 10% |
| **Mode B** | No SERP data (heuristic) | Technical anchors + data points + named entities + B2B vocabulary diversity | Anchors 40% + Data 30% + Entities 20% + Diversity 10% |

---

## VIII. Scoring Standards

### B2B Audit Composite Score

| Score | Grade | Meaning | Action |
|-------|-------|---------|--------|
| 90–100 | A | B2B compliance excellent | Publish directly |
| 75–89 | B | Good, minor issues | Fix flagged items, publish |
| 60–74 | C | Fair, notable issues | Fix warnings, re-audit |
| 40–59 | D | Poor, multiple dimensions failing | Significant revision needed |
| <40 | F | Severely non-compliant | Do not publish. Major rewrite required |

### Information Gain Score

| Score | Level | Meaning |
|-------|-------|---------|
| 70–100 | High | Significant differentiation, Google will reward |
| 40–69 | Moderate | Some uniqueness, can strengthen |
| 20–39 | Low | High SERP overlap, add exclusive data |
| 0–19 | Zero | Near-identical to existing content, Google will suppress |

### SEO Quality Composite (8 Dimensions)

| Dimension | Weight | What It Measures |
|-----------|--------|-----------------|
| Content | 15% | H2 decision-chain coverage complete (§II), Data Density ≥3/1K words, paragraphs 2-4 sentences |
| Keywords | 20% | Keyword in H1/first-100-words/H2s/conclusion；关键词密度 1-2% 已废弃（§I/§XI），B2B 信号词自然分布按 §II 密度分层评估 |
| Meta | 10% | Title 50-60 chars, Description 120-155 chars |
| Structure | 12% | Unique H1, H2 ≥4, hierarchy complete |
| Links | 10% | Internal ≥3, external ≥2 |
| Readability | 8% | Flesch 60-70, avg sentence <25 words |
| B2B Quality | 15% | From `b2b_content_auditor.py` composite |
| Information Gain | 10% | From `information_gain_analyzer.py` composite |

### Word Count Principle: Coverage Over Count

Word count is **not a ranking factor**（Google official position since 2019; reaffirmed by Danny Sullivan, WordCamp US 2025）. The 2026 paradigm measures **first-hand data density and decision-chain coverage**.

1. **Coverage completeness check**（§II H2 Decision Chain）: 5-stage procurement chain covered = "long enough" regardless of word count. Quantitative signal = `information_gain_analyzer.py` data density — not word count.
2. **Thin content red line**: <~800 words of body text = manual review trigger（"is this too thin?"）— not a target, not a scoring criterion.

**GEO 视角**: AI 引擎提取自包含、信息密集的段落——1,800 词全是干货比 4,000 词注水更常被引用（后者触发 "zero information gain" 分类）。

**Typical ranges**（advisory only）: Technical/educational 1,000–2,500 · Procurement/sourcing 1,500–3,500 · OEM/ODM core 2,000–4,000 words。越界触发 **coverage** 人工复核，非字数惩罚。

### Quality Gate Thresholds

| Gate | Trigger | Module | Pass Threshold | Fail Consequence |
|------|---------|--------|---------------|-----------------|
| Content Quality | `/write` auto | `content_scorer.py` | ≥70 | Auto-revise → re-score (max 2×) → still failing → `review-required/` |
| B2B Compliance | `/write` Step 2.5 | `b2b_content_auditor.py` | ≥60 | Fix flagged issues → re-audit |
| SEO Final | `/optimize` | `seo_quality_rater.py` | ≥80 + no critical | 90+: publish / 80-89: minor fixes / 70-79: priority fixes / <70: major revision |
| Information Gain | `/optimize` + `/analyze-existing` | `information_gain_analyzer.py` | Mode B ≥40 / Mode A ≥50 | <20 = zero gain → block publishing, add exclusive data |

---

## IX. B2B → GEO Citability Bridge

B2B audit results adjust GEO citability scoring. Mapping logic in `.claude/skills/seo-audit/references/b2b-geo-bridge.md`.

| B2B Audit Finding | GEO Impact |
|-------------------|-----------|
| Data Density ≥80 | Statistics Addition **+10** |
| Data Density <40 | Statistics Addition **-15** ⚠️ |
| Author E-E-A-T ≥80 | Authoritative Tone **+8** + Quotation **+8** |
| Author E-E-A-T <40 | Authoritative Tone **-10** |
| Stock Photos detected | Authoritative Tone **-10** |
| Information Gain = "high" | Overall GEO **+15** |
| Information Gain = "zero" | Overall GEO **-25** 🔴 |
| KEY TAKEAWAYS Block present | Easy-to-Understand **+5** |
| FAQ B2B language ≥70% | FAQPage Schema **+8** |
| H2 B2B density in target range | Unique Words **+5** |

---

## X. Full-Element Pre-Publish Checklist

Before publishing, verify all elements:

| Element | Spec | Auto-Check |
|---------|------|------------|
| **URL** | 3-6 words, lowercase, hyphens, no stop words, no dates（§II 标准） | 🤖 |
| **Title Tag** | 50-60 chars, front-load keyword, B2B qualifier, unique per page | Manual (length checked) |
| **Meta Description** | 120-155 chars, [pain]+[solution]+[low-friction CTA], keyword included | Manual (length checked) |
| **H1** | 50-65 chars, ≥1 B2B signal word | 🤖 |
| **H2** | 4-7 sections, B2B density in tier range, conclusion-style, no consecutive same-word, no skipped levels | 🤖 |
| **H3** | Belongs to parent H2, specific question/data conclusion, ≤150 char first-sentence answer after | 🤖 |
| **H4** | Belongs to parent H3, no level skipping | Manual |
| **KEY TAKEAWAYS Block** | Present above fold, 3-5 bullet conclusions, uppercase label | 🤖 |
| **Tables** | Technical parameters in Markdown tables | 🤖 |
| **Images** | Real photos only, alt text with B2B keywords, no stock domains | 🤖 |
| **FAQ** | 10 rules (Rule 0-9): body-schema consistent, count 3-5, real buyer questions, content-anchored, GEO-optimized, decision-chain ordered, quantitative answers, final-Q CTA bridge, format differentiated, cross-reference consistent | 🤖 + Manual |
| **Speakable** | BlogPosting: `["h1", ".speakable"]` (3 nodes); FAQPage: `[".faq-answer"]` (independent). H1+Hook+Key Takeaways only; no H2 in selector; no `.speakable` on FAQ answers; `data-speakable` deprecated | 🤖 |
| **RESPUESTA RÁPIDA** | Must NOT exist — duplicates Key Takeaways 60-95% + creates a 4th speakable anchor. Grep "RESPUESTA RÁPIDA" / "SCHNELLANTWORT" / "Quick Answer" — delete if found | Manual (grep) |
| **Hook Duplicate** | No stat/claim repeated within the Hook paragraph. Read aloud — any repetition = edit | Manual |
| **Featured Image** | No hand-written uncompiled `srcset`/`sizes` relative paths. SSG-generated `srcset` OK only if every variant file exists on disk (no `-800`/`-1200` 404s). `fetchpriority="high"` **required**（与 §XIV LCP 执行一致；与 `blog-template-standard.md` §3、`b2b-multilingual-metadata-standard.md` §六 checklist 同一标准） | 🤖 |
| **Content Width** | All blocks from Featured Image through Sources share a single `max-w-4xl mx-auto px-6` wrapper. No double-nested wrappers (inconsistent margins) | Manual |
| **Schema v2 — Organization** | `address` (PostalAddress: streetAddress + locality + region + postalCode + country), `contactPoint.telephone`, `contactPoint.email` — B2B entity verification signals | 🤖 |
| **Schema v2 — Citation** | `citation` array count = visible Sources/Fuentes link count. Under-reporting wastes AI citation signals | Manual (count) |
| **Schema v2 — Keywords Semantic Coverage** | 写作侧规范（新文章）：keywords 同时覆盖核心产品词 + B2B 场景词 + 标准/长尾应用词各 ≥1（见 `b2b-multilingual-metadata-standard.md` §3.2.1，含豁免）。存量文章 advisory 不回溯；审计 WARN 提示 | 🤖 (WARN) |
| **Schema v2 — timeRequired** | Schema `timeRequired` = visible reading time ("9 min" = PT9M, not PT12M) | 🤖 (C4/W2 自动) |
| **Schema v2 — Author @id** | `BlogPosting.author` = `{ "@id": ... }` (reference, not inline Person); Person node has matching `@id`; `worksFor` = `{ "@id": ... }` | 🤖 |
| **Schema v2 — JSON Syntax Gate** | Post-build: `json.load()` on every `<script type="application/ld+json">` block. A single unreplaced placeholder（`{ACTUAL_WORD_COUNT}`）produces invalid JSON, silently disabling ALL schema on that page | 🤖 (build script) |
| **CTA** | Below Author Bio, h2 heading, gradient background, B2B button text, product keyword | 🤖 |
| **Author** | Named, credential-rich byline, LinkedIn link, author page, topic-relevant expertise | 🤖 |

### Author Self-Check (Condensed — 14 Items)

After automated checks pass, verify manually:

```
[ ] H1: ≥1 B2B signal word + 50-65 chars + audience/metric/return
[ ] Opening delivers core conclusion directly (not question, not industry preamble)
[ ] KEY TAKEAWAYS present after H1, before first H2; RESPUESTA RÁPIDA / Quick Answer absent (grep)
[ ] Hook free of duplicated data
[ ] Speakable: exactly 3 nodes (H1 + Hook + Key Takeaways TL;DR); BlogPosting cssSelector =
    ["h1", ".speakable"]; FAQPage independent [".faq-answer"]; no .speakable on H3/H4/FAQ/ul/blockquote
[ ] Featured Image: no hand-written srcset/sizes; SSG variants verified; cover in correct language folder
[ ] All content blocks share consistent max-w-4xl width (no double-nested wrappers)
[ ] H2 scan test: 3-second value comprehension; density in tier; no 3× same B2B word
[ ] Images: real product/factory/lab photos; alt text with B2B keywords
[ ] CTA: low-friction value continuation; no "Buy now"
[ ] FAQ: questions in natural buyer language; answers quantified; body-schema word-for-word
[ ] Schema v2: Organization address+telephone+email; citation count = Sources links;
    timeRequired = reading time; author/worksFor as @id refs
[ ] Schema v2: json.load() passes on every <script type="application/ld+json"> in _site/
[ ] WCAG + CWV + AI-crawler items per §XIII/XIV/XV
```

---

## XI. Summary: The 2026 B2B SEO Truth

| Old Paradigm (Dead) | New Paradigm (2026+) |
|---------------------|---------------------|
| Keyword density 1–2% | Information Gain vs. top 5 SERP |
| Word count as quality signal | First-hand data density as quality signal |
| Generic "expert" byline | Named engineer with credential trail |
| Stock photos | Real PCBA/lab/factory images |
| "Best X" consumer keywords | Commercial intent B2B long-tail |
| Meta keywords tag | Article + FAQ + HowTo Schema |
| One pillar page per topic | Differentiated cluster with unique angle per page |

**The B2B winner in 2026**: The factory that documents its actual engineering work, publishes real test data, and writes for procurement managers — not for search engines.

**In one sentence**: A high-performing B2B blog looks like an article on the surface, but functions as a carefully packaged **industry pitfall-avoidance guide** and **procurement decision-support tool** — earning trust with hard data, holding attention with F-pattern scannability, and converting with low-friction value-continuation CTAs.

---

## XII. Static HTML Architecture Specifics

Static HTML sites built with SSG (11ty, Hugo, Astro) have unique engineering constraints this standard accommodates:

### 12.1 DOM Rules Adaptation for Components

The Direct Sibling rule（`<h3>` → `<p>`）applies to inline narrative text. For structured wrappers, the audit script scopes its DOM check **to the nearest semantic container**, not the global root:

| Pattern | Compliant Markup |
|---------|-----------------|
| FAQ accordion card | `<div class="faq-answer"><h3>Q</h3><p>A</p></div>` |
| HTML5 disclosure | `<details><summary><h3>Q</h3></summary><p>A</p></details>` |
| Spec card grid | `<div class="spec-card"><h4>Parameter</h4><p>Value</p></div>` |

### 12.2 Multi-Environment Absolute URL Convention

SSG templates use the build-time `site.url` variable for all absolute URLs; trailing `/` is hardcoded in template strings — no URL is ever constructed by concatenating user input:

| Context | Template Source | Production Output |
|---------|----------------|-------------------|
| Canonical | `{{ site.url }}/de/blog/{{ slug }}/` | `https://www.wowohcool.com/de/blog/.../` |
| Schema @id | `{{ site.url }}/#organization` | `https://www.wowohcool.com/#organization` |
| OG image | `{{ site.url }}/image/blog/cover.webp` | `https://www.wowohcool.com/image/blog/cover.webp` |

### 12.3 Multi-Language hreflang & Schema inLanguage

Every article declares bidirectional `<link rel="alternate" hreflang="...">` in `<head>` — the full cross-language set for all 6 languages（en-US / de-DE / es-ES / fr-FR / ru-RU / pl-PL）+ `x-default`（EN）. The `BlogPosting` Schema MUST include `"inLanguage"` matching the hreflang value（e.g., `"de-DE"`）. Without this, Google treats the 6 language versions as competing duplicates rather than a legitimate multi-region cluster.

### 12.4 Static Asset Integrity for GEO

- Featured image: no hand-written uncompiled `srcset`/`sizes`; SSG-generated only with every variant file verified present + explicit `width`/`height`
- `fetchpriority="high"` on featured image only; below-fold images `loading="lazy"`
- `<cite>`/`<data>` semantic tags for standards references and measurements（§III.1）
- `.speakable` anchors on Hook + Key Takeaways TL;DR only — 完整规范见 §III.3

### 12.5 Server-Side 301 Trailing Slash Enforcement

配置与验证方法见 §II「URL & Schema Trailing Slash Consistency」（Cloudflare Pages 默认开启；Nginx/Apache 配置行同节）。此节不重复。

---

## XIII. Accessibility Compliance (WCAG 2.2 + EAA)

**Regulatory context**: The European Accessibility Act（EAA, Directive 2019/882）entered into force **June 28, 2025**, enforcement from **June 28, 2026**. For EU-market content（DE/AT/CH/ES/FR/PL）:

| Element | Requirement | Verification |
|---------|-------------|--------------|
| Color contrast | Text ≥ 4.5:1, large text ≥ 3:1 | Lighthouse / axe DevTools |
| Keyboard navigation | FAQ accordions, TOC links, CTA buttons Tab-reachable | Manual keyboard test |
| Focus indicators | Visible focus ring on all interactive elements | Tab through page |
| Alt text | All `<img>` descriptive alt（no "image of"） | Automated + spot check |
| Heading hierarchy | No skipped levels, semantic structure preserved | b2b_content_auditor.py Check 12 |
| Language declaration | `<html lang="es">`（or de/en/fr/ru/pl） | Visual check |

**FAQ Accordion**: 标准 white-card FAQ 模板（非 `<details>`）天然键盘可达，优先使用。若用 `<details>`：`<details aria-expanded="false"><summary>Q</summary><p>A</p></details>`.

---

## XIV. Core Web Vitals Thresholds

| Metric | Good (Pass) | Needs Improvement | Poor (Fail) |
|--------|-------------|-------------------|-------------|
| **LCP** | ≤ 2.5s | 2.5–4.0s | > 4.0s |
| **INP** | ≤ 200ms | 200–500ms | > 500ms |
| **CLS** | ≤ 0.1 | 0.1–0.25 | > 0.25 |

**Per-article enforcement**: featured image explicit `width`/`height`（CLS）+ `loading="eager"` `fetchpriority="high"`（LCP）· below-fold `loading="lazy"` · no hand-written `srcset`（AI crawler 404 防护，见 §XII.4）· no layout shift from injected content · Tailwind purge configured in `npm run build:css`.

**Note**: LCP ≤ 2.5s is the 75th-percentile field benchmark (CrUX); Lighthouse lab target ≤ 1.8s.

---

## XV. AI Crawler Access Verification (GEO Foundation)

All GEO optimization is wasted if AI crawlers cannot access the page.

### 15.1 robots.txt Verification

```bash
curl -s https://www.wowohcool.com/robots.txt | grep -E "ClaudeBot|ChatGPT-User|PerplexityBot|GPTBot"
```

Expected: `Allow: /` for `ClaudeBot`, `ChatGPT-User`, `PerplexityBot`, `GPTBot`；Googlebot / Bingbot allowed for AI Overviews / Bing Copilot.

### 15.2 llms.txt Verification

After each production build: `/llms.txt`（EN）+ `/de/llms.txt` + `/es/llms.txt` + `/fr/llms.txt` + `/ru/llms.txt` + `/pl/llms.txt` all return 200（站点由 11ty `llms.txt.njk` 模板自动生成）.

### 15.3 Pre-Publish Audit Inclusion

The following items are part of the §X checklist（详见该节 WCAG/CWV/AI-crawler 条目）:

```
[ ] robots.txt: all 6 AI crawlers have Allow: /
[ ] llms.txt: 200 for all 6 languages
[ ] CWV: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 (Lab LCP ≤ 1.8s)
[ ] WCAG: contrast ≥ 4.5:1, keyboard navigation, valid heading hierarchy, descriptive alt
[ ] EAA: EU-market page → basic compliance verified
```

---

## XVI. CI/CD Audit Pipeline (Recommended Infrastructure)

The `b2b_content_auditor.py` script runs directly on `.njk` / `.html` files — no build step required. Separation of concerns: local commits stay fast and non-blocking; the production branch enforces quality.

### 16.1 Pre-Commit Hook (Local, Syntax-Only — Fast)

Pre-commit runs **fatal-error static scans only**（URL format, HTML syntax, missing `<h1>`, absolute path validity）— no NLP scoring, < 1s:

```bash
#!/bin/bash
# .git/hooks/pre-commit
CHANGED=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(njk|html)$')
for FILE in $CHANGED; do
  python data_sources/modules/b2b_content_auditor.py "$FILE" --check-syntax-only
  if [ $? -ne 0 ]; then
    echo "❌ $FILE: fatal syntax error — commit blocked"
    exit 1
  fi
done
```

### 16.2 GitHub Actions (PR-Level, Full Audit — Quality Gate)

Full audit at PR time; score < 60 blocks merge into `main`:

```yaml
name: B2B Content Audit
on:
  pull_request:
    branches: [main]
jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Full B2B audit (score < 60 blocks merge)
        run: |
          git diff --name-only origin/main | grep -E '\.(njk|html)$' | while read f; do
            python data_sources/modules/b2b_content_auditor.py "$f" || exit 1
          done
```

### 16.3 CI-Automated Check Gates

| Check | CI Gate | Threshold |
|-------|---------|-----------|
| H3 → first `<p>` direct sibling | DOM parser | Must pass (block) |
| `.speakable` on narrative H3/H4 | DOM parser | Must pass (block) |
| FAQ body ↔ Schema word-for-word | String diff | Must pass (block) |
| H2 B2B density | Calculator | Warn if out of range |
| Data density (≥3/k words) | Counter | Warn if < 2/k |
| Trailing slash consistency | Regex | Must pass (block) |
| Stock photo detection | URL pattern | Block if any |
| Overall B2B Score | Composite | Block if < 60 |

### 16.4 Post-Writing Local Pipeline

单篇文章写完后的本地自检统一走 `data_sources/modules/check_new_article.py <file>`（i18n lint → factory consistency → B2B auditor → FAQ 一致性 → accent 扫描，5 步门禁）——与本标准 §VI 的自动化检查同源。

---
