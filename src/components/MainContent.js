import React from 'react';
import styled from 'styled-components/macro';
import { CSSTransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';

const MainWrapper = styled.main`
  position: relative;
  display: block;
  width: 100%;

  .slide-leave {
    position: relative;
    transform: translateX(0);
    transition: transform 500ms;

    &.slide-leave-active {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      transform: translateX(-100%);
    }
  }

  .slide-enter {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    transform: translateX(100%);
    transition: transform 500ms;

    &.slide-enter-active {
      position: relative;
      transform: translateX(0);
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
