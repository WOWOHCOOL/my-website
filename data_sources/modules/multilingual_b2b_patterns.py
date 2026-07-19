"""
Multilingual B2B patterns for landing page analyzers.

Supports: ES, DE, FR, RU, ZH + English fallback.
Extends CTA detection, trust signals, and value proposition scoring
for B2B manufacturing / OEM-ODM landing pages.
"""

# ── CTA Action Verbs (button/link text patterns) ──

CTA_PATTERNS = {
    'primary': {
        'es': [
            r'Solicitar\s+(presupuesto|catálogo|cotización|muestras?|asesoría|demo)',
            r'Pedir\s+(presupuesto|información|catálogo)',
            r'Contactar', r'Contact[ao]', r'Contáctenos',
            r'Recibir\s+(presupuesto|catálogo|asesoría)',
            r'Consultar\s+(por\s+)?(WhatsApp|Whatsapp|whatsapp)?',
            r'Hablar\s+(por\s+)?(WhatsApp|Whatsapp|whatsapp)?',
            r'Comen[cz]ar\s+(ahora|proyecto|pedido)',
            r'Inici[ae]r?\s+(proyecto|pedido|consulta)',
            r'Ver\s+(catálogo|productos|línea|servicios)',
            r'Agendar\s+(visita|reunión|llamada)',
            r'Descargar\s+(catálogo|perfil|guía|ficha)',
        ],
        'de': [
            r'Angebot\s+(anfordern|einholen)',
            r'Kostenlos(es)?\s+(Angebot|Muster|Beratung)',
            r'Jetzt\s+(anfragen|starten|bestellen|kontaktieren)',
            r'Kontakt(ieren)?\s+(aufnehmen)?',
            r'Katalog\s+(anfordern|herunterladen)',
            r'Probe(muster)?\s+(anfordern|bestellen)',
            r'Beratung\s+(anfordern|vereinbaren|buchen)',
            r'(Unverbindlich|Kostenlos)\s+(anfragen|testen)',
            r'WhatsApp\s+(schreiben|kontaktieren)?',
            r'Produktion\s+(starten|anfragen)',
        ],
        'fr': [
            r'Demander\s+(un\s+)?(devis| catalogue| échantillon)',
            r'Recevoir\s+(un\s+)?(devis|catalogue|échantillon)',
            r'Contact(er|ez)?[-\s]?(nous)?',
            r'Commander\s+(un\s+)?(échantillon|devis)',
            r'Parler\s+(par|via|sur)\s+WhatsApp',
            r'Démarrer\s+(votre\s+)?projet',
            r'Télécharger\s+(le\s+)?(catalogue|guide)',
        ],
        'ru': [
            r'Запросить\s+(расчёт|каталог|образцы|консультацию)',
            r'Получить\s+(расчёт|каталог|консультацию|прайс)',
            r'Связаться\s+(с\s+нами)?',
            r'Написать\s+(в\s+)?WhatsApp',
            r'Начать\s+(проект|сотрудничество)',
            r'Заказать\s+(образцы|звонок|консультацию)',
            r'Скачать\s+(каталог|прайс|презентацию)',
        ],
        'zh': [
            r'索取(报价|目录|样品|咨询)',
            r'获取(报价|目录|样品|方案)',
            r'联系(我们)?',
            r'WhatsApp咨询',
            r'开始(项目|合作|定制)',
            r'下载(目录|报价单|资料)',
            r'咨询(报价|样品|定制|生产)',
        ],
        'en': [
            r'(Get|Request|Receive)\s+(a\s+)?(quote|pricing|catalog|samples?|consultation)',
            r'Contact\s+(us|sales|now)',
            r'Start\s+(your\s+)?(project|order|OEM)',
            r'Download\s+(catalog|brochure|guide|specs)',
            r'Talk?\s+(to\s+us|via\s+WhatsApp)',
            r'Book\s+(a\s+)?(call|meeting|tour|demo)',
        ],
    },
    'secondary': {
        'es': [
            r'(Conozca|Descubra|Explore|Vea)\s+(nuestr[oa]s?|más\s+sobre)',
            r'Ver\s+más',
            r'Más\s+información',
            r'WhatsApp', r'whatsapp',
        ],
        'de': [
            r'(Erfahren|Entdecken)\s+Sie\s+mehr',
            r'Mehr\s+(erfahren|Informationen)',
            r'WhatsApp',
        ],
        'fr': [
            r'(Découvr|Explor|Appren)ez?\s+(nos|plus)',
            r'En\s+savoir\s+plus',
            r'WhatsApp',
        ],
        'ru': [
            r'Узнать\s+больше',
            r'Подробнее',
            r'WhatsApp',
        ],
        'zh': [
            r'了解更多',
            r'查看更多',
            r'WhatsApp',
        ],
        'en': [
            r'Learn\s+more',
            r'See\s+(more|how|our)',
            r'Explore',
            r'WhatsApp',
        ],
    },
}

