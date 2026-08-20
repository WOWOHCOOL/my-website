# Write-B2B Command

Use this command to create B2B-optimized blog articles that output directly as `.njk` templates matching the WOWOHCOOL 13-panel standard. No markdown-to-.njk conversion step needed.

**Canonical template reference**: `B2B实操指南.md` §十二

## Usage
`/write-b2b [topic or research brief]`

## What This Command Does
1. Creates a complete `.njk` article file matching the 13-panel B2B standard
2. Embeds full Schema 7-node @graph (Organization / WebSite / BreadcrumbList / BlogPosting / Person / HowTo / FAQPage)
3. Applies all 5 B2B quality gates inline during writing
4. Outputs directly to the appropriate language blog directory

## Pre-Writing Review
- **Research Brief**: Review `research/brief-[topic]-*.md` if available
- **Context Files**: 
  - `context/brand-voice.md` — 5 voice pillars (Factory Authority, Technical Precision, Solution-Oriented, Global Trust, Innovation Forward)
  - `context/factory-data-canonical.md` — All factory data claims (MOQ, pricing, lead times, QC metrics, certifications)
  - `context/b2b-blog-quality-audit-standard.md` — B2B quality rules and scoring
  - `context/target-keywords.md` — Keyword clusters and forbidden B2C keywords
  - `context/internal-links-map.md` — Internal linking targets

## Output Format — .njk Template Structure

The output is a complete `.njk` file. Do NOT output markdown. The file follows this exact skeleton:

### Frontmatter

```yaml
---
title: "H1 Title with B2B Signal Word | WOWOHCOOL"
lang: "fr"                              # de | en | es | fr | ru
description: "Meta description 120-155 chars with B2B conversion word"
date: YYYY-MM-DD
modified: YYYY-MM-DD
author: "Author Name"                   # Snowy May or Nina Nico
articleSection: Category Name
articleTags: [Tag1, Tag2, Tag3]
canonical: "/{lang}/blog/{slug}/"
enPath: "blog/{en-slug}/"
dePath: "blog/{de-slug}/"
esPath: "blog/{es-slug}/"
frPath: "blog/{fr-slug}/"
ogImage: "/image/blog/cover-en/{image}.webp"
navActive: "blog"
hreflang:
 en: "/blog/{en-slug}/"
 de: "/de/blog/{de-slug}/"
 es: "/es/blog/{es-slug}/"
 fr: "/fr/blog/{fr-slug}/"
---
{% extends "layout.njk" %}
```

### Schema — 7-Node @graph

Must be the FIRST block after frontmatter, inside `{% block head_schema %}`:

```
1. Organization    — legalName + url + publishingPrinciples + logo + areaServed + address(6 fields) + sameAs[4] + contactPoint(telephone + email + availableLanguage)
2. WebSite         — url + name + inLanguage + publisher @id ref
3. BreadcrumbList  — 3 levels, all URLs end with /
4. BlogPosting     — @id ending #article + headline + keywords[8+] + author @id ref(COPY FROM factory-data-canonical.md §15) + speakable["h1",".speakable"] + about.sameAs(Wikidata) + citation[3+]
5. Person          — @id(COPY FROM factory-data-canonical.md §15) + jobTitle + url(author page) + sameAs[LinkedIn] + image + worksFor @id ref + knowsAbout[3-5]
6. HowTo           — @id ending #howto + 3-6 steps(HowToDirection). Remove node entirely for non-process articles
7. FAQPage         — @id ending #faq + speakable[".faq-answer"](independent) + 8 questions(word-for-word match with body FAQ)
```

