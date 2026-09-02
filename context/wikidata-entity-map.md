# Wikidata Entity ID Canonical Table（常用实体对照表 · 新文章查表复制，禁止手填）

> **背景**：`about.sameAs` 的 Wikidata ID 已连续 7+ 次手填出错。**本表所有 ID 均经 2026-08-31 通过 Wikidata `Special:EntityData` / `wbsearchentities` API 权威验证**，新文章涉及下列概念时必须从此表复制 ID，禁止凭记忆或搜索随手填。

## 一、已验证的正确实体（直接复制）

| 概念（about.name 建议用英文） | Wikidata ID | 官方定义 |
|------|-------------|---------|
| Battery charger（充电器） | `Q352917` | circuit or device that controls charging of batteries |
| Power bank（充电宝） | `Q15941790` | portable device that can supply power from its built-in battery（redirect 至 Q2208745） |
| GaN / Gallium nitride（氮化镓） | `Q411713` | chemical compound |
| Car charger（车载充电器） | `Q199326` | automobile auxiliary power outlet — circular power outlet for vehicle accessories（无 "car charger" 独立词条，退而求其次） |
| USB-C | `Q20026619` | 24-pin reversible connector |
| USB Power Delivery | `Q56120131` | USB specification for power delivery over USB-C cables |
| Qi（无线充电标准） | `Q1357469` | open inductive charging interface standard by WPC |
| Wireless Power Consortium（WPC 组织） | `Q3616482` | multinational technology consortium |
| Import（进口） | `Q62955` | sum of goods/services brought into a jurisdiction |
| Market trend（市场趋势） | `Q1004322` | tendency of a financial market to move over time |
| Tariff（关税） | `Q52389` | tax on the import and export of goods |
| Customs agency（海关） | `Q182290` | authority responsible for tariff collection |
| Value-added tax（增值税） | `Q128635` | form of consumption tax |
| OEM（original equipment manufacturer） | `Q267558` | company that fabricates parts used in another company's products |
| Lithium-ion battery（锂离子电池） | `Q2822895` | rechargeable battery type |
| Solid-state battery（固态电池） | `Q7557794` | battery using solid electrodes and electrolyte |
| Quality control（质量控制） | `Q827792` | process/activity to ensure product quality |
| CE marking（CE 标志） | `Q467405` | mandatory conformity marking for EEA products |
| Certification mark（认证标志） | `Q908620` | label identifying certified products |
| Dangerous goods（危险品） | `Q1498116` | goods whose intended properties pose a hazard |
| Audit（审计/审核） | `Q181487` | systematic independent examination of an organization |
| Factory（工厂） | `Q83405` | facility where goods are industrially made |
| Freight transport（货运） | `Q651658` | physical process of transporting cargo |
| Supply chain management（供应链管理） | `Q492886` | management of the flow of goods and services |
| Procurement（采购） | `Q829492` | acquisition of goods and services |
| Inductive charging（感应充电） | `Q2611270` | type of wireless power transfer |
| Safety standard（安全标准） | `Q7398668` | standards ensuring product safety |
| Rechargeable battery（可充电电池） | `Q187510` | battery that can be charged, discharged, recharged |

## 二、法规类（无 Wikidata 条目时用法规原文 URL）

| 概念 | 处理方式 |
|------|---------|
| EU Battery Regulation 2023/1542 | `about.sameAs` 直接指向 EUR-Lex：`https://eur-lex.europa.eu/eli/reg/2023/1542/oj`（六语言统一） |
| IEC 62368-1（无独立词条） | 退而求其次用 `Q7398668`（safety standard） |

## 三、已知坏 ID 黑名单（凡出现一律是错的）

| 坏 ID | 实际是什么 | 曾被误用为 |
|-------|-----------|-----------|
| `Q168774` | 美国陆军第 109 步兵师 | Import / Tariff |
| `Q5962579` | （无关） | Market trend |
| `Q5037910` | 小说《Carbon Dreams》 | Car charger |
| `Q5037720` | （无关） | Car charger |
| `Q4117137` / `Q4117138` | 不存在（数字换位） | GaN（正确 Q411713） |
| `Q142` | France | Audit usine / 工厂选择 |
| `Q148` | People's Republic of China | 工厂选择/验厂 |
| `Q1434858` | Turks in the Balkans | OEM |
| `Q2273901` | 委拉斯开兹画作《Joseph's Tunic》 | OEM |
| `Q228055` | 瑞士 Sils-Soazza 高压线 | CE marking |
| `Q335180` | 美国 Amelia Island 车展 | CE marking |
| `Q730054` | Monica 专辑《The Makings of Me》 | CE marking |
| `Q1502056` | Mainau Declarations（消歧义） | Quality control |
| `Q831792` | 兹巴拉日围城战 | Quality control |
| `Q212873` | Jane Birkin（演员） | GaN / Nitride de gallium |
| `Q189048` | Zellinger（消歧义） | Dangerous goods |
| `Q3377970` | （无标签） | Freight transport |
| `Q1739470` | 慕尼黑铁路隧道 | Power bank |
| `Q15961849` | 已删除（404） | Power bank |
| `Q1149138` | Daniel Hermann（人物） | Battery charger / IEC 62368-1 |
| `Q115671573` | TPG 高管 | Qi wireless charging |
| `Q2366120` | 荷兰 Engelandvaarder | Qi (standard) |
| `Q107342669` | 加泰罗尼亚农舍 | Qi2/WPC |
| `Q109278823` | 消歧义页 | IEC 62368-1 |
| `Q56240142` | 希腊教堂 | IEC 62368-1 |
| `Q7864095` | 蛋白质基因 UCN3 | USB-C Power Delivery |
| `Q29528244` | 哺乳动物蛋白 | USB-C |
| `Q746782` | Nemanjić 王朝 | Inductive charging |
| `Q4118` | 硫酸 | VAT |
| `Q303945` | 一种昆虫 | Customs |
| `Q1439150` | Forté（消歧义） | Factory audit |
| `Q1798454` | （无标签） | Factory audit |
| `Q6500962` | 已删除（404） | Supply chain management |
| `Q2365072` | Prik（消歧义） | Supplier sourcing |
| `Q426809` | 有机氯化合物 | Dangerous goods packaging |
| `Q1520343` | Wikimedia 列表 | Certification mark |
| `Q831827` | 德语维基"Betriebsaufgabe" | Quality control |
| `Q845739` | query language（查询语言） | 多概念混用 |
| `Q620805` | theism（有神论） | Import |
| `Q1188694` | 一种植物 | （空名） |
| `Q1192083` | 消歧义页 | （空名） |

