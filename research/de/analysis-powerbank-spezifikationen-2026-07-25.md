# Content Analysis: Powerbank Spezifikationen (DE)

**Date**: 2026-07-25
**File**: `src/de/blog/powerbank-spezifikationen/index.njk`
**URL**: `https://www.wowohcool.com/de/blog/powerbank-spezifikationen/`
**Auditor Score**: 70.3/100

---

## 1. Content Health Score

| Dimension | Score | Status |
|-----------|-------|--------|
| Opening Density (no-fluff) | 100/100 | ✅ |
| TL;DR / Key Takeaways | 100/100* | ✅ Fixed |
| H3 Answer Length | 87/100 | ⚠️ 2 H3s short |
| Vague Heading Detection | 100/100 | ✅ |
| H2 B2B Signal Density | 90/100 | ✅ |
| First-Hand Data Density | 100/100 | ✅ |
| Table Test | 100/100 | ✅ |
| Stock Photo Detection | 100/100 | ✅ |
| FAQ B2B Language | 0/100 | ❌ Critical |
| Author E-E-A-T | 17/100 | ❌ Critical |
| Weak CTA Detection | 20/100 | ❌ Critical |
| Heading Hierarchy | 100/100 | ✅ |
| Schema Validation | 70/100 | ⚠️ |

\* Auditor false positive — "WICHTIGSTE ERKENNTNISSE" block now exists above the fold.

---

## 2. Quick Wins

### 2.1 FAQ B2B Language (0/100) — CRITICAL

Current FAQ questions use consumer language. Change to B2B procurement perspective:

| Current (Consumer) | Fix (B2B Procurement) |
|---|---|
| "Welche Zertifizierungen brauche ich für Powerbanks?" | "Welche Zertifizierungen müssen OEM-Importeure vor dem ersten Inverkehrbringen nachweisen?" |
| "Was ist der Unterschied zwischen Nennkapazität und Nennleistung?" | "Nennkapazität vs. Nennleistung: Welche Spezifikation muss im OEM-Datenblatt stehen?" |
| "Was ist der Unterschied zwischen Li-Po, LiFePO4 und Semi-Solid-State?" | "Li-Po vs. LiFePO4 vs. Semi-Solid-State: Welcher Akkutyp rechnet sich für welche OEM-Marge?" |
| "Welche gesetzlichen Pflichten habe ich als Importeur?" | "BattG/BattDG 2026: Welche Registrierungspflichten gelten für Powerbank-Importeure?" |
| "Integriertes vs. separates Kabel: Vergleich" | "Built-in Cable vs. separates Kabel: Stückkosten, Retourenquote und Amazon-Bewertung im OEM-Vergleich" |

### 2.2 Author E-E-A-T (17/100) — CRITICAL

Missing from Schema Person node:
- `jobTitle` exists but no `description` with credentials
- `sameAs` LinkedIn exists but author name in hero bar links to `#autor` (not `#author-bio`)
- **Fix**: Change hero link from `#autor` to `#author-bio`

### 2.3 Schema Organization — MISSING `logo`

Add to Organization node:
```json
"logo": {
  "@type": "ImageObject",
  "url": "https://www.wowohcool.com/image/wowohcool-logo-optimized.webp"
}
```

### 2.4 CTA Detection (20/100)

CTA exists (gradient section after Author Bio), but auditor may not detect it. Ensure:
- CTA `<h2>` has keyword-rich text
- Buttons use procurement language ("Powerbank-Angebot anfordern" ✅)
- CTA section is NOT inside the article wrapper

---

## 3. Strategic Improvements

### 3.1 H2 Section Card Wrapping

All 12 H2 sections are bare `<h2>` tags without `<section>` + card wrappers. Per blog-template-standard, wrap each section:

```html
<section id="h2-N" class="mb-16">
  <div class="bg-slate-50 rounded-xl p-6 border border-slate-200 shadow-sm">
    <h2 class="text-2xl font-black text-brandBlue uppercase italic mb-6">N. Title</h2>
    ...
  </div>
</section>
```

**Impact**: Visual consistency with EN blog template, better content hierarchy for crawlers.

### 3.2 Content Freshness

| Element | Current | Recommendation |
|---------|---------|---------------|
| Date reference | "23. Mai 2026" in hero | Update `modified` to 2026-07-25 |
| Market data | "über 20 Milliarden US-Dollar" | Add specific source year (Fortune Business Insights 2026) |
| GB 47372-2026 | Mentioned | Update to "verpflichtend ab April 2027" status |

### 3.3 Internal Links

Current internal links count is adequate (~8-10). Add:
- Link to `/de/blog/powerbank-beschaffung-leitfaden/` from Section 8 (OEM-Produktion)
- Link to `/de/blog/semi-solid-state-powerbank/` from Section 4

### 3.4 Image Optimization

Current images need `srcset` + `sizes` for LCP:
```html
<img src="..." 
     srcset="...-800.webp 800w, ...-1200.webp 1200w"
     sizes="(max-width: 768px) 100vw, 896px"
     ...>
```

---

## 4. What's Already Fixed (This Session)

| Fix | Status |
|-----|--------|
| Hero Header standardization | ✅ |
| Key Takeaways (WICHTIGSTE ERKENNTNISSE) | ✅ |
| TOC format + `#faq` link | ✅ |
| TOC text-white visibility bug | ✅ |
| FAQ section inside blog-content wrapper | ✅ |
| FAQ card styling (rounded-xl p-6) | ✅ |
| CTA gradient format | ✅ |
| Author Bio + Factory Footprint | ✅ |
| Related Articles gradient bar format | ✅ |
| Expert Insight embedded in Section 4 | ✅ |
| Schema legalName + publishingPrinciples | ✅ |
| Orange border (only 1 instance) | ✅ |

---

## 5. Rewrite Recommendation

| Factor | Value |
|--------|-------|
| **Priority** | Medium |
| **Effort** | Light edit (1-2 hours) |
| **Expected Impact** | FAQ language fix → +10-15% B2B relevance signal; Schema fix → +Google Knowledge Graph eligibility |
| **Key Actions** | 1. Rewrite FAQ in B2B language 2. Add Schema logo 3. Fix `#autor` → `#author-bio` link |

---

## 6. Research Brief (for future /rewrite)

**Target Keywords (DE)**:
- Powerbank Spezifikationen Importeur
- Powerbank OEM technische Daten
- mAh PD 3.1 Akkutyp Vergleich
- BattG Powerbank Registrierung 2026

**Competitor Articles to Review**:
- Anker DE Powerbank Kaufberatung
- UGreen DE technische Spezifikationen
- INIU DE Produktvergleich

**New Data to Incorporate**:
- Q3 2026 DACH Powerbank Marktanteile
- Updated GB 47372-2026 enforcement timeline
- USB-C EU mandate impact on power bank design (April 2026 deadline)
