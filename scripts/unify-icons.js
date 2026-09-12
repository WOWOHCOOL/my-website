// scripts/unify-icons.js
// 方案 A：每个冲突图标名 → 站内只保留 1 份 glyph（按"使用页数"最多的为胜出者）
// 把非胜出者的内联 SVG 整段替换为胜出者的内联 SVG（按 viewBox + class 锁定）
// 用法：node scripts/unify-icons.js          （干跑预览）
//       node scripts/unify-icons.js --apply  （真改）
const fs = require('fs');
const path = require('path');

const APPLY = process.argv.includes('--apply');
const SRC = 'C:/Users/wowoh/wowohcool.com/src';
const MACRO_FILE = path.join(SRC, '_includes', 'icons.njk');

// 1. 用同一份扫描逻辑提取所有 inline SVG，按 class 名分组
function* walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (e.isFile() && e.name.endsWith('.njk')) yield p;
  }
}

// 匹配一个 SVG 标签块（包括 class 名 + viewBox + 内部内容）
// 内联 SVG 通常形态: <svg class="..." ... viewBox="..." ... >...inner...</svg>
// 我们只关心完整 <svg ...>...</svg> 顶层块
const SVG_BLOCK = /<svg\b([^>]*?)>([\s\S]*?)<\/svg>/g;
const CLASS_RE = /\bclass="([^"]*)"/;
const ICON_NAME = /icon-[a-z0-9-]+/;

const byName = new Map(); // name -> [{file, openAttrs, inner}]

for (const f of walk(SRC)) {
  const raw = fs.readFileSync(f, 'utf8');
  // 跳过 BOM 前的字节
  let i = 0;
  while (i < raw.length && i < 3 && raw.charCodeAt(i) === 0xFEFF) i++;
  // 简单切片扫描
  let m;
  SVG_BLOCK.lastIndex = 0;
  while ((m = SVG_BLOCK.exec(raw)) !== null) {
    const cm = CLASS_RE.exec(m[1]);
    if (!cm) continue;
    const names = cm[1].split(/\s+/).filter(Boolean);
    for (const n of names) {
      const im = n.match(ICON_NAME);
      if (!im) continue;
      const name = im[0];
      if (!byName.has(name)) byName.set(name, []);
      byName.get(name).push({ file: f, openAttrs: m[1], inner: m[2] });
    }
  }
}

// 2. 计算每个名字的"签名" = viewBox + 内部内容规范化
function sig(openAttrs, inner) {
  const vb = (openAttrs.match(/\bviewBox="([^"]+)"/) || [])[1] || '';
  const norm = inner.replace(/\s+/g, ' ').trim();
  return vb + '||' + norm;
}

// 3. 按 (name, sig) 聚合 → 计算每个 sig 的文件集合
const bySig = new Map(); // name -> Map<sig, {files:Set, openAttrs, inner}>
for (const [name, list] of byName) {
  const sigs = new Map();
  for (const { file, openAttrs, inner } of list) {
    const s = sig(openAttrs, inner);
    if (!sigs.has(s)) sigs.set(s, { files: new Set(), openAttrs, inner });
    sigs.get(s).files.add(file);
  }
  bySig.set(name, sigs);
}

// 4. 输出冲突清单（用于人读 / 决策）
const conflicts = [];
for (const [name, sigs] of bySig) {
  if (sigs.size < 2) continue;
  const variants = [];
  for (const [s, v] of sigs) {
    variants.push({ sig: s, uses: v.files.size, files: [...v.files].sort(), openAttrs: v.openAttrs, inner: v.inner });
  }
  variants.sort((a, b) => b.uses - a.uses);
  conflicts.push({ name, variants });
}

// 5. 决策：每个冲突名，取 uses 最大的为 winner
let totalFilesChanged = 0;
let totalReplacements = 0;
const report = [];

for (const { name, variants } of conflicts) {
  const winner = variants[0];
  const losers = variants.slice(1);

  // 对每个 (文件, loser-variant) 对，独立匹配替换
  for (const los of losers) {
    for (const f of los.files) {
      let raw = fs.readFileSync(f, 'utf8');
      const re = /<svg\b([^>]*?)>([\s\S]*?)<\/svg>/g;
      let replaced = 0;
      raw = raw.replace(re, (whole, attrs, inner) => {
        const cm = CLASS_RE.exec(attrs);
        if (!cm) return whole;
        if (!cm[1].split(/\s+/).includes(name)) return whole;
        if (inner.replace(/\s+/g, ' ').trim() !== los.inner.replace(/\s+/g, ' ').trim()) return whole;
        replaced++;
        // 用 winner 的 inner；若 winner viewBox 与文件原 viewBox 不同，也带过去
        const winnerVB = (winner.openAttrs.match(/\bviewBox="([^"]+)"/) || [])[1] || '';
        const curVB = (attrs.match(/\bviewBox="([^"]+)"/) || [])[1] || '';
        let newAttrs = attrs;
        if (winnerVB && winnerVB !== curVB) {
          if (curVB) newAttrs = attrs.replace(/\bviewBox="[^"]+"/, `viewBox="${winnerVB}"`);
          else newAttrs = attrs + ` viewBox="${winnerVB}"`;
        }
        return `<svg${newAttrs}>${winner.inner}</svg>`;
      });
      if (replaced > 0) {
        if (APPLY) {
          fs.writeFileSync(f, raw);
        }
        totalFilesChanged++;
        totalReplacements += replaced;
        const tag = APPLY ? 'APPLIED' : 'DRY-RUN';
        report.push(`  [${tag}] ${path.relative(SRC, f)}: replaced ${replaced}× (name=${name}, winner uses=${winner.uses})`);
      }
    }
  }
}

console.log(`\n=== unify-icons (${APPLY ? 'APPLY' : 'DRY-RUN'}) ===`);
console.log(`conflict names: ${conflicts.length}`);
console.log(`files changed: ${totalFilesChanged}`);
console.log(`svg blocks replaced: ${totalReplacements}`);
console.log(`\nDetail (top 20 conflicts):`);
const top = [...conflicts].sort((a, b) => (b.variants[0].uses + b.variants.slice(1).reduce((s, x) => s + x.uses, 0)) - (a.variants[0].uses + a.variants.slice(1).reduce((s, x) => s + x.uses, 0))).slice(0, 20);
for (const { name, variants } of top) {
  const winner = variants[0];
  const total = variants.reduce((s, v) => s + v.uses, 0);
  console.log(`  ${name.padEnd(28)} variants=${variants.length}  winner-uses=${winner.uses}/${total}  (loser files: ${variants.slice(1).map(v => v.uses).join('+')})`);
}
console.log(`\nfirst 30 file changes:`);
report.slice(0, 30).forEach(l => console.log(l));