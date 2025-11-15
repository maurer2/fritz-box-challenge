import styled from 'styled-components';
import { Link } from '@tanstack/react-router';

type NavBarListProps = {
  $minScreenSizeIndicator: number;
};

export const NavBarWrapper = styled.nav`
  position: sticky;
  bottom: 0;
  display: grid;
  grid-template-rows: 5px auto;
  container-type: inline-size;
  container-name: navbar;
`;

export const NavBarList = styled.ul<NavBarListProps>`
  display: grid;
  margin: 0;
  padding: 0;
  grid-template-columns: repeat(auto-fit, minmax(175px, 1fr));
  list-style: none;
  background: ${({ theme }) => theme.secondaryColor};

  @container navbar (width > ${({ $minScreenSizeIndicator }) => $minScreenSizeIndicator}px) {
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
  border: 0;
  font-weight: bold;
  background: none;
  color: ${({ theme }) => theme.tertiaryColor};
  text-decoration: none;
  text-align: center;

  &[aria-current='page'] {
    color: ${({ theme }) => theme.highlightColor};
  }

  &:where(:hover, :focus-visible) {
    text-decoration: underline;
    text-decoration-thickness: 3px;
    text-underline-offset: 6px;
  }

  &:focus-visible {
    // https://www.w3.org/WAI/WCAG21/Techniques/css/C40
    /* inner indicator */
    outline: 2px #f9f9f9 solid;
    outline-offset: 0;
    /* outer indicator */
    box-shadow: 0 0 0 4px #193146;
  }
`;
