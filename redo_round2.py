#!/usr/bin/env python3
"""Round 2: Trust bars, logo bars, CTAs, FAQ expansion"""

import os

BASE = r'C:\Users\wowoh\wowohcool.com'

def read(f):
    with open(os.path.join(BASE, f), 'r', encoding='utf-8') as fh:
        return fh.read()

def write(f, c):
    with open(os.path.join(BASE, f), 'w', encoding='utf-8') as fh:
        fh.write(c)

LOGO_BAR = '''<!-- Customer Logo Bar -->
<section class="py-16 bg-white">
    <div class="max-w-5xl mx-auto px-6">
        <p class="text-center text-[11px] font-black uppercase tracking-[0.4em] text-slate-500 mb-12">Trusted by 200+ Global Brands</p>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
            <div class="flex items-center justify-center p-6 lg:p-4 bg-slate-50/80 rounded-2xl">
                <img src="/image/customer-logo/Jacobjensen-Clients.webp" alt="JacobJensen" loading="lazy" class="h-14 lg:h-12 w-auto object-contain" width="200" height="150">
            </div>
            <div class="flex items-center justify-center p-6 lg:p-4 bg-slate-50/80 rounded-2xl">
                <img src="/image/customer-logo/Merlin-digital-Clients.webp" alt="Merlin Digital" loading="lazy" class="h-14 lg:h-12 w-auto object-contain" width="200" height="150">
            </div>
            <div class="flex items-center justify-center p-6 lg:p-4 bg-slate-50/80 rounded-2xl">
                <img src="/image/customer-logo/OOONO-Clients.webp" alt="OOONO" loading="lazy" class="h-14 lg:h-12 w-auto object-contain" width="200" height="150">
            </div>
            <div class="flex items-center justify-center p-6 lg:p-4 bg-slate-50/80 rounded-2xl">
                <img src="/image/customer-logo/Shatzii-Clients.webp" alt="Shatzii" loading="lazy" class="h-14 lg:h-12 w-auto object-contain" width="200" height="150">
            </div>
            <div class="flex items-center justify-center p-6 lg:p-4 bg-slate-50/80 rounded-2xl">
                <img src="/image/customer-logo/Tempel-Clients.webp" alt="Tempel" loading="lazy" class="h-14 lg:h-12 w-auto object-contain" width="200" height="150">
            </div>
            <div class="flex items-center justify-center p-6 lg:p-4 bg-slate-50/80 rounded-2xl">
                <img src="/image/customer-logo/Volta-River-Authority-Clients.webp" alt="Volta River Authority" loading="lazy" class="h-14 lg:h-12 w-auto object-contain" width="200" height="150">
            </div>
        </div>
    </div>
</section>'''

TRUST_BAR = '''<!-- Trust Bar -->
<div class="bg-slate-50 py-6 my-8">
    <div class="max-w-4xl mx-auto px-6 flex flex-wrap items-center justify-center gap-x-8 text-[11px] font-black uppercase tracking-widest text-slate-500">
        <span>Trusted by</span>
        <span class="text-brandBlue">Jacob Jensen</span>
        <span class="text-slate-300">·</span>
        <span class="text-brandBlue">Bosch</span>
        <span class="text-slate-300">·</span>
        <span class="text-brandBlue">200+ Global Brands</span>
        <span class="text-slate-300">·</span>
        <span class="text-brandOrange">10M+ Units Shipped</span>
    </div>
</div>'''

# === 1. PRODUCT PAGES: add trust bar + logo bar ===
for f in ['products/power-bank/index.html', 'products/wireless-charger/index.html',
          'products/gan-charger/index.html', 'products/car-charger/index.html']:
    c = read(f)
    if 'Customer Logo Bar' in c:
        print(f'Skipped (already has bars): {f}')
        continue

    # Add trust bar + logo bar before the products catalog section
    for marker in ['PRODUCTS CATALOG SECTION', 'PRODUCTS SHOWCASE SECTION']:
        if marker in c:
            c = c.replace(
                f'<!-- {marker} -->',
                f'{LOGO_BAR}\n\n    <!-- {marker} -->'
            )
            if 'Trust Bar' not in c:
                c = c.replace(
                    f'{LOGO_BAR}',
                    f'{TRUST_BAR}{LOGO_BAR}'
                )
            break

    write(f, c)
    print(f'Bars added: {f}')

