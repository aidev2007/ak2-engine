---
layout: layouts/base.njk
title: "エフェクトプラグイン"
navBg: "solid"
sections:
  - type: article
    category: "AK²ENGINE DOCS"
    title: "エフェクトプラグイン"
    lead: "背景エフェクト31種の使い方。ページ全体・セクション個別・カードプレビューの3つの利用パターンがあります。"
---

[← 目次に戻る](/docs/)

---

## 利用パターン概要

| パターン | 仕組み | 用途 |
|---|---|---|
| **ページ全体** | `effects: [key]` frontmatter → `AK2.register()` | 固定レイヤーで全ページに重なる |
| **セクション個別** | `sections[].effects[]` YAML配列 | 特定セクション内だけに表示 |
| **カードプレビュー** | `data-preview="ClassName"` HTML属性 | ホバー時にプレビュー再生 |

---

## 1. ページ全体背景エフェクト

`effects:` にエフェクトキーを配列で指定します。複数同時指定可能。

{% raw %}
```yaml
---
layout: layouts/base.njk
title: My Page
effects:
  - snow
  - aurora
---
```
{% endraw %}

`base.njk` が自動的に `AK2.register(new ClassName())` を呼び出します。

### エフェクトキー一覧

| キー | クラス名 | 見た目・雰囲気 |
|---|---|---|
| `aurora` | `AuroraEffect` | 青〜紫〜緑の光が揺らめくオーロラ。幻想的・神秘的な演出 |
| `cherry-blossom` | `CherryBlossomEffect` | ピンクの花びらが舞い落ちる。春・和風サイト |
| `cloud` | `CloudEffect` | 白い雲が緩やかに流れる。空・清潔感・爽やかさ |
| `ember` | `EmberEffect` | 炎の火の粉が上方向に漂う。情熱・夏祭り |
| `firefly` | `FireflyEffect` | 光の点（ホタル）が光跡を描く。夏・幻想的 |
| `grid-construction` | `GridConstruction` | ページ開幕時にグリッド線が展開するローディング演出★ |
| `leaf` | `LeafEffect` | 緑の葉が揺れながら漂う。ナチュラル・エコ系 |
| `leaf-fall` | `LeafFallEffect` | 葉が落下する秋のシーン |
| `lightning` | `LightningEffect` | 稲妻が走る。エネルギッシュ・テック・ロック系 |
| `lines` | `GridEffect` | 細い線が動くグリッドパターン。テクニカル・ミニマル |
| `maple-leaves` | `MapleLeafEffect` | もみじの葉が舞う。紅葉・日本の秋 |
| `momiji` | `MomijiEffect` | もみじ（赤みが強いバリエーション）|
| `particles` | `ParticleEffect` | Three.js による3Dパーティクル群（`useThreeJS: true` 必須） |
| `projector-flicker` | `ProjectorFlickerEffect` | 古い映写機のフリッカー。レトロ・アナログ感 |
| `rain` | `RainEffect` | 縦に落ちる雨のライン。梅雨・夜の雨 |
| `ripple` | `RippleEffect` | 水面に波紋が広がる。水・清涼感・温泉 |
| `sakura` | `SakuraEffect` | 桜の花びらが舞う（フルバリエーション）。春 |
| `shimmer` | `ShimmerEffect` | キラキラした光の粒。高級感・ジュエリー |
| `snow` | `SnowEffect` | 白い雪がゆっくり降る。冬・クリスマス |
| `sparks` | `SparksEffect` | 火花・スパークがはじける。工場・ものづくり |
| `stars` | `StarFieldEffect` | 星空。夜・宇宙・ロマンティック |
| `star-speed` | `StarSpeedEffect` | 星が高速で流れるワープ演出。SF・スピード感 |
| `status-up` | `StatusUpEffect` | ゲームのステータスアップ表示。ゲーミング・デジタル |
| `steam` | `SteamEffect` | 湯気が立ち上る。温泉・カフェ・温かみ |
| `vintage-film` | `VintageFilmEffect` | フィルムグレイン・スクラッチノイズ。レトロ・映画的 |
| `wave-ripple` | `WaveRippleEffect` | ウェーブと波紋の水面表現。海・プール |
| `waves` | `WaveEffect` | なめらかな波形。海・音楽・リズム感 |

