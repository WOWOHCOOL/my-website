# B2B 博客实操指南 — 从研究到发布的完整操作手册

**适用站点**: wowohcool.com (DE/EN/ES/FR)  
**适用领域**: B2B 充电设备/电源/储能外贸供应链  
**最后更新**: 2026-07-22  
**基于**: Google 2026 Helpful Content System + E-E-A-T + Information Gain 专利 + AI Overviews

---

## 一、系统概述

这套 B2B 写作系统是一个 **命令-Agent-Python 三级管线**。你用斜杠命令触发流程，命令调用 Agent（AI 角色），Agent 调用 Python 模块（自动化分析）。最终产出是经过 11 项 B2B 质量检查、符合 Google 2026 标准的博客文章。

### 核心原则

> 一篇优质 B2B 博客，表面是文章，本质是一份精心包装的**行业避坑指南**和**采购决策助手**。

### 不要做的事

- ❌ 不要用英文搜索 SERP 后翻译成其他语言
- ❌ 不要在 B2B 文章中使用 stock photo（握手、西装、通用工厂图）
- ❌ 不要写 "In today's digital world..." 这类 AI  preamble 开头
- ❌ 不要在 B2B 文章中使用 "Buy now"、"Click here"、"Start free trial" 这类 B2C CTA
- ❌ 不要碰 B2C 泛词（"What is a GaN charger"、"best power bank"）

---

## 二、命令目录（23 个命令）

### 2.1 核心写作管线（6 个 — 每次写文章必经）

| 命令 | 唤醒词 | 用途 | 什么时候用 |
|------|-------|------|-----------|
| `/research [topic]` | research, 研究, 调研, keyword research | 关键词研究 + 竞品分析 + 写作简报 | **任何新文章的第一步**。必须先跑研究再写 |
| `/research-serp [keyword]` | serp, SERP, 搜索结果 | 深度 SERP 分析（top 10 竞品内容拆解） | 目标关键词竞争激烈时；需要精确的竞品内容对标数据时 |
| `/write [topic]` | write, 写, 撰写, 写作 | 完整文章创作（2000-3000+ 词）+ 自动质量门 + 5 个 Agent 优化 | 研究完成后，正式开始写文章 |
| `/optimize [file]` | optimize, 优化, 打磨, SEO | 发布前最终 SEO 打磨（包括 B2B 审计 + 信息增益评分） | 文章写完、准备转为 .njk 模板部署前 |
| `/b2b-audit [file]` | b2b-audit, B2B审计, B2B检查 | 独立的 11 项 B2B 质量快速审计 | 快速检查某篇文章的 B2B 合规性；不需要完整 /optimize 流程时 |
| `/scrub [file]` | scrub, 清洗, AI检测 | AI 水印清洗（Unicode 水印、格式控制字符、AI 短语检测） | 每次写完文章后**立即**执行，在优化 Agent 之前 |

### 2.2 存量内容管理（2 个）

| 命令 | 唤醒词 | 用途 | 什么时候用 |
|------|-------|------|-----------|
| `/analyze-existing [URL or file]` | analyze, 分析, 审计, 诊断 | 存量文章健康审计（SEO + B2B + 信息增益） | 检查已发布文章是否需要更新；发现流量下降时诊断原因 |
| `/rewrite [topic]` | rewrite, 重写, 更新 | 基于分析结果重写/更新存量文章 | 分析报告建议重写时；文章超过 6 个月需要刷新时 |

### 2.3 策略与规划（5 个）

| 命令 | 唤醒词 | 用途 | 什么时候用 |
|------|-------|------|-----------|
| `/cluster [topic]` | cluster, 专题, 集群, pillar | 构建完整专题集群策略（pillar + 支撑文章 + 内链地图） | 开拓新内容方向时；需要系统性覆盖一个主题时 |
| `/priorities` | priorities, 优先级, 排期 | 内容优先级矩阵（基于机会评分） | 决定下一篇写什么时 |
| `/performance-review` | performance, 表现, 数据 | 基于 GA4 数据分析内容表现 | 月度/季度内容复盘时 |
| `/content-calendar` | calendar, 日历, 排期 | 内容日历生成 | 规划下月/下季度内容时 |
| `/research-topics` | topics, 选题, 话题 | 话题发现 | 没有明确写作方向时 |

### 2.4 竞品与机会研究（5 个）

| 命令 | 唤醒词 | 用途 | 什么时候用 |
|------|-------|------|-----------|
| `/research-gaps` | gaps, 差距, 缺口 | 竞品内容差距分析 | 找到竞品覆盖不全的机会点 |
| `/research-trending` | trending, 趋势, 热门 | 趋势话题发现 | 找到上升期的搜索话题 |
| `/research-performance` | 表现, 高流量 | 基于 GA4 表现数据的内容机会 | 找到已有流量但可提升的文章 |
| `/research-ai-citations [topic]` | AI引用, citation, AI可见性 | AI 引用审计：哪些来源被 AI 引用，你的品牌是否在其中 | 提升 AI 搜索可见性前 |
| `/repurpose [file]` | repurpose, 改编, 分发 | 将文章改编为 LinkedIn/Reddit/Quora 等渠道内容 | 文章发布后做内容分发 |

