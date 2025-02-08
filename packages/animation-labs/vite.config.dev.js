import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'src/demo/index.html'),
        demoBall: resolve(__dirname, 'src/demo/ball/ball-demo.html'),
      },
    },
  },
});
