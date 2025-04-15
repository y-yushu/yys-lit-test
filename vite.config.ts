import { defineConfig } from "vite";

export default defineConfig({
  plugins: [],
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
