#!/usr/bin/env python3
"""Apply all structural fixes to DE kabelloses-laden article."""
import re

PATH = r'C:\Users\wowoh\wowohcool.com\src\de\blog\kabelloses-laden\index.njk'

with open(PATH, 'r', encoding='utf-8') as f:
    content = f.read()

changes = 0

def replace(old, new):
    global content, changes
    if old in content:
        content = content.replace(old, new)
        changes += 1
    else:
        print(f'WARN: not found: {old[:60]}...')

# Market size: $18.2B -> $18.4B
replace('18,2 Milliarden US-Dollar', '18,4 Milliarden US-Dollar')
replace('Marktvolumen von 18,2 Mrd.', 'Marktvolumen von 18,4 Mrd.')
replace(', 22% CAGR. Qi2.2 25W', ', 22% CAGR. Qi2.2 25W')  # no-op, just for safety

# Section 1: H3 additions
replace(
    ' <h2 class="text-2xl font-black text-brandBlue uppercase italic mb-6">1. Warum Qi2 MPP den Markt fur kabelloses Laden transformiert</h2>\n <p class="text-slate-600 leading-relaxed mb-4"><strong>Kabelloses Laden (auch induktives Laden genannt)',
    ' <h2 class="text-2xl font-black text-brandBlue uppercase italic mb-6">1. Warum Qi2 MPP den Markt fur kabelloses Laden transformiert</h2>\n <h3 class="text-lg font-black text-brandBlue mb-2">Vom Qi 1.0 (2008, 5W) zu Qi2.2 (2025, 25W): Die Evolutionsstufen des kabellosen Ladens</h3>\n <p class="text-slate-600 leading-relaxed mb-4"><strong>Kabelloses Laden (auch induktives Laden genannt)'
)

# Section 1 second H3
replace(
    '</p>\n\n<p class="text-slate-600 leading-relaxed">Der globale Markt fur kabelloses Laden wird 2026 auf 18,4 Milliarden US-Dollar geschatzt',
    '</p>\n\n<h3 class="text-lg font-black text-brandBlue mb-2">Markt 2026: 18,4 Mrd. USD, 22 % CAGR \u2014 warum Qi2 MPP der Wachstumstreiber ist</h3>\n<p class="text-slate-600 leading-relaxed">Der globale Markt fur kabelloses Laden wird 2026 auf 18,4 Milliarden US-Dollar geschatzt'
)

# Section 2
replace(
    ' <h2 class="text-2xl font-black text-brandBlue uppercase italic mb-6">2. Qi vs Qi2: Technische Spezifikationen fur die Produktauswahl</h2>\n <div class="overflow-x-auto mb-6">',
    ' <h2 class="text-2xl font-black text-brandBlue uppercase italic mb-6">2. Qi vs Qi2: Technische Spezifikationen fur die Produktauswahl</h2>\n <h3 class="text-lg font-black text-brandBlue mb-2">Qi2 MPP erreicht 85\u201390 % Effizienz \u2014 warum magnetische Ausrichtung der entscheidende Faktor ist</h3>\n <div class="overflow-x-auto mb-6">'
)

replace(
    '</table>\n </div>\n <p class="text-slate-600 leading-relaxed"><strong>Der entscheidende Fortschritt',
    '</table>\n </div>\n <h3 class="text-lg font-black text-brandBlue mb-2">Amazon-Bewertungen: Qi2-Produkte 4,5 Sterne vs. Qi 1.x 3,8 Sterne \u2014 was Importeure daraus lernen</h3>\n <p class="text-slate-600 leading-relaxed"><strong>Der entscheidende Fortschritt'
)

# Section 3
replace(
    ' <h2 class="text-2xl font-black text-brandBlue uppercase italic mb-6">3. Wirtschaftlichkeitsvergleich: Qi2 MPP vs. kabelgebundenes Laden fur Importeure</h2>\n <p class="text-slate-600 leading-relaxed mb-4">Kabelloses Laden bietet mehrere Vorteile gegenuber',
    ' <h2 class="text-2xl font-black text-brandBlue uppercase italic mb-6">3. Wirtschaftlichkeitsvergleich: Qi2 MPP vs. kabelgebundenes Laden fur Importeure</h2>\n <h3 class="text-lg font-black text-brandBlue mb-2">Effizienzvergleich: Qi2 85\u201390 % vs. Qi 50\u201360 % vs. kabelgebunden 75 %</h3>\n <p class="text-slate-600 leading-relaxed mb-4">Kabelloses Laden bietet mehrere Vorteile gegenuber'
)

