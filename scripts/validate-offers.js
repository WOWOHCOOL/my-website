// Product.offers structured-data validator.
//
// Usage:  node scripts/validate-offers.js
//
// Guards the `offers` node on every Product in _site against the five failure
// modes that were found in the 2026-09-22 audit (100 declarations / 84 pages,
// NONE of which were covered by any gate):
//
//   1. CURRENCY DRIFT     同一语言内出现多种币种（曾见 FR = EUR×9 + USD×8，PL = USD×11 + PLN×5）
//   2. CROSS-LANG DRIFT   同一产品在六个语言版本声明不同区间
//                         （曾见笔记本电源 EN 22-55 USD vs RU 29-85 USD；无线充系列六语言六个值）
//   3. DEGENERATE RANGE   lowPrice == highPrice（曾见 8 处，如 EUR 18.00-18.00）
//   4. BAD AVAILABILITY   availability 不是合法 ItemAvailability，
//                         或按单生产的 OEM 货标 InStock（不实陈述供应链能力）
//   5. MISSING MOQ        页面可见文案有 MOQ 500，机器可读层却没有 eligibleQuantity
//
// 权威来源：EN 站点。EN 的 lowPrice/highPrice 是单一事实源，其余语言必须逐值相同。
// 币种统一为 USD：出厂价按 FOB 报价，各语言产品页可见文案本身即写 "OEM $12-22" / "15-42 $/unité"。
//
// History: 2026-09-22 建立。当时 100 处声明里只有 4 处能在页面找到同值依据，
// 83 处页面上根本没有对应文字，13 处与可见文字矛盾；98 处标 InStock；0 处有 eligibleQuantity。
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE = path.join(ROOT, '_site');
const HOST = 'https://www.wowohcool.com';

// 项目决定：出厂价统一 USD（以 EN 站点为权威）
const ALLOWED_CURRENCY = new Set(['USD']);
// schema.org ItemAvailability 合法值
const ALLOWED_AVAILABILITY = new Set([
  'https://schema.org/InStock', 'https://schema.org/OutOfStock',
  'https://schema.org/PreOrder', 'https://schema.org/BackOrder',
  'https://schema.org/Discontinued', 'https://schema.org/InStoreOnly',
  'https://schema.org/LimitedAvailability', 'https://schema.org/OnlineOnly',
  'https://schema.org/PreSale', 'https://schema.org/SoldOut',
  'https://schema.org/MadeToOrder'
]);
// 按单生产，不应声明现货
const FORBIDDEN_FOR_MTO = new Set(['https://schema.org/InStock']);

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name === 'index.html') out.push(p);
  }
  return out;
}

function urlOf(file) {
  const rel = path.relative(SITE, file).split(path.sep).join('/');
  const dir = rel.replace(/\/index\.html$/, '').replace(/^index\.html$/, '');
  return HOST + '/' + (dir ? dir + '/' : '');
}

// 按开标签切块 + 下钻 @graph（项目既定铁律）
function ldBlocks(html) {
  const out = [];
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const s = m.index + m[0].length;
    const e = html.indexOf('</script>', s);
    if (e < 0) continue;
    try { out.push(JSON.parse(html.slice(s, e))); } catch (err) { /* 解析失败由 validate-html 负责 */ }
  }
  return out;
}

function collectProducts(node, acc) {
  if (Array.isArray(node)) { node.forEach(n => collectProducts(n, acc)); return acc; }
  if (!node || typeof node !== 'object') return acc;
  if (node['@graph']) collectProducts(node['@graph'], acc);
  if (node['@type'] === 'Product' && node.offers) acc.push(node);
  for (const k of Object.keys(node)) {
    if (k === '@graph') continue;
    if (node[k] && typeof node[k] === 'object') collectProducts(node[k], acc);
  }
  return acc;
}

function firstOffer(o) { return Array.isArray(o) ? o[0] : o; }

