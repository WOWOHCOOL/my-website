"""
IndexNow URL submission for Bing + Yandex + Naver + Seznam.cz + Yep.

Single endpoint — all participating engines share notifications automatically.
Bing endpoint is preferred for stability; Yandex receives URLs via cross-engine sync.

Usage:
    python indexnow_submitter.py --urls "https://www.wowohcool.com/ru/blog/new-article/"
    python indexnow_submitter.py --urls-file new-urls.txt
    python indexnow_submitter.py --sitemap https://www.wowohcool.com/sitemap.xml

Environment variables (set in data_sources/config/.env):
    INDEXNOW_KEY=your-key-here
    INDEXNOW_HOST=www.wowohcool.com
"""

import argparse
import json
import logging
import os
import sys
import urllib.request
from pathlib import Path

# ── Config ──────────────────────────────────────────────────────────
KEY = os.getenv("INDEXNOW_KEY", "")
HOST = os.getenv("INDEXNOW_HOST", "www.wowohcool.com")
KEY_LOCATION = f"https://{HOST}/{KEY}.txt"
ENDPOINT = "https://www.bing.com/indexnow"  # syncs to Yandex automatically

# Fallback: also send directly to Yandex for RU-market priority
YANDEX_ENDPOINT = "https://yandex.com/indexnow"

logging.basicConfig(level=logging.INFO, format="%(asctime)s  %(message)s")
log = logging.getLogger("indexnow")


def _load_key_from_env_file() -> str:
    """Attempt to load INDEXNOW_KEY from .env file if not already in env."""
    if KEY:
        return KEY
    env_path = Path(__file__).resolve().parent.parent / "config" / ".env"
    if not env_path.exists():
        return ""
    with open(env_path, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line.startswith("INDEXNOW_KEY="):
                return line.split("=", 1)[1].strip('"').strip("'")
    return ""


def _submit(urls: list[str], endpoint: str, key: str) -> bool:
    """Send POST to an IndexNow endpoint. Returns True on success."""
    payload = json.dumps({
        "host": HOST,
        "key": key,
        "keyLocation": KEY_LOCATION,
        "urlList": urls,
    }).encode("utf-8")

    req = urllib.request.Request(
        endpoint,
        data=payload,
        headers={"Content-Type": "application/json; charset=utf-8"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            raw = resp.read().decode()
            # IndexNow returns 200 or 202 for success; Yandex returns 202
            if resp.status in (200, 202):
                log.info("OK  %s  HTTP %s → %s", endpoint, resp.status, raw[:200])
                return True
            try:
                body = json.loads(raw) if raw.strip() else {}
            except json.JSONDecodeError:
                body = raw[:200]
            log.warning("ERR %s  HTTP %s  %s", endpoint, resp.status, body)
            return False
    except urllib.error.HTTPError as e:
        log.error("ERR %s  HTTP %s  %s", endpoint, e.code, e.read().decode(errors="replace"))
        return False
    except Exception as e:
        log.error("ERR %s  %s", endpoint, e)
        return False


def submit_urls(urls: list[str], *, yandex_only: bool = False) -> dict:
    """
    Submit URLs via IndexNow.

    If yandex_only is True, only send to Yandex endpoint (faster for RU-market
    content). Otherwise send to Bing (syncs to all engines).

    Returns: {"success": bool, "bing": bool, "yandex": bool}
    """
    key = _load_key_from_env_file()
    if not key:
        log.error("INDEXNOW_KEY not set — add to data_sources/config/.env or environment")
        return {"success": False, "bing": False, "yandex": False}

    # Validate: all URLs must belong to HOST
    for u in urls:
        if HOST not in u:
            log.error("URL not under host %s: %s", HOST, u)
            return {"success": False, "bing": False, "yandex": False}

    if yandex_only:
        result = _submit(urls, YANDEX_ENDPOINT, key)
        return {"success": result, "bing": False, "yandex": result}

    # Default: send to Bing, which syncs to Yandex
    bing_ok = _submit(urls, ENDPOINT, key)

    # Always also ping Yandex directly for RU-market reliability
    yandex_ok = _submit(urls, YANDEX_ENDPOINT, key)

    return {"success": bing_ok or yandex_ok, "bing": bing_ok, "yandex": yandex_ok}


# ── CLI ──────────────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(
        description="IndexNow URL submission (Bing + Yandex + all partners)"
    )
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--urls", nargs="+", help="One or more URLs to submit")
    group.add_argument("--urls-file", help="Path to a file with one URL per line")
    group.add_argument("--sitemap", help="Sitemap URL to detect changes from")
    parser.add_argument("--yandex-only", action="store_true", help="Submit only to Yandex")
    args = parser.parse_args()

    if args.urls:
        urls = args.urls
    elif args.urls_file:
        with open(args.urls_file, encoding="utf-8") as f:
            urls = [line.strip() for line in f if line.strip()]
    else:
        log.info("--sitemap mode: not implemented yet (manual URL input required)")
        sys.exit(0)

    result = submit_urls(urls, yandex_only=args.yandex_only)
    log.info("Result: %s", json.dumps(result))
    sys.exit(0 if result["success"] else 1)


if __name__ == "__main__":
    main()
