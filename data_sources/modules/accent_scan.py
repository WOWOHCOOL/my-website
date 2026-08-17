#!/usr/bin/env python3
"""扫描站点非英文文章的缺重音词(用 pyspellchecker 字典 + 重音变体枚举, 快)。
用法:
  python3 accent_scan.py SCAN       # 只扫描, 打印缺重音词清单(不写入)
  python3 accent_scan.py WRITE      # 应用修复(危险, 先 SCAN 确认)
"""
import re, glob, sys, unicodedata
from collections import Counter

from spellchecker import SpellChecker

BASE = 'C:/Users/wowoh/wowohcool.com'
LANG_DIRS = {'fr': f'{BASE}/src/fr', 'es': f'{BASE}/src/es', 'de': f'{BASE}/src/de'}

# 各语言重音映射(按语言区分, 避免跨语言误报)
LANG_ACCENTS = {
    'fr': {'a': 'àâä', 'e': 'éèêë', 'i': 'îï', 'o': 'ôö', 'u': 'ùûü', 'c': 'ç'},
    'es': {'a': 'á', 'e': 'é', 'i': 'í', 'o': 'ó', 'u': 'ú', 'n': 'ñ'},
    'de': {'a': 'ä', 'o': 'ö', 'u': 'ü'},
}

# 误报排除(英文技术词/缩写/专有名词, 不应加变音)
EXCLUSIONS = {
    'fr': set(),  # 法语词典可靠, 无排除
    'es': set(),  # ES 整体跳过(见 main)
    'de': {'mah', 'range', 'tuv', 'marker', 'sale', 'bundle', 'sae', 'falltest', 'regular'},
}


def strip_acc(s):
    return ''.join(c for c in unicodedata.normalize('NFD', s) if unicodedata.category(c) != 'Mn')


def accent_variants(word, lang):
    """生成所有单字符加重音的变体。"""
    accents = LANG_ACCENTS[lang]
    variants = []
    for i, ch in enumerate(word):
        for acc in accents.get(ch, ''):
            variants.append(word[:i] + acc + word[i + 1:])
    return variants


# 德语 ae/oe/ue/ss → ä/ö/ü/ß 转写规则（slug/URL 用转写，正文应用变音符号）
DE_TRANSLIT = [('ae', 'ä'), ('oe', 'ö'), ('ue', 'ü'), ('ss', 'ß')]


def translit_variants(word, lang):
    """生成 ae/oe/ue/ss → ä/ö/ü/ß 的转写变体（仅德语）。"""
    if lang != 'de':
        return []
    variants = []
    for src, dst in DE_TRANSLIT:
        if src in word:
            variants.append(word.replace(src, dst))
    return variants


def build_replacement_map(lang):
    spell = SpellChecker(language=lang)
    files = glob.glob(f'{LANG_DIRS[lang]}/blog/*/index.njk')
    found = {}  # lower_word -> (fixed_word, count)
    for f in files:
        c = open(f, encoding='utf-8').read()
        # 去掉 HTML 属性 + 前端 URL + schema script(正文 FAQ 已有)
        c = re.sub(r'<script.*?</script>', '', c, flags=re.DOTALL)
        c = re.sub(r'(id|href|src)="[^"]*"', '', c)
        c = re.sub(r'(canonical|enPath|dePath|esPath|frPath|ruPath|plPath|ogImage):\s*[^\n]*', '', c)
        c = re.sub(r'(?:^|\n)\s*(?:en|de|es|fr|ru|pl):\s*"[^"]*"', '', c)  # hreflang 语言键(slug 保持 ASCII)
        words = set(re.findall(r'[A-Za-zÀ-ÿ]+', c))
        for w in words:
            wl = w.lower()
            if len(wl) < 3 or wl in spell:
                continue
            if wl in EXCLUSIONS[lang]:
                continue
            # 枚举重音变体, 找唯一命中的(存储小写, 大小写由写入时按出现保留)
            known = [v for v in accent_variants(wl, lang) if v in spell]
            known += [v for v in translit_variants(wl, lang) if v in spell]
            known = list(dict.fromkeys(known))  # 去重(单字符变体与转写变体可能重叠)
            if len(known) == 1:
                found[wl] = (known[0], found.get(wl, (known[0], 0))[1] + 1)
    return found


def main():
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    mode = sys.argv[1].upper()
    for lang in ['fr', 'es', 'de']:
        if mode == 'WRITE' and lang == 'es':
            continue  # 西语词典不可靠, 跳过自动修复(用之前手动修的 4 词)
        found = build_replacement_map(lang)
        total = sum(n for _, n in found.values())
        print(f'=== {lang} 站: {len(found)} 个缺重音词, 合计 {total} 处 ===')
        for w, (fix, n) in sorted(found.items(), key=lambda x: -x[1][1]):
            print(f'  {w} → {fix}: {n}')
        print()
        if mode == 'WRITE':
            # 应用修复
            pattern = re.compile(
                r'(?<![-\w])(' + '|'.join(re.escape(w) for w in found) + r')(?![-\w])',
                re.IGNORECASE
            )
            for f in glob.glob(f'{LANG_DIRS[lang]}/blog/*/index.njk'):
                c = open(f, encoding='utf-8').read()
                protected = []

                def prot(m):
                    protected.append(m.group(0))
                    return f'@@P{len(protected) - 1}@@'

                c = re.sub(r'(id|href)="[^"]*"', prot, c)

                def apply_fix(m):
                    w = m.group(0)
                    fix = found.get(w.lower(), (None, 0))[0]
                    if fix is None:
                        return w
                    if w[0].isupper() and fix[0].islower():
                        return fix[0].upper() + fix[1:]
                    if w[0].islower() and fix[0].isupper():
                        return fix[0].lower() + fix[1:]
                    return fix

                c = pattern.sub(apply_fix, c)
                for i, s in enumerate(protected):
                    c = c.replace(f'@@P{i}@@', s)
                open(f, 'w', encoding='utf-8').write(c)
        print()


if __name__ == '__main__':
    main()
