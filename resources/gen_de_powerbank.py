"""Generate the complete DE powerbank page for wowohcool.com"""
import os

OUTPUT = r"C:\Users\wowoh\wowohcool.com\src\de\produkte\powerbank\index.njk"

# SVG constants
ICON_STAR = '<svg class="icon-star text-brandOrange text-sm" aria-hidden="true" focusable="false" viewBox="0 0 576 512"><path d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z" fill="currentColor"/></svg>'
ICON_CHECK_SVG = '<svg class="icon-check text-brandOrange" aria-hidden="true" focusable="false" viewBox="0 0 448 512"><path d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z" fill="currentColor"/></svg>'

FIVE_STARS = "\n     ".join([ICON_STAR] * 5)


def spec_row(label, value, last=False):
    cls = "" if last else ' class="border-b border-slate-200"'
    return f'       <tr{cls}>\n        <td class="py-2 text-slate-500">{label}</td>\n        <td class="py-2 font-bold text-slate-700">{value}</td>\n       </tr>'


def product_card(model, title, img, capacity, output_w, cable, eff, desc, badge1, badge2, specs):
    rows = "\n".join(spec_row(s[0], s[1], i == len(specs)-1) for i, s in enumerate(specs))
    return f"""     <div class="group reveal">
      <div class="relative aspect-square rounded-3xl bg-slate-100 overflow-hidden mb-6">
       <img src="/image/product/power-bank/{img}" alt="{model} {title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" decoding="async" width="1920" height="1920">
       <div class="absolute top-4 left-4 flex flex-col gap-2">
        <span class="bg-brandOrange text-white text-[11px] font-black px-3 py-1 rounded-full uppercase italic tracking-widest">{badge1}</span>
        <span class="bg-slate-900 text-white text-[11px] font-black px-3 py-1 rounded-full uppercase italic tracking-widest text-center">{badge2}</span>
       </div>
      </div>
      <h3 class="text-xl font-black text-slate-900 uppercase italic mb-3">{model} {title}</h3>
      <div class="grid grid-cols-2 gap-y-3 gap-x-2 mb-6 border-t border-slate-100 pt-4">
       <div class="flex items-center space-x-2"><span class="text-[11px] font-bold text-slate-500 uppercase">{capacity}</span></div>
       <div class="flex items-center space-x-2"><span class="text-[11px] font-bold text-slate-500 uppercase">{output_w} Ausgang</span></div>
       <div class="flex items-center space-x-2"><span class="text-[11px] font-bold text-slate-500 uppercase">{cable}</span></div>
       <div class="flex items-center space-x-2"><span class="text-[11px] font-bold text-slate-500 uppercase">{eff}</span></div>
      </div>
      <p class="text-[11px] text-slate-500 mb-6 italic leading-relaxed">{desc}</p>
      <div class="mb-6 p-4 bg-slate-50 rounded-xl">
       <h4 class="text-xs font-black text-slate-700 uppercase mb-3">Spezifikationen</h4>
       <table class="w-full text-[11px]">
       <tbody>
{rows}
       </tbody>
       </table>
      </div>
      <button data-action="open-modal" data-product="Power Bank OEM/ODM" class="w-full py-4 bg-brandOrange text-white font-black uppercase text-[11px] tracking-widest rounded-2xl hover:bg-brandOrange/90 transition-all shadow-lg">Preis Anfragen</button>
     </div>"""
def testimonial_card(quote, name, role, location):
    return f"""     <div class="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all">
      <div class="flex items-center gap-1 mb-4">
       {FIVE_STARS}
      </div>
      <p class="text-slate-300 text-sm leading-relaxed mb-6">"{quote}"</p>
      <div class="border-t border-white/10 pt-4">
       <p class="text-white font-black text-sm">{name}</p>
       <p class="text-slate-500 text-xs">{role}</p>
       <p class="text-slate-600 text-[11px]">{location}</p>
      </div>
     </div>"""


# === BUILD THE FULL PAGE ===
parts = []

# --- FRONT MATTER ---
parts.append("""---
title: "Powerbank Hersteller OEM/ODM | Semi-Solid-State PD 3.1 | WOWOHCOOL"
description: "Professioneller Powerbank Hersteller seit 2013. Semi-Solid-State-Akkus, PD 3.1 bis 140W. B2B Großhandel & OEM/ODM. UN38.3/CE zertifiziert. MOQ 500+. DDP nach DE/AT/CH."
canonical: "/de/produkte/powerbank/"
enPath: "/products/power-bank/"
esPath: "productos/powerbank/"
navActive: "powerbank"
---

{% extends "layout.njk" %}

{% block head_schema %}
<script type="application/ld+json">
[{
 "@context": "https://schema.org",
 "@type": "ManufacturingBusiness",
 "@id": "https://www.wowohcool.com/de/#organization",
 "name": "WOWOHCOOL (Dong Yi Technology Co., Ltd)",
 "url": "https://www.wowohcool.com/de/",
 "logo": "https://www.wowohcool.com/image/wowohcool-logo-optimized.webp",
 "description": "Professioneller OEM/ODM-Hersteller von Powerbanks, GaN-Ladegeräten, kabellosen Ladegeräten und Autoladegeräten seit 2013.",
 "contactPoint": {
  "@type": "ContactPoint",
  "contactType": "sales",
  "availableLanguage": ["German", "English"],
  "email": "info@wowohcool.com"
 },
 "telephone": "+86-186-2078-9739",
 "address": {
  "@type": "PostalAddress",
  "addressLocality": "Shenzhen",
  "addressRegion": "Guangdong",
  "addressCountry": "CN"
 },
 "foundingDate": "2013",
 "areaServed": ["DE", "AT", "CH", "EU"]
},
{
 "@context": "https://schema.org",
 "@type": "BreadcrumbList",
 "itemListElement": [
  {"@type":"ListItem","position":1,"name":"Startseite","item":"https://www.wowohcool.com/de/"},
  {"@type":"ListItem","position":2,"name":"Produkte","item":"https://www.wowohcool.com/de/produkte/"},
  {"@type":"ListItem","position":3,"name":"Powerbank","item":"https://www.wowohcool.com/de/produkte/powerbank/"}
 ]
},
{
 "@context": "https://schema.org",
 "@type": "Product",
 "name": "WOWOHCOOL Powerbanks - Semi-Solid-State & Hochleistungs-PD-3.1",
 "description": "Professioneller Powerbank-Hersteller in Shenzhen. Semi-Solid-State-Akkus, 2-in-1-Hybrid-Ladegeräte, Hochleistungs-PD-3.1-Powerstations bis 240W. OEM/ODM ab 500 Stück.",
 "brand": {"@type": "Brand", "name": "WOWOHCOOL"},
 "manufacturer": {"@type": "Organization", "name": "Dong Yi Technology Co., Ltd"},
 "offers": {
  "@type": "AggregateOffer",
  "priceCurrency": "EUR",
  "lowPrice": "5.50",
  "highPrice": "23",
  "offerCount": 16,
  "availability": "https://schema.org/InStock",
  "url": "https://www.wowohcool.com/de/produkte/powerbank/"
 },
 "additionalProperty": [
  {"@type": "PropertyValue", "name": "Akkutechnologie", "value": "Semi-Solid-State / Li-Po / Li-Ion"},
  {"@type": "PropertyValue", "name": "Kapazitätsbereich", "value": "2000mAh - 27000mAh (99,9Wh)"},
  {"@type": "PropertyValue", "name": "Ausgangsleistung", "value": "3,7V DC - 240W PD 3.1"},
  {"@type": "PropertyValue", "name": "Zertifizierungen", "value": "UN38.3, CE, FCC, RoHS, TÜV GS auf Anfrage"},
  {"@type": "PropertyValue", "name": "MOQ", "value": "500 Stück (OEM) / 1.000 Stück (ODM)"},
  {"@type": "PropertyValue", "name": "Individualisierung", "value": "Logo, Verpackung, Kapazität, Farbe"}
 ]
}]
</script>
<script type="application/ld+json">
{
 "@context": "https://schema.org",
 "@type": "FAQPage",
 "speakable": {"@type": "SpeakableSpecification", "cssSelector": [".faq-answer"]},
 "mainEntity": [
  {"@type":"Question","name":"Wie hoch ist die MOQ für Powerbank OEM-Bestellungen?","acceptedAnswer":{"@type":"Answer","text":"Unsere MOQ beträgt 500 Stück pro SKU für OEM-Bestellungen. Für kundenspezifische ODM-Projekte mit neuem Werkzeugbau liegt die MOQ bei 1.000 Stück. Muster innerhalb von 3-7 Tagen."}},
  {"@type":"Question","name":"Welche Zertifizierungen haben Ihre Powerbanks?","acceptedAnswer":{"@type":"Answer","text":"Alle Powerbanks sind CE, FCC, RoHS und UN38.3 zertifiziert. Semi-Solid-State-Modelle mit PD 3.1 bis 140W verfügbar. Auf Anfrage: TÜV GS, UL, PSE, KC."}},
  {"@type":"Question","name":"Bieten Sie Semi-Solid-State Powerbanks an?","acceptedAnswer":{"@type":"Answer","text":"Ja. CES 2026 ausgezeichnet. 50% dünnere Profile, 30% höhere Energiedichte, nahezu kein Brandrisiko. Verfügbar in 5.000-10.000mAh mit Qi2.2-Unterstützung."}},
  {"@type":"Question","name":"Wie lange dauert die OEM-Produktion?","acceptedAnswer":{"@type":"Answer","text":"Standard-OEM: 25-30 Tage nach Musterfreigabe. ODM: 45-60 Tage. Musterversand: 3-7 Tage. DDP-Lieferung nach Deutschland/Österreich/Schweiz verfügbar."}},
  {"@type":"Question","name":"Welche Kapazitäten bieten Sie an?","acceptedAnswer":{"@type":"Answer","text":"5.000mAh bis 40.000mAh. Beliebteste: 10.000mAh und 20.000mAh. Grade-A-Zellen, 500+ Ladezyklen garantiert."}},
  {"@type":"Question","name":"Liefern Sie direkt nach Deutschland?","acceptedAnswer":{"@type":"Answer","text":"Ja. DHL/FedEx Express 5-7 Tage oder Seefracht 15-25 Tage. DDP-Service inklusive Zollabwicklung für DE/AT/CH. Alle Produkte CE-konform."}}
 ]
}
</script>
{% endblock %}

{% block content %}
""")

