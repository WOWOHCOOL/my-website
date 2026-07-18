# Research Brief — RU 站「Настольная беспроводная зарядка」子产品页（/ru/produkty/besprovodnye-zaryadki/nastolnaya/）

**日期**: 2026-07-17
**目标页面**: `src/ru/produkty/besprovodnye-zaryadki/nastolnaya/index.njk`
**目标市场**: 俄罗斯 + ЕАЭС
**研究语言**: 俄语（2 组 query；第 2 组含无效词，有效结论以第 1 组为准）

---

## 0. GSC Performance Data

```
> [WARN] No GSC page data found for `/ru/produkty/besprovodnye-zaryadki/nastolnaya`.
```

站点未上线，零基线。

---

## 1. 核心发现：HoReCa/酒店是被页面遗漏的第 4 个受众 🏨

«беспроводная зарядка для отеля» SERP 证实酒店是настольные зарядки的真实 B2B 段位：
- Wecent 有专门面向 отели/кафе/аэропорты 的内容矩阵（又是它）；Glob-el 做酒店家具嵌入式模组
- 酒店场景形态学已成型：номер（3-в-1）、прикроватная тумбочка（подставка）、公共区（IP65 пад）、ресепшн（嵌入）
- EN 站已有 hotel-charging-solutions 博客与集群——酒店是集团既定战略段位，RU 页却没接

**页面现状**：«Кому подходят» H2 列了 3 个受众（маркетплейсы 55-60% 全球出货占比、корпоративные подарки、офисы/коворкинги）——**отели/HoReCa 缺席**（отел/гостиниц/HoReCa 全部 0 处）。

## 2. 页面审计

| 检查项 | 现状 | 判定 |
|--------|------|------|
| Qi2 ×29、Qi2.2 ×8、25 Вт ×7、受众 H2、专利极简卖点、3 модели | 强 | ✅ |
| **отели/HoReCa** | 0 处 | ❌ §1 |
| «оптом» | 0 处 | ⚠️ |
| **Description 超长** | ≈190 字符（>160 上限） | ❌ 需截短 |
| Ozon/WB | 0（受众卡片有 маркетплейсы 泛称） | ✅ 已由受众卡覆盖语义，不再重复加词 |

## 3. Recommended Changes（2 项）

1. **FAQ 新增**「Подходят ли настольные зарядки для отелей и HoReCa?」→ 回答：да — номера (подставка на тумбочке), лобби и переговорные (пады), брендирование под фирменный стиль отеля; Qi2 универсален для гостей с iPhone и Android; нет движущихся частей — ресурс выше, чем у кабелей, которые гости уносят и ломают; MOQ от 500 шт., упаковка под ваш стандарт номера。同步 Schema。
   ⚠️ 用 FAQ 而非给«Кому подходят»加第 4 卡——3 卡网格加 1 张会破版式（须改 grid class），FAQ 零版式风险。
2. **Description 截短 + «оптом»**（≈158 字符）:
   «Настольные беспроводные зарядки Qi2 оптом: подставка 15 Вт, ультратонкий пад 11 мм, Qi2.2 25 Вт — Q3 2026. OEM для офисов, отелей и маркетплейсов. MOQ от 500 шт.»

## 4. Supporting Elements
- 数据面板: Qi2 Desktop Stand $7-10 FOB、N52H、WOW68/WOW33 型号名（页面已用）
- 不加外链

## 5. Meta Preview
Title 保持；Description 见 §3.2。

**RU 博客选题追加**（第 8 位）:「Беспроводные зарядки для отелей: что закупать»——EN 站已有对应文章可作结构参照（但按规矩独立俄语撰写），承接 HoReCa 流量后回链本页。

**Sources**:
- [Wecent — Wireless Chargers for Public Spaces / Hotels](https://www.gdwecent.com/what-are-the-best-wireless-chargers-for-public-spaces/)
- [Glob-el — 嵌入式 Qi2 模组（酒店家具）](https://www.glob-el-power.com/Wireless-Charging-Modules.html)
- [Chargekeku Z5 — 桌面 3-в-1 OEM 参照](https://www.chargekeku.com/products/z5-3-in-1-desktop-stand-wireless-charger-can-be-customized/)
