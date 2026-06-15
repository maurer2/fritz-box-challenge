import { useState, type CSSProperties, type ReactNode } from 'react';
import { useLocation, type FileRoutesByPath, type NavigateOptions } from '@tanstack/react-router';

import { useMediaQuery } from '../../hooks/useMatchMedia/useMatchMedia';
import { SCREEN_WIDTH_WHERE_INDICATOR_IS_VISIBLE } from '../Theme/tokens';

import {
  NavBarWrapper,
  NavBarList,
  NavBarIndicatorWrapper,
  NavBarIndicator,
  NavBarEntry,
} from './NavBar.styles';

type TransitionName = 'move-left' | 'move-right';

// https://github.com/TanStack/router/discussions/5766
const navLinks = [
  ['/branding', 'Branding'],
  ['/firmware', 'Firmware'],
  ['/model', 'Model'],
  ['/power-on-hours', 'Power on hours'],
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
  const [offset, setOffset] = useState<string | null>(null);
  const [prevOffset, setPrevOffset] = useState<string | null>(null);
  const [inlineSize, setInlineSize] = useState('auto');

  const currentLocation = useLocation({ select: ({ pathname }) => pathname });

  // aways reset offset and prev offset on media query change
  const isIndicatorVisible = useMediaQuery({
    mediaQuery: `(min-width: ${SCREEN_WIDTH_WHERE_INDICATOR_IS_VISIBLE}px)`,
    onChange: () => {
      setPrevOffset(null);
      setOffset(null);
    },
  });
  // set offset on every resize and set prevoffset when indicator is visible
  const activeNavBarEntryRefCallback = (activeElement: HTMLAnchorElement) => {
    const resizeObserver = new ResizeObserver(([entry]) => {
      const [elementSize] = entry.borderBoxSize;
      const { offsetLeft } = activeElement;

      setOffset((currentOffset) => {
        setPrevOffset(isIndicatorVisible ? currentOffset : null);

        return `${Math.floor(offsetLeft)}px`;
      });
      setInlineSize(`${Math.floor(elementSize.inlineSize)}px`);
    });

    resizeObserver.observe(activeElement);

    return () => {
      resizeObserver.disconnect();
    };
  };

  const navBarIndicatorCssVars: CSSProperties = {
    '--inline-size': inlineSize,
    '--offset-x': offset,
    '--has-prev-offset': prevOffset === null ? 'false' : 'true',
  };

  return (
    <NavBarWrapper>
      <NavBarIndicatorWrapper style={navBarIndicatorCssVars} aria-hidden>
        {isIndicatorVisible ? <NavBarIndicator /> : null}
      </NavBarIndicatorWrapper>
      <NavBarList $minScreenSizeIndicator={SCREEN_WIDTH_WHERE_INDICATOR_IS_VISIBLE}>
        {navLinks.map(([to, children]) => (
          <li key={to}>
            <NavBarEntry
              to={to}
              viewTransition={viewTransition}
              ref={to === currentLocation ? activeNavBarEntryRefCallback : undefined}
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