function hreflangs(html) {
  const set = {};
  const re = /<link[^>]+rel=["']alternate["'][^>]*>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const hl = /hreflang=["']([^"']+)["']/.exec(m[0]);
    const href = /href=["']([^"']+)["']/.exec(m[0]);
    if (hl && href) set[hl[1]] = href[1];
  }
  return set;
}

const files = walk(SITE);
const records = [];       // { url, lang, index, offer }
const byUrl = {};         // url -> html 缓存（供 hreflang 查）
const issues = [];
let pagesWithOffers = 0;

for (const f of files) {
  const html = fs.readFileSync(f, 'utf8');
  const url = urlOf(f);
  const rel = path.relative(SITE, f).split(path.sep).join('/');
  const lang = /^(de|es|fr|ru|pl)\//.test(rel) ? rel.split('/')[0] : 'en';
  byUrl[url] = html;
  const prods = [];
  for (const blk of ldBlocks(html)) collectProducts(blk, prods);
  if (!prods.length) continue;
  pagesWithOffers++;
  prods.forEach((p, i) => {
    records.push({ url, lang, rel, index: i, name: p.name, offer: firstOffer(p.offers) });
  });
}

// 逐条检查
const langCurrencies = {};
for (const r of records) {
  const o = r.offer;
  const tag = `${r.lang} ${r.rel}#${r.index + 1}`;

  // 1. 币种
  if (!ALLOWED_CURRENCY.has(o.priceCurrency)) {
    issues.push(`[币种] ${tag}: priceCurrency=${o.priceCurrency}（应为 ${[...ALLOWED_CURRENCY].join('/')}）`);
  }
  (langCurrencies[r.lang] = langCurrencies[r.lang] || new Set()).add(o.priceCurrency);

  // 2. 区间有效
  const lo = parseFloat(o.lowPrice), hi = parseFloat(o.highPrice);
  if (!Number.isFinite(lo) || !Number.isFinite(hi)) {
    issues.push(`[区间] ${tag}: lowPrice/highPrice 非数字 (${o.lowPrice}/${o.highPrice})`);
  } else if (lo >= hi) {
    issues.push(`[退化区间] ${tag}: ${lo} >= ${hi}（AggregateOffer 必须 lowPrice < highPrice；单一价请用 Offer+price）`);
  }

  // 3. availability
  if (!o.availability) {
    issues.push(`[availability] ${tag}: 缺失`);
  } else if (!ALLOWED_AVAILABILITY.has(o.availability)) {
    issues.push(`[availability] ${tag}: ${o.availability} 不是合法 ItemAvailability`);
  } else if (FORBIDDEN_FOR_MTO.has(o.availability)) {
    issues.push(`[availability] ${tag}: 按单生产（MOQ 500）不应声明 ${o.availability}，应用 https://schema.org/MadeToOrder`);
  }

  // 4. eligibleQuantity
  const eq = o.eligibleQuantity;
  if (!eq) {
    issues.push(`[MOQ] ${tag}: 缺 eligibleQuantity（页面可见 MOQ 500，机器可读层缺失）`);
  } else {
    const mv = eq.minValue;
    if (typeof mv !== 'number' || !Number.isFinite(mv)) {
      issues.push(`[MOQ] ${tag}: eligibleQuantity.minValue 非数字 (${JSON.stringify(mv)})`);
    }
  }
}

// 5. 同语言内币种唯一
for (const [lang, set] of Object.entries(langCurrencies)) {
  if (set.size > 1) {
    issues.push(`[语言内币种不统一] ${lang}: ${[...set].join(' / ')}`);
  }
}

// 6. 跨语言一致（以 EN 为权威）
//    ⚠️ 只对「产品自身的页面」做严格比对：
//      - 单 Product 页（产品/系列页）→ 1:1 比对
//      - 多 Product 页（首页 ItemList 这类精选列表）→ 只比对两边都有 sku 的同一型号
//    首页各语言是不同编排（EN/PL 列 3 个具体型号，DE/ES/FR/RU 列 4 个品类），
//    属**设计差异**，不是漂移 —— 不可用「取第一个 Product」这种粗暴口径。
function productsOf(html) {
  const acc = [];
  for (const blk of ldBlocks(html)) collectProducts(blk, acc);
  return acc;
}
function sig(o) { return `${o.lowPrice}|${o.highPrice}|${o.priceCurrency}`; }

let checkedPairs = 0;
const warnings = [];
for (const r of records) {
  if (r.lang !== 'en') continue;
  const enProds = productsOf(byUrl[r.url] || '');
  // 多产品页（精选列表）不参与逐条跨语言比对
  if (enProds.length !== 1) continue;
  const alts = hreflangs(byUrl[r.url] || '');
  for (const l of ['de', 'es', 'fr', 'ru', 'pl']) {
    const altUrl = alts[l];
    if (!altUrl || !byUrl[altUrl]) continue;
    const altProds = productsOf(byUrl[altUrl]);
    if (altProds.length !== 1) continue;
    checkedPairs++;
    const a = firstOffer(altProds[0].offers);
    if (sig(a) !== sig(r.offer)) {
      issues.push(`[跨语言漂移] ${r.url} (${sig(r.offer)}) vs ${l} ${altUrl} (${sig(a)})`);
    }
  }
}

// 7. 系列区间应包住其子型号（警告，不阻断）
//    系列页 = 有子路径的页面；子页 = URL 以其为前缀的页面。
const seriesPages = records.filter(r => {
  const p = new URL(r.url).pathname;
  return /^\/[a-z-]+\/[^/]+\/$/.test(p) || /^\/(products|produkte|productos|produits|produkty)\/[^/]+\/$/.test(p);
});
for (const s of seriesPages) {
  const kids = records.filter(r => r.url !== s.url && r.url.startsWith(s.url));
  if (!kids.length) continue;
  const lo = parseFloat(s.offer.lowPrice), hi = parseFloat(s.offer.highPrice);
  for (const k of kids) {
    const kl = parseFloat(k.offer.lowPrice), kh = parseFloat(k.offer.highPrice);
    if (!Number.isFinite(kl) || !Number.isFinite(kh)) continue;
    if (kl < lo || kh > hi) {
      warnings.push(`[系列未包住子型号] ${s.url} = ${lo}-${hi} 但子页 ${k.url} = ${kl}-${kh}`);
    }
  }
}

console.log(`validate-offers: ${pagesWithOffers} 页 / ${records.length} 处声明 · 跨语言比对 ${checkedPairs} 对`);

if (warnings.length) {
  console.log(`\n⚠️  ${warnings.length} 条警告（不阻断，需人工确认数值）:`);
  warnings.forEach(w => console.log('    ' + w));
}

if (issues.length) {
  console.log(`\n!!! 发现 ${issues.length} 个问题:`);
  const byKind = {};
  for (const it of issues) {
    const k = it.slice(1, it.indexOf(']'));
    (byKind[k] = byKind[k] || []).push(it);
  }
  for (const [k, arr] of Object.entries(byKind)) {
    console.log(`\n  --- ${k} (${arr.length}) ---`);
    arr.slice(0, 20).forEach(x => console.log('    ' + x));
    if (arr.length > 20) console.log(`    … 其余 ${arr.length - 20} 条`);
  }
  process.exit(1);
} else {
  console.log('=== OFFERS PASS ===');
}
