# B2B 多语言文章元数据标准 (v2.5)

**适用范围**: EN / DE / ES / FR / RU / PL 所有 B2B 博客文章
**最后更新**: 2026-09-01

> 📌 **权威优先级声明（Precedence Directive）**：本文档为 WOWOHCOOL B2B 博客/内容/Schema 的**最高执行标准**。凡与 `seo-guidelines.md`（开源框架基线）存在冲突（如 FAQ 数量、speakable 选择器、Quick Answer 盒、Keyword Density、rel 属性等），**一律以本文档及 `blog-template-standard.md` / `b2b-blog-quality-audit-standard.md` 为准**。`seo-guidelines.md` 仅作产品页/关键词研究的补充参考。

---

## 一、JSON-LD Schema 完整模板

以下为生产就绪模板，直接复制替换占位符即可使用。注意：`<script type="application/ld+json">` 内**禁止使用注释**。

> ⚠️ **模板是最小骨架，不是标准值**：FAQ 占位符 5 块对应 Rule 0 **上限**（实际取 **3-5 条**，可删至 3）；HowTo 3 步为**下限**（≥3），步骤多的文章按需复制 `HowToStep` 块。块数以内容实际需要为准，勿照抄模板行数。**例外**：`Person.knowsAbout` 为作者固定专长池，**固定 6 值**（§3.3 表，Snowy/Nina 各 6 词），模板 6 槽是定值——逐字复制作者对应专长，**不多不少、不逐篇变化**，勿按 FAQ/HowTo 的「按需增减」逻辑删减。

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "{ORGANIZATION_ID}",
      "name": "WOWOHCOOL",
      "legalName": "Dong Yi Technology Co., Ltd",
      "foundingDate": "2013",
      "vatID": "91441900MA558A2N27",
      "url": "{ORGANIZATION_URL}",
      "publishingPrinciples": "{ORGANIZATION_URL}",
      "logo": { "@type": "ImageObject", "url": "https://www.wowohcool.com/image/wowohcool-logo-optimized.webp", "width": 263, "height": 70 },
      "areaServed": ["US", "DE", "AT", "CH", "UK", "FR", "ES", "PL", "EU", "JP", "KR", "AU", "MX", "CO", "AR", "CL", "PE", "RU", "KZ", "BY", "EAEU"],
      "knowsAbout": [
        "OEM/ODM Power Bank Manufacturing",
        "Qi2 Wireless Charging Standard",
        "GaN Power Architecture",
        "Automotive Fast Charging Systems",
        "Custom Power Adapter Production",
        "Consumer Electronics Sourcing",
        "UL & CE Safety Compliance"
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "925, Yichuang International Center, Longhua District",
        "addressLocality": "Shenzhen",
        "addressRegion": "Guangdong",
        "postalCode": "518111",
        "addressCountry": "CN"
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
        "telephone": "+86-18620789739",
        "email": "info@wowohcool.com",
        "availableLanguage": ["English", "German", "Spanish", "French", "Russian", "Polish"]
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
      "wordCount": {ACTUAL_WORD_COUNT},
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
      "knowsAbout": ["{KNOWS_ABOUT_1}", "{KNOWS_ABOUT_2}", "{KNOWS_ABOUT_3}", "{KNOWS_ABOUT_4}", "{KNOWS_ABOUT_5}", "{KNOWS_ABOUT_6}"]
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
        { "@type": "Question", "name": "{FAQ_5_QUESTION}", "acceptedAnswer": { "@type": "Answer", "text": "{FAQ_5_ANSWER}" } }
      ]
    }
  ]
}
```

---

## 二、占位符语言映射表

| 占位符 | DE | EN | ES | FR | RU | PL |
|--------|-----|-----|-----|-----|-----|-----|
| `{LANG}` | `de-DE` | `en-US` | `es-ES` | `fr-FR` | `ru-RU` | `pl-PL` |
| `{ORGANIZATION_ID}` | `https://www.wowohcool.com/#organization` | `https://www.wowohcool.com/#organization` | `https://www.wowohcool.com/#organization` | `https://www.wowohcool.com/#organization` | `https://www.wowohcool.com/#organization` | `https://www.wowohcool.com/#organization` |
| `{ORGANIZATION_URL}` | `https://www.wowohcool.com/de/ueber-uns/` | `https://www.wowohcool.com/about/` | `https://www.wowohcool.com/es/sobre-nosotros/` | `https://www.wowohcool.com/fr/a-propos/` | `https://www.wowohcool.com/ru/o-kompanii/` | `https://www.wowohcool.com/pl/o-nas/` |
| `{WEBSITE_ID}` | `https://www.wowohcool.com/#website` | `https://www.wowohcool.com/#website` | `https://www.wowohcool.com/#website` | `https://www.wowohcool.com/#website` | `https://www.wowohcool.com/#website` | `https://www.wowohcool.com/#website` |
| `{SITE_URL}` | `https://www.wowohcool.com/de/` | `https://www.wowohcool.com/` | `https://www.wowohcool.com/es/` | `https://www.wowohcool.com/fr/` | `https://www.wowohcool.com/ru/` | `https://www.wowohcool.com/pl/` |
| `{SITE_NAME}` | `WOWOHCOOL` | `WOWOHCOOL` | `WOWOHCOOL` | `WOWOHCOOL` | `WOWOHCOOL` | `WOWOHCOOL` |
| `{HOME_LABEL}` | `Startseite` | `Home` | `Inicio` | `Accueil` | `Главная` | `Strona główna` |
| `{BLOG_URL}` | `https://www.wowohcool.com/de/blog/` | `https://www.wowohcool.com/blog/` | `https://www.wowohcool.com/es/blog/` | `https://www.wowohcool.com/fr/blog/` | `https://www.wowohcool.com/ru/blog/` | `https://www.wowohcool.com/pl/blog/` |

