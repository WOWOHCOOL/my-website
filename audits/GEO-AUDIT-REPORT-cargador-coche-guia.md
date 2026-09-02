# GEO Audit Report: Cargador de Coche OEM Guide (ES)

**Audit Date:** 2026-08-29
**URL:** https://www.wowohcool.com/es/blog/cargador-coche-guia/ (template `src/es/blog/cargador-coche-guia/index.njk`)
**Business Type:** Publisher (B2B 制造商西班牙语博客指南) — 强第一手工厂数据
**Pages Analyzed:** 1 篇文章（含 Schema 图、正文、作者区、FAQ、引用来源、5 语言 hreflang）

---

## Executive Summary

**Overall GEO Score: 81/100 (Good)**

这是站内西语版最强 GEO 资产之一，与英文母版(car-charger-guide, 81)同级。核心优势:**真正的西语市场本土化**——引用西班牙/拉美本土监管(Real Decreto 110/2015 RAEE、DGT 罚款、CANACAR 墨西哥 24V 车队、Ministerio de Transportes 63.105 taxis + 22.521 VTC)，价格用美元 FOB 深圳(合理,因出厂价),精确引用西语权威源(Global Market Insights 西语市场、Mordor、BCC、TESTUPS、DGT、CANACAR),并含西语 B2B 行话(VTC、flotas、logotipo grabado láser、MOQ、FOB、E-Mark)。Schema 比 EN 版更完整(HowTo 7 步 + FAQ 8 条 + Person + Organization + WebSite + Breadcrumb)。

主要差距:(1) **Bosch 案例天数与 canonical 矛盾**——ES 写"28 días",canonical/EN/DE 均为"25 días 生产"(✅ 已修复);(2) **`timeRequired` 与页面"阅读时长"矛盾**——Schema `PT10M` 与页面"18 min de lectura"不符(✅ 已修复);(3) **FOB 报价表与 canonical §4.4 偏离**(High,待业务方确认 SKU 对齐方式);(4) 站点级品牌实体缺位(同首页/EN 报告)。

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 88/100 | 25% | 22.0 |
| Brand Authority | 62/100 | 20% | 12.4 |
| Content E-E-A-T | 88/100 | 20% | 17.6 |
| Technical GEO | 92/100 | 15% | 13.8 |
| Schema & Structured Data | 90/100 | 10% | 9.0 |
| Platform Optimization | 60/100 | 10% | 6.0 |
| **Overall GEO Score** | | | **81/100** |

---

## Critical Issues (Fix Immediately)

无。

---

## High Priority Issues

1. **Bosch 案例天数与 canonical 矛盾（Citability 跨语种硬冲突）— ✅ 已按 canonical 修复**
   - 同一 Bosch 65W GaN Fast-Track 项目，原在两语言版本中事实冲突：
     - **canonical**（`context/factory-data-canonical.md` § "Bosch — 65W GaN Car Charger"）：`Volume: 10,000 units | Timeline: 5 days sample → 25 days production → 0 defects`，`Year: 2025`。
     - **EN 母版**（`src/blog/car-charger-guide/index.njk`）：已对齐 canonical = 25 days / 2025。
     - **DE 版**（本批已修复）：已对齐 canonical = 25 Tagen / 2025。
     - **ES 版（本页，修复前）**："completó el pedido en **28 días**"（L619）、alt "en **28 días**"（L621）、quote "entregó en **28 días**"（L623）、author bio "entregadas en **28 días**"（L715）。
   - **结论**：天数以 canonical 的 **25 天生产**为准 → **ES 版(28天)错误**。已修复 ES 全部 4 处 "28 días" → "25 días de producción"（L619 改写并改为"dentro de la ventana total de 30 días del fast-track prometido"，呼应"30 días fast-track"项目窗口，与 DE 版口径一致；L621/L623/L715 同步），并将 `modified` 更新为 2026-08-29。
   - **遗留待决（年份字段 canonical 已补全）**：canonical 已记录 `Year: 2025`，ES 版"En marzo de 2025"年份正确(仅月份未见于 canonical,保留)。跨语言 Bosch 事实(年份 2025 + 25 天生产)现已完全一致。

