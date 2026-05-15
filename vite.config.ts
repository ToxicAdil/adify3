import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
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
      // CSS loads via <link> in HTML — parallel with JS, not chained behind it
      cssCodeSplit: false,
      // Terser removes dead code and minifies more aggressively than esbuild
      minify: 'esbuild',
      target: 'es2020',
      sourcemap: false,
      // Reduce asset inlining threshold (default 4096)
      assetsInlineLimit: 2048,
      cssMinify: true,
      // Faster build reporting
      reportCompressedSize: false,
      // vendor-three is 884KB but loaded ONLY via requestIdleCallback after page is interactive
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Three.js — heaviest chunk, deferred via requestIdleCallback
            if (
              id.includes('node_modules/three') ||
              id.includes('@react-three/fiber') ||
              id.includes('@react-three/drei')
            ) {
              return 'vendor-three';
            }
            // GSAP — used only by Preloader (isolated from critical path)
            if (id.includes('node_modules/gsap') || id.includes('@gsap/react')) {
              return 'vendor-gsap';
            }
            // Framer Motion / motion — lazy-loaded components only
            if (id.includes('node_modules/motion') || id.includes('node_modules/framer-motion')) {
              return 'vendor-motion';
            }
            // React core — stable, long-lived cache
            if (
              id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/react-router-dom/')
            ) {
              return 'vendor-react';
            }
            // Supabase — only used in data fetching pages
            if (id.includes('@supabase/supabase-js') || id.includes('node_modules/@supabase')) {
              return 'vendor-supabase';
            }
            // React icons — used by testimonials (lazy-loaded)
            if (id.includes('node_modules/react-icons')) {
              return 'vendor-icons';
            }
          },
        },
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
