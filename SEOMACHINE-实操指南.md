# SEOmachine × wowohcool.com 实操落地指南（SEO + GEO 融合版）

> 适用场景：B2B 多语言工厂/OEM 站点，Eleventy 静态站 → Cloudflare Pages 部署
> 核心目标：Google 排名 + AI 搜索引擎引用（ChatGPT/Perplexity/Gemini/Copilot）+ 采购经理转化

---

## 一、快速决策：什么时候用什么命令

### 场景 → 命令速查表

#### 内容生产（SEO + GEO）

| 你要做什么 | 用什么命令 | 耗时 | 产出物 |
|-----------|-----------|------|--------|
| 研究一个新主题，看值不值得写 | `/research [topic]` | 5-10 min | `research/` 下的研究简报 |
| 从零写一篇完整文章 | `/write [topic]` | 20-40 min | `drafts/` 下的文章 + 5 个 Agent 自动运行 |
| 快速出一篇轻量文章（含社交研究 + 段落规划） | `/article [topic]` | 15-25 min | `drafts/` 文章 + 3 份规划报告 |
| 优化一篇已有文章的 SEO | `/optimize [file]` | 5-10 min | SEO 评分 + 优化报告 |
| 审查现有内容质量 | `/analyze-existing [URL]` | 5-10 min | 内容健康评分 0-100 |
| 找到该优先写什么 | `/priorities` | 5-10 min | 内容优先级矩阵 |
| 构建主题集群策略 | `/cluster [topic]` | 15-20 min | 支柱页 + 8-12 篇配套文章 + 链接地图 |
| 去除 AI 痕迹（单独使用场景→见 §1.3） | `/scrub [file]` | 5-10 min | 人性化编辑后的文章 |
| 一篇文章分发到多平台 | `/repurpose [file]` | 5-10 min | LinkedIn/Medium/Reddit/Quora 版本 |
| 更新一篇旧文章 | `/rewrite [topic]` | 15-25 min | `rewrites/` 下的更新版本 |

#### 落地页（CRO）

| 你要做什么 | 用什么命令 | 耗时 | 产出物 |
|-----------|-----------|------|--------|
| 写转化型落地页 | `/landing-write [topic]` | 20-30 min | 转化优化的落地页 |
| 审查落地页转化 | `/landing-audit [file]` | 5-10 min | CRO 审计报告 |
| 研究竞争对手落地页 | `/landing-research [topic]` | 10-15 min | 竞品 LP 研究报告 |
| 深度分析一个竞品页面 | `/landing-competitor [URL]` | 10-15 min | 竞品 LP 深度分析 |

#### 数据分析

| 你要做什么 | 用什么命令 | 耗时 | 产出物 |
|-----------|-----------|------|--------|
| 分析数据表现决定下一步 | `/performance-review` | 5-10 min | 数据驱动的优化建议 + 优先级队列 |

#### GEO 专项（AI 搜索引擎可见性）

| 你要做什么 | 用什么技能 | 耗时 | 产出物 |
|-----------|-----------|------|--------|
| 检查一篇文章 AI 会不会引用 | `geo-citability` | 3-5 min | AI 引用可能性评分 0-100 + 改写建议 |
| 验证 AI 爬虫是否能访问你的站 | `geo-crawlers` | 2-3 min | 爬虫访问权限矩阵 + 修复建议 |
| 检查/生成 llms.txt | `geo-llmstxt` | 3-5 min | llms.txt 合规报告 + 自动生成 |
| 扫描品牌在 AI 来源中的存在 | `geo-brand-mentions` | 5-8 min | 品牌权威评分 0-100 + 平台建议 |
| 全站 GEO+SEO 综合审计 | `geo-audit` | 10-15 min | GEO 综合评分 + 分项修复清单 |
| 技术 SEO + GEO 专项检查 | `geo-technical` | 5-8 min | 爬虫/安全/性能/SSR 报告 |
| E-E-A-T 内容质量评估 | `geo-content` | 5-8 min | 经验/专业/权威/信任四维评分 |
| Schema 审计 + AI 可发现性 | `geo-schema` | 3-5 min | JSON-LD 检测 + 缺失 Schema 生成 |
| 针对特定 AI 平台优化 | `geo-platform-optimizer` | 5-8 min | Google AI Overviews / ChatGPT / Perplexity / Gemini / Copilot 专项建议 |
| 生成 GEO 客户报告 | `geo-report` | 3-5 min | 评分、图表、行动计划的综合报告 |
| 月度 GEO 变化追踪 | `geo-compare` | 3-5 min | 基线 vs 当前对比 + 进度报告 |
| AI 引用审计 | `/research-ai-citations [topic]` | 10-15 min | AI 引用来源分析 + 差距报告 |

---

### 命令/技能自动触发关系

> **核心规则**：`/write` 和 `/optimize` 是两个自动触发入口，各自会并行启动 5 个 Agent。`geo-audit` 是 GEO 侧的总开关，一键调度 9 个子技能。

#### `/write [topic]` → 自动触发 5 个 Agent（并行）

