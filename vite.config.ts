import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      // Aggressive code-splitting: separate heavy libraries into their own chunks
      rollupOptions: {
        output: {
          manualChunks: {
            // Three.js — only loaded by pages/sections that use the InteractiveGlobe
            'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
            // Spline — only loaded by About page (if re-added)
            'vendor-spline': ['@splinetool/react-spline', '@splinetool/runtime'],
            // Framer Motion — used across pages, benefits from caching separately
            'vendor-motion': ['motion'],
            // React core — stable, long-term cache
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          },
        },
      },
      // Increase chunk size warning limit since we're intentionally splitting
      chunkSizeWarningLimit: 600,
      // Enable CSS code splitting for better caching
      cssCodeSplit: true,
      // Minify with esbuild (faster than terser, good enough for prod)
      minify: 'esbuild',
      // Target modern browsers to reduce polyfill overhead
      target: 'es2020',
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
