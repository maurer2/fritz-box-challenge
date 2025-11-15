// import { useState } from 'react';

// import { useMediaQuery } from '../../hooks/useMatchMedia/useMatchMedia';

import { NavBarIndicatorWrapper, NavBarIndicatorBar } from './NavBarIndicator.styles';

type IndicatorProps = {
  currentAnchorNumber: number;
};

// const NavBarIndicator2 = lazy(() => {
//   if (CSS.supports('anchor-name: --anchor')) {
//     return import('../NavBarIndicator').then((module) => ({ default: module.NavBarIndicator }));
//   }
//   // todo
//   return import('../NavBarIndicator').then((module) => ({ default: module.NavBarIndicator }));
// });

const MIN_SIZE_SINGLE_ROW_NAV = 751;
// const query = `(min-width: ${MIN_SIZE_SINGLE_ROW_NAV}px)`;

function NavBarIndicator({ currentAnchorNumber }: IndicatorProps) {
  return (
    <NavBarIndicatorWrapper style={{ '--current-anchor': `--anchor-${currentAnchorNumber}` }}>
      <NavBarIndicatorBar $minSizeSingleRowNav={MIN_SIZE_SINGLE_ROW_NAV} />
    </NavBarIndicatorWrapper>
  );
}

export { NavBarIndicator };