| Agent | 做什么 | 产出 |
|-------|--------|------|
| **Content Analyzer** | 搜索意图 + 关键词密度/聚类 + 内容长度 vs SERP + 可读性 + SEO 综合评分 + B2B 审计 + 信息增益 | 0-100 分 + 分类得分 + 具体修改建议 |
| **SEO Optimizer** | 页面 SEO 分析 + 精选摘要机会识别 | SEO 评分 + Featured Snippet 建议 |
| **Meta Creator** | 生成多组标题和描述变体 | 5 组 title 选项 + description 变体 |
| **Internal Linker** | 分析内部链接策略 | 3-5 个锚文本 + 目标页面建议 |
| **Keyword Mapper** | 关键词分布检查 + 蚕食风险 | 密度热力图 + 同类文章冲突预警 |

#### `/optimize [file]` → 自动触发 5 个 Agent（并行）

| Agent | 做什么 | 产出 |
|-------|--------|------|
| **content-analyzer** | 搜索意图 + 关键词密度/聚类 + 内容长度 vs SERP + 可读性 + SEO 综合评分 | 0-100 分 + 分类得分 + 具体修改建议 |
| **seo-optimizer** | 技术 SEO 最终检查 | Schema 完整性 + 元数据 + 结构验证 |
| **meta-creator** | 最后一轮 meta 优化 | 3-5 组优化后的 title/description |
| **internal-linker** | 内部链接最终建议 | 新增/替换链接的具体位置和锚文本 |
| **keyword-mapper** | 最终关键词分布分析 | 修改后的密度 + 分布 + 蚕食检查 |

#### `geo-audit` → 自动触发 9 个子技能（并行调度）

| 子技能 | 负责维度 | 产出 |
|-------|---------|------|
| `geo-citability` | AI 引用可能性评分 | Citability 0-100 + 逐段改写建议 |
| `geo-crawlers` | AI 爬虫访问权限 | robots.txt / meta / HTTP 头权限矩阵 |
| `geo-llmstxt` | llms.txt 合规 | 验证报告 + 自动生成建议 |
| `geo-brand-mentions` | 品牌在 AI 来源中的存在 | 品牌权威评分 0-100 + 平台覆盖清单 |
| `geo-technical` | 技术 SEO + GEO 基础设施 | 爬虫/索引/安全/Core Web Vitals/SSR |
| `geo-content` | E-E-A-T 内容质量 | 经验/专业/权威/信任四维评分 |
| `geo-schema` | Schema 结构化数据 | JSON-LD 检测 + 缺失 Schema 生成 |
| `geo-platform-analysis` | 5 大 AI 平台适配 | Google AIO / ChatGPT / Perplexity / Gemini / Copilot 逐平台分析 |
| `geo-report` | 整合所有审计结果 | 评分 + 图表 + 优先级行动清单 |

#### `geo-ai-visibility` Agent → 自动委派 4 个技能

调用 `geo-ai-visibility` Agent 时，它自动并行委派：
`geo-citability` + `geo-crawlers` + `geo-llmstxt` + `geo-brand-mentions`

---

### `/scrub` 单独使用场景

`/scrub` 在新文章完整流程中扮演**双重角色**：

1. **自动触发**：`/write` 和 `/rewrite` 在保存文章后自动运行 `/scrub`（去除 AI 隐形水印和 em-dash 等标记）
2. **手动精修**：完整流程（`/research → /write → /optimize → /scrub`）中第 4 步的手动 `/scrub` 是对 `/optimize` 阶段 Agent 可能引入的 AI 痕迹做**最终清理**，同时检查全文语气一致性

以下场景需要**单独使用** `/scrub`：

| 场景 | 说明 | 示例 |
|------|------|------|
| 🔧 优化已有文章时怀疑有 AI 痕迹 | 直接改 Nunjucks 文章但没有走 `/write` 流程，改完后跑一次去 AI 味 | 改了 3 段工厂数据后，跑 `/scrub` 确保整篇语气一致 |
| 🔄 非 `/write` 生成的内容 | 手动写的、外部翻译的、其他 AI 工具生成的内容 | 翻译公司提交的 DE 文章，导入前跑 `/scrub` |
| ✂️ 局部替换后检查 | 只替换了几个段落，不想重跑整个 `/optimize` | 替换了案例研究段落，单独跑 `/scrub` 检查衔接 |
| 📥 外部供稿 | 写手/外包团队提交的内容 | 行业专家供稿，跑 `/scrub` 确保没有 GPT 句式 |
| 🌐 多语言文章独立检查 | DE/ES/FR/RU 文章不走完整 `/write` 流程时 | 手动本土化的 ES 文章，发布前跑 `/scrub` 确保本土化语言自然 |

> ⚠️ **注意**：`/rewrite` 在保存文章后**已自动触发** `/scrub`（与 `/write` 相同），所以重写流程标准步骤中不再列出单独的手动 `/scrub`。优化已有文章流程（`/analyze-existing → /optimize → geo-citability`）**不自动触发** `/scrub`，因为 `/optimize` 主要做 SEO 分析而非内容重写。如果执行这两个流程后发现文章仍然有机翻感，再单独跑 `/scrub`。

---

## 二、核心工作流：从 0 到发布一篇新文章（SEO+GEO 完整版）

### ⚠️ 执行顺序铁律

