# DE Blog Master Audit -- 2026-08-02

**Scope**: 29 articles | **Method**: Per-article manual audit with DE research brief cross-reference
**Comparison Baseline**: `de-blog-quality-audit-2026-07-14.md` (28 articles, 8-dimension) + `de-blog-6-dimension-audit-2026-07-14.md` (400+ fixes)
**EN Cross-Reference**: `EN-BLOG-MASTER-AUDIT-2026-08-02.md` (29 articles, 7-gate per-article manual audit)

---

## Executive Summary

The August 2026 DE blog audit mirrors the EN audit's methodology shift -- from automated composite scoring (July: 8-dimension average) to **per-gate manual audit** (August: 7-gate scoring with P0/P1/P2 issue tracking). The DE blog **outperforms the EN blog on average** due to cleaner data consistency, stronger Information Gain (DACH regulatory data density), zero HTML tag nesting errors, and lessons learned from EN article production applied to DE versions.

**Key finding -- DE is cleaner than EN on data consistency**: The EN audit found 22 of 29 articles (76%) with 3+ cross-section data contradictions. DE articles show significantly fewer contradictions -- the worst EN articles (what-is-gan-charger: 6/11 metrics contradictory, oem-vs-odm: 5+) have DE equivalents that are internally consistent. The DE `oem-vs-odm-leitfaden` has zero contradictions and zero P0 issues (EN had 5+ contradictions and 42 HTML tag mismatches).

**Key finding -- Umlaut/orthography crisis is the DE-unique emergency**: The July 14 6-dimension audit reported "0 Umlaut/ss errors" after 308 fixes. The August audit found **180+ residual and new errors across 18 articles**, concentrated in Schema JSON-LD blocks, Key Takeaways boxes, and CTA headings -- locations likely edited via PowerShell `Set-Content` (known encoding trap per `MEMORY.md`). The worst cases: `kabelloses-laden` (60-80+ body text regressions), `usb-c-pd-3-1-erklaert` (54 Schema + FAQ errors), `sicherheitsstandards-ladegeraete` (58+ FAQ + Key Takeaways character corruptions).

**Key finding -- English sentences leaking into German FAQ Schema**: 9+ articles have `"WOWOHCOOL has served 200+ global brands since 2013 with a defect rate below 0.3%"` embedded in German-language FAQ JSON-LD. The identical sentence across 9+ articles confirms a template-level copy-paste error that Google may penalize as Schema-visible-content mismatch.

**Key finding -- H3 pseudo-heading anti-pattern is structural epidemic**: 20+ articles use `<strong>` or bare `<p>` instead of semantic `<h3>` under H2 sections, generating zero Featured Snippet capture points. The worst cases: `eu-batterieverordnung` (10/10 H2s lack H3), `qualitaetskontrolle-china` (10/11), `gan-vs-silizium` (9/10), `powerbank-hersteller-china-oem` (12/13), `kabelloses-laden` (9/10).

---

## 1. Overall Ranking (by Score, descending)

| # | Article | DE Score | EN Score | Delta | P0/P1/P2 | Total | Key Issue |
|---|---------|:--------:|:--------:|:-----:|:--------:|:-----:|-----------|
| 1 | gan-v-oem-fertigung | **89.0** | 81 | +8.0 | 3/4/4 | 11 | GaN V temperature EN 65-75C vs DE 45-55C cross-language conflict; timeRequired PT5M vs 13 min; ESPR missing |
| 2 | hotelladegeraete-oem | **88.4** | 81.9 | +6.5 | 1/2/6 | 9 | Best-in-class DACH localization; FAZIT section missing heading tag; Speakable targets zero DOM elements |
| 3 | powerbank-spezifikationen | **87.9** | 84.8 | +3.1 | 2/2/2 | 6 | Minor: single Umlaut typo "Haufig"; dateModified mismatch 4 days; FAQ B2B language 92/100 |
| 4 | fabrikpruefung-checkliste | **87.0** | 84 | +3.0 | 1/6/4 | 11 | AQL level swap Major/Critical in 4 locations; 4 residual Swiss ss; 11 comparison tables; 0 H3-nesting violations |
| 5 | gan-ladegeraete-leitfaden | **86.0** | 88 | -2.0 | 0/2/8 | 10 | ZERO P0 issues; timeRequired perfectly aligned; "Baugrosse" Swiss ss single instance; CAGR repeated 3x |
| 6 | gan-ladegeraet-technologie | **86.0** | 82 | +4.0 | 2/4/5 | 11 | URL renamed from B2C "was-ist"; 16/17 metrics consistent; Schaltfrequenz FAQ 10x vs body 100x; H1 B2C prefix |
| 7 | semi-solid-state-powerbank | **84.0** | 78 | +6.0 | 4/5/6 | 15 | EN's 3 P0 data contradictions absent from DE; Section 4 encoding errors; 3 different dates visible on page |
| 8 | eu-batterieverordnung | **83.0** | 84 | -1.0 | 2/5/8 | 15 | Wikidata entity "Qi wireless charging" (copied from wrong template); 10/10 H2s lack H3; wordCount 17.8% inflated |
| 9 | qualitaetskontrolle-china | **82.0** | 89 | -7.0 | 3/5/4 | 12 | AQL 0.65 vs 0.065 typo (10x error); 10/11 H2s lack H3; Swiss "begrusst"; missing DGUV/DIN/Dakks |
| 10 | qi2-vs-magsafe | **82.0** | 71 | +11.0 | 2/4/3 | 9 | Device count 600M vs 1.5B inconsistency; Swiss ss 5x; correctly separates MFi from FOB (EN conflated) |
| 11 | qi2-zertifizierung-importeure | **82.0** | 75 | +7.0 | 3/3/3 | 9 | .speakable CSS missing on Hook; "uber uber" duplicate; 8 CTA Umlaut errors; CETECOM/Bitkom/Xing DACH context |
| 12 | powerbank-beschaffung-leitfaden | **80.0** | 84 | -4.0 | 4/5/5 | 14 | ~30 residual Umlaut damage from incomplete July fix; ogImage references old slug; meta description truncated |
| 13 | sicherheitsstandards-ladegeraete | **79.0** | 86 | -7.0 | 3/4/5 | 12 | 58+ FAQ + Key Takeaways Umlaut/ss corruption; 3-zone encoding inconsistency; best DACH regulatory depth |
| 14 | autoladegeraet-ratgeber | **78.0** | 79.8 | -1.8 | 3/5/6 | 14 | timeRequired PT8M vs 17 min (opposite direction from EN); "heisst" Swiss; missing StVZO/ADAC/TUV |
| 15 | powerbank-mah-kapazitaet | **78.0** | 83 | -5.0 | 2/5/5 | 12 | wordCount stale; missing BattG/ElektroG/GS-Zeichen/TUV/Stiftung Warentest; compact format lost InfoGain |
| 16 | markt-trends-ladegeraete-2026 | **78.0** | 72 | +6.0 | 3/4/5 | 12 | timeRequired PT8M vs 19 min; Swiss "grosste" 5x; all 6 FAQ answers internally consistent (EN had $42.4B vs $18.4B) |
| 17 | oem-vs-odm-leitfaden | **78.0** | 71 | +7.0 | 0/3/5 | 8 | ZERO P0 and ZERO data contradictions; 11/11 parameters cross-consistent; English sentence in FAQ Schema |
| 18 | usb-c-pd-schnellladen | **78.0** | 72 | +6.0 | 3/4/4 | 11 | H1 "PD 3.2" vs schema "GaN"; "Grosse" Swiss; PD 3.2 body coverage (EN lacks); wordCount 1.4% accurate |
| 19 | lieferanten-china-finden | **78.0** | 80 | -2.0 | 5/4/6 | 15 | Entire visible FAQ ASCII-fied; image alt Umlaut corruption; 3 different dates visible; LkSG missing |
| 20 | powerbank-hersteller-china-oem | **77.5** | 79.8 | -2.3 | 2/5/4 | 11 | Organization Schema uses EN root @id instead of DE; 12/13 H2s lack H3; wordCount 27% underreported |
| 21 | ladegeraet-import-china | **77.0** | 83 | -6.0 | 1/4/6 | 11 | 18+ Key Takeaways Umlaut damage; Zollsatz FAQ (2.4-2.7%) vs body (0% ITA) contradiction; EN text in DE Schema |
| 22 | oem-versand-aus-china | **74.8** | 78.4 | -3.6 | 4/4/7 | 15 | Zollsatz 3-way contradiction (0% vs 3.7% vs 0%); wordCount 56% understated; Amazon FBA date Jul vs Jan 2026 |
| 23 | powerbank-eigenmarke-oem | **74.0** | 73.9 | +0.1 | 2/6/5 | 13 | FOB price 2x gap (4-7 vs 8.50 EUR); Branding MOQ conflict (100-300 vs 1,000); 5 consecutive "OEM-" H2s |
| 24 | gan-generationen-uebersicht | **74.0** | 76 | -2.0 | 6/5/6 | 17 | **Highest P0 count (6)**; Ghost HowTo (no matching body); wordCount carryover from pre-expansion; EN text in FAQ Schema |
| 25 | usb-c-pd-3-1-erklaert | **72.0** | 72 | 0.0 | 4/9/6 | 19 | 54 Umlaut errors (40 Schema + 13 FAQ + 1 body); FAQ Schema/page mismatch (5 vs 4 questions); Factory Data panel missing |
| 26 | zertifizierungen-eu-markt | **71.0** | 72 | -1.0 | 4/5/5 | 14 | 40-50 FAQ + TOC Umlaut regression; timeRequired PT5M vs 15 min; wordCount 1500 vs ~2600 |
| 27 | fabrikauswahl-china-leitfaden | **71.0** | 62 | +9.0 | 2/3/5 | 10 | wordCount 3100 vs ~5200; LkSG threshold outdated (250 employees never implemented); VerpackG missing |
| 28 | gan-vs-silizium-ladegeraete-vergleich | **67.0** | 79 | -12.0 | 2/7/8 | 17 | 10 Umlaut corruptions in Key Takeaways; 9/10 H2s lack H3; missing FLIR thermal/MTBF/return rate data present in EN |
| 29 | kabelloses-laden | **61.0** | 77 | -16.0 | 3/4/5 | 12 | **Lowest score**; 60-80+ Umlaut body text regression; 9/10 H2s lack H3; cross-language market size $18.2B vs $18.4B |

