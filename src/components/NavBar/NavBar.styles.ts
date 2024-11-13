import styled, { css } from 'styled-components';

import type { NavBarStyleProps, IndicatorStyleProps, NavBarListStyleProps } from './NavBar.types';

export const NavBar = styled.nav<NavBarStyleProps>`
  position: relative;
  padding-top: ${({ $reservedSpaceTop }) => `${$reservedSpaceTop}px`};
  grid-area: navBar;
  will-change: transform;
  transform: translateY(0);
  transition: transform 500ms ease-out;
  ${({ $isUpdating }) => $isUpdating
    && css`
      transform: translateY(100%);
    `}
`;

export const Indicator = styled.div<IndicatorStyleProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ width }) => (typeof width === 'string' ? width : `${width}px`)}; // might cause layout thrashing
  height: ${({ height }) => `${height}px`};
  transform: translateX(${({ offset }) => offset}px);
  transition: transform 500ms, width 500ms;
  background: ${({ theme }) => theme.primaryColor};
`;

export const NavBarList = styled.ul<NavBarListStyleProps>`
  display: flex;
  margin: 0;
  padding: 0;
  flex-wrap: ${({ $isRow }) => ($isRow ? 'nowrap' : 'wrap')};
  justify-content: space-between;
  list-style: none;
  background: ${({ theme }) => theme.secondaryColor};
`;
