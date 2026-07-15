import sys
path = 'C:/Users/wowoh/wowohcool.com/src/fr/produits/batterie-externe/magnetique-sans-fil/index.njk'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

changes = 0

# --- EDIT 1: Hero paragraph - add market catalysts & retail data ---
old1 = 'Batteries externes magnétiques sans fil 15W certifiées Qi2. Alignement compatible MagSafe pour iPhone 12-16. Profil fin, fixation aimantée. MOQ 500 avec marquage personnalisé.</p>'
new1 = ('Batteries externes magnétiques sans fil 15-25W certifiées Qi2/Qi2.2. '
        'Alignement compatible MagSafe pour iPhone 12-16 + Android Qi2 (Pixel 10, Galaxy S25). '
        'Profil fin, fixation aimantée. '
        '<strong>Marché Qi2 : $6,8 Md (2025) → $12,3 Md (2034), 40-50% des ventes d\'ici 2030.</strong> '
        'MOQ 500 avec marquage personnalisé.</p>\n\n'
        ' <p class="max-w-2xl mx-auto text-slate-500 text-xs leading-relaxed mb-8">'
        'Triple catalyseur marché 2026 : '
        '<strong>(1)</strong> Apple a abandonné sa batterie MagSafe universelle — '
        'des centaines de millions d\'utilisateurs cherchent des alternatives. '
        '<strong>(2)</strong> Android arrive sur Qi2 (Pixel 10, Galaxy S25) — '
        'le marché adressable double. '
        '<strong>(3)</strong> La transition Qi2 → Qi2.2 (25W, +67% vitesse) '
        'force le renouvellement des gammes. Les marques françaises qui sécurisent '
        'leur chaîne d\'approvisionnement Qi2.2 maintenant prennent une longueur d\'avance.</p>')
if old1 in content:
    content = content.replace(old1, new1)
    changes += 1
    print("EDIT 1 OK: Hero paragraph enhanced")
else:
    print("EDIT 1 FAIL: Anchor not found")
    # Debug: find what's actually there
    idx = content.find('magnétiques sans fil 15W')
    if idx > 0:
        snippet = content[idx:idx+200]
        print(f"  Found at {idx}: {repr(snippet[:100])}...")

# --- EDIT 2: Insert market explosion section ---
old2 = ('</section>\n'
        ' <!-- OEM/ODM Customization -->\n'
        ' <section class="sec bg-slate-50 relative py-16">\n'
        '  <div class="max-w-7xl mx-auto px-6">\n'
        '  <h2 class="text-3xl lg:text-4xl font-black text-brandBlue uppercase italic tracking-tighter mb-4 text-center">Personnalisation OEM/ODM</h2>')

