const fs = require('fs');

module.exports = function (eleventyConfig) {
  // FR site is in .gitignore to prevent GitHub push — still build locally
  eleventyConfig.setUseGitIgnore(false);
  // Passthrough copies: project-root paths → _site/
  const passthrough = [
    'image', 'css',
    'main.js', 'main.src.js',
    'robots.txt',
    'llms.txt', 'llms-full.txt', 'rsl.txt',
    '_headers', '_redirects',
    'BingSiteAuth.xml',
    'favicon.ico',
  ];

  // Auto-discover UUID token files
  const rootFiles = fs.readdirSync('.').filter(f =>
    /^[a-f0-9-]{36}\.txt$/i.test(f)
  );
  passthrough.push(...rootFiles);

  passthrough.forEach(p => {
    if (fs.existsSync(p) || fs.existsSync(`src/${p}`)) {
      eleventyConfig.addPassthroughCopy(p);
    }
  });

  // German site static assets
  const deStatic = [
    'de/js',
    'de/llms.txt', 'de/llms-full.txt',
    'de/_headers',
  ];

  deStatic.forEach(p => {
    if (fs.existsSync(p)) {
      eleventyConfig.addPassthroughCopy(p);
    }
  });

  // Spanish site static assets
  const esStatic = [
    'es/js',
    'es/llms.txt', 'es/llms-full.txt',
  ];

  esStatic.forEach(p => {
    if (fs.existsSync(p)) {
      eleventyConfig.addPassthroughCopy(p);
    }
  });

  // Wrap h2 sections in .blog-content into card divs (DE/ES blog posts)
  eleventyConfig.addTransform("blogSectionCards", function (content) {
    if (!this.outputPath || !this.outputPath.endsWith('.html')) return content;
    if (!this.outputPath.match(/\/(de|es)\/blog\/.+\/index\.html$/)) return content;
    if (!content.includes('blog-content')) return content;

    const marker = '<div class="max-w-4xl mx-auto px-6 blog-content">';
    const idx = content.indexOf(marker);
    if (idx === -1) return content;

    const startIdx = idx + marker.length;
    const endTag = '</div>';
    let depth = 1;
    let endIdx = startIdx;
    while (depth > 0 && endIdx < content.length) {
      const nextOpen = content.indexOf('<div', endIdx);
      const nextClose = content.indexOf('</div>', endIdx);
      if (nextClose === -1) break;
      if (nextOpen !== -1 && nextOpen < nextClose) {
        depth++;
        endIdx = nextOpen + 4;
      } else {
        depth--;
        if (depth === 0) { endIdx = nextClose; break; }
        endIdx = nextClose + 6;
      }
    }

    const blogContent = content.substring(startIdx, endIdx);
    const parts = blogContent.split(/(?=<h2[\s>])/);
    let wrapped = '';
    for (const part of parts) {
      const trimmed = part.trim();
      if (!trimmed) continue;
      if (trimmed.startsWith('<h2')) {
        wrapped += '\n<div class="content-card">' + part + '</div>\n';
      } else {
        wrapped += part;
      }
    }

    return content.substring(0, startIdx) + wrapped + content.substring(endIdx);
  });

  // Date format filter: Date object → "YYYY-MM-DD"
  eleventyConfig.addFilter("fmtDate", (d) => {
    if (d instanceof Date) {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    }
    return d;
  });

  // Ensure trailing slash on path strings (returns empty string unchanged)
  eleventyConfig.addFilter("trailingSlash", (s) => {
    if (!s || s === '') return s;
    return s.endsWith('/') ? s : s + '/';
  });

  // RSS date filter: Date → "Thu, 14 May 2026 00:00:00 GMT"
  eleventyConfig.addFilter("rssDate", (d) => {
    if (d instanceof Date) return d.toUTCString();
    return d;
  });

  // EN blog collection (exclude listing page), sorted newest first
  eleventyConfig.addCollection("blog_en", function (collectionApi) {
    return collectionApi.getFilteredByGlob("./src/blog/**/*.njk")
      .filter(item => item.data.canonical && item.data.canonical !== "/blog/")
      .sort((a, b) => b.date - a.date);
  });

  // DE blog collection, sorted newest first
  eleventyConfig.addCollection("blog_de", function (collectionApi) {
    return collectionApi.getFilteredByGlob("./src/de/blog/**/*.njk")
      .filter(item => item.data.canonical && item.data.canonical !== "/de/blog/")
      .sort((a, b) => b.date - a.date);
  });

  // ES blog collection, sorted newest first
  eleventyConfig.addCollection("blog_es", function (collectionApi) {
    return collectionApi.getFilteredByGlob("./src/es/blog/**/*.njk")
      .filter(item => item.data.canonical && item.data.canonical !== "/es/blog/")
      .sort((a, b) => b.date - a.date);
  });

  // FR blog collection, sorted newest first
  eleventyConfig.addCollection("blog_fr", function (collectionApi) {
    return collectionApi.getFilteredByGlob("./src/fr/blog/**/*.njk")
      .filter(item => item.data.canonical && item.data.canonical !== "/fr/blog/")
      .sort((a, b) => b.date - a.date);
  });

  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
    },
    templateFormats: ['njk', 'html', 'md', 'xml'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
};
