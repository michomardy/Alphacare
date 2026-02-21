/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // ✅ FIXED: Use react-helmet-async (not react-helmet)
  ssr: {
    noExternal: ['react-helmet-async', 'react-router-dom'],
  },
  build: {
    ssr: true, // Server-side rendering build
    outDir: 'dist/server',
    emptyOutDir: true, // OK here since it's separate folder
    rollupOptions: {
      input: 'src/entry-server.jsx',
      output: {
        format: 'es', // ES Modules
        // ✅ ADDED: Ensure proper file naming
        entryFileNames: '[name].js',
      },
      onwarn(warning, warn) {
        // Ignore certain warnings
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;
        if (warning.code === 'SOURCEMAP_ERROR') return;
        warn(warning);
      },
    },
  },
  logLevel: 'info',
});