**所有会改动内容的步骤必须在 `/optimize`（最终 SEO 验证）之前完成。** `/optimize` 之后只做 `/scrub`（去 AI 痕迹）和发布。

```
内容改动步骤（顺序可调，但必须在 /optimize 之前）
  ├── /write-b2b          ← 创作主体
  ├── /b2b-audit + 修复   ← B2B 质量验证
  └── /geo-citability + 修复 ← GEO 引用优化
         ↓
      【所有内容改动在此截止】
         ↓
  /optimize               ← 最终 SEO 验证（覆盖全部累积改动）
         ↓
  /scrub                   ← 去 AI 痕迹
         ↓
  发布
```

**为什么 `/optimize` 必须最后**：如果 `/optimize` 之后又用 `/geo-citability` 改内容（如我们 2026-08-07 的实操），改完直接发布就跳过了 SEO 验证。虽然本次 3 处 GEO 改动都是增强型（additive）、实际未损害 SEO，但这是侥幸——流程上存在验证盲区。

### 完整流程（推荐，40-80 min 完成）

```
第1步: /research [topic]              → 研究简报
第2步: /write-b2b [topic]             → 完整 .njk 文章（13-panel + Schema 7-node）
第3步: /b2b-audit [file]              → B2B 专项审计（15 项检查），< 90 分必须修复
第4步: /geo-citability [file]          → AI 引用可能性评分，< 70 必须修复弱块
第5步: /b2b-audit [file] (重跑)       → 确认 GEO 修复未损害 B2B 指标
第6步: /optimize [file]               → 🔒 最终 SEO 验证（覆盖全部累积改动）
第7步: /scrub [file]                  → 去 AI 痕迹（/optimize 之后唯一允许的改动）
第8步: 部署                           → git add + commit + push → Cloudflare Pages
```

### 流程图解

```
┌─────────────┐    ┌──────────────┐    ┌──────────────┐    ┌───────────────┐
│ /research   │ →  │ /write-b2b   │ →  │ /b2b-audit   │ →  │ geo-          │
│ SERP分析    │    │ 13-panel     │    │ 15项检查     │    │ citability    │
│ 竞品差距    │    │ Schema 7节点  │    │ <90 修复     │    │ <70 修复      │
└─────────────┘    └──────────────┘    └──────────────┘    └───────────────┘
                                                                  │
                                              ┌───────────────────┘
                                              ▼
┌─────────────┐    ┌──────────────┐    ┌──────────────┐    ┌───────────────┐
│ 发布        │ ←  │  /scrub      │ ←  │  /optimize   │ ←  │ /b2b-audit    │
│ git push   │    │  去AI痕迹    │    │  🔒最终验证  │    │ (确认无损害)  │
│ CF部署      │    │  最终清理    │    │  SEO≥80     │    │               │
└─────────────┘    └──────────────┘    └──────────────┘    └───────────────┘
                  ↑ 所有内容改动在 /optimize 之前截止 ↑
```

### 第 1 步：`/research [topic]` — 调研先行

**为什么不能跳过**：B2B 买家搜索行为因语言/市场差异巨大。德国采购经理搜的关键词和美国进口商完全不同。

**执行要点**：
- 用**目标语言**搜索 SERP（不要搜英文再翻译！）
- 分析前 10 名竞争对手的：内容结构、字数、缺失的板块、过时信息
- 同时留意：**这些竞品在 AI 搜索结果中被引用的可能性**——如果竞品有 FAQ、数据表格、步骤指南，说明他们也在优化 AI 引用
- 产出：`research/[topic]-brief-[date].md`，包含关键词列表、竞品分析、内容差距

**多语言场景**：
```
EN: /research "OEM power bank manufacturer"
DE: /research "Powerbank OEM Hersteller"     ← 注意德语关键词
ES: /research "fabricante OEM power bank"
FR: /research "fabricant OEM batterie externe"
RU: /research "OEM производитель power bank"
```

### 第 2 步：`/write [topic]` — 主体创作

**自动触发 5 个 Agent 并行运行**（不需要手动调用）：

| Agent | 做什么 | 产出 |
|-------|--------|------|
| Content Analyzer | 搜索意图 + 关键词/内容长度/可读性/SEO/B2B/信息增益 | 0-100 分 + 分类得分 + 修改建议 |
| SEO Optimizer | 页面 SEO 分析 | SEO 评分 + 精选摘要建议 |
| Meta Creator | 标题和描述 | 5 组标题选项 + 描述变体 |
| Internal Linker | 内部链接策略 | 3-5 个锚文本建议 |
| Keyword Mapper | 关键词分布检查 | 密度热力图 + 蚕食风险 |

**B2B 站点的特殊要求**（CLAUDE.md 已配置质量门）：

- H1 必须含 B2B 信号词：OEM, manufacturer, factory, supplier, importer, sourcing, MOQ, FOB, B2B
- 关键词密度不是你该关心的——**一手数据密度和信息增益**才是
- 必须引用 `context/factory-data-canonical.md` 的真实工厂数据
- 至少 2 个 H2 含 B2B 信号词
- FAQ 用采购经理的语言提问（不要消费者口吻）

