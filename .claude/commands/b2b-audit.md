# B2B Audit Command

Use this command to run a quick B2B content quality audit against 2026 Google standards on any article.

**Canonical context files** (the 4-file B2B authority system):
- `@context/b2b-blog-quality-audit-standard.md` — Quality rules, 19 automated checks, scoring rubrics
- `@context/blog-template-standard.md` — HTML layout, CSS classes, DOM structure, code examples
- `@context/b2b-multilingual-metadata-standard.md` — JSON-LD design, 6-language mappings, wordCount verification
- `@context/b2b-schema-template.json` — Production JSON-LD template, `json.load()` valid after placeholder substitution

## Usage
`/b2b-audit [file path or URL]`

**Examples:**
- `/b2b-audit drafts/gan-charger-oem-guide-2026-07-22.md`
- `/b2b-audit https://www.wowohcool.com/blog/oem-vs-odm-guide/`
- `/b2b-audit C:\Users\wowoh\wowohcool.com\src\blog\gan-chargers-guide\index.njk`

## What This Command Does

Runs the complete B2B Content Auditor (`b2b_content_auditor.py`) with **19 automated checks + FAQ search-demand verification**:

### Content Quality (Checks 1-4)

| # | Check | What It Verifies | Scoring |
|---|-------|-----------------|---------|
| 1 | **Opening Density** | First 2-3 sentences deliver core conclusion (no fluff preamble)? AI fluff patterns detected? | Fluff -30/ea, no conclusion -40 |
| 2 | **KEY TAKEAWAYS Block** | Uppercase label + TL;DR summary + 3-5 bullet points above the fold? | Full=100, list only=60, absent=0 |
| 3 | **H3 Answer Length** | ≤150 char first-sentence conclusion after each H3/H4 (answer-first) | Compliance ratio = score |
| 4 | **Vague Heading Detection** | Label-style headings flagged? ("Testing" vs "3 Thermal Benchmarks to Verify") | -15/detection |

### Structure & SEO (Checks 5-8)

| # | Check | What It Verifies | Scoring |
|---|-------|-----------------|---------|
| 5 | **H2 B2B Signal Density** | Density in tiered range + adjacency cap (no 3 consecutive same B2B word) + vocabulary rotation | In range=100 |
| 6 | **First-Hand Data Density** | ≥3 precise measurements + engineering units (°C, mV, kHz, mm, $, €) per 1000 words | Staged: ≥3=100, 2-2.9=70, 1-1.9=40, <1=10 |
| 7 | **Table Test** | Technical parameters in Markdown tables? | Present=100, params outside tables=40 |
| 8 | **Stock Photo Detection** | Images from stock domains flagged? | Stock -25/img |

### Trust & Conversion (Checks 9-11)

| # | Check | What It Verifies | Scoring |
|---|-------|-----------------|---------|
| 9 | **FAQ B2B Language** | Questions use procurement language? Over 15 words flagged? → Auto-triggers Step 3.5 WebSearch verification | B2B ratio = score, >15 words -5/ea |
| 10 | **Author E-E-A-T** | Named author + credentials + LinkedIn + author page + topic expertise + compact author bar (6 checks) + **knowsAbout = 作者固定专长池**（逐字匹配 factory-data-canonical.md §15.2 对应作者池，全站统一不逐篇变化）+ **作者 URL 禁止本土化**（LinkedIn/作者页/头像路径/@id 保持英文原样，作者页仅英文版 /authors/ 总页 + 两个详情页，禁止 /de/authors/ 等本地化）+ **头像 alt 三处一致**（Author Bar / Author Bio / Person.image，按 §15.4 语言表）+ **作者展示位齐全**（H1 下 Author Bar + CTA 前 Author Bio）+ **作者独占**（文章唯一作者；同话题簇同作者，无双署名/换人）+ **Schema ↔ 前端一致**（Person.name/jobTitle 与 Author Bar / Author Bio 显示逐字一致） | 6/6=100；knowsAbout 池不匹配 -15；URL 被本土化 -15；alt 不一致 -10；双署名/同簇混写 -10；name/jobTitle 与前端不一致 -15 |
| 11 | **Weak CTA Detection** | CTA type (B2B value-continuation vs B2C "Buy now")? h2 heading? Gradient background? | Good=100, weak=40-60 |

### Technical & Consistency (Checks 12-19)

