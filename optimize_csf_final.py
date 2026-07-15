import sys

# ============ BUREAU: Add Corporate/WFH section ============
p1 = 'C:/Users/wowoh/wowohcool.com/src/fr/produits/chargeur-sans-fil/bureau/index.njk'
with open(p1, 'r', encoding='utf-8') as f:
    c = f.read()

old1 = '<!-- Personnalisation OEM/ODM pour chargeurs de bureau -->\n<section class="sec bg-slate-50 relative py-16">\n <div class="max-w-7xl mx-auto px-6">\n  <h2 class="text-3xl lg:text-4xl font-black text-brandBlue uppercase italic tracking-tighter mb-4 text-center">Personnalisation OEM/ODM pour <span class="text-brandOrange">chargeurs de bureau</span></h2>'

new1 = ('<!-- Corporate WFH Procurement -->\n'
 '<section class="sec bg-white relative py-16">\n'
 ' <div class="max-w-5xl mx-auto px-6">\n'
 ' <div class="text-center mb-10 reveal">\n'
 '  <div class="inline-block px-4 py-1 bg-green-50 border border-green-200 rounded-full text-[11px] font-bold text-green-600 uppercase tracking-widest mb-6">Teletravail & Entreprise — Canal B2B cache</div>\n'
 '  <h2 class="text-3xl lg:text-4xl font-black text-brandBlue uppercase italic tracking-tighter mb-4">Le teletravail cree une <span class="text-brandOrange">demande structurelle</span> pour les chargeurs de bureau</h2>\n'
 '  <p class="text-slate-500 text-sm max-w-3xl mx-auto">42% des employes europeens travaillent en mode hybride. Les entreprises equipent leurs equipes de chargeurs sans fil — un canal B2B massif et recur rent.</p>\n'
 ' </div>\n'
 ' <div class="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">\n'
 '  <div class="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center">\n'
 '   <p class="text-3xl font-black text-brandBlue mb-2">42%</p>\n'
 '   <p class="text-sm font-bold text-slate-700 mb-2">Teletravailleurs EU</p>\n'
 '   <p class="text-xs text-slate-500">des employes europeens en mode hybride ou full-remote en 2026. Chaque poste de travail a besoin d\'un chargeur sans fil.</p>\n'
 '  </div>\n'
 '  <div class="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center">\n'
 '   <p class="text-3xl font-black text-brandOrange mb-2">8-12%</p>\n'
 '   <p class="text-sm font-bold text-slate-700 mb-2">Des ventes = corporate</p>\n'
 '   <p class="text-xs text-slate-500">Les achats corporate pour equipement teletravail representent deja 8-12% des ventes unitaires de chargeurs sans fil — en forte croissance.</p>\n'
 '  </div>\n'
 '  <div class="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center">\n'
 '   <p class="text-3xl font-black text-brandBlue mb-2">Qi2.2 T3</p>\n'
 '   <p class="text-sm font-bold text-slate-700 mb-2">Pipeline 25W</p>\n'
 '   <p class="text-xs text-slate-500">Tapis ultra-fin Qi2.2 25W + Support 360 rotatif en lancement T3 2026. Pre-inscrivez-vous pour le premier lot de production.</p>\n'
 '  </div>\n'
 ' </div>\n'
 ' <div class="bg-brandBlue/5 rounded-2xl p-6 border border-brandBlue/10 max-w-3xl mx-auto text-center">\n'
 '  <p class="text-sm text-slate-700 leading-relaxed mb-0"><strong>WOWOHCOOL est pret pour le corporate :</strong> designs brevets exclusifs (WOW33, WOW40), certification Qi2, personnalisation logo/emballage, tarifs degressifs pour commandes corporate. MOQ 500 — ideal pour les programmes d\'equipement teletravail et les achats groupes IT.</p>\n'
 ' </div>\n'
 ' </div>\n'
 '</section>\n\n'
 '<!-- Personnalisation OEM/ODM pour chargeurs de bureau -->\n'
 '<section class="sec bg-slate-50 relative py-16">\n'
 ' <div class="max-w-7xl mx-auto px-6">\n'
 '  <h2 class="text-3xl lg:text-4xl font-black text-brandBlue uppercase italic tracking-tighter mb-4 text-center">Personnalisation OEM/ODM pour <span class="text-brandOrange">chargeurs de bureau</span></h2>')

if old1 in c:
    c = c.replace(old1, new1)
    with open(p1, 'w', encoding='utf-8') as f: f.write(c)
    print(f"bureau: OK ({len(c.splitlines())} lines)")
else:
    print("bureau: FAIL - anchor not found")

