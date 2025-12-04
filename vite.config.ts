import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        // Disable unnecessary hooks if they cause errors
        cleanupOutdatedCaches: false,
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024, // 5 MB limit
      },
      manifest: {
        name: "Amanah Laundry",
        short_name: "Amanah Laundry",
        description: "Layanan Laundry Cepat & Bersih",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