# ── Trust / Testimonial patterns ──

TESTIMONIAL_PATTERNS = {
    'attribution': {
        'es': [r'(—|—|,)\s*[A-ZÁÉÍÓÚ][a-záéíóú]+\s+[A-ZÁÉÍÓÚ]'],
        'de': [r'(—|—|,)\s*[A-ZÄÖÜ][a-zäöü]+\s+[A-ZÄÖÜ]'],
        'fr': [r'(—|—|,)\s*[A-ZÀÂÆÇÉÈÊËÎÏÔŒÙÛÜ][a-zàâæçéèêëîïôœùûü]+\s+[A-Z]'],
        'ru': [r'(—|—|,)\s*[А-Я][а-я]+\s+[А-Я]'],
        'zh': [r'(—|—|,)\s*[一-鿿]{2,4}'],
        'en': [r'(—|—|,)\s*[A-Z][a-z]+\s+[A-Z]'],
    },
    'result_phrases': {
        'es': [
            r'(cero|0)\s+defectos',
            r'\d+[\.\d]*%\s+(de\s+)?(reducción|ahorro|mejora|incremento|crecimiento)',
            r'\d+[\.\d]*\s*(uds?|unidades|días|semanas|meses)',
            r'pedido\s+repetido',
            r'(superó|resolvió|entregó|completó)\s+(el\s+)?(desafío|proyecto|pedido)',
        ],
        'de': [
            r'(null|0)\s+Fehler',
            r'\d+[\.\d]*%\s+(Reduzierung|Einsparung|Verbesserung|Wachstum)',
            r'\d+[\.\d]*\s*(Einheiten|Tage|Wochen|Monate)',
            r'Nachbestellung',
            r'(löste|lieferte|bewältigte)\s+(die\s+)?Herausforderung',
        ],
        'fr': [
            r'(zéro|0)\s+défauts?',
            r'\d+[\.\d]*%\s+(de\s+)?(réduction|économie|amélioration|croissance)',
            r'\d+[\.\d]*\s*(unités|jours|semaines|mois)',
            r'commande\s+répétée',
            r'(a\s+résolu|a\s+livré|a\s+relevé)\s+(le\s+)?défi',
        ],
        'ru': [
            r'(ноль|0)\s+дефектов',
            r'\d+[\.\d]*%\s+(снижение|экономия|улучшение|рост)',
            r'\d+[\.\d]*\s*(штук|дней|недель|месяцев)',
            r'повторный\s+заказ',
            r'(решил|поставил|выполнил)\s+(сложную\s+)?задачу',
        ],
        'zh': [
            r'(零|0)\s+(缺陷|瑕疵)',
            r'\d+[\.\d]*%\s*(降低|节省|提升|增长)',
            r'\d+[\.\d]*\s*(台|天|周|月)',
            r'复购|追加订单',
            r'(解决|交付|完成)了.*(挑战|项目|订单)',
        ],
        'en': [
            r'(zero|0)\s+defects',
            r'\d+[\.\d]*%\s+(reduction|savings?|improvement|growth|increase)',
            r'\d+[\.\d]*\s*(units?|days?|weeks?|months?)',
            r'repeat\s+order',
            r'(solved|delivered|completed)\s+(the\s+)?(challenge|project|order)',
        ],
    },
}

# ── Value Proposition patterns ──

