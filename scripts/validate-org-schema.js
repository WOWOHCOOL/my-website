'use strict';
// Gate: every rendered Organization JSON-LD node must carry the canonical field set
// (single source of truth for the company entity). Runs on _site output.
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..'), SITE = path.join(ROOT, '_site');
const CANON = ['@id', 'name', 'legalName', 'foundingDate', 'vatID', 'url', 'publishingPrinciples', 'logo', 'areaServed', 'address', 'sameAs', 'knowsAbout', 'contactPoint'];
if (!fs.existsSync(SITE)) { console.log('[validate-org-schema] _site not found'); process.exit(1); }
function walk(d, o = []) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) walk(p, o); else if (e.name.endsWith('.html')) o.push(p); } return o; }
function findOrg(o, acc) { if (o && typeof o === 'object') { if (o['@type'] === 'Organization') acc.push(o); for (const k in o) findOrg(o[k], acc); } return acc; }
let nodes = 0, bad = [], invalid = 0;
for (const f of walk(SITE)) {
  const s = fs.readFileSync(f, 'utf8');
  for (const m of s.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let d; try { d = JSON.parse(m[1]); } catch { invalid++; continue; }
    const orgs = findOrg(d, []);
    for (const o of orgs) {
      nodes++;
      const missing = CANON.filter(k => !(k in o));
      if (missing.length) bad.push([path.relative(ROOT, f), missing.join(',')]);
    }
  }
}
if (bad.length) { console.log('[validate-org-schema] incomplete Organization nodes: ' + bad.length + ' / ' + nodes + ' (invalid JSON-LD: ' + invalid + ')'); bad.slice(0, 15).forEach(b => console.log('   - ' + b[0] + '  missing: ' + b[1])); process.exit(1); }
console.log('[validate-org-schema] PASS — ' + nodes + ' Organization nodes complete (invalid JSON-LD: ' + invalid + ')');
