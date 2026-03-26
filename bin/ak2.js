#!/usr/bin/env node
/**
 * ak2 CLI — レシピ・エフェクトの管理ツール
 *
 * 使い方:
 *   npx ak2 add hero-basic BgEffectSnow   — レシピ/エフェクトを追加
 *   npx ak2 list                          — 利用可能なレシピ一覧
 *   npx ak2 list effects                  — 利用可能なエフェクト一覧
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

// レジストリの読み込み（ローカル優先 → npm パッケージ内）
function loadRegistry() {
  const localPath = path.resolve("registry.json");
  if (fs.existsSync(localPath)) {
    return JSON.parse(fs.readFileSync(localPath, "utf8"));
  }
  const pkgPath = path.join(path.dirname(__dirname), "registry.json");
  if (fs.existsSync(pkgPath)) {
    return JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  }
  // npm パッケージとしてインストールされている場合
  try {
    const engineRoot = path.dirname(require.resolve("@ak2lab/engine/package.json"));
    const engineRegistry = path.join(engineRoot, "registry.json");
    if (fs.existsSync(engineRegistry)) {
      return JSON.parse(fs.readFileSync(engineRegistry, "utf8"));
    }
  } catch (_) {}
  console.error("registry.json が見つかりません。");
  process.exit(1);
}

// GitHub からファイルをダウンロード
function download(url) {
  return new Promise((resolve, reject) => {
    const get = (u) => {
      https.get(u, { headers: { "User-Agent": "ak2-cli" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          get(res.headers.location);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}: ${u}`));
          return;
        }
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(data));
      }).on("error", reject);
    };
    get(url);
  });
}

// プロジェクトのディレクトリを検出
function detectDirs() {
  // src/_sections/ があればそこ、なければ _sections/
  const candidates = ["src/_sections", "_sections"];
  let sectionsDir = null;
  for (const c of candidates) {
    if (fs.existsSync(c)) { sectionsDir = c; break; }
  }
  if (!sectionsDir) {
    // 初回は作成
    sectionsDir = fs.existsSync("src") ? "src/_sections" : "_sections";
  }

  const effectsCandidates = ["src/_effects", "_effects"];
  let effectsDir = null;
  for (const c of effectsCandidates) {
    if (fs.existsSync(c)) { effectsDir = c; break; }
  }
  if (!effectsDir) {
    effectsDir = fs.existsSync("src") ? "src/_effects" : "_effects";
  }

  return { sectionsDir, effectsDir };
}

// ── コマンド: list ──
function cmdList(args) {
  const registry = loadRegistry();
  const target = args[0];

  if (!target || target === "sections" || target === "recipes") {
    console.log("\n  セクションレシピ一覧:\n");
    for (const [name, info] of Object.entries(registry.sections)) {
      console.log(`    ${name.padEnd(20)} ${info.description}`);
    }
  }

  if (!target || target === "effects") {
    console.log("\n  エフェクト一覧:\n");
    for (const [name, info] of Object.entries(registry.effects)) {
      console.log(`    ${name.padEnd(28)} ${info.description}`);
    }
  }

  console.log("");
}

// ── コマンド: add ──
async function cmdAdd(names) {
  if (names.length === 0) {
    console.log("追加するレシピ名またはエフェクト名を指定してください。");
    console.log("例: npx ak2 add hero-basic BgEffectSnow");
    process.exit(1);
  }

  const registry = loadRegistry();
  const { sectionsDir, effectsDir } = detectDirs();
  const repoBase = registry.repo;

  for (const name of names) {
    // セクションかエフェクトかを判定
    const sectionInfo = registry.sections[name];
    const effectInfo = registry.effects[name];

    if (!sectionInfo && !effectInfo) {
      console.log(`  ✗ "${name}" はレジストリに見つかりません。`);
      continue;
    }

    if (sectionInfo) {
      fs.mkdirSync(sectionsDir, { recursive: true });
      for (const file of sectionInfo.files) {
        const destPath = path.join(sectionsDir, file);
        if (fs.existsSync(destPath)) {
          console.log(`  ⊘ ${destPath} は既に存在します（スキップ）`);
          continue;
        }
        try {
          const url = `${repoBase}/sections/${name}/${file}`;
          const content = await download(url);
          fs.writeFileSync(destPath, content, "utf8");
          console.log(`  ✓ ${destPath}`);
        } catch (e) {
          // GitHub から取得できない場合、ローカル（エンジン内）からコピー
          const localSrc = findLocalFile("_sections", file) || findLocalFile("sandbox/_sections", file);
          if (localSrc) {
            fs.copyFileSync(localSrc, destPath);
            console.log(`  ✓ ${destPath} (ローカル)`);
          } else {
            console.log(`  ✗ ${file} のダウンロードに失敗: ${e.message}`);
          }
        }
      }
    }

    if (effectInfo) {
      fs.mkdirSync(effectsDir, { recursive: true });
      for (const file of effectInfo.files) {
        const destPath = path.join(effectsDir, file);
        if (fs.existsSync(destPath)) {
          console.log(`  ⊘ ${destPath} は既に存在します（スキップ）`);
          continue;
        }
        try {
          const url = `${repoBase}/effects/${name}/${file}`;
          const content = await download(url);
          fs.writeFileSync(destPath, content, "utf8");
          console.log(`  ✓ ${destPath}`);
        } catch (e) {
          const localSrc = findLocalFile("_effects", file) || findLocalFile("sandbox/_effects", file);
          if (localSrc) {
            fs.copyFileSync(localSrc, destPath);
            console.log(`  ✓ ${destPath} (ローカル)`);
          } else {
            console.log(`  ✗ ${file} のダウンロードに失敗: ${e.message}`);
          }
        }
      }
    }
  }
  console.log("\n完了。");
}

// ローカルのエンジンパッケージ内からファイルを探す
function findLocalFile(subdir, filename) {
  // カレントディレクトリ内
  const local = path.resolve(subdir, filename);
  if (fs.existsSync(local)) return local;
  // CLI 自身のディレクトリ基準（直接実行時）
  const cliRoot = path.dirname(__dirname);
  const cliFile = path.join(cliRoot, subdir, filename);
  if (fs.existsSync(cliFile)) return cliFile;
  const cliSandbox = path.join(cliRoot, "sandbox", subdir, filename);
  if (fs.existsSync(cliSandbox)) return cliSandbox;
  // npm パッケージ内
  try {
    const engineRoot = path.dirname(require.resolve("@ak2lab/engine/package.json"));
    const pkgFile = path.join(engineRoot, subdir, filename);
    if (fs.existsSync(pkgFile)) return pkgFile;
    const pkgSandbox = path.join(engineRoot, "sandbox", subdir, filename);
    if (fs.existsSync(pkgSandbox)) return pkgSandbox;
  } catch (_) {}
  return null;
}

// ── メイン ──
const [, , cmd, ...args] = process.argv;

switch (cmd) {
  case "list":
  case "ls":
    cmdList(args);
    break;
  case "add":
    cmdAdd(args).catch((e) => {
      console.error("エラー:", e.message);
      process.exit(1);
    });
    break;
  case "help":
  case "--help":
  case "-h":
  case undefined:
    console.log(`
  AK²Engine CLI

  使い方:
    npx ak2 <コマンド> [引数]

  コマンド:
    add <名前...>       レシピやエフェクトをプロジェクトに追加
    list [sections|effects]  利用可能なレシピ・エフェクト一覧
    help                このヘルプを表示

  例:
    npx ak2 add hero-basic cta-basic BgEffectSnow
    npx ak2 list
    npx ak2 list effects
`);
    break;
  default:
    console.log(`不明なコマンド: ${cmd}\nnpx ak2 help でヘルプを表示します。`);
    process.exit(1);
}
