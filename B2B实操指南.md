# B2B 文章实操指南 — 从研究到发布的完整操作手册

**适用站点**: wowohcool.com (DE/EN/ES/FR)
**适用领域**: B2B 充电设备/电源/储能外贸供应链
**最后更新**: 2026-08-05
**基于**: certif-qi2 + charge-pd 两篇 FR 文章完整优化 + /b2b-audit 18-check 扩展

---

## 核心原则

每篇文章必须同时满足三个标准，缺一不可：

| # | 标准 | 权威源 | 自动覆盖 |
|---|------|--------|:--:|
| 1 | B2B 质量 | `context/b2b-blog-quality-audit-standard.md` | 80% (/b2b-audit) |
| 2 | 模板样式 | `context/blog-template-standard.md` | 40% (手动为主) |
| 3 | 元数据 | `context/b2b-schema-template.json` + `context/b2b-multilingual-metadata-standard.md` | 85% (/b2b-audit) |

辅助数据源: `context/factory-data-canonical.md` (工厂数据唯一真相源)

### 不要做的事

- ❌ 不要用英文搜索 SERP 后翻译成其他语言
- ❌ 不要在 B2B 文章中使用 stock photo（握手、西装、通用工厂图）
- ❌ 不要写 "In today's digital world..." 这类 AI preamble 开头
- ❌ 不要在 B2B 文章中使用 "Buy now"、"Click here"、"Start free trial" 这类 B2C CTA
- ❌ 不要碰 B2C 泛词（"What is a GaN charger"、"best power bank"）

---

## 一、工作流（B2B 先过结构，SEO 后做抛光）

### 关键原则

B2B 质量门的改动是结构性的（H1 信号词、工厂数据密度、FAQ 采购语言、Schema），**必须先过**。反过来做：花 30 分钟调完关键词分布 → B2B 审计发现 FAQ 全是消费者语言要重写 → 关键词分布全部作废。

### 创建新 B2B 文章

```
/research [topic]                  ← 目标语言搜索（如西班牙语关键词，不是翻译英文 SERP）
    │
    ▼
/write-b2b [topic]                   ← 🔴 直接产出 .njk 模板（Schema 7 节点 + 15 板块 + .speakable）
    │
    ▼
/b2b-audit [file]                  ← 🔴 B2B 质量门 — 结构性检查（18 checks）
    │
    ├─ 修复结构性缺陷:
    │   ├─ H1 加 B2B 信号词（50-65 chars）
    │   ├─ 补充工厂数据（对齐 factory-data-canonical.md）
    │   ├─ FAQ 改为 B2B 采购语言
    │   ├─ Schema 完整（7 节点，JSON-LD v2）
    │   ├─ 15 板块结构到位
    │   ├─ 法规本土化（FR→DGCCRF, DE→Stiftung Warentest）
    │   └─ 竞争洞察嵌入 Hook
    │
    ▼
/optimize [file]                   ← 通用 SEO 精修（SEO Machine 原版技能）
    │
    ├─ 微调:
    │   ├─ 关键词密度 1-2%
    │   ├─ Meta title 50-60, Meta desc 120-155
    │   ├─ 内链 3-5+, 外链 2-3+
    │   └─ 可读性 8-10 年级
    │
    ▼
/b2b-audit [file]                  ← 🟢 最终验证 >= 90
    │
    ▼
/scrub [file]                      ← 清除 AI 水印
    │
    ▼
手动转 .njk → git push → Cloudflare Pages 部署
```

### 优化已有 B2B 文章

```
/b2b-audit [file]                  ← 先暴露 B2B 结构问题
    │
    ▼
修复 B2B 问题（按审计报告逐项）
    │
    ▼
/optimize [file]                   ← SEO 细调
    │
    ▼
/b2b-audit [file]                  ← 确认 >= 90
    │
    ▼
/scrub [file]
```

### 快速 B2B 合规检查（不改文章只检查）

```
/b2b-audit [file or URL]
    ↓ 产出: audits/b2b-audit-[slug]-[date].md
    ↓ 18 项检查一次性完成
```

### 可选附加步骤

| 步骤 | 命令 | 适用场景 |
|------|------|---------|
| 深度 SERP 分析 | `/research-serp [keyword]` | 关键词竞争度高、需要精确竞品内容对标 |
| AI 引用审计 | `geo-citability` | 核心博客发布后，检查 AI 引用可能性 |
| Schema 验证 | `geo-schema` | JSON-LD 报错时 |
| 技术 SEO | `geo-technical` | 网站改版后、发现索引问题 |
| IndexNow 通知 | `python data_sources/modules/indexnow_submitter.py --urls "..."` | 部署后立即通知 Bing + Yandex |

