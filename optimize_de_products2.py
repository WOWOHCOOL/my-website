import os
base = r'C:/Users/wowoh/wowohcool.com/src/de/produkte'
cross_anchor = '<!-- Cross-Link: Explore More Categories -->'
updated = 0

# === HALBFEST-AKKU retail ===
fp = os.path.join(base, 'powerbank/halbfest-akku/index.njk')
with open(fp, 'r', encoding='utf-8') as f: c = f.read()
tab = ('<!-- DACH Retail Pricing -->\n'
 '<section class="sec bg-white relative py-12">\n'
 ' <div class="max-w-5xl mx-auto px-6">\n'
 ' <div class="text-center mb-8">\n'
 '  <h2 class="text-2xl lg:text-3xl font-black text-brandBlue uppercase italic tracking-tighter mb-4">DACH-Markt: <span class="text-brandOrange">Blue Ocean</span> — Keine etablierten Semi-Solid Listings</h2>\n'
 '  <p class="text-slate-500 text-sm max-w-2xl mx-auto">Semi-Solid-Powerbanks sind 2026 im deutschen Retail nicht verfuegbar. OEM-Partner von WOWOHCOOL besetzen diese Kategorie als Erste.</p>\n'
 ' </div>\n'
 ' <div class="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">\n'
 '  <table class="w-full text-sm"><thead><tr class="bg-brandBlue text-white"><th class="p-3 text-left text-xs font-bold uppercase tracking-wider">Kategorie</th><th class="p-3 text-center text-xs font-bold uppercase tracking-wider">Status DE 2026</th><th class="p-3 text-center text-xs font-bold uppercase tracking-wider">Chance</th></tr></thead><tbody>\n'
 '  <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">Semi-Solid Powerbank</td><td class="p-3 text-center"><span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-green-100 text-green-700">Keine Listings</span></td><td class="p-3 text-center text-slate-600">First-Mover Vorteil</td></tr>\n'
 '  <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">Li-Polymer Powerbank</td><td class="p-3 text-center"><span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-red-100 text-red-700">Gesattigt</span></td><td class="p-3 text-center text-slate-600">Preiskampf</td></tr>\n'
 '  <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">MagSafe/Qi2 Powerbank</td><td class="p-3 text-center"><span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-700">Wachsend</span></td><td class="p-3 text-center text-slate-600">Qi2 = Premium</td></tr>\n'
 '  </tbody></table>\n'
 ' </div>\n'
 ' <p class="text-center text-xs text-slate-400 mt-4">Quellen: Amazon DE, MediaMarkt/Saturn Recherche — Juli 2026. Globale Semi-Solid-Marken (BMX/ELECOM/Kuxiu) nicht im DE-Retail gelistet.</p>\n'
 ' </div>\n'
 '</section>\n\n' + cross_anchor)
c = c.replace(cross_anchor, tab); updated += 1; print('halbfest retail OK')
with open(fp, 'w', encoding='utf-8') as f: f.write(c)

