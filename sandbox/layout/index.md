---
layout: layouts/base.njk
title: Layout Test
transparentHeader: true
navBg: "solid"
effects:
  - GridConstruction
sections:
  - type: content
  - type: stat-grid
    heading: "LAYOUT PLUGINS"
    subheading: "レイアウトプラグイン"
    items:
      - title: "layout-header-nav"
        text: "グローバルヘッダー。<br><code>transparentHeader: true</code> でページトップを透明化。<br>スクロールで <code>is-scrolled</code> クラスが付与されます。"
      - title: "layout-footer-kinetic"
        text: "グローバルフッター。<br><code>site.footerDesc</code>、<code>site.footerAboutLinks</code>、<code>site.copyright</code> でカスタマイズ。"
      - title: "heroLogo + heroContent"
        text: "ヒーローセクション用マクロ。<br><code>heroContent</code> は <code>copies</code> 配列からランダムに1つ選択して表示します。"
      - title: "heroWave"
        text: "SVGウェーブアニメーション。<br><code>c1〜c4</code> で4層のfill色を指定。<code>count</code> で層数を制御（1〜4）。"
---
{% from "components/macros.njk" import bgShapes %}
{% from "layout-hero-kinetic/layout-hero-kinetic.njk" import heroLogo, heroContent, heroWave %}

{# ── Kinetic Hero（layout-hero-kinetic プラグインのデモ） ── #}
<section class="section section--kinetic-hero">
  {{ bgShapes([
    {top: "10%", left: "-5%",  w: "600px", h: "400px", c1: "rgba(2,93,204,0.15)",  c2: "rgba(0,198,255,0.05)"},
    {top: "40%", right: "-5%", w: "500px", h: "350px", c1: "rgba(0,198,255,0.1)", c2: "rgba(2,93,204,0.05)", delay: "5s"}
  ]) }}

  {% call heroLogo() %}
  <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
    <rect width="80" height="80" rx="16" fill="rgba(2,93,204,0.3)" stroke="rgba(0,198,255,0.5)" stroke-width="1"/>
    <text x="50%" y="56%" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-weight="bold" font-size="28" fill="#00C6FF">AK</text>
  </svg>
  {% endcall %}

  {{ heroContent(
    copies=[
      {headline: "Engine Layer", en: "Build without borders.", desc: "エンジンとコンテンツを分離した、次世代のWeb制作基盤。"},
      {headline: "Plugin First", en: "Compose. Deploy. Repeat.", desc: "プラグインを組み合わせるだけで、あらゆるサイトを構築できます。"}
    ],
    brandName="@ak2lab/engine"
  ) }}

  {{ heroWave(
    c1="rgba(2,93,204,0.05)",
    c2="rgba(2,93,204,0.10)",
    c3="rgba(0,198,255,0.05)",
    c4="#0f172a"
  ) }}
</section>
