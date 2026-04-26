import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // This ensures Emotion (MUI's engine) works correctly with React 19
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],
  server: {
    port: 3001,
    strictPort: true, // Prevents Vite from jumping to 3002 if 3001 is busy
    open: true,       // Opens browser automatically
    fs: {
      // CRITICAL: Allows Vite to serve files from your local plugin folders 
      // which are located 2 levels up (../../)
      allow: ['..'], 
    },
  },
  resolve: {
    alias: {
      // Optional: Helps if you have any weird import paths
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    // This forces Vite to pre-bundle these big libraries for speed
    include: [
      '@mui/material',
      '@emotion/react',
      '@emotion/styled',
      'lightweight-charts'
    ],
    // If your local plugins use CommonJS, you might need this:
    // exclude: ['your-plugin-name'] 
  },
  define: {
    // A more robust way to handle the "global is not defined" error
    // than just the index.html script tag.
    global: 'window',
  },
});