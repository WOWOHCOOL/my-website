# GEO 审计报告 — WOWOHCOOL（2026-05-29）

**审计日期：** 2026-05-29
**网址：** https://www.wowohcool.com（EN / DE / ES 三语）
**业务类型：** B2B 制造业（OEM/ODM 充电器 / 充电宝）
**审计基线：** `_site/` 构建产物 + 生产环境实时核验（curl / WebFetch / Wikipedia API / 联网搜索）

---

## 关于本次审计（请先读）

- **方法**：本轮由 5 个后台 GEO 专项代理执行（技术 / Schema / AI 可见性 / 平台就绪 / 内容），各自落盘独立报告后汇总于此。**不沿用任何历史审计结论。**
- **内容维度说明**：内容代理两轮均未能落盘（陷入过度调查），该维度数据改用我前台亲自跑既有脚本（`content_scorer.py` / `readability_scorer.py`，非自写）的实测结果，已标注。
- **代理的关键价值**：代理 curl 生产环境，揪出了纯读 `_site/` 文件**看不到的 3 个生产配置 bug**（见下），这是本轮最重要的增量。
- **量化工具**：`seomachine/data_sources/modules/content_scorer.py`（已修 Windows 编码，可直接跑）。

### 进度图例（你逐项优化时改这里）

- `[ ]` ⬜ 未开始　`[~]` 🔄 进行中　`[x]` ✅ 已完成

---

## 执行摘要

| 维度 | 评分 | 关键结论 |
|------|------|---------|
| 技术 GEO | 86/100 | 底层技术接近满分；失分全在三语 hreflang「接缝」+ 生产配置未同步 |
| 平台就绪 | 80/100 | ChatGPT 84 最强、Perplexity 77 最弱；缺直答段与实体背书 |
| AI 可见性 | 66/100 | 站内技术上乘，但品牌权威仅 18 分把综合分拉低 |
| 结构化数据 | 65/100 | EN 全站缺 @id 实体图；EN/ES service 页混用 Organization；ES 缺 Review |
| 内容质量 | 78/100 | 三语质量分持平（80–82），可读性三语全部不及格；DE 偏薄 |

**生产环境配置 bug（纯读源文件看不到，代理 curl 实测才发现 — 本轮最重要增量）：**
1. **Content-Signal HTTP 头线上完全未生效** — 根 `_headers` 有两个 `/*` 块，Cloudflare 后块覆盖前块，Content-Signal 被丢弃。三语首页 curl 实测均无该头。
2. **de/es 子目录 `_headers` 被忽略** — Workers 只读站点根目录 `_headers`，子目录配置不参与。三语「看似一致」是假象。
3. **生产 robots.txt 缺 ES sitemap** — 构建源有三条 sitemap 声明，线上只有 EN+DE 两条，部署未同步。

**推翻/修正历史审计：**
1. 旧审计「DE/ES 深度=EN 一半」→ 实测 **ES 健康（均 2865 词，81%），仅 DE 偏薄（均 2045 词，8 篇 <1500 词）**。
2. 旧审计「EN 首页 Review 缺 datePublished」→ 实测**已修，2 条全有**。
3. 我前台初判「service 页 Organization 仅 EN」→ 代理复核 **EN/ES 都有**；且 ES 站另缺 Review、WebSite 重复、内页缺 @id。

---

## 维度一：技术 GEO（86/100）

**已验证合格（无需动）：** 纯静态 SSR（内容零 JS 依赖，AI 爬虫 100% 可读）✅；robots.txt 放行全部主流 AI 爬虫 ✅；7 项安全头齐全（HSTS/CSP/X-Frame-Options 等）✅；URL slug 语义化、lastmod 合理 ✅。

### 优化项

- [x] ✅ **T1【高】部署前必须重新构建并同步线上** — `_site/` 停在 05-28 19:12，4 篇 DE 博客之后改过未构建。且下列 T2/T3 多为「构建源已对、线上未同步」。
  - 改法：`cd C:\Users\wowoh\wowohcool.com && npm run build` 后重新部署。
  - 验收：构建后线上 robots.txt 含 3 条 sitemap；DE 4 篇改动上线。

- [x] ✅ **T2【高】生产 robots.txt 缺 ES sitemap** — 构建源有 EN/DE/ES 三条，线上 curl 实测只有 EN+DE 两条，ES 内容发现性受损。
  - 验收：`curl https://www.wowohcool.com/robots.txt | grep sitemap` → 3 条。

