import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import tokens from "@/styles/tokens.json";
import type { CSSProperties } from "react";

type TokenLeaf = { value: string | number; type: string };

function flattenTokenTree(
  node: Record<string, unknown>,
  prefix: string[] = [],
): Array<{ name: string; leaf: TokenLeaf }> {
  const results: Array<{ name: string; leaf: TokenLeaf }> = [];

  for (const [key, value] of Object.entries(node)) {
    if (
      value &&
      typeof value === "object" &&
      "value" in value &&
      "type" in value
    ) {
      results.push({
        name: [...prefix, key].join("-"),
        leaf: value as TokenLeaf,
      });
      continue;
    }

    if (value && typeof value === "object") {
      results.push(
        ...flattenTokenTree(value as Record<string, unknown>, [...prefix, key]),
      );
    }
  }

  return results;
}

const colorTokens = flattenTokenTree(tokens.color as Record<string, unknown>);
const spacingTokens = flattenTokenTree(tokens.space as Record<string, unknown>);
const radiusTokens = flattenTokenTree(tokens.radius as Record<string, unknown>);
const fontScaleTokens = flattenTokenTree(tokens.font.scale as Record<string, unknown>);
const fontWeightTokens = flattenTokenTree(
  tokens.font.weight as Record<string, unknown>,
);

const meta = {
  title: "Foundations/Design Tokens",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Design token reference sourced from `src/styles/tokens.json` and rendered with CSS variables from `src/styles/tokens.css`.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function sectionTitleStyles(): CSSProperties {
  return {
    margin: 0,
    fontFamily: "var(--font-family-sans)",
    fontSize: "var(--font-scale-04)",
    color: "var(--color-text-default-default)",
  };
}

function labelStyles(): CSSProperties {
  return {
    margin: 0,
    fontFamily: "var(--font-family-mono, monospace)",
    fontSize: "12px",
    color: "var(--color-text-default-default)",
  };
}

function pageStyles(): CSSProperties {
  return {
    minHeight: "100vh",
    padding: "24px",
    background: "var(--color-background-default-secondary)",
    color: "var(--color-text-default-default)",
    display: "grid",
    gap: "32px",
  };
}

function ColorTokensSection() {
  return (
    <section style={{ display: "grid", gap: "16px" }}>
      <h2 style={sectionTitleStyles()}>Color Tokens</h2>
      <div
        style={{
          display: "grid",
          gap: "12px",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        }}
      >
        {colorTokens.map(({ name, leaf }) => (
          <div
            key={name}
            style={{
              border: "1px solid var(--color-border-default-default)",
              background: "var(--color-background-default-default)",
              padding: "12px",
              display: "grid",
              gap: "8px",
            }}
          >
            <div
              style={{
                height: "48px",
                border: "1px solid var(--color-border-default-default)",
                background: `var(--color-${name}, ${String(leaf.value)})`,
              }}
            />
            <p style={labelStyles()}>{`--color-${name}`}</p>
            <p style={{ ...labelStyles(), opacity: 0.7 }}>{String(leaf.value)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SpacingTokensSection() {
  return (
    <section style={{ display: "grid", gap: "16px" }}>
      <h2 style={sectionTitleStyles()}>Spacing Tokens</h2>
      <div style={{ display: "grid", gap: "10px" }}>
        {spacingTokens.map(({ name, leaf }) => (
          <div
            key={name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "8px 0",
            }}
          >
            <p style={{ ...labelStyles(), minWidth: "120px" }}>{`--space-${name}`}</p>
            <div
              style={{
                height: "12px",
                width: `var(--space-${name}, ${String(leaf.value)})`,
                background: "var(--color-background-brand-default)",
              }}
            />
            <p style={{ ...labelStyles(), opacity: 0.7 }}>{String(leaf.value)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function RadiusTokensSection() {
  return (
    <section style={{ display: "grid", gap: "16px" }}>
      <h2 style={sectionTitleStyles()}>Radius Tokens</h2>
      <div
        style={{
          display: "grid",
          gap: "12px",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        }}
      >
        {radiusTokens.map(({ name, leaf }) => (
          <div
            key={name}
            style={{
              border: "1px solid var(--color-border-default-default)",
              background: "var(--color-background-default-default)",
              padding: "12px",
              display: "grid",
              gap: "8px",
            }}
          >
            <div
              style={{
                width: "96px",
                height: "48px",
                borderRadius: `var(--radius-${name}, ${String(leaf.value)})`,
                background: "var(--color-background-brand-default)",
              }}
            />
            <p style={labelStyles()}>{`--radius-${name}`}</p>
            <p style={{ ...labelStyles(), opacity: 0.7 }}>{String(leaf.value)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function TypographyTokensSection() {
  return (
    <section style={{ display: "grid", gap: "16px" }}>
      <h2 style={sectionTitleStyles()}>Typography Tokens</h2>
      <div style={{ display: "grid", gap: "10px" }}>
        {fontScaleTokens.map(({ name, leaf }) => (
          <div
            key={name}
            style={{
              border: "1px solid var(--color-border-default-default)",
              background: "var(--color-background-default-default)",
              padding: "12px",
              display: "grid",
              gap: "8px",
            }}
          >
            <p style={{ ...labelStyles(), opacity: 0.7 }}>{`--font-scale-${name}`}</p>
            <p
              style={{
                margin: 0,
                fontFamily: "var(--font-family-sans)",
                fontSize: `var(--font-scale-${name}, ${String(leaf.value)})`,
                color: "var(--color-text-default-default)",
              }}
            >
              The quick brown fox jumps over the lazy dog.
            </p>
            <p style={{ ...labelStyles(), opacity: 0.7 }}>{String(leaf.value)}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gap: "10px" }}>
        {fontWeightTokens.map(({ name, leaf }) => (
          <div
            key={name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "8px 0",
            }}
          >
            <p style={{ ...labelStyles(), minWidth: "140px" }}>{`font-${name}`}</p>
            <p
              style={{
                margin: 0,
                fontFamily: "var(--font-family-sans)",
                fontWeight: Number(leaf.value),
              }}
            >
              Aa
            </p>
            <p style={{ ...labelStyles(), opacity: 0.7 }}>{String(leaf.value)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export const All: Story = {
  render: () => (
    <div style={pageStyles()}>
      <ColorTokensSection />
      <SpacingTokensSection />
      <RadiusTokensSection />
      <TypographyTokensSection />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={pageStyles()}>
      <ColorTokensSection />
    </div>
  ),
};

export const Spacing: Story = {
  render: () => (
    <div style={pageStyles()}>
      <SpacingTokensSection />
    </div>
  ),
};

export const Radius: Story = {
  render: () => (
    <div style={pageStyles()}>
      <RadiusTokensSection />
    </div>
  ),
};

export const Typography: Story = {
  render: () => (
    <div style={pageStyles()}>
      <TypographyTokensSection />
    </div>
  ),
};
