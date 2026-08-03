"""
Deep metadata audit for EN blog based on user-provided bug taxonomy.

Categories:
  1. Entity reference errors (worksFor dangling, publisher inline, duplicate WebSite)
  2. Wrong field values (Org.url, Person.url, Wikidata IDs, articleSection copy-paste,
     headline brand suffix, postalCode typos)
  3. Cross-page inconsistency (Organization areaServed/contactPoint/logo)
  4. Numeric logic (wordCount vs timeRequired, HowTo.totalTime semantics)
  5. Missing fields (citation, about, inLanguage, articleSection, thumbnailUrl,
     HowTo/FAQPage @id)
  6. JSON syntax
  7. Content layer (FAQ repetition, near-duplicate questions)
"""
import re
import json
import os
from pathlib import Path
from collections import defaultdict, Counter

BLOG = Path(r"C:\Users\wowoh\wowohcool.com\src\blog")

# Known-good Wikidata IDs to a sanity list (subject -> allowed labels/urls)
WIKIDATA_SAFE = {
    "Q411713": "Gallium nitride",
    "Q228055": "CE marking",
    "Q352917": "Battery charger",
    "Q267558": "Original equipment manufacturer",
    "Q1332128": "USB Power Delivery",
    "Q844569": "Wireless charging",
    "Q193395": "Battery",
    "Q83323": "Lithium-ion battery",
    "Q11248": "USB",  # not ideal for USB PD articles
}
# Wikidata IDs that we've seen mis-used as bugs
WIKIDATA_BAD = {
    "Q476466": "When in Rome (film)",
    "Q1236041": "Jozef Barmos (person)",
    "Q1015862": "The Wedding Banquet (film)",
    "Q4796": "USB-C (correct entity is USB PD Q1332128)",
}

def load_articles():
    out = []
    for d in sorted(BLOG.iterdir()):
        if d.is_dir() and (d / "index.njk").exists():
            out.append(d.name)
    return out

def extract_frontmatter(text):
    m = re.match(r"^---\s*\n(.*?)\n---", text, re.DOTALL)
    if not m:
        return {}
    fm = {}
    for line in m.group(1).splitlines():
        m2 = re.match(r"^\s*([\w]+):\s*(.+?)\s*$", line)
        if m2:
            fm[m2.group(1)] = m2.group(2).strip().strip('"')
    return fm

def extract_all_jsonld(text):
    blocks = []
    for m in re.finditer(
        r'<script\s+type="application/ld\+json">\s*(\{.*?\})\s*</script>',
        text, re.DOTALL,
    ):
        raw = m.group(1)
        try:
            blocks.append(json.loads(raw))
        except json.JSONDecodeError as e:
            blocks.append({"__parse_error__": str(e)})
    return blocks

def get_node(graph, typ):
    if not isinstance(graph, dict):
        return None
    for n in graph.get("@graph", []):
        if n.get("@type") == typ:
            return n
    return None

def get_nodes(graph, typ):
    if not isinstance(graph, dict):
        return []
    return [n for n in graph.get("@graph", []) if n.get("@type") == typ]

def collect_all_ids(graph):
    ids = set()
    if not isinstance(graph, dict):
        return ids
    for n in graph.get("@graph", []):
        if "@id" in n:
            ids.add(n["@id"])
    return ids

def resolve_ref(field_val):
    """Return '@id' if the field is an {@id: X} reference, None otherwise."""
    if isinstance(field_val, dict) and "@id" in field_val and len(field_val) == 1:
        return field_val["@id"]
    return None

