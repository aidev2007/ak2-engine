---
layout: layouts/base.njk
title: "cta セクション"
navBg: "solid"
sections:
  - type: article
    doc_group: "YAML SECTIONS"
    title: "cta セクション"
    lead: "タイトル・説明文・リンクボタンを中央揃えで表示するCTAセクション。グラデーション背景対応。"
---

[← セクションタイプ一覧](/docs/yaml-sections/)

---

## 概要

`type: cta` は `ctaSection` マクロを呼び出し、グラデーション背景にタイトル・テキスト・ボタンを中央揃えで表示します。ページ末尾への誘導や次のアクション案内に適しています。

`ctaSection` マクロ内で `<section class="section section--cta">` を直接出力するため、外側のラッパーは不要です。

---

## 見た目のイメージ

```
┌───────────────────────┐（グラデーション背景）
│           大見出しタイトル                   │
│       説明テキスト（HTML 使用可）            │
│           [ボタン → リンク先]               │
└───────────────────────┘
```

---

## パラメータ

| パラメータ | 必須 | 型 | 説明 |
|---|---|---|---|
| `type` | ✅ | string | `"cta"` 固定 |
| `title` | ✅ | string | CTA の大見出し |
| `text` | ✅ | string | 説明テキスト（HTML タグ使用可） |
| `linkUrl` | ✅ | string | ボタンのリンク先 URL |
| `linkText` | ✅ | string | ボタンのラベルテキスト |
| `gradient` | — | string | 背景グラデーション CSS 値（省略時: 水色系グラデーション） |

---

## 使用例

### 基本

```yaml
sections:
  - type: cta
    title: "プラグインを使い始める"
    text: "PLUGINS_API_REFERENCE.md を読めば、すぐにサイト構築を開始できます。"
    linkUrl: "/"
    linkText: "Sandbox Indexへ戻る"
```

### グラデーション指定

```yaml
sections:
  - type: cta
    title: "お問い合わせ"
    text: "お気軽にご連絡ください。"
    linkUrl: "/contact/"
    linkText: "お問い合わせフォームへ →"
    gradient: "linear-gradient(135deg, #fdf4ff, #fce7f3)"
```

---

**[← セクションタイプ一覧](/docs/yaml-sections/)** | **[↑ 目次](/docs/)**
