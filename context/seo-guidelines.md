# SEO Guidelines for WOWOHCOOL Content

This document outlines SEO best practices and requirements for all WOWOHCOOL content to maximize organic search visibility for B2B charging accessory keywords.

## Content Length Requirements

### Target Word Counts
- **Standard Blog Post**: 1,500-2,500 words
- **Pillar Content / Comprehensive Guides**: 2,500-4,000 words
- **Product Description**: 300-800 words per product
- **How-To Guides**: 1,500-2,500 words
- **Industry News / Trends**: 800-1,200 words

### Quality Over Quantity
- Don't add fluff to hit word counts — B2B readers value concise, specific information
- Every section should answer a real buyer question
- Better 1,500 words of specific, useful content than 3,000 words of padding

## Keyword Optimization

### Keyword Research Requirements
Before writing any article:
1. Identify primary target keyword (commercial intent preferred for B2B)
2. Analyze top 10 SERP competitors — look for content gaps
3. Identify 3-5 secondary keywords
4. Include semantic/LSI terms from the manufacturing and charging ecosystem

### Keyword Density Guidelines
- **Primary Keyword**: 1-2% density, natural integration
- **Secondary Keywords**: 0.5-1% density each
- **Never force keywords** — prioritize natural reading over exact-match density

### Critical Keyword Placement
Primary keyword MUST appear in:
- [ ] Page title (H1 / title tag)
- [ ] First 100 words of content
- [ ] At least one H2 subheading
- [ ] URL slug (where applicable)
- [ ] Meta description
- [ ] Image alt text of at least one image

## Meta Data Standards

### Title Tags (50-60 characters)
Format: Primary Keyword + Secondary Modifier | WOWOHCOOL
Examples:
- "GaN Charger Manufacturer PD 3.1 240W | WOWOHCOOL OEM Supplier"
- "Power Bank OEM China Semi-Solid-State | WOWOHCOOL Factory"
- "Qi2 Wireless Charger Manufacturer Since 2013 | WOWOHCOOL"

### Meta Descriptions (150-160 characters)
Must include:
- Primary keyword
- 1-2 secondary keywords naturally
- Specific number or certification (year, MOQ, standard)
- Implied CTA

Example:
"CE/FCC/Qi2 certified wireless charger manufacturer in Shenzhen since 2013. OEM/ODM with MOQ 500+. Factory-direct pricing serving 200+ global brands."

### URL Slugs
- Lowercase, hyphens between words
- Include primary keyword where possible
- 3-5 words ideal
- Examples: `/products/wireless-charger.html`, `/products/power-bank.html`

### Image Alt Text
- Accurately describe the product shown
- Include primary keyword naturally when relevant
- 125 characters max
- No "image of" or "picture of"
- ✅ "WOW93 3-in-1 folding Qi2 wireless charger with night light"
- ✅ "WOP67 45W 2-in-1 power bank and wall charger hybrid"
- ❌ "product image" / "photo" / "image1"

## Structured Data (Schema)

### Product Pages
Required schema types:
- **Product** — name, image, description, sku, brand, offers
- **AggregateOffer** — price range, availability
- **AggregateRating** — review count, rating value
- **Review** — individual customer reviews with ratings

### Homepage
Required schema types:
- **Organization / ManufacturingBusiness** — name, address, contact, founding date, employee range, certifications
- **ItemList** — featured products
- **FAQPage** — manufacturing FAQs (MOQ, certifications, lead time)
- **BreadcrumbList** — site navigation
- **WebSite** — site name, search action

### Blog Posts
- **Article** or **BlogPosting** schema
- Include author, datePublished, dateModified
- BreadcrumbList for navigation context

### Local Business Signals
- Geo tags (geo.region, geo.placename, geo.position) for Shenzhen location
- hreflang tags for multi-language pages (en, de)
- Alternate language URLs specified

## Internal Linking Strategy

### Link Quantity
- **Blog posts**: 3-5 internal links per article
- **Product pages**: 2-3 internal links to related product categories
- **Homepage**: Link to all 4 product category pages and OEM/ODM page

### Link Placement
- Primary internal link within first 200 words
- Links in subheadings carry weight
- Vary anchor text — don't use the same phrase every time

### Link Targets by Topic
- **Charging technology**: Link to relevant product category + FAQ schema content
- **Manufacturing process**: Link to OEM/ODM page + about page
- **Industry trends**: Link to product pages showcasing the technology
- **Sourcing guides**: Link to contact page + product category pages

## Structured Content Format

### Heading Hierarchy
H1 → H2 → H3 (never skip levels)
- **H1**: One per page, matches title tag
- **H2**: Main content sections (3-7 per article)
- **H3**: Subsections within H2s (as needed)

### B2B Content Structure
1. **Problem / Context**: What challenge does the reader face? (1 paragraph)
2. **Solution / Capability**: How WOWOHCOOL addresses it (2-3 paragraphs)
3. **Proof / Evidence**: Certifications, client cases, specs (1-2 paragraphs)
4. **Action / CTA**: Next step for the buyer (1 paragraph)

## Schema Product Data Format

When creating product schema entries, maintain this consistent structure:

```json
{
  "@type": "Product",
  "name": "Product Name with SKU",
  "description": "Clear description with key spec, target use, and benefit",
  "brand": { "@type": "Brand", "name": "WOWOHCOOL" },
  "sku": "WOP00",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "USD",
    "lowPrice": "X.00",
    "highPrice": "Y.00",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.X",
    "reviewCount": "NNN"
  }
}
```

## B2B-Specific SEO Considerations

### Search Intent Is Key
- Most WOWOHCOOL content targets **commercial** and **transactional** intent
- Buyers searching for "manufacturer," "OEM," "supplier," "factory," "wholesale" are closer to purchasing
- Informational content should still include clear paths to commercial pages

### Trust Signals in Content
Include these trust-building elements in content:
- Certifications (CE, FCC, Qi2, RoHS, UN38.3, ISO 9001)
- Years in business (Since 2013)
- Facility size and capacity (5,000㎡, 1M+ monthly)
- Team size (200-500 employees, 50+ R&D engineers)
- Client names (Bosch, Jacob Jensen) where permitted
- Production stats (25-30 day lead time, 4-stage QC)

### Competitive Differentiation Keywords
Target keywords where WOWOHCOOL has unique advantage:
- "semi-solid-state power bank manufacturer" (unique tech at CES 2026)
- "GaN V charger factory" (early GaN V adopter)
- "Qi2 MPP certified manufacturer" (Qi2 expertise since 2013)
- "Shenzhen charger OEM since 2013" (longevity + location)

## Performance Tracking

Track these primary KPIs for WOWOHCOOL content:
- Rankings for commercial-intent keywords (OEM, manufacturer, supplier, factory)
- Organic traffic to product category pages
- Click-through rate from blog content to product pages
- Conversion rate (inquiry form submissions from organic traffic)
- Featured snippet acquisition for FAQ schema content

## Maintenance

**Review Frequency**: Quarterly keyword performance review

**Regular Updates**:
- Add new product keywords as SKUs launch
- Monitor competitor keyword movements
- Update schema markup for new certification types
- Track and address keyword cannibalization
- Refresh underperforming content with updated specs and data

---

*Note: Update this document as SEO best practices evolve and new keyword opportunities emerge. Coordinate with product launches and content calendar.*
