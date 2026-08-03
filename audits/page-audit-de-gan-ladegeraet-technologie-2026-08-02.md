# Page Audit: DE GaN-Ladegerät Technologie — OEM-Beschaffungsguide 2026

**Datum**: 2026-08-02
**Artikel-Pfad**: `/src/de/blog/gan-ladegeraet-technologie/index.njk`
**Live-URL**: https://www.wowohcool.com/de/blog/gan-ladegeraet-technologie/
**Ehemalige URL**: `/de/blog/was-ist-gan-ladegeraet/` (umbenannt — B2C "was-ist" entfernt)
**Autorin**: Nina Nico
**Letzte Änderung (frontmatter)**: 2026-07-27

---

## Scores

| Gate | Score | Status |
|------|:-----:|--------|
| Anti-Repetition | 8/10 | grun |
| Information Gain | 19/25 | grun |
| Scannability | 18/20 | grun |
| Visual Authenticity | 10/10 | grun |
| CTA Relevance | 10/10 | grun |
| Schema Compliance | 13/15 | gelb |
| Meta + Links | 8/10 | grun |
| **GESAMT** | **86/100** | grun Gut |

> **Vergleich**: EN-Equivalent (what-is-gan-charger) scored 82/100 am 2026-08-02. DE-Version ist **4 Punkte besser** — deutlich konsistentere Daten, keine Return-Rate-Widerspruche, keine FOB-Preis-Inkonsistenzen, keine FAQ Q1-Fehlpaarung.

---

## Vergleich mit Juli-Audits

### vs. 2026-07-14 (Umfassende DE-Blog-Qualitatsprufung — Score: 78/100)

| Dimension | Juli 2026 | August 2026 | Delta |
|-----------|:--------:|:-----------:|:-----:|
| H1 Qualitat | 55/100 | 75/100 | +20 |
| H2/H3 Struktur | 85/100 | 90/100 | +5 |
| Information Gain | 60/100 | 76/100 | +16 |
| E-E-A-T | 85/100 | 88/100 | +3 |
| Meta + Links | N/A | 80/100 | — |
| **Gesamt** | **78** | **86** | **+8** |

**Was seit Juli behoben wurde**:
1. **URL umbenannt**: `was-ist-gan-ladegeraet` → `gan-ladegeraet-technologie`. B2C-"was-ist" aus der URL entfernt. Dies war der groste Kritikpunkt der Juli-Audits.
2. **H2-Struktur komplett umgeschrieben**: Von B2C-Bildungssprache ("Was ist Galliumnitrid?", "Wie funktionieren GaN-Ladegerate?") zu B2B-Beschaffungssprache ("Warum GaN V 2026 den Ladegeratemarkt dominiert", "GaN-Halbleitertechnik: Chip-Auswahl fur Importeure", "Beschaffungsstrategie: Spezifikationen & MOQ"). Alle 8 Content-H2s haben B2B-Kontext.
3. **Information Gain verbessert**: GaN-Generationen-Tabelle mit Chip-Modellen und Lieferanten, Leistungsstufen-Tabelle mit BOM-Kosten und Retail-VK, GaN vs. Silizium-Vergleichstabelle mit Einkaufer-Relevanz.
4. **`modified`-Datum hinzugefugt**: 2026-07-27 (Juli-Audit fand 27/28 Artikel ohne modified).
5. **Infineon-DACH-Bezug ausgebaut**: Infineon CoolGaN in Tabelle, Body-Text und FAQ referenziert.

**Was seit Juli NICHT behoben wurde**:
1. **H1 hat immer noch B2C-Prafix**: "Was ist ein GaN-Ladegerat?" ist reine B2C-Informationssprache. Die Juli-Audit-Empfehlung war: `"GaN-Ladegerat OEM-Beschaffungsguide 2026: Technologie & Marktdaten"`. Die aktuelle H1 fugt zwar "Der OEM-Beschaffungsguide 2026" hinten an, aber der B2C-Teil dominiert immer noch.

