# WOWOHCOOL 产品页面Schema标准

> 最后更新: 2026-05-02
> 适用版本: 英文主站
> 此标准适用于所有产品分类页面（非单个产品详情页）

---

## 核心原则

1. **每个产品分类页面使用 1 个统一的 Product Schema**（而非为每个产品写独立Schema）
2. **价格使用 AggregateOffer**（B2B模式下不显示公开价格，但提供价格区间）
3. **评价数据从页面可见的客户评价提取**（确保评价内容在页面上可见）
4. **所有Schema字段必须完整**，避免Google Search Console报错

---

## 标准Schema结构

### 1. Organization Schema（必填）

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "WOWOHCOOL",
  "url": "https://www.wowohcool.com",
  "logo": "https://www.wowohcool.com/image/wowohcool-logo.png",
  "image": "https://www.wowohcool.com/image/wowohcool-logo.png",
  "description": "Professional OEM/ODM manufacturer of power banks, GaN chargers, wireless chargers, and car chargers since 2013.",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "sales",
    "availableLanguage": "English",
    "email": "info@wowohcool.com"
  },
  "telephone": "+86-186-2078-9739",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Shenzhen",
    "addressRegion": "Guangdong",
    "addressCountry": "CN"
  },
  "foundingDate": "2013",
  "foundingLocation": "Shenzhen, China",
  "sameAs": [
    "https://www.linkedin.com/company/wowohcool/",
    "https://www.facebook.com/wowohcoolelectronic",
    "https://www.youtube.com/@WOWOHCOOL"
  ]
}
```

### 2. Product Schema（核心，1个页面只写1个）

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://www.wowohcool.com/products/{page-slug}.html",
  "name": "WOWOHCOOL {产品分类名} - {核心卖点}",
  "description": "产品线介绍，列出主要细分品类，支持协议，认证信息，定制服务。",
  "image": [
    "https://www.wowohcool.com/image/product/{product1}.webp",
    "https://www.wowohcool.com/image/product/{product2}.webp"
    // 包含该分类下所有主要产品图片
  ],
  "brand": {"@type": "Brand", "name": "WOWOHCOOL"},
  "manufacturer": {"@type": "Organization", "name": "Dong Yi Technology Co., Ltd"},
  "sku": "WOWOHCOOL-{CATEGORY}-SERIES",
  "mpn": "WOW-{CATEGORY-SHORT}-SERIES",
  "category": "Electronics > Battery & Charging > {具体分类}",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4.8,    // 该分类下所有产品的加权平均评分
    "reviewCount": 357,     // 该分类下所有产品的评价总数
    "bestRating": 5,
    "worstRating": 1
  },
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "USD",
    "lowPrice": 5,         // 该分类最低价（整数类型）
    "highPrice": 25,        // 该分类最高价（整数类型）
    "offerCount": 10,       // 该分类下产品数量
    "availability": "https://schema.org/InStock",
    "url": "https://www.wowohcool.com/products/{page-slug}.html"
  },
  "review": [
    {
      "@type": "Review",
      "reviewRating": {"@type": "Rating", "ratingValue": 5, "bestRating": 5},
      "author": {"@type": "Person", "name": "客户名"},
      "reviewBody": "评价内容（从页面可见的评价中提取）",
      "locationCreated": {"@type": "Place", "name": "城市, 国家"},
      "datePublished": "2026-01-15"
    }
    // 建议至少3-6条评价
  ],
  "additionalProperty": [
    {"@type": "PropertyValue", "name": "属性名", "value": "属性值"}
  ]
}
```

### 3. WebSite Schema（含搜索功能）

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "WOWOHCOOL",
  "url": "https://www.wowohcool.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.wowohcool.com/search?q={search_term_string}"
    },
    "query-input": {
      "@type": "PropertyValueSpecification",
      "valueRequired": true,
      "valueName": "search_term_string"
    }
  }
}
```

> **注意**: `query-input` 必须使用新版对象格式，不要使用旧版字符串格式 `"required name=search_term_string"`。

### 4. BreadcrumbList Schema

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.wowohcool.com/"},
    {"@type": "ListItem", "position": 2, "name": "Products", "item": "https://www.wowohcool.com/products/"},
    {"@type": "ListItem", "position": 3, "name": "Wireless Chargers", "item": "https://www.wowohcool.com/products/wireless-charger.html"}
  ]
}
```

