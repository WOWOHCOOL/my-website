import os, re
base = r'C:/Users/wowoh/wowohcool.com/src/de/produkte'
BS = chr(92)
updated = 0

# ===== HALBFEST-AKKU =====
fp = os.path.join(base, 'powerbank', 'halbfest-akku', 'index.njk')
with open(fp, 'r', encoding='utf-8') as f: c = f.read()
old = 'EPR-Service und Batteriepass-Vorbereitung.</p>'
new = ('EPR-Service und Batteriepass-Vorbereitung. '
       '<strong>Globaler Solid-State-Markt: $85M (2023) → $963M (2030), 41.5% CAGR (MarketsandMarkets). '
       'Deutschland: Keine Semi-Solid Retail-Listings — Blue Ocean Kategorie.</strong></p>\n'
       '\n'
       ' <p class="text-sm text-slate-500 mb-6">'
       '<strong>DACH-Markt 2026:</strong> Deutschlands Powerbank-Markt waechst auf $71.5M bis 2030 (NextMSC). '
       'Semi-Solid = 0 etablierte Retail-Angebote im DACH-Raum — fruehe Markenpositionierung moeglich. '
       '<strong>EU-Batterieverordnung Aug 2026:</strong> Erweiterte Kennzeichnungspflicht in 1 Monat — '
       'WOWOHCOOL Modelle bereits QR-Code-ready.</p>')
if old in c: c = c.replace(old, new); updated += 1; print('halbfest-akku: OK')
else: print('halbfest-akku: FAIL')

# Retail table before Cross-Category
old2 = '<!-- Cross-Category Internal Links -->'
new2 = ('<!-- DACH Retail Pricing -->\n'
 '<section class="sec bg-white relative py-12">\n'
 ' <div class="max-w-5xl mx-auto px-6">\n'
 ' <div class="text-center mb-8">\n'
 '  <h2 class="text-2xl lg:text-3xl font-black text-brandBlue uppercase italic tracking-tighter mb-4">DACH-Markt: <span class="text-brandOrange">Blue Ocean</span> — Keine etablierten Retail-Listings</h2>\n'
 '  <p class="text-slate-500 text-sm max-w-2xl mx-auto">Semi-Solid-Powerbanks sind 2026 im deutschen Retail nicht verfuegbar. OEM-Partner von WOWOHCOOL besetzen diese Kategorie als Erste.</p>\n'
 ' </div>\n'
 ' <div class="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">\n'
 '  <table class="w-full text-sm"><thead><tr class="bg-brandBlue text-white"><th class="p-3 text-left text-xs font-bold uppercase tracking-wider">Kategorie</th><th class="p-3 text-center text-xs font-bold uppercase tracking-wider">Status DE 2026</th><th class="p-3 text-center text-xs font-bold uppercase tracking-wider">Chance</th></tr></thead><tbody>\n'
 '  <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">Semi-Solid Powerbank</td><td class="p-3 text-center"><span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-green-100 text-green-700">Keine Listings</span></td><td class="p-3 text-center text-slate-600">First-Mover Vorteil</td></tr>\n'
 '  <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">Li-Polymer Powerbank</td><td class="p-3 text-center"><span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-red-100 text-red-700">Gesattigt</span></td><td class="p-3 text-center text-slate-600">Preiskampf</td></tr>\n'
 '  <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">MagSafe/Qi2 Powerbank</td><td class="p-3 text-center"><span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-700">Wachsend</span></td><td class="p-3 text-center text-slate-600">Qi2 = Premium-Positionierung</td></tr>\n'
 '  </tbody></table>\n'
 ' </div>\n'
 ' <p class="text-center text-xs text-slate-400 mt-4">Quellen: Amazon DE, MediaMarkt/Saturn, Idealo Recherche — Juli 2026. Globale Semi-Solid-Marken (BMX/ELECOM/Kuxiu) haben noch keinen DE-Retail.</p>\n'
 ' </div>\n'
 '</section>\n\n'
 '<!-- Cross-Category Internal Links -->')
