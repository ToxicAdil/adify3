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
      // PERFORMANCE: Disable CSS code splitting so CSS loads via <link> in HTML,
      // not chained behind JS. This breaks the critical path chain:
      // Before: HTML → JS (460ms) → CSS (672ms) = 672ms
      // After:  HTML → CSS (parallel with JS) = ~300ms
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          manualChunks: {
            // Three.js — deferred via requestIdleCallback in globe-hero
            'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],

            // Framer Motion — only loaded by lazy components (NOT in critical path)
            'vendor-motion': ['motion', 'framer-motion'],
            // React core — stable, long-term cache
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            // React icons — used by testimonials, loaded lazily
            'vendor-icons': ['react-icons'],
          },
        },
      },
      chunkSizeWarningLimit: 600,
      minify: 'esbuild',
      target: 'es2020',
      // PERFORMANCE: Enable source map for production debugging but keep bundles lean
      sourcemap: false,
      // PERFORMANCE: Reduce asset inlining threshold (default 4096)
      assetsInlineLimit: 2048,
      // PERFORMANCE: Enable CSS minification
      cssMinify: true,
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
