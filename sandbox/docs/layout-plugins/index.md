---
layout: layouts/base.njk
title: "レイアウトプラグイン"
navBg: "solid"
sections:
  - type: article
    category: "AK²ENGINE DOCS"
    title: "レイアウトプラグイン"
    lead: "ヘッダー・フッター・ヒーローセクションのプラグイン群です。"
---

[← 目次に戻る](/docs/)

---

## layout-header-nav

ページ上部に固定されるグローバルヘッダーです。PC ではグローバルナビ（5バリアント）、モバイルではトグルボタン（4バリアント）＋ドロワーメニュー（4バリアント）が表示されます。`base.njk` にインクルード済みで、直接呼び出す必要はありません。

### フロントマター パラメータ（すべてオプション）

| パラメータ | デフォルト | 選択肢 |
|---|---|---|
| `navGlobalStyle` | `"underline"` | `"pill"` / `"bracket"` / `"shift"` / `"dot"` |
| `navDrawerStyle` | `"circular"` | `"slide-down"` / `"slide-up"` / `"glass"` |
| `navToggleStyle` | `"geometric"` | `"magnetic"` / `"liquid"` / `"particle"` |
| `navTogglePos` | `"right"` | `"left"` |
| `transparentHeader` | `false` | `true` |
| `navBg` | `"glass"` | `"solid"` — 暗いヒーローセクションのあるページに必須 |

{% raw %}
```yaml
---
layout: layouts/base.njk
title: "My Page"
navBg: "solid"
navGlobalStyle: "dot"
navDrawerStyle: "glass"
navToggleStyle: "magnetic"
---
```
{% endraw %}

### グローバルナビ バリアント

| 値 | 説明 |
|---|---|
| `"underline"` | アクティブ項目に下線インジケーターが追従 |
| `"pill"` | アクティブ項目に pill 背景が追従 |
| `"bracket"` | ホバー時に `[` `]` が外側から出現 |
| `"shift"` | ホバー時にテキストが上へスライドしアクセントカラーのコピーが出現 |
| `"dot"` | アクティブ・ホバー項目の上部にドット出現 |

### ドロワーメニュー バリアント

| 値 | 説明 |
|---|---|
| `"circular"` | トグルボタン起点の円形リビール |
| `"slide-down"` | 上から降りてくるスライド＋項目のスタガー |
| `"slide-up"` | 下から上がるスライド＋項目のスタガー |
| `"glass"` | グラスモーフィズム＋スケールフェード |

### トグルボタン バリアント

| 値 | 説明 |
|---|---|
| `"geometric"` | 3本線 → クロスへのモーフアニメーション |
| `"magnetic"` | カーソルに吸い付く磁力エフェクト |
| `"liquid"` | SVG Gooey フィルターによる液体合成モーフ |
| `"particle"` | 120粒子が hamburger ↔ クロスに再集合するキネティック演出 |

### CSS カスタムプロパティ

| 変数 | デフォルト | 説明 |
|---|---|---|
| `--nav-bg` | `var(--color-white)` | ヘッダー背景 |
| `--nav-text` | `var(--color-dark)` | ブランド名・アクティブリンク |
| `--nav-sub` | `var(--color-text-light)` | 非アクティブリンク |
| `--nav-accent` | `var(--color-primary)` | インジケーター・ホバー色 |
| `--nav-icon` | `var(--color-dark)` | ハンバーガーアイコン線 |
| `--nav-drawer-bg` | `var(--color-white)` | ドロワー背景 |

**Sandbox デモ:** `/menubar/`

---

## layout-footer-kinetic

ページ最下部のグローバルフッターです。左カラムにロゴ＋説明文、右カラムにナビリンク群、最下段にコピーライトが表示されます。`base.njk` にインクルード済みです。

`site.json` の `footerDesc`・`copyright`・`footerAboutLinks` が使用されます。詳しくは [データスキーマ](/docs/data-schema/) を参照。

---

## layout-hero-kinetic

{% raw %}
```nunjucks
{% from "layout-hero-kinetic/layout-hero-kinetic.njk" import heroLogo, heroContent, heroWave, pageHero %}
```
{% endraw %}

### pageHero（サブページヒーロー）

サブページのトップに配置するヒーローセクションです。英語小見出し＋日本語大見出し＋リード文の3段構成。

{% raw %}
```nunjucks
{{ pageHero(
  subtitle="ABOUT US",
  title="会社概要",
  lead="会社の理念と歴史をご紹介します。",
  note="お問い合わせはフォームからどうぞ。",
  extraClass="section--parts-hero"
) }}
```
{% endraw %}

| パラメーター | 必須 | 説明 |
|---|---|---|
| `subtitle` | ✅ | 英語小見出し（Roboto Mono・シアン） |
| `title` | ✅ | h1 大見出し |
| `lead` | ✅ | リード文（HTML可） |
| `note` | — | infoアイコン付きメモ |
| `extraClass` | — | `<section>` への追加クラス |

> **ヒント:** YAMLセクションで使う場合は `type: hero` を使用してください（HTML不要）。詳しくは [YAMLセクション アーキテクチャ](/docs/yaml-sections/)。

### heroContent（トップページヒーロー）

ページ読み込み時にランダムで1つ選択されたコピーを表示します。

{% raw %}
```nunjucks
{{ heroContent(
  copies=[
    {headline: "見出し1", en: "English tagline 1", desc: "説明文（HTML可）"},
    {headline: "見出し2", en: "English tagline 2", desc: "説明文"}
  ],
  brandName="My Brand"
) }}
```
{% endraw %}

### heroWave（波形デコレーション）

ヒーロー下部を波形に切り抜くSVGデコレーション。

{% raw %}
```nunjucks
{{ heroWave(
  c1="rgba(2,93,204,0.05)",
  c2="rgba(2,93,204,0.10)",
  c3="rgba(0,198,255,0.05)",
  c4="#f8fafc",
  count=4
) }}
```
{% endraw %}

### heroLogo（SVGロゴ浮遊アニメーション）

{% raw %}
```nunjucks
{% call heroLogo() %}
  <svg ...>...</svg>
{% endcall %}
```
{% endraw %}

---

## layout-hero-particle

テキストをパーティクルに分解するフルビューポートのヒーロー。マウス近接で粒子が反発します。

{% raw %}
```nunjucks
{% from "layout-hero-particle/layout-hero-particle.njk" import heroParticle %}

{{ heroParticle(
  text="AK²Lab",
  subtitle="INTERACTIVE ECOSYSTEM",
  fontSize="12vw",
  height="100vh",
  bg="#0b0b0f"
) }}
```
{% endraw %}

| パラメーター | デフォルト | 説明 |
|---|---|---|
| `text` | — | パーティクル化するテキスト（必須） |
| `subtitle` | `""` | 上部の小見出し |
| `color` | `""` | パーティクル色（空欄で `--color-primary`） |
| `fontSize` | `"15vw"` | テキストサイズ |
| `height` | `"100vh"` | セクション高さ |
| `bg` | `"#0b0b0f"` | 背景色 |
| `id` | `"main"` | 同一ページ複数配置時の識別子 |

> 暗い背景のページでは `navBg: "solid"` をフロントマターに追加してください。

**Sandbox デモ:** `/interaction/`

---

**前のページ:** [← YAMLセクション](/docs/yaml-sections/) | **[↑ 目次](/docs/)** | **次のページ:** [ブロックプラグイン →](/docs/block-plugins/)
