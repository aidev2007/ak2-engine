---
layout: layouts/base.njk
title: "全文検索（Pagefind）"
navBg: "solid"
sections:
  - type: article
    doc_group: "AK²ENGINE DOCS"
    title: "全文検索（Pagefind）"
    lead: "block-search-modal プラグインによるサイト内全文検索の導入方法です。"
---

[← 目次に戻る](/docs/)

---

## 概要

`block-search-modal` は、[Pagefind](https://pagefind.app/) を利用した全文検索モーダルを提供するプラグインです。ビルド時に静的HTMLからインデックスを自動生成し、WebAssembly ベースで高速な日本語検索を実現します。

---

## 導入手順

### 1. pagefind のインストール

{% raw %}
```bash
npm install -D pagefind
```
{% endraw %}

### 2. .eleventy.js にフックを追加

{% raw %}
```javascript
const { execSync } = require("child_process");

// eleventy.after でビルド完了後にインデックスを生成
eleventyConfig.on("eleventy.after", async ({ runMode }) => {
  if (runMode === "serve" || runMode === "watch") return;
  // 💬 日本語ステミングの不要なワーニングが表示されるのを防ぐため、--silent オプションを付与
  execSync("npx pagefind --site _site --silent", { stdio: "inherit" });
});
```
{% endraw %}

### 3. レイアウトにモーダルを配置

{% raw %}
```nunjucks
{# base.njk の </body> 前に追加 #}
{% from "block-search-modal/block-search-modal.njk" import searchModal %}
{{ searchModal() }}
```
{% endraw %}

### 4. 検索ボタンの配置

{% raw %}
```nunjucks
{% from "block-search-modal/block-search-modal.njk" import searchTrigger %}
{{ searchTrigger() }}
```
{% endraw %}

ヘッダーやナビゲーション内に配置してください。

---

## 操作方法

| 操作 | 動作 |
|---|---|
| 検索アイコンクリック | モーダルを開く |
| `Ctrl+K` / `Cmd+K` | モーダルを開く / 閉じる |
| `Escape` | モーダルを閉じる |
| 背景クリック | モーダルを閉じる |

---

## インデックス対象の制御

検索結果に含めたくない要素には `data-pagefind-ignore` 属性を追加します。

{% raw %}
```html
<nav data-pagefind-ignore>
  <!-- この中のテキストは検索対象外 -->
</nav>
```
{% endraw %}

エンジンでは以下の要素にデフォルトで `data-pagefind-ignore` が設定されています：

- ヘッダーナビゲーション（`layout-header-nav`）
- フッター（`layout-footer-kinetic`）
- 目次（TOC フィルター出力）

---

## 注意事項

- `--serve` モード（開発サーバー）ではインデックスが自動更新されません。検索内容を最新にするには `npm run build` を実行してください。
- Pagefind は日本語のステミング（語幹抽出）に対応していないため、完全一致での検索となります。
