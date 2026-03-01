---
layout: layouts/article.njk
title: "layout-header-nav"
category: "PLUGIN"
lead: "グローバルナビゲーション・ドロワー・トグルボタンの全バリアントを備えたヘッダープラグイン。すべてのパラメータはフロントマターから指定可能。"
navGlobalStyle: "underline"
navDrawerStyle: "circular"
navToggleStyle: "particle"
navTogglePos: "right"
---

## インタラクティブ Playground

全バリアントをセレクトボックスで切り替えてリアルタイムに確認できるデモページを用意しています。

<div style="margin: 1.5rem 0;">
  <a href="/menubar_demo/" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:8px;padding:12px 24px;border:1px solid var(--color-primary);border-radius:8px;color:var(--color-primary);font-family:var(--font-english);font-size:0.85rem;letter-spacing:0.06em;text-decoration:none;transition:background 0.2s,color 0.2s;" onmouseover="this.style.background='var(--color-primary)';this.style.color='#fff'" onmouseout="this.style.background='';this.style.color='var(--color-primary)'">Playground を新しいタブで開く →</a>
</div>

---

## 概要

`layout-header-nav` は AK²Engine のヘッダープラグインです。PC 向けのグローバルナビゲーション、モバイル向けのドロワーメニューとトグルボタンを一括管理します。

`base.njk` からインクルードで自動ロードされるため、個別の呼び出しコードは不要です。各ページのフロントマターでスタイルを切り替えられます。

このページ自体が動作確認のデモです。画面幅 768px 以下にリサイズするとトグルボタンが現れ、ドロワーメニューが開きます。

## フロントマターパラメータ

すべてのパラメータはオプションです。省略するとデフォルト値が適用されます。

### navGlobalStyle — PC グローバルナビ

| 値 | 説明 | デフォルト |
|---|---|---|
| `"underline"` | アクティブ項目に下線インジケーターが追従 | ✓ |
| `"pill"` | アクティブ項目に pill 背景が追従 | |
| `"bracket"` | ホバー時に `[` `]` が出現 | |
| `"shift"` | ホバー時にテキストが上へスライド（アクセントカラーが出現） | |
| `"dot"` | アクティブ項目の上にドットが表示 | |

### navDrawerStyle — モバイルドロワー

| 値 | 説明 | デフォルト |
|---|---|---|
| `"circular"` | トグルボタン起点の円形リビール | ✓ |
| `"slide-down"` | 上から降りてくるスライド | |
| `"slide-up"` | 下から上がるスライド | |
| `"glass"` | グラスモーフィズム + スケールフェード | |

### navToggleStyle — モバイルトグルボタン

| 値 | 説明 | デフォルト |
|---|---|---|
| `"geometric"` | 3本線 → クロスのモーフアニメーション | ✓ |
| `"magnetic"` | カーソルに吸い付く磁力エフェクト | |
| `"liquid"` | SVG Gooey フィルターによる液体合成 | |
| `"particle"` | 粒子が hamburger ↔ クロスに再集合するキネティック演出 | |

### navTogglePos — トグルボタンの配置

| 値 | 説明 | デフォルト |
|---|---|---|
| `"right"` | ブランドロゴ右 / グローバルナビ右端 | ✓ |
| `"left"` | ブランドロゴ左端 / `circular` ドロワーの起点も左上に切り替わる | |

### transparentHeader

| 値 | 説明 |
|---|---|
| `false` | 通常の背景 + backdrop-filter（デフォルト） |
| `true` | ヘッダー背景を透明化（ヒーローと重ねて使用する場合） |

## 使用例

```yaml
---
layout: layouts/base.njk
title: "My Page"
navGlobalStyle: "dot"
navDrawerStyle: "glass"
navToggleStyle: "magnetic"
navTogglePos: "left"
---
```

## CSS カスタムプロパティ

`:root` に以下の変数を上書きすることで色を変更できます。

| 変数 | デフォルト値 | 説明 |
|---|---|---|
| `--nav-bg` | `var(--color-white)` | ヘッダー背景 |
| `--nav-text` | `var(--color-dark)` | ブランド名・アクティブリンク |
| `--nav-sub` | `var(--color-text-light)` | 非アクティブリンク |
| `--nav-accent` | `var(--color-primary)` | インジケーター・ホバー色 |
| `--nav-icon` | `var(--color-dark)` | ハンバーガーアイコン線 |
| `--nav-drawer-bg` | `var(--color-white)` | ドロワー背景 |

## このデモの設定

このページのフロントマターには以下が設定されています。

```yaml
navGlobalStyle: "underline"
navDrawerStyle: "circular"
navToggleStyle: "particle"
navTogglePos: "right"
```
