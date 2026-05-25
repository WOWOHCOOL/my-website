const fs = require('fs');

module.exports = function (eleventyConfig) {
  // Passthrough copies: project-root paths → _site/
  const passthrough = [
    'image', 'css',
    'main.js', 'main.src.js',
    'robots.txt', 'sitemap.xml', 'rss.xml',
    'llms.txt', 'llms-full.txt', 'rsl.txt',
    '_headers', '_redirects',
    'BingSiteAuth.xml',
    'favicon.ico',
    'docs',
  ];

  // Auto-discover UUID token files
  const rootFiles = fs.readdirSync('.').filter(f =>
    /^[a-f0-9-]{36}\.txt$/i.test(f)
  );
  passthrough.push(...rootFiles);

  passthrough.forEach(p => {
    if (fs.existsSync(p)) {
      eleventyConfig.addPassthroughCopy(p);
    }
  });

  // German site static assets (HTML now generated from njk templates in src/de/)
  const deStatic = [
    'de/css', 'de/js', 'de/image',
    'de/wowohcool-logo-optimized.webp',
    'de/apple-touch-icon.png',
    'de/favicon.png', 'de/favicon-16x16.png', 'de/favicon-32x32.png',
    'de/llms.txt', 'de/llms-full.txt',
    'de/produkte/image',
    'de/blog/cover',
  ];

  deStatic.forEach(p => {
    if (fs.existsSync(p)) {
      eleventyConfig.addPassthroughCopy(p);
    }
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

  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
    },
    templateFormats: ['njk', 'html', 'md'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
};
