#!/usr/bin/env python3
"""
Check New Article — post-writing quality pipeline (single entry point).

Runs the 5 mandatory post-writing checks in sequence and gates on failures.
Use after writing a new article (or site-wide for a periodic sweep).

Steps:
  1. i18n path lint          node scripts/lint-i18n-paths.js   (site repo)
  2. Factory data consistency python factory_consistency_audit.py (core+ext, filtered by target file)
  3. B2B content auditor     python b2b_content_auditor.py <file> (19 checks, score-gated)
  4. FAQ schema consistency  python faq_consistency_check.py <file>
  5. Accent scan (fr/es/de)  python accent_scan.py SCAN          (site-wide, WARN)
  6. Fragment residue lint   python fragment_residue_lint.py <file> (catches broken
                             sentences left by scripted batch edits; FAIL on target
                             findings, WARN on site-wide historical baseline)

Usage:
  PYTHONUTF8=1 python data_sources/modules/check_new_article.py <article.njk>   # targeted (recommended)
  PYTHONUTF8=1 python data_sources/modules/check_new_article.py                  # site-wide sweep

Exit codes: 0 = no FAIL (WARNs allowed) | 1 = at least one FAIL
"""

import json
import os
import re
import subprocess
import sys

SEOMACHINE = r"C:\Users\wowoh\seomachine"
SITE_ROOT = r"C:\Users\wowoh\wowohcool.com"
MODULES = os.path.join(SEOMACHINE, "data_sources", "modules")

# B2B auditor score gates (overall_score 0-100)
SCORE_FAIL_BELOW = 60
SCORE_WARN_BELOW = 80

RESULTS = []  # (step, status, detail)


def add(step, status, detail=""):
    RESULTS.append((step, status, detail))
    mark = {"PASS": "✅", "WARN": "⚠️ ", "FAIL": "❌", "SKIP": "⏭️ "}[status]
    print(f"{mark} [{status}] {step}" + (f" — {detail}" if detail else ""))


def run(cmd, cwd=None, env_extra=None):
    """Run subprocess, return (returncode, stdout+stderr)."""
    env = os.environ.copy()
    env["PYTHONUTF8"] = "1"
    if env_extra:
        env.update(env_extra)
    try:
        p = subprocess.run(cmd, cwd=cwd, env=env, capture_output=True,
                           text=True, encoding="utf-8", errors="replace", timeout=600)
        return p.returncode, (p.stdout or "") + (p.stderr or "")
    except FileNotFoundError as e:
        return 127, str(e)
    except subprocess.TimeoutExpired:
        return 124, "timeout after 600s"


def detect_lang(path):
    p = path.replace("\\", "/")
    for tag in ("/de/", "/es/", "/fr/", "/ru/", "/pl/"):
        if tag in p:
            return tag.strip("/").upper()
    return "EN"


def py(*args):
    return [sys.executable] + list(args)


# ── Step 1: i18n path lint ────────────────────────────────────────
def step_i18n_lint():
    rc, out = run(["node", "scripts/lint-i18n-paths.js"], cwd=SITE_ROOT)
    if rc != 0:
        tail = "\n".join(out.strip().splitlines()[-8:])
        add("1. i18n path lint", "FAIL", tail)
    else:
        line = next((l for l in out.splitlines() if "clean" in l.lower()), "clean")
        add("1. i18n path lint", "PASS", line.strip())


# ── Step 2: factory data consistency (core + ext) ────────────────
def step_factory(target_rel=None):
    audit_py = os.path.join(MODULES, "factory_consistency_audit.py")
    today = None
    totals = {}
    for mode in ("core", "ext"):
        rc, out = run(py(audit_py, "--mode", mode), cwd=SEOMACHINE)
        m = re.search(r"core-deviations=(\d+)", out) or re.search(r"ext-deviations=(\d+)", out)
        n = int(m.group(1)) if m else -1
        totals[mode] = n
        if rc != 0:
            add(f"2. factory audit ({mode})", "FAIL", out.strip()[-300:])
            return
    # load JSONs and filter by target file
    from datetime import date
    today = date.today().isoformat()
    target_devs = []
    if target_rel:
        core_json = os.path.join(SEOMACHINE, "audits", f"factory-consistency-{today}.json")
        ext_json = os.path.join(SEOMACHINE, "audits", f"factory-data-ext-{today}.json")
        for jf, label in ((core_json, "core"), (ext_json, "ext")):
            if os.path.exists(jf):
                data = json.load(open(jf, encoding="utf-8"))
                for x in data.get("deviations", []):
                    if target_rel in x.get("file", ""):
                        target_devs.append((label, x))
    if target_rel:
        if target_devs:
            detail = "; ".join(f"[{lb}] {x['rule']}={x['found']} ({x['file']}:{x.get('line','?')})"
                               for lb, x in target_devs[:6])
            add("2. factory data consistency", "FAIL",
                f"{len(target_devs)} deviation(s) on target — {detail}")
        else:
            add("2. factory data consistency", "PASS",
                f"target clean (site: core={totals['core']} ext={totals['ext']} pre-existing)")
    else:
        status = "PASS" if totals["core"] == 0 and totals["ext"] == 0 else "WARN"
        add("2. factory data consistency", status,
            f"site-wide core={totals['core']} ext={totals['ext']} (run --mode curate for classification)")


