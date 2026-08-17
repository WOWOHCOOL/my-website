# Research Brief — Pokolenia GaN I-V (PL) · 代际对比 dla Importerów

**日期**: 2026-08-17 · **目标语言**: 波兰语 · **站点**: wowohcool.com `/pl/`
**Slug**: `generacje-gan-porownanie-oem` · **EN 对应**: `gan-generations-guide` · **DE**: `gan-generationen-uebersicht` · **ES**: `generaciones-gan-comparativa` · **FR**: `generations-gan-comparaison-oem` · **RU**: `pokoleniya-gan-sravneniye-oem`

> **本地化铁律**：用波兰市场数据（Allegro/Amazon PL/Gdańsk-Gdynia）、波兰法规（CE/UOKiK/EORI PL/ISZTAR/BDO）、波兰进口商场景。禁止翻译英文/法文/俄文 SERP。URL 全小写无波兰特殊字符 + `oem` 后缀。变音字母 ą ć ę ł ń ó ś ź ż（ładowarka/sprawność/częstotliwość/importer）。

---

## 0. 先读再写（已读同主题 brief）

- ✅ 已读 `brief-gan-vs-krzem-porownanie-oem-2026-08-15.md`（PL GaN vs 硅，含波兰市场/法规/本地化清单）
- ✅ 已读 `brief-generations-gan-comparaison-oem-2026-08-17.md`（FR 版，结构对齐母版）
- ✅ 已读 `brief-pokoleniya-gan-sravneniye-oem-2026-08-17.md`（RU 版，假 GaN V + EAC 差异化参考）
- ✅ 已读 EN 版 `gan-generations-guide` 12 节结构 + `context/factory-data-canonical.md` §11

---

## 1. SEO Foundation

### 主关键词（B2B 采购意图）
- **Primary**: `pokolenia GaN ładowarki importer`（GaN 充电器代际进口商）
- **备选**: `GaN V vs GaN III porównanie importer`

### 次要关键词（长尾 + 语义）
- `generacja GaN V ładowarka`
- `GaN I III V różnica importer`
- `FET GaN Navitas Innoscience Infineon`
- `narzut BOM GaN V importer`
- `PD 3.1 EPR 240 W GaN V`
- `ładowarka GaN generacje import Polska`

### 搜索意图
**商业意图为主**（importer/OEM/hurt），信息意图为辅（różnica generacji）。

### 目标字数
**2 000–2 300 词**（对比类，对齐 PL gan-vs-krzem 版）。

### Featured Snippet 机会
**有，很强**：波兰语 SERP 几乎空白。目标占位：
1. **表格**（GaN I vs III vs V：sprawność/częstotliwość/rozmiar/żywotność/PD）
2. **段落**（"Powyżej 140 W tylko GaN V wspiera pełne PD 3.1 EPR 240 W"）

---

## 2. Competitive Landscape

### 波兰语 SERP 现状（几乎空白，最大差异化窗口）
波兰语搜索「pokolenia GaN ładowarki porównanie GaN V importer」返回的结果**只有 WOWOHCOOL 自己的 EN 文章**——连中文/英文第三方竞品都没有。**波兰语进口商视角的「GaN 代际对比」是纯空白**，这是六语言里缺口最大的一篇。

### 关键发现（波兰语区特有痛点）
1. **假 GaN V 泛滥**：WOWOHCOOL 实测某欧洲分销商测试 3 个「GaN V」供应商，仅 1 个通过全部 5 项验证，其余是 GaN III 和增强硅冒充。
2. **编号不统一**：品牌混用「GaN4.0」（Lenovo）vs「GaN5」（Baseus），进口商无法直接对比。
3. **新组件**：Power Integrations InnoSwitch4-CZ（45-100 W 集成方案）、Infineon CoolGaN G5（IGT60R070D1，100-240 W 旗舰）——FET 型号验证有更具体的波兰语弹药。

### 竞品共同章节（必须覆盖）
1. 各代差异本质（sprawność/częstotliwość/bandgap，不是协议）
2. GaN I vs III vs V 规格对比表
3. 各功率段推荐

### 内容缺口（差异化机会）
- ❌ 竞品无 **「为什么 specs 跳过 GaN II/IV」** 采购解释
- ❌ 竞品无 **真实 FET 型号对比**（Navitas/Innoscience/GaN Systems/EPC/Infineon/Power Integrations）
- ❌ 竞品无 **「如何识别真假 GaN V」** 验证法（欧洲分销商案例）
- ❌ 竞品无 **波兰市场数据**（IndexBox）和 **CE/UOKiK/EORI PL/ISZTAR/BDO** 合规
- ❌ 竞品无 **BOM 溢价 vs 退货率/保修** 的 TCO 视角

### 差异化策略
**「真实 FET 型号 + 波兰进口商代际决策框架 + 假 GaN V 识别 + CE/UOKiK 合规」**——factory-data-canonical 独家数字（52,4°C vs 76,8°C、退货率 0,3% vs 8-15%、MTBF >15 000h、~1 MHz）+ 波兰市场/法规数据。

