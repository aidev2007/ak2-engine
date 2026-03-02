---
layout: layouts/base.njk
title: "GridConstruction"
navBg: "solid"
sections:
  - type: article
    category: "EFFECT PLUGINS / 背景エフェクト"
    title: "GridConstruction"
    lead: "ページ読み込み時にグリッド線が構築される演出エフェクト。ローディング完了をビジュアルで伝えます。"
---

[← エフェクトプラグイン一覧](/docs/effect-plugins/)

---

## 概要

ページ開幕時に細いグリッド線が順次展開・構築されるアニメーションです。完了時に `ak2:grid-ready` カスタムイベントを発行するため、他のアニメーション（`useLogoAnimation: true` によるSVGストロークアニメーションなど）と連動させることができます。

> **注意:** このエフェクトは1回きりのローディング演出です。繰り返しアニメーションには使用できません。

---

## CSS カスタム変数

このエフェクトに調整可能な CSS カスタム変数はありません。グリッドサイズは内部で `60px` 固定です。

---

## カスタムイベント

| イベント名 | タイミング | 説明 |
|---|---|---|
| `ak2:grid-ready` | グリッド構築完了時 | `document` に対して発行される |

{% raw %}
```javascript
document.addEventListener('ak2:grid-ready', () => {
  // グリッド完成後の処理
});
```
{% endraw %}

---

## 使用例

### セクションへの適用

{% raw %}
```yaml
sections:
  - type: hero
    title: "タイトル"
    effects:
      - GridConstruction
```
{% endraw %}

### ページ全体への適用

{% raw %}
```yaml
---
layout: layouts/base.njk
effects:
  - grid-construction
---
```
{% endraw %}

---

**[← エフェクト一覧](/docs/effect-plugins/)** | **[↑ 目次](/docs/)**
