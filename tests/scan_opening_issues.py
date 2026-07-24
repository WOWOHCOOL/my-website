"""Scan all 28 articles for remaining opening issues."""
import sys,io,os,re
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

from data_sources.modules.njk_preprocessor import preprocess
from data_sources.modules.b2b_content_auditor import B2BContentAuditor

auditor = B2BContentAuditor()
BLOG = r'C:/Users/wowoh/wowohcool.com/src/blog'
issues = []

for d in sorted(os.listdir(BLOG)):
    njk = os.path.join(BLOG, d, 'index.njk')
    if not os.path.exists(njk):
        continue
    with open(njk, 'r', encoding='utf-8') as f:
        raw = f.read()
    c = preprocess(raw)

    # Check intro paragraphs
    body = auditor._strip_metadata(c)
    after_h1 = auditor._skip_to_body_start(body)
    paras = auditor._count_intro_paragraphs(after_h1)

    # Check opening density
    od = auditor._check_opening_density(c)
    sents = od.get('first_sentences', [])
    sent1 = sents[0] if sents else ''

    # Checks
    self_promo = bool(re.search(
        r'At WOWOHCOOL|WOWOHCOOL, we|our (?:factory|ISO|facility|team)',
        sent1
    ))
    # Q-open only flags search-query questions, not rhetorical "What if..." hooks
    # "What if..." openings that contain a number/B2B signal are valid B2B hooks
    q_open = bool(re.match(
        r'^(?:How\s|Why\s|Which\s|Is\s|Are\s|Can\s|Do\s|Does\s|Will\s)',
        sent1.strip()
    )) and not bool(re.match(r'^What if', sent1.strip()))
    cliches = ['needle in a haystack', 'when it comes to', 'in the world of',
               "in today'", "let's dive", 'game changer']
    has_cliche = any(c in ' '.join(sents[:3]).lower() for c in cliches)

    # Check for QUICK ANSWER still in intro area
    toc_pos = raw.find('Table of Contents')
    if toc_pos < 0:
        toc_pos = raw.find('Key Takeaways')
    qa_pos = raw.find('QUICK ANSWER')
    has_intro_qa = qa_pos > 0 and qa_pos < toc_pos if toc_pos > 0 else False

    if paras > 3 or od.get('has_fluff') or self_promo or q_open or has_cliche or has_intro_qa:
        flags = []
        if paras > 3:
            flags.append(f'{paras}PARAS')
        if od.get('has_fluff'):
            flags.append('FLUFF')
        if self_promo:
            flags.append('SELF-PROMO')
        if q_open:
            flags.append('Q-OPEN')
        if has_cliche:
            flags.append('CLICHE')
        if has_intro_qa:
            flags.append('QA-BLOCK')
        issues.append({
            'slug': d,
            'paras': paras,
            'flags': flags,
            'sent1': sent1[:120],
        })

print(f'Articles with opening issues: {len(issues)}/28')
print()
for i in issues:
    print(f'{i["slug"][:50]}')
    print(f'  Flags: {", ".join(i["flags"])}')
    print(f'  S1: {i["sent1"]}')
    print()

if not issues:
    print('All 28 articles pass all opening checks.')
