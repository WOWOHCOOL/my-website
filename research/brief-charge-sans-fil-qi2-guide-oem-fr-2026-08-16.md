# Research Brief: Charge Sans Fil Qi2 Guide OEM (FR) — 技术指南

**Date**: 2026-08-16
**Article**: `charge-sans-fil-qi2-guide-oem`（FR 博客计划 Phase 2 第 5 篇 — 技术深度）
**Cible (path)**: `C:\Users\wowoh\wowohcool.com\src\fr\blog\charge-sans-fil-qi2-guide-oem\index.njk`（目录当前为空，待写）
**EN 对应**: `wireless-charging-works`（已发布，Snowy May 撰写，Qi2 无线充电 pillar）
**DE/ES 对应**: `kabelloses-laden` / `carga-inalambrica-qi-qi2-magsafe`
**Marché cible**: France métropolitaine · Belgique · Suisse romande · DOM-TOM · Afrique francophone
**Auteur**: **Snowy May**（无线充电/Qi2 技术 → Snowy May，符合 author-assignment-rule，与 EN 一致）
**Commande**: `/research`（法语本土化：法语 SERP + RED/DAS/ANFR 法规 + 法国进口商视角）

---

## 0. 与既有 FR 文章的关键词区隔（FR Qi2 簇 3 篇）

| 维度 | `charge-sans-fil-qi2-guide-oem`（本篇） | `qi2-vs-magsafe-importateurs`（已发布） | `certification-qi2-importateurs`（已发布） |
|------|----------------------------------------|----------------------------------------|------------------------------------------|
| 定位 | Qi2 无线充电**工作原理/技术指南**（pillar） | Qi2 vs MagSafe **对比** | Qi2 **认证成本/流程** |
| EN 对应 | `wireless-charging-works`（pillar） | `qi2-vs-magsafe-guide` | `qi-certification-guide` |
| Primary Keyword | `charge sans fil Qi2 OEM importateur` | `Qi2 vs MagSafe importateur` | `certification Qi2 importateur OEM` |
| 核心内容 | 电磁感应原理 + MPP 磁力对齐 + 热管理 + 产品线 + FOD | 两标准对比 + WPC vs MFM 成本 | WPC 认证流程 + 成本 + FR 合规 |

**规则依据**（target-keywords.md §3 + internal-links-map）：本篇是 wireless 簇 pillar，其他两篇是 standards 簇，通过修饰词区分（技术 vs 对比 vs 认证）。

---

## 1. SEO Foundation

### Primary Keyword
`charge sans fil Qi2 OEM importateur` — intent: commercial/investigational B2B

### Secondary Keywords（8–12）
`Qi2 charge sans fil`, `Qi2 MPP alignement magnétique`, `Qi2.2 25W`, `aimants N52H`, `chargeur sans fil OEM`, `FOD détection objets étrangers`, `blindage ferrite`, `RED 2014/53/UE`, `DAS ANFR`, `station 3-en-1 Qi2`, `FOB Shenzhen chargeur sans fil`

### Featured Snippet Opportunity
**Oui** — 两个抓取位：
1. **"Comment fonctionne la charge sans fil Qi2 ?"** → 电磁感应原理（4 步流程）
2. **"Qi vs Qi2 vs Qi2.2 : quelle différence ?"** → 认证层级对比表

### Search Intent
B2B investigational/commercial：法国进口商在采购 OEM 无线充电器前理解 Qi2 技术原理与规格。技术型。

### Target Word Count
**2 500–3 000 词**（对标 EN 5400，但 FR 版精简到 7-9 H2 技术核心）

---

## 2. Competitive Landscape — SERP France

### 核心结论：法语 B2B 内容真空（与 USB-C PD 3.1 一致）
- **法语 B2B 采购指南为零**：无专门法语 Qi2 无线充电技术指南
- 法语内容仅消费者科技博客（Frandroid、Les Numériques），非 B2B
- 中国制造商（Wecent、D-WIRELESS）仅 EN/ZH 发布
- **机会**：唯一法语完整的 Qi2 无线充电技术指南（first-mover）

