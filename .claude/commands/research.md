# Research Command

Use this command to conduct comprehensive SEO keyword research and competitive analysis before writing new content.

## Usage
`/research [topic]`

## What This Command Does
1. Performs keyword research for your industry-related topics
2. Analyzes top-ranking competitor content
3. Identifies content gaps and opportunities
4. Develops unique angle for WOWOHCOOL perspective
5. Creates detailed research brief for writing

## Process

### 0. GSC Performance Data Collection (CRITICAL — Run Before Any Analysis)

**Why**: Replace keyword volume estimates with real Search Console data. Never guess search volume when you can query actual clicks and impressions from the site's own GSC data.

**Step 0a — Determine Article Status:**
- If the target article already exists (optimization/rewrite of published content):
  - Run: `cd "C:\Users\wowoh\seomachine" && MSYS_NO_PATHCONV=1 python data_sources/gsc_brief_injector.py --url /blog/[slug]/`
  - This returns: page-level clicks/impressions/CTR/position, site-wide keyword intelligence, quick wins, content gap keywords, low-CTR opportunities.
- If this is a NEW article (no URL yet):
  - Run: `cd "C:\Users\wowoh\seomachine" && MSYS_NO_PATHCONV=1 python data_sources/gsc_brief_injector.py --keyword "[primary keyword]"`
  - This returns: related queries the site already ranks for, quick wins, full-site keyword context.

**Step 0b — Embed the output** as the first data section in the brief:
  ```
  ## 0. GSC Performance Data
  [raw output from script — paste directly]
  ```

**Step 0c — Use real data to guide every subsequent decision:**
  - **Primary keyword selection**: Prioritize keywords ALREADY driving impressions (not guesswork)
  - **Secondary keywords**: The "Quick Wins" list (position 11-20) = your priority targeting list
  - **Content gaps**: "Content Gap Opportunities" (high impressions, position > 20) = topics the page should add dedicated sections for
  - **Meta optimization**: "Low CTR Opportunities" = title/description rewrite candidates
  - **Expansion targets**: Keywords with growing impressions = add fresh sections
  - **Relevance check**: If the page ranks for irrelevant queries, the content may need better focus

### Keyword Research
- **Primary Keyword**: Identify main target keyword for the topic
- **Search Volume & Difficulty**: Research estimated monthly searches and competition level
- **Keyword Variations**: Find semantic variations and long-tail opportunities
- **Related Questions**: Discover what people are actually asking (People Also Ask, forums, Reddit)
- **Search Intent**: Determine if intent is informational, navigational, commercial, or transactional
- **Topic Cluster**: Identify how this topic fits into WOWOHCOOL content clusters

### Competitive Analysis
- **Top 10 SERP Review**: Analyze the top 10 ranking articles for target keyword
- **Content Length**: Note word count of top-performing articles (benchmark target)
- **Common Themes**: What topics/sections do all top articles cover?
- **Content Gaps**: What's missing from competitor coverage?
- **Unique Angles**: What perspectives or insights are underexplored?
- **Featured Snippets**: Identify if there's a featured snippet opportunity
- **Domain Authority**: Note which competitors rank (indie blogs vs. major publications)

### Context Integration
- **Factory Data**: ALWAYS cross-reference @context/factory-data-panel.md for real WOWOHCOOL data — never invent MOQ, pricing, lead times, QC metrics, or certification costs from thin air. This is our competitive moat.
- **WOWOHCOOL Advantage**: How can WOWOHCOOL product features and factory capabilities naturally enhance this content? Use §10 "Competitive Differentiators" from the data panel.
- **Brand Alignment**: Check @context/brand-voice.md for messaging fit
- **Existing Content**: Review @context/internal-links-map.md for related WOWOHCOOL articles
- **Target Keywords**: Cross-reference with @context/target-keywords.md priority list
- **SEO Guidelines**: Ensure research aligns with @context/seo-guidelines.md requirements

### Charger & Power Bank Industry Focus
- **B2B Importer Angle**: How does this topic specifically impact charger/power bank importers and private-label brands?
- **Technical Requirements**: Any charger-specific technical considerations (GaN, PD 3.1, Qi2, battery safety)?
- **Industry Trends**: Current trends in charging accessories that relate to this topic
- **Use Cases**: Real OEM/ODM sourcing scenarios where this topic matters
- **Pain Points**: Specific challenges charger importers face with this topic

### Content Planning
- **Recommended Structure**: Outline H2 and H3 headings based on research
- **Content Depth**: Determine target word count (typically 2000-3000+ for SEO)
- **Supporting Evidence**: Identify statistics, studies, or data to include
- **Expert Sources**: Find industry experts or quotes to reference
- **Visual Opportunities**: Suggest images, screenshots, or graphics needed
- **Internal Links**: Map 3-5 key WOWOHCOOL pages to link to (from @context/internal-links-map.md)
- **External Authority**: Identify 2-3 authoritative external sources to link

### Hook Development
- **Introduction Angle**: Compelling way to open the article
- **Value Proposition**: Clear benefit reader will get from article
- **Contrarian Elements**: Any unexpected perspectives to explore
- **Story Opportunities**: Real examples or case studies to feature

## Output
Provides a comprehensive research brief with:

### 1. SEO Foundation
- **Primary Keyword**: [keyword] (volume, difficulty)
- **Secondary Keywords**: 3-5 related keywords and variations
- **Target Word Count**: Minimum words needed to compete
- **Featured Snippet Opportunity**: Yes/No, format (paragraph, list, table)

### 2. Competitive Landscape
- **Top 3 Competitor Articles**: URLs and key takeaways from each
- **Common Sections**: Must-cover topics based on SERP analysis
- **Content Gaps**: Opportunities to provide unique value
- **Differentiation Strategy**: How WOWOHCOOL can stand out

### 3. Recommended Outline
```
H1: [Optimized headline with primary keyword]

Introduction
- Hook
- Problem statement
- Value proposition

H2: [Main section 1]
H3: [Subsection]
H3: [Subsection]

H2: [Main section 2]
...

Conclusion
- Key takeaways
- Call to action
```

### 4. Supporting Elements
- **Statistics to Include**: 5-7 relevant data points with sources
- **Expert Quotes**: Potential sources or existing quotes
- **Examples/Case Studies**: Real OEM/ODM sourcing cases and factory projects to feature
- **Visual Suggestions**: Screenshots, charts, or graphics needed

### 5. Internal Linking Strategy
- **Pillar Page**: Main WOWOHCOOL pillar content to link to
- **Related Articles**: 2-4 relevant blog posts to link
- **Product Pages**: WOWOHCOOL features to naturally mention
- **Resource Pages**: Tools or guides to reference

### 6. Meta Elements Preview
- **Meta Title**: Draft optimized title (50-60 characters)
- **Meta Description**: Draft compelling description (150-160 characters)
- **URL Slug**: Recommended URL structure

## File Management
After completing the research, automatically save the brief to:
- **File Location**: `research/brief-[topic-slug]-[YYYY-MM-DD].md`
- **File Format**: Markdown with clear sections and structured data
- **Naming Convention**: Use lowercase, hyphenated topic slug and current date

Example: `research/brief-gan-charger-guide-2026-07-15.md`

## Next Steps
The research brief serves as the foundation for:
1. Running `/write [topic]` to create the optimized article
2. Reference material for maintaining SEO focus throughout writing
3. Checklist to ensure all competitive gaps are addressed

This ensures every article is built on solid SEO research and strategic competitive positioning.
