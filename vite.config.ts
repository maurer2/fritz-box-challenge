import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';

/** @type {import('vite').UserConfig} */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: '',
    define: {
      'process.env.URL_BOX_STATUS': JSON.stringify(env.URL_BOX_STATUS),
    },
    plugins: [react(), viteTsconfigPaths()],
    server: {
      open: false,
      port: 3000,
    },
  };
});
