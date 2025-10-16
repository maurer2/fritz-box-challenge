import React, { type CSSProperties } from 'react';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
// eslint-disable-next-line import/no-extraneous-dependencies
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import type { QueryClient } from '@tanstack/react-query';

import { NavBarEntry } from '../components/NavBarEntry';
import { NavBar2 } from '../components/NavBar/NavBar.styles';
import { fetchBoxDataQueryOptions } from '../hooks/useFetchBoxData/useFetchBoxData';

type Context = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<Context>()({
  pendingComponent: () => <p style={{ color: '#FFF' } as CSSProperties}>Loading box data</p>, // suspense boundary
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
      <NavBar2>
        <NavBarEntry to="/branding" viewTransition={{ types: ['test'] }}>
          Branding
        </NavBarEntry>
        <NavBarEntry to="/firmware" viewTransition={{ types: ['test'] }}>
          Firmware
        </NavBarEntry>
        <NavBarEntry to="/model" viewTransition={{ types: ['test'] }}>
          Model
        </NavBarEntry>
        <NavBarEntry to="/power-on-hours" viewTransition={{ types: ['test'] }}>
          Power on hours
        </NavBarEntry>
        <NavBarEntry to="/restarts" viewTransition={{ types: ['test'] }}>
          Restarts
        </NavBarEntry>
        <NavBarEntry to="/technology" viewTransition={{ types: ['test'] }}>
          Technology
        </NavBarEntry>
      </NavBar2>
      <main>
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </>
  ),
});
