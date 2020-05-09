import styled from 'styled-components/macro';

export const SlideYTransition = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;

  > .${(props) => props.transitionName}-appear {
    transform: translateY(100%);
    transition: transform 500ms ease-out;

    &.${(props) => props.transitionName}-appear-active {
      transform: translateY(0);
    }
  }

  > .${(props) => props.transitionName}-leave {
    transform: translateY(0);
    transition: transform 500ms ease-in;

    &.${(props) => props.transitionName}-leave-active {
      transform: translateY(100%);
    }
  }
`;

export const NavBarWrapper = styled.footer`
  position: relative;
  display: block;
  padding-top: ${(props) => props.reservedSpaceTop}px;
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
