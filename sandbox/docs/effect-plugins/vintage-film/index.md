---
layout: layouts/base.njk
title: "VintageFilmEffect"
navBg: "solid"
sections:
  - type: article
    category: "EFFECT PLUGINS / 背景エフェクト"
    title: "VintageFilmEffect"
    lead: "フィルムグレイン・スクラッチノイズを重ねるエフェクト。レトロ・映画的・ノスタルジックな演出に。"
---

[← エフェクトプラグイン一覧](/docs/effect-plugins/)

---

## 概要

画面全体にフィルムグレイン（粒子ノイズ）とスクラッチ傷を重ねるエフェクトです。まるで古いフィルム映画を観ているような質感を与えます。`ProjectorFlickerEffect` と組み合わせるとより本格的なレトロ映画の雰囲気になります。`--vintage-film-alpha` で効果の強さを調整できます。

---

## CSS カスタム変数

| 変数名 | デフォルト | 説明 |
|---|---|---|
| `--vintage-film-alpha` | `1.0` | 全体強度係数。小さくすると効果が控えめになる |

---

## 使用例

### セクションへの適用

{% raw %}
```yaml
sections:
  - type: hero
    title: "タイトル"
    effects:
      - VintageFilmEffect
```
{% endraw %}

### ページ全体への適用

{% raw %}
```yaml
---
layout: layouts/base.njk
effects:
  - VintageFilmEffect
---
```
{% endraw %}

### ProjectorFlickerEffect との組み合わせ

{% raw %}
```yaml
effects:
  - VintageFilmEffect
  - ProjectorFlickerEffect
```
{% endraw %}

### CSS 変数での調整

{% raw %}
```css
:root {
  --vintage-film-alpha: 0.6;  /* 控えめなグレイン */
}
```
{% endraw %}

---

**[← エフェクト一覧](/docs/effect-plugins/)** | **[↑ 目次](/docs/)**
