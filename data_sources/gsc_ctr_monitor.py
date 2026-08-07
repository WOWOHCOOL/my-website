"""
GSC CTR Monitor -- Track CTR changes over time, compare before/after optimization.

Usage:
  # Baseline snapshot (run after optimization)
  python data_sources/gsc_ctr_monitor.py --snapshot --label "after-p1-optimization"

  # Compare two snapshots
  python data_sources/gsc_ctr_monitor.py --compare

  # Quick check: last 3 days CTR for key pages
  python data_sources/gsc_ctr_monitor.py --quick
"""

import argparse
import json
import os
import sys
from datetime import datetime, timedelta

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
sys.path.insert(0, os.path.join(os.path.dirname(__file__)))

from dotenv import load_dotenv
load_dotenv(os.path.join(os.path.dirname(__file__), "config", ".env"))

SNAPSHOT_DIR = os.path.join(os.path.dirname(__file__), "gsc_snapshots")
os.makedirs(SNAPSHOT_DIR, exist_ok=True)


def take_snapshot(label="snapshot"):
    """Take a full GSC snapshot of key metrics."""
    from modules.google_search_console import GoogleSearchConsole
    gsc = GoogleSearchConsole()

    end = datetime.now().strftime("%Y-%m-%d")
    start = (datetime.now() - timedelta(days=28)).strftime("%Y-%m-%d")

    print(f"Taking snapshot: {label}")
    print(f"Date range: {start} to {end}")

    # Overall stats
    overall = gsc._query({"startDate": start, "endDate": end, "dimensions": []})
    row = overall.get("rows", [{}])[0] if overall.get("rows") else {}

    # Top pages
    pages = gsc._query({
        "startDate": start, "endDate": end,
        "dimensions": ["page"], "rowLimit": 100,
    })

    # Top queries
    queries = gsc._query({
        "startDate": start, "endDate": end,
        "dimensions": ["query"], "rowLimit": 100,
    })

    # Position band breakdown
    pos_bands = {"1-3": 0, "4-10": 0, "11-20": 0, "21-50": 0, "50+": 0}
    pos_clicks = {"1-3": 0, "4-10": 0, "11-20": 0, "21-50": 0, "50+": 0}
    pos_impr = {"1-3": 0, "4-10": 0, "11-20": 0, "21-50": 0, "50+": 0}
    for r in queries.get("rows", []):
        p = r["position"]
        if p <= 3: b = "1-3"
        elif p <= 10: b = "4-10"
        elif p <= 20: b = "11-20"
        elif p <= 50: b = "21-50"
        else: b = "50+"
        pos_bands[b] += 1
        pos_clicks[b] += r["clicks"]
        pos_impr[b] += r["impressions"]

    # Key pages (the worst-CTR ones)
    key_slugs = [
        "/blog/import-costs-guide/",
        "/blog/certifications-us-eu-guide/",
        "/blog/gan-generations-guide/",
        "/blog/top-power-bank-manufacturers-china/",
        "/blog/charger-safety-standards/",
        "/blog/gan-vs-silicon-charger-comparison/",
    ]
    key_pages = {}
    for slug in key_slugs:
        data = gsc._query({
            "startDate": start, "endDate": end,
            "dimensions": ["page"],
            "dimensionFilterGroups": [{
                "filters": [{"dimension": "page", "operator": "contains", "expression": slug}],
            }],
        })
        if data.get("rows"):
            r = data["rows"][0]
            key_pages[slug] = {
                "clicks": r["clicks"],
                "impressions": r["impressions"],
                "ctr": round(r["ctr"] * 100, 2),
                "position": round(r["position"], 1),
            }

    snapshot = {
        "label": label,
        "date_range": {"start": start, "end": end},
        "taken_at": datetime.now().isoformat(),
        "overall": {
            "clicks": row.get("clicks", 0),
            "impressions": row.get("impressions", 0),
            "ctr": round(row.get("ctr", 0) * 100, 2),
            "position": round(row.get("position", 0), 1),
        },
        "position_bands": {
            b: {
                "queries": pos_bands[b],
                "clicks": pos_clicks[b],
                "impressions": pos_impr[b],
                "ctr": round(pos_clicks[b] / pos_impr[b] * 100, 2) if pos_impr[b] > 0 else 0,
            }
            for b in pos_bands
        },
        "key_pages": key_pages,
        "top_pages": [
            {
                "url": r["keys"][0],
                "clicks": r["clicks"],
                "impressions": r["impressions"],
                "ctr": round(r["ctr"] * 100, 2),
                "position": round(r["position"], 1),
            }
            for r in pages.get("rows", [])[:20]
        ],
    }

    filename = f"{label}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
    filepath = os.path.join(SNAPSHOT_DIR, filename)
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(snapshot, f, indent=2, ensure_ascii=False)

    print(f"Snapshot saved: {filepath}")
    print(f"  Overall CTR: {snapshot['overall']['ctr']}%")
    print(f"  Overall clicks/impressions: {snapshot['overall']['clicks']}/{snapshot['overall']['impressions']}")
    return filepath