# --- HERO SECTION ---
parts.append("""<!-- ========================================================================
 HERO SECTION
 ======================================================================== -->
 <section class="relative pt-20 md:pt-24 pb-8 lg:pt-28 lg:pb-16 bg-white text-slate-900 overflow-hidden">
  <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
   <div class="absolute top-0 left-0 max-w-full w-64 h-64 bg-brandOrange opacity-20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
   <div class="absolute bottom-0 right-0 max-w-full w-64 h-64 bg-blue-500 opacity-20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
  </div>

  <div class="max-w-7xl mx-auto px-6 relative z-10 text-center py-12 lg:py-12">
   <nav class="text-sm text-slate-500 mb-6 text-left">
    <a href="/de/" class="hover:text-brandOrange">Startseite</a>
    <span class="mx-2">/</span>
    <a href="/de/produkte/" class="hover:text-brandOrange">Produkte</a>
    <span class="mx-2">/</span>
    <span class="text-slate-900">Powerbank</span>
   </nav>
   <div>
    <div class="badge-capsule mb-6 mx-auto uppercase tracking-widest">Powerbank-Fertigung | Seit 2013</div>
    <h1 class="text-4xl md:text-5xl lg:text-6xl font-black text-brandBlue uppercase italic tracking-tighter leading-tight">
     Hochleistungs-Powerbanks<br><span class="text-brandOrange">für B2B &amp; Großhandel</span>
    </h1>
   </div>

   <div class="max-w-3xl mx-auto space-y-4 mb-8">
    <div class="bg-brandBlue/5 border-l-4 border-brandOrange p-4 rounded-r-xl text-left">
     <p class="text-slate-700 text-sm leading-relaxed">Schluss mit Sorgen um Akkusicherheit. Unsere Semi-Solid-State-Powerbanks bieten null Risiko thermischer Durchgehreaktion bei PD-3.1-Schnellladung bis 140W — entwickelt für Marken, die Zuverlässigkeit in Serie verlangen. Von ultradünnen 5.000mAh-Taschenakkus bis zu Hochleistungs-Powerstations mit 40.000mAh und Digitalanzeige: Jede Einheit verwendet Grade-A-Li-Polymer-Zellen mit 500+ Ladezyklen. Zusätzlich fertigen wir 2-in-1-Hybrid-Ladegeräte und Heizakkus für Winterbekleidung. Alle Produkte durchlaufen strenge UN38.3- und MSDS-Zertifizierung für 100% sicheren weltweiten Versand.</p>
    </div>
    <p class="text-slate-500 text-sm leading-relaxed text-left">Unser Powerbank-Sortiment reicht von ultradünnen 5.000mAh-Taschenakkus bis zu industrietauglichen 40.000mAh-Powerstations mit Echtzeit-Digitalanzeige und PD 3.1 140W Ausgang. Wir gehören zu den ersten Herstellern, die Semi-Solid-State-Akkutechnologie einsetzen — 30% höhere Energiedichte und null thermisches Durchgehen im Vergleich zu herkömmlichen Li-Polymer-Zellen. Jede Einheit verfügt über 10-Schicht-Schutzschaltung, UN38.3-Zertifizierung für Luftfracht und Grade-A-Zellen mit 500+ Zyklen. Individuelles Branding, Verpackung und Firmware für OEM/ODM-Partner ab MOQ 500 Stück. DDP-Lieferung nach Deutschland, Österreich und die Schweiz.</p>
   </div>

   <div>
    <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
     <button data-action="open-modal" data-product="Power Bank OEM/ODM" class="w-full sm:w-auto bg-brandOrange text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest text-sm shadow-xl hover:-translate-y-1 transition">
      Kostenlosen Katalog Anfordern
     </button>
     <a href="#products" class="w-full sm:w-auto border-2 border-brandBlue text-brandBlue px-10 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-brandBlue hover:text-white transition-all text-center">
      Produkte Ansehen
     </a>
    </div>
   </div>
  </div>
 </section>

 <div class="relative w-full">
  <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
  <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border border-slate-200 rotate-45"></div>
 </div>

 <div class="bg-white pt-12 pb-8 relative z-20 w-full">
  <div class="max-w-7xl mx-auto px-6">
   <div class="pb-10 mb-10 text-center">
    <div class="cert-showcase">
     {% for cert in i18n.certifications[lang].powerBank %}
     <div class="cert-item"><img src="/image/certifications/{{ cert.src }}.svg" alt="{{ cert.alt }}" width="24" height="24" loading="lazy"> {{ cert.label }}</div>
     {% endfor %}
    </div>
   </div>
  </div>

""")
# --- WHY CHOOSE SECTION (dark bg) ---
parts.append("""<!-- ========================================================================
 WARUM UNSERE POWERBANKS Section
 ======================================================================== -->
 <section class="sec-lg bg-slate-900 text-white overflow-hidden">
  <div class="max-w-7xl mx-auto px-6">
   <div class="text-center mb-16">
    <div class="inline-block px-4 py-1 bg-brandOrange/10 border border-brandOrange/20 rounded-full text-[11px] font-bold text-brandOrange uppercase tracking-widest mb-6">Fabrikvorteile</div>
    <h2 class="text-3xl lg:text-4xl font-black uppercase italic tracking-tighter mb-4">Warum deutsche Unternehmen <span class="text-brandOrange">uns <span class="whitespace-nowrap"><span class="highlight-line text-white">wäh</span><span class="text-brandOrange">len</span></span></span></h2>
    <p class="text-slate-500 max-w-2xl mx-auto">Seit 2013 unterstützen wir globale Marken beim erfolgreichen Launch ihrer Powerbank-Produkte. Das unterscheidet unsere Fertigung.</p>
   </div>

   <div class="grid lg:grid-cols-2 gap-12 items-center mb-16">
    <div class="bg-gradient-to-br from-brandOrange/20 to-brandBlue/20 rounded-3xl p-8">
     <img src="/image/product/power-bank/wop23-240w-power-bank.webp" alt="WOWOHCOOL Fabrik produziert Hochleistungs-Powerbanks" width="600" height="600" loading="lazy" class="w-full rounded-2xl">
    </div>
    <div>
     <h3 class="text-2xl font-black uppercase italic mb-6">Fertigungsexzellenz</h3>
     <div class="space-y-6">
      <div class="flex items-start gap-4">
       <div class="w-12 h-12 bg-brandOrange/20 rounded-xl flex items-center justify-center flex-shrink-0">
        <svg class="icon-battery-full text-brandOrange text-xl" aria-hidden="true" focusable="false" viewBox="0 0 640 512"><path d="M528 128c8.8 0 16 7.2 16 16l0 224c0 8.8-7.2 16-16 16l-416 0c-8.8 0-16-7.2-16-16l0-224c0-8.8 7.2-16 16-16l416 0zM112 64c-44.2 0-80 35.8-80 80l0 224c0 44.2 35.8 80 80 80l416 0c44.2 0 80-35.8 80-80l0-48c17.7 0 32-14.3 32-32l0-64c0-17.7-14.3-32-32-32l0-48c0-44.2-35.8-80-80-80L112 64zm56 112c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24l304 0c13.3 0 24-10.7 24-24l0-112c0-13.3-10.7-24-24-24l-304 0z" fill="currentColor"/></svg>
       </div>
       <div>
        <h4 class="font-black uppercase text-sm mb-2">Premium Grade-A-Zellen</h4>
        <p class="text-slate-500 text-sm">Wir verwenden Grade-A-Lithium-Polymer-Zellen mit 500+ Zyklen Lebensdauer. Zusätzlich bieten wir Semi-Solid-State-Akkus — 50% dünner, 30% höhere Dichte, sicherer.</p>
       </div>
      </div>
      <div class="flex items-start gap-4">
       <div class="w-12 h-12 bg-brandOrange/20 rounded-xl flex items-center justify-center flex-shrink-0">
        <svg class="icon-shield-halved text-brandOrange text-xl" aria-hidden="true" focusable="false" viewBox="0 0 512 512"><path d="M256 0c4.6 0 9.2 1 13.4 2.9L457.8 82.8c22 9.3 38.4 31 38.3 57.2-.5 99.2-41.3 280.7-213.6 363.2-16.7 8-36.1 8-52.8 0-172.4-82.5-213.1-264-213.6-363.2-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.9 1 251.4 0 256 0zm0 66.8l0 378.1c138-66.8 175.1-214.8 176-303.4l-176-74.6 0 0z" fill="currentColor"/></svg>
       </div>
       <div>
        <h4 class="font-black uppercase text-sm mb-2">10-Schicht-Sicherheitsschutz</h4>
        <p class="text-slate-500 text-sm">Jede Einheit verfügt über OVP, SCP, OTP, NTC und mehr. Das schützt Ihre Marke und Ihre Kunden. TÜV GS auf Anfrage.</p>
       </div>
      </div>
      <div class="flex items-start gap-4">
       <div class="w-12 h-12 bg-brandOrange/20 rounded-xl flex items-center justify-center flex-shrink-0">
        <svg class="icon-plug text-brandOrange text-xl" aria-hidden="true" focusable="false" viewBox="0 0 448 512"><path d="M128-32c17.7 0 32 14.3 32 32l0 96 128 0 0-96c0-17.7 14.3-32 32-32s32 14.3 32 32l0 96 64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l0 64c0 95.1-69.2 174.1-160 189.3l0 66.7c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-66.7C101.2 398.1 32 319.1 32 224l0-64c-17.7 0-32-14.3-32-32S14.3 96 32 96l64 0 0-96c0-17.7 14.3-32 32-32z" fill="currentColor"/></svg>
       </div>
       <div>
        <h4 class="font-black uppercase text-sm mb-2">2-in-1-Hybrid-Ladegeräte</h4>
        <p class="text-slate-500 text-sm">Unsere beliebte Hybrid-Linie kombiniert Wandladegerät und Powerbank. An der Steckdose laden, dann Strom unterwegs nutzen. EU-Stecker verfügbar.</p>
       </div>
      </div>
      <div class="flex items-start gap-4">
       <div class="w-12 h-12 bg-brandOrange/20 rounded-xl flex items-center justify-center flex-shrink-0">
        <svg class="icon-plane-up text-brandOrange text-xl" aria-hidden="true" focusable="false" viewBox="0 0 512 512"><path d="M200 24c0-30.9 25.1-56 56-56s56 25.1 56 56l0 127.3 173.6 159.2c6.6 6.1 10.4 14.6 10.4 23.6l0 43.7c0 10.9-10.7 18.6-21.1 15.2l-162.9-54.3 0 99.7 66 52.8c3.8 3 6 7.6 6 12.5l0 19.8c0 10.4-9.8 18-19.9 15.5L256 512 147.9 539c-10.1 2.5-19.9-5.1-19.9-15.5l0-19.8c0-4.9 2.2-9.5 6-12.5l66-52.8 0-99.7-162.9 54.3C26.7 396.4 16 388.7 16 377.8l0-43.7c0-9 3.8-17.5 10.4-23.6L200 151.3 200 24z" fill="currentColor"/></svg>
       </div>
       <div>
        <h4 class="font-black uppercase text-sm mb-2">Flugzeug-konforme Zertifizierungen</h4>
        <p class="text-slate-500 text-sm">Alle Produkte sind UN38.3 und MSDS zertifiziert für Lufttransport. Problemlose Zollabwicklung in die EU. DDP-Service nach DE/AT/CH.</p>
       </div>
      </div>
     </div>
    </div>
   </div>

   <div class="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-8">
    <h3 class="text-lg md:text-xl font-black uppercase italic mb-4 md:mb-6">Produktionskapazitäten</h3>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
     <div class="text-center">
      <p class="text-2xl md:text-3xl font-black text-brandOrange mb-1 md:mb-2">5000-40000</p>
      <p class="text-[11px] md:text-xs text-slate-500 uppercase">mAh Kapazität</p>
     </div>
     <div class="text-center">
      <p class="text-2xl md:text-3xl font-black text-brandOrange mb-1 md:mb-2">500+</p>
      <p class="text-[11px] md:text-xs text-slate-500 uppercase">Ladezyklen</p>
     </div>
     <div class="text-center">
      <p class="text-2xl md:text-3xl font-black text-brandOrange mb-1 md:mb-2">140W</p>
      <p class="text-[11px] md:text-xs text-slate-500 uppercase">Max. Ausgang (PD)</p>
     </div>
     <div class="text-center">
      <p class="text-2xl md:text-3xl font-black text-brandOrange mb-1 md:mb-2">UN38.3</p>
      <p class="text-[11px] md:text-xs text-slate-500 uppercase">Zertifiziert</p>
     </div>
    </div>
   </div>
  </div>
 </section>

""")
# --- CAPACITY OPTIONS ---
parts.append("""<!-- ========================================================================
 KAPAZITÄTSOPTIONEN Section
 ======================================================================== -->
 <section class="sec bg-white">
  <div class="max-w-7xl mx-auto px-6">
   <div class="text-center mb-12">
    <div class="inline-block px-4 py-1 bg-brandOrange/10 border border-brandOrange/20 rounded-full text-[11px] font-bold text-brandOrange uppercase tracking-widest mb-6">Kapazitätsoptionen</div>
    <h2 class="text-3xl lg:text-4xl font-black text-brandBlue uppercase italic tracking-tighter mb-4">Die richtige <span class="text-brandOrange">Kapazität</span> für Ihren Markt</h2>
    <p class="text-slate-500 max-w-2xl mx-auto">Verschiedene Märkte brauchen verschiedene Kapazitäten. Finden Sie die perfekte Balance aus Größe, Leistung und Preis für Ihre Zielkunden.</p>
   </div>

   <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <div class="bg-slate-50 rounded-2xl p-8">
     <div class="w-16 h-16 bg-brandBlue/10 rounded-2xl flex items-center justify-center mb-6">
      <svg class="icon-mobile-screen text-brandBlue text-3xl" aria-hidden="true" focusable="false" viewBox="0 0 384 512"><path d="M16 64C16 28.7 44.7 0 80 0L304 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L80 512c-35.3 0-64-28.7-64-64L16 64zM128 440c0 13.3 10.7 24 24 24l80 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-80 0c-13.3 0-24 10.7-24 24zM304 64l-224 0 0 304 224 0 0-304z" fill="currentColor"/></svg>
     </div>
     <h3 class="text-xl font-black text-brandBlue uppercase italic mb-4">Slim-Serie (5K-10K)</h3>
     <p class="text-slate-600 text-sm mb-4">Ultradünne Profile für den täglichen Gebrauch. Perfekt für Großhandel, Werbeartikel und Reisezubehör.</p>
     <ul class="space-y-2 text-slate-600 text-sm">
      <li class="flex items-center gap-2">""" + ICON_CHECK_SVG + """ 5.000mAh - 10.000mAh</li>
      <li class="flex items-center gap-2">""" + ICON_CHECK_SVG + """ 10mm ultradünner Formfaktor</li>
      <li class="flex items-center gap-2">""" + ICON_CHECK_SVG + """ Leichtgewicht (150-200g)</li>
      <li class="flex items-center gap-2">""" + ICON_CHECK_SVG + """ Budgetfreundlich für Großbestellungen</li>
     </ul>
    </div>
    <div class="bg-slate-50 rounded-2xl p-8">
     <div class="w-16 h-16 bg-brandOrange/10 rounded-2xl flex items-center justify-center mb-6">
      <svg class="icon-battery-half text-brandOrange text-3xl" aria-hidden="true" focusable="false" viewBox="0 0 640 512"><path d="M528 128c8.8 0 16 7.2 16 16l0 224c0 8.8-7.2 16-16 16l-416 0c-8.8 0-16-7.2-16-16l0-224c0-8.8 7.2-16 16-16l416 0zM112 64c-44.2 0-80 35.8-80 80l0 224c0 44.2 35.8 80 80 80l416 0c44.2 0 80-35.8 80-80l0-48c17.7 0 32-14.3 32-32l0-64c0-17.7-14.3-32-32-32l0-48c0-44.2-35.8-80-80-80L112 64zm56 112c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24l144 0c13.3 0 24-10.7 24-24l0-112c0-13.3-10.7-24-24-24l-144 0z" fill="currentColor"/></svg>
     </div>
     <h3 class="text-xl font-black text-brandBlue uppercase italic mb-4">Mittelklasse (15K-20K)</h3>
     <p class="text-slate-600 text-sm mb-4">Ausgewogene Kapazität für Reisende und Profis. Versorgt mehrere Geräte mit Schnelllade-Unterstützung.</p>
     <ul class="space-y-2 text-slate-600 text-sm">
      <li class="flex items-center gap-2">""" + ICON_CHECK_SVG + """ 15.000mAh - 20.000mAh</li>
      <li class="flex items-center gap-2">""" + ICON_CHECK_SVG + """ PD 45W-65W Ausgang</li>
      <li class="flex items-center gap-2">""" + ICON_CHECK_SVG + """ 2-3 Geräte gleichzeitig laden</li>
      <li class="flex items-center gap-2">""" + ICON_CHECK_SVG + """ Flugzeug-Handgepäck zugelassen</li>
     </ul>
    </div>
    <div class="bg-slate-50 rounded-2xl p-8">
     <div class="w-16 h-16 bg-brandBlue/10 rounded-2xl flex items-center justify-center mb-6">
      <svg class="icon-bolt text-brandBlue text-3xl" aria-hidden="true" focusable="false" viewBox="0 0 448 512"><path d="M338.8-9.9c11.9 8.6 16.3 24.2 10.9 37.8L271.3 224 416 224c13.5 0 25.5 8.4 30.1 21.1s.7 26.9-9.6 35.5l-288 240c-11.3 9.4-27.4 9.9-39.3 1.3s-16.3-24.2-10.9-37.8L176.7 288 32 288c-13.5 0-25.5-8.4-30.1-21.1s-.7-26.9 9.6-35.5l288-240c11.3-9.4 27.4-9.9 39.3-1.3z" fill="currentColor"/></svg>
     </div>
     <h3 class="text-xl font-black text-brandBlue uppercase italic mb-4">Hochleistung (27K-40K)</h3>
     <p class="text-slate-600 text-sm mb-4">Maximale Kapazität für Laptops und professionelle Ausrüstung. Ideal für Power-User und mobile Arbeitsplätze.</p>
     <ul class="space-y-2 text-slate-600 text-sm">
      <li class="flex items-center gap-2">""" + ICON_CHECK_SVG + """ 27.000mAh - 40.000mAh</li>
      <li class="flex items-center gap-2">""" + ICON_CHECK_SVG + """ PD 3.1 140W Ausgang</li>
      <li class="flex items-center gap-2">""" + ICON_CHECK_SVG + """ Lädt MacBook und Laptops</li>
      <li class="flex items-center gap-2">""" + ICON_CHECK_SVG + """ Großhandelspreise verfügbar</li>
     </ul>
    </div>
   </div>
  </div>
 </section>

""")