if old2 in c: c = c.replace(old2, new2); updated += 1; print('halbfest-akku: retail OK')
else:
    # Try alternate anchor
    if 'Interne Verlinkung' in c:
        old2b = '<!-- Interne Verlinkung -->'
        c = c.replace(old2b, new2)
        updated += 1
        print('halbfest-akku: retail OK (alt)')
    else:
        print('halbfest-akku: retail FAIL - no anchor')

with open(fp, 'w', encoding='utf-8') as f: f.write(c)

# ===== HEIZAKKU =====
fp2 = os.path.join(base, 'powerbank', 'heizakku', 'index.njk')
with open(fp2, 'r', encoding='utf-8') as f: c2 = f.read()
old_h = 'Q4-Lieferung jetzt sichern.</p>'
new_h = ('Q4-Lieferung jetzt sichern. '
         '<strong>Deutschland Heizjacken-Markt: $23.17M (2025) → $50.14M (2034), 8.95% CAGR '
         '(DeepMarketInsights). Deutschland = fuehrender EU-Markt mit 5.91% Globalanteil.</strong></p>\n'
         '\n'
         ' <p class="text-sm text-slate-500 mb-6">'
         '<strong>Batterie = 35-50% der Herstellkosten</strong> einer Heizjacke. '
         '7.4V DC = Standard (80%+ aller Heizjacken). '
         'Wiederkehrender Umsatz: Akku-Austausch alle 2-3 Saisons. '
         'Grosse Werkzeugmarken (Bosch/DEWALT/Milwaukee) nutzen eigene Akkus — '
         'Bekleidungsmarken sourcen von China-OEMs wie WOWOHCOOL.</p>')
if old_h in c2:
    c2 = c2.replace(old_h, new_h); updated += 1; print('heizakku: OK')
else: print('heizakku: FAIL')

# Retail table
if old2 in c2:
    new_h2 = ('<!-- DACH Retail Pricing -->\n'
     '<section class="sec bg-white relative py-12">\n'
     ' <div class="max-w-5xl mx-auto px-6">\n'
     ' <div class="text-center mb-8">\n'
     '  <h2 class="text-2xl lg:text-3xl font-black text-brandBlue uppercase italic tracking-tighter mb-4">DACH Heizbekleidung: <span class="text-brandOrange">Akkus bestimmen die Marge</span></h2>\n'
     '  <p class="text-slate-500 text-sm max-w-2xl mx-auto">Heizjacken retail 80-250 EUR, OEM-Akku $3-18 (MOQ 500). Batterie = 35-50% der Herstellkosten — groesster Einzelposten.</p>\n'
     ' </div>\n'
     ' <div class="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">\n'
     '  <table class="w-full text-sm"><thead><tr class="bg-brandBlue text-white"><th class="p-3 text-left text-xs font-bold uppercase tracking-wider">Marke</th><th class="p-3 text-center text-xs font-bold uppercase tracking-wider">Produkt</th><th class="p-3 text-center text-xs font-bold uppercase tracking-wider">Akku-Typ</th><th class="p-3 text-center text-xs font-bold uppercase tracking-wider">Akku-Quelle</th><th class="p-3 text-right text-xs font-bold uppercase tracking-wider">Retail DE</th></tr></thead><tbody>\n'
     '  <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">Bosch</td><td class="p-3 text-center text-slate-600">Professional Heated</td><td class="p-3 text-center text-slate-600">18V Eigen</td><td class="p-3 text-center text-slate-600">Intern</td><td class="p-3 text-right font-black text-brandBlue">150-250 EUR</td></tr>\n'
     '  <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">Milwaukee</td><td class="p-3 text-center text-slate-600">M12 Heated Jacket</td><td class="p-3 text-center text-slate-600">12V M12</td><td class="p-3 text-center text-slate-600">Intern</td><td class="p-3 text-right font-black text-brandBlue">120-180 EUR</td></tr>\n'
     '  <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">DEWALT</td><td class="p-3 text-center text-slate-600">20V Heated Vest</td><td class="p-3 text-center text-slate-600">20V MAX</td><td class="p-3 text-center text-slate-600">Intern</td><td class="p-3 text-right font-black text-brandBlue">100-150 EUR</td></tr>\n'
     '  <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">ORORO</td><td class="p-3 text-center text-slate-600">Heated Jacket</td><td class="p-3 text-center text-slate-600">7.4V DC</td><td class="p-3 text-center"><span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-brandOrange/10 text-brandOrange">China OEM</span></td><td class="p-3 text-right font-black text-brandBlue">120-180 EUR</td></tr>\n'
     '  <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">Gerbing</td><td class="p-3 text-center text-slate-600">Motorrad Heated</td><td class="p-3 text-center text-slate-600">12V DC</td><td class="p-3 text-center"><span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-brandOrange/10 text-brandOrange">China OEM</span></td><td class="p-3 text-right font-black text-brandBlue">200-300 EUR</td></tr>\n'
     '  </tbody></table>\n'
     ' </div>\n'
     ' <p class="text-center text-xs text-slate-400 mt-4">Quellen: Amazon DE, Louis, Polo — Juli 2026. OEM-Akku $3-18 (MOQ 500) vs Retail 80-300 EUR = 50-70% Bruttomarge.</p>\n'
     ' </div>\n'
     '</section>\n\n'
     '<!-- Cross-Category Internal Links -->')
    c2 = c2.replace(old2, new_h2); updated += 1; print('heizakku: retail OK')