**产出**：`drafts/[slug]-[date].md`，含完整的元数据头。

### 第 3 步：`/optimize [file]` — SEO 精修

运行 SEO 质量评分（0-100），产出关键词分布、内容结构、Schema 完整性、优化建议。**目标分数 ≥ 80**。

### 第 4 步：`/scrub [file]` — 去 AI 味

删除 AI 标志性短语、替换模糊词、加入工厂细节、确保句子节奏变化。

### 🆕 第 5 步：`geo-citability` — AI 引用可能性检查

**这是 GEO 新增的关键步骤**。在文章发布前跑一次 `geo-citability`，它会：

- 分析页面被 AI（ChatGPT/Claude/Perplexity/Gemini）引用的可能性
- 打出 0-100 的 citability 评分
- 给出具体的改写建议：哪些段落需要加数据支撑、哪里需要改成定义块格式、哪个 H2 需要加 FAQ 子段

**目标**：citability ≥ 70。如果低于 70，根据建议修改后再跑一次。

**AI 偏爱引用的内容格式**（记在心里，写的时候就往这个方向靠）：
- **定义块**："X is a..." → 直接回答，40-60 词 → AI 最爱引用
- **证据三明治**：Claim → Data → Source → AI 视为可信陈述
- **对比表格**：结构化数据 → AI 提取准确率最高
- **步骤指南**：HowTo Schema 加持 → AI 直接引用步骤
- **FAQ**：真实问题 + 简洁回答 → 精选摘要 + AI 引用双杀

#### ⚠️ geo-citability 风险提示：不会破坏 SEO，但有前提

**geo-citability 是只读分析工具，不自动修改文章。** 它只评分 + 给建议，改不改、改多少完全由你控制。放在 `/scrub` 之后不会破坏前面的 SEO 布局，也不会引入 AI 味——前提是你**手动筛选建议**，而不是机械套用。

**盲目套用每条建议的 4 个风险：**

| GEO 建议 | 盲目套用的后果 | 正确做法 |
|---------|--------------|---------|
| 每个 H2 开头加 "X es..." 定义句 | 全篇段落开头句式雷同 → **AI 味 +1，可读性 -1** | 只给**真正缺少定义**的段落加（通常 3-5 个就够） |
| 堆统计数据和数字 | 数字过密，读者疲劳 → 从「工厂指南」变成「Excel 表格」 | 只在论据薄弱处补数据，保持自然节奏 |
| 拆短段落到 2-3 句 | 过度碎片化 → 逻辑链条断裂 | 只拆**超过 5 句的墙式段落**，保持 3-4 句的正常节奏 |
| 表格化一切对比信息 | 页面变数据堆 → 人类读者跳出率上升 | 3+ 项对比才用表格，简单对比用文字即可 |

**安全执行原则（人判四问）：**

采纳每条 citability 建议前，问自己四个问题：
1. 这个改动让文章**更像人写的**还是更像机器写的？
2. 改完后**读出声**——断句自然吗？节奏对吗？
3. 加的数据是**真实工厂数据**还是 AI 编造的？
4. 这个改动对**采购经理的决策**有帮助，还是只对 AI 爬虫有用？

> **核心原则**：优先采纳「加真实数据」的建议（如引用 factory-data-canonical.md 的具体数字），跳过「纯格式模板化」的建议（如每段必须 40-60 词的定义块）。信息增益 > 格式对齐。

### 第 6 步：手动转 Nunjucks + 部署

在 `src/[lang]/blog/[slug]/` 下创建 `index.njk`：
- Nunjucks front matter（title, description, date, author, canonical, 跨语言路径, ogImage, articleSection, articleTags, hreflang）
- `{% extends "layout.njk" %}`
- `{% block head_schema %}` — JSON-LD @graph（完整的 BlogPosting + FAQPage + HowTo + BreadcrumbList + Organization + SpeakableSpecification）
- `{% block content %}` — HTML 正文

然后：添加封面图 → `npm run build` → git commit + push → Cloudflare Pages 自动部署。

> ⚠️ 这个手工环节是当前最大的效率瓶颈。如果需要，可以考虑写一个 seomachine Markdown → Nunjucks 的转换脚本。

---

## 三、优化已有页面的工作流

### 场景 A：常规 SEO 优化

```
/analyze-existing [URL]    → 了解当前健康度
/optimize [file]           → 获取具体优化建议
手动修改 Nunjucks           → 在 wowohcool.com 站点源码中改
/scrub [file]              → 去 AI 痕迹
npm run build && git push  → 部署
```

### 场景 B：大幅重写

`/rewrite` 保存文章后**自动触发 4 个 Agent + `/scrub`**（不含 Content Analyzer 和 B2B 审计）：

| Agent | 做什么 | 产出 |
|-------|--------|------|
| **SEO Optimizer** | 对比原版 SEO 指标，检查改进 | SEO 优化评分 |
| **Meta Creator** | 生成新的 meta 选项 | 多组 title/description 变体 |
| **Internal Linker** | 检查旧链接 + 建议新链接 | 链接更新建议 |
| **Keyword Mapper** | 验证关键词改进效果 | 密度 + 分布分析 |

