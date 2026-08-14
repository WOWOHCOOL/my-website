#!/usr/bin/env python3
"""GEO Citability quick analyzer for a single page."""
import sys, re, json

def analyze_page(html):
    body_match = re.search(r'<article class="py-12">(.*?)</article>', html, re.DOTALL)
    if not body_match:
        return {"error": "No article content found"}

    content = body_match.group(1)
    total_words = len(re.sub(r'<[^>]+>', ' ', content).split())

    # Find all H2 and H3 headings
    headings = []
    for m in re.finditer(r'<(h[23])(?:\s[^>]*)?>(.*?)</\1>', content, re.DOTALL):
        text = re.sub(r'<[^>]+>', '', m.group(2)).strip()
        headings.append({'tag': m.group(1), 'text': text, 'pos': m.start()})

    # Split into H2 blocks
    h2_positions = [h for h in headings if h['tag'] == 'h2']
    blocks = []

    for idx, h2 in enumerate(h2_positions):
        start = h2['pos']
        end = h2_positions[idx+1]['pos'] if idx+1 < len(h2_positions) else len(content)
        block_content = content[start:end]

        clean = re.sub(r'<script[^>]*>.*?</script>', ' ', block_content, flags=re.DOTALL)
        clean = re.sub(r'<svg[^>]*>.*?</svg>', ' ', clean, flags=re.DOTALL)
        clean = re.sub(r'<[^>]+>', ' ', clean)
        clean = re.sub(r'\s+', ' ', clean).strip()
        words = len(clean.split()) if clean else 0

        # Count statistics (numbers with units, percentages, money)
        stats = 0
        stats += len(re.findall(r'\d+[\.,]?\d*\s*[%$€]', clean))
        stats += len(re.findall(r'\d+\s*(?:jours|semaines|mois|ans|unités|pièces|kg|m³|USD|EUR|RMB|CNY)', clean))
        stats += len(re.findall(r'(?:0\s*%|2[05]\s*%|[1-9]\d?\s*%)', clean))

        # Check definition pattern in first 100 chars
        has_def = bool(re.search(r'(est|signifie|désigne|correspond|s\'applique|relèvent|bénéficient|sont)\s', clean[:120]))

        # Check if first 60 words are self-contained
        first60 = ' '.join(clean.split()[:60]).lower()
        self_cont = not bool(re.search(r'^(ce|cette|ces|il|elle|ils|elles|cela|ça|voici|pour|dans|à|au|aux)\s', first60))

        # Count lists and tables
        lc = len(re.findall(r'<(?:ul|ol)[^>]*>', block_content))
        tc = len(re.findall(r'<table[^>]*>', block_content))

        blocks.append({
            'heading': h2['text'][:100],
            'words': words,
            'stats': stats,
            'has_def': has_def,
            'self_cont': self_cont,
            'lists': lc,
            'tables': tc,
            'first': clean[:180] if clean else ''
        })

    # Score each block
    for b in blocks:
        w = max(b['words'], 1)
        # Answer Block Quality (30%)
        ans = 100 if b['has_def'] else 60
        ans += 10 if len(b['first'].split()) <= 60 else -10

        # Self-Containment (25%)
        sc = 100 if b['self_cont'] else 50

        # Structural (20%)
        struct = 60
        struct += min(b['lists'] * 10, 20)
        struct += min(b['tables'] * 10, 20)

        # Stats density (15%)
        spw = b['stats'] / max(w, 1) * 500
        stat_score = min(spw * 20, 100)

        # Uniqueness (10%) - estimate based on presence of factory data signals
        unique_signals = len(re.findall(r'(WOWOHCOOL|Shenzhen|usine|ISO 9001|OEM|usine|fabrique)', b['first'][:180]))
        unique = min(unique_signals * 20, 100)

        b['scores'] = {
            'answer': min(ans, 100),
            'self_contain': min(sc, 100),
            'structure': min(struct, 100),
            'stats_density': min(stat_score, 100),
            'uniqueness': min(unique, 100)
        }
        b['overall'] = round(
            b['scores']['answer'] * 0.30 +
            b['scores']['self_contain'] * 0.25 +
            b['scores']['structure'] * 0.20 +
            b['scores']['stats_density'] * 0.15 +
            b['scores']['uniqueness'] * 0.10
        )

    # Page-level averages
    if blocks:
        avg_answer = sum(b['scores']['answer'] for b in blocks) / len(blocks)
        avg_self = sum(b['scores']['self_contain'] for b in blocks) / len(blocks)
        avg_struct = sum(b['scores']['structure'] for b in blocks) / len(blocks)
        avg_stats = sum(b['scores']['stats_density'] for b in blocks) / len(blocks)
        avg_unique = sum(b['scores']['uniqueness'] for b in blocks) / len(blocks)
        overall = round(avg_answer * 0.30 + avg_self * 0.25 + avg_struct * 0.20 + avg_stats * 0.15 + avg_unique * 0.10)
        coverage = sum(1 for b in blocks if b['overall'] >= 70) / len(blocks) * 100
    else:
        avg_answer = avg_self = avg_struct = avg_stats = avg_unique = overall = coverage = 0

    return {
        'total_words': total_words,
        'blocks': blocks,
        'averages': {
            'answer': round(avg_answer),
            'self_contain': round(avg_self),
            'structure': round(avg_struct),
            'stats_density': round(avg_stats),
            'uniqueness': round(avg_unique)
        },
        'overall': overall,
        'coverage': round(coverage)
    }

if __name__ == '__main__':
    if len(sys.argv) > 1:
        with open(sys.argv[1], 'r', encoding='utf-8') as f:
            html = f.read()
    else:
        html = sys.stdin.read()
    result = analyze_page(html)
    print(json.dumps(result, indent=2, ensure_ascii=False))
