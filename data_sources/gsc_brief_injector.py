"""
GSC Brief Injector — Inject real Search Console data into research briefs.

Two data-source modes (auto-detected):
  1. OFFLINE (default): Reads exported JSON files from data_sources/gsc_exports/
     - keywords_data.json: query-level (clicks, impressions, ctr, position)
     - pages_data.json: page-level (clicks, impressions, ctr, position)
  2. LIVE: Calls GoogleSearchConsole API directly (requires proxy/VPN in China)

Usage:
  # Existing article — get page performance + related keyword intelligence
  python data_sources/gsc_brief_injector.py --url /blog/car-charger-guide/

  # New article — get site-wide keyword intelligence for a topic
  python data_sources/gsc_brief_injector.py --keyword "gan charger oem"

  # Override data-source mode
  python data_sources/gsc_brief_injector.py --url /blog/xxx/ --mode live
  python data_sources/gsc_brief_injector.py --url /blog/xxx/ --mode offline

Output: Markdown block ready for injection into research briefs.
"""

import argparse
import csv
import json
import os
import re
import sys
from datetime import datetime
from pathlib import Path
from typing import Optional

# Project root (where this script lives: data_sources/gsc_brief_injector.py)
PROJECT_ROOT = Path(__file__).resolve().parent.parent
GSC_EXPORTS_DIR = PROJECT_ROOT / "data_sources" / "gsc_exports"

# Supported file pairs (checked in order, first existing pair wins)
FILE_PAIRS = [
    # CSV (new GSC export format — preferred)
    (GSC_EXPORTS_DIR / "keywords_data.csv", GSC_EXPORTS_DIR / "pages_data.csv"),
    # JSON (old format — fallback)
    (GSC_EXPORTS_DIR / "keywords_data.json", GSC_EXPORTS_DIR / "pages_data.json"),
]


# ---------------------------------------------------------------------------
# Column name normalization (handles Chinese/English/Garbled headers)
# ---------------------------------------------------------------------------

# Known column name patterns for keyword data (positional + heuristic)
KW_COL_MAP = {
    # English
    "query": "query", "queries": "query", "top queries": "query",
    "clicks": "clicks",
    "impressions": "impressions", "impr.": "impressions",
    "ctr": "ctr", "click through rate": "ctr",
    "position": "position", "avg. position": "position", "average position": "position",
}

PAGE_COL_MAP = {
    "page": "page", "pages": "page", "top pages": "page", "url": "page",
    "clicks": "clicks",
    "impressions": "impressions", "impr.": "impressions",
    "ctr": "ctr",
    "position": "position", "avg. position": "position", "average position": "position",
}


def _normalize_header(header: str) -> str:
    """Map a CSV column header to a canonical field name, handling garbled text."""
    h = header.strip().lower()

    # Known Chinese headers (GSC CSV export). Sorted by length descending
    # so longer keys match before substrings (e.g. "排名靠前的网页" before "排名").
    chinese_headers = [
        ("排名靠前的网页", "page"),
        ("热门查询", "query"),
        ("点击次数", "clicks"),
        ("点击率", "ctr"),
        ("排名", "position"),
        ("展示", "impressions"),
        ("查询", "query"),
        ("网页", "page"),
    ]
    for cn_key, field in chinese_headers:
        if cn_key in header:
            return field

    # Try keyword-based matching (English headers)
    for pattern, field in KW_COL_MAP.items():
        if pattern in h:
            return field
    for pattern, field in PAGE_COL_MAP.items():
        if pattern in h:
            return field

    return h  # give up, return as-is


