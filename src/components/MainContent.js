import React from 'react';
import styled from 'styled-components/macro';
import { CSSTransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';

const MainWrapper = styled.main`
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

const MainContent = ({ handleClick, currentIndex, oldIndex, children }) => {
  const slideInFromRight = currentIndex > oldIndex;

  return (
    <MainWrapper onClick={ handleClick }>
      <CSSTransitionGroup
        component={ React.Fragment }
        transitionName={ slideInFromRight ? 'slide-in-right' : 'slide-in-left' }
        transitionEnterTimeout={ 500 }
        transitionLeaveTimeout={ 500 }
        transitionAppearTimeout={ 100 }
        transitionLeave={ true }
        transitionAppear={ true }
      >
        { children }
      </CSSTransitionGroup>
    </MainWrapper>
  );
};

MainContent.propTypes = {
  currentIndex: PropTypes.number.isRequired,
  oldIndex: PropTypes.number.isRequired,
  children: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default MainContent;
