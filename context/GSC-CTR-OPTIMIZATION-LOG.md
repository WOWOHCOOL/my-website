# GSC CTR 优化日志（持续更新）

> **本文件是 GSC CTR 优化的单一归档点**——所有 GSC 相关的诊断、优化执行、复查、选题审计都写入这里。合并自 `GSC-CTR-OPTIMIZATION-REPORT-2026-08-07.md` 与 `2026-08-12.md` 两份报告，后续按日期追加。
>
> **站点**: sc-domain:wowohcool.com

---

## Part 1 · 基线诊断（2026-08-07）

**数据范围**: 2026-07-10 ~ 2026-08-05（28 天）

### 1.1 总体数据

| 指标 | 数值 |
|---|---|
| 总点击 | **109** |
| 总展示 | **25,169** |
| 整体 CTR | **0.43%** |
| 平均排名 | **10.2** |
| CTR 趋势 | 下降（前 13 天 0.51% → 后 13 天 0.39%，展示量 +71.3%） |

### 1.2 品牌 vs 非品牌 CTR（核心发现）

| 维度 | 查询数 | 点击 | 展示 | CTR | 点击占比 |
|---|---|---|---|---|---|
| 品牌 (wowohcool) | 2 | **15** | 56 | 26.79% | **65.2%** |
| 非品牌 | 659 | **8** | 2,830 | **0.28%** | 34.8% |

> 品牌查询拿走 2/3 的点击。非品牌近一个月仅 8 次点击，每个查询只点了 1 次。

### 1.3 排名段 CTR 分析

| 排名段 | 查询数 | 点击 | 展示 | CTR | 行业基准 | 状态 |
|---|---|---|---|---|---|---|
| 1-3 (Top) | 55 | 2 | 92 | 2.17% | 7-30% | 严重偏低 |
| 4-6 | 55 | 2 | 263 | 0.76% | 2-5% | 严重偏低 |
| 7-10 | 196 | 2 | 1,309 | 0.15% | 1-2.5% | 严重偏低 |
| 11-20 | 140 | 17 | 564 | 3.01% | 0.5-1.5% | 正常 |
| 21-50 | 179 | 0 | 564 | 0% | 0.1-0.5% | 正常 |
| 50+ | 36 | 0 | 94 | 0% | <0.1% | 正常 |

> Top-3 仅 92 次展示（占总展示 0.36%），说明站点几乎没有高流量关键词排在首页第一。

### 1.4 零点击大流量查询（优化目标）

| 查询 | 展示 | 排名 | 零点击原因 |
|---|---|---|---|
| battery charger market trends 2026 industry analysis | 205 | 8.7 | AI Overview 给摘要 |
| hs code for power bank | 142 | 8.9 | PAA 直接显示编码 |
| qi zertifizierung | 60 | 16.3 | 德语查询，英文内容 |
| gan 2 vs gan 3 | 51 | 8.7 | SERP 对比表格回答 |
| power bank hs code | 47 | 7.3 | PAA 直接显示编码 |
| gan vs gan ii | 46 | 9.8 | Knowledge Panel |
| gan alternatives | 44 | 21.4 | SERP 列表回答 |
| charging solution for oem | 42 | 41.4 | 排名太靠后 |
| gan powered chargers market | 37 | 12.0 | 排名 + 信息型查询 |
| gan ii vs gan iii | 35 | 8.4 | SERP 对比回答 |

### 1.5 低 CTR 页面 Top 10

| 页面 | 展示 | 点击 | CTR | 排名 |
|---|---|---|---|---|
| /blog/import-costs-guide/ | 3,692 | 7 | 0.19% | 8.2 |
| /blog/certifications-us-eu-guide/ | 3,260 | 3 | 0.09% | 8.7 |
| /blog/gan-generations-guide/ | 2,502 | 18 | 0.72% | 9.1 |
| /blog/top-power-bank-manufacturers-china/ | 2,370 | 16 | 0.68% | 8.2 |
| /blog/charger-safety-standards/ | 1,583 | 2 | 0.13% | 9.8 |
| /blog/gan-vs-silicon-charger-comparison/ | 1,436 | 1 | 0.07% | 8.4 |
| /blog/charging-accessory-market-trends-2026/ | 943 | 1 | 0.11% | 9.4 |
| /blog/gan-chargers-guide/ | 812 | 0 | 0% | 10.0 |
| /blog/usb-c-pd-fast-charging-guide/ | 691 | 0 | 0% | 11.9 |
| /blog/qi2-vs-magsafe-guide/ | 682 | 1 | 0.15% | 15.1 |

### 1.6 根因诊断

**0.4% CTR 不是页面优化不足，而是内容策略层面的选题-意图错配：**

1. 659 个非品牌查询中，绝大部分是 Google 能在 SERP 直接回答的 **informational 查询**（HS code 查询、市场趋势、技术对比定义）
2. 这些查询的展示被 AI Overview、Featured Snippet、People Also Ask、Knowledge Panel 零点击消化
3. 即使 Schema 完美、H1 完美、title/meta 优化过，用户不需要点进页面就能得到答案
4. 真正产生点击的查询是高度具体的商业意图查询（"oem power bank manufacturer"、"gan5 vs gan3"），但这类查询展示量极少

---

## Part 2 · 优化执行（2026-08-06 ~ 08-07）

### 2.1 内容深度 + 搜索意图对齐（2026-08-06）

三篇文章独立优化，共用策略：对齐搜索意图 + B2B 信息增益 + 内链强化。

| 文章 | 改动 | 搜索意图对齐 |
|---|---|---|
| import-costs-guide (`dec6ec02`) | +119 行，新增 §6 "Worked Example: 5,000 GaN Chargers — Full Landed Cost"（US Landed Cost / EU Rotterdam / FOB vs DDP vs Air） | 用户要「我的货到底花多少钱」，给计算实例 |
| charger-safety-standards (`ece47dbc`) | +123 行，新增 §3 "IEC 62368-1 Testing Checklist: 6 Tests"（Hi-Pot / Temp Rise / Single Fault / Creepage / Enclosure / BOM Locked List） | 用户要「怎么知道安全不安全」，给可操作测试清单 |
| certifications-us-eu-guide (`8085862b`) | +65 行，新增 §9 "How to Verify Charger Certifications Are Real"（FCC ID Lookup / UL File / CE DoC / GS Mark / Visual Red Flags） | 用户要「证书真假怎么验」，给数据库查询方法 |

