"""
B2B Content Auditor — 2026 Google B2B SEO Standards Compliance

Performs 15 automated checks against Google's 2026 B2B blog quality standards:
  1. Opening Density — first 3 sentences must deliver core conclusion (no fluff preamble)
  2. H3 Answer Length — 100-150 char direct answer after each H3/H4
  3. H2 B2B Signal Density — tiered B2B signal word density in H2 headings
  4. First-Hand Data Density — ≥3 precise measurements + engineering units per 1000 words (staged: ≥3=100, 2-2.9=70, 1-1.9=40, <1=10)
  5. Table Test — technical parameters must use markdown tables
  6. Stock Photo Detection — flag suspicious image URLs
  7. FAQ B2B Language — FAQ questions must use buyer/procurement language
  8. Author E-E-A-T Audit — byline, credentials, LinkedIn, author page
  9. TL;DR Block Detection — mandatory Key Takeaways block after H1 (NEW)
  10. Vague Heading Detection — flag label-style H2/H3, enforce conclusion-style (NEW)
  11. Weak CTA Detection — flag ineffective B2B CTAs, suggest value-continuation (NEW)
  12. Heading Hierarchy Validation — detect skipped levels (H1→H3), enforce pyramid structure (NEW)
  13. URL Quality Check — flag underscores, uppercase, dates, stop words in URL slug (NEW)
  14. Schema Validation — JSON-LD syntax, required fields (author.sameAs, publisher.logo, mainEntityOfPage.@id), trailing-slash consistency with canonical URL (NEW)
  15. Cross-Reference Consistency — verify TL;DR, body, and FAQ numbers match (Rule 8) (NEW)

All checks return 0-100 scores. Composite score is equal-weighted average.
"""

import re
import sys
from typing import Dict, List, Optional, Any, Tuple

# Try to import njk preprocessor (optional — only needed for .njk files)
try:
    from .njk_preprocessor import preprocess as njk_preprocess
    from .njk_preprocessor import extract_meta as njk_extract_meta
    from .njk_preprocessor import extract_links as njk_extract_links
    from .njk_preprocessor import is_njk
except ImportError:
    try:
        from njk_preprocessor import preprocess as njk_preprocess
        from njk_preprocessor import extract_meta as njk_extract_meta
        from njk_preprocessor import extract_links as njk_extract_links
        from njk_preprocessor import is_njk
    except ImportError:
        # Fallback: njk_preprocessor not available
        def njk_preprocess(c): return c
        def njk_extract_meta(c): return {}
        def njk_extract_links(c): return {}
        def is_njk(c): return False

# Multi-language keyword support
try:
    from .b2b_i18n_keywords import B2BI18n, detect_language
except ImportError:
    try:
        from b2b_i18n_keywords import B2BI18n, detect_language
    except ImportError:
        B2BI18n = None  # type: ignore
        def detect_language(c, m=None): return 'en'

# Factory data canonical checker (Check 16)
try:
    from .factory_data_canonical import check_factory_data, FACTORY_RULES
except ImportError:
    try:
        from factory_data_canonical import check_factory_data, FACTORY_RULES
    except ImportError:
        def check_factory_data(c): return {'score': None, 'violations': [], 'recommendations': []}
        FACTORY_RULES = []

# ── B2B Signal Words (from b2b-blog-quality-standards-2026.md Section II) ──

B2B_SIGNAL_WORDS = [
    'OEM', 'ODM', 'manufacturer', 'factory', 'supplier', 'importer',
    'sourcing', 'MOQ', 'FOB', 'B2B', 'procurement', 'wholesale',
    'bulk', 'supply chain', 'vendor',
    # International / Spanish / German / French B2B terms
    'BOM', 'fabricante', 'fabricación', 'importador', 'comprador',
    'compradores', 'aduana', 'aduanero', 'arancel', 'aranceles',
    'certificación', 'certificaciones', 'exportación', 'logística',
    'Hersteller', 'Importeur', 'Einkäufer', 'Zertifizierung',
    'fournisseur', 'importateur', 'acheteur', 'certification',
]

# ── Engineering Units (for first-hand data detection) ──

ENGINEERING_UNITS = [
    '°C', '℃', 'mV', 'kV', 'kW', 'kWh', 'MHz', 'kHz', 'GHz',
    'Wh/kg', 'Wh', 'Ah', 'mAh',
    'mm', 'cm', 'm', 'μm', 'nm',
    'g', 'kg', 'ton',
    'W', 'A', 'V', 'Hz', 'Ω', 'dB',
    'sqm', 'm²', '㎡', 'sq.ft',
    '€', '¥', '\\$',
]

# Build a combined regex: \d+\.?\d*\s*(unit1|unit2|...)
_units_pattern = '|'.join(re.escape(u) for u in ENGINEERING_UNITS)
PRECISE_MEASUREMENT_RE = re.compile(
    r'\d+\.?\d*\s*(' + _units_pattern + r')',
    re.IGNORECASE
)

# ── Opening Fluff Patterns ──
# These are AI-generated preamble signals. Any match in the first 3 sentences = -30.
# B2B readers recognize these instantly as "SEO filler" and bounce.

OPENING_FLUFF_PATTERNS = [
    re.compile(r"in today'?s\s+(?:digital|modern|fast-paced|rapidly\s+evolving)", re.IGNORECASE),
    re.compile(r'\bwhen it comes to\b', re.IGNORECASE),
    re.compile(r"\blet'?s\s+dive\s+(?:in|into)\b", re.IGNORECASE),
    re.compile(r'\bin the world of\b', re.IGNORECASE),
    re.compile(r'\bwith the (?:rise|advent|growth|increasing)\b', re.IGNORECASE),
    re.compile(r"\bin today'?s\s+(?:fast-paced|competitive|global)\s+(?:world|market|landscape|economy)\b", re.IGNORECASE),
    re.compile(r'\bhas (?:revolutionized|transformed|changed)\s+the\s+way\b', re.IGNORECASE),
    re.compile(r'\bmore\s+important\s+than\s+ever\b', re.IGNORECASE),
]

# ── Conclusion Signals ──
# The first 3 sentences must contain at least one of these to score 100.
# 5 categories: numbers with units, B2B signal words, standards references,
# first-hand experience markers, and procurement/import context terms.

CONCLUSION_SIGNALS = [
    # Precise measurements with engineering units or currency
    re.compile(r'\d+\.?\d*\s*(?:°C|℃|mV|kV|kW|kWh|MHz|kHz|GHz|Wh/kg|Wh|Ah|mAh|mm|cm|m|g|kg|W|A|V|Hz|€|¥|\$|%)'),
    # Action verbs that signal a core finding is being stated
    re.compile(r'\b(?:reduces?|achieves?|delivers?|enables?|produces?|eliminates?|prevents?)\b', re.IGNORECASE),
    # Standards and certification references
    re.compile(r'\b(?:IEC|ISO|EN|UL|CE|RoHS|REACH|FCC|GS)\s*\d+'),
    # B2B signal words (same set as H2 density check)
    re.compile(r'\b(?:OEM|ODM|manufacturer|factory|supplier|importer|'
               r'sourcing|MOQ|FOB|B2B|procurement|wholesale|bulk|supply\s+chain|vendor)\b'),
    # First-hand experience markers
    re.compile(r'\b(?:we|our)\s+(?:tested|verified|measured|found|discovered|achieved)\b', re.IGNORECASE),
    # Procurement/import context markers (B2B-specific)
    re.compile(r'\b(?:tariff|landed\s+cost|customs|HS\s+code|freight|shipment|import|export)\b', re.IGNORECASE),
]

# ── Stock Photo Domains ──

STOCK_PHOTO_DOMAINS = [
    'unsplash.com', 'unsplash', 'pexels.com', 'pexels', 'pixabay.com', 'pixabay',
    'shutterstock.com', 'shutterstock', 'gettyimages', 'getty', 'istockphoto',
    'freepik.com', 'freepik', 'depositphotos', 'adobe.stock', 'adobestock',
    '123rf.com', '123rf', 'alamy.com', 'alamy', 'dreamstime',
]

STOCK_FILENAME_PATTERNS = [
    re.compile(r'\b(?:handshake|shaking.?hands)\b', re.IGNORECASE),
    re.compile(r'\b(?:business.?meeting|boardroom|conference.?room)\b', re.IGNORECASE),
    re.compile(r'\b(?:smiling|suits?|corporate|teamwork)\b', re.IGNORECASE),
    re.compile(r'\bphoto[-\s]?\d{4,}\b', re.IGNORECASE),
    re.compile(r'\bstock[-\s]?photo\b', re.IGNORECASE),
]

# ── Consumer Language Signals (vs B2B Buyer Language) ──

CONSUMER_LANGUAGE = [
    re.compile(r'\b(?:which|what)\s+(?:is\s+the\s+)?best\b', re.IGNORECASE),
    re.compile(r'\btop\s+\d+\b', re.IGNORECASE),
    re.compile(r'\bcheap(?:est)?\b', re.IGNORECASE),
    re.compile(r'\bgood\s+(?:choice|option|deal|value)\b', re.IGNORECASE),
    re.compile(r'\b(?:buy|buying)\s+guide\b', re.IGNORECASE),
    re.compile(r'\breview\b(?!\s+(?:process|procedure|protocol|certification|standard|compliance))', re.IGNORECASE),
    re.compile(r'\b(?:which\s+one|for\s+(?:home|personal|family))\b', re.IGNORECASE),
]

B2B_BUYER_LANGUAGE = [
    re.compile(r'\b(?:MOQ|minimum\s+order)\b', re.IGNORECASE),
    re.compile(r'\b(?:OEM|ODM|private\s+label)\b', re.IGNORECASE),
    re.compile(r'\b(?:FOB|CIF|DDP|EXW)\b', re.IGNORECASE),
    re.compile(r'\b(?:certifications?|compliance|standards?)\b', re.IGNORECASE),
    re.compile(r'\b(?:lead\s+time|production\s+time|turnaround)\b', re.IGNORECASE),
    re.compile(r'\b(?:minimum\s+order|bulk\s+order|wholesale)\b', re.IGNORECASE),
    re.compile(r'\b(?:importer|procurement|sourcing|supply\s+chain)\b', re.IGNORECASE),
    # Procurement action terms (B2B context)
    re.compile(r'\b(?:factory|manufacturer|supplier)\s+(?:audit|verif|inspection|selection|evaluat|legitimate)\b', re.IGNORECASE),
    re.compile(r'\b(?:verify|audit|inspect|evaluate|select)\b.{0,30}\b(?:factory|manufacturer|supplier)\b', re.IGNORECASE),
    # QC/supply chain domain terms (B2B procurement context)
    re.compile(r'\b(?:defect\s+rate|burn[\s-]in|aging\s+test|AOI|SMT|QC\s+(?:equipment|documentation|process|compliance)|AQL)\b', re.IGNORECASE),
    # Shipping/logistics domain terms (B2B procurement context)
    re.compile(r'\b(?:freight|shipping|customs|landed\s+cost|incoterm|forwarder|container|bill\s+of\s+lading|air\s+waybill|DDP|FOB|FCL|LCL)\b', re.IGNORECASE),
    re.compile(r'\b(?:pricing|cost|quote)\s+(?:at|for|per)\b', re.IGNORECASE),
    re.compile(r'\b(?:WPC|Qi2|Qi\s*2)\b', re.IGNORECASE),
    re.compile(r'\b(?:third.?party)\s+(?:audit|inspection|test)\b', re.IGNORECASE),
    # Import/customs/tariff domain terms (B2B procurement context)
    re.compile(r'\b(?:import\s+duty|tariff|Section\s+301|Section\s+122|IEEPA|customs\s+duty|MFN|MPF|HMF)\b', re.IGNORECASE),
    re.compile(r'\bHS\s*(?:code)?\s*\d{4}\b', re.IGNORECASE),
    re.compile(r'\b(?:HS\s+code|HTSUS|classification|customs\s+clearance|customs\s+broker|import\s+documents?|import\s+compliance)\b', re.IGNORECASE),
    re.compile(r'\b(?:tariff\s+refund|IEEPA\s+refund|landed\s+cost|duty\s+stack)\b', re.IGNORECASE),
    re.compile(r'\b(?:import|importing)\s+(?:from|chargers?|power\s+banks?|electronics)\b', re.IGNORECASE),
    re.compile(r'\b(?:import\s+cost|total\s+landed|door.to.door)\b', re.IGNORECASE),
]

# ── Article Type Classification ──

OEM_CORE_TOPICS = [
    'oem vs odm', 'oem manufacturing', 'private label', 'manufacturer directory',
    'manufacturer comparison', 'factory selection', 'supplier audit',
    # Extended OEM/ODM core indicators
    'oem odm', 'odm guide', 'oem guide', 'oem/odm',
    'original equipment manufacturing', 'original design manufacturing',
    'oem vs', 'odm vs', 'choosing between oem',
]

PROCUREMENT_TOPICS = [
    'shipping', 'logistics', 'import', 'cost', 'how to choose', 'sourcing guide',
    'procurement', 'hotel', 'enterprise', 'qc guide', 'quality control',
    'factory verification', 'factory audit', 'supplier',
]

# ── Standards References (for named entity detection) ──

STANDARDS_REFERENCE_RE = re.compile(
    r'\b(?:IEC|ISO|EN|UL|ANSI|IEEE|DIN|BS|GB|JIS)\s*\d+[-\d:]*\b'
)

NAMED_EQUIPMENT_RE = re.compile(
    r'\b(?:Keysight|Tektronix|Fluke|Rohde\s*&?\s*Schwarz|Agilent|'
    r'Keithley|Hioki|Chroma|Yokogawa|National\s+Instruments|'
    r'Anritsu|Rigol|Siglent)\s+[A-Z0-9][\w-]*\b'
)

# ── TL;DR Detection Patterns ──

TLDR_KEYWORDS = [
    'TL;DR', 'TLDR', 'Key Takeaways', 'Key Takeaway',
    'At a Glance', 'In a Nutshell', 'Quick Summary',
    'Core Takeaways', 'Executive Summary', 'Bottom Line',
]

# ── Vague / Label-Style Heading Patterns ──
# These are headings that act as generic labels rather than conclusions.
# Flagged because they cause F-pattern readers to skip the section entirely.

VAGUE_HEADING_PATTERNS = [
    re.compile(r'^(?:Introduction|Overview|Background|Preface)$', re.IGNORECASE),
    re.compile(r'^(?:About|General)\s+(?:Overview|Information|Background)$', re.IGNORECASE),
    re.compile(r'^(?:Testing|Test)\s*(?:Process|Procedure|Method|Methods)?$', re.IGNORECASE),
    re.compile(r'^(?:Certification|Certifications|Certification\s+Info)$', re.IGNORECASE),
    re.compile(r'^(?:Product|Products|Our\s+Products?|Product\s+Line)$', re.IGNORECASE),
    re.compile(r'^(?:Service|Services|Our\s+Services?)$', re.IGNORECASE),
    re.compile(r'^(?:Feature|Features|Key\s+Features?)$', re.IGNORECASE),
    re.compile(r'^(?:Specification|Specifications|Specs|Technical\s+Specs?)$', re.IGNORECASE),
    re.compile(r'^(?:Conclusion|Summary|Final\s+Thoughts?)$', re.IGNORECASE),
    # FAQ headings are structural/semantic, not vague — they support FAQPage Schema extraction
    # re.compile(r'^(?:FAQ|FAQs|Frequently\s+Asked\s+Questions?)$', re.IGNORECASE),
    re.compile(r'^(?:Benefits?|Advantages?|Pros?)$', re.IGNORECASE),
    re.compile(r'^(?:Applications?|Use\s+Cases?|Usage)$', re.IGNORECASE),
    re.compile(r'^(?:Quality|Quality\s+Control|QC)$', re.IGNORECASE),
    re.compile(r'^(?:Manufacturing|Production)\s*(?:Process|Line)?$', re.IGNORECASE),
    re.compile(r'^(?:Pricing|Price|Cost|Costs?)$', re.IGNORECASE),
    re.compile(r'^(?:Shipping|Logistics|Delivery)$', re.IGNORECASE),
    re.compile(r'^(?:Warranty|Support|After.?\s*Sale)$', re.IGNORECASE),
]

