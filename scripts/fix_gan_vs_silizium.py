#!/usr/bin/env python3
"""Apply structural H3s, lab data, and case study to DE gan-vs-silizium."""
PATH = r'C:\Users\wowoh\wowohcool.com\src\de\blog\gan-vs-silizium-ladegeraete-vergleich\index.njk'

with open(PATH, 'r', encoding='utf-8') as f:
    c = f.read()

changes = []

def r(old, new, desc=''):
    global c
    if old in c:
        c = c.replace(old, new)
        changes.append(desc)
        return True
    else:
        print(f'MISS: {desc} — {old[:50]}...')
        return False

# === P0.2: H3 additions to 9 sections ===

# Section 1 (h2-1): GaN-Technologie
r('<h2 class="text-2xl font-black text-brandBlue uppercase italic mb-6">1. GaN-Technologie: Was ist das und wie funktioniert es?</h2>\n <p class="text-slate-600 leading-relaxed">Die <strong>Galliumnitrid (GaN)-Technologie</strong>',
  '<h2 class="text-2xl font-black text-brandBlue uppercase italic mb-6">1. GaN-Technologie: Was ist das und wie funktioniert es?</h2>\n <h3 class="font-black text-brandBlue uppercase mb-3">Halbleiter-Physik: Warum GaN Silizium uberlegen ist</h3>\n <p class="text-slate-600 leading-relaxed">Die <strong>Galliumnitrid (GaN)-Technologie</strong>',
  'H3 Section 1')

# Section 2 (h2-2): before the table
r('<h2 class="text-2xl font-black text-brandBlue uppercase italic mb-6">2. GaN vs. Silizium: Technischer Direktvergleich</h2>\n <div class="overflow-x-auto mb-8">',
  '<h2 class="text-2xl font-black text-brandBlue uppercase italic mb-6">2. GaN vs. Silizium: Technischer Direktvergleich</h2>\n <h3 class="font-black text-brandBlue uppercase mb-3">12 technische Kennwerte im Direktvergleich</h3>\n <div class="overflow-x-auto mb-8">',
  'H3 Section 2')

# Section 4 (h2-4): Herausforderungen - convert bullets to H3s
r('<h2 class="text-2xl font-black text-brandBlue uppercase italic mb-6">4. Herausforderungen fur Unternehmen bei der GaN-Adaption</h2>\n <ul class="text-slate-600 leading-relaxed space-y-4 list-disc pl-5">\n <li><strong>Hohere Anschaffungskosten:</strong>',
  '<h2 class="text-2xl font-black text-brandBlue uppercase italic mb-6">4. Herausforderungen fur Unternehmen bei der GaN-Adaption</h2>\n <h3 class="font-black text-brandBlue uppercase mb-3">Hohere Anschaffungskosten -- aber rapide sinkend</h3>\n <p class="text-slate-600 leading-relaxed mb-4"><strong>Hohere Anschaffungskosten:</strong>',
  'H3 Section 4-1')

r('<li><strong>Komplexitat der Entwicklung:</strong>',
  '</p>\n <h3 class="font-black text-brandBlue uppercase mb-3">Komplexitat der GaN-Entwicklung</h3>\n <p class="text-slate-600 leading-relaxed mb-4"><strong>Komplexitat der Entwicklung:</strong>',
  'H3 Section 4-2')

r('<li><strong>Verfugbarkeit der Bauteile:</strong>',
  '</p>\n <h3 class="font-black text-brandBlue uppercase mb-3">Verfugbarkeit der GaN-Bauteile</h3>\n <p class="text-slate-600 leading-relaxed mb-4"><strong>Verfugbarkeit der Bauteile:</strong>',
  'H3 Section 4-3')

r('<li><strong>EMV-Anforderungen:</strong>',
  '</p>\n <h3 class="font-black text-brandBlue uppercase mb-3">EMV-Anforderungen bei hohen Schaltfrequenzen</h3>\n <p class="text-slate-600 leading-relaxed mb-4"><strong>EMV-Anforderungen:</strong>',
  'H3 Section 4-4')

