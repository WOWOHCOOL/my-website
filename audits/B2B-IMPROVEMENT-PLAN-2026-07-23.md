# B2B Audit 改进计划 — EN 站点 28 篇文章

**日期:** 2026-07-23
**基于:** `B2B-MASTER-SUMMARY-2026-07-23.md` + 28 份独立审计报告深度分析

---

## 一、根因分析

审计揭露了 5 类系统性问题，按严重程度排列：

### 🔴 问题 1：Information Gain 系统性偏低（受影响：28/28 篇）

**数据：** 平均 InfoGain 仅 58.8，7 篇低于 55。即使最高分文章也才 70。

**根因：Named Entities 和 Technical Anchors 是唯二有区分度的子维度。**

| 子维度 | Top 4 平均 | Bottom 7 平均 | 差距 |
|--------|-----------|--------------|------|
| Named Entities 数量 | 48.5 | 5.9 | **8.2x** |
| Technical Anchors 数量 | 12.3 | 6.9 | **1.8x** |
| Data Points | 100 | 100 | 无区分度（天花板效应） |
| B2B Vocabulary | 100 | 100 | 无区分度（天花板效应） |

**具体根因：**

1. **Named Entities 缺失（最严重）**：文章不引用具体的 IEC/ISO/EN 标准编号、测试设备型号（如 "Chroma 63600"、"Arbin BT-2000"）、认证机构名称（如 "TÜV Rheinland"、"SGS"、"UL LLC"）、监管机构（如 "FCC"、"CPSC"、"EU 2023/1542"）、行业协会（如 "WPC"、"USB-IF"、"IEC"）。文章用泛化的 "international standards" 替代 "IEC 62368-1:2023"。

   - **import-costs-guide**（Named Entities: 1 个，7961 字）：整篇关税文章只提到 1 个命名实体。没有 HS Code 章节号、没有 CBP ruling 编号、没有特定 FTA 协定名、没有港口名。读起来像 generic trade blog，不像 B2B 采购指南。
   - **shipping-from-china-guide**（Named Entities: 2 个，7907 字）：物流文章不提及船公司名、港口名（如 "Yantian"、"LA/LB"）、Incoterms 版本年份。可被任何货代博客替代。
   - **power-bank-mah-explained**（Named Entities: 3 个，6362 字）：电池容量文章不引用具体电芯型号（如 "LG M50T"、"Samsung 50E"）、不引用 UN38.3 测试标准、不引用 IEC 62133-2:2017。

2. **Technical Anchors 密度不足**：Top 文章（gan-v-charger-oem-manufacturing）有 11 个技术锚点/5299 字 = 2.08‰。Bottom 文章（qi-certification-guide）只有 4 个/8578 字 = 0.47‰。差距 4.4 倍。
   - 技术锚点指 "PCBA ripple noise"、"creepage distance"、"BOM cost breakdown"、"aging test protocol"、"switching frequency"、"full-load efficiency" 这类领域特定术语。
   - qi-certification-guide 8578 字讲 Qi 认证，却只有 4 个技术锚点。这意味着文章在重复"什么是Qi认证"的表面解释，而没有深入 "Foreign Object Detection (FOD) threshold"、"Q-factor measurement"、"transmitter resonance frequency tolerance" 这类技术细节。

3. **模板化写作**：文章遵循了 B2B 结构模板（TL;DR → H2 sections → tables → FAQ），结构评分很高（平均 B2B 90.1），但**内容是 consumer-grade 的**。结构对了，内容没跟上。

**为什么 Data Points 和 B2B Vocabulary 总是 100？**

因为审计器的这两个维度有天花板效应——只要文章里有一些数字和几个 B2B 词（OEM, MOQ, FOB, factory），就拿到满分。但这不代表内容有真正的 Information Gain。**一篇满是数字但数字都是公开唾手可得数据的文章，不如一篇每个数字来自一手工厂测试的文章。**

---

### 🟠 问题 2：Heading Hierarchy 系统性断裂（受影响：18/28 篇）

**数据：** 18 篇文章 Heading Hierarchy ≤ 50 分，0 分的有 6 篇。

**根因：H2 → H4 跳跃（跳过 H3）。**

具体模式分析：
- **0 分文章**（quality-control-guide, qi-certification-guide, how-to-choose-factory, qi2-vs-magsafe-guide, factory-verification-checklist, wireless-charging-works）：H2 下直接放 H4，没有 H3。
- **25 分文章**（oem-vs-odm-guide, car-charger-guide, certifications-us-eu-guide）：3 处以上 H2→H4 跳跃。
- **50 分文章**（power-bank-mah-explained, hotel-charging-solutions, how-to-choose-power-bank, usb-c-pd-3-1-explained, gan-vs-silicon-charger-comparison, shipping-from-china-guide, power-bank-specs-guide）：2 处 H2→H4 跳跃。