> **@id 规则（区别于 URL）**：`{ORGANIZATION_ID}` / `{WEBSITE_ID}` / `{AUTHOR_ID}` 全站唯一、**不带语言前缀**（如 `https://www.wowohcool.com/#organization`）——它们是实体标识符，指同一家公司，不是页面 URL。而 `{ORGANIZATION_URL}` 指向本地化 about 页，**必须带语言前缀**（如 `/de/ueber-uns/`）。

### 文章级占位符（每篇文章独立填写）

| 占位符 | 说明 | 示例（DE） |
|--------|------|-----------|
| `{H1_TITLE}` | H1 标题，50-65 字符，**不含品牌后缀**（`\| WOWOHCOOL` 仅用于 `<title>`） | `Ladegerät-Fabrik China: Audit-Leitfaden für Importeure 2026` |
| `{META_DESCRIPTION}` | Meta 描述，120-155 字符 | `Ladegerät-Fabrik China: WPC/Qi2-Audit, FOD-Test...` |
| `{ARTICLE_SHORT_TITLE}` | 面包屑短标题 | `Fabrikauswahl China` |
| `{CANONICAL_URL}` | 完整 canonical URL（末尾带 `/`） | `https://www.wowohcool.com/de/blog/fabrikauswahl-china-leitfaden/` |
| `{PUBLISH_DATE}` | 发布日期 `YYYY-MM-DD` | `2026-04-21` |
| `{MODIFIED_DATE}` | 最后修改日期 | `2026-07-27` |
| `{AUTHOR_ID}` | 作者 `@id`（Person 节点引用，BlogPosting.author 去重）。两个作者按专长交叉使用：`#snowy-may`（技术/认证类）、`#nina-nico`（采购/供应链类），完整信息见 `factory-data-canonical.md` §15 | `https://www.wowohcool.com/#snowy-may` |
| `{ACTUAL_WORD_COUNT}` | 实际主体字数（整数，无引号），验证方法见 §四 | `3100` |
| `{TIME_REQUIRED}` | ISO 8601 duration——**分钟必须 `PT` 前缀**（`PT14M` ✓；`P14M` = 14 个月 ✗），详见 §3.5.1 | `PT14M` |
| `{KEYWORD_1}` 等 | 文章关键词（≥3） | `GaN-Ladegerät` |
| `{ARTICLE_CATEGORY}` | 文章分类标签 | `GaN & Fast Charging` |
| `{OG_IMAGE}` | 封面图完整 URL | `https://www.wowohcool.com/image/blog/cover-de/...` |
| `{AUTHOR_NAME}` | 作者姓名 | `Nina Nico` |
| `{AUTHOR_LINKEDIN}` | 作者 LinkedIn URL（填入 `sameAs` 数组） | `https://www.linkedin.com/in/nico-power-bank-chargers` |
| `{AUTHOR_PAGE_URL}` | 作者页面 URL（**仅存在英文版**，六语言文章统一指向英文作者页：`/authors/snowy-may/` 或 `/authors/nina-nico/`，禁止本地化为 `/de/authors/...` 等） | `https://www.wowohcool.com/authors/nina-nico/` |
| `{AUTHOR_JOB_TITLE}` | 作者职位（B2B 采购相关，全站英文，见 `factory-data-canonical.md` §15.1） | `Global Procurement & Sourcing Manager` |
| `{AUTHOR_IMAGE}` | 作者头像 URL | `https://www.wowohcool.com/image/factory/team-nina.webp` |
| `{KNOWS_ABOUT_1}` 等 | 作者固定专长池（§3.3，**固定 6 值**），逐字复制 `factory-data-canonical.md` §15.2，同一作者全站统一，**不逐篇变化** | Snowy: `Qi2 Wireless Charging Standard` / `GaN Power Architecture` / `Thermal Management in Power Electronics` / `PCBA Efficiency Testing` / `UL 2056 & CE Safety Compliance` / `EU Battery Regulation 2023/1542`（Nina 的 6 值见 §3.3 表） |
| `{WIKIDATA_LABEL}` | 文章核心实体英文标签——**填 ID 前必查 `wikidata-entity-map.md`**（28 个已验证 ID + 45 个坏 ID 黑名单），表中没有的概念先经 API 核实再回填该表，**禁止凭记忆手填**（此错误复发 7+ 次） | `Battery charger` |
| `{WIKIDATA_URL}` | Wikidata 实体 URL——同上，**必须来自 `wikidata-entity-map.md` 已验证表** | `https://www.wikidata.org/entity/Q352917` |
| `{HOWTO_NAME}` | HowTo 名称 | `Eine seriöse Ladegerät-Fabrik in China auswählen` |
| `{HOWTO_DESC}` | HowTo 简述 | `Schritt-für-Schritt-Verfahren zur Verifikation...` |
| `{HOWTO_TOTAL_TIME}` | HowTo 总耗时 (ISO 8601)——**分钟必须 `PT` 前缀**（`PT15M` = 15 分钟 ✓；`P15M` = 15 个月 ✗，此错误已发生 5 次），语义分型与认证周期核实规则见 §3.5.1 | `PT15M` |
| `{STEP_1_NAME}` 等 | HowTo 步骤名（`HowToStep.name`，**动词开头**），`position` 按序 1/2/3 | `Zertifikate prüfen` |
| `{STEP_1_TEXT}` 等 | HowTo 步骤详情（`HowToDirection.text`，含具体操作细节），步骤多的文章按需复制整个 `HowToStep` 块 | `Fordern Sie das WPC-/CE-Zertifikat an und gleichen Sie die Modellnummer mit dem Produkt ab` |
| `{CITE_1_NAME}` 等 | 权威引用源名称 + URL | `WPC Product Registry` / `https://www.wirelesspowerconsortium.com/products` |
| `{FAQ_1_QUESTION}` 等 | FAQ 问答题对，**3-5 条（上限 5）** | 见 §三 FAQ 10 条规则（Rule 0-9） |

