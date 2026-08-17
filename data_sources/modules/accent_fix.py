#!/usr/bin/env python3
"""一次性: 修复站点非英文文章的缺重音/变音问题。
用法:
  python3 accent_fix.py TEST <file>     # 单文件测试, 打印 diff
  python3 accent_fix.py BATCH            # 全量批量修复
安全: 用 (?<![-\w])...(?![-\w]) 排除 slug/URL/id(前后是连字符或单词字符)。
"""
import re, glob, sys, difflib

REPLACEMENTS = {
    'fr': {
        'conformite': 'conformité', 'qualite': 'qualité', 'qualites': 'qualités', 'delai': 'délai', 'delais': 'délais',
        'capacite': 'capacité', 'capacites': 'capacités', 'frequence': 'fréquence', 'frequences': 'fréquences',
        'difference': 'différence', 'differences': 'différences',
        'securite': 'sécurité', 'reglement': 'règlement', 'reglements': 'règlements', 'efficacite': 'efficacité',
        'systeme': 'système', 'systemes': 'systèmes', 'cout': 'coût', 'couts': 'coûts',
        'generation': 'génération', 'generations': 'générations',
        'certifie': 'certifié', 'certifies': 'certifiés', 'certifiee': 'certifiée', 'certifiees': 'certifiées',
        'marche': 'marché', 'marches': 'marchés',
        'verifier': 'vérifier', 'etape': 'étape', 'etapes': 'étapes',
        'authenticite': 'authenticité', 'agree': 'agréé', 'meme': 'même',
        'contrefacon': 'contrefaçon', 'reglementaire': 'réglementaire',
        'reference': 'référence', 'references': 'références',
        'boitier': 'boîtier', 'modele': 'modèle', 'modeles': 'modèles',
        'temperature': 'température', 'penalite': 'pénalité', 'defaut': 'défaut',
        'echantillon': 'échantillon', 'echantillons': 'échantillons',
        'fevrier': 'février', 'negocier': 'négocier', 'integral': 'intégral',
        'numero': 'numéro', 'numeros': 'numéros', 'premiere': 'première',
        'reglementation': 'réglementation', 'specification': 'spécification', 'specifications': 'spécifications',
        'declaration': 'déclaration', 'declarations': 'déclarations', 'declarer': 'déclarer',
        'necessite': 'nécessite', 'differencie': 'différencié',
        'specifique': 'spécifique', 'specifiques': 'spécifiques', 'penetration': 'pénétration',
        'donnees': 'données', 'electrolyte': 'électrolyte', 'electrolytes': 'électrolytes',
        'densite': 'densité', 'verifications': 'vérifications', 'melange': 'mélange',
        'reglage': 'réglage', 'mesuree': 'mesurée', 'ete': 'été', 'seche': 'sèche',
        'demasque': 'démasqué', 'supplementaire': 'supplémentaire', 'energetique': 'énergétique',
        'polymere': 'polymère', 'polymeres': 'polymères',
    },
    'es': {
        'certificacion': 'certificación', 'fabricacion': 'fabricación',
        'comparacion': 'comparación', 'especificacion': 'especificación',
    },
    'de': {
        'ladegerat': 'Ladegerät', 'ladegerate': 'Ladegeräte',
    },
}

BASE_DIR = 'C:/Users/wowoh/wowohcool.com'
LANG_DIRS = {'fr': f'{BASE_DIR}/src/fr', 'es': f'{BASE_DIR}/src/es', 'de': f'{BASE_DIR}/src/de'}


def build_fixer(repl):
    words = list(repl.keys())
    pat = re.compile(r'(?<![-\w])(' + '|'.join(re.escape(w) for w in words) + r')(?![-\w])', re.IGNORECASE)

    def fix(m):
        w = m.group(0)
        lower = w.lower()
        for k, v in repl.items():
            if k == lower:
                if w[0].isupper():
                    return v[0].upper() + v[1:]
                return v
        return w

    return pat, fix


def process_file(path, lang):
    repl = REPLACEMENTS[lang]
    pat, fix = build_fixer(repl)
    with open(path, encoding='utf-8') as f:
        original = f.read()

    # 保护 HTML 属性(id="..." href="#..."), 这些是技术标识符, 必须保持 ASCII
    protected = []

    def protect(m):
        protected.append(m.group(0))
        return f'@@PROTECT{len(protected) - 1}@@'

    content = re.sub(r'id="[^"]*"', protect, original)
    content = re.sub(r'href="#[^"]*"', protect, content)

    # 修复重音
    content = pat.sub(fix, content)

    # 恢复受保护的属性
    for i, s in enumerate(protected):
        content = content.replace(f'@@PROTECT{i}@@', s)

    return original, content


def main():
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    mode = sys.argv[1].upper()
    if mode == 'TEST':
        path = sys.argv[2]
        m = re.search(r'/src/(fr|es|de|pl|ru)/', path.replace('\\', '/'))
        lang = m.group(1) if m else None
        original, fixed = process_file(path, lang)
        diff = list(difflib.unified_diff(
            original.splitlines(), fixed.splitlines(),
            fromfile='before', tofile='after', lineterm=''
        ))
        print(f'=== {path}: {len(diff)} 行 diff ===')
        for line in diff:
            if line.startswith(('+', '-')) and not line.startswith(('+++', '---')):
                print(line)
        if fixed == original:
            print('(无变化)')
        else:
            print('\n>>> 未写入。确认无误后运行 BATCH。')
    elif mode == 'BATCH':
        total = 0
        for lang, d in LANG_DIRS.items():
            for path in glob.glob(f'{d}/blog/*/index.njk'):
                original, fixed = process_file(path, lang)
                if fixed != original:
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(fixed)
                    total += 1
        print(f'批量完成: 修改了 {total} 个文件')


if __name__ == '__main__':
    main()