# === HEIZAKKU retail ===
fp2 = os.path.join(base, 'powerbank/heizakku/index.njk')
with open(fp2, 'r', encoding='utf-8') as f: c2 = f.read()
tab2 = ('<!-- DACH Retail Pricing -->\n'
 '<section class="sec bg-white relative py-12">\n'
 ' <div class="max-w-5xl mx-auto px-6">\n'
 ' <div class="text-center mb-8">\n'
 '  <h2 class="text-2xl lg:text-3xl font-black text-brandBlue uppercase italic tracking-tighter mb-4">DACH Heizbekleidung: <span class="text-brandOrange">Akkus bestimmen die Marge</span></h2>\n'
 '  <p class="text-slate-500 text-sm max-w-2xl mx-auto">Heizjacken retail 80-300 EUR. OEM-Akku $3-18 (MOQ 500). Batterie = 35-50% der Herstellkosten — groesster Einzelposten.</p>\n'
 ' </div>\n'
 ' <div class="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">\n'
 '  <table class="w-full text-sm"><thead><tr class="bg-brandBlue text-white"><th class="p-3 text-left text-xs font-bold uppercase tracking-wider">Marke</th><th class="p-3 text-center text-xs font-bold uppercase tracking-wider">Produkt</th><th class="p-3 text-center text-xs font-bold uppercase tracking-wider">Akku-Quelle</th><th class="p-3 text-right text-xs font-bold uppercase tracking-wider">Retail DE</th></tr></thead><tbody>\n'
 '  <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">Bosch</td><td class="p-3 text-center text-slate-600">Professional Heated</td><td class="p-3 text-center text-slate-600">Intern (18V)</td><td class="p-3 text-right font-black text-brandBlue">150-250 EUR</td></tr>\n'
 '  <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">Milwaukee</td><td class="p-3 text-center text-slate-600">M12 Heated Jacket</td><td class="p-3 text-center text-slate-600">Intern (12V M12)</td><td class="p-3 text-right font-black text-brandBlue">120-180 EUR</td></tr>\n'
 '  <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">DEWALT</td><td class="p-3 text-center text-slate-600">20V Heated Vest</td><td class="p-3 text-center text-slate-600">Intern (20V MAX)</td><td class="p-3 text-right font-black text-brandBlue">100-150 EUR</td></tr>\n'
 '  <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">ORORO</td><td class="p-3 text-center text-slate-600">Heated Jacket</td><td class="p-3 text-center"><span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-brandOrange/10 text-brandOrange">China OEM</span></td><td class="p-3 text-right font-black text-brandBlue">120-180 EUR</td></tr>\n'
 '  <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">Gerbing</td><td class="p-3 text-center text-slate-600">Motorrad Heated</td><td class="p-3 text-center"><span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-brandOrange/10 text-brandOrange">China OEM</span></td><td class="p-3 text-right font-black text-brandBlue">200-300 EUR</td></tr>\n'
 '  </tbody></table>\n'
 ' </div>\n'
 ' <p class="text-center text-xs text-slate-400 mt-4">Quellen: Amazon DE, Louis, Polo — Juli 2026. OEM-Akku $3-18 (MOQ 500) vs Retail 80-300 EUR = 50-70% Bruttomarge.</p>\n'
 ' </div>\n'
 '</section>\n\n' + cross_anchor)
c2 = c2.replace(cross_anchor, tab2); updated += 1; print('heizakku retail OK')
with open(fp2, 'w', encoding='utf-8') as f: f.write(c2)

# === MAGNETISCH hero + retail ===
fp3 = os.path.join(base, 'powerbank/magnetisch-kabellos/index.njk')
with open(fp3, 'r', encoding='utf-8') as f: c3 = f.read()
old3 = 'MOQ ab 500 Stueck, kundenspezifisches Branding.</p>'
new3 = ('MOQ ab 500 Stueck, kundenspezifisches Branding. '
        '<strong>DE Powerbank-Markt: $54.4M (2023) → $71.5M (2030). '
        'Qi2 = 2-3x Preisaufschlag vs Standard-Magnet (55.99 EUR vs 18.99 EUR, Amazon DE Q1 2026).</strong></p>\n'
        '\n'
        ' <p class="text-sm text-slate-500 mb-6">'
        '<strong>DE+FR+UK = 13.4% des globalen Magnet-Powerbank-Marktes (QYResearch).</strong> '
        'Europa = 22.1%. 8 von 10 DE Amazon Top-Platzierungen = chinesische Marken (Chongdiantou Q1 2026). '
        'Qi2.2 25W: WOPQ11 bereits ready — Early-Mover-Vorteil im DACH-Retail.</p>')
if old3 in c3: c3 = c3.replace(old3, new3); updated += 1; print('magnetisch hero OK')
else: print('magnetisch hero FAIL')

