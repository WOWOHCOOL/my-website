# AI Citability Analysis: USB-C PD 3.1 Guide OEM (FR)

**URL:** https://www.wowohcool.com/fr/blog/usb-c-pd-3-1-guide-oem/
**Analysis Date:** 2026-08-16
**Overall Citability Score: 83/100**
**Citability Coverage:** 7/7 (100 %) 正文区块高于 70 分（其中 5/7 高于 80）

---

## Score Summary

| 维度 | 分数 | 权重 | 加权 |
|---|---|---|---|
| Answer Block Quality（答案块质量） | 75/100 | 30 % | 22.5 |
| Passage Self-Containment（段落自包含） | 82/100 | 25 % | 20.5 |
| Structural Readability（结构可读性） | 88/100 | 20 % | 17.6 |
| Statistical Density（数据密度） | 92/100 | 15 % | 13.8 |
| Uniqueness & Original Data（独家数据） | 82/100 | 10 % | 8.2 |
| **Overall** | | | **82.6 → 83/100** |

---

## 核心结论

这是一篇**数据密度极高、结构清晰**的 B2B 技术文，在 GEO 可引用性上处于**良好偏优**（83 分）。最强维度是 **Statistical Density（92）** 和 **Structural Readability（88）**——全文 6 张表格、19 个 H3、240W 出现 38 次、100W 27 次，精确到电压/电流/价格/温度，正是 AI 引擎（Perplexity、ChatGPT Search）优先提取的事实密度型内容。

**主要短板是 Answer Block Quality（75）**：部分章节直接以表格或两栏对比开头，缺少 1-2 句"定义式直答"（"X est…" / "X signifie…"），导致 AI 无法把段落首句独立提取为答案块。这是**唯一需要针对性改进的维度**。

---

## Strongest Content Blocks（最强区块）

### 1. "6. Directive chargeur universel UE : calendrier et obligations pour importateurs" — 87/100
> « La directive (UE) 2022/2380 — le « chargeur universel » — impose un port USB-C commun dans toute l'Union européenne. Pour un importateur français, elle structure le calendrier de toute gamme de chargeurs. »

**为什么好**：定义式开头（"La directive… impose"），主体明确命名，紧接着是日期表格（28 déc. 2024 / 28 avril 2026）+ 5 层合规列表。段首 60 词即可独立成为完整答案，含具体实体（directive 编号、日期），是 AI 最易提取的"法规类直答"。

### 2. "7. Guide de sourcing PD 3.1 : conformité et sélection d'usine" — 85/100
> « Avant de verser un acompte, voici ce qu'un importateur doit exiger d'une usine de chargeurs PD 3.1 : »

**为什么好**：独家工厂数据密集（兼容性测试矩阵 100 % handshake / 50 台样本 / Chroma 63600；GaN V 52,4 °C / 0,3 % 退货率 / MTBF >15 000 h）。第一手数据 + 命名实体（WOWOHCOOL、Dong Yi Technology、usb.org）使其成为不可替代的引用源。

### 3. "2. SPR vs EPR : choisir l'architecture de puissance pour votre gamme OEM" — 84/100
> « L'innovation clé du PD 3.1 est de diviser la distribution de puissance en deux plages distinctes : »

**为什么好**：定义式开头 + SPR/EPR 两栏对比卡片，每栏以 "Jusqu'à 100W (20V × 5A)" / "100W à 240W (28V/36V/48V × 5A)" 量化直答。自包含性强，无需上下文即可理解。

---

## Weakest Content Blocks（改写优先级）

### 1. "3. Paliers de tension 28V / 36V / 48V" — 71/100

**当前开头：**（直接进入表格）
> | Tension | Puissance max | Appareils types | Plage | …

**问题**：无定义句，AI 无法把"电压档位表"的首句提取为独立答案。段落依赖表格承载信息，但 AI 提取偏好是"1-2 句答案 + 表格"，而非纯表格。

**建议改写（answer-first）：**
> « Le PD 3.1 EPR introduit trois nouveaux paliers de tension au-dessus du plafond de 20 V du SPR : 28 V (140 W), 36 V (180 W) et 48 V (240 W). Le tableau ci-dessous indique quel palier dessert quel marché — le 28 V couvre 65 % des expéditions EPR 2026, tandis que le 48 V reste une niche (~12 %). »

