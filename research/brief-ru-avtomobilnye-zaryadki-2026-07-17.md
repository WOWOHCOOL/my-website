# Research Brief — RU 站「Автомобильные зарядки」产品页优化（/ru/produkty/avtomobilnye-zaryadki/）

**日期**: 2026-07-17
**目标页面**: `src/ru/produkty/avtomobilnye-zaryadki/index.njk`
**目标市场**: 俄罗斯 + ЕАЭС
**页面类型**: 产品类目页（商业/交易意图）
**研究语言**: 俄语（2 组 query）

---

## 0. GSC Performance Data

```
> [WARN] No GSC page data found for `/ru/produkty/avtomobilnye-zaryadki`.
```

站点未上线，零基线。Вордстат 校准提醒同前（尤其 «прикуриватель» 词族量级）。

---

## 1. ✅ 重要核实：EAC 法规框架确认正确 + 可具体化

用真实 EAC 声明文件（shtyl.ru 公示的 12В 充电设备声明 PDF）核实：

| 项 | 核实结果 | 页面现状 |
|----|---------|---------|
| 适用法规 | **ТР ТС 004/2011 + ТР ТС 020/2011**（即使 12В 输入也适用 004） | ✅ 页面写法正确 |
| 形式 | **Декларация**（未列入强制证书清单，与повербанк不同） | ⚠️ 未点明「声明即可，比证书快」这一采购优势 |
| 具体参数 | Схема 1д（批量），有效期至 **5 лет**，ТН ВЭД **8504 40** | ❌ 页面无此颗粒度（Information Gain 机会） |

→ **建议**：在「E-Mark ECE R10 и поддержка EAC」区块补一句具体化：«Для автозарядок достаточно декларации соответствия (ТР ТС 004/2011 + 020/2011, схема 1д, срок действия до 5 лет, код ТН ВЭД 8504 40) — быстрее и дешевле, чем сертификат». 竞品全是泛泛的「поможем с EAC」。

## 2. Competitive Landscape（俄语 SERP 实测）

| 竞品 | MOQ | 段位 | 情报 |
|------|-----|------|------|
| Occ (Zhuhai) | 500 | 100W PD+QC，TüV | 直接对标 |
| Mei Shun He | — | 60 000m²、3 厂 | **已供货 DNS（俄罗斯）**——品类的俄零售通路证明 |
| Zhejiang Dayuan | 500 | ¥12.77/шт 基础双 USB | 低价 5V/2.4A 红海 |
| Jmtek | 100 | 基础款 | MOQ 更低 |

**定位判断**：基础 5V 双口是 ¥5-13（≈$0.7-1.8）的红海——不打；我们的 GaN 65-140W PD 3.1 + E-Mark + выдвижной кабель 是清晰的高端段位，页面现有定位正确。差异化武器：E-Mark（竞品无人展示）+ EAC 声明颗粒度（§1）+ Bosch 案例。

## 3. 页面审计与 Gaps

| 检查项 | 现状 | 判定 |
|--------|------|------|
| E-Mark ×14、12/24В ×18、грузовик ×12、автопарк ×4 | 覆盖扎实 | ✅ |
| ТР ТС 004+020 表述 | 正确（§1 已核实） | ✅ 可具体化 |
| **такси/каршеринг 场景** | 0 处 | ⚠️ 车队/网约车是俄企业采购真实场景（автопарк 已有 4 处，补 такси 一词即可） |
| **Ozon/WB 渠道** | 0 处 | ⚠️ авто-аксессуары 是马克平台大类目，一句话即可 |
| **«прикуриватель»** | 仅 2 处 | ⚠️ 俄语该品类第一口语词（«зарядка в прикуриватель»），FAQ 里应有问题形式承载 |
| Title/H1/内链 | 达标 | ✅ |

## 4. Recommended Changes（4 项增量）

1. **EAC 区块具体化**（§1 措辞）——本页最高价值改动
2. **FAQ 补 1 问**（прикуриватель 承载）: «Подходит ли зарядка для гнезда прикуривателя 12 В и 24 В?» → 回答涵盖 легковые 12В/грузовые 24В、E-Mark、автопарки таксопарков и каршеринга 批量采购场景 + 同步 Schema
3. **描述加 «оптом»**: description 现无该交易词，微调加入
4. Ozon/WB 一句话（可并入新 FAQ 回答或既有渠道句）

## 5. Supporting Elements & Links
- 数据: FOB 价格区间（data panel §5 car chargers）、Bosch 案例（已在页/Кейсы 互链 ✅）
- 外链: 保留现有（UNECE R10 等技术源）；EAC 颗粒度不外链（引自声明实例，写作事实表述）
- 内链: 已达标（кейсы/kontakty/сиблинг产品）✅

## 6. Meta Preview
Description 微调（≈158 字符）: «Завод автомобильных зарядных устройств оптом: OEM/ODM, PD 3.1 до 140 Вт, E-Mark, 12/24 В для легковых и грузовых. Декларация EAC. MOQ от 500 шт. DDP в РФ.»

**Sources**:
- [真实 EAC 声明实例（12В 充电设备，ТР ТС 004+020，схема 1д）— shtyl.ru PDF](https://spb.shtyl.ru/upload/iblock/63d/qka8920ym6mieh60pbxoeg9xpeffd7p/deklaraciya_o_sootvetstvii_zaryadnye_ustrojstva_bct_bcr.pdf)
- [Occ Zhuhai 100W 车充（MOQ 500）— Alibaba](https://www.alibaba.com/product-detail/Factory-Wholesale-USB-C-Car-Charger_1601403988124.html)
- [Mei Shun He（供货 DNS 俄罗斯）— Crustdata](https://profiles.crustdata.com/company/mei-shun-he-electronic-limited)
