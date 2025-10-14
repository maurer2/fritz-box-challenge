import React, { StrictMode, lazy } from 'react';
import ReactDOM from 'react-dom/client';
// eslint-disable-next-line import/order
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { setupWorker } from 'msw/browser';
import 'modern-normalize';

import handlers from './handlers';
import './index.css';
import { routeTree } from './routeTree.gen';

const isDevMode = import.meta.env.VITE_APP_MODE === 'dev';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('root element is missing');
}
const root = ReactDOM.createRoot(rootElement);

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const ReactQueryDevtools = isDevMode
  ? lazy(() =>
      import('@tanstack/react-query-devtools').then((module) => ({
        default: module.ReactQueryDevtools,
      })),
    )
  : null;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});

if (isDevMode) {
  const worker = setupWorker(...handlers);
  await worker.start();
}

// async function getBoxData() {
//   try {
//     const response = await fetch('/box-data');
//     if (!response.ok) {
//       throw new Error('HTTP error');
//     }

//     const data = (await response.text()) as unknown;

//     return data;
//   } catch (error) {
//     // todo add Error.isError
//     console.error('Fetch error');

//     throw error;
//   }
// }

// context type is defined in createRootRouteWithContext in __root.tsx
export const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultStaleTime: Infinity,
  defaultPreload: 'intent',
  // defaultPreloadStaleTime: Infinity,
  defaultGcTime: Infinity,
  defaultPendingMs: 0,
  defaultPreloadStaleTime: 0,
});

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {ReactQueryDevtools !== null && (
        <ReactQueryDevtools initialIsOpen buttonPosition="top-right" />
      )}
      {/* <ReactQueryDevtools initialIsOpen buttonPosition="top-right" /> */}
    </QueryClientProvider>
  </StrictMode>,
);
