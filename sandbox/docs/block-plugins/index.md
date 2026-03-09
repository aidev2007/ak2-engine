---
layout: layouts/base.njk
title: "ブロックプラグイン"
navBg: "solid"
sections:
  - type: article
    doc_group: "AK²ENGINE DOCS"
    title: "ブロックプラグイン"
    lead: "カード・フォーム・CTA・FAQなどのコンテンツブロックプラグイン11種です。"
---

[← 目次に戻る](/docs/)

---

## block-card-feature — `featureItem`

アイコン＋タイトル＋本文のシンプルなカード。「高速・安全・柔軟」など製品の特徴紹介に最適。

{% raw %}
```nunjucks
{% from "block-card-feature/block-card-feature.njk" import featureItem %}

<div class="card-grid">
  {{ featureItem("zap", "高速処理", "説明文テキスト。") }}
  {{ featureItem("shield", "セキュア", "説明文テキスト。") }}
</div>
```
{% endraw %}

| パラメーター | 説明 |
|---|---|
| `icon` | Lucide アイコン名（例: `"zap"`, `"layers"`, `"code-2"`） |
| `title` | カードタイトル |
| `text` | カード本文 |

---

## block-card-philosophy — `philosophyCard`

カード上部に大きな文字（漢字1文字・英字2文字など）が配置されるカード。哲学・理念・価値観の表現に。

{% raw %}
```nunjucks
{% from "block-card-philosophy/block-card-philosophy.njk" import philosophyCard %}

<div class="philosophy-grid">
  {{ philosophyCard("職", "職人技", "説明文。") }}
  {{ philosophyCard("AI", "AI効率", "説明文。") }}
</div>
```
{% endraw %}

| パラメーター | 説明 |
|---|---|
| `char` | 大きな文字（1〜2文字、漢字・英字） |
| `term` | 用語・見出し |
| `desc` | 説明文 |

---

## block-card-sample — `sampleCard`

制作実績・ポートフォリオ用カード。カラーブロック＋タイトル＋タグバッジ構成。

{% raw %}
```nunjucks
{% from "block-card-sample/block-card-sample.njk" import sampleCard %}

<div class="samples-grid">
  {% for s in samples %}
    {{ sampleCard(s, loop.index0) }}
  {% endfor %}
</div>
```
{% endraw %}

**`samples.json` スキーマ:**
{% raw %}
```json
[
  {
    "title": "サイト名",
    "desc": "説明文",
    "tags": ["Eleventy", "CSS"],
    "url": "https://example.com",
    "color": "#025DCC"
  }
]
```
{% endraw %}

---

## block-card-service — `serviceCard`

提供サービスのメニューカード。バッジ・名前・価格・説明文・注記の構成。

{% raw %}
```nunjucks
{% from "block-card-service/block-card-service.njk" import serviceCard %}

<div class="service-grid">
  {{ serviceCard("LP制作", "LANDING", "¥150,000〜", "説明文", "制作期間2〜3週間") }}
</div>
```
{% endraw %}

| パラメーター | 説明 |
|---|---|
| `title` | サービス名 |
| `tag` | カードバッジテキスト |
| `price` | 価格表示文字列 |
| `desc` | 説明文 |
| `note` | 注記テキスト |

---

## block-card-stance — `stanceCard`

番号付きリストで「姿勢・方針・こだわり」を表示するカード。

{% raw %}
```nunjucks
{% from "block-card-stance/block-card-stance.njk" import stanceCard %}

<div class="stance-list">
  {{ stanceCard("01", "コードより体験を優先する", "説明文。") }}
</div>
```
{% endraw %}

---

## block-card-target — `targetCard`

「こんな人におすすめ」を紹介するシンプルなカード。絵文字＋ターゲット名＋説明文。

{% raw %}
```nunjucks
{% from "block-card-target/block-card-target.njk" import targetCard %}

<div class="card-grid">
  {{ targetCard("🏢", "法人・企業", "説明文。") }}
</div>
```
{% endraw %}

