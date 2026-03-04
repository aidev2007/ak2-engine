---
layout: layouts/base.njk
title: "card-service セクション"
navBg: "solid"
sections:
  - type: article
    category: "YAML SECTIONS"
    title: "card-service セクション"
    lead: "タイトル・タグ・価格・説明・補足情報を含むサービス紹介カードのグリッド。料金プラン表示に。"
---

[← セクションタイプ一覧](/docs/yaml-sections/)

---

## 概要

`type: card-service` は `serviceCard` マクロを使い、サービス名・タグ・価格・説明・補足情報を含むサービスカードをグリッド状に並べます。料金プランやサービスメニューの一覧表示に適しています。

---

## 見た目のイメージ

```
┌─────────────────────────────────────────────┐
│  [section-header]                            │
│  ┌────────────┐  ┌────────────┐            │
│  │ サービス名  │  │ サービス名  │            │
│  │ [tag]      │  │ [tag]      │            │
│  │ ¥price     │  │ ¥price     │            │
│  │ 説明文...  │  │ 説明文...  │            │
│  │ [note]     │  │ [note]     │            │
│  └────────────┘  └────────────┘            │
└─────────────────────────────────────────────┘
```

---

## パラメータ

| パラメータ | 必須 | 型 | 説明 |
|---|---|---|---|
| `type` | ✅ | string | `"card-service"` 固定 |
| `sectionClass` | — | string | 外側 `<section>` への追加 CSS クラス（省略時: `"section--white"`） |
| `heading` | — | string | sectionHeader の上段テキスト（省略時はヘッダーなし） |
| `subheading` | — | string | sectionHeader の下段テキスト |
| `dark` | — | boolean | sectionHeader をダーク表示にするか（省略時: `false`） |
| `items` | ✅ | array | サービスデータ配列 |

### items 配列の各要素

| キー | 必須 | 型 | 説明 |
|---|---|---|---|
| `title` | ✅ | string | サービス名 |
| `tag` | ✅ | string | タグラベル（例: `"ご予算重視プラン"`） |
| `price` | — | string | 価格表示（例: `"¥20,000〜"`、省略可） |
| `desc` | ✅ | string | サービス説明文 |
| `note` | — | string | 補足情報（省略可。tech-note-card スタイルで表示） |

---

## 使用例

```yaml
sections:
  - type: card-service
    sectionClass: "section--white"
    heading: "SERVICES"
    subheading: "サービスメニュー"
    items:
      - title: "Web制作：エコノミー"
        tag: "ご予算重視プラン"
        price: "¥20,000〜"
        desc: "5ページ以内のシンプルなサイト制作。"
      - title: "Web制作：スタンダード"
        tag: "バランス重視プラン"
        price: "¥50,000〜"
        desc: "10ページ以内。アニメーション・お問い合わせフォーム付き。"
        note: "CMS 連携も対応可能です。"
```

---

**[← セクションタイプ一覧](/docs/yaml-sections/)** | **[↑ 目次](/docs/)**