### 竞品对比表

| 来源 | 类型 | 弱点 |
|------|------|------|
| **WPC**（wirelesspowerconsortium.com） | 标准制定方 | 英文，规范 raw，非进口商导向 |
| **D-WIRELESS**（Qi2.2 竞品） | 工厂 OEM | 英文，power bank + 无线充电器，无法国法规 |
| **Wecent**（gdwecent.com） | 工厂 OEM | 英文，无 Qi2 技术原理详解 |
| **Frandroid / Les Numériques** | 媒体 tech FR | 消费者视角，非 B2B |

### 市场数据（IndexBox 法语 SERP）
- 全球无线充电市场：**$6,78 Md (2025) → $19,03 Md (2030)**，CAGR 22,9 %
- 3-in-1 站占品类 **40-50 % 营收**（ASP $50-150）
- 汽车子段最动态（**19,4 % CAGR**）
- 桌面 pads 占 **55-60 % 出货量**（量最大）

---

## 3. 法语法规 — 无线充电专属（不同于 USB-C PD 3.1）

### Qi2 无线充电的 FR 合规（无线设备 = RED，非 directive 2022/2380）

| 法规 | 内容 | 说明 |
|------|------|------|
| **RED 2014/53/UE** | 无线电设备指令（无线充电器 = 无线电设备） | 基础 |
| **EN 300 330 / EN 301 489-1/-3** | RED 技术标准（EMC） | 基础 |
| **EN 62311** | EMF/人体暴露 | 基础 |
| **DAS（ANFR）** | 法国特有：比吸收率 <2 W/kg，信息消费者 | 法国专属 |
| **EN IEC 63563** | Qi2 欧盟协调标准 | 2026 起强制 |
| **DEEE**（Ecosystem/Ecologic） | 废弃物回收 | 法国专属 |
| **Triman + Info-Tri** | 包装标识 | 法国专属 |

### 关键警示（本土化信息增益）
- **ANFR**：法国市场监管，可下令召回
- **DGCCRF**：合规检查，功率 ±8% 容差
- **Amazon FR 2026**：完整合规档案（CE、DoC、标签照片、回收证明）强制
- **Code SH 8504.40**：静态转换器，NPF 0%

---

## 4. FOB Pricing Reference（Qi2 工厂数据）

| 类型 | 500 units | 1 000 units | 来源 |
|------|:---------:|:-----------:|------|
| Qi2 Magnetic Pad (15W) | $6.50–9.00 | $4.50–6.50 | WOWOHCOOL factory data |
| Qi2 3-in-1 Foldable Station | $12.00–16.00 | $9.00–13.00 | WOWOHCOOL factory data |
| Qi2 Car Mount (Magnetic) | $8.00–12.00 | $6.50–9.50 | WOWOHCOOL factory data |
| Qi2 Desktop Stand | $7.00–10.00 | $5.00–7.50 | WOWOHCOOL factory data |

**MOQ**: 500（模型混合允许）。**Qi2 认证加价**: Auth IC $0.80-1.50/unit + WPC royalty，总计 $1.20-2.00/unit（官方认证 vs 非认证兼容）。

---

## 5. Recommended Structure（对标 EN，法语独立撰写）

### H1（含 B2B 信号词，50-65 字符）
`Charge Sans Fil Qi2: Guide Technique OEM pour Importateurs`
→ 55 字符 ✅，含 `OEM` + `Importateurs` 双 B2B 信号

### Meta Title
`Charge Sans Fil Qi2 OEM: Guide Technique Importateurs | WOWOHCOOL`