def audit_one(slug):
    findings = []
    fp = BLOG / slug / "index.njk"
    text = fp.read_text(encoding="utf-8", errors="replace")
    fm = extract_frontmatter(text)

    # === JSON parsing ===
    blocks = extract_all_jsonld(text)
    for b in blocks:
        if b.get("__parse_error__"):
            findings.append(("CRIT", "1-json", f"JSON parse error: {b['__parse_error__']}"))
    if not blocks:
        findings.append(("CRIT", "1-json", "No JSON-LD block found"))
        return findings

    # Detect duplicate WebSite declarations across multiple script blocks
    website_ids = []
    for b in blocks:
        for w in get_nodes(b, "WebSite"):
            website_ids.append(w.get("@id"))
    if len(website_ids) > 1:
        findings.append(("HIGH", "1-dup-website",
                         f"WebSite declared {len(website_ids)}× across script blocks: {website_ids}"))

    # Focus on the first block for structural checks
    g = blocks[0]
    all_ids = collect_all_ids(g)

    # === 1) Reference integrity ===
    org = get_node(g, "Organization")
    website = get_node(g, "WebSite")
    breadcrumbs = get_node(g, "BreadcrumbList")
    post = get_node(g, "BlogPosting")
    person = get_node(g, "Person")
    faq = get_node(g, "FAQPage")
    howto = get_node(g, "HowTo")

    def check_ref(node, field, node_name):
        val = node.get(field) if isinstance(node, dict) else None
        rid = resolve_ref(val)
        if rid is None and val is not None:
            findings.append(("HIGH", "1-inline-ref",
                             f"{node_name}.{field} is inline object instead of @id ref"))
        elif rid is not None and rid not in all_ids:
            findings.append(("CRIT", "1-dangling",
                             f"{node_name}.{field} @id='{rid}' not in @graph"))

    if post:
        check_ref(post, "author", "BlogPosting")
        check_ref(post, "publisher", "BlogPosting")
    if person:
        check_ref(person, "worksFor", "Person")
    if website:
        check_ref(website, "publisher", "WebSite")

    # === 2) Wrong field values ===
    # 2a) Organization.url should NOT look like an author page
    if org and isinstance(org.get("url"), str):
        u = org["url"]
        if "/authors/" in u or "/author/" in u:
            findings.append(("HIGH", "2-wrong-value", f"Organization.url looks like author page: {u}"))
        if u not in ("https://www.wowohcool.com/", "https://www.wowohcool.com/about/"):
            findings.append(("MED", "2-wrong-value", f"Organization.url unexpected: {u}"))

    # 2b) Person.url should look like /authors/<slug>/ not /about/
    if person and isinstance(person.get("url"), str):
        u = person["url"]
        if u == "https://www.wowohcool.com/about/" or u.endswith("/about"):
            findings.append(("HIGH", "2-wrong-value", f"Person.url points to /about (should be author page): {u}"))
        elif "/authors/" not in u:
            findings.append(("MED", "2-wrong-value", f"Person.url not under /authors/: {u}"))

    # 2c) Wikidata ID sanity check
    if post:
        about = post.get("about")
        if isinstance(about, dict):
            wid_url = about.get("sameAs", "")
            m = re.search(r'/(Q\d+)$', wid_url or "")
            if m:
                qid = m.group(1)
                if qid in WIKIDATA_BAD:
                    findings.append(("CRIT", "2-wikidata",
                                     f"about.sameAs uses known-bad Wikidata ID {qid} ({WIKIDATA_BAD[qid]})"))
                # cross-check the article slug topic with expected entity
                if qid == "Q4796" and "usb" in slug.lower() and "pd" in slug.lower():
                    findings.append(("CRIT", "2-wikidata",
                                     f"USB PD article using USB-C entity ({qid}) — should be USB Power Delivery Q1332128"))

    # 2d) articleSection matches frontmatter articleSection
    if post and fm.get("articleSection"):
        s_bp = post.get("articleSection")
        s_fm = fm["articleSection"]
        if s_bp and s_bp != s_fm:
            findings.append(("HIGH", "2-copy-paste",
                             f"articleSection mismatch: fm='{s_fm}' vs schema='{s_bp}'"))

    # 2e) headline should NOT carry brand suffix "| WOWOHCOOL"
    if post:
        h = post.get("headline", "")
        if "| WOWOHCOOL" in h or "|WOWOHCOOL" in h:
            findings.append(("MED", "2-brand-suffix",
                             f"BlogPosting.headline has brand suffix: '{h}'"))

    # 2f) postalCode canonical value
    if org:
        addr = org.get("address") or {}
        pc = addr.get("postalCode")
        if pc and pc != "518111":
            findings.append(("HIGH", "2-postcode",
                             f"postalCode='{pc}' (canonical 518111)"))

    # === 4) Numeric consistency ===
    if post:
        wc = post.get("wordCount")
        tr = post.get("timeRequired")
        if isinstance(wc, int) and tr:
            m2 = re.match(r'^PT(\d+)M$', tr)
            if m2:
                mins = int(m2.group(1))
                if mins > 0:
                    wpm = wc / mins
                    if wpm < 180 or wpm > 400:
                        findings.append(("MED", "4-reading-speed",
                                         f"wordCount={wc}, timeRequired={tr} -> {wpm:.0f} wpm (target 200-300)"))

    # HowTo.totalTime semantics — PT<num>M for a real procedure that takes weeks is wrong
    if howto:
        tt = howto.get("totalTime", "")
        # If article is about sourcing/importing/shipping/certification etc., total time in minutes is suspicious
        procurement_kws = ("factory","sourcing","import","shipping","certification","audit","procurement")
        if any(k in slug for k in procurement_kws):
            if re.match(r'^PT\d+M$', tt or ""):
                findings.append(("MED", "4-howto-time",
                                 f"HowTo.totalTime='{tt}' — procurement/sourcing procedures typically take weeks (PW), not minutes"))

    # === 5) Missing fields ===
    if post:
        for req in ("citation", "about", "inLanguage", "articleSection", "thumbnailUrl", "image"):
            if req not in post:
                sev = "MED" if req in ("citation","about") else "LOW"
                findings.append((sev, "5-missing", f"BlogPosting.{req} missing"))
        # citation count and authority
        cit = post.get("citation", [])
        if isinstance(cit, list):
            for c in cit:
                nm = (c.get("name") or "").lower() if isinstance(c, dict) else ""
                url = (c.get("url") or "").lower() if isinstance(c, dict) else ""
                if "wikipedia" in nm or "wikipedia.org" in url:
                    findings.append(("LOW", "5-cit-auth",
                                     f"citation uses Wikipedia (prefer standards/gov/regulator sources)"))
                    break

    if faq and "@id" not in faq:
        findings.append(("LOW", "5-missing", "FAQPage.@id missing"))
    if howto and "@id" not in howto:
        findings.append(("LOW", "5-missing", "HowTo.@id missing"))

    # === 7) Content layer: FAQ text duplication ===
    if faq:
        qs = faq.get("mainEntity", []) or []
        answers = []
        questions = []
        for q in qs:
            if not isinstance(q, dict): continue
            questions.append(q.get("name",""))
            ans = q.get("acceptedAnswer",{}) or {}
            answers.append(ans.get("text","") if isinstance(ans, dict) else "")
        # near-duplicate questions
        seen_norms = {}
        for i, q in enumerate(questions):
            norm = re.sub(r'[^a-z0-9 ]','',q.lower())
            norm = ' '.join(sorted(norm.split()))
            if norm in seen_norms:
                findings.append(("LOW", "7-faq-dup-q",
                                 f"FAQ questions {seen_norms[norm]+1} and {i+1} look near-duplicate"))
            seen_norms[norm] = i
        # answer phrase repetition — same 12-word slice appears in >1 answer
        phrase_hits = defaultdict(list)
        for i, a in enumerate(answers):
            words = re.findall(r'\w+', a.lower())
            for j in range(0, max(0, len(words)-12)):
                phrase = ' '.join(words[j:j+12])
                phrase_hits[phrase].append(i)
        for phrase, hits in phrase_hits.items():
            uniq = sorted(set(hits))
            if len(uniq) >= 3:
                findings.append(("LOW", "7-faq-dup-a",
                                 f"phrase '{phrase[:60]}...' repeats in {len(uniq)} FAQ answers"))
                break  # only report once per article

    return findings

