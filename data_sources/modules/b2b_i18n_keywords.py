"""
B2B Content Auditor — Multi-Language (DE/ES/FR) Keyword Registry

Centralized i18n keyword patterns for b2b_content_auditor.py and
information_gain_analyzer.py. Provides language detection from canonical
URL / JSON-LD inLanguage / heuristic function-word counting, plus per-language
keyword sets for all 15 audit checks.

Usage:
    from b2b_i18n_keywords import B2BI18n, detect_language

    lang = detect_language(content, meta)
    i18n = B2BI18n(lang)
    tldr_kws = i18n.get('TLDR_KEYWORDS')
    fluff_patterns = i18n.get_patterns('OPENING_FLUFF_PATTERNS')

All registries fall back to English when a language code is unsupported.
"""

import re
from typing import Any, Dict, List, Optional, Set

# ── Supported languages ──
SUPPORTED_LANGS = frozenset({'en', 'de', 'es', 'fr', 'ru'})

# ═══════════════════════════════════════════════════════════
# Language Detection
# ═══════════════════════════════════════════════════════════

# Strongly differentiating function words for heuristic detection.
# Each word must be unique to ONE language to avoid cross-contamination.
_LANG_FUNCTION_WORDS: Dict[str, List[str]] = {
    'de': ['der', 'die', 'das', 'und', 'mit', 'von', 'für', 'auf', 'bei',
           'eine', 'einen', 'dem', 'den', 'nicht', 'sich', 'auch', 'wird',
           'über', 'nach', 'aus', 'vor', 'zur', 'zum', 'im', 'am', 'des'],
    'es': ['para', 'como', 'entre', 'desde', 'cada', 'todo', 'porque',
           'cual', 'sino', 'también', 'sobre', 'hasta', 'donde'],
    'fr': ['dans', 'avec', 'pour', 'sur', 'plus', 'aussi', 'très', 'tout',
           'bien', 'leur', 'cette', 'mais', 'fait', 'être', 'avoir', 'peut'],
    'ru': ['и', 'в', 'на', 'с', 'по', 'для', 'от', 'к', 'из', 'что',
           'как', 'это', 'так', 'то', 'не', 'но', 'а', 'да', 'или',
           'если', 'уже', 'ещё', 'бы', 'же', 'ли', 'за', 'до',
           'при', 'под', 'над', 'без', 'через', 'между', 'перед',
           'также', 'только', 'ещё', 'очень', 'весь', 'весьма',
           'который', 'свой', 'себя', 'один', 'такой', 'чтобы'],
    'ar': ['في', 'من', 'على', 'مع', 'عن', 'إلى', 'هذا', 'ذلك',
           'هذه', 'تلك', 'التي', 'الذي', 'كان', 'كانت', 'يكون',
           'كما', 'أو', 'لا', 'ما', 'إذا', 'قد', 'قد', 'لم'],
}

def detect_language(content: str, meta: Optional[Dict] = None) -> str:
    """
    Detect article language. Priority:
    1. meta['lang'] or meta['language'] explicit override
    2. Canonical URL path prefix: /de/blog/ → 'de', /es/blog/ → 'es', /fr/blog/ → 'fr'
    3. Schema inLanguage property
    4. Heuristic: count strongly-differentiating function words
    Returns 'en' if detection fails (safe default).
    """
    # ── 1. Explicit meta override ──
    if meta:
        explicit = meta.get('lang') or meta.get('language')
        if explicit and explicit in SUPPORTED_LANGS:
            return explicit

    # ── 2. Canonical URL path prefix ──
    if meta and meta.get('canonical'):
        canonical = meta['canonical']
    else:
        c_match = re.search(
            r'canonical\s*:\s*["\']?([^"\'\n]{3,100})["\']?',
            content[:2000]
        )
        canonical = c_match.group(1).strip().strip('"').strip("'") if c_match else ''

    for lang_code in ('de', 'es', 'fr', 'ru'):
        if f'/{lang_code}/' in canonical or canonical.startswith(f'{lang_code}/'):
            return lang_code

    # ── 3. Schema inLanguage ──
    il_match = re.search(
        r'"inLanguage"\s*:\s*"([a-z]{2})"',
        content[:3000]
    )
    if il_match and il_match.group(1) in SUPPORTED_LANGS:
        return il_match.group(1)

    # ── 4. Heuristic: function-word counting ──
    # Strip JSON-LD and HTML to avoid cross-contamination from English schema markup
    clean = re.sub(r'<script[^>]*>.*?</script>', '', content, flags=re.DOTALL)
    clean = re.sub(r'<[^>]+>', ' ', clean)  # strip HTML tags
    clean_lower = clean.lower()
    words = set(re.findall(r'[^\W\d_]{2,}', clean_lower))

    scores = {}
    for lang_code, func_words in _LANG_FUNCTION_WORDS.items():
        score = sum(1 for w in func_words if w in words or f' {w} ' in clean_lower)
        scores[lang_code] = score

    # Need at least 5 matches for confidence
    best_lang = max(scores, key=scores.get)
    if scores[best_lang] >= 5:
        return best_lang

    return 'en'


# ═══════════════════════════════════════════════════════════
# Registry 1: TL;DR / Key Takeaways Keywords
# ═══════════════════════════════════════════════════════════

I18N_TLDR_KEYWORDS: Dict[str, List[str]] = {
    'en': [
        'TL;DR', 'TLDR', 'Key Takeaways', 'Key Takeaway',
        'At a Glance', 'In a Nutshell', 'Quick Summary',
        'Core Takeaways', 'Executive Summary', 'Bottom Line',
    ],
    'de': [
        'AUF EINEN BLICK', 'Auf einen Blick', 'KERNERKENNTNISSE', 'Kernerkenntnisse',
        'Kurz zusammengefasst', 'Kernaussagen', 'Kernaussage',
        'Das Wichtigste', 'Zusammenfassung',
        'Executive Summary', 'Management Summary',
        'TL;DR', 'TLDR', 'Schnellübersicht', 'Kurzzusammenfassung',
        'Fazit', 'In Kürze', 'Kurz gesagt',
    ],
    'es': [
        'EN RESUMEN', 'En Resumen', 'En resumen',
        'Puntos Clave', 'Punto Clave',
        'En Pocas Palabras', 'Resumen Ejecutivo',
        'Lo Esencial', 'Conclusiones Clave', 'Conclusión Clave',
        'De un Vistazo', 'Resumen Rápido',
        'TL;DR', 'TLDR',
    ],
    'fr': [
        'EN BREF', 'En Bref', 'En bref',
        'Points Clés', 'Points Clés à Retenir', 'Point Clé',
        'Résumé', 'Résumé Rapide', 'Synthèse',
        "L'Essentiel", 'En un Coup d\'Œil',
        'TL;DR', 'TLDR',
    ],
    'ru': [
        'КРАТКИЙ ОБЗОР', 'Краткий обзор',
        'Ключевые выводы', 'Основные выводы',
        'Коротко о главном', 'Главное',
        'Резюме', 'Краткое содержание',
        'TL;DR', 'TLDR',
        'В двух словах', 'Самое важное',
    ],
}

# ═══════════════════════════════════════════════════════════
# Registry 2: B2B Signal Words
# ═══════════════════════════════════════════════════════════

