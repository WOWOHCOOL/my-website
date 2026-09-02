#!/usr/bin/env python3
"""
Metadata Site Audit — run the b2b-multilingual-metadata-standard (v2.5) across
ALL blog articles (6 languages). Non-blog pages excluded by design (only
src{,/de,/es,/fr,/ru,/pl}/blog/*/index.njk).

Checks (per metadata standard):
  C1  JSON-LD parses (all ld+json blocks) + no orphaned
      JSON text outside script blocks                          [CRITICAL]
  C2  @graph required nodes present (Org/WebSite/Breadcrumb/
      BlogPosting/Person/FAQPage)                              [CRITICAL if missing]
  C3  Organization required fields + knowsAbout==7 fixed +
      url/publishingPrinciples == language about URL           [CRITICAL]
  C4  BlogPosting required fields; author/publisher as @id refs;
      speakable == ["h1",".speakable"]; no "h2"/data-speakable  [CRITICAL]
  C5  Trailing-slash consistency (canonical, mainEntityOfPage,
      breadcrumb items, @id bases)                             [CRITICAL]
  C6  FAQPage: @id #faq, independent speakable [".faq-answer"],
      mainEntity count (3-5; >5 = CRITICAL, <3 = WARN)          [CRITICAL/WARN]
  C7  HowTo totalTime: P-vs-PT misuse (P#M for reading-like
      durations) + @id #howto                                   [CRITICAL]
  C8  Person: knowsAbout == author fixed pool; jobTitle;
      LinkedIn per author (@id #snowy-may / #nina-nico)         [CRITICAL]
  C9  about.sameAs Wikidata ID ∈ verified set (blacklist =
      CRITICAL; unknown = WARN)                                 [CRITICAL/WARN]
  C10 citation items are CreativeWork objects with url           [CRITICAL]
  C11 FAQ body↔schema question names verbatim (Rule 1)          [CRITICAL]
  C12 hreflang targets point to matching language path          [CRITICAL]
  C13 .speakable / .faq-answer anchors exist in visible HTML    [CRITICAL]
  C14 HowTo.totalTime valid ISO 8601 duration                   [CRITICAL]
  C15 schema dates == frontmatter dates; modified >= published  [CRITICAL]
  C16 @id exact standard values (Org/WebSite/Person, no lang
      prefix); WebSite url/inLanguage per language mapping      [CRITICAL]
  C17 image == thumbnailUrl == frontmatter ogImage              [CRITICAL]
  C18 keywords >= 3                                             [CRITICAL]
  W1  wordCount vs actual visible words (±5%)                  [WARN]
  W2  timeRequired minutes vs visible reading-time number       [WARN]
  W3  citation count vs visible Sources external links          [WARN]
  W4  frontmatter: hreflang 6 keys, canonical trailing slash,
      date/modified present, modified >= published              [WARN]

Output: audits/metadata-site-<date>.json / METADATA-SITE-<date>.md
Usage:  PYTHONUTF8=1 python data_sources/modules/metadata_site_audit.py
"""

import io
import json
import os
import re
import sys
from collections import Counter
from datetime import date

SITE = r"C:\Users\wowoh\wowohcool.com\src"
AUDIT_DIR = r"C:\Users\wowoh\seomachine\audits"

BLOG_DIRS = ["blog", "de/blog", "es/blog", "fr/blog", "ru/blog", "pl/blog"]
LANG_OF_DIR = {"blog": ("EN", "en-US"), "de/blog": ("DE", "de-DE"), "es/blog": ("ES", "es-ES"),
               "fr/blog": ("FR", "fr-FR"), "ru/blog": ("RU", "ru-RU"), "pl/blog": ("PL", "pl-PL")}

ABOUT_URL = {"EN": "https://www.wowohcool.com/about/",
             "DE": "https://www.wowohcool.com/de/ueber-uns/",
             "ES": "https://www.wowohcool.com/es/sobre-nosotros/",
             "FR": "https://www.wowohcool.com/fr/a-propos/",
             "RU": "https://www.wowohcool.com/ru/o-kompanii/",
             "PL": "https://www.wowohcool.com/pl/o-nas/"}

ORG_KNOWS_ABOUT = ["OEM/ODM Power Bank Manufacturing", "Qi2 Wireless Charging Standard",
                   "GaN Power Architecture", "Automotive Fast Charging Systems",
                   "Custom Power Adapter Production", "Consumer Electronics Sourcing",
                   "UL & CE Safety Compliance"]

