---
layout: layouts/base.njk
title: "RippleEffect"
navBg: "solid"
sections:
  - type: article
    doc_group: "EFFECT PLUGINS / 背景エフェクト"
    title: "RippleEffect"
    lead: "クリックした場所から水面に波紋が広がるインタラクティブエフェクト。水・清涼感・温泉系サイトに。"
---

[← エフェクトプラグイン一覧](/docs/effect-plugins/)

---

## 概要

クリック（またはタップ）した地点から同心円状の波紋が広がるインタラクティブエフェクトです。最大拡張半径は `180px` で、3色のバリエーションがランダムに選ばれます。水・池・温泉・スパ系サイトのインタラクション演出として特に効果的です。

---

## CSS カスタム変数

このエフェクトに調整可能な CSS カスタム変数はありません。

---

## 内部仕様

| 項目 | 値 |
|---|---|
| 最大拡張半径 | `180px` |
| カラーバリエーション | 3色（内部定義） |
| トリガー | クリック / タップ |

---

## 使用例

### セクションへの適用

{% raw %}
```yaml
sections:
  - type: hero
    title: "タイトル"
    effects:
      - RippleEffectEffect
```
{% endraw %}

### ページ全体への適用

{% raw %}
```yaml
---
layout: layouts/base.njk
effects:
  - RippleEffect
---
```
{% endraw %}

---

**[← エフェクト一覧](/docs/effect-plugins/)** | **[↑ 目次](/docs/)**
