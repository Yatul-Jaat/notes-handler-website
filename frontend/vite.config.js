import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        // Generate simple asset names without hashes that could cause routing issues
        entryFileNames: 'assets/index.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: (assetInfo) => {
          // Handle different asset types with simple names
          const extType = assetInfo.name.split('.')[1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `assets/images/[name].[ext]`;
          }
          if (/css/i.test(extType)) {
            return `assets/index.[ext]`;
          }
          return `assets/[name].[ext]`;
        }
      }
    },
    // Ensure consistent builds
    assetsInlineLimit: 0, // Don't inline any assets
  },
  // Ensure proper asset handling during development
  server: {
    fs: {
      strict: false
    }
  }
})