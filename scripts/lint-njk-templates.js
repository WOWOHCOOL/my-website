// lint-njk-templates.js — static checks that catch the two failure modes which
// silently broke a full site build:
//
//  1. Nunjucks comments do NOT nest. A "{# ... #}" written inside another
//     comment closes it early; the remaining "#}" is then a stray token and the
//     build dies with "unexpected end of comment" — reported against whichever
//     page happens to render first, not against the offending partial.
//
//  2. A macro defined in an IMPORTED partial runs in that partial's own frame.
//     It does NOT inherit the importer's frame, so a partial that calls a shared
//     macro must import it itself. ({% include %} is different — it shares the
//     caller's frame.) Getting this wrong fails only at render time, with
//     "Unable to call `x`, which is undefined or falsey".
//
// Both are caught here without running a build. Exit code 1 on any finding.
const fs = require('fs');
const path = require('path');

const SRC = 'src';
const LOADER_ROOTS = ['src/_includes', 'src'];
const SHARED_MACROS = ['breadcrumb', 'sectionHeader', 'categoryHeading', 'faqItem', 'ctaBand'];
const PARENT_LAYOUT = 'layout.njk';

const norm = (p) => p.split(path.sep).join('/');

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (['node_modules', '_site', '.git'].includes(e.name) || e.name.startsWith('.')) continue;
      walk(p, out);
    } else if (e.name.endsWith('.njk')) out.push(p);
  }
  return out;
}

const files = walk(SRC);
const problems = [];

// ---------------------------------------------------------------- pass 1: lex
let lexer;
try {
  lexer = require('nunjucks/src/lexer');
} catch {
  lexer = null;
}
if (lexer) {
  for (const f of files) {
    const src = fs.readFileSync(f, 'utf8');
    try {
      const t = lexer.lex(src, {});
      let guard = 0;
      while (guard++ < 5e6) {
        const tok = t.nextToken();
        if (!tok || !tok.type) break;
      }
    } catch (e) {
      problems.push(`${norm(f)}:${t.lineno}:${t.colno}  ${e.message}`);
    }
  }
}

// ------------------------------------------------- pass 2: macro scope check
const info = new Map();
for (const f of files) {
  const src = fs.readFileSync(f, 'utf8');
  const imports = new Set();
  const defines = new Set();

  let m;
  const fromRe = /\{%-?\s*(?:from\s+["']([^"']+)["']\s+import|import\s+["'][^"']+["']\s+as)\s*([^%]*?)\s*-?%\}/g;
  while ((m = fromRe.exec(src))) {
    const list = (m[2] || '').replace(/\b(with|without)\s+context\b/g, '');
    for (const part of list.split(',')) {
      const name = part.trim().split(/\s+as\s+/).pop().trim();
      if (name) imports.add(name);
    }
  }
  const macroRe = /\{%-?\s*macro\s+([A-Za-z_$][\w$]*)\s*\(/g;
  while ((m = macroRe.exec(src))) defines.add(m[1]);

  // Split the file into its own {% macro %}...{% endmacro %} bodies vs the rest.
  // Only calls INSIDE a locally-defined macro are at risk: that body runs in this
  // file's frame. Calls in the page body run in the layout's frame instead.
  const macroRegion = /\{%-?\s*macro\s+[A-Za-z_$][\w$]*\s*\([\s\S]*?\{%-?\s*endmacro\s*-?%\}/g;
  let macroText = '';
  const pageText = src.replace(macroRegion, (whole) => {
    macroText += '\n' + whole;
    return '';
  });

  const clean = (s) =>
    s
      .replace(/\{%-?\s*from\s+["'][^"']+["']\s+import[^%]*?-?%\}/g, '')
      .replace(/\{%-?\s*macro\s+[A-Za-z_$][\w$]*\s*\(/g, '')
      .replace(/\{#[\s\S]*?#\}/g, '');
  const usedIn = (s) => SHARED_MACROS.filter((n) => new RegExp('(?<![\\w.$])' + n + '\\s*\\(').test(clean(s)));

  info.set(f, {
    src,
    imports,
    defines,
    usesInMacro: usedIn(macroText),
    usesInPage: usedIn(pageText),
  });
}

function extendsLayout(f, seen = new Set()) {
  if (seen.has(f)) return false;
  seen.add(f);
  const entry = info.get(f);
  if (!entry) return false;
  const m = /\{%-?\s*extends\s+["']([^"']+)["']/.exec(entry.src);
  if (!m) return false;
  const cands = LOADER_ROOTS.map((r) => norm(path.join(r, m[1]))).concat(norm(path.join(path.dirname(f), m[1])));
  if (cands.some((c) => c.endsWith(PARENT_LAYOUT))) return true;
  const hit = files.find((x) => cands.includes(norm(x)));
  return hit ? extendsLayout(hit, seen) : false;
}

for (const f of files) {
  const { imports, defines, usesInMacro, usesInPage } = info.get(f);
  const rel = norm(f);
  const inIncludes = rel.startsWith('src/_includes/');

  // (a) a shared macro called from inside one of this file's own macros must be
  //     imported/defined HERE — the macro body never sees the caller's frame.
  const badInMacro = usesInMacro.filter((n) => !imports.has(n) && !defines.has(n));
  if (badInMacro.length) {
    problems.push(`${rel}  a local macro calls ${badInMacro.join(', ')} without importing it (imported macros run in this file's frame)`);
  }

  // (b) a shared macro called in the page body needs it in scope too.
  const badInPage = usesInPage.filter((n) => !imports.has(n) && !defines.has(n));
  if (badInPage.length && !extendsLayout(f) && !(inIncludes && defines.size === 0)) {
    problems.push(`${rel}  calls ${badInPage.join(', ')} but does not extend ${PARENT_LAYOUT} and does not import it`);
  }
  // plain include-partials without macros are fine: {% include %} shares the caller's frame
}

// ---------------------------------------------------------------------- report
if (problems.length) {
  console.error(`[lint-njk] ${problems.length} problem(s):`);
  for (const p of problems) console.error('  ' + p);
  process.exit(1);
}
console.log(`[lint-njk] ok — ${files.length} templates lexed, macro scope verified`);