---

## 2. Grade Distribution

```
Excellent (85+):   ██████ 6 articles (20.7%)
Good     (80-84):  ██████ 6 articles (20.7%)
Fair     (70-79):  ███████████████ 15 articles (51.7%)
Needs Work (<70):  ██ 2 articles (6.9%)
```

**Average DE Score: 78.9/100**

**Comparison with EN Blog:**
```
                             DE Aug 02 (29 arts)  EN Aug 02 (29 arts)
Excellent 90+:                 0 (0%)                0 (0%)
Excellent 85+:                 6 (20.7%)             0 (0%)
Good 80-84:                    6 (20.7%)            14 (48.3%)
Fair 70-79:                   15 (51.7%)            14 (48.3%)
Needs Work <70:                2 (6.9%)              1 (3.4%)
Average Score:                ~78.9                  ~78.3
```

**Comparison with July 2026 DE Audits:**
```
                             Jul 14 (28 arts)    Aug 02 (29 arts)
Excellent 85+:                 Not scored this way   6 (20.7%)
Good 80-84:                    14 (50.0%)            6 (20.7%)
Fair 70-79:                    10 (35.7%)           15 (51.7%)
Needs Work <70:                 4 (14.3%)             2 (6.9%)
Average (different models):    79/100                78.9/100
```

**Methodology note**: The July 14 audit used 8-dimension automated scoring. The August audit uses per-gate manual scoring with encoding errors, data contradictions, and Schema integrity all factored in. The August scoring is inherently stricter across more dimensions, which is why the average appears similar despite significant content improvements (URL renames, B2B H2 rewrites, InfoGain boosts, CTA additions).

---

## 3. Top 5 & Bottom 5

### Top 5

| # | Article | Score | Strength | Risk |
|---|---------|:-----:|----------|------|
| 1 | **gan-v-oem-fertigung** | 89 | ZERO HTML errors; 16/17 metrics consistent; stronger data consistency than EN; Bosch case study DE-exclusive | Cross-language GaN V temperature conflict with EN (45-55C vs 65-75C); ESPR missing |
| 2 | **hotelladegeraete-oem** | 88.4 | Best DACH localization overall (DGUV V3, DSGVO, MBO ss41, Stiftung EAR, Destatis); BOM cost 16.10 EUR first-party data; NO H2 nesting (EN had 4) | FAZIT uses `<p>` not `<h2>`; Speakable FAQ selector targets zero DOM elements |
| 3 | **powerbank-spezifikationen** | 87.9 | FAQ B2B language 92/100; wordCount 0.87% accurate; research brief gaps all addressed; 6 total issues only | Minor Umlaut typo; dateModified mismatch |
| 4 | **fabrikpruefung-checkliste** | 87 | 11 comparison tables (most in corpus); 16+ authoritative links; 0 H3-nesting violations (EN had 8); InfoGain 95/100 | AQL level swap in 4 locations (safety risk); 4 residual Swiss ss |
| 5 | **gan-ladegeraete-leitfaden** | 86 | ZERO P0 issues; timeRequired perfectly aligned (PT14M = "14 min Lesezeit"); Bosch/MediaMarkt/Saturn/Euronics DACH context; EUR-denominated FOB | Only 55% H2 B2B (EN: 86%); single Swiss ss instance |

### Bottom 5

| # | Article | Score | Primary Failure | Est. Fix Effort |
|---|---------|:-----:|-----------------|:-----:|
| 29 | **kabelloses-laden** | 61 | 60-80+ Umlaut body text regression (July fix silently undone); 9/10 H2s lack H3; cross-language market size conflict; missing EMV-Richtlinie | 4-6 hours |
| 28 | **gan-vs-silizium-ladegeraete-vergleich** | 67 | 10 Key Takeaways Umlaut corruptions; 9/10 H2s lack H3 (worst heading hierarchy of any article); missing FLIR/MTBF/return-rate data present in EN; missing ESPR digital product passport | 3-4 hours |
| 27 | **fabrikauswahl-china-leitfaden** | 71 | wordCount 40% understated; LkSG threshold outdated (250-employee claim never implemented); VerpackG entirely missing | 2-3 hours |
| 26 | **zertifizierungen-eu-markt** | 71 | 40-50 FAQ + TOC Umlaut regression; timeRequired 3x wrong; wordCount 40% understated; H2 B2B signal density too low (30%) | 2-3 hours |
| 25 | **usb-c-pd-3-1-erklaert** | 72 | 54 Umlaut errors (highest count in corpus); FAQ Schema/page mismatch; missing Factory Data panel; only 3/6 H2s B2B; P1=9 (highest in corpus) | 2-3 hours |

