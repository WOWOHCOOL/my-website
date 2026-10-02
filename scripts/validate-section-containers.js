'use strict';
// Gate: every <section> inside a blog <article> must be width-constrained —
// either the section itself carries max-w-4xl, or it has a max-w-4xl ancestor,
// or it has a direct-child max-w-4xl wrapper (architecture B). Otherwise the
// section renders full-bleed (1258px vs 848px) — a real layout bug.
// Intentional full-bleed sections opt out with class "section-full-bleed".
// Runs on the RENDERED _site output (source form != render form). Usage: node scripts/validate-section-containers.js
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const SITE = path.join(ROOT, '_site');
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);

if (!fs.existsSync(SITE)) { console.log('[validate-section-containers] _site not found — run eleventy first'); process.exit(1); }
function walk(dir, out = []) { for (const e of fs.readdirSync(dir, { withFileTypes: true })) { const p = path.join(dir, e.name); if (e.isDirectory()) walk(p, out); else if (e.name === 'index.html') out.push(p); } return out; }
const files = walk(SITE).filter(f => /[\\/]blog[\\/]/.test(f));

let total = 0, violations = [];
for (const f of files) {
  const html = fs.readFileSync(f, 'utf8');
  const a0 = html.indexOf('<article'); if (a0 < 0) continue;
  const a1 = html.indexOf('</article>', a0); if (a1 < 0) continue;
  const art = html.slice(a0, a1);
  const tagRe = /<\/?([a-zA-Z0-9]+)([^>]*)>/g; let m; const stack = []; let pending = null;
  while ((m = tagRe.exec(art))) {
    const raw = m[0], name = m[1].toLowerCase(), attrs = m[2] || '';
    if (raw.startsWith('</')) { for (let k = stack.length - 1; k >= 0; k--) { if (stack[k].name === name) { stack.length = k; break; } } continue; }
    const cls = (attrs.match(/class="([^"]*)"/) || [])[1] || '';
    if (name === 'section') {
      total++;
      pending = { exempt: /section-full-bleed/.test(cls) || /data-full-bleed/.test(attrs), self: /max-w-4xl/.test(cls), anc: stack.some(s => /max-w-4xl/.test(s.cls)), cls };
    } else if (pending && !VOID.has(name)) {
      // first element child of the pending section: architecture-B wrapper?
      const childOk = name === 'div' && /max-w-4xl/.test(cls);
      if (!(pending.exempt || pending.self || pending.anc || childOk)) violations.push({ f: path.relative(ROOT, f), cls: pending.cls.slice(0, 80) });
      pending = null;
    }
    if (!VOID.has(name) && !raw.endsWith('/>')) stack.push({ name, cls });
  }
}
if (violations.length) {
  console.log('[validate-section-containers] FULL-BLEED RISK: ' + violations.length + ' / ' + total + ' sections');
  for (const v of violations.slice(0, 30)) console.log('   - ' + v.f + '  class="' + v.cls + '"');
  process.exit(1);
}
console.log('[validate-section-containers] PASS — ' + total + ' blog <section>s all width-constrained (' + files.length + ' pages)');