I18N_B2B_SIGNAL_WORDS: Dict[str, List[str]] = {
    'en': [
        'OEM', 'ODM', 'manufacturer', 'factory', 'supplier', 'importer',
        'sourcing', 'MOQ', 'FOB', 'B2B', 'DDP', 'CIF', 'EXW',
        'BOM', 'buyer', 'buyers', 'certification', 'certifications',
        'procurement', 'wholesale', 'bulk', 'supply chain', 'vendor',
        'customs', 'tariff', 'tariffs',
    ],
    'de': [
        # Universal acronyms
        'OEM', 'ODM', 'MOQ', 'FOB', 'B2B', 'DDP', 'CIF', 'EXW',
        # German B2B terms
        'Hersteller', 'Fabrik', 'Werk', 'Lieferant', 'Zulieferer',
        'Importeur', 'Importeure', 'Beschaffung', 'Einkauf',
        'Großhandel', 'Großhändler', 'Großbestellung',
        'Mindestbestellmenge', 'Lieferkette', 'Logistik',
        'Anbieter', 'Verkäufer', 'Handelspartner',
        'Zollabwicklung', 'Einfuhr', 'Ausfuhr',
        'Produktion', 'Fertigung', 'Qualitätskontrolle',
        'Lager', 'Versand', 'Fracht',
    ],
    'es': [
        'OEM', 'ODM', 'MOQ', 'FOB', 'B2B', 'DDP', 'CIF', 'EXW',
        'BOM', 'comprador', 'compradores',
        'fabricante', 'fabricantes', 'fábrica', 'proveedor', 'suministrador',
        'importador', 'importadores', 'abastecimiento', 'adquisición', 'compras',
        'mayorista', 'venta al por mayor', 'pedido mínimo',
        'cadena de suministro', 'logística',
        'vendedor', 'socio comercial',
        'aduana', 'aduanero', 'arancel', 'aranceles',
        'certificación', 'certificaciones',
        'importación', 'exportación',
        'producción', 'fabricación', 'control de calidad',
        'almacén', 'envío', 'transporte',
    ],
    'fr': [
        'OEM', 'ODM', 'MOQ', 'FOB', 'B2B', 'DDP', 'CIF', 'EXW',
        'fabricant', 'usine', 'fournisseur', 'sous-traitant',
        'importateur', 'approvisionnement', 'achats',
        'grossiste', 'vente en gros', 'commande minimum',
        'chaîne d\'approvisionnement', 'logistique',
        'vendeur', 'partenaire commercial',
        'douane', 'importation', 'exportation',
        'production', 'fabrication', 'contrôle qualité',
        'entrepôt', 'expédition', 'fret',
    ],
    'ru': [
        'OEM', 'ODM', 'MOQ', 'FOB', 'B2B', 'DDP', 'CIF', 'EXW',
        'производитель', 'завод', 'фабрика', 'поставщик', 'импортёр',
        'импорт', 'закупки', 'снабжение', 'опт', 'оптовый',
        'минимальный заказ', 'минимальная партия',
        'цепочка поставок', 'логистика', 'склад',
        'продавец', 'торговый партнёр', 'дистрибьютор',
        'таможня', 'таможенная очистка', 'доставка', 'фрахт',
        'производство', 'контроль качества', 'сертификация',
        'отгрузка', 'экспорт', 'импортозамещение',
    ],
}

# ═══════════════════════════════════════════════════════════
# Registry 3: Opening Fluff Patterns (regex strings)
# ═══════════════════════════════════════════════════════════

I18N_OPENING_FLUFF_PATTERNS: Dict[str, List[str]] = {
    'en': [
        r"in today'?s\s+(?:digital|modern|fast-paced|rapidly\s+evolving)",
        r'\bwhen it comes to\b',
        r"let'?s\s+dive\s+(?:in|into)",
        r'\bin the world of\b',
        r'\bwith the (?:rise|advent|growth|increasing)',
        r"in today'?s\s+(?:fast-paced|competitive|global)\s+(?:world|market|landscape|economy)",
        r'\bhas (?:revolutionized|transformed|changed) the way\b',
        r'\bmore important than ever\b',
    ],
    'de': [
        r'\bin der heutigen\s+(?:digitalen|modernen|schnelllebigen)\b',
        r'\bwenn es um\s+\S+\s+geht\b',
        r'\btauchen wir ein in\b',
        r'\bin der Welt der\b',
        r'\bmit dem (?:Aufstieg|Wachstum|zunehmenden)\b',
        r'\bhat die Art und Weise\s+\S+\s*,\s*\S+\s+zu\b',
        r'\bwichtiger denn je\b',
        r'\bim heutigen\s+(?:digitalen|modernen)\s+(?:Zeitalter|Markt)\b',
    ],
    'es': [
        r'\ben el mundo digital de hoy\b',
        r'\bcuando se trata de\b',
        r'\bvamos a sumergirnos en\b',
        r'\ben el mundo de\b',
        r'\bcon el (?:auge|crecimiento|aumento)\b',
        r'\bha (?:revolucionado|transformado|cambiado) la forma\b',
        r'\bmás importante que nunca\b',
        r'\ben la (?:era|economía) digital\b',
    ],
    'fr': [
        r"\bdans le monde numérique d'aujourd'hui\b",
        r"\bquand il s'agit de\b",
        r'\bplongeons dans\b',
        r'\bdans le monde de\b',
        r'\bavec (?:l\'essor|la croissance|l\'augmentation)\b',
        r'\ba (?:révolutionné|transformé|changé) la façon\b',
        r'\bplus important que jamais\b',
        r"\bdans l'ère numérique\b",
    ],
    'ru': [
        r'\bв современном\s+(?:цифровом|быстро\s+меняющемся)\b',
        r'\bкогда речь идёт о\b',
        r'\bдавайте погрузимся в\b',
        r'\bв мире\b',
        r'\bс (?:ростом|развитием|увеличением)\b',
        r'\bпроизвел[ао] революцию\b',
        r'\bважнее, чем когда-либо\b',
        r'\bв сегодняшней\s+(?:цифровой|конкурентной)\s+(?:экономике|среде)\b',
    ],
}

# ═══════════════════════════════════════════════════════════
# Registry 4: Conclusion Signals (regex strings)
# ═══════════════════════════════════════════════════════════

I18N_CONCLUSION_SIGNALS: Dict[str, List[str]] = {
    'en': [
        r'\bISO\s+\d{4,5}\b',
        r'\b(?:EN|IEC)\s+\d{4,}[-\d]*\b',
        r'(?:we|our)\s+(?:tested|verified|measured|found|discovered|achieved)',
        r'\b(?:reduces?|achieves?|delivers?|enables?|produces?|eliminates?|prevents?)\s+\d',
        r'\b\d+\s*(?:%|percent|°C|℃|mV|kV|kW|kWh|MHz|kHz|GHz|mm|cm|m|g|kg|W|A|V|Hz|€)\b',
    ],
    'de': [
        r'\bISO\s+\d{4,5}\b',
        r'\b(?:EN|IEC|DIN)\s+\d{4,}[-\d]*\b',
        r'(?:wir|unser|unsere)\s+(?:getestet|verifiziert|gemessen|gefunden|entdeckt|erreicht|geprüft)',
        r'\b(?:reduziert|erreicht|liefert|ermöglicht|produziert|eliminiert|verhindert)\s+\d',
        r'\b\d+\s*(?:%|Prozent|°C|℃|mV|kV|kW|kWh|MHz|kHz|GHz|mm|cm|m|g|kg|W|A|V|Hz|€)\b',
    ],
    'es': [
        r'\bISO\s+\d{4,5}\b',
        r'\b(?:EN|IEC)\s+\d{4,}[-\d]*\b',
        r'(?:nosotros|nuestro|hemos)\s+(?:probado|verificado|medido|encontrado|descubierto|logrado)',
        r'\b(?:reduce|logra|ofrece|permite|produce|elimina|previene)\s+\d',
        r'\b\d+\s*(?:%|por ciento|°C|℃|mV|kV|kW|kWh|MHz|kHz|GHz|mm|cm|m|g|kg|W|A|V|Hz|€)\b',
    ],
    'fr': [
        r'\bISO\s+\d{4,5}\b',
        r'\b(?:EN|IEC|NF)\s+\d{4,}[-\d]*\b',
        r'(?:nous|notre)\s+(?:testé|vérifié|mesuré|trouvé|découvert|atteint)',
        r"\b(?:réduit|atteint|fournit|permet|produit|élimine|empêche)\s+\d",
        r'\b\d+\s*(?:%|pour cent|°C|℃|mV|kV|kW|kWh|MHz|kHz|GHz|mm|cm|m|g|kg|W|A|V|Hz|€)\b',
    ],
    'ru': [
        r'\bISO\s+\d{4,5}\b',
        r'\b(?:ГОСТ|EN|IEC|ТУ)\s+\d{4,}[-\d]*\b',
        r'(?:мы|наш|наша|наши)\s+(?:протестировали|проверили|измерили|обнаружили|достигли)',
        r'\b(?:снижает|достигает|обеспечивает|позволяет|производит|устраняет|предотвращает)\s+\d',
        r'\b\d+\s*(?:%|процентов|°C|мВ|кВ|кВт|МГц|кГц|ГГц|мм|см|м|г|кг|Вт|А|В|Гц|€|\$|₽)\b',
    ],
}

# ═══════════════════════════════════════════════════════════
# Registry 5: Vague Heading Patterns (regex strings)
# ═══════════════════════════════════════════════════════════

