import styled from 'styled-components';
import { Link } from '@tanstack/react-router';

// ComponentProps-helper can't be used here due to circular dependency
import type { NavBarEntryProps } from './NavBarEntry';

export const NavBarEntry = styled(Link)<NavBarEntryProps>`
  padding: 1rem;
  border: 0;
  color: ${({ theme }) => theme.tertiaryColor};
  font-size: 1rem;
  font-weight: normal;
  transition: color 500ms;
  background: none;
  outline: none;
  appearance: none;

  &[aria-current='page'] {
    color: red;
    font-weight: bold;
  }
`;
