---
layout: layouts/base.njk
title: "concept セクション"
navBg: "solid"
sections:
  - type: article
    category: "YAML SECTIONS"
    title: "concept セクション"
    lead: "画像とテキストを横並びにしたコンセプトブロック。フロートアニメーション付き。詳細紹介に。"
---

[← セクションタイプ一覧](/docs/yaml-sections/)

---

## 概要

`type: concept` は `conceptBlock` マクロを使い、フロートアニメーション付きの画像とテキストエリアを横並びで表示します。機能・コンセプト・事例の詳細紹介に適しています。`items` 配列に複数指定することで縦に積み重ねられます。

---

## 見た目のイメージ

```
┌───────────────────────────────────┐
│  [section-header]                                                    │
│  ┌──────────────┐  ┌──────────────┐  │
│  │   画像                     │  │ 見出し（item.title）       │  │
│  │ (フロート)                 │  │ 本文テキスト               │  │
│  │                            │  │ (body, HTML使用可)         │  │
│  │                            │  │ [note テキスト]            │  │
│  └──────────────┘  └──────────────┘  │
└───────────────────────────────────┘
item.pos: "right" の場合、画像が右・テキストが左に反転する。
```

---

## パラメータ

| パラメータ | 必須 | 型 | 説明 |
|---|---|---|---|
| `type` | ✅ | string | `"concept"` 固定 |
| `sectionClass` | — | string | 外側 `<section>` への追加 CSS クラス（省略時: `"section--concept-detail"`） |
| `heading` | — | string | sectionHeader の上段テキスト（省略時はヘッダーなし） |
| `subheading` | — | string | sectionHeader の下段テキスト |
| `dark` | — | boolean | sectionHeader をダーク表示にするか（省略時: `false`） |
| `items` | ✅ | array | コンセプトブロックデータ配列 |

### items 配列の各要素

| キー | 必須 | 型 | 説明 |
|---|---|---|---|
| `image` | ✅ | string | 画像 URL |
| `alt` | — | string | 画像 alt テキスト（省略時: `item.title`） |
| `title` | ✅ | string | 見出しテキスト |
| `body` | ✅ | string | 本文テキスト（HTML 使用可） |
| `note` | — | string | 補足テキスト（省略可） |
| `pos` | — | string | レイアウト方向: `"left"`（デフォルト）または `"right"` |
| `delay` | — | string | フロートアニメーション遅延（例: `"0.2s"`、省略可） |

---

## 使用例

### 1つのコンセプトブロック

```yaml
sections:
  - type: concept
    items:
      - image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80"
        alt: "Plugin Architecture"
        title: "Plugin-First Design"
        body: "すべての機能はプラグインとして実装され、独立してテスト・配布できます。"
```

### 交互レイアウト（left / right 交互）

```yaml
sections:
  - type: concept
    items:
      - image: "https://example.com/image1.jpg"
        title: "第1のコンセプト"
        body: "説明文1"
        pos: "left"
      - image: "https://example.com/image2.jpg"
        title: "第2のコンセプト"
        body: "説明文2"
        pos: "right"
        delay: "0.2s"
```

---

**[← セクションタイプ一覧](/docs/yaml-sections/)** | **[↑ 目次](/docs/)**
