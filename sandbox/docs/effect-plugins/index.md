---
layout: layouts/base.njk
title: "エフェクトプラグイン"
navBg: "solid"
sections:
  - type: article
    category: "AK²ENGINE DOCS"
    title: "エフェクトプラグイン"
    lead: "AK²Engine が提供するエフェクトプラグイン一覧。背景・カーソル・モーション・テキストの4グループに分類されます。"
---

[← 目次に戻る](/docs/)

---

## エフェクトの分類

AK²Engine のエフェクトプラグインは以下の4グループに分類されます。

| グループ | 概要 | 種類数 |
|---|---|---|
| **背景エフェクト** | セクションに Canvas アニメーション背景を追加 | 27種 |
| **カーソルエフェクト** | マウスカーソルをカスタム表示 | 1種 |
| **モーションエフェクト** | スクロール連動のアニメーション | 2種 |
| **テキストエフェクト** | 文字アニメーション | 1種 |

---

## 背景エフェクト

### 背景エフェクトとは

背景エフェクトは、**セクション**（`sections[]` の各ブロック）に対して Canvas ベースのアニメーション背景を付与するプラグインです。

> セクション外（ページ front-matter）に指定すれば**ページ全体背景**としても使用できます。ただし基本的な用途はセクション単位の使用を想定しています。

---

### 指定方法の使い分け

背景エフェクトには **2 つの指定方法**があり、それぞれ書き方が異なります。

| 用途 | 書く場所 | 指定する値 | 値の形式 |
|---|---|---|---|
| **セクション個別**（推奨） | `sections[].effects[]` | クラス名 | `SnowEffect` |
| **ページ全体** | front-matter の `effects:` | キー | `snow` |

> **クラス名**（`SnowEffect` など）とは JS クラスの名前です。
> **キー**（`snow` など）はページ全体適用専用の短縮エイリアスで、内部で `effectClasses.json` を通じてクラス名に変換されます。
> セクション指定ではキーは使えません（クラス名のみ）。

---

### セクションへの適用

`sections[].effects[]` YAML 配列でエフェクトを指定します。エフェクト名は**クラス名**（例: `SnowEffect`）で指定してください。

#### 文字列記法（オプションなし）

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

#### オブジェクト記法（オプション指定あり）

{% raw %}
```yaml
sections:
  - type: hero
    title: "タイトル"
    effects:
      - name: SnowEffect
        count: 20
        alpha: 1.5
        hue: 210
        lightness: 70
      - name: FireflyEffect
        interactive: false
```
{% endraw %}

#### 両記法の混在

{% raw %}
```yaml
effects:
  - SnowEffect
  - name: FireflyEffect
    interactive: false
  - SparksEffect
```
{% endraw %}

複数エフェクトを重ねる場合、`mix-blend-mode: screen` ですべてのエフェクトが合成表示されます。

---

### ページ全体への適用

front-matter の `effects:` に**キー**を配列で指定します。`base.njk` が `effectClasses.json` でキーをクラス名に変換し、`AK2.register(new SnowEffect())` のように自動呼び出します。

> **注意：** ここで使うのは `snow`・`aurora` などの**キー**です。`SnowEffect` などのクラス名ではありません。

{% raw %}
```yaml
---
layout: layouts/base.njk
title: My Page
effects:
  - snow    ← キー（SnowEffect ではない）
  - aurora  ← キー（AuroraEffect ではない）
---
```
{% endraw %}

---

### CSS カスタム変数によるパラメーター調整

各エフェクトは CSS カスタムプロパティで調整できます。変数名は `--{エフェクト識別子}-{パラメーター名}` が基本パターンです。

{% raw %}
```css
:root {
  --snow-count: 200;
  --snow-alpha: 0.9;
  --aurora-alpha: 0.3;
  --firefly-hue: 270;
}
```
{% endraw %}

---

### 背景エフェクト一覧

各エフェクト名をクリックすると詳細ページを確認できます。

- **エフェクト名（クラス名）**：セクション指定・JS で使う値
- **キー**：front-matter の `effects:` で使う短縮値

