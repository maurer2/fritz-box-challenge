import styled from 'styled-components';

import type { NavBarEntryWrapperStyleProps, NavBarButtonStyleProps } from './NavBarEntry.types';

export const NavBarEntryWrapper = styled.li<NavBarEntryWrapperStyleProps>`
  flex: 1 0 ${(props) => (props.$isFullWidth ? '33%' : '0')};
`;

export const defaultButton = styled.button`
  padding: 1rem;
  background: none;
  outline: none;
  appearance: none;
`;

export const NavBarButton = styled(defaultButton)<NavBarButtonStyleProps>`
  display: block;
  width: 100%;
  border: 0;
  color: ${({ theme }) => theme.tertiaryColor};
  font-weight: ${({ $isActive }) => ($isActive ? 'bold' : 'normal')};
  font-size: 1rem;
  transition: color 500ms;
  cursor: pointer;
`;
