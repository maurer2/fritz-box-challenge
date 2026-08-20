import { styled } from 'styled-components';

// only used to inject CSS vars
export const NavBarIndicatorWrapper = styled.div`
  container-type: inline-size;
  /* contain: paint; // breaks anchor positioning */
`;

export const NavBarIndicatorBar = styled.div`
  position: absolute;
  inset-block-start: anchor(top);
  inset-inline-start: anchor(start);
  inline-size: anchor-size(width);
  block-size: 5px;
  position-anchor: var(--current-anchor);
  background: ${({ theme }) => theme.colors.highlightColor};

  @container style(--is-single-row-nav: true) {
    inset-block-start: 0;

    /* prefers-reduced-motion is handled globally via "--animation-duration: 0s" in Theme file */
    /* stylelint-disable-next-line defensive-css/require-prefers-reduced-motion */
    view-transition-name: nav-indicator;
  }
`;
