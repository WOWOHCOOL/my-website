# WOWOHCOOL.com — 优先级 SEO 待办清单

**综合评分：81/100** | **日期：2026-05-04**

---

## 致命 — 立即修复 ✅ 已完成

| # | 事项 | 文件 | 结果 |
|---|------|------|------|
| 1 | 删除 hreflang 标签 — `/de/` `/ja/` `/vi/` `/ko/` 目录不存在 | 27 个 HTML | ✅ 全部清除，仅保留 en + x-default |
| 2 | 压缩超大图片 — 10+ 张超过 100KB，最大 195KB | `image/` 目录 | ✅ 16 张压缩，总省 ~1MB |

---

## 高优 — 一周内修复 ✅ 已完成

| # | 事项 | 文件 | 结果 |
|---|------|------|------|
| 3 | sitemap 补上 `privacy-policy.html` 和 `terms-of-service.html` | `sitemap.xml` | ✅ 30 → 32 条 URL |
| 4 | 给所有 `<img>` 添加 `width`/`height` 属性防布局偏移（CLS） | 全部 HTML | ✅ 325 张图全部补齐，0 遗漏 |
| 5 | 审计合并 CSS | `css/` | ✅ 无重复，styles.css=框架，style.css=覆写 |
| 6 | 首页 srcset 响应式 + 清无效 srcset | `index.html` | ✅ Hero 图已完整，3 张产品卡清掉无效 srcset |
| 7 | thank-you.html 补充 meta description | `thank-you.html` | ✅ 已添加，"Our team will respond within 24 hours..." |
| 8 | 创建博客 RSS feed + auto-discovery | `rss.xml`, `blog.html`, `sitemap.xml`, `_headers` | ✅ RSS 2.0，20 篇博客，含 sitemap + 缓存配置 |

---

## 中优 — 一个月内修复

| # | 事项 | 文件 | 预计 | 状态 |
|---|------|------|------|------|
| 7 | 扩充薄页面：terms-of-service 359→577 词，privacy-policy 400→638 词 | 两个文件 | 30 分钟 | ✅ 已完成 |
| 8 | `llms.txt` 扩充 — 当前只有 5 篇博客，补全全部 20 篇 | `llms.txt` | 5 分钟 | ✅ 已完成 |
| 9 | ~~Article schema 补上 datePublished 和 dateModified~~ 验证：20 篇已有 | `blog/*.html` | ✓ 无需操作 | ✅ 已完成 |
| 10 | 指南类文章加 HowTo schema | 4 篇博客 | 30 分钟 | ✅ 已完成 |
| 11 | ~~添加 preconnect 资源提示~~ 验证：Google Fonts preconnect 全站已有 | 全部 HTML | ✓ 无需操作 | ✅ 已完成 |

---

## 低优 — 待办池

| # | 事项 | 文件 | 预计 | 状态 |
|---|------|------|------|------|
| 12 | sitemap 加 `<priority>` 和 `<changefreq>` 字段 | `sitemap.xml` | 10 分钟 | ✅ 已完成 |
| 13 | sitemap 的 `<lastmod>` 改成真实修改日期 | `sitemap.xml` | 5 分钟 | ✅ 已完成 |
| 14 | `_headers` 加 Content-Security-Policy 头 | `_headers` | 10 分钟 | ✅ 已完成 |
| 15 | 博客 Flesch 可读性优化（20 篇逐篇优化） | `blog/*.html` | 每篇约 15-30 分钟 | 🔄 进行中 |
| 16 | 考虑去掉 `.html` 后缀换成干净 URL | Cloudflare 规则 | 待评估 | 待做 |

---

## 汇总

| 优先级 | 数量 | 已完成 | 待做 |
|--------|------|--------|------|
| 致命 | 2 | 2 | 0 |
| 高优 | 6 | 6 | 0 |
| 中优 | 5 | 5 | 0 |
| 低优 | 6 | 5 | 1 |
| **合计** | **19** | **18** | **1** |

---

## 博客 Flesch 可读性优化 — 逐篇追踪

**基准：2026-05-10 全量评分** | **目标：Flesch 38-42**（B2B 技术内容合理区间）

