import { useState, type CSSProperties, type ComponentProps, type ReactNode } from 'react';
import { useLocation, type NavigateOptions } from '@tanstack/react-router';

import { useMediaQuery } from '../../hooks/useMatchMedia/useMatchMedia';

import {
  NavBarWrapper,
  NavBarList,
  NavBarIndicatorWrapper,
  NavBarIndicator,
  NavBarEntry,
} from './NavBar.styles';

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
  const [offset, setOffset] = useState<string | null>(null);
  const [prevOffset, setPrevOffset] = useState<string | null>(null);
  const [inlineSize, setInlineSize] = useState('auto');

  const currentLocation = useLocation({ select: ({ pathname }) => pathname });

  const isIndicatorVisible = useMediaQuery({
    mediaQuery: `(min-width: ${SCREEN_WIDTH_INDICATOR}px)`,
    onChange: (isMatching) => {
      if (!isMatching) {
        setPrevOffset(null);
        setOffset(null);
      }
    },
  });
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

  const navBarIndicatorCssVars = {
    '--inline-size': inlineSize,
    '--offset-x': offset,
    '--has-prev-offset': prevOffset !== null ? 'true' : 'false',
  } as const;

  return (
    <NavBarWrapper>
      <NavBarIndicatorWrapper style={navBarIndicatorCssVars as CSSProperties} aria-hidden>
        {isIndicatorVisible ? <NavBarIndicator /> : null}
      </NavBarIndicatorWrapper>
      <NavBarList $minScreenSizeIndicator={SCREEN_WIDTH_INDICATOR}>
        {navLinks.map(([to, children]) => (
          <li key={to}>
            <NavBarEntry
              to={to}
              viewTransition={viewTransition}
              ref={to === currentLocation ? activeNavBarEntryRefCallback : null}
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
