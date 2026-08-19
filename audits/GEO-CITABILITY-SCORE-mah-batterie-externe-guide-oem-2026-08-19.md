# AI Citability 分析：Capacité Batterie Externe mAh OEM

**URL:** https://www.wowohcool.com/fr/blog/mah-batterie-externe-guide-oem/
**分析日期:** 2026-08-19
**Overall Citability Score: 87/100**
**Citability Coverage:** ~85% 内容块 >70 分

---

## Score Summary

| 类别 | 分数 | 权重 | 加权 |
|---|---|---|---|
| Answer Block Quality | 84/100 | 30% | 25.2 |
| Passage Self-Containment | 82/100 | 25% | 20.5 |
| Structural Readability | 92/100 | 20% | 18.4 |
| Statistical Density | 95/100 | 15% | 14.25 |
| Uniqueness & Original Data | 86/100 | 10% | 8.6 |
| **Overall** | | | **86.95 ≈ 87/100** |

---

## 最强内容块（可引用亮点）

### 1. 「1. Pourquoi la capacité réelle est toujours inférieure」— 90/100
> La capacité annoncée d'une batterie externe est mesurée à la tension interne de la cellule (3,7V), alors que la sortie USB fonctionne à 5V. Cette différence de tension, combinée au rendement du convertisseur boost, réduit mécaniquement la capacité utile.

**为什么有效**：定义/公式模式（"Capacité réelle = Nominale × 3.7/5 × rendement"）+ 品牌蓝底公式框 + 具体数据（6 290 mAh、85%、TI/Injoinic）。AI 可直接提取公式块作为「为什么容量会缩水」的标准答案，全站唯一法语版本。

### 2. 「2. Classes de cellules pour batteries externes」— 90/100
> La capacité annoncée d'une batterie externe est mesurée à la tension interne de la cellule (3,7V). Cette différence, combinée au rendement, réduit mécaniquement la capacité utile.

**为什么有效**：4 行等级表（Grade A/B/C/D / 制造商 / FOB 价 / 真实容量 / 循环次数）+ 重量辨别法（45-48 g vs 30-35 g）。信息增益核心，竞品无法语版等级表。

### 3. 「5. Exemple de calcul : 10 000 mAh pour Amazon FR」— 88/100
> Prenons une batterie externe 10 000 mAh destinée au marché Amazon FR. Avec un chip Injoinic à 88% de rendement.

**为什么有效**：answer-first + 5 行成本对比表（Grade A vs B / FOB 价 / 容量 / 退货率 / 退货成本）+ 精确 ROI 计算（$11 500 BOM 节省 vs $7 225 退货成本）。操作型决策框架，AI 可引用「Grade A vs B 的 ROI」结论。

---

## 最弱内容块（重写优先级）

### 1. 「3. Conformité DGCCRF et marquage CE」— 82/100

**当前开头**（已 answer-first）：
> La DGCCRF contrôle l'affichage des capacités des batteries externes et sanctionne la pratique commerciale trompeuse jusqu'à 10% du chiffre d'affaires annuel.

**问题**：开头已经是数据结论 + answer-first，但两个 H3（Affichage obligatoire / DEEE）都依赖列表，缺少一个可被 AI 单独提取的「定义句」。「DEEE / REP / SYDEREP / Screlec/Corepile」四个实体是法语市场独有信息，但被列表分散，AI 提取时需拼合多个 bullet。

**建议**：在 DEEE H3 下补一句定义——「La REP (responsabilité élargie du producteur) oblige tout importateur de batterie externe à adhérer à un éco-organisme (Screlec ou Corepile) et à s'enregistrer au SYDEREP avant la première mise sur le marché français.」让 AI 能一句话提取法语合规义务。

### 2. 「4. Comment vérifier la capacité avant expédition」— 83/100

**当前开头**（已 answer-first）：
> Un testeur USB de décharge est l'outil le plus simple et le plus fiable pour vérifier la capacité réelle.

**问题**：开头是工具介绍而非数据结论。「ZKETECH / Atorch / DL24」三个测试仪品牌是核心引用价值，但「5% 误差」和「6 290 mAh 理论值」的数据结论在段尾，AI 提取时需读完整段。

**建议**：开头改为数据结论——「La capacité utile mesurée doit rester à ±5% de la valeur théorique (6 290 mAh pour un 10 000 mAh). Un testeur USB de décharge (ZKETECH, Atorch, DL24) est l'outil le plus fiable pour la vérifier.」把「±5%」和「6 290 mAh」提前到首句。

---

## Quick Win 重排建议

1. 第 3 节 DEEE H3 补「REP 定义句」— +3 分
2. 第 4 节「±5% / 6 290 mAh」数据提前到首句 — +3 分
3. 第 1 节「Rendement」H3 可补一个 3 行小表（75% vs 88% vs 93% → 5 550 / 6 512 / 6 880 mAh）— +2 分

---

## Per-Section Scores

| 段落 | 词数 | Answer | Self-Cont | Structure | Stats | Unique | Overall |
|---|---|---|---|---|---|---|---|
| Hook | 85 | 78 | 74 | 85 | 90 | 86 | 80 |
| Points Clés | 55 | 90 | 88 | 90 | 95 | 85 | 88 |
| 1. Capacité réelle | 300 | 90 | 86 | 92 | 96 | 88 | 90 |
| 2. Classes cellules | 260 | 88 | 85 | 92 | 95 | 90 | 90 |
| 3. Conformité DGCCRF | 220 | 82 | 78 | 86 | 92 | 86 | 82 |
| 4. Vérifier capacité | 230 | 80 | 80 | 88 | 93 | 84 | 83 |
| 5. Exemple calcul | 250 | 86 | 84 | 90 | 95 | 86 | 88 |
| FAQ (8问) | 850 | 90 | 86 | 92 | 95 | 88 | 90 |

---

## 结论

**87/100 — HIGH citability。** 公式块（3.7V→5V）、等级表（Grade A/B/C/D）、成本对比表三个核心块对 AI 提取友好，统计密度 95/100（134 数据点）。法语市场独有内容（DGCCRF 10% 罚款、Triman/Info-Tri、REP/SYDEREP/Screlec/Corepile）是 Uniqueness 86 的支撑。剩余短板（第 3/4 节的 REP 定义缺失和数据后置）为次要项，可选择性微调。

与已发 FR 篇对比：本篇 87，高于 FR 平均（85）——公式块 + 等级表的 answer-first 结构是加分项。
