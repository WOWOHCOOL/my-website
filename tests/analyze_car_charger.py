"""
Full /analyze-existing audit of car-charger-guide article.
"""
import sys, io, os, re, html
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

from data_sources.modules.b2b_content_auditor import audit_b2b_content
from data_sources.modules.information_gain_analyzer import analyze_information_gain
from data_sources.modules.search_intent_analyzer import analyze_intent
from data_sources.modules.seo_quality_rater import rate_seo_quality
from data_sources.modules.njk_preprocessor import preprocess, extract_meta, extract_links, extract_images

# ── Read raw .njk ──
filepath = r'C:\Users\wowoh\wowohcool.com\src\blog\car-charger-guide\index.njk'
with open(filepath, 'r', encoding='utf-8') as f:
    raw = f.read()

# Preprocess .njk → Markdown for display/analysis
content = preprocess(raw)
meta = extract_meta(raw)
link_data = extract_links(raw)
img_data = extract_images(raw)

# ── Extract metadata ──
h1_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
h1 = h1_match.group(1).strip() if h1_match else 'N/A'
meta_title = meta.get('title') or 'N/A'
meta_desc = meta.get('description') or 'N/A'

word_count = len(content.split())
h2s = re.findall(r'^##\s+(.+)$', content, re.MULTILINE)
h3s = re.findall(r'^###\s+(.+)$', content, re.MULTILINE)
images = [(img['alt'], img['src']) for img in img_data]
internal_links = link_data.get('internal_count', 0)
external_links = link_data.get('external_count', 0)

# Primary keyword guess from H1
primary_kw = 'car charger' if 'car charger' in h1.lower() else h1.split(':')[0].strip() if ':' in h1 else h1

# ── Run all analyses ──
print("Running analyses...")
# B2B auditor receives RAW .njk — it auto-detects and preprocesses internally
b2b = audit_b2b_content(raw, article_type='technical')
# IG analyzer works on preprocessed text content
ig = analyze_information_gain(content)
intent = analyze_intent(primary_kw)
seo = rate_seo_quality(
    content=content,
    meta_title=meta_title if meta_title != 'N/A' else None,
    meta_description=meta_desc if meta_desc != 'N/A' else None,
    primary_keyword=primary_kw,
    b2b_audit_score=b2b['overall_score'],
    information_gain_score=ig['overall_score'],
)

# ── Print Report ──
print()
print("=" * 70)
print(f"  CONTENT ANALYSIS REPORT: {h1[:60]}")
print("=" * 70)
print(f"  Analyzed: 2026-07-22")
print(f"  URL: https://www.wowohcool.com/blog/car-charger-guide/")
print(f"  Primary Keyword: {primary_kw}")
print(f"  Word Count: {word_count}")
print(f"  Meta Title: {meta_title[:80]}")
print(f"  Meta Desc: {meta_desc[:80]}")
print()

# ── Executive Summary ──
print("─" * 70)
print("  EXECUTIVE SUMMARY")
print("─" * 70)
b2b_s = b2b['overall_score']
ig_s = ig['overall_score']
seo_s = seo['overall_score']
overall = round((b2b_s + ig_s + seo_s) / 3, 1)

if overall >= 80: grade = "A (Excellent)"
elif overall >= 70: grade = "B (Good)"
elif overall >= 60: grade = "C (Average)"
elif overall >= 50: grade = "D (Needs Work)"
else: grade = "F (Poor)"

print(f"  Overall Content Health: {overall}/100 — {grade}")
print(f"  SEO Quality: {seo_s:.0f}/100 ({seo['grade']})")
print(f"  B2B Content Quality: {b2b_s:.0f}/100")
print(f"  Information Gain: {ig_s:.0f}/100 ({ig['information_gain_level']})")
print()

# Critical issues
criticals = seo.get('critical_issues', []) + b2b.get('critical_issues', [])
if criticals:
    print(f"  ⚠️  {len(criticals)} Critical Issues Found")
print(f"  Publishing Ready: {'✅ Yes' if seo.get('publishing_ready') else '❌ No — fix critical issues first'}")
print()

# ── 1. Search Intent Analysis ──
print("─" * 70)
print("  1. SEARCH INTENT ANALYSIS")
print("─" * 70)
print(f"  Primary Intent: {intent['primary_intent']}")
print(f"  Secondary Intent: {intent.get('secondary_intent') or 'None'}")
print(f"  B2B/B2C Classification: {intent['b2b_vs_b2c']['classification']}")
print(f"  {intent['b2b_vs_b2c']['verdict']}")
print(f"  Confidence: I={intent['confidence']['informational']:.0f}% N={intent['confidence']['navigational']:.0f}% T={intent['confidence']['transactional']:.0f}% C={intent['confidence']['commercial_investigation']:.0f}%")
print()

