import styled from 'styled-components';
import { Link } from '@tanstack/react-router';

type NavBarListProps = {
  $minScreenSizeIndicator: number;
};

export const NavBarWrapper = styled.nav`
  position: sticky;
  inset-block-end: 0;
  display: grid;
  grid-template-rows: [indicator] 5px [navbar] auto;
  container-name: navbar;
  container-type: inline-size;
`;

export const NavBarIndicatorWrapper = styled.div`
  position: relative;
  contain: layout style paint;
  container-name: navbar-indicator-wrapper;
  container-type: inline-size;
`;

export const NavBarIndicator = styled.div`
  position: absolute;
  inset-block: 0;
  inset-inline-start: 0;
  inline-size: var(--inline-size, 'auto');
  background: ${({ theme }) => theme.colors.primaryColor};
  translate: var(--offset-x, 0);
  transition-duration: 0s;
  transition-property: inline-size;

  @container navbar-indicator-wrapper style(--has-prev-offset: true) {
    transition-property: translate, inline-size;
  }

  @media (prefers-reduced-motion: no-preference) {
    transition-duration: 500ms;
  }
`;

export const NavBarList = styled.ul<NavBarListProps>`
  display: grid;
  /* stylelint-disable-next-line defensive-css/require-named-grid-lines */
  grid-template-columns: repeat(auto-fit, minmax(175px, 1fr));
  padding: 0;
  margin: 0;
  list-style: none;
  background: ${({ theme }) => theme.colors.secondaryColor};

  @container navbar (width > ${({ $minScreenSizeIndicator }) => $minScreenSizeIndicator}px) {
    /* stylelint-disable-next-line defensive-css/require-named-grid-lines */
    grid-template-columns: none;
    grid-auto-columns: minmax(max-content, 1fr);
    grid-auto-flow: column;
  }

  > li {
    display: contents;
  }
`;

export const NavBarEntry = styled(Link)`
  padding-block: 1rem;
  padding-inline: 1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.tertiaryColor};
  text-align: center;
  text-decoration: none;
  background: none;
  border: 0;

  /* todo: https://defensivecss.dev/tip/hover-media/ */
  &:where(:hover, :focus-visible) {
    text-decoration: underline;
    text-decoration-thickness: 3px;
    text-underline-offset: 6px;
  }

  &:focus-visible {
    /* https://www.w3.org/WAI/WCAG21/Techniques/css/C40 */

    /* inner indicator */
    outline: 2px #f9f9f9 solid;
    outline-offset: 0;

    /* outer indicator */
    box-shadow: 0 0 0 4px #193146;
  }
`;
