/**
 * 图片变体一致性门禁
 *
 * 断言（FAIL 级）：
 *   1. srcset 里每个候选 URL 的文件**存在**
 *   2. 候选的宽度描述符 **等于文件真实像素宽度**
 *      —— 声明不存在的尺寸 = 撞硬规则「绝不给搜索引擎声明不存在的东西」；
 *         声明偏小 → 浏览器多下大图；声明偏大 → 浏览器选它却拿到更小的图（会被拉伸）
 *
 * 报告（WARN 级，不阻断）：
 *   3. 相邻档位比 > 1.8 的「阶梯断档」—— 浏览器会被迫跳到远大于需求的档
 *
 * 为什么单独一个校验器：
 *   validate-img-exists.js 只查 <img src>，看不到 srcset 候选；
 *   validate-img-dims.js 只比 width/height 属性。srcset 描述符是**结构性盲区**。
 *
 * 用法：node scripts/validate-img-variants.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SITE = path.join(ROOT, '_site');
const GAP_LIMIT = 1.8;

// ── 零依赖图片头读取（与 .eleventy.js 的 imgMeta 同源，避免引入 sharp 依赖）──
const CACHE = new Map();
function readSize(abs) {
  if (CACHE.has(abs)) return CACHE.get(abs);
  let out = null;
  try {
    if (!fs.existsSync(abs)) { CACHE.set(abs, null); return null; }
    const b = fs.readFileSync(abs);
    let w = null, h = null;
    if (b.length > 24 && b.slice(0, 8).toString('hex') === '89504e470d0a1a0a') {
      w = b.readUInt32BE(16); h = b.readUInt32BE(20);
    } else if (b[0] === 0xff && b[1] === 0xd8) {
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
      const fmt = b.slice(12, 16).toString();
      if (fmt === 'VP8X') { w = b.readUIntLE(24, 3) + 1; h = b.readUIntLE(27, 3) + 1; }
      else if (fmt === 'VP8L') { const n = b.readUInt32LE(21); w = (n & 0x3fff) + 1; h = ((n >> 14) & 0x3fff) + 1; }
      else if (fmt === 'VP8 ') { w = b.readUInt16LE(26) & 0x3fff; h = b.readUInt16LE(28) & 0x3fff; }
    } else if (b.slice(0, 400).toString('utf8').includes('<svg')) {
      const s = b.toString('utf8');
      const wm = s.match(/\bwidth\s*=\s*["']?([\d.]+)/i);
      const hm = s.match(/\bheight\s*=\s*["']?([\d.]+)/i);
      const vm = s.match(/\bviewBox\s*=\s*["']\s*[-\d.]+\s+[-\d.]+\s+([\d.]+)\s+([\d.]+)/i);
      if (wm && hm) { w = Math.round(+wm[1]); h = Math.round(+hm[1]); }
      else if (vm) { w = Math.round(+vm[1]); h = Math.round(+vm[2]); }
    }
    if (w && h) out = { w, h };
  } catch (e) { out = null; }
  CACHE.set(abs, out);
  return out;
}

function walk(d, out) {
  if (!fs.existsSync(d)) return out;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

const IMG_TAG = /<img(?=[\s/>])(?:[^>"']|"[^"]*"|'[^']*')*>/gi;
function attr(t, n) {
  const m = t.match(new RegExp('\\s' + n + '\\s*=\\s*(?:"([^"]*)"|\'([^\']*)\')', 'i'));
  return m ? (m[1] !== undefined ? m[1] : m[2]) : null;
}
const toLocal = u => path.join(SITE, String(u).replace(/^https?:\/\/[^/]+/i, '').split('#')[0].split('?')[0].replace(/^\/+/, '').replace(/\//g, path.sep));

function main() {
  const pages = walk(SITE, []);
  let imgs = 0, withSrcset = 0, cands = 0;
  const missing = [], mismatched = [];
  const gaps = [];
  const descriptorUse = {};

  for (const pg of pages) {
    const html = fs.readFileSync(pg, 'utf8');
    IMG_TAG.lastIndex = 0;
    let m;
    while ((m = IMG_TAG.exec(html)) !== null) {
      const tag = m[0];
      const srcset = attr(tag, 'srcset');
      if (!srcset) continue;
      imgs++; withSrcset++;
      const page = pg.replace(/\\/g, '/').split('/_site/')[1];
      const ds = [];
      for (const part of srcset.split(',')) {
        const mm = part.trim().match(/^(\S+)\s+(\d+)w$/);
        if (!mm) continue;
        const url = mm[1], decl = parseInt(mm[2]);
        cands++;
        ds.push(decl);
        descriptorUse[decl] = (descriptorUse[decl] || 0) + 1;
        const size = readSize(toLocal(url));
        if (!size) { missing.push(page + '  ' + url + '  (' + decl + 'w)'); continue; }
        if (size.w !== decl) mismatched.push(page + '  声明 ' + decl + 'w  实际 ' + size.w + 'px  ' + url);
      }
      const sorted = [...new Set(ds)].sort((a, b) => a - b);
      for (let i = 1; i < sorted.length; i++) {
        if (sorted[i] / sorted[i - 1] > GAP_LIMIT) {
          gaps.push(page + '  [' + sorted.join('+') + ']  最大档距 ' + (sorted[i] / sorted[i - 1]).toFixed(2) + 'x');
          break;
        }
      }
    }
  }

  console.log('');
  console.log('=== 图片变体一致性校验 ===');
  console.log('  扫描页面            : ' + pages.length);
  console.log('  含 srcset 的 <img>  : ' + withSrcset);
  console.log('  srcset 候选总数     : ' + cands);
  console.log('  描述符档位种类      : ' + Object.keys(descriptorUse).length);
  console.log('');
  console.log('  候选文件缺失        : ' + missing.length);
  console.log('  描述符 ≠ 真实宽度   : ' + mismatched.length);
  console.log('  阶梯断档（> ' + GAP_LIMIT + 'x，WARN）: ' + gaps.length);

  if (missing.length) {
    console.log('');
    console.log('  ── 缺失（前 15）──');
    missing.slice(0, 15).forEach(x => console.log('   ' + x));
  }
  if (mismatched.length) {
    console.log('');
    console.log('  ── 描述符不符（前 15）──');
    mismatched.slice(0, 15).forEach(x => console.log('   ' + x));
  }
  if (gaps.length) {
    console.log('');
    console.log('  ── 断档（前 8，不阻断）──');
    gaps.slice(0, 8).forEach(x => console.log('   ' + x));
  }

  const fail = missing.length + mismatched.length;
  console.log('');
  if (fail) {
    console.log('[validate-img-variants] FAIL —— ' + fail + ' 个硬错误（缺失 ' + missing.length + ' / 描述符不符 ' + mismatched.length + '）');
    process.exit(1);
  }
  console.log('[validate-img-variants] PASS');
}

main();
