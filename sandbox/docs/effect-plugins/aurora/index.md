---
layout: layouts/base.njk
title: "AuroraEffect"
navBg: "solid"
sections:
  - type: article
    category: "EFFECT PLUGINS / 背景エフェクト"
    title: "AuroraEffect"
    lead: "青〜紫〜緑の光が揺らめくオーロラエフェクト。幻想的・神秘的な演出に最適です。"
---

[← エフェクトプラグイン一覧](/docs/effect-plugins/)

---

## 概要

複数の半透明な光の帯が波打ちながら流れるオーロラ（北極光）を再現したエフェクトです。ダークテーマのページに特に映え、SF・ファンタジー・ハイテクブランドなどに幅広く活用できます。

---

## CSS カスタム変数

| 変数名 | デフォルト | 説明 |
|---|---|---|
| `--aurora-alpha` | `1.0` | 全バンドのアルファ（透明度）係数。小さくすると透明度が上がる |
| `--aurora-theme` | `'dark'` | テーマ。`'dark'` で暗背景、`'light'` で明背景向けの配色 |

---

## 使用例

### セクションへの適用

{% raw %}
```yaml
sections:
  - type: hero
    title: "タイトル"
    effects:
      - AuroraEffectEffect
```
{% endraw %}

### ページ全体への適用

{% raw %}
```yaml
---
layout: layouts/base.njk
effects:
  - AuroraEffect
---
```
{% endraw %}

### CSS 変数での調整

{% raw %}
```css
:root {
  --aurora-alpha: 0.6;   /* 控えめに */
  --aurora-theme: dark;
}
```
{% endraw %}

---

**[← エフェクト一覧](/docs/effect-plugins/)** | **[↑ 目次](/docs/)**
