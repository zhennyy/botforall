import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // тесты (Vitest): компоненты рендерятся в jsdom, подмены браузерных API — в src/test/setup.js
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
  },
});