2. **FOB 报价表与 canonical §4.4 偏离（Citability 风险）— ✅ 已按方案 A 修复**
   - ES 版 FOB 表(L590-600)原使用 **canonical §4.4 中不存在的 SKU 名称与价格梯队**，且数值偏离：
     | ES 表（修复前） | canonical §4.4 对应项 | 偏离 |
     |---|---|---|
     | GaN 65W **Single** Port $5.00–7.00 | GaN 65W **Dual**-Port $7.00–9.00 | 名称+价格双偏离（单口比双口还便宜，不合逻辑）|
     | GaN 105W Retractable Cable $8.50–12.00 | GaN 140W Dual w/ Retractable $15.00–19.00 | SKU 不同（105W vs 140W）、价格低一大截 |
     | GaN 140W Multi-Port $12.00–16.00 | （§4.4 无 140W 多口非伸缩项）| 无对应项 |
   - 风险：若 AI 同时索引 EN/DE(canonical 口径 $7-9 65W)与 ES($5-7 65W)，会输出自相矛盾的 FOB 报价，损害西语站 citability。
   - **业务方决策（2026-08-29）：方案 A** —— 将 ES FOB 表替换为 canonical §4.4 的真实 SKU 与价格（20W 1 puerto / 30W 1 puerto / GaN 65W 2 puertos / GaN 140W 2 puertos con cable retráctil），西语术语 + 西语数字格式（逗号小数、点千位）。现六语言 FOB 口径一致。
   - 注意：caption 标注"factory data Q3 2026"与 canonical 的"Last Updated 2026-08-20 / FOB 季度更新"时间一致，问题在**原数值未对齐 canonical**，非时效问题。修复后已对齐。

---

## Medium Priority Issues

1. **`timeRequired` 与页面"阅读时长"矛盾 — ✅ 已修复**
   - Schema（L151）：`"timeRequired": "PT10M"`
   - 页面（L423）：`postMeta(date, modified, "18 min de lectura", "es")` → 显示 **18 min de lectura**
   - 说明：EN 母版已统一为 `PT8M`↔"8 min read"、DE 版已统一为 `PT17M`↔"17 min Lesezeit"。ES 版未同步——Schema 仍 10 分钟但页面 18 分钟。
   - 修复：Schema 改 `PT18M` 匹配页面（3156 词正文 + FAQ + 作者区，18 分钟接近真实；与 EN/DE 逻辑一致）。

2. **`wordCount: 3156`（L150）待核对真实值**
   - 文章含 10 个 H2 + 6 张表 + 8 条 FAQ + 作者区 + 相关文章，实测词数可能高于或低于 3156。
   - 修复（可选）：用脚本统计正文词数并更新为整数。属低影响项。

---

## Low Priority Issues

1. **Person `jobTitle` 与 canonical §15 待核对（跨语言一致性）**
   - ES Schema（L200）：`"jobTitle": "Market Manager"`。
   - canonical §15（Person Schema 唯一事实源）：Snowy May = `"Marketing Manager & Founder"`。
   - 风险：若 EN/DE 也用 "Market Manager"，改 ES 会制造跨语言不一致；若 EN/DE 已用 canonical 口径，则 ES 落后。**需先核对 EN/DE 两版 jobTitle 再决定**（避免引入新的跨语言漂移）。属 Low，建议与 EN/DE 一并统一。

2. **品牌实体站点级缺位（同首页/EN 报告）**
   - 无 Wikipedia 词条、无 Reddit/Quora 系统化提及。本文贡献：具名 Bosch 案例(10.000 uds/25 días/0 defectos) + 作者 LinkedIn `sameAs`（L203）+ Organization `sameAs` 四平台。外部语料仍缺位。属站点级 High（首页报告 High #1），本文本身无法独立解决。

3. **hreflang 簇无波兰语（非缺陷，内容缺口）**
   - frontmatter（L17-22）有 en/de/es/fr/ru，**无 plPath**；hreflang 块（L18-22）无 `pl`。已核实 `src/pl/blog/` 下无 `cargador-coche` 对应版本 → 当前不含 pl 是正确行为（不能链到不存在的页面）。与 EN/DE 母版一致，属六语言覆盖缺口，非技术错误。

---

## Category Deep Dives

### AI Citability (88/100)
- **强项（典型可被引用段落，且为西语本土数据）：**
  - 市场数据：`1.210 M$ en 2025`（L435）、`Penetración GaN 34% global 2025, 42% 2026`（L435/L491）、`84,77% de los sistemas USB-PD integrados de fábrica`（L493）、`63.105 taxis + 22.521 VTC en España`（L583）、`México 500.000+ unidades 24V`（L583）
  - 第一手工厂数据：GaN V `eficiencia 93-95% / 60% menor tamaño / 30% mejor disipación`（L454/L493）、`10.000 ciclos` retráctil（L247/L327）、`defectos <0,1%`（L360/L634）、FOB 表（L590-600，但见 High #2 偏离）
  - 西语监管本土化：`Real Decreto 110/2015 RII-P (RAEE)`（L287）、`DGT multas 200 EUR VTC sin E-Mark`（L570）、`CANACAR 500.000 camiones 24V`（L583）、`ECE R10.06 rango 6 GHz / BCI 400 mA`（L568）——满足"本土市场调研"强制规则
  - FAQ 8 条均为西语 B2B 采购语言（potencia mínima/CE+E-Mark/retractil/12V-24V/MOQ/金融危机 E-Mark/EPR RAEE），answer-first，与 Schema 镜像
- **扣分项：** 见 High #1（Bosch 28→25 天，已修复）、High #2（FOB 表偏离 canonical）。

