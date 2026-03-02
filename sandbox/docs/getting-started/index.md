---
layout: layouts/base.njk
title: "クイックスタート"
navBg: "solid"
sections:
  - type: article
    category: "AK²ENGINE DOCS"
    title: "クイックスタート"
    lead: "プロジェクト構成・Eleventyセットアップ・初期設定のガイドです。"
---

[← 目次に戻る](/docs/)

---

## 1. インストール

### 将来：npm パッケージとして

{% raw %}
```json
{
  "dependencies": {
    "@ak2lab/engine": "^0.1.3"
  }
}
```
{% endraw %}

### 現在：ローカルパスを使用

{% raw %}
```json
{
  "dependencies": {
    "@ak2lab/engine": "file:../ak2-engine"
  }
}
```
{% endraw %}

または `create-ak2-site` スキャフォールドを使用してください（推奨）。

---

## 2. ディレクトリ構成

新しいサイトプロジェクトの推奨ディレクトリ構成です。

```
my-site/
├── src/
│   ├── _data/
│   │   ├── site.json          # サイトメタデータ（必須）
│   │   ├── nav.json           # ナビゲーション（必須）
│   │   └── effectClasses.json # エフェクトキー→クラス名マッピング（必須）
│   ├── _includes/
│   │   └── layouts/
│   │       └── base.njk       # ベースレイアウト（サイト固有）
│   ├── index.md               # トップページ
│   └── site.css               # サイト固有CSS
├── .eleventy.js
└── package.json
```

---

## 3. 起動コマンド

| コマンド | 説明 |
|---|---|
| `npm run start:sandbox` | Sandboxの開発サーバー起動（`http://localhost:8080/`） |
| `npm run build:sandbox` | Sandboxのプロダクションビルド（`sandbox/_site/` に出力） |

コードを保存すると **自動でブラウザがリロード** されます（chokidar + WebSocket + morphdom）。

---

## 4. Sandbox テストページ一覧

| URL | 内容 |
|---|---|
| `/` | Sandbox インデックス |
| `/effects/` | 背景エフェクト動作確認 |
| `/blocks/` | ブロックプラグイン動作確認 |
| `/layout/` | レイアウトプラグイン動作確認 |
| `/buttons/` | ボタンプラグイン動作確認（GSAP必須） |
| `/menubar/` | layout-header-nav 全バリアント確認 |
| `/concept/` | article.njk レイアウトのデモ |
| `/interaction/` | カーソル・カード・ウェーブボタン確認 |
| `/docs/` | このドキュメント |

---

## 5. 最初のページを作る

### 最もシンプルなページ（Markdownのみ）

{% raw %}
```markdown
---
layout: layouts/base.njk
title: "ホーム"
---

# ようこそ

ここに本文を書きます。
```
{% endraw %}

### YAMLセクションを使ったランディングページ

詳しくは [YAMLセクション アーキテクチャ](/docs/yaml-sections/) を参照してください。

{% raw %}
```yaml
---
layout: layouts/base.njk
title: "ホーム"
navBg: "solid"
sections:
  - type: hero
    subtitle: "WELCOME"
    title: "サイト名"
    lead: "サイトの説明文。"
    effects:
      - SnowEffect

  - type: feature-grid
    heading: "MENU"
    subheading: "メニュー"
    items:
      - num: "01"
        title: "サービス"
        desc: "サービスの説明"
        href: "/service/"
---
```
{% endraw %}

---

**[↑ 目次](/docs/)** | **次のページ:** [データスキーマ →](/docs/data-schema/)
