import React, { StrictMode, lazy } from 'react';
import ReactDOM from 'react-dom/client';
// eslint-disable-next-line import/order
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { setupWorker } from 'msw/browser';
import 'modern-normalize';

import './index.css';
import { routeTree } from './routeTree.gen';
import { Theme } from './components/Theme';

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('root element is missing');
}
const root = ReactDOM.createRoot(rootElement);

const isDevMode = import.meta.env.VITE_APP_MODE === 'dev';
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

async function mockEndpoints() {
  if (isDevMode) {
    const handlers = (await import('./mocks/handlers')).default;
    const worker = setupWorker(...handlers);

    return worker.start();
  }

  return Promise.resolve();
}
await mockEndpoints();

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
    <Theme>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {ReactQueryDevtools !== null && (
          <ReactQueryDevtools initialIsOpen buttonPosition="top-right" />
        )}
        {/* <ReactQueryDevtools initialIsOpen buttonPosition="top-right" /> */}
      </QueryClientProvider>
    </Theme>
  </StrictMode>,
);
