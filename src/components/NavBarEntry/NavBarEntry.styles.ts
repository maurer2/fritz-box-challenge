import styled from 'styled-components';
import { Link } from '@tanstack/react-router';

// ComponentProps-helper can't be used here due to circular dependency
import type { NavBarEntryProps } from './NavBarEntry';

export const NavBarEntry = styled(Link)<NavBarEntryProps>`
  padding: 1rem;
  border: 0;
  color: ${({ theme }) => theme.tertiaryColor};
  font-weight: normal;
  background: none;
  text-decoration: none;

  &[aria-current='page'] {
    color: red;
    font-weight: bold;
  }

  &:where(:hover, :focus) {
    text-decoration: underline;
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
