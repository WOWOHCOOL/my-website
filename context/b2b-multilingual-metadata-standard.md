# B2B 多语言文章元数据标准 (v2.0)

**适用范围**: EN / DE / ES / FR 所有 B2B 博客文章
**最后更新**: 2026-07-29

---

## 一、JSON-LD Schema 完整模板

以下为生产就绪模板，直接复制替换占位符即可使用。注意：`<script type="application/ld+json">` 内**禁止使用注释**。

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "{ORGANIZATION_ID}",
      "name": "WOWOHCOOL",
      "legalName": "Dong Yi Technology Co., Ltd",
      "url": "{ORGANIZATION_URL}",
      "publishingPrinciples": "{ORGANIZATION_URL}",
      "logo": { "@type": "ImageObject", "url": "https://www.wowohcool.com/image/wowohcool-logo-optimized.webp" },
      "areaServed": ["DE", "AT", "CH", "EU"],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "{STREET_ADDRESS}",
        "addressLocality": "{CITY}",
        "addressRegion": "{REGION}",
        "postalCode": "{POSTAL_CODE}",
        "addressCountry": "{COUNTRY_CODE}"
      },
      "sameAs": [
        "https://www.linkedin.com/company/wowohcool",
        "https://www.facebook.com/wowohcoolelectronic",
        "https://www.youtube.com/@WOWOHCOOL",
        "https://x.com/wowohcool"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "OEM/ODM Sales",
        "telephone": "{SALES_TELEPHONE}",
        "email": "{SALES_EMAIL}",
        "availableLanguage": ["English", "German", "Chinese"]
      }
    },
    {
      "@type": "WebSite",
      "@id": "{WEBSITE_ID}",
      "url": "{SITE_URL}",
      "name": "{SITE_NAME}",
      "inLanguage": "{LANG}",
      "publisher": { "@id": "{ORGANIZATION_ID}" }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "{HOME_LABEL}", "item": "{SITE_URL}" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "{BLOG_URL}" },
        { "@type": "ListItem", "position": 3, "name": "{ARTICLE_SHORT_TITLE}", "item": "{CANONICAL_URL}" }
      ]
    },
    {
      "@type": "BlogPosting",
      "@id": "{CANONICAL_URL}#article",
      "headline": "{H1_TITLE}",
      "keywords": ["{KEYWORD_1}", "{KEYWORD_2}", "{KEYWORD_3}"],
      "description": "{META_DESCRIPTION}",
      "author": { "@id": "{AUTHOR_ID}" },
      "publisher": { "@id": "{ORGANIZATION_ID}" },
      "datePublished": "{PUBLISH_DATE}",
      "dateModified": "{MODIFIED_DATE}",
      "mainEntityOfPage": { "@type": "WebPage", "@id": "{CANONICAL_URL}" },
      "wordCount": 0,
      "inLanguage": "{LANG}",
      "timeRequired": "{TIME_REQUIRED}",
      "articleSection": "{ARTICLE_CATEGORY}",
      "image": "{OG_IMAGE}",
      "thumbnailUrl": "{OG_IMAGE}",
      "speakable": { "@type": "SpeakableSpecification", "cssSelector": ["h1", ".speakable"] },
      "about": { "@type": "Thing", "name": "{WIKIDATA_LABEL}", "sameAs": "{WIKIDATA_URL}" },
      "citation": [
        { "@type": "CreativeWork", "name": "{CITE_1_NAME}", "url": "{CITE_1_URL}" },
        { "@type": "CreativeWork", "name": "{CITE_2_NAME}", "url": "{CITE_2_URL}" },
        { "@type": "CreativeWork", "name": "{CITE_3_NAME}", "url": "{CITE_3_URL}" }
      ]
    },
    {
      "@type": "Person",
      "@id": "{AUTHOR_ID}",
      "name": "{AUTHOR_NAME}",
      "jobTitle": "{AUTHOR_JOB_TITLE}",
      "url": "{AUTHOR_PAGE_URL}",
      "sameAs": ["{AUTHOR_LINKEDIN}"],
      "image": "{AUTHOR_IMAGE}",
      "worksFor": { "@id": "{ORGANIZATION_ID}" },
      "knowsAbout": ["{KNOWS_ABOUT_1}", "{KNOWS_ABOUT_2}", "{KNOWS_ABOUT_3}"]
    },
    {
      "@type": "HowTo",
      "@id": "{CANONICAL_URL}#howto",
      "name": "{HOWTO_NAME}",
      "description": "{HOWTO_DESC}",
      "totalTime": "{HOWTO_TOTAL_TIME}",
      "step": [
        { "@type": "HowToStep", "position": 1, "name": "{STEP_1_NAME}", "itemListElement": [{ "@type": "HowToDirection", "text": "{STEP_1_TEXT}" }] },
        { "@type": "HowToStep", "position": 2, "name": "{STEP_2_NAME}", "itemListElement": [{ "@type": "HowToDirection", "text": "{STEP_2_TEXT}" }] },
        { "@type": "HowToStep", "position": 3, "name": "{STEP_3_NAME}", "itemListElement": [{ "@type": "HowToDirection", "text": "{STEP_3_TEXT}" }] }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "{CANONICAL_URL}#faq",
      "speakable": { "@type": "SpeakableSpecification", "cssSelector": [".faq-answer"] },
      "mainEntity": [
        { "@type": "Question", "name": "{FAQ_1_QUESTION}", "acceptedAnswer": { "@type": "Answer", "text": "{FAQ_1_ANSWER}" } },
        { "@type": "Question", "name": "{FAQ_2_QUESTION}", "acceptedAnswer": { "@type": "Answer", "text": "{FAQ_2_ANSWER}" } },
        { "@type": "Question", "name": "{FAQ_3_QUESTION}", "acceptedAnswer": { "@type": "Answer", "text": "{FAQ_3_ANSWER}" } },
        { "@type": "Question", "name": "{FAQ_4_QUESTION}", "acceptedAnswer": { "@type": "Answer", "text": "{FAQ_4_ANSWER}" } },
        { "@type": "Question", "name": "{FAQ_5_QUESTION}", "acceptedAnswer": { "@type": "Answer", "text": "{FAQ_5_ANSWER}" } },
        { "@type": "Question", "name": "{FAQ_6_QUESTION}", "acceptedAnswer": { "@type": "Answer", "text": "{FAQ_6_ANSWER}" } },
        { "@type": "Question", "name": "{FAQ_7_QUESTION}", "acceptedAnswer": { "@type": "Answer", "text": "{FAQ_7_ANSWER}" } },
        { "@type": "Question", "name": "{FAQ_8_QUESTION}", "acceptedAnswer": { "@type": "Answer", "text": "{FAQ_8_ANSWER}" } }
      ]
    }
  ]
}
```

---

## 二、占位符语言映射表

| 占位符 | DE | EN | ES | FR | RU |
|--------|-----|-----|-----|-----|-----|
| `{LANG}` | `de-DE` | `en-US` | `es-ES` | `fr-FR` | `ru-RU` |
| `{ORGANIZATION_ID}` | `https://www.wowohcool.com/de/#organization` | `https://www.wowohcool.com/#organization` | `https://www.wowohcool.com/es/#organization` | `https://www.wowohcool.com/fr/#organization` | `https://www.wowohcool.com/ru/#organization` |
| `{ORGANIZATION_URL}` | `https://www.wowohcool.com/de/about/` | `https://www.wowohcool.com/about/` | `https://www.wowohcool.com/es/about/` | `https://www.wowohcool.com/fr/about/` | `https://www.wowohcool.com/ru/about/` |
| `{WEBSITE_ID}` | `https://www.wowohcool.com/de/#website` | `https://www.wowohcool.com/#website` | `https://www.wowohcool.com/es/#website` | `https://www.wowohcool.com/fr/#website` | `https://www.wowohcool.com/ru/#website` |
| `{SITE_URL}` | `https://www.wowohcool.com/de/` | `https://www.wowohcool.com/` | `https://www.wowohcool.com/es/` | `https://www.wowohcool.com/fr/` | `https://www.wowohcool.com/ru/` |
| `{SITE_NAME}` | `WOWOHCOOL Deutschland` | `WOWOHCOOL` | `WOWOHCOOL España` | `WOWOHCOOL France` | `WOWOHCOOL Россия` |
| `{HOME_LABEL}` | `Startseite` | `Home` | `Inicio` | `Accueil` | `Главная` |
| `{BLOG_URL}` | `https://www.wowohcool.com/de/blog/` | `https://www.wowohcool.com/blog/` | `https://www.wowohcool.com/es/blog/` | `https://www.wowohcool.com/fr/blog/` | `https://www.wowohcool.com/ru/blog/` |

