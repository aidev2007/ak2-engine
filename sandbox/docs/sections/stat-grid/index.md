---
layout: layouts/base.njk
title: "stat-grid セクション"
navBg: "solid"
sections:
  - type: article
    doc_group: "YAML SECTIONS"
    title: "stat-grid セクション"
    lead: "ガラスカードのグリッド。統計数値・仕様一覧・機能リストをダーク背景で表示。"
---

[← セクションタイプ一覧](/docs/yaml-sections/)

---

## 概要

`type: stat-grid` はダーク背景（`section--dark`）にガラスエフェクト（`glass-card glass-card--dark`）のカードをグリッドで並べるセクションです。リンクなしの情報表示用で、タイトルと本文テキストで構成されます。本文には HTML タグが使用できます。layout テストページのプラグイン仕様一覧や、トップページの統計カードがこの実装例です。

---

## 見た目のイメージ

```
ダーク背景セクション（グラスモーフィズム）
┌─────────────────────────────────────┐
│  [英語ラベル]                                                            │
│  日本語見出し                                                            │
│                                                                          │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  │
│  │ カードタイトル   │  │ カードタイトル   │  │ カードタイトル   │  │
│  │                  │  │                  │  │                  │  │
│  │ 本文テキスト。   │  │ 本文テキスト。   │  │ 本文テキスト。   │  │
│  │ HTMLタグ可。     │  │ HTMLタグ可。     │  │ HTMLタグ可。     │  │
│  └─────────┘  └─────────┘  └─────────┘  │
│   ↑ glass-card glass-card--dark（半透明）                               │
└─────────────────────────────────────┘
```

---

## パラメータ

### セクションパラメータ

| パラメータ | 必須 | 型 | 説明 |
|---|---|---|---|
| `type` | ✅ | string | `"stat-grid"` 固定 |
| `heading` | — | string | セクション英語ラベル（sectionHeader 上段） |
| `subheading` | — | string | セクション日本語見出し（sectionHeader 下段） |
| `items` | ✅ | array | カード配列（後述） |

### items 各要素

| キー | 必須 | 説明 |
|---|---|---|
| `title` | ✅ | カードタイトル |
| `text` | — | カード本文（HTML タグ使用可） |
| `titleClass` | — | `card-title` への追加 CSS クラス（省略可） |
| `extraClass` | — | `glass-card` への追加 CSS クラス（省略可） |

---

## 使用例

### 基本

{% raw %}
```yaml
sections:
  - type: stat-grid
    heading: "LAYOUT PLUGINS"
    subheading: "レイアウトプラグイン"
    items:
      - title: "layout-header-nav"
        text: "グローバルヘッダー。スクロールで <code>is-scrolled</code> クラスが付与されます。"
      - title: "layout-footer-kinetic"
        text: "グローバルフッター。<code>site.footerDesc</code> でカスタマイズ。"
```
{% endraw %}

### HTML タグを使った本文

`text:` の値には HTML タグが使えます。`<br>` で改行、`<code>` でコードスタイルを適用できます。

{% raw %}
```yaml
items:
  - title: "27 Effects"
    text: "Aurora / Snow / Sakura など<br>全 <strong>27種</strong> の背景エフェクト"
    titleClass: "card-title--accent"
```
{% endraw %}

### feature-grid との使い分け

| | feature-grid | stat-grid |
|---|---|---|
| 背景 | 白（`section--white`） | ダーク（`section--dark`） |
| カード | リンク付き `<a>` | リンクなし `<div>` |
| 用途 | ページ一覧・ナビゲーション | 仕様・統計・機能説明 |

---

**[← セクションタイプ一覧](/docs/yaml-sections/)** | **[↑ 目次](/docs/)**
