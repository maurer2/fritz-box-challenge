import styled from 'styled-components';

type NavBarIndicatorBarProps = {
  $minSizeSingleRowNav: number;
};

// only used to inject CSS vars
export const NavBarIndicatorWrapper = styled.div`
  container-type: inline-size;
  /* contain: paint; // breaks anchor positioning */
`;

export const NavBarIndicatorBar = styled.div<NavBarIndicatorBarProps>`
  position: absolute;
  inset-block-start: anchor(top);
  inset-inline-start: anchor(start);
  inline-size: anchor-size(width);
  block-size: 5px;
  position-anchor: var(--current-anchor);
  background: ${({ theme }) => theme.colors.highlightColor};

  @media (width > ${({ $minSizeSingleRowNav }) => $minSizeSingleRowNav}px) {
    inset-block-start: 0;
    transition-duration: 0s;
    transition-property: inset-inline-start, inline-size;

    @media (prefers-reduced-motion: no-preference) {
      @container style(--should-transition: true) {
        transition-duration: 500ms;
      }
    }
  }
`;
