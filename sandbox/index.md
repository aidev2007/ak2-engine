---
layout: layouts/base.njk
title: Sandbox Index
navBg: "solid"
effects:
  - snow
---
{% from "components/macros.njk" import sectionHeader, bgShapes %}
{% from "layout-hero-kinetic/layout-hero-kinetic.njk" import pageHero %}

{{ pageHero(
  subtitle="@aidev2007/engine",
  title="Plugin Sandbox",
  lead="エンジン・プラグインの動作確認環境です。各テストページでプラグインの挙動を確認してください。",
  note="このページは開発用です。本番サイトには含まれません。",
  extraClass="section--parts-hero"
) }}

<section class="section section--white">
  <div class="container">
    {{ sectionHeader("SANDBOX PAGES", "テストページ一覧") }}
    <div class="parts-category-grid">
      <a href="/effects/" class="parts-category-card parts-category-card--effects">
        <div class="parts-category-card__num">01 / Effects</div>
        <div class="parts-category-card__title">Background Effects</div>
        <p class="parts-category-card__desc">27種のキャンバスエフェクトを動作確認。AK²Engine の登録パターンをテストします。</p>
        <span class="parts-category-card__link">テストページを開く →</span>
      </a>
      <a href="/blocks/" class="parts-category-card">
        <div class="parts-category-card__num">02 / Blocks</div>
        <div class="parts-category-card__title">Block Plugins</div>
        <p class="parts-category-card__desc">11種のブロックコンポーネント（card, form, CTA等）のマクロ呼び出しをテストします。</p>
        <span class="parts-category-card__link">テストページを開く →</span>
      </a>
      <a href="/layout/" class="parts-category-card parts-category-card--layout">
        <div class="parts-category-card__num">03 / Layout</div>
        <div class="parts-category-card__title">Layout Plugins</div>
        <p class="parts-category-card__desc">Header / Footer / Hero の動作確認。透明ヘッダー、ウェーブ、pageHero マクロをテストします。</p>
        <span class="parts-category-card__link">テストページを開く →</span>
      </a>
      <a href="/buttons/" class="parts-category-card parts-category-card--buttons">
        <div class="parts-category-card__num">04 / Buttons</div>
        <div class="parts-category-card__title">Button Plugins</div>
        <p class="parts-category-card__desc">3種の GSAP インタラクティブボタン（Liquid / Stagger / Stroke）の動作確認。useGsap: true が必要です。</p>
        <span class="parts-category-card__link">テストページを開く →</span>
      </a>
    </div>
  </div>
</section>

<section class="section section--dark">
  <div class="container">
    {{ sectionHeader("ENGINE STATS", "エンジン構成", true) }}
    <div class="card-grid">
      <div class="glass-card glass-card--dark">
        <div class="card-title">Core Files</div>
        <p class="card-text">core-engine.js, core-site.js,<br>card-preview.js, section-effects.js</p>
      </div>
      <div class="glass-card glass-card--dark">
        <div class="card-title">Effect Plugins</div>
        <p class="card-text">27 Canvas Effects<br>(bg, interact, motion, text)</p>
      </div>
      <div class="glass-card glass-card--dark">
        <div class="card-title">Block Plugins</div>
        <p class="card-text">11 Nunjucks Macros<br>(card, form, CTA, FAQ…)</p>
      </div>
      <div class="glass-card glass-card--dark">
        <div class="card-title card-title--violet">Button Plugins</div>
        <p class="card-text">3 GSAP Buttons<br>(Liquid, Stagger, Stroke)</p>
      </div>
      <div class="glass-card glass-card--dark">
        <div class="card-title">Layout Plugins</div>
        <p class="card-text">Header, Footer, Hero<br>(kinetic style)</p>
      </div>
    </div>
  </div>
</section>
