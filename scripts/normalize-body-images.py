#!/usr/bin/env python3
# Blog CONTENT images (signature: rounded-2xl shadow-lg) must be full width in their region:
#   - remove max-w-* (except max-w-full) and mx-auto
#   - ensure w-full ; normalize rounded-xl->rounded-2xl, shadow-md->shadow-lg
# Dry-run default. --only / --apply.
import io, os, re, sys, glob
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MAXW = re.compile(r'\bmax-w-(?:xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl)\b\s*')
def fix(text):
    n = 0
    def repl(m):
        nonlocal n
        cls = m.group(1)
        if not ('rounded-2xl' in cls or 'rounded-xl' in cls): return m.group(0)
        if not ('shadow-lg' in cls or 'shadow-md' in cls): return m.group(0)
        nc = MAXW.sub('', cls)
        nc = re.sub(r'\bmx-auto\b\s*', '', nc)
        nc = re.sub(r'\brounded-xl\b', 'rounded-2xl', nc)
        nc = re.sub(r'\bshadow-md\b', 'shadow-lg', nc)
        if 'w-full' not in nc.split(): nc = 'w-full ' + nc
        nc = re.sub(r'\s{2,}', ' ', nc).strip()
        if nc != cls:
            n += 1
            return m.group(0).replace('class="' + cls + '"', 'class="' + nc + '"')
        return m.group(0)
    return re.sub(r'<img\b[^>]*class="([^"]*)"[^>]*>', repl, text), n
def main():
    args = sys.argv[1:]; apply = "--apply" in args
    only = args[args.index("--only")+1] if "--only" in args else None
    files = [os.path.join(ROOT, only)] if only else glob.glob(os.path.join(ROOT,"src","**","index.njk"),recursive=True)
    tf=tc=0
    for f in files:
        rel=f.replace("\\","/")
        if "blog" not in rel or "_includes" in rel or not os.path.exists(f): continue
        t=io.open(f,encoding="utf-8").read(); nt,c=fix(t)
        if c:
            tf+=1; tc+=c
            print(("APPLY " if apply else "DRY   ")+os.path.relpath(f,ROOT)+"  img="+str(c))
            if apply: io.open(f,"w",encoding="utf-8",newline="\n").write(nt)
    print("\n%d file(s), %d content image(s) %s"%(tf,tc,"updated" if apply else "(dry-run)"))
main()
