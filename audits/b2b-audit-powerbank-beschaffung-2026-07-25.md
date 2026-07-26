# B2B Content Audit: Powerbank OEM-Beschaffung 2026 (DE)

**文件**: `src/de/blog/powerbank-beschaffung-leitfaden/index.njk`
**审核日期**: 2026-07-25
**文章类型**: Procurement/Supply Chain

---

## 综合评分

| 维度 | 分数 | 等级 |
|------|------|------|
| **B2B Content Audit** | 71.1/100 | C+ |
| **修正误报后** | **~86/100** | **A 级** |
| **Information Gain** | 46/100 | MODERATE |

---

## 审计详情

### 误报 (5 项)

| # | 检查 | 分数 | 实际 |
|---|------|------|------|
| 2 | KEY TAKEAWAYS | 0/100 | ✅ KERNERKENNTNISSE (amber-50, 4 bullets, 封面-TOC间) |
| 9 | FAQ B2B Language | 17/100 | ✅ 德语 B2B 词 (OEM/Pflichtenheft/Beschaffung/Importeur) |
| 11 | Weak CTA | 20/100 | ✅ gradient h2 CTA + blog-cta.njk |
| 12 | Heading Hierarchy | 25/100 | ⚠️ `<h4>` 标签误判为 H2→H4 跳级 |
| 14 | Schema logo | 警告 | ✅ @id 引用顶层 Organization (含 logo) |

### 已修复 (1 项)

| # | 检查 | 修复前 | 修复后 |
|---|------|--------|--------|
| 14 | FAQ Body↔Schema | **4 vs 6** (Rule 1 违规) | **6 vs 6** ✅ 逐字匹配 |

### 通过 (9 项)

| 检查 | 分数 |
|------|------|
| Opening Density | 90/100 |
| H3 Answer Length | 100/100 |
| Vague Headings | 100/100 |
| H2 B2B Density | 90/100 |
| Data Density | 100/100 |
| Table Test | 100/100 |
| Stock Photos | 100/100 |
| Author E-E-A-T | 83/100 |
| URL Quality | 100/100 |

---

## Step 2.5: 字数验证

| 来源 | 字数 |
|------|------|
| Info Gain 报告 | 5,611 |
| **实际正文** | **2,935** |
| Schema wordCount | **3,000** ✅ (已修正, 误差 2%) |

---

## Info Gain 短板

| 维度 | 分数 | 问题 |
|------|------|------|
| Data Points | 100 | ✅ |
| B2B Vocabulary | 80 | ✅ |
| Technical Anchors | 14 | 6 词 — 可提升 |
| **Named Entities** | **13** | 🔴 仅 2 实体 — 三篇最低 |

**建议**: 嵌入 IATA, EASA, TÜV, IEC 62133-2, Navitas 等认证/标准实体名。

---

## 排版修正汇总

| 优化项 | 状态 |
|--------|------|
| Schema Organization (name+legalName+url+publishingPrinciples) | ✅ |
| Compact Author Bar (Nina Nico) | ✅ |
| KERNERKENNTNISSE (amber-50, 封面-TOC间) | ✅ |
| Featured Image srcset | ✅ |
| TOC #faq | ✅ |
| FAQ Body↔Schema 6 题一致 | ✅ |
| Author Bio Factory Footprint | ✅ |
| Gradient CTA h2 (Author Bio 下方) | ✅ |
| SSB 价格修正 (18-28→12-16 €) | ✅ |
| wordCount (3800→3000) | ✅ |
