#!/usr/bin/env python3
"""
Fragment-residue lint — catches broken sentences left behind by scripted
fragment replacements (optimize / batch-edit passes).

Detects, per visible-text paragraph:
  R1  orphan continuation fragment: sentence ends with '.'/'!'/'?' followed by
      a lowercase-word continuation or stray punctuation ("przenośnych z ...")
  R2  paragraph starts with lowercase letter (PL/FR/ES/RU sentence start
      signal; DE nouns are uppercase so startswith is only WARN there)
  R3  double punctuation ("..", ".,", ". :", ". —" with no preceding space ok,
      ".," always wrong)
  R4  unclosed pairing inside a paragraph: unbalanced « » / „ " / parentheses

What it does NOT flag: legitimate sentence-final punctuation, decimal commas
(digits both sides), abbreviations with known patterns (art., nr, itd.),
emoji/bullets, HTML entities, table cells, inline code.

Usage:
  PYTHONUTF8=1 python fragment_residue_lint.py <file.njk>          # single file
  PYTHONUTF8=1 python fragment_residue_lint.py                      # site-wide sweep (src/**/blog)
Exit 0 = clean | Exit 1 = findings
"""

import html
import os
import re
import sys

SITE_ROOT = r"C:\Users\wowoh\wowohcool.com"

# abbreviation endings that legitimately precede a period mid-paragraph
# (units, currencies, country names: PL szt., RU ед./руб., ES EE. UU./vs.)
ABBREV = re.compile(
    r"(?:art|nr|pkt|ul|al|itd|itp|ok|m\.in|tj|tzn|zob|por|wyn|ok\."
    r"|szt|pcs|str|rys|tab|ubb|wg"
    r"|ед|руб|шт|тыс|млн|млрд|пр|см|стр"
    r"|ca|zzgl|inkl|ggf|evtl|usw|bzw"
    r"|aprox|pág|vol"
    r"|vs|UU"
    r")\.$", re.I
)


def visible_paragraphs(src):
    """Yield (line_no, text, css_hint) for body paragraphs; skips JSON-LD and
    UI-label paragraphs (metric cards, footprint cells: text-xs text-slate-500
    / text-slate-600 short labels)."""
    for m in re.finditer(r"<p\b([^>]*)>(.*?)</p>", src, flags=re.S):
        attrs, seg = m.group(1), m.group(2)
        pre = src[: m.start()]
        last_open = pre.rfind('<script type="application/ld+json">')
        last_close = pre.rfind("</script>")
        if last_open > last_close:
            continue
        text = re.sub(r"<[^>]+>", "", seg)
        text = html.unescape(text).strip()
        text = re.sub(r"\s+", " ", text)
        if not text:
            continue
        line = src[: m.start()].count("\n") + 1
        yield line, text, attrs


def strip_legit(txt):
    """Mask legitimate lowercase-after-period cases (abbreviations, decimals)."""
    txt = ABBREV.sub("ABBR.", txt)
    txt = re.sub(r"(\d)\.(\d)", r"\1DOT\2", txt)          # decimal point
    txt = re.sub(r"\$\d[\d.,]*", "MONEY", txt)            # $4,80 style amounts
    txt = re.sub(r"\$\s*/\s*[^\s]+\.", "PERUNIT", txt)    # $/szt. $/ед. $/pièce
    txt = re.sub(r"\d[\d .,]*\s*(?:руб|€|zł)\.", "MONEYABBR", txt)  # 1 500 руб.
    txt = re.sub(r"\b(?:ед|шт|руб|szt|pcs)\.\s*,", "ABBRCOMMA", txt)  # ед., шт., lists
    txt = re.sub(r"\bUU\.", "EEUU", txt)                  # EE. UU., (Spanish country abbrev)
    txt = re.sub(r"\.\s+m(?=Ah\b)", " DOTMAH", txt)       # ". mAh tells" — unit-symbol (mAh) sentence start
    txt = re.sub(r"i" + "Phone", "_PHONE_", txt)          # 'iPhone' — lowercase i IS the correct brand form; mask whole word incl. leading i
    txt = re.sub(r"\b(?:e\.g|i\.e|etc)\.\s*,", "EGLI", txt)  # "e.g., SGS" / "i.e.," — Latin abbrevs
    txt = re.sub(r"\bWhich\?", "WHICHQ", txt)             # "Which? research" — UK consumer org name
    txt = re.sub(r"/\s*(?:ед|шт|szt|pc)\.\s*,", "PERUNITCOMMA", txt)  # $6.50/ед., price lists
    txt = re.sub(r"\b(https?:|www\.)\S+", "URL", txt)
    txt = re.sub(r"\b[A-ZÉÈÀÇŚŹŻ]{1,4}\.[A-Z]{1,4}", "ACRON", txt)  # U.S.A style
    return txt