# === 2. WIRELESS CHARGER: no trust bar yet ===
c = read('products/wireless-charger/index.html')
if 'Trust Bar' not in c:
    # Add between Core Technologies section and Specialized Solutions
    c = c.replace(
        '</section>\n\n    <!-- ========================================================================\n         3 SPECIALIZED WIRELESS CHARGING SOLUTIONS SECTION',
        f'</section>\n{TRUST_BAR}\n\n    <!-- ========================================================================\n         3 SPECIALIZED WIRELESS CHARGING SOLUTIONS SECTION'
    )
    write('products/wireless-charger/index.html', c)
    print('Wireless charger: trust bar added')

# === 3. ABOUT PAGE: trust bar + logo bar + factory CTA ===
c = read('about/index.html')
if 'Trust Bar' not in c:
    c = c.replace(
        '</section>\n\n        <!-- ========================================================================\n             FACTORY SECTION',
        f'</section>\n{TRUST_BAR}\n{LOGO_BAR}\n        <!-- ========================================================================\n             FACTORY SECTION'
    )
if 'Schedule Factory Tour' not in c:
    c = c.replace(
        '                        </div>\n                    </div>\n\n                    <!-- 右侧图片 -->',
        '                        </div>\n                        <div class="mt-8">\n                            <button data-action="open-modal" class="inline-flex items-center gap-2 bg-brandOrange text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] shadow-xl hover:-translate-y-1 transition">Schedule Factory Tour</button>\n                            <a href="/contact" class="inline-flex items-center gap-2 border-2 border-brandBlue text-brandBlue px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-brandBlue hover:text-white transition ml-3">Contact Sales →</a>\n                        </div>\n                    </div>\n\n                    <!-- 右侧图片 -->'
    )
write('about/index.html', c)
print('About: trust/logo/CTA done')

# === 4. SERVICE PAGE: FAQ expansion + logo bar ===
c = read('service/index.html')
if 'What certifications do your OEM/ODM products have?' not in c:
    # Already done in round 1? Check
    print('Service FAQ: already expanded')
else:
    print('Service FAQ: needs expansion')

if 'Customer Logo Bar' not in c:
    c = c.replace(
        '</div>\n</div>\n\n    <!-- ========================================================================\n         OEM VS ODM SECTION',
        f'</div>\n</div>\n{LOGO_BAR}\n    <!-- ========================================================================\n         OEM VS ODM SECTION'
    )
    write('service/index.html', c)
    print('Service: logo bar added')

# === 5. BLOG INDEX: logo bar ===
c = read('blog/index.html')
if 'Customer Logo Bar' not in c:
    c = c.replace(
        '            </div>\n            <!-- FEATURED -->',
        f'            </div>\n{TRUST_BAR}\n{LOGO_BAR}\n            <!-- FEATURED -->'
    )
    write('blog/index.html', c)
    print('Blog index: trust/logo added')

# === 6. CONTACT PAGE: logo bar ===
c = read('contact/index.html')
if 'Customer Logo Bar' not in c:
    c = c.replace(
        '    </div>\n\n    <!-- Contact Info Row -->',
        f'    </div>\n{LOGO_BAR}\n    <!-- Contact Info Row -->'
    )
    write('contact/index.html', c)
    print('Contact: logo bar added')

# === 7. PRODUCTS INDEX: logo bar ===
c = read('products/index.html')
if 'Customer Logo Bar' not in c:
    c = c.replace(
        '    </div>\n\n    <!-- Product Categories -->',
        f'    </div>\n{LOGO_BAR}\n    <!-- Product Categories -->'
    )
    write('products/index.html', c)
    print('Products index: logo bar added')

print('\n=== ROUND 2 COMPLETE ===')
