#!/usr/bin/env python3
"""ES 站西班牙语缺重音批量修复(手动核心词表, 不依赖 pyspellchecker 西语词典)。
用法:
  python3 accent_es.py SCAN    # 只扫描
  python3 accent_es.py WRITE   # 应用修复
"""
import re, glob, sys
from collections import Counter

BASE = 'C:/Users/wowoh/wowohcool.com/src/es/blog/*/index.njk'

# 手动核心词表(无歧义西语词)
# 注意西语规则: -ción (单数带重音) → -ciones (复数无重音, 因为重音音节移位)
#           -sión → -siones 同样规则
# 所以复数 certificaciones/condiciones/versiones 本就无重音, 不列入
ES_MAP = {
    # -ción 后缀单数(复数会自动无重音, 正确保留)
    'certificacion': 'certificación',
    'fabricacion': 'fabricación', 'produccion': 'producción',
    'importacion': 'importación',
    'exportacion': 'exportación', 'inspeccion': 'inspección',
    'verificacion': 'verificación', 'informacion': 'información',
    'documentacion': 'documentación', 'especificacion': 'especificación',
    'comparacion': 'comparación',
    'medicion': 'medición', 'edicion': 'edición', 'seleccion': 'selección',
    'proteccion': 'protección', 'construccion': 'construcción',
    'validacion': 'validación', 'aceptacion': 'aceptación',
    'aplicacion': 'aplicación', 'evaluacion': 'evaluación',
    'facturacion': 'facturación', 'distribucion': 'distribución',
    'automatizacion': 'automatización', 'personalizacion': 'personalización',
    'cotizacion': 'cotización', 'operacion': 'operación',
    'condicion': 'condición', 'regulacion': 'regulación',
    'combinacion': 'combinación',
    'colocacion': 'colocación', 'gestion': 'gestión',
    'seccion': 'sección', 'reduccion': 'reducción',
    'transmision': 'transmisión', 'expansion': 'expansión',
    'conexion': 'conexión',
    'emision': 'emisión',
    'presion': 'presión', 'tension': 'tensión',
    'discusion': 'discusión', 'conclusion': 'conclusión',
    'decision': 'decisión',
    'union': 'unión', 'version': 'versión',
    'conversion': 'conversión',
    'aviacion': 'aviación', 'autenticacion': 'autenticación',
    'amortiguacion': 'amortiguación', 'elaboracion': 'elaboración',
    'duracion': 'duración', 'institucion': 'institución',
    'precision': 'precisión',
    # 常用名词(-a/-o/-í 结尾, 复数用 -as/-os/-ías, 重音跟着走, 所以要都修)
    'fabrica': 'fábrica', 'fabricas': 'fábricas',
    'bateria': 'batería', 'baterias': 'baterías',
    'guia': 'guía', 'guias': 'guías',
    'envio': 'envío', 'envios': 'envíos',
    'codigo': 'código', 'codigos': 'códigos',
    'numero': 'número', 'numeros': 'números',
    'indice': 'índice', 'indices': 'índices',
    'metodo': 'método', 'metodos': 'métodos',
    'articulo': 'artículo', 'articulos': 'artículos',
    'catalogo': 'catálogo', 'catalogos': 'catálogos',
    'diametro': 'diámetro', 'termino': 'término', 'terminos': 'términos',
    'trafico': 'tráfico', 'grafico': 'gráfico', 'grafica': 'gráfica',
    'analisis': 'análisis', 'sintesis': 'síntesis',
    'formula': 'fórmula', 'formulas': 'fórmulas',
    'canton': 'cantón', 'exito': 'éxito', 'almacen': 'almacén',
    'proposito': 'propósito', 'caida': 'caída',
    'diseno': 'diseño', 'disenos': 'diseños',
    'omnibus': 'ómnibus', 'estadia': 'estadía',
    'latin': 'latín', 'modulo': 'módulo', 'modulos': 'módulos',
    'mayoria': 'mayoría', 'sintomas': 'síntomas',
    'sinonimo': 'sinónimo', 'angulo': 'ángulo', 'angulos': 'ángulos',
    'via': 'vía', 'vias': 'vías', 'dia': 'día', 'dias': 'días',
    'america': 'América', 'espana': 'España',
    'espanol': 'español', 'espanola': 'española',
    # 形容词/副词(西语形容词复数重音跟着走, 单复数都要修)
    'especifica': 'específica', 'especifico': 'específico',
    'especificos': 'específicos', 'especificas': 'específicas',
    'unica': 'única', 'unico': 'único', 'unicos': 'únicos', 'unicas': 'únicas',
    'facil': 'fácil', 'faciles': 'fáciles',
    'dificil': 'difícil', 'dificiles': 'difíciles',
    'rapido': 'rápido', 'rapida': 'rápida',
    'rapidos': 'rápidos', 'rapidas': 'rápidas', 'rapidamente': 'rápidamente',
    'tecnico': 'técnico', 'tecnica': 'técnica',
    'tecnicos': 'técnicos', 'tecnicas': 'técnicas',
    'economico': 'económico', 'economica': 'económica',
    'economicos': 'económicos',
    'electronico': 'electrónico', 'electronica': 'electrónica',
    'electronicos': 'electrónicos', 'electronicas': 'electrónicas',
    'practico': 'práctico', 'practica': 'práctica',
    'basico': 'básico', 'basica': 'básica',
    'critico': 'crítico', 'critica': 'crítica',
    'automatico': 'automático', 'automatica': 'automática',
    'maritimo': 'marítimo', 'maritima': 'marítima',
    'aereo': 'aéreo', 'aerea': 'aérea',
    'ultima': 'última', 'ultimo': 'último',
    'ultimos': 'últimos', 'ultimas': 'últimas',
    'proximo': 'próximo', 'proxima': 'próxima',
    'debil': 'débil', 'debiles': 'débiles',
    'inalambrica': 'inalámbrica', 'inalambrico': 'inalámbrico',
    'retractil': 'retráctil', 'hidraulica': 'hidráulica',
    'fotografico': 'fotográfico', 'fisicamente': 'físicamente',
    'invalida': 'inválida',
    # 「comun/común」歧义: 单数 común 有重音, 但常见错误保留
    'comun': 'común',
    'termica': 'térmica', 'termico': 'térmico',
    'calida': 'cálida', 'metrica': 'métrica',
    # 副词/连词
    'aqui': 'aquí', 'alli': 'allí', 'asi': 'así',
    'ademas': 'además', 'traves': 'través',
    'despues': 'después', 'segun': 'según', 'aun': 'aún',
    'super': 'súper',
}


