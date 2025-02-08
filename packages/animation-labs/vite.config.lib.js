import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { commonOption } from './vite.config.common';
import path from 'path';

export default defineConfig({
  ...commonOption,
  build: {
    lib: {
      formats: ['umd', 'iife', 'es', 'cjs'],
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'AnimationLabs',
      // the proper extensions will be added
      fileName: 'animation-labs',
    },
    minify: 'terser',
    rollupOptions: {},
  },
  plugins: [
    dts({
      rollupTypes: true,
      name: 'animation-labs.d.ts',
    }),
  ],
});
