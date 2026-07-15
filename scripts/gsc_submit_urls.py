"""
GSC URL Submission Helper for WOWOHCOOL

Generates the list of modified URLs that need re-indexing after B2B optimization.

Usage:
    python scripts/gsc_submit_urls.py --list        # Print all URLs to submit
    python scripts/gsc_submit_urls.py --batch 10    # Print first 10 priority URLs

Manual GSC submission:
    1. Go to https://search.google.com/search-console
    2. Select property: wowohcool.com
    3. Paste URL in the top inspection bar → Enter
    4. Click "Request Indexing"
    5. Repeat for each URL
"""

BASE_URL = "https://www.wowohcool.com"

# All modified EN blog URLs (Batch 1+2+3 from 2026-07-12 optimization)
EN_URLS = [
    "/blog/how-to-choose-power-bank/",
    "/blog/what-is-gan-charger/",
    "/blog/wireless-charging-works/",
    "/blog/power-bank-mah-explained/",
    "/blog/usb-c-pd-3-1-explained/",
    "/blog/qi2-vs-magsafe-guide/",
    "/blog/charger-safety-standards/",
    "/blog/charging-accessory-market-trends-2026/",
    "/blog/gan-generations-guide/",
    "/blog/hotel-charging-solutions/",
    "/blog/qi-certification-guide/",
    "/blog/car-charger-guide/",
    "/blog/certifications-us-eu-guide/",
    "/blog/import-costs-guide/",
    "/blog/power-bank-private-label-oem-production/",
    "/blog/power-bank-specs-guide/",
    "/blog/top-power-bank-manufacturers-china/",
    "/blog/usb-c-pd-fast-charging-guide/",
    "/blog/gan-chargers-guide/",
    "/blog/gan-v-charger-oem-manufacturing/",
    "/blog/gan-vs-silicon-charger-comparison/",
    "/blog/quality-control-guide/",
    "/blog/shipping-from-china-guide/",
    "/blog/oem-vs-odm-guide/",
    "/blog/factory-verification-checklist/",
    "/blog/choose-reliable-china-charger-supplier/",
    "/blog/semi-solid-state-power-bank-oem/",
    "/blog/how-to-choose-factory/",
]

# All modified DE blog URLs
DE_URLS = [
    "/de/blog/powerbank-auswahl-leitfaden/",
    "/de/blog/was-ist-gan-ladegeraet/",
    "/de/blog/kabelloses-laden/",
    "/de/blog/powerbank-mah-erklaert/",
    "/de/blog/usb-c-pd-3-1-erklaert/",
    "/de/blog/qi2-vs-magsafe/",
    "/de/blog/sicherheitsstandards-ladegeraete/",
    "/de/blog/markt-trends-ladegeraete-2026/",
    "/de/blog/gan-generationen-uebersicht/",
    "/de/blog/hotelladegeraete-oem-loesungen/",
    "/de/blog/qi2-zertifizierung-importeure/",
    "/de/blog/autoladegeraet-ratgeber/",
    "/de/blog/zertifizierungen-eu-markt/",
    "/de/blog/gan-ladegeraete-leitfaden/",
    "/de/blog/gan-v-oem-fertigung/",
    "/de/blog/gan-vs-silizium-ladegeraete-vergleich/",
    "/de/blog/qualitaetskontrolle-china/",
    "/de/blog/versand-aus-china-logistik/",
    "/de/blog/oem-vs-odm-leitfaden/",
    "/de/blog/fabrikpruefung-checkliste-importeure/",
    "/de/blog/fabrikauswahl-china-leitfaden/",
    "/de/blog/lieferanten-china-finden/",
    "/de/blog/powerbank-eigenmarke-oem-produktion/",
    "/de/blog/powerbank-hersteller-china-oem-partner/",
    "/de/blog/powerbank-spezifikationen/",
    "/de/blog/semi-solid-state-powerbank/",
    "/de/blog/ladegeraet-import-china-zoll-zertifikate/",
    "/de/blog/usb-c-pd-schnellladen/",
    "/de/blog/",
]