new2 = ('''</section>

 <!-- Why the Magnetic Market is Exploding in 2026 -->
 <section class="sec bg-slate-50 relative py-16">
  <div class="max-w-5xl mx-auto px-6">
  <div class="text-center mb-10 reveal">
   <div class="inline-block px-4 py-1 bg-brandOrange/10 border border-brandOrange/20 rounded-full text-[11px] font-bold text-brandOrange uppercase tracking-widest mb-6">Opportunité 2026 — Marché en pleine explosion</div>
   <h2 class="text-3xl lg:text-4xl font-black text-brandBlue uppercase italic tracking-tighter mb-4">Pourquoi le marché du <span class="text-brandOrange">magnétique explose</span> en 2026</h2>
   <p class="text-slate-500 text-sm max-w-3xl mx-auto">Trois forces convergentes créent une opportunité unique pour les marques françaises — le moment d\'entrer sur le marché est maintenant.</p>
  </div>

  <div class="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
   <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
    <div class="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4">
     <svg class="text-red-500 text-xl" aria-hidden="true" focusable="false" viewBox="0 0 576 512"><path d="M290.7 311L95 269.7 86.8 309l195.7 41 130.1-81.3-27.3-42.3L290.7 311zm91.1-134.5L310.3 103 195.4 171.5l41 28.6 131.4-23.6zm-69.3 211.3l152.4-99.9-28.6-41.2-152.7 76.2 1.3 31.8 27.6 33.1zM0 96l0 256c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96z" fill="currentColor"/></svg>
    </div>
    <h3 class="font-black text-brandBlue text-sm mb-2">Apple abandonne MagSafe</h3>
    <p class="text-xs text-slate-600 leading-relaxed">Apple a arrêté sa batterie MagSafe universelle (2023) et son modèle 2025 est incompatible avec les autres iPhones. Des <strong>centaines de millions d\'utilisateurs</strong> cherchent des alternatives tierces — le marché est grand ouvert.</p>
   </div>
   <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
    <div class="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4">
     <svg class="text-green-500 text-xl" aria-hidden="true" focusable="false" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" fill="currentColor"/></svg>
    </div>
    <h3 class="font-black text-brandBlue text-sm mb-2">Android adopte Qi2</h3>
    <p class="text-xs text-slate-600 leading-relaxed">Google Pixel 10 (2026) et Samsung Galaxy S25 sont les premiers flagships Android avec support Qi2 natif. Le marché adressable <strong>double</strong> — vos batteries couvrent iPhone ET Android premium.</p>
   </div>
   <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
    <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
     <svg class="text-blue-500 text-xl" aria-hidden="true" focusable="false" viewBox="0 0 448 512"><path d="M338.8-9.9c11.9 8.6 16.3 24.2 10.9 37.8L271.3 224 416 224c13.5 0 25.5 8.4 30.1 21.1s.7 26.9-9.6 35.5l-288 240c-11.3 9.4-27.4 9.9-39.3 1.3s-16.3-24.2-10.9-37.8L176.7 288 32 288c-13.5 0-25.5-8.4-30.1-21.1s-.7-26.9 9.6-35.5l288-240c11.3-9.4 27.4-9.9 39.3-1.3z" fill="currentColor"/></svg>
    </div>
    <h3 class="font-black text-brandBlue text-sm mb-2">Qi2.2 25W renouvelle les gammes</h3>
    <p class="text-xs text-slate-600 leading-relaxed">La transition 15W → 25W (Qi2.2, juillet 2025) force le renouvellement des catalogues retail. Les early adopters captent les référencements avant la vague de 2027. <strong>+67% de vitesse</strong> pour un surcoût BOM minimal.</p>
   </div>
  </div>

  <div class="bg-brandBlue/5 rounded-2xl p-6 border border-brandBlue/10 max-w-3xl mx-auto">
   <p class="text-sm text-slate-700 leading-relaxed mb-0"><strong>En France, les prix retail confirment le potentiel :</strong> Anker MagGo Qi2 10K = 58 € (3 965 avis Amazon), Sharge ICEMAG 3 Qi2.2 25W = 80 €, INIU Ultra-Fine 45W = 35-45 €. Les marges B2B sur une batterie magnétique OEM à 12-22 $ (MOQ 500) laissent 50-70% de marge brute au retail — parmi les meilleures de l\'électronique grand public.</p>
  </div>
  </div>
 </section>

 <!-- OEM/ODM Customization -->
 <section class="sec bg-slate-50 relative py-16">
  <div class="max-w-7xl mx-auto px-6">
  <h2 class="text-3xl lg:text-4xl font-black text-brandBlue uppercase italic tracking-tighter mb-4 text-center">Personnalisation OEM/ODM</h2>''')

if old2 in content:
    content = content.replace(old2, new2)
    changes += 1
    print("EDIT 2 OK: Market explosion section inserted")
else:
    print("EDIT 2 FAIL")
    idx = content.find('Personnalisation OEM/ODM')
    if idx > 0:
        print(f"  Found at {idx}: ...{repr(content[idx-60:idx+60])}...")

# --- EDIT 3: Insert Qi2.2 transition callout after Android section ---
old3 = ('votre inventaire de batteries externes Qi2 vient de devenir cross-platform.</p>\n'
        '\n'
        '\t <div class="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">')

new3 = ('votre inventaire de batteries externes Qi2 vient de devenir cross-platform.</p>\n'
        '\n'
        '  <div class="bg-brandOrange/5 border border-brandOrange/20 rounded-2xl p-6 max-w-3xl mx-auto mb-10 text-center">\n'
        '   <p class="text-sm text-slate-700 leading-relaxed mb-0">'
        '<strong>Transition Qi2 → Qi2.2 (25W) :</strong> '
        'Le standard Qi2.2 finalisé en juillet 2025 est la nouvelle référence. '
        'WOWOHCOOL propose déjà le modèle <strong>WOPQ11 Qi2.2 25W + PD 40W</strong> '
        '— 67% plus rapide que le Qi2 15W standard. '
        'Les acheteurs OEM qui intègrent le Qi2.2 maintenant évitent '
        'l\'obsolescence de gamme dans 12-18 mois.</p>\n'
        '  </div>\n'
        '\n'
        '\t <div class="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">')

if old3 in content:
    content = content.replace(old3, new3)
    changes += 1
    print("EDIT 3 OK: Qi2.2 transition callout inserted")
else:
    print("EDIT 3 FAIL")
    idx = content.find('cross-platform.</p>')
    if idx > 0:
        print(f"  Found at {idx}: ...{repr(content[idx-50:idx+100])}...")

# --- EDIT 4: Insert French retail pricing comparison table ---
old4 = '<!-- Cross-Category Internal Links -->'

