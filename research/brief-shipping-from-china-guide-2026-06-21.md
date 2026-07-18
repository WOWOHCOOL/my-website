
## 0. GSC Performance Data (Last 30 Days)

> Data source: offline export (refresh from GSC for latest data)

**Page:** `/blog/shipping-from-china-guide`
**Total Clicks:** 0 | **Impressions:** 80
**Avg CTR:** 0.0% | **Avg Position:** 13.3

### Site-Wide Keyword Intelligence (Charger/Power-Bank Related)

| Keyword | Clicks | Impr. | Pos. | CTR |
|---------|:------:|:-----:|:----:|:---:|
| wowohcool | 33 | 108 | 14.7 | 30.6% |
| gan3 vs gan5 | 1 | 36 | 7.9 | 2.8% |
| semi solid power bank | 1 | 5 | 7.6 | 20.0% |
| best china power bank | 1 | 1 | 11.0 | 1.0% |
| odm | 0 | 114 | 26.2 | 0.0% |
| qi zertifizierung | 0 | 95 | 19.7 | 0.0% |
| apple usb-c power adapter safety certifications ul ce ukca | 0 | 87 | 11.5 | 0.0% |
| gan powered chargers market | 0 | 77 | 18.2 | 0.0% |
| inductive charging | 0 | 67 | 37.0 | 0.0% |
| ugreen charger safety certification ul 62368-1 | 0 | 66 | 8.8 | 0.0% |
| induction charging | 0 | 65 | 29.8 | 0.0% |
| anker charger ul listed iec 62368-1 certification | 0 | 64 | 6.5 | 0.0% |
| gan adapter market | 0 | 62 | 21.3 | 0.0% |
| oem | 0 | 59 | 57.4 | 0.0% |
| us gan powered chargers market | 0 | 58 | 33.2 | 0.0% |


### Position Distribution (All Relevant Keywords: 583)

| Range | Keywords |
|-------|:--------:|
| 1-3 | 17 |
| 4-10 | 156 |
| 11-20 | 126 |
| 21+ | 260 |


### Quick Wins (Position 11-20, Impr. >= 20)

| Keyword | Clicks | Impr. | Pos. | CTR |
|---------|:------:|:-----:|:----:|:---:|
| wowohcool | 33 | 108 | 14.7 | 30.6% |
| qi zertifizierung | 0 | 95 | 19.7 | 0.0% |
| apple usb-c power adapter safety certifications ul ce ukca | 0 | 87 | 11.5 | 0.0% |
| gan powered chargers market | 0 | 77 | 18.2 | 0.0% |
| how does induction charging work | 0 | 44 | 19.0 | 0.0% |
| odm-produktion | 0 | 41 | 14.0 | 0.0% |
| uk gan powered chargers market | 0 | 25 | 14.8 | 0.0% |
| wireless charger oem supplier for b2b | 0 | 23 | 13.7 | 0.0% |
| charger odm factory | 0 | 22 | 16.8 | 0.0% |
| odm bedeutung | 0 | 20 | 14.3 | 0.0% |

### Content Gap Opportunities (Position > 20, Impr. >= 30)

| Keyword | Clicks | Impr. | Pos. | CTR |
|---------|:------:|:-----:|:----:|:---:|
| odm | 0 | 114 | 26.2 | 0.0% |
| inductive charging | 0 | 67 | 37.0 | 0.0% |
| induction charging | 0 | 65 | 29.8 | 0.0% |
| gan adapter market | 0 | 62 | 21.3 | 0.0% |
| oem | 0 | 59 | 57.4 | 0.0% |
| us gan powered chargers market | 0 | 58 | 33.2 | 0.0% |
| gan alternatives | 0 | 40 | 25.6 | 0.0% |
| qi inductive wireless charging | 0 | 31 | 29.6 | 0.0% |
| usa oem and odm power bank services | 0 | 30 | 26.3 | 0.0% |
| oem bedeutung | 0 | 30 | 29.7 | 0.0% |

### Low CTR Opportunities (Position <= 10, CTR < 3%, Impr. >= 50)

