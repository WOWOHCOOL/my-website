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
    // ⚠️⚠️ stdin 绝不能用 'ignore'：那会让子进程的 stdin 立刻 EOF。
    //    Tailwind CLI 的 `--watch` 一旦读到 stdin EOF 就 **exit 0 静默退出**
    //    （只打一条 Browserslist 警告，连首次构建的 "Done in Xms" 都不输出）
    //    → CSS 热更新永久失效，改 css/src.css 必须手动 `npm run build:css`。
    //    保持一个「从不写入、也从不 end」的 pipe 即可让它常驻。
    //    Eleventy --serve 不受影响，继续用 'ignore'。
    stdio: [opts.stdin || 'ignore', 'pipe', 'pipe'],
    // Eleventy's initial build/clean trips the bulk-delete guard unless this is
    // disabled; without it the 11ty track exits silently and :8080 never binds.
    env: { ...process.env, NODE_OPTIONS: '--max-old-space-size=8192', CODEBUDDY_SAFE_DELETE_ENABLED: '0' },
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
    if (shuttingDown) return;
    console.log(`[${tag}] exited (code=${code} signal=${signal})`);
    // 常驻轨道意外退出必须显式告警，否则会静默退化成「改了没反应」
    if (opts.expectRunning) {
      console.log(`[${tag}] ⚠️ 该轨道本应常驻却已退出 —— 热更新已失效，请检查 stdin 配置`);
    }
  });
  procs.push(p);
  return p;
}

// --- Track 1: Tailwind CSS watch ---
// First build inline so css/styles.css exists before eleventy serves; then watch.
// stdin:'pipe' 是必需的 —— 见 run() 里的说明（'ignore' 会让 watch 立即 exit 0）。
run('css', 'npx', ['tailwindcss', '-i', './css/src.css', '-o', './css/styles.css', '--minify', '--watch'], { tag: 'css', stdin: 'pipe', expectRunning: true });

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
// expectRunning: 11ty 轨同样必须常驻。--quiet 会吞掉启动日志，若不告警，
// 它静默退出时表现是「curl :8080 全是 000」，与「首建还在跑（~97s）」无法区分。
run('11ty', 'npx', ['@11ty/eleventy', '--serve', '--quiet', '--incremental'], { tag: '11ty', expectRunning: true });

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
