# 英文站 SEO/GEO 代码优化待办

**日期**: 2026-05-19
**站点**: https://www.wowohcool.com/
**优先级**: P0 > P1 > P2

---

## P0 — 高优先级

### 1. robots.txt 显式允许 AI 爬虫
显式声明 GPTBot、ClaudeBot、PerplexityBot、Google-Extended 允许抓取。
文件: `C:\Users\wowoh\wowohcool.com\robots.txt`
**状态**: ✅ 已完成

### 2. 修复外部链接安全性（L2）
全站 `target="_blank"` 补加 `rel="noopener noreferrer"`。
范围: 21 篇 blog HTML + 页面
**状态**: ✅ 已完成（blog 全部已有，about.html + index.html 共 4 处修复）

### 3. sitemap lastmod 更新
所有文章 `<lastmod>` 从 2026-05-04 更新为 2026-05-19。
文件: `C:\Users\wowoh\wowohcool.com\sitemap.xml`
**状态**: ✅ 已完成（21 篇 blog 全部更新）

## P1 — 中优先级

### 4. Blog index 页面增强（L3）
添加"所有文章"完整列表，方便用户浏览和 AI 爬虫索引。
同时移除重复的分类板块（Manufacturing Essentials、Technology & Innovation、Product Guides & Compliance、Compliance Shipping & More）。
文件: `C:\Users\wowoh\wowohcool.com\blog\index.html`
**状态**: ✅ 已完成

### 5. JSON-LD 合并优化
多个独立 `<script type="application/ld+json">` 合并为单个 `@graph` 结构。
范围: 20 篇 blog（含 FAQ/HowTo Schema）
**状态**: ✅ 已完成（全部合并为 1 个 block，无重复）

### 6. BlogPosting Schema 补充字段
加入 `wordCount`、`timeRequired`、`image`、`description` 字段。
范围: 21 篇 blog
**状态**: ✅ 已完成（全部文章均已补充）

## P2 — 低优先级

### 7. Keywords meta tag 统一（L1）
统一策略：全加或全删。Google 已废弃此标签做排名信号。
**状态**: ⏳ 待处理（推荐全删）

### 8. CSS minify
压缩 `styles.css` 减少加载时间。
**状态**: ❌ 不需要 — 已是 Tailwind CSS 单行构建输出（64KB），已压缩 + tree-shaken

---

## 汇总

| # | 项目 | 优先级 | 状态 |
|:-:|------|:------:|:----:|
| 1 | robots.txt AI 爬虫 | P0 | ✅ |
| 2 | rel="noopener" 修复 | P0 | ✅ |
| 3 | sitemap lastmod | P0 | ✅ |
| 4 | Blog index 增强 | P1 | ✅ |
| 5 | JSON-LD 合并 | P1 | ✅ |
| 6 | Schema 补充字段 | P1 | ✅ |
| 7 | Keywords meta tag | P2 | ⏳ |
| 8 | CSS minify | P2 | ❌ 不需要 |
