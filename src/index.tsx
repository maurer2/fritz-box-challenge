import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { setupWorker } from 'msw/browser';
import { StyleSheetManager } from 'styled-components';

import { routeTree } from './routeTree.gen';
import { Theme } from './components/Theme/Theme';
import './index.css';

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

const isDevMode = import.meta.env.MODE === 'development';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 60 * 60 * 1000, // 1 hour
    },
  },
});

async function mockEndpoints() {
  if (!isDevMode) {
    return;
  }

  const handlers = (await import('./mocks/handlers')).default;
  const worker = setupWorker(...handlers);

  await worker.start({
    onUnhandledRequest: 'bypass',
  });
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
  defaultGcTime: Infinity,
  defaultPendingMs: 1000, // default
  defaultPreloadStaleTime: 0, // https://tkdodo.eu/blog/tan-stack-router-and-query#turn-off-router-caching
});

root.render(
  <StrictMode>
    {/* needed for "height: stretch" */}
    <StyleSheetManager enableVendorPrefixes>
      <Theme>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
        <TanStackDevtools
          config={{
            defaultOpen: false,
            position: 'top-right',
            panelLocation: 'top',
          }}
          plugins={[
            {
              name: 'TanStack Query',
              render: <ReactQueryDevtoolsPanel client={queryClient} />,
            },
            {
              name: 'TanStack Router',
              render: <TanStackRouterDevtoolsPanel router={router} />,
            },
          ]}
        />
      </Theme>
    </StyleSheetManager>
  </StrictMode>,
);
