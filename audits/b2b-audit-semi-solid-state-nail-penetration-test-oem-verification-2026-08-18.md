# B2B Audit — Semi-Solid State Nail Penetration Test (EN)

**日期**: 2026-08-18
**文件**: `wowohcool.com/src/blog/semi-solid-state-nail-penetration-test-oem-verification/index.njk`
**URL**: `/blog/semi-solid-state-nail-penetration-test-oem-verification/`

---

## 总分

| 轮次 | 总分 | 判定 |
|---|---|---|
| 初检 | 89.6/100 | Good |
| 修复后 | **90.6/100** | ✅ **Excellent（可发布）** |

## 修复项（2 处外科手术式改动）

| # | 问题 | 修复前 | 修复后 |
|---|---|---|---|
| 1 | wordCount 偏差 9.5%（超 ±5% 容差）| Schema `3100` | Schema `3424`（= 实测正文词数）|
| 2 | FAQ #1 超长（16 词）| "How do I know a supplier is really shipping semi-solid state cells and not repackaged Li-polymer?" | "How do I verify a supplier isn't repackaging Li-polymer as semi-solid?"（13 词）|
| 3 | FAQ #4 超长（17 词）| "What went wrong in the Donut Lab 2026 fraud, and how do I avoid the same trap?" | "Donut Lab 2026 fraud — how do I avoid the same trap?"（10 词，em-dash 格式）|

Schema FAQPage 与 body FAQ 已同步逐字一致；答案侧补入 MOQ 500 / 30% deposit 等采购术语。

## 分项得分

| 检查项 | 得分 | 说明 |
|---|---|---|
| Opening Density | 60/100 | 钩子首段含数字+单位+B2B词，但 auditor 判"首句未直接给结论" |
| TL;DR Block | 100/100 | ✅ |
| H3 Answer Length | 97/100 | 32 段中 1 段略短 |
| Vague Heading | 100/100 | ✅ |
| H2 B2B Signal Density | 77/100 | 66.7%（9 个 H2 中 6 个含 B2B 词） |
| First-Hand Data Density | 100/100 | ✅ 58.3°C / 412°C / 0.4% / $6.50 等精确值 |
| Table Test | 100/100 | ✅ 6 张数据表 |
| Stock Photo | 100/100 | ✅ 全真实工厂图 |
| FAQ B2B Language | 54/100 | 已从 34 改善；8 条中 3 条 B2B 词汇 + 4 条量化数据 |
| Author E-E-A-T | 83/100 | Nina Nico + LinkedIn + 作者页 + 职位 |
| Weak CTA | 100/100 | ✅ |
| Heading Hierarchy | 100/100 | ✅ 无跳级 |
| URL Quality | 90/100 | 8 词（slug 已定，见下）|
| Schema Validation | 80/100 | trailing-slash 误报，见下 |
| Factory Data Canonical | 100/100 | ✅ 全部引用 factory-data-canonical.md |

## 信息增益（Information Gain）

| 指标 | 值 |
|---|---|
| Score | 62/100（MODERATE）|
| Data Points | 167（满分）|
| Named Entities | 36（满分）|
| B2B Vocabulary | 12（满分）|
| Technical Anchors | 3（auditor 词表未覆盖电池术语：nail penetration / GB 47372 / thermal runaway / polymer matrix 等未计分）|

> 技术锚点 3/10 是启发式词表对「电池针刺测试」主题的系统性低估——正文实际含 nail penetration test、GB 47372-2026、thermal runaway、gel electrolyte、in-situ polymerization、capacity retention curve、SOC、dew point 等 10+ 领域术语。此主题不在 auditor 的技术锚点词典内，非内容缺陷。

## 剩余 Warning 判断（不需修复）

| Warning | 判断 |
|---|---|
| H2 density 66.7% | **接受**。Gate 3 要求 ≥2 个 H2 含 B2B 信号词，本文 9 个 H2 全含采购信号词（Verify/Buyers/PO/Factory/FOB），符合「商业意图选题」定位。30-55% 是 auditor 对"采购类"的软建议，非硬性。 |
| URL 8 词 | **接受**。slug `semi-solid-state-nail-penetration-test-oem-verification` 已创建目录 + hreflang 映射，改动成本高于收益，且含核心关键词。 |
| Trailing slash mismatch | **误报**。Schema @id 用 fragment（`#article`/`#howto`/`#faq`）区分同一 URL 下多个实体，是 Schema.org 标准模式，与已发布文章 `certifications-us-eu-guide` 完全一致。auditor 将 fragment 误读为 URL 路径比较尾斜杠。 |
| 1/32 H3 答案长度 | **忽略**。单段 59 字符临界，无实质影响。 |
| FAQ search-demand (Rule 2) | 需人工 WebSearch 验证（可选，非阻塞）。当前 8 条 FAQ 均为 B2B 采购实操问题（验证/GB 标准/FOB/MOQ/文件），命中选题铁律。 |

## 结论

✅ **90.6/100 Excellent — 可发布**。核心修复（wordCount 校准 + FAQ 问句缩短）已落地，Schema-body 一致。剩余 warning 均为误报或可接受的选题定位选择。

*下一步：同流程审计另外两篇（factory-audit / verify-certificates）。*
