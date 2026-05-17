/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    files: [
      './*.html',
      './*/*.html',
      './*/*/*.html',
      './*/*/*/*.html',
      './main.src.js',
      './main.js',
      './de/js/de-main.js',
    ],
    extract: {
      html: (content) => {
        // Extract all potential class names from HTML using a broad pattern
        // This handles arbitrary values (z-[150]), opacity modifiers (bg-blue-500/50),
        // and all standard Tailwind classes correctly.
        const candidates = content.match(/[^<>"'`\s]*/g) || [];
        // Filter out HTML tags, attributes, and other non-class strings
        return candidates.filter(c => {
          // Must contain a hyphen (Tailwind classes have hyphens)
          // or start with a letter and be a utility class
          return (
            c.includes('-') ||
            c.startsWith('!') ||
            /^[a-z]/.test(c)
          ) && ![
            'html', 'head', 'body', 'div', 'span', 'p', 'a', 'img', 'ul', 'ol', 'li',
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'table', 'tr', 'td', 'th', 'form',
            'input', 'button', 'select', 'textarea', 'label', 'nav', 'header', 'footer',
            'section', 'article', 'aside', 'main', 'figure', 'figcaption', 'blockquote',
            'pre', 'code', 'em', 'strong', 'small', 'sub', 'sup', 'br', 'hr', 'link',
            'meta', 'title', 'style', 'script', 'doctype', 'lang', 'charset', 'name',
            'content', 'viewport', 'href', 'rel', 'type', 'src', 'alt', 'width', 'height',
            'class', 'id', 'data', 'property', 'http-equiv', 'itemprop', 'itemscope',
            'itemtype', 'role', 'aria', 'target', 'rel', 'media', 'sizes', 'srcset',
            'loading', 'decoding', 'fetchpriority', 'crossorigin', 'integrity',
            'false', 'true', 'no', 'yes', 'row', 'col', 'auto', 'none', 'inline',
          ].includes(c.toLowerCase());
        }).filter(Boolean);
      },
    },
  },
  theme: {
    extend: {
      colors: {
        brandOrange: '#FF6B00',
        brandBlue: '#0A192F',
        darkBg: '#020B1A',
      },
    },
  },
  corePlugins: {
    preflight: true,
  },
};
