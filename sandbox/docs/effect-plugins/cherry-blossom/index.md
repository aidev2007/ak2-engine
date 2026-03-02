---
layout: layouts/base.njk
title: "CherryBlossomEffect"
navBg: "solid"
sections:
  - type: article
    category: "EFFECT PLUGINS / 背景エフェクト"
    title: "CherryBlossomEffect"
    lead: "ピンクの花びらがひらひらと舞い落ちる桜エフェクト。春・和風のページにぴったりです。"
---

[← エフェクトプラグイン一覧](/docs/effect-plugins/)

---

## 概要

丸みのある花びら形状がランダムに回転しながら落下するエフェクトです。色相（`--cherry-blossom-hue`）を変えることで他の花びらの色も表現できます。

---

## CSS カスタム変数

| 変数名 | デフォルト | 説明 |
|---|---|---|
| `--cherry-blossom-count` | `60` | 花びらの数 |
| `--cherry-blossom-alpha` | `1.0` | アルファ係数。小さくすると淡くなる |
| `--cherry-blossom-hue` | `345` | 花びらの色相（0〜360）。345 でピンク系 |

---

## 使用例

### セクションへの適用

{% raw %}
```yaml
sections:
  - type: hero
    title: "Spring Collection"
    effects:
      - CherryBlossomEffect
```
{% endraw %}

### ページ全体への適用

{% raw %}
```yaml
---
layout: layouts/base.njk
effects:
  - cherry-blossom
---
```
{% endraw %}

### CSS 変数での調整

{% raw %}
```css
:root {
  --cherry-blossom-count: 40;
  --cherry-blossom-alpha: 0.8;
  --cherry-blossom-hue: 345;  /* ピンク */
}
```
{% endraw %}

---

**[← エフェクト一覧](/docs/effect-plugins/)** | **[↑ 目次](/docs/)**
