#!/usr/bin/env node
/*
 * FAQ schema ↔ visible FAQ consistency gate.
 *
 * HARD GATE since 2026-10-01: the build chain runs this with --strict, so a
 * count mismatch, an unmatched question, or ANY schema-vs-body text difference
 * exits non-zero and blocks the deploy. The historical wording-only backlog was
 * driven to 0 on 2026-10-01 (308 pages / 1838 answers), which is what made the
 * strict switch safe. --strict / FAQ_CONSISTENCY_STRICT=1 remain the explicit
 * switches; running the file bare is still warn-first for ad-hoc debugging.
 *
 * Scope: built _site HTML pages carrying a FAQPage JSON-LD node and a
 * visible .faq-answer FAQ body. It parses JSON-LD as JSON and compares
 * normalized visible text against Question.name / acceptedAnswer.text.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SITE = path.join(ROOT, '_site');
const STRICT = process.argv.includes('--strict') || process.env.FAQ_CONSISTENCY_STRICT === '1';
const VERBOSE = process.argv.includes('--verbose') || process.env.FAQ_CONSISTENCY_VERBOSE === '1';
const MAX_ROWS = Number(process.env.FAQ_CONSISTENCY_ROWS || 20);

function walkHtml(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walkHtml(p, out);
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

const ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
  mdash: '—', ndash: '–', hellip: '…', laquo: '«', raquo: '»',
  times: '×', divide: '÷', deg: '°', plusmn: '±', euro: '€',
  pound: '£', yen: '¥', cent: '¢', sect: '§', copy: '©', reg: '®',
  rarr: '→', larr: '←', uarr: '↑', darr: '↓', harr: '↔', check: '✓', cross: '✗',
};

function decodeEntities(s) {
  return String(s).replace(/&(#x[0-9a-f]+|#\d+|[a-z][a-z0-9]+);/gi, (m, body) => {
    if (body[0] === '#') {
      const cp = body[1].toLowerCase() === 'x' ? parseInt(body.slice(2), 16) : parseInt(body.slice(1), 10);
      if (!Number.isFinite(cp)) return m;
      try { return String.fromCodePoint(cp); } catch { return m; }
    }
    return Object.prototype.hasOwnProperty.call(ENTITIES, body) ? ENTITIES[body] : m;
  });
}

function textFromHtml(s) {
  let x = String(s);
  x = x.replace(/<script\b[\s\S]*?<\/script>/gi, ' ');
  x = x.replace(/<style\b[\s\S]*?<\/style>/gi, ' ');
  x = x.replace(/<\/?(?:p|div|li|ul|ol|h[1-6]|tr|td|th|thead|tbody|table|section|article|aside|blockquote|figure|figcaption|nav|header|footer|br|hr|dl|dt|dd|pre)\b[^>]*>/gi, ' ');
  x = x.replace(/<[^>]+>/g, '');
  return decodeEntities(x).replace(/\s+/g, ' ').trim();
}

function normalize(s) {
  return textFromHtml(s)
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+([.,;:!?。！？])/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokens(s) {
  return (normalize(s).match(/[\p{L}\p{N}]+/gu) || []);
}

function jaccard(a, b) {
  const A = new Set(a), B = new Set(b);
  if (!A.size && !B.size) return 1;
  let inter = 0;
  for (const x of A) if (B.has(x)) inter++;
  return inter / (A.size + B.size - inter || 1);
}

function jsonLdNodes(html) {
  const out = [];
  const re = /<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html))) {
    try {
      const parsed = JSON.parse(m[1]);
      const arr = Array.isArray(parsed) ? parsed : (parsed['@graph'] || [parsed]);
      for (const node of arr) if (node && typeof node === 'object') out.push(node);
    } catch {
      // JSON syntax is validated elsewhere.
    }
  }
  return out;
}

function nodeHasType(node, type) {
  const t = node && node['@type'];
  return Array.isArray(t) ? t.includes(type) : t === type;
}

function extractSchemaFaq(html) {
  const faq = jsonLdNodes(html).find((n) => nodeHasType(n, 'FAQPage'));
  const q = [], a = [];
  if (!faq || !Array.isArray(faq.mainEntity)) return { questions: q, answers: a };
  for (const item of faq.mainEntity) {
    if (!item || !nodeHasType(item, 'Question')) continue;
    q.push(String(item.name || ''));
    a.push(String((item.acceptedAnswer && item.acceptedAnswer.text) || ''));
  }
  return { questions: q, answers: a };
}

function extractFirstTag(block, tag) {
  const re = new RegExp('<' + tag + '\\b[^>]*>([\\s\\S]*?)<\\/' + tag + '>', 'i');
  const m = block.match(re);
  return m ? m[1] : '';
}

// Depth-aware: return the inner HTML of every <div class="...faq-answer..."> block,
// so nested <div> inside an answer (e.g. mobile table scroll wrapper) does not truncate it.
function faqAnswerBlocks(html) {
  const out = [];
  const open = /<div\b[^>]*class="[^"]*\bfaq-answer\b[^"]*"[^>]*>/gi;
  let m;
  while ((m = open.exec(html))) {
    const start = m.index + m[0].length;
    let depth = 1;
    const tagRe = /<\/?div\b[^>]*>/gi;
    tagRe.lastIndex = start;
    let t;
    while ((t = tagRe.exec(html))) {
      if (t[0].startsWith('</')) { depth--; if (depth === 0) { out.push(html.slice(start, t.index)); break; } }
      else if (!t[0].endsWith('/>')) depth++;
    }
  }
  return out;
}

function extractBodyFaq(html) {
  const q = [], a = [];
  const body = html.replace(/<script\b[\s\S]*?<\/script>/gi, ' ');

  // Layout A: <div class="faq-answer"><h3>Q</h3><p>A</p>...</div>
  for (const inner of faqAnswerBlocks(body)) {
    const question = extractFirstTag(inner, 'h3');
    const answer = extractFirstTag(inner, 'p');
    if (question && answer) { q.push(question); a.push(answer); }
  }
  if (q.length) return { questions: q, answers: a };

  // Layout B: <h3>Q</h3> ... <p class="faq-answer">A</p>
  for (const m of body.matchAll(/<h3\b[^>]*>([\s\S]*?)<\/h3>\s*<p\b[^>]*class="[^"]*\bfaq-answer\b[^"]*"[^>]*>([\s\S]*?)<\/p>/gi)) {
    q.push(m[1]); a.push(m[2]);
  }
  if (q.length) return { questions: q, answers: a };

  // Layout C: <details class="faq-item"><summary>Q</summary><div class="faq-answer">A</div></details>
  for (const m of body.matchAll(/<details\b[^>]*class="[^"]*\bfaq-item\b[^"]*"[^>]*>([\s\S]*?)<\/details>/gi)) {
    const block = m[1];
    const question = extractFirstTag(block, 'summary');
    const ab = faqAnswerBlocks(block);
    if (question && ab.length) { q.push(question); a.push(ab[0]); }
  }
  return { questions: q, answers: a };
}

function pairQuestions(schemaQ, bodyQ) {
  const pairs = [];
  const candidates = [];
  for (let i = 0; i < schemaQ.length; i++) {
    const st = tokens(schemaQ[i]);
    for (let j = 0; j < bodyQ.length; j++) {
      candidates.push({ i, j, score: jaccard(st, tokens(bodyQ[j])) });
    }
  }
  candidates.sort((x, y) => y.score - x.score || x.i - y.i || x.j - y.j);
  const usedS = new Set(), usedB = new Set();
  for (const c of candidates) {
    if (c.score < 0.35 || usedS.has(c.i) || usedB.has(c.j)) continue;
    usedS.add(c.i); usedB.add(c.j);
    pairs.push(c);
  }
  const orphanS = schemaQ.map((_, i) => i).filter((i) => !usedS.has(i));
  const orphanB = bodyQ.map((_, j) => j).filter((j) => !usedB.has(j));
  if (orphanS.length && orphanS.length === orphanB.length) {
    for (let k = 0; k < orphanS.length; k++) pairs.push({ i: orphanS[k], j: orphanB[k], score: null });
    return { pairs: pairs.sort((x, y) => x.i - y.i), orphanS: [], orphanB: [] };
  }
  return { pairs: pairs.sort((x, y) => x.i - y.i), orphanS, orphanB };
}

function main() {
  if (!fs.existsSync(SITE)) {
    console.error('[validate-faq-consistency] FAIL — _site not found; run the build first');
    process.exit(1);
  }

  const rows = [];
  let pages = 0, schemaQ = 0, bodyQ = 0, countMismatch = 0, unmatched = 0, answerMismatch = 0, questionMismatch = 0;

  for (const file of walkHtml(SITE)) {
    const html = fs.readFileSync(file, 'utf8');
    if (!/"FAQPage"/.test(html)) continue;
    const schema = extractSchemaFaq(html);
    const body = extractBodyFaq(html);
    if (!schema.questions.length && !body.questions.length) continue;

    pages++;
    schemaQ += schema.questions.length;
    bodyQ += body.questions.length;
    const rel = '/' + path.relative(SITE, file).replace(/\\/g, '/').replace(/index\.html$/, '');

    if (schema.questions.length !== body.questions.length) countMismatch++;
    const pairing = pairQuestions(schema.questions, body.questions);
    if (pairing.orphanS.length || pairing.orphanB.length) unmatched += pairing.orphanS.length + pairing.orphanB.length;

    const bad = [];
    for (const p of pairing.pairs) {
      const sq = schema.questions[p.i], bq = body.questions[p.j];
      if (normalize(sq) !== normalize(bq)) {
        questionMismatch++;
        bad.push({ type: 'question', pair: p.i + 1, schema: sq, body: bq });
      }
      const sa = schema.answers[p.i] || '', ba = body.answers[p.j] || '';
      if (normalize(sa) !== normalize(ba)) {
        answerMismatch++;
        bad.push({ type: 'answer', pair: p.i + 1, schema: sa, body: ba });
      }
    }
    for (const i of pairing.orphanS) bad.push({ type: 'schema-only', pair: i + 1, schema: schema.questions[i], body: '' });
    for (const j of pairing.orphanB) bad.push({ type: 'body-only', pair: j + 1, schema: '', body: body.questions[j] });
    if (bad.length) rows.push({ rel, schema: schema.questions.length, body: body.questions.length, bad });
  }

  console.log('=== FAQ schema ↔ visible body consistency ===');
  console.log('pages with FAQ              : ' + pages);
  console.log('schema answers              : ' + schemaQ);
  console.log('visible answers             : ' + bodyQ);
  console.log('count mismatches            : ' + countMismatch);
  console.log('unmatched questions         : ' + unmatched);
  console.log('question text mismatches    : ' + questionMismatch);
  console.log('answer text mismatches      : ' + answerMismatch);
  console.log('pages with text differences : ' + rows.length);

  const fail = STRICT
    ? (countMismatch || unmatched || questionMismatch || answerMismatch)
    : (countMismatch || unmatched);

  if (rows.length && (VERBOSE || fail)) {
    console.log('\nTop pages needing review:');
    for (const r of rows.slice(0, MAX_ROWS)) {
      console.log('  ' + r.rel + '  schema=' + r.schema + ' body=' + r.body + ' issues=' + r.bad.length);
      for (const b of r.bad.slice(0, 2)) {
        console.log('     - ' + b.type + ' Q' + b.pair + ' schema="' + normalize(b.schema).slice(0, 90) + '" body="' + normalize(b.body).slice(0, 90) + '"');
      }
    }
    if (rows.length > MAX_ROWS) console.log('  ... +' + (rows.length - MAX_ROWS) + ' more pages');
  }

  if (fail) {
    console.error('[validate-faq-consistency] FAIL — FAQ schema/body structural mismatches found');
    process.exit(1);
  }
  console.log('[validate-faq-consistency] PASS — structural FAQ counts/pairing clean' + (STRICT ? '' : ' (text differences are warnings until --strict)'));
}

if (require.main === module) main();
module.exports = { extractSchemaFaq, extractBodyFaq, normalize, pairQuestions };
