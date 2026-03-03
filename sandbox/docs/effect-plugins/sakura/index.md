---
layout: layouts/base.njk
title: "SakuraEffect"
navBg: "solid"
sections:
  - type: article
    category: "EFFECT PLUGINS / 背景エフェクト"
    title: "SakuraEffect"
    lead: "桜の花びらがひらひらと舞うフルバリエーションエフェクト。春の演出に最適です。"
---

[← エフェクトプラグイン一覧](/docs/effect-plugins/)

---

## 概要

`CherryBlossomEffect` と類似した桜の花びらエフェクトですが、`SakuraEffect` はより多くのバリエーション（大きさ・形状・動きのランダム性）を持つフルバリエーション版です。より自然でリッチな桜の舞いを表現します。

---

## CSS カスタム変数

| 変数名 | デフォルト | 説明 |
|---|---|---|
| `--sakura-count` | `45` | 花びらの数 |
| `--sakura-alpha` | `1.0` | アルファ係数 |

---

## 使用例

### セクションへの適用

{% raw %}
```yaml
sections:
  - type: hero
    title: "Spring"
    effects:
      - SakuraEffectEffect
```
{% endraw %}

### ページ全体への適用

{% raw %}
```yaml
---
layout: layouts/base.njk
effects:
  - SakuraEffect
---
```
{% endraw %}

### CSS 変数での調整

{% raw %}
```css
:root {
  --sakura-count: 60;
  --sakura-alpha: 0.8;
}
```
{% endraw %}

---

**[← エフェクト一覧](/docs/effect-plugins/)** | **[↑ 目次](/docs/)**
