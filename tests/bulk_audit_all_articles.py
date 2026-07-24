"""
Bulk audit of all 28 wowohcool.com EN blog articles.
Runs B2B audit + Information Gain on every article, produces a ranked leaderboard.
Proves the B2B audit skills are correct by showing real score distribution.
"""
import sys, io, os, re, json

# Setup
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, project_root)
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

from data_sources.modules.b2b_content_auditor import audit_b2b_content
from data_sources.modules.information_gain_analyzer import analyze_information_gain
from data_sources.modules.njk_preprocessor import preprocess as njk_preprocess

BLOG_DIR = r'C:\Users\wowoh\wowohcool.com\src\blog'

# ── Read and preprocess .njk content ──
def read_and_preprocess(filepath):
    """Read .njk file, return (raw_content, preprocessed_markdown)."""
    with open(filepath, 'r', encoding='utf-8') as f:
        raw = f.read()
    return raw, njk_preprocess(raw)

# ── Classify article type from slug ──
def classify_from_slug(slug):
    slug_lower = slug.lower()
    oem_keywords = ['oem', 'odm', 'manufacturing', 'private-label', 'manufacturers']
    procurement_keywords = ['choose', 'find', 'sourcing', 'shipping', 'import', 'cost',
                           'hotel', 'enterprise', 'factory-verification', 'supplier',
                           'quality-control']
    for kw in oem_keywords:
        if kw in slug_lower:
            return 'oem_core'
    for kw in procurement_keywords:
        if kw in slug_lower:
            return 'procurement'
    return 'technical'

