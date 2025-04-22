import { defineConfig } from "vite";

export default defineConfig({
  plugins: [],
  build: {
    target: "esnext", // 输出最新 JavaScript 语法，适合现代浏览器
    lib: {
      entry: "src/index.ts",
      name: "MyCounter",
      fileName: (format) => `my-counter.${format}.js`,
    },
    rollupOptions: {
      external: [],
      output: {},
    },
  },
});
