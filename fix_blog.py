import re

with open('C:/Users/wowoh/wowohcool.com/src/blog/index.njk', 'r', encoding='utf-8') as f:
    content = f.read()

# === FIX 1: Compact, redesigned tag cloud ===
old_tags_start = ' <section id="tags-section">'
old_tags_end = ' </section>\n </div><section class="bg-gradient-to-br from-brandBlue'

start_idx = content.index(old_tags_start)
end_idx = content.index(old_tags_end)

# Extract all <a> tags from the old tag cloud
tags_section = content[start_idx:end_idx]
tag_links = re.findall(r'<a href="[^"]+" class="[^"]+">[^<]+</a>', tags_section)

# Product tags get orange accent, rest get subtle white
product_tags = {'Wireless Charger', 'GaN Charger', 'Power Bank', 'Car Charger'}
hot_tags = {'What Is GaN', 'GaN vs Silicon', 'Power Bank Guide', 'mAh Explained', 'PD 3.1 Explained', 'OEM/ODM'}

compact_tags = ''
for link in tag_links:
    m = re.search(r'href="([^"]+)"', link)
    text_m = re.search(r'>([^<]+)<', link)
    if not m or not text_m:
        continue
    href = m.group(1)
    text = text_m.group(1)

    if text in product_tags:
        cls = 'bg-brandOrange/20 text-brandOrange border border-brandOrange/20'
    elif text in hot_tags:
        cls = 'bg-white/15 text-white border border-white/10'
    else:
        cls = 'bg-white/10 text-slate-300'

    compact_tags += f' <a href="{href}" class="inline-block px-2.5 py-1 {cls} text-[11px] font-bold rounded-lg hover:bg-brandOrange hover:text-white hover:border-brandOrange transition-all">{text}</a>\n'

new_tags = f''' <section id="tags-section" class="mb-16">
 <div class="bg-gradient-to-br from-brandBlue to-slate-800 rounded-2xl p-5 md:p-7 relative overflow-hidden">
 <div class="absolute top-0 right-0 w-24 h-24 bg-brandOrange/10 rounded-full blur-3xl"></div>
 <div class="relative z-10">
 <div class="flex items-center gap-2 mb-3">
 <svg class="text-brandOrange" aria-hidden="true" focusable="false" viewBox="0 0 448 512" width="13" height="13"><path d="M181.3 32.4c17.4 2.9 29.2 19.4 26.3 36.8L197.8 128l95.1 0 11.5-69.3c2.9-17.4 19.4-29.2 36.8-26.3s29.2 19.4 26.3 36.8L357.8 128l58.2 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-68.9 0L325.8 320l58.2 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-68.9 0-11.5 69.3c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8l9.8-58.7-95.1 0-11.5 69.3c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8L90.2 384 32 384c-17.7 0-32-14.3-32-32s14.3-32 32-32l68.9 0L122.1 192 64 192c-17.7 0-32-14.3-32-32s14.3-32 32-32l68.9 0 11.5-69.3c2.9-17.4 19.4-29.2 36.8-26.3zM197.8 192l-21.3 128 95.1 0 21.3-128-95.1 0z" fill="currentColor"/></svg>
 <span class="text-[11px] font-black text-white uppercase tracking-widest">Explore Topics</span>
 </div>
 <div class="flex flex-wrap items-center gap-1.5 leading-relaxed">
{compact_tags} </div>
 </div>
 </div>
 </section>
 </div><section class="bg-gradient-to-br from-brandBlue'''

content = content[:start_idx] + new_tags + content[end_idx + len(old_tags_end):]

# === FIX 2: Replace "Stay Updated" newsletter with OEM CTA ===
old_cta_marker = '<section class="bg-gradient-to-br from-brandBlue to-slate-800 text-center relative overflow-hidden mt-16 lg:mt-24 sec">'
newsletter_end_marker = '<p class="text-slate-500 text-xs mt-4">No spam. Unsubscribe anytime.</p></div></section>'

cta_start = content.index(old_cta_marker)
cta_end = content.index(newsletter_end_marker) + len(newsletter_end_marker)

new_cta = '''<section class="relative bg-gradient-to-br from-brandBlue to-slate-800 text-center overflow-hidden mt-16 lg:mt-24">
 <div class="absolute top-0 right-0 w-64 h-64 bg-brandOrange/10 rounded-full blur-3xl"></div>
 <div class="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
 <div class="max-w-3xl mx-auto px-6 py-12 md:py-16 relative z-10">
 <span class="inline-block px-4 py-1 bg-brandOrange/20 border border-brandOrange/30 rounded-full text-[11px] font-bold text-brandOrange uppercase tracking-widest mb-4">Work With Us</span>
 <h3 class="text-2xl md:text-3xl font-black text-white uppercase italic mb-3">Source Directly From Our Shenzhen Factory</h3>
 <p class="text-slate-300 mb-8 max-w-xl mx-auto text-sm leading-relaxed">ISO 9001 certified &middot; 5,000m&sup2; facility &middot; 50+ R&amp;D engineers &middot; 1M+ units/month. OEM/ODM chargers and power banks with custom branding, global certifications, and factory-direct pricing. MOQ from 500 units.</p>
 <div class="flex flex-col sm:flex-row gap-4 justify-center">
 <a href="/contact" class="bg-brandOrange text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:-translate-y-1 transition shadow-lg shadow-brandOrange/20">Request Free Quote</a>
 <a href="/service" class="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-white hover:text-brandBlue transition">OEM/ODM Services</a>
 </div>
 <p class="text-slate-500 text-xs mt-6">Response within 4 hours &middot; Samples in 3-7 days &middot; Production in 25-30 days</p>
 </div>
</section>'''

content = content[:cta_start] + new_cta + content[cta_end:]

with open('C:/Users/wowoh/wowohcool.com/src/blog/index.njk', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done: tag cloud compacted + CTA replaced')
