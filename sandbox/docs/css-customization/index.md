---
layout: layouts/base.njk
title: "CSSカスタマイズ"
navBg: "solid"
sections:
  - type: article
    doc_group: "AK²ENGINE DOCS"
    title: "CSSカスタマイズ"
    lead: "CSS変数・セクションクラス・サイト固有スタイルの追加方法です。"
---

[← 目次に戻る](/docs/)

---

## CSS カスタムプロパティ（:root で上書き可能）

{% raw %}
```css
:root {
  /* カラー */
  --color-primary:    #025DCC;  /* メインカラー */
  --color-secondary:  #00C6FF;  /* アクセントカラー */
  --color-dark:       #0f172a;  /* ダーク背景 */
  --color-text:       #334155;  /* 本文テキスト */
  --color-text-light: #64748b;  /* 薄い本文テキスト */
  --color-white:      #ffffff;

  /* フォント */
  --font-sans:    "Noto Serif JP", serif;
  --font-english: "Lato", sans-serif;
  --font-mono:    "Roboto Mono", monospace;

  /* グラスモーフィズム */
  --glass-bg:     rgba(255, 255, 255, 0.65);
  --glass-blur:   20px;

  /* レイアウト */
  --container-width: 1240px;
  --header-height:   80px;
}
```
{% endraw %}

---

## 既存セクションクラス一覧

`base.css` に定義済みのセクションクラスです。独自スタイルが不要な場合はこれらを使ってください。

| クラス | 説明 |
|---|---|
| `.section--white` | 白背景 |
| `.section--dark` | ダーク背景（`--color-dark`） |
| `.section--faq` | FAQ セクション用スタイル |
| `.section--contact` | コンタクトフォーム用スタイル |
| `.section--service` | サービス紹介セクション（背景画像対応） |
| `.section--greeting` | グリーティングセクション（ウォーターマーク対応） |
| `.section--parts-hero` | Sandbox パーツヒーロー用（ダーク・薄パディング） |

---

## サイト固有スタイルの追加方法

エンジンの `style.css` には直接追記せず、**`src/site.css`** に定義してください。バンドル時に末尾に追記されます。

{% raw %}
```css
/* src/site.css */

/* サービスセクションの背景画像 */
.section--service {
  background-image: url('/images/office.jpg');
}

/* BEMモディファイアで独自バリアントを追加 */
.section--warm {
  background: #f7f6f2;
}

/* カード独自スタイル（インラインスタイル不使用） */
.parts-category-card--effects {
  border-color: rgba(0, 198, 255, 0.2);
  background: linear-gradient(135deg, #0f172a, #1e293b);
  color: white;
}
```
{% endraw %}

---

## .section--service の背景画像

{% raw %}
```css
.section--service {
  background-image: url('/images/office.jpg');
}
```
{% endraw %}

## .section--greeting のウォーターマーク

{% raw %}
```css
.section--greeting::before {
  content: 'DIRECTOR';
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  font-size: 15vw;
  font-weight: 900;
  color: rgba(0,0,0,0.03);
  font-family: var(--font-english);
  pointer-events: none;
  white-space: nowrap;
}
```
{% endraw %}

---

**前のページ:** [← Eleventy設定](/docs/eleventy-config/) | **[↑ 目次](/docs/)** | **次のページ:** [ベストプラクティス →](/docs/best-practices/)
