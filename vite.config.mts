import { defineConfig, loadEnv, type ProxyOptions /* type PluginOption, */ } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import babel from '@rolldown/plugin-babel';
import { devtools } from '@tanstack/devtools-vite';
import type { Logger } from 'babel-plugin-react-compiler';

// import { boxHTMLSchema } from './src/schema/boxHTML/boxHTML.schema';
// import fetcher from './src/helpers/fetcher/fetcher';

// vite virtual module for fetching box data
// function fetchBoxDataPlugin(mode: string): PluginOption {
//   const boxDataModuleId = 'virtual:box-data';
//   const boxDataModuleIdResolved = `\0${boxDataModuleId}`;

//   return {
//     name: 'fetch-box-data',
//     resolveId(id) {
//       if (id === boxDataModuleId) {
//         return boxDataModuleIdResolved;
//       }
//       return undefined;
//     },
//     async load(id) {
//       if (id === boxDataModuleIdResolved) {
//         const env = loadEnv(mode, process.cwd(), '');
//         const boxDataMarkup = await fetcher(env.URL_BOX_STATUS, boxHTMLSchema);

//         return `export default '${boxDataMarkup}'`;
//       }
//       return undefined;
//     },
//   };
// }

// https://pietrobondioli.com.br/articles/how-to-solve-cors-problems-using-vite-proxy
const boxDataProxyOptions = {
  changeOrigin: true,
  secure: false,
  rewrite: (p: string) => p.replace(/^\/box-data/, ''),
} satisfies ProxyOptions;

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isDevMode = process.env.VITE_APP_MODE === 'dev';

  return {
    base: '',
    define: {
      'process.env.URL_BOX_STATUS': JSON.stringify(env.URL_BOX_STATUS),
    },
    resolve: {
      tsconfigPaths: true, // replaces vite-tsconfig-paths in vite 8
    },
    plugins: [
      devtools(),
      tanstackRouter(),
      react(),
      babel({
        presets: [
          reactCompilerPreset({
            logger: {
              logEvent(filename, event) {
                switch (event.kind) {
                  case 'CompileSuccess': {
                    console.log(`✅ Compiled: ${filename}`);
                    break;
                  }
                  case 'CompileError': {
                    console.log(`❌ Compiler Error: ${filename}`);
                    console.error(`Reason: ${event.detail.reason}`);
                    break;
                  }
                  default: {
                    break; // eslint fix
                  }
                }
              },
            } satisfies Logger,
          }),
        ],
        plugins: [
          [
            'babel-plugin-styled-components',
            {
              displayName: isDevMode,
              ssr: false,
              pure: true,
            },
          ],
        ],
      }),
    ],
    server: {
      open: false,
      port: 3000,
      proxy: !isDevMode
        ? {
            '/box-data': {
              target: env.URL_BOX_STATUS,
              ...boxDataProxyOptions,
            },
          }
        : undefined,
    },
    preview: {
      proxy: !isDevMode
        ? {
            '/box-data': {
              target: env.URL_BOX_STATUS,
              ...boxDataProxyOptions,
            },
          }
        : undefined,
    },
  };
});
