// Parallel dev launcher: tailwind watch + esbuild watch (6 locales) + eleventy serve.
// Replaces the serial `npm run dev` chain (css 11s + js 6x1.5s + eleventy) —
// all three tracks now start simultaneously; first paint waits only on eleventy.
import { spawn } from 'node:child_process';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const ROOT = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
process.chdir(ROOT);

const locales = ['en', 'de', 'es', 'fr', 'ru', 'pl'];
const procs = [];
let shuttingDown = false;

function run(name, cmd, args, opts = {}) {
  const p = spawn(cmd, args, {
    shell: process.platform === 'win32',
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, NODE_OPTIONS: '--max-old-space-size=8192' },
  });
  const tag = opts.tag || name;
  const onLine = (buf) => {
    for (const line of buf.toString().split(/\r?\n/)) {
      if (line.trim()) console.log(`[${tag}] ${line}`);
    }
  };
  p.stdout.on('data', onLine);
  p.stderr.on('data', onLine);
  p.on('exit', (code, signal) => {
    if (!shuttingDown) console.log(`[${tag}] exited (code=${code} signal=${signal})`);
  });
  procs.push(p);
  return p;
}

// --- Track 1: Tailwind CSS watch ---
// First build inline so css/styles.css exists before eleventy serves; then watch.
run('css', 'npx', ['tailwindcss', '-i', './css/src.css', '-o', './css/styles.css', '--minify', '--watch'], { tag: 'css' });

// --- Track 2: esbuild watch for all 6 locales (in-process, parallel) ---
const esbuild = require('esbuild');
for (const lang of locales) {
  const outfile = lang === 'en' ? 'main.js' : path.join(lang, 'js', `${lang}-main.js`);
  esbuild
    .context({
      entryPoints: ['main.src.js'],
      bundle: true,
      minify: true,
      outfile,
      define: { LANG: JSON.stringify(lang) },
      logLevel: 'info',
    })
    .then((ctx) => ctx.watch())
    .catch((err) => {
      console.error(`[js:${lang}] esbuild watch failed:`, err);
      process.exitCode = 1;
    });
}
console.log('[js] esbuild watch running for: ' + locales.join(', '));

// --- Track 3: Eleventy dev server (long-running foreground process) ---
run('11ty', 'npx', ['@11ty/eleventy', '--serve', '--quiet', '--incremental'], { tag: '11ty' });

function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log(`\n[dev] shutting down (${signal})...`);
  for (const p of procs) {
    try { p.kill(); } catch { /* already gone */ }
  }
  // esbuild contexts die with the process
  setTimeout(() => process.exit(0), 300);
}
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('exit', () => {
  for (const p of procs) {
    try { p.kill(); } catch { /* already gone */ }
  }
});
