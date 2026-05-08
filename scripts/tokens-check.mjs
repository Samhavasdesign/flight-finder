import { promises as fs } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import process from "node:process";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "..");
const SRC_DIR = path.join(ROOT, "src");
const TOKENS_JSON_PATH = path.join(ROOT, "src/styles/tokens.json");
const TOKENS_CSS_PATH = path.join(ROOT, "src/styles/tokens.css");
const TOKENS_BRIDGE_CSS_PATH = path.join(ROOT, "src/styles/tokens.bridge.css");

const SOURCE_EXTENSIONS = new Set([
  ".css",
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".mdx",
]);

function flattenTokenTree(node, prefix = []) {
  const leaves = [];

  for (const [key, value] of Object.entries(node)) {
    if (
      value &&
      typeof value === "object" &&
      "value" in value &&
      "type" in value
    ) {
      leaves.push({ path: [...prefix, key], value });
      continue;
    }

    if (value && typeof value === "object") {
      leaves.push(...flattenTokenTree(value, [...prefix, key]));
    }
  }

  return leaves;
}

function tokenToCssVar([group, ...rest]) {
  if (group === "color") {
    if (rest[0] === "semantic" && rest[1] === "light") {
      return `--color-${rest.slice(2).join("-")}`;
    }

    return `--color-${rest.join("-")}`;
  }

  if (group === "space") return `--space-${rest.join("-")}`;
  if (group === "radius") return `--radius-${rest.join("-")}`;
  if (group === "font" && rest[0] === "scale") return `--font-scale-${rest[1]}`;
  if (group === "font" && rest[0] === "family") return `--font-family-${rest[1]}`;

  return null;
}

function extractDeclaredCssVars(contents) {
  const declared = new Set();
  const matcher = /(^|\s)(--[a-z0-9-]+)\s*:/gim;
  for (const match of contents.matchAll(matcher)) {
    declared.add(match[2]);
  }
  return declared;
}

function extractVarUsages(contents) {
  const used = new Set();
  const matcher = /var\(\s*(--[a-z0-9-]+)/gim;
  for (const match of contents.matchAll(matcher)) {
    used.add(match[1]);
  }
  return used;
}

async function walkFiles(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await walkFiles(fullPath)));
      continue;
    }

    if (SOURCE_EXTENSIONS.has(path.extname(entry.name))) {
      out.push(fullPath);
    }
  }

  return out;
}

function filterTokenLikeVariables(vars) {
  return [...vars].filter((name) => {
    if (!/^(--color-|--space-|--radius-|--font-scale-|--font-family-)/.test(name)) {
      return false;
    }

    // Ignore dynamic template fragments like `var(--color-${name})`.
    if (name.endsWith("-")) {
      return false;
    }

    return true;
  });
}

function printList(title, values) {
  console.log(`\n${title} (${values.length})`);
  for (const value of values.slice(0, 25)) {
    console.log(`  - ${value}`);
  }
  if (values.length > 25) {
    console.log(`  ...and ${values.length - 25} more`);
  }
}

async function main() {
  const [tokensJsonRaw, tokensCssRaw, tokensBridgeCssRaw] = await Promise.all([
    fs.readFile(TOKENS_JSON_PATH, "utf8"),
    fs.readFile(TOKENS_CSS_PATH, "utf8"),
    fs.readFile(TOKENS_BRIDGE_CSS_PATH, "utf8"),
  ]);

  const tokens = JSON.parse(tokensJsonRaw);
  const tokenLeaves = flattenTokenTree(tokens);
  const expectedVars = new Set(
    tokenLeaves
      .map(({ path: tokenPath }) => tokenToCssVar(tokenPath))
      .filter(Boolean),
  );

  const declaredVars = new Set([
    ...extractDeclaredCssVars(tokensCssRaw),
    ...extractDeclaredCssVars(tokensBridgeCssRaw),
  ]);

  const sourceFiles = await walkFiles(SRC_DIR);
  const usageMap = new Map();
  for (const sourceFile of sourceFiles) {
    const contents = await fs.readFile(sourceFile, "utf8");
    const varsInFile = filterTokenLikeVariables(extractVarUsages(contents));
    if (varsInFile.length > 0) {
      usageMap.set(sourceFile, varsInFile);
    }
  }

  const usedVars = new Set([...usageMap.values()].flat());

  const missingInCss = [...expectedVars]
    .filter((name) => !declaredVars.has(name))
    .sort();
  const cssWithoutToken = filterTokenLikeVariables(declaredVars)
    .filter((name) => !expectedVars.has(name))
    .sort();
  const usedButUndefined = [...usedVars]
    .filter((name) => !declaredVars.has(name))
    .sort();

  console.log("Token health check");
  console.log("==================");
  console.log(`Expected vars from tokens.json: ${expectedVars.size}`);
  console.log(`Declared vars in tokens.css + bridge: ${declaredVars.size}`);
  console.log(`Token-like vars used in src/: ${usedVars.size}`);

  if (missingInCss.length > 0) {
    printList("Expected from JSON but missing in CSS", missingInCss);
  }
  if (cssWithoutToken.length > 0) {
    printList("Defined in CSS but not found in JSON", cssWithoutToken);
  }
  if (usedButUndefined.length > 0) {
    printList("Used in src/ but not declared in CSS", usedButUndefined);
    console.log("\nFiles with undefined usage:");
    for (const [file, varsInFile] of usageMap.entries()) {
      const unresolved = varsInFile.filter((name) => usedButUndefined.includes(name));
      if (unresolved.length > 0) {
        console.log(`  - ${path.relative(ROOT, file)}: ${unresolved.join(", ")}`);
      }
    }
  }

  if (
    missingInCss.length === 0 &&
    cssWithoutToken.length === 0 &&
    usedButUndefined.length === 0
  ) {
    console.log("\nNo issues found.");
    return;
  }

  process.exitCode = 1;
}

main().catch((error) => {
  console.error("Token check failed:", error);
  process.exit(1);
});
