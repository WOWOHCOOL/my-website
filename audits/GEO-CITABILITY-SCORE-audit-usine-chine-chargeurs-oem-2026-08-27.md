# AI Citability Analysis: Comment choisir une usine en Chine — matrice d'évaluation OEM 2026

**URL:** https://www.wowohcool.com/fr/blog/audit-usine-chine-chargeurs-oem/
**Analysis Date:** 2026-08-27
**Overall Citability Score: 85/100**
**Citability Coverage:** 8/9 content blocks (89%) score above 70

---

## Score Summary

| Category | Score | Weight | Weighted |
|---|---|---|---|
| Answer Block Quality | 78/100 | 30% | 23.4 |
| Passage Self-Containment | 82/100 | 25% | 20.5 |
| Structural Readability | 92/100 | 20% | 18.4 |
| Statistical Density | 95/100 | 15% | 14.25 |
| Uniqueness & Original Data | 88/100 | 10% | 8.8 |
| **Overall** | | | **85.35 → 85/100** |

---

## Strongest Content Blocks

### 1. "Matrice d'évaluation — 5 critères pondérés" — Score: 93/100
> « Chaque critère est noté de 0 à 20, le total de 0 à 100. Le poids reflète ce que nous observons sur les commandes en production… »

**Why it works:** 定义式开头("Chaque critère est noté de 0 à 20")自包含、可直接引用;加权矩阵表格(5 行 × 3 列)是 AI 高精度抽取结构;权重数字(30/20/20/15/15)是精确数据点。原创框架 = 第一手。

### 2. "5 « questions en or » que l'usine connaît, pas le trader" — Score: 91/100
> « Ces cinq questions éliminent 80 % des confusions entre usine et société de négoce — elles se posent par écrit, avant l'audit vidéo… »

**Why it works:** 问题清单(unordered list)是 AI 最优抽取结构;每个问题带技术锚点(ripple <25 mVpp、Tektronix MDO3024、GaN FET、AQL 2.5)= 事实密集 + 唯一方法论,竞争者无法复制。

### 3. "Cas Bosch : audit 48 h, échantillons 5 jours, production 25 jours, 0 défaut" — Score: 90/100
> « Bosch sélectionnait une usine pour 10 000 unités de chargeurs GaN 65W avec certification E-Mark… »

**Why it works:** 命名实体(Bosch + E-Mark)+ 精确数字链(10 000 单位 / 48 h / 5 jours / 25 jours / 0 défaut)= 可引用的权威案例,第一手数据,Eurasia 等对手无。

---

## Weakest Content Blocks (Rewrite Priority)

### 1. "EN 62368-1, DoC et dossier technique — pas seulement le certificat" — Score: 62/100

**Current opening:**
> « Exigez du candidat une DoC (déclaration de conformité), un dossier technique et la norme EN 62368-1 — qui a remplacé l'ancienne EN 60950. Beaucoup de certificats chinois citent encore une norme abrogée… »

**Problem:** 首句已是动作结论(好),但「CE 责任在进口商」这个法国版最关键的本土差异点被放到了段尾,而非首句。AI 抽取首 60 词时拿不到最独特的判断。

**Suggested rewrite:**
> « La responsabilité CE pèse sur vous, l'importateur français, pas sur l'usine chinoise. Exigez donc une DoC, un dossier technique et la norme EN 62368-1 — qui remplace l'ancienne EN 60950, encore citée par de nombreux certificats chinois abrogés. »

**Additional improvements:**
- 把「责任在进口商」的独特点前置到首句(这是 FR 版 vs RU 版 EAC 视角的核心差异)

### 2. "Qui paie la conformité CE : incluse au FOB vs DoC 2 500-4 500 $ séparé" — Score: 66/100

**Current opening:**
> « Le package CE/FCC/RoHS + UN38.3 coûte 2 500-4 500 $ et 4-6 semaines. C'est un point de négociation… »

**Problem:** 首句是价格数字(好),但「工厂包 CE 进价 vs 进口商自办」的决策判断埋在第 3-4 句,提取时拿到价格却拿不到「何时该谁付」的结论。

**Suggested rewrite:**
> « Une usine qui inclut la conformité CE dans le prix FOB est prête pour la série ; une qui dit « on verra plus tard » vous refile 4-6 semaines de risque à la frontière. Le package CE/FCC/RoHS + UN38.3 coûte 2 500-4 500 $ sur 4-6 semaines. »

**Additional improvements:**
- 决策结论前置,价格数字后置为支撑

### 3. "Golden sample et PI : 5 étapes" — Score: 68/100

**Current opening:**
> « Premier cycle d'échantillons : 3 à 5 unités, pas une — la dispersion entre échantillons révèle l'instabilité de la ligne… »

**Problem:** 有序列表本身可提取,但首步之前的引导句缺失,AI 直接命中 `<ol>` 时缺少一句话级上下文。

**Suggested rewrite:**
> « Le golden sample et le PI se construisent en 5 étapes, de l'échantillon à la signature — la dispersion entre 3 à 5 échantillons (pas un seul) révèle l'instabilité de la ligne. »

**Additional improvements:**
- 给 `<ol>` 加一句 answer-first 引导,说明 5 步的意义

---

## Quick Win Reformatting Recommendations

1. **「CE 责任在进口商」前置到 §4 首句** — 这是 FR 版最独特的本土差异点,当前埋段尾。预期 +3 分(Answer Quality 78→82)
2. **§4 两个 H3 的决策结论前置**(工厂包 CE vs 进口商自办) — 价格数字后置为支撑。预期 +2 分
3. **给 golden sample 的 `<ol>` 加引导句** — AI 命中列表时有一句话上下文。预期 +1 分
4. **其余 6 处 H3 首句超长** — 多为技术清单句,可容忍;若追求满分可逐个拆
5. **封面图 alt 已含 B2B 关键词** — 保留;正文 3 图 alt 均法语 + OEM/importateur 信号词,已达标

---

## Per-Section Scores

| Section Heading | Words | Answer | Self-Contained | Structure | Stats | Unique | Overall |
|---|---|---|---|---|---|---|---|
| Hook (importateur de Lyon) | ~95 | 82 | 80 | 82 | 90 | 85 | 83 |
| 1. Pourquoi ne jamais choisir au prix | ~340 | 75 | 80 | 88 | 95 | 90 | 83 |
| 2. Matrice d'évaluation 5 critères | ~310 | 90 | 92 | 95 | 95 | 95 | 93 |
| 3. Questions en or + 5 faits | ~350 | 88 | 86 | 92 | 95 | 92 | 90 |
| 4. Certifications et conformité CE | ~270 | 62 | 78 | 85 | 92 | 85 | 76 |
| 5. Conditions commerciales T/T | ~340 | 80 | 82 | 90 | 95 | 88 | 86 |
| 6. 8 drapeaux rouges | ~290 | 72 | 80 | 84 | 90 | 85 | 80 |
| 7. WOWOHCOOL (Bosch) | ~310 | 85 | 86 | 88 | 95 | 95 | 89 |
| FAQ (7 questions) | ~390 | 90 | 88 | 90 | 90 | 75 | 87 |

---

*分析由 geo-citability skill 生成 · 2026-08-27 · 基于本地源文件 `src/fr/blog/audit-usine-chine-chargeurs-oem/index.njk`(正文 3443 词)*