| Keyword | Clicks | Impr. | Pos. | CTR |
|---------|:------:|:-----:|:----:|:---:|
| ugreen charger safety certification ul 62368-1 | 0 | 66 | 8.8 | 0.0% |
| anker charger ul listed iec 62368-1 certification | 0 | 64 | 6.5 | 0.0% |
| anker charger ul listed iec 62368-1 certified | 0 | 54 | 7.1 | 0.0% |

---
_How to use this data: Quick Wins = keywords close to page 1 that need targeted optimization. Content Gaps = queries you get impressions for but don't rank — add dedicated sections. Low CTR = meta title/description rewrite candidates._


# 研究简报：Shipping from China Guide 2026（刷新版）

**目标文件**：`C:\Users\wowoh\wowohcool.com\src\blog\shipping-from-china-guide\index.njk`
**研究日期**：2026-06-21
**研究目标**：刷新现有 2200 词文章，融入 2025 年 5 月以来的关税/物流/合规重大变化
**现状基线**：2026-05-03 发布，2026-05-24 修订，7 章节，9 min read，作者 Snowy May

---

## 0. 必须修复：现文遗留缺陷

### 0.1 UTF-8 字符损坏（高优先级，影响 SEO 与可读性）

| 行号区间 | 问题 | 应改为 |
|---|---|---|
| L226 | `SOC �?0%` | `SOC ≤30%` |
| L274, L383-386, L398-400, L405-409, L415-419, L431-435, L466-471, L613-617 | `—` 出现在列表项开头 | `•` 或直接转 `<li>` 子弹（当前是 `—` 取代真正的项目符号） |
| L373-375 | `0GP`/`0GP`/`0HC` | `20GP`/`40GP`/`40HC` |
| L544, L546-547 | `SOC �?30%` 出现两次 | `SOC ≤30%` |
| L557-563 | `—strong>Commercial Invoice:</strong>` 等 6 条 | `<strong>Commercial Invoice:</strong>`（开头的 `—` 实际吃掉了 `<`） |
| L614-617 | `—strong>Undervaluation:</strong>` 等 4 条 | `<strong>...</strong>` |
| L687 | `peace of mind.</p>` 后存在 `——` 连字符乱码 | 改用 `—`（单 em dash） |

**根因**：很可能是早期编辑用 Set-Content/Get-Content 处理过此文件，触发了 PowerShell 编码陷阱（见 memory `powershell-encoding-trap.md`）。后续 rewrite 必须用 .NET API 或直接 Edit 工具。

### 0.2 事实性错误（高优先级）

| 位置 | 现文表述 | 问题 | 修订方向 |
|---|---|---|---|
| L548 | "For EU destinations: battery passport traceability required"（针对所有 power bank） | EU Battery Passport 2027-02-18 起仅对 EV 电池、轻型移动工具电池(LMT)和 **>2 kWh 工业电池** 强制，**消费级 power bank 不在 2027 强制范围内** | 改成 "industrial batteries >2 kWh face EU Battery Passport from 18 February 2027（power banks not in 2027 scope, but EU encourages early digital product passport adoption）" |
| L226 | "Trans-Pacific container rates surged 37% in May 2026 due to Middle East tensions" | 数据需附来源；2026 年 3-5 月数据更稳定，实际范围请见下方 §1.3 | 改为 2026-03 ~ 2026-06 区间数据，引用 Freightos FBX / Drewry WCI |
| 全文 | 无 §涉及 de minimis $800 取消 | **缺失 2025 年 5 月以来最大监管变化**——$800 de minimis 对中国 2025-05-02 终止，对全球 2025-08-29 暂停 | 必须新增完整章节 §（见 §2.2） |
| 全文 | 无 §涉及 Amazon FBA 预处理变化 | 2026-01-01 起 Amazon 停止美国 FBA 预处理/打标服务，对 e-commerce sellers 这一核心受众影响极大 | 新增章节或在「Shipping Tips」拓展为 FBA 专门小节 |

---

## 1. SEO Foundation

### 1.1 Primary Keyword

- **主关键词**：`shipping from China` / `shipping from China to USA`
- **2026 搜索意图**：信息型 + 商业型（用户既想了解流程，也在比较货代/工厂）
- **意图迁移**：自 2025/5 de minimis 终结后，搜索意图重心从「最便宜方式」转向「合规与 DDP 一站式」，给 WOWOHCOOL（DDP 能力）天然优势