new4 = ('''<!-- French Retail Price Comparison -->
 <section class="sec bg-white relative py-12">
  <div class="max-w-5xl mx-auto px-6">
  <div class="text-center mb-8">
   <h2 class="text-2xl lg:text-3xl font-black text-brandBlue uppercase italic tracking-tighter mb-4">Vos concurrents sur <span class="text-brandOrange">Amazon.fr</span> — et votre marge</h2>
   <p class="text-slate-500 text-sm max-w-2xl mx-auto">Les prix retail en France montrent le potentiel de marge B2B. Une batterie magnétique OEM WOWOHCOOL à 12-22 $ (MOQ 500) se vend 35-80 € au détail — soit <strong>50-70% de marge brute</strong>.</p>
  </div>
  <div class="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
   <table class="w-full text-sm">
   <thead>
   <tr class="bg-brandBlue text-white">
    <th class="p-3 text-left text-xs font-bold uppercase tracking-wider">Marque</th>
    <th class="p-3 text-left text-xs font-bold uppercase tracking-wider">Modèle</th>
    <th class="p-3 text-center text-xs font-bold uppercase tracking-wider">Capacité</th>
    <th class="p-3 text-center text-xs font-bold uppercase tracking-wider">Sans fil</th>
    <th class="p-3 text-center text-xs font-bold uppercase tracking-wider">Filaire</th>
    <th class="p-3 text-right text-xs font-bold uppercase tracking-wider">Prix France</th>
   </tr>
   </thead>
   <tbody>
   <tr class="border-t border-slate-100">
    <td class="p-3 font-bold text-slate-700">Anker MagGo Qi2</td>
    <td class="p-3 text-slate-600">10K Slim (A1654)</td>
    <td class="p-3 text-center text-slate-600">10 000 mAh</td>
    <td class="p-3 text-center"><span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-green-100 text-green-700">Qi2 15W</span></td>
    <td class="p-3 text-center text-slate-600">30W USB-C</td>
    <td class="p-3 text-right font-black text-brandBlue">58 €</td>
   </tr>
   <tr class="border-t border-slate-100">
    <td class="p-3 font-bold text-slate-700">Sharge ICEMAG 3</td>
    <td class="p-3 text-slate-600">10K RGB (Qi2.2)</td>
    <td class="p-3 text-center text-slate-600">10 000 mAh</td>
    <td class="p-3 text-center"><span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-brandOrange/10 text-brandOrange">Qi2.2 25W</span></td>
    <td class="p-3 text-center text-slate-600">35W USB-C</td>
    <td class="p-3 text-right font-black text-brandBlue">80 €</td>
   </tr>
   <tr class="border-t border-slate-100">
    <td class="p-3 font-bold text-slate-700">Belkin BoostCharge</td>
    <td class="p-3 text-slate-600">8K + Béquille</td>
    <td class="p-3 text-center text-slate-600">8 000 mAh</td>
    <td class="p-3 text-center"><span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-green-100 text-green-700">Qi2 15W</span></td>
    <td class="p-3 text-center text-slate-600">20W USB-C</td>
    <td class="p-3 text-right font-black text-brandBlue">60 €</td>
   </tr>
   <tr class="border-t border-slate-100">
    <td class="p-3 font-bold text-slate-700">INIU Ultra-Fine</td>
    <td class="p-3 text-slate-600">10K + Support</td>
    <td class="p-3 text-center text-slate-600">10 000 mAh</td>
    <td class="p-3 text-center"><span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-green-100 text-green-700">Qi2 15W</span></td>
    <td class="p-3 text-center text-slate-600">45W USB-C</td>
    <td class="p-3 text-right font-black text-brandBlue">35-45 €</td>
   </tr>
   <tr class="border-t border-slate-100">
    <td class="p-3 font-bold text-slate-700">Mophie Powerstation</td>
    <td class="p-3 text-slate-600">10K + Support</td>
    <td class="p-3 text-center text-slate-600">10 000 mAh</td>
    <td class="p-3 text-center"><span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-green-100 text-green-700">Qi2 15W</span></td>
    <td class="p-3 text-center text-slate-600">20W USB-C</td>
    <td class="p-3 text-right font-black text-brandBlue">90 €</td>
   </tr>
   </tbody>
   </table>
  </div>
  <p class="text-center text-xs text-slate-400 mt-4">Prix indicatifs relevés sur Amazon.fr, LDLC, Rue du Commerce — juillet 2026. Le coût OEM WOWOHCOOL (12-22 $/unité, MOQ 500) laisse une marge brute retail de 50-70%.</p>
  </div>
 </section>

 <!-- Cross-Category Internal Links -->''')

if old4 in content:
    content = content.replace(old4, new4)
    changes += 1
    print("EDIT 4 OK: French retail pricing table inserted")
else:
    print("EDIT 4 FAIL")

if changes > 0:
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"TOTAL: {changes}/4 edits applied successfully")
else:
    print("NO EDITS APPLIED — check anchor texts")
