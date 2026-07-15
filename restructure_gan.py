with open('C:/Users/wowoh/wowohcool.com/src/products/gan-charger/index.njk', 'r', encoding='utf-8') as f:
    content = f.read()

# Section boundaries (character positions in the file)
# Hero + Trust Bar: 0 to end of Trust Bar section
trust_bar_end = content.find('<!-- ========================================================================',
    content.find('<!-- Trust Bar -->')) + 80  # past the Trust Bar comment block
trust_end = content.find('</section>', trust_bar_end) + len('</section>')

# Products: starts right after Trust Bar, ends at WHO IS THIS FOR
products_start = content.find('<section id="products"')
who_start = content.find('<!-- ======== WHO IS THIS FOR ======== -->')
products_section = content[products_start:who_start]

# Power Options (Choose Your GaN Charger)
power_start = content.find('<!-- ========================================================================\n POWER OPTIONS Section')
power_end = content.find('<!-- ========================================================================\n PROTOCOL SUPPORT Section')
power_section = content[power_start:power_end]

# Who Is This For
who_end = content.find('<!-- ======== TECHNOLOGY COMPARISON ======== -->')
who_section = content[who_start:who_end]

# Technology Comparison
tech_end = content.find('<!-- ========================================================================', who_end + 50)
tech_section = content[who_end:tech_end]

# Factory vs Competitor (+ Testimonials)
factory_start = tech_end
testimonials_start = content.find('<!-- ========================================================================', factory_start + 100)
factory_section = content[factory_start:testimonials_start]

# Testimonials
eu_start = content.find('<!-- ======== EU COMPLIANCE ======== -->')
testimonials_section = content[testimonials_start:power_start]  # up to Power Options (old position)

# Protocol Support (was between Power Options and EU Compliance, now after Testimonials)
protocol_start = content.find('<!-- ========================================================================\n PROTOCOL SUPPORT Section')
protocol_end = eu_start
protocol_section = content[protocol_start:protocol_end]

# EU Compliance
faq_start = content.find('<!-- ======== FAQ ======== -->')
eu_section = content[eu_start:faq_start]

# FAQ
blog_start = faq_start + 100
blog_start = content.find('<!-- ========================================================================\n BLOG ARTICLES SECTION', faq_start)
faq_section = content[faq_start:blog_start]

# Blog Articles
explore_start = content.find('<!-- ====== EXPLORE MORE ====== -->')
blog_section = content[blog_start:explore_start]

# Explore More + rest
explore_section = content[explore_start:]

# Build the clean new order
new_content = (
    content[:trust_end]                          # Hero + Trust Bar (0 to end of Trust)
    + '\n\n' + products_section                   # Products
    + '\n\n' + power_section                      # Choose Your GaN Charger ← MOVED UP
    + '\n\n' + who_section                        # Who Is This For
    + '\n\n' + tech_section                       # Technology Comparison
    + '\n\n' + factory_section                    # Factory vs Competitor
    + '\n\n' + testimonials_section               # Testimonials
    + '\n\n' + protocol_section                   # Protocol Support
    + '\n\n' + eu_section                         # EU Compliance
    + '\n\n' + faq_section                        # FAQ
    + '\n\n' + blog_section                       # Blog Articles
    + '\n\n' + explore_section                    # Explore More
)

with open('C:/Users/wowoh/wowohcool.com/src/products/gan-charger/index.njk', 'w', encoding='utf-8') as f:
    f.write(new_content)

# Verify
checks = [
    '<!-- ======== WHO IS THIS FOR',
    '<!-- ======== TECHNOLOGY COMPARISON',
    'POWER OPTIONS Section',
    'PROTOCOL SUPPORT Section',
    '<!-- ======== EU COMPLIANCE',
    '<!-- ======== FAQ ========',
    'BLOG ARTICLES SECTION',
    '<!-- ====== EXPLORE MORE',
    'Not All Factories Are Equal',
    'What Our B2B Partners Say',
    'Choose Your <span class="text-brandOrange">GaN Charger</span>'
]
for c in checks:
    count = new_content.count(c)
    status = '✅' if count == 1 else f'❌ x{count}'
    print(f'{status} {c[:60]}')
