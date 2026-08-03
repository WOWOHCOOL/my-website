"""
EN Blog Audit — checks 29 articles against:
  - context/blog-template-standard.md (v2.1)
  - context/b2b-multilingual-metadata-standard.md (v2.0)

Outputs a per-article findings table with severity levels.
"""
import re
import json
import os
from pathlib import Path

BLOG_DIR = Path(r"C:\Users\wowoh\wowohcool.com\src\blog")
B2B_SIGNALS = [
    "OEM", "ODM", "manufacturer", "manufacturing", "factory", "factories",
    "supplier", "suppliers", "importer", "importers", "sourcing", "MOQ",
    "FOB", "B2B", "procurement", "wholesale", "supply chain",
    "certification", "compliance", "audit", "customs", "bulk",
]

def find_articles():
    articles = []
    for d in sorted(BLOG_DIR.iterdir()):
        if d.is_dir() and (d / "index.njk").exists():
            articles.append(d.name)
    return articles

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

def extract_json_ld(text):
    """Extract first JSON-LD block."""
    m = re.search(
        r'<script\s+type="application/ld\+json">\s*(\{.*?\})\s*</script>',
        text, re.DOTALL,
    )
    if not m:
        return None, "No JSON-LD block found"
    raw = m.group(1)
    try:
        return json.loads(raw), None
    except json.JSONDecodeError as e:
        return None, f"JSON-LD parse error: {e}"

def find_nodes(graph, typ):
    if not graph:
        return []
    nodes = graph.get("@graph", [])
    return [n for n in nodes if n.get("@type") == typ]

def contains_b2b_word(s):
    if not s:
        return []
    low = s.lower()
    hits = []
    for w in B2B_SIGNALS:
        if w.lower() in low:
            hits.append(w)
    return hits

