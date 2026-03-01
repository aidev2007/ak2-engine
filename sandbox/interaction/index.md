---
layout: layouts/base.njk
title: Interaction Test
navBg: "solid"
---
{% from "components/macros.njk" import sectionHeader %}
{% from "effect-cursor-magnetic/effect-cursor-magnetic.njk" import cursorMagnetic %}
{% from "layout-hero-particle/layout-hero-particle.njk" import heroParticle %}
{% from "block-card-kinetic/block-card-kinetic.njk" import kineticCard, kineticCardGrid %}
{% from "block-button-wave/block-button-wave.njk" import waveButton %}

{{ cursorMagnetic() }}

{{ heroParticle(
  text="INTERACTION",
  subtitle="AK² Engine Plugin",
  fontSize="12vw",
  height="100vh",
  bg="#0b0b0f"
) }}

<section class="section section--white">
  <div class="container">
    {{ sectionHeader("effect-cursor-magnetic", "カスタムカーソル + 磁力エフェクト") }}
    <p class="sb-lead">
      <code>data-cursor-area</code> を付与したセクション内でのみカスタムカーソルが有効になります。<br>
      <code>data-magnetic</code> を付与した要素はカーソルに向かって吸い付きます。
    </p>
    <div class="sb-demo-area" data-cursor-area style="min-height:200px; border:1px dashed var(--color-primary); border-radius:12px; display:flex; align-items:center; justify-content:center; gap:40px; padding:40px; background:color-mix(in srgb, var(--color-primary) 4%, transparent);">
      <button class="sb-mag-btn" data-magnetic type="button">Magnetic</button>
      <button class="sb-mag-btn" data-magnetic type="button">Button</button>
      <span style="font-size:0.8rem; color:var(--color-text-light);">← このエリア内でカーソルが変化します</span>
    </div>
    <p class="sb-note">上のエリア外ではカーソルは通常に戻ります。</p>
    <h3 class="sb-param-title">パラメーター一覧</h3>
    <div class="sb-table-wrap">
      <table class="sb-param-table sb-param-table--light">
        <thead><tr><th>属性</th><th>対象</th><th>説明</th></tr></thead>
        <tbody>
          <tr><td>data-cursor-area</td><td>セクション／コンテナ要素</td><td>このエリア内でカスタムカーソルを有効化</td></tr>
          <tr><td>data-magnetic</td><td>任意のインライン要素</td><td>カーソルに吸い付く磁力エフェクトを付与</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<section class="section section--dark">
  <div class="container">
    {{ sectionHeader("layout-hero-particle", "テキストパーティクル ヒーロー", true) }}
    <p class="sb-desc--muted">
      テキストをパーティクル化して表示するヒーローセクション。<br>
      マウスを近づけると粒子が反発し、離れると元の形に戻ります。<br>
      上部の「INTERACTION」テキストがこのプラグインのデモです。
    </p>
  </div>
</section>

{{ heroParticle(
  text="DESIGN",
  subtitle="KINETIC PARTICLE DEMO",
  color="var(--color-primary)",
  fontSize="18vw",
  fontWeight="900",
  height="60vh",
  bg="#07070a"
) }}

