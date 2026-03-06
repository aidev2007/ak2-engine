---
layout: layouts/base.njk
title: "card-kinetic セクション"
navBg: "solid"
sections:
  - type: article
    category: "YAML SECTIONS"
    title: "card-kinetic セクション"
    lead: "ホバーで 3D ティルト・グレア・パララックスが動作するキネティックカードグリッド。"
---

[← セクションタイプ一覧](/docs/yaml-sections/)

---

## 概要

`type: card-kinetic` は `kineticCard` と `kineticCardGrid` マクロを使い、3D ティルトインタラクションを持つカードをグリッド状に並べます。ホバー時にカードが 3D 回転し、グレア（光の反射）と画像パララックスが動作します。ポートフォリオや作品紹介に適しています。

---

## 見た目のイメージ

```
┌─────────────────────────────────────┐
│  [section-header]                                                        │
│  ┌──────────────┐  ┌──────────────┐      │
│  │   [画像]                   │  │   [画像]                   │      │
│  │  タイトル                  │  │  タイトル                  │      │
│  │ 本文テキスト               │  │ 本文テキスト               │      │
│  │ [リンク →]                │  │ [リンク →]                │      │
│  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────┘
ホバー時: 3D 回転 + 光沢（グレア）+ 画像パララックス
```

---

## パラメータ

| パラメータ | 必須 | 型 | 説明 |
|---|---|---|---|
| `type` | ✅ | string | `"card-kinetic"` 固定 |
| `sectionClass` | — | string | 外側 `<section>` への追加 CSS クラス（省略時: `"section--white"`） |
| `heading` | — | string | sectionHeader の上段テキスト（省略時はヘッダーなし） |
| `subheading` | — | string | sectionHeader の下段テキスト |
| `dark` | — | boolean | sectionHeader をダーク表示にするか（省略時: `false`） |
| `minWidth` | — | string | カードの最小幅（省略時: `"300px"`） |
| `gap` | — | string | カード間隔（省略時: `"40px"`） |
| `items` | ✅ | array | カードデータ配列 |

### items 配列の各要素

| キー | 必須 | 型 | 説明 |
|---|---|---|---|
| `title` | ✅ | string | カードタイトル |
| `img` | — | string | 画像 URL（省略時: 画像なし） |
| `imgAlt` | — | string | 画像 alt テキスト（省略時: `title` と同値） |
| `link` | — | string | リンク先 URL（省略時: リンクなし） |
| `linkText` | — | string | リンクテキスト（省略時: `"詳しく見る →"`） |
| `dark` | — | boolean | ダークテーマ（省略時: `false`） |
| `body` | ✅ | string | カード本文テキスト（HTML 使用可） |

---

## 使用例

```yaml
sections:
  - type: card-kinetic
    sectionClass: "section--white"
    heading: "WORKS"
    subheading: "制作実績"
    items:
      - title: "Architecture"
        img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600"
        link: "/works/architecture/"
        body: "複雑な状態管理をシンプルなクラスにカプセル化し、堅牢で拡張性の高いフロントエンド基盤を構築します。"
      - title: "Motion Design"
        img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600"
        link: "/works/motion/"
        body: "物理演算に基づいた自然なイージングと、残像効果を用いた視覚的なフィードバックを実装します。"
```

---

## 注意

- `item.body` は HTML 使用可（`| safe` フィルター適用済み）
- `item.dark: true` を指定するとカードがダークテーマになります
- `minWidth` を小さくするとモバイルでも多列表示になります

---

**[← セクションタイプ一覧](/docs/yaml-sections/)** | **[↑ 目次](/docs/)**
