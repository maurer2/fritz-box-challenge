import { useRef, type ComponentProps, type ReactNode, type CSSProperties } from 'react';
import { useLocation, type NavigateOptions } from '@tanstack/react-router';

import { NavBarIndicator } from '../NavBarIndicator';

import { NavBarWrapper, NavBarList, NavBarEntry } from './NavBar.styles';

// prettier-ignore
type NavLinkPath = NonNullable<(ComponentProps<typeof NavBarEntry>)['to']>;
type TransitionName = 'move-left' | 'move-right';

const SCREEN_WIDTH_INDICATOR = 750;

const navLinks: [path: NavLinkPath, children: ReactNode][] = [
  ['/branding', 'Branding'],
  ['/firmware', 'Firmware'],
  ['/model', 'Model'],
  ['/power-on-hours', 'Power on hours'],
  ['/restarts', 'Restarts'],
  ['/technology', 'Technology'],
];

const viewTransition: NavigateOptions['viewTransition'] = {
  types: ({ fromLocation, toLocation }) => {
    const currentRoutIndex = navLinks.findIndex(([path]) =>
      fromLocation?.pathname.startsWith(path),
    );
    const newRoutIndex = navLinks.findIndex(([path]) => toLocation?.pathname.startsWith(path));

    if (newRoutIndex === currentRoutIndex) {
      return false;
    }
    const newDirection: TransitionName =
      newRoutIndex > currentRoutIndex ? 'move-right' : 'move-left';

    return [newDirection];
  },
};

const NavBar = () => {
  const currentLocation = useLocation({ select: ({ pathname }) => pathname });
  // elements are undefined during the first render when ref callbacks are not called yet
  // refs callbacks are called with null first
  const navBarEntryElements = useRef<(HTMLAnchorElement | null | undefined)[]>([]);

  const activeNavBarEntryIndex = navLinks.findIndex(([to]) => to === currentLocation);
  const activeNavBarEntry = navBarEntryElements.current[activeNavBarEntryIndex];

  return (
    <NavBarWrapper>
      <NavBarIndicator
        activeNavBarEntry={activeNavBarEntry}
        activeNavBarEntryIndex={activeNavBarEntryIndex}
        minScreenSizeIndicator={SCREEN_WIDTH_INDICATOR}
      />
      <NavBarList $minScreenSizeIndicator={SCREEN_WIDTH_INDICATOR}>
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
