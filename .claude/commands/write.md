# Write Command

Use this command to create comprehensive, SEO-optimized long-form blog content.

## Usage
`/write [topic or research brief]`

## What This Command Does
1. Creates complete, well-structured long-form articles (2000-3000+ words)
2. Optimizes content for target keywords and SEO best practices
3. Maintains your brand voice and messaging throughout
4. Integrates internal and external links strategically
5. Includes all meta elements for publishing

## Process

### Pre-Writing Review
- **Research Brief**: Review research brief from `/research` command if available
- **Article Type Detection** (CRITICAL — read BEFORE writing Introduction):
  - Check the research brief for `**Article Type**: B2B` or `**Article Type**: B2C`
  - If no brief exists, auto-detect from the topic: run a quick keyword check against B2B signals (OEM, factory, manufacturer, supplier, importer, procurement, sourcing, MOQ, FOB, compliance, certification, B2B) and B2C signals (best, top, review, cheap, for beginners, budget, for home, consumer)
  - **This single field controls which Introduction rules, CTA strategy, and checklist items apply.** Do NOT skip this step.
- **Brand Voice**: Check @context/brand-voice.md for tone and messaging
- **Writing Examples**: Study @context/writing-examples.md for style consistency
- **Style Guide**: Follow formatting rules from @context/style-guide.md
- **Blog Template Standard**: Follow layout and section ordering from @context/blog-template-standard.md (Hero → Hook → Featured Image → KEY TAKEAWAYS → TOC → H2 Sections → FAQ → Author Bio → CTA → Related → Sources)
- **SEO Guidelines**: Apply requirements from @context/seo-guidelines.md
- **Target Keywords**: Integrate keywords from @context/target-keywords.md naturally

### Content Structure

#### 1. Headline (H1)
- Include primary keyword naturally
- Create compelling, click-worthy title
- Keep under 60 characters for SERP display
- Promise clear value to reader

#### 2. Introduction (80–150 words)

**The Article Type field from the research brief determines which Introduction rules to apply.** If no brief exists, auto-detect from B2B/B2C keyword signals (see Pre-Writing Review). Do NOT mix rules from both modes.

---

##### ▶ Mode B2B: Direct Conclusion First — No Preamble, No Hook

B2B buyers do not read for entertainment. They scan to confirm: *"Does this article have the specific answer I need?"* Every word of preamble increases bounce rate.

**The first 2–3 sentences MUST deliver the core conclusion directly.** State the answer, the finding, or the key recommendation — not a question, not a story, not an industry trend.

| ❌ Fluff Opening (Bounce) | ✅ Direct Conclusion (Stay) |
|---|---|
| "In today's fast-paced electronics market, choosing the right GaN charger manufacturer has never been more important..." | "Importers verifying a 140W GaN charger supplier must check 3 thermal benchmarks before placing a first order. Skipping these tests risks CE compliance failure and 100% shipment rejection at EU customs." |
| "With the rapid development of battery technology, many businesses are wondering how to source semi-solid-state power banks..." | "Semi-solid-state power banks achieve 280 Wh/kg energy density — 40% higher than traditional lithium polymer — but only 6 factories worldwide can produce them at OEM scale. Here's how to qualify them." |

**Three rules for B2B openings:**
1. **Lead with a specific number or B2B signal word** — the reader must see a data point or procurement term in the first sentence
2. **Name the buyer's risk or the buyer's gain** — make it clear what's at stake
3. **No questions, no "Imagine...", no "In today's world..."** — these are recognized as SEO filler and cause instant bounce

- **Keyword**: Include primary keyword naturally in the opening
- **Credibility**: The opening itself demonstrates expertise — no need for a separate "why trust us" paragraph

##### ▶ Mode B2C: Hook + APP Formula (Default)

**CRITICAL: Direct Answer First (AI Search Optimization)**

For any "best/top/how" query, the first 1-2 sentences MUST directly answer the question. AI scrapers (ChatGPT, Perplexity, Gemini) pull from the top of the page. Don't bury the answer behind narrative.

**Example — "best project management tools":**
> The best project management tools in 2026 are Asana, Monday, and ClickUp — each built for different team sizes and workflows. Here's how they compare.

After the direct answer, use a hook to keep human readers engaged.

**Choose ONE hook type for each article:**

