import { lazy, useState, type CSSProperties } from 'react';

import { useMediaQuery } from '../../../../hooks/useMatchMedia/useMatchMedia';
import { NavBarIndicatorWrapper, NavBarIndicatorBar } from './NavBarIndicator.styles';

// const NavBarIndicatorFallback = lazy(() => {
//   if (!CSS.supports('anchor-name: --anchor')) {
//     return import('../NavBarIndicatorFallback/NavBarIndicatorFallback').then((module) => ({
//       default: module.NavBarIndicatorFallback,
//     }));
//   }
//   return Promise.resolve({
//     default: () => <div>Dummy component</div>,
//   });
// });

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
  // console.log(activeNavBarEntry, activeNavBarEntryIndex); // needed for fallback

  const [shouldTransition, setShouldTransition] = useState(false);
  const [previousNavBarEntryIndex, setPreviousNavBarEntryIndex] = useState(activeNavBarEntryIndex);
  const isPreferingMotion = useMediaQuery({
    mediaQuery: '(prefers-reduced-motion: no-preference)',
  });

  // allow transitions on navigation but block them on resize or when switching from mobile to desktop and vice versa
  // transitionEnd is not fired when "prefers-reduced-motion" is enabled or if transition duration is 0
  if (previousNavBarEntryIndex !== activeNavBarEntryIndex) {
    setPreviousNavBarEntryIndex(activeNavBarEntryIndex);

    if (isPreferingMotion) {
      setShouldTransition(true);
    }
  }

  const handleTransitionEnd = () => {
    setShouldTransition(false);
  };

  return (
    <NavBarIndicatorWrapper
      style={
        {
          '--current-anchor': `--anchor-${activeNavBarEntryIndex}`,
          '--should-transition': shouldTransition ? 'true' : 'false',
        } as CSSProperties
      }
    >
      <NavBarIndicatorBar
        $minSizeSingleRowNav={minScreenSizeIndicator}
        onTransitionEnd={handleTransitionEnd}
      />
    </NavBarIndicatorWrapper>
  );
}

export { NavBarIndicator };
