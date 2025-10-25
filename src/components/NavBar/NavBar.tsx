import {
  useState,
  useCallback,
  useRef,
  useEffect,
  useEffectEvent,
  useMemo,
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

  const isLargeScreen = useMediaQuery('(min-width: 768px)');
  const currentLocation = useLocation({ select: ({ pathname }) => pathname });

  // https://tanstack.com/router/v1/docs/framework/react/api/router/RouterEventsType
  router.subscribe('onBeforeLoad', async ({ fromLocation }) => {
    setOldLocation(fromLocation);
  });

  const navBarEntryRefCallback = useCallback(
    (to: NavLinkPath) => (anchorElement: HTMLAnchorElement | null) => {
      const isActiveNavElement = to === currentLocation;

      if (!isActiveNavElement) {
        return;
      }

      // domElement is null on first render
      if (anchorElement === null) {
        setPrevOffset(offset);

        return;
      }

      const { x, width } = anchorElement.getBoundingClientRect();

      setInlineSize(`${Math.floor(width)}px`);
      setOffset(`${Math.floor(x)}px`);
    },
    [currentLocation, offset],
  );

  const navBarCssVars = useMemo(
    () =>
      ({
        '--inline-size': inlineSize,
        '--offset-x': isLargeScreen ? offset : null,
        '--has-prev-offset': prevOffset !== null ? 'true' : 'false',
      }) as const,
    [inlineSize, isLargeScreen, prevOffset, offset],
  );

  return (
    <NavBarWrapper>
      <NavBarIndicatorWrapper style={navBarCssVars as CSSProperties} aria-hidden>
        {isLargeScreen ? <NavBarIndicator /> : null}
      </NavBarIndicatorWrapper>
      <NavBarList>
        {navLinks.map(([to, children]) => {
          const viewTransition: NavigateOptions['viewTransition'] = { types: ['slide-in-and-out'] }; // todo: needs to be dynamic for direction aware transitions

          return (
            <li key={to}>
              <NavBarEntry to={to} viewTransition={viewTransition} ref={navBarEntryRefCallback(to)}>
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
