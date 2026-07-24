"""
Nunjucks (.njk) template preprocessor for analysis modules.

Strips template syntax, SVG noise, and JSON-LD blocks, then converts
HTML structure elements (headings, links, images) to Markdown equivalents
so that Markdown-oriented analyzers can process .njk files accurately.

Usage:
    from njk_preprocessor import preprocess
    cleaned = preprocess(raw_content)
    result = analyzer.analyze(cleaned)

    # Also available:
    from njk_preprocessor import extract_meta, extract_links
    meta = extract_meta(raw_content)
    links = extract_links(raw_content)

All preprocessing is idempotent and safe for non-.njk content.
"""

import re


def preprocess(content: str) -> str:
    """
    Clean .njk template content for analysis.

    Steps (in order):
    1. Strip JSON-LD script blocks
    2. Strip SVG path data (massive coordinate strings)
    3. Strip Nunjucks template tags
    4. Strip HTML comments
    5. Convert HTML headings to Markdown (# ## ###)
    6. Convert HTML links to Markdown [text](url)
    7. Convert HTML images to Markdown ![alt](src)
    8. Normalize whitespace
    9. Preserve known HTML structure

    Returns cleaned content suitable for heading/link/CTA/trust analysis.
    """
    # Step 1: Resolve trust-bar.njk include (key trust signals shared across pages)
    content = _inline_trust_bar(content)

    # Step 2: Strip JSON-LD schema blocks (not visible content)
    content = _strip_jsonld(content)

    # Step 3: Strip Nunjucks template syntax
    content = _strip_nunjucks(content)

    # Step 4: Strip SVG path data (massive d="..." attributes)
    content = _strip_svg_noise(content)

    # Step 5: Strip HTML comments
    content = re.sub(r'<!--.*?-->', '', content, flags=re.DOTALL)

    # Step 6: Convert HTML headings to Markdown (NEW)
    content = _html_headings_to_markdown(content)

    # Step 7: Convert HTML links to Markdown (NEW)
    content = _html_links_to_markdown(content)

    # Step 8: Convert HTML images to Markdown (NEW)
    content = _html_images_to_markdown(content)

    # Step 9: Convert HTML tables to Markdown (NEW — must run before _strip_remaining_html)
    content = _html_tables_to_markdown(content)

    # Step 10: Strip remaining HTML tags (after extracting valuable structure)
    content = _strip_remaining_html(content)

    # Step 11: Collapse whitespace (but preserve line breaks for structure)
    content = re.sub(r'[ \t]+', ' ', content)  # collapse spaces/tabs
    content = re.sub(r'\n{3,}', '\n\n', content)  # max 2 consecutive newlines

    return content.strip()


def _normalize_headings(content: str) -> str:
    """Collapse multi-line <h1>...<h6> tags into single lines so regex analyzers find them."""
    def _flatten_heading(match):
        tag = match.group(1)  # h1-h6
        attrs = match.group(2) or ''
        inner = match.group(3)
        # Collapse inner HTML to single line, preserving child tags like <span>
        inner = re.sub(r'\s+', ' ', inner).strip()
        return f'<{tag}{attrs}>{inner}</{tag}>'

    return re.sub(
        r'<(h[1-6])([^>]*)>(.*?)</\1>',
        _flatten_heading,
        content,
        flags=re.DOTALL | re.IGNORECASE
    )


def _html_headings_to_markdown(content: str) -> str:
    """Convert <h1>...<h6> tags to Markdown #...###### equivalents."""
    for level in range(1, 7):
        tag = f'h{level}'
        prefix = '#' * level
        # Handle headings with attributes
        content = re.sub(
            rf'<{tag}[^>]*>(.*?)</{tag}>',
            lambda m, p=prefix: f'\n\n{p} {m.group(1).strip()}\n',
            content,
            flags=re.DOTALL | re.IGNORECASE
        )
        # Also handle self-closing or empty headings
        content = re.sub(
            rf'<{tag}[^>]*/>',
            '',
            content,
            flags=re.IGNORECASE
        )
    return content


def _html_links_to_markdown(content: str) -> str:
    """Convert <a href="url">text</a> to Markdown [text](url)."""
    def _link_replacer(match):
        attrs = match.group(1)
        text = match.group(2).strip()
        # Extract href
        href_match = re.search(r'href=["\']([^"\']+)["\']', attrs, re.IGNORECASE)
        if href_match and text:
            url = href_match.group(1)
            # Skip anchor-only links, javascript, and tel/mailto
            if url.startswith('#') or url.startswith('javascript:') or url.startswith('tel:') or url.startswith('mailto:'):
                return text
            return f'[{text}]({url})'
        return text

    return re.sub(
        r'<a\s+([^>]*)>(.*?)</a>',
        _link_replacer,
        content,
        flags=re.DOTALL | re.IGNORECASE
    )


