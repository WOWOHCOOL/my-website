# 多语言本土化通用规则

> 适用 DE / ES / FR 站点。各语言词表见 de-dict.md / es-dict.md / fr-dict.md。

## 保护规则（任何替换前必须先隔离，只改正文可见文本）

0. **URL / slug**：`href`/`src`/`srcset`/`url` 属性里的内容——URL 大小写敏感、slug 保持 ASCII，不加重音、不误改大小写
1. **HTML 注释**：`<!-- ... -->` 是技术标记（不面向读者），不做重音/大小写替换
2. **HTML 实体**：`&amp;`、`&laquo;`、`&agrave;` 等——实体名是 ASCII 技术标记，不该改
3. **HTML 属性**：`id`/`class`/`style` 等；`data-*` 属性值若是技术数据（slug/ID/JSON）→ 保护，若是可见文本（如 `data-title`）→ 该改
4. **script / style 块**：`<script>`、`<style>` 里的代码整体保护（JSON-LD 里的 headline/description/FAQ 等可见文本除外）
5. **frontmatter / hreflang**：`canonical`/`enPath`/`ogImage`/语言键等路径字段
6. **Nunjucks**：`{% ... %}` 语句块（`{{ ... }}` 输出里的可见文本应改，但变量名/路径不碰）
7. **email / 域名 / mailto:**：email 地址、域名、`mailto:` 链接——ASCII，不加重音/转写
8. **产品型号 / 编号**：`WOW93`、`UN3090`、HS 代码——技术标识（形态判断含数字/全大写已挡大部分，纯字母型号需词表）
9. **文件路径**：`/xxx.webp` 等资源路径

## 判断规则

1. **形态判断（缩写/单位/品牌自动保留）**：全大写（B2B/WPC/IEC）或混合大小写（mAh/MagPad）→ 保留
2. **英语术语/专名保留**：OEM/ODM/FOB/MOQ/PD/DDP/GaN/Qi2、机构名（Global Market Insights）、产品名（Surface Laptop）→ 保留英文
3. **普通词翻译腔才本地化**：先看上下文——术语/专名→英文；普通词→本地语言（entrega 非 delivery、portátil 非 laptop）

## ⚠️ 教训（2026-08-14）

1. 不能用「非专名即小写」——缩写/专名是开放集合，词表穷举不了，会误改 B2B→b2B、IEC→iEC。正确做法：形态判断先把缩写挡在门外。
2. URL 必须隔离——否则误改 href/src 里的 slug（usb-c→USB-C），导致 404。
3. HTML 注释必须隔离——否则注释里的 autres 被误改成 autrès（假词）。
4. 英语词不能凭直觉「该西语化」——delivery 可能是 DDP 术语、insights 可能是机构名，先看上下文。

## hreflang 同簇框架层规则（2026-08-27 教训）

同主题多语言文章（hreflang 簇）「语言表达独立」**不只是句子改写，必须落到编辑框架层**：

- **可共享（改了反而造假）**：工厂自己的硬数据——面积、SMT 线数、MOQ、缺陷率、burn-in 时长、具体案例（Bosch）、BOM 成本占比。同一家工厂，数据不因语言变。
- **必须各自重推导（禁止跨语言复制）**：决策框架的编辑内容——评分矩阵的维度标签、红旗清单、黄金问题、专家引言、BOM 论证角度。每个市场的 SERP top-5 缺口不同、进口商真实决策风险不同，框架必须按目标市场 SERP 重新推导（FR 锚 CE 责任归属、RU 锚支付渠道+EAC 责任人、PL 锚 GPSR/VAT/分级 AQL）。
- **矩阵权重不因市场改**：权重若来自工厂第一手观察（同厂同权重），改权重 = 编数据。差异化靠维度标签和验证内容，不靠权重数字。
- **SERP 必须实抓**：禁止「captcha 拦截 / 沿用其它市场调研」作为本土调研的替代；俄语可用 WebSearch 俄语查询 + 俄语竞品（xilinkglobaltrade、РБК、aversgroupp 等）实抓。
