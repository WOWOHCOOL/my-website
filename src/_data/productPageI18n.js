// Product-page module strings for shared partials.
// EN mirrors the existing markup so EN output stays byte-for-byte equivalent.
// DE is the localized pilot; ES/FR/RU/PL fall back to EN until translated.
//
// Used by:
//   partials/model-compare.njk
//   partials/market-certifications.njk
//   partials/subpage-commercial-support.njk
//   partials/case-strip.njk

const locales = {
  en: {
    modelCompare: {
      label: "Specifications",
      titleBefore: 'Compare All <span class="text-brandOrange">',
      titleAfter: " Models</span>",
      desc: "Key specifications side by side. Certification, MOQ and lead-time notes follow the table.",
      caption: "Model comparison: key specifications for all models in this product line",
      model: "Model",
      colLabels: {},
      notes: {}
    },
    marketCertifications: {
      label: "Certification",
      title: 'Certified for <span class="text-brandOrange">Your Market</span>',
      desc: "Standard files ship with every order; market-specific certification is quoted per project.",
      caption: "Certification by target market",
      market: "Market",
      standards: "Standards",
      profiles: {}
    },
    commercialSupport: {
      termsLabel: "Working Together",
      termsTitle: 'MOQ, Lead Times &amp; <span class="text-brandOrange">Trade Terms</span>',
      termsDesc: "The same terms apply across the full {range} range. Figures are factory-direct and confirmed in your quotation.",
      item: "Item",
      standardTerms: "Standard terms",
      caption: "MOQ, sampling, production and trade terms",
      rows: {
        moq: "MOQ",
        sampling: "Sampling",
        mass: "Mass production",
        payment: "Payment",
        trade: "Trade terms",
        packaging: "Packaging"
      },
      values: {
        moq: "From {FACT:moq.stock} units (in-stock ODM) · {FACT:moq.dev} units (ODM development) · {FACT:moq.full} units (full OEM with new tooling)",
        sampling: "{FACT:timeline.odmStockSample} for in-stock ODM · {FACT:timeline.oemSample} for OEM",
        mass: "{FACT:timeline.odmStockProduction} for in-stock ODM · {FACT:timeline.odmNewDevelopmentProduction} for ODM development · {FACT:timeline.oemProduction} for OEM · {FACT:timeline.rushProduction} for rush orders",
        payment: "{FACT:contact.paymentBase}",
        trade: "{FACT:contact.shipping}",
        packaging: "Retail gift box, blister or FNSKU/FBA-ready carton"
      },
      qualityLabel: "Quality &amp; Support",
      qualityTitle: 'From Sample to <span class="text-brandOrange">After-Sales</span>',
      qualityDesc: "Four inspection stages, 100% aging and a documented warranty on every {range} order.",
      steps: [
        { title: "Spec Review", desc: "Share capacity, output, port layout and target market. We shortlist matching stock models or scope a development project." },
        { title: "Sampling", desc: "{FACT:timeline.odmStockSample} for in-stock ODM and {FACT:timeline.oemSample} for OEM. Sample fees are refundable on bulk orders." },
        { title: "Incoming &amp; In-Process QC", desc: "Cells, ICs, PCBs and connectors checked at IQC. Soldering, component placement and wiring monitored at IPQC." },
        { title: "Final &amp; Outgoing QC", desc: "100% 4-hour aging, charge and discharge performance and port function tests at FQC. Packaging and labelling checked at OQC." },
        { title: "Pre-Shipment Inspection", desc: "AQL 0.65 normal and 0.25 tightened sampling, with defect rate held below 0.3% and on-time delivery above 97%." },
        { title: "Warranty &amp; After-Sales", desc: "{FACT:contact.warrantyMonths}-month warranty, spare parts, technical documentation and UN38.3/MSDS files for transport." }
      ]
    },
    caseStrip: {
      label: "Case Studies",
      title: 'Selected <span class="text-brandOrange">Cooperation Cases</span>',
      desc: "Three programmes across the UK, Germany and Denmark. Full case studies cover the brief, the challenge and the delivery data.",
      cta: "View all case studies",
      ctaUrl: "/case-studies/",
      cases: [
        { region: "UK · Premium Lifestyle Tech", name: "Mous", desc: "50,000+ MagSafe-compatible wireless chargers since 2023, across recurring purchase cycles." },
        { region: "Germany · Automotive", name: "Bosch", desc: "10,000 × 65W GaN car chargers delivered on an emergency timeline, with 5-day samples." },
        { region: "Denmark · Design House", name: "Jacob Jensen", desc: "6,000 wireless car mounts with infrared and touch dual-sensing, delivered with zero defects." }
      ]
    }
  },

  de: {
    modelCompare: {
      label: "Technische Daten",
      titleBefore: 'Alle <span class="text-brandOrange">',
      titleAfter: " Modelle vergleichen</span>",
      desc: "Wichtige Spezifikationen im direkten Vergleich. Zertifizierung, MOQ und Lieferzeiten stehen unter der Tabelle.",
      caption: "Modellvergleich: wichtige Spezifikationen aller Modelle dieser Produktlinie",
      model: "Modell",
      colLabels: {
        "Capacity": "Kapazität",
        "Output": "Ausgang",
        "Cable / Feature": "Kabel / Funktion",
        "Plugs": "Stecker",
        "Input": "Eingang",
        "Wired Output": "Kabelgebundener Ausgang",
        "Feature": "Funktion",
        "Display": "Display",
        "Connector / Input": "Anschluss / Eingang",
        "Design": "Design",
        "Phone": "Telefon",
        "Watch": "Uhr",
        "TWS": "TWS",
        "Total Output": "Gesamtausgang",
        "Display / Feature": "Display / Funktion",
        "Plugs / Size": "Stecker / Größe"
      },
      notes: {
        "products/power-bank/semi-solid-state": "Zertifizierung: CE/FCC/RoHS, UN38.3. MOQ je nach Anpassungsstufe: 500 / 1.000–2.000 / 3.000+; Lieferzeit 25–35 / 35–50 / 30–60 Tage.",
        "products/power-bank/2-in-1-hybrid": "Zertifizierung: CE/FCC/RoHS, UN38.3. MOQ je nach Anpassungsstufe: 500 / 1.000–2.000 / 3.000+; Lieferzeit 25–35 / 35–50 / 30–60 Tage.",
        "products/power-bank/laptop-power": "Zertifizierung: CE/FCC/RoHS, UN38.3. MOQ je nach Anpassungsstufe: 500 / 1.000–2.000 / 3.000+; Lieferzeit 25–35 / 35–50 / 30–60 Tage.",
        "products/power-bank/wireless-magnetic": "Zertifizierung: CE/FCC/RoHS, UN38.3; Qi2 WPC wo zutreffend. MOQ je nach Anpassungsstufe: 500 / 1.000–2.000 / 3.000+; Lieferzeit 25–35 / 35–50 / 30–60 Tage.",
        "products/power-bank/smart-display": "Zertifizierung: CE/FCC/RoHS, UN38.3. MOQ je nach Anpassungsstufe: 500 / 1.000–2.000 / 3.000+; Lieferzeit 25–35 / 35–50 / 30–60 Tage.",
        "products/power-bank/heating-battery": "Zertifizierung: CE/FCC/RoHS, UN38.3; ausgewählte Modelle CE/PSE. MOQ je nach Anpassungsstufe: 500 / 1.000–2.000 / 3.000+; Lieferzeit 25–35 / 35–50 / 30–60 Tage.",
        "products/wireless-charger/desktop": "Zertifizierung: Qi2 WPC, CE/FCC/RoHS. MOQ je nach Anpassungsstufe: 500 / 1.000–2.000 / 3.000+; Lieferzeit 25–35 / 35–50 / 30–60 Tage.",
        "products/wireless-charger/3-in-1-station": "Zertifizierung: Qi2 WPC, CE/FCC/RoHS. MOQ je nach Anpassungsstufe: 500 / 1.000–2.000 / 3.000+; Lieferzeit 25–35 / 35–50 / 30–60 Tage.",
        "products/wireless-charger/car-mount": "Zertifizierung: Qi2 WPC, CE/FCC/RoHS; E-Mark für EU-Automotive auf Anfrage. MOQ je nach Anpassungsstufe: 500 / 1.000–2.000 / 3.000+; Lieferzeit 25–35 / 35–50 / 30–60 Tage.",
        "products/car-charger": "Zertifizierung: CE/FCC; E-Mark für EU-Automotive. MOQ je nach Anpassungsstufe: 500 / 1.000–2.000 / 3.000+; Lieferzeit 25–35 / 35–50 / 30–60 Tage.",
        "products/gan-charger": "Zertifizierung: CE/FCC; UL 62368-1, PSE und KC auf Anfrage. MOQ je nach Anpassungsstufe: 500 / 1.000–2.000 / 3.000+; Lieferzeit 25–35 / 35–50 / 30–60 Tage."
      }
    },
    marketCertifications: {
      label: "Zertifizierung",
      title: 'Zertifiziert für <span class="text-brandOrange">Ihren Markt</span>',
      desc: "Standardunterlagen liegen jeder Bestellung bei; marktspezifische Zertifizierung wird pro Projekt kalkuliert.",
      caption: "Zertifizierung nach Zielmarkt",
      market: "Markt",
      standards: "Normen",
      profiles: {
        "power-bank": {
          rows: [
            { market: "Deutschland / EU", standards: "CE (LVD + EMC), RoHS, REACH, UN38.3" },
            { market: "Deutschland", standards: "WEEE-/EAR-Registrierung, Verpackungs-EPR (LUCID)" },
            { market: "Optional", standards: "TÜV GS" }
          ],
          note: "CE-, RoHS- und UN38.3-Unterlagen liegen jeder Batteriebestellung bei. WEEE-/EAR-Registrierung und Verpackungs-EPR werden pro Projekt kalkuliert; TÜV GS auf Anfrage."
        },
        "wireless": {
          rows: [
            { market: "Deutschland / EU", standards: "CE (LVD + EMC), RoHS, REACH, Qi2 WPC" },
            { market: "Deutschland", standards: "WEEE-/EAR-Registrierung, Verpackungs-EPR (LUCID)" },
            { market: "Optional", standards: "TÜV GS" }
          ],
          note: "CE-, RoHS- und Qi2-WPC-Unterlagen liegen jeder Wireless-Bestellung bei. WEEE-/EAR-Registrierung und Verpackungs-EPR werden pro Projekt kalkuliert; TÜV GS auf Anfrage."
        },
        "car-mount": {
          rows: [
            { market: "Deutschland / EU", standards: "CE, RoHS, E-Mark (ECE R10), Qi2 WPC" },
            { market: "Deutschland", standards: "WEEE-/EAR-Registrierung, Verpackungs-EPR (LUCID)" },
            { market: "Optional", standards: "TÜV GS" }
          ],
          note: "CE-, RoHS- und E-Mark-Unterlagen liegen jeder Bestellung bei. WEEE-/EAR-Registrierung und Verpackungs-EPR werden pro Projekt kalkuliert; TÜV GS auf Anfrage."
        },
        "car-charger": {
          rows: [
            { market: "Deutschland / EU", standards: "CE, RoHS, E-Mark (ECE R10)" },
            { market: "Deutschland", standards: "WEEE-/EAR-Registrierung, Verpackungs-EPR (LUCID)" },
            { market: "Optional", standards: "TÜV GS" }
          ],
          note: "CE-, RoHS- und E-Mark-Unterlagen liegen jeder Bestellung bei. WEEE-/EAR-Registrierung und Verpackungs-EPR werden pro Projekt kalkuliert; TÜV GS auf Anfrage."
        },
        "gan-charger": {
          rows: [
            { market: "Deutschland / EU", standards: "CE (LVD + EMC), RoHS, REACH" },
            { market: "Deutschland", standards: "WEEE-/EAR-Registrierung, Verpackungs-EPR (LUCID)" },
            { market: "Optional", standards: "TÜV GS" }
          ],
          note: "CE-, RoHS- und REACH-Unterlagen liegen jeder Bestellung bei. WEEE-/EAR-Registrierung und Verpackungs-EPR werden pro Projekt kalkuliert; TÜV GS auf Anfrage."
        }      }
    },
    commercialSupport: {
      termsLabel: "Zusammenarbeit",
      termsTitle: 'MOQ, Lieferzeiten &amp; <span class="text-brandOrange">Handelsbedingungen</span>',
      termsDesc: "Diese Bedingungen gelten für die gesamte {range}. Alle Werte sind ab Werk und werden im Angebot bestätigt.",
      item: "Position",
      standardTerms: "Standardbedingungen",
      caption: "MOQ, Muster, Produktion und Handelsbedingungen",
      rows: {
        moq: "MOQ",
        sampling: "Muster",
        mass: "Serienproduktion",
        payment: "Zahlung",
        trade: "Handelsbedingungen",
        packaging: "Verpackung"
      },
      values: {
        moq: "Ab {FACT:moq.stock} Stück (ODM ab Lager) · {FACT:moq.dev} Stück (ODM-Entwicklung) · {FACT:moq.full} Stück (OEM mit neuem Werkzeug)",
        sampling: "{FACT:timeline.odmStockSample} für ODM ab Lager · {FACT:timeline.oemSample} für OEM",
        mass: "{FACT:timeline.odmStockProduction} für ODM ab Lager · {FACT:timeline.odmNewDevelopmentProduction} für ODM-Entwicklung · {FACT:timeline.oemProduction} für OEM · {FACT:timeline.rushProduction} für Eilaufträge",
        payment: "{FACT:contact.paymentBase}",
        trade: "{FACT:contact.shipping}",
        packaging: "Verkaufsfertige Geschenkbox, Blister oder FNSKU-/FBA-Karton"
      },
      qualityLabel: "Qualität &amp; Support",
      qualityTitle: 'Vom Muster bis zum <span class="text-brandOrange">After-Sales</span>',
      qualityDesc: "Vier Prüfstufen, 100 % Aging und dokumentierte Garantie für jede {range}-Bestellung.",
      steps: [
        { title: "Spezifikationsprüfung", desc: "Kapazität, Ausgang, Port-Layout und Zielmarkt abstimmen. Wir shortlisten passende Lagerware oder skizzieren ein Entwicklungsprojekt." },
        { title: "Muster", desc: "{FACT:timeline.odmStockSample} für ODM ab Lager und {FACT:timeline.oemSample} für OEM. Musterkosten werden bei Serienbestellung erstattet." },
        { title: "Wareneingangs- &amp; In-Prozess-QC", desc: "Zellen, ICs, PCBs und Stecker werden bei der IQC geprüft. Löten, Bestückung und Verkabelung werden in der IPQC überwacht." },
        { title: "End- &amp; Ausgangs-QC", desc: "100 % 4-Stunden-Aging, Lade-/Entladeleistung und Portfunktion in der FQC. Verpackung und Kennzeichnung in der OQC." },
        { title: "Versandprüfung", desc: "AQL 0,65 normal und 0,25 verschärft; Fehlerquote unter 0,3 % und termingerechte Lieferung über 97 %." },
        { title: "Garantie &amp; After-Sales", desc: "{FACT:contact.warrantyMonths} Monate Garantie, Ersatzteile, technische Dokumentation und UN38.3-/MSDS-Dateien für den Transport." }
      ]
    },
    caseStrip: {
      label: "Fallstudien",
      title: 'Ausgewählte <span class="text-brandOrange">Kooperationsprojekte</span>',
      desc: "Drei Programme in Großbritannien, Deutschland und Dänemark. Die vollständigen Fallstudien zeigen Briefing, Herausforderung und Lieferdaten.",
      cta: "Alle Fallstudien ansehen",
      ctaUrl: "/de/fallbeispiele/",
      cases: [
        { region: "UK · Premium Lifestyle Tech", name: "Mous", desc: "Über 50.000 MagSafe-kompatible kabellose Ladegeräte seit 2023, über wiederkehrende Bestellzyklen." },
        { region: "Deutschland · Automotive", name: "Bosch", desc: "10.000 × 65W-GaN-Autoladegeräte im Eiltempo geliefert, mit 5-Tage-Mustern." },
        { region: "Dänemark · Designhaus", name: "Jacob Jensen", desc: "6.000 kabellose Kfz-Halterungen mit Infrarot- und Touch-Dual-Sensorik, ohne Fehler geliefert." }
      ]
    }
  }
};

