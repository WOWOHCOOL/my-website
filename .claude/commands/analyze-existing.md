# Analyze Existing Command

Use this command to review and analyze existing your company blog posts for SEO opportunities, content gaps, and improvement areas.

## Usage
`/analyze-existing [URL or file path]`

## What This Command Does
1. Fetches and analyzes existing blog post content
2. Evaluates current SEO performance and optimization
3. Identifies outdated information or statistics
4. Suggests content expansion opportunities
5. Provides actionable improvement recommendations

## Process

### Content Analysis
- **URL/File Input**: Accept either a live URL or local file path
- **Content Extraction**: 
  - **For `.md` drafts**: Read directly — pass to analyzers as-is
  - **For `.njk` templates**: Use `njk_preprocessor.py` to convert HTML → Markdown before analysis (auto-detected by `b2b_content_auditor.py`)
  - **Important**: Always pass the RAW `.njk` content to `audit_b2b_content()` — the auditor internally calls `njk_preprocess()` which converts `<h1>`→`#`, `<h2>`→`##`, `<a href>`→`[text](url)`, `<img>`→`![alt](src)`, and extracts meta/link/image data
  - **For URLs**: Fetch with WebFetch, then process as HTML (similar to .njk path)
- **Publication Date Check**: Note when content was originally published
- **Current Relevance**: Identify outdated information, statistics, or references
- **Completeness**: Assess if topic coverage is comprehensive or has gaps

### SEO Audit (Enhanced with New Analysis Tools)
- **Search Intent Analysis + B2B/B2C Classification** (NEW!): Determine if content matches search intent AND whether keyword targets B2B or B2C audience
- **Target Keyword**: Identify primary keyword and variations
- **Keyword Density & Clustering** (NEW!): Deep analysis of keyword density, distribution heatmap, topic clustering, and keyword stuffing risk detection
- **Keyword Placement**: Check H1, H2, first 100 words, meta title/description
- **Heading Structure**: Evaluate H1-H6 hierarchy and keyword integration
- **Content Length Comparison** (NEW!): Compare word count against top 10-20 SERP competitors to determine optimal length
- **Meta Elements**: Review meta title (50-60 chars) and description (150-160 chars)
- **Internal Links**: Count and evaluate quality of internal links (aim for 3-5+)
- **External Links**: Check for authoritative external sources
- **Readability Score** (NEW!): Calculate Flesch Reading Ease, Flesch-Kincaid Grade Level, passive voice ratio, sentence complexity
- **SEO Quality Rating** (NEW!): Overall score (0-100) with category breakdowns for content, keywords, meta, structure, links, readability, B2B quality, and Information Gain

### B2B Content Audit (2026 Google Standards — NEW!)
- **B2B Content Auditor** (`b2b_content_auditor.py`): 11 automated checks:
  - Opening Density — first sentences deliver core conclusion?
  - TL;DR Block — Key Takeaways block present above the fold?
  - H3 Answer Length — 100-150 char direct answer after each H3/H4?
  - Vague Heading Detection — label-style headings flagged, conclusion-style enforced?
  - H2 B2B Signal Density — within tiered range (Technical 10-40% / Procurement 30-55% / OEM Core 50-80%)?
  - First-Hand Data Density — ≥3 precise measurements + units per 1000 words?
  - Table Test — technical specs in markdown tables?
  - Stock Photo Detection — stock image domains flagged?
  - FAQ B2B Language — procurement language vs consumer language?
  - Author E-E-A-T Audit — byline, credentials, LinkedIn, author page?
  - Weak CTA Detection — B2C-style CTAs flagged, low-friction alternatives suggested?
- **Information Gain Analyzer** (`information_gain_analyzer.py`):
  - Mode A (SERP data available): Exact vocabulary/entity overlap vs top 5 competitors
  - Mode B (heuristic): Estimated from technical anchors + data density + named entities + B2B diversity

