---
layout: layouts/base.njk
title: "feature-grid セクション"
navBg: "solid"
sections:
  - type: article
    doc_group: "YAML SECTIONS"
    title: "feature-grid セクション"
    lead: "リンク付きカテゴリーカードのグリッド。ページ一覧・機能紹介に使用する白背景セクション。"
---

[← セクションタイプ一覧](/docs/yaml-sections/)

---

## 概要

`type: feature-grid` は白背景（`section--white`）にリンク付きカードをグリッドで並べるセクションです。各カードは番号ラベル・タイトル・説明文・リンクテキストで構成され、クリックすると `href` へ遷移します。sandbox のトップページのページ一覧カードがこの実装例です。

---

## 見た目のイメージ

```
白背景セクション
┌─────────────────────────────────────┐
│  [英語ラベル]                                                            │
│  日本語見出し                                                            │
│                                                                          │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  │
│  │ 01               │  │ 02               │  │ 03               │  │
│  │ カードタイトル   │  │ カードタイトル   │  │ カードタイトル   │  │
│  │                  │  │                  │  │                  │  │
│  │ 説明文が入る     │  │ 説明文が入る     │  │ 説明文が入る     │  │
│  │                  │  │                  │  │                  │  │
│  │ リンクテキスト→ │  │ リンクテキスト→ │  │ リンクテキスト→ │  │
│  └─────────┘  └─────────┘  └─────────┘  │
└─────────────────────────────────────┘
```

カード数に応じて自動的に折り返しグリッドになります。

---

## パラメータ

### セクションパラメータ

| パラメータ | 必須 | 型 | 説明 |
|---|---|---|---|
| `type` | ✅ | string | `"feature-grid"` 固定 |
| `heading` | — | string | セクション英語ラベル（sectionHeader 上段） |
| `subheading` | — | string | セクション日本語見出し（sectionHeader 下段） |
| `linkText` | — | string | カードのリンクテキスト（デフォルト: `"テストページを開く →"`） |
| `items` | ✅ | array | カード配列（後述） |

### items 各要素

| キー | 必須 | 説明 |
|---|---|---|
| `num` | — | 番号ラベル（例: `"01"`） |
| `title` | ✅ | カードタイトル |
| `desc` | — | カード説明文 |
| `href` | ✅ | リンク先 URL |
| `extraClass` | — | `<a>` への追加 CSS クラス（カード個別のスタイル調整に） |

---

## 使用例

### 基本（ページ一覧）

{% raw %}
```yaml
sections:
  - type: feature-grid
    heading: "SANDBOX PAGES"
    subheading: "テストページ一覧"
    linkText: "ページを開く →"
    items:
      - num: "01"
        title: "Background Effects"
        desc: "27種のキャンバスエフェクトをテスト。"
        href: "/effects/"
      - num: "02"
        title: "Block Plugins"
        desc: "ブロックコンポーネントの動作確認。"
        href: "/blocks/"
```
{% endraw %}

### extraClass でカード個別にスタイルを当てる

{% raw %}
```yaml
items:
  - num: "01"
    title: "Effects"
    desc: "エフェクトプラグイン"
    href: "/effects/"
    extraClass: "parts-category-card--effects"
```
{% endraw %}

CSS で `.parts-category-card--effects` に色やアイコンを定義することで、カードに個性を持たせられます。

---

**[← セクションタイプ一覧](/docs/yaml-sections/)** | **[↑ 目次](/docs/)**