### 2.2 Snippet 抓取格式优化（2026-08-07）

| 页面 | 目标查询 | 改动 |
|---|---|---|
| gan-generations-guide (P1) | gan 2 vs gan 3 / gan vs gan ii / gan ii vs gan iii | 顶部加 "Quick OEM Comparison" 区块，3 个 snippet-optimized H3 + 7 列对比表（含 BOM/FOB/认证成本列），wordCount 5200 |
| import-costs-guide (P2) | hs code for power bank | 加 "HS Code Quick Reference" + 3 子目陷阱对比表 + 工厂证书检查清单，wordCount 5400 |
| charging-accessory-market-trends-2026 (P3) | （建立第一手数据权威） | 加 "Factory Shipment Data — Q2 2026"（GaN V 52%、多口 78%、65W FOB $5.40-7.20）+ 区域订单分布 + 功率段迁移，wordCount 4200 |

**Commit**: `dcb07b50` / `bc87429f`

---

## Part 3 · 复查（2026-08-10）— 3 天数据追踪

**数据范围**: 2026-07-13 ~ 2026-08-10（28 天滑动窗口）

### 3.1 总体指标：点击 +6.4%，CTR 被展示量稀释

| 指标 | 优化前 (8/7) | 优化后 (8/10) | 变化 |
|---|---|---|---|
| 总点击 | 109 | **116** | **+7 (+6.4%)** |
| 总展示 | 25,169 | 27,942 | +2,773 (+11.0%) |
| 整体 CTR | 0.43% | 0.42% | -0.01pp（展示量稀释，非优化失败） |
| 平均排名 | 10.2 | 10.3 | ≈ 持平 |

> CTR 下降不是优化失败——点击量上升 6.4%，展示量上升更快（+11%），CTR 被分母稀释。

### 3.2 排名段 CTR 变化：7-10 段翻倍，snippet 优化生效

| 排名段 | 8/7 CTR | 8/10 CTR | 变化 | 判断 |
|---|---|---|---|---|
| 1-3 | 2.17% | 2.25% | +0.08pp | 基准太低，仍严重低于行业 7-30% |
| 4-6 | 0.76% | 0.72% | -0.04pp | ≈ 持平 |
| **7-10** | **0.15%** | **0.28%** | **+0.13pp (+87%)** | ✅ **snippet 优化核心收益区间** |
| 11-20 | 3.01% | 3.54% | +0.53pp | ✅ 改善 |

> 7-10 排名段是 snippet 优化的目标区间。这个段 CTR 几乎翻倍，说明 8/7 的对比表 + 直接答案片段格式优化在产生效果。

### 3.3 日均 CTR 趋势

| 日期 | CTR | 点击 | 展示 | 排名 | 备注 |
|---|---|---|---|---|---|
| 8/5 | 0.23% | 3 | 1,300 | 10.2 | 优化前一天 |
| 8/6 | 0.11% | 3 | 2,750 | 12.0 | 内容深度优化日（展示暴增拉低CTR） |
| **8/7** | **0.54%** | 6 | 1,110 | **7.4** | ✅ snippet优化日，排名+CTR双最佳 |
| 8/8 | 0.42% | 5 | 1,202 | 8.2 | 维持改善 |

### 3.4 新发现：DE 页面 CTR 系统性地 3-10 倍优于 EN

| 页面 | 语言 | 展示 | CTR |
|---|---|---|---|
| /de/blog/qualitaetskontrolle-china/ | DE | 33 | **6.06%** |
| /de/blog/semi-solid-state-powerbank/ | DE | 47 | **4.26%** |
| /de/blog/powerbank-hersteller-china-oem-partner/ | DE | 61 | **3.28%** |
| /de/blog/gan-generationen-uebersicht/ | DE | 271 | **2.21%** |
| /de/blog/gan-vs-silizium-ladegeraete-vergleich/ | DE | 143 | **2.10%** |

> EN 博客整体 CTR 仅 0.30%，DE 页面最低 2.10%——至少 7 倍差距。

---

## Part 4 · 深度复盘（2026-08-12）

**数据范围**: 2026-07-15 ~ 2026-08-12（28 天滑动窗口）

### 4.1 总体指标演变

| 指标 | 8/7 基线 | 8/10 复查 | **8/12 最新** |
|---|---|---|---|
| 总点击 | 109 | 116 | **113** |
| 总展示 | 25,169 | 27,942 | **27,584** |
| 整体 CTR | 0.43% | 0.42% | **0.41%** |
| 平均排名 | 10.2 | 10.3 | **10.2** |
| 非品牌 CTR | 0.28% | — | **0.39%** (+39%) |

> 非品牌 CTR 从 0.28% 提升到 0.39%，品牌点击占比从 65.2% 降到 59.3%——方向正确。

### 4.2 语言维度 CTR

| 语言 | 页面数 | 展示 | 点击 | CTR | 排名 | vs EN |
|---|---|---|---|---|---|---|
| EN | 29 | 22,182 | 52 | **0.23%** | 9.5 | 1× |
| **DE** | 27 | 1,517 | 16 | **1.05%** | 11.4 | **4.6×** |
| **ES** | 28 | 668 | 5 | **0.75%** | 7.5 | **3.3×** |
| FR | 16 | 375 | 0 | 0.00% | 13.4 | — |
| RU | 4 | 19 | 0 | 0.00% | 8.7 | — |

> EN 排名最好（9.5），CTR 却最差（0.23%）。排名不是问题。

### 4.3 设备维度 CTR

