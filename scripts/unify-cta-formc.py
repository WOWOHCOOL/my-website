#!/usr/bin/env python3
# CTA Form C -> standard Form B.
# Form C: <div class="max-w-4xl mx-auto px-6 mb-16"><section class="... mb-16 ...">...
#   -> wrapper mb-16 + card mb-16 = DOUBLE bottom margin (128px vs 64px).
# Form B: <section class="max-w-4xl mx-auto px-6 mb-16"><div class="... (no mb-16) ...">...
# Dry-run by default. --only <rel> / --apply.
import io, os, re, sys, glob
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAT = re.compile(r'<div class="max-w-4xl mx-auto px-6 mb-16">\s*<section class="([^"]*from-brandBlue to-slate-800 rounded-3xl[^"]*)">')
def transform(text):
    m = PAT.search(text)
    if not m: return text, 0
    after = text[m.end():]
    cs = after.find('</section>')
    if cs < 0: return text, 0
    cd = after.find('</div>', cs)
    if cd < 0: return text, 0
    inner2 = re.sub(r'\s*mb-16', '', m.group(1))
    head = '<section class="max-w-4xl mx-auto px-6 mb-16">\n <div class="' + inner2 + '">'
    rest = after[:cs] + '</div>\n</section>' + after[cd + len('</div>'):]
    return text[:m.start()] + head + rest, 1

def main():
    args = sys.argv[1:]
    apply = "--apply" in args
    only = args[args.index("--only") + 1] if "--only" in args else None
    files = [os.path.join(ROOT, only)] if only else glob.glob(os.path.join(ROOT, "src", "**", "index.njk"), recursive=True)
    tf = tc = 0
    for f in files:
        if "blog" not in f.replace("\\", "/") or not os.path.exists(f): continue
        t = io.open(f, encoding="utf-8").read()
        new, c = transform(t)
        if c:
            tf += 1; tc += c
            print(("APPLY " if apply else "DRY   ") + os.path.relpath(f, ROOT))
            if apply: io.open(f, "w", encoding="utf-8", newline="\n").write(new)
    print("\n%d file(s) %s" % (tf, "updated" if apply else "(dry-run)"))
main()
