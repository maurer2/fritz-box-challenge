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

  > .${props => props.transitionName}-leave {
    opacity: 1;
    transform: translateX(0) translateY(-50%);
    transition: transform 500ms, opacity 500ms;

    &.${props => props.transitionName}-leave-active {
      opacity: 0.01;
      transform: translateX(-100%) translateY(-50%);
    }
  }

  > .${props => props.transitionName}-enter {
    opacity: 0.01;
    transform: translateX(100%) translateY(-50%);
    transition: transform 500ms, opacity 500ms;

    &.${props => props.transitionName}-enter-active {
      opacity: 1;
      transform: translateX(0) translateY(-50%);
    }
  }

  > .${props => props.transitionName}-appear {
    opacity: 0.01;
    transition: opacity 1000ms;

    &.${props => props.transitionName}-appear-active {
      opacity: 1;
    }
  }
`;

const MainContent = ({ handleClick, children }) => {
  const transitionName = 'slide';

  return (
    <MainWrapper onClick={ handleClick } transitionName={ transitionName }>
      <CSSTransitionGroup
        component={ React.Fragment }
        transitionName={ transitionName }
        transitionEnterTimeout={ 500 }
        transitionLeaveTimeout={ 500 }
        transitionAppearTimeout={ 1000 }
        transitionLeave={ true }
        transitionAppear={ true }
      >
        { children }
      </CSSTransitionGroup>
    </MainWrapper>
  );
};

MainContent.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func,
};

export default MainContent;
