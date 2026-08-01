import re, json, glob, os

fixed = {}
NINA_IMG = 'https://www.wowohcool.com/image/factory/team-nina.webp'
SNOWY_IMG = 'https://www.wowohcool.com/image/factory/team-snowy.webp'
SOCIAL = [
    "https://www.linkedin.com/company/wowohcool",
    "https://www.facebook.com/wowohcoolelectronic",
    "https://www.youtube.com/@WOWOHCOOL",
    "https://x.com/wowohcool"
]
LANG_MAP = {
    'en': {'lp':'', 'site_name':'WOWOHCOOL', 'lang_code':'en', 'area':["US","DE","AT","CH","UK","FR","ES","EU","JP","KR","AU"]},
    'de': {'lp':'/de', 'site_name':'WOWOHCOOL Deutschland', 'lang_code':'de-DE', 'area':["DE","AT","CH","EU"]},
    'es': {'lp':'/es', 'site_name':'WOWOHCOOL Espana', 'lang_code':'es-ES', 'area':["ES","MX","CO","AR","CL","PE","EU"]},
}

def inc(key):
    fixed[key] = fixed.get(key, 0) + 1

BASE = 'C:/Users/wowoh/wowohcool.com'
os.chdir(BASE)
for pat in ['src/blog/*/index.njk','src/de/blog/*/index.njk','src/es/blog/*/index.njk']:
    for f in sorted(glob.glob(pat)):
        norm = f.replace(os.sep, '/')
        lang = 'en'
        if '/de/' in norm: lang = 'de'
        elif '/es/' in norm: lang = 'es'
        lc = LANG_MAP[lang]
        slug = os.path.basename(os.path.dirname(f))

        c = open(f, encoding='utf-8-sig').read()
        m = re.search(r'<script type="application/ld\+json">(.*?)</script>', c, re.DOTALL)
        if not m: continue
        try: schema = json.loads(m.group(1))
        except: continue

        nodes = schema.get('@graph', [])
        changed = False

        for n in nodes:
            t = n.get('@type', '')

            # BlogPosting
            if t == 'BlogPosting':
                if not n.get('@id'):
                    n['@id'] = f'https://www.wowohcool.com{lc["lp"]}/blog/{slug}/#article'
                    inc('bp_@id'); changed = True
                if not n.get('description'):
                    dm = re.search(r'^description:\s*"(.+)"', c, re.MULTILINE)
                    if dm:
                        n['description'] = dm.group(1)
                        inc('bp_description'); changed = True
                if not n.get('timeRequired'):
                    n['timeRequired'] = 'PT10M'
                    inc('bp_timeRequired'); changed = True

            # Person
            if t == 'Person':
                is_nina = 'nina-nico' in n.get('@id','')
                if not n.get('image'):
                    n['image'] = NINA_IMG if is_nina else SNOWY_IMG
                    inc('person_image'); changed = True
                if not n.get('sameAs'):
                    li = 'https://www.linkedin.com/in/nico-power-bank-chargers' if is_nina else 'https://www.linkedin.com/in/snowy-wireless-charger'
                    n['sameAs'] = [li]
                    inc('person_sameAs'); changed = True

            # Organization
            if t == 'Organization':
                if not n.get('sameAs'):
                    n['sameAs'] = list(SOCIAL)
                    inc('org_sameAs'); changed = True
                if not n.get('contactPoint'):
                    n['contactPoint'] = {"@type":"ContactPoint","contactType":"OEM/ODM Sales","availableLanguage":["English","German","Spanish","French"]}
                    inc('org_contactPoint'); changed = True
                if not n.get('logo'):
                    n['logo'] = {"@type":"ImageObject","url":"https://www.wowohcool.com/image/wowohcool-logo-optimized.webp"}
                    inc('org_logo'); changed = True
                else:
                    logo = n.get('logo')
                    if isinstance(logo, str):
                        n['logo'] = {"@type":"ImageObject","url":logo}
                        inc('logo_str_to_obj'); changed = True
                if not n.get('areaServed'):
                    n['areaServed'] = list(lc['area'])
                    inc('org_areaServed'); changed = True
                if not n.get('address'):
                    n['address'] = {"@type":"PostalAddress","streetAddress":"925, Yichuang International Center, Longhua District","addressLocality":"Shenzhen","addressRegion":"Guangdong","postalCode":"518110","addressCountry":"CN"}
                    inc('org_address'); changed = True
                if not n.get('legalName'):
                    n['legalName'] = 'Dong Yi Technology Co., Ltd'
                    inc('org_legalName'); changed = True
                if not n.get('publishingPrinciples'):
                    n['publishingPrinciples'] = n.get('url', f'https://www.wowohcool.com{lc["lp"]}/')
                    inc('org_publishingPrinciples'); changed = True

            # FAQPage
            if t == 'FAQPage' and not n.get('speakable'):
                n['speakable'] = {"@type":"SpeakableSpecification","cssSelector":[".faq-answer"]}
                inc('faq_speakable'); changed = True

            # HowTo
            if t == 'HowTo' and not n.get('description'):
                n['description'] = 'Step-by-step guide for OEM importers.'
                inc('howto_description'); changed = True

        # Add WebSite node if missing
        has_website = any(n.get('@type')=='WebSite' for n in nodes)
        if not has_website:
            website = {
                "@type":"WebSite",
                "@id": f"https://www.wowohcool.com{lc['lp']}/#website",
                "url": f"https://www.wowohcool.com{lc['lp']}/",
                "name": lc['site_name'],
                "inLanguage": lc['lang_code'],
                "publisher": {"@id":"https://www.wowohcool.com/#organization"}
            }
            ord_idx = next((i for i,n in enumerate(nodes) if n.get('@type')=='Organization'), 0)
            nodes.insert(ord_idx + 1, website)
            inc('node_WebSite'); changed = True
        else:
            ws = next(n for n in nodes if n.get('@type')=='WebSite')
            if not ws.get('publisher'):
                ws['publisher'] = {"@id":"https://www.wowohcool.com/#organization"}
                inc('website_publisher'); changed = True
            if not ws.get('inLanguage'):
                ws['inLanguage'] = lc['lang_code']
                inc('website_inLanguage'); changed = True
            if not ws.get('url'):
                ws['url'] = f"https://www.wowohcool.com{lc['lp']}/"
                inc('website_url'); changed = True
            if not ws.get('name'):
                ws['name'] = lc['site_name']
                inc('website_name'); changed = True

        if changed:
            new_json = json.dumps(schema, indent=1, ensure_ascii=False)
            c = c[:m.start()] + '<script type="application/ld+json">\n' + new_json + '\n</script>' + c[m.end():]
            open(f, 'w', encoding='utf-8').write(c)

print('Fixes applied:')
for k, v in sorted(fixed.items(), key=lambda x: -x[1]):
    print(f'  {v:>3}x  {k}')
print(f'Total: {sum(fixed.values())}')
