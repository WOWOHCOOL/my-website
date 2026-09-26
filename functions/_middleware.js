/**
 * Cloudflare Pages Function — Markdown for Agents
 * Converts HTML → Markdown when client sends Accept: text/markdown
 * Free tier compatible, no external dependencies
 */

/**
 * RFC 7231 §5.3.2 Accept negotiation.
 *
 * WHY NOT `accept.includes('text/markdown')` — that ignores q-values, so all of
 * these wrongly received markdown:
 *   `text/markdown;q=0`                     explicit refusal
 *   `text/html;q=1.0, text/markdown;q=0.1`  HTML explicitly preferred
 *   `* / *`                                 no preference at all
 *   `text / *`                              no preference at all
 *
 * Instead compute the effective quality of text/markdown and text/html
 * (exact match > type-wildcard > full-wildcard, most specific wins) and serve
 * markdown only when it is genuinely preferred: q(markdown) > 0 AND
 * q(markdown) > q(html). A bare `text/markdown` still yields markdown
 * (qMd=1, qHtml=0).
 *
 * NOTE: never write the literal two-character sequence star-slash inside a
 * block comment (it terminates the comment) — hence `* / *` above.
 */
function parseAccept(header) {
  const out = [];
  for (const part of String(header).split(',')) {
    const seg = part.trim();
    if (!seg) continue;
    const bits = seg.split(';');
    const range = bits[0].trim().toLowerCase();
    const slash = range.indexOf('/');
    if (slash < 1) continue;
    const type = range.slice(0, slash);
    const sub = range.slice(slash + 1);
    if (!type || !sub) continue;
    let q = 1;
    for (let i = 1; i < bits.length; i++) {
      const m = bits[i].trim().match(/^q\s*=\s*(-?[0-9.]+)$/i);
      if (m) { const v = parseFloat(m[1]); if (!isNaN(v)) q = v; }
    }
    if (q < 0) q = 0; else if (q > 1) q = 1;
    out.push({ type, sub, q, spec: (type !== '*' ? 2 : 0) + (sub !== '*' ? 1 : 0) });
  }
  return out;
}

function qualityOf(list, type, sub) {
  let best = null;
  for (const a of list) {
    const hit =
      (a.type === type && a.sub === sub) ||
      (a.type === type && a.sub === '*') ||
      (a.type === '*' && a.sub === '*');
    if (!hit) continue;
    if (best === null || a.spec > best.spec || (a.spec === best.spec && a.q > best.q)) best = a;
  }
  return best ? best.q : 0;
}

export function negotiateMarkdown(accept) {
  if (!accept) return false;
  const list = parseAccept(accept);
  if (!list.length) return false;
  const qMd = qualityOf(list, 'text', 'markdown');
  if (qMd <= 0) return false;
  const qHtml = qualityOf(list, 'text', 'html');
  return qMd > qHtml;
}

