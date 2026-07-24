# AEO and GEO Content Patterns

Reusable content block patterns optimized for answer engines and AI citation.

---

## Answer Engine Optimization (AEO) Patterns

These patterns help content appear in featured snippets, AI Overviews, voice search results, and answer boxes.

### Definition Block

Use for "What is [X]?" queries.

```markdown
## What is [Term]?

[Term] is [concise 1-sentence definition]. [Expanded 1-2 sentence explanation with key characteristics]. [Brief context on why it matters or how it's used].
```

**Example:**
```markdown
## What is Answer Engine Optimization?

Answer Engine Optimization (AEO) is the practice of structuring content so AI-powered systems can easily extract and present it as direct answers to user queries. Unlike traditional SEO that focuses on ranking in search results, AEO optimizes for featured snippets, AI Overviews, and voice assistant responses. This approach has become essential as over 60% of Google searches now end without a click.
```

### Step-by-Step Block

Use for "How to [X]" queries. Optimal for list snippets.

```markdown
## How to [Action/Goal]

[1-sentence overview of the process]

1. **[Step Name]**: [Clear action description in 1-2 sentences]
2. **[Step Name]**: [Clear action description in 1-2 sentences]
3. **[Step Name]**: [Clear action description in 1-2 sentences]
4. **[Step Name]**: [Clear action description in 1-2 sentences]
5. **[Step Name]**: [Clear action description in 1-2 sentences]

[Optional: Brief note on expected outcome or time estimate]
```

**Example:**
```markdown
## How to Optimize Content for Featured Snippets

Earning featured snippets requires strategic formatting and direct answers to search queries.

1. **Identify snippet opportunities**: Use tools like Semrush or Ahrefs to find keywords where competitors have snippets you could capture.
2. **Match the snippet format**: Analyze whether the current snippet is a paragraph, list, or table, and format your content accordingly.
3. **Answer the question directly**: Provide a clear, concise answer (40-60 words for paragraph snippets) immediately after the question heading.
4. **Add supporting context**: Expand on your answer with examples, data, and expert insights in the following paragraphs.
5. **Use proper heading structure**: Place your target question as an H2 or H3, with the answer immediately following.

Most featured snippets appear within 2-4 weeks of publishing well-optimized content.
```

### Comparison Table Block

Use for "[X] vs [Y]" queries. Optimal for table snippets.

```markdown
## [Option A] vs [Option B]: [Brief Descriptor]

| Feature | [Option A] | [Option B] |
|---------|------------|------------|
| [Criteria 1] | [Value/Description] | [Value/Description] |
| [Criteria 2] | [Value/Description] | [Value/Description] |
| [Criteria 3] | [Value/Description] | [Value/Description] |
| [Criteria 4] | [Value/Description] | [Value/Description] |
| Best For | [Use case] | [Use case] |

**Bottom line**: [1-2 sentence recommendation based on different needs]
```

### Pros and Cons Block

Use for evaluation queries: "Is [X] worth it?", "Should I [X]?"

```markdown
## Advantages and Disadvantages of [Topic]

[1-sentence overview of the evaluation context]

### Pros

- **[Benefit category]**: [Specific explanation]
- **[Benefit category]**: [Specific explanation]
- **[Benefit category]**: [Specific explanation]

### Cons

- **[Drawback category]**: [Specific explanation]
- **[Drawback category]**: [Specific explanation]
- **[Drawback category]**: [Specific explanation]

**Verdict**: [1-2 sentence balanced conclusion with recommendation]
```

### FAQ Block

Use for topic pages with multiple common questions. Essential for FAQ schema.

```markdown
## Frequently Asked Questions

### [Question phrased exactly as users search]?

[Direct answer in first sentence]. [Supporting context in 2-3 additional sentences].

### [Question phrased exactly as users search]?

[Direct answer in first sentence]. [Supporting context in 2-3 additional sentences].

### [Question phrased exactly as users search]?

[Direct answer in first sentence]. [Supporting context in 2-3 additional sentences].
```

**Tips for FAQ questions:**
- Use natural question phrasing ("How do I..." not "How does one...")
- Include question words: what, how, why, when, where, who, which
- Match "People Also Ask" queries from search results
- Keep answers between 50-100 words
- **For B2B content**: Use procurement/buyer language (MOQ, OEM, FOB, certification, lead time, compliance) — NOT consumer language ("Which one is best?", "Is it good?"). AI models assign higher citation value to domain-specific buyer questions. Verified by `b2b_content_auditor.py` FAQ B2B Language check.

### Listicle Block

Use for "Best [X]", "Top [X]", "[Number] ways to [X]" queries.

```markdown
## [Number] Best [Items] for [Goal/Purpose]

[1-2 sentence intro establishing context and selection criteria]

### 1. [Item Name]

[Why it's included in 2-3 sentences with specific benefits]

### 2. [Item Name]

[Why it's included in 2-3 sentences with specific benefits]

### 3. [Item Name]

[Why it's included in 2-3 sentences with specific benefits]
```