# ── 2. Structure Analysis ──
print("─" * 70)
print("  2. HEADING & STRUCTURE ANALYSIS")
print("─" * 70)
print(f"  H1: {h1[:90]}")
print(f"  H1 Length: {len(h1)} chars (target: 50-65)")
print(f"  H2 Count: {len(h2s)}")
print(f"  H3 Count: {len(h3s)}")
if h2s:
    print(f"  H2s:")
    for h in h2s[:10]:
        b2b_tag = " [B2B]" if any(w.lower() in h.lower() for w in ['oem','odm','manufacturer','factory','supplier','sourcing','moq','fob','b2b','procurement','wholesale','importer']) else ""
        print(f"    - {h[:85]}{b2b_tag}")
print()

# ── 3. B2B Content Audit ──
print("─" * 70)
print("  3. B2B CONTENT AUDIT (11 Checks)")
print("─" * 70)
checks = [
    ('Opening Density', 'opening_density'),
    ('TL;DR Block', 'tldr_block'),
    ('H3 Answer Length', 'h3_answer_length'),
    ('Vague Headings', 'vague_headings'),
    ('H2 B2B Signal Density', 'h2_b2b_density'),
    ('First-Hand Data Density', 'data_density'),
    ('Table Test', 'table_test'),
    ('Stock Photo Detection', 'stock_photo'),
    ('FAQ B2B Language', 'faq_b2b_language'),
    ('Author E-E-A-T', 'author_eeat'),
    ('Weak CTA Detection', 'weak_cta'),
]
for label, key in checks:
    c = b2b.get(key, {})
    s = c.get('score')
    score_str = f'{s:.0f}/100' if s is not None else 'N/A'
    crit = ' ⚠️' if c.get('critical_issues') else ''
    warn = ' ⚡' if c.get('warnings') else ''
    print(f'  {label:<30} {score_str:>8}{crit}{warn}')

# B2B details
h2_b2b = b2b.get('h2_b2b_density', {})
if h2_b2b.get('score') is not None:
    print(f'\n  H2 B2B Density Details:')
    print(f'    Article Type: {h2_b2b.get("article_type")}')
    print(f'    Density: {h2_b2b.get("density")}% (target: {h2_b2b.get("target_range")})')
    print(f'    B2B H2s: {h2_b2b.get("b2b_h2s")}/{h2_b2b.get("total_h2s")}')
    print(f'    In Range: {h2_b2b.get("in_range")}')

data_d = b2b.get('data_density', {})
if data_d.get('score') is not None:
    print(f'\n  Data Density Details:')
    print(f'    Data Points per 1000 words: {data_d.get("data_points_per_1000")}')
    print(f'    Units Found: {data_d.get("units_found")}')

print()

# ── 4. Information Gain ──
print("─" * 70)
print("  4. INFORMATION GAIN ANALYSIS")
print("─" * 70)
print(f"  Score: {ig['overall_score']}/100")
print(f"  Mode: {ig['mode']}")
print(f"  Level: {ig['information_gain_level'].upper()}")
if ig['mode'] == 'heuristic_estimate':
    hf = ig['heuristic_factors']
    print(f"  Technical Anchors: {hf['technical_anchor_count']} (score: {hf['technical_anchor_score']})")
    print(f"  Data Points: {hf['data_point_count']} (score: {hf['data_point_score']})")
    print(f"  Named Entities: {hf['named_entity_count']} (score: {hf['named_entity_score']})")
    print(f"  B2B Vocabulary Diversity: {hf['b2b_vocabulary_diversity']} (score: {hf['b2b_score']})")
    if hf.get('anchors_found'):
        print(f"  Anchors Found: {', '.join(hf['anchors_found'][:5])}")
print()

# ── 5. SEO Quality Rating ──
print("─" * 70)
print("  5. SEO QUALITY RATING")
print("─" * 70)
print(f"  Overall: {seo['overall_score']}/100 — {seo['grade']}")
print(f"  Publishing Ready: {seo['publishing_ready']}")
print()
cats = seo['category_scores']
print(f"  Category Breakdown:")
for cat, score in cats.items():
    bar = '█' * int(score / 10) + '░' * (10 - int(score / 10))
    print(f'    {cat:<25} {score:>3}/100  {bar}')
