# Image Assets — 可复用真实图片清单 + alt 本土化规范

> 所有图片来自站点真实工厂/产品/QC 素材（`wowohcool.com/image/`），**禁止 stock photo**（握手/西装/通用工厂图）。写文章时按内容长度选图，插在相关 H2/H3 段落之间。封面图（ogImage）单独算，不计入正文插图。

---

## 插图数量规则（按正文词数）

| 正文词数 | 正文插图数量 |
|---|---|
| < 1500 | 1 张 |
| 1500–2500 | 2 张 |
| 2500+ | 3 张 |

> 例如：1800–2000 词的文章配 2 张正文插图。

---

## 图片资源（按场景分类，可复用）

### 工厂/生产类（验厂、生产检查场景）

| 路径 | 内容 |
|---|---|
| `/image/factory/factory-smt-line.webp` | SMT 产线 |
| `/image/blog/how-to-choose-factory/wireless-charger-factory-production-line-automation.webp` | 生产线自动化 |
| `/image/blog/how-to-choose-factory/wireless-charger-factory-quality-inspection.webp` | 质检 |

### QC/测试类（质量控制、老化测试场景）

| 路径 | 内容 |
|---|---|
| `/image/blog/oem-vs-odm-guide/oem-odm-aging-test-quality-control.webp` | 老化测试 |
| `/image/blog/oem-vs-odm-guide/oem-odm-thermal-testing-quality-control.webp` | 热测试 |

### 产品类（产品展示、采购场景）

| 路径 | 内容 |
|---|---|
| `/image/product/gan-charger/wop37-67w-gan-charger-retractable-cable-wireless.webp` | GaN 充电器 |
| `/image/product/power-bank/wop21-67w-power-bank.webp` | 移动电源 |
| `/image/product/wireless-charger/wow10-qi2-charger.webp` | Qi2 无线充 |

### 物流/包装类（物流、出货场景）

| 路径 | 内容 |
|---|---|
| `/image/blog/power-bank/power-bank-packaging-ready-shipment.webp` | 包装出货 |

### 内部结构类（技术、拆解场景）

| 路径 | 内容 |
|---|---|
| `/image/blog/power-bank/power-bank-internal-structure-pcba.webp` | 内部 PCBA |

---

## alt 本土化规范（每张图必须，Gate 4 强制）

1. 用**目标语言**写 alt（RU/DE/ES/FR/PL 对应语言，不是英文）
2. 嵌入 **B2B 关键词**（OEM / 工厂 / 进口商 / 供应商 / fabryka / импортёр / importateur 等）
3. 描述**真实内容** + **上下文关联**（图片内容与所在 H2/H3 段落对齐）
4. 不用 "image of" / "picture of" 这类空洞前缀
5. 保持 ≤ 125 字符（Google 建议）

**示例**（RU 验厂清单 SMT 图）：
> `SMT-линия завода WOWOHCOOL в Шэньчжэне: проверка производства при аудите завода для импортёров OEM`

**示例**（FR 验厂清单热测试图）：
> `Test thermique du contrôle qualité chez WOWOHCOOL : audit usine Chine et dossier technique CE pour importateur OEM`

---

## HTML 格式（正文插图统一）

```html
<div class="mt-6 mb-6">
<img src="{path}" alt="{本土化 alt}" loading="lazy" class="max-w-3xl mx-auto rounded-2xl shadow-lg w-full">
</div>
```

> 封面图（Featured Image panel [3]）用 `loading="eager"` + `fetchpriority="high"` + `width="2240" height="1260"`；正文插图用 `loading="lazy"` + `max-w-3xl` 居中。两者格式不同，勿混用。