replace(
    '<p class="text-slate-600 leading-relaxed">Die Nachteile sind die geringere Effizienz bei alteren Qi-Standards',
    '<h3 class="text-lg font-black text-brandBlue mb-2">Gewerbliche Vorteile: Warum Hotels und Gastronomie auf Qi2 setzen</h3>\n <p class="text-slate-600 leading-relaxed">Die Nachteile sind die geringere Effizienz bei alteren Qi-Standards'
)

# Section 5
replace(
    ' <h2 class="text-2xl font-black text-brandBlue uppercase italic mb-6">5. WPC-Zertifizierung: Prozess, Kosten und Zeitplan fur Importeure</h2>\n <p class="text-slate-600 leading-relaxed mb-4">Die WPC-Zertifizierung ist fur Qi2-Produkte nicht optional',
    ' <h2 class="text-2xl font-black text-brandBlue uppercase italic mb-6">5. WPC-Zertifizierung: Prozess, Kosten und Zeitplan fur Importeure</h2>\n <h3 class="text-lg font-black text-brandBlue mb-2">WPC-Mitgliedschaft: 5.000\u201325.000 USD/Jahr \u2014 welche Stufe fur welches Importvolumen?</h3>\n <p class="text-slate-600 leading-relaxed mb-4">Die WPC-Zertifizierung ist fur Qi2-Produkte nicht optional'
)

replace(
    '<p class="text-slate-600 leading-relaxed mb-4">Die jahrliche WPC-Mitgliedschaft kostet 5.000-25.000 USD',
    '<h3 class="text-lg font-black text-brandBlue mb-2">Labortests bei TUV, SGS oder UL: 3.000\u20135.000 USD pro Modell im Detail</h3>\n <p class="text-slate-600 leading-relaxed mb-4">Die jahrliche WPC-Mitgliedschaft kostet 5.000-25.000 USD'
)

# Section 6 - two H3s
replace(
    ' <h2 class="text-2xl font-black text-brandBlue uppercase italic mb-6">6. Qi2 Fertigung: Von der WPC-Mitgliedschaft bis zur Serienlieferung</h2>\n <img src="/image/blog/oem-vs-odm-guide/oem-odm-thermal-testing-quality-control.webp"',
    ' <h2 class="text-2xl font-black text-brandBlue uppercase italic mb-6">6. Qi2 Fertigung: Von der WPC-Mitgliedschaft bis zur Serienlieferung</h2>\n <h3 class="text-lg font-black text-brandBlue mb-2">N52H Neodym-Magnete (52 MGOe) und Spulenabstand &lt; 0,3 mm: Technische Vorgaben fur die Fertigung</h3>\n <img src="/image/blog/oem-vs-odm-guide/oem-odm-thermal-testing-quality-control.webp"'
)

replace(
    '<p class="text-slate-600 leading-relaxed">Die Produktion von Qi2-zertifizierten Ladegeraten in China erfordert',
    '<h3 class="text-lg font-black text-brandBlue mb-2">EU-Compliance-Paket: CE (EN 62368-1), RoHS, WEEE, RED, EMV-Richtlinie 2014/30/EU \u2014 alle Anforderungen auf einen Blick</h3>\n <p class="text-slate-600 leading-relaxed">Die Produktion von Qi2-zertifizierten Ladegeraten in China erfordert'
)

# Section 7 - OEM vs ODM table + two H3s
replace(
    ' <h2 class="text-2xl font-black text-brandBlue uppercase italic mb-6">7. OEM vs. ODM: Entscheidungsmatrix fur Qi2-Produktlinien (MOQ, Kosten, IP-Schutz)</h2>\n <p class="text-slate-600 leading-relaxed mb-4"><strong>OEM (ab 500 Stuck)</strong>',
    ' <h2 class="text-2xl font-black text-brandBlue uppercase italic mb-6">7. OEM vs. ODM: Entscheidungsmatrix fur Qi2-Produktlinien (MOQ, Kosten, IP-Schutz)</h2>\n <h3 class="text-lg font-black text-brandBlue mb-2">OEM (MOQ 500, 25\u201330 Tage) vs. ODM (MOQ 500\u20131.000, 45\u201360 Tage): Kostenvergleich</h3>\n <div class="overflow-x-auto mb-6">\n <table class="w-full text-sm border-collapse">\n <thead>\n <tr class="bg-slate-800 text-white text-[11px] font-black uppercase tracking-widest">\n <th class="p-3 text-left">Dimension</th>\n <th class="p-3 text-center">OEM</th>\n <th class="p-3 text-center">ODM</th>\n </tr>\n </thead>\n <tbody class="text-slate-600">\n <tr class="border-b border-slate-100"><td class="p-3 font-bold">MOQ</td><td class="p-3 text-center">500 Stuck</td><td class="p-3 text-center">500\u20131.000 Stuck</td></tr>\n <tr class="border-b border-slate-100"><td class="p-3 font-bold">Lieferzeit</td><td class="p-3 text-center">25\u201330 Tage</td><td class="p-3 text-center">45\u201360 Tage</td></tr>\n <tr class="border-b border-slate-100"><td class="p-3 font-bold">Tooling-Kosten</td><td class="p-3 text-center">Keine</td><td class="p-3 text-center">8.000\u201315.000 USD</td></tr>\n <tr class="border-b border-slate-100"><td class="p-3 font-bold">WPC-Zertifizierung</td><td class="p-3 text-center">Bestandsmodell</td><td class="p-3 text-center">Neu (inklusive)</td></tr>\n <tr class="border-b border-slate-100"><td class="p-3 font-bold">IP-Schutz</td><td class="p-3 text-center">Nein (Herstellermodell)</td><td class="p-3 text-center">Ja (Ihr Design)</td></tr>\n <tr><td class="p-3 font-bold">Marge</td><td class="p-3 text-center">Standard</td><td class="p-3 text-center">Hoher (Alleinstellung)</td></tr>\n </tbody>\n </table>\n </div>\n <p class="text-slate-600 leading-relaxed mb-4"><strong>OEM (ab 500 Stuck)</strong>'
)

