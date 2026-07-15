import json, re

fpath = 'C:/Users/wowoh/wowohcool.com/src/de/blog/usb-c-pd-3-1-erklaert/index.njk'
with open(fpath, 'r', encoding='utf-8') as f:
    content = f.read()

new_schema = '''<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.wowohcool.com/de/#organization",
      "name": "WOWOHCOOL (Dong Yi Technology Co., Ltd)",
      "url": "https://www.wowohcool.com/de/",
      "logo": "https://www.wowohcool.com/image/wowohcool-logo-optimized.webp",
      "areaServed": ["DE", "AT", "CH", "EU"],
      "sameAs": [
        "https://www.linkedin.com/company/wowohcool",
        "https://www.facebook.com/wowohcoolelectronic",
        "https://www.youtube.com/@WOWOHCOOL",
        "https://x.com/wowohcool"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.wowohcool.com/de/#website",
      "url": "https://www.wowohcool.com/de/",
      "name": "WOWOHCOOL Deutschland",
      "inLanguage": "de",
      "publisher": { "@id": "https://www.wowohcool.com/de/#organization" }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://www.wowohcool.com/de/" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.wowohcool.com/de/blog/" },
        { "@type": "ListItem", "position": 3, "name": "USB-C PD 3.1 Erklart", "item": "https://www.wowohcool.com/de/blog/usb-c-pd-3-1-erklaert/" }
      ]
    },
    {
      "@type": "BlogPosting",
      "headline": "USB-C PD 3.1 OEM: 240W Beschaffung & EU-USB-C-Pflicht 2026",
      "description": "USB-C Power Delivery 3.1 erklart: 240W EPR, SPR vs EPR, AVS-Protokoll, E-Marker-Kabel und was neu in PD 3.2 ist. Vollstandiger technischer Leitfaden 2026 fur OEM-Ladegerat-Einkaufer und Importeure.",
      "author": {
        "@type": "Person",
        "name": "Nina Nico",
        "jobTitle": "Sales Managerin",
        "knowsAbout": ["GaN Ladegerate", "Qi2 Kabelloses Laden", "OEM/ODM Beschaffung", "Supply Chain Management"],
        "sameAs": ["https://www.linkedin.com/in/nico-power-bank-chargers/"]
      },
      "publisher": { "@id": "https://www.wowohcool.com/de/#organization" },
      "datePublished": "2026-07-01",
      "dateModified": "2026-07-14",
      "wordCount": 2600,
      "timeRequired": "PT7M",
      "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.wowohcool.com/de/blog/usb-c-pd-3-1-erklaert/" },
      "image": "https://www.wowohcool.com/image/blog/cover-en/usb-c-pd-3-1-explained.webp",
      "inLanguage": "de",
      "speakable": { "@type": "SpeakableSpecification", "cssSelector": ["h1", "h2", ".speakable"] }
    },
    {
      "@type": "Person",
      "name": "Nina Nico",
      "jobTitle": "Sales Managerin",
      "url": "https://www.linkedin.com/in/nico-power-bank-chargers",
      "sameAs": ["https://www.linkedin.com/in/nico-power-bank-chargers"],
      "worksFor": { "@type": "Organization", "name": "WOWOHCOOL (Dong Yi Technology Co., Ltd)" },
      "knowsAbout": ["GaN Ladegerate", "Qi2 Kabelloses Laden", "OEM/ODM Beschaffung", "USB PD 3.1", "Supply Chain Management"]
    },
    {
      "@type": "HowTo",
      "name": "USB-C PD 3.1 Ladegerat beschaffen: Kabel und Leistungsklasse wahlen",
      "description": "Schritt-fur-Schritt-Anleitung fur OEM-Importeure zur Auswahl des richtigen PD-3.1-Ladegerats und -Kabels.",
      "step": [
        { "@type": "HowToStep", "position": 1, "name": "Leistungsbedarf bestimmen", "itemListElement": [{ "@type": "HowToDirection", "text": "Unter 100W: PD 3.0 SPR reicht (20V/5A). 100-240W: PD 3.1 EPR erforderlich (28V/36V/48V). Prufen Sie die maximale Ladeleistung Ihrer Zielgerate." }] },
        { "@type": "HowToStep", "position": 2, "name": "Kabel spezifizieren", "itemListElement": [{ "@type": "HowToDirection", "text": "Bis 60W: Standard-USB-C-Kabel (3A). 65-100W: 5A E-Marker-Kabel. 140-240W: EPR-fahiges Kabel mit Extended-Power-Range-EMarker zwingend. Falsches Kabel = automatische Drosselung auf 60W." }] },
        { "@type": "HowToStep", "position": 3, "name": "Protokoll-Unterstutzung prufen", "itemListElement": [{ "@type": "HowToDirection", "text": "PPS (20mV-Schritte, 3,3-21V) fur Smartphones. AVS (100mV-Schritte, 15-48V) fur Laptops. PD 3.2-konforme Ladegerate bevorzugen (SPR AVS Pflicht ab Marz 2026 fur Projekte >27W)." }] },
        { "@type": "HowToStep", "position": 4, "name": "EU-Compliance sicherstellen", "itemListElement": [{ "@type": "HowToDirection", "text": "CE (EN 62368-1), RoHS, WEEE-Registrierung (Stiftung EAR). USB-IF-Zertifizierung empfohlen. EU-USB-C-Pflicht fur Notebooks seit April 2026 beachten." }] }
      ]
    },
    {
      "@type": "FAQPage",
      "speakable": { "@type": "SpeakableSpecification", "cssSelector": [".faq-answer"] },
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Was ist USB-C PD 3.1 und welche Bedeutung hat der Standard fur OEM-Ladegerate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "USB Power Delivery 3.1 (PD 3.1) ist eine umfassende Uberarbeitung des USB-Ladeprotokolls, das 2021 vom USB-IF eingefuhrt wurde. Das entscheidende Merkmal: Es verdoppelt die maximale Leistung uber ein einzelnes USB-C-Kabel von 100W auf 240W durch die Einfuhrung des Extended Power Range (EPR) mit neuen Spannungsstufen von 28V, 36V und 48V. Fur OEM-Importeure ist PD 3.1 seit der EU-USB-C-Pflicht fur Notebooks (April 2026) der verbindliche Standard fur Ladegerate ab 100W."
          }
        },
        {
          "@type": "Question",
          "name": "Welche technischen Unterschiede bestehen zwischen PD 3.0 und PD 3.1?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "PD 3.0 unterstutzt bis zu 100W (20V x 5A) im Standard Power Range (SPR). PD 3.1 erweitert dies um den Extended Power Range (EPR) mit neuen Spannungsstufen von 28V, 36V und 48V und ermoglicht so bis zu 240W (48V x 5A). PD 3.1 fuhrt zudem AVS (Adjustable Voltage Supply) ein. Fur die OEM-Beschaffung relevant: EPR erfordert sowohl ein EPR-fahiges Ladegerat als auch ein EPR-fahiges Kabel."
          }
        },
        {
          "@type": "Question",
          "name": "Welche Kabelanforderungen gelten fur PD 3.1 240W in der OEM-Beschaffung?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Fur PD 3.1 uber 100W sind EPR-fahige USB-C-Kabel mit Extended Power Range E-Marker-Chip erforderlich. Standard-100W-Kabel (5A) unterstutzen KEIN 240W-Laden. Ohne das passende Kabel begrenzt das Ladegerat die Ausgangsleistung automatisch auf 60W (3A). EPR-Kabel mussen als Bundle mitbeschafft werden."
          }
        },
        {
          "@type": "Question",
          "name": "Welche Geratekategorien adressiert PD 3.1 EPR?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Stand 2026: MacBook Pro 16 Zoll (140W), Dell XPS- und ThinkPad-Workstation-Modelle, High-End-GaN-Desktop-Ladegerate und Laptop-Powerbanks mit 100W+ Ausgang. Die EU-USB-C-Pflicht fur Notebooks (seit April 2026) eroffnet ein wachsendes Marktsegment fur EPR-fahige Ladegerate im 140-240W Bereich."
          }
        },
        {
          "@type": "Question",
          "name": "Welche technischen Unterschiede bestehen zwischen PPS und AVS?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "PPS passt die Spannung in 20mV-Schritten von 3,3V bis 21V an — optimiert fur Smartphone-Schnellladung. AVS passt die Spannung in 100mV-Schritten von 15V bis 48V an — konzipiert fur Laptops und Hochleistungsgerate. Viele PD 3.1-Ladegerate unterstutzen beide Protokolle."
          }
        }
      ]
    }
  ]
}
</script>'''

start = content.find('<script type="application/ld+json">')
end = content.find('</script>', start) + len('</script>')

content = content[:start] + new_schema + content[end:]

with open(fpath, 'w', encoding='utf-8') as f:
    f.write(content)

# Verify
types = ['Organization', 'WebSite', 'BreadcrumbList', 'BlogPosting', 'Person', 'HowTo', 'FAQPage']
for t in types:
    count = content.count(f'"@type": "{t}"')
    print(f'{t}: {count}')
print('Schema upgrade complete')
