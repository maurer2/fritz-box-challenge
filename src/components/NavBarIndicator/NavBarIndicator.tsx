import { lazy, useState, useEffect, type CSSProperties } from 'react';

import { useMediaQuery } from '../../hooks/useMatchMedia/useMatchMedia';

import { NavBarIndicatorWrapper, NavBarIndicatorBar } from './NavBarIndicator.styles';

const NavBarIndicatorFallback = lazy(() => {
  if (!CSS.supports('anchor-name: --anchor')) {
    return import('../NavBarIndicatorFallback/NavBarIndicatorFallback').then((module) => ({
      default: module.NavBarIndicatorFallback,
    }));
  }
  return Promise.resolve({
    default: () => <div>Dummy component</div>,
  });
});

type IndicatorProps = {
  activeNavBarEntry?: HTMLAnchorElement | null;
  activeNavBarEntryIndex: number;
  minScreenSizeIndicator: number;
};

function NavBarIndicator({
  activeNavBarEntry,
  activeNavBarEntryIndex,
  minScreenSizeIndicator,
}: IndicatorProps) {
  console.log(activeNavBarEntry, activeNavBarEntryIndex); // needed for fallback

  const [prevAnchorIndex, setPrevAnchorIndex] = useState<number | null>(null);

  const isDesktop = useMediaQuery({
    mediaQuery: `(min-width: ${minScreenSizeIndicator}px)`,
    onChange: (isMatching) => {
      if (!isMatching) setPrevAnchorIndex(null);
    },
  });

  // useEffect (not useLayoutEffect) so the browser paints one frame with --has-prev-anchor: false
  // before we set prevAnchorIndex, ensuring no transition fires on mobile→desktop resize
  useEffect(() => {
    if (isDesktop) setPrevAnchorIndex(activeNavBarEntryIndex);
  }, [activeNavBarEntryIndex, isDesktop]);

  return (
    <NavBarIndicatorWrapper
      style={
        {
          '--current-anchor': `--anchor-${activeNavBarEntryIndex}`,
          '--has-prev-anchor': prevAnchorIndex !== null ? 'true' : 'false',
        } as CSSProperties
      }
    >
      <NavBarIndicatorBar $minSizeSingleRowNav={minScreenSizeIndicator} />
    </NavBarIndicatorWrapper>
  );
}

export { NavBarIndicator };
