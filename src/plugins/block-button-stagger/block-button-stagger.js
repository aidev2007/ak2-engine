/**
 * block-button-stagger.js
 * Stagger Typography Button — GSAP 3
 *
 * Requires: GSAP 3.x（外部からの読み込みが必要）
 *   → front-matter に useGsap: true を設定するか、手動で GSAP を読み込んでください。
 *
 * Nunjucks マクロ経由でのデータ属性による自動初期化:
 *   {% from "block-button-stagger/block-button-stagger.njk" import staggerButton %}
 *   {{ staggerButton("Get Started") }}
 *
 * JS から直接呼び出す場合:
 *   const btn = createStaggerButton("Get Started", { color: "#4f46e5", staggerDir: "center" });
 *   document.querySelector('.my-container').appendChild(btn);
 */

/**
 * createStaggerButton(text, options)
 *
 * @param {string}  text
 * @param {object}  [options]
 * @param {string}          [options.color]       ボタン背景色                               (default: '#111111')
 * @param {string}          [options.textColor]   テキスト色                                 (default: '#ffffff')
 * @param {string}          [options.fontFamily]  フォント                                   (default: "'Syne', sans-serif")
 * @param {string}          [options.staggerDir]  跳ね方向 'start'|'center'|'end'|'random'   (default: 'start')
 * @param {number}          [options.bounceY]     跳ね上がり量 px（負で上方向）              (default: -4)
 * @param {boolean}         [options.float]       浮遊アニメーション                         (default: false)
 * @param {boolean}         [options.shadow]      ドロップシャドウ                           (default: false)
 * @param {number|'auto'}   [options.radius]      角丸 px（'auto' で高さから自動計算）       (default: 'auto')
 * @returns {HTMLElement}
 */
