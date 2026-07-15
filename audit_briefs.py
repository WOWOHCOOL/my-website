import os, re

base = r'C:/Users/wowoh/wowohcool.com/src'
research_dir = r'C:/Users/wowoh/seomachine/research'
BS = chr(92)

def get_pages(site_dir):
    pages = []
    start = os.path.join(base, site_dir) if site_dir else base
    for root, dirs, files in os.walk(start):
        # Skip partials/layouts
        if 'partials' in root or 'layouts' in root or '_data' in root or '_includes' in root:
            continue
        for f in files:
            if f.endswith('.njk') and f not in ('llms.txt.njk', 'rss.njk', 'sitemap.njk', 'layout.njk'):
                rel = os.path.relpath(os.path.join(root, f), start)
                rel = rel.replace(BS, '/').replace('/index.njk', '')
                pages.append(rel)
    return sorted(set(pages))

en_pages = get_pages('')
de_pages = get_pages('de')

# Get all research brief slugs
briefs = set()
for f in os.listdir(research_dir):
    if f.endswith('.md'):
        briefs.add(f.replace('.md', ''))

print(f'EN pages: {len(en_pages)}')
print(f'DE pages: {len(de_pages)}')
print(f'Briefs: {len(briefs)}')

# Try to match pages to briefs by keyword
def find_brief(page_slug, lang='en'):
    """Find if a brief exists for this page"""
    slug_parts = page_slug.replace('/', '-').replace('_', '-')
    matches = []
    for b in briefs:
        # Direct slug match
        if page_slug.replace('/', '-') in b or b.endswith('-' + page_slug.split('/')[-1]):
            matches.append(b)
        # Check if brief name contains key parts of the slug
        parts = page_slug.split('/')
        last = parts[-1]
        if last in b or last.replace('-', '') in b.replace('-', ''):
            matches.append(b)
    return list(set(matches)) if matches else None

# Check which pages have NO brief match
print('\n=== EN pages without brief ===')
en_no_brief = []
for p in en_pages:
    m = find_brief(p)
    if not m:
        en_no_brief.append(p)
    else:
        print(f'  {p} -> {m[0][:60]}')

print(f'\nEN without brief: {len(en_no_brief)}')
for p in en_no_brief:
    print(f'  ❌ {p}')

print('\n=== DE pages without brief ===')
de_no_brief = []
for p in de_pages:
    m = find_brief(p)
    if not m:
        de_no_brief.append(p)
    else:
        print(f'  {p} -> {m[0][:60]}')

print(f'\nDE without brief: {len(de_no_brief)}')
for p in de_no_brief:
    print(f'  ❌ {p}')