export async function onRequest(context) {
  const { request, next } = context;
  const accept = request.headers.get('Accept') || '';
  const wantsMarkdown = negotiateMarkdown(accept);
  const hostname = new URL(request.url).hostname;
  // Preview deployments (*.pages.dev / *.workers.dev) must never be indexed —
  // otherwise every preview build competes with production as duplicate content.
  const isPreviewHost =
    hostname.endsWith('.pages.dev') || hostname.endsWith('.workers.dev');

  const response = await next();
  const ct = response.headers.get('Content-Type') || '';

  // Only HTML pages are affected by content negotiation or indexing rules.
  // Images / CSS / JS / fonts are returned untouched — never reconstructed.
  if (!ct.includes('text/html')) {
    return response;
  }
  // Responses that must not carry a body cannot be reconstructed.
  if (response.status === 204 || response.status === 304) {
    return response;
  }

  // Content negotiation: BOTH variants must declare Vary: Accept. If only the
  // markdown variant did, a shared cache could hand HTML to an agent asking for
  // markdown (both variants share one URL and carry `Cache-Control: public,
  // s-maxage=3600`, so the Accept header is the only thing telling them apart).
  const headers = new Headers(response.headers);
  headers.set('Vary', 'Accept');
  if (isPreviewHost) {
    headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  if (!wantsMarkdown) {
    return new Response(response.body, { status: response.status, headers });
  }

  const html = await response.text(); // consumes the body
  let markdown = null;
  try {
    markdown = htmlToMarkdown(html);
  } catch (err) {
    markdown = null; // fall back to the HTML we already read
  }
  if (markdown === null) {
    return new Response(html, { status: response.status, headers });
  }
  headers.set('Content-Type', 'text/markdown; charset=utf-8');
  headers.set('x-markdown-tokens', String(Math.ceil(markdown.length / 4)));
  return new Response(markdown, { status: response.status, headers });
}

/**
 * HTML-to-Markdown converter — extracts main content, strips chrome
 */
function htmlToMarkdown(html) {
  // 1. Extract main content area — prioritise semantic containers
  let body = html;
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)
    || html.match(/<article[^>]*>([\s\S]*?)<\/article>/i)
    || html.match(/<!--\s*content\s*-->([\s\S]*?)<!--\s*\/content\s*-->/i);
  if (mainMatch) {
    body = mainMatch[1] || mainMatch[0];
  } else {
    // Fallback: strip nav, header, footer, scripts, styles
    // ⚠️ `(?=[\s/>])` keeps `<head` from matching `<header …>`.
    body = html
      .replace(/<head(?=[\s/>])[^>]*>[\s\S]*?<\/head>/gi, '')
      .replace(/<nav(?=[\s/>])[^>]*>[\s\S]*?<\/nav>/gi, '')
      .replace(/<header(?=[\s/>])[^>]*>[\s\S]*?<\/header>/gi, '')
      .replace(/<footer(?=[\s/>])[^>]*>[\s\S]*?<\/footer>/gi, '')
      .replace(/<script(?=[\s/>])[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style(?=[\s/>])[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<svg(?=[\s/>])[^>]*>[\s\S]*?<\/svg>/gi, '');
  }

  // 1b. Strip non-content elements from the extracted region.
  //     ⚠️ The fallback branch above already does this, but the <main> branch does
  //     NOT — and the block pass has no <script> rule, so the final
  //     `md.replace(/<[^>]+>/g, '')` removed only the TAGS and left the JavaScript
  //     SOURCE in the markdown. Inline scripts inside <main> (the countdown timer on
  //     the thank-you pages) leaked `var seconds = 30; …` to AI readers on 5 pages.
  //     Applied uniformly here so both branches behave identically.
  body = body.replace(
    /<(script|style|svg|template|noscript)(?=[\s/>])[^>]*>[\s\S]*?<\/\1>/gi,
    ''
  );

  // 1c. Strip HTML comments. The generic tag strip at the end of the block pass
  //     (`/<[^>]+>/g`) stops at the FIRST `>`, so any comment whose body contains
  //     `>` keeps its tail as literal text. The template comment
  //     `<!-- Soft CTA: OEM process -> products -->` therefore reached readers as
  //     the blockquote `> products -->` on es/sobre-nosotros and ru/o-kompanii.
  //     Removing comments up front also keeps them out of table cells and links,
  //     which are converted before the generic strip runs.
  body = body.replace(/<!--[\s\S]*?-->/g, '');

  // 2. Normalise line endings BEFORE conversion. Several source templates are
  //    CRLF, so without this the markdown keeps stray \r characters — and even
  //    whole "\r"-only lines — which defeat every blank-line rule below.
  body = body.replace(/\r\n?/g, '\n');

  // 3. Convert HTML elements to Markdown.
  //
  // ⚠️⚠️ ORDER IS LOAD-BEARING: the INLINE pass must run before the BLOCK pass.
  // The block pass uses `stripHtml()` / `inline()`, which delete every tag. Any
  // inline element still in HTML form at that point is destroyed rather than
  // converted — 3,154 of this site's 8,865 in-content links (36%) live inside
  // <p>/<li>, and were silently dropped from the markdown before this fix.
  let md = body;

  // ── 3a. INLINE PASS ────────────────────────────────────────────────────────
  // Every opening-tag regex carries a `(?=[\s/>])` tag-name guard. Without it a
  // rule for `<b` also matches `<br>`, `<body>`, `<button>` and `<blockquote>`,
  // and `<i` also matches `<img>`, `<input>` and `<iframe>` — the paired closing
  // tag then has to be found elsewhere, e.g. on /blog/gan-chargers-guide/ the
  // page logo's `<img …>` paired with a distant `</em>` and swallowed 34,642
  // characters into one `*…*` span.

  // Fenced code FIRST, and park it out of the way: its contents must not be
  // touched by the generic <code> rule below nor decoded twice by the global
  // entity pass at the end.
  const codeBlocks = [];
  md = md.replace(
    /<pre(?=[\s/>])[^>]*>\s*<code(?=[\s/>])[^>]*>([\s\S]*?)<\/code>\s*<\/pre>/gi,
    (_, t) => {
      codeBlocks.push(decodeEntities(t).replace(/^\n+|\n+$/g, ''));
      return `\n\n\u0000CODE${codeBlocks.length - 1}\u0000\n\n`;
    }
  );

  // ── 3a-0. ELEMENT-BOUNDARY NORMALISATION ───────────────────────────────────
  // A block boundary must survive tag stripping. The block pass only emits blank
  // lines for the tags it has a rule for; `<div>` / `<section>` / `<article>` have
  // none, and the final `md.replace(/<[^>]+>/g, '')` deletes tags WITHOUT inserting
  // a separator. So whenever two elements sit flush against each other in the source
  // (`</div><div>`, `</span><p>`, `</div>Beta`) the two blocks were welded into ONE
  // token: `<div>105W</div><div>Max</div>` became `105WMax`, and the author-bio
  // stat grid became `5,000 m²ISO 9001 Facility` (measured on 211 of 348 pages).
  //
  // Two passes, both anchored on a real tag boundary:
  //   • AFTER  — a closing block tag immediately followed by non-whitespace
  //   • BEFORE — an opening block tag immediately preceded by `>`
  // ⚠️ The `(?<=>)` anchor is deliberate: it keeps the rule out of attribute values
  //    (e.g. `alt="a > b"`), where an inserted newline would corrupt the tag.
  // ⚠️ ONLY block tags participate. Inserting a separator between two INLINE elements
  //    would break inline emphasis (`<strong>a</strong><em>b</em>` → `**a**\n*b*`),
  //    so `<p>a<span>b</span><span>c</span>d</p>` must stay `abcd`.
  // Placed AFTER the code-block parking above, so fenced code is never touched.
  const AFTER_BLOCK = new RegExp('</(?:' + BOUNDARY_BLOCK_TAGS + ')(?=[\\s/>])[^>]*>(?=\\S)', 'gi');
  const BEFORE_BLOCK = new RegExp('(?<=>)(?=<(?:' + BOUNDARY_BLOCK_TAGS + ')(?=[\\s/>]))', 'gi');
  // A blank line (not a single \n) so the result is a real Markdown block boundary —
  // matching what the existing `<p>` sibling rule already produces. The `\n{3,}` →
  // `\n\n` pass below absorbs any over-insertion, and the list-tightening loop
  // re-collapses blank lines between `- ` items.
  md = md.replace(AFTER_BLOCK, (m) => m + '\n\n');
  md = md.replace(BEFORE_BLOCK, '\n\n');

  // Images → `![alt](src)`. Attribute-order agnostic + quote-aware:
  //   • every <img> on this site puts `src` BEFORE `alt`, so an `alt … src …`
  //     regex matched 0 images on all 350 pages;
  //   • `alt` values legitimately contain `>` (e.g. `Ladegerät: >95%`), so
  //     `/<img\b[^>]*>/` truncates the tag mid-attribute.
  md = md.replace(/<img(?=[\s/>])(?:[^>"']|"[^"]*"|'[^']*')*>/gi, (tag) => {
    const src = attr(tag, 'src');
    if (!src) return '';
    const alt = attr(tag, 'alt') || '';
    return `![${alt}](${mdDest(src)})`;
  });

  // Links — keep href + text.
  // ⚠️ The text is collapsed to ONE line, and block-level markup inside the
  // anchor is removed first. Every "Related Articles" card on this site is an
  // `<a>` wrapping `<div><img><h3>…` — without this, the later block pass
  // injected blank lines and `###` markers into the link text, splitting a
  // single link across several markdown lines.
  md = md.replace(/<a(?=[\s/>])(?:[^>"']|"[^"]*"|'[^']*')*>([\s\S]*?)<\/a>/gi, (tag, text) => {
    const href = attr(tag, 'href');
    const stripped = text.replace(LINK_TEXT_BLOCK_TAGS, ' ');
    // An anchor that wrapped block-level markup is a CARD, not an inline link
    // (1,207 of them across the site, all inside <div> grids, never inside a
    // <p>). Emit it as its own block so a row of cards does not collapse into
    // one run-on line.
    const isCard = stripped !== text;
    const label = stripped.replace(/\s+/g, ' ').trim();
    if (href === null) return label;
    const link = `[${label}](${mdDest(href)})`;
    return isCard ? `\n\n${link}\n\n` : link;
  });

  // Bold / Strong, then Italic / Emphasis
  md = md.replace(/<(?:strong|b)(?=[\s/>])[^>]*>([\s\S]*?)<\/(?:strong|b)>/gi, '**$1**');
  md = md.replace(/<(?:em|i)(?=[\s/>])[^>]*>([\s\S]*?)<\/(?:em|i)>/gi, '*$1*');

  // Inline code
  md = md.replace(/<code(?=[\s/>])[^>]*>([\s\S]*?)<\/code>/gi, '`$1`');

  // Line breaks
  md = md.replace(/<br\s*\/?>/gi, '\n');

  // ── 3b. BLOCK PASS ─────────────────────────────────────────────────────────
  // Headings — `inline()` collapses the source's line wrapping so a multi-line
  // <h1> cannot leak a stray second line that Markdown would read as body text.
  // Blank lines on BOTH sides are required: a heading glued to the next line
  // stops being a block boundary for strict parsers.
  md = md.replace(/<h1(?=[\s/>])[^>]*>([\s\S]*?)<\/h1>/gi, (_, t) => `\n\n# ${inline(t)}\n\n`);
  md = md.replace(/<h2(?=[\s/>])[^>]*>([\s\S]*?)<\/h2>/gi, (_, t) => `\n\n## ${inline(t)}\n\n`);
  md = md.replace(/<h3(?=[\s/>])[^>]*>([\s\S]*?)<\/h3>/gi, (_, t) => `\n\n### ${inline(t)}\n\n`);
  md = md.replace(/<h4(?=[\s/>])[^>]*>([\s\S]*?)<\/h4>/gi, (_, t) => `\n\n#### ${inline(t)}\n\n`);

  // Paragraphs
  md = md.replace(/<p(?=[\s/>])[^>]*>([\s\S]*?)<\/p>/gi, (_, t) => `${stripHtml(t)}\n\n`);

  // List items
  md = md.replace(/<li(?=[\s/>])[^>]*>([\s\S]*?)<\/li>/gi, (_, t) => `- ${inline(t)}\n`);

  // Blockquotes
  md = md.replace(/<blockquote(?=[\s/>])[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, t) => `\n> ${stripHtml(t).replace(/\n/g, '\n> ')}\n`);

  // Tables — basic conversion
  md = md.replace(/<table(?=[\s/>])[^>]*>([\s\S]*?)<\/table>/gi, (_, t) => convertTable(t));

  // Details / Summary → a HEADING (level resolved later, see 3c-0) + content.
  // ⚠️ The summary used to be emitted as bold text (`**Question**`), which lost
  // the Q/A structure signal. The same "FAQ" concept therefore rendered as
  // `### Question` on the 197 pages whose FAQ is real <h3>s (all blog posts) and
  // as `**Question**` on the 108 pages that migrated to <details class="faq-item">
  // — one semantic construct, two different Markdown structures, decided by page
  // type. AI readers chunk documents by heading, so on non-blog pages no FAQ
  // question was ever a chunk boundary.
  // ⚠️ The level CANNOT be hard-coded to `### `. Measured on the built site:
  //   • 739 faq-item sit under an <h2> section title      → h3
  //   • 107 faq-item sit under an <h3> category title     → h4
  //     (all 6 `/{lang}/faq/` hubs: "Factory & Credibility" / "Bestellung &
  //      Angebot" / … group their questions under <h3> categories)
  //   • 489 group/spec sit under an <h3> model name       → h4
  //     (product pages: <h3>WOP37 67W All-in-One</h3> then its spec accordion)
  // Emitting `### ` unconditionally would flatten the 6 hub pages' category
  // structure and promote 489 spec labels to the level of the model headings.
  // So the summary is parked as a placeholder and resolved against the document
  // outline afterwards — every <details> gets the level one step below its
  // nearest preceding heading, whatever that is.
  // ⚠️ `inline()` for the SUMMARY only (it must occupy one line). The CONTENT
  // must use `stripHtml()`: `inline()` collapses every newline to a space, which
  // flattens any table/list already converted inside the content into a single
  // unusable line — that regression cost 4,226 table rows across the site.
  md = md.replace(/<details(?=[\s/>])[^>]*>[\s\S]*?<summary(?=[\s/>])[^>]*>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/gi, (_, summary, content) =>
    `\n\n\u0000HDR\u0000${inline(summary)}\u0000HDR\u0000\n\n${stripHtml(content)}\n`);

  // ── 3c. CLEAN UP ───────────────────────────────────────────────────────────
  // Strip remaining HTML tags
  md = md.replace(/<[^>]+>/g, '');

  // Decode HTML entities — exactly ONCE, over the whole document.
  md = decodeEntities(md);

  // ── 3c-0. RESOLVE <details> SUMMARY HEADING LEVELS ─────────────────────────
  // Each `\u0000HDR\u0000…\u0000HDR\u0000` placeholder parked by the details rule
  // becomes a heading one level deeper than the nearest PRECEDING heading of the
  // document outline.
  // ⚠️ Placeholders deliberately do NOT update the running level. If they did, the
  // first FAQ item would be emitted as h3, and that new h3 would push every
  // following item to h4 — the whole FAQ would cascade one level per question.
  // ⚠️ MUST run BEFORE the fenced-code blocks are restored below: a code block
  // whose line starts with `# ` would otherwise be read as a heading and shift
  // the level for every later <details> on the page.
  // ⚠️ The heading branch requires a space after the hashes, so a line starting
  // with `#hashtag` is not mistaken for a heading.
  let outlineLevel = 1;
  md = md.replace(
    /^(#{1,6}) [^\n]*$|^\u0000HDR\u0000([^\u0000\n]*)\u0000HDR\u0000$/gm,
    (m, hashes, summary) => {
      if (hashes) { outlineLevel = hashes.length; return m; }
      return '#'.repeat(Math.min(6, outlineLevel + 1)) + ' ' + summary;
    }
  );

  // Restore fenced code blocks (already decoded above, so they are not touched
  // again by the entity pass).
  md = md.replace(/\u0000CODE(\d+)\u0000/g, (_, i) => '```\n' + codeBlocks[Number(i)] + '\n```');

  // Normalise whitespace
  md = md.replace(/[ \t]+/g, ' ');
  // ⚠️⚠️ ORDER IS LOAD-BEARING: the per-line trim MUST run BEFORE the blank-line
  // collapse, not after.
  // `[ \t]+` → ' ' turns an indented blank line into a line holding one space, so
  // a run reads `\n \n \n \n` — which `/\n{3,}/` does NOT match (the spaces break
  // it). Trimming the line edges afterwards then yields `\n\n\n\n` with nothing
  // left to collapse it. Measured: with the old order every one of the 354 pages
  // carried such runs (179 runs / max 17 newlines on products/gan-charger), and
  // 82,809 bytes — 1.3% of all Markdown — was pure blank-line padding, inflating
  // the `x-markdown-tokens` header the middleware reports to AI clients (worst
  // page: 913 B ≈ 228 tokens of nothing).
  md = md.replace(/^[ \t]+|[ \t]+$/gm, '');
  // ⚠️ MUST NOT use \s here: \s matches \n, so `/^\s+|\s+$/gm` eats the blank
  // lines created by `\n\n` above and collapses every block into a single line
  // (headings glued to paragraphs, list items glued together).
  md = md.replace(/\n{3,}/g, '\n\n');
  // Tighten lists: the indentation between source <li> tags otherwise turns every
  // list into a "loose list" (blank line between items) and roughly doubles its
  // token cost for AI readers. Repeat a few times to reach nested levels.
  for (let i = 0; i < 3; i++) {
    const tightened = md.replace(/(\n- [^\n]*)\n\n(?=- )/g, '$1\n');
    if (tightened === md) break;
    md = tightened;
  }
  md = md.trim();

  return md;
}

/** Strip HTML tags from inner text.
 *  ⚠️ Deliberately does NOT decode entities: the whole document is decoded
 *  exactly once, at the end of htmlToMarkdown(). Decoding here as well meant
 *  `&amp;lt;` was decoded twice — to a literal `<` — in every <p>/<blockquote>. */
function stripHtml(str) {
  return str.replace(/<[^>]+>/g, '').trim();
}

/** Same as stripHtml, but also collapses the source's line wrapping.
 *  Use for any context that must occupy exactly ONE markdown line
 *  (headings, list items, table cells) — otherwise the template's pretty
 *  printing leaks a continuation line that breaks the block structure. */
function inline(str) {
  return stripHtml(str).replace(/\s+/g, ' ').trim();
}

/** Block-level tags that must keep their boundary when the tag itself is stripped.
 *  Used by the element-boundary normalisation in step 3a-0 — a closing/opening tag
 *  in this set gets a newline inserted when it sits flush against its neighbour,
 *  so two blocks can never be welded into one token.
 *  ⚠️ `<br>` is deliberately EXCLUDED: it is a line break, not a block container,
 *  and it already has its own rule that emits `\n`. */
const BOUNDARY_BLOCK_TAGS =
  'div|section|article|aside|header|footer|main|nav|figure|figcaption|p|ul|ol|li|dl|dt|dd|h[1-6]|blockquote|table|thead|tbody|tfoot|tr|td|th|details|summary|hr|form|fieldset|legend';

/** Block-level tags whose *markup* must not survive inside a link's text.
 *  The content stays; only the tags go. Quote-aware so an attribute value
 *  containing `>` cannot truncate the match. */
const LINK_TEXT_BLOCK_TAGS =
  /<\/?(?:div|section|article|aside|header|footer|main|nav|figure|figcaption|p|ul|ol|li|dl|dt|dd|h[1-6]|blockquote|table|thead|tbody|tfoot|tr|td|th|details|summary|hr|br)(?=[\s/>])(?:[^>"']|"[^"]*"|'[^']*')*>/gi;

/** Read one attribute out of an already-matched opening tag.
 *  Returns null when the attribute is absent, so callers can tell
 *  "missing" apart from "present but empty". Quote-aware: attribute values
 *  here legitimately contain `>` (e.g. alt="Ladegerät: >95%"). */
function attr(tag, name) {
  const m = tag.match(new RegExp('\\b' + name + '\\s*=\\s*("([^"]*)"|\'([^\']*)\'|([^\\s">]+))', 'i'));
  if (!m) return null;
  return m[2] !== undefined ? m[2] : m[3] !== undefined ? m[3] : m[4];
}

/** Make a URL safe as a Markdown link/image destination.
 *  Whitespace terminates the destination in every Markdown parser, so
 *  `[Solicitar Auditoría](/es/contacto/?subject=Consulta blog: …)` is not a link
 *  at all — it renders as literal text with the raw URL visible to the reader.
 *  Two such links exist on this site (a `? Lang=de` TARIC link and a contact link
 *  whose `?subject=` value contains spaces); both leaked `subject` / `taric` /
 *  `lang` into the visible text of their page.
 *  Browsers already treat a space inside `href` as `%20`, so encoding here changes
 *  nothing for the reader — it only keeps the Markdown parseable.
 *  ⚠️ Only whitespace is encoded: a scan of every `href`/`src` inside `<main>` found
 *  no `(`, `)`, `<`, `>` or quote character, so there is nothing else to escape. */
function mdDest(url) {
  return url.replace(/\s/g, '%20');
}

/** Named HTML entities seen in the rendered pages.
 *  Unknown names are left as-is rather than guessed at. */
const NAMED_ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
  mdash: '—', ndash: '–', horbar: '―', middot: '·', bull: '•', hellip: '…',
  lsquo: '\u2018', rsquo: '\u2019', ldquo: '\u201c', rdquo: '\u201d',
  sbquo: '\u201a', bdquo: '\u201e', laquo: '«', raquo: '»', lsaquo: '‹', rsaquo: '›',
  times: '×', divide: '÷', deg: '°', plusmn: '±', minus: '−',
  sup1: '¹', sup2: '²', sup3: '³', frac12: '½', frac14: '¼', frac34: '¾',
  ge: '≥', le: '≤', ne: '≠', equiv: '≡', asymp: '≈', prop: '∝', infin: '∞',
  rarr: '→', larr: '←', uarr: '↑', darr: '↓', harr: '↔',
  check: '✓', cross: '✗', star: '★', spades: '♠', clubs: '♣', hearts: '♥', diams: '♦',
  copy: '©', reg: '®', trade: '™', sect: '§', para: '¶', dagger: '†', Dagger: '‡', permil: '‰',
  prime: '′', Prime: '″', micro: 'µ', ohm: 'Ω', euro: '€', pound: '£', yen: '¥', cent: '¢',
  curren: '¤', brvbar: '¦', uml: '¨', ordf: 'ª', ordm: 'º', not: '¬', shy: '\u00ad',
  alpha: 'α', beta: 'β', gamma: 'γ', delta: 'δ', mu: 'μ', pi: 'π', sigma: 'σ', omega: 'ω',
  ensp: ' ', emsp: ' ', thinsp: ' ', zwnj: '\u200c', zwj: '\u200d', lrm: '\u200e', rlm: '\u200f',
};

/** Decode HTML entities in a single pass, so `&amp;lt;` stays `&lt;` (no double decode). */
function decodeEntities(str) {
  return str.replace(/&(#[xX][0-9a-fA-F]+|#\d+|[a-zA-Z][a-zA-Z0-9]{1,31});/g, (m, body) => {
    if (body[0] === '#') {
      const cp = body[1] === 'x' || body[1] === 'X'
        ? parseInt(body.slice(2), 16)
        : parseInt(body.slice(1), 10);
      if (!Number.isFinite(cp) || cp < 0 || cp > 0x10ffff) return m;
      try { return String.fromCodePoint(cp); } catch { return m; }
    }
    return Object.prototype.hasOwnProperty.call(NAMED_ENTITIES, body) ? NAMED_ENTITIES[body] : m;
  });
}

/** Convert <table> to Markdown table */
function convertTable(html) {
  const rows = [];
  const trRe = /<tr(?=[\s/>])[^>]*>([\s\S]*?)<\/tr>/gi;
  let match;
  while ((match = trRe.exec(html)) !== null) {
    const cells = [];
    const tdRe = /<t[dh](?=[\s/>])[^>]*>([\s\S]*?)<\/t[dh]>/gi;
    let cm;
    while ((cm = tdRe.exec(match[1])) !== null) {
      // ⚠️ A literal `|` inside a cell is a COLUMN SEPARATOR to any Markdown
      // renderer, so a row with more cells than the header has its trailing cells
      // silently DROPPED. Measured on 73 rows across 18 pages — e.g. the
      // car-charger power table on all 6 languages:
      //   source  <td>USB-A: 5V/3A (36W) | USB-C: 5V/3A (36W, PPS) | USB-A+USB-C: 5V/3.4A</td>
      //   without escaping the reader only ever sees `USB-A: 5V/3A (36W)`.
      cells.push(inline(cm[1]).replace(/\|/g, '\\|'));
    }
    if (cells.length) rows.push(cells);
  }
  if (rows.length < 2) return '';

  const colWidths = rows[0].map((_, ci) =>
    Math.max(...rows.map(r => (r[ci] || '').length), 3)
  );

  const mdRows = rows.map((r, ri) => {
    const cells = r.map((c, ci) => c.padEnd(colWidths[ci]));
    if (ri === 1) {
      // Separator row after header
      const sep = colWidths.map(w => '-'.repeat(w));
      return `| ${rows[0].map((_, ci) => '-'.repeat(colWidths[ci])).join(' | ')} |\n| ${cells.join(' | ')} |`;
    }
    return `| ${cells.join(' | ')} |`;
  });

  return `\n${mdRows.join('\n')}\n`;
}
