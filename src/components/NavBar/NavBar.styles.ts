import styled, { css } from 'styled-components';
import type { PropsWithChildren } from 'react';

type NavBarStyleProps = {
  $reservedSpaceTop: number;
  $isUpdating: boolean;
};

type IndicatorStyleProps = {
  offset: number;
  width: string | number;
  height: number;
};

type NavBar2StyleProps = PropsWithChildren;

export const NavBar = styled.nav<NavBarStyleProps>`
  position: relative;
  padding-top: ${({ $reservedSpaceTop }) => `${$reservedSpaceTop}px`};
  grid-area: navBar;
  will-change: transform;
  transform: translateY(0);
  transition: transform 500ms ease-out;
  ${({ $isUpdating }) =>
    $isUpdating &&
    css`
      transform: translateY(100%);
    `}
`;

export const Indicator = styled.div<IndicatorStyleProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ width }) =>
    typeof width === 'string' ? width : `${width}px`}; // might cause layout thrashing
  height: ${({ height }) => `${height}px`};
  transform: translateX(${({ offset }) => offset}px);
  transition:
    transform 500ms,
    width 500ms;
  background: ${({ theme }) => theme.primaryColor};
`;

export const NavBar2 = styled.nav<NavBar2StyleProps>`
  display: flex;
  justify-content: space-between;
  background: ${({ theme }) => theme.secondaryColor};
  contain: layout style paint;
`;
