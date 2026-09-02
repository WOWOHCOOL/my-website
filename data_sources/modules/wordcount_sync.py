#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Sync JSON-LD wordCount to the actual visible word count (audit's own metric).

Scope: blog articles where |declared - actual| / actual > 5% (W1 threshold).
Method: targeted in-block replacement of the `wordCount` integer only.
"""
import os, re, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import metadata_site_audit as M  # reuse visible_words + blog enumeration

NUM_RE = re.compile(r'("wordCount"\s*:\s*)(\d+)')


def sync_file(path, dry):
    src = open(path, encoding="utf-8").read()
    m = re.search(r'<script type="application/ld\+json">(.*?)</script>', src, re.DOTALL)
    if not m:
        return None
    d = json_load(m.group(1))
    if d is None:
        return None
    bp = next((o for o in d.get("@graph", []) if isinstance(o, dict) and o.get("@type") == "BlogPosting"), None)
    if not bp:
        return None
    wc = bp.get("wordCount")
    if not isinstance(wc, int):
        return None
    actual = M.visible_words(src)
    if not actual or abs(actual - wc) / max(actual, 1) <= 0.05:
        return ("ok", wc, actual)
    if dry:
        return ("plan", wc, actual)
    new_block, n = NUM_RE.subn(lambda mm: mm.group(1) + str(actual), m.group(1), count=1)
    if n != 1:
        return ("err", "wordCount line not found")
    src = src[:m.start(1)] + new_block + src[m.end(1):]
    open(path, "w", encoding="utf-8", newline="").write(src)
    return ("done", wc, actual)


def json_load(s):
    import json
    try:
        return json.loads(s)
    except Exception:
        return None


def main():
    dry = "--apply" not in sys.argv
    counts = {"ok": 0, "plan": 0, "done": 0, "err": 0, "skip": 0}
    for f in M.__dict__["blog_dirs_files"]() if False else all_blog_files():
        rel = os.path.relpath(f, M.SITE).replace("\\", "/")
        r = sync_file(f, dry)
        if r is None:
            counts["skip"] += 1
            continue
        if r[0] == "err":
            print("  ERR", rel, r[1])
        elif r[0] in ("plan", "done"):
            counts[r[0]] += 1
            print(f"  {r[0]} {rel}: {r[1]} -> {r[2]}")
        else:
            counts["ok"] += 1
    print(f"{'DRY-RUN' if dry else 'APPLIED'}: within-tolerance={counts['ok']} "
          f"{'planned' if dry else 'updated'}={counts['plan'] if dry else counts['done']} "
          f"err={counts['err']} skip={counts['skip']}")


def all_blog_files():
    import glob
    files = []
    for lang_key in M.BLOG_DIRS:
        d = os.path.join(M.SITE, lang_key)
        if not os.path.isdir(d):
            continue
        for root, _dirs, fs in os.walk(d):
            for f in fs:
                if f == "index.njk" and not os.path.samefile(root, d):
                    files.append(os.path.join(root, f))
    return files


if __name__ == "__main__":
    main()