# ── Step 3: B2B content auditor ──────────────────────────────────
def step_b2b_auditor(target):
    if not target:
        add("3. B2B content auditor", "SKIP", "no target file")
        return
    auditor = os.path.join(MODULES, "b2b_content_auditor.py")
    rc, out = run(py(auditor, target, "--score-only"), cwd=SEOMACHINE)
    if rc != 0:
        add("3. B2B content auditor", "FAIL", out.strip()[-300:])
        return
    try:
        score = float(out.strip().splitlines()[-1])
    except (ValueError, IndexError):
        add("3. B2B content auditor", "WARN", f"unparseable score output: {out.strip()[-100:]}")
        return
    lang = detect_lang(target)
    if score < SCORE_FAIL_BELOW:
        add("3. B2B content auditor", "FAIL", f"score {score:.0f} < {SCORE_FAIL_BELOW} [{lang}]")
    elif score < SCORE_WARN_BELOW:
        add("3. B2B content auditor", "WARN", f"score {score:.0f} < {SCORE_WARN_BELOW} [{lang}] — review weak checks")
    else:
        add("3. B2B content auditor", "PASS", f"score {score:.0f} [{lang}]")


# ── Step 4: FAQ schema↔body consistency ──────────────────────────
def step_faq(target):
    if not target:
        add("4. FAQ consistency", "SKIP", "no target file")
        return
    faq = os.path.join(MODULES, "faq_consistency_check.py")
    rc, out = run(py(faq, target), cwd=SEOMACHINE)
    if rc != 0:
        detail = "\n".join(out.strip().splitlines()[-8:])
        add("4. FAQ consistency", "FAIL", detail)
    else:
        line = next((l for l in out.strip().splitlines() if l.strip()), "ok")
        add("4. FAQ consistency", "PASS", line.strip()[:120])


# ── Step 5: accent scan (fr/es/de) ───────────────────────────────
def step_accents():
    scan = os.path.join(MODULES, "accent_scan.py")
    rc, out = run(py(scan, "SCAN"), cwd=SEOMACHINE)
    if rc != 0:
        add("5. accent scan", "WARN", f"scan error: {out.strip()[-200:]}")
        return
    # parse "=== fr 站: N 个缺重音词" lines
    langs = re.findall(r"=== (\w+) 站: (\d+) 个缺重音词", out)
    found = [(l, int(n)) for l, n in langs if int(n) > 0]
    if found:
        detail = ", ".join(f"{l}: {n} words" for l, n in found)
        add("5. accent scan", "WARN", f"missing accents — {detail} (review before publish)")
    else:
        add("5. accent scan", "PASS", "no missing accents (fr/es/de)")


# ── Step 6: fragment residue lint (broken sentences from batch edits) ──
def step_fragment_residue(target):
    """Detects residue sentences left by scripted fragment replacements
    (optimize/batch-edit passes): orphan lowercase continuations, double
    punctuation, unbalanced pairs. Site-wide historical findings exist (~125),
    so a target run FAILs only on target findings; sweep reports WARN."""
    lint = os.path.join(MODULES, "fragment_residue_lint.py")
    if target:
        rc, out = run(py(lint, target), cwd=SEOMACHINE)
        if rc != 0:
            detail = "\n".join(out.strip().splitlines()[:10])
            add("6. fragment residue lint", "FAIL", detail)
        else:
            add("6. fragment residue lint", "PASS",
                next((l for l in out.strip().splitlines() if "clean" in l.lower()), "clean"))
    else:
        rc, out = run(py(lint), cwd=SEOMACHINE)
        n = 0
        m = re.search(r"(\d+) fragment-residue finding", out)
        if m:
            n = int(m.group(1))
        add("6. fragment residue lint", "WARN" if n else "PASS",
            f"site-wide historical baseline: {n} finding(s) — batch new files must be individually clean")


# ── main ──────────────────────────────────────────────────────────
def main():
    target = None
    args = [a for a in sys.argv[1:] if not a.startswith("-")]
    if args:
        target = os.path.abspath(args[0])
        if not os.path.exists(target):
            print(f"target not found: {target}")
            sys.exit(2)

    target_rel = None
    if target:
        target_rel = os.path.relpath(target, SITE_ROOT).replace("\\", "/")

    print("=" * 62)
    print("CHECK NEW ARTICLE — post-writing pipeline")
    print("=" * 62)
    if target:
        print(f"  target : {target_rel} [{detect_lang(target)}]")
    else:
        print("  mode   : site-wide sweep (no target file)")
    print()

    step_i18n_lint()
    step_factory(target_rel)
    step_b2b_auditor(target)
    step_faq(target)
    step_accents()
    step_fragment_residue(target)

    fails = [r for r in RESULTS if r[1] == "FAIL"]
    warns = [r for r in RESULTS if r[1] == "WARN"]
    print()
    print("=" * 62)
    print(f"RESULT: {len(RESULTS)} steps — {len(fails)} FAIL / {len(warns)} WARN / "
          f"{sum(1 for r in RESULTS if r[1]=='PASS')} PASS / {sum(1 for r in RESULTS if r[1]=='SKIP')} SKIP")
    if fails:
        print("  gate: BLOCKED — fix FAILs before publish")
    elif warns:
        print("  gate: PASS with warnings — review WARNs")
    else:
        print("  gate: PASS — clear to publish")
    print("=" * 62)
    sys.exit(1 if fails else 0)


if __name__ == "__main__":
    main()