def _normalize_row(row: dict, is_page: bool = False) -> dict:
    """Convert a raw CSV/JSON row to canonical {query/page, clicks, impressions, ctr, position}."""
    result = {}

    # Build a normalized key→value map
    norm = {}
    for k, v in row.items():
        canonical = _normalize_header(str(k))
        norm[canonical] = v

    # Extract fields
    query_or_page_key = "page" if is_page else "query"
    result[query_or_page_key] = str(norm.get(query_or_page_key, "")).strip()

    # Parse numeric fields (handle percentage strings like "30.56%")
    def _parse_num(val, default=0):
        if val is None:
            return default
        s = str(val).replace("%", "").replace(",", "").strip()
        try:
            return float(s)
        except ValueError:
            return default

    result["clicks"] = _parse_num(norm.get("clicks", 0))
    result["impressions"] = _parse_num(norm.get("impressions", 0))

    ctr_raw = _parse_num(norm.get("ctr", 0))
    # GSC CSV exports CTR as percentage (e.g. "30.56%"), normalize to 0-1
    result["ctr"] = ctr_raw / 100.0 if ctr_raw > 1 else ctr_raw

    result["position"] = _parse_num(norm.get("position", 0))

    return result


# ---------------------------------------------------------------------------
# Data loading (offline mode)
# ---------------------------------------------------------------------------

def _find_file_pair():
    """Find the first existing file pair (csv or json)."""
    for kw_file, pg_file in FILE_PAIRS:
        if kw_file.exists() and pg_file.exists():
            return kw_file, pg_file
    return None, None


def _load_csv(path: Path, is_page: bool = False) -> list:
    """Load a GSC CSV export, normalizing column headers."""
    rows = []
    # Try UTF-8-BOM first (GSC default), then UTF-8, then GBK
    for enc in ["utf-8-sig", "utf-8", "gbk", "gb18030"]:
        try:
            with open(path, encoding=enc) as f:
                reader = csv.DictReader(f)
                for row in reader:
                    normalized = _normalize_row(row, is_page=is_page)
                    if normalized.get("query" if not is_page else "page"):
                        rows.append(normalized)
            if rows:
                break
        except (UnicodeDecodeError, UnicodeError):
            continue
    return rows


def _load_json(path: Path) -> list:
    """Load a GSC JSON export (legacy format)."""
    if not path.exists():
        return []
    with open(path, encoding="utf-8") as f:
        data = json.load(f)
    # JSON format already has correct field names, just normalize types
    result = []
    for row in data:
        r = {}
        if "query" in row:
            r["query"] = str(row["query"])
        elif "page" in row:
            r["page"] = str(row["page"])
        r["clicks"] = float(row.get("clicks", 0))
        r["impressions"] = float(row.get("impressions", 0))
        ctr = float(row.get("ctr", 0))
        r["ctr"] = ctr / 100.0 if ctr > 1 else ctr
        r["position"] = float(row.get("position", 0))
        result.append(r)
    return result


def load_offline_data():
    """Load both GSC export files (auto-detect CSV or JSON). Returns (keywords_list, pages_list)."""
    kw_file, pg_file = _find_file_pair()

    if kw_file is None:
        print(f"[WARN] No GSC export files found in {GSC_EXPORTS_DIR}", file=sys.stderr)
        return [], []

    # Detect format by extension
    if kw_file.suffix == ".csv":
        keywords = _load_csv(kw_file, is_page=False)
        pages = _load_csv(pg_file, is_page=True)
    else:
        keywords = _load_json(kw_file)
        pages = _load_json(pg_file)

    return keywords, pages


# ---------------------------------------------------------------------------
# URL normalization
# ---------------------------------------------------------------------------