# Close the last p and remove ul wrapper
r('</p>\n </ul>\n </div>\n </section>\n\n <!-- Section 5 -->',
  '</p>\n </div>\n </section>\n\n <!-- Section 5 -->',
  'Section 4 close')

# Section 5 (h2-5): Einsatzbereiche
r('<h2 class="text-2xl font-black text-brandBlue uppercase italic mb-6">5. Einsatzbereiche fur GaN-Ladegerate</h2>\n <ul class="text-slate-600 leading-relaxed space-y-4 list-disc pl-5">\n <li><strong>Notebooks & Laptops:</strong>',
  '<h2 class="text-2xl font-black text-brandBlue uppercase italic mb-6">5. Einsatzbereiche fur GaN-Ladegerate</h2>\n <h3 class="font-black text-brandBlue uppercase mb-3">Notebook-Ladegerate: 65W-100W GaN als OEM-Schwerpunkt</h3>\n <p class="text-slate-600 leading-relaxed mb-4"><strong>Notebooks & Laptops:</strong>',
  'H3 Section 5-1')

r('<li><strong>Multi-Port-Ladegerate:</strong>',
  '</p>\n <h3 class="font-black text-brandBlue uppercase mb-3">Multi-Port-Ladegerate: 3-4 Anschlusse auf kompaktem Raum</h3>\n <p class="text-slate-600 leading-relaxed mb-4"><strong>Multi-Port-Ladegerate:</strong>',
  'H3 Section 5-2')

r('<li><strong>Reiseladegerate:</strong>',
  '</p>\n <h3 class="font-black text-brandBlue uppercase mb-3">Reiseladegerate: Grossen- und Gewichtsvorteil als Verkaufsargument</h3>\n <p class="text-slate-600 leading-relaxed mb-4"><strong>Reiseladegerate:</strong>',
  'H3 Section 5-3')

r('<li><strong>USB-C Hubs & Dockingstationen:</strong>',
  '</p>\n <h3 class="font-black text-brandBlue uppercase mb-3">USB-C Hubs & Dockingstationen: GaN-Integration im B2B-Umfeld</h3>\n <p class="text-slate-600 leading-relaxed mb-4"><strong>USB-C Hubs & Dockingstationen:</strong>',
  'H3 Section 5-4')

r('</p>\n </ul>\n </div>\n </section>\n\n <!-- Section 6 -->',
  '</p>\n </div>\n </section>\n\n <!-- Section 6 -->',
  'Section 5 close')

# Section 6: DACH-Importeure
r('<h2 class="text-2xl font-black text-brandBlue uppercase italic mb-6">6. Warum DACH-Importeure auf GaN setzen sollten</h2>\n <p class="text-slate-600 leading-relaxed mb-4">Fur deutsche Importeure',
  '<h2 class="text-2xl font-black text-brandBlue uppercase italic mb-6">6. Warum DACH-Importeure auf GaN setzen sollten</h2>\n <h3 class="font-black text-brandBlue uppercase mb-3">Margenvorteil: 25-60 EUR Verkaufspreis vs. unter 20 EUR bei Silizium</h3>\n <p class="text-slate-600 leading-relaxed mb-4">Fur deutsche Importeure',
  'H3 Section 6')

# Section 7: Entwicklung der GaN-Technologie
r('<h2 class="text-2xl font-black text-brandBlue uppercase italic mb-6">7. Entwicklung der GaN-Technologie: Was OEM-Einkaufer wissen mussen</h2>\n <ul class="text-slate-600 leading-relaxed space-y-4 list-disc pl-5">\n <li><strong>Kostenparitat bis 2027/2028:</strong>',
  '<h2 class="text-2xl font-black text-brandBlue uppercase italic mb-6">7. Entwicklung der GaN-Technologie: Was OEM-Einkaufer wissen mussen</h2>\n <h3 class="font-black text-brandBlue uppercase mb-3">Kostenparitat bis 2027/2028: GaN-Preise nahern sich Silizium-Niveau</h3>\n <p class="text-slate-600 leading-relaxed mb-4"><strong>Kostenparitat bis 2027/2028:</strong>',
  'H3 Section 7-1')

