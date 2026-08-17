"""
Fresh GSC data check -- Aug 12, 2026.
Focuses on: page-level CTR, blog vs DE comparison, optimized pages tracking.
"""
import sys, os, time, json
from collections import defaultdict
from datetime import datetime, timedelta

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
sys.path.insert(0, os.path.dirname(__file__))

from dotenv import load_dotenv
load_dotenv(os.path.join(os.path.dirname(__file__), "config", ".env"))

from modules.google_search_console import GoogleSearchConsole


def fmt_pct(v: float) -> str:
    return f"{v * 100:.2f}%" if v < 1 else f"{v:.2f}%"


def query_with_retry(gsc, body, max_retries=3):
    for attempt in range(max_retries):
        try:
            return gsc._query(body)
        except Exception as e:
            if attempt < max_retries - 1:
                wait = (attempt + 1) * 2
                print(f"  [Retry {attempt+1}/{max_retries} after {wait}s: {e}]", file=sys.stderr)
                time.sleep(wait)
            else:
                raise


def main():
    gsc = GoogleSearchConsole()
    today = datetime.now()
    start = (today - timedelta(days=28)).strftime("%Y-%m-%d")
    end = today.strftime("%Y-%m-%d")

    print("=" * 80)
    print(f"  GSC FRESH CHECK -- {today.strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"  Range: {start} ~ {end}")
    print("=" * 80)

    # =========================================================================
    # 1. PAGE-LEVEL CTR (top 30 by impressions)
    # =========================================================================
    print("\n" + "─" * 80)
    print("1. TOP 30 PAGES BY IMPRESSIONS")
    print("─" * 80)

    pages = query_with_retry(gsc, {
        "startDate": start,
        "endDate": end,
        "dimensions": ["page"],
        "rowLimit": 5000,
    })
    all_pages = sorted(pages.get("rows", []), key=lambda r: r["impressions"], reverse=True)
    print(f"  {'#':>3} {'Page':<70} {'Impr':>8} {'Clicks':>6} {'CTR':>7} {'Pos':>5}")
    print(f"  {'─'*3} {'─'*70} {'─'*8} {'─'*6} {'─'*7} {'─'*5}")
    for i, r in enumerate(all_pages[:30], 1):
        p = r["keys"][0].replace("https://www.wowohcool.com", "")[:70]
        c = r["clicks"]
        impr = r["impressions"]
        ctr = c / impr if impr > 0 else 0
        print(f"  {i:>3} {p:<70} {impr:>8,} {c:>6,} {fmt_pct(ctr):>7} {r['position']:>5.1f}")

    # =========================================================================
    # 2. BLOG PAGES -- total stats
    # =========================================================================
    print("\n" + "─" * 80)
    print("2. BLOG-SPECIFIC PERFORMANCE")
    print("─" * 80)

    blog_pages = [r for r in all_pages if "/blog/" in r["keys"][0]]
    blog_clicks = sum(r["clicks"] for r in blog_pages)
    blog_impr = sum(r["impressions"] for r in blog_pages)
    blog_ctr = blog_clicks / blog_impr if blog_impr > 0 else 0
    blog_pos = sum(r["position"] * r["impressions"] for r in blog_pages) / blog_impr if blog_impr > 0 else 0

    print(f"  Blog pages: {len(blog_pages)}")
    print(f"  Blog Clicks: {blog_clicks} | Impressions: {blog_impr:,} | CTR: {fmt_pct(blog_ctr)} | Pos: {blog_pos:.1f}")

    # =========================================================================
    # 3. LANGUAGE BREAKDOWN (DE/EN/ES/FR -- blog pages)
    # =========================================================================
    print("\n" + "─" * 80)
    print("3. BLOG CTR BY LANGUAGE")
    print("─" * 80)

    lang_buckets = defaultdict(lambda: {"clicks": 0, "impressions": 0, "pages": []})
    for r in blog_pages:
        url = r["keys"][0]
        if "/de/blog/" in url:
            lang = "DE"
        elif "/es/blog/" in url:
            lang = "ES"
        elif "/fr/blog/" in url:
            lang = "FR"
        elif "/ru/blog/" in url:
            lang = "RU"
        else:
            lang = "EN"
        lang_buckets[lang]["clicks"] += r["clicks"]
        lang_buckets[lang]["impressions"] += r["impressions"]
        lang_buckets[lang]["pages"].append(r)

    print(f"  {'Lang':<6} {'#Pages':>7} {'Clicks':>7} {'Impr':>9} {'CTR':>8} {'Avg Pos':>7}")
    print(f"  {'─'*6} {'─'*7} {'─'*7} {'─'*9} {'─'*8} {'─'*7}")
    for lang in ["EN", "DE", "ES", "FR", "RU"]:
        b = lang_buckets[lang]
        ctr = b["clicks"] / b["impressions"] if b["impressions"] > 0 else 0
        pos = sum(r["position"] * r["impressions"] for r in b["pages"]) / b["impressions"] if b["impressions"] > 0 else 0
        print(f"  {lang:<6} {len(b['pages']):>7} {b['clicks']:>7} {b['impressions']:>9,} {fmt_pct(ctr):>8} {pos:>7.1f}")

    # =========================================================================
    # 4. DE BLOG PAGES -- detailed
    # =========================================================================
    print("\n" + "─" * 80)
    print("4. DE BLOG PAGES — DETAILED")
    print("─" * 80)

    de_pages = sorted(
        [r for r in blog_pages if "/de/blog/" in r["keys"][0]],
        key=lambda r: r["impressions"], reverse=True
    )
    print(f"  {'#':>3} {'Page':<70} {'Impr':>8} {'Clicks':>6} {'CTR':>7} {'Pos':>5}")
    print(f"  {'─'*3} {'─'*70} {'─'*8} {'─'*6} {'─'*7} {'─'*5}")
    for i, r in enumerate(de_pages[:20], 1):
        p = r["keys"][0].replace("https://www.wowohcool.com", "")[:70]
        c = r["clicks"]
        impr = r["impressions"]
        ctr = c / impr if impr > 0 else 0
        print(f"  {i:>3} {p:<70} {impr:>8,} {c:>6,} {fmt_pct(ctr):>7} {r['position']:>5.1f}")

    # =========================================================================
    # 5. OPTIMIZED 6 PAGES TRACKING (from the report)
    # =========================================================================
    print("\n" + "─" * 80)
    print("5. OPTIMIZED PAGES — CTR TRACKING (6 pages from 8/6-8/7 optimization)")
    print("─" * 80)

    tracked = [
        "import-costs-guide",
        "certifications-us-eu-guide",
        "gan-generations-guide",
        "top-power-bank-manufacturers-china",
        "charger-safety-standards",
        "gan-vs-silicon-charger-comparison",
    ]

    pages_lookup = {r["keys"][0]: r for r in all_pages}

    # Also get the query-level breakdown for these pages
    print(f"  {'Page':<50} {'Impr':>8} {'Clicks':>6} {'CTR':>7} {'Pos':>5}")
    print(f"  {'─'*50} {'─'*8} {'─'*6} {'─'*7} {'─'*5}")
    for slug in tracked:
        url = f"https://www.wowohcool.com/blog/{slug}/"
        matched = [r for r in all_pages if slug in r["keys"][0]]
        if matched:
            r = matched[0]
            c = r["clicks"]
            impr = r["impressions"]
            ctr = c / impr if impr > 0 else 0
            print(f"  /blog/{slug}/ {' ' * max(0, 37 - len(slug))} {impr:>8,} {c:>6,} {fmt_pct(ctr):>7} {r['position']:>5.1f}")
        else:
            print(f"  /blog/{slug}/ {' ' * max(0, 37 - len(slug))} {'—':>8} {'—':>6} {'—':>7} {'—':>5}")

    # =========================================================================
    # 6. BRAND vs NON-BRAND
    # =========================================================================
    print("\n" + "─" * 80)
    print("6. BRAND vs NON-BRAND QUERIES")
    print("─" * 80)

    queries = query_with_retry(gsc, {
        "startDate": start,
        "endDate": end,
        "dimensions": ["query"],
        "rowLimit": 5000,
    })

    brand_clicks = brand_impr = 0
    non_brand_clicks = non_brand_impr = 0
    brand_queries = []
    for r in queries.get("rows", []):
        q = r["keys"][0].lower()
        if "wowohcool" in q:
            brand_clicks += r["clicks"]
            brand_impr += r["impressions"]
            brand_queries.append(r)
        else:
            non_brand_clicks += r["clicks"]
            non_brand_impr += r["impressions"]

    brand_ctr = brand_clicks / brand_impr if brand_impr > 0 else 0
    non_brand_ctr = non_brand_clicks / non_brand_impr if non_brand_impr > 0 else 0
    total_clicks = brand_clicks + non_brand_clicks

    print(f"  {'Dimension':<20} {'#Queries':>8} {'Clicks':>7} {'Impr':>9} {'CTR':>8} {'Click Share':>12}")
    print(f"  {'─'*20} {'─'*8} {'─'*7} {'─'*9} {'─'*8} {'─'*12}")
    print(f"  {'Brand (wowohcool)':<20} {len(brand_queries):>8} {brand_clicks:>7} {brand_impr:>9,} {fmt_pct(brand_ctr):>8} {brand_clicks/total_clicks*100:>11.1f}%")
    print(f"  {'Non-Brand':<20} {len(queries.get('rows', [])) - len(brand_queries):>8} {non_brand_clicks:>7} {non_brand_impr:>9,} {fmt_pct(non_brand_ctr):>8} {non_brand_clicks/total_clicks*100:>11.1f}%")

    # =========================================================================
    # 7. DEVICE BREAKDOWN
    # =========================================================================
    print("\n" + "─" * 80)
    print("7. DEVICE BREAKDOWN")
    print("─" * 80)

    device_data = query_with_retry(gsc, {
        "startDate": start,
        "endDate": end,
        "dimensions": ["device"],
    })
    print(f"  {'Device':<12} {'Clicks':>7} {'Impr':>9} {'CTR':>8} {'Pos':>5}")
    print(f"  {'─'*12} {'─'*7} {'─'*9} {'─'*8} {'─'*5}")
    for r in sorted(device_data.get("rows", []), key=lambda r: r["impressions"], reverse=True):
        dev = r["keys"][0]
        ctr = r["clicks"] / r["impressions"] if r["impressions"] > 0 else 0
        print(f"  {dev:<12} {r['clicks']:>7} {r['impressions']:>9,} {fmt_pct(ctr):>8} {r['position']:>5.1f}")

    # =========================================================================
    # 8. COUNTRY BREAKDOWN (top 15)
    # =========================================================================
    print("\n" + "─" * 80)
    print("8. COUNTRY BREAKDOWN (top 15)")
    print("─" * 80)

    country_data = query_with_retry(gsc, {
        "startDate": start,
        "endDate": end,
        "dimensions": ["country"],
        "rowLimit": 250,
    })
    countries = sorted(country_data.get("rows", []), key=lambda r: r["impressions"], reverse=True)
    print(f"  {'Country':<20} {'Clicks':>7} {'Impr':>9} {'CTR':>8} {'Pos':>5}")
    print(f"  {'─'*20} {'─'*7} {'─'*9} {'─'*8} {'─'*5}")
    for r in countries[:15]:
        cty = r["keys"][0]
        ctr = r["clicks"] / r["impressions"] if r["impressions"] > 0 else 0
        print(f"  {cty:<20} {r['clicks']:>7} {r['impressions']:>9,} {fmt_pct(ctr):>8} {r['position']:>5.1f}")

    # =========================================================================
    # 9. QUERY INTENT CATEGORIES (simple classification)
    # =========================================================================
    print("\n" + "─" * 80)
    print("9. QUERY INTENT BREAKDOWN (top-level)")
    print("─" * 80)

    commercial_signals = [
        "manufacturer", "supplier", "oem", "odm", "factory", "wholesale",
        "price", "cost", "buy", "sourcing", "fob", "moq", "order",
        "custom", "bulk", "partner", "company", "companies", "top", "best",
    ]
    informational_signals = [
        "what is", "how to", "how does", "guide", "vs", "versus",
        "meaning", "definition", "mean", "explained", "difference",
        "trends", "market", "analysis", "report", "standard", "standards",
        "certification", "safety", "code", "hs code",
    ]

    commercial = {"clicks": 0, "impressions": 0, "queries": []}
    informational = {"clicks": 0, "impressions": 0, "queries": []}
    mixed = {"clicks": 0, "impressions": 0, "queries": []}

    for r in queries.get("rows", []):
        q = r["keys"][0].lower()
        is_com = any(s in q for s in commercial_signals)
        is_info = any(s in q for s in informational_signals)
        if is_com and is_info:
            bucket = mixed
        elif is_com:
            bucket = commercial
        elif is_info:
            bucket = informational
        else:
            bucket = informational  # default

        bucket["clicks"] += r["clicks"]
        bucket["impressions"] += r["impressions"]
        bucket["queries"].append(r)

    for label, bucket in [("Commercial", commercial), ("Mixed", mixed), ("Informational", informational)]:
        ctr = bucket["clicks"] / bucket["impressions"] if bucket["impressions"] > 0 else 0
        click_share = bucket["clicks"] / total_clicks * 100 if total_clicks > 0 else 0
        impr_share = bucket["impressions"] / (sum(r["impressions"] for r in queries.get("rows", []))) * 100 if queries.get("rows") else 0
        pos = sum(r["position"] * r["impressions"] for r in bucket["queries"]) / bucket["impressions"] if bucket["impressions"] > 0 else 0
        print(f"  {label:<16}  {len(bucket['queries']):>4} queries  {bucket['clicks']:>4} clicks  {bucket['impressions']:>8,} impr  CTR={fmt_pct(ctr):>7}  Pos={pos:>5.1f}  ClickShare={click_share:>5.1f}%")

    # =========================================================================
    # 10. COMPARISON WITH LAST CHECK (Aug 10 snapshot)
    # =========================================================================
    print("\n" + "─" * 80)
    print("10. COMPARISON: baseline snapshot (8/10) vs current 28-day window")
    print("─" * 80)

    snapshot_path = os.path.join(os.path.dirname(__file__), "gsc_snapshots", "post-opt-check-20260810_20260810_171257.json")
    try:
        with open(snapshot_path, "r") as f:
            snap = json.load(f)
        prev = snap["overall"]
        # Current from query
        overall = query_with_retry(gsc, {
            "startDate": start,
            "endDate": end,
            "dimensions": [],
        })
        cur_clicks = sum(r["clicks"] for r in overall.get("rows", [])) if overall.get("rows") else 0
        cur_impr = sum(r["impressions"] for r in overall.get("rows", [])) if overall.get("rows") else 0
        cur_ctr = (cur_clicks / cur_impr * 100) if cur_impr > 0 else 0

        print(f"  {'Metric':<20} {'Aug 10':>12} {'Aug 12':>12} {'Change':>12}")
        print(f"  {'─'*20} {'─'*12} {'─'*12} {'─'*12}")
        print(f"  {'Clicks':<20} {prev['clicks']:>12} {cur_clicks:>12} {cur_clicks - prev['clicks']:>+12}")
        print(f"  {'Impressions':<20} {prev['impressions']:>12,} {cur_impr:>12,} {cur_impr - prev['impressions']:>+12,}")
        print(f"  {'CTR':<20} {prev['ctr']:>11.2f}% {cur_ctr:>11.2f}% {cur_ctr - prev['ctr']:>+11.2f}pp")
    except FileNotFoundError:
        print(f"  Snapshot not found: {snapshot_path}")

    print("\n" + "=" * 80)
    print("  ANALYSIS COMPLETE")
    print("=" * 80)


if __name__ == "__main__":
    main()