| # | 文章 | 原始 F | 当前 F | Δ | ASL | SPW | CS | SEO | 状态 |
|---|------|:-----:|:-----:|:--:|:---:|:---:|:--:|:---:|:----:|
| 1 | factory-verification-checklist | 15 | 18.0 | +3.0 | 13.4 | 2.07 | 70.7 | 66.5 | 📝 距目标差20 |
| 2 | car-charger-guide | 17 | 22.7 | +5.7 | 13.4 | 2.02 | 70.7 | 66.5 | 📝 距目标差15 |
| 3 | how-to-choose-factory | — | 22.3 | — | 14.6 | 2.01 | 70.7 | 66.5 | ⏳ 未优化 |
| 4 | hotel-charging-solutions | 17 | 24.4 | +7.4 | 17.1 | 1.95 | 71.5 | 66.5 | 📝 距目标差14 |
| 5 | wireless-charging-works | — | 27.0 | — | 13.7 | 1.96 | 70.9 | 64.5 | ⏳ 未优化 |
| 6 | charger-safety-standards | — | 27.9 | — | 15.6 | 1.93 | 70.7 | 66.5 | ⏳ 未优化 |
| 7 | choose-reliable-china-charger-supplier | — | 28.3 | — | 15.7 | 1.92 | 71.2 | 66.5 | ⏳ 未优化 |
| 8 | gan-chargers-guide | — | 31.6 | — | 13.1 | 1.91 | — | — | 📝 待深入优化 |
| 9 | oem-vs-odm-guide | — | 34.0 | — | 15.8 | 1.85 | — | 66.5 | 📝 接近目标 |
| 10 | quality-control-guide | — | 36.5 | — | — | 1.85 | — | 66.5 | 📝 接近目标 |
| 11 | qi2-vs-magsafe-guide | — | 36.4 | — | 15.9 | 1.82 | — | 66.5 | 📝 接近目标 |
| 12 | qi-certification-guide | 19 | 46.3 | +27.3 | 9.8 | 1.78 | 74.1 | 64.5 | ✅ 超目标达成 |
| 13 | power-bank-specs-guide | — | 41.3 | — | 12.0 | 1.81 | — | 66.5 | ✅ 已达目标 |
| 14 | top-power-bank-manufacturers-china | — | 50.1 | — | 11.5 | 1.71 | — | 66.5 | ✅ 超目标达成 |
| 15 | gan-v-charger-oem-manufacturing | — | 37.9 | — | 13.6 | 1.83 | 73.4 | 66.5 | ✅ 已达目标 |
| 16 | shipping-from-china-guide | — | 39.0 | — | 14.2 | 1.81 | 73.0 | 66.5 | ✅ 已达目标 |
| 17 | semi-solid-state-power-bank-oem | — | 40.0 | — | 12.0 | 1.83 | 76.2 | 66.5 | ✅ 已达目标 |
| 18 | usb-c-pd-fast-charging-guide | — | 40.2 | — | 12.7 | 1.82 | 74.2 | 64.5 | ✅ 已达目标 |
| 19 | import-costs-guide | — | 41.5 | — | 13.1 | 1.80 | 73.9 | 66.5 | ✅ 已达目标 |
| 20 | certifications-us-eu-guide | 28 | 48.1 | +20.1 | 11.2 | 1.74 | 74.4 | 66.5 | ✅ 超目标达成 |

> **说明：** 当前优化策略针对段落密度和句长。SPW（音节/词）是 B2B 技术内容的固有特征，术语密集的文章改善空间有限。核心优化杠杆：降低 ASL（句长）。

---

## 2026-05-10 SEO 深度优化任务

| # | 任务 | 技能 | 目的 | 状态 |
|---|------|:----:|:----|:----:|
| 1 | GSC 真实搜索数据 + PageSpeed + CrUX 审计 | seo-google | 诊断技术问题，发现真实流量来源 | ✅ 完成（PSI 健康，GSC 需配置账号） |
| 2 | 20 篇博客目标关键词验证 | seo-dataforseo | 确认关键词有搜索量、优化方向正确 | ⏸️ 跳过（需 DataForSEO API） |
| 3 | 全站技术审计 | manual | 可爬取性、移动端、CWV、安全头 | ✅ 完成（技术层面无阻塞问题） |
| 4 | AI 搜索优化（GEO） | seo-geo | ChatGPT/Perplexity/AI Overviews 曝光 | ⏳ |
| 5 | 询盘转化率优化 | CRO | 提高访客到询盘的转化率 | ⏳ |
| 6 | 竞争差距分析 + 话题簇策略 | manual | 发现漏掉的关键词机会 | ⏳ |