# ============ STATION-3-EN-1: Add Hotel/Hospitality deep-dive ============
p2 = 'C:/Users/wowoh/wowohcool.com/src/fr/produits/chargeur-sans-fil/station-3-en-1/index.njk'
with open(p2, 'r', encoding='utf-8') as f:
    c2 = f.read()

old2 = '<!-- Personnalisation OEM/ODM -->\n<section class="sec bg-slate-50 relative py-16">\n <div class="max-w-7xl mx-auto px-6">\n  <h2 class="text-3xl lg:text-4xl font-black text-brandBlue uppercase italic tracking-tighter mb-4 text-center">Personnalisation OEM/ODM</h2>'

new2 = ('<!-- Hotellerie & Corporate — Le Canal B2B Massif -->\n'
 '<section class="sec bg-white relative py-16">\n'
 ' <div class="max-w-5xl mx-auto px-6">\n'
 ' <div class="text-center mb-10 reveal">\n'
 '  <div class="inline-block px-4 py-1 bg-amber-50 border border-amber-200 rounded-full text-[11px] font-bold text-amber-600 uppercase tracking-widest mb-6">Hotellerie & Corporate — Le plus gros canal B2B</div>\n'
 '  <h2 class="text-3xl lg:text-4xl font-black text-brandBlue uppercase italic tracking-tighter mb-4">17,5 millions de chambres d\'hotel — <span class="text-brandOrange">un marche captif</span> pour la station 3-en-1</h2>\n'
 '  <p class="text-slate-500 text-sm max-w-3xl mx-auto">Le marche de la technologie hoteliere croit de +10,2% par an. Chaque chambre a besoin d\'un chargeur multi-appareils. Les stations 3-en-1 sont le produit ideal : un seul appareil charge iPhone + Apple Watch + AirPods simultanement.</p>\n'
 ' </div>\n'
 ' <div class="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">\n'
 '  <div class="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center">\n'
 '   <p class="text-3xl font-black text-brandBlue mb-2">17,5M</p>\n'
 '   <p class="text-sm font-bold text-slate-700 mb-2">Chambres d\'hotel</p>\n'
 '   <p class="text-xs text-slate-500">Dans le monde. Marche de la technologie hoteliere : +10,2% par an. Chaque chambre = 1 station 3-en-1.</p>\n'
 '  </div>\n'
 '  <div class="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center">\n'
 '   <p class="text-3xl font-black text-brandOrange mb-2">3 modeles</p>\n'
 '   <p class="text-sm font-bold text-slate-700 mb-2">Concus pour l\'hotellerie</p>\n'
 '   <p class="text-xs text-slate-500">WOW90 (zinc + veilleuse), WOW18 (cube veilleuse), WOW83 (montre detachable + acrylique). Gravure personnalisee.</p>\n'
 '  </div>\n'
 '  <div class="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center">\n'
 '   <p class="text-3xl font-black text-brandBlue mb-2">1000+</p>\n'
 '   <p class="text-sm font-bold text-slate-700 mb-2">Commandes hotelieres</p>\n'
 '   <p class="text-xs text-slate-500">MOQ 1000 unites avec gravure personnalisee. Tarifs degressifs pour grandes series. Emballage hotelier inclus.</p>\n'
 '  </div>\n'
 ' </div>\n'
 ' <div class="bg-brandBlue/5 rounded-2xl p-6 border border-brandBlue/10 max-w-3xl mx-auto text-center">\n'
 '  <p class="text-sm text-slate-700 leading-relaxed mb-0"><strong>Au-dela de l\'hotellerie :</strong> les cadeaux d\'entreprise (Corporate Gifts) representent un second canal B2B massif. Une station 3-en-1 personnalisee au logo de l\'entreprise = panier moyen 3-5x superieur au pad simple. WOWOHCOOL propose le branding complet : logo, couleurs Pantone, packaging corporate, manuels multilingues. MOQ 500.</p>\n'
 ' </div>\n'
 ' </div>\n'
 '</section>\n\n'
 '<!-- Personnalisation OEM/ODM -->\n'
 '<section class="sec bg-slate-50 relative py-16">\n'
 ' <div class="max-w-7xl mx-auto px-6">\n'
 '  <h2 class="text-3xl lg:text-4xl font-black text-brandBlue uppercase italic tracking-tighter mb-4 text-center">Personnalisation OEM/ODM</h2>')

if old2 in c2:
    c2 = c2.replace(old2, new2)
    with open(p2, 'w', encoding='utf-8') as f: f.write(c2)
    print(f"station-3-en-1: OK ({len(c2.splitlines())} lines)")
else:
    print("station-3-en-1: FAIL - anchor not found")