else: print('heizakku: retail FAIL')

with open(fp2, 'w', encoding='utf-8') as f: f.write(c2)

# ===== MAGNETISCH-KABELLOS =====
fp3 = os.path.join(base, 'powerbank', 'magnetisch-kabellos', 'index.njk')
with open(fp3, 'r', encoding='utf-8') as f: c3 = f.read()
old3 = 'Werks-OEM fuer Marken.</p>\n\t<p class="text-slate-600 text-lg leading-relaxed mb-6">'
new3 = ('Werks-OEM fuer Marken.</p>\n'
        '\t<p class="text-slate-600 text-lg leading-relaxed mb-4">'
        '<strong>Deutschland Powerbank-Markt: $54.4M (2023) → $71.5M (2030). '
        'Qi2 = 2-3x Preisaufschlag vs Standard-Magnet (55.99 EUR vs 18.99 EUR, Amazon DE). '
        '8 von 10 DE Amazon Top-Platzierungen = chinesische Marken.</strong></p>\n'
        '\t<p class="text-sm text-slate-500 mb-6">'
        '<strong>Qi2.2 25W = Katalog-Auffrischung 2026:</strong> +67% Ladegeschwindigkeit. '
        'WOPQ11 bereits Qi2.2-ready — Early-Mover-Vorteil im DACH-Retail. '
        'DE+FR+UK = 13.4% des globalen Magnet-Powerbank-Marktes. Europa = 22.1%.</p>\n'
        '\t<p class="text-slate-600 text-lg leading-relaxed mb-6">')
if old3 in c3: c3 = c3.replace(old3, new3); updated += 1; print('magnetisch: OK')
else: print('magnetisch: FAIL')

