---
layout: layouts/base.njk
title: "SparksEffect"
navBg: "solid"
sections:
  - type: article
    category: "EFFECT PLUGINS / 背景エフェクト"
    title: "SparksEffect"
    lead: "火花・スパークが定期的にはじけるエフェクト。工場・ものづくり・エネルギー系サイトに。"
---

[← エフェクトプラグイン一覧](/docs/effect-plugins/)

---

## 概要

一定間隔でランダムな位置から火花粒子がバースト放射されるエフェクトです。工場の溶接・鍛冶・電気火花などを連想させる力強い演出で、製造業・エンジニアリング・エネルギー企業のページに適しています。

---

## CSS カスタム変数

| 変数名 | デフォルト | 説明 |
|---|---|---|
| `--sparks-burst` | `25` | バースト1回あたりの最小粒子数 |
| `--sparks-alpha` | `0.55` | 粒子の最大アルファ値（0〜1） |
| `--sparks-interval` | `2.0` | バースト間隔の基準秒数 |

---

## 使用例

### セクションへの適用

{% raw %}
```yaml
sections:
  - type: hero
    title: "タイトル"
    effects:
      - SparksEffectEffect
```
{% endraw %}

### ページ全体への適用

{% raw %}
```yaml
---
layout: layouts/base.njk
effects:
  - SparksEffect
---
```
{% endraw %}

### CSS 変数での調整

{% raw %}
```css
:root {
  --sparks-burst: 40;       /* 一度に多くの火花 */
  --sparks-alpha: 0.7;
  --sparks-interval: 1.2;   /* 頻繁にバースト */
}
```
{% endraw %}

---

**[← エフェクト一覧](/docs/effect-plugins/)** | **[↑ 目次](/docs/)**
