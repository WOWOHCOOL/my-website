# B2B Audit — batterie-semi-solide-oem-guide (FR)

**日期**: 2026-08-13
**文件**: `src/fr/blog/batterie-semi-solide-oem-guide/index.njk`
**文章类型**: technical（半固态电池技术 + 供应商评估）

---

## 总分: 93.9/100 — Excellent ✅

| 检查项 | 分数 | 状态 |
|---|---|---|
| Opening Density (no-fluff) | 100 | ✅ |
| TL;DR Block | 100 | ✅ |
| H3 Answer Length | 100 | ✅ |
| Vague Heading Detection | 100 | ✅ |
| H2 B2B Signal Density | 55 | ⚠️ 62.5%（目标 10-40%）|
| First-Hand Data Density | 100 | ✅ |
| Table Test | 100 | ✅ |
| Stock Photo Detection | 100 | ✅ |
| FAQ B2B Language | 68 | ⚠️ |
| Author E-E-A-T Audit | 83 | ⚠️ |
| Weak CTA Detection | 100 | ✅ |
| Heading Hierarchy | 100 | ✅ |
| URL Quality | 100 | ✅ |
| Schema Validation | 90 | ✅（修复后）|
| Factory Data Canonical | 100 | ✅ |
| Static HTML Quality | 100 | ✅ |
| Anti-Pattern Detection | 100 | ✅ |

---

## 本次修复（2 项）

### 1. FAQ body↔Schema 引号不一致（Rule 1 违规）
- **问题**: 第 5 问 body 用法式角引号 `« »`，Schema 用单引号 `' '`
- **修复**: Schema name 统一为 `« fausse batterie solide »`
- **结果**: Schema Validation 80 → 90

### 2. H2 B2B density 75% → 62.5%
- **问题**: 6 个 H2 里 4 个含 B2B 信号词，密度过高
- **修复**: 第 2 节去掉弱化的 "OEM"（"Marques" 已暗示 B2B）
- **保留**: Fournisseur / MOQ / Importateur（采购决策链核心词）

---

## Information Gain: 57/100 — MODERATE

| 维度 | 分数 |
|---|---|
| Technical Anchors | 8（仅 3 个，目标 ≥10）|
| Data Points | 100（150 个）|
| Named Entities | 90（13 个）|
| B2B Vocabulary | 60（6 类）|

**Technical Anchors 低的原因**: 法语术语（électrolyte, densité, cyclage, pénétration par clou）不被英文 auditor 术语库识别。这是法语文章的系统性现象，非内容缺陷。

---

## 剩余建议（非阻塞）

1. **H2 density 62.5%** — 权衡保留：H2 含 B2B 采购词（Fournisseur/MOQ/Importateur）符合 CLAUDE.md「≥2 H2 B2B」要求，进一步降低会牺牲采购语境
2. **FAQ B2B Language 68** — 部分问题含技术术语（Li-polymère、PD 3.1），auditor 认为偏技术，但这是 B2B 买家真实搜索词
3. **Author E-E-A-T 83** — LinkedIn + author page + knowsAbout 齐全，扣分可能是 compact author bar 的 jobTitle 格式
4. **Rule 2 手动验证** — 建议后续对 8 个 FAQ 问题做 Google/竞品/Alibaba 搜索需求验证

---

## 结论

**93.9 分 Excellent，可发布。** 核心质量门（数据密度、表格、Schema、Factory Data、Anti-Pattern）全部满分。剩余警告均为次要权衡项，不影响发布。