**附加改进**：保留表格；在表格后已有的 "Point de vigilance importateur" 段落已是加分项，保持。

### 2. "5. PPS vs AVS : quel protocole de tension" — 72/100

**当前开头：**（直接两栏对比卡片）
> PPS (PD 3.0+) … AVS (PD 3.1+) …

**问题**：两个协议直接并列，缺一句定义式总述，AI 无法判断"这一段在回答什么问题"。

**建议改写（answer-first）：**
> « Le PPS et l'AVS sont deux protocoles de tension complémentaires du Power Delivery : le PPS affine la basse tension (3,3–21 V) par pas de 20 mV pour les smartphones, tandis que l'AVS couvre la haute tension (15–48 V) par pas de 100 mV pour les portables. »

**附加改进**：保留两栏卡片 + 已有 "complémentaires, pas concurrents" 总结句。

### 3. "1. PD 3.0 vs 3.1 vs 3.2" — 76/100

**当前开头：**（表格 + "Note PD 3.2" 段落在后）
> | Fonction | PD 3.0 | PD 3.1 | PD 3.2 | …

**问题**：定义式句子（"le PD 3.2 n'augmente PAS…"）埋在表格之后，AI 提取时会跳过表格直接找段落，但段落位置靠后。

**建议改写（answer-first，提到表格前）：**
> « L'USB Power Delivery existe en trois versions — PD 3.0, PD 3.1 et PD 3.2 — qui diffèrent par la puissance maximale et les plages de tension. Le PD 3.1 double la puissance de 100 W à 240 W via l'EPR ; le PD 3.2 n'augmente pas la puissance mais affine le protocole. »

**附加改进**：Expert Insight 区块（Nina Nico 引言）保留在段落末尾，是 GEO +30 % 的引用加分项。

---

## Quick Win Reformatting Recommendations

1. **给 §1/§3/§5 各补 1 句定义式开头**（上文改写句）——预期 citability 提升 **+6 分**（Answer Block Quality 75 → 85，总分 83 → 88）
2. **保持 H2 描述式（含 B2B 信号词）**，不改成纯问题式——B2B 关键词策略（OEM/importateur/sourcing）优先，AI 也能识别 "que vérifier / quel niveau" 的问题式变体
3. **保持表格承载技术参数**（已是强项，AI 提取表格准确率高）
4. **保持 FAQ 问题式 + 8 问直答**（已满足 Gemini/AIO 的 40-60 词直答偏好）
5. **数据密度已超标**（92 分），无需再堆数据，避免过载反而降低可读性

---

## Per-Section Scores

| Section | Words | Answer | Self-Contained | Structure | Stats | Unique | Overall |
|---|---|---|---|---|---|---|---|
| §1 PD 3.0 vs 3.1 vs 3.2 | ~260 | 72 | 75 | 85 | 88 | 70 | 76 |
| §2 SPR vs EPR | ~230 | 85 | 85 | 90 | 85 | 75 | 84 |
| §3 Paliers de tension | ~210 | 58 | 72 | 80 | 95 | 75 | 71 |
| §4 Câbles E-Marker | ~230 | 78 | 80 | 88 | 90 | 80 | 81 |
| §5 PPS vs AVS | ~180 | 60 | 75 | 85 | 80 | 70 | 72 |
| §6 Directive UE | ~260 | 88 | 88 | 90 | 92 | 80 | 87 |
| §7 Guide de sourcing | ~380 | 80 | 85 | 90 | 95 | 90 | 85 |
| FAQ（8 问） | ~650 | 85 | 82 | 90 | 88 | 75 | 84 |

---

## 行动建议

**优先级 P1（改完可上 88 分）**：给 §1/§3/§5 三个章节各补 1 句定义式开头（见上文改写句）。这是唯一能显著提升 citability 的低成本改动——每处约 30 词，不改变现有表格和 B2B 信号词。

**优先级 P2（可选）**：无。结构、数据、独家工厂数据均已达标。

*分析基于 Princeton GEO（2024）+ Georgia Tech + IIT Delhi 引用偏好研究，对照 Bortolato（2025）AI Overview 最优段落长度（134-167 词）*
