# Analyzer Scoring Logic: Market Alignment Audit

**Date:** 2026-07-19
**Scope:** All 5 landing page analyzers vs Google E-E-A-T + B2B CRO benchmarks
**Method:** Cross-reference analyzer scoring rules against Google Search Quality Rater Guidelines (Sept 2025) and 2026 B2B conversion benchmarks

---

## 1. Executive Summary

| Dimension | Current Coverage | Grade | Critical Gaps |
|---|---|---|---|
| Google E-E-A-T | ~40% | D | Experience signals, expertise depth, external authority, trust verification |
| B2B CRO Best Practices | ~35% | D | Page speed, mobile, reading level, CTA count logic, form friction, message match |
| Schema/Technical SEO | ~70% | C+ | Core Web Vitals, mobile-first, hreflang, structured data validation |
| Multilingual Support | ~85% | B | Chinese/Russian pattern coverage could be deeper |
| .njk Compatibility | ~90% | A- | Minor H1 edge cases remain |

**Overall Grade: C+ (55-60% alignment with market standards)**

---

## 2. Google E-E-A-T Coverage Analysis

### 2.1 Experience — "Has the author actually done this?"
**Coverage: 3/10**

| E-E-A-T Requirement | Analyzer Coverage | Gap |
|---|---|---|
| First-person language, real actions | ❌ Not detected | No analysis of "we tested", "our factory", "we measured" patterns |
| Original photos/screenshots | ⚠️ Alt text detected only | No verification that images are original (vs stock) |
| Named cases/clients/projects | ✅ Bosch/Jacob Jensen matched | Only major brand names; smaller clients not detected |
| Original data/test results | ⚠️ Numbers detected | No verification that data is first-party vs cited |
| Specific implementation details | ❌ Not detected | No depth-of-detail scoring |

**Fix:** Add `_score_experience_signals()` method that weights first-person language, original data markers ("nuestro aging test", "nuestra fábrica"), and named project specificity.

### 2.2 Expertise — "Does the author know the subject deeply?"
**Coverage: 4/10**

| E-E-A-T Requirement | Analyzer Coverage | Gap |
|---|---|---|
| Author bylines with credentials | ✅ Person schema detected | Doesn't validate credential quality or relevance to topic |
| Topical depth beyond surface | ⚠️ Word count + H2 count | No semantic depth analysis, no edge-case detection |
| Correct technical terminology | ⚠️ Bold terms detected | No verification that terms are used correctly in context |
| Citations to primary sources | ❌ Not detected | External links counted but not quality-assessed (EUR-Lex vs blog) |
| Topical concentration | ❌ Not detected | No cross-article topical authority assessment |

**Fix:** Add `_score_expertise_depth()` that checks: (a) ratio of technical terms to total words, (b) presence of primary-source citations (eur-lex, ieee, usb.org, boe.es), (c) author credential specificity (jobTitle specificity score).

### 2.3 Authoritativeness — "Do others recognize this site/author?"
**Coverage: 2/10**

| E-E-A-T Requirement | Analyzer Coverage | Gap |
|---|---|---|
| Backlink quality | ❌ Not covered | Requires external API (Ahrefs/Moz) — out of scope for static analysis |
| Brand mentions in publications | ❌ Not covered | Cannot detect from page content alone |
| Author external presence | ⚠️ LinkedIn URL detected | Doesn't verify profile quality, connection count, activity |
| Site topical focus | ❌ Not covered | No cross-page topical clustering analysis |
| Speaking/certifications | ⚠️ ISO/CE detected | Only standard certifications, not individual credentials |

**Fix:** Add `_score_authority_signals()` that weights: (a) sameAs social profile count and completeness, (b) CES/IFA/trade show mentions, (c) award/certification density per 1000 words.

### 2.4 Trustworthiness — "Is this site safe to rely on?"
**Coverage: 6/10**

| E-E-A-T Requirement | Analyzer Coverage | Gap |
|---|---|---|
| HTTPS | ❌ Not detected | Requires URL fetch — static file analysis can't check |
| Real contact info | ⚠️ Email/phone patterns | Doesn't verify multi-method (email+phone+address) |
| About page with team | ✅ H1/bio detection | Doesn't assess depth (photo, role, history) |
| Editorial standards | ❌ Not covered | No fact-check policy detection |
| Third-party reviews | ❌ Not covered | Requires external API |
| Updated dates | ✅ dateModified detected | Doesn't flag stale content (>6 months) |
| NAP consistency | ❌ Not covered | Cannot verify across pages |
| Warranty/guarantee | ✅ 12-24 month patterns | Good coverage for B2B risk reversal |
| IP/NDA protection | ✅ Detected | Good B2B-specific trust signal |

