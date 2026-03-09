---
title: "AK²Engine v0.1.4 リリースノート"
date: 2026-03-08
postCategory: "お知らせ"
postTags:
  - ak2engine
  - eleventy
---

## 概要

AK²Engine v0.1.4 をリリースしました。YAMLセクション駆動アーキテクチャの安定化、全文検索（Pagefind）統合、エフェクトパラメータ対応が主な変更点です。

---

## 主な変更点

### YAML セクション駆動アーキテクチャ

フロントマターの `sections:` 配列だけでページを構成できる設計が安定しました。

### 全文検索（Pagefind）

`block-search-modal` プラグインにより、サイト内全文検索をモーダルで提供します。

### エフェクトパラメータ

各セクションに `effects:` を指定し、背景エフェクトを個別に適用できるようになりました。

---

## 今後の予定

- 残りの背景エフェクトへの `constructor(options)` 実装
- ドキュメントサイトの充実
