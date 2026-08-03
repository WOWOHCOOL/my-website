# Page Audit: qi2-vs-magsafe (DE)

**Audit Date:** 2026-08-02
**Article:** `C:\Users\wowoh\wowohcool.com\src\de\blog\qi2-vs-magsafe\index.njk`
**URL:** https://www.wowohcool.com/de/blog/qi2-vs-magsafe/
**Research Brief:** `research/de/brief-qi2-vs-magsafe-de-2026-07-05.md`
**GEO Citability Reference:** qi2-zertifizierung-importeure (86/100, 2026-07-21) -- related article, same domain
**EN Parallel Audit:** `audits/page-audit-qi2-vs-magsafe-guide-2026-08-02.md` (EN composite 71.0, InfoGain 53)

---

## Scores Summary

| Dimension | Score | Notes |
|-----------|-------|-------|
| B2B Content Quality | 87 / 100 | Strong OEM/B2B framing throughout; minor H2 density at low boundary |
| Information Gain | 62 / 100 | Higher than EN (53) due to DACH-specific data, but named entities are underweight |
| MFi/Kosten Clarity | 92 / 100 | Significantly cleaner than EN -- MFM $2-4/Stk. consistently separated from FOB premium |
| Zertifizierungszeitplan Consistency | 78 / 100 | Mostly consistent but Section 11 breakdown (11-18 weeks) vs summary (8-16 weeks) creates mild confusion |
| Cross-Reference Consistency | 72 / 100 | 3 data conflicts found (device count, lab cost, membership tiers) |
| Schema Completeness | 85 / 100 | ManufacturingBusiness type missing; wordCount needs verification |
| Date Consistency | 100 / 100 | **All dates match** -- frontmatter, schema, hero display all show 2026-07-25 |
| **Composite** | **82** | |

### Comparison: DE vs EN

| Dimension | EN Score | DE Score | Delta |
|-----------|----------|----------|-------|
| B2B Content | 89.0 | 87 | -2 (fewer explicit H2 B2B signals) |
| Information Gain | 53 | 62 | +9 (DACH-specific data: CETECOM, E-Mark, BattG, LUCID, ESPR, Stiftung EAR) |
| Cross-Reference | 55 | 72 | +17 (cleaner MFi separation, fewer internal contradictions) |
| MFi/Kosten Clarity | N/A (many conflicts) | 92 | DE much cleaner |
| Zertifizierungszeitplan | N/A (many conflicts) | 78 | DE has 1 minor inconsistency vs EN's 4+ |
| Schema Completeness | 75 | 85 | +10 (date consistency is perfect) |
| Composite | 71.0 | 82 | +11 overall |

---

## MFi/Kosten-Konfusion Check (Primary Focus)

### Result: DE Article is Significantly Cleaner than EN

The DE article consistently distinguishes between **MFM per-unit royalty ($2-4/Stk.)** and **total FOB price premium ($10-15/Stk. vs Qi2 $3-8/Stk.)**. Unlike the EN version, there is no conflation of licensing fee with FOB premium in the hook or key takeaways.

| Location | Line | Text | Value | Scope |
|----------|------|------|-------|-------|
| Kernerkenntnisse bullet 1 | 393 | "Apple MFM-Stücklizenzen ($2-4/Stk.)" | $2-4/Stk. | Per-unit royalty |
| Section 2 (MagSafe) | 444 | "Stücklizenzen von 2-4 USD pro Einheit" | $2-4/Stk. | Per-unit royalty |
| Section 3 table (Lizenzkosten) | 464 | "Ja (MFM: $2-4/Stk.)" | $2-4/Stk. | Per-unit royalty |
| Section 3 table (OEM-Stückpreis) | 466 | "Qi2 $3-8/Stk., MagSafe $10-15/Stk." | $10-15/Stk. | Total FOB price |
| Section 6 | 547 | "Qi2-Magnetladepad $3-8, MagSafe/MFM-Pad $10-15" | $10-15/Stk. | Total FOB price |
| Section 12 table (Stücklizenz) | 665 | "MagSafe 2-4 USD (MFM)" | $2-4/Stk. | Per-unit royalty |
| Section 12 table (Kosten bei 1.000 Stk.) | 666 | "Qi2 ~12.250 USD, MagSafe ~17.000-27.000 USD" | Absolute total | Total cost at volume |

