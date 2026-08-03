"""
Multi-language Blog Structure Audit (EN / DE / ES).

Adapted from audit_en_blog.py but parameterized by language.
Checks 20+ structural rules against:
  - context/blog-template-standard.md (v2.1)
  - context/b2b-multilingual-metadata-standard.md (v2.0)

Usage:
  python audit_blog_structure.py           # audit all 3 languages
  python audit_blog_structure.py --lang de # audit only DE
"""
import re
import json
import argparse
from pathlib import Path

# =============================================================================
# Language configuration
# =============================================================================
LANG_CONFIG = {
    "en": {
        "blog_dir": Path(r"C:\Users\wowoh\wowohcool.com\src\blog"),
        "in_language": "en-US",
        "canonical_prefix": "/blog/",
        "cover_image_dir": "cover-en",
        "b2b_signals": [
            "OEM", "ODM", "manufacturer", "manufacturing", "factory", "factories",
            "supplier", "suppliers", "importer", "importers", "sourcing", "MOQ",
            "FOB", "B2B", "procurement", "wholesale", "supply chain",
            "certification", "compliance", "audit", "customs", "bulk",
        ],
        "quick_answer_markers": ["Quick Answer"],
        "boundary_labels": ['Related Articles', 'Sources &amp;',
                            'id="related-articles"', 'id="author-bio"'],
        "expected_org_url": ("https://www.wowohcool.com/about/",
                             "https://www.wowohcool.com/"),
    },
    "de": {
        "blog_dir": Path(r"C:\Users\wowoh\wowohcool.com\src\de\blog"),
        "in_language": "de-DE",
        "canonical_prefix": "/de/blog/",
        "cover_image_dir": "cover-de",
        "b2b_signals": [
            "OEM", "ODM", "Hersteller", "Fabrik", "Fabriken",
            "Lieferant", "Lieferanten", "Importeur", "Importeure",
            "Einkäufer", "Einkauf",
            "Werksaudit", "Werksprüfung", "Zertifikat", "Zertifizierung",
            "Beschaffung", "Großhandel", "Handelspartner",
            "MOQ", "FOB", "B2B", "Lieferkette", "Zoll", "Compliance",
        ],
        "quick_answer_markers": ["SCHNELLANTWORT", "Schnellantwort"],
        "boundary_labels": ['Ähnliche Artikel', 'Verwandte Artikel',
                            'Quellen', 'id="related-articles"', 'id="author-bio"'],
        "expected_org_url": ("https://www.wowohcool.com/de/about/",
                             "https://www.wowohcool.com/de/",
                             "https://www.wowohcool.com/about/",
                             "https://www.wowohcool.com/"),
    },
    "es": {
        "blog_dir": Path(r"C:\Users\wowoh\wowohcool.com\src\es\blog"),
        "in_language": "es-ES",
        "canonical_prefix": "/es/blog/",
        "cover_image_dir": "cover-es",
        "b2b_signals": [
            "OEM", "ODM", "fabricante", "fabricantes", "fábrica", "fábricas",
            "proveedor", "proveedores", "importador", "importadores",
            "auditoría", "certificación", "certificado", "abastecimiento",
            "mayorista", "compra", "compras", "cadena de suministro",
            "MOQ", "FOB", "B2B", "aduana", "cumplimiento",
        ],
        "quick_answer_markers": ["RESPUESTA RÁPIDA", "Respuesta rápida"],
        "boundary_labels": ['Artículos relacionados', 'Fuentes',
                            'id="related-articles"', 'id="author-bio"'],
        "expected_org_url": ("https://www.wowohcool.com/es/about/",
                             "https://www.wowohcool.com/es/",
                             "https://www.wowohcool.com/about/",
                             "https://www.wowohcool.com/"),
    },
}


def find_articles(blog_dir):
    return sorted(
        d.name for d in blog_dir.iterdir()
        if d.is_dir() and (d / "index.njk").exists()
    )


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
    m = re.search(
        r'<script\s+type="application/ld\+json">\s*(\{.*?\})\s*</script>',
        text, re.DOTALL,
    )
    if not m:
        return None, "No JSON-LD block found"
    try:
        return json.loads(m.group(1)), None
    except json.JSONDecodeError as e:
        return None, f"JSON-LD parse error: {e}"


def find_nodes(graph, typ):
    if not graph:
        return []
    return [n for n in graph.get("@graph", []) if n.get("@type") == typ]


