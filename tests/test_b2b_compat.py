"""
Backward compatibility & rationality verification for B2B audit modules.
Tests that old logic is NOT broken and new B2B logic is sound.
"""
import sys, io, os
# Add project root to path
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, project_root)
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

print('=' * 60)
print('  BACKWARD COMPATIBILITY & RATIONALITY VERIFICATION')
print('=' * 60)

# ===================================================================
# TEST 1: search_intent_analyzer — old caller still works
# ===================================================================
print('\n--- Test 1: search_intent_analyzer backward compat ---')
from data_sources.modules.search_intent_analyzer import analyze_intent

r1 = analyze_intent(
    'how to start a podcast',
    serp_features=['featured_snippet', 'people_also_ask', 'video'],
    top_results=[
        {'title': 'How to Start a Podcast in 2024', 'description': 'Complete guide...'},
        {'title': 'Podcasting for Beginners', 'description': 'Step by step...'}
    ]
)
old_keys = {'keyword', 'primary_intent', 'secondary_intent', 'confidence',
            'signals_detected', 'recommendations'}
has_old = all(k in r1 for k in old_keys)
assert has_old, "OLD KEYS MISSING!"
assert 'b2b_vs_b2c' in r1, "New B2B key not present (should be added, not replacing)"
print(f'  Old keys present: {has_old}')
print(f'  New B2B key added (non-breaking): True')
print(f'  B2B classification: {r1["b2b_vs_b2c"]["classification"]}')

# B2B keyword
r2 = analyze_intent('140W GaN charger OEM manufacturer MOQ 500 FOB Shenzhen')
assert r2['b2b_vs_b2c']['classification'] == 'b2b', f"Expected b2b, got {r2['b2b_vs_b2c']['classification']}"
print(f'  B2B keyword -> {r2["b2b_vs_b2c"]["classification"]} ({r2["b2b_vs_b2c"]["b2b_signals_found"]})')

# B2C keyword
r3 = analyze_intent('best cheap power bank for home use amazon')
assert r3['b2b_vs_b2c']['classification'] == 'b2c', f"Expected b2c, got {r3['b2b_vs_b2c']['classification']}"
print(f'  B2C keyword -> {r3["b2b_vs_b2c"]["classification"]} ({r3["b2b_vs_b2c"]["b2c_signals_found"]})')

# Neutral
r4 = analyze_intent('USB-C PD 3.1 protocol specification')
print(f'  Neutral keyword -> {r4["b2b_vs_b2c"]["classification"]}')
print('  PASSED: search_intent_analyzer backward compatible')

# ===================================================================
# TEST 2: seo_quality_rater — legacy (no B2B params) vs new
# ===================================================================
print('\n--- Test 2: seo_quality_rater backward compat ---')
from data_sources.modules.seo_quality_rater import rate_seo_quality

sample = '# Test\n\n## Intro\n\n' + ('OEM manufacturing content for B2B procurement testing purposes. ' * 50)

# OLD WAY — no B2B params
r_old = rate_seo_quality(
    content=sample,
    meta_title='OEM Manufacturing Guide 2026 for B2B Buyers',
    meta_description='A comprehensive OEM manufacturing guide for B2B procurement.',
    primary_keyword='OEM manufacturing',
)
assert len(r_old['category_scores']) == 6, f"Legacy should have 6 categories, got {len(r_old['category_scores'])}"
assert 'b2b_content_quality' not in r_old['category_scores'], "B2B category leaked into legacy call!"
print(f'  Legacy: {r_old["overall_score"]}, {len(r_old["category_scores"])} categories, publishing_ready={r_old["publishing_ready"]}')

# NEW WAY — with B2B params
r_new = rate_seo_quality(
    content=sample,
    meta_title='OEM Manufacturing Guide 2026',
    meta_description='B2B procurement guide for OEM manufacturing.',
    primary_keyword='OEM manufacturing',
    b2b_audit_score=85.0,
    information_gain_score=72.0,
)
assert len(r_new['category_scores']) == 8, f"New should have 8 categories, got {len(r_new['category_scores'])}"
assert 'b2b_content_quality' in r_new['category_scores'], "Missing B2B category in new call!"
assert 'information_gain' in r_new['category_scores'], "Missing IG category in new call!"

# Verify all 6 legacy cats still present in new call
for cat in ['content', 'keyword_optimization', 'meta_elements', 'structure', 'links', 'readability']:
    assert cat in r_new['category_scores'], f"Missing legacy: {cat}"

print(f'  New: {r_new["overall_score"]}, {len(r_new["category_scores"])} categories, B2B={r_new["category_scores"]["b2b_content_quality"]}, IG={r_new["category_scores"]["information_gain"]}')
print(f'  All 6 legacy categories present in new call: True')
print('  PASSED: seo_quality_rater backward compatible')

# ===================================================================
# TEST 3: b2b_content_auditor — 11 checks against good & bad content
# ===================================================================
print('\n--- Test 3: b2b_content_auditor functionality ---')
from data_sources.modules.b2b_content_auditor import audit_b2b_content

