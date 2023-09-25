import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'build',
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3003',
        changeOrigin: true,
      },
      host: '0.0.0.0',
      '/socket.io/': {
        target: 'http://localhost:3003',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    }
  },
  plugins: [react()],
  optimizeDeps: {
    exclude: ['react-textarea-autosize']
  }
});
