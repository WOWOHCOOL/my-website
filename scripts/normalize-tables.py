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
def upgrade_radius(blk):
    m = re.search(r'<table\b[^>]*>', blk)
    if not m: return blk, 0
    tag = m.group(0)
    cm = re.search(r'class="([^"]*)"', tag)
    cls = cm.group(1) if cm else ''
    nc = cls.replace('rounded-lg', 'rounded-xl')
    for tok in ['w-full', 'text-sm', 'border', 'border-slate-200', 'rounded-xl', 'overflow-hidden']:
        if not re.search(r'(^|\s)' + re.escape(tok) + r'(\s|$)', nc):
            nc = (nc + ' ' + tok).strip()
    nc = re.sub(r'\s{2,}', ' ', nc).strip()
    if nc != cls:
        ntag = re.sub(r'class="[^"]*"', 'class="' + nc + '"', tag, count=1) if cm else set_class(tag, nc)
        return blk[:m.start()] + ntag + blk[m.end():], 1
    return blk, 0
def fix_table(blk):
    n = 0
    blk, r = upgrade_radius(blk); n += r
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
def fix_wrapper(text, table_start):
    before = text[:table_start]
    m = re.search(r'<div class="([^"]*overflow-x-auto[^"]*)">\s*$', before)
    if not m: return text, 1, 0
    cls = m.group(1)
    if re.search(r'\brounded-xl\b', cls): return text, 1, 0
    nc = re.sub(r'\s{2,}', ' ', (cls + ' rounded-xl').strip())
    nt = text[:m.start(1)] + nc + text[m.end(1):]
    return nt, 1 + len(nc) - len(cls), 1
def migrate(text):
    spans = []
    for m in re.finditer(r'<table\b[^>]*>', text):
        end = balance(text, m.start(), 'table')
        if end > 0: spans.append((m.start(), end))
    if not spans: return text, 0
    out = []; last = 0; n = 0
    for ts, end in spans:
        if ts < last: continue
        pre = text[last:ts]
        wm = re.search(r'<div class="([^"]*overflow-x-auto[^"]*)">\s*$', pre)
        if wm:
            cls = wm.group(1)
            if not re.search(r'\brounded-xl\b', cls):
                ncls = re.sub(r'\s{2,}', ' ', (cls + ' rounded-xl').strip())
                pre = pre[:wm.start(1)] + ncls + pre[wm.end(1):]
                n += 1
        nblk, c = fix_table(text[ts:end]); n += c
        out.append(pre); out.append(nblk); last = end
    out.append(text[last:])
    return ''.join(out), n
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