| エフェクト名（クラス名） | キー（front-matter用） | 説明 |
|---|---|---|
| [`AuroraEffect`](/docs/effect-plugins/aurora/) | `aurora` | 青〜紫〜緑の光が揺らめくオーロラ。幻想的・神秘的な演出 |
| [`CherryBlossomEffect`](/docs/effect-plugins/cherry-blossom/) | `cherry-blossom` | ピンクの花びらが舞い落ちる。春・和風サイト |
| [`CloudEffect`](/docs/effect-plugins/cloud/) | `cloud` | 白い雲が緩やかに流れる。空・清潔感・爽やかさ |
| [`EmberEffect`](/docs/effect-plugins/ember/) | `ember` | 炎の火の粉が上方向に漂う。情熱・夏祭り |
| [`FireflyEffect`](/docs/effect-plugins/firefly/) | `firefly` | 光の点（ホタル）が光跡を描く。夏・幻想的 |
| [`GridConstruction`](/docs/effect-plugins/grid-construction/) | `grid-construction` | ページ開幕時にグリッド線が展開するローディング演出★ |
| [`LeafEffect`](/docs/effect-plugins/leaf/) | `leaf` | 緑の葉が揺れながら漂う。ナチュラル・エコ系 |
| [`LeafFallEffect`](/docs/effect-plugins/leaf-fall/) | `leaf-fall` | 葉が落下する秋のシーン |
| [`LightningEffect`](/docs/effect-plugins/lightning/) | `lightning` | 稲妻が走る。エネルギッシュ・テック・ロック系 |
| [`GridEffect`](/docs/effect-plugins/lines/) | `lines` | 細い線が動くグリッドパターン。テクニカル・ミニマル |
| [`MapleLeafEffect`](/docs/effect-plugins/maple-leaves/) | `maple-leaves` | もみじの葉が舞う。紅葉・日本の秋 |
| [`MomijiEffect`](/docs/effect-plugins/momiji/) | `momiji` | もみじ（赤みが強いバリエーション） |
| [`ParticleEffect`](/docs/effect-plugins/particles/) | `particles` | Three.js による3Dパーティクル群（`useThreeJS: true` 必須） |
| [`ProjectorFlickerEffect`](/docs/effect-plugins/projector-flicker/) | `projector-flicker` | 古い映写機のフリッカー。レトロ・アナログ感 |
| [`RainEffect`](/docs/effect-plugins/rain/) | `rain` | 縦に落ちる雨のライン。梅雨・夜の雨 |
| [`RippleEffect`](/docs/effect-plugins/ripple/) | `ripple` | クリックで水面に波紋が広がる。水・清涼感 |
| [`SakuraEffect`](/docs/effect-plugins/sakura/) | `sakura` | 桜の花びらが舞う（フルバリエーション）。春 |
| [`ShimmerEffect`](/docs/effect-plugins/shimmer/) | `shimmer` | キラキラした光の粒。高級感・ジュエリー |
| [`SnowEffect`](/docs/effect-plugins/snow/) | `snow` | 白い雪がゆっくり降る。冬・クリスマス |
| [`SparksEffect`](/docs/effect-plugins/sparks/) | `sparks` | 火花・スパークがはじける。工場・ものづくり |
| [`StarFieldEffect`](/docs/effect-plugins/stars/) | `stars` | 星空。夜・宇宙・ロマンティック |
| [`StarSpeedEffect`](/docs/effect-plugins/star-speed/) | `star-speed` | 星が高速で流れるワープ演出。SF・スピード感 |
| [`StatusUpEffect`](/docs/effect-plugins/status-up/) | `status-up` | ゲームのステータスアップ表示。ゲーミング・デジタル |
| [`SteamEffect`](/docs/effect-plugins/steam/) | `steam` | 湯気が立ち上る。温泉・カフェ・温かみ |
| [`VintageFilmEffect`](/docs/effect-plugins/vintage-film/) | `vintage-film` | フィルムグレイン・スクラッチノイズ。レトロ・映画的 |
| [`WaveRippleEffect`](/docs/effect-plugins/wave-ripple/) | `wave-ripple` | ウェーブと波紋の水面表現。海・プール |
| [`WaveEffect`](/docs/effect-plugins/waves/) | `waves` | なめらかな波形。海・音楽・リズム感 |

