import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: 'react',
      babel: {
        compact: true,
      },
    }),
  ],
  build: {
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      mangle: true,
    },
    rollupOptions: {
      output: [
        {
          format: 'es',
          entryFileNames: '[name]-[hash].js',
          chunkFileNames: '[name]-[hash].js',
          assetFileNames: '[name]-[hash][extname]',
        },
      ],
    },
    sourcemap: false,
    reportCompressedSize: false,
  },
  server: {
    middlewareMode: false,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react'],
    exclude: [],
  },
})