### B2B 核心命令速查

| 命令 | 用途 | 产出 |
|------|------|------|
| `/write-b2b [topic]` | 🔴 直接创建 B2B .njk 文章（Schema 7 节点 + 15 板块 + .speakable） | `src/{lang}/blog/{slug}/index.njk` |
| `/b2b-audit [file]` | B2B 18 项质量检查 + 信息增益分析 | `audits/b2b-audit-*.md` |
| `/research [topic]` | 关键词研究 + 竞品分析 + 写作简报（通用 SEO Machine） | `research/brief-*.md` |
| `/optimize [file]` | 通用 SEO 精修（关键词密度、meta、内链、可读性） | `drafts/optimization-report-*.md` |
| `/scrub [file]` | AI 水印清洗 | 原地修改 |

---

## 二、`/b2b-audit` 19 项自动检查

### 内容质量 (Check 1-6)

| # | 检查 | 检测内容 | 扣分规则 |
|:--:|------|------|------|
| 1 | Opening Density | 前 3 句直接结论, AI fluff 检测 | fluff -30/ea, 无结论 -40 |
| 2 | TL;DR Block | KEY TAKEAWAYS amber 卡片存在 | 全块=100, 仅列表=60, 缺失=0 |
| 3 | H3 Answer Length | 每个 H3 后第一句 ≤150 char 结论（answer-first） | 合规比例=分数 |
| 4 | Vague Headings | 标签式标题 ("Testing"), 结论式标题 | -15/ea |
| 5 | H2 B2B Density | 分层密度 technical 10-40%, procurement 30-55%, oem_core 50-80% | 范围内=100 |
| 6 | Data Density | >=3 精确数字+单位/1000 词 | 分级: >=3=100, 2-2.9=70, 1-1.9=40, <1=10 |

### 信任与转换 (Check 7-11)

| # | 检查 | 检测内容 | 扣分规则 |
|:--:|------|------|------|
| 7 | Table Test | 技术参数在表格中 | 存在=100, 参数在 prose=40 |
| 8 | Stock Photo | 库存图片域名 | -25/img |
| 9 | FAQ B2B Language | 问题侧(20%)+答案侧(80%) B2B 词汇 | 加权分 |
| 10 | Author E-E-A-T | 6 项: 姓名/职位/LinkedIn/作者页/头像/专长 | 每项 20pts |
| 11 | Weak CTA | B2B 价值延续 vs B2C | Good=100 |

### 技术与一致性 (Check 12-19)

| # | 检查 | 检测内容 | 扣分规则 |
|:--:|------|------|------|
| 12 | Heading Hierarchy | H1→H3 或 H2→H4 跳级 | -25/skip |
| 13 | URL Quality | 下划线/大写/日期/停用词/词数 | 逐项扣 |
| 14 | Schema Validation | JSON-LD 语法+必填字段+斜杠+speakable 对齐 | 语法错 -30, 缺字段 -15 |
| 15 | Cross-Reference | TL;DR vs 正文 vs FAQ 数据一致性 | 偏差 -20/ea |
| 16 | Factory Data Canonical | 14 项工厂数据验证 | 偏差 -15/ea |
| 17 | Static HTML Quality | NO srcset/fetchpriority/speakable/TOC bug | 逐项扣 |
| 18 | Anti-Pattern Detection | 4 类反模式 | 见下方 |
| 19 | Accent/Spelling (i18n) | 语言专属重音/拼写正确性 | 逐项扣 |

### Check 18 反模式检测明细

| 反模式 | 扣分 | 检测方式 |
|--------|:--:|------|
| REPONSE RAPIDA / SCHNELLANTWORT / Quick Answer | -25/ea | 正则, 大小写不敏感 |
| TL;DR 独立 block | -15/ea | 正则 "TL;DR" |
| Cross-Links (与 Related Articles 重叠) | -10/ea | 正则 "Guides connexes\|Cross-Links" |
| Data Dump Intro (>3 段 `<p>`) | -15 | 启发式计数 (第一个 H2 前的 `<p>` 数) |

### 仍需手动 (审计器无法检测)