### Organization 级固定字段（全站统一，不设占位符）

以下字段在 `b2b-schema-template.json` 中**已硬编码为最终值**（2026-08-31），构建脚本不得再替换，六语言一律相同。数据来源：`factory-data-canonical.md` §1 / §1.1。字段值变更时，两处同步更新。

| 字段 | 固定值 |
|------|--------|
| `foundingDate` | `2013` |
| `vatID` | `91441900MA558A2N27` |
| `knowsAbout` | 7 值固定数组（§3.1 表：OEM/ODM Power Bank Manufacturing … UL & CE Safety Compliance），**全站所有页面（含博客文章页）** |
| `address.streetAddress` | `925, Yichuang International Center, Longhua District` |
| `address.addressLocality` | `Shenzhen` |
| `address.addressRegion` | `Guangdong` |
| `address.postalCode` | `518111` |
| `address.addressCountry` | `CN` |
| `contactPoint.telephone` | `+86-18620789739` |
| `contactPoint.email` | `info@wowohcool.com` |
| `{SERVICE_DESCRIPTION}`（产品/服务页用） | `End-to-end OEM/ODM charger manufacturing...` |
| `{SERVICE_TYPE}`（产品/服务页用） | `Manufacturing` |

仍保留占位符的仅限**文章级/语言级字段**：`{ORGANIZATION_URL}`（语言映射表）、`{SITE_URL}`、`{CANONICAL_URL}`、`{AUTHOR_*}`、`{KNOWS_ABOUT_*}`（作者池）、`{WIKIDATA_*}`、`{CITE_*}`、`{FAQ_*}`、`{HOWTO_*}` 等。

---

## 三、Schema 节点设计原理

### 3.0 knowsAbout 三维度分工总述（防止「硬编码」误解）

「全站 180 篇不要用一模一样的词」与「作者-主题绑定」**完全不矛盾**——它们说的是三个不同节点的分工：

| 维度 | 节点 | knowsAbout 规则 | 是否全站一致 |
|------|------|----------------|-------------|
| **作者维度** | `Person` | 按作者人设绑定：Snowy 用她固定的 6 个工程/研发/认证专长（Qi2/GaN/Thermal/PCBA/UL-CE/电池法规），Nina 用她固定的 6 个供应链/采购/验厂专长（Sourcing/OEM-ODM/QA/Trade Compliance/工厂审计）。**同作者全站一致，不同作者必须不同**——如果 Snowy 写芯片演进、Nina 写验厂避坑，两篇文章的 Person.knowsAbout 被硬编码成相同 6 词，才是「全站硬编码低质数据」 | 同作者一致，跨作者分化 |
| **文章维度** | `BlogPosting` | **不写 knowsAbout**；文章之间的差异与深度由 `about`（Wikidata 实体）、`keywords`、`headline`、`description` 动态承担（实测 174 篇全站 0 重复） | 每篇动态，禁止写死 |
| **公司维度** | `Organization` / `ManufacturingBusiness` | 全站共享唯一根实体 `#organization`，统一 7 个工厂核心制造与产品专长 | 全站 100% 一致 |

> **一句话**：全站层面靠「Snowy 专属 vs Nina 专属」打破 180 篇作者专长完全一致的硬编码；作者个人层面 Snowy 的 90 篇统一、Nina 的 90 篇统一（同专家写不同主题），符合 Google 实体图谱对真实人设的判定；公司层面 `#organization` 作为唯一根实体，7 值全站固定不随页面漂移。

### 3.1 Organization（必须，`@graph` 第一条）

**B2B 关键字段（v2 增强）**：