---

## 3. Recommended Outline（对齐 EN/FR/RU 版 + 波兰化）

```
H1: Pokolenia GaN I-V: Porównanie dla Importerów OEM 2026

引言（Hook）
- 场景：波兰进口商在 Allegro 上架 100 W 充电器，收到两份报价——GaN III 9,20 $ vs GaN V 11,40 $ FOB
- 问题：为什么 Allegro/Amazon PL 开始标「pokolenie GaN」，选错一代的代价？
- 价值：FET 型号 + 工厂数据 + 假 GaN V 识别 + CE 合规

H2: Dlaczego pokolenia GaN mają znaczenie przy zakupach OEM
H3: Co zmienia «pokolenie GaN» (sprawność, częstotliwość, BOM)
H3: Dane fabryczne: 52,4°C vs 76,8°C · zwroty 0,3% vs 8-15%

H2: GaN I-V: ewolucja techniczna
H3: GaN I (2018) — pionier
H3: Dlaczego specyfikacje pomijają GaN II i GaN IV
H3: GaN III (2020) — skok efektywności (+ enhancement-mode vs cascode)
H3: GaN V (2023) — szczyt + PD 3.1 EPR 240 W

H2: Tabela porównawcza GaN I vs III vs V（Featured Snippet 抓取位）
H3: Sprawność, częstotliwość, rozmiar, żywotność, bandgap, PD

H2: FET GaN: jak zweryfikować pokolenie w wycenie
H3: Navitas, Innoscience, GaN Systems, EPC, Infineon CoolGaN G5, Power Integrations
H3: 5 sposobów na rozpoznanie prawdziwego GaN V（假 GaN V——欧洲分销商案例）

H2: Narzut BOM i FOB według pokoleń
H3: GaN V +20-35% vs GaN III +10-15%
H3: FOB Shenzhen według mocy (65 W $6-8,50 / 100 W $9-13 / 140 W $18-24)

H2: Decyzja OEM: które pokolenie wybrać
H3: Kiedy GaN III wystarczy (≤65 W, retail < 200 zł)
H3: Kiedy GaN V obowiązkowy (>140 W, PD 3.1, premium)

H2: Rynek Polski + certyfikacja CE（本土化核心）
H3: Import z Chin 85-95% · Allegro 55-65% online · marki własne (Media Expert, RTV Euro AGD, Lidl)
H3: CE / UOKiK / EORI PL / ISZTAR / BDO / art. 33a VAT

Conclusion + CTA（Poproś o wycenę OEM）
FAQ（8 问，B2B 采购语言）
```

---

## 4. Supporting Elements

