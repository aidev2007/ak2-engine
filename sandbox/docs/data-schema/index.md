---
layout: layouts/base.njk
title: "データスキーマ"
navBg: "solid"
sections:
  - type: article
    category: "AK²ENGINE DOCS"
    title: "データスキーマ"
    lead: "_data/ ディレクトリに配置する設定ファイルの仕様です。"
---

[← 目次に戻る](/docs/)

---

## site.json

サイト全体のメタデータを定義します。

{% raw %}
```json
{
  "name": "サイト名",
  "sub": "サブテキスト（ヘッダーブランド名の下）",
  "fullName": "フルサイト名（SEO等に使用）",
  "description": "サイト説明文（meta description）",
  "url": "https://example.com",
  "logoHref": "/",
  "logoSvg": "<svg ...>...</svg>",
  "footerLogoSvg": "<svg ...>...</svg>",
  "footerDesc": "フッター説明文（HTML可）",
  "copyright": "Example Inc. All Rights Reserved.",
  "footerAboutLinks": [
    { "label": "About", "url": "/about/" },
    { "label": "Contact", "url": "/#contact" }
  ]
}
```
{% endraw %}

| フィールド | 必須 | 説明 |
|---|---|---|
| `name` | ✅ | ヘッダーのブランド名 |
| `sub` | ✅ | ブランド名の下のサブテキスト |
| `logoSvg` | ✅ | ヘッダー/フッターのロゴSVG（HTML文字列） |
| `logoHref` | — | ロゴのリンク先（デフォルト: `"/"`) |
| `footerLogoSvg` | — | フッター専用ロゴ（未指定時は `logoSvg` を使用） |
| `footerDesc` | — | フッターの説明文（HTML可） |
| `copyright` | — | コピーライトテキスト（年号は自動） |
| `footerAboutLinks` | — | フッターABOUTカラムのリンク配列 |

---

## nav.json

グローバルナビゲーションのリンクを定義します。

{% raw %}
```json
[
  { "label": "ホーム",      "url": "/",         "root": "/" },
  { "label": "サービス",    "url": "/service/",  "root": "/service" },
  { "label": "お問い合わせ", "url": "/#contact",  "root": "/#contact" }
]
```
{% endraw %}

| フィールド | 説明 |
|---|---|
| `label` | 表示テキスト |
| `url` | リンク先URL |
| `root` | アクティブ判定パスプレフィックス（`"/"` はトップページのみ） |

---

## effectClasses.json

エフェクトキー（フロントマターの `effects: [key]`）から JSクラス名へのマッピングです。`@aidev2007/engine/sandbox/_data/effectClasses.json` をそのままコピーして使用してください。

{% raw %}
```json
{
  "aurora":            "AuroraEffect",
  "snow":              "SnowEffect",
  "sakura":            "SakuraEffect",
  "firefly":           "FireflyEffect",
  "grid-construction": "GridConstruction",
  "lines":             "GridEffect",
  "sparks":            "SparksEffect",
  "rain":              "RainEffect",
  "ripple":            "RippleEffect",
  "shimmer":           "ShimmerEffect",
  "stars":             "StarFieldEffect",
  "star-speed":        "StarSpeedEffect",
  "wave-ripple":       "WaveRippleEffect",
  "waves":             "WaveEffect"
}
```
{% endraw %}

> **注意:** ページ全体エフェクト（`effects: [key]`）ではこのマッピングを使います。セクション個別エフェクト（`sections[].effects[]`）では JSクラス名を直接記述します（例: `SnowEffect`）。詳しくは [エフェクトプラグイン](/docs/effect-plugins/) を参照してください。

---

**前のページ:** [← クイックスタート](/docs/getting-started/) | **[↑ 目次](/docs/)** | **次のページ:** [ベースレイアウト →](/docs/base-layout/)
