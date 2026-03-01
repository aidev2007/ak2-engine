/**
 * block-card-kinetic.js
 * キネティック 3D ティルトカード
 *
 * Nunjucks マクロ経由で自動初期化:
 *   {% from "block-card-kinetic/block-card-kinetic.njk" import kineticCard, kineticCardGrid %}
 *   {% call kineticCard(title="Title", img="/img/photo.jpg") %}本文{% endcall %}
 *
 * - ホバーで 3D ティルト + グレア (光の反射) + パララックス画像
 * - タッチデバイスは自動スキップ
 */

(function () {
  'use strict';

  function KineticCard(el) {
    this.el      = el;
    this.content = el.querySelector('.ak2-kinetic-card__content');
    this.glare   = el.querySelector('.ak2-kinetic-card__glare');
    this.rect    = null;

    var self = this;
    el.addEventListener('mouseenter', function ()  { self._onEnter(); });
    el.addEventListener('mousemove',  function (e) { self._onMove(e); });
    el.addEventListener('mouseleave', function ()  { self._onLeave(); });
  }

  KineticCard.prototype._onEnter = function () {
    this.rect = this.el.getBoundingClientRect();
    /* ホバー中はスムーズな transition を切る（JS で直接制御するため） */
    this.el.style.transition      = 'box-shadow 0.3s ease';
    if (this.content) this.content.style.transition = 'none';
    if (this.glare)   this.glare.style.opacity = '1';
    this.el.style.boxShadow = '0 24px 60px rgba(0, 0, 0, 0.15)';
  };

  KineticCard.prototype._onMove = function (e) {
    if (!this.rect) return;
    var x = e.clientX - this.rect.left;
    var y = e.clientY - this.rect.top;

    /* 中心基準の正規化座標 (-1 〜 1) */
    var px = (x / this.rect.width)  * 2 - 1;
    var py = (y / this.rect.height) * 2 - 1;

    var maxRot = 15; /* 最大傾き角度 (deg) */
    this.el.style.transform =
      'perspective(1000px) rotateX(' + (-py * maxRot) + 'deg) rotateY(' + (px * maxRot) + 'deg) scale3d(1.02, 1.02, 1.02)';

    /* コンテンツをさらに浮き上がらせる */
    if (this.content) {
      this.content.style.transform =
        'translateZ(50px) translateX(' + (px * 10) + 'px) translateY(' + (py * 10) + 'px)';
    }

    /* グレア（光）の移動 */
    if (this.glare) {
      var gX = (x / this.rect.width)  * 100;
      var gY = (y / this.rect.height) * 100;
      this.glare.style.transform =
        'translate(-50%, -50%) translate(' + gX + '%, ' + gY + '%)';
    }
  };

  KineticCard.prototype._onLeave = function () {
    var t = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
    this.el.style.transition = t + ', box-shadow 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
    if (this.content) this.content.style.transition = t;

    this.el.style.transform  = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    this.el.style.boxShadow  = '';
    if (this.content) this.content.style.transform = 'translateZ(40px)';
    if (this.glare) {
      this.glare.style.opacity   = '0';
      this.glare.style.transform = 'translate(-50%, -50%)';
    }
  };

  /* ── 自動初期化 ──────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    /* タッチ専用デバイスは 3D ティルトをスキップ */
    if (window.matchMedia('(hover: none)').matches) return;

    document.querySelectorAll('[data-kinetic-card]').forEach(function (el) {
      new KineticCard(el);
    });
  });

})();