# Priority order: Most impactful articles first (B2C→B2B title changes)
PRIORITY_URLS = [
    # EN - Batch 1 (B2C title → B2B)
    "/blog/how-to-choose-power-bank/",
    "/blog/what-is-gan-charger/",
    "/blog/wireless-charging-works/",
    "/blog/power-bank-mah-explained/",
    "/blog/usb-c-pd-3-1-explained/",
    "/blog/qi2-vs-magsafe-guide/",
    # DE - Batch 1 (B2C title → B2B)
    "/de/blog/powerbank-auswahl-leitfaden/",
    "/de/blog/was-ist-gan-ladegeraet/",
    "/de/blog/kabelloses-laden/",
    "/de/blog/powerbank-mah-erklaert/",
    "/de/blog/usb-c-pd-3-1-erklaert/",
    "/de/blog/qi2-vs-magsafe/",
    # EN - Batch 2 (zero B2B → B2B)
    "/blog/charger-safety-standards/",
    "/blog/charging-accessory-market-trends-2026/",
    "/blog/gan-generations-guide/",
    "/blog/hotel-charging-solutions/",
    "/blog/qi-certification-guide/",
    # DE - Batch 2 (zero B2B → B2B)
    "/de/blog/sicherheitsstandards-ladegeraete/",
    "/de/blog/gan-generationen-uebersicht/",
    "/de/blog/hotelladegeraete-oem-loesungen/",
    "/de/blog/qi2-zertifizierung-importeure/",
    # EN - Batch 3 (remaining)
    "/blog/car-charger-guide/",
    "/blog/certifications-us-eu-guide/",
    "/blog/import-costs-guide/",
    "/blog/power-bank-private-label-oem-production/",
    "/blog/power-bank-specs-guide/",
    "/blog/top-power-bank-manufacturers-china/",
    "/blog/usb-c-pd-fast-charging-guide/",
    "/blog/gan-chargers-guide/",
    "/blog/gan-v-charger-oem-manufacturing/",
    "/blog/gan-vs-silicon-charger-comparison/",
    "/blog/quality-control-guide/",
    "/blog/shipping-from-china-guide/",
    "/blog/oem-vs-odm-guide/",
    "/blog/factory-verification-checklist/",
    "/blog/choose-reliable-china-charger-supplier/",
    "/blog/semi-solid-state-power-bank-oem/",
    "/blog/how-to-choose-factory/",
    # DE - Batch 3 (remaining + blog index)
    "/de/blog/",
    "/de/blog/markt-trends-ladegeraete-2026/",
    "/de/blog/autoladegeraet-ratgeber/",
    "/de/blog/zertifizierungen-eu-markt/",
    "/de/blog/gan-ladegeraete-leitfaden/",
    "/de/blog/gan-v-oem-fertigung/",
    "/de/blog/gan-vs-silizium-ladegeraete-vergleich/",
    "/de/blog/qualitaetskontrolle-china/",
    "/de/blog/versand-aus-china-logistik/",
    "/de/blog/oem-vs-odm-leitfaden/",
    "/de/blog/fabrikpruefung-checkliste-importeure/",
    "/de/blog/fabrikauswahl-china-leitfaden/",
    "/de/blog/lieferanten-china-finden/",
    "/de/blog/powerbank-eigenmarke-oem-produktion/",
    "/de/blog/powerbank-hersteller-china-oem-partner/",
    "/de/blog/powerbank-spezifikationen/",
    "/de/blog/semi-solid-state-powerbank/",
    "/de/blog/ladegeraet-import-china-zoll-zertifikate/",
    "/de/blog/usb-c-pd-schnellladen/",
]


def main():
    import sys

    total = len(EN_URLS) + len(DE_URLS)
    print(f"EN: {len(EN_URLS)} URLs | DE: {len(DE_URLS)} URLs | Total: {total}")
    print()

    if "--list" in sys.argv:
        print("=== ALL EN URLs ===")
        for url in sorted(EN_URLS):
            print(f"  {BASE_URL}{url}")
        print()
        print("=== ALL DE URLs ===")
        for url in sorted(DE_URLS):
            print(f"  {BASE_URL}{url}")

    elif "--batch" in sys.argv:
        try:
            n = int(sys.argv[sys.argv.index("--batch") + 1])
        except (IndexError, ValueError):
            n = 10
        print(f"=== PRIORITY BATCH ({n} URLs) ===")
        for i, url in enumerate(PRIORITY_URLS[:n]):
            print(f"  {i+1}. {BASE_URL}{url}")

    elif "--priority" in sys.argv:
        print(f"=== ALL PRIORITY URLs ({len(PRIORITY_URLS)}) ===")
        for i, url in enumerate(PRIORITY_URLS):
            print(f"  {i+1}. {BASE_URL}{url}")

    else:
        print("Usage:")
        print("  python gsc_submit_urls.py --list       # List all URLs")
        print("  python gsc_submit_urls.py --priority   # Priority-ordered list")
        print("  python gsc_submit_urls.py --batch 10   # Top 10 priority URLs")
        print()
        print("=== MANUAL GSC SUBMISSION STEPS ===")
        print("1. Open https://search.google.com/search-console")
        print("2. Select property: wowohcool.com")
        print("3. Paste each URL into the inspection bar → Enter")
        print("4. Wait for 'URL is on Google' check")
        print("5. Click 'REQUEST INDEXING'")
        print()
        print("Tip: Submit 10-20 URLs per day (GSC daily quota ~200)")
        print("Tip: Start with --priority list for biggest impact")


if __name__ == "__main__":
    main()
