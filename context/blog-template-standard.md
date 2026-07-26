# EN Blog 标准排版规范 (v2.0)

**基于**: 28 篇文章完整审计优化
**适用**: 所有 EN 博客文章 (wowohcool.com/blog/)

---

## 一、B2B 转化黄金逻辑顺序

```
建立信任(E-E-A-T) → 解答痛点(Content) → 消除顾虑(FAQ) → 促成转化(CTA) → 流量挽留(Related)
```

```
 1. Hero Header (面包屑→标签→H1→Compact Author Bar→日期行)
 2. The Hook (引入段落)
 3. Featured Image (封面图 2240×1260)
 4. Key Takeaways (合并 TL;DR 的总结段)
 5. Key Metrics Cards (可选，数据指标)
 6. Table of Contents (含 #faq 锚点)
 7. H2 Sections × N (标准灰底卡片，嵌入式 Expert Insight + Factory Stat)
 8. FAQ (id="faq", 8条规则)
 9. Full Author Bio (id="author-bio", 含 Factory Footprint)
10. CTA (渐变背景 h2)
11. Related Articles (id="related-articles")
12. Sources & References
13. Global blog-cta.njk (页面级通用 CTA)
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
    <!-- 日期行 -->
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
  <div class="bg-brandBlue/5 border-l-4 border-brandOrange p-6 rounded-r-xl mb-8 speakable">
    <p class="text-lg text-slate-700 italic">引人入胜的痛点段落</p>
    <p class="text-slate-600 leading-relaxed mt-4">扩展数据段落</p>
  </div>
</div>
```

注意: Hook div 必须加 `speakable` class 以匹配 Schema 的 `cssSelector`.

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
  <p class="text-slate-700 leading-relaxed text-sm mb-4 speakable">TL;DR 总结段 — 2-3 句概括全文核心结论</p>
  <ul class="text-sm text-slate-700 space-y-2 list-disc pl-5">
    <li><strong>要点标题:</strong> 数据描述</li>
  </ul>
</div>
```

⚠️ **不再使用独立的 TL;DR 区块**。Key Takeaways 的 `<ul>` 列表或 Expert Insight 的 `<blockquote>` 也应添加 `speakable` class，确保 AI 提取时有足够上下文。

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

```html
<!-- Related Articles -->
<section id="related-articles" class="mb-16">
  <h2 class="text-2xl font-black text-brandBlue uppercase italic mb-6">Related Articles</h2>
  <div class="grid md:grid-cols-3 lg:grid-cols-3">
    <a href="/blog/article-slug" class="bg-slate-50 rounded-xl overflow-hidden hover:shadow-xl transition group">
      <div class="h-2 bg-gradient-to-r from-brandBlue to-brandOrange"></div>
      <div class="p-6">
        <span class="text-xs font-black text-brandOrange uppercase mb-2 block">Category</span>
        <h3 class="font-black text-brandBlue uppercase mb-2 group-hover:text-brandOrange transition">Title</h3>
        <p class="text-slate-600 text-sm">Short description.</p>
      </div>
    </a>
  </div>
</section>
```

### 12. Sources & References

```html
<!-- Sources & References -->
<section class="max-w-4xl mx-auto px-6 mb-16">
  <h2 class="text-lg font-black text-brandBlue uppercase italic mb-4">Sources &amp; References</h2>
  <ul class="text-sm text-slate-600 space-y-2 list-disc pl-5">
    <li><a href="https://source-url.com" target="_blank" rel="noopener noreferrer" class="text-brandBlue hover:text-brandOrange">Authority Source Name</a></li>
  </ul>
</section>
```

---

## 三、JSON-LD Schema 规范

### 必须包含的结构化数据

```json
{
  "@context": "https://schema.org",           ← 仅此一处！
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.wowohcool.com/#organization",
      "name": "WOWOHCOOL",
      "legalName": "Dong Yi Technology Co., Ltd",
      "url": "https://www.wowohcool.com/LANG/about/",
      "publishingPrinciples": "https://www.wowohcool.com/LANG/about/",
      "logo": "https://www.wowohcool.com/image/logo/wowohcool-logo.png",
      "areaServed": [...],
      "contactPoint": { "@type": "ContactPoint", "contactType": "OEM/ODM Sales", "availableLanguage": [...] }
    },
    { "@type": "BreadcrumbList" },
    {
      "@type": "BlogPosting",
      "author": { "@type": "Person", "sameAs": ["LinkedIn URL"] },
      "publisher": { "@id": "https://www.wowohcool.com/#organization" },
      "about": { "@type": "Thing", "name": "Topic", "sameAs": "Wikidata URL" },
      "speakable": { "cssSelector": ["h1","h2",".speakable"] }
    },
    { "@type": "HowTo" },
    { "@type": "FAQPage" }
  ]
}
```

### Organization 节点强制字段

**每篇 Blog 的 `@graph` 第一条必须是独立 Organization 节点，包含以下 4 个强制字段：**

| 字段 | 值 | 说明 |
|------|-----|------|
| `name` | `"WOWOHCOOL"` | 品牌名，固定值 |
| `legalName` | `"Dong Yi Technology Co., Ltd"` | 法定公司名，固定值 |
| `url` | 按语言映射 | 见下表 |
| `publishingPrinciples` | 同 `url` | 与 url 保持一致 |

**`url` / `publishingPrinciples` 语言映射：**

| 语言 | URL |
|------|-----|
| EN | `https://www.wowohcool.com/about/` |
| DE | `https://www.wowohcool.com/de/about/` |
| ES | `https://www.wowohcool.com/es/about/` |
| FR | `https://www.wowohcool.com/fr/about/` |

**BlogPosting 的 `publisher` 使用 `@id` 引用**（不重复定义 Organization），避免 JSON-LD 膨胀。

### Schema 检查清单

- [ ] `@context` 仅根级 1 处
- [ ] **`@graph` 第一条 = Organization 节点**，含 `name`, `legalName`, `url`, `publishingPrinciples`, `logo`
- [ ] Organization `url` 和 `publishingPrinciples` 按语言映射到正确的 `/about/` 路径
- [ ] BlogPosting `publisher` 使用 `@id` 引用（不重复定义 Organization）
- [ ] 所有 URL 末尾带 `/`
- [ ] `about.sameAs` 绑定 Wikidata ID
- [ ] FAQPage Schema 与 HTML FAQ 正文**逐字一致**
- [ ] `speakable` 选择器包含 `.speakable`，且 Hook 段落有 `speakable` class

---

## 四、工厂数据统一值

详见 `context/factory-data-canonical.md`

| 项目 | 值 |
|------|-----|
| MOQ | 500-1,000 (标准), 3,000+ (Custom OEM) |
| OEM Lead Time | 25-30 days after sample approval |
| ODM Lead Time | 45-60 days (including mold) |
| 支付 | 30% deposit + 70% before shipment (T/T) |
| CE/FCC/RoHS | $2,000-4,000 (含 UN38.3) |
| Single-port Mold | $2,000-5,000 |
| PCB Design + NRE | $2,000-5,000 |

---

## 五、FAQ 常见问题修复模板

| 问题类型 | 修复 |
|---------|------|
| 消费者语言 ("What is X?") | 改为采购决策视角 ("What X specs should OEM buyers verify?") |
| 末题无 CTA | 最后 1 题加 CTA 桥梁链接 |
| 问题数 <5 | 从 Schema 补齐到 ≥5 题 |
| Schema 与正文不一致 | 逐字同步 |
| H4 FAQ 标签 | 全部用 `<h3>` |
| TOC 缺 FAQ | 补 `#faq` 链接 |
