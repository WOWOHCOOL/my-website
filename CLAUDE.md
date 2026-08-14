# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Communication Language

不论内容使用什么语言撰写，**与用户的沟通始终使用中文**。代码注释使用英文。

## Localization Rule (Mandatory — Do NOT Translate)

**研究必须针对目标语言市场的本土数据，优化必须使用本土化语言，禁止纯翻译。**

- **研究技能强制本土调研（每次 /research 必做）**：必须用目标语言做**本土市场 + 竞争对手**调研 —— 搜索目标语言关键词、分析目标语言 SERP 竞品、引用目标市场监管法规。禁止用英文搜索结果或其它语言市场的经验外推（如 FR 真空 ≠ PL 真空，必须实际验证目标语言 SERP）。写新 brief 前必须先读仓库里已有的同主题 brief（先读再写）。
- **SERP 研究用目标语言搜索**：优化 ES 文章 → 搜索西班牙语关键词，分析西班牙语 SERP 竞品（不是翻译英文 SERP）
- **本土化数据**：引用目标市场的法规、统计、案例（如 ES 文章引用 BOE/AEAT 西班牙法规、LATAM 各国认证；DE 文章引用 Stiftung Warentest、德国 DIN 标准）
- **本土化语言**：使用该语言的母语表达习惯、商业术语、B2B 行话（不是从英文逐字翻译）
- **拼写与用词准确（专业/国际术语除外）**：本土语言正文禁止单词拼写错误（缺重音 é→e、slug 拼写 typo、错误变音符号）和语言混用（母语术语存在时用英文词，如法语用 "charger" 而非 "chargeur"、波兰语用 "charger" 而非 "ładowarka"）。**例外**：专业术语和国际通用词保持英文/缩写（OEM、ODM、FOB、MOQ、GaN、PD 3.1、CE、EAC、BOM、QC 等）
- **本土化案例**：优先使用目标市场进口商的真实场景（如 ES 文章用西班牙进口商视角，不是美国进口商视角）
- **对标检查**：如果文章有对应的 EN/DE/ES/FR 版本，内容方向一致但**语言表达完全独立**，不是逐段翻译
- **ES 本土化自检清单**（完整词表见 `context/es-localization-dict.md` 和 `context/es-title-case-dict.md`）：重音准确（certificación/fábrica/ñ）；方言统一（móvil/ordenador 非 celular/computadora）；倒置标点 ¿¡、€ 在数字后、月份小写、标题 sentence case；专业术语/专名保留英文（OEM/PD/DDP/机构名）、普通词用西语（entrega 非 delivery）；URL/slug 保持 ASCII；判断英语词先看上下文（术语/专名→英文，翻译腔→西语）

违反此规则的标志：用英文搜索 SERP 后翻译成西班牙语、引用美国法规在西班牙文章中、使用机器翻译句式（如 ES 文章出现 "En orden a" 这种非自然表达）、缺重音/变音符号（如 "certifie" 应为 "certifié"）、slug 拼写 typo（如 "technologya" 应为 "technologiya"）、母语术语存在时混用英文词（法语用 "sourcing" 代替 "approvisionnement"，但 "OEM/FOB/MOQ" 等国际术语保留）。

## Article Optimization Quality Gates (Mandatory)

**每次优化或撰写文章时，必须在编辑过程中内置以下 5 道质量门，不得在优化完成后才审计。** 完整标准见 `context/b2b-blog-quality-audit-standard.md`。

### Gate 1: Anti-Repetition
- 同一段落中不重复相同信息
- 一条清晰陈述 > 三条同义变体

### Gate 2: Information Gain (最关键的 Gate)
- 每篇文章必须包含竞争对手 SERP top 5 没有的内容
- **工厂数据**: 引用 `context/factory-data-canonical.md` 的真实数字，不编造
- **第一手经验**: 使用精确数值 + 单位（°C, mV, kHz, Wh/kg, mm, €）
- **独家术语**: PCBA ripple noise, BOM cost breakdown, AQL sampling, FOB vs DDP landed cost
- 反对泛泛而谈: 用 "Case temperature stabilized at 58.3°C under 100% load after 4-hour aging test" 代替 "Good thermal performance"

### Gate 3: Scannability (结构强制)
- **H1**: 50–65 字符, 必须含 ≥1 个 B2B 信号词 (OEM, manufacturer, factory, supplier, importer, sourcing, MOQ, FOB, B2B)
- **H2**: 按采购经理决策链组织（Why → What to verify → How it's done → What it costs → How to comply），至少 2 个 H2 含 B2B 信号词
- **H3**: 必须具体 — 优先使用问题格式或数据结论，不要泛泛的 "Thermal Performance"
- **H3/H4 后**: 立即给出 100–150 字符的直接回答或对比表格（Featured Snippet 抓取位）
- 每个 H2 至少含 1 个 H3（不得有空 H2）