# ── Weak / Ineffective B2B CTA Patterns ──
# These are CTAs that B2B buyers ignore because they're too aggressive,
# too vague, or consumer-logic.

WEAK_CTA_PATTERNS = [
    re.compile(r'\b(?:buy|purchase)\s+(?:now|today|here)\b', re.IGNORECASE),
    re.compile(r'\bclick\s+here\b', re.IGNORECASE),
    re.compile(r'\bcontact\s+us\s+(?:for|to\s+get)\s+more\s+information\b', re.IGNORECASE),
    re.compile(r'\bget\s+started\s+(?:today|now)\b', re.IGNORECASE),
    re.compile(r'\bsign\s+up\s+(?:today|now|here)\b', re.IGNORECASE),
    re.compile(r'\bshop\s+now\b', re.IGNORECASE),
    # Note: "Learn more", "Get a quote", "Order now" are NOT weak patterns in B2B context
    # — they are legitimate B2B procurement CTAs when followed by specifics
]

# ── Strong CTA Suggestions (by article context) ──

STRONG_CTA_TEMPLATES = {
    'technical': 'Download the Full [Topic] Test Report (PDF)',
    'procurement': 'Get Our [Topic] Checklist — [N] Verification Points Before Your First Order',
    'oem_core': 'Schedule a 30-Minute Call With Our Engineering Team to Discuss Your OEM Specifications',
    'generic': 'Download Our [Topic] Guide — Complete [Spec/Checklist/Report] for B2B Buyers',
}

# ── URL Quality Patterns ──

URL_STOP_WORDS = {'a', 'an', 'the', 'of', 'for', 'how', 'to', 'and', 'or', 'in', 'on', 'at', 'by', 'is', 'it', 'be', 'as', 'we', 'he', 'she', 'they', 'this', 'that', 'with', 'from', 'your', 'our', 'my', 'its', 'all', 'not', 'but', 'so', 'if', 'can', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'shall', 'has', 'had', 'have', 'do', 'does', 'did'}

URL_DATE_PATTERNS = [
    re.compile(r'/\d{4}/\d{2}/'),           # /2026/07/
    re.compile(r'/\d{4}/'),                  # /2026/ (standalone year segment)
    re.compile(r'-\d{4}-\d{2}-\d{2}'),       # -2026-07-22
    re.compile(r'_\d{4}_\d{2}_\d{2}'),       # _2026_07_22
]


