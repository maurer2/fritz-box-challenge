import { defineConfig, loadEnv, PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';

import { boxHTMLSchema } from './src/schema/boxHTML/boxHTML.schema';
import fetcher from './src/helpers/fetcher/fetcher';

function fetchBoxDataPlugin(mode: string): PluginOption {
  const boxDataModuleId = 'virtual:box-data';
  const boxDataModuleIdResolved = `\0${boxDataModuleId}`;

  return {
    name: 'fetch-box-data',
    resolveId(id) {
      if (id === boxDataModuleId) {
        return boxDataModuleIdResolved;
      }
      return undefined;
    },
    async load(id) {
      if (id === boxDataModuleIdResolved) {
        const env = loadEnv(mode, process.cwd(), '');
        const boxDataMarkup = await fetcher(env.URL_BOX_STATUS, boxHTMLSchema);

        return `export default '${boxDataMarkup}'`;
      }
      return undefined;
    },
  };
}

/** @type {import('vite').UserConfig} */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: '',
    define: {
      'process.env.URL_BOX_STATUS': JSON.stringify(env.URL_BOX_STATUS),
    },
    plugins: [react(), viteTsconfigPaths(), fetchBoxDataPlugin(mode)],
    server: {
      open: false,
      port: 3000,
    },
  };
});
