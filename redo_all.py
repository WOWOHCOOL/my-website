#!/usr/bin/env python3
"""Redo all optimizations lost by git checkout"""

import re, os

BASE = r'C:\Users\wowoh\wowohcool.com'

def read(f):
    with open(os.path.join(BASE, f), 'r', encoding='utf-8') as fh:
        return fh.read()

def write(f, c):
    with open(os.path.join(BASE, f), 'w', encoding='utf-8') as fh:
        fh.write(c)

# === 1. HOMEPAGE ===
c = read('index.html')
c = c.replace('<title>Wireless Charger & Power Bank OEM/ODM Manufacturer | WOWOHCOOL China</title>',
    '<title>Wireless Charger & Power Bank OEM/ODM | WOWOHCOOL China</title>')

blog_html = '''
    <!-- BLOG PREVIEW SECTION -->
    <section id="blog-preview" class="py-28 bg-white reveal">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-4xl font-black text-brandBlue uppercase italic tracking-tighter mb-4">Industry <span class="text-brandOrange">Insights</span></h2>
                <p class="text-slate-500 font-bold uppercase text-xs tracking-[0.3em]">Expert Guides for OEM/ODM Buyers</p>
            </div>
            <div class="grid md:grid-cols-3 gap-8">
                <a href="/blog/charging-accessory-market-trends-2026" class="group bg-slate-50 rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all duration-500 border-b-8 border-transparent hover:border-brandOrange flex flex-col">
                    <span class="text-[11px] font-black text-brandOrange uppercase tracking-widest mb-3">May 20, 2026</span>
                    <h3 class="font-black text-brandBlue text-lg uppercase mb-4 leading-tight group-hover:text-brandOrange transition-colors">2026 Charging Accessory Market Trends</h3>
                    <p class="text-slate-500 text-sm leading-relaxed flex-grow mb-6">GaN V at 35% share, Qi2 in 60%+ flagships, semi-solid-state batteries in mass production.</p>
                    <span class="inline-flex items-center gap-1 text-brandOrange font-black uppercase tracking-wider text-[11px] group-hover:gap-2 transition-all">Read Article &#8594;</span>
                </a>
                <a href="/blog/gan-generations-guide" class="group bg-slate-50 rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all duration-500 border-b-8 border-transparent hover:border-brandOrange flex flex-col">
                    <span class="text-[11px] font-black text-brandOrange uppercase tracking-widest mb-3">May 14, 2026</span>
                    <h3 class="font-black text-brandBlue text-lg uppercase mb-4 leading-tight group-hover:text-brandOrange transition-colors">GaN I vs III vs V: Generational Guide</h3>
                    <p class="text-slate-500 text-sm leading-relaxed flex-grow mb-6">Compare GaN I, III, and V across efficiency, size, and OEM cost. Learn to identify real GaN V.</p>
                    <span class="inline-flex items-center gap-1 text-brandOrange font-black uppercase tracking-wider text-[11px] group-hover:gap-2 transition-all">Read Article &#8594;</span>
                </a>
                <a href="/blog/import-costs-guide" class="group bg-slate-50 rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all duration-500 border-b-8 border-transparent hover:border-brandOrange flex flex-col">
                    <span class="text-[11px] font-black text-brandOrange uppercase tracking-widest mb-3">Apr 30, 2026</span>
                    <h3 class="font-black text-brandBlue text-lg uppercase mb-4 leading-tight group-hover:text-brandOrange transition-colors">Import Costs Guide 2026</h3>
                    <p class="text-slate-500 text-sm leading-relaxed flex-grow mb-6">Calculate your total landed cost. HS Codes, import duties, and VAT for GaN chargers and power banks.</p>
                    <span class="inline-flex items-center gap-1 text-brandOrange font-black uppercase tracking-wider text-[11px] group-hover:gap-2 transition-all">Read Article &#8594;</span>
                </a>
            </div>
            <div class="text-center mt-12">
                <a href="/blog/" class="inline-block border-2 border-brandBlue text-brandBlue px-10 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-brandBlue hover:text-white transition">View All Articles &#8594;</a>
            </div>
        </div>
    </section>'''