def make_pattern():
    return re.compile(r'(?<![A-Za-zÀ-ÿ])(' + '|'.join(re.escape(w) for w in ES_MAP) + r')(?![A-Za-zÀ-ÿ])', re.IGNORECASE)


def apply_fix(m, protected_ctx=''):
    w = m.group(0)
    fix = ES_MAP.get(w.lower())
    if fix is None:
        return w
    # 保留首字母大小写
    if w[0].isupper() and fix[0].islower():
        return fix[0].upper() + fix[1:]
    return fix


def process_file(path):
    with open(path, encoding='utf-8') as f:
        original = f.read()
    # 保护 HTML 属性(id/href/src/srcset/URL) + frontmatter path 字段
    protected = []

    def prot(m):
        protected.append(m.group(0))
        return f'@@P{len(protected) - 1}@@'

    # 单次 pass: 用 alternation 一次性匹配所有需保护片段, 避免嵌套占位符 bug
    # 优先级: 大结构先(Nunjucks/属性/整行路径), 小片段后(URL/纯路径)
    protect_pat = re.compile(
        r'\{%.*?%\}'                                                                # Nunjucks {%...%}
        r'|\{\{.*?\}\}'                                                             # Nunjucks {{...}}
        r'|(?:id|href|src|srcset)="[^"]*"'                                           # HTML 属性(alt/title 是可见文本, 不保护)
        r'|(?:^|\n)(?:canonical|enPath|dePath|esPath|frPath|ruPath|plPath|ogImage):\s*"[^"]*"'  # frontmatter 路径字段
        r'|(?:^|\n)\s*(?:en|de|es|fr|ru|pl):\s*"[^"]*"'                              # hreflang 语言键
        r'|https?://[^\s"\'<>]+'                                                     # URL
        r'|/[a-z0-9/_.-]+\.(?:webp|jpg|png|json|njk)',                               # 本地文件路径
        flags=re.DOTALL | re.IGNORECASE
    )
    c = protect_pat.sub(prot, original)

    pat = make_pattern()
    c = pat.sub(apply_fix, c)

    for i, s in enumerate(protected):
        c = c.replace(f'@@P{i}@@', s)

    return original, c


def main():
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    mode = sys.argv[1].upper()
    total_words = Counter()
    total_files = 0

    for path in glob.glob(BASE):
        original, fixed = process_file(path)
        if fixed == original:
            continue

        # 统计词
        pat = make_pattern()
        for m in pat.finditer(original):
            w = m.group(0).lower()
            if w in ES_MAP:
                total_words[w] += 1

        if mode == 'WRITE':
            with open(path, 'w', encoding='utf-8') as f:
                f.write(fixed)
            total_files += 1

    total = sum(total_words.values())
    print(f'ES 站: {len(total_words)} 个词, 合计 {total} 处')
    for w, n in total_words.most_common(30):
        print(f'  {w} → {ES_MAP[w]}: {n}')
    if mode == 'WRITE':
        print(f'\n批量完成: 修改了 {total_files} 个文件')
    else:
        print(f'\n>>> 未写入。确认无误后运行 WRITE。')


if __name__ == '__main__':
    main()
