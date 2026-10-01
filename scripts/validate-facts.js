#!/usr/bin/env node
/*
 * Structured facts validator.
 *
 * Single source: src/_data/facts.json.
 * Scope: built page JSON-LD Organization / ContactPoint values that are meant
 * to be machine-readable and globally stable (legal name, VAT, founding year,
 * email, telephone). Visible localized copy is intentionally not normalized.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const SITE = path.join(ROOT, '_site');
const FACTS = JSON.parse(fs.readFileSync(path.join(ROOT, 'src', '_data', 'facts.json'), 'utf8'));
const expected = {
  legalName: FACTS.legalName,
  vatID: FACTS.vatID,
  founded: String(FACTS.founded),
  email: FACTS.contact.email,
  phone: FACTS.contact.phoneE164,
};
function walk(d, out = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}
function nodeHasType(n, t) { const v=n&&n['@type']; return Array.isArray(v) ? v.includes(t) : v===t; }
function digits(s) { return String(s || '').replace(/[^0-9]/g, ''); }
function same(a,b) { return String(a||'').trim() === String(b||'').trim(); }
function factValue(keyPath) {
  let cur = FACTS;
  for (const part of String(keyPath).split('.')) {
    if (!cur || typeof cur !== 'object' || !(part in cur)) return undefined;
    cur = cur[part];
  }
  return cur;
}
function collectLeafPaths(obj, prefix = '', out = []) {
  for (const [k, v] of Object.entries(obj || {})) {
    const p = prefix ? prefix + '.' + k : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) collectLeafPaths(v, p, out);
    else out.push(p);
  }
  return out;
}

function walkFiles(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (['node_modules', '.git', '_site'].includes(e.name)) continue;
      walkFiles(p, out);
    } else if (/\.(njk|md|json|html|xml|txt)$/i.test(e.name)) out.push(p);
  }
  return out;
}
function scanFactTokens(dir, label, allowSource) {
  for (const file of fs.existsSync(dir) ? walkFiles(dir) : []) {
    const text = fs.readFileSync(file, 'utf8');
    for (const m of text.matchAll(/\{FACT:([A-Za-z0-9_.]+)\}/g)) {
      const key = m[1];
      const val = factValue(key);
      const rel = path.relative(ROOT, file).replace(/\\/g, '/');
      if (val === undefined || val === null || val === '') errors.push(label+' unresolved token in '+rel+': '+key);
      if (!allowSource && val === undefined) errors.push(label+' unknown token in '+rel+': '+key);
    }
  }
}

let pages=0, orgs=0, contactPoints=0;
const errors=[], warnings=[];
for (const file of fs.existsSync(SITE) ? walk(SITE) : []) {
  const rel='/' + path.relative(SITE,file).replace(/\\/g,'/').replace(/index\.html$/,'');
  const html=fs.readFileSync(file,'utf8');
  for (const sm of html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)) {
    let parsed; try { parsed=JSON.parse(sm[1]); } catch { continue; }
    const arr=Array.isArray(parsed)?parsed:(parsed['@graph']||[parsed]);
    const stack=[...arr];
    while (stack.length) {
      const n=stack.pop();
      if (!n || typeof n!=='object') continue;
      if (nodeHasType(n,'Organization')) {
        pages++; orgs++;
        if (n.legalName && !same(n.legalName, expected.legalName)) errors.push(rel+' legalName='+n.legalName);
        if (n.vatID && !same(n.vatID, expected.vatID)) errors.push(rel+' vatID='+n.vatID);
        if (n.foundingDate && String(n.foundingDate).slice(0,4)!==expected.founded) errors.push(rel+' foundingDate='+n.foundingDate);
        if (n.email && !same(n.email, expected.email)) errors.push(rel+' email='+n.email);
        if (n.telephone && digits(n.telephone)!==digits(expected.phone)) errors.push(rel+' telephone='+n.telephone);
        for (const field of ['legalName','vatID','foundingDate']) if (!n[field]) warnings.push(rel+' missing Organization.'+field);
      }
      if (nodeHasType(n,'ContactPoint')) {
        contactPoints++;
        if (n.email && !same(n.email, expected.email)) errors.push(rel+' contactPoint.email='+n.email);
        if (n.telephone && digits(n.telephone)!==digits(expected.phone)) errors.push(rel+' contactPoint.telephone='+n.telephone);
      }
      for (const v of Object.values(n)) if (v && typeof v==='object') stack.push(v);
    }
  }
}
for (const [lang, overrides] of Object.entries(FACTS.i18n || {})) {
  for (const key of collectLeafPaths(overrides)) {
    if (factValue(key) === undefined) errors.push('i18n.'+lang+' unknown base fact key: '+key);
  }
}
scanFactTokens(path.join(ROOT, 'src'), 'source', true);
scanFactTokens(SITE, 'output', false);

console.log('=== structured facts validator ===');
console.log('Organization nodes : '+orgs);
console.log('ContactPoint nodes  : '+contactPoints);
console.log('warnings            : '+warnings.length);
console.log('errors              : '+errors.length);
for (const w of warnings.slice(0,20)) console.warn('  ⚠️ '+w);
if (warnings.length>20) console.warn('  ... +'+(warnings.length-20)+' more');
for (const e of errors.slice(0,30)) console.error('  ❌ '+e);
if (errors.length>30) console.error('  ... +'+(errors.length-30)+' more');
if (errors.length) process.exit(1);
console.log('[validate-facts] PASS');
