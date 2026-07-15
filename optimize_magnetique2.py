import sys
path = 'C:/Users/wowoh/wowohcool.com/src/fr/produits/batterie-externe/magnetique-sans-fil/index.njk'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

changes = 0

# --- EDIT 2: Use simpler, more robust anchors ---
# Find the end of "Why Wireless/Magnetic" section and start of OEM section
old2 = ('Moteur d\'Achats Répétés</h3><p class="text-sm text-slate-600 leading-relaxed">Les clients achètent souvent 2-3 unités (une par sac, bureau, voiture). Meilleure valeur client à vie que les catégories à achat unique.</p></div>\n </div>\n </div>\n</section>\n <!-- OEM/ODM Customization -->')

new2 = ('Moteur d\'Achats Répétés</h3><p class="text-sm text-slate-600 leading-relaxed">Les clients achètent souvent 2-3 unités (une par sac, bureau, voiture). Meilleure valeur client à vie que les catégories à achat unique.</p></div>\n </div>\n </div>\n</section>\n\n <!-- Why the Magnetic Market is Exploding in 2026 -->\n <section class="sec bg-slate-50 relative py-16">\n  <div class="max-w-5xl mx-auto px-6">\n  <div class="text-center mb-10 reveal">\n   <div class="inline-block px-4 py-1 bg-brandOrange/10 border border-brandOrange/20 rounded-full text-[11px] font-bold text-brandOrange uppercase tracking-widest mb-6">Opportunité 2026 — Marché en pleine explosion</div>\n   <h2 class="text-3xl lg:text-4xl font-black text-brandBlue uppercase italic tracking-tighter mb-4">Pourquoi le marché du <span class="text-brandOrange">magnétique explose</span> en 2026</h2>\n   <p class="text-slate-500 text-sm max-w-3xl mx-auto">Trois forces convergentes créent une opportunité unique pour les marques françaises — le moment d\'entrer sur le marché est maintenant.</p>\n  </div>\n\n  <div class="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">\n   <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">\n    <div class="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4">\n     <svg class="text-red-500 text-xl" aria-hidden="true" focusable="false" viewBox="0 0 576 512"><path d="M290.7 311L95 269.7 86.8 309l195.7 41 130.1-81.3-27.3-42.3L290.7 311zm91.1-134.5L310.3 103 195.4 171.5l41 28.6 131.4-23.6zm-69.3 211.3l152.4-99.9-28.6-41.2-152.7 76.2 1.3 31.8 27.6 33.1zM0 96l0 256c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96z" fill="currentColor"/></svg>\n    </div>\n    <h3 class="font-black text-brandBlue text-sm mb-2">Apple abandonne MagSafe</h3>\n    <p class="text-xs text-slate-600 leading-relaxed">Apple a arrêté sa batterie MagSafe universelle (2023) et son modèle 2025 est incompatible avec les autres iPhones. Des <strong>centaines de millions d\'utilisateurs</strong> cherchent des alternatives tierces — le marché est grand ouvert.</p>\n   </div>\n   <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">\n    <div class="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4">\n     <svg class="text-green-500 text-xl" aria-hidden="true" focusable="false" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" fill="currentColor"/></svg>\n    </div>\n    <h3 class="font-black text-brandBlue text-sm mb-2">Android adopte Qi2</h3>\n    <p class="text-xs text-slate-600 leading-relaxed">Google Pixel 10 (2026) et Samsung Galaxy S25 sont les premiers flagships Android avec support Qi2 natif. Le marché adressable <strong>double</strong> — vos batteries couvrent iPhone ET Android premium.</p>\n   </div>\n   <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">\n    <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">\n     <svg class="text-blue-500 text-xl" aria-hidden="true" focusable="false" viewBox="0 0 448 512"><path d="M338.8-9.9c11.9 8.6 16.3 24.2 10.9 37.8L271.3 224 416 224c13.5 0 25.5 8.4 30.1 21.1s.7 26.9-9.6 35.5l-288 240c-11.3 9.4-27.4 9.9-39.3 1.3s-16.3-24.2-10.9-37.8L176.7 288 32 288c-13.5 0-25.5-8.4-30.1-21.1s-.7-26.9 9.6-35.5l288-240c11.3-9.4 27.4-9.9 39.3-1.3z" fill="currentColor"/></svg>\n    </div>\n    <h3 class="font-black text-brandBlue text-sm mb-2">Qi2.2 25W renouvelle les gammes</h3>\n    <p class="text-xs text-slate-600 leading-relaxed">La transition 15W → 25W (Qi2.2, juillet 2025) force le renouvellement des catalogues retail. Les early adopters captent les référencements avant la vague de 2027. <strong>+67% de vitesse</strong> pour un surcoût BOM minimal.</p>\n   </div>\n  </div>\n\n  <div class="bg-brandBlue/5 rounded-2xl p-6 border border-brandBlue/10 max-w-3xl mx-auto">\n   <p class="text-sm text-slate-700 leading-relaxed mb-0"><strong>En France, les prix retail confirment le potentiel :</strong> Anker MagGo Qi2 10K = 58 € (3 965 avis Amazon), Sharge ICEMAG 3 Qi2.2 25W = 80 €, INIU Ultra-Fine 45W = 35-45 €. Les marges B2B sur une batterie magnétique OEM à 12-22 $ (MOQ 500) laissent 50-70% de marge brute au retail — parmi les meilleures de l\'électronique grand public.</p>\n  </div>\n  </div>\n </section>\n\n <!-- OEM/ODM Customization -->')

