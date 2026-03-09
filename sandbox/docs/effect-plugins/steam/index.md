---
layout: layouts/base.njk
title: "SteamEffect"
navBg: "solid"
sections:
  - type: article
    doc_group: "EFFECT PLUGINS / 背景エフェクト"
    title: "SteamEffect"
    lead: "湯気が立ち上るエフェクト。温泉・カフェ・ラーメン・温かみのある演出に。"
---

[← エフェクトプラグイン一覧](/docs/effect-plugins/)

---

## 概要

白い煙・湯気が下から上に向かってゆっくり揺れながら上昇するエフェクトです。温泉・スパ・カフェ・料理サイトなど、温かみや安らぎを表現したいページに特に映えます。`--steam-theme: light` で白背景にも対応します。

---

## CSS カスタム変数

| 変数名 | デフォルト | 説明 |
|---|---|---|
| `--steam-count` | `18` | 最大粒子数 |
| `--steam-alpha` | `1.0` | アルファ係数 |
| `--steam-hue` | `210` | 煙の色相（0〜360）。210 で青白系 |
| `--steam-theme` | `'dark'` | テーマ。`'dark'` または `'light'` |

---

## 使用例

### セクションへの適用

{% raw %}
```yaml
sections:
  - type: hero
    title: "タイトル"
    effects:
      - SteamEffectEffect
```
{% endraw %}

### ページ全体への適用

{% raw %}
```yaml
---
layout: layouts/base.njk
effects:
  - SteamEffect
---
```
{% endraw %}

### CSS 変数での調整

{% raw %}
```css
:root {
  --steam-count: 12;
  --steam-alpha: 0.75;
  --steam-hue: 30;     /* 暖色系の湯気 */
  --steam-theme: dark;
}
```
{% endraw %}

---

**[← エフェクト一覧](/docs/effect-plugins/)** | **[↑ 目次](/docs/)**
