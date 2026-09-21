/**
 * 封面图变体生成器 —— 统一梯子 450 / 800 / 950 / 1200 / 1700
 *
 * 为什么需要它：
 *   站点原有 379 张基础图用了 21 种变体宽度（200w…1920w，含 1706w），
 *   模板里有 31 种描述符 / 42 种档位组合 / 38 种 sizes —— 手工维护必然失控。
 *   本脚本把「生成哪几档」变成一处定义、可重跑、幂等。
 *
 * 用法：
 *   node scripts/build-images.js                        # dry-run（默认，不写盘）
 *   node scripts/build-images.js --apply                # 实际生成
 *   node scripts/build-images.js --only=cover-de        # 只处理路径含该子串的
 *   node scripts/build-images.js --apply --normalize-base   # 同时把超宽基础图降到基准宽
 *
 * ⚠️⚠️⚠️ 环境铁律（2026-09-21 实测，踩过）：
 *   **绝不能把文件路径交给 sharp**。libvips 读取路径后会持有该文件句柄，
 *   同进程内再写回同一路径 → Windows 共享冲突 `errno -4094 / UNKNOWN: open`。
 *   症状极具迷惑性：**新建**变体一切正常，只有**覆盖**基础图时才炸。
 *   正确做法 = 一律 `sharp(fs.readFileSync(p))`，让 libvips 只见 Buffer。
 *   同理，`fs.copyFileSync` 目标若曾被 sharp 以路径读过，也会 -4094。
 *
 * 其他硬规则：
 *   1. 绝不放大（withoutEnlargement）—— 基础图比某档还窄就跳过该档
 *   2. 幂等 —— 已存在且真实宽度 == 档位宽度的变体直接跳过
 *   3. 描述符永远等于文件真实宽度（下游 validate-img-variants.js 会核）
 *   4. 覆盖已存在的文件需要 `CODEBUDDY_SAFE_DELETE_ENABLED=0`
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..');
const ARGS = process.argv.slice(2);
const APPLY = ARGS.includes('--apply');
const NORMALIZE_BASE = ARGS.includes('--normalize-base');
const ONLY = (ARGS.find(a => a.startsWith('--only=')) || '').replace('--only=', '');
const DIR = (ARGS.find(a => a.startsWith('--dir=')) || '--dir=image/blog').replace('--dir=', '');
const MATCH = (ARGS.find(a => a.startsWith('--match=')) || '--match=cover-').replace('--match=', '');
const LADDER = ((ARGS.find(a => a.startsWith('--ladder=')) || '').replace('--ladder=', '')
  || '450,800,950,1200,1700').split(',').map(Number).sort((a, b) => a - b);
const BASE_W = Number((ARGS.find(a => a.startsWith('--base=')) || '--base=1700').replace('--base=', ''));
const QUALITY = Number((ARGS.find(a => a.startsWith('--quality=')) || '--quality=78').replace('--quality=', ''));

const VARIANT_RE = /-\d+w(\.[a-z0-9]+)$/i;
const readBuf = p => fs.readFileSync(p);

function walk(d, out) {
  if (!fs.existsSync(d)) return out;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.webp$/i.test(e.name) && !VARIANT_RE.test(e.name)) out.push(p);
  }
  return out;
}

const rel = p => p.replace(/\\/g, '/').replace(ROOT.replace(/\\/g, '/') + '/', '');

async function main() {
  const dirAbs = path.join(ROOT, DIR);
  let bases = walk(dirAbs, []);
  if (MATCH) bases = bases.filter(p => rel(p).includes(MATCH));
  if (ONLY) bases = bases.filter(p => rel(p).includes(ONLY));

  console.log('=== build-images ===');
  console.log('目录      : ' + DIR + (MATCH ? '  (match: ' + MATCH + ')' : ''));
  console.log('梯子      : ' + LADDER.join(' / '));
  console.log('基准宽    : ' + BASE_W + (NORMALIZE_BASE ? '（会降采样超宽基础图）' : '（不动基础图）'));
  console.log('模式      : ' + (APPLY ? 'APPLY（写盘）' : 'DRY-RUN（不写盘）'));
  console.log('基础图    : ' + bases.length + ' 张');
  console.log('');

  let madeVar = 0, skipVar = 0, madeBase = 0, savedBase = 0;
  const exceptions = [];
  const rows = [];

  for (const p of bases) {
    const r = rel(p);
    const origBuf = readBuf(p);
    let meta = await sharp(origBuf).metadata();
    let srcBuf = origBuf;
    let baseChanged = false;

    if (NORMALIZE_BASE && meta.width > BASE_W) {
      const outBuf = await sharp(origBuf)
        .resize({ width: BASE_W, withoutEnlargement: true })
        .webp({ quality: QUALITY }).toBuffer();
      const newMeta = await sharp(outBuf).metadata();
      if (APPLY) fs.writeFileSync(p, outBuf);
      savedBase += origBuf.length - outBuf.length;
      madeBase++;
      baseChanged = true;
      rows.push('  [BASE↓] ' + r + '  ' + meta.width + 'x' + meta.height + ' → ' + newMeta.width + 'x' + newMeta.height
        + '  (' + (origBuf.length / 1024).toFixed(0) + '→' + (outBuf.length / 1024).toFixed(0) + 'KB)');
      meta = newMeta;
      srcBuf = outBuf; // 梯子从新基础图派生，避免二次压缩累积
    }

    const stem = p.replace(/\.webp$/i, '');
    const lack = [];
    for (const w of LADDER) {
      if (w >= meta.width) continue;
      const vp = stem + '-' + w + 'w.webp';
      let ok = false;
      if (fs.existsSync(vp)) {
        const vm = await sharp(readBuf(vp)).metadata();
        ok = vm.width === w; // 幂等 + 防错标
      }
      if (ok) { skipVar++; continue; }
      lack.push(w);
      madeVar++;
      if (APPLY) {
        const vbuf = await sharp(srcBuf)
          .resize({ width: w, withoutEnlargement: true })
          .webp({ quality: QUALITY }).toBuffer();
        fs.writeFileSync(vp, vbuf);
      }
    }
    if (lack.length) rows.push('  [+VAR ] ' + r + '  补 ' + lack.map(w => w + 'w').join(' ') + (baseChanged ? '  (基础图已降采样)' : ''));

    if (meta.width < BASE_W) {
      exceptions.push('  ' + r + '  基础仅 ' + meta.width + 'x' + meta.height + '，梯子封顶到 ' + meta.width + 'w（不放大）');
    }
  }

  rows.slice(0, 40).forEach(x => console.log(x));
  if (rows.length > 40) console.log('  … 另有 ' + (rows.length - 40) + ' 条');

  console.log('');
  console.log((APPLY ? '生成变体 ' : '将生成变体 ') + madeVar + ' 个；已存在且正确 ' + skipVar + ' 个');
  if (NORMALIZE_BASE) console.log((APPLY ? '降采样基础图 ' : '将降采样基础图 ') + madeBase + ' 张，省 ' + (savedBase / 1024).toFixed(0) + 'KB');
  if (exceptions.length) {
    console.log('');
    console.log('⚠️ 基础图小于基准宽（不放大，梯子封顶）—— 属既有画质欠债：');
    exceptions.forEach(x => console.log(x));
  }
  if (!APPLY) console.log('\n（dry-run，未写盘。加 --apply 执行）');
}

main().catch(e => { console.error(e); process.exit(1); });
