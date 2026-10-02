#!/usr/bin/env python3
# Single source of truth for related-card category chips:
#   card tag := target article's own `articleSection` (localized, 0 cross-language links).
# Safe-by-default: dry-run unless --apply. --only <rel> limits to one file.
#   python scripts/unify-related-tags.py --only src/blog/x/index.njk
#   python scripts/unify-related-tags.py --apply
import io, os, re, sys, glob

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FM = re.compile(r'^---\r?\n([\s\S]*?)\r?\n---')
SPAN = re.compile(r'<span class="text-xs font-black text-brandOrange[^"]*">[\s\S]*?</span>')
CARD = re.compile(r'(<a href="([^"]+)" class="bg-slate-50[^"]*">[\s\S]*?<div class="p-\d+"[^>]*>)([\s\S]*?)(</a>)')
CANON = '<span class="text-xs font-black text-brandOrange uppercase mb-2 block">{}</span>'

def fm_field(text, key):
    m = FM.match(text)
    if not m: return None
    for line in m.group(1).split("\n"):
        mm = re.match(r'^' + key + r':\s*(?:"([^"]*)"|(.+))\s*$', line.rstrip("\r"))
        if mm: return mm.group(1) if mm.group(1) is not None else mm.group(2)
    return None

def html_escape(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")

def load_index():
    idx = {}
    for f in glob.glob(os.path.join(ROOT, "src", "**", "index.njk"), recursive=True):
        if "blog" not in f.replace("\\", "/"): continue
        t = io.open(f, encoding="utf-8").read()
        c = fm_field(t, "canonical")
        if c: idx[c] = fm_field(t, "articleSection")
    return idx

def migrate(text, idx, rel):
    changes = 0
    def do_aside(am):
        nonlocal changes
        aside = am.group(0)
        def do_card(cm):
            nonlocal changes
            href = cm.group(2)
            sec = idx.get(href)
            if not sec: return cm.group(0)
            body = cm.group(3)
            span = CANON.format(html_escape(sec))
            if SPAN.search(body):
                nb = SPAN.sub(lambda _: span, body, count=1)
            else:
                nb = body.replace("<h3", span + "\n <h3", 1)
            if nb != body:
                changes += 1
                return cm.group(1) + nb + cm.group(4)
            return cm.group(0)
        return CARD.sub(do_card, aside)
    new = re.sub(r'<aside id="related-articles"[\s\S]*?</aside>', do_aside, text)
    return new, changes

def main():
    args = sys.argv[1:]
    apply = "--apply" in args
    only = None
    if "--only" in args: only = args[args.index("--only") + 1]
    idx = load_index()
    files = [os.path.join(ROOT, only)] if only else glob.glob(os.path.join(ROOT, "src", "**", "index.njk"), recursive=True)
    total_files = total_changes = 0
    for f in files:
        if "blog" not in f.replace("\\", "/"): continue
        if not os.path.exists(f): continue
        t = io.open(f, encoding="utf-8").read()
        if '<aside id="related-articles"' not in t: continue
        new, ch = migrate(t, idx, f)
        if ch:
            total_files += 1; total_changes += ch
            rel = os.path.relpath(f, ROOT)
            print(("APPLY " if apply else "DRY   ") + rel + "  cards=" + str(ch))
            if apply:
                io.open(f, "w", encoding="utf-8", newline="\n").write(new)
    print("\n%d file(s), %d card(s) %s" % (total_files, total_changes, "updated" if apply else "(dry-run)"))

main()

