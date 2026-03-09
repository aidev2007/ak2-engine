---
layout: layouts/base.njk
title: "ブログウィジェット デモ"
navBg: "solid"
sections:
  - type: card-blog-widgets
    widgets:
      - type: blog-archive
        title: "アーカイブ（block-blog-archive）"
        collection: blogArchiveData
      - type: blog-categories
        title: "カテゴリ（block-blog-categories）"
        collection: blogCategoryData
      - type: blog-tagcloud
        title: "タグクラウド（block-blog-tagcloud）"
        collection: blogTagData
      - type: blog-calendar
        title: "カレンダー（block-blog-calendar）"
        calendarMonth: "2026/03"
        collection: blog
---