### Gate 4: Visual Authenticity (不可跳过)
- ❌ 禁止: stock photos (握手、西装、通用工厂图片)
- ✅ 必须: 真实工厂/产品/实验室图片
- 每张图片必须含描述性 **alt text**，嵌入 B2B 关键词
- 作者图片 alt text 必须包含职位和专长

### Gate 5: CTA Relevance
- 文章底部必须有 B2B 买家的逻辑下一步
- 示例: "Solicitar presupuesto OEM", "Solicitar catálogo", "Consultar certificación"

### Schema 强制清单 (每条必须)
```
✅ BlogPosting (headline + description + datePublished + dateModified + wordCount)
✅ Person (Author with LinkedIn URL + jobTitle + knowsAbout)
✅ FAQPage (5-8 questions with substantive B2B answers)
✅ HowTo (≥3 steps for any process/guide article)
✅ BreadcrumbList
✅ Organization / ManufacturingBusiness
✅ SpeakableSpecification (cssSelector: ["h1", "h2", ".speakable"])
```

### Pre-Commit 自检
编辑完文章后、提交前，必须验证:
- [ ] H1 含 B2B 信号词 + 50-65 字符
- [ ] ≥2 个 H2 含 B2B 信号词
- [ ] HowTo Schema 已添加（如有步骤流程）
- [ ] 图片 alt text 含 B2B 关键词
- [ ] dateModified 更新为当天日期
- [ ] wordCount 更新为实际数值（整数，无引号）
- [ ] ≥2 个外部权威链接 (rel="noopener noreferrer")
- [ ] ≥3 个内部链接到产品页/服务页/相关文章
- [ ] FAQ 问题使用 B2B 采购语言（非消费者语言）

## Project Overview

SEO Machine is an open-source Claude Code workspace for creating SEO-optimized blog content. It combines custom commands, specialized agents, and Python-based analytics to research, write, optimize, and publish articles for any business.

## Setup

```bash
pip install -r data_sources/requirements.txt
```

API credentials are configured in `data_sources/config/.env` (GA4, GSC, DataForSEO). GA4 service account credentials go in `credentials/ga4-credentials.json`.

## Commands

All commands are defined in `.claude/commands/` and invoked as slash commands:

- `/research [topic]` - Keyword/competitor research, generates brief in `research/`
- `/write [topic]` - Create full article in `drafts/`, auto-triggers optimization agents
- `/rewrite [topic]` - Update existing content, saves to `rewrites/`
- `/optimize [file]` - Final SEO polish pass
- `/analyze-existing [URL or file]` - Content health audit
- `/performance-review` - Analytics-driven content priorities
- `/article [topic]` - Simplified article creation
- `/cluster [topic]` - Build complete topic cluster strategy with pillar + supporting articles + linking map
- `/priorities` - Content prioritization matrix
- `/research-serp`, `/research-gaps`, `/research-trending`, `/research-performance`, `/research-topics` - Specialized research commands
- `/research-ai-citations [topic]` - AI citation audit: generates prompts, clusters them, audits which sources AI cites
- `/repurpose [file]` - Adapts article for LinkedIn, Medium, Reddit, Quora distribution
- `/landing-write`, `/landing-audit`, `/landing-research`, `/landing-competitor` - Landing page commands

## Architecture

### Command-Agent Model

**Commands** (`.claude/commands/`) orchestrate workflows. **Agents** (`.claude/agents/`) are specialized roles invoked by commands. After `/write`, these agents auto-run: SEO Optimizer, Meta Creator, Internal Linker, Keyword Mapper.

Key agents: `content-analyzer.md`, `seo-optimizer.md`, `meta-creator.md`, `internal-linker.md`, `keyword-mapper.md`, `editor.md`, `headline-generator.md`, `cro-analyst.md`, `performance.md`, `cluster-strategist.md`.

### Python Analysis Pipeline

Located in `data_sources/modules/`. The Content Analyzer chains:
1. `search_intent_analyzer.py` - Query intent classification
2. `keyword_analyzer.py` - Density, distribution, stuffing detection
3. `content_length_comparator.py` - Benchmarks against top 10 SERP results
4. `readability_scorer.py` - Flesch Reading Ease, grade level
5. `seo_quality_rater.py` - Comprehensive 0-100 SEO score

### Data Integrations

- `google_analytics.py` - GA4 traffic/engagement data
- `google_search_console.py` - Rankings and impressions
- `dataforseo.py` - SERP positions, keyword metrics
- `data_aggregator.py` - Combines all sources into unified analytics
- `indexnow_submitter.py` - Submit URLs to Bing + Yandex via IndexNow protocol

