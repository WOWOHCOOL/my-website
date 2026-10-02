#!/usr/bin/env python3
# Wrap unwrapped <table> in <div class="overflow-x-auto"> so wide tables scroll on
# mobile instead of overflowing the page. No margin added (avoids double spacing
# with the table's own mb-*). Dry-run by default. --only <rel> / --apply.
import io, os, re, sys, glob
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def balance(s, start, tag):
    depth = 0
    for m in re.finditer(r'<(/?)%s\b[^>]*>' % tag, s[start:], re.I):
        tok = m.group(0)
        if tok.startswith('</'): depth -= 1
        elif not tok.rstrip().endswith('/>'): depth += 1
        if depth == 0: return start + m.end()
    return -1
WRAPPED = re.compile(r'<div class="[^"]*overflow-x-auto[^"]*">\s*$')
def wrap(text):
    # collect matches first (indices valid on original), then apply in reverse
    todo = []
    for m in re.finditer(r'<table\b[^>]*>', text):
        before = text[:m.start()]
        if WRAPPED.search(before): continue
        end = balance(text, m.start(), 'table')
        if end < 0: continue
        todo.append((m.start(), end))
    for st, en in reversed(todo):
        line_start = text.rfind('\n', 0, st) + 1
        indent = text[line_start:st] if text[line_start:st].strip() == '' else ''
        text = text[:line_start] + indent + '<div class="overflow-x-auto">\n' + text[line_start:en] + '\n' + indent + '</div>' + text[en:]
    return text, len(todo)
def main():
    args = sys.argv[1:]; apply = "--apply" in args
    only = args[args.index("--only") + 1] if "--only" in args else None
    files = [os.path.join(ROOT, only)] if only else glob.glob(os.path.join(ROOT, "src", "**", "index.njk"), recursive=True)
    tf = tc = 0
    for f in files:
        if "blog" not in f.replace("\\", "/") or not os.path.exists(f): continue
        t = io.open(f, encoding="utf-8").read()
        nt, c = wrap(t)
        if c:
            tf += 1; tc += c
            print(("APPLY " if apply else "DRY   ") + os.path.relpath(f, ROOT) + "  tables=" + str(c))
            if apply: io.open(f, "w", encoding="utf-8", newline="\n").write(nt)
    print("\n%d file(s), %d table(s) %s" % (tf, tc, "wrapped" if apply else "(dry-run)"))
main()