### 2.5 Landing Page（4 个 — 独立产品页管线）

| 命令 | 唤醒词 | 用途 |
|------|-------|------|
| `/landing-research [topic]` | landing research, 落地页研究 | Landing Page 关键词/竞品研究 |
| `/landing-write [topic]` | landing write, 落地页撰写 | Landing Page 创作 |
| `/landing-audit [URL]` | landing audit, 落地页审计 | Landing Page CRO + SEO 审计 |
| `/landing-competitor [URL]` | landing competitor, 落地页竞品 | Landing Page 竞品分析 |

---

## 三、完整写作管线（标准流程）

### 3.1 新文章标准流程

```
第 1 步: /research [topic]
  ↓ 产出: research/[topic-slug]-[date].md
  ↓ 耗时: ~5-10 分钟（AI 自动搜索+分析）
  ↓ 检查: 研究简报是否包含 B2B 关键词？是否做了本地化搜索（目标语言）？

第 2 步: (可选) /research-serp [primary-keyword]
  ↓ 产出: SERP top 10 竞品深度拆解
  ↓ 什么时候加这一步: 关键词竞争度高、需要精确字数对标数据时

第 3 步: /write [topic or research brief]
  ↓ 产出: drafts/[article-slug]-[date].md
  ↓ 自动执行:
        ├─ /scrub (AI 水印清洗)
        ├─ content_scorer.py (5 维度质量门, ≥70 分)
        ├─ b2b_content_auditor.py (11 项 B2B 检查)
        ├─ content-analyzer agent (7 模块分析)
        ├─ seo-optimizer agent
        ├─ meta-creator agent
        ├─ internal-linker agent
        └─ keyword-mapper agent
  ↓ 耗时: ~15-30 分钟
  ↓ 检查: 质量门通过了吗？B2B 审计 ≥60 分了吗？

第 4 步: /optimize [drafts/article.md]
  ↓ 产出: drafts/optimization-report-[slug]-[date].md
  ↓ 耗时: ~5-10 分钟
  ↓ 检查: SEO 综合分 ≥80？B2B 审计分 ≥70？信息增益 ≥40？

第 5 步: 手动转换
  ↓ .md → .njk 模板 → C:\Users\wowoh\wowohcool.com\src\blog\[slug]\index.njk
  ↓ git commit + push → Cloudflare Pages 自动部署

第 6 步: (可选) IndexNow 通知
  ↓ python data_sources/modules/indexnow_submitter.py --urls "https://www.wowohcool.com/blog/slug/"

第 7 步: (可选) GEO AI 可见性审计 → 详见第四章 GEO 技能完整说明
```

### 3.2 存量文章优化流程

```
第 1 步: /analyze-existing [URL or file]
  ↓ 产出: research/analysis-[slug]-[date].md
  ↓ 判断: 需要 Light Update / Moderate Refresh / Major Rewrite / Complete Overhaul?

第 2 步: (如果需要重写) /rewrite [topic]
  ↓ 产出: rewrites/[article-slug]-[date].md
  ↓ 自动执行: B2B 审计 + Agent 优化

第 3 步: 如果只是小修 → 直接 /optimize [file]
  ↓ 手动修改 + B2B 审计验证

第 4 步: 更新 .njk 模板 → 部署 → IndexNow
```

### 3.3 快速 B2B 合规检查流程

```
第 1 步: /b2b-audit [file or URL]
  ↓ 产出: audits/b2b-audit-[slug]-[date].md
  ↓ 11 项检查一次性完成, 2 秒出结果

第 2 步: python data_sources/modules/information_gain_analyzer.py [file]
  ↓ 产出: 信息增益评分 + 具体建议
```

---

## 四、GEO AI 可见性技能（并行管线）

GEO（Generative Engine Optimization）技能是一套独立于写作管线的 AI 搜索优化工具。它们回答一个问题：**"AI 搜索引擎（ChatGPT、Perplexity、Gemini、Google AI Overviews）会不会引用我的内容？"**

GEO 与 B2B 审计是互补关系：B2B 审计确保内容质量符合 Google 2026 标准，GEO 审计确保内容能被 AI 抓取和引用。

### 4.1 GEO 核心技能（8 个）

