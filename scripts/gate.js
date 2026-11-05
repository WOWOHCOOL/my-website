// gate.js — prebuild checks that can run everywhere.
//
// 1. Static template lint — always runs. Pure Node, no external deps, so it also
//    runs on Cloudflare Pages. Catches nested/stray Nunjucks comments and shared
//    macros used out of scope, both of which fail the build only at render time.
// 2. ctaLabel routing — always runs. Pure Node, no external deps. Enforces that
//    every blog article's ctaLabel is one of the canonical labels for its
//    language (single source of truth: src/_data/cta-labels.json) and that all
//    language versions of one article land in the same theme bucket.
// 3. Closing CTA shape — always runs. Pure Node, no external deps. Enforces the
//    2026-11-04 two-button rule: one internal link + one
//    <button data-action="open-modal" data-product="...">; no /contact/ link.
//
// 2026-10-19: the old seomachine B2B `prebuild_gate.py` step was removed together
// with the B2B add-on. The site-local validators in `npm run build` remain the
// publishing gate; this file keeps only the checks that are self-contained.
const path = require("path");
const { spawnSync } = require("child_process");

const lint = spawnSync(process.execPath, [path.join(__dirname, "lint-njk-templates.js")], {
  stdio: "inherit",
});
if (lint.status !== 0) {
  console.error("[gate] template lint failed");
  process.exit(1);
}

const ctaLabels = spawnSync(process.execPath, [path.join(__dirname, "validate-cta-labels.js")], {
  stdio: "inherit",
});
if (ctaLabels.status !== 0) {
  console.error("[gate] ctaLabel routing failed");
  process.exit(1);
}

const blogCta = spawnSync(process.execPath, [path.join(__dirname, "validate-blog-cta.js")], {
  stdio: "inherit",
});
if (blogCta.status !== 0) {
  console.error("[gate] blog Closing CTA shape failed");
  process.exit(1);
}

console.log("[gate] local template lint + ctaLabel routing + CTA shape passed");
process.exit(0);
