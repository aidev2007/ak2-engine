---
layout: layouts/base.njk
title: "article セクション"
navBg: "solid"
sections:
  - type: article
    category: "YAML SECTIONS"
    title: "article セクション"
    lead: "ドキュメント・コンセプトページ向けレイアウト。パンくず・カテゴリ・タイトル・本文・TOCをセットで出力。"
---

[← セクションタイプ一覧](/docs/yaml-sections/)

---

## 概要

`type: article` はドキュメントや解説記事に特化したセクションです。ページ上部にヒーローエリア（パンくずリスト・カテゴリラベル・タイトル・リード文）、下部に Markdown 本文エリア（TOC 自動生成付き）をセットで出力します。このページ自体が `type: article` を使用した例です。

1ページに1つだけ使用します。本文全体をラップするため、他のセクションタイプと組み合わせることは想定していません。

---

## 見た目のイメージ

```
┌─────────────────────┐
│  Sandbox › CATEGORY                      │  ← パンくずリスト
│  CATEGORY                                │  ← カテゴリラベル（モノスペース）
│  記事タイトル                            │  ← title（大見出し）
│  リード文テキスト                        │  ← lead
└─────────────────────┘
┌──────────┬──────────┐
│  目次（TOC）       │  ## 見出し1        │
│  ・見出し1         │  本文テキスト...   │  ← Markdown 本文
│  ・見出し2         │  ## 見出し2        │
│                    │  本文テキスト...   │
└──────────┴──────────┘

```

H2 以上の見出しから TOC が自動生成されます（`toc` フィルター使用）。

---

## パラメータ

| パラメータ | 必須 | 型 | 説明 |
|---|---|---|---|
| `type` | ✅ | string | `"article"` 固定 |
| `category` | — | string | カテゴリーラベル（モノスペース・大文字表示） |
| `title` | — | string | 記事タイトル（省略時はページ front-matter の `title` を使用） |
| `lead` | — | string | タイトル下のリード文 |

---

## 使用例

### ドキュメントページ

{% raw %}
```yaml
---
layout: layouts/base.njk
title: "SnowEffect"
navBg: "solid"
sections:
  - type: article
    category: "EFFECT PLUGINS"
    title: "SnowEffect"
    lead: "白い雪が降り積もるエフェクト。冬・クリスマス系サイトに。"
---

## 概要

ここから Markdown で本文を書きます。

## パラメータ

| パラメータ | 説明 |
|---|---|
| `count` | 粒子数 |
```
{% endraw %}

### コンセプトページ

{% raw %}
```yaml
---
layout: layouts/base.njk
title: "コンセプト"
sections:
  - type: article
    category: "CONCEPT"
    title: "AK²Engine について"
    lead: "プラグイン駆動の静的サイト生成エンジン。"
---

## このエンジンについて

本文を Markdown で記述します。
```
{% endraw %}

---

## 注意

- `sections: - type: article` の前後に他のセクションを配置することは想定外です
- 本文のマークダウンは `{{ content | safe }}` で全文出力されます
- TOC は H2 以上が1つ以上あるときのみ表示されます

---

**[← セクションタイプ一覧](/docs/yaml-sections/)** | **[↑ 目次](/docs/)**
