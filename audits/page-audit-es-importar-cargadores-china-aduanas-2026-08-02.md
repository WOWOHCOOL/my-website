# Page Audit: Importar Cargadores China OEM -- ES Article (Aduanas, Aranceles, DDP)

**Date**: 2026-08-02 | **File**: `C:\Users\wowoh\wowohcool.com\src\es\blog\importar-cargadores-china-aduanas\index.njk`
**Live URL**: https://www.wowohcool.com/es/blog/importar-cargadores-china-aduanas/
**Auditor**: Manual page audit (8-gate methodology), ES-specific focus
**Reference audits**: page-audit-import-costs-guide-2026-08-02.md (EN, 83/100), page-audit-de-ladegeraet-import-china-2026-08-02.md (DE, 77/100)

---

## Scores

| Gate | Score | Status |
|------|-------|--------|
| Anti-Repetition | 9/10 | PASS |
| Information Gain | 17/25 | GOOD |
| Scannability | 15/20 | PASS |
| Visual Authenticity | 9/10 | PASS |
| CTA Relevance | 9/10 | PASS |
| Schema Compliance | 12/15 | NEEDS FIX |
| Meta + Links | 8/10 | PASS |
| **TOTAL** | **79/100** | GOOD |

---

## Key Finding: NO HS Code Tariff Contradiction

**The ES article is clean.** Unlike the DE article (6 locations claiming 2.4-2.7% vs 3 correctly claiming 0% ITA), every single mention of HS 8504.40 arancel in the ES article consistently states **0%**. No "2.4-2.7%" figure appears anywhere. Power bank tariff (HS 8507.60: 0-3.7%) is also consistent across all locations.

| Location | Arancel stated | Verdict |
|----------|----------------|---------|
| Meta description (line 3) | 0% | Correct |
| Key Takeaways (line 412) | 0% | Correct |
| Body H2-2 (line 467) | 0% | Correct |
| Body IVA example (line 505) | 0% | Correct |
| HowTo Step 2 (line 241) | 0% | Correct |
| Schema FAQ Q1 (line 285) | 0% | Correct |
| Visible FAQ Q1 (line 598) | 0% | Correct |
| Hook section (line 389) | 0% | Correct |

**Verdict: 8/8 locations consistent. This avoids the DE article's P0 Zollsatz contradiction entirely.**

---

## Gate-by-Gate Analysis

### Gate 1: Anti-Repetition (9/10)

**Finding: Clean, minor editorial tightening possible.**

No egregious paragraph-level repetition. The 0% tariff rate and 21% IVA appear across multiple sections (hook, key takeaways, Section 2, Section 4, FAQ), but each occurrence serves a distinct structural role -- summary, visual grid, detailed explanation, and answer block. This is necessary cross-referencing, not redundancy.

The import statistics (80% world production, 50M units/year, 200M EUR value) appear in both the Hook (line 389) and Section 1 (line 463). The Hook sets context; Section 1 develops the data. Acceptable.

**Minor note:** The Conclusion section (lines 576-582) uses 3 paragraphs to convey essentially one message: "importing from China requires preparation, and WOWOHCOOL can help." Could be tightened to 2 paragraphs without information loss. The RAPEX statistic paragraph (line 580) and Nina Nico quote (line 582) sit outside any H2 section -- they float between Conclusión and FAQ. These would be better placed within Section 9 (Errores comunes) or given their own callout box.

### Gate 2: Information Gain (17/25)

**Spanish-localized regulatory anchors present (strong):**
- AEAT (Agencia Tributaria) -- Spanish tax/customs authority, specifically cited
- IVA 21% (Spain-specific VAT rate, not generic EU VAT)
- AENOR -- Spanish certification body, unique to ES market (no DE/EN equivalent)
- All 4 EU Directives with article numbers: 2014/35/UE (LVD), 2014/30/UE (EMC), 2011/65/UE (RoHS), 2009/125/CE (Ecodiseño)
- Reglamento UE 2023/1542 de Baterías (August 2025 EPR deadline)
- RAPEX 2024 safety statistics: 22% of notifications are electronics
- Qi2 (WPC) -- wireless charging standard
- INCOTERMS 2020 (ICC)
- Shenzhen, Guangzhou, Longhua -- specific manufacturing cluster geography

