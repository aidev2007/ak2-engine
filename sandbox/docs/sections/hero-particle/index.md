---
layout: layouts/base.njk
title: "hero-particle セクション"
navBg: "solid"
sections:
  - type: article
    category: "YAML SECTIONS"
    title: "hero-particle セクション"
    lead: "テキストをパーティクル化してマウスインタラクション付きで表示するヒーローセクション。"
---

[← セクションタイプ一覧](/docs/yaml-sections/)

---

## 概要

`type: hero-particle` は `heroParticle` マクロを使い、テキストをパーティクル（粒子）化して表示します。マウスを近づけると粒子が反発し、離れると元の形に戻るインタラクティブなヒーローセクションです。ダーク背景での印象的なファーストビューに適しています。

同一ページに複数配置する場合は `section.id` を異なる値にする必要があります。

---

## 見た目のイメージ

```
┌───────────────────────┐（ダーク背景）
│  subtitle テキスト（小さめ）                 │
│                                              │
│   T E X T（大きなパーティクル文字）          │
│   ※マウスを近づけると粒子が反発             │
│   ※離れると元の形に戻る                     │
└───────────────────────┘
```

---

## パラメータ

| パラメータ | 必須 | 型 | デフォルト | 説明 |
|---|---|---|---|---|
| `type` | ✅ | string | — | `"hero-particle"` 固定 |
| `text` | ✅ | string | — | パーティクル化するテキスト |
| `subtitle` | — | string | `""` | 上部の小見出しテキスト |
| `color` | — | string | `""` | パーティクル色（省略時: `--color-primary`） |
| `fontSize` | — | string | `"15vw"` | テキストサイズ（vw / px / em 可） |
| `fontWeight` | — | string | `"700"` | フォントウェイト |
| `fontFamily` | — | string | `""` | フォントファミリー（省略で CSS 継承） |
| `height` | — | string | `"100vh"` | セクション高さ |
| `bg` | — | string | `"#0b0b0f"` | 背景色 |
| `id` | — | string | `"main"` | 同一ページ内に複数配置する場合の一意 ID |

---

## 使用例

### 基本

```yaml
sections:
  - type: hero-particle
    text: "HELLO"
    subtitle: "Welcome to my site"
```

### カスタムスタイル

```yaml
sections:
  - type: hero-particle
    text: "DESIGN"
    subtitle: "KINETIC PARTICLE DEMO"
    color: "var(--color-primary)"
    fontSize: "18vw"
    fontWeight: "900"
    height: "60vh"
    bg: "#07070a"
    id: "design"
```

### 同一ページに複数配置

```yaml
sections:
  - type: hero-particle
    text: "FIRST"
    id: "first"
  - type: content
  - type: hero-particle
    text: "SECOND"
    id: "second"
```

---

## 注意

- 同一ページに複数配置する場合は `id` を異なる値にしてください（canvas と `h2` の ID が重複します）
- `height: "100vh"` はページ全高になります。デモ用途では `"60vh"` 等に調整してください

---

**[← セクションタイプ一覧](/docs/yaml-sections/)** | **[↑ 目次](/docs/)**