<section class="section section--white">
  <div class="container" style="margin-top: 0; padding-top: 0;">
    <h3 class="sb-param-title" style="margin-top: 2rem;">パラメーター一覧</h3>
    <div class="sb-table-wrap">
      <table class="sb-param-table sb-param-table--light">
        <thead>
          <tr><th>パラメーター</th><th>型</th><th>デフォルト</th><th>説明</th></tr>
        </thead>
        <tbody>
          <tr><td>text</td><td>string</td><td>—</td><td>パーティクル化するテキスト（必須）</td></tr>
          <tr><td>subtitle</td><td>string</td><td>""</td><td>上部の小見出し英字テキスト</td></tr>
          <tr><td>color</td><td>string</td><td>""</td><td>パーティクル色（空欄で --color-primary を使用）</td></tr>
          <tr><td>fontSize</td><td>string</td><td>"15vw"</td><td>テキストサイズ（vw / px / em 可）</td></tr>
          <tr><td>fontWeight</td><td>string</td><td>"700"</td><td>フォントウェイト</td></tr>
          <tr><td>fontFamily</td><td>string</td><td>""</td><td>フォントファミリー（省略で CSS 継承）</td></tr>
          <tr><td>height</td><td>string</td><td>"100vh"</td><td>セクション高さ</td></tr>
          <tr><td>bg</td><td>string</td><td>"#0b0b0f"</td><td>背景色</td></tr>
          <tr><td>id</td><td>string</td><td>"main"</td><td>同一ページに複数配置する場合に一意な値を指定</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<section class="section section--white">
  <div class="container">
    {{ sectionHeader("block-card-kinetic", "キネティック 3D ティルトカード") }}
    <p class="sb-lead">
      ホバーすると 3D ティルト、グレア（光の反射）、パララックス画像が動作します。<br>
      <code>dark</code> パラメーターでダークテーマにも対応。
    </p>
    {% call kineticCardGrid() %}
      {% call kineticCard(
        title="Architecture",
        img="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop",
        link="#"
      ) %}
        複雑な状態管理をシンプルなクラスにカプセル化し、堅牢で拡張性の高いフロントエンド基盤を構築します。
      {% endcall %}
      {% call kineticCard(
        title="Motion Design",
        img="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
        link="#"
      ) %}
        物理演算に基づいた自然なイージングと、残像効果を用いた視覚的なフィードバックを実装します。
      {% endcall %}
      {% call kineticCard(
        title="Performance",
        img="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
        link="#"
      ) %}
        不要な DOM 操作を避け、Canvas を活用した GPU アクセラレーションで 60fps の体験を提供します。
      {% endcall %}
    {% endcall %}
    <h3 class="sb-param-title">パラメーター一覧</h3>
    <div class="sb-table-wrap">
      <table class="sb-param-table sb-param-table--light">
        <thead>
          <tr><th>パラメーター</th><th>型</th><th>デフォルト</th><th>説明</th></tr>
        </thead>
        <tbody>
          <tr><td>title</td><td>string</td><td>—</td><td>カードタイトル（必須）</td></tr>
          <tr><td>img</td><td>string</td><td>""</td><td>画像 URL（省略時は画像なし）</td></tr>
          <tr><td>imgAlt</td><td>string</td><td>title と同値</td><td>画像 alt テキスト</td></tr>
          <tr><td>link</td><td>string</td><td>""</td><td>クリック先 URL（省略時はリンクなし）</td></tr>
          <tr><td>linkText</td><td>string</td><td>"詳しく見る →"</td><td>リンクテキスト</td></tr>
          <tr><td>dark</td><td>boolean</td><td>false</td><td>ダークテーマ</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<section class="section section--dark">
  <div class="container" style="text-align: center;">
    {{ sectionHeader("block-button-wave", "SVG ウェーブ遷移ボタン", true) }}
    <p class="sb-desc--muted">
      クリックすると波形 SVG が画面を覆い、href へ遷移します。<br>
      href が <code>#</code> の場合はアニメーションのみ再生してリセットします（デモ用）。
    </p>
    <div class="sb-btn-row sb-btn-row--center" style="margin-top: 2rem; justify-content: center;">
      {{ waveButton("デモを再生する（#）", "#") }}
      {{ waveButton("別ページへ遷移", "/", color="var(--color-primary)", textColor="var(--color-primary)") }}
    </div>
    <h3 class="sb-param-title" style="margin-top: 3rem;">パラメーター一覧</h3>
    <div class="sb-table-wrap">
      <table class="sb-param-table sb-param-table--warm">
        <thead>
          <tr><th>パラメーター</th><th>型</th><th>デフォルト</th><th>説明</th></tr>
        </thead>
        <tbody>
          <tr><td>text</td><td>string</td><td>—</td><td>ボタンラベル（必須）</td></tr>
          <tr><td>href</td><td>string</td><td>"#"</td><td>遷移先 URL（"#" でデモモード）</td></tr>
          <tr><td>color</td><td>string</td><td>"var(--color-primary)"</td><td>ウェーブの色</td></tr>
          <tr><td>textColor</td><td>string</td><td>"var(--color-primary)"</td><td>ボタンテキスト色</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<style>
  .sb-mag-btn {
    padding: 14px 32px;
    border: 1.5px solid var(--color-primary);
    border-radius: 30px;
    background: transparent;
    color: var(--color-primary);
    font-size: 0.9rem;
    letter-spacing: 0.08em;
    cursor: none;
    transition: background 0.3s, color 0.3s;
  }
  .sb-mag-btn:hover { background: var(--color-primary); color: #fff; }
  .sb-note { font-size: 0.82rem; color: var(--color-text-light); margin-top: 12px; }
</style>
