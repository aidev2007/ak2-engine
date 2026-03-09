---
layout: layouts/base.njk
title: "ブログウィジェット デモ"
navBg: "solid"
sections:
  - type: card-blog-widgets
    widgets:
      - type: blog-archive
        title: "アーカイブ"
        text: "年月別アーカイブナビゲーションを表示します。"
        collection: blogArchiveData
      - type: blog-categories
        title: "カテゴリ"
        text: "カテゴリ一覧と記事件数を表示します。"
        collection: blogCategoryData
      - type: blog-tagcloud
        title: "タグクラウド"
        text: "タグをバッジ形式で一覧表示します。"
        collection: blogTagData
      - type: blog-calendar
        title: "カレンダー"
        text: "月間カレンダーを表示します。<br>記事がある日はリンク付きで表示されます。"
        calendarMonth: "2026/03"
        collection: blog
---
