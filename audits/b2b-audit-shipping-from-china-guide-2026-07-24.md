# B2B Content Audit Report: shipping-from-china-guide

**审计日期**: 2026-07-24
**URL**: https://www.wowohcool.com/blog/shipping-from-china-guide/
**类型**: `procurement` (中国发货/物流指南)
**作者**: Snowy May

---

## 综合评分

| 维度 | 分数 | 等级 |
|------|:----:|------|
| **B2B 内容质量** | **90.9/100** | ⚠️ Good (10 篇最低) |
| **信息增益** | **50/100** | ⚠️ MODERATE |

---

## wordCount

| 来源 | 词数 | 状态 |
|------|:----:|:----:|
| Verified | 4,272 | — |
| Schema | 4,000 | ⚠️ 6.4% → **4,300** |

---

## 三个严重问题

### 🔴 Schema JSON 语法错误 (line 136)

```json
    ]         ← FAQPage 结束
  },
  {
 },            ← ❌ 空对象！破坏 JSON 结构
 {
 "@type": "Question",
 "name": "What are the dangerous goods rules..."  ← FAQ #7-8 在 FAQPage 外部
```

> **修复**: 删除 `{ },` + 将 FAQ #7, #8 移入 FAQPage mainEntity 数组

### 🔴 Author E-E-A-T 33/100

| 检查项 | 状态 |
|--------|:--:|
| Named author (Schema) | ✅ |
| Credentials in compact bar | ❌ 仅显示 "Snowy May"，无职位/年限 |
| LinkedIn URL (Schema) | ✅ |
| Author page link | ❌ |
| Topic expertise (Schema) | ✅ knowsAbout 5 项 |
| Compact author bar | ❌ 无 credential |

> Schema 有完整 Person 但 body 的 compact bar 无任何 credential 文本。修复: 加 `Market Manager · 10+ years in China Logistics & Shipping`

### 🟡 FAQ 大量第一人称

| FAQ | 问题 |
|-----|------|
| #2 | "which Incoterm should **I** use" |
| #3 | "How do **I** calculate" |
| #4 | "What documents do **I** need" |
| #6 | "How do **I** choose" |
| #8 | "How do **I** plan" |

> 8 个 FAQ 中 5 个用 `I` — 审计工具判定 1/8 consumer language。`I → OEM buyers / importers`

---

## 误报

| 标记 | 原因 |
|------|------|
| "35" lead time | 海运 "35 days" → 不是 OEM 生产 lead time |

---

## 排名 (10 篇)

```
what-is-gan-charger            96.7
oem-vs-odm-guide              96.6
usb-c-pd-fast-charging-guide  96.6
quality-control-guide         96.4
import-costs-guide            96.1
gan-chargers-guide            95.4
power-bank-specs-guide        95.1
usb-c-pd-3-1-explained        91.5
shipping-from-china-guide     90.9 ←
wireless-charging-works       89.3
```

**发布建议**: ❌ 需修复 JSON 语法错误 + Author E-E-A-T + FAQ 第一人称后再发布。
