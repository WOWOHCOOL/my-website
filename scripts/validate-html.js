// HTML conformance validator (v2).
//
// Usage:  node scripts/validate-html.js [_site]      (arg = build dir, default _site)
//
// Reports:
//   - stray end tags (no matching open element)
//   - end tags that implicitly close a NON-optional-end-tag element
//     (e.g. </aside> while <a> is still open -> non-conforming)
//   - elements left unclosed at EOF
//   - heading outline problems: no/multiple <h1>, first heading not <h1>,
//     skipped levels (h1 -> h3), empty headings
// Quoted attribute values are honoured so ">" inside attributes can't break parsing.
//
// WHY THE "implicitly closes" CHECK MATTERS: a plain stack walker that does
// `stack.length = k` silently DISCARDS unclosed elements, so perfectly balanced
// tag counts can still hide a mis-nested document. Only elements whose end tag
// is optional (see OPTIONAL_END) may be closed implicitly by an ancestor.
//
// WHY THE HEADING CHECK MATTERS: footer.njk contributes 3 <h3> and modal.njk
// 1 <h3> to EVERY page, so any page whose body has no <h2> jumps H1 -> H3.
// See .workbuddy-ai/memory/RULES-AUDIT.md for the full playbook.
const fs = require('fs');
const path = require('path');

const VOID = new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
// elements whose end tag may be omitted (HTML spec "optional tags")
const OPTIONAL_END = new Set(['html','head','body','p','li','dt','dd','option','optgroup','rb','rp','rt','rtc','thead','tbody','tfoot','tr','td','th','colgroup','caption']);
const P_CLOSERS = new Set(['address','article','aside','blockquote','details','div','dl','fieldset','figcaption','figure','footer','form','h1','h2','h3','h4','h5','h6','header','hgroup','hr','main','menu','nav','ol','p','pre','section','table','ul']);

function tokenize(h) {
  const out = [];
  let i = 0;
  while (i < h.length) {
    const lt = h.indexOf('<', i);
    if (lt < 0) break;
    if (h.startsWith('<!--', lt)) { const e = h.indexOf('-->', lt + 4); i = e < 0 ? h.length : e + 3; continue; }
    if (h.startsWith('<!', lt)) { const e = h.indexOf('>', lt); i = e < 0 ? h.length : e + 1; continue; }
    if (h.startsWith('<?', lt)) { const e = h.indexOf('>', lt); i = e < 0 ? h.length : e + 1; continue; }
    // scan the tag honouring quotes
    let j = lt + 1, closing = false;
    if (h[j] === '/') { closing = true; j++; }
    const nameStart = j;
    if (!/[a-zA-Z]/.test(h[j] || '')) { i = lt + 1; continue; }   // tag names must start with a letter
    j++;
    while (j < h.length && /[a-zA-Z0-9-]/.test(h[j])) j++;
    const name = h.slice(nameStart, j).toLowerCase();
    let selfClosing = false, quote = null, k = j;
    for (; k < h.length; k++) {
      const c = h[k];
      if (quote) { if (c === quote) quote = null; continue; }
      if (c === '"' || c === "'") { quote = c; continue; }
      if (c === '>') break;
    }
    if (k >= h.length) break;
    selfClosing = h[k - 1] === '/';
    out.push({ closing, name, selfClosing, index: lt });
    i = k + 1;
  }
  return out;
}

function walk(dir, acc) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.name.endsWith('.html')) acc.push(p);
  }
  return acc;
}

const root = process.argv[2] || "_site";
if (!fs.existsSync(root)) {
  console.error('[validate-html] build dir not found: ' + root + ' — run the build first');
  process.exit(1);
}
const files = walk(root, []);
const bad = [];

