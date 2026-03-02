/**
 * block-button-liquid.js
 * GSAP Liquid Morphing Button
 *
 * Requires: GSAP 3.x（外部からの読み込みが必要）
 *   → front-matter に useGsap: true を設定するか、手動で GSAP を読み込んでください。
 *
 * Nunjucks マクロ経由でのデータ属性による自動初期化:
 *   {% from "block-button-liquid/block-button-liquid.njk" import liquidButton %}
 *   {{ liquidButton("Get Started") }}
 *
 * JS から直接呼び出す場合:
 *   const btn = createLiquidButton("Get Started", { color: "#0d9488" });
 *   document.querySelector('.my-container').appendChild(btn);
 */

/**
 * createLiquidButton(text, options)
 *
 * @param {string}  text
 * @param {object}  [options]
 * @param {string}          [options.color]       ボタン色 hex                      (default: '#5046e5')
 * @param {string}          [options.textColor]   テキスト色 hex                    (default: '#ffffff')
 * @param {string}          [options.fontFamily]  フォントファミリー                (default: "'Outfit', sans-serif")
 * @param {boolean}         [options.float]       浮遊アニメーション                (default: true)
 * @param {boolean}         [options.shadow]      ドロップシャドウ                  (default: true)
 * @param {number|'auto'}   [options.radius]      角丸 px（'auto' で高さから自動計算）(default: 'auto')
 * @returns {HTMLButtonElement}
 */