```
/rewrite [topic]           → 生成新版本到 rewrites/（自动 /scrub + 4 Agent）
手动对比新旧版本             → 挑选改进点
/b2b-audit rewrites/xxx.md → B2B 文章专项审计（独立运行）
geo-citability             → 检查新版本 AI 引用潜力
手动更新 Nunjucks           → 替换旧内容
npm run build && git push  → 部署
```

### 场景 C：转化优化（产品页/服务页）

```
/landing-audit [file]      → CRO 审计（首屏/CTA/信任信号/摩擦点）
/landing-competitor [URL]  → 了解竞争对手怎么做的
手动优化 Nunjucks           → 针对性修改
npm run build && git push  → 部署
```

### 场景 D：存量内容 GEO 补强（新增）

```
geo-citability             → 逐篇检查高价值页面的 AI 引用评分
                           → 优先处理评分 < 50 的页面
添加定义块/FAQ/对比表格     → 按建议改写薄弱段落
geo-schema                 → 检查 Schema 是否完整（加 articleBody、reviewedBy 等）
npm run build && git push  → 部署
```

---

## 四、Python 脚本：什么时候跑什么

### 每周例行

```bash
cd C:/Users/wowoh/seomachine
python seo_baseline_analysis.py
```
产出：MOFU/BOFU 关键词排名全景，快速发现掉排名的词。

### 发现具体问题后

```bash
python seo_bofu_rankings.py      # 高价值关键词排名下滑 → 深入分析
python seo_competitor_analysis.py # 竞争对手抢走排名 → 逐词对比
```

### 内容规划阶段

```bash
python research_quick_wins.py                # 位置 11-20 的词优先优化
python research_competitor_gaps.py           # 竞品写了但你没写的主题
python research_trending.py                  # 趋势变化决定要不要追
python research_priorities_comprehensive.py  # 全面优先级矩阵（所有数据源）
```

### 运行前提

确保 `data_sources/config/.env` 配置正确（GA4、GSC、DataForSEO 凭证）。

**竞争对手配置**：复制 `config/competitors.example.json` 为 `config/competitors.json` 并填入实际数据：

```json
{
  "direct_competitors": ["competitor1.com", "competitor2.com"],
  "content_competitors": ["industrysite1.com"],
  "bofu_keywords": [
    "OEM power bank manufacturer",
    "custom power bank factory",
    "power bank supplier wholesale",
    "private label power bank"
  ],
  "mofu_keywords": [
    "power bank manufacturing process",
    "how to source power banks from China",
    "power bank MOQ",
    "power bank factory audit"
  ],
  "alternative_keywords": ["competitor1 alternatives"],
  "relevant_terms": ["power bank", "charger", "OEM", "factory", "manufacturing"],
  "skip_terms": ["celebrity", "net worth", "dating"]
}
```

---

## 五、GEO 技能栈：完整的 AI 搜索引擎优化体系

### SEOmachine 内置 GEO 能力

| 工具 | 类型 | 做什么 | 使用时机 |
|------|------|------|---------|
| `/research-ai-citations [topic]` | 命令 | 生成 100+ AI 提示词，审计 AI 引用哪些来源，产出差距分析 | 每进入一个新主题领域前 |
| `context/ai-citation-targets.md` | 上下文 | 5 层引用平台清单（B2B 目录/认证数据库/榜单/社区/评价） | 品牌引用策略参考 |
| `context/reddit-strategy.md` | 上下文 | Reddit 参与策略（Perplexity 引用 Reddit 46.7%） | 社区 SEO 执行参考 |
| `.claude/skills/seo-audit/references/aeo-geo-patterns.md` | 技能引用 | AI 可引用内容模板（定义块/对比表/证据三明治/语音搜索） | 写文章时参照格式 |

### 全局 GEO 技能栈

这些是 Claude Code 环境已安装的独立 GEO 技能，直接对话触发：

#### 审计与诊断

| 技能 | 做什么 | 关键指标 | 运行频率 |
|------|------|---------|:--------:|
| `geo-audit` | 全站 GEO+SEO 综合审计，并行调度所有 GEO 子技能 | GEO Score 0-100 | 季度 |
| `geo-citability` | 分析页面被 AI 引用的可能性 | Citability Score 0-100 | 每篇文章发布前 |
| `geo-crawlers` | 检查 robots.txt / meta tags / HTTP 头对 AI 爬虫的访问 | 爬虫访问矩阵 | 季度 / 配置变更后 |
| `geo-technical` | 技术 SEO + GEO 专项（爬虫/索引/安全/性能/SSR） | 分项 Pass/Fail | 季度 |

#### 内容与 Schema

| 技能 | 做什么 | 关键维度 | 运行频率 |
|------|------|---------|:--------:|
| `geo-content` | E-E-A-T 评估（经验/专业/权威/信任） | 四维评分 + 改进建议 | 重要文章发布前 |
| `geo-schema` | Schema.org 检测/验证/生成 JSON-LD | Schema 覆盖率 + 缺失项 | 新产品页 / 季度 |
| `geo-llmstxt` | 验证现有 llms.txt 或从零生成 | 规范合规 + 内容完整度 | 新增语言版本时 |

#### 平台与监控

