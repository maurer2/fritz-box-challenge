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
  .slide-appear,
  .slide-enter {
    transform: translateY(-100%);
  }

  .slide-appear.slide-appear-active,
  .slide-enter.slide-enter-active {
    transform: translateY(0);
    transition: transform 250ms ease-out;
  }

  .slide-leave {
    transform: translateY(0);
  }

  .slide-leave.slide-leave-active {
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
          transitionName="slide"
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
