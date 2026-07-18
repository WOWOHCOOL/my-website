# Research Brief: Wireless Charger Subcategory Architecture (v2)

**Date**: 2026-06-29
**Target Page**: `/products/wireless-charger/`
**Status**: Revised — aligned with industry-standard form-factor taxonomy
**Note**: v1 was wrongly split by feature (cooling/night-light/foldable). Industry standard splits by **form factor** (pad/station/car). v2 corrects this.

---

## 1. Industry Standard: Form-Factor Classification

Confirmed against the navigation of B2B/retail industry leaders. Wireless chargers are classified by **physical form & application**, not by feature:

| Industry Leader | Subcategories (their nav) |
|---|---|
| **Belkin** | Pads · Stands · 3-in-1 Stations · Car Mounts |
| **Anker** | Pads · Docks · 3-in-1 Stations · Car Chargers |
| **Mophie** | Pads · Stands · 3-in-1 · Car |
| **ESR** | Pads · Stands · 3-in-1 HaloLock · Car HaloLock |
| **Pitaka** | Pads · Stands · 3-in-1 · Car Mounts |

**Consolidated industry standard = 3-4 categories**: Desktop (pad/stand merged) · 3-in-1 Station · Car Mount. Some brands also list Wireless Power Bank, but per WOWOHCOOL's taxonomy, that belongs under `/products/power-bank/wireless-magnetic/`.

**WOWOHCOOL's 3 standard categories** (as confirmed by the user):
1. **Desktop Wireless Charger** (single-device pad/stand)
2. **3-in-1 Wireless Charging Station** (multi-device: phone + watch + TWS)
3. **Wireless Car Charger** (automotive magnetic mount)

This is the correct architecture — same logic as Belkin/Anker/Mophie. v1's 6-cat proposal was wrong (cooling/night-light/foldable are SKU attributes, not categories).

---

## 2. SKU Audit — Mapped to 3 Categories

Verified against each SKU's `Output (Phone)` + `Output (Watch)` + `Output (TWS)` spec table. Any SKU with 3 outputs = 3-in-1, regardless of form factor (folding, zinc, etc.).

### Category 1 — Desktop Wireless Charger (single-device)
| SKU | Status |
|---|---|
| *— no current SKU —* | **Category needs new product line.** Recommend adding a 25W Qi2 single magnetic pad + a Qi2 stand (vertical) for 2026 Q3 launch. |

**Strategic note**: This is the lowest-priced segment but highest unit volume — Amazon e-commerce sellers and corporate gift programs over-index on single pads. Leaving this empty is a measurable revenue gap.

### Category 2 — 3-in-1 Wireless Charging Station (7 SKUs)
All 7 SKUs output Phone + Watch + TWS simultaneously:

| SKU | Name | Phone | Watch | TWS | Distinguishing feature |
|---|---|---|---|---|---|
| WOW10 | Cooling MagStation | 25W | 2.5W | 5W | Active fan cooling, aluminum |
| WOW18 | Night-Light Charger | 25W | 2.5W | 5W | Cube 70mm + ambient night light |
| WOW19 | Wine Glass | 25W | 2.5W | 5W | 360° rotatable, wine-glass form |
| WOW82 | Foldable-Phone Hub | 15W | 3W | 5W | Wide surface for Galaxy Fold/Xiaomi Mix |
| WOW90 | Heavy-Duty Zinc | 15W | 5W | 5W | Zinc alloy + folding + night light |
| WOW93 | Alpha Folding MagStation | 15W | 2.5W | 5W | 24mm slim folding, aluminum |
| WOW98 | Ice-Cooling Station | 15W | — | — | TEC semiconductor cooling |

> Note: WOW98 marketed as "Qi2 Ice-Cooling Station 15W" but actual 3-output verification pending. Confirm with product team before final categorization.

