#!/usr/bin/env python3
# Hero category-tag standard (exactly 3 tags; color by position; unified classes).
#   1 = orange (topic)  2 = blue (product/category)  3 = green (angle/compliance)
# Only pages that ALREADY have exactly 3 tags are touched (names preserved verbatim);
# 1/2/4-tag pages are reported as "needs content decision" and left unchanged.
# Dry-run by default. --only <rel> / --apply.
import io, os, re, sys, glob
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
C = {
  1: "px-3 py-1 bg-brandOrange/10 text-brandOrange text-badge font-black rounded-full uppercase",
  2: "px-3 py-1 bg-brandBlue/10 text-brandBlue text-badge font-black rounded-full uppercase",
  3: "px-3 py-1 bg-green-100 text-green-700 text-badge font-black rounded-full uppercase",
}
WRAP_OPEN = '<div class="flex flex-wrap gap-2 mb-6">'
def build(tags):
    out = ["", " <!-- Category Tags -->", " " + WRAP_OPEN]
    for i, t in enumerate(tags, 1):
        out.append(' <span class="%s">%s</span>' % (C[i], t))
    out.append(" </div>")
    out.append("")
    return "\n".join(out)
def migrate(text):
    m = re.search(r'(\{\{ breadcrumb\([\s\S]*?\) \}\})([\s\S]*?)(<h1)', text)
    if not m: return text, 0, 0
    region = m.group(2)
    spans = re.findall(r'<span class="[^"]*">([\s\S]*?)</span>', region)
    if len(spans) != 3: return text, 0, len(spans)
    body = "\n".join(' <span class="%s">%s</span>' % (C[i], t) for i, t in enumerate(spans, 1))
    # (1) existing flex-wrap wrapper -> replace its inner content
    wm = re.search(r'(<div class="flex flex-wrap gap-2 mb-6">)([\s\S]*?)(</div>)', region)
    if wm:
        new_region = region[:wm.start(2)] + "\n" + body + "\n " + region[wm.end(2):]
        return text[:m.start(2)] + new_region + text[m.end(2):], (0 if new_region == region else 1), 3
    # (2) loose span(s) -> wrap them
    sm = re.search(r'[ \t]*<span class="[^"]*">[\s\S]*?</span>(\s*<span class="[^"]*">[\s\S]*?</span>)*', region)
    if sm:
        wrapped = " <div class=\"flex flex-wrap gap-2 mb-6\">\n" + body + "\n </div>"
        new_region = region[:sm.start()] + wrapped + region[sm.end():]
        return text[:m.start(2)] + new_region + text[m.end(2):], (0 if new_region == region else 1), 3
    return text, 0, len(spans)
def main():
    args = sys.argv[1:]; apply = "--apply" in args
    only = args[args.index("--only") + 1] if "--only" in args else None
    files = [os.path.join(ROOT, only)] if only else glob.glob(os.path.join(ROOT, "src", "**", "index.njk"), recursive=True)
    done = []; need = []
    for f in files:
        if "blog" not in f.replace("\\", "/") or not os.path.exists(f): continue
        if not os.path.exists(f): continue
        t = io.open(f, encoding="utf-8").read()
        nt, changed, n = migrate(t)
        rel = os.path.relpath(f, ROOT)
        if changed:
            done.append(rel)
            print(("APPLY " if apply else "DRY   ") + rel)
            if apply: io.open(f, "w", encoding="utf-8", newline="\n").write(nt)
        elif n and n != 3:
            need.append((rel, n))
    print("\nstandardized: %d file(s); need content decision: %d file(s)" % (len(done), len(need)))
    if need: print("  (1/2/4-tag pages left unchanged):", ", ".join("%s[%d]" % (r, n) for r, n in need[:40]))
main()
