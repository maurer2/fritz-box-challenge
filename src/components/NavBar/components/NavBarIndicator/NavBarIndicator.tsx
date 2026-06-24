import { lazy, useState, type CSSProperties } from 'react';

import { useMediaQuery } from '../../../../hooks/useMatchMedia/useMatchMedia';
import { SCREEN_WIDTH_WHERE_INDICATOR_IS_VISIBLE } from '../../../Theme/tokens';
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
};

function NavBarIndicator({ activeNavBarEntry, activeNavBarEntryIndex }: IndicatorProps) {
  const [shouldTransition, setShouldTransition] = useState(false);
  const [previousNavBarEntryIndex, setPreviousNavBarEntryIndex] = useState(activeNavBarEntryIndex);
  const isPreferingMotion = useMediaQuery({
    mediaQuery: '(prefers-reduced-motion: no-preference)',
  });
  // should never transition when going from desktop to mobile and vice versa
  // todo: use style query as well somehow
  const isDesktop = useMediaQuery({
    mediaQuery: `(min-width: ${SCREEN_WIDTH_WHERE_INDICATOR_IS_VISIBLE}px)`,
    onChange: () => {
      setShouldTransition(false);
    },
  });

  // allow transitions on navigation but block them on resize
  // transitionEnd is not fired when "prefers-reduced-motion" is enabled or if transition duration is 0
  if (previousNavBarEntryIndex !== activeNavBarEntryIndex) {
    setPreviousNavBarEntryIndex(activeNavBarEntryIndex);

    if (isDesktop && isPreferingMotion) {
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
      <NavBarIndicatorBar onTransitionEnd={handleTransitionEnd} />
    </NavBarIndicatorWrapper>
  );
}

export { NavBarIndicator };