I18N_VAGUE_HEADING_PATTERNS: Dict[str, List[str]] = {
    'en': [
        r'^(?:Introduction|Overview|Background|Preface)$',
        r'^(?:About|General\s+Overview|General\s+Information|General\s+Background)$',
        r'^(?:Testing\s+Process|Testing\s+Procedure|Testing\s+Method)$',
        r'^(?:Certification|Certifications)$',
        r'^(?:Products?|Our\s+Products)$',
        r'^(?:Services?|Our\s+Services)$',
        r'^(?:Features?|Key\s+Features)$',
        r'^(?:Specifications?|Specs?)$',
        r'^(?:Conclusion|Summary|Final\s+Thoughts|Closing)$',
        r'^(?:Benefits|Advantages|Pros)$',
        r'^(?:Applications|Use\s+Cases?|Usage)$',
        r'^(?:Quality|Quality\s+Control|QC)$',
        r'^(?:Manufacturing|Production\s+Process|Production\s+Line)$',
        r'^(?:Pricing|Price|Costs?)$',
        r'^(?:Shipping|Logistics|Delivery)$',
        r'^(?:Warranty|Support|After[\-\s]?Sale)$',
        r'^(?:Performance|Efficiency)$',
    ],
    'de': [
        r'^(?:Einleitung|Einführung|Überblick|Hintergrund|Vorwort)$',
        r'^(?:Allgemeine\s+Informationen|Über\s+uns|Allgemeines)$',
        r'^(?:Testverfahren|Testprozess|Testmethode)$',
        r'^(?:Zertifizierung|Zertifizierungen|Zertifikate)$',
        r'^(?:Produkte?|Unsere\s+Produkte)$',
        r'^(?:Dienstleistungen|Services?|Unsere\s+Services)$',
        r'^(?:Funktionen|Merkmale|Eigenschaften|Features)$',
        r'^(?:Spezifikationen|Technische\s+Daten|Datenblatt)$',
        r'^(?:Fazit|Zusammenfassung|Schlusswort|Abschluss)$',
        r'^(?:Vorteile|Nutzen|Benefits)$',
        r'^(?:Anwendungen|Anwendungsfälle|Einsatzbereiche)$',
        r'^(?:Qualität|Qualitätskontrolle|QC)$',
        r'^(?:Herstellung|Herstellungsprozess|Fertigung|Produktion)$',
        r'^(?:Preise?|Preisgestaltung|Kosten)$',
        r'^(?:Versand|Logistik|Lieferung|Zustellung)$',
        r'^(?:Garantie|Support|Kundendienst)$',
        r'^(?:Performance|Leistung|Effizienz)$',
    ],
    'es': [
        r'^(?:Introducción|Vista\s+General|Antecedentes|Prefacio)$',
        r'^(?:Acerca\s+de|Información\s+General|Sobre)$',
        r'^(?:Proceso\s+de\s+Prueba|Método\s+de\s+Prueba)$',
        r'^(?:Certificación|Certificaciones)$',
        r'^(?:Productos?|Nuestros\s+Productos)$',
        r'^(?:Servicios?|Nuestros\s+Servicios)$',
        r'^(?:Características|Funcionalidades)$',
        r'^(?:Especificaciones|Ficha\s+Técnica)$',
        r'^(?:Conclusión|Resumen|Reflexiones\s+Finales)$',
        r'^(?:Beneficios|Ventajas|Pros)$',
        r'^(?:Aplicaciones|Casos\s+de\s+Uso|Usos)$',
        r'^(?:Calidad|Control\s+de\s+Calidad)$',
        r'^(?:Fabricación|Proceso\s+de\s+Producción)$',
        r'^(?:Precios?|Costos?|Tarifas)$',
        r'^(?:Envío|Logística|Entrega)$',
        r'^(?:Garantía|Soporte|Posventa)$',
        r'^(?:Rendimiento|Eficiencia)$',
    ],
    'fr': [
        r'^(?:Introduction|Aperçu|Contexte|Préface)$',
        r'^(?:À\s+Propos|Informations?\s+Générale)$',
        r'^(?:Procédure\s+de\s+Test|Méthode\s+de\s+Test)$',
        r'^(?:Certification|Certifications)$',
        r'^(?:Produits?|Nos\s+Produits)$',
        r'^(?:Services?|Nos\s+Services)$',
        r'^(?:Fonctionnalités|Caractéristiques)$',
        r'^(?:Spécifications|Fiche\s+Technique)$',
        r'^(?:Conclusion|Résumé|Synthèse)$',
        r'^(?:Avantages|Bénéfices|Atouts)$',
        r'^(?:Applications|Cas\s+d\'Usage|Usages)$',
        r'^(?:Qualité|Contrôle\s+Qualité|CQ)$',
        r'^(?:Fabrication|Processus\s+de\s+Production)$',
        r'^(?:Tarifs|Prix|Coûts)$',
        r'^(?:Expédition|Logistique|Livraison)$',
        r'^(?:Garantie|Support|Service\s+Après[\-\s]?Vente)$',
        r'^(?:Performance|Efficacité|Rendement)$',
    ],
    'ru': [
        r'^(?:Введение|Обзор|Предпосылки|Предисловие)$',
        r'^(?:О\s+(?:нас|продукте)|Общая\s+информация)$',
        r'^(?:Процесс\s+тестирования|Метод\s+тестирования|Методика\s+испытаний)$',
        r'^(?:Сертификация|Сертификации|Сертификаты)$',
        r'^(?:Продукты?|Наши\s+продукты|Товары)$',
        r'^(?:Услуги|Наши\s+услуги|Сервисы)$',
        r'^(?:Функции|Характеристики|Особенности|Ключевые\s+особенности)$',
        r'^(?:Спецификации?|Технические\s+характеристики|Характеристики)$',
        r'^(?:Заключение|Выводы?|Резюме|Итоги)$',
        r'^(?:Преимущества|Выгоды|Плюсы)$',
        r'^(?:Применение|Сферы\s+применения|Варианты\s+использования|Области\s+применения)$',
        r'^(?:Качество|Контроль\s+качества|ОТК|QC)$',
        r'^(?:Производство|Производственный\s+процесс|Техпроцесс)$',
        r'^(?:Цены?|Ценообразование|Стоимость|Расходы|Прайс)$',
        r'^(?:Доставка|Логистика|Отгрузка|Транспортировка|Перевозка)$',
        r'^(?:Гарантия|Поддержка|Послепродажное\s+обслуживание|Сервис)$',
        r'^(?:Производительность|Эффективность|КПД|Мощность)$',
    ],
}

# ═══════════════════════════════════════════════════════════
# Registry 6: Consumer Language (regex strings, FAQ detection)
# ═══════════════════════════════════════════════════════════

I18N_CONSUMER_LANGUAGE: Dict[str, List[str]] = {
    'en': [
        r'(?:which|what)\s+is\s+the\s+best\b',
        r'\btop\s+\d+\b',
        r'\bcheap(?:est)?\b',
        r'\bgood\s+(?:choice|option|deal|value)\b',
        r'\b(?:buy|buying)\s+guide\b',
        r'\breview\b(?!\s+(?:process|procedure|audit|inspection))',
        r'\b(?:which\s+one|for\s+(?:home|personal|family))\b',
    ],
    'de': [
        r'\b(?:welches|was)\s+ist\s+das\s+beste\b',
        r'\bTop\s*\d+\b',
        r'\b(?:billig|günstigste|günstigsten?|preiswert)\b',
        r'\bgute\s+(?:Wahl|Option|Entscheidung)\b',
        r'\b(?:Kaufberatung|Kaufguide|Einkaufsratgeber)\b',
        r'\b(?:Bewertung|Rezension|Testbericht)\b(?!\s+(?:prozess|verfahren|audit))',
        r'\b(?:für\s+zu\s+Hause|für\s+den\s+Privatgebrauch|welches\s+Gerät)\b',
    ],
    'es': [
        r'\b(?:cuál|qué)\s+es\s+el\s+mejor\b',
        r'\b(?:los\s+)?\d+\s+mejores\b',
        r'\b(?:barato|barata|económico|más\s+barato)\b',
        r'\bbuena\s+(?:opción|elección|compra)\b',
        r'\bguía\s+de\s+compra\b',
        r'\b(?:reseña|review|análisis)\b(?!\s+(?:de\s+proceso|de\s+auditoría))',
        r'\b(?:para\s+el\s+hogar|para\s+casa|uso\s+personal)\b',
    ],
    'fr': [
        r'\b(?:quel|quelle)\s+est\s+le\s+meilleur\b',
        r'\b(?:top|meilleurs?)\s+\d+\b',
        r'\b(?:bon\s+marché|pas\s+cher|moins\s+cher)\b',
        r'\bbon\s+(?:choix|plan|rapport\s+qualité[\-\s]?prix)\b',
        r'\bguide\s+d\'achat\b',
        r'\b(?:avis|critique|test)\b(?!\s+(?:de\s+processus|d\'audit))',
        r'\b(?:pour\s+la\s+maison|usage\s+personnel|pour\s+chez\s+soi)\b',
    ],
    'ru': [
        r'\b(?:какой|какое|какая)\s+(?:лучший|лучшее|лучшая)\b',
        r'\bТоп\s*\d+\b',
        r'\b(?:дешёвый|дешевле|самый\s+дешёвый|бюджетный|недорогой)\b',
        r'\bхороший\s+(?:выбор|вариант|покупка)\b',
        r'\b(?:руководство|гид)\s+по\s+(?:покупке|выбору)\b',
        r'\b(?:обзор|отзыв|рейтинг)\b(?!\s+(?:процесса|аудита|проверки))',
        r'\b(?:для\s+дома|для\s+личного\s+пользования|какой\s+выбрать)\b',
    ],
}