| 技能 | 唤醒词 | 用途 | 什么时候用 |
|------|-------|------|-----------|
| `geo-audit` | geo audit, GEO审计, AI审计 | 全站 GEO+SEO 综合审计（并行 5 个子 Agent 执行 5 个维度） | 新站上线前；每季度全站体检 |
| `geo-citability` | citability, 可引用性, AI引用 | 单页面 AI 引用可能性评分（0-100）+ 逐段改写建议 | 核心博客发布后；发现 AI 不引用时 |
| `geo-content` | geo content, E-E-A-T | 内容质量 E-E-A-T 四维度深度评估 | 怀疑某篇文章 E-E-A-T 不足时 |
| `geo-technical` | geo technical, 技术SEO | 技术 SEO：可爬行性、可索引性、Core Web Vitals (INP)、SSR、AI 爬虫访问白名单 | 网站改版后；发现索引问题时 |
| `geo-schema` | geo schema, Schema审计 | JSON-LD 检测/验证/生成（Organization / Person / Article / FAQ / HowTo / Breadcrumb / Speakable） | 新文章发布前；Schema 报错时 |
| `geo-platform-optimizer` | platform optimizer, 平台优化 | 5 平台就绪度：Google AI Overviews / ChatGPT / Perplexity / Gemini / Bing Copilot | 针对特定 AI 平台优化时 |
| `geo-brand-mentions` | brand mentions, 品牌提及 | 品牌在 AI 引用平台的存在度扫描 + Brand Authority Score (0-100) | 检查品牌 AI 生态可见度 |
| `geo-llmstxt` | llms.txt, llms | llms.txt 生成与验证（AI 爬虫的内容地图） | 需要控制 AI 爬虫访问策略时 |

### 4.2 GEO 辅助技能（4 个）

| 技能 | 唤醒词 | 用途 |
|------|-------|------|
| `geo-compare` | compare, delta, 月度报告 | 两次 GEO 审计对比：分数变化 + 行动项完成追踪 |
| `geo-report` | geo report, GEO报告 | 生成面向客户的 GEO 综合报告（分数 + 发现 + 行动项） |
| `geo-report-pdf` | geo report pdf, PDF报告 | 生成专业 PDF 报告（ReportLab，含评分仪表盘和图表） |
| `geo-proposal` | proposal, 提案, offer | 基于审计数据自动生成 GEO 服务提案（含套餐/定价/时间线） |

### 4.3 B2B 场景下的 GEO 使用顺序

```
第 1 步: geo-technical
  ↓ 确保 AI 爬虫能访问、robots.txt 正确、Core Web Vitals 达标
  ↓ 关键: GPTBot ✅ / OAI-SearchBot ✅ / ClaudeBot ✅ / PerplexityBot ✅

第 2 步: geo-llmstxt
  ↓ 生成 /llms.txt，告诉 AI 爬虫哪些页面重要

第 3 步: geo-schema
  ↓ 验证所有页面的 JSON-LD
  ↓ B2B 必检: BlogPosting / Person (author+sameAs+LinkedIn) /
     FAQPage (B2B procurement questions) / HowTo / BreadcrumbList / Organization

第 4 步: geo-citability (逐篇核心博客)
  ↓ AI 引用可能性评分 + 逐段改写建议
  ↓ 结合 b2b_content_auditor.py 结果调整 GEO 评分
  ↓ 桥接参考: .claude/skills/seo-audit/references/b2b-geo-bridge.md

第 5 步: geo-brand-mentions
  ↓ 扫描品牌在 AI 引用平台上的存在度
  ↓ 目标: WOWOHCOOL 作为制造商被 AI 引用

第 6 步: geo-audit (全站综合)
  ↓ 生成 GEO Score (0-100) + 优先级行动项
  ↓ 每季度一次，用 geo-compare 追踪进度
```

### 4.4 GEO 使用时机决策

```
新站上线 / 重大改版
  ├─ geo-technical → 技术基础
  ├─ geo-llmstxt → AI 爬虫策略
  └─ geo-schema → 结构化数据验证

核心博客发布后
  ├─ /optimize (B2B + SEO) → 内容质量过关
  ├─ geo-citability → AI 引用评分
  └─ geo-schema → 页面级 JSON-LD 验证

每季度全站体检
  ├─ geo-audit → 综合 GEO 评分
  ├─ geo-brand-mentions → 品牌 AI 可见度
  └─ geo-compare → 季度变化追踪

AI 平台不引用我的内容
  ├─ geo-citability → 诊断引用障碍 + 改写建议
  ├─ geo-content → 深度 E-E-A-T 诊断
  └─ 对照 /b2b-audit 结果 → 找到内容质量根因

客户报告
  ├─ geo-report → Markdown 综合报告
  └─ geo-report-pdf → 专业 PDF（含图表）
```

### 4.5 B2B 特有的 GEO 优化重点

与 B2C 站点不同，B2B 制造业站点在 GEO 各维度的优化重点完全不同：

| GEO 维度 | B2C 重点 | B2B 重点 |
|----------|---------|---------|
| **Cite Sources** | 媒体报道、学术论文 | **IEC/ISO/EN 标准号**、**认证机构报告**（TÜV/SGS/BV） |
| **Statistics** | 市场调研数据、用户量 | **工厂测量数据+单位**（58.3°C、6.4mm、$12.50/unit） |
| **Quotations** | 行业 KOL 引语 | **工程师/采购经理实名引语**（含职位+年资+工厂场景） |
| **Authoritative Tone** | 品牌故事、媒体报道 | **工厂第一手经验**（"我们的 SMT 产线实测..."） |
| **Technical Terms** | 产品功能词汇 | **PCBA ripple noise、GaN HEMT、AQL 2.5、BOM cost breakdown** |
| **Unique Words** | 品牌差异化词汇 | **OEM/ODM/MOQ/FOB/supply chain/procurement/importer** |
| **FAQ Schema** | "How to use?" "What is X?" | **"What MOQ applies?" "What FOB pricing?" "What certifications required?"** |

