"""
Deep-dive: gan-generations-guide query-level CTR decomposition.
Tracks every query driving impressions to this page, with position/CTR trends.
"""
import sys, os, time, json
from collections import defaultdict
from datetime import datetime, timedelta

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
sys.path.insert(0, os.path.dirname(__file__))

from dotenv import load_dotenv
load_dotenv(os.path.join(os.path.dirname(__file__), "config", ".env"))

from modules.google_search_console import GoogleSearchConsole


def query_with_retry(gsc, body, max_retries=3):
    for attempt in range(max_retries):
        try:
            return gsc._query(body)
        except Exception as e:
            if attempt < max_retries - 1:
                time.sleep((attempt + 1) * 2)
            else:
                raise


def sanitize(s):
    """Replace non-ASCII chars with '?' to avoid Windows GBK encoding errors."""
    return s.encode("ascii", errors="replace").decode("ascii")


def main():
    gsc = GoogleSearchConsole()
    today = datetime.now()

    PAGE_URL = "https://www.wowohcool.com/blog/gan-generations-guide/"

    # =========================================================================
    # 1. FULL 28-DAY QUERY BREAKDOWN
    # =========================================================================
    print("=" * 100)
    print(f"  GAN-GENERATIONS-GUIDE — QUERY-LEVEL CTR DECOMPOSITION")
    print(f"  URL: {PAGE_URL}")
    print(f"  Generated: {today.strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 100)

    start_28 = (today - timedelta(days=28)).strftime("%Y-%m-%d")
    end = today.strftime("%Y-%m-%d")

    queries_28 = query_with_retry(gsc, {
        "startDate": start_28,
        "endDate": end,
        "dimensions": ["query"],
        "dimensionFilterGroups": [{
            "filters": [{"dimension": "page", "operator": "equals", "expression": PAGE_URL}],
        }],
        "rowLimit": 5000,
    })

    all_q = sorted(queries_28.get("rows", []), key=lambda r: r["impressions"], reverse=True)

    total_clicks = sum(r["clicks"] for r in all_q)
    total_impr = sum(r["impressions"] for r in all_q)
    total_ctr = total_clicks / total_impr if total_impr > 0 else 0

    print(f"\n  28d Summary: {len(all_q)} queries | {total_clicks} clicks | {total_impr:,} impr | CTR={total_ctr*100:.2f}% | Avg Pos={sum(r['position']*r['impressions'] for r in all_q)/total_impr:.1f}\n")

    # Group queries by topic
    gan_vs = []
    gan_generations = []
    gan_tech = []
    charger_general = []
    other = []

    for r in all_q:
        q = r["keys"][0].lower()
        if "vs" in q or "versus" in q or "compar" in q:
            gan_vs.append(r)
        elif any(t in q for t in ["gan 1", "gan 2", "gan 3", "gan 4", "gan 5", "gan 6",
                                     "gan i", "gan ii", "gan iii", "gan iv", "gan v",
                                     "generation", "gen 1", "gen 2", "gen 3"]):
            gan_generations.append(r)
        elif any(t in q for t in ["what is gan", "how does gan", "gan technology",
                                    "gan charger", "gan charging", "gallium nitride"]):
            gan_tech.append(r)
        elif "charger" in q or "charging" in q or "power" in q:
            charger_general.append(r)
        else:
            other.append(r)

    print("─" * 100)
    print("  QUERY CLUSTERS")
    print("─" * 100)
    for label, cluster in [
        ("GaN vs / Comparison (snippet-optimized target)", gan_vs),
        ("GaN Generations (1-6, I-V)", gan_generations),
        ("GaN Technology / What is", gan_tech),
        ("General Charger", charger_general),
        ("Other / Misc", other),
    ]:
        c = sum(r["clicks"] for r in cluster)
        i = sum(r["impressions"] for r in cluster)
        ctr = c / i if i > 0 else 0
        pos = sum(r["position"] * r["impressions"] for r in cluster) / i if i > 0 else 0
        pct = i / total_impr * 100 if total_impr > 0 else 0
        print(f"  {label:<50} {len(cluster):>4}q  {c:>3} clicks  {i:>6,} impr  CTR={ctr*100:>6.2f}%  Pos={pos:>5.1f}  ({pct:>5.1f}% of page total)")

    # =========================================================================
    # 2. ALL QUERIES WITH PERFORMANCE
    # =========================================================================
    print("\n" + "─" * 100)
    print("  ALL QUERIES — SORTED BY IMPRESSIONS")
    print("─" * 100)
    print(f"  {'#':>3} {'Query':<65} {'Impr':>7} {'Click':>6} {'CTR':>7} {'Pos':>5}  {'Cluster'}")
    print(f"  {'─'*3} {'─'*65} {'─'*7} {'─'*6} {'─'*7} {'─'*5}  {'─'*30}")

    for i, r in enumerate(all_q, 1):
        q = sanitize(r["keys"][0][:65])
        ctr = r["clicks"] / r["impressions"] if r["impressions"] > 0 else 0
        c = r["clicks"]
        impr = r["impressions"]
        pos = r["position"]

        # Determine cluster
        ql = q.lower()
        if "vs" in ql or "versus" in ql or "compar" in ql:
            cluster = "GAN_VS"
        elif any(t in ql for t in ["gan 1", "gan 2", "gan 3", "gan 4", "gan 5", "gan 6",
                                     "gan i", "gan ii", "gan iii", "gan iv", "gan v",
                                     "generation", "gen 1", "gen 2", "gen 3"]):
            cluster = "GAN_GEN"
        elif any(t in ql for t in ["what is gan", "how does gan", "gan technology",
                                    "gan charger", "gallium nitride"]):
            cluster = "GAN_TECH"
        elif "charger" in ql or "charging" in ql:
            cluster = "CHARGER"
        else:
            cluster = "OTHER"

        flag = ""
        if ctr == 0 and impr >= 30:
            flag = " [!] ZERO-CLICK"
        elif impr >= 50 and ctr < 0.01:
            flag = " [!] LOW CTR"

        print(f"  {i:>3} {q:<65} {impr:>7,} {c:>6} {ctr*100:>6.2f}% {pos:>5.1f}  {cluster:<30}{flag}")

    # =========================================================================
    # 3. BEFORE/AFTER SPLIT (July 15 - Aug 6 vs Aug 7 - Aug 12)
    # =========================================================================
    print("\n" + "=" * 100)
    print("  BEFORE vs AFTER SNIPPET OPTIMIZATION (Aug 7 deploy)")
    print("=" * 100)

    # Pre-optimization: July 15 - Aug 6
    pre = query_with_retry(gsc, {
        "startDate": "2026-07-15",
        "endDate": "2026-08-06",
        "dimensions": ["query"],
        "dimensionFilterGroups": [{
            "filters": [{"dimension": "page", "operator": "equals", "expression": PAGE_URL}],
        }],
        "rowLimit": 5000,
    })

    # Post-optimization: Aug 7 - Aug 12
    post = query_with_retry(gsc, {
        "startDate": "2026-08-07",
        "endDate": "2026-08-12",
        "dimensions": ["query"],
        "dimensionFilterGroups": [{
            "filters": [{"dimension": "page", "operator": "equals", "expression": PAGE_URL}],
        }],
        "rowLimit": 5000,
    })

    pre_lookup = {r["keys"][0]: r for r in pre.get("rows", [])}
    post_lookup = {r["keys"][0]: r for r in post.get("rows", [])}

    # Pre totals
    pre_clicks = sum(r["clicks"] for r in pre.get("rows", []))
    pre_impr = sum(r["impressions"] for r in pre.get("rows", []))
    pre_ctr = pre_clicks / pre_impr if pre_impr > 0 else 0
    pre_pos = sum(r["position"] * r["impressions"] for r in pre.get("rows", [])) / pre_impr if pre_impr > 0 else 0

    # Post totals
    post_clicks = sum(r["clicks"] for r in post.get("rows", []))
    post_impr = sum(r["impressions"] for r in post.get("rows", []))
    post_ctr = post_clicks / post_impr if post_impr > 0 else 0
    post_pos = sum(r["position"] * r["impressions"] for r in post.get("rows", [])) / post_impr if post_impr > 0 else 0

    print(f"\n  {'Period':<30} {'Days':>8} {'Clicks':>7} {'Impr':>8} {'CTR':>8} {'Pos':>6}")
    print(f"  {'─'*30} {'─'*8} {'─'*7} {'─'*8} {'─'*8} {'─'*6}")
    print(f"  {'Pre-opt (Jul 15 - Aug 6)':<30} {23:>8} {pre_clicks:>7} {pre_impr:>8,} {pre_ctr*100:>7.2f}% {pre_pos:>6.1f}")
    print(f"  {'Post-opt (Aug 7 - Aug 12)':<30} {6:>8} {post_clicks:>7} {post_impr:>8,} {post_ctr*100:>7.2f}% {post_pos:>6.1f}")
    print(f"  {'Delta':<30} {'':>8} {post_clicks-pre_clicks:>+7} {post_impr-pre_impr:>+8,} {post_ctr*100-pre_ctr*100:>+7.2f}pp {post_pos-pre_pos:>+6.1f}")

    # =========================================================================
    # 4. QUERY BY QUERY BEFORE/AFTER (top queries by total impressions)
    # =========================================================================
    print("\n" + "─" * 100)
    print("  QUERY-BY-QUERY BEFORE/AFTER (queries with ≥10 total impressions)")
    print("─" * 100)

    # Build combined query list
    all_query_names = set(list(pre_lookup.keys()) + list(post_lookup.keys()))
    combined = []
    for q in all_query_names:
        pre_r = pre_lookup.get(q, {"clicks": 0, "impressions": 0, "position": 99})
        post_r = post_lookup.get(q, {"clicks": 0, "impressions": 0, "position": 99})
        total_impr = pre_r.get("impressions", 0) + post_r.get("impressions", 0)
        if total_impr >= 10:
            combined.append((q, pre_r, post_r, total_impr))

    combined.sort(key=lambda x: x[3], reverse=True)

    print(f"  {'Query':<60} {'Pre Impr':>9} {'Pre CTR':>7} {'Pre Pos':>7} | {'Post Impr':>9} {'Post CTR':>7} {'Post Pos':>7} | {'CTR Δ':>7} {'Pos Δ':>6}")
    print(f"  {'─'*60} {'─'*9} {'─'*7} {'─'*7} | {'─'*9} {'─'*7} {'─'*7} | {'─'*7} {'─'*6}")

    for q, pre_r, post_r, _ in combined:
        q_short = sanitize(q[:60])
        pre_i = pre_r.get("impressions", 0)
        pre_c = pre_r.get("clicks", 0)
        pre_ctr_val = pre_c / pre_i if pre_i > 0 else 0
        pre_p = pre_r.get("position", 99)

        post_i = post_r.get("impressions", 0)
        post_c = post_r.get("clicks", 0)
        post_ctr_val = post_c / post_i if post_i > 0 else 0
        post_p = post_r.get("position", 99)

        ctr_delta = post_ctr_val - pre_ctr_val
        pos_delta = post_p - pre_p  # positive = worse ranking

        flag = ""
        if ctr_delta < -0.005 and post_i >= 5:
            flag = " [DOWN] CTR"
        elif ctr_delta > 0.005 and post_i >= 5:
            flag = " [UP] CTR"
        if pos_delta > 2 and post_i >= 5:
            flag += " [DROP] RANK"

        print(f"  {q_short:<60} {pre_i:>9,} {pre_ctr_val*100:>6.2f}% {pre_p:>6.1f} | {post_i:>9,} {post_ctr_val*100:>6.2f}% {post_p:>6.1f} | {ctr_delta*100:>+6.2f}pp {pos_delta:>+5.1f}{flag}")

    # =========================================================================
    # 5. NEW QUERIES POST-OPT (queries that appeared only after optimization)
    # =========================================================================
    print("\n" + "─" * 100)
    print("  NEW QUERIES AFTER OPTIMIZATION (present only in post-opt period)")
    print("─" * 100)

    new_queries = [(q, post_lookup[q]) for q in post_lookup if q not in pre_lookup]
    new_queries.sort(key=lambda x: x[1]["impressions"], reverse=True)

    if new_queries:
        print(f"  {'Query':<70} {'Impr':>7} {'Click':>6} {'CTR':>7} {'Pos':>5}")
        print(f"  {'─'*70} {'─'*7} {'─'*6} {'─'*7} {'─'*5}")
        for q, r in new_queries[:20]:
            ctr = r["clicks"] / r["impressions"] if r["impressions"] > 0 else 0
            print(f"  {sanitize(q[:70]):<70} {r['impressions']:>7,} {r['clicks']:>6} {ctr*100:>6.2f}% {r['position']:>5.1f}")
        print(f"\n  Total new queries: {len(new_queries)}")
    else:
        print("  No new queries found.")

    # =========================================================================
    # 6. LOST QUERIES (present pre-opt but gone post-opt)
    # =========================================================================
    print("\n" + "─" * 100)
    print("  LOST QUERIES (present pre-opt, gone post-opt)")
    print("─" * 100)

    lost_queries = [(q, pre_lookup[q]) for q in pre_lookup if q not in post_lookup]
    lost_queries.sort(key=lambda x: x[1]["impressions"], reverse=True)

    if lost_queries:
        print(f"  {'Query':<70} {'Impr':>7} {'Click':>6} {'CTR':>7} {'Pos':>5}")
        print(f"  {'─'*70} {'─'*7} {'─'*6} {'─'*7} {'─'*5}")
        for q, r in lost_queries[:20]:
            ctr = r["clicks"] / r["impressions"] if r["impressions"] > 0 else 0
            print(f"  {sanitize(q[:70]):<70} {r['impressions']:>7,} {r['clicks']:>6} {ctr*100:>6.2f}% {r['position']:>5.1f}")
        print(f"\n  Total lost queries: {len(lost_queries)}")
    else:
        print("  No lost queries found.")

    # =========================================================================
    # 7. SNIPPET-TARGET QUERIES CLOSE-UP (gan 2 vs 3, gan vs gan ii, gan ii vs iii)
    # =========================================================================
    print("\n" + "=" * 100)
    print("  SNIPPET-TARGET QUERIES CLOSE-UP (the 3 H3s we optimized for)")
    print("=" * 100)

    target_queries = [
        "gan 2 vs gan 3",
        "gan vs gan ii",
        "gan ii vs gan iii",
        "gan 3 vs gan 2",
        "gan2 vs gan3",
        "gan ii vs gan 2",
    ]

    for tq in target_queries:
        pre_r = pre_lookup.get(tq, None)
        post_r = post_lookup.get(tq, None)

        pre_str = f"{pre_r['impressions']:>5} impr  CTR={pre_r['clicks']/max(pre_r['impressions'],1)*100:.1f}%  Pos={pre_r['position']:.1f}" if pre_r else "  NOT RANKING"
        post_str = f"{post_r['impressions']:>5} impr  CTR={post_r['clicks']/max(post_r['impressions'],1)*100:.1f}%  Pos={post_r['position']:.1f}" if post_r else "  NOT RANKING"

        print(f"  {tq:<30}  PRE: {pre_str}  |  POST: {post_str}")

    # =========================================================================
    # 8. DAILY TREND FOR THIS PAGE
    # =========================================================================
    print("\n" + "─" * 100)
    print("  DAILY CTR TREND — gan-generations-guide")
    print("─" * 100)

    daily_page = query_with_retry(gsc, {
        "startDate": start_28,
        "endDate": end,
        "dimensions": ["date"],
        "dimensionFilterGroups": [{
            "filters": [{"dimension": "page", "operator": "equals", "expression": PAGE_URL}],
        }],
        "rowLimit": 100,
    })

    daily_rows = sorted(daily_page.get("rows", []), key=lambda r: r["keys"][0])
    print(f"  {'Date':<12} {'Clicks':>7} {'Impr':>8} {'CTR':>7} {'Pos':>6}")
    print(f"  {'─'*12} {'─'*7} {'─'*8} {'─'*7} {'─'*6}")
    for r in daily_rows:
        d = r["keys"][0]
        ctr = r["clicks"] / r["impressions"] if r["impressions"] > 0 else 0
        flag = " <-- SNIPPET OPT" if d == "2026-08-07" else ""
        print(f"  {d:<12} {r['clicks']:>7} {r['impressions']:>8,} {ctr*100:>6.2f}% {r['position']:>6.1f}{flag}")

    # Check pre vs post daily averages
    pre_daily = [r for r in daily_rows if r["keys"][0] < "2026-08-07"]
    post_daily = [r for r in daily_rows if r["keys"][0] >= "2026-08-07"]

    if pre_daily and post_daily:
        pre_avg_ctr = sum(r["clicks"] for r in pre_daily) / max(sum(r["impressions"] for r in pre_daily), 1)
        post_avg_ctr = sum(r["clicks"] for r in post_daily) / max(sum(r["impressions"] for r in post_daily), 1)
        pre_avg_impr = sum(r["impressions"] for r in pre_daily) / len(pre_daily)
        post_avg_impr = sum(r["impressions"] for r in post_daily) / len(post_daily)
        print(f"\n  Pre-opt daily avg:  {pre_avg_impr:,.0f} impr/day  CTR={pre_avg_ctr*100:.2f}%")
        print(f"  Post-opt daily avg: {post_avg_impr:,.0f} impr/day  CTR={post_avg_ctr*100:.2f}%")
        print(f"  Impr/day change:    {(post_avg_impr/pre_avg_impr - 1)*100:+.1f}%")
        print(f"  CTR change:         {(post_avg_ctr - pre_avg_ctr)*100:+.2f}pp")

    print("\n" + "=" * 100)


if __name__ == "__main__":
    main()