# ═══════════════════════════════════════════════════════════
# Registry 7: B2B Buyer Language (regex strings, FAQ detection)
# ═══════════════════════════════════════════════════════════

I18N_B2B_BUYER_LANGUAGE: Dict[str, List[str]] = {
    'en': [
        r'\bminimum\s+order\b',
        r'\bprivate\s+label\b',
        r'\bFOB\b|\bCIF\b|\bDDP\b|\bEXW\b',
        r'\bMOQ\b',
        r'\blead\s+time\b|\bproduction\s+time\b|\bturnaround\b',
        r'\b(?:minimum|bulk|wholesale)\s+order\b',
        r'\b(?:importer|procurement|sourcing|supply\s+chain)\b',
        r'\b(?:factory\s+audit|verify|inspect|evaluate|select)\s+(?:a\s+)?(?:supplier|manufacturer)\b',
        r'\b(?:defect\s+rate|burn[\-\s]in|aging\s+test|QC\s+(?:equipment|process|check)|AQL)\b',
        r'\b(?:freight|shipping|customs|landed\s+cost|incoterm|forwarder)\b',
        r'\b(?:container|bill\s+of\s+lading|air\s+waybill|FCL|LCL)\b',
        r'\bWPC\b|\bQi2\b|\bQi\s*2\b',
        r'\bthird[\-\s]?party\s+(?:audit|inspection|test)\b',
        r'\b(?:import\s+duty|tariff|customs\s+duty)\b',
        r'\bHS\s*(?:code)?\s*\d{4}\b',
        r'\b(?:HS\s+code|classification|customs\s+clearance)\b',
        r'\b(?:compliance|certification|EN\s+\d+|IEC\s+\d+|UL\s+\d+|CE\s+mark)\b',
    ],
    'de': [
        # German B2B noun stems (match inflected forms: Hersteller/s/n, Importeur/s/e/en, etc.)
        r'\bHersteller|Herstellungs\b',
        r'\bImporteur|Importeuren?\b',
        r'\bLieferant\w*\b',
        r'\bFabrik\w*\b',
        r'\bZertifizierung\w*\b',
        r'\bBeschaffung\b',
        r'\bGroßhandel|Großhändler\b',
        r'\bZulieferer\w*\b',
        r'\b(?:OEM|ODM)\b',
        r'\bMindestbestellmenge\b',
        r'\bEigenmarke\b|\bPrivate\s*Label\b',
        r'\bFOB\b|\bCIF\b|\bDDP\b|\bEXW\b',
        r'\bMOQ\b',
        r'\bLieferzeit\b|\bProduktionszeit\b|\bDurchlaufzeit\b',
        r'\b(?:Mindestbestellmenge|Großbestellung|Massenbestellung)\b',
        r'\b(?:Importeur|Beschaffung|Einkauf|Lieferkette)\b',
        r'\b(?:Fabrikaudit|Werksprüfung|Lieferantenaudit|prüfen|evaluieren|auswählen)\b',
        r'\b(?:Defektrate|Ausschussrate|Burn[\-\s]?in|Alterungstest|AQL|QC)\b',
        r'\b(?:Fracht|Versand|Zoll|Landungskosten|Incoterm|Spediteur)\b',
        r'\b(?:Container|Frachtbrief|Luftfrachtbrief|Konossement|FCL|LCL)\b',
        r'\bWPC\b|\bQi2\b|\bQi\s*2\b',
        r'\b(?:Drittanbieter|Fremd)(?:[\-\s]?(?:Prüfung|Audit|Inspektion|Test))\b',
        r'\b(?:Einfuhrzoll|Zolltarif|Zollsatz|Zollgebühr)\b',
        r'\bHS[\-\s]?(?:Code)?\s*\d{4}\b',
        r'\b(?:HS[\-\s]?Code|Zolltarifnummer|Zollabfertigung)\b',
        r'\b(?:Konformität|Zertifizierung|EN\s+\d+|IEC\s+\d+|DIN\s+\d+|CE[\-\s]?Kennzeichnung)\b',
    ],
    'es': [
        r'\bpedido mínimo\b|\bcantidad mínima\b',
        r'\bmarca blanca\b|\bmarca propia\b',
        r'\bFOB\b|\bCIF\b|\bDDP\b|\bEXW\b',
        r'\bMOQ\b',
        r'\bplazo de entrega\b|\btiempo de producción\b',
        r'\b(?:pedido mínimo|pedido al por mayor|gran pedido)\b',
        r'\b(?:importador|abastecimiento|adquisición|cadena de suministro)\b',
        r'\b(?:auditoría de fábrica|verificar|inspeccionar|evaluar|seleccionar)\s+(?:un\s+)?(?:proveedor|fabricante)\b',
        r'\b(?:tasa de defectos|prueba de envejecimiento|AQL|control de calidad)\b',
        r'\b(?:flete|envío|aduana|costo de desembarque|incoterm|transitario)\b',
        r'\b(?:contenedor|conocimiento de embarque|guía aérea|FCL|LCL)\b',
        r'\bWPC\b|\bQi2\b|\bQi\s*2\b',
        r'\b(?:auditoría|inspección|prueba)\s+(?:de\s+)?(?:terceros|externa)\b',
        r'\b(?:arancel de importación|derecho de aduana|tarifa aduanera)\b',
        r'\bHS\s*(?:code)?\s*\d{4}\b',
        r'\b(?:código\s+HS|clasificación\s+arancelaria|despacho\s+de\s+aduana)\b',
        r'\b(?:cumplimiento|certificación|EN\s+\d+|IEC\s+\d+|marcado\s+CE)\b',
    ],
    'fr': [
        r'\bcommande minimum\b|\bquantité minimum\b',
        r'\bmarque de distributeur\b|\bmarque blanche\b',
        r'\bFOB\b|\bCIF\b|\bDDP\b|\bEXW\b',
        r'\bMOQ\b',
        r'\bdélai de livraison\b|\btemps de production\b',
        r'\b(?:commande minimum|commande en gros|grosse commande)\b',
        r'\b(?:importateur|approvisionnement|achats|chaîne d\'approvisionnement)\b',
        r'\b(?:audit d\'usine|vérifier|inspecter|évaluer|sélectionner)\s+(?:un\s+)?(?:fournisseur|fabricant)\b',
        r'\b(?:taux de défaut|test de vieillissement|AQL|contrôle qualité)\b',
        r'\b(?:fret|expédition|douane|coût de débarquement|incoterm|transitaire)\b',
        r'\b(?:conteneur|connaissement|lettre de transport aérien|FCL|LCL)\b',
        r'\bWPC\b|\bQi2\b|\bQi\s*2\b',
        r'\b(?:audit|inspection|test)\s+(?:tiers|externe|indépendant)\b',
        r'\b(?:droit d\'importation|tarif douanier|droit de douane)\b',
        r'\bHS\s*(?:code)?\s*\d{4}\b',
        r'\b(?:code\s+HS|classification\s+tarifaire|dédouanement)\b',
        r'\b(?:conformité|certification|EN\s+\d+|IEC\s+\d+|marquage\s+CE)\b',
    ],
    'ru': [
        r'\bминимальный\s+заказ\b|\bминимальная\s+партия\b',
        r'\bсобственная\s+торговая\s+марка\b|\bprivate\s*label\b|\bСТМ\b',
        r'\bFOB\b|\bCIF\b|\bDDP\b|\bEXW\b',
        r'\bMOQ\b|\bМОК\b',
        r'\bсрок\s+(?:поставки|производства|изготовления)\b',
        r'\b(?:минимальный|оптовый|крупный)\s+заказ\b',
        r'\b(?:импортёр|закупки|снабжение|цепочка\s+поставок)\b',
        r'\b(?:аудит\s+(?:фабрики|завода)|проверить|инспектировать|оценить|выбрать)\s+(?:поставщика|производителя)\b',
        r'\b(?:уровень\s+дефектов|тест\s+на\s+старение|AQL|ОТК|контроль\s+качества)\b',
        r'\b(?:фрахт|доставка|таможня|стоимость\s+доставки|инкотермс|экспедитор)\b',
        r'\b(?:контейнер|коносамент|авианакладная|FCL|LCL)\b',
        r'\bWPC\b|\bQi2\b|\bQi\s*2\b',
        r'\b(?:независимый|сторонний)\s+(?:аудит|инспекция|тест|проверка)\b',
        r'\b(?:импортная\s+пошлина|таможенный\s+тариф|таможенная\s+пошлина)\b',
        r'\bТН\s*ВЭД\s*\d{4,}\b',
        r'\b(?:код\s+ТН\s*ВЭД|таможенная\s+классификация|таможенная\s+очистка)\b',
        r'\b(?:соответствие|сертификация|ГОСТ|EN\s+\d+|IEC\s+\d+|EAC|ЕАС)\b',
    ],
}