### 文章级占位符（每篇文章独立填写）

| 占位符 | 说明 | 示例（DE） |
|--------|------|-----------|
| `{H1_TITLE}` | H1 标题，50-65 字符，**不含品牌后缀**（`\| WOWOHCOOL` 仅用于 `<title>`） | `Ladegerät-Fabrik China: Audit-Leitfaden für Importeure 2026` |
| `{META_DESCRIPTION}` | Meta 描述，150-160 字符 | `Ladegerät-Fabrik China: WPC/Qi2-Audit, FOD-Test...` |
| `{ARTICLE_SHORT_TITLE}` | 面包屑短标题 | `Fabrikauswahl China` |
| `{CANONICAL_URL}` | 完整 canonical URL（末尾带 `/`） | `https://www.wowohcool.com/de/blog/fabrikauswahl-china-leitfaden/` |
| `{PUBLISH_DATE}` | 发布日期 `YYYY-MM-DD` | `2026-04-21` |
| `{MODIFIED_DATE}` | 最后修改日期 | `2026-07-27` |
| `{AUTHOR_ID}` | 作者 `@id`（Person 节点引用，BlogPosting.author 去重） | `https://www.wowohcool.com/de/#snowymay` |
| `{ACTUAL_WORD_COUNT}` | 实际主体字数（整数，无引号），验证方法见 §四 | `3100` |
| `{TIME_REQUIRED}` | ISO 8601 duration | `PT14M` |
| `{KEYWORD_1}` 等 | 文章关键词（≥3） | `GaN-Ladegerät` |
| `{ARTICLE_CATEGORY}` | 文章分类标签 | `GaN & Fast Charging` |
| `{OG_IMAGE}` | 封面图完整 URL | `https://www.wowohcool.com/image/blog/cover-de/...` |
| `{AUTHOR_NAME}` | 作者姓名 | `Nina Nico` |
| `{AUTHOR_LINKEDIN}` | 作者 LinkedIn URL（填入 `sameAs` 数组） | `https://www.linkedin.com/in/nico-power-bank-chargers` |
| `{AUTHOR_PAGE_URL}` | 作者页面 URL（跨语言统一，不随文章语言变化） | `https://www.wowohcool.com/authors/nina-nico/` |
| `{AUTHOR_JOB_TITLE}` | 作者职位（B2B 采购相关） | `Sales Manager, OEM/ODM Chargers & Power Banks` |
| `{AUTHOR_IMAGE}` | 作者头像 URL | `https://www.wowohcool.com/image/factory/team-nina.webp` |
| `{KNOWS_ABOUT_1}` 等 | 作者专长领域（≥3，每项独立占位，构建时输出标准 JSON Array） | `OEM/ODM Sourcing` / `Werksaudit China` / `Qi2 Wireless Charging` |
| `{WIKIDATA_LABEL}` | 文章核心实体英文标签 | `Battery charger` |
| `{WIKIDATA_URL}` | Wikidata 实体 URL | `https://www.wikidata.org/entity/Q352917` |
| `{HOWTO_NAME}` | HowTo 名称 | `Eine seriöse Ladegerät-Fabrik in China auswählen` |
| `{HOWTO_DESC}` | HowTo 简述 | `Schritt-für-Schritt-Verfahren zur Verifikation...` |
| `{HOWTO_TOTAL_TIME}` | HowTo 总耗时 (ISO 8601) | `PT15M` |
| `{CITE_1_NAME}` 等 | 权威引用源名称 + URL | `WPC Product Registry` / `https://www.wirelesspowerconsortium.com/products` |
| `{FAQ_1_QUESTION}` 等 | FAQ 问答题对，5-8 条 | 见 §三 FAQ 8 规则 |