### 4.6 B2B → GEO 桥接速查

B2B 审计分数可直接调整 GEO citability 评分。详见 `.claude/skills/seo-audit/references/b2b-geo-bridge.md`。

| B2B 审计发现 | GEO 调整 |
|-------------|---------|
| Data Density ≥80 | Statistics **+10** |
| Data Density <40 | Statistics **-15** ⚠️ |
| Author E-E-A-T ≥80 | Authoritative Tone **+8** + Quotation **+8** |
| Author E-E-A-T <40 | Authoritative Tone **-10** |
| Stock Photos 检测到 | Authoritative Tone **-10** |
| Information Gain "high" | 总体 GEO **+15** |
| Information Gain "zero" | 总体 GEO **-25** 🔴 严重 |
| TL;DR Block 存在 | Easy-to-Understand **+5** |
| FAQ B2B 语言 ≥70% | FAQPage Schema **+8** |
| FAQ 消费者语言 | FAQPage Schema **-5** |
| H2 B2B 密度在目标范围 | Unique Words **+5** |

### 4.7 GEO vs B2B 审计分工

| 你想知道... | 用哪个 | 为什么 |
|-----------|-------|--------|
| 这篇文章对 B2B 买家有说服力吗？ | `/b2b-audit` | 检查采购语言、数据密度、CTA 类型 |
| AI 会不会引用这篇文章？ | `geo-citability` | 检查 AI 提取友好度、引用模式、自包含性 |
| Schema 标记完整吗？ | `geo-schema` | 专注 JSON-LD，B2B 审计不覆盖 |
| AI 爬虫能访问我的网站吗？ | `geo-technical` | 检查 robots.txt、爬虫白名单、Core Web Vitals |
| 文章在 SERP 中有信息增益吗？ | `information_gain_analyzer.py` | B2B 模块独有能力，GEO 无此检查 |
| 工厂数据够不够多？ | `/b2b-audit` | Data Density 比 GEO Statistics 更细粒度 |
| 品牌在 AI 生态中的整体存在感？ | `geo-brand-mentions` | 跨平台品牌扫描，B2B 审计不覆盖 |

---

## 五、技能使用条件与决策树

### 5.1 "我现在应该用哪个命令？"

```
我有一个新话题想写
  ├─ 没做过研究 → /research [topic]
  ├─ 有研究简报了 → /write [topic]
  └─ 不确定值不值得写 → /research-gaps 或 /research-trending

我有一篇已发布文章
  ├─ 不知道表现如何 → /analyze-existing [URL]
  ├─ 表现下降了 → /analyze-existing [URL] → /rewrite [topic]
  └─ 需要快速 B2B 检查 → /b2b-audit [URL]

我有一篇刚写完的草稿
  ├─ 刚写完还没清洗 → /scrub [file]
  ├─ 想知道 B2B 合规度 → /b2b-audit [file]
  ├─ 准备发布了 → /optimize [file]
  └─ 优化分不够 → 按优化报告的 critical issues 逐条修复 → 再跑 /optimize

我不知道下一篇写什么
  ├─ 有 GA4 数据 → /performance-review
  ├─ 有明确方向但缺话题 → /research-topics
  ├─ 有话题但缺优先级 → /priorities
  └─ 想系统性覆盖某主题 → /cluster [topic]

我想提升 AI 搜索可见性
  ├─ 全站审计 → geo-audit
  ├─ 单篇文章 → geo-citability
  ├─ Schema 检查 → geo-schema
  └─ llms.txt 生成 → geo-llmstxt
```

### 5.2 质量门触发条件

| 质量门 | 触发时机 | 通过条件 | 不通过后果 |
|--------|---------|---------|-----------|
| `content_scorer.py` | `/write` 自动 | ≥70 分 | 自动修改 → 重新评分（最多 2 次） → 仍不通过则移到 `review-required/` |
| `b2b_content_auditor.py` | `/write` Step 2.5 + `/optimize` + `/rewrite` | ≥60 分 | 修复 flagged issues → 重新审计 |
| `seo_quality_rater.py` | `/optimize` | ≥80 分 + 无 critical issues | 90+: 立即发布 / 80-89: 小修后发布 / 70-79: 修复优先问题 / <70: 大修 |
| `information_gain_analyzer.py` | `/optimize` + `/analyze-existing` | Mode B ≥40 / Mode A ≥50 | <20 = 零信息增益 → 禁止发布，需加入独家数据 |

---

## 六、Python 模块参考（直接 CLI 调用）

除了通过命令触发，你也可以直接运行 Python 模块进行单项检查：

### 6.1 B2B 审计模块

```bash
# 11 项 B2B 质量检查（最常用的单项检查）
python data_sources/modules/b2b_content_auditor.py [file] [article_type]
# article_type: technical | procurement | oem_core (可选, 自动检测)
# 示例:
python data_sources/modules/b2b_content_auditor.py drafts/my-article.md oem_core

# 信息增益分析（Mode B — 不需要 SERP 数据）
python data_sources/modules/information_gain_analyzer.py [file]

# 信息增益分析（Mode A — 有竞品文件时）
python data_sources/modules/information_gain_analyzer.py [file] competitor1.md competitor2.md
```

