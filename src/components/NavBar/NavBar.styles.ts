import styled from 'styled-components';
import { Link } from '@tanstack/react-router';

export const NavBarWrapper = styled.nav`
  position: sticky;
  inset-block-end: 0;
  display: grid;
  grid-template-rows: [indicator] 5px [navbar] auto;
  container-type: inline-size;
`;

export const NavBarList = styled.ul`
  display: grid;
  /* stylelint-disable-next-line defensive-css/require-named-grid-lines */
  grid-template-columns: repeat(auto-fit, minmax(175px, 1fr));
  grid-row-start: navbar;
  padding: 0;
  margin: 0;
  list-style: none;
  background: ${({ theme }) => theme.colors.secondaryColor};

  /* https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_size_and_style_queries#registered_properties */
  /* CSS vars via defineProperty are always true if they have a different value than the default */
  @container style(--is-single-row-nav: true) {
    /* stylelint-disable-next-line defensive-css/require-named-grid-lines */
    grid-template-columns: none;
    grid-auto-columns: minmax(max-content, 1fr);
    grid-auto-flow: column;
  }

  /* custom media queries not supported anywhere */
  /*
  @media (--large-screen) {
    grid-template-columns: none;
    grid-auto-columns: minmax(max-content, 1fr);
    grid-auto-flow: column;
  }
  */

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