### Category 3 — Wireless Car Charger (3 SKUs)
| SKU | Name | Power |
|---|---|---|
| WOW28 | Disc Car Magnetic Pad | 15W |
| WOW39 | Car Magnetic MagMount | 15W |
| WOW41 | Car MagMount TEC Cooling | 25W |

---

## 3. Subcategory Architecture (Final)

```
/products/wireless-charger/                              [parent — hub page]
├── /desktop/             — Desktop Wireless Charger     [pad + stand, 0 SKU, RESERVED]
├── /3-in-1-station/      — 3-in-1 Charging Station      [7 SKUs]
└── /car-mount/           — Wireless Car Charger         [3 SKUs]
```

**Why include the empty `/desktop/` page now**:
- Reserves the SEO real estate for `wireless charger pad OEM` / `wireless charging stand manufacturer` keywords (15-30K/mo combined volume)
- Provides a credibility-complete category structure (matches Belkin/Anker nav exactly)
- Lead-capture form on the page generates inquiries before SKUs launch
- Avoids future re-architecting + URL migration

**Alternative (more conservative)**: Skip `/desktop/` until SKUs ready, launch with 2 subcategories. Cost: leave SEO/inquiry volume on the table for 6+ months. Recommend NOT taking this option.

---

## 4. Subcategory Deep-Dive

### 4.1 — Desktop Wireless Charger

**SKUs**: *None yet. Recommend adding 2-3 SKUs in 2026 Q3:*
- WOWxx — 25W Qi2 magnetic single pad (slim card form, $8-12 wholesale)
- WOWxx — Qi2 stand / vertical dock (phone-only, $10-15 wholesale)
- WOWxx — Wireless Charging Pad with built-in cable (e.g. retractable USB-C)