### 6.2 SEO 分析模块

```bash
# 内容质量评分（5 维度：AI痕迹/具体性/结构/SEO/可读性）
python data_sources/modules/content_scorer.py [file]

# SEO 综合评分（8 维度，含 B2B+IG 时）
# 通常作为 Python import 使用，由 content-analyzer agent 调用
```

### 6.3 意图分析

```bash
# 搜索意图 + B2B/B2C 分类（通常作为 Python import 使用）
python -c "
from data_sources.modules.search_intent_analyzer import analyze_intent
r = analyze_intent('your keyword here')
print(r['primary_intent'], r['b2b_vs_b2c']['classification'])
"
```

### 6.4 IndexNow 提交

```bash
# 部署后立即通知 Bing + Yandex
python data_sources/modules/indexnow_submitter.py --urls "https://www.wowohcool.com/blog/slug/"
```

---

## 七、上下文文件参考（@context 引用）

所有命令通过 `@context/` 路径引用以下文件，修改这些文件会影响全局写作行为：

| 文件 | 控制内容 | 影响范围 |
|------|---------|---------|
| `b2b-blog-quality-standards-2026.md` | **核心质量标准** — H1/H2/H3 规则、B2B 信号词密度分层、Information Gain、5 道 Gate、F-pattern 扫读、TL;DR 要求、低摩擦 CTA | 所有命令、所有语言 |
| `brand-voice.md` | 品牌语调、消息支柱 | `/write` `/rewrite` |
| `style-guide.md` | 语法、格式规范 | `/write` `/rewrite` |
| `seo-guidelines.md` | 关键词与结构规则 | `/write` `/rewrite` `/optimize` |
| `internal-links-map.md` | 关键内链页面 | `/write` `/rewrite` `/optimize` |
| `features.md` | 产品功能描述 | `/write` `/landing-write` |
| `competitor-analysis.md` | 竞品情报 | `/research` |
| `cro-best-practices.md` | 转化优化指南 | `/landing-audit` `/landing-write` |
| `ai-citation-targets.md` | AI 引用目标目录/平台 | `/research-ai-citations` |
| `factory-data-panel.md` | 工厂真实数据面板 | `/write`（Information Gain 数据源） |

---

## 八、常见工作流速查表

### 8.1 紧急修复一篇已发布文章
```
/analyze-existing [URL] → 看报告 → 直接改 .njk → git push
（如果改动大） → /rewrite [topic] → /optimize [rewrite-file]
```

### 8.2 批量审计多篇文章
```bash
# 对 wowohcool.com 的某语言全部文章跑 B2B 审计
for dir in C:\Users\wowoh\wowohcool.com\src\blog\*/; do
  python data_sources/modules/b2b_content_auditor.py "${dir}index.njk"
done
```

### 8.3 竞品对标（写之前确认差异化空间）
```
/research-serp [keyword] → 获取 SERP top 10 内容
→ 将竞品内容保存为 .md 文件
→ python data_sources/modules/information_gain_analyzer.py my-draft.md comp1.md comp2.md ... comp5.md
→ 查看 Mode A 的 Jaccard 相似度 → 确保 < 0.5
```

### 8.4 新建多语言文章（DE/ES/FR）
```
/research [topic]  ← 目标语言搜索（如西班牙语关键词）
/write [topic]     ← 本地化写作（不是翻译！）
注意: 每语言独立研究 SERP，不翻译英文结果
```

### 8.5 月度内容质量巡检
```
1. /performance-review → 找到流量下降的文章
2. 对每篇: /analyze-existing [URL]
3. 按优先级: /rewrite 或直接小修
4. /b2b-audit 验证修改后的 B2B 合规性
```

---

## 九、作者自查清单（每次写完文章后）

这是发布前最后一道人工检查——自动化工具过完之后，用这 8 个问题再过一遍：

```
[ ] H1 是否包含 ≥1 个 B2B 信号词 + 50-65 字符 + 受众/指标/回报三要素？
[ ] 开头是否直接给了核心结论（不是问句、不是行业背景铺垫）？
[ ] TL;DR / Key Takeaways 块是否在 H1 之后、第一个 H2 之前？
[ ] 所有 H2 标题扫描一遍——3 秒内能理解文章完整价值吗？
[ ] 至少 2 个 H2 包含 B2B 信号词？没有连续 3 个 H2 用同一个 B2B 词？
[ ] 图片是真实产品/工厂/实验室照片吗？alt text 含 B2B 关键词？
[ ] CTA 是低摩擦价值延续吗（下载报告/获取清单/预约咨询）？没有 "Buy now"？
[ ] FAQ 问题用 B2B 采购语言（MOQ/FOB/认证/交期）而不是 "Which one is best?"？
```

---

## 十、评分标准速查

### 10.1 B2B 审计综合分