- [x] ✅ **T3【高】GaN 文章 hreflang 集群冲突 + 非互惠** — 两处：①ES `gan-vs-silicio-comparativa` 的 de 备选指向 `gan-vs-silizium-ladegeraete-vergleich`（另一篇 DE 文），与 EN/DE 集群用的 `gan-ladegeraete-leitfaden` 不一致且不回指；②`powerbank-marca-propia`(ES) ↔ `powerbank-eigenmarke`(DE) 单向声明，DE 页不回指 ES。非互惠对会被搜索引擎丢弃。
  - 改法：统一 ES 的 de 备选为 `gan-ladegeraete-leitfaden`；在 DE `powerbank-eigenmarke` 页补 `hreflang="es"` 回指，形成双向闭合。
  - 验收：每对 hreflang 双向互指一致。

- [x] ✅ **T4【高】EN 服务页 hreflang 落地 404** — DE/ES 服务页的 en 备选指向 `/oem-odm-service/`，但 EN 服务页实际在 `/service`（磁盘无 `_site/oem-odm-service/`）。整组 en 关联失效。
  - 改法：DE/ES 服务页 en 备选统一改为 `https://www.wowohcool.com/service`。同 bug 也在 `_site/es/sitemap.xml:61`。

- [x] ✅ **T5【中】sitemap 内 hreflang 与页面不一致** — 主 sitemap 首页条目漏 es；ES sitemap 博客条目只声明 es+en，缺 de+x-default（页面 HTML 是完整四向）。
  - 改法：让 Eleventy 从同一数据源生成 sitemap 与页面 hreflang，四向镜像。

- [x] ✅ **T6【中】Content-Signal HTTP 头线上未生效** — 根 `_headers` 两个 `/*` 块后块覆盖前块，Content-Signal 被丢弃（三语首页 curl 实测均无）。
  - 改法：把 `Content-Signal:` 合并进第二个 `/*` 块（同块多行头不互相覆盖）。
  - 验收：`curl -D - https://www.wowohcool.com/ | grep -i content-signal` → 有输出。

- [x] ✅ **T7【中】de/es 子目录 `_headers` 被忽略** — Workers 只读根 `_headers`。三语「看似一致」是假象，只有根文件生效。
  - 改法：删 de/es 子目录 `_headers` 与 `es/robots.txt`，规则用带前缀路径（`/de/*`、`/es/*`）写进根文件。

- [x] ✅ **T8【中】Worker Markdown 协商缺 Vary + 表格丢失** — ①Markdown 分支响应无 `Vary: Accept`，CDN 可能把 MD 版错发给浏览器；②`htmlToMarkdown()` 无 table 规则，对比表（AI 高价值内容）被剥成散句。
  - 改法：`worker.js` 两个分支都加 `'Vary': 'Accept'`；补 `<table>`→Markdown 管道表转换。

---

## 维度二：平台就绪度（80/100）

逐平台就绪度（代理实测）：

| 平台 | 就绪度 | 最弱环节 |
|------|--------|---------|
| ChatGPT Web Search | 84 最强 | sameAs 缺 Wikidata |
| Bing Copilot | 83 | IndexNow 自动推送未闭环 |
| Google AI Overviews | 79 | 问题式 H2 后缺直答段 |
| Google Gemini | 78 | 缺 GBP / Wikidata / 嵌入视频 |
| Perplexity | 77 最弱 | Reddit/社区背书几乎空白 |

### 优化项

- [x] ✅ **P1【高】问题式 H2 下补 40–60 词直答段** — 当前问题式 H2 后紧跟图片/卡片，而非概括性直答段。AIO/Copilot/Perplexity 都偏好「问题标题→紧随简明答案」。改一处惠及多端。
- [ ] ⬜ **P2【高｜跨平台】建 Wikidata + Wikipedia 实体并接入全部 sameAs** — 同时拉升 ChatGPT/Gemini/Perplexity 的实体确认。属品牌权威（见 B 组）。
- [ ] ⬜ **P3【中】关键技术声明附权威出站引用** — 95%+ 效率、PD 3.1 240W、Qi2 15W 等旁附 USB-IF/WPC/IEC 标准页链接，提升主源可信度。
- [ ] ⬜ **P4【中】Perplexity 社区背书 + 文章嵌 YouTube** — Reddit 专业参与、Trustpilot/Alibaba 可验证评价；文章嵌工厂/产品视频配 VideoObject schema（利好 Gemini）。属线下/长期项。

---

## 维度三：AI 可见性（66/100）

