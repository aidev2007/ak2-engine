---
layout: layouts/base.njk
title: "MomijiEffect"
navBg: "solid"
sections:
  - type: article
    doc_group: "EFFECT PLUGINS / 背景エフェクト"
    title: "MomijiEffect"
    lead: "赤みが強いもみじの葉が舞うエフェクト。MapleLeafEffectより深い赤橙色で、秋らしさを強調します。"
---

[← エフェクトプラグイン一覧](/docs/effect-plugins/)

---

## 概要

`MapleLeafEffect` の赤みが強いバリエーションです。もみじの赤・橙・茶を中心とした色相で構成されており、より濃厚な紅葉の雰囲気を演出します。`--momiji-hue` で色相を調整できます。

---

## CSS カスタム変数

| 変数名 | デフォルト | 説明 |
|---|---|---|
| `--momiji-count` | `40` | 葉の数 |
| `--momiji-alpha` | `1.0` | アルファ係数 |
| `--momiji-hue` | `15` | 葉の基準色相（0〜360）。15 で赤橙系 |

---

## 使用例

### セクションへの適用

{% raw %}
```yaml
sections:
  - type: hero
    title: "タイトル"
    effects:
      - MomijiEffectEffect
```
{% endraw %}

### ページ全体への適用

{% raw %}
```yaml
---
layout: layouts/base.njk
effects:
  - MomijiEffect
---
```
{% endraw %}

### CSS 変数での調整

{% raw %}
```css
:root {
  --momiji-count: 30;
  --momiji-alpha: 0.9;
  --momiji-hue: 5;   /* より赤系 */
}
```
{% endraw %}

---

**[← エフェクト一覧](/docs/effect-plugins/)** | **[↑ 目次](/docs/)**
