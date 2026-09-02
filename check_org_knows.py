import os, re, json, glob

src_root = r"C:\Users\wowoh\wowohcool.com\src"

# Unified Organization knowsAbout array for non-blog pages
# Source: b2b-multilingual-metadata-standard.md §3.1
ORG_KNOWS_ABOUT = [
    "OEM/ODM Power Bank Manufacturing",
    "Qi2 Wireless Charging Standard",
    "GaN Power Architecture",
    "Automotive Fast Charging Systems",
    "Custom Power Adapter Production",
    "Consumer Electronics Sourcing",
    "UL & CE Safety Compliance"
]

# Standard Organization field values (b2b-schema-template.json, site-wide hardcoded)
ORG_AREA_SERVED = ["US", "DE", "AT", "CH", "UK", "FR", "ES", "PL", "EU", "JP", "KR", "AU",
                   "MX", "CO", "AR", "CL", "PE", "RU", "KZ", "BY", "EAEU"]
ORG_LANGS = ["English", "German", "Spanish", "French", "Russian", "Polish"]


def check_org_fields(obj, f, errors):
    """areaServed / availableLanguage / contactType content checks (all pages)."""
    if "areaServed" in obj and obj["areaServed"] != ORG_AREA_SERVED:
        errors.append((f, f"{obj.get('@type')} areaServed != 21 standard values: {obj['areaServed']}"))
    cp = obj.get("contactPoint", {})
    if isinstance(cp, dict):
        if "availableLanguage" in cp and cp["availableLanguage"] != ORG_LANGS:
            errors.append((f, f"{obj.get('@type')} availableLanguage != 6 standard: {cp['availableLanguage']}"))
        if "contactType" in cp and cp["contactType"] != "OEM/ODM Sales":
            errors.append((f, f"{obj.get('@type')} contactType != standard: {cp['contactType']}"))


# Wikidata entity map — context/wikidata-entity-map.md is the single source of truth.
# Known-BAD IDs must never appear in about.sameAs. Parse the table dynamically so any
# new blacklist ID added there is picked up here automatically (no dual-source drift).
def _load_wikidata_blacklist():
    p = os.path.join(os.path.dirname(os.path.abspath(__file__)), "context", "wikidata-entity-map.md")
    blacklist = set()
    in_black = False
    with open(p, encoding="utf-8") as fp:
        for line in fp:
            if line.startswith("## "):
                in_black = ("黑名单" in line) or ("blacklist" in line.lower())
                continue
            if in_black:
                blacklist.update(re.findall(r"`(Q\d+)`", line))
    return blacklist

KNOWN_BAD_WIKIDATA = _load_wikidata_blacklist()

# Non-blog page directories: products, service, about, case-studies, contact, etc.
# Excludes /blog/, /de/blog/, /es/blog/, /fr/blog/, /ru/blog/, /pl/blog/
NON_BLOG_DIRS = ["products", "service", "about", "case-studies", "contact"]

# Find all non-blog index.njk files across all language roots
all_index_files = []
for root, dirs, files in os.walk(src_root):
    # Skip blog directories
    if "blog" in root.replace("\\", "/").split("/"):
        continue
    # Also skip /authors/ directories
    if "\\authors" in root or "/authors" in root:
        continue
    for f in files:
        if f == "index.njk":
            rel = os.path.relpath(root, src_root)
            # Check if this is a non-blog top-level section
            top_dir = rel.split("\\")[0].split("/")[0] if rel != "." else ""
            if top_dir in NON_BLOG_DIRS or rel == "index.njk":
                all_index_files.append(os.path.join(root, f))
            # Language-specific non-blog pages: de/products/, es/service/, etc.
            parts = rel.replace("\\", "/").split("/")
            if len(parts) >= 2 and parts[0] in ["de", "es", "fr", "ru", "pl"] and parts[1] in NON_BLOG_DIRS:
                all_index_files.append(os.path.join(root, f))
            elif len(parts) >= 2 and parts[0] in ["de", "es", "fr", "ru", "pl"] and parts[1] == "index.njk":
                # This can't happen since we're iterating files, not dirs
                pass

# Also find language-specific top-level pages (about, contact) under /de/, /es/, etc.
# Already covered by the loop above

# Deduplicate
all_index_files = list(set(all_index_files))

# Also check non-blog pages nested deeper (e.g., /products/power-bank/index.njk)
nested_non_blog = []
for lang in ["de", "es", "fr", "ru", "pl"]:
    for section in NON_BLOG_DIRS:
        base = os.path.join(src_root, lang, section)
        if os.path.exists(base):
            # Get nested index.njk files
            for root, dirs, files in os.walk(base):
                for f in files:
                    if f == "index.njk":
                        nested_non_blog.append(os.path.join(root, f))

all_index_files.extend(nested_non_blog)
all_index_files = list(set(all_index_files))

print(f"Checking {len(all_index_files)} non-blog page files for Organization knowsAbout...")
errors = []
org_nodes_found = 0
org_nodes_with_knowsabout = 0

