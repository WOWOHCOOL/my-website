# GEO Audit Report: Avtomobilnye Zaryadki OEM Rukovodstvo (RU)

**Audit Date:** 2026-08-29
**URL:** https://www.wowohcool.com/ru/blog/avtomobilnye-zaryadki-oem-rukovodstvo/ (template `src/ru/blog/avtomobilnye-zaryadki-oem-rukovodstvo/index.njk`)
**Business Type:** Publisher (B2B 制造商俄语博客指南) — 强本土化第一手数据
**Pages Analyzed:** 1 篇文章（含 Schema 图、正文、作者区、FAQ、引用来源、5 语言 hreflang）

---

## Executive Summary

**Overall GEO Score: 81/100 (Good)**

这是六语言车充指南中**本土化最彻底、Bosch 案例唯一一开始就对齐**的版本——引用俄罗斯本土权威源(Autonews、Колёса.ру、За рулём)、俄罗斯车型(Lada Granta / КАМАЗ / Haval Jolion / Geely)、俄罗斯法规(EAC ТР ТС 004/020/037、ГОСТ 28751、FAC Роскомнадзор)，并用法语/德语市场没有的 -30°C~+60°C 极温测试叙事。Schema 完整(7 节点 + HowTo 4 步 + FAQ 8 条)。

主要差距：(1) **FOB 报价表第 5 行 105W 非 canonical**——canonical §4.4 从 65W 直接跳到 140W 伸缩线，RU 多出一个 105W 行，且与 RU 自身 FAQ 矛盾（待业务方决策）；(2) **Organization `areaServed` 漏掉 RU**（俄语站却不包含俄罗斯市场）；(3) 30W 行标签 "1C1A" 与 canonical "Single-Port" 不符；(4) 跨语言 Person/Wikidata 实体不一致。

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 89/100 | 25% | 22.25 |
| Brand Authority | 62/100 | 20% | 12.4 |
| Content E-E-A-T | 90/100 | 20% | 18.0 |
| Technical GEO | 92/100 | 15% | 13.8 |
| Schema & Structured Data | 88/100 | 10% | 8.8 |
| Platform Optimization | 60/100 | 10% | 6.0 |
| **Overall GEO Score** | | | **81/100** |

---

## Critical Issues (Fix Immediately)

无。

---

## High Priority Issues

无 High 级硬冲突。

> **Bosch 案例已对齐（正向确认）**：RU 版 Key Takeaways(L398)写"10 000 ед. GaN 65W — 5 дней образцы, **25 дней производство**, 0 дефектов"，与 canonical §13 完全一致。citation(L177-178)指向 EN 母版案例页，全文无 "28 дней"。**RU 是六语言中唯一 Bosch 一开始就是 25 天的版本**，EN/DE/ES/FR 此前均需修复。

---

## Medium Priority Issues

1. **FOB 报价表第 5 行 105W 非 canonical（Citability 风险）— ✅ 已按方案 A 修复**
   - RU Section 7 FOB 表(L766-795)原 5 行，对照 canonical §4.4：
     | RU 表行 | 价格(500/1000/5000) | canonical §4.4 | 状态 |
     |---|---|---|---|
     | Кремниевая 20W 1C | $3-5/$2-4/$1.80-3.50 | 20W Single-Port | ✅ 一致 |
     | Кремниевая 30W 1C1A | $4-5.50/$3-4.50/$2.50-4 | 30W Single-Port | ⚠️ 价格一致，但标签 "1C1A"(双口)≠ canonical 单口 |
     | GaN 65W 1C1A | $7-9/$5.50-7.50/$5-7 | GaN 65W Dual-Port | ✅ 一致 |
     | **GaN 105W 2C + ретракт.** | **$12-16/$10-14/$8-12** | **无此 SKU** | ❌ canonical 无 105W |
     | GaN 140W 2C + ретракт. | $15-19/$12-15/$9-12 | GaN 140W Dual w/ Retractable | ✅ 一致 |
   - 问题：(a) **跨语言不一致**——EN/DE/ES/FR 现全部用 canonical 的 4 个 SKU(20W/30W/65W/140W)，RU 多出 105W；(b) **RU 内部矛盾**——RU 自身 FAQ(L330)只列 "GaN 140W с выдвижным кабелем — $15-19" 为伸缩顶配，与表内 "105W + 140W" 双行冲突。
   - 根因：正文 Section 4(L397/619/785)将 WOC42 称为 "105W"，而 canonical §4.4 的伸缩 SKU 是 "140W"。两者在**源数据层**就未对齐。
   - **业务方决策（2026-08-29）：方案 A** —— 删除 FOB 表 105W 行，使 RU 与 EN/DE/ES/FR 同为 4 个 canonical SKU；WOC42 正文 "105W" 作为产品描述保留（其价格归入 140W 伸缩行）。现六语言 FOB 口径一致。改动：`modified` 已更新为 2026-08-29（frontmatter + Schema 双处）。

