---
layout: layouts/base.njk
title: "GridEffect"
navBg: "solid"
sections:
  - type: article
    doc_group: "EFFECT PLUGINS / 背景エフェクト"
    title: "GridEffect（lines）"
    lead: "細い格子線が動くグリッドパターンエフェクト。テクニカル・ミニマル・エンジニアリング系のデザインに。"
---

[← エフェクトプラグイン一覧](/docs/effect-plugins/)

---

## 概要

等間隔のグリッド線（格子状）が静かに動くエフェクトです。テクノロジー・ゲーム・データ可視化系のページのベーストーンとして使いやすい、主張を抑えた背景エフェクトです。`--grid-color` でグリッド線の色と透明度を細かく調整できます。

---

## CSS カスタム変数

| 変数名 | デフォルト | 説明 |
|---|---|---|
| `--grid-size` | `60` | グリッド間隔（px） |
| `--grid-color` | `rgba(100, 140, 200, 0.15)` | グリッド線の色（CSS color値） |

---

## 使用例

### セクションへの適用

{% raw %}
```yaml
sections:
  - type: hero
    title: "タイトル"
    effects:
      - GridEffect
```
{% endraw %}

### ページ全体への適用

{% raw %}
```yaml
---
layout: layouts/base.njk
effects:
  - GridEffect
---
```
{% endraw %}

### CSS 変数での調整

{% raw %}
```css
:root {
  --grid-size: 40;
  --grid-color: rgba(0, 200, 100, 0.12);  /* グリーン系グリッド */
}
```
{% endraw %}

---

**[← エフェクト一覧](/docs/effect-plugins/)** | **[↑ 目次](/docs/)**
