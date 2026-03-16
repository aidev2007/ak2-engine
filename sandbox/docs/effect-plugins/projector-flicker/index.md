---
layout: layouts/base.njk
title: "BgProjectorFlickerEffect"
navBg: "solid"
sections:
  - type: article
    doc_group: "EFFECT PLUGINS / 背景エフェクト"
    title: "BgProjectorFlickerEffect"
    lead: "古い映写機のフリッカーを模したエフェクト。レトロ・アナログ・ノスタルジックな演出に。"
---

[← エフェクトプラグイン一覧](/docs/effect-plugins/)

---

## 概要

古いフィルム映写機の光のちらつき（フリッカー）を再現したエフェクトです。不規則な明暗の点滅がレトロな雰囲気を醸し出します。`BgVintageFilmEffect` と組み合わせることで、より本格的な古映画の質感が得られます。

---

## CSS カスタム変数

| 変数名 | デフォルト | 説明 |
|---|---|---|
| `--projector-flicker-alpha` | `1.0` | 明滅の強度係数。小さくすると点滅が控えめになる |

---

## 使用例

### セクションへの適用

{% raw %}
```yaml
sections:
  - type: hero
    title: "タイトル"
    effects:
      - BgProjectorFlickerEffect
```
{% endraw %}

### ページ全体への適用

{% raw %}
```yaml
---
layout: layouts/base.njk
effects:
  - BgProjectorFlickerEffect
---
```
{% endraw %}

### BgVintageFilmEffect との組み合わせ

{% raw %}
```yaml
effects:
  - BgProjectorFlickerEffect
  - BgVintageFilmEffect
```
{% endraw %}

### CSS 変数での調整

{% raw %}
```css
:root {
  --projector-flicker-alpha: 0.6;  /* 控えめな明滅 */
}
```
{% endraw %}

---

**[← エフェクト一覧](/docs/effect-plugins/)** | **[↑ 目次](/docs/)**
