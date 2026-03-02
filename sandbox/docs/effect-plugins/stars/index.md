---
layout: layouts/base.njk
title: "StarFieldEffect"
navBg: "solid"
sections:
  - type: article
    category: "EFFECT PLUGINS / 背景エフェクト"
    title: "StarFieldEffect"
    lead: "星空を再現するエフェクト。夜・宇宙・ロマンティックなページに。"
---

[← エフェクトプラグイン一覧](/docs/effect-plugins/)

---

## 概要

ランダムな位置に配置された点（星）が近い星同士を細い線で結び、動的な星座風パターンを描くエフェクトです。最大接続距離は `160px` で、星が移動するにつれてリアルタイムで線が再計算されます。宇宙・夜景・天文系サイトに最適です。

---

## CSS カスタム変数

| 変数名 | デフォルト | 説明 |
|---|---|---|
| `--stars-count` | `60` | 星の数 |
| `--stars-alpha` | `1.0` | 線・点のアルファ係数 |

---

## 使用例

### セクションへの適用

{% raw %}
```yaml
sections:
  - type: hero
    title: "タイトル"
    effects:
      - StarFieldEffect
```
{% endraw %}

### ページ全体への適用

{% raw %}
```yaml
---
layout: layouts/base.njk
effects:
  - stars
---
```
{% endraw %}

### CSS 変数での調整

{% raw %}
```css
:root {
  --stars-count: 100;   /* 星を増やす */
  --stars-alpha: 0.8;
}
```
{% endraw %}

---

**[← エフェクト一覧](/docs/effect-plugins/)** | **[↑ 目次](/docs/)**
