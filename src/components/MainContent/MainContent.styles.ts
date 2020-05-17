import styled from 'styled-components/macro';

export const MainWrapper = styled.main`
  position: relative;
  grid-area: main;
  width: 100%;

  > div {
    position: absolute;
    top: 50%;
    right: 0;
    left: 0;
    transform: translateX(0) translateY(-50%);
  }

  // slide in right
  > .slide-in-right-leave {
    transform: translateX(0) translateY(-50%);
    opacity: 1;
    transition: transform 500ms, opacity 500ms;

    &.slide-in-right-leave-active {
      transform: translateX(-100%) translateY(-50%);
      opacity: 0.01;
    }
  }

  > .slide-in-right-enter {
    transform: translateX(100%) translateY(-50%);
    opacity: 0.01;
    transition: transform 500ms, opacity 500ms;

    &.slide-in-right-enter-active {
      transform: translateX(0) translateY(-50%);
      opacity: 1;
    }
  }

  > .slide-in-right-appear {
    opacity: 0.01;
    transition: opacity 1000ms;

    &.slide-in-right-appear-active {
      opacity: 1;
    }
  }

  // slide in left
  > .slide-in-left-leave {
    transform: translateX(0) translateY(-50%);
    opacity: 1;
    transition: transform 500ms, opacity 500ms;

    &.slide-in-left-leave-active {
      transform: translateX(100%) translateY(-50%);
      opacity: 0.01;
    }
  }

  > .slide-in-left-enter {
    transform: translateX(-100%) translateY(-50%);
    opacity: 0.01;
    transition: transform 500ms, opacity 500ms;

    &.slide-in-left-enter-active {
      transform: translateX(0) translateY(-50%);
      opacity: 1;
    }
  }

  > .slide-in-left-appear {
    opacity: 0.01;
    transition: opacity 1000ms;

    &.slide-in-left-appear-active {
      opacity: 1;
    }
  }
`;