**First-party WOWOHCOOL data present:**
- Factory: 5,000 m² ISO 9001, Longhua, Shenzhen (line 463)
- MOQ: 500 unidades for full OEM (line 309)
- Production lead time: 25-30 days + 25-35 days sea freight (line 309, 539)
- IVA calculation worked example: 10,000 EUR mercancía + 1,500 EUR transporte = 11,500 EUR valor en aduana, IVA = 2,415 EUR (line 505)
- Shipping cost benchmarks: express from ~50 EUR, air 3-5 EUR/kg, sea LCL 150-250 EUR/m³ (line 317, 525)
- 500-unit shipping cost comparison: express 600-900 EUR vs sea 200-350 EUR, saving 400-550 EUR (line 527)
- Nina Nico: 10+ years experience, Spanish market specialist (line 370, 433, 646)

**What is missing for InfoGain >20:**
- No BOM cost breakdown of charger components (GaN FET, transformer, PCB, enclosure)
- No actual factory measurement data (efficiency %, ripple noise mV, thermal °C)
- No specific Spanish import case study with named importer and real numbers
- No data visualization (chart, cost-comparison infographic)
- No year-over-year import trend data for Spain market
- No TARIC code specifics -- the article mentions HS codes but not Spain-specific TARIC subheadings
- No Spanish importer liability insurance cost estimates

**Verdict:** Strong regulatory depth with Spain-specific localization (AEAT, AENOR, IVA 21%). The article's primary value is organizing complex EU-Spain import regulations into a single Spanish-language reference. The AENOR mention, AEAT citation, and Spain-specific IVA calculation are legitimate competitive moat -- no competitor in the Spanish SERP provides this. Room for manufacturing-side data to push into 21-25 range.

### Gate 3: Scannability (15/20)

**H1 (line 362):** "Importar Cargadores China OEM: Guía de Aduanas, Aranceles y DDP 2026" -- **68 characters** (3 over the 50-65 standard). Contains B2B signals: "OEM", "Aduanas", "Aranceles", "DDP". Minor length issue. **-1**

**Schema headline (line 122) matches H1 exactly.** Unlike the DE article (triple-title problem), the ES article has aligned Schema and on-page H1. PASS.

**H2 B2B signal count:** 9 of 10 H2s contain explicit B2B signals (importar, HS, aranceles, certificaciones, IVA, INCOTERMS, envío, DDP, aduana). Well above minimum 2. PASS.

**H2 procurement chain alignment:**
- Why: Section 1 (Por qué importar cargadores desde China) -- YES
- What to verify: Section 2 (HS y aranceles), Section 3 (Certificaciones) -- YES
- How it's done: Section 5 (INCOTERMS), Section 6 (Envío), Section 7 (DDP), Section 8 (Documentación) -- YES
- What it costs: Section 4 (IVA 21%), Section 6 (costes de envío), Section 7 (DDP pricing) -- YES
- How to comply: Section 9 (Errores comunes) -- YES

Strong alignment with Spanish importer decision chain. PASS.

**H3 coverage gap:** The article uses `<h2>` + paragraphs structure rather than `<h2>` + `<h3>` for most sections. Only the body content under `<h2>` is split into paragraphs, not explicit H3 subheadings. This differs from the EN/DE articles which use explicit H3s. Sections that could benefit from H3s:
- Section 2 (HS y aranceles): could split into "Cargadores (HS 8504.40)" and "Power Banks (HS 8507.60)"
- Section 3 (Certificaciones): the 4 directives listed as `<ul>` could each be an H3
- Section 5 (INCOTERMS): the 4 INCOTERMS in the `<ul>` could each be an H3
- Section 9 (Errores comunes): the 6 errors in the `<ul>` could benefit from H3 grouping

Per quality standard, "every H2 must have at least 1 H3." Several sections technically fail this. **-3**