# ═══════════════════════════════════════════════════════════
# Registry 8: Weak CTA Patterns (regex strings)
# ═══════════════════════════════════════════════════════════

I18N_WEAK_CTA_PATTERNS: Dict[str, List[str]] = {
    'en': [
        r'(?:buy|purchase)\s+(?:now|today|here)',
        r'\bclick\s+here\b',
        r'\bcontact\s+us\s+(?:for|to\s+get)\s+more\s+information\b',
        r'\bget\s+started\s+(?:today|now)\b',
        r'\bsign\s+up\s+(?:today|now|here)\b',
        r'\bshop\s+now\b',
    ],
    'de': [
        r'\bjetzt\s+(?:kaufen|bestellen)\b',
        r'\bhier\s+klicken\b',
        r'\bkontaktieren Sie uns für weitere Informationen\b',
        r'\bjetzt\s+(?:starten|loslegen|beginnen)\b',
        r'\bjetzt\s+(?:anmelden|registrieren)\b',
        r'\bjetzt\s+einkaufen\b',
    ],
    'es': [
        r'\b(?:comprar|adquirir)\s+(?:ahora|hoy)\b',
        r'\bhaga?\s+clic\s+aquí\b',
        r'\bcontáctenos para más información\b',
        r'\b(?:comience|empiece)\s+(?:hoy|ahora)\b',
        r'\bregístrese\s+(?:hoy|ahora)\b',
        r'\bcompre?\s+ahora\b',
    ],
    'fr': [
        r'\b(?:acheter|achetez)\s+(?:maintenant|aujourd\'hui)\b',
        r'\bcliquez\s+ici\b',
        r'\bcontactez[\-\s]?nous pour plus d\'informations\b',
        r'\bcommencez?\s+(?:aujourd\'hui|maintenant)\b',
        r'\binscrivez[\-\s]?vous\s+(?:aujourd\'hui|maintenant)\b',
        r'\bachetez?\s+maintenant\b',
    ],
    'ru': [
        r'\b(?:купить|купите|заказать|закажите)\s+(?:сейчас|сегодня)\b',
        r'\b(?:нажмите|кликните)\s+(?:сюда|здесь)\b',
        r'\bсвяжитесь с нами для получения\b',
        r'\b(?:начните|начинайте)\s+(?:сегодня|сейчас|прямо\s+сейчас)\b',
        r'\b(?:зарегистрируйтесь|подпишитесь)\s+(?:сегодня|сейчас)\b',
        r'\b(?:купить|заказать)\s+прямо\s+сейчас\b',
    ],
}

# ═══════════════════════════════════════════════════════════
# Registry 9: Positive CTA Patterns (strong B2B CTAs)
# ═══════════════════════════════════════════════════════════

I18N_CTA_POSITIVE_PATTERNS: Dict[str, List[str]] = {
    'en': [
        r'\b(?:get\s+(?:factory\s+)?pricing|request\s+(?:quote|sample|catalog|free)|'
        r'schedule\s+(?:call|meeting|demo|consultation)|book\s+(?:call|demo|meeting)|'
        r'start\s+(?:your\s+)?(?:project|oem|order)|talk\s+to\s+(?:our|us|an?\s+engineer)|'
        r'speak\s+with\s+(?:our|us|an?\s+engineer)|contact\s+(?:our|us|sales|engineering)|'
        r'view\s+(?:products?|catalog|portfolio)|download\s+(?:catalog|guide|specs?|datasheet)|'
        r'ready\s+to\s+(?:source|start|discuss)|let.?s\s+(?:discuss|talk|connect)|'
        r'reach\s+out|inquire\s+now)\b',
    ],
    'de': [
        r'\b(?:Angebot\s+(?:anfordern|einholen|erhalten)|Jetzt\s+(?:anfragen|starten|bestellen|kontaktieren)|'
        r'Kostenlos(?:es)?\s+(?:Angebot|Muster|Beratung)|Produkte?\s+(?:ansehen|entdecken)|'
        r'Katalog\s+(?:anfordern|herunterladen)|Probe(?:muster)?\s+(?:anfordern|bestellen)|'
        r'Beratung\s+(?:anfordern|vereinbaren|buchen)|Projekt\s+(?:starten|anfragen|beginnen)|'
        r'(?:unverbindlich|kostenlos)\s+(?:anfragen|testen)|WhatsApp\s+(?:schreiben|kontaktieren)|'
        r'Produktion\s+(?:starten|anfragen)|Powerbank[\-\s]*(?:Angebot|Hersteller)\s+(?:erhalten|anfragen))\b',
    ],
    'es': [
        r'\b(?:Solicitar\s+(?:presupuesto|catálogo|cotización|muestras?|asesoría|demo)|'
        r'Pedir\s+(?:presupuesto|información|catálogo)|Contactar|Contact[ao]|Contáctenos|'
        r'Recibir\s+(?:presupuesto|catálogo|asesoría)|Consultar\s+(?:por\s+)?(?:WhatsApp)?|'
        r'Comen[cz]ar\s+(?:ahora|proyecto|pedido)|Ver\s+(?:catálogo|productos|línea))\b',
    ],
    'fr': [
        r'\b(?:Demander\s+(?:un\s+)?(?:devis|catalogue|échantillon)|'
        r'Recevoir\s+(?:un\s+)?(?:devis|catalogue|échantillon)|'
        r'Contact(?:er|ez)?[-\s]?(?:nous)?|Commander\s+(?:un\s+)?(?:échantillon|devis)|'
        r'Parler\s+(?:par|via|sur)\s+WhatsApp|Démarrer\s+(?:votre\s+)?projet|'
        r'Télécharger\s+(?:le\s+)?(?:catalogue|guide))\b',
    ],
    'ru': [
        r'\b(?:Запросить\s+(?:расчёт|каталог|образцы|консультацию)|'
        r'Получить\s+(?:расчёт|каталог|консультацию|прайс)|'
        r'Связаться\s+(?:с\s+нами)?|Написать\s+(?:в\s+)?WhatsApp|'
        r'Начать\s+(?:проект|сотрудничество)|Заказать\s+(?:образцы|звонок|консультацию))\b',
    ],
}

# ═══════════════════════════════════════════════════════════
# Registry 10: URL Stop Words
# ═══════════════════════════════════════════════════════════

