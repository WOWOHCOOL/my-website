#!/usr/bin/env python3
# Legal pages: normalize subsection <h2> to the majority style
#   text-lg font-bold text-brandBlue mb-3   (preserve mt-*)
# Dry-run default. --only / --apply.
import io, os, re, sys, glob
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KEYS = ["privacy","terms","impressum","agb","aviso","confidentialite","politika","nota-prawna","usloviya","pravovaya","regulamin","politica","datenschutz","mentions","cgv"]
def is_legal(f): return any(k in f.replace("\\","/") for k in KEYS)
def fix(text):
    n = 0
    def repl(m):
        nonlocal n
        cls = m.group(2)
        mt = re.search(r'\bmt-\d+\b', cls)
        nc = 'text-lg font-bold text-brandBlue mb-3' + ((' ' + mt.group(0)) if mt else '')
        if nc != cls:
            n += 1
            return m.group(1) + nc + m.group(3)
        return m.group(0)
    return re.sub(r'(<h2\b[^>]*class=")([^"]*)(")', repl, text), n
def main():
    args = sys.argv[1:]; apply = "--apply" in args
    only = args[args.index("--only")+1] if "--only" in args else None
    files = [os.path.join(ROOT, only)] if only else glob.glob(os.path.join(ROOT,"src","**","index.njk"),recursive=True)
    tf=tc=0
    for f in files:
        if "blog" in f.replace("\\","/") or "_includes" in f or not is_legal(f) or not os.path.exists(f): continue
        t=io.open(f,encoding="utf-8").read(); nt,c=fix(t)
        if c:
            tf+=1; tc+=c
            print(("APPLY " if apply else "DRY   ")+os.path.relpath(f,ROOT)+"  h2="+str(c))
            if apply: io.open(f,"w",encoding="utf-8",newline="\n").write(nt)
    print("\n%d file(s), %d h2 %s"%(tf,tc,"updated" if apply else "(dry-run)"))
main()
