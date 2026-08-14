#!/usr/bin/env node
/**
 * lint-i18n-paths.js — Detect English path words in non-English content.
 *
 * Scans DE/ES/FR/RU source files for href/url values that contain
 * English page/product slugs instead of their localized equivalents.
 *
 * Usage:
 *   node scripts/lint-i18n-paths.js           # check all non-EN files
 *   node scripts/lint-i18n-paths.js --fix     # auto-fix when unambiguous
 *
 * Exit code: 1 if violations found, 0 if clean.
 */

const fs = require("fs");
const path = require("path");

// ── Mapping: English path word → per-language correct path ──────────────
// Only entries where the EN word DIFFERS from the localized word.
// "faq" and "blog" are universal — not included.
const PAGE_MAP = {
  about:          { de: "ueber-uns",        es: "sobre-nosotros",      fr: "a-propos",            ru: "o-kompanii",               pl: "o-nas" },
  contact:        { de: "kontakt",          es: "contacto",            /* fr: same */             ru: "kontakty",                 pl: "kontakt" },
  service:        { de: "oem-odm-service",  es: "servicio-oem-odm",    fr: "service-oem-odm",    ru: "oem-odm-uslugi",           pl: "uslugi-oem-odm" },
  "case-studies": { de: "fallbeispiele",    es: "casos-de-exito",      fr: "fallbeispiele",      ru: "keysy",                    pl: "studia-przypadkow" },
  "terms-of-service": { de: "agb",          es: "terminos-condiciones", fr: "cgv",               ru: "usloviya-ispolzovaniya",   pl: "regulamin" },
  "privacy-policy":  { de: "datenschutz",   es: "politica-privacidad", fr: "confidentialite",   ru: "politika-konfidencialnosti", pl: "polityka-prywatnosci" },
  "thank-you":    { de: "danke",            es: "gracias",              fr: "remerciments",       ru: "spasibo",                  pl: "dziekujemy" },
};

const PRODUCT_MAP = {
  "power-bank":       { de: "powerbank",              es: "powerbank",               fr: "batterie-externe",          ru: "poverbanki",               pl: "power-bank" },
  "wireless-charger": { de: "kabelloses-ladegeraet",  es: "cargador-inalambrico",    fr: "chargeur-sans-fil",         ru: "besprovodnye-zaryadki",     pl: "ladowarka-bezprzewodowa" },
  "gan-charger":      { de: "gan-ladegeraet",         es: "cargador-gan",            fr: "chargeur-gan",             ru: "gan-zaryadnye-ustroystva",  pl: "ladowarka-gan" },
  "car-charger":      { de: "autoladegeraet",         es: "cargador-coche",          fr: "chargeur-voiture",         ru: "avtomobilnye-zaryadki",     pl: "ladowarka-samochodowa" },
};

const PRODUCT_SUB_MAP = {
  "semi-solid-state":     { de: "halbfest-akku",        es: "semi-solido",              fr: "semi-solide",                  ru: "polutverdotelnyy" },
  "wireless-magnetic":    { de: "magnetisch-kabellos",  es: "magnetico-inalambrico",    fr: "magnetique-sans-fil",          ru: "magnitnyy-besprovodnoy" },
  "heating-battery":      { de: "heizakku",             es: "bateria-calefactora",      fr: "batterie-chauffante",          ru: "greyushchaya-batareya" },
  "2-in-1-hybrid":        { de: "2-in-1-hybrid",       es: "2-en-1-hibrido",           fr: "hybride-2-en-1",              ru: "gibrid-2-v-1" },
  "laptop-power":         { de: "laptop-powerbank",     es: "portatil",                 fr: "batterie-externe-ordinateur-portable", ru: "dlya-noutbukov" },
  "smart-display":        { de: "smart-display",        es: "pantalla-inteligente",     fr: "affichage-intelligent",        ru: "smart-displey" },
  "desktop":              { de: "desktop",              es: "escritorio",               fr: "bureau",                      ru: "nastolnaya" },
  "3-in-1-station":       { de: "3-in-1-station",       es: "estacion-3-en-1",          fr: "station-3-en-1",             ru: "stanciya-3-v-1" },
  "car-mount":            { de: "auto-ladehalterung",   es: "soporte-coche",            fr: "support-voiture",            ru: "avtoderzhatel" },
};