| 项目 | 原因 | 检查方法 |
|------|------|---------|
| 竞争洞察嵌入 Hook | 自然语言判断 | 朗读 Hook: 是否有 1 句点出信息真空? |
| 法规本土化 (FR→DGCCRF, DE→Stiftung Warentest) | 需要外部知识库 | 检查法规引用 |
| FAQ body-schema 逐字一致 | 精确文本对比 | 逐题对比正文 FAQ 与 JSON-LD |
| 图片 alt 含 B2B 信号词 | 语义判断 | 检查 alt 属性 |
| hreflang 四向映射 | cross-file | 检查 4 个文件的 enPath/dePath/esPath/frPath |
| 15 板块排序 | 语义理解 | 对照下方板块顺序 |
| 工厂 moat 数据嵌入 | 自然语言 | 搜索 "200+ marques" / "4 etapes" / "0,3 %" / "100 %" |

---

## 三、手动优化清单

### A. JSON-LD Schema v2（7 节点必检）

```
[ ] Organization: legalName + publishingPrinciples + logo + address(6 fields) + sameAs + contactPoint(telephone + email)
[ ] WebSite: name("WOWOHCOOL", 不带语言后缀) + inLanguage + publisher @id ref
[ ] BreadcrumbList: 3 levels, 所有 URL 末尾带 /
[ ] BlogPosting: @id + headline + keywords[8-12] + author @id ref(非 inline Person!) + datePublished + dateModified + wordCount(integer!) + speakable["h1",".speakable"] + citation[3] + about.sameAs(Wikidata)
[ ] Person: @id + jobTitle + url(author page) + sameAs[LinkedIn] + image + worksFor @id ref + knowsAbout[3-5]
[ ] HowTo: @id + 3-6 steps(HowToDirection 格式)
[ ] FAQPage: @id + speakable[".faq-answer"](独立于 BlogPosting) + 8 questions(与正文逐字一致)
```

### B. 15 板块结构（排序固定）

```
 1. Hero           <nav> 面包屑 → 3 个橙色 pill 标签 → H1(50-65, 含 B2B) → Compact Author Bar(头像+姓名+职位) → 日期行(<time datetime>, 无更新日期, 阅读时间, 作者名)
 2. Hook           .speakable, <=2 段, 嵌入竞争洞察 1 句
 3. Featured Image <img src> only (NO srcset/sizes) + fetchpriority="high"
 4. Key Takeaways  amber 卡片, TL;DR .speakable, 3-5 bullet
 5. Key Metrics    可选, 数据指标卡片
 6. TOC            bg-brandBlue, 含 #faq 锚点, !text-white 前必须有空格
 7. Factory Data   工厂数据卡片(面积/员工/R&D/产能/认证) ⓕ
 8. H2 xN          bg-slate-50 rounded-xl p-6, 表格 bg-brandBlue thead
 9. Conclusion     可选, 总结 + 实操流程, 不含重复链接 ⓕ
10. FAQ            id="faq", bg-slate-50 rounded-2xl, 8 题, 每答 >=1 数字, body-schema 逐字一致
11. Author Bio     id="author-bio", + Empreinte Usine(4 格: 5000m2 / Since 2013 / 50+ pays / 50+ R&D)
12. CTA            gradient from-brandBlue to-slate-800, 2 按钮, h2 标题
13. Related        <aside>, card 格式, gradient bar, 3 张, 链接用语言前缀, 指向现有页面
14. Sources        list-disc, 权威 rel="noopener external", 商业 rel="noopener noreferrer nofollow"
15. blog-cta.njk   页面级 contact form
```

### C. 研究数据落地

| 数据 | 位置 | 方式 |
|------|------|------|
| 竞品分析 | Hook | 嵌入 1 句 (与 EN/DE/ES 一致: 不独立板块) |
| 市场数据 | 第 7 节 | 表格化, 不在 Intro 堆砌 |
| SERP 空白 | Hook | 嵌入 "aucune ressource en [langue] ne couvre..." |
| FOB 价格 | Sourcing 小节 | 表格, 对齐 factory-data-canonical.md |

### D. 工厂数据分层运用

| 层级 | 数据 | 位置 | 触发场景 |
|------|------|------|---------|
| 每篇必有 | 5000m2, ISO 9001, since 2013, 50+ R&D | Empreinte Usine | 页脚默认 |
| 场景触发 | 200+ brands | WOWOHCOOL 蓝盒 / STAT 盒 | 证明交付记录 |
| 场景触发 | 4-stage QC (IQC-IPQC-FQC-OQC) | 同上 | 证明质量体系 |
| 场景触发 | 100% 4h aging test | 同上 | 证明全检非抽检 |
| 场景触发 | <0.3% defect rate | 同上 | 证明长期可靠性 |