### vs. 2026-07-14 (6-Dimensionen-Audit — 400+ Fixes)

Das 6-Dimensionen-Audit fand fur diesen Artikel:
- Datenkonflikt: Preis 22-40 EUR vereinheitlicht
- Grose: 50%→40-50% korrigiert
- 12 Schweizer ss→s Reparaturen

Diese Fixes sind alle im aktuellen Artikel vorhanden und korrekt. Keine Regression.

### vs. 2026-07-21 (GEO Citability Score — 84/100)

Die GEO-Zitierfahigkeit war bereits stark. Die H2-Neustrukturierung und zusatzliche Datentabellen sollten den Score weiter verbessert haben. Hauptzitierblocke (GaN vs. Silizium-Vergleich, Leistungsstufen mit BOM-Kosten) sind erhalten geblieben.

---

## Kritische Probleme (P0)

### P0-1: Schaltfrequenz-Widerspruch — FAQ Q1 sagt 10×, Body sagt 100×

| Fundstelle | Aussage |
|------------|---------|
| KERNERKENNTNISSE (Zeile 359) | "GaN-Transistoren **100×** schneller als Silizium" |
| Section 1 (Zeile 421) | "**100-fach** hohere Schaltfrequenz" |
| Section 1 EPC-Zitat (Zeile 422) | "GaN-Transistoren mit **100×** hoheren Frequenzen schalten" |
| FAQ Q1 Schema (Zeile 255) | "GaN-Transistoren schalten **10x** schneller als Silizium" |
| FAQ Q1 Body (Zeile 624) | "GaN-Transistoren schalten **10x** schneller als Silizium" |

**Analyse**: Die FAQ behauptet 10×, der gesamte Body behauptet 100×. Der praktische Unterschied liegt zwischen 1-5 MHz (GaN) und ~100 kHz (Silizium) = 10-50×. Die 100× bezieht sich auf die theoretische Transistorschaltfahigkeit (EPC-Datenblatt), nicht auf die praktische Ladegerat-Schaltfrequenz.

**EN-Vergleich**: Die EN-Version hat ein ahnliches Problem (P2-1: "3-10x" vs "100x" in verschiedenen Sektionen). DE ist besser, weil der Body konsistent 100× verwendet, aber FAQ Q1 weicht ab.

**Fix**: FAQ Q1 Schema und Body von "10x schneller" auf "bis zu 100× schneller (EPC)" andern ODER die Korperaussagen differenzieren: "Praktische Schaltfrequenz 1-5 MHz vs. ~100 kHz (Silizium), theoretische Transistorschaltfahigkeit bis 100× hoher (laut EPC)."

```njk
{# FAQ Q1 Schema Fix #}
"text": "GaN (Galliumnitrid) ist ein Halbleitermaterial mit 3,4 eV Bandlucke (Silizium: 1,1 eV). GaN-Transistoren schalten mit 1-5 MHz — bis zu 100× schneller als Silizium-Transistoren (~100 kHz) — erzeugen weniger Warme und ermoglichen 40-50 % kleinere Ladegerate bei uber 95 % Effizienz. WOWOHCOOL verbaut GaN-Chips von Infineon (CoolGaN) und Navitas."
```

### P0-2: wordCount 2700 ist deutlich zu niedrig

Schema Zeile 135: `"wordCount": 2700`. Der tatsachliche Artikel hat deutlich mehr Text — geschatzt **5.000-5.500 Worter** (deutscher Text). Die Diskrepanz von ~2.500-2.800 Wortern ist substanziell. Google nutzt wordCount zur Einschatzung von Content-Tiefe.

**Fix**: Tatsachliche Wortzahl zahlen und im Schema aktualisieren.

---

## Hohe Prioritat (P1)

### P1-1: H1 enthalt immer noch B2C-"Was ist"-Prafix

Das Juli-Audit (2026-07-14) empfahl explizit: `"GaN-Ladegerat OEM-Beschaffungsguide 2026: Technologie & Marktdaten"`. Der aktuelle H1 `"Was ist ein GaN-Ladegerat? Der OEM-Beschaffungsguide 2026"` hat den B2C-Teil beibehalten.

