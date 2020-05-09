import styled from 'styled-components/macro';

export const MainWrapper = styled.main`
  position: relative;
  width: 100%;

  > div {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateX(0) translateY(-50%);
  }

  // slide in right
  > .slide-in-right-leave {
    opacity: 1;
    transform: translateX(0) translateY(-50%);
    transition: transform 500ms, opacity 500ms;

    &.slide-in-right-leave-active {
      opacity: 0.01;
      transform: translateX(-100%) translateY(-50%);
    }
  }

  > .slide-in-right-enter {
    opacity: 0.01;
    transform: translateX(100%) translateY(-50%);
    transition: transform 500ms, opacity 500ms;

    &.slide-in-right-enter-active {
      opacity: 1;
      transform: translateX(0) translateY(-50%);
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
    opacity: 1;
    transform: translateX(0) translateY(-50%);
    transition: transform 500ms, opacity 500ms;

    &.slide-in-left-leave-active {
      opacity: 0.01;
      transform: translateX(100%) translateY(-50%);
    }
  }

  > .slide-in-left-enter {
    opacity: 0.01;
    transform: translateX(-100%) translateY(-50%);
    transition: transform 500ms, opacity 500ms;

    &.slide-in-left-enter-active {
      opacity: 1;
      transform: translateX(0) translateY(-50%);
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
