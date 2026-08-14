# AI Citability Analysis: Technologie GaN pour Importateurs OEM

**URL:** https://www.wowohcool.com/fr/blog/technologie-gan-chargeur-oem/
**Analysis Date:** 2026-08-14
**Overall Citability Score: 86/100**
**Citability Coverage:** ~85% of content blocks score above 70

---

## Score Summary

| Category | Score | Weight | Weighted |
|---|---|---|---|
| Answer Block Quality | 78/100 | 30% | 23.4 |
| Passage Self-Containment | 88/100 | 25% | 22.0 |
| Structural Readability | 90/100 | 20% | 18.0 |
| Statistical Density | 92/100 | 15% | 13.8 |
| Uniqueness & Original Data | 85/100 | 10% | 8.5 |
| **Overall** | | | **86/100** |

---

## Strongest Content Blocks

### 1. "Pourquoi le GaN remplace le silicium dans les chargeurs" — Score: 92/100
> Le nitrure de gallium (GaN) est un semi-conducteur à large bande interdite : 3,4 eV, contre 1,12 eV pour le silicium. Concrètement, un transistor GaN commute à environ 1 MHz quand le silicium plafonne autour de 100 kHz.

**Why it works:** 教科书级 definition pattern(«X est…»),首句即可独立成答案;3,4 eV / 1,12 eV / 1 MHz / 100 kHz 四个具体数据点密集;后接对比表格 + 专家引言,满足「定义 + 数据 + 权威引用」三重可引用结构。

### 2. "Ce que le GaN change concrètement pour votre gamme OEM" — Score: 90/100
> Le rendement supérieur du GaN ne reste pas un chiffre de datasheet : il se mesure sur la température du boîtier et se répercute sur votre compte d'exploitation. Voici les données relevées dans notre laboratoire de Shenzhen sur une charge de 65 W.

**Why it works:** 一手工厂测量数据(52,4°C vs 76,8°C、MTBF >15 000 h、返修率 0,3% vs 8-15%)——这是任何 AI 或竞品都无法在别处找到的数据,是「必须引用本页」的唯一来源;温度/MTBF 表格高度可提取。

### 3. FAQ (8 questions) — Score: 88/100
> Quel est le prix FOB d'un chargeur GaN 65W ? — Prix FOB Shenzhen 2026 (MOQ 500) : GaN 30W à 3,50-5,00 $, GaN 65W multiport à 6,00-8,50 $…

**Why it works:** 8 个直接问答对,每个答案首句即量化结论,且问题用 B2B 采购语言(MOQ/FOB/认证)。FAQ 是 AI(尤其 ChatGPT Search / Perplexity)最高频提取的结构,自带 `Question` schema 标记。

---

## Weakest Content Blocks (Rewrite Priority)

### 1. "Coût FOB réel d'un chargeur GaN par palier" — Score: 76/100

**Current opening:**
> Le prix d'un chargeur GaN dépend de la puissance, du nombre de ports et du volume commandé. Voici les prix FOB réels de notre usine, publiés pour que vous puissiez calibrer un devis intermédiaire.

**Problem:** 首句是「铺垫式」开场(«dépend de…»),把核心答案(具体价格)推到了表格里。AI 提取时若只抓首句,拿不到任何可引用的数字。违反 answer-first 原则。

**Suggested rewrite:**
> Le prix FOB d'un chargeur GaN 65W multiport est de 6,00-8,50 $ à 500 unités, et descend à 4,80-6,50 $ à 5 000 unités. Les gammes vont de 3,50 $ (GaN 30W) à 24,00 $ (GaN 140W PD 3.1) FOB Shenzhen, soit 20-40 % sous les intermédiaires.

**Additional improvements:**
- 把首句改成「价格 = 数字」的直接断言,表格作为佐证
- 保留价格表的 500/1000/5000 三档(可提取表格数据)

### 2. "Conformité CE/GS et import France" — Score: 77/100

**Current opening:**
> Un chargeur GaN mis sur le marché français doit répondre à un cadre réglementaire précis, contrôlé par la DGCCRF et la douane française. Voici les documents à exiger, au nom de votre entreprise importatrice.