### Organization 级固定字段（全站统一，不设占位符）
| `{SERVICE_DESCRIPTION}` | 服务描述 | `End-to-end OEM/ODM charger manufacturing...` |
| `{SERVICE_TYPE}` | 服务类型 | `Manufacturing` |

---

## 三、Schema 节点设计原理

### 3.1 Organization（必须，`@graph` 第一条）

**B2B 关键字段（v2 增强）**：

| 字段 | 用途 | GEO 影响 |
|------|------|---------|
| `legalName` | 对公验证、海关清关、合同匹配 | 实体消歧 |
| `foundingDate`（v2 新增） | 公司成立年份，B2B 信任信号 | 实体时效性 |
| `vatID`（v2 新增） | 增值税号 / 统一社会信用代码 | 实体可验证性 |
| `address`（v2 新增） | 完整 PostalAddress | 本地搜索 + Google 商家匹配 |
| `knowsAbout`（v2 新增） | 公司级别专长领域 | 知识图谱实体分类 |
| `sameAs` | 跨平台实体关联（LinkedIn, YouTube, X, Facebook） | 知识图谱合并 |
| `contactPoint.telephone/email`（v2 增强） | 真实联系方式 | AI 确认可联系实体 |
| `contactPoint.contactType: "OEM/ODM Sales"` | 精准 B2B 意图信号 | AI 理解业务模型 |
| `areaServed` | 目标市场地理范围 | 本地化搜索 |

