# GEO Audit Report: WOWOHCOOL (wowohcool.com)

**审计日期：** 2026-07-18
**URL：** https://www.wowohcool.com
**业务类型：** B2B 制造商（OEM/ODM 充电设备工厂，深圳）
**分析范围：** 49 个 EN 页面（sitemap）+ 5 语言版本 + 站外品牌足迹核查
**审计方式：** 5 个专项 Agent 并行审计（AI 可见性 / 平台适配 / 技术 / 内容 E-E-A-T / Schema）

---

## Executive Summary

**综合 GEO 评分：63/100（Fair）**

这是一个**「AI 读得懂、但 AI 不认识」**的网站。站内技术与内容基础设施做到了 B2B 独立站的天花板水平——纯静态 HTML 对所有 AI 爬虫完全可见、五语言 llms.txt、Content-Signal 全开、28 篇博客全部带完整 Schema、独家工厂一手数据密度极高。但品牌在 AI 训练语料所依赖的第三方平台上几乎为零存在：无 Wikidata、无 B2B 目录店铺、无社区提及、法律实体链路断裂。**得分天花板完全由 Brand Authority（12 分）决定——每投入到站外实体建设的 1 分，约等于站内内容优化 2.5 分的综合回报。**

### Score Breakdown

| 类别 | 得分 | 权重 | 加权分 |
|---|:---:|:---:|:---:|
| AI Citability（内容可引用性） | 78/100 | 25% | 19.5 |
| Brand Authority（品牌权威） | **12/100** | 20% | 2.4 |
| Content E-E-A-T（内容质量） | 68/100 | 20% | 13.6 |
| Technical GEO（技术基础设施） | **94/100** | 15% | 14.1 |
| Schema & Structured Data | 67/100 | 10% | 6.7 |
| Platform Optimization（平台适配） | 71/100 | 10% | 7.1 |
| **Overall GEO Score** | | | **63/100** |

### 五大 AI 平台就绪度

| 平台 | 得分 | 状态 | 一句话诊断 |
|---|:---:|:---:|---|
| Google AI Overviews | 83/100 | Good | 站内结构教科书级，缺 H2 锚点和第三方权威 |
| Bing Copilot | 83/100 | Good | IndexNow 满配 + BWT 已验证，接近站内上限 |
| ChatGPT Search | 71/100 | Good | 爬虫访问满分，实体识别 12/35 拖后腿 |
| Perplexity AI | 68/100 | Fair | 内容是最强引用资产，但 Reddit 存在为零 |
| Google Gemini | **49/100** | Poor | Google 生态真空：0 视频嵌入、无 GBP、无 Knowledge Graph |

---

## Critical Issues（战略级，立即启动）

### C1. 品牌权威真空（Brand Authority 12/100）— 全站最大短板

**证据（实测）：**
- Wikipedia/Wikidata：零条目（API 直查确认）
- Alibaba / Made-in-China / Global Sources：品牌名搜索**零店铺、零 listing**——对深圳 B2B OEM 工厂而言这是最反常的缺口
- Reddit/Quora：零提及
- LinkedIn 公司页存在但未被搜索引擎有效索引
- YouTube 频道存在但视频零露出

**加重因素——品牌名污染：** 搜索结果被 WOWCOOL（广州）、woocool（台湾）、WOWKOOL、哇酷科技（厦门）等近似名实体淹没。AI 做实体消歧时，WOWOHCOOL 缺乏任何第三方锚点区分自己。

**修复路径：** 见 30 天行动计划 Week 1 + Week 3。

### C2. 法律实体链路断裂

- 站内全文未出现中文注册名和统一社会信用代码
- About 页承诺「可在 gsxt.gov.cn 查验」但买家实际无法执行
- "Dong Yi Technology Co., Ltd" 在公开渠道无法独立溯源
- 网站 ↔ 工商注册 ↔ 认证数据库（WPC/FCC）之间的实体链条断裂，AI 无法交叉验证「这是一家真实工厂」

---

## High Priority Issues（1 周内修复）

| # | 问题 | 位置 | 修复 |
|---|------|------|------|
| H1 | SearchAction 指向 404（`/search?q=` 不存在） | 产品页 WebSite schema | 删除 potentialAction 块 |
| H2 | Schema 实体图断裂：3 个互相冲突的 Organization 定义，博客/产品页是孤岛 | 全站模板 | 统一用 `{"@id": ".../#organization"}` 引用（模板级修复，Cross-Entity Linking 45→85） |
| H3 | `_headers` 规则叠加导致 Cache-Control 冲突（llms.txt 双值、图片边缘缓存实际仅 1h） | `_headers` | 在特定规则前加 `! Cache-Control` detach 语法 |
| H4 | Cloudflare 面板 Browser Cache TTL (4h) 覆盖 CSS/JS 5 分钟缓存设计 | CF 面板 | 设置为 "Respect Existing Headers" |
| H5 | BlogPosting 缺 `articleBody`、`citation`、`inLanguage`、`@id`、`isPartOf` | 博客模板 | 模板级补齐，一次修复传播到全部文章 |
| H6 | 自评 Review + aggregateRating（Google 2019 起无视且视为 spammy） | 首页 schema | 删除 markup，保留页面可见的客户证言 |
| H7 | 无 Terms of Service；DE 站无 Impressum（§5 DDG 法定要求） | 法律页 | 补齐两个法律页面 |

