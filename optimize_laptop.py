import sys
path = 'C:/Users/wowoh/wowohcool.com/src/fr/produits/batterie-externe/batterie-externe-ordinateur-portable/index.njk'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

changes = 0

# EDIT 1: Hero - add EU mandate + market data
old1 = 'Batteries externes PD 3.1 haute puissance qui chargent MacBook Pro, PC gaming et plusieurs appareils simultanément. Sortie 65W à 240W. Conforme avion sous 100Wh (27 000mAh max).</p>'
new1 = ('Batteries externes PD 3.1 haute puissance qui chargent MacBook Pro, PC gaming et plusieurs appareils simultanément. Sortie 65W à 240W. Conforme avion sous 100Wh (27 000mAh max). <strong>Marché mondial : $11,2-18,6 Md (2026) → $29,8 Md (2031), +11,4% TCAC.</strong></p>\n'
        '\n'
        ' <p class="max-w-2xl mx-auto text-slate-500 text-xs leading-relaxed mb-8">'
        '<strong>Double catalyseur 2026 :</strong> (1) Le mandat USB-C de l\'UE pour les ordinateurs portables est entré en vigueur en <strong>avril 2026</strong> — tous les nouveaux PC doivent utiliser USB-C, rendant les chargeurs propriétaires obsolètes. '
        '(2) La norme <strong>PD 3.1 Extended Power Range (EPR)</strong> débloque 140W-240W via USB-C, permettant pour la première fois de charger un PC portable gaming ou une station de travail à pleine vitesse sur batterie externe. '
        'Le <strong>140W est le point idéal B2B</strong> — MacBook Pro 16" à pleine charge + 25 000mAh (92,5Wh) = 100% conforme aviation.</p>')
if old1 in content:
    content = content.replace(old1, new1)
    changes += 1
    print("EDIT 1 OK: Hero enhanced")
else:
    print("EDIT 1 FAIL")

# EDIT 2: Insert enterprise/remote-work section after "Why Laptop" before "OEM/ODM"
old2 = '<!-- OEM/ODM Customization -->'
new2 = ('''<!-- Enterprise & Remote Work Procurement -->
 <section class="sec bg-white relative py-16">
  <div class="max-w-5xl mx-auto px-6">
  <div class="text-center mb-10 reveal">
   <div class="inline-block px-4 py-1 bg-green-50 border border-green-200 rounded-full text-[11px] font-bold text-green-600 uppercase tracking-widest mb-6">Télétravail & Entreprise — Demande structurelle</div>
   <h2 class="text-3xl lg:text-4xl font-black text-brandBlue uppercase italic tracking-tighter mb-4">Le télétravail crée une <span class="text-brandOrange">demande durable</span> pour les batteries PC portable</h2>
   <p class="text-slate-500 text-sm max-w-3xl mx-auto">Le travail hybride n''est plus une tendance temporaire — c''est la nouvelle norme. Les départements IT des entreprises équipent leurs équipes mobiles de batteries externes compatibles PC portable, créant un canal de vente B2B massif et récurrent.</p>
  </div>

  <div class="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
   <div class="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center">
    <p class="text-3xl font-black text-brandBlue mb-2">42%</p>
    <p class="text-sm font-bold text-slate-700 mb-2">Télétravailleurs EU</p>
    <p class="text-xs text-slate-500">des employés européens travaillent en mode hybride ou full-remote en 2026. Chacun a besoin d''une solution de charge mobile fiable.</p>
   </div>
   <div class="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center">
    <p class="text-3xl font-black text-brandOrange mb-2">IT Procurement</p>
    <p class="text-sm font-bold text-slate-700 mb-2">Canaux B2B corporate</p>
    <p class="text-xs text-slate-500">Achats groupés, branding entreprise, packaging corporate. Ticket moyen 3-5x supérieur au retail. Contrats annuels récurrents.</p>
   </div>
   <div class="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center">
    <p class="text-3xl font-black text-brandBlue mb-2">100Wh</p>
    <p class="text-sm font-bold text-slate-700 mb-2">Conforme aviation</p>
    <p class="text-xs text-slate-500">Tous les modèles WOWOHCOOL sous 100Wh sont autorisés en bagage cabine — indispensable pour les voyageurs d''affaires.</p>
   </div>
  </div>

  <div class="bg-brandBlue/5 rounded-2xl p-6 border border-brandBlue/10 max-w-3xl mx-auto text-center">
   <p class="text-sm text-slate-700 leading-relaxed mb-0"><strong>Opportunité B2B :</strong> Les départements IT achètent par lots de 50-500 unités pour équiper leurs équipes. Avec un coût OEM de 22-55 $ et un prix de revente corporate de 80-150 €, la marge est significative. WOWOHCOOL propose le branding d''entreprise, l''emballage corporate et la documentation multilingue — clé en main pour les appels d''offres.</p>
  </div>
  </div>
 </section>

 <!-- OEM/ODM Customization -->''')

