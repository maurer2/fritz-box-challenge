import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useEffectEvent,
  type CSSProperties,
  type ComponentProps,
  type ReactNode,
} from 'react';
import {
  useRouter,
  useLocation,
  type ParsedLocation,
  type NavigateOptions,
} from '@tanstack/react-router';

import {
  NavBarWrapper,
  NavBarList,
  NavBarIndicatorWrapper,
  NavBarIndicator,
  NavBarEntry,
} from './NavBar.styles';

// prettier-ignore
type NavLinkPath = NonNullable<(ComponentProps<typeof NavBarEntry>)['to']>;

const navLinks: [path: NavLinkPath, children: ReactNode][] = [
  ['/branding', 'Branding'],
  ['/firmware', 'Firmware'],
  ['/model', 'Model'],
  ['/power-on-hours', 'Power on hours'],
  ['/restarts', 'Restarts'],
  ['/technology', 'Technology'],
];

const NavBar = () => {
  const router = useRouter();

  const [oldLocation, setOldLocation] = useState<ParsedLocation | undefined>(undefined);
  const [offset, setOffset] = useState<string | null>(null);
  const [prevOffset, setPrevOffset] = useState<string | null>(null);
  const [inlineSize, setInlineSize] = useState('auto');

  // const [newLocation, setNewLocation] = useState<ParsedLocation | undefined>(undefined);
  const currentLocation = useLocation({ select: ({ pathname }) => pathname });

  // const navLinksDomElements = useRef<HTMLAnchorElement[]>([]);

  // https://tanstack.com/router/v1/docs/framework/react/api/router/RouterEventsType
  router.subscribe('onBeforeLoad', async ({ toLocation, fromLocation }) => {
    setOldLocation(fromLocation);
    // setNewLocation(toLocation);
  });

  // called on reach render
  const entryRefCallback = (to: NavLinkPath) => (domElement: HTMLAnchorElement | null) => {
    const isActiveNavElement = to === currentLocation;

    if (!isActiveNavElement) {
      return;
    }

    // domElement is null on first render
    if (domElement === null) {
      setPrevOffset(offset);
    }

    if (domElement !== null) {
      const { x, width: widthBB } = domElement.getBoundingClientRect();

      setInlineSize(`${Math.floor(widthBB)}px`);
      setOffset(`${Math.floor(x)}px`);
    }
  };

  const cssVars = {
    '--inline-size': inlineSize,
    '--offset-x': offset,
    '--has-prev-offset': prevOffset !== null ? 'true' : 'false',
  } as const;

  return (
    <NavBarWrapper>
      <NavBarIndicatorWrapper style={cssVars as CSSProperties} aria-hidden>
        <NavBarIndicator />
      </NavBarIndicatorWrapper>
      <NavBarList>
        {navLinks.map(([to, children]) => {
          const viewTransition: NavigateOptions['viewTransition'] = { types: ['slide-in-and-out'] }; // todo: needs to be dynamic for direction aware transitions

          return (
            <li key={to}>
              <NavBarEntry to={to} viewTransition={viewTransition} ref={entryRefCallback(to)}>
                {children}
              </NavBarEntry>
            </li>
          );
        })}
      </NavBarList>
    </NavBarWrapper>
  );
};

export { NavBar };
