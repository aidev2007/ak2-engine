---
layout: layouts/base.njk
title: "content セクション"
navBg: "solid"
sections:
  - type: article
    category: "YAML SECTIONS"
    title: "content セクション"
    lead: "Markdown 本文の差し込み位置を指定するプレースホルダー。ハイブリッドページで使用。"
---

[← セクションタイプ一覧](/docs/yaml-sections/)

---

## 概要

`type: content` は `sections:` 配列内で Markdown 本文（`{{ content }}`）を差し込む位置を指定するだけのプレースホルダーです。パラメータはなく、レンダリングは本文の HTML をそのまま出力します。

`sections:` を使わないページでは `base.njk` が自動で本文を展開するため、`type: content` は不要です。`sections:` を使いながら本文も出力したい場合にのみ必要です。

---

## 見た目のイメージ

```yaml
sections:
  - type: hero      ← ヒーロー
    ...
  - type: content   ← ここに Markdown 本文が差し込まれる
  - type: feature-grid  ← コンテンツグリッド
    ...
```

```
┌───────────────────────────────────┐
│  [hero セクション]                                                   │
└───────────────────────────────────┘
┌───────────────────────────────────┐
│  [Markdown 本文から生成された HTML]                                  │  ← content
└───────────────────────────────────┘
┌───────────────────────────────────┐
│  [feature-grid セクション]                                           │
└───────────────────────────────────┘
```

---

## パラメータ

なし。`type: content` のみ指定します。

---

## 使用例

### hero + 本文 のハイブリッドページ

{% raw %}
```yaml
---
layout: layouts/base.njk
title: "会社概要"
sections:
  - type: hero
    subtitle: "ABOUT US"
    title: "会社概要"
    lead: "私たちについてご紹介します。"
  - type: content   # ← ここに下記の Markdown 本文が入る
---

## 沿革

2020年に創業しました。

## チーム

メンバーは3名です。
```
{% endraw %}

### sections のみ（本文なし）で type: content を省く

本文が不要なランディングページでは `type: content` ごと省略できます。

{% raw %}
```yaml
sections:
  - type: hero
    title: "トップページ"
  - type: feature-grid
    ...
  - type: stat-grid
    ...
```
{% endraw %}

---

## 注意

- 同一 `sections:` 内に `type: content` を複数記述すると、本文が重複して出力されます
- `type: article` は本文を内部で出力するため、`type: article` と `type: content` の併用は不要です

---

**[← セクションタイプ一覧](/docs/yaml-sections/)** | **[↑ 目次](/docs/)**