**TOC:** Present with 11 linked sections, branded dark blue background. Good visibility. PASS.

**Answer blocks:** FAQ answers are 100-150 characters, directly following each H3 question. PASS.

**"Puntos Clave" box:** Present with 5 bullets (line 407-417). Good structural element. PASS.

**Expert Insight block:** Present with Nina Nico verification (line 426-436). PASS.

**Deduction:** H1 over 65 chars (-1), H3 coverage gap (-3), display date 2 days behind schema (-1).

### Gate 4: Visual Authenticity (9/10)

**6 images total, all real factory/team photos:**

1. Hero cover (line 398): Import-themed cover -- alt: "Importar cargadores desde China a España: proceso aduanero, certificaciones CE y logística DDP para importadores B2B" -- B2B keywords: "importadores B2B", "proceso aduanero", "DDP" 
2. Section 3 (line 481): SMT production line -- alt: "Línea SMT en fábrica ISO 9001 de cargadores OEM en Shenzhen, producción con certificación CE, RoHS y UN38.3 para exportación DDP a España" -- B2B keywords: "fábrica ISO 9001", "OEM", "exportación DDP a España"
3. Section 5 (line 518): Packaging ready for shipment -- alt: "Cargadores OEM listos para envío DDP desde fábrica Shenzhen a España, embalaje certificado CE/UN38.3, etiquetado aduanero, INCOTERMS FOB/CIF/DDP para importadores" -- B2B keywords: "OEM", "FOB/CIF/DDP", "importadores"
4. Section 8 (line 560): Fire-retardant packaging -- alt: "Embalaje ignífugo certificado UN38.3 para power banks OEM de exportación, cumplimiento Reglamento UE 2023/1542, etiquetado CE/RoHS, documentación aduanera para importadores España" -- B2B keywords: "OEM", "importadores España", "documentación aduanera"
5. Section 9 (line 573): Team working -- alt: "Equipo WOWOHCOOL preparando envío de cargadores OEM para exportación DDP a España, embalaje certificado CE/UN38.3, documentación aduanera y control OQC pre-embarque" -- B2B keywords: "OEM", "DDP", "OQC pre-embarque"
6. Author photo (line 638): Nina Nico -- alt: "Nina Nico, Sales Manager en WOWOHCOOL, especialista en aprovisionamiento global e importación" -- with role title

**Zero stock photos detected.** All alt texts include B2B keywords in Spanish. PASS.

**All Spanish accents correct in alt texts** (verificado: 155 acentos en el archivo, todos correctos). No encoding loss issue unlike DE article's Umlaut-Massaker. PASS.

**Minor gap:** No data visualization (cost-comparison chart, import timeline infographic). For a process/cost article, a visual "Flujo de Importación" diagram or landed-cost breakdown chart would improve scan comprehension. **-1**

**Cover image localization issue:** The on-page hero image (line 398) uses `src="/image/blog/cover-de/ladegeraet-import-cover.webp"` -- this is the **German** article's cover image. While the alt text is correctly in Spanish, the image path references the DE cover directory. The ogImage in frontmatter (line 12) uses `/image/blog/cover-en/import-costs-guide.webp` (EN cover). The Schema thumbnailUrl (line 133) also uses the DE cover. Three different cover references, none ES-specific. See P1 fix below.

### Gate 5: CTA Relevance (9/10)

**Primary CTA (after FAQ, line 666):** "¿Necesita Ayuda con la Importación?" -- two buttons: "Solicitar Presupuesto DDP" -> /es/contacto/ and "Servicio OEM/ODM" -> /es/servicio-oem-odm/. Directly relevant to someone who just read about import process. B2B language: "Presupuesto DDP", "OEM/ODM". PASS.

**Secondary CTA (blog-cta.njk partial, line 732):** "Proyecto de importación en 24 horas", subject "Consulta desde Blog: Importar Cargadores China". Well-aligned with article topic. PASS.

**Related articles (line 684):** 3 links (Reglamento UE 2023/1542, Control de Calidad, GaN vs Silicio) -- all logically connected to import/certification topics. PASS.