| Hook Type | Example | Best For |
|-----------|---------|----------|
| **Provocative Question** | "What if the 'free' plan is actually costing you $500/month in lost opportunities?" | Challenging assumptions |
| **Specific Scenario** | "Last Tuesday, Sarah checked her dashboard and discovered something alarming: her site had been invisible to Google for three weeks." | Creating emotional connection |
| **Surprising Statistic** | "73% of SaaS users who switch platforms do so within 18 months, and most cite the same three reasons." | Data-driven topics |
| **Bold Statement** | "Your current tool is lying to you about your numbers." | Controversial takes |
| **Counterintuitive Claim** | "The cheapest option might be the most expensive decision you make this year." | Comparison content |

**After the hook, follow the APP Formula:**
- **Agree**: Acknowledge something the reader already believes/feels
- **Promise**: Tell them exactly what they'll learn or gain
- **Preview**: Brief overview of what's coming (can include mini table of contents for long posts)

- **Keyword**: Include primary keyword in first 100 words
- **Credibility**: Establish why you/this article is authoritative

#### 3. Key Takeaways Block (After Introduction)

**REQUIRED: TL;DR block immediately after the introduction, before the first H2 body section.**

This gets pulled into AI-generated summaries and helps both AI and human readers quickly assess the article's value.

```markdown
> **Key Takeaways**
> - [Core finding or recommendation #1]
> - [Core finding or recommendation #2]
> - [Core finding or recommendation #3]
> - [Core finding or recommendation #4 if needed]
> - [Core finding or recommendation #5 if needed]
```

**Rules:**
- 3-5 bullet points
- Each bullet is a standalone claim with specifics (numbers, names, outcomes)
- NOT a table of contents — these are the article's actual conclusions
- Written after the full article is drafted (so the takeaways are accurate)

#### 4. Main Body (1800-2500+ words)
- **Logical Flow**: Organize sections in clear, progressive order
- **H2 Sections**: 4-7 main sections covering comprehensive topic scope
- **H2 B2B Density**: Apply tiered standard from `@context/b2b-blog-quality-audit-standard.md` Section II:
  - Technical/Educational articles: **10–40%** of H2s may contain B2B signal words
  - Procurement/Supply Chain articles: **30–55%**
  - OEM/ODM Core Topic articles: **50–80%**
  - B2B modifiers belong on procurement decision sections, NOT on pure technical explanation sections
  - No 3 consecutive H2s with the same B2B word; rotate vocabulary (sourcing/procurement/buying/supply)
- **H3 Subsections**: Break complex sections into digestible pieces
- **Keyword Integration**: Use primary keyword 1-2% density, variations throughout
- **Depth**: Provide thorough, actionable information at each point
- **Data**: Reference statistics and studies to support claims
- **Visuals**: Note where images, screenshots, or graphics enhance understanding
- **YouTube Embed**: Include at least one relevant YouTube video (prefer your own channel, then authoritative third-party) — AI models cross-reference video and article content
- **Lists**: Use bulleted or numbered lists for scannability
- **Formatting**: Bold key concepts, use short paragraphs (2-4 sentences MAX)

**REQUIRED: Mini-Stories (2-3 per article)**

Research shows we're 22x more likely to remember facts wrapped in stories. Every article MUST include 2-3 mini-scenarios with:
- A **specific person** (use names, even if fictional: "Sarah," "Mike," "The team at Acme Corp")
- A **concrete situation** with details (dates, numbers, specifics)
- A **clear outcome** that illustrates the point

**Example mini-story (aim for 50-150 words each):**
> "When Marcus launched his SaaS product in March 2024, he chose the cheapest hosting plan he could find, $5/month seemed like a no-brainer. Six months later, his app hit 10,000 active users. That's when he discovered the hidden bandwidth fees buried in his provider's terms. His $5/month plan suddenly became $89/month. Worse, migrating mid-growth meant a 3-week gap in analytics that cost him a $2,000 partnership deal. The 'savings' from cheap hosting cost him over $3,000."

**Place mini-stories:**
- One in the introduction or early section (to hook readers)
- One in the middle (to re-engage skimmers)
- One near the conclusion (to reinforce the main point)

**REQUIRED: Contextual CTAs (2-3 per article)**

**The Article Type field controls which CTA strategy to apply.** B2B procurement is long-cycle; B2C conversion is shorter. Mixing strategies (e.g., "Buy Now" on a B2B article) kills credibility.

---

##### ▶ Mode B2B: Low-Friction Value Continuation

B2B procurement is a long-cycle decision. No one reads one article and clicks "Buy Now." Every CTA must offer **low-friction value continuation** — a logical next step that delivers additional utility without asking for a purchase commitment.

**B2B CTA Placement Strategy:**