function createStaggerButton(text, options) {
  options = options || {};
  var color      = options.color      || '#111111';
  var textColor  = options.textColor  || '#ffffff';
  var fontFamily = options.fontFamily || "'Syne', sans-serif";
  var fontSize   = 15;
  var staggerDir = options.staggerDir || 'start';
  var bounceY    = options.bounceY    !== undefined ? options.bounceY    : -4;
  var float_     = options.float      !== undefined ? options.float      : false;
  var shadow     = options.shadow     !== undefined ? options.shadow     : false;
  var radius     = (options.radius !== undefined && options.radius !== 'auto') ? options.radius : null;

  /* ── カラー派生（上端を明るく） ── */
  function hexToHsl(hex) {
    var rv = parseInt(hex.slice(1, 3), 16) / 255,
        gv = parseInt(hex.slice(3, 5), 16) / 255,
        bv = parseInt(hex.slice(5, 7), 16) / 255;
    var max = Math.max(rv, gv, bv), min = Math.min(rv, gv, bv);
    var h, s, l = (max + min) / 2;
    if (max === min) { h = s = 0; }
    else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case rv: h = ((gv - bv) / d + (gv < bv ? 6 : 0)) / 6; break;
        case gv: h = ((bv - rv) / d + 2) / 6; break;
        case bv: h = ((rv - gv) / d + 4) / 6; break;
      }
    }
    return [h * 360, s * 100, l * 100];
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

  var hsl = hexToHsl(color);
  var colorTop = hslToHex(hsl[0], Math.max(hsl[1] - 8, 0), Math.min(hsl[2] + 18, 88));

  /* ── テキスト幅計測 ── */
  var probe = document.createElement('span');
  Object.assign(probe.style, {
    position: 'absolute', visibility: 'hidden', whiteSpace: 'nowrap',
    fontSize: fontSize + 'px', fontWeight: '700', letterSpacing: '0.14em',
    textTransform: 'uppercase', fontFamily: fontFamily,
  });
  probe.textContent = text;
  document.body.appendChild(probe);
  var textW = probe.getBoundingClientRect().width;
  document.body.removeChild(probe);

  var W = Math.ceil(textW + 36 * 2);
  var H = fontSize * 3.2;
  var r = radius !== null ? radius : H * 0.40;

  /* ── ラッパー ── */
  var wrap = document.createElement('div');
  Object.assign(wrap.style, {
    position: 'relative', display: 'inline-flex',
    alignItems: 'center', justifyContent: 'center',
    width: W + 'px', height: H + 'px',
    cursor: 'pointer', userSelect: 'none',
    WebkitTapHighlightColor: 'transparent', flexShrink: '0',
    overflow: 'hidden',
    borderRadius: r + 'px',
  });

  /* ── SVG 背景 ── */
  var ns  = 'http://www.w3.org/2000/svg';
  var uid = Math.random().toString(36).slice(2, 8);

  var svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('width',   W);
  svg.setAttribute('height',  H);
  svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
  Object.assign(svg.style, {
    position: 'absolute', inset: '0',
    overflow: 'visible', pointerEvents: 'none',
  });

  var defs = document.createElementNS(ns, 'defs');
  defs.innerHTML =
    '<linearGradient id="bg-' + uid + '" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%"   stop-color="' + colorTop + '"/>' +
      '<stop offset="100%" stop-color="' + color    + '"/>' +
    '</linearGradient>';
  svg.appendChild(defs);

  var bg = document.createElementNS(ns, 'rect');
  bg.setAttribute('x', 0); bg.setAttribute('y', 0);
  bg.setAttribute('width', W); bg.setAttribute('height', H);
  bg.setAttribute('rx', r); bg.setAttribute('ry', r);
  bg.setAttribute('fill', 'url(#bg-' + uid + ')');
  svg.appendChild(bg);
  wrap.appendChild(svg);

  /* ── シマー要素 ── */
  var shimmer = document.createElement('div');
  var shimW   = W * 0.55;
  Object.assign(shimmer.style, {
    position:   'absolute', top: '0', left: '0',
    width:      shimW + 'px', height: '100%',
    background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.55) 50%, transparent 80%)',
    transform:  'translateX(' + (-shimW - 10) + 'px)',
    pointerEvents: 'none', zIndex: '2', willChange: 'transform',
  });
  wrap.appendChild(shimmer);

  /* ── 文字を1文字ずつ <span> に分解 ── */
  var charWrap = document.createElement('div');
  Object.assign(charWrap.style, {
    position: 'relative', zIndex: '3',
    display: 'flex', alignItems: 'center',
    gap: '0', pointerEvents: 'none',
  });

  var chars = Array.from(text);
  var spans = chars.map(function (ch) {
    var s = document.createElement('span');
    Object.assign(s.style, {
      display: 'inline-block', fontFamily: fontFamily,
      fontSize: fontSize + 'px', fontWeight: '700',
      letterSpacing: '0.14em', textTransform: 'uppercase',
      color: textColor, lineHeight: '1', willChange: 'transform',
    });
    s.textContent = ch === ' ' ? '\u00A0' : ch;
    charWrap.appendChild(s);
    return s;
  });
  wrap.appendChild(charWrap);

  /* ── シマー発火 ── */
  function fireShimmer(fast) {
    gsap.fromTo(shimmer,
      { x: -shimW - 10 },
      { x: W + 10, duration: fast ? 0.38 : 0.60, ease: 'power2.inOut', overwrite: true }
    );
  }

  /* ── ドロップシャドウ ── */
  if (shadow) {
    wrap.style.boxShadow = '0 4px 18px rgba(0,0,0,0.22), 0 2px 5px rgba(0,0,0,0.14)';
  }

  /* ── 浮遊アニメーション ── */
  if (float_) {
    gsap.to(wrap, {
      y: -5, duration: 2.0 + Math.random() * 0.8,
      ease: 'sine.inOut', yoyo: true, repeat: -1,
    });
  }

  /* ── GSAP イベント ── */
  var hovered = false;
  var tl = null;

  wrap.addEventListener('mouseenter', function () {
    hovered = true;
    if (tl) tl.kill();

    tl = gsap.timeline();
    tl.to(spans, {
      y: bounceY, duration: 0.20, ease: 'power2.out',
      stagger: { amount: 0.18, from: staggerDir },
    }).to(spans, {
      y: 0, duration: 0.50, ease: 'elastic.out(1, 0.45)',
      stagger: { amount: 0.18, from: staggerDir },
    }, '-=0.08');

    gsap.timeline()
      .to(bg, {
        attr: { ry: r * 2.5 }, scaleY: 0.91, scaleX: 1.04,
        transformOrigin: (W / 2) + 'px ' + (H / 2) + 'px',
        duration: 0.14, ease: 'power2.in',
      })
      .to(bg, {
        attr: { ry: r }, scaleY: 1, scaleX: 1,
        transformOrigin: (W / 2) + 'px ' + (H / 2) + 'px',
        duration: 0.55, ease: 'elastic.out(1, 0.40)',
      });

    fireShimmer(false);
  });

  wrap.addEventListener('mouseleave', function () {
    hovered = false;
    if (tl) tl.kill();
    gsap.to(spans, {
      y: 0, duration: 0.30, ease: 'power3.out',
      stagger: { amount: 0.10, from: staggerDir },
    });
    gsap.to(bg, {
      attr: { ry: r }, scaleY: 1, scaleX: 1,
      transformOrigin: (W / 2) + 'px ' + (H / 2) + 'px',
      duration: 0.30, ease: 'power2.out',
    });
  });

  wrap.addEventListener('mousedown', function () {
    gsap.to(spans, {
      scaleY: 0.7, scaleX: 1.1, y: 4, duration: 0.08,
      ease: 'power3.in', stagger: { amount: 0.06, from: 'center' },
    });
    gsap.to(bg, {
      scaleY: 0.93, scaleX: 1.04,
      transformOrigin: (W / 2) + 'px ' + (H / 2) + 'px',
      duration: 0.08, ease: 'power3.in',
    });
  });

  wrap.addEventListener('mouseup', function () {
    gsap.to(spans, {
      scaleY: 1, scaleX: 1, y: 0, duration: 0.55,
      ease: 'elastic.out(1.2, 0.38)',
      stagger: { amount: 0.10, from: 'center' },
    });
    gsap.to(bg, {
      scaleY: 1, scaleX: 1,
      transformOrigin: (W / 2) + 'px ' + (H / 2) + 'px',
      duration: 0.50, ease: 'elastic.out(1, 0.40)',
    });
    fireShimmer(true);
  });

  return wrap;
}