// DE ae/oe/ue/ss 转写词表（正文应改变音符号，slug 保持 ASCII）
const DE_TRANSLIT = {
"abschliessen": "abschließen",
"abwaertskompatibel": "abwärtskompatibel",
"aenderung": "änderung",
"aenderungen": "änderungen",
"alugehaeuse": "alugehäuse",
"anschluesse": "anschlüsse",
"arbeitsplaetze": "arbeitsplätze",
"auftragsbestaetigung": "auftragsbestätigung",
"ausgaenge": "ausgänge",
"ausgaengen": "ausgängen",
"aussenseite": "außenseite",
"ausserdem": "außerdem",
"ausserhalb": "außerhalb",
"baugrösse": "baugröße",
"begrüsst": "begrüßt",
"beguenstigt": "begünstigt",
"behoerde": "behörde",
"behoerden": "behörden",
"benoetigen": "benötigen",
"benoetigt": "benötigt",
"beschaeftigten": "beschäftigten",
"bestaetigen": "bestätigen",
"bestaetigt": "bestätigt",
"blosses": "bloßes",
"buero": "büro",
"bussgeld": "bußgeld",
"bussgelder": "bußgelder",
"durchfuehren": "durchführen",
"eigenstaendige": "eigenständige",
"einschliesslich": "einschließlich",
"einzelstueck": "einzelstück",
"entfaellt": "entfällt",
"erfuellt": "erfüllt",
"europaeischen": "europäischen",
"europaeisches": "europäisches",
"exportlaender": "exportländer",
"faehige": "fähige",
"faehigkeit": "fähigkeit",
"firmengrösse": "firmengröße",
"flughaefen": "flughäfen",
"fruehe": "frühe",
"fruehjahr": "frühjahr",
"fuehren": "führen",
"fuehrender": "führender",
"fuenf": "fünf",
"fuer": "für",
"gebuehr": "gebühr",
"gebuehren": "gebühren",
"gefaelscht": "gefälscht",
"gegenmassnahmen": "gegenmaßnahmen",
"gehaeuse": "gehäuse",
"gehoert": "gehört",
"gekuehlte": "gekühlte",
"gemäss": "gemäß",
"geprueft": "geprüft",
"gepruefte": "geprüfte",
"geprueften": "geprüften",
"geraet": "gerät",
"geraete": "geräte",
"geschaeftsreisen": "geschäftsreisen",
"geschaetzt": "geschätzt",
"gleichmässig": "gleichmäßig",
"gross": "groß",
"grossaufträge": "großaufträge",
"grosse": "große",
"grosskunden": "großkunden",
"gruen": "grün",
"gruenem": "grünem",
"grösse": "größe",
"grösser": "größer",
"grössere": "größere",
"grösste": "größte",
"grössten": "größten",
"gueltig": "gültig",
"gueltigen": "gültigen",
"gueltigkeit": "gültigkeit",
"gueltigkeitsbereich": "gültigkeitsbereich",
"haelfte": "hälfte",
"haelt": "hält",
"haeufig": "häufig",
"haeufige": "häufige",
"haeufigste": "häufigste",
"haeufigsten": "häufigsten",
"handgepaeck": "handgepäck",
"heiss": "heiß",
"heisst": "heißt",
"hoechster": "höchster",
"hoechstes": "höchstes",
"hoehere": "höhere",
"hoeherer": "höherer",
"integritaet": "integrität",
"juengsten": "jüngsten",
"kabellaenge": "kabellänge",
"kaeufer": "käufer",
"kapazitaet": "kapazität",
"koennen": "können",
"kompatibilitaet": "kompatibilität",
"konformitaet": "konformität",
"kopfhoerer": "kopfhörer",
"kuehler": "kühler",
"kuehlt": "kühlt",
"kuehlung": "kühlung",
"ladeflaeche": "ladefläche",
"ladegeraet": "ladegerät",
"ladegeraete": "ladegeräte",
"ladegeraeten": "ladegeräten",
"laedt": "lädt",
"laender": "länder",
"laesst": "lässt",
"laeuft": "läuft",
"loesung": "lösung",
"luecke": "lücke",
"luefter": "lüfter",
"maerz": "märz",
"massstab": "maßstab",
"moeglich": "möglich",
"muessen": "müssen",
"muetze": "mütze",
"nennkapazitaet": "nennkapazität",
"noetig": "nötig",
"oberflaeche": "oberfläche",
"oesterreich": "österreich",
"ordnungsgemässe": "ordnungsgemäße",
"persoenliche": "persönliche",
"ploetzlich": "plötzlich",
"praezision": "präzision",
"preisguenstig": "preisgünstig",
"produktionsstaette": "produktionsstätte",
"produktqualitaet": "produktqualität",
"proprietaere": "proprietäre",
"pruefbescheinigung": "prüfbescheinigung",
"pruefen": "prüfen",
"pruefliste": "prüfliste",
"pruefpunkt": "prüfpunkt",
"prueft": "prüft",
"pruefung": "prüfung",
"puenktliche": "pünktliche",
"qualitaet": "qualität",
"qualitaetskontrolle": "qualitätskontrolle",
"qualitaetssicherung": "qualitätssicherung",
"quarantaene": "quarantäne",
"rahmenvertraege": "rahmenverträge",
"realitaet": "realität",
"regelmässige": "regelmäßige",
"regelmässigen": "regelmäßigen",
"rueckruf": "rückruf",
"ruesten": "rüsten",
"saemtliche": "sämtliche",
"schaetzung": "schätzung",
"schliessen": "schließen",
"schutzmassnahmen": "schutzmaßnahmen",
"serioeser": "seriöser",
"staender": "ständer",
"staerkster": "stärkster",
"standardmässig": "standardmäßig",
"strasse": "straße",
"strassen": "straßen",
"stueck": "stück",
"stueckliste": "stückliste",
"taeglich": "täglich",
"tatsaechlich": "tatsächlich",
"traeger": "träger",
"tuev": "tüv",
"ueber": "über",
"uebereinkommen": "übereinkommen",
"uebereinstimmen": "übereinstimmen",
"uebereinstimmung": "übereinstimmung",
"ueberhitzung": "überhitzung",
"ueberproportional": "überproportional",
"ueberpruefung": "überprüfung",
"ueberschreiten": "überschreiten",
"uebersicht": "übersicht",
"ueberwachung": "überwachung",
"unabhaengig": "unabhängig",
"unbeschaedigt": "unbeschädigt",
"ungewoehnlich": "ungewöhnlich",
"ungueltig": "ungültig",
"unserioesen": "unseriösen",
"unterstuetzen": "unterstützen",
"unveraendert": "unverändert",
"unveraendertem": "unverändertem",
"verfuegbar": "verfügbar",
"verfuegt": "verfügt",
"verfuegung": "verfügung",
"verkaeufe": "verkäufe",
"verkehrstraeger": "verkehrsträger",
"verliess": "verließ",
"verstössen": "verstößen",
"verzoegern": "verzögern",
"verzoegert": "verzögert",
"vollstaendig": "vollständig",
"vollstaendige": "vollständige",
"vollstaendiger": "vollständiger",
"vollstaendiges": "vollständiges",
"vollstaendigkeit": "vollständigkeit",
"waechst": "wächst",
"weiss": "weiß",
"zurueckgewiesen": "zurückgewiesen",
"zusaetzlich": "zusätzlich",
"zuverlaessigen": "zuverlässigen",
"übermässiger": "übermäßiger",
};