> ★ `grid-construction` は完了時に `ak2:grid-ready` カスタムイベントを発行します。`useLogoAnimation: true` はこのイベントをリッスンしてSVGストロークアニメーションを開始します。

### CSS カスタム変数によるグローバル調整

エフェクトは CSS カスタムプロパティで調整できます。

{% raw %}
```css
body {
  --snow-count: 200;
  --snow-alpha: 0.9;
  --aurora-alpha: 0.3;
  --firefly-hue: 270;
}
```
{% endraw %}

各エフェクトの変数名は `--{効果名}-count`, `--{効果名}-alpha` が基本パターンです。

---

## 2. セクション個別エフェクト

YAMLセクションの `hero` タイプで使用できます。そのセクション内にのみ表示されます。

### 文字列記法（パラメータなし）

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

### オブジェクト記法（パラメータ指定）

{% raw %}
```yaml
sections:
  - type: hero
    title: "タイトル"
    effects:
      - name: SnowEffect
        count: 20       # 粒子数（デフォルト60）
        alpha: 1.5      # 明るさ係数（デフォルト1.0）
        hue: 210        # 色相（デフォルト: 白/青白）
        lightness: 70   # 明度（デフォルト70）
      - name: FireflyEffect
        interactive: false   # マウス反応なし
```
{% endraw %}

### 両記法の混在

{% raw %}
```yaml
effects:
  - SnowEffect           # 文字列（オプションなし）
  - name: FireflyEffect  # オブジェクト（オプションあり）
    interactive: false
  - SparksEffect         # 文字列（オプションなし）
```
{% endraw %}

### 重ねがけの注意点

複数エフェクトを重ねる場合、`mix-blend-mode: screen` により記述順に関わらず全エフェクトが表示されます。FireflyEffect はトレイル維持のためキャンバスに暗背景を描画しますが、screen合成により下のエフェクトが透けて見えます。

### SnowEffect パラメータ一覧

| パラメータ | デフォルト | 説明 |
|---|---|---|
| `count` | `60` | 粒子数（推奨: 20〜100） |
| `alpha` | `1.0` | 明るさ係数（推奨: 0.5〜1.5） |
| `hue` | 未設定 | 色相 0〜360（未設定で白/青白） |
| `lightness` | `70` | 明度 0〜100（`hue` 設定時のみ有効） |

### FireflyEffect パラメータ一覧

| パラメータ | デフォルト | 説明 |
|---|---|---|
| `interactive` | `true` | マウスへの反応 |

---

## 3. カードプレビュー

`data-preview` 属性を付与したキャンバスで、ホバー時にエフェクトをプレビュー再生します。

{% raw %}
```html
<canvas data-preview="SnowEffect" style="width:100%;height:200px;border-radius:12px"></canvas>
```
{% endraw %}

`data-preview` 属性値は JS クラス名（`effectClasses.json` の値側）を指定します。

---

## 4. カーソルエフェクト — `cursorMagnetic`

`data-cursor-area` 内でカスタムカーソルに切り替わります。`data-magnetic` 要素はカーソルに吸い付きます。

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

**Sandbox デモ:** `/interaction/`

---

## 5. カスタムエフェクトの作成

AK²Engine インターフェースを実装したクラスを作成し、`window` に登録します。

{% raw %}
```javascript
class MyEffect {
  constructor(options = {}) {
    this.options = options;  // YAMLオプションを受け取る
  }

  init(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    // CSS変数から設定を読み取る
    const style = getComputedStyle(document.documentElement);
    this.count = this.options.count
      ?? parseInt(style.getPropertyValue('--my-count') || '100');
  }

  update(dt) { /* パーティクル更新 */ }
  draw(ctx) { /* 描画 */ }
  onResize(w, h) { /* キャンバスサイズ変更対応 */ }
}

window.MyEffect = MyEffect;
```
{% endraw %}

セクション個別エフェクトでパラメータを受け取るには、`constructor(options = {})` を実装してください。

---

**前のページ:** [← ボタンプラグイン](/docs/button-plugins/) | **[↑ 目次](/docs/)** | **次のページ:** [Eleventy設定 →](/docs/eleventy-config/)
