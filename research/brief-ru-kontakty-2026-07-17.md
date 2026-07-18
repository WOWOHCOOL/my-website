# Research Brief — RU 站「Контакты」页优化（/ru/kontakty/）

**日期**: 2026-07-17
**目标页面**: `src/ru/kontakty/index.njk` → `https://www.wowohcool.com/ru/kontakty/`
**目标市场**: 俄罗斯 + ЕАЭС
**页面类型**: 联系页（转化终点，非关键词页）
**研究语言**: 俄语（1 组决定性 query）

---

## 0. GSC Performance Data

```
> [WARN] No GSC page data found for `/ru/kontakty`.
```

站点未上线，零基线。

---

## 1. 🚨 核心发现：WhatsApp 在俄罗斯已被完全封锁 —— 转化阻断级问题

俄语 SERP 多源一致（含 Ростелеком 负责人公开表态「WhatsApp в России уже умер, трафика нет совсем」）：

| 渠道 | 2026 俄罗斯状态 | 置信度 | 对我们的影响 |
|------|----------------|--------|-------------|
| **WhatsApp** | **完全封锁**（2025 先禁语音，2026 全禁；Meta 在俄被认定极端组织） | 高（多源+官方表态） | ❌ RU 访客点 wa.me 按钮 = 死链级体验 |
| **Telegram** | 2026-02 起限速，多方预测 2026-04 全面封锁 | 中（部分为预测） | ⚠️ 不可作为主渠道 |
| VPN | 439+ 服务被封，协议级封锁，绕行不稳定 | 高 | 不能指望买家翻墙联系工厂 |
| **Email** | 正常 | — | ✅ 主渠道 |
| **电话** | 正常 | — | ✅ |
| **WeChat** | 正常，且俄中贸易增长下俄进口商普遍在用（SERP 原文：«многие российские клиенты уже используют его») | 高 | ✅ **对华采购场景的天然渠道** |
| MAX (VK) | 俄官方推的国家级 messenger，7 500 万用户 | 高 | 🔶 差异化选项（中国工厂开 MAX 极罕见），需工厂确认可行性 |

**页面现状审计**（与上述现实的冲突）：
- `kontakty` 页 WhatsApp 出现 **6 次**（含 meta description «в WhatsApp или по email»），Telegram 0 次，WeChat 0 次
- 全站共享悬浮按钮 `floating-buttons.njk` 硬编码 `wa.me` 链接（所有语言站共用）→ RU 访客看到的第一个联系入口就是被封的渠道
- 其余 8 个 RU 页面各有 1-4 处 WhatsApp 提及（o-kompanii 4 次、产品页各 1 次）
- ✅ 表单（web3forms→email）不受封锁影响，已是事实上的主转化路径
- ✅ 时区信息（Москва −5 ч）已有

---

## 2. 渠道策略建议（RU 站专属排序）

```
1. 表单 + Email（主 CTA，不受任何封锁影响）— 现状已是，保持
2. WeChat（俄中贸易标准渠道）— 需工厂提供 WeChat ID / QR 码素材
3. 电话 +86（正常）— 保持
4. Telegram — 降级为「备选」并随时可摘（2026-04 封锁预测落地则删）
5. WhatsApp — RU 站全部移除或替换
6. MAX — 可选差异化（「中国工厂开通俄罗斯国家 messenger」是强信任信号），需工厂确认
```

## 3. Recommended Changes（分两级）

### 3.1 RU 页面文案层（可立即做，无外部依赖）
- `kontakty` 页 6 处 + 其余 8 页共 11 处 WhatsApp 提及 → 改为「email / WeChat」表述（WeChat ID 未拿到前先写「WeChat — по запросу вышлем QR-код」或只写 email）
- `kontakty` meta description 去掉 WhatsApp
- `o-kompanii` FAQ「WhatsApp и Telegram」→「email, WeChat или Telegram」

### 3.2 共享组件层（改动影响全站，需谨慎 + 素材）
- `floating-buttons.njk`：加 `lang == "ru"` 分支 → RU 站悬浮按钮从 wa.me 改为 `mailto:` 或 WeChat 弹层（需 QR 素材）；其他语言站不动
- `_data/i18n.json` `floatingButtons.ru`：label 从「Написать в WhatsApp」改为对应新渠道
- `footer.ru` 的 whatsapp 项同理（footer.njk 如何渲染 whatsapp 需查验）

### ⚠️ 需用户/工厂提供后才能完整执行
1. **WeChat ID + QR 码图片**（放 kontakty 页和悬浮按钮弹层）
2. MAX 帐号是否开通（可选）
3. Telegram 保留与否的决策（建议保留但标注为备选，部署前复查封锁状态）

## 4. Supporting Elements
- 引用数据（谨慎使用，标注为市场状态而非法律声明）: WhatsApp 封锁为事实性表述；Telegram 只写「доступность может быть ограничена」级别措辞，不写具体封锁日期预测
- 不加外链（联系页保持零干扰）

## 5. Internal Links
现有（→кейсы、продукты）足够；本页是链入终点。

## 6. Meta Preview
- Description 改版建议（~150 字符）: «Свяжитесь с WOWOHCOOL — OEM/ODM заводом в Шэньчжэне. Ответ в течение 24 часов по email или WeChat. Запросите расчёт, образцы или техническую документацию.»

---

## Next Steps
1. 决策：是否立即执行 §3.1（文案层）？WeChat ID 未到位时先用 email 优先表述
2. 向工厂要 WeChat ID/QR → 执行 §3.2 完整版
3. 部署前复查 Telegram 在俄可用状态（本简报数据截至 2026-07）
4. **注意**：EN/DE/ES/FR 站不受影响，WhatsApp 在这些市场照常保留

**Sources**:
- [Business moves from Telegram to corporate messengers — Izvestia (EN)](https://en.iz.ru/en/node/2084485)
- [Работа в мессенджерах в условиях блокировок — eXpress](https://express.ms/en/blog/rabota-v-komande/kak-rabotat-v-messendzherakh-v-usloviyakh-blokirovok/)
- [Restricted platforms in Russia 2026 — 1browser](https://1browser.com/how-to-unblock-restricted-websites-and-social-media-in-russia/)
