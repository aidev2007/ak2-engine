---
layout: layouts/base.njk
title: "StatusUpEffect"
navBg: "solid"
sections:
  - type: article
    doc_group: "EFFECT PLUGINS / 背景エフェクト"
    title: "StatusUpEffect"
    lead: "ゲームのステータスアップ演出のようなバーが上昇するエフェクト。ゲーミング・デジタル・RPG系に。"
---

[← エフェクトプラグイン一覧](/docs/effect-plugins/)

---

## 概要

縦方向のバーが下から上に向かってゆっくりと上昇するエフェクトです。ゲームのHPゲージやレベルアップ演出を連想させる独特のビジュアルで、ゲーミング・デジタルアート・エンターテインメント系のページに個性的な演出を加えます。`--status-up-theme: light` で白背景にも対応します。

---

## CSS カスタム変数

| 変数名 | デフォルト | 説明 |
|---|---|---|
| `--status-up-count` | `35` | 最大バー数 |
| `--status-up-alpha` | `1.0` | アルファ係数 |
| `--status-up-hue` | `40` | バーの基本色相（0〜360）。40 で黄金系 |
| `--status-up-theme` | `'dark'` | テーマ。`'dark'` または `'light'` |

---

## 使用例

### セクションへの適用

{% raw %}
```yaml
sections:
  - type: hero
    title: "タイトル"
    effects:
      - StatusUpEffect
```
{% endraw %}

### ページ全体への適用

{% raw %}
```yaml
---
layout: layouts/base.njk
effects:
  - StatusUpEffect
---
```
{% endraw %}

### CSS 変数での調整

{% raw %}
```css
:root {
  --status-up-count: 50;
  --status-up-alpha: 0.8;
  --status-up-hue: 120;    /* グリーン系 */
  --status-up-theme: dark;
}
```
{% endraw %}

---

**[← エフェクト一覧](/docs/effect-plugins/)** | **[↑ 目次](/docs/)**