class B2BContentAuditor:
    """Audit B2B blog content against 2026 Google B2B SEO standards."""

    def __init__(self):
        """Initialize auditor with B2B signal words and detection patterns."""
        self.b2b_signal_words = [w.lower() for w in B2B_SIGNAL_WORDS]

    # ── Public API ──

    def audit(
        self,
        content: str,
        article_type: Optional[str] = None,
        meta_title: Optional[str] = None,
        author_bio: Optional[str] = None,
        language: str = 'en',
        syntax_only: bool = False,
        verify_search_demand: bool = False
    ) -> Dict[str, Any]:
        """
        Run all B2B content checks. Auto-detects and preprocesses .njk files.

        Args:
            content: Full article content (markdown or .njk HTML template).
            article_type: 'technical', 'procurement', or 'oem_core'. Auto-detected if None.
            meta_title: Optional meta title for additional context.
            author_bio: Optional author bio text for E-E-A-T audit.
            language: Content language code ('en', 'de', 'es', 'fr'). Default 'en'.
            syntax_only: If True, run only fatal-error checks (schema parse, heading hierarchy, URL format).
            verify_search_demand: If True, enable live WebSearch for FAQ verification.

        Returns:
            Dict with overall_score and per-check results.
        """
        # ── Preprocess .njk content if needed ──
        raw_content = content  # keep original for meta/link extraction
        _njk_meta = {}
        if is_njk(content):
            _njk_meta = njk_extract_meta(raw_content)
            content = njk_preprocess(content)
            if meta_title is None and _njk_meta.get('title'):
                meta_title = _njk_meta['title']
        if author_bio is None and _njk_meta.get('author'):
            author_bio = _njk_meta['author']

        # ── Auto-detect language if not explicitly provided ──
        if language in ('en', None) and B2BI18n is not None:
            detected = detect_language(raw_content, _njk_meta if _njk_meta else None)
            if detected != 'en':
                language = detected
        self.lang = language
        self.i18n = B2BI18n(language) if B2BI18n is not None else None

        # ── syntax_only mode: fatal errors only, no NLP ──
        if syntax_only:
            schema_val = self._check_schema_validation(raw_content if is_njk(raw_content) else content)
            hierarchy = self._check_heading_hierarchy(content)
            url_quality = self._check_url_quality(
                content=raw_content if is_njk(raw_content) else content,
                canonical=_njk_meta.get('canonical') if _njk_meta else None
            )
            static_html = self._check_static_html_quality(raw_content if is_njk(raw_content) else content)
            fatal_checks = [schema_val, hierarchy, url_quality, static_html]
            fatal_scores = [c['score'] for c in fatal_checks if c['score'] is not None]
            overall = round(sum(fatal_scores) / len(fatal_scores)) if fatal_scores else 100
            return {
                'overall_score': overall,
                'syntax_only': True,
                'opening_density': {'score': None}, 'tldr_block': {'score': None},
                'h3_answer_length': {'score': None}, 'vague_headings': {'score': None},
                'h2_b2b_density': {'score': None}, 'data_density': {'score': None},
                'table_test': {'score': None}, 'stock_photo': {'score': None},
                'faq_b2b_language': {'score': None}, 'author_eeat': {'score': None},
                'weak_cta': {'score': None}, 'heading_hierarchy': hierarchy,
                'url_quality': url_quality, 'cross_reference': {'score': None},
                'schema_validation': schema_val, 'factory_data_canonical': {'score': None},
                'static_html_quality': static_html,
                'critical_issues': [i for c in fatal_checks for i in c.get('critical_issues', [])],
                'warnings': [i for c in fatal_checks for i in c.get('warnings', [])],
                'recommendations': [],
                'scores_used': len(fatal_scores),
                'checks_na': 13,
            }

        # Extract author from JSON-LD in RAW content (before preprocessing strips it)
        _jsonld_author = self._extract_author_from_jsonld(raw_content) if is_njk(raw_content) else None

        opening = self._check_opening_density(content)
        h3_answer = self._check_h3_answer_length(content)
        h2_density = self._check_h2_b2b_density(content, article_type, raw_content=raw_content)
        data_density = self._check_data_density(content)
        table_test = self._check_table_test(content)
        stock_photo = self._check_stock_photos(content)
        faq_lang = self._check_faq_language(raw_content, verify_search=verify_search_demand)

        author_eeat = self._check_author_eeat(content, author_bio, _jsonld_author,
                                                raw_content if is_njk(raw_content) else None)

        tldr = self._check_tldr_block(content)
        vague_headings = self._check_vague_headings(content)
        weak_cta = self._check_weak_cta(content)
        hierarchy = self._check_heading_hierarchy(content)
        url_quality = self._check_url_quality(
            content=raw_content if is_njk(raw_content) else content,
            canonical=_njk_meta.get('canonical') if _njk_meta else None
        )
        cross_ref = self._check_cross_reference_consistency(content)
        schema_val = self._check_schema_validation(raw_content if is_njk(raw_content) else content)
        factory_data = self._check_factory_data_canonical(content)
        static_html = self._check_static_html_quality(raw_content if is_njk(raw_content) else content)

        # Composite: all non-None scores averaged equally
        all_checks = [opening, h3_answer, h2_density, data_density,
                      table_test, stock_photo, faq_lang, author_eeat,
                      tldr, vague_headings, weak_cta, hierarchy, url_quality,
                      cross_ref, schema_val, factory_data, static_html]
        scores = []
        for check in all_checks:
            s = check.get('score')
            if s is not None:
                scores.append(s)

        overall = round(sum(scores) / len(scores), 1) if scores else 0.0

        # Collect issues
        critical_issues = []
        warnings = []
        recommendations = []

        for check in all_checks:
            critical_issues.extend(check.get('critical_issues', []))
            warnings.extend(check.get('warnings', []))
            recommendations.extend(check.get('recommendations', []))

        return {
            'overall_score': overall,
            'opening_density': opening,
            'h3_answer_length': h3_answer,
            'h2_b2b_density': h2_density,
            'data_density': data_density,
            'table_test': table_test,
            'stock_photo': stock_photo,
            'faq_b2b_language': faq_lang,
            'author_eeat': author_eeat,
            'tldr_block': tldr,
            'vague_headings': vague_headings,
            'weak_cta': weak_cta,
            'heading_hierarchy': hierarchy,
            'url_quality': url_quality,
            'cross_reference': cross_ref,
            'schema_validation': schema_val,
            'factory_data_canonical': factory_data,
            'static_html_quality': static_html,
            'critical_issues': critical_issues,
            'warnings': warnings,
            'recommendations': recommendations,
        }

    # ── Check 1: Opening Density ──

    def _check_opening_density(self, content: str) -> Dict[str, Any]:
        """
        Check if the first 3 sentences of body text deliver the core conclusion.

        Scoring logic (plain language):
          - Conclusion signal present + no fluff → 100  (reader confirms "this has substance" in 5 sec)
          - No conclusion signal + no fluff       → 60   (conclusion delayed — reader may have left)
          - Fluff pattern detected                → 30   (AI-generated feel — instant bounce)

        Conclusion signals: number+unit, B2B signal word, standards reference, first-hand experience, procurement context.
        Fluff patterns: "In today's...", "In the world of...", "When it comes to...", etc.
        """
        body = self._strip_metadata(content)
        # Skip past H1 and metadata area (date, author, breadcrumbs) to reach actual body text
        body_after_h1 = self._skip_to_body_start(body)
        sentences = self._extract_sentences(body_after_h1)
        first_three = sentences[:3]

        if not first_three:
            return {
                'score': 0, 'has_fluff': True,
                'fluff_patterns': ['No readable sentences found'],
                'first_sentences': [],
                'critical_issues': ['Article body is empty or unreadable'],
                'warnings': [], 'recommendations': []
            }

        score = 100
        fluff_found = []
        has_conclusion = False

        fluff_patterns = self.i18n.get_patterns('OPENING_FLUFF_PATTERNS') if self.i18n else OPENING_FLUFF_PATTERNS
        conclusion_patterns = self.i18n.get_patterns('CONCLUSION_SIGNALS') if self.i18n else CONCLUSION_SIGNALS

        for i, sent in enumerate(first_three):
            # Question 2: Is there AI fluff? Each pattern match = -30
            for pattern in fluff_patterns:
                if pattern.search(sent):
                    fluff_found.append(f'Fluff pattern in sentence {i+1}: "{pattern.pattern}" -> "{sent[:80]}..."')
                    score -= 30

            # Question 1: Is there a core conclusion? (number, B2B word, standard, first-hand data, procurement term)
            for pattern in conclusion_patterns:
                if pattern.search(sent):
                    has_conclusion = True
                    break

        if not has_conclusion:
            score -= 40

        score = max(0, min(100, score))

        issues = []
        if fluff_found:
            issues.append({
                'issue': f'First sentences contain {len(fluff_found)} fluff/preamble patterns',
                'fix': 'Lead with the core conclusion. Replace generic opening with: '
                       'a specific number, B2B signal word, or the article\'s central claim.',
                'severity': 'high'
            })

        # Also check intro paragraph count — too many = visual wall, B2B scanners skip
        intro_para_count = self._count_intro_paragraphs(body_after_h1)
        if intro_para_count > 3:
            issues.append({
                'issue': f'Intro area has {intro_para_count} paragraphs before TL;DR/TOC — B2B scanners skip walls of text',
                'fix': 'Keep intro to 1-2 short paragraphs. Move supporting data (statistics, citations, investigation reports) '
                       'into the body sections where each piece supports a specific H2 argument.',
                'severity': 'medium'
            })
            score = max(0, score - 10)

        return {
            'score': score,
            'has_fluff': len(fluff_found) > 0,
            'has_conclusion': has_conclusion,
            'fluff_patterns': fluff_found,
            'first_sentences': first_three,
            'intro_paragraphs': intro_para_count,
            'critical_issues': [i['issue'] for i in issues if i['severity'] == 'high'],
            'warnings': [i['issue'] for i in issues if i['severity'] == 'medium'],
            'recommendations': [i['fix'] for i in issues],
        }

    # ── Check 2: H3 Answer Length ──

    def _check_h3_answer_length(self, content: str) -> Dict[str, Any]:
        """Verify H3/H4 answers: 60-500 chars (B2B technical content needs space for data+context)."""
        h3_blocks = self._extract_h3_blocks(content)
        h4_blocks = self._extract_h4_blocks(content)
        all_blocks = h3_blocks + h4_blocks

        if not all_blocks:
            return {
                'score': None,
                'total_h3': 0, 'compliant_h3': 0,
                'violations': [],
                'critical_issues': [], 'warnings': [],
                'recommendations': ['Article has no H3/H4 headings — consider adding subsections for scannability.']
            }

        violations = []
        for block in all_blocks:
            heading = block['heading']
            first_block_text = block['first_block']
            length = len(first_block_text)
            level = block.get('level', 'H3')  # H3 or H4

            # Tables are auto-pass. Group-header headings (0-10 chars) are expected.
            if block['is_table'] or (length <= 10 and not first_block_text.strip()):
                continue

            # H4 blocks (cards, feature grids) have lower minimum: 15 chars is reasonable
            min_len = 15 if level == 'H4' else 60

            if length < min_len:
                violations.append({
                    'h3': heading[:80],
                    'length': length,
                    'issue': f'{level} answer too short ({length} chars). Target: {min_len}-500 chars.'
                })
            elif length > 500:
                violations.append({
                    'h3': heading[:80],
                    'length': length,
                    'issue': f'{level} answer exceeds optimal length ({length} chars). Target: under 500 chars.'
                })

        total = len(all_blocks)
        compliant = total - len(violations)
        score = round((compliant / total) * 100)

        issues = []
        if violations:
            issues.append({
                'issue': f'{len(violations)}/{total} H3/H4 sections lack optimal answer length (target: 60-500 chars)',
                'fix': 'Place a 60-500 char direct answer (or a comparison table) '
                       'immediately after each H3/H4. For B2B technical content, '
                       '500 chars allows a data point + standards reference + brief context.',
                'severity': 'medium'
            })

        return {
            'score': score,
            'total_h3': total,
            'compliant_h3': compliant,
            'violations': violations,
            'critical_issues': [i['issue'] for i in issues if i['severity'] == 'high'],
            'warnings': [i['issue'] for i in issues if i['severity'] == 'medium'],
            'recommendations': [i['fix'] for i in issues],
        }

    # ── Check 3: H2 B2B Signal Density ──

    def _check_h2_b2b_density(
        self, content: str, article_type: Optional[str] = None,
        raw_content: Optional[str] = None
    ) -> Dict[str, Any]:
        """Audit H2 B2B signal word density per quality standards Section II."""
        # Prefer raw (HTML) content for reliable H2 extraction
        extract_from = raw_content if raw_content else content
        h2s = self._extract_h2s(extract_from)
        content_h2s = [h for h in h2s if not self._is_excluded_h2(h)]

        if not content_h2s:
            return {
                'score': None, 'article_type': article_type or 'unknown',
                'density': 0.0, 'target_range': 'N/A',
                'adjacency_violations': [], 'vocabulary_rotation_ok': True,
                'critical_issues': [], 'warnings': [],
                'recommendations': ['No content H2s found — add H2 sections for structure.']
            }

        # Classify article type
        if article_type is None:
            article_type = self._classify_article_type(content)

        # Count B2B signal words in H2s
        b2b_h2_count = 0
        h2_b2b_words = []  # which B2B word found in each H2
        unique_b2b_terms = set()

        for h2_text in content_h2s:
            found_any = False
            h2_lower = h2_text.lower()
            raw_words = self.i18n.get('B2B_SIGNAL_WORDS') if self.i18n else B2B_SIGNAL_WORDS
            signal_words = [w.lower() for w in raw_words]
            for word in signal_words:
                if word in h2_lower:
                    found_any = True
                    unique_b2b_terms.add(word)
                    h2_b2b_words.append(word)
                    break  # count each H2 once
            if found_any:
                b2b_h2_count += 1
            else:
                h2_b2b_words.append(None)

        total = len(content_h2s)
        density = round((b2b_h2_count / total) * 100, 1)

        # Target ranges per article type
        ranges = {
            'technical': (10, 40),
            'procurement': (30, 55),
            'oem_core': (50, 80),
        }
        target_min, target_max = ranges.get(article_type, (10, 80))

        # Score: 100 if in range, penalty proportional to deviation
        if target_min <= density <= target_max:
            score = 100
            in_range = True
        elif density < target_min:
            deficit = target_min - density
            score = max(0, 100 - int(deficit * 2))
            in_range = False
        else:
            excess = density - target_max
            score = max(0, 100 - int(excess * 2))
            in_range = False

        # Adjacency check: 3+ consecutive H2s with same B2B word
        adjacency_violations = []
        for i in range(len(h2_b2b_words) - 2):
            w1, w2, w3 = h2_b2b_words[i], h2_b2b_words[i+1], h2_b2b_words[i+2]
            if w1 and w1 == w2 == w3:
                adjacency_violations.append({
                    'word': w1,
                    'h2_range': f'H2 #{i+1} to H2 #{i+3}',
                    'issue': f'3 consecutive H2s use "{w1}" — reads as keyword stuffing',
                    'fix': f'Replace one occurrence with a synonym or rephrase the heading'
                })
                score = max(0, score - 10)

        # Vocabulary rotation: >= 2 different B2B terms
        vocab_ok = len(unique_b2b_terms) >= 2 if b2b_h2_count >= 2 else True
        if not vocab_ok and b2b_h2_count >= 2:
            score = max(0, score - 10)

        issues = []
        if not in_range:
            direction = 'low' if density < target_min else 'high'
            issues.append({
                'issue': f'H2 B2B density is {density}% (target: {target_min}-{target_max}% for {article_type})',
                'fix': f'Density too {direction}: {"add B2B identifiers to procurement-decision H2s" if direction == "low" else "remove forced B2B prefixes from technical H2s"}',
                'severity': 'medium'
            })
        if adjacency_violations:
            issues.append({
                'issue': f'{len(adjacency_violations)} adjacency violation(s) found',
                'fix': 'Vary B2B terms across consecutive H2s — max 2 consecutive H2s with same B2B word',
                'severity': 'medium'
            })
        if not vocab_ok:
            issues.append({
                'issue': 'Only 1 unique B2B term used across all H2s',
                'fix': 'Rotate vocabulary: alternate between OEM/supplier/manufacturer/sourcing/procurement',
                'severity': 'low'
            })

        return {
            'score': score,
            'article_type': article_type,
            'density': density,
            'target_range': f'{target_min}-{target_max}%',
            'in_range': in_range,
            'total_h2s': total,
            'b2b_h2s': b2b_h2_count,
            'b2b_signal_words_used': sorted(unique_b2b_terms),
            'adjacency_violations': adjacency_violations,
            'vocabulary_rotation_ok': vocab_ok,
            'critical_issues': [i['issue'] for i in issues if i['severity'] == 'high'],
            'warnings': [i['issue'] for i in issues if i['severity'] == 'medium'],
            'recommendations': [i['fix'] for i in issues],
        }

    # ── Check 4: First-Hand Data Density ──

    def _check_data_density(self, content: str) -> Dict[str, Any]:
        """Count precise numbers + engineering units per 1000 words."""
        body = self._strip_metadata(content)
        word_count = len(body.split())

        if word_count == 0:
            return {
                'score': 0, 'data_points': 0, 'data_points_per_1000': 0.0,
                'units_found': [],
                'critical_issues': ['No readable content for data density check'],
                'warnings': [], 'recommendations': []
            }

        # Count precise measurements with units
        measurements = PRECISE_MEASUREMENT_RE.findall(body)
        data_points = len(measurements)

        # Count standards references
        standards = STANDARDS_REFERENCE_RE.findall(body)
        data_points += len(standards)

        # Count named equipment references
        equipment = NAMED_EQUIPMENT_RE.findall(body)
        data_points += len(equipment)

        # Count semantic GEO tags: <cite>, <data value="...">, <time datetime="...">
        cite_tags = len(re.findall(r'<cite[^>]*>', body, re.IGNORECASE))
        data_tags = len(re.findall(r'<data\s+value=', body, re.IGNORECASE))
        time_tags = len(re.findall(r'<time\s+datetime=', body, re.IGNORECASE))
        semantic_tags = cite_tags + data_tags + time_tags
        data_points += semantic_tags * 2  # Each semantic tag = 2x weight (AST-level signal)

        per_1000 = round((data_points / word_count) * 1000, 1)

        # Score: staged — ≥3/k = 100, 2-2.9 = 70 (warning), 1-1.9 = 40, <1 = 10 (critical)
        if per_1000 >= 3:
            score = 100
        elif per_1000 >= 2:
            score = 70
        elif per_1000 >= 1:
            score = 40
        else:
            score = 10

        # Collect unique units found
        units_set = set()
        for m in measurements:
            # measurements is a tuple from findall with the unit group
            unit_val = m if isinstance(m, str) else m[-1] if isinstance(m, tuple) else str(m)
            if unit_val:
                units_set.add(unit_val.lower())

        issues = []
        if per_1000 < 3:
            severity = 'high' if per_1000 < 1 else ('medium' if per_1000 < 2 else 'low')
            issues.append({
                'issue': f'Low data density: {per_1000} data points per 1000 words (target: ≥3)',
                'fix': 'Add factory-floor measurements (°C, mV, mm), standards references '
                       '(IEC/ISO/EN numbers), or named test equipment (Keysight E4980A, etc.)',
                'severity': severity,
            })

        return {
            'score': score,
            'data_points': data_points,
            'data_points_per_1000': per_1000,
            'units_found': sorted(units_set),
            'word_count': word_count,
            'semantic_tags': {'cite': cite_tags, 'data': data_tags, 'time': time_tags} if semantic_tags > 0 else None,
            'critical_issues': [i['issue'] for i in issues if i['severity'] == 'high'],
            'warnings': [i['issue'] for i in issues if i['severity'] == 'medium'],
            'recommendations': [i['fix'] for i in issues],
        }

    # ── Check 5: Table Test ──

    def _check_table_test(self, content: str) -> Dict[str, Any]:
        """Verify technical parameters are presented in markdown tables."""
        body = self._strip_metadata(content)

        # Check for markdown tables (pipe-delimited rows)
        table_lines = [l for l in body.split('\n') if l.strip().startswith('|') and '|' in l[1:]]
        has_tables = len(table_lines) >= 2  # at least header + separator

        # Check for technical parameter patterns NOT in tables
        # Look for lines with number + unit outside table blocks
        param_lines = []
        lines = body.split('\n')
        in_table = False
        for i, line in enumerate(lines):
            stripped = line.strip()
            if stripped.startswith('|'):
                in_table = True
                continue
            elif in_table and not stripped.startswith('|'):
                in_table = False

            if not in_table and PRECISE_MEASUREMENT_RE.search(stripped):
                # Skip headings
                if not stripped.startswith('#'):
                    param_lines.append({'line': i + 1, 'text': stripped[:100]})

        params_outside_table = len(param_lines) >= 3  # threshold: 3+ param lines outside tables

        if not has_tables and not PRECISE_MEASUREMENT_RE.search(body):
            return {
                'score': None,  # N/A — no technical parameters to table
                'has_tables': False, 'table_count': 0,
                'params_without_table': False,
                'critical_issues': [], 'warnings': [],
                'recommendations': []
            }

        if has_tables:
            score = 100
        elif params_outside_table:
            score = 40
        else:
            score = 70  # has some data but not enough to flag

        issues = []
        if params_outside_table and not has_tables:
            issues.append({
                'issue': f'{len(param_lines)} technical parameter lines found outside markdown tables',
                'fix': 'Present voltage/current/certification/MOQ specs as markdown comparison tables. '
                       'Clean tables dramatically improve mobile dwell time and page quality score.',
                'severity': 'medium'
            })

        return {
            'score': score,
            'has_tables': has_tables,
            'table_count': len([l for l in table_lines if re.match(r'^\|[\s\-:|]+\|$', l.strip())]) if has_tables else 0,
            'params_without_table': params_outside_table,
            'critical_issues': [i['issue'] for i in issues if i['severity'] == 'high'],
            'warnings': [i['issue'] for i in issues if i['severity'] == 'medium'],
            'recommendations': [i['fix'] for i in issues],
        }

    # ── Check 6: Stock Photo Detection ──

    def _check_stock_photos(self, content: str) -> Dict[str, Any]:
        """Detect likely stock photos by URL domain and filename patterns."""
        # Extract image references: ![alt](url) and <img src="url">
        img_refs = re.findall(r'!\[([^\]]*)\]\(([^)]+)\)', content)
        img_tags = re.findall(r'<img[^>]+src=["\']([^"\']+)["\'][^>]*alt=["\']([^"\']*)["\']', content)

        all_images = []
        for alt, url in img_refs:
            all_images.append({'alt': alt, 'url': url})
        for url, alt in img_tags:
            all_images.append({'alt': alt, 'url': url})

        if not all_images:
            return {
                'score': None,  # N/A — no images
                'suspected_stock': 0, 'total_images': 0,
                'suspicious_urls': [],
                'critical_issues': [], 'warnings': [],
                'recommendations': ['No images found — B2B articles should include real product/factory/lab photos.']
            }

        suspicious = []
        for img in all_images:
            url_lower = img['url'].lower()
            alt_lower = img['alt'].lower()
            reasons = []

            # Check domain
            for domain in STOCK_PHOTO_DOMAINS:
                if domain in url_lower:
                    reasons.append(f'Stock photo domain: {domain}')
                    break

            # Check filename
            stock_patterns = self.i18n.get_patterns('STOCK_FILENAME_PATTERNS') if self.i18n else STOCK_FILENAME_PATTERNS
            for pattern in stock_patterns:
                if pattern.search(url_lower):
                    reasons.append(f'Stock filename pattern: {pattern.pattern}')
                    break

            # Check alt text: generic/no B2B keywords = weaker signal
            has_b2b_alt = any(w in alt_lower for w in ['pcba', 'factory', 'lab', 'test', 'oem',
                                                         'production', 'circuit', 'board', 'machine'])
            if not has_b2b_alt and len(alt_lower) < 10 and len(reasons) == 0:
                reasons.append('Generic alt text (no B2B technical keywords)')

            if reasons:
                suspicious.append({'url': img['url'], 'alt': img['alt'], 'reasons': reasons})

        total = len(all_images)
        suspect_count = len(suspicious)
        score = max(0, 100 - (suspect_count * 25))

        issues = []
        if suspect_count > 0:
            issues.append({
                'issue': f'{suspect_count}/{total} images appear to be stock photos',
                'fix': 'Replace with real factory-floor PCBA photos, lab instrument screenshots, '
                       'or production line images. Add descriptive B2B alt text with technical keywords.',
                'severity': 'high' if suspect_count >= total * 0.5 else 'medium'
            })

        # ── Featured Image LCP validation ──
        # The first <img> after the hero section should be the LCP element.
        # Must use loading="eager" + fetchpriority="high" + width="2240" height="1260".
        lcp_issues = []
        first_img = re.search(r'<img[^>]+>', content)
        if first_img:
            img_tag = first_img.group(0)
            has_eager = 'loading="eager"' in img_tag or "loading='eager'" in img_tag
            has_lazy = 'loading="lazy"' in img_tag or "loading='lazy'" in img_tag
            has_fetch = 'fetchpriority="high"' in img_tag or "fetchpriority='high'" in img_tag
            has_dims = 'width="2240"' in img_tag or "width='2240'" in img_tag

            if has_lazy:
                score -= 15
                lcp_issues.append('Featured image uses loading="lazy" — change to loading="eager" for LCP performance')
            elif not has_eager:
                score -= 5
                lcp_issues.append('Featured image missing loading="eager" — add for LCP optimization')

            if not has_fetch:
                score -= 5
                lcp_issues.append('Featured image missing fetchpriority="high" — add for LCP prioritization')

            if not has_dims:
                score -= 10
                lcp_issues.append('Featured image missing width="2240" height="1260" — explicit dimensions prevent CLS')

        for issue in lcp_issues:
            issues.append({
                'issue': issue,
                'fix': 'Set loading="eager", fetchpriority="high", width="2240", height="1260" on the hero featured image.',
                'severity': 'medium',
            })

        score = max(0, min(100, score))

        return {
            'score': score,
            'suspected_stock': suspect_count,
            'total_images': total,
            'suspicious_urls': [s['url'] for s in suspicious],
            'suspicious_details': suspicious,
            'critical_issues': [i['issue'] for i in issues if i['severity'] == 'high'],
            'warnings': [i['issue'] for i in issues if i['severity'] == 'medium'],
            'recommendations': [i['fix'] for i in issues],
        }

    # ── Check 7: FAQ B2B Language ──
    # Eight FAQ rules (from b2b-blog-quality-standards-2026.md Section III.4):
    # 1. Body-Schema Consistency: FAQ body text MUST match JSON-LD FAQPage exactly (manual — schema stripped)
    # 2. Real Buyer Questions: Questions reflect what actual procurement managers ask, verified via search query patterns + competitor FAQ audit + supplier inquiry data — not writer guesswork
    # 3. Content-Anchored: Every answer derived from a specific section/data point in this article
    # 4. GEO-Optimized: Self-contained Q&A pairs phrased for AI citation extraction
    # 5. Decision-Chain Ordering: Questions follow buyer psychology: fit → spec → compliance → pricing → action
    # 6. Quantitative Answers: Every answer contains >=1 specific number (price/days/percentage/unit/dimension)
    # 7. Final Question = CTA Bridge: Last FAQ naturally transitions to the buyer's next action
    # 9. Cross-Reference Consistency: FAQ numbers match TL;DR and body — no discrepancies between sources

    def _check_faq_language(self, content: str, verify_search: bool = False) -> Dict[str, Any]:
        """
        Verify FAQ language quality with question/answer side separation.

        Question-side (20% weight): Check for consumer language patterns only.
          Natural search language is ACCEPTED — real buyers type colloquial queries.
          Only flag clear consumer-intent patterns ("best", "cheap", "for home").

        Answer-side (80% weight): Check B2B vocabulary density + quantified data.
          Answers must carry procurement depth: MOQ, FOB, certification, lead time,
          compliance terms, and at least 1 specific number.
        """
        schema_faq_qs = self._extract_faq_questions(content)    # from JSON-LD Schema
        body_faq_qs = self._extract_body_faq_questions(content)  # from HTML body

        # Use body FAQ if available (real rendered text), fallback to Schema
        faq_questions = body_faq_qs if body_faq_qs else schema_faq_qs

        if not faq_questions:
            return {
                'score': None, 'total_faq': 0,
                'question_side_score': None, 'answer_side_score': None,
                'critical_issues': [], 'warnings': [], 'recommendations': []
            }

        # ── Extract FAQ answers from HTML body ──
        faq_answers = self._extract_body_faq_answers(content)

        # ── Question-Side (20%): flag consumer language only ──
        consumer_patterns = self.i18n.get_patterns('CONSUMER_LANGUAGE') if self.i18n else CONSUMER_LANGUAGE
        consumer_count = 0
        consumer_questions = []

        for q in faq_questions:
            for pattern in consumer_patterns:
                if pattern.search(q):
                    consumer_count += 1
                    consumer_questions.append({
                        'question': q[:120],
                        'suggested_fix': 'Replace consumer phrasing with procurement context. '
                                         'Natural search language is fine — just avoid consumer-intent signals.'
                    })
                    break

        total_q = len(faq_questions)
        question_side_score = round(((total_q - consumer_count) / total_q) * 100) if total_q > 0 else 100

        # ── Answer-Side (80%): B2B vocabulary + quantified data ──
        b2b_patterns = self.i18n.get_patterns('B2B_BUYER_LANGUAGE') if self.i18n else B2B_BUYER_LANGUAGE
        b2b_answer_count = 0
        answers_with_data = 0

        for answer_text in faq_answers:
            # B2B vocabulary check
            has_b2b = any(pattern.search(answer_text) for pattern in b2b_patterns)
            if has_b2b:
                b2b_answer_count += 1

            # Quantified data check: at least 1 number + unit or currency
            if re.search(r'\d+[\s]*(?:°C|mV|kHz|Wh/kg|mm|EUR|USD|€|\$|%|Watt|W\b)', answer_text):
                answers_with_data += 1

        total_a = len(faq_answers) if faq_answers else total_q
        b2b_density = round((b2b_answer_count / total_a) * 100) if total_a > 0 else 0
        data_density = round((answers_with_data / total_a) * 100) if total_a > 0 else 0
        answer_side_score = round(b2b_density * 0.6 + data_density * 0.4)

        # ── Weighted composite: 20% question-side + 80% answer-side ──
        score = round(question_side_score * 0.2 + answer_side_score * 0.8)

        # Fanout long questions (>15 words may reduce GEO citation match)
        long_questions = []
        for i, q_text in enumerate(faq_questions):
            word_count = len(q_text.split())
            if word_count > 15:
                long_questions.append({
                    'index': i + 1, 'question': q_text[:100], 'words': word_count,
                    'issue': f'FAQ #{i + 1} is {word_count} words — real buyer queries are typically 5-12 words.',
                    'fix': 'Shorten: keep the question mark, use em-dash format. '
                           'Example: "mAh vs Wh — which spec should OEM buyers use?"'
                })

        if long_questions:
            score = max(0, score - (len(long_questions) * 5))

        # ── Issues ──
        issues = []
        if consumer_count > 0:
            issues.append({
                'issue': f'{consumer_count}/{total_q} FAQ questions use consumer language (question-side)',
                'fix': 'Question-side: remove consumer-intent signals. Natural search phrasing is fine.',
                'severity': 'low'
            })
        if answer_side_score < 50:
            issues.append({
                'issue': f'FAQ answers lack B2B depth: {b2b_answer_count}/{total_a} have B2B vocabulary, '
                         f'{answers_with_data}/{total_a} have quantified data',
                'fix': 'Answer-side: add procurement terms (MOQ, FOB, certification) + at least 1 specific number per answer.',
                'severity': 'medium'
            })
        for lq in long_questions:
            issues.append({'issue': lq['issue'], 'fix': lq['fix'], 'severity': 'medium'})

        # Rule 2 notice
        if verify_search:
            rule2_notice = (
                'FAQ search-demand verification (live): WebSearch each question against '
                'OEM/factory/supplier/sourcing qualifiers + Alibaba/Global Sources cross-check.'
            )
        else:
            rule2_notice = (
                'MANUAL VERIFICATION REQUIRED (Rule 2): Verify all FAQ questions via '
                '(1) Google search — do supplier/competitor pages answer the same question? '
                '(2) Competitor FAQ audit — check 3-5 B2B sites for matching questions. '
                '(3) Alibaba/Global Sources RFQ cross-check.'
            )

        recommendations = [i['fix'] for i in issues]
        if total_q > 0:
            recommendations.append(rule2_notice)

        return {
            'score': score,
            'total_faq': total_q,
            'question_side_score': question_side_score,
            'answer_side_score': answer_side_score,
            'answers_with_b2b': b2b_answer_count,
            'answers_with_data': answers_with_data,
            'consumer_language_faq': consumer_count,
            'consumer_questions': consumer_questions,
            'rule2_manual_verification_required': True,
            'critical_issues': [i['issue'] for i in issues if i['severity'] == 'high'],
            'warnings': [i['issue'] for i in issues if i['severity'] == 'medium'],
            'recommendations': recommendations,
        }

    # ── Check 8: Author E-E-A-T Audit ──

    def _check_author_eeat(
        self, content: str, author_bio: Optional[str] = None,
        jsonld_author: Optional[Dict] = None,
        raw_html: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Audit author E-E-A-T signals: byline, credentials, LinkedIn, author page."""
        checks = {
            'has_author_byline': False,
            'has_credentials': False,
            'has_linkedin': False,
            'has_author_page': False,
            'has_expertise_angle': False,
            'has_compact_author_bar': False,  # Hero section visual element
        }
        byline_text = ''

        # Search for author byline in content
        byline_patterns = [
            r'(?:By|Author|Written by|Autor|Autorin|Por|Par)\s*[:\-]?\s*([^\n]+)',
            r'\*\*Author\*\*[:\s]*([^\n]+)',
            r'<span[^>]*class="[^"]*author[^"]*"[^>]*>([^<]+)</span>',
        ]

        for pat in byline_patterns:
            m = re.search(pat, content, re.IGNORECASE)
            if m:
                byline_text = m.group(1).strip()
                checks['has_author_byline'] = True
                break

        # Check compact author bar: w-10 h-10 rounded-full image + href="#author-bio" link
        # Use raw HTML when available (preprocessor strips hero section images/links)
        check_content = raw_html if raw_html else content
        compact_bar = re.search(
            r'<img[^>]*class="[^"]*w-10\s+h-10\s+rounded-full[^"]*"[^>]*>.*?'
            r'<a[^>]*href="#author-bio"[^>]*>',
            check_content, re.DOTALL
        )
        if compact_bar:
            checks['has_compact_author_bar'] = True

        # Check metadata-style author
        if not checks['has_author_byline']:
            m = re.search(r'^\s*author\s*[:\-]\s*(.+)$', content, re.IGNORECASE | re.MULTILINE)
            if m:
                byline_text = m.group(1).strip()
                checks['has_author_byline'] = True

        # If author_bio explicitly passed (from frontmatter)
        if author_bio:
            byline_text = author_bio
            checks['has_author_byline'] = True

        # Extract author credentials from JSON-LD (pre-extracted from raw content)
        if jsonld_author:
            if jsonld_author.get('jobTitle'):
                checks['has_credentials'] = True
                checks['has_expertise_angle'] = True
            if jsonld_author.get('sameAs'):
                same_as = jsonld_author['sameAs']
                if isinstance(same_as, list):
                    same_as = ' '.join(same_as)
                if 'linkedin.com' in str(same_as).lower():
                    checks['has_linkedin'] = True
            if jsonld_author.get('knowsAbout'):
                checks['has_expertise_angle'] = True

        if byline_text:
            # Credential signals
            credential_patterns = [
                r'\b\d+\+?\s*years?\b', r'\b(?:Senior|Lead|Head|Chief|VP|Director)\b',
                r'\b(?:Engineer|Scientist|Specialist|Expert|Consultant|Manager)\b',
                r'\b(?:PhD|MBA|MSc|BSc|M\.?Eng|B\.?Eng)\b',
                r'\b(?:R&D|Research|Development|Engineering|Quality|Supply\s+Chain)\b',
            ]
            for pat in credential_patterns:
                if re.search(pat, byline_text, re.IGNORECASE):
                    checks['has_credentials'] = True
                    break

            # LinkedIn
            if re.search(r'linkedin\.com/in/', byline_text, re.IGNORECASE):
                checks['has_linkedin'] = True

            # Author page (internal link to /author/ or /about/ or /team/)
            # MD link in byline_text (legacy check)
            if re.search(r'\[[^\]]*\]\(/(?:author|about|team)/[^)]+\)', byline_text, re.IGNORECASE):
                checks['has_author_page'] = True
            # HTML link in author bio section or body (primary check for .njk templates)
            if not checks['has_author_page'] and raw_html:
                if re.search(r'href="/(?:[a-z]{2}/)?(?:author|about|team|ueber-uns)/[^"]*"', raw_html, re.IGNORECASE):
                    checks['has_author_page'] = True
            if not checks['has_author_page']:
                if re.search(r'href="/(?:[a-z]{2}/)?(?:author|about|team|ueber-uns)/[^"]*"', content, re.IGNORECASE):
                    checks['has_author_page'] = True

            # Expertise angle: role relevant to article topic
            expertise_words = [
                'sourcing', 'engineering', 'manufacturing', 'supply chain',
                'R&D', 'quality', 'certification', 'production', 'OEM', 'factory'
            ]
            for w in expertise_words:
                if w.lower() in byline_text.lower():
                    checks['has_expertise_angle'] = True
                    break

        # Score: 6 checks (byline + credentials + LinkedIn + author page + expertise + compact bar)
        passed = sum(1 for v in checks.values() if v)
        score = round((passed / len(checks)) * 100)

        issues = []
        if not checks['has_author_byline']:
            issues.append({
                'issue': 'No author byline found — anonymous content cannot earn high E-E-A-T trust',
                'fix': 'Add named author with credentials, e.g.: '
                       '"By [Name], Senior Sourcing Engineer at WOWOHCOOL, 8+ years in Shenzhen charger supply chain"',
                'severity': 'high'
            })
        if checks['has_author_byline'] and not checks['has_credentials']:
            issues.append({
                'issue': 'Author byline lacks credentials (years of experience, job title, certifications)',
                'fix': 'Add credential-rich byline: include role, years of experience, and specific expertise angle',
                'severity': 'medium'
            })
        if checks['has_author_byline'] and not checks['has_linkedin']:
            issues.append({
                'issue': 'Author LinkedIn URL missing',
                'fix': 'Link author name to LinkedIn profile for verifiable identity',
                'severity': 'medium'
            })

        if not checks['has_compact_author_bar']:
            issues.append({
                'issue': 'Compact Author Bar missing in hero section — no rounded author image with #author-bio link between H1 and date row',
                'fix': 'Add compact author bar: <img class="w-10 h-10 rounded-full"> + <a href="#author-bio">Author Name</a> + title between H1 and date row',
                'severity': 'medium'
            })

        return {
            'score': score,
            'checks': checks,
            'byline_text': byline_text,
            'critical_issues': [i['issue'] for i in issues if i['severity'] == 'high'],
            'warnings': [i['issue'] for i in issues if i['severity'] == 'medium'],
            'recommendations': [i['fix'] for i in issues],
        }

    # ── Check 9: TL;DR Block Detection ──

    def _check_tldr_block(self, content: str) -> Dict[str, Any]:
        """Verify a TL;DR / Key Takeaways block exists near the top of the article."""
        body = self._strip_metadata(content)

        # Search entire content for TL;DR markers — the block can appear anywhere
        # after H1 (hero sections vary in length across articles)
        h1_match = re.search(r'^#\s+.+$', body, re.MULTILINE)
        start = h1_match.end() if h1_match else 0
        above_fold = body[start:]

        tldr_found = False
        tldr_keyword = ''
        tldr_keywords = self.i18n.get('TLDR_KEYWORDS') if self.i18n else TLDR_KEYWORDS
        for kw in tldr_keywords:
            if kw.lower() in above_fold.lower():
                tldr_found = True
                tldr_keyword = kw
                break

        # Also check for bullet list in first 3000 chars after H1
        has_bullet_block = bool(re.search(
            r'(?:^|\n)\s*(?:[-*]\s+.+){2,}', above_fold[:3000]
        ))

        if tldr_found:
            score = 100
        elif has_bullet_block:
            score = 60  # has bullet points but no explicit TL;DR label
        else:
            score = 0

        issues = []
        if not tldr_found:
            fix = (
                'Add a TL;DR / Key Takeaways block immediately after H1 with 3-4 bullet points '
                'that directly answer the reader\'s core question. Example:\n'
                '  **Key Takeaways:**\n'
                '  - [Core finding 1 with specific number]\n'
                '  - [Core finding 2 with specific number]\n'
                '  - [Core finding 3 with specific number]\n'
                '  - [Core finding 4 with specific number]'
            )
            issues.append({
                'issue': 'No TL;DR / Key Takeaways block found above the fold',
                'fix': fix,
                'severity': 'high',
            })

        return {
            'score': score if not tldr_found else 100,
            'has_tldr': tldr_found,
            'tldr_keyword': tldr_keyword if tldr_found else None,
            'has_bullet_block': has_bullet_block,
            'critical_issues': [i['issue'] for i in issues if i['severity'] == 'high'],
            'warnings': [i['issue'] for i in issues if i['severity'] == 'medium'],
            'recommendations': [i['fix'] for i in issues],
        }

    # ── Check 10: Vague Heading Detection ──

    def _check_vague_headings(self, content: str) -> Dict[str, Any]:
        """Flag label-style H2/H3 headings; enforce conclusion-style headings."""
        h2s = re.findall(r'^##\s+(.+)$', content, re.MULTILINE)
        h3s = re.findall(r'^###\s+(.+)$', content, re.MULTILINE)
        all_headings = [('H2', h) for h in h2s] + [('H3', h) for h in h3s]

        if not all_headings:
            return {
                'score': None,
                'total_headings': 0, 'vague_count': 0,
                'vague_headings': [],
                'critical_issues': [], 'warnings': [],
                'recommendations': []
            }

        vague_found = []
        for level, heading in all_headings:
            vague_patterns = self.i18n.get_patterns('VAGUE_HEADING_PATTERNS') if self.i18n else VAGUE_HEADING_PATTERNS
            for pattern in vague_patterns:
                if pattern.match(heading.strip()):
                    vague_found.append({
                        'level': level,
                        'heading': heading.strip(),
                        'matched_pattern': pattern.pattern,
                        'suggested_fix': self._suggest_heading_fix(heading.strip(), level),
                    })
                    break

        total = len(all_headings)
        vague_count = len(vague_found)
        score = max(0, 100 - (vague_count * 15))

        issues = []
        if vague_count > 0:
            for v in vague_found[:5]:
                issues.append({
                    'issue': f'{v["level"]} "{v["heading"]}" is a label-style heading — F-pattern readers will skip it',
                    'fix': v['suggested_fix'],
                    'severity': 'medium' if vague_count <= 2 else 'high',
                })

        return {
            'score': score,
            'total_headings': total,
            'vague_count': vague_count,
            'vague_headings': vague_found,
            'critical_issues': [i['issue'] for i in issues if i['severity'] == 'high'],
            'warnings': [i['issue'] for i in issues if i['severity'] == 'medium'],
            'recommendations': [i['fix'] for i in issues],
        }

    def _suggest_heading_fix(self, heading: str, level: str) -> str:
        """Suggest a conclusion-style replacement for a vague label heading."""
        suggestions = {
            'introduction': 'Why [Topic] Matters for B2B [Audience] in 2026',
            'overview': 'What Every [Audience] Must Know About [Topic]',
            'background': 'The [N] Critical Changes in [Topic] Since [Year]',
            'testing': 'The [N] Benchmark Tests Every Importer Must Verify Before Ordering',
            'certification': 'The [N] Mandatory Certifications for [Market] [Product] Imports',
            'certifications': 'The [N] Mandatory Certifications for [Market] [Product] Imports',
            'products': 'How [Product Type] OEM Solutions Reduce [Pain Point]',
            'features': '[N] Technical Features That Differentiate [Product Type]',
            'specifications': '[Product] Technical Specifications: [Key Metric] Comparison Table',
            'specs': '[Product] Technical Specifications: [Key Metric] Comparison Table',
            'conclusion': 'Next Steps: How to Start Your [Topic] Procurement Today',
            'summary': '[N] Key Takeaways From Our [Topic] Analysis',
            'faq': '[Topic] Procurement FAQ: MOQ, FOB Pricing, and Compliance Answered',
            'faqs': '[Topic] Procurement FAQ: MOQ, FOB Pricing, and Compliance Answered',
            'benefits': 'How [Solution] Reduces [Cost/Risk/Time] for B2B [Audience]',
            'advantages': 'How [Solution] Reduces [Cost/Risk/Time] for B2B [Audience]',
            'applications': 'Where [Product Type] Delivers ROI: [N] B2B Use Cases',
            'quality': '[N]-Point Quality Control Protocol for [Product] Importers',
            'manufacturing': 'Inside the Factory: How [Product] OEM Manufacturing Works',
            'pricing': '[Product] FOB Cost Breakdown: [N] Factors That Determine Your Landed Price',
            'cost': '[Product] FOB Cost Breakdown: [N] Factors That Determine Your Landed Price',
            'costs': '[Product] FOB Cost Breakdown: [N] Factors That Determine Your Landed Price',
            'shipping': 'From Factory to Warehouse: [Product] Shipping & Logistics Timeline',
            'logistics': 'From Factory to Warehouse: [Product] Shipping & Logistics Timeline',
            'delivery': 'From Factory to Warehouse: [Product] Shipping & Logistics Timeline',
        }

        heading_lower = heading.lower().rstrip('s')
        for key, template in suggestions.items():
            if key in heading_lower:
                return f'Replace "{heading}" with a conclusion-style {level}: e.g., "{template}"'

        return (
            f'Rewrite "{heading}" as a complete conclusion or question. '
            f'Instead of a label, state the finding directly — e.g., '
            f'"How [specific metric] Affects [buyer concern]" or '
            f'"[N] [Specific Thing] Every [Audience] Must Verify"'
        )

    # ── Check 11: Weak CTA Detection ──

    def _check_weak_cta(self, content: str) -> Dict[str, Any]:
        """Detect ineffective B2B CTAs and suggest low-friction value-continuation alternatives."""
        # Search the bottom 30% of the article (where CTAs typically appear)
        lines = content.split('\n')
        bottom_start = int(len(lines) * 0.7)
        bottom_section = '\n'.join(lines[bottom_start:])

        # Also search the entire content for CTA patterns
        weak_ctas_found = []
        weak_cta_pats = self.i18n.get_patterns('WEAK_CTA_PATTERNS') if self.i18n else WEAK_CTA_PATTERNS
        for pattern in weak_cta_pats:
            for m in pattern.finditer(content):
                weak_ctas_found.append({
                    'text': m.group(),
                    'pattern': pattern.pattern,
                    'suggestion': self._suggest_cta_fix(m.group()),
                })

        # Classify article type for better CTA suggestions
        article_type = self._classify_article_type(content)
        suggested_cta = STRONG_CTA_TEMPLATES.get(article_type, STRONG_CTA_TEMPLATES['generic'])

        # Check bottom section AND full content for CTA signals (i18n-aware)
        cta_positive_raw = self.i18n.get('CTA_POSITIVE_PATTERNS') if self.i18n else None
        if cta_positive_raw:
            cta_pattern = re.compile('|'.join(cta_positive_raw), re.IGNORECASE)
        else:
            cta_pattern = re.compile(
                r'\b(?:download|get\s+(?:the|our|your)|schedule|book|request|'
                r'help\s+you\s+(?:evaluate|find|choose|source|build|develop|plan)|'
                r'talk\s+(?:to|with)\s+(?:our|us|an?\s+engineer)|'
                r'speak\s+(?:to|with)\s+(?:our|us|an?\s+engineer)|'
                r'start\s+your\s+project|ready\s+to\s+(?:source|start|discuss)|'
                r'let.?s\s+(?:discuss|talk|connect)|reach\s+out|'
                r'contact\s+(?:our|us|the|sales|engineering))',
            re.IGNORECASE
        )
        has_cta_in_bottom = bool(cta_pattern.search(bottom_section))
        has_cta_anywhere = bool(cta_pattern.search(content))
        # Also check for Nunjucks template CTA variables (stripped by preprocessor)
        has_template_cta = bool(re.search(
            r'cta(?:Heading|Label|Text|Button)|set\s+cta',
            content, re.IGNORECASE
        ))
        has_cta = len(weak_ctas_found) > 0 or has_cta_in_bottom or has_template_cta

        if not weak_ctas_found and has_cta:
            score = 100  # has CTAs and none are weak patterns
        elif not has_cta:
            score = 20  # no CTA at all
        elif len(weak_ctas_found) >= 2:
            score = 40  # multiple weak CTAs
        else:
            score = 60  # one weak CTA

        issues = []
        if not has_cta:
            issues.append({
                'issue': 'No CTA found in the bottom section of the article',
                'fix': f'Add a low-friction B2B CTA. Suggested: "{suggested_cta}"',
                'severity': 'high',
            })
        elif weak_ctas_found:
            for wc in weak_ctas_found[:3]:
                issues.append({
                    'issue': f'Weak B2B CTA detected: "{wc["text"]}" — sounds like B2C or spam',
                    'fix': f'Replace with value-continuation CTA: "{wc["suggestion"]}"',
                    'severity': 'medium',
                })

        return {
            'score': score,
            'has_cta': has_cta,
            'weak_cta_count': len(weak_ctas_found),
            'weak_ctas': weak_ctas_found,
            'suggested_cta': suggested_cta,
            'critical_issues': [i['issue'] for i in issues if i['severity'] == 'high'],
            'warnings': [i['issue'] for i in issues if i['severity'] == 'medium'],
            'recommendations': [i['fix'] for i in issues],
        }

    def _suggest_cta_fix(self, weak_text: str) -> str:
        """Suggest a stronger B2B CTA based on the weak one detected."""
        weak_lower = weak_text.lower()
        if 'buy' in weak_lower or 'order' in weak_lower or 'shop' in weak_lower:
            return 'Download the Full Technical Specification Sheet (PDF)'
        if 'contact us' in weak_lower or 'learn more' in weak_lower:
            return 'Schedule a 30-Minute Technical Consultation With Our Engineering Team'
        if 'get started' in weak_lower or 'sign up' in weak_lower:
            return 'Get Our Free B2B Procurement Checklist — [N] Verification Points'
        if 'click here' in weak_lower:
            return 'Download the Complete [Topic] Guide for B2B Buyers'
        if 'get a quote' in weak_lower or 'get quote' in weak_lower:
            return 'Request a Detailed OEM Quotation With Full BOM Cost Breakdown'
        return 'Download Our Free [Topic] Guide — Complete Resource for B2B Buyers'

    # ── Check 12: Heading Hierarchy Validation ──

    def _check_heading_hierarchy(self, content: str) -> Dict[str, Any]:
        """Detect skipped heading levels (H1→H3, H2→H4, etc.) — fatal logic error."""
        lines = content.split('\n')
        heading_stack = []  # (level, line_number, text)
        violations = []

        for i, line in enumerate(lines):
            h_match = re.match(r'^(#{1,6})\s+(.+)', line)
            if not h_match:
                continue
            level = len(h_match.group(1))
            text = h_match.group(2).strip()

            # Skip TOC, Related Articles, Sources, FAQ headings (they're structural, not content)
            if re.match(r'^(?:Table\s+of\s+Contents|Related\s+Articles|Sources?|References?|'
                        r'Frequently\s+Asked\s+Questions?|FAQ|FAQs)$', text, re.IGNORECASE):
                continue

            # Check for level skipping
            if heading_stack:
                prev_level = heading_stack[-1][0]
                if level > prev_level + 1:
                    violations.append({
                        'line': i + 1,
                        'current': f'H{level}: {text[:60]}',
                        'prev': f'H{prev_level}: {heading_stack[-1][2][:40]}',
                        'issue': f'Skipped H{prev_level+1} — jumped from H{prev_level} directly to H{level}'
                    })

            # Keep stack clean: pop headings at same or higher level
            while heading_stack and heading_stack[-1][0] >= level:
                heading_stack.pop()
            heading_stack.append((level, i, text))

        total_headings = len(re.findall(r'^#{1,6}\s+', content, re.MULTILINE))
        skip_count = len(violations)

        if total_headings == 0:
            return {
                'score': None, 'total_headings': 0, 'skip_count': 0,
                'violations': [], 'critical_issues': [], 'warnings': [],
                'recommendations': []
            }

        score = max(0, 100 - (skip_count * 25))

        issues = []
        if skip_count > 0:
            for v in violations[:3]:
                issues.append({
                    'issue': v['issue'],
                    'fix': f'Add an H{v["prev"][1]} section between "{v["prev"][6:]}" and "{v["current"][6:]}"',
                    'severity': 'high',
                })

        return {
            'score': score,
            'total_headings': total_headings,
            'skip_count': skip_count,
            'violations': violations,
            'critical_issues': [i['issue'] for i in issues if i['severity'] == 'high'],
            'warnings': [i['issue'] for i in issues if i['severity'] == 'medium'],
            'recommendations': [i['fix'] for i in issues],
        }

    def _extract_author_from_jsonld(self, content: str) -> Optional[Dict]:
        """Extract author Person data from JSON-LD schema blocks."""
        jsonld_blocks = re.findall(
            r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>',
            content, re.DOTALL | re.IGNORECASE
        )
        for block in jsonld_blocks:
            try:
                import json
                data = json.loads(block)
                items = data.get('@graph', [data])
                standalone_person = None
                embedded_author = None
                for item in items:
                    # Prefer standalone Person (has jobTitle/sameAs/knowsAbout)
                    if item.get('@type') == 'Person':
                        standalone_person = item
                    author = item.get('author')
                    if isinstance(author, dict) and author.get('@type') == 'Person':
                        embedded_author = author
                # Return standalone Person if available (richer fields), else embedded
                if standalone_person:
                    return standalone_person
                if embedded_author:
                    return embedded_author
            except (json.JSONDecodeError, ValueError):
                continue
        return None

    # ── Check 13: URL Quality ──

    def _check_url_quality(self, content: str, canonical: Optional[str] = None) -> Dict[str, Any]:
        """
        Check URL slug quality from content metadata or Nunjucks permalink.
        Only active when URL/slug data is extractable from the content.

        Args:
            content: Raw content (may contain frontmatter/HTML).
            canonical: Pre-extracted canonical path from frontmatter (e.g., '/blog/slug/').
        """
        slug = None

        # Use pre-extracted canonical if available
        if canonical:
            slug = canonical.strip('/').split('/')[-1] if '/' in canonical.strip('/') else canonical.strip('/')
        else:
            # Check for permalink/slug in .njk metadata
            slug_match = re.search(r'(?:permalink|slug|canonical)\s*[=:]\s*["\']?([^"\'\s}]+)', content, re.IGNORECASE)
            if slug_match:
                raw_slug = slug_match.group(1).strip().strip('"').strip("'")
                slug = raw_slug.strip('/').split('/')[-1] if '/' in raw_slug.strip('/') else raw_slug.strip('/')

            # Check for canonical URL in HTML
            if not slug:
                canon_match = re.search(r'<link[^>]*rel=["\']canonical["\'][^>]*href=["\']([^"\']+)["\']', content, re.IGNORECASE)
                if canon_match:
                    url = canon_match.group(1)
                    slug = url.split('/blog/')[-1].rstrip('/') if '/blog/' in url else url.rstrip('/').split('/')[-1]

            # Check for markdown-style metadata
            if not slug:
                slug_match = re.search(r'^\*\*(?:slug|url|permalink)\*\*\s*:\s*(.+)$', content, re.MULTILINE | re.IGNORECASE)
                if slug_match:
                    slug = slug_match.group(1).strip()

        if not slug:
            return {
                'score': None,  # N/A — cannot extract URL
                'slug': None,
                'issues_found': [],
                'critical_issues': [], 'warnings': [],
                'recommendations': ['Cannot extract URL from content — check manually: ≤5 words, lowercase, hyphens, no dates, no stop words.']
            }

        issues = []
        score = 100

        # Check 1: Contains uppercase
        if slug != slug.lower():
            score -= 20
            issues.append(f'URL contains uppercase letters: "{slug}" → use all lowercase')

        # Check 2: Contains underscores
        if '_' in slug:
            score -= 20
            issues.append(f'URL contains underscores: "{slug}" → use hyphens instead of underscores')

        # Check 3: Too many words (containing stop words)
        words = slug.replace('-', ' ').replace('/', ' ').split()
        url_stops = set(self.i18n.get('URL_STOP_WORDS')) if self.i18n else URL_STOP_WORDS
        stop_found = [w for w in words if w.lower() in url_stops]
        if len(stop_found) >= 2:
            score -= 15
            issues.append(f'URL contains {len(stop_found)} stop words ({", ".join(stop_found[:5])}): remove them for a cleaner URL')

        # Check 4: Contains date patterns
        for pat in URL_DATE_PATTERNS:
            if pat.search(slug):
                score -= 20
                issues.append(f'URL contains date pattern: "{slug}" → remove dates (URL should be permanent)')
                break

        # Check 5: Staged — 3-6 words=pass, 7-8=minor warning (-10), >8=deduction (-20)
        meaningful = [w for w in words if w.lower() not in url_stops]
        if len(meaningful) >= 9:
            score -= 20
            issues.append(f'URL too long ({len(meaningful)} meaningful words): target ≤6 words')
        elif len(meaningful) >= 7:
            score -= 10
            issues.append(f'URL slightly long ({len(meaningful)} meaningful words): tighten to ≤6 if possible')

        # Check 6: Special characters
        special = re.findall(r'[^a-z0-9\-/]', slug.lower())
        if special:
            score -= 15
            issues.append(f'URL contains special characters: {list(set(special))} → only lowercase letters, numbers, and hyphens allowed')

        score = max(0, min(100, score))

        formatted_issues = []
        for issue in issues:
            formatted_issues.append({
                'issue': issue,
                'fix': f'Rewrite URL using: lowercase, hyphens only, ≤5 meaningful words, no dates, no stop words. Example: /blog/[topic-slug]/',
                'severity': 'medium' if score >= 60 else 'high',
            })

        return {
            'score': score,
            'slug': slug,
            'issues_found': issues,
            'words': meaningful if 'meaningful' in dir() else words,
            'stop_words_found': stop_found if stop_found else [],
            'critical_issues': [i['issue'] for i in formatted_issues if i['severity'] == 'high'],
            'warnings': [i['issue'] for i in formatted_issues if i['severity'] == 'medium'],
            'recommendations': [i['fix'] for i in formatted_issues],
        }

    # ── Check 17: Static HTML Quality (5 Common Bugs from 5-Article Production Audit) ──

    def _check_static_html_quality(self, content: str) -> Dict[str, Any]:
        """Detect 5 recurring bugs discovered during production optimization of 5 DE articles."""
        score = 100
        issues = []

        # Bug 1: Tailwind mb-N!text-white missing space (CSS parse failure)
        tailwind_bug = re.findall(r'mb-\d+!text-white', content)
        if tailwind_bug:
            score -= 10
            issues.append(
                f'CSS parse error: "{tailwind_bug[0]}" is missing a space → '
                f'replace with "{tailwind_bug[0].replace("!", " !")}" in TOC heading. '
                f'Tailwind strips this class silently — white text may not render on dark background.'
            )

        # Bug 2: data-speakable attribute residual (deprecated in v3.0 — use .speakable class)
        data_speakable_count = len(re.findall(
            r'data-speakable', content
        ))
        if data_speakable_count > 0:
            score -= 5
            issues.append(
                f'{data_speakable_count} element(s) use data-speakable attribute → '
                f'replace with class="speakable" (v3.0 standard: CSS class selector, matches FAQPage .faq-answer naming convention). '
                f'Update Schema cssSelector to ["h1",".speakable"] if not already done.'
            )

        # Bug 3: ManufacturingBusiness residual (should be Organization)
        if '"@type": "ManufacturingBusiness"' in content:
            score -= 10
            issues.append(
                'Schema uses ManufacturingBusiness → replace with Organization + '
                'add legalName, publishingPrinciples, contactPoint fields per '
                'b2b-multilingual-metadata-standard.md §二'
            )

        # Bug 4: inLanguage lacks regional suffix (SEO-GEO precision)
        bare_lang = re.findall(r'"inLanguage":\s*"(de|en|es|fr)"(?!-)', content)
        if bare_lang:
            score -= 5
            issues.append(
                f'inLanguage "{bare_lang[0]}" lacks regional suffix → '
                f'replace with "{bare_lang[0]}-{bare_lang[0].upper()}" (e.g., de-DE, en-US, es-ES, fr-FR). '
                f'Regional suffix improves GEO citation matching for country-specific AI queries.'
            )

        # Bug 5: FAQ TOC anchor missing (broken anchor jump)
        has_faq_section = bool(re.search(r'<section[^>]*id=["\']faq["\']', content))
        toc_has_faq = bool(re.search(r'href=["\']#faq["\']', content))
        if has_faq_section and not toc_has_faq:
            score -= 5
            issues.append(
                'FAQ section has id="faq" but TOC has no <a href="#faq"> link → '
                'add FAQ link to Table of Contents for accessible anchor navigation'
            )

        # Collect issues by severity
        critical = [i for i in issues if 'ManufacturingBusiness' in i or 'CSS parse error' in i]
        warnings = [i for i in issues if i not in critical]

        return {
            'score': max(0, score),
            'tailwind_bug_found': len(tailwind_bug) > 0 if tailwind_bug else False,
            'data_speakable_count': data_speakable_count,
            'manufacturing_business_residual': '"@type": "ManufacturingBusiness"' in content,
            'bare_in_language': bare_lang[0] if bare_lang else None,
            'toc_faq_anchor_missing': has_faq_section and not toc_has_faq,
            'critical_issues': critical,
            'warnings': warnings,
            'recommendations': [i for i in issues],
        }

    # ── Check 14: Schema Validation (JSON-LD Syntax + Required Fields + Slash Consistency) ──

    def _check_schema_validation(self, content: str) -> Dict[str, Any]:
        """
        Validate JSON-LD Schema blocks for syntax errors, missing required fields,
        and trailing slash consistency with canonical URL.

        Returns 100 if all valid, deductions per violation:
        - JSON syntax/parse error: -30
        - Missing required field (author.sameAs, publisher.logo, mainEntityOfPage.@id): -15 each
        - Trailing slash mismatch between Schema @id and canonical: -10
        """
        import json as json_lib

        score = 100
        issues = []

        # Extract all JSON-LD blocks
        jsonld_blocks = re.findall(
            r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>',
            content, re.DOTALL
        )

        if not jsonld_blocks:
            return {
                'score': 40,
                'issues_found': ['No JSON-LD Schema block found — Schema is mandatory for SEO'],
                'critical_issues': ['No JSON-LD Schema block found'],
                'warnings': [],
                'recommendations': ['Add JSON-LD Schema with at minimum: BlogPosting, FAQPage, BreadcrumbList, Organization'],
            }

        # ── Step 1: Syntax validation ──
        parsed_blocks = []
        for idx, block in enumerate(jsonld_blocks):
            try:
                parsed = json_lib.loads(block.strip())
                parsed_blocks.append(parsed)
            except json_lib.JSONDecodeError as e:
                score -= 30
                issues.append(f'JSON-LD syntax error in block #{idx + 1}: {str(e)[:120]}')

        if not parsed_blocks:
            return {
                'score': max(0, score),
                'issues_found': issues,
                'critical_issues': issues,
                'warnings': [],
                'recommendations': ['Fix JSON-LD syntax errors. Validate with https://validator.schema.org/'],
            }

        # ── Step 2: Extract all @graph nodes ──
        all_nodes = []
        for block in parsed_blocks:
            if isinstance(block, dict):
                graph = block.get('@graph', [block])
                if isinstance(graph, list):
                    all_nodes.extend(graph)
                else:
                    all_nodes.append(graph)

        # ── Step 3: Check required fields per type ──
        required_checks = {
            'BlogPosting': ['author', 'publisher', 'mainEntityOfPage'],
            'Person': ['sameAs'],
            'Organization': ['logo'],
        }

        for node in all_nodes:
            if not isinstance(node, dict):
                continue
            node_type = node.get('@type', '')
            for schema_type, fields in required_checks.items():
                if node_type == schema_type or (isinstance(node_type, list) and schema_type in node_type):
                    for field in fields:
                        if field == 'sameAs':
                            author = node if node_type in ('Person',) else node.get('author', {})
                            if isinstance(author, dict):
                                same_as = author.get('sameAs', [])
                                if not same_as:
                                    score -= 15
                                    issues.append(f'Person (author) missing "sameAs" field → add LinkedIn URL')
                            elif isinstance(author, str):
                                pass  # author is a string reference — assume it's fine
                        elif field == 'logo':
                            # For Organization nodes: check logo directly on the node
                            if node_type == 'Organization':
                                logo = node.get('logo', {})
                                if not logo or not isinstance(logo, dict) or not logo.get('url'):
                                    score -= 15
                                    issues.append(f'Organization missing "logo" ImageObject with url → add for Rich Result eligibility')
                            else:
                                # For BlogPosting etc: check publisher's logo, resolving @id if needed
                                publisher = node.get('publisher', {})
                                if isinstance(publisher, dict):
                                    pub_id = publisher.get('@id', '')
                                    if pub_id and not publisher.get('logo'):
                                        # Resolve @id reference across @graph nodes
                                        import re as _re
                                        pub_id_normalized = _re.sub(r'/(es|de|fr|ru)/', '/', pub_id)
                                        for ref_node in all_nodes:
                                            if isinstance(ref_node, dict):
                                                ref_node_id = ref_node.get('@id', '')
                                                ref_id_normalized = _re.sub(r'/(es|de|fr|ru)/', '/', ref_node_id)
                                                if ref_node_id == pub_id or ref_id_normalized == pub_id_normalized:
                                                    publisher = ref_node
                                                    break
                                    if not publisher.get('logo'):
                                        score -= 15
                                        issues.append(f'{node_type} publisher missing "logo" field → add Organization logo ImageObject')
                        elif field == 'mainEntityOfPage':
                            if not node.get('mainEntityOfPage'):
                                score -= 15
                                issues.append(f'{node_type} missing "mainEntityOfPage" field → add WebPage @id')

        # ── Step 4: Trailing slash consistency ──
        canonical_url = None
        canon_match = re.search(r'<link[^>]*rel=["\']canonical["\'][^>]*href=["\']([^"\']+)["\']', content, re.IGNORECASE)
        if not canon_match:
            # Try frontmatter
            canon_match = re.search(r'(?:canonical|permalink)\s*[=:]\s*["\']?([^"\'\s}]+)', content, re.IGNORECASE)
        if canon_match:
            canonical_url = canon_match.group(1).strip().strip('"').strip("'")
            if not canonical_url.startswith('http'):
                canonical_url = 'https://www.wowohcool.com' + ('' if canonical_url.startswith('/') else '/') + canonical_url
            canonical_has_slash = canonical_url.rstrip('/') + '/' == canonical_url if canonical_url.endswith('/') else False

        if canonical_url:
            # Find all @id values ending with /blog/ or /about/
            id_urls = re.findall(r'"@id":\s*"([^"]+)"', content)
            id_urls += re.findall(r'"item":\s*"([^"]+)"', content)
            slash_mismatches = []
            for url in id_urls:
                if '/blog/' in url or '/about' in url:
                    url_has_slash = url.endswith('/')
                    canonical_has_slash = canonical_url.rstrip('/') + '/' == canonical_url if canonical_url.endswith('/') else canonical_url == canonical_url.rstrip('/')
                    if url_has_slash != canonical_has_slash:
                        slash_mismatches.append(url)

            if slash_mismatches:
                score -= 10
                issues.append(
                    f'Trailing slash mismatch between canonical ({canonical_url}) '
                    f'and Schema URLs: {slash_mismatches[:3]} → all must use same trailing-slash format'
                )

        # ── Step 5: .speakable class + SpeakableSpecification consistency (v3.0) ──
        # v3.0 architecture: BlogPosting cssSelector ["h1",".speakable"] → H1 auto-accounted + 2×.speakable = 3 nodes
        # FAQPage has independent speakable via [".faq-answer"]
        # data-speakable attribute is DEPRECATED
        has_speakable_class = bool(re.search(r'class=["\'][^"\']*\bspeakable\b', content))
        has_speakable_attr = bool(re.search(r'data-speakable', content))
        has_any_speakable = has_speakable_attr or has_speakable_class
        has_speakable_spec = bool(re.search(r'SpeakableSpecification', content))

        # Count speakable nodes (strip <script> blocks first — JSON-LD cssSelector strings are NOT DOM anchors)
        body_only = re.sub(r'<script[^>]*>.*?</script>', '', content, flags=re.DOTALL)
        speakable_class_count = len(re.findall(r'class=["\'][^"\']*\bspeakable\b', body_only))
        speakable_attr_count = len(re.findall(r'data-speakable', body_only))
        total_speakable = speakable_class_count + speakable_attr_count

        if not has_speakable_spec:
            score -= 10
            issues.append('Missing SpeakableSpecification in JSON-LD Schema → add BlogPosting speakable with cssSelector: ["h1",".speakable"] + FAQPage speakable with cssSelector: [".faq-answer"]')
        elif has_speakable_spec and not has_any_speakable:
            score -= 5
            issues.append('SpeakableSpecification present in Schema but no HTML element has class="speakable" → add speakable class to Hook + Key Takeaways TL;DR (2 nodes, + H1 from cssSelector = 3 total)')
        elif total_speakable == 0:
            score -= 3
            issues.append('Speakable node count: 0 → add class="speakable" to Hook + Key Takeaways TL;DR (2 nodes, + H1 from cssSelector = 3 total)')
        elif total_speakable > 3:
            score -= 3
            issues.append(f'Speakable node count: {total_speakable} (recommended: exactly 3). More than 3 dilutes AI extraction weight. H1 is auto-counted via cssSelector. Target: 2× class="speakable" (Hook + Key Takeaways TL;DR). Remove any speakable class from FAQ answers or other elements.')

        # ── Step 6: Organization contact completeness (v2) ──
        org_nodes = [n for n in all_nodes if isinstance(n, dict) and n.get('@type') == 'Organization']
        for org in org_nodes:
            address = org.get('address', {})
            if not address or not isinstance(address, dict) or not address.get('streetAddress'):
                score -= 10
                issues.append('Organization missing "address" (PostalAddress) → add streetAddress, addressLocality, addressRegion, postalCode, addressCountry for B2B entity verification')
            cp = org.get('contactPoint', {})
            if not cp or not isinstance(cp, dict):
                score -= 10
                issues.append('Organization missing "contactPoint" with telephone + email → B2B trust signal weakened')
            else:
                if not cp.get('telephone'):
                    score -= 5
                    issues.append('Organization contactPoint missing "telephone" → add for B2B entity verification')
                if not cp.get('email'):
                    score -= 5
                    issues.append('Organization contactPoint missing "email" → add for B2B entity verification')

        # ── Step 7: Citation ↔ Fuentes alignment (v2) ──
        citation_count = 0
        for node in all_nodes:
            if isinstance(node, dict) and node.get('@type') == 'BlogPosting':
                citations = node.get('citation', [])
                if isinstance(citations, list):
                    citation_count = len(citations)
                break
        # Count visible sources in Fuentes/References section
        sources_section = re.search(
            r'(?:Fuentes y Referencias|Sources &? References|Quellen &? Referenzen)',
            content, re.IGNORECASE
        )
        if sources_section:
            # Count <li> items from the sources section to the next </section> or end of shared wrapper
            section_start = sources_section.start()
            section_end_match = re.search(r'</section>', content[section_start:])
            if section_end_match:
                section_text = content[section_start:section_start + section_end_match.end()]
                visible_source_count = len(re.findall(r'<li>', section_text))
                if citation_count < visible_source_count:
                    score -= 10
                    issues.append(f'Citation count mismatch: Schema has {citation_count} but visible Sources section has ~{visible_source_count} links → under-reporting wastes AI citation signals. Add all visible sources to citation array.')

        # ── Step 8: timeRequired ↔ visible display (v2) ──
        time_match = re.search(r'"timeRequired":\s*"PT(\d+)M"', content)
        display_match = re.search(r'(\d+)\s*min\s*(?:de\s*)?lectura|(\d+)\s*min\s*read', content)
        if time_match and display_match:
            schema_min = int(time_match.group(1))
            display_min = int(display_match.group(1) or display_match.group(2))
            if schema_min != display_min:
                score -= 5
                issues.append(f'timeRequired mismatch: Schema says PT{schema_min}M but visible display shows {display_min} min → align them')

        # ── Step 9: Author @id dedup (v2) ──
        bp_author_is_inline = False
        person_has_id = False
        worksfor_is_inline = False
        for node in all_nodes:
            if isinstance(node, dict):
                if node.get('@type') == 'BlogPosting':
                    author = node.get('author', {})
                    if isinstance(author, dict) and '@type' in author and author.get('@type') == 'Person':
                        bp_author_is_inline = True
                if node.get('@type') == 'Person':
                    if node.get('@id'):
                        person_has_id = True
                    wf = node.get('worksFor', {})
                    if isinstance(wf, dict) and '@type' in wf:
                        worksfor_is_inline = True
        if bp_author_is_inline:
            score -= 10
            issues.append('BlogPosting.author is inline Person — use @id reference to Person node to avoid entity duplication')
        if not person_has_id:
            score -= 10
            issues.append('Person node missing @id — BlogPosting.author cannot reference it. Add @id for entity deduplication')
        if worksfor_is_inline:
            score -= 5
            issues.append('Person.worksFor is inline Organization — use @id reference to main Organization node')

        # ── Step 10: TOC ↔ FAQ anchor consistency ──
        has_faq_section = bool(re.search(r'<section[^>]*id=["\']faq["\']', content))
        toc_has_faq_link = bool(re.search(r'href=["\']#faq["\']', content))

        if has_faq_section and not toc_has_faq_link:
            score -= 5
            issues.append('FAQ section present (id="faq") but TOC has no #faq link → add <a href="#faq"> to Table of Contents')
        elif not has_faq_section and toc_has_faq_link:
            score -= 10
            issues.append('TOC links to #faq but no <section id="faq"> found in body → add FAQ section or fix anchor')

        # ── Step 7: Rule 1 — Body-Schema FAQ consistency ──
        body_faq_qs = self._extract_body_faq_questions(content)
        schema_faq_qs = []
        for block in parsed_blocks:
            if isinstance(block, dict):
                for node in block.get('@graph', [block]):
                    if isinstance(node, dict) and node.get('@type') == 'FAQPage':
                        for q in node.get('mainEntity', []):
                            schema_faq_qs.append(q.get('name', ''))

        if body_faq_qs and schema_faq_qs:
            mismatch_count = 0
            for i, (body_q, schema_q) in enumerate(zip(body_faq_qs, schema_faq_qs)):
                if body_q.strip() != schema_q.strip():
                    mismatch_count += 1
            if len(body_faq_qs) != len(schema_faq_qs):
                score -= 15
                issues.append(f'FAQ count mismatch: Body has {len(body_faq_qs)} questions, Schema has {len(schema_faq_qs)} → must match exactly (Rule 1)')
            elif mismatch_count > 0:
                score -= 10
                issues.append(f'{mismatch_count} FAQ question(s) differ between body and Schema → Rule 1 requires word-for-word match')
            # If 0 mismatches and count matches, no deduction — body-schema consistency verified

        score = max(0, min(100, score))

        return {
            'score': score,
            'issues_found': issues,
            'blocks_found': len(jsonld_blocks),
            'parsed_ok': len(parsed_blocks),
            'critical_issues': issues if score < 70 else [],
            'warnings': issues if 70 <= score < 90 else [],
            'recommendations': [
                'Validate all JSON-LD blocks at https://validator.schema.org/',
                'Ensure author.sameAs contains LinkedIn URL',
                'Ensure publisher.logo is an ImageObject with url',
                'Ensure mainEntityOfPage.@id matches canonical URL with same trailing-slash format',
            ] if score < 100 else [],
        }

    # ── Check 16: Factory Data Canonical Verification ──

    def _check_factory_data_canonical(self, content: str) -> Dict[str, Any]:
        """
        Verify factory data points against canonical source (factory-data-canonical.md).

        Scans article content for MOQ, lead times, certification costs, defect rates,
        factory size, R&D team size, and export coverage — flags any values outside
        the canonical ranges defined in context/factory-data-canonical.md.

        Returns N/A (score=None) if no factory data points are detected.
        """
        result = check_factory_data(content)
        return {
            'score': result['score'],
            'violations': result.get('violations', []),
            'data_points_found': result.get('data_points_found', 0),
            'data_points_checked': result.get('data_points_checked', len(FACTORY_RULES)),
            'critical_issues': result.get('critical_issues', []),
            'warnings': result.get('warnings', []),
            'recommendations': result.get('recommendations', []),
        }

    # ── Check 15: Cross-Reference Consistency (Rule 8) ──
    # Two data categories: operational (MOQ, pricing, lead time — must match everywhere)
    # vs market research (CAGR, adoption rates — can vary by geography, must match within article)

    def _check_cross_reference_consistency(self, content: str) -> Dict[str, Any]:
        """
        Verify OPERATIONAL numbers are consistent between TL;DR and FAQ sections.
        Rule 8: Same operational data point must have same value in TL;DR, body, and FAQ.
        Market research data is excluded — it legitimately varies by region.
        """
        # Extract sections — use localized anchors when available
        tldr_anchors = self.i18n.get_nested('CROSS_REF_ANCHORS', 'tldr') if self.i18n else ['Key Takeaways']
        toc_anchors = self.i18n.get_nested('CROSS_REF_ANCHORS', 'toc') if self.i18n else ['Table of Contents']
        faq_anchors = self.i18n.get_nested('CROSS_REF_ANCHORS', 'faq') if self.i18n else ['Frequently Asked Questions']

        tldr_start = -1
        tldr_end = -1
        faq_start = -1
        for anchor in tldr_anchors:
            tldr_start = content.find(anchor)
            if tldr_start >= 0:
                break
        for anchor in toc_anchors:
            tldr_end = content.find(anchor)
            if tldr_end >= 0:
                break
        for anchor in faq_anchors:
            faq_start = content.find(anchor)
            if faq_start >= 0:
                break

        if tldr_start < 0 or faq_start < 0:
            return {
                'score': None,  # N/A — need both TL;DR and FAQ to compare
                'discrepancies': [],
                'critical_issues': [], 'warnings': [],
                'recommendations': ['Cannot verify cross-reference consistency — both TL;DR and FAQ sections required.']
            }

        tldr_text = content[tldr_start:tldr_end] if tldr_end > 0 else content[tldr_start:tldr_start + 2000]
        faq_text = content[faq_start:faq_start + 3000]
        # Body = everything between TOC and FAQ (exclude TL;DR and FAQ themselves)
        body_start = tldr_end if tldr_end > 0 else tldr_start + 1000
        body_end = faq_start
        body_text = content[body_start:body_end] if body_end > body_start else ''

        # Context-aware patterns: (number_pattern, context_keyword, label)
        # Only flag when the SAME metric appears in both sections with different values
        patterns = [
            (r'(\d[\d,]*)\s*units?', 'moq|minimum.*order', 'MOQ/unit count'),
            (r'(\d+)[-\s]*(\d+)\s*weeks?', 'certif|wpc|testing|lead|production', 'certification/lead weeks'),
            (r'(\d+)[-\s]*(\d+)\s*days?', 'lead|production|shipping|transit|turnaround', 'production/shipping days'),
            (r'(\d+)[-\s]*(\d+)\s*%', 'certif|efficiency|margin|premium|cagr|cost.*reduc', 'percentage'),
        ]

        discrepancies = []
        for pattern, context_kw, label in patterns:
            # Only compare if BOTH sections mention the context keyword
            if not re.search(context_kw, tldr_text, re.IGNORECASE):
                continue
            if not re.search(context_kw, faq_text, re.IGNORECASE):
                continue

            tldr_nums = set(re.findall(pattern, tldr_text, re.IGNORECASE))
            faq_nums = set(re.findall(pattern, faq_text, re.IGNORECASE))

            if not tldr_nums or not faq_nums:
                continue

            tldr_flat = {str(t).replace("'","").replace("(","").replace(")","") for t in tldr_nums}
            faq_flat = {str(f).replace("'","").replace("(","").replace(")","") for f in faq_nums}
            common = tldr_flat & faq_flat
            if not common and len(tldr_flat) >= 1 and len(faq_flat) >= 1:
                discrepancies.append({
                    'data_point': label,
                    'tldr_values': sorted(tldr_flat)[:3],
                    'faq_values': sorted(faq_flat)[:3],
                    'issue': f'{label} differs between TL;DR and FAQ: TL;DR has {sorted(tldr_flat)[:2]}, FAQ has {sorted(faq_flat)[:2]}'
                })

        # ── Factory Canonical Data Cross-Reference ──
        # Verify operational numbers against factory-data-canonical.md golden values
        canonical_checks = [
            # (regex pattern, canonical range, label, severity)
            (r'(?:MOQ|minimum.*order).*?(\d[\d,]*)', (500, 1000), 'MOQ standard', 'high'),
            (r'OEM.*?(?:lead|production).*?(\d+)\s*(?:-|to)?\s*(\d+)?\s*days', (25, 30), 'OEM lead time', 'high'),
            (r'ODM.*?(?:lead|production).*?(\d+)\s*(?:-|to)?\s*(\d+)?\s*days', (45, 60), 'ODM lead time', 'medium'),
            (r'(\d+)%?\s*deposit', (30, 30), 'deposit percentage', 'high'),
            (r'CE.*?FCC.*?RoHS.*?\$?([\d,]+)\s*(?:-|to)?\s*\$?([\d,]+)', (2000, 4000), 'CE/FCC/RoHS package', 'medium'),
        ]

        canonical_issues = []
        for pattern, (lo, hi), label, severity in canonical_checks:
            matches = re.findall(pattern, content, re.IGNORECASE)
            for m in matches:
                if isinstance(m, tuple):
                    vals = [int(v.replace(',', '')) for v in m if v and v.strip() and v.replace(',', '').isdigit()]
                else:
                    vals = [int(m.replace(',', ''))]

                for v in vals:
                    # Heuristic: ignore values clearly outside B2B context (e.g., dates, voltages)
                    if v < 1 or v > 100000:
                        continue
                    if label == 'deposit percentage' and (v < 10 or v > 80):
                        continue
                    if label == 'MOQ standard' and 500 <= v <= 1000:
                        continue  # in range
                    if v < lo or v > hi:
                        canonical_issues.append({
                            'issue': f'{label}: found "{v}" — outside canonical range {lo}-{hi}. '
                                     f'Verify against context/factory-data-canonical.md',
                            'fix': f'Update {label} to match canonical range {lo}-{hi} '
                                   f'or confirm this is an intentional exception with factory data.',
                            'severity': severity,
                        })
                        break  # one violation per pattern per content section is enough

        score = max(0, 100 - (len(discrepancies) * 20) - (len(canonical_issues) * 15))
        issues = []
        if discrepancies:
            for d in discrepancies:
                issues.append({
                    'issue': d['issue'],
                    'fix': 'Ensure ' + str(d['data_point']) + ' is identical in TL;DR, body, and FAQ sections. '
                           'B2B buyers cross-check numbers across the page — inconsistencies destroy trust.',
                    'severity': 'high' if len(discrepancies) >= 2 else 'medium',
                })
        issues.extend(canonical_issues)

        return {
            'score': score,
            'discrepancies': discrepancies,
            'discrepancy_count': len(discrepancies),
            'canonical_violations': canonical_issues,
            'canonical_violation_count': len(canonical_issues),
            'critical_issues': [i['issue'] for i in issues if i['severity'] == 'high'],
            'warnings': [i['issue'] for i in issues if i['severity'] == 'medium'],
            'recommendations': [i['fix'] for i in issues],
        }

    # ── Helpers: Content Parsing ──

    def _strip_metadata(self, content: str) -> str:
        """Remove YAML/markdown metadata blocks and frontmatter."""
        # Remove YAML frontmatter (--- ... ---)
        content = re.sub(r'^---\s*\n.*?\n---\s*\n', '', content, flags=re.DOTALL)
        # Remove **Key**: value metadata lines
        content = re.sub(r'^\*\*[^*]+\*\*\s*:\s*.+$', '', content, flags=re.MULTILINE)
        # Remove HTML comments
        content = re.sub(r'<!--.*?-->', '', content, flags=re.DOTALL)
        return content.strip()

    def _skip_to_body_start(self, content: str) -> str:
        """Skip past H1 and post-H1 metadata (date, author, breadcrumbs) to find real body text."""
        lines = content.split('\n')
        h1_idx = -1
        for i, line in enumerate(lines):
            if re.match(r'^#\s+', line):
                h1_idx = i
                break
        if h1_idx < 0:
            return content  # no H1 found, use as-is

        # Skip lines after H1 that are clearly metadata/navigation, not body content
        metadata_patterns = [
            r'^(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2},?\s*\d{4}',  # date
            r'^\d+\s*min\s*read',           # read time
            r'^Updated\s+[A-Z]',            # updated date
            r'^[A-Z][a-z]+\s+\d{1,2},\s*\d{4}',  # "June 25, 2026"
            r'^\d{1,2}\.\d{1,2}\.\d{4}',    # "25.06.2026"
            r'^By\s+[A-Z]',                 # "By Nina Nico"
            r'^[A-Z][a-z]+\s+[A-Z][a-z]+$', # Two-word name (author)
        ]
        nav_patterns = [
            r'^(?:Technology|Guide|Comparison|Overview|Manufacturing|Sourcing|'
            r'Pricing|Checklist|Strategy|Solutions?|Explained|Works?)$',
        ]

        body_start = h1_idx + 1
        max_skip = 15  # don't skip more than 15 lines
        skipped = 0
        while body_start < len(lines) and skipped < max_skip:
            line = lines[body_start].strip()
            if not line:
                body_start += 1
                continue
            is_meta = any(re.match(p, line) for p in metadata_patterns)
            is_nav = any(re.match(p, line) for p in nav_patterns)
            is_short = len(line) < 50 and not line.endswith('.')
            if is_meta or is_nav or (is_short and skipped < 8):
                body_start += 1
                skipped += 1
                continue
            # If line is substantial (>50 chars or ends with sentence-ending punctuation), we've hit body
            if len(line) > 50 or re.search(r'[.!?]$', line):
                break
            body_start += 1
            skipped += 1

        return '\n'.join(lines[body_start:])

    def _count_intro_paragraphs(self, body_after_h1: str) -> int:
        """Count substantial text paragraphs between H1 and TL;DR/TOC/first H2."""
        # Find the end of the intro area
        tldr_anchors_list = self.i18n.get('TLDR_KEYWORDS') if self.i18n else ['Key Takeaways', 'TL;DR']
        toc_anchors_list = self.i18n.get_nested('CROSS_REF_ANCHORS', 'toc') if self.i18n else ['Table of Contents']
        all_intro_anchors = '|'.join(re.escape(a) for a in tldr_anchors_list + toc_anchors_list)
        tldr_m = re.search(rf'(?:{all_intro_anchors})', body_after_h1)
        first_h2 = re.search(r'^##\s+(.+)$', body_after_h1, re.MULTILINE)
        end = tldr_m.start() if tldr_m else (first_h2.start() if first_h2 else len(body_after_h1))
        intro = body_after_h1[:end] if end > 0 else body_after_h1

        # Split into blocks by blank lines
        blocks = [b.strip() for b in intro.split('\n\n') if len(b.strip()) > 40]
        # Filter out non-content: dates, author names, read-time, images, breadcrumbs, quick-answer boxes
        skip_patterns = [
            r'^(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2}',
            r'^\d+\s*min\s*read', r'^Updated\s+[A-Z]', r'^By\s+[A-Z]',
            r'^!\[',  # markdown image
            r'^QUICK\s+ANSWER', r'^[A-Z][a-z]+\s+[A-Z][a-z]+$',  # two-word line
        ]
        real_paras = [b for b in blocks if not any(re.match(p, b) for p in skip_patterns)]
        return len(real_paras)

    def _extract_sentences(self, text: str) -> List[str]:
        """Split text into sentences."""
        # Split on .!? followed by space/newline, keeping the delimiter
        raw = re.split(r'(?<=[.!?])\s+', text)
        return [s.strip() for s in raw if len(s.strip()) > 10]

    def _extract_h2s(self, content: str) -> List[str]:
        """Extract all H2 heading texts (supports both Markdown and HTML formats)."""
        h2s = re.findall(r'^##\s+(.+)$', content, re.MULTILINE)
        if not h2s:
            # Try HTML <h2> tags (for .njk/.html files)
            h2s = re.findall(r'<h2[^>]*?>(.*?)</h2>', content, re.DOTALL)
            h2s = [re.sub(r'<[^>]+>', '', h).strip() for h in h2s]
        return [h.strip() for h in h2s]

    def _is_excluded_h2(self, h2_text: str) -> bool:
        """Check if H2 is a non-content heading (TOC, references, etc.)."""
        excluded = [
            'table of contents', 'contents', 'related articles', 'sources',
            'references', 'frequently asked questions', 'faq', 'conclusion',
            'summary', 'about the author', 'further reading', 'you may also like',
            'related posts', 'comments', 'disclaimer', 'appendix',
            'inhaltsverzeichnis', 'verwandte artikel', 'referenzen',
            'table des matières', 'articles connexes', 'références',
            # Extended i18n from registry
            'quellen', 'weitere artikel', 'häufig gestellte fragen', 'häufige fragen',
            'tabla de contenidos', 'índice', 'artículos relacionados', 'fuentes',
            'preguntas frecuentes', 'sommaire', 'questions fréquentes',
            'fazit', 'conclusión', 'conclusione',
        ]
        h2_lower = h2_text.lower().strip('#').strip()
        return any(exc in h2_lower for exc in excluded)

    def _classify_article_type(self, content: str) -> str:
        """Auto-classify article as technical, procurement, or oem_core."""
        content_lower = content.lower()
        h1_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
        if not h1_match:
            # Try HTML <h1> tag
            h1_match = re.search(r'<h1[^>]*?>(.*?)</h1>', content, re.DOTALL)
        h1_text = h1_match.group(1).lower() if h1_match else ''
        if h1_match and re.search(r'<[^>]+>', h1_text):
            h1_text = re.sub(r'<[^>]+>', '', h1_text)

        # Use H1 + first 2000 chars + full H2 texts for better coverage
        h2_md = re.findall(r'^##\s+(.+)$', content, re.MULTILINE)
        if not h2_md:
            h2_html = re.findall(r'<h2[^>]*?>(.*?)</h2>', content, re.DOTALL)
            h2_md = [re.sub(r'<[^>]+>', '', h).strip() for h in h2_html]
        h2s = ' '.join(h2_md)
        combined = h1_text + ' ' + content_lower[:2000] + ' ' + h2s.lower()

        # Check OEM Core indicators
        oem_score = sum(1 for t in OEM_CORE_TOPICS if t in combined)
        if oem_score >= 2:
            return 'oem_core'

        # Check Procurement indicators
        proc_score = sum(1 for t in PROCUREMENT_TOPICS if t in combined)
        if proc_score >= 2:
            return 'procurement'

        # Default to technical
        return 'technical'

    def _extract_h3_blocks(self, content: str) -> List[Dict[str, Any]]:
        """Extract H3 headings and their following content blocks."""
        blocks = []
        lines = content.split('\n')
        for i, line in enumerate(lines):
            stripped = line.strip()
            if re.match(r'^###\s+', stripped):
                heading = re.sub(r'^###\s+', '', stripped).strip()
                first_block_chars = []
                is_table = False
                for j in range(i + 1, min(i + 50, len(lines))):
                    next_line = lines[j].strip()
                    # Stop at next heading (any level)
                    if re.match(r'^#{1,4}\s+', next_line):
                        break
                    # Table rows = auto-pass
                    if next_line.startswith('|') and '|' in next_line[1:]:
                        is_table = True
                        break
                    # Blank line after content = paragraph boundary, stop collecting
                    if not next_line:
                        if first_block_chars:
                            break  # paragraph ended, stop at boundary
                        continue  # skip leading blank lines before first paragraph
                    first_block_chars.append(next_line)
                    # Stop collecting once we have enough chars (target: 100-200)
                    text_so_far = ' '.join(first_block_chars)
                    if len(text_so_far) >= 250:
                        break
                first_block = ' '.join(first_block_chars)
                blocks.append({
                    'heading': heading,
                    'first_block': first_block,
                    'is_table': is_table,
                    'level': 'H3',
                })
        return blocks

    def _extract_h4_blocks(self, content: str) -> List[Dict[str, Any]]:
        """Extract H4 headings and their following content blocks."""
        blocks = []
        lines = content.split('\n')
        for i, line in enumerate(lines):
            stripped = line.strip()
            if re.match(r'^####\s+', stripped):
                heading = re.sub(r'^####\s+', '', stripped).strip()
                first_block_chars = []
                is_table = False
                for j in range(i + 1, min(i + 50, len(lines))):
                    next_line = lines[j].strip()
                    if re.match(r'^#{1,4}\s+', next_line):
                        break
                    if next_line.startswith('|') and '|' in next_line[1:]:
                        is_table = True
                        break
                    if not next_line:
                        if first_block_chars:
                            break
                        continue
                    first_block_chars.append(next_line)
                    text_so_far = ' '.join(first_block_chars)
                    if len(text_so_far) >= 250:
                        break
                first_block = ' '.join(first_block_chars)
                blocks.append({
                    'heading': heading,
                    'first_block': first_block,
                    'is_table': is_table,
                    'level': 'H4',
                })
        return blocks

    def _extract_faq_questions(self, content: str) -> List[str]:
        """Extract FAQ questions from content."""
        questions = []

        # Find FAQ section (HTML or markdown heading)
        faq_match = re.search(
            r'(?:<h[23][^>]*>|###\s*|##\s*)\s*(?:\d+\.\s*)?(?:FAQ|Frequently\s+Asked\s+Questions|'
            r'Common\s+Questions|Questions?\s+(?:&|and)\s+Answers?|'
            r'Häufig\s+gestellte\s+Fragen|Preguntas?\s+Frecuentes?|'
            r'Questions?\s+Fréquentes?)',
            content, re.IGNORECASE
        )

        if faq_match:
            # Get content after FAQ heading
            faq_section = content[faq_match.end():]
            # Stop at next H2 (markdown or HTML) or end of content
            next_h2 = re.search(r'(?:^##\s+|<h2[^>]*>)', faq_section, re.MULTILINE)
            if next_h2:
                faq_section = faq_section[:next_h2.start()]

            # Extract questions: HTML H3/H4, markdown ###/####, bold text, or lines ending with ?
            q_patterns = [
                r'<h3[^>]*>(.+?\?)</h3>',
                r'<h4[^>]*>(.+?\?)</h4>',
                r'\*\*(.+?\?)\*\*',
                r'^###\s+(.+?\?)',
                r'^####\s+(.+?\?)',
                r'^\d+\.\s+\*\*(.+?\?)\*\*',
                r'^[-*]\s+(.+?\?)',
            ]
            for pat in q_patterns:
                matches = re.findall(pat, faq_section, re.MULTILINE)
                questions.extend(m.strip() for m in matches)
        else:
            # No explicit FAQ section — look for Q&A patterns throughout
            qa_pattern = r'<h[34][^>]*>(.+?\?)</h[34]>'
            questions = re.findall(qa_pattern, content)
            if not questions:
                questions = re.findall(r'\*\*(.+?\?)\*\*', content)

        # Also catch lines that are standalone questions
        if not questions:
            questions = re.findall(r'<h[34][^>]*>(.{15,150}?\?)</h[34]>', content)
        if not questions:
            questions = re.findall(r'\*\*(.{15,150}?\?)\*\*', content)

        return questions

    def _extract_body_faq_questions(self, content: str) -> List[str]:
        """Extract FAQ questions from raw HTML body (for Body-Schema consistency check)."""
        questions = []
        faq_section_match = re.search(r'<section[^>]*id=["\']faq["\'][^>]*>', content, re.IGNORECASE)
        if not faq_section_match:
            faq_section_match = re.search(r'<div[^>]*id=["\']faq["\'][^>]*>', content, re.IGNORECASE)
        if faq_section_match:
            faq_section = content[faq_section_match.start():]
            # Find the FAQ section's own closing </section> (stop there, don't extend to author-bio)
            depth = 0
            pos = len('<section')  # skip past the opening <section tag
            end_pos = len(faq_section)
            while pos < len(faq_section):
                next_open = faq_section.find('<section', pos)
                next_close = faq_section.find('</section>', pos)
                if next_close < 0:
                    break
                if 0 <= next_open < next_close:
                    depth += 1
                    pos = next_open + 8
                else:
                    if depth == 0:
                        end_pos = next_close
                        break
                    depth -= 1
                    pos = next_close + 10
            faq_section = faq_section[:end_pos]
            # Extract H3 questions (only inside the FAQ section, not CTA between FAQ and Author Bio)
            questions = re.findall(r'<h3[^>]*>([^<]+)</h3>', faq_section)
        return [q.strip() for q in questions]

    def _extract_body_faq_answers(self, content: str) -> List[str]:
        """Extract FAQ answer text from raw HTML body (for answer-side B2B scoring)."""
        answers = []
        faq_section_match = re.search(r'<section[^>]*id=["\']faq["\'][^>]*>', content, re.IGNORECASE)
        if not faq_section_match:
            faq_section_match = re.search(r'<div[^>]*id=["\']faq["\'][^>]*>', content, re.IGNORECASE)
        if faq_section_match:
            faq_section = content[faq_section_match.start():]
            depth = 0
            pos = len('<section')
            end_pos = len(faq_section)
            while pos < len(faq_section):
                next_open = faq_section.find('<section', pos)
                next_close = faq_section.find('</section>', pos)
                if next_close < 0:
                    break
                if 0 <= next_open < next_close:
                    depth += 1
                    pos = next_open + 8
                else:
                    if depth == 0:
                        end_pos = next_close
                        break
                    depth -= 1
                    pos = next_close + 10
            faq_section = faq_section[:end_pos]
            # Extract text from <p> elements inside FAQ items (faq-answer divs or direct children)
            answer_blocks = re.findall(
                r'<p[^>]*class=["\'][^"\']*faq-answer[^"\']*["\'][^>]*>(.*?)</p>',
                faq_section, re.DOTALL
            )
            if not answer_blocks:
                # Fallback: extract all <p> text after each <h3> within FAQ section
                answer_blocks = re.findall(
                    r'<p[^>]*>(.*?)</p>',
                    faq_section, re.DOTALL
                )
            answers = [re.sub(r'<[^>]+>', ' ', a).strip() for a in answer_blocks]
            answers = [re.sub(r'\s+', ' ', a).strip() for a in answers if a.strip()]
        return answers


# ── Module-level convenience function ──

def audit_b2b_content(
    content: str,
    article_type: Optional[str] = None,
    meta_title: Optional[str] = None,
    author_bio: Optional[str] = None,
    language: str = 'en',
    syntax_only: bool = False,
    verify_search_demand: bool = False
) -> Dict[str, Any]:
    """
    Convenience function: audit B2B blog content against 2026 Google standards.

    Args:
        content: Full article markdown content.
        article_type: 'technical', 'procurement', or 'oem_core'. Auto-detected if None.
        meta_title: Optional meta title.
        author_bio: Optional author bio text.
        language: Content language code. Default 'en'.
        syntax_only: If True, run only fatal-error checks (HTML syntax, heading hierarchy, URL format, schema parse). No NLP.
        verify_search_demand: If True, enable live WebSearch for FAQ question verification.

    Returns:
        Dict with overall_score and per-check results.
    """
    auditor = B2BContentAuditor()
    return auditor.audit(content, article_type, meta_title, author_bio, language,
                         syntax_only=syntax_only, verify_search_demand=verify_search_demand)


# ── CLI Entry Point ──

def _format_report(result: Dict[str, Any]) -> str:
    """Format audit results as a readable text report."""
    lines = []
    lines.append("=" * 60)
    lines.append("  B2B CONTENT AUDIT — 2026 Google Standards Compliance")
    lines.append("=" * 60)
    lines.append(f"  Overall Score: {result['overall_score']}/100")
    lines.append("")

    checks = [
        ('Opening Density (no-fluff)', 'opening_density'),
        ('TL;DR Block', 'tldr_block'),
        ('H3 Answer Length', 'h3_answer_length'),
        ('Vague Heading Detection', 'vague_headings'),
        ('H2 B2B Signal Density', 'h2_b2b_density'),
        ('First-Hand Data Density', 'data_density'),
        ('Table Test', 'table_test'),
        ('Stock Photo Detection', 'stock_photo'),
        ('FAQ B2B Language', 'faq_b2b_language'),
        ('Author E-E-A-T Audit', 'author_eeat'),
        ('Weak CTA Detection', 'weak_cta'),
        ('Heading Hierarchy', 'heading_hierarchy'),
        ('URL Quality', 'url_quality'),
        ('Cross-Reference Consistency', 'cross_reference'),
        ('Schema Validation', 'schema_validation'),
        ('Factory Data Canonical', 'factory_data_canonical'),
        ('Static HTML Quality', 'static_html_quality'),
    ]

    for label, key in checks:
        check = result.get(key, {})
        score = check.get('score')
        score_str = f"{score}/100" if score is not None else "N/A"
        lines.append(f"  {label:.<40s} {score_str}")

    lines.append("")
    lines.append("-" * 60)

    if result.get('critical_issues'):
        lines.append("  CRITICAL ISSUES:")
        for issue in result['critical_issues']:
            lines.append(f"    ❌ {issue}")

    if result.get('warnings'):
        lines.append("  WARNINGS:")
        for warning in result['warnings'][:5]:
            lines.append(f"    ⚠️  {warning}")

    if result.get('recommendations'):
        lines.append("  RECOMMENDATIONS:")
        for rec in result['recommendations'][:5]:
            lines.append(f"    💡 {rec}")

    lines.append("=" * 60)
    return '\n'.join(lines)


def main():
    """CLI entry point: audit a markdown file."""
    # Force UTF-8 on Windows
    if sys.platform == 'win32':
        import io
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

    if len(sys.argv) < 2:
        print("Usage: python b2b_content_auditor.py <article.md> [options] [article_type]")
        print("  article_type: technical | procurement | oem_core (auto-detected if omitted)")
        print("  Options:")
        print("    --lang de|es|fr       Article language (auto-detected from canonical URL if omitted)")
        print("    --check-syntax-only    Fatal errors only: HTML syntax, heading hierarchy, URL format, schema parse (< 1s)")
        print("    --score-only           Output numeric score only (for CI/CD gating)")
        print("    --verify-search-demand  Enable live WebSearch for FAQ question verification (disabled by default for offline/CI)")
        sys.exit(1)

    # Parse flags
    language = 'en'
    check_syntax_only = False
    score_only = False
    verify_search_demand = False
    args = sys.argv[1:]

    for flag in ['--check-syntax-only', '--score-only', '--verify-search-demand']:
        if flag in args:
            if flag == '--check-syntax-only':
                check_syntax_only = True
            elif flag == '--score-only':
                score_only = True
            elif flag == '--verify-search-demand':
                verify_search_demand = True
            args.remove(flag)

    if '--lang' in args:
        idx = args.index('--lang')
        if idx + 1 < len(args):
            language = args[idx + 1]
            args = args[:idx] + args[idx + 2:]
        else:
            args = args[:idx]

    file_path = args[0]
    article_type = args[1] if len(args) > 1 else None

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    result = audit_b2b_content(
        content, article_type=article_type, language=language,
        syntax_only=check_syntax_only,
        verify_search_demand=verify_search_demand
    )

    if score_only:
        print(result['overall_score'])
    else:
        print(_format_report(result))


if __name__ == "__main__":
    main()