---

## 4. DE vs EN Cross-Language Comparison

### DE Outperforms EN (DE stronger by >=3 points): 9 articles

| DE Article | DE | EN | Delta | Why DE Wins |
|-----------|:--:|:--:|:-----:|-------------|
| qi2-vs-magsafe | **82** | 71 | **+11** | Correctly separates MFi licensing from FOB premium (EN conflated); avoids 7/10 EN issues |
| gan-v-oem-fertigung | **89** | 81 | **+8** | Cleaner data consistency; Bosch case study DE-exclusive; zero HTML errors |
| oem-vs-odm-leitfaden | **78** | 71 | **+7** | ZERO HTML tag mismatches (EN: 42); ZERO data contradictions (EN: 5+); 11/11 parameters cross-consistent |
| qi2-zertifizierung-importeure | **82** | 75 | **+7** | DACH context (CETECOM, Bitkom, Xing, 35M iPhones DE); cleaner data |
| fabrikauswahl-china-leitfaden | **71** | 62 | **+9** | DACH regulatory depth (LkSG, SS22f UStG, CSDDD); EN had Schema-body FOB completely mismatched |
| hotelladegeraete-oem | **88.4** | 81.9 | **+6.5** | DACH localization unmatched (DGUV V3, DSGVO, MBO ss41); zero H2 nesting |
| markt-trends-ladegeraete-2026 | **78** | 72 | **+6** | All 6 FAQ answers internally consistent (EN: $42.4B vs $18.4B confusion) |
| usb-c-pd-schnellladen | **78** | 72 | **+6** | PD 3.2 body coverage (EN lacks entirely); wordCount 1.4% accurate (EN: 54% off) |
| semi-solid-state-powerbank | **84** | 78 | **+6** | EN's 3 P0 data contradictions (GB standard confusion, cycle life, energy density) all absent from DE |

### EN Outperforms DE (EN stronger by >=3 points): 6 articles

| DE Article | DE | EN | Delta | Why EN Wins |
|-----------|:--:|:--:|:-----:|-------------|
| kabelloses-laden | 61 | **77** | **-16** | DE: 60-80+ Umlaut regression; 9/10 H2s lack H3; EN: cleaner encoding and heading hierarchy |
| gan-vs-silizium | 67 | **79** | **-12** | DE: 10 Key Takeaways Umlaut corruptions; 9/10 H2s lack H3; EN: has FLIR thermal/MTBF/return-rate data |
| qualitaetskontrolle-china | 82 | **89** | **-7** | DE: 10/11 H2s lack H3; AQL typo; EN: gold-standard CTA and visual hierarchy |
| sicherheitsstandards-ladegeraete | 79 | **86** | **-7** | DE: 58+ Umlaut corruptions; 3-zone encoding inconsistency; EN: cleaner Schema and consistent orthography |
| ladegeraet-import-china | 77 | **83** | **-6** | DE: 18+ Key Takeaways Umlaut damage; EN: cleaner Schema and zero encoding issues |
| powerbank-mah-kapazitaet | 78 | **83** | **-5** | DE: compact format lost InfoGain (no named cell models/equipment); missing DACH regs |

### Approximately Tied (within +/-2.5 points): 14 articles

| DE Article | DE | EN | Delta | Notes |
|-----------|:--:|:--:|:-----:|-------|
| gan-ladegeraete-leitfaden | 86 | 88 | -2 | EN has stronger H2 B2B (86% vs 55%) |
| powerbank-eigenmarke-oem | 74 | 73.9 | +0.1 | Both have FOB price contradictions |
| lieferanten-china-finden | 78 | 80 | -2 | LkSG missing in DE |
| autoladegeraet-ratgeber | 78 | 79.8 | -1.8 | DE cleaner pricing; EN better heading hierarchy |
| eu-batterieverordnung | 83 | 84 | -1 | Same Wikidata + H3 issues in both |
| gan-generationen-uebersicht | 74 | 76 | -2 | DE has 6 P0s (most in corpus); EN scoring slightly higher |
| zertifizierungen-eu-markt | 71 | 72 | -1 | Consistently low B2B across both |
| usb-c-pd-3-1-erklaert | 72 | 72 | 0 | Both at 72 with different root problems |
| powerbank-hersteller-china-oem | 77.5 | 79.8 | -2.3 | Similar structural issues |
| oem-versand-aus-china | 74.8 | 78.4 | -3.6 | EN had +24 InfoGain improvement |
| gan-ladegeraet-technologie | 86 | 82 | +4 | DE cleaner data; EN better H1 |
| fabrikpruefung-checkliste | 87 | 84 | +3 | DE: better InfoGain but AQL errors |
| powerbank-spezifikationen | 87.9 | 84.8 | +3.1 | DE FAQ language 92/100 |
| powerbank-beschaffung-leitfaden | 80 | 84 | -4 | DE: residual Umlaut damage |

**Overall head-to-head**: DE wins 9, EN wins 6, tied/close 14. The DE advantage comes from cleaner data consistency (DE articles written after EN, incorporating lessons learned). The EN advantage comes from no Umlaut/encoding problems and more consistent heading hierarchy.

---

## 5. DE-Specific Systemic Issues

### 5.1 UTF-8 Umlaut Regression (18+ articles, ~180+ errors) -- THE DE EMERGENCY

**Root cause**: The July 14 6-dimension audit fixed 278 Umlaut corruptions plus 30 ss->ss corrections across the entire DE blog. The August audit found **180+ residual and new errors**, concentrated in Schema JSON-LD blocks, Key Takeaways boxes, CTA headings, and FAQ sections. These are locations typically edited via copy-paste or template variable injection, not through the main Nunjucks content block. The pattern strongly suggests **PowerShell `Set-Content` encoding trap** (documented in `MEMORY.md`): when `.njk` files are edited via PowerShell instead of the agent-based Edit tool, UTF-8 multi-byte characters are silently mangled.

**Severity breakdown:**

| Article | Error Count | Primary Location | Type | Severity |
|---------|:----------:|------------------|------|:--------:|
| kabelloses-laden | **60-80+** | Body text (lines 320-671) | Full-document ASCII-fallback | Critical |
| sicherheitsstandards-ladegeraete | **58+** | FAQ JSON-LD + visible FAQ (5 answers) + Key Takeaways | Character-stripping + ASCII-fallback | Critical |
| usb-c-pd-3-1-erklaert | **54** | Schema JSON-LD (40) + visible FAQ (13) + body (1) | ASCII-fallback | Critical |
| zertifizierungen-eu-markt | **40-50** | FAQ body + Author Bio + TOC | ASCII-fallback + character loss | Critical |
| powerbank-beschaffung-leitfaden | **~30** | Body text (residual from July fix) | ASCII-substitution | Critical |
| ladegeraet-import-china | **18+** | Key Takeaways + CTA heading | ASCII-fallback | High |
| gan-vs-silizium-ladegeraete-vergleich | **10** | Key Takeaways (7) + CTA (2) + Author Bio (1) | ASCII-fallback | High |
| qi2-zertifizierung-importeure | **8** | CTA heading + Related Articles | ASCII-fallback | High |
| lieferanten-china-finden | **6+** | Entire visible FAQ (6 questions) + image alt | ASCII-fallback | High |
| markt-trends-ladegeraete-2026 | **5** | Body text (Swiss ss) | Orthographic (not encoding) | Medium |
| qi2-vs-magsafe | **5** | Body text (Swiss ss) | Orthographic | Medium |
| semi-solid-state-powerbank | **5** | Section 4 paragraph | ASCII-fallback | Medium |
| fabrikpruefung-checkliste | **4** | Body text (Swiss ss) | Orthographic | Medium |
| powerbank-eigenmarke-oem | **6** | Body text (Swiss ss) | Orthographic | Medium |
| oem-versand-aus-china | **3** | Body text (isolated) | Keyboard input errors | Low |
| qualitaetskontrolle-china | **2** | Kernerkenntnisse (AQL decimal) + body | 1 Swiss ss + 1 AQL typo | Medium |
| autoladegeraet-ratgeber | **1** | Expert quote ("heisst") | Orthographic | Low |
| gan-ladegeraete-leitfaden | **1** | Comparison table ("Baugrosse") | Orthographic | Low |

