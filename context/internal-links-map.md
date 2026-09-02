# Internal Links Map — WOWOHCOOL

**Last Updated:** 2026-09-02
**URL Structure:** Clean URLs (no .html). All links relative to root.

> ⚠️ **六语言前缀规则（2026-09-02 扩充）**：本表 URL 均为 EN 路径。其他语言文章内链时必须加语言前缀并本地化 slug：DE `/de/blog/{de-slug}/`、ES `/es/blog/{es-slug}/`、FR `/fr/blog/{fr-slug}/`、RU `/ru/blog/{ru-slug}/`、PL `/pl/blog/{pl-slug}/`。**正确做法：先在目标文章 frontmatter 的 `hreflang` 块里查同簇目标语言的真实 slug**（如 EN `how-to-choose-factory` → DE `fabrikauswahl-china-leitfaden`），禁止把 EN slug 直接加前缀（产生死链/错链）。产品页/服务页同理：`/de/produkte/powerbank/`、`/es/productos/powerbank/`、`/fr/produits/batterie-externe/`、`/ru/produkty/poverbanki/`、`/pl/produkty/power-bank/`——以各语言站实际路由为准。

---

## Homepage & Core Pages

| Page | URL | Anchor Text Examples |
|------|-----|---------------------|
| Homepage | `/` | "WOWOHCOOL", "Dong Yi Technology", "the WOWOHCOOL factory" |
| About | `/about/` | "about WOWOHCOOL", "our Shenzhen factory", "since 2013" |
| OEM/ODM Service | `/service/` | "OEM/ODM services", "custom manufacturing", "start your OEM project" |
| Contact | `/contact/` | "contact WOWOHCOOL", "request a quote", "get factory pricing" |
| Case Studies | `/case-studies/` | "client success stories", "OEM case studies", "brand partnerships" |
| FAQ | `/faq/` | "frequently asked questions", "OEM FAQ" |
| Blog Home | `/blog/` | "WOWOHCOOL blog", "OEM sourcing guides", "manufacturing resources" |

---

## Product Pages

| Product | URL | Anchor Text Examples |
|---------|-----|---------------------|
| Power Banks | `/products/power-bank/` | "OEM power banks", "custom power banks", "power bank catalog" |
| → Semi-Solid-State | `/products/power-bank/semi-solid-state/` | "semi-solid-state power bank", "CES 2026 battery technology" |
| → Wireless Magnetic | `/products/power-bank/wireless-magnetic/` | "Qi2 magnetic power bank", "MagSafe-compatible power bank" |
| → 2-in-1 Hybrid | `/products/power-bank/2-in-1-hybrid/` | "GaN power bank charger combo", "2-in-1 portable charger" |
| → Laptop Power | `/products/power-bank/laptop-power/` | "laptop power bank OEM", "PD 3.1 240W power bank" |
| → Heating Battery | `/products/power-bank/heating-battery/` | "heating battery OEM", "heated jacket battery pack" |
| → Smart Display | `/products/power-bank/smart-display/` | "TFT display power bank", "custom branded power bank" |
| GaN Chargers | `/products/gan-charger/` | "GaN charger OEM", "gallium nitride charger factory" |
| Wireless Chargers | `/products/wireless-charger/` | "Qi2 wireless charger OEM", "custom wireless charging pads" |
| → 3-in-1 Station | `/products/wireless-charger/3-in-1-station/` | "3-in-1 wireless charging station", "Qi2 desktop charger OEM" |
| → Car Mount | `/products/wireless-charger/car-mount/` | "Qi2 car charger mount", "magnetic car phone holder OEM" |
| → Desktop | `/products/wireless-charger/desktop/` | "wireless desktop charger OEM", "Qi2 office charging pad" |
| Car Chargers | `/products/car-charger/` | "car charger OEM", "PD car charger factory" |

---

## Blog Article Internal Linking Strategy

### Power Bank Articles (Cross-Link Cluster)
All power bank articles should link to each other and to `/products/power-bank/`:
- `how-to-choose-power-bank` (pillar) ← all power bank articles link here
- `power-bank-specs-guide` ↔ `power-bank-mah-explained` (specs cluster)
- `power-bank-private-label-oem-production` ↔ `top-power-bank-manufacturers-china` (sourcing cluster)
- `semi-solid-state-power-bank-oem` (technology differentiator)

