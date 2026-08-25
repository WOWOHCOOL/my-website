#!/usr/bin/env python3
"""
FAQ Consistency Check — verify Schema FAQPage matches body FAQ word-for-word.

b2b_content_auditor.py Check 14 documents "Rule 1: Body-Schema FAQ word-for-word
match" but does NOT implement it. This standalone check closes that gap.

Detects mismatches between:
  1. HTML body FAQ (h3 question + p answer inside .faq-answer blocks)
  2. JSON-LD FAQPage schema (Question.name + Answer.text in mainEntity)

HTML entities are decoded before comparison (so body "&lt;0,3%" matches schema
"<0,3%" — they render identically). Whitespace is collapsed.

Exit codes (usable in CI / orchestration):
  0 = all FAQ match (or no FAQ found / draft without schema)
  1 = mismatches detected — fix before publishing

Usage:
  python3 faq_consistency_check.py <file.njk|.md|.html>
"""

import re
import sys
import html


def extract_schema_faq(content: str):
    """Extract (questions, answers) from the JSON-LD FAQPage mainEntity."""
    m = re.search(
        r'"@type"\s*:\s*"FAQPage".*?"mainEntity"\s*:\s*\[(.*?)\]\s*\}\s*\]',
        content,
        re.DOTALL,
    )
    if not m:
        return [], []
    block = m.group(1)
    questions = re.findall(r'"name"\s*:\s*"(.*?)"', block)
    answers = re.findall(r'"text"\s*:\s*"(.*?)"', block)
    return questions, answers


def extract_body_faq(content: str):
    """Extract (questions, answers) from HTML body .faq-answer blocks."""
    questions = re.findall(r'faq-answer">\s*<h3[^>]*>(.*?)</h3>', content)
    answers = re.findall(
        r'faq-answer">\s*<h3[^>]*>.*?</h3>\s*<p[^>]*>(.*?)</p>',
        content,
        re.DOTALL,
    )
    # Strip inline tags (<a>, <strong>) from answers so text-only comparison works
    answers = [re.sub(r"<[^>]+>", "", a) for a in answers]
    return questions, answers


def normalize(text: str) -> str:
    """Decode HTML entities and collapse whitespace."""
    return re.sub(r"\s+", " ", html.unescape(text)).strip()


def main():
    if len(sys.argv) < 2:
        print("Usage: python3 faq_consistency_check.py <file>")
        sys.exit(2)

    filepath = sys.argv[1]
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    schema_q, schema_a = extract_schema_faq(content)
    body_q, body_a = extract_body_faq(content)

    print(f"FAQ Consistency Check: {filepath}")
    print(f"  Schema FAQ: {len(schema_q)} Q / {len(schema_a)} A")
    print(f"  Body FAQ:   {len(body_q)} Q / {len(body_a)} A")

    # No FAQ anywhere — nothing to check (article without FAQPage)
    if not schema_q and not body_q:
        print("  [OK] No FAQ found — skipping (article has no FAQPage).")
        sys.exit(0)

    # Schema missing but body has FAQ — likely a draft without schema yet
    if not schema_q and body_q:
        print("  [WARN] Schema FAQPage missing (draft without schema?) — skipping.")
        sys.exit(0)

    issues = []

    if len(schema_q) != len(body_q):
        issues.append(
            f"COUNT MISMATCH: schema {len(schema_q)} questions vs body {len(body_q)}"
        )

    for i, (s, b) in enumerate(zip(schema_q, body_q), 1):
        if normalize(s) != normalize(b):
            issues.append(f"Q{i} MISMATCH:\n      schema: \"{s}\"\n      body:   \"{b}\"")

    for i, (s, b) in enumerate(zip(schema_a, body_a), 1):
        if normalize(s) != normalize(b):
            issues.append(
                f"A{i} MISMATCH:\n      schema: \"{s[:90]}\"\n      body:   \"{b[:90]}\""
            )

    if issues:
        print(f"  [FAIL] {len(issues)} mismatch(es) found:")
        for issue in issues:
            print(f"    {issue}")
        sys.exit(1)

    print(
        f"  [OK] All {len(schema_q)} questions and {len(schema_a)} answers match word-for-word."
    )
    sys.exit(0)


if __name__ == "__main__":
    main()
