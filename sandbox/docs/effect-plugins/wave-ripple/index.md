---
layout: layouts/base.njk
title: "WaveRippleEffect"
navBg: "solid"
sections:
  - type: article
    category: "EFFECT PLUGINS / 背景エフェクト"
    title: "WaveRippleEffect"
    lead: "波形と波紋を組み合わせた水面表現エフェクト。海・プール・アクアティック系サイトに。"
---

[← エフェクトプラグイン一覧](/docs/effect-plugins/)

---

## 概要

波紋が広がりながら波打つ水面を表現するエフェクトです。`RippleEffect`（クリック連動の波紋）とは異なり、こちらは自律的に波紋が発生し続けます。海・プール・温浴施設・ウォータースポーツ系のページに穏やかなアニメーション背景として機能します。

---

## CSS カスタム変数

| 変数名 | デフォルト | 説明 |
|---|---|---|
| `--wave-ripple-count` | `6` | 最大波紋数 |
| `--wave-ripple-alpha` | `1.0` | アルファ係数 |
| `--wave-ripple-hue` | `200` | 波紋の色相（0〜360）。200 で青系 |

---

## 使用例

### セクションへの適用

{% raw %}
```yaml
sections:
  - type: hero
    title: "タイトル"
    effects:
      - WaveRippleEffect
```
{% endraw %}

### ページ全体への適用

{% raw %}
```yaml
---
layout: layouts/base.njk
effects:
  - wave-ripple
---
```
{% endraw %}

### CSS 変数での調整

{% raw %}
```css
:root {
  --wave-ripple-count: 8;
  --wave-ripple-alpha: 0.8;
  --wave-ripple-hue: 180;  /* シアン系 */
}
```
{% endraw %}

---

**[← エフェクト一覧](/docs/effect-plugins/)** | **[↑ 目次](/docs/)**
