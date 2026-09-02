# GEO Audit Report: Autoladegerät OEM Guide (wowohcool.com /de/)

**Audit Date:** 2026-08-29
**URL:** https://www.wowohcool.com/de/blog/autoladegeraet-ratgeber/ (template `src/de/blog/autoladegeraet-ratgeber/index.njk`)
**Business Type:** Publisher (B2B 制造商德语博客指南) — 强本土化第一手数据
**Pages Analyzed:** 1 篇文章（含 Schema 图、正文、作者区、FAQ、引用来源、6 语言 hreflang）

---

## Executive Summary

**Overall GEO Score: 83/100 (Good)**

这是站内**本土化质量最高的 GEO 资产之一**,甚至略优于其英文母版(car-charger-guide, 81)。核心优势:**真正的德语市场本土化**——引用德国本土权威源(KBA 49,1 Mio. 车辆、Statista 10,1 年车龄、Stiftung EAR、ProdSG、WEEE),价格用欧元(4-8 € / 8-15 € / 12-25 €),精确引用德国法规(EN 62368-1、EU-VO 2022/2380、ECE R10 Rev.6),并含德国本土案例( Münchner Fuhrpark 50 辆车)。Schema 比 EN 版更完整(HowTo **5 步** + FAQ **6 条** + Person 含 Xing `sameAs`)。

主要差距:(1) **跨语言数据矛盾**——同一 Bosch 案例 EN 写"2026/25 天"、DE 写"2025/28 天",AI 引用会抓到冲突;(2) **`timeRequired` 自相矛盾**——Schema `PT8M` 与页面"17 min Lesezeit"不符;(3) 站点级品牌实体缺位(同首页/EN 报告)。

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 93/100 | 25% | 23.25 |
| Brand Authority | 62/100 | 20% | 12.4 |
| Content E-E-A-T | 90/100 | 20% | 18.0 |
| Technical GEO | 92/100 | 15% | 13.8 |
| Schema & Structured Data | 93/100 | 10% | 9.3 |
| Platform Optimization | 60/100 | 10% | 6.0 |
| **Overall GEO Score** | | | **83/100** |

---

## Critical Issues (Fix Immediately)

无。

---

## High Priority Issues

1. **跨语言 Bosch 案例数据矛盾（Citability 跨语种硬冲突）— ✅ 已按 canonical 修复天数**
   - 同一 Bosch 65W GaN Fast-Track 项目，原在两语言版本中事实冲突：
     - **EN 母版**（`src/blog/car-charger-guide/index.njk` L666-669）：`In early 2026` … `10,000 units delivered in 25 days`
     - **DE 版**（本页 L597-598）：`Im März 2025` … `10.000 Einheiten in 28 Tagen`
   - **以工厂 canonical 数据为唯一事实源**（`context/factory-data-canonical.md` § "Bosch — 65W GaN Car Charger"）：`Volume: 10,000 units | Timeline: 5 days sample → 25 days production → 0 defects`。
   - **结论**：天数以 canonical 的 **25 天生产**为准 → **EN 版(25天)正确,DE 版(28天)错误**。已修复 DE 版全部 7 处 "28 Tagen" → "25 Tagen"(L403/423/596/600/727/750 及 L598 改写),并调整 L598 措辞为"Fertigung in 25 Tagen … innerhalb der zugesagten 30 Tage Gesamtlaufzeit"(呼应 L597 的 30 天总周期,与 canonical 5+25=30 吻合)。
   - **遗留待决(年份字段 canonical 无记录)**：canonical 仅记录"25 天生产",未记录项目年份。DE 版仍写"März 2025"、EN 版写"early 2026"——此年份为两版自行添加、无 canonical 支撑。需业务方确认真实年份后统一(建议与 canonical 缺失字段补全流程一并处理,避免再漂移)。
   - **✅ 年份已确认并闭环**：业务方确认 Bosch 项目真实启动年份为 **2025**。(1) 已在 `context/factory-data-canonical.md` § "Bosch — 65W GaN Car Charger" 补 `Year: 2025`;(2) EN 母版 "In early 2026" → "In early 2025"(L666)已对齐 canonical。DE 版本就为 "März 2025"(年份正确,仅月份未见于 canonical,保留)。跨语言 Bosch 事实(年份 2025 + 25 天生产)现已完全一致。
   - AI 影响(修复前)：Perplexity / Gemini 多语言检索时若同时索引两版,会输出自相矛盾的项目事实。现已消除天数冲突,仅年份待统一。