用法: 合成 1 句, 不硬广。例:
> notre controle qualite en 4 etapes (IQC-IPQC-FQC-OQC) avec 100 % de test de vieillissement de 4 heures garantit un taux de defaut inferieur a 0,3 %, valide sur plus de 200 marques servies dans 50+ pays.

---

## 四、各语言差异

| 元素 | EN | DE | ES | FR |
|------|----|----|----|-----|
| `inLanguage` | `en-US` | `de-DE` | `es-ES` | `fr-FR` |
| Org @id | `/#organization` | `/de/#organization` | `/es/#organization` | `/fr/#organization` |
| 日期格式 | Mon DD, YYYY | DD.MM.YYYY | DD de Mon de YYYY | DD mois YYYY |
| KEY TAKEAWAYS | KEY TAKEAWAYS | KERNERKENNTNISSE | PUNTOS CLAVE | POINTS CLES |
| FAQ 标题 | Frequently Asked Questions | Haufig gestellte Fragen | Preguntas Frecuentes | Foire Aux Questions |
| Sources 标题 | Sources & References | Quellen & Referenzen | Fuentes & Referencias | Sources & References |
| 工厂足迹标签 | Factory Footprint | Fabrik-FuBabdruck | Huella de Fabrica | Empreinte Usine |
| 阅读时间 | min read | Min. Lesezeit | min de lectura | min de lecture |
| 作者标签 | Author | Autor | Autor | Auteur/Autrice |
| 引号 | "straight" | "deutsch" | "latin" | "guillemets" |
| 首页 | Home | Startseite | Inicio | Accueil |
| 竞争洞察句式 | no English guide | keine deutsche Ressource | ninguna guia en espanol | aucune ressource en francais |

### 法规本土化 (2026)

| 市场 | 必须引用的法规/机构 |
|------|--------------|
| FR | DGCCRF, ANFR, decret 2023-1271, DEEE (Ecosystem/Ecologic), Triman, Loi Toubon, EN IEC 63563 |
| DE | Stiftung Warentest, DIN, ProdSG, GS-Zeichen, Stiftung EAR, VerpackG, Batteriegesetz |
| ES | AENOR, BOE, AEAT, UNE-EN, certificaciones LATAM (IRAM, NOM, ANATEL) |
| EN | FCC, UL, CPSC, Prop 65, Section 301 tariffs, USMCA |

---

## 五、发布前自检

### 自动验证

```
[ ] /b2b-audit >=90
```

### 内容质量 (Gate 1-2)

```
[ ] H1 50-65 chars, 含 B2B 信号词 (该语言)
[ ] Hook .speakable, <=2 段, 嵌入竞争洞察 1 句
[ ] POINTS CLES / KEY TAKEAWAYS amber 卡片 + TL;DR .speakable, 3-5 bullet
[ ] 工厂 moat: QC + aging + defect + brands >=3 项
[ ] 市场数据表格化, 不在 Intro 堆砌
[ ] 法规引用: 本地机构 (不用对岸的)
```

### Schema & 元数据 (Gate 3)

```
[ ] JSON-LD json.load() 通过
[ ] wordCount integer, +-5% 实测值
[ ] speakable: BlogPosting["h1",".speakable"], FAQPage[".faq-answer"]
[ ] BlogPosting.author = @id ref (非 inline Person)
[ ] Meta title 50-60, Meta desc 120-155
[ ] dateModified = 当天
[ ] 阅读时间匹配 Schema timeRequired
```

### 结构 & 板块 (Gate 4)

```
[ ] 15 板块顺序正确
[ ] FAQ id="faq", 8 题, body-schema 逐字一致, 每答 >=1 数字
[ ] Author Bio + Empreinte Usine (4 格)
[ ] CTA gradient, 2 按钮, h2 标题
[ ] Related Articles card 格式, 链接可访问
[ ] Sources list-disc, rel 按权威/商业分级
```

### 技术 & 多语言 (Gate 5)

```
[ ] 无反模式 (Check 18 = 100)
[ ] 图片 alt 含 B2B 信号词, 无 stock photo
[ ] Featured Image <img src> only (NO srcset/sizes) + fetchpriority="high"
[ ] hreflang 四向正确, 无旧 slug, 无缺 trailing /
[ ] /scrub = 0 watermark
[ ] 构建 = 0 errors
```