def _html_images_to_markdown(content: str) -> str:
    """Convert <img src="url" alt="text"> to Markdown ![text](url)."""
    def _img_replacer(match):
        attrs = match.group(1)
        src_match = re.search(r'src=["\']([^"\']+)["\']', attrs, re.IGNORECASE)
        alt_match = re.search(r'alt=["\']([^"\']*)["\']', attrs, re.IGNORECASE)
        if src_match:
            src = src_match.group(1)
            alt = alt_match.group(1) if alt_match else ''
            return f'\n![{alt}]({src})\n'
        return ''

    content = re.sub(
        r'<img\s+([^>]*?)/?>',
        _img_replacer,
        content,
        flags=re.IGNORECASE
    )
    return content


def _html_tables_to_markdown(content: str) -> str:
    """Convert HTML <table> elements to Markdown pipe tables."""
    def _table_replacer(match):
        table_html = match.group(0)
        rows = re.findall(r'<tr[^>]*>(.*?)</tr>', table_html, re.DOTALL | re.IGNORECASE)
        if len(rows) < 2:
            return table_html  # too small, leave as-is

        md_rows = []
        for row in rows:
            cells = re.findall(r'<t[dh][^>]*>(.*?)</t[dh]>', row, re.DOTALL | re.IGNORECASE)
            # Strip HTML from cell content but keep text
            cell_texts = [re.sub(r'<[^>]+>', '', c).strip() for c in cells]
            md_rows.append('| ' + ' | '.join(cell_texts) + ' |')

        if not md_rows:
            return table_html

        # Insert separator after header row (first row)
        header_cells = md_rows[0].count('|') - 1
        separator = '|' + '|'.join(['---'] * header_cells) + '|'
        md_rows.insert(1, separator)

        return '\n' + '\n'.join(md_rows) + '\n'

    content = re.sub(
        r'<table[^>]*>.*?</table>',
        _table_replacer,
        content,
        flags=re.DOTALL | re.IGNORECASE
    )
    return content


def _strip_remaining_html(content: str) -> str:
    """Strip remaining HTML tags after valuable structure has been extracted."""
    # Remove <script>, <style>, <noscript> with content
    for tag in ('script', 'style', 'noscript', 'svg', 'nav', 'footer', 'header'):
        content = re.sub(
            rf'<{tag}[^>]*>.*?</{tag}>',
            '',
            content,
            flags=re.DOTALL | re.IGNORECASE
        )
    # Remove inline tags but keep their text content
    for tag in ('span', 'div', 'p', 'li', 'ul', 'ol', 'section', 'article',
                'main', 'aside', 'figure', 'figcaption', 'picture', 'source',
                'button', 'form', 'input', 'label', 'select', 'option',
                'strong', 'em', 'b', 'i', 'u', 'br', 'hr'):
        content = re.sub(rf'</?{tag}[^>]*>', '', content, flags=re.IGNORECASE)
    # Remove any remaining standalone tags
    content = re.sub(r'<[^>]+>', '', content)
    return content


def extract_meta(content: str) -> dict:
    """
    Extract meta title, description, author, canonical, date from .njk / HTML content.
    Returns dict with 'title', 'description', 'author', 'canonical', 'date', 'ogImage' keys.
    """
    meta = {
        'title': None, 'description': None, 'author': None,
        'canonical': None, 'date': None, 'ogImage': None
    }

    # ── YAML frontmatter extraction (primary for .njk files) ──
    fm_match = re.search(r'^---\s*\n(.*?)\n---', content, re.DOTALL)
    if fm_match:
        fm = fm_match.group(1)

        # title: "..." or title: '...'
        t = re.search(r'^title\s*:\s*["\']([^"\']{5,})["\']', fm, re.MULTILINE)
        if t: meta['title'] = t.group(1).strip()

        # description: "..."
        d = re.search(r'^description\s*:\s*["\']([^"\']{10,})["\']', fm, re.MULTILINE)
        if d: meta['description'] = d.group(1).strip()

        # author: "Nina Nico" or author: Nina Nico
        a = re.search(r'^author\s*:\s*["\']?([^"\'\n]{3,50})["\']?\s*$', fm, re.MULTILINE)
        if a: meta['author'] = a.group(1).strip().strip('"').strip("'")

        # canonical: "/blog/slug/" or canonical: /blog/slug/
        c = re.search(r'^canonical\s*:\s*["\']?([^"\'\n]{3,100})["\']?\s*$', fm, re.MULTILINE)
        if c: meta['canonical'] = c.group(1).strip().strip('"').strip("'")

        # date: 2026-04-14
        dt = re.search(r'^date\s*:\s*(\d{4}-\d{2}-\d{2})', fm, re.MULTILINE)
        if dt: meta['date'] = dt.group(1).strip()

        # ogImage: "/image/..."
        og = re.search(r'^ogImage\s*:\s*["\']?([^"\'\n]{5,200})["\']?\s*$', fm, re.MULTILINE)
        if og: meta['ogImage'] = og.group(1).strip().strip('"').strip("'")

    # ── Fallback: HTML/Nunjucks pattern extraction ──
    if not meta['title']:
        t = re.search(r'(?:meta_title|title)\s*[=:]\s*["\']([^"\']{10,})["\']', content, re.IGNORECASE)
        if t: meta['title'] = t.group(1).strip()
    if not meta['title']:
        t = re.search(r'<title[^>]*>([^<]{10,})</title>', content, re.IGNORECASE)
        if t: meta['title'] = t.group(1).strip()

    if not meta['description']:
        d = re.search(r'(?:meta_description|description)\s*[=:]\s*["\']([^"\']{20,})["\']', content, re.IGNORECASE)
        if d: meta['description'] = d.group(1).strip()
    if not meta['description']:
        d = re.search(r'<meta\s+name=["\']description["\']\s+content=["\']([^"\']{20,})["\']', content, re.IGNORECASE)
        if d: meta['description'] = d.group(1).strip()

    return meta


