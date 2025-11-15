import { useState, useCallback, useMemo, type CSSProperties } from 'react';

import { useMediaQuery } from '../../hooks/useMatchMedia/useMatchMedia';

import { NavBarIndicatorWrapper, NavBarIndicator } from './NavBarIndicatorFallback.styles';

const SCREEN_WIDTH_INDICATOR = 750;

function NavBarIndicatorFallback() {
  const [offset, setOffset] = useState<string | null>(null);
  const [prevOffset, setPrevOffset] = useState<string | null>(null);
  const [inlineSize, setInlineSize] = useState('auto');

  const isIndicatorVisible = useMediaQuery({
    mediaQuery: `(min-width: ${SCREEN_WIDTH_INDICATOR}px)`,
    onChange: (isMatching) => {
      if (!isMatching) {
        setPrevOffset(null);
        setOffset(null);
      }
    },
  });

  // const activeNavBarEntryRefCallback = useCallback(
  //   (activeElement: HTMLAnchorElement) => {
  //     const resizeObserver = new ResizeObserver(([entry]) => {
  //       const [elementSize] = entry.borderBoxSize;
  //       const { offsetLeft } = activeElement;

  //       setOffset((currentOffset) => {
  //         setPrevOffset(isIndicatorVisible ? currentOffset : null);

  //         return `${Math.floor(offsetLeft)}px`;
  //       });
  //       setInlineSize(`${Math.floor(elementSize.inlineSize)}px`);
  //     });

  //     resizeObserver.observe(activeElement);

  //     return () => {
  //       resizeObserver.disconnect();
  //     };
  //   },
  //   [isIndicatorVisible],
  // );

  const navBarIndicatorCssVars = useMemo(
    () =>
      ({
        '--inline-size': inlineSize,
        '--offset-x': offset,
        '--has-prev-offset': prevOffset !== null ? 'true' : 'false',
      }) as const,
    [inlineSize, prevOffset, offset],
  );

  return (
    <NavBarIndicatorWrapper style={navBarIndicatorCssVars as CSSProperties} aria-hidden>
      {isIndicatorVisible ? <NavBarIndicator /> : null}
    </NavBarIndicatorWrapper>
  );
}

export { NavBarIndicatorFallback };
