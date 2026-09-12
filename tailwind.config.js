/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{njk,html}',
    './main.src.js',
  ],
  blocklist: [
    // Site uses .container-wide / .container-content / .container-narrow
    // (see css/src.css) instead of Tailwind's bare .container.
    'container',
    // Used as an inline style in main.src.js: el.style.visibility = 'visible'.
    // The .visible / .invisible / .collapse classes are never applied as class.
    'visible', 'invisible', 'collapse',
    // Tailwind's bare .static and .ring are defaults; only the variant forms
    // (hover:..., focus:ring-2) are used. Verified 0 occurrences in _site HTML.
    'static', 'ring',
    // Standalone rotate-180 / rotate-0 are defaults not used directly; the
    // used forms are variants like group-open:rotate-180 (different rules).
    'rotate-180', 'rotate-0',
    // 0 occurrences in HTML.
    'cursor-not-allowed', 'contents',
    // Arbitrary-value utility confirmed at 0 occurrences across the whole
    // project (src/, _includes/, main.src.js) via escape-form grep on
    // 2026-09-12. Safe to suppress — adds a redundant rule otherwise.
    'tracking-[0.25em]',
  ],
  theme: {
    extend: {
      colors: {
        brandOrange: '#FF6B00',
        brandBlue: '#0A192F',
        darkBg: '#020B1A',
      },
      zIndex: {
        '100': '100',
        '150': '150',
        '300': '300',
        '500': '500',
      },
    },
  },
  corePlugins: {
    preflight: true,
  },
};