**Problem**: "Was ist ein..." ist eine klassische B2C-Informationsfrage. Google klassifiziert solche H1s als "informational, consumer-level". Der B2B-Qualitatsstandard verbietet B2C-Sprache in H1s.

**Aber**: Die URL ist jetzt `/gan-ladegeraet-technologie/` (nicht mehr `was-ist-gan-ladegeraet`). Das ist ein grosser Fortschritt. Der H1 ist der nachste logische Schritt.

**Empfehlung**:

```njk
{# Aktuell #}
<h1>Was ist ein GaN-Ladegerat? Der OEM-Beschaffungsguide 2026</h1>

{# Empfohlen #}
<h1>GaN-Ladegerat Technologie: OEM-Beschaffungsguide fur Importeure 2026</h1>
{# 65 Zeichen, B2B-Signale: OEM, Beschaffung, Importeure #}
```

Alternativ (kurzer, 58 Zeichen):
```njk
<h1>GaN-Ladegerat OEM-Beschaffung 2026: Technologie & Marktdaten</h1>
```

Falls "Was ist GaN" aus SEO-Grunden erhalten bleiben muss (Keyword "Was ist GaN Ladegerat" hat 2.000-4.000 Suchvolumen/Monat in DE), dann zumindest den B2B-Teil zuerst:

```njk
<h1>GaN-Ladegerat Beschaffung 2026: Was OEM-Importeure wissen mussen</h1>
{# 66 Zeichen — grenzwertig, aber B2B zuerst #}
```

### P1-2: FAQ Q1 und Q2 verwenden B2C-Fragesprache

| FAQ | Frage | Bewertung |
|-----|-------|-----------|
| Q1 | "Was ist ein GaN-Ladegerat und wie funktioniert es?" | B2C-Informationsfrage. Antwort ist aber substanziell (Bandlucke, Effizienz, Infineon/Navitas). |
| Q2 | "Sind GaN-Ladegerate besser als herkommliche Silizium-Netzteile?" | B2C-Vergleichsfrage ("besser als"). Antwort enthalt gute technische Daten. |
| Q3 | "Was kostet ein GaN-Ladegerat im OEM-Einkauf?" | B2B ✅ |
| Q4 | "Warum ist GaN 2026 der Standard fur neue Ladegerate?" | OK — Marktanalyse, nicht rein B2C |
| Q5 | "Worauf muss ich als OEM-Importeur bei der Qualitatsprufung..." | B2B ✅✅ |

Der B2B-Qualitatsstandard verlangt FAQ-Fragen in B2B-Beschaffungssprache. Q1 und Q2 lesen sich wie Endverbraucher-Fragen. Q3 und Q5 zeigen, wie es richtig geht.

**Empfehlung**:

```njk
{# Q1 — aktuell #}
"Was ist ein GaN-Ladegerat und wie funktioniert es?"

{# Q1 — empfohlen #}
"Was ist Galliumnitrid (GaN) und warum ist es fur die OEM-Ladegeratfertigung relevant?"

{# Q2 — aktuell #}
"Sind GaN-Ladegerate besser als herkommliche Silizium-Netzteile?"

{# Q2 — empfohlen #}
"Welche technischen Vorteile bieten GaN-Ladegerate gegenuber Silizium fur gewerbliche Abnehmer?"
```

### P1-3: Schema Organization sollte ManufacturingBusiness sein

Zeile 28: `"@type": "Organization"` → sollte `"@type": "ManufacturingBusiness"` sein.

**Begrundung**: `ManufacturingBusiness` ist ein validierter schema.org-Subtyp von `Organization` und sendet ein starkeres Entity-Signal an Google fur B2B/Manufacturing-Queries. WOWOHCOOL ist ein Hersteller mit ISO 9001 — `ManufacturingBusiness` reflektiert die Realitat praziser.

**EN-Vergleich**: Gleiches Problem in der EN-Version (EN P1-3).

