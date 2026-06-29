import { useState, useMemo, useLayoutEffect } from 'react';

import { useMediaQuery } from '../../../../hooks/useMatchMedia/useMatchMedia';

import { NavBarIndicatorWrapper, NavBarIndicator } from './NavBarIndicatorFallback.styles';

type NavBarIndicatorFallbackProps = {
  activeNavBarEntry?: HTMLAnchorElement | null;
  minScreenSizeIndicator: number;
};

// uses offset calculations
function NavBarIndicatorFallback({
  activeNavBarEntry,
  minScreenSizeIndicator,
}: NavBarIndicatorFallbackProps) {
  const [offset, setOffset] = useState<string | null>(null);
  const [prevOffset, setPrevOffset] = useState<string | null>(null);
  const [inlineSize, setInlineSize] = useState('auto');

  const isIndicatorVisible = useMediaQuery({
    mediaQuery: `(min-width: ${minScreenSizeIndicator}px)`,
    onChange: (isMatching) => {
      if (!isMatching) {
        setPrevOffset(null);
        setOffset(null);
      }
    },
  });

  useLayoutEffect(() => {
    if (!activeNavBarEntry) {
      return;
    }

    const { width } = activeNavBarEntry.getBoundingClientRect();
    const { offsetLeft } = activeNavBarEntry;

    // eslint-disable-next-line react-hooks/set-state-in-effect react/react-compiler
    setOffset((currentOffset) => {
      setPrevOffset(isIndicatorVisible ? currentOffset : null);

      return `${Math.floor(offsetLeft)}px`;
    });
    setInlineSize(`${Math.floor(width)}px`);
  }, [activeNavBarEntry, isIndicatorVisible]);

  const navBarIndicatorCssVars = useMemo(
    () =>
      ({
        '--inline-size': inlineSize,
        '--offset-x': offset,
        '--has-prev-offset': prevOffset === null ? 'false' : 'true',
      }) as const,
    [inlineSize, prevOffset, offset],
  );

  return (
    <NavBarIndicatorWrapper style={navBarIndicatorCssVars} aria-hidden>
      {isIndicatorVisible ? <NavBarIndicator /> : null}
    </NavBarIndicatorWrapper>
  );
}

export { NavBarIndicatorFallback };
