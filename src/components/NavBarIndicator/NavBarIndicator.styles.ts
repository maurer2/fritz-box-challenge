import styled from 'styled-components';

// only used to inject CSS vars
export const NavBarIndicatorWrapper = styled.div`
  /* contain: paint; // breaks anchor positioning */
`;

export const NavBarIndicatorBar = styled.div`
  position: absolute;
  inset-block-start: 0;
  inset-inline-start: calc(anchor(start) - 1rem);
  inset-inline-end: calc(anchor(end) - 1rem);
  inset-block: 0;
  block-size: 5px;
  background: fuchsia;
  position-anchor: var(--current-anchor);
  transition-property: left, right;
  transition-duration: 0s;

  @media (prefers-reduced-motion: no-preference) {
    transition-duration: 500ms;
  }
`;
