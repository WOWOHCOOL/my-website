"""
Nunjucks (.njk) template preprocessor for analysis modules.

Strips template syntax, SVG noise, and JSON-LD blocks so that
HTML/Markdown-oriented analyzers can process .njk files accurately.

Usage:
    from njk_preprocessor import preprocess
    cleaned = preprocess(raw_content)
    result = analyzer.analyze(cleaned)

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
    5. Normalize whitespace
    6. Preserve known HTML structure

    Returns cleaned content suitable for heading/link/CTA/trust analysis.
    """
    # Step 1: Strip JSON-LD schema blocks (not visible content)
    content = _strip_jsonld(content)

    # Step 2: Strip Nunjucks template syntax
    content = _strip_nunjucks(content)

    # Step 3: Strip SVG path data (massive d="..." attributes)
    content = _strip_svg_noise(content)

    # Step 4: Strip HTML comments
    content = re.sub(r'<!--.*?-->', '', content, flags=re.DOTALL)

    # Step 5: Normalize heading tags (collapse multi-line H1-H6 into single lines)
    content = _normalize_headings(content)

    # Step 6: Collapse whitespace (but preserve line breaks for structure)
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

    # Remove block tags: {% ... %} — can span multiple lines
    content = re.sub(r'\{%[^%]*%\}', '', content, flags=re.DOTALL)

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


def is_njk(content: str) -> bool:
    """Detect if content appears to be a Nunjucks template."""
    return bool(re.search(r'\{%\s*(extends|block|include|from)', content))
