/**
 * block-button-stroke.js
 * Stroke Draw Button — GSAP 3
 *
 * Requires: GSAP 3.x（外部からの読み込みが必要）
 *   → front-matter に useGsap: true を設定するか、手動で GSAP を読み込んでください。
 *
 * Nunjucks マクロ経由でのデータ属性による自動初期化:
 *   {% from "block-button-stroke/block-button-stroke.njk" import strokeButton %}
 *   {{ strokeButton("Learn More") }}
 *
 * JS から直接呼び出す場合:
 *   const btn = createStrokeButton("Learn More", { color: "#0d9488", textColor: "#0d9488" });
 *   document.querySelector('.my-container').appendChild(btn);
 */

/**
 * createStrokeButton(text, options)
 *
 * @param {string}  text
 * @param {object}  [options]
 * @param {string}          [options.color]       ホバー時ストローク色              (default: '#111111')
 * @param {string}          [options.textColor]   テキスト色                        (default: '#111111')
 * @param {string}          [options.fontFamily]  フォント                          (default: "'DM Sans', sans-serif")
 * @param {boolean}         [options.float]       浮遊アニメーション                (default: false)
 * @param {boolean}         [options.shadow]      ドロップシャドウ                  (default: false)
 * @param {number}          [options.radius]      角丸 px                           (default: 3)
 * @param {number}          [options.strokeWidth] 線の太さ px                       (default: 1.2)
 * @param {number}          [options.duration]    描画時間 秒                       (default: 0.55)
 * @returns {HTMLElement}
 */
