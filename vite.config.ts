import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";

export default defineConfig({
  plugins: [
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
  ],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "MyLitComponent",
      fileName: (format) => `my-lit-component.${format}.js`,
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {
          lit: "Lit",
        },
      },
    },
  },
});
