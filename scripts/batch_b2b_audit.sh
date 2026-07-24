#!/bin/bash
# Batch B2B audit — runs b2b_content_auditor.py + information_gain_analyzer.py on all EN blog articles
# Usage: bash scripts/batch_b2b_audit.sh

REPO="C:/Users/wowoh/seomachine"
BLOG="C:/Users/wowoh/wowohcool.com/src/blog"
AUDIT_DIR="$REPO/audits"
DATE="2026-07-23"
AUDITOR="$REPO/data_sources/modules/b2b_content_auditor.py"
GAIN="$REPO/data_sources/modules/information_gain_analyzer.py"

mkdir -p "$AUDIT_DIR"

# All 28 EN articles
ARTICLES=(
  "car-charger-guide"
  "certifications-us-eu-guide"
  "charger-safety-standards"
  "charging-accessory-market-trends-2026"
  "choose-reliable-china-charger-supplier"
  "factory-verification-checklist"
  "gan-chargers-guide"
  "gan-generations-guide"
  "gan-v-charger-oem-manufacturing"
  "gan-vs-silicon-charger-comparison"
  "hotel-charging-solutions"
  "how-to-choose-factory"
  "how-to-choose-power-bank"
  "import-costs-guide"
  "oem-vs-odm-guide"
  "power-bank-mah-explained"
  "power-bank-private-label-oem-production"
  "power-bank-specs-guide"
  "qi-certification-guide"
  "qi2-vs-magsafe-guide"
  "quality-control-guide"
  "semi-solid-state-power-bank-oem"
  "shipping-from-china-guide"
  "top-power-bank-manufacturers-china"
  "usb-c-pd-3-1-explained"
  "usb-c-pd-fast-charging-guide"
  "what-is-gan-charger"
  "wireless-charging-works"
)

TOTAL=${#ARTICLES[@]}
PASSED=0
FAILED=0
SCORES=()

echo "============================================"
echo "  BATCH B2B AUDIT — $TOTAL EN Articles"
echo "  Date: $DATE"
echo "============================================"
echo ""

for i in "${!ARTICLES[@]}"; do
  SLUG="${ARTICLES[$i]}"
  IDX=$((i + 1))
  NJK="$BLOG/$SLUG/index.njk"
  REPORT="$AUDIT_DIR/b2b-audit-$SLUG-$DATE.md"

  echo "[$IDX/$TOTAL] Auditing: $SLUG"

  if [ ! -f "$NJK" ]; then
    echo "  ⚠️  SKIPPED — file not found: $NJK"
    FAILED=$((FAILED + 1))
    continue
  fi

  # Run B2B Content Auditor
  AUDITOR_OUT=$(cd "$REPO" && python "$AUDITOR" "$NJK" 2>&1)
  AUDITOR_RC=$?

  # Run Information Gain Analyzer
  GAIN_OUT=$(cd "$REPO" && python "$GAIN" "$NJK" 2>&1)
  GAIN_RC=$?

  # Extract scores
  B2B_SCORE=$(echo "$AUDITOR_OUT" | grep -oP 'Overall Score:\s*\K[\d.]+' || echo "N/A")
  GAIN_SCORE=$(echo "$GAIN_OUT" | grep -oP 'Score:\s*\K[\d.]+' || echo "N/A")

  # Generate combined report
  cat > "$REPORT" << EOF
# B2B Audit Report: $SLUG

**Date:** $DATE
**Article:** \`$SLUG\`
**File:** \`$NJK\`

---

## B2B Content Audit Score: $B2B_SCORE/100

\`\`\`
$AUDITOR_OUT
\`\`\`

---

## Information Gain Analysis Score: $GAIN_SCORE/100

\`\`\`
$GAIN_OUT
\`\`\`

---

## Combined Score

| Dimension | Score |
|-----------|-------|
| B2B Content Quality | $B2B_SCORE |
| Information Gain | $GAIN_SCORE |
| **Composite** | **$(echo "scale=1; ($B2B_SCORE + $GAIN_SCORE) / 2" | bc 2>/dev/null || echo "N/A")** |
EOF

  echo "    B2B: $B2B_SCORE | InfoGain: $GAIN_SCORE | → $REPORT"
  SCORES+=("$B2B_SCORE|$GAIN_SCORE|$SLUG")
  PASSED=$((PASSED + 1))
done

echo ""
echo "============================================"
echo "  COMPLETE: $PASSED/$TOTAL processed"
echo "============================================"

# Print score summary sorted by B2B score
echo ""
echo "--- Score Summary (sorted by B2B Score) ---"
for entry in "${SCORES[@]}"; do
  echo "$entry"
done | sort -t'|' -k1 -rn | while IFS='|' read b2b gain slug; do
  printf "  %-50s B2B: %6s | InfoGain: %6s\n" "$slug" "$b2b" "$gain"
done
