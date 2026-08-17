# AI Citability Analysis: Pokolenia GaN I-V (PL)

**URL:** /pl/blog/generacje-gan-porownanie-oem/
**分析日期:** 2026-08-17
**Overall Citability Score: 86/100**
**Citability Coverage:** ~75% 的内容块得分 >70

---

## Score Summary

| Category | Score | Weight | Weighted |
|---|---|---|---|
| Answer Block Quality | 85/100 | 30% | 25.5 |
| Passage Self-Containment | 83/100 | 25% | 20.8 |
| Structural Readability | 88/100 | 20% | 17.6 |
| Statistical Density | 92/100 | 15% | 13.8 |
| Uniqueness & Original Data | 88/100 | 10% | 8.8 |
| **Overall** | | | **86/100** |

---

## Strongest Content Blocks

### 1. "3. Tabela porównawcza GaN I vs III vs V" — Score: 91/100
> "Oto porównanie, które kupiec powinien mieć przed oczami przed każdą wyceną. | Sprawność 85-87% → 90-92% → 93-95% | Częstotliwość ~100-300 kHz → ~500 kHz → ~1 MHz"

**Why it works:** 8 行对比表格 + 直接回答段。表格是 AI 抽取精度最高的格式，每行都是精确数字（93-95%、~1 MHz、PD 3.1 EPR 240 W）。Featured Snippet / AI Overview 占位内容。

### 2. "4. FET GaN: jak zweryfikować pokolenie" — Score: 90/100
> "Pokolenie GaN zależy od układu FET, a nie logo na obudowie. Sześciu producentów dominuje na rynku…"

**Why it works:** 6 个具名实体（Navitas/Innoscience/GaN Systems/EPC/Infineon CoolGaN G5/**Power Integrations InnoSwitch4-CZ**）+ 5 步验证清单 + **独家「假 GaN V」洞察**（欧洲分销商实测 3 家仅 1 家真用）+ 专家引言。Power Integrations 是 PL 版独有的第 6 个 FET 实体，比 FR/RU 更全。

### 3. "1. Dlaczego pokolenia GaN mają znaczenie" — Score: 88/100
> "«Pokolenie GaN» oznacza węzeł technologiczny tranzystora FET GaN (High Electron Mobility Transistor), a nie protokół ładowania."

**Why it works:** 定义式开头（"X oznacza Y, a nie Z"）2.1x 提权 + 工厂一手数据（52,4°C vs 76,8°C、0,3% vs 8-15%、MTBF >15 000 h）。首句即可独立成答案。

---

## Weakest Content Blocks (Rewrite Priority)

### 1. "7. Certyfikacja CE i obowiązki importera" — Score: 80/100

**Current opening:**
> "Każda ładowarka sprzedawana w Polsce musi mieć oznaczenie CE (dyrektywy LVD 2014/35/UE + EMC 2014/30/UE) i spełniać normę IEC 62368-1. Importer odpowiada przed UOKiK… potrzebuje numeru EORI PL… rejestracji BDO… art. 33a ustawy o VAT…"

**Problem:** 一个超长段落塞进了 CE + UOKiK + EORI PL + ISZTAR + BDO + art. 33a VAT 六个合规要点，AI 难以切分成独立答案块。与 RU 版 §7 EAC 段同病（RU 已修复，PL 尚未）。

**Suggested rewrite:**
> 拆成清单（无序列表）：
> - CE (LVD 2014/35/UE + EMC 2014/30/UE) + IEC 62368-1 — oznaczenie
> - UOKiK — odpowiedzialność importera za zgodność
> - EORI PL + ISZTAR — odprawa celna
> - BDO — rejestracja odpadów
> - art. 33a ustawy o VAT — odwrotne obciążenie

**Additional improvements:**
- 加一张 CE 合规流程表（obowiązek / instytucja / termin）
- 把「8-16 tygodni」物流周期提为独立数据锚点

### 2. "2. GaN I-V: ewolucja techniczna" — Score: 79/100

**Current opening:**
> "GaN ma trzy pokolenia komercyjne: GaN I (2018, sprawność 85-87%), GaN III (2020, 90-92%) i GaN V (2023, 93-95%, ~1 MHz)."

**Problem:** 开头已是答案优先，但 H3「GaN I (2018) — pionier」首句「GaN I (2018) osiąga sprawność 85-87%…」后接叙事，个别 H3 仍有铺垫。

**Suggested rewrite:** 无需大改，只需在 H3 后立即给数字结论（已是半优化状态）。

### 3. FAQ (8 问) — Score: 84/100

**Problem:** 答案 40-60 词，略短于正文段落最优抽取区间——但 FAQ schema 本就该简短（Gemini 偏好 40-60 词答案块），此条不构成真问题。

**建议:** 保持现状，无需补长。

---

## Quick Win Reformatting Recommendations

1. **§7 CE 段拆成清单**（CE/UOKiK/EORI PL/ISZTAR/BDO/art. 33a 各自成行）— 预期提升 +4 分（与 RU 版已修复同款）
2. **加粗首现术语**（enhancement-mode/cascode 已在 §2 加粗，补 EPR/bandgap 首次出现处）— 预期提升 +2 分
3. **H3 标题混合「问题 + 数据结论」**（如「Jaka częstotliwość przełączania? ~1 MHz vs ~500 kHz」）— 预期提升 +2 分
4. **§7 加 CE 合规流程表**（obowiązek/instytucja/termin）— 预期提升 +3 分
5. **专家引言块加粗核心结论** — 预期提升 +2 分

---

## Per-Section Scores

| Section | 词数 | Answer | Self-Contained | Structure | Stats | Unique | Overall |
|---|---|---|---|---|---|---|---|
| 1. Dlaczego pokolenia mają znaczenie | 180 | 88 | 85 | 88 | 95 | 90 | 88 |
| 2. Ewolucja techniczna | 220 | 80 | 76 | 85 | 85 | 72 | 79 |
| 3. Tabela porównawcza I vs III vs V | 110 | 92 | 90 | 95 | 90 | 80 | 91 |
| 4. FET: zweryfikować pokolenie | 240 | 90 | 88 | 90 | 90 | 92 | 90 |
| 5. Narzut BOM i FOB | 180 | 86 | 84 | 88 | 92 | 82 | 86 |
| 6. Decyzja OEM | 150 | 84 | 82 | 88 | 84 | 76 | 83 |
| 7. Rynek Polski + CE | 230 | 80 | 78 | 75 | 92 | 88 | 80 |
| FAQ (8 问) | 40-60/问 | 88 | 86 | 90 | 85 | 72 | 84 |

---

## 结论

**86/100 = 高可引用性**，与 RU 版持平。核心优势是**一手工厂数据**（52,4°C / 0,3% / MTBF）与**6 个具名 FET 实体**（含 PL 独有的 Power Integrations InnoSwitch4-CZ），以及两个独家差异化点：**「假 GaN V 识别」**（欧洲分销商案例）和 **波兰市场数据**（IndexBox 85-95% 中国进口、Allegro 55-65%）。唯一实质短板是 §7 CE 段的密集长段落（与 RU 版 §7 EAC 同病，RU 已修、PL 待修），属「快速修复」级别。

*报告由 /geo-citability 生成 · 2026-08-17*