**根因推断：**
1. **Nunjucks 模板问题**：站点模板可能将某些子节样式设为 `<h4>` 而非 `<h3>`，这是视觉设计决策导致语义层级断裂。
2. **写作习惯**：作者可能将 H4 当作 "H2 下的子标题样式" 使用，不清楚 HTML 语义层级要求 H2 → H3 → H4 逐级递进。
3. **对比文章结构**：charger-safety-standards（Heading Hierarchy 100）和 gan-v-charger-oem-manufacturing（100）没有这个问题——说明不是模板限制，而是**部分文章在转换 Markdown → Nunjucks 时丢失了 H3 层级**。

---

### 🟡 问题 3：Cross-Reference 数据不一致（受影响：5/28 篇）

**数据：** 5 篇文章的 TL;DR 区块和 FAQ 区块之间的数字矛盾。

| 文章 | 不一致类型 | TL;DR 值 | FAQ 值 |
|------|-----------|---------|--------|
| oem-vs-odm-guide | 生产天数 | 20-30 / 45-60 天 | 10-14 / 90-120 天 |
| oem-vs-odm-guide | 百分比 | 3.0% / 3.5% | 10-25% / 2-3% |
| hotel-charging-solutions | MOQ | 1,000 台 | 100 / 500 台 |
| shipping-from-china-guide | 百分比 | 2-5% | 1.9% / 8-15% |
| wireless-charging-works | 百分比 | 15-20% / 40-55% | 3.0% / 3.8% |
| power-bank-specs-guide | 百分比 | 3-5% | 3.0% / 5.0% |

**根因：TL;DR 和 FAQ 在不同时间点编辑，或由不同人撰写，事后未做交叉验证。**

B2B 买家会逐段核验数据——不一致直接摧毁信任。这在采购指南类文章中尤其致命。

---

### 🟡 问题 4：FAQ 消费者语言污染（受影响：8/28 篇）

**数据：** power-bank-specs-guide 最低（25 分），7 篇 ≤ 75 分。

**根因：FAQ 问题使用了消费者视角的提问方式，而非 B2B 采购视角。**

| 消费者语言（当前） | 应改为的 B2B 语言 |
|-------------------|------------------|
| "Which power bank is the best?" | "What cell configuration delivers the lowest cost-per-Wh for 10,000mAh OEM orders?" |
| "How long does the battery last?" | "What cycle life can importers expect at 80% DoD with grade-A Li-NMC cells?" |
| "Is wireless charging safe?" | "What thermal rise limits does IEC 62368-1 require for Qi2 transmitters above 15W?" |

**根因：** FAQ 区块沿用了 SEO 关键词研究中的消费者长尾问题，没有转换为 B2B 采购决策语言。搜索引擎的 "People Also Ask" 数据以消费者问题为主——直接用这些问题是 SEO 友好但 B2B 失格。

---

### 🟡 问题 5：Author E-E-A-T 缺口（受影响：4/28 篇）

**数据：** 大部分文章 80 分，4 篇文章 20 分。

| 文章 | Author E-E-A-T | 缺失项 |
|------|---------------|--------|
| certifications-us-eu-guide | 20 | 缺职位、经验年限、认证资质、LinkedIn |
| shipping-from-china-guide | 20 | 同上 |
| power-bank-specs-guide | 20 | 同上 |
| power-bank-private-label-oem-production | 20 | 同上 |

**根因：** 这 4 篇文章的 author byline 可能使用了最简模板（仅名字），而非包含完整 E-E-A-T 信号的 byline。

**其他 80 分的文章**（22 篇）：有基本 byline 但可能缺少某一项（如 LinkedIn 或 certifications）。

---

### 🟢 问题 6：certifications-us-eu-guide 的 Stock Photos（受影响：1/28 篇）

唯一被检测到使用库存图片的文章。4/11 张图片来自已知 stock photo 域名。

**根因：** 认证主题的文章无法直接用工厂实拍图——需要认证标志、标准文档截图、测试设备照片等替代 real image 素材。

---

## 二、改进计划

### Phase 1 — 立即修复（本周，预计 4-6 小时）

#### 1.1 修复 Cross-Reference 数据不一致（5 篇）

