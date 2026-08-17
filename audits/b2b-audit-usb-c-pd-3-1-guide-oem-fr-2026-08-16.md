# B2B Audit Report — USB-C PD 3.1 Guide OEM (FR)

**Date**: 2026-08-16
**File**: `C:\Users\wowoh\wowohcool.com\src\fr\blog\usb-c-pd-3-1-guide-oem\index.njk`
**Auteur**: Nina Nico
**Slug**: `usb-c-pd-3-1-guide-oem` (FR blog plan Phase 2 第 4 篇)

---

## 综合评分

| 指标 | 分数 | 等级 |
|------|:----:|------|
| **B2B Content Score** | **90.5 / 100** | ✅ Excellent（90-100） |
| **Information Gain** | **60 / 100** | 🟡 Moderate（40-69） |
| **Main Content Word Count** | ~3 080 词（Schema 设 3000，±2.8 % 容差内） | ✅ |

---

## 分项明细

| 检查 | 分数 | 状态 |
|------|:----:|------|
| Opening Density（无废话开头） | 100 | ✅ |
| TL;DR / POINTS CLÉS 区块 | 100 | ✅ |
| H3 Answer Length | 67 | ⚠️ 6/18 未达 60-500 字符（H3 后跟表格/列表，非段落） |
| Vague Heading Detection | 100 | ✅ |
| H2 B2B Signal Density | 47 | ⚠️ 66.7%（B2B 采购文，信号词为真实主题，非堆砌） |
| First-Hand Data Density | 100 | ✅ |
| Table Test | 100 | ✅ 技术参数均在表格 |
| Stock Photo Detection | 100 | ✅ 无 stock 图 |
| FAQ B2B Language | 77 | ⚠️ FAQ #2 16 词（瓦数档位枚举本身即价值） |
| Author E-E-A-T | 83 | ⚠️ 作者条完整度可再提高 |
| Weak CTA Detection | 100 | ✅ |
| Heading Hierarchy | 100 | ✅ H1→H2→H3 无跳级 |
| URL Quality | 90 | ⚠️ slug 为 FR 计划固定值（4 义素，审计按 7 词误算） |
| Schema Validation | 80 | ⚠️ @id 尾斜杠误报（#article/#howto/#faq 为合法 Schema.org 片段） |
| Factory Data Canonical | N/A | ✅ 所有工厂数据取自 factory-data-canonical.md |
| Accent/Spelling (i18n) | 94 | ⚠️ 3 处"缺重音"为误报（见下） |

---

## 关键问题处理

### ❌ 3 处"缺重音"（审计标记 CRITICAL）— 判定为误报

审计报 `specification→spécification(2)`、`cable→câble(1)`，逐行核查后确认为**英文专名/URL，非法语正文错误**：

| 位置 | 内容 | 判定 |
|------|------|------|
| Schema citation `"USB Power Delivery Specification"` | USB-IF 官方文档标题 | 英文专名，保留 |
| Schema citation `"USB Type-C Cable and Connector Specification"` | USB-IF 官方文档标题 | 英文专名，保留 |
| URL `usb-type-c-cable-and-connector-specification` | 外链 URL slug | 必须 ASCII，保留 |

法语正文全部重音正确（câble / spécification / conformité / efficacité 等）。**无需修改。**

### ✅ wordCount 修正（真实问题）

| 项 | 修正前 | 修正后 |
|----|:-----:|:-----:|
| Schema wordCount | 2600 | **3000** |

主内容实际 ~3 080 词（排除 SVG 路径、JSON-LD、模板代码后的纯正文），原 2600 偏差 15 %，已修正至 3000（±2.8 % 容差内）。

---

## 本轮修正动作汇总

1. ✅ **wordCount** 2600 → 3000（对齐实际主内容词数）
2. ✅ **补第 2 张内文图**：多输出电源 bank 采样 QC 图（GEO ≥2 内文图要求）
3. ✅ **补 GaN V 热性能数据段**：52,4 °C 壳温 / 0,3 % 退货率 / MTBF >15 000 h（强化 Information Gain 技术锚点）

---

## 遗留警告（非阻断，发布前可选优化）

| 警告 | 建议 | 优先级 |
|------|------|:-----:|
| H3 Answer Length 67 | H3 后补 60-500 字符直答（当前多用表格，仍可被 snippet 抓取） | 🟢 低 |
| H2 B2B 密度 66.7% | 保持现状——B2B 信号为真实主题词 | 🟢 低 |
| FAQ #2 16 词 | 保持——瓦数枚举是问题价值本身 | 🟢 低 |
| Author E-E-A-T 83 | 作者条已含 LinkedIn + 职位 + 简介 + 工厂足迹 | 🟢 低 |
| Information Gain 60 | 法语技术术语未被英文词典识别所致；已补 GaN V 热数据 | 🟡 中 |

---

## 结论

**90.5 / 100 — Excellent，可发布。** 无阻断性问题。所有 CRITICAL 标记均为误报（英文专名/URL），wordCount 已修正。

### 发布前清单（用户执行）
- [ ] `/scrub` — 清理 + 规范化
- [ ] 同步更新 EN/DE/ES 三篇的 frontmatter，补 `frPath` + `hreflang.fr`（当前三篇仅含 en/de/es）
- [ ] `git push` 部署到 Cloudflare Pages

---

*审计由 b2b_content_auditor.py + information_gain_analyzer.py + 人工 wordCount 验证生成，2026-08-16*
