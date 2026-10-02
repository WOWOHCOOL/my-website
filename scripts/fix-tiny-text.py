#!/usr/bin/env python3
# Bump tiny text-[9px] to a readable token: footnote divs -> text-xs(12px); badges -> text-badge(11px).
import io, os, re, sys, glob
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def fix(text):
    if 'text-[9px]' not in text: return text, 0
    n=text.count('text-[9px]')
    text=text.replace('class="text-[9px] text-slate-400 mt-1"','class="text-xs text-slate-400 mt-1"')
    text=re.sub(r'text-\[9px\]','text-badge',text)
    return text, n
def main():
    args=sys.argv[1:]; apply="--apply" in args
    only=args[args.index("--only")+1] if "--only" in args else None
    files=[os.path.join(ROOT,only)] if only else glob.glob(os.path.join(ROOT,"src","**","index.njk"),recursive=True)
    tf=tc=0
    for f in files:
        if "_includes" in f or not os.path.exists(f): continue
        t=io.open(f,encoding="utf-8").read(); nt,c=fix(t)
        if c:
            tf+=1; tc+=c
            print(("APPLY " if apply else "DRY   ")+os.path.relpath(f,ROOT)+"  text9="+str(c))
            if apply: io.open(f,"w",encoding="utf-8",newline="\n").write(nt)
    print("\n%d file(s), %d tiny-text %s"%(tf,tc,"updated" if apply else "(dry-run)"))
main()
