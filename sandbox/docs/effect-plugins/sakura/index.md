---
layout: layouts/base.njk
title: "BgSakuraEffect"
navBg: "solid"
sections:
  - type: article
    doc_group: "EFFECT PLUGINS / 背景エフェクト"
    title: "BgSakuraEffect"
    lead: "桜の花びらがひらひらと舞うフルバリエーションエフェクト。春の演出に最適です。"
---

[← エフェクトプラグイン一覧](/docs/effect-plugins/)

---

## 概要

`BgCherryBlossomEffect` と類似した桜の花びらエフェクトですが、`BgSakuraEffect` はより多くのバリエーション（大きさ・形状・動きのランダム性）を持つフルバリエーション版です。より自然でリッチな桜の舞いを表現します。

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
      - BgSakuraEffectEffect
```
{% endraw %}

### ページ全体への適用

{% raw %}
```yaml
---
layout: layouts/base.njk
effects:
  - BgSakuraEffect
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