| 设备 | 展示占比 | CTR | 排名 |
|---|---|---|---|
| Desktop | 85.2% | **0.27%** | 10.6 |
| **Mobile** | 14.3% | **1.22%** | 8.2 |
| Tablet | 0.5% | 0.77% | 9.0 |

> Mobile CTR 是 Desktop 的 4.5 倍。

### 4.4 6 篇优化页面追踪

| 页面 | 8/7 | 8/10 | 8/12 | 趋势 |
|---|---|---|---|---|
| top-power-bank-manufacturers | 0.68% | 0.69% | **0.68%** | 稳定 |
| gan-generations-guide | 0.72% | 0.56% | **0.53%** | ⚠️ 持续下降 |
| import-costs-guide | 0.19% | 0.22% | **0.20%** | ≈ 持平 |
| gan-vs-silicon-charger | 0.07% | 0.06% | **0.13%** | ↑ 改善 |
| charger-safety-standards | 0.13% | 0.10% | **0.10%** | ≈ 持平 |
| certifications-us-eu-guide | 0.09% | 0.10% | **0.08%** | ≈ 持平 |

### 4.5 三项深度排查结果

**① gan-generations-guide 查询级 CTR 分解**

- 排名提升 2.4 位（9.7→7.3），但 CTR 降到零——排名和 CTR 脱钩
- 3 个 snippet 目标查询（gan 2 vs gan 3 / gan vs gan ii / gan ii vs gan iii）优化前后都是零点击——Google 直接 SERP 显示对比信息
- 结论：Snippet 优化对 GaN vs 类查询无效——结构性零点击 SERP。CTR 下降主要是 8/6 展示暴增 + 自然方差，不是优化做错

**② gan 3 vs gan 6 消失排查**

- 28 天总量 15 展示 1 点击，日均 0.5 次——从来不是稳定流量来源
- 优化前（Week 2 7/22-28）就曾消失整整一周，和优化时间线只是巧合
- 结论：统计噪声，不是可诊断的流量损失

**③ DE vs EN CTR 根因分析（按重要性排序）**

1. **EN 的展示被少数大流量零点击查询污染**——top 5 零点击查询占 EN 总展示 19.5%，全部零点击。DE 没有等效「流量怪兽」查询
2. **DE 内容选题天然避开零点击陷阱**——半固态电池测试数据、中国工厂质检流程、OEM 供应商评估，这些 Google 不能在 SERP 直接回答
3. **DE SERP 竞争更弱**——53.2% EN 展示被零点击消化 vs 44% DE
4. **德国 B2B 买家点击意愿更强**

---

## Part 5 · EN 选题审计（2026-08-12）

**审计范围**: 29 篇 EN 博客 | 22,182 展示 | 52 点击 | 整体 CTR 0.23%

### 5.1 风险等级分类

**CRITICAL（6 篇）— 立即重写**

| 文章 | 展示 | CTR | 零点击根因 |
|---|---|---|---|
| import-costs-guide | 3,452 | 0.20% | HS code 查询 ZC Score=276——Google 直接显示编码 |
| gan-vs-silicon-charger-comparison | 1,520 | 0.13% | "vs/对比" 查询——SERP 直接给对比表 |
| charging-accessory-market-trends-2026 | 920 | 0.00% | "market trends/analysis" ZC Score=400——AI Overview 垄断 |
| qi2-vs-magsafe-guide | 829 | 0.12% | "vs"+"compliance"——SERP 对比/Knowledge Panel |
| qi-certification-guide | 294 | 0.00% | "compliance"——认证状态 Google 直接显示 |
| usb-c-pd-3-1-explained | 60 | 0.00% | "explained"——协议定义 Google 直接回答 |

**HIGH（2 篇有效文章）— 加实操内容**

| 文章 | 展示 | CTR | ZC% | 策略 |
|---|---|---|---|---|
| certifications-us-eu-guide | 3,969 | 0.08% | 35% | 已有验证章节(8/6)但被淹没，需前置+扩展 |
| gan-generations-guide | 2,822 | 0.53% | 66% | 有 3 次点击但 66% 展露在 vs 对比零点击陷阱 |

**LOW（21 篇）** — 不动或流量太低。正向信号：power-bank-private-label (1.15%)、what-is-gan-charger (0.57%)、gan-v-charger-oem-manufacturing (0.32%)

### 5.2 按话题类型分类

| 类型 | 篇数 | 展示 | CTR | 判断 |
|---|---|---|---|---|
| **SUPPLIER_SOURCING** | 8 | 3,549 | **0.59%** | ✅ 最好——继续投入 |
| GAN_TECH_COMPARISON | 6 | 5,442 | 0.33% | ⚠️ vs 对比是陷阱 |
| IMPORT_LOGISTICS | 2 | 3,496 | 0.20% | ⚠️ HS code 查询拉低 |
| CERTIFICATION_COMPLIANCE | 3 | 6,330 | 0.08% | 🔴 最大展示池最低 CTR |
| WIRELESS_TECH | 2 | 952 | 0.11% | ⚠️ vs + compliance |
| **MARKET_TRENDS** | 1 | 920 | **0.00%** | 🔴 **禁止再写** |
| CHARGING_PROTOCOL | 2 | 809 | 0.00% | ⚠️ "explained" 纯信息型 |
| CHARGER_GENERAL | 2 | 350 | 0.00% | 低优先级 |
| OTHER | 3 | 334 | 0.00% | 低优先级 |

### 5.3 核心发现

1. **选题踩中零点击陷阱**——6 篇 CRITICAL 页面的话题 Google 都能在 SERP 直接回答
2. **操作型选题也写成了信息型**——factory-verification-checklist、how-to-choose-factory 标题是操作指南，内容仍停留在概念解释
3. **SUPPLIER_SOURCING 是唯一健康的话题类型**——CTR 0.59%，无零点击模式

---

## Part 6 · 转型执行（2026-08-13）

### 6.1 「2 周内」两篇转型完成