---

## Generative Engine Optimization (GEO) Patterns

These patterns optimize content for citation by AI assistants like ChatGPT, Claude, Perplexity, and Gemini.

### Statistic Citation Block

Statistics increase AI citation rates by 15-30%. Always include sources.

```markdown
[Claim statement]. According to [Source/Organization], [specific statistic with number and timeframe]. [Context for why this matters].
```

**Example:**
```markdown
Mobile optimization is no longer optional for SEO success. According to Google's 2024 Core Web Vitals report, 70% of web traffic now comes from mobile devices, and pages failing mobile usability standards see 24% higher bounce rates. This makes mobile-first indexing a critical ranking factor.
```

### Expert Quote Block

Named expert attribution adds credibility and increases citation likelihood.

```markdown
"[Direct quote from expert]," says [Expert Name], [Title/Role] at [Organization]. [1 sentence of context or interpretation].
```

**Example:**
```markdown
"The shift from keyword-driven search to intent-driven discovery represents the most significant change in SEO since mobile-first indexing," says Rand Fishkin, Co-founder of SparkToro. This perspective highlights why content strategies must evolve beyond traditional keyword optimization.
```

### Authoritative Claim Block

Structure claims for easy AI extraction with clear attribution.

```markdown
[Topic] [verb: is/has/requires/involves] [clear, specific claim]. [Source] [confirms/reports/found] that [supporting evidence]. This [explains/means/suggests] [implication or action].
```

**Example:**
```markdown
E-E-A-T is the cornerstone of Google's content quality evaluation. Google's Search Quality Rater Guidelines confirm that trust is the most critical factor, stating that "untrustworthy pages have low E-E-A-T no matter how experienced, expert, or authoritative they may seem." This means content creators must prioritize transparency and accuracy above all other optimization tactics.
```

### Self-Contained Answer Block

Create quotable, standalone statements that AI can extract directly.

```markdown
**[Topic/Question]**: [Complete, self-contained answer that makes sense without additional context. Include specific details, numbers, or examples in 2-3 sentences.]
```

**Example:**
```markdown
**Ideal blog post length for SEO**: The optimal length for SEO blog posts is 1,500-2,500 words for competitive topics. This range allows comprehensive topic coverage while maintaining reader engagement. HubSpot research shows long-form content earns 77% more backlinks than short articles, directly impacting search rankings.
```

### Evidence Sandwich Block

Structure claims with evidence for maximum credibility.

```markdown
[Opening claim statement].

Evidence supporting this includes:
- [Data point 1 with source]
- [Data point 2 with source]
- [Data point 3 with source]

[Concluding statement connecting evidence to actionable insight].
```

---

## Domain-Specific GEO Tactics

Different content domains benefit from different authority signals.

### Technology Content
- Emphasize technical precision and correct terminology
- Include version numbers and dates for software/tools
- Reference official documentation
- Add code examples where relevant

### Health/Medical Content
- Cite peer-reviewed studies with publication details
- Include expert credentials (MD, RN, etc.)
- Note study limitations and context
- Add "last reviewed" dates

### Financial Content
- Reference regulatory bodies (SEC, FTC, etc.)
- Include specific numbers with timeframes
- Note that information is educational, not advice
- Cite recognized financial institutions

### Legal Content
- Cite specific laws, statutes, and regulations
- Reference jurisdiction clearly
- Include professional disclaimers
- Note when professional consultation is advised

### Business/Marketing Content
- Include case studies with measurable results
- Reference industry research and reports
- Add percentage changes and timeframes
- Quote recognized thought leaders

### B2B Manufacturing / Procurement / OEM-ODM Content (NEW)

B2B industrial content targeting procurement managers, supply chain directors, and OEM buyers. AI models (ChatGPT, Perplexity, Gemini) increasingly cite manufacturing content for "how to source", "factory audit", "compliance checklist", and "cost breakdown" queries. These patterns optimize for citation in B2B procurement contexts.

**Key B2B citation signals that AI models prioritize:**
- Precise measurements with engineering units (°C, mV, kHz, Wh/kg, mm, A, W)
- Named standards references (IEC 62368-1, ISO 9001, EN 62368-1 Annex M.4)
- Named test equipment (Keysight E4980A, Tektronix, Fluke)
- Certification body names (TÜV Rheinland, SGS, Bureau Veritas)
- FOB/MOQ pricing data with specific dollar amounts
- Factory-floor observations with timestamps and conditions

#### B2B First-Hand Data Citation Block

Factory data with precise measurements increases AI citation rates by 25-35% in procurement queries. Always include units and test conditions.

```markdown
[Measurement context]. During [test condition, duration], [specific metric] measured [value] [unit] at [condition]. Verified with [equipment model] per [standard reference].

**Example:**
During our 48-hour continuous 240W charger test, case temperature stabilized at 58.3°C under 100% load at 25°C ambient. Measured with Keysight E4980A LCR meter per IEC 62368-1 Section 5.4.2.
```

