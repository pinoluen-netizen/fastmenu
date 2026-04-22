import type { Config } from "tailwindcss";

// Reuse the provided design Tailwind configuration as the base for the app.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const designConfig = require("./design/tailwind.config.ts");

const config: Config = {
  ...designConfig,
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    ...designConfig.theme,
    extend: {
      ...designConfig.theme?.extend,
      colors: {
        ...designConfig.theme?.extend?.colors,
        "surface-dim": "#dadada",
        "surface-bright": "#f9f9f9",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f3f3f3",
        "surface-container": "#eeeeee",
        "surface-container-high": "#e8e8e8",
        "surface-container-highest": "#e2e2e2",
        "on-surface": "#1a1c1c",
        "on-surface-variant": "#5b403a",
        "inverse-surface": "#2f3131",
        "inverse-on-surface": "#f1f1f1",
        "outline": "#8f7069",
        "outline-variant": "#e4beb6",
        "inverse-primary": "#ffb4a4",
        "on-primary-fixed-variant": "#8c1800",
        "background": "#f9f9f9",
        "on-background": "#1a1c1c",
        "surface-variant": "#e2e2e2",
      },
      spacing: {
        ...designConfig.theme?.extend?.spacing,
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "40px",
        gutter: "24px",
        margin: "32px",
      },
      fontSize: {
        h1: ["48px", { lineHeight: "1.1", letterSpacing: "0", fontWeight: "700" }],
        h2: ["32px", { lineHeight: "1.2", letterSpacing: "0", fontWeight: "600" }],
        h3: ["24px", { lineHeight: "1.3", letterSpacing: "0", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "1.6", letterSpacing: "0", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "1.5", letterSpacing: "0", fontWeight: "400" }],
        "label-md": ["14px", { lineHeight: "1", letterSpacing: "0", fontWeight: "600" }],
        "label-sm": ["12px", { lineHeight: "1", letterSpacing: "0", fontWeight: "500" }],
      },
    },
  },
};

export default config;
