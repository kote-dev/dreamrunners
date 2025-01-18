import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      includeAssests: ["favicon.ico", "apple-touc-icon.png", "masked-icon.svg"],
      manifest: {
        name: "Dream Protocol",
        short_name: "dream-protocol",
        description:
          "Harness the power of AI to bring your visions to life with Dream Protocol. Enter a world where artistry meets innovation, and every creation is a masterpiece waiting to happen. Log in to begin your artistic adventure.",
        icons: [
          {
            src: "Assets/icons/android/android-launchericon-192-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "favicon",
          },
          {
            src: "Assets/icons/android/android-launchericon-512-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "favicon",
          },
          {
            src: "Assets/icons/ios/180.png",
            sizes: "180x180",
            type: "image/png",
            purpose: "apple touch icon",
          },
          {
            src: "Assets/icons/ios/144.png",
            sizes: "144x144",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "Assets/icons/ios/512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
        theme_color: "#171717",
        background_color: "#f0e7db",
        display: "standalone",
        scope: "/",
        start_url: "/",
        orientation: "portrait",
      },
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
      },
    },
  },
  publicDir: "public",
});