### 5. FAQPage Schema（可选，如有FAQ内容）

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "问题标题",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "回答内容（纯文本，可包含Markdown格式）"
      }
    }
  ]
}
```

---

## 字段填写规则

### Product Schema

| 字段 | 规则 | 示例 |
|------|------|------|
| `@id` | 页面完整URL | `https://www.wowohcool.com/products/wireless-charger.html` |
| `name` | `WOWOHCOOL {分类} - {差异化卖点}` | `WOWOHCOOL GaN Chargers & Power Strips` |
| `description` | 涵盖产品线、核心特性、认证、定制服务 | 见标准模板 |
| `image` | 数组格式，包含所有主要产品图片 | 见标准模板 |
| `manufacturer` | 对象格式（非纯文本） | `{"@type": "Organization", "name": "Dong Yi Technology Co., Ltd"}` |
| `sku` | `WOWOHCOOL-{CATEGORY}-SERIES` | `WOWOHCOOL-GAN-SERIES` |
| `mpn` | `WOW-{SHORT}-SERIES` | `WOW-GAN-SERIES` |
| `category` | Google产品分类 | `Electronics > Battery & Charging > {Type}` |
| `aggregateRating` | **必须包含** `bestRating: 5` 和 `worstRating: 1` | - |
| `offers` | **必须使用 `AggregateOffer` 类型**，包含 `lowPrice` 和 `highPrice` | - |
| `review` | 从页面可见的客户评价中提取，至少有`reviewRating`、`author`、`reviewBody` | 见标准模板 |
| `additionalProperty` | 包含品类共通的规格属性 | 见标准模板 |

### Offers（AggregateOffer）

- `lowPrice` / `highPrice`: **整数类型**（不加引号），非字符串
- `priceCurrency`: 固定为 `"USD"`
- `availability`: 使用 `https://schema.org/InStock`
- 不需要提供单个产品的 `itemCondition`（统一使用AggregateOffer）

### AggregateRating

- `ratingValue`: 保留1位小数（加权平均值）
- `reviewCount`: 各产品reviewCount之和
- **必须**包含 `bestRating: 5, worstRating: 1`

### Reviews

- 必须从页面上可见的客户评价提取
- 必须匹配页面上的评分（星级）
- 需要包含 `datePublished` 日期
- 5星评价使用 `"ratingValue": 5`
- 4.5星评价使用 `"ratingValue": 4`（Google不支持小数）
- 建议数量：3-8条

---

## 禁止事项

❌ **不要为每个产品写单独的Product Schema**（多产品页面）
❌ **不要使用 `"@type": "Offer"`** 作为页面级产品报价（使用 `AggregateOffer`）
❌ **不要使用 `"@type": "AggregateRating"` 时不带 `bestRating`/`worstRating`**
❌ **不要使用字符串格式的 `query-input`**
❌ **不要在Schema中添加页面上不可见的价格**
❌ **不要为没有真实评价的产品添加 `aggregateRating`**

---

## 验证流程

修改Schema后，按以下步骤验证：

1. **JSON语法验证**: 复制到 JSON 验证器检查格式
2. **Google Rich Results Test**: 用 https://search.google.com/test/rich-results 测试
3. **检查Critical错误**: 确保没有任何 Critical 错误
4. **检查Warning**: 尽量减少Warning

---

## 行业批发价格参考（B2B OEM/ODM，深圳制造）

数据基于行业公开报价及工厂批发均价，用于 `AggregateOffer` 的 `lowPrice` / `highPrice`：

| 品类 | 价格范围 | 典型产品 |
|------|----------|---------|
| 无线充电器 (Qi2) | $12 - $20 | 基础车载垫, 3合1桌面站, 锌合金/玻璃高端站 |
| GaN充电器 | $5 - $15 | 20W-100W GaN充电器, 多口插座 |
| 车载充电器 | $2 - $10 | USB-A/USB-C快充, Qi2磁吸支架, 数显款 |
| 移动电源 | $5 - $20 | 半固态, 2合1混合, TFT数显, 240W大功率, 加热衣电池 |

## 已优化的页面

| 页面 | 状态 | 价格范围 | 评价数 | 产品数 |
|------|------|----------|--------|--------|
| `products/wireless-charger.html` | ✅ 已优化 | $12-$20 | 357 | 10 |
| `products/power-bank.html` | ✅ 已优化 | $5-$20 | 495 | 16 |
| `products/gan-charger.html` | ✅ 已复核 | $5-$15 | 112 | 1(系列) |
| `products/car-charger.html` | ✅ 已复核 | $2-$10 | 145 | 1(系列) |