def audit_article(slug):
    findings = []
    path = BLOG_DIR / slug / "index.njk"
    text = path.read_text(encoding="utf-8", errors="replace")

    fm = extract_frontmatter(text)

    # === Front matter checks ===
    canonical = fm.get("canonical", "")
    expected_canonical = f"/blog/{slug}/"
    if canonical != expected_canonical:
        findings.append(("HIGH", "frontmatter", f"canonical='{canonical}' expected '{expected_canonical}'"))
    if not fm.get("modified"):
        findings.append(("HIGH", "frontmatter", "modified date missing"))
    if not fm.get("ogImage"):
        findings.append(("HIGH", "frontmatter", "ogImage missing"))
    # description length 150-160
    desc = fm.get("description", "").strip('"')
    if not desc:
        findings.append(("HIGH", "frontmatter", "description missing"))
    else:
        L = len(desc)
        if L < 140 or L > 170:
            findings.append(("MED", "frontmatter", f"description length={L} (target 150-160)"))
    # title length: <title> tag length; guideline ~50-65 for H1, title can be longer
    title = fm.get("title", "").strip('"')

    # === JSON-LD parse ===
    data, err = extract_json_ld(text)
    if err:
        findings.append(("CRIT", "schema", err))
    else:
        # Organization node
        orgs = find_nodes(data, "Organization")
        if not orgs:
            findings.append(("CRIT", "schema", "Organization node missing"))
        else:
            org = orgs[0]
            for req in ("legalName", "url", "publishingPrinciples", "logo",
                        "sameAs", "contactPoint", "address"):
                if req not in org:
                    findings.append(("HIGH", "schema-org", f"Organization.{req} missing"))
            # url must match EN mapping
            if org.get("url") not in (
                "https://www.wowohcool.com/about/",
                "https://www.wowohcool.com/",
            ):
                findings.append(("MED", "schema-org", f"Organization.url='{org.get('url')}' (EN expects /about/ or root)"))
            if org.get("@id") != "https://www.wowohcool.com/#organization":
                findings.append(("MED", "schema-org", f"Organization.@id='{org.get('@id')}' expected '/#organization'"))

        # WebSite node
        sites = find_nodes(data, "WebSite")
        if not sites:
            findings.append(("HIGH", "schema", "WebSite node missing"))
        else:
            site = sites[0]
            if site.get("inLanguage") != "en-US":
                findings.append(("MED", "schema-website", f"inLanguage='{site.get('inLanguage')}' expected 'en-US'"))

        # BreadcrumbList
        bcs = find_nodes(data, "BreadcrumbList")
        if not bcs:
            findings.append(("HIGH", "schema", "BreadcrumbList missing"))

        # BlogPosting
        posts = find_nodes(data, "BlogPosting")
        if not posts:
            findings.append(("CRIT", "schema", "BlogPosting node missing"))
        else:
            post = posts[0]
            # wordCount must be integer, not string
            wc = post.get("wordCount")
            if wc is None:
                findings.append(("HIGH", "schema-bp", "wordCount missing"))
            elif not isinstance(wc, int):
                findings.append(("HIGH", "schema-bp", f"wordCount is {type(wc).__name__}, must be int (got {wc!r})"))
            elif wc < 100:
                findings.append(("HIGH", "schema-bp", f"wordCount={wc} suspiciously low"))
            # dateModified
            if not post.get("dateModified"):
                findings.append(("HIGH", "schema-bp", "dateModified missing"))
            # inLanguage
            if post.get("inLanguage") != "en-US":
                findings.append(("MED", "schema-bp", f"inLanguage='{post.get('inLanguage')}' expected 'en-US'"))
            # speakable cssSelector
            sp = post.get("speakable", {})
            cssSel = sp.get("cssSelector") if isinstance(sp, dict) else None
            if not cssSel:
                findings.append(("MED", "schema-bp", "speakable.cssSelector missing"))
            else:
                # normalize
                if set(cssSel) not in [set(["h1", ".speakable"]), set(["h1", "h2", ".speakable"])]:
                    findings.append(("LOW", "schema-bp", f"speakable.cssSelector={cssSel} (expected ['h1','.speakable'])"))
            # about.sameAs Wikidata
            about = post.get("about")
            if not about:
                findings.append(("LOW", "schema-bp", "about (Wikidata entity) missing"))
            elif isinstance(about, dict) and "wikidata" not in (about.get("sameAs") or "").lower():
                findings.append(("LOW", "schema-bp", "about.sameAs not pointing to Wikidata"))
            # citation array
            cit = post.get("citation")
            if not cit or (isinstance(cit, list) and len(cit) < 3):
                findings.append(("LOW", "schema-bp", f"citation array missing or <3 items"))
            # image / thumbnailUrl
            if not post.get("image"):
                findings.append(("MED", "schema-bp", "image missing"))

        # Person
        persons = find_nodes(data, "Person")
        if not persons:
            findings.append(("HIGH", "schema", "Person (Author) node missing"))
        else:
            p = persons[0]
            for req in ("name", "jobTitle", "url", "sameAs", "image", "worksFor", "knowsAbout"):
                if req not in p:
                    findings.append(("MED", "schema-person", f"Person.{req} missing"))
            # LinkedIn in sameAs
            sa = p.get("sameAs") or []
            if isinstance(sa, str):
                sa = [sa]
            if not any("linkedin.com" in x.lower() for x in sa):
                findings.append(("MED", "schema-person", "Person.sameAs no LinkedIn"))

        # FAQPage
        faqs = find_nodes(data, "FAQPage")
        if not faqs:
            findings.append(("HIGH", "schema", "FAQPage node missing"))
        else:
            faq = faqs[0]
            questions = faq.get("mainEntity", [])
            if len(questions) < 5:
                findings.append(("MED", "schema-faq", f"FAQ questions={len(questions)} (target 5-8)"))
            if len(questions) > 8:
                findings.append(("LOW", "schema-faq", f"FAQ questions={len(questions)} (>8, may dilute)"))

    # === Body/HTML structural checks ===
    body = text
    # Breadcrumb HTML nav
    if 'aria-label' not in body.lower() and '<nav ' in body.lower():
        pass  # not strict
    # Featured image srcset
    if not re.search(r'srcset\s*=\s*"[^"]*800w[^"]*1200w[^"]*2240w', body):
        findings.append(("MED", "image", "Featured image srcset missing 800w/1200w/2240w triple"))
    # fetchpriority high on featured
    if 'fetchpriority="high"' not in body:
        findings.append(("LOW", "image", 'fetchpriority="high" not found on any image'))
    # Hook data-speakable
    if 'data-speakable' not in body and 'class="speakable"' not in body and 'speakable' not in body.lower():
        findings.append(("LOW", "structure", "no speakable marker in body HTML"))
    # TOC contains #faq anchor
    if 'href="#faq"' not in body:
        findings.append(("MED", "structure", "TOC missing #faq anchor link"))
    # H1 count and B2B signal
    h1s = re.findall(r'<h1[^>]*>(.*?)</h1>', body, re.DOTALL | re.IGNORECASE)
    if len(h1s) == 0:
        findings.append(("CRIT", "structure", "no <h1> found"))
    elif len(h1s) > 1:
        findings.append(("MED", "structure", f"{len(h1s)} <h1> found (expect 1)"))
    else:
        h1_text = re.sub(r'<[^>]+>', '', h1s[0]).strip()
        h1_len = len(h1_text)
        if h1_len < 45 or h1_len > 75:
            findings.append(("LOW", "seo", f"H1 length={h1_len} (target 50-65)"))
        if not contains_b2b_word(h1_text):
            findings.append(("HIGH", "seo", f"H1 no B2B signal word: '{h1_text[:80]}'"))
    # H2 B2B signal count
    h2s = re.findall(r'<h2[^>]*>(.*?)</h2>', body, re.DOTALL | re.IGNORECASE)
    h2_texts = [re.sub(r'<[^>]+>', '', h).strip() for h in h2s]
    b2b_h2_count = sum(1 for h in h2_texts if contains_b2b_word(h))
    if b2b_h2_count < 2:
        findings.append(("MED", "seo", f"only {b2b_h2_count} H2 with B2B signal (target ≥2)"))
    # FAQ section id
    if 'id="faq"' not in body:
        findings.append(("HIGH", "structure", 'FAQ section id="faq" missing'))
    # Author bio id
    if 'id="author-bio"' not in body:
        findings.append(("HIGH", "structure", 'Author bio id="author-bio" missing'))
    # Related articles id
    if 'id="related-articles"' not in body:
        findings.append(("MED", "structure", 'Related articles id="related-articles" missing'))
    # CTA presence — locate the gradient CTA wrapper (section or div) by finding the opening tag,
    # then extract a bounded window of following HTML to search for buttons.
    # Find true CTA: gradient + rounded-3xl + text-center (standard §一.10 CTA class combo)
    cta_open = re.search(
        r'<(section|div)[^>]*bg-gradient-to-br[^>]*from-brandBlue[^>]*rounded-3xl[^>]*text-center[^>]*>',
        body,
    )
    if not cta_open:
        cta_open = re.search(
            r'<(section|div)[^>]*bg-gradient-to-br[^>]*rounded-3xl[^>]*text-center[^>]*>',
            body,
        )
    if cta_open:
        # Take ~3000 chars after the opening tag; CTA blocks are always shorter than this
        window = body[cta_open.end(): cta_open.end() + 3000]
        # Stop at first "Related Articles" / "Sources" if present (they end the CTA scope)
        for boundary in ['Related Articles', 'Sources &amp;', 'id="related-articles"', 'id="author-bio"']:
            b = window.find(boundary)
            if 0 <= b < len(window):
                window = window[:b]
        btn_texts = re.findall(r'<(?:a|button)\s[^>]+>([^<]+)</(?:a|button)>', window)
        joined = ' '.join(btn_texts).lower()
        b2b_intent = ['quote', 'sample', 'pricing', 'oem', 'consultation', 'factory', 'wholesale', 'moq', 'catalog', 'contact']
        if not btn_texts:
            pass  # no buttons found; skip false positive
        elif not any(w in joined for w in b2b_intent):
            findings.append(("LOW", "cta", f'CTA button lacks B2B intent word: {btn_texts}'))
    else:
        findings.append(("LOW", "cta", 'gradient CTA section missing'))
    # Factory Footprint
    if 'Factory Footprint' not in body:
        findings.append(("MED", "structure", 'Factory Footprint block missing'))
    # Related articles cards — check link language prefix
    aside_m = re.search(r'<aside[^>]*id="related-articles"[^>]*>(.*?)</aside>', body, re.DOTALL)
    if aside_m:
        related_hrefs = re.findall(r'<a\s+href="(/[^"]+)"', aside_m.group(1))
        wrong = [h for h in related_hrefs if h.startswith('/de/') or h.startswith('/es/') or h.startswith('/fr/') or h.startswith('/ru/')]
        if wrong:
            findings.append(("HIGH", "i18n", f"Related links point to non-EN prefix: {wrong[:3]}"))

    # SCHNELLANTWORT/Quick Answer must be removed per v2.0
    if 'Quick Answer' in body or 'SCHNELLANTWORT' in body:
        findings.append(("LOW", "structure", "Quick Answer / SCHNELLANTWORT block should be removed (v2.0)"))

    return findings