| 字段 | 用途 | GEO 影响 |
|------|------|---------|
| `legalName` | 对公验证、海关清关、合同匹配 | 实体消歧 |
| `foundingDate`（v2 新增） | 公司成立年份，B2B 信任信号 | 实体时效性 |
| `vatID`（v2 新增） | 增值税号 / 统一社会信用代码 | 实体可验证性 |
| `address`（v2 新增） | 完整 PostalAddress | 本地搜索 + Google 商家匹配 |
| `knowsAbout`（v2 增强） | 公司级别专长领域。**全站统一使用 7 个固定值——无论博客文章页还是非博客页面（Products / Services / About / Case Studies）**。`#organization` 是唯一根实体（Single Source of Truth），凡声明该实体的页面其 `knowsAbout` 必须 100% 一致；博客文章的**作者级**专长由 Person 节点承载（见 §3.3），两者互不替代。| 知识图谱实体分类 |
| `sameAs` | 跨平台实体关联（LinkedIn, YouTube, X, Facebook） | 知识图谱合并 |
| `contactPoint.telephone/email`（v2 增强） | 真实联系方式 | AI 确认可联系实体 |
| `contactPoint.contactType: "OEM/ODM Sales"` | 精准 B2B 意图信号 | AI 理解业务模型 |
| `areaServed` | 目标市场地理范围 | 本地化搜索 |

#### Organization `knowsAbout` — 统一 7 值（**全站所有页面，含博客文章**）

> **Scope（v2.2 修正）**: `#organization` 是唯一根实体（Single Source of Truth）。**Products / Services / About / Case Studies 等非博客页面与博客文章页面一律使用相同 7 值**——文章页的 Organization 若删去这 7 值会导致同一实体在不同页面属性缺失、产生节点定义漂移。博客文章的**作者级**专长由 Person 作者节点承载（见 §3.3），不因 Organization 带 7 值而重复到 Person。**禁止**任何页面（含博客）对该实体做 7 值之外的增删改写。

| # | 值 | 说明 |
|---|------|------|
| 1 | `OEM/ODM Power Bank Manufacturing` | 品牌方代工生产 |
| 2 | `Qi2 Wireless Charging Standard` | 无线充电技术标准 |
| 3 | `GaN Power Architecture` |  gallium nitride 功率架构 |
| 4 | `Automotive Fast Charging Systems` | 汽车快充系统 |
| 5 | `Custom Power Adapter Production` | 定制电源适配器生产 |
| 6 | `Consumer Electronics Sourcing` | 消费电子 sourcing |
| 7 | `UL & CE Safety Compliance` | 安全认证合规 |

**验证脚本**: `python3 check_org_knows.py` — 检查**全站所有页面**（非博客页 + 博客文章页），确认 Organization 节点 `knowsAbout` 包含上述全部 7 值且完全一致。

### 3.2 BlogPosting（核心信息节点）

| 字段 | 用途 | GEO 影响 |
|------|------|---------|
| `speakable` | AI 语音提取锚点，cssSelector `["h1", ".speakable"]`（3 节点：H1+Hook+Key Takeaways）。FAQPage 独立 speakable | +15% 语音搜索匹配 |
| `about.sameAs` | Wikidata 实体挂载，链接全球知识图谱 | **+5% AI 引用率** |
| `citation` | 列出的权威来源链，建立信任传递 | **+3% AI 引用率** |
| `wordCount` | 整数、无引号、已验证（见 §四） | Schema 验证 |
| `timeRequired` | ISO 8601，约 250 词/分钟 | 用户体验信号 |

**`about.sameAs` Wikidata 强制索引规则（禁止手填）**：`BlogPosting.about.sameAs` 的值**必须且只能**从 `context/wikidata-entity-map.md` 查询映射——该表是常用实体的唯一权威来源，含已验证的 28 个正确 ID 和 45 个坏 ID 黑名单（如 Q168774=美军步兵师、Q228055=瑞士高压线 曾被误用）。表中没有的概念：先到 wikidata.org 搜英文标签、核对定义与概念完全匹配后再填，**并回填进对照表**。**禁止**任何人工凭记忆手写或从别处复制无根引用；凡黑名单 ID 出现在全站即视为 Schema 错误（`check_org_knows.py` 自动拦截）。

### 3.3 Person（Author EEAT）

**作者专长绑定规则 (Author-Theme Binding)**：

博客文章的 `Person.knowsAbout` **仅出现在博客文章页面**，**不得复制 Organization 的 7 值**。根据文章主题绑定对应作者，并**逐字复制该作者的固定专长池**（唯一权威来源：`factory-data-canonical.md` §15.2）：

| 作者 | 主题类型 | `knowsAbout` (6 值) |
|------|----------|---------------------|
| **Snowy May** | 技术 / 研发 / 认证 / 合规 | `Qi2 Wireless Charging Standard`, `GaN Power Architecture`, `Thermal Management in Power Electronics`, `PCBA Efficiency Testing`, `UL 2056 & CE Safety Compliance`, `EU Battery Regulation 2023/1542` |
| **Nina Nico** | 采购 / 供应链 / 工厂选择 | `B2B Hardware Sourcing`, `OEM/ODM Power Bank Manufacturing`, `Supply Chain Quality Assurance`, `International Electronics Trade Compliance`, `Custom Power Adapter Production`, `Factory Audit Standards` |

