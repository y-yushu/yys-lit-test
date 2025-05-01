import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    target: 'esnext', // 输出最新 JavaScript 语法，适合现代浏览器
    lib: {
      entry: {
        'my-counter': path.resolve(__dirname, 'src/my-counter.ts'),
        'my-chil-1': path.resolve(__dirname, 'src/widgets/chil1.ts'),
        'my-chil-2': path.resolve(__dirname, 'src/widgets/chil2.ts')
      },
      name: 'MyCounter',
      formats: ['es'],
      fileName: (format, entryName) => `${entryName}.${format}.js`
    },
    rollupOptions: {
      external: [],
      output: {
        manualChunks(id) {
          if (id.includes('highlight.js/lib/languages')) {
            return 'highlight-languages'
          }
        },
        globals: {
          lit: 'lit'
        }
      }
    }
  }
})