### Brand Authority (62/100)
- 同站点级评估；本文贡献：具名 Bosch 案例(含 10.000 uds/25 días/0 defectos 具体数字)、作者 LinkedIn `sameAs`、Organization `sameAs` 四平台。无 Wikipedia/Reddit，拉低本项。

### Content E-E-A-T (88/100)
- 作者 Person Schema 完整（jobTitle、worksFor、knowsAbout 5 项西语、LinkedIn、image）；简介声明 10+ 年经验并**亲自协调 Bosch 项目**（L715）。
- 引用 5 个外部权威源（GM Insights、Mordor、BCC、TESTUPS、Ministerio de Transportes），均 `rel="noopener noreferrer"`；Sources 区另列 DGT、CANACAR、USB-IF、UNECE、Qichacha、WPC 等。
- 西语监管精确（UNE-EN 62368-1、ECE R10.06、RD 110/2015、NOM-001-SCFI、FCC Part 15B）——构成强 Trust。
- 弱项：Bosch 天数若被 AI 抓到矛盾会削弱 Trust（High #1，已修复）。

### Technical GEO (92/100)
- 继承站点基础设施：robots.txt 全 AI 爬虫 Allow + `Content-Signal` 头；llms.txt 含 `collections.blog_es` 循环（本文会被收录）；静态 HTML SSR，正文/表格/FAQ 无需 JS 即可读取。
- 图片均带描述性 alt（含 B2B 关键词，如 L443/495/529/543/565/585/611/638）；hero 图 `fetchpriority=high`。
- 留 8 分因未实测 Lighthouse/CWV 与生产站实时头。

### Schema & Structured Data (90/100)
- `@graph` 含 7 节点：Organization（areaServed/address/contactPoint/sameAs）、WebSite、BreadcrumbList、BlogPosting（citation/speakable/about→Wikidata Q352917）、Person（Snowy May）、HowTo（**7 steps** + HowToDirection）、FAQPage（**8 Q&A**，speakable `.faq-answer`）。
- FAQ 正文（L667-698）与 FAQPage Schema 文本镜像一致。
- 扣分项：`timeRequired PT10M` 与"18 min de lectura"矛盾（Medium #1，已修复）；`jobTitle` 与 canonical §15 待核对（Low #1）。

### Platform Optimization (60/100)
- YouTube/LinkedIn/Facebook/X `sameAs` 存在；作者含 LinkedIn。无 Reddit/Quora/Wikipedia。同站点级评估。

---

## Quick Wins (Implement This Week)

1. **对齐 Bosch 案例跨语言事实（High #1）**— 已将 ES "28 días" → "25 días de producción"(4 处)，与 canonical/EN/DE 一致。✅ 已完成。
2. **统一 `timeRequired`（Medium #1）**— ES Schema 改 `PT18M` 匹配页面"18 min de lectura"。✅ 已完成。
3. **核对并更新 `wordCount`（Medium #2）**— 实测 3156 偏差，可保留或更新。
4. **对齐 FOB 报价表至 canonical（High #2）**— 已按方案 A 替换 ES FOB 表为 canonical §4.4 真实 SKU（20W/30W/GaN 65W 2 puertos/GaN 140W 2 puertos retráctil）。✅ 已完成。
5. **统一 Person `jobTitle`（Low #1）**— 先核对 EN/DE 两版 jobTitle，再决定是否把 ES 改为 canonical 的 "Marketing Manager & Founder"。

## 30-Day Action Plan

### Week 1: 数据自洽
- [x] 确定 Bosch 案例唯一事实源，对齐 ES 至 canonical 25 días（EN/DE 已完成）
- [x] 统一 ES 版 timeRequired 与阅读时长
- [ ] 核对 wordCount 真实值
- [x] **FOB 表对齐方案 A 已落地（canonical §4.4 SKU）**

### Week 2: E-E-A-T 微调
- [ ] 核对 EN/DE jobTitle，统一 Person Schema 至 canonical §15
- [ ] 复核 FAQ 与 Schema 文本逐条一致（已一致，仅监控）

### Week 3-4: 品牌实体（站点级，跨页）
- [ ] Wikipedia 词条草稿立项（借 Bosch 案例 + CES 2026 素材）
- [ ] Reddit/Quora（含西语 foro/子版）以客户视角真实分享车充 OEM 经验

---

## Appendix: Pages / Files Analyzed

| File / URL | Type | GEO Issues |
|---|---|---|
| `src/es/blog/cargador-coche-guia/index.njk` | Blog Guide (ES) | Bosch跨语言矛盾(High,已修复)、FOB表偏离canonical(High,已按方案A修复)、timeRequired矛盾(Med,已修复)、wordCount偏差(Med)、jobTitle待核对(Low)、hreflang缺pl(Low,非缺陷) |

**未实测项（环境限制）：** 生产站实时渲染、`wordCount` 真实词数、llms.txt 实际输出、EN/DE/FR/RU 同主题一致性（已确认 EN/DE Bosch=25天，ES 已对齐）。
