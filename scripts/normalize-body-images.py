#!/usr/bin/env python3
# Normalize BODY-SECTION <img> visual tokens to the standard: rounded-2xl + shadow-lg
# (sizing/margins/max-w left untouched). Dry-run by default. --only / --apply.
import io, os, re, sys, glob
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CARD = re.compile(r'<div class="bg-slate-50 rounded-xl p-6 border border-slate-200 shadow-sm">')
def balance(s, start, tag):
    depth = 0
    for m in re.finditer(r'<(/?)%s\b[^>]*>' % tag, s[start:], re.I):
        tok = m.group(0)
        if tok.startswith('</'): depth -= 1
        elif not tok.rstrip().endswith('/>'): depth += 1
        if depth == 0: return start + m.end()
    return -1
def fix_block(blk):
    n = 0
    def repl(m):
        nonlocal n
        cls = m.group(1)
        nc = re.sub(r'\bmax-w-3xl\b\s*', '', cls)   # full width inside the card
        nc = re.sub(r'\bmx-auto\b\s*', '', nc)
        nc = re.sub(r'\brounded-xl\b', 'rounded-2xl', nc)
        nc = re.sub(r'\bshadow-md\b', 'shadow-lg', nc)
        if 'w-full' not in nc.split(): nc = 'w-full ' + nc
        nc = re.sub(r'\s{2,}', ' ', nc).strip()
        if nc != cls:
            n += 1
            return m.group(0).replace('class="' + cls + '"', 'class="' + nc + '"')
        return m.group(0)
    return re.sub(r'<img\b[^>]*class="([^"]*)"[^>]*>', repl, blk), n
def migrate(text):
    n = 0; out = []; last = 0
    for m in CARD.finditer(text):
        if m.start() < last: continue
        end = balance(text, m.start(), 'div')
        if end < 0: continue
        nblk, c = fix_block(text[m.start():end])
        if c:
            out.append(text[last:m.start()]); out.append(nblk); last = end; n += c
    if n == 0: return text, 0
    out.append(text[last:]); return ''.join(out), n
def main():
    args = sys.argv[1:]; apply = "--apply" in args
    only = args[args.index("--only") + 1] if "--only" in args else None
    files = [os.path.join(ROOT, only)] if only else glob.glob(os.path.join(ROOT, "src", "**", "index.njk"), recursive=True)
    tf = tc = 0
    for f in files:
        if "blog" not in f.replace("\\", "/") or not os.path.exists(f): continue
        t = io.open(f, encoding="utf-8").read(); nt, c = migrate(t)
        if c:
            tf += 1; tc += c
            print(("APPLY " if apply else "DRY   ") + os.path.relpath(f, ROOT) + "  img=" + str(c))
            if apply: io.open(f, "w", encoding="utf-8", newline="\n").write(nt)
    print("\n%d file(s), %d image(s) %s" % (tf, tc, "updated" if apply else "(dry-run)"))
main()
