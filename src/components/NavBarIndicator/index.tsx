import { lazy } from 'react';
// import { useMediaQuery } from '../../hooks/useMatchMedia/useMatchMedia';

import { NavBarIndicatorWrapper, NavBarIndicatorBar } from './NavBarIndicator.styles';

const NavBarIndicatorFallback = lazy(() => {
  if (!CSS.supports('anchor-name: --anchor')) {
    return import('../NavBarIndicatorFallback').then((module) => ({
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

  return (
    <NavBarIndicatorWrapper style={{ '--current-anchor': `--anchor-${activeNavBarEntryIndex}` }}>
      <NavBarIndicatorBar $minSizeSingleRowNav={minScreenSizeIndicator} />
    </NavBarIndicatorWrapper>
  );
}

export { NavBarIndicator };