// ES/FR/RU/PL reuse the EN module strings except for the market-certification
// table, which is localized per target market (EU + national EPR / EAEU).
const withMarketCertifications = (marketCertifications) => ({
  ...locales.en,
  marketCertifications: {
    ...locales.en.marketCertifications,
    ...marketCertifications
  }
});

module.exports = {
  ...locales,
  es: withMarketCertifications({
    label: "Certificación",
    title: 'Certificado para <span class="text-brandOrange">su mercado</span>',
    desc: "Los documentos estándar acompañan cada pedido; la certificación específica de mercado se cotiza por proyecto.",
    caption: "Certificación por mercado de destino",
    market: "Mercado",
    standards: "Normas",
    profiles: {
      "power-bank": {
        rows: [
          { market: "España / UE", standards: "CE (LVD + EMC), RoHS, REACH, UN38.3" },
          { market: "España", standards: "RII-AEE (RD 110/2015), RII-PYA (RD 106/2008), EPR de envases (RD 1055/2022)" },
          { market: "Exportación", standards: "FCC SDoC; UL 62368-1 bajo proyecto" }
        ],
        note: "CE, RoHS y UN38.3 acompañan cada pedido de baterías. El registro RII-AEE / RII-PYA y el EPR de envases se gestionan por proyecto; UL se cotiza aparte."
      },
      "wireless": {
        rows: [
          { market: "España / UE", standards: "CE (LVD + EMC), RoHS, REACH, Qi2 WPC" },
          { market: "España", standards: "RAEE, EPR de envases (RD 1055/2022)" },
          { market: "Exportación", standards: "FCC SDoC; FCC ID para inalámbrico" }
        ],
        note: "CE, RoHS y Qi2 WPC acompañan cada pedido inalámbrico. El registro RAEE y el EPR de envases se cotizan por proyecto."
      },
      "car-mount": {
        rows: [
          { market: "España / UE", standards: "CE, RoHS, E-Mark (ECE R10), Qi2 WPC" },
          { market: "España", standards: "RAEE, EPR de envases (RD 1055/2022)" },
          { market: "Exportación", standards: "FCC" }
        ],
        note: "CE, RoHS y E-Mark acompañan cada pedido. La homologación E-Mark específica y el registro RAEE se cotizan por proyecto."
      },
      "car-charger": {
        rows: [
          { market: "España / UE", standards: "CE, RoHS, E-Mark (ECE R10)" },
          { market: "España", standards: "RAEE, EPR de envases (RD 1055/2022)" },
          { market: "Exportación", standards: "FCC; UL 62368-1 bajo proyecto" }
        ],
        note: "CE, RoHS y E-Mark acompañan cada pedido. El registro RAEE y el EPR de envases se cotizan por proyecto."
      },
      "gan-charger": {
        rows: [
          { market: "España / UE", standards: "CE (LVD + EMC), RoHS, REACH" },
          { market: "España", standards: "RAEE, EPR de envases (RD 1055/2022)" },
          { market: "Exportación", standards: "FCC; UL 62368-1 bajo proyecto" }
        ],
        note: "CE, RoHS y REACH acompañan cada pedido. El registro RAEE y el EPR de envases se cotizan por proyecto."
      }
    }
  }),
  fr: withMarketCertifications({
    label: "Certification",
    title: 'Certifié pour <span class="text-brandOrange">votre marché</span>',
    desc: "Les documents standards accompagnent chaque commande ; la certification propre au marché est chiffrée par projet.",
    caption: "Certification par marché de destination",
    market: "Marché",
    standards: "Normes",
    profiles: {
      "power-bank": {
        rows: [
          { market: "France / UE", standards: "CE (LVD + EMC), RoHS, REACH, UN38.3" },
          { market: "France", standards: "EPR ADEME (DEEE + piles), Triman, EPR emballages (Citeo)" },
          { market: "Option", standards: "TÜV GS" }
        ],
        note: "Les dossiers CE, RoHS et UN38.3 accompagnent chaque commande de batteries. L'enregistrement EPR, le Triman et l'EPR emballages sont chiffrés par projet ; TÜV GS sur demande."
      },
      "wireless": {
        rows: [
          { market: "France / UE", standards: "CE (LVD + EMC), RoHS, REACH, Qi2 WPC" },
          { market: "France", standards: "EPR ADEME (DEEE), Triman, EPR emballages (Citeo)" },
          { market: "Option", standards: "TÜV GS" }
        ],
        note: "Les dossiers CE, RoHS et Qi2 WPC accompagnent chaque commande sans fil. L'enregistrement EPR et le Triman sont chiffrés par projet."
      },
      "car-mount": {
        rows: [
          { market: "France / UE", standards: "CE, RoHS, E-Mark (ECE R10), Qi2 WPC" },
          { market: "France", standards: "EPR ADEME (DEEE), Triman, EPR emballages (Citeo)" },
          { market: "Option", standards: "TÜV GS" }
        ],
        note: "Les dossiers CE, RoHS et E-Mark accompagnent chaque commande. L'homologation E-Mark et l'enregistrement EPR sont chiffrés par projet."
      },
      "car-charger": {
        rows: [
          { market: "France / UE", standards: "CE, RoHS, E-Mark (ECE R10)" },
          { market: "France", standards: "EPR ADEME (DEEE), Triman, EPR emballages (Citeo)" },
          { market: "Option", standards: "TÜV GS" }
        ],
        note: "Les dossiers CE, RoHS et E-Mark accompagnent chaque commande. L'enregistrement EPR et le Triman sont chiffrés par projet."
      },
      "gan-charger": {
        rows: [
          { market: "France / UE", standards: "CE (LVD + EMC), RoHS, REACH" },
          { market: "France", standards: "EPR ADEME (DEEE), Triman, EPR emballages (Citeo)" },
          { market: "Option", standards: "TÜV GS" }
        ],
        note: "Les dossiers CE, RoHS et REACH accompagnent chaque commande. L'enregistrement EPR et le Triman sont chiffrés par projet."
      }
    }
  }),
  ru: withMarketCertifications({
    label: "Сертификация",
    title: 'Сертифицировано для <span class="text-brandOrange">вашего рынка</span>',
    desc: "Стандартные документы идут с каждой партией; сертификация под конкретный рынок рассчитывается по проекту.",
    caption: "Сертификация по рынку сбыта",
    market: "Рынок",
    standards: "Нормы",
    profiles: {
      "power-bank": {
        rows: [
          { market: "Россия / ЕАЭС", standards: "EAC — ТР ТС 020/2011 (ЭМС), ТР ЕАЭС 037/2016 (RoHS)" },
          { market: "Транспорт", standards: "UN38.3, MSDS" },
          { market: "Экспорт (ЕС / США)", standards: "CE, FCC — по запросу" }
        ],
        note: "Документы UN38.3 и MSDS идут с каждой партией. Сертификация EAC оформляется под проект; CE и FCC — по запросу для экспорта."
      },
      "wireless": {
        rows: [
          { market: "Россия / ЕАЭС", standards: "EAC — ТР ТС 020/2011 (ЭМС), ТР ЕАЭС 037/2016 (RoHS), Qi2 WPC" },
          { market: "Транспорт", standards: "UN38.3, MSDS" },
          { market: "Экспорт (ЕС / США)", standards: "CE, FCC — по запросу" }
        ],
        note: "Документы Qi2 WPC, UN38.3 и MSDS идут с каждой партией. Сертификация EAC оформляется под проект."
      },
      "car-mount": {
        rows: [
          { market: "Россия / ЕАЭС", standards: "EAC — ТР ТС 020/2011 (ЭМС), ТР ЕАЭС 037/2016 (RoHS)" },
          { market: "ЕС", standards: "E-Mark (ECE R10), CE — по запросу" },
          { market: "Транспорт", standards: "UN38.3, MSDS" }
        ],
        note: "Документы UN38.3 и MSDS идут с каждой партией. EAC и E-Mark оформляются под проект."
      },
      "car-charger": {
        rows: [
          { market: "Россия / ЕАЭС", standards: "EAC — ТР ТС 020/2011 (ЭМС), ТР ЕАЭС 037/2016 (RoHS)" },
          { market: "ЕС", standards: "E-Mark (ECE R10), CE — по запросу" },
          { market: "Экспорт (США)", standards: "FCC — по запросу" }
        ],
        note: "Базовые документы идут с каждой партией. Сертификация EAC и E-Mark оформляется под проект."
      },
      "gan-charger": {
        rows: [
          { market: "Россия / ЕАЭС", standards: "EAC — ТР ТС 020/2011 (ЭМС), ТР ЕАЭС 037/2016 (RoHS)" },
          { market: "Экспорт (ЕС / США)", standards: "CE, FCC — по запросу" },
          { market: "Опция", standards: "PSE, KC — по проекту" }
        ],
        note: "Базовые документы идут с каждой партией. Сертификация EAC оформляется под проект; CE и FCC — по запросу."
      }
    }
  }),
  pl: withMarketCertifications({
    label: "Certyfikacja",
    title: 'Certyfikowane na <span class="text-brandOrange">Twój rynek</span>',
    desc: "Standardowe dokumenty dołączamy do każdego zamówienia; certyfikacja rynkowa jest wyceniana indywidualnie.",
    caption: "Certyfikacja według rynku docelowego",
    market: "Rynek",
    standards: "Normy",
    profiles: {
      "power-bank": {
        rows: [
          { market: "Polska / UE", standards: "CE (LVD + EMC), RoHS, REACH, UN38.3" },
          { market: "Polska", standards: "Rejestracja BDO, EPR opakowań" },
          { market: "Eksport", standards: "FCC SDoC; UL 62368-1 na zamówienie" }
        ],
        note: "Dokumenty CE, RoHS i UN38.3 dołączamy do każdego zamówienia baterii. Rejestracja BDO i EPR opakowań są wyceniane indywidualnie; UL na zapytanie."
      },
      "wireless": {
        rows: [
          { market: "Polska / UE", standards: "CE (LVD + EMC), RoHS, REACH, Qi2 WPC" },
          { market: "Polska", standards: "Rejestracja BDO, EPR opakowań" },
          { market: "Eksport", standards: "FCC SDoC; FCC ID dla urządzeń bezprzewodowych" }
        ],
        note: "Dokumenty CE, RoHS i Qi2 WPC dołączamy do każdego zamówienia. Rejestracja BDO i EPR opakowań są wyceniane indywidualnie."
      },
      "car-mount": {
        rows: [
          { market: "Polska / UE", standards: "CE, RoHS, E-Mark (ECE R10), Qi2 WPC" },
          { market: "Polska", standards: "Rejestracja BDO, EPR opakowań" },
          { market: "Eksport", standards: "FCC" }
        ],
        note: "Dokumenty CE, RoHS i E-Mark dołączamy do każdego zamówienia. Homologacja E-Mark i rejestracja BDO są wyceniane indywidualnie."
      },
      "car-charger": {
        rows: [
          { market: "Polska / UE", standards: "CE, RoHS, E-Mark (ECE R10)" },
          { market: "Polska", standards: "Rejestracja BDO, EPR opakowań" },
          { market: "Eksport", standards: "FCC; UL 62368-1 na zamówienie" }
        ],
        note: "Dokumenty CE, RoHS i E-Mark dołączamy do każdego zamówienia. Rejestracja BDO i EPR opakowań są wyceniane indywidualnie."
      },
      "gan-charger": {
        rows: [
          { market: "Polska / UE", standards: "CE (LVD + EMC), RoHS, REACH" },
          { market: "Polska", standards: "Rejestracja BDO, EPR opakowań" },
          { market: "Eksport", standards: "FCC; UL 62368-1 na zamówienie" }
        ],
        note: "Dokumenty CE, RoHS i REACH dołączamy do każdego zamówienia. Rejestracja BDO i EPR opakowań są wyceniane indywidualnie."
      }
    }
  })
};