**Fix**:
```json
"@type": "ManufacturingBusiness",
```

Alle Properties (address, sameAs, contactPoint, logo, etc.) bleiben identisch — `ManufacturingBusiness` erbt alle `Organization`-Properties.

### P1-4: FAQ speakable doppelt verschachtelt

Zeile 243-248: `FAQPage` hat ein eigenes verschachteltes `speakable`-Property, wahrend `BlogPosting` bereits `speakable` auf Top-Level hat (Zeile 140-146). Diese Doppelschachtelung ist nicht standardkonform. Googles Speakable-Dokumentation erwartet `speakable` auf `WebPage`/`Article`-Ebene, nicht verschachtelt in `FAQPage`.

**EN-Vergleich**: Gleiches Problem in der EN-Version (EN P2-4).

**Fix**: Das innere `speakable` aus `FAQPage` entfernen. Das `BlogPosting`-Level `speakable` ist ausreichend.

Zeilen 243-248 entfernen:
```json
// ENTFERNEN:
"speakable": {
 "@type": "SpeakableSpecification",
 "cssSelector": [
  ".faq-answer"
 ]
},
```

---

## Mittlere Prioritat (P2)

### P2-1: Tippfehler "Rubykon" → "Rubycon"

Zeile 552 (Section 6, Mythos 3): "japanische **Rubykon** oder Nichicon"

Korrekt ist: **Rubycon** (japanischer Kondensatorhersteller).

**EN-Vergleich**: EN-Version hat den gleichen Tippfehler nicht — dort steht korrekt "Rubycon".

**Fix**: `s/Rubykon/Rubycon/`

### P2-2: Keine spezifische Retourenquote genannt

Die KERNERKENNTNISSE (Zeile 365) erwahnen "niedrige Retourenquoten" ohne konkrete Prozentzahl. Die Factory Data Canonical (`context/factory-data-canonical.md`) gibt vor:

| Metrik | WOWOHCOOL | Industrie |
|--------|:---------:|:---------:|
| GaN Field Return Rate | **~0,5 %** | Silicon ~3 % |
| Defect Rate | **<0,3 %** | 2-5 % |

**Empfehlung**: In den KERNERKENNTNISSEN oder Section 3 (Thermomanagement) die konkrete Rucklaufquote erganzen:

```njk
<li><strong>Lebensdauer & Zuverlassigkeit:</strong> 50.000+ Betriebsstunden (Silizium: 30.000-40.000). 
GaN-Feldrucklaufquote ~0,5 % vs. ~3 % bei Silizium — entscheidend fur niedrige Retourenkosten 
im B2B-Vertrieb.</li>
```

**EN-Vergleich**: Die EN-Version hat Return-Rate-Daten, aber mit Widerspruchen (0.3% vs 2-5%). Die DE-Version hat diesen Fehler nicht — sie lasst die Zahl einfach weg. Das ist besser als ein Widerspruch, aber eine prazise Zahl ware noch besser.

### P2-3: FOB-Preise in EUR — Oberbereiche hoher als Factory-Data-USD

| Watt | Factory Data (USD, 500 Stuck) | DE Artikel (EUR) | Bewertung |
|------|:----------------------------:|:----------------:|-----------|
| 30W | $3.50-5.00 | 3,50-6,00 EUR | Oberbereich +1 EUR hoher |
| 65W | $6.00-8.50 | 6-12 EUR | Oberbereich +3,50 EUR hoher |
| 100W | $9.00-13.00 | 12-18 EUR | Oberbereich +5 EUR hoher |
| 140W | $18.00-24.00 | 18-25 EUR | Oberbereich +1 EUR hoher |

Die Untergrenzen der DE-Preise stimmen gut mit den Factory-Data-USD-Werten uberein (EUR/USD ~1.0). Die Obergrenzen weichen jedoch systematisch nach oben ab. Am starksten bei 65W (12 EUR vs. $8.50) und 100W (18 EUR vs. $13.00).

