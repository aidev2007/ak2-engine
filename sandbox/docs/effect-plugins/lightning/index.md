---
layout: layouts/base.njk
title: "LightningEffect"
navBg: "solid"
sections:
  - type: article
    category: "EFFECT PLUGINS / 背景エフェクト"
    title: "LightningEffect"
    lead: "稲妻が走るエフェクト。エネルギッシュ・テック・ロック系のページに強烈なインパクトを与えます。"
---

[← エフェクトプラグイン一覧](/docs/effect-plugins/)

---

## 概要

ランダムな間隔で稲妻が枝分かれしながら走るエフェクトです。色相を変えることで白い電撃・青い稲光・紫の雷など様々な表現が可能です。`--lightning-theme: light` で白背景のページにも対応します。

---

## CSS カスタム変数

| 変数名 | デフォルト | 説明 |
|---|---|---|
| `--lightning-alpha` | `1.0` | アルファ係数 |
| `--lightning-hue` | `240` | 稲妻の色相（0〜360）。240 で青系 |
| `--lightning-interval` | `2.5` | 閃光の平均間隔（秒）。小さくすると頻繁に光る |
| `--lightning-theme` | `'dark'` | テーマ。`'dark'` または `'light'` |

---

## 使用例

### セクションへの適用

{% raw %}
```yaml
sections:
  - type: hero
    title: "タイトル"
    effects:
      - LightningEffectEffect
```
{% endraw %}

### ページ全体への適用

{% raw %}
```yaml
---
layout: layouts/base.njk
effects:
  - LightningEffect
---
```
{% endraw %}

### CSS 変数での調整

{% raw %}
```css
:root {
  --lightning-alpha: 0.9;
  --lightning-hue: 280;      /* 紫系 */
  --lightning-interval: 1.5; /* 頻繁に点灯 */
  --lightning-theme: dark;
}
```
{% endraw %}

---

**[← エフェクト一覧](/docs/effect-plugins/)** | **[↑ 目次](/docs/)**