# --- COMPLIANCE CALLOUT ---
parts.append("""<!-- ========================================================================
 COMPLIANCE Section
 ======================================================================== -->
 <section class="sec bg-white border-t border-slate-100">
  <div class="max-w-7xl mx-auto px-6">
   <div class="bg-slate-900 rounded-2xl md:rounded-3xl p-6 md:p-8">
    <div class="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
     <div class="w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center flex-shrink-0" style="background-color: rgba(255,107,0,0.15);">
      <svg class="icon-clipboard-check text-2xl md:text-3xl" aria-hidden="true" focusable="false" viewBox="0 0 384 512"><path d="M256 0c23.7 0 44.4 12.9 55.4 32l8.6 0c35.3 0 64 28.7 64 64l0 352c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32l8.6 0C83.6 12.9 104.3 0 128 0L256 0zm26.9 212.6c-10.7-7.8-25.7-5.4-33.5 5.3l-85.6 117.7-26.5-27.4c-9.2-9.5-24.4-9.8-33.9-.6s-9.8 24.4-.6 33.9l46.4 48c4.9 5.1 11.8 7.8 18.9 7.3s13.6-4.1 17.8-9.8L288.2 246.1c7.8-10.7 5.4-25.7-5.3-33.5zM136 64c-13.3 0-24 10.7-24 24s10.7 24 24 24l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L136 64z" fill="currentColor"/></svg>
     </div>
     <div class="min-w-0 flex-1">
      <h3 class="text-lg md:text-xl font-black uppercase italic mb-1 md:mb-2 text-white">Zertifiziert für den EU-Markt</h3>
      <p class="text-sm md:text-base leading-relaxed text-white/80">Alle Produkte durchlaufen strenge <strong class="font-bold text-brandOrange">UN38.3- und MSDS-Zertifizierung</strong> für 100% legalen und sicheren weltweiten Versand. CE, FCC, RoHS zertifiziert. EU-Batterieverordnung konform.</p>
     </div>
    </div>
   </div>
  </div>
 </section>

 <!-- Trust Bar -->
 {% include "trust-bar.njk" %}

""")
# --- PRODUCTS CATALOG ---
parts.append("""<!-- ========================================================================
 PRODUCTS CATALOG SECTION
 ======================================================================== -->
 <section id="products" class="sec bg-white relative">
  <div class="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-50 to-transparent -z-10"></div>

  <div class="max-w-7xl mx-auto px-6">
   <div class="mb-16 md:mb-24">
    <!-- Semi-Solid-State Powerbanks -->
    <div class="mb-16 md:mb-20">
     <div class="flex items-end justify-between mb-8 md:mb-10 reveal">
      <div>
       <h2 class="text-2xl font-black text-brandBlue uppercase italic tracking-tighter">Semi-Solid-State Powerbanks</h2>
       <p class="text-slate-500 mt-1 text-xs uppercase font-bold tracking-widest italic">Nächste Generation Akkutechnologie | 36Wh - 99Wh</p>
      </div>
      <div class="hidden md:block h-px flex-1 bg-slate-100 mx-10 mb-3"></div>
     </div>
     <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
""")

