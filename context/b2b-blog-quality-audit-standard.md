# B2B Blog Quality Audit Standard 2026

**Applies to**: All WOWOHCOOL sites (DE, EN, ES, FR)
**Last Updated**: 2026-07-30
**Based on**: Google Helpful Content System, E-E-A-T, Information Gain Patent, AI Overviews/SearchGPT/Perplexity

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

The Information Gain concept (derived from Google's patents US2022/0309025A1 and related filings, widely discussed in SEO research but never officially confirmed as a production ranking signal) suggests that pages adding unique vocabulary and entities beyond what the top SERP results already cover receive higher visibility. In practice, articles that reword existing content without adding first-party data consistently underperform.

**How to win**: Deploy **exclusive industry terminology and first-party data** that competitors don't have:

| Generic (Zero Gain) | High-Gain Alternative |
|---------------------|----------------------|
| "GaN chargers are smaller" | "GaN HEMT switching at 3 MHz reduces transformer volume by 55% vs. silicon at 100 kHz" |
| "Good thermal performance" | "Case temperature stabilized at 58.3°C under 100% load after 4-hour aging test" |
| "Certified for EU market" | "EN 62368-1 Annex M.4 creepage distance: 6.4mm verified at TÜV Rheinland Lab #C-2026-0842" |

**B2B high-value anchor terms**:
- `PCBA ripple noise testing (mVp-p)`
- `Energy Density (Wh/kg)`
- `Cycle life curve at 0.5C/1C discharge`
- `AQL 2.5 sampling per ISO 2859-1`
- `BOM cost breakdown: GaN FET vs. Si MOSFET`
- `FOB Shenzhen vs. DDP Hamburg landed cost comparison`

### Search Intent Classification

B2B blogs must target **commercial and investigational intent** keywords only. Never chase broad B2C terms dominated by media giants.

| Intent Type | Example | Target? |
|-------------|---------|---------|
| B2C Informational | "What is a GaN charger" | ❌ Do not target |
| B2B Investigational | "How to audit Qi2 wireless charger certification for EU import" | ✅ Primary target |
| B2B Commercial | "140W GaN charger OEM cost breakdown FOB Shenzhen" | ✅ Primary target |
| B2B Transactional | "OEM GaN charger manufacturer MOQ 500 CE GS" | ✅ Secondary target |

These long-tail B2B keywords have lower search volume but **higher CTR and conversion rate** — every click is a qualified procurement lead.

### B2B vs B2C Audience Classification

| Signal Type | Keywords |
|-------------|---------|
| **B2B Signals** | OEM, ODM, manufacturer, factory, supplier, wholesale, sourcing, procurement, import, export, B2B, MOQ, FOB, supply chain, vendor, bulk, compliance, certification, industrial, enterprise, commercial, tender, distributor, private label, importer |
| **B2C Signals** | best, top, review, buying guide, cheap, affordable, for home, personal use, consumer, retail, amazon, for beginners, budget, discount, deal, favorite, most popular, for students, everyday, household |

---

## II. Heading Structure: H1 → H2 → H3 → H4

Google's crawler and AI extractors build the page's logic map entirely from heading hierarchy.

### H1 (Page Title): One Per Page

B2B buyers scan SERP results in under 2 seconds. A title that earns the click must contain **three precise elements**:

1. **Audience label** — who this is for (OEM buyer, importer, procurement manager)
2. **Specific metric or scenario** — a technical spec, regulation number, or concrete use case
3. **Clear expected return** — what the reader gains (cost breakdown, verification checklist, compliance roadmap)

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

Organize by the **procurement manager's mental decision chain**:

1. **Why this matters** (trend/necessity)
2. **What to verify** (professional gatekeeping)
3. **How it's actually done** (first-hand experience)
4. **What it costs** (commercial transparency)
5. **How to comply** (regulatory)

#### H2 B2B Signal Density: Tiered Standard

**B2B Signal Words** (15 for density calculation):
`OEM`, `ODM`, `manufacturer`, `factory`, `supplier`, `importer`, `sourcing`, `MOQ`, `FOB`, `B2B`, `procurement`, `wholesale`, `bulk`, `supply chain`, `vendor`

| Article Type | Target Range | Examples |
|---|---|---|
| **Technical/Educational** | **10–40%** | mAh guides, GaN science, USB PD specs, wireless charging principles, certification explainers, safety standards |
| **Procurement/Supply Chain** | **30–55%** | shipping/logistics, how-to-choose-factory, hotel/enterprise procurement, QC guides, sourcing guides |
| **OEM/ODM Core Topic** | **50–80%** | OEM vs ODM comparisons, manufacturer directories, OEM production process, private label guides |

**Classification rule**: If the article's primary purpose is to teach a technical concept → Technical. If the purpose is to guide a procurement decision → Procurement. If the topic itself IS a B2B business model comparison → OEM/ODM Core.

#### Two Quality Rules (apply regardless of density tier)

**Rule A — Adjacency Cap**: No 3 consecutive H2s may use the same B2B modifier.
- ❌ H2 #3 "OEM Sourcing Strategy" → H2 #4 "OEM Factory Audit" → H2 #5 "OEM Pricing Guide"

**Rule B — Vocabulary Rotation**: The same B2B concept should vary expression across H2s.
- ✅ Alternate: `procurement` / `buying` / `sourcing` / `supply` across different sections

#### Pre-Publish H2 Audit Checklist

```
[ ] 1. Classify article → Technical / Procurement / OEM Core
[ ] 2. Count total content H2s (exclude TOC, Related Articles, Sources)
[ ] 3. Count H2s containing ≥1 B2B signal word
[ ] 4. Calculate density = B2B H2s / total H2s × 100%
[ ] 5. Verify density falls within target range for article type
[ ] 6. Scan adjacency: any 3+ consecutive H2s with same B2B word? → Fix
[ ] 7. Scan vocabulary: are ≥2 different B2B terms used across all H2s? → Fix if only 1
[ ] 8. If density too high: remove forced B2B prefixes from technical sections only
[ ] 9. If density too low: add B2B identifiers to procurement decision sections only
```

#### B2B Signal Words: Naturalness Principle (Anti-Keyword-Stuffing)

**B2B signal words (MOQ, FOB, OEM, ODM, factory, supplier, importer, sourcing, B2B, procurement, supply chain) must integrate naturally into the sentence context. Never force them into a sentence where they don't belong.**

| ✅ Natural Integration | ❌ Forced / Keyword-Stuffed |
|------------------------|---------------------------|
| "una planta ISO 9001 de 5.000m² con MOQ desde 500 uds para OEM" | "el MOQ OEM del fabricante B2B es de 500 para importadores" |
| "certificación CE + UN38.3 exigidas por la normativa de importación" | "la certificación CE para importadores y compradores B2B del supply chain" |
| "auditoría por vídeo, referencias de clientes y verificación de certificaciones ISO" | "auditoría de fábrica para sourcing y procurement B2B con verificación OEM" |

**The Auditor's keyword-count mechanism may under-score content that is substantively B2B but uses varied vocabulary.** This is an expected limitation of automated detection. When the FAQ H2 B2B Language score is below 70 but the answers contain procurement substance (Trade Assurance, T/T 30/70, ISO 9001, UNE-EN, AENOR, ODM, moldes), the score should be treated as advisory, not a defect.

**Integration rules:**
1. Add B2B keywords only where they naturally fit the existing sentence structure
2. One B2B keyword per sentence is sufficient; stacking multiple keywords in one sentence = spam signal
3. If the sentence already has procurement substance (payment terms, certification codes, factory specs), it does not need a B2B keyword injected
4. FAQ answers that contain real procurement data (pricing, lead times, certification requirements) are B2B by substance, even if they lack the literal word "OEM"
5. When in doubt: leave it out. A natural sentence without B2B keywords is better than a keyword-stuffed sentence that reads as AI-generated

#### Rule C — Implicit B2B Context (Anti-False-Positive)

**Do NOT flag H2s as "missing B2B signal" when the heading already implies a B2B procurement context through its semantic content.** The 15-word signal list is a heuristic, not a gate. An H2 that addresses product-line decisions, supplier evaluation, compliance strategy, or cost analysis is B2B even if it lacks the literal keywords `OEM`/`factory`/`MOQ`.

**Implicit B2B context indicators** (any ONE qualifies the H2 as B2B, regardless of signal-word match):

| Indicator | Example H2 | Why It's B2B |
|-----------|-----------|--------------|
| Product-line / portfolio language | "Technology Choice for Your Product Line" | Only brands/procurement managers make product-line decisions |
| Supplier/vendor evaluation framing | "Efficiency Benchmarks for Supplier Evaluation" | "Supplier evaluation" is B2B without the literal word `OEM` |
| Cost/margin/ROI analysis | "BOM Cost Analysis: GaN vs Silicon" | Cost analysis at component level = procurement, not consumer |
| Regulatory compliance strategy | "Certifications Mandatory for EU and US Markets" | Certification strategy is a B2B procurement decision |
| Factory/production capability | "WOWOHCOOL GaN Charger Production: Factory Capacity & Quality" | Factory = B2B even if not in the 15-word list |
| Sustainability for business operations | "Sustainability Impact: Carbon Footprint Data" | Carbon footprint = corporate procurement criterion (EU ESPR/CSRD) |

**Rule**: Before flagging an H2 as "no B2B signal," ask: *"Would a consumer searching for this topic care about this heading?"* If the answer is no — if only a procurement manager, brand owner, or importer would care — the H2 is B2B by definition. Do not force keyword insertion into semantically complete headings.

**Example of a correct non-flag**:
- H2: `"GaN Sustainability Impact: Energy Efficiency & Carbon Footprint Data"` — 40% density without this H2, but the heading is inherently B2B because consumers don't evaluate carbon footprints for supplier selection. **Do not deduct.**

### H3/H4 (Detail Anchors): Feed AI Search and Featured Snippets

H3s must be **extremely specific** — preferably phrased as a question or a data conclusion:

```
❌ H3: "Thermal Performance"
✅ H3: "What Case Temperature is Acceptable Under 100% Load for CE Compliance?"

❌ H4: "Wichtig"
✅ H4: "Why Keeping the Housing Under 65°C Prevents GS-Zeichen Rejection"
```

**The Golden Rule**: Immediately after every H3/H4, deliver the **direct answer in 100–150 characters** OR a comparison table. This is the prime position Google scrapes for Featured Snippets and AI citations.

**DOM Structural Rule — Direct Sibling**: The first `<p>` after each H3 must be a **direct sibling** in the DOM tree. Nothing may be inserted between `<h3>` and its answer `<p>`:

```
✅ <h3>Question?</h3><p>Answer...</p>           ← direct sibling, Featured Snippet eligible
❌ <h3>Question?</h3><img src="..."><p>Answer...</p>  ← image breaks sibling chain
❌ <h3>Question?</h3><blockquote>...</blockquote><p>...</p>  ← blockquote breaks chain
```

No floating images, blockquotes, lists, or decorative `<div>` wrappers between the heading and its answer paragraph. If an illustration is needed, place it **after** the answer paragraph, not before.

**Container exception (accordion / structured cards)**: When FAQ items or spec cards are rendered inside a semantic wrapper (`<details>`, `<div class="faq-answer">`, `<div class="accordion-body">`), the Direct Sibling check applies **within the nearest container**, not at the global DOM root. Example of compliant markup:

```html
<!-- ✅ Compliant: <p> is direct sibling of <h3> inside .faq-answer -->
<div class="faq-answer">
  <h3>Question?</h3>
  <p>Answer...</p>
</div>

<!-- ✅ Compliant: <p> is direct sibling of <summary> inside <details> -->
<details>
  <summary><h3>Question?</h3></summary>
  <p>Answer...</p>
</details>
```

The audit script must scope its DOM check to the parent container, not the global `<article>` root.

### H1–H2–H3 Logical Hierarchy: The Pyramid Rule

Google's crawler treats heading hierarchy as a **semantic taxonomy tree**. Three non-negotiable rules:

1. **Never skip levels**: No H1 → H3 jump without an H2. No H2 → H4 without an H3.
2. **H3 must strictly belong to its parent H2**: An H3 under "Thermal Benchmarks" discussing "Shipping Costs" is a logic error.
3. **The 3-second H2 scan test**: If a procurement manager reads only the H2s, they should grasp 80% of the article's framework.

### Title Tag vs H1: Two Different Jobs

| Element | Audience | Length | Strategy |
|---------|----------|--------|----------|
| **Title Tag** | SERP scanners | 50–60 chars | Front-load primary keyword + B2B qualifier + year |
| **H1** | On-page readers | 50–65 chars | Full topic expression. Can be slightly longer and more descriptive |

**Title Tag formula**: `[Primary Keyword / Pain Point] + [Value Output] + [Audience/Year] | [Brand]`

- Title must be semantically close to H1 (same core topic, different wording)
- Never use ALL CAPS — flagged as spam
- Never duplicate the same Title template across articles

### URL Structure Standards

| Rule | ❌ Wrong | ✅ Right |
|------|---------|---------|
| **Lowercase, hyphens only** | `/blog/GaN_Charger_OEM` | `/blog/gan-charger-oem-guide` |
| **Remove stop words** | `/blog/how-to-select-a-good-gan-charger` | `/blog/gan-charger-factory-selection` |
| **No dates in URL** | `/blog/2026/07/gan-charger-guide` | `/blog/gan-charger-guide` |
| **3-6 words** (≤6 = pass, ≥7 = deduction) | `/blog/p=12389` | `/blog/140w-gan-charger-oem` |
| **No underscores, capitals, special chars** | `/blog/Semi_Solid_Battery` | `/blog/semi-solid-battery-sourcing` |

#### URL & Schema Trailing Slash Consistency (Mandatory)

Google treats URLs with and without trailing slashes as **two different URLs**. If the Canonical tag uses `/blog/slug/` but JSON-LD Schema `@id` or Breadcrumb `item` uses `/blog/slug` (no slash), Google splits ranking signals across two URLs — diluting authority and potentially triggering duplicate content flags.

**Hard rule**: Canonical URL, BreadcrumbList `item` URLs, `mainEntityOfPage.@id`, and all internal `@id` references must use the **exact same trailing slash format**. WOWOHCOOL standard: **all URLs end with `/`**.

| Check | ✅ Correct | ❌ Wrong |
|-------|-----------|---------|
| Canonical | `https://www.wowohcool.com/blog/slug/` | `https://www.wowohcool.com/blog/slug` |
| Breadcrumb item | `"item": "https://www.wowohcool.com/blog/slug/"` | `"item": "https://www.wowohcool.com/blog/slug"` |
| mainEntityOfPage.@id | `"@id": "https://www.wowohcool.com/blog/slug/"` | `"@id": "https://www.wowohcool.com/blog/slug"` |
| Organization @id | `"@id": "https://www.wowohcool.com/#organization"` | `"@id": "https://www.wowohcool.com#organization"` |

Auto-check: `b2b_content_auditor.py` URL Quality check includes trailing slash consistency verification.

**Static hosting 301 redirect (Cloudflare Pages / Nginx)**: Since static HTML uses directory-index URLs (`/blog/slug/index.html` → `/blog/slug/`), the server must issue a **301 redirect** when a request arrives without the trailing slash (`/blog/slug` → `/blog/slug/`). Without this, Google treats them as two separate pages — splitting ranking signals. Verify:
- **Cloudflare Pages**: Automatic trailing-slash redirect for directory-index routes (on by default). Confirm in `_redirects` or dashboard.
- **Nginx**: `rewrite ^(.+[^/])$ $1/ permanent;`
- **Apache**: `.htaccess` with `RedirectMatch 301 ^/(.*[^/])$ /$1/`

### Meta Description: The B2B Click Converter

| Rule | Value |
|------|-------|
| **Character limit** | 120–155 chars (first 120 chars are critical for mobile) |
| **Must contain** | Primary keyword, pain point identification, low-friction CTA |

**Formula**: `[Confirm pain point / value] + [Provide solution / data support] + [Low-friction CTA]`

### Internal Link Cluster Rules

- Every article must link to its cluster siblings using differentiated anchor text
- The anchor text should describe the **target page's unique angle**, not repeat the primary keyword

---

## III. Content Dimensions: The 4 Pillars of 2026 B2B Content

**Core principle — B2B content is a "pitfall-avoidance guide," not a product brochure.** A procurement manager reads with a specific motivation: *"Solve a work problem, evaluate supplier risk, or find a solution that makes me look competent."*

Every section must follow a **pain-point-first structure**:

| ❌ Feature-First (Brochure Logic) | ✅ Pain-Point-First (Decision-Support Logic) |
|---|---|
| "Our chargers use GaN technology for better efficiency" | "Overheating during EU customs inspection is the #1 reason shipments get rejected. Here are the 3 thermal benchmarks that prevent this." |
| "We offer OEM/ODM services with low MOQ" | "Most factories demand MOQ 3000 for custom branding — a $37,500 upfront risk. Here's how to negotiate MOQ 500 with full certification included." |

### 1. First-Hand Experience (The First "E" in E-E-A-T)

Google's most heavily weighted signal: **"Did you actually do this?"**

**How to demonstrate**:
- Include specific factory-floor observations with **precise numbers and units** (°C, mV, kHz, Wh/kg, mm)
- Reference **named equipment and standards**: "Measured with Keysight E4980A LCR meter per IEC 62368-1 Section 5.4.2"

**Data Density Standard**: ≥3 precise measurements + engineering units per 1,000 words.

**Semantic Citation Tags for GEO Extraction**:

AI crawlers (GPTBot, PerplexityBot, ClaudeBot) parse the HTML AST — not just text content. Wrapping references and measurements in semantic tags gives them machine-readable anchor points:

```html
<!-- Standards and documents → <cite> -->
<p>Verified at TÜV Rheinland Lab under <cite>EN 62368-1 Annex M.4</cite> with
creepage distance of <data value="6.4mm">6.4mm</data>.</p>

<!-- Certifications and regulatory references → <cite> -->
<p>All units carry <cite>CE per 2014/35/EU</cite> and <cite>GS per ProdSG §6</cite>.</p>

<!-- Precise measurements → <data value="..."> for machine parsing -->
<p>Case temperature stabilized at <data value="58.3C">58.3°C</data>
after 4-hour aging test at 100% load.</p>
```

**Rule**: Every lab test result, certification reference, and precise measurement in the article body must use `<cite>` or `<data>` tags. This gives LLMs an AST-level signal that the content is authoritative source material — expected to improve AI citation probability based on observed patterns in LLM context window behavior (citations are preferentially extracted from semantically tagged elements).

**Temporal GEO Signals — `<time>` Tags**:

AI engines heavily weigh temporal freshness when answering B2B compliance queries (certification validity, audit dates, regulatory deadlines). Use the standard `<time datetime="...">` element for all dates in article body:

```html
<!-- Certification issuance / expiry dates -->
<p>ISO 9001 certificate issued <time datetime="2024-03-15">March 15, 2024</time>,
valid through <time datetime="2027-03-14">March 14, 2027</time>.</p>

<!-- Audit timestamps -->
<p>Last factory audit completed <time datetime="2026-06-10">June 10, 2026</time>
by TÜV Rheinland auditors on-site in Shenzhen.</p>

<!-- Regulatory deadlines -->
<p>EU CSDDD compliance required by <time datetime="2027-07-26">July 26, 2027</time>
for companies with ≥1,000 employees.</p>
```

**Rule**: Any date that affects a B2B procurement decision (certification, audit, regulation, warranty) must use `<time datetime="ISO-8601">`. The `datetime` attribute must be machine-readable ISO 8601 format (`YYYY-MM-DD`). This gives AI crawlers a temporal anchor — when a buyer asks ChatGPT "is this certification still valid?", the AI can parse the `<time>` tag directly from the DOM rather than attempting NLP date extraction from free text.

**Images**:
- ❌ Never use stock photos (handshakes, suits, generic factory shots)
- ✅ Required: Real high-resolution PCBA teardown photos, lab test instrument screenshots, production line photos
- All images must have descriptive `alt` text with technical keywords

#### Stock Photo Detection

Flag any image URL from known stock domains:
- Unsplash, Shutterstock, Getty Images, iStock, Pexels, Pixabay, Adobe Stock, Depositphotos, 123RF, Dreamstime, Alamy, Freepik
- Per detected image: -25 points from authenticity score

### 2. Expert Authorship & Accountability

Anonymous content or "Admin" bylines cannot earn high trust scores.

**Required for every blog post** (5 checks, 20 points each):

| # | Check | Requirement |
|---|-------|------------|
| 1 | **Named author** | Full real name (not "Admin" or "Team") |
| 2 | **Credential-rich byline** | Job title + years of experience + specific expertise |
| 3 | **LinkedIn URL** | `sameAs` in Person schema with valid LinkedIn profile |
| 4 | **Author page** | Links to `/about/` or dedicated author page |
| 5 | **Topic-relevant expertise** | Author's stated expertise matches article topic |

**Scoring**: 5/5 = 100, 4/5 = 80, 3/5 = 60, 2/5 = 40, 1/5 = 20, 0/5 = 0.

### 3. Page Experience & Readability

#### KEY TAKEAWAYS Block (Mandatory Above-the-Fold)

The first viewport must contain a **KEY TAKEAWAYS block** — 3-5 bullet points that directly answer the reader's core question. Must use uppercase `KEY TAKEAWAYS` label inside an amber-50 box. A TL;DR summary paragraph should precede the bullet list.

```
✅ KEY TAKEAWAYS (placed immediately after H1, before first H2):

[Summary paragraph: 2-3 sentences of core conclusion]

- [Bullet 1 with specific data point]
- [Bullet 2 with specific data point]
- [Bullet 3 with specific data point]
- [Bullet 4-5 if needed]
```

#### Opening Paragraph: Direct Conclusion Required

The first 2–3 sentences of body text decide whether a B2B buyer stays or bounces.

**Required signals in first 3 sentences**:

| Signal Type | Examples | Why It Works |
|------------|----------|--------------|
| **Number + unit** | "3 MHz", "58.3°C", "$12.50/unit", "95% efficiency" | B2B buyers scan for data |
| **B2B signal word** | OEM, factory, supplier, importer, MOQ, FOB, procurement | Confirms this is for buyers |
| **Standard / regulation reference** | IEC 62368-1, ISO 9001, CE, FCC, EN 62368-1 Annex M.4 | Signals domain expertise |
| **First-hand experience** | "We tested", "our factory measured", "during our 48-hour continuous test" | E-E-A-T credibility anchor |
| **Procurement context** | tariff, landed cost, customs, freight, HS code, shipment | "This article understands my job" |

**AI fluff detection** (any of these in first 3 sentences = -30 penalty):

> "In today's digital world…" "When it comes to…" "In the world of…" "Let's dive into…" "With the rise of…" "has revolutionized the way…" "more important than ever…"

**Scoring**:

| Condition | Score |
|-----------|-------|
| First 3 sentences have conclusion signal + no fluff | 100 ✅ |
| First 3 sentences no conclusion signal + no fluff | 60 ⚠️ |
| First 3 sentences have fluff signal | 30 🔴 |

#### 4 Opening Anti-Patterns

**Pattern 1: QUICK ANSWER Block Competing with KEY TAKEAWAYS**
- A separate "QUICK ANSWER" box stacked between intro and KEY TAKEAWAYS creates redundancy
- Fix: Delete QUICK ANSWER. Move unique data into KEY TAKEAWAYS bullets

**Pattern 2: Data Dump Intro**
- 4-7 paragraphs of industry stats piled into the intro area
- Fix: Move each data paragraph to the H2 section it supports

**Pattern 3: Cliché/Fluff Opening**
- "In the world of high-power electronics...", metaphor openings
- Fix: Delete the cliché. Start with the specific number or B2B signal that follows

**Pattern 4: Conclusion Delayed to Sentence 3+**
- S1: generic setup. S2: more setup. S3: finally the core finding
- Fix: Move the conclusion sentence to position 1

#### F-Pattern Scanning: Structure for Skimmers

Three rules to serve F-pattern readers:

1. **Headings are conclusions, not labels.**

   | ❌ Label-Style Heading | ✅ Conclusion-Style Heading |
   |---|---|
   | "Testing Process" | "Benchmark 1: 4-Hour Full-Load Aging Test Under 45°C Ambient" |
   | "Thermal Performance" | "What Case Temperature is Acceptable Under 100% Load for CE Compliance?" |
   | "Certifications" | "3 Mandatory Certifications for EU Charger Imports in 2026" |

2. **Visual anchors every scroll-depth.** Bold key terms, numbered lists, blockquotes. No unbroken wall of text longer than 4 lines.

3. **The 3-second H2 scan test.** Can you understand the article's complete value proposition by reading only H2s?

#### Table Test

Any technical parameters (voltage, current, certifications, MOQ pricing comparison) MUST be presented as Markdown tables. Parameters found outside tables are flagged.
- Tables present: 100 ✅
- Some params in tables, some in prose: 60 ⚠️
- No tables: 40 🔴

#### AI Citation Anchors: Speakable Architecture (v3.0 — July 2026)

AI search engines (ChatGPT, Perplexity, Google AI Overviews, Gemini) extract cited answers from the page's DOM. Standard `<p>` tags carry equal extraction weight. To signal which content block is the **primary answer**, use the `speakable` CSS class — the same selector registered in `SpeakableSpecification` Schema.

**Rule**: Exactly **3 speakable anchors** per article — no more. Google's Speakable specification targets 20-30 seconds of TTS content; exceeding this causes AI engines to ignore the entire `cssSelector` directive due to dilution.

| # | speakable 节点 | 位置 | DOM 标记 | 信息类型 |
|---|---------------|------|---------|---------|
| 1 | **H1** | Hero 区域 | `<h1>` 自然匹配 `"h1"` selector | 文章主题声明 |
| 2 | **Hook 首段** | Hero 区域 | `class="speakable"` | 行业痛点 + 核心冲突，匹配 Voice Search 提问 |
| 3 | **Key Takeaways TL;DR 句** | 封面图下方 | `class="speakable"` | 全文结论与核心量化数据，AI 提取为 Answer Box |

**Schema Architecture — BlogPosting vs FAQPage 职责分离**:

```
BlogPosting.speakable → ["h1", ".speakable"]  ← 3 nodes: H1 + Hook + Key Takeaways
FAQPage.speakable     → [".faq-answer"]       ← 独立管理，5-8 FAQ answers
```

两个 speakable 各自独立。BlogPosting 只负责文章摘要播报；FAQPage 负责问答匹配。**禁止**在 BlogPosting 的 cssSelector 中包含 `"h2"`——这会导致 ~12 个副标题被全量抓取（~16 个节点），严重稀释 AI 提取权重。

**❌ 禁止的 cssSelector（已废弃）**:
```json
"cssSelector": ["h1", "h2", "[data-speakable]"]  // ~16 nodes → dilution
```

**✅ 当前标准**:
```json
// BlogPosting
"speakable": { "cssSelector": ["h1", ".speakable"] }

// FAQPage (独立)
"speakable": { "cssSelector": [".faq-answer"] }
```

**`.speakable` class 标记标准**:

```html
<!-- Hook: .speakable on the wrapper -->
<div class="bg-brandBlue/5 border-l-4 border-brandOrange p-6 rounded-r-xl mb-8 speakable">
  <p class="text-lg text-slate-700 italic">[痛点段落]</p>
</div>

<!-- Key Takeaways TL;DR: .speakable on the summary paragraph -->
<div class="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-6 mb-8">
  <p class="text-[11px] font-black text-brandOrange uppercase tracking-widest mb-2">PUNTOS CLAVE</p>
  <p class="text-slate-700 leading-relaxed text-sm mb-4 speakable">[2-3 sentence core conclusion]</p>
  <ul class="text-sm text-slate-700 space-y-2 list-disc pl-5">...</ul>
</div>
```

**选择器规范**: 统一使用 `.speakable` CSS class（不再使用 `data-speakable` 属性选择器）。理由：(1) CSS class 选择器解析效率高于属性选择器，(2) 语义更清晰——Schema 锚点与样式挂钩逻辑一致，(3) 与 FAQPage 的 `.faq-answer` 命名风格一致。

**H3 后的 100-150 字符直接回答保留**（内容结构要求，确保 Featured Snippet 抓取位），但**不加 `.speakable`**——它们的提取权重不应与核心 3 节点竞争。

**内容不重叠规则**：Hook 和 Key Takeaways TL;DR 必须承载**完全不同类型**的信息。Hook = 痛点场景（"为什么你需要读这篇文章"），Key Takeaways = 核心结论（"读完你能得到什么"）。验证方法：去掉 Key Takeaways，文章的核心结论是否仍然完整？如果是 → Hook 写得太像总结，需要加重痛点元素。

#### Anti-Pattern: RESPUESTA RÁPIDA / Quick Answer Block (Forbidden)

**定义**: 在 TOC 与 H2 Sections 之间插入一个 `bg-brandBlue/5 border-l-4 border-brandOrange` 样式的蓝色卡片，标题为 "RESPUESTA RÁPIDA" / "SCHNELLANTWORT" / "Quick Answer"，内容与 Key Takeaways 高度重叠。

**为什么是反模式**:
1. **内容重叠 60-95%**：与 Key Takeaways amber 卡片的数据点几乎完全重复（共 12 篇 ES 审核实证）
2. **speakable 超限**：多出一个 `data-speakable` 锚点，总 speakable 从 3→4
3. **视觉冗余**：读者在正文前看到两张几乎相同的卡片
4. **SEO 稀释**：相同信息在两处出现，AI 爬虫去重后抓取权重减半

**✅ 正确做法**:
```
Hook → Featured Image → Key Takeaways (amber) → CIFRAS CLAVE (metrics grid) → TOC → §1
```

**❌ 已废弃**:
```
Hook → Featured Image → Key Takeaways → TOC → RESPUESTA RÁPIDA (删除!) → §1
```

**预发布检查**: 搜索 `RESPUESTA RÁPIDA` / `SCHNELLANTWORT` / `Quick Answer` — 出现即删除。此规则已通过 12 篇 ES 文章批量审计验证。

#### Short Paragraphs

2–3 sentences maximum. B2B buyers scan, they don't read.

### 4. Machine-Readable Structured Data (Schema Markup)

Required JSON-LD for every blog post:
- **BlogPosting**: headline, description, datePublished, dateModified, wordCount, author, publisher
- **Person (Author)**: name, jobTitle, knowsAbout, sameAs (LinkedIn URL)
- **FAQPage**: 5–8 B2B-focused questions
- **HowTo**: ≥3 steps for any process/guide article
- **BreadcrumbList**: full path from homepage to article
- **Organization**: name, logo, url
- **SpeakableSpecification**: cssSelector `["h1", ".speakable"]` (BlogPosting — 3 nodes); FAQPage uses independent `[".faq-answer"]`

**Static build environment variable note**: JSON-LD `@id` and canonical URLs must use the site's build-time base URL variable (e.g., 11ty `{{ site.url }}`), not hardcoded `localhost:8080`. This ensures production builds always render absolute production URLs. Template convention:

```njk
"@id": "{{ site.url }}/de/blog/{{ page.fileSlug }}/"
```

Trailing `/` is hardcoded in the template to guarantee zero slash mismatches between HTML Canonical and Schema JSON-LD across all build targets (local dev, staging, production).

#### FAQ Nine Rules (Mandatory)

**Rule 1: Body-Schema Consistency** — Every FAQ question in the visible body MUST match the JSON-LD FAQPage schema exactly (same wording, same order). **Auto-checked** by `b2b_content_auditor.py` Check 14 Step 7: extracts body FAQ questions from HTML, compares against Schema FAQPage, flags count mismatch (-15) or wording differences (-10/ea).

**Rule 2: Real Buyer Questions (Not Fabricated)** — FAQ questions must reflect what actual B2B procurement managers and brand owners ask, not what the writer guesses they might ask. This is a **mandatory manual verification** — the automated B2B language check only scores vocabulary patterns; it cannot validate search demand.

**FAQ Scoring: Question-Side vs Answer-Side Separation (Anti-False-Positive)**:

The automated FAQ B2B Language check (Check 9) must score questions and answers **independently** — not as merged text. This prevents natural-search-language questions (which ARE correct B2B behavior) from dragging down the score with false consumer-language flags.

| 侧 | 评分逻辑 | 权重 | 原因 |
|----|---------|------|------|
| **问题侧** | 搜索需求匹配度（WebSearch 验证），允许自然口语、长句、消费者式表达 | 20% | 匹配真实买家在 Google/ChatGPT 中实际键入的查询 |
| **答案侧** | B2B 词汇密度 + 量化数据（≥1 数字）+ 认证/标准引用 | 80% | AI 提取时答案是独立的引用单元，必须承载全部 B2B 深度 |

**FAQ Question Format Principle — Natural Search Language > Artificial B2B Vocabulary**:

FAQ questions must match how buyers **actually type into Google, ChatGPT, or Perplexity**. A question that sounds "B2B-professional" but no real buyer would ever type is worse than useless — AI engines use semantic matching to decide which FAQ to cite, and a query that doesn't match real search patterns will never be cited regardless of answer quality.

**Format rule**: Short keyword-driven opening + natural conversational follow-through + B2B value in the **answer**, not forced into the question.

| ❌ Artificial B2B Language (never cited) | ✅ Natural Search Language (high GEO match) |
|---|---|
| "How should OEM buyers specify mAh vs Wh on power bank product labeling and compliance documentation?" | "mAh vs Wh — which spec should OEM buyers use for power bank procurement?" |
| "What semi-solid-state battery advantages should OEM buyers evaluate vs Li-polymer for 2026 power bank product lines?" | "Semi-solid-state vs Li-polymer power banks — which is better for OEM products in 2026?" |
| "What does GB47372-2026 mean for OEM power bank sourcing compliance in 2026-2027?" | "GB47372-2026 — what is China's new power bank safety standard and how does it affect OEM buyers?" |

**Why this works for GEO**: The question opens with the exact keyword phrase buyers search for ("mAh vs Wh", "Semi-solid-state vs Li-polymer", "GB47372-2026"), followed by a natural conversational completion. AI models match the keyword anchor while the full sentence provides context. The B2B procurement depth lives in the **50-150 word answer**, not the 8-15 word question.

**Litmus test**: Read the question aloud. Would a procurement manager say this to a colleague? If it sounds like a legal document title, rewrite it.

**Verification process (must complete before publishing)**:
1. **Search query verification**: For each FAQ question, search the core query on Google. Do supplier pages, competitor B2B sites, or industry portals answer the same question? If no results exist, the question is likely fabricated.
2. **Competitor FAQ audit**: Check 3-5 competitor B2B sites and supplier pages in the same domain. What FAQ questions do they answer? These represent validated buyer demand. If none of them answer a question you've written, flag it.
3. **Supplier inquiry pattern**: What questions do actual inbound inquiries ask? MOQ, pricing, lead time, certification, customization options, and order process are the 6 universal B2B procurement question categories. A question outside these categories needs stronger evidence.
4. **Alibaba/Global Sources cross-check**: Search `[topic] + "MOQ"` / `"FOB"` / `"factory"` / `"OEM"` on B2B platforms. The questions buyers ask suppliers in RFQs are the gold standard for FAQ validation.

**Litmus test**: Would a procurement manager type this exact question into Google? If no, it's fabricated.
- ❌ Fabricated: "Does Qi2 work with old iPhones?" — consumer support question, not procurement
- ✅ Real: "What MOQ applies for Qi2-certified OEM wireless chargers?" — verified via search + competitor FAQ + supplier inquiry

**Auto-check**: `b2b_content_auditor.py` flags questions with >15 words (potentially artificial B2B phrasing) or consumer language patterns. The `/b2b-audit` command then **automatically triggers WebSearch** to verify each flagged question against real market search demand, using the core keyword phrase + B2B qualifiers (OEM/factory/supplier/sourcing). Results are reported as VERIFIED / NICHE / NO DEMAND. Manual Rule 2 verification via the 4-step process is still required for all FAQ questions before publishing.

**Rule 3: Content-Anchored Answers** — Every FAQ answer MUST be derived from a specific section in the article body.

**Rule 4: GEO-Optimized for AI Citation** — FAQ questions and answers must be structured so AI models (ChatGPT, Perplexity, Gemini) can extract and cite them as standalone Q&A pairs.

**Answer-first format for AI extraction**: The first 1-2 sentences of every FAQ answer must deliver the complete conclusion — including the specific data point, price, or standard reference. AI crawlers (GPTBot, PerplexityBot) preferentially extract the opening sentences of FAQ answers. If the opening is vague or contextual ("It depends on several factors..."), the AI skips the entire answer regardless of what follows.

| ❌ Buried Answer (AI skips) | ✅ Front-Loaded Answer (AI cites) |
|---|---|
| "It depends on several factors. Generally speaking, for most standard OEM orders, the minimum order quantity typically starts from around 500 units, though this can vary based on customization requirements and product complexity." | "Full OEM customization MOQ starts at **500 units**. For orders requiring new enclosure tooling, MOQ scales to **3,000+ units** due to mold amortization costs. Standard ODM branding starts at 500 units with 25-30 day lead time." |

**Why this matters**: AI models use extractive summarization — they pull the first authoritative-sounding sentence as the citation. A data-dense first sentence with specific numbers and B2B terms has a 3-5× higher citation probability than a general answer that buries data in paragraph 3.

**Self-contained requirement**: Each Q&A pair must make sense without reading the article body. The answer must contain all necessary context (MOQ tiers, certification names, price ranges, timeline) within itself.

**Rule 5: Procurement Decision-Chain Ordering** — FAQ questions must follow the B2B buyer's mental sequence:

| Order | Question Type | Example |
|-------|--------------|---------|
| 1 | Product/supplier fit | "What MOQ applies for Qi2-certified OEM wireless chargers?" |
| 2 | Technical specification | "How long does Qi2 WPC certification take for an OEM product?" |
| 3 | Certification/compliance | "What documentation does my factory need for Qi2 WPC compliance?" |
| 4 | Pricing/MOQ detail | "What FOB pricing should I expect for Qi2 wireless chargers at OEM volume?" |
| 5 | Comparison/decision | "Qi2 MPP vs MagSafe MFi: which costs less per unit at OEM scale?" |
| 6-7 | Process/timeline | "What is the lead time for a Qi2 OEM order from sample approval to delivery?" |
| 8 (last) | Action/next step | "How do I start an OEM order?" — with natural CTA bridge |

**Rule 6: Quantitative Answers Mandatory** — Every FAQ answer must contain ≥1 specific number (price, days, percentage, unit count, dimension, wattage).

**Rule 7: Final Question = Natural CTA Bridge** — The last FAQ question should transition naturally to action with a concrete next step.

**Rule 8: Format Differentiation** — FAQ answers use condensed Q&A format (50-150 words), structurally distinct from narrative H2 sections. Same data, different presentation.

**Rule 9: Cross-Reference Consistency** — Data is divided into two tiers with different consistency requirements:

| 数据层级 | 范围 | 一致性要求 | 示例 |
|---------|------|-----------|------|
| **Tier 1: Factory-Owned Parameters** | MOQ, FOB 价格, 测试温度, 认证成本, 交期, 工厂面积 | **全球绝对统一**，跨语言零差异 | MOQ 500 = DE/EN/ES/FR 全部写 500 |
| **Tier 2: Regional Market Data** | 市场规模, CAGR, 区域采用率, 本地法规 | 允许使用当地权威机构数据源（Gartner vs Statista vs 本地统计局），**不强制全球同源** | DE 用 DACH CAGR (Statista), EN 用 Global CAGR (BCC Research) |

Tier 2 宽松化的前提：每个语言版本必须标注**当地数据源的名称 + 出版年份**，且数据方向一致（不能 DE 说增长、EN 说萎缩）。

#### FAQ Procurement Language Patterns

```
B2B signals: MOQ, OEM, FOB, certification, compliance, lead time, minimum order,
             factory audit, third-party inspection, WPC, Qi2, pricing at OEM volume,
             verify a factory/manufacturer/supplier
Consumer signals: best, top N, cheap, good choice, buying guide, which one, for home
```

---

## IV. CTA Standard: Low-Friction Value Continuation

B2B procurement is a long-cycle decision. No one reads one article and clicks "Buy Now." Every CTA must offer **low-friction value continuation** — a logical next step that delivers additional utility without asking for a purchase commitment.

### ❌ Ineffective B2B CTAs

- "Buy our chargers today!"
- "Contact us for more information."
- "Click here to learn more."
- "Sign up today", "Get started"

### ✅ Three High-Converting CTA Types

| CTA Type | Template | When to Use |
|---|---|---|
| **Download Technical Asset** | *"Download the Full 140W GaN Charger Aging Test Report (PDF)"* | Article contains lab data, test results, or engineering benchmarks |
| **Get Operational Tool** | *"Get Our B2B Factory Audit Checklist — 42 Verification Points Before Your First Order"* | Article covers verification, auditing, or selection processes |
| **Book Expert Consultation** | *"Schedule a 30-Minute Call With Our Engineering Team to Discuss Your OEM Specifications"* | Article covers customization, compliance, or complex technical decisions |

### CTA Placement & Format

| Rule | Requirement |
|------|------------|
| **Position** | Below Author Bio, above Related Articles |
| **Heading** | Must use `<h2>` (not h3) |
| **Background** | Gradient `bg-gradient-to-br from-brandBlue to-slate-800` |
| **Button text** | B2B-appropriate: "Get Factory Pricing", "Request OEM Quote", "View Products" |
| **Button text (forbidden)** | "Contact Us", "Buy Now", "Click Here" |
| **Product keyword** | CTA text must contain a product keyword or MOQ reference |

---

## V. 4 Fatal Logic Errors (Must Never Occur)

| # | Error | Why It's Fatal | Auto-Check |
|---|-------|---------------|------------|
| 1 | **Skipping heading levels** (H1 → H3, no H2) | Google parser treats article as logically broken; Featured Snippet eligibility lost | 🤖 |
| 2 | **H2/H3 as meaningless short labels** (e.g., "Testing", "Benefits") | F-pattern readers skip these — no information communicated by heading alone | 🤖 |
| 3 | **Keyword stacking in H2s** (consecutive H2s with same B2B word) | Reads as keyword stuffing. Each H2 must address a NEW dimension | 🤖 |
| 4 | **Body-text mismatch with heading** (H3 says "Energy Density Comparison" but body talks about company history) | Reader loses trust instantly. First sentence after every heading MUST answer that heading | Manual |
| 5 | **Hook paragraph contains duplicated data** (same stat or claim appears twice within the Hook paragraph) | Reads as sloppy editing; breaks reader trust in the first 10 seconds | Manual — search for repeated `<strong>` content or near-identical clauses within the Hook div |

---

## VI. B2B Content Audit: 13 Automated Checks

The `b2b_content_auditor.py` module performs 13 automated checks against these standards:

| # | Check | What It Measures | Scoring |
|---|-------|-----------------|---------|
| 1 | **Opening Density** | First 2-3 sentences deliver core conclusion (no fluff preamble) | Fluff pattern -30/ea, no conclusion signal -40 |
| 2 | **KEY TAKEAWAYS Block** | Structured summary block present above fold | Full block = 100, list only = 60, absent = 0 |
| 3 | **H3 Answer Length** | 100-150 char direct answer after each H3/H4 | Compliance ratio = score |
| 4 | **Vague Headings** | Label-style headings flagged (e.g., "Introduction", "Specifications") | -15 per detection |
| 5 | **H2 B2B Density** | Density within tiered range + adjacency + vocabulary rotation | In range = 100, out = 60 |
| 6 | **Data Density** | Precise numbers + engineering units (°C, mV, kHz, Wh/kg, mm, €, $) per 1,000 words | ≥3/k = 100, 2-2.9 = 70 (warning), 1-1.9 = 40, <1 = 10 (critical) |
| 7 | **Table Test** | Technical parameters in Markdown tables | Present = 100, params outside tables = 40 |
| 8 | **Stock Photo Detection** | Images from known stock domains flagged | -25 per image |
| 9 | **FAQ Language** | FAQ questions match real search queries (question-side, 20% weight) + answers carry B2B vocabulary + quantified data (answer-side, 80% weight). Scoring separated per Rule 2. | Question match + Answer B2B density = weighted score |
| 10 | **Author E-E-A-T** | Byline, credentials, LinkedIn, author page, topic match | 5 checks, 20 pts each |
| 11 | **Weak CTA Detection** | Flag ineffective B2B CTAs | Good = 100, weak = 40-60, absent = 20 |
| 12 | **Heading Hierarchy** | Detect skipped levels (H1→H3, H2→H4) | -25 per skip |
| 13 | **URL Quality** | Flag underscores, uppercase, dates, stop words. Staged word count: 3-6=pass, 7-8=minor warning (-10), ≥9=deduction (-20) | Deduct per violation |
| 14 | **Schema Validation** | Parse JSON-LD for syntax errors, missing required fields, trailing-slash consistency, `.speakable` class ↔ `SpeakableSpecification` alignment, TOC-FAQ anchor match. **v2 required fields**: Organization (`legalName`, `url`, `publishingPrinciples`, `logo`, `contactPoint`, `address`, `telephone`, `email`), Person (`@id`, `sameAs`), BlogPosting (`author` as `@id` ref, not inline Person; `@id`; `keywords`; `articleSection`), FAQPage (independent `speakable: [".faq-answer"]`), HowTo (`@id`) | Syntax error = -30, missing field = -15/ea, slash mismatch = -10, speakable mismatch = -5/-10, TOC-FAQ mismatch = -5/-10, inline author = -10, missing Organization address/phone/email = -5~10 |
| 15 | **RESPUESTA RÁPIDA Detection** | Search for "RESPUESTA RÁPIDA" / "SCHNELLANTWORT" / "Quick Answer" blocks in HTML — duplicate of Key Takeaways, forbidden | Present = -25 (automatic deletion recommended) |
| 16 | **Hook Duplicate Detection** | Scan Hook paragraph for repeated `<strong>`-tagged statistics or near-identical clauses within the same paragraph | Duplicate found = -15 |
| 17 | **Featured Image NO srcset** | Cover image must use `<img src="{IMAGE}">` only — NO `srcset`, NO `sizes`, NO variant (`-800`/`-1200`) files. Variant files don't exist and cause 404s for AI crawlers. | `srcset` present = -15, variant URL present = -15 |
| 18 | **Organization Contact Completeness** | Organization node must include `address` (PostalAddress: streetAddress + addressLocality + addressRegion + postalCode + addressCountry), `contactPoint.telephone`, and `contactPoint.email`. B2B trust signal — missing fields weaken entity verification | Missing address = -10, missing telephone = -5, missing email = -5 |
| 19 | **Citation ↔ Fuentes Alignment** | Schema `citation` array count must match visible Sources/Fuentes section link count. AI engines scan citation array directly for authority signals; under-reporting wastes GEO opportunities | Count mismatch = -10 |
| 20 | **timeRequired ↔ Visible Display** | Schema `timeRequired` (ISO 8601) must match the visible reading time shown in the date row. Inconsistency is flagged as structured-data/visible-content mismatch by AI crawlers | Mismatch = -5 |
| 21 | **Person @id Dedup** | `BlogPosting.author` must use `{ "@id": "{AUTHOR_ID}" }` reference, NOT an inline Person object. A separate Person node with matching `@id` must exist. Inline duplication creates ghost entities that weaken AI author credibility signals | Inline author = -10, missing Person @id = -10 |
| 22 | **worksFor @id Reference** | Person `worksFor` must use `{ "@id": "{ORGANIZATION_ID}" }`, NOT an inline Organization object. Inline creates a phantom Organization entity disconnected from the main one | Inline worksFor = -5 |

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
| Keywords | 20% | Keyword in H1/first-100-words/H2s/conclusion, density 1-2% |
| Meta | 10% | Title 50-60 chars, Description 150-160 chars |
| Structure | 12% | Unique H1, H2 ≥4, hierarchy complete |
| Links | 10% | Internal ≥3, external ≥2 |
| Readability | 8% | Flesch 60-70, avg sentence <25 words |
| B2B Quality | 15% | From `b2b_content_auditor.py` composite |
| Information Gain | 10% | From `information_gain_analyzer.py` composite |

### Word Count Principle: Coverage Over Count

Word count is **not a ranking factor** (Google official position, consistently stated since 2019; reaffirmed by Danny Sullivan at WordCamp US 2025). The 2026 paradigm measures **first-hand data density and decision-chain coverage** — not character count.

**Two rules replace all hard word-count targets:**

1. **Coverage completeness check** (§II H2 Decision Chain): The 5-stage procurement decision chain (Why this matters → What to verify → How it's done → What it costs → How to comply) must be addressed. If the H2 outline covers every stage, the article is "long enough" regardless of word count. Use `information_gain_analyzer.py` data density scoring as the quantitative signal — not word count.

2. **Thin content red line**: Articles below **~800 words of body text** are unlikely to cover a B2B procurement decision adequately. This is a manual review trigger ("is this article too thin?") — not a target to write toward, and not a scoring criterion. Articles above this threshold with complete H2 coverage and ≥3 data points per 1K words are automatically sufficient.

**Why this matters for GEO (AI citation)**: AI engines extract self-contained, information-dense paragraphs. A 1,800-word article where every section has specific data is cited more often than a 4,000-word article padded with paraphrase — the latter triggers the "zero information gain" classification the standard already warns against.

**Typical ranges** (advisory, not mandatory):
- Technical/educational: 1,000–2,500 words
- Procurement/sourcing: 1,500–3,500 words
- OEM/ODM core: 2,000–4,000 words

These ranges reflect the natural length of well-covered B2B topics. Articles that fall outside these ranges should trigger a manual **coverage** review — not a word-count penalty.

### Quality Gate Thresholds

| Gate | Trigger | Module | Pass Threshold | Fail Consequence |
|------|---------|--------|---------------|-----------------|
| Content Quality | `/write` auto | `content_scorer.py` | ≥70 | Auto-revise → re-score (max 2×) → still failing → `review-required/` |
| B2B Compliance | `/write` Step 2.5 | `b2b_content_auditor.py` | ≥60 | Fix flagged issues → re-audit |
| SEO Final | `/optimize` | `seo_quality_rater.py` | ≥80 + no critical | 90+: publish / 80-89: minor fixes / 70-79: priority fixes / <70: major revision |
| Information Gain | `/optimize` + `/analyze-existing` | `information_gain_analyzer.py` | Mode B ≥40 / Mode A ≥50 | <20 = zero gain → block publishing, add exclusive data |

---

## IX. B2B → GEO Citability Bridge

B2B audit results can adjust GEO citability scoring. Mapping logic in `.claude/skills/seo-audit/references/b2b-geo-bridge.md`.

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
| **URL** | ≤5 words, lowercase, hyphens, no stop words, no dates | 🤖 |
| **Title Tag** | 50-60 chars, front-load keyword, B2B qualifier, unique per page | Manual (length checked) |
| **Meta Description** | 120-155 chars, [pain]+[solution]+[low-friction CTA], keyword included | Manual (length checked) |
| **H1** | 50-65 chars, ≥1 B2B signal word | 🤖 |
| **H2** | 4-7 sections, B2B density in tier range, conclusion-style, no consecutive same-word, no skipped levels | 🤖 |
| **H3** | Belongs to parent H2, specific question/data conclusion, 100-150 char answer after | 🤖 |
| **H4** | Belongs to parent H3, no level skipping | Manual |
| **KEY TAKEAWAYS Block** | Present above fold, 3-5 bullet conclusions, uppercase label | 🤖 |
| **Tables** | Technical parameters in Markdown tables | 🤖 |
| **Images** | Real photos only, alt text with B2B keywords, no stock domains | 🤖 |
| **FAQ** | 9 rules: body-schema consistent, real buyer questions, content-anchored, GEO-optimized, decision-chain ordered, quantitative answers, final-Q CTA bridge, format differentiated, cross-reference consistent | 🤖 + Manual |
| **Speakable** | BlogPosting: `["h1", ".speakable"]` (3 nodes); FAQPage: `[".faq-answer"]` (independent). H1+Hook+Key Takeaways only; no H2 in selector; no `.speakable` on FAQ answers; `data-speakable` attribute deprecated | 🤖 |
| **RESPUESTA RÁPIDA** | Must NOT exist — this block duplicates Key Takeaways content 60-95% and creates a 4th speakable anchor. Search for "RESPUESTA RÁPIDA" / "SCHNELLANTWORT" / "Quick Answer" — delete if found | Manual (grep) |
| **Hook Duplicate** | Hook paragraph must not contain the same statistic or claim twice (e.g., "$1.200M market" appearing in two separate clauses). Read Hook aloud — any information repeated = edit | Manual |
| **Featured Image** | `<img src="{IMAGE}">` only — NO `srcset`, NO `sizes`, NO variant files. `fetchpriority="high"` optional. Variant files (`-800`/`-1200`) don't exist on disk and cause AI crawler 404s | 🤖 |
| **Content Width** | All blocks from Featured Image through Sources must share a single `max-w-4xl mx-auto px-6` wrapper. No double-nested `max-w-4xl` wrappers (causes inconsistent margins) | Manual |
| **Schema v2 — Organization** | `address` (PostalAddress: streetAddress + addressLocality + region + postalCode + country), `contactPoint.telephone`, `contactPoint.email` — B2B entity verification signals | 🤖 |
| **Schema v2 — Citation** | `citation` array count must match visible Sources/Fuentes link count. Under-reporting wastes AI citation signals | Manual (count comparison) |
| **Schema v2 — timeRequired** | Schema `timeRequired` must match visible reading time display (e.g., "9 min" = PT9M, not PT12M) | Manual |
| **Schema v2 — Author @id** | `BlogPosting.author` = `{ "@id": "{AUTHOR_ID}" }` (reference, not inline Person); Person node has matching `@id`; `worksFor` = `{ "@id": "{ORG_ID}" }` | 🤖 |
| **Schema v2 — JSON Syntax Gate** | Post-build: `json.load()` on every generated `<script type="application/ld+json">` block. Must pass for ALL articles — a single unreplaced placeholder (e.g., `{ACTUAL_WORD_COUNT}` left as-is) produces invalid JSON, which silently disables ALL schema on that page (not just wordCount) | 🤖 (build script) |
| **CTA** | Below Author Bio, h2 heading, gradient background, B2B button text, product keyword | 🤖 |
| **Author** | Named, credential-rich byline, LinkedIn link, author page, topic-relevant expertise | 🤖 |

### Author Self-Check (8 Questions)

After automated checks pass, verify these items manually:

```
[ ] H1 contains ≥1 B2B signal word + 50-65 chars + audience/metric/return?
[ ] Opening delivers core conclusion directly (not question, not industry preamble)?
[ ] KEY TAKEAWAYS block present after H1, before first H2?
[ ] RESPUESTA RÁPIDA / Quick Answer block absent? (grep for these strings — delete if found)
[ ] Hook paragraph free of duplicated data? (no stat or claim repeated within the Hook)
[ ] .speakable class on Hook div + Key Takeaways TL;DR only? No speakable on FAQ answers or H2s
[ ] BlogPosting schema cssSelector = ["h1", ".speakable"] (NOT ["h1", "h2", "[data-speakable]"])?
[ ] FAQPage has its own independent speakable with [".faq-answer"]?
[ ] Featured Image has NO srcset/sizes (variant files don't exist), but has fetchpriority="high"?
[ ] All content blocks share consistent max-w-4xl width? (no double-nested wrappers)
[ ] All H2 headings scanned — 3 seconds to understand complete value?
[ ] ≥2 H2s contain B2B signal words? No 3 consecutive H2s with same B2B word?
[ ] Images are real product/factory/lab photos? Alt text contains B2B keywords?
[ ] CTA is low-friction value continuation (download/checklist/consultation)? No "Buy now"?
[ ] FAQ questions use B2B procurement language (MOQ/FOB/certification/lead time)? Not "Which is best?"?
[ ] Schema v2: Organization has address + telephone + email? (B2B entity verification)
[ ] Schema v2: citation array count = visible Sources/Fuentes link count? (AI citation signal)
[ ] Schema v2: timeRequired matches visible reading time? (9 min = PT9M, not PT12M)
[ ] Schema v2: BlogPosting.author = @id ref; Person has matching @id? (no inline duplication)
[ ] Schema v2: Person.worksFor = @id ref (not inline Organization)? (entity consistency)
[ ] Schema v2: Run `json.load()` on every `<script type="application/ld+json">` block in `_site/` — zero syntax errors? (placeholder catch-all)
[ ] Cover image matches article topic and language folder? (e.g., cover-es/ for ES articles)

### Accessibility & Performance
[ ] WCAG: color contrast ≥ 4.5:1 for body text? (Lighthouse audit)
[ ] WCAG: all interactive elements keyboard-accessible? (Tab navigation test)
[ ] WCAG: `<html lang="es">` (or de/en/fr) declared for screen reader pronunciation?
[ ] CWV: LCP ≤ 2.5s (Lab ≤ 1.8s) — verified via Lighthouse?
[ ] CWV: CLS ≤ 0.1 — no layout shift from images without dimensions?
[ ] CWV: INP ≤ 200ms — no long-blocking JS tasks on interaction?

### AI Crawler Access
[ ] robots.txt: all 6 AI crawlers (GPTBot/ClaudeBot/PerplexityBot/ChatGPT-User/Googlebot/Bingbot) have Allow: /?
[ ] llms.txt: returns 200 for all applicable languages (EN/DE/ES/FR)?
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

---

**In one sentence**: A high-performing B2B blog looks like an article on the surface, but functions as a carefully packaged **industry pitfall-avoidance guide** and **procurement decision-support tool** — earning trust with hard data, holding attention with F-pattern scannability, and converting with low-friction value-continuation CTAs.

---

## IX. CI/CD Audit Pipeline (Recommended Infrastructure)

Static HTML + this standard enables fully automated quality gating before deployment. The `b2b_content_auditor.py` script runs directly on `.njk` / `.html` files — no build step required.

### 9.1 Pre-Commit Hook (Local, Syntax-Only — Fast)

Pre-commit runs **fatal-error static scans only** — URL format, HTML syntax, missing `<h1>`, absolute path validity. **No NLP/AI scoring** at this stage. This keeps local commits fast (< 1s) and avoids disrupting draft workflows. Full B2B scoring is deferred to PR-level CI.

```bash
#!/bin/bash
# .git/hooks/pre-commit — syntax-only, < 1s, never blocks draft commits
CHANGED=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(njk|html)$')
for FILE in $CHANGED; do
  python data_sources/modules/b2b_content_auditor.py "$FILE" --check-syntax-only
  if [ $? -ne 0 ]; then
    echo "❌ $FILE: fatal syntax error — commit blocked"
    exit 1
  fi
done
```

### 9.2 GitHub Actions (PR-Level, Full Audit — Quality Gate)

The full `b2b_content_auditor.py` runs at PR time. Score < 60 blocks merge into `main`. This separates concerns: local commits stay fast and non-blocking; the production branch enforces quality.

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

### 9.3 Audit Checklist (CI-Automated)

Each file change triggers these automated checks via `b2b_content_auditor.py`:

| Check | CI Gate | Threshold |
|-------|---------|-----------|
| H3 → first `<p>` direct sibling | DOM parser | Must pass (block) |
| FAQ body ↔ Schema word-for-word | String diff | Must pass (block) |
| H2 B2B density | Calculator | Warn if out of range |
| Data density (≥3/k words) | Counter | Warn if < 2/k |
| Trailing slash consistency | Regex | Must pass (block) |
| Stock photo detection | URL pattern | Block if any |
| Overall B2B Score | Composite | Block if < 60 |

### 9.4 Integration with 11ty Build

The audit can run as a build-time check in `package.json`:

```json
"scripts": {
  "audit:content": "python ../seomachine/data_sources/modules/b2b_content_auditor.py src/de/blog/**/*.njk",
  "prebuild": "npm run audit:content",
  "build": "npx @11ty/eleventy"
}
```

Set `"prebuild"` to `"npm run audit:content"` and the 11ty build will fail if any article scores below threshold — preventing substandard content from ever reaching production.

### 9.5 llms.txt Auto-Generation (Build-Time, Recommended)

AI crawlers (GPTBot, ClaudeBot, PerplexityBot) preferentially access `/llms.txt` at the site root before crawling individual pages. After each 11ty production build, a post-build script should aggregate all audit-passed articles into `/llms.txt`:

```bash
#!/bin/bash
# scripts/generate-llms-txt.sh — run after 11ty build
echo "# WOWOHCOOL B2B Blog — AI Index" > _site/llms.txt
for f in _site/**/blog/**/index.html; do
  # Extract KEY TAKEAWAYS TL;DR + FAQ Q&A pairs
  python ../seomachine/data_sources/modules/extract_llms_context.py "$f" >> _site/llms.txt
done
echo "" >> _site/llms.txt
echo "## Optional: full content" >> _site/llms.txt
echo "See /llms-full.txt for complete article texts." >> _site/llms.txt
```

This gives AI engines a pre-digested index of every article's core conclusions and FAQ answers — maximizing citation probability without requiring full-page crawl budget.

---

## XII. Static HTML Architecture Specifics

Static HTML sites built with SSG (11ty, Hugo, Astro) have unique engineering constraints that this standard accommodates:

### 12.1 DOM Rules Adaptation for Components

The Direct Sibling rule (`<h3>` → `<p>`) applies to inline narrative text. When articles use CSS/JS accordions or structured card wrappers, the audit script must scope its DOM check **to the nearest semantic container**, not the global root.

| Pattern | Compliant Markup |
|---------|-----------------|
| FAQ accordion card | `<div class="faq-answer"><h3>Q</h3><p>A</p></div>` |
| HTML5 disclosure | `<details><summary><h3>Q</h3></summary><p>A</p></details>` |
| Spec card grid | `<div class="spec-card"><h4>Parameter</h4><p>Value</p></div>` |

### 12.2 Multi-Environment Absolute URL Convention

SSG templates (11ty Nunjucks, Hugo Go, Astro JSX) must use the build-time `site.url` variable for all absolute URLs:

| Context | Template Source | Production Output |
|---------|----------------|-------------------|
| Canonical | `{{ site.url }}/de/blog/{{ slug }}/` | `https://www.wowohcool.com/de/blog/.../` |
| Schema @id | `{{ site.url }}/de/#organization` | `https://www.wowohcool.com/de/#organization` |
| OG image | `{{ site.url }}/image/blog/cover.webp` | `https://www.wowohcool.com/image/blog/cover.webp` |

**Rule**: Trailing `/` is hardcoded in template strings. No URL is ever constructed by concatenating user input — preventing slash inconsistencies between build environments.

### 12.3 Multi-Language hreflang & Schema inLanguage

For multi-language B2B sites (DE/EN/ES/FR), every article must declare bidirectional `<link rel="alternate" hreflang="...">` tags in `<head>` to prevent cross-language canonical confusion:

```html
<!-- In de/blog/slug/index.njk → rendered in <head> -->
<link rel="alternate" hreflang="de-DE" href="https://www.wowohcool.com/de/blog/slug/" />
<link rel="alternate" hreflang="en-US" href="https://www.wowohcool.com/blog/slug/" />
<link rel="alternate" hreflang="es-ES" href="https://www.wowohcool.com/es/blog/slug/" />
<link rel="alternate" hreflang="fr-FR" href="https://www.wowohcool.com/fr/blog/slug/" />
<link rel="alternate" hreflang="x-default" href="https://www.wowohcool.com/blog/slug/" />
```

**Rule**: Every article MUST include the full cross-language `hreflang` set in `<head>`. The `BlogPosting` Schema MUST include `"inLanguage": "de-DE"` (or `en-US`, `es-ES`, `fr-FR`) matching the hreflang value. Without this, Google treats the 4 language versions as competing duplicate pages rather than a legitimate multi-region cluster — splitting ranking signals across languages and potentially triggering duplicate-content penalties.

### 12.4 Static Asset Integrity for GEO

- Featured image uses single `<img src="...">` (NO `srcset`, NO `sizes` — variant files don't exist) + explicit `width`/`height` attributes
- `fetchpriority="high"` on featured image only
- `<cite>` and `<data>` semantic tags required for all standards references and measurements (see §III.1)
- `.speakable` CSS class for Schema speech anchors on Hook + Key Takeaways TL;DR (exactly 3 nodes: H1 + 2×.speakable). BlogPosting cssSelector: `["h1", ".speakable"]`. FAQPage has independent speakable via `[".faq-answer"]`. `data-speakable` attribute is deprecated.

### 12.5 Server-Side 301 Trailing Slash Enforcement

| Platform | Configuration |
|----------|--------------|
| Cloudflare Pages | Auto-redirect for directory-index routes (default on) |
| Nginx | `rewrite ^(.+[^/])$ $1/ permanent;` |
| Apache | `RedirectMatch 301 ^/(.*[^/])$ /$1/` |

Verify with `curl -I https://www.wowohcool.com/de/blog/slug` → must return `301 → /de/blog/slug/`.

---

## XIII. Accessibility Compliance (WCAG 2.2 + EAA)

**Regulatory context**: The European Accessibility Act (EAA, Directive 2019/882) entered into force on **June 28, 2025** with compliance enforcement beginning **June 28, 2026**. For B2B content targeting EU markets (DE/AT/CH/ES/FR), the following minimum requirements apply to all blog articles:

### Mandatory Checks

| Element | Requirement | Verification |
|---------|-------------|--------------|
| Color contrast | Text ≥ 4.5:1, large text ≥ 3:1 | Lighthouse or axe DevTools |
| Keyboard navigation | FAQ accordions, TOC links, CTA buttons reachable via Tab | Manual keyboard test |
| Focus indicators | Visible focus ring on all interactive elements | Tab through page |
| Alt text | All `<img>` have descriptive `alt` (no "image of" or "picture of") | Automated + spot check |
| Heading hierarchy | No skipped levels (H1→H3), semantic structure preserved | b2b_content_auditor.py Check 12 |
| Language declaration | `<html lang="es">` or equivalent for correct screen reader pronunciation | Visual check |

### FAQ Accordion Accessibility

FAQ sections using the standard white-card format (non-`<details>`) are inherently keyboard-accessible without additional work. If `<details>` elements are ever used:

```html
<!-- Required: keyboard-openable, screen-reader-announced state -->
<details aria-expanded="false">
  <summary>Question text</summary>
  <p>Answer text.</p>
</details>
```

**Rule**: The standard `.njk` FAQ template (`.bg-slate-50.rounded-2xl` container with `.bg-white.rounded-xl` cards) is preferred over `<details>` — it provides visible hierarchy that benefits all users regardless of assistive technology.

---

## XIV. Core Web Vitals Thresholds

Content quality alone does not guarantee search visibility. The following Core Web Vitals pass thresholds are required for every blog article page:

| Metric | Good (Pass) | Needs Improvement | Poor (Fail) |
|--------|-------------|-------------------|-------------|
| **LCP** (Largest Contentful Paint) | ≤ 2.5s | 2.5s–4.0s | > 4.0s |
| **INP** (Interaction to Next Paint) | ≤ 200ms | 200ms–500ms | > 500ms |
| **CLS** (Cumulative Layout Shift) | ≤ 0.1 | 0.1–0.25 | > 0.25 |

**Enforcement checklist per article**:
- [ ] Featured image has explicit `width`/`height` attributes (prevents CLS)
- [ ] Featured image uses `loading="eager"` + `fetchpriority="high"` (LCP optimization)
- [ ] Below-fold images use `loading="lazy"` (reduces initial bandwidth)
- [ ] NO `srcset` / `sizes` on featured image — variant files (`-800`/`-1200`) don't exist, cause AI crawler 404s
- [ ] No layout shift from dynamically injected content (ads, cookie banners, chat widgets)
- [ ] Tailwind purge removes unused CSS (already configured in `npm run build:css`)

**Note**: LCP ≤ 2.5s is measured as the 75th percentile of real-user data (CrUX). Lab tests (Lighthouse) should target ≤ 1.8s to account for field data variance.

---

## XV. AI Crawler Access Verification (GEO Foundation)

All content optimization for AI visibility is wasted if AI crawlers cannot access the page. This check must be part of every pre-publish audit:

### 15.1 robots.txt Verification

```bash
curl -s https://www.wowohcool.com/robots.txt | grep -E "ClaudeBot|ChatGPT-User|PerplexityBot|GPTBot"
```

Expected output must show `Allow: /` for all of:
- `ClaudeBot` (Claude AI)
- `ChatGPT-User` (ChatGPT with browsing)
- `PerplexityBot` (Perplexity AI)
- `GPTBot` (OpenAI crawler)

Additionally, Googlebot and Bingbot must be allowed for Google AI Overview and Bing Copilot respectively.

### 15.2 llms.txt Generation & Verification

After each 11ty production build, verify:
- [ ] `https://www.wowohcool.com/llms.txt` returns 200 (EN)
- [ ] `https://www.wowohcool.com/de/llms.txt` returns 200 (DE)
- [ ] `https://www.wowohcool.com/es/llms.txt` returns 200 (ES)
- [ ] `https://www.wowohcool.com/fr/llms.txt` returns 200 (FR)

### 15.3 Pre-Publish Audit Inclusion

The following items are added to the §X Full-Element Pre-Publish Checklist:

```
[ ] robots.txt: all 6 AI crawlers (GPTBot/ClaudeBot/PerplexityBot/ChatGPT-User/Googlebot/Bingbot) have Allow: /
[ ] llms.txt: returns 200 for all 4 languages
[ ] Core Web Vitals: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 (Lab: LCP ≤ 1.8s)
[ ] WCAG: color contrast ≥ 4.5:1, keyboard navigation functional, heading hierarchy valid
[ ] WCAG: all images have descriptive alt text
[ ] EAA: page targets EU market (DE/AT/CH/ES/FR) → basic compliance verified
```