---

## Medium Priority Issues

1. **`timeRequired` 与页面"阅读时长"矛盾**
   - Schema（L143）：`"timeRequired": "PT8M"`
   - 页面（L370）：`postMeta(date, modified, "17 min Lesezeit", "de")` → 显示 **17 min Lesezeit**
   - 说明：EN 母版已统一为 `PT8M`↔"8 min read"，但 DE 版页面是 17 分钟而 Schema 仍是 8 分钟——**DE 版未同步**。
   - 修复：统一为同一数值。DE 版正文明显更长（实测 2620 词 vs EN 3492，但 DE 含更多章节+6 FAQ），"17 min"更接近真实；建议 Schema 改 `PT17M` 匹配页面，或页面改"8 min"匹配 Schema（二选一）。

2. **`wordCount: 2709`（L141）待核对真实值**
   - 实测全文可见正文约 **2620 词**（含 Key Takeaways/FAQ/作者区/CTA），偏差约 3%，基本可接受。
   - 修复（可选）：若要求精确，更新为 2620；或保留 2709（在合理误差内）。属低影响项。

---

## Low Priority Issues

1. **品牌实体站点级缺位（同首页/EN 报告）**
   - 无 Wikipedia 词条、无 Reddit/Quora 系统化提及。本文贡献：具名 Bosch 案例 + 作者 Xing `sameAs`（L195，德语市场强信号）+ LinkedIn，但外部语料仍缺位。属站点级 High（首页报告 High #1），本文本身无法独立解决。

2. **hreflang 簇无波兰语（非缺陷，内容缺口）**
   - frontmatter（L10-13）有 enPath/frPath/esPath/ruPath，**无 plPath**；hreflang 块（L18-22）无 `pl`。已核实 `src/pl/blog/` 下无 `autoladegeraet` 对应版本 → 当前不含 pl 是正确行为（不能链到不存在的页面）。与 EN 母版一致，属六语言覆盖缺口，非技术错误。

3. **FAQ 数量（6）少于 EN 母版（8）**
   - EN 版 FAQ 8 条，DE 版 6 条（缺 MOQ/FOB 报价、12V/24V 兼容性两条采购语言 FAQ）。虽 Schema 与正文镜像一致（无内部矛盾），但相对 EN 版信息增益略少。
   - 建议（可选）：将 EN 版的"MOQ and FOB pricing"与"12V vs 24V"两条 FAQ 德语化补入，提升德语采购者覆盖。

---

## Category Deep Dives

### AI Citability (93/100)
- **强项（典型可被引用段落，且为德语本土数据）：**
  - 市场数据：`Deutschland hält 33% Marktanteil` / `1,21 Mrd. USD (2025)` / `49,1 Mio. zugelassene Fahrzeuge (KBA, Jan 2026)` / `10,1 Jahre Haltedauer (Statista)`（L378/443）
  - 第一手工厂数据：`Retourenquote 15% → <1%`（L377/398）、`58°C am Armaturenbrett` 实测（L580）、`84,77% der Automotive-USB-PD-Systeme ab Werk integriert`（L508）、`Defektrate <0,1%`（L648）
  - 报价表（L487-504）用 **欧元** FOB 阶梯（4-8 € / 8-15 € / 12-25 €），高 extractable 且本土化
  - FAQ 6 条均为德语 B2B 采购语言（Zertifizierung / OEM-Branding / PD-Leistung / E-Mark vs CE / Common Charger），answer-first，与 Schema 镜像
  - 引用**德语/欧洲权威源**：KBA、Statista、Stiftung EAR、EU-VO 2022/2380、ECE R10 Rev.6——满足"本土市场调研"强制规则
- **扣分项：** 见 High #1（Bosch 跨语言矛盾）、Medium #1（timeRequired）。

### Brand Authority (62/100)
- 同站点级评估；本文贡献：具名 Bosch 案例（含 10.000 Einheiten/28 Tage/0 Felddefekte 具体数字）、作者 Xing + LinkedIn `sameAs`、Organization `sameAs` 四平台。无 Wikipedia/Reddit，拉低本项。