print()

# ── 6. Link Analysis ──
print("─" * 70)
print("  6. LINK ANALYSIS")
print("─" * 70)
print(f"  Internal Links: {internal_links} (target: 3-5+)")
print(f"  External Links: {external_links} (target: 2-3+)")
print(f"  Images: {len(images)}")
print()

# ── 7. Priority Action Plan ──
print("─" * 70)
print("  7. PRIORITY ACTION PLAN")
print("─" * 70)

all_criticals = seo.get('critical_issues', []) + b2b.get('critical_issues', [])
all_warnings = seo.get('warnings', []) + b2b.get('warnings', [])

if all_criticals:
    print("  CRITICAL (Fix Before Publishing):")
    for i, issue in enumerate(all_criticals[:5], 1):
        print(f"    {i}. {issue[:120]}")

if all_warnings:
    print("  WARNINGS (Should Fix):")
    for i, w in enumerate(all_warnings[:5], 1):
        print(f"    {i}. {w[:120]}")

b2b_recs = b2b.get('recommendations', [])
ig_recs = ig.get('recommendations', [])
all_recs = b2b_recs + ig_recs
if all_recs:
    print("  RECOMMENDATIONS:")
    for i, rec in enumerate(all_recs[:5], 1):
        print(f"    {i}. {rec[:120]}")

print()

# ── 8. Quick Wins ──
print("─" * 70)
print("  8. QUICK WINS (5-10 min each)")
print("─" * 70)
quick_wins = []

# TL;DR block missing
if b2b.get('tldr_block', {}).get('score') == 0:
    quick_wins.append("Add a **Key Takeaways** block immediately after H1 with 3-4 bullet-point conclusions")

# Weak CTA
weak_cta = b2b.get('weak_cta', {})
if weak_cta.get('score', 100) < 60:
    quick_wins.append(f"Replace weak CTAs with B2B value-continuation: \"{weak_cta.get('suggested_cta', 'Download the Full Car Charger Technical Spec Sheet (PDF)')}\"")

# Author E-E-A-T
author = b2b.get('author_eeat', {})
if author.get('score', 100) < 60:
    quick_wins.append("Add credential-rich author byline with job title + years of experience + LinkedIn URL")

# Vague headings
vague = b2b.get('vague_headings', {})
if vague.get('vague_count', 0) > 0:
    quick_wins.append(f"Rewrite {vague['vague_count']} vague label-style headings as conclusion-style (see recommendations above)")

# Meta title length
if len(meta_title) > 65:
    quick_wins.append(f"Shorten meta title from {len(meta_title)} to 50-60 chars")
elif len(meta_title) < 50 and meta_title != 'N/A':
    quick_wins.append(f"Lengthen meta title from {len(meta_title)} to 50-60 chars")

for i, w in enumerate(quick_wins[:5], 1):
    print(f"  {i}. {w}")

if not quick_wins:
    print("  No immediate quick wins identified — article is well-optimized")

print()

# ── 9. Rewrite Recommendation ──
print("─" * 70)
print("  9. REWRITE RECOMMENDATION")
print("─" * 70)
if overall >= 80:
    print("  Priority: LOW — Light edit only")
    print("  Effort: 15-30 min")
elif overall >= 70:
    print("  Priority: MEDIUM — Moderate update")
    print("  Effort: 1-2 hours")
elif overall >= 60:
    print("  Priority: HIGH — Major refresh recommended")
    print("  Effort: 2-4 hours")
else:
    print("  Priority: CRITICAL — Complete rewrite needed")
    print("  Effort: 4-8 hours")

print(f"  Expected Impact: {'HIGH' if overall < 75 else 'MEDIUM' if overall < 85 else 'INCREMENTAL'} improvement in ranking potential")
print()
print("  Next Steps:")
if overall < 75:
    print("    1. Fix all critical issues listed above")
    print("    2. Run /rewrite car-charger-guide")
    print("    3. Run /optimize on the rewritten file")
else:
    print("    1. Fix quick wins listed above")
    print("    2. Run /optimize on the updated file")
print("    3. Update index.njk template with changes")
print("    4. Git push → Cloudflare Pages deploy")
print()

print("=" * 70)
print(f"  Report saved to: research/analysis-car-charger-guide-2026-07-22.md")
print("=" * 70)