### 1.2 Secondary Keywords（按优先级）

1. `shipping from China to USA cost 2026`（高商业意图）
2. `Incoterms FOB CIF DDP guide`（信息）
3. `China sea freight rates 2026`（高商业）
4. `import chargers from China`（高商业，品类相关）
5. `lithium battery shipping regulations 2026`（合规向，品类相关）
6. `de minimis $800 ended` / `Section 321 changes 2026`（合规热点）
7. `Amazon FBA shipping from China 2026`（受众相关）

### 1.3 SERP 标杆 — 当前 Top 10 数据要点

| 来源 | 关键数据 | 用法 |
|---|---|---|
| Freightos FBX / 多个 2026 指南 | 海运 20GP 中→北美 $2,000-2,800、40HC 中→美东 $2,650-4,100 | 替换 L382-383 估价 |
| BSI Freight / Dantful 2026-03 | 空运中→美 ~$7/kg（环比 +20%），中→欧 ~$4.8/kg（+75% YoY） | 替换 L415-419 区间 |
| ddpchain Rail | 中欧班列 $1,500-5,500/箱，10-25 天 | 新增「Rail Freight 第四选项」 |
| USTR / White & Case | Section 301 排除清单延期至 2026-11-10（Trump-Xi 2025-11-01 协议） | 加入「Tariff Status 2026」段落 |
| IATA DGR 67th / IMDG 42-24 | UN3481（>2.7Wh、电池随设备包装）2026-01-01 起 SOC ≤30% 强制；Special Provision A331 仍是唯一例外通道 | 修订 L544-550 锂电章节 |
| IATA / Lion Tech | SOC 合规声明必须随货，否则机场安检退运 | 新增 documentation 列表项 |
| EU 2023/1542 | Battery Passport 2027-02-18 起仅 EV/LMT/工业>2kWh 强制；2026-02-18 起工业电池 >2kWh 碳足迹声明强制 | 修订 L548 EU 段落（删除"battery passport"误述） |
| dedola.com / qualitysourcingfromchina | $800 de minimis 中国 2025-05-02 取消、全球 2025-08-29 暂停，每包按全税计 | 新增 §「Post de minimis era」 |
| Unicargo / FBA Freight | Amazon 2026-01-01 停止 FBA 美国预处理/打标；DDP 一站式成主流 | 新增 §「Amazon FBA 2026 changes」 |

### 1.4 Featured Snippet 机会

- **段落型快照**：现文 L249 的「Quick Answer」位置很好，建议改写为针对 `cheapest way to ship from china` 的强答案（45-55 字），并在 H2 上方加入第二个 Quick Answer 针对 `how to ship from china after de minimis ended`。
- **表格型快照**：Incoterm 表（L297-340）已就位，但缺少「Risk transfer 简明示意」列，建议加图示。
- **列表型快照**：5 个步骤的 HowTo schema 已存在，但建议把 step 名称改为搜索词（"Choose method"→"Choose shipping method (sea, air, express, rail)"）。

### 1.5 目标字数与篇幅

- **当前**：~2,200 词
- **目标**：**2,800–3,200 词**（top 5 SERP 平均 2,500–3,500 词；增加新章节、刷新数据后必然增长）
- **HowTo schema step**：从 4 增至 **6**（追加 "Confirm de minimis status" 与 "Pre-comply battery SOC" 步骤）
- **FAQ schema**：现有 5 条，追加 **3 条**（de minimis、Amazon FBA 2026、SOC 30%）

---

## 2. 推荐章节大纲（刷新版）

> 注：保留原 7 章节骨架，**新增 2 章节、改写 §5**，把 2025-2026 监管变化作为强卖点。

