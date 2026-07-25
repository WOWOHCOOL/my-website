# GaN Generations Guide — 全面 SEO 分析报告

**分析日期**: 2026-07-25  
**文件**: `wowohcool.com/src/blog/gan-generations-guide/index.njk`  
**URL**: `https://www.wowohcool.com/blog/gan-generations-guide/`  
**发布日期**: 2026-05-14  
**最后修改**: 2026-07-25  
**实际字数**: 4,453  
**作者**: Nina Nico  

---

## 1. 内容健康总分

| 维度 | 得分 | 权重 | 加权 |
|------|------|------|------|
| **B2B 内容质量** | 92.7/100 | 35% | 32.4 |
| **信息增益** | 68/100 | 20% | 13.6 |
| 关键词与可读性 | ~55/100 | 15% | 8.3 |
| Schema 标记 | 100 | 10% | 10.0 |

> **综合加权评分: ~73/100**

---

## 2. B2B 审计 (92.7/100)

### ✅ 满分项 (10/12 检查)

Opening 100, TL;DR 100, **H3 Answer Length 100**, Vague 100, Data Density 100, Table 100, Stock 100, CTA 100, Hierarchy 100, URL 100, Schema 100

### 🔴 需修复

| 检查项 | 得分 | 问题 |
|--------|------|------|
| **H2 B2B Adjacency** | **70** | 4 个连续 H2（#7-#10）全部使用 "OEM" — 违反 adjacency cap |
| **FAQ B2B Language** | **45** | FAQ #2 body 回答与问题不匹配 + 17 词过长 |
| Cross-Reference | **N/A** | 审计工具无法比较（可能 TL;DR 或 FAQ 缺失部分） |

---

## 3. 🔴 关键 Bug: FAQ #2 Answer-Question Mismatch

**Body FAQ #2** (L333):
> Q: "What is the FOB price difference between GaN V and GaN III chargers at 1,000-unit OEM volume?"
> A: "For premium brand positioning, yes. The 20-35% BOM premium is offset by..."

回答以 "For premium brand positioning, yes." 开头 — 这回答了 "Is GaN V worth the premium?" 而非 "What is the FOB price difference?"。**这是一个真实的问答不匹配 bug**。

**建议修复**: 替换答案为实际 FOB 价格对比数据。

---

## 4. H2 分析

### Adjacency 违规

| # | H2 | B2B 词 |
|---|-----|--------|
| 7 | "Real-World GaN FET Models You'll See in 2026 **OEM** Quotes" | OEM |
| 8 | "How to Identify Real GaN V: **OEM** **Supplier** Verification" | OEM, Supplier |
| 9 | "**OEM** Decision Framework: Which Generation for Your Product Line?" | OEM |
| 10 | "GaN VI & SiC Hybrid: **OEM** Product Roadmap 2027-2029" | OEM |

4 个连续 H2 全部使用 "OEM"。修复：在 #7 或 #9 中替换为 "sourcing"/"manufacturer"/"factory"。

### H2 B2B Density: 5/12 = 41.7%

如果分类为 technical (10-40%)，略微超标。如果分类为 OEM core (50-80%)，则不足。文章实际跨度两种类型。

---

## 5. 快速修复

| 优先级 | 操作 | 工作量 |
|--------|------|--------|
| **P0** | FAQ #2 body 回答修正 — QA 不匹配 | 2 分钟 |
| **P0** | H2 adjacency — #7 或 #9 换 B2B 词汇 | 1 分钟 |
| **P0** | FAQ #2 问题缩短 — 17→12 词 | 1 分钟 |
| P1 | Schema FAQ #2 与 body FAQ #2 对齐 | 1 分钟 |

**建议**: 运行 `/optimize` — 3 个 P0 修复共约 5 分钟。