I18N_URL_STOP_WORDS: Dict[str, List[str]] = {
    'en': [
        'the', 'and', 'for', 'your', 'with', 'that', 'this', 'from',
        'are', 'not', 'its', 'have', 'has', 'been', 'can', 'how',
        'our', 'what', 'when', 'where', 'which', 'who', 'will',
        'about', 'after', 'before', 'between', 'over', 'under',
        'more', 'some', 'than', 'then', 'also', 'just', 'like',
    ],
    'de': [
        'der', 'die', 'das', 'und', 'für', 'mit', 'von', 'bei',
        'als', 'auch', 'wird', 'eine', 'einen', 'über', 'nach',
        'aus', 'dem', 'den', 'vor', 'seit', 'auf', 'ein', 'zu',
        'im', 'am', 'zum', 'zur', 'des', 'sich', 'nicht', 'oder',
        'sind', 'hat', 'war', 'wie', 'was', 'wer', 'wo', 'wann',
    ],
    'es': [
        'el', 'la', 'los', 'las', 'del', 'para', 'por', 'con',
        'una', 'como', 'más', 'este', 'esta', 'entre', 'desde',
        'cada', 'todo', 'muy', 'hay', 'ese', 'esa', 'eso',
        'pero', 'sin', 'son', 'era', 'fue', 'han',
    ],
    'fr': [
        'le', 'la', 'les', 'des', 'est', 'une', 'dans', 'pour',
        'avec', 'sur', 'plus', 'par', 'pas', 'que', 'qui', 'aux',
        'tout', 'bien', 'très', 'aussi', 'leur', 'cette',
        'mais', 'fait', 'être', 'avoir', 'peut', 'sont',
    ],
    'ru': [
        'и', 'в', 'на', 'с', 'по', 'для', 'от', 'к', 'из', 'что',
        'как', 'это', 'так', 'то', 'не', 'но', 'а', 'да', 'или',
        'если', 'уже', 'ещё', 'бы', 'же', 'ли', 'за', 'до', 'при',
        'под', 'над', 'без', 'через', 'между', 'перед', 'также',
        'только', 'очень', 'весь', 'который', 'свой', 'себя',
        'один', 'такой', 'чтобы', 'где', 'когда', 'почему',
    ],
}

# ═══════════════════════════════════════════════════════════
# Registry 10: Stock Photo Filename Patterns (regex strings)
# ═══════════════════════════════════════════════════════════

I18N_STOCK_FILENAME_PATTERNS: Dict[str, List[str]] = {
    'en': [
        r'handshake|shaking[_\-\s]?hands',
        r'business[_\-\s]?meeting|boardroom|conference[_\-\s]?room',
        r'smiling|suits?|corporate|teamwork|team[_\-\s]?building',
        r'photo[-\s]?\d{4,}',
        r'stock[-\s]?photo',
    ],
    'de': [
        r'(?:händedruck|handedruck|handeschutteln)',
        r'(?:geschaftstreffen|besprechung|konferenzraum|sitzungssaal)',
        r'(?:lächelnd|anzug|anzüge|teamarbeit|teambuilding)',
        r'(?:foto|bild)[-\s]?\d{4,}',
        r'(?:stockfoto|archivfoto|lizenzfrei)',
    ],
    'es': [
        r'apreton[_\-\s]?de[_\-\s]?manos|estrechar[_\-\s]?manos',
        r'reunion[_\-\s]?de[_\-\s]?negocios|sala[_\-\s]?de[_\-\s]?conferencias|junta',
        r'sonriendo|sonriente|trajes?|corporativo|trabajo[_\-\s]?en[_\-\s]?equipo',
        r'foto[-\s]?\d{4,}',
        r'(?:foto|imagen)[_\-\s]?de[_\-\s]?(?:stock|archivo)',
    ],
    'fr': [
        r'poignee[_\-\s]?de[_\-\s]?main|serrer[_\-\s]?la[_\-\s]?main',
        r'reunion[_\-\s]?d[_\'_\-\s]?affaires|salle[_\-\s]?de[_\-\s]?conference|bureau',
        r'souriant|sourire|costumes?|travail[_\-\s]?d[_\'_\-\s]?equipe|entreprise',
        r'photo[-\s]?\d{4,}',
        r'photo[_\-\s]?de[_\-\s]?(?:stock|banque[_\-\s]?d[_\'_\-\s]?images)',
    ],
    'ru': [
        r'рукопожати[ея]|пожати[ея][\s\-_]*рук',
        r'делов[ао][яе][\s\-_]*встреч[аи]|конференц[\-\s]?зал|переговорн[ао][яе]',
        r'улыба[яю]|улыбк[аи]|костюм|корпоративн|командн[ао][яе][\s\-_]*работ[аы]',
        r'фото?[\-\s]?\d{4,}',
        r'стоков[ао][ея][\s\-_]*фото|фото[\-\s]?сток',
    ],
}

# ═══════════════════════════════════════════════════════════
# Registry 11: Structural Headings (excluded from hierarchy checks)
# ═══════════════════════════════════════════════════════════

I18N_STRUCTURAL_HEADINGS: Dict[str, List[str]] = {
    'en': [
        'Table of Contents', 'Related Articles', 'Sources', 'References',
        'Frequently Asked Questions', 'FAQ', 'FAQs',
        'Sources & References', 'Source & References',
    ],
    'de': [
        'Inhaltsverzeichnis', 'Verwandte Artikel', 'Weitere Artikel',
        'Quellen', 'Referenzen', 'Quellen & Referenzen',
        'Häufig gestellte Fragen', 'Häufige Fragen',
        'FAQ', 'FAQs',
    ],
    'es': [
        'Tabla de Contenidos', 'Índice', 'Índice de Contenidos',
        'Artículos Relacionados', 'Artículos Similares',
        'Fuentes', 'Referencias', 'Fuentes & Referencias',
        'Preguntas Frecuentes', 'FAQ', 'FAQs',
    ],
    'fr': [
        'Table des Matières', 'Sommaire',
        'Articles Connexes', 'Articles Recommandés', 'Articles Liés',
        'Sources', 'Références', 'Sources & Références',
        'Questions Fréquentes', 'FAQ', 'FAQs',
    ],
    'ru': [
        'Содержание', 'Оглавление',
        'Похожие статьи', 'Связанные статьи', 'Рекомендуемые статьи',
        'Источники', 'Ссылки', 'Источники и ссылки',
        'Часто задаваемые вопросы', 'Частые вопросы', 'FAQ', 'FAQs', 'Вопросы и ответы',
    ],
}

# ═══════════════════════════════════════════════════════════
# Registry 12: Credential Patterns (Author E-E-A-T, regex strings)
# ═══════════════════════════════════════════════════════════

I18N_CREDENTIAL_PATTERNS: Dict[str, List[str]] = {
    'en': [
        r'\b\d+\+?\s*years?\b',
        r'\b(?:Senior|Lead|Head|Chief|VP|Director|Manager)\b',
        r'\b(?:Engineer|Scientist|Specialist|Expert|Consultant|Analyst)\b',
        r'\b(?:PhD|MBA|MSc|BSc|M\.?Eng|B\.?Eng)\b',
        r'\b(?:R&D|Research|Development|Engineering|Quality|Supply\s+Chain)\b',
        r'\b(?:OEM|ODM|factory|sourcing|procurement)\b',
    ],
    'de': [
        r'\b\d+\+?\s*(?:Jahre|Jahren)\b',
        r'\b(?:Senior|Leiter|Leitung|Chef|VP|Direktor|Manager|Managerin)\b',
        r'\b(?:Ingenieur|Ingenieurin|Wissenschaftler|Spezialist|Experte|Berater)\b',
        r'\b(?:PhD|Dr\.|MBA|MSc|BSc|Dipl\.?[\-\s]?Ing)\b',
        r'\b(?:F&E|Forschung|Entwicklung|Ingenieurwesen|Qualität|Lieferkette)\b',
        r'\b(?:OEM|ODM|Fabrik|Beschaffung|Einkauf|Import)\b',
    ],
    'es': [
        r'\b\d+\+?\s*años?\b',
        r'\b(?:Senior|Líder|Jefe|Director|VP|Gerente)\b',
        r'\b(?:Ingeniero|Científico|Especialista|Experto|Consultor)\b',
        r'\b(?:PhD|MBA|MSc|BSc|M\.?Ing)\b',
        r'\b(?:I\+D|Investigación|Desarrollo|Ingeniería|Calidad|Cadena de Suministro)\b',
        r'\b(?:OEM|ODM|fábrica|abastecimiento|adquisición)\b',
    ],
    'fr': [
        r'\b\d+\+?\s*ans?\b',
        r'\b(?:Senior|Responsable|Chef|Directeur|VP|Manager)\b',
        r'\b(?:Ingénieur|Scientifique|Spécialiste|Expert|Consultant)\b',
        r'\b(?:PhD|Doctorat|MBA|MSc|BSc|M\.?Ing)\b',
        r'\b(?:R&D|Recherche|Développement|Ingénierie|Qualité|Chaîne d\'Approvisionnement)\b',
        r'\b(?:OEM|ODM|usine|approvisionnement|achats)\b',
    ],
    'ru': [
        r'\b\d+\+?\s*(?:лет|год[а]?)\b',
        r'\b(?:Старший|Ведущий|Главный|Руководитель|Директор|Менеджер|Глава)\b',
        r'\b(?:Инженер|Учёный|Специалист|Эксперт|Консультант|Аналитик)\b',
        r'\b(?:PhD|д\.?т\.?н|к\.?т\.?н|MBA|MSc|BSc|кандидат\s+наук|доктор\s+наук)\b',
        r'\b(?:R&D|НИОКР|Исследования|Разработк[аи]|Инженери[яи]|Качество|Цепочка\s+поставок)\b',
        r'\b(?:OEM|ODM|завод|фабрика|снабжение|закупки|импорт)\b',
    ],
}