**Fix:** Add `_score_trust_depth()` with: (a) contact method count (0 methods = penalty), (b) content freshness check (dateModified age), (c) team page depth (photo count, bio word count).

---

## 3. B2B CRO Best Practices Coverage

### 3.1 Page Speed — COMPLETELY MISSING
**Coverage: 0/10**

| Benchmark | Impact | Analyzer Coverage |
|---|---|---|
| <3s load time → +32% CVR | Critical | ❌ No Lighthouse/PSI integration |
| 1s delay → -7% CVR | Critical | ❌ |
| 90+ Lighthouse score target | Important | ❌ |

**Fix:** Add optional `--check-performance` flag that calls PageSpeed Insights API. Without it, at minimum warn that performance is not assessed.

### 3.2 CTA Count Logic — INVERTED
**Coverage: 3/10 — Currently HARMFUL scoring**

| Research Finding | Current Analyzer Behavior | Problem |
|---|---|---|
| 1 link → 13.5% CVR | Penalizes <3 CTAs | **Analyzer pushes toward lower-converting pattern** |
| 5+ links → 10.5% CVR | Rewards 5+ CTAs | **Actively harmful recommendation** |
| Best practice: 1 primary CTA × 2-3 placements | Suggests "add more CTAs throughout page" | Contradicts data |

**Fix:** Invert CTA count scoring for B2B pages: 1-2 CTAs = optimal (no penalty), 3-4 = acceptable (minor warning), 5+ = over-optimized (warning: "Too many CTAs may dilute conversion. Research shows single-CTA pages convert 28% better."). WhatsApp as secondary CTA should NOT count toward the limit.

### 3.3 Mobile Optimization — MISSING
**Coverage: 0/10**

83% of B2B landing page visits are mobile. Our analyzers cannot assess: viewport meta tag, tap target sizes, responsive breakpoints, mobile-specific layout issues.

**Fix:** Add `_check_mobile_readiness()` that detects: viewport meta tag, media queries, form input types, minimum font sizes.

### 3.4 Reading Level — MISSING
**Coverage: 0/10**

5th-7th grade reading level converts 2.1x better than professional-level text (11.1% vs 5.3%). Our analyzers have no readability assessment.

**Fix:** Integrate `textstat` or `readability` Python library. Add `_score_readability()` with target: Flesch Reading Ease >60 (B2B), automated warning for scores <40.

### 3.5 Message Match — MISSING
**Coverage: 0/10**

H1-to-meta-title alignment is the #1 conversion killer for B2B. Not assessed.

**Fix:** Add `_check_message_match()` that compares H1 text to meta title and meta description for keyword/topic consistency.

### 3.6 Form Friction — MISSING
**Coverage: 0/10**

Reducing form fields from 7+ to 3-5 lifts conversions 25-120%. Not assessed.

**Fix:** Add `_check_form_friction()` that counts `<input>` fields in contact forms and flags >5 fields.

---

## 4. Scoring Inflation Analysis

### Current Scores vs Realistic Assessment

| Page | Analyzer Score | Realistic B2B Score | Inflation |
|---|---|---|---|
| ES Sobre Nosotros | 95 (A) | 75-80 (B) | +15-20 pts |
| ES Servicio OEM/ODM | 96 (A) | 80-85 (B+) | +11-16 pts |

### Root Causes of Inflation

1. **Trust scoring ceiling is too low.** Any B2B page with ISO 9001 + CE + client names hits 100/100. The ceiling should require: 3+ contact methods, fresh dateModified (<3 months), 3+ named team members, editorial policy, and third-party reviews.

2. **CTA count penalty is inverted.** We reward what research says hurts conversion.

3. **No performance penalties.** Without speed/mobile/readability checks, pages escape significant point deductions.

4. **Category weights favor trust too heavily.** B2B pages at 35% trust weight automatically score high because trust signals are the easiest to satisfy.