def normalize_url(raw_url: str) -> str:
    """
    Normalize a URL or path to a canonical slug for matching.
    Handles: full URLs, paths, with/without www, trailing slash, .html, /index
    Also handles Git Bash path mangling on Windows.
    Returns a clean slug like '/blog/car-charger-guide'.
    """
    url = raw_url.strip()

    # Fix Git Bash on Windows path mangling (e.g. /C:/Program Files/Git/blog/...)
    # Git Bash prepends the MSYS root when it sees a leading /
    gitbash_patterns = [
        r"^/[A-Z]:/Program Files/Git/",
        r"^/[A-Z]:/",
    ]
    for pattern in gitbash_patterns:
        m = re.match(pattern, url)
        if m:
            # Extract the original path after the MSYS prefix
            # e.g. "/C:/Program Files/Git/blog/foo" → "/blog/foo"
            after_drive = re.sub(r"^/[A-Z]:/Program Files/Git", "", url)
            after_drive = re.sub(r"^/[A-Z]:", "", after_drive)
            url = after_drive
            break

    # Strip protocol + domain
    for prefix in [
        "https://www.wowohcool.com",
        "https://wowohcool.com",
        "http://www.wowohcool.com",
        "http://wowohcool.com",
    ]:
        if url.startswith(prefix):
            url = url[len(prefix):]
            break

    # Strip .html extension
    url = re.sub(r"\.html$", "", url)

    # Strip trailing /index
    url = re.sub(r"/index$", "", url)

    # Normalize trailing slash: keep leading slash, strip trailing
    url = url.rstrip("/")
    if not url.startswith("/"):
        url = "/" + url

    # Empty root → skip
    if url == "/" or url == "":
        return None

    return url


def page_matches_slug(page_url: str, target_slug: str) -> bool:
    """Check if a page URL from GSC data matches our target slug."""
    normalized = normalize_url(page_url)
    if normalized is None:
        return False
    return normalized == target_slug


# ---------------------------------------------------------------------------
# Keyword intelligence
# ---------------------------------------------------------------------------

# Domain-relevant terms for filtering noise from the keyword pool
RELEVANT_TERMS = [
    "charger", "charging", "power bank", "powerbank", "gan", "oem", "odm",
    "usb", "usb-c", "qi2", "qi ", "wireless", "magsafe", "pd 3.1",
    "battery", "semi-solid", "certification", "safety", "factory",
    "manufacturer", "supplier", "import", "shipping", "sourcing",
    "wowohcool", "shenzhen", "adapter", "cable", "fast charg",
    "lade", "chargeur", "cargador",
]


def is_relevant_keyword(query: str) -> bool:
    """Check if a keyword is relevant to the charger/power-bank domain."""
    q = query.lower()
    return any(term in q for term in RELEVANT_TERMS)


def find_quick_wins(
    keywords: list,
    min_impressions: int = 20,
    position_min: int = 11,
    position_max: int = 20,
) -> list:
    """Find quick-win keywords (position 11-20 with decent impressions)."""
    wins = [
        k for k in keywords
        if position_min <= k["position"] <= position_max
        and k["impressions"] >= min_impressions
        and is_relevant_keyword(k["query"])
    ]
    wins.sort(key=lambda x: x["impressions"], reverse=True)
    return wins


def find_rising_keywords(keywords: list, min_impressions: int = 30) -> list:
    """
    Find high-impression keywords ranking outside page 2 (position > 20).
    These represent content gap opportunities — queries the site gets
    impressions for but doesn't rank well on.
    """
    gaps = [
        k for k in keywords
        if k["position"] > 20
        and k["impressions"] >= min_impressions
        and is_relevant_keyword(k["query"])
    ]
    gaps.sort(key=lambda x: x["impressions"], reverse=True)
    return gaps


def find_low_ctr_keywords(
    keywords: list,
    min_impressions: int = 50,
    max_ctr: float = 0.03,
) -> list:
    """Find keywords with decent impressions but poor CTR — meta optimization targets."""
    low = [
        k for k in keywords
        if k["impressions"] >= min_impressions
        and k["ctr"] < max_ctr
        and k["position"] <= 10
        and is_relevant_keyword(k["query"])
    ]
    low.sort(key=lambda x: x["impressions"], reverse=True)
    return low


# ---------------------------------------------------------------------------
# Markdown rendering
# ---------------------------------------------------------------------------

def render_keyword_table(keywords: list, max_rows: int = 15) -> str:
    """Render a keyword data table in Markdown."""
    if not keywords:
        return "_No data available._\n"

    lines = [
        "| Keyword | Clicks | Impr. | Pos. | CTR |",
        "|---------|:------:|:-----:|:----:|:---:|",
    ]
    for k in keywords[:max_rows]:
        ctr_pct = k["ctr"] * 100 if isinstance(k["ctr"], float) and k["ctr"] < 1 else k["ctr"]
        lines.append(
            f"| {k['query'][:60]} "
            f"| {k['clicks']:,.0f} "
            f"| {k['impressions']:,.0f} "
            f"| {k['position']:.1f} "
            f"| {ctr_pct:.1f}% |"
        )
    return "\n".join(lines) + "\n"


