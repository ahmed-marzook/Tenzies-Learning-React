import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { ghPages } from "vite-plugin-gh-pages";

import fs from "node:fs";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ghPages({
      // Add this hook to create CNAME file before publishing
      onBeforePublish: ({ outDir }) => {
        const CNAME = path.join(outDir, "CNAME");
        fs.writeFileSync(CNAME, "tenzies.kaizenflow.dev");
      },
    })
  ],
  base: '/',
})