```
H1: Shipping from China to USA Guide 2026: Freight, Tariffs & Compliance

Hero
- 强答案：De minimis 取消后，如何用 DDP/FOB 组合保住利润
- 引用 Freightos FBX、USTR、IATA DGR 67th 作为权威锚点

H2: 1. Why Shipping Strategy Changed in 2025-2026
   - 现状画像：$800 de minimis 取消 + Section 321 改革 + Amazon FBA 政策变更
   - 对 charger/power bank importer 的具体影响（duty stack 计算示例）
   - 内部链接：/blog/import-costs-guide

H2: 2. Incoterms 2025 in Plain English
   - 保留原表，加 EXW/FCA 列入 sea-freight 趋势
   - 新增「post-de-minimis 下 DDP 的真正成本结构」段
   - WOWOHCOOL 角度：我们三种 Incoterm 都支持，FOB Shenzhen / DDP 报价区别

H2: 3. Shipping Modes: Sea, Air, Express & Rail
   - Sea：刷新 2026 运价区间，加 Drewry WCI / Freightos FBX 引用
   - Air：刷新 2026 运价区间，注明 SOC 30% 对电池航空件的影响
   - Express：DHL/FedEx/UPS DDP 服务对 sample 仍是首选
   - **新增 Rail**：中欧班列对 EU 客户是中间方案（22-28 天，$1.8-2.6/kg）

H2: 4. Calculating Total Landed Cost in 2026
   - 保留公式
   - **重写示例**：5,000 台无线充电器 from FOB $15k，加入 Section 301（25%）+ MFN（0% 8504.40.95）+ Section 232（如适用）的完整 duty stack
   - 补充「post-de-minimis 小批量计算」对照表

H2: 5. Customs Clearance & Compliance 2026
   - 重写 lithium battery 段：IATA DGR 67th / IMDG 42-24 / UN3481 / SOC ≤30% / A331 special provision
   - EU Battery Regulation 2023/1542 现状：power bank 不在 2027 强制范围，但工业级 >2kWh 客户需提前布局
   - HS code 表保留并补 8507 系列（power bank cells）
   - **新增 FDA / FCC SDoC**：电子产品 entering US 的合规要求
   - **新增 EPR 注册**：EU 多国对电子电池征收的 producer responsibility 费

H2: 6. Choosing a Freight Forwarder Who Understands Chargers
   - 保留 essential criteria，加入「DDP capability」「battery DG handling」「Amazon FBA prep」三项关键能力
   - 红线：避开报价含糊 / 无 DG 经验 / 不提供 advance manifest 的货代

H2: 7. Amazon FBA Shipping from China 2026（**新章节**）
   - 2026-01-01 以来：Amazon 已停止 FBA 美国预处理/打标服务
   - FNSKU、polybag、bundle 必须工厂完成
   - DDP-to-Amazon vs DDP-to-3PL 的取舍
   - WOWOHCOOL 角度：我们提供 Amazon-ready 包装 + FNSKU 贴标 + Amazon address 直发

H2: 8. Shipping Tips & Risk Management
   - 保留 7 条 tip
   - 新增「Hold harmless on tariff surcharges」合同条款建议
   - 新增「Container GPS / IoT tracking」对高单价 GaN/Qi2 货件价值

Conclusion + WOWOHCOOL 专家引用 + Author Bio + Related Articles + CTA
```

### 2.1 新增 §1 草稿（关键章节）

> Open the article with: "Two regulatory shifts redrew the shipping-from-China playbook in 2025: the **$800 de minimis exemption ended** for China-origin goods on 2 May 2025 (and was suspended for all origins on 29 August 2025), and **IATA DGR 67th Edition + IMDG Code 42-24** made the 30 % state-of-charge cap mandatory for lithium battery shipments from 1 January 2026. For brand procurement and Amazon sellers importing chargers, the practical impact is unambiguous: every package now carries full duties, DDP becomes the default for predictable landed cost, and battery documentation is checked at the airport — not at the factory."

### 2.2 新增 §「Post de minimis era」要点

- 旧逻辑：FBA 直发 + 多次 <$800 拆单 = 免税
- 新逻辑：每包要么付全税（duty stack），要么走 $200/件 postal flat duty
- 建议读者重新核算：是否切回 FCL 批发 + 国内仓配
- WOWOHCOOL：MOQ 500 起，正好覆盖 FCL/LCL 临界点，与 de minimis 取消后的批发回归同步

---

## 3. Supporting Elements

### 3.1 必须包含的数据点（含来源标注）

