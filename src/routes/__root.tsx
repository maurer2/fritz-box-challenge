import React from 'react';
import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router';
// eslint-disable-next-line import/no-extraneous-dependencies
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

type Context = {
  boxData: string | null;
  hasBoxData?: boolean;
  setHasBoxData?: (newValue: boolean) => void;
};

async function getBoxData() {
  try {
    const response = await fetch('/box-data');
    if (!response.ok) {
      throw new Error('HTTP error');
    }

    const data = (await response.text()) as string;

    return data;
  } catch (error) {
    // todo add Error.isError
    console.error('Fetch error');

    throw error;
  }
}

export const Route = createRootRouteWithContext<Context>()({
  beforeLoad: async ({ context }) => {
    if (!context.hasBoxData) {
      const boxData = await getBoxData();
      context?.setHasBoxData?.(true);

      return { boxData };
    }

    return context;
  },
  pendingComponent: () => <p>Loading box data</p>,
  wrapInSuspense: true, // required for pending components in root routes: https://github.com/TanStack/router/issues/2182
  staleTime: Infinity,
  pendingMinMs: 0,
  component: () => (
    <>
      <nav>
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/branding" className="[&.active]:font-bold">
          Branding
        </Link>
        <Link to="/firmware" className="[&.active]:font-bold">
          Firmware
        </Link>
        <Link to="/model" className="[&.active]:font-bold">
          Model
        </Link>
        <Link to="/power-on-hours" className="[&.active]:font-bold">
          Power on hours
        </Link>
        <Link to="/restarts" className="[&.active]:font-bold">
          Restarts
        </Link>
        <Link to="/technology" className="[&.active]:font-bold">
          Technology
        </Link>
      </nav>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
