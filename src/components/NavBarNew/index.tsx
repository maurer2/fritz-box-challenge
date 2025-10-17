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
  useRouterState,
  useRouter,
  useLocation,
  type ParsedLocation,
  type NavigateOptions,
} from '@tanstack/react-router';

import { NavBar } from '../NavBar/NavBar';
import { NavBar2 } from '../NavBar/NavBar.styles';
import { NavBarEntry } from '../NavBarEntry';

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

const NavBarNew = () => {
  const router = useRouter();

  const [oldLocation, setOldLocation] = useState<ParsedLocation | undefined>(undefined);
  const [offset, setOffset] = useState<string | null>(null);
  const [prevOffset, setPrevOffset] = useState<string | null>(null);
  const [width, setWidth] = useState('auto');

  // const [newLocation, setNewLocation] = useState<ParsedLocation | undefined>(undefined);
  const currentLocation = useLocation({ select: ({ pathname }) => pathname });

  // const navLinksDomElements = useRef<HTMLAnchorElement[]>([]);

  // https://tanstack.com/router/v1/docs/framework/react/api/router/RouterEventsType
  router.subscribe('onBeforeLoad', async ({ toLocation, fromLocation }) => {
    setOldLocation(fromLocation);
    // setNewLocation(toLocation);
  });

  // called on reach render
  const entryRefCallback = (path: NavLinkPath) => (domElement: HTMLAnchorElement) => {
    const isActiveNavElement = path === currentLocation;

    // domElement is null on first render
    if (isActiveNavElement && domElement === null) {
      setPrevOffset(offset);
    }

    if (isActiveNavElement && domElement !== null) {
      const { x, width: widthBB } = domElement.getBoundingClientRect();

      setOffset(`${Math.floor(x)}px`);
      setWidth(`${Math.floor(widthBB)}px`);
    }
  };

  return (
    <>
      <NavBar2>
        {navLinks.map(([to, children]) => {
          const viewTransition: NavigateOptions['viewTransition'] = { types: ['test'] }; // todo: needs to be dynamic for direction aware transitions

          return (
            <NavBarEntry
              to={to}
              viewTransition={viewTransition}
              ref={entryRefCallback(to)}
              key={to}
            >
              {children}
            </NavBarEntry>
          );
        })}
      </NavBar2>
      {/* temp */}
      <div
        style={
          {
            inlineSize: width,
            blockSize: '5px',
            background: 'red',
            translate: offset,
            transition: prevOffset === null ? undefined : 'all 0.5s',
          } as CSSProperties
        }
        aria-hidden
      />
      ;
    </>
  );
};

export { NavBarNew };
