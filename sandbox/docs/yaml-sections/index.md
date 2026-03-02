---
layout: layouts/base.njk
title: "YAMLセクション アーキテクチャ"
navBg: "solid"
sections:
  - type: article
    category: "AK²ENGINE DOCS"
    title: "YAMLセクション アーキテクチャ"
    lead: "sections: 配列をフロントマターに記述するだけで、HTMLを一行も書かずにページを構成できる新設計。"
---

[← 目次に戻る](/docs/)

---

## 概要

v0.1.3 から導入された **YAMLセクション駆動アーキテクチャ** は、`.md` ファイルのフロントマターに `sections:` 配列を記述することで、ページ全体のレイアウトを宣言的に構成できる仕組みです。

従来の書き方では `.md` ファイルの本文に HTML タグや Nunjucks マクロが混在していましたが、この設計により **コンテンツ作成者は YAML と Markdown だけでリッチなページが作れる** ようになります。

---

## セクションタイプ一覧

| `type` 値 | 説明 | 主な用途 |
|---|---|---|
| `hero` | ヒーローセクション（キネティックスタイル） | ページのファーストビュー |
| `article` | 記事レイアウト（ヒーロー＋本文） | コンセプトページ・解説記事 |
| `content` | Markdown本文の埋め込み位置 | ハイブリッドページのボディ部分 |
| `feature-grid` | カテゴリーカードグリッド | ページ一覧・機能紹介 |
| `stat-grid` | ガラスカードグリッド | 統計・スペック表示 |

---

## ページパターン

### パターン1：ランディング型（sections のみ）

本文（Markdown body）を使わず、`sections:` だけでページを構成します。

{% raw %}
```yaml
---
layout: layouts/base.njk
title: "サービス紹介"
navBg: "solid"
sections:
  - type: hero
    subtitle: "OUR SERVICE"
    title: "提供サービス"
    lead: "サービスの説明文。"

  - type: feature-grid
    heading: "SERVICES"
    subheading: "サービス一覧"
    items:
      - num: "01"
        title: "Webサイト制作"
        desc: "説明文"
        href: "/service/web/"
---
```
{% endraw %}

### パターン2：記事型（sections + Markdown body）

`type: article` を使うと、ヒーローエリアとMarkdown本文がセットになります。

{% raw %}
```yaml
---
layout: layouts/base.njk
title: "コンセプト"
navBg: "solid"
sections:
  - type: article
    category: "CONCEPT"
    title: "私たちのコンセプト"
    lead: "リード文テキスト。"
---

## 見出し1

ここから Markdown で本文を書けます。

- リストも書けます
- **太字**も使えます
```
{% endraw %}

### パターン3：ハイブリッド型（sections + body 混在）

`type: content` を sections 配列に含めると、その位置に Markdown 本文が展開されます。

{% raw %}
```yaml
---
layout: layouts/base.njk
title: "会社概要"
navBg: "solid"
sections:
  - type: hero
    subtitle: "ABOUT US"
    title: "会社概要"
    lead: "私たちについてご紹介します。"

  - type: content    # ← ここにMarkdown本文が入る

  - type: feature-grid
    heading: "SERVICES"
    subheading: "提供サービス"
    items: [...]
---

## Markdown 本文

この部分が type: content の位置に展開されます。
```
{% endraw %}

> **ヒント:** セクションが1つだけの場合（`type: content` のみ）は `sections:` の記述自体が不要です。`sections:` がない場合、`base.njk` は従来通り `{% raw %}{{ content | safe }}{% endraw %}` で本文をそのまま展開します。

---

## セクション個別エフェクト

各セクションに背景エフェクトを適用できます。エフェクトはそのセクション内にのみ表示され、他のセクションには影響しません。

### 基本記法（文字列）

{% raw %}
```yaml
sections:
  - type: hero
    title: "タイトル"
    effects:
      - SnowEffect
      - FireflyEffect
```
{% endraw %}

### パラメータ指定記法（オブジェクト）

{% raw %}
```yaml
sections:
  - type: hero
    title: "タイトル"
    effects:
      - name: SnowEffect
        count: 20        # 粒子数（デフォルト60）
        alpha: 1.5       # 明るさ係数（デフォルト1.0）
      - name: FireflyEffect
        interactive: false  # マウス反応なし
```
{% endraw %}

### エフェクトの重ねがけ

複数エフェクトを重ねる場合、`mix-blend-mode: screen` により記述順に関わらず両方が正しく表示されます。SnowEffect → FireflyEffect でも FireflyEffect → SnowEffect でも同じ結果になります。

---

## hero セクションのパラメータ

| パラメータ | 必須 | 説明 |
|---|---|---|
| `type` | ✅ | `"hero"` 固定 |
| `subtitle` | ✅ | 英語小見出し（Roboto Mono・シアン色） |
| `title` | ✅ | 大見出し |
| `lead` | ✅ | リード文（HTML可） |
| `note` | — | infoアイコン付きメモ |
| `extraClass` | — | `<section>` への追加クラス |
| `effects` | — | 背景エフェクト配列（文字列またはオブジェクト形式） |

---

## article セクションのパラメータ

| パラメータ | 必須 | 説明 |
|---|---|---|
| `type` | ✅ | `"article"` 固定 |
| `category` | — | カテゴリーラベル（モノスペース・大文字） |
| `title` | — | 記事タイトル（省略時はページ `title` を使用） |
| `lead` | — | タイトル下サブテキスト |

---

## feature-grid セクションのパラメータ

| パラメータ | 必須 | 説明 |
|---|---|---|
| `type` | ✅ | `"feature-grid"` 固定 |
| `heading` | — | セクション英語ラベル |
| `subheading` | — | セクション日本語見出し |
| `linkText` | — | カードのリンクテキスト（デフォルト: `"テストページを開く →"`） |
| `items` | ✅ | カード配列。各要素: `{num, title, desc, href, extraClass}` |

---

## stat-grid セクションのパラメータ

| パラメータ | 必須 | 説明 |
|---|---|---|
| `type` | ✅ | `"stat-grid"` 固定 |
| `heading` | — | セクション英語ラベル |
| `subheading` | — | セクション日本語見出し |
| `items` | ✅ | カード配列。各要素: `{title, desc}` |

---

## ベースレイアウト（base.njk）の動作

`base.njk` は `sections:` の有無で2つのモードで動作します：

{% raw %}
```nunjucks
{% if sections %}
  {% for section in sections %}
    {% if section.type == "content" %}
      {{ content | safe }}
    {% else %}
      {% include "sections/" + section.type + ".njk" ignore missing %}
    {% endif %}
  {% endfor %}
{% else %}
  {{ content | safe }}  {# 後方互換：sections がない場合は従来通り #}
{% endif %}
```
{% endraw %}

**後方互換性：** `sections:` が未指定のページは従来通り動作します。既存ページの修正は不要です。

---

**前のページ:** [← ベースレイアウト](/docs/base-layout/) | **[↑ 目次](/docs/)** | **次のページ:** [レイアウトプラグイン →](/docs/layout-plugins/)
