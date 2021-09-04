import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

export default defineConfig({
  base: "https://www.amymccarthy.co/for-tuam-the-bell-tolls/",
  plugins: [preact()],
  esbuild: {
    jsxFactory: `jsx`,
    jsxInject: `import { jsx } from '@emotion/react'`,
  },
});