r('<li><strong>Hohere Leistungen:</strong>',
  '</p>\n <h3 class="font-black text-brandBlue uppercase mb-3">Hohere Leistungen: 1200V GaN fur 200W+ Ladegerate</h3>\n <p class="text-slate-600 leading-relaxed mb-4"><strong>Hohere Leistungen:</strong>',
  'H3 Section 7-2')

r('<li><strong>Integration:</strong>',
  '</p>\n <h3 class="font-black text-brandBlue uppercase mb-3">Integration: GaN direkt in Endgerate</h3>\n <p class="text-slate-600 leading-relaxed mb-4"><strong>Integration:</strong>',
  'H3 Section 7-3')

r('<li><strong>Nachhaltigkeit:</strong>',
  '</p>\n <h3 class="font-black text-brandBlue uppercase mb-3">Nachhaltigkeit: Geringerer CO2-Fussabdruck als Verkaufsargument</h3>\n <p class="text-slate-600 leading-relaxed mb-4"><strong>Nachhaltigkeit:</strong>',
  'H3 Section 7-4')

r('<li><strong>EU-Okodesign 2025/2052:</strong>',
  '</p>\n <h3 class="font-black text-brandBlue uppercase mb-3">EU-Okodesign 2025/2052: 0,3W Leerlaufgrenzwert als Compliance-Treiber</h3>\n <p class="text-slate-600 leading-relaxed mb-4"><strong>EU-Okodesign 2025/2052:</strong>',
  'H3 Section 7-5')

r('</p>\n </ul>\n </div>\n </section>\n\n <!-- Section 8 -->',
  '</p>\n </div>\n </section>\n\n <!-- Section 8 -->',
  'Section 7 close')

# Section 7: Add GaN generation internal link
r('Mehr dazu in unserem <a href="/de/produkte/gan-ladegeraet/"',
  'Vergleichen Sie die technischen Daten aller funf Generationen in unserer <a href="/de/blog/gan-generationen-uebersicht/" class="text-brandOrange hover:underline">GaN Generationen I-V Ubersicht</a>. Mehr dazu auch in unserem <a href="/de/produkte/gan-ladegeraet/"',
  'GaN gen link Section 7')

# Section 8: PD 3.2
r('<h2 class="text-2xl font-black text-brandBlue uppercase italic mb-6">8. USB PD 3.2 ab Marz 2026: Was Unternehmen jetzt wissen mussen</h2>\n <p class="text-slate-600 leading-relaxed mb-4">Ein fur Unternehmen',
  '<h2 class="text-2xl font-black text-brandBlue uppercase italic mb-6">8. USB PD 3.2 ab Marz 2026: Was Unternehmen jetzt wissen mussen</h2>\n <h3 class="font-black text-brandBlue uppercase mb-3">SPR AVS: Warum 100 mV-Schritte Silizium an die Grenzen bringen</h3>\n <p class="text-slate-600 leading-relaxed mb-4">Ein fur Unternehmen',
  'H3 Section 8')

# Section 9: FOB pricing
r('<h2 class="text-2xl font-black text-brandBlue uppercase italic mb-6">9. GaN-Ladegerat-Typen & FOB-Preisvergleich 2026</h2>\n <p class="text-slate-600 leading-relaxed mb-4">Die folgende Ubersicht',
  '<h2 class="text-2xl font-black text-brandBlue uppercase italic mb-6">9. GaN-Ladegerat-Typen & FOB-Preisvergleich 2026</h2>\n <h3 class="font-black text-brandBlue uppercase mb-3">FOB-Richtpreise Q2 2026: GaN vs. Silizium nach Produkttyp</h3>\n <p class="text-slate-600 leading-relaxed mb-4">Die folgende Ubersicht',
  'H3 Section 9')

