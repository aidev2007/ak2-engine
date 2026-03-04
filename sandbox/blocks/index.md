---
layout: layouts/base.njk
title: Blocks Test
navBg: "solid"
sections:
  - type: hero
    subtitle: "02 / Blocks"
    title: "Block Plugins"
    lead: "11種のブロックコンポーネントの動作確認ページです。各マクロの呼び出しパターンを確認できます。"
    extraClass: "section--parts-hero"

  - type: card-feature
    sectionClass: "section--white"
    heading: "block-card-feature"
    subheading: "featureItem"
    items:
      - icon: "zap"
        title: "High Performance"
        text: "高速なレンダリングエンジンで、スムーズなアニメーションを実現します。"
      - icon: "layers"
        title: "Plugin Architecture"
        text: "独立したプラグインシステムで、必要な機能だけを組み合わせられます。"
      - icon: "code-2"
        title: "Clean API"
        text: "シンプルなマクロAPIで、複雑なUIを数行で実装できます。"
      - icon: "shield"
        title: "Type Safe"
        text: "明確なインターフェース仕様で、予測可能な動作を保証します。"

  - type: card-philosophy
    sectionClass: "section--dark"
    heading: "block-card-philosophy"
    subheading: "philosophyCard"
    items:
      - char: "01"
        term: "Modularity"
        desc: "各プラグインは独立して動作します。"
      - char: "02"
        term: "Performance"
        desc: "必要最小限のコードで最大のパフォーマンスを実現。"
      - char: "03"
        term: "Clarity"
        desc: "明確な仕様とAPIで、誰でも使いこなせます。"

  - type: card-stance
    sectionClass: "section--stance"
    heading: "block-card-stance"
    subheading: "stanceCard"
    items:
      - icon: "01"
        title: "コードより体験を優先する"
        body: "エンジンの内部構造よりも、利用者の制作体験を第一に設計します。"
      - icon: "02"
        title: "仕様書を読めば動かせる"
        body: "ソースコードを読まなくてもAPIリファレンスだけで実装が完結します。"

  - type: card-target
    sectionClass: "section--target"
    heading: "block-card-target"
    subheading: "targetCard"
    items:
      - icon: "🤖"
        title: "AI Engineer"
        desc: "LLMを活用してWebサイトを構築するAIエンジニア"
      - icon: "🏗️"
        title: "Site Builder"
        desc: "テンプレートを活用してサイトを量産する制作者"
      - icon: "🎨"
        title: "Designer"
        desc: "デザインとコードを両立させたいクリエイター"

  - type: concept
    sectionClass: "section--concept-detail"
    heading: "block-concept-standard"
    subheading: "conceptBlock"
    items:
      - image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80"
        alt: "Plugin Architecture"
        title: "Plugin-First Design"
        body: "すべての機能はプラグインとして実装され、独立してテスト・配布できます。サイト固有のコンテンツと切り離された純粋なエンジン層が、再利用性を最大化します。"

  - type: faq
    sectionClass: "section--faq"
    heading: "block-faq-accordion"
    subheading: "faqItem"
    items:
      - q: "Q. プラグインはどこに配置しますか？"
        a: "A. <code>src/plugins/</code> 配下に各プラグインフォルダを配置します。フォルダ名がそのままNunjucksのimportパスになります。"
      - q: "Q. 新しいエフェクトを追加するには？"
        a: "A. <code>src/plugins/effect-bg-{name}/</code> フォルダを作成し、<code>{name}.js</code> にエフェクトクラスを実装します。<code>window.XEffect = XEffect</code> で公開してください。"
      - q: "Q. CSSはどのようにバンドルされますか？"
        a: "A. <code>src/base.css</code> を先頭に、<code>src/core/*.css</code>、<code>src/plugins/**/*.css</code> がアルファベット順に結合されます。"

  - type: cta
    title: "プラグインを使い始める"
    text: "PLUGINS_API_REFERENCE.md を読めば、すぐにサイト構築を開始できます。"
    linkUrl: "/"
    linkText: "Sandbox Indexへ戻る"

  - type: contact
    sectionClass: "section--contact"
    heading: "block-form-contact"
    subheading: "contactForm"
    action: "#"
---