def cross_page_consistency():
    """Detect Organization field drift across articles (Bug type 3)."""
    org_versions = defaultdict(list)  # (frozen_summary) -> [slugs]
    for slug in load_articles():
        fp = BLOG / slug / "index.njk"
        text = fp.read_text(encoding="utf-8", errors="replace")
        blocks = extract_all_jsonld(text)
        if not blocks: continue
        org = get_node(blocks[0], "Organization")
        if not org: continue
        # Canonical signature
        summary = {
            "url": org.get("url"),
            "areaServed_len": len(org.get("areaServed") or []),
            "areaServed_first": (org.get("areaServed") or [""])[0],
            "logo_has_size": "width" in (org.get("logo") or {}) if isinstance(org.get("logo"), dict) else False,
            "contact_email": (org.get("contactPoint") or {}).get("email") if isinstance(org.get("contactPoint"), dict) else None,
            "contact_phone": (org.get("contactPoint") or {}).get("telephone") if isinstance(org.get("contactPoint"), dict) else None,
            "postalCode": (org.get("address") or {}).get("postalCode") if isinstance(org.get("address"), dict) else None,
            "legalName": org.get("legalName"),
        }
        key = json.dumps(summary, sort_keys=True)
        org_versions[key].append(slug)
    return org_versions

def main():
    articles = load_articles()
    all_findings = {}
    sev_rank = {"CRIT":0, "HIGH":1, "MED":2, "LOW":3}
    for slug in articles:
        f = audit_one(slug)
        f.sort(key=lambda x: sev_rank.get(x[0], 9))
        all_findings[slug] = f

    # Header
    print("=" * 110)
    print(f"{'Article':<45} {'CRIT':>5} {'HIGH':>5} {'MED':>5} {'LOW':>5}")
    print("=" * 110)
    for slug, f in all_findings.items():
        counts = {"CRIT":0,"HIGH":0,"MED":0,"LOW":0}
        for sev,_,_ in f:
            counts[sev] += 1
        if sum(counts.values()) > 0:
            print(f"{slug:<45} {counts['CRIT']:>5} {counts['HIGH']:>5} {counts['MED']:>5} {counts['LOW']:>5}")

    # Details
    print("\n== DETAILS ==\n")
    for slug, f in all_findings.items():
        if not f: continue
        print(f"\n### {slug}")
        for sev, cat, msg in f:
            print(f"  [{sev:4}] {cat:15} {msg}")

    # Cross-page consistency
    print("\n== ORGANIZATION FIELD DRIFT (cross-page) ==")
    versions = cross_page_consistency()
    if len(versions) <= 1:
        print("  [OK] All articles share identical Organization signature")
    else:
        print(f"  [DRIFT] {len(versions)} distinct Organization signatures found:")
        for i, (sig, slugs) in enumerate(sorted(versions.items(), key=lambda kv: -len(kv[1]))):
            print(f"\n  Signature #{i+1} — {len(slugs)} articles")
            print(f"    {sig}")
            print(f"    Slugs: {', '.join(slugs[:8])}{' ...' if len(slugs)>8 else ''}")

if __name__ == "__main__":
    main()
