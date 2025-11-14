import { NavBarIndicatorWrapper, NavBarIndicatorBar } from './NavBarIndicator.styles';

type IndicatorProps = {
  currentAnchorNumber: number;
};

function NavBarIndicator({ currentAnchorNumber }: IndicatorProps) {
  return (
    <NavBarIndicatorWrapper style={{ '--current-anchor': `--anchor-${currentAnchorNumber}` }}>
      <NavBarIndicatorBar />
    </NavBarIndicatorWrapper>
  );
}

export { NavBarIndicator };