| 数据 | 来源 | 嵌入位置 |
|---|---|---|
| 中国→美 海运 20GP $2,000-2,800（2026） | Freightos FBX / Dantful 2026-03 | §3 海运段 |
| 中国→欧 海运 40HC $2,500-3,100（2026） | Searates / Dantful | §3 海运段 |
| 中国→美 空运 ~$7/kg，+20% YoY | BSI Freight 2026 | §3 空运段 |
| 中国→欧 空运 ~$4.8/kg，+75% YoY | BSI Freight 2026 | §3 空运段 |
| 中欧班列 $1.8-2.6/kg，22-28 天 | ddpchain Rail 2026 | §3 新增铁路段 |
| Section 301 排除清单延至 2026-11-10 | USTR / White & Case 2025-11 | §1 / §4 |
| HTS 8504.40.95 wireless charger MFN 0% + 25% Section 301 | USITC / Gateway Lines | §4 落地成本示例 |
| UN3481 SOC ≤30% 2026-01-01 强制 | IATA DGR 67th / Lion Tech 2025-12 | §5 电池段 |
| EU Battery Passport 2027-02-18 EV/LMT/工业>2kWh | EU 2023/1542 / EUR-Lex | §5 EU 段 |
| Amazon FBA 美国预处理 2026-01-01 停止 | Unicargo 2026 / Freightfba | §7 新增 FBA 章节 |
| $800 de minimis 中国 2025-05-02 终止 | Avalara / Congress.gov R48380 | §1 / §2 |
| 每日 ~4M 包包裹原走 de minimis 通道 | Congress.gov / Avalara | §1 论证规模 |

### 3.2 权威外部链接（建议 2-3 个）

1. **USTR Tariff Actions** — `https://ustr.gov/issue-areas/enforcement/section-301-investigations/tariff-actions`
2. **Freightos Baltic Index** — `https://fbx.freightos.com/`（已有，保留）
3. **IATA Lithium Battery Guidance 2026** — `https://www.iata.org/contentassets/.../lithium-battery-guidance-document.pdf`
4. （可选）**USITC HTS Search** — `https://hts.usitc.gov/`（替换 USITC 主页链接到具体的 HTS 检索）

### 3.3 视觉/资产建议

- 新增「Duty stack 计算瀑布图」（PNG/SVG）— 展示 FOB → +301 → +MFN → +Port fees → Landed
- 新增「Sea vs Air vs Rail vs Express 决策树」流程图
- 替换 hero 文案区底部 stat 视觉：增加 "$800 de minimis ENDED" 大字 callout
- 保留现有 packaging 图、factory 图

---

## 4. Internal Linking Strategy

### 4.1 必加内部链接（3-5 条）

| 锚文本 | 目标 | 位置 |
|---|---|---|
| `import costs guide` | `/blog/import-costs-guide/` | §1 & §4 各一次（替换现有 L223 + L724） |
| `US & EU certifications` | `/blog/certifications-us-eu-guide/` | §5 合规段 |
| `OEM/ODM services` | `/service` | 结论段（已有） |
| `wireless chargers OEM` | `/products/wireless-charger.html` | §4 落地成本示例 |
| `power bank manufacturer` | `/products/power-bank.html` | §5 电池合规段 |
| `factory verification checklist` | `/blog/factory-verification-checklist/` | §6 货代选择段（新增交叉引用） |

### 4.2 现存内部链接审查

- L223 `/blog/import-costs-guide` ✅ 保留
- L270 `/service` 与 `/products/wireless-charger` ✅ 保留
- L716 三个产品类目链接 ✅ 保留
- L724 `/blog/import-costs-guide` 与 `/blog/quality-control-guide` ✅ 保留
- L729 `/products/power-bank/2-in-1-hybrid/` ⚠️ 需确认该 URL 存在（memory 指示走「总览→子类」两层架构，可能没有 2-in-1-hybrid 子页）→ **改回 `/products/power-bank` 总览**

---

## 5. Meta Elements（建议）

### Title（53-58 字符）

- **当前**：`Shipping from China Guide 2026: Freight, Customs & Costs`（54 字符）✅ 可保留
- **替代 A**（强化 de minimis 角度）：`Shipping from China 2026: Post De Minimis Importer Guide`（57 字符）
- **替代 B**（强化品类）：`Ship Chargers from China 2026: Freight, Tariffs, FBA Guide`（59 字符）