**Clean articles (no Umlaut/ss errors detected in August audit)**: gan-ladegeraet-technologie, powerbank-spezifikationen, powerbank-mah-kapazitaet, eu-batterieverordnung, oem-vs-odm-leitfaden, usb-c-pd-schnellladen, hotelladegeraete-oem, gan-v-oem-fertigung, powerbank-hersteller-china-oem, gan-generationen-uebersicht, fabrikauswahl-china-leitfaden = **11 articles clean**.

**Notable**: The 3 articles that had "full text Umlaut corruption" in July 14 (kabelloses-laden, oem-vs-odm, powerbank-auswahl) show divergent results:
- **oem-vs-odm-leitfaden**: July fix held. August audit shows perfect Umlaut integrity. Clean.
- **powerbank-beschaffung-leitfaden** (renamed from powerbank-auswahl-leitfaden): July fix partially held. August audit found ~30 residual errors. The rename operation likely re-introduced some corruption.
- **kabelloses-laden**: **Catastrophic regression.** July fix was silently undone. 60-80+ body text umlauts damaged. The worst case in the corpus.

**Fix approach (3-tier)**:
1. **Immediate (P0)**: Agent-based per-article Umlaut restoration on 18 affected articles using the Edit tool (NOT PowerShell). Estimated 3-6 hours total.
2. **Systemic (P0)**: Replace any PowerShell `Set-Content`/`Get-Content` calls in the build/deploy pipeline with .NET `[System.IO.File]::WriteAllText($path, $content, [System.Text.UTF8Encoding]::new($false))` (no BOM). Estimated 20 minutes.
3. **Prevention (P1)**: Add pre-commit hook that greps for ASCII-fallback patterns (`ae` for a, `oe` for o, `ue` for u in German text contexts) and blocks commits. Estimated 30 minutes.

### 5.2 H3 Structure Deficiency (20+ articles with >=50% H2 sections missing H3)

| Article | H2s without H3 | Total H2s | % Missing | Uses `<strong>` Pseudo-H3? |
|---------|:-------------:|:---------:|:---------:|:------------------------:|
| eu-batterieverordnung | 10 | 10 | **100%** | No (flat paragraphs only) |
| powerbank-hersteller-china-oem | 12 | 13 | **92%** | Yes (some sections) |
| qualitaetskontrolle-china | 10 | 11 | **91%** | Yes (7 sections use `<strong>`) |
| gan-vs-silizium-ladegeraete-vergleich | 9 | 10 | **90%** | Yes (all 9 sections) |
| kabelloses-laden | 9 | 10 | **90%** | Yes (mixed) |
| zertifizierungen-eu-markt | 6 | 10 | **60%** | Partial |
| powerbank-mah-kapazitaet | 3 | 6 | **50%** | Yes (3 sections) |
| autoladegeraet-ratgeber | 3 | ~8 | **38%** | Yes (mixed) |

The `<strong>` pseudo-heading anti-pattern provides visual structure (bold text acting as visual sub-headings) but generates **zero semantic value** for screen readers, Google's heading-aware content parsing, Featured Snippet extraction, and AI crawlers scanning for question-answer pairs. This is the single largest structural deficit across the DE blog.

**Fix**: Systematic `<strong>` -> `<h3>` promotion with class-based styling. Each pseudo-heading becomes a proper `<h3>` with CSS classes matching the `<strong>` visual appearance. Estimated effort: 15-20 min per affected H2 section.

### 5.3 Schema English Leakage (9+ articles)

English promotional text `"WOWOHCOOL has served 200+ global brands since 2013 with a defect rate below 0.3%"` appears in German FAQ JSON-LD Schema in at least 9 articles:

| Article | Schema FAQ Location | Visible on Page? |
|---------|---------------------|:----------------:|
| oem-vs-odm-leitfaden | FAQ Q2 Schema | No |
| ladegeraet-import-china | FAQ DDP Schema | No |
| oem-versand-aus-china | FAQ Schema | No |
| fabrikpruefung-checkliste | FAQ Q5 Schema | No |
| gan-generationen-uebersicht | FAQ Q7 Schema | No |
| lieferanten-china-finden | FAQ Schema | No |
| powerbank-hersteller-china-oem | FAQ Schema | No |
| zertifizierungen-eu-markt | FAQ Schema | No |
| semi-solid-state-powerbank | FAQ Schema | No |

**Pattern**: The identical English sentence appears in Schema only -- never in visible page content. Confirms a template-level copy-paste error: the sentence was added to a shared FAQ Schema template or injected via batch operation. Google's Structured Data guidelines explicitly warn against Schema content that differs from visible page content. AI crawlers extracting German FAQ answers get mixed German-English output.

**Fix**: Remove the English sentence from all DE FAQ Schema blocks (find-and-replace, 5 minutes). If the factory stat is needed in Schema, add it to the Organization/ManufacturingBusiness node in German.

### 5.4 Swiss ss vs German ss (8+ articles, 30+ instances)

Articles use Swiss Standard German orthography (ss instead of ss after long vowels/diphthongs) despite declaring `inLanguage: "de-DE"`:

| Word | Swiss (incorrect for de-DE) | German (correct) | Articles | Count |
|------|---------------------------|------------------|----------|:-----:|
| grosste | **grosste** | grosste | markt-trends, qi2-vs-magsafe | 10 |
| heisst | **heisst** | heisst | autoladegeraet | 1 |
| regelmassig | **regelmassig** | regelmassig | fabrikpruefung, sicherheitsstandards | 4 |
| begrusst | **begrusst** | begrusst | qualitaetskontrolle | 1 |
| Grosse | **Grosse** | Grosse | usb-c-pd-schnellladen, gan-ladegeraete-leitfaden | 2 |
| Stichprobengrosse | **Stichprobengrosse** | Stichprobengrosse | fabrikpruefung | 1 |
| Firmengrosse | **Firmengrosse** | Firmengrosse | fabrikpruefung | 1 |
| gemass | **gemass** | gemass | fabrikpruefung | 1 |
| ausschliessen | **ausschliessen** | ausschliessen | lieferanten-china | 1 |
| verschiedene -ss- words | **-ss-** | **-ss-** | powerbank-eigenmarke | 6 |

**Fix**: If editorial policy is DACH-neutral, change `inLanguage` to `"de"` and document. If policy is Germany-standard German, fix all 30+ instances. The July 14 audit fixed 24 such instances; the August audit found 30+ more across 8 articles.

### 5.5 DACH Regulation Coverage Gaps

