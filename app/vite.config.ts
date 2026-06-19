import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { fileURLToPath } from "url"

const __dirname = fileURLToPath(new URL(".", import.meta.url))

export default defineConfig({
  plugins: [react()],
  server: { port: 3000 },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
})