**Internal links:** 6 contextual internal links throughout body:
- `/es/servicio-oem-odm/` (line 577)
- `/es/sobre-nosotros/` (line 646)
- `/es/contacto/` (line 674)
- `/es/blog/reglamento-ue-2023-1542-cumplimiento/` (line 687)
- `/es/blog/control-calidad-fabricas-chinas/` (line 695)
- `/es/blog/gan-vs-silicio-comparativa/` (line 703)

Well above minimum 3. PASS.

**Minor gap:** Inline CSS in WOWOHCOOL recommendation box (lines 542-543) uses `style="color:#ffffff;"` and `style="color:#e2e8f0;"` instead of Tailwind classes. The secondary CTA button "Servicio OEM/ODM" competes visually with the primary "Solicitar Presupuesto DDP." **-1**

### Gate 6: Schema Compliance (12/15)

**Required schemas checklist:**

| Schema | Status | Notes |
|--------|--------|-------|
| Organization | PASS | Full address, sameAs, contactPoint, areaServed, availableLanguage includes Spanish |
| WebSite | PASS | inLanguage es-ES, publisher ref, URL points to /es/ |
| BreadcrumbList | PASS | 3 levels: Inicio > Blog > Importar Cargadores desde China |
| BlogPosting | PASS | headline, description, datePublished (2026-05-02), dateModified (2026-08-01), wordCount (2908), timeRequired (PT9M), speakable, citation (6 sources), keywords, about, inLanguage es-ES |
| Person (Author) | PASS | LinkedIn URL, jobTitle ("Sales Manager, Logística y Certificaciones"), knowsAbout (6 topics), image, worksFor |
| FAQPage | NEEDS FIX | 6 questions. English text in FAQ Q3 and Q6 (see P1). |
| HowTo | PASS | 4 steps with HowToDirection per step, totalTime P8W, name in Spanish |
| SpeakableSpecification | PASS | On both BlogPosting (h1 + .speakable) and FAQPage (.faq-answer) |

**Citations:** 6 external authoritative sources (3 EU directives, AEAT, RAPEX, ICC INCOTERMS). All with valid URLs. Strong for GEO. PASS.

**P1: English text in Spanish FAQ schema (Lengua Inglesa en FAQ)**

Two FAQ answers in JSON-LD contain an English promotional sentence not present in the visible FAQ:

- FAQ Q3 (line 301): Acaba con "...Con DDP, el fabricante gestiona toda la documentación aduanera. **WOWOHCOOL has served 200+ global brands since 2013 with a defect rate below 0.3%.**"
- FAQ Q6 (line 325): Acaba con "...DDP es la opción más segura para empezar. **WOWOHCOOL has served 200+ global brands since 2013 with a defect rate below 0.3%.**"

The visible FAQ versions (lines 608, 623) do NOT contain this English text -- it exists ONLY in JSON-LD, visible to search engines but not readers.

**Same issue as DE article (P1: English text in German FAQ schema).** This is a cross-language copy-paste artifact.

**Fix:** Either translate to Spanish ("WOWOHCOOL ha servido a más de 200 marcas globales desde 2013 con una tasa de defectos inferior al 0,3%") or remove (self-promotional content in factual FAQ answers is questionable for EEAT).

**P1: Cover image inconsistency (Inconsistencia de Imagen de Portada)**

Three different cover image references, none ES-specific:

| Location | Path | Language |
|----------|------|----------|
| Frontmatter `ogImage` (line 12) | `/image/blog/cover-en/import-costs-guide.webp` | EN |
| Schema `thumbnailUrl` (line 133) | `/image/blog/cover-de/ladegeraet-import-cover.webp` | DE |
| On-page hero image (line 398) | `/image/blog/cover-de/ladegeraet-import-cover.webp` | DE |

The on-page hero and schema thumbnail both reference the **German** cover image. The social-sharing og:image references the **English** cover. Neither is appropriate for a Spanish article.

**Fix:** Use a language-neutral or ES-specific cover image. At minimum, align all three references to the same image. If a separate ES cover doesn't exist, the EN cover (`cover-en/`) is preferable to the DE cover for an ES article.

