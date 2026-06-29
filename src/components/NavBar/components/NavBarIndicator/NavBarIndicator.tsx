import { NavBarIndicatorWrapper, NavBarIndicatorBar } from './NavBarIndicator.styles';

type NavBarIndicatorProps = {
  activeNavBarEntryIndex: number;
};

function NavBarIndicator({ activeNavBarEntryIndex }: NavBarIndicatorProps) {
  return (
    <NavBarIndicatorWrapper style={{ '--current-anchor': `--anchor-${activeNavBarEntryIndex}` }}>
      <NavBarIndicatorBar />
    </NavBarIndicatorWrapper>
  );
}

export { NavBarIndicator };