### 3.2 BlogPosting（核心信息节点）

| 字段 | 用途 | GEO 影响 |
|------|------|---------|
| `speakable` | AI 语音提取锚点，cssSelector `["h1", ".speakable"]`（3 节点：H1+Hook+Key Takeaways）。FAQPage 独立 speakable | +15% 语音搜索匹配 |
| `about.sameAs` | Wikidata 实体挂载，链接全球知识图谱 | **+5% AI 引用率** |
| `citation` | 列出的权威来源链，建立信任传递 | **+3% AI 引用率** |
| `wordCount` | 整数、无引号、已验证（见 §四） | Schema 验证 |
| `timeRequired` | ISO 8601，约 250 词/分钟 | 用户体验信号 |

### 3.3 Person（Author EEAT）

6 项检查（5/6 即 83 分，6/6 需独立作者页面）：

1. ✅ 命名作者
2. ✅ 职位含 "OEM/ODM / Supply Chain / Sourcing / Procurement" 等 B2B 信号
3. ✅ LinkedIn URL
4. ✅ 头像图片
5. ✅ `worksFor` 关联 Organization
6. ✅ `knowsAbout` ≥3 个与文章主题匹配的专长领域

### 3.4 FAQPage（8 条强制规则）

| # | 规则 | 验证方法 |
|---|------|---------|
| 1 | **Body-Schema 逐字一致** | 正文 FAQ = JSON-LD FAQPage 完全相同 |
| 2 | **真实搜索需求** | 通过 WebSearch + site:alibaba.com 验证 B2B 买家查询 |
| 3 | **内容锚定** | 每个答案可追溯到正文具体段落 |
| 4 | **GEO 自包含** | AI 可单独提取任何 Q&A 对作为独立引用 |
| 5 | **决策链排序** | 规格→认证→定价→采购流程 |
| 6 | **量化答案** | 每条答案含 ≥1 个具体数字 |
| 7 | **末题 = CTA 桥梁** | 最后 1 题自然过渡到买家行动 |
| 8 | **交叉一致性** | FAQ 数据与 KERNERKENNTNISSE、正文三方一致 |

