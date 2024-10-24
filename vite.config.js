import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  server: {
    port: 5173,  // Changed to match your script src port
  },
  define: {
    "process.env": {
      NODE_ENV: "development",
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: "./src/index.jsx",
      name: "AiFormWidget",
      fileName: (format) => `ai-form-widget.${format}.js`,
    },
    rollupOptions: {
      output: {
        format: 'umd',
        name: 'AiFormWidget',
        exports: 'named'
      }
    },
    target: "esnext",
  },
});