| 分数 | 含义 | 行动 |
|------|------|------|
| 90-100 | B2B 合规优秀 | 可以直接发布 |
| 75-89 | 良好，有小问题 | 修复 flagged items 后发布 |
| 60-74 | 一般，有明显问题 | 必须修复 warnings 后重新审计 |
| 40-59 | 差，多个维度不达标 | 需要显著修改 |
| <40 | 严重不达标 | 不能发布，需要大修或重写 |

### 10.2 信息增益分

| 分数 | 级别 | 含义 |
|------|------|------|
| 70-100 | High | 内容有显著差异化，Google 会奖励 |
| 40-69 | Moderate | 有一定独特性，但可进一步加强 |
| 20-39 | Low | 与 SERP 内容重叠度高，需要加入独家数据 |
| 0-19 | Zero | 与其他页面几乎没有区别，Google 会压制 |

### 10.4 B2B → GEO 桥接

B2B 审计结果可以反馈给 GEO citability 评分。映射逻辑详见 `.claude/skills/seo-audit/references/b2b-geo-bridge.md`。

**快速参考**：
| B2B 审计发现 | GEO 影响 |
|-------------|---------|
| Data Density ≥80 | Statistics Addition +10 |
| Author E-E-A-T <40 | Authoritative Tone -10 |
| Stock Photos 检测到 | Authoritative Tone -10 |
| Information Gain = "zero" | 总体 GEO -25 |
| Information Gain = "high" | 总体 GEO +15 |
| TL;DR Block 存在 | Easy-to-Understand +5 |
| FAQ 用 B2B 采购语言 | FAQPage Schema +8 |

### 10.3 H2 B2B 密度分层

| 文章类型 | 目标范围 | 典型文章 |
|---------|---------|---------|
| Technical/Educational | 10-40% | mAh 指南、GaN 原理、USB PD 规格、无线充电原理、安全标准 |
| Procurement/Supply Chain | 30-55% | 物流/运输、如何选择工厂、酒店/企业采购、QC 指南、采购指南 |
| OEM/ODM Core Topic | 50-80% | OEM vs ODM 对比、制造商目录、OEM 生产流程、私有标签指南 |

---

## 十一、注意事项与常见陷阱

### 11.1 多语言陷阱
- **ES 文章**：必须搜索西班牙语关键词，分析西语 SERP 竞品，引用 BOE/AEAT 西班牙法规
- **DE 文章**：必须搜索德语关键词，引用 Stiftung Warentest、DIN 标准、德国市场数据
- **FR 文章**：必须搜索法语关键词，引用法国/EU 法规
- **禁止**：用英文搜索 SERP 后翻译成目标语言——这会导致信息增益为零

### 11.2 .njk vs .md 注意事项
- `b2b_content_auditor.py` 可以处理 .njk 文件，但模板语法中的 H2/H3 提取可能不准确
- 最佳实践：在 Markdown 草稿阶段（`drafts/`）跑审计，而不是在 .njk 模板阶段
- .njk 文件中的 Nunjucks 变量（`{{ title }}`、`{% if %}`）会影响字数统计

### 11.3 Token 预算意识
- `/write` + 5 个 Agent 是 token 消耗最大的操作（~30K-50K tokens）
- 如果只是小修改，直接用 `/optimize` 而不是重跑 `/write`
- `/b2b-audit` 是轻量操作（只跑 Python 模块，不消耗 LLM token）

### 11.4 不要过度优化
- H2 B2B 密度不是越高越好——Technical 文章超过 40% = 过度优化
- Information Gain Mode B 分不是越高越好——90+ 分可能意味着用了太多生僻术语
- 不要为了数据密度而在每段插入强行数字——数字必须有上下文意义

---

## 十二、系统文件地图

```
seomachine/
├── .claude/
│   ├── commands/          ← 23 个斜杠命令（你触发的入口）
│   │   ├── b2b-audit.md       ← 新增：独立 B2B 快速审计
│   │   ├── write.md           ← 修改：Introduction + CTA + Quality Loop
│   │   ├── optimize.md        ← 修改：加入 B2B audit + IG + Author E-E-A-T
│   │   ├── analyze-existing.md← 修改：加入 B2B + IG 模块引用
│   │   ├── rewrite.md         ← 修改：加入 B2B 标准引用
│   │   └── research.md        ← 修改：加入 B2B/B2C 意图分类
│   └── agents/            ← 11 个 Agent 角色定义
│       ├── content-analyzer.md ← 修改：注册 7 个模块（原 5 个 + B2B + IG）
│       └── seo-optimizer.md   ← 修改：加入 B2B Intent Verification
├── data_sources/modules/  ← Python 分析管线
│   ├── b2b_content_auditor.py       ← 新增：11 项 B2B 自动化检查
│   ├── information_gain_analyzer.py ← 新增：信息增益双模式分析
│   ├── search_intent_analyzer.py    ← 修改：加入 B2B/B2C 维度
│   ├── seo_quality_rater.py         ← 修改：整合 B2B + IG 评分为 8 维度
│   ├── content_scorer.py            ← 原有：5 维度质量门（未修改）
│   ├── readability_scorer.py        ← 原有：Flesch 可读性
│   ├── keyword_analyzer.py          ← 原有：关键词密度与聚类
│   ├── content_length_comparator.py ← 原有：字数对标 SERP
│   └── multilingual_b2b_patterns.py ← 原有：6 语言 B2B 模式库（被新模块复用）
├── context/                ← 全局上下文文件
│   └── b2b-blog-quality-standards-2026.md ← 修改：5 项增强（CTR公式/TL;DR/F-pattern/痛点优先/低摩擦CTA）
└── tests/
    └── test_b2b_compat.py  ← 新增：向后兼容验证（6 项测试）
```

