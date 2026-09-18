// Section geometry verifier for wowohcool.com.
//
// Measures, for every depth-0 <section> on every non-blog page:
//   - the container tier it resolves to (wide/content/narrow/none)
//   - its content-box left/right edges, so section alignment is a number,
//     not something judged by eye across 152 pages x N breakpoints
//   - leaf text nodes that overflow their own box
//
// Runs BOTH viewports (desktop 1440 / mobile 390) through a fixed-size
// IFRAME harness. The iframe is not a shortcut -- `--window-size=390,780`
// does not set the layout viewport to 390 on this Chrome build, so a real
// mobile measurement has to come from an iframe of that width. Using the
// iframe for desktop too keeps one code path for both.
//
// Usage:
//   node scripts/verify-sections.js --baseline _sections-base.json
//   node scripts/verify-sections.js --diff _sections-base.json
//   node scripts/verify-sections.js --pages /about/,/faq/ --dump
//
// Exit code: 0 clean, 1 when --diff finds displacement or overflow.

'use strict';

const fs = require('fs');
const http = require('http');
const os = require('os');
const path = require('path');
const { execFile } = require('child_process');

const ROOT = path.resolve(__dirname, '..');

const CHROME_CANDIDATES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  path.join(os.homedir(), 'AppData/Local/Google/Chrome/Application/chrome.exe'),
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
];

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

// ─── args ────────────────────────────────────────────────────────────────────

function parseArgs(argv) {
  const a = {
    dir: '_site_base',
    port: 8220,
    desktop: 1440,
    mobile: 390,
    baseline: null,
    diff: null,
    pages: null,
    dump: false,
    tolerance: 1,
    quiet: false,
  };
  for (let i = 2; i < argv.length; i++) {
    const t = argv[i];
    if (t === '--baseline') a.baseline = argv[++i];
    else if (t === '--diff') a.diff = argv[++i];
    else if (t === '--dir') a.dir = argv[++i];
    else if (t === '--port') a.port = Number(argv[++i]);
    else if (t === '--desktop') a.desktop = Number(argv[++i]);
    else if (t === '--mobile') a.mobile = Number(argv[++i]);
    else if (t === '--pages') a.pages = argv[++i].split(',').map(s => s.trim()).filter(Boolean);
    else if (t === '--tolerance') a.tolerance = Number(argv[++i]);
    else if (t === '--dump') a.dump = true;
    else if (t === '--quiet') a.quiet = true;
    else if (t === '--help' || t === '-h') a.help = true;
    else throw new Error(`unknown flag: ${t}`);
  }
  return a;
}

const USAGE = `Section geometry verifier.

  node scripts/verify-sections.js --baseline <out.json>   record a baseline
  node scripts/verify-sections.js --diff <in.json>        compare against one
  node scripts/verify-sections.js --dump                  print, no file

Options
  --dir <path>      static output dir to measure   (default _site_base)
  --port <n>        local server port, first free one wins (default 8220)
  --desktop <px>    desktop viewport width         (default 1440)
  --mobile <px>     mobile viewport width          (default 390)
  --pages <a,b>     restrict to these URL paths
  --tolerance <px>  allowed displacement           (default 1)
`;

// ─── static server ───────────────────────────────────────────────────────────

function findChrome() {
  for (const c of CHROME_CANDIDATES) if (fs.existsSync(c)) return c;
  throw new Error('no Chrome found; tried:\n  ' + CHROME_CANDIDATES.join('\n  '));
}

function listPages(dir, filter) {
  const out = [];
  const walk = d => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) {
        if (e.name === 'blog') continue; // article pages are out of scope
        walk(p);
      } else if (e.name.endsWith('.html')) {
        let rel = '/' + path.relative(dir, p).split(path.sep).join('/');
        rel = rel.replace(/index\.html$/, '');
        if (rel !== '/404.html') out.push(rel);
      }
    }
  };
  walk(dir);
  let pages = out.sort();
  if (filter) {
    const set = new Set(filter.map(p => (p.endsWith('/') ? p : p + '/')));
    pages = pages.filter(p => set.has(p));
  }
  return pages;
}

