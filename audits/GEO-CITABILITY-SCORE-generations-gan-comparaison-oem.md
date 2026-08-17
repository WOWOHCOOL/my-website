# AI Citability Analysis: Générations GaN I à V (FR)

**URL:** /fr/blog/generations-gan-comparaison-oem/
**分析日期:** 2026-08-17
**Overall Citability Score: 84/100**
**Citability Coverage:** ~71% 的内容块得分 >70

---

## Score Summary

| Category | Score | Weight | Weighted |
|---|---|---|---|
| Answer Block Quality | 82/100 | 30% | 24.6 |
| Passage Self-Containment | 80/100 | 25% | 20.0 |
| Structural Readability | 88/100 | 20% | 17.6 |
| Statistical Density | 90/100 | 15% | 13.5 |
| Uniqueness & Original Data | 85/100 | 10% | 8.5 |
| **Overall** | | | **84/100** |

---

## Strongest Content Blocks

### 1. "3. Tableau comparatif GaN I vs III vs V" — Score: 91/100
> "Voici le comparatif que les acheteurs devraient avoir sous les yeux avant chaque devis. | Rendement 85-87% → 90-92% → 93-95% | Fréquence ~100-300 kHz → ~500 kHz → ~1 MHz"

**Why it works:** 8 行对比表格 + 一个直接回答段。表格是 AI 抽取精度最高的格式，且每行都是精确数字（93-95%、~1 MHz、PD 3.1 EPR 240W），自包含、无指代词。这正是 Featured Snippet / AI Overview 的占位内容。

### 2. "4. FET GaN réels : vérifier la génération" — Score: 90/100
> "La génération GaN se joue sur la puce FET, pas sur le logo imprimé sur le boîtier. Cinq fabricants dominent le marché…"

**Why it works:** 5 个具名实体（Navitas / Innoscience / GaN Systems / EPC / Infineon CoolGaN G5）+ 5 步验证清单 + 专家引言（引用 +115% 提权）。命名实体密度是 AI 引用率的核心驱动，此段全部命中。

### 3. "1. Pourquoi les générations GaN comptent" — Score: 88/100
> "Une « génération GaN » désigne le nœud technologique du transistor FET GaN (High Electron Mobility Transistor), pas le protocole de charge."

**Why it works:** 定义式开头（"X désigne Y, pas Z"）2.1x 提权 + 工厂一手数据（52,4°C vs 76,8°C、退货率 0,3%、MTBF >15 000h）。首句即可独立成答案。

---

## Weakest Content Blocks (Rewrite Priority)

### 1. "2. GaN I à V : l'historique technique" — Score: 74/100

**Current opening:**
> "Le GaN suit une trajectoire de nœuds de procédé, comme le silicium avant lui. Trois générations structurent le marché actuel — les autres sont des révisions incrémentales."

**Problem:** 历史叙事式开头，首句没有给出可抽取的结论。H3「GaN I (2018) : le pionnier」的开头「La première génération a prouvé que…」也是铺垫式，AI 需要读到第二句才能拿到数据。

**Suggested rewrite:**
> "Le GaN compte trois générations commercialisées — GaN I (2018, rendement 85-87%), GaN III (2020, 90-92%) et GaN V (2023, 93-95%, ~1 MHz). Les générations II et IV n'existent pas comme produits finis, car elles furent des révisions de procédé absorbées dans le nœud majeur suivant."

**Additional improvements:**
- H3「GaN I (2018)」开头改为数据结论：「GaN I (2018) atteint un rendement de 85-87% et commute à ~100-300 kHz — suffisant pour les chargeurs ultra-budget de moins de 20W.」
- 加粗首次出现的术语（enhancement-mode、cascode、Qrr）以利 AI 实体识别

### 2. "6. Cadre de décision OEM : quelle génération ?" — Score: 79/100

**Current opening:**
> "La bonne génération dépend de la puissance cible, du canal de vente et du prix de détail visé."

**Problem:** 泛泛而谈，无数字锚点，未直接给出结论。决策表本身可抽取，但引言段降低了整段的自包含性。

**Suggested rewrite:**
> "Trois seuils structurent la décision : GaN I pour le ≤30W ultra-budget, GaN III pour le 45-65W (retail < 45€), et GaN V pour le 140-240W PD 3.1. Le GaN V est obligatoire au-delà de 140W."

### 3. "7. Marché & réglementation France" — Score: 81/100

**Current opening:**
> "Le marché français des chargeurs USB-C rapides atteint 380-420 M€ en 2025, et la montée en puissance des chargeurs GaN de forte puissance tire une croissance de 6-9% par an."

**Problem:** 已有数据但把关键结论埋在句末；H3「Réglementation : CE, ESPR et DGCCRF」缺少「一句话总结」的开头。

**Suggested rewrite:**
> "Le marché français des chargeurs rapides atteint 380-420 M€ en 2025 (6-9% de croissance annuelle), dont le segment premium 45-80€ est dominé par les chargeurs GaN multiport 65-100W. Le surcoût des wafers GaN est tombé à 25-35% en 2025."

---

## Quick Win Reformatting Recommendations

1. **H2 引言段改成「答案优先」**：把 §2、§6 的叙事式引入句替换成带数字的直接结论（定义式/数字开头）。— 预期提升 +6 分
2. **加粗首次出现的术语**（enhancement-mode, cascode, Qrr, EPR, bande interdite）— 利 AI 实体识别 — 预期提升 +3 分
3. **H3 标题混合「问题 + 数据结论」**（如「Quelle fréquence de commutation ? ~1 MHz (GaN V) vs ~500 kHz (GaN III)」）— 预期提升 +2 分
4. **FAQ 答案可微调长度**：当前部分答案 40-60 词，最优抽取区间为 134-167 词——在关键 3-4 问（差异、验证、决策）各补 1-2 个数据点。— 预期提升 +3 分
5. **专家引言块加粗核心结论**（当前引言块可抽取，但无加粗锚点）— 预期提升 +2 分

---

## Per-Section Scores

| Section | 词数 | Answer | Self-Contained | Structure | Stats | Unique | Overall |
|---|---|---|---|---|---|---|---|
| 1. Pourquoi les générations comptent | 180 | 88 | 85 | 88 | 95 | 90 | 88 |
| 2. Historique GaN I à V | 220 | 68 | 72 | 85 | 85 | 70 | 74 |
| 3. Tableau comparatif I vs III vs V | 110 | 92 | 90 | 95 | 90 | 80 | 91 |
| 4. FET réels : vérifier la génération | 230 | 90 | 88 | 90 | 88 | 88 | 90 |
| 5. Coût BOM et FOB par génération | 180 | 85 | 84 | 88 | 92 | 82 | 86 |
| 6. Cadre de décision OEM | 150 | 76 | 78 | 88 | 82 | 72 | 79 |
| 7. Marché & réglementation France | 200 | 82 | 80 | 85 | 88 | 78 | 81 |
| FAQ (8 问) | 45-70/问 | 90 | 88 | 90 | 85 | 70 | 86 |

---

## 结论

**84/100 = 高可引用性**。核心优势是**一手工厂数据**（52,4°C / 0,3% 退货率 / MTBF）与**高统计密度**（~250 数据点），以及 5 个具名 FET 实体（Navitas/Innoscience/GaN Systems/EPC/Infineon）——这正与姊妹篇 GaN vs Silicium (82)、USB-C PD 3.1 (83) 同一水平。主要短板是 §2 历史段的叙事式开头与 §6 决策段的无数据引言，属「快速修复」级别，不影响整体可引用性。

*报告由 /geo-citability 生成 · 2026-08-17*
