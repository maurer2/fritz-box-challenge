import { useHotkey } from '@tanstack/react-hotkeys';
import {
  useNavigate,
  useRouter,
  useRouterState,
  type FileRoutesByPath,
  type NavigateOptions,
} from '@tanstack/react-router';

import { NavBarIndicator } from './components/NavBarIndicator/NavBarIndicator';
import { NavBarWrapper, NavBarList, NavBarEntry } from './NavBar.styles';

type TransitionName = 'move-left' | 'move-right';

// https://github.com/TanStack/router/discussions/5766
const navLinks = [
  '/branding',
  '/firmware',
  '/model',
  '/power-on-hours',
  '/restarts',
  '/technology',
] satisfies (keyof FileRoutesByPath)[];

const viewTransition: NavigateOptions['viewTransition'] = {
  types: ({ fromLocation, toLocation }) => {
    const currentRoutIndex = navLinks.findIndex((path) => fromLocation?.pathname.startsWith(path));
    const newRoutIndex = navLinks.findIndex((path) => toLocation?.pathname.startsWith(path));

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
  const activeNavBarEntryIndex = navLinks.findIndex((path) => path === currentPath);
  const newNavBarEntryIndex = activeNavBarEntryIndex + offset;
  const newNavBarEntry = navLinks.at(newNavBarEntryIndex);

  // upper and lower bounds to avoid wrap around behaviour
  if (newNavBarEntry === undefined || newNavBarEntryIndex < 0) {
    return;
  }

  navigate({ to: newNavBarEntry, viewTransition }).catch((error: unknown) => {
    console.error('Navigation failed', error);
  });
};

const NavBar = () => {
  const navigate = useNavigate();
  const router = useRouter();

  // useLocation doesn't work with view-transitions as it updates the location before the view-transition source/target can be calculated: https://github.com/TanStack/router/issues/3110
  // useRouterState/matches allows target creation once the route or its pendingComponent renders
  // useRouterState/resolvedLocation waits for the loader to finish (ignores pendingComponent), so the target is calculated too late -> no transition
  const currentPath = useRouterState({
    select: ({ matches }) => {
      // contains root-path as first entry
      return matches.at(-1)?.fullPath;
    },
  });
  const activeNavBarEntryIndex = navLinks.findIndex((path) => path === currentPath);

  useHotkey('ArrowLeft', () => {
    navigateToPreviousOrNextEntry(navigate, currentPath, -1);
  });
  useHotkey('ArrowRight', () => {
    navigateToPreviousOrNextEntry(navigate, currentPath, 1);
  });

  return (
    <NavBarWrapper>
      {/* Only sets the current anchor location and its styling. Transition between two anchors is done via view-transitions */}
      <NavBarIndicator activeNavBarEntryIndex={activeNavBarEntryIndex} />
      <NavBarList>
        {navLinks.map((path, index) => (
          <li key={path}>
            <NavBarEntry
              to={path}
              viewTransition={viewTransition}
              activeProps={{
                'aria-current': 'page',
              }}
              style={{ anchorName: `--anchor-${index}` }}
            >
              {router.routesByPath[path].options.staticData?.title ?? ''}
            </NavBarEntry>
          </li>
        ))}
      </NavBarList>
    </NavBarWrapper>
  );
};

export { NavBar };
