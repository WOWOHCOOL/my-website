# Blog 标准排版规范 (v2.1)

**基于**: 28 篇 EN + 11 篇 DE 文章完整审计优化
**适用**: 所有 EN/DE 博客文章 (wowohcool.com/blog/ + /de/blog/)
**规则权威源**: 详细质量标准见 `context/b2b-blog-quality-audit-standard.md`

---

## 一、B2B 转化黄金逻辑顺序

```
建立信任(E-E-A-T) → 解答痛点(Content) → 消除顾虑(FAQ) → 促成转化(CTA) → 流量挽留(Related)
```

```
 1. Hero Header         面包屑→标签→H1→Compact Author Bar→日期行
 2. The Hook            引入段落（≤2 段，开门见山，直击采购痛点）
 3. Featured Image      封面图 2240×1260，srcset 三档响应式
 4. Key Takeaways       合并 TL;DR 的总结段，amber 卡片，3-5 条量化要点
 5. Key Metrics Cards   可选，数据指标
 6. Table of Contents   含 #faq 锚点
 7. H2 Sections × N     标准灰底卡片，嵌入式 Expert Insight + Factory Stat
 8. FAQ                 id="faq"，8 条规则，答案量化 ≥1 个数字
 9. Full Author Bio     id="author-bio"，含 Factory Footprint（4 项工厂硬数据）
10. CTA                 渐变背景，2 按钮：主 CTA + OEM/ODM Service
11. Related Articles    id="related-articles"
12. Sources & References 权威引用来源
13. Global CTA          页面级 blog-cta.njk
```

---

## 二、各板块代码标准

### 1. Hero Header

```html
<article class="py-12">
<div class="relative pt-24 md:pt-28 pb-12 lg:pt-28 lg:pb-16 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
  <div class="absolute top-0 left-1/4 w-64 h-64 bg-brandOrange/10 rounded-full blur-3xl"></div>
  <div class="absolute bottom-0 right-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>
  <div class="max-w-4xl mx-auto px-6 relative z-10">
    <!-- 面包屑 -->
    <nav class="text-sm text-slate-500 mb-6">
      <a href="/" class="hover:text-brandOrange">Home</a> /
      <a href="/blog/" class="hover:text-brandOrange">Blog</a> /
      <span class="text-slate-900">Article Name</span>
    </nav>
    <!-- 标签 -->
    <div class="flex flex-wrap gap-2 mb-6">
      <span class="px-3 py-1 bg-brandOrange/10 text-brandOrange text-[11px] font-black rounded-full uppercase">Tag</span>
    </div>
    <!-- H1 -->
    <h1 class="text-3xl lg:text-5xl font-black text-brandBlue uppercase italic tracking-tighter mb-4 leading-tight">Title</h1>
    <!-- Compact Author Bar -->
    <div class="flex items-center gap-3 mb-6">
      <img src="/image/factory/team-author.webp" alt="Author at WOWOHCOOL" loading="lazy" width="40" height="40" class="w-10 h-10 rounded-full object-cover border border-brandOrange">
      <div>
        <a href="#author-bio" class="font-bold text-slate-900 text-sm hover:text-brandOrange transition">Author Name</a>
        <p class="text-xs text-slate-500">Title · 10+ years in Specialty</p>
      </div>
    </div>
    <!-- 日期行 — <time datetime> 统一 ISO 8601，展示格式按语言 -->
    <!-- ⚠️ EN → Mon DD, YYYY | DE → DD.MM.YYYY | ES → DD de Mon de YYYY | FR → DD Mon YYYY -->
    <!-- <time datetime="YYYY-MM-DD"> 的 ISO 值在所有语言中保持统一，只有展示文本变化 -->
    <div class="flex flex-wrap items-center gap-6 text-sm text-slate-500 pb-8 border-b border-slate-200">
      <span><time datetime="YYYY-MM-DD">Mon DD, YYYY</time></span>
      <span>N min read</span>
      <span>Author Name</span>
    </div>
  </div>
</div>
```

| 元素 | 关键类名 |
|------|---------|
| `<article>` | `py-12` |
| H1 | `text-3xl lg:text-5xl font-black text-brandBlue uppercase italic tracking-tighter leading-tight` |
| Compact Author | `w-10 h-10 rounded-full border-brandOrange`, 链接到 `#author-bio` |

### 2. The Hook

```html
<div class="max-w-4xl mx-auto px-6 mb-8">
  <div class="bg-brandBlue/5 border-l-4 border-brandOrange p-6 rounded-r-xl mb-8" data-speakable>
    <p class="text-lg text-slate-700 italic">引人入胜的痛点段落</p>
    <p class="text-slate-600 leading-relaxed mt-4">扩展数据段落</p>
  </div>
</div>
```

