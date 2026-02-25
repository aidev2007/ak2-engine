# @ak2lab/engine — Plugins API Reference

> **このドキュメントの対象読者**
> 店舗サイト（`ak2-official` 等）を構築するAI・開発者向けのリファレンスです。
> エンジンの内部実装を読まなくても、このドキュメントだけでサイト構築が完結するよう設計されています。

---

## 目次

1. [パッケージ構成](#1-パッケージ構成)
2. [クイックスタート（店舗サイトの初期設定）](#2-クイックスタート)
3. [データスキーマ（_data/ ファイル群）](#3-データスキーマ)
4. [ベースレイアウト（base.njk）](#4-ベースレイアウト)
5. [レイアウトプラグイン](#5-レイアウトプラグイン)
6. [ブロックプラグイン](#6-ブロックプラグイン)
7. [エフェクトプラグイン](#7-エフェクトプラグイン)
8. [ユーティリティマクロ（components/macros.njk）](#8-ユーティリティマクロ)
9. [AK²Engine — エフェクト登録パターン](#9-ak²engine--エフェクト登録パターン)
10. [ページの作成方法（.md形式の推奨）](#10-ページの作成方法md形式の推奨)
11. [Sandboxでの確認とビルドコマンド](#11-sandboxでの確認とビルドコマンド)
12. [CSS カスタマイズ](#12-css-カスタマイズ)
13. [Eleventy 設定サンプル（.eleventy.js）](#13-eleventy-設定サンプル)

---

## 1. パッケージ構成

```
@ak2lab/engine
└── src/
    ├── base.css              # 設計基盤CSS（CSS変数・リセット・ユーティリティ）
    ├── core/
    │   ├── core-engine.js    # AK²Engine（Canvasエフェクト管理）★最初にバンドル
    │   ├── core-engine.css   # Canvas の固定配置スタイル
    │   ├── core-site.js      # Lucideアイコン初期化
    │   ├── card-preview.js   # [data-preview] canvas の自動初期化
    │   └── section-effects.js# [data-section-effect] canvas の rAF ループ
    └── plugins/
        ├── layout-header-kinetic/   # グローバルヘッダー
        ├── layout-footer-kinetic/   # グローバルフッター
        ├── layout-hero-kinetic/     # ヒーローセクション群
        ├── block-card-feature/      # フィーチャーカード
        ├── block-card-philosophy/   # フィロソフィーカード
        ├── block-card-sample/       # サンプルカード
        ├── block-card-service/      # サービスカード
        ├── block-card-stance/       # スタンスカード
        ├── block-card-target/       # ターゲットカード
        ├── block-concept-standard/  # 画像+テキスト コンセプトブロック
        ├── block-cta-standard/      # CTAセクション
        ├── block-faq-accordion/     # FAQアコーディオン
        ├── block-form-contact/      # コンタクトフォーム
        ├── block-imagecontent-standard/ # 画像コンテンツブロック
        └── effect-bg-*/             # 背景エフェクト（27種）
```

---

## 2. クイックスタート

### 2-1. Eleventy の依存関係に追加（将来）

```json
{
  "dependencies": {
    "@ak2lab/engine": "^0.1.0"
  }
}
```

現時点ではローカルパスを使用:

```json
{
  "dependencies": {
    "@ak2lab/engine": "file:../ak2-engine"
  }
}
```

### 2-2. ディレクトリ構成（店舗サイト）

```
my-site/
├── src/
│   ├── _data/
│   │   ├── site.json         # サイト固有メタデータ（必須）
│   │   ├── nav.json          # ナビゲーション（必須）
│   │   └── effectClasses.json# エフェクトキー→クラス名マッピング（必須）
│   ├── _includes/
│   │   └── layouts/
│   │       └── base.njk      # ベースレイアウト（サイト固有）
│   └── index.njk             # 各ページ
├── .eleventy.js
└── package.json
```

---

## 3. データスキーマ

### `src/_data/site.json`

```json
{
  "name": "サイト名",
  "sub": "サブテキスト（ヘッダーブランド名の下）",
  "fullName": "フルサイト名（SEO等に使用）",
  "description": "サイト説明文（meta description）",
  "url": "https://example.com",
  "logoHref": "/",

  "logoSvg": "<svg ...>...</svg>",
  "footerLogoSvg": "<svg ...>...</svg>",

  "footerDesc": "フッター説明文（HTML可）",
  "copyright": "Example Inc. All Rights Reserved.",
  "footerAboutLinks": [
    { "label": "About", "url": "/about/" },
    { "label": "Contact", "url": "/#contact" }
  ]
}
```

| フィールド | 必須 | 説明 |
|---|---|---|
| `name` | ✅ | ヘッダーのブランド名 |
| `sub` | ✅ | ブランド名の下のサブテキスト |
| `logoSvg` | ✅ | ヘッダー/フッターのロゴSVG（HTML文字列） |
| `logoHref` | — | ロゴのリンク先（デフォルト: `"/"`) |
| `footerLogoSvg` | — | フッター専用ロゴ（未指定時は `logoSvg` を使用） |
| `footerDesc` | — | フッターの説明文（HTML可） |
| `copyright` | — | コピーライトテキスト（年号は自動） |
| `footerAboutLinks` | — | フッターABOUTカラムのリンク配列 |

### `src/_data/nav.json`

```json
[
  { "label": "ホーム",     "url": "/",        "root": "/" },
  { "label": "サービス",   "url": "/service/", "root": "/service" },
  { "label": "お問い合わせ", "url": "/#contact", "root": "/#contact" }
]
```

| フィールド | 説明 |
|---|---|
| `label` | 表示テキスト |
| `url` | リンク先URL |
| `root` | アクティブ判定パスプレフィックス（`"/"` はトップページのみ） |

### `src/_data/effectClasses.json`

エフェクトキー（front-matter の `effects: [key]`）から JS クラス名へのマッピング。
`@ak2lab/engine/sandbox/_data/effectClasses.json` をそのままコピーして使用してください。

```json
{
  "aurora":            "AuroraEffect",
  "snow":              "SnowEffect",
  "sakura":            "SakuraEffect",
  "grid-construction": "GridConstruction",
  ...
}
```

---

## 4. ベースレイアウト

サイト固有の `src/_includes/layouts/base.njk` を作成してください。
以下がテンプレートです:

```nunjucks
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ title }} | {{ site.name }}</title>
  <meta name="description" content="{{ description | default(site.description) }}">

  <!-- Google Fonts（推奨） -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Noto+Serif+JP:wght@300;400;500;700&family=Roboto+Mono:wght@400;500;700&display=swap" rel="stylesheet">

  <!-- Lucide Icons（core-site.js が初期化） -->
  <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>

  <!-- Three.js（particles エフェクト使用時のみ） -->
  {% if useThreeJS %}
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  {% endif %}

  <link rel="stylesheet" href="/css/style.css">
</head>
<body>

  {% include "layout-header-kinetic/layout-header-kinetic.njk" %}

  {{ content | safe }}

  {% include "layout-footer-kinetic/layout-footer-kinetic.njk" %}

  <!-- バンドルJS（1ファイル） -->
  <script src="/js/site.js"></script>

  <!-- エフェクト登録（front-matter: effects: [key1, key2]） -->
  {% if effects %}
  <script>
    {% for effect in effects %}
    AK2.register(new {{ effectClasses[effect] }}());
    {% endfor %}
  </script>
  {% endif %}

  <!-- Three.js パーティクル（front-matter: useThreeJS: true） -->
  {% if useThreeJS %}
  <script>new ParticleEffect();</script>
  {% endif %}

  <!-- ロゴアニメーション（front-matter: useLogoAnimation: true） -->
  {% if useLogoAnimation %}
  <script>new LogoAnimation();</script>
  {% endif %}

</body>
</html>
```

### front-matter オプション一覧

| キー | 型 | 説明 |
|---|---|---|
| `layout` | string | `"layouts/base.njk"` |
| `title` | string | ページタイトル |
| `description` | string | meta description |
| `effects` | array | 背景エフェクトキー（例: `[snow, aurora]`） |
| `useThreeJS` | boolean | Three.js パーティクルを使用 |
| `useLogoAnimation` | boolean | SVGロゴアニメーションを起動 |
| `transparentHeader` | boolean | ページトップでヘッダーを透明化 |

---

## 5. レイアウトプラグイン

### `layout-header-kinetic`

グローバルヘッダー。`base.njk` から `{% include %}` で使用します。

```nunjucks
{% include "layout-header-kinetic/layout-header-kinetic.njk" %}
```

**動作:**
- `site.logoSvg` をロゴとして表示（`| safe` でレンダリング）
- `nav` データからメニューを生成。`page.url` と `root` を比較してアクティブ判定
- スクロール50px超で `is-scrolled` クラスを付与（CSS でスタイル変化）
- `transparentHeader: true` の場合、スクロール前は `is-transparent` クラスで透明表示

**CSS クラス:**
| クラス | 説明 |
|---|---|
| `.site-header` | ヘッダーベース（`position: fixed`） |
| `.site-header.is-scrolled` | スクロール後の背景・シャドウ |
| `.site-header.is-transparent` | ページトップ透明状態 |
| `.brand__logo-svg` | ロゴSVGの基本サイズ |
| `.nav-menu__link.is-active` | アクティブなナビリンク |

---

### `layout-footer-kinetic`

グローバルフッター。`base.njk` から `{% include %}` で使用します。

```nunjucks
{% include "layout-footer-kinetic/layout-footer-kinetic.njk" %}
```

**動作:** `site.json` の値を使ってフッターを構築（詳細は [セクション3](#3-データスキーマ) 参照）

---

### `layout-hero-kinetic` — マクロ群

```nunjucks
{% from "layout-hero-kinetic/layout-hero-kinetic.njk" import heroLogo, heroContent, heroWave, pageHero %}
```

#### `heroLogo()`

SVGロゴをフローティングアニメーション付きで表示。内容は `caller()` で渡します。

```nunjucks
{% call heroLogo() %}
  <svg ...>...</svg>
{% endcall %}
```

#### `heroContent(copies, brandName="")`

ヒーローのキャッチコピーをランダム表示します。

```nunjucks
{{ heroContent(
  copies=[
    {headline: "見出し1", en: "English tagline 1", desc: "説明文（HTML可）"},
    {headline: "見出し2", en: "English tagline 2", desc: "説明文"}
  ],
  brandName="My Brand"
) }}
```

| パラメーター | 型 | 説明 |
|---|---|---|
| `copies` | array | `{headline, en, desc}` の配列。ページ読み込み時にランダム選択 |
| `brandName` | string | ブランド名（HTML可） |

#### `heroWave(c1, c2, c3, c4, count=4)`

SVGウェーブアニメーション。ヒーローセクション下部に配置します。

```nunjucks
{{ heroWave(
  c1="rgba(2,93,204,0.05)",
  c2="rgba(2,93,204,0.10)",
  c3="rgba(0,198,255,0.05)",
  c4="#f8fafc",
  count=4
) }}
```

| パラメーター | デフォルト | 説明 |
|---|---|---|
| `c1`–`c4` | 各色 | 4層のウェーブfill色（手前→奥の順） |
| `count` | `4` | 表示するウェーブ層数（1〜4） |

#### `pageHero(subtitle, title, lead, note="", extraClass="")`

サブページ用ヒーローセクション。シングルトン（1ページ1回）。

```nunjucks
{{ pageHero(
  subtitle="ABOUT US",
  title="私たちについて",
  lead="会社の理念と歴史をご紹介します。",
  note="お問い合わせはフォームからどうぞ。",
  extraClass="section--parts-hero"
) }}
```

| パラメーター | 必須 | 説明 |
|---|---|---|
| `subtitle` | ✅ | 英語小見出し（Roboto Mono・シアン） |
| `title` | ✅ | h1 大見出し |
| `lead` | ✅ | リード文（HTML可） |
| `note` | — | infoアイコン付きメモ |
| `extraClass` | — | `<section>` への追加クラス |

---

## 6. ブロックプラグイン

### `block-card-feature` — `featureItem`

```nunjucks
{% from "block-card-feature/block-card-feature.njk" import featureItem %}

<div class="card-grid">
  {{ featureItem("zap", "高速処理", "説明文テキスト。") }}
  {{ featureItem("shield", "セキュア", "説明文テキスト。") }}
</div>
```

| パラメーター | 説明 |
|---|---|
| `icon` | Lucide アイコン名（例: `"zap"`, `"layers"`, `"code-2"`） |
| `title` | カードタイトル |
| `text` | カード本文 |

---

### `block-card-philosophy` — `philosophyCard`

```nunjucks
{% from "block-card-philosophy/block-card-philosophy.njk" import philosophyCard %}

<div class="philosophy-grid">
  {{ philosophyCard("職", "職人技", "説明文。") }}
  {{ philosophyCard("AI", "AI効率", "説明文。") }}
</div>
```

| パラメーター | 説明 |
|---|---|
| `char` | カード上部の大きな文字（1〜2文字、漢字・英字） |
| `term` | 用語・見出し |
| `desc` | 説明文 |

---

### `block-card-sample` — `sampleCard`

サンプルサイト集ページ用カード。`samples.json` のデータオブジェクトをそのまま渡します。

```nunjucks
{% from "block-card-sample/block-card-sample.njk" import sampleCard %}

<div class="samples-grid">
  {% for s in samples %}
    {{ sampleCard(s, loop.index0) }}
  {% endfor %}
</div>
```

| パラメーター | 説明 |
|---|---|
| `s` | サンプルデータオブジェクト `{title, desc, tags, url, color}` |
| `index` | ループインデックス（アニメーション遅延に使用） |

**`samples.json` スキーマ:**
```json
[
  {
    "title": "サイト名",
    "desc": "説明文",
    "tags": ["Eleventy", "CSS"],
    "url": "https://example.com",
    "color": "#025DCC"
  }
]
```

---

### `block-card-service` — `serviceCard`

```nunjucks
{% from "block-card-service/block-card-service.njk" import serviceCard %}

<div class="service-grid">
  {{ serviceCard("LP制作", "LANDING", "¥150,000〜", "説明文", "制作期間2〜3週間") }}
</div>
```

| パラメーター | 説明 |
|---|---|
| `title` | サービス名 |
| `tag` | カードバッジテキスト |
| `price` | 価格表示文字列 |
| `desc` | 説明文 |
| `note` | 注記テキスト |

---

### `block-card-stance` — `stanceCard`

```nunjucks
{% from "block-card-stance/block-card-stance.njk" import stanceCard %}

<div class="stance-list">
  {{ stanceCard("01", "コードより体験を優先する", "説明文。") }}
</div>
```

| パラメーター | 説明 |
|---|---|
| `icon` | アイコン文字（番号、絵文字、Lucideアイコン名 等） |
| `title` | スタンスの見出し |
| `body` | 説明文 |

---

### `block-card-target` — `targetCard`

```nunjucks
{% from "block-card-target/block-card-target.njk" import targetCard %}

<div class="card-grid">
  {{ targetCard("🏢", "法人・企業", "説明文。") }}
</div>
```

| パラメーター | 説明 |
|---|---|
| `icon` | アイコン（絵文字・文字） |
| `title` | ターゲット名 |
| `desc` | 説明文 |

---

### `block-concept-standard` — `conceptBlock`

画像＋テキストの横並びレイアウト。

```nunjucks
{% from "block-concept-standard/block-concept-standard.njk" import conceptBlock %}

{{ conceptBlock(
  image="/images/concept.jpg",
  alt="コンセプト画像",
  heading="見出しテキスト",
  body="<p>本文HTML。<strong>強調</strong>も使えます。</p>",
  note="補足テキスト（省略可）",
  pos="right",
  delay="0.3s"
) }}
```

| パラメーター | デフォルト | 説明 |
|---|---|---|
| `image` | — | 画像URL |
| `alt` | — | alt テキスト |
| `heading` | — | 見出し |
| `body` | — | 本文（HTML可、`\| safe` 出力） |
| `note` | `""` | 注記テキスト |
| `pos` | `"left"` | 画像位置（`"left"` / `"right"`） |
| `delay` | `"0s"` | float-animation の animation-delay |

---

### `block-cta-standard` — `ctaSection`

ページ全幅のCTAセクション。シングルトン推奨。

```nunjucks
{% from "block-cta-standard/block-cta-standard.njk" import ctaSection %}

{{ ctaSection(
  title="一緒に作りませんか？",
  text="お気軽にお問い合わせください。",
  linkUrl="/#contact",
  linkText="お問い合わせ",
  gradient="linear-gradient(135deg, #eff6ff, #f0f9ff)"
) }}
```

| パラメーター | デフォルト | 説明 |
|---|---|---|
| `title` | — | CTA見出し |
| `text` | — | 本文（HTML可） |
| `linkUrl` | — | ボタンリンク先 |
| `linkText` | — | ボタンラベル |
| `gradient` | 薄い青 | 背景グラデーション |

---

### `block-faq-accordion` — `faqItem`

```nunjucks
{% from "block-faq-accordion/block-faq-accordion.njk" import faqItem %}

<div style="max-width:800px;margin:0 auto">
  {{ faqItem("Q. 納期はどれくらいですか？", "A. 通常2〜4週間です。") }}
  {{ faqItem("Q. 修正回数に制限はありますか？", "A. 3回まで無料です。") }}
</div>
```

| パラメーター | 説明 |
|---|---|
| `q` | 質問文（`Q.` プレフィックスを含む） |
| `a` | 回答文（HTML可） |

---

### `block-form-contact` — `contactForm`

日本語コンタクトフォーム。フォームは静的（バックエンド連携別途必要）。

```nunjucks
{% from "block-form-contact/block-form-contact.njk" import contactForm %}

{# イントロテキストなし #}
{{ contactForm(action="https://formspree.io/f/xxxxx") }}

{# イントロテキストあり（callerパターン） #}
{% call contactForm(action="https://formspree.io/f/xxxxx") %}
  <p>お気軽にご連絡ください。</p>
{% endcall %}
```

| パラメーター | デフォルト | 説明 |
|---|---|---|
| `action` | `""` | `<form>` の action 属性 |

---

### `block-imagecontent-standard` — `imageContentBlock`

```nunjucks
{% from "block-imagecontent-standard/block-imagecontent-standard.njk" import imageContentBlock %}

{{ imageContentBlock(
  image="/images/photo.jpg",
  alt="写真の説明",
  headline="見出し（省略可）",
  bodyHtml="<p>本文HTML。</p>",
  delay="0.5s"
) }}
```

| パラメーター | デフォルト | 説明 |
|---|---|---|
| `image` | — | 画像URL |
| `alt` | — | alt テキスト |
| `headline` | `""` | 見出し（省略可） |
| `bodyHtml` | `""` | 本文（HTML可、`\| safe` 出力） |
| `delay` | `"0.5s"` | fade-in の animation-delay |

---

## 7. エフェクトプラグイン

### 7-1. ページ全体背景エフェクト（AK²Engine 登録）

`front-matter` の `effects` 配列でエフェクトキーを指定します。複数同時指定可能。

```yaml
---
layout: layouts/base.njk
title: My Page
effects:
  - snow
  - aurora
---
```

#### エフェクトキー一覧

| キー | クラス名 | 説明 |
|---|---|---|
| `aurora` | `AuroraEffect` | オーロラ風グラデーション波 |
| `cherry-blossom` | `CherryBlossomEffect` | 桜の花びら |
| `cloud` | `CloudEffect` | 雲の流れ |
| `ember` | `EmberEffect` | 炎の火の粉 |
| `firefly` | `FireflyEffect` | ホタルの光跡（オフスクリーンCanvas） |
| `grid-construction` | `GridConstruction` | グリッド展開アニメーション★ |
| `leaf` | `LeafEffect` | 葉が揺れる |
| `leaf-fall` | `LeafFallEffect` | 葉の落下 |
| `lightning` | `LightningEffect` | 稲妻 |
| `lines` | `GridEffect` | ライングリッド |
| `maple-leaves` | `MapleLeafEffect` | もみじ |
| `momiji` | `MomijiEffect` | もみじ（別バリエーション） |
| `particles` | `ParticleEffect` | ※ Three.js（`useThreeJS: true` を使用） |
| `projector-flicker` | `ProjectorFlickerEffect` | 古い映写機のフリッカー |
| `rain` | `RainEffect` | 雨 |
| `ripple` | `RippleEffect` | 水面の波紋 |
| `sakura` | `SakuraEffect` | 桜の花びら（フル） |
| `shimmer` | `ShimmerEffect` | キラキラ |
| `snow` | `SnowEffect` | 雪 |
| `sparks` | `SparksEffect` | 火花 |
| `stars` | `StarFieldEffect` | 星空 |
| `star-speed` | `StarSpeedEffect` | 星が流れる |
| `status-up` | `StatusUpEffect` | ゲーム風ステータスアップ |
| `steam` | `SteamEffect` | 湯気 |
| `vintage-film` | `VintageFilmEffect` | フィルムグレイン |
| `wave-ripple` | `WaveRippleEffect` | ウェーブ＋波紋 |
| `waves` | `WaveEffect` | ウェーブ |

> ★ `grid-construction` は開幕アニメーション完了時に `ak2:grid-ready` カスタムイベントを発行します。`useLogoAnimation: true` はこのイベントをリッスンしてSVGストロークアニメーションを開始します。

#### エフェクトの CSS カスタム変数

各エフェクトは CSS カスタムプロパティで調整できます（`init()` 時に `getComputedStyle` で読み取り）:

```css
/* 例: snow エフェクトの粒子数を増やす */
body {
  --snow-count: 200;
  --snow-alpha: 0.9;
}

/* 例: aurora の透明度を下げる */
body {
  --aurora-alpha: 0.3;
}
```

各エフェクトが対応するCSS変数名は `--{effect-name}-count`, `--{effect-name}-alpha` が基本パターンです。

---

### 7-2. セクション内エフェクト（`data-section-effect`）

`section-effects.js` が自動検出し、連続的なrAFループで動作します。
Nunjucks マクロが用意されているものもあります。

```nunjucks
{# マクロを使う場合 #}
{% from "effect-bg-aurora/effect-bg-aurora.njk" import bgAurora %}
{% from "effect-bg-snow/effect-bg-snow.njk" import bgSnow %}
{% from "effect-bg-sakura/effect-bg-sakura.njk" import bgSakura %}
{% from "effect-bg-sparks/effect-bg-sparks.njk" import bgSparks %}

<section class="section section--dark" style="position:relative">
  {{ bgAurora() }}
  <div class="container">
    ...コンテンツ...
  </div>
</section>

{# HTML直書きも可 #}
<canvas class="section-bg-canvas" data-section-effect="SnowEffect" aria-hidden="true"></canvas>
```

**利用可能なマクロ:** `bgAurora()`, `bgSnow()`, `bgSakura()`, `bgSparks()`

---

### 7-3. カードプレビュー（`data-preview`）

`card-preview.js` が自動検出し、ホバー時にアニメーションをプレビュー再生します。

```html
<canvas data-preview="SnowEffect" style="width:100%;height:200px;border-radius:12px"></canvas>
```

`data-preview` 属性値はJSクラス名（`effectClasses.json` の値側）を指定します。

---

## 8. ユーティリティマクロ

```nunjucks
{% from "components/macros.njk" import sectionHeader, fadeIn, bgShapes, contentPlaceholder %}
{% from "components/macros.njk" import partsSubPage, partsStatItem, partsCategoryCard %}
{% from "components/macros.njk" import typoFontBlock, typoScaleRow, colorSwatch, motionItem %}
```

### `sectionHeader(subtitle, title, dark=false)`

```nunjucks
{{ sectionHeader("ABOUT US", "私たちについて") }}
{{ sectionHeader("WORKS", "制作実績", true) }}  {# ダーク背景用 #}
```

### `fadeIn(delay=0)` — callerパターン

```nunjucks
{% call fadeIn(200) %}
  <p>このコンテンツはスクロール時にフェードインします。</p>
{% endcall %}
```

### `bgShapes(shapes)`

装飾的なぼかし図形を背景に配置します。

```nunjucks
{{ bgShapes([
  {top: "10%", left: "-5%", w: "600px", h: "400px", c1: "rgba(2,93,204,0.15)", c2: "transparent"},
  {top: "50%", right: "-5%", w: "500px", h: "350px", c1: "rgba(0,198,255,0.1)", c2: "transparent", delay: "5s", reverse: true}
]) }}
```

**shapeオブジェクトのプロパティ:**
| キー | 説明 |
|---|---|
| `top`, `left`, `right`, `bottom` | 位置（CSS値） |
| `w`, `h` | サイズ（デフォルト: `800px`, `400px`） |
| `c1`, `c2` | グラデーション色（`c2` デフォルト: `transparent`） |
| `delay` | animation-delay |
| `reverse` | `true` でアニメーション逆方向 |

### `contentPlaceholder(title, note, linkUrl="", linkText="")`

```nunjucks
{{ contentPlaceholder(
  "コンテンツ準備中",
  "このセクションは近日公開予定です。",
  "/contact/",
  "お問い合わせ"
) }}
```

### `partsSubPage(num, title, bg="", breadcrumbLabel="")` — callerパターン

```nunjucks
{% call partsSubPage("01", "Typography", breadcrumbLabel="タイポグラフィ") %}
  <p>ページコンテンツ</p>
{% endcall %}
```

### `partsStatItem(number, label)`

```nunjucks
<div class="parts-stats">
  {{ partsStatItem("27+", "Effects") }}
  {{ partsStatItem("11", "Block Components") }}
</div>
```

### `partsCategoryCard(num, title, desc, url, theme="")`

```nunjucks
<div class="parts-category-grid">
  {{ partyCategoryCard("01 / Typography", "タイポグラフィ", "説明文", "/parts/typography/") }}
  {{ partyCategoryCard("02 / Effects", "エフェクト", "説明文", "/parts/effects/", "dark") }}
  {{ partyCategoryCard("03 / Buttons", "ボタン", "説明文", "/parts/buttons/", "highlight") }}
</div>
```

| `theme` | 説明 |
|---|---|
| `""` | デフォルト（白背景） |
| `"dark"` | ダーク背景（エフェクト系に） |
| `"highlight"` | ブルー薄色（強調） |

---

## 9. AK²Engine — エフェクト登録パターン

### 基本パターン（base.njk に組み込み済み）

```html
<!-- front-matter: effects: [snow, aurora] の場合、自動生成される -->
<script>
  AK2.register(new SnowEffect());
  AK2.register(new AuroraEffect());
</script>
```

### AK2Engine の仕様

- Canvas は `position: fixed; z-index: 1; pointer-events: none` でページ全体に配置
- エフェクト未登録時はキャンバスを生成しない（パフォーマンス最適化）
- エフェクトインターフェース: `init(canvas, ctx)`, `update(dt)`, `draw(ctx)`, `onResize(w, h)`
- スクロールで画面外に出た際、IntersectionObserver でキャンバスを非表示（最適化）

### カスタムエフェクトの作成

```javascript
class MyEffect {
  init(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.particles = [];
    // CSS変数の読み取り
    const style = getComputedStyle(document.body);
    this.count = parseInt(style.getPropertyValue('--my-count') || '100');
  }
  update(dt) { /* パーティクル更新 */ }
  draw(ctx) { /* 描画 */ }
  onResize(w, h) { /* キャンバスサイズ変更対応 */ }
}

// window に公開（card-preview.js が参照できるよう必須）
window.MyEffect = MyEffect;
```

登録:
```html
<script>AK2.register(new MyEffect());</script>
```

---

## 10. ページの作成方法（.md形式の推奨）

当アーキテクチャでは、**新しいページを作成する際は `.md`（Markdown）ファイルを使用することを推奨**しています。
`.njk` ではなく `.md` を作成するだけで、ビルド時に自動的に HTML ページとして生成されます。

### なぜ .md を使うのか？
テキストコンテンツ（見出し、本文、リストなど）を自然な Markdown で書きながら、リッチなUIが必要な箇所にだけ Nunjucks マクロ（`{{ pageHero(...) }}` など）を埋め込むことができるため、非常に直感的で可読性の高いページ制作が可能になります。

### 必須設定（店舗側の .eleventy.js）
Markdown ファイル内で Nunjucks マクロを展開させるために、Eleventy の設定に以下の1行が必要です。

```javascript
  return {
    templateFormats: ["njk", "html", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk", // ← これが必須
    // ...
```

### ページの記述例（src/about.md）

```markdown
---
layout: layouts/base.njk
title: 会社概要
---
{% from "layout-hero-kinetic/layout-hero-kinetic.njk" import pageHero %}
{% from "block-concept-standard/block-concept-standard.njk" import conceptBlock %}

{{ pageHero(
  subtitle="ABOUT US",
  title="会社概要",
  lead="私たちのミッションとビジョンについて。"
) }}

<section class="section">
  <div class="container">

## 私たちが目指す世界
テクノロジーとデザインの力で、Webの新しい可能性を切り開きます。
ここには普通のMarkdownが見出し付きで書けます。
- リストも書けます
- 簡単です

    {{ conceptBlock(
      image="/images/office.jpg",
      heading="洗練されたワークスペース",
      body="<p>マクロもそのまま呼び出せます。</p>"
    ) }}

  </div>
</section>
```

---

## 11. Sandboxでの確認とビルドコマンド

エンジンやプラグインを開発・修正した際は、`@ak2lab/engine` リポジトリ（工場）に内包されている **Sandbox環境** を使って動作確認を行います。

### 起動コマンド
ターミナルで `ak2-engine` ディレクトリに移動し、以下のコマンドを実行します。

```bash
npm run start:sandbox
```

*   `http://localhost:8080/` にローカルサーバーが立ち上がります。
*   コードを保存すると自動でリロードされます。

### ビルドの仕組み
Sandbox環境は、店舗側の本番ビルドとは完全に独立しています。
`package.json` に設定されている通り、Sandboxの処理はすべて設定ファイル **`.eleventy.sandbox.js`** によって制御されています。

*   `npm run build:sandbox` （または `start:sandbox`）を実行すると、Eleventyは `sandbox/` ディレクトリ内の `.md` や `.njk` をコンパイルし、結果を `sandbox/_site/` に出力します。
*   店舗側のビルド（将来的に `npm run build` で実行するもの）には一切影響を与えません。

---

## 12. CSS カスタマイズ

### CSS カスタムプロパティ（上書き可能）

```css
:root {
  /* カラー */
  --color-primary:    #025DCC;  /* メインカラー */
  --color-secondary:  #00C6FF;  /* アクセントカラー */
  --color-dark:       #0f172a;  /* ダーク背景 */
  --color-text:       #334155;  /* 本文テキスト */

  /* フォント */
  --font-sans:    "Noto Serif JP", serif;
  --font-english: "Lato", sans-serif;
  --font-mono:    "Roboto Mono", monospace;

  /* グラスモーフィズム */
  --glass-bg:     rgba(255, 255, 255, 0.65);
  --glass-blur:   20px;

  /* レイアウト */
  --container-width: 1240px;
  --header-height:   80px;
}
```

### `.section--service` の背景画像

```css
/* 店舗側 CSS で上書き */
.section--service {
  background-image: url('/images/office.jpg');
}
```

### `.section--greeting` のウォーターマーク

```css
/* 店舗側 CSS で追加 */
.section--greeting::before {
  content: 'DIRECTOR';
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  font-size: 15vw;
  font-weight: 900;
  color: rgba(0,0,0,0.03);
  font-family: var(--font-english);
  z-index: 1;
  pointer-events: none;
  white-space: nowrap;
}
```

---

## 11. Eleventy 設定サンプル（.eleventy.js）

店舗サイトの `.eleventy.js` サンプルです（ローカルパスでエンジンを参照する場合）:

```javascript
const Nunjucks = require("nunjucks");
const fs = require("fs");
const path = require("path");
const enginePath = "../ak2-engine/src"; // or require.resolve('@ak2lab/engine') + '/src'

function getAllCssFiles(dir) {
  let files = [];
  try {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) files = files.concat(getAllCssFiles(fullPath));
      else if (item.name.endsWith(".css")) files.push(fullPath);
    }
  } catch (e) {}
  return files;
}

function getAllJsFiles(dir) {
  let files = [];
  try {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) files = files.concat(getAllJsFiles(fullPath));
      else if (item.name.endsWith(".js")) files.push(fullPath);
    }
  } catch (e) {}
  return files;
}

module.exports = function(eleventyConfig) {
  // Nunjucks: サイトの _includes + エンジンの plugins/includes を両方参照
  const nunjucksEnv = new Nunjucks.Environment([
    new Nunjucks.FileSystemLoader("src/_includes"),
    new Nunjucks.FileSystemLoader(path.join(enginePath, "plugins")),
    new Nunjucks.FileSystemLoader(path.join(enginePath, "includes")),
  ], { throwOnUndefined: false, autoescape: true });
  eleventyConfig.setLibrary("njk", nunjucksEnv);

  // CSS/JS バンドル
  eleventyConfig.on("eleventy.before", async () => {
    // CSS: エンジンbase.css → エンジンcore → エンジンplugins → サイト固有CSS
    const engineBaseCss = fs.readFileSync(path.join(enginePath, "base.css"), "utf8");
    const engineCoreCss = getAllCssFiles(path.join(enginePath, "core")).sort();
    const enginePluginCss = getAllCssFiles(path.join(enginePath, "plugins")).sort();
    const siteCss = fs.existsSync("src/site.css") ? fs.readFileSync("src/site.css", "utf8") : "";

    const allCss = [
      engineBaseCss,
      ...engineCoreCss.map(f => fs.readFileSync(f, "utf8")),
      ...enginePluginCss.map(f => fs.readFileSync(f, "utf8")),
      siteCss,
    ].join("\n");
    fs.mkdirSync("_site/css", { recursive: true });
    fs.writeFileSync("_site/css/style.css", allCss);

    // JS: core-engine.js 先頭 → エンジンcore → エンジンplugins
    const coreFirst = path.join(enginePath, "core", "core-engine.js");
    const coreJs = getAllJsFiles(path.join(enginePath, "core"));
    const pluginJs = getAllJsFiles(path.join(enginePath, "plugins"));
    const rest = [...coreJs, ...pluginJs]
      .filter(f => path.resolve(f) !== path.resolve(coreFirst))
      .sort();
    const ordered = [coreFirst, ...rest];
    const bundleJs = ordered.map(f => fs.readFileSync(f, "utf8")).join("\n");
    fs.mkdirSync("_site/js", { recursive: true });
    fs.writeFileSync("_site/js/site.js", bundleJs);
  });

  eleventyConfig.addTransform("removeBlankLines", (content, outputPath) => {
    if (outputPath?.endsWith(".html")) return content.replace(/(\r?\n){2,}/g, "\n");
    return content;
  });

  eleventyConfig.addFilter("dateISO", (date) => new Date(date).toISOString().slice(0, 10));

  return {
    templateFormats: ["njk", "html", "md"],
    htmlTemplateEngine: "njk",
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
  };
};
```

---

*このドキュメントは `@ak2lab/engine v0.1.0` に対応しています。*