def contains_b2b_word(s, signals):
    if not s:
        return []
    low = s.lower()
    return [w for w in signals if w.lower() in low]


def audit_article(slug, cfg):
    findings = []
    fp = cfg["blog_dir"] / slug / "index.njk"
    text = fp.read_text(encoding="utf-8", errors="replace")
    fm = extract_frontmatter(text)

    # === Front matter checks ===
    canonical = fm.get("canonical", "")
    expected_canonical = f"{cfg['canonical_prefix']}{slug}/"
    if canonical != expected_canonical:
        findings.append(("HIGH", "frontmatter",
                         f"canonical='{canonical}' expected '{expected_canonical}'"))
    if not fm.get("modified"):
        findings.append(("HIGH", "frontmatter", "modified date missing"))
    if not fm.get("ogImage"):
        findings.append(("HIGH", "frontmatter", "ogImage missing"))
    desc = fm.get("description", "").strip('"')
    if not desc:
        findings.append(("HIGH", "frontmatter", "description missing"))
    else:
        L = len(desc)
        if L < 140 or L > 170:
            findings.append(("MED", "frontmatter",
                             f"description length={L} (target 150-160)"))

    # === JSON-LD ===
    data, err = extract_json_ld(text)
    if err:
        findings.append(("CRIT", "schema", err))
    else:
        # Organization
        orgs = find_nodes(data, "Organization")
        if not orgs:
            findings.append(("CRIT", "schema", "Organization node missing"))
        else:
            org = orgs[0]
            for req in ("legalName", "url", "publishingPrinciples", "logo",
                        "sameAs", "contactPoint", "address"):
                if req not in org:
                    findings.append(("HIGH", "schema-org",
                                     f"Organization.{req} missing"))
            if org.get("url") not in cfg["expected_org_url"]:
                findings.append(("MED", "schema-org",
                                 f"Organization.url='{org.get('url')}' unexpected"))

        # WebSite
        sites = find_nodes(data, "WebSite")
        if not sites:
            findings.append(("HIGH", "schema", "WebSite node missing"))
        else:
            site = sites[0]
            if site.get("inLanguage") != cfg["in_language"]:
                findings.append(("MED", "schema-website",
                                 f"inLanguage='{site.get('inLanguage')}' expected '{cfg['in_language']}'"))

        # BreadcrumbList
        if not find_nodes(data, "BreadcrumbList"):
            findings.append(("HIGH", "schema", "BreadcrumbList missing"))

        # BlogPosting
        posts = find_nodes(data, "BlogPosting")
        if not posts:
            findings.append(("CRIT", "schema", "BlogPosting node missing"))
        else:
            post = posts[0]
            wc = post.get("wordCount")
            if wc is None:
                findings.append(("HIGH", "schema-bp", "wordCount missing"))
            elif not isinstance(wc, int):
                findings.append(("HIGH", "schema-bp",
                                 f"wordCount is {type(wc).__name__}, must be int (got {wc!r})"))
            elif wc < 100:
                findings.append(("HIGH", "schema-bp",
                                 f"wordCount={wc} suspiciously low"))
            if not post.get("dateModified"):
                findings.append(("HIGH", "schema-bp", "dateModified missing"))
            if post.get("inLanguage") != cfg["in_language"]:
                findings.append(("MED", "schema-bp",
                                 f"inLanguage='{post.get('inLanguage')}' expected '{cfg['in_language']}'"))
            sp = post.get("speakable", {})
            cssSel = sp.get("cssSelector") if isinstance(sp, dict) else None
            if not cssSel:
                findings.append(("MED", "schema-bp",
                                 "speakable.cssSelector missing"))
            else:
                if set(cssSel) not in [{"h1", ".speakable"}, {"h1", "h2", ".speakable"}]:
                    findings.append(("LOW", "schema-bp",
                                     f"speakable.cssSelector={cssSel} (expected ['h1','.speakable'])"))
            about = post.get("about")
            if not about:
                findings.append(("LOW", "schema-bp",
                                 "about (Wikidata entity) missing"))
            elif isinstance(about, dict) and "wikidata" not in (about.get("sameAs") or "").lower():
                findings.append(("LOW", "schema-bp",
                                 "about.sameAs not pointing to Wikidata"))
            cit = post.get("citation")
            if not cit or (isinstance(cit, list) and len(cit) < 3):
                findings.append(("LOW", "schema-bp",
                                 f"citation array missing or <3 items"))
            if not post.get("image"):
                findings.append(("MED", "schema-bp", "image missing"))

        # Person
        persons = find_nodes(data, "Person")
        if not persons:
            findings.append(("HIGH", "schema", "Person (Author) node missing"))
        else:
            p = persons[0]
            for req in ("name", "jobTitle", "url", "sameAs", "image",
                        "worksFor", "knowsAbout"):
                if req not in p:
                    findings.append(("MED", "schema-person",
                                     f"Person.{req} missing"))
            sa = p.get("sameAs") or []
            if isinstance(sa, str):
                sa = [sa]
            if not any("linkedin.com" in x.lower() for x in sa):
                findings.append(("MED", "schema-person",
                                 "Person.sameAs no LinkedIn"))

        # FAQPage
        faqs = find_nodes(data, "FAQPage")
        if not faqs:
            findings.append(("HIGH", "schema", "FAQPage node missing"))
        else:
            faq = faqs[0]
            questions = faq.get("mainEntity", [])
            if len(questions) < 5:
                findings.append(("MED", "schema-faq",
                                 f"FAQ questions={len(questions)} (target 5-8)"))
            if len(questions) > 8:
                findings.append(("LOW", "schema-faq",
                                 f"FAQ questions={len(questions)} (>8, may dilute)"))

    # === Body/HTML structural checks ===
    body = text
    # Featured image srcset triple
    if not re.search(r'srcset\s*=\s*"[^"]*800w[^"]*1200w[^"]*2240w', body):
        findings.append(("MED", "image",
                         "Featured image srcset missing 800w/1200w/2240w triple"))
    if 'fetchpriority="high"' not in body:
        findings.append(("LOW", "image",
                         'fetchpriority="high" not found on any image'))
    if ('data-speakable' not in body and 'class="speakable"' not in body
            and 'speakable' not in body.lower()):
        findings.append(("LOW", "structure",
                         "no speakable marker in body HTML"))
    if 'href="#faq"' not in body:
        findings.append(("MED", "structure",
                         "TOC missing #faq anchor link"))
    # H1 checks
    h1s = re.findall(r'<h1[^>]*>(.*?)</h1>', body, re.DOTALL | re.IGNORECASE)
    if len(h1s) == 0:
        findings.append(("CRIT", "structure", "no <h1> found"))
    elif len(h1s) > 1:
        findings.append(("MED", "structure",
                         f"{len(h1s)} <h1> found (expect 1)"))
    else:
        h1_text = re.sub(r'<[^>]+>', '', h1s[0]).strip()
        h1_len = len(h1_text)
        if h1_len < 45 or h1_len > 75:
            findings.append(("LOW", "seo",
                             f"H1 length={h1_len} (target 50-65)"))
        if not contains_b2b_word(h1_text, cfg["b2b_signals"]):
            findings.append(("HIGH", "seo",
                             f"H1 no B2B signal word: '{h1_text[:80]}'"))
    # H2 B2B signal count
    h2s = re.findall(r'<h2[^>]*>(.*?)</h2>', body, re.DOTALL | re.IGNORECASE)
    h2_texts = [re.sub(r'<[^>]+>', '', h).strip() for h in h2s]
    b2b_h2_count = sum(1 for h in h2_texts
                       if contains_b2b_word(h, cfg["b2b_signals"]))
    if b2b_h2_count < 2:
        findings.append(("MED", "seo",
                         f"only {b2b_h2_count} H2 with B2B signal (target ≥2)"))
    # Anchors
    if 'id="faq"' not in body:
        findings.append(("HIGH", "structure", 'FAQ section id="faq" missing'))
    if 'id="author-bio"' not in body:
        findings.append(("HIGH", "structure",
                         'Author bio id="author-bio" missing'))
    if 'id="related-articles"' not in body:
        findings.append(("MED", "structure",
                         'Related articles id="related-articles" missing'))
    # Factory Footprint
    if 'Factory Footprint' not in body and 'Werksdaten' not in body and 'Datos de fábrica' not in body:
        findings.append(("MED", "structure",
                         'Factory Footprint / Werksdaten / Datos de fábrica block missing'))
    # Related articles i18n
    other_langs = [f'/{x}/' for x in ('en', 'de', 'es', 'fr', 'ru')
                   if not cfg['canonical_prefix'].startswith(f'/{x}')]
    # For EN (canonical_prefix=/blog/) exclude any /en/ prefix (not used)
    if cfg['canonical_prefix'] == '/blog/':
        other_langs = ['/de/', '/es/', '/fr/', '/ru/']
    aside_m = re.search(
        r'<aside[^>]*id="related-articles"[^>]*>(.*?)</aside>',
        body, re.DOTALL,
    )
    if aside_m:
        related_hrefs = re.findall(r'<a\s+href="(/[^"]+)"', aside_m.group(1))
        wrong = [h for h in related_hrefs
                 if any(h.startswith(p) for p in other_langs)]
        if wrong:
            findings.append(("HIGH", "i18n",
                             f"Related links point to non-{cfg['canonical_prefix'].strip('/')} prefix: {wrong[:3]}"))

    # Quick Answer / SCHNELLANTWORT / RESPUESTA RÁPIDA
    for marker in cfg["quick_answer_markers"]:
        if marker in body:
            findings.append(("LOW", "structure",
                             f"{marker} block should be removed (v2.0)"))
            break

    # CTA presence
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
        window = body[cta_open.end(): cta_open.end() + 3000]
        for boundary in cfg["boundary_labels"]:
            b = window.find(boundary)
            if 0 <= b < len(window):
                window = window[:b]
        btn_texts = re.findall(
            r'<(?:a|button)\s[^>]+>([^<]+)</(?:a|button)>', window,
        )
        joined = ' '.join(btn_texts).lower()
        # B2B intent words per language (union to keep script simple)
        b2b_intent = [
            'quote', 'sample', 'pricing', 'oem', 'consultation', 'factory',
            'wholesale', 'moq', 'catalog', 'contact',
            'angebot', 'muster', 'kontakt', 'preis', 'katalog', 'anfrage',
            'presupuesto', 'muestra', 'contacto', 'catálogo', 'contactar', 'solicitar',
        ]
        if btn_texts and not any(w in joined for w in b2b_intent):
            findings.append(("LOW", "cta",
                             f"CTA button lacks B2B intent word: {btn_texts}"))
    else:
        findings.append(("LOW", "cta", "gradient CTA section missing"))

    return findings


