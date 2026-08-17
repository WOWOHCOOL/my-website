# B2B Audit Report — GaN vs Silicium (FR)

**日期**: 2026-08-15 · **文章**: `src/fr/blog/gan-vs-silicium-comparaison-oem/index.njk`

---

## 总体得分：96.6 / 100（Excellent）

## 分项得分

| 检查项 | 得分 |
|---|---|
| Opening Density | 100 |
| TL;DR Block | 100 |
| H3 Answer Length | 100 |
| Vague Heading Detection | 100 |
| H2 B2B Signal Density | 100 |
| First-Hand Data Density | 100 |
| Table Test | 100 |
| Stock Photo Detection | 100 |
| FAQ B2B Language | 70 |
| Author E-E-A-T | 83 |
| Weak CTA Detection | 100 |
| Heading Hierarchy | 100 |
| URL Quality | 100 |
| Schema Validation | 90 |
| Static HTML Quality | 100 |
| Anti-Pattern Detection | 100 |
| Accent/Spelling (i18n) | 100 |

## 已修复的 Critical Issue（首轮 → 复跑）

1. ✅ BlogPosting 补 `mainEntityOfPage`（内联 WebPage @id = canonical URL）
2. ✅ Trailing slash mismatch（由 mainEntityOfPage 缺失导致，已随上一条解决）
3. ✅ 2 处 FAQ 答案 body/schema 不一致（`monoports`→`monoport` 单复数统一）
4. ✅ FAQ #1、#5 从 16 词缩短到 8 词（em-dash 格式，保留问号）

## 剩余建议（非代码缺陷，手动验证项）

- Rule 2 手动验证 FAQ 搜索需求（Google / 竞品 FAQ / Alibaba RFQ 交叉比对）
- 到 validator.schema.org 校验 JSON-LD
- Technical anchors 可再增（当前 6 个：pfc/spi/pd 3.1…），建议补 MOSFET/PCBA/CoolGaN/SiC 等

## Information Gain 分析

| 指标 | 值 |
|---|---|
| 总分 | 55/100（MODERATE） |
| Data Points | 251（100 分，优秀） |
| B2B Vocabulary | 8（80 分） |
| Technical Anchors | 6（18 分，偏低） |
| Named Entities | 6（47 分，中等） |

## wordCount 校验

- Schema wordCount = **2027**（已验证，与实际正文一致）
- 分析器报告 4352 为含 schema/SVG/HTML 的膨胀值，已按 Step 2.5 用 2027 覆盖

---

*报告由 /b2b-audit 生成 · 2026-08-15*