# Semi-Solid-State products
parts.append(product_card(
    "WOP26", "Semi-Solid 140W", "wop26-semi-solid-retractable.webp",
    "20000mAh / 72Wh", "140W", "Einziehbares Kabel", "≥85% Effizienz",
    "Semi-Solid-State-Powerbank der nächsten Generation mit 140W PD 3.1 Ausgang. 20000mAh Kapazität mit einziehbarem USB-C-Kabel. 50% dünner, 30% höhere Energiedichte als herkömmliche Li-Po. CES 2026 prämierte Technologie. Ideal für Laptop-Ladung unterwegs.",
    "Neu", "Semi-Solid-State",
    [("Akkukapazität", "20000mAh / 72Wh"), ("Akkutyp", "Semi-Solid-State"), ("Nennkapazität", "12000mAh (5V/3A)"), ("Größe", "12,9×6,2×3,2cm"), ("Material", "PC + ABS"), ("USB-C Ausgang", "5V/3A, 9V/3A, 12V/3A, 15V/3A, 20V/5A, 28V/5A (140W)"), ("USB-A Ausgang", "5V/3A, 9V/2A, 12V/1,5A (22,5W)"), ("Effizienz", "≥85%")]
))

parts.append(product_card(
    "WOP23", "Semi-Solid 240W", "wop23-240w-power-bank.webp",
    "27600mAh / 99Wh", "240W", "PD 3.1 Dual-Port", "≥85% Effizienz",
    "Flaggschiff Semi-Solid-State-Powerbank mit 240W PD 3.1 Ausgang. 27600mAh (99Wh) — maximale Flugzeug-zugelassene Kapazität. Lädt MacBook Pro in 30 Minuten auf 50%. Dual USB-C + USB-A. CES 2026 prämiert.",
    "Flaggschiff", "240W PD 3.1",
    [("Akkukapazität", "27600mAh / 99,36Wh"), ("Akkutyp", "Semi-Solid-State"), ("Nennkapazität", "16000mAh (5V/3A)"), ("Größe", "14,2×7,0×3,5cm"), ("Material", "PC + ABS"), ("USB-C1 Ausgang", "5V/3A, 9V/3A, 12V/3A, 15V/3A, 20V/5A, 28V/5A, 36V/5A, 48V/5A (240W)"), ("USB-C2 Ausgang", "5V/3A, 9V/3A, 12V/3A, 15V/3A, 20V/5A (100W)"), ("USB-A Ausgang", "5V/3A, 9V/2A, 12V/1,5A (22,5W)"), ("Effizienz", "≥85%")]
))

parts.append(product_card(
    "WOP21", "Semi-Solid 67W", "wop21-67w-power-bank.webp",
    "20000mAh / 72Wh", "67W", "Dual Einbaukabel", "≥85% Effizienz",
    "Semi-Solid-State-Powerbank mit 67W Schnellladung und doppeltem Einbaukabel (USB-C + Lightning). 20000mAh Kapazität. Kompaktes Design für den täglichen Gebrauch. 500+ Ladezyklen.",
    "Neu", "67W Schnellladen",
    [("Akkukapazität", "20000mAh / 72Wh"), ("Akkutyp", "Semi-Solid-State"), ("Nennkapazität", "12000mAh (5V/2A)"), ("Größe", "9,7×6,1×3,6cm"), ("Material", "PC-Gehäuse"), ("USB-C Kabel Ausgang", "5V/3A, 9V/3A, 12V/3A, 15V/3A, 20V/3,35A (67W)"), ("Lightning Kabel Ausgang", "5V/3A, 9V/3A (27W Max)"), ("USB-A Ausgang", "5V/3A, 9V/2A, 12V/1,5A (22,5W)"), ("Effizienz", "≥85%")]
))

parts.append(product_card(
    "WOP22", "Semi-Solid 67W Kompakt", "wop22-130w-power-bank.webp",
    "10000mAh / 36Wh", "67W", "Dual Einbaukabel", "≥85% Effizienz",
    "Kompakte Semi-Solid-State-Powerbank mit 67W Ausgang. 10000mAh in ultradünnem Formfaktor. Eingebaute USB-C + Lightning Kabel. Perfekt für Werbeartikel und Reisezubehör.",
    "Kompakt", "Semi-Solid-State",
    [("Akkukapazität", "10000mAh / 36Wh"), ("Akkutyp", "Semi-Solid-State"), ("Nennkapazität", "5800mAh (5V/2A)"), ("Größe", "9,1×5,0×3,1cm"), ("Material", "PC-Gehäuse"), ("USB-C Kabel Ausgang", "5V/3A, 9V/3A, 12V/3A, 15V/3A, 20V/3,35A (67W)"), ("Lightning Kabel Ausgang", "5V/3A, 9V/3A (27W Max)"), ("USB-A Ausgang", "5V/3A, 9V/2A, 12V/1,5A (22,5W)"), ("Effizienz", "≥85%")]
))

parts.append(product_card(
    "WOP24", "MagSafe 30W", "wop25-tft-power-bank.webp",
    "5000mAh / 18Wh", "30W", "MagSafe Kabellos", "≥80% Effizienz",
    "Semi-Solid-State MagSafe-Powerbank mit 30W kabellosem Ausgang. 5000mAh ultradünn, magnetische Befestigung für iPhone. Qi2-kompatibel. Ideal für Apple-Zubehör-Marken.",
    "MagSafe", "Semi-Solid-State",
    [("Akkukapazität", "5000mAh / 18Wh"), ("Akkutyp", "Semi-Solid-State"), ("Kabelloses Laden", "15W MagSafe / 30W Max"), ("Größe", "9,5×6,5×0,8cm"), ("Material", "PC + Aluminium"), ("USB-C Ausgang", "5V/3A, 9V/2,2A, 12V/1,5A (20W)"), ("Kompatibilität", "iPhone 12-16, Qi2-Geräte"), ("Effizienz", "≥80%")]
))

parts.append(product_card(
    "WOP25", "MagSafe 30W Pro", "wop15-tft-3in1-power-bank.webp",
    "10000mAh / 36Wh", "30W", "MagSafe + USB-C", "≥80% Effizienz",
    "Semi-Solid-State MagSafe-Powerbank mit 10000mAh und TFT-Display. 30W kabelloses Laden + 20W USB-C Ausgang. Magnetische Befestigung. Echtzeit-Akkustandanzeige.",
    "MagSafe Pro", "TFT-Display",
    [("Akkukapazität", "10000mAh / 36Wh"), ("Akkutyp", "Semi-Solid-State"), ("Kabelloses Laden", "15W MagSafe / 30W Max"), ("TFT-Display", "Ja, Echtzeit-Anzeige"), ("Größe", "10,5×6,8×1,2cm"), ("Material", "PC + Aluminium"), ("USB-C Ausgang", "5V/3A, 9V/2,2A (20W)"), ("Effizienz", "≥80%")]
))

