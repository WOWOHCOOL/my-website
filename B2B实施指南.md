# B2B 文章优化实操指南

**适用范围**: EN / DE / ES / FR 所有 WOWOHCOOL 博客文章  
**最后更新**: 2026-08-03  
**基于**: certif-qi2 + charge-pd 两篇 FR 文章完整优化

---

## 核心原则

每篇文章必须同时满足三个标准，缺一不可：

| 标准 | 权威源 | 管辖范围 |
|------|--------|---------|
| **1. B2B 质量** | `context/b2b-blog-quality-audit-standard.md` | Data density, FAQ 9 Rules, speakable 3 nodes, anti-patterns, Information Gain |
| **2. 模板样式** | `context/blog-template-standard.md` | 12 板块 DOM 结构, CSS 类名, 排序 |
| **3. 元数据** | `context/b2b-schema-template.json` + `context/b2b-multilingual-metadata-standard.md` | JSON-LD 7 nodes, author @id ref, wordCount integer |

辅助数据源：`context/factory-data-canonical.md`（工厂数据唯一真相源）

---

## 一、执行顺序

```
/research → 手动优化三标准 → /b2b-audit → /optimize → /seo-geo → /scrub
```

| 步骤 | 命令 | 解决的标准 | 通过门槛 |
|:--:|------|:--:|------|
| 1 | `/research [topic]` | 数据基础 | SERP + 竞品 + 市场价格 + 法规 |
| 2 | **手动优化** | 三项全部 | 见下方清单 |
| 3 | `/b2b-audit [file]` | B2B 质量 | **≥90 分** |
| 4 | `/optimize [file]` | 元数据 | title ≤60, desc ≤155, wordCount 整数 |
| 5 | `/seo-geo [file]` | AI 引用 | 9/9 Princeton methods |
| 6 | `/scrub [file]` | 清洁 | 0 watermark |

---

## 二、Step 2 手动优化清单

### A. JSON-LD Schema v2（元数据标准）

```
[ ] Organization: legalName + publishingPrinciples + logo + address(6 fields) + sameAs + contactPoint(telephone + email)
[ ] WebSite: @id + url + name("WOWOHCOOL"，不带语言后缀) + inLanguage + publisher @id ref
[ ] BreadcrumbList: 3 levels, 所有 URL 末尾带 /
[ ] BlogPosting: @id + headline + keywords[8-12] + description + author @id ref(非 inline Person!) + datePublished + dateModified + wordCount(integer! 无引号!) + timeRequired + articleSection + speakable["h1",".speakable"] + citation[3] + about.sameAs(Wikidata)
[ ] Person: @id + name + jobTitle + url(author page) + sameAs[LinkedIn] + image + worksFor @id ref + knowsAbout[3-5]
[ ] HowTo: @id + 3-6 steps(HowToDirection 格式)
[ ] FAQPage: @id + speakable[".faq-answer"](独立于 BlogPosting) + 8 questions(与正文逐字一致)
```

### B. 12 板块结构（模板样式标准）

```
 1. Hero           <nav> 内联面包屑 → 3 个橙色 pill 标签 → H1(50-65 chars,含 B2B 信号词) → Compact Author Bar(头像+姓名+职位) → 日期行(<time datetime> + 阅读时间 + 作者名)
 2. Hook           .speakable, ≤2 段, 开门见山, 嵌入竞争洞察(1 句点出信息真空)
 3. Featured Image srcset 三档 + fetchpriority="high"
 4. Key Takeaways  amber 卡片, TL;DR .speakable, 3-5 量化要点
 5. TOC            bg-brandBlue, 含 #faq 锚点
 6. H2 ×N          bg-slate-50 rounded-xl p-6 卡片, Expert Insight 嵌入上下文
 7. FAQ            id="faq", bg-slate-50 rounded-2xl, 8 题, body-schema 逐字一致
 8. Author Bio     id="author-bio", + Empreinte Usine(4 格工厂数据)
 9. CTA            gradient(from-brandBlue to-slate-800), 2 按钮, h2 标题
10. Related        <aside>, card 格式, gradient bar, 3 张卡片
11. Sources        list-disc, 权威源 rel="noopener external"
12. blog-cta.njk   页面级 contact form
```