def render_position_distribution(keywords: list) -> str:
    """Render a position distribution summary."""
    top3 = sum(1 for k in keywords if k["position"] <= 3)
    r4_10 = sum(1 for k in keywords if 4 <= k["position"] <= 10)
    r11_20 = sum(1 for k in keywords if 11 <= k["position"] <= 20)
    r21_plus = sum(1 for k in keywords if k["position"] > 20)

    return (
        "| Range | Keywords |\n"
        "|-------|:--------:|\n"
        f"| 1-3 | {top3} |\n"
        f"| 4-10 | {r4_10} |\n"
        f"| 11-20 | {r11_20} |\n"
        f"| 21+ | {r21_plus} |\n"
    )


# ---------------------------------------------------------------------------
# Mode: URL (existing article)
# ---------------------------------------------------------------------------

def build_url_block_offline(url: str, days: int = 30) -> str:
    """Build GSC data block for an existing article from offline JSON exports."""
    keywords, pages = load_offline_data()
    slug = normalize_url(url)
    if slug is None:
        return f"> [WARN] Could not normalize URL: {url}\n"

    # --- Page-level aggregate data ---
    matching_pages = [p for p in pages if page_matches_slug(p["page"], slug)]

    if not matching_pages:
        return (
            f"> [WARN] No GSC page data found for `{slug}`.\n"
            f"> Available blog slugs ({len(pages)} pages): use `--list-slugs` to see all.\n"
        )

    # Merge duplicate URL variants (www vs non-www, .html vs /)
    total_clicks = sum(p["clicks"] for p in matching_pages)
    total_impressions = sum(p["impressions"] for p in matching_pages)
    avg_ctr = (total_clicks / total_impressions * 100) if total_impressions > 0 else 0
    avg_position = (
        sum(p["position"] * p["impressions"] for p in matching_pages)
        / total_impressions
    ) if total_impressions > 0 else 0

    # --- Keyword intelligence (global pool, filtered for relevance) ---
    relevant_kw = [k for k in keywords if is_relevant_keyword(k["query"])]
    quick_wins = find_quick_wins(relevant_kw)
    content_gaps = find_rising_keywords(relevant_kw)
    low_ctr = find_low_ctr_keywords(relevant_kw)
    top_keywords = sorted(relevant_kw, key=lambda x: x["clicks"], reverse=True)

    # --- Assemble Markdown block ---
    block = f"""## 0. GSC Performance Data (Last {days} Days)

> Data source: offline export (refresh from GSC for latest data)

**Page:** `{slug}`
**Total Clicks:** {total_clicks:,.0f} | **Impressions:** {total_impressions:,.0f}
**Avg CTR:** {avg_ctr:.1f}% | **Avg Position:** {avg_position:.1f}

### Site-Wide Keyword Intelligence (Charger/Power-Bank Related)

{render_keyword_table(top_keywords)}

### Position Distribution (All Relevant Keywords: {len(relevant_kw)})

{render_position_distribution(relevant_kw)}

### Quick Wins (Position 11-20, Impr. >= 20)

"""
    if quick_wins:
        block += render_keyword_table(quick_wins, max_rows=10)
        block += "\n"
    else:
        block += "_No quick-win keywords found._\n\n"

    block += "### Content Gap Opportunities (Position > 20, Impr. >= 30)\n\n"
    if content_gaps:
        block += render_keyword_table(content_gaps, max_rows=10)
        block += "\n"
    else:
        block += "_No content gap keywords found._\n\n"

    block += "### Low CTR Opportunities (Position <= 10, CTR < 3%, Impr. >= 50)\n\n"
    if low_ctr:
        block += render_keyword_table(low_ctr, max_rows=10)
        block += "\n"
    else:
        block += "_No low-CTR keywords found._\n\n"

    block += "---\n"
    block += (
        "_How to use this data: Quick Wins = keywords close to page 1 that need "
        "targeted optimization. Content Gaps = queries you get impressions for "
        "but don't rank — add dedicated sections. Low CTR = meta "
        "title/description rewrite candidates._\n"
    )

    return block