---

## Medium Priority Issues（1 个月内修复）

| # | 问题 | 影响 |
|---|------|------|
| M1 | Reddit 策略文档完备但**执行为零**（Perplexity 46.7% 引用来自 Reddit） | Perplexity/AIO/ChatGPT |
| M2 | "Top 10 Manufacturers" 自排 #1 无利益披露，承诺的产能数据全部缺失 | AI 对 self-serving 排名折价，可能连带损害全域信任 |
| M3 | 作者实体不一致：Nina Nico 三处头衔互相矛盾；Snowy May 年资 10 vs 13 | E-E-A-T 实体可信度 |
| M4 | YouTube 频道零视频嵌入、零 VideoObject schema | Gemini 49 分的最大杠杆 |
| M5 | 联系方式只在 schema 和 About 页，全站页脚不可见 | 信任信号（人眼不可见） |
| M6 | 行内归因缺失：信源集中在文末列表，逐数据的行内引用缺失 | Evidence sandwich 只做到一半 |
| M7 | 数据矛盾：不良率 0.3% vs 0.3-0.5%、Bosch 5 天 vs 25 天、wordCount 虚标 3200 vs 实测 2400 | AI 交叉验证时的可信度 |
| M8 | 翻译站 schema 不平价：ES HowTo 19/28、DE 24/28、RU 站基本空壳 | Gemini 多语言市场 |
| M9 | sitemap lastmod 全部标记为构建日期，freshness 信号被浪费 | 搜索引擎不再信任该字段 |
| M10 | 面板级 HSTS (180d) 覆盖 `_headers` 的 1 年设置 | 无法进入 preload list |

---

## Low Priority Issues（有空时优化）

- H2/H3 无 `id` 锚点（AIO 深链受限）
- 博客索引 27 篇中 23 篇无摘要
- 博文正文疑似无工厂实拍图（alt 文本缺失）
- robots.txt 未具名 Meta-ExternalAgent / Perplexity-User / DuckAssistBot（通配符已覆盖，仅声明性）
- 页面不显示 "Last updated" 日期（schema 已有）
- Content-Signal 行在 robots.txt 中位于 User-agent 组外
- rsl.txt 存在但无任何引用入口
- Cloudflare Email Obfuscation 让非 JS 爬虫看到 `[email protected]`

---

## Category Deep Dives

### AI Citability（78/100）

**最强引用资产（全网独家）：**
1. 工厂订单数据面板："68% of new OEM RFQs specify GaN V"、"2.4× Qi2.2 inquiry growth YoY"、"41% DDP vs 18% in 2024"
2. 内部 AQL 标准 + 45°C 环境 4 小时满载老化测试
3. Qi2.2 认证产品统计（637 款、69.62% 为 25W 档，注明 WPC 2026.02）
4. MOQ/交期矩阵（样品 3-7 天、OEM 25-30 天、ODM 45-60 天）

**样本评分：** 2026 Market Trends 85/100（全站最佳：6 张对比表 + 11 个具名信源 + 专家引语）；GaN Generations Guide 82/100；**Top 10 Manufacturers 45/100（自排 #1 拖后腿）**

### Brand Authority（12/100）

站外验证 = 接近零。详见 Critical Issues C1/C2。唯一发现：一个疑似自建的 Slashdot 用户页和 BuiltWith 技术清单收录。

### Content E-E-A-T（68/100）

Experience 78 / Expertise 74 / **Authoritativeness 40** / Trustworthiness 68 / Depth & Structure 80。
AI 痕迹检测：抽样文章中 "delve"、"it's important to note" 等 AI 标志语**均未检出**，含编辑更正声明——判定为人工深度参与。内容新鲜度优（全部博文 4 个月内，dateModified 6 天前）。DE 版语言质量母语级，非机翻。

### Technical GEO（94/100）

全站最强项。SSR 98 / Crawlability 92 / AI Access 94 / Performance 91 / Security 91。
实测 GPTBot/ClaudeBot/PerplexityBot UA 均返回完整 115KB 页面。零 CRITICAL 问题，扣分全部在 Cloudflare 配置层（Cache-Control 叠加、面板 TTL 覆盖、HSTS 不一致）。

### Schema & Structured Data（67/100）