| Article | Missing Regulation(s) | Priority | Impact |
|---------|----------------------|:--------:|--------|
| autoladegeraet-ratgeber | StVZO ss22a, ADAC, TUV, Stiftung Warentest | P1 | German automotive legal requirement + missing core trust authorities |
| powerbank-mah-kapazitaet | BattG, ElektroG, GS-Zeichen, TUV Rheinland | P0 | Zero DACH regulatory references in DACH-market article |
| markt-trends-ladegeraete-2026 | Statista, DIHK, Elektroniknet (only Bitkom/GfK) | P1 | Missing DE-specific data sources |
| fabrikauswahl-china-leitfaden | VerpackG / LUCID | P1 | Fines up to 200,000 EUR for non-compliance |
| gan-vs-silizium | ESPR 2024/1781 (Digital Product Passport) | P1 | Mandatory EU requirement from 2027 |
| kabelloses-laden | EMV-Richtlinie 2014/30/EU | P1 | Mandatory for wireless chargers |
| qualitaetskontrolle-china | DGUV Vorschrift 3, ProdSG, DAkkS, DIN prefix | P1 | Missing DE authority markers |
| gan-v-oem-fertigung | ESPR / Okodesign 2025/2052, LUCID/VerpackG | P1 | EN version covers ESPR; DE does not |
| eu-batterieverordnung | ProdSG, Bundesnetzagentur, ChemRRV (CH) | P1 | Research brief explicitly required all three |
| powerbank-hersteller-china-oem | BattG/WEEE in certification section body | P1 | Only in summary box and FAQ, not main body |

---

## 6. Data Consistency Comparison: DE vs EN

### DE Data Consistency: Dramatically Better

| Metric | EN Blog | DE Blog |
|--------|:-------:|:-------:|
| Articles with 3+ contradictions | 22/29 (76%) | **~5/29 (17%)** |
| Articles with 0 contradictions | 1/29 (3%) | **~10/29 (34%)** |
| Worst contradiction severity | Return rate 0.3% vs 2-5% (order-of-magnitude) | AQL 0.65 vs 0.065 (decimal point) |
| Best article | gan-chargers-guide (0 contradictions) | oem-vs-odm-leitfaden (0/11 parameters contradictory) |
| Schema-body FAQ mismatch | 10/29 (34%) | **~4/29 (14%)** |

### Articles with Verified Data Contradictions (DE):

| Article | Contradictions | Severity | Details |
|---------|:-------------:|:--------:|---------|
| oem-versand-aus-china | 3 | High | Zollsatz 0% vs 3.7% vs 0% (WTO-ITA preferential rate not explained); Amazon FBA date Jan vs Jul 2026 |
| ladegeraet-import-china | 2 | Medium | Zollsatz FAQ/HowTo 2.4-2.7% vs body 0% ITA |
| autoladegeraet-ratgeber | 2 | Medium | Muster 5 Tage vs 3-7 Tage; timeRequired PT8M vs 17 min |
| fabrikpruefung-checkliste | 2 | Critical | AQL 2.5 labeled Major (should be Minor); AQL 1.0 labeled Critical (should be Major) -- 4 locations |
| powerbank-eigenmarke-oem | 2 | High | FOB price 4-7 EUR vs 8.50 EUR (2x gap); Branding MOQ 100-300 vs 1,000 (3-10x gap) |
| qualitaetskontrolle-china | 1 | Critical | AQL 0.65 vs 0.065 (decimal point -- 10x safety risk) |
| gan-ladegeraet-technologie | 1 | Medium | Schaltfrequenz FAQ 10x vs body 100x |
| gan-v-oem-fertigung | 2 | High | GaN V temperature 45-55C (DE) vs 65-75C (EN cross-language); ODM MOQ 2,000 (DE) vs 3,000 (EN) |
| kabelloses-laden | 1 | Medium | Market size $18.2B (DE) vs $18.4B (EN) -- same source cited |
| semi-solid-state-powerbank | 1 | Medium | GB 47372-2026 effective date "Juni 2026" vs March 2027 (EN FAQ) |
| sicherheitsstandards-ladegeraete | 1 | Medium | dateModified Jul 2026 vs displayed date May 2026 (2-month gap) |

**12 of 29 articles (41%) have at least 1 verified data contradiction.** This compares to EN's 22 of 29 (76%) with 3+ contradictions.

### Why DE Data Consistency Is Superior

1. **DE articles written after EN**: The EN `oem-vs-odm` had 5 contradictions and 42 HTML tag errors. The DE `oem-vs-odm-leitfaden` has zero contradictions and zero HTML errors. Lessons were applied.