### Meta Description（155-160 字符）

- **当前**：`Complete guide to shipping from China 2026. Incoterms, freight options (sea, air, express), customs clearance, and landed cost calculation for charger imports.`（160 字符）— 已 OK
- **替代**（突出新数据）：`2026 shipping from China guide for charger importers. De minimis update, FOB vs DDP, sea $2.6k-4.1k, lithium SOC 30%, Amazon FBA prep changes covered.`（159 字符）

### URL Slug

- 保留 `/blog/shipping-from-china-guide/` ✅
- `articleTags` 建议追加 `["De Minimis", "Section 301", "Amazon FBA", "Lithium Battery"]`

### Schema 增量

- **BlogPosting.dateModified** 改 `2026-06-21`
- **BlogPosting.wordCount** 改至最终词数
- **FAQPage**：追加 3 条
  - "Did the $800 de minimis exemption end for China imports?"
  - "Do I need 30% SOC compliance for power bank air freight in 2026?"
  - "Does Amazon FBA still pre-prep shipments from China in 2026?"
- **HowTo**：第 1 步名称改为 "Choose shipping mode (sea, air, express, rail)"；新增 step 5 "Confirm duty stack post de minimis" 与 step 6 "Pre-comply battery SOC ≤30%"

---

## 6. Hook & 角度

### 强差异化 hook（选 1）

1. **「The $800 China loophole is dead. Here is the new playbook.」** — 直击监管热点，2025/5 后所有 shipping-from-china 搜索者都在重新学习
2. **「Why your 2024 shipping plan no longer pencils out — and the four levers that fix it」** — 数据驱动、面向 procurement manager
3. **「From DDP to UN3481: the compliance stack a charger importer must own in 2026」** — 适合 WOWOHCOOL 工厂权威定位

**推荐 Hook 1**（搜索热度最高 + 与 WOWOHCOOL 的 DDP/FOB 双轨服务定位天然契合）。

### Value Proposition

> Read this guide if you import chargers, power banks, or wireless charging accessories: you will leave with (a) updated 2026 freight cost ranges, (b) a duty stack calculator that includes Section 301 + MFN + post de minimis flat duty, (c) a battery shipping compliance checklist that covers IATA DGR 67th and IMDG 42-24, and (d) the Incoterm-to-volume decision tree most procurement teams now use.

---

## 7. WOWOHCOOL 品牌融入指引

按 brand-voice.md 五大支柱：

| 支柱 | 在本文落地方式 |
|---|---|
| **Factory Authority** | "Since 2013, our 5,000㎡ ISO 9001 Shenzhen facility has shipped to 50+ countries..." 在 §6 货代段、§7 FBA 段使用 |
| **Technical Precision** | UN3481 / IMDG 42-24 / IATA DGR 67th / Section 301 / HTS 8504.40.95 全部用对术语 |
| **Solution-Oriented Partnership** | §1 / §7 以 procurement & FBA seller 视角写「decision matrix」 |
| **Global Trust** | §5 同时覆盖 US（FCC SDoC + FDA）+ EU（EPR + 2023/1542）+ 锂电航运 |
| **Innovation Forward** | 提及 GaN V / Qi2 / 半固态 power bank 在落地成本中的体积优势（"GaN V chargers are 40% smaller → more units per CBM → lower per-unit freight"）— 这是其他通用 shipping 指南都没有的工厂视角 |

---

## 8. 写作执行 Checklist

- [ ] 全文 grep `—strong` / `�` / `0GP` / `0HC` 0 命中
- [ ] 全文 grep `battery passport` 仅在「EU 2027」上下文出现且明确豁免 power bank
- [ ] 全文新增 `de minimis` 至少 3 处自然出现
- [ ] 新增 `Section 321` 至少 1 处定义
- [ ] 新增 `Amazon FBA` 章节并出现关键词 `FBA prep` `FNSKU`
- [ ] 新增 `Rail Freight` 子段
- [ ] HowTo step 数量 ≥ 6
- [ ] FAQ entry 数量 ≥ 8
- [ ] BlogPosting.dateModified 更新为 2026-06-21
- [ ] BlogPosting.wordCount 与最终词数匹配
- [ ] 外部链接全部 `target="_blank" rel="noopener noreferrer"`
- [ ] 至少 1 处引用 USTR、1 处引用 IATA、1 处引用 Freightos FBX
- [ ] WOWOHCOOL 产品/服务自然提及 3-5 次（避免 hard sell）
- [ ] hero callout 突出「$800 de minimis ENDED」
- [ ] 所有 `<section>` 配对闭合（memory `feedback_section_closure_bug.md`）
- [ ] 编辑后用 Edit 工具而非 PowerShell Set-Content（memory `powershell-encoding-trap.md`）

