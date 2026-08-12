"""
EN Blog Content Audit: Zero-Click Risk Assessment
Classifies every EN blog article by topic type, zero-click vulnerability,
and prescribes rewrite / keep / kill actions.
"""
import sys, os, time, json
from collections import defaultdict
from datetime import datetime, timedelta

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
sys.path.insert(0, os.path.dirname(__file__))

from dotenv import load_dotenv
load_dotenv(os.path.join(os.path.dirname(__file__), "config", ".env"))

from modules.google_search_console import GoogleSearchConsole


def sanitize(s):
    return s.encode("ascii", errors="replace").decode("ascii")


def query_with_retry(gsc, body, max_retries=3):
    for attempt in range(max_retries):
        try:
            return gsc._query(body)
        except Exception as e:
            if attempt < max_retries - 1:
                time.sleep((attempt + 1) * 2)
            else:
                raise


def fmt_pct(v):
    if v == 0:
        return "0.00%"
    return f"{v*100:.2f}%" if v < 1 else f"{v:.2f}%"


# Zero-click topic patterns — queries Google answers directly in SERP
ZERO_CLICK_PATTERNS = [
    "hs code", "tariff code", "customs code", "hts code", "commodity code",
    "what is", "definition", "meaning", "define", "explained",
    "how does", "how to calculate", "how to check",
    "market size", "market share", "market trends", "market growth", "industry analysis",
    "vs", "versus", "difference between", "comparison",
    "certification list", "certifications needed", "certifications required",
    "standard", "standards", "regulation", "regulations", "compliance",
    "latest version", "current version", "newest",
    "mah meaning", "mah explained", "what does mah",
    "qi certification", "qi certified", "qi standard",
    "usb-c pinout", "usb-c wiring", "pd protocol",
]

# Click-worthy patterns — queries where user needs to click to get value
CLICK_PATTERNS = [
    "cost breakdown", "price per unit", "fob price", "landed cost",
    "factory audit", "factory visit", "factory inspection", "qc checklist",
    "test data", "test results", "test report", "measured", "benchmark",
    "how to negotiate", "how to verify", "how to find", "how to source",
    "mistake", "scam", "warning", "red flag", "trap", "pitfall",
    "checklist", "template", "calculator", "worksheet", "framework",
    "supplier evaluation", "supplier comparison", "vendor assessment",
    "oem vs odm cost", "make vs buy", "insource vs outsource",
    "database", "lookup", "verify", "validate", "authenticate",
]


def classify_topic(slug, queries, page_data):
    """Classify an article by its topic archetype and zero-click risk."""
    slug_lower = slug.lower()
    q_texts = " ".join([r["query"].lower() for r in queries])

    # Determine topic archetype
    archetype = "OTHER"
    if any(t in slug_lower for t in ["import", "shipping", "customs", "tariff", "hs-code", "logistics"]):
        archetype = "IMPORT_LOGISTICS"
    elif any(t in slug_lower for t in ["certification", "safety", "standard", "compliance", "regulation"]):
        archetype = "CERTIFICATION_COMPLIANCE"
    elif any(t in slug_lower for t in ["manufacturer", "supplier", "factory", "sourcing", "oem"]):
        archetype = "SUPPLIER_SOURCING"
    elif any(t in slug_lower for t in ["gan", "gallium nitride", "silicon"]):
        archetype = "GAN_TECH_COMPARISON"
    elif any(t in slug_lower for t in ["qi", "magsafe", "wireless"]):
        archetype = "WIRELESS_TECH"
    elif any(t in slug_lower for t in ["usb", "pd", "power delivery", "fast charg"]):
        archetype = "CHARGING_PROTOCOL"
    elif any(t in slug_lower for t in ["power bank", "powerbank", "battery"]):
        archetype = "POWER_BANK"
    elif any(t in slug_lower for t in ["market", "trend", "industry", "forecast"]):
        archetype = "MARKET_TRENDS"
    elif any(t in slug_lower for t in ["charger", "charging", "adapter"]):
        archetype = "CHARGER_GENERAL"

    # Score zero-click vulnerability
    zc_score = 0
    click_score = 0
    matched_zc = []
    matched_click = []

    for pattern in ZERO_CLICK_PATTERNS:
        matches = 0
        for q in queries:
            if pattern in q["query"].lower():
                matches += q["impressions"]
        if matches > 0:
            zc_score += matches
            matched_zc.append(pattern)

    for pattern in CLICK_PATTERNS:
        matches = 0
        for q in queries:
            if pattern in q["query"].lower():
                matches += q["impressions"]
        if matches > 0:
            click_score += matches
            matched_click.append(pattern)

    total_q_impr = sum(q["impressions"] for q in queries)
    zc_ratio = zc_score / total_q_impr if total_q_impr > 0 else 0
    click_ratio = click_score / total_q_impr if total_q_impr > 0 else 0

    # Risk classification
    actual_ctr = page_data["clicks"] / page_data["impressions"] if page_data["impressions"] > 0 else 0

    if zc_ratio > 0.5 and actual_ctr < 0.005:
        risk = "CRITICAL"
        action = "REWRITE — shift from definitional to operational content"
    elif zc_ratio > 0.3 and actual_ctr < 0.01:
        risk = "HIGH"
        action = "REWRITE — add click-worthy sections (checklists, cost data, verification methods)"
    elif click_ratio > 0.2 and actual_ctr < 0.01:
        risk = "MEDIUM"
        action = "OPTIMIZE — has click-worthy queries but title/meta may not signal value"
    elif actual_ctr >= 0.01:
        risk = "LOW"
        action = "KEEP — monitor, optimize incrementally"
    elif total_q_impr < 50:
        risk = "LOW"
        action = "LOW PRIORITY — not enough traffic to diagnose"
    else:
        risk = "MEDIUM"
        action = "REVIEW — unclear pattern, need manual inspection"

    return {
        "archetype": archetype,
        "zc_score": zc_score,
        "click_score": click_score,
        "zc_ratio": zc_ratio,
        "click_ratio": click_ratio,
        "risk": risk,
        "action": action,
        "matched_zc": matched_zc[:5],
        "matched_click": matched_click[:5],
    }


