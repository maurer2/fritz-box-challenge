import type { ReactNode } from 'react';
import {
  useNavigate,
  useRouterState,
  type FileRoutesByPath,
  type NavigateOptions,
} from '@tanstack/react-router';
import { useHotkey } from '@tanstack/react-hotkeys';

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

const navigateToPreviousOrNextEntry = (
  navigate: ReturnType<typeof useNavigate>,
  currentPath: string | undefined,
  offset: number,
) => {
  const activeNavBarEntryIndex = navLinks.findIndex(([to]) => to === currentPath);
  const newNavBarEntryIndex = activeNavBarEntryIndex + offset;
  const newNavBarEntry = navLinks.at(newNavBarEntryIndex);

  // upper and lower bounds to avoid wrap around behaviour
  if (newNavBarEntry === undefined || newNavBarEntryIndex < 0) {
    return;
  }

  navigate({ to: newNavBarEntry[0], viewTransition }).catch((error: unknown) => {
    console.error('Navigation failed', error);
  });
};

const NavBar = () => {
  const navigate = useNavigate();

  // useLocation doesn't work with view-transitions as it updates the location before the view-transition source/target can be calculated: https://github.com/TanStack/router/issues/3110
  // useRouterState/matches allows target creation once the route or its pendingComponent renders
  // useRouterState/resolvedLocation waits for the loader to finish (ignores pendingComponent), so the target is calculated too late -> no transition
  const currentPath = useRouterState({
    select: ({ matches }) => {
      // contains root-path as first entry
      return matches.at(-1)?.fullPath;
    },
  });
  useHotkey('ArrowLeft', () => {
    navigateToPreviousOrNextEntry(navigate, currentPath, -1);
  });
  useHotkey('ArrowRight', () => {
    navigateToPreviousOrNextEntry(navigate, currentPath, 1);
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
