# Research Brief: 术语修正 — "Półprzewodnikowy" → "Półstały"

**Date**: 2026-08-12
**Issue**: "Półprzewodnikowy" (半导体) 被错误用于描述半固态电池

---

## 术语辨析

| 波兰语 | 中文 | 英文 | 正确用途 |
|--------|------|------|----------|
| **Półprzewodnikowy** | 半导体 | Semiconductor | 电子元件（如 TEC 冷却芯片） |
| **Półstały** | 半固态 | Semi-solid-state | 电池技术（2.5-10% 液态电解质） |

## 受影响的文件（7 个文件，11 处错误）

### 1. `/pl/produkty/index.njk` — 3 处
| 行 | 当前 | 应改为 |
|:--:|------|------|
| 169 | `<span>...Półprzewodnikowy...</span>` | `Półstały` |
| 175 | `alt="Power Bank Półprzewodnikowy..."` | `Power Bank Półstały` |
| 177 | `Półprzewodnikowy` (产品卡片标签) | `Półstały` |

### 2. `/pl/produkty/power-bank/index.njk` — 3 处
| 行 | 当前 | 应改为 |
|:--:|------|------|
| 57 | Schema: `"Power Bank Półprzewodnikowy (CES 2026)"` | `Power Bank Półstały` |
| 307 | `<!-- 1. Półprzewodnikowy -->` | `<!-- 1. Półstały -->` |
| 314 | `<h3>Półprzewodnikowy</h3>` | `<h3>Półstały</h3>` |

### 3-6. 4 个子产品页 — 交叉链接标签错误
| 文件 | 行 | 应改为 |
|------|:--:|------|
| `bateria-grzejaca` | 576 | `Półstały` |
| `magnetyczny-bezprzewodowy` | 605 | `Półstały` |
| `do-laptopa` | 619 | `Półstały` |
| `inteligentny-wyswietlacz` | 783 | `Półstały` |

### ✅ 正确使用（无需修改）
- `ladowarka-bezprzewodowa/uchwyt-samochodowy/` line 501: "półprzewodnikowym chłodzeniem TEC" — 这是正确的！TEC 冷却确实使用半导体元件
- `/polstaly/index.njk` — 整个页面已正确使用 "półstały"

## 影响

"Półprzewodnikowy" 意味着"半导体"，波兰 B2B 买家读到这个词会理解为电子芯片而不是电池技术。这是一个严重的术语错误。

---

*Brief prepared: 2026-08-12*
