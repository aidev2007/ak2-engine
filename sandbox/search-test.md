---
layout: layouts/base.njk
title: "検索テスト"
navBg: "solid"
sections:
  - type: article
    doc_group: "テスト"
    title: "Pagefind 検索テスト"
    lead: "Pagefind Default UI の動作検証ページ"
  - type: content
---

<link href="/pagefind/pagefind-ui.css" rel="stylesheet">
<script src="/pagefind/pagefind-ui.js"></script>
<div id="search"></div>
<script>
  window.addEventListener('DOMContentLoaded', function () {
    new PagefindUI({
      element: '#search',
      showSubResults: true,
      translations: {
        placeholder: 'サイト内検索...',
        zero_results: '「[SEARCH_TERM]」に一致する結果はありません'
      }
    });
  });
</script>