**P2: Missing ManufacturingBusiness additionalType.** Organization node lacks `"additionalType": "https://schema.org/ManufacturingBusiness"`. Same gap as EN and DE articles.

**P2: wordCount verification needed.** Schema says 2908. The brief says 2875 (body) / 2908 (schema). The raw file is 5667 words (includes Nunjucks template code, schema JSON, HTML markup). The actual article body word count needs verification with a markup-stripping tool.

**P3: BlogPosting Schema `thumbnailUrl` (line 133) uses DE cover image.** Already covered under P1 cover inconsistency.

### Gate 7: Meta + Links (8/10)

**Title (frontmatter, line 2):** "Importar Cargadores China OEM: Guía de Aduanas, Aranceles y DDP 2026 | WOWOHCOOL" -- contains B2B signals: "OEM", "Aduanas", "Aranceles", "DDP". The "| WOWOHCOOL" suffix is site branding. PASS.

**Meta description (line 3):** 155 characters. Contains B2B signals: "OEM", "MOQ 500", "FOB Shenzhen", "IVA 21%", "CE/UN38.3". Right at the acceptable maximum for SERP display. Brief's recommendation was followed precisely. PASS.

**Display date (line 375):** `<time datetime="2026-07-30">30 de julio de 2026</time>` -- visible date is July 30, but Schema `dateModified` and frontmatter `modified` both say 2026-08-01. 2-day gap. Minor compared to EN (Jun 12 vs Jul 24) and DE (Jun 29 vs Jul 26) which have ~1-month gaps. **-1**

**External links:** 6 authoritative sources (EUR-Lex directives, AEAT, RAPEX, ICC). Diversity and authority are strong. PASS.

**External link rel attributes:** The Fuentes section (lines 720-725) uses `rel="noopener external"` -- "external" is a non-standard rel value. The author bio LinkedIn links (lines 433, 642) correctly use `rel="noopener noreferrer"`. Inconsistency detected. For SEO, use `rel="noopener noreferrer"` consistently. **-1**

**Internal links:** 6 contextual internal links. PASS.

**hreflang (lines 15-17):** en, de, es tags present with correct URLs. PASS.

**canonical (line 9):** `/es/blog/importar-cargadores-china-aduanas/` -- present and correct. PASS.

**ogImage (line 12):** Present but uses EN cover image. PASS technically, but see P1 cover inconsistency.

---

## Spanish Localization Quality Check

### Spanish Market Data (Aduana Española, TARIC, IVA, Aranceles)

| Element | Status | Notes |
|---------|--------|-------|
| IVA rate | 21% | Correct for Spain (peninsular). Note: Canarias has IGIC, Ceuta/Melilla have IPSI -- not mentioned but acceptable for mainland-focused article. |
| AEAT reference | PASS | Spanish tax/customs authority cited in both body and Schema citations |
| AENOR reference | PASS | Spanish certification body -- unique to ES market, strong differentiator |
| TARIC codes | MISSING | Article uses generic HS codes, not Spain-specific TARIC subheadings |
| RAPEX/Safety Gate | PASS | EU-wide but correctly cited in Spanish context |
| INCOTERMS | PASS | EXW, FOB, CIF, DDP all correctly explained in Spanish |
| Regulatory references | PASS | All EU directives cited with correct Spanish names (Directiva de Baja Tensión, etc.) |
| Power bank tariff | 0-3,7% | Correct range. Same as DE article's correct figure. |
| UN38.3 reference | PASS | Correctly identified as mandatory for lithium battery transport |

### Spanish Language Quality (Acentos, Ortografía)

**All Spanish accents verified correct.** grep confirms 155 accented characters (`áéíóúüñÁÉÍÓÚÜÑ`), all properly encoded as UTF-8. Zero encoding loss detected. No systematic accent-loss issue like the DE article's Umlaut-Massaker.

