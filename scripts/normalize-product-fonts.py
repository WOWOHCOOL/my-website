#!/usr/bin/env python3
# Product-page prose fix: <p class="text-badge ..."> that is prose (italic / leading-relaxed)
# -> text-sm (11px -> 14px). Labels/eyebrows (uppercase tracking) stay text-badge.
import io, os, re, sys, glob
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def fix(text):
    n = 0
    def repl(m):
        nonlocal n
        cls = m.group(2)
        if 'text-badge' not in cls: return m.group(0)
        if ('italic' in cls or 'leading-relaxed' in cls) and 'uppercase' not in cls:
            nc = cls.replace('text-badge', 'text-sm')
            n += 1
            return m.group(1) + nc + m.group(3)
        return m.group(0)
    return re.sub(r'(<p\b[^>]*class=")([^"]*)(")', repl, text), n
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
            print(("APPLY " if apply else "DRY   ")+os.path.relpath(f,ROOT)+"  p="+str(c))
            if apply: io.open(f,"w",encoding="utf-8",newline="\n").write(nt)
    print("\n%d file(s), %d prose %s"%(tf,tc,"updated" if apply else "(dry-run)"))
main()