ORG_AREA_SERVED = ["US", "DE", "AT", "CH", "UK", "FR", "ES", "PL", "EU", "JP", "KR", "AU",
                   "MX", "CO", "AR", "CL", "PE", "RU", "KZ", "BY", "EAEU"]
ORG_LANGS = ["English", "German", "Spanish", "French", "Russian", "Polish"]

SITE_URL_OF_LANG = {"EN": "https://www.wowohcool.com/", "DE": "https://www.wowohcool.com/de/",
                    "ES": "https://www.wowohcool.com/es/", "FR": "https://www.wowohcool.com/fr/",
                    "RU": "https://www.wowohcool.com/ru/", "PL": "https://www.wowohcool.com/pl/"}

AUTHOR_POOL = {
    "snowy-may": {"knowsAbout": ["Qi2 Wireless Charging Standard", "GaN Power Architecture",
                                 "Thermal Management in Power Electronics", "PCBA Efficiency Testing",
                                 "UL 2056 & CE Safety Compliance", "EU Battery Regulation 2023/1542"],
                  "jobTitle": "Marketing Manager & Founder",
                  "linkedin": "https://www.linkedin.com/in/snowy-wireless-charger"},
    "nina-nico": {"knowsAbout": ["B2B Hardware Sourcing", "OEM/ODM Power Bank Manufacturing",
                                 "Supply Chain Quality Assurance", "International Electronics Trade Compliance",
                                 "Custom Power Adapter Production", "Factory Audit Standards"],
                  "jobTitle": "Global Procurement & Sourcing Manager",
                  "linkedin": "https://www.linkedin.com/in/nico-power-bank-chargers"},
}


def load_wikidata_map():
    """Parse wikidata-entity-map.md -> (verified_set, blacklist_set)."""
    p = r"C:\Users\wowoh\seomachine\context\wikidata-entity-map.md"
    txt = io.open(p, encoding="utf-8").read()
    verified, blacklist = set(), set()
    in_black = False
    for line in txt.splitlines():
        if line.startswith("## "):
            in_black = "黑名单" in line or "blacklist" in line.lower()
            continue
        for qid in re.findall(r"`(Q\d+)`", line):
            (blacklist if in_black else verified).add(qid)
    return verified, blacklist


VERIFIED_Q, BLACKLIST_Q = load_wikidata_map()


def nodes_by_type(graph):
    d = {}
    for n in graph if isinstance(graph, list) else [graph]:
        t = n.get("@type")
        d.setdefault(t, []).append(n)
    return d


def first_block_text(html, start_pat, max_len=6000):
    """Best-effort: capture visible external links inside the Sources section."""
    m = re.search(start_pat, html, re.IGNORECASE)
    if not m:
        return None
    seg = html[m.end(): m.end() + max_len]
    seg = seg.split("</section>")[0]
    return seg


def visible_words(html):
    t = re.sub(r"<script[^>]*>.*?</script>|<style[^>]*>.*?</style>|<svg[^>]*>.*?</svg>", " ", html, flags=re.DOTALL)
    t = re.sub(r"<!--.*?-->", " ", t, flags=re.DOTALL)
    t = re.sub(r"<[^>]+>", " ", t)
    t = re.sub(r"\{%.*?%\}|\{\{.*?\}\}", " ", t)
    return len([w for w in t.split() if re.search(r"[A-Za-zÀ-žА-я0-9]", w)])


