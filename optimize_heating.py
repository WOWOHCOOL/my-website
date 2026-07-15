path = 'C:/Users/wowoh/wowohcool.com/src/fr/produits/batterie-externe/batterie-chauffante/index.njk'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()
c = 0

# EDIT 1: Hero - add market data
old1 = 'Batteries 7,4V spécialisées pour vestes, gilets, gants, chaussettes et écharpes chauffants. Format compact, certifié CE/PSE, conçu pour les applications de chauffage portable.</p>'
new1 = ('Batteries 7,4V-12,6V spécialisées pour vestes, gilets, gants, chaussettes et écharpes chauffants. Format compact, certifié CE/PSE/UN38.3, conçu pour les applications de chauffage portable. '
        '<strong>Marché mondial du vêtement chauffant : $1,03 Md (2025) → $2,38 Md (2034), +9,72% TCAC.</strong> L\'Europe est le 2ème plus grand marché.</p>\n'
        '\n'
        ' <p class="max-w-2xl mx-auto text-slate-500 text-xs leading-relaxed mb-8">'
        '<strong>Tendances 2026 :</strong> (1) Le graphène remplace la fibre carbone — chauffe plus rapide et plus uniforme. '
        '(2) L\'USB-C devient le standard universel de charge, les chargeurs propriétaires disparaissent. '
        '(3) Compatibilité croissante avec les batteries d\'outillage (Milwaukee M12, DEWALT 20V MAX) — un levier clé pour le marché BTP. '
        'Avec <strong>>60% de la production mondiale en Chine</strong>, WOWOHCOOL est idéalement positionné pour fournir les marques françaises.</p>')
if old1 in content:
    content = content.replace(old1, new1); c += 1
    print("EDIT 1 OK")
else: print("EDIT 1 FAIL")

# EDIT 2: Trends 2026 section before Cross-Category Links
old2 = '<!-- Cross-Category Internal Links -->'
new2 = ('''<!-- 2026 Heated Apparel Trends -->
 <section class="sec bg-white relative py-16">
  <div class="max-w-5xl mx-auto px-6">
  <div class="text-center mb-10 reveal">
   <div class="inline-block px-4 py-1 bg-red-50 border border-red-200 rounded-full text-[11px] font-bold text-red-600 uppercase tracking-widest mb-6">Tendances 2026 — Vêtements Chauffants</div>
   <h2 class="text-3xl lg:text-4xl font-black text-brandBlue uppercase italic tracking-tighter mb-4">Pourquoi 2026 est l''année du <span class="text-brandOrange">vêtement chauffant</span></h2>
   <p class="text-slate-500 text-sm max-w-3xl mx-auto">Le marché passe d''un gadget saisonnier à un équipement fonctionnel établi. Les avancées technologiques créent une vague de renouvellement des gammes — vos clients cherchent des batteries plus performantes.</p>
  </div>

  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
   <div class="bg-slate-50 rounded-2xl p-6 border border-slate-200">
    <div class="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center mb-3"><span class="text-green-600 font-black text-sm">G</span></div>
    <h3 class="font-black text-brandBlue text-sm mb-2">Graphène > Fibre carbone</h3>
    <p class="text-xs text-slate-600 leading-relaxed">Chauffe 2-4× plus rapide (15-60s vs 30-120s), distribution plus uniforme, consommation réduite. Le nouveau standard premium.</p>
   </div>
   <div class="bg-slate-50 rounded-2xl p-6 border border-slate-200">
    <div class="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-3"><span class="text-blue-600 font-black text-sm">C</span></div>
    <h3 class="font-black text-brandBlue text-sm mb-2">USB-C universel</h3>
    <p class="text-xs text-slate-600 leading-relaxed">Les chargeurs propriétaires sont morts. Toutes les batteries 2026 utilisent l''USB-C — logistique simplifiée, déchets réduits.</p>
   </div>
   <div class="bg-slate-50 rounded-2xl p-6 border border-slate-200">
    <div class="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center mb-3"><span class="text-purple-600 font-black text-sm">📱</span></div>
    <h3 class="font-black text-brandBlue text-sm mb-2">Contrôle par App</h3>
    <p class="text-xs text-slate-600 leading-relaxed">Bluetooth + app mobile : température précise, monitoring batterie en temps réel, API météo pour réglage automatique.</p>
   </div>
   <div class="bg-slate-50 rounded-2xl p-6 border border-slate-200">
    <div class="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center mb-3"><span class="text-amber-600 font-black text-sm">🔧</span></div>
    <h3 class="font-black text-brandBlue text-sm mb-2">Compatibilité batteries-outils</h3>
    <p class="text-xs text-slate-600 leading-relaxed">Milwaukee M12, DEWALT 20V MAX, Makita — les batteries d''outillage s''intègrent aux vestes. Levier majeur pour le marché BTP.</p>
   </div>
   <div class="bg-slate-50 rounded-2xl p-6 border border-slate-200">
    <div class="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center mb-3"><span class="text-teal-600 font-black text-sm">♻</span></div>
    <h3 class="font-black text-brandBlue text-sm mb-2">Durabilité & Recyclage</h3>
    <p class="text-xs text-slate-600 leading-relaxed">Tissus recyclés GRS, batteries modulaires amovibles, conformes réglementation européenne. Argument de vente n°1 en France.</p>
   </div>
   <div class="bg-slate-50 rounded-2xl p-6 border border-slate-200">
    <div class="w-10 h-10 bg-brandOrange/10 rounded-xl flex items-center justify-center mb-3"><span class="text-brandOrange font-black text-sm"><200g</span></div>
    <h3 class="font-black text-brandBlue text-sm mb-2">Batteries ultra-légères</h3>
    <p class="text-xs text-slate-600 leading-relaxed">Lithium-silicium : packs <200g pour 10 000mAh. Autonomie jusqu''à 14h en chauffe continue. Confort utilisateur transformé.</p>
   </div>
  </div>

  <div class="bg-brandBlue/5 rounded-2xl p-6 border border-brandBlue/10 max-w-3xl mx-auto text-center">
   <p class="text-sm text-slate-700 leading-relaxed mb-0"><strong>WOWOHCOOL est prêt pour 2026 :</strong> nos 8 modèles de batteries chauffantes couvrent toutes les tensions (5V USB, 7.4V DC, 12.6V DC). Connecteurs personnalisables, certifications CE/PSE/UN38.3 incluses. MOQ 500 — idéal pour les marques outdoor et BTP françaises qui lancent leur ligne chauffante.</p>
  </div>
  </div>
 </section>

 <!-- Cross-Category Internal Links -->''')
