import tokens from "./src/styles/tokens.json" with { type: "json" };

/**
 * Convert token trees into Tailwind-compatible scales that resolve to CSS vars.
 * Colors always reference semantic/primitives CSS custom properties so dark mode
 * continues working through variable overrides.
 */
function flattenTokenTree(node, prefix = []) {
  const result = {};

  for (const [key, value] of Object.entries(node)) {
    if (value && typeof value === "object" && "value" in value) {
      const tokenKey = [...prefix, key].join("-");
      result[tokenKey] = value.value;
      continue;
    }

    if (value && typeof value === "object") {
      Object.assign(result, flattenTokenTree(value, [...prefix, key]));
    }
  }

  return result;
}

function toCssVarScale(flatMap, varPrefix) {
  return Object.fromEntries(
    Object.keys(flatMap).map((key) => [key, `var(--${varPrefix}-${key})`]),
  );
}

function extractColorScale(colorTokens) {
  const primitive = flattenTokenTree(colorTokens.primitive ?? {});
  const semanticLight = flattenTokenTree(colorTokens.semantic?.light ?? {});

  return {
    ...toCssVarScale(primitive, "color"),
    ...toCssVarScale(semanticLight, "color"),
  };
}

const colorScale = extractColorScale(tokens.color ?? {});
const spacingScale = toCssVarScale(flattenTokenTree(tokens.space ?? {}), "space");
const radiusScale = toCssVarScale(flattenTokenTree(tokens.radius ?? {}), "radius");
const fontScale = toCssVarScale(flattenTokenTree(tokens.font?.scale ?? {}), "font-scale");
const fontWeightScale = toCssVarScale(
  flattenTokenTree(tokens.font?.weight ?? {}),
  "font-weight",
);
const rawFontFamily = flattenTokenTree(tokens.font?.family ?? {});
const fontFamilyScale = Object.fromEntries(
  Object.keys(rawFontFamily).map((key) => [key, [`var(--font-family-${key})`]]),
);

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: colorScale,
      spacing: spacingScale,
      borderRadius: radiusScale,
      fontFamily: fontFamilyScale,
      fontSize: fontScale,
      fontWeight: fontWeightScale,
    },
  },
};
