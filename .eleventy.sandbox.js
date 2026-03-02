/**
 * .eleventy.sandbox.js
 * @ak2lab/engine — Sandbox テスト環境設定
 *
 * 用途: エンジン・プラグインの単体動作確認
 * 起動: npm run start:sandbox
 * 出力: sandbox/_site/
 */

const Nunjucks = require("nunjucks");
const fs = require("fs");
const path = require("path");

/** src/ 配下の CSS を再帰収集 */
function getAllCssFiles(dir) {
  let files = [];
  try {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        files = files.concat(getAllCssFiles(fullPath));
      } else if (item.name.endsWith(".css")) {
        files.push(fullPath);
      }
    }
  } catch (e) { /* ignore */ }
  return files;
}

/** src/ 配下の JS を再帰収集 */
function getAllJsFiles(dir) {
  let files = [];
  try {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        files = files.concat(getAllJsFiles(fullPath));
      } else if (item.name.endsWith(".js")) {
        files.push(fullPath);
      }
    }
  } catch (e) { /* ignore */ }
  return files;
}

/** core-engine.js を先頭に保証するバンドル順序 */
const JS_CORE_FIRST = [
  path.join("src", "core", "core-engine.js"),
];

module.exports = function (eleventyConfig) {

  // ── Nunjucks: sandbox/_includes + src/plugins + src/includes を検索パスに追加 ──
  const nunjucksEnv = new Nunjucks.Environment([
    new Nunjucks.FileSystemLoader("sandbox/_includes"),
    new Nunjucks.FileSystemLoader("src/plugins"),
    new Nunjucks.FileSystemLoader("src/includes"),
  ], {
    throwOnUndefined: false,
    autoescape: true,
    trimBlocks: true,   // ← ★これを追加
    lstripBlocks: true  // ← ★これを追加
  });
  eleventyConfig.setLibrary("njk", nunjucksEnv);

  // ── CSS/JS バンドル ──────────────────────────────────────────────────────────
  eleventyConfig.on("eleventy.before", async () => {

    // CSS: src/base.css + src/core/*.css + src/plugins/**/*.css
    const baseCss = fs.existsSync("src/base.css")
      ? fs.readFileSync("src/base.css", "utf8")
      : "";
    const coreCssFiles = getAllCssFiles("src/core").sort();
    const pluginCssFiles = getAllCssFiles("src/plugins").sort();
    const allCssFiles = [...coreCssFiles, ...pluginCssFiles];
    const pluginCss = allCssFiles
      .map(f => `/* ${path.relative("src", f).replace(/\\/g, "/")} */\n` + fs.readFileSync(f, "utf8"))
      .join("\n");
    const sandboxCss = fs.existsSync("sandbox/sandbox.css")
      ? "\n/* sandbox/sandbox.css */\n" + fs.readFileSync("sandbox/sandbox.css", "utf8")
      : "";
    fs.mkdirSync("sandbox/_site/css", { recursive: true });
    fs.writeFileSync("sandbox/_site/css/style.css", baseCss + "\n" + pluginCss + sandboxCss);
    console.log(`[CSS] sandbox/_site/css/style.css (${allCssFiles.length} plugin files)`);

    // JS: core-engine.js 先頭 + src/core/*.js + src/plugins/**/*.js
    const coreJsFiles = getAllJsFiles("src/core");
    const pluginJsFiles = getAllJsFiles("src/plugins");
    const allJsFiles = [...coreJsFiles, ...pluginJsFiles];
    const coreFirstResolved = JS_CORE_FIRST.map(f => path.resolve(f));
    const rest = allJsFiles
      .filter(f => !coreFirstResolved.includes(path.resolve(f)))
      .sort();
    const orderedJs = [
      ...JS_CORE_FIRST.filter(f => fs.existsSync(f)),
      ...rest,
    ];
    const bundleJs = orderedJs
      .map(f => `/* ${path.relative("src", f).replace(/\\/g, "/")} */\n` + fs.readFileSync(f, "utf8"))
      .join("\n");
    fs.mkdirSync("sandbox/_site/js", { recursive: true });
    fs.writeFileSync("sandbox/_site/js/site.js", bundleJs);
    console.log(`[JS]  sandbox/_site/js/site.js (${orderedJs.length} files)`);
  });

  // ── Transform: 連続空行を削除 ─────────────────────────────────────────────
  eleventyConfig.addTransform("removeBlankLines", function (content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      return content.replace(/(\r?\n){2,}/g, "\n");
    }
    return content;
  });

  eleventyConfig.setServerOptions({ port: 8080 });

  return {
    templateFormats: ["njk", "html", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",

    dir: {
      input: "sandbox",
      output: "sandbox/_site",
      includes: "_includes",
      data: "_data",
    },
  };
};
