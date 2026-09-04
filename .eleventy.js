const fs = require('fs');

module.exports = function (eleventyConfig) {
  // FR site is in .gitignore to prevent GitHub push — still build locally
  eleventyConfig.setUseGitIgnore(false);
  // Passthrough copies: project-root paths → _site/
  const passthrough = [
    'image', 'css',
    'main.js', 'main.src.js',
    'robots.txt',
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
  ];

  esStatic.forEach(p => {
    if (fs.existsSync(p)) {
      eleventyConfig.addPassthroughCopy(p);
    }
  });

  // French site static assets
  const frStatic = [
    'fr/js',
  ];

  frStatic.forEach(p => {
    if (fs.existsSync(p)) {
      eleventyConfig.addPassthroughCopy(p);
    }
  });

  // Russian site static assets
  const ruStatic = [
    'ru/js',
  ];

  ruStatic.forEach(p => {
    if (fs.existsSync(p)) {
      eleventyConfig.addPassthroughCopy(p);
    }
  });

  // Polish site static assets
  const plStatic = [
    'pl/js',
  ];

  plStatic.forEach(p => {
    if (fs.existsSync(p)) {
      eleventyConfig.addPassthroughCopy(p);
    }
  });

  // Wrap h2 sections in .blog-content into card divs (DE/ES blog posts)
  eleventyConfig.addTransform("blogSectionCards", function (content) {
    if (!this.outputPath || !this.outputPath.endsWith('.html')) return content;
    if (!this.outputPath.match(/\/(de|es|pl)\/blog\/.+\/index\.html$/)) return content;
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

  // Array concat filter for Nunjucks templates
  eleventyConfig.addFilter("concat", (arr, item) => {
    if (!Array.isArray(arr)) return [item];
    return arr.concat(item);
  });

  // Ensure trailing slash on path strings (returns empty string unchanged)
  eleventyConfig.addFilter("trailingSlash", (s) => {
    if (!s || s === '') return s;
    return s.endsWith('/') ? s : s + '/';
  });

  // Locale date filter: Date → "11. Mai 2026" (de), "May 11, 2026" (en), "11 de mayo de 2026" (es), "11 mai 2026" (fr)
  eleventyConfig.addFilter("localeDate", (d, locale) => {
    if (!(d instanceof Date)) return d;
    const months = {
      de: ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],
      en: ["January","February","March","April","May","June","July","August","September","October","November","December"],
      es: ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],
      fr: ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"],
      pl: ["stycznia","lutego","marca","kwietnia","maja","czerwca","lipca","sierpnia","września","października","listopada","grudnia"]
    };
    const m = months[locale] || months.en;
    const day = d.getDate();
    const month = m[d.getMonth()];
    const year = d.getFullYear();
    if (locale === "de") return `${day}. ${month} ${year}`;
    if (locale === "es") return `${day} de ${month} de ${year}`;
    if (locale === "fr") return `${day} ${month} ${year}`;
    if (locale === "pl") return `${day} ${month} ${year}`;
    return `${month} ${day}, ${year}`; // en default
  });

  // Visible dateModified filter: "YYYY-MM-DD" string (or Date) + locale → localized date.
  // Parses string parts directly to avoid UTC timezone day-shift (new Date("YYYY-MM-DD") is UTC midnight).
  eleventyConfig.addFilter("dateDisplay", (d, locale) => {
    let day, monthIdx, year;
    if (d instanceof Date) {
      day = d.getDate(); monthIdx = d.getMonth(); year = d.getFullYear();
    } else if (typeof d === "string" && /^\d{4}-\d{2}-\d{2}$/.test(d)) {
      const [y, m, dd] = d.split("-").map(Number);
      year = y; monthIdx = m - 1; day = dd;
    } else {
      return d;
    }
    const months = {
      en: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
      de: ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],
      es: ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],
      fr: ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"],
      ru: ["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"],
      pl: ["stycznia","lutego","marca","kwietnia","maja","czerwca","lipca","sierpnia","września","października","listopada","grudnia"]
    };
    const month = (months[locale] || months.en)[monthIdx];
    if (locale === "en") return `${month} ${day}, ${year}`;
    if (locale === "de") return `${day}. ${month} ${year}`;
    if (locale === "es") return `${day} de ${month} de ${year}`;
    return `${day} ${month} ${year}`; // fr / ru / pl
  });

  // Visible "Updated" label per locale
  eleventyConfig.addFilter("updatedLabel", (locale) => {
    const labels = { en: "Updated", de: "Aktualisiert", es: "Actualizado", fr: "Mis à jour", ru: "Обновлено", pl: "Zaktualizowano" };
    return labels[locale] || labels.en;
  });

  // RSS date filter: Date → "Thu, 14 May 2026 00:00:00 GMT"
  eleventyConfig.addFilter("rssDate", (d) => {
    if (d instanceof Date) return d.toUTCString();
    return d;
  });

  // Localize thousands separators in number strings from _data/facts.json
  // (facts are stored EN-formatted with ","; de/es use ".", fr/ru/pl use space)
  eleventyConfig.addFilter("numloc", (str, lang) => {
    if (typeof str !== "string") return str;
    const sep = { de: ".", es: ".", fr: " ", ru: " ", pl: " " }[lang];
    if (!sep) return str;
    return str.replace(/(\d),(\d)/g, `$1${sep}$2`);
  });

  // Filter a blog collection by frontmatter author (author pages)
  eleventyConfig.addFilter("byAuthor", (items, author) => {
    if (!Array.isArray(items)) return [];
    return items.filter(it => it.data && it.data.author === author)
      .sort((a, b) => b.date - a.date);
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

  // RU blog collection, sorted newest first
  eleventyConfig.addCollection("blog_ru", function (collectionApi) {
    return collectionApi.getFilteredByGlob("./src/ru/blog/**/*.njk")
      .filter(item => item.data.canonical && item.data.canonical !== "/ru/blog/")
      .sort((a, b) => b.date - a.date);
  });

  // PL blog collection, sorted newest first
  eleventyConfig.addCollection("blog_pl", function (collectionApi) {
    return collectionApi.getFilteredByGlob("./src/pl/blog/**/*.njk")
      .filter(item => item.data.canonical && item.data.canonical !== "/pl/blog/")
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