# Close semi-solid grid
parts.append("""     </div>
    </div>
""")
# --- HEATING BATTERY PRODUCTS ---
parts.append("""    <!-- Heizakku Powerbanks -->
    <div class="mb-16 md:mb-20">
     <div class="flex items-end justify-between mb-8 md:mb-10 reveal">
      <div>
       <h2 class="text-2xl font-black text-brandBlue uppercase italic tracking-tighter">Heizakku-Powerbanks</h2>
       <p class="text-slate-500 mt-1 text-xs uppercase font-bold tracking-widest italic">Für Heizkleidung & Outdoor | 7,4V - 12,6V DC</p>
      </div>
      <div class="hidden md:block h-px flex-1 bg-slate-100 mx-10 mb-3"></div>
     </div>
     <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
""")

parts.append(product_card(
    "WOH10", "Heizakku 67W", "wop55-heating-battery.webp",
    "10000mAh / 36Wh", "67W", "DC + USB-C", "7,4V/12,6V DC",
    "Hochleistungs-Heizakku für beheizte Jacken und Westen. 10000mAh mit 67W USB-C Schnellladung. Dual-Spannung 7,4V und 12,6V DC. CE/PSE zertifiziert. Ideal für Outdoor-Bekleidungsmarken.",
    "Heizakku", "67W Schnellladen",
    [("Akkukapazität", "10000mAh / 36Wh"), ("DC-Ausgang", "7,4V / 12,6V DC"), ("USB-C Ausgang", "67W PD"), ("Betriebstemperatur", "-20°C bis +60°C"), ("Größe", "10,5×7,0×2,2cm"), ("Zertifizierungen", "CE, FCC, RoHS, PSE"), ("Anschluss", "DC 5,5×2,1mm"), ("Effizienz", "≥90%")]
))

parts.append(product_card(
    "WOH20", "Heizakku 67W Pro", "wop55-heating-battery.webp",
    "20000mAh / 72Wh", "67W", "DC + USB-C", "7,4V/12,6V DC",
    "Großkapazitäts-Heizakku für ganztägigen Einsatz. 20000mAh mit 67W USB-C. Dual-Spannung für beheizte Jacken, Westen und Hosen. Bis zu 12 Stunden Heizleistung bei niedriger Stufe.",
    "Heizakku", "Großkapazität",
    [("Akkukapazität", "20000mAh / 72Wh"), ("DC-Ausgang", "7,4V / 12,6V DC"), ("USB-C Ausgang", "67W PD"), ("Heizdauer", "Bis zu 12h (niedrig)"), ("Größe", "13,0×8,0×2,5cm"), ("Zertifizierungen", "CE, FCC, RoHS, PSE"), ("Anschluss", "DC 5,5×2,1mm"), ("Effizienz", "≥90%")]
))

parts.append(product_card(
    "WOH30", "Heizakku Kompakt", "wop50-heating-socks-battery.webp",
    "5000mAh / 18Wh", "20W", "DC + USB-C", "3,7V/7,4V DC",
    "Kompakter Heizakku für beheizte Socken, Handschuhe und Schals. 5000mAh ultrakompakt. 20W USB-C Laden. Leichtgewicht für tragbare Heizlösungen. Paarweise erhältlich.",
    "Kompakt", "Heizakku",
    [("Akkukapazität", "5000mAh / 18Wh"), ("DC-Ausgang", "3,7V / 7,4V DC"), ("USB-C Eingang", "20W"), ("Größe", "7,5×4,5×1,8cm"), ("Gewicht", "95g"), ("Zertifizierungen", "CE, FCC, RoHS, PSE"), ("Anschluss", "DC 3,5×1,35mm"), ("Effizienz", "≥88%")]
))

parts.append(product_card(
    "WOH40", "Heizakku 22,5W", "wop49-heating-scarf-battery.webp",
    "10000mAh / 36Wh", "22,5W", "DC + USB-A", "7,4V DC",
    "Vielseitiger Heizakku mit 22,5W Schnellladung. 10000mAh für beheizte Jacken und Westen. USB-A Ausgang für Smartphone-Ladung. Robustes Design für Outdoor-Einsatz.",
    "Vielseitig", "22,5W Laden",
    [("Akkukapazität", "10000mAh / 36Wh"), ("DC-Ausgang", "7,4V DC"), ("USB-A Ausgang", "5V/3A, 9V/2A, 10V/2,25A (22,5W)"), ("Größe", "10,0×6,5×2,0cm"), ("Zertifizierungen", "CE, FCC, RoHS, PSE"), ("Anschluss", "DC 5,5×2,1mm"), ("Heizdauer", "Bis zu 8h"), ("Effizienz", "≥88%")]
))

parts.append(product_card(
    "WOH50", "Heizakku Slim", "wop53-heating-pillow-battery.webp",
    "5000mAh / 18Wh", "20W", "DC + USB-C", "3,7V DC",
    "Ultradünner Heizakku für Massagekissen und Wärmepads. 5000mAh mit 20W USB-C. Nur 8mm dünn. Perfekt für Wellness- und Gesundheitsprodukte. OEM-Anpassung verfügbar.",
    "Slim", "Heizakku",
    [("Akkukapazität", "5000mAh / 18Wh"), ("DC-Ausgang", "3,7V DC"), ("USB-C Eingang", "20W"), ("Dicke", "8mm"), ("Größe", "8,0×5,0×0,8cm"), ("Zertifizierungen", "CE, FCC, RoHS"), ("Anwendung", "Massagekissen, Wärmepads"), ("Effizienz", "≥85%")]
))

# Close heating grid
parts.append("""     </div>
    </div>
""")
# --- 2-IN-1 HYBRID PRODUCTS ---
parts.append("""    <!-- 2-in-1 Hybrid Ladegeräte -->
    <div class="mb-16 md:mb-20">
     <div class="flex items-end justify-between mb-8 md:mb-10 reveal">
      <div>
       <h2 class="text-2xl font-black text-brandBlue uppercase italic tracking-tighter">2-in-1 Hybrid-Ladegeräte</h2>
       <p class="text-slate-500 mt-1 text-xs uppercase font-bold tracking-widest italic">Wandladegerät + Powerbank in einem | EU-Stecker verfügbar</p>
      </div>
      <div class="hidden md:block h-px flex-1 bg-slate-100 mx-10 mb-3"></div>
     </div>
     <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
""")

parts.append(product_card(
    "WOC42", "Hybrid 15W Kabellos", "wop25-tft-power-bank.webp",
    "5000mAh / 18Wh", "15W", "Qi Kabellos + USB-C", "EU/US/UK Stecker",
    "2-in-1-Hybrid: Wandladegerät und kabellose Powerbank in einem Gerät. 5000mAh mit 15W Qi-Laden. An der Steckdose laden, dann kabellos unterwegs nutzen. EU-Stecker verfügbar.",
    "Hybrid", "15W Kabellos",
    [("Akkukapazität", "5000mAh / 18Wh"), ("Kabelloses Laden", "15W Qi"), ("USB-C Ausgang", "5V/3A, 9V/2A (18W)"), ("AC-Eingang", "110-240V~, 50/60Hz"), ("Stecker", "EU/US/UK/AU"), ("Größe", "9,5×6,5×2,8cm"), ("Material", "PC + ABS"), ("Effizienz", "≥80%")]
))

parts.append(product_card(
    "WOC43", "Hybrid 15W Klappbar", "wop25-tft-power-bank.webp",
    "5000mAh / 18Wh", "15W", "Qi Kabellos + USB-C", "Klappbarer EU-Stecker",
    "Klappbares 2-in-1-Hybrid-Ladegerät mit 15W kabellosem Laden. 5000mAh Powerbank mit einklappbarem EU-Stecker. Ultrakompakt für Reisen. MagSafe-kompatibel.",
    "Hybrid", "Klappbar",
    [("Akkukapazität", "5000mAh / 18Wh"), ("Kabelloses Laden", "15W Qi / MagSafe"), ("USB-C Ausgang", "5V/3A, 9V/2A (18W)"), ("AC-Eingang", "110-240V~, 50/60Hz"), ("Stecker", "EU klappbar"), ("Größe", "9,0×6,5×2,2cm"), ("Material", "PC + ABS"), ("Effizienz", "≥80%")]
))

parts.append(product_card(
    "WOC44", "Hybrid 15W 10000mAh", "wop15-tft-3in1-power-bank.webp",
    "10000mAh / 36Wh", "15W", "Qi + USB-C + USB-A", "EU/US/UK Stecker",
    "Großkapazitäts-Hybrid mit 10000mAh und 15W kabellosem Laden. Dreifach-Ausgang: Qi + USB-C + USB-A. Ganztägige Stromversorgung für Geschäftsreisende. EU-Stecker Standard.",
    "Hybrid", "10000mAh",
    [("Akkukapazität", "10000mAh / 36Wh"), ("Kabelloses Laden", "15W Qi"), ("USB-C Ausgang", "5V/3A, 9V/3A, 12V/2,5A (30W)"), ("USB-A Ausgang", "5V/3A, 9V/2A (18W)"), ("AC-Eingang", "110-240V~, 50/60Hz"), ("Stecker", "EU/US/UK/AU"), ("Größe", "11,0×7,0×3,0cm"), ("Effizienz", "≥80%")]
))