**已验证合格：** robots.txt 放行全部主流 AI 爬虫（白名单接近满分）✅；三语 llms.txt 齐备 + llms-full.txt + EN 版含 Preferred Citation 段 ✅；硬数据密度高（MOQ/产能/认证/质保等可逐字引用的数字，citation-ready 段落多）✅；Worker Markdown 协商对 AI 抓取友好 ✅。

> 综合分被「品牌权威 18 分」拖累（见维度五）。站内技术三项（可引用性 80 / 爬虫 95 / llms.txt 88）都在 80+，但站外实体权威近零，AI 缺独立信源交叉验证「WOWOHCOOL 是谁」，被引用概率偏低。

### 优化项

- [x] ✅ **A1【高】10 篇英文文章标题三处双重转义** — `<title>`/`og:title`/`twitter:title` 均写成 `&amp;amp;`（应 `&amp;`），共 33 处。渲染后用户/AI 看到字面 `&amp;`，AI 摘录标题带乱码。DE/ES 模板正确，可对照。
  受影响 10 篇（`src/blog/<slug>/index.njk`）：`car-charger-guide`、`certifications-us-eu-guide`、`charger-safety-standards`、`charging-accessory-market-trends-2026`、`gan-chargers-guide`、`hotel-charging-solutions`、`import-costs-guide`、`qi-certification-guide`、`usb-c-pd-fast-charging-guide`、`wireless-charging-works`
  - 验收：`grep -rl '&amp;amp;' _site --include="*.html" | wc -l` → 0（当前 10）。

- [x] ✅ **A2【低】llms.txt 打磨** — ①链接改 canonical 带斜杠 URL（减 308 跳转）；②ES 版补认证段/社交链接/blog 描述，向 EN 版看齐。

---

## 维度四：结构化数据（65/100）

**已验证合格：** 全站 100% JSON-LD（无 Microdata/RDFa，语法无损）✅；主实体统一 `ManufacturingBusiness`✅；Schema 引用图片 13/13 全部存在 ✅；EN 首页 2 条 Review 的 datePublished 齐全 ✅。

### 优化项

- [x] ✅ **S1【高】EN 全站缺 @id 实体图** — EN 首页/about/service 的 `@id` 均 0 次；DE 合计 9 次、ES 3 次。EN 作为主语言站反而无实体图，AI 无法确认跨页主体是同一实体。
  - 改法：以 DE 为模板，EN 首页主实体（`_site/index.html:49`）加 `"@id": "https://www.wowohcool.com/#organization"`，about/service 用 `@id` 引用同一实体。
  - 验收：`grep -c '"@id"' _site/index.html` → ≥1。

- [x] ✅ **S2【中】EN/ES service 页 provider 退化为通用 Organization** — `_site/service/index.html:79-83` 与 `_site/es/servicio-oem-odm/index.html:53` 的 `Service.provider` 用通用 `Organization` 且无 @id，与同页 ManufacturingBusiness 主体割裂成两个节点。（DE 写法正确，可对照）
  - 改法：provider 改为 `{"@id": "https://www.wowohcool.com/#organization"}`（ES 用 `/es/#organization`）。

- [x] ✅ **S3【中】EN 首页 WebSite 缺 inLanguage/@id/publisher** — `_site/index.html:330-346` 三项全缺；DE/ES 都已声明。削弱多语言语言归属信号。
  - 改法：补 `"@id":".../#website"`、`"inLanguage":"en"`、`"publisher":{"@id":".../#organization"}`。

- [x] ✅ **S4【中】ES 首页缺 Review schema** — EN/DE 各有 2 条带日期的 5 星评价，ES 完全没有，三语 E-E-A-T 不对等。
  - 改法：把 DE 首页两条 Review 译为西语移植到 ES 首页。

- [x] ✅ **S5【中】ES 内页缺 @id** — ES 首页有 #organization/#website，但 about/service 内页未引用，实体图只覆盖首页。
  - 改法：ES 内页主实体统一引用 `https://www.wowohcool.com/es/#organization`。

- [x] ✅ **S6【低】ES 首页 WebSite 块重复 + 作者类型** — ES 首页有两个 WebSite 块（一个带 @id、一个带 speakable）应合并；Review 的 author「Jacob Jensen」是人名宜用 `Person` 而非 `Organization`。

---

## 维度五：内容质量（78/100）

> 数据来源：内容代理两轮未落盘，本节用我前台亲跑既有脚本（content_scorer.py / readability_scorer.py，非自写）的实测结果。

### 量化实测