| Location | CTA Type | Example |
|----------|----------|---------|
| After first data-heavy section | **Inline Resource Link** | "📥 Download the one-page thermal benchmark cheat sheet for your next factory audit." |
| After comparison/proof section | **Tool/Checklist Offer** | "**Get Our 42-Point Factory Audit Checklist** — every verification point B2B importers must check before signing a PO." |
| End of article | **Value-Continuation CTA** | "**[Download the Full 140W GaN Charger Aging Test Report (PDF) →]**" or "**[Schedule a 30-Minute OEM Consultation With Our Engineering Team →]**" |

**B2B CTA Rules:**
- **Never**: "Buy now", "Click here", "Sign up today", "Get started" — these are B2C language
- **Always**: Offer a downloadable asset, checklist, report, spec sheet, or technical consultation
- Match the CTA type to the article's depth: technical deep-dive → download report; process guide → checklist; compliance article → consultation
- Inline CTAs inside body text convert better than end-only CTAs for B2B readers
- First CTA should appear within the first 500 words
- Never use generic "Click here" text

##### ▶ Mode B2C: Soft → Medium → Strong Funnel (Default)

Don't just put one CTA at the end. Embedded CTAs get 121% more conversions than end-only CTAs.

**B2C CTA Placement Strategy:**

| Location | CTA Type | Example |
|----------|----------|---------|
| After first major value section | **Soft CTA** (learn more) | "Want to see how this works in practice? [Explore our features →]" |
| After comparison/proof section | **Medium CTA** (try it) | "**Ready to test the difference?** Start a free trial, no credit card required." |
| End of article | **Strong CTA** (convert) | "**[Start Your Free Trial →]**" with supporting text |

**B2C CTA Rules:**
- Make CTAs contextual (relate to the section content)
- Vary the format (inline text, bold callout, button-style)
- First CTA should appear within the first 500 words
- Never use generic "Click here" text

#### 5. Conclusion (150-200 words)
- **Recap**: Summarize 3-5 key takeaways
- **Action**: Provide clear next steps for reader
- **CTA**: Include relevant call-to-action (free trial, resource download, etc.)
- **Encouragement**: End on empowering, forward-looking note

### SEO Optimization

#### Keyword Placement
- H1 headline
- First paragraph (within first 100 words)
- At least 2-3 H2 headings
- Naturally throughout body (1-2% density)
- Meta title and description
- URL slug

#### Internal Linking (3-5+ links)
- Reference @context/internal-links-map.md for key pages
- Link to relevant pillar content from your site
- Link to related blog articles
- Link to product/service pages where natural
- Use descriptive anchor text with keywords

#### External Linking (2-3 links)
- Link to authoritative sources for statistics
- Reference industry research or studies
- Link to tools or resources mentioned
- Build credibility with quality sources

#### Readability
- Keep sentences under 25 words average
- Use transition words between sections
- Vary sentence length for rhythm
- Write at 8th-10th grade reading level
- Use active voice predominantly
- Break up text with subheadings every 300-400 words

### Target Audience Focus
- **Audience Perspective**: Write for your target audience (defined in @context/brand-voice.md)
- **Practical Application**: Show how information applies to their specific challenges
- **Product Integration**: Naturally mention how your features solve problems (reference @context/features.md)
- **Industry Context**: Reference relevant trends and best practices
- **Technical Accuracy**: Ensure terminology and processes are correct for your industry

### Brand Voice Consistency
- Maintain your brand tone (reference @context/brand-voice.md for specifics)
- Follow your established voice pillars
- Use messaging framework from your context files
- Apply terminology preferences consistently
- Match tone to content type (how-to, strategy, news, etc.)

## Output
Provides a complete, publish-ready article including:

### 1. Article Content
Full markdown-formatted article with:
- H1 headline
- Introduction
- Body sections with H2/H3 structure
- Conclusion with CTA
- Proper formatting and styling

### 2. Meta Elements
```
---
Meta Title: [50-60 character optimized title]
Meta Description: [150-160 character compelling description]
Primary Keyword: [main target keyword]
Secondary Keywords: [keyword1, keyword2, keyword3]
URL Slug: /blog/[optimized-slug]
Internal Links: [list of pages linked from your site]
External Links: [list of external sources]
Word Count: [actual word count]
---
```

### 3. SEO Checklist
- [ ] Primary keyword in H1
- [ ] Primary keyword in first 100 words
- [ ] Primary keyword in 2+ H2 headings
- [ ] Keyword density 1-2%
- [ ] *(B2B only)* H2 B2B density in correct tier (Technical 10-40% / Procurement 30-55% / OEM Core 50-80%)
- [ ] *(B2B only)* No 3 consecutive H2s with identical B2B modifier
- [ ] 3-5+ internal links included
- [ ] 2-3 external authority links
- [ ] Meta title 50-60 characters
- [ ] Meta description 150-160 characters
- [ ] Article 2000+ words
- [ ] Proper H2/H3 hierarchy
- [ ] Readability optimized