def compare_snapshots():
    """Compare the two most recent snapshots."""
    files = sorted(
        [f for f in os.listdir(SNAPSHOT_DIR) if f.endswith(".json")],
        reverse=True,
    )
    if len(files) < 2:
        print(f"Need at least 2 snapshots. Found {len(files)} in {SNAPSHOT_DIR}")
        return

    latest_path = os.path.join(SNAPSHOT_DIR, files[0])
    previous_path = os.path.join(SNAPSHOT_DIR, files[1])

    with open(latest_path, encoding="utf-8") as f:
        latest = json.load(f)
    with open(previous_path, encoding="utf-8") as f:
        previous = json.load(f)

    print("=" * 70)
    print(f"  CTR CHANGE: {previous['label']} -> {latest['label']}")
    print(f"  {previous['date_range']['start']}..{previous['date_range']['end']} -> {latest['date_range']['start']}..{latest['date_range']['end']}")
    print("=" * 70)

    # Overall
    o1, o2 = previous["overall"], latest["overall"]
    ctr_diff = o2["ctr"] - o1["ctr"]
    arrow = "[UP]" if ctr_diff > 0 else "[DOWN]" if ctr_diff < 0 else "[SAME]"
    print(f"\n  Overall CTR:  {o1['ctr']}% -> {o2['ctr']}% ({ctr_diff:+.2f}pp) {arrow}")
    print(f"  Impressions:  {o1['impressions']:,} -> {o2['impressions']:,} ({(o2['impressions']/max(o1['impressions'],1)-1)*100:+.1f}%)")
    print(f"  Clicks:       {o1['clicks']:,} -> {o2['clicks']:,} ({(o2['clicks']/max(o1['clicks'],1)-1)*100:+.1f}%)")

    # Position bands
    print(f"\n  {'Band':<10} {'CTR Before':>10} {'CTR After':>10} {'Change':>10}")
    print(f"  {'-'*10} {'-'*10} {'-'*10} {'-'*10}")
    for b in ["1-3", "4-10", "11-20", "21-50", "50+"]:
        c1 = previous["position_bands"].get(b, {}).get("ctr", 0)
        c2 = latest["position_bands"].get(b, {}).get("ctr", 0)
        diff = c2 - c1
        print(f"  {b:<10} {c1:>9.2f}% {c2:>9.2f}% {diff:>+9.2f}pp")

    # Key pages
    if previous.get("key_pages"):
        print(f"\n  Key Pages:")
        print(f"  {'Page':<55} {'CTR Before':>10} {'CTR After':>10} {'Change':>10}")
        print(f"  {'-'*55} {'-'*10} {'-'*10} {'-'*10}")
        for slug in previous["key_pages"]:
            p1 = previous["key_pages"].get(slug, {})
            p2 = latest["key_pages"].get(slug, {})
            c1 = p1.get("ctr", 0)
            c2 = p2.get("ctr", 0)
            diff = c2 - c1
            arrow = " [+]" if diff > 0.5 else " [-]" if diff < -0.5 else ""
            print(f"  {slug:<55} {c1:>9.2f}% {c2:>9.2f}% {diff:>+9.2f}pp{arrow}")


def quick_check():
    """Quick check of last 3 days CTR for key pages."""
    from modules.google_search_console import GoogleSearchConsole
    gsc = GoogleSearchConsole()

    for days in [28, 7, 3]:
        start = (datetime.now() - timedelta(days=days)).strftime("%Y-%m-%d")
        end = datetime.now().strftime("%Y-%m-%d")
        data = gsc._query({"startDate": start, "endDate": end, "dimensions": []})
        row = data.get("rows", [{}])[0] if data.get("rows") else {}
        ctr = row.get("ctr", 0) * 100
        print(f"  Last {days:>2}d:  CTR={ctr:.2f}%  Clicks={row.get('clicks',0):,}  Impr={row.get('impressions',0):,}  Pos={row.get('position',0):.1f}")

    # Daily last 7 days
    print(f"\n  {'Date':<12} {'CTR':>7} {'Clicks':>7} {'Impr':>8} {'Pos':>6}")
    daily = gsc._query({
        "startDate": (datetime.now() - timedelta(days=7)).strftime("%Y-%m-%d"),
        "endDate": datetime.now().strftime("%Y-%m-%d"),
        "dimensions": ["date"],
    })
    for r in sorted(daily.get("rows", []), key=lambda x: x["keys"][0]):
        d = r["keys"][0]
        print(f"  {d:<12} {r['ctr']*100:>6.2f}% {r['clicks']:>7,} {r['impressions']:>8,} {r['position']:>6.1f}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="GSC CTR Monitor")
    parser.add_argument("--snapshot", action="store_true", help="Take a snapshot")
    parser.add_argument("--label", default="snapshot", help="Snapshot label")
    parser.add_argument("--compare", action="store_true", help="Compare last two snapshots")
    parser.add_argument("--quick", action="store_true", help="Quick check last 3/7/28 days")
    args = parser.parse_args()

    if args.snapshot:
        take_snapshot(args.label)
    elif args.compare:
        compare_snapshots()
    elif args.quick:
        quick_check()
    else:
        # Default: take snapshot + show comparison if available
        take_snapshot("auto")
        files = [f for f in os.listdir(SNAPSHOT_DIR) if f.endswith(".json")]
        if len(files) >= 2:
            print("\n")
            compare_snapshots()
