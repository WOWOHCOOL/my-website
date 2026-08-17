# AI Citability Analysis: USB-C PD 3.1 Specyfikacja OEM (PL)

**URL:** https://www.wowohcool.com/pl/blog/usb-c-pd-3-1-specyfikacja-oem/
**Analysis Date:** 2026-08-16
**Overall Citability Score: 86/100**
**Citability Coverage:** 7/7 (100 %) 正文区块高于 80 分

---

## Score Summary

| 维度 | 分数 | 权重 | 加权 |
|---|---|---|---|
| Answer Block Quality（答案块质量） | 85/100 | 30 % | 25.5 |
| Passage Self-Containment（段落自包含） | 83/100 | 25 % | 20.75 |
| Structural Readability（结构可读性） | 88/100 | 20 % | 17.6 |
| Statistical Density（数据密度） | 92/100 | 15 % | 13.8 |
| Uniqueness & Original Data（独家数据） | 82/100 | 10 % | 8.2 |
| **Overall** | | | **85.85 → 86/100** |

---

## 核心结论

PL 版在撰写时已内置 FR 版的 3 处定义式开头（P1）改进，起步分 86 与 RU 版持平。Answer Block Quality 85——7 个章节中 5 个以明确定义式直答开头（"USB Power Delivery istnieje w trzech wersjach…" / "PPS i AVS to dwa komplementarne protokoły…"）。

最强维度仍是 **Statistical Density（92）** 和 **Structural Readability（88）**。**Uniqueness 82 略低于 RU 版（85）**，因为 research brief 里发现的波兰语 SERP 独家数据（线材 B2B 批发价表 $0,80–12,00/件）**未写入正文**——这是 PL 版唯一可补充的信息增益点。

整体已处于"良好偏优"，可直接发布。

---

## Strongest Content Blocks（最强区块）

### 1. "6. Dyrektywa UE 2022/2380 i CE: wymogi dla polskich importerów" — 88/100
> « Dla polskiego rynku kluczowa jest dyrektywa (UE) 2022/2380 o wspólnej ładowarce, która narzuca port USB-C w całej Unii Europejskiej, oraz oznakowanie CE. »

**为什么好**：定义式开头 + 明确主体（dyrektywa）+ 具体实体（2022/2380、CE）。紧跟日期表格（28 gru. 2024 / 28 kwi. 2026）+ 5 层合规列表 + 波兰本土监管（UOKiK/BDO/PUESC），是波兰语区**唯一**把 dyrektywa + CE + 波兰监管结合的内容。

### 2. "7. Przewodnik zakupowy PD 3.1: zgodność i wybór fabryki" — 86/100
> « Przed wpłatą zaliczki importer musi wymagać od fabryki ładowarek PD 3.1 następujących rzeczy: »

**为什么好**：独家工厂数据密集——兼容性测试矩阵（100 % handshake / 50 sztuk / Chroma 63600）、GaN V 热数据（52,4 °C / 0,3 % zwrotów / MTBF >15 000 h）。命名实体（WOWOHCOOL、Dong Yi Technology、usb.org）使其成为不可替代的引用源。

### 3. "1. PD 3.0 vs 3.1 vs 3.2: co sprawdzić przed wyborem kontrolera" — 86/100
> « USB Power Delivery istnieje w trzech wersjach — PD 3.0, PD 3.1 i PD 3.2 — różniących się maksymalną mocą i zakresami napięć. PD 3.1 podwaja moc ze 100 W do 240 W przez EPR… »

**为什么好**：标准定义式开头（"X istnieje w trzech wersjach"）+ 量化对比（100 W → 240 W）+ 对比表格 + Expert Insight（Nina Nico，dyrektywa 洞察）。三重结构可被 AI 直接提取。

---

## Weakest Content Blocks（改写优先级）

### 1. "4. Kable E-Marker: specyfikacja i ceny FOB wg poziomów" — 81/100

**当前开头：**
> « Twój kabel jest równie ważny jak ładowarka. Oto czego potrzebujesz na każdym poziomie mocy: »

**问题**：半定义开头（"Twój kabel jest równie ważny"），未直接回答"E-Marker 是什么"。

**建议改写（answer-first）：**
> « Kabel E-Marker to kabel USB-C z układem, który informuje źródło zasilania o maksymalnym napięciu i prądzie. Bez niego ładowanie powyżej 60 W jest niemożliwe, a dla 240 W obowiązkowy jest układ z deklaracją «50 V/5 A». »

**附加改进**：本节已有 E-Marker 芯片（HUSB332B/TID 6773）和中间功率警告，可**补充线材 B2B 批发价表**（见下）。

### 2. 补充线材批发价表（Uniqueness 提升机会）

PL 版 research brief 发现的波兰语 SERP 独家数据**未写入正文**：

| 线材配置 | 批发价（1000+ 件） |
|---------|------------------|
| 基础 60W USB 2.0（无 E-Marker） | $0,80–1,50/件 |
| PD 100W USB 2.0（有 E-Marker） | $1,50–3,00/件 |
| PD 100W USB 3.2 10 Gbps | $3,50–6,00/件 |
| **PD 240W USB4 40 Gbps** | **$7,00–12,00/件** |

**建议**：在 §4 加入此表，Uniqueness 82 → 85，总分 86 → 87。

---

## Quick Win Reformatting Recommendations

1. **§4 开头改为定义式**（"Kabel E-Marker to…"）——预期 citability 提升 **+1 分**
2. **§4 补充线材 B2B 批发价表**（$0,80–12,00）——预期 Uniqueness +3，总分 **+1 分**
3. **保持数据密度现状**（92 分已达标）
4. **保持 dyrektywa + CE + UOKiK 表格**（PL 独有，AI 引用价值最高）
5. **H2 保持描述式含 B2B 信号词**（importer/fabryki/OEM）

---

## Per-Section Scores

| Section | Words | Answer | Self-Contained | Structure | Stats | Unique | Overall |
|---|---|---|---|---|---|---|---|
| §1 PD 3.0 vs 3.1 vs 3.2 | ~260 | 88 | 85 | 88 | 90 | 78 | 86 |
| §2 SPR vs EPR | ~240 | 86 | 85 | 90 | 86 | 76 | 85 |
| §3 Poziomy napięć | ~220 | 85 | 82 | 85 | 93 | 76 | 84 |
| §4 Kable E-Marker | ~290 | 78 | 80 | 88 | 92 | 78 | 81 |
| §5 PPS vs AVS | ~190 | 85 | 82 | 85 | 82 | 74 | 84 |
| §6 Dyrektywa UE | ~280 | 90 | 88 | 90 | 92 | 84 | 88 |
| §7 Przewodnik zakupowy | ~420 | 82 | 86 | 90 | 95 | 90 | 86 |
| FAQ（8 pytań） | ~700 | 85 | 82 | 90 | 88 | 76 | 84 |

---

## 行动建议

**优先级 P2（可选，+1 分）**：§4 补线材批发价表 + 定义式开头。这是 PL 版相对 RU 版（86 分）唯一未达 87 的原因——brief 里的独家线材价格数据没进正文。

**优先级 P3（无）**：其余维度已达标，PL 版与其他语言版本一致。

*分析基于 Princeton GEO（2024）+ Georgia Tech + IIT Delhi 引用偏好研究，对照 Bortolato（2025）AI Overview 最优段落长度（134-167 词）*
