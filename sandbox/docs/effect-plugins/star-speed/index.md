---
layout: layouts/base.njk
title: "StarSpeedEffect"
navBg: "solid"
sections:
  - type: article
    category: "EFFECT PLUGINS / 背景エフェクト"
    title: "StarSpeedEffect"
    lead: "星が中心から外側に高速で流れるワープ演出エフェクト。SF・スピード感・テクノロジー系に。"
---

[← エフェクトプラグイン一覧](/docs/effect-plugins/)

---

## 概要

画面中心から外側に向かって高速で飛んでいく光の線（ストリーク）がワープ・ワームホールの演出を作り出すエフェクトです。`--star-speed-velocity` で流れる速さを調整できます。SF・ゲーミング・ハイテク系のページに強烈なインパクトを与えます。`--star-speed-invert: 1` で白背景モードにも対応します。

---

## CSS カスタム変数

| 変数名 | デフォルト | 説明 |
|---|---|---|
| `--star-speed-count` | `120` | 星の数 |
| `--star-speed-alpha` | `1.0` | アルファ係数 |
| `--star-speed-velocity` | `0.12` | 飛行速度の係数。大きいほど速い |
| `--star-speed-invert` | `'0'` | 白背景モード（`'1'` で有効） |

---

## 使用例

### セクションへの適用

{% raw %}
```yaml
sections:
  - type: hero
    title: "タイトル"
    effects:
      - StarSpeedEffect
```
{% endraw %}

### ページ全体への適用

{% raw %}
```yaml
---
layout: layouts/base.njk
effects:
  - StarSpeedEffect
---
```
{% endraw %}

### CSS 変数での調整

{% raw %}
```css
:root {
  --star-speed-count: 200;
  --star-speed-alpha: 0.9;
  --star-speed-velocity: 0.20;  /* 高速ワープ */
}
```
{% endraw %}

---

**[← エフェクト一覧](/docs/effect-plugins/)** | **[↑ 目次](/docs/)**