| 技能 | 做什么 | 覆盖平台 | 运行频率 |
|------|------|---------|:--------:|
| `geo-platform-optimizer` | 针对特定 AI 平台的专项优化 | Google AI Overviews / ChatGPT / Perplexity / Gemini / Copilot | 按需 |
| `geo-brand-mentions` | 扫描品牌在 AI 引用平台上的存在 | B2B 目录 / 认证数据库 / 评论站 / 社区 | 季度 |
| `geo-compare` | 两次审计的月度变化追踪 | 所有 GEO 类别的评分变化 | 月度 |
| `geo-report` | 整合所有审计结果生成客户报告 | 评分 / 图表 / 优先级清单 | 月度 / 季度 |

### GEO Agent 类型

这些是专门处理 GEO 任务的子 Agent，在执行复杂 GEO 任务时自动调用：

| Agent | 专长 | 调用技能 |
|-------|------|---------|
| `geo-ai-visibility` | AI 搜索可见性综合分析 | citability + crawlers + llmstxt + brand-mentions |
| `geo-content` | 内容质量 E-E-A-T | 经验/专业/权威/信任四维评估 |
| `geo-platform-analysis` | 平台适配评估 | Google AI Overviews / ChatGPT / Perplexity / Gemini / Copilot |
| `geo-schema` | 结构化数据 | JSON-LD 检测/验证/生成 |
| `geo-technical` | 技术基础设施 | 爬虫/索引/安全/Core Web Vitals/SSR |

---

## 六、多语言内容策略

### 5 种语言的市场定位

| 语言 | 目标市场 | 当前文章数 | 优先级 | 策略 |
|------|---------|:--------:|:------:|------|
| EN | 全球（默认） | 28 | 🟢 维护 | 保持更新频率，作为内容母版 |
| DE | 德国/奥地利/瑞士 | 28 | 🟢 维护 | DACH 市场 B2B 搜索量大，保持 |
| ES | 西班牙/拉美 | 27 | 🟡 补齐差距 | 补充缺失的 1 篇，保持完整 |
| FR | 法国/非洲法语区 | 10 | 🔴 重点补 | 缺口最大（差 18 篇），优先补 |
| RU | 俄罗斯/独联体 | 0 | 🔴 从零建 | 需要从 0 建立内容体系 |

### 多语言工作原则

1. **每篇文章独立创作，不是翻译**。用目标语言搜索 SERP，分析目标市场竞品，写本土化内容
2. **数据本土化**：DE 文章引用德国法规/标准（Stiftung Warentest, DIN），ES 文章引用拉美进口法规（BOE/AEAT），FR 引用法国认证体系
3. **案例本土化**：DE 文章讲德国进口商案例，ES 讲西班牙/拉美进口商场景
4. **EN 先写，DE/ES/FR/RU 本土化跟进**（不是翻译！）

### 多语言 GEO 特别注意事项

- **每个语言版本需独立的 `llms.txt`**：AI 模型按语言检索，DE 版 llms.txt 必须包含德语内容摘要
- **本土化 AI 引用平台**：DE 市场关注德国 B2B 目录（wlw.de），ES 关注西班牙语平台
- **每篇非 EN 文章发布后也要跑 `geo-citability`**：用目标语言的内容检

### 多语言执行顺序

1. EN 版 → `/research "OEM gan charger manufacturer"` → `/write` → `/optimize` → `/scrub` → `geo-citability` → 发布
2. DE 版 → `/research "GAN-Ladegerät OEM Hersteller"` → `/write` → 同上 → 发布
3. ES 版 → `/research "fabricante OEM cargador GAN"` → `/write` → 同上 → 发布
4. FR 版 → `/research "fabricant OEM chargeur GAN"` → `/write` → 同上 → 发布
5. RU 版 → `/research "OEM производитель GAN зарядных устройств"` → `/write` → 同上 → 发布

---

## 七、质量门实操检查清单（SEO + GEO 合并版）

### SEO 质量门（来自 CLAUDE.md）

```
[ ] H1 含 B2B 信号词 + 50-65 字符
[ ] ≥2 个 H2 含 B2B 信号词
[ ] HowTo Schema 已添加（如有步骤流程）
[ ] 图片 alt text 含 B2B 关键词
[ ] dateModified 更新为当天日期
[ ] wordCount 更新为实际数值（整数，无引号）
[ ] ≥2 个外部权威链接 (rel="noopener noreferrer")
[ ] ≥3 个内部链接到产品页/服务页/相关文章
[ ] FAQ 问题使用 B2B 采购语言（非消费者语言）
[ ] Schema: BlogPosting ✅ Person ✅ FAQPage ✅ HowTo ✅ BreadcrumbList ✅ Organization ✅ SpeakableSpecification ✅
```

### 信息增益检查（Gate 2 — 最关键）

对照 SERP 前 5 名检查：你的文章有没有他们**没有**的内容？

```
[ ] 真实工厂数据/测试数据（不编造）
[ ] 具体数字 + 单位（°C, mV, kHz, Wh/kg, mm, €, $）
[ ] 一手经验细节（不是"good thermal performance"，是具体测试结果）
[ ] 引用 context/factory-data-canonical.md 的数据（如适用）
```

