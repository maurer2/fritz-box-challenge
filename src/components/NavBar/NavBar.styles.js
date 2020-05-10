import styled, { css } from 'styled-components/macro';

export const NavBar = styled.div`
  position: relative;
  padding-top: ${({ reservedSpaceTop }) => reservedSpaceTop}px;
  grid-area: navBar;
  will-change: transform;
  transform: translateY(0);
  transition: transform 500ms ease-out;

  ${({ isUpdating }) => isUpdating && css`
    transform: translateY(100%);
  `}
`;

export const Indicator = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => (props.width === 'auto' ? props.width : `${props.width}px`)}; // might cause layout thrashing
  height: ${(props) => props.height}px;
  transform: translateX(${(props) => props.offset}px);
  transition: transform 500ms, width 500ms;
  background: white;
`;

export const NavBarList = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  flex-wrap: ${(props) => (props.isRow ? 'no-wrap' : 'wrap')};
  justify-content: space-between;
  list-style: none;
  background: #BDBDBD;
`;