| 文章 | 展示/CTR | 转型前 H1 | 转型后 H1 |
|---|---|---|---|
| gan-vs-silicon-charger-comparison | 1,520 / 0.13% | GaN vs Silicon Charger: OEM Cost & Performance Comparison | GaN vs Silicon Charger: 3-Year Total Cost of Ownership for OEM |
| charging-accessory-market-trends-2026 | 920 / 0.00% | 2026 Market Trends: B2B OEM Sourcing & Technology Forecast | 2026 Charger Factory Data: What OEM Buyers Are Ordering |

- **gan-vs-silicon**：规格对比 → 3 年 TCO 决策框架。保留 "GaN vs Silicon Charger" 前缀（维持查询相关性），重心移 "3-Year TCO"（Google 无法直接回答）。目标 0.13% → 0.5%+
- **market-trends**：市场报告 → 工厂订单数据。H1 改 "Charger Factory Data"（第一手数据）。工厂数据章节前置为开篇主线。目标 0.00% → 0.3%+

### 6.2 不紧急 3 篇转型完成

| 文章 | 转型后 H1 |
|---|---|
| qi2-vs-magsafe-guide | Qi2 vs MagSafe: 3-Year TCO & Sourcing Cost for OEM Buyers |
| qi-certification-guide | Qi2 Certification Verification: How to Spot Fake WPC Certificates |
| usb-c-pd-3-1-explained | 清理封面 alt/title 的 explained/comparison 残留 |

### 6.3 内容优化（基于 SERP 市场调查，先研究后改）

- **qi2-vs-magsafe**：MFi royalty 校准 $4-6 → $1-3/unit；新增「8. 3-Year TCO」章节（per-unit royalty / 年费 / 3 年累计 / 认证费）；竞品 amjortech 已覆盖成本对比但未量化 3 年累计 → 信息增益
- **qi-certification**：新增「8. How to Verify WPC Certificates Are Real」章节（WPC 数据库查询 + 6 假证书套路 + 3 项下单前检查），WOWOHCOOL 用「WPC 成员 + 工厂」第一手视角差异化
- **usb-c-pd-3-1**：内容已是 Factory Sourcing（H2 全是 What to Verify / Sourcing），无需内容优化

### 6.4 验证计划

| 文章 | 基线 CTR | 目标 CTR | 复查时间 |
|---|---|---|---|
| gan-vs-silicon-charger-comparison | 0.13% | 0.5%+ | 8/18-8/20 |
| charging-accessory-market-trends-2026 | 0.00% | 0.3%+ | 8/18-8/20 |

---

## 快照记录（汇总）

| 快照 | 文件 | CTR | 备注 |
|---|---|---|---|
| 基线（优化前） | `gsc_snapshots/baseline-pre-p1_20260807_212031.json` | 0.43% | 7/10-8/5 |
| Schema 100% | `gsc_snapshots/after-schema-100pct_20260807_212736.json` | 0.43% | — |
| Snippet 优化后 | `gsc_snapshots/after-p1-p2-p3-snippet-opt_20260807_215021.json` | 0.43% | — |
| 8/10 复查 | `gsc_snapshots/post-opt-check-20260810_20260810_171257.json` | 0.42% | 7/13-8/10 |
| 8/12 复盘 | — | 0.41% | 7/15-8/12 |

---

## 关键文件（汇总）

| 文件 | 用途 |
|---|---|
| `data_sources/gsc_ctr_analysis.py` | 10 维度 CTR 深度诊断脚本 |
| `data_sources/gsc_ctr_monitor.py` | CTR 快照 + 趋势对比脚本 |
| `data_sources/gsc_fresh_check.py` | 多维度实时 GSC 数据拉取（8/12 新建） |
| `data_sources/gsc_gan_deep_dive.py` | 单页面查询级 CTR 分解（8/12 新建） |
| `data_sources/gsc_gan3vs6_investigation.py` | 单查询 SERP 消失排查（8/12 新建） |
| `data_sources/gsc_de_ctr_analysis.py` | DE vs EN 多维度根因分析（8/12 新建） |
| `data_sources/gsc_snapshots/` | GSC 快照存储目录 |

---

## 行动路线图（进行中）

### 短期

| # | 行动 | 预期 |
|---|---|---|
| 1 | 审计 EN 博客选题清单——逐篇检查零点击风险 | 重写清单 + 新选题方向 |
| 2 | 重写 import-costs-guide HS code 章节 →「HS Code Declaration Mistakes That Cost Importers 5-15% Duty」 | CTR 0.20% → 0.5%+ |
| 3 | top-power-bank-manufacturers 加「询盘对比框架」供应商评估矩阵 | 加深转化 |

### 中期

| # | 行动 | 理由 |
|---|---|---|
| 4 | 写 3 篇「必须点击」EN 新文章（Semi-Solid-State Test Data / Factory Audit Checklist / Verify Certificates） | 复刻 DE 5% CTR 模式 |
| 5 | 扩展 ES 博客（CTR 0.75%，EN 的 3.3 倍） | 西语竞争更弱 |
| 6 | 手机端格式专项优化（Mobile CTR 是 Desktop 4-8 倍） | 保护高 CTR 渠道 |

### 不做的事

- ❌ 不再为 GaN vs 类对比查询做 snippet 优化——已证明无效
- ❌ 不再写「HS code 是多少」「认证有哪些」「市场规模多大」类纯信息型文章
- ❌ 不在数据未追上时对页面做更多改动

### 持续监控

```bash
# 多维度实时指标追踪（每 5 天）
python data_sources/gsc_fresh_check.py

# CTR 快照 + 趋势对比
python data_sources/gsc_ctr_monitor.py --compare

# 快速看最近几天 CTR
python data_sources/gsc_ctr_monitor.py --quick
```

---

*合并生成: 2026-08-17 | 来源: GSC-CTR-OPTIMIZATION-REPORT-2026-08-07.md + 2026-08-12.md | 后续 GSC 优化按日期在此追加*

---