window.createStaggerButton = createStaggerButton;

/* ── データ属性による自動初期化 ── */
document.addEventListener('DOMContentLoaded', function () {
  if (typeof gsap === 'undefined') {
    console.warn('[block-button-stagger] GSAP が読み込まれていません。useGsap: true を front-matter に設定してください。');
    return;
  }
  document.querySelectorAll('[data-stagger-btn]').forEach(function (host) {
    var text = host.dataset.text || '';
    var opts = {};
    if (host.dataset.color)      opts.color      = host.dataset.color;
    if (host.dataset.textColor)  opts.textColor  = host.dataset.textColor;
    if (host.dataset.fontFamily) opts.fontFamily = host.dataset.fontFamily;
    if (host.dataset.staggerDir) opts.staggerDir = host.dataset.staggerDir;
    if (host.dataset.bounceY)    opts.bounceY    = parseFloat(host.dataset.bounceY);
    if (host.dataset.float  !== undefined) opts.float  = host.dataset.float  !== 'false';
    if (host.dataset.shadow !== undefined) opts.shadow = host.dataset.shadow !== 'false';
    if (host.dataset.radius && host.dataset.radius !== 'auto') opts.radius = parseFloat(host.dataset.radius);
    var btn = createStaggerButton(text, opts);
    host.replaceWith(btn);
  });
});