### C. 关键反模式（禁止清单）

| 反模式 | 说明 | 检测 |
|--------|------|------|
| ❌ RÉPONSE RAPIDA / Quick Answer | 与 Key Takeaways 重叠 60-95% | grep "RÉPONSE RAPIDA\|SCHNELLANTWORT\|Quick Answer" |
| ❌ TL;DR 独立块 | 与 POINTS CLÉS TL;DR 重复 | grep "TL;DR" |
| ❌ Data Dump Intro | 4-7 段市场数据堆在引入区 | 前 5 段检查 |
| ❌ Hook 内重复数据 | 同一统计数字出现两次 | 朗读 Hook |
| ❌ speakable >3 nodes | FAQ speakable 混入 BlogPosting | BlogPosting["h1",".speakable"], FAQPage[".faq-answer"] |
| ❌ wordCount 为 string | Schema 中带引号 | "wordCount": 0 vs "wordCount": "5100" |
| ❌ BlogPosting.author inline Person | 应使用 @id 引用 | "author": { "@type": "Person"... } |
| ❌ Cross-Links 与 Related 重复 | 正文末尾和页底重复推荐 | 删除 Cross-Links |
| ❌ H1 无 B2B 信号词 | OEM/importateur/fabricant 等 | 手动检查 |
| ❌ FAQ body-schema 不一致 | 正文 FAQ ≠ JSON-LD | 逐字对比 |
| ❌ TOC `!text-white` 缺空格 | `mb-6!text-white` → 解析失败 | grep "[a-z]![a-z]" |

### D. 研究数据落地规则

| 研究数据 | 落地位置 | 方式 |
|---------|---------|------|
| 竞品分析 | Hook 段落 | 嵌入 1 句（EN/DE/ES 风格：不独立板块宣告） |
| 市场数据 | §7 表格 | 表格展示，不在 Intro 堆砌 |
| SERP 空白 | Hook 嵌入 | "aucune ressource en [langue] ne couvre..." |
| 工厂 moat 数据 | WOWOHCOOL 盒或 STATISTIQUE 盒 | 1 句话包 4 项数据 |

### E. 工厂数据分层运用

| 层级 | 数据 | 位置 | 触发场景 |
|------|------|------|---------|
| **每篇必有** | 5 000m², ISO 9001, since 2013, 50+ R&D | Empreinte Usine | 页脚默认（4 格） |
| **场景触发** | 200+ brands | WOWOHCOOL/STAT 盒 | 证明交付记录 |
| **场景触发** | 4-stage QC (IQC-IPQC-FQC-OQC) | 安全/品控小节 | 证明质量体系 |
| **场景触发** | 100% 4h aging test | 认证流程/安全测试 | 证明全检非抽检 |
| **场景触发** | <0.3% defect rate | ROI/采购小节 | 证明长期可靠性 |

**用法**: 嵌 1 句，不硬广。例: `notre contrôle qualité en 4 étapes (IQC-IPQC-FQC-OQC) avec 100 % de test de vieillissement de 4 heures garantit un taux de défaut inférieur à 0,3 %, validé sur plus de 200 marques servies dans 50+ pays`.

---

## 三、各语言差异表

