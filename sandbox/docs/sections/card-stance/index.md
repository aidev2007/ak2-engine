---
layout: layouts/base.njk
title: "card-stance セクション"
navBg: "solid"
sections:
  - type: article
    category: "YAML SECTIONS"
    title: "card-stance セクション"
    lead: "アイコン・タイトル・説明文を横並びにしたスタンスカードのリスト。制作方針・ポリシー紹介に。"
---

[← セクションタイプ一覧](/docs/yaml-sections/)

---

## 概要

`type: card-stance` は `stanceCard` マクロを使い、Lucide アイコン＋タイトル＋本文の横並びカードをリスト状に並べます。制作方針・ブランドスタンス・ポリシーの表明に適しています。

---

## 見た目のイメージ

```
┌─────────────────────────────────────────────┐
│  [section-header]                            │
│  ┌──────────────────────────────────────┐   │
│  │ [icon] │ タイトル                     │   │
│  │        │ 本文テキスト...              │   │
│  └──────────────────────────────────────┘   │
│  ┌──────────────────────────────────────┐   │
│  │ [icon] │ タイトル                     │   │
│  │        │ 本文テキスト...              │   │
│  └──────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

---

## パラメータ

| パラメータ | 必須 | 型 | 説明 |
|---|---|---|---|
| `type` | ✅ | string | `"card-stance"` 固定 |
| `sectionClass` | — | string | 外側 `<section>` への追加 CSS クラス（省略時: `"section--stance"`） |
| `heading` | — | string | sectionHeader の上段テキスト（省略時はヘッダーなし） |
| `subheading` | — | string | sectionHeader の下段テキスト |
| `dark` | — | boolean | sectionHeader をダーク表示にするか（省略時: `false`） |
| `items` | ✅ | array | カードデータ配列 |

### items 配列の各要素

| キー | 必須 | 型 | 説明 |
|---|---|---|---|
| `icon` | ✅ | string | Lucide アイコン名（例: `"shield-off"`, `"book-open"`） |
| `title` | ✅ | string | スタンスのタイトル |
| `body` | ✅ | string | スタンスの説明文 |

---

## 使用例

```yaml
sections:
  - type: card-stance
    sectionClass: "section--stance"
    heading: "OUR STANCE"
    subheading: "私たちのスタンス"
    items:
      - icon: "shield-off"
        title: "「できない」のではなく「あえて選ばない」"
        body: "数ページの名刺サイトに複雑な CMS は不要です。適切な規模の技術を選びます。"
      - icon: "book-open"
        title: "仕様書を読めば動かせる"
        body: "ソースコードを読まなくても API リファレンスだけで実装が完結します。"
```

---

**[← セクションタイプ一覧](/docs/yaml-sections/)** | **[↑ 目次](/docs/)**