**主题判断**：通过文章 H1 关键词匹配判断技术类 vs 采购类 — 技术词（certification, regulation, GaN, Qi2, UL, CE, testing, safety, standard, automotive, PD, thermal）→ Snowy；采购词（sourcing, importer, cost, MOQ, freight, customs, factory selection, negotiation, procurement）→ Nina。

**稳定性规则（不逐篇变化）**：同一作者的所有文章 `knowsAbout` 使用同一组固定值，不逐篇改写——搜索引擎将固定标签识别为「同一专家写不同主题」，这是正确信号而非同质化问题。**全站同质化的消除不在 knowsAbout 层**，而是依赖每篇文章动态生成的 `about`（Wikidata 实体）、`keywords`、`headline`、`description`——这三类字段必须根据文章内容独立填写，禁止全站写死。

**作者页与 URL 规则（禁止本土化）**：
- 作者页体系**仅存在英文版**：作者总页 `https://www.wowohcool.com/authors/` + 详情页 `/authors/snowy-may/`、`/authors/nina-nico/`。六语言文章的作者链接统一指向英文页面，禁止创建 `/de/authors/` 等本地化作者页
- LinkedIn URL / Avatar 路径 / Schema @id / Email 六语言保持英文原样（完整规则见 `factory-data-canonical.md` §15.1）
- 本土化仅作用于：bio 正文（§15.3 EN 母版）、职位头衔、avatar alt（§15.4 语言表）

**头像 alt 一致性**：① H1 下 Compact Author Bar ② 文末 Author Bio（CTA 上方）③ Person Schema `image` 三处的头像 alt 逐字一致，按 `factory-data-canonical.md` §15.4 语言表复制，禁止自由发挥。

**作者展示位（每篇文章强制）**：① H1 下 Compact Author Bar（§5.1 板块 1）；② 文末 Author Bio（§5.1 板块 11，位于 CTA 之前）。

**作者独占规则（话题簇不混写）**：每篇文章**有且仅有一位作者**。同一话题簇（同主题 + 簇内互链的一组文章）全部由同一作者撰写 — 技术/合规/认证簇归 Snowy，采购/供应链/验厂/成本簇归 Nina。禁止同簇换作者、双署名或接力补写（完整规则见 `factory-data-canonical.md` §15.2）。

**Schema ↔ 前端一致性**：Person.name / Person.jobTitle 必须与页面 Compact Author Bar、Author Bio 显示的姓名和职位**逐字一致**（同一语言、同一字符串）。职位以 `factory-data-canonical.md` §15.1 为唯一事实源；**职位头衔全站英文统一（方案 A），不本土化**——六语言页面 Schema 与前端一律使用英文头衔，禁止本土化职位串（详见 `factory-data-canonical.md` §15.3）。

6 项检查（5/6 即 83 分，6/6 需独立作者页面）：

1. ✅ 命名作者
2. ✅ 职位含 "OEM/ODM / Supply Chain / Sourcing / Procurement" 等 B2B 信号
3. ✅ LinkedIn URL
4. ✅ 头像图片
5. ✅ `worksFor` 关联 Organization
6. ✅ `knowsAbout` 使用作者固定专长池（见上表，权威来源 `factory-data-canonical.md` §15.2），同一作者全站统一；博客文章页面使用，非博客页面不包含 Person 节点

### 3.4 FAQPage（10 条强制规则：Rule 0-9）

| # | 规则 | 验证方法 |
|---|------|---------|
| 0 | **数量控制：3–5 个** | FAQPage 只保留 3-5 个核心问答（上限 5，模板占位符 {FAQ_1..5}）。FAQ 堆叠稀释 AI 抓取权重，超过 5 个易触发 Google 对泛化问答的算法降权 |
| 1 | **Body-Schema 逐字一致** | 正文 FAQ = JSON-LD FAQPage 完全相同 |
| 2 | **真实搜索需求** | 通过 WebSearch + site:alibaba.com 验证 B2B 买家查询 |
| 3 | **内容锚定** | 每个答案可追溯到正文具体段落 |
| 4 | **GEO 自包含** | AI 可单独提取任何 Q&A 对作为独立引用 |
| 5 | **决策链排序** | 规格→认证→定价→采购流程 |
| 6 | **量化答案** | 每条答案含 ≥1 个具体数字 |
| 7 | **末题 = CTA 桥梁** | 最后 1 题自然过渡到买家行动 |
| 8 | **格式差异化** | FAQ 用 50-150 字简明问答格式，与叙述性 H2 正文结构区分（同数据、不同呈现） |
| 9 | **交叉一致性** | FAQ 数据与 Key Takeaways、正文三方一致 |

### 3.5 HowTo（条件性 — 仅步骤类文章）

**适用范围**：标准操作规程（SOP）、工厂审核流程、选择与检验指南等步骤类文章。

**排除范围**：纯行业洞察、趋势分析、市场报告等非步骤类文章。若文章无明确步骤，**构建脚本必须在生成 JSON-LD 时将 `HowTo` 节点从 `@graph` 数组中完全移除**，避免 Google Search Console 报告空/无效 Schema 警告。

**规范**（适用时）：
- ≥3 个步骤
- 每个 `HowToStep.name` 用动词开头
- `HowToDirection.text` 包含具体操作细节

