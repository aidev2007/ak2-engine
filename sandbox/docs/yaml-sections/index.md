---
layout: layouts/base.njk
title: "YAMLセクション アーキテクチャ"
navBg: "solid"
sections:
  - type: article
    doc_group: "AK²ENGINE DOCS"
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

### レイアウト系

| `type` 値 | 説明 | 主な用途 |
|---|---|---|
| [`hero`](/docs/sections/hero/) | ヒーローセクション（キネティックスタイル）。subtitle・title・lead・エフェクト合成対応 | ページのファーストビュー |
| [`hero-particle`](/docs/sections/hero-particle/) | テキストをパーティクル化してマウスインタラクション付きで表示 | インタラクティブなファーストビュー |
| [`article`](/docs/sections/article/) | 記事レイアウト（パンくず・カテゴリ・タイトル・本文・TOC） | ドキュメント・コンセプトページ |
| [`content`](/docs/sections/content/) | Markdown 本文の差し込み位置。ハイブリッドページで使用 | セクション間に本文を配置 |

### カード・グリッド系

| `type` 値 | 説明 | 主な用途 |
|---|---|---|
| [`feature-grid`](/docs/sections/feature-grid/) | リンク付きカテゴリーカードグリッド（白背景） | ページ一覧・機能紹介 |
| [`stat-grid`](/docs/sections/stat-grid/) | ガラスカードグリッド（ダーク背景） | 統計・スペック・機能説明 |
| [`card-feature`](/docs/sections/card-feature/) | Lucide アイコン付きフィーチャーカードグリッド（白背景） | 機能・特徴の列挙 |
| [`card-philosophy`](/docs/sections/card-philosophy/) | 大きな文字・用語・説明文の哲学カードグリッド（ダーク背景） | 理念・ブランドコンセプト |
| [`card-stance`](/docs/sections/card-stance/) | アイコン＋横並びスタンスカードリスト | 制作方針・ポリシー |
| [`card-target`](/docs/sections/card-target/) | アイコン（絵文字 or Lucide）付きターゲットカードグリッド | 対象ユーザー・利用シーン |
| [`card-service`](/docs/sections/card-service/) | タイトル・タグ・価格・説明・補足付きサービスカードグリッド | 料金プラン・サービスメニュー |
| [`card-kinetic`](/docs/sections/card-kinetic/) | 3D ティルト・グレア・パララックス付きキネティックカードグリッド | ポートフォリオ・作品紹介 |

### コンテンツ・コンポーネント系

| `type` 値 | 説明 | 主な用途 |
|---|---|---|
| [`concept`](/docs/sections/concept/) | 画像＋テキスト横並び。フロートアニメーション付き | 特徴・事例の詳細紹介 |
| [`cta`](/docs/sections/cta/) | タイトル・テキスト・ボタンの中央揃え CTA | ページ末尾への誘導 |
| [`faq`](/docs/sections/faq/) | `<details>` アコーディオン形式の Q&A リスト | よくある質問 |
| [`contact`](/docs/sections/contact/) | お名前・メール・本文・送信ボタン付きコンタクトフォーム | お問い合わせ窓口 |

各セクションタイプのパラメーター詳細・使用例は個別ページを参照してください。

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
    doc_group: "CONCEPT"
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

### パターン4：HTMLタグ混在型

**HTMLを一行も書かずにページを構成できますが、HTMLタグを使いたければ使えます。**

YAML パラメーターの値（`lead:` 等）にも、Markdown 本文にも、HTMLタグを直接書けます。

{% raw %}
```yaml
---
layout: layouts/base.njk
title: "お問い合わせ"
sections:
  - type: hero
    subtitle: "CONTACT"
    title: "お問い合わせ"
    lead: "お気軽に <a href='mailto:info@example.com'>メール</a> でご連絡ください。"
    # ↑ lead: の値にHTMLタグを直接書ける
---

## 本文もHTML混在OK

通常の Markdown と HTML を自由に混ぜられます。

<div class="my-callout">
  <strong>重要事項</strong>をカスタム HTML でハイライト表示。
</div>

---

上のブロックの前後は普通の Markdown で書けます。
```
{% endraw %}

> **Nunjucks 構文を使う場合**: `.md` ファイル内でテンプレート構文（変数展開やブロックタグ）を使うときは、`raw`/`endraw` ブロックでラップしてください。このドキュメント自体がその方法で書かれています。

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