### GEO 质量门（新增）

```
[ ] citability 评分 ≥ 70（每篇文章发布前跑 geo-citability）
[ ] 页面上存在 AI 可引用的内容格式（定义块/FAQ/对比表/步骤指南至少 2 种）
[ ] llms.txt 已更新（新增主题已反映在合适章节）
[ ] llms-full.txt 已更新（新文章摘要已添加）
[ ] Schema 含 articleBody（Google 理解完整文本）
[ ] Schema 含 reviewedBy 或编辑策略声明（E-E-A-T 信号）
[ ] 文章在 AI 引用目标平台的对应页面有链接（见 context/ai-citation-targets.md）
```

### 发布检查清单

```
[ ] 本地构建成功：cd C:\Users\wowoh\wowohcool.com && npm run build
[ ] 检查 _site/ 下的页面渲染正确
[ ] robots.txt 允许 AI 爬虫 + 传统爬虫索引
[ ] llms.txt 和 llms-full.txt 已更新（如涉及新主题）
[ ] hreflang 标签全部正确
[ ] canonical URL 正确
[ ] 封面图已放置（WebP 格式）
[ ] 所有内部链接有效
[ ] Schema 通过了 Google Rich Results Test
[ ] Content-Signal 头确认 ai-train=yes, search=yes（检查 _headers 文件）
[ ] git commit + push
[ ] 等 Cloudflare Pages 构建完成
[ ] 验证线上页面可访问
[ ] 检查 GSC 是否已发现新页面
```

---

## 八、全部技能使用场景速查

### SEOmachine 26 个营销技能

| 技能 | B2B 使用场景 | 触发方式 |
|------|------------|---------|
| `seo-audit` | 诊断整个站点的 SEO 健康度 | "audit my site's SEO" |
| `schema-markup` | 验证/生成产品的 JSON-LD | "add schema markup" |
| `programmatic-seo` | 做城市/国家×产品的矩阵页面 | "build location pages" |
| `competitor-alternatives` | 写 "X vs Y" / "X alternative" 页面 | "create comparison page" |
| `copywriting` | 优化产品页/服务页文案 | "improve copy for pricing page" |
| `content-strategy` | 规划下季度内容日历 | "plan content strategy" |
| `analytics-tracking` | 设置 GA4 转化事件追踪 | "set up conversion tracking" |
| `pricing-strategy` | 优化定价页面的价格呈现 | "review pricing" |
| `social-content` | 文章写完后生成 LinkedIn 帖子 | "create LinkedIn post from this" |
| `marketing-psychology` | 用心理学优化 CTA 转化 | "apply behavioral science to CTA" |
| `ab-test-setup` | A/B 测试落地页标题/CTA | "set up A/B test" |
| `email-sequence` | 询盘后的邮件培育流程 | "create email sequence" |
| `free-tool-strategy` | 做 MOQ 计算器等营销工具 | "plan a free tool" |
| `launch-strategy` | 新品（如新款 GaN 充电器）发布 | "plan product launch" |
| `marketing-ideas` | 需要增长灵感时翻阅 139 个策略 | "give me marketing ideas" |
| `referral-program` | 设计客户推荐/分销商激励 | "design referral program" |
| 其余 10 个 CRO/付费广告技能 | 按需使用 | 参考 `.claude/skills/` 目录 |

### GEO 11 个技能

| 技能 | 做什么 | 触发方式 | 频率 |
|------|------|---------|:--:|
| `geo-audit` | 全站 GEO+SEO 综合审计 | "run GEO audit" | 季度 |
| `geo-citability` | 页面 AI 引用评分 + 改写建议 | "check citability of this article" | 每篇 |
| `geo-crawlers` | AI 爬虫访问权限审计 | "check AI crawler access" | 季度 |
| `geo-llmstxt` | llms.txt 验证/生成 | "validate my llms.txt" | 按需 |
| `geo-brand-mentions` | 品牌在 AI 平台的存在扫描 | "scan brand mentions" | 季度 |
| `geo-technical` | 技术 SEO + GEO 基础设施 | "run technical GEO audit" | 季度 |
| `geo-content` | E-E-A-T 内容质量 | "assess content quality" | 重要文章 |
| `geo-schema` | Schema 审计 + 生成 | "audit schema markup" | 季度 |
| `geo-platform-optimizer` | 单个 AI 平台专项优化 | "optimize for ChatGPT search" | 按需 |
| `geo-compare` | 月度 GEO 变化追踪 | "compare GEO scores this month vs last" | 月度 |
| `geo-report` | 生成 GEO 客户报告 | "generate GEO report" | 月度 |

---

## 九、市场实操建议

### 1. B2B 关键词策略（传统 SEO + AI 搜索）

不要只盯着搜索量。B2B 的关键词特点是：

- **高意图低搜索量**："OEM power bank manufacturer minimum order 1000 units" 搜索量可能只有 50/月，但每个点击价值远高于 "best power bank 2026"
- **长尾优先**：结合使用场景写长尾——"power bank with CE RoHS certification for European importers"
- **AI 搜索关键词不同**：人在 Google 搜 "best power bank manufacturer"，但在 ChatGPT 里问 "Who is a reliable power bank OEM factory in Shenzhen with ISO 9001 certification and MOQ under 1000?"——你的内容必须能回答这种自然语言查询

