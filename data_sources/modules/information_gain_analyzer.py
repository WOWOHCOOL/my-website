"""
Information Gain Analyzer — 2026 Google B2B SEO Core Patent

Compares an article's vocabulary, entities, and data points against
SERP top 5 competitors to calculate the Information Gain score.

Google's Information Gain patent (2022, updated 2024-2026) compares
your article's content against the top 5 ranking pages. If your article
is just rewording what already exists, it is classified as "zero
information gain" and suppressed in rankings.

Two operational modes:
  Mode A (SERP Comparison): Requires competitor full-text content.
      Computes exact vocabulary/entity/data-point overlap. PRECISE.
  Mode B (Heuristic Estimate): Works on article content alone.
      Scores based on technical anchors, data density, named entities,
      and B2B vocabulary diversity. APPROXIMATE.
"""

import re
import sys
from typing import Dict, List, Optional, Any, Set
from collections import Counter


# ── Stop Words (English) ──

STOP_WORDS: Set[str] = {
    'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'shall',
    'should', 'may', 'might', 'must', 'can', 'could', 'i', 'you', 'he',
    'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them', 'my',
    'your', 'his', 'its', 'our', 'their', 'mine', 'yours', 'hers', 'ours',
    'theirs', 'this', 'that', 'these', 'those', 'and', 'but', 'or', 'nor',
    'for', 'so', 'yet', 'with', 'from', 'about', 'into', 'through', 'during',
    'before', 'after', 'above', 'below', 'between', 'out', 'off', 'over',
    'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when',
    'where', 'why', 'how', 'all', 'each', 'every', 'both', 'few', 'more',
    'most', 'other', 'some', 'such', 'only', 'own', 'same', 'than', 'too',
    'very', 'just', 'now', 'also', 'not', 'no', 'up', 'down', 'in', 'on',
    'at', 'to', 'of', 'by', 'as', 'if', 'itself', 'what', 'which', 'who',
    'whom', 'any', 'anyone', 'anything', 'something', 'nothing', 'someone',
}

# ── Technical Anchor Terms (Industry-Specific High-Value Vocabulary) ──
# These are terms that signal genuine engineering/manufacturing expertise.

TECHNICAL_ANCHORS = [
    # Power electronics
    'ripple noise', 'creepage distance', 'clearance distance',
    'aging test', 'burn-in test', 'full-load', 'no-load',
    'switching frequency', 'duty cycle', 'gate driver',
    'synchronous rectification', 'zero voltage switching',
    'power factor correction', 'PFC', 'totem pole',
    'gallium nitride', 'GaN HEMT', 'silicon carbide', 'SiC MOSFET',
    'wide bandgap', 'WBG semiconductor',
    # Battery & power bank
    'energy density', 'Wh/kg', 'cycle life', 'C-rate',
    'state of charge', 'SOC', 'depth of discharge', 'DOD',
    'battery management system', 'BMS', 'cell balancing',
    'lithium iron phosphate', 'LiFePO4', 'NMC', 'LCO',
    'semi-solid state', 'solid electrolyte',
    # Manufacturing & quality
    'BOM cost', 'bill of materials', 'PCBA', 'SMT line',
    'reflow soldering', 'wave soldering', 'AOI inspection',
    'AQL sampling', 'ISO 2859-1', 'first article inspection',
    'statistical process control', 'SPC', 'gage R&R',
    'capability index', 'Cpk', 'Ppk',
    # Charging standards
    'PD 3.1', 'PPS', 'Quick Charge 5', 'UFCS',
    'Qi2', 'MPP', 'magnetic power profile',
    # Supply chain
    'FOB Shenzhen', 'DDP Hamburg', 'landed cost',
    'incoterms', 'HS code', 'customs clearance',
    'bill of lading', 'certificate of origin',
]

# ── Standards & Named Entity Patterns ──

STANDARDS_ENTITY_RE = re.compile(
    r'\b(?:IEC|ISO|EN|UL|ANSI|IEEE|DIN|BS|GB|JIS|ETSI|SAE|IPC|JEDEC|MIL-STD)\s*\d+[-\d:]*\b'
)

NAMED_COMPANY_RE = re.compile(
    r'\b(?:Keysight|Tektronix|Fluke|Rohde\s*&?\s*Schwarz|Agilent|Keithley|'
    r'Hioki|Chroma|Yokogawa|National\s+Instruments|Anritsu|Rigol|Siglent|'
    r'Infineon|Navitas|GaN\s+Systems|EPC|Texas\s+Instruments|STMicroelectronics|'
    r'NXP|ON\s+Semi|Wolfspeed|Cree|Transphorm|Innoscience|Power\s+Integrations|'
    r'TÜV|SGS|Bureau\s+Veritas|Intertek|DEKRA|UL\s+Solutions)\b'
)