---

## 9. 推荐下一步

1. **执行编辑**：用 `/rewrite C:\Users\wowoh\wowohcool.com\src\blog\shipping-from-china-guide\index.njk`，把本简报作为 context 输入，按 §2 大纲改写
2. **配图准备**：duty stack 瀑布图与决策树需新设计资产
3. **校验**：rewrite 后跑 grep 校验脚本检查所有 §8 checklist 项
4. **联动更新**：建议同步刷新 `/blog/import-costs-guide/`（数据维度高度耦合）

---

**来源（Sources）：**

- [Freightos Baltic Index 2026](https://fbx.freightos.com/)
- [Current Shipping Rates from China March 2026 — Dantful](https://www.dantful.com/current-shipping-rates-from-china/)
- [Air Freight Rates Surge 2026 — BSI Freight](https://www.bsifreight.com/knowledge/industry-news/air-freight-rates-surge-2026)
- [Sea Freight from China to USA 2026 Guide — SeaRates](https://www.searates.com/blog/post/shipping-from-china-to-usa-sea-freight-guide-2026)
- [Rail Freight From China 2026 — ddpchain](https://ddpchain.com/rail-freight-from-china/)
- [Section 301 China Tariffs 2026 — Gateway Lines](https://gatewaylines.com/press-releases/complete-guide-to-section-301-china-tariffs-in-2026)
- [USTR China Section 301 Tariff Actions](https://ustr.gov/issue-areas/enforcement/section-301-investigations/tariff-actions)
- [Section 301 Tariff Increases Finalized — White & Case](https://www.whitecase.com/insight-alert/united-states-finalizes-section-301-tariff-increases-imports-china)
- [IATA Lithium Battery Guidance Document 2026](https://www.iata.org/contentassets/05e6d8742b0047259bf3a700bc9d42b9/lithium-battery-guidance-document.pdf)
- [IATA DGR 67th Edition Lithium Battery SoC Limits — GD ESTL](https://en.gdestl.com/517.html)
- [Lithium Battery 30% SoC 2026 — Lion Technology](https://www.lion.com/lion-news/december-2025/new-lithium-battery-state-of-charge-limit-in-effect-jan-1)
- [De Minimis & Section 321 2026 — Quality Sourcing From China](https://qualitysourcingfromchina.com/guides/de-minimis-section-321-2026)
- [De Minimis Rule 2025-2026 — ExFreight](https://www.exfreight.com/de-minimis-rule-china-800-threshold-eliminated/)
- [US De Minimis Exemption Ends — GHY International](https://www.ghy.com/trade-compliance/us-de-minimis-exemption-ends-for-china-low-value-imports/)
- [Imports and Section 321 De Minimis Exemption — Congress.gov R48380](https://www.congress.gov/crs-product/R48380)
- [How to Ship from China to Amazon FBA 2026 — Unicargo](https://www.unicargo.com/china-to-amazon-fba-shipping-2026/)
- [Shipping from China to Amazon FBA USA 2026 — FBA Freight](https://freightfba.com/shipping-china-to-amazon-fba-usa/)
- [EU Battery Passport Deadlines 2027 — DigiProdPass](https://digiprodpass.com/blogs/battery-passport-deadlines-2027)
- [EU 2023/1542 Compliance Guide — Sunlith Energy](https://sunlithenergy.com/eu-batteries-regulation-eu-2023-1542-complete-guide/)
- [EU Sustainability Rules for Batteries — EUR-Lex](https://eur-lex.europa.eu/EN/legal-content/summary/sustainability-rules-for-batteries-and-waste-batteries.html)
