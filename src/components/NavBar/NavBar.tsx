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

const SCREEN_WIDTH_INDICATOR = 750;

const NavBar = () => {
  const router = useRouter();

  const [oldLocation, setOldLocation] = useState<ParsedLocation | undefined>(undefined);
  const [offset, setOffset] = useState<string | null>(null);
  const [prevOffset, setPrevOffset] = useState<string | null>(null);
  const [inlineSize, setInlineSize] = useState('auto');

  const isIndicatorVisible = useMediaQuery(`(min-width: ${SCREEN_WIDTH_INDICATOR}px)`);
  const currentLocation = useLocation({ select: ({ pathname }) => pathname });

  // https://tanstack.com/router/v1/docs/framework/react/api/router/RouterEventsType
  router.subscribe('onBeforeLoad', async ({ fromLocation }) => {
    setOldLocation(fromLocation);
  });

  const activeNavBarEntryRefCallback = useCallback((activeElement: HTMLAnchorElement) => {
    const resizeObserver = new ResizeObserver(([entry]) => {
      const [elementSize] = entry.borderBoxSize;
      const { offsetLeft } = activeElement;

      setOffset((currentOffset) => {
        setPrevOffset(currentOffset);

        return `${Math.floor(offsetLeft)}px`;
      });
      setInlineSize(`${Math.floor(elementSize.inlineSize)}px`);
    });

    resizeObserver.observe(activeElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const navBarCssVars = useMemo(
    () =>
      ({
        '--inline-size': inlineSize,
        '--offset-x': isIndicatorVisible ? offset : null,
        '--has-prev-offset': prevOffset !== null ? 'true' : 'false',
      }) as const,
    [inlineSize, isIndicatorVisible, prevOffset, offset],
  );

  return (
    <NavBarWrapper>
      <NavBarIndicatorWrapper style={navBarCssVars as CSSProperties} aria-hidden>
        {isIndicatorVisible ? <NavBarIndicator /> : null}
      </NavBarIndicatorWrapper>
      <NavBarList $minScreenSizeIndicator={SCREEN_WIDTH_INDICATOR}>
        {navLinks.map(([to, children]) => {
          const viewTransition: NavigateOptions['viewTransition'] = { types: ['slide-in-and-out'] }; // todo: needs to be dynamic for direction aware transitions
          const isActiveNavLink = to === currentLocation;

          return (
            <li key={to}>
              <NavBarEntry
                to={to}
                viewTransition={viewTransition}
                ref={isActiveNavLink ? activeNavBarEntryRefCallback : null}
              >
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
