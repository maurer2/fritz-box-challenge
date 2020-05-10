import styled from 'styled-components/macro';

export const UpdateBar = styled.aside`
  grid-area: updateBar;
  position: relative;
`;

export const SlideYTransition = styled.div`
  > .${(props) => props.transitionName}-appear {
    transform: translateY(-100%);
    transition: transform 500ms ease-out;

    &.${(props) => props.transitionName}-appear-active {
      transform: translateY(0);
    }
  }

  > .${(props) => props.transitionName}-leave {
    transform: translateY(0);
    transition: transform 500ms ease-in;

    &.${(props) => props.transitionName}-leave-active {
      transform: translateY(-100%);
    }
  }
`;

export const Text = styled.div`
  padding: 1rem;
  text-align: center;
  font-size: 1rem;
  background: gray;
`;