def audit_file(path, lang_key):
    lang, inlang = LANG_OF_DIR[lang_key]
    issues = []          # (severity, check, message)
    src = io.open(path, encoding="utf-8", errors="replace").read()
    rel = os.path.relpath(path, SITE).replace("\\", "/")

    def add(sev, check, msg):
        issues.append((sev, check, msg))

    # ── frontmatter ──
    fm = {}
    m = re.match(r"^---\s*\n(.*?)\n---\s*\n", src, re.DOTALL)
    fm_hreflang = []  # list of (lang, path)
    if m:
        for line in m.group(1).splitlines():
            mm = re.match(r"^([a-zA-Z_]+):\s*(.*)$", line)
            if mm:
                fm[mm.group(1)] = mm.group(2).strip().strip('"')
        fm_hreflang = re.findall(r"^\s{1,4}([a-z]{2}):\s*\"([^\"]+)\"", m.group(1), re.M)
    canon_fm = fm.get("canonical", "")
    if canon_fm and not canon_fm.endswith("/"):
        add("WARN", "W4", f"frontmatter canonical 无尾斜杠: {canon_fm}")
    missing_hl = [l for l in ["en", "de", "es", "fr", "ru", "pl"] if l not in [k for k, _ in fm_hreflang]]
    if missing_hl:
        add("WARN", "W4", f"hreflang 缺语言: {','.join(missing_hl)}")
    if "date" not in fm:
        add("WARN", "W4", "frontmatter 缺 date")
    if "modified" in fm and "date" in fm:
        if fm["modified"] < fm["date"]:
            add("WARN", "W4", f"dateModified {fm['modified']} < datePublished {fm['date']}")
    if "ogImage" not in fm and "image" not in fm:
        add("WARN", "W4", "frontmatter 缺 ogImage")

    # ── C1 JSON-LD parse ──
    # C1b: orphaned JSON key:value text outside script blocks renders as visible
    # page plaintext (prior-session leak pattern: "image"/"thumbnailUrl" above the
    # script tag). The JSON parse itself cannot see it — check the stripped text.
    stripped_src = re.sub(r'<script[^>]*>.*?</script>', ' ', src, flags=re.DOTALL | re.IGNORECASE)
    stripped_src = re.sub(r'\{%.*?%\}', ' ', stripped_src, flags=re.DOTALL)
    stripped_src = re.sub(r'\{\{.*?\}\}', ' ', stripped_src, flags=re.DOTALL)
    if re.search(r'"\w+"\s*:\s*"(https?://|[^"]{20})"', stripped_src):
        add("CRITICAL", "C1", "游离 JSON 键在 script 块外（页面明文渲染）")
    blocks = re.findall(r'<script type="application/ld\+json">\s*(.*?)\s*</script>', src, re.DOTALL)
    if not blocks:
        add("CRITICAL", "C1", "无 JSON-LD schema")
        return rel, issues
    graphs = []
    for i, b in enumerate(blocks, 1):
        try:
            data = json.loads(b)
            graphs.append(data)
        except json.JSONDecodeError as e:
            add("CRITICAL", "C1", f"JSON-LD block {i} 解析失败: {e}")
    if not graphs:
        return rel, issues

    # flatten @graph
    nodes = []
    for g in graphs:
        if isinstance(g, dict):
            if "@graph" in g:
                nodes.extend(g["@graph"])
            else:
                nodes.append(g)
    T = nodes_by_type(nodes)

    # ── C2 required nodes ──
    for t in ["Organization", "WebSite", "BreadcrumbList", "BlogPosting", "Person", "FAQPage"]:
        if t not in T:
            add("CRITICAL", "C2", f"缺节点 {t}")
    for wsn in T.get("WebSite", []):
        if wsn.get("name") != "WOWOHCOOL":
            add("CRITICAL", "C2", "WebSite.name 非标准值: %s" % wsn.get("name"))

    # ── C3 Organization ──
    orgs = T.get("Organization", [])
    if orgs:
        o = orgs[0]
        for f in ["legalName", "url", "publishingPrinciples", "logo", "contactPoint", "address", "areaServed", "sameAs", "foundingDate", "vatID"]:
            if f not in o:
                add("CRITICAL", "C3", f"Organization 缺 {f}")
        if o.get("url") != ABOUT_URL[lang]:
            add("CRITICAL", "C3", f"Organization.url ≠ {ABOUT_URL[lang]} (got {o.get('url')})")
        if o.get("publishingPrinciples") != ABOUT_URL[lang]:
            add("CRITICAL", "C3", f"publishingPrinciples ≠ {ABOUT_URL[lang]}")
        ka = o.get("knowsAbout", [])
        if ka != ORG_KNOWS_ABOUT:
            add("CRITICAL", "C3", f"Organization knowsAbout ≠ 7 固定值 (got {len(ka)})")
        if o.get("areaServed") != ORG_AREA_SERVED:
            add("CRITICAL", "C3", f"areaServed ≠ 21 项标准值 (got {len(o.get('areaServed', []))} 项)")
        cp = o.get("contactPoint", {})
        if not cp.get("telephone") or not cp.get("email"):
            add("CRITICAL", "C3", "contactPoint 缺 telephone/email")
        if cp.get("contactType") != "OEM/ODM Sales":
            add("CRITICAL", "C3", "contactType 非标准值: %s" % cp.get("contactType"))
        if cp.get("availableLanguage") != ORG_LANGS:
            add("CRITICAL", "C3", "availableLanguage ≠ 6 语言标准值: %s" % cp.get("availableLanguage"))
        if cp.get("telephone") != "+86-18620789739":
            add("CRITICAL", "C3", "telephone 格式非标准: %s" % cp.get("telephone"))
        logo = o.get("logo", {})
        if not isinstance(logo, dict):
            add("CRITICAL", "C3", f"logo 非标准值: %s" % logo)
        else:
            for k in ("width", "height"):
                v = logo.get(k)
                if not isinstance(v, int):
                    add("CRITICAL", "C3", f"logo.{k} 缺失或非数字: %r" % (v,))

    # ── C4 BlogPosting ──
    bps = T.get("BlogPosting", [])
    if bps:
        bp = bps[0]
        for f in ["headline", "description", "datePublished", "dateModified", "wordCount",
                  "author", "publisher", "mainEntityOfPage", "inLanguage", "timeRequired", "image"]:
            if f not in bp:
                add("CRITICAL", "C4", f"BlogPosting 缺 {f}")
        a = bp.get("author")
        if isinstance(a, dict) and set(a.keys()) - {"@id"}:
            add("CRITICAL", "C4", "author 含内联字段（应为纯 @id 引用）")
        sp = bp.get("speakable", {}).get("cssSelector")
        if sp != ["h1", ".speakable"]:
            add("CRITICAL", "C4", f"BlogPosting speakable ≠ ['h1','.speakable'] (got {sp})")
        if bp.get("inLanguage") != inlang:
            add("CRITICAL", "C4", f"inLanguage ≠ {inlang} (got {bp.get('inLanguage')})")
        if "knowsAbout" in bp:
            add("CRITICAL", "C4", "BlogPosting 携带 knowsAbout（应为 Person/Org 专属）")
        if isinstance(bp.get("keywords"), str):
            add("CRITICAL", "C4", "keywords 为字符串（应为数组）")
        # W1 wordCount
        wc = bp.get("wordCount")
        if "wordCount" in bp and not isinstance(wc, int):
            add("CRITICAL", "C4", f"wordCount 非整数（应无引号，直接填数字）: {wc!r}")
        elif isinstance(wc, int):
            actual = visible_words(src)
            if actual and abs(actual - wc) / max(actual, 1) > 0.05:
                add("WARN", "W1", f"wordCount {wc} vs 实际可见词数 {actual} (±5% 外)")
        # W2 timeRequired vs visible reading time
        tr = str(bp.get("timeRequired", ""))
        mm = re.match(r"^PT(\d+)M$", tr)
        if not mm and tr:
            add("CRITICAL", "C7", f"timeRequired 非 PT{chr(123)}M{chr(125)} 格式: {tr}")
        if mm:
            minutes = int(mm.group(1))
            vis = set(int(n) for n in re.findall(r"(\d+)\s*(?:min\s*read|мин\s*чтения|min\s*de\s*lecture|min\s*de\s*lectura|min\s*czytania)", src))
            if vis and minutes not in vis:
                add("WARN", "W2", f"timeRequired {tr} vs 可见阅读时长 {sorted(vis)}")
        # W3 citation count vs sources links
        cites = bp.get("citation", [])
        src_seg = first_block_text(src, r'<h2[^>]*>\s*(?:Sources\s*&amp;\s*References|Sources & References|Fuentes|Quellen|Sources|Источники|Źródła)\s*</h2>')
        if src_seg is not None:
            links = re.findall(r'<li><a href="(https?://[^"]+)"', src_seg)
            if links and len(cites) != len(links):
                add("WARN", "W3", f"citation {len(cites)} ≠ Sources 外链 {len(links)}")
        for c in (bps[0].get("citation") or []):
            if not isinstance(c, dict) or c.get("@type") != "CreativeWork" or not c.get("url"):
                add("CRITICAL", "C10", "citation 元素非 CreativeWork 对象: %s" % str(c)[:60])
                break

        # C5 trailing slash (BlogPosting level)
        meo = bp.get("mainEntityOfPage", {})
        meo_id = meo.get("@id", "") if isinstance(meo, dict) else ""
        if meo_id and not meo_id.endswith("/"):
            add("CRITICAL", "C5", f"mainEntityOfPage.@id 无尾斜杠: {meo_id}")
        if canon_fm and meo_id:
            meo_base = meo_id.split("#")[0]
            abs_canon = "https://www.wowohcool.com" + canon_fm if canon_fm.startswith("/") else canon_fm
            if meo_base != abs_canon:
                add("CRITICAL", "C5", f"mainEntityOfPage.@id ≠ canonical: {meo_base} vs {abs_canon}")

    # ── C5 breadcrumb items ──
    for bl in T.get("BreadcrumbList", []):
        for it in bl.get("itemListElement", []):
            item = it.get("item", "")
            if item.startswith("http") and not item.endswith("/"):
                add("CRITICAL", "C5", f"Breadcrumb item 无尾斜杠: {item}")
        bid = bl.get("@id", "")
        want_bc = "https://www.wowohcool.com" + canon_fm + "#breadcrumb" if canon_fm else ""
        if want_bc and bid != want_bc:
            add("CRITICAL", "C5", "Breadcrumb @id 非文章专属: %s" % (bid or "(missing)"))

    # ── C6 FAQPage ──
    for fq in T.get("FAQPage", []):
        if fq.get("@id") and not fq["@id"].endswith("#faq"):
            add("CRITICAL", "C6", f"FAQPage.@id 非 #faq: {fq.get('@id')}")
        sp = fq.get("speakable", {}).get("cssSelector")
        if sp != [".faq-answer"]:
            add("CRITICAL", "C6", f"FAQPage speakable ≠ ['.faq-answer'] (got {sp})")
        n = len(fq.get("mainEntity", []))
        if n < 3:
            add("WARN", "C6", f"FAQ 仅 {n} 条 (<3)")
        elif n > 5:
            add("CRITICAL", "C6", f"FAQ {n} 条 > 5（Rule 0 硬上限，需精简到 3-5）")

    # ── C7 HowTo ──
    howto_ids = [ht.get("@id", "") for ht in T.get("HowTo", [])]
    if len(howto_ids) != len(set(howto_ids)):
        dup = sorted({i for i in howto_ids if howto_ids.count(i) > 1})
        add("CRITICAL", "C7", f"多个 HowTo 共享同一 @id（违反单 HowTo 规则）: {dup}")
    for ht in T.get("HowTo", []):
        if ht.get("@id") and not ht["@id"].endswith("#howto"):
            add("CRITICAL", "C7", f"HowTo.@id 非 #howto: {ht.get('@id')}")
        tt = str(ht.get("totalTime", ""))
        # NOTE: P#M (months) is legitimate for process-scale HowTos per §3.5.1 B/C
        # tables (P4M/P60D/P8W mandated there). The P-vs-PT minute bug is caught at
        # BlogPosting.timeRequired (C4) and at fill-in time by the §二 table warning.
        steps = ht.get("step", [])
        if steps and len(steps) < 3:
            add("WARN", "C7", f"HowTo 仅 {len(steps)} 步 (<3)")
        for f in ("name", "description"):
            if not ht.get(f):
                add("CRITICAL", "C7", "HowTo 缺 %s" % f)
        for st in steps:
            if "itemListElement" not in st:
                add("CRITICAL", "C7", "HowToStep 裸 text（缺 itemListElement/HowToDirection）")
                break

    # ── C8 Person ──
    for pe in T.get("Person", []):
        pid = pe.get("@id", "")
        slug = "snowy-may" if "snowy-may" in pid else ("nina-nico" if "nina-nico" in pid else None)
        if not slug:
            add("CRITICAL", "C8", f"Person.@id 非已知作者: {pid}")
            continue
        pool = AUTHOR_POOL[slug]
        if pe.get("knowsAbout") != pool["knowsAbout"]:
            add("CRITICAL", "C8", f"{slug} knowsAbout ≠ 固定池")
        if pe.get("jobTitle") != pool["jobTitle"]:
            add("CRITICAL", "C8", f"{slug} jobTitle ≠ 标准值 (got {pe.get('jobTitle')})")
        sa = pe.get("sameAs", [])
        if sa and pool["linkedin"] not in sa:
            add("CRITICAL", "C8", f"{slug} LinkedIn ≠ 标准值")
        if not pe.get("url", "").endswith(f"/authors/{slug}/"):
            add("CRITICAL", "C8", f"{slug} Person.url 非英文作者页: {pe.get('url')}")
        if isinstance(pe.get("image"), str):
            add("CRITICAL", "C8", "%s Person.image 纯字符串（应为 ImageObject）" % slug)

    # ── C9 wikidata about.sameAs ──
    if bps:
        about = bps[0].get("about", {})
        same = about.get("sameAs", "")
        mq = re.search(r"(Q\d+)", str(same))
        if mq:
            qid = mq.group(1)
            if qid in BLACKLIST_Q:
                add("CRITICAL", "C9", f"about.sameAs 用了黑名单 ID {qid}")
            elif qid not in VERIFIED_Q:
                add("WARN", "C9", f"about.sameAs {qid} 不在已验证表（需人工核实并回填）")

    # ── C5 Organization @id / url slash ──
    # ── C16 @id exact values (no language prefixes, sitewide-unique) ──
    if orgs:
        if orgs[0].get("@id") != "https://www.wowohcool.com/#organization":
            add("CRITICAL", "C16", f"Organization.@id 非精确标准值: {orgs[0].get('@id')}")
    for wsn in T.get("WebSite", []):
        if wsn.get("@id") != "https://www.wowohcool.com/#website":
            add("CRITICAL", "C16", f"WebSite.@id 非精确标准值: {wsn.get('@id')}")
        if wsn.get("url") != SITE_URL_OF_LANG.get(lang):
            add("CRITICAL", "C16", f"WebSite.url ≠ {SITE_URL_OF_LANG.get(lang)} (got {wsn.get('url')})")
        if wsn.get("inLanguage") != inlang:
            add("CRITICAL", "C16", f"WebSite.inLanguage ≠ {inlang} (got {wsn.get('inLanguage')})")
    for pe in T.get("Person", []):
        pid = pe.get("@id", "")
        if pid not in ("https://www.wowohcool.com/#snowy-may", "https://www.wowohcool.com/#nina-nico"):
            add("CRITICAL", "C16", f"Person.@id 非精确标准值: {pid}")

    # ── C11 FAQ body↔schema question names verbatim (Rule 1) ──
    sec = re.search(r'<section id="faq".*?</section>', src, re.DOTALL)
    if bps and T.get("FAQPage"):
        h3s = [h.strip() for h in re.findall(r'<h3[^>]*>(.*?)</h3>', sec.group(0), re.DOTALL)] if sec else []
        jq = [q.get("name", "").strip() for q in T["FAQPage"][0].get("mainEntity", [])]
        if not sec:
            add("CRITICAL", "C11", "正文缺 <section id=\"faq\">（Rule 1 无法成立）")
        elif len(h3s) != len(jq):
            add("CRITICAL", "C11", f"FAQ 数量不一致: schema={len(jq)} html={len(h3s)}")
        else:
            for i, (a, b) in enumerate(zip(jq, h3s)):
                if a != b:
                    add("CRITICAL", "C11", f"FAQ Q{i+1} 问题名与正文不一致: schema={a[:50]!r} html={b[:50]!r}")
                    break

    # ── C13 speakable anchors present in visible HTML ──
    if not re.search(r'class="[^"]*\bspeakable\b', stripped_src):
        add("CRITICAL", "C13", "前端缺 .speakable 锚点（Hook/Key Takeaways 未标注）")
    if not re.search(r'class="[^"]*\bfaq-answer\b', stripped_src):
        add("CRITICAL", "C13", "前端缺 .faq-answer 锚点（FAQPage speakable 失效）")

    # ── C14 HowTo.totalTime ISO 8601 validity (§3.5.1) ──
    for ht in T.get("HowTo", []):
        tt = ht.get("totalTime", "")
        if not re.fullmatch(r'P(?=(\d|T))(\d+[YMW D])?(T\d+[HMS])?', str(tt).replace(" ", "")) or str(tt).strip() in ("P", "PT"):
            add("CRITICAL", "C14", f"HowTo.totalTime 非 ISO 8601 duration: {tt!r}")

    # ── C15 schema dates vs frontmatter dates ──
    if bps:
        bp = bps[0]
        dp, dm = str(bp.get("datePublished", "")), str(bp.get("dateModified", ""))
        if fm.get("date") and dp and dp != fm["date"]:
            add("CRITICAL", "C15", f"datePublished {dp} ≠ frontmatter date {fm['date']}")
        if fm.get("modified") and dm and dm != fm["modified"]:
            add("CRITICAL", "C15", f"dateModified {dm} ≠ frontmatter modified {fm['modified']}")
        if dp and dm and dm < dp:
            add("CRITICAL", "C15", f"schema dateModified {dm} < datePublished {dp}")

    # ── C17 image == thumbnailUrl == frontmatter ogImage ──
    if bps:
        bp = bps[0]
        img, thumb = bp.get("image"), bp.get("thumbnailUrl")
        if isinstance(img, str) and isinstance(thumb, str) and img and thumb and img != thumb:
            add("CRITICAL", "C17", f"image ≠ thumbnailUrl: {img} vs {thumb}")
        og = fm.get("ogImage", "")
        if og and isinstance(img, str) and img and not img.endswith(og):
            add("CRITICAL", "C17", f"image ≠ frontmatter ogImage: {img} vs {og}")

    # ── C18 keywords ≥ 3 ──
    if bps:
        kws = bps[0].get("keywords")
        if isinstance(kws, list) and len(kws) < 3:
            add("CRITICAL", "C18", f"keywords 仅 {len(kws)} 条（模板要求 ≥3）")

    # ── C12 hreflang targets point to the matching language path ──
    for hl, path in fm_hreflang:
        want = "/blog/" if hl == "en" else f"/{hl}/blog/"
        if not path.startswith(want):
            add("CRITICAL", "C12", f"hreflang {hl} 目标语言不匹配: {path}")

    if orgs:
        oid = orgs[0].get("@id", "")
        oid_base = oid.split("#")[0] if oid.startswith("http") else ""
        if oid_base and not oid_base.endswith("/"):
            add("CRITICAL", "C5", f"Organization.@id base 无尾斜杠: {oid}")

    return rel, issues


