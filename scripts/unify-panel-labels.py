#!/usr/bin/env python3
# L2 panel-label unification: enforce the canonical localized microcopy from
# src/_data/panel-labels.json for FIXED panels (faq/toc/related/takeaways/badge/footprint).
# Free content headings (conclusion/CTA/body H2) are never touched.
# Dry-run by default. --only <rel> for a single file, --apply to write.
import io, os, re, sys, glob, json

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LABELS = json.load(io.open(os.path.join(ROOT, "src", "_data", "panel-labels.json"), encoding="utf-8"))["labels"]

def esc(s): return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
def lang_of(rel):
    m = re.search(r'[\\/](de|es|fr|pl|ru)[\\/]', rel)
    return m.group(1) if m else "en"

def sub_h2(block, canon):
    m = re.search(r'(<h2\b[^>]*>)([\s\S]*?)(</h2>)', block)
    if not m: return block, 0
    return block[:m.start(2)] + esc(canon) + block[m.end(2):], (1 if m.group(2) != esc(canon) else 0)

def sub_tag(block, tag, cls_re, canon):
    m = re.search(r'(<' + tag + r'\b[^>]*class="[^"]*' + cls_re + r'[^"]*"[^>]*>)([\s\S]*?)(</' + tag + r'>)', block)
    if not m: return block, 0
    return block[:m.start(2)] + esc(canon) + block[m.end(2):], (1 if m.group(2) != esc(canon) else 0)

def find_block(text, start_pat, tag):
    m = re.search(start_pat, text)
    if not m: return None
    i = m.start()
    depth = 0; pos = i
    open_re = re.compile(r'<(/?)' + tag + r'\b[^>]*>', re.I)
    while True:
        mm = open_re.search(text, pos)
        if not mm: return None
        if mm.group(1) == '/':
            depth -= 1
            if depth == 0: return (i, mm.end())
        elif not mm.group(0).rstrip().endswith('/>'):
            depth += 1
        pos = mm.end()

def migrate(text, canon, rel):
    changes = 0
    # faq (id) | related (id) | author-bio badge+footprint (id)
    for pat, tag, key in [
        (r'<section id="faq"', "section", "faq"),
        (r'<aside id="related-articles"', "aside", "related"),
    ]:
        span = find_block(text, pat, tag)
        if span:
            b = text[span[0]:span[1]]; nb, c = sub_h2(b, canon[key]); changes += c
            text = text[:span[0]] + nb + text[span[1]:]
    # toc (unique card class)
    span = find_block(text, r'<div class="bg-brandBlue rounded-2xl p-8 text-white mb-12">', "div")
    if span:
        b = text[span[0]:span[1]]; nb, c = sub_h2(b, canon["toc"]); changes += c
        text = text[:span[0]] + nb + text[span[1]:]
    # takeaways label: first text-badge <p> immediately inside the amber takeaways card
    mt = re.search(r'(<div class="bg-amber-50 border-l-4 border-amber-500[^"]*">\s*<p class="text-badge[^"]*">)([\s\S]*?)(</p>)', text)
    if mt:
        if mt.group(2) != esc(canon["takeaways"]):
            changes += 1
            text = text[:mt.start(2)] + esc(canon["takeaways"]) + text[mt.end(2):]
    # sources heading: walk back from the external-link sources <ul> to its <h2>
    for um in re.finditer(r'<ul class="text-sm text-slate-600 space-y-2 list-disc pl-5">([\s\S]{0,4000}?)</ul>', text):
        if 'target="_blank"' not in um.group(1): continue
        h2end = text.rfind("</h2>", 0, um.start())
        if h2end < 0 or text[h2end + 5:um.start()].strip() != "": continue
        h2start = text.rfind("<h2", 0, h2end)
        if h2start < 0: continue
        gt = text.index(">", h2start)
        if text[gt + 1:h2end] != esc(canon["sources"]):
            changes += 1
            text = text[:gt + 1] + esc(canon["sources"]) + text[h2end:]
        break
    # buyer-spec card labels (A: English canonical). Anchor is unique: exactly 3
    # <p class="text-xs ... tracking-wider mb-2"> per buyer-spec section.
    bl = list(re.finditer(r'(<p class="text-xs font-black text-brandOrange uppercase tracking-wider mb-2">)([\s\S]*?)(</p>)', text))
    if len(bl) == 3:
        for m, key in zip(reversed(bl), reversed(["buyerCert", "buyerMoq", "buyerQuality"])):
            if m.group(2) != esc(canon[key]):
                changes += 1
                text = text[:m.start(2)] + esc(canon[key]) + text[m.end(2):]
    # author-bio badge + footprint
    span = find_block(text, r'<section id="author-bio"', "section")
    if span:
        b = text[span[0]:span[1]]
        nb, c = sub_tag(b, "span", r'bg-brandOrange/10', canon["badge"]); changes += c; b = nb
        nb, c = sub_tag(b, "p", r'text-xs text-slate-400', canon["footprint"]); changes += c; b = nb
        text = text[:span[0]] + b + text[span[1]:]
    return text, changes

def main():
    args = sys.argv[1:]
    apply = "--apply" in args
    only = args[args.index("--only") + 1] if "--only" in args else None
    files = [os.path.join(ROOT, only)] if only else glob.glob(os.path.join(ROOT, "src", "**", "index.njk"), recursive=True)
    tf = tc = 0
    for f in files:
        if "blog" not in f.replace("\\", "/"): continue
        if not os.path.exists(f): continue
        rel = os.path.relpath(f, ROOT); lang = lang_of(rel)
        text = io.open(f, encoding="utf-8").read()
        new, c = migrate(text, LABELS[lang], rel)
        if c:
            tf += 1; tc += c
            print(("APPLY " if apply else "DRY   ") + rel + "  labels=" + str(c))
            if apply: io.open(f, "w", encoding="utf-8", newline="\n").write(new)
    print("\n%d file(s), %d label(s) %s" % (tf, tc, "updated" if apply else "(dry-run)"))

main()