## Part 7 · 复查（2026-08-17）— 8/13 转型 5 天后数据追踪

**数据范围**: 2026-07-20 ~ 2026-08-17（28 天滑动窗口）
**复查目标**: 8/13 两篇转型（gan-vs-silicon → 3-Year TCO、market-trends → Factory Data）+ 整体趋势

### 7.1 博客总体指标

| 指标 | 8/12 复盘 | **8/17 最新** | 变化 |
|---|---|---|---|
| 博客页数 | 112 | 112 | 新增 FR/RU/PL GaN 代际 3 篇已入池 |
| 博客点击 | ~52 (EN) | **80**（全站博客） | — |
| 博客展示 | 27,584 | **33,027** | +5,443 (+19.7%) |
| 博客 CTR | 0.41%（全站） | **0.24%**（博客） | 口径不同，见下 |
| 平均排名 | 10.2 | 10.2 | 持平 |

> ⚠️ 口径注意：8/12 的「整体 CTR 0.41%」含产品页，本次 fresh_check 的「博客 CTR 0.24%」仅博客页，两者不可直接对比。**博客本身 CTR 仍 0.24%，结构性零点击问题未解。**

### 7.2 两篇转型页面复查（核心验证目标）

| 页面 | 转型前 CTR | 8/17 CTR | 展示 | 排名 | 判断 |
|---|---|---|---|---|---|
| gan-vs-silicon-charger-comparison | 0.13% | **0.17%** | 1,752 | **7.5** | ✅ 弱正向（+31% CTR，排名 8.4→7.5） |
| charging-accessory-market-trends-2026 | 0.00% | **0.00%** | 1,368 | 11.3 | ⚠️ 无信号（展示 920→1,368 但 0 点击） |

**初步结论（5 天窗口，GSC 延迟 2-3 天，实际可见 post-opt 数据仅 2-3 天）**：

1. **gan-vs-silicon → 3-Year TCO**：弱正向信号——CTR +31%、排名 +0.9 位。方向对，但距 0.5% 目标仍远。TCO 转型需要 Google 重新评估内容，结论尚早。
2. **market-trends → Factory Data**：仍 0 点击。但这是更激进的转型（H1 全换），Google 重索引 + 重新排名需要更久。展示量反而 +48%（920→1,368），说明标题相关性没丢。

> 结论：**现在下结论过早**。原计划 8/18-8/20 复查（累积 5-7 天 post-opt 数据），今天 8/17 仍差 1-3 天。gan-vs-silicon 的弱正向是唯一可读信号。

### 7.3 语言维度：ES 反超成为最高 CTR（新发现）

| 语言 | 页数 | 点击 | 展示 | CTR | vs EN |
|---|---|---|---|---|---|
| EN | 28 | 56 | 30,077 | 0.19% | 1× |
| DE | 28 | 14 | 1,629 | 0.86% | 4.5× |
| **ES** | 29 | 9 | 753 | **1.20%** | **6.3×** |
| FR | 19 | 0 | 466 | 0.00% | — |
| RU | 8 | 1 | 102 | 0.98% | 5.2× |

> **ES 从 8/12 的 0.75% 升至 1.20%，成为全站最高 CTR 语言**（6.3× EN）。8/12 的「扩展 ES」建议被数据强力验证——ES 展示仅 753（EN 的 1/40），但 CTR 是 EN 的 6 倍，是明确的低挂果实。
>
> FR/RU 新文章（8/17 发布）尚未有数据，0 点击正常。

### 7.4 品牌 vs 非品牌 + 设备

| 维度 | 数据 |
|---|---|
| 品牌 CTR | 18.42%（1 查询，14 点击） |
| 非品牌 CTR | 0.32%（686 查询，10 点击） |
| Desktop | 0.23% CTR（31,765 展） |
| **Mobile** | **1.14%** CTR（4,574 展，Desktop 的 5 倍） |
| Tablet | 2.07% CTR（145 展） |

> 非品牌 CTR 0.32%（8/7 基线 0.28% → 8/12 0.39% → 8/17 0.32%，波动）。Mobile 5 倍 Desktop 的模式持续成立。

### 7.5 国家维度：美国是最大零点击黑洞

| 国家 | 点击 | 展示 | CTR |
|---|---|---|---|
| **usa** | 23 | **24,071** | **0.10%** |
| deu | 15 | 1,805 | 0.83% |
| fra | 7 | 680 | 1.03% |
| ind | 6 | 479 | 1.25% |
| esp | 7 | 329 | **2.13%** |

> 美国占博客展示 73%（24,071/33,027）但 CTR 仅 0.10%——**单一市场拖垮全局**。美国 SERP 被 AI Overview 零点击消化最严重（informational 查询 0.69% vs commercial 1.20%）。

### 7.6 综合判断

| 项 | 判断 | 置信度 |
|---|---|---|
| gan-vs-silicon 转型 | 弱正向，方向对，需再等 3-5 天 | 中（窗口太短） |
| market-trends 转型 | 无信号，需再等 | 中（窗口太短） |
| ES 扩展优先级 | **强烈验证**——ES CTR 1.20% 全站最高 | 高 |
| 结构性零点击（美国 informational） | 未变，需持续转商业意图 | 高 |

### 7.7 下一步（更新）

1. **8/20-8/22 再复查**两篇转型（届时 7-9 天 post-opt 数据，可下结论）
2. **ES 扩展升为最高优先级**——ES CTR 1.20%（6.3× EN）、展示仅 753，写 3-5 篇 ES 商业意图新文章
3. **美国零点击持续治理**——美国 24K 展示 0.10% CTR 是最大拖累，informational 查询继续转 commercial/第一手数据角度
4. **修 gsc_fresh_check.py 的 comparison 段 bug**（"CTR 42.00%" 显示异常，百分比格式化错误，不影响核心数据但需修）
5. gan-generations-guide 继续观察——8/12 曾持续下降（0.72→0.53%），8/17 回升到 0.47% 且 16 点击（为 6 篇优化页中最高点击），趋势反转待确认