### 4. AI Search Optimization Checklist
- [ ] **Direct answer**: First 1-2 sentences directly answer the target query
- [ ] **Key Takeaways**: TL;DR block with 3-5 specific bullet points after introduction
- [ ] **Meta description**: Directly answers the query (not just a teaser)
- [ ] **YouTube embed**: At least one relevant video embedded
- [ ] **FAQ prompts**: Questions written in natural language people would type into ChatGPT
- [ ] **One idea per section**: Each H2/H3 focuses on a single clear concept
- [ ] **Author attribution**: Named author in frontmatter

### 5. Engagement Checklist

**Article Type determines which items apply:**

**▶ Both B2B & B2C:**
- [ ] **Mini-stories**: 2-3 specific scenarios with names, details, and outcomes
- [ ] **Contextual CTAs**: 2-3 CTAs placed throughout (not just at end)
- [ ] **First CTA**: Appears within first 500 words
- [ ] **Paragraph length**: No paragraphs exceed 4 sentences
- [ ] **Sentence rhythm**: Mix of short (5-10 words) and longer sentences (15-25 words)

**▶ B2B only:**
- [ ] **Direct Conclusion**: First 2-3 sentences deliver the core conclusion (no preamble, no question)
- [ ] **Data-point lead**: First sentence contains a specific number or B2B signal word
- [ ] **Risk or gain named**: The buyer's risk or upside is explicit in the opening
- [ ] **No B2C hook types**: No provocative questions, scenarios, "Imagine...", or industry-trend openings

