import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

export default defineConfig({
  base: "/for-tuam-the-bell-tolls/",
  assetsInclude: "m4a",
  plugins: [preact()],
  esbuild: {
    jsxFactory: `jsx`,
    jsxInject: `import { jsx } from '@emotion/react'`,
  },
});