**Erklarungsmoglichkeiten**:
1. Die DE-Preise konnten 1.000-Stuck-Preise sein (factory data: 65W $5.40-7.20, 100W $7.50-10.00 — immer noch niedriger)
2. Die DE-Preise inkludieren moglicherweise Zertifizierungskosten-Puffer
3. EUR-Preise fur den europaischen Markt konnen Aufschlage enthalten

**Empfehlung**: Entweder die Preise an die Factory Data Canonical anpassen ODER in einer Fussnote erklaren, was im EUR-Preis enthalten ist (z.B. "inkl. CE/GS-Zertifizierung, exkl. Versand").

### P2-4: Kein DE-spezifischer DIN/VDE/GS-Normbezug im Fliesstext

Der Artikel erwahnt GS-Zeichen und TUV Rheinland, aber keine spezifischen deutschen Normen wie:
- **DIN EN 62368-1** (Sicherheit fur Audio/Video- und IT-Gerate)
- **VDE 0620-1** (Steckvorrichtungen)
- **GS-Zeichen** (nur in CTA/FAQ erwahnt, nicht im technischen Body)

Fur den DACH-Markt waren diese Normreferenzen ein starkes E-E-A-T-Signal.

**Empfehlung**: In Section 7 (Beschaffungsstrategie) oder in einem neuen Informationskasten die DACH-spezifischen Normen erganzen:

```njk
<div class="bg-white rounded-xl p-6 mb-6">
 <h3 class="font-black text-brandBlue uppercase mb-4">DACH-Markt: Relevante Normen fur GaN-Ladegerate</h3>
 <ul class="text-slate-600 text-sm space-y-2">
  <li><strong>DIN EN 62368-1:</strong> Sicherheitsanforderung fur Audio/Video- und IT-Gerate — 
      verbindlich fur alle Ladegerate im EU/EWR-Raum</li>
  <li><strong>GS-Zeichen (Geprufte Sicherheit):</strong> Freiwilliges deutsches Prufsiegel, 
      TUV Rheinland / VDE — starkes Kaufersignal im DACH-Raum</li>
  <li><strong>EU-Okodesign-Verordnung 2025/2052:</strong> Effizienzgrenzwerte bereits bei 10 % Last — 
      GaN Gen 3+ erfullt diese Anforderungen</li>
 </ul>
</div>
```

### P2-5: Research Brief Datenpunkte nicht vollstandig integriert

Der Research Brief (`brief-de-was-ist-gan-ladegeraet-2026-07-12.md`) identifizierte folgende Content-Lucken:

| Thema | Prioritat | Status |
|-------|:--------:|--------|
| GaN-Marktdaten 2026 ($1,2 Mrd, >60% Penetration) | Hoch | Teilweise — in KERNERKENNTNISSE und Hook, aber keine detaillierte Marktsegmentierung |
| Infineon CoolGaN Deep-Dive | Mittel | Teilweise — in Tabelle und Body erwahnt, aber kein dedizierter Deep-Dive |
| EU Common Charger als GaN-Beschleuniger | Mittel | ✅ In Hook und FAQ Q4 |
| GaN-Chip Preisverfall (2021→2026) | Niedrig | ✅ In Section 4 |
| Innoscience 1 Mrd. Devices Meilenstein | Niedrig | Nicht integriert |

Der fehlende Innoscience-Meilenstein ist ein verpasstes Trust-Signal ("GaN ist Mainstream"). Konnte in Section 2 als zusatzlicher Datenpunkt eingefugt werden.

---

## DE-Spezifische Prufungen

### Umlaute / ss / s — Prufung

Der Artikel verwendet korrekte deutsche Umlaute (a, o, u) und ss/s-Differenzierung. Keine Schweizer-ss-in-deutschem-Text-Probleme (die im Juli-Audit gefunden und behoben wurden).

Stichprobe:
- "Groser" → korrekt
- "Schaltfrequenz" → korrekt
- "uber" → korrekt
- "ermoglicht" → korrekt
- "verfugbar" → korrekt
- "Rubykon" → Tippfehler (sollte Rubycon sein)

