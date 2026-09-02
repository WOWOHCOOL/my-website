#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Prebuild Gate — MUST pass before any 11ty build (wired as first step of `npm run build`).

Step 1: i18n path lint          (node scripts/lint-i18n-paths.js)
Step 2: blog metadata audit     (metadata_site_audit.py, 6-language blog sweep)

Exit 0 = gate pass (build proceeds)
Exit 1 = gate BLOCKED (fix CRITICAL findings first; report path is printed)

Standard: context/b2b-multilingual-metadata-standard.md (v2.5, §六 标准变更迁移铁律)
"""
import json
import os
import subprocess
import sys
from datetime import date

sys.stdout.reconfigure(encoding="utf-8", errors="replace")  # GBK console guard (npm has no PYTHONUTF8)

SEOMACHINE = r"C:\Users\wowoh\seomachine"
SITE = r"C:\Users\wowoh\wowohcool.com"
AUDIT = os.path.join(SEOMACHINE, "data_sources", "modules", "metadata_site_audit.py")


def run(cmd, cwd):
    env = os.environ.copy()
    env["PYTHONUTF8"] = "1"
    p = subprocess.run(cmd, cwd=cwd, env=env, capture_output=True,
                       text=True, encoding="utf-8", errors="replace", timeout=600)
    return p.returncode, (p.stdout or "") + (p.stderr or "")


def main():
    print("=== PREBUILD GATE ===")

    # Step 1: i18n lint
    rc, out = run(["node", "scripts/lint-i18n-paths.js"], cwd=SITE)
    ok1 = rc == 0
    line = next((l for l in out.splitlines() if l.strip()), out.strip()[:120])
    print(f"[{'PASS' if ok1 else 'FAIL'}] i18n path lint — {line.strip()[:110]}")

    # Step 2: metadata audit
    rc, out = run([sys.executable, AUDIT], cwd=SEOMACHINE)
    ok2 = rc == 0
    for line in out.splitlines():
        if line.startswith(("scanned=", "  C", "  W")):
            print("  " + line.strip())

    today = date.today().isoformat()
    crit = None
    jf = os.path.join(SEOMACHINE, "audits", f"metadata-site-{today}.json")
    detail = ""
    if os.path.exists(jf):
        data = json.load(open(jf, encoding="utf-8"))
        crits = [x for x in data.get("issues", []) if x.get("severity") == "CRITICAL"]
        crit = len(crits)
        ok2 = ok2 and crit == 0
        if crits:
            by = {}
            for x in crits:
                by[x["check"]] = by.get(x["check"], 0) + 1
            detail = "; ".join(f"{k}×{v}" for k, v in sorted(by.items()))
            for x in crits[:5]:
                print(f"  ❌ {x['file']} [{x['check']}] {x['msg'][:90]}")
            if len(crits) > 5:
                print(f"  … and {len(crits)-5} more — full list: {jf}")

    print(f"[{'PASS' if ok2 else 'FAIL'}] metadata audit — CRITICAL={crit}{(' (' + detail + ')') if detail else ''}")

    # Step 3: non-blog Organization check (knowsAbout + areaServed + contactPoint + Wikidata)
    rc3, out3 = run([sys.executable, os.path.join(SEOMACHINE, "check_org_knows.py")], cwd=SEOMACHINE)
    ok3 = rc3 == 0
    tail3 = "\n".join(out3.strip().splitlines()[-3:])
    print(f"[{'PASS' if ok3 else 'FAIL'}] non-blog Organization check")
    if not ok3:
        print("  " + tail3[:300])

    # Step 4: author consistency (name/jobTitle/LinkedIn/avatar vs front-end, cluster exclusivity)
    rc4, out4 = run([sys.executable, os.path.join(SEOMACHINE, "audit_author_consistency.py")], cwd=SEOMACHINE)
    ok4 = rc4 == 0 and "Errors found" not in out4
    print(f"[{'PASS' if ok4 else 'FAIL'}] author consistency")
    if not ok4:
        print("  " + "\n".join(out4.strip().splitlines()[:6])[:300])

    if not (ok1 and ok2 and ok3 and ok4):
        print("=== GATE BLOCKED — fix the above before build/deploy ===")
        print(f"    report: {jf if crit is not None else '(audit did not complete)'}")
        sys.exit(1)
    print("=== GATE PASS ===")


if __name__ == "__main__":
    main()
