/* 未转义 `<` 的影响面审计（只读）
 *   1) meta / og / twitter 的 content 属性值（社交卡片抓取）
 *   2) RSS / sitemap 等 XML 文本节点（XML 里 `<` 是硬错误）
 *   3) JSON-LD 文本值（JSON 合法，但记录规模）
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '_site');
const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(html|xml|txt)$/.test(e.name)) files.push(p);
  }
})(ROOT);

const meta = [], xml = [], ld = [];
for (const f of files) {
  const rel = path.relative(ROOT, f).split(path.sep).join('/');
  const s = fs.readFileSync(f, 'utf8');

  if (f.endsWith('.xml')) {
    // XML：任何文本节点里的裸 `<` 都非法（标签内的不算）
    const stripped = s.replace(/<[^>]*>/g, '');
    if (/</.test(stripped)) {
      const m = stripped.match(/[^\n]{0,60}<[^\n]{0,60}/);
      xml.push({ file: rel, snippet: m ? m[0].replace(/\s+/g, ' ') : '' });
    }
    continue;
  }

  // meta / og / twitter content 属性
  const re = /<meta\b[^>]*>/gi;
  let m;
  while ((m = re.exec(s))) {
    const tag = m[0];
    const key = (tag.match(/(?:property|name)\s*=\s*"([^"]*)"/i) || [])[1] || '';
    const val = (tag.match(/content\s*=\s*"([^"]*)"/i) || [])[1] || '';
    if (!val) continue;
    if (/</.test(val)) meta.push({ file: rel, key, val: val.slice(0, 120) });
  }

  // JSON-LD
  const blocks = s.match(/<script[^>]*type\s*=\s*"application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi) || [];
  for (const b of blocks) {
    const body = b.replace(/^<script[^>]*>/i, '').replace(/<\/script>$/i, '');
    const hits = body.match(/"([^"]*<[^"]*)"/g) || [];
    if (hits.length) ld.push({ file: rel, n: hits.length, sample: hits[0].slice(0, 110) });
  }
}

console.log('=== 未转义 `<` 影响面 ===\n');
console.log('【1】meta / og / twitter content 属性值');
if (!meta.length) console.log('  ✅ 0 处（社交卡片不受影响）');
else { console.log('  ⚠️ ' + meta.length + ' 处'); meta.slice(0, 10).forEach((x) => console.log(`     ${x.file}  [${x.key}]  ${x.val}`)); }

console.log('\n【2】XML（RSS / sitemap / BingSiteAuth）文本节点');
if (!xml.length) console.log('  ✅ 0 处（XML 全部合法）');
else { console.log('  ❌ ' + xml.length + ' 个文件非法'); xml.forEach((x) => console.log(`     ${x.file}  …${x.snippet}…`)); }

console.log('\n【3】JSON-LD 字符串值（JSON 合法，仅记录规模）');
if (!ld.length) console.log('  0 处');
else { console.log('  ' + ld.length + ' 个页面 · 共 ' + ld.reduce((a, x) => a + x.n, 0) + ' 处'); ld.slice(0, 6).forEach((x) => console.log(`     ${x.file}  ×${x.n}  ${x.sample}`)); }
