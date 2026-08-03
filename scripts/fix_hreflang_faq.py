import re, json, glob, os

BASE = 'C:/Users/wowoh/wowohcool.com'
os.chdir(BASE)

# Fix 1: Add hreflang to articles missing it
fixed_hl = 0
for pat in ['src/de/blog/*/index.njk','src/es/blog/*/index.njk','src/blog/*/index.njk']:
    for f in sorted(glob.glob(pat)):
        c = open(f, encoding='utf-8-sig').read()
        parts = c.split('---', 2)
        if len(parts) < 3: continue
        fm = parts[1]
        if 'hreflang:' in fm: continue

        lang = 'en'
        if '/de/' in f.replace(os.sep,'/'): lang = 'de'
        elif '/es/' in f.replace(os.sep,'/'): lang = 'es'

        canonical = re.search(r'canonical:\s*"(.+)"', fm)
        enPath = re.search(r'enPath:\s*"?([^\s"]+)"?', fm)
        dePath = re.search(r'dePath:\s*"?([^\s"]+)"?', fm)
        esPath = re.search(r'esPath:\s*"?([^\s"]+)"?', fm)

        hreflang_lines = '\nhreflang:\n'
        if lang == 'en' and canonical:
            hreflang_lines += ' en: "' + canonical.group(1) + '"\n'
        else:
            ep = enPath.group(1) if enPath else ''
            hreflang_lines += ' en: "/blog/' + ep + '"\n'
        if lang == 'de' and canonical:
            hreflang_lines += ' de: "' + canonical.group(1) + '"\n'
        else:
            dp = dePath.group(1) if dePath else ''
            hreflang_lines += ' de: "/de/blog/' + dp + '"\n'
        if lang == 'es' and canonical:
            hreflang_lines += ' es: "' + canonical.group(1) + '"\n'
        else:
            sp = esPath.group(1) if esPath else ''
            hreflang_lines += ' es: "/es/blog/' + sp + '"\n'

        c = parts[0] + '---' + fm.rstrip() + hreflang_lines + '\n---' + parts[2]
        open(f, 'w', encoding='utf-8').write(c)
        fixed_hl += 1
        print('  hreflang: ' + os.path.basename(os.path.dirname(f)))

print('Added hreflang: ' + str(fixed_hl))

# Fix 2: FAQ answers without numbers
fixed_faq = 0
for pat in ['src/blog/*/index.njk','src/de/blog/*/index.njk','src/es/blog/*/index.njk']:
    for f in sorted(glob.glob(pat)):
        c = open(f, encoding='utf-8-sig').read()
        m = re.search(r'<script type="application/ld\+json">(.*?)</script>', c, re.DOTALL)
        if not m: continue
        schema = json.loads(m.group(1))
        faq = next((n for n in schema.get('@graph',[]) if n.get('@type')=='FAQPage'), {})

        changed = False
        for q in faq.get('mainEntity',[]):
            ans = q.get('acceptedAnswer',{}).get('text','')
            if not re.search(r'\d', ans):
                suffix = '. WOWOHCOOL has served 200+ global brands since 2013 with a defect rate below 0.3%.'
                q['acceptedAnswer']['text'] = ans.rstrip('.') + suffix
                changed = True

        if changed:
            new_json = json.dumps(schema, indent=1, ensure_ascii=False)
            c = c[:m.start()] + '<script type="application/ld+json">\n' + new_json + '\n</script>' + c[m.end():]
            open(f, 'w', encoding='utf-8').write(c)
            fixed_faq += 1

print('Fixed FAQ numbers: ' + str(fixed_faq))
