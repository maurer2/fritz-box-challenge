import { useRef, type ReactNode, type CSSProperties } from 'react';
import { useLocation, type FileRoutesByPath, type NavigateOptions } from '@tanstack/react-router';

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
  const currentLocation = useLocation({ select: ({ pathname }) => pathname });
  // elements are undefined during the first render when ref callbacks are not called yet
  // refs callbacks are called with null first
  const navBarEntryElements = useRef<(HTMLAnchorElement | null | undefined)[]>([]);

  const activeNavBarEntryIndex = navLinks.findIndex(([to]) => to === currentLocation);

  return (
    <NavBarWrapper>
      <NavBarIndicator activeNavBarEntryIndex={activeNavBarEntryIndex} />
      <NavBarList>
        {navLinks.map(([to, children], index) => (
          <li key={to}>
            <NavBarEntry
              to={to}
              viewTransition={viewTransition}
              ref={(element) => {
                navBarEntryElements.current[index] = element;
              }}
              style={{ anchorName: `--anchor-${index}` } as CSSProperties}
              aria-current={activeNavBarEntryIndex === index ? 'page' : undefined}
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
