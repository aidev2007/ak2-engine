---
layout: layouts/base.njk
title: Sandbox Index
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

      <a href="/effects/" class="parts-category-card" style="border-color:rgba(0,198,255,0.2);background:linear-gradient(135deg,#0f172a,#1e293b);color:white">
        <div class="parts-category-card__num" style="color:var(--color-secondary)">01 / Effects</div>
        <div class="parts-category-card__title" style="color:white">Background Effects</div>
        <p class="parts-category-card__desc" style="color:#94a3b8">27種のキャンバスエフェクトを動作確認。AK²Engine の登録パターンをテストします。</p>
        <span class="parts-category-card__link" style="color:var(--color-secondary)">テストページを開く →</span>
      </a>

      <a href="/blocks/" class="parts-category-card">
        <div class="parts-category-card__num">02 / Blocks</div>
        <div class="parts-category-card__title">Block Plugins</div>
        <p class="parts-category-card__desc">11種のブロックコンポーネント（card, form, CTA等）のマクロ呼び出しをテストします。</p>
        <span class="parts-category-card__link">テストページを開く →</span>
      </a>

      <a href="/layout/" class="parts-category-card" style="border-color:rgba(2,93,204,0.15);background:linear-gradient(135deg,#f0f9ff,#e0f2fe)">
        <div class="parts-category-card__num" style="color:var(--color-primary)">03 / Layout</div>
        <div class="parts-category-card__title">Layout Plugins</div>
        <p class="parts-category-card__desc">Header / Footer / Hero の動作確認。透明ヘッダー、ウェーブ、pageHero マクロをテストします。</p>
        <span class="parts-category-card__link" style="color:var(--color-primary)">テストページを開く →</span>
      </a>

    </div>
  </div>
</section>

<section class="section section--dark">
  <div class="container">
    {{ sectionHeader("ENGINE STATS", "エンジン構成", true) }}
    <div class="card-grid">
      <div class="glass-card" style="background:rgba(255,255,255,0.05);border-color:rgba(255,255,255,0.1)">
        <div class="card-title" style="color:var(--color-secondary)">Core Files</div>
        <p class="card-text" style="color:#94a3b8">core-engine.js, core-site.js,<br>card-preview.js, section-effects.js</p>
      </div>
      <div class="glass-card" style="background:rgba(255,255,255,0.05);border-color:rgba(255,255,255,0.1)">
        <div class="card-title" style="color:var(--color-secondary)">Effect Plugins</div>
        <p class="card-text" style="color:#94a3b8">27 Canvas Effects<br>(bg, interact, motion, text)</p>
      </div>
      <div class="glass-card" style="background:rgba(255,255,255,0.05);border-color:rgba(255,255,255,0.1)">
        <div class="card-title" style="color:var(--color-secondary)">Block Plugins</div>
        <p class="card-text" style="color:#94a3b8">11 Nunjucks Macros<br>(card, form, CTA, FAQ…)</p>
      </div>
      <div class="glass-card" style="background:rgba(255,255,255,0.05);border-color:rgba(255,255,255,0.1)">
        <div class="card-title" style="color:var(--color-secondary)">Layout Plugins</div>
        <p class="card-text" style="color:#94a3b8">Header, Footer, Hero<br>(kinetic style)</p>
      </div>
    </div>
  </div>
</section>