**▶ B2C only (default):**
- [ ] **Hook**: Opens with question, scenario, statistic, or bold statement (NOT generic definition)
- [ ] **APP Formula**: Introduction includes Agree, Promise, Preview elements
- [ ] **Hook variety**: Different hook types used across articles (don't always use the same type)

## File Management
After completing the article, automatically save to:
- **File Location**: `drafts/[topic-slug]-[YYYY-MM-DD].md`
- **File Format**: Markdown with frontmatter and formatted content
- **Naming Convention**: Use lowercase, hyphenated topic slug and current date

Example: `drafts/content-marketing-strategies-2025-10-15.md`

## Automatic Content Scrubbing

**CRITICAL**: Immediately after saving the article file, automatically invoke the content scrubber to remove AI watermarks and telltale patterns.

### Why This Matters
AI-generated content often contains invisible Unicode watermarks and characteristic patterns (like em-dash overuse) that can identify it as AI-written. Scrubbing removes these indicators to make content appear naturally human-written.

### Scrubbing Process
1. **Invoke Scrubber**: Run `/scrub [file-path]` on the saved article file
2. **Automatic Execution**: This should happen automatically, not require user action
3. **Timing**: Must occur immediately after file save, before any other processing
4. **Scope**: Scrub the main article file only (not meta or analysis files)

### What Gets Cleaned
- Invisible Unicode watermarks (zero-width spaces, BOMs, format-control characters)
- Em-dashes replaced with contextually appropriate punctuation (commas, semicolons, periods)
- Whitespace normalization and formatting cleanup
- All changes preserve content meaning and markdown structure

### Verification
The scrubber will display statistics:
- Unicode watermarks removed
- Format-control characters removed
- Em-dashes replaced

### Example Workflow
```
1. Write article → Save to drafts/article-name-2025-10-31.md
2. IMMEDIATELY run: /scrub drafts/article-name-2025-10-31.md
3. Verify scrubbing statistics
4. THEN proceed with optimization agents below
```

This ensures all published content is free of AI signatures before any further processing.

## Automatic Agent Execution
After saving the main article, immediately execute optimization agents:

### 1. Content Analyzer Agent (NEW!)
- **Agent**: `content-analyzer`
- **Input**: Full article, meta elements, keywords, SERP data (if available)
- **Output**: Comprehensive analysis covering search intent (with B2B/B2C classification), keyword density, content length comparison, readability score, SEO quality rating, **B2B content audit (11 checks)**, and **Information Gain scoring**
- **File**: `drafts/content-analysis-[topic-slug]-[YYYY-MM-DD].md`

This agent uses 7 specialized analysis modules:
- Search intent analysis + B2B/B2C audience classification
- Keyword density & clustering
- Content length vs competitors
- Readability scoring (Flesch scores)
- SEO quality rating (0-100) with B2B + Information Gain integration
- **B2B content audit (11 automated checks against 2026 Google standards)**
- **Information Gain scoring (Mode A: SERP comparison / Mode B: heuristic estimate)**

### 2. SEO Optimizer Agent
- **Agent**: `seo-optimizer`
- **Input**: Full article content
- **Output**: SEO optimization report and suggestions
- **File**: `drafts/seo-report-[topic-slug]-[YYYY-MM-DD].md`

### 3. Meta Creator Agent
- **Agent**: `meta-creator`
- **Input**: Article content and primary keyword
- **Output**: Multiple meta title/description options
- **File**: `drafts/meta-options-[topic-slug]-[YYYY-MM-DD].md`

### 4. Internal Linker Agent
- **Agent**: `internal-linker`
- **Input**: Article content
- **Output**: Specific internal linking recommendations
- **File**: `drafts/link-suggestions-[topic-slug]-[YYYY-MM-DD].md`

### 5. Keyword Mapper Agent
- **Agent**: `keyword-mapper`
- **Input**: Article and target keywords
- **Output**: Keyword placement analysis and improvements
- **File**: `drafts/keyword-analysis-[topic-slug]-[YYYY-MM-DD].md`

## Automatic Quality Loop

After saving the initial draft, automatically run the content quality scorer:

### Step 1: Score Content
Run the content scorer to evaluate the draft:
```bash
python data_sources/modules/content_scorer.py drafts/[article-file].md
```

### Step 2: Evaluate Score
The scorer evaluates 5 dimensions (composite score must be ≥70):

| Dimension | Weight | Target |
|-----------|--------|--------|
| Humanity/Voice | 30% | No AI phrases, use contractions |
| Specificity | 25% | Concrete examples, numbers, names |
| Structure Balance | 20% | 40-70% prose (not all lists) |
| SEO Compliance | 15% | Keywords, meta, structure |
| Readability | 10% | Flesch 60-70, grade 8-10 |

### Step 2.5: B2B Content Audit (2026 Google Standards)
After the content scorer passes, run the B2B content auditor to verify 11 B2B-specific checks:
```bash
python data_sources/modules/b2b_content_auditor.py drafts/[article-file].md
```
**Critical checks**: TL;DR block present, no vague label-style headings, no weak B2C CTAs, H2 B2B signal density in range, first-hand data density ≥ 3 per 1000 words.

If B2B audit score < 60: fix flagged issues before proceeding to agents.

### Step 3: Auto-Revise if Needed
If composite score < 70:
1. Review the `priority_fixes` from the scorer
2. Apply the top 3-5 fixes automatically
3. Re-score the content
4. Repeat once more if still below threshold

### Step 4: Route Based on Final Score
- **Score ≥ 70**: Save to `drafts/` and proceed to optimization agents
- **Score < 70 after 2 iterations**: Save to `review-required/` with a `_REVIEW_NOTES.md` file containing the scoring details and remaining issues

### Review-Required Folder
Articles that fail quality threshold after 2 revision attempts go to `review-required/`:
```
review-required/
├── article-name-2025-12-10.md
└── article-name-2025-12-10_REVIEW_NOTES.md
```

The `_REVIEW_NOTES.md` file contains:
- Final composite score
- Dimension breakdown
- Remaining priority fixes
- Reason for human review

## Quality Standards
Every article must meet these requirements:

### Content Requirements
- Minimum 2000 words (2500-3000+ preferred)
- Proper H1/H2/H3 hierarchy
- Primary keyword naturally integrated
- 3-5 internal links to your site content
- 2-3 external authoritative links
- Compelling meta title and description
- Clear introduction and conclusion
- Actionable, valuable information
- Brand voice maintained
- Target audience focused

### Engagement Requirements

**▶ Both B2B & B2C:**
- **2-3 mini-stories** with specific names, details, and outcomes
- **2-3 contextual CTAs** distributed throughout (not just at end)
- **First CTA within 500 words**
- **No paragraphs longer than 4 sentences**
- **Varied sentence rhythm** (mix short punchy + longer flowing)

**▶ B2B only:**
- **Direct conclusion opening** (first 2-3 sentences deliver the answer — no preamble, no question)
- **Data-point or B2B signal word in first sentence**
- **Risk/gain explicitly named** in the opening

**▶ B2C only (default):**
- **Compelling hook** in first 1-2 sentences (no generic openings)
- **APP Formula** in introduction (Agree, Promise, Preview)

### Quality Score
- **Composite quality score ≥70**
- Publish-ready quality

This ensures every article is comprehensive, optimized, engaging, and ready to rank while providing genuine value to your target audience.
