# B2B Audit — baterie-polstale-power-bank-oem (PL)

**日期**: 2026-08-13
**文件**: `src/pl/blog/baterie-polstale-power-bank-oem/index.njk`
**文章类型**: technical（半固态电池技术 + 供应商评估 + 波兰认证）

---

## 总分: 93.8/100 — Excellent ✅

| 检查项 | 分数 | 状态 |
|---|---|---|
| Opening Density (no-fluff) | 60 | ⚠️（auditor `_skip_to_body_start` 行为）|
| TL;DR Block | 100 | ✅（修复后）|
| H3 Answer Length | 100 | ✅ |
| Vague Heading Detection | 100 | ✅ |
| H2 B2B Signal Density | 100 | ✅ |
| First-Hand Data Density | 100 | ✅ |
| Table Test | 100 | ✅ |
| Stock Photo Detection | 100 | ✅ |
| FAQ B2B Language | 68 | ⚠️（波兰语技术术语）|
| Author E-E-A-T Audit | 83 | ⚠️ |
| Weak CTA Detection | 100 | ✅（修复后）|
| Heading Hierarchy | 100 | ✅ |
| URL Quality | 100 | ✅ |
| Schema Validation | 90 | ✅ |
| Factory Data Canonical | N/A | （半固态新技术，canonical 未收录）|
| Static HTML Quality | 100 | ✅ |
| Anti-Pattern Detection | 100 | ✅ |

---

## 🔧 本次修复：auditor 添加 PL 支持（系统修复）

PL 站是 8/12 上线的新站，`b2b_i18n_keywords.py` 的 `SUPPORTED_LANGS` 缺 `pl`，导致 PL 篇被 fallback 到英文检测 → TLDR 0 分 + CTA 20 分（误报）。

**修复内容**（9 处 registry 添加 PL）：
- `SUPPORTED_LANGS` 加 `pl`
- `detect_language` canonical 前缀 + `_LANG_FUNCTION_WORDS`（波兰语功能词）
- `I18N_TLDR_KEYWORDS`：`Kluczowe Wnioski`、`W skrócie` 等
- `I18N_B2B_SIGNAL_WORDS`：`producent`、`fabryka`、`dostawca`、`importer` 等
- `I18N_CTA_POSITIVE_PATTERNS`：`Zapytaj o Wycenę`、`Zobacz Katalog` 等
- `I18N_B2B_BUYER_LANGUAGE`、`I18N_CROSS_REF_ANCHORS`、`I18N_CONCLUSION_SIGNALS`

**结果**：82.6 → 93.8 分（TLDR 0→100，CTA 20→100）。此修复一劳永逸，未来所有 PL 文章受益。

---

## Information Gain: 61/100 — MODERATE

| 维度 | 分数 |
|---|---|
| Technical Anchors | 11（仅 4 个，目标 ≥10）|
| Data Points | 100（161 个）|
| Named Entities | 100（23 个，含 Rozporządzenie UE 2023/1542 等波兰语实体）|
| B2B Vocabulary | 70（7 类）|

**Technical Anchors 低的原因**: 波兰语术语（elektrolit żel-polimer, gęstość, ucieczka termiczna）不被英文 auditor 术语库识别。这是非英语文章的系统性现象。

---

## 与 FR/RU 对比

| 指标 | FR | RU | PL |
|---|---|---|---|
| B2B 审计 | 93.9 | 95.9 | 93.8 |
| Information Gain | 57 | 61 | 61 |
| Named Entities | 90 | 100 | 100 |

---

## 结论

**93.8 分 Excellent，可发布。** 核心质量门（数据密度、表格、Schema、Anti-Pattern）全部满分。Opening Density 60 是 auditor `_skip_to_body_start` 的细微行为（Hook 位置），非内容缺陷。
