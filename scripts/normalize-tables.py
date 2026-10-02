#!/usr/bin/env python3
# Majority-rule table appearance: blue header (thead bg-brandBlue text-white) +
# row separators on tables lacking them. Dry-run by default. --only / --apply.
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
def set_class(open_tag, newcls):
    if re.search(r'\bclass="', open_tag):
        return re.sub(r'class="[^"]*"', 'class="' + newcls + '"', open_tag, count=1)
    return open_tag[:-1] + ' class="' + newcls + '">'
def fix_table(blk):
    n = 0
    # 1) blue header
    blue = re.search(r'<thead\b[^>]*class="[^"]*bg-brandBlue|<tr\b[^>]*class="[^"]*bg-brandBlue|<th\b[^>]*class="[^"]*bg-brandBlue', blk)
    thm = re.search(r'<thead\b[^>]*>', blk)
    if thm and not blue:
        blk = blk[:thm.start()] + set_class(thm.group(0), 'bg-brandBlue text-white') + blk[thm.end():]
        # strip slate bg from header row, text colors from th (inherit white)
        def _strip_tr(m):
            rest = re.sub(r'\bbg-slate-\d+\b\s*', '', m.group(1)).strip()
            return ('<tr class="' + rest + '">') if rest else '<tr>'
        blk = re.sub(r'<tr\b[^>]*class="([^"]*)"[^>]*>', _strip_tr, blk, count=1)
        head_end = blk.find('</thead>')
        head = blk[:head_end]
        head = re.sub(r'(<th\b[^>]*class=")([^"]*)"', lambda m: m.group(1) + re.sub(r'\btext-(slate-\d+|brandBlue|brandOrange)\b\s*', '', m.group(2)).strip() + '"', head)
        blk = head + blk[head_end:]
        n += 1
    # 2) row separators
    if not re.search(r'border-b|divide-y', blk):
        tbm = re.search(r'<tbody\b[^>]*>', blk)
        if tbm:
            blk = blk[:tbm.start()] + set_class(tbm.group(0), 'divide-y divide-slate-200') + blk[tbm.end():]
            n += 1
    return blk, n
def migrate(text):
    n = 0; out = []; last = 0
    for m in re.finditer(r'<table\b[^>]*>', text):
        if m.start() < last: continue
        end = balance(text, m.start(), 'table')
        if end < 0: continue
        nblk, c = fix_table(text[m.start():end])
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
            print(("APPLY " if apply else "DRY   ") + os.path.relpath(f, ROOT) + "  tables=" + str(c))
            if apply: io.open(f, "w", encoding="utf-8", newline="\n").write(nt)
    print("\n%d file(s), %d table(s) %s" % (tf, tc, "updated" if apply else "(dry-run)"))
main()