if old2 in content:
    content = content.replace(old2, new2)
    changes += 1
    print("EDIT 2 OK: Enterprise section inserted")
else:
    print("EDIT 2 FAIL")

# EDIT 3: French retail pricing table before Cross-Category Links
old3 = '<!-- Cross-Category Internal Links -->'
new3 = ('''<!-- French Retail Price Comparison -->
 <section class="sec bg-white relative py-12">
  <div class="max-w-5xl mx-auto px-6">
  <div class="text-center mb-8">
   <h2 class="text-2xl lg:text-3xl font-black text-brandBlue uppercase italic tracking-tighter mb-4">Le marché retail <span class="text-brandOrange">en France</span> — potentiel de marge B2B</h2>
   <p class="text-slate-500 text-sm max-w-2xl mx-auto">Une batterie externe PC portable OEM WOWOHCOOL à 22-55 $ (MOQ 500) se vend 60-200 € au détail en France — soit <strong>50-70% de marge brute</strong>.</p>
  </div>
  <div class="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
   <table class="w-full text-sm">
   <thead>
   <tr class="bg-brandBlue text-white">
    <th class="p-3 text-left text-xs font-bold uppercase tracking-wider">Marque / Modèle</th>
    <th class="p-3 text-center text-xs font-bold uppercase tracking-wider">Capacité</th>
    <th class="p-3 text-center text-xs font-bold uppercase tracking-wider">Puissance</th>
    <th class="p-3 text-center text-xs font-bold uppercase tracking-wider">Protocole</th>
    <th class="p-3 text-right text-xs font-bold uppercase tracking-wider">Prix France</th>
   </tr>
   </thead>
   <tbody>
   <tr class="border-t border-slate-100">
    <td class="p-3 font-bold text-slate-700">Anker Prime 250W</td>
    <td class="p-3 text-center text-slate-600">27 650 mAh</td>
    <td class="p-3 text-center text-slate-600">250W (2x140W)</td>
    <td class="p-3 text-center"><span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-brandOrange/10 text-brandOrange">PD 3.1</span></td>
    <td class="p-3 text-right font-black text-brandBlue">150-200 €</td>
   </tr>
   <tr class="border-t border-slate-100">
    <td class="p-3 font-bold text-slate-700">Baseus Blade 2</td>
    <td class="p-3 text-center text-slate-600">20 000 mAh</td>
    <td class="p-3 text-center text-slate-600">100W</td>
    <td class="p-3 text-center"><span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-brandOrange/10 text-brandOrange">PD 3.1</span></td>
    <td class="p-3 text-right font-black text-brandBlue">70-100 €</td>
   </tr>
   <tr class="border-t border-slate-100">
    <td class="p-3 font-bold text-slate-700">UGREEN Nexode 145W</td>
    <td class="p-3 text-center text-slate-600">25 000 mAh</td>
    <td class="p-3 text-center text-slate-600">145W</td>
    <td class="p-3 text-center"><span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-brandOrange/10 text-brandOrange">PD 3.1</span></td>
    <td class="p-3 text-right font-black text-brandBlue">80-120 €</td>
   </tr>
   <tr class="border-t border-slate-100">
    <td class="p-3 font-bold text-slate-700">Zendure SuperTank</td>
    <td class="p-3 text-center text-slate-600">27 000 mAh</td>
    <td class="p-3 text-center text-slate-600">100W</td>
    <td class="p-3 text-center"><span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-green-100 text-green-700">PD 3.0</span></td>
    <td class="p-3 text-right font-black text-brandBlue">60-90 €</td>
   </tr>
   <tr class="border-t border-slate-100">
    <td class="p-3 font-bold text-slate-700">RAVPower 140W</td>
    <td class="p-3 text-center text-slate-600">27 000 mAh</td>
    <td class="p-3 text-center text-slate-600">140W</td>
    <td class="p-3 text-center"><span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-brandOrange/10 text-brandOrange">PD 3.1</span></td>
    <td class="p-3 text-right font-black text-brandBlue">90-130 €</td>
   </tr>
   </tbody>
   </table>
  </div>
  <p class="text-center text-xs text-slate-400 mt-4">Prix indicatifs Amazon.fr — juillet 2026. Coût OEM WOWOHCOOL : 22-55 $/unité (MOQ 500). Marge brute retail : 50-70%.</p>
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
    print(f"TOTAL: {changes}/3 edits applied")
else:
    print("NO EDITS")
