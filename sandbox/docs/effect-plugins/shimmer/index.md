---
layout: layouts/base.njk
title: "ShimmerEffect"
navBg: "solid"
sections:
  - type: article
    doc_group: "EFFECT PLUGINS / 背景エフェクト"
    title: "ShimmerEffect"
    lead: "キラキラした光の粒が点滅・移動するエフェクト。高級感・ジュエリー・ウェディング系に。"
---

[← エフェクトプラグイン一覧](/docs/effect-plugins/)

---

## 概要

小さな光の粒子がランダムな位置で点灯・消灯を繰り返しながら漂うエフェクトです。星のきらめきや宝石の輝きを連想させる上品な演出です。`--shimmer-lightness` で明度を調整し、背景色に合わせたバランスを作れます。

---

## CSS カスタム変数

| 変数名 | デフォルト | 説明 |
|---|---|---|
| `--shimmer-count` | `37` | 光点の数 |
| `--shimmer-alpha` | `1.0` | アルファ係数 |
| `--shimmer-lightness` | `90` | 星の明度（0〜100）。高いほど白に近い |

---

## 使用例

### セクションへの適用

{% raw %}
```yaml
sections:
  - type: hero
    title: "タイトル"
    effects:
      - ShimmerEffectEffect
```
{% endraw %}

### ページ全体への適用

{% raw %}
```yaml
---
layout: layouts/base.njk
effects:
  - ShimmerEffect
---
```
{% endraw %}

### CSS 変数での調整

{% raw %}
```css
:root {
  --shimmer-count: 50;
  --shimmer-alpha: 0.85;
  --shimmer-lightness: 85;  /* やや落ち着いた輝き */
}
```
{% endraw %}

---

**[← エフェクト一覧](/docs/effect-plugins/)** | **[↑ 目次](/docs/)**
