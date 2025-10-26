import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import type { QueryClient } from '@tanstack/react-query';

import { NavBar } from '../components/NavBar';
import { SlideMaster } from '../components/SlideMaster';
import { getStatusFieldsFromBoxQueryOptions } from '../queries/getStatusFieldsFromBox/getStatusFieldsFromBox';
import { UpdateBar } from '../components/UpdateBar';
import { InfoBar } from '../components/InfoBar';

type Context = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<Context>()({
  pendingComponent: () => <UpdateBar>Box data is being fetched</UpdateBar>, // suspense boundary
  errorComponent: () => <UpdateBar>Box data &apos;t be loaded</UpdateBar>, // error boundary
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