**Critical rules**:
- `Organization.areaServed` = `["US","DE","AT","CH","UK","FR","ES","PL","EU","JP","KR","AU","MX","CO","AR","CL","PE","RU","KZ","BY","EAEU"]` — global list, NEVER single-region
- `BlogPosting.author` = `{"@id": "https://www.wowohcool.com/#author-id"}` — NEVER inline Person
- `Person.worksFor` = `{"@id": "https://www.wowohcool.com/#organization"}` — NEVER inline Organization
- **Shared entity @ids (#organization / #website / #author) have NO language prefix** — use `https://www.wowohcool.com/#...` in ALL languages (same global entity). Only article-level @ids (`#article` / `#faq`) and URL/path fields (Organization.url, Breadcrumb item, canonical, ogImage) keep the `{lang}/` prefix.
- `BlogPosting.speakable.cssSelector` = `["h1", ".speakable"]` — NEVER use `["h1", "h2"]`
- `FAQPage.speakable.cssSelector` = `[".faq-answer"]` — independent from BlogPosting
- **Cover image**: `<img src="{IMAGE}">` only — NO `srcset`, NO `sizes`, NO variant (`-800`/`-1200`) files
- Breadcrumb item[3] URL = canonical URL — must match exactly
- All URLs end with `/`
- `wordCount` = integer, no quotes
- `datePublished` = first publish date (never changes), `dateModified` = today

### HTML Body — 13 Panels (Fixed Order)

```html
{% block content %}
<article class="py-12">

<!-- ===== [1] Hero ===== -->
<div class="relative pt-24 md:pt-28 pb-12 lg:pt-28 lg:pb-16 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
 <div class="absolute top-0 left-1/4 w-64 h-64 bg-brandOrange/10 rounded-full blur-3xl"></div>
 <div class="absolute bottom-0 right-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>
 <div class="max-w-4xl mx-auto px-6 relative z-10">
   <!-- Breadcrumb -->
   <nav class="text-sm text-slate-500 mb-6">
     <a href="/{lang}/" class="hover:text-brandOrange">{HOME_LABEL}</a> /
     <a href="/{lang}/blog/" class="hover:text-brandOrange">Blog</a> /
     <span class="text-slate-900">{SHORT_TITLE}</span>
   </nav>
   <!-- Tags: 3 orange pills -->
   <div class="flex flex-wrap gap-2 mb-6">
     <span class="px-3 py-1 bg-brandOrange/10 text-brandOrange text-[11px] font-black rounded-full uppercase">Tag1</span>
     ...
   </div>
   <!-- H1 -->
   <h1 class="text-3xl lg:text-5xl font-black text-brandBlue uppercase italic tracking-tighter mb-6 leading-tight">{TITLE}</h1>
   <!-- Compact Author Bar -->
   <div class="flex items-center gap-3 mb-6">
     <img src="{AUTHOR_IMAGE}" alt="{AUTHOR_ALT}" loading="lazy" width="40" height="40" class="w-10 h-10 rounded-full object-cover border border-brandOrange">
     <div>
       <a href="#author-bio" class="font-bold text-slate-900 text-sm hover:text-brandOrange transition">{AUTHOR_NAME}</a>
       <p class="text-xs text-slate-500">{JOB_TITLE} · {YEARS_EXPERIENCE}</p>
     </div>
   </div>
   <!-- Date Row: NO "Updated on" line -->
   <div class="flex flex-wrap items-center gap-6 text-sm text-slate-500 pb-8 border-b border-slate-200">
     <span><svg class="icon-calendar"><!-- calendar SVG --></svg><time datetime="{YYYY-MM-DD}">{FORMATTED_DATE}</time></span>
     <span><svg class="icon-clock"><!-- clock SVG --></svg>{N} min de lecture</span>
     <span><svg class="icon-user"><!-- user SVG --></svg>{AUTHOR_NAME}</span>
   </div>
 </div>
</div>

<!-- ===== [2] Hook ===== -->
<div class="max-w-4xl mx-auto px-6 mb-8">
 <div class="bg-brandBlue/5 border-l-4 border-brandOrange p-6 rounded-r-xl mb-8 speakable">
   <p class="text-lg text-slate-700 italic">{HOOK: pain point + specific data + B2B competitive insight}</p>
 </div>
</div>

<!-- ===== [3] Featured Image ===== -->
<div class="max-w-4xl mx-auto px-6 mb-16">
 <img src="{IMAGE}"
      alt="{B2B keyword alt text}" width="2240" height="1260"
      loading="eager" decoding="async" class="w-full rounded-3xl shadow-xl" fetchpriority="high">
</div>

<!-- ===== [4] Key Takeaways ===== -->
<div class="max-w-4xl mx-auto px-6">
 <div class="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-6 mb-8">
   <p class="text-[11px] font-black text-brandOrange uppercase tracking-widest mb-2">{KEY_TAKEAWAYS_LABEL}</p>
   <p class="text-slate-700 leading-relaxed text-sm mb-4 speakable">{TL;DR: 2-3 sentence core conclusion with specific data}</p>
   <ul class="text-sm text-slate-700 space-y-2 list-disc pl-5">
     <li><strong>Bullet 1:</strong> with specific number</li>
     <li><strong>Bullet 2:</strong> with specific number</li>
     <li><strong>Bullet 3:</strong> with specific number</li>
     <li><strong>Bullet 4-5:</strong> if needed</li>
   </ul>
 </div>
</div>

<!-- ===== [5] Table of Contents ===== -->
<div class="max-w-4xl mx-auto px-6">
 <div class="bg-brandBlue rounded-2xl p-8 text-white mb-12">
   <h2 class="text-lg font-black uppercase italic mb-6">{TOC_TITLE}</h2>
   <nav class="text-sm space-y-2">
     <a href="#section-1" class="block hover:text-brandOrange transition">1. {H2 Title 1}</a>
     ...
     <a href="#faq" class="block hover:text-brandOrange transition">N. {FAQ_TITLE}</a>
   </nav>
 </div>
</div>

<!-- ===== [6] H2 Sections × N ===== -->
<section id="section-1" class="mb-16">
 <div class="max-w-4xl mx-auto px-6">
   <div class="bg-slate-50 rounded-xl p-6 border border-slate-200 shadow-sm">
     <h2 class="text-2xl font-black text-brandBlue uppercase italic mb-6">N. {H2 Title}</h2>
     <!-- Content paragraphs: text-slate-600 leading-relaxed mb-4 -->
     <!-- H3: font-black text-brandBlue uppercase mb-3 -->
     <!-- Tables: w-full, thead bg-brandBlue text-white, tbody bg-white/bg-slate-50 -->
     <!-- Expert Insight block (1 per article, inside relevant H2 section):
       <div class="bg-brandBlue/5 border-l-4 border-brandOrange rounded-r-xl p-6 mt-6">
         <p class="text-[11px] font-black text-brandOrange uppercase tracking-widest mb-2">{EXPERT_LABEL}</p>
         <blockquote class="text-slate-700 text-base italic leading-relaxed">"Quote"</blockquote>
         <p class="text-sm text-slate-500 mt-2">, {AUTHOR_NAME}, {JOB_TITLE}, WOWOHCOOL</p>
       </div>
     -->
   </div>
 </div>
</section>

<!-- ===== [7] FAQ ===== -->
<section id="faq" class="mb-16">
 <div class="max-w-4xl mx-auto px-6">
   <div class="bg-slate-50 rounded-2xl p-8 border border-slate-200 shadow-sm">
     <h2 class="text-2xl font-black text-brandBlue uppercase italic mb-8 text-center">{FAQ_TITLE}</h2>
     <div class="space-y-6 max-w-3xl mx-auto">
       <div class="bg-white rounded-xl p-6 faq-answer">
         <h3 class="font-black text-brandBlue mb-2">{Question 1}?</h3>
         <p class="text-slate-600 text-sm">{Answer 1 with ≥1 specific number}</p>
       </div>
       <!-- Repeat for questions 2-8 -->
     </div>
   </div>
 </div>
</section>

<!-- ===== [8] Author Bio ===== -->
<section id="author-bio" class="max-w-4xl mx-auto px-6">
 <div class="bg-slate-50 rounded-2xl p-6 md:p-8 mb-12 border border-slate-100">
   <div class="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
     <div class="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center border-2 border-brandOrange bg-white shadow-lg shrink-0">
       <img src="{AUTHOR_IMAGE}" alt="{AUTHOR_ALT}" loading="lazy" width="400" height="400" class="w-full h-full object-cover">
     </div>
     <div class="flex-1 min-w-0">
       <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
         <a href="{LINKEDIN_URL}" target="_blank" rel="noopener noreferrer" class="font-black text-slate-900 text-lg hover:text-brandOrange transition">{AUTHOR_NAME}</a>
         <span class="px-2 py-1 bg-brandOrange/10 text-brandOrange text-[11px] font-black rounded-full uppercase w-fit">{AUTHOR_LABEL}</span>
       </div>
       <p class="text-sm text-slate-500 mb-3">{JOB_TITLE} · {YEARS_EXPERIENCE} · {LANGUAGES}</p>
       <p class="text-slate-600 text-sm leading-relaxed">{AUTHOR_BIO}</p>
       <!-- Factory Footprint (4 metrics, always present) -->
       <div class="mt-4 pt-4 border-t border-slate-200">
         <p class="text-xs text-slate-400 uppercase tracking-wider mb-2">{FACTORY_FOOTPRINT_LABEL}</p>
         <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
           <div><span class="font-black text-brandBlue">5 000 m²</span><p class="text-xs text-slate-500">{ISO_LABEL}</p></div>
           <div><span class="font-black text-brandBlue">{SINCE_LABEL}</span><p class="text-xs text-slate-500">Shenzhen, Chine</p></div>
           <div><span class="font-black text-brandBlue">50+</span><p class="text-xs text-slate-500">{COUNTRIES_LABEL}</p></div>
           <div><span class="font-black text-brandBlue">50+ R&D</span><p class="text-xs text-slate-500">{ENGINEERS_LABEL}</p></div>
         </div>
       </div>
     </div>
   </div>
 </div>
</section>

<!-- ===== [9] CTA ===== -->
<section class="max-w-4xl mx-auto px-6">
 <div class="relative bg-gradient-to-br from-brandBlue to-slate-800 rounded-3xl p-10 text-center mb-16 overflow-hidden">
   <div class="absolute top-0 right-0 w-64 h-64 bg-brandOrange/20 rounded-full blur-3xl"></div>
   <div class="absolute bottom-0 left-0 w-64 h-64 bg-brandBlue-400/20 rounded-full blur-3xl"></div>
   <div class="relative z-10">
     <h2 class="text-2xl font-black text-white uppercase italic mb-4">{CTA_HEADING with product keyword + MOQ}</h2>
     <p class="text-slate-300 mb-8 max-w-xl mx-auto">{CTA_SUBTEXT}</p>
     <div class="flex flex-col sm:flex-row gap-4 justify-center">
       <a href="/{lang}/contact/" class="w-full sm:flex-1 bg-brandOrange text-white px-8 py-4 rounded-xl font-black uppercase text-sm shadow-lg hover:-translate-y-1 transition">{BTN_PRIMARY}</a>
       <a href="/{lang}/products/..." class="w-full sm:flex-1 text-center border-2 border-white text-white px-8 py-4 rounded-xl font-black uppercase text-sm hover:bg-white hover:text-brandBlue transition">{BTN_SECONDARY}</a>
     </div>
   </div>
 </div>
</section>

<!-- ===== [10] Related Articles ===== -->
<aside id="related-articles" class="max-w-4xl mx-auto px-6 mb-16">
 <h2 class="text-2xl font-black text-brandBlue uppercase italic mb-6">{RELATED_TITLE}</h2>
 <div class="grid md:grid-cols-3 gap-6">
   <!-- 3 cards: gradient bar + tag + h3 + description -->
   <a href="/{lang}/blog/{slug}/" class="bg-slate-50 rounded-xl overflow-hidden hover:shadow-xl transition group">
     <div class="h-2 bg-gradient-to-r from-brandBlue to-brandOrange"></div>
     <div class="p-6">
       <span class="text-xs font-black text-brandOrange uppercase mb-2 block">{Category}</span>
       <h3 class="font-black text-brandBlue uppercase mb-2 group-hover:text-brandOrange transition text-sm">{Title}</h3>
       <p class="text-slate-600 text-xs">{Description}</p>
     </div>
   </a>
 </div>
</aside>

<!-- ===== [11] Sources ===== -->
<section class="max-w-4xl mx-auto px-6 mb-16">
 <h2 class="text-lg font-black text-brandBlue uppercase italic mb-4">{SOURCES_TITLE}</h2>
 <ul class="text-sm text-slate-600 space-y-2 list-disc pl-5">
   <!-- Authority links: rel="noopener external" -->
   <li><a href="{URL}" target="_blank" rel="noopener external" class="text-brandBlue hover:text-brandOrange">{Source Name}</a></li>
   <!-- Commercial links: rel="noopener noreferrer nofollow" -->
 </ul>
</section>

</article>

<!-- ===== [12] Blog CTA Partial ===== -->
{%- set ctaLabel = "{CTA_LABEL}" %}
{%- set ctaHeading1 = "{CTA_HEADING1}" %}
{%- set ctaHeading2 = "{CTA_HEADING2}" %}
{%- set ctaSubtext = "{CTA_SUBTEXT_GLOBAL}" %}
{%- set ctaSubject = "{CTA_SUBJECT}" %}
{%- set ctaButton = "{CTA_BUTTON_TEXT}" %}
{% include "partials/blog-cta.njk" %}
{% endblock %}
```

## Content Quality Gates (Apply During Writing)

### Gate 1: Anti-Repetition
- No same information repeated in the same paragraph
- One clear statement > three synonymous variants

### Gate 2: Information Gain (Most Critical)
- Every article must contain content NOT found in SERP top 5
- **Factory data**: cite `context/factory-data-canonical.md` real numbers, never invent
- **First-hand experience**: use precise values + units (°C, mV, kHz, Wh/kg, mm, €, $)
- **Exclusive vocabulary**: PCBA ripple noise, BOM cost breakdown, AQL sampling, FOB vs DDP landed cost
- Against generic language: "Case temperature stabilized at 58.3°C under 100% load after 4-hour aging test" NOT "Good thermal performance"

### Gate 3: Scannability (Structure Mandatory)
- **H1**: 50-65 chars, must contain ≥1 B2B signal word (OEM, manufacturer, factory, supplier, importer, sourcing, MOQ, FOB, B2B)
- **H2**: organized by procurement decision chain (Why → What to verify → How it's done → What it costs → How to comply), ≥2 H2s with B2B signal words
- **H3**: specific — prefer question format or data conclusions, never vague labels
- **H3 answer**: 60-500 char direct answer or comparison table immediately after each H3
- No empty H2s (every H2 must have ≥1 H3)

### Gate 4: Visual Authenticity
- ❌ Forbidden: stock photos (handshakes, suits, generic factory images)
- ✅ Required: real product/factory/lab photos
- Every image must have descriptive alt text with B2B keywords

### Gate 5: CTA Relevance
- End with logical B2B buyer next step
- Examples: "Demander un Devis OEM", "Télécharger le Catalogue", "Consulter les Certifications"

## B2B Content Principles

### Hook Formula
Opening must use ONE of:
- **Specific Scenario**: named person + concrete situation + numbers
- **Counterintuitive Claim**: "The cheapest option is the most expensive decision"
- **Surprising Statistic**: "80% of ODM certifications are in the factory's name, not yours"

First 3 sentences must contain: number + unit + B2B signal word + first-hand experience signal

### Mini-Stories (2-3 per article)
- Named person + concrete situation + specific numbers + clear outcome
- Place: one in Hook, one in middle section, one near conclusion

### Expert Insight (1 per article, inside H2 section)
- Named author with LinkedIn, 1-2 sentence industry insight, specific and data-backed

### Tables
- Technical parameters MUST be in tables (not prose)
- Tables use: `thead bg-brandBlue text-white`, `tbody bg-white / bg-slate-50`

### FAQ (8 questions, mandatory)
- Body-Schema word-for-word match
- B2B procurement language: MOQ, FOB, certification, lead time, compliance
- Each answer: ≥1 specific number
- Ordered by procurement decision chain
- Last question = natural CTA bridge

## Internal Linking (3-5+ links)
- Reference `context/internal-links-map.md`
- Link to related blog articles, product pages, service pages
- Anchor text: descriptive, B2B signal words

## External Links (2-3+ links)
- Authority sources: EU regulations, certification bodies, industry standards
- Use `rel="noopener external"` for authority, `rel="noopener noreferrer nofollow"` for commercial

## Author @id Reference (Single Source of Truth: factory-data-canonical.md §15)

COPY these verbatim — never invent variants or remove hyphens:

| Author | Schema @id | Author Page URL |
|--------|-----------|-----------------|
| Snowy May | `https://www.wowohcool.com/#snowy-may` | `https://www.wowohcool.com/authors/snowy-may/` |
| Nina Nico | `https://www.wowohcool.com/#nina-nico` | `https://www.wowohcool.com/authors/nina-nico/` |

> **Author Page URL 每位作者不同** — Snowy May 用 `/authors/snowy-may/`，Nina Nico 用 `/authors/nina-nico/`，按作者复制对应 URL，不要混用。Schema @id 用共享形式（无语言前缀）：`https://www.wowohcool.com/#snowy-may` / `#nina-nico`。

## File Management
Save directly to the site source directory:
- **File Location**: `C:\Users\wowoh\wowohcool.com\src\{lang}\blog\{slug}\index.njk`
- **Naming Convention**: lowercase, hyphenated, target language

## Language-Specific Labels

| Element | DE | EN | ES | FR | RU |
|---------|----|----|----|----|----|
| Home | Startseite | Home | Inicio | Accueil | Главная |
| KEY TAKEAWAYS | KERNERKENNTNISSE | KEY TAKEAWAYS | PUNTOS CLAVE | POINTS CLÉS | КЛЮЧЕВЫЕ ВЫВОДЫ |
| Table of Contents | Inhaltsverzeichnis | Table of Contents | Índice | Table des Matières | Содержание |
| FAQ Title | Häufig Gestellte Fragen | Frequently Asked Questions | Preguntas Frecuentes | Foire Aux Questions | Часто Задаваемые Вопросы |
| EXPERT INSIGHT | EXPERTENWISSEN | EXPERT INSIGHT | PERSPECTIVA EXPERTO | APERÇU D'EXPERT | МНЕНИЕ ЭКСПЕРТА |
| Factory Footprint | Fabrik-Fußabdruck | Factory Footprint | Huella de Fábrica | Empreinte Usine | Производственная База |
| Author Label | Autor | Author | Autor | Auteure/Auteur | Автор |
| Sources | Quellen & Referenzen | Sources & References | Fuentes & Referencias | Sources & Références | Источники |
| Related Articles | Ähnliche Artikel | Related Articles | Artículos Relacionados | Articles Connexes | Похожие Статьи |
| CTA Primary | Angebot Anfordern | Get Factory Pricing | Solicitar Presupuesto | Demander un Devis OEM | Запросить Прайс |
| CTA Secondary | Katalog Ansehen | View Catalog | Ver Catálogo | Voir le Catalogue | Смотреть Каталог |

## Automatic Next Steps
After saving the .njk file, immediately:
1. Run `/b2b-audit [file]` to verify 18 B2B quality checks
2. Report score — fix critical issues if < 90
3. Remind user: `/scrub` + `git push` when ready