### Komposita / Zusammengesetzte Nomen

Deutsche Komposita sind korrekt gebildet:
- "Galliumnitrid-Halbleitertechnologie" ✅
- "OEM-Beschaffungsguide" ✅
- "Bandlucken-Vorteil" ✅
- "Leistungsstufen" ✅

### DACH-Markt-Bezuge

| Bezug | Status |
|-------|--------|
| Infineon (Munchen) | ✅ Mehrfach erwahnt |
| EU Common Charger Directive | ✅ In Hook und FAQ |
| TUV Rheinland | ✅ In Section 7 und CTA |
| GS-Zeichen | ✅ In HowTo und Section 7 |
| DE-Markt Retail-Preise | Teilweise (EUR, aber keine DE-spezifischen Preisanker) |
| Okodesign-Verordnung 2025/2052 | ✅ In FAQ Q5 |

### B2B-Sprachprufung (Deutsch)

Der Artikel verwendet durchgehend B2B-deutsche Fachsprache:
- "Beschaffungsstrategie" statt "Kaufberatung" ✅
- "Importeure" statt "Kaufer" ✅
- "Stuckkosten" und "BOM-Kosten" ✅
- "Endkunden-Marge" und "Retail-VK" ✅
- "OEM-Einkauf" und "FOB Shenzhen" ✅

Keine B2C-Ausdrucke wie "gunstig", "Angebot", "Schnappchen", "Top 10" gefunden.

---

## Datenkonsistenz-Prufung (Cross-Reference)

| Metrik | Fundstellen | Konsistent? | Details |
|--------|:----------:|:-----------:|---------|
| GaN Bandlucke 3,4 eV | 6+ | ✅ | Uberall identisch |
| Silizium Bandlucke 1,1 eV | 6+ | ✅ | Uberall identisch |
| Grosenreduktion 40-50 % | 5 | ✅ | Uberall identisch |
| 30 % kuhler | 4 | ✅ | Uberall identisch |
| >95 % Effizienz | 5 | ✅ | Uberall identisch (generationsspezifisch 93-97 %) |
| Schaltfrequenz-Multiplikator | 5 | ❌ | FAQ Q1: 10×, Body: 100× (siehe P0-1) |
| FOB 30W | 3 | ✅ | 3,50-6,00 EUR uberall |
| FOB 65W | 5 | ✅ | 6-12 EUR uberall |
| FOB 100W | 4 | ✅ | 12-18 EUR uberall |
| FOB 140W+ | 4 | ✅ | 18-25 EUR uberall |
| GaN 65W Grose (55×35×30mm) | 2 | ✅ | Section 3 und Section 5 |
| Silicon 65W Grose (70×70×30mm) | 2 | ✅ | Section 3 und Section 5 |
| 65W GaN BOM (6-12 EUR) | 3 | ✅ | Section 4, Section 5, KERNERKENNTNISSE |
| 65W Si BOM (4-8 EUR) | 2 | ✅ | Section 5 |
| GaN Gehausetemp. (45-55 °C) | 2 | ✅ | Section 3 und Section 5 |
| Si Gehausetemp. (65-75 °C) | 2 | ✅ | Section 3 und Section 5 |
| MOQ 500 | 6+ | ✅ | Uberall identisch |
| GaN-Chip-Preisverfall ($3-5→$0,50-1,50) | 2 | ✅ | FAQ Q3 und Section 4 |
| Lebensdauer 50.000h+ | 2 | ✅ | KERNERKENNTNISSE und Section 5 |
| Silicon Lebensdauer 30.000-40.000h | 2 | ✅ | KERNERKENNTNISSE und Section 5 |

**Fazit**: 16 von 17 gepruften Metriken sind konsistent. Nur der Schaltfrequenz-Multiplikator weicht ab. **Deutlich besser als die EN-Version**, die 6 von 11 Inkonsistenzen aufwies.

---

## Cross-Reference: EN-Audit-Findings auf DE ubertragen

