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
        // 品牌橙的**文字加深档**（2026-10-06 WCAG 1.4.3）：
        // #FF6B00 作为**小字**（<24px 且非 ≥18.66px 粗体）放在浅底上只有
        // 2.86:1(#fff) / 2.73:1(#f8fafc) ⇒ 浅底上的橙字小字一律用本档。
        // 取值按站内**最暗的浅色文字面**反解（全站 354 页扫描实测，含半透明底合成）：
        //   #fff 5.77 · slate-50 5.51 · `bg-brandOrange/10` 叠 slate-50 4.98
        //   · `bg-brandBlue/5` 叠 slate-50 5.00 · `bg-brandBlue/10` 叠 slate-50 4.51
        // （上一版 #C2410C 在后三个面上只有 4.47 / 4.49 / 4.05 ⇒ 949 处未达标。）
        // ⚠️ 只用于 `text-*`；`bg-brandOrange` 仍是 #FF6B00（品牌底色不变）。
        // ⚠️ logo 字标、★ 装饰星、图标不受此限（WCAG 对 logotype 免检）。
        brandOrangeDeep: '#B63C0B',
        // 品牌橙的**大字档**（2026-10-06 二轮）：浅底上 ≥24px 的橙字只需 3:1，
        // 用「保留色相/饱和度、仅压暗」的值 ⇒ 白底 3.54 / slate-50 3.38 / 最暗浅底 3.06，
        // 视觉上与 logo 的品牌橙同族（避免上一轮加深档的过度加深）。
        // 与 css/src.css 的 `--brand-orange-large` 是同一个值，改动需同步。
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
