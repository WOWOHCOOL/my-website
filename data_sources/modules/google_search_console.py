"""
Google Search Console Data Integration

Fetches search performance, keyword rankings, and SERP data.
Uses direct REST API via requests (with proxy support) instead of googleapiclient.
"""

import os
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any
from urllib.parse import quote

import requests
from google.oauth2 import service_account
from google.auth.transport.requests import Request as GARequest

API_BASE = "https://www.googleapis.com/webmasters/v3/sites"


class GoogleSearchConsole:
    """Google Search Console data fetcher (requests-based, proxy-friendly)."""

    def __init__(
        self,
        site_url: Optional[str] = None,
        credentials_path: Optional[str] = None,
    ):
        self.site_url = site_url or os.getenv("GSC_SITE_URL")
        credentials_path = credentials_path or os.getenv("GSC_CREDENTIALS_PATH")

        if not self.site_url:
            raise ValueError("GSC_SITE_URL must be provided or set in environment")
        if not credentials_path or not os.path.exists(credentials_path):
            raise ValueError(f"Credentials file not found: {credentials_path}")

        # --- credentials ---
        self._credentials = service_account.Credentials.from_service_account_file(
            credentials_path,
            scopes=["https://www.googleapis.com/auth/webmasters.readonly"],
        )

        # --- requests session with proxy ---
        self._session = requests.Session()
        proxy = os.getenv("HTTPS_PROXY") or os.getenv("https_proxy") or os.getenv("HTTP_PROXY") or os.getenv("http_proxy")
        if proxy:
            self._session.proxies = {"https": proxy, "http": proxy}

        # Build the API base URL including site
        self._api_url = f"{API_BASE}/{quote(self.site_url, safe='')}/searchAnalytics/query"

    def _ensure_token(self):
        """Refresh the access token if needed (uses proxy-configured session)."""
        self._credentials.refresh(GARequest(session=self._session))

    def _query(self, body: dict) -> dict:
        """Execute a searchAnalytics query against the GSC REST API."""
        self._ensure_token()
        resp = self._session.post(
            self._api_url,
            headers={
                "Authorization": f"Bearer {self._credentials.token}",
                "Content-Type": "application/json",
            },
            json=body,
            timeout=60,
        )
        resp.raise_for_status()
        return resp.json()

    # -------------------------------------------------------------------
    # Public methods (same interface as before)
    # -------------------------------------------------------------------

    def get_keyword_positions(self, days: int = 30, limit: int = 1000) -> List[Dict[str, Any]]:
        start = (datetime.now() - timedelta(days=days)).strftime("%Y-%m-%d")
        end = datetime.now().strftime("%Y-%m-%d")

        data = self._query({
            "startDate": start,
            "endDate": end,
            "dimensions": ["query"],
            "rowLimit": limit,
        })

        results = []
        for row in data.get("rows", []):
            results.append({
                "query": row["keys"][0],
                "clicks": row["clicks"],
                "impressions": row["impressions"],
                "ctr": row["ctr"],
                "position": round(row["position"], 1),
                "ctr": row["ctr"],
            })
        results.sort(key=lambda x: x["impressions"], reverse=True)
        return results

    def get_quick_wins(
        self,
        days: int = 30,
        position_min: int = 11,
        position_max: int = 20,
        min_impressions: int = 50,
        prioritize_commercial: bool = True,
    ) -> List[Dict[str, Any]]:
        all_keywords = self.get_keyword_positions(days=days)
        quick_wins = []
        for kw in all_keywords:
            if not (position_min <= kw["position"] <= position_max):
                continue
            if kw["impressions"] < min_impressions:
                continue
            commercial = self._calculate_commercial_intent(kw["keyword"].lower())
            distance = kw["position"] - 10
            base = kw["impressions"] / (distance + 1)
            score = base * commercial if prioritize_commercial else base
            quick_wins.append({
                **kw,
                "commercial_intent": commercial,
                "commercial_intent_category": self._get_intent_category(commercial),
                "opportunity_score": round(score, 2),
                "priority": "high" if kw["position"] <= 15 else "medium",
            })
        quick_wins.sort(key=lambda x: x["opportunity_score"], reverse=True)
        return quick_wins

    def get_page_performance(self, url: str, days: int = 30) -> Dict[str, Any]:
        start = (datetime.now() - timedelta(days=days)).strftime("%Y-%m-%d")
        end = datetime.now().strftime("%Y-%m-%d")
        op = "equals" if url.startswith("http") else "contains"

        # Page-level aggregate
        data = self._query({
            "startDate": start,
            "endDate": end,
            "dimensions": ["page"],
            "dimensionFilterGroups": [{
                "filters": [{"dimension": "page", "operator": op, "expression": url}],
            }],
        })
        if not data.get("rows"):
            return {"url": url, "error": "No data found"}

        row = data["rows"][0]
        result = {
            "url": row["keys"][0],
            "clicks": row["clicks"],
            "impressions": row["impressions"],
            "ctr": round(row["ctr"] * 100, 2),
            "avg_position": round(row["position"], 1),
        }

        # Keywords for this page
        kw_data = self._query({
            "startDate": start,
            "endDate": end,
            "dimensions": ["query"],
            "dimensionFilterGroups": [{
                "filters": [{"dimension": "page", "operator": op, "expression": url}],
            }],
            "rowLimit": 50,
        })
        keywords = []
        for r in kw_data.get("rows", []):
            keywords.append({
                "query": r["keys"][0],
                "clicks": r["clicks"],
                "impressions": r["impressions"],
                "ctr": r["ctr"],
                "position": round(r["position"], 1),
            })
        keywords.sort(key=lambda x: x["clicks"], reverse=True)
        result["top_keywords"] = keywords[:10]
        return result

    def get_low_ctr_pages(
        self,
        days: int = 30,
        ctr_threshold: float = 0.03,
        min_impressions: int = 100,
        path_filter: Optional[str] = "/blog/",
    ) -> List[Dict[str, Any]]:
        start = (datetime.now() - timedelta(days=days)).strftime("%Y-%m-%d")
        end = datetime.now().strftime("%Y-%m-%d")

        body = {
            "startDate": start,
            "endDate": end,
            "dimensions": ["page"],
            "rowLimit": 1000,
        }
        if path_filter:
            body["dimensionFilterGroups"] = [{
                "filters": [{"dimension": "page", "operator": "contains", "expression": path_filter}],
            }]

        data = self._query(body)
        low_ctr = []
        for row in data.get("rows", []):
            if row["impressions"] >= min_impressions and row["ctr"] < ctr_threshold:
                target_ctr = 0.05
                potential = int(row["impressions"] * target_ctr)
                missed = potential - row["clicks"]
                low_ctr.append({
                    "url": row["keys"][0],
                    "impressions": row["impressions"],
                    "clicks": row["clicks"],
                    "ctr": round(row["ctr"] * 100, 2),
                    "avg_position": round(row["position"], 1),
                    "potential_clicks": potential,
                    "missed_clicks": missed,
                    "priority": "high" if missed > 50 else "medium",
                })
        low_ctr.sort(key=lambda x: x["missed_clicks"], reverse=True)
        return low_ctr

    def get_trending_queries(
        self,
        days_recent: int = 7,
        days_comparison: int = 30,
        min_impressions: int = 20,
    ) -> List[Dict[str, Any]]:
        now = datetime.now()
        recent = self._query({
            "startDate": (now - timedelta(days=days_recent)).strftime("%Y-%m-%d"),
            "endDate": now.strftime("%Y-%m-%d"),
            "dimensions": ["query"],
            "rowLimit": 1000,
        })
        comparison = self._query({
            "startDate": (now - timedelta(days=days_comparison)).strftime("%Y-%m-%d"),
            "endDate": (now - timedelta(days=days_recent)).strftime("%Y-%m-%d"),
            "dimensions": ["query"],
            "rowLimit": 1000,
        })
        lookup = {r["keys"][0]: r["impressions"] for r in comparison.get("rows", [])}

        trending = []
        for row in recent.get("rows", []):
            q = row["keys"][0]
            impr = row["impressions"]
            if impr < min_impressions:
                continue
            prev = lookup.get(q, 0)
            change = ((impr - prev) / prev * 100) if prev > 0 else 100
            if change > 20:
                trending.append({
                    "query": q,
                    "recent_impressions": impr,
                    "previous_impressions": prev,
                    "change_percent": round(change, 1),
                    "clicks": row["clicks"],
                    "position": round(row["position"], 1),
                })
        trending.sort(key=lambda x: x["change_percent"], reverse=True)
        return trending

    def get_position_changes(
        self, days_recent: int = 7, days_comparison: int = 30
    ) -> Dict[str, List[Dict[str, Any]]]:
        recent_data = self.get_keyword_positions(days=days_recent)
        comparison_data = self.get_keyword_positions(days=days_comparison)
        lookup = {kw["keyword"]: kw["position"] for kw in comparison_data}

        improved, declined, stable = [], [], []
        for kw in recent_data:
            prev = lookup.get(kw["keyword"])
            if prev is None:
                continue
            change = prev - kw["position"]  # positive = improved
            entry = {**kw, "previous_position": prev, "position_change": round(change, 1)}
            if change >= 2:
                improved.append(entry)
            elif change <= -2:
                declined.append(entry)
            else:
                stable.append(entry)

        improved.sort(key=lambda x: x["position_change"], reverse=True)
        declined.sort(key=lambda x: x["position_change"])
        return {"improved": improved, "declined": declined, "stable": stable}

    # -------------------------------------------------------------------
    # Intent scoring (unchanged)
    # -------------------------------------------------------------------

    def _calculate_commercial_intent(self, keyword: str) -> float:
        k = keyword.lower()
        low = ["who is", "biography", "age", "net worth", "height", "wife", "husband",
               "dating", "married", "death", "died", "born", "pewdiepie", "celebrity", "famous"]
        for t in low:
            if t in k:
                return 0.1
        high = ["pricing", "price", "cost", "buy", "purchase", "vs", "versus",
                "alternative", "alternatives", "best", "top", "review", "reviews",
                "comparison", "compare", "plan", "trial", "free trial",
                "discount", "coupon", "deal", "hosting", "service", "services",
                "platform", "software", "tool", "tools", "solution", "solutions",
                "provider", "providers", "manufacturer", "supplier", "oem", "odm", "wholesale"]
        for t in high:
            if t in k:
                return 3.0
        med_high = ["how to", "guide", "tutorial", "tips", "strategies", "examples",
                    "ideas", "for business", "for companies", "professional",
                    "analytics", "grow", "increase", "improve", "optimize", "setup"]
        for t in med_high:
            if t in k:
                return 2.0
        med = ["what is", "how does", "why", "benefits", "features", "marketing"]
        for t in med:
            if t in k:
                return 1.0
        return 0.5

    def _get_intent_category(self, score: float) -> str:
        if score >= 2.5:
            return "Transactional"
        if score >= 1.5:
            return "Commercial Investigation"
        if score >= 0.8:
            return "Informational (Relevant)"
        return "Informational (Low Value)"


# -------------------------------------------------------------------
# Example usage
# -------------------------------------------------------------------
if __name__ == "__main__":
    from dotenv import load_dotenv
    load_dotenv("data_sources/config/.env")

    gsc = GoogleSearchConsole()

    print("=== Quick Wins (Position 11-20) ===")
    for i, kw in enumerate(gsc.get_quick_wins()[:10], 1):
        print(f"{i}. {kw['keyword']}  pos={kw['position']}  impr={kw['impressions']:,}  score={kw['opportunity_score']:.1f}")

    print("\n=== Low CTR Pages ===")
    for p in gsc.get_low_ctr_pages()[:5]:
        print(f"  {p['url']}  impr={p['impressions']:,}  ctr={p['ctr']}%  missed={p['missed_clicks']}")

    print("\n=== Trending Queries ===")
    for q in gsc.get_trending_queries()[:5]:
        print(f"  {q['query']}  +{q['change_percent']:.1f}%")
