# @aidev2007/engine — Plugins API Reference

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
7. [ボタンプラグイン](#7-ボタンプラグイン)
8. [エフェクトプラグイン](#8-エフェクトプラグイン)
9. [ユーティリティマクロ（components/macros.njk）](#9-ユーティリティマクロ)
10. [AK²Engine — エフェクト登録パターン](#10-ak²engine--エフェクト登録パターン)
11. [ページの作成方法（.md形式の推奨）](#11-ページの作成方法md形式の推奨)
    - [11-1. 標準ページ（base.njk）](#11-1-標準ページbasenjk)
    - [11-2. 記事ページ（article.njk）](#11-2-記事ページarticlenjk)
12. [Sandboxでの確認とビルドコマンド](#12-sandboxでの確認とビルドコマンド)
13. [CSS カスタマイズ](#13-css-カスタマイズ)
14. [Eleventy 設定サンプル（.eleventy.js）](#14-eleventy-設定サンプル)
15. [ベストプラクティス](#15-ベストプラクティス)

---

## 1. パッケージ構成

```
@aidev2007/engine
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
        ├── block-button-liquid/     # Liquid Morphing Button（GSAP）
        ├── block-button-stagger/    # Stagger Typography Button（GSAP）
        ├── block-button-stroke/     # Stroke Draw Button（GSAP）
        └── effect-bg-*/             # 背景エフェクト（27種）
```

---

## 2. クイックスタート

### 2-1. Eleventy の依存関係に追加（将来）

```json
{
  "dependencies": {
    "@aidev2007/engine": "^0.1.1"
  }
}
```

現時点ではローカルパスを使用:

```json
{
  "dependencies": {
    "@aidev2007/engine": "file:../ak2-engine"
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
│   └── index.md              # 各ページ（.md 推奨）
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
`@aidev2007/engine/sandbox/_data/effectClasses.json` をそのままコピーして使用してください。

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

  <!-- GSAP（ボタンプラグイン使用時） -->
  {% if useGsap %}
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  {% endif %}

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
| `useGsap` | boolean | GSAP 3.x を CDN から読み込む（ボタンプラグイン使用時に必須） |
| `useThreeJS` | boolean | Three.js パーティクルを使用 |
| `useLogoAnimation` | boolean | SVGロゴアニメーションを起動 |
| `transparentHeader` | boolean | ページトップでヘッダーを透明化 |

---

## 5. レイアウトプラグイン

### `layout-header-kinetic`

**どんな表示になるか:**
ページ上部に固定されるグローバルナビゲーションバー。ロゴ＋ナビリンクの横並びレイアウト。スクロール前は透明（`transparentHeader: true` 時）または薄いグラスモーフィズム背景で、スクロールすると白背景＋ボックスシャドウに切り替わります。ナビリンクは現在のページパスと照合してアクティブ状態（下線や色変化）が付与されます。

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

**どんな表示になるか:**
ページ最下部に配置される多段フッター。左カラムにロゴ＋説明文、右カラムにナビリンク群、最下段にコピーライト。ダーク背景（`--color-dark`）で全幅表示されます。

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

**どんな表示になるか:**
SVGロゴが画面中央でゆっくり上下に浮遊するアニメーション付きで大きく表示されます。ファーストビューの主役要素として視線を集めるアクセントになります。内容は `caller()` で渡します。

```nunjucks
{% call heroLogo() %}
  <svg ...>...</svg>
{% endcall %}
```

#### `heroContent(copies, brandName="")`

**どんな表示になるか:**
ページ読み込み時にランダムで1つ選択されたコピーが表示されます。大きな見出し（日本語）・英語タグライン・説明文の3層構造で、ヒーローセクションのメインテキストエリアを構成します。

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

**どんな表示になるか:**
ヒーローセクション下部を波形に切り抜くSVGデコレーション。4層の波が微妙にずれながらゆっくり揺れ、次のセクションへ自然に繋げます。`c4` に次のセクション背景色を指定することで境界が馴染みます。

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

**どんな表示になるか:**
サブページ（About、サービス、お問い合わせ等）のトップに配置する標準的なヒーローセクション。英語の小見出し（シアン色のモノスペースフォント）＋日本語の大見出し＋リード文の3段構成。`note` を渡すとインフォアイコン付きのメモが表示されます。

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

**どんな表示になるか:**
アイコン（Lucide）＋タイトル＋本文テキストの3要素からなるシンプルなカード。白背景のグラスモーフィズム風スタイルで複数枚並べてグリッド表示します。「高速・安全・柔軟」など製品やサービスの特徴・強みを箇条書き的に紹介する用途に最適です。`.card-grid` と組み合わせて3〜4列グリッドにすることが多いです。

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

**どんな表示になるか:**
カード上部に大きな文字（漢字1文字や英字2文字など）がドーンと配置され、その下にタイトルと説明文が続くカード。「職人技」「効率」「継続」など、哲学・理念・価値観を象徴的な文字で表現するのに使います。暗い背景（`section--dark`）で使うと映えます。

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

**どんな表示になるか:**
制作実績やポートフォリオの一覧ページ用カード。サムネイル画像の代わりに指定色のカラーブロックで視覚的なアクセントを作り、タイトル・説明・タグバッジ・「見る」ボタンが続く構成です。`samples.json` の配列データをループで渡す使い方が標準パターンです。

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

**どんな表示になるか:**
提供サービスのメニューカード。上部にバッジ（`LANDING` など英語ラベル）、サービス名、価格、説明文、注記（納期・条件など）が縦に並びます。サービス一覧・料金表ページで複数並べて使います。価格の `¥` 表示が大きめに強調されるスタイルです。

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

**どんな表示になるか:**
会社やサービスの「姿勢・方針・こだわり」を番号付きリストで表示するカード。左側に大きな番号（または絵文字・アイコン）、右側に見出しと説明文が並ぶ横長レイアウト。`.stance-list` と組み合わせて縦に並べて使います。「大切にしていること」「私たちの約束」などのセクションに使います。

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

**どんな表示になるか:**
「こんな人におすすめ」「対象となるお客様」を紹介するシンプルなカード。上部に大きな絵文字またはアイコン、下にターゲット名と短い説明文。カードのサイズは小さめで、1段4列に並べてグリッド表示されます。

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

**どんな表示になるか:**
画像（左または右）とテキスト（見出し＋本文＋注記）を横並びにしたレイアウトブロック。画像はゆっくり浮遊するアニメーション付き。コンセプト説明、会社紹介、サービス詳細など「写真＋長文説明」の組み合わせに最適です。`pos="right"` で画像を右側にでき、交互に並べると単調にならないページが作れます。

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

**どんな表示になるか:**
ページ全幅を使ったコール・トゥ・アクションセクション。薄いグラデーション背景（デフォルトは水色系）に、大きな見出し・本文テキスト・ボタン1つが中央寄せで配置されます。「お問い合わせはこちら」「今すぐ始める」などコンバージョンを促す目的で、各ページに1回だけ配置するのが典型的な使い方です。

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

**どんな表示になるか:**
質問行をクリックすると回答が滑らかに展開・収納されるアコーディオンUI。質問の右端に開閉を示す「＋/×」アイコンが表示されます。「よくある質問」セクションで複数の `faqItem` を縦に並べて使います。

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

**どんな表示になるか:**
名前・会社名・メールアドレス・電話番号・お問い合わせ内容の5フィールドを持つ日本語コンタクトフォーム。各フィールドにラベルとプレースホルダーが付き、送信ボタンはプライマリカラーで目立つデザインです。formspree等の外部サービスの `action` URL を指定することで送信機能を実装できます。

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

**どんな表示になるか:**
画像（左）とテキスト（右）を横並びにしたシンプルなコンテンツブロック。`conceptBlock` よりコンパクトで、スクロールに連動してフェードインするアニメーション付きです。店舗の内観写真やサービス風景写真と短いキャプションの組み合わせに使います。

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

## 7. ボタンプラグイン

ボタンプラグインは GSAP 3.x を使ったインタラクティブボタンです。
使用するページの front-matter に **`useGsap: true`** を設定してください。

```yaml
---
layout: layouts/base.njk
title: My Page
useGsap: true
---
```

また、各ボタンのデフォルトフォントは Google Fonts から別途読み込む必要があります:

```html
<!-- ページ上部（bodyでも可）に追加 -->
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;700&family=Syne:wght@700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400&display=swap" rel="stylesheet">
```

> **動作確認:** `npm run start:sandbox` → `/buttons/` ページで全3種を実際にホバーして確認できます。

---

### `block-button-liquid` — `liquidButton`

**どんな表示になるか:**
ホバーすると SVG の形状が液体のように変形するボタン。スクイッシュ（潰れる）→バウンス（左右に膨らむ）→安定ホバーの3段階アニメーションが連続再生されます。ボタン内部は放射グラデーション＋内部反射ハイライトで立体的に見えます。マウスアウトで元の形に戻ります。インパクトのある主要CTAボタンに最適です。

```nunjucks
{% from "block-button-liquid/block-button-liquid.njk" import liquidButton %}

{{ liquidButton("Get Started") }}
{{ liquidButton("送信する", color="#0d9488", fontFamily="'Noto Sans JP', sans-serif") }}
{{ liquidButton("キャンセル", color="#374151", shadow=false) }}
```

| パラメーター | 型 | デフォルト | 説明 |
|---|---|---|---|
| `text` | string | — | ボタンラベル（必須） |
| `color` | string | `'#5046e5'` | ボタン色 hex |
| `fontColor` | string | `'#ffffff'` | テキスト色 hex |
| `fontFamily` | string | `"'Outfit', sans-serif"` | フォントファミリー |
| `float` | boolean | `true` | 常時浮遊アニメーション |
| `shadow` | boolean | `true` | ドロップシャドウ |

**JS API（直接利用）:**

```javascript
// 戻り値: <button> 要素
const btn = createLiquidButton("Get Started", {
  color: "#0d9488",
  fontFamily: "'Noto Sans JP', sans-serif",
  float: false,
});
document.querySelector('.my-container').appendChild(btn);
```

---

### `block-button-stagger` — `staggerButton`

**どんな表示になるか:**
ホバーすると文字が1文字ずつ順番にバウンスするタイポグラフィ主役のボタン。バウンスの開始位置（左から・中央から・右から・ランダム）を `staggerDir` で変えられます。ホバー入場時には光が走るシマー（キラーン）効果も付きます。ボタン本体もホバーでわずかにスクイッシュします。スタイリッシュで遊び心のあるデザインに向きます。

```nunjucks
{% from "block-button-stagger/block-button-stagger.njk" import staggerButton %}

{{ staggerButton("Get Started") }}
{{ staggerButton("Bounce", color="#4f46e5", staggerDir="center") }}
{{ staggerButton("Random!", color="#be185d", staggerDir="random", fontSize=16) }}
{{ staggerButton("はじめる", color="#0d9488", fontFamily="'Noto Sans JP', sans-serif", staggerDir="end") }}
```

| パラメーター | 型 | デフォルト | 説明 |
|---|---|---|---|
| `text` | string | — | ボタンラベル（必須） |
| `color` | string | `'#111111'` | ボタン背景色 |
| `textColor` | string | `'#ffffff'` | テキスト色 |
| `fontFamily` | string | `"'Syne', sans-serif"` | フォント |
| `fontSize` | number | `15` | フォントサイズ px |
| `staggerDir` | string | `'start'` | 文字の跳ね方向: `'start'` / `'center'` / `'end'` / `'random'` |
| `bounceY` | number | `-4` | 跳ね上がり量 px（負の値で上方向） |
| `float` | boolean | `false` | 常時浮遊アニメーション |
| `radius` | number / `'auto'` | `'auto'` | 角丸 px（`'auto'` で高さから自動計算） |

**JS API（直接利用）:**

```javascript
// 戻り値: <div> 要素
const btn = createStaggerButton("Download", {
  color: "#18181b",
  staggerDir: "end",
  fontSize: 14,
});
document.querySelector('.my-container').appendChild(btn);
```

---

### `block-button-stroke` — `strokeButton`

**どんな表示になるか:**
平常時は薄い細枠だけのミニマルなボタン。ホバーすると SVG の stroke-dashoffset アニメーションで上辺中央から始まり、両方向同時に枠線が周回するように描画されます。マウスアウトで末尾側から逆に消えます。テキストも微妙に浮き上がります。クリックで文字が一瞬フラッシュします。余白感・クリーンさを重視したデザインのサイトに向いており、塗りつぶしボタンとの対比として使うのが効果的です。

```nunjucks
{% from "block-button-stroke/block-button-stroke.njk" import strokeButton %}

{{ strokeButton("Learn More") }}
{{ strokeButton("Contact", strokeColor="#6366f1", textColor="#6366f1", radius=24) }}
{{ strokeButton("Download", radius=0, strokeWidth=1.5, duration=0.45) }}
{{ strokeButton("詳しく見る", fontFamily="'Noto Sans JP', sans-serif", strokeColor="#be185d", textColor="#be185d") }}
```

| パラメーター | 型 | デフォルト | 説明 |
|---|---|---|---|
| `text` | string | — | ボタンラベル（必須） |
| `strokeColor` | string | `'#111111'` | ホバー時ストローク色 |
| `borderColor` | string | `''` | 平常時の枠線色（未指定で `strokeColor` の透明度18%） |
| `textColor` | string | `'#111111'` | テキスト色 |
| `fontFamily` | string | `"'DM Sans', sans-serif"` | フォント |
| `strokeWidth` | number | `1.2` | 線の太さ px |
| `radius` | number | `3` | 角丸 px（`0` でシャープ、`24`以上で楕円） |
| `duration` | number | `0.55` | ストローク描画時間（秒） |
| `float` | boolean | `false` | 常時浮遊アニメーション |

**JS API（直接利用）:**

```javascript
// 戻り値: <div> 要素
const btn = createStrokeButton("Get Started", {
  strokeColor: "#0d9488",
  textColor:   "#0d9488",
  radius:      24,
  float:       true,
});
document.querySelector('.my-container').appendChild(btn);
```

---

## 8. エフェクトプラグイン

### 8-1. ページ全体背景エフェクト（AK²Engine 登録）

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

| キー | クラス名 | 見た目・雰囲気 |
|---|---|---|
| `aurora` | `AuroraEffect` | 青〜紫〜緑の光が揺らめくオーロラ。幻想的・神秘的な演出に |
| `cherry-blossom` | `CherryBlossomEffect` | ピンクの花びらがひらひらと舞い落ちる。春・和風サイトに |
| `cloud` | `CloudEffect` | 白い雲が緩やかに流れる。空・清潔感・爽やかさの演出に |
| `ember` | `EmberEffect` | 炎の火の粉が上方向に漂う。情熱・ダイナミック・夏祭りに |
| `firefly` | `FireflyEffect` | 暗い背景で光の点（ホタル）がふわふわ光跡を描く。夏・幻想的に |
| `grid-construction` | `GridConstruction` | ページ開幕時にグリッド線が展開するローディング演出★ |
| `leaf` | `LeafEffect` | 緑の葉が揺れながら漂う。ナチュラル・エコ系サイトに |
| `leaf-fall` | `LeafFallEffect` | 葉が落下する秋のシーン。秋のキャンペーンサイトに |
| `lightning` | `LightningEffect` | 稲妻が走る。エネルギッシュ・テック・ロック系に |
| `lines` | `GridEffect` | 細い線がゆっくり動くグリッドパターン。テクニカル・ミニマルに |
| `maple-leaves` | `MapleLeafEffect` | もみじの葉が舞う。紅葉・日本の秋の演出に |
| `momiji` | `MomijiEffect` | もみじ（別バリエーション）。より赤みが強い秋の表現に |
| `particles` | `ParticleEffect` | Three.js による3Dパーティクル群（`useThreeJS: true` 必須） |
| `projector-flicker` | `ProjectorFlickerEffect` | 古い映写機のフリッカー・フィルムノイズ。レトロ・アナログ感に |
| `rain` | `RainEffect` | 縦に落ちる雨のライン。梅雨・しっとりした雰囲気・夜の雨に |
| `ripple` | `RippleEffect` | 水面にポツポツと波紋が広がる。水・清涼感・温泉に |
| `sakura` | `SakuraEffect` | 桜の花びらがふわふわ舞う（フルバリエーション）。花見・春に |
| `shimmer` | `ShimmerEffect` | キラキラした光の粒が漂う。高級感・ジュエリー・ブライダルに |
| `snow` | `SnowEffect` | 白い雪がゆっくり降る。冬・クリスマス・清潔感に |
| `sparks` | `SparksEffect` | 火花・スパークがはじける。工場・ものづくり・エネルギーに |
| `stars` | `StarFieldEffect` | 星空が広がる。夜・宇宙・夢・ロマンティックに |
| `star-speed` | `StarSpeedEffect` | 星が高速で流れるワープ演出。SF・宇宙・スピード感に |
| `status-up` | `StatusUpEffect` | ゲームのステータスアップ表示が飛び出る。ゲーミング・デジタルに |
| `steam` | `SteamEffect` | 湯気がもわっと立ち上る。温泉・カフェ・料理・温かみに |
| `vintage-film` | `VintageFilmEffect` | フィルムグレイン・スクラッチノイズ。レトロ・ビンテージ・映画的に |
| `wave-ripple` | `WaveRippleEffect` | ウェーブと波紋が組み合わさった水面表現。海・プール・水辺に |
| `waves` | `WaveEffect` | なめらかな波形が動く。海・音楽・リズム感に |

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

### 8-2. セクション内エフェクト（`data-section-effect`）

`section-effects.js` が自動検出し、連続的なrAFループで動作します。
Nunjucks マクロが用意されているものもあります。

**どんな表示になるか:**
ページ全体の背景ではなく、特定の `<section>` の内側にキャンバスを配置してエフェクトを表示します。`position: relative` を付けた親要素の内側全体をキャンバスが覆います。

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

### 8-3. カードプレビュー（`data-preview`）

`card-preview.js` が自動検出し、ホバー時にアニメーションをプレビュー再生します。

**どんな表示になるか:**
エフェクト選択UIやポートフォリオカード内に小さなプレビューキャンバスを埋め込みます。ホバーでアニメーションが開始され、マウスアウトで停止します。

```html
<canvas data-preview="SnowEffect" style="width:100%;height:200px;border-radius:12px"></canvas>
```

`data-preview` 属性値はJSクラス名（`effectClasses.json` の値側）を指定します。

---

## 9. ユーティリティマクロ

```nunjucks
{% from "components/macros.njk" import sectionHeader, fadeIn, bgShapes, contentPlaceholder %}
{% from "components/macros.njk" import partsSubPage, partsStatItem, partsCategoryCard %}
{% from "components/macros.njk" import typoFontBlock, typoScaleRow, colorSwatch, motionItem %}
```

### `sectionHeader(subtitle, title, dark=false)`

**どんな表示になるか:**
セクション冒頭に配置する英語の小見出し＋日本語の大見出しのセット。`dark=true` にすると白文字になります。

```nunjucks
{{ sectionHeader("ABOUT US", "私たちについて") }}
{{ sectionHeader("WORKS", "制作実績", true) }}  {# ダーク背景用 #}
```

### `fadeIn(delay=0)` — callerパターン

**どんな表示になるか:**
囲んだコンテンツがスクロールで表示領域に入ったタイミングでフェードインします。

```nunjucks
{% call fadeIn(200) %}
  <p>このコンテンツはスクロール時にフェードインします。</p>
{% endcall %}
```

### `bgShapes(shapes)`

**どんな表示になるか:**
ぼかした大きな楕円形グラデーションを背景に配置します。ゆっくり揺れるアニメーション付き。直接的なUIではなく、セクション背景の奥行き・雰囲気作りに使います。

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

## 10. AK²Engine — エフェクト登録パターン

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

## 11. ページの作成方法（.md形式の推奨）

当アーキテクチャでは、**新しいページを作成する際は `.md`（Markdown）ファイルを使用することを推奨**しています。
`.md` ファイルを作成するだけで、ビルド時に自動的に HTML ページとして生成されます。

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

### 11-1. 標準ページ（base.njk）

#### ページの記述例（src/about.md）

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

### 11-2. 記事ページ（article.njk）

テキスト中心のコンテンツ（ブログ記事・解説ページ・コンセプト文書など）には、専用の **`article.njk`** レイアウトを使用します。
`base.njk` をチェーンして使うため、ヘッダー・フッターは自動で組み込まれます。

#### ファイルの場所

```
sandbox/_includes/layouts/article.njk   ← サンドボックスでの動作確認用（参照実装）
src/_includes/layouts/article.njk       ← 実サイトに配置する場合はここに置く
```

実サイトで使用するには、`sandbox/_includes/layouts/article.njk` を
実サイトの `src/_includes/layouts/` にコピーしてください。
エンジンの `.eleventy.js` が Nunjucks 検索パスに `src/_includes` を含んでいるため、
そのまま `layout: layouts/article.njk` で参照できます。

#### front-matter オプション

```yaml
---
layout: layouts/article.njk
title: "記事タイトル"       # ヒーローエリアの大見出し（必須）
category: "CONCEPT"         # カテゴリーラベル（省略可、例: CONCEPT / GUIDE / NEWS）
lead: "リード文。"          # タイトル下のサブテキスト（省略可）
description: "meta description 用テキスト"  # SEO（省略時は site.description）
---
```

| キー | 必須 | 説明 |
|---|---|---|
| `layout` | ✅ | `"layouts/article.njk"` を指定 |
| `title` | ✅ | ページタイトル。ヒーローエリアの `<h1>` として出力される |
| `category` | — | カテゴリーラベル（モノスペース・大文字）。両脇に短い横線が付く |
| `lead` | — | タイトル直下のサブテキスト（中央寄せ） |
| `description` | — | meta description（省略時は `site.description`） |

#### ページ構造

```
article-page
├── article-page__hero        ヒーローエリア（白背景・上端グラデーションライン）
│   ├── breadcrumb            パンくずナビ（Sandbox → カテゴリー）
│   ├── article-page__category カテゴリーラベル（中央寄せ）
│   ├── article-page__title   <h1>（中央寄せ）
│   └── article-page__lead   リード文（中央寄せ）
└── article-page__body        本文エリア
    └── .prose                Markdown から変換された記事本文
```

#### .prose クラス（記事本文タイポグラフィ）

`.prose` はサンドボックスの `sandbox/sandbox.css` に定義されています。
実サイトに移植する際はこの CSS をサイト固有の CSS ファイルにコピーしてください。

| セレクター | 説明 |
|---|---|
| `.prose` | 最大幅960px・中央寄せ。フォント1.05rem・行間2 |
| `.prose h2` | 下ボーダー＋60px幅グラデーションアクセント |
| `.prose h3` | 太字・見出し階層の補助レベル |
| `.prose ul` | `list-style: disc`（標準的な箇条書き） |
| `.prose strong` | ダークカラーで強調 |

#### 記事ページの作成例（src/concept/index.md）

```markdown
---
layout: layouts/article.njk
title: "Art & Kinetic: 技術哲学と提供コンセプト"
category: "CONCEPT"
lead: "SVGアニメーションと独自設計のAK²Engineが実現する、表現力と軽快性の完全両立。"
---

## 1. 視覚的インパクトとパフォーマンスの最適解

これまでのWeb制作において...

## 2. SVGアニメーションがもたらす新しいWeb体験

昨今のWeb技術の進化により...

- **極小サイズと完全なスケーラビリティ**

  動画やビットマップ画像とは異なり...

- **高いDOM（HTML）親和性**

  CanvasやWebGLとは異なり...
```

> **ポイント:** `article.njk` は `.prose` 内に Markdown をそのまま流し込む設計のため、
> Nunjucks マクロを混在させる必要はほとんどありません。
> 純粋な Markdown だけでリッチな記事ページが完成します。

#### サンドボックスでの確認

| URL | 内容 |
|---|---|
| `/concept/` | article.njk を使った記事ページのサンプル |

---

### ⚠️ .md ファイル内 HTML 記述の重要ルール

`markdownTemplateEngine: "njk"` 環境では、**Nunjucks 処理 → Markdown 処理** の順で実行されます。
Markdown パーサーは **空行で HTML ブロックを強制終了** するため、以下のルールを守ってください。

#### ルール1：`<section>` 内では空行を入れない

HTML の `<section>` / `<div>` などのブロック要素の内側で空行が発生すると、Markdown パーサーが後続の HTML 要素を `<p>` タグで誤包囲し、レイアウトが崩れます。

**❌ NG — `<section>` 内に空行があるとレイアウト崩壊：**

```markdown
<section class="section section--white">
  <div class="container">
    {{ sectionHeader("TITLE", "タイトル") }}

    <div class="card-grid">   ← ここに空行があると <p><div> になる
```

**✅ OK — 空行なしで連続記述：**

```markdown
<section class="section section--white">
  <div class="container">
    {{ sectionHeader("TITLE", "タイトル") }}
    <div class="card-grid">   ← 空行なし → 正常
```

#### ルール2：`<section>` 間の空行は問題なし

`</section>` と次の `<section>` の間の空行は HTML ブロックを分断しません（次の `<section>` が新しい HTML ブロックを開始するため）。

```markdown
</section>

<section class="section section--dark">   ← ここは空行があってもOK
```

#### ルール3：Nunjucks の `trimBlocks` / `lstripBlocks` を必ず有効にする

`.eleventy.js` の Nunjucks 設定に以下の2行を追加してください（`create-ak2-site` で生成されたプロジェクトには含まれています）。

```javascript
const nunjucksEnv = new Nunjucks.Environment([...], {
  throwOnUndefined: false,
  autoescape: true,
  trimBlocks: true,    // ← ブロックタグ直後の改行を自動除去
  lstripBlocks: true   // ← ブロックタグ行の先頭空白を自動除去
});
```

これによりマクロを呼び出した際の余分な改行が大幅に抑制され、上記の空行問題が発生しにくくなります。

---

## 12. Sandboxでの確認とビルドコマンド

エンジンやプラグインを開発・修正した際は、`@aidev2007/engine` リポジトリ（工場）に内包されている **Sandbox環境** を使って動作確認を行います。

### 起動コマンド
ターミナルで `ak2-engine` ディレクトリに移動し、以下のコマンドを実行します。

```bash
npm run start:sandbox
```

*   `http://localhost:8080/` にローカルサーバーが立ち上がります。
*   コードを保存すると自動でリロードされます。

### Sandboxのテストページ

| URL | 内容 |
|---|---|
| `/` | サンドボックスインデックス |
| `/effects/` | 背景エフェクト27種の動作確認 |
| `/blocks/` | ブロックプラグイン11種の動作確認 |
| `/layout/` | レイアウトプラグインの動作確認 |
| `/buttons/` | ボタンプラグイン3種の動作確認（GSAP必須） |

### ビルドの仕組み
Sandbox環境は、店舗側の本番ビルドとは完全に独立しています。
`package.json` に設定されている通り、Sandboxの処理はすべて設定ファイル **`.eleventy.sandbox.js`** によって制御されています。

*   `npm run build:sandbox` （または `start:sandbox`）を実行すると、Eleventyは `sandbox/` ディレクトリ内の `.md` や `.njk` をコンパイルし、結果を `sandbox/_site/` に出力します。
*   店舗側のビルド（将来的に `npm run build` で実行するもの）には一切影響を与えません。

---

## 13. CSS カスタマイズ

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

## 14. Eleventy 設定サンプル（.eleventy.js）

店舗サイトの `.eleventy.js` サンプルです（ローカルパスでエンジンを参照する場合）:

```javascript
const Nunjucks = require("nunjucks");
const fs = require("fs");
const path = require("path");
const enginePath = "../ak2-engine/src"; // or require.resolve('@aidev2007/engine') + '/src'

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
  ], {
    throwOnUndefined: false,
    autoescape: true,
    trimBlocks: true,    // ← .md + Nunjucks 混在時のレイアウト崩れ防止に必須
    lstripBlocks: true   // ← 同上
  });
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
    markdownTemplateEngine: "njk",
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
  };
};
```

---

## 15. ベストプラクティス

### CSS: インラインスタイルを使用しない

`.md` / `.njk` テンプレート内の HTML にはインラインスタイル（`style="..."` 属性）を**使用しないでください**。

**理由:**
- コードが冗長になり可読性が低下する
- 変更時にすべての出現箇所を修正する必要がある
- CSS の詳細度が上がり、後からスタイルを上書きしにくくなる

**❌ NG — インラインスタイル:**

```html
<a href="/effects/" class="parts-category-card"
   style="border-color:rgba(0,198,255,0.2);background:linear-gradient(135deg,#0f172a,#1e293b);color:white">
```

**✅ OK — BEMモディファイアクラスを定義して使用:**

```css
/* src/site.css に定義 */
.parts-category-card--effects {
  border-color: rgba(0, 198, 255, 0.2);
  background: linear-gradient(135deg, #0f172a, #1e293b);
  color: white;
}
.parts-category-card--effects .parts-category-card__num  { color: var(--color-secondary); }
.parts-category-card--effects .parts-category-card__link { color: var(--color-secondary); }
```

```html
<a href="/effects/" class="parts-category-card parts-category-card--effects">
```

エンジンが自動生成する `style.css` には追記せず、**サイト固有の CSS ファイル**（例: `src/site.css`）に定義し、バンドル時に末尾に追記するようにしてください。

---

### Nunjucks マクロ: `{%- endmacro %}` を使う

プラグインやサイト独自のマクロを作成する際は、`{% endmacro %}` の代わりに **`{%- endmacro %}`** を必ず使用してください。

**理由:**
`{%- endmacro %}` はマクロ本体末尾の余分な改行（`\n`）を除去します。これを省略すると、マクロを `.md` ファイルから呼び出した際にマクロ出力の末尾に空行が生まれ、Markdown パーサーが後続の HTML 要素を `<p>` タグで誤包囲してレイアウトが崩れます。

```nunjucks
{# ❌ NG: 末尾に \n が残り、.md から呼ぶと空行が発生する #}
{% macro featureItem(icon, title, text) %}
<div class="feature-item">...</div>
{% endmacro %}

{# ✅ OK: 末尾の \n を除去して空行を防ぐ #}
{% macro featureItem(icon, title, text) %}
<div class="feature-item">...</div>
{%- endmacro %}
```

---

### セクションのスタイルは BEM モディファイアで管理する

新しいセクションスタイルが必要な場合は、インラインスタイルを使わずにモディファイアクラスを定義します。

```css
/* ❌ NG — テンプレートにインラインスタイル */
/* <section class="section" style="background:#f7f6f2"> */

/* ✅ OK — site.css にクラスを定義 */
.section--warm { background: #f7f6f2; }
```

```html
<section class="section section--warm">
```

エンジンの `base.css` には `.section--white`, `.section--dark`, `.section--faq`, `.section--contact` など多数が定義済みです。既存クラスで対応できない場合のみ、サイト固有 CSS に追加してください。

---

### .md と .njk の使い分け

| コンテンツの種類 | 推奨形式 |
|---|---|
| テキスト中心（マクロを数個使う程度） | `.md` |
| HTML構造が複雑 / マクロが多数ネスト | `.njk` |
| 純粋な HTML ページ | `.html` |

マクロ呼び出しが多く HTML が深くネストするページでは `.njk` 拡張子を使うと、Markdown パーサーによる空行問題を根本的に回避できます。

---

*このドキュメントは `@aidev2007/engine v0.1.2` に対応しています。*
