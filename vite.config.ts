
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      // Add protection for HMR (Hot Module Replacement) websocket
      clientPort: 8080,
      // Only allow connections from localhost
      host: 'localhost',
    },
    // Add CORS protection for development server
    cors: {
      origin: ['http://localhost:8080', 'http://127.0.0.1:8080'],
      methods: ['GET', 'POST'],
      credentials: true,
    },
    // Only listen on localhost (not on all interfaces)
    strictPort: true,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