> ★ `GridConstruction` は完了時に `ak2:grid-ready` カスタムイベントを発行します。`useLogoAnimation: true` はこのイベントをリッスンして SVG ストロークアニメーションを開始します。

---

## カーソルエフェクト

### cursorMagnetic

`data-cursor-area` 内でマウスカーソルをカスタム表示に切り替えます。`data-magnetic` を付与した要素はカーソルに吸い付くように動きます。

{% raw %}
```nunjucks
{% from "effect-cursor-magnetic/effect-cursor-magnetic.njk" import cursorMagnetic %}

{# body 直下に1回だけ配置 #}
{{ cursorMagnetic() }}
```
{% endraw %}

{% raw %}
```html
<section data-cursor-area>
  <button data-magnetic type="button">Magnetic Button</button>
</section>
```
{% endraw %}

> 1ページあたり1回のみ呼び出してください。

---

## モーションエフェクト

### MagneticEffect（磁力エフェクト）

`.btn-magnetic` クラスを持つ要素をマウスカーソルに引き寄せます。

| パラメーター | デフォルト | 説明 |
|---|---|---|
| `strength` | `0.3` | 引力の強さ（0〜1） |

{% raw %}
```javascript
new MagneticEffect()                    // デフォルト（strength: 0.3）
new MagneticEffect({ strength: 0.5 })  // 引力を強める
```
{% endraw %}

---

### CounterAnimation（数値カウントアップ）

`.counter-number` クラスの要素がビューポートに入ると、数値が 0 から目標値までカウントアップします。

| HTML 属性 | デフォルト | 説明 |
|---|---|---|
| `data-target` | — | 目標値（必須） |
| `data-duration` | `2000` | アニメーション時間（ms） |
| `data-suffix` | `''` | 数値の後ろに付加する文字列 |

{% raw %}
```html
<span class="counter-number" data-target="1000" data-duration="2000" data-suffix="+"></span>
```
{% endraw %}

---

### effect-motion-fadein（フェードイン）

`.fade-in-section` クラスの要素がビューポートに入るとフェードインします。パラメーター設定は不要で、ページ読み込み時に自動起動します。

| HTML 属性 | デフォルト | 説明 |
|---|---|---|
| `data-delay` | `0` | 遅延時間（ms） |

{% raw %}
```html
<div class="fade-in-section" data-delay="200">...</div>
```
{% endraw %}

---

## テキストエフェクト

### TypeWriter（タイピングアニメーション）

文字列を1文字ずつタイピング → 削除 → 繰り返しで表示するタイプライターエフェクトです。

| パラメーター | デフォルト | 説明 |
|---|---|---|
| `speed` | `80` | タイピング速度（ms/文字） |
| `deleteSpeed` | `40` | 削除速度（ms/文字） |
| `waitTime` | `2200` | 表示待機時間（ms） |
| `placeholder` | — | テキスト幅確保用の要素（任意） |

{% raw %}
```javascript
new TypeWriter({ speed: 60, deleteSpeed: 30, waitTime: 1800 })
```
{% endraw %}

---

## カスタムエフェクトの作成

AK²Engine インターフェースを実装したクラスを作成し、`window` に登録することでカスタムエフェクトを追加できます。

{% raw %}
```javascript
class MyEffect {
  constructor(options = {}) {
    this.options = options;  // YAMLオプションを受け取る
  }

  init(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    // CSS変数またはYAMLオプションから設定を読み取る
    const style = getComputedStyle(document.documentElement);
    this.count = this.options.count
      ?? parseInt(style.getPropertyValue('--my-count') || '100');
  }

  update(dt) { /* パーティクル更新（dt: 前フレームからの経過秒数） */ }
  draw(ctx)  { /* 描画処理 */ }
  onResize(w, h) { /* キャンバスサイズ変更時の処理 */ }
}

window.MyEffect = MyEffect;
```
{% endraw %}

セクション個別エフェクトでYAMLパラメーターを受け取るには、`constructor(options = {})` を実装してください。

---

**前のページ:** [← ボタンプラグイン](/docs/button-plugins/) | **[↑ 目次](/docs/)** | **次のページ:** [Eleventy設定 →](/docs/eleventy-config/)