if old2 in content:
    content = content.replace(old2, new2)
    changes += 1
    print("EDIT 2 OK: Market explosion section inserted")
else:
    print("EDIT 2 FAIL")
    # Find any unique text near the anchor
    idx = content.find("Moteur d'Achats")
    if idx > 0:
        snippet = content[idx+80:idx+180]
        print(f"  After 'Moteur d'Achats': {repr(snippet[:120])}")

# --- EDIT 3: Match actual whitespace pattern ---
old3 = ('cross-platform.</p>\n'
        '\n'
        ' <div class="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">')

new3 = ('cross-platform.</p>\n'
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
        ' <div class="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">')

if old3 in content:
    content = content.replace(old3, new3)
    changes += 1
    print("EDIT 3 OK: Qi2.2 transition callout inserted")
else:
    print("EDIT 3 FAIL - trying alternative approach")
    # Alternative: just find and replace a unique nearby anchor
    alt_old = 'vient de devenir cross-platform.</p>'
    alt_new = ('vient de devenir cross-platform.</p>\n'
               '\n'
               '  <div class="bg-brandOrange/5 border border-brandOrange/20 rounded-2xl p-6 max-w-3xl mx-auto mb-10 text-center">\n'
               '   <p class="text-sm text-slate-700 leading-relaxed mb-0">'
               '<strong>Transition Qi2 → Qi2.2 (25W) :</strong> '
               'Le standard Qi2.2 finalisé en juillet 2025 est la nouvelle référence. '
               'WOWOHCOOL propose déjà le modèle <strong>WOPQ11 Qi2.2 25W + PD 40W</strong> '
               '— 67% plus rapide que le Qi2 15W standard. '
               'Les acheteurs OEM qui intègrent le Qi2.2 maintenant évitent '
               'l\'obsolescence de gamme dans 12-18 mois.</p>\n'
               '  </div>')
    if alt_old in content:
        content = content.replace(alt_old, alt_new)
        changes += 1
        print("EDIT 3 OK (alt method): Qi2.2 transition callout inserted")
    else:
        print("EDIT 3 FAIL (alt method also failed)")

if changes > 0:
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"TOTAL: {changes}/2 edits applied (edits 1 and 4 were already applied)")
else:
    print("NO NEW EDITS APPLIED")