tab3 = ('<!-- DACH Retail Pricing -->\n'
 '<section class="sec bg-white relative py-12">\n'
 ' <div class="max-w-5xl mx-auto px-6">\n'
 ' <div class="text-center mb-8">\n'
 '  <h2 class="text-2xl lg:text-3xl font-black text-brandBlue uppercase italic tracking-tighter mb-4">Amazon DE: <span class="text-brandOrange">Qi2 = 2-3x Premium</span> (Chongdiantou Q1 2026)</h2>\n'
 '  <p class="text-slate-500 text-sm max-w-2xl mx-auto">Magnetische Powerbank OEM $12-22 (MOQ 500) verkauft sich in DE fuer 19-56 EUR.</p>\n'
 ' </div>\n'
 ' <div class="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">\n'
 '  <table class="w-full text-sm"><thead><tr class="bg-brandBlue text-white"><th class="p-3 text-left text-xs font-bold uppercase tracking-wider">Marke</th><th class="p-3 text-center text-xs font-bold uppercase tracking-wider">Kapazitaet</th><th class="p-3 text-center text-xs font-bold uppercase tracking-wider">Qi2</th><th class="p-3 text-right text-xs font-bold uppercase tracking-wider">Preis DE</th></tr></thead><tbody>\n'
 '  <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">Anker MagGo Qi2</td><td class="p-3 text-center text-slate-600">10.000mAh</td><td class="p-3 text-center"><span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-brandOrange/10 text-brandOrange">Qi2 15W</span></td><td class="p-3 text-right font-black text-brandBlue">55.99 EUR</td></tr>\n'
 '  <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">Anker Nano Qi2</td><td class="p-3 text-center text-slate-600">5.000mAh</td><td class="p-3 text-center"><span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-brandOrange/10 text-brandOrange">Qi2 15W</span></td><td class="p-3 text-right font-black text-brandBlue">49.99 EUR</td></tr>\n'
 '  <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">UGREEN Nexode</td><td class="p-3 text-center text-slate-600">10.000mAh</td><td class="p-3 text-center text-slate-600">—</td><td class="p-3 text-right font-black text-brandBlue">24.99 EUR</td></tr>\n'
 '  <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">Baseus Enerfill</td><td class="p-3 text-center text-slate-600">10.000mAh</td><td class="p-3 text-center text-slate-600">—</td><td class="p-3 text-right font-black text-brandBlue">23.99 EUR</td></tr>\n'
 '  <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">INIU Ultra-Slim</td><td class="p-3 text-center text-slate-600">10.000mAh</td><td class="p-3 text-center text-slate-600">—</td><td class="p-3 text-right font-black text-brandBlue">22-27 EUR</td></tr>\n'
 '  </tbody></table>\n'
 ' </div>\n'
 ' <p class="text-center text-xs text-slate-400 mt-4">Quellen: Chongdiantou Amazon DE Q1 2026, Amazon DE Juli 2026. OEM $12-22 (MOQ 500) = 50-65% Bruttomarge.</p>\n'
 ' </div>\n'
 '</section>\n\n' + cross_anchor)
c3 = c3.replace(cross_anchor, tab3); updated += 1; print('magnetisch retail OK')
with open(fp3, 'w', encoding='utf-8') as f: f.write(c3)

