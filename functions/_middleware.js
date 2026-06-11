/**
 * Cloudflare Pages Function — Markdown for Agents
 * Converts HTML → Markdown when client sends Accept: text/markdown
 * Free tier compatible, no external dependencies
 */
export async function onRequest(context) {
  const { request, next } = context;
  const accept = request.headers.get('Accept') || '';

  // Pass through non-markdown requests instantly (zero overhead)
  if (!accept.includes('text/markdown')) {
    return next();
  }

  try {
    const response = await next();
    const ct = response.headers.get('Content-Type') || '';

    // Only convert HTML pages
    if (!ct.includes('text/html')) {
      return response;
    }

    const html = await response.text();
    const markdown = htmlToMarkdown(html);

    return new Response(markdown, {
      status: response.status,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'x-markdown-tokens': String(Math.ceil(markdown.length / 4)),
        'Cache-Control': response.headers.get('Cache-Control') || 'public, s-maxage=3600',
      },
    });
  } catch (err) {
    // Fall through to normal HTML on any conversion error
    return next();
  }
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
    body = html
      .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '')
      .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')
      .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '')
      .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '')
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<svg[^>]*>[\s\S]*?<\/svg>/gi, '');
  }

  // 2. Convert HTML elements to Markdown
  let md = body;

  // Headings
  md = md.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, (_, t) => `\n# ${stripHtml(t)}\n`);
  md = md.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, (_, t) => `\n## ${stripHtml(t)}\n`);
  md = md.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, (_, t) => `\n### ${stripHtml(t)}\n`);
  md = md.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, (_, t) => `\n#### ${stripHtml(t)}\n`);

  // Paragraphs
  md = md.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_, t) => `${stripHtml(t)}\n\n`);

  // Line breaks
  md = md.replace(/<br\s*\/?>/gi, '\n');

  // Links — keep href + text
  md = md.replace(/<a[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)');

  // Bold / Strong
  md = md.replace(/<(?:strong|b)[^>]*>([\s\S]*?)<\/(?:strong|b)>/gi, '**$1**');

  // Italic / Emphasis
  md = md.replace(/<(?:em|i)[^>]*>([\s\S]*?)<\/(?:em|i)>/gi, '*$1*');

  // List items
  md = md.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, t) => `- ${stripHtml(t)}\n`);

  // Blockquotes
  md = md.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, t) => `\n> ${stripHtml(t).replace(/\n/g, '\n> ')}\n`);

  // Pre / Code blocks
  md = md.replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, (_, t) => `\n\`\`\`\n${decodeEntities(t)}\n\`\`\`\n`);
  md = md.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, '`$1`');

  // Tables — basic conversion
  md = md.replace(/<table[^>]*>([\s\S]*?)<\/table>/gi, (_, t) => convertTable(t));

  // Details / Summary → blockquote-style
  md = md.replace(/<details[^>]*>[\s\S]*?<summary[^>]*>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/gi, (_, summary, content) =>
    `\n**${stripHtml(summary).trim()}**\n${stripHtml(content).trim()}\n`);

  // Images → alt text markdown
  md = md.replace(/<img[^>]*alt=["']([^"']*)["'][^>]*src=["']([^"']*)["'][^>]*\/?>/gi, '![$1]($2)');

  // Strip remaining HTML tags
  md = md.replace(/<[^>]+>/g, '');

  // Decode HTML entities
  md = decodeEntities(md);

  // Normalise whitespace
  md = md.replace(/[ \t]+/g, ' ');
  md = md.replace(/\n{3,}/g, '\n\n');
  md = md.replace(/^\s+|\s+$/gm, '');
  md = md.trim();

  return md;
}

/** Strip HTML tags from inner text */
function stripHtml(str) {
  return decodeEntities(str.replace(/<[^>]+>/g, '').trim());
}

/** Decode common HTML entities */
function decodeEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&middot;/g, '·')
    .replace(/&rarr;/g, '→')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

/** Convert <table> to Markdown table */
function convertTable(html) {
  const rows = [];
  const trRe = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  let match;
  while ((match = trRe.exec(html)) !== null) {
    const cells = [];
    const tdRe = /<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi;
    let cm;
    while ((cm = tdRe.exec(match[1])) !== null) {
      cells.push(stripHtml(cm[1]));
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
