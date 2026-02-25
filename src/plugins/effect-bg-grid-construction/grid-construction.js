/**
 * AK²-Engine / effects/grid-construction.js
 * ==========================================
 * グリッド構築オープニングアニメーション
 *
 * フェーズ1（building ~2秒）:
 *  - 横スキャンラインが上から下へ移動（シアングロー帯）
 *  - 水平線はスキャン通過後に出現
 *  - 垂直線は進捗10%以降、左から右へ順次出現
 * フェーズ2（idle）:
 *  - グリッド全体を環境光強度で点灯（常時表示）
 *
 * イベント:
 *  - 'ak2:grid-ready' を document に dispatch（フェーズ1完了時）
 */
class GridConstruction {

  /** @type {number} */
  #w = 0;

  /** @type {number} */
  #h = 0;

  /** @type {number} 描画進捗 0.0〜1.0 */
  #progress = 0;

  /** @type {number} 1秒あたりの進捗量（0.5 → 約2秒で完了） */
  #speed = 0.5;

  /** @type {'building'|'idle'} */
  #phase = 'building';

  /** @type {boolean} */
  #dispatched = false;

  /** @type {number} グリッド間隔（px） */
  #gridSize = 60;

  // ── AK²Engine インターフェイス ─────────────────

  /**
   * @param {HTMLCanvasElement} canvas
   * @param {CanvasRenderingContext2D} _ctx
   */
  init(canvas, _ctx) {
    this.#w          = canvas.width;
    this.#h          = canvas.height;
    this.#progress   = 0;
    this.#phase      = 'building';
    this.#dispatched = false;
  }

  onResize(w, h) {
    this.#w = w;
    this.#h = h;
  }

  /**
   * @param {number} dt - 前フレームからの経過ミリ秒
   */
  update(dt) {
    if (this.#phase === 'building') {
      this.#progress = Math.min(1.0, this.#progress + (dt / 1000) * this.#speed);

      if (this.#progress >= 1.0 && !this.#dispatched) {
        this.#dispatched = true;
        this.#phase      = 'idle';
        document.dispatchEvent(new CustomEvent('ak2:grid-ready'));
      }
    }
    // idle フェーズは何もしない（常時グリッド表示）
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    const w = this.#w;
    const h = this.#h;
    const g = this.#gridSize;

    if (this.#phase === 'building') {
      this.#drawBuilding(ctx, w, h, g);
    } else {
      this.#drawIdle(ctx, w, h, g);
    }
  }

  // ── 内部描画 ──────────────────────────────────────

  #drawBuilding(ctx, w, h, g) {
    const scanY = this.#progress * h;

    // 垂直線の進捗: progress が 10% を超えてから開始
    const vProg     = Math.max(0, (this.#progress - 0.1) / 0.9);
    const cols      = Math.ceil(w / g);
    const colsDrawn = Math.floor(cols * vProg);

    ctx.lineWidth = 1;

    // 水平線（スキャン通過済みの行）
    ctx.strokeStyle = 'rgba(100, 160, 220, 0.12)';
    ctx.beginPath();
    for (let j = 0; j * g <= scanY; j++) {
      ctx.moveTo(0, j * g);
      ctx.lineTo(w, j * g);
    }
    ctx.stroke();

    // 垂直線（左から右へ順次出現）
    if (colsDrawn > 0) {
      ctx.strokeStyle = 'rgba(100, 160, 220, 0.08)';
      ctx.beginPath();
      for (let i = 0; i <= colsDrawn; i++) {
        ctx.moveTo(i * g, 0);
        ctx.lineTo(i * g, Math.min(scanY, h));
      }
      ctx.stroke();
    }

    // スキャングロー（シアン帯）
    if (scanY > 0) {
      const top = Math.max(0, scanY - 40);
      const grd = ctx.createLinearGradient(0, top, 0, scanY + 8);
      grd.addColorStop(0, 'rgba(0, 198, 255, 0)');
      grd.addColorStop(0.6, 'rgba(0, 198, 255, 0.12)');
      grd.addColorStop(1, 'rgba(0, 198, 255, 0.35)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, top, w, scanY - top + 8);

      // スキャンライン本体（明るい細線）
      ctx.strokeStyle = 'rgba(0, 198, 255, 0.85)';
      ctx.lineWidth   = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(w, scanY);
      ctx.stroke();
    }
  }

  #drawIdle(ctx, w, h, g) {
    ctx.strokeStyle = 'rgba(100, 160, 220, 0.10)';
    ctx.lineWidth   = 1;
    ctx.beginPath();

    const cols = Math.ceil(w / g);
    const rows = Math.ceil(h / g);

    for (let i = 0; i <= cols; i++) {
      ctx.moveTo(i * g, 0);
      ctx.lineTo(i * g, h);
    }
    for (let j = 0; j <= rows; j++) {
      ctx.moveTo(0, j * g);
      ctx.lineTo(w, j * g);
    }

    ctx.stroke();
  }
}

// AK²Engine に登録
window.GridConstruction = GridConstruction;