| 元素 | EN | DE | ES | FR |
|------|----|----|----|-----|
| `inLanguage` | `en-US` | `de-DE` | `es-ES` | `fr-FR` |
| Org @id | `/#organization` | `/de/#organization` | `/es/#organization` | `/fr/#organization` |
| 日期格式 | Mon DD, YYYY | DD.MM.YYYY | DD de Mon de YYYY | DD mois YYYY |
| KEY TAKEAWAYS 标签 | KEY TAKEAWAYS | KERNERKENNTNISSE | PUNTOS CLAVE | POINTS CLÉS |
| FAQ 标题 | Frequently Asked Questions | Häufig gestellte Fragen | Preguntas Frecuentes | Foire Aux Questions |
| Sources 标题 | Sources & References | Quellen & Referenzen | Fuentes & Referencias | Sources & Références |
| Empreinte 标签 | Factory Footprint | Fabrik-Fußabdruck | Huella de Fábrica | Empreinte Usine |
| 阅读时间 | min read | Min. Lesezeit | min de lectura | min de lecture |
| 作者标签 | Author | Autor | Autor | Auteur/Autrice |
| 引号 | "straight" | „deutsch" | « latin » | « guillemets » |
| 面包屑首页 | Home | Startseite | Inicio | Accueil |
| 竞争洞察句式 | no English guide | keine deutsche Ressource | ninguna guía en español | aucune ressource en français |

### 法规本土化（2026）

| 市场 | 引用的法规/机构 |
|------|--------------|
| **FR** | DGCCRF, ANFR, décret 2023-1271, DEEE (Ecosystem/Ecologic), Triman, Loi Toubon, EN IEC 63563 |
| **DE** | Stiftung Warentest, DIN, ProdSG, GS-Zeichen, Stiftung EAR, VerpackG, Batteriegesetz |
| **ES** | AENOR, BOE, AEAT, UNE-EN, certificaciones LATAM (IRAM, NOM, ANATEL) |
| **EN** | FCC, UL, CPSC, Prop 65, Section 301 tariffs, USMCA |

---

## 四、发布前自检清单

```
[ ] H1 50-65 chars, 含 B2B 信号词(该语言)
[ ] Meta title 50-60 chars, Meta description 120-155 chars
[ ] JSON-LD 7 nodes, json.load() 验证通过
[ ] wordCount integer (无引号), 与实测值偏差 <5%
[ ] speakable: BlogPosting["h1",".speakable"](3 nodes), FAQPage[".faq-answer"](独立)
[ ] BlogPosting.author = @id ref (非 inline Person)
[ ] 无 RÉPONSE RAPIDA / SCHNELLANTWORT / Quick Answer / TL;DR 独立块
[ ] 无 Cross-Links (与 Related Articles 重叠)
[ ] Intro ≤2 段, 无 Data Dump
[ ] Hook .speakable, 嵌入竞争洞察 1 句
[ ] POINTS CLÉS amber 卡片, TL;DR .speakable
[ ] FAQ id="faq", 8 题, body-schema 逐字一致, 每答 ≥1 数字
[ ] Author Bio + Empreinte Usine (4 格工厂数据)
[ ] CTA gradient from-brandBlue to-slate-800, 2 按钮
[ ] Related Articles card 格式, 语言前缀链接, 可访问
[ ] Sources list-disc, 权威源 rel="noopener external"
[ ] 工厂 moat: 至少提及 QC + aging + defect + brands 中的 3 项
[ ] 竞品洞察嵌入 Hook, 不独立板块
[ ] 市场数据表格化, 不在 Intro 堆砌
[ ] hreflang: 四向映射正确, 无旧 slug, 无缺 trailing /
[ ] 图片 alt: 含 B2B 信号词, 无 stock photo
[ ] Featured Image: srcset 三档 + fetchpriority="high"
[ ] 法规引用: 本地机构(不用对岸的)
[ ] dateModified: 当天日期
[ ] 阅读时间: 匹配 Schema timeRequired
[ ] B2B 审计: ≥90
[ ] scrub: 0 watermark
[ ] 构建: 0 errors
```

---

## 五、Git 提交格式

```bash
cd C:\Users\wowoh\wowohcool.com
git add -A
git commit -m "feat(语言): 具体改动描述"
git push origin main
```

---

*SOP 基于 certif-qi2 + charge-pd 两篇 FR 文章完整优化编写，适用所有 B2B 文章*
