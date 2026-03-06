---
layout: layouts/base.njk
title: "card-feature セクション"
navBg: "solid"
sections:
  - type: article
    category: "YAML SECTIONS"
    title: "card-feature セクション"
    lead: "Lucide アイコン付きフィーチャーカードのグリッドを出力するセクション。機能紹介・特徴列挙に。"
---

[← セクションタイプ一覧](/docs/yaml-sections/)

---

## 概要

`type: card-feature` は `featureItem` マクロを使い、Lucide アイコン＋タイトル＋テキストの縦積みカードをグリッド状に並べます。白背景の明るいセクションで機能・特徴を列挙するのに適しています。

---

## 見た目のイメージ

```
┌─────────────────────────────────────┐
│  [section-header: heading / subheading]                                  │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  │
│  │ Icon       │  │ Icon       │  │ Icon       │  │ Icon       │  │
│  │Title       │  │Title       │  │Title       │  │Title       │  │
│  │ text       │  │ text       │  │ text       │  │ text       │  │
│  └──────┘  └──────┘  └──────┘  └──────┘  │
└─────────────────────────────────────┘
```

カード数に応じてグリッドが自動で折り返します。

---

## パラメータ

| パラメータ | 必須 | 型 | 説明 |
|---|---|---|---|
| `type` | ✅ | string | `"card-feature"` 固定 |
| `sectionClass` | — | string | 外側 `<section>` への追加 CSS クラス（省略時: `"section--white"`） |
| `heading` | — | string | sectionHeader の上段テキスト（省略時はヘッダーなし） |
| `subheading` | — | string | sectionHeader の下段テキスト |
| `dark` | — | boolean | sectionHeader をダーク表示にするか（省略時: `false`） |
| `items` | ✅ | array | カードデータ配列 |

### items 配列の各要素

| キー | 必須 | 型 | 説明 |
|---|---|---|---|
| `icon` | ✅ | string | Lucide アイコン名（例: `"zap"`, `"layers"`, `"shield"`） |
| `title` | ✅ | string | カードタイトル |
| `text` | ✅ | string | カード本文テキスト |

---

## 使用例

```yaml
sections:
  - type: card-feature
    sectionClass: "section--white"
    heading: "FEATURES"
    subheading: "主な機能"
    items:
      - icon: "zap"
        title: "High Performance"
        text: "高速なレンダリングエンジンで、スムーズなアニメーションを実現します。"
      - icon: "layers"
        title: "Plugin Architecture"
        text: "独立したプラグインシステムで、必要な機能だけを組み合わせられます。"
      - icon: "code-2"
        title: "Clean API"
        text: "シンプルなマクロAPIで、複雑なUIを数行で実装できます。"
      - icon: "shield"
        title: "Type Safe"
        text: "明確なインターフェース仕様で、予測可能な動作を保証します。"
```

---

## 注意

- `icon` は [Lucide アイコン](https://lucide.dev/) のアイコン名を指定してください
- グリッドの列数は CSS（`card-grid` クラス）によって自動調整されます
- `heading` を省略するとセクションヘッダー全体が非表示になります

---

**[← セクションタイプ一覧](/docs/yaml-sections/)** | **[↑ 目次](/docs/)**