// ES 重音词表（正文应用，slug 用 ASCII）
const ES_ACCENT = {
  "aceptacion": "aceptación",
  "ademas": "además",
  "aerea": "aérea",
  "aereo": "aéreo",
  "alli": "allí",
  "almacen": "almacén",
  "america": "América",
  "amortiguacion": "amortiguación",
  "analisis": "análisis",
  "angulo": "ángulo",
  "angulos": "ángulos",
  "aplicacion": "aplicación",
  "aqui": "aquí",
  "articulo": "artículo",
  "articulos": "artículos",
  "asi": "así",
  "aun": "aún",
  "autenticacion": "autenticación",
  "automatica": "automática",
  "automatico": "automático",
  "automatizacion": "automatización",
  "aviacion": "aviación",
  "basica": "básica",
  "basico": "básico",
  "bateria": "batería",
  "baterias": "baterías",
  "caida": "caída",
  "calida": "cálida",
  "canton": "cantón",
  "catalogo": "catálogo",
  "catalogos": "catálogos",
  "certificacion": "certificación",
  "codigo": "código",
  "codigos": "códigos",
  "colocacion": "colocación",
  "combinacion": "combinación",
  "comparacion": "comparación",
  "comun": "común",
  "conclusion": "conclusión",
  "condicion": "condición",
  "conexion": "conexión",
  "construccion": "construcción",
  "conversion": "conversión",
  "cotizacion": "cotización",
  "critica": "crítica",
  "critico": "crítico",
  "debil": "débil",
  "debiles": "débiles",
  "decision": "decisión",
  "despues": "después",
  "dia": "día",
  "diametro": "diámetro",
  "dias": "días",
  "dificil": "difícil",
  "dificiles": "difíciles",
  "discusion": "discusión",
  "diseno": "diseño",
  "disenos": "diseños",
  "distribucion": "distribución",
  "documentacion": "documentación",
  "duracion": "duración",
  "economica": "económica",
  "economico": "económico",
  "economicos": "económicos",
  "edicion": "edición",
  "elaboracion": "elaboración",
  "electronica": "electrónica",
  "electronicas": "electrónicas",
  "electronico": "electrónico",
  "electronicos": "electrónicos",
  "emision": "emisión",
  "envio": "envío",
  "envios": "envíos",
  "espana": "España",
  "espanol": "español",
  "espanola": "española",
  "especifica": "específica",
  "especificacion": "especificación",
  "especificas": "específicas",
  "especifico": "específico",
  "especificos": "específicos",
  "estadia": "estadía",
  "evaluacion": "evaluación",
  "exito": "éxito",
  "expansion": "expansión",
  "exportacion": "exportación",
  "fabrica": "fábrica",
  "fabricacion": "fabricación",
  "fabricas": "fábricas",
  "facil": "fácil",
  "faciles": "fáciles",
  "facturacion": "facturación",
  "fisicamente": "físicamente",
  "formula": "fórmula",
  "formulas": "fórmulas",
  "fotografico": "fotográfico",
  "gestion": "gestión",
  "grafica": "gráfica",
  "grafico": "gráfico",
  "guia": "guía",
  "guias": "guías",
  "hidraulica": "hidráulica",
  "importacion": "importación",
  "inalambrica": "inalámbrica",
  "inalambrico": "inalámbrico",
  "indice": "índice",
  "indices": "índices",
  "informacion": "información",
  "inspeccion": "inspección",
  "institucion": "institución",
  "invalida": "inválida",
  "latin": "latín",
  "maritima": "marítima",
  "maritimo": "marítimo",
  "mayoria": "mayoría",
  "medicion": "medición",
  "metodo": "método",
  "metodos": "métodos",
  "metrica": "métrica",
  "modulo": "módulo",
  "modulos": "módulos",
  "numero": "número",
  "numeros": "números",
  "omnibus": "ómnibus",
  "operacion": "operación",
  "personalizacion": "personalización",
  "practica": "práctica",
  "practico": "práctico",
  "precision": "precisión",
  "presion": "presión",
  "produccion": "producción",
  "proposito": "propósito",
  "proteccion": "protección",
  "proxima": "próxima",
  "proximo": "próximo",
  "rapida": "rápida",
  "rapidamente": "rápidamente",
  "rapidas": "rápidas",
  "rapido": "rápido",
  "rapidos": "rápidos",
  "reduccion": "reducción",
  "regulacion": "regulación",
  "retractil": "retráctil",
  "seccion": "sección",
  "segun": "según",
  "seleccion": "selección",
  "sinonimo": "sinónimo",
  "sintesis": "síntesis",
  "sintomas": "síntomas",
  "super": "súper",
  "tecnica": "técnica",
  "tecnicas": "técnicas",
  "tecnico": "técnico",
  "tecnicos": "técnicos",
  "tension": "tensión",
  "termica": "térmica",
  "termico": "térmico",
  "termino": "término",
  "terminos": "términos",
  "trafico": "tráfico",
  "transmision": "transmisión",
  "traves": "través",
  "ultima": "última",
  "ultimas": "últimas",
  "ultimo": "último",
  "ultimos": "últimos",
  "unica": "única",
  "unicas": "únicas",
  "unico": "único",
  "unicos": "únicos",
  "union": "unión",
  "validacion": "validación",
  "verificacion": "verificación",
  "version": "versión",
  "via": "vía",
  "vias": "vías"
};

// 拉美→西班牙方言词表
const ES_LATAM = {
  "carro": "coche",
  "carros": "coches",
  "celular": "móvil",
  "celulares": "móviles",
  "computadora": "ordenador",
  "computadoras": "ordenadores",
  "lentes": "gafas",
  "platicar": "conversar",
  "refrigerador": "nevera"
};

