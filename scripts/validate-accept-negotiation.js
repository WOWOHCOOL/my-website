/**
 * Accept 内容协商门禁（GEO 核心）
 *
 * 断言：negotiateMarkdown(accept) 对 22 个表驱动用例全部正确。
 *
 * 为什么单独一个校验器：
 *   `functions/_middleware.js` 决定「是否给 AI 爬虫返回 Markdown」——
 *   这是本站 GEO 的唯一开关。若退回朴素的 `accept.includes('text/markdown')`，
 *   下列请求会被错误地喂 Markdown（或漏掉 Markdown）：
 *     `text/markdown;q=0`                    客户端明确拒绝
 *     `text/html;q=1.0, text/markdown;q=0.1` HTML 明确优先
 *     `* / *` / `text / *`                   没有任何偏好
 *   本脚本把「修复必要」固化成反证：旧实现必须在这些用例上出错，
 *   否则说明用例没覆盖到缺陷（自检失败）。
 *
 * 实现细节：
 *   package.json 无 "type":"module"，而 _middleware.js 用 ESM `export`。
 *   直接 require 会 SyntaxError，故用 `data:` URL 动态 import——
 *   不落任何临时文件（已确认该文件无顶层 import、无 import.meta、无副作用）。
 *
 * 用法：node scripts/validate-accept-negotiation.js
 */

const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'functions', '_middleware.js');

/* 旧实现（仅用于反证「修复必要」） */
const legacy = (accept) => String(accept || '').includes('text/markdown');

/**
 * 用例表：[Accept 头, 期望是否返回 Markdown, 说明]
 * 期望值依据 RFC 7231 §5.3.2：最具体的匹配胜出；
 * 仅当 q(markdown) > 0 且 q(markdown) > q(html) 时才返回 Markdown。
 */
const CASES = [
  // ── 应返回 Markdown ──
  ['text/markdown', true, '裸 text/markdown'],
  ['text/markdown, text/html;q=0.9', true, 'markdown 优先'],
  ['text/markdown;q=0.9, text/html;q=0.8', true, 'markdown q 更高'],
  ['text/markdown;q=1, */*;q=0.5', true, 'markdown 精确 + 通配低'],
  ['TEXT/MARKDOWN', true, '大小写不敏感'],
  ['text/markdown ; q=0.5 , text/html ; q=0.4', true, '含空格'],
  ['text/markdown;q=2', true, 'q>1 截断为 1'],
  ['text/markdown;q=abc', true, '无效 q 忽略 -> 默认 1'],
  ['application/json, text/markdown', true, '无关类型 + markdown'],
  ['text/markdown;level=1', true, '未知参数忽略'],

  // ── 不应返回 Markdown（修复前会误判的部分）──
  ['', false, '空 Accept'],
  ['text/markdown;q=0', false, 'q=0 明确拒绝'],
  ['text/markdown;q=0.0', false, 'q=0.0 明确拒绝'],
  ['text/markdown;q=-1', false, 'q<0 归 0'],
  ['text/html', false, '只要 html'],
  ['text/html;q=1.0, text/markdown;q=0.1', false, 'html 明确优先'],
  ['text/html, text/markdown;q=0.1', false, 'html 优先（无 q 默认 1）'],
  ['*/*', false, '通配无偏好'],
  ['text/*', false, 'type 通配无偏好'],
  ['text/markdown, text/html', false, '同 q -> HTML 优先'],
  ['text/html;q=1, text/markdown;q=1', false, '同 q -> HTML 优先'],
  ['application/json', false, '无关类型'],
  ['application/xhtml+xml, text/html', false, 'xhtml'],
];

/** 单条判定（纯函数，便于自检） */
function judge(fn, accept, want) {
  return fn(accept) === want;
}

(async () => {
  // ── 加载被测模块 ──
  let negotiateMarkdown;
  try {
    const code = fs.readFileSync(SRC, 'utf8');
    const url = 'data:text/javascript;base64,' + Buffer.from(code, 'utf8').toString('base64');
    const mod = await import(url);
    negotiateMarkdown = mod.negotiateMarkdown;
  } catch (e) {
    console.error('[validate-accept-negotiation] FAIL —— 无法加载 functions/_middleware.js');
    console.error('  ' + (e && e.message));
    process.exit(1);
  }

  if (typeof negotiateMarkdown !== 'function') {
    console.error('[validate-accept-negotiation] FAIL —— negotiateMarkdown 未导出');
    process.exit(1);
  }

  // ── 断言器自检：必须先证明它能失败，再信它的结论 ──
  const selfChecks = [
    ['好样本必通过', judge(negotiateMarkdown, 'text/markdown', true) === true],
    ['坏样本必失败', judge(negotiateMarkdown, 'text/markdown', false) === false],
    ['空值必失败', judge(negotiateMarkdown, '', true) === false],
  ];
  const selfBad = selfChecks.filter(c => !c[1]);
  console.log('--- 断言器自检 ---');
  for (const [l, ok] of selfChecks) console.log('  ' + (ok ? 'PASS' : 'FAIL') + '  ' + l);
  if (selfBad.length) {
    console.error('\n[validate-accept-negotiation] FAIL —— 自检未通过，断言器不可信');
    process.exit(1);
  }

  // ── 真实用例 ──
  let fail = 0, legacyWrong = 0;
  console.log('');
  for (const [accept, want, label] of CASES) {
    const got = negotiateMarkdown(accept);
    const ok = got === want;
    if (!ok) fail++;
    const l = legacy(accept);
    const legacyOk = l === want;
    if (!legacyOk) legacyWrong++;
    console.log(
      (ok ? '  PASS' : '  FAIL') + '  ' + label.padEnd(28) +
      '  Accept=' + JSON.stringify(accept).padEnd(44) +
      '  want=' + String(want).padEnd(5) + ' got=' + String(got).padEnd(5) +
      (legacyOk ? '' : '   [旧实现给 ' + l + ' ✗]')
    );
  }

  console.log('');
  console.log('=== Accept 内容协商 ===');
  console.log('  用例          : ' + CASES.length);
  console.log('  通过          : ' + (CASES.length - fail));
  console.log('  旧实现会错    : ' + legacyWrong + ' 条（反证修复必要）');

  if (legacyWrong === 0) {
    console.log('');
    console.log('[validate-accept-negotiation] FAIL —— 反证失败：旧实现在所有用例上都正确，');
    console.log('  说明用例表没覆盖到 q 值缺陷，门禁形同虚设。');
    process.exit(1);
  }
  if (fail) {
    console.log('');
    console.log('[validate-accept-negotiation] FAIL —— ' + fail + ' 个用例不符 RFC 7231');
    process.exit(1);
  }
  console.log('');
  console.log('[validate-accept-negotiation] PASS');
})();
