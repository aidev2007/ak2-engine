---
layout: layouts/base.njk
title: "contact セクション"
navBg: "solid"
sections:
  - type: article
    category: "YAML SECTIONS"
    title: "contact セクション"
    lead: "お名前・メール・本文・送信ボタンを含む標準お問い合わせフォームセクション。"
---

[← セクションタイプ一覧](/docs/yaml-sections/)

---

## 概要

`type: contact` は `contactForm` マクロを使い、お問い合わせフォームを出力します。フォームには名前・メールアドレス・お問い合わせ内容・送信ボタンが含まれます。オプションで `intro` テキストをフォーム上部に表示できます。

---

## 見た目のイメージ

```
┌─────────────────────────────────────────────┐
│  [section-header]                            │
│  [intro テキスト（省略可）]                   │
│  ┌──────────────────────────────────────┐   │
│  │ お名前 [____________]                │   │
│  │ メールアドレス [_________________]   │   │
│  │ お問い合わせ内容                     │   │
│  │ [________________________________]   │   │
│  │            [送信する →]              │   │
│  └──────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

---

## パラメータ

| パラメータ | 必須 | 型 | 説明 |
|---|---|---|---|
| `type` | ✅ | string | `"contact"` 固定 |
| `sectionClass` | — | string | 外側 `<section>` への追加 CSS クラス（省略時: `"section--contact"`） |
| `heading` | — | string | sectionHeader の上段テキスト（省略時はヘッダーなし） |
| `subheading` | — | string | sectionHeader の下段テキスト |
| `dark` | — | boolean | sectionHeader をダーク表示にするか（省略時: `false`） |
| `action` | — | string | フォームの `action` 属性（省略時: `""`） |
| `intro` | — | string | フォーム上部の紹介テキスト（HTML 使用可、省略可） |

---

## 使用例

### 基本

```yaml
sections:
  - type: contact
    sectionClass: "section--contact"
    heading: "CONTACT"
    subheading: "お問い合わせ"
    action: "https://formspree.io/f/xxxxxxxx"
```

### intro テキスト付き

```yaml
sections:
  - type: contact
    heading: "CONTACT"
    subheading: "お問い合わせ"
    action: "#"
    intro: "ご質問・ご依頼はこちらのフォームからお気軽にどうぞ。<br>通常2〜3営業日以内にご返信します。"
```

---

**[← セクションタイプ一覧](/docs/yaml-sections/)** | **[↑ 目次](/docs/)**