# ═══════════════════════════════════════════════════════════
# Registry 13: Cross-Reference Section Anchors
# ═══════════════════════════════════════════════════════════

I18N_CROSS_REF_ANCHORS: Dict[str, Dict[str, List[str]]] = {
    'en': {
        'tldr': ['Key Takeaways', 'Key Takeaway', 'TL;DR', 'TLDR', 'At a Glance', 'Quick Summary', 'Core Takeaways'],
        'toc': ['Table of Contents', 'Contents'],
        'faq': ['Frequently Asked Questions', 'FAQ', 'FAQs'],
    },
    'de': {
        'tldr': ['KERNERKENNTNISSE', 'Kernerkenntnisse', 'AUF EINEN BLICK', 'Auf einen Blick', 'Kernaussagen', 'Kurz zusammengefasst', 'Das Wichtigste', 'TL;DR', 'TLDR'],
        'toc': ['Inhaltsverzeichnis', 'Inhalt'],
        'faq': ['Häufig gestellte Fragen', 'Häufige Fragen', 'FAQ', 'FAQs', 'FAQ für OEM-Importeure'],
    },
    'es': {
        'tldr': ['EN RESUMEN', 'En Resumen', 'Puntos Clave', 'Lo Esencial', 'TL;DR', 'TLDR'],
        'toc': ['Tabla de Contenidos', 'Índice', 'Índice de Contenidos', 'Contenido'],
        'faq': ['Preguntas Frecuentes', 'FAQ', 'FAQs'],
    },
    'fr': {
        'tldr': ['EN BREF', 'En Bref', 'Points Clés', 'Résumé', "L'Essentiel", 'TL;DR', 'TLDR'],
        'toc': ['Table des Matières', 'Sommaire', 'Contenu'],
        'faq': ['Questions Fréquentes', 'FAQ', 'FAQs'],
    },
    'ru': {
        'tldr': ['КРАТКИЙ ОБЗОР', 'Краткий обзор', 'Ключевые выводы', 'Основные выводы', 'Коротко о главном', 'Главное', 'Резюме', 'TL;DR', 'TLDR'],
        'toc': ['Содержание', 'Оглавление'],
        'faq': ['Часто задаваемые вопросы', 'Частые вопросы', 'FAQ', 'FAQs', 'Вопросы и ответы'],
    },
}

# ═══════════════════════════════════════════════════════════
# Registry 14: Technical Anchors (Information Gain Analyzer)
# ═══════════════════════════════════════════════════════════

I18N_TECHNICAL_ANCHORS: Dict[str, List[str]] = {
    'en': [
        # Universal — shared across all languages
        'GaN HEMT', 'SiC MOSFET', 'GaN FET', 'planar transformer',
        'PFC', 'BMS', 'PCBA', 'SMT', 'AOI', 'SPI', 'SPC', 'Cpk', 'Ppk',
        'PD 3.1', 'PPS', 'UFCS', 'Qi2', 'MPP', 'EPP', 'BPP',
        'FOB Shenzhen', 'DDP Hamburg', 'DDP Rotterdam',
        'MTBF', 'DOA', 'AQL', 'FMEA', 'PPAP',
        # English-specific
        'ripple noise', 'creepage distance', 'clearance distance',
        'aging test', 'burn-in test', 'full-load', 'no-load',
        'switching frequency', 'synchronous rectification',
        'zero voltage switching', 'power factor correction',
        'bill of lading', 'certificate of origin', 'packing list',
    ],
    'de': [
        'GaN HEMT', 'SiC MOSFET', 'GaN FET', 'Planartransformator',
        'PFC', 'BMS', 'PCBA', 'SMT', 'AOI', 'SPI', 'SPC', 'Cpk', 'Ppk',
        'PD 3.1', 'PPS', 'UFCS', 'Qi2', 'MPP', 'EPP', 'BPP',
        'FOB Shenzhen', 'DDP Hamburg', 'DDP Rotterdam',
        'MTBF', 'DOA', 'AQL', 'FMEA', 'PPAP',
        'Restwelligkeit', 'Ripple', 'Kriechstrecke', 'Luftstrecke',
        'Alterungstest', 'Einbrenntest', 'Burn-in', 'Volllast', 'Leerlauf',
        'Schaltfrequenz', 'Synchrongleichrichtung',
        'Nullspannungsschaltung', 'Leistungsfaktorkorrektur',
        'Frachtbrief', 'Ursprungszeugnis', 'Packliste', 'Lieferschein',
    ],
    'es': [
        'GaN HEMT', 'SiC MOSFET', 'GaN FET', 'transformador planar',
        'PFC', 'BMS', 'PCBA', 'SMT', 'AOI', 'SPI', 'SPC', 'Cpk', 'Ppk',
        'PD 3.1', 'PPS', 'UFCS', 'Qi2', 'MPP', 'EPP', 'BPP',
        'FOB Shenzhen', 'DDP Hamburg', 'DDP Rotterdam',
        'MTBF', 'DOA', 'AQL', 'FMEA', 'PPAP',
        'rizado', 'distancia de fuga', 'distancia de aislamiento',
        'prueba de envejecimiento', 'prueba de quemado', 'plena carga', 'sin carga',
        'frecuencia de conmutación', 'rectificación síncrona',
        'conmutación de voltaje cero', 'corrección del factor de potencia',
        'conocimiento de embarque', 'certificado de origen', 'lista de empaque',
    ],
    'fr': [
        'GaN HEMT', 'SiC MOSFET', 'GaN FET', 'transformateur planaire',
        'PFC', 'BMS', 'PCBA', 'SMT', 'AOI', 'SPI', 'SPC', 'Cpk', 'Ppk',
        'PD 3.1', 'PPS', 'UFCS', 'Qi2', 'MPP', 'EPP', 'BPP',
        'FOB Shenzhen', 'DDP Hamburg', 'DDP Rotterdam',
        'MTBF', 'DOA', 'AQL', 'FMEA', 'PPAP',
        "ondulation résiduelle", 'ligne de fuite', 'distance d\'isolement',
        'test de vieillissement', 'test de rodage', 'pleine charge', 'à vide',
        'fréquence de commutation', 'redressement synchrone',
        'commutation à tension nulle', 'correction du facteur de puissance',
        'connaissement', "certificat d'origine", 'liste de colisage',
    ],
    'ru': [
        'GaN HEMT', 'SiC MOSFET', 'GaN FET', 'планарный трансформатор',
        'PFC', 'ККМ', 'BMS', 'PCBA', 'SMT', 'AOI', 'SPI', 'SPC', 'Cpk', 'Ppk',
        'PD 3.1', 'PPS', 'UFCS', 'Qi2', 'MPP', 'EPP', 'BPP',
        'FOB Shenzhen', 'FOB Шэньчжэнь', 'DDP Москва',
        'MTBF', 'DOA', 'AQL', 'FMEA', 'PPAP',
        'пульсации', 'ripple', 'путь утечки', 'зазор',
        'тест на старение', 'тест на приработку', 'полная нагрузка', 'холостой ход',
        'частота переключения', 'синхронное выпрямление',
        'переключение при нулевом напряжении', 'коррекция коэффициента мощности',
        'коносамент', 'сертификат происхождения', 'упаковочный лист',
    ],
}

# ═══════════════════════════════════════════════════════════
# Registry 15: B2B Terms (Information Gain vocabulary diversity)
# ═══════════════════════════════════════════════════════════

