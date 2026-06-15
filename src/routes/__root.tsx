import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import type { QueryClient } from '@tanstack/react-query';

import { NavBar } from '../components/NavBar/NavBar';
import { SlideMaster } from '../components/SlideMaster/SlideMaster';
import { getStatusFieldsFromBoxQueryOptions } from '../queries/getStatusFieldsFromBox/getStatusFieldsFromBox';
import { UpdateBar } from '../components/UpdateBar/UpdateBar';
import { InfoBar } from '../components/InfoBar';

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
  beforeLoad({ context }) {
    return {
      queryClient: context.queryClient,
      getStatusFieldsFromBoxQueryOptions,
    };
  },
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(context.getStatusFieldsFromBoxQueryOptions); // show root pending component until until query has finished
  },
  pendingMinMs: 1000,
  pendingMs: 0,
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
