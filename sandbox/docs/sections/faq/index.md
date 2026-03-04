---
layout: layouts/base.njk
title: "faq セクション"
navBg: "solid"
sections:
  - type: article
    category: "YAML SECTIONS"
    title: "faq セクション"
    lead: "<details>/<summary> を使ったアコーディオン形式の Q&A リスト。よくある質問の掲載に。"
---

[← セクションタイプ一覧](/docs/yaml-sections/)

---

## 概要

`type: faq` は `faqItem` マクロを使い、`<details>` / `<summary>` によるアコーディオン形式の Q&A リストを出力します。クリックで回答が展開され、再クリックで閉じます。

---

## 見た目のイメージ

```
┌─────────────────────────────────────────────┐
│  [section-header]                            │
│  ┌──────────────────────────────────────┐   │
│  │ ▼ Q. 質問テキスト                    │   │
│  └──────────────────────────────────────┘   │
│  ┌──────────────────────────────────────┐   │
│  │ ▼ Q. 質問テキスト                    │   │
│  └──────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
クリックで回答（item.a）が展開される。a の値に HTML タグ使用可。
```

---

## パラメータ

| パラメータ | 必須 | 型 | 説明 |
|---|---|---|---|
| `type` | ✅ | string | `"faq"` 固定 |
| `sectionClass` | — | string | 外側 `<section>` への追加 CSS クラス（省略時: `"section--faq"`） |
| `heading` | — | string | sectionHeader の上段テキスト（省略時はヘッダーなし） |
| `subheading` | — | string | sectionHeader の下段テキスト |
| `dark` | — | boolean | sectionHeader をダーク表示にするか（省略時: `false`） |
| `items` | ✅ | array | Q&A データ配列 |

### items 配列の各要素

| キー | 必須 | 型 | 説明 |
|---|---|---|---|
| `q` | ✅ | string | 質問テキスト（サマリーとして常に表示） |
| `a` | ✅ | string | 回答テキスト（HTML タグ使用可） |

---

## 使用例

```yaml
sections:
  - type: faq
    sectionClass: "section--faq"
    heading: "FAQ"
    subheading: "よくある質問"
    items:
      - q: "Q. 制作期間はどれくらいですか？"
        a: "A. 規模やプランによりますが、エコノミープランで約2〜3週間が目安です。"
      - q: "Q. 修正は何回まで無料ですか？"
        a: "A. ご契約内容によって異なります。詳しくはお問い合わせください。"
      - q: "Q. HTMLタグも使えますか？"
        a: "A. はい。<code>a</code> の値には HTML タグを直接記述できます。"
```

---

**[← セクションタイプ一覧](/docs/yaml-sections/)** | **[↑ 目次](/docs/)**
