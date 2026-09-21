/* blog 明文指纹捕获/比对（只读）
 * 用法：
 *   node scripts/verify-text-identity.js save   <file>   # 捕获全部 blog 页可见文本指纹
 *   node scripts/verify-text-identity.js check  <file>   # 比对
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.join(__dirname, '..', '_site');
const LANGS = ['en', 'de', 'es', 'fr', 'ru', 'pl'];
const mode = process.argv[2];
const store = process.argv[3];
if (!mode || !store) { console.error('用法: save|check <file>'); process.exit(1); }

function fp(html) {
  const t = html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return crypto.createHash('sha256').update(t, 'utf8').digest('hex').slice(0, 16);
}

const cur = {};
for (const lg of LANGS) {
  const d = path.join(ROOT, lg === 'en' ? 'blog' : lg + '/blog');
  if (!fs.existsSync(d)) continue;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    const p = path.join(d, e.name, 'index.html');
    if (!fs.existsSync(p)) continue;
    cur[lg + '/' + e.name] = fp(fs.readFileSync(p, 'utf8'));
  }
}

if (mode === 'save') {
  fs.writeFileSync(store, JSON.stringify(cur, null, 1));
  console.log('已保存 ' + Object.keys(cur).length + ' 个页面指纹 → ' + store);
  process.exit(0);
}

const old = JSON.parse(fs.readFileSync(store, 'utf8'));
const keys = new Set([...Object.keys(old), ...Object.keys(cur)]);
let diff = 0, missing = 0;
for (const k of [...keys].sort()) {
  if (!(k in cur)) { console.log('❌ 消失: ' + k); missing++; continue; }
  if (!(k in old)) { console.log('🆕 新增: ' + k); continue; }
  if (old[k] !== cur[k]) { console.log('❌ 明文变更: ' + k + '  ' + old[k] + ' → ' + cur[k]); diff++; }
}
console.log('\n比对 ' + Object.keys(cur).length + ' 页：明文变更 ' + diff + ' 个，消失 ' + missing + ' 个');
console.log(diff + missing === 0 ? '✅ 全部明文零变更' : '⚠️ 存在变更，需排查');
process.exit(diff + missing ? 1 : 0);