I18N_B2B_TERMS: Dict[str, List[str]] = {
    'en': [
        'OEM', 'ODM', 'manufacturer', 'factory', 'supplier', 'importer',
        'sourcing', 'MOQ', 'FOB', 'B2B', 'procurement', 'wholesale',
        'bulk', 'supply chain', 'vendor', 'lead time', 'private label',
    ],
    'de': [
        'OEM', 'ODM', 'Hersteller', 'Fabrik', 'Lieferant', 'Importeur',
        'Beschaffung', 'MOQ', 'FOB', 'B2B', 'Großhandel', 'Großbestellung',
        'Mindestbestellmenge', 'Lieferkette', 'Lieferzeit', 'Eigenmarke',
        'Zulieferer', 'Einkauf', 'Zollabwicklung', 'DDP',
        'Staffelpreis', 'Rahmenvertrag', 'Vorlaufkosten', 'Termintreue',
        'Warenursprungszeugnis', 'Konformitätserklärung', 'Konsignationslager',
        'Abrufauftrag', 'Einfuhrumsatzsteuer', 'Incoterms',
    ],
    'es': [
        'OEM', 'ODM', 'fabricante', 'fábrica', 'proveedor', 'importador',
        'abastecimiento', 'MOQ', 'FOB', 'B2B', 'mayorista', 'pedido mínimo',
        'cadena de suministro', 'plazo de entrega', 'marca blanca',
        'logística', 'aduana', 'DDP', 'compras',
    ],
    'fr': [
        'OEM', 'ODM', 'fabricant', 'usine', 'fournisseur', 'importateur',
        'approvisionnement', 'MOQ', 'FOB', 'B2B', 'grossiste', 'commande minimum',
        "chaîne d'approvisionnement", 'délai de livraison', 'marque de distributeur',
        'logistique', 'douane', 'DDP', 'achats',
    ],
    'ru': [
        'OEM', 'ODM', 'производитель', 'завод', 'фабрика', 'поставщик', 'импортёр',
        'снабжение', 'MOQ', 'FOB', 'B2B', 'опт', 'оптовый', 'крупный заказ',
        'минимальный заказ', 'минимальная партия', 'цепочка поставок',
        'срок поставки', 'собственная торговая марка', 'СТМ',
        'логистика', 'таможня', 'DDP', 'закупки', 'экспорт',
    ],
}

# ═══════════════════════════════════════════════════════════
# Registry 16: Stop Words (Information Gain term extraction)
# ═══════════════════════════════════════════════════════════

I18N_STOP_WORDS: Dict[str, Set[str]] = {
    'en': {
        'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can',
        'had', 'her', 'was', 'one', 'our', 'out', 'has', 'have', 'been',
        'some', 'than', 'its', 'who', 'now', 'just', 'over', 'also',
        'into', 'new', 'only', 'when', 'how', 'what', 'from', 'this',
        'that', 'with', 'your', 'which', 'will', 'each', 'about',
        'more', 'other', 'their', 'them', 'these', 'would', 'could',
        'should', 'after', 'before', 'between', 'under', 'above',
    },
    'de': {
        'der', 'die', 'das', 'und', 'in', 'zu', 'den', 'für', 'mit',
        'sich', 'des', 'auf', 'ist', 'im', 'dem', 'nicht', 'ein',
        'die', 'eine', 'als', 'auch', 'es', 'an', 'aus', 'er',
        'war', 'wie', 'wir', 'bei', 'von', 'bis', 'durch', 'ohne',
        'gegen', 'nach', 'vor', 'über', 'unter', 'weil', 'wenn',
        'dann', 'schon', 'noch', 'also', 'damit', 'dabei', 'davon',
        'dazu', 'denn', 'doch', 'etwa', 'fast', 'ganz', 'immer',
        'jedoch', 'mehr', 'nur', 'oder', 'sehr', 'sein', 'sie',
        'sind', 'sondern', 'sowie', 'trotz', 'während', 'wegen',
        'weiter', 'werden', 'wieder', 'wird', 'worden', 'wurde',
    },
    'es': {
        'el', 'la', 'los', 'las', 'de', 'del', 'en', 'con', 'por',
        'que', 'una', 'para', 'como', 'más', 'pero', 'sus', 'han',
        'fue', 'son', 'era', 'hay', 'ese', 'esa', 'eso', 'este',
        'esta', 'entre', 'desde', 'cada', 'todo', 'muy',
        'sin', 'sobre', 'también', 'hasta', 'donde', 'quien',
        'cuando', 'porque', 'sino', 'aunque', 'mientras',
        'además', 'entonces', 'siempre', 'nunca', 'casi',
    },
    'fr': {
        'le', 'la', 'les', 'des', 'un', 'une', 'est', 'dans', 'pour',
        'avec', 'sur', 'plus', 'par', 'pas', 'que', 'qui', 'aux',
        'tout', 'bien', 'très', 'aussi', 'leur', 'leurs', 'cette',
        'mais', 'fait', 'être', 'avoir', 'peut', 'sont', 'comme',
        'donc', 'elle', 'nous', 'vous', 'entre', 'encore',
        'dont', 'cela', 'peut', 'même', 'alors', 'ainsi',
        'tous', 'deux', 'autre', 'autres', 'pendant', 'depuis',
    },
    'ru': {
        'и', 'в', 'на', 'с', 'по', 'для', 'от', 'к', 'из', 'что',
        'как', 'это', 'так', 'то', 'не', 'но', 'а', 'да', 'или',
        'если', 'уже', 'ещё', 'бы', 'же', 'ли', 'за', 'до', 'при',
        'под', 'над', 'без', 'через', 'между', 'перед', 'также',
        'только', 'очень', 'весь', 'который', 'свой', 'себя',
        'один', 'такой', 'чтобы', 'где', 'когда', 'почему', 'все',
        'там', 'здесь', 'тут', 'потом', 'можно', 'нужно', 'надо',
        'более', 'менее', 'самый', 'сейчас', 'всегда', 'никогда',
        'было', 'были', 'будет', 'будут', 'есть', 'нет', 'был',
    },
}


# ═══════════════════════════════════════════════════════════
# B2BI18n Accessor Class
# ═══════════════════════════════════════════════════════════

class B2BI18n:
    """
    Thread-safe i18n keyword accessor with English fallback.

    Usage:
        i18n = B2BI18n('de')
        tldr_kws = i18n.get('TLDR_KEYWORDS')           # → list of str
        fluff_pats = i18n.get_patterns('OPENING_FLUFF_PATTERNS')  # → list of compiled re.Pattern
    """

    __slots__ = ('lang', '_cache', '_pattern_cache')

    def __init__(self, lang: str = 'en'):
        self.lang = lang if lang in SUPPORTED_LANGS else 'en'
        self._cache: Dict[str, Any] = {}
        self._pattern_cache: Dict[str, List[re.Pattern]] = {}

    def get(self, category: str) -> Any:
        """Get localized value (list, set, dict) for a keyword category. Falls back to English."""
        if category not in self._cache:
            registry = globals().get(f'I18N_{category}')
            if isinstance(registry, dict):
                value = registry.get(self.lang, registry.get('en'))
            else:
                value = registry
            self._cache[category] = value if value is not None else []
        return self._cache[category]

    def get_patterns(self, category: str) -> List[re.Pattern]:
        """Get compiled regex patterns for a category. Caches compiled patterns."""
        if category not in self._pattern_cache:
            raw_strings = self.get(category)
            if not isinstance(raw_strings, list):
                raw_strings = []
            compiled = []
            for s in raw_strings:
                try:
                    compiled.append(re.compile(s, re.IGNORECASE))
                except re.error:
                    pass  # skip malformed patterns
            self._pattern_cache[category] = compiled
        return self._pattern_cache[category]

    def get_nested(self, category: str, sub_key: str) -> Any:
        """Get a nested value from a dict-type registry (e.g., CROSS_REF_ANCHORS['tldr'])."""
        full = self.get(category)
        if isinstance(full, dict):
            sub = full.get(self.lang, full.get('en', {}))
            if isinstance(sub, dict):
                return sub.get(sub_key, [])
            return sub
        return []

    @staticmethod
    def get_stop_words(lang: str) -> Set[str]:
        """Get stop words set for a language (convenience method)."""
        return I18N_STOP_WORDS.get(lang, I18N_STOP_WORDS['en'])