c = c.replace(
    '    </section>\n\n    <!-- ========================================================================\n         FAQ SECTION - 常见问题区域\n         ======================================================================== -->\n    <section id="faq" class="py-28 bg-slate-50 reveal">',
    '    </section>\n' + blog_html + '\n    <!-- ========================================================================\n         FAQ SECTION - 常见问题区域\n         ======================================================================== -->\n    <section id="faq" class="py-28 bg-slate-50 reveal">')
write('index.html', c)
print('1. Homepage done')

# === 2. ABOUT PAGE ===
c = read('about/index.html')
c = c.replace('FOOTER - 页脚 (与 index.html %9同结%9E)', 'FOOTER - 页脚 (与 index.html 相同结构)')
c = c.replace('Complex ODM wireless car mount with dual-sensing tech — 6,000 units delivered.</p>\n                        <a href="/index.html"',
    'Complex ODM wireless car mount with dual-sensing tech — 6,000 units delivered.</p>\n                        <a href="/case-studies#jacob-jensen"')
c = c.replace('10,000 units delivered ahead of pre-sale deadline.</p>\n                        <a href="/index.html"',
    '10,000 units delivered ahead of pre-sale deadline.</p>\n                        <a href="/case-studies#bosch"')
c = c.replace('<a href="/index.html" class="text-[11px] font-black text-slate-500 uppercase tracking-widest hover:text-brandOrange transition">See All Success Stories \x86</a>',
    '<a href="/case-studies" class="text-[11px] font-black text-slate-500 uppercase tracking-widest hover:text-brandOrange transition">See All Success Stories \x86</a>')
c = c.replace('<a href="/index.html" class="text-[11px] font-black text-slate-500 uppercase tracking-widest hover:text-brandOrange transition">See All Success Stories \xe2\x86\x92</a>',
    '<a href="/case-studies" class="text-[11px] font-black text-slate-500 uppercase tracking-widest hover:text-brandOrange transition">See All Success Stories \xe2\x86\x92</a>')
write('about/index.html', c)
print('2. About page partial')

# === 3. PRICE FIXES ===
for f in ['products/power-bank/index.html', 'products/wireless-charger/index.html',
          'products/gan-charger/index.html', 'products/car-charger/index.html']:
    c = read(f)
    # Fix prices
    c = re.sub(r'"lowPrice": [0-9.]+,\n\s+"highPrice": [0-9.]+', '"lowPrice": 6,\n    "highPrice": 25', c)
    # Fix duplicate favicon
    c = c.replace('<link rel="icon" type="image/png" href="/image/favicon.png">\n    <link rel="icon" type="image/png" href="/image/favicon.png">',
        '<link rel="icon" type="image/png" href="/image/favicon.png">')
    write(f, c)
    print(f'3. {f} priced/favicon')

# === 4. SERVICE PAGE ===
c = read('service/index.html')
c = c.replace('  <!-- main start (fixed missing tag) -->\n    <main id="main-content">', '    <main id="main-content">')
c = c.replace('<link rel="icon" type="image/png" href="/image/favicon.png">\n    <link rel="icon" type="image/png" href="/image/favicon.png">',
    '<link rel="icon" type="image/png" href="/image/favicon.png">')
write('service/index.html', c)
print('4. Service done')

# === 5. DE FAQ ===
c = read('de/faq/index.html')
c = c.replace('<title>Kontakt | WOWOHCOOL — OEM/ODM Partner f\xfcr Ladel\xf6sungen</title>',
    '<title>FAQ | WOWOHCOOL — OEM/ODM Partner f\xfcr Ladel\xf6sungen</title>')
c = c.replace('hreflang="de" href="https://www.wowohcool.com/de/kontakt"',
    'hreflang="de" href="https://www.wowohcool.com/de/faq"')
c = c.replace('hreflang="en" href="https://www.wowohcool.com/contact"',
    'hreflang="en" href="https://www.wowohcool.com/faq"')
c = c.replace('hreflang="x-default" href="https://www.wowohcool.com/contact"',
    'hreflang="x-default" href="https://www.wowohcool.com/faq"')
write('de/faq/index.html', c)
print('5. DE FAQ done')

# === 6. DE BLOG: update count ===
c = read('de/blog/index.html')
c = c.replace('5 Beitr', '14 Beitr')
write('de/blog/index.html', c)
print('6. DE Blog count done')

print('\n=== ALL COMPLETE ===')