### Meta Description（150-160 字符，≥1 B2B 转化词）
`Charge sans fil Qi2 OEM: induction, MPP aimants N52H, Qi2.2 25W, FOD. Guide technique importateurs. FOB dès $6.50/pad, MOQ 500. Usine ISO 9001 Shenzhen.`

### URL Slug
`/fr/blog/charge-sans-fil-qi2-guide-oem/`（已定，含 B2B 信号 `oem`）

### Outline（9 H2 + FAQ，对标 EN wireless-charging-works 精简）

```
 §1. Évolution de la charge sans fil : de Faraday à Qi2.2
 §2. Induction électromagnétique : principes et circuits (4 étapes)
 §3. Qi2 MPP : pourquoi l'alignement magnétique N52H détermine l'efficacité
 §4. Gestion thermique : GaN, blindage ferrite et capteurs NTC
 §5. Gamme OEM : pads, stations 3-en-1, supports voiture et power banks (tableau FOB)
 §6. Niveaux de certification Qi : Qi → Qi2 15W → Qi2.2 25W (tableau)
 §7. FOD (détection d'objets étrangers) : la porte de sécurité
 §8. Réglementation française : RED, DAS/ANFR, DEEE, Triman, EN IEC 63563 ⭐(FR 独有)
 §9. Guide d'achat OEM : BOM, vérification fournisseur, checklist

 FAQ (8 questions) — 法语 B2B 采购语言
```

### FAQ（8 问，对标 EN，法语独立表达）
1. Comment fonctionne la charge sans fil Qi2 ?
2. Qu'est-ce que le Qi2 MPP et pourquoi l'alignement magnétique est-il crucial ?
3. Quelle différence entre Qi, Qi2 15W et Qi2.2 25W ?
4. Qu'est-ce que le FOD et pourquoi est-il obligatoire ?
5. Quel est le MOQ et le prix FOB des chargeurs sans fil Qi2 ?
6. Quelles certifications sont obligatoires pour vendre des chargeurs sans fil en France ?
7. Comment vérifier un fournisseur Qi2 authentique ?
8. Comment sourcer des chargeurs sans fil Qi2 auprès d'une usine OEM ?

---

## 6. Information Gain Strategy（对标 top-5 竞品没有的内容）

1. **唯一法语 Qi2 无线充电技术指南**（工作原理 + 采购）— 零竞争
2. **Qi2 QC 工厂数据**（Coil Q-Factor >80、DCR 95mΩ、FOD <180ms、Thermal +17,5°C、Efficiency 82-85%、Ripple <25mVpp）
3. **N52H 磁铁对齐容差 <0,3mm**（Keyence LM-1100 激光测量）—— 独家工程数据
4. **FOB 价格分档 + 认证加价**（$1.20-2.00/unit）
5. **FR 法规完整**：RED + DAS/ANFR + DEEE + Triman + EN IEC 63563（任何英语竞品都没有）
6. **感应 vs 谐振决策矩阵**（OEM 产品线选型）
7. **BOM 4 组件 checklist**（线圈、谐振电路、控制器 IC、磁铁）+ 红旗信号

---

## 7. Internal Linking Strategy（FR 本土化路径）

| Cible | Texte d'ancre FR | Contexte |
|-------|-----------------|----------|
| `/fr/produits/chargeur-sans-fil/` | "chargeurs sans fil Qi2 OEM" | §5、§9 |
| `/fr/blog/certification-qi2-importateurs/` | "certification Qi2 complète" | §6、§8 |
| `/fr/blog/qi2-vs-magsafe-importateurs/` | "comparatif Qi2 vs MagSafe" | §6、Related |
| `/fr/service-oem-odm/` | "service OEM/ODM clé en main" | §9、CTA |
| `/fr/contact/` | "demander un devis" | CTA |

**hreflang 提醒**：EN wireless-charging-works 当前只含 en/de/es，需补 fr/ru/pl（如 RU/PL 版无线充电文章存在）。

---

## 8. Schema 要求（对标 EN + FR 规范）