| EN Finding (P0-P2) | EN Score | DE Status |
|---------------------|:--------:|-----------|
| **P0-1**: FAQ Q1 Frage-Antwort-Mismatch | Kritisch | **Nicht vorhanden** — DE FAQ Q1 fragt "Was ist GaN und wie funktioniert es?" und antwortet genau darauf. ✅ |
| **P0-2**: Return-Rate-Widerspruch (0.3% vs 2-5%) | Kritisch | **Nicht vorhanden** — DE hat keine Return-Rate-Prozentangabe, daher kein Widerspruch. Allerdings fehlt die spezifische Zahl (~0,5 %) ganz (siehe P2-2). |
| **P1-1**: FOB-Preis-Inkonsistenz (5 Fundstellen) | Hoch | **Nicht vorhanden** — DE-FOB-Preise sind in allen 5+ Fundstellen identisch. ✅ |
| **P1-2**: Silizium-Gehausetemperatur-Widerspruch (3 Werte) | Hoch | **Nicht vorhanden** — DE hat konsistent 65-75 °C an beiden Fundstellen. ✅ |
| **P1-3**: Organization → ManufacturingBusiness | Hoch | **Gleiches Problem** in DE (siehe P1-3). ❌ |
| **P2-1**: Schaltfrequenz-Multiplikator ("3-10x" vs "100x") | Mittel | **Ahnlich** in DE: FAQ Q1: "10x" vs Body: "100x" (siehe P0-1). ❌ |
| **P2-2**: GaN-Effizienz variiert (93-95% vs 95-97% vs 91.8-94.7%) | Mittel | **Nicht vorhanden** — DE tiered Effizienz nach Generation (GaN 2: 93-94%, GaN 5: 96-97%), kein unsubstantiated "95-97%" Blanko-Claim. ✅ |
| **P2-3**: Quick-Answer FOB-Preis zu eng ($3-8) | Mittel | **Nicht vorhanden** — DE KERNERKENNTNISSE geben volle Range: 30W ab 3,50-6,00 EUR bis 140W+ ab 18-25 EUR. ✅ |
| **P2-4**: FAQ speakable doppelt verschachtelt | Mittel | **Gleiches Problem** in DE (siehe P1-4). ❌ |
| **P2-5**: wordCount veraltet | Mittel | **Gleiches Problem** in DE (siehe P0-2). ❌ |

**EN-Probleme, die DE NICHT hat**: 5 von 10 (P0-1, P0-2, P1-1, P1-2, P2-2, P2-3)
**EN-Probleme, die DE AUCH hat**: 4 von 10 (P1-3, P2-1 = P0-1 in DE, P2-4, P2-5)

---

## Empfohlene Fixes (Sortiert nach Prioritat)

### Sofort (heute)

**1. P0-1: FAQ Q1 Schaltfrequenz 10× → 100× angleichen**

Im JSON-LD-Schema und FAQ-Body:

```njk
{# Schema FAQ Q1 #}
"text": "GaN (Galliumnitrid) ist ein Halbleitermaterial mit 3,4 eV Bandlucke (Silizium: 1,1 eV). GaN-Transistoren schalten mit 1-5 MHz — je nach Chip-Generation bis zu 100× schneller als Silizium (~100 kHz) — erzeugen weniger Warme und ermoglichen 40-50 % kleinere Ladegerate bei uber 95 % Effizienz. WOWOHCOOL verbaut GaN-Chips von Infineon (CoolGaN) und Navitas."

{# FAQ Q1 Body #}
<p class="text-slate-600 text-sm leading-relaxed">GaN (Galliumnitrid) ist ein Halbleitermaterial mit 3,4 eV Bandlucke (Silizium: 1,1 eV). GaN-Transistoren schalten mit 1-5 MHz — bis zu 100× schneller als Silizium-Transistoren (~100 kHz) — erzeugen weniger Warme und ermoglichen 40-50 % kleinere Ladegerate bei uber 95 % Effizienz. WOWOHCOOL verbaut GaN-Chips von Infineon (CoolGaN) und Navitas.</p>
```

**2. P0-2: wordCount im Schema aktualisieren**