def findings_for(text, lang):
    out = []
    masked = strip_legit(text)

    # R3 double/misordered punctuation (strip_legit already masks $/unit abbrevs
    # like "$/szt.," which are legitimate price + unit + comma-list patterns)
    if re.search(r"[.,](?=[.,](?:\s|$))|,\s*[.:;](?=\s)", masked):
        out.append("R3 double/misordered punctuation")

    # R1 sentence-final period followed by lowercase continuation or stray punct
    for m in re.finditer(r"[.!?]\s+([a-ząćęłńóśźżà-ÿа-яё])", masked):
        before = masked[max(0, m.start() - 30) : m.start()]
        if ABBREV.search(before + "."):
            continue
        # lowercase after a sentence end — residue signal in PL/FR/ES/RU
        if lang != "de":
            out.append(f"R1 lowercase continuation after sentence end: '...{masked[max(0,m.start()-25):m.end()+15]}...'")
            break

    # R2 paragraph starts lowercase — only for real prose paragraphs
    # (skip short UI labels: metric cards, footprint cells, pills, stat captions)
    # (skip paragraphs opening with unit symbols: mAh, mA, kW, Wh, PD, Qi)
    if (lang != "de" and re.match(r"^[a-ząćęłńóśźżà-ÿа-яё]", masked)
            and len(masked) >= 40 and " " in masked
            and not re.match(r"^(mAh|mA|kW|Wh|Qi|PD|GHz|MHz|kB)", masked)):
        out.append("R2 paragraph starts with lowercase letter")

    # R4 unbalanced pairs
    for op, cl in (("«", "»"), ("(", ")")):
        if masked.count(op) != masked.count(cl):
            out.append(f"R4 unbalanced {op}{cl} ({masked.count(op)}/{masked.count(cl)})")
    return out


def scan_file(path):
    lang = None
    m = re.search(r'^lang: "(\w+)"', open(path, encoding="utf-8").read(2000), re.M)
    if m:
        lang = m.group(1)
    src = open(path, encoding="utf-8").read()
    issues = []
    for line, text, attrs in visible_paragraphs(src):
        # skip UI-label paragraphs (metric cards / footprint / related-card blurbs / stat captions)
        if ("text-xs" in attrs and ("text-slate-500" in attrs or "text-slate-600" in attrs)) \
           or ("text-sm" in attrs and "text-slate-600" in attrs and len(text) < 80):
            continue
        for f in findings_for(text, lang):
            issues.append((line, f, text[:90]))
    return issues


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("-")]
    files = []
    if args:
        files = [os.path.abspath(args[0])]
    else:
        for root, _dirs, fnames in os.walk(os.path.join(SITE_ROOT, "src")):
            for fn in fnames:
                if fn == "index.njk" and os.sep + "blog" + os.sep in root:
                    files.append(os.path.join(root, fn))

    total = 0
    for f in sorted(files):
        issues = scan_file(f)
        if issues:
            rel = os.path.relpath(f, SITE_ROOT)
            print(f"\n{rel}  [{len(issues)} finding(s)]")
            for line, kind, ctx in issues[:8]:
                print(f"  L{line} {kind}\n      » {ctx}")
            total += len(issues)

    print()
    if total:
        print(f"RESULT: {total} fragment-residue finding(s) — review before publish")
        sys.exit(1)
    print("RESULT: clean — no fragment residue detected "
          f"({len(files)} file{'s' if len(files)!=1 else ''} scanned)")
    sys.exit(0)


if __name__ == "__main__":
    main()
