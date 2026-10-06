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
        // ⚠️⚠️⚠️ 2026-10-06 用户裁决：**全站橙色一律用品牌橙 #FF6B00**
        // （「所有被认定橙色的图标/文字/hover 都必须是品牌橙，除特殊设计外」）
        // ⇒ 原本的「文字加深档 #B63C0B」与「大字档 #E45F00」**双双归并到品牌橙**。
        // ⚠️ 已知代价（用户已知情并接受）：#FF6B00 在白底 2.86:1 / #f8fafc 2.73:1，
        //    低于正文 4.5:1 ⇒ PageSpeed 的 color-contrast 会重新报对比度不足。
        // ⚠️ 恢复可读性 = 把本行改回 '#B63C0B'，并同步 css/src.css 的 --brand-orange-deep。
        // 保留该 key（不删）就是为了留住这个**一行回退**的开关。
        brandOrangeDeep: '#FF6B00',
        // 大字档：用户裁决后与品牌橙同值（保留 key = 保留回退开关，原值 '#E45F00'）。
        // 与 css/src.css 的 `--brand-orange-large` 是同一个值，改动需同步。
        brandOrangeLarge: '#FF6B00',
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