**动作：** 逐篇核对 TL;DR 和 FAQ 中的所有数字，统一为正确值。
- oem-vs-odm-guide：统一生产天数（建议以 TL;DR 为准）、统一百分比
- hotel-charging-solutions：统一 MOQ 数字
- shipping-from-china-guide：统一百分比
- wireless-charging-works：统一百分比
- power-bank-specs-guide：统一百分比

**验证标准：** 重新跑 b2b_content_auditor.py，Cross-Reference Consistency ≥ 95

#### 1.2 修复 Author E-E-A-T（4 篇）

**动作：** 为 4 篇 20 分文章补全 byline：
- 添加职位（如 "Senior Sourcing Engineer at WOHCOOL"）
- 添加经验年限（如 "12+ years in power electronics manufacturing"）
- 添加专业领域（如 "Specializing in QC inspection protocols and IEC compliance testing"）
- 添加 LinkedIn URL

**验证标准：** Author E-E-A-T ≥ 80

#### 1.3 替换 certifications-us-eu-guide 库存图片（1 篇）

**动作：** 4 张 stock photos 替换为：
- 认证标志/证书实拍（如 UL 认证标签、CE mark on product label）
- 测试设备屏幕截图（如 EMC 测试波形、温升测试曲线）
- 工厂 QC 检验实拍（如 AQL 抽样过程）
- 标准文档封面（如 IEC 62368-1 封面页）

---

### Phase 2 — 高优先级（下周，预计 8-12 小时）

#### 2.1 修复 18 篇文章的 Heading Hierarchy（H2→H4 跳跃）

**策略：分两类处理**

**A 类 — 需要新增 H3（H2 下直接是 H4，中间缺失内容层级）：**
- 检查每个 H2→H4 跳跃处，判断：该 H4 上方是否缺少一个概括性 H3？
- 如有：新增 H3 作为分组标题
- 如无（H4 直接就是 H2 下的唯一子标题）：将 H4 升级为 H3

**B 类 — 纯标记错误（内容层级正确，标签用错）：**
- 将 `<h4>` 替换为 `<h3>` 即可

**18 篇文章列表：**

| 优先级 | 文章 | Heading Hierarchy | 修复难度 |
|--------|------|------------------|---------|
| 🔴 | qi-certification-guide | 0 | 3 处修复 |
| 🔴 | wireless-charging-works | 0 | 3 处修复 |
| 🔴 | quality-control-guide | 0 | 3 处修复 |
| 🔴 | how-to-choose-factory | 0 | 3 处修复 |
| 🔴 | qi2-vs-magsafe-guide | 0 | 3 处修复 |
| 🔴 | factory-verification-checklist | 0 | 2 处修复 |
| 🟠 | certifications-us-eu-guide | 25 | 3 处修复 |
| 🟠 | oem-vs-odm-guide | 25 | 3 处修复 |
| 🟠 | car-charger-guide | 25 | 3 处修复 |
| 🟡 | power-bank-mah-explained | 50 | 2 处修复 |
| 🟡 | hotel-charging-solutions | 50 | 2 处修复 |
| 🟡 | how-to-choose-power-bank | 50 | 2 处修复 |
| 🟡 | usb-c-pd-3-1-explained | 50 | 2 处修复 |
| 🟡 | gan-vs-silicon-charger-comparison | 50 | 2 处修复 |
| 🟡 | shipping-from-china-guide | 50 | 2 处修复 |
| 🟡 | power-bank-specs-guide | 50 | 2 处修复 |
| 🟢 | import-costs-guide | 75 | 1 处修复（H1→H3 跳跃） |
| 🟢 | gan-generations-guide | 75 | 1 处修复 |

**验证标准：** Heading Hierarchy ≥ 75 for all

#### 2.2 InfoGain Boost — 7 篇危机文章

每篇文章的核心问题是 **Named Entities 和 Technical Anchors 严重不足**。以下是每篇文章的具体注入策略：

**1. import-costs-guide（InfoGain: 47 → 目标: 65）**

Named Entities 从 1 → 20+：
- 添加 HS Code 章节引用（如 "HTSUS 8504.40.8500"、"TARIC 8504 40 90 90"）
- 添加具体法规编号（如 "Section 301 List 4A"、"EU 2023/1542"）
- 添加港口名/海关机构名（如 "CBP Port of Los Angeles"、"Rotterdam Customs"）
- 添加 FTA 协定具体名称（如 "USMCA Chapter 4"、"EU-Vietnam FTA Annex 2-A"）
- 添加货运参考价（如 "40HQ Yantian → LA/LB: $3,200-4,500 (July 2026 spot rate)"）

**2. hotel-charging-solutions（InfoGain: 47 → 目标: 65）**

