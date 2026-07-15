import re, os

base = 'C:/Users/wowoh/wowohcool.com/src/de/blog'
articles = [
    ('powerbank-spezifikationen', 'Fazit'),
    ('semi-solid-state-powerbank', 'FAZIT'),
    ('qi2-zertifizierung-importeure', 'Fazit'),
    ('fabrikauswahl-china-leitfaden', 'Weitere Artikel'),
    ('gan-ladegeraete-leitfaden', 'Weitere Artikel'),
    ('gan-v-oem-fertigung', 'Häufige Fragen'),
    ('markt-trends-ladegeraete-2026', 'Fazit'),
]

for name, end_marker in articles:
    fpath = os.path.join(base, name, 'index.njk')
    if not os.path.exists(fpath):
        print(f'{name}: SKIP - not found')
        continue

    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Skip if already has faq-answer class in body
    if 'class=\"faq-answer\"' in content or 'class=\"faq-answer ' in content:
        print(f'{name}: SKIP - already has visible FAQ')
        continue

    # Extract FAQ Q&A from Schema
    faq_start = content.find('\"FAQPage\"')
    if faq_start < 0:
        print(f'{name}: SKIP - no FAQPage')
        continue

    entity_start = content.find('\"mainEntity\"', faq_start)
    chunk = content[entity_start:entity_start+8000]
    questions = re.findall(r'\"name\":\s*\"([^\"]+)\"', chunk)
    answers = re.findall(r'\"text\":\s*\"([^\"]+)\"', chunk)

    # How many are FAQ questions (not HowTo)?
    # Simple heuristic: take last N where N matches FAQ count
    faq_count = min(5, len(questions))  # Most articles have 4-6 FAQ
    faq_q = questions[-faq_count:]
    faq_a = answers[-faq_count:]

    if len(faq_q) == 0:
        print(f'{name}: SKIP - no questions extracted')
        continue

    # Build FAQ HTML
    faq_html = '\n <!-- FAQ Section -->\n <section class=\"mb-16\">\n <div class=\"bg-slate-50 rounded-xl p-6 border border-slate-200 shadow-sm\">\n <h2 class=\"text-2xl font-black text-brandBlue uppercase italic mb-6\">Häufig gestellte Fragen (FAQ)</h2>\n'
    for q, a in zip(faq_q, faq_a):
        faq_html += f' <div class=\"bg-white rounded-lg p-4 border border-slate-200 mb-3 faq-answer\">\n <h3 class=\"font-black text-brandOrange text-sm mb-2\">{q}</h3>\n <p class=\"text-slate-600 text-sm leading-relaxed\">{a}</p>\n </div>\n'
    faq_html += ' </div>\n </section>\n'

    # Find insertion point
    idx = content.find(end_marker)
    if idx > 0:
        section_start = content.rfind('<section', 0, idx)
        if section_start < 0:
            section_start = content.rfind('<div', 0, idx)
        if section_start > 0:
            content = content[:section_start] + faq_html + content[section_start:]

    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'{name}: FAQ section added ({len(faq_q)} questions)')

print('Done')
