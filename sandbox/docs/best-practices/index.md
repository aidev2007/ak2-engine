---
layout: layouts/base.njk
title: "ベストプラクティス"
navBg: "solid"
sections:
  - type: article
    doc_group: "AK²ENGINE DOCS"
    title: "ベストプラクティス"
    lead: "AK²Engineを使ったサイト制作で守るべきルールとガイドラインです。"
---

[← 目次に戻る](/docs/)

---

## 1. インラインスタイルを使用しない

テンプレート内の HTML には `style="..."` 属性を使用しないでください。

**NG:**
{% raw %}
```html
<a href="/effects/" class="parts-category-card"
   style="border-color:rgba(0,198,255,0.2);background:linear-gradient(135deg,#0f172a,#1e293b)">
```
{% endraw %}

**OK — BEMモディファイアクラスを定義:**
{% raw %}
```css
/* src/site.css に定義 */
.parts-category-card--effects {
  border-color: rgba(0, 198, 255, 0.2);
  background: linear-gradient(135deg, #0f172a, #1e293b);
  color: white;
}
```
{% endraw %}
{% raw %}
```html
<a href="/effects/" class="parts-category-card parts-category-card--effects">
```
{% endraw %}

---

## 2. Nunjucks マクロに `{% raw %}{%- endmacro %}{% endraw %}` を使う

プラグインやサイト独自マクロを作成する際は `{% raw %}{% endmacro %}{% endraw %}` ではなく **`{% raw %}{%- endmacro %}{% endraw %}`** を使います。

**理由:** `{% raw %}{%- endmacro %}{% endraw %}` はマクロ末尾の余分な改行を除去します。省略すると `.md` から呼ぶとき空行が発生し、Markdown パーサーが後続HTML要素を `<p>` タグで誤包囲します。

{% raw %}
```nunjucks
{# NG: 末尾に改行が残る #}
{% macro featureItem(icon, title, text) %}
<div class="feature-item">...</div>
{% endmacro %}

{# OK: 末尾の改行を除去 #}
{% macro featureItem(icon, title, text) %}
<div class="feature-item">...</div>
{%- endmacro %}
```
{% endraw %}

---

## 3. .md ファイル内の HTML ルール

`markdownTemplateEngine: "njk"` 環境では **Nunjucks処理 → Markdown処理** の順で実行されます。Markdown パーサーは **空行で HTML ブロックを強制終了** するため、以下のルールを守ってください。

### ルール1：`<section>` 内では空行を入れない

**NG:**
{% raw %}
```markdown
<section class="section section--white">
  <div class="container">
    {{ sectionHeader("TITLE", "タイトル") }}

    <div class="card-grid">   ← 空行があると <p><div> になる
```
{% endraw %}

**OK:**
{% raw %}
```markdown
<section class="section section--white">
  <div class="container">
    {{ sectionHeader("TITLE", "タイトル") }}
    <div class="card-grid">   ← 空行なし → 正常
```
{% endraw %}

### ルール2：`</section>` と次の `<section>` の間の空行は問題なし

{% raw %}
```markdown
</section>

<section class="section section--dark">   ← ここは空行があってもOK
```
{% endraw %}

> **ヒント:** HTML が多くネストするページでは `.njk` 拡張子を使うと、この問題を根本的に回避できます。

---

## 4. .md と .njk の使い分け

| コンテンツの種類 | 推奨形式 |
|---|---|
| YAMLセクション使用（HTMLほぼなし） | `.md` |
| テキスト中心（マクロを数個使う程度） | `.md` |
| HTML構造が複雑 / マクロが多数ネスト | `.njk` |
| 純粋な HTML ページ | `.html` |

---

## 5. セクションのスタイルは BEM モディファイアで管理

{% raw %}
```css
/* NG — テンプレートにインラインスタイル */
/* <section class="section" style="background:#f7f6f2"> */

/* OK — site.css にクラスを定義 */
.section--warm { background: #f7f6f2; }
```
{% endraw %}

`base.css` の既存クラスで対応できない場合のみ、サイト固有 CSS に追加してください。

---

## 6. セキュリティ注意事項

- `| safe` フィルターは信頼できるデータにのみ使用する（XSS防止）
- SQLインジェクションが発生し得る動的クエリは作成しない
- ユーザー入力はサニタイズしてから出力する
- 機密情報（APIキー等）は `.env` ファイルで管理し、テンプレートに直書きしない

---

**前のページ:** [← CSSカスタマイズ](/docs/css-customization/) | **[↑ 目次](/docs/)**
