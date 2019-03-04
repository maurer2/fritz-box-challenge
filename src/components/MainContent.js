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

  > .slide-leave {
    opacity: 1;
    transform: translateX(0) translateY(-50%);
    transition: transform 500ms, opacity 500ms;

    &.slide-leave-active {
      opacity: 0.01;
      transform: translateX(-100%) translateY(-50%);
    }
  }

  > .slide-enter {
    opacity: 0.01;
    transform: translateX(100%) translateY(-50%);
    transition: transform 500ms, opacity 500ms;

    &.slide-enter-active {
      opacity: 1;
      transform: translateX(0) translateY(-50%);
    }
  }
`;

const MainContent = (props) => {
  const { isUpdating } = props;

  return (
    <MainWrapper>
      <CSSTransitionGroup
        component={ React.Fragment }
        transitionName="slide"
        transitionEnterTimeout={ 500 }
        transitionLeaveTimeout={ 500 }
        transitionLeave={ true }
      >
        {!isUpdating && props.children}
      </CSSTransitionGroup>
    </MainWrapper>
  );
};

MainContent.propTypes = {
  isUpdating: PropTypes.bool,
  children: PropTypes.array,
};

export default MainContent;