**单 HowTo 规则（硬性）**：每篇文章原则上**只允许 1 个主 `HowTo` 节点**，其 `@id` 必须固定为 `{CanonicalPageURL}#howto`。**禁止**同页出现多个 HowTo 共享同一 `@id`（会导致 Google 图谱解析覆盖/失效，JSON-LD 处理器行为不可预测）。如特殊情况下确需多 SOP，每个 HowTo 的 `@id` 必须加语义化后缀（如 `#howto-audit` / `#howto-select`），且主流程用 `#howto`、其余用后缀锚点。

**HowTo ↔ FAQ/正文 时长交叉验证规则（硬性）**：当页面 `FAQPage` 答案或正文明确给出流程周期区间（如「3-6 semanas」「10-12 semaines」「2-3 Tage」）时，`HowTo.totalTime` 的 ISO 8601 时长**必须完全落在该数值区间内**（换算为同一单位比较）。全站数据一致性是硬性要求——`HowTo.totalTime` 与 FAQ/正文自述周期互相打脸即视为 Schema 错误（`scan_howto_faq.py` 自动校验）。

### 3.5.1 `totalTime` 语义规则（防格式错误 + 防时长误填）

`totalTime` 表示「读者完成本 HowTo 步骤所需时长」，不是「海运/认证/生产的周期时长」。两处常见错误都必须避免：

**A. ISO 8601 格式错误（最底层 bug）**
- `P` 后跟数字 = 日期部分（年/月/周/日）；`PT` 后跟数字 = 时间部分（时/分/秒）
- `P30M` = 30 **个月**（≈900 天）；`PT30M` = 30 **分钟**。漏写 `T` 会让任何符合 ISO 8601 的解析器读成完全相反的时长
- **写分钟值必须用 `PT` 前缀**（`PT25M`、`PT30M`，不是 `P25M`、`P30M`）
- 写月份值才用 `P` 前缀（`P4M` = 4 个月），且仅当真实周期确实以月计

**B. 语义分型（按「步骤描述的是哪种活动」归口）**

| 语义簇 | 判定特征（步骤动词） | totalTime 值 |
|--------|---------------------|-------------|
| 桌面核查/测算/选型 | Verify / Compare / Calculate / Choose / Select（读数据、比价、算成本、查证书） | `PT2H` |
| 供应商甄选（含样品试订） | Shortlist + Order samples（有实际下单动作） | `P1W` |
| 现场 audit checklist | On-site inspection（驻场审核，4-6 小时实地） | `PT4H` |
| 全采购流程（下单→交付） | Define spec → production → delivery（覆盖完整交付链） | `P10W` |
| GaN V ODM 开发 | 新模具 + EVT/DVT 开发（依据 `factory-data-canonical.md` §3：ODM 开发 45-60 天） | `P60D` |

**C. 认证流程簇（周期值必须经外部权威数据核实，禁止多数派投票归一）**

| 认证类型 | 核实结论（2026-08） | totalTime 值 |
|---------|---------------------|-------------|
| Qi2 / WPC 认证 | WPC 全流程典型 8-12 周；走已有会员 OEM 预认证平台可缩至 3-5 周 | `P8W` |
| EU 电池法规 2023/1542 合规 | 全流程 9-20 周；德国 EPR（Stiftung EAR）注册单项 2-3 个月 | `P4M` |
| 危险品包装认证（UN38.3 + MSDS + 危包证） | 三证合计 30-60 天 | `P56D` |

> **规则**：认证周期值跨语言必须一致（同簇六语言同值）。若对周期拿不准，**先查权威来源（WPC 官网 / EU 官方文件 / 认证机构）核实再填**，不得凭出现频率归一——众数只解决「跨文章不一致」，不解决「这个众数本身对不对」。

### 3.6 `citation` 数组（GEO 增强）

列出 ≥3 个外部权威来源：
- 行业标准组织（WPC, USB-IF, IEC）
- 政府/监管机构（Stiftung EAR, BMWK, EU）
- 认证机构（TÜV, SGS, Bureau Veritas）
- 官方数据库（NECIPS, IAF CertSearch）

**市场标准引用规范（引用回退）**：
- 工厂第一手数据（MOQ、FOB、QC 指标、测试数据）→ 来源标注为 WOWOHCOOL QC/生产数据（引用 `factory-data-canonical.md`），**不挂外部标准引用**
- 非工厂的市场/技术声明（标准限值、协议参数、通用效率数字）→ 引用治理标准组织并在 `Sources` 区给链接；正文内嵌回退标注，按文章语言选用（完整语言表见 `factory-data-canonical.md` §15.5）：
  - EN: `(per IEEE / WPC industry-recognized standards)` · DE: `(gemäß IEEE-/WPC-Industriestandards)` · ES: `(según los estándares del sector IEEE/WPC)` · FR: `(selon les normes du secteur IEEE/WPC)` · RU: `(по общепринятым отраслевым стандартам IEEE/WPC)` · PL: `(zgodnie z uznanymi standardami branżowymi IEEE/WPC)`
### 3.7 不在博客模板内的节点