---

## 六、Git 提交格式

```bash
cd C:\Users\wowoh\wowohcool.com
git add -A
git commit -m "feat(lang): short description"
git push origin main
```

示例:
- `feat(fr): optimize certification-qi2-importateurs to v2 schema + FR standard`
- `fix(fr): hreflang bidirectional mapping across 4 languages`
- `feat(fr): embed factory moat data into WOWOHCOOL box`
- `docs: add audit reports + research briefs for car charger and GaN V OEM guides (FR)`

---

## 七、评分标准速查

### B2B 审计综合分

| 分数 | 等级 | 含义 | 行动 |
|------|------|------|------|
| 90-100 | A | B2B 合规优秀 | 可以直接发布 |
| 75-89 | B | 良好，有小问题 | 修复 flagged items 后发布 |
| 60-74 | C | 一般，有明显问题 | 必须修复 warnings 后重新审计 |
| 40-59 | D | 差，多个维度不达标 | 需要显著修改 |
| <40 | F | 严重不达标 | 不能发布，需要大修或重写 |

### 信息增益分

| 分数 | 级别 | 含义 |
|------|------|------|
| 70-100 | High | 内容有显著差异化，Google 会奖励 |
| 40-69 | Moderate | 有一定独特性，但可进一步加强 |
| 20-39 | Low | 与 SERP 内容重叠度高，需要加入独家数据 |
| 0-19 | Zero | 零信息增益，Google 会压制 |

### H2 B2B 密度分层

| 文章类型 | 目标范围 | 典型文章 |
|---------|---------|---------|
| Technical/Educational | 10-40% | mAh 指南、GaN 原理、USB PD 规格、安全标准 |
| Procurement/Supply Chain | 30-55% | 物流、工厂选择、采购指南、QC 指南 |
| OEM/ODM Core Topic | 50-80% | OEM vs ODM 对比、制造商目录、私有标签指南 |

**B2B 信号词全集**（15 个）：OEM, ODM, manufacturer, factory, supplier, importer, sourcing, MOQ, FOB, B2B, procurement, wholesale, bulk, supply chain, vendor

---

## 八、B2B → GEO 桥接速查

B2B 审计结果可反馈给 GEO citability 评分。详见 `.claude/skills/seo-audit/references/b2b-geo-bridge.md`。

| B2B 审计发现 | GEO 调整 |
|-------------|---------|
| Data Density ≥80 | Statistics **+10** |
| Data Density <40 | Statistics **-15** ⚠️ |
| Author E-E-A-T ≥80 | Authoritative Tone **+8** + Quotation **+8** |
| Author E-E-A-T <40 | Authoritative Tone **-10** |
| Stock Photos 检测到 | Authoritative Tone **-10** |
| Information Gain "high" | 总体 GEO **+15** |
| Information Gain "zero" | 总体 GEO **-25** 🔴 严重 |
| TL;DR Block 存在 | Easy-to-Understand **+5** |
| FAQ B2B 语言 ≥70% | FAQPage Schema **+8** |
| FAQ 消费者语言 | FAQPage Schema **-5** |
| H2 B2B 密度在目标范围 | Unique Words **+5** |

---

## 九、常见工作流速查表

### 9.1 "我现在应该用哪个命令？"

```
我有一个新话题想写
  ├─ 没做过研究 → /research [topic]  ← 目标语言搜索
  ├─ 有研究简报了 → /write [topic] → /b2b-audit → 修复 → /optimize → /b2b-audit
  └─ 不确定值不值得写 → /research-gaps 或 /research-trending

我有一篇刚写完的草稿
  ├─ 刚写完还没清洗 → /scrub [file]
  ├─ 想知道 B2B 合规度 → /b2b-audit [file]
  ├─ 准备发布了 → /optimize [file] → /b2b-audit [file]
  └─ 优化分不够 → 按优化报告的 critical issues 逐条修复 → 再跑 /optimize

我有一篇已发布文章
  ├─ 不知道表现如何 → /analyze-existing [URL]
  ├─ 表现下降了 → /analyze-existing [URL] → /rewrite [topic]
  └─ 需要快速 B2B 检查 → /b2b-audit [URL]

我不知道下一篇写什么
  ├─ 有 GA4 数据 → /performance-review
  ├─ 有明确方向但缺话题 → /research-topics
  ├─ 有话题但缺优先级 → /priorities
  └─ 想系统性覆盖某主题 → /cluster [topic]

我想提升 AI 搜索可见性
  ├─ 全站审计 → geo-audit
  ├─ 单篇文章 → geo-citability
  ├─ Schema 检查 → geo-schema
  └─ llms.txt 生成 → geo-llmstxt
```