---

## block-concept-standard — `conceptBlock`

画像＋テキストの横並びレイアウトブロック。画像はゆっくり浮遊するアニメーション付き。

{% raw %}
```nunjucks
{% from "block-concept-standard/block-concept-standard.njk" import conceptBlock %}

{{ conceptBlock(
  image="/images/concept.jpg",
  alt="コンセプト画像",
  heading="見出しテキスト",
  body="<p>本文HTML。</p>",
  note="補足テキスト",
  pos="right",
  delay="0.3s"
) }}
```
{% endraw %}

| パラメーター | デフォルト | 説明 |
|---|---|---|
| `image` | — | 画像URL |
| `alt` | — | alt テキスト |
| `heading` | — | 見出し |
| `body` | — | 本文（HTML可） |
| `note` | `""` | 注記テキスト |
| `pos` | `"left"` | 画像位置（`"left"` / `"right"`） |
| `delay` | `"0s"` | アニメーション遅延 |

---

## block-cta-standard — `ctaSection`

ページ全幅のコール・トゥ・アクションセクション。

{% raw %}
```nunjucks
{% from "block-cta-standard/block-cta-standard.njk" import ctaSection %}

{{ ctaSection(
  title="一緒に作りませんか？",
  text="お気軽にお問い合わせください。",
  linkUrl="/#contact",
  linkText="お問い合わせ",
  gradient="linear-gradient(135deg, #eff6ff, #f0f9ff)"
) }}
```
{% endraw %}

---

## block-faq-accordion — `faqItem`

クリックで回答が展開するアコーディオンUI。

{% raw %}
```nunjucks
{% from "block-faq-accordion/block-faq-accordion.njk" import faqItem %}

<div style="max-width:800px;margin:0 auto">
  {{ faqItem("Q. 納期はどれくらいですか？", "A. 通常2〜4週間です。") }}
</div>
```
{% endraw %}

---

## block-form-contact — `contactForm`

名前・会社名・メール・電話・お問い合わせ内容の5フィールドフォーム。Formspree等と連携可能。

{% raw %}
```nunjucks
{% from "block-form-contact/block-form-contact.njk" import contactForm %}

{{ contactForm(action="https://formspree.io/f/xxxxx") }}
```
{% endraw %}

---

## block-imagecontent-standard — `imageContentBlock`

画像（左）＋テキスト（右）のコンパクトなコンテンツブロック。

{% raw %}
```nunjucks
{% from "block-imagecontent-standard/block-imagecontent-standard.njk" import imageContentBlock %}

{{ imageContentBlock(
  image="/images/photo.jpg",
  alt="写真の説明",
  headline="見出し",
  bodyHtml="<p>本文HTML。</p>",
  delay="0.5s"
) }}
```
{% endraw %}

---

## block-card-kinetic — `kineticCard` / `kineticCardGrid`

ホバーで3Dティルト＋光反射＋パララックスが発生するカード。

{% raw %}
```nunjucks
{% from "block-card-kinetic/block-card-kinetic.njk" import kineticCard, kineticCardGrid %}

{% call kineticCardGrid() %}
  {% call kineticCard(title="Architecture", img="/img/photo.jpg", link="/about/") %}
    カード本文テキスト
  {% endcall %}
{% endcall %}
```
{% endraw %}

**kineticCard パラメーター:**

| パラメーター | デフォルト | 説明 |
|---|---|---|
| `title` | — | カードタイトル（必須） |
| `img` | `""` | 画像 URL |
| `link` | `""` | クリック先 URL |
| `linkText` | `"詳しく見る →"` | リンクテキスト |
| `dark` | `false` | ダークテーマ |

**Sandbox デモ:** `/interaction/`

---

**前のページ:** [← レイアウトプラグイン](/docs/layout-plugins/) | **[↑ 目次](/docs/)** | **次のページ:** [ボタンプラグイン →](/docs/button-plugins/)