### 3.5 HowTo（条件性 — 仅步骤类文章）

**适用范围**：标准操作规程（SOP）、工厂审核流程、选择与检验指南等步骤类文章。

**排除范围**：纯行业洞察、趋势分析、市场报告等非步骤类文章。若文章无明确步骤，**构建脚本必须在生成 JSON-LD 时将 `HowTo` 节点从 `@graph` 数组中完全移除**，避免 Google Search Console 报告空/无效 Schema 警告。

**规范**（适用时）：
- ≥3 个步骤
- 每个 `HowToStep.name` 用动词开头
- `HowToDirection.text` 包含具体操作细节

### 3.6 `citation` 数组（GEO 增强）

列出 ≥3 个外部权威来源：
- 行业标准组织（WPC, USB-IF, IEC）
- 政府/监管机构（Stiftung EAR, BMWK, EU）
- 认证机构（TÜV, SGS, Bureau Veritas）
- 官方数据库（NECIPS, IAF CertSearch）

---

## 四、wordCount 验证（每次审计必须执行）

`information_gain_analyzer.py` 将 JSON-LD、SVG path、HTML 标签计入词数，产生 40-50% 膨胀。

**适用范围**：本脚本基于空格切分（`.split()`），专为 DE、EN、ES、FR 等西文字符语言设计。如后续拓展至中/日/韩文，需替换为字符计数或 CJK 分词库。

**验证脚本**：

```bash
python3 -c "
import re
filepath = r'[FILE_PATH]'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()
content = re.sub(r'<script[^>]*>.*?</script>', ' ', content, flags=re.DOTALL)
content = re.sub(r'<style[^>]*>.*?</style>', ' ', content, flags=re.DOTALL)
content = re.sub(r'<svg[^>]*>.*?</svg>', ' ', content, flags=re.DOTALL)
content = re.sub(r'<!--.*?-->', ' ', content, flags=re.DOTALL)
content = re.sub(r'<[^>]+>', ' ', content)
content = re.sub(r'\{%.*?%\}', ' ', content)
content = re.sub(r'\{\{.*?\}\}', ' ', content)
content = re.sub(r'\s+', ' ', content).strip()
body_match = re.search(r'\{% block content %\}(.*?)\{% endblock %\}', content, re.DOTALL)
if body_match:
    content = body_match.group(1)
    content = re.sub(r'<[^>]+>', ' ', content)
    content = re.sub(r'\{%.*?%\}', ' ', content)
    content = re.sub(r'\s+', ' ', content).strip()
real_wc = len(content.split())
print(f'Actual main content word count: {real_wc}')
"
```

**决策**：实测值与 Schema `wordCount` 偏差 >±5% → 立即修正。

---

## 五、文章结构排序

### 5.1 标准结构（所有语言通用，15 板块）

```
 1. Hero Header      面包屑→标签→H1→Compact Author Bar→日期行
 2. The Hook         引入段落（≤2 段，开门见山）ⓢ
 3. Featured Image   封面图 2240×1260，srcset 三档响应式
 4. Key Takeaways    KERNERKENNTNISSE，amber 卡片，3-5 条要点 + TL;DR ⓢ
 5. Key Metrics      可选，数据指标卡片
 6. Table of Contents 含 #faq 锚点
 7. Factory Data     工厂数据卡片（面积/员工/R&D/产能/认证）ⓕ
 8. H2 Sections ×N   标准灰底卡片，嵌入式 Expert Insight + Factory Stat
 9. Conclusion       可选，依文章而定 — 总结 + 实操流程，不含重复链接 ⓕ
10. FAQ               id="faq"，8 条规则
11. Author Bio        id="author-bio"，含 Factory Footprint
12. CTA               渐变背景，2 按钮：主 CTA + OEM/ODM Service
13. Related Articles  id="related-articles"
14. Sources           引用来源列表
15. Global CTA        页面级 blog-cta.njk
```