# Well-optimized B2B content
good = """# GaN Charger OEM Manufacturing Guide 2026

**Key Takeaways:**
- 140W GaN chargers require 3 thermal benchmarks every importer must verify
- Case temperature exceeding 65degC under 100% load = CE compliance failure
- FOB Shenzhen pricing ranges $12-18/unit at MOQ 500

## Why 140W PD 3.1 Matters for Enterprise Procurement

GaN HEMT switching at 3 MHz reduces transformer volume by 55% vs silicon at 100 kHz.

## 3 Critical Thermal Benchmarks Importers Must Verify

Case temperature stabilized at 58.3degC under 100% load after 4-hour aging test. Measured with Keysight E4980A per IEC 62368-1 Section 5.4.2.

### What Case Temperature is Acceptable Under 100% Load for CE Compliance?

The EN 62368-1 Annex M.4 requires creepage distance of 6.4mm at TUV Rheinland Lab. Our testing protocol runs 48-hour continuous monitoring at 12 measurement points.

## OEM vs ODM Manufacturing Cost Comparison

| Parameter | OEM | ODM |
|-----------|-----|-----|
| MOQ | 500 units | 1000 units |
| FOB Shenzhen | $12.50/unit | $9.80/unit |
| Lead Time | 45 days | 30 days |
| Certification | Full CE/GS/UL | Shared |

**Author**: Jack Peng, Senior R&D Engineer at WOWOHCOOL, 12+ years in Shenzhen power supply manufacturing

Download the Full 140W GaN Charger Aging Test Report (PDF)
"""

result = audit_b2b_content(good, article_type='oem_core')
expected = ['opening_density', 'tldr_block', 'h3_answer_length', 'vague_headings',
            'h2_b2b_density', 'data_density', 'table_test', 'stock_photo',
            'faq_b2b_language', 'author_eeat', 'weak_cta']

for c in expected:
    assert c in result, f"Missing check: {c}"
    s = result[c].get('score')
    status = f'{s}/100' if s is not None else 'N/A'
    print(f'  {c}: {status}')

print(f'  Overall: {result["overall_score"]}/100')

# Good content should score 70+
assert result['overall_score'] >= 70, f"Well-optimized B2B content scored {result['overall_score']} — should be >=70"

# Specific checks: TL;DR should be detected
assert result['tldr_block']['has_tldr'], "TL;DR block not detected in content that has one!"
# Data density should be high
assert result['data_density']['score'] >= 80, f"Data density low: {result['data_density']['score']}"
# Table test should pass
assert result['table_test']['has_tables'], "Table not detected!"

print('  PASSED: b2b_content_auditor 11 checks functional, good content scores well')

# ===================================================================
# TEST 4: information_gain_analyzer — Mode B
# ===================================================================
print('\n--- Test 4: information_gain_analyzer ---')
from data_sources.modules.information_gain_analyzer import analyze_information_gain

ig = analyze_information_gain(good)
assert ig['mode'] == 'heuristic_estimate', "Should default to Mode B"
assert 0 <= ig['overall_score'] <= 100, "Score out of range"
assert ig['information_gain_level'] in ('high', 'moderate', 'low', 'zero')
print(f'  Mode: {ig["mode"]}, Score: {ig["overall_score"]}, Level: {ig["information_gain_level"]}')
print(f'  Factors: anchors={ig["heuristic_factors"]["technical_anchor_count"]}, data={ig["heuristic_factors"]["data_point_count"]}, entities={ig["heuristic_factors"]["named_entity_count"]}, b2b_div={ig["heuristic_factors"]["b2b_vocabulary_diversity"]}')
print('  PASSED: information_gain_analyzer functional')

# ===================================================================
# TEST 5: Full pipeline — B2B audit + IG + SEO rating
# ===================================================================
print('\n--- Test 5: Full pipeline integration ---')
b2b = audit_b2b_content(good, article_type='oem_core')
ig = analyze_information_gain(good)
seo = rate_seo_quality(
    content=good,
    meta_title='140W GaN Charger OEM Manufacturer: B2B Sourcing Guide 2026',
    meta_description='Complete B2B guide for 140W GaN charger OEM manufacturing. MOQ 500, FOB Shenzhen pricing, CE/GS/UL certification, factory audit checklist.',
    primary_keyword='GaN charger OEM',
    b2b_audit_score=b2b['overall_score'],
    information_gain_score=ig['overall_score'],
)
print(f'  B2B Audit: {b2b["overall_score"]} + IG: {ig["overall_score"]} -> SEO: {seo["overall_score"]}')
print(f'  Total categories: {len(seo["category_scores"])}')
print(f'  publishing_ready: {seo["publishing_ready"]}')
assert len(seo['category_scores']) == 8, "Full pipeline should have 8 categories"
print('  PASSED: Full pipeline integration')

# ===================================================================
# TEST 6: Edge cases — empty content, no headings
# ===================================================================
print('\n--- Test 6: Edge cases ---')
empty_result = audit_b2b_content('# Empty\n\nThis is too short.')
# Should handle gracefully — many N/A scores, no crashes
assert 'overall_score' in empty_result, "Empty content should still return overall_score"
print(f'  Empty content score: {empty_result["overall_score"]}')

# Content with no H2s
no_h2 = audit_b2b_content('# Title\n\nJust a paragraph with some OEM factory content here. More OEM manufacturer text for testing B2B signal detection.')
assert no_h2['h2_b2b_density']['score'] is None, "No H2s should return N/A, not crash"
print(f'  No-H2 content: H2 density={no_h2["h2_b2b_density"]["score"]} (expected N/A)')

print('  PASSED: Edge cases handled gracefully')

# ===================================================================
# FINAL
# ===================================================================
print()
print('=' * 60)
print('  ALL 6 TESTS PASSED — No regression, B2B logic sound')
print('=' * 60)