parts.append(product_card(
    "WOC45", "Hybrid Ständer 5000mAh", "wop25-tft-power-bank.webp",
    "5000mAh / 18Wh", "15W", "Qi + Ständer + USB-C", "EU-Stecker",
    "2-in-1-Hybrid mit integriertem Smartphone-Ständer. 5000mAh, 15W kabelloses Laden. Perfekt für Videoanrufe während des Ladens. Klappständer-Design. EU-Stecker.",
    "Hybrid", "Mit Ständer",
    [("Akkukapazität", "5000mAh / 18Wh"), ("Kabelloses Laden", "15W Qi"), ("Ständer", "Verstellbar, 45-75°"), ("USB-C Ausgang", "5V/3A, 9V/2A (18W)"), ("AC-Eingang", "110-240V~, 50/60Hz"), ("Stecker", "EU/US/UK/AU"), ("Größe", "9,5×6,8×2,5cm"), ("Effizienz", "≥80%")]
))

parts.append(product_card(
    "WOC46", "Hybrid Ständer 10000mAh", "wop15-tft-3in1-power-bank.webp",
    "10000mAh / 36Wh", "15W", "Qi + Ständer + Dual-Port", "EU-Stecker",
    "Premium 2-in-1-Hybrid mit 10000mAh, Ständer und 15W kabellosem Laden. Dual USB-C + USB-A Ausgänge. Ideal für Firmengeschenke und Hotels. EU-Stecker Standard.",
    "Premium", "Hybrid Ständer",
    [("Akkukapazität", "10000mAh / 36Wh"), ("Kabelloses Laden", "15W Qi"), ("Ständer", "Verstellbar, 45-75°"), ("USB-C Ausgang", "5V/3A, 9V/3A, 12V/2,5A (30W)"), ("USB-A Ausgang", "5V/3A, 9V/2A (18W)"), ("AC-Eingang", "110-240V~, 50/60Hz"), ("Stecker", "EU/US/UK/AU"), ("Effizienz", "≥80%")]
))