#### B2B Compliance / Certification Citation Block

Standards references with lab/certification body names are high-trust signals for AI extraction.

```markdown
[Product/category] must comply with [standard number] per [regulation or market requirement]. [Certification body] verified [specific requirement] at [test condition] — [specific numeric result]. Non-compliance means [concrete business consequence for the buyer].

**Example:**
EN 62368-1 Annex M.4 requires a minimum creepage distance of 6.4mm for 140W chargers. TÜV Rheinland Lab #C-2026-0842 verified our PCBA design at 6.8mm under 85% RH at 40°C — a 0.4mm safety margin. Shipments failing this test face 100% rejection at EU customs.
```

#### B2B Cost Transparency Citation Block

AI models preferentially cite content that includes specific pricing with trade terms and order quantities.

```markdown
[Product] [trade term] pricing at [order quantity]: [specific price]. This includes [what's included] but excludes [what's excluded]. Compared to [alternative/competitor benchmark], this represents [specific difference or saving].

**Example:**
140W GaN charger FOB Shenzhen pricing at MOQ 500: $12.50/unit including CE/GS certification and custom logo. Excludes shipping and import duties. Compared to the industry average of $15-18/unit at equivalent MOQ, this represents a 17-30% per-unit saving.
```

#### B2B Procurement FAQ Pattern

B2B FAQ questions must use buyer/procurement language, not consumer language. AI models distinguish between "Which one is best?" (consumer, low citation value) and "What MOQ applies for OEM orders?" (B2B, high citation value).

```markdown
## Frequently Asked Questions

### What [trade term] applies for [product] [use case]?

[Direct answer with specific number/condition]. [Supporting context on why this matters for the buyer's decision].

### What [certification/standard] is required for [product] in [market]?

[Direct answer listing specific standards]. [Verification method or body].

### How does [buyer concern — cost/risk/time] compare between [Option A] and [Option B]?

[Direct answer with specific comparison data]. [Context on when to choose which].
```

**❌ Consumer FAQ language (do not use):**
- "Which power bank is the best?"
- "What is the cheapest option?"
- "Is this product good?"

**✅ B2B procurement FAQ language (use):**
- "What MOQ applies for OEM power banks with custom logo?"
- "What FOB pricing should importers expect for 140W GaN chargers?"
- "Which certifications are mandatory for EU charger imports in 2026?"

#### B2B-Specific Domain Tactics

**Manufacturing/Factory Content:**
- Reference specific production line capabilities (SMT lines, injection molding tonnage, clean room class)
- Include factory square footage with production capacity (units/month)
- Name quality control protocols (AQL 2.5 per ISO 2859-1, first-article inspection, statistical process control)
- Mention engineer count and R&D capabilities

**Supply Chain/Logistics Content:**
- Use Incoterms precisely (FOB, CIF, DDP, EXW) — AI models recognize these as domain authority signals
- Include HS codes for customs classification
- Reference shipping timelines with port names (Shenzhen → Hamburg: 28-35 days)
- Mention landed cost breakdown (product cost + shipping + duties + customs brokerage)

**Certification/Compliance Content:**
- Always include the full standard number (not just "CE certified" but "CE marking per EN 62368-1")
- Name the certifying body and lab location
- State the specific test condition and threshold value
- Mention what happens if compliance fails (shipment rejection, recall, fine)

#### B2B GEO Scoring Map

How B2B content signals map to the 9 GEO citation methods:

| GEO Method | B2B Signal | Example |
|------------|-----------|---------|
| Cite Sources (+40%) | Standards references, certification body reports | "Per IEC 62368-1 Section 5.4.2, verified by TÜV Rheinland" |
| Statistics Addition (+37%) | Factory measurements with units, BOM cost data | "58.3°C at 100% load, 4-hour aging test" |
| Quotation Addition (+30%) | Engineer testimony, client procurement manager quotes | "According to our Senior R&D Engineer with 12+ years in Shenzhen supply chain..." |
| Authoritative Tone (+25%) | Named author with credentials, factory-first voice | "By Jack Peng, Head of R&D at WOWOHCOOL" |
| Technical Terms (+18%) | PCBA ripple noise, GaN HEMT switching frequency, AQL sampling, BOM cost breakdown | Industry-specific engineering vocabulary |
| Unique Words (+15%) | OEM/ODM/FOB/MOQ/supply chain/procurement/importer | B2B signal word diversity across headings |

---

## Voice Search Optimization

Voice queries are conversational and question-based. Optimize for these patterns:

### Question Formats for Voice
- "What is..."
- "How do I..."
- "Where can I find..."
- "Why does..."
- "When should I..."
- "Who is..."

### Voice-Optimized Answer Structure
- Lead with direct answer (under 30 words ideal)
- Use natural, conversational language
- Avoid jargon unless targeting expert audience
- Include local context where relevant
- Structure for single spoken response
