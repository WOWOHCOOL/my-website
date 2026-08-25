# AI Citability Analysis: Koszty Importu Elektroniki z Chin — FOB vs DDP

**URL:** https://www.wowohcool.com/pl/blog/koszty-importu-elektronika-chiny-fob-ddp/
**Analysis Date:** 2026-08-25
**Overall Citability Score: 84/100**
**Citability Coverage:** 88% of content blocks score above 70

---

## Score Summary

| Category | Score | Weight | Weighted |
|---|---|---|---|
| Answer Block Quality | 82/100 | 30% | 24.6 |
| Passage Self-Containment | 83/100 | 25% | 20.8 |
| Structural Readability | 86/100 | 20% | 17.2 |
| Statistical Density | 90/100 | 15% | 13.5 |
| Uniqueness & Original Data | 76/100 | 10% | 7.6 |
| **Overall** | | | **83.7 ≈ 84/100** |

---

## Strongest Content Blocks

### 1. "Kalkulacja cła i VAT — krok po kroku" — Score: 87/100
> Cło naliczane jest od CIF (FOB + fracht + ubezpieczenie), nie od ceny fabrycznej. VAT = 23% × (CIF + cło), a art. 33a pozwala na samoobliczenie w JPK_V7.

**Why it works:** 定义模式（"Cło = stawka × CIF"）+ 精确税率（0-5%, 2,5%, 23%）+ 时间/罚款数据（3-7 dni, $200-500）。首句即可独立回答「怎么算 cło/VAT」。Expert Insight 引用作者直接观点，IIT Delhi 研究显示权威引文可提升 115% 引用率。

### 2. "Ukryte koszty i nowe przepisy 2026" — Score: 85/100
> THC/ISPS/opłaty portowe (PLN 450-1 100), storage $20-50/dzień, agent celny 150-400 €.

**Why it works:** 直接列出隐藏成本清单 + 精确金额，answer-first，无铺垫。每项都是可提取的独立数据点。2026 新规（zniesienie zwolnienia <150 €, opłata 3 €/paczka）提供时效性，Perplexity 高度偏好 recency。

### 3. "FOB vs DDP — którą ścieżkę wybrać" — Score: 83/100
> FOB daje niższą cenę, ale ryzyko celne przechodzi na Ciebie. DDP ma narzut 8-15%, ale zero niespodzianek.

**Why it works:** 对比答案（"FOB vs DDP 三点不同"）+ 对比表格（Kryterium/FOB/DDP）。AI 系统提取表格数据准确率最高。决策框架（początkujący→DDP, 3+ dostaw→FOB）是可直接引用的操作结论。

---

## Weakest Content Blocks (Rewrite Priority)

### 1. "Jak WOWOHCOOL pomaga policzyć landed cost" — Score: 72/100

**Current opening:**
> Przy imporcie elektroniki potrzebujesz: faktury handlowej, packing list, B/L, deklaracji CE i raportu UN38.3.

**Problem:** 工厂视角段落偏营销（"my"/"WOWOHCOOL"），answer-first 模式弱于其他段。首句是文档清单而非「landed cost 怎么算」的直接答案。缺少与竞品对比的量化差异。

**Suggested rewrite:**
> Landed cost dla power banku 10 000 mAh (1 000 sztuk, DDP do UE) wynosi $9 200-15 700 — pełny koszt z góry, obejmujący fracht, cło, VAT i dokumenty CE/UN38.3.

**Additional improvements:**
- 把 $9 200-15 700 的 landed cost 提到段首（answer-first），当前埋在段尾
- 加一个「składowe $9 200-15 700」拆解表（FOB + certyfikacja + fracht + cło + VAT）

### 2. "Składowe landed cost: CIF = FOB + fracht + ubezpieczenie" — Score: 74/100

**Current opening:**
> Cena FOB to tylko wartość towaru załadowanego na statek w porcie w Chinach.

**Problem:** 首句只定义 FOB，landed cost 公式（CIF = FOB + fracht + ubezpieczenie）埋在第二句。数据点偏少（仅 1-2%）。

**Suggested rewrite:**
> Landed cost to CIF + cło + VAT, gdzie CIF = cena FOB + fracht + ubezpieczenie (1-2% wartości towaru).

**Additional improvements:**
- 把 CIF 公式提前到首句，作为可独立提取的定义句
- 补充一个具体数字锚点（如 ubezpieczenie 通常 80-135 € dla palety）

### 3. "FAQ — Często Zadawane Pytania" — Score: 75/100

**Current opening:**
> Ile kosztuje import elektroniki z Chin do Polski?

**Problem:** FAQ 8 问结构正确、每答含 ≥1 数字，但问题偏通用（"Ile kosztuje...?"），未用采购术语（FOB/MOQ/certification）强化 B2B 匹配。答案长度偏长，40-60 字的 Gemini 最优区间命中少。

**Suggested rewrite:**
> Koszt importu elektroniki do Polski — FOB vs DDP landed cost, ile faktycznie zapłacisz?

**Additional improvements:**
- 前 2 个 FAQ 问题嵌入 FOB/DDP/landed cost 关键词（匹配商业意图查询）
- 第 1、2 个答案压缩到 40-60 字，命中 Gemini/AI Overview 的最优提取区间

---

## Quick Win Reformatting Recommendations

1. **把 landed cost 公式（CIF = FOB + fracht + ubezpieczenie）提到 H2 #1 首句** — Expected citability lift: +4 points
2. **在 H2 #6 加「$9 200-15 700 landed cost 拆解表」**（FOB/certyfikacja/fracht/cło/VAT 五行）— Expected lift: +3 points
3. **前 2 个 FAQ 答案压缩到 40-60 字**，命中 Gemini/AI Overview 提取区间 — Expected lift: +2 points
4. **H3 标题改用问题式或数据结论式**（当前多为名词短语），匹配 AI 查询 — Expected lift: +2 points
5. **在 H2 #3 加权威来源内链标注**（ISZTAR/TARIC/PUESC 作为 citation 来源名）— Expected lift: +2 points

---

## Per-Section Scores

| Section Heading | Words | Answer | Self-Contained | Structure | Stats | Unique | Overall |
|---|---|---|---|---|---|---|---|
| Hook (FOB 6 000 $ + 27% narzut) | ~50 | 85 | 85 | 80 | 85 | 75 | 83 |
| 1. Dlaczego cena FOB to nie cały koszt | ~180 | 78 | 82 | 78 | 70 | 70 | 76 |
| 2. FOB vs DDP — którą ścieżkę wybrać | ~200 | 85 | 85 | 90 | 75 | 70 | 83 |
| 3. Kalkulacja cła i VAT — krok po kroku | ~220 | 88 | 85 | 82 | 90 | 80 | 87 |
| 4. Porty i trasy do Polski | ~170 | 80 | 85 | 75 | 85 | 70 | 80 |
| 5. Ukryte koszty i nowe przepisy 2026 | ~180 | 85 | 85 | 78 | 90 | 75 | 85 |
| 6. Jak WOWOHCOOL pomaga policzyć landed cost | ~190 | 72 | 80 | 75 | 75 | 80 | 72 |
| FAQ (8 pytań) | ~420 | 78 | 80 | 85 | 80 | 60 | 75 |

---

## Key Takeaway

**数据密度是本文最大优势（90/100），第一手工厂视角是独特来源。** 主要短板是「answer-first 不够彻底」——landed cost 公式和 $9 200-15 700 全包价埋在段落中后部，而未提到首句。把核心数字前移 + FAQ 压缩到 40-60 字，可将 citability 从 84 提升到 88-90。
