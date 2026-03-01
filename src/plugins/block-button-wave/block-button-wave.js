/**
 * block-button-wave.js
 * SVG ウェーブ遷移ボタン
 *
 * Nunjucks マクロ経由で自動初期化:
 *   {% from "block-button-wave/block-button-wave.njk" import waveButton %}
 *   {{ waveButton("次のページへ", "/about/") }}
 *
 * クリックで画面下から波が上昇し、href へ遷移します。
 * href が "#" の場合はアニメーションのみ再生してリセットします（デモ）。
 */

(function () {
  'use strict';

  var overlayEl = null;
  var svgEl     = null;
  var pathEl    = null;
  var isRunning = false;

  /* ── CSS カラー文字列を解決する ──────────────────────────── */
  function resolveColor(colorStr) {
    if (!colorStr || !colorStr.includes('var(')) return colorStr || '';
    var tmp = document.createElement('div');
    tmp.style.color = colorStr;
    document.body.appendChild(tmp);
    var resolved = getComputedStyle(tmp).color;
    document.body.removeChild(tmp);
    return (resolved === 'rgba(0, 0, 0, 0)') ? '' : resolved;
  }

  /* ── オーバーレイを1度だけ生成 ──────────────────────────── */
  function ensureOverlay() {
    if (overlayEl) return;
    var ns   = 'http://www.w3.org/2000/svg';
    overlayEl = document.createElement('div');
    overlayEl.className = 'ak2-wave-overlay';
    svgEl = document.createElementNS(ns, 'svg');
    svgEl.setAttribute('preserveAspectRatio', 'none');
    pathEl = document.createElementNS(ns, 'path');
    pathEl.setAttribute('d', '');
    svgEl.appendChild(pathEl);
    overlayEl.appendChild(svgEl);
    document.body.appendChild(overlayEl);
  }

  /* ── パス計算 ────────────────────────────────────────────── */
  /* 進入 (progress: 0 → 1): 下から波が上昇して全画面を覆う */
  function getPathIn(progress) {
    var ease  = 1 - Math.pow(1 - progress, 3);
    var baseY = 100 - 100 * ease;
    var waveH = Math.sin(progress * Math.PI) * 20;
    return (
      'M 0 100 L 0 ' + baseY +
      ' Q 25 ' + (baseY - waveH) + ' 50 ' + baseY +
      ' T 100 ' + baseY + ' L 100 100 Z'
    );
  }

  /* 退出 (progress: 1 → 2): 上から波が下降して画面が現れる */
  function getPathOut(progress) {
    var outProg = progress - 1;
    var ease    = outProg * outProg;
    var topY    = 100 * ease;
    var waveH   = Math.sin(outProg * Math.PI) * 20;
    return (
      'M 0 0 L 0 ' + topY +
      ' Q 25 ' + (topY + waveH) + ' 50 ' + topY +
      ' T 100 ' + topY + ' L 100 0 Z'
    );
  }

  /* ── アニメーション本体 ──────────────────────────────────── */
  function trigger(href, color) {
    if (isRunning) return;
    isRunning = true;

    ensureOverlay();
    svgEl.setAttribute('viewBox', '0 0 100 100');
    pathEl.setAttribute('fill', resolveColor(color) || '#007bff');
    pathEl.setAttribute('d', '');

    var progress = 0;
    var SPEED    = 0.022;

    function animateIn() {
      progress += SPEED;
      if (progress > 1) progress = 1;
      pathEl.setAttribute('d', getPathIn(progress));
      if (progress < 1) {
        requestAnimationFrame(animateIn);
      } else {
        /* 全画面を覆った → 遷移 or デモ復帰 */
        if (href && href !== '#') {
          setTimeout(function () { window.location.href = href; }, 50);
        } else {
          setTimeout(animateOut, 400);
        }
      }
    }

    function animateOut() {
      progress += SPEED;
      if (progress > 2) progress = 2;
      pathEl.setAttribute('d', getPathOut(progress));
      if (progress < 2) {
        requestAnimationFrame(animateOut);
      } else {
        pathEl.setAttribute('d', '');
        isRunning = false;
      }
    }

    requestAnimationFrame(animateIn);
  }

  /* ── 自動初期化 ──────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-wave-btn]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        trigger(btn.dataset.href || '#', btn.dataset.waveColor || '');
      });
    });
  });

})();
