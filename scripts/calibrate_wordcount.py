#!/usr/bin/env python3
"""Count actual body words in .njk articles and report wordCount discrepancies."""
import re, os, sys

def count_body_words(filepath):
    """Count visible body text words in a .njk file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract body content between {% block content %} and {% endblock %}
    block_match = re.search(r'{%\s*block\s+content\s*%}(.*?){%\s*endblock\s*%}', content, re.DOTALL)
    if not block_match:
        return None

    body = block_match.group(1)

    # Remove JSON-LD script blocks
    body = re.sub(r'<script[^>]*>.*?</script>', '', body, flags=re.DOTALL)

    # Remove HTML comments
    body = re.sub(r'<!--.*?-->', '', body, flags=re.DOTALL)

    # Remove Nunjucks tags
    body = re.sub(r'{%[^%]*%}', '', body)
    body = re.sub(r'\{\{[^}]*\}\}', '', body)

    # Remove HTML tags
    body = re.sub(r'<[^>]+>', ' ', body)

    # Decode HTML entities
    body = body.replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>')
    body = body.replace('&quot;', '"').replace('&#39;', "'").replace('&nbsp;', ' ')

    # Count words (split on whitespace, filter empty)
    words = [w for w in body.split() if w.strip()]
    return len(words)

def get_schema_wordcount(filepath):
    """Get current wordCount from schema."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    match = re.search(r'"wordCount":\s*(\d+)', content)
    return int(match.group(1)) if match else None

# Test on one article
test_path = r'C:\Users\wowoh\wowohcool.com\src\blog\wireless-charging-works\index.njk'
actual = count_body_words(test_path)
schema = get_schema_wordcount(test_path)
print(f'wireless-charging-works: schema={schema}, actual={actual}, diff={actual-schema if actual and schema else "N/A"} ({abs(actual-schema)/schema*100:.0f}% off)' if actual and schema else 'Error')

# Test on a few more
for slug in ['car-charger-guide', 'charger-safety-standards', 'how-to-choose-power-bank']:
    p = f'C:\\Users\\wowoh\\wowohcool.com\\src\\blog\\{slug}\\index.njk'
    if os.path.exists(p):
        a = count_body_words(p)
        s = get_schema_wordcount(p)
        print(f'{slug}: schema={s}, actual={a}, ' + (f'diff={a-s} ({abs(a-s)/s*100:.0f}%)' if a and s else 'Error'))
