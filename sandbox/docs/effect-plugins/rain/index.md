---
layout: layouts/base.njk
title: "RainEffect"
navBg: "solid"
sections:
  - type: article
    category: "EFFECT PLUGINS / 背景エフェクト"
    title: "RainEffect"
    lead: "縦に落ちる雨粒のラインを描くエフェクト。梅雨・夜の雨・水系サイトに。"
---

[← エフェクトプラグイン一覧](/docs/effect-plugins/)

---

## 概要

細い縦線が画面上部から落下する雨を表現するエフェクトです。雨粒の数・透明度・色相を調整できます。ダークな背景に映えますが、`--rain-hue` を変えることで様々な色の雨を表現できます。

---

## CSS カスタム変数

| 変数名 | デフォルト | 説明 |
|---|---|---|
| `--rain-count` | `120` | 雨粒（線）の数 |
| `--rain-alpha` | `1.0` | アルファ係数 |
| `--rain-hue` | `200` | 雨粒の基準色相（0〜360）。200 で青系 |

---

## 使用例

### セクションへの適用

{% raw %}
```yaml
sections:
  - type: hero
    title: "タイトル"
    effects:
      - RainEffect
```
{% endraw %}

### ページ全体への適用

{% raw %}
```yaml
---
layout: layouts/base.njk
effects:
  - rain
---
```
{% endraw %}

### CSS 変数での調整

{% raw %}
```css
:root {
  --rain-count: 80;
  --rain-alpha: 0.7;
  --rain-hue: 200;  /* 青系 */
}
```
{% endraw %}

---

**[← エフェクト一覧](/docs/effect-plugins/)** | **[↑ 目次](/docs/)**
