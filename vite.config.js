// vite.config.js
// import { defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert'



import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    cors: true,
    https: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
    },
  },
  plugins: [ mkcert() ],
  
  build: {
    rollupOptions: {
      output: {
        manualChunks: () => 'main.js',
        entryFileNames: 'assets/main.js',  // this controls the output filename
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },
});
