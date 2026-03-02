---
layout: layouts/base.njk
title: "ベースレイアウト"
navBg: "solid"
sections:
  - type: article
    category: "AK²ENGINE DOCS"
    title: "ベースレイアウト"
    lead: "base.njk のテンプレートと、ページのフロントマターオプション一覧です。"
---

[← 目次に戻る](/docs/)

---

## base.njk テンプレート

サイト固有の `src/_includes/layouts/base.njk` を作成してください。以下がテンプレートです。

{% raw %}
```nunjucks
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ title }} | {{ site.name }}</title>
  <meta name="description" content="{{ description | default(site.description) }}">

  <!-- Google Fonts（推奨） -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Noto+Serif+JP:wght@300;400;500;700&family=Roboto+Mono:wght@400;500;700&display=swap" rel="stylesheet">

  <!-- Lucide Icons（core-site.js が初期化） -->
  <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>

  <!-- GSAP（ボタンプラグイン使用時） -->
  {% if useGsap %}
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  {% endif %}

  <!-- Three.js（particles エフェクト使用時のみ） -->
  {% if useThreeJS %}
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  {% endif %}

  <link rel="stylesheet" href="/css/style.css">
</head>
<body>

  {% include "layout-header-nav/layout-header-nav.njk" %}

  {% if sections %}
    {% for section in sections %}
      {% if section.type == "content" %}
        {{ content | safe }}
      {% else %}
        {% include "sections/" + section.type + ".njk" ignore missing %}
      {% endif %}
    {% endfor %}
  {% else %}
    {{ content | safe }}
  {% endif %}

  {% include "layout-footer-kinetic/layout-footer-kinetic.njk" %}

  <!-- バンドルJS（1ファイル） -->
  <script src="/js/site.js"></script>

  <!-- ページ全体エフェクト（front-matter: effects: [key1, key2]） -->
  {% if effects %}
  <script>
    {% for effect in effects %}
    AK2.register(new {{ effectClasses[effect] }}());
    {% endfor %}
  </script>
  {% endif %}

  <!-- Three.js パーティクル -->
  {% if useThreeJS %}
  <script>new ParticleEffect();</script>
  {% endif %}

  <!-- ロゴアニメーション -->
  {% if useLogoAnimation %}
  <script>new LogoAnimation();</script>
  {% endif %}

</body>
</html>
```
{% endraw %}

---

## フロントマター オプション一覧

| キー | 型 | 説明 |
|---|---|---|
| `layout` | string | `"layouts/base.njk"` |
| `title` | string | ページタイトル（必須） |
| `description` | string | meta description（省略時は `site.description`） |
| `navBg` | string | `"solid"` でヘッダーを完全不透明に（暗いヒーローセクションのあるページに必須） |
| `transparentHeader` | boolean | `true` でページトップ透明ヘッダー |
| `navGlobalStyle` | string | グローバルナビのスタイル（→ [レイアウトプラグイン](/docs/layout-plugins/)） |
| `navDrawerStyle` | string | ドロワーのスタイル |
| `navToggleStyle` | string | トグルボタンのスタイル |
| `sections` | array | YAMLセクション配列（→ [YAMLセクション アーキテクチャ](/docs/yaml-sections/)） |
| `effects` | array | ページ全体背景エフェクトキー（例: `[snow, aurora]`） |
| `useGsap` | boolean | GSAP 3.x をCDNから読み込む |
| `useThreeJS` | boolean | Three.js パーティクルを使用 |
| `useLogoAnimation` | boolean | SVGロゴアニメーションを起動 |

---

## sections: の動作

`sections:` が指定されている場合、`base.njk` は配列をループして各セクションテンプレートをインクルードします。`type: content` の位置にMarkdown本文が展開されます。`sections:` が未指定の場合は従来通り `{% raw %}{{ content | safe }}{% endraw %}` で本文を展開します（後方互換）。

詳しくは [YAMLセクション アーキテクチャ](/docs/yaml-sections/) を参照してください。

---

**前のページ:** [← データスキーマ](/docs/data-schema/) | **[↑ 目次](/docs/)** | **次のページ:** [YAMLセクション →](/docs/yaml-sections/)