---

## 十三、B2B 审计体系完整参考

### 13.1 审计要素总览

B2B 审计体系由 **6 个 Python 模块**组成，覆盖 **16 个检查维度**，在写作管线的 **3 个质量门**触发。

```
                     ┌──────────────────────────┐
                     │   b2b_content_auditor.py  │  13 项 B2B 内容质量检查
                     ├──────────────────────────┤
                     │ information_gain_analyzer │  1 项 内容独特性检查（双模式）
                     ├──────────────────────────┤
  6 个 Python 模块   │ search_intent_analyzer   │  2 项 意图检查（意图分类 + B2B/B2C）
                     ├──────────────────────────┤
                     │ seo_quality_rater        │  8 维度 综合评分（整合上述所有分）
                     ├──────────────────────────┤
                     │ njk_preprocessor         │  7 步 .njk → Markdown 格式归一化
                     ├──────────────────────────┤
                     │ content_scorer           │  5 维度 AI 痕迹/基础质量检测
                     └──────────────────────────┘
```

### 13.2 `b2b_content_auditor.py` — 13 项 B2B 内容质量检查

| # | 检查项 | 测什么 | 评分逻辑 |
|---|--------|--------|---------|
| 1 | **Opening Density** | 开头 2-3 句是否直接给核心结论（不是行业背景铺垫） | 废话模式 -30/条，无结论信号 -40 |
| 2 | **TL;DR Block** | 是否有 Key Takeaways 结构化摘要块 | 有标签=100，仅列表=60，无=0 |
| 3 | **H3 Answer Length** | 每个 H3/H4 后的答案是否在 60-300 字符 | 合规 H3 占比=分数 |
| 4 | **Vague Headings** | 标题是标签式（"Testing"）还是结论式（"3 Tests to Verify"） | 每检测到 1 个 -15 |
| 5 | **H2 B2B Density** | H2 中 15 个 B2B 信号词密度是否在分层范围内 | Technical 10-40% / Procurement 30-55% / OEM Core 50-80% |
| 6 | **Data Density** | 精确数值+工程单位（°C mV kHz Wh/kg mm €）每千词数量 | ≥5/千词=100，线性下降 |
| 7 | **Table Test** | 技术参数是否用表格呈现 | 有表格=100，参数在表格外=40 |
| 8 | **Stock Photo** | 图片 URL 是否来自 stock 平台（Unsplash/Shutterstock 等） | 每张 -25 |
| 9 | **FAQ Language** | FAQ 是否遵守 8 条规则（见下方 FAQ 八规则） | B2B 问题占比=分数 + 8 规则手动审查 |

> **FAQ 八规则**（详见 `b2b-blog-quality-standards-2026.md` Section III.4）：
> 1. **Body-Schema 一致**：正文 FAQ = JSON-LD FAQPage 逐字相同
> 2. **真实市场数据**：问题来自 B2B 买家真实搜索，非捏造
> 3. **内容锚定**：每个答案可追溯到文章正文的具体段落
> 4. **GEO 优化**：自包含 Q&A，AI 可直接提取引用
> 5. **决策链排序**：产品匹配→规格→认证→定价→对比→下单流程
> 6. **量化答案**：每条答案含 ≥1 个具体数字
> 7. **末题 = CTA 桥梁**：最后一题自然过渡到买家行动
> 8. **交叉一致性**：FAQ 数据与 TL;DR、正文三方一致，无矛盾 |
| 10 | **Author E-E-A-T** | 署名/资历/LinkedIn/作者页/专长匹配（5 项各 20 分） | 从 YAML frontmatter + JSON-LD 提取 |
| 11 | **Weak CTA** | 是否是低摩擦 B2B CTA（下载报告/获取清单/咨询） | 无=20，弱=40-60，好=100 |
| 12 | **Heading Hierarchy** | H1→H3 是否跳级（如 H2→H4 没有 H3） | 每跳 1 级 -25 |
| 13 | **URL Quality** | slug 是否全小写/连字符/无日期/无停用词 | 逐项扣分 |

**H2 B2B 密度分层参考**：

| 文章类型 | 目标范围 | 典型文章 |
|---------|---------|---------|
| Technical/Educational | 10–40% | mAh 指南、GaN 原理、USB PD 规格、安全标准 |
| Procurement/Supply Chain | 30–55% | 物流、工厂选择、采购指南、QC 指南 |
| OEM/ODM Core Topic | 50–80% | OEM vs ODM、制造商目录、私有标签指南 |

**B2B 信号词全集**（15 个）：OEM, ODM, manufacturer, factory, supplier, importer, sourcing, MOQ, FOB, B2B, procurement, wholesale, bulk, supply chain, vendor