replace(
    '<p class="text-slate-600 leading-relaxed">Viele Importeure starten mit OEM-Produkten wie dem WOW93 3-in-1 Faltladegerat',
    '<h3 class="text-lg font-black text-brandBlue mb-2">Typischer Einstiegspfad: OEM-Start mit WOW93 \u2192 ODM-Skalierung ab 1.000 Stuck</h3>\n <p class="text-slate-600 leading-relaxed">Viele Importeure starten mit OEM-Produkten wie dem WOW93 3-in-1 Faltladegerat'
)

# Section 8
replace(
    ' <h2 class="text-2xl font-black text-brandBlue uppercase italic mb-6">8. DACH-Wettbewerbsanalyse: Qi2-Marktpositionierung und Chancen 2026</h2>\n <p class="text-slate-600 leading-relaxed mb-4">Eine Analyse der Amazon DE Bestseller-Liste',
    ' <h2 class="text-2xl font-black text-brandBlue uppercase italic mb-6">8. DACH-Wettbewerbsanalyse: Qi2-Marktpositionierung und Chancen 2026</h2>\n <h3 class="text-lg font-black text-brandBlue mb-2">Amazon DE Bestseller-Analyse: 3-in-1 Modelle dominieren mit 15\u201335 EUR</h3>\n <p class="text-slate-600 leading-relaxed mb-4">Eine Analyse der Amazon DE Bestseller-Liste'
)

replace(
    '<p class="text-slate-600 leading-relaxed mb-4">Fur Importeure bedeutet dies: Die Nachfrage nach Multi-Device Ladestationen',
    '<h3 class="text-lg font-black text-brandBlue mb-2">Qi2 vs. Qi-Bewertungen: 4,5 vs. 3,8 Sterne \u2014 der Qualitatsvorsprung in Zahlen</h3>\n <p class="text-slate-600 leading-relaxed mb-4">Fur Importeure bedeutet dies: Die Nachfrage nach Multi-Device Ladestationen'
)

# Section 9
replace(
    ' <h2 class="text-2xl font-black text-brandBlue uppercase italic mb-6">9. Europaischer Qi2-Markt 2026: Wachstumsprognose und Potenzial</h2>\n <p class="text-slate-600 leading-relaxed mb-4">Der europaische Markt fur kabellose Ladegerate',
    ' <h2 class="text-2xl font-black text-brandBlue uppercase italic mb-6">9. Europaischer Qi2-Markt 2026: Wachstumsprognose und Potenzial</h2>\n <h3 class="text-lg font-black text-brandBlue mb-2">EU-Markt: 1,93 Mrd. USD (2025) \u2192 8,74 Mrd. USD (2033) \u2014 20,75 % CAGR</h3>\n <p class="text-slate-600 leading-relaxed mb-4">Der europaische Markt fur kabellose Ladegerate'
)

replace(
    '<p class="text-slate-600 leading-relaxed">Das <a href="https://www.wirelesspowerconsortium.com/" target="_blank" rel="noopener noreferrer" class="text-brandOrange hover:underline">Wireless Power Consortium (WPC)</a> mit uber 300 Mitgliedsunternehmen treibt die Standardisierung voran.',
    '<h3 class="text-lg font-black text-brandBlue mb-2">Deutschland halt 18,7 % Marktanteil \u2014 das groste Einzelland der EU</h3>\n <p class="text-slate-600 leading-relaxed">Das <a href="https://www.wirelesspowerconsortium.com/" target="_blank" rel="noopener noreferrer" class="text-brandOrange hover:underline">Wireless Power Consortium (WPC)</a> mit uber 300 Mitgliedsunternehmen treibt die Standardisierung voran.'
)