# ── Main ──
def main():
    articles = []
    for entry in sorted(os.listdir(BLOG_DIR)):
        article_dir = os.path.join(BLOG_DIR, entry)
        if not os.path.isdir(article_dir):
            continue
        njk_file = os.path.join(article_dir, 'index.njk')
        if not os.path.exists(njk_file):
            continue
        articles.append((entry, njk_file))

    print(f'{"="*70}')
    print(f'  BULK B2B AUDIT — {len(articles)} Articles')
    print(f'  Site: wowohcool.com EN Blog')
    print(f'{"="*70}')
    print()

    results = []
    for slug, filepath in articles:
        raw, content = read_and_preprocess(filepath)
        article_type = classify_from_slug(slug)

        # Pass RAW .njk to B2B auditor (auto-detects .njk, preprocesses internally)
        b2b = audit_b2b_content(raw, article_type=article_type)
        # IG analyzer works on preprocessed markdown text
        ig = analyze_information_gain(content)

        results.append({
            'slug': slug,
            'file': filepath,
            'type': article_type,
            'words': len(content.split()),
            'b2b_score': b2b['overall_score'],
            'ig_score': ig['overall_score'],
            'ig_level': ig['information_gain_level'],
            'opening': b2b['opening_density'].get('score'),
            'tldr': b2b['tldr_block'].get('score'),
            'h3_answer': b2b['h3_answer_length'].get('score'),
            'vague_h': b2b['vague_headings'].get('score'),
            'h2_b2b': b2b['h2_b2b_density'].get('score'),
            'data_d': b2b['data_density'].get('score'),
            'table_t': b2b['table_test'].get('score'),
            'stock_p': b2b['stock_photo'].get('score'),
            'faq_lang': b2b['faq_b2b_language'].get('score'),
            'author': b2b['author_eeat'].get('score'),
            'weak_cta': b2b['weak_cta'].get('score'),
        })

    # ── Sort by B2B score descending ──
    results.sort(key=lambda r: r['b2b_score'], reverse=True)

    # ── Leaderboard ──
    print(f'{"─"*70}')
    print(f'  B2B AUDIT LEADERBOARD')
    print(f'{"─"*70}')
    print(f'  {"#":>3}  {"Article":<40} {"Type":<13} {"B2B":>5} {"IG":>5} {"Words":>6}')
    print(f'  {"─"*3}  {"─"*40} {"─"*13} {"─"*5} {"─"*5} {"─"*6}')

    for rank, r in enumerate(results, 1):
        b2b_s = f'{r["b2b_score"]:.0f}'
        ig_s = f'{r["ig_score"]:.0f}'
        slug_short = r['slug'][:38]
        type_short = r['type'][:11]
        print(f'  {rank:>3}  {slug_short:<40} {type_short:<13} {b2b_s:>5} {ig_s:>5} {r["words"]:>6}')

    # ── Statistics ──
    b2b_scores = [r['b2b_score'] for r in results]
    ig_scores = [r['ig_score'] for r in results]

    print()
    print(f'{"─"*70}')
    print(f'  SCORE DISTRIBUTION')
    print(f'{"─"*70}')
    print(f'  B2B Audit:  min={min(b2b_scores):.0f}  max={max(b2b_scores):.0f}  avg={sum(b2b_scores)/len(b2b_scores):.1f}  median={sorted(b2b_scores)[len(b2b_scores)//2]:.0f}')
    print(f'  Info Gain: min={min(ig_scores):.0f}  max={max(ig_scores):.0f}  avg={sum(ig_scores)/len(ig_scores):.1f}  median={sorted(ig_scores)[len(ig_scores)//2]:.0f}')

    # ── Grade distribution ──
    grades = {'A (90+)': 0, 'B (75-89)': 0, 'C (60-74)': 0, 'D (40-59)': 0, 'F (<40)': 0}
    for s in b2b_scores:
        if s >= 90: grades['A (90+)'] += 1
        elif s >= 75: grades['B (75-89)'] += 1
        elif s >= 60: grades['C (60-74)'] += 1
        elif s >= 40: grades['D (40-59)'] += 1
        else: grades['F (<40)'] += 1

    print()
    print(f'  Grade Distribution:')
    for grade, count in grades.items():
        bar = '█' * count
        print(f'    {grade:<12} {count:>2} {bar}')

    # ── Top 3 and Bottom 3 ──
    print()
    print(f'{"─"*70}')
    print(f'  TOP 3 — BEST SCORING')
    print(f'{"─"*70}')
    for r in results[:3]:
        print(f'  {r["slug"]}')
        print(f'    B2B={r["b2b_score"]:.0f}  IG={r["ig_score"]:.0f} ({r["ig_level"]})  Words={r["words"]}  Type={r["type"]}')
        # Show dimension breakdown
        dims = []
        for d in ['opening','tldr','h3_answer','vague_h','h2_b2b','data_d','table_t','stock_p','faq_lang','author','weak_cta']:
            s = r[d]
            if s is not None:
                dims.append(f'{d}={s:.0f}')
        print(f'    Dims: {", ".join(dims)}')
        print()

    print(f'{"─"*70}')
    print(f'  BOTTOM 3 — NEEDS MOST WORK')
    print(f'{"─"*70}')
    for r in results[-3:]:
        print(f'  {r["slug"]}')
        print(f'    B2B={r["b2b_score"]:.0f}  IG={r["ig_score"]:.0f} ({r["ig_level"]})  Words={r["words"]}  Type={r["type"]}')
        dims = []
        for d in ['opening','tldr','h3_answer','vague_h','h2_b2b','data_d','table_t','stock_p','faq_lang','author','weak_cta']:
            s = r[d]
            if s is not None:
                dims.append(f'{d}={s:.0f}')
        print(f'    Dims: {", ".join(dims)}')
        print()

    # ── Type breakdown ──
    print(f'{"─"*70}')
    print(f'  BY ARTICLE TYPE')
    print(f'{"─"*70}')
    for atype in ['technical', 'procurement', 'oem_core']:
        typed = [r for r in results if r['type'] == atype]
        if typed:
            avg = sum(r['b2b_score'] for r in typed) / len(typed)
            print(f'  {atype:<14} {len(typed):>2} articles  avg B2B={avg:.1f}  avg IG={sum(r["ig_score"] for r in typed)/len(typed):.1f}')

    # ── Save JSON for further analysis ──
    json_path = os.path.join(project_root, 'audits', 'bulk-audit-all-articles-2026-07-22.json')
    os.makedirs(os.path.dirname(json_path), exist_ok=True)
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    print(f'\n  Full results saved to: {json_path}')
    print(f'{"="*70}')

if __name__ == '__main__':
    main()