# Physical units for data point extraction
PRECISE_DATA_RE = re.compile(
    r'\d+\.?\d*\s*(?:°C|℃|mV|kV|kW|kWh|MHz|kHz|GHz|'
    r'Wh/kg|Wh|Ah|mAh|mm|cm|m|μm|nm|g|kg|W|A|V|Hz|Ω|'
    r'dB|sqm|m²|㎡|sq\.?\s*ft|€|¥|\$|%)',
    re.IGNORECASE
)

# B2B signal words (for vocabulary diversity scoring)
B2B_TERMS = {
    'oem', 'odm', 'manufacturer', 'factory', 'supplier', 'importer',
    'sourcing', 'moq', 'fob', 'b2b', 'procurement', 'wholesale',
    'bulk', 'supply chain', 'vendor', 'private label', 'compliance',
    'certification', 'lead time', 'production capacity', 'minimum order',
}


class InformationGainAnalyzer:
    """Analyze content uniqueness vs SERP competitors (Google Information Gain patent)."""

    def __init__(self):
        """Initialize analyzer with technical anchors and stop words."""
        self.technical_anchors_lower = [t.lower() for t in TECHNICAL_ANCHORS]

    # ── Public API ──

    def analyze(
        self,
        content: str,
        competitor_contents: Optional[List[str]] = None,
        competitor_urls: Optional[List[str]] = None,
    ) -> Dict[str, Any]:
        """
        Analyze information gain of article content.

        Args:
            content: Full article text content.
            competitor_contents: Optional list of SERP top 5 full-text contents.
            competitor_urls: Optional list of URLs corresponding to competitor_contents.

        Returns:
            Dict with overall_score, mode, information_gain_level, and detailed metrics.
        """
        if competitor_contents:
            return self._mode_a_compare(content, competitor_contents, competitor_urls)
        else:
            return self._mode_b_estimate(content)

    # ── Mode A: SERP Comparison ──

    def _mode_a_compare(
        self,
        content: str,
        competitors: List[str],
        urls: Optional[List[str]] = None,
    ) -> Dict[str, Any]:
        """Compare article vocabulary against SERP top 5 for exact overlap."""
        article_terms = self._extract_significant_terms(content)
        article_entities = self._extract_named_entities(content)
        article_data_points = self._extract_data_points(content)

        if not article_terms:
            return self._mode_b_estimate(content)  # fallback

        # Analyze each competitor
        overlap_results = []
        all_serp_terms: Set[str] = set()
        all_serp_entities: Set[str] = set()
        all_serp_data: Set[str] = set()

        for i, comp_content in enumerate(competitors):
            comp_terms = self._extract_significant_terms(comp_content)
            comp_entities = self._extract_named_entities(comp_content)
            comp_data = self._extract_data_points(comp_content)

            all_serp_terms.update(comp_terms)
            all_serp_entities.update(comp_entities)
            all_serp_data.update(comp_data)

            # Jaccard similarity for terms
            if article_terms or comp_terms:
                intersection = len(article_terms & comp_terms)
                union = len(article_terms | comp_terms)
                jaccard = round(intersection / union, 3) if union > 0 else 0.0
            else:
                jaccard = 0.0

            overlap_results.append({
                'index': i,
                'url': urls[i] if urls and i < len(urls) else f'competitor_{i+1}',
                'jaccard_similarity': jaccard,
            })

        # Calculate aggregated metrics
        unique_terms = article_terms - all_serp_terms
        unique_entities = article_entities - all_serp_entities
        unique_data = article_data - all_serp_data

        total_terms = len(article_terms)
        unique_term_ratio = round(len(unique_terms) / max(total_terms, 1), 3)

        total_entities = len(article_entities)
        unique_entity_ratio = round(len(unique_entities) / max(total_entities, 1), 3)

        avg_jaccard = round(
            sum(r['jaccard_similarity'] for r in overlap_results) / max(len(overlap_results), 1), 3
        )

        # Score: unique term ratio * 70 + unique entity ratio * 20 + unique data bonus * 10
        unique_data_ratio = round(len(unique_data) / max(len(article_data_points), 1), 3) if article_data_points else 0
        score = round(
            (unique_term_ratio * 70) +
            (unique_entity_ratio * 20) +
            (unique_data_ratio * 10)
        )
        score = max(0, min(100, score))

        # Information gain level
        if score >= 70:
            level = 'high'
        elif score >= 40:
            level = 'moderate'
        elif score >= 20:
            level = 'low'
        else:
            level = 'zero'

        recommendations = self._generate_mode_a_recommendations(
            level, unique_term_ratio, unique_entity_ratio, avg_jaccard,
            list(unique_terms)[:10], list(unique_entities)[:5]
        )

        return {
            'overall_score': score,
            'mode': 'serp_comparison',
            'information_gain_level': level,
            'vocabulary_overlap': {
                'avg_jaccard_similarity': avg_jaccard,
                'unique_term_ratio': unique_term_ratio,
                'unique_entity_ratio': unique_entity_ratio,
                'overlap_per_competitor': overlap_results,
                'article_total_terms': total_terms,
                'serp_total_terms': len(all_serp_terms),
                'unique_terms_sample': list(unique_terms)[:15],
                'unique_entities_sample': list(unique_entities)[:10],
                'unique_data_points_sample': list(unique_data)[:5],
            },
            'recommendations': recommendations,
        }

    # ── Mode B: Heuristic Estimate ──

    def _mode_b_estimate(self, content: str) -> Dict[str, Any]:
        """Estimate information gain from article content alone (no SERP data)."""
        body = self._strip_metadata(content)
        word_count = len(body.split())

        if word_count == 0:
            return {
                'overall_score': 0,
                'mode': 'heuristic_estimate',
                'information_gain_level': 'zero',
                'heuristic_factors': {},
                'recommendations': ['Empty content — cannot assess information gain.'],
            }

        # Factor 1: Technical anchor terms (40% weight)
        anchor_count = 0
        anchors_found = []
        body_lower = body.lower()
        for anchor in self.technical_anchors_lower:
            if anchor in body_lower:
                anchor_count += 1
                anchors_found.append(anchor)
        anchor_per_1000 = round((anchor_count / word_count) * 1000, 1)
        # Score: >= 8 per 1000 = 100, linear
        anchor_score = min(100, round((anchor_per_1000 / 8) * 100))

        # Factor 2: Data point density (30% weight)
        data_points = PRECISE_DATA_RE.findall(body)
        data_per_1000 = round((len(data_points) / word_count) * 1000, 1)
        data_score = min(100, round((data_per_1000 / 5) * 100))

        # Factor 3: Named entities (20% weight)
        standards = STANDARDS_ENTITY_RE.findall(body)
        companies = NAMED_COMPANY_RE.findall(body)
        entity_count = len(standards) + len(companies)
        entity_per_1000 = round((entity_count / word_count) * 1000, 1)
        entity_score = min(100, round((entity_per_1000 / 3) * 100))

        # Factor 4: B2B vocabulary diversity (10% weight)
        b2b_found = {t for t in B2B_TERMS if t in body_lower}
        b2b_diversity = len(b2b_found)
        b2b_score = min(100, b2b_diversity * 10)  # 10 unique B2B terms = 100

        # Weighted composite
        score = round(
            anchor_score * 0.40 +
            data_score * 0.30 +
            entity_score * 0.20 +
            b2b_score * 0.10
        )
        score = max(0, min(100, score))

        # Information gain level
        if score >= 70:
            level = 'high'
        elif score >= 40:
            level = 'moderate'
        elif score >= 20:
            level = 'low'
        else:
            level = 'zero'

        recommendations = self._generate_mode_b_recommendations(
            level, anchor_count, len(data_points), entity_count, b2b_diversity,
            anchors_found, list(b2b_found)
        )

        return {
            'overall_score': score,
            'mode': 'heuristic_estimate',
            'information_gain_level': level,
            'heuristic_factors': {
                'technical_anchor_count': anchor_count,
                'technical_anchor_score': anchor_score,
                'anchors_found': anchors_found[:10],
                'data_point_count': len(data_points),
                'data_point_score': data_score,
                'named_entity_count': entity_count,
                'named_entity_score': entity_score,
                'b2b_vocabulary_diversity': b2b_diversity,
                'b2b_score': b2b_score,
                'b2b_terms_found': list(b2b_found),
                'word_count': word_count,
            },
            'recommendations': recommendations,
        }

    # ── Text Extraction Helpers ──

    def _extract_significant_terms(self, text: str) -> Set[str]:
        """Extract significant lowercase terms (2+ chars, non-stopword)."""
        # Tokenize: split on non-alpha, lowercase, filter
        words = re.findall(r'[a-z]{2,}', text.lower())
        # Keep only non-stopwords
        return {w for w in words if w not in STOP_WORDS}

    def _extract_named_entities(self, text: str) -> Set[str]:
        """Extract named entities: capitalized multi-word phrases, standards, companies."""
        entities: Set[str] = set()

        # Standards references
        for m in STANDARDS_ENTITY_RE.finditer(text):
            entities.add(m.group())

        # Named companies
        for m in NAMED_COMPANY_RE.finditer(text):
            entities.add(m.group())

        # Capitalized multi-word phrases (2-4 words)
        cap_phrases = re.findall(
            r'(?<![.\n])\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3})\b',
            text
        )
        for phrase in cap_phrases:
            if len(phrase) > 10:  # filter very short
                entities.add(phrase.lower())

        return entities

    def _extract_data_points(self, text: str) -> Set[str]:
        """Extract precise numeric data points with units."""
        matches = PRECISE_DATA_RE.findall(text)
        return {m.lower() if isinstance(m, str) else str(m).lower() for m in matches}

    def _strip_metadata(self, content: str) -> str:
        """Remove YAML/metadata blocks from content."""
        content = re.sub(r'^---\s*\n.*?\n---\s*\n', '', content, flags=re.DOTALL)
        content = re.sub(r'^\*\*[^*]+\*\*\s*:\s*.+$', '', content, flags=re.MULTILINE)
        content = re.sub(r'<!--.*?-->', '', content, flags=re.DOTALL)
        return content.strip()

    # ── Recommendation Generators ──

    def _generate_mode_a_recommendations(
        self, level: str, term_ratio: float, entity_ratio: float,
        avg_jaccard: float, unique_terms: List[str], unique_entities: List[str],
    ) -> List[str]:
        """Generate recommendations based on Mode A comparison results."""
        recs = []

        if level == 'zero':
            recs.append(
                'CRITICAL: Article is near-identical to SERP top 5. '
                'Google will classify this as zero information gain and suppress it. '
                'Add exclusive factory test data, unique supply chain insights, '
                'or original engineering measurements not found in competitor pages.'
            )
        elif level == 'low':
            recs.append(
                f'Low information gain: {avg_jaccard:.0%} average vocabulary overlap with SERP. '
                'Add proprietary data: BOM cost breakdowns, thermal test results, '
                'certification audit details, or factory-floor observations.'
            )
        elif level == 'moderate':
            recs.append(
                f'Moderate information gain. Consider adding more unique data points '
                'and industry-specific terminology to differentiate further from competitors.'
            )

        if term_ratio < 0.2 and level != 'zero':
            recs.append(
                f'Only {term_ratio:.0%} of terms are unique to this article. '
                'Introduce exclusive technical vocabulary competitors don\'t use.'
            )

        if entity_ratio < 0.3:
            recs.append(
                'Low entity uniqueness. '
                'Reference specific standards (IEC/ISO/EN numbers), '
                'test equipment (Keysight/Fluke models), or named suppliers.'
            )

        if unique_terms:
            recs.append(
                f'Unique advantages detected: {", ".join(unique_terms[:5])}. '
                'Expand on these differentiators.'
            )

        return recs

    def _generate_mode_b_recommendations(
        self, level: str, anchor_count: int, data_count: int,
        entity_count: int, b2b_diversity: int,
        anchors_found: List[str], b2b_terms: List[str],
    ) -> List[str]:
        """Generate recommendations based on Mode B heuristic analysis."""
        recs = []

        if level == 'zero' or level == 'low':
            recs.append(
                'Low estimated information gain. This article likely lacks '
                'sufficient original data to differentiate from SERP competitors. '
                'Add: precise measurements with units, named equipment references, '
                'standards citations (IEC/ISO/EN), and exclusive factory-floor observations.'
            )

        if anchor_count < 5:
            recs.append(
                f'Only {anchor_count} technical anchor terms detected. '
                'Target >=10: use domain-specific vocabulary like "PCBA ripple noise", '
                '"creepage distance", "BOM cost breakdown", "aging test protocol".'
            )
        elif anchors_found:
            recs.append(
                f'Good technical depth: {anchor_count} anchor terms found '
                f'(e.g., {", ".join(anchors_found[:3])}). '
                'Consider adding even more specialized terminology.'
            )

        if data_count < 10:
            recs.append(
                f'Low data point density: only {data_count} precise measurements found. '
                'Add specific numbers with units (°C, mV, kHz, mm, €, A, W) '
                'throughout the article — these are credibility anchors for B2B readers.'
            )

        if entity_count < 3:
            recs.append(
                'Few named entities (standards, equipment, brands) detected. '
                'Reference specific IEC/ISO/EN standards, test equipment models, '
                'or certification bodies to strengthen E-E-A-T signals.'
            )

        if b2b_diversity < 4:
            recs.append(
                f'B2B vocabulary diversity is low ({b2b_diversity} unique terms). '
                'Use a wider range of procurement/manufacturing terminology: '
                'OEM, ODM, MOQ, FOB, supplier, sourcing, procurement, compliance, lead time.'
            )

        if level in ('high', 'moderate') and not recs:
            recs.append(
                'Article shows strong estimated information gain. '
                'To verify precisely, run Mode A with SERP top 5 competitor content.'
            )

        return recs


