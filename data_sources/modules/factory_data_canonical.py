"""
Factory Data Canonical Checker — Verify article factory data against canonical source.

Parses context/factory-data-canonical.md and provides a check function that scans
article content for factory data mentions and flags any values outside canonical ranges.

Usage:
    from factory_data_canonical import check_factory_data
    result = check_factory_data(article_text)
    print(result['score'], result['violations'])
"""

import re
from typing import Any, Dict, List, Tuple

# ═══════════════════════════════════════════════════════════
# Canonical Factory Data Rules
# ═══════════════════════════════════════════════════════════
# Each rule: (context_pattern, canonical_range, label, severity, tolerance_pct)
# - context_pattern: regex to find the data point in text (with capture group for the number)
# - canonical_range: (min, max) tuple; None for "no upper bound"
# - label: human-readable label for reporting
# - severity: points deducted per violation
# - tolerance_pct: allowed deviation percentage (0 = exact match required)

FACTORY_RULES: List[Tuple[str, Tuple, str, int, float]] = [
    # ── MOQ ──
    (
        r'(?:MOQ|Mindestbestellmenge|mindestbestellmenge|min\.?\s*(?:order|bestellung)|minimum\s+order|минимальный\s+заказ|pedido\s+mínimo|commande\s+minimum)'
        r'[\s:.]*(\d[\d.]*)\s*(?:Stück|units?|unités?|unidades?|pcs|pieces|pièces|шт)',
        (500, 3000), 'MOQ', 15, 0
    ),
    # ── MOQ explicit declaration (MOQ 500) ──
    (
        r'\bMOQ\s*:?\s*(\d[\d.]*)\s*(?:Stück|pcs|units?)',
        (500, 3000), 'MOQ explicit', 15, 0
    ),
    # ── OEM Lead Time (days) ──
    (
        r'(?:OEM|oem)[\-\s]*(?:Lieferzeit|lead\s+time|délai\s+de\s+livraison|plazo\s+de\s+entrega|срок\s+поставки)'
        r'.{0,20}?(\d{2})[–\-\s]*(\d{2})\s*(?:Tage|days?|días?|jours?|дней|дня)',
        ('25', '30'), 'OEM Lead Time (days)', 20, 0
    ),
    # ── ODM Lead Time (days) ──
    (
        r'(?:ODM|odm)[\-\s]*(?:Lieferzeit|lead\s+time|délai|plazo|срок)'
        r'.{0,20}?(\d{2})[–\-\s]*(\d{2})\s*(?:Tage|days?|días?|jours?|дней|дня)',
        ('45', '60'), 'ODM Lead Time (days)', 20, 0
    ),
    # ── Payment: deposit percentage ──
    (
        r'(\d+)\s*%\s*(?:deposit|Anzahlung|depósito|acompte|предоплата|аванс)',
        (25, 35), 'Deposit percentage', 15, 20  # 30% ± 5pp → 25-35
    ),
    # ── Payment: before shipment percentage ──
    (
        r'(\d+)\s*%\s*(?:before\s+shipment|vor\s+Versand|antes\s+del\s+envío|avant\s+expédition|перед\s+отгрузкой)',
        (65, 75), 'Balance before shipment', 10, 10  # 70% ± 5pp
    ),
    # ── CE/FCC/RoHS Certification Cost ──
    (
        r'(?:CE|FCC|RoHS).{0,100}?(?:Zertifizierung|certification|certificación)'
        r'.{0,50}?[\$€]?\s*(\d[\d,.]*)[-\s]*(\d[\d,.]*)\s*(?:USD|€|\$)',
        (2500, 4500), 'CE/FCC/RoHS cert cost', 15, 10
    ),
    # ── Single-port Mold Cost ──
    (
        r'(?:single.?port|Einzelport|puerto\s+único|port\s+unique).{0,50}(?:mold|Form|molde|moule|пресс.?форма)'
        r'.{0,30}?[\$€]?\s*(\d[\d,.]*)[-\s]*(\d[\d,.]*)\s*(?:USD|€|\$)',
        (2000, 5000), 'Single-port mold cost', 15, 10
    ),
    # ── PCB Design + NRE ──
    (
        r'(?:PCB|pcb).{0,30}(?:Design|design|NRE|nre)'
        r'.{0,30}?[\$€]?\s*(\d[\d,.]*)[-\s]*(\d[\d,.]*)\s*(?:USD|€|\$)',
        (2000, 5000), 'PCB design + NRE', 15, 10
    ),
    # ── Defect rate ──
    (
        r'(?:Defektrate|defect\s+rate|tasa\s+de\s+defectos|taux\s+de\s+défaut|уровень\s+дефектов|Ausschussrate)'
        r'.{0,30}?([<>]?\s*\d+\.?\d*)\s*%',
        (0, 0.3), 'Defect rate (%)', 10, 30  # <0.3% → 0-0.39
    ),
    # ── Factory size ──
    (
        r'(?:Fabrik|factory|fábrica|usine|завод|фабрика).{0,30}(?:Größe|size|tamaño|taille|площадь)'
        r'.{0,20}?(\d[\d,.]*)\s*(?:㎡|m²|sqm|sq\.?\s*m|кв\.?\s*м)',
        (5000, 5000), 'Factory size (sqm)', 10, 0  # exact
    ),
    # ── R&D Team ──
    (
        r'(?:R&D|F&E|I\+D|НИОКР).{0,30}(?:Team|team|equipo|équipe|команда|Ingenieure|engineers?|ingenieros|ingénieurs)'
        r'.{0,20}?(\d+)\+?\s*(?:Ingenieure|engineers?|ingenieros|ingénieurs|инженеров)',
        (50, None), 'R&D team size', 10, 0  # 50+, no upper bound
    ),
    # ── Export countries ──
    (
        r'(\d+)\+?\s*(?:Export|export).{0,20}(?:Länder|countries|países|pays|стран)',
        (50, None), 'Export countries', 5, 0  # 50+, no upper bound
    ),
]


