#!/usr/bin/env python3
# Aesthetic badge standard: px-3 py-1 + text-badge + font-black + rounded-full + uppercase
# (keep semantic colors). Skips hero tags (already canonical) and the w-fit author badge.
# Dry-run by default. --only / --apply.
import io, os, re, sys, glob
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def fix_span(m):
    cls = m.group(1)
    if 'rounded-full' not in cls: return m.group(0), 0
    if 'w-fit' in cls: return m.group(0), 0                 # author badge
    nc = re.sub(r'\btext-(xs|micro)\b', 'text-badge', cls)
    nc = re.sub(r'\bpx-2\b', 'px-3', nc)
    nc = re.sub(r'\bpy-0\.5\b', 'py-1', nc)
    nc = re.sub(r'\bfont-bold\b', 'font-black', nc)
    if 'text-badge' in nc and not re.search(r'\buppercase\b', nc): nc = nc + ' uppercase'
    nc = re.sub(r'\s{2,}', ' ', nc).strip()
    if nc != cls: return '<span class="' + nc + '"', 1
    return m.group(0), 0
def fix(text):
    n = 0; out = []; last = 0
    for m in re.finditer(r'<span class="([^"]*rounded-full[^"]*)"', text):
        rep, c = fix_span(m)
        if c:
            out.append(text[last:m.start()]); out.append(rep); last = m.end(); n += c
    out.append(text[last:])
    return ''.join(out), n
def main():
    args = sys.argv[1:]; apply = "--apply" in args
    only = args[args.index("--only") + 1] if "--only" in args else None
    files = [os.path.join(ROOT, only)] if only else glob.glob(os.path.join(ROOT, "src", "**", "index.njk"), recursive=True)
    tf = tc = 0
    for f in files:
        if "blog" not in f.replace("\\", "/") or f.replace("\\", "/").endswith("blog/index.njk") or not os.path.exists(f): continue
        t = io.open(f, encoding="utf-8").read(); nt, c = fix(t)
        if c:
            tf += 1; tc += c
            print(("APPLY " if apply else "DRY   ") + os.path.relpath(f, ROOT) + "  badges=" + str(c))
            if apply: io.open(f, "w", encoding="utf-8", newline="\n").write(nt)
    print("\n%d file(s), %d badge(s) %s" % (tf, tc, "updated" if apply else "(dry-run)"))
main()