| # | Check | What It Verifies | Scoring |
|---|-------|-----------------|---------|
| 12 | **Heading Hierarchy** | H1→H3 or H2→H4 skips? (Fatal logic error — Google treats as broken taxonomy) | -25/skip |
| 13 | **URL Quality** | Underscores, uppercase, dates, stop words, word count. Staged: 3-6 words=pass, 7-8=warning, ≥9=deduction | Per violation |
| 14 | **Cross-Reference Consistency** | TL;DR vs body vs FAQ data consistency? | Discrepancy -20/ea |
| 15 | **Schema Validation** | JSON syntax? Missing fields? Trailing slash? speakable ↔ Schema? TOC-FAQ anchor? **Rule 1: Body-Schema FAQ word-for-word match**? Person knowsAbout vs 作者固定池（factory-data-canonical.md §15.2）？ | Syntax -30, missing field -15, mismatch -5~15 |
| 16 | **Factory Data Canonical** | MOQ/lead time/deposit/certification vs factory-data-canonical.md? | Canonical violation -15/ea |
| 17 | **Static HTML Quality** | Featured image srcset/sizes/fetchpriority/speakable/TOC bugs? | Per violation |
| 18 | **Anti-Pattern Detection** | Quick Answer blocks, TL;DR duplicates, cross-link overlap, data-dump intro? | -10~25/ea |
| 19 | **Accent/Spelling (i18n)** | Language-specific accent/spelling correctness? | Per violation |
## Process

### Step 1: Fetch/Read Content
- If URL: fetch the live page content
- If local file: read directly (supports `.md`, `.njk`, and `.html`)

### Step 2: Run B2B Audit
```bash
python data_sources/modules/b2b_content_auditor.py [file] [article_type]
```

Auto-detects article type (technical / procurement / oem_core) if not specified.

### Step 2.5: Verify wordCount Accuracy (MANDATORY — Anti-False-Positive)

The `information_gain_analyzer.py` word count includes ALL file content: SVG path data, JSON-LD schema text, HTML/Nunjucks template code, and frontmatter. This routinely produces **40-50% inflated counts** (e.g., 9,755 reported vs 5,300 actual main content).

**Always run this verification immediately after Step 2 and Step 3.** The canonical verification script lives in **`@context/b2b-multilingual-metadata-standard.md` §四（wordCount 验证）** — copy it from there (唯一维护源，本文件不重复内嵌脚本，避免两处漂移)。

**Decision rule**:
- If Info Gain analyzer reports 9,000+ words but the verified script above shows ~5,000: **override Schema wordCount with the verified value**
- If verified count and Schema wordCount differ by >10%: flag as "wordCount mismatch" in the report
- Acceptable tolerance: ±5% between Schema wordCount and verified main-content count

**Known inflation sources** (always excluded from wordCount):
- SVG inline icon path data (can add 500-2,000 false "words")
- JSON-LD schema text inside `<script>` tags
- Frontmatter YAML
- HTML/CSS class names and attributes
- Nunjucks template directives

### Step 2.6: FAQ Consistency Check (MANDATORY — Schema ↔ Body word-for-word)

`b2b_content_auditor.py` Check 14 documents "Rule 1: Body-Schema FAQ word-for-word match" but does **NOT** implement it at single-file level. Site-wide, the metadata audit auto-enforces it (**C11**: question names + counts), but for the single file being audited run this dedicated check:

```bash
python3 data_sources/modules/faq_consistency_check.py [file]
```

Verifies:
- FAQ question count matches (Schema FAQPage vs body `.faq-answer`)
- Each question word-for-word identical
- Each answer word-for-word identical (HTML entities decoded, so `&lt;` ≡ `<`)

Exit code `0` = all match, `1` = mismatch (fix before publishing). HTML-entity decode prevents false positives on `&lt;` vs `<`.

### Step 2.7: Placeholder Check (empty SVG / unresolved template tokens)

Detect copy-paste placeholders that should never ship (e.g. the old `<!-- calendar SVG -->` icon placeholder):

```bash
grep -nE '<svg[^>]*><!--|\{PLACEHOLDER\}|<!-- (calendar|clock|user) SVG -->' [file] && echo "WARN: placeholder found" || echo "OK: no placeholder"
```

Flags empty SVG (`<svg...><!--...-->`), `{PLACEHOLDER}` sentinels, and unresolved icon comments.

