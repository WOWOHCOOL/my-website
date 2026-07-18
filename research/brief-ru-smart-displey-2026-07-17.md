# Research Brief — RU 站「Смарт-дисплей повербанк」子产品页（/ru/produkty/poverbanki/smart-displey/）

**日期**: 2026-07-17
**目标页面**: `src/ru/produkty/poverbanki/smart-displey/index.njk`
**目标市场**: 俄罗斯 + ЕАЭС
**页面类型**: 子产品页（高端差异化 SKU）
**研究语言**: 俄语（2 组 query）

---

## 0. GSC Performance Data

```
> [WARN] No GSC page data found for `/ru/produkty/poverbanki/smart-displey`.
```

站点未上线，零基线。

---

## 1. Competitive Landscape：定位几乎无竞争

«повербанк с TFT дисплеем оптом» SERP 里除了 **EverGreat Technology**（唯一做「TFT 屏显 logo 品牌化」同角度的厂），其余全是**屏幕模组供应商**（CNK/Kingtech/RONGEN——卖屏的，不是卖повербанк的）。即：
- 俄语空间里「повербанк с брендированным TFT-экраном」的商业内容位**基本无人占据**
- 我们页面（TFT ×63、«логотип бренда в UI» H2、LED vs TFT vs OLED 对比）已是该位置的最完整内容

## 2. 核心发现：俄罗斯 VIP 礼品礼仪 —— 我们独特功能的完美钩子 🎯

俄语企业礼品分类规范（elsu.ru 行业文档）：
- **VIP-подарки（представительская продукция）= $50+**，赠予战略合作伙伴/高级官员/国际代表团
- **行业规则：VIP 礼品上不直接印 logo**——只品牌化包装或用企业色（直接刻 logo 显得像促销品，掉档次）

**这正是「логотип в UI дисплея」的天然卖点**：设备本体保持「干净」的高端感（无镭雕、无丝印），品牌在开机屏幕上出现——两全其美，解决了 VIP 礼品的品牌化悖论。竞品（模组厂）讲不出这个故事，EverGreat 也没讲。

## 3. 页面审计：该页已吸收大部分标准修复

| 检查项 | 现状 | 判定 |
|--------|------|------|
| TFT ×63、оптом ×2（title+正文）、Ozon/WB 各 1、USD 定价 ×2、«логотип в UI» H2、LED vs TFT vs OLED 对比 | 齐整 | ✅ 几乎不用动 |
| **VIP 礼品framing** | корпоративн 0、подар 0 | ⚠️ §2 的钩子缺席——唯一值得做的增量 |
| Description | 达标（title 已含 оптом） | ✅ 不动 |

## 4. Recommended Change（仅 1 项）

**FAQ 新增**「Подходит ли повербанк с TFT-дисплеем для VIP-подарков?」→ 回答：
- в русской деловой практике на VIP-подарки (от $50) логотип напрямую не наносят — брендируют упаковку, чтобы подарок не выглядел промо-продукцией
- логотип в UI дисплея решает эту дилемму: корпус остаётся «чистым» (алюминий + закалённое стекло, без гравировки), бренд появляется на экране при включении
- жёсткая подарочная упаковка по вашему дизайну; MOQ от 500 шт.
同步 FAQPage Schema。

**注意跨页分工**（Anti-Repetition）: 无线充页 = 量产企业礼品（Qi2 认证 vs noname）；本页 = **VIP/представительский 段位**（$50+ 礼仪逻辑）——两个不同礼品层级，不重复。

## 5. Supporting Elements
- 数据面板: 铝+玻璃、4 модели、$11-15 FOB、Qi2+Watch、UN38.3
- elsu.ru 的 VIP 分类是行业惯例表述，正文用「в русской деловой практике принято…」措辞，不外链 PDF

## 6. Meta Preview
Title/Description 不动。

**Sources**:
- [EverGreat — TFT display power bank（唯一同角度竞品）](https://www.evgreat.com/shorts/jl-9/)
- [Разработка сувенирной продукции — elsu.ru（VIP 礼品分类，PDF）](https://elsu.ru/uploads/files/2020-11/1605789507_razrabotka-suvenirnoy-i-reklamnoy-produkcii_compressed_compressed.pdf)
- [Tech Pack Executive（premium 礼品组格式参照）](https://promopunks.com.au/products/tech-pack-executive)
