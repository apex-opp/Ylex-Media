import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
  },
  build: {
    sourcemap: false,
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) return 'react-vendor';
          if (id.includes('three') || id.includes('@react-three') || id.includes('postprocessing') || id.includes('three-mesh-bvh')) return 'three-vendor';
          if (id.includes('gsap')) return 'gsap-vendor';
          if (id.includes('lenis')) return 'lenis-vendor';

          // Let Rollup decide the rest to avoid circular chunk graphs.
          return;
        },
      },
    },
  },
});
