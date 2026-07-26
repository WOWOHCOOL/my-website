# B2B Content Audit: EU-Zertifizierungen (DE)

**文件**: `src/de/blog/zertifizierungen-eu-markt/index.njk`
**审核日期**: 2026-07-25

---

## 综合评分

| 维度 | 分数 | 等级 |
|------|------|------|
| **B2B Content Audit** | 75.9/100 | B |
| **修正误报后** | **~88/100** | **A 级** |
| **Information Gain** | 59/100 | MODERATE |

---

## 审计详情

### 误报 (4 项)

| # | 检查 | 分数 | 实际 |
|---|------|------|------|
| 2 | KEY TAKEAWAYS | 0/100 | KERNERKENNTNISSE (amber-50, 封面-TOC间) |
| 9 | FAQ B2B Language | 0/100 | 德语 (Importeur/Zertifizierung/Konformitaet) |
| 11 | Weak CTA | 20/100 | gradient h2 CTA |
| 14 | Schema logo | 警告 | @id 引用 Organization (含 logo) |

### 真实问题

| # | 检查 | 问题 |
|---|------|------|
| 14 | FAQ 一致性 | Body 4 vs Schema 5 — 缺 1 题 |
| — | wordCount | 3,200 → **1,500** (已验证修正) |

### 通过 (9 项)

| 检查 | 分数 |
|------|------|
| Opening Density | 100/100 |
| H3 Answer Length | 100/100 |
| Vague Headings | 100/100 |
| H2 B2B Density | 90/100 |
| Data Density | 100/100 |
| Table Test | 100/100 |
| Stock Photos | 100/100 |
| Author E-E-A-T | 83/100 |
| Heading Hierarchy | 100/100 |

---

## Info Gain 详细 (59/100)

| 维度 | 分数 | 说明 |
|------|------|------|
| Named Entities | **100** | 🔥 36 实体 (EN 62368-1, TUEV, GPSR, WEEE...) — 四篇最强 |
| Data Points | 100 | 93 数据点 |
| B2B Vocabulary | 70 | 7 术语 |
| **Technical Anchors** | **4** | 🔴 仅 1 锚点词 — 四篇最弱 |

---

## 排版修正汇总

| 优化项 | 状态 |
|--------|------|
| Schema Organization (legalName+publishingPrinciples) | OK |
| Schema about.sameAs | OK |
| Compact Author Bar (Nina Nico) | OK |
| KERNERKENNTNISSE (amber-50, 封面-TOC间) | OK |
| Featured Image srcset | OK |
| TOC #faq | OK |
| FAQ id="faq" | OK |
| Author Bio + id + Factory Footprint | OK |
| Gradient CTA h2 | OK |
| Related id | OK |
| speakable class | OK |
| 5 content images | OK |
| wordCount (3200→1500) | OK (已修正) |
| 重复图片 (S2) | OK (已删除) |
| 重复 Author Bio | OK (已删除) |
| dateModified → 07-25 | OK |

### 待修复
- FAQ Body 4→5 (匹配 Schema)
- Technical Anchors 1→5+ (提升 IG)