# Retail table for magnetisch
old3b = old2
new3b = ('<!-- DACH Retail Pricing -->\n'
 '<section class="sec bg-white relative py-12">\n'
 ' <div class="max-w-5xl mx-auto px-6">\n'
 ' <div class="text-center mb-8">\n'
 '  <h2 class="text-2xl lg:text-3xl font-black text-brandBlue uppercase italic tracking-tighter mb-4">Amazon DE Bestenliste: <span class="text-brandOrange">Qi2 = 2-3x Premium</span></h2>\n'
 '  <p class="text-slate-500 text-sm max-w-2xl mx-auto">Magnetische Powerbank OEM ab $12-22 (MOQ 500) verkauft sich in DE fuer 19-56 EUR — Qi2-Modelle erzielen 2-3x hoehere Preise.</p>\n'
 ' </div>\n'
 ' <div class="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">\n'
 '  <table class="w-full text-sm"><thead><tr class="bg-brandBlue text-white"><th class="p-3 text-left text-xs font-bold uppercase tracking-wider">Marke</th><th class="p-3 text-center text-xs font-bold uppercase tracking-wider">Kapazitaet</th><th class="p-3 text-center text-xs font-bold uppercase tracking-wider">Qi2</th><th class="p-3 text-right text-xs font-bold uppercase tracking-wider">Preis DE</th></tr></thead><tbody>\n'
 '  <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">Anker MagGo Qi2</td><td class="p-3 text-center text-slate-600">10.000mAh</td><td class="p-3 text-center"><span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-brandOrange/10 text-brandOrange">Qi2 15W</span></td><td class="p-3 text-right font-black text-brandBlue">55.99 EUR</td></tr>\n'
 '  <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">Anker Nano Qi2</td><td class="p-3 text-center text-slate-600">5.000mAh</td><td class="p-3 text-center"><span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-brandOrange/10 text-brandOrange">Qi2 15W</span></td><td class="p-3 text-right font-black text-brandBlue">49.99 EUR</td></tr>\n'
 '  <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">UGREEN Nexode</td><td class="p-3 text-center text-slate-600">10.000mAh</td><td class="p-3 text-center text-slate-600">Nein</td><td class="p-3 text-right font-black text-brandBlue">24.99 EUR</td></tr>\n'
 '  <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">Baseus Enerfill</td><td class="p-3 text-center text-slate-600">10.000mAh</td><td class="p-3 text-center text-slate-600">Nein</td><td class="p-3 text-right font-black text-brandBlue">23.99 EUR</td></tr>\n'
 '  <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">INIU Ultra-Slim</td><td class="p-3 text-center text-slate-600">10.000mAh</td><td class="p-3 text-center text-slate-600">Nein</td><td class="p-3 text-right font-black text-brandBlue">22-27 EUR</td></tr>\n'
 '  </tbody></table>\n'
 ' </div>\n'
 ' <p class="text-center text-xs text-slate-400 mt-4">Quellen: Chongdiantou Amazon DE Top 10 Q1 2026, Amazon DE Preis-Recherche Juli 2026. OEM-Kosten $12-22 (MOQ 500) = 50-65% Bruttomarge.</p>\n'
 ' </div>\n'
 '</section>\n\n'
 '<!-- Cross-Category Internal Links -->')
if old3b in c3: c3 = c3.replace(old3b, new3b); updated += 1; print('magnetisch: retail OK')
else: print('magnetisch: retail FAIL (no anchor)')

with open(fp3, 'w', encoding='utf-8') as f: f.write(c3)

# ===== LAPTOP-POWERBANK =====
fp4 = os.path.join(base, 'powerbank', 'laptop-powerbank', 'index.njk')
with open(fp4, 'r', encoding='utf-8') as f: c4 = f.read()
# Find hero paragraph - look for 240W or PD 3.1
idx = c4.find('240W.')
if idx > 0:
    end_p = c4.find('</p>', idx)
    old4 = c4[idx-100:end_p+4]
    # Find the exact start of this paragraph
    p_start = c4.rfind('<p', 0, idx-50)
    hero_para = c4[p_start:end_p+4]
    # Keep existing text, add market data before closing </p>
    new_hero = hero_para.replace('</p>',
        ' <strong>Globaler PD 3.1 Powerbank-Markt: $11.2-18.6B (2026) → $29.8B (2031), 11.4% CAGR (ResearchAndMarkets). '
        'EU USB-C-Pflicht fuer Notebooks seit April 2026.</strong></p>\n'
        '\n'
        ' <p class="text-sm text-slate-500 mb-6">'
        '<strong>DACH-Katalysator:</strong> 42% Hybrid/Remote-Arbeit in DE = strukturelle Nachfrage nach Laptop-faehigen Powerbanks. '
        '100Wh/27.000mAh = IATA-konform fuer Business-Reisende. '
        '140W = B2B Sweet Spot: MacBook Pro 16" Volllast + Airline-Compliance.</p>')
    c4 = c4.replace(hero_para, new_hero)
    updated += 1
    print('laptop: OK')
