---
layout: layouts/base.njk
title: "AK²Engine ドキュメント"
navBg: "solid"
sections:
  - type: hero
    subtitle: "@aidev2007/engine"
    title: "AK²Engine Docs"
    lead: "Eleventy ベースの静的コンポーネントエンジン。このドキュメントでサイト構築を完結させます。"
    note: "v0.1.3 対応ドキュメントです。"
    extraClass: "section--parts-hero"
    effects:
      - name: SnowEffect
        count: 20
        alpha: 0.8

  - type: feature-grid
    heading: "DOCUMENTATION"
    subheading: "チャプター一覧"
    linkText: "ドキュメントを読む →"
    items:
      - num: "01 / はじめに"
        title: "クイックスタート"
        desc: "プロジェクト構成・Eleventyセットアップ・初期設定"
        href: "/docs/getting-started/"
      - num: "02 / データ"
        title: "データスキーマ"
        desc: "site.json・nav.json・effectClasses.json の設定"
        href: "/docs/data-schema/"
      - num: "03 / レイアウト"
        title: "ベースレイアウト"
        desc: "base.njk のテンプレートとフロントマターオプション"
        href: "/docs/base-layout/"
      - num: "04 / 新機能"
        title: "YAMLセクション アーキテクチャ"
        desc: "sections: 配列でHTMLを書かずにページを構成する新設計"
        href: "/docs/yaml-sections/"
        extraClass: "parts-category-card--highlight"
      - num: "05 / プラグイン"
        title: "レイアウトプラグイン"
        desc: "ヘッダー・フッター・ヒーローの使い方"
        href: "/docs/layout-plugins/"
      - num: "06 / プラグイン"
        title: "ブロックプラグイン"
        desc: "カード・フォーム・CTAなど11種のブロック"
        href: "/docs/block-plugins/"
      - num: "07 / プラグイン"
        title: "ボタンプラグイン"
        desc: "GSAP駆動のインタラクティブボタン3種"
        href: "/docs/button-plugins/"
      - num: "08 / エフェクト"
        title: "エフェクトプラグイン"
        desc: "背景エフェクト31種・セクション個別指定・パラメータ設定"
        href: "/docs/effect-plugins/"
        extraClass: "parts-category-card--dark"
      - num: "09 / 設定"
        title: "Eleventy 設定"
        desc: ".eleventy.js のサンプルと解説"
        href: "/docs/eleventy-config/"
      - num: "10 / CSS"
        title: "CSSカスタマイズ"
        desc: "CSS変数・セクションクラス・サイト固有スタイルの追加方法"
        href: "/docs/css-customization/"
      - num: "11 / ガイド"
        title: "ベストプラクティス"
        desc: "インラインスタイル禁止・BEM設計・.md/.njk使い分け"
        href: "/docs/best-practices/"
---

このページはAK²Engineの公式ドキュメントです。
エンジンの内部実装を読まなくても、このドキュメントだけでサイト構築が完結するよう設計されています。

## バージョン情報

| バージョン | 日付 | 主な変更 |
|---|---|---|
| v0.1.3 | 2026-03-02 | YAMLセクション駆動アーキテクチャ、セクション個別エフェクト・パラメータ対応 |
| v0.1.2 | 2026-02-25 | プラグインAPIリファレンス整備 |

## このドキュメントの対象読者

- `ak2-official` 等のサイトを構築するAI・開発者
- AK²Engineを使って新規サイトを作成する開発者

Sandboxページで実際の動作を確認しながら開発を進めてください。