# Close hybrid grid and products section
parts.append("""     </div>
    </div>
   </div>
  </div>
 </div>
 </section>

""")
# --- BLOG ARTICLES ---
parts.append("""<!-- ========================================================================
 BLOG ARTICLES SECTION
 ======================================================================== -->
 <section class="sec bg-white border-t border-slate-100">
  <div class="max-w-7xl mx-auto px-6">
   <div class="text-center mb-12 reveal">
    <h2 class="text-3xl lg:text-4xl font-black text-slate-900 uppercase italic tracking-tighter mb-4">Powerbank <span class="text-brandOrange">Wissen</span></h2>
    <p class="text-slate-500 font-bold uppercase tracking-widest text-[11px]">Expertenwissen für OEM/ODM-Beschaffung</p>
   </div>

   <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    <a href="/de/blog/powerbank-spezifikationen-leitfaden/" class="group bg-slate-50 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
     <div class="h-40 relative overflow-hidden">
      <img loading="lazy" src="/image/blog/cover-en/power-bank-specs-guide.webp" alt="Powerbank Spezifikationen Leitfaden" class="w-full h-full object-cover" width="2240" height="1260">
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div class="absolute bottom-3 left-4">
       <span class="px-2 py-1 bg-brandOrange text-white text-[11px] font-black uppercase rounded">Technologie</span>
      </div>
     </div>
     <div class="p-6">
      <h4 class="font-black text-brandBlue uppercase mb-2 group-hover:text-brandOrange transition text-sm leading-tight">Powerbank Spezifikationen Leitfaden</h4>
      <p class="text-slate-500 text-xs line-clamp-2">Kompletter Leitfaden zu Powerbank-Spezifikationen für B2B-Einkäufer.</p>
      <span class="inline-block mt-3 text-brandOrange text-[11px] font-bold uppercase">Weiterlesen &rarr;</span>
     </div>
    </a>

    <a href="/de/blog/oem-vs-odm-leitfaden/" class="group bg-slate-50 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
     <div class="h-40 relative overflow-hidden">
      <img loading="lazy" src="/image/blog/cover-en/oem-vs-odm-guide.webp" alt="OEM vs ODM Leitfaden" class="w-full h-full object-cover" width="2240" height="1260">
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div class="absolute bottom-3 left-4">
       <span class="px-2 py-1 bg-brandBlue text-white text-[11px] font-black uppercase rounded">Beschaffung</span>
      </div>
     </div>
     <div class="p-6">
      <h4 class="font-black text-brandBlue uppercase mb-2 group-hover:text-brandOrange transition text-sm leading-tight">OEM vs ODM Leitfaden</h4>
      <p class="text-slate-500 text-xs line-clamp-2">Wählen Sie das richtige Fertigungsmodell für Ihre Marke.</p>
      <span class="inline-block mt-3 text-brandOrange text-[11px] font-bold uppercase">Weiterlesen &rarr;</span>
     </div>
    </a>

    <a href="/de/blog/usb-c-pd-schnelllade-leitfaden/" class="group bg-slate-50 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
     <div class="h-40 relative overflow-hidden">
      <img loading="lazy" src="/image/blog/cover-en/usb-c-pd-fast-charging-guide.webp" alt="USB-C PD Schnellladen" class="w-full h-full object-cover" width="2240" height="1260">
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div class="absolute bottom-3 left-4">
       <span class="px-2 py-1 bg-white text-green-600 text-[11px] font-black uppercase rounded">Technologie</span>
      </div>
     </div>
     <div class="p-6">
      <h4 class="font-black text-brandBlue uppercase mb-2 group-hover:text-brandOrange transition text-sm leading-tight">USB-C PD Schnellladen</h4>
      <p class="text-slate-500 text-xs line-clamp-2">Power Delivery Protokoll für Ihre Produkte meistern.</p>
      <span class="inline-block mt-3 text-brandOrange text-[11px] font-bold uppercase">Weiterlesen &rarr;</span>
     </div>
    </a>
   </div>

   <div class="text-center mt-10">
    <a href="/de/blog/" class="inline-flex items-center gap-2 px-6 py-3 bg-brandBlue text-white rounded-xl font-black uppercase text-sm hover:bg-slate-800 transition">
     Alle Artikel Ansehen <svg class="icon-arrow-right" aria-hidden="true" focusable="false" viewBox="0 0 512 512"><path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-105.4 105.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" fill="currentColor"/></svg>
    </a>
   </div>
  </div>
 </section>

""")
# --- FAQ SECTION ---
parts.append("""<!-- ========================================================================
 FAQ SECTION
 ======================================================================== -->
 <section class="sec-lg bg-slate-50 border-t border-slate-100">
  <div class="max-w-4xl mx-auto px-6">
   <div class="text-center mb-16 reveal">
    <h2 class="text-3xl lg:text-4xl font-black text-slate-900 uppercase italic tracking-tighter mb-4">Powerbank <span class="text-brandOrange">FAQ</span></h2>
    <p class="text-slate-500 font-bold uppercase tracking-widest text-[11px]">Wichtig für OEM/ODM-Partnerschaften</p>
   </div>
   <div class="grid gap-6">
    <div class="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 reveal">
     <div class="flex gap-3 md:gap-6 italic">
      <div class="shrink-0 w-10 h-10 rounded-full bg-brandOrange/10 flex items-center justify-center text-brandOrange font-black italic">01</div>
      <div>
       <h4 class="text-lg font-black text-slate-900 uppercase mb-3">Wie hoch ist die MOQ für OEM-Powerbank-Bestellungen?</h4>
       <p class="faq-answer text-slate-600 leading-relaxed text-sm">Unsere MOQ beträgt <strong>500 Stück</strong> pro SKU für Standardmodelle. Kundenspezifische ODM-Projekte mit individueller Akkuzellen-Konfiguration (z.B. Semi-Solid-State) erfordern 1.000+ Stück. Wir bieten flexible MOQ-Optionen für Startup-Marken — kontaktieren Sie uns für Ihre Mengenanforderungen.</p>
      </div>
     </div>
    </div>
    <div class="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 reveal">
     <div class="flex gap-3 md:gap-6 italic">
      <div class="shrink-0 w-10 h-10 rounded-full bg-brandBlue/10 flex items-center justify-center text-brandBlue font-black italic">02</div>
      <div>
       <h4 class="text-lg font-black text-slate-900 uppercase mb-3">Welche Kapazitäten bieten Sie an?</h4>
       <p class="faq-answer text-slate-600 leading-relaxed text-sm">Wir fertigen von <strong>5.000mAh bis 40.000mAh</strong>. Beliebte Optionen: 10.000mAh (Slim), 15.000mAh (Hybrid), 20.000mAh-27.000mAh (Hochkapazität). Alle verwenden Grade-A-Li-Polymer-Zellen mit 500+ Zyklen Garantie.</p>
      </div>
     </div>
    </div>
    <div class="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 reveal">
     <div class="flex gap-3 md:gap-6 italic">
      <div class="shrink-0 w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 font-black italic">03</div>
      <div>
       <h4 class="text-lg font-black text-slate-900 uppercase mb-3">Welche Zertifizierungen haben Ihre Powerbanks?</h4>
       <p class="faq-answer text-slate-600 leading-relaxed text-sm">Alle Powerbanks sind <strong>CE, FCC, RoHS zertifiziert</strong> und <strong>UN38.3 getestet</strong> für sicheren Lufttransport. Wir liefern vollständige Dokumentation inklusive MSDS-Berichte. TÜV GS auf Anfrage für den deutschen Markt.</p>
      </div>
     </div>
    </div>
    <div class="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 reveal">
     <div class="flex gap-3 md:gap-6 italic">
      <div class="shrink-0 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-black italic">04</div>
      <div>
       <h4 class="text-lg font-black text-slate-900 uppercase mb-3">Können Sie das Design individualisieren?</h4>
       <p class="faq-answer text-slate-600 leading-relaxed text-sm">Ja. Unser OEM/ODM-Service umfasst <strong>individuelles CMF, Logodruck, Verpackungsdesign und Kapazitätskonfiguration</strong>. Powerbank-spezifische Optionen: TFT-Display-Integration, kabelloses Laden, 2-in-1-Hybrid-Designs und Semi-Solid-State-Akkutechnologie.</p>
      </div>
     </div>
    </div>
    <div class="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 reveal">
     <div class="flex gap-3 md:gap-6 italic">
      <div class="shrink-0 w-10 h-10 rounded-full bg-brandOrange/10 flex items-center justify-center text-brandOrange font-black italic">05</div>
      <div>
       <h4 class="text-lg font-black text-slate-900 uppercase mb-3">Wie lange dauert die Produktion?</h4>
       <p class="faq-answer text-slate-600 leading-relaxed text-sm"><strong>Standard-OEM: 25-35 Tage</strong> nach Musterfreigabe. <strong>Kundenspezifisches ODM: 45-60 Tage</strong>. Express-Werkzeugbau und Rapid Prototyping verfügbar. DDP-Lieferung nach DE/AT/CH inklusive Zollabwicklung.</p>
      </div>
     </div>
    </div>
    <div class="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 reveal">
     <div class="flex gap-3 md:gap-6 italic">
      <div class="shrink-0 w-10 h-10 rounded-full bg-brandBlue/10 flex items-center justify-center text-brandBlue font-black italic">06</div>
      <div>
       <h4 class="text-lg font-black text-slate-900 uppercase mb-3">Bieten Sie Semi-Solid-State-Powerbanks an?</h4>
       <p class="faq-answer text-slate-600 leading-relaxed text-sm">Ja. Wir bieten <strong>Semi-Solid-State-Powerbanks</strong> — die CES 2026 prämierte Technologie. 50% dünner, 30% höhere Energiedichte, sicherer als Li-Po. Verfügbar in 5.000mAh-27.600mAh. Ideal für Marken, die sich technologisch differenzieren möchten.</p>
      </div>
     </div>
    </div>
   </div>
   <div class="mt-12 text-center reveal">
    <button data-action="open-modal" data-product="Power Bank OEM/ODM" class="bg-brandOrange text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-black uppercase tracking-wider text-[11px] md:text-sm shadow-xl hover:-translate-y-1 transition flex items-center justify-center gap-2 mx-auto">
     Kostenlosen Katalog Anfordern <svg class="icon-download" aria-hidden="true" focusable="false" viewBox="0 0 448 512"><path d="M256 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 210.7-41.4-41.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0l96-96c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 242.7 256 32zM64 320c-35.3 0-64 28.7-64 64l0 32c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-32c0-35.3-28.7-64-64-64l-46.9 0-56.6 56.6c-31.2 31.2-81.9 31.2-113.1 0L110.9 320 64 320zm304 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" fill="currentColor"/></svg>
    </button>
   </div>
  </div>
 </section>

""")
# --- COMPARISON TABLE ---
parts.append("""<!-- ========================================================================
 WETTBEWERBSVERGLEICH Section
 ======================================================================== -->
 <section class="sec bg-white">
  <div class="max-w-7xl mx-auto px-6">
   <div class="text-center mb-14">
    <div class="inline-block px-4 py-1 bg-brandOrange/10 border border-brandOrange/20 rounded-full text-[11px] font-bold text-brandOrange uppercase tracking-widest mb-6">Warum WOWOHCOOL</div>
    <h2 class="text-3xl lg:text-4xl font-black text-brandBlue uppercase italic tracking-tighter mb-4">Nicht alle Fabriken sind gleich</h2>
    <p class="text-slate-500 max-w-2xl mx-auto text-sm">Sehen Sie, wie WOWOHCOOL im Vergleich zu typischen Powerbank-OEMs in China abschneidet.</p>
   </div>
   <div class="max-w-4xl mx-auto overflow-hidden rounded-2xl border border-slate-200">
    <table class="w-full text-sm">
     <thead>
      <tr class="bg-slate-50 border-b border-slate-200">
       <th class="text-left p-4 md:p-5 font-black text-slate-500 uppercase tracking-wider text-[11px]"></th>
       <th class="p-4 md:p-5 font-black text-brandBlue uppercase tracking-wider text-[11px] text-center">WOWOHCOOL</th>
       <th class="p-4 md:p-5 font-black text-slate-300 uppercase tracking-wider text-[11px] text-center">Typische Fabrik</th>
      </tr>
     </thead>
     <tbody class="divide-y divide-slate-100">
      <tr class="hover:bg-slate-50/50 transition">
       <td class="p-4 md:p-5 text-slate-600 font-semibold">Semi-Solid-State-Akku</td>
       <td class="p-4 md:p-5 text-center text-brandOrange font-black">&check; Im Einsatz</td>
       <td class="p-4 md:p-5 text-center text-slate-300">&cross; Nicht verfügbar</td>
      </tr>
      <tr class="hover:bg-slate-50/50 transition">
       <td class="p-4 md:p-5 text-slate-600 font-semibold">Schnellladestandard</td>
       <td class="p-4 md:p-5 text-center text-brandOrange font-black">PD 3.1 bis 240W</td>
       <td class="p-4 md:p-5 text-center text-slate-300">PD 3.0 bis 100W</td>
      </tr>
      <tr class="hover:bg-slate-50/50 transition">
       <td class="p-4 md:p-5 text-slate-600 font-semibold">Namentliche Unternehmenskunden</td>
       <td class="p-4 md:p-5 text-center text-brandOrange font-black">Bosch, Jacob Jensen</td>
       <td class="p-4 md:p-5 text-center text-slate-300">Generische Referenzen</td>
      </tr>
      <tr class="hover:bg-slate-50/50 transition">
       <td class="p-4 md:p-5 text-slate-600 font-semibold">Kapazitätsbereich</td>
       <td class="p-4 md:p-5 text-center text-brandOrange font-black">5.000 - 60.000mAh</td>
       <td class="p-4 md:p-5 text-center text-slate-300">5.000 - 20.000mAh</td>
      </tr>
      <tr class="hover:bg-slate-50/50 transition">
       <td class="p-4 md:p-5 text-slate-600 font-semibold">F&amp;E-Ingenieure</td>
       <td class="p-4 md:p-5 text-center text-brandOrange font-black">50+</td>
       <td class="p-4 md:p-5 text-center text-slate-300">10-20 typisch</td>
      </tr>
      <tr class="hover:bg-slate-50/50 transition">
       <td class="p-4 md:p-5 text-slate-600 font-semibold">EU-Konformität</td>
       <td class="p-4 md:p-5 text-center text-brandOrange font-black">CE + TÜV GS möglich</td>
       <td class="p-4 md:p-5 text-center text-slate-300">Nur CE-Basis</td>
      </tr>
      <tr class="hover:bg-slate-50/50 transition">
       <td class="p-4 md:p-5 text-slate-600 font-semibold">DDP-Lieferung DACH</td>
       <td class="p-4 md:p-5 text-center text-brandOrange font-black">&check; Inklusive</td>
       <td class="p-4 md:p-5 text-center text-slate-300">&cross; Nur FOB/CIF</td>
      </tr>
     </tbody>
    </table>
   </div>
   <div class="text-center mt-10">
    <p class="text-slate-500 text-sm mb-4">Setzen Sie nicht auf Durchschnitt — arbeiten Sie mit einer Fabrik, der Fortune-500-Unternehmen vertrauen.</p>
    <button data-action="open-modal" data-product="Power Bank OEM/ODM" class="bg-brandOrange text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm shadow-xl hover:-translate-y-1 transition inline-flex items-center gap-2">
     OEM-Projekt Starten <svg class="icon-arrow-right" aria-hidden="true" focusable="false" viewBox="0 0 512 512"><path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-105.4 105.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" fill="currentColor"/></svg>
    </button>
   </div>
  </div>
 </section>

""")
# --- PRODUCT INQUIRY FORM ---
parts.append("""<!-- ========================================================================
 PRODUCT INQUIRY FORM
 ======================================================================== -->
{%- set formProduct = "Power Bank OEM/ODM" %}
{%- set formHeading = "Powerbank Fabrikpreise Anfragen" %}
{%- set formSubtext = "Erzählen Sie uns von Ihrem Powerbank-Projekt. Semi-Solid-State, PD 3.1, individuelle Kapazität — wir kümmern uns um alles." %}
{%- set formSubject = "Produktanfrage: Powerbank" %}
{% include "partials/product-inquiry-form.njk" %}

""")

