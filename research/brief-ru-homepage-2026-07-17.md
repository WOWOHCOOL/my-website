# Research Brief — RU 站首页优化（wowohcool.com/ru/）

**日期**: 2026-07-17
**目标页面**: `src/ru/index.njk` → `https://www.wowohcool.com/ru/`
**目标市场**: 俄罗斯 + ЕАЭС（哈萨克斯坦、白俄罗斯）
**页面类型**: 首页（B2B 定位页，非博客文章）
**研究语言**: 俄语（4 组俄语 query）

---

## 0. GSC Performance Data

```
> [WARN] No GSC page data found for `/ru`.
```

**解读**: RU 站尚未上线部署，GSC 零数据 = 基线为零。本简报的关键词选择基于俄语 SERP 实测 + 既有 EN/DE/ES 站集群经验，上线 4-6 周后须用 GSC 真实数据复核一次。

⚠️ **Yandex 局限性声明**: 本研究的搜索工具基于 Google（美区）。俄罗斯搜索市场 Yandex 占约 60-70%，正式 `/write` 或 `/optimize` 前建议用 [Яндекс Вордстат](https://wordstat.yandex.ru) 核实以下关键词的真实俄区搜索量。Yandex SERP 中还会出现本简报未覆盖的本土竞品类型：促销礼品公司（Проект 111、HappyGifts 类）和俄罗斯本土批发商（опт-платформы）。

---

## 1. SEO Foundation

### Primary Keyword（首页定位词）
**`производитель повербанков и зарядных устройств OEM`**（工厂+品类定位，与现有 title 一致，方向正确）

### Secondary Keywords（按商业价值排序）
| 关键词 | 意图 | 依据 |
|--------|------|------|
| `повербанк оптом от производителя под логотип` | 交易型 | SERP 实测有专门供应商结果页 |
| `повербанк под собственной торговой маркой (СТМ)` | 交易型 | СТМ 是俄语私有品牌标准术语，SERP 有独立生态 |
| `зарядные устройства оптом из Китая` | 商业型 | 采购经理高频查询 |
| `сертификация EAC повербанк` | 信息→商业 | 强制合规刚需，2026 新规红利期（见 §4） |
| `поставщик для Ozon / Wildberries` | 交易型 | 马克平台卖家 = 俄区最大 B2B 细分买家群 |

### 长尾机会
- `повербанк с логотипом на заказ MOQ` / `повербанк корпоративный подарок оптом`
- `GaN зарядка оптом производитель`（GaN 俄语 SERP 竞争极低）
- `завод повербанков Шэньчжэнь`（工厂直连意图）

### Featured Snippet 机会
**有** — 表格格式：「Повербанк vs Зарядное устройство: форма оценки EAC（CoC vs DoC）」。俄语 SERP 目前该对比仅存在于认证代理机构网站，无一家工厂站覆盖。

---

## 2. Competitive Landscape（俄语 SERP 实测）

### 出现在俄语 SERP 的竞品类型
1. **中国工厂的俄语页面**: PUJIMAX（东莞，有 /ru/ 站）、Pineng（明确出口俄罗斯）、WECENT（GaN，MOQ 200）、Haoyy Tech（Alibaba RU，MOQ 10-50）
2. **B2B 平台页**: Alibaba ru_RU、Made-in-China RU 版
3. **认证代理内容**（EAC 关键词下）: cu-tr.com.cn、certificat.cn 等——垄断了 EAC 信息型流量，但无生产能力

### 关键竞争情报
| 竞品 | MOQ | 对 WOWOHCOOL 的威胁/机会 |
|------|-----|------------------------|
| Haoyy Tech | **10-50 件** | MOQ 比我们低一个数量级 → 不打 MOQ 最低牌 |
| WECENT | 200 件 | GaN 直接对手，有 RU 客户渠道 |
| Pineng | 未标 | 唯一明确「出口俄罗斯」的规模工厂（19,000m²） |
| Powerness/Usmart | 60万件/月 | 产能叙事强（IFA/CES 奖项）|

### Content Gaps（俄语 SERP 全部竞品都没有的内容）
1. **EAC 2025-2026 新规实操指引**（见 §4——这是最大的 Information Gain 机会）
2. **真实工厂数据面板**: 竞品页面全是「уточняется」（待确认）——我们直接公示 MOQ 分级、FOB 价格区间、25-30 天生产周期
3. **马克平台卖家视角**: 无人讲「没有 EAC → WB/Ozon 卡片被封」的完整链路
4. **ж/д 铁路物流时效**（18-25 天 vs 海运 35+ 天）——只有义乌 sourcing 内容提到

### Differentiation Strategy
- **不打「MOQ 最低」**（打不过 MOQ 10 的档口型供应商），打 **「MOQ 500 = 全 OEM + 认证文件包 + 4 级 QC」** 的正规军定位
- 用 Bosch / Jacob Jensen 案例对冲「中国工厂不可信」痛点（俄采购方同样被贸易公司坑过）
- EAC 合规深度 = 信任护城河（竞品最多写一句「помогаем с EAC」）

---

## 3. Recommended Optimization（首页现状 vs 建议）

现有 H1「Завод повербанков и зарядных устройств — OEM/ODM из Шэньчжэня」和 H2 结构已达标（含 B2B 信号词），**不需要重写**，以下为增量优化：

```
✅ 保持: H1、Hero、对比表、产品矩阵、客户评价、FAQ 结构
➕ 增强 1: FAQ 增加 1 问「Какая форма оценки EAC нужна: сертификат или декларация?」
   → 回答植入 CoC vs DoC 对比（повербанк=CoC обязателен с 2026, зарядка=DoC 3Д）
   → 同步更新 FAQPage Schema
➕ 增强 2: 「Завод в Шэньчжэне — доставка в ЕАЭС」H2 下补一行马克平台场景:
   「Карточки на Ozon и Wildberries блокируются без EAC — мы готовим
    полный комплект документов для вашего заявителя в ЕАЭС」
➕ 增强 3: meta description 加「под логотип」（SERP 实测高频修饰词，当前缺失）
```

**Target Word Count**: 首页现有体量已足（DE/ES 同级），不加长，只做上述精准增量。

---

## 4. Supporting Elements — EAC 合规数据（本次研究最高价值发现）

⚠️ **来源均为中国认证代理机构内容（cu-tr.com.cn / certificat.cn 等），引用前建议向合作认证机构核实**，但方向一致性高：

| 数据点 | 内容 | 用途 |
|--------|------|------|
| 三大强制法规 | ТР ТС 004/2011（低压安全）+ ТР ТС 020/2011（EMC）+ ТР ЕАЭС 037/2016（RoHS 类比） | 已在产品页使用 ✅ |
| **2026 关键变化** | повербанк 从 2026 年起只能走 **сертификат (CoC)**，декларация 不再适用 | FAQ 增强 1 的核心卖点 |
| 2025-09 起 | 「免测试」声明通道（схема 3Д без испытаний）取消 | 说明「早规划」急迫性 |
| 2025-12 起 | 送检样品必须附报关单（ГТД, код 64），否则证书可被注销 | 工厂协助价值点 |
| 申请人要求 | 必须是 ЕАЭС 居民法人（进口商担任 заявитель） | 已在 FAQ 覆盖 ✅ 保持 |
| 必备测试 | UN38.3 + IEC 62133 + MSDS（повербанк）| 与现有认证叙事衔接 |
| 周期/费用参考 | CoC 系列证 8-12 周；DoC 7-15 工作日 | FAQ 回答具体化 |
| 违规后果 | 扣关/最高货值 100% 罚款/马克平台封卡片 | 痛点钩子 |

### 工厂数据引用（factory-data-panel.md）
- MOQ 分级: 丝印 100-300 / 全 OEM 500-1,000 / ODM 1,000-3,000
- 生产: 样品 3-7 天、量产 25-30 天、4 级 QC + 100% 4 小时老化
- 物流: ж/д 22-28 天（数据面板口径）、海运参考 EU 25-35 天、空运 3-7 天
- 案例: Bosch 10,000 件车充 0 缺陷；Jacob Jensen ODM 6,000 件

---

## 5. Internal Linking Strategy（均已存在 ✅ 验证过 0 断链）

- Pillar: `/ru/oem-odm-uslugi/`（OEM 服务页）
- 产品: `/ru/produkty/poverbanki/`、`/ru/produkty/gan-zaryadnye-ustroystva/`
- 信任: `/ru/keysy/`、`/ru/faq/`
- 转化: `/ru/kontakty/`
- **未来博客集群**（RU blog 文章上线后回链首页）: EAC 认证指南、ж/д 物流指南、СТМ 私有品牌指南 — 本简报 §4 数据可直接复用

---

## 6. Meta Elements Preview

**现有 Title**（59 字符，达标，保持）:
`Производитель повербанков и зарядных устройств OEM | WOWOHCOOL`

**Meta Description 建议改版**（~158 字符，增加 «под логотип» + CoC 钩子）:
`OEM/ODM-завод повербанков и зарядных устройств в Шэньчжэне. Под логотип и СТМ, MOQ от 500 шт. Документы для сертификации EAC. Доставка в РФ, Казахстан, Беларусь.`

**URL**: `/ru/` （已定，无变更）

---

## Next Steps
1. 按 §3 三个增量优化点修改 `src/ru/index.njk`（改动极小，可直接执行）
2. 上线后 4-6 周跑 `gsc_brief_injector.py --url /ru/` 复核真实 query
3. RU 博客第一批选题按 §4/§5 优先做: ① EAC 认证完整指南（CoC vs DoC）② ж/д 进口物流 ③ СТМ 私有品牌生产
4. 用 Яндекс Вордстат 校准 §1 关键词的俄区真实量级

**Sources**（SERP 实测引用）:
- [Alibaba RU — Shenzhen Haoyy Tech](https://szhaoyuyang.en.alibaba.com/ru_RU/index.html)
- [WECENT — GaN & Wireless Charger OEM](https://www.gdwecent.com/)
- [PUJIMAX RU](http://www.pujimax.com/ru/company-news/pujimax-leading-innovation-in-digital-accessories-with-global-reach)
- [Guangdong Pineng（出口俄罗斯）](https://www.cccme.cn/shop/cn2020g4981/index.aspx)
- [Powerness @ IFA](https://www.ifa-berlin.com/exhibitors/powerness)
- [EAC 认证解析 — cu-tr.com.cn](https://www.cu-tr.com.cn/page8?article_id=9970)
- [充电器 EAC 法规对应 — gost-smk.com](https://gost-smk.com/info-4629.html)
- [电子产品 EAC 流程 — certificat.cn](https://www.certificat.cn/info-1680.html)
