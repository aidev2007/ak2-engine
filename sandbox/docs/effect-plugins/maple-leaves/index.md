---
layout: layouts/base.njk
title: "MapleLeafEffect"
navBg: "solid"
sections:
  - type: article
    category: "EFFECT PLUGINS / 背景エフェクト"
    title: "MapleLeafEffect"
    lead: "もみじの葉が風に舞うエフェクト。紅葉・日本の秋を表現します。"
---

[← エフェクトプラグイン一覧](/docs/effect-plugins/)

---

## 概要

もみじ（カエデ）の形をした葉が揺れながら落下・漂うエフェクトです。`MomijiEffect` と似ていますが、`MapleLeafEffect` はやや大きめの葉で、黄橙系が基本色です。秋のキャンペーンや和風サイトに映えます。

---

## CSS カスタム変数

| 変数名 | デフォルト | 説明 |
|---|---|---|
| `--maple-leaves-count` | `40` | 葉の数 |
| `--maple-leaves-alpha` | `1.0` | アルファ係数 |

---

## 使用例

### セクションへの適用

{% raw %}
```yaml
sections:
  - type: hero
    title: "タイトル"
    effects:
      - MapleLeafEffect
```
{% endraw %}

### ページ全体への適用

{% raw %}
```yaml
---
layout: layouts/base.njk
effects:
  - MapleLeafEffect
---
```
{% endraw %}

### CSS 変数での調整

{% raw %}
```css
:root {
  --maple-leaves-count: 25;
  --maple-leaves-alpha: 0.85;
}
```
{% endraw %}

---

**[← エフェクト一覧](/docs/effect-plugins/)** | **[↑ 目次](/docs/)**
