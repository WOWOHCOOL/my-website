// Remove the build output directory before a build.
//
// Eleventy does NOT clean its output directory — verified empirically: a file
// dropped into _site/ survives a full rebuild. Without this step anything that
// is deleted from src/, css/ or image/ keeps being deployed (stale pages stay
// live, removed assets keep being served).
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', '_site');

if (fs.existsSync(dir)) {
  fs.rmSync(dir, { recursive: true, force: true });
  console.log(`[clean] removed ${dir}`);
} else {
  console.log(`[clean] nothing to do (${dir} does not exist)`);
}
