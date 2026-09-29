// gate.js — prebuild checks.
//
// 1. Static template lint — always runs. Pure Node, no external deps, so it also
//    runs on Cloudflare Pages. Catches nested/stray Nunjucks comments and shared
//    macros used out of scope, both of which fail the build only at render time.
// 2. Metadata prebuild gate from seomachine — local dev only. On remote build
//    environments (Cloudflare Pages) ../seomachine is not checked out, so this
//    step cannot run there. It is enforced locally before every push.
//
// ⚠️ WHAT "SKIPPING" MEANS (rewritten 2026-09-28)
// Until today the skip was one quiet log line + `exit 0`, which made the most
// expensive checks in the project — metadata C1-C24, the site-wide hreflang
// graph, tail-panel order, 15-panel structure, FAQ schema<->body, i18n glue —
// silently absent from the deploy path. A green deploy proved nothing about any
// of them.
//
// It cannot simply fail instead: Cloudflare never has ../seomachine, so a hard
// failure there would mean the site can never deploy at all. The skip is
// therefore LOUD by default and HARD only when asked:
//
//   REQUIRE_GATE=1   fail the build when the metadata gate cannot run.
//                    Use in any CI that DOES check out seomachine.
//                    Do NOT set it on Cloudflare Pages.
//
// The local enforcement point is `.git/hooks/pre-push` (source kept at
// scripts/hooks/pre-push so it can be reinstalled), which runs this gate before
// content changes leave the machine.
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
const requireGate = process.env.REQUIRE_GATE === "1";

function banner(lines) {
  const bar = "!".repeat(74);
  console.log(bar);
  lines.forEach((l) => console.log("!! " + l));
  console.log(bar);
}

if (!fs.existsSync(gate)) {
  banner([
    "METADATA GATE DID NOT RUN — ../seomachine is not present in this checkout.",
    "",
    "NOT checked by this build: metadata C1-C24, site-wide hreflang graph,",
    "tail-panel order, 15-panel structure, FAQ schema<->body, i18n glue.",
    "A green build here does NOT mean those passed.",
    "",
    requireGate
      ? "REQUIRE_GATE=1 is set -> failing the build (fail-closed)."
      : "Set REQUIRE_GATE=1 to fail instead of skip (CI that has seomachine only).",
  ]);
  process.exit(requireGate ? 1 : 0);
}

const r = spawnSync("python", [gate], { stdio: "inherit" });
if (r.error) {
  // Fail-closed: a gate we could not execute is not a gate we passed.
  console.error(`[gate] could not run the metadata gate: ${r.error.message}`);
  console.error("[gate] is `python` on PATH? (the gate is stdlib-only; any Python 3 works)");
  process.exit(1);
}
process.exit(r.status === 0 ? 0 : 1);
