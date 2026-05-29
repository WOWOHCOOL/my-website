const fs = require('fs');

module.exports = function (eleventyConfig) {
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
    if (fs.existsSync(p)) {
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

  // RSS date filter: Date → "Thu, 14 May 2026 00:00:00 GMT"
  eleventyConfig.addFilter("rssDate", (d) => {
    if (d instanceof Date) return d.toUTCString();
    return d;
  });

  // EN blog collection (exclude listing page), sorted newest first
  eleventyConfig.addCollection("blog_en", function (collectionApi) {
    return collectionApi.getFilteredByGlob("./src/blog/**/*.njk")
      .filter(item => item.data.canonical && item.data.canonical !== "/blog")
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