for (const f of files) {
  let h = fs.readFileSync(f, 'utf8');
  h = h.replace(/<script[\s\S]*?<\/script>/gi, '')
       .replace(/<style[\s\S]*?<\/style>/gi, '')
       .replace(/<svg[\s\S]*?<\/svg>/gi, '')
       .replace(/<template[\s\S]*?<\/template>/gi, '')
       .replace(/<!--[\s\S]*?-->/g, '');

  const toks = tokenize(h);
  const stack = [];
  const errs = [];
  for (const t of toks) {
    if (VOID.has(t.name) || t.selfClosing) continue;
    if (!t.closing) {
      // implicit close of optional-end-tag elements
      if (t.name === 'li' && stack[stack.length - 1] === 'li') stack.pop();
      else if ((t.name === 'td' || t.name === 'th') && (stack[stack.length - 1] === 'td' || stack[stack.length - 1] === 'th')) stack.pop();
      else if (t.name === 'tr') { if (stack[stack.length - 1] === 'td' || stack[stack.length - 1] === 'th') stack.pop(); if (stack[stack.length - 1] === 'tr') stack.pop(); }
      else if (t.name === 'option' && stack[stack.length - 1] === 'option') stack.pop();
      else if ((t.name === 'dt' || t.name === 'dd') && (stack[stack.length - 1] === 'dt' || stack[stack.length - 1] === 'dd')) stack.pop();
      else if (stack[stack.length - 1] === 'p' && P_CLOSERS.has(t.name)) stack.pop();   // <p> auto-closes only on block-level starts
      stack.push(t.name);
      continue;
    }
    let k = stack.length - 1;
    while (k >= 0 && stack[k] !== t.name) k--;
    if (k < 0) {
      errs.push('stray </' + t.name + '>  (stack: ' + (stack.join('>') || 'EMPTY') + ')  line ' + h.slice(0, t.index).split('\n').length);
      continue;
    }
    const skipped = stack.slice(k + 1);
    const illegal = skipped.filter((s) => !OPTIONAL_END.has(s));
    if (illegal.length) {
      errs.push('</' + t.name + '> implicitly closes non-optional <' + illegal.join('>, <') + '>  line ' + h.slice(0, t.index).split('\n').length);
    }
    stack.length = k;
  }
  if (stack.length) errs.push('unclosed at EOF: ' + stack.slice(-8).join(' > '));

  // --- heading outline -------------------------------------------------
  // WHY: footer.njk contributes 3 <h3> and modal.njk 1 <h3> to EVERY page.
  // Any page whose body has no <h2> therefore jumps straight from H1 to H3.
  // See .workbuddy-ai/memory/RULES-AUDIT.md 「标题层级」.
  const hs = [];
  const hre = /<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
  let hm;
  while ((hm = hre.exec(h)) !== null) {
    hs.push({
      lvl: +hm[1],
      txt: hm[2].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim(),
    });
  }
  const h1count = hs.filter((x) => x.lvl === 1).length;
  if (h1count === 0) errs.push('heading outline: no <h1>');
  else if (h1count > 1) errs.push('heading outline: ' + h1count + ' <h1> elements');
  if (hs.length && hs[0].lvl !== 1) errs.push('heading outline: first heading is <h' + hs[0].lvl + '>');
  let prevLvl = null;
  for (const x of hs) {
    if (prevLvl !== null && x.lvl > prevLvl + 1) {
      errs.push('heading outline: <h' + prevLvl + '> -> <h' + x.lvl + '> skips a level at "' + x.txt.slice(0, 50) + '"');
    }
    if (!x.txt) errs.push('heading outline: empty <h' + x.lvl + '>');
    prevLvl = x.lvl;
  }

  if (errs.length) bad.push({ f, errs });
}

console.log('scanned ' + files.length + ' pages in ' + root);
console.log('pages with conformance errors: ' + bad.length);
for (const b of bad) {
  console.log('\n' + b.f.replace(/\\/g, '/'));
  for (const e of b.errs) console.log('   ' + e);
}
if (bad.length) {
  console.error('\n[validate-html] FAIL — ' + bad.length + ' page(s) with conformance errors');
  process.exit(1);
}
console.log('[validate-html] PASS');
