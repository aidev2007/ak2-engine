---
layout: layouts/base.njk
title: "LeafFallEffect"
navBg: "solid"
sections:
  - type: article
    doc_group: "EFFECT PLUGINS / 背景エフェクト"
    title: "LeafFallEffect"
    lead: "葉が落下する秋のシーンを演出するエフェクト。色相で様々な葉の色を表現できます。"
---

[← エフェクトプラグイン一覧](/docs/effect-plugins/)

---

## 概要

葉が画面上部から落下しながら回転するエフェクトです。`LeafEffect` が浮遊・漂うのに対し、`LeafFallEffect` は重力に従って落下する表現です。色相の調整で緑・黄・橙など様々な季節感を演出できます。

---

## CSS カスタム変数

| 変数名 | デフォルト | 説明 |
|---|---|---|
| `--leaf-fall-count` | `40` | 葉の数 |
| `--leaf-fall-alpha` | `1.0` | アルファ係数 |
| `--leaf-fall-hue` | `45` | 葉の基準色相（0〜360）。45 で黄緑〜黄色系 |

---

## 使用例

### セクションへの適用

{% raw %}
```yaml
sections:
  - type: hero
    title: "タイトル"
    effects:
      - LeafFallEffect
```
{% endraw %}

### ページ全体への適用

{% raw %}
```yaml
---
layout: layouts/base.njk
effects:
  - LeafFallEffect
---
```
{% endraw %}

### CSS 変数での調整

{% raw %}
```css
:root {
  --leaf-fall-count: 30;
  --leaf-fall-alpha: 0.85;
  --leaf-fall-hue: 20;   /* 橙〜赤系（紅葉） */
}
```
{% endraw %}

---

**[← エフェクト一覧](/docs/effect-plugins/)** | **[↑ 目次](/docs/)**
