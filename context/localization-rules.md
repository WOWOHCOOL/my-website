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