### 13.3 `information_gain_analyzer.py` — 信息增益分析

| 模式 | 条件 | 方法 | 权重 |
|------|------|------|------|
| **Mode A** | 有 SERP top 5 内容 | Jaccard 词汇相似度 + 独有实体比 + 独有数据点比 | 词汇 70% + 实体 20% + 数据 10% |
| **Mode B** | 无 SERP 数据 | 启发式估算 | 技术锚点 40% + 数据密度 30% + 命名实体 20% + B2B 多样性 10% |

**分数解读**：70+ = High（显著差异化），40-69 = Moderate，20-39 = Low，<20 = Zero（Google 会压制）

### 13.4 `search_intent_analyzer.py` — 意图 + 受众分类

| 检查 | 分类 |
|------|------|
| **Search Intent** | informational / navigational / transactional / commercial_investigation |
| **B2B vs B2C** | b2b（OEM/manufacturer/MOQ 等 22 个信号词）/ b2c（best/review/cheap 等 19 个）/ mixed / neutral |

### 13.5 `seo_quality_rater.py` — 8 维度综合评分

| 维度 | 权重 | 测什么 |
|------|------|--------|
| Content | 15% | 字数 ≥2000，段落 2-4 句 |
| Keywords | 20% | 关键词在 H1/开头/H2/结尾分布，密度 1-2% |
| Meta | 10% | Title 50-60 字符，Description 150-160 字符 |
| Structure | 12% | H1 唯一，H2 ≥4，层级完整 |
| Links | 10% | 内链 ≥3，外链 ≥2 |
| Readability | 8% | Flesch 60-70，句长 <25 词 |
| B2B Quality | 15% | 来自 `b2b_content_auditor.py` 综合分 |
| Information Gain | 10% | 来自 `information_gain_analyzer.py` 综合分 |

### 13.6 `njk_preprocessor.py` — 7 步格式归一化

| 步骤 | 功能 | 为什么需要 |
|------|------|-----------|
| 1 | Nunjucks 标签剥离 | `{% %}`, `{{ }}`, `{# #}` 是模板语法，非内容 |
| 2 | JSON-LD 提取 | 从 `<script type="ld+json">` 提取作者/标题/描述/日期/canonical |
| 3 | HTML → Markdown 标题 | `<h1>` → `#`（审计器只认 Markdown 格式） |
| 4 | HTML → Markdown 链接 | `<a href>` → `[text](url)` |
| 5 | HTML → Markdown 图片 | `<img>` → `![alt](src)` |
| 6 | HTML → Markdown 表格 | `<table>` → `\|...\|` pipe table |
| 7 | 残留 HTML 清理 | 移除 `<div>`, `<span>`, `<section>` 等 |

**已知限制**：Nunjucks 模板 include 的 CTA（如 `{% set ctaHeading1 = "Ready to Source" %}`）在步骤 1 被剥离后无法恢复。此类文章的 CTA 检查以渲染页面为准。

### 13.7 质量门触发点

| 阶段 | 触发 | 模块 | 门槛 | 不通过后果 |
|------|------|------|------|-----------|
| `/write` Step 2 | 自动 | `content_scorer.py` | ≥70 | 自动修改→重评（最多 2 次）→仍不过移到 `review-required/` |
| `/write` Step 2.5 | 自动 | `b2b_content_auditor.py` | ≥60 | 修复 flagged issues → 重新审计 |
| `/optimize` | 手动 | `seo_quality_rater.py` | ≥80 + 无 critical | 90+: 立即发布 / 80-89: 小修 / 70-79: 优先级修复 / <70: 大修 |
| `/b2b-audit` | 手动 | `b2b_content_auditor.py` | ≥75 建议发布 | 逐项查看 violations 和 recommendations |
| `/analyze-existing` | 手动 | 全部模块 | 综合健康度 ≥70 | C 级以上可小幅优化，D 级以下建议重写 |

### 13.8 评分标准速查

**B2B 审计综合分**：

| 分数 | 等级 | 含义 |
|------|------|------|
| 90-100 | A | B2B 合规优秀，可直接发布 |
| 75-89 | B | 良好，有小问题 |
| 60-74 | C | 一般，有明显问题需修复 |
| 40-59 | D | 差，多维度不达标 |
| <40 | F | 严重不达标，不可发布 |

**信息增益分**：

| 分数 | 级别 | 含义 |
|------|------|------|
| 70-100 | High | 内容显著差异化 |
| 40-69 | Moderate | 有一定独特性 |
| 20-39 | Low | 与 SERP 重叠度高 |
| 0-19 | Zero | 零信息增益，Google 会压制 |

**EN 博客优化后实测分布**（2026-07-22）：

| 指标 | 优化前 | 优化后 |
|------|--------|--------|
| B2B 均分 | 68.5 | **89.6** |
| A 级 | 0 篇 | **14 篇** |
| B 级 | 3 篇 | **14 篇** |
| C 级 | 23 篇 | **0 篇** |
| D 级 | 2 篇 | **0 篇** |
| TL;DR 覆盖率 | 1/28 | **28/28** |
