# 工厂数据扩展审计 — 7 组已确认值（2026-09-03）

- 扩展规则：10 条
- 偏离：**7** / 匹配：**112**

## 偏离清单

| 规则 | 偏离数 |
|---|---|
| cert_un383 | 3 |
| ces_2026 | 2 |
| fob_qi2_adder | 1 |
| brands_200 | 1 |

### 明细

- `de/blog/hotelladegeraete-oem-loesungen/index.njk:609` [DE] `Active client brands 200+` 文中 **0.0** vs 工厂 **200+**
  > …U Ecolabel, GreenSign).</li>  <li><strong>UL 94 V-0 Brandschutzgehäuse:</strong> Selbstverlöschend innerhalb…
- `es/blog/verificar-certificados-falsos-cargadores-ce-fcc-ul/index.njk:507` [ES] `UN38.3 cert $1,000-2,500` 文中 **(2500.0, 4500.0)** vs 工厂 **1000-2500**
  > …irectivas, expediente técnico bloqueado por BOM y UN38.3 cruzado — el coste real es $2,500-4,500 (CE/FCC/RoHS), respaldado por el <a href="/es/blo…
- `fr/blog/certifications-chargeurs-oem-guide/index.njk:693` [FR] `UN38.3 cert $1,000-2,500` 文中 **(2500.0, 4500.0)** vs 工厂 **1000-2500**
  > …ss="text-slate-600 text-sm">Le bundle CE/FCC/RoHS/UN38.3 coûte $2.500-4.500 (4-6 semaines, 30-40% d'économie vs certification…
- `ru/blog/proverka-podlinnosti-sertifikatov-eac-ce-fcc-oem/index.njk:326` [RU] `UN38.3 cert $1,000-2,500` 文中 **(2500.0, 4500.0)** vs 工厂 **1000-2500**
  > …"Стандартный пакет CE + FCC SDoC + RoHS с отчётом UN 38.3 стоит $2 500-4 500 и занимает 4-6 недель. UL 62368-1 — $1 500-3 000,…
- `blog/qi2-vs-magsafe-guide/index.njk:527` [EN] `CES 2026 exhibitor` 文中 **2023.0** vs 工厂 **2026-2026**
  > …chnology to the WPC. The new standard launches at CES 2023. The Magnetic Power Profile brings universal magn…
- `fr/blog/batterie-externe-specifications-oem/index.njk:725` [FR] `CES 2026 exhibitor` 文中 **2027.0** vs 工厂 **2026-2026**
  > … batterie numérique, REP, éco-organismes et échéances 2027.</p>  </div>  </a>  <a href="/blog/semi-solid-sta…
- `blog/how-to-choose-power-bank/index.njk:652` [EN] `Qi2 cert adder $1.20-2.00/unit` 文中 **(2.0, 4.0)** vs 工厂 **1.2-2.0**
  > …4, 27,000mAh ~$14-22. GaN circuit adds $1-3/unit; Qi2 wireless adds $2-4/unit. WOWOHCOOL offers flexible MOQ from 500 units wit…
