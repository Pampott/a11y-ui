import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import pkg from './package.json' with { type: 'json' };

// Everything the consumer installs alongside the library stays out of the
// bundle: React (a peer, so there is only ever one copy on the page) and the
// runtime dependencies, which npm installs and the consumer's bundler dedupes.
const external = [
  ...Object.keys(pkg.peerDependencies),
  ...Object.keys(pkg.dependencies),
].map((name) => new RegExp(`^${name}(/.*)?$`));

/**
 * Library build. This repository has no index.html: the only things it ships
 * are the components (this build) and the Storybook (see netlify.toml).
 *
 * The output is unstyled JavaScript that carries Tailwind class names. The
 * consumer generates the CSS with its own Tailwind, using the preset exported
 * as `a11y-ui/tailwind-preset`. See "Using it in an application" in the README.
 */
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: { external },
    sourcemap: true,
  },
});