### Competitive Context
- **SERP Position**: Research current ranking for target keywords (if known)
- **Top Competitors**: Identify top 3-5 ranking articles for same keywords
- **Content Gaps**: What do competitors cover that this article doesn't?
- **Competitive Advantage**: What unique angles or insights could differentiate this?

### User Experience
- **Opening Quality**: Does the article lead with a direct conclusion (not a preamble/hook)? Is a TL;DR block present?
- **Structure**: Does the article flow logically with clear sections?
- **Actionability**: Are there practical takeaways and next steps?
- **Visual Elements**: Note if images, screenshots, or media are mentioned/needed
- **Call-to-Action**: Is there a clear CTA aligned with user intent?

## Output
Provides a comprehensive analysis report with:

### 1. Content Health Score (0-100)
Enhanced with new analysis modules:
- **SEO Quality Rating**: Overall SEO score with category breakdowns
- **Search Intent Alignment**: How well content matches search intent
- **Keyword Optimization**: Density, distribution, clustering analysis
- **Content Length Competitiveness**: Position vs SERP competitors
- **Readability Score**: Flesch scores and grade level
- **Relevance & Freshness**: Outdated content detection
- **B2B Content Quality** (NEW!): 11-check B2B audit — TL;DR block, heading quality, H2 B2B density, data density, table test, stock photos, FAQ language, author E-E-A-T, CTA quality
- **Information Gain** (NEW!): Content uniqueness vs SERP top 5 — Mode A (exact comparison) or Mode B (heuristic estimate)
- **User Experience**: Flow, structure, actionability

### 2. Quick Wins
Top 3-5 immediate improvements that can be made quickly:
- Update specific statistics or dates
- Add missing keywords to headings (with exact density recommendations)
- Optimize meta description
- Add internal links to specific pages
- Fix readability issues (sentence length, passive voice)

### 3. Strategic Improvements
Longer-term enhancements for maximum impact:
- **Content expansion**: Based on length comparison with competitors (e.g., "Add 800 words to match top performers")
- **Intent alignment**: Adjust content type to match search intent
- **Topic clustering**: Add missing semantic keywords and related topics
- New sections to add based on competitive gap analysis
- SEO optimization priorities from quality rating

### 4. Detailed Analysis Reports
The new Content Analyzer agent provides:
- **Search intent classification** with confidence scores
- **Keyword density heatmap** by section
- **Topic cluster visualization**
- **Competitive length benchmarks** (min, median, 75th percentile)
- **Readability metrics** (Flesch scores, sentence analysis, passive voice ratio)
- **SEO quality breakdown** by category (0-100 for each)

### 5. Rewrite Recommendations
- **Priority Level**: Low / Medium / High / Critical (based on SEO score and competitive analysis)
- **Estimated Effort**: Light edit / Moderate update / Major rewrite / Complete refresh
- **Expected Impact**: Potential traffic increase, ranking improvement, engagement boost (data-driven estimates)
- **Specific improvements needed**: Exact word count targets, keyword density adjustments, readability fixes

### 6. Research Brief
If a rewrite is recommended, provide initial research brief including:
- Updated target keywords with optimal density targets
- Competitor articles to review with word count benchmarks
- New statistics or data to incorporate
- Trending angles or perspectives
- Search intent alignment strategy
- Optimal content length recommendation (based on SERP analysis)
- Internal linking opportunities

## File Management
After completing the analysis, automatically save the report to:
- **File Location**: `research/analysis-[post-slug]-[YYYY-MM-DD].md`
- **File Format**: Markdown with scores, recommendations, and action items
- **Naming Convention**: Use lowercase, hyphenated post slug and current date

Example: `research/analysis-podcast-hosting-guide-2025-10-15.md`

## Next Steps
Based on the analysis, the system will suggest:
1. Running `/rewrite [topic]` if content needs significant updates
2. Running `/optimize [file]` if content needs light SEO polish
3. Archiving the post if it's no longer relevant or valuable

This ensures every analysis leads to clear, actionable next steps for improving your company blog content.