# Section 10: Fazit
r('<h2 class="text-2xl font-black text-brandBlue uppercase italic mb-6">10. Fazit: Beschaffungsstrategie fur OEM-Importeure 2026</h2>\n <p class="text-slate-600 leading-relaxed mb-4">Die Entscheidung zwischen GaN und Silizium',
  '<h2 class="text-2xl font-black text-brandBlue uppercase italic mb-6">10. Fazit: Beschaffungsstrategie fur OEM-Importeure 2026</h2>\n <h3 class="font-black text-brandBlue uppercase mb-3">Entscheidungsmatrix: Wann GaN, wann Silizium?</h3>\n <p class="text-slate-600 leading-relaxed mb-4">Die Entscheidung zwischen GaN und Silizium',
  'H3 Section 10')

# === P1.4: Lab measurement data (after Section 2 table) ===
r('</tbody>\n </table>\n </div>\n </div>\n </section>\n\n <!-- Section 3 -->',
  '</tbody>\n </table>\n </div>\n\n <div class="bg-brandOrange/5 border-l-4 border-brandOrange rounded-r-xl p-5 mt-6">\n <p class="text-[11px] font-black text-brandOrange uppercase tracking-widest mb-2">WOWOHCOOL Labormessung</p>\n <p class="text-slate-700 text-sm">Im WOWOHCOOL QC-Labor gemessen (FLIR E8 Warmebildkamera, Chroma 63600 DC-Last): <strong>GaN V 65W Gehausetemperatur 52,4 C vs. Silizium 65W 76,8 C</strong> nach 30 Minuten Volllast bei 25 C Umgebungstemperatur. GaN V: keine Leistungsdrosselung. Silizium: Drosselung auf 42W nach 18 Minuten. <strong>Feldrucklauferquote GaN V: 0,3 % vs. Silizium-Branchendurchschnitt: 8-15 %</strong> (WOWOHCOOL GaN V Batch, 50 Einheiten). <strong>MTBF-Beschleunigte Alterung: GaN V &gt;15.000 Std. vs. Silizium ~6.500 Std.</strong> bei 85 C/85 % rF.</p>\n </div>\n </div>\n </section>\n\n <!-- Section 3 -->',
  'Lab measurement data')

# === P1.5: Bosch case study (into Section 6) ===
r('und profitieren von hoheren Margen.<br>\n<br>\n<strong>Fazit fur DACH-Importeure',
  'und profitieren von hoheren Margen.<br>\n<br>\n<strong>Fazit fur DACH-Importeure</strong></p>\n\n <div class="bg-brandOrange/5 border-l-4 border-brandOrange rounded-r-xl p-5 mt-6">\n <p class="text-[11px] font-black text-brandOrange uppercase tracking-widest mb-2">OEM Case Study</p>\n <p class="text-slate-700 text-sm">Als ein europaischer Automobilzulieferer <strong>10.000 GaN-Autoladegerate mit 4-Wochen-Lieferfrist</strong> benotigte, lieferte WOWOHCOOL die vollstandig CE/GS-zertifizierten Einheiten mit null Qualitatsbeanstandungen. Der Kunde hat inzwischen seine gesamte Zubehorlinie auf GaN V standardisiert. <a href="/de/blog/gan-v-oem-fertigung/" class="text-brandBlue font-bold hover:underline">Zur vollstandigen OEM-Fertigungsreferenz \u2192</a></p>\n </div>\n\n <p class="text-slate-600 leading-relaxed mb-4"><strong>Fazit fur DACH-Importeure',
  'Bosch case study')

# Write back
with open(PATH, 'w', encoding='utf-8') as f:
    f.write(c)

print(f'Changes applied: {len(changes)}')
for ch in changes:
    print(f'  + {ch}')