### Step 3: Run Information Gain Analysis
```bash
python data_sources/modules/information_gain_analyzer.py [file]
```

Uses Mode B (heuristic estimate) unless SERP competitor data is available. Evaluates: technical anchors, data points, named entities, B2B vocabulary diversity.

**Score tiers**: 70+ HIGH (Google rewards), 40-69 MODERATE, 20-39 LOW, <20 ZERO (Google suppresses).

### Step 3.5: FAQ Search-Demand Verification (AUTO)

If the B2B audit flags any of the following, automatically run WebSearch to verify FAQ questions against real market demand:

| Trigger | Condition | Action |
|---------|-----------|--------|
| FAQ > 15 words | Question may be artificially long | WebSearch the core keyword phrase (first 3-5 words) to check if real buyers search this way |

**Shortening rules** (when FAQ exceeds 15 words):
1. **Always preserve the `?` question mark** — it signals both Schema `@type: Question` intent and real-user search query matching. Dropping it degrades GEO citation match rate regardless of word count.
2. Use em-dash format: `"Topic keyword — short question?"` (e.g., `"GaN vs silicon BOM cost — what's the real OEM price difference per unit?"` = 14 words)
3. Cut filler words first: "what does it require and when do OEM brands need to comply" → "what OEM brands must comply with and when"
4. **Verify**: the shorter version + `?` must still be ≤ 15 words. If not, restructure the question syntax rather than dropping the `?`.
| FAQ detected consumer language | Question may not match B2B procurement context | WebSearch with added B2B qualifiers (OEM, factory, sourcing, MOQ) to verify B2B search demand exists |
| ALL FAQ (Rule 2) | Always verify on `/b2b-audit --verify-all-faq` | Batch WebSearch each FAQ question against the 4-step Rule 2 verification process |

**Verification method (per flagged question)**:
1. Extract core keyword phrase (first 3-5 words of the question or the primary search anchor)
2. WebSearch: `"{core phrase}" OEM OR factory OR supplier OR sourcing`
3. WebSearch: `"{core phrase}" site:alibaba.com OR site:globalsources.com`
4. Report verdict: VERIFIED (real buyer query) / NICHE (low search volume, may need broader context) / NO DEMAND (fabricated question, must rewrite)

**Output format**:
```
FAQ #3 "GaN vs silicon BOM cost at OEM volume — what's..."
  → Search "GaN vs silicon BOM cost OEM" → 5+ supplier pages, 2 comparison guides ✅
  → Search site:alibaba.com → 3 relevant product pages ✅
  → Verdict: VERIFIED — real buyer comparison query

FAQ #5 "Are 2-in-1 hybrid devices cheaper to import..."
  → Search "2-in-1 charger import HS code" → 3 blog posts, 0 supplier pages ⚠️
  → Search site:alibaba.com → 0 results ⚠️
  → Verdict: NICHE — consider adding broader procurement context or replacing with a higher-demand import FAQ
```

### Step 4: Report
Consolidated report with:
- Overall B2B Score (0-100)
- Per-check breakdown with pass/fail/N/A
- Critical issues requiring immediate fix
- Warnings and recommendations with specific rewrite suggestions

## Output

Saves audit report to `audits/b2b-audit-[slug]-[YYYY-MM-DD].md`.

## Score Interpretation

| Score | Status | Action |
|-------|--------|--------|
| 90-100 | Excellent | Ready to publish |
| 75-89 | Good | Minor fixes recommended |
| 60-74 | Fair | Address warnings before publishing |
| 40-59 | Needs Work | Significant B2B quality issues |
| Below 40 | Critical | Major rewrite required — do not publish |

## Quick Usage (CLI Only)

```bash
# Audit a draft
python data_sources/modules/b2b_content_auditor.py drafts/article.md

# Audit with explicit article type
python data_sources/modules/b2b_content_auditor.py drafts/article.md oem_core

# Information Gain (Mode B — no SERP data needed)
python data_sources/modules/information_gain_analyzer.py drafts/article.md
```

## Integration

This command is a **standalone B2B quality check**. Run it explicitly when you need B2B-specific verification:

- After `/write` — verify the new article meets B2B quality standards
- After `/rewrite` — verify the rewritten article meets B2B quality standards
- On existing content — audit any page for B2B quality compliance

It is NOT automatically triggered by other commands — call it explicitly with `/b2b-audit [file]`.