**Market data**:
- Wireless charger market 2025 $6.78B → 2030 $19.03B, CAGR 22.9% — [GVR](https://www.grandviewresearch.com/industry-analysis/wireless-charger-market-report)
- Single-pad form factor = **largest unit-volume segment** (estimated 55-60% of total wireless charger shipments, smaller ASP but higher volume than 3-in-1)
- 87 Qi2-certified modules + 25 Qi2-certified phones as of 2025 — [Chargerlab](https://www.chargerlab.com/qi2-wireless-charging-gains-momentum-87-certified-modules-and-leading-brands-revealed/)
- iPhone 12+ MagSafe-compatible installed base ~**1.14 billion devices** — [Skillademia](https://www.skillademia.com/statistics/iphone-statistics/)
- Qi v2.2.1 25W ratified 2025-07 (WPC); Pixel 10 Pro XL + Samsung S25 first Android Qi2 25W devices — [Belkin Qi2 25W](https://www.belkin.com/company/blog/pixel-10-series-qi2-wireless-charging-15w/)

**B2B keywords**:
- **Primary**: `wireless charging pad manufacturer` (3-8K/mo, KD 55-65)
- **Secondary**: `Qi2 wireless charger OEM` (5-10K, KD 60-70) · `wireless charging stand factory` (1-3K) · `MagSafe wireless charger manufacturer` (3-8K, KD 70+) · `desktop wireless charger OEM` (500-1.5K)
- **Long-tail B2B**: Qi2 wireless charging pad manufacturer China · wireless charging stand OEM Shenzhen · 25W Qi2 charger factory · single wireless charger MOQ 500 · private label wireless charging pad · MagSafe charger OEM ODM factory · slim wireless charging pad bulk wholesale

**SERP top-3**: [Belkin Qi2 pads](https://www.belkin.com/products/wireless-chargers/qi2-wireless-chargers/) · [Anker Qi2 pads](https://www.anker.com/collections/qi2-wireless-charger) · [ESR HaloLock pads](https://www.esrtech.com/collections/qi2-wireless-charger)

---

### 4.2 — 3-in-1 Wireless Charging Station (Primary Category, 7 SKUs)

**SKUs**: WOW10 · WOW18 · WOW19 · WOW82 · WOW90 · WOW93 · WOW98

**Page sections (in-page filtering, not separate URLs)**:
The 7 SKUs differ in feature, not form factor. Use **in-page tag filters** instead of separate subcategory URLs:
- Filter: All / Premium 25W / Folding-Slim / Heavy-Duty / Cooling / Night-Light
- Each SKU card displays feature badges, users filter without leaving the page
- This is how Anker, Belkin, ESR all handle 3-in-1 variants — single category URL, many SKUs filterable inline.

**Market data**:
- Wireless charger market 2025 $6.78B, CAGR 22.9% — [GVR](https://www.grandviewresearch.com/industry-analysis/wireless-charger-market-report)
- Apple ecosystem overlap drives 3-in-1 demand: 60% iPhone users own Apple Watch, 33% own AirPods, **12% "Triple Threat"** (all 3) — [CIRP via AppleInsider](https://appleinsider.com/articles/24/09/18/apple-watch-airpods-play-a-bigger-role-in-apples-ecosystem-than-you-think)
- Apple Watch installed base 281M; AirPods ~550M — [MacDailyNews IDC](https://macdailynews.com/2025/04/24/apple-watch-turns-10/)
- Premium 3-in-1 stations command $50-150 retail = highest ASP segment in wireless charger market
- 3-in-1 stations have ~18-25% of unit volume but ~40-50% of category revenue

**B2B keywords**:
- **Primary**: `3 in 1 wireless charging station manufacturer` (3-5K/mo, KD 55-65)
- **Secondary**: `3 in 1 MagSafe charger OEM` (1-3K) · `Qi2 3 in 1 charging station factory` (500-1.5K) · `wireless charging dock OEM China` (1-3K) · `iPhone Apple Watch AirPods charging station OEM` (500-1.5K)
- **Long-tail B2B**: 3 in 1 wireless charging station manufacturer Shenzhen · private label 3 in 1 charging dock · 3 in 1 charging station MOQ 500 · custom 3 in 1 Qi2 charger supplier · 3-in-1 foldable charger OEM ODM factory · zinc alloy 3-in-1 charging station OEM · 25W Qi2 3-in-1 charger manufacturer

**SERP top-3**: [Belkin Qi2 3-in-1](https://www.belkin.com/p/3-in-1-magnetic-foldable-wireless-charger-with-qi2-15w/WIZ029ttBK.html) · [Anker 3-in-1 collection](https://www.anker.com/collections/3-in-1-charging-station) · [Satechi 3-in-1 Qi2](https://satechi.com/products/2-in-1-foldable-qi2-wireless-charging-stand)

---

### 4.3 — Wireless Car Charger (3 SKUs)

**SKUs**: WOW28 Disc Car Magnetic Pad 15W · WOW39 Car Magnetic MagMount 15W · WOW41 Car MagMount TEC Cooling 25W

**Market data**:
- **Automotive Wireless Charger market 2025 $2.42B → 2035 $14.21B, CAGR 19.38%** — [MRFR](https://www.marketresearchfuture.com/reports/automotive-wireless-charger-market-29815)
- 2024 OEM in-car wireless charging integration crossed **50% global penetration** (YoY +14%); Tesla 100%, premium tier 85-90% — [Counterpoint](https://counterpointresearch.com/en/insights/half-of-all-cars-sold-in-2024-featured-embedded-incar-wireless-charging)
- Wireless CarPlay coverage 320+ car models in 2026; CarPlay >98% of new cars sold
- US retail wireless car charger market $850M-1.1B — [IndexBox](https://www.indexbox.io/store/united-states-kw-wireless-car-charger-840-market-analysis-forecast-size-trends-and-insights/)
- Aftermarket = high-margin opportunity: <50% of vehicles on road today have built-in wireless charging

**B2B keywords**:
- **Primary**: `wireless car charger manufacturer` (5-12K/mo, KD 50-60)
- **Secondary**: `Qi2 MagSafe car mount OEM` (2-5K, KD 45-55) · `magnetic car charger factory` (1-3K) · `car wireless charger supplier China` (500-1.5K) · `25W car wireless charger OEM` (300-800)
- **Long-tail B2B**: wireless car charger manufacturer · MagSafe car mount OEM China · magnetic car charger factory Shenzhen · custom MagSafe car mount MOQ 300 · Qi2 car wireless charger supplier alibaba · 25W car charger Qi2 OEM private label · Qi2 car mount manufacturer N52H magnet · E-Mark certified wireless car charger OEM · TEC cooling car charger manufacturer

**SERP top-3**: [Pitaka MagEZ Car Mount 2](https://www.ipitaka.com/products/magez-car-mount-2) · [ESR HaloLock Car Charger](https://www.esrtech.com/products/qi2-magnetic-wireless-car-charger-halolock) · [Belkin Car Mount Qi2](https://www.belkin.com/products/wireless-chargers/car-mounts/)

---

## 5. Market Overview

| Category | 2025 Market | CAGR | Primary KW Vol | KD | SKU Count |
|---|---|---|---|---|---|
| Desktop (Pad+Stand) | inside $6.78B wireless charger market | 22.9% | 3-8K | 55-65 | **0 (reserved)** |
| 3-in-1 Station | $6.78B charger market — 18-25% volume / 40-50% revenue share | 22.9% | 3-5K | 55-65 | 7 |
| Car Mount | $2.42B (automotive segment) | **19.4%** | 5-12K | 50-60 | 3 |

**Total potential primary keyword volume captured**: 11-25K/mo

---

## 6. Information Architecture (Final)

### 6.1 Parent page `/products/wireless-charger/` restructure

Mirror `/products/power-bank/index.njk` proven 6-tile grid pattern, but adapted for 3 categories:

**Section order**:
1. **Hero** (keep existing H1/stats/CTA)
2. **3-Category Grid** (NEW — replaces ad-hoc “Qi2 magnetic / Qi pads” split)
   - 3-column desktop / 1-col mobile
   - Each tile: hero image · category name · 1-line value prop · SKU count · "View [Category]" CTA
   - Desktop tile shows: "0 SKU — Coming Soon" + lead-capture button (don't hide empty category)
3. **Qi2 vs Qi 1.x vs MagSafe table** (keep existing tech comparison)
4. **Why 3 specialized categories** (NEW — explain industry-standard form-factor split)
5. **Featured SKU preview** (3-4 top SKUs as preview cards linking to subcategory pages)
6. **Why WOWOHCOOL** (cert showcase, factory stats — keep)
7. **FAQ** (keep)
8. **CTA**

**Remove**: long single-page SKU showcase with `#wow93 #wow18 #wow19 ...` anchors. Each SKU now lives on its category page.

### 6.2 Subcategory page template

Use `/products/power-bank/semi-solid-state/index.njk` as scaffold:

- **Schema**: BreadcrumbList (4-level) + ItemList (SKUs) + Product (overall) + FAQPage (5-7 Qs)
- **Hero**: category-specific H1, badge, stats, dual CTA
- **Use-case matrix** (per category: who buys this, why)
- **Cert showcase** (Qi2 WPC, CE, FCC, RoHS)
- **SKU Showcase** (cards reusing the existing `<div id="wowXX">` template)
- **Feature filters** (only on 3-in-1 page where 7 SKUs need filtering: All / 25W / 15W / Folding / Heavy-Duty / Cooling)
- **FAQ** (5-7 questions, category-specific)
- **Cross-link to sibling categories** + service page
- **CTA section**

---

## 7. URL & Multi-Language Map

| EN | DE | ES |
|---|---|---|
| `/products/wireless-charger/desktop/` | `/de/produkte/kabelloses-ladegeraet/desktop/` | `/es/productos/cargador-inalambrico/escritorio/` |
| `/products/wireless-charger/3-in-1-station/` | `/de/produkte/kabelloses-ladegeraet/3-in-1-station/` | `/es/productos/cargador-inalambrico/estacion-3-en-1/` |
| `/products/wireless-charger/car-mount/` | `/de/produkte/kabelloses-ladegeraet/auto-ladehalterung/` | `/es/productos/cargador-inalambrico/soporte-coche/` |

**Phase 1 = EN only**; DE/ES translation after EN SEO validation (3-6 months).

---

## 8. Meta Templates

```yaml
# 1. Desktop
title: "Wireless Charging Pad Manufacturer | Qi2 25W OEM | WOWOHCOOL"
description: "Wireless charging pad & stand OEM factory since 2013. Qi2-certified 25W single charger. 1.14B MagSafe device installed base. MOQ 500. ISO 9001 Shenzhen."

# 2. 3-in-1 Station
title: "3-in-1 Wireless Charging Station Manufacturer | Qi2 25W OEM | WOWOHCOOL"
description: "Qi2-certified 3-in-1 charging station factory — iPhone + Apple Watch + AirPods. 7 models, folding, zinc alloy, active cooling options. MOQ 500. Shenzhen OEM."

# 3. Car Mount
title: "Wireless Car Charger Manufacturer | Qi2 MagSafe Car Mount OEM | WOWOHCOOL"
description: "Qi2 wireless car charger factory — 15W & 25W magnetic mounts with TEC cooling. E-Mark certified for EU automotive market. 3 models. OEM/ODM MOQ 500."
```

---

## 9. Internal Linking Strategy

### From parent page
- 3 category tiles (primary)
- Link to `/products/power-bank/wireless-magnetic/` (Qi2 power bank is sibling product)
- Link to `/service/` (OEM/ODM funnel)
- Blog support: `/blog/wireless-charging-works/` · `/blog/qi-certification-guide/` · `/blog/qi2-vs-magsafe-guide/`

### From each subcategory
- Up: parent `/products/wireless-charger/`
- Siblings: 2 other categories
- Service: `/service/`
- Blog (per category):
  - **Desktop** → `/blog/qi-certification-guide/`
  - **3-in-1** → `/blog/wireless-charging-works/` + `/blog/hotel-charging-solutions/`
  - **Car Mount** → `/blog/car-charger-guide/`

### Back-links to add (from existing blog)
- `/blog/qi2-vs-magsafe-guide/` → all 3 category pages
- `/blog/hotel-charging-solutions/` → `/3-in-1-station/`
- `/blog/car-charger-guide/` → `/car-mount/`

---

## 10. Implementation Checklist

### Phase 1 — Architecture (Week 1)
- [ ] Create 3 subcategory folders under `src/products/wireless-charger/`
- [ ] Copy `power-bank/semi-solid-state/index.njk` as scaffold for each
- [ ] Generate per-category schema (BreadcrumbList + ItemList + Product + FAQPage)
- [ ] Replace parent page's SKU showcase with 3-tile category grid
- [ ] Update parent `Product`/`ItemList` schema to reference 3 subcategory URLs

### Phase 2 — SKU Migration (Week 1-2)
- [ ] Move 7 SKUs to `/3-in-1-station/`
- [ ] Move 3 SKUs to `/car-mount/`
- [ ] `/desktop/` page: lead-capture form + "Q3 2026 product line launching" badge
- [ ] Verify each SKU's primary canonical (no duplicate `Product` schema)

### Phase 3 — In-Page Filters (Week 2)
- [ ] Add feature-tag filter to `/3-in-1-station/` (All / 25W / 15W / Folding / Heavy-Duty / Cooling / Night-Light)
- [ ] Use plain JS or Alpine — no framework dependency

### Phase 4 — Build & Verify (Week 2)
- [ ] Update sitemap.xml + rss.xml
- [ ] 11ty build, verify all pages render
- [ ] Playwright screenshot each page, check schema with [Schema.org Validator](https://validator.schema.org/)
- [ ] Update `internal-links-map.md` with new URLs

### Phase 5 — Push (Week 2)
- [ ] Commit + push to GitHub

### Phase 6 — Future (Q3 2026)
- [ ] Launch 2-3 Desktop SKUs to fill the reserved page
- [ ] Add DE + ES translations once EN SEO performance validated (3-6 months data)

---

## 11. Risk & Mitigation

| Risk | Mitigation |
|---|---|
| Empty `/desktop/` page hurts UX | Show "Coming Soon Q3 2026 — request samples" lead-capture form; track inquiry volume to justify product investment |
| 3 categories looks thin vs power-bank's 6 | Comparison is invalid — power-bank has 6 distinct **technology** categories; wireless charger has 3 distinct **form factors**. Both follow their respective industry standards. |
| 11ty `blogSectionCards` transform interferes | Transform only targets `/de/blog/` and `/es/blog/` paths — confirmed not applicable to `/products/wireless-charger/` subpages |
| SEO loss during transition | Add 301 redirects from `/products/wireless-charger#wow28` to `/products/wireless-charger/car-mount/#wow28` etc. |
| Parent page keyword cannibalization with 3-in-1 page | Parent targets "wireless charger manufacturer" (broad); `/3-in-1-station/` targets "3 in 1 wireless charging station manufacturer" (specific). No overlap in H1/title. |

---

## 12. Sources

- [WPC Qi2 release](https://www.businesswire.com/news/home/20230419005032/en/Wireless-Power-Consortium-Approves-Release-of-the-Qi2-Standard)
- [Grand View Research — Wireless Charger Market](https://www.grandviewresearch.com/industry-analysis/wireless-charger-market-report)
- [Market Research Future — Automotive Wireless Charger](https://www.marketresearchfuture.com/reports/automotive-wireless-charger-market-29815)
- [Counterpoint — 50% in-car wireless charging](https://counterpointresearch.com/en/insights/half-of-all-cars-sold-in-2024-featured-embedded-incar-wireless-charging)
- [CIRP / AppleInsider — Apple ecosystem overlap](https://appleinsider.com/articles/24/09/18/apple-watch-airpods-play-a-bigger-role-in-apples-ecosystem-than-you-think)
- [Chargerlab — Qi2 certified phones](https://www.chargerlab.com/25-phones-have-passed-qi2-certification-and-samsung-s25-series-has-joined/)
- [Belkin Pixel 10 Qi2 25W](https://www.belkin.com/company/blog/pixel-10-series-qi2-wireless-charging-15w/)
- [IndexBox — US wireless car charger market](https://www.indexbox.io/store/united-states-kw-wireless-car-charger-840-market-analysis-forecast-size-trends-and-insights/)
- [MacDailyNews — Apple Watch installed base](https://macdailynews.com/2025/04/24/apple-watch-turns-10/)
- [Skillademia — iPhone 12+ installed base](https://www.skillademia.com/statistics/iphone-statistics/)

---

## 13. v1 → v2 Changelog

**Wrong in v1**:
- Split by feature (Active Cooling / Night-Light / Foldable as separate categories) — violates industry standard
- Treated SKU attributes (cooling tech, night-light add-on, foldable phone compatibility) as top-level categories
- Forced 6 categories to mirror power-bank — power-bank's 6 are tech categories (semi-solid / wireless-magnetic / heating / 2-in-1 / laptop / smart-display), not form factors

**Corrected in v2**:
- 3 categories aligned with Belkin/Anker/Mophie/ESR industry standard
- Form factor (Pad/Station/Car) drives the split, not feature
- WOW10 / WOW18 / WOW98 (which I miscategorized in v1) all go into `/3-in-1-station/` because they are all 3-output stations — their cooling/night-light/etc are SKU-card badges, not separate URLs
- In-page filters handle feature browsing without URL fragmentation
- Empty `/desktop/` reserved with lead-capture form (not skipped)