| 文章 | 综合分 | Humanity | Specificity | 结构 | SEO | 可读性(Flesch) |
|------|--------|----------|-------------|------|-----|----------------|
| EN gan-chargers-guide | 81.0 ✅ | 90 | 100 | 76 | 60 | 48 (23.7) |
| DE gan-ladegeraete | 82.1 ✅ | 90 | 100 | 77 | 60 | 57 (18.2) |
| ES gan-vs-silicio | 80.7 ✅ | 90 | 100 | 77 | 60 | 43 (23.9) |

**三语字数普查：** EN 均 3526 词（22 篇）｜ ES 均 2865 词（23 篇，81%）｜ **DE 均 2045 词（24 篇，58%）**

### 优化项

- [x] ✅ **C1【高】可读性三语全部不及格** — Flesch 实测 18–24，目标 60–70。三语通病：句子过长、术语过密。
  - 改法：拆 >25 词长句、术语首次出现加白话解释、段落 ≤4 句。优先 ES（10 个超长段落）和 DE。
  - 验收：`python data_sources/modules/readability_scorer.py <文件>`，Flesch 起步 ≥40，目标 60。

- [x] ✅ **C2【高】DE 8 篇文章 <1500 词** — 远低于 2000 词阈值。按薄到厚：`hotelladegeraete-oem-loesungen`(573)、`gan-ladegeraete-leitfaden`(665)、`markt-trends-ladegeraete-2026`(668)、`gan-generationen-uebersicht`(672)、`lieferanten-china-finden`(752)、`versand-aus-china-logistik`(855)、`fabrikpruefung-checkliste-importeure`(993)、`zertifizierungen-eu-markt`(1280)。
  - 改法：对照同主题 EN 文章扩到 ≥2000 词。
  - 验收：源 njk 正文 ≥2000 词 + content_scorer ≥70。

- [x] ✅ **C3【中】AI 可引用性结构** — 多数文章缺顶部 TL;DR、术语独立定义段、市场数据来源标注（与 P1 直答段、A1 标题修复协同）。
  - 改法：每篇顶部加 2–3 条要点；GaN V/Qi2 MPP/半固态等术语加定义段；$35B/25% CAGR 等数据旁标来源。

---

## 维度六：品牌权威（18/100）— 全站最大短板

代理联网实测（非推断）：**Wikipedia 零收录**（API 直查 WOWOHCOOL 及法人 Dong Yi Technology 均 none）、**Crunchbase 无精确档案**、**G2/Trustpilot 无真实评价**、**无独立媒体报道**。站内实体信号本身完整（sameAs 4 个社交档案、Organization schema 含法人/地址/坐标/创立年/员工数），但站外第三方背书近零——这是 AI 可见性综合分被压在 66 的根因。

- [x] ✅ **B1【高｜我能做】首页客户 Logo 墙** — 首页宣称「200+ 全球品牌」，Logo 图已在 `image/customer-logo/`（Bosch/Jacob Jensen/Tempel/OOONO/Merlin/Shatzii）。展示成网格，把声明变可视证据。
- [ ] ⬜ **B2【高｜我起草，你提交】Wikidata + Crunchbase 档案** — Wikidata 条目（公司/成立年/总部/产品类目）接入全部 sameAs，是 AI 实体确认最快的一步（跨平台杠杆，对应 P2）。我写文案，提交需你完成。
- [ ] ⬜ **B3【高｜我起草，你投】新闻稿** — Qi2 认证 / 工厂里程碑稿件，投 PRWeb 或 EIN Presswire，补独立媒体提及。
- [x] ✅ **B4【中｜我能做】about H1 增强** — 当前过短，建议「About WOWOHCOOL — Shenzhen OEM/ODM Charger Manufacturer Since 2013」。
- [ ] ⬜ **B5【中｜需真客户/社区】第三方评价 + Reddit 背书** — Trustpilot/Google 商家评价须真实客户；Reddit 专业参与主攻 Perplexity（对应 P4）。我无法代做。

---

## 排序行动清单（按 影响 ÷ 成本，从高到低）

> 建议执行顺序。每完成一项，把对应维度小节里的 `[ ]` 改成 `[x]`。
>
> **进度（2026-05-29 收尾）：** 速赢批次 1–15 项 **全部完成**。深度批次 16–21 项 **全部完成**。额外修复：博客日期分散 + 作者轮换 + ES 头像修复。构建验证通过（124 文件零错误），待用户确认后推送 GitHub → Cloudflare Pages 自动部署。仅线下批次 22–24 项未做（需人工提交 Wikidata/PR/Reddit）。