注意: Hook div 必须加 `data-speakable` 属性（或 `.speakable` class 作为回退）。这是 3 个 speakable 锚点中的第 1 个：Hook（痛点）→ Key Takeaways TL;DR（结论）→ FAQ 核心答案（决策）。超过 3 个会导致 AI 引擎抓取焦点分散。

### 3. Featured Image

```html
<div class="max-w-4xl mx-auto px-6 mb-16">
  <img src="/image/blog/cover-en/article-slug.webp"
       srcset="/image/blog/cover-en/article-slug-800.webp 800w,
               /image/blog/cover-en/article-slug-1200.webp 1200w,
               /image/blog/cover-en/article-slug.webp 2240w"
       sizes="(max-width: 768px) 100vw, 896px"
       alt="B2B keyword alt text"
       width="2240" height="1260" loading="eager" decoding="async"
       class="w-full rounded-3xl shadow-xl" fetchpriority="high">
</div>
```

⚠️ `srcset` + `sizes` 防止移动端加载 2240px 原图导致 LCP 延迟。需生成 800w/1200w/2240w 三档 WebP。

### 4. Key Takeaways（已合并 TL;DR）

```html
<div class="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-6 mb-8">
  <p class="text-[11px] font-black text-brandOrange uppercase tracking-widest mb-2">KEY TAKEAWAYS</p>
  <p class="text-slate-700 leading-relaxed text-sm mb-4" data-speakable>TL;DR 总结段 — 2-3 句概括全文核心结论</p>
  <ul class="text-sm text-slate-700 space-y-2 list-disc pl-5">
    <li><strong>要点标题:</strong> 数据描述</li>
  </ul>
</div>
```

⚠️ **不再使用独立的 TL;DR 区块**。speakable 锚点严格限制为 **3 个**：Hook 段落、KERNERKENNTNISSE TL;DR 句、FAQ 区最核心的一个答案段落。`<ul>` 列表和 Expert Insight 的 `<blockquote>` **不加** speakable——超过 3 个节点会导致 AI 抓取权重稀释。详见 `b2b-blog-quality-audit-standard.md` §III.3。

### 5. Table of Contents

```html
<div class="bg-brandBlue rounded-2xl p-8 text-white mb-12">
  <h2 class="text-lg font-black uppercase italic mb-6">Table of Contents</h2>
  <nav class="text-sm space-y-2">
    <a href="#section-id" class="block hover:text-brandOrange transition">1. Section Title</a>
    <a href="#faq" class="block hover:text-brandOrange transition">N. Frequently Asked Questions</a>
  </nav>
</div>
```

⚠️ **TOC 必须包含 `#faq` 链接**。

### 6. H2 Section（标准正文分段）

```html
<section id="section-id" class="mb-16">
  <div class="bg-slate-50 rounded-xl p-6 border border-slate-200 shadow-sm">
    <h2 class="text-2xl font-black text-brandBlue uppercase italic mb-6">N. Section Title</h2>
    <p class="text-slate-600 leading-relaxed mb-6">段落</p>
    <!-- 子内容、表格、图片、Expert Insight -->
  </div>
</section>
```

| 元素 | 类名 |
|------|------|
| Section | `id="kebab-case"` |
| H2 | `text-2xl font-black text-brandBlue uppercase italic mb-6` |
| H3 | `font-black text-brandBlue uppercase mb-3` |
| 正文 | `text-slate-600 leading-relaxed mb-6` |
| 正文图片 | `max-w-3xl mx-auto rounded-2xl shadow-lg` |

### 7. Expert Insight（嵌入正文，非末尾独立）

```html
<!-- Expert Insight — embedded in [context] -->
<div class="bg-brandBlue/5 border-l-4 border-brandOrange rounded-r-xl p-6 mt-6">
  <p class="text-[11px] font-black text-brandOrange uppercase tracking-widest mb-2">EXPERT INSIGHT</p>
  <blockquote class="text-slate-700 text-base italic leading-relaxed">"专家引用内容，直接针对上文讨论的技术或采购话题"</blockquote>
  <p class="text-sm text-slate-500 mt-2">, Author Name, Title at WOWOHCOOL</p>
</div>
```

⚠️ **嵌入在相关正文段落内（H2 Section 中）**，不要放在文章末尾。

### 8. FAQ（8 条规则强制）

