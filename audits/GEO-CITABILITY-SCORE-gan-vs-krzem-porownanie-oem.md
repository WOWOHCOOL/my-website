# AI Citability Analysis: GaN vs Krzem (PL)

**URL:** /pl/blog/gan-vs-krzem-porownanie-oem/
**分析日期:** 2026-08-15
**Overall Citability Score: 83/100**
**Citability Coverage:** ~70% 的内容块得分 >70

---

## Score Summary

| Category | Score | Weight | Weighted |
|---|---|---|---|
| Answer Block Quality | 82/100 | 30% | 24.6 |
| Passage Self-Containment | 76/100 | 25% | 19.0 |
| Structural Readability | 88/100 | 20% | 17.6 |
| Statistical Density | 90/100 | 15% | 13.5 |
| Uniqueness & Original Data | 86/100 | 10% | 8.6 |
| **Overall** | | | **83/100** |

---

## Strongest Content Blocks

### 1. "4. Sprawność i ciepło: dane fabryczne" — Score: 92/100
> "Rzeczywiste pomiary naszego laboratorium QC w Shenzhen... | Temperatura 52,4°C vs 76,8°C | Zwroty 0,3% vs 3% | MTBF >15 000 h"

**Why it works:** 一手工厂数据（FLIR 热成像 + 退货率 + MTBF），表格化。AI 最优先引用事实密集 + 独家数据。

### 2. "1. GaN vs Krzem: zasadnicza różnica" — Score: 88/100
> "Różnica nie tkwi w protokole ładowania (USB-C PD, PPS), lecz w materiale półprzewodnikowym..."

**Why it works:** 定义式开头（"X 不是 Y，而是 Z"）+ 对比表格（17 数据点）。

### 3. FAQ 8 问 — Score: 87/100
> 每问 39-48 词、1-9 数据点、自包含直接回答。

---

## Weakest Content Blocks (Rewrite Priority)

### 1. "7. Rynek i certyfikacja Polska" 引言 — Score: 58/100

**Current opening:**
> "GaN 65 W multiport jest już dostępny w polskiej dystrybucji (np. Verbatim GNC-65), a certyfikacja CE i formalności importowe są kluczowe..."

**Problem:** 开场句偏产品事实罗列，缺少可独立引用的市场数据结论。

**Suggested rewrite:**
> "GaN 65 W multiport jest już w polskiej dystrybucji (Verbatim GNC-65, Delock, Navilock), a sprzedaż przez Allegro i Amazon PL potwierdza popyt — wejście na rynek wymaga CE i numeru EORI PL."

### 2. "Przerwa energetyczna: 3,4 eV vs 1,12 eV" 段 — Score: 62/100

**Current opening:**
> "Przerwa energetyczna GaN wynosi 3,4 eV — trzykrotnie szerzej niż 1,12 eV w krzemie, co pozwala na mniejsze komponenty..."

**Problem:** 36 词，数字在标题，正文无额外数据点。

**Suggested rewrite:**
> "Przerwa energetyczna GaN to 3,4 eV — trzykrotnie szersza niż 1,12 eV w krzemie. Wyższa przerwa oznacza wytrzymałość na wyższe napięcie przy mniejszych komponentach, co bezpośrednio przekłada się na mniejszą obudowę."

---

## Quick Win Reformatting Recommendations

1. **第 7 节引言改答案优先**（补 Allegro/Amazon PL + EORI PL 数据）— 预期 +6 分
2. **H3 段落补具体数字**（"Przerwa energetyczna" 段加 3,4/1,12 eV 数值到正文）— 预期 +3 分
3. **加粗关键术语首次出现**（GaN、przerwa energetyczna、sprawność）— 预期 +2 分
4. **FAQ 答案可微调 134-167 词**（当前 39-48 词偏短）— 预期 +3 分

---

## Per-Section Scores

| Section | 词数 | Answer | Self-Contained | Structure | Stats | Unique | Overall |
|---|---|---|---|---|---|---|---|
| 1. Zasadnicza różnica | 124 | 88 | 85 | 90 | 95 | 75 | 87 |
| 2. Fizyka (intro) | 34 | 82 | 80 | 80 | 70 | 60 | 77 |
| 2a. Przerwa energetyczna | 36 | 62 | 70 | 80 | 40 | 55 | 62 |
| 2b. Częstotliwość | 33 | 78 | 78 | 80 | 70 | 60 | 75 |
| 2c. Qrr = 0 | 35 | 75 | 75 | 80 | 55 | 55 | 70 |
| 2d. HEMT producenci | 76 | 70 | 68 | 80 | 50 | 70 | 68 |
| 3. Rozmiar (intro) | 32 | 80 | 80 | 80 | 80 | 60 | 77 |
| 4. Sprawność ciepło | 153 | 92 | 88 | 95 | 95 | 95 | 92 |
| 5. TCO (intro) | 23 | 68 | 65 | 75 | 40 | 55 | 62 |
| 5a-c. TCO H3 | 39-42 | 80 | 80 | 80 | 80 | 65 | 77 |
| 6. Decyzja OEM | 86 | 85 | 82 | 90 | 80 | 70 | 83 |
| 7. Rynek (intro) | 57 | 70 | 68 | 80 | 60 | 65 | 70 |
| 7a. Kanały | 52 | 82 | 80 | 80 | 75 | 65 | 78 |
| 7b. Certyfikacja | 77 | 82 | 78 | 80 | 60 | 65 | 75 |
| FAQ (8 问) | 39-48 | 90 | 88 | 90 | 85 | 65 | 86 |

---

## 结论

**83/100 = 高可引用性**，与 FR（82）和 RU（83）一致。核心优势相同：**一手工厂数据 + 高统计密度 + 定义式开头**。写作时已应用「H2 引言答案优先」的教训，剩余短板是第 7 节引言和个别 H3 正文偏薄——均为快速修复级。

*报告由 /geo-citability 生成 · 2026-08-15*