Examples of proper Spanish usage:
- "Guía" (with tilde) -- correct
- "Aduanas" -- correct
- "Aranceles" -- correct
- "fábrica" (with tilde) -- correct
- "electrónica" (with tilde) -- correct
- "gestión" (with tilde) -- correct
- "Dirección" (with tilde) -- correct

Natural Spanish business terminology used:
- "importador OEM" (not translated from English)
- "valor en aduana" (correct Spanish customs terminology)
- "IVA soportado" (correct Spanish tax terminology)
- "agente de aduanas" (correct Spanish, not "customs broker" translated)
- "conocimiento de embarque" (correct Spanish for Bill of Lading)
- "declaración de conformidad" (correct Spanish for Declaration of Conformity)

**Verdict: The article reads as native Spanish, not translated from English.** Zero machine-translation artifacts detected.

---

## Data Consistency Check

### Tariff Rate: All Locations (PASS)

See Key Finding section above. All 8 locations consistently state 0% for HS 8504.40. No contradiction. The power bank rate (HS 8507.60: 0-3.7%) is also consistent.

### IVA Rate: All Locations (PASS)

All references to IVA consistently state 21%:
- Meta description (line 3)
- Hook (line 389)
- Key Takeaways (line 413)
- Body Section 4 (line 498)
- IVA calculation example (line 505)
- DDP Section 7 (line 535)
- FAQ Q1 (line 285)
- Schema FAQ Q1 (line 285)

**8/8 locations consistent.**

### Display Date vs Schema Date (P2)

| Location | Date |
|----------|------|
| Page `<time>` (line 375) | 30 de julio de 2026 |
| Frontmatter `modified` (line 5) | 2026-08-01 |
| Schema `dateModified` (line 141) | 2026-08-01 |

2-day gap. Minor compared to EN (1 month) and DE (1 month) articles. But for a time-sensitive import regulation article (Reglamento UE 2023/1542 with August 2025 deadline), accuracy matters.

### wordCount Discrepancy (P3)

| Source | Value |
|--------|-------|
| Schema BlogPosting (line 146) | 2908 |
| Research brief (body) | 2875 |
| Raw file `wc -w` | 5667 (includes Nunjucks + Schema + HTML) |

The 2908 figure is plausible for the visible article body (content within `{% block content %}`). Should be verified with a markup-stripping word counter.

### Cover Image: Triple Inconsistency (P1)

See Schema Compliance section. Three different images referenced (EN ogImage, DE on-page, DE thumbnailUrl). All should use the same ES-appropriate image.

---

## Comparison with DE and EN Counterparts

| Aspect | EN Article | DE Article | ES Article |
|--------|-----------|------------|------------|
| Overall Score | 83/100 | 77/100 | 79/100 |
| Tariff consistency | P2 (3 EU duty figures differ) | P0 (6 wrong vs 3 correct) | CLEAN (all 8 locations = 0%) |
| Encoding quality | OK | P0 Umlaut-Massaker (18+ errors) | CLEAN (all 155 acentos correct) |
| English text in schema | N/A (EN article) | P1 (DDP FAQ answer) | P1 (FAQ Q3 + Q6 answers) |
| Display date gap | P1 (~1 month) | P1 (~1 month) | P2 (2 days) |
| H3 coverage | P2 (Section 11 lacks H3) | P2 (Section 10 lacks H3) | P3 (multiple sections lack H3s) |
| Cover image | OK | OK | P1 (DE cover for ES article) |
| Unique market data | CBP Ruling N360577, Section 301 | BattDG, Stiftung EAR, LG München I | AEAT, AENOR, IVA 21% cálculo |
| wordCount | 4900 | ~3500-4000 (unverified) | 2908 (unverified) |
| FAQ questions | 8 | 7 | 6 |
| HowTo steps | 5 | 5 | 4 |
| Citation sources | 3 (USTR, CBP, USITC) | 3 (EU sources) | 6 (EU + AEAT + RAPEX + ICC) |
| GEO citability score | N/A | 83/100 | N/A (not audited yet) |