```html
<!-- FAQ -->
<section id="faq" class="mb-16">
  <div class="bg-slate-50 rounded-2xl p-8 border border-slate-200 shadow-sm">
    <h2 class="text-2xl font-black text-brandBlue uppercase italic mb-8 text-center">Frequently Asked Questions</h2>
    <div class="space-y-6 max-w-3xl mx-auto">
      <div class="bg-white rounded-xl p-6">
        <h3 class="font-black text-brandBlue mb-2">Question?</h3>
        <p class="text-slate-600 text-sm">Answer with ≥1 specific number.</p>
      </div>
    </div>
  </div>
</section>
```

#### FAQ 8 规则

| # | 规则 | 验证方法 |
|---|------|---------|
| 1 | **Body-Schema 一致** | 正文 FAQ = JSON-LD FAQPage 逐字相同 |
| 2 | **真实市场数据** | 问题来自 B2B 买家真实搜索（如 Alibaba/PAA），非捏造 |
| 3 | **内容锚定** | 每个答案可追溯到正文具体段落 |
| 4 | **GEO 优化** | 自包含 Q&A，AI 可直接提取引用 |
| 5 | **决策链排序** | 规格→认证→定价→采购流程 |
| 6 | **量化答案** | 每条答案含 ≥1 个具体数字 |
| 7 | **末题 = CTA 桥梁** | 最后一题自然过渡到买家行动（含联系链接） |
| 8 | **交叉一致性** | FAQ 数据与 TL;DR、正文三方一致 |

### 9. Full Author Bio（含 Factory Footprint）

```html
<!-- Author Bio -->
<section id="author-bio" class="bg-slate-50 rounded-2xl p-6 md:p-8 mb-12 border border-slate-100">
  <div class="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
    <div class="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center border-2 border-brandOrange bg-white shadow-lg shrink-0">
      <img src="/image/factory/team-author.webp" alt="Author - Title at WOWOHCOOL" loading="lazy" width="400" height="400" class="w-full h-full object-cover">
    </div>
    <div class="flex-1 min-w-0">
      <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
        <a href="https://www.linkedin.com/in/author-profile" target="_blank" rel="noopener noreferrer" class="font-black text-slate-900 text-lg hover:text-brandOrange transition">Author Name</a>
        <span class="px-2 py-1 bg-brandOrange/10 text-brandOrange text-[11px] font-black rounded-full uppercase w-fit">Author</span>
      </div>
      <p class="text-sm text-slate-500 mb-3">Job Title · Specialty · Certification</p>
      <p class="text-slate-600 text-sm leading-relaxed">Bio with 10+ years experience + <a href="/about">company link</a>.</p>
      <!-- Factory Footprint -->
      <div class="mt-4 pt-4 border-t border-slate-200">
        <p class="text-xs text-slate-400 uppercase tracking-wider mb-2">Factory Footprint</p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div><span class="font-black text-brandBlue">5,000 m²</span><p class="text-xs text-slate-500">ISO 9001 Facility</p></div>
          <div><span class="font-black text-brandBlue">Since 2013</span><p class="text-xs text-slate-500">Shenzhen, China</p></div>
          <div><span class="font-black text-brandBlue">50+</span><p class="text-xs text-slate-500">Export Countries</p></div>
          <div><span class="font-black text-brandBlue">50+ R&D</span><p class="text-xs text-slate-500">Engineers In-House</p></div>
        </div>
      </div>
    </div>
  </div>
</section>
```

⚠️ **Factory Footprint 必须有**（4 个工厂硬数据）。

### 10. CTA

```html
<!-- CTA -->
<section class="relative bg-gradient-to-br from-brandBlue to-slate-800 rounded-3xl p-10 text-center mb-16 overflow-hidden">
  <div class="absolute top-0 right-0 w-64 h-64 bg-brandOrange/20 rounded-full blur-3xl"></div>
  <div class="absolute bottom-0 left-0 w-64 h-64 bg-brandBlue-400/20 rounded-full blur-3xl"></div>
  <div class="relative z-10">
    <h2 class="text-2xl font-black text-white uppercase italic mb-4">CTA Heading with Product Keyword</h2>
    <p class="text-slate-300 mb-8 max-w-xl mx-auto">含产品词+MOQ+认证的简短描述</p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="/contact/" class="w-full sm:flex-1 bg-brandOrange text-white px-8 py-4 rounded-xl font-black uppercase text-sm shadow-lg hover:-translate-y-1 transition">Get Factory Pricing</a>
      <a href="/products/..." class="w-full sm:flex-1 text-center border-2 border-white text-white px-8 py-4 rounded-xl font-black uppercase text-sm hover:bg-white hover:text-brandBlue transition">View Products</a>
    </div>
  </div>
</section>
```

