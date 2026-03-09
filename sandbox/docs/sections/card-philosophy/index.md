---
layout: layouts/base.njk
title: "card-philosophy セクション"
navBg: "solid"
sections:
  - type: article
    doc_group: "YAML SECTIONS"
    title: "card-philosophy セクション"
    lead: "大きな文字・用語・説明文を縦積みにした哲学カードのグリッド。ダーク背景の理念紹介に。"
---

[← セクションタイプ一覧](/docs/yaml-sections/)

---

## 概要

`type: card-philosophy` は `philosophyCard` マクロを使い、大きなキャラクター文字（char）＋用語（term）＋説明文（desc）のカードをグリッド状に並べます。ダーク背景での理念・哲学・ブランドコンセプトの紹介に適しています。

---

## 見た目のイメージ

```
┌──────────────────────────────────┐（ダーク背景）
│  [section-header: heading / subheading]                            │
│  ┌──────┐  ┌──────┐  ┌──────┐              │
│  │  A         │  │  K         │  │  2         │  ← char     │
│  │ term       │  │ term       │  │ term       │              │
│  │ desc       │  │ desc       │  │ desc       │              │
│  └──────┘  └──────┘  └──────┘              │
└──────────────────────────────────┘
```

`char` には1文字のアルファベットや数字（"01" 等）を指定します。

---

## パラメータ

| パラメータ | 必須 | 型 | 説明 |
|---|---|---|---|
| `type` | ✅ | string | `"card-philosophy"` 固定 |
| `sectionClass` | — | string | 外側 `<section>` への追加 CSS クラス（省略時: `"section--dark"`） |
| `heading` | — | string | sectionHeader の上段テキスト（省略時はヘッダーなし） |
| `subheading` | — | string | sectionHeader の下段テキスト |
| `items` | ✅ | array | カードデータ配列 |

### items 配列の各要素

| キー | 必須 | 型 | 説明 |
|---|---|---|---|
| `char` | ✅ | string | 大きく表示する文字（例: `"A"`, `"01"`） |
| `term` | ✅ | string | 用語・コンセプト名 |
| `desc` | ✅ | string | 説明文 |

---

## 使用例

```yaml
sections:
  - type: card-philosophy
    sectionClass: "section--dark"
    heading: "OUR PHILOSOPHY"
    subheading: "私たちの哲学"
    items:
      - char: "A"
        term: "Art（感性・技巧）"
        desc: "デザインとして表出する感性と技術の結晶。"
      - char: "K"
        term: "Knowledge（知識・論理）"
        desc: "構造・仕様・設計への深い理解。"
      - char: "2"
        term: "Two in One（統合）"
        desc: "感性と論理が一体となったもの。"
```

---

**[← セクションタイプ一覧](/docs/yaml-sections/)** | **[↑ 目次](/docs/)**
