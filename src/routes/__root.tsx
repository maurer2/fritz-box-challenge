import type { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';

import { InfoBar } from '../components/InfoBar/InfoBar';
import { NavBar } from '../components/NavBar/NavBar';
import { SlideMaster } from '../components/SlideMaster/SlideMaster';
import { UpdateBar } from '../components/UpdateBar/UpdateBar';
import { getStatusFieldsFromBoxQueryOptions } from '../queries/getStatusFieldsFromBox/getStatusFieldsFromBox';

type Context = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<Context>()({
  // suspense boundary
  pendingComponent: () => <UpdateBar>Box data is being fetched</UpdateBar>,
  // error boundary
  errorComponent: ({ error }) => (
    <UpdateBar>Box data can&apos;t be loaded. {error.message}</UpdateBar>
  ),
  wrapInSuspense: true, // required when a pending component is used in a root route: https://github.com/TanStack/router/issues/2182
  ssr: false,
  // https://tkdodo.eu/blog/reliable-query-prefetching-with-tanstack-router
  // context({ context }) {
  context: () => ({
    // queryClient: context.queryClient, // already injected into context in createRouter()
    getStatusFieldsFromBoxQueryOptions,
  }),
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(context.getStatusFieldsFromBoxQueryOptions); // show root pending component until until query has finished
  },
  pendingMinMs: 1000,
  pendingMs: 0, // show pendingComponent right away on load avoiding 1s of black screen
  component: () => (
    <>
      <InfoBar />
      <SlideMaster>
        <Outlet />
      </SlideMaster>
      <NavBar />
    </>
  ),
});