### 9.2 批量审计

```bash
# 对某语言全部文章跑 B2B 审计
for dir in C:\Users\wowoh\wowohcool.com\src\blog\*/; do
  python data_sources/modules/b2b_content_auditor.py "${dir}index.njk"
done
```

### 9.3 竞品对标（确保信息增益）

```
/research-serp [keyword] → 获取 SERP top 10 内容
→ 将竞品内容保存为 .md 文件
→ python data_sources/modules/information_gain_analyzer.py my-draft.md comp1.md comp2.md ... comp5.md
→ 查看 Mode A 的 Jaccard 相似度 → 确保 < 0.5
```

---

## 十、Python 模块直接调用

```bash
# 18 项 B2B 质量检查（最常用）
python data_sources/modules/b2b_content_auditor.py [file] [article_type]
# article_type: technical | procurement | oem_core (可选, 自动检测)

# 信息增益分析（Mode B — 不需要 SERP 数据）
python data_sources/modules/information_gain_analyzer.py [file]

# 信息增益分析（Mode A — 有竞品文件时）
python data_sources/modules/information_gain_analyzer.py [file] competitor1.md competitor2.md

# 内容质量评分（5 维度）
python data_sources/modules/content_scorer.py [file]

# IndexNow 提交
python data_sources/modules/indexnow_submitter.py --urls "https://www.wowohcool.com/blog/slug/"
```

---

## 十一、注意事项与常见陷阱

### 多语言陷阱
- **本地化不是翻译**：每语言独立研究 SERP，用目标语言关键词搜索
- **ES 文章**：搜索西班牙语关键词，引用 BOE/AEAT 西班牙法规、LATAM 认证
- **DE 文章**：搜索德语关键词，引用 Stiftung Warentest、DIN 标准
- **FR 文章**：搜索法语关键词，引用 DGCCRF、ANFR、法国法规
- **禁止**：用英文搜索 SERP 后翻译成目标语言——这会导致信息增益为零

### .njk vs .md
- 最佳实践：在 Markdown 草稿阶段（`drafts/`）跑审计，而不是在 .njk 模板阶段
- .njk 文件中的 Nunjucks 变量（`{{ title }}`、`{% if %}`）会影响字数统计
- SVG inline icon path data 会虚假膨胀 wordCount 40-50%

### 不要过度优化
- H2 B2B 密度不是越高越好——Technical 文章超过 40% = 过度优化
- 不要为了数据密度而在每段强行插入数字——数字必须有上下文意义
- Information Gain Mode B 分不是越高越好——90+ 分可能意味着用了太多生僻术语

---

## 十二、.njk 模板标准骨架（markdown → .njk 转换必检）

> **用途**：每次 `/write` 产出 markdown 草稿后，转换为 `.njk` 模板时逐项对照此清单。参考模板文件：`src/fr/blog/batterie-externe-specifications-oem/index.njk`

### A. Frontmatter（14 个必填字段）

```yaml
---
title: "H1 标题 + 含 B2B 信号词 | WOWOHCOOL"
lang: "fr"                              # de | en | es | fr | ru
description: "Meta 描述 120-155 chars"
date: YYYY-MM-DD                        # 首次发布日期（不变）
modified: YYYY-MM-DD                    # 最后修改日期（每次更新）
author: "Author Name"                   # Snowy May | Nina Nico
articleSection: Category Name
articleTags: [Tag1, Tag2, Tag3]
canonical: "/fr/blog/slug/"             # 必须与 hreflang 中本语言路径一致
enPath: "blog/en-slug/"                 # EN 版本路径（无前导 /）
dePath: "blog/de-slug/"                 # DE 版本路径
esPath: "blog/es-slug/"                 # ES 版本路径
ogImage: "/image/blog/cover-en/image.webp"
navActive: "blog"
hreflang:                               # 四向映射，路径末尾必须有 /
 en: "/blog/en-slug/"
 de: "/de/blog/de-slug/"
 es: "/es/blog/es-slug/"
 fr: "/fr/blog/fr-slug/"
---
```

### B. Schema（7 节点 @graph，逐项检查）