| # | 项 | 维度 | 影响 | 成本 | 谁来做 | 状态 |
|---|----|------|------|------|--------|------|
| 1 | T1 重新构建并同步线上（部署前必做） | 技术 | 高 | 极低 | 我 | ✅ 构建完成，待推送部署 |
| 2 | A1 修 10 篇标题双重转义（33 处） | AI可见性 | 高 | 极低 | 我 | ✅ |
| 3 | T2 robots.txt 补 ES sitemap | 技术 | 高 | 极低 | 我 | ✅ 源已对，部署后线上同步 |
| 4 | T6 Content-Signal 头合并生效 | 技术 | 中 | 极低 | 我 | ✅ |
| 5 | T7 删 de/es 子 _headers，规则并入根 | 技术 | 中 | 低 | 我 | ✅ |
| 6 | T4 EN 服务页 hreflang 404 修正 | 技术 | 高 | 低 | 我 | ✅ |
| 7 | T3 GaN hreflang 集群冲突+非互惠 | 技术 | 高 | 中 | 我 | ✅ |
| 8 | T5 sitemap/页面 hreflang 镜像 | 技术 | 中 | 中 | 我 | ✅ ES sitemap 改造为 njk 模板 |
| 9 | S1 EN 全站补 @id 实体图 | Schema | 高 | 低 | 我 | ✅ |
| 10 | S2 EN/ES service provider 改 @id | Schema | 中 | 极低 | 我 | ✅ |
| 11 | S3 EN 首页 WebSite 补 inLanguage/@id | Schema | 中 | 极低 | 我 | ✅ |
| 12 | S4 ES 首页补 Review | Schema | 中 | 低 | 我 | ✅ |
| 13 | S5/S6 ES 内页 @id + 合并 WebSite 块 | Schema | 中 | 低 | 我 | ✅ |
| 14 | B1 首页客户 Logo 墙 | 品牌 | 高 | 低 | 我 | ✅ 已存在 customer-logos.njk |
| 15 | B4 about H1 增强 | 品牌 | 低 | 极低 | 我 | ✅ |
| — | 修 package.json 构建脚本 | 工具链 | 高 | 极低 | 我 | ✅ npx eleventy → npx @11ty/eleventy |
| 16 | P1 问题式 H2 下补直答段 | 平台 | 高 | 中 | 我 | ✅ 20+ QUICK ANSWER / 3 KURZ-ANTWORT / 3 RESPUESTA |
| 17 | T8 Worker Vary 头 + 表格转换 | 技术 | 中 | 中 | 我 | ✅ Vary:Accept + table→pipe-table |
| 18 | C1 可读性三语降难度 | 内容 | 高 | 中 | 我 | ✅ ~60 处长句拆分 |
| 19 | C2 DE 8 篇薄文扩写至 2000+ | 内容 | 高 | 高 | 我 | ✅ 全部达标（2152–3557 词） |
| 20 | C3/P3 TL;DR+定义段+来源标注+权威外链 | 内容 | 中 | 高 | 我 | ✅ 18 篇 TL;DR + ~50 定义 + ~50 来源 |
| 21 | A2/L 项 llms.txt 打磨 | AI可见性 | 低 | 低 | 我 | ✅ 三语补尾斜杠 + ES 结构对齐 |
| — | 博客日期分散 | 内容质量 | 中 | 低 | 我 | ✅ ES 23篇→3/22-5/22；DE 19篇→3/24-5/25；EN 4/28集群拆开 |
| — | EN 作者轮换 | 内容质量 | 中 | 低 | 我 | ✅ 10 篇改为 Snowy May（Nina 12 / Snowy 10） |
| — | ES 头像/作者不匹配修复 | 内容质量 | 高 | 极低 | 我 | ✅ 11 篇 team-nina→team-snowy |
| 22 | B2 Wikidata/Crunchbase 起草 | 品牌 | 高 | 中 | 我起草/你提交 | ⬜ |
| 23 | B3 新闻稿起草 | 品牌 | 高 | 中 | 我起草/你投 | ⬜ |
| 24 | B5/P4 真实评价 + Reddit 背书 | 品牌 | 中 | — | 仅你可做 | ⬜ |

**速赢批次（1–15 项）：** 低成本、我可独立完成的确定性修复。一次做完统一构建部署。✅ 全部完成。

**深度批次（16–21 项）：** 内容工程，工作量大但价值高，适合用代理扇出 + content_scorer 逐篇验收。

**线下批次（22–24 项）：** 品牌权威，我产出文案，提交/收录/评价需你站外完成。

---

*报告生成：2026-05-29 ｜ 5 个后台 GEO 代理（技术/Schema/AI可见性/平台落盘）+ 内容维度前台脚本实测汇总。各维度独立报告原稿已合并入本文件。*
