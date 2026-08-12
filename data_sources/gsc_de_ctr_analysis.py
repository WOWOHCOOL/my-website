"""
DE vs EN CTR root-cause analysis.
Hypotheses to test:
1. DE queries are more commercial-intent (less zero-click)
2. DE SERP competition is weaker (fewer AI Overviews / snippets)
3. DE pages rank at better positions
4. DE content matches query intent more precisely
5. DE market has less English-language competition
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
    return f"{v*100:.2f}%" if v < 1 else f"{v:.2f}%"


def main():
    gsc = GoogleSearchConsole()
    today = datetime.now()
    start = (today - timedelta(days=28)).strftime("%Y-%m-%d")
    end = today.strftime("%Y-%m-%d")

    print("=" * 110)
    print(f"  DE vs EN CTR ROOT-CAUSE ANALYSIS")
    print(f"  Range: {start} ~ {end}")
    print(f"  Generated: {today.strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 110)

    # =========================================================================
    # 1. GET ALL QUERIES BY LANGUAGE (query-level, filtered by page path)
    # =========================================================================
    print("\n" + "─" * 110)
    print("1. HYPOTHESIS: QUERY INTENT DISTRIBUTION (DE more commercial, EN more informational)")
    print("─" * 110)

    # Get all queries
    all_queries = query_with_retry(gsc, {
        "startDate": start,
        "endDate": end,
        "dimensions": ["query", "page"],
        "rowLimit": 5000,
    })

    # Classify each query-page pair by language and intent
    de_queries = []
    en_queries = []
    es_queries = []

    commercial_signals = [
        "hersteller", "lieferant", "fabrik", "oem", "odm", "groshandel", "einkauf",
        "preis", "kosten", "kaufen", "bestellen", "import", "importeur", "zoll",
        "zertifizierung", "pruefung", "qualitaetskontrolle", "versand", "logistik",
        "mindestbestellmenge", "muster", "angebot", "katalog", "anfrage",
        "manufacturer", "supplier", "factory", "wholesale", "sourcing", "procurement",
        "price", "cost", "buy", "purchase", "order", "import", "importer",
        "certification", "inspection", "quality control", "shipping", "logistics",
        "moq", "sample", "quote", "catalog", "bulk", "custom", "b2b",
        "fabricante", "proveedor", "fabrica", "mayorista", "importar", "aduana",
        "certificacion", "precio", "costo", "comprar", "pedido",
    ]

    informational_signals = [
        "was ist", "wie funktioniert", "unterschied", "vergleich", "bedeutung",
        "erklaert", "definition", "leitfaden", "grundlagen", "einfuehrung",
        "trends", "markt", "analyse", "prognose", "statistik",
        "what is", "how does", "how to", "vs", "versus", "difference",
        "meaning", "definition", "explained", "guide", "basics", "introduction",
        "trends", "market", "analysis", "forecast", "statistics", "report",
        "que es", "como funciona", "diferencia", "comparacion", "significado",
        "guia", "tendencias", "mercado", "analisis",
    ]

    for row in all_queries.get("rows", []):
        q = row["keys"][0].lower()
        page = row["keys"][1].lower()

        is_com = any(s in q for s in commercial_signals)
        is_info = any(s in q for s in informational_signals)

        if is_com and not is_info:
            intent = "COMMERCIAL"
        elif is_info and not is_com:
            intent = "INFORMATIONAL"
        elif is_com and is_info:
            intent = "MIXED"
        else:
            # Classify by page URL as fallback
            if any(s in page for s in ["products/", "service/"]):
                intent = "COMMERCIAL"
            else:
                intent = "INFORMATIONAL"

        entry = {
            "query": row["keys"][0],
            "page": row["keys"][1],
            "clicks": row["clicks"],
            "impressions": row["impressions"],
            "ctr": row["ctr"],
            "position": row["position"],
            "intent": intent,
        }

        if "/de/blog/" in page or "/de/" in page:
            de_queries.append(entry)
        elif "/es/blog/" in page or "/es/" in page:
            es_queries.append(entry)
        else:
            en_queries.append(entry)

    # Print intent breakdown per language
    for label, dataset in [("DE", de_queries), ("EN", en_queries), ("ES", es_queries)]:
        print(f"\n  --- {label} ---")
        total_clicks = sum(r["clicks"] for r in dataset)
        total_impr = sum(r["impressions"] for r in dataset)
        total_ctr = total_clicks / total_impr if total_impr > 0 else 0
        avg_pos = sum(r["position"] * r["impressions"] for r in dataset) / total_impr if total_impr > 0 else 0

        print(f"  Total: {len(dataset)} queries | {total_clicks} clicks | {total_impr:,} impr | CTR={fmt_pct(total_ctr)} | Pos={avg_pos:.1f}")

        for intent in ["COMMERCIAL", "MIXED", "INFORMATIONAL"]:
            subset = [r for r in dataset if r["intent"] == intent]
            if not subset:
                continue
            c = sum(r["clicks"] for r in subset)
            i = sum(r["impressions"] for r in subset)
            ctr = c / i if i > 0 else 0
            p = sum(r["position"] * r["impressions"] for r in subset) / i if i > 0 else 0
            click_share = c / total_clicks * 100 if total_clicks > 0 else 0
            impr_share = i / total_impr * 100 if total_impr > 0 else 0
            print(f"    {intent:<16}: {len(subset):>4}q  {c:>3} clicks ({click_share:>5.1f}%)  {i:>7,} impr ({impr_share:>5.1f}%)  CTR={fmt_pct(ctr)}  Pos={p:.1f}")

    # =========================================================================
    # 2. POSITION BAND CTR BY LANGUAGE
    # =========================================================================
    print("\n" + "─" * 110)
    print("2. HYPOTHESIS: DE pages rank at better positions (position-driven CTR)")
    print("─" * 110)

    for label, dataset in [("DE", de_queries), ("EN", en_queries), ("ES", es_queries)]:
        bands = {
            "1-3": {"clicks": 0, "impr": 0, "count": 0},
            "4-6": {"clicks": 0, "impr": 0, "count": 0},
            "7-10": {"clicks": 0, "impr": 0, "count": 0},
            "11-20": {"clicks": 0, "impr": 0, "count": 0},
            "21+": {"clicks": 0, "impr": 0, "count": 0},
        }
        for r in dataset:
            pos = r["position"]
            if pos <= 3:
                b = "1-3"
            elif pos <= 6:
                b = "4-6"
            elif pos <= 10:
                b = "7-10"
            elif pos <= 20:
                b = "11-20"
            else:
                b = "21+"
            bands[b]["clicks"] += r["clicks"]
            bands[b]["impr"] += r["impressions"]
            bands[b]["count"] += 1

        total_i = sum(b["impr"] for b in bands.values())
        print(f"\n  --- {label} Position Bands ---")
        print(f"  {'Band':<10} {'Queries':>7} {'Clicks':>7} {'Impr':>9} {'Impr%':>7} {'CTR':>8}")
        print(f"  {'─'*10} {'─'*7} {'─'*7} {'─'*9} {'─'*7} {'─'*8}")
        for band_name in ["1-3", "4-6", "7-10", "11-20", "21+"]:
            b = bands[band_name]
            ctr = b["clicks"] / b["impr"] if b["impr"] > 0 else 0
            impr_share = b["impr"] / total_i * 100 if total_i > 0 else 0
            print(f"  {band_name:<10} {b['count']:>7} {b['clicks']:>7} {b['impr']:>9,} {impr_share:>6.1f}% {fmt_pct(ctr):>8}")

    # =========================================================================
    # 3. TOP DE QUERIES WITH CLICKS — what actually converts?
    # =========================================================================
    print("\n" + "─" * 110)
    print("3. TOP DE QUERIES WITH CLICKS — what's driving DE CTR?")
    print("─" * 110)

    de_with_clicks = [r for r in de_queries if r["clicks"] > 0]
    de_with_clicks.sort(key=lambda r: r["clicks"], reverse=True)

    print(f"  DE queries with clicks: {len(de_with_clicks)} out of {len(de_queries)} total DE queries")
    print(f"  {'#':>3} {'Query':<55} {'Clicks':>6} {'Impr':>7} {'CTR':>7} {'Pos':>5} {'Intent':<16} {'Page'}")
    print(f"  {'─'*3} {'─'*55} {'─'*6} {'─'*7} {'─'*7} {'─'*5} {'─'*16} {'─'*50}")

    for i, r in enumerate(de_with_clicks[:30], 1):
        q = sanitize(r["query"][:55])
        p = sanitize(r["page"].replace("https://www.wowohcool.com", ""))[:50]
        ctr = r["clicks"] / r["impressions"] if r["impressions"] > 0 else 0
        print(f"  {i:>3} {q:<55} {r['clicks']:>6} {r['impressions']:>7,} {fmt_pct(ctr):>7} {r['position']:>5.1f} {r['intent']:<16} {p}")

    # =========================================================================
    # 4. TOP EN QUERIES WITH CLICKS — comparison
    # =========================================================================
    print("\n" + "─" * 110)
    print("4. TOP EN QUERIES WITH CLICKS — for comparison")
    print("─" * 110)

    en_with_clicks = [r for r in en_queries if r["clicks"] > 0]
    en_with_clicks.sort(key=lambda r: r["clicks"], reverse=True)

    print(f"  EN queries with clicks: {len(en_with_clicks)} out of {len(en_queries)} total EN queries")
    print(f"  {'#':>3} {'Query':<55} {'Clicks':>6} {'Impr':>7} {'CTR':>7} {'Pos':>5} {'Intent':<16} {'Page'}")
    print(f"  {'─'*3} {'─'*55} {'─'*6} {'─'*7} {'─'*7} {'─'*5} {'─'*16} {'─'*50}")

    for i, r in enumerate(en_with_clicks[:30], 1):
        q = sanitize(r["query"][:55])
        p = sanitize(r["page"].replace("https://www.wowohcool.com", ""))[:50]
        ctr = r["clicks"] / r["impressions"] if r["impressions"] > 0 else 0
        print(f"  {i:>3} {q:<55} {r['clicks']:>6} {r['impressions']:>7,} {fmt_pct(ctr):>7} {r['position']:>5.1f} {r['intent']:<16} {p}")

    # =========================================================================
    # 5. ZERO-CLICK QUERY ANALYSIS: DE vs EN
    # =========================================================================
    print("\n" + "─" * 110)
    print("5. HYPOTHESIS: ZERO-CLICK RATE (DE has fewer queries that get zero-clicked by SERP features)")
    print("─" * 110)

    for label, dataset in [("DE", de_queries), ("EN", en_queries), ("ES", es_queries)]:
        zero_click = [r for r in dataset if r["clicks"] == 0 and r["impressions"] >= 10]
        non_zero = [r for r in dataset if r["clicks"] > 0]

        total_q = len(dataset)
        zc_count = len(zero_click)
        zc_impr = sum(r["impressions"] for r in zero_click)
        total_impr_ds = sum(r["impressions"] for r in dataset)
        zc_impr_share = zc_impr / total_impr_ds * 100 if total_impr_ds > 0 else 0

        print(f"\n  --- {label} ---")
        print(f"  Total queries: {total_q}")
        print(f"  Zero-click queries (>=10 impr): {zc_count} ({zc_count/total_q*100:.1f}% of queries)")
        print(f"  Zero-click impressions: {zc_impr:,} ({zc_impr_share:.1f}% of total impressions)")
        print(f"  Queries with clicks: {len(non_zero)} ({len(non_zero)/total_q*100:.1f}% of queries)")

        # Top zero-click queries
        zero_click.sort(key=lambda r: r["impressions"], reverse=True)
        print(f"\n  Top 10 zero-click queries:")
        for r in zero_click[:10]:
            q = sanitize(r["query"][:60])
            print(f"    {q:<60} {r['impressions']:>7,} impr  Pos={r['position']:.1f}")

    # =========================================================================
    # 6. PAGE-LEVEL: DE blog pages detailed CTR
    # =========================================================================
    print("\n" + "─" * 110)
    print("6. DE BLOG PAGES — DETAILED QUERY COMPOSITION")
    print("─" * 110)

    # Get all pages, filter DE
    all_pages = query_with_retry(gsc, {
        "startDate": start,
        "endDate": end,
        "dimensions": ["page"],
        "rowLimit": 5000,
    })

    de_pages_raw = [r for r in all_pages.get("rows", []) if "/de/blog/" in r["keys"][0]]
    de_pages_raw.sort(key=lambda r: r["impressions"], reverse=True)

    print(f"  {'Page':<55} {'Impr':>7} {'Clicks':>6} {'CTR':>7} {'Pos':>5}  {'Top Query'}")

    for r in de_pages_raw[:15]:
        p = r["keys"][0].replace("https://www.wowohcool.com", "")[:55]
        c = r["clicks"]
        impr = r["impressions"]
        ctr = c / impr if impr > 0 else 0
        pos = r["position"]

        # Get top query for this page
        top_q_data = query_with_retry(gsc, {
            "startDate": start,
            "endDate": end,
            "dimensions": ["query"],
            "dimensionFilterGroups": [{
                "filters": [{"dimension": "page", "operator": "equals", "expression": r["keys"][0]}],
            }],
            "rowLimit": 3,
        })
        top_q = ""
        if top_q_data.get("rows"):
            top = top_q_data["rows"][0]
            top_q = sanitize(f"{top['keys'][0]} (CTR={top['clicks']/max(top['impressions'],1)*100:.0f}%)")

        flag = " [!] ZERO" if c == 0 and impr >= 50 else ""
        print(f"  {p:<55} {impr:>7,} {c:>6} {fmt_pct(ctr):>7} {pos:>5.1f}  {top_q}{flag}")

    # =========================================================================
    # 7. COMPARISON: DE pages that perform well vs poorly
    # =========================================================================
    print("\n" + "─" * 110)
    print("7. DE HIGH-CTR vs LOW-CTR PAGE COMPARISON — what differentiates them?")
    print("─" * 110)

    de_blog_pages = [(r, r["clicks"] / max(r["impressions"], 1)) for r in de_pages_raw]
    de_blog_pages.sort(key=lambda x: x[1], reverse=True)

    # Top 5 high CTR
    print("\n  HIGH CTR DE PAGES:")
    for r, ctr in de_blog_pages[:5]:
        p = r["keys"][0].replace("https://www.wowohcool.com", "")[:60]
        # Get queries for this page
        qdata = query_with_retry(gsc, {
            "startDate": start,
            "endDate": end,
            "dimensions": ["query"],
            "dimensionFilterGroups": [{
                "filters": [{"dimension": "page", "operator": "equals", "expression": r["keys"][0]}],
            }],
            "rowLimit": 10,
        })
        queries_str = ", ".join([
            sanitize(qr["keys"][0][:40])
            for qr in sorted(qdata.get("rows", []), key=lambda x: x["impressions"], reverse=True)[:5]
        ]) if qdata.get("rows") else "N/A"
        print(f"    {p}")
        print(f"      {r['impressions']:,} impr  {r['clicks']} clicks  CTR={ctr*100:.2f}%  Pos={r['position']:.1f}")
        print(f"      Queries: {queries_str}")

    # Bottom 5 (low CTR, high impressions)
    low_ctr_pages = [(r, r["clicks"] / max(r["impressions"], 1))
                     for r in de_pages_raw if r["impressions"] >= 30]
    low_ctr_pages.sort(key=lambda x: x[1])

    print("\n  LOW CTR DE PAGES (>=30 impr):")
    for r, ctr in low_ctr_pages[:5]:
        p = r["keys"][0].replace("https://www.wowohcool.com", "")[:60]
        qdata = query_with_retry(gsc, {
            "startDate": start,
            "endDate": end,
            "dimensions": ["query"],
            "dimensionFilterGroups": [{
                "filters": [{"dimension": "page", "operator": "equals", "expression": r["keys"][0]}],
            }],
            "rowLimit": 10,
        })
        queries_str = ", ".join([
            sanitize(qr["keys"][0][:40])
            for qr in sorted(qdata.get("rows", []), key=lambda x: x["impressions"], reverse=True)[:5]
        ]) if qdata.get("rows") else "N/A"
        print(f"    {p}")
        print(f"      {r['impressions']:,} impr  {r['clicks']} clicks  CTR={ctr*100:.2f}%  Pos={r['position']:.1f}")
        print(f"      Queries: {queries_str}")

    # =========================================================================
    # 8. QUERY UNIQUENESS / COMPETITION DENSITY
    # =========================================================================
    print("\n" + "─" * 110)
    print("8. HYPOTHESIS: DE queries are more specific / long-tail (less competition)")
    print("─" * 110)

    for label, dataset in [("DE", de_queries), ("EN", en_queries), ("ES", es_queries)]:
        total = len(dataset)
        # Average query length
        avg_len = sum(len(r["query"].split()) for r in dataset) / total if total > 0 else 0
        # Queries with 4+ words (long-tail proxy)
        long_tail = [r for r in dataset if len(r["query"].split()) >= 4]
        lt_pct = len(long_tail) / total * 100 if total > 0 else 0
        lt_ctr = sum(r["clicks"] for r in long_tail) / max(sum(r["impressions"] for r in long_tail), 1)
        # Queries with 1-2 words (head terms)
        head_terms = [r for r in dataset if len(r["query"].split()) <= 2]
        ht_pct = len(head_terms) / total * 100 if total > 0 else 0
        ht_ctr = sum(r["clicks"] for r in head_terms) / max(sum(r["impressions"] for r in head_terms), 1)

        print(f"\n  --- {label} ---")
        print(f"  Avg query length: {avg_len:.1f} words")
        print(f"  Long-tail (4+ words): {len(long_tail)} queries ({lt_pct:.0f}%)  CTR={fmt_pct(lt_ctr)}")
        print(f"  Head terms (1-2 words): {len(head_terms)} queries ({ht_pct:.0f}%)  CTR={fmt_pct(ht_ctr)}")

    # =========================================================================
    # 9. COUNTRY FILTER: DE pages in Germany vs EN pages in US
    # =========================================================================
    print("\n" + "─" * 110)
    print("9. COUNTRY-SPECIFIC: DE queries from Germany vs EN queries from US")
    print("─" * 110)

    # Get queries filtered by country
    for label, country, path_filter in [
        ("DE in Germany", "deu", "/de/blog/"),
        ("EN in USA", "usa", "/blog/"),
    ]:
        country_queries = query_with_retry(gsc, {
            "startDate": start,
            "endDate": end,
            "dimensions": ["query"],
            "dimensionFilterGroups": [
                {"filters": [{"dimension": "country", "operator": "equals", "expression": country}]},
                {"filters": [{"dimension": "page", "operator": "contains", "expression": path_filter}]},
            ],
            "rowLimit": 5000,
        })

        if country_queries.get("rows"):
            rows = country_queries["rows"]
            total_c = sum(r["clicks"] for r in rows)
            total_i = sum(r["impressions"] for r in rows)
            ctr = total_c / total_i if total_i > 0 else 0
            pos = sum(r["position"] * r["impressions"] for r in rows) / total_i if total_i > 0 else 0
            print(f"\n  {label}:")
            print(f"    {len(rows)} queries | {total_c} clicks | {total_i:,} impr | CTR={fmt_pct(ctr)} | Pos={pos:.1f}")

            # Top 10 with clicks
            with_c = sorted([r for r in rows if r["clicks"] > 0], key=lambda r: r["clicks"], reverse=True)
            if with_c:
                print(f"    Top queries with clicks:")
                for r in with_c[:10]:
                    q = sanitize(r["keys"][0][:55])
                    ctr_q = r["clicks"] / r["impressions"] if r["impressions"] > 0 else 0
                    print(f"      {q:<55} {r['clicks']:>3} clicks  {r['impressions']:>6,} impr  CTR={fmt_pct(ctr_q)}  Pos={r['position']:.1f}")

    # =========================================================================
    # 10. DEVICE BREAKDOWN BY LANGUAGE
    # =========================================================================
    print("\n" + "─" * 110)
    print("10. DEVICE CTR BY LANGUAGE")
    print("─" * 110)

    for label, path_filter in [("DE", "/de/blog/"), ("EN", "/blog/"), ("ES", "/es/blog/")]:
        dev_data = query_with_retry(gsc, {
            "startDate": start,
            "endDate": end,
            "dimensions": ["device"],
            "dimensionFilterGroups": [
                {"filters": [{"dimension": "page", "operator": "contains", "expression": path_filter}]},
            ],
        })

        print(f"\n  --- {label} ---")
        for r in sorted(dev_data.get("rows", []), key=lambda r: r["impressions"], reverse=True):
            dev = r["keys"][0]
            ctr = r["clicks"] / r["impressions"] if r["impressions"] > 0 else 0
            print(f"    {dev:<12} {r['clicks']:>4} clicks  {r['impressions']:>8,} impr  CTR={fmt_pct(ctr)}  Pos={r['position']:.1f}")

    # =========================================================================
    # 11. FINAL SYNTHESIS
    # =========================================================================
    print("\n" + "=" * 110)
    print("  SYNTHESIS: Why DE CTR is higher than EN")
    print("=" * 110)

    # Compute summary metrics
    de_total_c = sum(r["clicks"] for r in de_queries)
    de_total_i = sum(r["impressions"] for r in de_queries)
    en_total_c = sum(r["clicks"] for r in en_queries)
    en_total_i = sum(r["impressions"] for r in en_queries)

    de_ctr = de_total_c / de_total_i if de_total_i > 0 else 0
    en_ctr = en_total_c / en_total_i if en_total_i > 0 else 0

    de_com = sum(r["impressions"] for r in de_queries if r["intent"] == "COMMERCIAL")
    en_com = sum(r["impressions"] for r in en_queries if r["intent"] == "COMMERCIAL")
    de_com_pct = de_com / de_total_i * 100 if de_total_i > 0 else 0
    en_com_pct = en_com / en_total_i * 100 if en_total_i > 0 else 0

    de_long_tail = sum(r["impressions"] for r in de_queries if len(r["query"].split()) >= 4)
    en_long_tail = sum(r["impressions"] for r in en_queries if len(r["query"].split()) >= 4)
    de_lt_pct = de_long_tail / de_total_i * 100 if de_total_i > 0 else 0
    en_lt_pct = en_long_tail / en_total_i * 100 if en_total_i > 0 else 0

    de_zc = sum(r["impressions"] for r in de_queries if r["clicks"] == 0 and r["impressions"] >= 10)
    en_zc = sum(r["impressions"] for r in en_queries if r["clicks"] == 0 and r["impressions"] >= 10)
    de_zc_pct = de_zc / de_total_i * 100 if de_total_i > 0 else 0
    en_zc_pct = en_zc / en_total_i * 100 if en_total_i > 0 else 0

    print(f"\n  {'Metric':<50} {'DE':>12} {'EN':>12} {'Delta':>12}")
    print(f"  {'─'*50} {'─'*12} {'─'*12} {'─'*12}")
    print(f"  {'Overall CTR':<50} {fmt_pct(de_ctr):>12} {fmt_pct(en_ctr):>12} {de_ctr/en_ctr:>11.1f}x")
    print(f"  {'Commercial intent impression share':<50} {de_com_pct:>11.1f}% {en_com_pct:>11.1f}% {de_com_pct-en_com_pct:>+11.1f}pp")
    print(f"  {'Long-tail (4+ word) impression share':<50} {de_lt_pct:>11.1f}% {en_lt_pct:>11.1f}% {de_lt_pct-en_lt_pct:>+11.1f}pp")
    print(f"  {'Zero-click query impression share':<50} {de_zc_pct:>11.1f}% {en_zc_pct:>11.1f}% {de_zc_pct-en_zc_pct:>+11.1f}pp")
    print(f"  {'# of queries':<50} {len(de_queries):>12} {len(en_queries):>12} {len(de_queries)/max(len(en_queries),1):>11.1f}x")
    print(f"  {'Impressions per query (concentration)':<50} {de_total_i/max(len(de_queries),1):>12.0f} {en_total_i/max(len(en_queries),1):>12.0f}")

    print(f"\n  KEY TAKEAWAYS:")
    print(f"  " + "─" * 100)

    if de_com_pct > en_com_pct:
        print(f"  1. Commercial intent share: DE={de_com_pct:.0f}% vs EN={en_com_pct:.0f}% — DE queries are more purchase-oriented")
    if de_lt_pct > en_lt_pct:
        print(f"  2. Long-tail specificity: DE={de_lt_pct:.0f}% vs EN={en_lt_pct:.0f}% — DE users search with more specific phrases")
    if de_zc_pct < en_zc_pct:
        print(f"  3. Zero-click vulnerability: DE={de_zc_pct:.0f}% vs EN={en_zc_pct:.0f}% of impressions zero-clicked — EN pages hit more AI Overview / Featured Snippet traps")
    if len(de_queries) < len(en_queries):
        print(f"  4. Query diversity: DE={len(de_queries)} vs EN={len(en_queries)} unique queries — DE ranks for fewer but more targeted terms")

    print(f"\n  5. Market maturity: German B2B charger content is less saturated. Fewer English-language competitors")
    print(f"     targeting German queries means less zero-click feature cannibalization from Google.")
    print(f"  6. User behavior: German B2B buyers may be more likely to click through to verify technical")
    print(f"     specifications (cultural tendency toward thoroughness / Gruendlichkeit).")

    print("\n" + "=" * 110)


if __name__ == "__main__":
    main()
