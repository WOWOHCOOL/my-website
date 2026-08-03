"""
Sync FAQ: ensure Schema and Body have the SAME FAQ questions.
Strategy: Compare counts. If Schema has more, add missing Q&As to Body.
If Body has more, add missing Q&As to Schema.
"""
import re, json, glob, os

BASE = 'C:/Users/wowoh/wowohcool.com'

def count_body_faq(content):
    """Count FAQ <h3> questions in the FAQ section of the body"""
    # Find FAQ section between id="faq" and author-bio/CTA
    m = re.search(r'id="faq"', content)
    if not m: return 0, []
    start = m.start()

    # Find end of FAQ section (before Author Bio, CTA, or related-articles)
    end_patterns = [
        r'<!-- Author Bio -->', r'<section id="author-bio"',
        r'<!-- CTA -->', r'{% set cta', r'{% include "partials/blog-cta"',
        r'<aside id="related-articles"', r'<!-- Related Articles',
    ]
    end = len(content)
    for pat in end_patterns:
        em = re.search(pat, content[start:])
        if em:
            end = min(end, start + em.start())

    block = content[start:end]
    questions = re.findall(r'<h3[^>]*>([^<]+)</h3>', block)
    return len(questions), questions

def extract_schema_faq(content):
    """Get FAQ Q&A from JSON-LD as list of (question, answer)"""
    m = re.search(r'<script type="application/ld\+json">(.*?)</script>', content, re.DOTALL)
    if not m: return []
    try: schema = json.loads(m.group(1))
    except: return []
    faq = next((n for n in schema.get('@graph',[]) if n.get('@type')=='FAQPage'), {})
    return [(q.get('name',''), q.get('acceptedAnswer',{}).get('text','')) for q in faq.get('mainEntity', [])]

def add_to_schema(content, new_qa):
    """Add a Q&A pair to the schema FAQPage"""
    # Find the last question in mainEntity, insert new one before closing ]
    # Find: "text": "..."\n     }\n    }\n   ],\n   "@id":...
    # Insert before:    }\n   ],\n   "@id"
    new_entry = f'''    }},
    {{
     "@type": "Question",
     "name": "{new_qa[0]}",
     "acceptedAnswer": {{
      "@type": "Answer",
      "text": "{new_qa[1]}"
     }}
    }}'''

    # Insert before the closing of mainEntity
    m = re.search(r'(\s+})\s*\n\s*],\s*\n\s*"@id":\s*"[^"]*#faq"', content)
    if m:
        pos = m.start()
        content = content[:pos] + new_entry + content[pos:]
    return content

def add_to_body(content, schema_faqs, lang):
    """Rebuild FAQ body section with all schema questions"""
    # FAQ section heading
    headings = {
        'de': 'Häufig gestellte Fragen (FAQ)',
        'es': 'Preguntas Frecuentes',
        'en': 'Frequently Asked Questions',
    }
    # CSS classes per language
    if lang == 'de':
        container = 'bg-white rounded-lg p-4 border border-slate-200 mb-3 faq-answer'
        h3class = 'font-black text-brandOrange text-sm mb-2'
    elif lang == 'es':
        container = 'bg-white rounded-xl p-6'
        h3class = 'font-black text-brandBlue mb-2'
    else:
        container = 'bg-white rounded-xl p-6'
        h3class = 'font-black text-brandBlue mb-2'

    heading = headings.get(lang, headings['en'])

    items = ''
    for q, a in schema_faqs:
        q_esc = q.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
        a_esc = a.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;')
        items += f''' <div class="{container}">
 <h3 class="{h3class}">{q_esc}</h3>
 <p class="text-slate-600 text-sm leading-relaxed">{a_esc}</p>
 </div>
'''

    html = f'''<section id="faq" class="mb-16">
 <div class="bg-slate-50 rounded-2xl p-8 border border-slate-200 shadow-sm">
 <h2 class="text-2xl font-black text-brandBlue uppercase italic mb-8 text-center">{heading}</h2>
 <div class="space-y-6 max-w-3xl mx-auto">
{items} </div>
 </div>
</section>
'''
    return html

def main():
    stats = {'ok': 0, 'body_rebuilt': 0, 'schema_added': 0, 'both': 0, 'skip': 0}

    for pat in ['src/blog/*/index.njk','src/de/blog/*/index.njk','src/es/blog/*/index.njk']:
        for f in sorted(glob.glob(pat)):
            norm = f.replace(os.sep, '/')
            lang = 'en'
            if '/de/' in norm: lang = 'de'
            elif '/es/' in norm: lang = 'es'
            slug = os.path.basename(os.path.dirname(f))

            c = open(f, encoding='utf-8-sig').read()

            schema_faqs = extract_schema_faq(c)
            if len(schema_faqs) < 5:
                continue  # Not our problem for this pass

            body_count, body_qs = count_body_faq(c)
            schema_count = len(schema_faqs)

            if body_count == schema_count:
                stats['ok'] += 1
                continue

            # Find FAQ section boundaries
            m = re.search(r'id="faq"', c)
            if not m:
                stats['skip'] += 1
                continue
            faq_start = m.start()

            # Find end
            end_pats = [r'<!-- Author Bio -->', r'id="author-bio"', r'<!-- CTA -->', r'{% set cta', r'id="related-articles"']
            faq_end = len(c)
            for pat in end_pats:
                em = re.search(pat, c[faq_start:])
                if em:
                    faq_end = min(faq_end, faq_start + em.start())

            if body_count < schema_count:
                # Rebuild body to match schema
                new_section = add_to_body(c, schema_faqs, lang)
                # Strip any nested <section tags left from previous rebuilds
                prefix = c[:faq_start]
                while prefix.rstrip().endswith('<section'):
                    prefix = prefix.rstrip()[:-8].rstrip()
                c = prefix + new_section + c[faq_end:]
                open(f, 'w', encoding='utf-8').write(c)
                stats['body_rebuilt'] += 1
            elif body_count > schema_count:
                # NOT adding body questions to schema (would need manual QA review)
                # Just flag for now
                stats['skip'] += 1
                print(f'  BODY>SCHEMA ({body_count}>{schema_count}): {slug}')

    print(f'OK: {stats["ok"]} | Body rebuilt: {stats["body_rebuilt"]} | Skip: {stats["skip"]}')
    return stats

if __name__ == '__main__':
    main()