def main():
    gsc = GoogleSearchConsole()
    today = datetime.now()
    start = (today - timedelta(days=28)).strftime("%Y-%m-%d")
    end = today.strftime("%Y-%m-%d")

    print("=" * 120)
    print(f"  EN BLOG CONTENT AUDIT — Zero-Click Risk Assessment")
    print(f"  Range: {start} ~ {end}")
    print(f"  Generated: {today.strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 120)

    # =========================================================================
    # 1. Get all EN blog pages with performance data
    # =========================================================================
    all_pages = query_with_retry(gsc, {
        "startDate": start,
        "endDate": end,
        "dimensions": ["page"],
        "rowLimit": 5000,
    })

    en_blog = [
        r for r in all_pages.get("rows", [])
        if "/blog/" in r["keys"][0]
        and "/de/blog/" not in r["keys"][0]
        and "/es/blog/" not in r["keys"][0]
        and "/fr/blog/" not in r["keys"][0]
        and "/ru/blog/" not in r["keys"][0]
    ]
    en_blog.sort(key=lambda r: r["impressions"], reverse=True)

    print(f"\n  Total EN blog pages with data: {len(en_blog)}")
    print(f"  Total EN blog impressions: {sum(r['impressions'] for r in en_blog):,}")
    print(f"  Total EN blog clicks: {sum(r['clicks'] for r in en_blog)}")

    # =========================================================================
    # 2. For each page, get queries and classify
    # =========================================================================
    results = []

    print(f"\n  Analyzing each page...")
    for i, page in enumerate(en_blog):
        url = page["keys"][0]
        slug = url.replace("https://www.wowohcool.com/blog/", "").replace("/", "")

        # Get queries for this page
        try:
            qdata = query_with_retry(gsc, {
                "startDate": start,
                "endDate": end,
                "dimensions": ["query"],
                "dimensionFilterGroups": [{
                    "filters": [{"dimension": "page", "operator": "equals", "expression": url}],
                }],
                "rowLimit": 200,
            })
        except:
            qdata = {"rows": []}

        queries = []
        for r in qdata.get("rows", []):
            queries.append({
                "query": r["keys"][0],
                "clicks": r["clicks"],
                "impressions": r["impressions"],
                "ctr": r["ctr"],
                "position": r["position"],
            })

        page_data = {
            "url": url,
            "slug": slug,
            "clicks": page["clicks"],
            "impressions": page["impressions"],
            "ctr": page["clicks"] / page["impressions"] if page["impressions"] > 0 else 0,
            "position": page["position"],
        }

        classification = classify_topic(slug, queries, page_data)

        results.append({
            **page_data,
            **classification,
            "query_count": len(queries),
            "top_queries": sorted(queries, key=lambda q: q["impressions"], reverse=True)[:5],
            "click_queries": [q for q in queries if q["clicks"] > 0],
        })

        if (i + 1) % 10 == 0:
            print(f"    {i+1}/{len(en_blog)} pages analyzed...")

    # =========================================================================
    # 3. Print full audit table
    # =========================================================================
    print("\n" + "─" * 120)
    print("  FULL AUDIT TABLE — Sorted by Risk, then Impressions")
    print("─" * 120)

    risk_order = {"CRITICAL": 0, "HIGH": 1, "MEDIUM": 2, "LOW": 3}
    results.sort(key=lambda r: (risk_order.get(r["risk"], 99), -r["impressions"]))

    print(f"  {'#':>3} {'Page':<45} {'Impr':>7} {'Click':>6} {'CTR':>7} {'Pos':>5} {'Risk':<10} {'Archetype':<24} {'Action'}")
    print(f"  {'─'*3} {'─'*45} {'─'*7} {'─'*6} {'─'*7} {'─'*5} {'─'*10} {'─'*24} {'─'*50}")

    for i, r in enumerate(results, 1):
        slug_short = r["slug"][:45]
        risk_marker = f"[{r['risk']}]"
        print(f"  {i:>3} {slug_short:<45} {r['impressions']:>7,} {r['clicks']:>6} {fmt_pct(r['ctr']):>7} {r['position']:>5.1f} {risk_marker:<10} {r['archetype']:<24} {r['action'][:50]}")

    # =========================================================================
    # 4. Archetype summary
    # =========================================================================
    print("\n" + "─" * 120)
    print("  ARCHETYPE SUMMARY — Which topic types are zero-click traps?")
    print("─" * 120)

    archetypes = defaultdict(lambda: {"pages": 0, "impressions": 0, "clicks": 0, "zc_score": 0, "click_score": 0, "risks": []})
    for r in results:
        a = archetypes[r["archetype"]]
        a["pages"] += 1
        a["impressions"] += r["impressions"]
        a["clicks"] += r["clicks"]
        a["zc_score"] += r["zc_score"]
        a["click_score"] += r["click_score"]
        a["risks"].append(r["risk"])

    print(f"  {'Archetype':<28} {'#Pages':>6} {'Impr':>9} {'Click':>6} {'CTR':>7} {'ZC%':>6} {'Click%':>7} {'Critical':>8} {'High':>6} {'Recommendation'}")
    print(f"  {'─'*28} {'─'*6} {'─'*9} {'─'*6} {'─'*7} {'─'*6} {'─'*7} {'─'*8} {'─'*6} {'─'*40}")

    archetype_order = sorted(archetypes.items(), key=lambda x: x[1]["impressions"], reverse=True)

    for name, a in archetype_order:
        ctr = a["clicks"] / a["impressions"] if a["impressions"] > 0 else 0
        zc_pct = a["zc_score"] / a["impressions"] * 100 if a["impressions"] > 0 else 0
        click_pct = a["click_score"] / a["impressions"] * 100 if a["impressions"] > 0 else 0
        crit = sum(1 for r in a["risks"] if r == "CRITICAL")
        high = sum(1 for r in a["risks"] if r == "HIGH")

        if zc_pct > 40 and ctr < 0.005:
            rec = "[AVOID] Zero-click trap — stop writing this type"
        elif zc_pct > 25 and ctr < 0.01:
            rec = "[RETHINK] Add operational depth to escape zero-click"
        elif click_pct > 15:
            rec = "[DOUBLE DOWN] Click-worthy queries exist — expand"
        elif ctr >= 0.01:
            rec = "[KEEP] Working well — maintain"
        else:
            rec = "[LOW VOLUME] Not enough data to judge"

        print(f"  {name:<28} {a['pages']:>6} {a['impressions']:>9,} {a['clicks']:>6} {fmt_pct(ctr):>7} {zc_pct:>5.1f}% {click_pct:>6.1f}% {crit:>8} {high:>6}  {rec}")

    # =========================================================================
    # 5. CRITICAL pages — detail
    # =========================================================================
    critical = [r for r in results if r["risk"] == "CRITICAL"]
    if critical:
        print("\n" + "─" * 120)
        print(f"  CRITICAL PAGES ({len(critical)}) — Immediate Rewrite Candidates")
        print("─" * 120)

        for r in critical:
            print(f"\n  >>> {r['slug']}")
            print(f"      URL: {r['url']}")
            print(f"      Performance: {r['impressions']:,} impr | {r['clicks']} clicks | CTR={fmt_pct(r['ctr'])} | Pos={r['position']:.1f}")
            print(f"      Archetype: {r['archetype']} | ZC Score: {r['zc_score']} | Click Score: {r['click_score']}")
            print(f"      Zero-click patterns: {', '.join(r['matched_zc']) if r['matched_zc'] else 'N/A'}")
            print(f"      Click-worthy patterns: {', '.join(r['matched_click']) if r['matched_click'] else 'NONE'}")
            if r["top_queries"]:
                print(f"      Top queries:")
                for q in r["top_queries"]:
                    ctr_q = q["clicks"] / q["impressions"] if q["impressions"] > 0 else 0
                    print(f"        {sanitize(q['query'][:55]):<55} {q['impressions']:>6,} impr  {q['clicks']} clicks  {fmt_pct(ctr_q)}  Pos={q['position']:.1f}")
            print(f"      Action: {r['action']}")

    # =========================================================================
    # 6. HIGH pages — detail
    # =========================================================================
    high = [r for r in results if r["risk"] == "HIGH"]
    if high:
        print("\n" + "─" * 120)
        print(f"  HIGH-RISK PAGES ({len(high)}) — Rewrite with Click-Worthy Additions")
        print("─" * 120)

        for r in high:
            print(f"\n  >>> {r['slug']}")
            print(f"      Performance: {r['impressions']:,} impr | {r['clicks']} clicks | CTR={fmt_pct(r['ctr'])} | Pos={r['position']:.1f}")
            print(f"      Archetype: {r['archetype']} | ZC%: {r['zc_ratio']*100:.0f}% | Click%: {r['click_ratio']*100:.0f}%")
            print(f"      Action: {r['action']}")
            if r["click_queries"]:
                print(f"      Existing click queries (amplify these):")
                for q in r["click_queries"][:3]:
                    ctr_q = q["clicks"] / q["impressions"] if q["impressions"] > 0 else 0
                    print(f"        {sanitize(q['query'][:55]):<55} {q['impressions']:>5} impr  {q['clicks']} clicks  {fmt_pct(ctr_q)}")

    # =========================================================================
    # 7. Pages with clicks — what's working?
    # =========================================================================
    with_clicks = [r for r in results if r["clicks"] > 0]
    with_clicks.sort(key=lambda r: r["clicks"], reverse=True)

    print("\n" + "─" * 120)
    print(f"  PAGES WITH CLICKS ({len(with_clicks)}) — What's working and why?")
    print("─" * 120)

    for r in with_clicks:
        print(f"\n  >>> {r['slug']}")
        print(f"      {r['impressions']:,} impr | {r['clicks']} clicks | CTR={fmt_pct(r['ctr'])} | Pos={r['position']:.1f} | Archetype={r['archetype']}")
        if r["click_queries"]:
            print(f"      Click queries (what to amplify):")
            for q in r["click_queries"]:
                ctr_q = q["clicks"] / q["impressions"] if q["impressions"] > 0 else 0
                print(f"        {sanitize(q['query'][:60]):<60} {q['impressions']:>5} impr  {q['clicks']} clicks  {fmt_pct(ctr_q)}  Pos={q['position']:.1f}")
        if r["matched_click"]:
            print(f"      Click-worthy patterns detected: {', '.join(r['matched_click'])}")

    # =========================================================================
    # 8. New article opportunities — gap analysis
    # =========================================================================
    print("\n" + "─" * 120)
    print("  NEW ARTICLE OPPORTUNITIES — Topics with click-worthy queries but no dedicated page")
    print("─" * 120)

    # Search all queries for click-worthy patterns not covered by existing content
    all_queries_raw = query_with_retry(gsc, {
        "startDate": start,
        "endDate": end,
        "dimensions": ["query"],
        "rowLimit": 5000,
    })

    # Queries with commercial/click intent that have low CTR
    opportunities = []
    for r in all_queries_raw.get("rows", []):
        q = r["keys"][0].lower()
        ctr = r["clicks"] / r["impressions"] if r["impressions"] > 0 else 0

        is_click = any(p in q for p in CLICK_PATTERNS)
        is_zc = any(p in q for p in ZERO_CLICK_PATTERNS)
        is_commercial = any(p in q for p in [
            "oem", "odm", "manufacturer", "supplier", "factory", "wholesale",
            "cost", "price", "buy", "purchase", "sourcing", "import",
        ])

        # Only queries with click intent, decent impressions, and low CTR
        if is_click and not is_zc and r["impressions"] >= 5 and ctr < 0.05:
            # Deduplicate similar queries by core topic
            opportunities.append({
                "query": r["keys"][0],
                "impressions": r["impressions"],
                "clicks": r["clicks"],
                "ctr": ctr,
                "position": r["position"],
            })

    # Cluster by topic
    topic_clusters = defaultdict(lambda: {"impressions": 0, "clicks": 0, "queries": [], "avg_pos": 0})
    cluster_keywords = {
        "factory_audit": ["factory audit", "factory inspection", "factory visit", "qc checklist", "quality inspection"],
        "cost_breakdown": ["cost breakdown", "landed cost", "fob price", "per unit cost", "total cost"],
        "supplier_verification": ["verify supplier", "verify manufacturer", "check supplier", "supplier background", "factory verification"],
        "certification_verification": ["verify certification", "check certification", "certificate lookup", "authenticate certificate", "fake certificate"],
        "moq_negotiation": ["moq negotiation", "negotiate moq", "minimum order", "lower moq", "small order"],
        "shipping_risk": ["shipping mistake", "customs mistake", "import mistake", "declaration error", "duty calculation"],
    }

    for opp in opportunities:
        q = opp["query"].lower()
        for cluster_name, keywords in cluster_keywords.items():
            if any(kw in q for kw in keywords):
                topic_clusters[cluster_name]["impressions"] += opp["impressions"]
                topic_clusters[cluster_name]["clicks"] += opp["clicks"]
                topic_clusters[cluster_name]["queries"].append(opp)
                topic_clusters[cluster_name]["avg_pos"] += opp["position"]
                break

    for cluster_name in topic_clusters:
        tc = topic_clusters[cluster_name]
        if tc["queries"]:
            tc["avg_pos"] /= len(tc["queries"])

    # Sort by impression volume
    cluster_order = sorted(topic_clusters.items(), key=lambda x: x[1]["impressions"], reverse=True)

    print(f"  {'Topic Cluster':<30} {'Impr':>7} {'CTR':>7} {'Pos':>6} {'#Queries':>8}  {'Sample Query'}")
    print(f"  {'─'*30} {'─'*7} {'─'*7} {'─'*6} {'─'*8}  {'─'*50}")
    for name, tc in cluster_order:
        if not tc["queries"]:
            continue
        ctr = tc["clicks"] / tc["impressions"] if tc["impressions"] > 0 else 0
        sample = sanitize(tc["queries"][0]["query"][:50]) if tc["queries"] else ""
        print(f"  {name:<30} {tc['impressions']:>7,} {fmt_pct(ctr):>7} {tc['avg_pos']:>6.1f} {len(tc['queries']):>8}  {sample}")

    # =========================================================================
    # 9. Final prioritized action list
    # =========================================================================
    print("\n" + "=" * 120)
    print("  PRIORITIZED ACTION LIST")
    print("=" * 120)

    print("\n  [IMMEDIATE — CRITICAL pages to rewrite]")
    print("  " + "─" * 80)
    for r in critical:
        print(f"  {r['slug']}")
        print(f"    Current: {r['impressions']:,} impr, CTR={fmt_pct(r['ctr'])}, {r['archetype']}")
        print(f"    Rewrite to: {r['action'].replace('REWRITE — ', '')}")

    print("\n  [THIS WEEK — HIGH-risk pages to enhance]")
    print("  " + "─" * 80)
    for r in high[:5]:
        print(f"  {r['slug']}")
        print(f"    Current: {r['impressions']:,} impr, CTR={fmt_pct(r['ctr'])}, {r['archetype']}")
        print(f"    Strategy: {r['action'].replace('REWRITE — ', '')}")

    print("\n  [NEW CONTENT — Untapped click-worthy topics]")
    print("  " + "─" * 80)
    for name, tc in cluster_order[:5]:
        if not tc["queries"]:
            continue
        ctr = tc["clicks"] / tc["impressions"] if tc["impressions"] > 0 else 0
        print(f"  {name}")
        print(f"    Search demand: {tc['impressions']:,} impr across {len(tc['queries'])} queries, CTR={fmt_pct(ctr)}, Pos={tc['avg_pos']:.1f}")

    print("\n  [KEEP — What's working, don't touch]")
    print("  " + "─" * 80)
    keepers = [r for r in results if r["risk"] == "LOW" and r["clicks"] >= 2]
    for r in sorted(keepers, key=lambda r: r["clicks"], reverse=True)[:5]:
        print(f"  {r['slug']}: {r['clicks']} clicks, CTR={fmt_pct(r['ctr'])}, {r['archetype']}")

    print("\n" + "=" * 120)


if __name__ == "__main__":
    main()