function createLiquidButton(text, options) {
  options = options || {};
  var color      = options.color      || '#5046e5';
  var textColor  = options.textColor  || '#ffffff';
  var fontFamily = options.fontFamily || "'Outfit', sans-serif";
  var float_     = options.float  !== undefined ? options.float  : true;
  var shadow     = options.shadow !== undefined ? options.shadow : true;
  var radius     = (options.radius !== undefined && options.radius !== 'auto') ? options.radius : null;

  /* ── カラー派生 ── */
  function hexToHsl(h) {
    var r = parseInt(h.slice(1, 3), 16) / 255,
        g = parseInt(h.slice(3, 5), 16) / 255,
        b = parseInt(h.slice(5, 7), 16) / 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var hh, s, l = (max + min) / 2;
    if (max === min) { hh = s = 0; }
    else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: hh = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: hh = ((b - r) / d + 2) / 6; break;
        case b: hh = ((r - g) / d + 4) / 6; break;
      }
    }
    return [hh * 360, s * 100, l * 100];
  }
  function hslToHex(h, s, l) {
    h /= 360; s /= 100; l /= 100;
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
    var f = function (t) {
      if (t < 0) t += 1; if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 0.5) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    var rv, gv, bv;
    if (s === 0) { rv = gv = bv = l; }
    else { rv = f(h + 1/3); gv = f(h); bv = f(h - 1/3); }
    return '#' + [rv, gv, bv].map(function (x) {
      return Math.round(x * 255).toString(16).padStart(2, '0');
    }).join('');
  }

  var hsl    = hexToHsl(color);
  var bH = hsl[0], bS = hsl[1], bL = hsl[2];
  var cLight = hslToHex(bH, Math.min(bS + 4, 100), Math.min(bL + 20, 82));
  var cDark  = hslToHex(bH, Math.min(bS + 8, 100), Math.max(bL - 12, 8));
  var cGlow  = hslToHex(bH, Math.min(bS + 8, 100), Math.min(bL + 28, 88));

  /* ── テキスト幅計測 ── */
  var probe = document.createElement('span');
  Object.assign(probe.style, {
    position: 'absolute', visibility: 'hidden', whiteSpace: 'nowrap',
    fontSize: '13.5px', fontWeight: '700', letterSpacing: '0.10em',
    textTransform: 'uppercase', fontFamily: fontFamily,
  });
  probe.textContent = text;
  document.body.appendChild(probe);
  var textW = probe.getBoundingClientRect().width;
  document.body.removeChild(probe);

  var W = Math.ceil(textW + 72);
  var H = 52;
  var r = (radius !== null) ? radius : H / 2;
  var k = 0.5523;

  function makePath(xR, xL) {
    xR = xR || 0; xL = xL || 0;
    return [
      'M ' + r + ' 0',
      'C ' + (r + (W - 2*r)*0.33) + ' 0  ' + (r + (W - 2*r)*0.67) + ' 0  ' + (W - r) + ' 0',
      'C ' + (W - r + r*k + xR*k) + ' 0   ' + (W + xR) + ' ' + (r - r*k) + '   ' + (W + xR) + ' ' + r,
      'C ' + (W + xR) + ' ' + (r + r*k) + '   ' + (W - r + r*k + xR*k) + ' ' + H + '  ' + (W - r) + ' ' + H,
      'C ' + (r + (W - 2*r)*0.67) + ' ' + H + '  ' + (r + (W - 2*r)*0.33) + ' ' + H + '  ' + r + ' ' + H,
      'C ' + (r - r*k - xL*k) + ' ' + H + '   ' + (-xL) + ' ' + (r + r*k) + '   ' + (-xL) + ' ' + r,
      'C ' + (-xL) + ' ' + (r - r*k) + '   ' + (r - r*k - xL*k) + ' 0  ' + r + ' 0',
      'Z',
    ].join(' ');
  }

  var pNormal = makePath(0, 0);
  var pSquish = makePath(-3, -3);
  var pBounce = makePath(11, 9);
  var pHover  = makePath(4.5, 3.5);

  /* ── SVG 構築 ── */
  var ns  = 'http://www.w3.org/2000/svg';
  var uid = Math.random().toString(36).slice(2, 9);

  var btn = document.createElement('button');
  btn.className = 'liquid-btn';
  btn.setAttribute('aria-label', text);

  var svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('width',   W);
  svg.setAttribute('height',  H);
  svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
  svg.style.overflow = 'visible';

  var shadowFilter = shadow ? (
    '<filter id="ds-' + uid + '" x="-30%" y="-40%" width="160%" height="200%">' +
      '<feGaussianBlur in="SourceAlpha" stdDeviation="2" result="b1"/>' +
      '<feOffset in="b1" dy="2" result="o1"/>' +
      '<feFlood flood-color="rgba(0,0,0,0.18)" result="c1"/>' +
      '<feComposite in="c1" in2="o1" operator="in" result="s1"/>' +
      '<feGaussianBlur in="SourceAlpha" stdDeviation="10" result="b2"/>' +
      '<feOffset in="b2" dy="7" result="o2"/>' +
      '<feFlood flood-color="rgba(0,0,0,0.10)" result="c2"/>' +
      '<feComposite in="c2" in2="o2" operator="in" result="s2"/>' +
      '<feMerge>' +
        '<feMergeNode in="s2"/>' +
        '<feMergeNode in="s1"/>' +
        '<feMergeNode in="SourceGraphic"/>' +
      '</feMerge>' +
    '</filter>'
  ) : '';

  var defs = document.createElementNS(ns, 'defs');
  defs.innerHTML =
    '<radialGradient id="gn-' + uid + '" cx="38%" cy="28%" r="72%" gradientUnits="objectBoundingBox">' +
      '<stop offset="0%"   stop-color="' + cLight + '"/>' +
      '<stop offset="52%"  stop-color="' + color  + '"/>' +
      '<stop offset="100%" stop-color="' + cDark  + '"/>' +
    '</radialGradient>' +
    '<radialGradient id="gh-' + uid + '" cx="38%" cy="22%" r="68%" gradientUnits="objectBoundingBox">' +
      '<stop offset="0%"   stop-color="' + cGlow  + '"/>' +
      '<stop offset="50%"  stop-color="' + cLight + '"/>' +
      '<stop offset="100%" stop-color="' + color  + '"/>' +
    '</radialGradient>' +
    '<clipPath id="cp-' + uid + '">' +
      '<path id="cpp-' + uid + '" d="' + pNormal + '"/>' +
    '</clipPath>' +
    '<filter id="sf-' + uid + '" x="-30%" y="-30%" width="160%" height="160%">' +
      '<feGaussianBlur stdDeviation="' + (H * 0.11) + '"/>' +
    '</filter>' +
    shadowFilter;
  svg.appendChild(defs);

  var mainPath = document.createElementNS(ns, 'path');
  mainPath.setAttribute('d', pNormal);
  mainPath.setAttribute('fill', 'url(#gn-' + uid + ')');
  if (shadow) mainPath.setAttribute('filter', 'url(#ds-' + uid + ')');
  svg.appendChild(mainPath);

  var sheenG = document.createElementNS(ns, 'g');
  sheenG.setAttribute('clip-path', 'url(#cp-' + uid + ')');
  var sheen = document.createElementNS(ns, 'ellipse');
  sheen.setAttribute('cx',   W * 0.42);
  sheen.setAttribute('cy',   H * 0.15);
  sheen.setAttribute('rx',   W * 0.44);
  sheen.setAttribute('ry',   H * 0.30);
  sheen.setAttribute('fill', 'white');
  sheen.setAttribute('opacity', '0.20');
  sheen.setAttribute('filter', 'url(#sf-' + uid + ')');
  sheenG.appendChild(sheen);
  svg.appendChild(sheenG);

  var label = document.createElement('span');
  label.className = 'btn-text';
  label.textContent = text;
  label.style.fontFamily = fontFamily;
  label.style.color = textColor;

  btn.appendChild(svg);
  btn.appendChild(label);

  /* ── clipPath 同期 ── */
  var clipEl = svg.querySelector('#cpp-' + uid);
  var syncClip = function (d) { if (clipEl) clipEl.setAttribute('d', d); };

  /* ── GSAP アニメーション ── */
  var gNormal = 'url(#gn-' + uid + ')';
  var gHover  = 'url(#gh-' + uid + ')';
  var hovered = false;

  gsap.from(btn, {
    duration: 0.65, scale: 0.5, opacity: 0,
    ease: 'elastic.out(1, 0.52)', delay: Math.random() * 0.25,
  });

  if (float_) {
    gsap.to(btn, {
      y: -5, duration: 2.0 + Math.random() * 0.8,
      ease: 'sine.inOut', yoyo: true, repeat: -1,
    });
  }

  btn.addEventListener('mouseenter', function () {
    hovered = true;
    gsap.killTweensOf(mainPath);
    gsap.timeline()
      .to(mainPath, {
        duration: 0.09, attr: { d: pSquish }, ease: 'power2.in',
        onUpdate: function () { syncClip(mainPath.getAttribute('d')); },
      })
      .to(mainPath, {
        duration: 0.60, attr: { d: pBounce }, ease: 'elastic.out(1, 0.30)',
        onUpdate: function () { syncClip(mainPath.getAttribute('d')); },
      })
      .to(mainPath, {
        duration: 0.45, attr: { d: pHover }, ease: 'elastic.out(1, 0.50)',
        onUpdate: function () { syncClip(mainPath.getAttribute('d')); },
      }, '-=0.25');
    gsap.to(mainPath, { duration: 0.25, fill: gHover, ease: 'power2.out' });
    gsap.to(sheen,    { duration: 0.25, attr: { opacity: 0.28 }, ease: 'power2.out' });
    gsap.to(label,    { duration: 0.30, y: -1.5, scale: 1.03, ease: 'elastic.out(1, 0.45)' });
  });

  btn.addEventListener('mouseleave', function () {
    hovered = false;
    gsap.killTweensOf(mainPath);
    gsap.killTweensOf(label);
    gsap.to(mainPath, {
      duration: 0.55, attr: { d: pNormal }, ease: 'elastic.out(1, 0.42)',
      onUpdate:   function () { syncClip(mainPath.getAttribute('d')); },
      onComplete: function () { syncClip(pNormal); },
    });
    gsap.to(mainPath, { duration: 0.28, fill: gNormal, ease: 'power2.out' });
    gsap.to(sheen,    { duration: 0.28, attr: { opacity: 0.20 }, ease: 'power2.out' });
    gsap.to(label,    { duration: 0.25, y: 0, scale: 1, ease: 'power2.out' });
  });

  btn.addEventListener('mousedown', function () {
    gsap.killTweensOf(mainPath);
    gsap.to(mainPath, {
      duration: 0.07, scaleX: 0.91, scaleY: 0.87,
      transformOrigin: (W / 2) + 'px ' + (H / 2) + 'px',
      ease: 'power3.in',
    });
    gsap.to(label, { duration: 0.07, scale: 0.92, ease: 'power3.in' });
  });

  btn.addEventListener('mouseup', function () {
    gsap.to(mainPath, { duration: 0.60, scaleX: 1, scaleY: 1, ease: 'elastic.out(1.2, 0.36)' });
    gsap.to(label, {
      duration: 0.48,
      scale: hovered ? 1.03 : 1,
      y:     hovered ? -1.5 : 0,
      ease: 'elastic.out(1, 0.45)',
    });
  });

  return btn;
}

window.createLiquidButton = createLiquidButton;

/* ── データ属性による自動初期化 ── */
document.addEventListener('DOMContentLoaded', function () {
  if (typeof gsap === 'undefined') {
    console.warn('[block-button-liquid] GSAP が読み込まれていません。useGsap: true を front-matter に設定してください。');
    return;
  }
  document.querySelectorAll('[data-liquid-btn]').forEach(function (host) {
    var text = host.dataset.text || '';
    var opts = {};
    if (host.dataset.color)      opts.color      = host.dataset.color;
    if (host.dataset.textColor)  opts.textColor  = host.dataset.textColor;
    if (host.dataset.fontFamily) opts.fontFamily = host.dataset.fontFamily;
    if (host.dataset.float  !== undefined) opts.float  = host.dataset.float  !== 'false';
    if (host.dataset.shadow !== undefined) opts.shadow = host.dataset.shadow !== 'false';
    if (host.dataset.radius && host.dataset.radius !== 'auto') opts.radius = parseFloat(host.dataset.radius);
    var btn = createLiquidButton(text, opts);
    host.replaceWith(btn);
  });
});
