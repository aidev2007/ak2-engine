---
layout: layouts/base.njk
title: Sandbox Index
navBg: "solid"
sections:
  - type: hero
    subtitle: "@ak2lab/engine"
    title: "Plugin Sandbox"
    lead: "エンジン・プラグインの動作確認環境です。各テストページでプラグインの挙動を確認してください。"
    note: "このページは開発用です。本番サイトには含まれません。"
    extraClass: "section--parts-hero"
    effects:
      - name: SnowEffect
        count: 15
        alpha: 1.5
      - name: FireflyEffect
        interactive: false
      - SparksEffect
      - WaveRippleEffect
      - ShimmerEffect
      - CherryBlossomEffect
      - GridEffect
      - EmberEffect

  - type: feature-grid
    heading: "SANDBOX PAGES"
    subheading: "テストページ一覧"
    items:
      - num: "01 / Effects"
        title: "Background Effects"
        href: "/effects/"
        desc: "27種のキャンバスエフェクトを動作確認。AK²Engine の登録パターンをテストします。"
        extraClass: "parts-category-card--effects"
      - num: "02 / Blocks"
        title: "Block Plugins"
        href: "/blocks/"
        desc: "11種のブロックコンポーネント（card, form, CTA等）のマクロ呼び出しをテストします。"
      - num: "03 / Layout"
        title: "Layout Plugins"
        href: "/layout/"
        desc: "Header / Footer / Hero の動作確認。透明ヘッダー、ウェーブ、pageHero マクロをテストします。"
        extraClass: "parts-category-card--layout"
      - num: "04 / Buttons"
        title: "Button Plugins"
        href: "/buttons/"
        desc: "3種の GSAP インタラクティブボタン（Liquid / Stagger / Stroke）の動作確認。useGsap: true が必要です。"
        extraClass: "parts-category-card--buttons"
      - num: "05 / Blog Widgets"
        title: "Blog Widgets"
        href: "/blog-widgets/"
        desc: "ブログウィジェットデモ"
      - num: "06 / Search Widgets"
        title: "Search Widgets"
        href: "/search-widgets/"
        desc: "検索バーウィジェットデモ"

  - type: stat-grid
    heading: "ENGINE STATS"
    subheading: "エンジン構成"
    items:
      - title: "Core Files"
        text: "core-engine.js, core-site.js,<br>card-preview.js, section-effects.js"
      - title: "Effect Plugins"
        text: "27 Canvas Effects<br>(bg, interact, motion, text)"
      - title: "Block Plugins"
        text: "11 Nunjucks Macros<br>(card, form, CTA, FAQ…)"
      - title: "Button Plugins"
        text: "3 GSAP Buttons<br>(Liquid, Stagger, Stroke)"
        titleClass: "card-title--violet"
      - title: "Layout Plugins"
        text: "Header, Footer, Hero<br>(kinetic style)"
---