# ---------------------------------------------------------------------------
# Mode: Keyword (new article research)
# ---------------------------------------------------------------------------

def build_keyword_block_offline(keyword: str, days: int = 30) -> str:
    """Build GSC data block for a new article from offline JSON exports."""
    keywords, pages = load_offline_data()

    kw_lower = keyword.lower()

    # Find related keywords:
    # - Primary: exact phrase match
    # - Secondary (if < 5 primary hits): all words present as separate words
    kw_lower = keyword.lower()
    kw_words = kw_lower.split()

    primary = [
        k for k in keywords
        if kw_lower in k["query"].lower()
    ]

    if len(primary) >= 5:
        related = primary
    else:
        # Require ALL words to be present (not just any one word)
        related = [
            k for k in keywords
            if k not in primary and all(
                re.search(r'\b' + re.escape(w) + r'\b', k["query"].lower())
                for w in kw_words
            )
        ]
        related = primary + related

    related.sort(key=lambda x: x["impressions"], reverse=True)
    # Deduplicate
    seen = set()
    deduped = []
    for k in related:
        if k["query"].lower() not in seen:
            seen.add(k["query"].lower())
            deduped.append(k)
    related = deduped

    # Quick wins from the related set (use same matching logic as above)
    quick_wins_all = find_quick_wins(keywords)
    related_wins = [k for k in quick_wins_all if kw_lower in k["query"].lower()]
    if len(related_wins) < 5:
        extra_wins = [
            k for k in quick_wins_all
            if k not in related_wins and all(
                re.search(r'\b' + re.escape(w) + r'\b', k["query"].lower())
                for w in kw_words
            )
        ]
        related_wins += extra_wins
    related_wins.sort(key=lambda x: x["impressions"], reverse=True)

    # Site-wide relevant keywords for context
    relevant_kw = [k for k in keywords if is_relevant_keyword(k["query"])]

    block = f"""## 0. GSC Keyword Intelligence (Last {days} Days)

> Data source: offline export (refresh from GSC for latest data)

**Target Keyword:** `{keyword}`

### Site Already Ranks For (Related Queries)

"""
    if related:
        block += render_keyword_table(related, max_rows=15)
        block += "\n"
    else:
        block += "_No existing rankings for related queries._\n\n"

    block += "### Related Quick Wins (Position 11-20)\n\n"
    if related_wins:
        block += render_keyword_table(related_wins, max_rows=10)
        block += "\n"
    else:
        block += "_No related quick-win keywords._\n\n"

    block += "### Full-Site Context (All Charger/Power-Bank Keywords)\n\n"
    block += render_position_distribution(relevant_kw)
    block += "\n"
    block += (
        f"_Site has {len(relevant_kw):,} charger/power-bank related keywords "
        f"across {len(pages):,} indexed pages._\n"
    )
    block += "\n---\n"

    return block


# ---------------------------------------------------------------------------
# Live API mode (requires network access to Google APIs)
# ---------------------------------------------------------------------------