### GaN Charger Articles (Cross-Link Cluster)
- `what-is-gan-charger` (pillar) ← all GaN articles link here
- `gan-chargers-guide` ↔ `gan-generations-guide` (education cluster)
- `gan-v-charger-oem-manufacturing` ↔ `gan-vs-silicon-charger-comparison` (production cluster)

### Wireless Charger Articles (Cross-Link Cluster)
- `wireless-charging-works` (pillar) ← all wireless articles link here
- `qi2-vs-magsafe-guide` ↔ `qi-certification-guide` (standards cluster)

### Sourcing & Import Articles (Cross-Link Cluster)
- `how-to-choose-factory` (pillar) ← all sourcing articles link here
- `factory-verification-checklist` ↔ `choose-reliable-china-charger-supplier` (verification cluster)
- `import-costs-guide` ↔ `shipping-from-china-guide` (logistics cluster)
- `oem-vs-odm-guide` (standalone decision guide — link to all)

### Compliance Articles (Cross-Link Cluster)
- `certifications-us-eu-guide` ↔ `charger-safety-standards` ↔ `quality-control-guide`

### Market Intelligence Articles
- `charging-accessory-market-trends-2026` ↔ all technology-specific articles
- `usb-c-pd-3-1-explained` ↔ `usb-c-pd-fast-charging-guide`

---

## Anchor Text Rules

1. **Every internal link must use descriptive B2B anchor text** — never "click here" or "learn more"
2. **Vary anchor text across articles** — don't use identical anchors for the same target
3. **Include B2B signal words in anchors**: "OEM", "factory", "wholesale", "sourcing", "manufacturer"（本土化等价词：Hersteller / fabricante / fabricant / производитель / producent）
4. **Minimum 3 internal links per article** to product pages, service pages, or other blog articles
5. **Link depth**: Product pages should be reachable in ≤2 clicks from any blog article
6. **锚文本用目标语言**（本土化规则）：DE 文章用德语锚文本指向 `/de/blog/...`，禁止英文锚文本链到英文版页面

---

## 非博客页各语言路由速查（2026-09 实测）

| EN | DE | ES | FR | RU | PL |
|----|----|----|----|----|----|
| `/about/` | `/de/ueber-uns/` | `/es/sobre-nosotros/` | `/fr/a-propos/` | `/ru/o-kompanii/` | `/pl/o-nas/` |
| `/service/` | `/de/oem-odm-service/` | `/es/servicio-oem-odm/` | `/fr/service-oem-odm/` | `/ru/oem-odm-uslugi/` | `/pl/uslugi-oem-odm/` |
| `/contact/` | `/de/kontakt/` | `/es/contacto/` | `/fr/contact/` | `/ru/kontakty/` | `/pl/kontakt/` |
| `/products/power-bank/` | `/de/produkte/powerbank/` | `/es/productos/powerbank/` | `/fr/produits/batterie-externe/` | `/ru/produkty/poverbanki/` | `/pl/produkty/power-bank/` |
| `/products/gan-charger/` | `/de/produkte/gan-ladegeraet/` | `/es/productos/cargador-gan/` | `/fr/produits/chargeur-gan/` | `/ru/produkty/gan-zaryadnye-ustroystva/` | `/pl/produkty/ladowarka-gan/` |
| `/products/wireless-charger/` | `/de/produkte/kabelloses-ladegeraet/` | `/es/productos/cargador-inalambrico/` | `/fr/produits/chargeur-sans-fil/` | `/ru/produkty/besprovodnye-zaryadki/` | `/pl/produkty/ladowarka-bezprzewodowa/` |
| `/products/car-charger/` | `/de/produkte/autoladegeraet/` | `/es/productos/cargador-coche/` | `/fr/produits/chargeur-voiture/` | `/ru/produkty/avtomobilnye-zaryadki/` | `/pl/produkty/ladowarka-samochodowa/` |

> 写非 EN 文章时从本表复制对应语言路径（均实测存在），配合目标文章 frontmatter `hreflang` 块查同簇博客 slug。