# --- AUDIENCE CARDS ---
parts.append("""<!-- ========================================================================
 FÜR WEN IST DAS Section
 ======================================================================== -->
 <section class="sec bg-white">
  <div class="max-w-7xl mx-auto px-6">
   <div class="text-center mb-14">
    <div class="inline-block px-4 py-1 bg-brandBlue/10 border border-brandBlue/20 rounded-full text-[11px] font-bold text-brandBlue uppercase tracking-widest mb-6">Für wen ist das</div>
    <h2 class="text-3xl lg:text-4xl font-black text-brandBlue uppercase italic tracking-tighter mb-4">Perfekt für Ihr Unternehmen</h2>
    <p class="text-slate-500 max-w-2xl mx-auto text-sm">Tausende Unternehmen vertrauen WOWOHCOOL für ihre Powerbank-Beschaffung. Finden Sie Ihr Profil.</p>
   </div>
   <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div class="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-brandOrange/30 hover:shadow-lg transition-all group">
     <div class="w-14 h-14 bg-brandOrange/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-brandOrange/20 transition-colors">
      <svg class="icon-store text-brandOrange text-xl" aria-hidden="true" focusable="false" viewBox="0 0 512 512"><path d="M30.7 72.3C37.6 48.4 59.5 32 84.4 32l344 0c24.9 0 46.8 16.4 53.8 40.3l23.4 80.2c12.8 43.7-20.1 87.5-65.6 87.5-26.3 0-49.4-14.9-60.8-37.1-11.6 21.9-34.6 37.1-61.4 37.1-26.6 0-49.7-15-61.3-37-11.6 22-34.7 37-61.3 37-26.8 0-49.8-15.1-61.4-37.1-11.4 22.1-34.5 37.1-60.8 37.1-45.6 0-78.4-43.7-65.6-87.5L30.7 72.3zM96.4 352l320 0 0-66.4c7.6 1.6 15.5 2.4 23.5 2.4 14.3 0 28-2.6 40.5-7.2l0 151.2c0 26.5-21.5 48-48 48l-352 0c-26.5 0-48-21.5-48-48l0-151.2c12.5 4.6 26.1 7.2 40.5 7.2 8.1 0 15.9-.8 23.5-2.4l0 66.4z" fill="currentColor"/></svg>
     </div>
     <h3 class="text-lg font-black text-slate-900 uppercase italic mb-3">Amazon &amp; E-Commerce-Händler</h3>
     <p class="text-slate-500 text-sm leading-relaxed mb-4">Private-Label-Powerbanks mit verkaufsfertiger Verpackung. PD 3.1 und Semi-Solid-State für Marktdifferenzierung.</p>
     <ul class="text-slate-500 text-xs space-y-2">
      <li class="flex items-center gap-2"><span class="text-green-500 font-bold">&check;</span> Individuelles Branding &amp; Verpackung</li>
      <li class="flex items-center gap-2"><span class="text-green-500 font-bold">&check;</span> MOQ ab 500 Stück</li>
      <li class="flex items-center gap-2"><span class="text-green-500 font-bold">&check;</span> Amazon-konforme Zertifizierungen</li>
     </ul>
    </div>
    <div class="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-brandOrange/30 hover:shadow-lg transition-all group">
     <div class="w-14 h-14 bg-brandOrange/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-brandOrange/20 transition-colors">
      <svg class="icon-suitcase text-brandOrange text-xl" aria-hidden="true" focusable="false" viewBox="0 0 512 512"><path d="M200 48l112 0c4.4 0 8 3.6 8 8l0 40-128 0 0-40c0-4.4 3.6-8 8-8zm-56 8l0 424 224 0 0-424c0-30.9-25.1-56-56-56L200 0c-30.9 0-56 25.1-56 56zM416 96l0 384 32 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64l-32 0zM96 480l0-384-32 0C28.7 96 0 124.7 0 160L0 416c0 35.3 28.7 64 64 64l32 0z" fill="currentColor"/></svg>
     </div>
     <h3 class="text-lg font-black text-slate-900 uppercase italic mb-3">Reise- &amp; Outdoor-Marken</h3>
     <p class="text-slate-500 text-sm leading-relaxed mb-4">Leichte Hochkapazitäts-Powerbanks für Reisezubehör-Linien. Semi-Solid-State für extreme Temperaturen.</p>
     <ul class="text-slate-500 text-xs space-y-2">
      <li class="flex items-center gap-2"><span class="text-green-500 font-bold">&check;</span> Slim &amp; Leichtgewicht-Designs</li>
      <li class="flex items-center gap-2"><span class="text-green-500 font-bold">&check;</span> Semi-Solid-State verfügbar</li>
      <li class="flex items-center gap-2"><span class="text-green-500 font-bold">&check;</span> Einzelhandelsverpackung inklusive</li>
     </ul>
    </div>
    <div class="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-brandOrange/30 hover:shadow-lg transition-all group">
     <div class="w-14 h-14 bg-brandOrange/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-brandOrange/20 transition-colors">
      <svg class="icon-gift text-brandOrange text-xl" aria-hidden="true" focusable="false" viewBox="0 0 512 512"><path d="M321.5 68.8C329.1 55.9 342.9 48 357.8 48l2.2 0c22.1 0 40 17.9 40 40s-17.9 40-40 40l-73.3 0 34.8-59.2zm-131 0l34.8 59.2-73.3 0c-22.1 0-40-17.9-40-40s17.9-40 40-40l2.2 0c14.9 0 28.8 7.9 36.3 20.8zm89.6-24.3l-24.1 41-24.1-41C215.7 16.9 186.1 0 154.2 0L152 0c-48.6 0-88 39.4-88 88 0 14.4 3.5 28 9.6 40L32 128c-17.7 0-32 14.3-32 32l0 32c0 17.7 14.3 32 32 32l448 0c17.7 0 32-14.3 32-32l0-32c0-17.7-14.3-32-32-32l-41.6 0c6.1-12 9.6-25.6 9.6-40 0-48.6-39.4-88-88-88l-2.2 0c-31.9 0-61.5 16.9-77.7 44.4zM480 272l-200 0 0 208 136 0c35.3 0 64-28.7 64-64l0-144zm-248 0l-200 0 0 144c0 35.3 28.7 64 64 64l136 0 0-208z" fill="currentColor"/></svg>
     </div>
     <h3 class="text-lg font-black text-slate-900 uppercase italic mb-3">Firmengeschenke &amp; Werbeartikel</h3>
     <p class="text-slate-500 text-sm leading-relaxed mb-4">Individuelle Powerbanks für Firmengeschenke, Messen und Werbeaktionen. Vollfarbdruck und Logo-Anpassung verfügbar.</p>
     <ul class="text-slate-500 text-xs space-y-2">
      <li class="flex items-center gap-2"><span class="text-green-500 font-bold">&check;</span> Vollfarbiges Branding</li>
      <li class="flex items-center gap-2"><span class="text-green-500 font-bold">&check;</span> Niedrige MOQ für Pilotbestellungen</li>
      <li class="flex items-center gap-2"><span class="text-green-500 font-bold">&check;</span> Expressversand verfügbar</li>
     </ul>
    </div>
   </div>
  </div>
 </section>

""")
# --- TESTIMONIALS ---
parts.append("""<!-- ========================================================================
 KUNDENSTIMMEN Section
 ======================================================================== -->
 <section class="sec-lg bg-slate-900">
  <div class="max-w-7xl mx-auto px-6">
   <div class="text-center mb-16">
    <div class="inline-block px-4 py-1 bg-brandOrange/10 border border-brandOrange/20 rounded-full text-[11px] font-bold text-brandOrange uppercase tracking-widest mb-6">Kundenfeedback</div>
    <h2 class="text-3xl lg:text-4xl font-black text-white uppercase italic tracking-tighter mb-4">Was unsere B2B-Partner sagen</h2>
    <p class="text-slate-500 max-w-2xl mx-auto">Vertraut von Distributoren, Marken und Einkaufsteams in über 50 Ländern seit 2013.</p>
   </div>

   <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
""")

parts.append(testimonial_card(
    "Wir haben 3.000 Einheiten des WOP23 240W für unseren Amazon DE-Shop bestellt. Die UN38.3-Zertifizierung machte die Zollabwicklung reibungslos. Ein kleines QC-Problem bei der ersten Charge — das Team reagierte innerhalb von 24 Stunden und sendete Ersatz. Zweite Bestellung war perfekt.",
    "Thomas K.", "Amazon-Händler, Unterhaltungselektronik", "München, Deutschland"
))

parts.append(testimonial_card(
    "Als Elektronik-Importeur habe ich mit vielen chinesischen Fabriken gearbeitet. WOWOHCOOL sticht durch die Dokumentationsqualität hervor. Jede Einheit kam mit ordnungsgemäßen CE/FCC-Zertifikaten und die Verpackung erfüllte EU-Vorschriften. Die Semi-Solid-State-Powerbanks verkaufen sich hervorragend.",
    "Klaus B.", "Einkaufsleiter, Elektronik-Distributor", "Hamburg, Deutschland"
))

parts.append(testimonial_card(
    "Wir beschaffen gebrandete Powerbanks für Firmengeschenke. Die 2-in-1-Hybrid-Ladegeräte waren genau das, was unsere Tech-Firmenkunden brauchten. Nico vom Team ist reaktionsschnell. Qualität überzeugt. Empfehlenswert für Großbestellungen im Firmenkundenbereich.",
    "Sandra W.", "Einkaufsleiterin, Werbemittel-Agentur", "Wien, Österreich"
))

parts.append(testimonial_card(
    "Über Alibaba-Verifizierung gefunden. Die Fabrik ist echt — wir haben vor der Bestellung einen Video-Call-Audit durchgeführt. 5.000 Powerbanks mit vollständiger Dokumentation geliefert. Versand per Seefracht dauerte 25 Tage nach Hamburg. DDP-Service funktionierte einwandfrei.",
    "Michael R.", "Geschäftsführer, Import/Export", "Zürich, Schweiz"
))

parts.append(testimonial_card(
    "Erst Muster bestellt (2 Stück) um die Qualität zu testen. Muster wurden schnell versendet und funktionierten einwandfrei. Dann Großbestellung über 2.000 Einheiten des WOP26 140W aufgegeben. Produktion dauerte ca. 30 Tage, QC-Fotos wurden vor dem Versand gesendet. Gute Erfahrung insgesamt.",
    "Jennifer L.", "Einkäuferin, Elektronik-Fachhandel", "Berlin, Deutschland"
))

parts.append("""   </div>

   <div class="text-center mt-12">
    <p class="text-slate-500 text-sm mb-4">Bereit, Ihr Projekt zu starten?</p>
    <button data-action="open-modal" data-product="Power Bank OEM/ODM" class="bg-brandOrange text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm shadow-xl hover:-translate-y-1 transition">
     Angebot Anfragen
    </button>
   </div>
  </div>
 </section>
{% endblock %}
""")

# === WRITE THE FILE ===
with open(OUTPUT, "w", encoding="utf-8") as f:
    f.write("\n".join(parts))

line_count = sum(p.count("\n") for p in parts) + len(parts)
print(f"DE Powerbank page written successfully: {OUTPUT}")
print(f"Approximate line count: {line_count}")