```
{% block head_schema %}
<script type="application/ld+json">
{
 "@context": "https://schema.org",
 "@graph": [
   [1] Organization    — legalName + address(6 fields) + sameAs[4] + contactPoint(telephone + email + availableLanguage)
   [2] WebSite         — inLanguage + publisher @id ref
   [3] BreadcrumbList  — 3 levels, 所有 URL 末尾带 /
   [4] BlogPosting     — @id + headline + keywords[8+] + author @id ref(非 inline! COPY FROM factory-data-canonical.md §15) + speakable["h1",".speakable"] + about.sameAs(Wikidata) + citation[3+]
   [5] Person          — @id(COPY FROM factory-data-canonical.md §15) + jobTitle + url(author page) + sameAs[LinkedIn] + image + worksFor @id ref + knowsAbout[3-5]

   **作者 @id 速查（禁止变体，禁止去连字符）：**
   - Snowy May: `https://www.wowohcool.com/{lang}/#snowy-may`
   - Nina Nico: `https://www.wowohcool.com/{lang}/#nina-nico`
   - `{lang}`: EN 为空，DE=`/de`，ES=`/es`，FR=`/fr`，RU=`/ru`
   [6] HowTo           — @id + 3-6 steps(HowToDirection 格式)。非步骤类文章移除此节点
   [7] FAQPage         — @id + speakable[".faq-answer"](独立于 BlogPosting) + 8 questions(与正文逐字一致)
 ]
}
</script>
{% endblock %}
```

**Schema 红线（-30 分 / 条）**：

| # | 检查项 | ✅ | ❌ |
|---|--------|----|----|
| 1 | `BlogPosting.author` = `{"@id": "...#author-id"}` 引用 | `@id` ref | inline Person 对象 |
| 2 | `BlogPosting.speakable` = `["h1", ".speakable"]` | 3 节点 | `["h1", "h2"]` 废弃写法 |
| 3 | `Person.worksFor` = `{"@id": "...#organization"}` 引用 | `@id` ref | inline Organization |
| 4 | FAQPage 独立 `speakable: [".faq-answer"]` | 独立管理 | 复用 BlogPosting 的 selector |
| 5 | Breadcrumb `item` = Canonical URL | 完全一致 | `/blog/old-slug/` ≠ `/blog/new-slug/` |
| 6 | Organization 含完整 address + telephone + email | 6 地址字段 + 电话 + 邮箱 | 缺失字段 |
| 7 | `wordCount` 整数，已验证（±5%） | 2800 | "2800" (字符串) |
| 8 | 所有 URL 末尾带 `/` | `/blog/slug/` | `/blog/slug` |

### C. HTML 结构（15 板块，排序固定）

```
{% block content %}
<article class="py-12">

 [1] Hero           — nav 面包屑 → 3 个橙色 pill 标签 → H1(50-65, B2B 信号词) → Compact Author Bar(头像40×40 + 姓名 + 职位) → 日期行(<time datetime> + 阅读时间 + 作者名)
 [2] Hook           — .speakable, bg-brandBlue/5 border-l-4 border-brandOrange, ≤2 段
 [3] Featured Image — <img src="{IMAGE}"> only (NO srcset, NO sizes) + loading="eager" + fetchpriority="high" + width/height
 [4] Key Takeaways  — POINTS CLÉS, bg-amber-50 border-l-4 border-amber-500, TL;DR .speakable, 3-5 bullet
 [5] Key Metrics    — 可选, 数据指标卡片
 [6] TOC            — bg-brandBlue rounded-2xl p-8, 含 #faq 锚点
 [7] Factory Data   — 工厂数据卡片(面积/员工/R&D/产能/认证)
 [8] H2 Sections ×N — bg-slate-50 rounded-xl p-6 border, 表格 thead bg-brandBlue
 [9] Conclusion     — 可选, 总结 + 实操流程, 不含重复链接
[10] FAQ            — id="faq", bg-slate-50 rounded-2xl, 8 题, 每答 .faq-answer class, body-schema 逐字一致
[11] Author Bio     — id="author-bio", 头像(80×80 border-brandOrange) + LinkedIn 链接 + Empreinte Usine(4 格工厂数据)
[12] CTA            — bg-gradient-to-br from-brandBlue to-slate-800, h2 标题, 2 按钮(B2B 文案), 含产品词+MOQ
[13] Related        — <aside>, grid md:grid-cols-3, card 格式(gradient bar + 标签 + 标题 + 描述), 链接用语言前缀
[14] Sources        — list-disc, 权威 rel="noopener external", 商业 rel="noopener noreferrer nofollow"
[15] Blog CTA       — {% include "partials/blog-cta.njk" %}, 页面级 contact form

