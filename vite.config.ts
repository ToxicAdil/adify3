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
      // Code-splitting: separate heavy 3D/animation libraries into their own chunks
      // so they only load when actually needed (e.g. About page loads Spline, hero loads Three.js)
      rollupOptions: {
        output: {
          manualChunks: {
            // Three.js ecosystem — only loaded by pages that use 3D globe
            'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
            // Spline — only loaded by About page 
            'vendor-spline': ['@splinetool/react-spline', '@splinetool/runtime'],
            // Framer Motion — used everywhere but tree-shaking helps
            'vendor-motion': ['framer-motion', 'motion'],
            // React core
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          },
        },
      },
      // Increase chunk size warning limit since we're intentionally splitting
      chunkSizeWarningLimit: 800,
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