2. **Organization `areaServed` 漏掉 RU（Schema 硬错误）— ✅ 已修复**
   - RU 版 Organization `areaServed`(L43-60)列了 US/DE/AT/CH/UK/FR/ES/EU/JP/KR/AU/MX/CO/AR/CL/PE 共 16 个，**唯独没有 RU**。
   - 这是一个明确的 Schema 错误：俄语站的 Organization 却声明不服务俄罗斯市场。FR 版 areaServed 含 FR/BE/CH/EU，DE 含 DE 等——各语言都应含自身市场。
   - **已修复**：在 areaServed 数组首项加入 "RU"。

---

## Low Priority Issues

1. **30W FOB 行标签 "1C1A" 与 canonical 不符**
   - L773 标签 "Кремниевая 30W 1C1A"，但价格($4-5.50/$3-4.50/$2.50-4)等于 canonical §4.4 的 "30W Single-Port"（单口）。同表 20W 行标签为 "1C"（单口），"1C1A" 既与 canonical 不符、也与自身 20W 行不一致。
   - **已修复**：标签改为 "1C"（与 20W 行及 canonical 口径一致）。

2. **`about` Wikidata 实体 ID 跨语言不一致**
   - RU Schema(L183)：`Q5037720`。其他语言：EN=Q787402、ES=Q352917、DE=Q787402、FR=Q5037910。六语言指向 5 个不同 Wikidata 实体。
   - 影响：同一主题文章指向不同实体，削弱跨语言实体聚合。属 Low，建议统一 QID（需确认哪个最准确）。

3. **Person 作者跨语言不一致（RU 用 Nina Nico）**
   - RU 作者为 **Nina Nico**（L7/L190，LinkedIn `nico-power-bank-chargers`），其余五语言均为 **Snowy May**（canonical §15 指定）。
   - 评估：俄语市场用本土作者属合理本土化，但造成跨语言 Person 实体分裂（同一工厂两个作者 persona）。属 Low，可与 canonical §15 统一或显式保留 RU 本地作者策略。

4. **`wordCount: 2600`（L148）待核对真实值**
   - RU 正文较短（含 Key Takeaways、8 FAQ、4 步 HowTo、作者区、相关文章），实测词数可能高于或低于 2600。属 Low，建议脚本统计后更新。

5. **品牌实体站点级缺位（同首页/EN 报告）**
   - 无 Wikipedia 词条、无 Reddit/Quora 系统化提及。本文贡献：具名 Bosch 案例、作者 LinkedIn、Organization sameAs 四平台。属站点级 High，本文无法独立解决。

6. **hreflang 簇无波兰语（非缺陷，内容缺口）**
   - frontmatter(L17-22)有 en/de/es/fr，**无 plPath/x-default**；hreflang 块无 `pl`。已核实 `src/pl/blog/` 下无对应版本 → 当前不含 pl 是正确行为。属六语言覆盖缺口，非技术错误。

---

## Category Deep Dives

### AI Citability (89/100)
- **强项（典型可被引用段落，且为俄语本土数据）：**
  - 市场数据：`730 714 новых авто в РФ за янв-июль 2026 (+12.2%)`(L376)、`парк такси 940 500 авто`(L377)、`Lada Granta 11 086 ед. в июле`(L377)。
  - 第一手工厂数据：GaN КПД 93-95% vs кремний 83-85%(L395/441)、`15 000 циклов` ретракт.(L397/621)、`0 дефектов` Bosch(L398)、FOB 表(L766-795，4/5 行 canonical)。
  - 报价表 USD FOB（L766-795）——高 extractable；Section 3 端口配置表(L569-598)亦含 FOB。
  - FAQ 8 条均为俄语 B2B 采购语言（MOQ / GaN vs кремний / EAC / 快充协议 / 12В-24В / ретракт. циклы / термо-тест / FOB），answer-first，与 Schema 镜像。
  - 引用**俄罗斯权威源**：Autonews、Колёса.ру、За рулём(L974-976)，均 `rel="noopener external"`——满足"本土市场调研"强制规则，且是六语言中唯一用俄语本土源（EN/DE/ES/FR 用本国源）。
- **扣分项：** 见 Medium #1（FOB 105W 非 canonical + 内部矛盾）。

### Brand Authority (62/100)
- 同站点级评估；本文贡献：具名 Bosch 案例(10 000 ед./25 дней/0 дефектов)、作者 LinkedIn、Organization sameAs 四平台。无 Wikipedia/Reddit，拉低本项。