</article>
{% endblock %}
```

### D. 板块级检查清单（转换后逐项验证）

```
[ ] Hero
    [ ] Breadcrumb 3 级，URL 末尾 /
    [ ] 3 个橙色 pill 标签（category tags）
    [ ] H1 50-65 chars，含 B2B 信号词
    [ ] Compact Author Bar: 头像 40×40 rounded-full border-brandOrange + <a href="#author-bio"> + 职位行
    [ ] 日期行: <time datetime="YYYY-MM-DD"> + "X min de lecture" + 作者名
    [ ] 无 "Mis à jour le" 行（更新日期只在 frontmatter 里）

[ ] Hook
    [ ] .speakable class 在 wrapper div 上
    [ ] bg-brandBlue/5 border-l-4 border-brandOrange rounded-r-xl
    [ ] ≤2 段，首段含具体数字 + B2B 竞争洞察

[ ] Featured Image
    [ ] NO srcset (单一 <img src>, 无 variant 文件)
    [ ] NO sizes 属性
    [ ] loading="eager" + fetchpriority="high"
    [ ] width="2240" height="1260"
    [ ] alt 含 B2B 关键词

[ ] Key Takeaways
    [ ] POINTS CLÉS 标签（按语言变化）
    [ ] bg-amber-50 border-l-4 border-amber-500 rounded-r-xl
    [ ] TL;DR 段 .speakable，2-3 句核心结论
    [ ] 3-5 bullet，每条含 ≥1 个数字

[ ] TOC
    [ ] bg-brandBlue rounded-2xl p-8 text-white
    [ ] 含 #faq 锚点链接
    [ ] 所有锚点 ID 与下方 section id 一致

[ ] FAQ
    [ ] id="faq"
    [ ] 每个答案 div 有 .faq-answer class
    [ ] 8 题 B2B 采购语言（MOQ/FOB/认证/交期/验证）
    [ ] 与 JSON-LD FAQPage 逐字一致
    [ ] 每条答案含 ≥1 个数字

[ ] Author Bio
    [ ] id="author-bio"
    [ ] 头像 80×80 border-2 border-brandOrange
    [ ] LinkedIn 链接 target="_blank" rel="noopener noreferrer"
    [ ] Empreinte Usine 4 格: 5 000 m² / Depuis 2013 / 50+ / 50+ R&D

[ ] CTA
    [ ] h2 标题（非 h3）
    [ ] bg-gradient-to-br from-brandBlue to-slate-800
    [ ] 按钮文案 B2B 化（Demander un Devis / Voir le Catalogue）
    [ ] 描述含产品词 + MOQ

[ ] Related Articles
    [ ] <aside> 语义容器
    [ ] 链接使用语言前缀路径
    [ ] card 格式: gradient bar + tag + h3 + description

[ ] Sources
    [ ] list-disc
    [ ] 权威链接 rel="noopener external"
    [ ] 商业链接 rel="noopener noreferrer nofollow"

[ ] Blog CTA
    [ ] {% include "partials/blog-cta.njk" %}
    [ ] ctaSubject 包含文章主题关键词
```

### E. markdown 草稿 → .njk 转换流程

```
/write → drafts/article.md
    │
    ▼
/b2b-audit drafts/article.md          ← 内容层面 18 checks
    │
    ▼
修复 audit issues
    │
    ▼
参照本清单 §A-D 创建 .njk 文件          ← 🔴 新增：结构层面 20+ checks
    │
    ▼
/b2b-audit path/to/index.njk          ← 最终验证
    │
    ▼
/scrub → git push
```

### F. 参考模板文件

新文章从以下参考模板复制骨架（按语言选择最完整的那个）：

| 语言 | 参考文件 | 状态 |
|------|---------|:--:|
| FR | `src/fr/blog/batterie-externe-specifications-oem/index.njk` | ✅ 完整 |
| FR | `src/fr/blog/oem-vs-odm-guide-importateurs/index.njk` | ✅ 完整（v2 Schema 修复版） |

---

*SOP 基于 certif-qi2 + charge-pd 两篇 FR 文章完整优化 + /b2b-audit 18-check 扩展实战编写*
