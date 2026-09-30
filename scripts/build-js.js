#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const ROOT = path.join(__dirname, '..');
const LANG = process.argv[2];
const LANGS = new Set(['en', 'de', 'es', 'fr', 'ru', 'pl']);

if (!LANGS.has(LANG)) {
  console.error('Usage: node scripts/build-js.js <en|de|es|fr|ru|pl>');
  process.exit(1);
}

const inquiry = JSON.parse(fs.readFileSync(path.join(ROOT, 'src', '_data', 'inquiry.json'), 'utf8'));
const responseTime = inquiry.responseTime && inquiry.responseTime[LANG];
if (typeof responseTime !== 'string' || !responseTime) {
  console.error('[build-js] missing responseTime.' + LANG + ' in src/_data/inquiry.json');
  process.exit(1);
}

const outfile = LANG === 'en'
  ? path.join(ROOT, 'main.js')
  : path.join(ROOT, LANG, 'js', LANG + '-main.js');

fs.mkdirSync(path.dirname(outfile), { recursive: true });
const config = {
  absWorkingDir: ROOT,
  entryPoints: [path.join(ROOT, 'main.src.js')],
  bundle: true,
  minify: true,
  outfile,
  define: {
    LANG: JSON.stringify(LANG),
    RESPONSE_TIME: JSON.stringify(responseTime),
  },
  logLevel: 'info',
};

if (process.argv.includes('--watch')) {
  esbuild.context(config)
    .then((ctx) => ctx.watch())
    .catch((err) => {
      console.error('[build-js] watch failed:', err);
      process.exit(1);
    });
} else {
  esbuild.buildSync(config);
}
