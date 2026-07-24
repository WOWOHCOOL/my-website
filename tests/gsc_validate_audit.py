"""
Cross-validate B2B audit scores against real Google Search Console performance data.
Fetches clicks/impressions/CTR/position for all 28 EN blog URLs.
"""
import sys, io, os, json
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

from google.oauth2 import service_account
from google.auth.transport.requests import Request
import requests
from datetime import datetime, timedelta

# ── GSC API Setup ──
SITE_URL = "sc-domain:wowohcool.com"
CRED_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "credentials", "gsc-credentials.json")

creds = service_account.Credentials.from_service_account_file(
    CRED_PATH,
    scopes=["https://www.googleapis.com/auth/webmasters.readonly"],
)
creds.refresh(Request())

API_BASE = "https://www.googleapis.com/webmasters/v3/sites"

# ── Load B2B audit results ──
audit_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "audits", "bulk-audit-all-articles-2026-07-22.json")
with open(audit_path, 'r', encoding='utf-8') as f:
    audit_results = json.load(f)

# ── Fetch GSC data: last 90 days per URL ──
end_date = datetime.now().strftime("%Y-%m-%d")
start_date = (datetime.now() - timedelta(days=90)).strftime("%Y-%m-%d")

print(f"Fetching GSC data: {start_date} → {end_date}")
print(f"Site: {SITE_URL}")
print()

results = []

for article in audit_results:
    slug = article['slug']
    url = f"https://www.wowohcool.com/blog/{slug}/"

    # Query GSC for this URL
    body = {
        "startDate": start_date,
        "endDate": end_date,
        "dimensions": ["page"],
        "dimensionFilterGroups": [{
            "filters": [{
                "dimension": "page",
                "operator": "equals",
                "expression": url
            }]
        }],
        "rowLimit": 1
    }

    try:
        resp = requests.post(
            f"{API_BASE}/{SITE_URL}/searchAnalytics/query",
            headers={
                "Authorization": f"Bearer {creds.token}",
                "Content-Type": "application/json",
            },
            json=body,
            timeout=30
        )
        data = resp.json()

        clicks = 0
        impressions = 0
        ctr = 0.0
        position = 0.0

        if 'rows' in data and len(data['rows']) > 0:
            row = data['rows'][0]
            clicks = row.get('clicks', 0)
            impressions = row.get('impressions', 0)
            ctr = row.get('ctr', 0.0) * 100
            position = row.get('position', 0.0)

        results.append({
            'slug': slug,
            'b2b_score': article['b2b_score'],
            'ig_score': article['ig_score'],
            'words': article['words'],
            'type': article['type'],
            'clicks': clicks,
            'impressions': impressions,
            'ctr': ctr,
            'position': position,
        })
    except Exception as e:
        results.append({
            'slug': slug,
            'b2b_score': article['b2b_score'],
            'ig_score': article['ig_score'],
            'words': article['words'],
            'type': article['type'],
            'clicks': -1, 'impressions': -1, 'ctr': -1, 'position': -1,
            'error': str(e)
        })

# ── Analysis ──
# Split into high (B2B >= 70) vs low (B2B < 65)
high = [r for r in results if r['b2b_score'] >= 70 and r['impressions'] > 0]
mid = [r for r in results if 65 <= r['b2b_score'] < 70 and r['impressions'] > 0]
low = [r for r in results if r['b2b_score'] < 65 and r['impressions'] > 0]

def avg(lst, key):
    vals = [r[key] for r in lst if r.get(key, -1) >= 0]
    return sum(vals)/len(vals) if vals else 0

print("=" * 75)
print("  GSC PERFORMANCE BY B2B SCORE TIER (Last 90 Days)")
print("=" * 75)
print(f"  {'Tier':<20} {'Articles':>8} {'Avg Clicks':>10} {'Avg Impr':>10} {'Avg CTR':>8} {'Avg Pos':>8}")
print(f"  {'─'*20} {'─'*8} {'─'*10} {'─'*10} {'─'*8} {'─'*8}")

