import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  // IMPORTANT for custom domains like waitlist.cloudtopg.store
  base: "/",

  // Build output that we’ll deploy
  build: {
    outDir: "dist",
    sourcemap: false,
  },

  // Dev server (safe to keep; has no effect on Pages)
  server: {
    host: "::",
    port: 8080,
  },

  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