### 7.8 快照

| 快照 | CTR | 数据范围 |
|---|---|---|
| 8/12 复盘 | 0.41%（全站）| 7/15-8/12 |
| **8/17 复查** | **0.24%**（博客）| 7/20-8/17 |

### 7.9 根因分析：为什么结构性零点击未变？

结构性零点击（博客 CTR 0.24%、非品牌 0.32%、美国 0.10%）在 8/6~8/13 三轮优化后**没有实质变化**。根因不是「优化没做到位」，而是六个层层叠加的结构性问题：

**1. 优化覆盖范围太小（~18%）**

8/13 只转型了 5 篇（2 核心 + 3 不紧急），占 28 篇 EN 博客的 ~18%。其余 24 篇仍是信息型/定义型（"what is" / "vs" / "market trends" / "hs code" / "certification"），零点击陷阱的主体未动。**局部手术治不了系统性选题病。**

**2. 窗口太短（数据未追上）**

5 天窗口，GSC 延迟 2-3 天，实际可见 post-opt 数据仅 2-3 天。Google 重索引 + 重新排名需要 5-14 天。8/13 转型的真实效果最早 8/20 才可见。

**3. 根因在查询层，不在页面层**

569 个信息型查询（占点击份额 79.2%）是 Google **已在 SERP 直接回答**的查询（AI Overview / Featured Snippet / PAA / Knowledge Panel）。无论页面 Schema、H1、对比表做得多好，用户「不需要点击就能得到答案」这一事实不会改变。**这是查询层级的零点击，页面优化无法触及。**

**4. Google SERP 零点击特征持续扩张（外部趋势）**

AI Overview 等零点击特征越来越激进地消化信息型查询。这是 Google 产品方向，站点优化无法逆转。与其对抗，不如避开——只写 Google 无法在 SERP 直接回答的内容。

**5. 美国市场最严重（单一市场拖垮全局）**

美国占博客展示 73%（24,071/33,027），CTR 仅 0.10%。美国 SERP 是 AI Overview 最饱和的市场。站点在最差的市场上打信息型查询，全局 CTR 被美国单一市场稀释。

**6. 根本错配：内容策略 vs Google 服务方式**

站点核心策略是「写信息型指南做 SEO」，而 Google 现在对信息型查询的默认服务方式是「零点击直接回答」。两者根本错配。**解药不是「把信息型页面优化得更好」，而是「停止写信息型内容，转向商业意图 + 第一手数据」。**

---

**核心结论**：结构性零点击是**策略层问题，不是执行层问题**。三轮优化（内容深度 / snippet 格式 / 标题转型）证明了「优化信息型页面」的杠杆有限。真正的三个杠杆是：

1. **大规模转向商业意图选题**——commercial 查询 CTR 1.20% vs informational 0.69%，且商业查询点击份额仅 20.8%（还有大量空间）
2. **第一手数据（工厂数据）让 Google 无法直接回答**——DE/ES 高 CTR 页面的共同点是「测试数据 / 质检流程 / 供应商评估」这些 Google 不能编造的内容
3. **转向竞争更弱的市场**——ES（1.20%）、DE（0.86%）、RU（0.98%）CTR 都远超 EN（0.19%），同样的内容在非英语市场零点击少得多

**下一步不变**（Part 7.7）：8/20 复查两篇转型 → ES 扩展最高优先级 → 美国零点击治理。但根本上，后续新内容选题要**默认排除信息型**，只写「Google 无法直接回答」的商业意图 + 第一手数据内容。

*下次复查: 2026-08-20+ (两篇转型累积 7 天 post-opt 数据)*

---

## Part 8 · 执行更新（2026-08-17）— ES 扩展完成 + 选题铁律固化

### 8.1 P0 ES 扩展落地（3 篇）

8/12 行动路线图「P0 扩展 ES 博客」已落地——3 篇 ES 商业意图文章全部完成并推送：

| 文章 | slug | B2B | GEO | SEO | 角度 |
|---|---|---|---|---|---|
| Directiva Cargador Común USB-C | directiva-cargador-comun-usb-c-oem | 97.4 | 87 | 94 | 时效合规 + 计算实例 |
| Diferimiento del IVA | diferimiento-iva-importacion-oem | 92.6 | 85 | 93 | 现金流计算 + 申报流程 |
| Subvaloración / Código HS | subvaloracion-errores-codigo-hs-oem | 94.5 | 85 | 93 | 风险代价 + 归类陷阱 |

三篇都是「商业意图 + 第一手数据 + 风险/代价」角度，Google 无法直接回答，命中选题铁律。验证了「转向竞争更弱市场（ES）+ 商业意图选题」的杠杆。

### 8.2 选题铁律固化到 CLAUDE.md

Part 7.9 的根因分析已沉淀为 `CLAUDE.md` 的「内容选题铁律（GSC 零点击教训 · 强制）」章节——约束未来所有 `/research`、`/write` 选题：
- 禁止信息型选题（what is / vs 纯对比 / market trends / HS code 罗列）
- 必须商业意图 + 第一手数据 + 风险/代价角度
- 选题自检 4 问 + 市场优先级（ES/DE/RU 优先）

### 8.3 行动路线图更新

| 行动 | 状态 |
|---|---|
| P0 ES 扩展（3 篇） | ✅ 完成（8.1） |
| P1 EN 三篇「必须点击」文章 | ✅ 完成（8.4） |
| P2 import-costs-guide HS 章节重写 | ⬜ 待做 |
| 8/20 复查两篇转型（gan-vs-silicon / market-trends） | ⏳ 待 8/20 |

### 8.4 P1 EN 三篇「必须点击」落地（2026-08-18）

Part 4 行动 #4「复刻 DE 5% CTR 模式」已完成——三篇 EN 商业意图 + 第一手工厂数据文章，全部先做本土市场调查 + 竞品分析（brief），再撰写正文。

