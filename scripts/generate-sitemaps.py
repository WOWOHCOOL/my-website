import os, re
from datetime import datetime

# Paths relative to repo root (scripts/ is one level below root)
REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
base = os.path.join(REPO_ROOT, '_site')
src_base = os.path.join(REPO_ROOT, 'src')
today = datetime.now().strftime('%Y-%m-%d')

# Build page map: canonical URL -> {lang: url}
page_map = {}

for root, dirs, files in os.walk(base):
    for f in files:
        if f.endswith('.html') and 'image' not in root and 'css' not in root and 'js' not in root:
            fp = os.path.join(root, f)
            with open(fp, 'r', encoding='utf-8') as fh:
                content = fh.read()

            # Extract hreflang entries
            hreflangs = {}
            for m in re.finditer(r'hreflang="([^"]*)" href="([^"]*)"', content):
                hreflangs[m.group(1)] = m.group(2)

            # Extract canonical
            canon_m = re.search(r'<link rel="canonical" href="([^"]*)"', content)
            if not canon_m:
                continue
            canonical = canon_m.group(1)

            if canonical not in page_map:
                page_map[canonical] = hreflangs

print(f'Found {len(page_map)} unique pages')

# Breakdown by page type
breakdown = {'homepage': 0, 'top_level': 0, 'product_category': 0, 'product_sub': 0, 'blog_article': 0, 'blog_other': 0, 'other': 0}
for canonical in page_map:
    path = canonical.replace('https://www.wowohcool.com', '').rstrip('/')
    segments = [s for s in path.split('/') if s]
    if path == '': breakdown['homepage'] += 1
    elif len(segments) == 1: breakdown['top_level'] += 1
    elif segments[0] == 'products' and len(segments) == 2: breakdown['product_category'] += 1
    elif segments[0] == 'products' and len(segments) >= 3: breakdown['product_sub'] += 1
    elif segments[0] == 'blog' and len(segments) == 2: breakdown['blog_article'] += 1
    elif segments[0] == 'blog': breakdown['blog_other'] += 1
    else: breakdown['other'] += 1
print(f'  Homepage: {breakdown["homepage"]} | Top-level: {breakdown["top_level"]} | Product cats: {breakdown["product_category"]} | Product subs: {breakdown["product_sub"]} | Blog articles: {breakdown["blog_article"]} | Blog other: {breakdown["blog_other"]} | Other: {breakdown["other"]}')

# Generate sitemap XML
def gen_sitemap(lang_filter=None):
    """Generate sitemap XML. If lang_filter is set, only include pages with that hreflang."""
    urls_xml = ''
    for canonical, hreflangs in sorted(page_map.items()):
        # Filter by language based on canonical URL prefix:
        # - EN sitemap: canonical URLs WITHOUT /de/ /es/ /fr/ prefix
        # - DE sitemap: canonical URLs WITH /de/ prefix
        # - ES sitemap: canonical URLs WITH /es/ prefix
        # - FR sitemap: canonical URLs WITH /fr/ prefix
        path = canonical.replace('https://www.wowohcool.com', '')
        if lang_filter is None:
            if path.startswith('/de/') or path.startswith('/es/') or path.startswith('/fr/'):
                continue
        else:
            if not path.startswith(f'/{lang_filter}/'):
                continue

        # Priority by page type (2026-07-15: smart tiering for GEO/AI crawler discovery)
        path = canonical.replace('https://www.wowohcool.com', '').rstrip('/')
        segments = [s for s in path.split('/') if s]

        if path == '':
            # Homepage
            priority = '1.0'
            changefreq = 'weekly'
        elif len(segments) == 1:
            # Top-level pages: /about/, /products/, /blog/, /contact/, /service/, /faq/, /case-studies/
            priority = '0.9'
            changefreq = 'weekly'
        elif segments[0] == 'products' and len(segments) == 2:
            # Product category pages: /products/power-bank/, /products/gan-charger/
            priority = '0.9'
            changefreq = 'monthly'
        elif segments[0] == 'products' and len(segments) >= 3:
            # Product subcategory pages: /products/power-bank/semi-solid-state/
            priority = '0.8'
            changefreq = 'monthly'
        elif segments[0] == 'blog' and len(segments) == 2:
            # Blog articles: /blog/gan-chargers-guide/
            priority = '0.7'
            changefreq = 'monthly'
        elif segments[0] == 'blog':
            # Blog index or tag pages
            priority = '0.8'
            changefreq = 'weekly'
        else:
            priority = '0.6'
            changefreq = 'monthly'

        urls_xml += ' <url>\n'
        urls_xml += f' <loc>{canonical}</loc>\n'

        # Add hreflang alternates
        for lang, url in sorted(hreflangs.items()):
            if lang != 'x-default':
                urls_xml += f' <xhtml:link rel="alternate" hreflang="{lang}" href="{url}"/>\n'
        if 'x-default' in hreflangs:
            urls_xml += f' <xhtml:link rel="alternate" hreflang="x-default" href="{hreflangs["x-default"]}"/>\n'

        urls_xml += f' <lastmod>{today}</lastmod>\n'
        urls_xml += f' <changefreq>{changefreq}</changefreq>\n'
        urls_xml += f' <priority>{priority}</priority>\n'
        urls_xml += ' </url>\n'

    return f'''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
 xmlns:xhtml="http://www.w3.org/1999/xhtml">
{urls_xml}</urlset>'''

# Generate all 4 sitemaps
# src_base already set above
for lang, permalink, label in [
    (None, 'sitemap.xml', 'EN'),
    ('de', 'de/sitemap.xml', 'DE'),
    ('es', 'es/sitemap.xml', 'ES'),
    ('fr', 'fr/sitemap.xml', 'FR'),
]:
    xml = gen_sitemap(lang)

    # Write directly to _site
    out_path = os.path.join(base, permalink)
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(xml)

    url_count = xml.count('<url>')
    print(f'{label} sitemap: {url_count} URLs -> {permalink}')

# Also update llms.txt
print('\nUpdating llms.txt...')
# Read existing llms template, update counts
for lang_dir, lang_label in [('', ''), ('de/', 'de/'), ('es/', 'es/'), ('fr/', 'fr/')]:
    llms_path = os.path.join(src_base, lang_dir + 'llms.txt.njk')
    if os.path.exists(llms_path):
        print(f'  {lang_label}llms.txt.njk exists (manual update needed)')
    else:
        print(f'  {lang_label}llms.txt.njk MISSING')
