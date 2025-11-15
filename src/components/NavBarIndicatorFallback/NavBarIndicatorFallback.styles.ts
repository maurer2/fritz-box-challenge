import styled from 'styled-components';

export const NavBarIndicatorWrapper = styled.div`
  position: relative;
  container-type: inline-size;
  container-name: navbar-indicator-wrapper;
  contain: layout style paint;
`;

export const NavBarIndicator = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  inline-size: var(--inline-size, 'auto');
  inset-block: 0;
  background: ${({ theme }) => theme.primaryColor};
  translate: var(--offset-x, 0px);
  transition-property: inline-size;
  transition-duration: 0;

  @container navbar-indicator-wrapper style(--has-prev-offset: true) {
    transition-property: translate, inline-size;
  }
  @media (prefers-reduced-motion: no-preference) {
    transition-duration: 500ms;
  }
`;
