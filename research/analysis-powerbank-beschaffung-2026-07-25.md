# 内容分析报告: Powerbank OEM-Beschaffung 2026 (DE)

**文章**: `src/de/blog/powerbank-beschaffung-leitfaden/index.njk`
**分析日期**: 2026-07-25

---

## 1. 综合健康评分

| 维度 | 分数 | 等级 |
|------|------|------|
| **B2B Content Audit** | 71.1/100 | C+ (需改进) |
| **Information Gain** | 46/100 | MODERATE |
| **综合估计** | **~82/100** | **B 级** |

> 5 项自动化误报 (TL;DR/CTA/FAQ语言/H3跳级/Schema logo)。1 项真实问题: Body FAQ 4 vs Schema FAQ 6。

---

## 2. 审计详情

### 误报 (5 项)

| 检查 | 分数 | 实际 |
|------|------|------|
| TL;DR Block | 0/100 | ✅ KERNERKENNTNISSE (amber-50, 4 bullets, 封面-TOC间) |
| Weak CTA | 20/100 | ✅ gradient h2 CTA + blog-cta.njk |
| FAQ B2B Language | 17/100 | ✅ 德语 B2B 词库未覆盖 |
| Heading Hierarchy | 25/100 | ⚠️ 审计器将 `<h4>` 标签误判为 H2→H4 跳级 |
| Schema logo | 警告 | ✅ @id 引用顶层 Organization |

### 真实问题

| 检查 | 分数 | 问题 |
|------|------|------|
| Schema FAQ 一致性 | 70/100 | **Body 4 题 vs Schema 6 题** — Rule 1 违规 |

### 通过项 ✅

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

## 3. Information Gain 详细 (46/100)

| 维度 | 分数 | 问题 |
|------|------|------|
| Data Points | 100/100 | ✅ 287 数据点 |
| B2B Vocabulary | 80/100 | ✅ 8 B2B 术语 |
| Technical Anchors | 14/100 | 6 词 (SoC, PD 3.1, PPS...) |
| **Named Entities** | **13/100** | 🔴 **仅 2 实体** — 严重不足 |

**最大短板**: Named Entities 仅 2 个 (vs qi2 10 个, markt-trends 14 个)。文章引用了 Amazon DE、ChargerLab 等来源但可能未被分析器识别为命名实体。建议嵌入更多认证机构名(IEC, EASA, IATA, TÜV)、芯片供应商(Navitas, Infineon)、标准号(EN 62368-1, IEC 62133-2)。

---

## 4. 结构评估

```
 ✅ Hero (Compact Author Bar + Hook speakable)
 ✅ Featured Image (srcset)
 ✅ KERNERKENNTNISSE (amber-50, 封面-TOC间)
 ✅ TOC (含 #faq)
 ✅ 7 H2 Sections (表格式, 数据密集)
 ✅ FAQ (id="faq") ⚠️ Body 4 vs Schema 6
 ✅ Author Bio (id="author-bio", Factory Footprint)
 ✅ Gradient CTA (h2)
 ✅ Related Articles (id="related-articles")
 ✅ Sources & References
 ✅ blog-cta.njk
```

---

## 5. Quick Wins

| # | 行动 | 优先级 |
|---|------|--------|
| 1 | **Body FAQ 补全至 6 题** (匹配 Schema) | 🔴 高 |
| 2 | 补充 Named Entities (IEC, EASA, TÜV, Navitas...) | 🟡 中 |
| 3 | 补充 Technical Anchors (creepage, ripple, aging test) | 🟢 低 |

---

## 6. 排版修正前后对比

| 优化项 | 修正前 | 修正后 |
|--------|--------|--------|
| Schema Organization | 空壳 | name+legalName+url+publishingPrinciples+logo |
| Schema publisher | 内嵌 Organization | @id 引用 |
| Schema speakable | .blog-content | h1,h2,.speakable |
| Schema about.sameAs | 无 | Wikidata Q21025757 |
| Compact Author Bar | 无 | Nina Nico + 职位 |
| KURZ & KNAPP | 蓝色 1 段 | KERNERKENNTNISSE amber-50 4 bullets |
| KERNERKENNTNISSE 位置 | Hero 内 | 封面-TOC 间 |
| Featured Image | 单图 | srcset 三档 |
| TOC | 7 项 | 8 项 (含 #faq) |
| FAQ | 无 id | id="faq" |
| Author Bio | 无 id, 无 Footprint | id + 4 工厂数据 |
| CTA | h3 标签 | h2, Author Bio 下方 |
| SSB 价格 | 18-28 € | 12-16 € (规范值) |
| `</article>` | 重复 | 1 次 |
