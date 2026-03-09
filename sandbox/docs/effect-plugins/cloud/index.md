---
layout: layouts/base.njk
title: "CloudEffect"
navBg: "solid"
sections:
  - type: article
    doc_group: "EFFECT PLUGINS / 背景エフェクト"
    title: "CloudEffect"
    lead: "白い雲が緩やかに左右に流れるエフェクト。空・清潔感・爽やかさを表現します。"
---

[← エフェクトプラグイン一覧](/docs/effect-plugins/)

---

## 概要

ふんわりとした雲形状がゆっくり横移動するエフェクトです。明るい背景のページや、自然・環境系サイトの柔らかい演出として活用できます。色相を変えると夕暮れ雲なども表現できます。

---

## CSS カスタム変数

| 変数名 | デフォルト | 説明 |
|---|---|---|
| `--cloud-count` | `8` | 雲の数 |
| `--cloud-alpha` | `1.0` | アルファ係数 |
| `--cloud-hue` | `210` | 雲の色相（0〜360）。210 で青白系 |

---

## 使用例

### セクションへの適用

{% raw %}
```yaml
sections:
  - type: hero
    title: "タイトル"
    effects:
      - CloudEffectEffect
```
{% endraw %}

### ページ全体への適用

{% raw %}
```yaml
---
layout: layouts/base.njk
effects:
  - CloudEffect
---
```
{% endraw %}

### CSS 変数での調整

{% raw %}
```css
:root {
  --cloud-count: 5;
  --cloud-alpha: 0.7;
  --cloud-hue: 30;   /* 暖色系（夕暮れ） */
}
```
{% endraw %}

---

**[← エフェクト一覧](/docs/effect-plugins/)** | **[↑ 目次](/docs/)**
