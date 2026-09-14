// gate.js — prebuild checks.
//
// 1. Static template lint — always runs. Pure Node, no external deps, so it also
//    runs on Cloudflare Pages. Catches nested/stray Nunjucks comments and shared
//    macros used out of scope, both of which fail the build only at render time.
// 2. Metadata prebuild gate from seomachine — local dev only. On remote build
//    environments (Cloudflare Pages) ../seomachine is not checked out, so this
//    step is skipped gracefully; it is enforced locally before every push.
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const lint = spawnSync(process.execPath, [path.join(__dirname, "lint-njk-templates.js")], {
  stdio: "inherit",
});
if (lint.status !== 0) {
  console.error("[gate] template lint failed");
  process.exit(1);
}

const gate = "../seomachine/data_sources/modules/prebuild_gate.py";
if (!fs.existsSync(gate)) {
  console.log("[gate] seomachine not present on remote — metadata gate enforced locally only, skipping");
  process.exit(0);
}
const r = spawnSync("python", [gate], { stdio: "inherit" });
process.exit(r.status === 0 ? 0 : 1);
