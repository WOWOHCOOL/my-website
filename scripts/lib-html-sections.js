/* 引号感知 + script/style/注释感知的标签遍历器
 *
 * ⚠️⚠️ 为什么必须跳过 script/style：JS 里 `i < arr.length` 的 `<` 会被
 *    「找下一个 >」的朴素分词器当成标签起点，一路吞掉后面的真实标签
 *    （实测把 ES/RU 首页的 12 个 section 误判成 1 个）。
 * 注释同理：`<!-- <section> -->` 不该被计数。
 */
'use strict';

const RAW_TEXT = ['script', 'style', 'textarea', 'pre'];

function* eachTag(html) {
  const lower = html.toLowerCase();
  let i = 0;
  while (i < html.length) {
    const lt = html.indexOf('<', i);
    if (lt < 0) return;

    // 0) ⚠️ 游离的 `<`（文本里的 `<=100Wh` / `a < b`）不是标签起点。
    //    若在此处仍「找下一个 >」，会一路吞掉后面真实的标签 ——
    //    实测把 lithium-battery 那篇的 11 个 section 误判成 5 个。
    const nxt0 = html[lt + 1];
    if (nxt0 === undefined || !/[a-zA-Z!/?]/.test(nxt0)) { i = lt + 1; continue; }

    // 1) 注释整块跳过
    if (html.startsWith('<!--', lt)) {
      const e = html.indexOf('-->', lt + 4);
      i = e < 0 ? html.length : e + 3;
      continue;
    }

    // 2) raw-text 元素整块跳过（含边界检查，避免 <preload> 被当成 <pre>）
    let jumped = false;
    for (const t of RAW_TEXT) {
      const at = '<' + t;
      if (lower.startsWith(at, lt)) {
        const nxt = lower[lt + at.length];
        if (nxt === undefined || nxt === '>' || nxt === '/' || /\s/.test(nxt)) {
          const close = lower.indexOf('</' + t, lt + at.length);
          if (close < 0) { i = lt + 1; }
          else { const gt = html.indexOf('>', close); i = gt < 0 ? html.length : gt + 1; }
          jumped = true;
          break;
        }
      }
    }
    if (jumped) continue;

    // 3) 引号感知地找标签结束
    let j = lt + 1, q = null;
    while (j < html.length) {
      const c = html[j];
      if (q) { if (c === q) q = null; }
      else if (c === '"' || c === "'") q = c;
      else if (c === '>') break;
      j++;
    }
    const raw = html.slice(lt, j + 1);
    const m = raw.match(/^<\s*(\/?)\s*([a-zA-Z][\w-]*)/);
    // start/end 是本标签在原文中的半开区间 [start, end) —— 供「按坐标改写」类脚本使用
    if (m) yield { closing: !!m[1], name: m[2].toLowerCase(), raw, start: lt, end: j + 1 };
    i = j + 1;
  }
}

const PALETTE_RE = /bg-(?:white|slate-50|slate-100|slate-200|slate-900|darkBg|brandBlue|brandBlueLight|brandOrange)\b/;

const clsOf = (raw) => (raw.match(/class\s*=\s*"([^"]*)"/) || raw.match(/class\s*=\s*'([^']*)'/) || [])[1] || '';
const idOf = (raw) => (raw.match(/\bid\s*=\s*"([^"]*)"/) || raw.match(/\bid\s*=\s*'([^']*)'/) || [])[1] || '';

function shape(raw) {
  const cls = clsOf(raw);
  return {
    id: idOf(raw) || '(no id)',
    bg: (cls.match(PALETTE_RE) || ['(none)'])[0],
    c: (cls.match(/container-(wide|content|narrow)\b/) || [])[1] || '-',
    dark: /\bdark-section\b/.test(cls),
    bY: /(?:^|\s)border-(?:y|t|b)(?:\s|$)/.test(cls),
  };
}

/* depth-0 <section> 列表 */
function topSections(html) {
  const out = [];
  let depth = 0;
  for (const t of eachTag(html)) {
    if (t.name !== 'section') continue;
    if (t.closing) { if (depth > 0) depth--; continue; }
    if (depth === 0) out.push(shape(t.raw));
    depth++;
  }
  return out;
}

/* 带深度的全部 <section> */
function sectionTree(html) {
  const out = [];
  let depth = 0;
  for (const t of eachTag(html)) {
    if (t.name !== 'section') continue;
    if (t.closing) { depth = Math.max(0, depth - 1); continue; }
    out.push(Object.assign({ depth }, shape(t.raw)));
    depth++;
  }
  return out;
}

/* 找 startIdx 处（必须是该标签的开标签起始位置）对应元素的配对闭标签的 [start, end)
 * 返回 { start, end } 或 null。⚠️ 只对非 void 元素有意义。 */
function findClose(html, startIdx, name) {
  let depth = 0, seen = false;
  for (const t of eachTag(html)) {
    if (t.start < startIdx) continue;
    if (t.name !== name) continue;
    if (t.closing) {
      if (!seen) continue;
      depth--;
      if (depth === 0) return { start: t.start, end: t.end };
    } else { seen = true; depth++; }
  }
  return null;
}

module.exports = { eachTag, topSections, sectionTree, shape, clsOf, idOf, PALETTE_RE, findClose };
