---
layout: layouts/base.njk
title: "ボタンプラグイン"
navBg: "solid"
sections:
  - type: article
    category: "AK²ENGINE DOCS"
    title: "ボタンプラグイン"
    lead: "GSAP 3.x を使ったインタラクティブボタン3種です。使用ページのフロントマターに useGsap: true を設定してください。"
---

[← 目次に戻る](/docs/)

---

## 共通設定

ボタンプラグインを使用するページには `useGsap: true` を設定します。

{% raw %}
```yaml
---
layout: layouts/base.njk
title: My Page
useGsap: true
---
```
{% endraw %}

各ボタンのデフォルトフォントは Google Fonts から読み込みます。

{% raw %}
```html
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;700&family=Syne:wght@700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400&display=swap" rel="stylesheet">
```
{% endraw %}

**Sandbox デモ:** `/buttons/`

---

## block-button-liquid — `liquidButton`

ホバーするとSVGの形状が液体のように変形するボタン。スクイッシュ→バウンス→安定ホバーの3段階アニメーション。

{% raw %}
```nunjucks
{% from "block-button-liquid/block-button-liquid.njk" import liquidButton %}

{{ liquidButton("Get Started") }}
{{ liquidButton("送信する", color="#0d9488", fontFamily="'Noto Sans JP', sans-serif") }}
{{ liquidButton("キャンセル", color="#374151", shadow=false) }}
```
{% endraw %}

| パラメーター | デフォルト | 説明 |
|---|---|---|
| `text` | — | ボタンラベル（必須） |
| `color` | `'#5046e5'` | ボタン色 |
| `fontColor` | `'#ffffff'` | テキスト色 |
| `fontFamily` | `"'Outfit', sans-serif"` | フォントファミリー |
| `float` | `true` | 常時浮遊アニメーション |
| `shadow` | `true` | ドロップシャドウ |

**JS API（直接利用）:**
{% raw %}
```javascript
const btn = createLiquidButton("Get Started", {
  color: "#0d9488",
  float: false,
});
document.querySelector('.my-container').appendChild(btn);
```
{% endraw %}

---

## block-button-stagger — `staggerButton`

ホバーすると文字が1文字ずつバウンスするタイポグラフィ主役のボタン。バウンス方向を `staggerDir` で変更可能。

{% raw %}
```nunjucks
{% from "block-button-stagger/block-button-stagger.njk" import staggerButton %}

{{ staggerButton("Get Started") }}
{{ staggerButton("Bounce", color="#4f46e5", staggerDir="center") }}
{{ staggerButton("Random!", color="#be185d", staggerDir="random") }}
{{ staggerButton("はじめる", color="#0d9488", fontFamily="'Noto Sans JP', sans-serif", staggerDir="end") }}
```
{% endraw %}

| パラメーター | デフォルト | 説明 |
|---|---|---|
| `text` | — | ボタンラベル（必須） |
| `color` | `'#111111'` | ボタン背景色 |
| `textColor` | `'#ffffff'` | テキスト色 |
| `fontFamily` | `"'Syne', sans-serif"` | フォント |
| `fontSize` | `15` | フォントサイズ px |
| `staggerDir` | `'start'` | 方向: `'start'` / `'center'` / `'end'` / `'random'` |
| `bounceY` | `-4` | 跳ね上がり量 px |
| `float` | `false` | 常時浮遊アニメーション |

---

## block-button-stroke — `strokeButton`

平常時は細枠のみのミニマルボタン。ホバーでSVGストロークが周回するように描画される。

{% raw %}
```nunjucks
{% from "block-button-stroke/block-button-stroke.njk" import strokeButton %}

{{ strokeButton("Learn More") }}
{{ strokeButton("Contact", strokeColor="#6366f1", textColor="#6366f1", radius=24) }}
{{ strokeButton("詳しく見る", fontFamily="'Noto Sans JP', sans-serif", strokeColor="#be185d", textColor="#be185d") }}
```
{% endraw %}

| パラメーター | デフォルト | 説明 |
|---|---|---|
| `text` | — | ボタンラベル（必須） |
| `strokeColor` | `'#111111'` | ホバー時ストローク色 |
| `textColor` | `'#111111'` | テキスト色 |
| `fontFamily` | `"'DM Sans', sans-serif"` | フォント |
| `strokeWidth` | `1.2` | 線の太さ px |
| `radius` | `3` | 角丸 px |
| `duration` | `0.55` | ストローク描画時間（秒） |
| `float` | `false` | 常時浮遊アニメーション |

---

## block-button-wave — `waveButton`

クリックで画面下から波形のSVGが上昇して全画面を覆いながらページ遷移する演出ボタン。

{% raw %}
```nunjucks
{% from "block-button-wave/block-button-wave.njk" import waveButton %}

{{ waveButton("次のページへ", "/about/") }}
{{ waveButton("デモ再生", "#", color="var(--color-primary)") }}
```
{% endraw %}

| パラメーター | デフォルト | 説明 |
|---|---|---|
| `text` | — | ボタンラベル（必須） |
| `href` | `"#"` | 遷移先 URL（`"#"` でデモモード） |
| `color` | `"var(--color-primary)"` | ウェーブの色 |
| `textColor` | `"var(--color-primary)"` | ボタンテキスト・枠線の色 |

**Sandbox デモ:** `/interaction/`

---

**前のページ:** [← ブロックプラグイン](/docs/block-plugins/) | **[↑ 目次](/docs/)** | **次のページ:** [エフェクトプラグイン →](/docs/effect-plugins/)
