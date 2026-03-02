---
layout: layouts/base.njk
title: Buttons Test
useGsap: true
navBg: "solid"
---
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;700&family=Syne:wght@700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400&family=M+PLUS+Rounded+1c:wght@700&display=swap" rel="stylesheet">

{% from "components/macros.njk" import sectionHeader %}
{% from "layout-hero-kinetic/layout-hero-kinetic.njk" import pageHero %}
{% from "block-button-liquid/block-button-liquid.njk" import liquidButton %}
{% from "block-button-stagger/block-button-stagger.njk" import staggerButton %}
{% from "block-button-stroke/block-button-stroke.njk" import strokeButton %}

{{ pageHero(
  subtitle="04 / Buttons",
  title="Button Plugins",
  lead="3種の GSAP インタラクティブボタンの動作確認ページです。<br>ボタンにホバーして各種アニメーションを確認してください。",
  note="このページは useGsap: true が有効です。GSAP 3.12.5 が CDN から読み込まれます。",
  extraClass="section--parts-hero"
) }}

{# ── Liquid Morphing Button ──────────────────────────────── #}
<section class="section section--white">
  <div class="container">
    {{ sectionHeader("block-button-liquid", "liquidButton") }}
    <p class="sb-lead">
      ホバーすると液体のように形が変形するボタン。<br>
      スクイッシュ → バウンス → 安定ホバーの3段階アニメーション。<br>
      <code>color</code> / <code>textColor</code> / <code>fontFamily</code> / <code>float</code> / <code>shadow</code> / <code>radius</code> でカスタマイズできます。
    </p>
    <div class="sb-btn-row">
      {{ liquidButton("Get Started") }}
      {{ liquidButton("Learn More", color="#0d9488") }}
      {{ liquidButton("はじめる", color="#4f46e5", fontFamily="'M PLUS Rounded 1c', sans-serif") }}
      {{ liquidButton("詳しく見る", color="#be185d", fontFamily="'Noto Sans JP', sans-serif") }}
      {{ liquidButton("購入する", color="#b45309", fontFamily="'M PLUS Rounded 1c', sans-serif") }}
      {{ liquidButton("OK", color="#7c3aed") }}
      {{ liquidButton("キャンセル", color="#374151", fontFamily="'Noto Sans JP', sans-serif", shadow=false) }}
      {{ liquidButton("Rounded", color="#0891b2", radius=8) }}
    </div>
    <h3 class="sb-param-title">パラメーター一覧</h3>
    <div class="sb-table-wrap">
      <table class="sb-param-table sb-param-table--light">
        <thead>
          <tr>
            <th>パラメーター</th>
            <th>型</th>
            <th>デフォルト</th>
            <th>説明</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>text</td><td>string</td><td>—</td><td>ボタンラベル（必須）</td></tr>
          <tr><td>color</td><td>string</td><td>'#5046e5'</td><td>ボタン色 hex</td></tr>
          <tr><td>textColor</td><td>string</td><td>'#ffffff'</td><td>テキスト色 hex</td></tr>
          <tr><td>fontFamily</td><td>string</td><td>"'Outfit', sans-serif"</td><td>フォントファミリー</td></tr>
          <tr><td>float</td><td>boolean</td><td>true</td><td>浮遊アニメーション</td></tr>
          <tr><td>shadow</td><td>boolean</td><td>true</td><td>ドロップシャドウ</td></tr>
          <tr><td>radius</td><td>number|'auto'</td><td>'auto'</td><td>角丸 px（'auto' で高さから自動計算）</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

{# ── Stagger Typography Button ───────────────────────────── #}
<section class="section section--stagger-bg">
  <div class="container">
    {{ sectionHeader("block-button-stagger", "staggerButton") }}
    <p class="sb-lead">
      ホバーすると文字が1文字ずつ順番にバウンスするタイポグラフィ主役のボタン。<br>
      ホバー時に光が走るシマー効果も付きます。<br>
      <code>staggerDir</code> で跳ね方向を、<code>bounceY</code> で跳ね上がり量を変えられます。
    </p>
    <div class="sb-btn-row sb-btn-row--md">
      {{ staggerButton("Get Started", float=true) }}
      {{ staggerButton("Bounce", color="#4f46e5", staggerDir="center") }}
      {{ staggerButton("Random!", color="#be185d", staggerDir="random") }}
      {{ staggerButton("はじめる", color="#0d9488", fontFamily="'Noto Sans JP', sans-serif", staggerDir="end", float=true) }}
      {{ staggerButton("タップ", color="#b45309", fontFamily="'Noto Sans JP', sans-serif", staggerDir="center") }}
      {{ staggerButton("Download", color="#18181b", staggerDir="end", shadow=true) }}
    </div>
    <h3 class="sb-param-title">パラメーター一覧</h3>
    <div class="sb-table-wrap">
      <table class="sb-param-table sb-param-table--warm">
        <thead>
          <tr>
            <th>パラメーター</th>
            <th>型</th>
            <th>デフォルト</th>
            <th>説明</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>text</td><td>string</td><td>—</td><td>ボタンラベル（必須）</td></tr>
          <tr><td>color</td><td>string</td><td>'#111111'</td><td>ボタン背景色</td></tr>
          <tr><td>textColor</td><td>string</td><td>'#ffffff'</td><td>テキスト色</td></tr>
          <tr><td>fontFamily</td><td>string</td><td>"'Syne', sans-serif"</td><td>フォント</td></tr>
          <tr><td>staggerDir</td><td>string</td><td>'start'</td><td>'start' | 'center' | 'end' | 'random'</td></tr>
          <tr><td>bounceY</td><td>number</td><td>-4</td><td>跳ね上がり量 px（負の値で上方向）</td></tr>
          <tr><td>float</td><td>boolean</td><td>false</td><td>浮遊アニメーション</td></tr>
          <tr><td>shadow</td><td>boolean</td><td>false</td><td>ドロップシャドウ</td></tr>
          <tr><td>radius</td><td>number|'auto'</td><td>'auto'</td><td>角丸 px（'auto' で高さから自動計算）</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

{# ── Stroke Draw Button ──────────────────────────────────── #}
<section class="section section--white">
  <div class="container">
    {{ sectionHeader("block-button-stroke", "strokeButton") }}
    <p class="sb-lead">
      ホバーするとSVGのstrokeが上辺中央から両方向に描画されるミニマルなボタン。<br>
      テキストも微妙に浮き上がります。マウスアウトで逆方向に消えます。<br>
      <code>color</code> と <code>textColor</code> を同色にするとカラーリングが統一されます。
    </p>
    <div class="sb-btn-stage">
      {{ strokeButton("Get Started", float=true) }}
      {{ strokeButton("Learn More", color="#0d9488", textColor="#0d9488") }}
      {{ strokeButton("Contact", color="#6366f1", textColor="#6366f1", radius=24) }}
      {{ strokeButton("はじめる", fontFamily="'Noto Sans JP', sans-serif", strokeWidth=1, float=true) }}
      {{ strokeButton("詳しく見る", fontFamily="'Noto Sans JP', sans-serif", color="#be185d", textColor="#be185d", radius=24, duration=0.7) }}
      {{ strokeButton("Download", radius=0, strokeWidth=1.5, duration=0.45) }}
    </div>
    <h3 class="sb-param-title">パラメーター一覧</h3>
    <div class="sb-table-wrap">
      <table class="sb-param-table sb-param-table--light">
        <thead>
          <tr>
            <th>パラメーター</th>
            <th>型</th>
            <th>デフォルト</th>
            <th>説明</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>text</td><td>string</td><td>—</td><td>ボタンラベル（必須）</td></tr>
          <tr><td>color</td><td>string</td><td>'#111111'</td><td>ホバー時ストローク色 hex</td></tr>
          <tr><td>textColor</td><td>string</td><td>'#111111'</td><td>テキスト色</td></tr>
          <tr><td>fontFamily</td><td>string</td><td>"'DM Sans', sans-serif"</td><td>フォント</td></tr>
          <tr><td>float</td><td>boolean</td><td>false</td><td>浮遊アニメーション</td></tr>
          <tr><td>shadow</td><td>boolean</td><td>false</td><td>ドロップシャドウ</td></tr>
          <tr><td>radius</td><td>number</td><td>3</td><td>角丸 px（0 でシャープ、24以上で楕円）</td></tr>
          <tr><td>strokeWidth</td><td>number</td><td>1.2</td><td>線の太さ px</td></tr>
          <tr><td>duration</td><td>number</td><td>0.55</td><td>ストローク描画時間（秒）</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

{# ── 使い方サンプル ──────────────────────────────────────── #}
<section class="section section--dark">
  <div class="container">
    {{ sectionHeader("USAGE", "使い方", true) }}
    <p class="sb-desc--muted">
      ページの front-matter に <code>useGsap: true</code> を設定し、<br>
      使用するフォントを事前に読み込んでから、マクロを呼び出してください。
    </p>
    <div class="glass-card glass-card--dark">
      <pre class="sb-code-pre"><code>---
layout: layouts/base.njk
title: My Page
useGsap: true
---
&lt;!-- フォントの読み込み（使用するフォントのみ） --&gt;
&lt;link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;700&amp;display=swap" rel="stylesheet"&gt;

&#123;% from "block-button-liquid/block-button-liquid.njk" import liquidButton %&#125;
&#123;% from "block-button-stagger/block-button-stagger.njk" import staggerButton %&#125;
&#123;% from "block-button-stroke/block-button-stroke.njk" import strokeButton %&#125;

&#123;&#123; liquidButton("Get Started", color="#5046e5") &#125;&#125;
&#123;&#123; staggerButton("Learn More", color="#0d9488", staggerDir="center") &#125;&#125;
&#123;&#123; strokeButton("Contact", color="#6366f1", textColor="#6366f1", radius=24) &#125;&#125;</code></pre>
    </div>
  </div>
</section>
