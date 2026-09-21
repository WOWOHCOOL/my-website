/* i18n 本土化漏点审计（只读）
 *
 * 判据：非 EN 语言的值若与 EN 完全相同，很可能是「没翻译 / 回落英文」。
 * 但纯品牌名、型号、标准号、URL 本来就该相同 → 必须白名单排除，否则误报。
 *
 * 用法：node scripts/audit-i18n-coverage.js [--json]
 */
'use strict';
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'src', '_data', 'i18n.json');
const asJson = process.argv.includes('--json');
const j = JSON.parse(fs.readFileSync(SRC, 'utf8'));

const LANGS = ['en', 'de', 'es', 'fr', 'ru', 'pl'];

/* 允许与 EN 相同的内容：品牌 / 型号 / 标准号 / URL / 纯符号 / 数字 */
const WHITELIST = [
  /^WOWOHCOOL$/i, /^WOWOHCOOL\.com$/i, /^WOWO$/i,
  /^https?:\/\//i, /^[\/#][\w\/#\-.]*$/,
  /^[\d\s.,%+\-–—()\[\]{}:;'"`~!?@&*=<>\|\\^$]*$/,   // 纯符号/数字
  /^(USB|USB-C|PD|GaN|Qi|Qi2|OEM|ODM|B2B|MOQ|CE|FCC|UL|RoHS|REACH|GPSR|IEC|UN38\.3|ISO|XING|LinkedIn|YouTube|Instagram|Facebook|WhatsApp|WeChat|TikTok)([-\s\w.]*)$/,
  /^\d[\d\s.,%+\-–—]*$/,
];

function whitelisted(v) {
  return WHITELIST.some((re) => re.test(v));
}

/* 扁平化：路径 → 值 */
function flat(obj, prefix, out) {
  for (const [k, v] of Object.entries(obj)) {
    const p = prefix ? prefix + '.' + k : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) flat(v, p, out);
    else out[p] = v;
  }
  return out;
}

/* 取某语言的扁平表（结构：component → lang → {...}） */
const perLang = {};
for (const lang of LANGS) {
  const acc = {};
  for (const comp of Object.keys(j)) {
    const node = j[comp] && j[comp][lang];
    if (node && typeof node === 'object') flat(node, comp, acc);
    else if (typeof node === 'string') acc[comp] = node;
  }
  perLang[lang] = acc;
}

const enKeys = new Set(Object.keys(perLang.en));

const report = { missingKeys: [], identicalToEn: [], empty: [] };

for (const lang of LANGS) {
  if (lang === 'en') continue;
  const t = perLang[lang];
  for (const k of enKeys) {
    if (!(k in t)) { report.missingKeys.push({ lang, key: k }); continue; }
    const v = t[k], e = perLang.en[k];
    if (v === '' || v === null || v === undefined) { report.empty.push({ lang, key: k }); continue; }
    if (typeof v === 'string' && typeof e === 'string' && v === e && !whitelisted(v)) {
      report.identicalToEn.push({ lang, key: k, value: String(v).slice(0, 90) });
    }
  }
  for (const k of Object.keys(t)) if (!enKeys.has(k)) report.missingKeys.push({ lang, key: k + '  (EN 无此键)' });
}

if (asJson) { console.log(JSON.stringify(report, null, 2)); process.exit(0); }

console.log('=== i18n 本土化覆盖审计（' + enKeys.size + ' 个 EN 键 × ' + (LANGS.length - 1) + ' 语言）===\n');

console.log('【1】缺失键（非 EN 有、EN 无 或 该语言缺键）');
if (!report.missingKeys.length) console.log('  ✅ 0');
else { console.log('  ' + report.missingKeys.length + ' 处'); report.missingKeys.slice(0, 15).forEach((x) => console.log(`     ${x.lang}  ${x.key}`)); }

console.log('\n【2】空值');
if (!report.empty.length) console.log('  ✅ 0');
else { console.log('  ' + report.empty.length + ' 处'); report.empty.slice(0, 15).forEach((x) => console.log(`     ${x.lang}  ${x.key}`)); }

console.log('\n【3】与 EN 逐字相同（疑似未本土化，已排除品牌/型号/标准号/URL）');
if (!report.identicalToEn.length) console.log('  ✅ 0');
else {
  console.log('  ' + report.identicalToEn.length + ' 处\n');
  const byLang = {};
  for (const x of report.identicalToEn) (byLang[x.lang] = byLang[x.lang] || []).push(x);
  for (const [l, list] of Object.entries(byLang)) {
    console.log('  ── ' + l + ' (' + list.length + ')');
    for (const x of list) console.log(`     ${x.key}\n        "${x.value}"`);
  }
}
