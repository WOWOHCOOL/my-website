#!/usr/bin/env python3
# Non-blog mobile-safety: ensure wide tables scroll.
# Wrap tables that have >=3 columns OR a hard min-w-[..] and are not already in overflow-x-auto;
# if the immediate shell is overflow-hidden, convert it to overflow-x-auto.
# Dry-run default. --only / --apply.
import io, os, re, sys, glob
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def bal(s, st, t):
    d = 0
    for m in re.finditer(r'<(/?)%s\b[^>]*>' % t, s[st:], re.I):
        tok = m.group(0)
        if tok.startswith('</'): d -= 1
        elif not tok.rstrip().endswith('/>'): d += 1
        if d == 0: return st + m.end()
    return -1
def needs_wrap(blk, tag):
    row = re.search(r'<tr\b[^>]*>([\s\S]*?)</tr>', blk)
    cols = len(re.findall(r'<t[hd]\b', row.group(1))) if row else 0
    return cols >= 3 or 'min-w-[' in tag
def migrate(text):
    spans = []
    for m in re.finditer(r'<table\b[^>]*>', text):
        e = bal(text, m.start(), 'table')
        if e > 0: spans.append((m.start(), e, m.group(0)))
    edits = []  # (start, end, newtext)
    for st, en, tag in spans:
        before = text[:st]
        if 'overflow-x-auto' in before[-200:]: continue
        if not needs_wrap(text[st:en], tag): continue
        # immediate shell overflow-hidden?
        wm = re.search(r'(<div class=")([^"]*overflow-hidden[^"]*)(">)\s*$', before)
        if wm:
            ncls = wm.group(2).replace('overflow-hidden', 'overflow-x-auto')
            edits.append((wm.start(2), wm.end(2), ncls))
        else:
            edits.append((st, st, '<div class="overflow-x-auto">\n'))
            edits.append((en, en, '\n</div>'))
    if not edits: return text, 0
    edits.sort(key=lambda x: x[0], reverse=True)
    for a, b, rep in edits:
        text = text[:a] + rep + text[b:]
    return text, len([1 for e in edits if e[0] == e[1]]) or len(edits)
def main():
    args = sys.argv[1:]; apply = "--apply" in args
    only = args[args.index("--only") + 1] if "--only" in args else None
    files = [os.path.join(ROOT, only)] if only else glob.glob(os.path.join(ROOT, "src", "**", "index.njk"), recursive=True)
    tf = 0
    for f in files:
        if "/blog/" in f.replace("\\", "/") or "blog" in f.replace("\\", "/") or "_includes" in f or not os.path.exists(f): continue
        t = io.open(f, encoding="utf-8").read(); nt, c = migrate(t)
        if c:
            tf += 1
            print(("APPLY " if apply else "DRY   ") + os.path.relpath(f, ROOT))
            if apply: io.open(f, "w", encoding="utf-8", newline="\n").write(nt)
    print("\n%d file(s) %s" % (tf, "updated" if apply else "(dry-run)"))
main()