// FR 重音词表（法语缺重音 → 正确重音）
const FR_TRANSLIT = {
  "acces": "accès",
  "activite": "activité",
  "actualite": "actualité",
  "adequation": "adéquation",
  "aerien": "aérien",
  "aerienne": "aérienne",
  "aeroport": "aéroport",
  "aeroports": "aéroports",
  "affectee": "affectée",
  "agree": "agrée",
  "annee": "année",
  "antiderapante": "antidérapante",
  "apercu": "aperçu",
  "appropriees": "appropriées",
  "arrete": "arrête",
  "aupres": "auprès",
  "automatisee": "automatisée",
  "automatisees": "automatisées",
  "autorite": "autorité",
  "axee": "axée",
  "barriere": "barrière",
  "basee": "basée",
  "basees": "basées",
  "boitier": "boîtier",
  "boitiers": "boîtiers",
  "brevetes": "brevetés",
  "cable": "câble",
  "cables": "câbles",
  "capacite": "capacité",
  "capacites": "capacités",
  "categories": "catégories",
  "ceder": "céder",
  "certifiee": "certifiée",
  "certifiees": "certifiées",
  "chaine": "chaîne",
  "chassis": "châssis",
  "ciblee": "ciblée",
  "cles": "clés",
  "collectees": "collectées",
  "compacite": "compacité",
  "compatibilite": "compatibilité",
  "competition": "compétition",
  "complete": "complète",
  "completer": "compléter",
  "completes": "complètes",
  "complexite": "complexité",
  "concretes": "concrètes",
  "concu": "conçu",
  "concus": "conçus",
  "confidentialite": "confidentialité",
  "conformement": "conformément",
  "conformite": "conformité",
  "consequence": "conséquence",
  "consequent": "conséquent",
  "controle": "contrôle",
  "controles": "contrôles",
  "contrôlee": "contrôlée",
  "coordonnees": "coordonnées",
  "coree": "corée",
  "cout": "coût",
  "coute": "coûte",
  "couts": "coûts",
  "creances": "créances",
  "creant": "créant",
  "createur": "créateur",
  "credit": "crédit",
  "cree": "crée",
  "creent": "créent",
  "crees": "crées",
  "debloquer": "débloquer",
  "debut": "début",
  "decennies": "décennies",
  "decharge": "décharge",
  "decide": "décide",
  "decider": "décider",
  "decisifs": "décisifs",
  "decision": "décision",
  "decisions": "décisions",
  "decisives": "décisives",
  "declaration": "déclaration",
  "decor": "décor",
  "decoulant": "découlant",
  "decoule": "découle",
  "decouverte": "découverte",
  "decouvrez": "découvrez",
  "decouvrir": "découvrir",
  "decrit": "décrit",
  "decrivez": "décrivez",
  "dedie": "dédie",
  "dedouane": "dédouane",
  "dedouanement": "dédouanement",
  "deduits": "déduits",
  "defaut": "défaut",
  "defauts": "défauts",
  "defectueux": "défectueux",
  "defi": "défi",
  "definition": "définition",
  "definitive": "définitive",
  "degressifs": "dégressifs",
  "dela": "delà",
  "delai": "délai",
  "delais": "délais",
  "demarrage": "démarrage",
  "demarre": "démarre",
  "demarrer": "démarrer",
  "demarrez": "démarrez",
  "denomme": "dénomme",
  "densite": "densité",
  "depart": "départ",
  "deplacement": "déplacement",
  "depliez": "dépliez",
  "deploient": "déploient",
  "deployant": "déployant",
  "deposer": "déposer",
  "deposes": "déposes",
  "derniere": "dernière",
  "dernieres": "dernières",
  "designes": "désignes",
  "detachable": "détachable",
  "detail": "détail",
  "detaille": "détaille",
  "details": "détails",
  "detection": "détection",
  "detenons": "détenons",
  "determiner": "déterminer",
  "developpement": "développement",
  "developpent": "développent",
  "developper": "développer",
  "developpes": "développes",
  "developpons": "développons",
  "difference": "différence",
  "differenciation": "différenciation",
  "differents": "différents",
  "disponibilite": "disponibilité",
  "documentee": "documentée",
  "documentees": "documentées",
  "donnees": "données",
  "duree": "durée",
  "ecart": "écart",
  "ecarts": "écarts",
  "echantillon": "échantillon",
  "echantillonnage": "échantillonnage",
  "echantillons": "échantillons",
  "echec": "échec",
  "echelle": "échelle",
  "echelonnes": "échelonnes",
  "echoue": "échoue",
  "economie": "économie",
  "economique": "économique",
  "economiquement": "économiquement",
  "economise": "économise",
  "economises": "économises",
  "ecran": "écran",
  "ecrasement": "écrasement",
  "ecrire": "écrire",
  "ecrit": "écrit",
  "ecrite": "écrite",
  "ecrivez": "écrivez",
  "editeur": "éditeur",
  "efficacite": "efficacité",
  "egalement": "également",
  "egaler": "égaler",
  "egard": "égard",
  "elargie": "élargie",
  "electronique": "électronique",
  "electroniques": "électroniques",
  "emballees": "emballées",
  "emetteur": "émetteur",
  "empecher": "empêcher",
  "employes": "employés",
  "enregistree": "enregistrée",
  "entierement": "entièrement",
  "entrainer": "entraîner",
  "entree": "entrée",
  "entrepots": "entrepôts",
  "envoyees": "envoyées",
  "epreuve": "épreuve",
  "eprouve": "éprouve",
  "eprouves": "éprouves",
  "equipe": "équipe",
  "equipement": "équipement",
  "equipements": "équipements",
  "equipent": "équipent",
  "equipes": "équipes",
  "estimees": "estimées",
  "etablissons": "établissons",
  "etablit": "établit",
  "etape": "étape",
  "etapes": "étapes",
  "etats": "états",
  "etendue": "étendue",
  "etiquetage": "étiquetage",
  "etre": "être",
  "etudes": "études",
  "europeen": "européen",
  "europeenne": "européenne",
  "europeens": "européens",
  "evaluation": "évaluation",
  "evalue": "évalue",
  "evaluer": "évaluer",
  "eventail": "éventail",
  "eventuellement": "éventuellement",
  "eventuelles": "éventuelles",
  "evidemment": "évidemment",
  "evitent": "évitent",
  "evitez": "évitez",
  "evolution": "évolution",
  "execution": "exécution",
  "exhaustivite": "exhaustivité",
  "expedies": "expédies",
  "expedions": "expédions",
  "expedition": "expédition",
  "experience": "expérience",
  "experimentes": "expérimentes",
  "expressement": "expressément",
  "faisabilite": "faisabilité",
  "fenetre": "fenêtre",
  "finalites": "finalités",
  "fondee": "fondée",
  "forcee": "forcée",
  "francais": "français",
  "francaises": "françaises",
  "frequentes": "fréquentes",
  "gere": "gère",
  "grace": "grâce",
  "heberge": "héberge",
  "hebergement": "hébergement",
  "hesitation": "hésitation",
  "hesitez": "hésitez",
  "hotel": "hôtel",
  "hotelier": "hôtelier",
  "hoteliers": "hôteliers",
  "hotellerie": "hôtellerie",
  "hotels": "hôtels",
  "hotes": "hôtes",
  "ideal": "idéal",
  "idee": "idée",
  "idees": "idées",
  "identite": "identité",
  "immatriculee": "immatriculée",
  "immediat": "immédiat",
  "immediate": "immédiate",
  "immediatement": "immédiatement",
  "imperatives": "impératives",
  "inchangee": "inchangée",
  "inchangees": "inchangées",
  "incompletes": "incomplètes",
  "independamment": "indépendamment",
  "independants": "indépendants",
  "inferieur": "inférieur",
  "inferieure": "inférieure",
  "ingenierie": "ingénierie",
  "ingenieurs": "ingénieurs",
  "installees": "installées",
  "integral": "intégral",
  "integralement": "intégralement",
  "integration": "intégration",
  "integres": "intègres",
  "intermediaire": "intermédiaire",
  "iterations": "itérations",
  "justifiees": "justifiées",
  "lancee": "lancée",
  "lancons": "lançons",
  "legal": "légal",
  "legales": "légales",
  "legitime": "légitime",
  "legitimes": "légitimes",
  "liberte": "liberté",
  "liees": "liées",
  "livree": "livrée",
  "livrees": "livrées",
  "magnetique": "magnétique",
  "magnetiques": "magnétiques",
  "majorite": "majorité",
  "malgre": "malgré",
  "maniere": "manière",
  "maquillee": "maquillée",
  "materiaux": "matériaux",
  "matiere": "matière",
  "matieres": "matières",
  "mecanique": "mécanique",
  "meme": "même",
  "mentionnees": "mentionnées",
  "metal": "métal",
  "methodes": "méthodes",
  "modelisation": "modélisation",
  "montee": "montée",
  "necessaire": "nécessaire",
  "necessitent": "nécessitent",
  "negligence": "négligence",
  "negoce": "négoce",
  "numerique": "numérique",
  "numero": "numéro",
  "opportunite": "opportunité",
  "optimisee": "optimisée",
  "parametre": "paramètre",
  "particularite": "particularité",
  "passee": "passée",
  "personnalisee": "personnalisée",
  "personnalisees": "personnalisées",
  "piece": "pièce",
  "pieces": "pièces",
  "possibilite": "possibilité",
  "prealable": "préalable",
  "prealablement": "préalablement",
  "precise": "précise",
  "precises": "précises",
  "precision": "précision",
  "precoce": "précoce",
  "precoces": "précoces",
  "premiere": "première",
  "premieres": "premières",
  "prenom": "prénom",
  "preparer": "préparer",
  "prerequis": "prérequis",
  "present": "présent",
  "presentation": "présentation",
  "presente": "présente",
  "presentent": "présentent",
  "presentes": "présentes",
  "pret": "prêt",
  "previsible": "prévisible",
  "privee": "privée",
  "problemes": "problèmes",
  "proceder": "procéder",
  "procedera": "procédera",
  "procedure": "procédure",
  "procedures": "procédures",
  "protegent": "protègent",
  "proteger": "protéger",
  "qualite": "qualité",
  "quantite": "quantité",
  "quantites": "quantités",
  "rapidite": "rapidité",
  "realisables": "réalisables",
  "realise": "réalise",
  "realistes": "réalistes",
  "reception": "réception",
  "reclamation": "réclamation",
  "reclamations": "réclamations",
  "recu": "reçu",
  "recue": "reçue",
  "recurrent": "récurrent",
  "reduction": "réduction",
  "reduits": "réduits",
  "reel": "réel",
  "reelle": "réelle",
  "reels": "réels",
  "reflete": "reflète",
  "region": "région",
  "reglement": "règlement",
  "reglementation": "réglementation",
  "reguliers": "réguliers",
  "remplacee": "remplacée",
  "renommee": "renommée",
  "renvoyes": "renvoyés",
  "reparation": "réparation",
  "repond": "répond",
  "repondre": "répondre",
  "reponse": "réponse",
  "reponses": "réponses",
  "representant": "représentant",
  "represente": "représente",
  "representent": "représentent",
  "republique": "république",
  "reseau": "réseau",
  "reseaux": "réseaux",
  "reservation": "réservation",
  "reserve": "réserve",
  "residence": "résidence",
  "residentielle": "résidentielle",
  "resistent": "résistent",
  "resolu": "résolu",
  "resolution": "résolution",
  "responsabilite": "responsabilité",
  "resultant": "résultant",
  "resultat": "résultat",
  "reussi": "réussi",
  "reussie": "réussie",
  "reussis": "réussis",
  "reussite": "réussite",
  "role": "rôle",
  "régulierement": "régulièrement",
  "sante": "santé",
  "selection": "sélection",
  "serie": "série",
  "series": "séries",
  "serigraphie": "sérigraphie",
  "siege": "siège",
  "simultanee": "simultanée",
  "simultanement": "simultanément",
  "solvabilite": "solvabilité",
  "souhaitees": "souhaitées",
  "speciales": "spéciales",
  "specialisation": "spécialisation",
  "specialise": "spécialise",
  "specialises": "spécialises",
  "specialisons": "spécialisons",
  "specifications": "spécifications",
  "specifique": "spécifique",
  "specifiques": "spécifiques",
  "stabilite": "stabilité",
  "stockees": "stockées",
  "superieur": "supérieur",
  "superieure": "supérieure",
  "superieurs": "supérieurs",
  "supplement": "supplément",
  "supplementaire": "supplémentaire",
  "supplementaires": "supplémentaires",
  "supplements": "suppléments",
  "supprimees": "supprimées",
  "surcout": "surcoût",
  "surveillee": "surveillée",
  "systeme": "système",
  "systemes": "systèmes",
  "temperature": "température",
  "temperatures": "températures",
  "traitees": "traitées",
  "transfere": "transfère",
  "tronquee": "tronquée",
  "ulterieure": "ultérieure",
  "unite": "unité",
  "unites": "unités",
  "validite": "validité",
  "vehicules": "véhicules",
  "verifiable": "vérifiable",
  "verification": "vérification",
  "verifier": "vérifier",
  "veritables": "véritables",
  "vetements": "vêtements",
  "video": "vidéo",
  "zero": "zéro"
};