def extract_links(content: str) -> dict:
    """
    Extract internal and external link counts from .njk content.
    Returns dict with 'internal' and 'external' counts and URLs.
    """
    internal = []
    external = []

    # Find all <a href="..."> tags
    for m in re.finditer(r'<a\s+[^>]*href=["\']([^"\']+)["\'][^>]*>', content, re.IGNORECASE):
        url = m.group(1)
        if url.startswith('#') or url.startswith('javascript:') or url.startswith('tel:') or url.startswith('mailto:'):
            continue
        if url.startswith('http://') or url.startswith('https://'):
            external.append(url)
        else:
            internal.append(url)

    return {
        'internal_count': len(internal),
        'external_count': len(external),
        'internal_urls': internal[:20],
        'external_urls': external[:20],
    }


def extract_images(content: str) -> list:
    """Extract image alt text and src from .njk content."""
    images = []
    for m in re.finditer(
        r'<img\s+[^>]*?(?:alt=["\']([^"\']*)["\'])?[^>]*?src=["\']([^"\']+)["\'][^>]*?/?>',
        content, re.IGNORECASE
    ):
        alt = m.group(1) or ''
        src = m.group(2) or ''
        if src:
            images.append({'alt': alt, 'src': src})
    return images


def _strip_jsonld(content: str) -> str:
    """Remove <script type='application/ld+json'>...</script> blocks."""
    return re.sub(
        r'<script\s+type=["\']application/ld\+json["\'].*?</script>',
        '',
        content,
        flags=re.DOTALL | re.IGNORECASE
    )


def _strip_nunjucks(content: str) -> str:
    """Remove Nunjucks template tags while preserving HTML."""

    # Remove block tags: {% ... %} — can span multiple lines.
    # Use [\s\S]*? (non-greedy any-char) because JSON-LD inside blocks
    # may contain literal '%' chars (e.g., "95% efficiency") that break [^%]*.
    content = re.sub(r'\{%[\s\S]*?%\}', '', content)

    # Remove variable expressions: {{ ... }}
    content = re.sub(r'\{\{[^}]*\}\}', '', content)

    # Remove comment tags: {# ... #}
    content = re.sub(r'\{\#[^#]*\#\}', '', content, flags=re.DOTALL)

    # Remove Nunjucks macro includes: {% from "..." import ... %}
    # (already handled by block tag regex above)

    return content


def _strip_svg_noise(content: str) -> str:
    """
    Strip SVG path data (d="M...") to avoid massive coordinate strings
    being counted as text content by analyzers.
    Preserves the <svg> tag itself so HTML structure counting is unaffected.
    """
    # Replace SVG path data with placeholder
    content = re.sub(
        r'\bd="[^"]{100,}"',  # path data > 100 chars is almost certainly SVG
        'd="[SVG_PATH]"',
        content
    )
    # Also strip very long SVG viewBox/transform strings
    content = re.sub(
        r'\b(path|points|transform)="[^"]{80,}"',
        r'\1="[SVG_ATTR]"',
        content,
        flags=re.IGNORECASE
    )
    return content


def _inline_trust_bar(content: str) -> str:
    """Resolve {% include 'trust-bar.njk' %} by injecting key trust signals."""
    if "trust-bar" not in content:
        return content
    # Inject trust signal markers that analyzers can detect
    # Use <span data-trust> so it survives HTML comment stripping
    trust_signals = """
<span data-trust>ISO 9001 CE RoHS UN38.3 Qi2 certificaciones</span>
<span data-trust>200+ marcas globales 1M+ unidades por mes 50+ ingenieros I+D</span>
<span data-trust>5.000m2 Shenzhen 10M+ unidades entregadas SGS TUV Bureau Veritas auditorias</span>
"""
    return re.sub(
        r'\{%\s*include\s+["\']trust-bar\.njk["\']\s*%\}',
        trust_signals,
        content
    )


def is_njk(content: str) -> bool:
    """Detect if content appears to be a Nunjucks template."""
    return bool(re.search(r'\{%\s*(extends|block|include|from)', content))
