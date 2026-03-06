---
layout: layouts/base.njk
title: "hero セクション"
navBg: "solid"
sections:
  - type: article
    category: "YAML SECTIONS"
    title: "hero セクション"
    lead: "ページのファーストビューとなるヒーローエリア。キネティックなスタイルと背景エフェクト合成に対応。"
---

[← セクションタイプ一覧](/docs/yaml-sections/)

---

## 概要

`type: hero` はページ最上部のファーストビュー（ヒーロー）セクションです。英語小見出し・大見出し・リード文を縦積みで表示し、背景エフェクトをインライン canvas で合成できます。ダーク系の背景色に `mix-blend-mode: screen` でエフェクトを重ねる設計のため、明るい背景との組み合わせには不向きです。

---

## 見た目のイメージ

```
┌───────────────────────┐
│  [英語小見出し（シアン・等幅フォント）]      │  ← subtitle
│                                              │
│  大見出しテキスト                            │  ← title（大きく表示）
│                                              │
│  リード文テキスト。サービスや                │  ← lead
│  ページの説明が入ります。                    │
│                                              │
│  ℹ️ note テキスト（省略可）                │  ← note
│                                              │
│ [背景エフェクト canvas が裏に流れる]         │  ← effects
└───────────────────────┘
```

暗い背景色の `section.page-hero` として出力されます。フェードインアニメーション付き。

---

## パラメータ

| パラメータ | 必須 | 型 | 説明 |
|---|---|---|---|
| `type` | ✅ | string | `"hero"` 固定 |
| `subtitle` | — | string | 英語小見出し（Roboto Mono・シアン色） |
| `title` | ✅ | string | 大見出し |
| `lead` | — | string | リード文（HTML タグ使用可） |
| `note` | — | string | info アイコン付きメモ文（省略可） |
| `extraClass` | — | string | `<section>` への追加 CSS クラス（省略可） |
| `effects` | — | array | 背景エフェクト配列（後述） |

---

## 使用例

### 基本（エフェクトなし）

{% raw %}
```yaml
sections:
  - type: hero
    subtitle: "ABOUT US"
    title: "私たちについて"
    lead: "AK²Engine を使って構築された、自己紹介サイトです。"
```
{% endraw %}

### note 付き

{% raw %}
```yaml
sections:
  - type: hero
    subtitle: "04 / Buttons"
    title: "Button Plugins"
    lead: "3種の GSAP ボタンの動作確認ページです。"
    note: "このページは useGsap: true が必要です。"
    extraClass: "section--parts-hero"
```
{% endraw %}

### 背景エフェクト付き（文字列形式）

{% raw %}
```yaml
sections:
  - type: hero
    title: "Winter Campaign"
    lead: "冬季キャンペーン開催中"
    effects:
      - SnowEffect
      - FireflyEffect
```
{% endraw %}

### 背景エフェクト付き（オプション指定形式）

{% raw %}
```yaml
sections:
  - type: hero
    title: "タイトル"
    lead: "リード文"
    effects:
      - name: SnowEffect
        count: 30
        alpha: 1.2
```
{% endraw %}

---

## lead に HTML を使う

`lead:` の値には HTML タグを直接書けます。改行には `<br>` を使用します。

{% raw %}
```yaml
lead: "行1のテキスト。<br>行2のテキスト。"
```
{% endraw %}

---

**[← セクションタイプ一覧](/docs/yaml-sections/)** | **[↑ 目次](/docs/)**
