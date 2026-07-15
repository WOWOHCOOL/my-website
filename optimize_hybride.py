import sys
path = 'C:/Users/wowoh/wowohcool.com/src/fr/produits/batterie-externe/hybride-2-en-1/index.njk'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

changes = 0

# --- EDIT 1: Hero paragraph - add travel market data + EU mandate ---
old1 = 'Chargeur mural sur secteur, batterie externe en déplacement. Technologie GaN, sortie PD 45-67W, prise AC pliable. Un seul appareil en remplace deux. Adapté aux voyages, conforme au transport aérien.</p>'
new1 = ('Chargeur mural sur secteur, batterie externe en déplacement. Technologie GaN, sortie PD 45-67W, prise AC pliable. <strong>Un seul appareil en remplace deux.</strong> Adapté aux voyages, conforme au transport aérien. '
        '<strong>Marché GaN : $1,2 Md (2026) → $6 Md (2033), +25,7% TCAC.</strong></p>\n'
        '\n'
        ' <p class="max-w-2xl mx-auto text-slate-500 text-xs leading-relaxed mb-8">'
        '<strong>Catalyseur 2026 :</strong> Le mandat USB-C de l\'UE est entré en vigueur pour les ordinateurs portables en avril 2026. '
        'Des millions de foyers européens remplacent leurs anciens chargeurs USB-A — le moment idéal pour lancer un chargeur hybride 2-en-1. '
        'Les ventes de chargeurs de voyage ont bondi de <strong>+45% en 2025</strong>, les recherches "2-en-1" grimpent de <strong>+60% par an</strong>. '
        'Le segment voyage/courte distance croît de <strong>13-16% par an</strong> — le plus rapide du marché.</p>')
if old1 in content:
    content = content.replace(old1, new1)
    changes += 1
    print("EDIT 1 OK: Hero enhanced")
else:
    print("EDIT 1 FAIL")

# --- EDIT 2: Insert EU USB-C Mandate + 1=2 section after "What Makes 2-in-1 Different" ---
old2 = ('<!-- 2-in-1 vs séparés Charger Comparison -->')
new2 = ('''<!-- EU USB-C Mandate: The Perfect Catalyst -->
 <section class="sec bg-slate-50 relative py-16">
  <div class="max-w-5xl mx-auto px-6">
  <div class="text-center mb-10 reveal">
   <div class="inline-block px-4 py-1 bg-blue-50 border border-blue-200 rounded-full text-[11px] font-bold text-blue-600 uppercase tracking-widest mb-6">Mandat USB-C UE — Avril 2026</div>
   <h2 class="text-3xl lg:text-4xl font-black text-brandBlue uppercase italic tracking-tighter mb-4">Le mandat USB-C de l''UE : <span class="text-brandOrange">le catalyseur parfait</span> pour l''hybride 2-en-1</h2>
   <p class="text-slate-500 text-sm max-w-3xl mx-auto">Depuis avril 2026, tous les ordinateurs portables neufs dans l''UE doivent être équipés d''USB-C. Ce cadre réglementaire déclenche un <strong>super-cycle de remplacement 2026-2028</strong> — 40-50 millions de foyers européens remplacent leurs anciens chargeurs USB-A. Le chargeur hybride 2-en-1 est la réponse ultime : il remplace à la fois le chargeur mural ET la batterie externe en un seul achat.</p>
  </div>

  <div class="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
   <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm text-center">
    <p class="text-3xl font-black text-brandBlue mb-2">40-50M</p>
    <p class="text-sm font-bold text-slate-700 mb-2">Foyers UE en transition</p>
    <p class="text-xs text-slate-500">Remplacent leurs chargeurs USB-A vers USB-C dans le super-cycle 2026-2028</p>
   </div>
   <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm text-center">
    <p class="text-3xl font-black text-brandOrange mb-2">1 = 2</p>
    <p class="text-sm font-bold text-slate-700 mb-2">Deux appareils en un</p>
    <p class="text-xs text-slate-500">Un seul SKU remplace chargeur mural + batterie externe. Moins d''emballage, moins de déchets, marge supérieure</p>
   </div>
   <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm text-center">
    <p class="text-3xl font-black text-brandBlue mb-2">+45%</p>
    <p class="text-sm font-bold text-slate-700 mb-2">Ventes chargeurs voyage</p>
    <p class="text-xs text-slate-500">Hausse des ventes en 2025. Le segment voyage/courte distance croît de 13-16% par an</p>
   </div>
  </div>

  <div class="bg-brandBlue/5 rounded-2xl p-6 border border-brandBlue/10 max-w-3xl mx-auto text-center">
   <p class="text-sm text-slate-700 leading-relaxed mb-0"><strong>Pourquoi l''hybride 2-en-1 gagne :</strong> Dans un cycle de remplacement, les consommateurs cherchent à <strong>consolider</strong> leurs appareils. Un chargeur hybride 2-en-1 élimine le besoin d''acheter un chargeur ET une batterie externe séparément. Pour les marques, c''est un panier moyen supérieur et une proposition de valeur unique qui se démarque sur Amazon et en rayon.</p>
  </div>
  </div>
 </section>

 <!-- 2-in-1 vs séparés Charger Comparison -->''')