> Ⓢ = speakable class 必需   ⓕ = 工厂专属板块（含 B2B 硬数据）

### 5.2 DE 专属板块（EN/ES/FR 可选）

DE 文章在标准结构基础上增加以下板块（位置见 §5.1）：

| # | 板块 | 说明 |
|---|------|------|
| 7 | **WOWOHCOOL FAKT** | 工厂硬数据卡片。面积（m²）、员工、R&D 工程师、月产能、认证年份 |
| 9 | **FAZIT** | 可选总结。核心结论 + 实操流程，不含与 Related Articles 重复的内部链接 |

---

## 六、B2B 质量门（发布前自检）

```
[ ] H1 50-65 字符，含 ≥1 B2B 信号词（OEM/manufacturer/factory/supplier/importer/sourcing/MOQ/FOB/B2B）
[ ] ≥2 个 H2 含 B2B 信号词
[ ] Hook ≤2 段，首句直接给出核心结论
[ ] KERNERKENNTNISSE 含 3-5 条量化要点
[ ] HowTo Schema 已添加（如有步骤流程）
[ ] 图片 alt text 含 B2B 关键词
[ ] 封面图 srcset 三档（800w/1200w/2240w）+ loading="eager" + fetchpriority="high"
[ ] dateModified 更新为当天日期
[ ] wordCount 为整数（无引号），且通过 §四 验证
[ ] FAQ body-schema 逐字一致（§三 Rule 1）
[ ] FAQ 8 条全部通过 WebSearch 验证（§三 Rule 2）
[ ] ≥2 外部权威链接（rel="noopener noreferrer"）
[ ] ≥3 内部链接到产品页/服务页/相关文章
[ ] ≥3 citation 条（来自行业标准/政府/认证机构）
[ ] about.sameAs Wikidata 实体挂载
[ ] CTAs: 内联 gradient CTA + 页面级 blog-cta.njk
[ ] speakable cssSelector: ["h1", ".speakable"]（BlogPosting，3 节点）。FAQPage 独立 speakable: [".faq-answer"]。SCHNELLANTWORT/RESPUESTA RÁPIDA 禁止存在
[ ] Expert Insight 嵌入在 H2 Section 内（非独立在文章末尾）
[ ] Organization 节点含 legalName + url + publishingPrinciples + logo + sameAs + contactPoint
[ ] Organization url/publishingPrinciples 按语言映射（§二映射表）
```

---

## 七、B2B 信号词表

### 强制信号词（H1 必须含 ≥1）

```
OEM, ODM, manufacturer, factory, supplier, importer, sourcing, MOQ, FOB, B2B,
procurement, wholesale, supply chain, certification, compliance, audit, customs
```

### DE 专属

```
Hersteller, Fabrik, Importeur, Lieferant, Werksaudit, Zertifikat, Beschaffung,
Einkauf, Großhandel, Handelspartner
```

### ES 专属

```
fabricante, fábrica, importador, proveedor, auditoría, certificación, abastecimiento,
mayorista, OEM/ODM
```

### FR 专属

```
fabricant, usine, importateur, fournisseur, audit, certification, approvisionnement,
grossiste, OEM/ODM
```

---

## 八、版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| v2.0 | 2026-07-29 | Organization 增强（address, foundingDate, vatID, knowsAbout, telephone/email）；BlogPosting.author 改为 @id 引用去重；新增 Product/Service 节点；WebSite 增加 SearchAction；wordCount 占位符改名 {ACTUAL_WORD_COUNT}；Person 增加 @id；HowTo/FAQPage 增加 @id；移除 Quick Answer 板块；SCHNELLANTWORT 标记废弃 |
| v1.0 | 2026-07-27 | 初始版本。合并 EN 模板 + DE 优化，统一 4 语言映射表、完整 JSON-LD 模板、FAQ 8 规则、wordCount 验证方法、B2B 质量门清单 |
