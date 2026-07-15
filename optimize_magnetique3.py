import sys
path = 'C:/Users/wowoh/wowohcool.com/src/fr/produits/batterie-externe/magnetique-sans-fil/index.njk'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

changes = 0

# EDIT 2: Insert market explosion section before OEM section
# Use the exact closing tag of the "Why" section as anchor
old2 = "<!-- OEM/ODM Customization -->"

new2 = """<!-- Why the Magnetic Market is Exploding in 2026 -->
 <section class="sec bg-slate-50 relative py-16">
  <div class="max-w-5xl mx-auto px-6">
  <div class="text-center mb-10 reveal">
   <div class="inline-block px-4 py-1 bg-brandOrange/10 border border-brandOrange/20 rounded-full text-[11px] font-bold text-brandOrange uppercase tracking-widest mb-6">Opportunite 2026 — Marche en pleine explosion</div>
   <h2 class="text-3xl lg:text-4xl font-black text-brandBlue uppercase italic tracking-tighter mb-4">Pourquoi le marche du <span class="text-brandOrange">magnetique explose</span> en 2026</h2>
   <p class="text-slate-500 text-sm max-w-3xl mx-auto">Trois forces convergentes creent une opportunite unique pour les marques francaises — le moment d'entrer sur le marche est maintenant.</p>
  </div>

  <div class="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
   <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
    <div class="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4">
     <svg class="text-red-500 text-xl" aria-hidden="true" focusable="false" viewBox="0 0 576 512"><path d="M290.7 311L95 269.7 86.8 309l195.7 41 130.1-81.3-27.3-42.3L290.7 311zm91.1-134.5L310.3 103 195.4 171.5l41 28.6 131.4-23.6zm-69.3 211.3l152.4-99.9-28.6-41.2-152.7 76.2 1.3 31.8 27.6 33.1zM0 96l0 256c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96z" fill="currentColor"/></svg>
    </div>
    <h3 class="font-black text-brandBlue text-sm mb-2">Apple abandonne MagSafe</h3>
    <p class="text-xs text-slate-600 leading-relaxed">Apple a arrete sa batterie MagSafe universelle (2023) et son modele 2025 est incompatible avec les autres iPhones. Des <strong>centaines de millions d'utilisateurs</strong> cherchent des alternatives tierces — le marche est grand ouvert.</p>
   </div>
   <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
    <div class="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4">
     <svg class="text-green-500 text-xl" aria-hidden="true" focusable="false" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" fill="currentColor"/></svg>
    </div>
    <h3 class="font-black text-brandBlue text-sm mb-2">Android adopte Qi2</h3>
    <p class="text-xs text-slate-600 leading-relaxed">Google Pixel 10 (2026) et Samsung Galaxy S25 sont les premiers flagships Android avec support Qi2 natif. Le marche adressable <strong>double</strong> — vos batteries couvrent iPhone ET Android premium.</p>
   </div>
   <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
    <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
     <svg class="text-blue-500 text-xl" aria-hidden="true" focusable="false" viewBox="0 0 448 512"><path d="M338.8-9.9c11.9 8.6 16.3 24.2 10.9 37.8L271.3 224 416 224c13.5 0 25.5 8.4 30.1 21.1s.7 26.9-9.6 35.5l-288 240c-11.3 9.4-27.4 9.9-39.3 1.3s-16.3-24.2-10.9-37.8L176.7 288 32 288c-13.5 0-25.5-8.4-30.1-21.1s-.7-26.9 9.6-35.5l288-240c11.3-9.4 27.4-9.9 39.3-1.3z" fill="currentColor"/></svg>
    </div>
    <h3 class="font-black text-brandBlue text-sm mb-2">Qi2.2 25W renouvelle les gammes</h3>
    <p class="text-xs text-slate-600 leading-relaxed">La transition 15W → 25W (Qi2.2, juillet 2025) force le renouvellement des catalogues retail. Les early adopters captent les referencements avant la vague de 2027. <strong>+67% de vitesse</strong> pour un surcout BOM minimal.</p>
   </div>
  </div>

  <div class="bg-brandBlue/5 rounded-2xl p-6 border border-brandBlue/10 max-w-3xl mx-auto">
   <p class="text-sm text-slate-700 leading-relaxed mb-0"><strong>En France, les prix retail confirment le potentiel :</strong> Anker MagGo Qi2 10K = 58 € (3 965 avis Amazon), Sharge ICEMAG 3 Qi2.2 25W = 80 €, INIU Ultra-Fine 45W = 35-45 €. Les marges B2B sur une batterie magnetique OEM a 12-22 $ (MOQ 500) laissent 50-70% de marge brute au retail — parmi les meilleures de l'electronique grand public.</p>
  </div>
  </div>
 </section>

 <!-- OEM/ODM Customization -->"""

if old2 in content:
    content = content.replace(old2, new2)
    changes += 1
    print("EDIT 2 OK: Market explosion section inserted")
else:
    print(f"EDIT 2 FAIL: anchor '{old2}' not found in file")
    # Check if similar text exists
    if 'OEM/ODM Customization' in content:
        print("  Found 'OEM/ODM Customization' in file")
        idx = content.find('OEM/ODM Customization')
        print(f"  Context: {repr(content[idx-20:idx+30])}")

if changes > 0:
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"SUCCESS: {changes}/1 edit applied")
else:
    print("FAILED")