function createStrokeButton(text, options) {
  options = options || {};
  var color       = options.color       || '#111111';
  var textColor   = options.textColor   || '#111111';
  var fontFamily  = options.fontFamily  || "'DM Sans', sans-serif";
  var float_      = options.float       !== undefined ? options.float       : false;
  var shadow      = options.shadow      !== undefined ? options.shadow      : false;
  var radius      = options.radius      !== undefined ? options.radius      : 3;
  var strokeWidth = options.strokeWidth !== undefined ? options.strokeWidth : 1.2;
  var duration    = options.duration    !== undefined ? options.duration    : 0.55;

  /* ── borderColor は color を低透明度で自動生成 ── */
  var h = color.replace('#', '');
  var rr = parseInt(h.slice(0, 2), 16);
  var gg = parseInt(h.slice(2, 4), 16);
  var bb = parseInt(h.slice(4, 6), 16);
  var resolvedBorderColor = 'rgba(' + rr + ',' + gg + ',' + bb + ',0.18)';

  /* ── テキスト幅計測 ── */
  var probe = document.createElement('span');
  Object.assign(probe.style, {
    position: 'absolute', visibility: 'hidden', whiteSpace: 'nowrap',
    fontSize: '13px', fontWeight: '300', letterSpacing: '0.18em',
    textTransform: 'uppercase', fontFamily: fontFamily,
  });
  probe.textContent = text;
  document.body.appendChild(probe);
  var textW = probe.getBoundingClientRect().width;
  document.body.removeChild(probe);

  var padX = 32;
  var W = Math.ceil(textW + padX * 2);
  var H = 46;
  var r = radius;

  /* ── ラッパー ── */
  var wrap = document.createElement('div');
  Object.assign(wrap.style, {
    position: 'relative', display: 'inline-flex',
    alignItems: 'center', justifyContent: 'center',
    width: W + 'px', height: H + 'px',
    cursor: 'pointer', userSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
  });

  /* ── SVG ── */
  var ns  = 'http://www.w3.org/2000/svg';
  var svg = document.createElementNS(ns, 'svg');
  Object.assign(svg.style, {
    position: 'absolute', inset: '0',
    width: '100%', height: '100%',
    overflow: 'visible', pointerEvents: 'none',
  });

  /* 常時表示の薄い枠線 */
  var borderRect = document.createElementNS(ns, 'rect');
  borderRect.setAttribute('x',      strokeWidth / 2);
  borderRect.setAttribute('y',      strokeWidth / 2);
  borderRect.setAttribute('width',  W - strokeWidth);
  borderRect.setAttribute('height', H - strokeWidth);
  borderRect.setAttribute('rx',     r);
  borderRect.setAttribute('ry',     r);
  borderRect.setAttribute('fill',   'none');
  borderRect.setAttribute('stroke', resolvedBorderColor);
  borderRect.setAttribute('stroke-width', strokeWidth);
  svg.appendChild(borderRect);

  /* ストローク描画パス（上辺中央スタートで両方向に伸びる） */
  var cx = W / 2;
  var strokePath = document.createElementNS(ns, 'path');
  var d = [
    'M ' + cx + ' 0',
    'L ' + (W - r) + ' 0',
    'Q ' + W + ' 0 ' + W + ' ' + r,
    'L ' + W + ' ' + (H - r),
    'Q ' + W + ' ' + H + ' ' + (W - r) + ' ' + H,
    'L ' + r + ' ' + H,
    'Q 0 ' + H + ' 0 ' + (H - r),
    'L 0 ' + r,
    'Q 0 0 ' + r + ' 0',
    'L ' + cx + ' 0',
  ].join(' ');

  strokePath.setAttribute('d', d);
  strokePath.setAttribute('fill', 'none');
  strokePath.setAttribute('stroke', color);
  strokePath.setAttribute('stroke-width', strokeWidth);
  strokePath.setAttribute('stroke-linecap', 'round');
  strokePath.setAttribute('stroke-linejoin', 'round');
  svg.appendChild(strokePath);

  /* ── テキスト ── */
  var labelEl = document.createElement('span');
  Object.assign(labelEl.style, {
    position:      'relative', zIndex: '1',
    fontFamily:    fontFamily,
    fontSize:      '13px', fontWeight: '300',
    letterSpacing: '0.18em', textTransform: 'uppercase',
    color:         textColor, whiteSpace: 'nowrap',
    pointerEvents: 'none', willChange: 'transform',
  });
  labelEl.textContent = text;

  wrap.appendChild(svg);
  wrap.appendChild(labelEl);

  /* ── ドロップシャドウ ── */
  if (shadow) {
    wrap.style.boxShadow = '0 2px 12px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)';
  }

  /* ── 浮遊アニメーション ── */
  if (float_) {
    gsap.to(wrap, {
      y: -5, duration: 2.0 + Math.random() * 0.8,
      ease: 'sine.inOut', yoyo: true, repeat: -1,
    });
  }

  /* ── stroke-dashoffset セットアップ（DOM追加後に初期化） ── */
  var pathLen     = 0;
  var initialized = false;

  function init() {
    if (initialized) return;
    initialized = true;
    pathLen = strokePath.getTotalLength();
    gsap.set(strokePath, {
      strokeDasharray:  pathLen,
      strokeDashoffset: pathLen,
    });
  }

  /* ── イベント ── */
  var hovered = false;

  wrap.addEventListener('mouseenter', function () {
    init();
    hovered = true;
    gsap.killTweensOf([strokePath, labelEl]);

    gsap.to(strokePath, { strokeDashoffset: 0, duration: duration, ease: 'power3.inOut' });
    gsap.to(labelEl,    { y: -3, duration: duration * 0.7, ease: 'power2.out' });
  });

  wrap.addEventListener('mouseleave', function () {
    hovered = false;
    gsap.killTweensOf([strokePath, labelEl]);

    gsap.to(strokePath, {
      strokeDashoffset: -pathLen,
      duration:         duration * 0.8,
      ease:             'power3.inOut',
      onComplete: function () {
        gsap.set(strokePath, { strokeDashoffset: pathLen });
      },
    });
    gsap.to(labelEl, { y: 0, duration: duration * 0.5, ease: 'power2.inOut' });
  });

  wrap.addEventListener('mousedown', function () {
    gsap.to(labelEl, { duration: 0.07, opacity: 0.45, ease: 'power2.in' });
  });

  wrap.addEventListener('mouseup', function () {
    gsap.to(labelEl, { duration: 0.25, opacity: 1, ease: 'power2.out' });
  });

  return wrap;
}

window.createStrokeButton = createStrokeButton;

/* ── データ属性による自動初期化 ── */
document.addEventListener('DOMContentLoaded', function () {
  if (typeof gsap === 'undefined') {
    console.warn('[block-button-stroke] GSAP が読み込まれていません。useGsap: true を front-matter に設定してください。');
    return;
  }
  document.querySelectorAll('[data-stroke-btn]').forEach(function (host) {
    var text = host.dataset.text || '';
    var opts = {};
    if (host.dataset.color)       opts.color       = host.dataset.color;
    if (host.dataset.textColor)   opts.textColor   = host.dataset.textColor;
    if (host.dataset.fontFamily)  opts.fontFamily  = host.dataset.fontFamily;
    if (host.dataset.float  !== undefined) opts.float  = host.dataset.float  !== 'false';
    if (host.dataset.shadow !== undefined) opts.shadow = host.dataset.shadow !== 'false';
    if (host.dataset.radius)      opts.radius      = parseFloat(host.dataset.radius);
    if (host.dataset.strokeWidth) opts.strokeWidth = parseFloat(host.dataset.strokeWidth);
    if (host.dataset.duration)    opts.duration    = parseFloat(host.dataset.duration);
    var btn = createStrokeButton(text, opts);
    host.replaceWith(btn);
  });
});