| 节点/字段 | 博客文章是否需要 | 说明 |
|-----------|-----------------|------|
| `SearchAction` | 否 | 功能已失效，非必需。不要在博客 JSON-LD 中添加。 |
| `Product` / `Service` | 否 | 仅产品/服务页需要，博客文章模板不包含这两个节点。 |
| `Person` | 仅博客文章 | 博客文章需要作者 Person 节点（`knowsAbout` 使用作者专属 6 值）。非博客页面**不包含** Person 节点，专长由 Organization 的 `knowsAbout`（7 值）承载。 |

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
 3. Featured Image   封面图 2240×1260，<img src> only（NO srcset/sizes，无 variant 文件）
 4. Key Takeaways    KEY TAKEAWAYS，amber 卡片，3-5 条要点 + TL;DR ⓢ
 5. Key Metrics      可选，数据指标卡片
 6. Table of Contents 含 #faq 锚点
 7. ~~Factory Data~~  已废弃 — 工厂数据已融入 Author Bio 的 Factory Footprint（§5.1 板块 11），单独卡片属页面冗余，勿再使用
 8. H2 Sections ×N   标准灰底卡片，嵌入式 Expert Insight + Factory Stat
 9. Conclusion       可选，依文章而定 — 总结 + 实操流程，不含重复链接 ⓕ