| 文章 | slug | 差异化角度 | 对标已发 EN 文章 | Brief |
|---|---|---|---|---|
| Semi-Solid State Nail Penetration Test — What OEM Buyers Must Verify | `semi-solid-state-nail-penetration-test-oem-verification` | 针刺测试第一手数据 + GB 47372-2026 协议 + Donut Lab 2026 欺诈案例 + 6 项供应商红旗 | `semi-solid-state-power-bank-oem` (采购验证角度差异化) | `brief-semi-solid-state-nail-test-verification-en-2026-08-18.md` |
| On-Site Factory Audit Checklist — 25 Points for Charger OEM Buyers | `on-site-factory-audit-checklist-china-charger-oem` | 25 点现场审核（SMT/aging/QC 实测）+ 8 张地理标记照片 + 充电器专项识别 | `factory-verification-checklist` (文档层) + `quality-control-guide` (QC 内部) 的实地补充 | `brief-factory-audit-onsite-checklist-en-2026-08-18.md` |
| How to Verify FCC / UL / CE Certificates on Chinese Chargers Are Real | `verify-fake-charger-certificates-fcc-ce-ul` | 5 分钟数据库交叉验证 + China Export CE 陷阱 + 8 项物理红旗 + Alibaba 现场核查案例 | `certifications-us-eu-guide` (需要哪些证) 的真伪验证补充 | `brief-verify-fake-charger-certificates-en-2026-08-18.md` |

**共同特征（命中选题铁律）**:
- ✅ Google 无法在 SERP 直接回答（都是操作型 + 第一手方法论）
- ✅ 引用工厂真实数据（QC 批次 #QC-2026-Q3-SS、200+ 审核经验、EEZ 客户合规案例）
- ✅ 商业意图（buyer 决定 PO / 供应商切换 / 拒绝出货）
- ✅ 风险/代价角度（$47K Amazon 停号损失 / 5-15% 关税 / 83% 退货率差）

**流程**:
1. 每篇先做 **WebSearch 美国 EN SERP + 竞品缺口分析** → 生成 brief（含差异化策略 + 数据点 + 内链）
2. 基于 brief + `factory-data-canonical.md` 真实数据 → 撰写 markdown 草稿到 `drafts/`
3. 三篇都包含 Nina Nico / Snowy May 作者签名 + LinkedIn + Sources 引文 + FAQ 7 条

**落地状态（2026-08-18 晚更新）**: 三篇已完整转换为 Nunjucks 模板（`wowohcool.com/src/blog/{slug}/index.njk`，13 面板 + 7 节点 Schema），并通过完整质量门：

| 文章 | b2b-audit | geo-citability | optimize | scrub (em-dash) |
|---|---|---|---|---|
| Semi-Solid Nail Test | 90.6 | 84 | 91 | 77→42 |
| Factory Audit Checklist | 91.4 | 86 | 93 | 100→24 |
| Verify Certificates | 92.6 | 89 | 92 | 55→32 |

**质量门流程**（每篇）: b2b-audit（wordCount 校准 + FAQ 逐字一致 + citation 补全）→ geo-citability（Hook 定义句 + 红旗表格 + 问题式标题）→ optimize（title 精简到 50-60 字符）→ scrub（不可见水印 0 + em-dash 密度精简）。

**剩余发布前手动步骤**:
1. 生成 3 张封面图 → `/image/blog/cover-en/`
2. hreflang 跨站映射确认（DE/ES/FR 对应页面是否同角度，跨站回退规则检查）
3. `git commit` + `git push` → Cloudflare Pages 部署
4. IndexNow 提交 3 个新 URL（Bing + Yandex）

**上线后验证**: 按 GSC CTR 追踪窗口（发布 +14/+28 天）。目标 CTR ≥ 0.8%（EN 平均 0.19% 的 4×，对齐 DE 页面基线）。

*下次复查: 2026-08-20+ (两篇转型累积 7 天 post-opt 数据；届时验证转型效果并决定 P2 优先级)*

---

## Part 9 · 复查（2026-08-20）— 两篇转型 7 天终审 + 停止存量优化

**数据范围**: 2026-07-23 ~ 2026-08-20（28 天滑动窗口）
**复查目标**: 8/13 两篇转型最终裁决 + 决定 P2 去留

### 9.1 两篇转型最终裁决（核心）

| 页面 | 转型前 | 8/17 | **8/20** | 目标 | 裁决 |
|---|---|---|---|---|---|
| gan-vs-silicon → 3-Year TCO | 0.13% | 0.17% | **0.16%**（1,901展/3点，排名7.5） | 0.5%+ | ❌ 弱效未达标 |
| market-trends → Factory Data | 0.00% | 0.00% | **0.00%**（1,439展/0点，排名11.3） | 0.3%+ | ❌ 无效 |

- **gan-vs-silicon**：排名 8.4→7.5 改善，但 1,901 展示仅 3 点击。"vs" 查询被 SERP 对比表零点击消化，TCO 角度未能撬动点击。
- **market-trends**：展示 +56%（920→1,439）证明标题相关性保留，但零点击纹丝不动——「market trends」informational 意图太强，换 H1 救不了。

> **终审结论**：两篇转型合起来是对「页面级优化/转型」路线的死刑判决。Part 7.9 的「查询层零点击，页面优化无法触及」从推测变为 7 天硬数据结论。即使是最激进的标题+角度转型，也无法改变结构性零点击查询的点击行为。

### 9.2 整体指标：博客 CTR 继续跌

| 指标 | 8/17 | 8/20 | 趋势 |
|---|---|---|---|
| 博客 CTR | 0.24% | **0.22%** | ↓ |
| EN CTR | 0.19% | **0.17%** | ↓ |
| 非品牌 CTR | 0.32% | **0.28%** | ↓ |
| 美国 CTR | 0.10% | **0.09%**（26,867展，占73%展示） | ↓ |
| 品牌点击占比 | 59.3% | **65.4%** | 品牌重新主导 |

### 9.3 语言维度：RU 反超成为全站最高 CTR