function startServer(dir, port) {
  const server = http.createServer((req, res) => {
    const url = decodeURIComponent(req.url.split('?')[0]);
    if (url === '/__verify__') {
      res.writeHead(200, { 'Content-Type': MIME['.html'] });
      return res.end(HARNESS);
    }
    let file = path.join(dir, url);
    if (!file.startsWith(dir)) {
      res.writeHead(403);
      return res.end('forbidden');
    }
    try {
      if (fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    } catch {
      res.writeHead(404);
      return res.end('not found');
    }
    fs.readFile(file, (err, buf) => {
      if (err) {
        res.writeHead(404);
        return res.end('not found');
      }
      res.writeHead(200, {
        'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream',
        'Cache-Control': 'no-store',
      });
      res.end(buf);
    });
  });
  // Windows reserves swathes of TCP ports for Hyper-V/WSL, and the reserved
  // ranges differ per machine. Rather than hardcode a port that happens to be
  // free here, walk upward until one binds.
  return new Promise((resolve, reject) => {
    let attempt = 0;
    const tryPort = p => {
      server.once('error', err => {
        if ((err.code === 'EACCES' || err.code === 'EADDRINUSE') && attempt++ < 50) {
          return tryPort(p + 1);
        }
        reject(err);
      });
      server.listen(p, '127.0.0.1', () => resolve({ server, port: p }));
    };
    tryPort(port);
  });
}

// ─── harness (runs inside headless Chrome) ───────────────────────────────────

const HARNESS = `<!doctype html>
<html><head><meta charset="utf-8"><title>verify-sections</title>
<style>html,body{margin:0;padding:0;overflow:hidden}iframe{border:0;display:block;background:#fff}</style>
</head><body>
<pre id="log">BOOT</pre>
<iframe id="frame"></iframe>
<script>
var qs = new URLSearchParams(location.search);
var target = qs.get('path');
var width = parseInt(qs.get('w'), 10) || 1440;
var frame = document.getElementById('frame');
frame.width = width;
frame.height = 1200;
var round = 0;

function b64(s) {
  var bytes = new TextEncoder().encode(s), bin = '';
  for (var i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}

function contentBox(el, win) {
  var r = el.getBoundingClientRect();
  var cs = win.getComputedStyle(el);
  var pl = parseFloat(cs.paddingLeft) || 0, pr = parseFloat(cs.paddingRight) || 0;
  var bl = parseFloat(cs.borderLeftWidth) || 0, br = parseFloat(cs.borderRightWidth) || 0;
  return {
    borderLeft: +r.left.toFixed(2), borderRight: +r.right.toFixed(2),
    borderWidth: +r.width.toFixed(2),
    left: +(r.left + bl + pl).toFixed(2),
    right: +(r.right - br - pr).toFixed(2),
    width: +(r.width - bl - br - pl - pr).toFixed(2),
  };
}

function pickTier(el) {
  var m = /container-(wide|content|narrow)\\b/.exec(el.className || '');
  return m ? m[1] : null;
}

function measure(doc, win) {
  var de = doc.documentElement;
  var sections = [];
  var all = doc.querySelectorAll('section');
  var idx = 0;
  for (var i = 0; i < all.length; i++) {
    var s = all[i];
    // depth-0 only: skip sections nested inside another section
    if (s.parentElement && s.parentElement.closest('section')) continue;
    var candidates = s.querySelectorAll('[class*="container-"]');
    var inner = null, tier = null;
    for (var j = 0; j < candidates.length; j++) {
      // ignore containers that live inside a deeper nested section
      var owner = candidates[j].parentElement ? candidates[j].parentElement.closest('section') : null;
      if (owner && owner !== s) continue;
      var t = pickTier(candidates[j]);
      if (t) { inner = candidates[j]; tier = t; break; }
    }
    var target = inner || s;
    var box = contentBox(target, win);
    sections.push({
      idx: idx++,
      id: s.id || null,
      dataSection: s.getAttribute('data-section'),
      tier: tier || 'none',
      source: inner ? 'inner' : (pickTier(s) ? 'self' : 'raw'),
      cls: (s.className || '').slice(0, 120),
      sec: contentBox(s, win),
      box: box,
    });
  }

  var textOverflow = [];
  var leaves = doc.querySelectorAll('p,span,li,h1,h2,h3,h4,h5,h6,a,td,th,div,dt,dd,strong,em,button,label');
  for (var k = 0; k < leaves.length; k++) {
    var el = leaves[k];
    if (el.children.length) continue;
    var txt = (el.textContent || '').trim();
    if (!txt) continue;
    if (el.scrollWidth > el.clientWidth + 1 && el.clientWidth > 0) {
      var cs = win.getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden') continue;
      textOverflow.push({
        tag: el.tagName.toLowerCase(),
        cls: (el.className || '').slice(0, 80),
        clientWidth: el.clientWidth,
        scrollWidth: el.scrollWidth,
        text: txt.slice(0, 48),
      });
    }
  }

  return {
    width: width,
    clientWidth: de.clientWidth,
    docScrollWidth: de.scrollWidth,
    docOverflow: de.scrollWidth > de.clientWidth + 1,
    scrollHeight: de.scrollHeight,
    sections: sections,
    textOverflow: textOverflow.slice(0, 40),
    textOverflowCount: textOverflow.length,
  };
}

function run() {
  round++;
  var doc = frame.contentDocument, win = frame.contentWindow;
  var style = doc.createElement('style');
  // Force .reveal to its settled state. Adding .active alone is not enough:
  // the 0.6s transition is still mid-flight and the page measures grey.
  style.textContent = '.reveal{opacity:1 !important;transform:none !important;transition:none !important}';
  doc.head.appendChild(style);

  setTimeout(function () {
    var result;
    try {
      result = measure(doc, win);
    } catch (e) {
      result = { error: String(e) };
    }
    // First pass can misreport while CSS is still settling -- reload once
    // and keep the second reading.
    if (round < 2 && !result.error) {
      frame.src = target + (target.indexOf('?') >= 0 ? '&' : '?') + '_r=' + round;
      return;
    }
    document.getElementById('log').textContent = 'RESULT:' + b64(JSON.stringify(result));
  }, 250);
}

frame.addEventListener('load', function () {
  // setTimeout, not requestAnimationFrame: rAF does not advance under
  // --virtual-time-budget, so it would never fire.
  setTimeout(run, 500);
});
frame.src = target;
</script>
</body></html>`;

// ─── chrome driver ───────────────────────────────────────────────────────────

function measurePage(chrome, port, chromeProfile, urlPath, width) {
  const url = `http://127.0.0.1:${port}/__verify__?path=${encodeURIComponent(urlPath)}&w=${width}`;
  const args = [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--no-first-run',
    '--disable-extensions',
    '--mute-audio',
    '--hide-scrollbars',
    `--user-data-dir=${chromeProfile}`,
    '--virtual-time-budget=30000',
    '--dump-dom',
    url,
  ];
  return new Promise((resolve, reject) => {
    execFile(chrome, args, { maxBuffer: 64 * 1024 * 1024, timeout: 90000 }, (err, stdout) => {
      if (err && !stdout) return reject(err);
      const m = /RESULT:([A-Za-z0-9+/=]+)/.exec(stdout || '');
      if (!m) {
        return reject(new Error(`no RESULT marker for ${urlPath} @${width}px`));
      }
      try {
        resolve(JSON.parse(Buffer.from(m[1], 'base64').toString('utf8')));
      } catch (e) {
        reject(new Error(`bad payload for ${urlPath} @${width}px: ${e.message}`));
      }
    });
  });
}

// ─── comparison ──────────────────────────────────────────────────────────────

function compare(base, cur, tolerance) {
  const findings = [];
  const basePages = base.pages || {};
  for (const page of Object.keys(cur.pages)) {
    if (!basePages[page]) {
      findings.push({ page, kind: 'new-page' });
      continue;
    }
    for (const vp of ['desktop', 'mobile']) {
      const b = basePages[page][vp], c = cur.pages[page][vp];
      if (!b || !c) continue;
      if (b.textOverflowCount === 0 && c.textOverflowCount > 0) {
        findings.push({
          page, viewport: vp, kind: 'new-text-overflow',
          detail: c.textOverflow.slice(0, 3),
        });
      }
      if (!b.docOverflow && c.docOverflow) {
        findings.push({ page, viewport: vp, kind: 'new-doc-overflow' });
      }
      const byIdx = new Map(c.sections.map(s => [s.idx, s]));
      for (const bs of b.sections) {
        const cs = byIdx.get(bs.idx);
        if (!cs) {
          findings.push({ page, viewport: vp, kind: 'section-removed', idx: bs.idx, id: bs.id });
          continue;
        }
        const dl = cs.box.left - bs.box.left;
        const dr = cs.box.right - bs.box.right;
        if (Math.abs(dl) > tolerance || Math.abs(dr) > tolerance) {
          findings.push({
            page, viewport: vp, kind: 'displaced', idx: bs.idx, id: bs.id,
            tier: `${bs.tier} -> ${cs.tier}`,
            deltaLeft: +dl.toFixed(2), deltaRight: +dr.toFixed(2),
          });
        } else if (bs.tier !== cs.tier) {
          findings.push({
            page, viewport: vp, kind: 'tier-changed-zero-shift', idx: bs.idx, id: bs.id,
            tier: `${bs.tier} -> ${cs.tier}`,
          });
        }
        if (bs.dataSection !== cs.dataSection) {
          findings.push({
            page, viewport: vp, kind: 'data-section-changed', idx: bs.idx, id: bs.id,
            detail: `${bs.dataSection} -> ${cs.dataSection}`,
          });
        }
      }
    }
  }
  return findings;
}

// ─── main ────────────────────────────────────────────────────────────────────

async function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    process.stdout.write(USAGE);
    return 0;
  }
  if (!args.baseline && !args.diff && !args.dump) {
    process.stderr.write(USAGE);
    return 2;
  }

  const dir = path.resolve(ROOT, args.dir);
  if (!fs.existsSync(dir)) {
    throw new Error(`output dir not found: ${dir}\nbuild one first:  npx @11ty/eleventy --output=${args.dir}`);
  }

  const chrome = findChrome();
  const pages = listPages(dir, args.pages);
  if (!pages.length) throw new Error(`no pages found in ${dir}`);

  if (!args.quiet) {
    process.stdout.write(`verify-sections: ${pages.length} pages, ${args.desktop}px + ${args.mobile}px\n`);
  }

  const started = await startServer(dir, args.port);
  const server = started.server;
  if (started.port !== args.port && !args.quiet) {
    process.stdout.write(`  port ${args.port} unavailable, using ${started.port}\n`);
  }
  const chromeProfile = fs.mkdtempSync(path.join(os.tmpdir(), 'verify-sections-'));

  const result = {
    generatedAt: new Date().toISOString(),
    dir: args.dir,
    viewports: { desktop: args.desktop, mobile: args.mobile },
    pages: {},
  };

  let failures = 0;
  try {
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const rec = {};
      for (const [vp, w] of [['desktop', args.desktop], ['mobile', args.mobile]]) {
        try {
          rec[vp] = await measurePage(chrome, started.port, chromeProfile, page, w);
        } catch (e) {
          failures++;
          rec[vp] = { error: e.message };
          if (!args.quiet) process.stdout.write(`  !! ${page} @${vp}: ${e.message}\n`);
        }
      }
      result.pages[page] = rec;

      if (args.dump) {
        for (const vp of ['desktop', 'mobile']) {
          const r = rec[vp];
          if (r.error) continue;
          const edges = r.sections.map(s => `${s.box.left}..${s.box.right}(${s.tier})`);
          const uniq = [...new Set(r.sections.map(s => `${s.box.left}..${s.box.right}`))];
          process.stdout.write(
            `${page} [${vp} ${r.clientWidth}px] sec=${r.sections.length} distinct-edges=${uniq.length}` +
            ` overflow=${r.textOverflowCount}${r.docOverflow ? ' DOC-OVERFLOW' : ''}\n`
          );
          if (uniq.length > 1) {
            process.stdout.write(`    ${edges.join('  ')}\n`);
          }
        }
      } else if (!args.quiet && (i + 1) % 20 === 0) {
        process.stdout.write(`  ${i + 1}/${pages.length}\n`);
      }
    }
  } finally {
    server.close();
    try {
      fs.rmSync(chromeProfile, { recursive: true, force: true });
    } catch { /* chrome may still hold a handle */ }
  }

  if (args.baseline) {
    const out = path.resolve(ROOT, args.baseline);
    fs.writeFileSync(out, JSON.stringify(result, null, 2));
    process.stdout.write(`baseline written: ${out}\n`);
  }

  if (args.diff) {
    const base = JSON.parse(fs.readFileSync(path.resolve(ROOT, args.diff), 'utf8'));
    const findings = compare(base, result, args.tolerance);
    if (!findings.length) {
      process.stdout.write('diff: no displacement, no new overflow\n');
    } else {
      const byKind = findings.reduce((m, f) => ((m[f.kind] = (m[f.kind] || 0) + 1), m), {});
      process.stdout.write(`diff: ${findings.length} finding(s) ${JSON.stringify(byKind)}\n`);
      for (const f of findings.slice(0, 60)) {
        process.stdout.write(
          `  ${f.kind.padEnd(26)} ${f.page}${f.viewport ? ' [' + f.viewport + ']' : ''}` +
          `${f.idx !== undefined ? ' sec#' + f.idx : ''}${f.id ? ' #' + f.id : ''}` +
          `${f.tier ? ' ' + f.tier : ''}` +
          `${f.deltaLeft !== undefined ? ` dL=${f.deltaLeft} dR=${f.deltaRight}` : ''}\n`
        );
      }
      if (findings.length > 60) process.stdout.write(`  ... and ${findings.length - 60} more\n`);
      return 1;
    }
  }

  return failures ? 1 : 0;
}

main()
  .then(code => process.exit(code))
  .catch(e => {
    process.stderr.write(`verify-sections: ${e.message}\n`);
    process.exit(2);
  });