if old2 in content:
    content = content.replace(old2, new2); c += 1
    print("EDIT 2 OK")
else: print("EDIT 2 FAIL")

# EDIT 3: Retail pricing table
old3 = '<!-- Inquiry Form -->'
new3 = ('''<!-- French Retail Price Comparison -->
 <section class="sec bg-white relative py-12">
  <div class="max-w-5xl mx-auto px-6">
  <div class="text-center mb-8">
   <h2 class="text-2xl lg:text-3xl font-black text-brandBlue uppercase italic tracking-tighter mb-4">Le marché retail <span class="text-brandOrange">en France</span></h2>
   <p class="text-slate-500 text-sm max-w-2xl mx-auto">Une batterie chauffante OEM WOWOHCOOL à 3-18 $ (MOQ 500) alimente des vestes vendues 80-250 € en France.</p>
  </div>
  <div class="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
   <table class="w-full text-sm">
   <thead>
   <tr class="bg-brandBlue text-white">
    <th class="p-3 text-left text-xs font-bold uppercase tracking-wider">Marque</th>
    <th class="p-3 text-left text-xs font-bold uppercase tracking-wider">Produit</th>
    <th class="p-3 text-center text-xs font-bold uppercase tracking-wider">Batterie</th>
    <th class="p-3 text-center text-xs font-bold uppercase tracking-wider">Autonomie</th>
    <th class="p-3 text-right text-xs font-bold uppercase tracking-wider">Prix France</th>
   </tr>
   </thead>
   <tbody>
   <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">ODLO</td><td class="p-3 text-slate-600">Gilet chauffant (lancé 2025)</td><td class="p-3 text-center text-slate-600">7.4V 5000mAh</td><td class="p-3 text-center text-slate-600">4-8h</td><td class="p-3 text-right font-black text-brandBlue">150-200 €</td></tr>
   <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">Gerbing</td><td class="p-3 text-slate-600">Veste chauffante moto</td><td class="p-3 text-center text-slate-600">12V 6000mAh</td><td class="p-3 text-center text-slate-600">6-10h</td><td class="p-3 text-right font-black text-brandBlue">200-300 €</td></tr>
   <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">Milwaukee</td><td class="p-3 text-slate-600">Veste chauffante M12</td><td class="p-3 text-center text-slate-600">12V (batterie outil)</td><td class="p-3 text-center text-slate-600">6-8h</td><td class="p-3 text-right font-black text-brandBlue">120-180 €</td></tr>
   <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">DEWALT</td><td class="p-3 text-slate-600">Gilet chauffant 20V</td><td class="p-3 text-center text-slate-600">20V (batterie outil)</td><td class="p-3 text-center text-slate-600">4-6h</td><td class="p-3 text-right font-black text-brandBlue">100-150 €</td></tr>
   <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">Therm-IC</td><td class="p-3 text-slate-600">Gants chauffants ski</td><td class="p-3 text-center text-slate-600">7.4V 2000mAh</td><td class="p-3 text-center text-slate-600">3-6h</td><td class="p-3 text-right font-black text-brandBlue">80-150 €</td></tr>
   </tbody>
   </table>
  </div>
  <p class="text-center text-xs text-slate-400 mt-4">Prix indicatifs France — juillet 2026. Le coût OEM WOWOHCOOL (3-18 $) laisse 50-70% de marge pour les marques.</p>
  </div>
 </section>

 <!-- Inquiry Form -->''')
if old3 in content:
    content = content.replace(old3, new3); c += 1
    print("EDIT 3 OK")
else: print("EDIT 3 FAIL")

if c:
    with open(path, 'w', encoding='utf-8') as f: f.write(content)
    print(f"DONE: {c}/3")
else: print("NO EDITS")