| 语言 | 页数 | 点击 | 展示 | CTR | vs EN |
|---|---|---|---|---|---|
| EN | 29 | 57 | 32,818 | 0.17% | 1× |
| DE | 28 | 12 | 1,637 | 0.73% | 4.3× |
| ES | 29 | 8 | 778 | 1.03% | 6.1× |
| FR | 19 | 1 | 483 | 0.21% | 1.2× |
| **RU** | 8 | 2 | **148** | **1.35%** | **7.9×** |

> RU 升至 1.35%（7.9× EN），展示仅 148——最小流量池 + 最高 CTR = 最大低挂果实。ES 1.03% 稳居第二（展示 778）。两者都是 EN 的 1/40-1/200 展示量，商业意图内容投放空间巨大。

### 9.4 决策：停止存量优化 + 放弃 P2

1. **❌ 放弃 P2（import-costs-guide HS 章节重写）**：market-trends 转型失败证明「在零点击查询上换角度」走不通。import-costs-guide 主查询 "hs code for power bank"（ZC Score=276）与 market-trends（ZC 400）是同类零点击陷阱，重写 HS 章节预期收益 ≈ market-trends 的 0 点击。
2. **❌ 停止 EN 信息型存量再优化**：三轮优化（内容深度 / snippet / 标题转型）+ 7 天验证 = 页面级杠杆已穷尽。EN 从 0.19% 一路到 0.17%，越优化越低。
3. **✅ 全部资源转向**：ES/RU 商业意图 + 第一手数据新内容（选题清单见 `research/es-ru-topic-pipeline-2026-08-20.md`）。

### 9.5 快照

| 快照 | CTR | 数据范围 |
|---|---|---|
| 8/17 复查 | 0.24%（博客） | 7/20-8/17 |
| **8/20 终审** | **0.22%**（博客） | 7/23-8/20 |

*下次复查: 三篇 EN「必须点击」+ 三篇 ES 新文累积 14 天 post-opt 数据（约 9 月初）*

---

## Part 10 · 执行更新（2026-08-20）— ES/RU 选题落地 + 首篇 EAC 移动电源文章完成

### 10.1 ES/RU 选题管线产出

Part 9.4 的「全部资源转向 ES/RU 商业意图内容」已落地，产出 `research/es-ru-topic-pipeline-2026-08-20.md`：

| 语言 | 必写 | 候选 |
|---|---|---|
| ES | 针刺测试验证 / 现场验厂 25 点 / 证书真伪验证 | 供应商评估矩阵 |
| RU | EAC 认证（ТР ТС）/ 针刺测试验证 / 证书真伪验证 | 现场验厂清单 |

**核心策略**：① 本地化三篇 EN「必须点击」角度（针刺/验厂/证书）② 补 RU 本土合规缺口（现有 RU 文章错误引用 EU 法规，缺 EAC/ТР ТС）。

### 10.2 RU P0-1 EAC 移动电源文章完成（首篇落地）

| 阶段 | 结果 |
|---|---|
| **选题修正**（先读再写） | 原「RU 无 EAC」不准确——充电器 EAC 已有（`sertifikaciya-zaryadnyh-ustroystv-oem`），真实缺口是**移动电源**（电池专项 UN38.3 + IEC 62133） |
| **俄语本土调研** | SERP 100% 中国代理机构（cu-tr.com.cn / gost-smk.com），零俄语 B2B 工厂视角 = 独占蓝海 |
| **法规核实** | №1669 文号正确，但日期（27.10.2025 非 1.1.2026）、机制（授权暂停非一律失效）、罚则（无具体 %）被二手来源夸大 → 全部修正 |
| **质量门** | b2b-audit 89.1 · geo-citability 84→~89 · optimize 92 |
| **Schema** | 7 节点 + FAQ 逐字一致 + 21 区域 areaServed |

**关键教训（沉淀为铁律）**：法规/数据引用必须核实官方原文（gov.ru / Росаккредитация / docs.cntd.ru），商业代理机构的转述会夸大日期、机制、罚则。`/scrub` 的 em-dash 替换是英文导向，对俄语不适用（57 处 тире 均为语法必需）。

### 10.3 标准更新

areaServed 升级为全局 21 区域列表（新增 PL + RU/KZ/BY/EAEU），更新 4 处：write-b2b 命令、b2b-multilingual-metadata-standard、b2b-schema-template、本文。解决了之前「RU 文章 areaServed 缺 RU/EAEU」的瑕疵。

### 10.4 行动路线图更新

| 行动 | 状态 |
|---|---|
| P0 ES 扩展（3 篇） | ✅ 完成（8.17） |
| P1 EN 三篇「必须点击」 | ✅ 完成（8.18） |
| P2 import-costs-guide HS 重写 | ❌ 放弃（9.4 裁决：零点击陷阱同类） |
| 8/20 复查两篇转型 | ✅ 完成（9.1：均失败，停止存量优化） |
| ES/RU 选题管线 → 8 篇 | ✅ 清单产出（10.1） |
| RU P0-1 EAC 移动电源 | ✅ 完成（10.2，待封面图 + 部署） |
| ES P0-1/2/3 + RU P0-2/3 | ⏳ 待启动 |

### 10.5 下一步计划

| # | 行动 | 优先级 |
|---|---|---|
| 1 | RU P0-1 封面图生成 + `git push` 部署 + IndexNow | P0（收尾当前篇） |
| 2 | ES P0-1/2/3 + RU P0-2/3 继续 `/research` → `/write-b2b` | P0（复用已验证流程） |
| 3 | 三篇 EN「必须点击」+ 三篇 ES 新文 14 天 GSC 复查 | ~9 月初 |
| 4 | 后续 RU/ES 文章一律套「本土 SERP + 官方原文核实」流程 | 铁律固化 |

*下次复查: 三篇 EN「必须点击」+ 三篇 ES 新文累积 14 天 post-opt 数据（约 9 月初）；届时验证「商业意图新内容」是否兑现 RU/ES 高 CTR 预期*