def main():
    today = date.today().isoformat()
    all_issues = []
    files_scanned = 0
    for lang_key in BLOG_DIRS:
        d = os.path.join(SITE, lang_key)
        if not os.path.isdir(d):
            continue
        for root, _dirs, files in os.walk(d):
            for f in files:
                if f == "index.njk":
                    if os.path.samefile(root, d):  # blog root listing page, not an article
                        continue
                    files_scanned += 1
                    rel, issues = audit_file(os.path.join(root, f), lang_key)
                    for sev, check, msg in issues:
                        all_issues.append({"file": rel, "lang": lang_key.split("/")[0].upper() or "EN",
                                           "severity": sev, "check": check, "msg": msg})

    os.makedirs(AUDIT_DIR, exist_ok=True)
    out_json = os.path.join(AUDIT_DIR, f"metadata-site-{today}.json")
    json.dump({"scanned": files_scanned, "issues": all_issues},
              open(out_json, "w", encoding="utf-8"), ensure_ascii=False, indent=2)

    crit = [x for x in all_issues if x["severity"] == "CRITICAL"]
    warn = [x for x in all_issues if x["severity"] == "WARN"]
    out_md = os.path.join(AUDIT_DIR, f"METADATA-SITE-{today}.md")
    with open(out_md, "w", encoding="utf-8") as fh:
        fh.write(f"# 全站 Blog 元数据审计（metadata-standard v2.5）— {today}\n\n")
        fh.write(f"- 扫描：{files_scanned} 篇 blog 文章（6 语言，非 blog 页面排除）\n")
        fh.write(f"- CRITICAL：**{len(crit)}** / WARN：**{len(warn)}**\n\n")
        fh.write("## CRITICAL（按检查类型）\n\n")
        for chk, n in Counter(x["check"] for x in crit).most_common():
            fh.write(f"- `{chk}` × {n}\n")
        fh.write("\n### 明细\n\n")
        for x in sorted(crit, key=lambda v: (v["check"], v["file"])):
            fh.write(f'- `{x["file"]}` [{x["lang"]}] `{x["check"]}` — {x["msg"]}\n')
        fh.write("\n## WARN\n\n")
        for chk, n in Counter(x["check"] for x in warn).most_common():
            fh.write(f"- `{chk}` × {n}\n")
        fh.write("\n### 明细\n\n")
        for x in sorted(warn, key=lambda v: (v["check"], v["file"])):
            fh.write(f'- `{x["file"]}` [{x["lang"]}] `{x["check"]}` — {x["msg"]}\n')

    print(f"scanned={files_scanned} CRITICAL={len(crit)} WARN={len(warn)}")
    by = Counter(x["check"] for x in all_issues)
    for k, v in by.most_common():
        print(f"  {k}: {v}")
    print("report:", out_md)


if __name__ == "__main__":
    main()
