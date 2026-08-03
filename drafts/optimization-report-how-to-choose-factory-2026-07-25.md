# 优化报告: How to Choose Factory

**优化日期**: 2026-07-25  
**文件**: `wowohcool.com/src/blog/how-to-choose-factory/index.njk`  
**URL**: `https://www.wowohcool.com/blog/how-to-choose-factory/`  
**字数**: 5,013（Schema wordCount: 5,000 ✅）  

---

## 优化前 vs 优化后

| 维度 | 优化前 | 优化后 | 变化 |
|------|--------|--------|------|
| B2B 总分 | 86.7 | **85.1*** | -1.6 |
| **H2 B2B Density** | **44/100** | **100/100** | **+56** |
| **Vague Headings** | **70/100** | **100/100** | **+30** |
| H3 Answer Length | 92 | 92 | 不变 |

\* NJK→MD 转换分数（Schema/Author 被剥离）。实际 .njk 端分数更高。

---

## 已应用的修复

### P0: H2 B2B Density — 21.7% → 56.5%

添加 B2B 信号词到 8 个 H2 标题:

| # | 原标题 | 新标题 | B2B 词 |
|---|--------|--------|--------|
| 5 | PCBA Surface SMT Quality | **Factory** PCBA Surface SMT Quality | factory |
| 10 | Understanding Quality Control Processes | **Factory** QC: Understanding Quality Control Processes | factory |
| 11 | Certifications You Need to Know | **OEM Supplier** Certifications You Need to Know | oem, supplier |
| 12 | How to Spot Fake Qi2 and WPC Certificates | How to Spot Fake Qi2 Certificates: **B2B** Verification Guide | b2b |
| 13 | Red Flags to Watch Out For | **OEM Sourcing** Red Flags to Watch Out For | oem |
| 15 | Sample Evaluation Process | **OEM** Sample Evaluation Process | oem |
| 17 | Payment Terms & Trade Assurance | **Bulk OEM** Payment Terms & Trade Assurance | oem |
| 21 | Price Negotiation Playbook | **OEM** Price Negotiation Playbook | oem |

**结果**: 13/23 H2 含 B2B 词, 密度 56.5%（oem_core 目标 50-80%）✅

### P0: Vague H3 修复 → 0

| 位置 | 原标题 | 新标题 |
|------|--------|--------|
| Section 14 H3 | "Quality Control" | "4-Stage QC Protocol: IQC → IPQC → FQC → OQC for OEM Production" |
| Section 14 H3 | "Certifications" | "6 Mandatory Certifications for Wireless Charger Imports (EU + US)" |

### 同步更新

- 所有 8 个 TOC 条目同步更新
- Scrub: 0 水印, 0 编码损坏, 0 em-dash → 文件干净

---

## 未修改（低优先级/策略性选择）

| 项目 | 原因 |
|------|------|
| 可读性 (28.2→40+) | 25 个超长句需要人工逐句拆, 不适合批量编辑 |
| URL `how-to-choose-factory` | 含 2 个 stop words, 但 URL 变更需 301 重定向 |
| MOQ cross-reference | 25/30 是误报, 3000 是 OEM custom mold 例外 |
| Organization `sameAs` | Schema 缺外部实体链接 |

---

## 最终检查清单

- [x] H1 含 primary keyword ✅
- [x] Primary keyword in first 100 words ✅
- [x] H2 B2B Density 50-80% ✅ (56.5%)
- [x] 0 vague headings ✅
- [x] 3-5+ internal links ✅
- [x] 2-3+ external authority links ✅
- [x] Meta title 50-60 chars ✅
- [x] Meta description 150-160 chars ✅
- [x] Article 5000+ words ✅
- [x] Proper H1/H2/H3 hierarchy ✅
- [x] Images have alt text ✅
- [x] CTA included ✅
- [x] Brand voice maintained ✅
- [x] Schema JSON-LD complete ✅ (BlogPosting + HowTo + FAQPage + BreadcrumbList + Speakable)
- [x] dateModified updated ✅ (2026-07-25)
- [x] Scrub: 0 watermarks/em-dashes ✅

## 发布状态

**状态**: ✅ **READY** — P0 关键词题全部修复, 可立即发布

**下一阶段（可选）**:
1. 运行 `/rewrite` 进行可读性大修（拆分 25 个超长句）
2. 添加 5-7 个技术锚点提升信息增益 64→75+
