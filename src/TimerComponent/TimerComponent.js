import React, { PureComponent } from 'react';
import styled from 'styled-components/macro';
import { PropTypes } from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';

const TimerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 2.5vh 2.5vw;
  text-align: center;
  font-size: 5vw;
  background: red;
`;

const FadeTransition = styled.div`
  .slide-up-appear,
  .slide-up-enter {
    transform: translateY(-100%);
  }

  .slide-up-appear.slide-up-appear-active,
  .slide-up-enter.slide-up-enter-active {
    transform: translateY(0);
    transition: transform 250ms ease-out;
  }

  .slide-up-leave {
    transform: translateY(0);
  }

  .slide-up-leave.slide-up-leave-active {
    transform: translateY(-100%);
    transition: transform 250ms ease-out;
  }
`;

class TimerComponent extends PureComponent {
  render() {
    return (
      <FadeTransition>
        <CSSTransitionGroup
          component={ React.Fragment }
          transitionAppear={ false }
          transitionName="slide-up"
          transitionAppearTimeout={ 0 }
          transitionLeaveTimeout={ 250 }
          transitionEnterTimeout={ 250 }
        >
        { this.props.isUpdating && (
          <TimerWrapper>
            Updating!
          </TimerWrapper>
        )}
        </CSSTransitionGroup>
      </FadeTransition>
    );
  }
}

TimerComponent.propTypes = {
  isUpdating: PropTypes.bool,
};

export default TimerComponent;
