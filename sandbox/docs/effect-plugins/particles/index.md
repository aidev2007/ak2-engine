---
layout: layouts/base.njk
title: "ParticleEffect"
navBg: "solid"
sections:
  - type: article
    doc_group: "EFFECT PLUGINS / 背景エフェクト"
    title: "ParticleEffect"
    lead: "Three.js を用いた3Dパーティクル群エフェクト。useThreeJS: true の設定が必要です。"
---

[← エフェクトプラグイン一覧](/docs/effect-plugins/)

---

## 概要

Three.js を使用した3Dパーティクルグリッドエフェクトです。マウスに反応してパーティクルが波のように揺れます。**他のエフェクトとは独立した実装**であり、`useThreeJS: true` front-matter 設定が必要です。

> **注意:** Three.js を外部からロードする必要があります。`useThreeJS: true` を front-matter に設定してください。

---

## YAML パラメーター

| パラメーター | デフォルト | 説明 |
|---|---|---|
| `mountId` | `'hero-particles'` | マウント先 `<div>` の id 属性値 |

---

## 使用方法

### front-matter 設定

{% raw %}
```yaml
---
layout: layouts/base.njk
useThreeJS: true
effects:
  - ParticleEffect
---
```
{% endraw %}

### HTML マウント要素

{% raw %}
```html
<div id="hero-particles" style="width:100%;height:100vh;"></div>
```
{% endraw %}

### カスタム mountId の指定（セクション適用時）

{% raw %}
```yaml
sections:
  - type: hero
    effects:
      - name: ParticleEffect
        mountId: my-canvas-container
```
{% endraw %}

---

## 内部仕様

| 項目 | 値 |
|---|---|
| グリッド横パーティクル数 | `121` |
| グリッド縦パーティクル数 | `60` |
| 使用ライブラリ | Three.js |

---

**[← エフェクト一覧](/docs/effect-plugins/)** | **[↑ 目次](/docs/)**
