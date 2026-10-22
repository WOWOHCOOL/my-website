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
        // ⚠️⚠️⚠️ 橙色三分工（2026-10-22 修订，取代 2026-10-06 的「一律 #FF6B00」）：
        //   brandOrange      #FF6B00 → 只做填充（按钮底 / 色块 / 图标 / 描边）
        //   brandOrangeDeep  #B63C0B → 浅底小字（≤18px 常规字重），需 4.5:1
        //   brandOrangeLarge #E45F00 → 浅底大字（≥24px 或 ≥18.66px+700），需 3:1
        // 2026-10-22 用户裁决「需要颜色对比」⇒ 恢复两个文字档，填充色未动。
        // 三者的权威值在 css/src.css 的 --brand-orange / -deep / -large，改动必须同步。
        brandOrangeDeep: '#B63C0B',
        brandOrangeLarge: '#E45F00',
        brandBlue: '#0A192F',
        // 较亮一档的品牌蓝。用途单一且明确：当两个深色板块相邻时，用
        // brandBlueLight vs darkBg 拉开明度差来区分，**禁止再用渐变分界线**。
        // 取值与 css/src.css 的 --brand-blue-alt 保持一致（同一色）。
        brandBlueLight: '#0F2A4A',
        darkBg: '#020B1A',
      },
      // --- design tokens (2026-10-01) ---
      // Non-breaking: new utilities only; each value is EXACTLY equal to the
      // arbitrary value it replaces (font-size-only, no line-height), so a
      // later migration is CSS-equivalent.
      fontSize: {
        micro: '10px',
        badge: '11px',
        lead: '1.2rem',
        body: '0.9rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      maxWidth: {
        content: '480px',
      },
      minHeight: {
        'screen-d': '100dvh',
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '16/9': '16 / 9',
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
