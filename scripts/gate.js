// gate.js — run the metadata prebuild gate when seomachine is present (local dev).
// On remote build environments (Cloudflare Pages) ../seomachine is not checked out,
// so the gate is skipped gracefully — it is enforced locally before every push.
const fs = require("fs");
const { spawnSync } = require("child_process");

const gate = "../seomachine/data_sources/modules/prebuild_gate.py";
if (!fs.existsSync(gate)) {
  console.log("[gate] seomachine not present on remote — metadata gate enforced locally only, skipping");
  process.exit(0);
}
const r = spawnSync("python", [gate], { stdio: "inherit" });
process.exit(r.status === 0 ? 0 : 1);
