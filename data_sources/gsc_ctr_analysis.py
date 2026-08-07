"""
GSC CTR Deep-Dive Analysis -- Diagnose 0.4% low CTR across dimensions.

Usage:
  python data_sources/gsc_ctr_analysis.py [--days 28]
"""

import argparse
import sys
import os
from collections import defaultdict
from datetime import datetime, timedelta

# Add project paths
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
sys.path.insert(0, os.path.join(os.path.dirname(__file__)))

from dotenv import load_dotenv
load_dotenv(os.path.join(os.path.dirname(__file__), "config", ".env"))

from modules.google_search_console import GoogleSearchConsole


def fmt_pct(v: float) -> str:
    return f"{v * 100:.2f}%" if v < 1 else f"{v:.2f}%"


def fmt_num(n: float) -> str:
    return f"{n:,.0f}"


def main():
    parser = argparse.ArgumentParser(description="GSC CTR deep-dive analysis")
    parser.add_argument("--days", type=int, default=28, help="Days of data (default: 28)")
    args = parser.parse_args()

    gsc = GoogleSearchConsole()

    print("=" * 80)
    print(f"  GSC CTR DEEP-DIVE ANALYSIS -- Last {args.days} Days")
    print(f"  Site: {gsc.site_url}")
    print(f"  Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 80)

    # =========================================================================
    # 1. SITE-WIDE AGGREGATE -- Overall health check
    # =========================================================================
    print("\n" + "─" * 80)
    print("1. SITE-WIDE AGGREGATE STATS (all pages, all queries)")
    print("─" * 80)

    overall = gsc._query({
        "startDate": (datetime.now() - timedelta(days=args.days)).strftime("%Y-%m-%d"),
        "endDate": datetime.now().strftime("%Y-%m-%d"),
        "dimensions": [],
    })
    site_clicks = sum(r["clicks"] for r in overall.get("rows", [])) if overall.get("rows") else 0
    site_impr = sum(r["impressions"] for r in overall.get("rows", [])) if overall.get("rows") else 0
    site_ctr = (site_clicks / site_impr) if site_impr > 0 else 0
    site_pos = sum(r["position"] * r["impressions"] for r in overall.get("rows", [])) / site_impr if site_impr > 0 else 0

    print(f"  Total Clicks:      {fmt_num(site_clicks)}")
    print(f"  Total Impressions: {fmt_num(site_impr)}")
    print(f"  Overall CTR:       {fmt_pct(site_ctr)}")
    print(f"  Avg Position:      {site_pos:.1f}")

    # =========================================================================
    # 2. DAILY TREND -- Is CTR improving or declining?
    # =========================================================================
    print("\n" + "─" * 80)
    print("2. DAILY CTR TREND")
    print("─" * 80)

    daily = gsc._query({
        "startDate": (datetime.now() - timedelta(days=args.days)).strftime("%Y-%m-%d"),
        "endDate": datetime.now().strftime("%Y-%m-%d"),
        "dimensions": ["date"],
    })
    daily_rows = sorted(daily.get("rows", []), key=lambda r: r["keys"][0])
    print(f"  {'Date':<12} {'Clicks':>8} {'Impressions':>12} {'CTR':>8} {'Pos':>6}")
    print(f"  {'─'*12} {'─'*8} {'─'*12} {'─'*8} {'─'*6}")
    for r in daily_rows:
        d = r["keys"][0]
        ctr_str = f"{r['ctr']*100:.2f}%"
        print(f"  {d:<12} {r['clicks']:>8,} {r['impressions']:>12,} {ctr_str:>8} {r['position']:>6.1f}")

    # Check for CTR trend
    half = len(daily_rows) // 2
    first_half = daily_rows[:half]
    second_half = daily_rows[half:]
    if first_half and second_half:
        ctr1 = sum(r["ctr"] * r["impressions"] for r in first_half) / max(sum(r["impressions"] for r in first_half), 1)
        ctr2 = sum(r["ctr"] * r["impressions"] for r in second_half) / max(sum(r["impressions"] for r in second_half), 1)
        impr1 = sum(r["impressions"] for r in first_half)
        impr2 = sum(r["impressions"] for r in second_half)
        trend_word = "[IMPROVING]" if ctr2 > ctr1 else "[DECLINING]" if ctr2 < ctr1 else "[FLAT]"
        print(f"\n  First {half} days CTR: {ctr1*100:.2f}% | Last {half} days CTR: {ctr2*100:.2f}% -> {trend_word}")
        if impr2 > 0:
            print(f"  Impression change: {impr1:,.0f} -> {impr2:,.0f} ({(impr2/impr1 - 1)*100:+.1f}%)")

    # =========================================================================
    # 3. POSITION-BAND CTR ANALYSIS -- Is low CTR a position problem or title problem?
    # =========================================================================
    print("\n" + "─" * 80)
    print("3. CTR BY POSITION BAND (query-level)")
    print("─" * 80)
    print("   This reveals whether CTR is normal for ranking position or truly poor.")

    queries = gsc._query({
        "startDate": (datetime.now() - timedelta(days=args.days)).strftime("%Y-%m-%d"),
        "endDate": datetime.now().strftime("%Y-%m-%d"),
        "dimensions": ["query"],
        "rowLimit": 5000,
    })

    bands = {
        "1-3 (Top)": {"clicks": 0, "impr": 0, "queries": [], "positions": []},
        "4-6": {"clicks": 0, "impr": 0, "queries": [], "positions": []},
        "7-10": {"clicks": 0, "impr": 0, "queries": [], "positions": []},
        "11-20 (Page 2)": {"clicks": 0, "impr": 0, "queries": [], "positions": []},
        "21-50 (Page 3-5)": {"clicks": 0, "impr": 0, "queries": [], "positions": []},
        "50+": {"clicks": 0, "impr": 0, "queries": [], "positions": []},
    }

    for r in queries.get("rows", []):
        pos = r["position"]
        if pos <= 3:
            band = "1-3 (Top)"
        elif pos <= 6:
            band = "4-6"
        elif pos <= 10:
            band = "7-10"
        elif pos <= 20:
            band = "11-20 (Page 2)"
        elif pos <= 50:
            band = "21-50 (Page 3-5)"
        else:
            band = "50+"
        bands[band]["clicks"] += r["clicks"]
        bands[band]["impr"] += r["impressions"]
        bands[band]["queries"].append(r)
        bands[band]["positions"].append(pos)

    # Typical CTR by position for reference (Advanced Web Ranking 2024 benchmarks)
    benchmarks = {
        "1-3 (Top)": "7.0--30.0%",
        "4-6": "2.0--5.0%",
        "7-10": "1.0--2.5%",
        "11-20 (Page 2)": "0.5--1.5%",
        "21-50 (Page 3-5)": "0.1--0.5%",
        "50+": "<0.1%",
    }

    print(f"  {'Band':<20} {'#Queries':>8} {'Clicks':>8} {'Impr':>10} {'CTR':>8} {'Avg Pos':>7} {'Benchmark':>15}")
    print(f"  {'─'*20} {'─'*8} {'─'*8} {'─'*10} {'─'*8} {'─'*7} {'─'*15}")
    for band_name in ["1-3 (Top)", "4-6", "7-10", "11-20 (Page 2)", "21-50 (Page 3-5)", "50+"]:
        b = bands[band_name]
        ctr = b["clicks"] / b["impr"] if b["impr"] > 0 else 0
        avg_pos = sum(b["positions"]) / len(b["positions"]) if b["positions"] else 0
        flag = " [!]" if (band_name == "1-3 (Top)" and ctr < 0.05) or \
                        (band_name == "4-6" and ctr < 0.015) or \
                        (band_name == "7-10" and ctr < 0.008) else ""
        print(f"  {band_name:<20} {len(b['queries']):>8} {b['clicks']:>8,} {b['impr']:>10,} {fmt_pct(ctr):>8} {avg_pos:>7.1f} {benchmarks[band_name]:>15}{flag}")

    # =========================================================================
    # 4. TOP QUERIES BY IMPRESSIONS -- What's generating volume?
    # =========================================================================
    print("\n" + "─" * 80)
    print("4. TOP 30 QUERIES BY IMPRESSIONS (volume drivers)")
    print("─" * 80)

    all_queries = sorted(queries.get("rows", []), key=lambda r: r["impressions"], reverse=True)
    print(f"  {'#':>3} {'Query':<55} {'Impr':>8} {'Clicks':>7} {'CTR':>7} {'Pos':>6}")
    print(f"  {'─'*3} {'─'*55} {'─'*8} {'─'*7} {'─'*7} {'─'*6}")
    for i, r in enumerate(all_queries[:30], 1):
        q = r["keys"][0][:55]
        print(f"  {i:>3} {q:<55} {r['impressions']:>8,} {r['clicks']:>7,} {fmt_pct(r['ctr']):>7} {r['position']:>6.1f}")

    # =========================================================================
    # 5. WORST CTR QUERIES (RANKING WELL, LOW CTR) -- Title/meta rewrite targets
    # =========================================================================
    print("\n" + "─" * 80)
    print("5. LOW-CTR OPPORTUNITIES (Position <= 10, CTR < 2%, Impr ≥ 50)")
    print("─" * 80)
    print("   These queries rank on page 1 but nobody clicks -- meta description rewrite priority.")

    low_ctr_queries = [
        r for r in queries.get("rows", [])
        if r["position"] <= 10 and r["ctr"] < 0.02 and r["impressions"] >= 50
    ]
    low_ctr_queries.sort(key=lambda r: r["impressions"], reverse=True)

    if low_ctr_queries:
        print(f"  {'#':>3} {'Query':<55} {'Impr':>8} {'Clicks':>7} {'CTR':>7} {'Pos':>6} {'Missed':>8}")
        print(f"  {'─'*3} {'─'*55} {'─'*8} {'─'*7} {'─'*7} {'─'*6} {'─'*8}")
        for i, r in enumerate(low_ctr_queries[:25], 1):
            q = r["keys"][0][:55]
            expected_clicks = int(r["impressions"] * 0.03)  # conservative 3% target
            missed = expected_clicks - r["clicks"]
            print(f"  {i:>3} {q:<55} {r['impressions']:>8,} {r['clicks']:>7,} {fmt_pct(r['ctr']):>7} {r['position']:>6.1f} {missed:>8,}")
    else:
        print("  No low-CTR queries found in page-1 positions. The CTR issue is from page 2+.")

    # =========================================================================
    # 6. PAGE-LEVEL CTR -- Which pages contribute most to the low CTR?
    # =========================================================================
    print("\n" + "─" * 80)
    print("6. PAGE-LEVEL CTR (top pages by impressions)")
    print("─" * 80)

    pages = gsc._query({
        "startDate": (datetime.now() - timedelta(days=args.days)).strftime("%Y-%m-%d"),
        "endDate": datetime.now().strftime("%Y-%m-%d"),
        "dimensions": ["page"],
        "rowLimit": 5000,
    })
    all_pages = sorted(pages.get("rows", []), key=lambda r: r["impressions"], reverse=True)
    print(f"  {'#':>3} {'Page':<65} {'Impr':>8} {'Clicks':>7} {'CTR':>7} {'Pos':>6}")
    print(f"  {'─'*3} {'─'*65} {'─'*8} {'─'*7} {'─'*7} {'─'*6}")
    for i, r in enumerate(all_pages[:30], 1):
        p = r["keys"][0].replace("https://www.wowohcool.com", "")[:65]
        ctr = r["clicks"] / r["impressions"] if r["impressions"] > 0 else 0
        flag = " [!] LOW CTR" if ctr < 0.01 and r["impressions"] > 100 else ""
        print(f"  {i:>3} {p:<65} {r['impressions']:>8,} {r['clicks']:>7,} {fmt_pct(ctr):>7} {r['position']:>6.1f}{flag}")

    # =========================================================================
    # 7. WORST CTR PAGES -- Biggest missed-click pages
    # =========================================================================
    print("\n" + "─" * 80)
    print("7. WORST CTR PAGES (Impression ≥ 200, CTR < 1%)")
    print("─" * 80)

    worst_pages = [
        r for r in pages.get("rows", [])
        if r["impressions"] >= 200 and (r["clicks"] / max(r["impressions"], 1)) < 0.01
    ]
    worst_pages.sort(key=lambda r: r["impressions"], reverse=True)

    if worst_pages:
        print(f"  {'#':>3} {'Page':<65} {'Impr':>8} {'Clicks':>7} {'CTR':>7} {'Pos':>6}")
        print(f"  {'─'*3} {'─'*65} {'─'*8} {'─'*7} {'─'*7} {'─'*6}")
        for i, r in enumerate(worst_pages[:20], 1):
            p = r["keys"][0].replace("https://www.wowohcool.com", "")[:65]
            ctr = r["clicks"] / max(r["impressions"], 1)
            print(f"  {i:>3} {p:<65} {r['impressions']:>8,} {r['clicks']:>7,} {fmt_pct(ctr):>7} {r['position']:>6.1f}")
    else:
        print("  No pages with CTR < 1% and ≥200 impressions.")

    # =========================================================================
    # 8. BLOG-SPECIFIC CTR -- Focus on /blog/ pages
    # =========================================================================
    print("\n" + "─" * 80)
    print("8. BLOG-SPECIFIC PERFORMANCE (pages containing /blog/)")
    print("─" * 80)

    blog_pages = [r for r in pages.get("rows", []) if "/blog/" in r["keys"][0]]
    blog_clicks = sum(r["clicks"] for r in blog_pages)
    blog_impr = sum(r["impressions"] for r in blog_pages)
    blog_ctr = blog_clicks / blog_impr if blog_impr > 0 else 0
    blog_pos = sum(r["position"] * r["impressions"] for r in blog_pages) / blog_impr if blog_impr > 0 else 0

    print(f"  Blog pages found: {len(blog_pages)}")
    print(f"  Blog Clicks:      {fmt_num(blog_clicks)}")
    print(f"  Blog Impressions: {fmt_num(blog_impr)}")
    print(f"  Blog CTR:         {fmt_pct(blog_ctr)}")
    print(f"  Blog Avg Pos:     {blog_pos:.1f}")

    non_blog = [r for r in pages.get("rows", []) if "/blog/" not in r["keys"][0]]
    non_blog_clicks = sum(r["clicks"] for r in non_blog)
    non_blog_impr = sum(r["impressions"] for r in non_blog)
    non_blog_ctr = non_blog_clicks / non_blog_impr if non_blog_impr > 0 else 0
    print(f"\n  Non-Blog CTR:     {fmt_pct(non_blog_ctr)} ({len(non_blog)} pages)")
    print(f"  -> Blog CTR is {'higher' if blog_ctr > non_blog_ctr else 'lower'} than non-blog by {abs(blog_ctr - non_blog_ctr)*100:.2f}pp")

    # =========================================================================
    # 9. DIAGNOSIS SUMMARY
    # =========================================================================
    print("\n" + "=" * 80)
    print("  DIAGNOSIS SUMMARY")
    print("=" * 80)

    findings = []

    # Finding 1: Overall CTR
    if site_ctr < 0.01:
        findings.append(f"[!!] Overall CTR ({site_ctr*100:.2f}%) is critically low -- well below industry average of 1.5-3%")
    elif site_ctr < 0.03:
        findings.append(f"[!] Overall CTR ({site_ctr*100:.2f}%) is below average (1.5-3% typical)")
    else:
        findings.append(f"[OK] Overall CTR ({site_ctr*100:.2f}%) is within normal range")

    # Finding 2: Position distribution
    page1_queries = sum(1 for r in queries.get("rows", []) if r["position"] <= 10)
    total_queries = len(queries.get("rows", []))
    page1_impr = sum(r["impressions"] for r in queries.get("rows", []) if r["position"] <= 10)
    total_impr_sum = sum(r["impressions"] for r in queries.get("rows", []))
    page1_share = page1_impr / total_impr_sum if total_impr_sum else 0
    findings.append(f"{'[!]' if page1_share < 0.3 else '[OK]'} {page1_share*100:.0f}% of impressions come from page-1 positions ({page1_queries}/{total_queries} queries)")

    # Finding 3: Page-1 CTR benchmark check
    if "1-3 (Top)" in bands:
        top3 = bands["1-3 (Top)"]
        top3_ctr = top3["clicks"] / top3["impr"] if top3["impr"] > 0 else 0
        if top3_ctr < 0.05:
            findings.append(f"[!!] Top-3 CTR is only {top3_ctr*100:.1f}% -- titles/meta descriptions need rewrite. Should be 7-30%")
        else:
            findings.append(f"[OK] Top-3 CTR ({top3_ctr*100:.1f}%) is healthy")

    # Finding 4: Low-CTR page 1 queries
    if low_ctr_queries:
        missed_total = sum(
            max(0, int(r["impressions"] * 0.03) - r["clicks"])
            for r in low_ctr_queries
        )
        findings.append(f"[!!] {len(low_ctr_queries)} page-1 queries with CTR < 2% -- {missed_total:,} potential clicks lost (to 3% target)")
    else:
        findings.append("[OK] No page-1 queries with abnormally low CTR")

    # Finding 5: Page 2+ share
    page2_plus = sum(1 for r in queries.get("rows", []) if r["position"] > 10)
    page2_impr = sum(r["impressions"] for r in queries.get("rows", []) if r["position"] > 10)
    page2_share = page2_impr / total_impr_sum if total_impr_sum else 0
    if page2_share > 0.6:
        findings.append(f"[!] {page2_share*100:.0f}% of impressions from position 11+ ({page2_plus} queries) -- ranking improvement needed more than CTR optimization")
    else:
        findings.append(f"[OK] {page2_share*100:.0f}% of impressions from position 11+ -- acceptable")

    # Finding 6: Blog vs non-blog
    if len(blog_pages) > 0 and len(non_blog) > 0:
        diff = abs(blog_ctr - non_blog_ctr) * 100
        if diff > 0.5:
            loser = "Blog" if blog_ctr < non_blog_ctr else "Non-blog"
            findings.append(f"[!] {loser} pages underperform CTR by {diff:.1f}pp vs other pages")

    for f in findings:
        print(f"  {f}")

    # =========================================================================
    # 10. RECOMMENDATIONS
    # =========================================================================
    print("\n" + "=" * 80)
    print("  ACTION PLAN")
    print("=" * 80)

    recs = []

    # Recommendations based on findings
    if page1_share < 0.3:
        recs.append(("PRIORITY 1", "Improve rankings to page 1 -- most impressions are page 2+ where CTR is naturally <1%. Focus on content depth, backlinks, internal linking."))

    if low_ctr_queries:
        top_rewrites = [r["keys"][0] for r in low_ctr_queries[:5]]
        recs.append(("PRIORITY 2", f"Rewrite meta titles/descriptions for top low-CTR queries: {', '.join(top_rewrites)}"))

    recs.append(("PRIORITY 3", "Add FAQPage + HowTo schema to all blog posts -- rich results increase organic CTR 5-15%"))
    recs.append(("PRIORITY 4", "Optimize H1 titles: ensure every H1 matches the search intent of its primary keyword and includes a B2B signal word"))

    # Blog-specific
    if blog_pages:
        blog_page1 = sum(1 for r in blog_pages if r["position"] <= 10)
        if blog_page1 < len(blog_pages) * 0.3:
            recs.append(("PRIORITY 5", f"Only {blog_page1}/{len(blog_pages)} blog pages have page-1 rankings. Focus B2B content on lower-competition long-tail keywords."))

    for priority, rec in recs:
        print(f"  [{priority}] {rec}")

    print("\n" + "=" * 80)


if __name__ == "__main__":
    main()