// PL 缺变音词表（波兰语特殊字母 ą/ć/ę/ł/ń/ó/ś/ź/ż）
const PL_TRANSLIT = {
  "bezpieczenstwo": "bezpieczeństwo",
  "dlugosc": "długość",
  "efektywnosc": "efektywność",
  "elastycznosc": "elastyczność",
  "ilosc": "ilość",
  "jakosc": "jakość",
  "kompatybilnosc": "kompatybilność",
  "ladowanie": "ładowanie",
  "ladowarka": "ładowarka",
  "ladowarki": "ładowarki",
  "laduje": "ładuje",
  "napiecia": "napięcia",
  "napiecie": "napięcie",
  "odpornosc": "odporność",
  "ognioodpornosc": "ognioodporność",
  "oszczednosc": "oszczędność",
  "predkosc": "prędkość",
  "szybkosc": "szybkość",
  "tozsamosc": "tożsamość",
  "trwalosc": "trwałość",
  "wielkosc": "wielkość",
  "wszechstronnosc": "wszechstronność",
  "wydajnosc": "wydajność",
  "wylacznosc": "wyłączność",
  "wyswietlacz": "wyświetlacz",
  "zaleznosc": "zależność",
  "zamowienia": "zamówienia",
  "zamowienie": "zamówienie",
  "zgodnosc": "zgodność",
  "zlacza": "złącza"
};

