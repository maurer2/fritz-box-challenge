import { NavBarIndicatorWrapper, NavBarIndicatorBar } from './NavBarIndicator.styles';

type IndicatorProps = {
  currentAnchorNumber: number;
};

const MIN_SIZE_SINGLE_ROW_NAV = 750;

function NavBarIndicator({ currentAnchorNumber }: IndicatorProps) {
  return (
    <NavBarIndicatorWrapper style={{ '--current-anchor': `--anchor-${currentAnchorNumber}` }}>
      <NavBarIndicatorBar $minSizeSingleRowNav={MIN_SIZE_SINGLE_ROW_NAV} />
    </NavBarIndicatorWrapper>
  );
}

export { NavBarIndicator };
