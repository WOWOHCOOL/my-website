path = 'C:/Users/wowoh/wowohcool.com/src/fr/produits/chargeur-sans-fil/support-voiture/index.njk'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

changes = 0

# EDIT 1: Hero - add Qi2 market data + EU RED + NEV
old1 = "50% des voitures neuves sont désormais équipées de charge sans fil intégrée — la demande aftermarket augmente à mesure que les conducteurs modernisent leurs véhicules plus anciens. MOQ 500.</p>"
new1 = ("50% des voitures neuves sont désormais équipées de charge sans fil intégrée — la demande aftermarket augmente à mesure que les conducteurs modernisent leurs véhicules plus anciens. "
        "<strong>Marché aftermarket magnétique : $6,5 Md (2025) → $13,1 Md (2032), +9% TCAC. Pénétration Qi2 : 63% → 75% en 2026.</strong> MOQ 500.</p>\n"
        "\n"
        " <p class=\"max-w-2xl mx-auto text-slate-500 text-xs leading-relaxed mb-8\">"
        "<strong>Double catalyseur 2026 :</strong> (1) La directive Européenne RED amendée (Sept 2025) impose la certification EN 62368-1 pour tous les chargeurs sans fil embarqués d'ici "
        "<strong>janvier 2027</strong> — vague de remplacement des chargeurs non-certifiés. "
        "(2) Les véhicules électriques (NEV) représentent <strong>56% de la demande OEM</strong> front-install — la recharge sans fil devient un équipement standard. "
        "Le refroidissement <strong>TEC + ventilateur</strong> est désormais indispensable pour maintenir 25W sans throttling thermique (sans TEC : chute de puissance après 10-15 min). "
        "WOWOHCOOL : 5 modèles, TEC 25W, pince électrique supercondensateur, aimants N52H 1400g — prêts E-Mark.</p>")
if old1 in content:
    content = content.replace(old1, new1)
    changes += 1
    print("EDIT 1 OK: Hero automotive market data")
else:
    print("EDIT 1 FAIL")

# EDIT 2: Market section heading
old2 = 'Marché du Chargeur Sans Fil Automobile <span class="text-brandOrange">1,47 Md$ en 2025</span></h2>'
new2 = 'Marché du Chargeur Sans Fil Automobile <span class="text-brandOrange">$6,5 Md (Aftermarket) + $14,9 Md (OEM) en 2025</span></h2>'
if old2 in content:
    content = content.replace(old2, new2)
    changes += 1
    print("EDIT 2 OK: Market heading updated")
else:
    print("EDIT 2 FAIL")

# EDIT 3: TEC section heading
old3 = 'Refroidissement TEC — <span class="text-brandOrange">Pourquoi C\'est Important</span> pour les Chargeurs Voiture Sans Fil</h2>'
new3 = 'Refroidissement TEC — <span class="text-brandOrange">Indispensable en 2026</span> pour le 25W Automobile</h2>'
if old3 in content:
    content = content.replace(old3, new3)
    changes += 1
    print("EDIT 3 OK: TEC heading enhanced")
else:
    print("EDIT 3 FAIL")

# EDIT 3b: TEC description enhanced
old3b = "Le refroidissement TEC (Thermoelectric Cooling) est la technologie clé qui différencie les chargeurs voiture sans fil premium des modèles économiques.</p>"
new3b = ("Le refroidissement TEC (Thermoelectric Cooling) est la technologie clé qui différencie les chargeurs voiture sans fil premium des modèles économiques. "
         "En 2026, avec le standard <strong>Qi2.2 25W</strong>, le TEC n'est plus optionnel — il est <strong>obligatoire</strong>. "
         "Le protocole thermique Qi2.2 impose un rapport de température actif au-dessus de 39°C et une limitation de puissance au-dessus de 60°C. "
         "Sans TEC + ventilateur, un chargeur 15W+ subit un throttling après seulement 10-15 minutes — rendant la \"charge rapide\" inefficace en conditions réelles. "
         "Avec TEC actif, la température de surface du téléphone reste à <strong>33-34°C après 30 minutes de charge 25W</strong> — aucune perte de puissance.</p>")
if old3b in content:
    content = content.replace(old3b, new3b)
    changes += 1
    print("EDIT 3b OK: TEC description enhanced with Qi2.2 data")