# === LAPTOP retail ===
fp4 = os.path.join(base, 'powerbank/laptop-powerbank/index.njk')
with open(fp4, 'r', encoding='utf-8') as f: c4 = f.read()
tab4 = ('<!-- DACH Retail Pricing -->\n'
 '<section class="sec bg-white relative py-12">\n'
 ' <div class="max-w-5xl mx-auto px-6">\n'
 ' <div class="text-center mb-8">\n'
 '  <h2 class="text-2xl lg:text-3xl font-black text-brandBlue uppercase italic tracking-tighter mb-4">DACH Retail: <span class="text-brandOrange">PD 3.1 = Premium-Segment</span></h2>\n'
 '  <p class="text-slate-500 text-sm max-w-2xl mx-auto">Laptop-Powerbank OEM $22-55 (MOQ 500) verkauft sich in DE fuer 79-199 EUR.</p>\n'
 ' </div>\n'
 ' <div class="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">\n'
 '  <table class="w-full text-sm"><thead><tr class="bg-brandBlue text-white"><th class="p-3 text-left text-xs font-bold uppercase tracking-wider">Marke</th><th class="p-3 text-center text-xs font-bold uppercase tracking-wider">Kapazitaet</th><th class="p-3 text-center text-xs font-bold uppercase tracking-wider">Leistung</th><th class="p-3 text-center text-xs font-bold uppercase tracking-wider">Protokoll</th><th class="p-3 text-right text-xs font-bold uppercase tracking-wider">Preis DE</th></tr></thead><tbody>\n'
 '  <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">Anker Prime 250W</td><td class="p-3 text-center text-slate-600">27.650mAh</td><td class="p-3 text-center text-slate-600">250W</td><td class="p-3 text-center"><span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-brandOrange/10 text-brandOrange">PD 3.1</span></td><td class="p-3 text-right font-black text-brandBlue">169-199 EUR</td></tr>\n'
 '  <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">UGREEN Nexode 145W</td><td class="p-3 text-center text-slate-600">25.000mAh</td><td class="p-3 text-center text-slate-600">145W</td><td class="p-3 text-center"><span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-brandOrange/10 text-brandOrange">PD 3.1</span></td><td class="p-3 text-right font-black text-brandBlue">89-119 EUR</td></tr>\n'
 '  <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">Baseus Blade 2</td><td class="p-3 text-center text-slate-600">20.000mAh</td><td class="p-3 text-center text-slate-600">100W</td><td class="p-3 text-center"><span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-brandOrange/10 text-brandOrange">PD 3.1</span></td><td class="p-3 text-right font-black text-brandBlue">79-99 EUR</td></tr>\n'
 '  <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">RAVPower 140W</td><td class="p-3 text-center text-slate-600">27.000mAh</td><td class="p-3 text-center text-slate-600">140W</td><td class="p-3 text-center"><span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-brandOrange/10 text-brandOrange">PD 3.1</span></td><td class="p-3 text-right font-black text-brandBlue">99-129 EUR</td></tr>\n'
 '  </tbody></table>\n'
 ' </div>\n'
 ' <p class="text-center text-xs text-slate-400 mt-4">Quellen: Amazon DE Juli 2026. OEM $22-55 (MOQ 500) = 50-65% Bruttomarge.</p>\n'
 ' </div>\n'
 '</section>\n\n' + cross_anchor)
c4 = c4.replace(cross_anchor, tab4); updated += 1; print('laptop retail OK')
with open(fp4, 'w', encoding='utf-8') as f: f.write(c4)

