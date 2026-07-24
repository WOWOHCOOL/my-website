p = r'C:\Users\wowoh\wowohcool.com\src\blog\certifications-us-eu-guide\index.njk'
with open(p, 'r', encoding='utf-8') as f:
    c = f.read()

old = '''   {
"@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What certifications do I need to sell chargers in the US?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For the US market, you need FCC (electromagnetic interference) and UL (safety) certifications. UL 62368-1 is the standard for power adapters and chargers. ETL and CSA are accepted alternatives to UL."
          }
        },
        {
          "@type": "Question",
          "name": "What certifications are required for EU charger sales?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "CE marking is mandatory for the EU market, covering Low Voltage Directive (LVD), EMC Directive, and RoHS. The EN 62368-1 safety standard applies. Additional EcoDesign requirements (EU 2019/1782) regulate standby power consumption."
          }
        },
        {
          "@type": "Question",
          "name": "How long does charger certification typically take?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "FCC certification takes 2-3 weeks, CE marking 3-4 weeks, and UL certification 6-10 weeks. Using a manufacturer with pre-certified platforms can reduce timelines by 6-10 weeks. WOWOHCOOL helps over 200 brands navigate certification annually."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between CE and FCC certification?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "CE (Conformit\u00e9 Europ\u00e9enne) is required for the European market and covers safety, EMC, and RoHS directives. FCC (Federal Communications Commission) is required for the US market and focuses on electromagnetic interference. Both require testing by accredited laboratories."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need different certifications for different charger types?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Charger certification requirements differ by product type. Wireless chargers need Qi/WPC certification and FOD testing. GaN chargers require additional thermal and EMC testing. Power banks need UN38.3 for battery safety. Car chargers require E-Mark certification for automotive use."
          }
        },
        {
          "@type": "Question",
          "name": "Can Chinese labs still perform FCC certification testing?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. In May 2026, the FCC voted to prohibit China-based testing laboratories from performing equipment authorization for US-bound electronics. All new FCC certifications must now use US-based, EU-based, or other approved NRTLs such as TUV, Intertek, or UL. Existing certifications issued by Chinese labs remain valid."
          }
        },
        {
          "@type": "Question",
          "name": "Is my existing FCC certification still valid after the Chinese lab ban?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. All existing FCC certifications remain valid regardless of which lab performed the testing. The ban only applies to new certification applications submitted after the rule takes effect. Products already certified are grandfathered and do not require retesting."
          }
        }
      ]'''

new = '''   {
"@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What certifications do OEM importers need to sell chargers in the US?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "FCC Part 15B mandatory (SDoC for wired, FCC ID for wireless). UL 62368-1 is commercially essential, Amazon and major retailers require UL listing or face delisting. ETL/CSA are accepted NRTL alternatives. Budget $1,500-3,000 for UL, $500-1,200 for FCC SDoC. Timeline: 6-10 weeks for full US certification. DOE Level VI energy efficiency compliance is also mandatory for external power supplies."
          }
        },
        {
          "@type": "Question",
          "name": "What certifications are required for EU charger sales?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "CE marking covering LVD (EN 62368-1), EMC Directive (EN 55032/55035), and RoHS. EU Common Charger Directive 2022/2380 mandates USB-C for all chargers. EcoDesign 2025/2052: standby \u22640.1W, active efficiency \u226587%. WEEE registration required. The importer must sign the Declaration of Conformity in their own company name, a factory's DoC is legally invalid. Budget $1,500-3,500 for full CE compliance."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between UL, CE, FCC, and RoHS?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "CE (EU) covers safety + EMC + RoHS + energy efficiency, it is comprehensive conformity. FCC (US) covers electromagnetic interference only, it does not address electrical safety. UL fills the US safety gap commercially and is required by major retailers. RoHS restricts hazardous substances and is mandatory for both EU and US markets."
          }
        },
        {
          "@type": "Question",
          "name": "How long does certification take and how much does it cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "FCC: 2-4 weeks, $500-1,200. CE: 3-6 weeks, $1,500-3,500. UL: 6-10 weeks, $1,500-3,000 plus $1,500-3,000 annual factory audit. Full US+EU certification package: $3,000-8,000 per SKU. Using pre-certified ODM platforms reduces timeline to 3-4 weeks. CE/FCC/RoHS package with UN38.3 included: $2,000-4,000."
          }
        },
        {
          "@type": "Question",
          "name": "Can OEM buyers use a pre-certified ODM platform instead of certifying from scratch?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Many ODM manufacturers offer charger platforms that already carry UL, CE, and FCC certifications. OEM buyers can customize branding, connectors, cables, and packaging while leveraging the ODM's pre-approved certification work. This reduces certification timeline from 8-16 weeks to 3-4 weeks and cuts costs by 50-70%."
          }
        },
        {
          "@type": "Question",
          "name": "Can Chinese labs still perform FCC certification testing in 2026?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. In May 2026, the FCC voted to prohibit China-based testing laboratories from performing equipment authorization for US-bound electronics. All new FCC certifications must use US-based, EU-based, or other approved NRTLs such as TUV, Intertek, or UL. Existing certifications issued by Chinese labs remain valid."
          }
        },
        {
          "@type": "Question",
          "name": "Who is legally responsible for certification \u2014 the factory or the importer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The importer bears full legal responsibility. The Declaration of Conformity must be in your company name. Your company name and address must appear on packaging as the responsible party. The factory's CE certificate with their name as declaration holder will be rejected by customs authorities."
          }
        },
        {
          "@type": "Question",
          "name": "What should OEM importers check before shipping their first order?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Five-point pre-shipment checklist: verify certifications match your exact SKU, confirm hardware matches the certified unit, get FCC ID/UL file numbers cross-checked on official databases, lock the BOM in your purchase agreement to prevent component substitutions, and archive original test reports for customs and retailer onboarding."
          }
        }
      ]'''

if old in c:
    c = c.replace(old, new)
    with open(p, 'w', encoding='utf-8') as f:
        f.write(c)
    print('Schema synced: 8 FAQs, 0 first-person')
else:
    print('NOT FOUND')
