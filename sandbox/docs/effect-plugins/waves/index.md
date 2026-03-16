---
layout: layouts/base.njk
title: "BgWaveEffect"
navBg: "solid"
sections:
  - type: article
    doc_group: "EFFECT PLUGINS / 背景エフェクト"
    title: "BgWaveEffect"
    lead: "なめらかな波形が複数レイヤーで揺れるエフェクト。海・音楽・リズム感のある演出に。"
---

[← エフェクトプラグイン一覧](/docs/effect-plugins/)

---

## 概要

3層の半透明な波形（サイン波）がそれぞれ異なる速度・位相で流れるエフェクトです。音楽・音声・イコライザー、または海の波をイメージした演出に適しています。`BgWaveRippleEffect` が水面の波紋なのに対し、`BgWaveEffect` は横方向に流れる波形です。

---

## CSS カスタム変数

| 変数名 | デフォルト | 説明 |
|---|---|---|
| `--wave-alpha` | `1.0` | 全レイヤーのアルファ係数 |

---

## 内部仕様

| 項目 | 値 |
|---|---|
| 波レイヤー数 | `3` |
| 各レイヤー | 異なる速度・振幅・色で描画 |

---

## 使用例

### セクションへの適用

{% raw %}
```yaml
sections:
  - type: hero
    title: "タイトル"
    effects:
      - BgWaveEffect
```
{% endraw %}

### ページ全体への適用

{% raw %}
```yaml
---
layout: layouts/base.njk
effects:
  - BgWaveEffect
---
```
{% endraw %}

### CSS 変数での調整

{% raw %}
```css
:root {
  --wave-alpha: 0.7;  /* 波を透明に */
}
```
{% endraw %}

---

**[← エフェクト一覧](/docs/effect-plugins/)** | **[↑ 目次](/docs/)**
