import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig as testConfig } from 'vitest/config';

// https://vite.dev/config/
const config = defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    host: true,
    port: 5173,
    watch: {
      usePolling: true,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

const vitestConfig = testConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
  },
});

export default {
  ...config,
  ...vitestConfig,
};