### 统计/数据（含来源）
1. **波兰市场**（[IndexBox](https://www.indexbox.io/store/poland-kw-wall-charger-pack-840-market-analysis-forecast-size-trends-and-insights/)）：85-95% 充电器来自中国（越南替代）；欧盟关税 0-2%；E-commerce 55-65% 首购在线，**Allegro 领先**；全球品牌（Anker/Ugreen/Baseus/Xiaomi/Samsung）45-55% 在线 vs 波兰自有品牌（Media Expert、RTV Euro AGD、Lidl、Biedronka、Action）；本地生产边缘化；仓库 Warsaw/Poznań/Łódź，工厂→波兰仓 8-16 周
2. **波兰在售 GaN 产品**：Verbatim GaN GNC-65（65 W 2x USB-C）、Delock/Navilock GaN（48 W/140 W）—— GaN 已进波兰零售
3. **工厂代际对比**（factory-data-canonical §11）：sprawność 硅 ~85% / GaN 3 90-92% / GaN V 93-95%；częstotliwość ~100 kHz / ~500 kHz / **~1 MHz**；rozmiar 基线 / 50% 更小 / **60% 更小**；bandgap 1,12 eV / 3,4 eV / 3,4 eV
4. **热成像**：65 W 满载 30min，GaN V 52,4°C vs 硅 76,8°C（FLIR E8）
5. **退货率**：GaN ~0,3% vs 硅 8-15%；MTBF >15 000 h vs ~6 500 h
6. **FOB Shenzhen**：GaN 30 W $3,50-5,00 / 65 W $6,00-8,50 / 100 W $9-13 / 140 W PD 3.1 $18-24
7. **FET 组件**：Power Integrations InnoSwitch4-CZ（45-100 W）、Infineon CoolGaN G5 IGT60R070D1（100-240 W）

### 法规数据（CE 区，非 EAC）
- CE（LVD 2014/35/UE + EMC 2014/30/UE）+ IEC 62368-1
- UOKiK（市场监管）、EORI PL、ISZTAR（关税）、BDO（废物登记）、JPK_V7、art. 33a ustawy o VAT（增值税反向征收）

### 专家引言（EXPERT INSIGHT，GEO 必须）
- 作者：**Nina Nico**（Global Procurement & Sourcing Manager）
- 波兰语洞察："Narzut GaN V jest uzasadniony powyżej 140 W. Poniżej — dobrze zintegrowany GaN III daje 90% korzyści za 60% ceny FET. Zawsze sprawdzaj numer części układu, a nie logo generacji na opakowaniu."

### 案例/场景（波兰进口商视角）
- Allegro 卖家：65 W GaN III（retail < 200 zł）vs 100 W GaN V（premium 250-350 zł）的 SKU 决策
- Media Expert/RTV Euro AGD 渠道：CE + UOKiK 合规、编号不统一（Lenovo GaN4.0 vs Baseus GaN5）
- 波兰批发商：140 W PD 3.1 必须 GaN V，否则无法走 240 W EPR

### 视觉建议
- GaN I vs III vs V 规格对比表（Featured Snippet 占位）
- FET 型号对比图（Navitas/Innoscience/Infineon/Power Integrations）
- FLIR 热成像对比图（GaN V vs 硅）
- 封面：`image/blog/cover-pl/generacje-gan-porownanie-oem.webp`

---

## 5. Internal Linking Strategy（波兰语路径，需 grep 确认）

| 目标 | PL 路径 | 锚文本示例 |
|---|---|---|
| Pillar: Technologia GaN | `/pl/blog/technologia-gan-ladowarki-oem/` | «technologia GaN» |
| GaN vs Krzem | `/pl/blog/gan-vs-krzem-porownanie-oem/` | «GaN vs krzem» |
| Certyfikacja CE/UN38.3 | `/pl/blog/certyfikacja-ce-un38-3-importer-polska/` | «certyfikacja CE» |
| USB-C PD 3.1 | `/pl/blog/usb-c-pd-3-1-specyfikacja-oem/` | «USB-C PD 3.1 240 W» |
| 产品页 GaN | `/pl/produkty/ladowarka-gan/`（grep 确认） | «ładowarki GaN OEM» |
| Service | `/pl/uslugi-oem-odm/` | «usługi OEM/ODM» |

> 需 grep 确认 PL 产品页实际路径（`/pl/produkty/...`），遵循 i18n 路径铁律。

### 外部权威链接（≥2, rel="noopener noreferrer"）
1. IndexBox — 波兰充电器市场
2. Anker / Infineon CoolGaN — GaN 技术参考
3. （可选）TST Group Polska — 波兰在售 GaN 产品

---

## 6. Meta Elements Preview（草案）

- **Meta Title**（50-65 字符，含 B2B 信号词）:
  `Pokolenia GaN I-V: Porównanie dla Importerów OEM | WOWOHCOOL`
- **H1**（独立撰写，含 B2B 信号词）:
  `Pokolenia GaN I-V: Porównanie dla Importerów OEM 2026`
- **Meta Description**（120-155 字符，含 FOB/MOQ/数据）:
  `Pokolenia GaN I-V dla importerów: sprawność 93-95%, częstotliwość ~1 MHz, FET Navitas/Innoscience, cena FOB Shenzhen. MOQ 500, fabryka ISO 9001, CE.`
- **URL Slug**: `/pl/blog/generacje-gan-porownanie-oem/`

### 关键词防冲突
- 与 PL `technologia-gan-ladowarki-oem`（GaN 是什么）区分：本篇是「代际路线图」，非「入门介绍」
- 与 PL `gan-vs-krzem-porownanie-oem`（GaN vs 硅）区分：本篇是「GaN I vs III vs V」，非「GaN vs 硅」
- 与 PL `usb-c-pd-3-1-specyfikacja-oem`（USB-C PD 3.1）区分：本篇是「各代对比」，非「协议规格」

---

## 7. 波兰语本土化自检清单（pl-dict.md + CLAUDE.md）

- [ ] 法规用 CE/UOKiK/EORI PL/ISZTAR/BDO/art. 33a VAT——不用 EAC（那是俄语区）
- [ ] 术语：importer, producent OEM, dostawca, fabryka, certyfikacja, cło, odprawa celna
- [ ] 市场：Allegro, Amazon PL, Media Expert, RTV Euro AGD, Gdańsk/Gdynia
- [ ] 货币：PLN（zł）为主，USD 参考
- [ ] 变音字母准确（ą ć ę ł ń ó ś ź ż）：ładowarka/sprawność/częstotliwość/porównanie/importer/certyfikacja
- [ ] 小数逗号（6,8 mm）、货币后置（500 zł）、引号 «...»、标题 sentence case
- [ ] URL 全小写无波兰特殊字符 + `oem` 后缀（generacje-gan-porownanie-oem，无 ą/ę/ł 变音）
- [ ] 专业术语保留英文（GaN/OEM/FET/BOM/FOB/MOQ/PD 3.1），普通词用波兰语
- [ ] 注意 moc（功率）≠ móc（能）陷阱
- [ ] 开关频率口径统一：factory-data ~1 MHz（系统级）vs 行业/评测 ≥5 MHz（器件级）——正文说明差异

---

*Brief 由 Claude Code 生成 · 数据来源：IndexBox、WOWOHCOOL EN、gan-vs-krzem brief、factory-data-canonical.md · 2026-08-17*