else:
    print("EDIT 3b FAIL")

# EDIT 4: French retail table before Liens Inter-Catégories
old4 = '<!-- Liens Inter-Catégories -->'
new4 = ('<!-- French Retail Price Comparison -->\n'
        '<section class="sec bg-white relative py-12">\n'
        ' <div class="max-w-5xl mx-auto px-6">\n'
        ' <div class="text-center mb-8">\n'
        '  <h2 class="text-2xl lg:text-3xl font-black text-brandBlue uppercase italic tracking-tighter mb-4">Le marché retail <span class="text-brandOrange">en France</span> — potentiel B2B</h2>\n'
        '  <p class="text-slate-500 text-sm max-w-2xl mx-auto">Un support voiture magnétique OEM WOWOHCOOL à 12-30 $ (MOQ 500) se vend 30-80 € en France. Les prix FR sont 20-40% supérieurs aux prix US — marge additionnelle pour les marques.</p>\n'
        ' </div>\n'
        ' <div class="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">\n'
        '  <table class="w-full text-sm"><thead><tr class="bg-brandBlue text-white"><th class="p-3 text-left text-xs font-bold uppercase tracking-wider">Marque</th><th class="p-3 text-center text-xs font-bold uppercase tracking-wider">Type</th><th class="p-3 text-center text-xs font-bold uppercase tracking-wider">Puissance</th><th class="p-3 text-center text-xs font-bold uppercase tracking-wider">Refroidissement</th><th class="p-3 text-right text-xs font-bold uppercase tracking-wider">Prix France</th></tr></thead><tbody>\n'
        '  <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">Anker Prime AirCool</td><td class="p-3 text-center text-slate-600">Grille + dash</td><td class="p-3 text-center"><span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-brandOrange/10 text-brandOrange">Qi2 25W</span></td><td class="p-3 text-center text-slate-600">TEC + ventilateur</td><td class="p-3 text-right font-black text-brandBlue">60-80 €</td></tr>\n'
        '  <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">ESR CryoBoost Qi2</td><td class="p-3 text-center text-slate-600">Grille + dash</td><td class="p-3 text-center"><span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-green-100 text-green-700">Qi2 15W</span></td><td class="p-3 text-center text-slate-600">Ventilateur actif</td><td class="p-3 text-right font-black text-brandBlue">35-55 €</td></tr>\n'
        '  <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">Belkin BoostCharge Pro</td><td class="p-3 text-center text-slate-600">Grille aération</td><td class="p-3 text-center"><span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-green-100 text-green-700">Qi2 15W</span></td><td class="p-3 text-center text-slate-600">Passif</td><td class="p-3 text-right font-black text-brandBlue">45-60 €</td></tr>\n'
        '  <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">LISEN Qi2.2 25W</td><td class="p-3 text-center text-slate-600">Grille + dash</td><td class="p-3 text-center"><span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-brandOrange/10 text-brandOrange">Qi2.2 25W</span></td><td class="p-3 text-center text-slate-600">Refroidissement IA</td><td class="p-3 text-right font-black text-brandBlue">30-45 €</td></tr>\n'
        '  <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">UGREEN MagFlow 25W</td><td class="p-3 text-center text-slate-600">Grille aération</td><td class="p-3 text-center"><span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-brandOrange/10 text-brandOrange">Qi2 25W</span></td><td class="p-3 text-center text-slate-600">Ventilateur</td><td class="p-3 text-right font-black text-brandBlue">35-50 €</td></tr>\n'
        '  </tbody></table>\n'
        ' </div>\n'
        ' <p class="text-center text-xs text-slate-400 mt-4">Prix indicatifs Amazon.fr — juillet 2026. Coût OEM WOWOHCOOL : 12-30 $/unité (MOQ 500). Marge brute retail : 55-70%. Prix FR 20-40% supérieurs aux US.</p>\n'
        ' </div>\n'
        '</section>\n\n'
        '<!-- Liens Inter-Catégories -->')
if old4 in content:
    content = content.replace(old4, new4)
    changes += 1
    print("EDIT 4 OK: French retail table inserted")
else:
    print("EDIT 4 FAIL")

if changes > 0:
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"TOTAL: {changes} edits. Lines: {len(content.splitlines())}")
else:
    print("NO EDITS")