### Opportunity Scoring

`opportunity_scorer.py` uses 8 weighted factors: Volume (25%), Position (20%), Intent (20%), Competition (15%), Cluster (10%), CTR (5%), Freshness (5%), Trend (5%).

## Running Python Scripts

```bash
# Research & analysis scripts (run from repo root)
python3 research_quick_wins.py
python3 research_competitor_gaps.py
python3 research_performance_matrix.py
python3 research_priorities_comprehensive.py
python3 research_serp_analysis.py
python3 research_topic_clusters.py
python3 research_trending.py
python3 seo_baseline_analysis.py
python3 seo_bofu_rankings.py
python3 seo_competitor_analysis.py

# Test API connectivity
python3 test_dataforseo.py
```

## Content Pipeline

`research/` (briefs) → `drafts/` (articles) → 手动转换为 `.njk` 模板 → `wowohcool.com` 站点源码 → Cloudflare Pages 部署

Rewrites go to `rewrites/`. Audits go to `audits/`.

## Context Files

`context/` contains brand guidelines that inform all content generation:
- **`b2b-blog-quality-audit-standard.md`** — **CANONICAL quality standard for ALL blog content across DE/EN/ES/FR sites.** Covers: Information Gain vs. top-5 SERP, E-E-A-T first-hand experience requirements, H1-H4 structural rules, Schema Markup 9 FAQ rules, B2B CTA standard, 13 automated audit checks, dual-mode Information Gain scoring, and quality gate thresholds. Every `/write`, `/optimize`, `/rewrite` must apply this standard. Keyword density is dead — first-party data density and Information Gain are the new metrics.
- **`b2b-multilingual-metadata-standard.md`** — **CANONICAL B2B metadata standard for ALL 4 languages.** Complete JSON-LD schema template with placeholder docs, DE/EN/ES/FR language mapping table, FAQ 8 rules, wordCount verification script, 20-point pre-publish checklist, B2B signal word glossary. Every `/write` and `/optimize` must use this as the schema authority.
- `b2b-schema-template.json` — Standalone JSON-LD template (7 nodes), `json.load()` valid with `{PLACEHOLDER}` sentinel syntax. Use for build-script schema generation and automated validation. Derived from `b2b-multilingual-metadata-standard.md` §一.
- `brand-voice.md` - Tone, messaging pillars
- `style-guide.md` - Grammar, formatting standards
- `blog-template-standard.md` - EN/DE Blog layout template: 16-section ordering, code standards, Schema checklist, FAQ 8 rules, factory data values
- `seo-guidelines.md` - Keyword and structure rules (supplemented by b2b-blog-quality-audit-standard.md)
- `internal-links-map.md` - Key pages for internal linking
- `features.md` - Product features
- `competitor-analysis.md` - Competitive intelligence
- `cro-best-practices.md` - Conversion optimization guidelines
- `ai-citation-targets.md` - Directories/platforms where your brand should be cited by AI tools
- `reddit-strategy.md` - Reddit engagement strategy for AI SEO and community visibility

## Site Architecture

wowohcool.com 是一个 **Eleventy (11ty) 静态站点**，部署在 **Cloudflare Pages** 上：

- **站点源码**: `C:\Users\wowoh\wowohcool.com\`（独立 Git 仓库，与本项目分离）
- **模板引擎**: Nunjucks (.njk)，每篇文章一个子目录 (`src/blog/[slug]/index.njk`)
- **构建**: `npx @11ty/eleventy` → `_site/`，CSS 用 Tailwind，JS 用 esbuild
- **部署**: `git push` → Cloudflare Pages 自动构建部署
- **多语言**: `/de/` `/es/` `/fr/` `/ru/` 各自独立 blog 子目录

**seomachine 的角色**: 内容研究和草稿撰写工具。文章在 seomachine 中以 markdown 撰写 (`drafts/`)，然后手动转换为 Nunjucks 模板写入 wowohcool.com 站点源码。

### IndexNow 提交通知

站点有两套 IndexNow 机制：
1. **部署时自动提交** (`wowohcool.com/scripts/indexnow-push.js`) — 每次 `npm run deploy` 后比较 sitemap 变化，批量提交新 URL
2. **手动快速提交** (`python3 data_sources/modules/indexnow_submitter.py --urls "..."`) — 单篇文章写完即可通知搜索引擎，无需等部署

```bash
# 发新文章后立即通知 Bing + Yandex
python3 data_sources/modules/indexnow_submitter.py \
  --urls "https://www.wowohcool.com/ru/blog/new-article/"
```