def _extract_number(text: str, match_groups: Tuple) -> float:
    """Extract a numeric value from regex match groups, handling ranges."""
    values = []
    for g in match_groups:
        if g is None:
            continue
        clean = g.replace(',', '').replace(' ', '')
        try:
            values.append(float(clean))
        except ValueError:
            pass
    if not values:
        return None
    # If range (e.g., "25-30" → groups (25, 30)), return the mid-point for comparison
    return sum(values) / len(values)


def check_factory_data(content: str) -> Dict[str, Any]:
    """
    Scan article content for factory data and verify against canonical values.

    Args:
        content: Preprocessed article text (markdown or cleaned HTML).

    Returns:
        Dict with score (0-100), violations list, warnings, recommendations.
    """
    score = 100
    violations = []
    warnings = []
    found_any = False

    for pattern, canonical_range, label, severity, tolerance_pct in FACTORY_RULES:
        matches = list(re.finditer(pattern, content, re.IGNORECASE))
        if not matches:
            continue

        found_any = True
        c_min, c_max = canonical_range
        c_min = float(c_min)
        c_max = float(c_max) if c_max is not None else None

        for match in matches:
            value = _extract_number(content[match.start():match.end()], match.groups())
            if value is None:
                continue

            # Calculate allowed range with tolerance
            allowed_min = c_min * (1 - tolerance_pct / 100) if tolerance_pct > 0 else c_min
            allowed_max = c_max * (1 + tolerance_pct / 100) if c_max and tolerance_pct > 0 else c_max

            # Check if value is within range
            is_violation = False
            if c_max is None:
                # Only lower bound (e.g., "50+")
                if value < allowed_min:
                    is_violation = True
            else:
                if value < allowed_min or value > allowed_max:
                    is_violation = True

            if is_violation:
                context = content[max(0, match.start()-20):match.end()+20].strip()
                score = max(0, score - severity)
                violations.append({
                    'data_point': label,
                    'found_value': value,
                    'canonical_range': f'{c_min}-{c_max}' if c_max else f'{c_min}+',
                    'severity': severity,
                    'context': context[:100],
                })

    # If no factory data found at all, score is None (N/A — nothing to verify)
    if not found_any:
        return {
            'score': None,
            'violations': [],
            'warnings': [],
            'critical_issues': [],
            'recommendations': [
                'No factory data points detected — cannot verify against canonical source. '
                'Consider adding first-hand factory data (MOQ, lead times, pricing, certification costs).'
            ],
        }

    if violations:
        recs = [f'Factory data deviation: {v["data_point"]} = {v["found_value"]} '
                f'(canonical: {v["canonical_range"]}) → correct to match factory-data-canonical.md'
                for v in violations[:5]]
    else:
        recs = ['All detected factory data points match canonical values.'] if found_any else []

    return {
        'score': score,
        'violations': violations,
        'warnings': warnings,
        'critical_issues': [v for v in violations if v['severity'] >= 15],
        'recommendations': recs,
        'data_points_checked': len(FACTORY_RULES),
        'data_points_found': sum(1 for p, _, _, _, _ in FACTORY_RULES if re.search(p, content, re.IGNORECASE)),
    }