for f in sorted(all_index_files):
    try:
        with open(f, encoding="utf-8") as fp:
            content = fp.read()
    except Exception as e:
        errors.append((f, f"read error: {e}"))
        continue

    # find JSON-LD blocks
    jsonld_blocks = re.findall(
        r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>',
        content, re.DOTALL | re.IGNORECASE
    )

    for block in jsonld_blocks:
        # replace Nunjucks placeholders with dummy values
        sim = re.sub(r'\{\{.*?\}\}', '0', block)
        sim = re.sub(r'\{%.*?%\}', '', sim)  # remove tags
        try:
            data = json.loads(sim)
        except Exception:
            continue

        # data could be dict with @graph or list
        if isinstance(data, dict) and "@graph" in data:
            graph = data["@graph"]
        elif isinstance(data, list):
            graph = data
        else:
            graph = []

        for obj in graph:
            if isinstance(obj, dict):
                obj_type = obj.get("@type")
                # Organization and ManufacturingBusiness both use knowsAbout
                if obj_type in ("Organization", "ManufacturingBusiness"):
                    org_nodes_found += 1
                    org_id = obj.get("@id")
                    knows = obj.get("knowsAbout", [])
                    if knows:
                        org_nodes_with_knowsabout += 1
                        if knows != ORG_KNOWS_ABOUT:
                            rel = os.path.relpath(f, src_root)
                            errors.append((f, f"Organization {org_id} knowsAbout mismatch: got {knows}, expected {ORG_KNOWS_ABOUT}"))
                # BlogPosting.about.sameAs Wikidata validation (known-bad IDs)
                check_org_fields(obj, f, errors)
                if obj_type == "BlogPosting":
                    about = obj.get("about", {})
                    same = about.get("sameAs", "") if isinstance(about, dict) else ""
                    wid = None
                    m2 = re.search(r'(Q\d+)', same)
                    if m2:
                        wid = m2.group(1)
                        if wid in KNOWN_BAD_WIKIDATA:
                            rel = os.path.relpath(f, src_root)
                            errors.append((f, f"BlogPosting.about.sameAs uses KNOWN-BAD Wikidata ID {wid} (name={about.get('name')!r}) — see context/wikidata-entity-map.md"))

print(f"Found {org_nodes_found} Organization nodes in non-blog pages")
print(f"Found {org_nodes_with_knowsabout} Organization nodes with knowsAbout field")

# ---- Blog-article Organization nodes + Wikidata about.sameAs sweep ----
blog_files = [
    f for f in glob.glob(os.path.join(src_root, "**", "blog", "**", "index.njk"), recursive=True)
    if "/authors/" not in f.replace(os.sep, "/")
    and os.path.basename(os.path.dirname(f)) != "blog"
]
print(f"\nChecking {len(blog_files)} blog article files (Organization knowsAbout + Wikidata about.sameAs + single-HowTo)...")
blog_bad_org = 0
blog_bad_wiki = 0
blog_bad_howto = 0

for f in sorted(blog_files):
    try:
        content = open(f, encoding="utf-8").read()
    except Exception as e:
        errors.append((f, f"read error: {e}"))
        continue
    blocks = re.findall(r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>',
                        content, re.DOTALL | re.IGNORECASE)
    howto_ids = []
    for block in blocks:
        sim = re.sub(r'\{\{.*?\}\}', '0', block)
        sim = re.sub(r'\{%.*?%\}', '', sim)
        try:
            data = json.loads(sim)
        except Exception:
            continue
        graph = data.get("@graph", []) if isinstance(data, dict) else (data if isinstance(data, list) else [])
        for obj in graph:
            if not isinstance(obj, dict):
                continue
            t = obj.get("@type")
            if t == "Organization" and obj.get("knowsAbout", []) != ORG_KNOWS_ABOUT:
                rel = os.path.relpath(f, src_root)
                errors.append((f, f"blog Organization knowsAbout drift: got {obj.get('knowsAbout')}"))
                blog_bad_org += 1
            if t in ("Organization", "ManufacturingBusiness"):
                check_org_fields(obj, f, errors)
            if t == "BlogPosting":
                about = obj.get("about", {})
                same = about.get("sameAs", "") if isinstance(about, dict) else ""
                m2 = re.search(r'(Q\d+)', same)
                if m2 and m2.group(1) in KNOWN_BAD_WIKIDATA:
                    rel = os.path.relpath(f, src_root)
                    errors.append((f, f"blog about.sameAs KNOWN-BAD Wikidata ID {m2.group(1)} (name={about.get('name')!r})"))
                    blog_bad_wiki += 1
            if t == "HowTo":
                howto_ids.append(obj.get("@id", ""))
    # Single-HowTo rule: multiple HowTo nodes sharing the same @id is a structural error
    if len(howto_ids) != len(set(howto_ids)):
        rel = os.path.relpath(f, src_root)
        errors.append((f, f"duplicate HowTo @id (multiple HowTo nodes share same anchor): {sorted(set(howto_ids))}"))
        blog_bad_howto += 1

print(f"blog Organization drift: {blog_bad_org}, blog bad Wikidata: {blog_bad_wiki}, blog duplicate-HowTo-@id: {blog_bad_howto}")

if errors:
    print("Errors found:")
    for f, err in errors:
        print(f"  {f}: {err}")
else:
    print(f"All Organization nodes in non-blog pages have exactly the {len(ORG_KNOWS_ABOUT)} knowsAbout values.")
