(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        var searchBars = document.querySelectorAll('[data-search-bar]');
        if (searchBars.length === 0) return;

        function initPagefind(element) {
            if (element.dataset.initialized) return;
            new PagefindUI({
                element: element,
                showSubResults: true,
                translations: {
                    placeholder: 'サイト内検索...',
                    zero_results: '「[SEARCH_TERM]」に一致する結果はありません'
                }
            });
            element.dataset.initialized = 'true';
        }

        // 既にグローバルで PagefindUI が利用可能（もしくはロード中）か簡易チェック
        if (typeof PagefindUI === 'undefined') {
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = '/pagefind/pagefind-ui.css';
            document.head.appendChild(link);

            var script = document.createElement('script');
            script.src = '/pagefind/pagefind-ui.js';
            script.onload = function () {
                searchBars.forEach(function (bar) {
                    initPagefind(bar);
                });
            };
            document.head.appendChild(script);
        } else {
            // 既に読み込まれている場合はそのまま初期化
            searchBars.forEach(function (bar) {
                initPagefind(bar);
            });
        }
    });
})();
