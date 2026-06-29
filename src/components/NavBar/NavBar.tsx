import type { ReactNode } from 'react';
import {
  useRouterState,
  type FileRoutesByPath,
  type NavigateOptions,
} from '@tanstack/react-router';

import { NavBarIndicator } from './components/NavBarIndicator/NavBarIndicator';
import { NavBarWrapper, NavBarList, NavBarEntry } from './NavBar.styles';

type TransitionName = 'move-left' | 'move-right';

// https://github.com/TanStack/router/discussions/5766
const navLinks = [
  ['/branding', 'Branding'],
  ['/firmware', 'Firmware'],
  ['/model', 'Model'],
  ['/power-on-hours', 'Power-on hours'],
  ['/restarts', 'Restarts'],
  ['/technology', 'Technology'],
] satisfies [keyof FileRoutesByPath, ReactNode][];

const viewTransition: NavigateOptions['viewTransition'] = {
  types: ({ fromLocation, toLocation }) => {
    const currentRoutIndex = navLinks.findIndex(([path]) =>
      fromLocation?.pathname.startsWith(path),
    );
    const newRoutIndex = navLinks.findIndex(([path]) => toLocation?.pathname.startsWith(path));

    if (newRoutIndex === currentRoutIndex) {
      return false;
    }
    const newDirection = (
      newRoutIndex > currentRoutIndex ? 'move-right' : 'move-left'
    ) satisfies TransitionName;

    return [newDirection];
  },
};

const NavBar = () => {
  // useLocation doesn't work with view-transitions as it updates the location before the view-transition source/target can be calculated: https://github.com/TanStack/router/issues/3110
  // useRouterState/matches allows target creation once the route or its pendingComponent renders
  // useRouterState/resolvedLocation waits for the loader to finish (ignores pendingComponent), so the target is calculated too late -> no transition
  const currentPath = useRouterState({
    select: ({ matches }) => {
      // contains root-path as first entry
      return matches.at(-1)?.fullPath},
  });
  const activeNavBarEntryIndex = navLinks.findIndex(([to]) => to === currentPath);

  return (
    <NavBarWrapper>
      {/* Only sets the current anchor location and its styling. Transition between two anchors is done via view-transitions */}
      <NavBarIndicator activeNavBarEntryIndex={activeNavBarEntryIndex} />
      <NavBarList>
        {navLinks.map(([to, children], index) => (
          <li key={to}>
            <NavBarEntry
              to={to}
              viewTransition={viewTransition}
              activeProps={{
                'aria-current': 'page',
              }}
              style={{ anchorName: `--anchor-${index}` }}
            >
              {children}
            </NavBarEntry>
          </li>
        ))}
      </NavBarList>
    </NavBarWrapper>
  );
};

export { NavBar };
