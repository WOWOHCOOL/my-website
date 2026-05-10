# CLAUDE.md — WOWOHCOOL 官方网站

这是 wowohcool.com 的网站源码，独立于 seomachine 工具库。
所有 SEO/内容优化必须使用 seomachine 的标准工具。

## 项目结构

```
C:\Users\wowoh\
├── .claude\              ← Claude 全局配置（skills、memory）
├── seomachine\           ← SEO 工具库（Python 模块、评分标准）
└── wowohcool.com\        ← 本目录，网站源码
```

## 优化标准（每次分析必须使用）

### Python 评分模块（量化标准，不用手写脚本）

```
C:\Users\wowoh\seomachine\data_sources\modules\content_scorer.py      # 五维度综合评分
C:\Users\wowoh\seomachine\data_sources\modules\seo_quality_rater.py   # SEO 质量评分
C:\Users\wowoh\seomachine\data_sources\modules\readability_scorer.py  # 可读性评分
```

运行方式：
```bash
cd C:\Users\wowoh\seomachine
python -c "import sys; sys.path.insert(0, 'data_sources/modules'); from content_scorer import ContentScorer; ..."
```

### E-E-A-T & 质量门禁

```
C:\Users\wowoh\.claude\skills\seo\references\eeat-framework.md   # E-E-A-T 评分框架
C:\Users\wowoh\.claude\skills\seo\references\quality-gates.md     # 质量门禁表
```

### 品牌规范

```
C:\Users\wowoh\seomachine\context\brand-voice.md        # 品牌语调
C:\Users\wowoh\seomachine\context\style-guide.md        # 写作规范
C:\Users\wowoh\seomachine\context\seo-guidelines.md      # SEO 指南
C:\Users\wowoh\seomachine\context\target-keywords.md     # 目标关键词
C:\Users\wowoh\seomachine\context\internal-links-map.md  # 内链地图
C:\Users\wowoh\seomachine\context\features.md            # 产品功能
```

## ContentScorer 五维度（通过阈值：70）

| 维度 | 权重 | 检查内容 |
|------|------|----------|
| Humanity | 30% | 26 条 AI 短语、被动语态、缩写密度 |
| Specificity | 25% | 27 条模糊词、百分比/金额/日期/数据密度 |
| Structure Balance | 20% | 纯文字 vs 列表/表格比例（目标 50-75%） |
| SEO | 15% | 标题长度、关键词位置、字数 |
| Readability | 10% | Flesch 60-70、句子节奏、段落 ≤4 句 |

## 关键标准速查

### 字数
- 博客 ≥2000 | 产品 ≥400 | 首页 ≥500

### 内链
- 博客 5-10 条（不是 40 条！）
- 锚文本描述性、多样化

### 图片
- 首页大图使用响应式 srcset：360w → 480w → 720w → 1080w → 1440w
- 产品页和博客：不需要 srcset，但单张图片需压缩到 80KB 以下，并加 width/height 防 CLS
- 所有图片有描述性 alt 文本
- 社交分享保留 .webp 原始大图

### Flesch 可读性
- 目标 60-70
- 多篇文章 < 30（太难看懂），需要拆长句、降术语

## 分析流程

1. 内容分析 → `content_scorer.py`（禁止手写临时脚本）
2. 可读性 → `readability_scorer.py`
3. SEO → `seo_quality_rater.py`
4. E-E-A-T → `eeat-framework.md` 逐项检查
5. 改代码前先让我确认

## 工作规范

- 提交信息用中文
- 改动范围要小，一次只改一个功能
- 报告评分时必须跑标准工具，不凭感觉打分