def audit_lang(lang):
    cfg = LANG_CONFIG[lang]
    articles = find_articles(cfg["blog_dir"])
    print(f"\n{'='*100}")
    print(f"  {lang.upper()} SITE — {len(articles)} articles")
    print(f"{'='*100}")

    sev_order = {"CRIT": 0, "HIGH": 1, "MED": 2, "LOW": 3}
    all_findings = {}
    for slug in articles:
        f = audit_article(slug, cfg)
        f.sort(key=lambda x: sev_order.get(x[0], 9))
        all_findings[slug] = f

    print(f"{'Article':<50} {'CRIT':>5} {'HIGH':>5} {'MED':>5} {'LOW':>5}")
    print("-" * 100)
    totals = {"CRIT": 0, "HIGH": 0, "MED": 0, "LOW": 0}
    for slug, findings in all_findings.items():
        counts = {"CRIT": 0, "HIGH": 0, "MED": 0, "LOW": 0}
        for sev, _, _ in findings:
            counts[sev] += 1
            totals[sev] += 1
        if sum(counts.values()) > 0:
            print(f"{slug:<50} {counts['CRIT']:>5} {counts['HIGH']:>5} {counts['MED']:>5} {counts['LOW']:>5}")

    print("-" * 100)
    print(f"{'TOTAL':<50} {totals['CRIT']:>5} {totals['HIGH']:>5} {totals['MED']:>5} {totals['LOW']:>5}")

    if any(totals.values()):
        print("\n-- Detailed findings --")
        for slug, findings in all_findings.items():
            if not findings:
                continue
            print(f"\n### {slug}")
            for sev, cat, msg in findings:
                print(f"  [{sev:4}] {cat:15} {msg}")

    return totals


def main():
    import sys, io
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    ap = argparse.ArgumentParser()
    ap.add_argument("--lang", choices=["en", "de", "es", "all"], default="all")
    args = ap.parse_args()
    langs = ["en", "de", "es"] if args.lang == "all" else [args.lang]
    grand_total = {"CRIT": 0, "HIGH": 0, "MED": 0, "LOW": 0}
    for lang in langs:
        totals = audit_lang(lang)
        for k, v in totals.items():
            grand_total[k] += v
    if len(langs) > 1:
        print(f"\n{'='*100}")
        print(f"  GRAND TOTAL (all sites)")
        print(f"{'='*100}")
        print(f"  CRIT={grand_total['CRIT']}  HIGH={grand_total['HIGH']}  MED={grand_total['MED']}  LOW={grand_total['LOW']}")


if __name__ == "__main__":
    main()