# === Also do 3-in-1 station, auto-ladehalterung, desktop ===
for subdir, title, rows in [
    ('kabelloses-ladegeraet/3-in-1-station',
     'DACH 3-in-1: <span class="text-brandOrange">Hotel + Corporate</span> — der lukrativste Kanal',
     [('Belkin BoostCharge Pro', '3-in-1 Stand Qi2', '15W', '~149 EUR'),
      ('Anker MagGo Cube', '3-in-1 Faltbar Qi2', '15W', '~129 EUR'),
      ('Mophie 3-in-1 Travel', 'Faltbare Station', '15W', '~99 EUR'),
      ('Spigen ArcField', '3-in-1 Faltbar', '15W', '~59 EUR'),
      ('ESR HaloLock 3-in-1', 'Stand + Pad', '7.5W', '~55 EUR')]),
    ('kabelloses-ladegeraet/auto-ladehalterung',
     'DACH Kfz-Markt: <span class="text-brandOrange">TEC = Pflicht 2026</span>',
     [('Anker Prime AirCool', 'Vent + Dash 25W', 'TEC + Luefter', '69-89 EUR'),
      ('ESR CryoBoost Qi2', 'Vent + Dash 15W', 'Aktiver Luefter', '35-55 EUR'),
      ('Belkin BoostCharge Pro', 'Vent 15W', 'Passiv', '45-60 EUR'),
      ('LISEN Qi2.2 25W', 'Vent + Dash', 'KI-Kuehlung', '30-45 EUR'),
      ('UGREEN MagFlow 25W', 'Vent', 'Luefter', '35-50 EUR')]),
    ('kabelloses-ladegeraet/desktop',
     'DACH Desktop: <span class="text-brandOrange">55-60% Volumen</span>, 17.2% CAGR',
     [('Belkin BoostCharge Pro', 'Vertikal-Stand Qi2', '15W', '49-59 EUR'),
      ('Anker MagGo', '3-in-1 Stand Qi2', '15W', '79 EUR'),
      ('Mophie Powerstation', '3-in-1 Pad Qi2', '15W', '89 EUR'),
      ('ESR HaloLock', 'Magnet-Stand Qi2', '7.5W', '39 EUR'),
      ('Spigen ArcField', '3-in-1 Pad Qi2', '15W', '59 EUR')]),
]:
    fp_x = os.path.join(base, subdir, 'index.njk')
    with open(fp_x, 'r', encoding='utf-8') as f: cx = f.read()

    # Build retail table
    thead = '<tr class="bg-brandBlue text-white"><th class="p-3 text-left text-xs font-bold uppercase tracking-wider">Marke</th><th class="p-3 text-center text-xs font-bold uppercase tracking-wider">Typ</th><th class="p-3 text-center text-xs font-bold uppercase tracking-wider">Leistung</th><th class="p-3 text-right text-xs font-bold uppercase tracking-wider">Preis DE</th></tr>'
    tbody = ''
    for row in rows:
        brand, typ, power, price = row
        tbody += f'  <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">{brand}</td><td class="p-3 text-center text-slate-600">{typ}</td><td class="p-3 text-center text-slate-600">{power}</td><td class="p-3 text-right font-black text-brandBlue">{price}</td></tr>\n'

    tab_x = (f'<!-- DACH Retail Pricing -->\n'
     f'<section class="sec bg-white relative py-12">\n'
     f' <div class="max-w-5xl mx-auto px-6">\n'
     f' <div class="text-center mb-8">\n'
     f'  <h2 class="text-2xl lg:text-3xl font-black text-brandBlue uppercase italic tracking-tighter mb-4">{title}</h2>\n'
     f'  <p class="text-slate-500 text-sm max-w-2xl mx-auto">OEM-Kosten 15-35 USD (MOQ 500). DACH-Retail 39-149 EUR — 50-65% Bruttomarge.</p>\n'
     f' </div>\n'
     f' <div class="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">\n'
     f'  <table class="w-full text-sm"><thead>{thead}</thead><tbody>\n'
     f'{tbody}'
     f'  </tbody></table>\n'
     f' </div>\n'
     f' <p class="text-center text-xs text-slate-400 mt-4">Quellen: Amazon DE, MediaMarkt/Saturn — Juli 2026. OEM 15-35 USD (MOQ 500) = 50-65% Bruttomarge.</p>\n'
     f' </div>\n'
     f'</section>\n\n' + cross_anchor)

    if cross_anchor in cx:
        cx = cx.replace(cross_anchor, tab_x); updated += 1
        print(f'{subdir} retail OK')
    else:
        print(f'{subdir} retail FAIL (no anchor)')

    with open(fp_x, 'w', encoding='utf-8') as f: f.write(cx)

print(f'\nTotal: {updated}')