- ✅ BlogPosting（wordCount 整数）
- ✅ Person（**Snowy May**，@id `https://www.wowohcool.com/#snowy-may`，LinkedIn + jobTitle + knowsAbout）
- ✅ Organization（`url` = `https://www.wowohcool.com/fr/a-propos/`）
- ✅ FAQPage（8 问）+ HowTo（≥3 步）+ BreadcrumbList + SpeakableSpecification
- ⚠️ **inLanguage 用 `fr-FR`**
- ⚠️ **breadcrumb name 法语**：Accueil / Blog / Charge Sans Fil Qi2 Guide OEM
- ⚠️ **citation**：WPC、IEC 61980、IEEE、EUR-Lex RED

---

## 9. Sources & Références（外链 ≥2 权威）

1. **Wireless Power Consortium — Qi Specification** — https://www.wirelesspowerconsortium.com/qi/
2. **WPC Product Registry（Qi-ID 验证）** — https://www.wirelesspowerconsortium.com/products/
3. **IEC 61980** — https://webstore.iec.ch/publication/61980-1
4. **EUR-Lex — RED 2014/53/UE** — https://eur-lex.europa.eu/eli/dir/2014/53/oj
5. **ANFR — DAS** — https://www.anfr.fr/
6. **IndexBox France Wireless Charger Market** — https://www.indexbox.io/store/france-kw-wireless-battery-charger-840-market-analysis-forecast-size-trends-and-insights/

---

## 10. 研究来源（实际执行的搜索）

| # | 搜索 | 语言 | 结果要点 |
|---|------|------|---------|
| 1 | "charge sans fil Qi2 15W 25W standard importateur fabricant OEM France" | FR | **无结果** — 法语 B2B 真空 |
| 2 | "Qi2 charge sans fil WPC certification France marché chargeur OEM" | FR | IndexBox 市场数据 + D-WIRELESS Qi2.2 竞品 |
| 3 | （EN wireless-charging-works 完整读取） | EN | Qi2 技术 pillar，Snowy May，11 section |

*补充：复用 certification-qi2 和 qi2-vs-magsafe 两份 FR brief 的 WPC 成本 + FR 法规数据*

---

## 11. 写作前必读清单

- [ ] EN 版 `src/blog/wireless-charging-works/index.njk`（内容基准，已读前 968 行）
- [ ] FR brief `brief-certification-qi2-importateurs-2026-08-03.md`（WPC 成本 + FR 法规，已读）
- [ ] FR brief `brief-qi2-vs-magsafe-fr-2026-08-05.md`（Qi2 簇区隔，已读）
- [ ] `context/factory-data-canonical.md`（Qi2 QC 数据 §11）
- [ ] `context/fr-dict.md`（重音自检）

---

## 12. Pre-Commit 自检

- [ ] H1 含 B2B 信号词（OEM/Importateurs）+ 50-65 字符
- [ ] ≥2 H2 含 B2B 信号词（§5 "OEM"、§8 "française"、§9 "achat OEM"）
- [ ] HowTo ≥3 步 + FAQ 8 问 B2B 采购语言
- [ ] ≥2 内文图 alt 含 B2B 关键词
- [ ] dateModified = 当天；wordCount 整数
- [ ] ≥2 外链 rel="noopener noreferrer" + ≥3 内链（本土化路径）
- [ ] 重音准确（é/è/ê/à/ç）、€ 在数字后、小数逗号、引号 «...»、标题 sentence case
- [ ] 法语 B2B 术语（importateur / charge sans fil / conformité / éco-organisme）；专业术语保留英文（OEM/ODM/Qi2/MPP/N52H/FOD/GaN）

---

*Brief généré le 2026-08-16 — SERP FR 2 次搜索，IndexBox 市场数据，WPC/RED/ANFR 法规，WOWOHCOOL factory-data 交叉验证*
*Prêt pour `/write-b2b`*