// Regex patterns to find paths in file content
const PATH_PATTERNS = [
  // href="/xx/..." or href="https://www.wowohcool.com/xx/..."
  /href="(https?:\/\/www\.wowohcool\.com)?\/(de|es|fr|ru|pl)\/([^"]+)"/g,
  // "url": "https://www.wowohcool.com/xx/..."
  /"url":\s*"(https?:\/\/www\.wowohcool\.com)?\/(de|es|fr|ru|pl)\/([^"]+)"/g,
  // "publishingPrinciples": "..."
  /"publishingPrinciples":\s*"(https?:\/\/www\.wowohcool\.com)?\/(de|es|fr|ru|pl)\/([^"]+)"/g,
];

const LANG_DIRS = { de: "de", es: "es", fr: "fr", ru: "ru", pl: "pl" };
const SRC_ROOT = path.resolve(__dirname, "..", "src");

// ── Helpers ──────────────────────────────────────────────────────────────

function findViolations(filePath, content, lang) {
  const violations = [];

  for (const re of PATH_PATTERNS) {
    // Reset regex state
    re.lastIndex = 0;
    let match;
    while ((match = re.exec(content)) !== null) {
      const prefix = match[2]; // de, es, fr, ru
      const fullPath = match[3]; // everything after /de/ etc.

      // Parse the path: first segment = page slug or "products" / "blog"
      const segments = fullPath.replace(/\/$/, "").split("/");

      // Check page-level path (first segment)
      const pageSlug = segments[0];
      if (PAGE_MAP[pageSlug] && PAGE_MAP[pageSlug][prefix]) {
        const correct = PAGE_MAP[pageSlug][prefix];
        const fixed = match[0].replace(`/${prefix}/${pageSlug}`, `/${prefix}/${correct}`);
        violations.push({
          line: lineNumberOf(content, match.index),
          current: match[0],
          fixed,
          reason: `"${pageSlug}" → "${correct}" in ${prefix.toUpperCase()}`,
        });
        continue;
      }

      // Check products path: /xx/products/en-word/...
      if (segments[0] === "products" && segments.length >= 2) {
        if (PRODUCT_MAP[segments[1]] && PRODUCT_MAP[segments[1]][prefix]) {
          const correct = PRODUCT_MAP[segments[1]][prefix];
          const fixed = match[0].replace(
            `/${prefix}/products/${segments[1]}`,
            `/${prefix}/produ${prefix === "ru" || prefix === "pl" ? "kty" : prefix === "de" ? "kte" : prefix === "es" ? "ctos" : "its"}/${correct}`
          );
          violations.push({
            line: lineNumberOf(content, match.index),
            current: match[0],
            fixed,
            reason: `products/${segments[1]} → produ${prefix === "ru" ? "kty" : prefix === "de" ? "kte" : prefix === "es" ? "ctos" : "its"}/${correct} in ${prefix.toUpperCase()}`,
          });
          continue;
        }
        // Check product sub-slugs
        if (segments.length >= 3 && PRODUCT_MAP[segments[1]]) {
          if (PRODUCT_SUB_MAP[segments[2]] && PRODUCT_SUB_MAP[segments[2]][prefix]) {
            const correctProduct = PRODUCT_MAP[segments[1]][prefix];
            const correctSub = PRODUCT_SUB_MAP[segments[2]][prefix];
            const fixed = match[0].replace(
              `/${prefix}/products/${segments[1]}/${segments[2]}`,
              `/${prefix}/produ${prefix === "ru" ? "kty" : prefix === "de" ? "kte" : prefix === "es" ? "ctos" : "its"}/${correctProduct}/${correctSub}`
            );
            violations.push({
              line: lineNumberOf(content, match.index),
              current: match[0],
              fixed,
              reason: `products/${segments[1]}/${segments[2]} → ${correctProduct}/${correctSub} in ${prefix.toUpperCase()}`,
            });
          }
        }
      }
    }
  }

  // ── Catch unprefixed site-level paths (added 2026-08-14) ────────────────
  // Two bug classes previously slipped past this hook:
  //   1. url/publishingPrinciples/href → English page WITHOUT a lang prefix
  //      (e.g. "...wowohcool.com/about/" instead of ".../de/ueber-uns/").
  //   2. Site-level @id missing the lang prefix (e.g. "#organization"
  //      instead of "/de/#organization").

  // Check 1: unprefixed English page path in url/publishingPrinciples/href
  const englishSlugs = Object.keys(PAGE_MAP).join("|");
  const unprefixedPathRe = new RegExp(
    '(href|"url"|"publishingPrinciples")\\s*[:=]\\s*"(?:https?://www\\.wowohcool\\.com)?/(' + englishSlugs + ')(/|")',
    "g"
  );
  let upm;
  while ((upm = unprefixedPathRe.exec(content)) !== null) {
    const slug = upm[2];
    const correct = PAGE_MAP[slug][lang];
    if (correct) {
      violations.push({
        line: lineNumberOf(content, upm.index),
        current: upm[0],
        fixed: upm[0].replace(`/${slug}`, `/${lang}/${correct}`),
        reason: `"${slug}" is missing the "${lang}/" prefix → "${lang}/${correct}"`,
      });
    }
  }

  // Check 2: site-level @id must be lang-agnostic (one shared @id across locales)
  const prefixedIdRe = /"@id":\s*"https?:\/\/www\.wowohcool\.com\/(de|es|fr|ru|pl)\/#([a-z-]+)"/g;
  let uid;
  while ((uid = prefixedIdRe.exec(content)) !== null) {
    const frag = uid[2];
    violations.push({
      line: lineNumberOf(content, uid.index),
      current: uid[0],
      fixed: uid[0].replace(/www\.wowohcool\.com\/(de|es|fr|ru|pl)\/#/, "www.wowohcool.com/#"),
      reason: `@id "#${frag}" should not have a lang prefix (use one shared @id)`,
    });
  }


  // Check 3: DE 转写（ae/oe/ue/ss → ä/ö/ü/ß），仅德语
  if (lang === "de") {
    let body = content
      .replace(/<script[\s\S]*?<\/script>/g, (m) => m.replace(/[^\n]/g, " "))
      .replace(/(?:id|href|src|srcset)="[^"]*"/g, (m) => m.replace(/[^\n]/g, " "))
      .replace(/(?:^|\n)(?:canonical|enPath|dePath|esPath|frPath|ruPath|plPath|ogImage|ogType|navActive|articleSection|articleTags):\s*[^\n]*/g, (m) => m.replace(/[^\n]/g, " "))
      .replace(/(?:^|\n)\s*(?:en|de|es|fr|ru|pl):\s*"[^"]*"/g, (m) => m.replace(/[^\n]/g, " "))
      .replace(/https?:\/\/[^\s"'<>]+/g, (m) => m.replace(/[^\n]/g, " "))
      .replace(/\/[a-z0-9/_.-]+\.(?:webp|jpg|png|jpeg|json|njk)/g, (m) => m.replace(/[^\n]/g, " "));
    const translitRe = new RegExp("(?<![A-Za-zÀ-ÿ])(" + Object.keys(DE_TRANSLIT).join("|") + ")(?![A-Za-zÀ-ÿ])", "gi");
    let tm;
    while ((tm = translitRe.exec(body)) !== null) {
      const w = tm[1].toLowerCase();
      const fixed = tm[1][0] === tm[1][0].toLowerCase() ? DE_TRANSLIT[w] : DE_TRANSLIT[w][0].toUpperCase() + DE_TRANSLIT[w].slice(1);
      violations.push({
        line: lineNumberOf(body, tm.index),
        current: tm[1],
        fixed,
        reason: `"${tm[1]}" → "${fixed}" (umlaut)`,
      });
    }
  }


  // Check 4: ES 本土化检查（重音/拉美词/€位置）
  if (lang === "es") {
    let body = content
      .replace(/<script[\s\S]*?<\/script>/g, (m) => m.replace(/[^\n]/g, " "))
      .replace(/(?:id|href|src|srcset|class|style)="[^"]*"/g, (m) => m.replace(/[^\n]/g, " "))
      .replace(/url\s*:\s*"[^"]*"/g, (m) => m.replace(/[^\n]/g, " "))
      .replace(/(?:^|\n)(?:canonical|enPath|dePath|esPath|frPath|ruPath|plPath|ogImage|ogType|navActive|articleSection|articleTags):\s*[^\n]*/g, (m) => m.replace(/[^\n]/g, " "))
      .replace(/(?:^|\n)\s*(?:en|de|es|fr|ru|pl):\s*"[^"]*"/g, (m) => m.replace(/[^\n]/g, " "))
      .replace(/\{%[^%]*%\}/g, (m) => m.replace(/[^\n]/g, " "))
      .replace(/https?:\/\/[^\s"'<>]+/g, (m) => m.replace(/[^\n]/g, " "))
      .replace(/\/[a-z0-9/_.-]+\.(?:webp|jpg|png|jpeg|json|njk)/g, (m) => m.replace(/[^\n]/g, " "));

    // 4a. ES 重音（词表）
    const accentRe = new RegExp("(?<![A-Za-zÀ-ÿ])(" + Object.keys(ES_ACCENT).join("|") + ")(?![A-Za-zÀ-ÿ])", "gi");
    let am;
    while ((am = accentRe.exec(body)) !== null) {
      const w = am[1].toLowerCase();
      violations.push({
        line: lineNumberOf(body, am.index),
        current: am[1],
        fixed: ES_ACCENT[w],
        reason: `"${am[1]}" → "${ES_ACCENT[w]}" (acento)`,
      });
    }

    // 4b. 拉美词
    const latamRe = new RegExp("(?<![A-Za-zÀ-ÿ])(" + Object.keys(ES_LATAM).join("|") + ")(?![A-Za-zÀ-ÿ])", "gi");
    let lm;
    while ((lm = latamRe.exec(body)) !== null) {
      const w = lm[1].toLowerCase();
      violations.push({
        line: lineNumberOf(body, lm.index),
        current: lm[1],
        fixed: ES_LATAM[w],
        reason: `"${lm[1]}" → "${ES_LATAM[w]}" (español peninsular)`,
      });
    }

    // 4c. € 在数字前
    const euroRe = /€\s*\d/g;
    let em;
    while ((em = euroRe.exec(body)) !== null) {
      violations.push({
        line: lineNumberOf(body, em.index),
        current: em[0],
        fixed: em[0].replace(/€\s*/, "") + " €",
        reason: "€ 应在数字后（如 3,5 €）",
      });
    }
  }


  // Check 5: FR 重音（缺重音 → é/è/ê/à/ç）
  if (lang === "fr") {
    let body = content
      .replace(/<script[\s\S]*?<\/script>/g, (m) => m.replace(/[^\n]/g, " "))
      .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
      .replace(/(?:id|href|src|srcset|class|style)="[^"]*"/g, (m) => m.replace(/[^\n]/g, " "))
      .replace(/url\s*:\s*"[^"]*"/g, (m) => m.replace(/[^\n]/g, " "))
      .replace(/(?:^|\n)(?:canonical|enPath|dePath|esPath|frPath|ruPath|plPath|ogImage|ogType|navActive|articleSection|articleTags):\s*[^\n]*/g, (m) => m.replace(/[^\n]/g, " "))
      .replace(/(?:^|\n)\s*(?:en|de|es|fr|ru|pl):\s*"[^"]*"/g, (m) => m.replace(/[^\n]/g, " "))
      .replace(/\{%[^%]*%\}/g, (m) => m.replace(/[^\n]/g, " "))
      .replace(/https?:\/\/[^\s"'<>]+/g, (m) => m.replace(/[^\n]/g, " "))
      .replace(/\/[a-z0-9/_.-]+\.(?:webp|jpg|png|jpeg|json|njk)/g, (m) => m.replace(/[^\n]/g, " "));
    const frRe = new RegExp("(?<![A-Za-zÀ-ÿ])(" + Object.keys(FR_TRANSLIT).join("|") + ")(?![A-Za-zÀ-ÿ])", "gi");
    let fm;
    while ((fm = frRe.exec(body)) !== null) {
      const w = fm[1].toLowerCase();
      const fixed = fm[1][0] === fm[1][0].toLowerCase() ? FR_TRANSLIT[w] : FR_TRANSLIT[w][0].toUpperCase() + FR_TRANSLIT[w].slice(1);
      violations.push({
        line: lineNumberOf(body, fm.index),
        current: fm[1],
        fixed,
        reason: `"${fm[1]}" → "${fixed}" (accent)`,
      });
    }
  }


  // Check 6: PL 缺变音（波兰语特殊字母）
  if (lang === "pl") {
    let body = content
      .replace(/<script[\s\S]*?<\/script>/g, (m) => m.replace(/[^\n]/g, " "))
      .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
      .replace(/(?:id|href|src|srcset|class|style)="[^"]*"/g, (m) => m.replace(/[^\n]/g, " "))
      .replace(/url\s*:\s*"[^"]*"/g, (m) => m.replace(/[^\n]/g, " "))
      .replace(/(?:^|\n)(?:canonical|enPath|dePath|esPath|frPath|ruPath|plPath|ogImage|ogType|navActive|articleSection|articleTags):\s*[^\n]*/g, (m) => m.replace(/[^\n]/g, " "))
      .replace(/(?:^|\n)\s*(?:en|de|es|fr|ru|pl):\s*"[^"]*"/g, (m) => m.replace(/[^\n]/g, " "))
      .replace(/\{%[^%]*%\}/g, (m) => m.replace(/[^\n]/g, " "))
      .replace(/https?:\/\/[^\s"'<>]+/g, (m) => m.replace(/[^\n]/g, " "))
      .replace(/\/[a-z0-9/_.-]+\.(?:webp|jpg|png|jpeg|json|njk)/g, (m) => m.replace(/[^\n]/g, " "));
    const plRe = new RegExp("(?<![A-Za-zÀ-ÿ])(" + Object.keys(PL_TRANSLIT).join("|") + ")(?![A-Za-zÀ-ÿ])", "gi");
    let pm;
    while ((pm = plRe.exec(body)) !== null) {
      const w = pm[1].toLowerCase();
      const fixed = pm[1][0] === pm[1][0].toLowerCase() ? PL_TRANSLIT[w] : PL_TRANSLIT[w][0].toUpperCase() + PL_TRANSLIT[w].slice(1);
      violations.push({
        line: lineNumberOf(body, pm.index),
        current: pm[1],
        fixed,
        reason: `"${pm[1]}" → "${fixed}" (diacritic)`,
      });
    }
  }

  return violations;
}

function lineNumberOf(text, index) {
  return text.substring(0, index).split("\n").length;
}

function walkDir(dir, callback) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip node_modules, _site, etc.
      if (entry.name.startsWith("_") || entry.name === "node_modules") continue;
      walkDir(fullPath, callback);
    } else if (/\.(njk|html|json|md)$/.test(entry.name)) {
      callback(fullPath);
    }
  }
}

// ── Main ──────────────────────────────────────────────────────────────────

function main() {
  const fixMode = process.argv.includes("--fix");
  let totalViolations = 0;
  const filesWithIssues = [];

  for (const [lang, dir] of Object.entries(LANG_DIRS)) {
    const langRoot = path.join(SRC_ROOT, dir);
    if (!fs.existsSync(langRoot)) continue;

    walkDir(langRoot, (filePath) => {
      const relPath = path.relative(SRC_ROOT, filePath);
      const content = fs.readFileSync(filePath, "utf-8");
      const violations = findViolations(filePath, content, lang);

      if (violations.length > 0) {
        filesWithIssues.push({ filePath, relPath, violations });
        totalViolations += violations.length;
      }
    });
  }

  if (totalViolations === 0) {
    console.log("✅ i18n paths: all clean — no English path words in non-EN content.");
    process.exit(0);
  }

  console.log(`❌ ${totalViolations} i18n path violations in ${filesWithIssues.length} file(s):\n`);

  for (const { relPath, violations } of filesWithIssues) {
    console.log(`  ${relPath}`);
    for (const v of violations) {
      console.log(`    Line ${v.line}: ${v.reason}`);
      console.log(`      Current: ${v.current}`);
      console.log(`      Suggest: ${v.fixed}`);
    }
    console.log("");
  }

  if (fixMode) {
    console.log("🔧 --fix mode: auto-replacing unambiguous violations...");
    let fixed = 0;
    for (const { filePath, violations } of filesWithIssues) {
      let content = fs.readFileSync(filePath, "utf-8");
      for (const v of violations) {
        if (content.includes(v.current)) {
          content = content.replace(v.current, v.fixed);
          fixed++;
        }
      }
      fs.writeFileSync(filePath, content);
    }
    console.log(`✅ Fixed ${fixed} occurrence(s). Please review the changes.\n`);
  }

  console.log(
    "💡 Fix these by replacing English path words with localized equivalents.\n" +
    "   See scripts/lint-i18n-paths.js for the full mapping table."
  );

  process.exit(1);
}

main();
