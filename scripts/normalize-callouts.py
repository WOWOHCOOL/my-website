#!/usr/bin/env python3
# Majority-rule callout padding: p-5 -> p-6 in colored callout/insight boxes.
# Dry-run by default. --only / --apply.
import io, os, re, sys, glob
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CALL = re.compile(r'<div class="([^"]*(?:bg-brandBlue/5|bg-amber-50|bg-green-50|bg-red-50)[^"]*)"')
def fix(text):
    n = 0
    def repl(m):
        nonlocal n
        cls = m.group(1)
        if re.search(r'\bp-5\b', cls):
            nc = re.sub(r'\bp-5\b', 'p-6', cls)
            n += 1
            return '<div class="' + nc + '"'
        return m.group(0)
    return CALL.sub(repl, text), n
def main():
    args = sys.argv[1:]; apply = "--apply" in args
    only = args[args.index("--only") + 1] if "--only" in args else None
    files = [os.path.join(ROOT, only)] if only else glob.glob(os.path.join(ROOT, "src", "**", "index.njk"), recursive=True)
    tf = tc = 0
    for f in files:
        if "blog" not in f.replace("\\", "/") or not os.path.exists(f): continue
        t = io.open(f, encoding="utf-8").read(); nt, c = fix(t)
        if c:
            tf += 1; tc += c
            print(("APPLY " if apply else "DRY   ") + os.path.relpath(f, ROOT) + "  callouts=" + str(c))
            if apply: io.open(f, "w", encoding="utf-8", newline="\n").write(nt)
    print("\n%d file(s), %d callout(s) %s" % (tf, tc, "updated" if apply else "(dry-run)"))
main()