10. FAQ               id="faq"，9 条规则
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
[ ] KEY TAKEAWAYS 含 3-5 条量化要点
[ ] HowTo Schema 已添加（如有步骤流程）
[ ] 图片 alt text 含 B2B 关键词
[ ] 封面图 <img src> only（NO srcset/sizes）+ loading="eager" + fetchpriority="high"
[ ] dateModified 更新为当天日期
[ ] wordCount 为整数（无引号），且通过 §四 验证
[ ] FAQ body-schema 逐字一致（§三 Rule 1）
[ ] FAQ 数量 3-5 条（上限 5，Rule 0），全部通过 WebSearch 验证（Rule 2）
[ ] ≥2 外部权威链接（权威机构/标准/政府 → rel="noopener external" 保留 referrer；商业/竞品 → rel="noopener noreferrer nofollow"）
[ ] ≥3 内部链接到产品页/服务页/相关文章
[ ] ≥3 citation 条（来自行业标准/政府/认证机构）
[ ] about.sameAs Wikidata 实体挂载
[ ] CTAs: 内联 gradient CTA + 页面级 blog-cta.njk
[ ] speakable cssSelector: ["h1", ".speakable"]（BlogPosting，3 节点）。FAQPage 独立 speakable: [".faq-answer"]。SCHNELLANTWORT/RESPUESTA RÁPIDA 禁止存在
[ ] Expert Insight 嵌入在 H2 Section 内（非独立在文章末尾）
[ ] Organization 节点含 legalName + url + publishingPrinciples + logo + sameAs + contactPoint
[ ] Organization url/publishingPrinciples 按语言映射（§二映射表）
[ ] Organization knowsAbout = 7 值全站统一（**含博客文章页**，§3.1），禁止对 #organization 根实体增删改写
[ ] 每篇仅 1 个主 HowTo 节点，@id = {CanonicalURL}#howto 唯一；多 SOP 用语义化后缀 #howto-audit / #howto-select
[ ] HowTo.totalTime 落在 FAQ/正文自述周期区间内（§3.5 交叉验证），分钟值用 PT 前缀（PT25M 非 P25M）
[ ] about.sameAs 从 context/wikidata-entity-map.md 查表复制，无黑名单 ID（check_org_knows.py 自动拦截）
[ ] Organization/WebSite/Person @id 全站唯一、不带语言前缀（§二 @id 规则）
[ ] Person knowsAbout = 作者固定专长池逐字复制（§3.3），同一作者全站统一，非博客页面无 Person 节点
[ ] 作者链接（LinkedIn/作者页/头像/@id）全站英文原样，无本土化改写；作者页仅英文版（/authors/ 总页 + 两个详情页）
[ ] 头像 alt 三处一致（Author Bar / Author Bio / Person.image），按 factory-data-canonical.md §15.4 语言表
[ ] 作者展示位齐全：H1 下 Compact Author Bar + 文末 Author Bio（CTA 之前）
[ ] 每篇文章唯一作者；同话题簇全部同作者，不混写/双署名/换人
[ ] Person.name/jobTitle 与前端 Author Bar / Author Bio 显示逐字一致（同一字符串）
[ ] 非工厂市场数据带引用标注（§3.6 回退格式），工厂第一手数据引用 factory-data-canonical.md
```

### 标准变更迁移铁律（2026-09-01，实证封口）

> **任何标准数值/结构变更（MOQ 档位、AQL、FAQ 数量、speakable 架构、日期格式、命名规范、citation 形状等）在提交本文件前，必须完成三步：**
> 1. **全站迁移扫描**：`PYTHONUTF8=1 python ../seomachine/data_sources/modules/metadata_site_audit.py`（174 篇 blog 全扫）
> 2. **存量归零**：所有 CRITICAL 修复完毕（改内容对齐新标准，或确认属「标准不回溯」类并记录）；WARN 逐条定性（真实漂移 vs 旧标准合法）
> 3. **版本历史登记**：§八 记录变更内容 + 迁移完成状态
>
> **构建强制门（双拦截的出口侧）**：`npm run build` / `deploy` 第一环是 `prebuild_gate.py`（i18n lint + 元数据审计）——**CRITICAL > 0 构建直接失败**，未迁移的存量无法进入部署产物。写作侧入口：`check_new_article.py <file>`（5 步门禁）。
>
> **实证依据**：2026-09-01 全站元数据审计。标准 5 次演进（FAQ 5-8→3-5、speakable v3.0、AQL 2.5→0.65、MOQ 三档、citation 形状）每次都制造一批存量违规且从未迁移——累计 71 CRITICAL / 289 WARN，横跨 6 语言 174 篇。错误按「发布日期 cohort」成簇分布（knowsAbout 错放全部落在标准诞生前的 2026-03/04；PL 异形 schema 全部来自 2026-08 PL 建站会话），证明「标准晚于内容 + 演进无迁移 + 复制遗传」是三大根源。本铁律封死第三条。

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
| v2.5 | 2026-09-01 | **标准变更迁移铁律**（§六新增，实证封口）：任何数值/结构变更提交前必须 ① 全站迁移扫描 ② CRITICAL 归零 ③ 版本历史登记；构建强制门 `prebuild_gate.py` 挂入 `npm run build` 第一环（i18n lint + 元数据审计，CRITICAL>0 构建失败）。依据：当日审计实证——标准 5 次演进均未迁移存量，累计 71 CRITICAL/289 WARN 按发布日期 cohort 成簇 |
| v2.4 | 2026-09-01 | 占位符表防错注解（把审核阶段高频错误前移到填表时刻）：① `{HOWTO_TOTAL_TIME}` / `{TIME_REQUIRED}` 行内加 **PT 前缀警告**（P15M=15 个月 vs PT15M=15 分钟，此格式错误发生 5 次）并指针 → §3.5.1；② `{WIKIDATA_*}` 行内加 **`wikidata-entity-map.md` 必查指针**（手填错 ID 复发 7+ 次）；③ §一 加**最小骨架说明**（FAQ 占位符 5 块 = Rule 0 上限、实际 3-5；HowTo 3 步 = 下限、按需复制） |
| v2.3 | 2026-08-31 | 新旧标准摩擦裁决（基于 vs `seo-guidelines.md` 上游基线审查）：① 头部注入**权威优先级覆盖声明**（与 seo-guidelines 冲突时以本文档为准，不修改上游源码）；② **FAQ 数量统一 3-5（上限 5）**——JSON 模板占位符从 {FAQ_1..8} 收敛为 {FAQ_1..5}，§3.4 补 Rule 0 数量控制（10 条规则 Rule 0-9）；③ §5.1 板块 7 Factory Data **标注废弃**（融入 Author Bio 的 Factory Footprint）；④ rel 属性修正——权威机构/标准/政府用 `rel="noopener external"` 保留 referrer，商业/竞品才 `noreferrer nofollow`（去除此前「权威链接加 noreferrer」的误写）；§六 质量门 FAQ 检查项同步 |
| v2.2 | 2026-08-31 | 裁决闭环（基于今日全站审计发现）：① §3.1 修正自相矛盾——Organization `knowsAbout` 7 值全站统一（**含博客文章页**），`#organization` 为唯一根实体，禁止删减；② §3.5 新增单 HowTo 规则（每篇 1 个主 HowTo，@id=#howto 唯一，多 SOP 用语义化后缀）；③ §3.5 新增 HowTo↔FAQ/正文时长交叉验证（totalTime 必须落在自述周期区间内）；④ §3.2 新增 about.sameAs 强制索引规则（必须查 context/wikidata-entity-map.md，禁止手填，黑名单自动拦截）；§六 质量门 +4 项；同步 check_org_knows.py / scan_howto_faq.py 自动化 |
| v2.1 | 2026-08-31 | §3.3 knowsAbout 改为作者固定专长池全站统一（不逐篇变化），同质化由 about/keywords/headline/description 承担；新增作者页 URL 禁止本土化规则（作者页仅英文版：/authors/ 总页 + 两个详情页）；新增作者独占规则（每篇文章唯一作者，话题簇不混写/双署名）；新增 Schema ↔ 前端作者姓名职位逐字一致规则；新增头像 alt 三处一致性规则；新增作者展示位强制规则（H1 下 Author Bar + CTA 前 Author Bio）；§3.6 新增市场标准引用回退规范；§六 质量门新增 7 项作者/引用检查 |
| v2.0 | 2026-07-29 | Organization 增强（address, foundingDate, vatID, knowsAbout, telephone/email）；BlogPosting.author 改为 @id 引用去重；移除博客模板中的 Product/Service 节点，SearchAction 标记为已失效非必需；wordCount 占位符改名 {ACTUAL_WORD_COUNT}；Person 增加 @id；HowTo/FAQPage 增加 @id；移除 Quick Answer 板块；SCHNELLANTWORT 标记废弃 |
| v1.0 | 2026-07-27 | 初始版本。合并 EN 模板 + DE 优化，统一 4 语言映射表、完整 JSON-LD 模板、FAQ 8 规则、wordCount 验证方法、B2B 质量门清单 |