5. **No negative signals.** There's no penalty for: stock photos, missing contact page, stale content, broken links, excessive jargon.

---

## 5. Gap Priority Matrix

| Priority | Gap | Impact | Effort | Action |
|---|---|---|---|---|
| 🔴 P0 | CTA count logic inverted | Harmful scoring | Low | Invert B2B CTA penalty |
| 🔴 P0 | Trust inflation (ceiling too low) | Scores 15-20pts too high | Medium | Add trust depth requirements |
| 🔴 P0 | No negative signals | Missing critical failures | Medium | Add anti-pattern detection |
| 🟡 P1 | No readability analysis | 2.1x CVR gap | Low | Integrate textstat library |
| 🟡 P1 | No mobile check | 83% traffic unseen | Low | Add viewport/form detection |
| 🟡 P1 | No message match | #1 conversion killer | Low | Compare H1 ↔ meta title |
| 🟡 P1 | Experience signals missing | E-E-A-T gap | Medium | Add first-person/original data scoring |
| 🟢 P2 | No page speed check | +32% CVR gap | Medium | Optional PSI API integration |
| 🟢 P2 | No citation quality | Expertise gap | Low | Weight primary vs secondary sources |
| 🟢 P2 | No form friction check | 25-120% lift | Low | Count form fields |
| 🟢 P2 | No freshness penalty | Stale content risk | Low | Flag dateModified >6 months |

---

## 6. Recommended Scoring Weights (Revised)

### Current vs Proposed (B2B Pages)

| Category | Current Weight | Proposed Weight | Rationale |
|---|---|---|---|
| Above-fold | 20% | 25% | H1 + value prop + CTA visibility = highest leverage |
| CTAs | 20% | 15% | Important but over-weighted; single CTA is often optimal |
| Trust signals | 35% | 25% | Critical but currently inflationary; reduce + add depth requirements |
| Structure | 25% | 20% | Scannability matters but less than above-fold |
| Performance (NEW) | 0% | 10% | Mobile + readability + speed = 2x+ CVR impact |
| E-E-A-T signals (NEW) | 0% | 5% | Author credibility + citation quality |
| SEO | 0% | 0% | N/A for about/service pages |

### Trust Sub-Scoring (Fix Inflation)

| Trust Sub-Category | Current | Proposed Max | Requirement |
|---|---|---|---|
| Certifications (ISO, CE, etc.) | Unlimited | 20/100 | Count + verify relevance |
| Client names/logos | Unlimited | 20/100 | Named + logo + specific result |
| Contact methods | Pass/fail | 15/100 | 0=0, 1=5, 2=10, 3+=15 |
| Risk reversal (warranty, NDA) | Unlimited | 15/100 | Detect + assess specificity |
| Content freshness | Not checked | 10/100 | <3mo=10, <6mo=7, <12mo=4, >12mo=0 |
| Team/author depth | Not checked | 10/100 | Photo + bio + credentials |
| Third-party reviews | Not checked | 10/100 | Detect G2/Trustpilot/Google Reviews links |
| **MAX TOTAL** | **Uncapped** | **100/100** | |

---

## 7. Implementation Roadmap

### Phase 1: Fix Harmful Scoring (1-2 hours)
- [ ] Invert CTA count logic for B2B pages
- [ ] Cap trust scoring at 100 with sub-limits
- [ ] Add anti-pattern detection (stock photos, missing contact, stale content)

### Phase 2: Add Critical Missing Signals (2-3 hours)
- [ ] Integrate readability scoring (textstat)
- [ ] Add mobile readiness check
- [ ] Add message match (H1 ↔ meta)
- [ ] Add E-E-A-T experience signals
- [ ] Add form friction check

### Phase 3: Deepen Quality Assessment (3-4 hours)
- [ ] Citation quality weighting
- [ ] Content freshness scoring
- [ ] Author credential depth
- [ ] Optional PageSpeed Insights integration
- [ ] Cross-page topical authority

---

## 8. Key References

- Google Search Quality Rater Guidelines (September 2025 update)
- ZoomInfo 2026 Landing Page Conversion Benchmarks
- Unbounce Conversion Benchmark Report 2026
- Shopify Enterprise B2B CRO Strategies 2026
- SaaS Hero B2B Landing Page Performance Benchmarks
