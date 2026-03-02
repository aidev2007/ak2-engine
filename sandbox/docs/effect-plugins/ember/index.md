---
layout: layouts/base.njk
title: "EmberEffect"
navBg: "solid"
sections:
  - type: article
    category: "EFFECT PLUGINS / 背景エフェクト"
    title: "EmberEffect"
    lead: "炎の火の粉（エンバー）が上方向に漂うエフェクト。情熱・夏祭り・工業系の演出に。"
---

[← エフェクトプラグイン一覧](/docs/effect-plugins/)

---

## 概要

小さな光の粒子が揺らぎながら上昇するエフェクトです。焚き火や炉の火の粉を模しており、情熱的・エネルギッシュな印象を与えます。`--ember-theme: light` で明るい背景にも対応します。

---

## CSS カスタム変数

| 変数名 | デフォルト | 説明 |
|---|---|---|
| `--ember-count` | `40` | 最大粒子数 |
| `--ember-alpha` | `1.0` | アルファ係数 |
| `--ember-hue` | `28` | 粒子の基本色相（0〜360）。28 でオレンジ系 |
| `--ember-theme` | `'dark'` | テーマ。`'dark'` または `'light'` |

---

## 使用例

### セクションへの適用

{% raw %}
```yaml
sections:
  - type: hero
    title: "タイトル"
    effects:
      - EmberEffect
```
{% endraw %}

### ページ全体への適用

{% raw %}
```yaml
---
layout: layouts/base.njk
effects:
  - ember
---
```
{% endraw %}

### CSS 変数での調整

{% raw %}
```css
:root {
  --ember-count: 60;
  --ember-alpha: 0.8;
  --ember-hue: 28;     /* オレンジ */
  --ember-theme: dark;
}
```
{% endraw %}

---

**[← エフェクト一覧](/docs/effect-plugins/)** | **[↑ 目次](/docs/)**
