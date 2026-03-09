---
layout: layouts/base.njk
title: "FireflyEffect"
navBg: "solid"
sections:
  - type: article
    doc_group: "EFFECT PLUGINS / 背景エフェクト"
    title: "FireflyEffect"
    lead: "光の点（ホタル）がゆらめきながら光跡を描くエフェクト。夏・幻想的な雰囲気に。"
---

[← エフェクトプラグイン一覧](/docs/effect-plugins/)

---

## 概要

ホタルのような光の粒子がランダムな方向に漂い、オフスクリーン Canvas で滑らかな光跡を描くエフェクトです。`interactive: true`（デフォルト）でマウスカーソルに反応して散らばります。夏の夜や幻想的なシーンに最適です。

---

## CSS カスタム変数

| 変数名 | デフォルト | 説明 |
|---|---|---|
| `--firefly-hue` | `75` | 色相（0〜360）。75 で黄緑系（ホタルらしい色） |
| `--firefly-density` | `0.000009` | 密度（粒子数/px²）。大きくすると粒子が増える |
| `--firefly-alpha` | `0.40` | 最大輝度（0〜1） |
| `--firefly-trail` | `0.35` | 残像フェード係数。大きくすると残像が短くなる |
| `--firefly-theme` | `'dark'` | テーマ。`'light'` で白背景モード |

---

## YAML パラメーター（セクション適用時）

`constructor(options)` 経由で以下のパラメーターを渡せます。

| パラメーター | デフォルト | 説明 |
|---|---|---|
| `interactive` | `true` | マウスへの反応（ホタルが散らばる挙動） |

---

## 使用例

### セクションへの適用（オプションなし）

{% raw %}
```yaml
sections:
  - type: hero
    title: "タイトル"
    effects:
      - FireflyEffectEffect
```
{% endraw %}

### セクションへの適用（マウス反応なし）

{% raw %}
```yaml
sections:
  - type: hero
    title: "タイトル"
    effects:
      - name: FireflyEffect
        interactive: false
```
{% endraw %}

### ページ全体への適用

{% raw %}
```yaml
---
layout: layouts/base.njk
effects:
  - FireflyEffect
---
```
{% endraw %}

### CSS 変数での調整

{% raw %}
```css
:root {
  --firefly-hue: 75;
  --firefly-density: 0.000012;  /* 粒子を増やす */
  --firefly-alpha: 0.55;
  --firefly-trail: 0.25;        /* 残像を長くする */
  --firefly-theme: dark;
}
```
{% endraw %}

---

**[← エフェクト一覧](/docs/effect-plugins/)** | **[↑ 目次](/docs/)**