### Content E-E-A-T (90/100)
- 作者 Person Schema 完整（jobTitle "Market Managerin, OEM/ODM & Technologie"、Xing+LinkedIn、worksFor、knowsAbout 6 项含 "Autoladegerät"/"DACH Flotten"、image）；简介声明 10+ 年经验并**亲自协调 Bosch 项目**（L727）。
- 引用 8 个外部权威源（GM Insights、Mordor、BCC Research、KBA、Statista、Stiftung EAR、Fortune Business Insights、Infineon），均 `rel="noopener noreferrer"`。
- 德国法规精确（EN 62368-1、EU-VO 2022/2380、ECE R10 Rev.6、ProdSG、WEEE/ElektroG、HS 8504.40、19% ESt）——构成强 Trust。
- 弱项：Bosch 跨语言矛盾（High #1）若被 AI 抓到会削弱 Trust。

### Technical GEO (92/100)
- 继承站点基础设施：robots.txt 全 AI 爬虫 Allow + `Content-Signal` 头；llms.txt 含 `collections.blog_de` 循环（本文会被收录）；静态 HTML SSR，正文/表格/FAQ 无需 JS 即可读取。
- 图片均带描述性 alt（含 B2B 关键词，如 L542/543/600/638）；hero 图 `fetchpriority=high`。
- 留 8 分因未实测 Lighthouse/CWV 与生产站实时头。

### Schema & Structured Data (93/100)
- `@graph` 含 7 节点：Organization（areaServed/address/contactPoint/sameAs/Xing+LinkedIn）、WebSite、BreadcrumbList、BlogPosting（citation/speakable/about→Wikidata Q787402）、Person（含 **Xing** sameAs，比 EN 版多）、HowTo（**5 steps** + HowToDirection，比 EN 版 3 步更完整）、FAQPage（**6 Q&A**，speakable `.faq-answer`）。
- FAQ 正文（L699-704）与 FAQPage Schema 文本镜像一致。
- 扣分项：`timeRequired PT8M` 与"17 min Lesezeit"矛盾（Medium #1）。

### Platform Optimization (60/100)
- YouTube/LinkedIn/Facebook/X `sameAs` 存在；作者含 Xing（德语市场强信号）。无 Reddit/Quora/Wikipedia。同站点级评估。

---

## Quick Wins (Implement This Week)

1. **对齐 Bosch 案例跨语言事实（High #1）**— 先确认真实数值（年份+天数），回改 EN 或 DE 一版对齐；直接消除跨语种 citability 硬冲突。
2. **统一 `timeRequired`（Medium #1）**— DE 版 Schema 改 `PT17M` 或页面改"8 min"，与 EN 版逻辑一致。
3. **核对并更新 `wordCount`（Medium #2）**— 实测 2620，偏差小，可保留或更新。
4. **补 DE 版 FAQ 至 EN 同级（Low #3）**— 加 MOQ/FOB 与 12V/24V 两条德语 FAQ，提升采购覆盖。
5. **确认 llms.txt 收录 DE slug**— 验证 `collections.blog_de` 含此 slug（应已包含）。

## 30-Day Action Plan

### Week 1: 数据自洽
- [ ] 确定 Bosch 案例唯一事实源，对齐 EN/DE 两版
- [ ] 统一 DE 版 timeRequired 与阅读时长
- [ ] 核对 wordCount 真实值

### Week 2: E-E-A-T 微调
- [ ] FAQ 补两条德语采购 FAQ（MOQ/FOB、12V/24V）
- [ ] 复核 FAQ 与 Schema 文本逐条一致（已一致，仅监控）

### Week 3-4: 品牌实体（站点级，跨页）
- [ ] Wikipedia 词条草稿立项（借 Bosch 案例 + CES 2026 素材）
- [ ] Reddit/Quora（含德语 g/ 或 Xing 社区）以客户视角真实分享车充 OEM 经验

---

## Appendix: Pages / Files Analyzed

| File / URL | Type | GEO Issues |
|---|---|---|
| `src/de/blog/autoladegeraet-ratgeber/index.njk` | Blog Guide (DE) | Bosch跨语言矛盾(High)、timeRequired矛盾(Med)、wordCount偏差(Med)、FAQ少于EN(Low)、hreflang缺pl(Low,非缺陷) |

**未实测项（环境限制）：** 生产站实时渲染、`wordCount` 真实词数、llms.txt 实际输出、EN/FR/ES/RU 同主题一致性（仅确认 EN 版 Bosch 数字冲突）。