## 四、使用规则

1. **新文章**：`about` 用文章核心实体——查上表；表中没有的概念 → 用 `wbsearchentities` API 或 wikidata.org 搜英文标签、点开实体页人工核对"定义描述"与概念完全匹配，再复制 Q ID，**并回填进本表**
2. **`about.name` 建议用英文 Wikidata 标签**（如 "Power bank"），不要用本地化长短语（曾出现 name="Contrôle qualité en usine pour chargeurs..." 这种把整句塞进 name 的错误）
3. **自动化校验**：`python3 check_org_knows.py` 已内置完整黑名单扫描（§三全部 ID），新文章发布前必跑

## 五、全站正在使用的实体（2026-09-02 实测 174 篇）

> `about.sameAs` 的**实际使用频率**登记。选新文章的 about 实体时，先看这里是否已有同概念条目（避免一义多 ID）。

| QID | 使用次数 | about.name（英文标签） |
|-----|---------|----------------------|
| `Q15941790` | 26 | Power bank |
| `Q352917` | 23 | Battery charger |
| `Q411713` | 21 | Gallium nitride |
| `Q267558` | 14 | Original equipment manufacturer |
| `Q1357469` | 10 | Qi wireless charging |
| `Q56120131` | 10 | USB-C Power Delivery |
| `Q467405` | 9 | CE marking |
| `Q62955` | 6 | Import |
| `Q827792` | 6 | Quality control |
| `Q1498116` | 5 | Dangerous goods |
| `Q651658` | 5 | Freight transport |
| `Q83405` | 5 | Factory |
| `Q199326` | 4 | Car charger |
| `Q7398668` | 4 | Safety standard（IEC 62368-1 无独立词条时的回退，见 §二） |
| `Q1004322` | 4 | Market trend |
| `Q181487` | 3 | Audit |
| `Q908620` | 3 | Certification mark |
| `Q20026619` | 2 | USB-C |
| `Q2822895` | 2 | Lithium-ion battery |
| `Q7557794` | 1 | Solid-state battery |
| `Q128635` | 1 | Value-added tax |
| `Q182290` | 1 | Customs agency |
| `Q2611270` | 1 | Inductive charging |
| `Q829492` | 1 | Procurement |
| `Q492886` | 1 | Supply chain management |
| `Q3616482` | 1 | Wireless Power Consortium |

## 六、选题 → 实体推荐映射（B2B 选题域）

> 写新文章时按选题域直接选实体（全部已在 §一/§五 验证）。**同簇文章可共用实体**（如 GaN 簇多篇都用 Q411713），about 的差异化由 keywords/headline 承担。

| 选题域 | 推荐 about 实体 |
|--------|----------------|
| GaN 技术/代际/对比 | `Q411713`（Gallium nitride） |
| USB-C PD 协议/快充 | `Q56120131`（USB-C PD）；规格页可用 `Q20026619`（USB-C 接口） |
| 无线充电 Qi/Qi2/MagSafe | `Q1357469`（Qi standard）；WPC 组织类文章用 `Q3616482` |
| 充电宝/电池技术 | `Q15941790`（Power bank）；电池类 `Q2822895`（Li-ion）/ `Q7557794`（Solid-state） |
| 充电器通类/OEM 通识 | `Q352917`（Battery charger） |
| OEM vs ODM/代工模式 | `Q267558`（OEM） |
| 车载充电 | `Q199326`（Car charger） |
| 工厂选择/验厂/审核 | `Q83405`（Factory）/ `Q181487`（Audit） |
| 质量控制/QC 流程 | `Q827792`（Quality control） |
| 认证合规（CE/UL/标志） | `Q467405`（CE marking）/ `Q908620`（Certification mark）/ `Q7398668`（Safety standard 回退） |
| 危险品包装/运输 | `Q1498116`（Dangerous goods） |
| 物流/关税/进口 | `Q651658`（Freight transport）/ `Q62955`（Import）/ `Q182290`（Customs）/ `Q128635`（VAT） |
| 供应链/采购 | `Q492886`（Supply chain management）/ `Q829492`（Procurement） |
| 市场趋势/行情 | `Q1004322`（Market trend） |
| 感应充电原理 | `Q2611270`（Inductive charging） |