**Verdict:** No MFi/Kosten-Konfusion detected. The DE article uses separate rows in tables and separate paragraphs in prose to distinguish per-unit royalty from total product cost. This is a significant improvement over the EN article.

### Minor Finding: "30-50% günstiger in der Herstellung" Claim

The DE article uses "30-50% günstiger/niedrigere" for **Herstellungskosten** (manufacturing costs), not certification costs. Cross-checking against the article's own data:

- Qi2 OEM pad: $3-8/Stk.; MagSafe OEM pad: $10-15/Stk.
- Savings range: ($10-$3)/$10 = 70% to ($15-$8)/$15 = 47%
- If "Herstellungskosten" refers to BOM-only (excl. margin), the 30-50% range is plausible

**Verdict:** The 30-50% claim is conservatively stated and applies to manufacturing (not certification), unlike the EN version which made this error. **No fix needed.**

### Minor Finding: Lab Test Cost Variance

| Location | Value |
|----------|-------|
| HowTo Step 2 schema (line 229) | "Labortests (3.000-8.000 USD/Modell)" |
| Section 12 table (line 663) | "Labortest pro Modell: 3.000-5.000 USD" |

The upper bound differs: 8,000 in HowTo vs 5,000 in Section 12. Both are cited in the GEO citability reference (3,000-8,000 from the zertifizierung article, Section 2). The Section 12 table has the lower, narrower range.

**Fix:** Align Section 12 table to "3.000-8.000 USD" to match HowTo schema and the zertifizierung article's cited range.

### Minor Finding: WPC Membership Tier Discrepancy

| Location | Values |
|----------|--------|
| HowTo Step 2 schema (line 229) | "WPC-Mitgliedschaft (5.000-25.000 USD/Jahr)" |
| Section 11 (line 645) | "Regular Member 30.000 USD, Adopter Member 18.000 USD, Small Business 5.000 USD" |
| Section 12 table (line 662) | "5.000-25.000 USD" |

The 25,000 figure appears in HowTo and Section 12 but not in Section 11's explicit tier breakdown (5K / 18K / 30K). There is no 25K tier listed by the WPC.

