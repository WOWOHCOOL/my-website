#!/usr/bin/env python3
# Render-equivalent token migration (non-blog):
#   max-w-3xl mx-auto px-6  -> container-narrow   (both 48rem + 1.5rem padding)
#   max-w-7xl mx-auto px-6  -> container-wide     (both 80rem + 1.5rem padding)
# Dry-run default. --only / --apply.
import io, os, re, sys, glob
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAIRS = [("max-w-7xl mx-auto px-6", "container-wide"), ("max-w-3xl mx-auto px-6", "container-narrow")]
def fix(text):
    n = 0
    for a, b in PAIRS:
        c = text.count(a)
        if c: text = text.replace(a, b); n += c
    return text, n
def main():
    args = sys.argv[1:]; apply = "--apply" in args
    only = args[args.index("--only")+1] if "--only" in args else None
    files = [os.path.join(ROOT, only)] if only else glob.glob(os.path.join(ROOT,"src","**","index.njk"),recursive=True)
    tf=tc=0
    for f in files:
        if "blog" in f.replace("\\","/") or "_includes" in f or not os.path.exists(f): continue
        t=io.open(f,encoding="utf-8").read(); nt,c=fix(t)
        if c:
            tf+=1; tc+=c
            print(("APPLY " if apply else "DRY   ")+os.path.relpath(f,ROOT)+"  tokens="+str(c))
            if apply: io.open(f,"w",encoding="utf-8",newline="\n").write(nt)
    print("\n%d file(s), %d token(s) %s"%(tf,tc,"updated" if apply else "(dry-run)"))
main()
