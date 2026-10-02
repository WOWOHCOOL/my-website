#!/usr/bin/env python3
# Non-blog heading color unify: h2/h3 with text-slate-900 -> text-brandBlue
# (keep size/mb/italic/uppercase; skip text-white/other colors). Dry-run default.
import io, os, re, sys, glob
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def fix(text):
    n=0
    def repl(m):
        nonlocal n
        cls=m.group(2)
        if 'text-slate-900' not in cls: return m.group(0)
        n+=1
        return m.group(1) + cls.replace('text-slate-900','text-brandBlue') + m.group(3)
    text=re.sub(r'(<h[23]\b[^>]*class=")([^"]*)(")', repl, text)
    return text, n
def main():
    args=sys.argv[1:]; apply="--apply" in args
    only=args[args.index("--only")+1] if "--only" in args else None
    files=[os.path.join(ROOT,only)] if only else glob.glob(os.path.join(ROOT,"src","**","index.njk"),recursive=True)
    tf=tc=0
    for f in files:
        if "blog" in f.replace("\\","/") or "_includes" in f or not os.path.exists(f): continue
        t=io.open(f,encoding="utf-8").read(); nt,c=fix(t)
        if c:
            tf+=1; tc+=c
            print(("APPLY " if apply else "DRY   ")+os.path.relpath(f,ROOT)+"  headings="+str(c))
            if apply: io.open(f,"w",encoding="utf-8",newline="\n").write(nt)
    print("\n%d file(s), %d heading(s) %s"%(tf,tc,"updated" if apply else "(dry-run)"))
main()
