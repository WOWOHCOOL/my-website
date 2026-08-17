# AI Citability Analysis: GaN vs Silicium (FR)

**URL:** /fr/blog/gan-vs-silicium-comparaison-oem/
**分析日期:** 2026-08-15
**Overall Citability Score: 82/100**
**Citability Coverage:** ~68% 的内容块得分 >70

---

## Score Summary

| Category | Score | Weight | Weighted |
|---|---|---|---|
| Answer Block Quality | 78/100 | 30% | 23.4 |
| Passage Self-Containment | 75/100 | 25% | 18.8 |
| Structural Readability | 88/100 | 20% | 17.6 |
| Statistical Density | 92/100 | 15% | 13.8 |
| Uniqueness & Original Data | 88/100 | 10% | 8.8 |
| **Overall** | | | **82/100** |

---

## Strongest Content Blocks

### 1. "4. Rendement & chaleur : données d'usine" — Score: 92/100
> "Voici les mesures réelles de notre laboratoire QC de Shenzhen, pas des valeurs catalogue. | Température boîtier 52,4°C vs 76,8°C | Taux de retour 0,3% vs 3% | MTBF >15 000h vs ~6 500h"

**Why it works:** 一手工厂数据（FLIR 热成像 + 退货率 + MTBF），198 词、13 数据点、表格化。这是任何竞品都无法复制的独特数据，AI 最优先引用此类事实密集 + 独一无二的段落。

### 2. "1. GaN vs Silicium : la différence fondamentale" — Score: 88/100
> "La différence ne tient pas au protocole de charge (USB-C PD, PPS), mais au matériau semi-conducteur..."

**Why it works:** 定义式开头（"X 不是 Y，而是 Z"）+ 对比表格（145 词、17 数据点）。首句即可独立成答案，符合 AI 抽取偏好。

### 3. FAQ 8 问 — Score: 87/100
> 每问 51-59 词、2-9 个数据点、自包含直接回答。

**Why it works:** 问题式标题直接匹配 AI 查询，答案第一句就给结论（"Le GaN atteint un rendement de 93-95%..."），自带数字。FAQ 是 AI 引用率最高的格式。

---

## Weakest Content Blocks (Rewrite Priority)

### 1. H2 引言段（如 "2. Pourquoi le GaN gagne" 引言）— Score: 55/100

**Current opening:**
> "L'écart de performance n'est pas un argument marketing, il est ancré dans la physique des semi-conducteurs."

**Problem:** 叙事式开头，非「答案优先」。首句没有给出可引用的结论，24 词、0 数据点，AI 无法抽取成独立答案。

**Suggested rewrite:**
> "Le GaN surpasse le silicium pour trois raisons physiques : une bande interdite de 3,4 eV (contre 1,12 eV), une commutation à ~1 MHz (contre 100-500 kHz) et une charge de recouvrement inverse quasi nulle (Qrr ≈ 0)."

### 2. "3. Taille & portabilité" 段 — Score: 62/100

**Current opening:**
> "Pour un importateur, la compacité du GaN n'est pas qu'un argument produit : c'est une économie logistique mesurable."

**Problem:** 引入句偏叙事，「pas qu'un argument produit」是修辞铺垫，不如直接给结论。

**Suggested rewrite:**
> "Un GaN 65W occupe 40-55 cm³ contre 90-130 cm³ pour le silicium — soit 40-60% de volume en moins, ce qui réduit le coût de fret maritime unitaire."

### 3. "GaN HEMT et fabricants de puces" 段 — Score: 64/100

**Current opening:**
> "Les transistors GaN HEMT (High Electron Mobility Transistor) expliquent la commutation rapide et le Qrr ≈ 0. Ces puces proviennent de quelques fabricants spécialisés..."

**Problem:** 「Ces puces」是指代词，需要上下文。段内无具体数字锚点（只有厂名）。

**Suggested rewrite:**
> "Les puces GaN (transistors HEMT) proviennent de quatre fabricants — Infineon, Navitas, GaN Systems et Innoscience. Vérifier ce fabricant est un critère de qualité aussi important que le rendement annoncé."

---

## Quick Win Reformatting Recommendations

1. **H2 引言段改成「答案优先」**：把每个 H2 下的叙事式引入句，替换成 1-2 句带数字的直接结论（定义式开头）。— 预期提升 +8 分
2. **加粗关键术语首次出现**（GaN、bande interdite、HEMT、rendement）— 利于 AI 实体识别 — 预期提升 +3 分
3. **FAQ 答案可微调到 134-167 词**（当前 51-59 词偏短），每答补 1-2 个数据点 — 预期提升 +4 分
4. **消除指代词开头**（"Ces écarts"/"Ces puces"→ 显式主语）— 预期提升 +3 分
5. **H3 标题改为「数据结论 + 问题」混合**（如 "Quelle bande interdite ? 3,4 eV vs 1,12 eV"）— 预期提升 +2 分

---

## Per-Section Scores

| Section | 词数 | Answer | Self-Contained | Structure | Stats | Unique | Overall |
|---|---|---|---|---|---|---|---|
| 1. Différence fondamentale | 145 | 88 | 85 | 90 | 95 | 75 | 87 |
| 2. Physique (intro) | 24 | 55 | 60 | 70 | 40 | 50 | 56 |
| 2a. Bande interdite | 57 | 85 | 85 | 80 | 70 | 60 | 79 |
| 2b. Vitesse commutation | 43 | 80 | 80 | 80 | 75 | 60 | 77 |
| 2c. Qrr = 0 | 43 | 78 | 78 | 80 | 60 | 55 | 73 |
| 2d. HEMT fabricants | 77 | 64 | 62 | 80 | 50 | 70 | 65 |
| 3. Taille (intro) | 26 | 62 | 60 | 75 | 50 | 50 | 61 |
| 3a. Volume en moins | 53 | 82 | 82 | 80 | 85 | 60 | 79 |
| 3b. Fret maritime | 49 | 78 | 78 | 80 | 70 | 60 | 75 |
| 4. Rendement (données usine) | 198 | 92 | 88 | 95 | 95 | 95 | 92 |
| 5. TCO (intro) | 34 | 65 | 60 | 75 | 50 | 55 | 62 |
| 5a. BOM premium | 50 | 82 | 80 | 80 | 85 | 65 | 79 |
| 5b. Retours garantie | 47 | 80 | 80 | 80 | 80 | 65 | 77 |
| 5c. Tendance prix | 53 | 80 | 80 | 80 | 75 | 60 | 77 |
| 6. Décision OEM | 105 | 85 | 82 | 90 | 80 | 70 | 83 |
| 7. Marché (intro) | 20 | 60 | 58 | 70 | 40 | 50 | 57 |
| 7a. Marché premium | 52 | 85 | 82 | 80 | 80 | 60 | 80 |
| 7b. Réglementation | 110 | 80 | 78 | 80 | 60 | 60 | 74 |
| FAQ (8 问) | 51-59/问 | 90 | 88 | 90 | 85 | 65 | 86 |

---

## 结论

**82/100 = 高可引用性**。核心优势是**一手工厂数据**（温度/退货率/MTBF）和**高统计密度**（253 数据点），这两项正是 AI 引用率的最大驱动因素。主要短板是**H2 引言段的叙事式开头**和**少数指代词**，属于「快速修复」级别，不影响整体可引用性。

*报告由 /geo-citability 生成 · 2026-08-15*