for label, group in [("High (B2B >= 70)", high), ("Mid (65-69)", mid), ("Low (B2B < 65)", low)]:
    if group:
        avg_clicks = avg(group, 'clicks')
        avg_imp = avg(group, 'impressions')
        avg_ctr = avg(group, 'ctr')
        avg_pos = avg(group, 'position')
        print(f"  {label:<20} {len(group):>8} {avg_clicks:>10.1f} {avg_imp:>10.0f} {avg_ctr:>7.1f}% {avg_pos:>7.1f}")
    else:
        print(f"  {label:<20} {0:>8} {'—':>10} {'—':>10} {'—':>8} {'—':>8}")

# ── Correlation ──
valid = [r for r in results if r['impressions'] > 0]
if len(valid) >= 10:
    n = len(valid)
    b2b_scores = [r['b2b_score'] for r in valid]
    impressions = [r['impressions'] for r in valid]
    clicks = [r['clicks'] for r in valid]
    ctrs = [r['ctr'] for r in valid]
    positions = [r['position'] for r in valid]

    def pearson(xs, ys):
        mx = sum(xs)/len(xs)
        my = sum(ys)/len(ys)
        num = sum((xs[i]-mx)*(ys[i]-my) for i in range(len(xs)))
        dx = (sum((x-mx)**2 for x in xs)/len(xs))**0.5
        dy = (sum((y-my)**2 for y in ys)/len(ys))**0.5
        return num/(len(xs)*dx*dy) if dx*dy > 0 else 0

    print()
    print("─" * 75)
    print("  CORRELATION: B2B Audit Score vs GSC Metrics")
    print("─" * 75)
    for metric_name, metric_data in [("Impressions", impressions), ("Clicks", clicks), ("CTR", ctrs), ("Avg Position", [-p for p in positions])]:  # negate position so higher=better
        r = pearson(b2b_scores, metric_data)
        bar = "▓" * int(abs(r) * 20) + "░" * (20 - int(abs(r) * 20))
        direction = "✅ positive (higher B2B → better)" if r > 0.15 else ("⚠️ negative (unexpected)" if r < -0.15 else "⚪ neutral (independent dimensions)")
        print(f"  B2B ↔ {metric_name:<15} r={r:+.3f} {bar} {direction}")

# ── Leaderboard: B2B score + GSC ──
print()
print("─" * 75)
print("  FULL LEADERBOARD: B2B Score + GSC Performance")
print("─" * 75)
print(f"  {'#':>3} {'Article':<42} {'B2B':>5} {'IG':>4} {'Clicks':>7} {'Impr':>7} {'CTR':>6} {'Pos':>5}")
print(f"  {'─'*3} {'─'*42} {'─'*5} {'─'*4} {'─'*7} {'─'*7} {'─'*6} {'─'*5}")

# Sort by B2B score descending
results.sort(key=lambda r: r['b2b_score'], reverse=True)
for i, r in enumerate(results, 1):
    slug = r['slug'][:40]
    if r['impressions'] <= 0:
        clicks_s = '     —'
        impr_s = '     —'
        ctr_s = '    —'
        pos_s = '   —'
    else:
        clicks_s = f'{r["clicks"]:>7.0f}'
        impr_s = f'{r["impressions"]:>7.0f}'
        ctr_s = f'{r["ctr"]:>5.1f}%'
        pos_s = f'{r["position"]:>5.1f}'
    print(f"  {i:>3} {slug:<42} {r['b2b_score']:>5.0f} {r['ig_score']:>4.0f} {clicks_s} {impr_s} {ctr_s} {pos_s}")

# ── Save results ──
out_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "audits", "gsc-b2b-validation-2026-07-22.json")
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(results, f, indent=2, ensure_ascii=False)
print(f"\nResults saved to: {out_path}")
