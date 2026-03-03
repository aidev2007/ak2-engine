---
layout: layouts/base.njk
title: Effects Test
effects:
  - AuroraEffect
navBg: "solid"
---
{% from "components/macros.njk" import sectionHeader, bgShapes %}
{% from "layout-hero-kinetic/layout-hero-kinetic.njk" import pageHero %}
{% from "effect-bg-aurora/effect-bg-aurora.njk" import bgAurora %}
{% from "effect-bg-snow/effect-bg-snow.njk" import bgSnow %}
{% from "effect-bg-sakura/effect-bg-sakura.njk" import bgSakura %}
{% from "effect-bg-sparks/effect-bg-sparks.njk" import bgSparks %}

{{ pageHero(
  subtitle="01 / Effects",
  title="Background Effects",
  lead="27種のキャンバスエフェクトをテストします。AK²Engine に登録されたエフェクトはページ全体の背景として動作します。",
  note="現在このページは effects: [aurora] が有効です。front-matter を変更して別のエフェクトをテストしてください。",
  extraClass="section--parts-hero"
) }}

<section class="section section--white">
  <div class="container">
    {{ sectionHeader("CANVAS EFFECTS", "エフェクト一覧") }}
    <p class="sb-lead">
      各エフェクトは <code>front-matter</code> の <code>effects: [key]</code> で有効化します。<br>
      <code>effectClasses.json</code> でキー → クラス名のマッピングが定義されています。
    </p>
    <div class="effects-showcase-grid">
      <div class="effect-card">
        <div class="effect-card__header">
          <div class="effect-card__title">Aurora</div>
          <span class="effect-card__badge">ACTIVE</span>
        </div>
        <p class="effect-card__desc">オーロラ風のグラデーション波エフェクト。</p>
        <code class="effect-card__code">effects: [aurora]</code>
      </div>
      <div class="effect-card">
        <div class="effect-card__title">Snow</div>
        <p class="effect-card__desc">雪が降るパーティクルエフェクト。</p>
        <code class="effect-card__code">effects: [snow]</code>
      </div>
      <div class="effect-card">
        <div class="effect-card__title">Sakura</div>
        <p class="effect-card__desc">桜の花びらが舞うエフェクト。</p>
        <code class="effect-card__code">effects: [sakura]</code>
      </div>
      <div class="effect-card">
        <div class="effect-card__title">Firefly</div>
        <p class="effect-card__desc">ホタルの光跡エフェクト（オフスクリーンCanvas使用）。</p>
        <code class="effect-card__code">effects: [firefly]</code>
      </div>
      <div class="effect-card">
        <div class="effect-card__title">Grid Construction</div>
        <p class="effect-card__desc">グリッド展開アニメーション。完了時に <code>ak2:grid-ready</code> イベントを発行。</p>
        <code class="effect-card__code">effects: [grid-construction]</code>
      </div>
      <div class="effect-card">
        <div class="effect-card__title">Particles (Three.js)</div>
        <p class="effect-card__desc">Three.js を使った3Dパーティクル。</p>
        <code class="effect-card__code">useThreeJS: true</code>
      </div>
      <div class="effect-card">
        <div class="effect-card__title">Stars</div>
        <p class="effect-card__desc">星空エフェクト。</p>
        <code class="effect-card__code">effects: [stars]</code>
      </div>
      <div class="effect-card">
        <div class="effect-card__title">Waves</div>
        <p class="effect-card__desc">波形アニメーション。</p>
        <code class="effect-card__code">effects: [waves]</code>
      </div>
      <div class="effect-card">
        <div class="effect-card__title">Lightning</div>
        <p class="effect-card__desc">稲妻エフェクト。</p>
        <code class="effect-card__code">effects: [lightning]</code>
      </div>
      <div class="effect-card">
        <div class="effect-card__title">Rain</div>
        <p class="effect-card__desc">雨エフェクト。</p>
        <code class="effect-card__code">effects: [rain]</code>
      </div>
      <div class="effect-card">
        <div class="effect-card__title">Ripple</div>
        <p class="effect-card__desc">水面の波紋エフェクト。</p>
        <code class="effect-card__code">effects: [ripple]</code>
      </div>
      <div class="effect-card">
        <div class="effect-card__title">Sparks</div>
        <p class="effect-card__desc">火花パーティクルエフェクト。</p>
        <code class="effect-card__code">effects: [sparks]</code>
      </div>
    </div>
    <h3 class="sb-section-subtitle">全エフェクトキー一覧</h3>
    <div class="sb-badge-list">
      {% for key, cls in effectClasses %}
      <span class="card-badge sb-effect-badge">{{ key }}<span class="sb-badge-value"> → {{ cls }}</span></span>
      {% endfor %}
    </div>
  </div>
</section>

<section class="section section--dark">
  <div class="container">
    {{ sectionHeader("SECTION EFFECTS", "セクションエフェクト", true) }}
    <p class="sb-desc--muted">
      <code>data-section-effect="ClassName"</code> と <code>data-preview="ClassName"</code> 属性で、
      インライン canvas エフェクトをセクション内に配置できます。
    </p>
    <div class="sb-canvas-grid">
      <div>
        <p class="sb-canvas-label">data-section-effect（全幅）</p>
        <canvas data-section-effect="SnowEffect" class="sb-preview-canvas"></canvas>
      </div>
      <div>
        <p class="sb-canvas-label">data-preview（カードプレビュー）</p>
        <canvas data-preview="AuroraEffect" class="sb-preview-canvas"></canvas>
      </div>
    </div>
  </div>
</section>
