---
layout: layouts/base.njk
title: "Eleventy 設定"
navBg: "solid"
sections:
  - type: article
    doc_group: "AK²ENGINE DOCS"
    title: "Eleventy 設定"
    lead: "店舗サイトの .eleventy.js サンプルと各設定項目の解説です。"
---

[← 目次に戻る](/docs/)

---

## .eleventy.js サンプル

{% raw %}
```javascript
const Nunjucks = require("nunjucks");
const fs = require("fs");
const path = require("path");
const enginePath = "../ak2-engine/src"; // ローカルパス使用時

function getAllCssFiles(dir) {
  let files = [];
  try {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) files = files.concat(getAllCssFiles(fullPath));
      else if (item.name.endsWith(".css")) files.push(fullPath);
    }
  } catch (e) {}
  return files;
}

function getAllJsFiles(dir) {
  let files = [];
  try {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) files = files.concat(getAllJsFiles(fullPath));
      else if (item.name.endsWith(".js")) files.push(fullPath);
    }
  } catch (e) {}
  return files;
}

module.exports = function(eleventyConfig) {
  // Nunjucks: サイトの _includes + エンジンの plugins/includes を両方参照
  const nunjucksEnv = new Nunjucks.Environment([
    new Nunjucks.FileSystemLoader("src/_includes"),
    new Nunjucks.FileSystemLoader(path.join(enginePath, "plugins")),
    new Nunjucks.FileSystemLoader(path.join(enginePath, "includes")),
  ], {
    throwOnUndefined: false,
    autoescape: true,
    trimBlocks: true,    // .md + Nunjucks 混在時のレイアウト崩れ防止に必須
    lstripBlocks: true   // 同上
  });
  eleventyConfig.setLibrary("njk", nunjucksEnv);

  // CSS/JS バンドル
  eleventyConfig.on("eleventy.before", async () => {
    // CSS: エンジンbase.css → core → plugins → サイト固有CSS の順に結合
    const engineBaseCss = fs.readFileSync(path.join(enginePath, "base.css"), "utf8");
    const engineCoreCss = getAllCssFiles(path.join(enginePath, "core")).sort();
    const enginePluginCss = getAllCssFiles(path.join(enginePath, "plugins")).sort();
    const siteCss = fs.existsSync("src/site.css") ? fs.readFileSync("src/site.css", "utf8") : "";

    const allCss = [
      engineBaseCss,
      ...engineCoreCss.map(f => fs.readFileSync(f, "utf8")),
      ...enginePluginCss.map(f => fs.readFileSync(f, "utf8")),
      siteCss,
    ].join("\n");
    fs.mkdirSync("_site/css", { recursive: true });
    fs.writeFileSync("_site/css/style.css", allCss);

    // JS: core-engine.js 先頭固定 → core → plugins の順に結合
    const coreFirst = path.join(enginePath, "core", "core-engine.js");
    const coreJs = getAllJsFiles(path.join(enginePath, "core"));
    const pluginJs = getAllJsFiles(path.join(enginePath, "plugins"));
    const rest = [...coreJs, ...pluginJs]
      .filter(f => path.resolve(f) !== path.resolve(coreFirst))
      .sort();
    const ordered = [coreFirst, ...rest];
    const bundleJs = ordered.map(f => fs.readFileSync(f, "utf8")).join("\n");
    fs.mkdirSync("_site/js", { recursive: true });
    fs.writeFileSync("_site/js/site.js", bundleJs);
  });

  // HTML 空白行の削除
  eleventyConfig.addTransform("removeBlankLines", (content, outputPath) => {
    if (outputPath?.endsWith(".html")) return content.replace(/(\r?\n){2,}/g, "\n");
    return content;
  });

  // 日付フォーマットフィルター
  eleventyConfig.addFilter("dateISO", (date) => new Date(date).toISOString().slice(0, 10));

  return {
    templateFormats: ["njk", "html", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk", // .md 内で Nunjucks マクロを使うために必須
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
  };
};
```
{% endraw %}

---

## 重要な設定ポイント

### trimBlocks / lstripBlocks

Nunjucks の `trimBlocks: true` と `lstripBlocks: true` は **`.md` ファイル内でマクロを使う場合に必須** です。これらを省略すると、マクロ出力に余分な空行が発生し、Markdown パーサーが後続の HTML 要素を `<p>` タグで誤包囲してレイアウトが崩れます。

### markdownTemplateEngine: "njk"

`.md` ファイル内で Nunjucks マクロを展開させるために必須です。これにより Nunjucks → Markdown の順で処理されます。

### CSS/JS バンドルの順序

| 順序 | ファイル | 説明 |
|---|---|---|
| 1 | `src/base.css` | CSSリセット・変数・ユーティリティ |
| 2 | `src/core/*.css` | AK²Engine コアスタイル |
| 3 | `src/plugins/**/*.css` | 全プラグインスタイル |
| 4 | `src/site.css` | **サイト固有スタイル（ここに追記）** |

| 順序 | ファイル | 説明 |
|---|---|---|
| 1 | `src/core/core-engine.js` | AK²Engine 本体（必ず先頭） |
| 2 | `src/core/*.js` | コアユーティリティ |
| 3 | `src/plugins/**/*.js` | 全プラグインJS |

---

**前のページ:** [← エフェクトプラグイン](/docs/effect-plugins/) | **[↑ 目次](/docs/)** | **次のページ:** [CSSカスタマイズ →](/docs/css-customization/)
