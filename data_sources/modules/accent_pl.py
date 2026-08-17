#!/usr/bin/env python3
"""PL 站波兰语缺变音批量修复(词表来自 context/pl-dict.md, 不依赖 pyspellchecker)。
用法:
  python3 accent_pl.py SCAN     # 只扫描, 打印缺变音词清单(不写入)
  python3 accent_pl.py WRITE    # 应用修复(危险, 先 SCAN 确认)
"""
import re, glob, sys
from collections import Counter

BASE = 'C:/Users/wowoh/wowohcool.com'
DICT_PATH = 'C:/Users/wowoh/seomachine/context/pl-dict.md'

# 词边界字符: ASCII 字母 + 拉丁扩展(含波兰 ą ć ę ł ń ó ś ź ż)
LETTER = 'A-Za-zÀ-ž'


def load_map():
    """从 pl-dict.md 解析「缺变音 → 正确」词表。"""
    m = {}
    with open(DICT_PATH, encoding='utf-8') as f:
        for line in f:
            s = line.strip()
            if not s.startswith('|'):
                continue
            cells = [c.strip() for c in s.strip('|').split('|')]
            if len(cells) != 2:
                continue
            src, dst = cells
            if src == '词' or not src.isalpha() or not dst.isalpha():
                continue  # 表头 / 分隔线 / 含空格的说明行
            if src != dst:
                m[src] = dst
    return m


PL_MAP = load_map()


def make_pattern():
    return re.compile(
        r'(?<![' + LETTER + r'])(' + '|'.join(re.escape(w) for w in PL_MAP) + r')(?![' + LETTER + r'])',
        re.IGNORECASE,
    )


def apply_fix(m):
    w = m.group(0)
    fix = PL_MAP.get(w.lower())
    if fix is None:
        return w
    # 保留首字母大小写
    if w[0].isupper() and fix[0].islower():
        return fix[0].upper() + fix[1:]
    return fix


# 保护片段(按序 alternation): 只改正文可见文本, URL/slug/HTML 实体/图片名等 ASCII 技术标识一律保护
PROTECT_PARTS = [
    r'<script.*?</script>',                                                       # JSON-LD / 脚本块
    r'<style.*?</style>',                                                         # 样式块
    r'<!--.*?-->',                                                                # HTML 注释
    r'\{%.*?%\}',                                                                 # Nunjucks {%...%}
    r'\{\{.*?\}\}',                                                               # Nunjucks {{...}}
    r'&(?:[a-zA-Z][a-zA-Z0-9]*|#[0-9]+|#x[0-9A-Fa-f]+);',                         # HTML 实体
    r'(?:id|href|src|srcset|class|style|action|formaction|poster)="[^"]*"',        # HTML 属性(alt/title 可见文本不保护)
    r'(?:^|\n)(?:canonical|enPath|dePath|esPath|frPath|ruPath|plPath|ogImage):\s*"[^"]*"',  # frontmatter 路径
    r'(?:^|\n)\s*(?:en|de|es|fr|ru|pl):\s*"[^"]*"',                                # hreflang 语言键
    r'(?:https?|ftp)://[^\s"\'<>]+',                                              # 绝对 URL
    r'(?:mailto|tel):[^\s"\'<>]+',                                                # 邮件/电话链接
    r'/[A-Za-z0-9/_.-]+\.(?:webp|jpe?g|png|svg|gif|avif|ico|json|njk)',            # 图片/文件路径(含扩展名)
    r'/[A-Za-z0-9][A-Za-z0-9/_.-]*/',                                              # 相对 URL/目录路径(以 / 结尾)
]
PROTECT_PAT = re.compile('|'.join(PROTECT_PARTS), re.DOTALL | re.IGNORECASE)


def process_file(path):
    """返回 (original, fixed, counts)。counts 只在受保护后的正文上统计, 不含 URL/slug。"""
    with open(path, encoding='utf-8') as f:
        original = f.read()

    protected = []

    def prot(m):
        protected.append(m.group(0))
        return f'@@P{len(protected) - 1}@@'

    c = PROTECT_PAT.sub(prot, original)

    pat = make_pattern()
    counts = Counter()
    for m in pat.finditer(c):
        w = m.group(0).lower()
        if w in PL_MAP:
            counts[w] += 1

    c = pat.sub(apply_fix, c)
    for i, s in enumerate(protected):
        c = c.replace(f'@@P{i}@@', s)

    return original, c, counts


def main():
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    mode = sys.argv[1].upper()
    total_words = Counter()
    total_files = 0

    for path in glob.glob(f'{BASE}/src/pl/blog/*/index.njk'):
        original, fixed, counts = process_file(path)
        if fixed == original:
            continue
        total_words.update(counts)
        if mode == 'WRITE':
            with open(path, 'w', encoding='utf-8') as f:
                f.write(fixed)
            total_files += 1

    total = sum(total_words.values())
    print(f'PL 站: {len(total_words)} 个词, 合计 {total} 处')
    for w, n in total_words.most_common(50):
        print(f'  {w} → {PL_MAP[w]}: {n}')
    if mode == 'WRITE':
        print(f'\n批量完成: 修改了 {total_files} 个文件')
    else:
        print(f'\n>>> 未写入。确认无误后运行 WRITE。')


if __name__ == '__main__':
    main()
