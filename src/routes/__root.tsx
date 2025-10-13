import React from 'react';
import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router';
// eslint-disable-next-line import/no-extraneous-dependencies
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

type Context = {
  getBoxData: () => Promise<unknown>;
};

export const Route = createRootRouteWithContext<Context>()({
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
