#!/usr/bin/env node
/*
 * Validate internal links inside llms.txt and per-language llms.txt.
 *
 * WHY: these files are an AI/agent entry point. A stale blog URL here is a
 * silent citation-path failure — the normal validate-links.js scan only reads
 * <a href> inside HTML and never sees text URLs in .txt output.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SITE = path.join(ROOT, '_site');
if (!fs.existsSync(SITE)) {
  console.error('[validate-llms-links] _site/ not found — run the build first');
  process.exit(1);
}

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name === 'llms.txt') out.push(p);
  }
  return out;
}

const pageExists = (urlPath) => {
  const clean = decodeURIComponent(urlPath.split('#')[0].split('?')[0]);
  const base = clean.replace(/^\/+/, '').replace(/\/+$/, '');
  if (base === '') return fs.existsSync(path.join(SITE, 'index.html'));
  if (fs.existsSync(path.join(SITE, base))) return true;
  if (fs.existsSync(path.join(SITE, base, 'index.html'))) return true;
  if (fs.existsSync(path.join(SITE, base + '.html'))) return true;
  return false;
};

const files = walk(SITE);
const bad = [];
let checked = 0;

for (const file of files) {
  const rel = path.relative(SITE, file).replace(/\\/g, '/');
  const text = fs.readFileSync(file, 'utf8');
  for (const m of text.matchAll(/https:\/\/www\.wowohcool\.com(\/[^)\s"'<>]*)?/g)) {
    const urlPath = m[1] || '/';
    checked++;
    if (!pageExists(urlPath)) bad.push({ file: rel, url: 'https://www.wowohcool.com' + urlPath });
  }
}

console.log('=== validate-llms-links ===');
console.log('llms.txt files : ' + files.length);
console.log('internal URLs  : ' + checked);
if (bad.length) {
  console.error('broken internal URL(s): ' + bad.length);
  for (const b of bad.slice(0, 40)) console.error('  ' + b.file + ' -> ' + b.url);
  process.exit(1);
}
console.log('[validate-llms-links] PASS');