### 2. 内容节奏建议（SEO + GEO 合并节奏）

```
每周 1 篇 EN 核心文章          （用 /write 完整流程 + geo-citability）
每 2 周 1 篇 DE/ES 本土化跟进 （独立研究 + 独立撰写）
每月 1 次 /cluster 审视覆盖度
每月 1 次 /performance-review 看数据
每月 1 次 geo-compare          看 GEO 评分变化
每季度 1 次 geo-audit + geo-crawlers + geo-brand-mentions
每季度 1 次 /research-ai-citations 核心主题
```

### 3. 当前优先级建议

| 优先级 | 行动 | 理由 |
|:---:|------|------|
| 🔴 P0 | 补齐 RU 博客（从 0 到 5-10 篇） | 覆盖独联体市场，当前完全空白 |
| 🔴 P0 | 补齐 FR 博客（从 10 到 20+ 篇） | 法语非洲市场采购量可观 |
| 🔴 P0 | 修 llms.txt.njk 模板（防止覆盖完整版）+ 加 DE/ES/FR/llms-full.txt | GEO 基础设施缺陷 |
| 🟡 P1 | EN 存量文章 `/optimize` + Schema 补全 + `geo-citability` 逐篇打分 | 加 articleBody、reviewedBy、更新 dateModified |
| 🟡 P1 | 给产品页跑 `/landing-audit` | 产品页是转化终点，CRO 影响最大 |
| 🟡 P1 | 在 ThomasNet、TradeIndia、UL Product iQ 创建公司档案 | GEO 品牌引用平台覆盖 |
| 🟢 P2 | 跑 `/cluster` 审视 EN/DE 集群 | 确保主题覆盖没有结构性盲区 |
| 🟢 P2 | 填内容缺口：FCC/UL 认证指南、TCO 对比、Amazon 卖家指南 | AI 引用覆盖盲区 |

---

## 十、命令执行顺序速查卡

### 🆕 创建新文章（SEO + GEO + B2B 完整版）

**⚠️ 铁律：所有内容改动在 `/optimize` 之前完成。`/optimize` 之后只做 `/scrub` + 发布。**

```
/research "keyword"                    → 研究简报
  → /write-b2b [topic]                → 完整 .njk（13-panel + Schema 7-node）
    → /b2b-audit [file]               → < 90 必须修复
      → geo-citability                → < 70 必须修复弱块
        → /b2b-audit [file] (重跑)     → 确认 GEO 修复未损害 B2B 指标
          → /optimize [file]           → 🔒 最终 SEO 验证（目标 ≥ 80）
            → /scrub [file]            → 去 AI 痕迹（最终清理）
              → 部署                   → git add + commit + push
```

### 🔧 优化已有文章
```
/analyze-existing URL → /optimize file → /scrub → geo-citability → 手动改 Nunjucks → build → push
```
> B2B 文章额外跑 `/b2b-audit file` 做专项质量检查。如果 geo-citability 后改了内容，重跑 `/optimize` 验证。

### 🔄 重写旧文章
```
/rewrite "topic"               （自动触发 4 Agent + /scrub）
  → /b2b-audit rewrites/xxx.md （B2B 文章必跑）
  → 对比新旧 → geo-citability → 手动更新 Nunjucks → build → push
```

### 🎯 优化落地页
```
/landing-audit file → /landing-competitor URL → 手动改 Nunjucks → build → push
```

### 📊 数据分析
```
python seo_baseline_analysis.py → /performance-review → 制定行动计划
```

### 🌐 多语言扩展
```
EN: /research → /write-b2b → /b2b-audit → geo-citability → /b2b-audit(重跑) → /optimize → /scrub → 发布
DE: /research(德语) → /write-b2b → 同上（独立执行，不是翻译）
ES: /research(西语) → /write-b2b → 同上
FR: /research(法语) → /write-b2b → 同上
RU: /research(俄语) → /write-b2b → 同上
```

### 🤖 GEO 季度审计
```
geo-audit （全站综合）
  → geo-crawlers （爬虫访问）
  → geo-llmstxt （所有语言版本）
  → geo-brand-mentions （品牌引用）
  → geo-schema （结构化数据）
  → geo-technical （技术基础设施）
  → geo-compare （与上季度对比）
```

### 🎯 单平台 GEO 优化
```
geo-platform-optimizer → 选目标平台
  Google AI Overviews  → 优化 Featured Snippet + 定义块
  ChatGPT              → 优化自然语言问答格式 + FAQ
  Perplexity           → 优化引用来源 + Reddit 存在
  Gemini               → 优化结构化数据 + llms.txt
  Copilot              → 优化 Bing 索引 + Schema
```

---

> **核心原则**：SEO 让 Google 找到你，GEO 让 AI 引用你。两者的共同基础是**高质量、高信息密度、结构化**的内容。不要为了 SEO 堆关键词，也不要为了 GEO 堆 AI 格式——真实的第一手工厂数据、精准的技术细节、采购经理真正关心的问题，才是排名的终极护城河。