**Fix:** Either:
- Align HowTo to "5.000-30.000 USD" (matching Section 11's full range), or
- Explain the 25,000 figure (possibly a bundled estimate including first-year membership + registration)

---

## Zertifizierungszeitplan Consistency Check (Primary Focus)

### Result: Generally Consistent, One Breakdown Mismatch

| Location | Value | Scope |
|----------|-------|-------|
| HowTo Step 3 schema (line 237-241) | "Qi2-Zertifizierung: 8-16 Wochen (6-10 Wochen mit WOWOHCOOL-Referenzdesign)" | Total timeline (standard + accelerated) |
| Section 12 table (line 665) | "Zertifizierungsdauer: Qi2 8-16 Wochen, MagSafe 12-20 Wochen" | Total timeline |
| Section 11 step 3 (line 649) | "WPC-Labortest dauert 4-8 Wochen, zzgl. 2-4 Wochen für die Mitgliedschaftsregistrierung und Auth-IC-Key-Issuance ... Gesamtprozess auf **6-10 Wochen**" | Breakdown: 4-8 + 2-4 + 5-6 (key issuance) = **11-18 Wochen** standard, 6-10 Wochen accelerated |

**The discrepancy:** Section 11 breaks down the standard process as 4-8 + 2-4 + 5-6 = 11-18 weeks, but the summary everywhere else says "8-16 weeks." The gap (11-18 vs 8-16) is ~3 weeks at the low end and ~2 weeks at the high end.

**Likely explanation:** The 8-16 week figure assumes parallel processing of membership registration and key issuance (which overlap with lab testing), while the 11-18 week breakdown adds them sequentially. The article doesn't clarify this.

**Comparison with EN audit:** The EN article had 4 different conflicting values (4-6 weeks, 6-8 weeks, 6-10 weeks, 8-16 weeks) without scope qualification. The DE article is significantly better -- essentially two values (8-16 standard, 6-10 accelerated) with one section providing a sequential breakdown that doesn't perfectly add up.

**Fix:** In Section 11, add a clarifying sentence:
> "Bei paralleler Abwicklung (Mitgliedschaft und Key-Issuance laufen während des Labortests) beträgt die Gesamtdauer 8-16 Wochen."

### Accelerated Timeline Consistency

The "6-10 Wochen mit WOWOHCOOL-Referenzdesign" figure appears in:
- HowTo schema (line 237): "6-10 Wochen mit WOWOHCOOL-Referenzdesign"
- Section 11 (line 649): "auf 6-10 Wochen"

**Verdict:** Accelerated timeline is consistent across all locations. PASS.

---

## Umlauts / Orthography Check (Primary Focus)

### Result: Systematic Use of 'ss' Instead of 'ß' for de-DE Market

The article targets the German market (`inLanguage: "de-DE"`) but consistently uses Swiss orthography ('ss' instead of 'ß'):

| Line | Current Text | Standard de-DE |
|------|-------------|----------------|
| 429 | "das grösste Problem" | "das größte Problem" |
| 485 | "deutlich grössere Zielgruppe" | "deutlich größere Zielgruppe" |
| 554 | "der grösste Paradigmenwechsel" | "der größte Paradigmenwechsel" |
| 620 | "den grössten Komfortgewinn" | "den größten Komfortgewinn" |
| 549 | "Grössere Zielgruppe" (H3) | "Größere Zielgruppe" |

**Context:** In Swiss Standard German (de-CH), 'ß' is not used and 'ss' is the exclusive form. The article's DACH targeting (DE/AT/CH) could justify this as a deliberate DACH-neutral choice. However, the `inLanguage` is explicitly "de-DE," and German readers in Germany expect 'ß'.

**Additional note:** After the German orthography reform of 1996 (and its 2006 revision), the rules for 'ss' vs 'ß' are:
- 'ß' after long vowels and diphthongs: "groß", "Straße", "außen"
- 'ss' after short vowels: "muss", "Wasser", "dass"

Since "groß" has a long vowel, "größte" (with ß) is the standard de-DE spelling. Using "grösste" (with ss) violates the long-vowel rule for de-DE.

**Recommendation:** If de-DE is the primary market, replace all 'ss' where standard de-DE requires 'ß'. If DACH-neutrality is preferred, consider changing `inLanguage` to "de" (generic German) and noting the Swiss convention in an editorial style guide entry.

**No encoding errors detected:** All umlauts (ä, ö, ü) render correctly. No garbled characters, no UTF-8 corruption.

---

## Device Count Inconsistency (Cross-Reference)

### Critical Finding: Two Different Device Figures

| Location | Line | Text | Value |
|----------|------|------|-------|
| Hero hook | 368 | "über 600 Mio. Geräte weltweit" | 600M |
| Section 4 (Kompatibilität) | 515 | "auf über 600 Mio. Geräte weltweit" | 600M |
| Section 1 (WOWOHCOOL FAKT) | 435 | "Über 1,5 Milliarden Geräte unterstützen bereits Qi2" | 1.5B |
| Section 14 (Fazit) | 707 | "Mit 1,5 Mrd.+ aktivierten Geräten" | 1.5B |

**Root cause:** The hook and Section 4 use 600M (likely Qi2-capable smartphones specifically: ~200M iPhones + ~400M new Android). Section 1 and Fazit use 1.5B (from WPC, likely includes all Qi-compatible devices including Qi1). The article uses "Qi2" in the 1.5B context, which is misleading if 1.5B includes Qi1 devices.

The research brief (line 111) gives "Qi2-aktivierte Geräte: 1.5 Mrd.+" from WPC as a single data point, without making the Qi2-capable vs total-Qi distinction.

**Impact:** An attentive reader or AI system will notice the discrepancy and lose trust. For AI citability, this creates contradictory extractable facts.

**Fix:** Clarify in the hook and both locations:
- 600M = "Qi2-kompatible Smartphones (iPhone 12+ und Android Qi2-Modelle)"
- 1.5B = "Qi-fähige Geräte insgesamt (Qi1 + Qi2)"

Or align to one consistent definition throughout.

---

## Schema Completeness Check

### Missing: ManufacturingBusiness Type

Like the EN article, the DE article uses `Organization` type without `ManufacturingBusiness`:

```json
// Current (line 30)
"@type": "Organization",

// Recommended
"@type": ["Organization", "ManufacturingBusiness"],
```

This is required by the B2B quality standard for factory/OEM content.

### wordCount Verification Needed

| Source | Value |
|--------|-------|
| Schema (line 133) | `"wordCount": 4054` |

The article was updated from ~2,000 words to a target of 2,800-3,200 (per brief). With 770 lines including substantial HTML/Nunjucks markup and ~15 content sections with dense paragraphs, tables, and FAQ, the actual word count likely exceeds 4,000. The schema value of 4,054 appears plausible but should be verified with an actual word count of the rendered text content.

### Date Consistency: PERFECT

| Source | Value |
|--------|-------|
| Frontmatter `modified` (line 5) | `2026-07-25` |
| Schema `dateModified` (line 132) | `"2026-07-25"` |
| Hero display (line 362) | "25. Juli 2026" |

All three match. This is cleaner than the EN article which had a hero/schema mismatch. PASS.

---

## FAQ Quality Check

### FAQ #7: CTA Buried in Answer

Line 722: The last FAQ answer (Qi2 Kfz-Ladegerät) ends with a CTA link:
> `<a href="/de/kontakt/" ...>Jetzt OEM-Angebot anfordern →</a>`

This is similar to the EN audit's P2-3 finding. While a single CTA in a B2B FAQ is less problematic than in consumer content, it dilutes the informational value of what should be an objective answer.

**Recommendation:** Remove the CTA link from the FAQ answer body. The standalone CTA sections at the bottom (line 731-744) are sufficient.

### FAQ Count: 7 Questions

The quality standard requires 5-8 FAQ questions. At 7, the DE article is within range.

### FAQ B2B Language: PASS

All FAQ questions use procurement/B2B language:
- "OEM-Importeur niedrigere Stückkosten"
- "OEM-Gehäusekonstruktion"
- "WPC-zertifizierte Qi2.2-Produkte"
- "Kfz-Ladegerät OEM -- welche Zertifizierungen"

---

## Structural Quality Gates

### H1 Check: PASS

"Qi2 vs. MagSafe: Kompatibilität & OEM für Importeure 2026" -- 62 characters (within 50-65 range), contains "OEM" and "Importeure" as B2B signal words.

### H2 B2B Signal Density: 36% (5/14)

| H2 | B2B Signal? |
|----|------------|
| 1. Was ist Qi2? Der offene Standard für OEM-Importeure | Yes (OEM-Importeure) |
| 2. Was ist MagSafe? Apples Lizenzmodell | Implicit (B2B context) |
| 3. Qi2 vs MagSafe: Direkter Vergleich | No |
| 4. Kompatibilität: iPhone & Android | No |
| 5. Qi2.2 25W: Der neue Standard | No |
| 6. Warum Qi2 für Importeure die bessere Wahl ist | Yes (Importeure) |
| 7. Ladegeschwindigkeit: Qi2 vs MagSafe vs Qi2.2 | No |
| 8. Qi2 Automotive: Chancen im Kfz-Markt | Implicit (B2B market) |
| 9. Qualitätsunterschiede: N52H & Spulenabstand | Implicit (procurement quality) |
| 10. Qi2-Produkttypen für den DACH-Markt | Yes (DACH-Markt) |
| 11. OEM-Produktion von Qi2-Ladegeräten: Kosten & Prozess | Yes (OEM) |
| 12. Zertifizierungskosten: Qi2 vs MagSafe | Implicit (B2B costs) |
| 13. Zukunft der magnetischen Ladestandards für den Markt | No |
| 14. Fazit für OEM-Importeure | Yes (OEM-Importeure) |

Explicit: 5/14 (36%). With implicit context: 9/14 (64%). Above the >=2 minimum. PASS.

### H3 Quality: Generally Strong

H3s are mostly specific and data-driven. Examples:
- "iPhone-Kompatibilität" (concrete)
- "Android Qi2-Kompatibilität 2026" (specific + year)
- "Qi2.2 25W Produkte im DACH-Raum (Juli 2026)" (data + region + date)
- "Qi2-Magnet-Powerbanks: Das am schnellsten wachsende Segment" (data conclusion format)

### Image Alt Text: PASS

- Cover image: Contains "OEM-Produktion", "Vergleich" -- B2B keywords present
- Author hero image: "Snowy May, Market Managerin bei WOWOHCOOL -- OEM/ODM & Qi2 Zertifizierung" -- includes job title and expertise
- All factory images have descriptive alt text with B2B context

### External Links: PASS

6 external authority links: WPC, Android Authority, TechTimes, Macworld, Persistence Market Research, ChargerLab.

### Internal Links: PASS

8+ internal links including related articles section with 6 links.

### HowTo Schema: PASS

5 steps with descriptive B2B-oriented names. All steps have `HowToDirection` text.

---

## Information Gain Assessment

### DACH-Specific Data (Strong -- Higher than EN)

The DE article includes several DACH-specific data points not found in the EN version:

| Data Point | Location | Uniqueness |
|-----------|----------|------------|
| German Android market share ~55% | Hook, Section 4, Section 6 | DACH-specific, not in EN |
| CETECOM as German test lab | (referenced in GEO citability score doc for zertifizierung article) | Not in this article |
| E-Mark (ECE R10) for automotive | FAQ #7, Section 8 | EU-specific regulation |
| BattG/WEEE-Compliance for powerbanks | Section 10 (line 631) | German regulation |
| LUCID VerpackG registration | Section 11 (line 651) | German-specific |
| ESPR Ecodesign 2025/2052 | Section 6 (line 553) | EU regulation |
| Stiftung EAR WEEE registration | Section 11 (line 651) | German authority |
| Kriechstrecken (creepage distance) EN 62368-1 Annex M.4 | Section 11 (line 651) | Technical standard with specific reference |
| Audi Q9 Qi2 integration (May 2026) | Section 8 | European automotive example |
| Marriott/Hilton Qi2 pilot (2026) | Section 13 | Hospitality B2B segment |

### Named Entity Density: Moderate

Counted named entities (standards, regulations, equipment, chipsets, labs):
WPC, Apple, MPP, N52H, NFC, FOD, MFM, CE, RoHS, WEEE, RED, ESPR, BattG, LUCID, EN 62368-1, ECE R10, SAE J2954, ISO 19363, UN38.3, IEC 62133-2, MSDS, TUV, SGS, UL, CETECOM (implied), Stiftung EAR, Infineon, STMicro, NXP, GaN, USB-C, USB-C PD, Qi2.2, Qi1, Android, Samsung, Google, Xiaomi, OnePlus, OPPO, Audi, Nissan, BMW (implied), Baseus, AUKEY, Cubenest, Havit, Belkin (implied), Marriott, Hilton, Croma Unboxed, Macworld, ChargerLab, TechTimes, Android Authority, Persistence Market Research.

~50+ named entities for an estimated 4,000-word article = ~12.5 per 1,000 words. Well above the >=2 per 1,000 word target. PASS.

### Missing Named Entities (Optional Improvement)

Following the EN audit's suggestion, the DE article could further strengthen named entity density with:
- Qi2 test equipment: "Nok9 CATS II", "GRL Qi2 Test Solution"
- Specific IC part numbers: "Infineon WLC1115", "NXP MWCT2013A"
- WPC specification references: "Qi v2.0 MPP Specification Part 3"
- Magnet standard: "N52H per MMPA 0100-00"

---

## Issues by Priority

### P0 -- Critical (Must Fix)

#### P0-1: Device Count Inconsistency -- 600M vs 1.5B

**Locations:** Hero hook (line 368), Section 4 (line 515) vs Section 1 (line 435), Fazit (line 707)

The article uses "600 Mio. Geräte" in two places and "1,5 Milliarden Geräte" in two others, all referring to "Qi2" devices. These are different numbers with different scopes (Qi2-capable smartphones vs all Qi devices), but the article doesn't clarify the distinction.

**Fix:** Add scope qualifiers:
- Hook: "uber 600 Mio. Qi2-kompatible Smartphones weltweit"
- Section 1: "Uber 1,5 Milliarden Qi-fahige Gerate insgesamt (Qi1 und Qi2)"
  (Or align all locations to one consistent definition.)

#### P0-2: WPC Membership Tier Discrepancy

**Locations:** HowTo schema (line 229: 5.000-25.000), Section 11 (line 645: 5K/18K/30K), Section 12 (line 662: 5.000-25.000 USD)

The 25,000 USD figure doesn't match any WPC tier listed in Section 11 (5K, 18K, 30K).

**Fix:** Align all locations to the actual WPC tiers. Either:
- HowTo: "WPC-Mitgliedschaft (5.000-30.000 USD/Jahr)"
- Section 12 table: "5.000-30.000 USD"
  Or explain what 25,000 represents if it's not a standard tier.

### P1 -- High Priority

#### P1-1: Lab Test Cost Range Inconsistency

**Locations:** HowTo schema (line 229: 3.000-8.000 USD) vs Section 12 table (line 663: 3.000-5.000 USD)

The upper bound differs by 3,000 USD. The broader range (3,000-8,000) is validated by the zertifizierung-importeure article's GEO citability reference.

**Fix:** Align Section 12 table to "3.000-8.000 USD" to match HowTo schema.

#### P1-2: Certification Timeline Breakdown vs Summary

**Location:** Section 11 (line 649)

The sequential breakdown (4-8 + 2-4 + 5-6 = 11-18 weeks) does not match the summary "8-16 Wochen" used everywhere else. The discrepancy is ~3 weeks at the low end.

**Fix:** Add a clarifying sentence about parallel processing, or align the breakdown to sum to 8-16 weeks.

#### P1-3: Missing ManufacturingBusiness Schema Type

**Location:** Line 30

```json
// Current
"@type": "Organization",

// Fix
"@type": ["Organization", "ManufacturingBusiness"],
```

#### P1-4: 'ss' vs 'ß' Orthography for de-DE Market

**Locations:** Lines 429, 485, 549, 554, 620 (all instances of "gross-" family)

The article targets de-DE but uses Swiss 'ss' orthography. If de-DE is the primary market, replace:
- "grosste" → "größte"
- "grössere" → "größere"
- "grösster" → "größter"
- "grössten" → "größten"

If DACH-neutral spelling is deliberate, document this as editorial policy and consider changing `inLanguage` to "de".

### P2 -- Medium Priority

#### P2-1: FAQ #7 Contains Buried CTA

**Location:** Line 722

The last FAQ answer ends with a sales CTA link to `/de/kontakt/`. Remove it and let the standalone CTA section carry the conversion burden. Replace with a neutral closing sentence about regulatory requirements.

#### P2-2: wordCount Verification

**Location:** Schema line 133

The schema claims 4,054 words. Verify with an actual word count of the rendered text content (excluding HTML/Nunjucks markup and schema JSON-LD). Update if off by >5%.

#### P2-3: HowTo Step 2 Cost Data Differs from Section 12

**Location:** HowTo schema line 229 vs Section 12 lines 662-669

HowTo Step 2 says "Labortests (3.000-8.000 USD/Modell)" and "MagSafe: Apple MFM-Programm mit jahrlichen Gebuhren und Stucklizenzen, ca. 30-50% teurer in der Produktion." The Section 12 table provides much more granular data. The HowTo schema answer text should be aligned with Section 12 for a consistent reader experience.

---

## Data Consistency Audit Summary

| Data Point | Location A | Value A | Location B | Value B | Match? |
|-----------|-----------|---------|-----------|---------|--------|
| MFM royalty/unit | Kernerkenntnisse (line 393) | $2-4/Stk. | Section 12 (line 665) | $2-4/Stk. | Yes |
| MFM royalty/unit | Section 2 (line 444) | $2-4/Stk. | Section 3 table (line 464) | $2-4/Stk. | Yes |
| Qi2 FOB pad price | Section 3 table (line 466) | $3-8/Stk. | Section 6 (line 547) | $3-8/Stk. | Yes |
| MagSafe FOB pad price | Section 3 table (line 466) | $10-15/Stk. | Section 6 (line 547) | $10-15/Stk. | Yes |
| WPC membership cost | HowTo schema (line 229) | 5.000-25.000 | Section 11 (line 645) | 5K/18K/30K | **No** |
| WPC membership cost | HowTo schema (line 229) | 5.000-25.000 | Section 12 (line 662) | 5.000-25.000 | Yes (both wrong) |
| Lab test cost | HowTo schema (line 229) | 3.000-8.000 | Section 12 (line 663) | 3.000-5.000 | **No** |
| Qi2 cert duration | HowTo schema (line 237) | 8-16 Wochen | Section 12 (line 665) | 8-16 Wochen | Yes |
| Qi2 cert duration | HowTo schema (line 237) | 8-16 Wochen | Section 11 (line 649) | 11-18 Wochen (breakdown) | **No** |
| Qi2 accelerated duration | HowTo schema (line 237) | 6-10 Wochen | Section 11 (line 649) | 6-10 Wochen | Yes |
| Device count | Hero hook (line 368) | 600 Mio. | Section 1 (line 435) | 1,5 Mrd. | **No** |
| Device count | Section 4 (line 515) | 600 Mio. | Fazit (line 707) | 1,5 Mrd. | **No** |
| dateModified | Frontmatter (line 5) | 2026-07-25 | Schema (line 132) | 2026-07-25 | Yes |
| dateModified | Schema (line 132) | 2026-07-25 | Hero display (line 362) | 25. Juli 2026 | Yes |
| 30-50% claim scope | Kernerkenntnisse (line 393) | Herstellungskosten | Section 6 (line 547) | Herstellungskosten | Yes |

**5 inconsistencies found** (3 cross-reference, 2 internal breakdown).

---

## Comparison: Issues in EN That Do NOT Apply to DE

| EN Issue | EN Severity | DE Status |
|----------|-------------|-----------|
| Hook conflates FOB premium with licensing fee (P0-2) | P0 | **Clean** -- DE separates these concepts correctly |
| "30-50% lower certification costs" inflated (P0-4) | P0 | **Clean** -- DE uses 30-50% for manufacturing, not certification |
| Hero date vs schema date conflict (P0-5) | P0 | **Clean** -- all dates match 2026-07-25 |
| FOB pricing conflict Hero ($8-13) vs FAQ ($6.50-9.00) (P1) | P1 | **Clean** -- DE consistently uses $3-8 for Qi2, $10-15 for MagSafe |
| "500+ WPC member companies" overstatement (P2) | P2 | **Clean** -- DE says "uber 350 Mitgliedsunternehmen" |
| "1.5B Qi2-capable devices" unsourced (P2) | P2 | **Partial** -- applies only if 1.5B figure scope is wrong |
| FAQ #8 CTA buried (P2-3) | P2 | **Similar** -- DE FAQ #7 has CTA |
| Author image alt lacks job title (P1-3) | P1 | **Clean** -- DE author alt includes "Market Managerin" and "OEM/ODM & Qi2 Zertifizierung" |
| wordCount inaccurate (P0-1) | P0 | **Needs verification** -- schema says 4054, likely close to actual |
| Multiple cert timeline values unqualified (P0-3) | P0 | **Minor only** -- DE has one breakdown mismatch |

The DE article avoids 7 of the 10 issues found in the EN audit. The 3 that remain are much less severe in DE.

---

## Recommended Fixes with Exact Text

### Fix 1: Device Count Clarification (P0-1)

**Line 368 (Hook):**
```
OLD: deckt iPhone und Android ab (über 600 Mio. Geräte weltweit)
NEW: deckt iPhone und Android ab (über 600 Mio. Qi2-kompatible Smartphones weltweit)
```

**Line 435 (Section 1 WOWOHCOOL FAKT):**
```
OLD: Über 1,5 Milliarden Geräte unterstützen bereits Qi2.
NEW: Über 1,5 Milliarden Geräte unterstützen bereits den Qi-Standard (Qi1 + Qi2).
```

### Fix 2: WPC Membership Tier (P0-2)

**Line 229 (HowTo schema):**
```
OLD: WPC-Mitgliedschaft (5.000-25.000 USD/Jahr)
NEW: WPC-Mitgliedschaft (5.000-30.000 USD/Jahr)
```

**Line 662 (Section 12 table):**
```
OLD: 5.000-25.000 USD
NEW: 5.000-30.000 USD
```

### Fix 3: Lab Test Cost (P1-1)

**Line 663 (Section 12 table):**
```
OLD: 3.000-5.000 USD
NEW: 3.000-8.000 USD
```

### Fix 4: Certification Timeline Clarification (P1-2)

**After line 649 (Section 11, end of paragraph about lab test duration), add:**
```
Bei paralleler Abwicklung (WPC-Mitgliedschaft und Auth-IC-Key-Issuance laufen parallel zum Labortest) beträgt die Gesamtdauer 8-16 Wochen.
```

### Fix 5: ManufacturingBusiness Schema (P1-3)

**Line 30:**
```
OLD: "@type": "Organization",
NEW: "@type": ["Organization", "ManufacturingBusiness"],
```

### Fix 6: ss to sz (P1-4)

Search and replace all instances of 'gross' family words:
```
grösste → größte
grössere → größere
grösster → größter
grössten → größten
```

### Fix 7: Remove FAQ CTA (P2-1)

**Line 722:**
```
OLD: <a href="/de/kontakt/" class="text-brandOrange hover:underline">Jetzt OEM-Angebot anfordern →</a>
NEW: Fur den EU-Markt empfehlen wir zusatzlich die Qi2-WPC-Zertifizierung fur volle 15W/25W Ladeleistung und erhohte Produktsicherheit.
```

---

## Verification Checklist (Post-Fix)

- [ ] Device count consistent or qualified across all 4 locations
- [ ] WPC membership tier aligned (5,000-30,000 not 5,000-25,000)
- [ ] Lab test cost aligned (3,000-8,000 not 3,000-5,000)
- [ ] Section 11 timeline breakdown matches 8-16 week summary (with parallel processing note)
- [ ] ManufacturingBusiness type added to schema
- [ ] 'ß' used instead of 'ss' for de-DE (or editorial policy documented)
- [ ] FAQ #7 CTA removed from answer body
- [ ] wordCount verified against actual rendered word count
- [ ] dateModified updated to 2026-08-02 (audit date)

---

*Audit generated by SEOMACHINE Page Auditor 2026-08-02*
*References: b2b-blog-quality-audit-standard.md, GEO-CITABILITY-SCORE-qi2-zertifizierung-importeure-2026-07-21.md, brief-qi2-vs-magsafe-de-2026-07-05.md, page-audit-qi2-vs-magsafe-guide-2026-08-02.md (EN parallel)*