# Section 10
replace(
    ' <h2 class="text-2xl font-black text-brandBlue uppercase italic mb-6">10. Fazit: Qi2 als strategischer Wachstumsmarkt 2026\u20132030</h2>\n <p class="text-slate-600 leading-relaxed mb-4">Kabelloses Laden mit Qi2 ist eine etablierte Technologie',
    ' <h2 class="text-2xl font-black text-brandBlue uppercase italic mb-6">10. Fazit: Qi2 als strategischer Wachstumsmarkt 2026\u20132030</h2>\n <h3 class="text-lg font-black text-brandBlue mb-2">260 neue Qi2-Produkte im Januar 2026: Das Marktfenster ist jetzt offen</h3>\n <p class="text-slate-600 leading-relaxed mb-4">Kabelloses Laden mit Qi2 ist eine etablierte Technologie'
)

replace(
    '<p class="text-slate-600 leading-relaxed mb-4">Weitere Informationen: <a href="/de/blog/qi2-zertifizierung-importeure/"',
    '<h3 class="text-lg font-black text-brandBlue mb-2">3-in-1 Ladestationen: Die volumenstarkste Kategorie fur den Markteinstieg</h3>\n <p class="text-slate-600 leading-relaxed mb-4">Weitere Informationen: <a href="/de/blog/qi2-zertifizierung-importeure/"'
)

# P1: EMV-Richtlinie in Section 6 body
replace(
    'sind <strong>CE (EN 62368-1), RoHS, WEEE und RED (2014/53/EU)</strong> fur den EU-Markt erforderlich',
    'sind <strong>CE (EN 62368-1), RoHS, WEEE, RED (2014/53/EU) und EMV-Richtlinie 2014/30/EU</strong> fur den EU-Markt erforderlich'
)

# P1: EMV-Richtlinie in HowTo Step 4 schema
replace(
    'CE (EN 62368-1), RoHS, WEEE (Stiftung EAR), RED (2014/53/EU). OEM ab 500 Stuck',
    'CE (EN 62368-1), RoHS, WEEE (Stiftung EAR), RED (2014/53/EU), EMV-Richtlinie 2014/30/EU. OEM ab 500 Stuck'
)

# P2: WOW93 alt text
replace(
    'alt="WOW93 Qi2 3-in-1 Faltladestation, Smartphone, Watch und AirPods gleichzeitig laden, WPC-zertifiziert"',
    'alt="WOW93 Qi2 3-in-1 Faltladestation fur OEM-Importeure, MOQ 500, Smartphone + Watch + AirPods, WPC-zertifiziert, FOB Shenzhen"'
)

# P2: "induktives Laden" in meta description
replace(
    'description: "Kabelloses Laden OEM: Qi2 MPP, WPC-Zertifizierung & Produktion. Markt 18,4 Mrd. USD, 22% CAGR.',
    'description: "Kabelloses Laden (induktives Laden) OEM: Qi2 MPP, WPC-Zertifizierung & Produktion. Markt 18,4 Mrd. USD, 22% CAGR.'
)

# P2: Add EMV-Richtlinie to Sources
replace(
    '<li><a href="https://webstore.iec.ch/publication/" target="_blank" rel="noopener noreferrer" class="text-brandBlue hover:text-brandOrange">IEC 62368-1</a></li>',
    '<li><a href="https://webstore.iec.ch/publication/" target="_blank" rel="noopener noreferrer" class="text-brandBlue hover:text-brandOrange">IEC 62368-1</a></li>\n <li><a href="https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32014L0030" target="_blank" rel="noopener noreferrer" class="text-brandBlue hover:text-brandOrange">EMV-Richtlinie 2014/30/EU</a></li>'
)

with open(PATH, 'w', encoding='utf-8') as f:
    f.write(content)

# Verification
h2s = len(re.findall(r'<h2 class="text-2xl font-black', content))
h3s = len(re.findall(r'<h3 class="text-lg font-black', content))
umlauts = len(re.findall(r'[aouAOU]', content))
damaged = len(re.findall(r'\b(uber|geschatzt|jahrlich|Einfuhrung|moglich|Ladegerat|heisst|Haufig|fuhrt|wachst)\b', content))

print(f'Changes applied: {changes}')
print(f'H2 sections: {h2s}')
print(f'H3 subheadings: {h3s}')
print(f'Proper Umlauts: {umlauts}')
print(f'Damaged patterns: {damaged}')
if h3s >= 15:
    print('SUCCESS: All H3s added, all sections now have subheadings')
else:
    print(f'WARNING: Only {h3s} H3s found, expected >= 15')
if damaged == 0:
    print('SUCCESS: Zero damaged Umlauts')
else:
    print(f'WARNING: {damaged} damaged patterns remain')
