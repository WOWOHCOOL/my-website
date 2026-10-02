#!/usr/bin/env python3
# Normalize BODY-SECTION prose <p> font size to the standard 16px (no size class).
# Scope: <p> with text-slate-600 inside a body card (bg-slate-50 rounded-xl ... shadow-sm).
# Removes text-sm / text-body / text-lg from those paragraphs. Keeps text-xs (captions/notes).
# Dry-run by default. --only <rel> / --apply.
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
PSIZE = re.compile(r'\btext-(?:sm|body|lg)\b\s*')
def _ensure(cls, tokens):
    added = []
    for t in tokens:
        prefix = 'leading-' if t == 'leading-relaxed' else 'mb-'
        if not re.search(r'(^|\s)' + re.escape(prefix) + r'[\w.-]*', cls):
            added.append(t)
    if not added: return cls
    return re.sub(r'\s{2,}', ' ', (cls + ' ' + ' '.join(added)).strip())
def norm_block(blk):
    changes = 0
    def repl_p(m):
        nonlocal changes
        pre, cls, post = m.group(1), m.group(2), m.group(3)
        if 'text-slate-600' not in cls or 'text-xs' in cls or 'text-badge' in cls:
            return m.group(0)
        nc = PSIZE.sub('', cls).strip()          # unify size -> 16px
        nc = _ensure(nc, ['leading-relaxed', 'mb-4'])  # ensure body rhythm
        nc = re.sub(r'\s{2,}', ' ', nc)
        if nc != cls:
            changes += 1
            return pre + nc + post
        return m.group(0)
    def repl_ul(m):
        nonlocal changes
        pre, cls, post = m.group(1), m.group(2), m.group(3)
        if 'text-slate-600' not in cls or 'text-xs' in cls:
            return m.group(0)
        nc = PSIZE.sub('', cls).strip()          # lists match body size 16px
        nc = re.sub(r'\s{2,}', ' ', nc)
        if nc != cls:
            changes += 1
            return pre + nc + post
        return m.group(0)
    blk = re.sub(r'(<p\b[^>]*class=")([^"]*)(")', repl_p, blk)
    blk = re.sub(r'(<ul\b[^>]*class=")([^"]*)(")', repl_ul, blk)
    return blk, changes
def migrate(text):
    n = 0; out = []; last = 0
    for m in CARD.finditer(text):
        if m.start() < last: continue
        end = balance(text, m.start(), 'div')
        if end < 0: continue
        blk = text[m.start():end]
        nblk, c = norm_block(blk)
        if c:
            out.append(text[last:m.start()]); out.append(nblk); last = end; n += c
    if n == 0: return text, 0
    out.append(text[last:])
    return ''.join(out), n
def main():
    args = sys.argv[1:]; apply = "--apply" in args
    only = args[args.index("--only") + 1] if "--only" in args else None
    files = [os.path.join(ROOT, only)] if only else glob.glob(os.path.join(ROOT, "src", "**", "index.njk"), recursive=True)
    tf = tc = 0
    for f in files:
        if "blog" not in f.replace("\\", "/") or not os.path.exists(f): continue
        t = io.open(f, encoding="utf-8").read()
        nt, c = migrate(t)
        if c:
            tf += 1; tc += c
            print(("APPLY " if apply else "DRY   ") + os.path.relpath(f, ROOT) + "  p=" + str(c))
            if apply: io.open(f, "w", encoding="utf-8", newline="\n").write(nt)
    print("\n%d file(s), %d paragraph(s) %s" % (tf, tc, "updated" if apply else "(dry-run)"))
main()