Technical Anchors 从 6 → 12+：
- 添加技术锚点：OTA firmware update protocol, load balancing algorithm, OCPP 1.6/2.0.1, RFID/NFC authentication, MID-certified energy metering, IP54/IP65 enclosure rating
- Named Entities 从 6 → 20+：
  - 引用酒店能源标准（如 "ASHRAE 90.1-2025"、"ISO 50001"）
  - 引用特定充电管理平台名（如 "Monta", "ChargePoint CPO", "Driivz"）
  - 引用酒店品牌部署案例（需用 real data）

**3. power-bank-mah-explained（InfoGain: 48 → 目标: 65）**

当前问题：文章解释了 mAh 基础知识，但缺少 B2B 采购视角。

Technical Anchors 从 6 → 12+：
- 添加：Li-NMC vs LiFePO4 nominal voltage, self-discharge rate (%/month), internal resistance (mΩ), cycle life at 80% DoD, UL 2056 vs UN38.3 vs IEC 62133-2 test conditions difference

Named Entities 从 3 → 15+：
- 引用具体电芯型号：LG M50T (5,000mAh, 21700), Samsung 50E (5,000mAh, 21700), BAK N21700CG (5,000mAh)
- 引用测试标准：IEC 62133-2:2017 Section 7.3.2, UL 1642
- 引用认证机构：TÜV SÜD, SGS-CSTC

**4. oem-vs-odm-guide（InfoGain: 48 → 目标: 65）**

Technical Anchors 从 8 → 15+：
- 添加：DFM review cycle, ECN process, golden sample vs pilot run, PPAP Level 3 submission, BOM cost breakdown format, injection mold amortization formula

Named Entities 从 7 → 20+：
- 引用具体的合同条款类型（如 "NNN Agreement template", "Manufacturing Service Agreement Section 8.3 IP Assignment"）
- 添加真实案例描述（脱敏后的成本/时间对比数据）

**5. shipping-from-china-guide（InfoGain: 48 → 目标: 65）**

Named Entities 从 2 → 25+：
- 添加港口名、船公司名、货代参考价
- 添加 Incoterms 2020 条款完整引用
- 添加具体单证名称和编号（如 "ISF-10 Filing"、"AMS HBL SCAC Code"）
- 添加货运保险条款（如 "Institute Cargo Clauses (A)"）

**6. qi-certification-guide（InfoGain: 51 → 目标: 65）**

Technical Anchors 从 4 → 12+：
- 这是最严重的 TA 不足。8578 字的认证文章只有 4 个技术锚点。
- 添加：FOD threshold calibration, Q-factor measurement range, transmitter coil resonance frequency tolerance, standby power limit per Qi v2.0, MPP magnetic force spec (N), PTx coil-to-coil efficiency minimum

Named Entities 从 11 → 25+：
- 引用 WPC 认证文档名称和编号
- 引用具体授权测试实验室名（如 "TÜV Rheinland Taiwan", "UL Verification Services"）
- 引用测试设备型号（如 "Nok9 CATS II", "GRL Qi2 Test Solution"）

**7. wireless-charging-works（InfoGain: 51 → 目标: 65）**

与技术文章不同，这篇偏基础科普，需要增加 B2B 制造视角：
- 添加 coil winding spec（turns, Litz wire strands, inductance range）
- 添加 ferrite shielding material spec（permeability, thickness, saturation flux density）
- 添加 factory calibration tolerances
- Named Entities: 添加 Qi2 reference PTx/Rx list、WPC member manufacturers

**验证标准：** 每篇 InfoGain ≥ 60

---

### Phase 3 — 中优先级（两周内，预计 4-6 小时）

#### 3.1 FAQ B2B 语言转换（8 篇）

| 文章 | FAQ B2B | 需要改写的 FAQ 数量（估计） |
|------|---------|--------------------------|
| power-bank-specs-guide | 25 | 5-6 个 FAQ |
| gan-vs-silicon-charger-comparison | 38 | 4-5 个 FAQ |
| usb-c-pd-3-1-explained | 50 | 3-4 个 FAQ |
| car-charger-guide | 50 | 3-4 个 FAQ |
| usb-c-pd-fast-charging-guide | 62 | 2-3 个 FAQ |
| power-bank-mah-explained | 67 | 2-3 个 FAQ |
| factory-verification-checklist | 67 | 2-3 个 FAQ |
| 其他 (4 篇 75 分) | 75 | 1-2 个 FAQ |

**改写原则（抄送给所有 FAQ 区块）：**

