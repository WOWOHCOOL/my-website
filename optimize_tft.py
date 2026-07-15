path = 'C:/Users/wowoh/wowohcool.com/src/fr/produits/batterie-externe/affichage-intelligent/index.njk'
with open(path, 'r', encoding='utf-8') as f: content = f.read()
c = 0

# EDIT 1: Hero
old1 = 'Batteries externes premium avec écran couleur TFT affichant les données de charge en temps réel. Coque en alliage d\'aluminium + verre trempé. Hub 3-en-1 avec recharge sans fil Qi2. Conçu pour la vente au détail premium et les cadeaux d\'entreprise.</p>'
new1 = ('Batteries externes premium avec écran couleur TFT affichant les données de charge en temps réel (watts, volts, ampères, % batterie, temps restant). Coque en alliage d\'aluminium + verre trempé. Hub 3-en-1 avec recharge sans fil Qi2. Conçu pour la vente au détail premium et les cadeaux d\'entreprise. '
        '<strong>Marché TFT power bank : $51M (2024) → $163-189M (2032), +18,1% TCAC.</strong></p>\n'
        '\n'
        ' <p class="max-w-2xl mx-auto text-slate-500 text-xs leading-relaxed mb-8">'
        '<strong>L\'écran TFT n\'est pas un gadget — c\'est un argument de vente :</strong> '
        'les batteries avec écran réduisent les retours clients de <strong>-22%</strong> (les utilisateurs diagnostiquent eux-mêmes les problèmes de câble ou d\'appareil). '
        'Elles se vendent <strong>15-25% plus cher</strong> que les modèles sans écran. '
        'Le logo de démarrage personnalisable transforme chaque utilisation en <strong>rappel de marque</strong>. '
        'La tendance "transparent tech" (Shargeek, CUKTECH, Xiaomi) domine le segment premium en 2026.</p>')
if old1 in content: content = content.replace(old1, new1); c += 1; print("EDIT 1 OK")
else: print("EDIT 1 FAIL")

# EDIT 2: Retail table
old2 = '<!-- Cross-Category Internal Links -->'
new2 = ('''<!-- French Retail Price Comparison -->
 <section class="sec bg-white relative py-12">
  <div class="max-w-5xl mx-auto px-6">
  <div class="text-center mb-8">
   <h2 class="text-2xl lg:text-3xl font-black text-brandBlue uppercase italic tracking-tighter mb-4">Le premium TFT <span class="text-brandOrange">en France</span> — potentiel de marge</h2>
   <p class="text-slate-500 text-sm max-w-2xl mx-auto">Une batterie TFT OEM WOWOHCOOL à 15-42 $ (MOQ 500) se vend 35-130 € au détail en France — <strong>50-65% de marge brute</strong>.</p>
  </div>
  <div class="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
   <table class="w-full text-sm">
   <thead>
   <tr class="bg-brandBlue text-white"><th class="p-3 text-left text-xs font-bold uppercase tracking-wider">Marque</th><th class="p-3 text-center text-xs font-bold uppercase tracking-wider">Capacité</th><th class="p-3 text-center text-xs font-bold uppercase tracking-wider">Puissance</th><th class="p-3 text-center text-xs font-bold uppercase tracking-wider">Écran</th><th class="p-3 text-right text-xs font-bold uppercase tracking-wider">Prix</th></tr></thead><tbody>
   <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">UGREEN Nexode Pro</td><td class="p-3 text-center text-slate-600">25 000 mAh</td><td class="p-3 text-center text-slate-600">200W</td><td class="p-3 text-center"><span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-brandOrange/10 text-brandOrange">TFT intelligent</span></td><td class="p-3 text-right font-black text-brandBlue">~100 €</td></tr>
   <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">CUKTECH 15 Ultra</td><td class="p-3 text-center text-slate-600">20 000 mAh</td><td class="p-3 text-center text-slate-600">210W</td><td class="p-3 text-center"><span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-brandOrange/10 text-brandOrange">TFT couleur 1.3"</span></td><td class="p-3 text-right font-black text-brandBlue">~85 €</td></tr>
   <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">HAMA High Power</td><td class="p-3 text-center text-slate-600">24 000 mAh</td><td class="p-3 text-center text-slate-600">200W</td><td class="p-3 text-center"><span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-brandOrange/10 text-brandOrange">Afficheur</span></td><td class="p-3 text-right font-black text-brandBlue">129 €</td></tr>
   <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">VENTION 27K</td><td class="p-3 text-center text-slate-600">27 000 mAh</td><td class="p-3 text-center text-slate-600">140W</td><td class="p-3 text-center"><span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-green-100 text-green-700">Numérique</span></td><td class="p-3 text-right font-black text-brandBlue">~75 €</td></tr>
   <tr class="border-t border-slate-100"><td class="p-3 font-bold text-slate-700">Belkin 10K Display</td><td class="p-3 text-center text-slate-600">10 000 mAh</td><td class="p-3 text-center text-slate-600">20W</td><td class="p-3 text-center"><span class="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-green-100 text-green-700">Écran intégré</span></td><td class="p-3 text-right font-black text-brandBlue">~35 €</td></tr>
   </tbody></table>
  </div>
  <p class="text-center text-xs text-slate-400 mt-4">Prix indicatifs Amazon.fr/LDLC — juillet 2026. Coût OEM WOWOHCOOL : 15-42 $/unité (MOQ 500). Marge brute retail : 50-65%.</p>
  </div>
 </section>

 <!-- Cross-Category Internal Links -->''')
if old2 in content: content = content.replace(old2, new2); c += 1; print("EDIT 2 OK")
else: print("EDIT 2 FAIL")

if c:
    with open(path, 'w', encoding='utf-8') as f: f.write(content)
    print(f"DONE: {c}/2. Lines: {len(content.splitlines())}")
