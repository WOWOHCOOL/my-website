---
name: new-page
description: Create a new multi-language page (EN/DE/ES) with consistent structure
disable-model-invocation: true
---

# New Page

Create a new page across all three languages with consistent structure.

## Arguments
- `slug`: URL slug for the page (e.g., "usb-c-cable")
- `category`: Parent directory (e.g., "produkte", "blog")
- `title_en`: English page title
- `title_de`: German page title
- `title_es`: Spanish page title

## Steps

1. Create English version: `src/{category}/{slug}/index.njk`
2. Create German version: `src/de/{category}/{slug}/index.njk`
3. Create Spanish version: `src/es/{category}/{slug}/index.njk`

## Template Structure

Each page must include:
- Front matter with `title`, `description`, `lang`, `layout`
- Schema.org JSON-LD (Product or Article depending on category)
- Breadcrumb navigation
- hreflang alternate links to other language versions
- Open Graph and Twitter Card meta tags

## Validation
- Verify all three language files exist
- Check hreflang links point to correct paths
- Confirm schema markup is valid JSON-LD
