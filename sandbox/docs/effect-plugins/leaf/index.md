---
layout: layouts/base.njk
title: "LeafEffect"
navBg: "solid"
sections:
  - type: article
    category: "EFFECT PLUGINS / 背景エフェクト"
    title: "LeafEffect"
    lead: "緑の葉が揺れながらゆっくり漂うエフェクト。ナチュラル・エコ・農業系サイトに。"
---

[← エフェクトプラグイン一覧](/docs/effect-plugins/)

---

## 概要

緑色の葉っぱが左右に揺れながら画面内を漂うエフェクトです。アルファを下げることで穏やかな背景テクスチャとしても機能します。自然・環境・食品・農業系のページに適しています。

---

## CSS カスタム変数

| 変数名 | デフォルト | 説明 |
|---|---|---|
| `--leaf-count` | `35` | 葉の数 |
| `--leaf-alpha` | `1.0` | アルファ係数 |

---

## 使用例

### セクションへの適用

{% raw %}
```yaml
sections:
  - type: hero
    title: "タイトル"
    effects:
      - LeafEffect
```
{% endraw %}

### ページ全体への適用

{% raw %}
```yaml
---
layout: layouts/base.njk
effects:
  - leaf
---
```
{% endraw %}

### CSS 変数での調整

{% raw %}
```css
:root {
  --leaf-count: 20;
  --leaf-alpha: 0.7;
}
```
{% endraw %}

---

**[← エフェクト一覧](/docs/effect-plugins/)** | **[↑ 目次](/docs/)**
