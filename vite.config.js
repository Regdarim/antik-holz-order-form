import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3010,
    open: true,
    strictPort: false, // Użyj następnego wolnego portu jeśli 3010 zajęty
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