def main():
    articles = find_articles()
    print(f"Auditing {len(articles)} EN articles\n")
    all_findings = {}
    sev_order = {"CRIT": 0, "HIGH": 1, "MED": 2, "LOW": 3}

    for slug in articles:
        f = audit_article(slug)
        f.sort(key=lambda x: sev_order.get(x[0], 9))
        all_findings[slug] = f

    # Summary table
    print("=" * 100)
    print(f"{'Article':<45} {'CRIT':>5} {'HIGH':>5} {'MED':>5} {'LOW':>5}")
    print("=" * 100)
    for slug, findings in all_findings.items():
        counts = {"CRIT": 0, "HIGH": 0, "MED": 0, "LOW": 0}
        for sev, _, _ in findings:
            counts[sev] += 1
        print(f"{slug:<45} {counts['CRIT']:>5} {counts['HIGH']:>5} {counts['MED']:>5} {counts['LOW']:>5}")
    print("=" * 100)

    # Detail per article
    print("\n\n== DETAILS ==\n")
    for slug, findings in all_findings.items():
        if not findings:
            print(f"\n[OK] {slug}: clean")
            continue
        print(f"\n### {slug}")
        for sev, cat, msg in findings:
            print(f"  [{sev:4}] {cat:15} {msg}")

if __name__ == "__main__":
    main()