if old2 in content:
    content = content.replace(old2, new2)
    changes += 1
    print("EDIT 2 OK: EU mandate section inserted")
else:
    print("EDIT 2 FAIL")

# --- EDIT 3: Insert French retail pricing table before Cross-Category Links ---
old3 = '<!-- Cross-Category Internal Links -->'

new3 = ('''<!-- French Retail Price Comparison -->
 <section class="sec bg-white relative py-12">
  <div class="max-w-5xl mx-auto px-6">
  <div class="text-center mb-8">
   <h2 class="text-2xl lg:text-3xl font-black text-brandBlue uppercase italic tracking-tighter mb-4">Le potentiel retail <span class="text-brandOrange">en France</span> — et votre marge</h2>
   <p class="text-slate-500 text-sm max-w-2xl mx-auto">Un chargeur hybride 2-en-1 OEM WOWOHCOOL à 15-38 $ (MOQ 500) se vend 40-90 € au détail en France — soit <strong>50-65% de marge brute</strong>.</p>
  </div>
  <div class="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
   <table class="w-full text-sm">
   <thead>
   <tr class="bg-brandBlue text-white">
    <th class="p-3 text-left text-xs font-bold uppercase tracking-wider">Marque / Modèle</th>
    <th class="p-3 text-center text-xs font-bold uppercase tracking-wider">Type</th>
    <th class="p-3 text-center text-xs font-bold uppercase tracking-wider">Capacité</th>
    <th class="p-3 text-center text-xs font-bold uppercase tracking-wider">Puissance</th>
    <th class="p-3 text-right text-xs font-bold uppercase tracking-wider">Prix France</th>
   </tr>
   </thead>
   <tbody>
   <tr class="border-t border-slate-100">
    <td class="p-3 font-bold text-slate-700">Anker PowerCore Fusion</td>
    <td class="p-3 text-center"><span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-green-100 text-green-700">Hybride 2-en-1</span></td>
    <td class="p-3 text-center text-slate-600">5 000 mAh</td>
    <td class="p-3 text-center text-slate-600">30W USB-C</td>
    <td class="p-3 text-right font-black text-brandBlue">40-55 €</td>
   </tr>
   <tr class="border-t border-slate-100">
    <td class="p-3 font-bold text-slate-700">Anker 733 PowerCore</td>
    <td class="p-3 text-center"><span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-green-100 text-green-700">Hybride 2-en-1</span></td>
    <td class="p-3 text-center text-slate-600">10 000 mAh</td>
    <td class="p-3 text-center text-slate-600">65W GaN</td>
    <td class="p-3 text-right font-black text-brandBlue">70-90 €</td>
   </tr>
   <tr class="border-t border-slate-100">
    <td class="p-3 font-bold text-slate-700">Baseus Blade 2</td>
    <td class="p-3 text-center"><span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-green-100 text-green-700">Hybride 2-en-1</span></td>
    <td class="p-3 text-center text-slate-600">12 000 mAh</td>
    <td class="p-3 text-center text-slate-600">100W GaN</td>
    <td class="p-3 text-right font-black text-brandBlue">80-100 €</td>
   </tr>
   <tr class="border-t border-slate-100">
    <td class="p-3 font-bold text-slate-700">UGREEN Nexode</td>
    <td class="p-3 text-center"><span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-green-100 text-green-700">Hybride 2-en-1</span></td>
    <td class="p-3 text-center text-slate-600">5 000 mAh</td>
    <td class="p-3 text-center text-slate-600">45W GaN</td>
    <td class="p-3 text-right font-black text-brandBlue">35-50 €</td>
   </tr>
   <tr class="border-t border-slate-100">
    <td class="p-3 font-bold text-slate-700">Zendure Passport</td>
    <td class="p-3 text-center"><span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-green-100 text-green-700">Hybride 2-en-1</span></td>
    <td class="p-3 text-center text-slate-600">10 000 mAh</td>
    <td class="p-3 text-center text-slate-600">65W GaN</td>
    <td class="p-3 text-right font-black text-brandBlue">60-80 €</td>
   </tr>
   </tbody>
   </table>
  </div>
  <p class="text-center text-xs text-slate-400 mt-4">Prix indicatifs relevés sur Amazon.fr — juillet 2026. Le coût OEM WOWOHCOOL (15-38 $/unité, MOQ 500) laisse une marge brute de 50-65%.</p>
  </div>
 </section>

 <!-- Cross-Category Internal Links -->''')

if old3 in content:
    content = content.replace(old3, new3)
    changes += 1
    print("EDIT 3 OK: Retail pricing table inserted")
else:
    print("EDIT 3 FAIL")

if changes > 0:
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"TOTAL: {changes}/3 edits applied successfully")
else:
    print("NO EDITS APPLIED")
