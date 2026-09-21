const fs = require('fs');
const path = require('path');

module.exports = function (eleventyConfig) {
  // FR site is in .gitignore to prevent GitHub push — still build locally
  eleventyConfig.setUseGitIgnore(false);
  // Passthrough copies: project-root paths → _site/
  const passthrough = [
    'image', 'css/styles.css',
    'main.js',
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
        // ⚠️ 必须与「手写主流形态」逐字同构，否则这 11 页与其余 175 页 blog 正文块不一致：
        //    手写主流 = <section id="锚点" class="mb-16"><div class="bg-slate-50 rounded-xl p-6 border border-slate-200 shadow-sm">
        //    旧写法   = <div class="content-card">（白卡 · 无 section · 锚点挂在 h2 上）
        //    因此这里把 h2 的 id 搬到 section 上（**不能两处都留，会造出重复 id**），并改用灰卡类。
        //    `.content-card` 已废弃，勿再使用。
        const idMatch = /^<h2[^>]*\sid="([^"]*)"/.exec(trimmed);
        const anchor = idMatch ? ' id="' + idMatch[1] + '"' : '';
        const body = idMatch ? part.replace(/(<h2[^>]*?)\s+id="[^"]*"/, '$1') : part;
        wrapped += '\n<section' + anchor + ' class="mb-16">\n'
          + '<div class="bg-slate-50 rounded-xl p-6 border border-slate-200 shadow-sm">'
          + body + '</div>\n</section>\n';
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
    // 静态文件路径（如 404 页的 "404.html"）不能加尾斜杠，否则变成 /xx/404.html/ 死链
    if (/\.html?$/i.test(s)) return s;
    return s.endsWith('/') ? s : s + '/';
  });

  // ---- 图片真实元数据（无第三方库）----
  // 返回 { w, h, type }；读不到返回 null。
  // ⚠️ 用途：og:image:width/height/type。这三个值必须是**文件真实像素/MIME**，
  //    因为社交平台在下载图片前就用它们预留卡片版面；写死默认值会让 350 个页面
  //    的卡片比例全部失真（2026-09-20 实测 350/350 全错）。
  //    与 <img width/height> 是同一条硬规则，只是消费方不同。
  // 格式偏移见 .workbuddy-ai/memory/RULES-AUDIT.md「怎么读图片真实尺寸」。
  const IMG_META_CACHE = new Map();
  function readImageMeta(rel) {
    if (IMG_META_CACHE.has(rel)) return IMG_META_CACHE.get(rel);
    let out = null;
    try {
      const abs = path.join(__dirname, rel.replace(/^\/+/, ''));
      if (fs.existsSync(abs)) {
        const b = fs.readFileSync(abs);
        let w = null, h = null, type = null;
        if (b.length > 24 && b.slice(0, 8).toString('hex') === '89504e470d0a1a0a') {
          w = b.readUInt32BE(16); h = b.readUInt32BE(20); type = 'image/png';
        } else if (b[0] === 0xff && b[1] === 0xd8) {
          type = 'image/jpeg';
          let i = 2;
          while (i < b.length - 9) {
            if (b[i] !== 0xff) { i++; continue; }
            const mk = b[i + 1];
            if (mk >= 0xc0 && mk <= 0xcf && mk !== 0xc4 && mk !== 0xc8 && mk !== 0xcc) {
              h = b.readUInt16BE(i + 5); w = b.readUInt16BE(i + 7); break;
            }
            i += 2 + b.readUInt16BE(i + 2);
          }
        } else if (b.length > 30 && b.slice(0, 4).toString() === 'RIFF' && b.slice(8, 12).toString() === 'WEBP') {
          type = 'image/webp';
          const fmt = b.slice(12, 16).toString();
          if (fmt === 'VP8X') { w = b.readUIntLE(24, 3) + 1; h = b.readUIntLE(27, 3) + 1; }
          else if (fmt === 'VP8L') { const n = b.readUInt32LE(21); w = (n & 0x3fff) + 1; h = ((n >> 14) & 0x3fff) + 1; }
          else if (fmt === 'VP8 ') { w = b.readUInt16LE(26) & 0x3fff; h = b.readUInt16LE(28) & 0x3fff; }
        } else if (b.slice(0, 400).toString('utf8').includes('<svg')) {
          type = 'image/svg+xml';
          const s = b.toString('utf8');
          const wm = s.match(/\bwidth\s*=\s*["']?([\d.]+)/i);
          const hm = s.match(/\bheight\s*=\s*["']?([\d.]+)/i);
          const vm = s.match(/\bviewBox\s*=\s*["']\s*[-\d.]+\s+[-\d.]+\s+([\d.]+)\s+([\d.]+)/i);
          if (wm && hm) { w = Math.round(+wm[1]); h = Math.round(+hm[1]); }
          else if (vm) { w = Math.round(+vm[1]); h = Math.round(+vm[2]); }
        }
        if (w && h && type) out = { w, h, type };
      }
    } catch (e) { out = null; }
    IMG_META_CACHE.set(rel, out);
    return out;
  }

  // 用法：{{ "/image/x.webp" | imgMeta }} → { w, h, type } | null
  // 接受绝对 URL（剥掉 host）与带 ?/# 的写法。
  eleventyConfig.addFilter("imgMeta", (src) => {
    if (!src) return null;
    const rel = String(src).replace(/^https?:\/\/[^/]+/i, '').split('#')[0].split('?')[0];
    return readImageMeta(rel);
  });

  // ---- 统一图片梯子 → srcset ----
  // 封面图变体由 scripts/build-images.js 统一生成，档位固定为下面这一组。
  // 用法：srcset="{{ item.data.ogImage | imgSrcset }}"
  // ⚠️⚠️ 描述符一律取**文件真实宽度**，绝不用档位常量。
  //   2026-09-21 实测：手工写的 srcset 里有 9 处「声明 1700w 实际 2240px」、
  //   1 处「声明 1440w 实际 1200px」（后者会让浏览器选走它却拿到更小的图 → 被拉伸）。
  //   由磁盘真值生成，这类假声明在结构上不可能出现。
  // 返回 '' 表示候选不足 2 个（不值得输出 srcset），调用方须判空。
  const IMG_LADDER = [450, 800, 950, 1200, 1700];
  eleventyConfig.addFilter("imgSrcset", (src) => {
    if (!src) return '';
    const rel = String(src).replace(/^https?:\/\/[^/]+/i, '').split('#')[0].split('?')[0];
    if (!/\.(webp|png|jpe?g)$/i.test(rel)) return '';
    const base = readImageMeta(rel);
    if (!base) return '';
    const out = [];
    for (const w of IMG_LADDER) {
      if (w >= base.w) continue;
      const cand = rel.replace(/(\.[a-z0-9]+)$/i, '-' + w + 'w$1');
      const m = readImageMeta(cand);
      if (m && m.w === w) out.push(cand + ' ' + w + 'w');
    }
    out.push(rel + ' ' + base.w + 'w');
    return out.length > 1 ? out.join(', ') : '';
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

  // Workaround for eleventy-dev-server issue #22: newly-created article
  // directories 404 until restart (glob watcher misses dirs created after
  // server start). A recursive src glob keeps new dirs in the watch set.
  eleventyConfig.setServerOptions({
    // Do NOT watch _site/ — watching the output dir triggers a rebuild loop
    // (each write re-triggers watch, causing multi-minute full rebuilds).
    watch: ["src/**/*.njk", "src/**/*.json"],
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