else:
    print('laptop: FAIL')

# Retail table for laptop
old4b = old2
new4b = ('<!-- DACH Retail Pricing -->\n'
 '<section class="sec bg-white relative py-12">\n'
 ' <div class="max-w-5xl mx-auto px-6">\n'
 ' <div class="text-center mb-8">\n'
 '  <h2 class="text-2xl lg:text-3xl font-black text-brandBlue uppercase italic tracking-tighter mb-4">DACH Retail: <span class="text-brandOrange">PD 3.1 = Premium-Segment</span></h2>\n'
 '  <p class="text-slate-500 text-sm max-w-2xl mx-auto">Laptop-Powerbank OEM ab $22-55 (MOQ 500) verkauft sich in DE fuer 79-199 EUR — 50-65% Bruttomarge im Premium-Segment.</p>\n'
 ' </div>\n'
 ' <div class="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">\n'
 '  <table class="w-full text-sm"><thead><tr class="bg-brandBlue text-white"><th class="p-3 text-left text-xs font-bold uppercase tracking-wider">Marke</th><th class="p-3 text-center text-xs font-bold uppercase tracking-wider">Kapazitaet</th><th class="p-3 text-center text-xs font-bold uppercase tracking-wider">Leistung</th><th class="p-3 text-center text-xs font-bold uppercase tracking-wider">Protokoll</th><th class="p-3 text-right text-xs font-bold uppercase tracking-wider">Preis DE</th></tr></thead><tbody>\n'
 '  <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">Anker Prime 250W</td><td class="p-3 text-center text-slate-600">27.650mAh</td><td class="p-3 text-center text-slate-600">250W</td><td class="p-3 text-center"><span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-brandOrange/10 text-brandOrange">PD 3.1</span></td><td class="p-3 text-right font-black text-brandBlue">169-199 EUR</td></tr>\n'
 '  <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">UGREEN Nexode 145W</td><td class="p-3 text-center text-slate-600">25.000mAh</td><td class="p-3 text-center text-slate-600">145W</td><td class="p-3 text-center"><span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-brandOrange/10 text-brandOrange">PD 3.1</span></td><td class="p-3 text-right font-black text-brandBlue">89-119 EUR</td></tr>\n'
 '  <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">Baseus Blade 2</td><td class="p-3 text-center text-slate-600">20.000mAh</td><td class="p-3 text-center text-slate-600">100W</td><td class="p-3 text-center"><span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-brandOrange/10 text-brandOrange">PD 3.1</span></td><td class="p-3 text-right font-black text-brandBlue">79-99 EUR</td></tr>\n'
 '  <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">RAVPower 140W</td><td class="p-3 text-center text-slate-600">27.000mAh</td><td class="p-3 text-center text-slate-600">140W</td><td class="p-3 text-center"><span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-brandOrange/10 text-brandOrange">PD 3.1</span></td><td class="p-3 text-right font-black text-brandBlue">99-129 EUR</td></tr>\n'
 '  </tbody></table>\n'
 ' </div>\n'
 ' <p class="text-center text-xs text-slate-400 mt-4">Quellen: Amazon DE Preis-Recherche Juli 2026. OEM-Kosten $22-55 (MOQ 500) = 50-65% Bruttomarge.</p>\n'
 ' </div>\n'
 '</section>\n\n'
 '<!-- Cross-Category Internal Links -->')
if old4b in c4: c4 = c4.replace(old4b, new4b); updated += 1; print('laptop: retail OK')
else: print('laptop: retail FAIL (no anchor)')

with open(fp4, 'w', encoding='utf-8') as f: f.write(c4)

print(f'\nTotal updates: {updated}')
