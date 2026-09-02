# GEO Audit Report: Chargeur Voiture OEM Guide (FR)

**Audit Date:** 2026-08-29
**URL:** https://www.wowohcool.com/fr/blog/chargeur-voiture-oem-guide/ (template `src/fr/blog/chargeur-voiture-oem-guide/index.njk`)
**Business Type:** Publisher (B2B 制造商法语博客指南) — 强本土化第一手数据
**Pages Analyzed:** 1 篇文章（含 Schema 图、正文、作者区、FAQ、引用来源、5 语言 hreflang）

---

## Executive Summary

**Overall GEO Score: 81/100 (Good)**

这是六语言版本中**本土化最彻底**的车充指南之一，甚至优于其英文母版(car-charger-guide, 81)。核心优势:**真正的法语市场本土化**——引用法国本土法规(Code de l'environnement L.541-9-3 Trimian、Éco-organisme SYDEREP、NF Label France、EU-VO 2022/2380、ECE R10.06)，价格用欧元(4-8 € / 8-15 € / 12-25 €)，精确引用欧盟/法国权威源。Schema 比 EN 版更完整(HowTo **7 步** + FAQ **8 条** + Person + Organization + WebSite + Breadcrumb)，且 `timeRequired PT18M` 与页面"18 min de lecture"**完全一致**(ES 版此处原矛盾,FR 无此问题)。

主要差距:(1) **跨语言 Bosch 案例数据矛盾**——FR 写"28 jours 生产",canonical/EN/DE/ES 已统一为 **25 天生产**(✅ 审计中已修复);(2) **FOB 报价表结构与 canonical §4.4 偏离**(Medium/High,待业务方决策,见下方选项);(3) **E-Mark 认证成本口径与 canonical §6 冲突**(Medium,待业务方确认);(4) 站点级品牌实体缺位(同首页/EN 报告)。

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 90/100 | 25% | 22.5 |
| Brand Authority | 62/100 | 20% | 12.4 |
| Content E-E-A-T | 89/100 | 20% | 17.8 |
| Technical GEO | 92/100 | 15% | 13.8 |
| Schema & Structured Data | 92/100 | 10% | 9.2 |
| Platform Optimization | 60/100 | 10% | 6.0 |
| **Overall GEO Score** | | | **81/100** |

---

## Critical Issues (Fix Immediately)

无。

---

## High Priority Issues

1. **跨语言 Bosch 案例数据矛盾（Citability 跨语种硬冲突）— ✅ 已按 canonical 修复天数**
   - 同一 Bosch 65W GaN Fast-Track 项目，原在六语言版本中事实冲突：
     - **canonical**（`context/factory-data-canonical.md` § "Bosch — 65W GaN Car Charger"）：`Volume: 10,000 units | Timeline: 5 days sample → 25 days production → 0 defects`。
     - **EN 母版**：已对齐 canonical = 25 days / 2025。
     - **DE 版**：已对齐 canonical = 25 Tagen / 2025。
     - **ES 版**（上一轮审计已修复）：已对齐 canonical = 25 días de producción / 2025。
     - **FR 版（本页，修复前）**："termine la production en **28 jours**"（L319）、author bio "10 000 chargeurs voiture GaN livres en **28 jours**"（L590）、"zéro défaut terrain"。
   - **结论**：天数以 canonical 的 **25 天生产**为准 → **FR 版(28天)错误**。已修复 FR 全部 2 处 "28 jours" → "25 jours de production"（L319 blockquote 改写并改为"dans la fenêtre totale de 30 jours du fast-track promis"，呼应 canonical 5+25=30 天总周期；L590 author bio 同步），并将 `modified` 更新为 2026-08-29。
   - **年份字段**：FR 写"mars 2025"(L320)，与 canonical `Year: 2025` 一致，年份正确(仅月份未见于 canonical,保留)。跨语言 Bosch 事实(年份 2025 + 25 天生产)现已**六语言完全一致**。

---

## Medium Priority Issues

1. **FOB 报价表结构与 canonical §4.4 偏离（Citability 风险）— ✅ 已按方案 A 修复**
   - FR 版原 FOB 表(L339-341)按**功率档(EUR)**呈现，与 canonical §4.4 的真实 SKU/USD 口径偏离。
   - **业务方决策（2026-08-29）：方案 A** —— 将 FR FOB 表替换为 canonical §4.4 的真实 SKU，以**欧元呈现**（USD 0,92 汇率换算）。现四行与 EN/DE/ES 口径一致：
     | Modèle WOWOHCOOL | 500 u. (€) | 1 000 u. (€) | 5 000 u. (€) |
     |---|---|---|---|
     | Chargeur 20W 1 port | 2,76-4,60 | 1,84-3,68 | 1,66-3,22 |
     | Chargeur 30W 1 port | 3,68-5,06 | 2,76-4,14 | 2,30-3,68 |
     | GaN 65W 2 ports | 6,44-8,28 | 5,06-6,90 | 4,60-6,44 |
     | GaN 140W 2 ports câble rétractable | 13,80-17,48 | 11,04-13,80 | 8,28-11,04 |
   - 本土化保留：表头用法语、欧元、逗号小数、千分位空格、sentence case；另注明"câble rétractable +1-2$/unité, marquage laser +0,30-0,80$/unité"以衔接 canonical 注记。现六语言 FOB 口径一致。

2. **E-Mark 认证成本口径与 canonical §6 冲突（Citability 风险）— ✅ 已按补充标准修复**
   - FR 版原认证成本表(L435)：`E-Mark (ECE R10.06)` → **1 500-3 000 EUR / 4-6 sem.**（按"每型号一次性认证费"呈现）。
   - canonical §6：`E-Mark cost $0.80-1.20/unit`（**按每单位**计）。两者是不同成本口径。
   - **业务方决策（2026-08-29）：补充标准** —— (1) 在 E-Mark 行标注"(par modèle)"；(2) 在认证成本表后新增说明段，明确"forfait par modèle (une fois)" vs "marquage E-Mark 0,74-1,10 €/unité (0,80-1,20 $/unité, voir factory-data-canonical §6)"，并指出 CE 同理。现 FR 表与 canonical §6 自洽。

3. **FOB 表（方案A 后）与进口测算段内部自相矛盾（Citability 风险）— ✅ 已按方向 X 修复**
   - 方案 A 后，FR FOB 表(L341)写 **GaN 65W 2 ports, 1 000 u. = 5,06-6,90 €（≈ 5,50-7,50 $）**，而进口测算段原写 `9 500$`（9,50$/台），矛盾 46%。
   - **业务方决策（2026-08-29）：继续 → 方向 X** —— 在 L361 进口测算表把 9,50$ 拆解为 `6,50$ FOB nu (§4.4) + ~0,80-1,20$ marquage E-Mark (§6) + ~1,50$ CE certifié ≈ 9,50$ livré usine certifié`。现 FOB 表(裸价)与进口测算(全包认证价)口径分离但注明，下游 TVA/总价/毛利率逻辑不变，AI 抓取不再矛盾。L557 摘要"prix FOB ~9 500$"仍成立。

4. **`timeRequired` 与页面"阅读时长" — ✅ 已一致（无问题）**
   - Schema（L91）：`"timeRequired": "PT18M"`
   - 页面（L180）：`postMeta(date, modified, "18 min de lecture", "fr")` → 显示 **18 min de lecture**
   - 说明：与 ES 版不同，FR 版此处**无矛盾**，无需修复。

---

## Low Priority Issues

1. **Person `jobTitle` 与 canonical §15 待核对（跨语言一致性）**
   - FR Schema（L107）：`"jobTitle": "Market Manager, OEM/ODM Chargeurs Voiture & Chargeurs Sans Fil"`。
   - canonical §15（Person Schema 唯一事实源）：Snowy May = `"Marketing Manager & Founder"`。
   - 风险：EN/DE/ES 三版亦未统一使用 canonical 口径（ES 用 "Market Manager"、FR 用更细分的 "Market Manager, OEM/ODM..."），会制造跨语言 Person 实体漂移。**需先核对 EN/DE/ES 两版 jobTitle 再决定**（避免引入新的跨语言漂移）。属 Low，建议与 EN/DE/ES 一并统一。

2. **`about` Wikidata 实体 ID 跨语言不一致**
   - FR Schema（L96）：`"about": { "@id": "https://www.wikidata.org/wiki/Q5037910" }`（电动载具充电设备）。
   - 其他语言：EN=Q787402、ES=Q352917、DE 沿用 EN=Q787402。
   - 影响：同一主题文章指向不同 Wikidata 实体，削弱跨语言实体聚合信号。建议统一为同一 QID（需确认哪个最准确，Q787402 = "electric vehicle charging" 较通用；FR 的 Q5037910 更偏车载设备）。属 Low。

3. **品牌实体站点级缺位（同首页/EN 报告）**
   - 无 Wikipedia 词条、无 Reddit/Quora 系统化提及。本文贡献：具名 Bosch 案例(10.000 uds/25 jours/0 défaut) + 作者 LinkedIn `sameAs` + Organization `sameAs` 四平台。外部语料仍缺位。属站点级 High（首页报告 High #1），本文本身无法独立解决。

4. **hreflang 簇无波兰语（非缺陷，内容缺口）**
   - frontmatter（L17-22）有 en/de/es/fr/ru，**无 plPath**；hreflang 块无 `pl`。已核实 `src/pl/blog/` 下无 `chargeur-voiture` 对应版本 → 当前不含 pl 是正确行为（不能链到不存在的页面）。属六语言覆盖缺口，非技术错误。

---

## Category Deep Dives

### AI Citability (90/100)
- **强项（典型可被引用段落，且为法语本土数据）：**
  - 市场数据：`1,21 Mrd USD marché 2025`、法国车队/进口商视角、EU-VO 2022/2380 通用充电器法规。
  - 第一手工厂数据：BOM 分解（L345:`puce GaN ~1,20$ / contrôleur PD ~0,80$ / condensateurs ~0,90$ / boîtier ~1,10$ → BOM 4,00-5,80$`）、`9,50$/unité` 进口测算（L359）、defauts 0/10 000。
  - **报价表（L339-341）用欧元 FOB 档位**——高 extractable，但结构见 Medium #1。
  - FAQ 8 条均为法语 B2B 采购语言（certification / OEM branding / puissance PD / E-Mark vs CE / chargeur universel EU 2022/2380），answer-first，与 Schema 镜像。
  - 引用**法国/欧盟权威源**：Code de l'environnement、SYDEREP、EU-VO 2022/2380、ECE R10.06、NF——满足"本土市场调研"强制规则。
- **扣分项：** 见 High #1（Bosch 跨语言矛盾,✅已修复）、Medium #1（FOB 表偏离）、Medium #2（E-Mark 口径）。

### Brand Authority (62/100)
- 同站点级评估；本文贡献：具名 Bosch 案例（含 10 000 unités/25 jours/0 défaut 具体数字）、作者 LinkedIn `sameAs`、Organization `sameAs` 四平台。无 Wikipedia/Reddit，拉低本项。

### Content E-E-A-T (89/100)
- 作者 Person Schema 完整（jobTitle、worksFor、knowsAbout 含 "certification E-Mark"/"GaN V"/"conformité européenne"、LinkedIn、image）；简介声明 10+ 年经验并**亲自协调 Bosch 项目**（L590）。
- 引用外部权威源（EU-VO 2022/2380、ECE R10.06、Code environnement、SYDEREP、Wikidata），均 `rel="noopener noreferrer"`。
- 法国法规精确（EN 62368-1、ECE R10.06、EU-VO 2022/2380、Triman L.541-9-3、NF）——构成强 Trust。
- 弱项：Bosch 跨语言矛盾（High #1）若被 AI 抓到会削弱 Trust（✅已修复）。

### Technical GEO (92/100)
- 继承站点基础设施：robots.txt 全 AI 爬虫 Allow + `Content-Signal` 头；llms.txt 含 `collections.blog_fr` 循环（本文会被收录）；静态 HTML SSR，正文/表格/FAQ 无需 JS 即可读取。
- 图片均带描述性 alt（含 B2B 关键词，如 L313/348）；hero 图 `fetchpriority=high`。
- 留 8 分因未实测 Lighthouse/CWV 与生产站实时头。

### Schema & Structured Data (92/100)
- `@graph` 含 7 节点：Organization（areaServed FR/BE/CH/EU、address、contactPoint、sameAs）、WebSite、BreadcrumbList、BlogPosting（citation/speakable/about→Wikidata **Q5037910**）、Person（Snowy May）、HowTo（**7 steps** + HowToDirection）、FAQPage（**8 Q&A**，speakable `.faq-answer`）。
- FAQ 正文与 FAQPage Schema 文本镜像一致。
- 扣分项：`jobTitle` 与 canonical §15 待核对（Low #1）、`about` Wikidata QID 跨语言不一致（Low #2）。

### Platform Optimization (60/100)
- YouTube/LinkedIn/Facebook/X `sameAs` 存在；作者含 LinkedIn。无 Reddit/Quora/Wikipedia。同站点级评估。

---

## Quick Wins (Implement This Week)

1. **对齐 Bosch 案例跨语言事实（High #1）**— 已将 FR "28 jours" → "25 jours de production"(2 处)，与 canonical/EN/DE/ES 一致。✅ 已完成。
2. **统一 `modified` 日期**— FR `modified` 已更新为 2026-08-29（原 2026-08-04）。✅ 已完成。
3. **对齐 FOB 报价表至 canonical（Medium #1）**— 已按方案 A 替换 FR FOB 表为 canonical §4.4 真实 SKU（欧元呈现）。✅ 已完成。
4. **统一 E-Mark 认证成本口径（Medium #2）**— 已按补充标准标注"par modèle"并补 §6 每单位打标费说明。✅ 已完成。
5. **修复 FOB 表与进口测算段内部矛盾（Medium #3）**— 已按方向 X 把 9,50$ 拆解为裸 FOB+打标+CE，与 FOB 表/§6 自洽。✅ 已完成。
6. **统一 Person `jobTitle`（Low #1）**— 先核对 EN/DE/ES 两版 jobTitle，再决定是否把 FR 改为 canonical 的 "Marketing Manager & Founder"。

## 30-Day Action Plan

### Week 1: 数据自洽
- [x] 确定 Bosch 案例唯一事实源，对齐 FR 至 canonical 25 jours（EN/DE/ES 已完成）
- [x] 更新 FR `modified` 至 2026-08-29
- [x] **FOB 表对齐方案 A 已落地**（canonical §4.4 SKU，欧元呈现）
- [x] **E-Mark 口径补充标准已落地**（par modèle + §6 每单位值）
- [x] **FOB 表 vs 进口测算内部矛盾已修复**（方向 X）

### Week 2: E-E-A-T 微调
- [ ] 核对 EN/DE/ES jobTitle，统一 Person Schema 至 canonical §15
- [ ] 复核 `about` Wikidata QID 跨语言一致性（统一 QID）
- [ ] 复核 FAQ 与 Schema 文本逐条一致（已一致，仅监控）

### Week 3-4: 品牌实体（站点级，跨页）
- [ ] Wikipedia 词条草稿立项（借 Bosch 案例 + CES 2026 素材）
- [ ] Reddit/Quora（含法语 forum/子版）以客户视角真实分享车充 OEM 经验

---

## Appendix: Pages Analyzed

| File / URL | Type | GEO Issues |
|---|---|---|
| `src/fr/blog/chargeur-voiture-oem-guide/index.njk` | Blog Guide (FR) | Bosch跨语言矛盾28→25 jours(High,✅已修复)、FOB表EUR档位偏离canonical(Medium,待决策)、E-Mark口径冲突(Medium,待确认)、timeRequired一致(无问题)、jobTitle待核对(Low)、Wikidata QID不一致(Low)、hreflang缺pl(Low,非缺陷) |

**未实测项（环境限制）：** 生产站实时渲染、`wordCount` 真实词数、llms.txt 实际输出、EN/DE/ES/RU 同主题一致性（已确认 EN/DE/ES Bosch=25天，FR 已对齐）。
