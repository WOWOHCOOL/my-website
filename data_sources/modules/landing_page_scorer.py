"""
Landing Page Scorer

Scores landing pages (0-100) against CRO best practices.
Supports both SEO landing pages and PPC landing pages with different scoring criteria.

Categories (weights):
- Above-the-fold (25%): Headline, value prop, CTA visibility, trust signal
- CTAs (25%): Quality, distribution, goal alignment
- Trust signals (20%): Testimonials, social proof, risk reversals
- Structure (15%): Benefit-focused, scannable, appropriate length
- SEO (15%): Meta, keywords, links (for SEO pages only)
"""

import re
from typing import Dict, List, Optional, Any


class LandingPageScorer:
    """Scores landing pages against CRO best practices"""

    # Page type configurations
    PAGE_CONFIGS = {
        'seo': {
            'min_word_count': 1500,
            'optimal_word_count': 2000,
            'max_word_count': 2500,
            'min_ctas': 3,
            'optimal_ctas': 5,
            'internal_links': 2,
        },
        'ppc': {
            'min_word_count': 400,
            'optimal_word_count': 600,
            'max_word_count': 800,
            'min_ctas': 2,
            'optimal_ctas': 3,
            'internal_links': 0,
        },
        'about': {
            'min_word_count': 500,
            'optimal_word_count': 1500,
            'max_word_count': 5000,
            'min_ctas': 2,
            'optimal_ctas': 5,
            'internal_links': 3,
        },
        'service': {
            'min_word_count': 800,
            'optimal_word_count': 2000,
            'max_word_count': 5000,
            'min_ctas': 3,
            'optimal_ctas': 6,
            'internal_links': 4,
        }
    }

    # Goal-specific CTA patterns
    GOAL_CTA_PATTERNS = {
        'trial': [
            r'(?:start|begin|try|get)\s+(?:your\s+)?free\s+trial',
            r'try\s+(?:it\s+)?free',
            r'start\s+(?:for\s+)?free',
            r'free\s+for\s+\d+\s+days',
            r'no\s+credit\s+card',
        ],
        'demo': [
            r'(?:book|schedule|request|get)\s+(?:a\s+)?demo',
            r'(?:talk|speak)\s+to\s+(?:sales|an?\s+expert)',
            r'see\s+(?:it\s+)?in\s+action',
            r'(?:schedule|book)\s+(?:a\s+)?call',
        ],
        'lead': [
            # English SaaS
            r'(?:download|get)\s+(?:the\s+)?(?:free\s+)?(?:guide|ebook|checklist|template)',
            r'get\s+(?:your\s+)?(?:free\s+)?(?:copy|access)',
            r'(?:subscribe|sign\s+up)\s+(?:for\s+)?(?:our\s+)?(?:newsletter|updates)',
            r'join\s+(?:\d+[,\d]*\+?\s+)?(?:podcasters?|creators?|people)',
            # B2B multilingual
            r'(?:Solicitar|Pedir|Recibir)\s+(presupuesto|catálogo|cotización|muestras?)',
            r'(?:Angebot|Katalog|Beratung)\s+(anfordern|einholen)',
            r'(?:Demander|Recevoir)\s+(?:un\s+)?(devis|catalogue|échantillon)',
            r'(?:Запросить|Получить)\s+(расчёт|каталог|образцы)',
            r'(?:索取|获取)(报价|目录|样品)',
            r'Contact(?:ar|o)?\s*(?:nos)?',
            r'Contáctenos', r'Kontakt', r'Contactez',
            r'(?:Hablar|Escribir)\s+(?:por\s+)?WhatsApp',
            r'(?:Comen[cz]ar|Iniciar|Start)\s+(?:ahora|proyecto|pedido|jetzt|Ihr)',
        ]
    }

    # Strong action verbs for CTAs (multilingual)
    CTA_ACTION_VERBS = [
        'start', 'get', 'try', 'begin', 'launch', 'create', 'download',
        'book', 'schedule', 'claim', 'unlock', 'discover', 'join',
        # Spanish
        'solicitar', 'pedir', 'recibir', 'comenzar', 'iniciar', 'contactar',
        'agendar', 'descargar', 'consultar', 'hablar', 'ver',
        # German
        'anfordern', 'einholen', 'starten', 'bestellen', 'kontaktieren',
        'anfragen', 'herunterladen', 'vereinbaren',
        # French
        'demander', 'recevoir', 'contacter', 'démarrer', 'télécharger', 'commander',
        # Russian
        'запросить', 'получить', 'заказать', 'скачать', 'связаться', 'начать',
        # Chinese
        '索取', '获取', '联系', '咨询', '下载', '开始',
    ]

    # Benefit-oriented CTA words (multilingual)
    CTA_BENEFIT_WORDS = [
        'free', 'instant', 'today', 'now', 'easy', 'fast', 'quick',
        'unlimited', 'exclusive', 'premium',
        # B2B benefits
        'gratis', 'gratuito', 'directo', 'personalizado', r'sin\s+compromiso',
        'kostenlos', 'unverbindlich', 'gratuit', r'sans\s+engagement',
        r'directo\s+de\s+fábrica', r'factory[\s-]direct', r'direkt\s+vom\s+Hersteller',
        r'MOQ\s+500', r'sin\s+intermediarios', r'ohne\s+Zwischenhändler',
    ]

    # Urgency words (multilingual)
    CTA_URGENCY_WORDS = [
        'now', 'today', 'limited', 'hurry', 'don\'t miss', 'last chance',
        'expires', 'only', 'before',
        'ahora', 'hoy', 'limitado', 'última', r'antes\s+de',
        'jetzt', 'heute', 'begrenzt', 'letzte',
        'maintenant', 'aujourd\'hui', 'limité', 'dernière',
        'сейчас', 'сегодня', 'ограничено', 'последний',
        '现在', '今天', '限时', '最后',
    ]

    # Trust signal patterns (multilingual B2B)
    TRUST_PATTERNS = {
        'testimonial': [
            r'"[^"]{20,200}"',
            r'—\s*[A-ZÁÉÍÓÚÄÖÜ][a-záéíóúäöü]+\s+[A-ZÁÉÍÓÚÄÖÜ]',
            r'\*\*[A-Z][a-z]+\s+[A-Z]\.\*\*',
            r'<blockquote[^>]*>(.{30,400})</blockquote>',
        ],
        'customer_count': [
            r'\d{1,3}(?:,\d{3})*\+?\s+(?:podcasters?|customers?|users?|creators?|businesses?)',
            r'(?:thousands|millions)\s+of\s+(?:podcasters?|customers?|users?)',
            r'trusted\s+by\s+\d+',
            # B2B
            r'\d+\+?\s*(?:marcas?|brands?|marques?|Marken|品牌)\s*(?:globales?|global)?',
            r'\d+[\.\d]*\s*[Mm]\+?\s*(?:unidades?|units?|entregadas)',
            r'\d+\+?\s*(?:ingenieros?|engineers?|ingénieurs?|Ingenieure)',
            r'\d+\+?\s*(?:años?|years?|ans?|Jahre?)\s+(?:de\s+)?experiencia',
        ],
        'specific_results': [
            r'\d+%\s+(?:increase|decrease|growth|improvement)',
            r'(?:saved?|grew?|increased?)\s+(?:by\s+)?\$?\d+',
            r'\d+x\s+(?:more|growth|increase)',
            # B2B
            r'(?:cero|0|zero|null)\s+(?:defectos|defects?|défauts?|Fehler)',
            r'\d+%\s+(?:reducción|ahorro|mejora|incremento|Reduzierung|réduction)',
            r'(?:pedido|orden|commande|Auftrag)\s+(?:repetido|repetida|répétée)',
            r'\d+[\.\d]*\s*(?:uds?|unidades)\s+(?:entregadas|delivered|livrées)',
            r'\d+\s*(?:días|dias|days?|Tage)\s+(?:de\s+)?producción',
        ],
        'risk_reversal': [
            r'no\s+credit\s+card',
            r'(?:money[- ]?back|satisfaction)\s+guarantee',
            r'cancel\s+(?:any\s*time|whenever)',
            r'risk[- ]?free',
            r'free\s+(?:for\s+)?\d+[- ]?days?',
            # B2B risk reversal
            r'(?:12|24)\s+(?:meses?|months?|Monate|mois)\s+(?:de\s+)?garantía',
            r'garantía\s+(?:de\s+)?(?:12|24)\s+(?:meses?|months?)',
            r'(?:defectos?|defects?|défauts?|Fehler)\s*[<≤]\s*0[\.\,]\d+%',
            r'(?:NDA|acuerdo\s+de\s+confidencialidad|confidentiality\s+agreement)',
            r'protección\s+(?:de\s+)?(?:IP|propiedad\s+intelectual)',
            r'(?:muestras?|samples?|échantillons?|Muster)\s+(?:gratis|gratuitas|free|kostenlos)',
        ],
        'authority': [
            r'(?:as\s+)?(?:seen|featured)\s+(?:in|on)',
            r'(?:award|certified|recognized)',
            r'(?:partner|integrated)\s+with',
            # B2B authority
            r'ISO\s*9001', r'\bCE\b', r'\bRoHS\b', r'\bFCC\b', r'\bQi2?\b',
            r'UN38\.3', r'\bUL\b', r'\bAENOR\b', r'\bTÜV\b', r'\bSGS\b',
            r'CES\s*2026', r'IFA\s*(?:Berlin)?',
            r'(?:Bosch|Samsung|Apple|Xiaomi|Anker|Jacob\s+Jensen)',
            r'Fortune\s*(?:500|1000)',
            r'(?:Bureau\s+Veritas|Intertek|DEKRA)',
            r'licencia\s+comercial\s+verificable',
        ]
    }

    # Generic/weak headline patterns (multilingual)
    WEAK_HEADLINE_PATTERNS = [
        r'^Welcome\s+to', r'^Bienvenidos?\s+(?:a|al)',
        r'^Willkommen\s+(?:bei|zum)', r'^Bienvenue\s+(?:sur|chez)',
        r'^Добро\s+пожаловать', r'^欢迎',
        r'^The\s+(?:best|ultimate|complete)',
        r'^El\s+(?:mejor|mejores)', r'^Der\s+(?:beste|ultimative)',
        r'^(?:Everything|All)\s+you\s+need',
        r'^Introducing\s+', r'^Presentamos\s+',
        r'^We\s+(?:help|offer|provide)', r'^(?:Ofrecemos|Ayudamos|Proveemos)',
        r'^Our\s+(?:product|service|solution)',
        r'^Nuestr[oa]s?\s+(?:productos?|servicios?|soluciones?)',
    ]

    # Strong headline patterns (multilingual B2B)
    STRONG_HEADLINE_PATTERNS = [
        r'^\d+', r'\?$',
        r'(?:without|no\s+more)\s+',
        r'(?:finally|at\s+last)',
        r'(?:save|grow|increase|boost)',
        # B2B strong signals
        r'(?:OEM|ODM|Fabricante|Manufacturer|Hersteller|Fabricant)',
        r'(?:desde|since|seit|depuis)\s+(?:20\d{2}|19\d{2})',
        r'(?:fábrica|factory|Fabrik|usine)\s+(?:directa|direct|direkt)',
        r'(?:MOQ|pedido\s+mínimo|Mindestbestellmenge)\s+\d+',
        r'(?:Shenzhen|China|ISO\s*9001)',
        r'(?:personalizad[oa]|custom|maßgeschneidert|personnalisé)',
    ]

    def __init__(
        self,
        page_type: str = 'seo',
        conversion_goal: str = 'trial'
    ):
        """
        Initialize Landing Page Scorer

        Args:
            page_type: 'seo' or 'ppc'
            conversion_goal: 'trial', 'demo', or 'lead'
        """
        self.page_type = page_type
        self.conversion_goal = conversion_goal
        self.config = self.PAGE_CONFIGS.get(page_type, self.PAGE_CONFIGS['seo'])

    def score(
        self,
        content: str,
        meta_title: Optional[str] = None,
        meta_description: Optional[str] = None,
        primary_keyword: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Score landing page against CRO best practices

        Args:
            content: Landing page content (markdown)
            meta_title: Meta title tag
            meta_description: Meta description tag
            primary_keyword: Target keyword (for SEO pages)

        Returns:
            Dict with overall score, category scores, and recommendations
        """
        # Analyze structure
        structure = self._analyze_structure(content)

        # Score each category
        above_fold_score = self._score_above_fold(content, structure)
        cta_score = self._score_ctas(content, structure)
        trust_score = self._score_trust_signals(content)
        structure_score = self._score_structure(content, structure)

        # New quality checks (B2B-aligned)
        readability = self._score_readability(content)
        mobile = self._check_mobile(content)
        message_match = self._check_message_match(content, meta_title, meta_description)
        experience = self._score_experience(content)
        form_friction = self._check_form_friction(content)
        anti_patterns = self._detect_anti_patterns(content, structure)

        # SEO score only for SEO pages
        if self.page_type == 'seo':
            seo_score = self._score_seo(content, structure, meta_title, meta_description, primary_keyword)
        else:
            seo_score = {'score': 100, 'critical': [], 'warnings': [], 'suggestions': []}

        # Revised weights (market-aligned)
        is_b2b = self.page_type in ('about', 'service')
        if self.page_type == 'seo':
            weights = {'above_fold': 0.25, 'ctas': 0.20, 'trust': 0.20, 'structure': 0.10,
                       'readability': 0.05, 'mobile': 0.05, 'e_e_a_t': 0.05, 'seo': 0.10}
        elif is_b2b:
            weights = {'above_fold': 0.25, 'ctas': 0.10, 'trust': 0.25, 'structure': 0.10,
                       'readability': 0.05, 'mobile': 0.10, 'e_e_a_t': 0.10, 'seo': 0.05}
        else:
            weights = {'above_fold': 0.30, 'ctas': 0.25, 'trust': 0.25, 'structure': 0.10,
                       'readability': 0.00, 'mobile': 0.05, 'e_e_a_t': 0.00, 'seo': 0.05}

        # E-E-A-T composite (experience + message match)
        e_e_a_t_score = (experience['score'] * 0.5 + message_match['score'] * 0.5)

        # Performance composite (readability + mobile + form friction)
        perf_score = (readability['score'] * 0.4 + mobile['score'] * 0.4 + form_friction['score'] * 0.2)

        overall_score = (
            above_fold_score['score'] * weights['above_fold'] +
            cta_score['score'] * weights['ctas'] +
            trust_score['score'] * weights['trust'] +
            structure_score['score'] * weights['structure'] +
            perf_score * (weights.get('readability', 0) + weights.get('mobile', 0)) +
            e_e_a_t_score * weights['e_e_a_t'] +
            seo_score['score'] * weights['seo']
        )

        # Anti-pattern penalties
        anti_penalty = len(anti_patterns.get('critical', [])) * 5 + len(anti_patterns.get('warnings', [])) * 2
        overall_score = max(0, overall_score - anti_penalty)

        # Compile all issues
        critical_issues = anti_patterns.get('critical', [])
        warnings = anti_patterns.get('warnings', [])
        suggestions = []

        for category in [above_fold_score, cta_score, trust_score, structure_score, seo_score]:
            critical_issues.extend(category.get('critical', []))
            warnings.extend(category.get('warnings', []))
            suggestions.extend(category.get('suggestions', []))
        for cat in [readability, mobile, message_match, experience, form_friction]:
            suggestions.extend(cat.get('issues', []))

        return {
            'overall_score': round(overall_score, 1),
            'grade': self._get_grade(overall_score),
            'page_type': self.page_type,
            'conversion_goal': self.conversion_goal,
            'category_scores': {
                'above_fold': above_fold_score['score'],
                'ctas': cta_score['score'],
                'trust_signals': trust_score['score'],
                'structure': structure_score['score'],
                'readability': readability['score'],
                'mobile': mobile['score'],
                'experience_e_e_a_t': experience['score'],
                'message_match': message_match['score'],
                'form_friction': form_friction['score'],
                'seo': seo_score['score'] if self.page_type == 'seo' else 'N/A'
            },
            'trust_sub_scores': trust_score.get('sub_scores', {}),
            'critical_issues': critical_issues,
            'warnings': warnings,
            'suggestions': suggestions,
            'publishing_ready': overall_score >= 75 and len(critical_issues) == 0,
            'details': {
                'word_count': structure['word_count'],
                'cta_count': structure['cta_count'],
                'headline': structure.get('h1_text', '')[:60],
                'has_value_prop': structure.get('has_value_prop', False),
                'trust_signal_count': structure.get('trust_signal_count', 0)
            }
        }

    def _analyze_structure(self, content: str) -> Dict[str, Any]:
        """Analyze landing page structure"""
        lines = content.split('\n')

        # Extract headings
        h1_text = ""
        h2_texts = []
        h2_count = 0

        for line in lines:
            # Markdown headings
            h1_match = re.match(r'^#\s+(.+)$', line)
            h2_match = re.match(r'^##\s+(.+)$', line)
            # HTML headings (for .njk templates) — use search, not match (lines may have leading whitespace)
            h1_html = re.search(r'<h1[^>]*>(.+?)</h1>', line, re.IGNORECASE)
            h2_html = re.search(r'<h2[^>]*>(.+?)</h2>', line, re.IGNORECASE)

            if (h1_match or h1_html) and not h1_text:
                h1_text = (h1_match or h1_html).group(1)
            elif h2_match or h2_html:
                h2_count += 1
                h2_texts.append((h2_match or h2_html).group(1))

        # Word count
        word_count = len(content.split())

        # CTA detection
        cta_count = 0
        cta_positions = []

        # Check for button-style CTAs (Markdown + HTML)
        button_ctas = re.findall(r'\[.{5,60}→?\]|\*\*\[.{5,60}\]', content)
        cta_count += len(button_ctas)
        html_buttons = re.findall(r'<button[^>]*>', content, re.IGNORECASE)
        cta_count += len(html_buttons)
        cta_links = re.findall(r'<a[^>]*href="[^"]*(?:contacto|contact|presupuesto|quote|anfordern)[^"]*"[^>]*>', content, re.IGNORECASE)
        cta_count += len(cta_links)

        # Check for goal-specific CTAs
        goal_patterns = self.GOAL_CTA_PATTERNS.get(self.conversion_goal, [])
        for pattern in goal_patterns:
            matches = list(re.finditer(pattern, content, re.IGNORECASE))
            cta_count += len(matches)
            for match in matches:
                pos_pct = match.start() / len(content) * 100
                cta_positions.append(pos_pct)

        # Above-the-fold content (first 500-700 characters)
        above_fold = content[:700]

        # Value proposition detection
        value_prop_patterns = [
            # English SaaS
            r'help\s+(?:you\s+)?(?:to\s+)?(?:\w+\s+){0,3}',
            r'(?:grow|launch|start|create|build)\s+your',
            r'(?:save|reduce|eliminate)\s+',
            r'(?:the\s+)?(?:easiest|fastest|best|only)\s+way',
            # B2B multilingual value props
            r'(?:fabricante|manufacturer|Hersteller|fabricant|производитель|制造商)',
            r'(?:fábrica|factory|Fabrik|usine|завод|工厂)',
            r'(?:OEM|ODM|personalizad|maßgeschneidert|personnalisé|индивидуальн|定制)',
            r'(?:desde|since|seit|depuis|с\s+20\d{2}|始于)\s+(?:20\d{2}|19\d{2})',
            r'(?:MOQ|pedido\s+mínimo|Mindestbestellmenge|commande\s+minimum|минимальный\s+заказ|起订量)',
            r'(?:ISO\s*9001|CE\s+|RoHS|certificad[oa]|zertifiziert|certifié|сертифицирован|认证)',
            r'(?:Shenzhen|China|广东)',
            r'(?:sin\s+intermediarios|ohne\s+Zwischenhändler|sans\s+intermédiaire|directo\s+de\s+fábrica)',
            r'(?:del\s+concepto\s+al?\s+|from\s+concept\s+to\s+|vom\s+Konzept\s+zur?\s+)',
            r'(?:producción\s+en\s+serie|mass\s+production|Serienproduktion|production\s+en\s+série)',
        ]
        has_value_prop = any(
            re.search(p, above_fold, re.IGNORECASE)
            for p in value_prop_patterns
        )

        # Trust signal count
        trust_count = 0
        for signal_type, patterns in self.TRUST_PATTERNS.items():
            for pattern in patterns:
                trust_count += len(re.findall(pattern, content, re.IGNORECASE))

        return {
            'word_count': word_count,
            'h1_text': h1_text,
            'h2_count': h2_count,
            'h2_texts': h2_texts,
            'cta_count': cta_count,
            'cta_positions': cta_positions,
            'above_fold': above_fold,
            'has_value_prop': has_value_prop,
            'trust_signal_count': trust_count
        }

    def _score_above_fold(self, content: str, structure: Dict) -> Dict[str, Any]:
        """Score above-the-fold elements"""
        score = 100
        critical = []
        warnings = []
        suggestions = []

        above_fold = structure['above_fold']
        h1_text = structure['h1_text']

        # 1. Headline presence and quality (40 points)
        if not h1_text:
            score -= 40
            critical.append("Missing headline (H1)")
        else:
            # Check for weak headlines
            for pattern in self.WEAK_HEADLINE_PATTERNS:
                if re.search(pattern, h1_text, re.IGNORECASE):
                    score -= 15
                    warnings.append(f"Headline may be too generic: '{h1_text[:50]}...'")
                    break

            # Check for strong headlines
            has_strong = any(
                re.search(p, h1_text, re.IGNORECASE)
                for p in self.STRONG_HEADLINE_PATTERNS
            )
            if not has_strong:
                score -= 5
                suggestions.append("Headline could be stronger. Consider adding a number, benefit, or question.")

            # Headline length
            if len(h1_text) > 70:
                score -= 5
                suggestions.append(f"Headline is long ({len(h1_text)} chars). Consider shortening to <70 chars.")

        # 2. Value proposition (25 points)
        if not structure['has_value_prop']:
            score -= 25
            warnings.append("No clear value proposition found above the fold")

        # 3. CTA visibility above fold (25 points)
        cta_in_above_fold = (
            any(
                re.search(pattern, above_fold, re.IGNORECASE)
                for patterns in self.GOAL_CTA_PATTERNS.values()
                for pattern in patterns
            ) or
            re.search(r'\[.{5,60}→?\]', above_fold) or
            # HTML buttons/links (for .njk templates)
            bool(re.search(r'<button[^>]*>', above_fold)) or
            bool(re.search(r'<a[^>]*class="[^"]*btn[^"]*"[^>]*>', above_fold)) or
            bool(re.search(r'<a[^>]*href="[^"]*(?:contacto|contact|presupuesto|quote|anfordern)[^"]*"[^>]*>', above_fold, re.IGNORECASE))
        )

        if not cta_in_above_fold:
            score -= 25
            critical.append("No CTA visible above the fold")

        # 4. Trust signal above fold (10 points)
        trust_above_fold = False
        for patterns in self.TRUST_PATTERNS.values():
            for pattern in patterns:
                if re.search(pattern, above_fold, re.IGNORECASE):
                    trust_above_fold = True
                    break

        if not trust_above_fold:
            score -= 10
            suggestions.append("Consider adding a trust signal above the fold (customer count, testimonial, logo)")

        return {
            'score': max(0, score),
            'critical': critical,
            'warnings': warnings,
            'suggestions': suggestions
        }

    def _score_ctas(self, content: str, structure: Dict) -> Dict[str, Any]:
        """Score CTA effectiveness"""
        score = 100
        critical = []
        warnings = []
        suggestions = []

        cta_count = structure['cta_count']
        cta_positions = structure['cta_positions']
        min_ctas = self.config['min_ctas']
        optimal_ctas = self.config['optimal_ctas']

        # 1. CTA count (30 points) — B2B research: single CTA = 13.5% CVR, 5+ CTAs = 10.5% CVR
        is_b2b = self.page_type in ('about', 'service')
        if cta_count == 0:
            score -= 40
            critical.append("No CTAs found on page")
        elif is_b2b:
            if cta_count > 12:
                score -= 15
                warnings.append(f"Too many CTA elements detected. B2B research: single-CTA pages convert 28% better than multi-CTA. Consider consolidating to 1-2 primary CTAs repeated 2-3 times each.")
            elif cta_count > 8:
                score -= 5
                suggestions.append(f"Multiple CTAs detected. Single-CTA B2B pages achieve 13.5% conversion vs 10.5% for 5+ links.")
        elif cta_count < min_ctas:
            score -= 20
            warnings.append(f"Too few CTAs ({cta_count}). Target is {min_ctas}-{optimal_ctas} CTAs.")
        elif cta_count > optimal_ctas + 2:
            score -= 10
            suggestions.append(f"Many CTAs ({cta_count}). Consider consolidating.")

        # 2. CTA distribution (25 points)
        if len(cta_positions) >= 2:
            has_early = any(p < 40 for p in cta_positions)
            has_late = any(p > 70 for p in cta_positions)
            if not has_early:
                score -= 15
                warnings.append("No CTA in first 40% of page. Add an early CTA.")
            if not has_late and not is_b2b:
                score -= 10
                suggestions.append("No CTA in final section. Add a closing CTA.")
        elif cta_count == 1:
            if is_b2b:
                pass  # Single CTA is optimal for B2B
            else:
                score -= 15
                warnings.append("Only one CTA found. Add CTAs throughout the page.")

        # 3. Goal alignment (25 points)
        goal_patterns = self.GOAL_CTA_PATTERNS.get(self.conversion_goal, [])
        goal_aligned = any(
            re.search(pattern, content, re.IGNORECASE)
            for pattern in goal_patterns
        )

        if not goal_aligned:
            score -= 25
            critical.append(
                f"CTAs don't align with '{self.conversion_goal}' goal. "
                f"Use goal-specific language."
            )

        # 4. CTA quality (20 points)
        # Extract CTA text from Markdown AND HTML
        cta_text_samples = re.findall(r'\[([^\]]{5,60})\]', content)
        cta_text_samples += re.findall(r'<button[^>]*>(.{5,80})</button>', content, re.IGNORECASE)
        cta_text_samples += re.findall(r'<a[^>]*class="[^"]*btn[^"]*"[^>]*>(.{5,80})</a>', content, re.IGNORECASE)
        cta_text_samples += re.findall(r'<a[^>]*href="[^"]*(?:contacto|contact|presupuesto|quote|anfordern)[^"]*"[^>]*>(.{5,80})</a>', content, re.IGNORECASE)
        if cta_text_samples:
            has_action_verb = any(
                any(verb in cta.lower() for verb in self.CTA_ACTION_VERBS)
                for cta in cta_text_samples
            )
            has_benefit = any(
                any(word in cta.lower() for word in self.CTA_BENEFIT_WORDS)
                for cta in cta_text_samples
            )

            if not has_action_verb:
                score -= 10
                warnings.append("CTAs missing action verbs (Start, Get, Try, etc.)")
            if not has_benefit:
                score -= 10
                suggestions.append("CTAs could include benefit words (free, instant, today)")

        return {
            'score': max(0, score),
            'critical': critical,
            'warnings': warnings,
            'suggestions': suggestions
        }

    def _score_trust_signals(self, content: str) -> Dict[str, Any]:
        """Score trust signals with sub-score caps to prevent inflation (B2B-aligned)"""
        critical = []
        warnings = []
        suggestions = []

        trust_counts = {}
        for signal_type, patterns in self.TRUST_PATTERNS.items():
            count = 0
            for pattern in patterns:
                count += len(re.findall(pattern, content, re.IGNORECASE))
            trust_counts[signal_type] = count

        # Sub-scoring with caps (max 100 total)
        sub_scores = {}

        # 1. Certifications (max 15)
        has_certs = trust_counts.get('authority', 0) > 0
        cert_count = trust_counts.get('authority', 0)
        if cert_count >= 5: sub_scores['certifications'] = 15
        elif cert_count >= 3: sub_scores['certifications'] = 10
        elif has_certs: sub_scores['certifications'] = 5
        else: sub_scores['certifications'] = 0

        # 2. Client proof (max 20) — named clients + logos + specific results
        has_clients = trust_counts.get('customer_count', 0) > 0
        has_results = trust_counts.get('specific_results', 0) > 0
        has_testimonials = trust_counts.get('testimonial', 0) > 0
        client_score = 0
        if has_clients: client_score += 8
        if has_results: client_score += 7
        if has_testimonials: client_score += 5
        sub_scores['client_proof'] = min(20, client_score)

        # 3. Risk reversal (max 15)
        rr_count = trust_counts.get('risk_reversal', 0)
        if rr_count >= 3: sub_scores['risk_reversal'] = 15
        elif rr_count >= 1: sub_scores['risk_reversal'] = 10
        else: sub_scores['risk_reversal'] = 0

        # 4. Contact methods (max 15) — phone + email + address + WhatsApp
        contact_methods = 0
        if re.search(r'(?:tel|phone|teléfono|Telefon|téléphone)[\s:]*[+\d]', content, re.IGNORECASE): contact_methods += 1
        if re.search(r'[\w.+-]+@[\w-]+\.[\w.]+', content): contact_methods += 1
        if re.search(r'(?:Shenzhen|Guangdong|address|dirección|Adresse|adresse|地址)', content, re.IGNORECASE): contact_methods += 1
        if re.search(r'WhatsApp', content, re.IGNORECASE): contact_methods += 1
        sub_scores['contact'] = min(15, contact_methods * 4)

        # 5. Content freshness (max 10) — check frontmatter date, JSON-LD dateModified, or any recent date
        date_mod_match = (
            re.search(r'dateModified["\s:]+(\d{4}-\d{2}-\d{2})', content) or
            re.search(r'^date:\s*(\d{4}-\d{2}-\d{2})', content, re.MULTILINE) or
            re.search(r'datePublished["\s:]+(\d{4}-\d{2}-\d{2})', content) or
            re.search(r'"date":\s*"(\d{4}-\d{2}-\d{2})"', content)
        )
        if date_mod_match:
            from datetime import datetime, timedelta
            try:
                mod_date = datetime.strptime(date_mod_match.group(1), '%Y-%m-%d')
                age_days = (datetime.now() - mod_date).days
                if age_days < 90: sub_scores['freshness'] = 10
                elif age_days < 180: sub_scores['freshness'] = 7
                elif age_days < 365: sub_scores['freshness'] = 4
                else: sub_scores['freshness'] = 0
            except: sub_scores['freshness'] = 5
        else: sub_scores['freshness'] = 0

        # 6. Team/author depth (max 10) — named people with bios
        team_count = len(re.findall(r'(?:Autora?|Author|Manager|Gerente|CEO|CTO|Founder|Director|Leiter)', content, re.IGNORECASE))
        has_photos = bool(re.search(r'<img[^>]*team|author', content, re.IGNORECASE))
        has_linkedin = bool(re.search(r'linkedin\.com/in/', content, re.IGNORECASE))
        team_score = min(3, team_count) * 2
        if has_photos: team_score += 2
        if has_linkedin: team_score += 2
        sub_scores['team_depth'] = min(10, team_score)

        # 7. Third-party verification (max 10) — SGS/TÜV/Bureau Veritas audits
        has_third_party = bool(re.search(r'(?:SGS|TÜV|TUV|Bureau\s+Veritas|Intertek|DEKRA|auditor[aí]a|audit|第三方)', content, re.IGNORECASE))
        has_gsxt = bool(re.search(r'(?:gsxt|National Enterprise Credit|licencia\s+comercial\s+verificable)', content, re.IGNORECASE))
        tp_score = 0
        if has_third_party: tp_score += 6
        if has_gsxt: tp_score += 4
        sub_scores['third_party'] = min(10, tp_score)

        # 8. FAQ presence (max 5) — trust through transparency
        has_faq = bool(re.search(r'(?:FAQ|Preguntas\s+frecuentes|Häufige\s+Fragen|Questions\s+fréquentes)', content, re.IGNORECASE))
        sub_scores['faq'] = 5 if has_faq else 0

        total = sum(sub_scores.values())
        if total < 30:
            critical.append(f"Low trust score ({total}/100). Add certifications, client proof, contact methods, and risk reversal.")
        elif total < 50:
            warnings.append(f"Trust score could improve ({total}/100). Focus on contact methods and client proof.")

        return {
            'score': total,
            'critical': critical,
            'warnings': warnings,
            'suggestions': suggestions,
            'sub_scores': sub_scores
        }

    def _score_structure(self, content: str, structure: Dict) -> Dict[str, Any]:
        """Score content structure"""
        score = 100
        critical = []
        warnings = []
        suggestions = []

        word_count = structure['word_count']
        min_words = self.config['min_word_count']
        optimal_words = self.config['optimal_word_count']
        max_words = self.config['max_word_count']

        # 1. Word count (40 points)
        if word_count < min_words * 0.7:
            score -= 40
            critical.append(
                f"Content too short ({word_count} words). "
                f"Minimum for {self.page_type.upper()} page is {min_words} words."
            )
        elif word_count < min_words:
            score -= 20
            warnings.append(
                f"Content slightly short ({word_count} words). "
                f"Target is {optimal_words} words."
            )
        elif word_count > max_words * 1.3:
            score -= 15
            warnings.append(
                f"Content may be too long for {self.page_type.upper()} page ({word_count} words). "
                f"Target is {min_words}-{max_words} words."
            )

        # 2. Scannability (30 points)
        h2_count = structure['h2_count']
        bullet_lists = len(re.findall(r'^\s*[-*]\s', content, re.MULTILINE))
        bullet_lists += len(re.findall(r'<li[^>]*>', content, re.IGNORECASE))  # HTML lists
        bold_count = len(re.findall(r'\*\*[^*]+\*\*', content))
        bold_count += len(re.findall(r'<strong>[^<]+</strong>', content, re.IGNORECASE))

        if self.page_type in ('seo', 'about', 'service') and h2_count < 4:
            score -= 15
            warnings.append(f"Too few sections ({h2_count} H2s). Add more headings for scannability.")
        elif h2_count < 2:
            score -= 15
            warnings.append("Add at least 2 section headings for structure.")

        if bullet_lists == 0:
            score -= 10
            suggestions.append("No bullet lists found. Use lists for benefits/features.")

        if bold_count < 3:
            score -= 5
            suggestions.append("Add bold text to highlight key points.")

        # 3. Benefit vs feature focus (30 points)
        benefit_words = [
            'save', 'grow', 'increase', 'improve', 'reduce', 'eliminate', 'easy', 'fast', 'simple',
            # B2B benefits
            'certificad[oa]', 'garantía', 'garantie', 'Garantie', 'garantía',
            'personalizad[oa]', 'custom', 'maßgeschneidert', 'personnalisé',
            'directo', 'direct', 'direkt', 'factory', 'fábrica', 'Fabrik',
            'calidad', 'quality', 'Qualität', 'qualité',
            'rápido', 'schnell', 'rapide', 'entrega', 'delivery', 'Lieferung',
        ]
        feature_words = [
            'feature', 'function', 'capability', 'specification', 'technology',
            'especificación', 'Spezifikation', 'spécification', 'característica',
        ]

        benefit_count = sum(len(re.findall(rf'\b{word}\b', content, re.IGNORECASE)) for word in benefit_words)
        feature_count = sum(len(re.findall(rf'\b{word}\b', content, re.IGNORECASE)) for word in feature_words)

        # B2B pages: both benefits and features matter. Only penalize extreme imbalance.
        if feature_count > benefit_count * 3:
            score -= 15
            warnings.append("Content may be too feature-focused. Lead with benefits, not features.")

        return {
            'score': max(0, score),
            'critical': critical,
            'warnings': warnings,
            'suggestions': suggestions
        }

    def _score_readability(self, content: str) -> Dict[str, Any]:
        """Estimate readability — B2B benchmark: 5th-7th grade level converts 2.1x better"""
        sentences = re.split(r'[.!?]+', content)
        words_total = content.split()
        if not sentences or len(words_total) < 100:
            return {'score': 100, 'issues': [], 'avg_words_per_sentence': 0}

        avg_wps = len(words_total) / max(1, len([s for s in sentences if len(s.split()) > 2]))
        long_sentences = sum(1 for s in sentences if len(s.split()) > 25)
        long_ratio = long_sentences / max(1, len(sentences))

        score = 100
        issues = []
        if avg_wps > 22:
            score -= 20
            issues.append(f"Sentences too long (avg {avg_wps:.0f} words). Target <20 for B2B readability.")
        elif avg_wps > 18:
            score -= 10
            issues.append(f"Consider shorter sentences (avg {avg_wps:.0f} words).")
        if long_ratio > 0.3:
            score -= 15
            issues.append(f"{long_sentences} sentences exceed 25 words. Break up long sentences.")
        return {'score': max(0, score), 'issues': issues, 'avg_words_per_sentence': round(avg_wps, 1)}

    def _check_mobile(self, content: str) -> Dict[str, Any]:
        """Check mobile readiness signals"""
        score = 100
        issues = []
        has_viewport = bool(re.search(r'viewport.*width=device-width', content, re.IGNORECASE))
        has_responsive = bool(re.search(r'(?:sm:|md:|lg:|xl:|@media|flex-wrap|grid-cols-\d)', content))
        has_tap_targets = bool(re.search(r'(?:py-\d\.\d|px-\d\.\d|min-\[44px\]|h-\d\d)', content))
        if not has_viewport: score -= 30; issues.append("No viewport meta tag for mobile.")
        if not has_responsive: score -= 20; issues.append("No responsive CSS detected. Add media queries or Tailwind breakpoints.")
        if not has_tap_targets: score -= 10; issues.append("Check tap target sizes (min 44px recommended).")
        return {'score': max(0, score), 'issues': issues}

    def _check_message_match(self, content: str, meta_title: str = None, meta_desc: str = None) -> Dict[str, Any]:
        """Check H1-to-meta message consistency — #1 B2B conversion killer"""
        score = 100
        issues = []
        h1_match = re.search(r'<h1[^>]*>(.+?)</h1>', content, re.IGNORECASE | re.DOTALL)
        if not h1_match:
            return {'score': 50, 'issues': ['No H1 found for message match check.']}
        h1_text = re.sub(r'<[^>]+>', '', h1_match.group(1)).strip().lower()
        if meta_title:
            mt_lower = meta_title.lower()
            h1_words = set(re.findall(r'\w{4,}', h1_text))
            mt_words = set(re.findall(r'\w{4,}', mt_lower))
            overlap = len(h1_words & mt_words) / max(1, len(h1_words))
            if overlap < 0.4: score -= 30; issues.append(f"H1 and meta title mismatch ({overlap:.0%} overlap). Message match is critical for conversion.")
            elif overlap < 0.6: score -= 10; issues.append("H1 and meta title could be more aligned.")
        return {'score': max(0, score), 'issues': issues}

    def _score_experience(self, content: str) -> Dict[str, Any]:
        """Score E-E-A-T Experience signals — first-person, original data, named projects"""
        score = 100
        issues = []
        has_first_person = bool(re.search(r'\b(?:nuestr[oa]s?|nuestra|hemos|tenemos|nuestro\s+equipo)\b', content, re.IGNORECASE))
        has_original_data = bool(re.search(r'(?:nuestr[oa]\s+(?:fábrica|factory|producción|production|QC|línea|aging\s+test|BOM|FOB))', content, re.IGNORECASE))
        has_named_projects = bool(re.search(r'(?:Bosch|Jacob|caso\s+real|proyecto\s+ODM|entregamos|entregó|completamos|completó)\b', content, re.IGNORECASE))
        if not has_first_person: score -= 25; issues.append("No first-person experience language detected. Use 'nuestra fábrica', 'hemos entregado', 'nuestro equipo'.")
        if not has_original_data: score -= 25; issues.append("No original factory data detected. Include specific production metrics, BOM costs, or QC test results.")
        if not has_named_projects: score -= 25; issues.append("No named client project stories. Add case studies with specific results (e.g., 'Bosch — 10K uds — 25 días — 0 defectos').")
        return {'score': max(0, score), 'issues': issues}

    def _check_form_friction(self, content: str) -> Dict[str, Any]:
        """Check contact form field count — reducing from 7+ to 3-5 lifts CVR 25-120%"""
        form_inputs = len(re.findall(r'<input[^>]*>', content, re.IGNORECASE))
        form_fields = len(re.findall(r'<(?:input|select|textarea)', content, re.IGNORECASE))
        if form_fields == 0:
            return {'score': 100, 'issues': [], 'field_count': 0}
        score = 100
        issues = []
        if form_fields > 7: score -= 30; issues.append(f"Contact form has {form_fields} fields. Reduce to 3-5 — each extra field reduces conversion 10-25%.")
        elif form_fields > 5: score -= 10; issues.append(f"Contact form has {form_fields} fields. Test reducing to 3-4.")
        return {'score': max(0, score), 'issues': issues, 'field_count': form_fields}

    def _detect_anti_patterns(self, content: str, structure: Dict) -> Dict[str, Any]:
        """Detect negative signals: stale content, missing contact, excessive jargon"""
        critical = []
        warnings = []
        # Stale content — check multiple date sources
        dm = (re.search(r'dateModified["\s:]+(\d{4}-\d{2}-\d{2})', content) or
              re.search(r'^date:\s*(\d{4}-\d{2}-\d{2})', content, re.MULTILINE) or
              re.search(r'datePublished["\s:]+(\d{4}-\d{2}-\d{2})', content))
        if dm:
            from datetime import datetime
            try:
                age = (datetime.now() - datetime.strptime(dm.group(1), '%Y-%m-%d')).days
                if age > 365: critical.append(f"Content is {age} days stale (>1 year). Update for freshness signal.")
                elif age > 180: warnings.append(f"Content is {age} days old. Consider refreshing.")
            except: pass
        # No contact info
        has_contact = bool(re.search(r'(?:contacto?|Contáctenos|Kontakt|contact@|teléfono|phone|WhatsApp)', content, re.IGNORECASE))
        if not has_contact: critical.append("No contact information found. Essential for B2B trust.")
        # Hidden/missing about/team
        has_team = bool(re.search(r'(?:Autora?|Author|Gerente|Manager|CEO|equipo|team|fundad[oa]|founder)', content, re.IGNORECASE))
        if not has_team: warnings.append("No author/team information found. Add named team members with bios for E-E-A-T.")
        return {'critical': critical, 'warnings': warnings}

    def _score_seo(
        self,
        content: str,
        structure: Dict,
        meta_title: Optional[str],
        meta_description: Optional[str],
        primary_keyword: Optional[str]
    ) -> Dict[str, Any]:
        """Score SEO elements (for SEO pages only)"""
        score = 100
        critical = []
        warnings = []
        suggestions = []

        # 1. Meta title (35 points)
        if not meta_title:
            score -= 35
            critical.append("Meta title is missing")
        else:
            if len(meta_title) < 50:
                score -= 10
                warnings.append(f"Meta title too short ({len(meta_title)} chars). Target is 50-60.")
            elif len(meta_title) > 65:
                score -= 5
                suggestions.append(f"Meta title may be truncated ({len(meta_title)} chars).")

            if primary_keyword and primary_keyword.lower() not in meta_title.lower():
                score -= 10
                warnings.append(f"Keyword '{primary_keyword}' not in meta title")

        # 2. Meta description (35 points)
        if not meta_description:
            score -= 35
            critical.append("Meta description is missing")
        else:
            if len(meta_description) < 150:
                score -= 10
                warnings.append(f"Meta description too short ({len(meta_description)} chars). Target is 150-160.")
            elif len(meta_description) > 165:
                score -= 5
                suggestions.append(f"Meta description may be truncated ({len(meta_description)} chars).")

        # 3. Keyword in headline (15 points)
        if primary_keyword and structure['h1_text']:
            if primary_keyword.lower() not in structure['h1_text'].lower():
                score -= 15
                warnings.append(f"Keyword '{primary_keyword}' not in headline")

        # 4. Internal links (15 points)
        internal_links = len(re.findall(r'\[([^\]]+)\]\((?!/|http)', content))
        if internal_links < self.config['internal_links']:
            score -= 15
            suggestions.append(
                f"Add {self.config['internal_links'] - internal_links} internal links "
                f"to related pages."
            )

        return {
            'score': max(0, score),
            'critical': critical,
            'warnings': warnings,
            'suggestions': suggestions
        }

    def _get_grade(self, score: float) -> str:
        """Convert score to letter grade. B2B pages use slightly lower thresholds."""
        if self.page_type in ('about', 'service'):
            if score >= 80: return "A (Excellent — B2B)"
            elif score >= 65: return "B (Good — B2B)"
            elif score >= 55: return "C (Average — B2B)"
            elif score >= 45: return "D (Needs Work — B2B)"
            else: return "F (Poor — B2B)"
        if score >= 90: return "A (Excellent)"
        elif score >= 80: return "B (Good)"
        elif score >= 70: return "C (Average)"
        elif score >= 60: return "D (Needs Work)"
        else: return "F (Poor)"


# Convenience function
def score_landing_page(
    content: str,
    page_type: str = 'seo',
    conversion_goal: str = 'trial',
    meta_title: Optional[str] = None,
    meta_description: Optional[str] = None,
    primary_keyword: Optional[str] = None
) -> Dict[str, Any]:
    """
    Score a landing page against CRO best practices

    Args:
        content: Landing page content (markdown)
        page_type: 'seo' or 'ppc'
        conversion_goal: 'trial', 'demo', or 'lead'
        meta_title: Meta title tag
        meta_description: Meta description tag
        primary_keyword: Target keyword (for SEO pages)

    Returns:
        Landing page score with recommendations
    """
    try: from .njk_preprocessor import preprocess
    except ImportError: from njk_preprocessor import preprocess
    content = preprocess(content)
    scorer = LandingPageScorer(page_type, conversion_goal)
    return scorer.score(content, meta_title, meta_description, primary_keyword)


# Example usage
if __name__ == "__main__":
    import sys

    # Force UTF-8 stdout so the report prints on Windows (GBK) consoles
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")

    sample_content = """
# Launch Your Product in Minutes, Not Months

**Meta Title**: Easy Product Hosting | Start Free Today - [YOUR COMPANY]
**Meta Description**: Get started in minutes with [YOUR COMPANY]. No technical skills needed. Free 14-day trial, no credit card required. Join 50,000+ customers today.
**Target Keyword**: product hosting
**Conversion Goal**: trial

---

Ready to get started? [YOUR COMPANY] makes it ridiculously simple.

50,000+ customers trust us. Here's why:

## Start Building Today, Not "Someday"

Most platforms make you jump through hoops. Complex dashboards. Confusing settings. Technical jargon.

[YOUR COMPANY] is different. Upload your content, configure your settings, and hit publish. That's it.

**[Start Your Free Trial →]**

## What You Get

- **Unlimited storage** - No caps, no surprises
- **Automatic distribution** - Everywhere your audience is
- **Built-in analytics** - See what's working
- **24/7 support** - Real humans, real help

## Real Results from Real Customers

"I launched in one afternoon. Six months later, I have 10,000 users."
— **Sarah M., The Creative Hour**

"[YOUR COMPANY] helped me grow my audience by 300% in year one. The analytics alone are worth it."
— **Marcus T., Tech Talk Daily**

## No Risk, All Reward

- Free 14-day trial
- No credit card required
- Cancel anytime

**[Start Your Free Trial →]**

Still have questions? [Book a quick demo](/demo) with our team.
    """

    result = score_landing_page(
        content=sample_content,
        page_type='seo',
        conversion_goal='trial',
        meta_title="Easy Product Hosting | Start Free Today - [YOUR COMPANY]",
        meta_description="Get started in minutes with [YOUR COMPANY]. No technical skills needed. Free 14-day trial, no credit card required. Join 50,000+ customers today.",
        primary_keyword="product hosting"
    )

    print("=== Landing Page Score Report ===")
    print(f"\nPage Type: {result['page_type'].upper()}")
    print(f"Conversion Goal: {result['conversion_goal']}")
    print(f"\nOverall Score: {result['overall_score']}/100")
    print(f"Grade: {result['grade']}")
    print(f"Publishing Ready: {result['publishing_ready']}")

    print(f"\nCategory Scores:")
    for category, score in result['category_scores'].items():
        print(f"  {category}: {score}")

    if result['critical_issues']:
        print(f"\nCritical Issues:")
        for issue in result['critical_issues']:
            print(f"  ❌ {issue}")

    if result['warnings']:
        print(f"\nWarnings:")
        for warning in result['warnings']:
            print(f"  ⚠️  {warning}")

    if result['suggestions']:
        print(f"\nSuggestions:")
        for suggestion in result['suggestions'][:3]:
            print(f"  💡 {suggestion}")