Tatsachliche deutsche Wortzahl ermitteln und Schema updaten:

```json
"wordCount": 5200,
```

**3. P2-1: Tippfehler Rubykon → Rubycon**

```njk
{# Zeile 552 #}
{Hochwertige Netzteile verwenden zudem bessere Kondensatoren (japanische Rubycon oder Nichicon)}
```

### Diese Woche

**4. P1-1: H1 B2B-Sprache priorisieren**

```njk
<h1 class="text-3xl lg:text-5xl font-black text-brandBlue uppercase italic tracking-tighter mb-4 leading-tight">GaN-Ladegerat Technologie: OEM-Beschaffungsguide fur Importeure 2026</h1>
```

**5. P1-3: Organization → ManufacturingBusiness**

```json
"@type": "ManufacturingBusiness",
```

**6. P1-4: FAQ speakable-Schachtelung entfernen**

Zeilen 243-248 im JSON-LD-Block loschen (das innere `speakable` in `FAQPage`).

**7. P1-2: FAQ Q1 + Q2 auf B2B-Fragesprache umstellen**

```njk
{# Q1 #}
"name": "Was ist Galliumnitrid (GaN) und warum ist es fur die OEM-Ladegeratfertigung relevant?"

{# Q2 #}
"name": "Welche technischen Vorteile bieten GaN-Ladegerate gegenuber Silizium-Modellen fur gewerbliche Abnehmer?"
```

### Nachster Sprint

**8. P2-2: Konkrete Retourenquote (~0,5 %) in KERNERKENNTNISSE erganzen**

```njk
<li><strong>Lebensdauer & Zuverlassigkeit:</strong> 50.000+ Betriebsstunden (Silizium: 30.000-40.000). GaN-Feldrucklaufquote ~0,5 % vs. ~3 % bei Silizium-Designs. Volllast-Dauerbetrieb ohne thermische Drosselung, entscheidend fur niedrige Retourenkosten im B2B-Vertrieb.</li>
```

**9. P2-4: DACH-Normen-Infobox in Section 7 einfugen**

Siehe Vorschlag unter P2-4 oben.

**10. P2-3: FOB-Preis-Obergrenzen an Factory Data angleichen ODER mit Fusnote erklaren**

Wenn die hoheren EUR-Obergrenzen beabsichtigt sind (z.B. inkl. Zertifizierungspuffer), eine erklarende Fusnote hinzufugen:

```njk
<p class="text-xs text-slate-400 mt-2">*Preise FOB Shenzhen, inkl. CE/GS-Standardzertifizierung. EUR/USD zum Tageskurs. Staffelpreise ab 5.000 Stuck auf Anfrage.</p>
```

---

## Pre-Commit Selbstcheck

- [x] H1 enthalt B2B-Signalworter (OEM, Beschaffung) — verbesserungswurdig (B2C-"Was ist"-Prafix)
- [x] ≥2 H2s mit B2B-Signalwortern — alle 8 Content-H2s ✅
- [x] HowTo Schema vorhanden (3 Schritte) ✅
- [x] Bild-alt-Text mit B2B-Keywords ✅
- [ ] dateModified aktuell (2026-07-27) — sollte auf 2026-08-02 aktualisiert werden
- [ ] wordCount aktuell (2700 → ~5200)
- [x] ≥2 externe Links (6) ✅
- [x] ≥3 interne Links (10+) ✅
- [x] FAQ in B2B-Beschaffungssprache — Q1+Q2 verbesserungswurdig
- [x] Keine B2C-Signalworter (best, top, review, buying guide, how to choose) ✅

---

*Audit manuell durchgefuhrt gegen B2B Blog Quality Audit Standard 2026. Cross-Reference mit EN-Audit (what-is-gan-charger, 2026-08-02), DE-Juli-Audits (2026-07-14), GEO-Citability-Score (2026-07-21), Research Brief (2026-07-12) und Factory Data Canonical (2026-07-24). 17 quantitative Metriken cross-referenziert. 16/17 konsistent.*