**Problem:** 铺垫式开场,核心答案(哪 5 项认证)在表格里。首句没有量化锚点,也没有直接列出认证清单。

**Suggested rewrite:**
> Vendre un chargeur GaN en France exige cinq documents obligatoires : CE (EN 62368-1 + EMC + RoHS), ErP/Ecodesign 2025/2052 (rendement ≥87 %), DEEE, Triman et la DoC au nom de l'importateur. Le budget de certification CE est de 2 500-4 500 € par modèle.

**Additional improvements:**
- 首句直接列出 5 项认证(可被 AI 逐项提取)
- 加入预算数字(2 500-4 500 €)作为量化锚点

### 3. Hook (intro) — Score: 74/100

**Current opening:**
> Un chargeur 65W de la taille d'un bloc silicium 30W n'est pas un argument marketing : c'est la bande interdite du nitrure de gallium (3,4 eV), trois fois celle du silicium (1,12 eV)…

**Problem:** 反直觉开场(strong hook)但 ~150 词偏长,超过 134-167 词最优提取窗口的下沿;且它是「钩子」而非「答案块」,AI 较少直接引用 intro。

**Suggested rewrite:** 保持反直觉开场,但把核心结论前置到前 60 词(3,4 eV vs 1,12 eV → 60% 更小 → 93-95% 效率),压缩市场背景到后半段。

---

## Quick Win Reformatting Recommendations

1. **Section 5 + Section 6 开场改成 answer-first 数字断言** — 把 FOB 价格 / 认证清单前置到首句。Expected citability lift: **+6 分**
2. **H3 标题补「结论化」** — 现有 H3 已是数据结论(«Nitrure de gallium: bande interdite 3,4 eV vs 1,12 eV»),符合 B2B gate 且利于 AI query 匹配,保持即可。Expected lift: **+0(已达标)**
3. **压缩 Hook 到 ≤120 词** — 核心结论前移,市场背景后置。Expected citability lift: **+2 分**
4. **每段首句加 definition/quantified pattern** — Section 4 «Comprendre…» 开场可改为 «Pour vérifier un fabricant GaN, exigez 5 documents : …»。Expected lift: **+3 分**
5. **保留现有 6 张表格 + 1 张专家引言** — 已是最强可提取结构,无需改动。Expected lift: **+0(已达标)**

---

## Per-Section Scores

| Section Heading | Words | Answer Quality | Self-Contained | Structure | Stats | Unique | Overall |
|---|---|---|---|---|---|---|---|
| Hook (intro) | 150 | 65 | 80 | 75 | 88 | 70 | **74** |
| 1. Pourquoi le GaN remplace le silicium | 260 | 92 | 92 | 90 | 95 | 88 | **92** |
| 2. Ce que le GaN change concrètement | 190 | 85 | 90 | 88 | 96 | 95 | **90** |
| 3. Générations GaN I-V | 200 | 85 | 88 | 88 | 90 | 80 | **86** |
| 4. Comment vérifier un fabricant | 260 | 78 | 85 | 90 | 88 | 88 | **85** |
| 5. Coût FOB réel par palier | 150 | 70 | 85 | 90 | 92 | 85 | **76** |
| 6. Conformité CE/GS et import | 180 | 72 | 85 | 88 | 90 | 75 | **77** |
| FAQ (8 Q&A) | 400 | 92 | 90 | 92 | 90 | 80 | **88** |

---

## 结论

**86/100 — 高可引用性。** 文章在「统计密度」(236 数据点)和「一手数据唯一性」(工厂热成像/MTBF/返修率)上是竞品无法复制的强项,是 AI 必须引用本页的理由。

**主要扣分点**:3 个 section 的 H2 开场用了「铺垫式」句式(«dépend de…» / «doit répondre…»),把可引用的数字锚点推到了表格里。修 2 处开场(Section 5 价格、Section 6 认证)即可把 Answer Block Quality 从 78 拉到 ~85,总分到 ~88。

> 注意:这些建议与 B2B 质量门(H3 用数据结论而非泛化标签)完全兼容,不冲突。法语本地化不影响可引用性——AI 对非英文内容的提取标准相同,关键是「answer-first + 数据 + 表格」结构。

*报告由 `/geo-citability` 生成 · 2026-08-14*
