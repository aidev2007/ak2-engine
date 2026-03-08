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
const { execSync } = require("child_process");
const markdownItAnchor = require("markdown-it-anchor");

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

  // ── Markdown: 見出しにアンカーID を付与 ─────────────────────────────────────
  eleventyConfig.amendLibrary("md", mdLib => {
    mdLib.use(markdownItAnchor, {
      permalink: false,
      slugify: s => s.trim().replace(/\s+/g, "-").replace(/[^\w\u3000-\u9fff\u30a0-\u30ff\u3040-\u309f-]/g, "").toLowerCase()
    });
  });

  // ── Filter: TOC 生成（article.njk から使用）─────────────────────────────────
  eleventyConfig.addFilter("toc", function (content) {
    if (!content) return "";
    const re = /<h([23])[^>]*\sid="([^"]*)"[^>]*>([\s\S]*?)<\/h\1>/g;
    const items = [];
    let m;
    while ((m = re.exec(content)) !== null) {
      const level = parseInt(m[1]);
      const id = m[2];
      const text = m[3].replace(/<[^>]+>/g, "").trim();
      items.push({ level, id, text });
    }
    if (items.length < 2) return "";
    let html = '<nav class="toc" aria-label="目次" data-pagefind-ignore><p class="toc__title">目次</p><ol class="toc__list">';
    for (const item of items) {
      const cls = item.level === 3 ? ' class="toc__item toc__item--sub"' : ' class="toc__item"';
      html += `<li${cls}><a href="#${item.id}" class="toc__link">${item.text}</a></li>`;
    }
    html += "</ol></nav>";
    return html;
  });

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
  // ── Pagefind インデックス自動生成（build モード時のみ） ──────────────────────
  eleventyConfig.on("eleventy.after", async ({ runMode }) => {
    if (runMode === "serve" || runMode === "watch") return;
    try {
      execSync("npx pagefind --site sandbox/_site", { stdio: "inherit" });
    } catch (e) {
      console.error("[Pagefind] Index generation failed:", e.message);
    }
  });

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
