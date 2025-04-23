import { defineConfig } from "vite";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
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