⚠️ CTA 必须是 `<h2>`。按钮文案用 `Get Factory Pricing` / `Request OEM Quote`，不用 `Contact Us`。

### 11. Related Articles

使用 `<aside>` 语义容器包裹，让搜索爬虫明确区分"正文推荐"与"全局侧栏/脚部"。卡片链接必须使用**语言前缀路径**（`/de/blog/...`），避免 DE 文章误链到 EN 文章。

```html
<!-- Related Articles — <aside> signals "supplementary content" to crawlers -->
<aside id="related-articles" class="mb-16">
  <h2 class="text-2xl font-black text-brandBlue uppercase italic mb-6">Related Articles</h2>
  <div class="grid md:grid-cols-3 lg:grid-cols-3">
    <!-- ⚠️ 链接必须含语言前缀: /blog/ (EN) | /de/blog/ (DE) | /es/blog/ (ES) | /fr/blog/ (FR) -->
    <a href="/blog/article-slug" class="bg-slate-50 rounded-xl overflow-hidden hover:shadow-xl transition group">
      <div class="h-2 bg-gradient-to-r from-brandBlue to-brandOrange"></div>
      <div class="p-6">
        <span class="text-xs font-black text-brandOrange uppercase mb-2 block">Category</span>
        <h3 class="font-black text-brandBlue uppercase mb-2 group-hover:text-brandOrange transition">Title</h3>
        <p class="text-slate-600 text-sm">Short description.</p>
      </div>
    </a>
  </div>
</aside>
```

### 12. Sources & References

`rel` 属性按链接类型分级——权威标准机构保留 referrer 以建立共引信号（co-citation），商业/竞品站点剥离 referrer：

```html
<!-- Sources & References -->
<section class="max-w-4xl mx-auto px-6 mb-16">
  <h2 class="text-lg font-black text-brandBlue uppercase italic mb-4">Sources &amp; References</h2>
  <ul class="text-sm text-slate-600 space-y-2 list-disc pl-5">
    <!-- 权威行业标准/机构 → rel="noopener external"（保留 referrer，建立语义关联） -->
    <li><a href="https://www.wirelesspowerconsortium.com/products" target="_blank" rel="noopener external" class="text-brandBlue hover:text-brandOrange">WPC Product Registry</a></li>
    <li><a href="https://www.iec.ch/" target="_blank" rel="noopener external" class="text-brandBlue hover:text-brandOrange">IEC 62368-1 Standard</a></li>
    <!-- 商业/竞品网站 → rel="noopener noreferrer nofollow"（剥离关联信号） -->
    <li><a href="https://competitor-blog.com" target="_blank" rel="noopener noreferrer nofollow" class="text-brandBlue hover:text-brandOrange">Market Analysis Source</a></li>
  </ul>
</section>
```

| 链接类型 | `rel` 属性 | 原因 |
|---------|-----------|------|
| 行业标准/认证机构（WPC, IEC, IEEE, TÜV, USB-IF） | `noopener external` | 保留 referrer → 对方日志可见引用来源 → 建立 co-citation 语义关联 |
| 政府/法规（EU, BMWK, Stiftung EAR） | `noopener external` | 同上，公共数据源 |
| 商业站点/竞品/媒体 | `noopener noreferrer nofollow` | 剥离 referrer + 不传递 PageRank |

---

## 三、Schema & 数据 & FAQ — 权威源指针

排版规范只定义 HTML 结构和 CSS 类名。Schema 模板、工厂数据、FAQ 规则等由以下权威文件管辖，不在此重复：

| 需求 | 权威源 | 说明 |
|------|--------|------|
| JSON-LD Schema 完整模板 | `context/b2b-schema-template.json` | 7 节点，`json.load()` 直验。占位符替换规则见 `b2b-multilingual-metadata-standard.md` §二 |
| Schema 设计原理 + 语言映射 | `context/b2b-multilingual-metadata-standard.md` | Organization 节点强制字段、FAQ 8 规则、wordCount 验证脚本 |
| 工厂数据统一值 | `context/factory-data-canonical.md` | MOQ、Lead Time、认证成本、模具费用——全站唯一数据源 |
| FAQ 质量规则 | `context/b2b-blog-quality-audit-standard.md` §III.4 | Rule 1-9、问题侧/答案侧分离评分、Body-Schema 逐字一致 |
| Pre-Commit 自检清单 | `context/b2b-blog-quality-audit-standard.md` §X | 20 条发布前自检 |