**ES article advantages over DE:**
1. No tariff contradiction (DE's biggest issue)
2. No encoding loss (DE's second biggest issue)
3. Properly localized regulatory references (AEAT, AENOR)
4. Stronger external citation count (6 vs 3)

**ES article disadvantages vs DE:**
1. Fewer explicit H3s (simpler structure)
2. Cover image localization error (DE cover on ES page)
3. Lower word count and fewer HowTo steps
4. Same English-in-schema bug as DE

---

## Critical Issues (P0)

None. No blocking issues found. The article is live, functional, and structurally sound.

---

## High Priority (P1) -- Fix This Week

1. **Remove/translate English text from FAQ schema**: FAQ Q3 (line 301) and FAQ Q6 (line 325) contain "WOWOHCOOL has served 200+ global brands since 2013 with a defect rate below 0.3%." This is English embedded in Spanish JSON-LD, visible to search engines. Same bug as DE article.

   **Fix option A (translate):**
   ```
   WOWOHCOOL ha servido a más de 200 marcas globales desde 2013 con una tasa de defectos inferior al 0,3%.
   ```

   **Fix option B (remove):** Delete the English sentence. The visible FAQ doesn't include this self-promotional text, and keeping it only in schema is a mismatch. For EEAT, factual FAQ answers should not include marketing claims.

2. **Fix cover image inconsistency**: Three different cover images across ogImage (EN), thumbnailUrl (DE), and on-page hero (DE). Align all three to use the same image. If an ES-specific cover exists, use it. Otherwise, prefer the EN cover (`/image/blog/cover-en/import-costs-guide.webp`) over the DE cover for an ES article -- the EN cover is brand-consistent and language-neutral.

---

## Medium Priority (P2) -- Fix This Month

3. **Add explicit H3s to sections that lack them**: Several body sections use `<h2>` + paragraphs without H3 subheadings. Per quality standard, every H2 must have at least 1 H3. Priority sections:
   - Section 2 (HS y aranceles): Add H3 for "Cargadores (HS 8504.40)" and "Power Banks (HS 8507.60)"
   - Section 2 body already has natural breaks for this split

4. **Fix external link rel attributes**: The Fuentes section uses `rel="noopener external"` ("external" is non-standard). Change all 6 Fuentes links to `rel="noopener noreferrer"` for consistency with the rest of the article.

5. **Update display date**: Change line 375 from `datetime="2026-07-30"` and "30 de julio de 2026" to `datetime="2026-08-01"` and "1 de agosto de 2026" (or the actual date when fixes are applied).

6. **Verify wordCount**: The schema says 2908. The body appears to be in the 2800-3000 word range. Verify with a proper word-counting tool (strip markup, count visible text only) and update both the schema `wordCount` and `timeRequired` if needed.

7. **Add ManufacturingBusiness additionalType** to Organization schema node for stronger entity recognition:
   ```json
   "additionalType": "https://schema.org/ManufacturingBusiness"
   ```

8. **Consider adding TARIC code specifics**: The article mentions HS codes but not Spain-specific TARIC subheadings. The Spanish customs authority (AEAT) uses TARIC for import classification. Adding a reference like "consulte el código TARIC completo en la web de la AEAT" would strengthen Spanish-market localization.

---

## Low Priority (P3) -- Nice to Have

9. **Tighten Conclusion section**: Reduce 3 paragraphs to 2. Move the floating RAPEX statistic paragraph (line 580) and Nina Nico quote (line 582) into Section 9 (Errores comunes) or a dedicated callout box -- they currently float between Conclusión and FAQ.

10. **Shorten H1 to 65 characters**: Current H1 is 68 characters. Options:
    - Drop "2026": "Importar Cargadores China OEM: Guía de Aduanas, Aranceles y DDP" (64 chars)
    - Drop "y DDP": "Importar Cargadores China OEM: Guía de Aduanas y Aranceles 2026" (63 chars)

11. **Fix inline CSS in recommendation box** (lines 542-543): Replace `style="color:#ffffff;"` and `style="color:#e2e8f0;"` with Tailwind classes (`text-white`, `text-slate-300`).

---

## Recommended Fixes (Code-Level)

### Fix 1: Translate/remove English from FAQ schema (lines 301, 325)

**FAQ Q3 (line 301-302):**
```json
"text": "Factura comercial, packing list, conocimiento de embarque (Bill of Lading o Air Waybill), certificado de origen y declaración de conformidad CE. Con DDP, el fabricante gestiona toda la documentación aduanera y usted recibe la mercancía directamente en su almacén."
```

**FAQ Q6 (line 325-326):**
```json
"text": "Con FOB (Free on Board), el fabricante entrega la mercancía en el puerto chino y usted gestiona transporte, seguro, aduana e IVA. Con DDP (Delivered Duty Paid), el fabricante asume todo hasta la puerta de su almacén en España, con precio cerrado. FOB es más económico para importadores experimentados; DDP es la opción más segura para empezar."
```

(These match the existing visible FAQ text on lines 608 and 623, removing the English intrusion without adding Spanish promotional text.)

### Fix 2: Align cover image references

**Line 398 (on-page hero image):**
```html
<img src="/image/blog/cover-en/import-costs-guide.webp"
```

**Line 133 (Schema thumbnailUrl):**
```json
"thumbnailUrl": "https://www.wowohcool.com/image/blog/cover-en/import-costs-guide.webp",
```

(Align both to use the EN cover, which is language-neutral. The ogImage frontmatter line 12 already uses this path.)

### Fix 3: Fix external link rel attributes (lines 720-725)

Change all 6 instances of `rel="noopener external"` to `rel="noopener noreferrer"`.

### Fix 4: Update display date (line 375)

```html
<time datetime="2026-08-02">2 de agosto de 2026</time>
```

### Fix 5: Add ManufacturingBusiness to Organization (after line 28)

```json
"@type": ["Organization", "ManufacturingBusiness"],
```

Or add `"additionalType": "https://schema.org/ManufacturingBusiness"` after `"name": "WOWOHCOOL"`.

---

## Pre-Commit Checklist (Post-Fix)

- [ ] English text removed from FAQ Q3 and Q6 schema answers
- [ ] Cover image aligned (all 3 references use same image, preferably EN cover)
- [ ] External link rel attributes standardized to `noopener noreferrer`
- [ ] Display date updated to actual modification date
- [ ] wordCount verified and updated if needed
- [ ] ManufacturingBusiness added to Organization schema
- [ ] H3s added to sections that lack them (optional but recommended)
- [ ] `dateModified` updated to today's date (2026-08-02 or date of fixes)
- [ ] Spanish accents grep-verified: `grep -c '[áéíóúüñ]'` confirms 155+ accented characters present
- [ ] FAQ answers in schema and visible FAQ match (no English-only content in schema)
- [ ] All 8 tariff references confirmed at 0% (no 2.4-2.7% intrusion)

---

## Summary

The ES article is a clean, well-localized Spanish import guide that avoids the DE article's two biggest problems: tariff contradiction (P0) and encoding loss (P0). All Spanish accents are properly encoded, the AEAT/AENOR localization is strong, and the IVA 21% calculation with worked example provides genuine Information Gain for the Spanish market.

Key strengths:
- **NO tariff contradiction** (clean sweep: 8/8 locations say 0% for HS 8504.40)
- All 155 Spanish accented characters correctly UTF-8 encoded (no accent-loss issue)
- Complete schema coverage (7 types)
- Real factory imagery with B2B Spanish alt text
- Spain-specific legal references (AEAT, AENOR)
- 6 external authoritative citations (EUR-Lex, AEAT, RAPEX, ICC)
- Research brief recommendations mostly followed (hreflang added, FAQ expanded 3->6, Expert Insight added, Key Takeaways added)
- Native Spanish quality (no machine-translation artifacts detected)

Priority issues (P1):
1. English text in Spanish FAQ schema (FAQ Q3 + Q6) -- same bug as DE article
2. Cover image inconsistency (DE cover on ES page, EN cover for og:image)

**Overall verdict: GOOD (79/100) -- Publish-ready with P1 fixes recommended. Fix time: 15 minutes for P1 items.**