# ── Module-level convenience function ──

def analyze_information_gain(
    content: str,
    competitor_contents: Optional[List[str]] = None,
    competitor_urls: Optional[List[str]] = None,
) -> Dict[str, Any]:
    """
    Convenience function: analyze information gain of article content.

    Args:
        content: Full article text content.
        competitor_contents: Optional SERP top 5 full-text contents (enables Mode A).
        competitor_urls: Optional URLs for each competitor.

    Returns:
        Dict with overall_score, mode, information_gain_level, and detailed metrics.
    """
    analyzer = InformationGainAnalyzer()
    return analyzer.analyze(content, competitor_contents, competitor_urls)


# ── CLI Entry Point ──

def _format_report(result: Dict[str, Any]) -> str:
    """Format analysis results as a readable text report."""
    lines = []
    lines.append("=" * 60)
    lines.append("  INFORMATION GAIN ANALYSIS")
    lines.append("=" * 60)
    lines.append(f"  Score: {result['overall_score']}/100")
    lines.append(f"  Mode: {result['mode']}")
    lines.append(f"  Gain Level: {result['information_gain_level'].upper()}")
    lines.append("")

    if result['mode'] == 'serp_comparison':
        overlap = result.get('vocabulary_overlap', {})
        lines.append(f"  Avg Jaccard Similarity: {overlap.get('avg_jaccard_similarity', 'N/A')}")
        lines.append(f"  Unique Term Ratio: {overlap.get('unique_term_ratio', 'N/A')}")
        lines.append(f"  Unique Entity Ratio: {overlap.get('unique_entity_ratio', 'N/A')}")
        lines.append(f"  Article Terms: {overlap.get('article_total_terms', 0)}")
        lines.append(f"  SERP Terms Combined: {overlap.get('serp_total_terms', 0)}")
    else:
        factors = result.get('heuristic_factors', {})
        lines.append(f"  Technical Anchors: {factors.get('technical_anchor_count', 0)} (score: {factors.get('technical_anchor_score', 0)})")
        lines.append(f"  Data Points: {factors.get('data_point_count', 0)} (score: {factors.get('data_point_score', 0)})")
        lines.append(f"  Named Entities: {factors.get('named_entity_count', 0)} (score: {factors.get('named_entity_score', 0)})")
        lines.append(f"  B2B Vocabulary Diversity: {factors.get('b2b_vocabulary_diversity', 0)} (score: {factors.get('b2b_score', 0)})")
        lines.append(f"  Word Count: {factors.get('word_count', 0)}")

    lines.append("")
    lines.append("-" * 60)
    if result.get('recommendations'):
        lines.append("  RECOMMENDATIONS:")
        for rec in result['recommendations']:
            lines.append(f"    💡 {rec}")

    lines.append("=" * 60)
    return '\n'.join(lines)


def main():
    """CLI entry point: analyze information gain of a markdown file."""
    if sys.platform == 'win32':
        import io
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

    if len(sys.argv) < 2:
        print("Usage: python information_gain_analyzer.py <article.md> [competitor1.md ...]")
        print("  Without competitor files: Mode B (heuristic estimate)")
        print("  With competitor files: Mode A (SERP comparison)")
        sys.exit(1)

    file_path = sys.argv[1]
    competitor_paths = sys.argv[2:] if len(sys.argv) > 2 else []

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    competitor_contents = None
    if competitor_paths:
        competitor_contents = []
        for cp in competitor_paths:
            with open(cp, 'r', encoding='utf-8') as f:
                competitor_contents.append(f.read())

    result = analyze_information_gain(content, competitor_contents)
    print(_format_report(result))


if __name__ == "__main__":
    main()