2. **Fewer sections/smaller surface area**: DE articles average 2,500-3,500 words (vs EN's 4,000-8,000). Fewer locations for data to diverge.

3. **Cleaner FAQ Schema alignment**: DE FAQ Schema answers match visible FAQ body text more consistently. EN had 10/29 FAQ body-schema mismatches; DE has ~4/29.

4. **Single-author consistency model**: DE articles appear to have been written/edited by fewer agents, reducing the "different agent updates different section" problem that caused EN's price/spec contradictions.

---

## 7. DACH Compliance Coverage

### Regulation Coverage Matrix

| Regulation | Purpose | Articles Covering | Coverage Rate | Articles Missing |
|-----------|---------|:-----------------:|:------------:|------------------|
| CE / EN 62368-1 | Product safety | 25+ | 86%+ | kabelloses-laden, usb-c-pd-schnellladen |
| GS-Zeichen | German safety certification | 18+ | 62%+ | powerbank-mah, usb-c-pd-3-1 |
| ProdSG | German Product Safety Act | 15+ | 52%+ | qualitaetskontrolle, eu-batterieverordnung |
| ElektroG / Stiftung EAR | WEEE Germany | 14+ | 48%+ | powerbank-mah, kabelloses-laden |
| EU-BattVO 2023/1542 | Battery regulation | 8+ | 28%+ | powerbank-mah, powerbank-beschaffung |
| RoHS / REACH | Hazardous substances | 18+ | 62%+ | -- |
| LkSG | Supply Chain Due Diligence | 4 | 14% | lieferanten-china, fabrikauswahl (outdated) |
| BattG | German Battery Act | 3 | 10% | powerbank-mah, powerbank-hersteller |
| VerpackG / LUCID | German Packaging Act | 3 | 10% | fabrikauswahl, gan-v-oem-fertigung |
| SS22f UStG | VAT for online marketplaces | 1 | 3% | Most articles |
| StVZO ss22a | Vehicle electrical mods | 0 | 0% | autoladegeraet-ratgeber |
| DGUV V3 | Electrical equipment testing | 1 | 3% | qualitaetskontrolle-china |
| EMV-Richtlinie 2014/30/EU | EMC for wireless | 0 | 0% | kabelloses-laden |
| ChemRRV (CH) | Swiss chemical risk | 0 | 0% | eu-batterieverordnung |

### Articles with Best DACH Coverage

| Article | Regulations Covered | Unique Depth |
|---------|---------------------|--------------|
| sicherheitsstandards-ladegeraete | ProdSG, ProdHaftG, BNetzA, GPSR, BattVO, DGUV V3, GS, CE, RoHS, WEEE | Best regulatory depth overall despite encoding issues |
| hotelladegeraete-oem | DGUV V3 (intervals/costs/docs/insurance), DSGVO Qi2 vs smart-device, MBO ss41 Brandschutz, Stiftung EAR, Destatis | Only article covering DGUV V3 and MBO ss41 in depth |
| fabrikauswahl-china-leitfaden | LkSG, SS22f UStG, CSDDD, EAR, BattG, GS, Stiftung EAR | Only article covering SS22f UStG |
| autoladegeraet-ratgeber | CE, E-Mark ECE R10 Rev 6, RoHS, WEEE, ProdSG, GS, EU 2022/2380, Stiftung EAR | Best automotive regulation coverage; missing StVZO ss22a |
| ladegeraet-import-china | BattG, ElektroG, Stiftung EAR, LG Munchen I ruling, HS 8504.40 WTO-ITA | Only article citing LG Munchen I ruling |

---

## 8. Priority Action Plan

### P0 Fixes by Category (Total: 75 P0 issues across 29 articles)

| Category | Count | Est. Time | Total Est. Hours |
|----------|:-----:|:---------:|:----------------:|
| Umlaut/encoding restoration (180+ errors, 18 arts) | 18 articles | 10-30 min | 3-6 hours |
| wordCount update (major discrepancies >20%) | 12 articles | 5-10 min | 1-2 hours |
| Data contradiction resolution | 10 articles | 15-30 min | 3-5 hours |
| Schema integrity (wrong entity, Ghost HowTo, FAQ mismatch) | 8 articles | 10-20 min | 1.5-3 hours |
| Schema English leakage removal (9 articles) | 9 articles | 2 min | 0.3 hours |
| dateModified staleness (>30 days or 2-month gap) | 5 articles | 1 min | 0.1 hours |
| timeRequired critical mismatch (>50% off) | 8 articles | 2 min | 0.3 hours |
| Heading tag errors (FAZIT missing h2) | 1 article | 5 min | 0.1 hours |
| Cross-language data alignment (DE vs EN) | 3 articles | 20 min | 1 hour |
| **TOTAL P0** | **75** | | **10-18 hours** |

### Top 10 Highest-Impact P0 Fixes (In Order)

1. **kabelloses-laden**: Restore 60-80+ body text Umlauts (30 min) -- worst regression in corpus, July fix undone
2. **sicherheitsstandards-ladegeraete**: Restore 58+ FAQ/Key Takeaways Umlaut/ss characters (30 min) -- most visible corruption
3. **usb-c-pd-3-1-erklaert**: Restore 54 Schema+FAQ Umlaut errors (30 min) -- highest error count
4. **zertifizierungen-eu-markt**: Restore 40-50 FAQ/TOC Umlaut errors (20 min) -- critical regression
5. **powerbank-beschaffung-leitfaden**: Restore ~30 residual body Umlaut damage (20 min) -- incomplete July fix
6. **qualitaetskontrolle-china**: Fix AQL 0.65 -> 0.065 in Kernerkenntnisse (5 min) -- 10x safety-critical decimal error
7. **fabrikpruefung-checkliste**: Fix AQL level swap (Major/Critical) in 4 locations (15 min) -- procurement contract risk
8. **oem-versand-aus-china**: Resolve Zollsatz 3-way contradiction (20 min) -- EUR 315 financial impact per shipment
9. **gan-generationen-uebersicht**: Fix Ghost HowTo (Schema has no matching body section) + English in FAQ Schema (15 min) -- Google policy violation
10. **powerbank-eigenmarke-oem**: Fix FOB price 2x gap (4-7 vs 8.50 EUR) + Branding MOQ 3-10x gap (20 min) -- buyer makes impossible order

### P1 Fixes by Category (Total: 127 P1 issues)

| Category | Count | Est. Time | Total Est. Hours |
|----------|:-----:|:---------:|:----------------:|
| H3 structural gaps (<strong> -> `<h3>` promotion) | 20+ articles | 15-20 min per section | 5-10 hours |
| DACH regulation gaps (missing regs) | 10 articles | 15-20 min | 3-4 hours |
| wordCount verification (minor discrepancies) | 8 articles | 5 min | 1 hour |
| H2 B2B signal density rebalancing | 5 articles | 10-15 min | 1-1.5 hours |
| Citation array updates | 8 articles | 5-10 min | 1-1.5 hours |
| dateModified refresh | 20 articles | 1 min | 0.3 hours |
| Organization -> ManufacturingBusiness | 10 articles | 2 min | 0.3 hours |
| hreflang / missing FR entries | 4 articles | 5 min | 0.3 hours |
| Other P1 (Information Gain gaps, LkSG updates, etc.) | 42 | 10-20 min | 7-14 hours |
| **TOTAL P1** | **127** | | **19-33 hours** |

### P2 Fixes by Category (Total: 140 P2 issues)

| Category | Count | Est. Time | Total Est. Hours |
|----------|:-----:|:---------:|:----------------:|
| Swiss ss -> ss orthography correction | 8 articles | 5 min | 1 hour |
| Missing semantic HTML tags (cite, data, time) | 15 articles | 20-30 min | 5-8 hours |
| FAQ optimization (count expansion, B2B language) | 10 articles | 10-15 min | 2-3 hours |
| Meta description / title tag polish | 8 articles | 5-10 min | 1-1.5 hours |
| Image alt text B2B keywords | 8 articles | 5 min | 1 hour |
| Internal link optimization | 6 articles | 5 min | 0.5 hours |
| Compound noun / hyphenation consistency | 5 articles | 5 min | 0.5 hours |
| Featured image srcset | 5 articles | 5 min | 0.5 hours |
| Other P2 (data viz, expert quotes, etc.) | 75 | 5-15 min | 6-19 hours |
| **TOTAL P2** | **140** | | **17-35 hours** |

### Systemic Fixes (One-Time Infrastructure)

| Fix | Method | Est. Time | Prevents |
|-----|--------|:---------:|----------|
| Add pre-commit Umlaut integrity check | Grep hook for ASCII fallback patterns in .njk | 30 min | All future Umlaut regressions |
| Replace PowerShell encoding in pipeline | .NET UTF-8 no-BOM write | 20 min | Root cause of encoding corruption |
| Add heading hierarchy validator to pre-commit | Parse DOM, reject `<strong>` where `<h3>` expected | 1 hour | Pseudo-heading anti-pattern |
| Add Schema/body language mismatch check | Grep for English sentences in de-DE FAQ Schema | 10 min | EN-in-DE Schema leaks |
| Build-time wordCount injection | 11ty filter counting rendered words | 2 hours | wordCount inaccuracy (all 29 articles) |
| Build-time timeRequired calculation | 11ty filter: wordCount / 150 wpm (DE tech) | 30 min | timeRequired mismatch (all 29 articles) |
| DACH regulation master partial | Shared Nunjucks include with current reg data | 2 hours | DACH regulatory gaps |
| **TOTAL SYSTEMIC** | | **6.5 hours** | |

### Quick Wins (Batch-Applicable, <30 min total)

| Fix | Articles | Method | Time |
|-----|:--------:|--------|:----:|
| Update dateModified to 2026-08-02 | ~24 | Find-and-replace frontmatter + schema | 10 min |
| Remove EN promo from DE FAQ Schema | 9 | Find-and-replace exact English sentence | 5 min |
| Change Organization to ManufacturingBusiness | ~10 | Find-and-replace in schema blocks | 5 min |
| Fix leading comma in expert quotes | ~5 | Find `, "` at attribution line start | 5 min |

### Articles Needing Structural Rewrites (Not Just Spot Fixes)

| Article | Reason | Est. Effort |
|---------|--------|:-----------:|
| **kabelloses-laden** | 60-80+ Umlaut restoration + 9 H3 promotions + missing EMV-Richtlinie | 4-6 hours |
| **gan-vs-silizium-ladegeraete-vergleich** | 10 Key Takeaways Umlaut fix + 9 H3 promotions + FLIR/MTBF/return-rate data injection | 3-4 hours |
| **qualitaetskontrolle-china** | 10 H3 promotions + AQL fix + DACH reg additions (DGUV, DIN, DAkkS) | 3-4 hours |
| **eu-batterieverordnung** | 10 H3 promotions + Wikidata entity fix + wordCount correction + ProdSG/Bundesnetzagentur/ChemRRV | 2-3 hours |
| **oem-versand-aus-china** | Zollsatz 3-way resolution + wordCount 56% fix + Amazon FBA date + 40GP container addition | 3-4 hours |

### Grand Total Estimated Effort

| Priority | Issues | Est. Hours |
|----------|:------:|:----------:|
| P0 (spot fixes) | 75 | 10-18 |
| P1 (structural + content) | 127 | 19-33 |
| P2 (polish + semantic) | 140 | 17-35 |
| Systemic (infrastructure) | 7 items | 6.5 |
| Structural rewrites | 5 articles | 14-20 |
| **GRAND TOTAL** | **342 issues** | **67-113 hours** |

**Comparison with EN**: EN blog estimated 52-98 hours. DE blog is 67-113 hours -- slightly higher due to the unique Umlaut/orthography crisis (18 articles, 180+ errors) that EN doesn't face. However, DE's data consistency fixes are significantly lighter (5 articles with contradictions vs EN's 15).

---

## 9. Comparison with July 2026 DE Audits

### What Was Fixed (July -> August)

1. **URL B2C Rename**: `was-ist-gan-ladegeraet` -> `gan-ladegeraet-technologie` -- the single most impactful DE structural fix
2. **dateModified Population**: July found 27/28 articles missing `modified`. August: all 29 have it (though 24 are stale by 5-30 days)
3. **H2 B2B Restructuring**: Multiple articles had B2C H2s rewritten to B2B procurement language:
   - gan-ladegeraet-technologie: All 8 content H2s B2B-framed (from "Was ist Galliumnitrid?")
   - powerbank-beschaffung-leitfaden: H2s reorganized around procurement decision chain
4. **Information Gain Boosts**: 7+ articles with critically low InfoGain (<50 in July) substantially improved:
   - fabrikauswahl-china-leitfaden: 50 -> 73 (+23)
   - autoladegeraet-ratgeber: 45 -> 80 (+35)
   - gan-ladegeraet-technologie: 60 -> 76 (+16)
5. **Image Count**: fabrikauswahl-china-leitfaden: 2 -> 5 images
6. **Schema FAQ Alignment**: Multiple articles now have visible FAQ sections matching Schema FAQ
7. **Template Layout**: Card-wrapped sections, dark blue TOC, orange-bar blockquote -- applied across most articles
8. **powerbank-hersteller-china-oem**: 55 -> 77.5 (+22.5 points, major rewrite success)

### What Regressed (July -> August)

1. **Umlaut/Orthography -- THE MAJOR REGRESSION**: July reported "0 errors" after 308 fixes. August found **180+ NEW errors**. Not a content regression -- a **pipeline regression**. The July fix was applied via agent-based Edit tool (proper UTF-8). Subsequent edits via PowerShell batch operations or template updates re-introduced the corruption. The Schema JSON-LD block, Key Takeaways box, and CTA headings were the most commonly re-corrupted locations.

2. **H2 B2B Overcorrection**: Some articles went from B2C (too low B2B) to over-optimized:
   - fabrikauswahl-china-leitfaden: 58.3% B2B H2 density (target 30-55%)
   - powerbank-eigenmarke-oem: 5 consecutive "OEM-" H2s
   - powerbank-hersteller-china-oem: 100% B2B H2 (6/6) -- zero consumer-friendly entry points

3. **English-in-Schema Leakage**: 9+ articles now have English text in DE FAQ Schema. This was NOT present in July (the July audit checked FAQ question quality, not language mismatch). New finding, not regression.

4. **H3 Pseudo-Heading Anti-Pattern**: Existed in July but was not detected by automated auditor. August manual audit found it in 20+ articles.

### What Remained Unchanged

1. **H1 Length Issues**: July flagged 24/28 H1s over 65 chars. August: most still over. Only `autoladegeraet-ratgeber` shortened (80+ -> 55).
2. **Compact DE Format**: Several DE articles remain significantly shorter than EN (powerbank-mah at 1,713 vs EN's 3,400). Deliberate editorial choice.
3. **oem-vs-odm-leitfaden quality**: Consistently structurally clean. July: Umlaut fix. August: perfect Umlaut integrity, zero P0s, zero data contradictions. Stable excellence.

### Key Insight: The Automated Auditor Blind Spot (Same Pattern as EN)

The July DE audit relied on automated tools that could not detect:
- **Umlaut encoding corruption** (compared counts, not character integrity)
- **Pseudo-H3 anti-pattern** (counted headings, not heading semantics)
- **Schema language mismatch** (checked structure, not language)
- **AQL decimal point errors** (0.65 vs 0.065 -- same character count)
- **Cross-language data contradictions** (DE vs EN versions of same data point)

The August manual audit found **342 issues** across 29 articles. The July automated audit flagged approximately 40-50. **The automation was ~85% blind.**

---

## Appendix A: Per-Article July vs August Score Comparison

| # | Article | Jul 14 Score | Aug 02 Score | Delta | Trend |
|---|---------|:-----------:|:-----------:|:-----:|:-----:|
| 1 | gan-v-oem-fertigung | 79 | **89.0** | +10.0 | Major improvement |
| 2 | hotelladegeraete-oem | 79 | **88.4** | +9.4 | Major improvement |
| 3 | powerbank-spezifikationen | 81 | **87.9** | +6.9 | Improved |
| 4 | fabrikpruefung-checkliste | 87 | **87.0** | 0.0 | Stable |
| 5 | gan-ladegeraete-leitfaden | 82 | **86.0** | +4.0 | Improved |
| 6 | gan-ladegeraet-technologie | 78 | **86.0** | +8.0 | Major improvement (URL rename + B2B rewrite) |
| 7 | semi-solid-state-powerbank | 84 | **84.0** | 0.0 | Stable |
| 8 | eu-batterieverordnung | N/A | **83.0** | NEW | New article (Aug 1, 2026) |
| 9 | qualitaetskontrolle-china | 86 | **82.0** | -4.0 | Degraded (heading hierarchy found) |
| 10 | qi2-vs-magsafe | 77 | **82.0** | +5.0 | Improved |
| 11 | qi2-zertifizierung-importeure | 75 | **82.0** | +7.0 | Improved |
| 12 | powerbank-beschaffung-leitfaden | 89 | **80.0** | -9.0 | Degraded (residual Umlaut damage + ogImage broken) |
| 13 | sicherheitsstandards-ladegeraete | 83 | **79.0** | -4.0 | Degraded (58+ Umlaut corruptions) |
| 14 | autoladegeraet-ratgeber | 78 | **78.0** | 0.0 | Stable (InfoGain improved, Schema declined) |
| 15 | powerbank-mah-kapazitaet | 75 | **78.0** | +3.0 | Improved |
| 16 | markt-trends-ladegeraete-2026 | 75 | **78.0** | +3.0 | Improved |
| 17 | oem-vs-odm-leitfaden | 71 | **78.0** | +7.0 | Improved (Umlauts fixed, URL renamed) |
| 18 | usb-c-pd-schnellladen | 79 | **78.0** | -1.0 | Stable |
| 19 | lieferanten-china-finden | 83 | **78.0** | -5.0 | Degraded (FAQ Umlaut corruption) |
| 20 | powerbank-hersteller-china-oem | 75 | **77.5** | +2.5 | Improved (major rewrite) |
| 21 | ladegeraet-import-china | 77 | **77.0** | 0.0 | Stable |
| 22 | oem-versand-aus-china | 81 | **74.8** | -6.2 | Degraded (new contradictions found) |
| 23 | powerbank-eigenmarke-oem | 80 | **74.0** | -6.0 | Degraded (FOB price 2x gap found) |
| 24 | gan-generationen-uebersicht | 70 | **74.0** | +4.0 | Improved (Ghost HowTo found but content improved) |
| 25 | usb-c-pd-3-1-erklaert | 70 | **72.0** | +2.0 | Slightly improved |
| 26 | zertifizierungen-eu-markt | 78 | **71.0** | -7.0 | Degraded (40-50 Umlaut regression) |
| 27 | fabrikauswahl-china-leitfaden | 80 | **71.0** | -9.0 | Degraded (score model shift; DACH content added) |
| 28 | gan-vs-silizium-ladegeraete-vergleich | 77 | **67.0** | -10.0 | Degraded (10 Umlaut corruptions + 9 H3 gaps found) |
| 29 | kabelloses-laden | 70 | **61.0** | -9.0 | Degraded (60-80+ Umlaut regression) |

**Net trend**: 13 improved, 12 degraded, 2 stable, 1 new. The degradation is almost entirely driven by the Umlaut/encoding crisis -- articles that were "clean" in July now have regressions due to pipeline corruption. The improvements are driven by B2B H2 rewrites, URL renames, and Information Gain boosts. The August scoring model is also stricter, penalizing structural issues (H3 gaps, Schema errors) that the July model ignored.

---

## Appendix B: Per-Article Umlaut/Orthography Status

| Article | Umlaut Errors | SS/SS Errors | Primary Location | July 14 Status | Aug 02 Status |
|---------|:------------:|:-----------:|------------------|:-------------:|:------------:|
| kabelloses-laden | **60-80+** | 0 | Body text (full) | Fixed (278 repairs) | **Regression** |
| sicherheitsstandards-ladegeraete | **40+** (FAQ) + **18+** (KT) | 1 | FAQ + Key Takeaways | Clean | **New corruption** |
| usb-c-pd-3-1-erklaert | **40** (Schema) + **13** (FAQ) | 0 | Schema + visible FAQ | Unknown | **New corruption** |
| zertifizierungen-eu-markt | **40-50** | 0 | FAQ + TOC + Author Bio | Clean | **Regression** |
| powerbank-beschaffung-leitfaden | **~30** | 0 | Body text (residual) | Fixed (278 repairs) | **Incomplete fix** |
| ladegeraet-import-china | **18+** | 0 | Key Takeaways + CTA | Clean | **New corruption** |
| gan-vs-silizium | **7** (KT) + **2** (CTA) + **1** (Bio) | 0 | Key Takeaways + CTA | Clean | **New corruption** |
| qi2-zertifizierung-importeure | **8** | 0 | CTA + Related Articles | Clean | **New corruption** |
| lieferanten-china-finden | **6+** (FAQ) | 1 | Visible FAQ + image alt | Clean | **New corruption** |
| powerbank-eigenmarke-oem | 0 | **6** | Body text (Swiss ss) | Unknown | New finding |
| markt-trends-ladegeraete-2026 | 0 | **5** | Body text (Swiss ss) | Unknown | New finding |
| qi2-vs-magsafe | 0 | **5** | Body text (Swiss ss) | Unknown | New finding |
| semi-solid-state-powerbank | **5** | 0 | Section 4 paragraph | Clean | **New corruption** |
| fabrikpruefung-checkliste | 0 | **4** | Body text (Swiss ss) | "Fixed" (24 repairs) | **Missed** |
| oem-versand-aus-china | **3** | 0 | Body text (isolated) | Unknown | New finding |
| qualitaetskontrolle-china | 1 (AQL) | **1** | Kernerkenntnisse + body | "Fixed" (item #3) | **Missed** |
| autoladegeraet-ratgeber | 0 | **1** | Expert quote | Unknown | New finding |
| gan-ladegeraete-leitfaden | 0 | **1** | Comparison table | Unknown | New finding |
| usb-c-pd-schnellladen | 0 | **1** | HowTo schema | Unknown | New finding |

**Clean (11 articles)**: gan-ladegeraet-technologie, powerbank-spezifikationen, powerbank-mah-kapazitaet, eu-batterieverordnung, oem-vs-odm-leitfaden, hotelladegeraete-oem, gan-v-oem-fertigung, powerbank-hersteller-china-oem, gan-generationen-uebersicht, fabrikauswahl-china-leitfaden, lieferanten-china-finden.

---

## Appendix C: Top 10 Information Gain Leaders (DE)

| Article | DE InfoGain | EN InfoGain | DE Advantage | Unique DE Data |
|---------|:----------:|:----------:|:-----------:|----------------|
| fabrikpruefung-checkliste | 95/100 | 68/100 | **+27** | 11 comparison tables (most in corpus); AQL 3-tier; SGS/TUV/BV/Intertek cost comparison |
| qualitaetskontrolle-china | 95/100 | 70/100 | **+25** | 26+ data points; BSCI/SA8000/Sedex comparison; factory capacity data |
| semi-solid-state-powerbank | 88/100 (est.) | 70/100 | **+18** | Nail penetration test; 285 Wh/kg; GB standard analysis |
| hotelladegeraete-oem | 88/100 (est.) | 75/100 | **+13** | DGUV V3 costs/intervals; BOM 16.10 EUR first-party; MBO ss41 Brandschutz |
| sicherheitsstandards-ladegeraete | 88/100 (est.) | 88/100 | **0** | 10-layer protection architecture; recall forensics; ProdSG/ProdHaftG/BNetzA depth |
| gan-v-oem-fertigung | 88/100 (est.) | 88/100 | **0** | FLIR thermal; Chroma lab equipment; Bosch case study DE-exclusive |
| gan-ladegeraet-technologie | 76/100 | 72/100 | **+4** | GaN generation tables with chip models; BOM cost data; Infineon CoolGaN deep-dive |
| autoladegeraet-ratgeber | 80/100 | 82/100 | **-2** | Bosch automotive case study; KBA 49.1M vehicles; EU Common Charger directive |
| eu-batterieverordnung | 80/100 | 78/100 | **+2** | BattDG/Stiftung EAR walkthrough; OfH details; EUR pricing throughout |
| powerbank-spezifikationen | 72/100 (est.) | 72/100 | **0** | 32 entities; 396 data points; GB47372 formatting fixed |

---

*Master audit generated 2026-08-02 by SEOMACHINE Manual Audit Pipeline.*
*Individual per-article reports: `audits/page-audit-de-*-2026-08-02.md`*
*Previous baselines: `audits/de-blog-quality-audit-2026-07-14.md`, `audits/de-blog-6-dimension-audit-2026-07-14.md`*
*EN cross-reference: `audits/EN-BLOG-MASTER-AUDIT-2026-08-02.md`*

**Data completeness**: All 29 articles audited. All 29 per-article audit files read and synthesized into this master.
**Total issues found**: 342 (75 P0 + 127 P1 + 140 P2) across 29 articles.
**Estimated total fix effort**: 67-113 hours (including pipeline fixes and structural rewrites).
