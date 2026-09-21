/* section 嵌套树 dump（只读）—— 看清 depth-0 与嵌套结构
 * 用法：node scripts/dump-section-tree.js <产物路径> [更多路径...]
 */
'use strict';
const fs = require('fs');

function tags(html) {
  const out = [];
  let i = 0;
  while (i < html.length) {
    const lt = html.indexOf('<', i);
    if (lt < 0) break;
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
    if (m) out.push({ closing: !!m[1], name: m[2].toLowerCase(), raw });
    i = j + 1;
  }
  return out;
}

for (const file of process.argv.slice(2)) {
  if (!fs.existsSync(file)) { console.log('缺失 ' + file); continue; }
  const html = fs.readFileSync(file, 'utf8');
  console.log('\n### ' + file);
  let depth = 0;
  for (const t of tags(html)) {
    if (t.name !== 'section') continue;
    if (t.closing) { depth = Math.max(0, depth - 1); continue; }
    const cls = (t.raw.match(/class\s*=\s*"([^"]*)"/) || t.raw.match(/class\s*=\s*'([^']*)'/) || [])[1] || '';
    const id = (t.raw.match(/\bid\s*=\s*"([^"]*)"/) || t.raw.match(/\bid\s*=\s*'([^']*)'/) || [])[1] || '(no id)';
    const bg = (cls.match(/bg-(?:white|slate-50|slate-100|slate-200|darkBg|brandBlue|brandBlueLight|brandOrange)\b/) || ['(none)'])[0];
    const c = (cls.match(/container-(wide|content|narrow)\b/) || [])[1] || '-';
    console.log('  ' + '  '.repeat(depth) + `d${depth} #${id}  ${bg}  c=${c}${/\bdark-section\b/.test(cls) ? '  DARK' : ''}`);
    depth++;
  }
}