VALUE_PROP_PATTERNS = {
    'es': [
        r'(fabricante|fábrica)\s+(profesional|directo|OEM|ODM)',
        r'(desde|fundada\s+en)\s+(20\d{2}|19\d{2})',
        r'(ISO\s*9001|CE|RoHS|certificad[oa])',
        r'(MOQ|pedido\s+mínimo)\s+(desde\s+)?\d+',
        r'Sin\s+intermediarios',
        r'(más\s+de|más\s+que|\\+\s*)\d+\s+(años|marcas|ingenieros|clientes)',
    ],
    'de': [
        r'(Hersteller|Fabrik|Produzent)\s+(professionell|direkt|OEM|ODM)',
        r'(seit|gegründet)\s+(20\d{2}|19\d{2})',
        r'(ISO\s*9001|CE|RoHS|zertifiziert)',
        r'(MOQ|Mindestbestellmenge)\s+(ab\s+)?\d+',
        r'(über|mehr\s+als)\s+\d+\s+(Jahre|Marken|Ingenieure|Kunden)',
    ],
    'fr': [
        r'(fabricant|usine)\s+(professionnel|direct|OEM|ODM)',
        r'(depuis|fondée\s+en)\s+(20\d{2}|19\d{2})',
        r'(ISO\s*9001|CE|RoHS|certifi[ée])',
        r'(MOQ|commande\s+minimum)\s+(dès\s+)?\d+',
        r'(plus\s+de)\s+\d+\s+(ans|marques|ingénieurs|clients)',
    ],
    'ru': [
        r'(производитель|завод|фабрика)\s+(профессиональн|прям|OEM|ODM)',
        r'(с\s+20\d{2}|основана\s+в\s+20\d{2})',
        r'(ISO\s*9001|CE|RoHS|сертифицирован)',
        r'(MOQ|минимальный\s+заказ)\s+(от\s+)?\d+',
        r'(более)\s+\d+\s+(лет|брендов|инженеров|клиентов)',
    ],
    'zh': [
        r'(专业|工厂直供|源头)\s*(制造商|工厂|OEM|ODM)',
        r'(始于|成立于|创立于)\s*(20\d{2}|19\d{2})',
        r'(ISO\s*9001|CE|RoHS|认证)',
        r'(MOQ|起订量)\s*\d+',
        r'\d+\+?\s*(年|品牌|工程师|客户)',
    ],
    'en': [
        r'(manufacturer|factory)\s+(professional|direct|OEM|ODM)',
        r'(since|established|founded)\s+(20\d{2}|19\d{2})',
        r'(ISO\s*9001|CE|RoHS|certified)',
        r'(MOQ|minimum\s+order)\s+(from\s+)?\d+',
        r'(over|more\s+than)\s+\d+\s+(years|brands|engineers|clients)',
    ],
}

# ── B2B Trust Signals ──

B2B_TRUST_PATTERNS = {
    'certifications': [
        r'ISO\s*9001', r'ISO\s*14001', r'ISO\s*13485',
        r'\bCE\b', r'\bRoHS\b', r'\bREACH\b', r'\bFCC\b',
        r'\bUL\b', r'\bPSE\b', r'\bKC\b', r'\bQi2?\b',
        r'\bUN38\.3\b', r'\bMSDS\b', r'\bAENOR\b',
        r'\bTÜV\b', r'\bSGS\b', r'\bBureau\s+Veritas\b',
        r'\bIEC\s*62368', r'\bGS\b', r'\bE[\-\s]Mark\b',
    ],
    'factory_signals': [
        r'\d[\d,.]*\s*(㎡|m²|sqm|sq\.?\s*ft)',
        r'\d+[\.\d]*[KkMm]?\s*(unidades?|units?|pièces?|Stück)\s*(/|por|pro|al)\s*(mes|month|mois|Monat)',
        r'\d+\+?\s*(ingenieros?|engineers?|ingénieurs?|Ingenieure)',
        r'\d+\+?\s*(años?|years?|ans?|Jahre?)\s+(de\s+)?(experiencia|experience|expérience|Erfahrung)',
        r'(SMT|montaje\s+superficial|surface\s+mount)',
        r'(líneas?\s+(de\s+)?producción|production\s+lines?)',
    ],
    'client_signals': [
        r'\d+[\.\d]*\s*[Mm]\+?\s*(unidades?|units?|entregadas|delivered)',
        r'\d+\+?\s*(marcas?|brands?|marques?|Marken)\s+(globales?|global|mondial)',
        r'(Bosch|Samsung|Apple|Xiaomi|Anker|Belkin|Dell|HP|Lenovo|Sony)',
        r'Fortune\s*(500|1000|Global\s*500)',
    ],
}

# ── Language Detection ──

def detect_languages(content: str) -> list:
    """Detect which languages are present in content. Returns list of lang codes."""
    detected = []
    lang_indicators = {
        'es': [r'\b(el|la|los|las|del|para|por|con|una|como|más|este|entre|desde|cada|todo|porque|cual|sino)\b'],
        'de': [r'\b(der|die|das|und|für|mit|von|bei|als|auch|wird|eine|über|nach|aus|dem|den|vor|seit)\b'],
        'fr': [r'\b(le|la|les|des|est|une|dans|pour|avec|sur|plus|par|pas|que|qui|aux|tout|bien|très)\b'],
        'ru': [r'[а-яА-ЯёЁ]{3,}'],
        'zh': [r'[一-鿿]{2,}'],
    }
    for lang, patterns in lang_indicators.items():
        for p in patterns:
            if len(re.findall(p, content, re.IGNORECASE)) > 5:
                detected.append(lang)
                break
    if not detected:
        detected.append('en')
    return detected


import re