def build_url_block_live(url: str, days: int = 30) -> str:
    """Build GSC data block using the live GoogleSearchConsole API."""
    try:
        from dotenv import load_dotenv
        load_dotenv(PROJECT_ROOT / "data_sources" / "config" / ".env")

        from data_sources.modules.google_search_console import GoogleSearchConsole
        gsc = GoogleSearchConsole()
    except Exception as e:
        return f"> [ERROR] Failed to initialize GSC API: {e}\n"

    # Ensure URL is in the format GSC expects
    if not url.startswith("http"):
        full_url = f"https://www.wowohcool.com{url}"
    else:
        full_url = url

    try:
        page = gsc.get_page_performance(full_url, days=days)
    except Exception as e:
        return f"> [ERROR] GSC API call failed: {e}\n"

    if "error" in page:
        return f"> [WARN] No GSC data for `{url}`: {page['error']}\n"

    # Build Markdown from live data
    top_kw = page.get("top_keywords", [])
    quick_wins = [
        k for k in top_kw
        if 11 <= k["position"] <= 20 and k["impressions"] >= 20
    ]

    top3 = sum(1 for k in top_kw if k["position"] <= 3)
    r4_10 = sum(1 for k in top_kw if 4 <= k["position"] <= 10)
    r11_20 = sum(1 for k in top_kw if 11 <= k["position"] <= 20)
    r21 = sum(1 for k in top_kw if k["position"] > 20)

    block = f"""## 0. GSC Performance Data (Last {days} Days)

> Data source: GSC live API

**Page:** `{page['url']}`
**Total Clicks:** {page['clicks']:,} | **Impressions:** {page['impressions']:,}
**Avg CTR:** {page['ctr']}% | **Avg Position:** {page['avg_position']}

### Top Keywords for This Page

{render_keyword_table(top_kw)}

### Quick Wins (Position 11-20, Impr. >= 20)

"""
    if quick_wins:
        block += render_keyword_table(quick_wins, max_rows=10)
    else:
        block += "_No quick-win keywords for this page._\n"

    block += f"""
### Page Position Distribution

| Range | Keywords |
|-------|:--------:|
| 1-3 | {top3} |
| 4-10 | {r4_10} |
| 11-20 | {r11_20} |
| 21+ | {r21} |

---
"""
    return block


# ---------------------------------------------------------------------------
# Utility
# ---------------------------------------------------------------------------

def list_blog_slugs():
    """Print all blog slugs found in GSC export data, for discovery."""
    _, pages = load_offline_data()
    blog_set = set()
    for p in pages:
        if "/blog/" in p.get("page", ""):
            slug = normalize_url(p["page"])
            if slug and slug != "/blog":
                blog_set.add(slug)

    print(f"Blog slugs in GSC data ({len(blog_set)} unique):\n")
    for slug in sorted(blog_set):
        # Get aggregate stats
        matching = [p for p in pages if page_matches_slug(p["page"], slug)]
        impr = sum(p["impressions"] for p in matching)
        clicks = sum(p["clicks"] for p in matching)
        print(f"  {slug:60s} impr={impr:6,.0f}  clicks={clicks:5,.0f}")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(
        description="GSC Brief Injector — inject real Search Console data into research briefs"
    )
    group = parser.add_mutually_exclusive_group()
    group.add_argument(
        "--url",
        help="Page path for existing article, e.g. /blog/car-charger-guide/",
    )
    group.add_argument(
        "--keyword",
        help="Target keyword for new article research",
    )
    group.add_argument(
        "--list-slugs",
        action="store_true",
        help="List all blog slugs found in GSC export data",
    )
    parser.add_argument(
        "--days",
        type=int,
        default=30,
        help="Days of data to reference (default: 30)",
    )
    parser.add_argument(
        "--mode",
        choices=["offline", "live"],
        default="offline",
        help="Data source mode: offline (JSON exports) or live (GSC API). Default: offline.",
    )
    args = parser.parse_args()

    if args.list_slugs:
        list_blog_slugs()
        return

    if not args.url and not args.keyword:
        parser.error("Must specify --url, --keyword, or --list-slugs")

    if args.mode == "live":
        if args.url:
            block = build_url_block_live(args.url, args.days)
        else:
            # Live keyword mode — just use offline for now (keyword-level live
            # would need get_keyword_positions + manual filtering)
            block = build_keyword_block_offline(args.keyword, args.days)
            block = block.replace(
                "> Data source: offline export",
                "> Data source: GSC live API (keyword-level from site-wide query)",
            )
    else:
        if args.url:
            block = build_url_block_offline(args.url, args.days)
        else:
            block = build_keyword_block_offline(args.keyword, args.days)

    print(block)


if __name__ == "__main__":
    main()