> FAQ 问题必须用 B2B 采购决策者的语言提问。规则：
> 1. 包含 ≥1 个 B2B 信号词（OEM, MOQ, FOB, factory, supplier, importer, sourcing, certification, compliance）
> 2. 包含 ≥1 个量化维度（cost, time, minimum quantity, efficiency, loss rate, failure rate）
> 3. 问题指向采购决策（不是消费者使用）
> 4. 禁止 "Which is best/cheapest/easiest?" 这种消费者比较句式

#### 3.2 H2 B2B Density 校准

几篇文章的 H2 B2B 信号密度超出建议范围：

| 文章 | 密度 | 建议范围 | 调整 |
|------|------|---------|------|
| oem-vs-odm-guide | 63.6% | 30-55% (procurement) | 降低 — 去掉 H2 中强行加的前缀 |
| hotel-charging-solutions | 58.3% | 30-55% (procurement) | 降低 — technical H2s不需要B2B前缀 |
| gan-v-charger-oem-manufacturing | 57.1% | 50-80% (oem_core) | 正常范围，不需调整 |
| gan-generations-guide | ? | 10-40% (technical) | 如果是technical类别偏高则需调整 |
| certifications-us-eu-guide | 27.3% | 30-55% (procurement) | 提高 — 在采购决策 H2 中加入B2B信号 |
| power-bank-mah-explained | 28.6% | 30-55% (procurement) | 提高 |

---

### Phase 4 — 长期防护（本月，预计 3-5 小时）

#### 4.1 建立 Pre-Publish 数据一致性检查清单

在 `/write` 和 `/optimize` 流程中强制加入交叉验证步骤：
- [ ] TL;DR 中所有数字在正文中出现且一致
- [ ] FAQ 中所有数字在 TL;DR/正文中出现且一致
- [ ] MOQ / lead time / cost range 在整个页面中只出现一种版本

#### 4.2 建立 Author E-E-A-T 模板

所有文章统一采用以下 byline 格式：
```
[Author Name]
[Job Title] at [Company]
[Years]+ years in [Industry/Specialty]
Specializing in [specific expertise 1], [specific expertise 2]
LinkedIn: [URL]
```

#### 4.3 建立信息增益注入清单（InfoGain Injection Checklist）

新增文章时必须通过的检查点：
- [ ] **Named Entities ≥ 15**（标准编号 + 设备型号 + 认证机构 + 法规引用 + 行业协会 + 公司/品牌名）
- [ ] **Technical Anchors ≥ 10**（领域特定术语，非通用技术词汇）
- [ ] **每 1000 字 ≥ 2 个命名实体**
- [ ] **每 1000 字 ≥ 1.5 个技术锚点**
- [ ] 工厂数据引用自 `context/factory-data-panel.md`（不编造）
- [ ] 数字带有单位和上下文（非裸数字）

#### 4.4 Nunjucks 模板 H3/H4 审计

检查 `wowohcool.com` 站点的 Nunjucks 模板和 CSS，确认：
- 文章模板默认使用 H3 子标题（非 H4）
- CSS 不会因视觉原因诱导作者用 H4 替代 H3
- 如果 H4 有独特的 visual style 需保留，则改为 CSS class 而非语义标签

---

## 三、工作量估算

| Phase | 内容 | 篇数 | 预估工时 | 产出 |
|-------|------|------|---------|------|
| 1.1 | Cross-Reference 修复 | 5 | 1h | 5 文章 fixed |
| 1.2 | Author E-E-A-T 修复 | 4 | 0.5h | 4 byline updated |
| 1.3 | Stock Photo 替换 | 1 | 1h | 4 图片 replaced |
| 2.1 | Heading Hierarchy 修复 | 18 | 4h | 18 文章 H3 restored |
| 2.2 | InfoGain Boost | 7 | 6h | 7 文章 content enhanced |
| 3.1 | FAQ B2B 语言转换 | 8 | 2h | 8 FAQ rewritten |
| 3.2 | H2 Density 校准 | 6 | 1h | 6 H2 adjusted |
| 4.1-4.4 | 制度防护 | N/A | 3h | 4 checklists/templates |
| **总计** | | **28** | **18.5h** | |

---

## 四、验证方式

每个 Phase 完成后，重新运行批量审计：

```bash
bash scripts/batch_b2b_audit.sh
```

目标：
- B2B 平均分 90 → 94+
- InfoGain 平均分 59 → 68+
- 0 篇 Fair（当前 2 篇 Fair 全部消除）
- 0 篇 Heading Hierarchy < 75
- 0 篇 Cross-Reference < 90
- 0 篇 Author E-E-A-T < 80

---

*计划制定: 2026-07-23 | 下次审计: Phase 2 完成后*
