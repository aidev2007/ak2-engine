---
layout: layouts/base.njk
title: "SnowEffect"
navBg: "solid"
sections:
  - type: article
    category: "EFFECT PLUGINS / 背景エフェクト"
    title: "SnowEffect"
    lead: "白い雪がゆっくり降り積もるエフェクト。冬・クリスマス・北欧系サイトに。"
---

[← エフェクトプラグイン一覧](/docs/effect-plugins/)

---

## 概要

丸い雪の粒子がゆっくり揺れながら落下するエフェクトです。最もよく使われる背景エフェクトの一つで、CSS 変数と YAML パラメーターの両方に対応しています。`hue` を指定することで白以外の色付き雪にすることもできます。

---

## CSS カスタム変数

| 変数名 | デフォルト | 説明 |
|---|---|---|
| `--snow-count` | `60` | 粒子数 |
| `--snow-alpha` | `1.0` | 明るさ係数 |
| `--snow-hue` | 未設定 | 色相（0〜360）。未設定で白/青白 |
| `--snow-lightness` | `70` | 明度（0〜100）。`hue` 設定時のみ有効 |

---

## YAML パラメーター（セクション適用時）

| パラメーター | デフォルト | 説明 |
|---|---|---|
| `count` | `60` | 粒子数（推奨: 20〜200） |
| `alpha` | `1.0` | 明るさ係数（推奨: 0.5〜1.5） |
| `hue` | 未設定 | 色相 0〜360（未設定で白/青白） |
| `lightness` | `70` | 明度 0〜100（`hue` 設定時のみ有効） |

---

## 使用例

### セクションへの適用（オプションなし）

{% raw %}
```yaml
sections:
  - type: hero
    title: "タイトル"
    effects:
      - SnowEffect
```
{% endraw %}

### セクションへの適用（オプションあり）

{% raw %}
```yaml
sections:
  - type: hero
    title: "タイトル"
    effects:
      - name: SnowEffect
        count: 30
        alpha: 1.2
        hue: 210
        lightness: 80
```
{% endraw %}

### ページ全体への適用

{% raw %}
```yaml
---
layout: layouts/base.njk
effects:
  - snow
---
```
{% endraw %}

### CSS 変数での調整

{% raw %}
```css
:root {
  --snow-count: 100;
  --snow-alpha: 0.9;
}
```
{% endraw %}

---

**[← エフェクト一覧](/docs/effect-plugins/)** | **[↑ 目次](/docs/)**
