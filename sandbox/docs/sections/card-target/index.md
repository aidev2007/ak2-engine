---
layout: layouts/base.njk
title: "card-target セクション"
navBg: "solid"
sections:
  - type: article
    doc_group: "YAML SECTIONS"
    title: "card-target セクション"
    lead: "アイコン（絵文字 or Lucide）・タイトル・説明文の縦積みカードグリッド。ターゲットユーザー紹介に。"
---

[← セクションタイプ一覧](/docs/yaml-sections/)

---

## 概要

`type: card-target` は `targetCard` マクロを使い、アイコン（絵文字または Lucide アイコン）＋タイトル＋説明文の縦積みカードをグリッド状に並べます。ターゲットユーザー・利用シーン・対象者を視覚的に紹介するのに適しています。

---

## 見た目のイメージ

```
┌─────────────────────────────────┐
│  [section-header]                                                │
│  ┌──────┐  ┌──────┐  ┌──────┐            │
│  │  🤖        │  │  🏗️      │  │  🎨        │  ← icon   │
│  │Title       │  │Title       │  │Title       │            │
│  │ desc       │  │ desc       │  │ desc       │            │
│  └──────┘  └──────┘  └──────┘            │
└─────────────────────────────────┘
```

---

## パラメータ

| パラメータ | 必須 | 型 | 説明 |
|---|---|---|---|
| `type` | ✅ | string | `"card-target"` 固定 |
| `sectionClass` | — | string | 外側 `<section>` への追加 CSS クラス（省略時: `"section--target"`） |
| `heading` | — | string | sectionHeader の上段テキスト（省略時はヘッダーなし） |
| `subheading` | — | string | sectionHeader の下段テキスト |
| `dark` | — | boolean | sectionHeader をダーク表示にするか（省略時: `false`） |
| `items` | ✅ | array | カードデータ配列 |

### items 配列の各要素

| キー | 必須 | 型 | 説明 |
|---|---|---|---|
| `icon` | ✅ | string | 絵文字（`"🤖"`）または Lucide アイコン名 |
| `title` | ✅ | string | ターゲット名（`<br>` による改行可） |
| `desc` | ✅ | string | ターゲットの説明文 |

---

## 使用例

```yaml
sections:
  - type: card-target
    sectionClass: "section--target"
    heading: "FOR WHO"
    subheading: "対象ユーザー"
    items:
      - icon: "🤖"
        title: "AI Engineer"
        desc: "LLMを活用してWebサイトを構築するAIエンジニア"
      - icon: "🏗️"
        title: "Site Builder"
        desc: "テンプレートを活用してサイトを量産する制作者"
      - icon: "🎨"
        title: "Designer"
        desc: "デザインとコードを両立させたいクリエイター"
```

---

**[← セクションタイプ一覧](/docs/yaml-sections/)** | **[↑ 目次](/docs/)**