### Content E-E-A-T (90/100)
- 作者 Person Schema 完整（jobTitle、worksFor、knowsAbout 5 项含 "EU Regulatory Compliance & Battery Regulation"/"GaN Charger Manufacturing"、LinkedIn、image）；简介声明 10+ 年 3C 采购经验(L908)。
- 引用 3 个俄罗斯外部权威源(Autonews/Колёса/За рулём)，均 `rel="noopener external"`。
- 俄罗斯法规精确（EAC ТР ТС 004/020/037、ГОСТ 28751、FAC Роскомнадзор、ТР ЕАЭС 037/2016）——构成强 Trust，且是其他语言没有的俄罗斯特定合规深度。
- 弱项：无（Bosch 已对齐，无跨语言冲突）。

### Technical GEO (92/100)
- 继承站点基础设施：robots.txt 全 AI 爬虫 Allow + `Content-Signal` 头；llms.txt 含 `collections.blog_ru` 循环（本文会被收录）；静态 HTML SSR，正文/表格/FAQ 无需 JS 即可读取。
- 图片均带俄语描述性 alt（含 B2B 关键词，如 L383/482/686/844）；hero 图 `fetchpriority=high`。
- 留 8 分因未实测 Lighthouse/CWV 与生产站实时头。

### Schema & Structured Data (88/100)
- `@graph` 含 7 节点：Organization（areaServed **已补 RU**、address、contactPoint、sameAs 四平台）、WebSite、BreadcrumbList、BlogPosting（citation/speakable/about→Wikidata **Q5037720**）、Person（Nina Nico）、HowTo（**4 steps** + HowToDirection）、FAQPage（**8 Q&A**，speakable `.faq-answer`）。
- FAQ 正文(L858-889)与 FAQPage Schema 文本镜像一致。
- 扣分项：`about` Wikidata QID 跨语言不一致（Low #2）；Person 作者跨语言不一致（Low #3）；areaServed 原漏 RU（Medium #2，已修复）。

### Platform Optimization (60/100)
- YouTube/LinkedIn/Facebook/X `sameAs` 存在；作者含 LinkedIn。无 Reddit/Quora/Wikipedia。同站点级评估。

---

## Quick Wins (Implement This Week)

1. **Bosch 案例已对齐** — RU 本就 25 дней，无需修复（六语言唯一）。✅ 已完成。
2. **补 Organization `areaServed` RU（Medium #2）** — 已在数组加 "RU"。✅ 已完成。
3. **30W FOB 行标签 1C1A→1C（Low #1）** — 已改为单口口径，与 canonical 及 20W 行一致。✅ 已完成。
4. **对齐 FOB 105W 行（Medium #1）** — 已按方案 A 删除 105W 行，六语言 FOB 口径一致。✅ 已完成。
5. **统一 Person / Wikidata 跨语言实体** — 先核对 EN/DE/ES/FR，再决定 RU 作者策略与 QID 统一。

## 30-Day Action Plan

### Week 1: 数据自洽
- [x] 确认 Bosch 案例 RU 已对齐 canonical 25 дней（六语言一致达成）
- [x] 补 RU `areaServed` 漏项
- [x] 修正 30W FOB 行标签
- [x] **FOB 105W 行决策** — 方案 A 删行，六语言对齐 canonical §4.4 四 SKU

### Week 2: E-E-A-T 微调
- [ ] 统一 `about` Wikidata QID 跨语言（统一实体）
- [ ] 决定 RU 作者策略（保留 Nina Nico 本地化 vs 统一 Snowy May）
- [ ] 复核 FAQ 与 Schema 文本逐条一致（已一致，仅监控）

### Week 3-4: 品牌实体（站点级，跨页）
- [ ] Wikipedia 词条草稿立项（借 Bosch 案例 + CES 2026 素材）
- [ ] Reddit/Quora（含俄语 форум/子版）以客户视角真实分享车充 OEM 经验

---

## Appendix: Pages Analyzed

| File / URL | Type | GEO Issues |
|---|---|---|
| `src/ru/blog/avtomobilnye-zaryadki-oem-rukovodstvo/index.njk` | Blog Guide (RU) | Bosch已对齐25天(正向)、FOB表105W已删行对齐六语言(Medium,✅已修复)、areaServed漏RU(Medium,✅已修复)、30W标签1C1A(已修复)、Wikidata QID不一致(Low)、Person作者跨语言(Low)、hreflang缺pl(Low,非缺陷) |

**未实测项（环境限制）：** 生产站实时渲染、`wordCount` 真实词数、llms.txt 实际输出、EN/DE/ES/FR 同主题一致性（已确认六语言 Bosch=25天）。
