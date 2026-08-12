"""
Investigate: why did "gan 3 vs gan 6" disappear from wowohcool.com SERP?
Tracks the query's timeline, checks if another page took over, and examines the SERP landscape.
"""
import sys, os, time, json
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


def main():
    gsc = GoogleSearchConsole()
    today = datetime.now()

    TARGET_QUERY = "gan 3 vs gan 6"

    print("=" * 100)
    print(f"  INVESTIGATION: '{TARGET_QUERY}' — Why did it disappear?")
    print(f"  Generated: {today.strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 100)

    # =========================================================================
    # 1. FULL TIMELINE: daily data for this query over 28 days
    # =========================================================================
    print("\n" + "─" * 100)
    print("1. DAILY TIMELINE — 'gan 3 vs gan 6' (28 days, unfiltered by page)")
    print("─" * 100)

    daily_q = query_with_retry(gsc, {
        "startDate": (today - timedelta(days=28)).strftime("%Y-%m-%d"),
        "endDate": today.strftime("%Y-%m-%d"),
        "dimensions": ["date"],
        "dimensionFilterGroups": [{
            "filters": [{"dimension": "query", "operator": "equals", "expression": TARGET_QUERY}],
        }],
        "rowLimit": 100,
    })

    daily_rows = sorted(daily_q.get("rows", []), key=lambda r: r["keys"][0])
    if daily_rows:
        print(f"  {'Date':<12} {'Clicks':>7} {'Impr':>8} {'CTR':>8} {'Pos':>6}  Notes")
        print(f"  {'─'*12} {'─'*7} {'─'*8} {'─'*8} {'─'*6}  {'─'*40}")
        for r in daily_rows:
            d = r["keys"][0]
            ctr = r["clicks"] / r["impressions"] if r["impressions"] > 0 else 0
            c = r["clicks"]
            impr = r["impressions"]
            pos = r["position"]
            notes = ""
            if d == "2026-08-06":
                notes = "content optimization day"
            elif d == "2026-08-07":
                notes = "snippet optimization day"
            elif c > 0:
                notes = f"GOT CLICK!"
            print(f"  {d:<12} {c:>7} {impr:>8,} {ctr*100:>7.2f}% {pos:>6.1f}  {notes}")
    else:
        print("  NO DATA — query has zero impressions across entire 28-day window")
        print("  This means the query either disappeared entirely or volume dropped to zero.")

    # =========================================================================
    # 2. WHICH PAGES RANKED FOR THIS QUERY? (page-level dimension)
    # =========================================================================
    print("\n" + "─" * 100)
    print("2. PAGES RANKING FOR 'gan 3 vs gan 6' — full period")
    print("─" * 100)

    pages_for_q = query_with_retry(gsc, {
        "startDate": (today - timedelta(days=28)).strftime("%Y-%m-%d"),
        "endDate": today.strftime("%Y-%m-%d"),
        "dimensions": ["page"],
        "dimensionFilterGroups": [{
            "filters": [{"dimension": "query", "operator": "equals", "expression": TARGET_QUERY}],
        }],
        "rowLimit": 100,
    })

    all_pages_q = sorted(pages_for_q.get("rows", []), key=lambda r: r["impressions"], reverse=True)

    if all_pages_q:
        print(f"  {'Page':<75} {'Impr':>7} {'Clicks':>6} {'CTR':>7} {'Pos':>5}")
        print(f"  {'─'*75} {'─'*7} {'─'*6} {'─'*7} {'─'*5}")
        for r in all_pages_q:
            p = sanitize(r["keys"][0].replace("https://www.wowohcool.com", ""))[:75]
            ctr = r["clicks"] / r["impressions"] if r["impressions"] > 0 else 0
            flag = " <-- OUR PAGE" if "gan-generations-guide" in r["keys"][0] else ""
            if "wowohcool" not in r["keys"][0]:
                flag += " [COMPETITOR]"
            print(f"  {p:<75} {r['impressions']:>7,} {r['clicks']:>6} {ctr*100:>6.2f}% {r['position']:>5.1f}{flag}")
    else:
        print("  No pages found for this query.")

    # =========================================================================
    # 3. BEFORE/AFTER SPLIT by page for this query
    # =========================================================================
    print("\n" + "─" * 100)
    print("3. PAGE-LEVEL BEFORE vs AFTER (Aug 6 = cutoff)")
    print("─" * 100)

    # Pre Aug 6
    pre_q = query_with_retry(gsc, {
        "startDate": "2026-07-15",
        "endDate": "2026-08-06",
        "dimensions": ["page"],
        "dimensionFilterGroups": [{
            "filters": [{"dimension": "query", "operator": "equals", "expression": TARGET_QUERY}],
        }],
        "rowLimit": 100,
    })

    # Post Aug 7
    post_q = query_with_retry(gsc, {
        "startDate": "2026-08-07",
        "endDate": "2026-08-12",
        "dimensions": ["page"],
        "dimensionFilterGroups": [{
            "filters": [{"dimension": "query", "operator": "equals", "expression": TARGET_QUERY}],
        }],
        "rowLimit": 100,
    })

    pre_pages = {r["keys"][0]: r for r in pre_q.get("rows", [])}
    post_pages = {r["keys"][0]: r for r in post_q.get("rows", [])}

    all_urls = sorted(set(list(pre_pages.keys()) + list(post_pages.keys())))

    if all_urls:
        print(f"  {'URL':<75} {'Pre Impr':>9} {'Pre Pos':>7} | {'Post Impr':>10} {'Post Pos':>7} | {'Status'}")
        print(f"  {'─'*75} {'─'*9} {'─'*7} | {'─'*10} {'─'*7} | {'─'*20}")
        for url in all_urls:
            short_url = sanitize(url.replace("https://www.wowohcool.com", ""))[:75]
            pre_r = pre_pages.get(url, None)
            post_r = post_pages.get(url, None)

            pre_i = pre_r["impressions"] if pre_r else 0
            pre_p = pre_r["position"] if pre_r else 99
            post_i = post_r["impressions"] if post_r else 0
            post_p = post_r["position"] if post_r else 99

            if pre_r and post_r:
                status = "SURVIVED"
            elif pre_r and not post_r:
                status = "LOST RANKING [!]"
            elif not pre_r and post_r:
                status = "NEW ENTRANT"
            else:
                status = "?"

            is_ours = "wowohcool" in url
            marker = " [OURS]" if is_ours else " [COMPETITOR]"
            print(f"  {short_url:<75} {pre_i:>9,} {pre_p:>7.1f} | {post_i:>10,} {post_p:>7.1f} | {status}{marker}")
    else:
        print("  No page-level data available.")

    # =========================================================================
    # 4. CHECK IF OUR OTHER PAGES NOW RANK FOR THIS QUERY
    # =========================================================================
    print("\n" + "─" * 100)
    print("4. ALL wowohcool.com PAGES FOR THIS QUERY (any page, any period)")
    print("─" * 100)

    all_pages_alltime = query_with_retry(gsc, {
        "startDate": "2026-07-01",
        "endDate": today.strftime("%Y-%m-%d"),
        "dimensions": ["page"],
        "dimensionFilterGroups": [{
            "filters": [{"dimension": "query", "operator": "equals", "expression": TARGET_QUERY}],
        }],
        "rowLimit": 250,
    })

    our_pages = [
        r for r in all_pages_alltime.get("rows", [])
        if "wowohcool.com" in r["keys"][0]
    ]
    our_pages.sort(key=lambda r: r["impressions"], reverse=True)

    if our_pages:
        print(f"  {'Page':<80} {'Impr':>7} {'Clicks':>6} {'CTR':>7} {'Pos':>5}")
        print(f"  {'─'*80} {'─'*7} {'─'*6} {'─'*7} {'─'*5}")
        for r in our_pages:
            p = r["keys"][0].replace("https://www.wowohcool.com", "")[:80]
            ctr = r["clicks"] / r["impressions"] if r["impressions"] > 0 else 0
            print(f"  {p:<80} {r['impressions']:>7,} {r['clicks']:>6} {ctr*100:>6.2f}% {r['position']:>5.1f}")
        if not any("gan-generations-guide" in r["keys"][0] for r in our_pages):
            print("\n  [!] gan-generations-guide is NOT among the ranking pages — page lost this query entirely")
    else:
        print("  [!] NO wowohcool.com pages rank for this query at all")

    # =========================================================================
    # 5. RELATED QUERIES — what ARE people searching for instead?
    # =========================================================================
    print("\n" + "─" * 100)
    print("5. RELATED GaN COMPARISON QUERIES (to see where clicks shifted)")
    print("─" * 100)

    # Search all queries containing "gan" with "vs" that include "3" or "6"
    gan_vs_queries = query_with_retry(gsc, {
        "startDate": (today - timedelta(days=28)).strftime("%Y-%m-%d"),
        "endDate": today.strftime("%Y-%m-%d"),
        "dimensions": ["query"],
        "rowLimit": 5000,
    })

    gan_vs_filtered = [
        r for r in gan_vs_queries.get("rows", [])
        if "gan" in r["keys"][0].lower()
        and ("vs" in r["keys"][0].lower() or "versus" in r["keys"][0].lower())
        and r["impressions"] >= 5
    ]
    gan_vs_filtered.sort(key=lambda r: r["impressions"], reverse=True)

    print(f"  {'Query':<55} {'Impr':>7} {'Clicks':>6} {'CTR':>7} {'Pos':>5}  {'Ranking Page'}")
    print(f"  {'─'*55} {'─'*7} {'─'*6} {'─'*7} {'─'*5}  {'─'*50}")
    for r in gan_vs_filtered[:30]:
        q = sanitize(r["keys"][0][:55])
        ctr = r["clicks"] / r["impressions"] if r["impressions"] > 0 else 0
        # Get which page ranks
        page_info = query_with_retry(gsc, {
            "startDate": (today - timedelta(days=28)).strftime("%Y-%m-%d"),
            "endDate": today.strftime("%Y-%m-%d"),
            "dimensions": ["page"],
            "dimensionFilterGroups": [{
                "filters": [{"dimension": "query", "operator": "equals", "expression": r["keys"][0]}],
            }],
            "rowLimit": 5,
        })
        top_page = ""
        if page_info.get("rows"):
            top = page_info["rows"][0]
            top_page = top["keys"][0].replace("https://www.wowohcool.com", "")[:50]
            if "wowohcool" not in top["keys"][0]:
                top_page = "[EXT] " + top["keys"][0][:50]
        print(f"  {q:<55} {r['impressions']:>7,} {r['clicks']:>6} {ctr*100:>6.2f}% {r['position']:>5.1f}  {top_page}")

    # =========================================================================
    # 6. POSITION TREND: did position gradually decay or suddenly drop?
    # =========================================================================
    print("\n" + "─" * 100)
    print("6. WEEK-BY-WEEK POSITION TREND for 'gan 3 vs gan 6'")
    print("─" * 100)

    weeks = [
        ("Week 1: Jul 15-21", "2026-07-15", "2026-07-21"),
        ("Week 2: Jul 22-28", "2026-07-22", "2026-07-28"),
        ("Week 3: Jul 29-Aug 4", "2026-07-29", "2026-08-04"),
        ("Week 4: Aug 5-11", "2026-08-05", "2026-08-11"),
    ]

    for label, ws, we in weeks:
        w = query_with_retry(gsc, {
            "startDate": ws,
            "endDate": we,
            "dimensions": ["query"],
            "dimensionFilterGroups": [{
                "filters": [{"dimension": "query", "operator": "equals", "expression": TARGET_QUERY}],
            }],
        })
        if w.get("rows"):
            r = w["rows"][0]
            ctr = r["clicks"] / r["impressions"] if r["impressions"] > 0 else 0
            print(f"  {label:<30} {r['impressions']:>6} impr  {r['clicks']:>3} clicks  {ctr*100:>6.2f}% CTR  Pos={r['position']:.1f}")
        else:
            print(f"  {label:<30} NO DATA — query disappeared this week")

    # =========================================================================
    # 7. COMPETITOR LANDSCAPE: who took our spot?
    # =========================================================================
    print("\n" + "─" * 100)
    print("7. COMPETITOR URLS NOW RANKING FOR 'gan 3 vs gan 6' (post Aug 6)")
    print("─" * 100)

    post_pages_all = query_with_retry(gsc, {
        "startDate": "2026-08-06",
        "endDate": today.strftime("%Y-%m-%d"),
        "dimensions": ["page"],
        "dimensionFilterGroups": [{
            "filters": [{"dimension": "query", "operator": "equals", "expression": TARGET_QUERY}],
        }],
        "rowLimit": 100,
    })

    ext_pages = [
        r for r in post_pages_all.get("rows", [])
        if "wowohcool.com" not in r["keys"][0]
    ]
    ext_pages.sort(key=lambda r: r["impressions"], reverse=True)

    if ext_pages:
        print(f"  {'Competitor URL':<80} {'Impr':>7} {'Pos':>6}")
        print(f"  {'─'*80} {'─'*7} {'─'*6}")
        for r in ext_pages[:15]:
            url = r["keys"][0][:80]
            print(f"  {url:<80} {r['impressions']:>7,} {r['position']:>6.1f}")
    else:
        print("  No external pages ranking either — query likely has near-zero volume in this period")
        print("  This confirms the query itself may have very low search volume,")
        print("  and our page just happened to catch a few impressions earlier.")

    # =========================================================================
    # 8. SUMMARY
    # =========================================================================
    print("\n" + "=" * 100)
    print("  SUMMARY")
    print("=" * 100)

    pre_total = sum(r["impressions"] for r in pre_q.get("rows", []) if "wowohcool" in r["keys"][0])
    post_total = sum(r["impressions"] for r in post_q.get("rows", []) if "wowohcool" in r["keys"][0])

    if post_total == 0 and pre_total > 0:
        print(f"\n  VERDICT: wowohcool.com LOST ALL RANKINGS for '{TARGET_QUERY}' after Aug 6.")
        print(f"  Pre-opt: {pre_total} impressions | Post-opt: {post_total} impressions")
        if ext_pages:
            print(f"  {len(ext_pages)} competitor URLs now occupy the SERP positions.")
        else:
            print(f"  No competitor pages found either — query volume may have collapsed.")
    elif post_total > 0:
        print(f"\n  The page still ranks but with reduced impressions: {pre_total} -> {post_total}")
    else:
        print(f"\n  Query never had meaningful volume. The 15 impressions were a statistical blip.")


if __name__ == "__main__":
    main()
