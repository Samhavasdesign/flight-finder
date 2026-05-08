import { promises as fs } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import process from "node:process";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "..");
const COMPONENTS_DIR = path.join(ROOT, "src/components");

function toPascalCase(input) {
  const cleaned = input
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (!cleaned) return "";

  return cleaned
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join("");
}

function parseArgs(argv) {
  const args = argv.slice(2);
  const force = args.includes("--force");
  const help = args.includes("--help") || args.includes("-h");
  const name = args.find((arg) => !arg.startsWith("-"));
  return { force, help, name };
}

function usage() {
  console.log(`Usage:
  npm run component:new -- ComponentName
  npm run component:new -- component-name
  npm run component:new -- MyComponent --force

What it creates:
  src/components/<ComponentName>/<ComponentName>.tsx
  src/components/<ComponentName>/<ComponentName>.module.css
  src/components/<ComponentName>/<ComponentName>.stories.tsx
  src/components/<ComponentName>/index.ts`);
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function componentTsxTemplate(componentName) {
  return `import React from 'react';
import styles from './${componentName}.module.css';

export interface ${componentName}Props {
  children?: React.ReactNode;
}

export const ${componentName}: React.FC<${componentName}Props> = ({ children = '${componentName}' }) => {
  return <div className={styles.root}>{children}</div>;
};

export default ${componentName};
`;
}

function componentCssTemplate() {
  return `.root {
  display: inline-flex;
}
`;
}

function componentStoriesTemplate(componentName) {
  return `import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ${componentName} } from "./${componentName}";

const meta = {
  title: "Components/${componentName}",
  component: ${componentName},
  args: {
    children: "${componentName}",
  },
} satisfies Meta<typeof ${componentName}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
`;
}

function componentIndexTemplate(componentName) {
  return `export { ${componentName}, default } from './${componentName}';
export type { ${componentName}Props } from './${componentName}';
`;
}

async function main() {
  const { force, help, name } = parseArgs(process.argv);

  if (help || !name) {
    usage();
    process.exit(help ? 0 : 1);
  }

  const componentName = toPascalCase(name);
  if (!componentName) {
    console.error("Invalid component name.");
    usage();
    process.exit(1);
  }

  const componentDir = path.join(COMPONENTS_DIR, componentName);
  const files = [
    {
      filePath: path.join(componentDir, `${componentName}.tsx`),
      contents: componentTsxTemplate(componentName),
    },
    {
      filePath: path.join(componentDir, `${componentName}.module.css`),
      contents: componentCssTemplate(),
    },
    {
      filePath: path.join(componentDir, `${componentName}.stories.tsx`),
      contents: componentStoriesTemplate(componentName),
    },
    {
      filePath: path.join(componentDir, "index.ts"),
      contents: componentIndexTemplate(componentName),
    },
  ];

  await fs.mkdir(componentDir, { recursive: true });

  if (!force) {
    const existing = [];
    for (const { filePath } of files) {
      if (await fileExists(filePath)) {
        existing.push(path.relative(ROOT, filePath));
      }
    }

    if (existing.length > 0) {
      console.error("Aborted: files already exist:");
      for (const item of existing) {
        console.error(`  - ${item}`);
      }
      console.error("Re-run with --force to overwrite.");
      process.exit(1);
    }
  }

  for (const { filePath, contents } of files) {
    await fs.writeFile(filePath, contents, "utf8");
    console.log(`Created ${path.relative(ROOT, filePath)}`);
  }
}

main().catch((error) => {
  console.error("Failed to create component:", error);
  process.exit(1);
});