Completeness 88 / Accuracy 62 / GEO-Critical 85 / AI-Properties 55 / **Cross-Entity Linking 45**。
ManufacturingBusiness 双类型 + 全站 speakable 是 top-decile 水平，但实体图断裂（3 个 Organization 定义互不引用）把整体拖到 67。模板级修复可达 90+。

### Platform Optimization（71/100）

五平台失分几乎全部来自同一根因——**站外实体信号真空**。站内已到天花板，下一阶段 ROI 在站外。

---

## Quick Wins（本周实施）

1. **创建 Wikidata 实体**（1-2 天，零成本）：填 legal name、founding 2013、HQ 坐标、官网、LinkedIn/YouTube ID。无需 Wikipedia 通知度门槛，直接喂给 Knowledge Graph 和 LLM 实体链接。撬动 4 个平台。
2. **删除产品页 SearchAction**（5 分钟）：`/search?q=` 返回 404，属 schema 硬错误。
3. **修 `_headers` Cache-Control 叠加**（30 分钟）：给 `/llms.txt`、`/image/*`、`/css/*`、`/*.js` 等特定规则加 `! Cache-Control` detach。
4. **统一法律实体名**（半天）：About 页 + 页脚补中文注册名 + 统一社会信用代码；Organization schema 加 `legalName`；让 gsxt.gov.cn 查验承诺可执行。
5. **Schema @id 引用统一**（模板级，半天）：博客 publisher 和产品页 manufacturer 改为 `{"@id": ".../#organization"}` 引用，删除自评 Review markup。

## 30-Day Action Plan

### Week 1：实体地基（对抗品牌名污染）
- [ ] 创建 Wikidata 条目（憑工商注册 + WPC 认证）
- [ ] About/页脚公开中文注册名 + 统一社会信用代码
- [ ] Organization schema 补 `legalName` + `knowsAbout` + `hasCertification`
- [ ] 47 款 Qi2 认证产品逐一链接到 WPC 公开数据库条目
- [ ] 公布 ISO 9001 证书编号（SGS 可查验号）

### Week 2：Schema 模板修复（一次修复传播全站）
- [ ] BlogPosting 模板补 `articleBody`、`citation`、`inLanguage`、`@id`、`isPartOf`
- [ ] 全站 Organization 统一为 homepage `#organization` 单一来源
- [ ] 删除 SearchAction 404 + 自评 Review markup
- [ ] `productionCapacity`/`annualRevenue` 迁移到 additionalProperty
- [ ] 修 `_headers` Cache-Control + CF 面板 Browser Cache TTL

### Week 3：B2B 目录存在（Brand Authority 主攻）
- [ ] 开通 Alibaba 认证供应商店铺（以品牌名 + 法律实体名）
- [ ] 开通 Made-in-China / Global Sources 店铺
- [ ] 全部店铺 URL 加入 Organization schema `sameAs`
- [ ] LinkedIn 公司页完善至满分状态 + 3-5 名员工关联
- [ ] 启动 F5Bot 关键词监控（Reddit 策略执行第一步）

### Week 4：内容与信任修复
- [ ] Top 10 文章：加利益披露 + 补产能数据，或改写为不含自排名的选型指南
- [ ] 统一作者实体：三处头衔对齐 + 建 /authors/ 独立页
- [ ] 补 Terms of Service + DE 站 Impressum
- [ ] 页脚加入 NAP（地址/电话/邮箱人眼可见）
- [ ] 修正数据矛盾（0.3% vs 0.3-0.5% 等）
- [ ] YouTube 发 3-5 条工厂实拍短视频 + 博客嵌入 + VideoObject schema

---

## 预期效果

| 阶段 | 动作 | 预计 GEO Score |
|------|------|:---:|
| 当前 | — | 63 |
| Week 1-2 完成 | 实体地基 + Schema 修复 | 68-70 |
| Week 3-4 完成 | B2B 目录 + 内容修复 | 72-75 |
| 3-6 个月 | Reddit 持续参与 + 视频生态 + 第三方引用积累 | 80+ |

> **一句话总结**：站内已经不是瓶颈。接下来 90 天，把改代码的时间全部换成站外实体建设——Wikidata、B2B 目录、Reddit、YouTube——这是从 63 分到 80 分的唯一路径。

---

## Appendix: 审计范围

| 数据源 | 覆盖 |
|--------|------|
| 线上实测 | robots.txt、llms.txt ×5、Content-Signal header、sitemap ×5、首页 + 3 篇博客原始 HTML、UA 模拟（GPTBot/ClaudeBot/PerplexityBot） |
| 本地源码 | `C:\Users\wowoh\wowohcool.com\`（_headers、.eleventy.js、构建产物） |
| 站外核查 | Wikipedia API、Reddit/Quora 搜索、Alibaba/Made-in-China/Global Sources、LinkedIn、YouTube、天眼查、商标数据库 |
| Schema 验证 | 首页 + 博客 + 产品页 3 类模板的完整 JSON-LD 解析 |
