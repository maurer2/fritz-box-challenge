import React from 'react';
import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router';
// eslint-disable-next-line import/no-extraneous-dependencies
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import type { QueryClient } from '@tanstack/react-query';

import { fetchBoxDataQueryOptions } from '../hooks/useFetchBoxData/useFetchBoxData';

type Context = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<Context>()({
  pendingComponent: () => <p>Loading box data</p>, // suspense boundary
  wrapInSuspense: true, // required when a pending component is used in a root route: https://github.com/TanStack/router/issues/2182
  ssr: false,
  beforeLoad({ context }) {
    return {
      queryClient: context.queryClient,
      fetchBoxDataQueryOptions,
    };
  },
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(context.fetchBoxDataQueryOptions); // show root pending component until until query has finished
  },
  component: () => (
    <>
      <nav>
        <Link to="/" className="" viewTransition={{ types: ['test'] }}>
          Home
        </Link>
        <Link to="/branding" className="" viewTransition={{ types: ['test'] }}>
          Branding
        </Link>
        <Link to="/firmware" className="" viewTransition={{ types: ['test'] }}>
          Firmware
        </Link>
        <Link to="/model" className="" viewTransition={{ types: ['test'] }}>
          Model
        </Link>
        <Link to="/power-on-hours" className="" viewTransition={{ types: ['test'] }}>
          Power on hours
        </Link>
        <Link to="/restarts" className="" viewTransition={{ types: ['test'] }}>
          Restarts
        </Link>
        <Link to="/technology" className="" viewTransition={{ types: ['test'] }}>
          Technology
        </Link>
      </nav>
      <main>
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </>
  ),
});
