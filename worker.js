export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const accept = request.headers.get('Accept') || '';

    // Only intercept HTML page requests with Markdown negotiation
    const ext = url.pathname.split('.').pop().toLowerCase();
    const staticExts = new Set([
      'js', 'css', 'png', 'jpg', 'jpeg', 'gif', 'webp', 'svg',
      'ico', 'woff', 'woff2', 'ttf', 'eot', 'xml', 'json', 'txt', 'pdf',
    ]);

    if (accept.includes('text/markdown') && !staticExts.has(ext)) {
      const response = await env.ASSETS.fetch(request);
      if (!response.ok) return response;

      const html = await response.text();
      const markdown = htmlToMarkdown(html);

      return new Response(markdown, {
        status: response.status,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      });
    }

    // Prevent search engines from indexing the Workers domain
    const response = await env.ASSETS.fetch(request);
    const newHeaders = new Headers(response.headers);
    const contentType = response.headers.get('Content-Type') || '';
    if (contentType.includes('text/html')) {
      newHeaders.set('X-Robots-Tag', 'noindex, nofollow');
    }
    return new Response(response.body, {
      status: response.status,
      headers: newHeaders,
    });
  },
};

function htmlToMarkdown(html) {
  // Extract title before stripping tags
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';

  let md = html;

  // 1. Strip non-content blocks
  md = md.replace(/<script[\s\S]*?<\/script>/gi, '');
  md = md.replace(/<style[\s\S]*?<\/style>/gi, '');
  md = md.replace(/<nav[\s\S]*?<\/nav>/gi, '');
  md = md.replace(/<footer[\s\S]*?<\/footer>/gi, '');
  md = md.replace(/<svg[\s\S]*?<\/svg>/gi, '');
  md = md.replace(/<!--[\s\S]*?-->/g, '');

  // 2. Block-level conversions (headings first, then flow)
  md = md.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n');
  md = md.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n');
  md = md.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n');
  md = md.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n\n');
  md = md.replace(/<h5[^>]*>(.*?)<\/h5>/gi, '##### $1\n\n');
  md = md.replace(/<h6[^>]*>(.*?)<\/h6>/gi, '###### $1\n\n');
  md = md.replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n');
  md = md.replace(/<br\s*\/?>/gi, '\n');
  md = md.replace(/<hr\s*\/?>/gi, '---\n\n');
  md = md.replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gi, '> $1\n\n');

  // 3. Preformatted / code blocks
  md = md.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, (_, code) => {
    code = code.replace(/<code[^>]*>/gi, '').replace(/<\/code>/gi, '');
    return '```\n' + code.trim() + '\n```\n\n';
  });

  // 4. Lists
  md = md.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n');
  md = md.replace(/<\/?[ou]l[^>]*>/gi, '\n');

  // 5. Inline elements
  md = md.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**');
  md = md.replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**');
  md = md.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*');
  md = md.replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*');
  md = md.replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`');

  // 6. Links and images
  md = md.replace(
    /<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi,
    '[$2]($1)',
  );
  md = md.replace(
    /<a[^>]*href='([^']*)'[^>]*>(.*?)<\/a>/gi,
    '[$2]($1)',
  );
  md = md.replace(
    /<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/gi,
    '![$2]($1)',
  );
  md = md.replace(
    /<img[^>]*alt="([^"]*)"[^>]*src="([^"]*)"[^>]*>/gi,
    '![$1]($2)',
  );

  // 7. Strip remaining HTML tags
  md = md.replace(/<[^>]+>/g, '');

  // 8. Decode HTML entities
  md = md.replace(/&amp;/g, '&');
  md = md.replace(/&lt;/g, '<');
  md = md.replace(/&gt;/g, '>');
  md = md.replace(/&quot;/g, '"');
  md = md.replace(/&#39;/g, "'");
  md = md.replace(/&nbsp;/g, ' ');
  md = md.replace(/&#(\d+);/g, (_, n) => String.fromCharCode(n));

  // 9. Normalize whitespace
  md = md.replace(/\n{3,}/g, '\n\n');
  md = md.replace(/[ \t]+\n/g, '\n');
  md = md.replace(/\n+$/, '');

  // 10. Prepend title as h1 if no heading exists yet
  if (title && !/^#\s/m.test(md)) {
    md = `# ${title}\n\n${md}`;
  }

  return md;
}
