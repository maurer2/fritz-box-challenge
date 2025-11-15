import styled from 'styled-components';

type NavBarIndicatorBarProps = {
  $minSizeSingleRowNav: number;
};

// only used to inject CSS vars
export const NavBarIndicatorWrapper = styled.div`
  /* contain: paint; // breaks anchor positioning */
`;

export const NavBarIndicatorBar = styled.div<NavBarIndicatorBarProps>`
  position: absolute;
  inset-block-start: anchor(top);
  inset-inline-start: anchor(start);
  inset-inline-end: anchor(end);
  block-size: 5px;
  position-anchor: var(--current-anchor);
  background: ${({ theme }) => theme.highlightColor};

  @media (width > ${({ $minSizeSingleRowNav }) => $minSizeSingleRowNav}px) {
    inset-block-start: 0;
    transition-duration: 0s;
    transition-property: left, right;

    @media (prefers-reduced-motion: no-preference) {
      transition-duration: 500ms;
    }
  }
`;
